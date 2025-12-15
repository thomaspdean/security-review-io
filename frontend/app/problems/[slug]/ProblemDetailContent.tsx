"use client";

import { useState, useEffect } from "react";
import { FileTabs } from "@/components/FileTabs";
import { InteractiveCodeViewer } from "@/components/InteractiveCodeViewer";
import { ProblemSubmission } from "@/components/ProblemSubmission";
import { ProblemFeedback } from "@/components/ProblemFeedback";
import { ProblemWithContent } from "@/lib/types";
import { saveProgress, getProblemProgress } from "@/lib/progress-indexeddb";
import { ProblemProgress } from "@/lib/types";

interface ProblemDetailContentProps {
  problem: ProblemWithContent;
}

export function ProblemDetailContent({ problem }: ProblemDetailContentProps) {
  const [activePath, setActivePath] = useState(problem.files[0]?.path || "");
  const [selectedLines, setSelectedLines] = useState<number[]>([]);
  const [explanation, setExplanation] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const activeFile = problem.files.find((f) => f.path === activePath);

  // Load existing progress on mount
  useEffect(() => {
    getProblemProgress(problem.slug).then((progress) => {
      if (progress?.completed) {
        setIsSubmitted(true);
        if (progress.selectedLines) {
          setSelectedLines(progress.selectedLines);
        }
        if (progress.explanation) {
          setExplanation(progress.explanation);
        }
      }
    });
  }, [problem.slug]);

  const handleLineClick = (line: number) => {
    if (isSubmitted) return; // Don't allow changes after submission

    setSelectedLines((prev) => {
      if (prev.includes(line)) {
        // Remove line if already selected
        return prev.filter((l) => l !== line);
      } else {
        // Add line
        return [...prev, line];
      }
    });
  };

  const handleLineRemove = (line: number) => {
    setSelectedLines((prev) => prev.filter((l) => l !== line));
  };

  const handleSubmit = async () => {
    if (selectedLines.length === 0 || !explanation.trim()) return;
    
    // Calculate score
    const correctLines = problem.solution?.vulnerableLines || [];
    const correctSelections = selectedLines.filter((l) =>
      correctLines.includes(l)
    );
    const missedLines = correctLines.filter(
      (l) => !selectedLines.includes(l)
    );
    const falsePositives = selectedLines.filter(
      (l) => !correctLines.includes(l)
    );

    const score =
      correctLines.length > 0
        ? Math.max(
            0,
            Math.min(
              100,
              Math.round(
                (correctSelections.length / correctLines.length) * 100 -
                  falsePositives.length * 10
              )
            )
          )
        : 0;

    setIsSubmitted(true);

    // Save progress to IndexedDB
    try {
      await saveProgress(problem.slug, {
        slug: problem.slug,
        completed: true,
        score,
        selectedLines,
        explanation,
        submittedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Failed to save progress:", error);
      // Don't block UI if save fails
    }
  };

  const correctLines = problem.solution?.vulnerableLines || [];
  const correctExplanation = problem.solution?.explanation || "";

  return (
    <div className="space-y-6">
      <FileTabs
        files={problem.files}
        activePath={activePath}
        onChange={setActivePath}
      />
      {activeFile && (
        <div className="space-y-4">
          <InteractiveCodeViewer
            value={activeFile.content}
            language={activeFile.language}
            height="600px"
            selectedLines={selectedLines}
            onLineClick={handleLineClick}
            highlightedLines={isSubmitted ? correctLines : []}
          />
        </div>
      )}

      {!isSubmitted ? (
        <ProblemSubmission
          selectedLines={selectedLines}
          explanation={explanation}
          onLineRemove={handleLineRemove}
          onExplanationChange={setExplanation}
          onSubmit={handleSubmit}
        />
      ) : (
        <ProblemFeedback
          userSelectedLines={selectedLines}
          correctLines={correctLines}
          userExplanation={explanation}
          correctExplanation={correctExplanation}
        />
      )}
    </div>
  );
}
