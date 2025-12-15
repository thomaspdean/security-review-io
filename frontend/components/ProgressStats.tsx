"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserProgress } from "@/lib/types";
import { CheckCircle2, Clock, Trophy } from "lucide-react";

interface ProgressStatsProps {
  progress: UserProgress;
}

export function ProgressStats({ progress }: ProgressStatsProps) {
  const [mounted, setMounted] = useState(false);
  const completed = Object.values(progress.problems).filter((p) => p.completed);
  const completedCount = completed.length;
  const totalProblems = Object.keys(progress.problems).length;
  const averageScore =
    completed.length > 0
      ? Math.round(
          completed.reduce((sum, p) => sum + (p.score || 0), 0) /
            completed.length
        )
      : 0;

  // Only render time on client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completed</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedCount}</div>
          <p className="text-xs text-muted-foreground">
            {totalProblems > 0
              ? `out of ${totalProblems} attempted`
              : "problems completed"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          <Trophy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {completedCount > 0 ? `${averageScore}%` : "—"}
          </div>
          <p className="text-xs text-muted-foreground">
            {completedCount > 0
              ? "across all completed problems"
              : "complete a problem to see your score"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {progress.lastUpdated
              ? new Date(progress.lastUpdated).toLocaleDateString()
              : "Never"}
          </div>
          <p className="text-xs text-muted-foreground">
            {!progress.lastUpdated
              ? "start solving problems"
              : mounted
              ? new Date(progress.lastUpdated).toLocaleTimeString()
              : "—"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

