/**
 * Expiration utilities for 3-day auto-delete policy
 */

// 3 days in milliseconds
export const EXPIRATION_TIME = 3 * 24 * 60 * 60 * 1000; // 72 hours

/**
 * Check if an item is expired (older than 3 days)
 */
export function isExpired(timestamp: number): boolean {
  const now = Date.now();
  const age = now - timestamp;
  return age > EXPIRATION_TIME;
}

/**
 * Get time remaining until expiration
 * @returns milliseconds remaining, or 0 if expired
 */
export function getTimeRemaining(timestamp: number): number {
  const now = Date.now();
  const expiresAt = timestamp + EXPIRATION_TIME;
  const remaining = expiresAt - now;
  return remaining > 0 ? remaining : 0;
}

/**
 * Format time remaining as human-readable string
 * Examples: "2d 14h left", "5h 20m left", "30m left", "Expired"
 */
export function formatTimeRemaining(timestamp: number): string {
  const remaining = getTimeRemaining(timestamp);
  
  if (remaining === 0) {
    return 'Expired';
  }

  const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
  const hours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));

  if (days > 0) {
    return `${days}d ${hours}h left`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m left`;
  } else if (minutes > 0) {
    return `${minutes}m left`;
  } else {
    return 'Less than 1m';
  }
}

/**
 * Get expiration color based on time remaining
 * Returns Tailwind color classes
 */
export function getExpirationColor(timestamp: number): string {
  const remaining = getTimeRemaining(timestamp);
  const hours = remaining / (60 * 60 * 1000);

  if (hours <= 0) {
    return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
  } else if (hours <= 6) {
    return 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300';
  } else if (hours <= 24) {
    return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
  } else {
    return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
  }
}

/**
 * Filter out expired items from an array
 */
export function filterExpired<T extends { uploadedAt?: number; createdAt?: number }>(
  items: T[]
): T[] {
  return items.filter(item => {
    const timestamp = item.uploadedAt || item.createdAt || 0;
    return !isExpired(timestamp);
  });
}
