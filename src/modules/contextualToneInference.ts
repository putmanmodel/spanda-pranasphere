import { ToneSnapshot } from "./stackedDeviation";
import { MoodFieldSnapshot } from "../types";

export type ContextualToneResult = {
  resonance: "aligned" | "neutral" | "clashing";
  modulation: "amplify" | "dampen" | "redirect" | "none";
  notes?: string;
};

/**
 * Infers the contextual alignment of an incoming tone based on recent mood field trends.
 */
export function inferContextualTone(
  snapshot: ToneSnapshot,
  mood: MoodFieldSnapshot
): ContextualToneResult {
  const poleData = mood.poleAverages[snapshot.pole];

  if (!poleData) {
    return {
      resonance: "neutral",
      modulation: "none",
      notes: "No prior data for this pole. Neutral stance assumed."
    };
  }

  const avg = poleData.total / poleData.count;
  const diff = snapshot.deviation - avg;

  if (Math.abs(diff) < 0.2) {
    return {
      resonance: "aligned",
      modulation: "amplify",
      notes: "Tone closely matches pole's recent mood average."
    };
  }

  if (Math.abs(diff) > 1.0 && Math.sign(diff) !== Math.sign(avg)) {
    return {
      resonance: "clashing",
      modulation: "redirect",
      notes: "Tone sharply contradicts recent pole average — possible disruption."
    };
  }

  return {
    resonance: "neutral",
    modulation: "dampen",
    notes: "Tone diverges mildly from trend — recommend de-emphasizing."
  };
}