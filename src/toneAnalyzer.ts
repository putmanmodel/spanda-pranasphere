import { ToneSig } from "./types";
import tonePairs from "../data/tonePairs.json" assert { type: "json" };

const keywordMap: { [key: string]: { id: number; polarity: 1 | -1 } } = {};

tonePairs.forEach((pair: { positive: string; negative: string; id: number }) => {
  keywordMap[pair.positive] = { id: pair.id, polarity: 1 };
  keywordMap[pair.negative] = { id: pair.id, polarity: -1 };
});

export function analyzeTone(chunk: string): ToneSig[] {
  const lower = chunk.toLowerCase();
  const matches: ToneSig[] = [];

  for (const word in keywordMap) {
    if (lower.includes(word)) {
      const { id, polarity } = keywordMap[word];
      const pair = tonePairs[id];
      const tag = polarity === 1 ? pair.positive : pair.negative;
      const symbol = String.fromCharCode(97 + (id % 26));
      const code = `¡${(polarity * id).toFixed(3)}[${symbol}]`;

      matches.push({
        code,
        vector: [polarity * id / 50, polarity === 1 ? 0.6 : 0.3, polarity === 1 ? 0.1 : -0.2],
        label: tag,
        pole: id,
        matchType: "direct",
      });
    }
  }

  return matches.length > 0
    ? matches
    : [{
        code: "¡0.000[o]",
        vector: [0, 0, 0],
        label: "neutral",
        pole: 0,
        matchType: "direct",
      }];
}