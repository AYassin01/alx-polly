import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Create and Share Polls with <span className="text-primary">ALX Polly</span>
        </h1>
        
        <p className="text-xl text-muted-foreground">
          A simple, fast, and beautiful way to create polls and gather opinions from your audience.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button size="lg" asChild>
            <Link href="/polls/create">Create a Poll</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/polls">Browse Polls</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold">Create a Poll</h3>
              <p className="text-muted-foreground">
                Design your poll with multiple options and customize it to fit your needs.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold">Share with Others</h3>
              <p className="text-muted-foreground">
                Share your poll with friends, colleagues, or the public to collect responses.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold">Analyze Results</h3>
              <p className="text-muted-foreground">
                View real-time results and insights from your poll responses.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
