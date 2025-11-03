"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { ProblemList } from "@/components/ProblemList";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Problem, Topic } from "@/lib/types";

interface ProblemsPageClientProps {
  initialProblems: Problem[];
}

export function ProblemsPageClient({ initialProblems }: ProblemsPageClientProps) {
  const [query, setQuery] = useState("");
  const [topicFilter, setTopicFilter] = useState<Topic | "all">("all");
  const [difficultyFilter, setDifficultyFilter] = useState<number | "all">("all");

  const topics: Topic[] = ["sqli", "xss", "crypto", "auth", "deserialization"];
  const difficulties = [1, 2, 3, 4, 5];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Problems</h1>
        <p className="text-muted-foreground mt-2">
          Explore security vulnerabilities and practice your code review skills
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="search"
          placeholder="Search problems by title, topic, or tags..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
          aria-label="Search problems"
        />
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Filter by Topic</h3>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={topicFilter === "all" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setTopicFilter("all")}
            >
              All
            </Badge>
            {topics.map((topic) => (
              <Badge
                key={topic}
                variant={topicFilter === topic ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setTopicFilter(topic)}
              >
                {topic.toUpperCase()}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Filter by Difficulty</h3>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={difficultyFilter === "all" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setDifficultyFilter("all")}
            >
              All
            </Badge>
            {difficulties.map((difficulty) => (
              <Badge
                key={difficulty}
                variant={difficultyFilter === difficulty ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setDifficultyFilter(difficulty)}
              >
                {difficulty}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Problem List */}
      <ProblemList
        problems={initialProblems}
        query={query}
        topicFilter={topicFilter}
        difficultyFilter={difficultyFilter}
      />
    </div>
  );
}

