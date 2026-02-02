import { NextRequest, NextResponse } from 'next/server'
import { verifyMessage } from 'viem'
import { keccak256, encodePacked, toHex } from 'viem'

// Registration fee in ETH
const REGISTRATION_FEE = '0.005'

// Contract address (TBD after mainnet deploy)
const MOLTENS_CONTRACT = process.env.MOLTENS_CONTRACT || '0x0000000000000000000000000000000000000000'

// Signer private key for vouchers (backend signs registration approvals)
const SIGNER_PRIVATE_KEY = process.env.SIGNER_PRIVATE_KEY

/**
 * POST /api/register
 * 
 * Bot registration flow:
 * 1. Bot provides Moltbook identity token
 * 2. Bot provides wallet address + signature proving ownership
 * 3. We verify both, return signed voucher for contract
 * 
 * Request body:
 * {
 *   "moltbookToken": "string",     // Moltbook identity token
 *   "wallet": "0x...",             // Bot's wallet address
 *   "walletSignature": "0x..."     // Signature of "Register for MoltENS: {wallet}"
 * }
 * 
 * Response:
 * {
 *   "success": true,
 *   "name": "emberclawd",
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
    const { moltbookToken, wallet, walletSignature } = body

    // Validate required fields
    if (!moltbookToken) {
      return NextResponse.json(
        { error: 'moltbookToken is required' },
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

    // Verify wallet signature
    const expectedMessage = `Register for MoltENS: ${wallet.toLowerCase()}`
    let isValidSignature = false
    try {
      isValidSignature = await verifyMessage({
        address: wallet as `0x${string}`,
        message: expectedMessage,
        signature: walletSignature as `0x${string}`,
      })
    } catch (e) {
      return NextResponse.json(
        { error: 'Invalid wallet signature' },
        { status: 400 }
      )
    }

    if (!isValidSignature) {
      return NextResponse.json(
        { error: 'Wallet signature verification failed' },
        { status: 400 }
      )
    }

    // Verify Moltbook identity token
    // TODO: Call Moltbook API to verify token and get username
    // POST https://moltbook.com/api/v1/agents/verify-identity
    // For now, mock this
    let moltbookUsername: string
    try {
      // In production:
      // const resp = await fetch('https://moltbook.com/api/v1/agents/verify-identity', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${process.env.MOLTBOOK_APP_KEY}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ token: moltbookToken })
      // })
      // const data = await resp.json()
      // moltbookUsername = data.agent.name
      
      // Mock for now - extract from token or use placeholder
      moltbookUsername = 'testbot' // This would come from Moltbook API
    } catch (e) {
      return NextResponse.json(
        { error: 'Failed to verify Moltbook identity' },
        { status: 400 }
      )
    }

    // Normalize the name
    const normalizedName = moltbookUsername.toLowerCase().trim()

    // Generate registration voucher
    const deadline = Math.floor(Date.now() / 1000) + 3600 // 1 hour from now
    const nonce = keccak256(encodePacked(
      ['address', 'string', 'uint256'],
      [wallet as `0x${string}`, normalizedName, BigInt(Date.now())]
    ))

    // TODO: Sign the voucher with backend signer
    // For now, return unsigned voucher structure
    const voucher = {
      label: normalizedName,
      deadline,
      nonce,
      signature: '0x' + '00'.repeat(65), // Placeholder - needs real signature
    }

    return NextResponse.json({
      success: true,
      name: normalizedName,
      fullName: `${normalizedName}.moltbook.eth`,
      wallet,
      voucher,
      contract: MOLTENS_CONTRACT,
      fee: REGISTRATION_FEE,
      instructions: {
        step1: 'Call the register function on the contract',
        step2: `Send ${REGISTRATION_FEE} ETH with the transaction`,
        example: `cast send ${MOLTENS_CONTRACT} "register(string,uint256,bytes32,bytes)" "${normalizedName}" ${deadline} ${nonce} ${voucher.signature} --value ${REGISTRATION_FEE}ether --private-key YOUR_PRIVATE_KEY --rpc-url https://mainnet.infura.io/v3/YOUR_KEY`
      }
    })

  } catch (e) {
    console.error('Registration error:', e)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
