import { describe, expect, it } from "vitest";
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

  it("ninguna letra se enseña dos veces", () => {
    const all = MISSIONS.flatMap((m) => m.letters);
    expect(new Set(all).size).toBe(all.length);
  });

  it("cada palabra de una misión usa solo letras ya aprendidas", () => {
    for (const m of MISSIONS) {
      const known = new Set(lettersThrough(m.id));
      for (const w of missionWords(m)) {
        for (const ch of normalize(w.ru)) expect(known.has(ch), `${w.ru} en misión ${m.id} usa ${ch}`).toBe(true);
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
