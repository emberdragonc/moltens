/**
 * Moltbook Profile Verifier
 * 
 * Fetches public Moltbook profile pages and verifies that a specific
 * reference ID appears in the user's recent posts.
 * 
 * NOTE: This is a temporary solution until we get Moltbook API access.
 * The URL patterns and page structure may need adjustment based on
 * actual Moltbook profile page format.
 */

// Known Moltbook profile URL patterns (adjust as needed)
const MOLTBOOK_PROFILE_URLS = [
  'https://moltbook.com/bots/{username}',
  'https://moltbook.com/agents/{username}',
  'https://moltbook.com/@{username}',
  'https://moltbook.com/u/{username}',
]

// How many URLs to try
const MAX_URL_ATTEMPTS = MOLTBOOK_PROFILE_URLS.length

export interface VerificationResult {
  success: boolean
  error?: string
  profileUrl?: string
  postFound?: boolean
}

/**
 * Verify that a Moltbook user has posted a specific reference ID
 * 
 * @param username - The Moltbook username to check
 * @param referenceId - The reference ID to look for in their posts
 * @returns Verification result
 */
export async function verifyMoltbookPost(
  username: string,
  referenceId: string
): Promise<VerificationResult> {
  const normalizedUsername = username.toLowerCase().trim()
  
  // Try each URL pattern
  for (const urlPattern of MOLTBOOK_PROFILE_URLS) {
    const profileUrl = urlPattern.replace('{username}', normalizedUsername)
    
    try {
      console.log(`[MoltbookVerifier] Checking ${profileUrl}`)
      
      const response = await fetch(profileUrl, {
        headers: {
          'User-Agent': 'MoltENS-Verifier/1.0 (https://moltbook.domains)',
          'Accept': 'text/html,application/xhtml+xml',
        },
        // Follow redirects
        redirect: 'follow',
        // Timeout after 10 seconds
        signal: AbortSignal.timeout(10000),
      })
      
      if (!response.ok) {
        console.log(`[MoltbookVerifier] ${profileUrl} returned ${response.status}`)
        continue
      }
      
      const html = await response.text()
      
      // Check if the reference ID appears in the page content
      // The reference ID format is: REF:MOLT-XXXXXXXX
      if (html.includes(referenceId) || html.includes(`REF:${referenceId}`)) {
        console.log(`[MoltbookVerifier] Found reference ID ${referenceId} at ${profileUrl}`)
        return {
          success: true,
          profileUrl,
          postFound: true,
        }
      }
      
      // Also check for the full claim text pattern
      const claimPattern = `${normalizedUsername}.moltbook.eth`
      if (html.includes(claimPattern) && html.includes(referenceId)) {
        console.log(`[MoltbookVerifier] Found claim pattern at ${profileUrl}`)
        return {
          success: true,
          profileUrl,
          postFound: true,
        }
      }
      
      // Profile exists but reference ID not found
      console.log(`[MoltbookVerifier] Profile found at ${profileUrl} but reference ID not present`)
      return {
        success: false,
        error: `Reference ID not found in ${normalizedUsername}'s Moltbook posts. Make sure you posted the exact text with the reference ID.`,
        profileUrl,
        postFound: false,
      }
      
    } catch (e: any) {
      if (e.name === 'AbortError') {
        console.log(`[MoltbookVerifier] Timeout fetching ${profileUrl}`)
      } else {
        console.log(`[MoltbookVerifier] Error fetching ${profileUrl}:`, e.message)
      }
      // Try next URL pattern
      continue
    }
  }
  
  // None of the URL patterns worked
  return {
    success: false,
    error: `Could not find Moltbook profile for "${normalizedUsername}". Make sure the username exists and your profile is public.`,
  }
}

/**
 * Check if a Moltbook profile exists (without verification)
 * 
 * @param username - The Moltbook username to check
 * @returns true if profile exists
 */
export async function moltbookProfileExists(username: string): Promise<boolean> {
  const normalizedUsername = username.toLowerCase().trim()
  
  for (const urlPattern of MOLTBOOK_PROFILE_URLS) {
    const profileUrl = urlPattern.replace('{username}', normalizedUsername)
    
    try {
      const response = await fetch(profileUrl, {
        method: 'HEAD',
        headers: {
          'User-Agent': 'MoltENS-Verifier/1.0 (https://moltbook.domains)',
        },
        redirect: 'follow',
        signal: AbortSignal.timeout(5000),
      })
      
      if (response.ok) {
        return true
      }
    } catch {
      continue
    }
  }
  
  return false
}
