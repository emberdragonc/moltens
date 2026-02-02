import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/check/:name
 * Check if a name is available for registration
 * 
 * Example: GET /api/check/emberclawd
 * Response: { "available": true, "name": "emberclawd" }
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params
  const normalizedName = name.toLowerCase().trim()

  // Validate name format
  if (!normalizedName || normalizedName.length === 0) {
    return NextResponse.json(
      { error: 'Name is required' },
      { status: 400 }
    )
  }

  if (normalizedName.length > 63) {
    return NextResponse.json(
      { error: 'Name too long (max 63 characters)' },
      { status: 400 }
    )
  }

  // Check for valid characters (a-z, 0-9, -, _)
  const validPattern = /^[a-z0-9][a-z0-9_-]*[a-z0-9]$|^[a-z0-9]$/
  if (!validPattern.test(normalizedName)) {
    return NextResponse.json(
      { error: 'Invalid name format. Use lowercase letters, numbers, hyphens, underscores. Cannot start/end with hyphen.' },
      { status: 400 }
    )
  }

  // TODO: Check against contract when deployed
  // For now, return available (mock)
  // In production: call contract.isAvailable(name)
  
  return NextResponse.json({
    available: true,
    name: normalizedName,
    fullName: `${normalizedName}.moltbook.eth`,
  })
}
