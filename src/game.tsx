import { createContext, useContext } from "react";
import type { Progress } from "./lib/progress";
import type { sfx } from "./lib/audio";

export type Screen =
  | { name: "start" }
  | { name: "map" }
  | { name: "mission"; id: string }
  | { name: "review" }
  | { name: "cards" }
  | { name: "squad" }
  | { name: "report" };

export type Game = {
  p: Progress;
  update: (fn: (p: Progress) => Progress) => void;
  go: (s: Screen) => void;
  toast: (msg: string) => void;
  speak: (ru: string) => void;
  play: (kind: keyof typeof sfx) => void;
  today: string;
};

export const GameCtx = createContext<Game | null>(null);

export function useGame(): Game {
  const g = useContext(GameCtx);
  if (!g) throw new Error("useGame fuera de GameCtx");
  return g;
}
