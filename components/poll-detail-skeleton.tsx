import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PollDetailSkeleton() {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="space-y-2">
        <Skeleton className="h-8 w-4/5" />
        <Skeleton className="h-5 w-3/5" />
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Option skeletons */}
        {Array(4).fill(0).map((_, index) => (
          <div key={`option-skeleton-${index}`} className="space-y-2">
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-2 w-1/5" />
          </div>
        ))}
        <Skeleton className="h-10 w-1/3 mt-4" />
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