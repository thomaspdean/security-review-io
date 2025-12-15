import { ProblemProgress, UserProgress } from "./types";

const DB_NAME = "SecurityReviewDB";
const STORE_NAME = "progress";
const DB_VERSION = 1;
const PROGRESS_VERSION = "1.0.0";

// Open IndexedDB database
async function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "slug" });
        store.createIndex("completed", "completed", { unique: false });
        store.createIndex("score", "score", { unique: false });
        store.createIndex("submittedAt", "submittedAt", { unique: false });
      }
    };
  });
}

// Check if IndexedDB is available
function isIndexedDBAvailable(): boolean {
  return typeof window !== "undefined" && "indexedDB" in window;
}

// Get all progress from IndexedDB
export async function getAllProgress(): Promise<UserProgress> {
  if (!isIndexedDBAvailable()) {
    return {
      problems: {},
      lastUpdated: new Date().toISOString(),
      version: PROGRESS_VERSION,
    };
  }

  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], "readonly");
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => {
        const problems: Record<string, ProblemProgress> = {};
        request.result.forEach((item: ProblemProgress) => {
          problems[item.slug] = item;
        });
        resolve({
          problems,
          lastUpdated: new Date().toISOString(),
          version: PROGRESS_VERSION,
        });
      };
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Error loading progress from IndexedDB:", error);
    return {
      problems: {},
      lastUpdated: new Date().toISOString(),
      version: PROGRESS_VERSION,
    };
  }
}

// Get progress for a specific problem
export async function getProblemProgress(
  slug: string
): Promise<ProblemProgress | null> {
  if (!isIndexedDBAvailable()) {
    return null;
  }

  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], "readonly");
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.get(slug);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Error getting problem progress:", error);
    return null;
  }
}

// Save progress for a problem
export async function saveProgress(
  problemSlug: string,
  progress: ProblemProgress
): Promise<void> {
  if (!isIndexedDBAvailable()) {
    console.warn("IndexedDB not available, progress not saved");
    return;
  }

  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    const progressToSave: ProblemProgress = {
      ...progress,
      slug: problemSlug,
      submittedAt: progress.submittedAt || new Date().toISOString(),
    };

    return new Promise((resolve, reject) => {
      const request = store.put(progressToSave);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Error saving progress to IndexedDB:", error);
    throw error;
  }
}

// Clear all progress
export async function clearAllProgress(): Promise<void> {
  if (!isIndexedDBAvailable()) {
    return;
  }

  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Error clearing progress:", error);
    throw error;
  }
}

// Import progress from UserProgress object
export async function importProgress(data: UserProgress): Promise<void> {
  if (!isIndexedDBAvailable()) {
    throw new Error("IndexedDB not available");
  }

  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    // Clear existing data
    await store.clear();

    // Import new data
    const promises = Object.values(data.problems).map((progress) => {
      return new Promise<void>((resolve, reject) => {
        const request = store.put(progress);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    });

    await Promise.all(promises);
  } catch (error) {
    console.error("Error importing progress:", error);
    throw error;
  }
}

