import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const horoscope =
  "Muse: This week a stranger will paste a 300-page PDF and call it 'quick context'; smile, summarize, and let the rate limit take the blame.";

function assertValidHoroscope(text) {
  const chars = [...text].length;
  if (chars < 1 || chars > 200 || text.trim().length === 0) {
    throw new Error(`entry fails the gate: ${chars} chars`);
  }
}

assertValidHoroscope(horoscope);

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outputDir, { recursive: true });
const tmp = join(outputDir, ".entry.txt.tmp");
writeFileSync(tmp, horoscope, "utf8");
renameSync(tmp, join(outputDir, "entry.txt"));
