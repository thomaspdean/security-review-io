import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileTabs } from "@/components/FileTabs";
import { CodeViewer } from "@/components/CodeViewer";
import { getProblemBySlug } from "@/lib/problems";
import { ProblemDetailContent } from "./ProblemDetailContent";

interface ProblemDetailPageProps {
  params: Promise<{ slug: string }>;
}

function DifficultyDots({ difficulty }: { difficulty: number }) {
  return (
    <div className="flex items-center space-x-1" aria-label={`Difficulty: ${difficulty} out of 5`}>
      {[1, 2, 3, 4, 5].map((level) => (
        <div
          key={level}
          className={`h-3 w-3 rounded-full ${
            level <= difficulty ? "bg-primary" : "bg-muted"
          }`}
        />
      ))}
    </div>
  );
}

function TopicBadge({ topic }: { topic: string }) {
  const topicColors: Record<string, string> = {
    sqli: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    xss: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    crypto: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    auth: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    deserialization: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  };

  return (
    <Badge variant="outline" className={topicColors[topic] || ""}>
      {topic.toUpperCase()}
    </Badge>
  );
}

export default async function ProblemDetailPage({ params }: ProblemDetailPageProps) {
  const { slug } = await params;
  const problem = await getProblemBySlug(slug);

  if (!problem) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/problems" aria-label="Back to problems">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">{problem.title}</h1>
            <TopicBadge topic={problem.topic} />
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>Difficulty:</span>
              <DifficultyDots difficulty={problem.difficulty} />
            </div>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{problem.summary}</p>
          {problem.tags && problem.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {problem.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Code Files</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ProblemDetailContent problem={problem} />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button size="lg">Start Review</Button>
      </div>
    </div>
  );
}

