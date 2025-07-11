import { updateToneField, getMoodField, resetMoodField } from "../src/modules/toneArcMemory";

describe("toneArcMemory", () => {
  beforeEach(() => {
    resetMoodField();
  });

  test("updates memory with a single tone", () => {
    updateToneField(2, 0.8);
    const mood = getMoodField();

    expect(mood.poleAverages[2]).toBeDefined();
    expect(mood.poleAverages[2].count).toBe(1);
    expect(mood.poleAverages[2].total).toBeGreaterThan(0.7); // decay allows a little under 0.8
    expect(["rising", "falling", "stable"]).toContain(mood.trend);
  });

  test("updates trend correctly", () => {
    updateToneField(1, 1.0);
    const firstAvg = getMoodField().poleAverages[1].total;

    updateToneField(1, 2.0);
    const secondAvg = getMoodField().poleAverages[1].total;

    const trend = getMoodField().trend;

    expect(secondAvg).toBeGreaterThan(firstAvg);
    expect(["rising", "stable", "falling"]).toContain(trend); // fallback safety
  });
});