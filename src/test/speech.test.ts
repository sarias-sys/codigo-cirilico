import { describe, expect, it } from "vitest";
import { judge, similarity } from "../lib/speech";
import { MISSIONS, wordByRu } from "../content/missions";
import { clipUrl } from "../lib/audio";

describe("reconocer lo que dijo", () => {
  it("acepta la palabra exacta sin importar mayúsculas, signos ni Ё", () => {
    expect(judge("КОТ", ["кот"]).ok).toBe(true);
    expect(judge("КАК ДЕЛА?", ["Как дела"]).ok).toBe(true);
    expect(similarity("ЁЖ", "еж")).toBe(1);
  });
  it("busca entre las alternativas y acepta la palabra dentro de una frase", () => {
    const j = judge("СПАСИБО", ["спаси бог", "Спасибо!"]);
    expect(j).toMatchObject({ ok: true, heard: "Спасибо!", score: 1 });
    expect(judge("ДОМ", ["это дом"]).ok).toBe(true);
  });
  it("perdona un error pequeño en palabras largas pero no en las cortas", () => {
    expect(judge("ЗДРАВСТВУЙТЕ", ["здравствуйте"]).ok).toBe(true);
    expect(judge("ЗДРАВСТВУЙТЕ", ["здраствуйте"]).ok).toBe(true);
    expect(judge("ТЫ", ["ты"]).ok).toBe(true);
    expect(judge("ТЫ", ["ти"]).ok).toBe(false);
    expect(judge("КОТ", ["код"]).ok).toBe(false);
  });
  it("rechaza otra palabra y dice qué escuchó", () => {
    expect(judge("ХОРОШО", ["плохо"])).toMatchObject({ ok: false, heard: "плохо" });
    expect(judge("ХОРОШО", []).ok).toBe(false);
  });
});

describe("contenido para hablar", () => {
  it("cada misión pide 3 palabras conocidas que tienen voz grabada", () => {
    for (const m of MISSIONS) {
      expect(m.speak, m.id).toHaveLength(3);
      for (const ru of m.speak!) {
        expect(wordByRu(ru), `${m.id} ${ru}`).toBeDefined();
        expect(clipUrl(ru), `${m.id} ${ru}`).not.toBeNull();
      }
    }
  });
});
