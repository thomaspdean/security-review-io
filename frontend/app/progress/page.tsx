"use client";

import { useEffect, useState } from "react";
import { ProgressManager } from "@/components/ProgressManager";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllProgress } from "@/lib/progress-indexeddb";
import { ProgressStats } from "@/components/ProgressStats";
import { UserProgress } from "@/lib/types";

export default function ProgressPage() {
  const [progress, setProgress] = useState<UserProgress>({
    problems: {},
    lastUpdated: new Date().toISOString(),
    version: "1.0.0",
  });

  const loadProgress = () => {
    getAllProgress().then(setProgress);
  };

  useEffect(() => {
    loadProgress();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Progress</h1>
        <p className="text-muted-foreground mt-2">
          Manage your progress and create backups
        </p>
      </div>

      <ProgressStats progress={progress} />

      <ProgressManager onImportSuccess={loadProgress} />

      <Card>
        <CardHeader>
          <CardTitle>About Progress Storage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            Your progress is automatically saved to your browser's IndexedDB
            storage. This means:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Progress persists across browser sessions</li>
            <li>Works completely offline</li>
            <li>Fast and automatic saving</li>
          </ul>
          <p className="pt-2">
            <strong>Important:</strong> Progress stored in your browser can be
            cleared if you clear your browser cache. Use the Export feature
            above to create permanent backups that you can restore anytime.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

