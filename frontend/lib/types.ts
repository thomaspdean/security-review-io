export type Topic = "sqli" | "xss" | "crypto" | "auth" | "deserialization";

export type Language =
  | "python"
  | "javascript"
  | "html"
  | "java"
  | "c";

export type Problem = {
  slug: string;
  title: string;
  topic: Topic;
  difficulty: 1 | 2 | 3 | 4 | 5;
  summary: string;
  files: Array<{
    path: string;
    language: Language;
    src: string;
  }>;
  tags?: string[];
  solution?: {
    vulnerableLines: number[];
    explanation: string;
  };
};

export type ProblemWithContent = Problem & {
  files: Array<{
    path: string;
    language: Language;
    src: string;
    content: string;
  }>;
};

export type ProblemProgress = {
  slug: string;
  completed: boolean;
  score?: number;
  submittedAt?: string;
  selectedLines?: number[];
  explanation?: string;
};

export type UserProgress = {
  problems: Record<string, ProblemProgress>;
  lastUpdated: string;
  version: string;
};

