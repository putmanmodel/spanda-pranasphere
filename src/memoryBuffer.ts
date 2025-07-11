import { ToneMemoryEntry } from "./types";
import { ToneSnapshot } from "./modules/stackedDeviation";

const memory: ToneMemoryEntry[] = [];

// Add a tone-tagged chunk to memory
export function addToMemory(entry: ToneMemoryEntry) {
  memory.push(entry);
  if (memory.length > 50) memory.shift(); // optional sliding window
}

// Retrieve the N most recent memory entries
export function getRecent(n: number = 3): ToneMemoryEntry[] {
  return memory.slice(-n);
}

// Optional: clear memory (for new session)
export function resetMemory() {
  memory.length = 0;
}

export function getMemory(): ToneSnapshot[] {
  return memory.map(entry => ({
    pole: entry.tone.pole,
    code: entry.tone.code,
    deviation: entry.tone.vector[0],
    timestamp: entry.timestamp
  }));
}