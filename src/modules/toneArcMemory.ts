type PoleStats = {
  total: number;
  count: number;
  decay: number;
};

type MoodField = {
  poleAverages: Record<number, PoleStats>;
  lastUpdate: number;
  trend: "rising" | "falling" | "stable";
};

const defaultDecay = 0.95;
const poleMemory: MoodField = {
  poleAverages: {},
  lastUpdate: Date.now(),
  trend: "stable",
};

export function updateToneField(pole: number, deviation: number, decayRate = defaultDecay) {
  const stats = poleMemory.poleAverages[pole] || { total: 0, count: 0, decay: decayRate };
  stats.total = stats.total * stats.decay + deviation;
  stats.count = stats.count + 1;
  stats.decay = decayRate;
  poleMemory.poleAverages[pole] = stats;

  const previousAvg = getOverallAverage();
  const newAvg = getOverallAverage();

  const change = newAvg - previousAvg;
  poleMemory.trend =
    change > 0.1 ? "rising" :
    change < -0.1 ? "falling" :
    "stable";

  poleMemory.lastUpdate = Date.now();
}

export function getOverallAverage(): number {
  const values = Object.values(poleMemory.poleAverages);
  if (values.length === 0) return 0;

  const weightedSum = values.reduce((acc, v) => acc + v.total, 0);
  const count = values.reduce((acc, v) => acc + v.count, 0);
  return weightedSum / count;
}

export function getMoodField(): MoodField {
  return {
    poleAverages: { ...poleMemory.poleAverages },
    lastUpdate: poleMemory.lastUpdate,
    trend: poleMemory.trend,
  };
}

export function resetMoodField() {
  for (const key in poleMemory.poleAverages) delete poleMemory.poleAverages[key];
  poleMemory.lastUpdate = Date.now();
  poleMemory.trend = "stable";
}