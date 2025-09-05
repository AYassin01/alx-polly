
/**
 * Authentication Middleware
 * 
 * This middleware handles route protection and redirection based on authentication status.
 * It ensures that:
 * 1. Authenticated users are redirected away from auth pages (login/register)
 * 2. Unauthenticated users are redirected to login when trying to access protected routes
 * 
 * The middleware runs on specific routes defined in the config.matcher array.
 */

import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

/**
 * Middleware function that runs on matched routes
 * 
 * @param {NextRequest} request - The incoming request object
 * @returns {NextResponse} The response, either redirecting or allowing the request to proceed
 */
export async function middleware(request: NextRequest) {
  // Create a Supabase server client to check authentication
  const supabase = createServerClient();
  // Get the current session data
  const { data } = await supabase.auth.getSession();

  // Extract the pathname from the request URL
  const { pathname } = request.nextUrl;

  if (data.session) {
    // User is authenticated
    if (pathname === '/auth/login' || pathname === '/auth/register') {
      // Redirect authenticated users away from auth pages to polls
      return NextResponse.redirect(new URL('/polls', request.url));
    }
  } else {
    // User is not authenticated
    if (pathname.startsWith('/polls')) {
      // Redirect unauthenticated users to login when trying to access protected routes
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  // Allow the request to proceed normally
  return NextResponse.next();
}

/**
 * Middleware configuration
 * Specifies which routes the middleware should run on
 */
export const config = {
  matcher: ['/polls/:path*', '/auth/login', '/auth/register'],
};
