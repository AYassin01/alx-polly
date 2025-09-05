'use client';

/**
 * Poll Detail Page
 * 
 * This component displays the details of a specific poll and allows users to vote.
 * It shows the poll title, description, voting options, and results after voting.
 * The page handles loading states, voting submission, and displays voting results
 * with percentage bars.
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Poll } from '@/types';
import { PollDetailSkeleton } from '@/components/poll-detail-skeleton';

/**
 * Mock data for a single poll
 * In a production environment, this would be replaced with data from an API
 */
const mockPoll = {
  id: '1',
  title: 'Favorite Programming Language',
  description: 'What is your favorite programming language?',
  options: [
    { id: '1', text: 'JavaScript', votes: 15 },
    { id: '2', text: 'Python', votes: 12 },
    { id: '3', text: 'Java', votes: 8 },
    { id: '4', text: 'C#', votes: 5 },
    { id: '5', text: 'Go', votes: 2 },
  ],
  totalVotes: 42,
  createdBy: 'John Doe',
  createdAt: '2023-05-15',
  expiresAt: '2023-06-15',
};

/**
 * PollPage component that displays a single poll and handles voting
 * 
 * @param {Object} props - Component props
 * @param {Object} props.params - URL parameters
 * @param {string} props.params.id - The poll ID from the URL
 * @returns {JSX.Element} The poll detail page component
 */
export default function PollPage({ params }: { params: { id: string } }) {
  // State for tracking the user's selected option
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  // State for tracking if the user has already voted
  const [hasVoted, setHasVoted] = useState(false);
  // State for tracking vote submission process
  const [isSubmitting, setIsSubmitting] = useState(false);
  // State for tracking initial data loading
  const [loading, setLoading] = useState(true);
  // State for storing the poll data
  const [poll, setPoll] = useState<typeof mockPoll | null>(null);

  // Extract poll ID from URL parameters
  const pollId = params.id;
  
  /**
   * Effect hook to fetch poll data when component mounts or pollId changes
   */
  useEffect(() => {
    // Simulate API call with a delay
    const fetchPoll = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call to fetch poll by ID
        await new Promise(resolve => setTimeout(resolve, 1500));
        setPoll(mockPoll);
      } catch (error) {
        console.error('Error fetching poll:', error);
        // In a real app, we would handle the error state more gracefully
      } finally {
        setLoading(false);
      }
    };

    fetchPoll();
  }, [pollId]); // Re-fetch when poll ID changes

  /**
   * Handles the vote submission process
   * In a real app, this would send the vote to an API
   */
  const handleVote = () => {
    // Validate that an option is selected and poll data exists
    if (!selectedOption || !poll) return;
    
    setIsSubmitting(true);
    
    // Simulate API call to submit vote
    setTimeout(() => {
      setHasVoted(true);
      setIsSubmitting(false);
      // In a real app, we would update the poll data with the new vote count
    }, 1000);
  };

  /**
   * Calculates the percentage of votes for a given option
   * 
   * @param {number} votes - The number of votes for an option
   * @returns {number} The percentage of votes (0-100)
   */
  const getPercentage = (votes: number) => {
    if (!poll) return 0;
    // Calculate percentage, handling the case where there are no votes yet
    return poll.totalVotes > 0 ? Math.round((votes / poll.totalVotes) * 100) : 0;
  };

  return (
    <div className="container mx-auto py-8">
      {/* Back navigation link */}
      <div className="mb-6">
        <Link href="/polls" className="text-primary hover:underline">
          ← Back to all polls
        </Link>
      </div>

      {/* Conditional rendering based on loading state */}
      {loading ? (
        {/* Show skeleton loader while fetching poll data */}
        <PollDetailSkeleton />
      ) : poll ? (
        {/* Poll details card when data is loaded successfully */}
        <Card className="max-w-3xl mx-auto">
          {/* Poll header with title and description */}
          <CardHeader>
            <CardTitle className="text-2xl">{poll.title}</CardTitle>
            <CardDescription>{poll.description}</CardDescription>
          </CardHeader>
          
          {/* Poll content with voting options or results */}
          <CardContent className="space-y-4">
            {/* Map through each poll option */}
            {poll.options.map((option) => (
            <div key={option.id} className="space-y-2">
              <div className="flex items-center">
                {/* Conditional rendering based on voting state */}
                {!hasVoted ? (
                  {/* Voting form when user hasn't voted yet */}
                  <div className="flex items-center w-full">
                    <input
                      type="radio"
                      id={option.id}
                      name="poll-option"
                      value={option.id}
                      checked={selectedOption === option.id}
                      onChange={() => setSelectedOption(option.id)}
                      className="mr-2"
                    />
                    <label htmlFor={option.id} className="flex-grow">
                      {option.text}
                    </label>
                  </div>
                ) : (
                  {/* Results display when user has voted */}
                  <div className="w-full">
                    {/* Option text and vote count/percentage */}
                    <div className="flex justify-between mb-1">
                      <span>{option.text}</span>
                      <span>{getPercentage(option.votes)}% ({option.votes} votes)</span>
                    </div>
                    {/* Progress bar visualization */}
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div
                        className="bg-primary h-2.5 rounded-full"
                        style={{ width: `${getPercentage(option.votes)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Vote submission button (only shown before voting) */}
          {!hasVoted && (
            <Button 
              onClick={handleVote} 
              disabled={!selectedOption || isSubmitting} 
              className="mt-4"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Vote'}
            </Button>
          )}

          {/* Thank you message (only shown after voting) */}
          {hasVoted && (
            <div className="mt-4 p-4 bg-muted rounded-md">
              <p className="text-center">Thank you for voting!</p>
            </div>
          )}
        </CardContent>
        
        {/* Poll metadata footer */}
        <CardFooter className="flex flex-col gap-2 text-sm text-muted-foreground">
          {/* Creator and creation date */}
          <div className="flex justify-between w-full">
            <p>Created by {poll.createdBy}</p>
            <p>Created on {poll.createdAt}</p>
          </div>
          
          {/* Expiration date (if present) */}
          {poll.expiresAt && (
            <div className="w-full">
              <p className="text-sm text-muted-foreground">
                Expires on: {new Date(poll.expiresAt).toLocaleDateString()}
              </p>
            </div>
          )}
        </CardFooter>
      </Card>
      ) : (
        {/* Error state when poll couldn't be loaded */}
        <div className="max-w-3xl mx-auto text-center py-10 bg-muted rounded-lg">
          <h3 className="text-xl font-medium mb-2">Error loading poll</h3>
          <p className="text-muted-foreground mb-4">Unable to load the poll. Please try again later.</p>
          <Link href="/polls">
            <Button>Return to Polls</Button>
          </Link>
        </div>
      )}
    </div>
  );
}