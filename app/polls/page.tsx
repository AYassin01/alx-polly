'use client';

/**
 * Polls Page Component
 * 
 * This page displays a list of all available polls with options to create new polls.
 * It includes loading states, empty state handling, and responsive grid layout.
 */

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PollCard } from '@/components/poll-card';
import { PollCardSkeleton } from '@/components/poll-card-skeleton';
import { Poll } from '@/types';
import { useState, useEffect } from 'react';

/**
 * Mock data for polls
 * 
 * This data simulates polls that would normally be fetched from a database.
 * Each poll contains information about the poll question, options, votes, creator, and dates.
 */
const mockPolls: Poll[] = [
  {
    id: '1',
    title: 'Favorite Programming Language',
    description: 'What is your favorite programming language?',
    options: ['JavaScript', 'Python', 'Java', 'C#', 'Go'],
    votes: 42,
    createdBy: 'John Doe',
    createdAt: '2023-05-15',
    expiresAt: '2023-06-15',
  },
  {
    id: '2',
    title: 'Best Frontend Framework',
    description: 'Which frontend framework do you prefer?',
    options: ['React', 'Vue', 'Angular', 'Svelte'],
    votes: 38,
    createdBy: 'Jane Smith',
    createdAt: '2023-05-10',
    expiresAt: '2023-06-10',
  },
  {
    id: '3',
    title: 'Preferred Database',
    description: 'What database do you use most often?',
    options: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite', 'Redis'],
    votes: 27,
    createdBy: 'Alex Johnson',
    createdAt: '2023-05-05',
  },
];

/**
 * PollsPage Component
 * 
 * Main component for displaying all available polls.
 * Handles data fetching, loading states, and rendering of poll cards.
 * 
 * @returns React component that displays the polls listing page
 */
export default function PollsPage() {
  // State for storing the list of polls
  const [polls, setPolls] = useState<Poll[]>([]);
  
  // State for tracking loading status
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * Fetches polls data from the server
     * In this implementation, it simulates an API call with mock data and delay
     */
    const fetchPolls = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call to fetch polls from the database
        await new Promise(resolve => setTimeout(resolve, 1500));
        setPolls(mockPolls);
      } catch (error) {
        console.error('Error fetching polls:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, []);

  return (
    <div className="container mx-auto py-8">
      {/* Header section with title and create button */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All Polls</h1>
        <Link href="/polls/create">
          <Button>Create New Poll</Button>
        </Link>
      </div>

      {/* Responsive grid layout for poll cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Show skeleton loaders while loading
          Array(6).fill(0).map((_, index) => (
            <PollCardSkeleton key={`skeleton-${index}`} />
          ))
        ) : polls.length > 0 ? (
          // Show polls when loaded
          polls.map((poll) => (
            <PollCard key={poll.id} poll={poll} />
          ))
        ) : (
          // Show empty state message when no polls are available
          <div className="col-span-full text-center py-10">
            <h3 className="text-xl font-medium mb-2">No polls available</h3>
            <p className="text-muted-foreground mb-4">Create a new poll to get started!</p>
            <Link href="/polls/create">
              <Button>Create New Poll</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}