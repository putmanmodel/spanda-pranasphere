import { inferContextualTone } from "../modules/contextualToneInference";
import { MoodFieldSnapshot } from "../types";
import { ToneSnapshot } from "../modules/stackedDeviation";

console.log("🧪 Contextual Inference Test Starting...");

// Simulated mood field state
const currentMood: MoodFieldSnapshot = {
  poleAverages: {
    1: { total: 2.4, count: 4, decay: 0.95 },
    2: { total: -2.1, count: 3, decay: 0.95 }
  },
  lastUpdate: 2000,
  trend: "stable"
};

// Incoming tone snapshot to analyze
const sampleTone: ToneSnapshot = {
  pole: 1,
  deviation: 0.5,
  code: "¡0.500[a]",
  timestamp: 2100
};

// Run the inference
const result = inferContextualTone(sampleTone, currentMood);

console.log("📊 Inference Result:");
console.dir(result, { depth: null });