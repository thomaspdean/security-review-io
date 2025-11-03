import Link from "next/link";
import { Shield } from "lucide-react";

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 text-lg font-semibold hover:opacity-80 transition-opacity"
          >
            <Shield className="h-6 w-6" />
            <span>Security Review</span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link
              href="/problems"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Problems
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

