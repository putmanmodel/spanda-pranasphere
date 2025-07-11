// Core tone tag object used in analysis result
export type ToneSig = {
  code: string;
  vector: number[];
  label: string;
  pole: number;
  matchType?: "direct" | "alias" | "metaphor";
};

// Entry stored in memory buffer
export type ToneMemoryEntry = {
  chunk: string;
  tone: ToneSig;
  timestamp: number;
};

// Deviation levels between tone states
export type DeviationLevel = "NONE" | "MILD" | "HIGH";

// Single tone entry in toneLegend (e.g. positive or negative array member)
export type TonePoleEntry = {
  tag: string;         // e.g., "love", "hate"
  symbol: string;      // e.g., "[l]", "[h]"
  intensity: number;   // e.g., 0.8 (range: 0 to 1.0)
};

// toneLegend entry: both directions of polarity for a pole
export type ToneLegendEntry = {
  positive: TonePoleEntry[];
  negative: TonePoleEntry[];
};

// Whole toneLegend: key = pole base number (e.g., "23")
export type ToneLegend = {
  [key: string]: ToneLegendEntry;
};

export type PoleTrend = {
  total: number;
  count: number;
  decay: number;
};

export type MoodFieldSnapshot = {
  poleAverages: Record<number, PoleTrend>; // key = pole #
  lastUpdate: number;
  trend: "rising" | "falling" | "stable";
};

export type ToneSnapshot = {
  pole: number;
  code: string;         // e.g., "¡23.801[a]"
  deviation: number;
  timestamp: number;
};