// src/tools/liveNuanceTest.ts

import { getMemory } from "../memoryBuffer";
import { analyzeStackedDeviation } from "../modules/stackedDeviation";
import { inferContextualTone } from "../modules/contextualToneInference";

import { addToMemory } from "../memoryBuffer";

addToMemory({
  timestamp: Date.now() - 3000,
  tone: { pole: 3, code: "¡0.400[r]", label: "reverence", vector: [0.4] },
  chunk: "The moment felt sacred."
});

addToMemory({
  timestamp: Date.now() - 2000,
  tone: { pole: 3, code: "¡0.600[r]", label: "reverence", vector: [0.6] },
  chunk: "A hush fell over the room."
});

addToMemory({
  timestamp: Date.now() - 1000,
  tone: { pole: 3, code: "¡0.500[r]", label: "reverence", vector: [0.5] },
  chunk: "It felt like something holy passed through us."
});

console.log("🧪 Live Nuance Test Starting...");

// Get current memory snapshots (ToneSnapshot[])
const memory = getMemory();

// Run arc analysis
const arc = analyzeStackedDeviation(memory);
console.log("\n📈 Arc Analysis Result:");
console.dir(arc, { depth: null });

// If we have recent memory, infer tone context for the most recent entry
if (memory.length > 0) {
  const latestSnapshot = memory[memory.length - 1];

  // Simulate a mood field based on current memory
  const poleTotals: Record<number, { total: number; count: number; decay: number }> = {};
  for (const entry of memory) {
    const { pole, deviation } = entry;
    if (!poleTotals[pole]) {
      poleTotals[pole] = { total: 0, count: 0, decay: 0.95 };
    }
    poleTotals[pole].total += deviation;
    poleTotals[pole].count += 1;
  }

  const moodField = {
    poleAverages: poleTotals,
    lastUpdate: Date.now(),
    trend: arc.trend
  };

  const nuanceResult = inferContextualTone(latestSnapshot, moodField);
  console.log("\n🎯 Contextual Tone Inference:");
  console.dir(nuanceResult, { depth: null });
} else {
  console.log("\n⚠️ No memory data available for inference.");
}