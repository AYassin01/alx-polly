/**
 * Poll Card Component
 * 
 * This component renders a card displaying a poll's summary information.
 * It shows the poll title, description, options count, votes count, creator,
 * creation date, and expiration date (if present).
 * 
 * The card is wrapped in a Link component, making the entire card clickable
 * to navigate to the detailed poll page.
 */

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Poll } from '@/types';

/**
 * Props for the PollCard component
 */
type PollCardProps = {
  /** The poll data to display */
  poll: Poll;
  /** Optional CSS class name for additional styling */
  className?: string;
};

/**
 * PollCard component that displays a summary of a poll
 * 
 * @param {PollCardProps} props - The component props
 * @returns {JSX.Element} The poll card component
 */
export function PollCard({ poll, className = '' }: PollCardProps) {
  return (
    <Link href={`/polls/${poll.id}`} className="block">
      <Card className={`h-full hover:shadow-md transition-shadow ${className}`}>
        {/* Poll title and description */}
        <CardHeader>
          <CardTitle>{poll.title}</CardTitle>
          <CardDescription>{poll.description}</CardDescription>
        </CardHeader>
        
        {/* Poll statistics */}
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {poll.options.length} options • {poll.votes} votes
          </p>
        </CardContent>
        
        {/* Poll metadata */}
        <CardFooter className="flex flex-col gap-2">
          {/* Creator and creation date */}
          <div className="flex justify-between w-full">
            <p className="text-sm text-muted-foreground">By {poll.createdBy}</p>
            <p className="text-sm text-muted-foreground">{poll.createdAt}</p>
          </div>
          
          {/* Expiration date (if present) */}
          {poll.expiresAt && (
            <div className="w-full">
              <p className="text-sm text-muted-foreground">
                Expires: {new Date(poll.expiresAt).toLocaleDateString()}
              </p>
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}