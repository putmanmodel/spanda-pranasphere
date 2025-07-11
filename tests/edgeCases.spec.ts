import { analyzeStackedDeviation } from "../src/modules/stackedDeviation";
import cases from "../fixtures/edge-cases.json";

describe("Edge-Case Arc Analysis", () => {
  for (const c of cases) {
    test(c.id, () => {
      const arc = analyzeStackedDeviation(c.snapshots);
      expect(arc).toMatchSnapshot();
    });
  }
});