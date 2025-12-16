import { UserProgress } from "./types";
import { getAllProgress, importProgress } from "./progress-indexeddb";

// Export progress as JSON file download
export async function exportProgressToFile(): Promise<void> {
  try {
    const progress = await getAllProgress();
    const json = JSON.stringify(progress, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `security-review-io-progress-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error exporting progress:", error);
    throw new Error("Failed to export progress");
  }
}

// Import progress from JSON file
export async function importProgressFromFile(file: File): Promise<boolean> {
  try {
    const text = await file.text();
    const data = JSON.parse(text) as UserProgress;

    // Validate structure
    if (!data || typeof data !== "object") {
      throw new Error("Invalid progress file format");
    }

    // Ensure it has the expected structure
    if (!data.problems) {
      data.problems = {};
    }
    if (!data.version) {
      data.version = "1.0.0";
    }
    if (!data.lastUpdated) {
      data.lastUpdated = new Date().toISOString();
    }

    await importProgress(data);
    return true;
  } catch (error) {
    console.error("Error importing progress:", error);
    return false;
  }
}

// Get progress as JSON string (for copying)
export async function getProgressAsJSON(): Promise<string> {
  const progress = await getAllProgress();
  return JSON.stringify(progress, null, 2);
}

