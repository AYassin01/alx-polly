
'use client';

/**
 * Authentication Context Module
 * 
 * This module provides authentication state management for the application using React Context.
 * It tracks the current user's authentication status and provides it to all child components.
 * 
 * The authentication state is synchronized with Supabase's auth state through a subscription,
 * ensuring that components always have the latest auth information.
 */

import { createContext, useContext, useEffect, useState } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

/**
 * Type definition for the authentication context value
 * Contains the current user object and loading state
 */
type AuthContextType = {
    user: User | null;      // The authenticated user or null if not authenticated
    isLoading: boolean;    // Whether the authentication state is still being determined
};

// Create a context with undefined as default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider component that wraps the application and provides authentication state
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to auth context
 * @returns {JSX.Element} AuthContext Provider with children
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
    // State to track the current authenticated user
    const [user, setUser] = useState<User | null>(null);
    // State to track if we're still loading the authentication state
    const [isLoading, setIsLoading] = useState(true);
    // Initialize Supabase client for browser environment
    const supabase = createSupabaseBrowserClient();

    useEffect(() => {
        // Subscribe to authentication state changes from Supabase
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            // Update user state based on session
            setUser(session?.user ?? null);
            // Mark loading as complete
            setIsLoading(false);
        });

        // Cleanup function to unsubscribe when component unmounts
        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [supabase]); // Re-run effect if supabase client changes

    return (
        <AuthContext.Provider value={{ user, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

/**
 * Custom hook to access the authentication context
 * 
 * @returns {AuthContextType} The authentication context value
 * @throws {Error} If used outside of an AuthProvider
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    // Ensure the hook is used within an AuthProvider
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
