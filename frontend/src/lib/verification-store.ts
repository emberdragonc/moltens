/**
 * Verification Store
 * 
 * Stores pending verification requests (reference IDs → claim data)
 * 
 * NOTE: This is an in-memory store for development/MVP.
 * For production, use Redis or a database for persistence and scaling.
 */

export interface VerificationRequest {
  referenceId: string
  username: string
  wallet: string
  createdAt: number
  expiresAt: number
}

// In-memory store (replaced with Redis/DB in production)
const pendingVerifications = new Map<string, VerificationRequest>()

// Reference IDs expire after 30 minutes
const EXPIRY_MS = 30 * 60 * 1000

/**
 * Generate a unique reference ID
 */
export function generateReferenceId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // Avoid confusing chars (0,O,1,I)
  let result = 'MOLT-'
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Store a new verification request
 */
export function createVerificationRequest(username: string, wallet: string): VerificationRequest {
  // Clean up expired entries first
  cleanupExpired()
  
  // Check if there's already a pending request for this username+wallet
  const existing = getVerificationByUsernameAndWallet(username, wallet)
  if (existing && existing.expiresAt > Date.now()) {
    return existing
  }
  
  const referenceId = generateReferenceId()
  const now = Date.now()
  
  const request: VerificationRequest = {
    referenceId,
    username: username.toLowerCase(),
    wallet: wallet.toLowerCase(),
    createdAt: now,
    expiresAt: now + EXPIRY_MS,
  }
  
  pendingVerifications.set(referenceId, request)
  return request
}

/**
 * Get a verification request by reference ID
 */
export function getVerificationByReferenceId(referenceId: string): VerificationRequest | null {
  const request = pendingVerifications.get(referenceId)
  if (!request) return null
  if (request.expiresAt < Date.now()) {
    pendingVerifications.delete(referenceId)
    return null
  }
  return request
}

/**
 * Get a verification request by username and wallet
 */
export function getVerificationByUsernameAndWallet(username: string, wallet: string): VerificationRequest | null {
  const normalizedUsername = username.toLowerCase()
  const normalizedWallet = wallet.toLowerCase()
  
  for (const [_, request] of pendingVerifications) {
    if (request.username === normalizedUsername && request.wallet === normalizedWallet) {
      if (request.expiresAt < Date.now()) {
        pendingVerifications.delete(request.referenceId)
        continue
      }
      return request
    }
  }
  return null
}

/**
 * Delete a verification request (after successful registration)
 */
export function deleteVerification(referenceId: string): void {
  pendingVerifications.delete(referenceId)
}

/**
 * Clean up expired verification requests
 */
function cleanupExpired(): void {
  const now = Date.now()
  for (const [id, request] of pendingVerifications) {
    if (request.expiresAt < now) {
      pendingVerifications.delete(id)
    }
  }
}
