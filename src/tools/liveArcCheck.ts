import { getMemory } from "../memoryBuffer";
import { analyzeStackedDeviation } from "../modules/stackedDeviation";

const memoryLog = getMemory();

const arc = analyzeStackedDeviation(memoryLog);

console.log("\n== 🧠 Live Arc Check ==");
console.log(arc);