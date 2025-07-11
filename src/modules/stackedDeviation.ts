export type ToneSnapshot = {
  pole: number;            // From tonePairs
  code: string;            // ¡XX.YYY[z] format
  deviation: number;       // From detectDeviation
  timestamp: number;
};

export type ArcInsight = {
  arcType: "flat" | "swing" | "surge" | "collapse";
  triggerLevel: number;
  peakPole?: number;
  deviationRange: number;
  avgDeviation: number;
  trend: "rising" | "falling" | "stable";
};

/**
 * Analyzes a sequence of tone snapshots and outputs an ArcInsight summary.
 */
export function analyzeStackedDeviation(history: ToneSnapshot[]): ArcInsight {
  if (history.length === 0) {
    return {
      arcType: "flat",
      triggerLevel: 0,
      deviationRange: 0,
      avgDeviation: 0,
      trend: "stable"
    };
  }

  const deviations = history.map(h => h.deviation);
  const peak = Math.max(...deviations);
  const trough = Math.min(...deviations);
  const avg = deviations.reduce((a, b) => a + b, 0) / deviations.length;
  const range = peak - trough;

  const first = deviations[0];
  const last = deviations[deviations.length - 1];
  const trend =
    last > first + 0.2 ? "rising" :
    last < first - 0.2 ? "falling" :
    "stable";

  const arcType =
    range > 1.5 ? "surge" :
    range > 0.7 ? "swing" :
    avg < -0.7 ? "collapse" :
    "flat";

  return {
    arcType,
    triggerLevel: Math.abs(peak) > Math.abs(trough) ? peak : trough,
    peakPole: history.find(h => h.deviation === (Math.abs(peak) > Math.abs(trough) ? peak : trough))?.pole,
    deviationRange: range,
    avgDeviation: avg,
    trend
  };
}