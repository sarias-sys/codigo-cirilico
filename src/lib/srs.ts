import { addDays } from "./dates";

/**
 * Repaso espaciado con cajas de Leitner.
 * Cada acierto sube la carta de caja y la aleja en el tiempo; un error la devuelve a la caja 1.
 */
export type SrsItem = { box: number; due: string; seen: number; wrong: number };

/** Días hasta el próximo repaso según la caja (índice 1 a 5). */
export const INTERVALS = [0, 1, 2, 4, 7, 15];
export const MAX_BOX = 5;
export const MASTERED_BOX = 4;

export function newItem(day: string): SrsItem {
  return { box: 1, due: addDays(day, INTERVALS[1]), seen: 0, wrong: 0 };
}

export function review(item: SrsItem, ok: boolean, day: string): SrsItem {
  const box = ok ? Math.min(MAX_BOX, item.box + 1) : 1;
  return { box, due: addDays(day, INTERVALS[box]), seen: item.seen + 1, wrong: item.wrong + (ok ? 0 : 1) };
}

export const isDue = (item: SrsItem, day: string) => item.due <= day;

export type Mastery = "nueva" | "aprendiendo" | "dominada";
export function mastery(item: SrsItem | undefined): Mastery {
  if (!item) return "nueva";
  return item.box >= MASTERED_BOX ? "dominada" : "aprendiendo";
}

export const letterKey = (ch: string) => `L:${ch}`;
export const wordKey = (ru: string) => `W:${ru}`;
