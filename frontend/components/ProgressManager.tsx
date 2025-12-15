"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download, Upload, CheckCircle2, AlertCircle } from "lucide-react";
import {
  exportProgressToFile,
  importProgressFromFile,
} from "@/lib/progress-export";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProgressManagerProps {
  onImportSuccess?: () => void;
}

export function ProgressManager({ onImportSuccess }: ProgressManagerProps = {}) {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState<boolean | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportProgressToFile();
      // Success - file download started
    } catch (error) {
      alert("Failed to export progress. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportSuccess(null);

    try {
      const success = await importProgressFromFile(file);
      setImportSuccess(success);
      if (success) {
        // Call refresh callback if provided
        if (onImportSuccess) {
          onImportSuccess();
        }
        // Reload page to show imported progress
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      setImportSuccess(false);
    } finally {
      setIsImporting(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Progress Management</CardTitle>
        <CardDescription>
          Export your progress for backup or import previously saved progress
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button
            onClick={handleExport}
            disabled={isExporting}
            variant="outline"
            className="flex-1"
          >
            <Download className="h-4 w-4 mr-2" />
            {isExporting ? "Exporting..." : "Export Progress"}
          </Button>
          <Button
            onClick={handleImport}
            disabled={isImporting}
            variant="outline"
            className="flex-1"
          >
            <Upload className="h-4 w-4 mr-2" />
            {isImporting ? "Importing..." : "Import Progress"}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {importSuccess === true && (
          <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
            <CheckCircle2 className="h-4 w-4" />
            Progress imported successfully! Page will reload...
          </div>
        )}

        {importSuccess === false && (
          <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
            <AlertCircle className="h-4 w-4" />
            Failed to import progress. Please check the file format.
          </div>
        )}

        <div className="text-xs text-muted-foreground border-t pt-4">
          <p className="font-medium mb-1">💡 Tip:</p>
          <p>
            Export your progress regularly to create permanent backups. Your
            progress is automatically saved to your browser, but exporting ensures
            you have a backup that survives browser cache clearing.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

