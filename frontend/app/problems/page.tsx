import { getProblems } from "@/lib/problems";
import { ProblemsPageClient } from "./ProblemsPageClient";

export default async function ProblemsPage() {
  const problems = await getProblems();
  return <ProblemsPageClient initialProblems={problems} />;
}

