import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { VOICE } from "../content/voice";
import { ALPHABET, LETTERS } from "../content/letters";
import { LEVELS, MISSIONS, WORDS, fillName, lettersThrough, missionWords, wordByRu } from "../content/missions";
import { normalize, voiceKey } from "../lib/text";

/**
 * Reglas pedagógicas: nunca se le pide al jugador leer o escribir una letra que no le hemos enseñado.
 */
describe("contenido de las misiones", () => {
  it("cada letra enseñada existe en el alfabeto y tiene su ficha", () => {
    for (const m of MISSIONS) for (const l of m.letters) {
      expect(ALPHABET).toContain(l);
      expect(LETTERS[l], `ficha de ${l}`).toBeDefined();
    }
  });

  it("al terminar el nivel 0 se conocen las 33 letras", () => {
    expect(new Set(MISSIONS.filter((m) => m.level === 0).flatMap((m) => m.letters))).toEqual(new Set(ALPHABET));
    for (const l of ALPHABET) expect(LETTERS[l], `ficha de ${l}`).toBeDefined();
  });

  it("las palabras para escribir caben en pantalla y no llevan espacios", () => {
    for (const m of MISSIONS) for (const w of m.write) expect(w.ru.length <= 10 && !w.ru.includes(" "), w.ru).toBe(true);
  });

  it("ninguna letra se enseña dos veces", () => {
    const all = MISSIONS.flatMap((m) => m.letters);
    expect(new Set(all).size).toBe(all.length);
  });

  it("cada palabra de una misión usa solo letras ya aprendidas", () => {
    for (const m of MISSIONS) {
      const known = new Set(lettersThrough(m.id));
      for (const w of missionWords(m)) {
        for (const ch of normalize(w.ru).replace(/[^А-ЯЁ]/g, "")) expect(known.has(ch), `${w.ru} en misión ${m.id} usa ${ch}`).toBe(true);
      }
      for (const ru of [...m.read, ...m.write.map((x) => x.ru)]) expect(() => wordByRu(ru)).not.toThrow();
    }
  });

  it("el mensaje interceptado de cada historia también es legible al terminar la misión", () => {
    for (const m of MISSIONS) {
      const known = new Set(lettersThrough(m.id));
      for (const line of m.intro) if (line.code) {
        for (const ch of normalize(line.code).replace(/[^А-ЯЁ]/g, "")) expect(known.has(ch), `${line.code} usa ${ch}`).toBe(true);
      }
    }
  });

  it("la palabra de ejemplo de cada letra la contiene", () => {
    for (const L of Object.values(LETTERS)) expect(L.example.includes(L.ch), `${L.example} contiene ${L.ch}`).toBe(true);
  });

  it("no hay palabras repetidas ni significados repetidos (se usan como opciones)", () => {
    expect(new Set(WORDS.map((w) => w.ru)).size).toBe(WORDS.length);
    expect(new Set(WORDS.map((w) => w.es)).size).toBe(WORDS.length);
  });

  it("las misiones sin letras nuevas enseñan frases, y cada nivel aparece en el mapa en orden", () => {
    for (const m of MISSIONS) {
      if (!m.letters.length) expect((m.learn ?? []).length, `frases de ${m.id}`).toBeGreaterThanOrEqual(3);
      for (const ru of m.learn ?? []) expect(() => wordByRu(ru)).not.toThrow();
      expect(LEVELS[m.level], `nivel ${m.level}`).toBeDefined();
    }
    const levels = MISSIONS.map((m) => m.level);
    expect([...levels].sort((a, b) => a - b)).toEqual(levels);
  });

  it("en cada conversación hay una sola respuesta correcta, sin repetir opciones y con letras conocidas", () => {
    for (const m of MISSIONS) {
      const known = new Set(lettersThrough(m.id));
      for (const t of m.talk ?? []) {
        const opts = [t.answer, ...t.wrong];
        expect(new Set(opts).size, t.says).toBe(opts.length);
        expect(t.wrong.length).toBeGreaterThanOrEqual(2);
        for (const text of [t.says, ...opts]) {
          for (const ch of normalize(fillName(text, "")).replace(/[^А-ЯЁ]/g, "")) expect(known.has(ch), `${text} usa ${ch}`).toBe(true);
        }
      }
    }
  });

  it("cada misión tiene suficientes palabras para armar opciones y el jefe", () => {
    for (const m of MISSIONS) {
      expect(m.read.length).toBeGreaterThanOrEqual(3);
      expect(m.write.length).toBeGreaterThanOrEqual(3);
    }
  });
});

describe("voz grabada", () => {
  it("cada letra y cada palabra tiene su audio, y el archivo existe", () => {
    const talk = MISSIONS.flatMap((m) => m.talk ?? []).flatMap((t) => [t.says, fillName(t.answer, "")]);
    const keys = [...ALPHABET, ...WORDS.map((w) => w.ru), ...talk];
    for (const k of keys) {
      const file = VOICE[voiceKey(k)];
      expect(file, `audio de ${k}`).toBeDefined();
      expect(existsSync(join(process.cwd(), "public", "voz", file)), `public/voz/${file}`).toBe(true);
    }
  });
});
