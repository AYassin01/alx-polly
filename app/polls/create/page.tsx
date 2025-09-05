'use client';

/**
 * Poll Creation Page
 * 
 * This component provides a form interface for users to create new polls.
 * It allows users to specify a title, description, expiration date, and multiple options.
 * The form includes validation and handles the submission process.
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Represents a single option in a poll
 */
type PollOption = {
  /** Unique identifier for the option */
  id: string;
  /** The text content of the option */
  text: string;
};

/**
 * Form values for creating a new poll
 */
type FormValues = {
  /** The title of the poll */
  title: string;
  /** A description explaining the poll's purpose */
  description: string;
  /** The list of options users can vote on */
  options: PollOption[];
  /** Optional expiration date for the poll */
  expiresAt?: string;
};

/**
 * CreatePollPage component that provides a form for creating new polls
 * 
 * @returns {JSX.Element} The create poll page component
 */
export default function CreatePollPage() {
  const router = useRouter();
  // Track form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Manage poll options separately from the form
  const [options, setOptions] = useState<PollOption[]>([
    { id: '1', text: '' },
    { id: '2', text: '' }, // Start with two empty options
  ]);

  // Initialize the form with react-hook-form
  const form = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
      options: options,
      expiresAt: '',
    },
  });

  /**
   * Adds a new empty option to the poll
   */
  const addOption = () => {
    const newOption = {
      id: `${options.length + 1}`,
      text: '',
    };
    setOptions([...options, newOption]);
  };

  /**
   * Removes an option from the poll by its ID
   * Prevents removing if only 2 options remain (minimum required)
   * 
   * @param {string} id - The ID of the option to remove
   */
  const removeOption = (id: string) => {
    if (options.length <= 2) return; // Minimum 2 options required
    setOptions(options.filter((option) => option.id !== id));
  };

  /**
   * Updates the text of a specific option
   * 
   * @param {string} id - The ID of the option to update
   * @param {string} value - The new text value
   */
  const handleOptionChange = (id: string, value: string) => {
    setOptions(
      options.map((option) => {
        if (option.id === id) {
          return { ...option, text: value };
        }
        return option;
      })
    );
  };

  /**
   * Handles form submission to create a new poll
   * 
   * @param {FormValues} data - The form data
   */
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Include the current options state in the form data
    // This ensures we use the latest options state which might have changed
    const formData = {
      ...data,
      options: options,
    };
    
    // This is a placeholder for the actual API call
    console.log('Poll data:', formData);
    
    try {
      // Simulate API call - would be replaced with actual backend integration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // On success, redirect to the polls listing page
      router.push('/polls');
    } catch (error) {
      console.error('Error creating poll:', error);
      // Handle error (could add error state and display message)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      {/* Back navigation link */}
      <div className="mb-6">
        <Link href="/polls" className="text-primary hover:underline">
          ← Back to all polls
        </Link>
      </div>

      {/* Main poll creation card */}
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Create a New Poll</CardTitle>
          <CardDescription>
            Fill out the form below to create a new poll
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Poll creation form using react-hook-form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Poll title field */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Poll Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter poll title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Poll description field */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter poll description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Optional expiration date field */}
              <FormField
                control={form.control}
                name="expiresAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiration Date (Optional)</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Poll options section */}
              <div className="space-y-4">
                {/* Options header with add button */}
                <div className="flex justify-between items-center">
                  <FormLabel>Poll Options</FormLabel>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={addOption}
                  >
                    Add Option
                  </Button>
                </div>

                {/* Dynamic list of poll options */}
                {options.map((option, index) => (
                  <div key={option.id} className="flex items-center gap-2">
                    <Input
                      placeholder={`Option ${index + 1}`}
                      value={option.text}
                      onChange={(e) => handleOptionChange(option.id, e.target.value)}
                      className="flex-grow"
                    />
                    {/* Remove button (only shown when more than 2 options exist) */}
                    {options.length > 2 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeOption(option.id)}
                        className="h-8 w-8"
                      >
                        ×
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {/* Form action buttons */}
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" asChild>
                  <Link href="/polls">Cancel</Link>
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating...' : 'Create Poll'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}