import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PollCardSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader className="space-y-2">
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-4 w-3/5" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-2/5" />
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <div className="flex justify-between w-full">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <div className="w-full">
          <Skeleton className="h-4 w-2/5" />
        </div>
      </CardFooter>
    </Card>
  );
}