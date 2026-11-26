// Arma los textos para generar la voz: letras (por su nombre ruso) y palabras, en tandas.
import { readFileSync, writeFileSync } from "node:fs";
const src = readFileSync("src/content/missions.ts", "utf8");
const words = [...src.matchAll(/\{ ru: "([^"]+)", tr: "[^"]*", es: "[^"]*" \}/g)].map((m) => m[1]);
const names = { А:"а",Б:"бэ",В:"вэ",Г:"гэ",Д:"дэ",Е:"е",Ё:"ё",Ж:"жэ",З:"зэ",И:"и",Й:"и краткое",К:"ка",Л:"эль",М:"эм",Н:"эн",О:"о",П:"пэ",Р:"эр",С:"эс",Т:"тэ",У:"у",Ф:"эф",Х:"ха",Ц:"цэ",Ч:"чэ",Ш:"ша",Щ:"ща",Ъ:"твёрдый знак",Ы:"ы",Ь:"мягкий знак",Э:"э",Ю:"ю",Я:"я" };
const items = [
  ...Object.entries(names).map(([k, t], i) => ({ key: k, text: t, file: `l${String(i).padStart(2, "0")}.mp3` })),
  ...words.map((w, i) => ({ key: w, text: w.toLowerCase(), file: `w${String(i).padStart(2, "0")}.mp3` })),
];
const size = 30;
const chunks = [];
for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size));
writeFileSync(".local/voz/plan.json", JSON.stringify(chunks, null, 1));
chunks.forEach((c, i) => console.log(`--- tanda ${i} (${c.length})\n` + c.map((x) => x.text + ".").join(' <break time="1.5s" /> ')));
