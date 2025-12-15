"use client";

import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getProblemProgress } from "@/lib/progress-indexeddb";
import { ProblemProgress } from "@/lib/types";

interface ProgressIndicatorProps {
  slug: string;
}

export function ProgressIndicator({ slug }: ProgressIndicatorProps) {
  const [progress, setProgress] = useState<ProblemProgress | null>(null);

  useEffect(() => {
    getProblemProgress(slug).then(setProgress);
  }, [slug]);

  if (!progress?.completed) return null;

  return (
    <Badge
      variant="outline"
      className="flex items-center gap-1 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"
    >
      <CheckCircle2 className="h-3 w-3 text-green-600 dark:text-green-400" />
      <span className="text-green-700 dark:text-green-300">
        Completed
        {progress.score !== undefined && ` (${progress.score}%)`}
      </span>
    </Badge>
  );
}

