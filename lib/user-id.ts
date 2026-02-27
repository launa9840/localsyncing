/**
 * User ID Management
 * Generates and stores a persistent user ID in browser localStorage
 */

const USER_ID_KEY = 'localsync_user_id';

/**
 * Generate a unique user ID
 */
function generateUserId(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 15);
  return `user_${timestamp}_${randomPart}`;
}

/**
 * Get or create user ID
 * Returns existing ID from localStorage or creates a new one
 */
export function getUserId(): string {
  // Check if we're in browser environment
  if (typeof window === 'undefined') {
    return 'server'; // Fallback for SSR
  }

  try {
    // Try to get existing ID
    let userId = localStorage.getItem(USER_ID_KEY);

    // If no ID exists, create one
    if (!userId) {
      userId = generateUserId();
      localStorage.setItem(USER_ID_KEY, userId);
      console.log('[UserID] Generated new user ID:', userId);
    } else {
      console.log('[UserID] Using existing user ID:', userId);
    }

    return userId;
  } catch (error) {
    console.error('[UserID] Error accessing localStorage:', error);
    // Fallback to session-based ID if localStorage fails
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }
}

/**
 * Clear user ID (for testing or reset)
 */
export function clearUserId(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(USER_ID_KEY);
    console.log('[UserID] Cleared user ID');
  }
}

/**
 * Check if user has an ID
 */
export function hasUserId(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(USER_ID_KEY) !== null;
}
