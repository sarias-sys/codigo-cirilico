import { voiceKey } from "./text";

/**
 * Hablar al micrófono. El reconocimiento lo hace el navegador (Chrome lo envía a Google, Safari a Apple):
 * la app solo recibe el texto que entendió y no guarda ni envía el audio a ningún otro lado.
 */

/** Solo letras y espacios entre palabras, y con Ё = Е (el reconocedor casi nunca escribe Ё). */
function words(s: string): string {
  return voiceKey(s).replace(/Ё/g, "Е").replace(/[^А-Я ]/g, "").replace(/ +/g, " ").trim();
}
const letters = (s: string) => words(s).replace(/ /g, "");

function distance(a: string, b: string): number {
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[b.length];
}

/** Qué tan parecido es lo que se oyó a lo que se pedía, de 0 a 1. Si la palabra está dentro de una frase más larga, cuenta. */
export function similarity(target: string, heard: string): number {
  const t = letters(target);
  const h = letters(heard);
  if (!t || !h) return 0;
  if (h === t || ` ${words(heard)} `.includes(` ${words(target)} `)) return 1;
  return 1 - distance(t, h) / Math.max(t.length, h.length);
}

export type Judgement = { ok: boolean; heard: string; score: number };

/**
 * Decide si el jugador dijo la palabra. Las palabras cortas (ТЫ, ОН, МЫ) tienen que salir exactas;
 * las largas aceptan un error pequeño, porque el reconocedor a veces se equivoca en una letra.
 */
export function judge(target: string, alternatives: string[]): Judgement {
  const need = letters(target).length <= 3 ? 1 : 0.75;
  let best: Judgement = { ok: false, heard: alternatives[0]?.trim() ?? "", score: 0 };
  for (const alt of alternatives) {
    const score = similarity(target, alt);
    if (score > best.score) best = { ok: score >= need, heard: alt.trim(), score };
  }
  return best;
}

export type ListenError = "blocked" | "silence" | "offline" | "unsupported" | "other";

/** Mensaje para el jugador según lo que falló. */
export const LISTEN_ERRORS: Record<ListenError, string> = {
  blocked: "El micrófono está bloqueado. Dale permiso a esta página en los ajustes del navegador, o salta este paso.",
  silence: "No te escuché. Acerca el teléfono, toca el micrófono y habla fuerte y claro.",
  offline: "Para escucharte hace falta internet. Conéctate o salta este paso por ahora.",
  unsupported: "Este navegador no puede escucharte. Prueba en Chrome (Android) o Safari (iPhone).",
  other: "Algo falló al escucharte. Inténtalo otra vez o salta este paso.",
};

type Rec = {
  lang: string; interimResults: boolean; maxAlternatives: number; continuous: boolean;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void; abort(): void;
};
type RecCtor = new () => Rec;

function ctor(): RecCtor | null {
  try {
    const w = window as unknown as { SpeechRecognition?: RecCtor; webkitSpeechRecognition?: RecCtor };
    return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
  } catch {
    return null;
  }
}

export function canListen(): boolean {
  return ctor() !== null;
}

/**
 * Escucha una vez en ruso. Llama a onHeard con las posibles transcripciones, o a onError.
 * Devuelve una función para cancelar.
 */
export function listen(onHeard: (alternatives: string[]) => void, onError: (e: ListenError) => void): () => void {
  const C = ctor();
  if (!C) { onError("unsupported"); return () => {}; }
  let settled = false;
  const finish = (fn: () => void) => { if (!settled) { settled = true; fn(); } };
  let rec: Rec;
  try {
    rec = new C();
    rec.lang = "ru-RU";
    rec.interimResults = false;
    rec.continuous = false;
    rec.maxAlternatives = 5;
    rec.onresult = (e) => {
      const first = e.results[0];
      const alts = first ? Array.from({ length: first.length }, (_, i) => first[i].transcript) : [];
      finish(() => (alts.length ? onHeard(alts) : onError("silence")));
    };
    rec.onerror = (e) => {
      const kind: ListenError = e.error === "not-allowed" || e.error === "service-not-allowed" || e.error === "audio-capture" ? "blocked"
        : e.error === "no-speech" ? "silence" : e.error === "network" ? "offline" : "other";
      finish(() => onError(kind));
    };
    rec.onend = () => finish(() => onError("silence"));
    rec.start();
  } catch {
    finish(() => onError("other"));
    return () => {};
  }
  return () => { settled = true; try { rec.abort(); } catch { /* ya terminó */ } };
}
