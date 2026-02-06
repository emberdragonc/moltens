import { NextRequest, NextResponse } from 'next/server'
import { createVerificationRequest } from '@/lib/verification-store'

/**
 * POST /api/initiate
 * 
 * Start the verification process for a Moltbook username claim.
 * Generates a unique reference ID that the user must post on Moltbook.
 * 
 * Request body:
 * {
 *   "username": "emberclawd",    // Moltbook username to claim
 *   "wallet": "0x..."            // Wallet address claiming the name
 * }
 * 
 * Response:
 * {
 *   "success": true,
 *   "referenceId": "MOLT-ABC12345",
 *   "username": "emberclawd",
 *   "expiresAt": 1234567890000,
 *   "instructions": {
 *     "step1": "Post on Moltbook with this exact text:",
 *     "postText": "Claiming emberclawd.moltbook.eth 🦞 #MoltENS REF:MOLT-ABC12345",
 *     "step2": "After posting, call /api/verify with your wallet signature",
 *     "expiresIn": "30 minutes"
 *   }
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, wallet } = body

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

    // Validate wallet format
    if (!/^0x[a-fA-F0-9]{40}$/.test(wallet)) {
      return NextResponse.json(
        { error: 'Invalid wallet address format' },
        { status: 400 }
      )
    }

    // Normalize username
    const normalizedUsername = username.toLowerCase().trim()

    // Validate username format (same rules as contract)
    if (normalizedUsername.length === 0) {
      return NextResponse.json(
        { error: 'Username cannot be empty' },
        { status: 400 }
      )
    }
    if (normalizedUsername.length > 63) {
      return NextResponse.json(
        { error: 'Username too long (max 63 characters)' },
        { status: 400 }
      )
    }

    const validPattern = /^[a-z0-9][a-z0-9_-]*[a-z0-9]$|^[a-z0-9]$/
    if (!validPattern.test(normalizedUsername)) {
      return NextResponse.json(
        { error: 'Invalid username format. Use lowercase letters, numbers, hyphens, underscores. Cannot start/end with hyphen.' },
        { status: 400 }
      )
    }

    // Create verification request
    const verificationRequest = createVerificationRequest(normalizedUsername, wallet)
    
    // Build the post text the user needs to post on Moltbook
    const postText = `Claiming ${normalizedUsername}.moltbook.eth 🦞 #MoltENS REF:${verificationRequest.referenceId}`

    return NextResponse.json({
      success: true,
      referenceId: verificationRequest.referenceId,
      username: normalizedUsername,
      fullName: `${normalizedUsername}.moltbook.eth`,
      wallet: wallet.toLowerCase(),
      expiresAt: verificationRequest.expiresAt,
      instructions: {
        step1: 'Post on Moltbook with this exact text:',
        postText,
        step2: 'After posting, call /api/verify with your wallet signature to complete registration',
        expiresIn: '30 minutes',
        note: 'The reference ID must be visible in your public Moltbook posts'
      }
    })

  } catch (e) {
    console.error('Initiate error:', e)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
