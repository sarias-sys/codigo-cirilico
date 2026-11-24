import { describe, expect, it } from "vitest";
import { addDays, dayOf } from "../lib/dates";
import { INTERVALS, isDue, mastery, newItem, review } from "../lib/srs";
import { normalize, ruName } from "../lib/text";
import { options, shuffle } from "../lib/random";
import { exportCode, importCode, BackupError } from "../lib/backup";
import { completeMission, fresh, fromData, load, rank, reviewItem, save, touchStreak, visibleStreak, STORAGE_KEY } from "../lib/progress";
import { MISSIONS } from "../content/missions";

const seq = (...xs: number[]) => { let i = 0; return () => xs[i++ % xs.length]; };

describe("fechas", () => {
  it("suma días cruzando meses y años", () => {
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
    expect(addDays("2026-03-01", -1)).toBe("2026-02-28");
    expect(dayOf(new Date(2026, 10, 5))).toBe("2026-11-05");
  });
});

describe("repaso espaciado", () => {
  it("una carta nueva se repasa mañana", () => {
    expect(newItem("2026-11-23")).toEqual({ box: 1, due: "2026-11-24", seen: 0, wrong: 0 });
  });
  it("acertar sube de caja y aleja el repaso; fallar devuelve a la caja 1", () => {
    let item = newItem("2026-11-23");
    item = review(item, true, "2026-11-24");
    expect(item.box).toBe(2);
    expect(item.due).toBe(addDays("2026-11-24", INTERVALS[2]));
    item = review(review(item, true, "2026-11-26"), true, "2026-11-30");
    expect(mastery(item)).toBe("dominada");
    item = review(item, false, "2026-12-07");
    expect(item).toMatchObject({ box: 1, due: "2026-12-08", wrong: 1, seen: 4 });
  });
  it("no pasa de la caja 5", () => {
    let item = { box: 5, due: "2026-01-01", seen: 9, wrong: 0 };
    item = review(item, true, "2026-01-01");
    expect(item.box).toBe(5);
  });
  it("sabe cuándo toca", () => {
    expect(isDue({ box: 1, due: "2026-11-23", seen: 0, wrong: 0 }, "2026-11-23")).toBe(true);
    expect(isDue({ box: 1, due: "2026-11-24", seen: 0, wrong: 0 }, "2026-11-23")).toBe(false);
  });
});

describe("texto", () => {
  it("compara sin importar mayúsculas, espacios ni la tilde de ayuda", () => {
    expect(normalize(" ко́т ")).toBe("КОТ");
  });
  it("usa la forma rusa tradicional del nombre si existe", () => {
    expect(ruName("Daniel")).toBe("Даниил");
    expect(ruName("sergio")).toBe("Сергей");
    expect(ruName("Andrés")).toBe("Андрей");
  });
  it("translitera los demás nombres", () => {
    expect(ruName("Camila")).toBe("Камила");
    expect(ruName("Chepe")).toBe("Чепе");
    expect(ruName("  ")).toBe("Кадет");
  });
});

describe("azar", () => {
  it("las opciones incluyen la correcta y no repiten", () => {
    const o = options("gato", ["gato", "perro", "casa", "mesa", "perro"], 3, seq(0.1, 0.7, 0.3, 0.9));
    expect(o).toHaveLength(3);
    expect(o).toContain("gato");
    expect(new Set(o).size).toBe(3);
  });
  it("mezclar no pierde elementos", () => {
    expect(shuffle([1, 2, 3, 4], seq(0.5)).sort()).toEqual([1, 2, 3, 4]);
  });
});

describe("progreso", () => {
  it("la racha sube con días seguidos y se reinicia si salta un día", () => {
    let s = touchStreak({ count: 0, last: null }, "2026-11-23");
    expect(s).toEqual({ count: 1, last: "2026-11-23" });
    s = touchStreak(s, "2026-11-23");
    expect(s.count).toBe(1);
    s = touchStreak(s, "2026-11-24");
    expect(s.count).toBe(2);
    expect(visibleStreak(s, "2026-11-25")).toBe(2);
    expect(visibleStreak(s, "2026-11-26")).toBe(0);
    expect(touchStreak(s, "2026-11-27")).toEqual({ count: 1, last: "2026-11-27" });
  });

  it("ganar una misión da experiencia una vez y mete sus letras y palabras al repaso", () => {
    const m = MISSIONS[0];
    let p = completeMission(fresh(), m, "2026-11-23");
    expect(p.xp).toBe(m.xp);
    expect(p.completed).toEqual(["0.1"]);
    for (const l of m.letters) expect(p.srs[`L:${l}`]).toBeDefined();
    expect(p.srs["W:КОТ"]).toBeDefined();
    p = completeMission(p, m, "2026-11-23");
    expect(p.xp).toBe(m.xp + Math.round(m.xp / 4));
    expect(p.completed).toEqual(["0.1"]);
  });

  it("repetir una misión no reinicia lo que ya se repasó", () => {
    let p = completeMission(fresh(), MISSIONS[0], "2026-11-23");
    p = reviewItem(p, "L:А", true, "2026-11-24");
    const box = p.srs["L:А"].box;
    p = completeMission(p, MISSIONS[0], "2026-11-25");
    expect(p.srs["L:А"].box).toBe(box);
  });

  it("guarda y carga; si los datos están dañados empieza de cero", () => {
    const mem = new Map<string, string>();
    const store = { getItem: (k: string) => mem.get(k) ?? null, setItem: (k: string, v: string) => void mem.set(k, v), removeItem: (k: string) => void mem.delete(k) };
    const p = { ...fresh(), name: "Ana", xp: 42 };
    expect(save(p, store)).toBe(true);
    expect(load(store)).toMatchObject({ name: "Ana", xp: 42 });
    mem.set(STORAGE_KEY, "{dañado");
    expect(load(store)).toEqual(fresh());
  });

  it("avisa cuando no puede guardar", () => {
    const store = { getItem: () => null, setItem: () => { throw new Error("lleno"); }, removeItem: () => {} };
    expect(save(fresh(), store)).toBe(false);
    expect(save(fresh(), null)).toBe(false);
  });

  it("calcula el rango", () => {
    expect(rank(0).name).toBe("Recluta");
    expect(rank(100).name).toBe("Cadete");
    expect(rank(99999).name).toBe("Capitán");
  });
});

describe("copia de seguridad", () => {
  it("un progreso sale como código y vuelve igual, con tildes y cirílico", () => {
    const p = { ...completeMission({ ...fresh(), name: "Andrés" }, MISSIONS[0], "2026-11-23"), backupAt: "2026-11-23" };
    const code = exportCode(p);
    expect(code.startsWith("CC1-")).toBe(true);
    expect(importCode(`  ${code.slice(0, 20)}\n${code.slice(20)} `)).toEqual(p);
  });
  it("rechaza con un mensaje claro lo que no es una copia válida", () => {
    expect(() => importCode("")).toThrow(BackupError);
    expect(() => importCode("hola")).toThrow(/no es una copia/);
    expect(() => importCode(exportCode(fresh()).slice(0, 15))).toThrow(/incompleto o dañado/);
    expect(() => importCode("CC1-" + btoa(JSON.stringify({ version: 1, name: 3 })))).toThrow(/no tiene un progreso válido/);
  });
  it("los datos viejos sin fecha de copia siguen cargando", () => {
    const old: Record<string, unknown> = { ...fresh(), name: "Ana" };
    delete old.backupAt;
    expect(fromData(old)).toMatchObject({ name: "Ana", backupAt: null });
  });
});
