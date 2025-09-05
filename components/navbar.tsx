'use client';

/**
 * Navbar Component
 * 
 * This component renders the application's navigation bar, which includes:
 * - Site branding and main navigation links
 * - Theme toggle for light/dark mode
 * - User authentication state UI (login/register buttons or user dropdown)
 * 
 * The navbar adapts its display based on authentication state, showing different
 * options for authenticated and unauthenticated users.
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/theme-toggle';
import { useAuth } from '@/hooks/use-auth';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

/**
 * Navbar component that handles navigation and user authentication UI
 * 
 * @returns {JSX.Element} The navbar component
 */
export function Navbar() {
  // Get current path to highlight active navigation links
  const pathname = usePathname();
  // Get authentication state from auth context
  const { user, isLoading } = useAuth();
  // Initialize Supabase client for logout functionality
  const supabase = createSupabaseBrowserClient();
  // Router for navigation after logout
  const router = useRouter();

  /**
   * Determines if a navigation link should be highlighted as active
   * 
   * @param {string} path - The path to check against current pathname
   * @returns {boolean} True if the path matches the current pathname
   */
  const isActive = (path: string) => {
    return pathname === path;
  };

  /**
   * Handles user logout
   * Signs out the user and redirects to login page
   */
  const handleLogout = async () => {
    // Sign out the user from Supabase auth
    await supabase.auth.signOut();
    // Redirect to login page
    router.push('/auth/login');
  };

  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left side: Logo and navigation links */}
        <div className="flex items-center gap-6">
          {/* Site logo/brand */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">ALX Polly</span>
          </Link>
          {/* Main navigation - hidden on mobile */}
          <nav className="hidden md:flex gap-6">
            <Link
              href="/polls"
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/polls') ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Polls
            </Link>
            <Link
              href="/polls/create"
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/polls/create') ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Create Poll
            </Link>
          </nav>
        </div>
        
        {/* Right side: Theme toggle and user authentication UI */}
        <div className="flex items-center gap-4">
          {/* Theme toggle button */}
          <ThemeToggle />
          
          {/* Conditional rendering based on authentication state */}
          {isLoading ? null : user ? (
            // User is authenticated - show user dropdown menu
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.user_metadata.avatar_url} alt={user.user_metadata.full_name} />
                    <AvatarFallback>{user.user_metadata.full_name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              {/* User dropdown menu content */}
              <DropdownMenuContent className="w-56" align="end" forceMount>
                {/* User information section */}
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.user_metadata.full_name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* User account navigation options */}
                <DropdownMenuItem>
                  <Link href="/profile" className="w-full">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/settings" className="w-full">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {/* Logout option */}
                <DropdownMenuItem onClick={handleLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // User is not authenticated - show login/register buttons
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}