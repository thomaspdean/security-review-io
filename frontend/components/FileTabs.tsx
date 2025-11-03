"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Problem } from "@/lib/types";

interface FileTabsProps {
  files: Problem["files"];
  activePath: string;
  onChange: (path: string) => void;
}

export function FileTabs({ files, activePath, onChange }: FileTabsProps) {
  return (
    <Tabs value={activePath} onValueChange={onChange}>
      <TabsList className="w-full justify-start overflow-x-auto">
        {files.map((file) => (
          <TabsTrigger
            key={file.path}
            value={file.path}
            className="data-[state=active]:bg-background"
          >
            {file.path}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

