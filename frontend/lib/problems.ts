import { promises as fs } from "fs";
import path from "path";
import { Problem, ProblemWithContent } from "./types";

const PROBLEMS_FILE = path.join(process.cwd(), "data", "problems.json");
const PROBLEMS_DIR = path.join(process.cwd(), "data", "problems");

export async function getProblems(): Promise<Problem[]> {
  const fileContents = await fs.readFile(PROBLEMS_FILE, "utf8");
  return JSON.parse(fileContents) as Problem[];
}

export async function getProblemBySlug(
  slug: string
): Promise<ProblemWithContent | null> {
  const problems = await getProblems();
  const problem = problems.find((p) => p.slug === slug);

  if (!problem) {
    return null;
  }

  // Read file contents
  const filesWithContent = await Promise.all(
    problem.files.map(async (file) => {
      const filePath = path.join(PROBLEMS_DIR, slug, file.src);
      try {
        const content = await fs.readFile(filePath, "utf8");
        return {
          ...file,
          content,
        };
      } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        return {
          ...file,
          content: `// Error: Could not read file ${file.src}`,
        };
      }
    })
  );

  return {
    ...problem,
    files: filesWithContent,
  };
}

