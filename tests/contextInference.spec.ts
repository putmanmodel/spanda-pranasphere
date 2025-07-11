import { inferContextualTone } from "../src/modules/contextualToneInference";
import type { MoodFieldSnapshot, ToneSnapshot } from "../src/types";
const cases = require("../fixtures/edge-cases.json");

const fixture = cases.find((c: { id: string }) => c.id === "sarcasm-flip")!;
const sample: ToneSnapshot = fixture.snapshots[1];
const current = fixture.current as unknown as MoodFieldSnapshot;

test("sarcasm-flip inference matches snapshot", () => {
  expect(inferContextualTone(sample, current)).toMatchInlineSnapshot(`
{
  "modulation": "dampen",
  "notes": "Tone diverges mildly from trend — recommend de-emphasizing.",
  "resonance": "neutral",
}
`);
});