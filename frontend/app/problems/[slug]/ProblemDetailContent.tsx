"use client";

import { useState } from "react";
import { FileTabs } from "@/components/FileTabs";
import { CodeViewer } from "@/components/CodeViewer";
import { ProblemWithContent } from "@/lib/types";

interface ProblemDetailContentProps {
  problem: ProblemWithContent;
}

export function ProblemDetailContent({ problem }: ProblemDetailContentProps) {
  const [activePath, setActivePath] = useState(problem.files[0]?.path || "");

  const activeFile = problem.files.find((f) => f.path === activePath);

  return (
    <div className="space-y-4">
      <FileTabs
        files={problem.files}
        activePath={activePath}
        onChange={setActivePath}
      />
      {activeFile && (
        <CodeViewer
          value={activeFile.content}
          language={activeFile.language}
          height="600px"
        />
      )}
    </div>
  );
}

