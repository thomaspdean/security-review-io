"use client";

import { useState } from "react";
import { FileTabs } from "@/components/FileTabs";
import { InteractiveCodeViewer } from "@/components/InteractiveCodeViewer";
import { ProblemSubmission } from "@/components/ProblemSubmission";
import { ProblemFeedback } from "@/components/ProblemFeedback";
import { ProblemWithContent } from "@/lib/types";

interface ProblemDetailContentProps {
  problem: ProblemWithContent;
}

export function ProblemDetailContent({ problem }: ProblemDetailContentProps) {
  const [activePath, setActivePath] = useState(problem.files[0]?.path || "");
  const [selectedLines, setSelectedLines] = useState<number[]>([]);
  const [explanation, setExplanation] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const activeFile = problem.files.find((f) => f.path === activePath);

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

  const handleSubmit = () => {
    if (selectedLines.length === 0 || !explanation.trim()) return;
    setIsSubmitted(true);
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
