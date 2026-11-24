// Two Days of Quiet Dread — entry program (Node 22, no network).
// Writes one line to /output/entry.txt: a code review comment that approves
// a pull request while carrying quiet existential dread. Same output on
// every run; no network, no randomness, no clock reads.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const verdict = "Approved.";
const observation =
  "The diff touches the auth path in three places and none of them is wrong,";
const dread = "which is the part that worries me.";

const ENTRY = [verdict, observation, dread].join(" ");

function checkGate(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 140) {
    throw new Error(`entry is ${chars} chars, gate is 1-140`);
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be empty");
  }
}

checkGate(ENTRY);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
