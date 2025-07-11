import { inferContextualTone } from "../src/modules/contextualToneInference";
import type { ToneSnapshot, MoodFieldSnapshot } from "../src/types";

describe("inferContextualTone", () => {
  it("returns amplify for aligned tone", () => {
    const snapshot: ToneSnapshot = {
      pole: 4,
      deviation: 0.0,
      code: "¡04.000[y]",
      timestamp: 1000
    };

    const baseline: MoodFieldSnapshot = {
      poleAverages: {
        4: { total: 0, count: 1, decay: 0.9 }
      },
      lastUpdate: 500,
      trend: "stable"
    };

    const result = inferContextualTone(snapshot, baseline);
    expect(result.modulation).toBe("amplify");
  });

  it("returns redirect for clashing tone", () => {
    const snapshot: ToneSnapshot = {
      pole: 1,
      deviation: -1.5,
      code: "¡01.1500[b]",
      timestamp: 1000
    };

    const baseline: MoodFieldSnapshot = {
      poleAverages: {
        1: { total: 1.5, count: 1, decay: 0.9 }
      },
      lastUpdate: 500,
      trend: "rising"
    };

    const result = inferContextualTone(snapshot, baseline);
    expect(result.resonance).toBe("clashing");
    expect(result.modulation).toBe("redirect");
  });
});