import { NextRequest } from 'next/server';

/**
 * Get client IP address with support for local development
 * Priority:
 * 1. Environment variable override (for local dev)
 * 2. x-forwarded-for header (Vercel/proxy)
 * 3. x-real-ip header
 * 4. Fallback to localhost identifier
 */
export function getClientIp(request: NextRequest): string {
  // Check for environment variable override (useful for local development)
  const overrideIp = process.env.NEXT_PUBLIC_LOCAL_IP_OVERRIDE;
  if (overrideIp) {
    console.log('[IP Detection] Using override IP:', overrideIp);
    return overrideIp;
  }

  // Try x-forwarded-for (used by Vercel and most proxies)
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const ip = forwarded.split(',')[0].trim();
    console.log('[IP Detection] From x-forwarded-for:', ip);
    return ip;
  }

  // Try x-real-ip
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    console.log('[IP Detection] From x-real-ip:', realIp);
    return realIp;
  }

  // Fallback for localhost
  // In local development, use a consistent identifier
  const fallbackIp = 'localhost-dev';
  console.log('[IP Detection] Using fallback:', fallbackIp);
  return fallbackIp;
}

/**
 * Get the current IP for display in the UI
 * This runs on the client side
 */
export async function getCurrentIpForDisplay(): Promise<string> {
  // Check for override first
  const overrideIp = process.env.NEXT_PUBLIC_LOCAL_IP_OVERRIDE;
  if (overrideIp) {
    return overrideIp;
  }

  try {
    // Call our API to get the detected IP
    const response = await fetch('/api/sync');
    const data = await response.json();
    
    if (data.success && data.ip) {
      return data.ip;
    }
  } catch (error) {
    console.error('[IP Display] Failed to fetch IP:', error);
  }

  return 'Unknown';
}
