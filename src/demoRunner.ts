// import { getTonePairs } from "./types";  <-- Not needed

import { addToMemory, getMemory } from "./memoryBuffer";
import { analyzeStackedDeviation } from "./modules/stackedDeviation";

const samples = [
  { pole: 83, code: "¡83.000[f]", deviation: 0.9 },
  { pole: 85, code: "¡85.000[h]", deviation: 0.85 },
  { pole: 46, code: "¡-46.000[u]", deviation: -0.7 },
  { pole: 3,  code: "¡3.000[d]", deviation: 0.1 },
  { pole: 85, code: "¡-85.000[h]", deviation: -0.95 }
];

const timestampBase = Date.now();

samples.forEach((sample, i) => {
addToMemory({
  timestamp: timestampBase + i * 1000,
  chunk: "Demo text here", // ✅ Add this line
  tone: {
    pole: sample.pole,
    code: sample.code,
    label: "demo",
    vector: [sample.deviation]
  }
});
});

console.log("🧠 Added simulated memory tone samples.");

const result = analyzeStackedDeviation(getMemory());
console.log("📊 Live Arc Result:", result);