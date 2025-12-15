"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface ProblemSubmissionProps {
  selectedLines: number[];
  explanation: string;
  onLineRemove: (line: number) => void;
  onExplanationChange: (explanation: string) => void;
  onSubmit: () => void;
  isSubmitted?: boolean;
}

export function ProblemSubmission({
  selectedLines,
  explanation,
  onLineRemove,
  onExplanationChange,
  onSubmit,
  isSubmitted = false,
}: ProblemSubmissionProps) {
  const sortedLines = [...selectedLines].sort((a, b) => a - b);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Submission</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Selected Lines */}
        <div>
          <Label className="mb-2 block">Selected Vulnerable Lines</Label>
          {sortedLines.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Click on line numbers in the code to select vulnerable lines
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {sortedLines.map((line) => (
                <Badge
                  key={line}
                  variant="secondary"
                  className="flex items-center gap-1 pr-1"
                >
                  Line {line}
                  {!isSubmitted && (
                    <button
                      onClick={() => onLineRemove(line)}
                      className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                      aria-label={`Remove line ${line}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Explanation */}
        <div>
          <Label htmlFor="explanation" className="mb-2 block">
            Explanation
          </Label>
          <Textarea
            id="explanation"
            placeholder="Explain why these lines are vulnerable..."
            value={explanation}
            onChange={(e) => onExplanationChange(e.target.value)}
            disabled={isSubmitted}
            rows={4}
            className="resize-none"
          />
        </div>

        {/* Submit Button */}
        {!isSubmitted && (
          <div className="flex justify-end">
            <Button
              onClick={onSubmit}
              disabled={selectedLines.length === 0 || !explanation.trim()}
            >
              Submit Review
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

