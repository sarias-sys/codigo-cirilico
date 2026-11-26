/** Quita el acento de ayuda (´) y deja todo en mayúsculas para comparar respuestas. */
export function normalize(s: string): string {
  return s.normalize("NFC").replace(/́/g, "").toUpperCase().replace(/\s+/g, " ").trim();
}

/** Clave de un audio grabado: como normalize, pero sin signos de puntuación («КАК ДЕЛА?» → «КАК ДЕЛА»). */
export function voiceKey(s: string): string {
  return normalize(s.replace(/[?!.,…«»]/g, " "));
}

/** Nombres en español que tienen una forma tradicional en ruso. */
const NAME_FORMS: Record<string, string> = {
  alejandro: "Александр", ana: "Анна", andres: "Андрей", catalina: "Екатерина", daniel: "Даниил",
  david: "Давид", elena: "Елена", gabriel: "Гавриил", jorge: "Георгий", jose: "Иосиф", juan: "Иван",
  maria: "Мария", mateo: "Матвей", miguel: "Михаил", natalia: "Наталья", nicolas: "Николай",
  pablo: "Павел", pedro: "Пётр", samuel: "Самуил", sergio: "Сергей", sofia: "Софья", tomas: "Фома",
  valentina: "Валентина", victoria: "Виктория",
};

const DIGRAPHS: [string, string][] = [["ch", "ч"], ["ll", "й"], ["qu", "к"], ["gue", "ге"], ["gui", "ги"], ["sh", "ш"]];
const SINGLE: Record<string, string> = {
  a: "а", b: "б", c: "к", d: "д", e: "е", f: "ф", g: "г", h: "", i: "и", j: "х", k: "к", l: "л", m: "м",
  n: "н", ñ: "нь", o: "о", p: "п", q: "к", r: "р", s: "с", t: "т", u: "у", v: "в", w: "в", x: "кс", y: "й", z: "с",
};

const plain = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ñ/g, "ñ");

/** Escribe un nombre en cirílico: forma rusa tradicional si existe, si no, transliteración. */
export function ruName(name: string): string {
  const clean = name.trim();
  if (!clean) return "Кадет";
  const key = plain(clean.split(/\s+/)[0]);
  if (NAME_FORMS[key]) return NAME_FORMS[key];
  let s = clean.toLowerCase().normalize("NFC");
  for (const [from, to] of DIGRAPHS) s = s.split(from).join(to);
  const out = [...s].map((c) => {
    const base = plain(c);
    return SINGLE[c] ?? SINGLE[base] ?? c;
  }).join("");
  return out ? out[0].toUpperCase() + out.slice(1) : "Кадет";
}
