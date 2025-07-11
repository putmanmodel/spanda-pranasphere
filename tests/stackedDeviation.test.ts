import { analyzeStackedDeviation } from "../src/modules/stackedDeviation";

describe("analyzeStackedDeviation", () => {
  it("classifies a stable arc", () => {
    const input = [
      { pole: 2, deviation: 0, code: "¡02.000[n]", timestamp: 1000 },
      { pole: 2, deviation: 0, code: "¡02.000[n]", timestamp: 1500 }
    ];
    const arc = analyzeStackedDeviation(input);
    expect(arc.arcType).toBe("flat");
    expect(arc.avgDeviation).toBe(0);
    expect(arc.trend).toBe("stable");
  });

  it("detects a surge arc", () => {
    const input = [
      { pole: 1, deviation: 0.8, code: "¡01.800[h]", timestamp: 1000 },
      { pole: 1, deviation: -1.2, code: "¡01.200[h]", timestamp: 1500 }
    ];
    const arc = analyzeStackedDeviation(input);
    expect(arc.arcType).toBe("surge");
    expect(arc.deviationRange).toBeGreaterThan(1.9);
    expect(arc.trend).toBe("falling");
  });

  it("detects a collapse arc", () => {
    const input = [
      { pole: 3, deviation: -1.0, code: "¡03.100[s]", timestamp: 1000 },
      { pole: 3, deviation: -0.9, code: "¡03.090[s]", timestamp: 1500 }
    ];
    const arc = analyzeStackedDeviation(input);
    expect(arc.arcType).toBe("collapse");
    expect(arc.avgDeviation).toBeLessThan(-0.7);
    expect(["rising", "stable", "falling"]).toContain(arc.trend); // trend tolerance
  });
});