'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Mock data for a single poll
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
};

export default function PollPage({ params }: { params: { id: string } }) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // In a real app, we would fetch the poll data based on the ID
  const pollId = params.id;
  const poll = mockPoll; // This would be replaced with actual data fetching

  const handleVote = () => {
    if (!selectedOption) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setHasVoted(true);
      setIsSubmitting(false);
    }, 1000);
  };

  // Calculate percentage for progress bars
  const getPercentage = (votes: number) => {
    return poll.totalVotes > 0 ? Math.round((votes / poll.totalVotes) * 100) : 0;
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Link href="/polls" className="text-primary hover:underline">
          ← Back to all polls
        </Link>
      </div>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">{poll.title}</CardTitle>
          <CardDescription>{poll.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {poll.options.map((option) => (
            <div key={option.id} className="space-y-2">
              <div className="flex items-center">
                {!hasVoted ? (
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
                  <div className="w-full">
                    <div className="flex justify-between mb-1">
                      <span>{option.text}</span>
                      <span>{getPercentage(option.votes)}% ({option.votes} votes)</span>
                    </div>
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

          {!hasVoted && (
            <Button 
              onClick={handleVote} 
              disabled={!selectedOption || isSubmitting} 
              className="mt-4"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Vote'}
            </Button>
          )}

          {hasVoted && (
            <div className="mt-4 p-4 bg-muted rounded-md">
              <p className="text-center">Thank you for voting!</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground">
          <p>Created by {poll.createdBy}</p>
          <p>Created on {poll.createdAt}</p>
        </CardFooter>
      </Card>
    </div>
  );
}