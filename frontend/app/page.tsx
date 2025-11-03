import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProblemCard } from "@/components/ProblemCard";
import { getProblems } from "@/lib/problems";

export default async function Home() {
  const problems = await getProblems();
  const featuredProblems = problems.slice(0, 3);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Security Code Review
          <br />
          Practice Platform
        </h1>
        <p className="mx-auto max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          Sharpen your security skills by reviewing real-world vulnerable code.
          Identify vulnerabilities, understand exploits, and improve your code
          review expertise.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/problems">Browse Problems</Link>
          </Button>
        </div>
      </section>

      {/* Featured Problems */}
      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Featured Problems</h2>
          <p className="text-muted-foreground">
            Get started with these popular security challenges
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProblems.map((problem) => (
            <ProblemCard key={problem.slug} problem={problem} />
          ))}
        </div>
      </section>
    </div>
  );
}

