import { NextRequest, NextResponse } from 'next/server'
import { verifyMessage, createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'
import { keccak256, encodePacked, toHex } from 'viem'
import { getVerificationByUsernameAndWallet, deleteVerification } from '@/lib/verification-store'
import { verifyMoltbookPost } from '@/lib/moltbook-verifier'

// Registration fee in ETH
const REGISTRATION_FEE = '0.005'

// Contract address (TBD after mainnet deploy)
const MOLTENS_CONTRACT = process.env.MOLTENS_CONTRACT || '0x0000000000000000000000000000000000000000'

// Chain ID (1 for mainnet, 11155111 for Sepolia)
const CHAIN_ID = process.env.CHAIN_ID ? parseInt(process.env.CHAIN_ID) : 1

// Signer private key for vouchers (backend signs registration approvals)
const SIGNER_PRIVATE_KEY = process.env.SIGNER_PRIVATE_KEY

/**
 * POST /api/verify
 * 
 * Complete the verification process after user has posted on Moltbook.
 * Verifies the Moltbook post contains the reference ID, then returns
 * a signed voucher for the contract.
 * 
 * Request body:
 * {
 *   "username": "emberclawd",        // Moltbook username being claimed
 *   "wallet": "0x...",               // Wallet address claiming the name
 *   "walletSignature": "0x..."       // Signature of "Claim emberclawd.moltbook.eth: 0x..."
 * }
 * 
 * Response (success):
 * {
 *   "success": true,
 *   "name": "emberclawd",
 *   "verified": true,
 *   "voucher": {
 *     "label": "emberclawd",
 *     "deadline": 1234567890,
 *     "nonce": "0x...",
 *     "signature": "0x..."
 *   },
 *   "contract": "0x...",
 *   "fee": "0.005"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, wallet, walletSignature } = body

    // Validate required fields
    if (!username) {
      return NextResponse.json(
        { error: 'username is required' },
        { status: 400 }
      )
    }
    if (!wallet) {
      return NextResponse.json(
        { error: 'wallet address is required' },
        { status: 400 }
      )
    }
    if (!walletSignature) {
      return NextResponse.json(
        { error: 'walletSignature is required' },
        { status: 400 }
      )
    }

    const normalizedUsername = username.toLowerCase().trim()
    const normalizedWallet = wallet.toLowerCase()

    // Verify wallet signature
    const expectedMessage = `Claim ${normalizedUsername}.moltbook.eth: ${normalizedWallet}`
    let isValidSignature = false
    try {
      isValidSignature = await verifyMessage({
        address: wallet as `0x${string}`,
        message: expectedMessage,
        signature: walletSignature as `0x${string}`,
      })
    } catch (e) {
      return NextResponse.json(
        { error: 'Invalid wallet signature format' },
        { status: 400 }
      )
    }

    if (!isValidSignature) {
      return NextResponse.json(
        { error: `Wallet signature verification failed. Expected message: "${expectedMessage}"` },
        { status: 400 }
      )
    }

    // Get pending verification request
    const verificationRequest = getVerificationByUsernameAndWallet(normalizedUsername, wallet)
    if (!verificationRequest) {
      return NextResponse.json(
        { error: 'No pending verification found. Please call /api/initiate first to get a reference ID.' },
        { status: 400 }
      )
    }

    // Check if verification has expired
    if (verificationRequest.expiresAt < Date.now()) {
      return NextResponse.json(
        { error: 'Verification request has expired. Please call /api/initiate again to get a new reference ID.' },
        { status: 400 }
      )
    }

    // Verify Moltbook post contains the reference ID
    console.log(`[Verify] Checking Moltbook for reference ID: ${verificationRequest.referenceId}`)
    const moltbookResult = await verifyMoltbookPost(normalizedUsername, verificationRequest.referenceId)
    
    if (!moltbookResult.success) {
      return NextResponse.json(
        { 
          error: moltbookResult.error || 'Moltbook verification failed',
          referenceId: verificationRequest.referenceId,
          instructions: {
            step1: 'Make sure you posted on Moltbook with this exact text:',
            postText: `Claiming ${normalizedUsername}.moltbook.eth 🦞 #MoltENS REF:${verificationRequest.referenceId}`,
            step2: 'Wait a few seconds for the post to be visible, then try again',
            step3: 'Make sure your Moltbook profile is public'
          }
        },
        { status: 400 }
      )
    }

    // Generate registration voucher
    const deadline = Math.floor(Date.now() / 1000) + 3600 // 1 hour from now
    const nonce = keccak256(encodePacked(
      ['address', 'string', 'uint256'],
      [wallet as `0x${string}`, normalizedUsername, BigInt(Date.now())]
    ))

    // Sign the voucher
    let voucherSignature = '0x' + '00'.repeat(65) // Placeholder
    
    if (SIGNER_PRIVATE_KEY) {
      try {
        // Create the message hash (must match contract)
        const messageHash = keccak256(encodePacked(
          ['address', 'string', 'uint256', 'bytes32', 'uint256', 'address'],
          [
            wallet as `0x${string}`,
            normalizedUsername,
            BigInt(deadline),
            nonce,
            BigInt(CHAIN_ID),
            MOLTENS_CONTRACT as `0x${string}`
          ]
        ))

        // Sign with backend signer
        const account = privateKeyToAccount(SIGNER_PRIVATE_KEY as `0x${string}`)
        const client = createWalletClient({
          account,
          chain: mainnet,
          transport: http(),
        })
        
        voucherSignature = await account.signMessage({
          message: { raw: messageHash },
        })
        
        console.log(`[Verify] Generated voucher signature for ${normalizedUsername}`)
      } catch (e) {
        console.error('[Verify] Failed to sign voucher:', e)
        // Continue with placeholder - contract won't accept but user can see the flow
      }
    } else {
      console.warn('[Verify] SIGNER_PRIVATE_KEY not set - voucher will be unsigned')
    }

    // Build the voucher
    const voucher = {
      label: normalizedUsername,
      deadline,
      nonce,
      signature: voucherSignature,
    }

    // Clean up the verification request
    deleteVerification(verificationRequest.referenceId)

    return NextResponse.json({
      success: true,
      verified: true,
      name: normalizedUsername,
      fullName: `${normalizedUsername}.moltbook.eth`,
      wallet: normalizedWallet,
      moltbookProfileUrl: moltbookResult.profileUrl,
      voucher,
      contract: MOLTENS_CONTRACT,
      chainId: CHAIN_ID,
      fee: REGISTRATION_FEE,
      instructions: {
        step1: 'Call the register function on the contract with the voucher',
        step2: `Send ${REGISTRATION_FEE} ETH with the transaction`,
        example: `cast send ${MOLTENS_CONTRACT} "register(string,uint256,bytes32,bytes)" "${normalizedUsername}" ${deadline} ${nonce} ${voucherSignature} --value ${REGISTRATION_FEE}ether --private-key YOUR_PRIVATE_KEY --rpc-url https://eth.llamarpc.com`
      }
    })

  } catch (e) {
    console.error('Verify error:', e)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
