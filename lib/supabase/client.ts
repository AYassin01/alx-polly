
/**
 * Supabase Browser Client Module
 * 
 * This module provides a function to create a Supabase client for client-side operations.
 * It's designed to be used in browser environments where client-side APIs are available.
 * 
 * The browser client automatically handles cookie management for authentication state
 * and is suitable for use in client components.
 */

import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/supabase';

/**
 * Creates a Supabase client configured for browser-side usage
 * 
 * This function initializes a Supabase client that can be used in client components
 * with automatic cookie handling for authentication state persistence.
 * 
 * @returns {ReturnType<typeof createBrowserClient<Database>>} A configured Supabase client
 */
export function createSupabaseBrowserClient() {
  // Create and return a Supabase client for browser environments
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
