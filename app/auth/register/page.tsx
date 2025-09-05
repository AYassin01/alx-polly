'use client';

/**
 * Registration Page Component
 * 
 * This component renders a registration form that allows new users to create an account.
 * It handles form validation, submission, error handling, and redirects users upon successful registration.
 * 
 * The form uses Zod schema validation through react-hook-form to ensure valid input before submission,
 * including password confirmation matching.
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { registerSchema, type RegisterFormValues } from '@/lib/validations/auth';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

/**
 * RegisterPage component that renders the registration form and handles account creation
 * 
 * @returns {JSX.Element} The registration page component
 */
export default function RegisterPage() {
  // State to track form submission status
  const [isLoading, setIsLoading] = useState(false);
  // Initialize Supabase client for authentication
  const supabase = createSupabaseBrowserClient();
  // Router for navigation after successful registration
  const router = useRouter();
  // Toast notifications for success and error messages
  const { toast } = useToast();

  // Initialize form with Zod schema validation
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  /**
   * Handle form submission
   * Creates a new user account with Supabase authentication
   * 
   * @param {RegisterFormValues} data - The validated form data
   */
  const onSubmit = async (data: RegisterFormValues) => {
    // Set loading state to show UI feedback
    setIsLoading(true);
    // Attempt to create a new user account
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          // Store the user's full name in the user metadata
          full_name: data.name,
        },
      },
    });

    if (error) {
      // Show error message if registration fails
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      // Show success message and redirect
      toast({
        title: 'Success',
        description: 'Check your email for a confirmation link.',
      });
      // Redirect to polls page after successful registration
      router.push('/polls');
    }
    // Reset loading state regardless of outcome
    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email@example.com" {...field} />
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Register'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}