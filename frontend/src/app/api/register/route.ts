import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/register
 * 
 * DEPRECATED: This endpoint now redirects to the new verification flow.
 * 
 * The new flow is:
 * 1. POST /api/initiate - Get a reference ID
 * 2. Post on Moltbook with the reference ID
 * 3. POST /api/verify - Complete verification and get voucher
 * 
 * This endpoint exists for backwards compatibility and will guide users
 * to the new flow.
 */
export async function POST(request: NextRequest) {
  return NextResponse.json({
    error: 'This endpoint has been replaced with the new Moltbook post verification flow',
    newFlow: {
      step1: {
        endpoint: 'POST /api/initiate',
        description: 'Start verification - get a reference ID',
        body: {
          username: 'your_moltbook_username',
          wallet: '0xYourWalletAddress'
        }
      },
      step2: {
        description: 'Post on Moltbook with the reference ID provided',
        example: 'Claiming yourname.moltbook.eth 🦞 #MoltENS REF:MOLT-ABC12345'
      },
      step3: {
        endpoint: 'POST /api/verify',
        description: 'Complete verification after posting',
        body: {
          username: 'your_moltbook_username',
          wallet: '0xYourWalletAddress',
          walletSignature: '0xSignatureOf_Claim_yourname.moltbook.eth:_0xYourWallet'
        }
      }
    },
    docs: 'https://moltbook.domains - See the API documentation for details'
  }, { status: 400 })
}
