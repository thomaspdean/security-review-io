"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

interface ProblemFeedbackProps {
  userSelectedLines: number[];
  correctLines: number[];
  userExplanation: string;
  correctExplanation: string;
}

export function ProblemFeedback({
  userSelectedLines,
  correctLines,
  userExplanation,
  correctExplanation,
}: ProblemFeedbackProps) {
  const sortedUserLines = [...userSelectedLines].sort((a, b) => a - b);
  const sortedCorrectLines = [...correctLines].sort((a, b) => a - b);

  const correctSelections = sortedUserLines.filter((line) =>
    correctLines.includes(line)
  );
  const missedLines = sortedCorrectLines.filter(
    (line) => !userSelectedLines.includes(line)
  );
  const falsePositives = sortedUserLines.filter(
    (line) => !correctLines.includes(line)
  );

  const score =
    correctLines.length > 0
      ? Math.round(
          (correctSelections.length / correctLines.length) * 100 -
            falsePositives.length * 10
        )
      : 0;
  const finalScore = Math.max(0, Math.min(100, score));

  return (
    <div className="space-y-4">
      {/* Score Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Review Results
            <Badge
              variant={finalScore >= 80 ? "default" : finalScore >= 50 ? "secondary" : "destructive"}
              className="ml-auto"
            >
              Score: {finalScore}%
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Correct Selections */}
          {correctSelections.length > 0 && (
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-green-600">Correctly Identified</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {correctSelections.map((line) => (
                    <Badge key={line} variant="outline" className="bg-green-50">
                      Line {line}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Missed Lines */}
          {missedLines.length > 0 && (
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-600">Missed Vulnerable Lines</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {missedLines.map((line) => (
                    <Badge key={line} variant="outline" className="bg-yellow-50">
                      Line {line}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* False Positives */}
          {falsePositives.length > 0 && (
            <div className="flex items-start gap-2">
              <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <p className="font-medium text-red-600">Incorrectly Selected</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {falsePositives.map((line) => (
                    <Badge key={line} variant="outline" className="bg-red-50">
                      Line {line}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Correct Explanation */}
      <Card>
        <CardHeader>
          <CardTitle>Correct Explanation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <p className="text-sm font-medium mb-1">Vulnerable Lines:</p>
              <div className="flex flex-wrap gap-1">
                {sortedCorrectLines.map((line) => (
                  <Badge key={line} variant="secondary">
                    Line {line}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Why These Lines Are Vulnerable:</p>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {correctExplanation}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Explanation (for comparison) */}
      {userExplanation && (
        <Card>
          <CardHeader>
            <CardTitle>Your Explanation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {userExplanation}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

