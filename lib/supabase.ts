import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Log configuration status (only in development or server-side)
if (typeof window === 'undefined') {
  console.log('[Supabase Config]', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey,
    url: supabaseUrl ? supabaseUrl.substring(0, 30) + '...' : 'MISSING',
  });
}

// Create a single supabase client for interacting with your database
// Only initialize if environment variables are present
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Log warning if not configured
if (!supabase && typeof window === 'undefined') {
  console.error('[Supabase] NOT CONFIGURED - Environment variables missing!');
}

/**
 * Check if Supabase is configured
 */
export function isSupabaseConfigured(): boolean {
  return supabase !== null;
}
