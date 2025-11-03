"use client";

import { useMemo } from "react";
import { Problem } from "@/lib/types";
import { ProblemCard } from "./ProblemCard";

interface ProblemListProps {
  problems: Problem[];
  query?: string;
  topicFilter?: Problem["topic"] | "all";
  difficultyFilter?: number | "all";
}

export function ProblemList({
  problems,
  query = "",
  topicFilter = "all",
  difficultyFilter = "all",
}: ProblemListProps) {
  const filteredProblems = useMemo(() => {
    let filtered = [...problems];

    // Search filter
    if (query.trim()) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(lowerQuery) ||
          p.topic.toLowerCase().includes(lowerQuery) ||
          p.summary.toLowerCase().includes(lowerQuery) ||
          p.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
      );
    }

    // Topic filter
    if (topicFilter !== "all") {
      filtered = filtered.filter((p) => p.topic === topicFilter);
    }

    // Difficulty filter
    if (difficultyFilter !== "all") {
      filtered = filtered.filter((p) => p.difficulty === difficultyFilter);
    }

    // Sort by difficulty (asc) then by title
    filtered.sort((a, b) => {
      if (a.difficulty !== b.difficulty) {
        return a.difficulty - b.difficulty;
      }
      return a.title.localeCompare(b.title);
    });

    return filtered;
  }, [problems, query, topicFilter, difficultyFilter]);

  if (filteredProblems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No problems found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProblems.map((problem) => (
        <ProblemCard key={problem.slug} problem={problem} />
      ))}
    </div>
  );
}

