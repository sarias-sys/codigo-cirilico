import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useGame } from "./game";
import { ALPHABET, LETTERS } from "./content/letters";
import { ruName } from "./lib/text";
import { visibleStreak } from "./lib/progress";
import { isDue } from "./lib/srs";

/** Texto con <b>…</b>, <ru>…</ru>, {N} (nombre) y {R} (nombre en ruso), sin insertar HTML. */
export function Rich({ text }: { text: string }) {
  const { p } = useGame();
  const filled = text.replaceAll("{N}", "\u0000N").replaceAll("{R}", "\u0000R");
  const parts: ReactNode[] = [];
  const re = /<(b|ru)>(.*?)<\/\1>/g;
  let last = 0;
  let m: RegExpExecArray | null;
  const fill = (s: string) => s.replaceAll("\u0000N", p.name || "cadete").replaceAll("\u0000R", ruName(p.name));
  let k = 0;
  while ((m = re.exec(filled))) {
    if (m.index > last) parts.push(fill(filled.slice(last, m.index)));
    parts.push(m[1] === "b" ? <b key={k++}>{fill(m[2])}</b> : <span key={k++} className="ru">{fill(m[2])}</span>);
    last = m.index + m[0].length;
  }
  if (last < filled.length) parts.push(fill(filled.slice(last)));
  return <>{parts}</>;
}

export function Stats() {
  const { p, today } = useGame();
  return (
    <span className="stat">
      <span>Racha <b>{visibleStreak(p.streak, today)}</b></span>
      <span>XP <b>{p.xp}</b></span>
    </span>
  );
}

export function TopBar({ onClose, step, total, closeLabel = "Salir" }: { onClose: () => void; step?: number; total?: number; closeLabel?: string }) {
  return (
    <div className="topbar">
      <button className="back" onClick={onClose} aria-label={closeLabel}>✕</button>
      {total ? (
        <>
          <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={step}>
            <i style={{ width: `${((step ?? 0) / total) * 100}%` }} />
          </div>
          <span className="stat">{Math.min((step ?? 0) + 1, total)}/{total}</span>
        </>
      ) : <Stats />}
    </div>
  );
}

export function TabBar({ current }: { current: "map" | "review" | "cards" | "squad" }) {
  const { go, p, today } = useGame();
  const due = Object.values(p.srs).filter((i) => isDue(i, today)).length;
  const tabs = [
    { k: "map" as const, i: "К", n: "Misiones" },
    { k: "review" as const, i: "☾", n: "Patrulla", badge: due },
    { k: "cards" as const, i: "Я", n: "Cartas" },
    { k: "squad" as const, i: "◆", n: "Escuadrón" },
  ];
  return (
    <nav className="tabbar" aria-label="Secciones">
      {tabs.map((t) => (
        <button key={t.k} aria-current={current === t.k} onClick={() => go({ name: t.k })}>
          <b>{t.i}</b>{t.n}
          {t.badge ? <span className="badge-dot" aria-label={`${t.badge} repasos pendientes`}>{t.badge}</span> : null}
        </button>
      ))}
    </nav>
  );
}

export function Slots({ text, state }: { text: string; state?: "ok" | "bad" }) {
  return (
    <div className={`slots ${state ?? ""}`} aria-live="polite" aria-label={`Escrito: ${text || "nada"}`}>
      {[...text].map((c, i) => <span className="slot" key={i}>{c}</span>)}
      {!state && text.length < 10 ? <span className="slot empty" /> : null}
    </div>
  );
}

/** Teclado cirílico en pantalla, en el orden del alfabeto para que también lo memorice. */
export function Keyboard({ keys, onKey, onDel }: { keys: string[]; onKey: (k: string) => void; onDel: () => void }) {
  const sorted = [...keys].sort((a, b) => ALPHABET.indexOf(a) - ALPHABET.indexOf(b));
  const cols = keys.length > 24 ? 7 : keys.length > 12 ? 6 : keys.length > 8 ? 5 : 4;
  return (
    <div className={`kbd ${keys.length > 12 ? "dense" : ""}`} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {sorted.map((k) => <button key={k} className="key" onClick={() => onKey(k)} aria-label={`Letra ${k}`}>{k}</button>)}
      <button className="key wide" onClick={onDel}>⌫ Borrar</button>
    </div>
  );
}

/** Lo que el jugador escribe: teclado en pantalla, teclado ruso o teclas latinas equivalentes. */
export function useTyping(keys: string[], active: boolean, onEnter: (text: string) => void, max = 10) {
  const [typed, setTyped] = useState("");
  const enter = useRef(onEnter);
  enter.current = onEnter;
  const typedRef = useRef(typed);
  typedRef.current = typed;
  const add = useCallback((k: string) => setTyped((t) => (t.length < max ? t + k : t)), [max]);
  const del = useCallback(() => setTyped((t) => t.slice(0, -1)), []);
  useEffect(() => {
    if (!active) return;
    const latin = new Map<string, string>();
    for (const k of keys) for (const l of LETTERS[k]?.latin ?? []) if (!latin.has(l)) latin.set(l, k);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.ctrlKey || e.metaKey || e.altKey) return;
      const up = e.key.length === 1 ? e.key.toUpperCase() : "";
      const ch = keys.includes(up) ? up : latin.get(e.key.toLowerCase());
      if (ch) { e.preventDefault(); add(ch); }
      else if (e.key === "Backspace") { e.preventDefault(); del(); }
      else if (e.key === "Enter") { e.preventDefault(); enter.current(typedRef.current); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [keys, active, add, del]);
  return { typed, setTyped, add, del };
}

export function Crest({ className = "crest" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M50 6 L88 20 V48 C88 72 70 88 50 96 C30 88 12 72 12 48 V20 Z" fill="var(--panel)" stroke="var(--ice)" strokeWidth="3" />
      <path d="M26 30 L50 22 L74 30" stroke="var(--line)" strokeWidth="3" fill="none" />
      <text x="50" y="70" textAnchor="middle" fontFamily="Russo One, Arial Black, sans-serif" fontSize="40" fill="var(--ice)">К</text>
    </svg>
  );
}

export function EnemyFace() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <path d="M50 8 C26 8 16 30 18 54 C20 76 30 92 50 92 C70 92 80 76 82 54 C84 30 74 8 50 8 Z" fill="#1a0f14" stroke="var(--alert)" strokeWidth="3" />
      <path d="M30 46 L44 52 L30 56 Z M70 46 L56 52 L70 56 Z" fill="var(--alert)" />
      <path d="M38 72 Q50 64 62 72" stroke="var(--alert)" strokeWidth="3" fill="none" />
    </svg>
  );
}

export function Shield({ on }: { on: boolean }) {
  return (
    <svg className="shield" viewBox="0 0 22 24" aria-hidden="true">
      <path d="M11 1 L21 5 V11 C21 17 16 21 11 23 C6 21 1 17 1 11 V5 Z" fill={on ? "var(--ice)" : "var(--panel-2)"} stroke="var(--ice)" strokeWidth="1.5" />
    </svg>
  );
}
