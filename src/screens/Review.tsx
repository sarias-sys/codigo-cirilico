import { useMemo, useState } from "react";
import { useGame } from "../game";
import { ALPHABET, LETTERS, describeLetter } from "../content/letters";
import { MISSIONS, WORDS, wordByRu } from "../content/missions";
import { finishReview, reviewItem } from "../lib/progress";
import { isDue } from "../lib/srs";
import { normalize } from "../lib/text";
import { options, shuffle } from "../lib/random";
import { Keyboard, Slots, TabBar, TopBar, useTyping } from "../ui";

const MAX_ITEMS = 10;

type Card =
  | { key: string; kind: "letter"; ch: string; opts: string[] }
  | { key: string; kind: "meaning"; ru: string; opts: string[] }
  | { key: string; kind: "write"; ru: string };

/** Patrulla nocturna: repaso diario de lo que está por olvidarse. */
export default function Review() {
  const { p, today, go, update } = useGame();
  const queue = useMemo<Card[]>(() => {
    const learnedLetters = Object.keys(p.srs).filter((k) => k.startsWith("L:")).map((k) => k.slice(2));
    const learnedWords = Object.keys(p.srs).filter((k) => k.startsWith("W:")).map((k) => k.slice(2));
    const sounds = learnedLetters.map((l) => LETTERS[l]?.sound).filter(Boolean);
    const meanings = WORDS.filter((w) => learnedWords.includes(w.ru)).map((w) => w.es);
    const due = Object.entries(p.srs).filter(([, i]) => isDue(i, today)).sort((a, b) => a[1].box - b[1].box || a[1].due.localeCompare(b[1].due)).slice(0, MAX_ITEMS);
    return shuffle(due.map(([key, item]): Card => {
      const v = key.slice(2);
      if (key.startsWith("L:")) return { key, kind: "letter", ch: v, opts: options(LETTERS[v].sound, sounds, 3) };
      // Las frases con espacio se repasan por su significado: el teclado no tiene espacio.
      if (item.box >= 2 && !v.includes(" ")) return { key, kind: "write", ru: v };
      return { key, kind: "meaning", ru: v, opts: options(wordByRu(v).es, meanings, 3) };
    }));
    // La cola se arma una sola vez al entrar; si dependiera de p, cambiaría con cada respuesta.
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const [i, setI] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [finished, setFinished] = useState(false);

  if (queue.length === 0) {
    const total = Object.keys(p.srs).length;
    return (
      <>
        <section className="screen">
          <TopBar onClose={() => go({ name: "map" })} />
          <h2>Patrulla nocturna</h2>
          <div className="empty">
            {total === 0
              ? <><b>Todavía no hay nada que patrullar</b>Gana la misión 0.1 y desde mañana aquí aparecerán tus letras para repasarlas.<button className="btn" onClick={() => go({ name: "mission", id: "0.1" })}>Empezar misión 0.1</button></>
              : <><b>Todo en orden por hoy</b>Tus {total} cartas están cargadas. Vuelve mañana para que no se apaguen.</>}
          </div>
        </section>
        <TabBar current="review" />
      </>
    );
  }

  if (finished) {
    return (
      <section className="screen">
        <div className="reward">
          <div className="label">Patrulla completada</div>
          <h2>{correct === queue.length ? "Ronda perfecta" : "La ciudad sigue a salvo"}</h2>
          <div className="xp">+{correct * 3} XP</div>
          <p className="sub">Acertaste {correct} de {queue.length}. Las que fallaste volverán mañana; las que acertaste tardarán más en volver.</p>
        </div>
        <button className="btn" onClick={() => go({ name: "map" })}>Volver al mapa</button>
      </section>
    );
  }

  const card = queue[i];
  return (
    <ReviewCard key={card.key} card={card} step={i} total={queue.length}
      onAnswered={(ok) => setCorrect((c) => c + (ok ? 1 : 0))}
      onNext={() => {
        if (i < queue.length - 1) setI(i + 1);
        else { update((x) => finishReview(x, correct, today)); setFinished(true); }
      }} />
  );
}

function ReviewCard({ card, step, total, onAnswered, onNext }: { card: Card; step: number; total: number; onAnswered: (ok: boolean) => void; onNext: () => void }) {
  const { update, today, play, speak, go, p } = useGame();
  const [result, setResult] = useState<{ ok: boolean; given: string } | null>(null);
  // Teclado: letras de las misiones ganadas, más las de la palabra pedida para que siempre se pueda escribir.
  const keys = useMemo(() => {
    const learned = MISSIONS.filter((m) => p.completed.includes(m.id)).flatMap((m) => m.letters);
    const needed = card.kind === "write" ? [...normalize(card.ru)] : [];
    return ALPHABET.filter((l) => learned.includes(l) || needed.includes(l));
  }, [p.completed, card]);
  const answer = (given: string, ok: boolean) => {
    if (result) return;
    setResult({ ok, given }); play(ok ? "ok" : "bad"); onAnswered(ok);
    update((x) => reviewItem(x, card.key, ok, today));
    if (card.kind !== "letter") speak(card.ru);
  };
  const { typed, add, del } = useTyping(keys, card.kind === "write" && !result, (t) => card.kind === "write" && t && answer(t, normalize(t) === card.ru));
  const done = result !== null;
  const st = done ? (result.ok ? "ok" : "bad") : undefined;

  let body;
  let solution = "";
  if (card.kind === "letter") {
    const L = LETTERS[card.ch];
    solution = `${describeLetter(L)}.`;
    body = (
      <>
        <h2>¿Cómo suena esta letra?</h2>
        <div className="code" lang="ru">{L.ch}</div>
        <div className="opts">{card.opts.map((o) => <button key={o} disabled={done} className={`opt ${done && o === L.sound ? "right" : ""} ${done && o === result.given && !result.ok ? "wrong" : ""}`} onClick={() => answer(o, o === L.sound)}>«{o}»</button>)}</div>
      </>
    );
  } else if (card.kind === "meaning") {
    const w = wordByRu(card.ru);
    solution = `${w.ru} se lee «${w.tr}» y significa «${w.es}».`;
    body = (
      <>
        <h2>¿Qué significa?</h2>
        <div className="code" lang="ru">{w.ru}</div>
        <div className="opts">{card.opts.map((o) => <button key={o} disabled={done} className={`opt ${done && o === w.es ? "right" : ""} ${done && o === result.given && !result.ok ? "wrong" : ""}`} onClick={() => answer(o, o === w.es)}>{o}</button>)}</div>
      </>
    );
  } else {
    const w = wordByRu(card.ru);
    solution = `«${w.es}» se escribe ${w.ru} (${w.tr}).`;
    body = (
      <>
        <h2>Escribe «{w.es}» en ruso</h2>
        <Slots text={typed} state={st} />
        {!done ? <><Keyboard keys={keys} onKey={add} onDel={del} /><button className="btn" disabled={!typed} onClick={() => answer(typed, normalize(typed) === w.ru)}>Comprobar</button></> : null}
      </>
    );
  }

  return (
    <section className="screen">
      <TopBar onClose={() => go({ name: "map" })} step={step + (done ? 1 : 0)} total={total} />
      <div className="label">Patrulla nocturna</div>
      {body}
      <div className={`feedback ${st ?? ""}`} role="status">{done ? (result.ok ? `¡Bien! ${solution}` : solution) : ""}</div>
      <div className="spacer" />
      {done ? <button className="btn" onClick={onNext}>{step < total - 1 ? "Siguiente" : "Terminar patrulla"}</button> : null}
    </section>
  );
}
