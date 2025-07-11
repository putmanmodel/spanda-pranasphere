import { readFileSync } from "fs";
import { resolve } from "path";

import { analyzeStackedDeviation } from "../modules/stackedDeviation";
import { inferContextualTone } from "../modules/contextualToneInference";
import type { ToneSnapshot, MoodFieldSnapshot } from "../types";

const id = process.argv[2];
if (!id) {
  console.error("❌ Please provide an edge case ID (e.g. sarcasm-flip)");
  process.exit(1);
}

const filePath = resolve(__dirname, "../../fixtures/edge-cases.json");
const allCases: { id: string; snapshots: ToneSnapshot[]; current: MoodFieldSnapshot }[] =
  JSON.parse(readFileSync(filePath, "utf8"));

const testCase = allCases.find((c: { id: string }) => c.id === id);
if (!testCase) {
  console.error(`❌ No edge case found with ID: ${id}`);
  process.exit(1);
}

console.log("🧪 Running Arc Analysis:");
const arc = analyzeStackedDeviation(testCase.snapshots as ToneSnapshot[]);
console.dir(arc, { depth: null });

const moodCurrent = testCase.current as MoodFieldSnapshot;
console.log("\n🎯 Running Contextual Inference:");
(testCase.snapshots as ToneSnapshot[]).forEach((snapshot) => {
  console.log(`\n▶ snapshot:`, snapshot);
  const ctx = inferContextualTone(snapshot, moodCurrent);
  console.dir(ctx, { depth: null });
});