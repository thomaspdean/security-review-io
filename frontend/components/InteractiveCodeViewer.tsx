"use client";

import { useState, useEffect } from "react";
import { Language } from "@/lib/types";

interface InteractiveCodeViewerProps {
  value: string;
  language: Language;
  height?: string;
  selectedLines?: number[];
  onLineClick?: (line: number) => void;
  highlightedLines?: number[];
}

// Simple syntax highlighting classes (basic, can be enhanced later)
const getLanguageClass = (language: Language): string => {
  const langMap: Record<Language, string> = {
    python: "language-python",
    javascript: "language-javascript",
    html: "language-html",
    java: "language-java",
    c: "language-c",
  };
  return langMap[language] || "";
};

export function InteractiveCodeViewer({
  value,
  language,
  height = "600px",
  selectedLines = [],
  onLineClick,
  highlightedLines = [],
}: InteractiveCodeViewerProps) {
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);
  const lines = value.split("\n");

  const handleLineClick = (lineNumber: number) => {
    if (onLineClick) {
      onLineClick(lineNumber);
    }
  };

  const isSelected = (lineNumber: number) => selectedLines.includes(lineNumber);
  const isHighlighted = (lineNumber: number) => highlightedLines.includes(lineNumber);

  return (
    <div
      className="rounded-md border overflow-hidden bg-slate-950 dark:bg-slate-950 text-slate-100 font-mono text-sm"
      style={{ height, maxHeight: height }}
    >
      <div className="overflow-auto h-full" style={{ height }}>
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, index) => {
              const lineNumber = index + 1;
              const isLineSelected = isSelected(lineNumber);
              const isLineHighlighted = isHighlighted(lineNumber);
              const isLineHovered = hoveredLine === lineNumber;

              return (
                <tr
                  key={index}
                  className={`group cursor-pointer transition-colors ${
                    isLineSelected
                      ? "bg-blue-500/20 hover:bg-blue-500/30"
                      : isLineHighlighted
                      ? "bg-green-500/20 border-l-4 border-green-500 hover:bg-green-500/30"
                      : isLineHovered
                      ? "bg-slate-800/50"
                      : "hover:bg-slate-800/30"
                  }`}
                  onMouseEnter={() => setHoveredLine(lineNumber)}
                  onMouseLeave={() => setHoveredLine(null)}
                  onClick={() => handleLineClick(lineNumber)}
                >
                  {/* Line Number */}
                  <td
                    className={`px-4 py-1 text-right select-none border-r border-slate-700/50 min-w-[4ch] sticky left-0 bg-inherit ${
                      isLineSelected || isLineHighlighted
                        ? "font-semibold text-blue-300"
                        : "text-slate-500 group-hover:text-slate-400"
                    }`}
                    style={{ userSelect: "none" }}
                  >
                    {lineNumber}
                  </td>
                  {/* Line Content */}
                  <td className="px-4 py-1 w-full">
                    <code className={getLanguageClass(language)}>
                      <span className="whitespace-pre">{line || "\u00A0"}</span>
                    </code>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
