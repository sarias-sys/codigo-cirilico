import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { VOICE } from "../content/voice";
import { ALPHABET, LETTERS } from "../content/letters";
import { MISSIONS, WORDS, lettersThrough, missionWords, wordByRu } from "../content/missions";
import { normalize } from "../lib/text";

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
    expect(new Set(MISSIONS.flatMap((m) => m.letters))).toEqual(new Set(ALPHABET));
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
        for (const ch of normalize(w.ru).replace(/ /g, "")) expect(known.has(ch), `${w.ru} en misión ${m.id} usa ${ch}`).toBe(true);
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

  it("cada misión tiene suficientes palabras para armar opciones y el jefe", () => {
    for (const m of MISSIONS) {
      expect(m.read.length).toBeGreaterThanOrEqual(3);
      expect(m.write.length).toBeGreaterThanOrEqual(3);
    }
  });
});

describe("voz grabada", () => {
  it("cada letra y cada palabra tiene su audio, y el archivo existe", () => {
    const keys = [...ALPHABET, ...WORDS.map((w) => w.ru)];
    for (const k of keys) {
      const file = VOICE[k];
      expect(file, `audio de ${k}`).toBeDefined();
      expect(existsSync(join(process.cwd(), "public", "voz", file)), `public/voz/${file}`).toBe(true);
    }
  });
});
