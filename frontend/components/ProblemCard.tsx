import Link from "next/link";
import { Problem } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProblemCardProps {
  problem: Problem;
}

function DifficultyDots({ difficulty }: { difficulty: number }) {
  return (
    <div className="flex items-center space-x-1" aria-label={`Difficulty: ${difficulty} out of 5`}>
      {[1, 2, 3, 4, 5].map((level) => (
        <div
          key={level}
          className={`h-2 w-2 rounded-full ${
            level <= difficulty
              ? "bg-primary"
              : "bg-muted"
          }`}
        />
      ))}
    </div>
  );
}

function TopicBadge({ topic }: { topic: Problem["topic"] }) {
  const topicColors: Record<Problem["topic"], string> = {
    sqli: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    xss: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    crypto: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    auth: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    deserialization: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  };

  return (
    <Badge variant="outline" className={topicColors[topic]}>
      {topic.toUpperCase()}
    </Badge>
  );
}

export function ProblemCard({ problem }: ProblemCardProps) {
  return (
    <Link href={`/problems/${problem.slug}`} className="block h-full">
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-xl">{problem.title}</CardTitle>
            <TopicBadge topic={problem.topic} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Difficulty</span>
            <DifficultyDots difficulty={problem.difficulty} />
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {problem.summary}
          </p>
          {problem.tags && problem.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {problem.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

