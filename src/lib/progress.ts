import { addDays } from "./dates";
import { letterKey, newItem, review, wordKey, type SrsItem } from "./srs";
import { missionWords, type Mission } from "../content/missions";

/**
 * Progreso del jugador. Vive solo en este teléfono (localStorage): no viaja a ningún servidor
 * y el nombre del jugador nunca queda en el código.
 */
export type Progress = {
  version: 1;
  name: string;
  xp: number;
  streak: { count: number; last: string | null };
  completed: string[];
  srs: Record<string, SrsItem>;
  stats: { answers: number; correct: number; sessions: number };
  sound: boolean;
};

export const STORAGE_KEY = "codigo-cirilico:v1";

export function fresh(): Progress {
  return {
    version: 1, name: "", xp: 0, streak: { count: 0, last: null }, completed: [], srs: {},
    stats: { answers: 0, correct: 0, sessions: 0 }, sound: true,
  };
}

type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

function storage(): StorageLike | null {
  try { return window.localStorage; } catch { return null; }
}

export function load(store: StorageLike | null = storage()): Progress {
  try {
    const raw = store?.getItem(STORAGE_KEY);
    if (!raw) return fresh();
    const data = JSON.parse(raw);
    if (data?.version !== 1) return fresh();
    const base = fresh();
    return { ...base, ...data, streak: { ...base.streak, ...data.streak }, stats: { ...base.stats, ...data.stats } };
  } catch {
    return fresh();
  }
}

/** Devuelve false si el teléfono no deja guardar (modo privado, almacenamiento lleno). */
export function save(p: Progress, store: StorageLike | null = storage()): boolean {
  try {
    if (!store) return false;
    store.setItem(STORAGE_KEY, JSON.stringify(p));
    return true;
  } catch {
    return false;
  }
}

export function touchStreak(streak: Progress["streak"], day: string): Progress["streak"] {
  if (streak.last === day) return streak;
  if (streak.last === addDays(day, -1)) return { count: streak.count + 1, last: day };
  return { count: 1, last: day };
}

/** Racha que se muestra hoy: si dejó pasar más de un día, ya se rompió. */
export function visibleStreak(streak: Progress["streak"], day: string): number {
  if (!streak.last) return 0;
  return streak.last === day || streak.last === addDays(day, -1) ? streak.count : 0;
}

export function recordAnswer(p: Progress, ok: boolean): Progress {
  return { ...p, stats: { ...p.stats, answers: p.stats.answers + 1, correct: p.stats.correct + (ok ? 1 : 0) } };
}

/** Al ganar una misión: experiencia, racha y sus letras y palabras entran al repaso espaciado. */
export function completeMission(p: Progress, m: Mission, day: string): Progress {
  const srs = { ...p.srs };
  for (const l of m.letters) srs[letterKey(l)] ??= newItem(day);
  for (const w of missionWords(m)) srs[wordKey(w.ru)] ??= newItem(day);
  const first = !p.completed.includes(m.id);
  return {
    ...p,
    xp: p.xp + (first ? m.xp : Math.round(m.xp / 4)),
    completed: first ? [...p.completed, m.id] : p.completed,
    srs,
    streak: touchStreak(p.streak, day),
    stats: { ...p.stats, sessions: p.stats.sessions + 1 },
  };
}

export function reviewItem(p: Progress, key: string, ok: boolean, day: string): Progress {
  const item = p.srs[key];
  if (!item) return p;
  return recordAnswer({ ...p, srs: { ...p.srs, [key]: review(item, ok, day) } }, ok);
}

export function finishReview(p: Progress, correct: number, day: string): Progress {
  return { ...p, xp: p.xp + correct * 3, streak: touchStreak(p.streak, day), stats: { ...p.stats, sessions: p.stats.sessions + 1 } };
}

export const RANKS = ["Recluta", "Cadete", "Explorador", "Sargento", "Teniente", "Capitán"];
export function rank(xp: number): { name: string; next: number; base: number } {
  const steps = [0, 100, 250, 500, 900, 1500];
  let i = 0;
  while (i < steps.length - 1 && xp >= steps[i + 1]) i++;
  return { name: RANKS[i], base: steps[i], next: steps[i + 1] ?? steps[i] };
}
