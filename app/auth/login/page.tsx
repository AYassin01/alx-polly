'use client';

/**
 * Login Page Component
 * 
 * This component renders a login form that allows users to authenticate with their email and password.
 * It handles form validation, submission, error handling, and redirects users upon successful login.
 * 
 * The form uses Zod schema validation through react-hook-form to ensure valid input before submission.
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { loginSchema, type LoginFormValues } from '@/lib/validations/auth';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

/**
 * LoginPage component that renders the login form and handles authentication
 * 
 * @returns {JSX.Element} The login page component
 */
export default function LoginPage() {
  // State to track form submission status
  const [isLoading, setIsLoading] = useState(false);
  // Initialize Supabase client for authentication
  const supabase = createSupabaseBrowserClient();
  // Router for navigation after successful login
  const router = useRouter();
  // Toast notifications for error messages
  const { toast } = useToast();

  // Initialize form with Zod schema validation
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  /**
   * Handle form submission
   * Attempts to authenticate the user with Supabase
   * 
   * @param {LoginFormValues} data - The validated form data
   */
  const onSubmit = async (data: LoginFormValues) => {
    // Set loading state to show UI feedback
    setIsLoading(true);
    // Attempt to sign in with email and password
    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      // Show error message if authentication fails
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      // Redirect to polls page on successful login
      router.push('/polls');
    }
    // Reset loading state regardless of outcome
    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}