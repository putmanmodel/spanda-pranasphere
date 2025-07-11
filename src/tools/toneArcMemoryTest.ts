// src/tools/toneArcMemoryTest.ts

import { updateToneField, getMoodField, resetMoodField } from "../modules/toneArcMemory";

console.log("🧪 Starting Mood Field Simulation...");

resetMoodField();

// Simulate 10 updates with varying poles and deviations
const mockData = [
  { pole: 1, deviation: 0.6 },
  { pole: 1, deviation: 0.4 },
  { pole: 2, deviation: -0.5 },
  { pole: 1, deviation: 0.8 },
  { pole: 2, deviation: -0.3 },
  { pole: 3, deviation: 0.1 },
  { pole: 3, deviation: -0.2 },
  { pole: 1, deviation: 0.9 },
  { pole: 2, deviation: -0.9 },
  { pole: 1, deviation: 0.3 },
];

for (const { pole, deviation } of mockData) {
  updateToneField(pole, deviation);
  const mood = getMoodField();
  console.log(`🧠 Pole ${pole} updated with deviation ${deviation}`);
  console.log(`→ Trend: ${mood.trend}, Last Avg: ${mood.poleAverages[pole]?.total.toFixed(3)}`);
}

console.log("\n🎯 Final Mood Field Snapshot:");
console.dir(getMoodField(), { depth: null });