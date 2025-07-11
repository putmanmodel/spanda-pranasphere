import { ToneSig, DeviationLevel } from "./types";
import { getRecent } from "./memoryBuffer";

// Basic cosine distance between two vectors
function cosineDistance(a: number[], b: number[]): number {
  const dot = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
  const normB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
  return 1 - dot / (normA * normB || 1); // avoid division by zero
}

// Deviation label based on cosine distance
export function detectDeviation(current: ToneSig): DeviationLevel {
  const [prev] = getRecent(1);
  if (!prev) return "NONE";

  const dist = cosineDistance(prev.tone.vector, current.vector);

  if (dist > 0.7) return "HIGH";
  if (dist > 0.3) return "MILD";
  return "NONE";
}