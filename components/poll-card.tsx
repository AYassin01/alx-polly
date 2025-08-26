import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Poll } from '@/types';

type PollCardProps = {
  poll: Poll;
  className?: string;
};

export function PollCard({ poll, className = '' }: PollCardProps) {
  return (
    <Link href={`/polls/${poll.id}`} className="block">
      <Card className={`h-full hover:shadow-md transition-shadow ${className}`}>
        <CardHeader>
          <CardTitle>{poll.title}</CardTitle>
          <CardDescription>{poll.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {poll.options.length} options • {poll.votes} votes
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <div className="flex justify-between w-full">
            <p className="text-sm text-muted-foreground">By {poll.createdBy}</p>
            <p className="text-sm text-muted-foreground">{poll.createdAt}</p>
          </div>
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