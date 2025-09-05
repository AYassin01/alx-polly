
/**
 * Supabase Server Client Module
 * 
 * This module provides a function to create a Supabase client for server-side operations.
 * It integrates with Next.js cookies API to handle authentication state persistence.
 * 
 * The server client is used for server components, API routes, and middleware where
 * client-side browser APIs are not available.
 */

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database } from '@/types/supabase';

/**
 * Creates a Supabase client configured for server-side usage
 * 
 * This function initializes a Supabase client that can be used in server contexts
 * with proper cookie handling for authentication state persistence.
 * 
 * @returns {ReturnType<typeof createServerClient<Database>>} A configured Supabase client
 */
export function createSupabaseServerClient() {
  // Access the Next.js cookie store
  const cookieStore = cookies();

  // Create and return a Supabase client with cookie handling
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Get a cookie value by name
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        // Set a cookie with name, value and options
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        // Remove a cookie by setting its value to empty string
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );
}
