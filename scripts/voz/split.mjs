// Uso: node split.mjs <tanda> <archivo.mp3> [<archivo2.mp3>]  -> corta la tanda en un mp3 por palabra.
import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync, mkdirSync } from "node:fs";
const FF = readFileSync(".local/voz/ff.txt", "utf8").trim();
const [, , idx, ...files] = process.argv;
const batch = JSON.parse(readFileSync(".local/voz/batches.json", "utf8"))[+idx];
function gaps(f) {
  const r = spawnSync(FF, ["-hide_banner", "-i", f, "-af", "silencedetect=noise=-40dB:d=0.45", "-f", "null", "-"], { encoding: "utf8" });
  const s = [...r.stderr.matchAll(/silence_start: ([\d.]+)/g)].map((m) => +m[1]);
  const e = [...r.stderr.matchAll(/silence_end: ([\d.]+)/g)].map((m) => +m[1]);
  const dur = +r.stderr.match(/Duration: (\d+):(\d+):([\d.]+)/).slice(1).reduce((a, x) => a * 60 + +x, 0);
  return { pairs: s.map((x, i) => [x, e[i] ?? dur]), dur };
}
for (const f of files) {
  const { pairs, dur } = gaps(f);
  const inner = pairs.filter(([a, b]) => a > 0.05 && b < dur - 0.05);
  if (inner.length !== batch.length - 1) { console.log(`${f}: ${inner.length} pausas, esperaba ${batch.length - 1}`); continue; }
  mkdirSync("public/voz", { recursive: true });
  const cuts = [0, ...inner.map(([a, b]) => (a + b) / 2), dur];
  batch.forEach((it, i) => {
    execFileSync(FF, ["-y", "-loglevel", "error", "-i", f, "-ss", String(cuts[i]), "-to", String(cuts[i + 1]),
      "-af", "silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,apad=pad_dur=0.08",
      "-ac", "1", "-ar", "44100", "-b:a", "64k", `public/voz/${it.file}`]);
  });
  console.log(`${f}: OK ${batch.map((x) => x.text).join(", ")}`);
  process.exit(0);
}
process.exit(1);
