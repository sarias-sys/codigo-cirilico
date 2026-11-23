import { useEffect, useMemo, useRef, useState } from "react";
import { useGame } from "../game";
import { LETTERS } from "../content/letters";
import { MISSIONS, lettersThrough, wordByRu, wordsThrough, type Mission as M } from "../content/missions";
import { completeMission, recordAnswer } from "../lib/progress";
import { normalize, ruName } from "../lib/text";
import { options, shuffle } from "../lib/random";
import { Crest, EnemyFace, Keyboard, Rich, Shield, Slots, TopBar, useTyping } from "../ui";

type Phase = "intro" | "lesson" | "read" | "write" | "boss" | "reward";

export default function Mission({ id }: { id: string }) {
  const { go, update, today, play } = useGame();
  const mission = MISSIONS.find((m) => m.id === id);
  const [phase, setPhase] = useState<Phase>("intro");
  if (!mission) return <section className="screen"><p>No encontramos esa misión.</p><button className="btn" onClick={() => go({ name: "map" })}>Volver al mapa</button></section>;
  const exit = () => go({ name: "map" });
  switch (phase) {
    case "intro": return <Story mission={mission} onExit={exit} onDone={() => setPhase("lesson")} />;
    case "lesson": return <Lesson mission={mission} onExit={exit} onDone={() => setPhase("read")} />;
    case "read": return <Read mission={mission} onExit={exit} onDone={() => setPhase("write")} />;
    case "write": return <Write mission={mission} onExit={exit} onDone={() => setPhase("boss")} />;
    case "boss": return <Boss mission={mission} onExit={exit} onWin={() => { play("win"); update((p) => completeMission(p, mission, today)); setPhase("reward"); }} />;
    case "reward": return <Reward mission={mission} />;
  }
}

type Step = { mission: M; onExit: () => void; onDone: () => void };

function Story({ mission, onExit, onDone }: Step) {
  const [i, setI] = useState(0);
  const [why, setWhy] = useState(false);
  const shown = mission.intro.slice(0, i + 1);
  const last = i === mission.intro.length - 1;
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { end.current?.scrollIntoView?.({ block: "end", behavior: "smooth" }); }, [i, why]);
  return (
    <section className="screen">
      <TopBar onClose={onExit} />
      <div className="label">Misión {mission.id} · {mission.title}</div>
      <div className="scene">
        <Crest />
        {shown.map((l, k) => (
          <div key={k} className="line">
            <div className="bubble"><div className="who">{l.who}</div><Rich text={l.text} /></div>
            {l.code ? <div className="intercept" lang="ru">{l.code}</div> : null}
          </div>
        ))}
        {why ? <div className="bubble"><div className="who">Сова</div>El cirílico es el alfabeto del ruso: 33 letras. Algunas se parecen a las nuestras y otras son nuevas. Lo usan más de 250 millones de personas. Y, por alguna razón, también las Sombras.</div> : null}
        <div ref={end} />
      </div>
      <div className="dots" aria-hidden="true">{mission.intro.map((_, k) => <i key={k} className={k <= i ? "on" : ""} />)}</div>
      {last ? (
        <div className="choices">
          <button className="btn" onClick={onDone}>Listo, capitana</button>
          {!why && mission.id === "0.1" ? <button className="btn ghost" onClick={() => setWhy(true)}>¿Qué es el cirílico?</button> : null}
        </div>
      ) : <button className="btn" onClick={() => setI(i + 1)}>Siguiente</button>}
    </section>
  );
}

type LessonStep = { kind: "intro"; ch: string } | { kind: "check"; ch: string; opts: string[] };

function Lesson({ mission, onExit, onDone }: Step) {
  const { speak, play, update } = useGame();
  const steps = useMemo<LessonStep[]>(() => {
    const before = lettersThrough(mission.id).filter((l) => !mission.letters.includes(l));
    const out: LessonStep[] = [];
    mission.letters.forEach((ch, i) => {
      out.push({ kind: "intro", ch });
      const known = [...before, ...mission.letters.slice(0, i)];
      if (known.length >= 2) out.push({ kind: "check", ch, opts: options(ch, known, 3) });
    });
    return out;
  }, [mission]);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const s = steps[i];
  const L = LETTERS[s.ch];
  const next = () => { setPicked(null); if (i < steps.length - 1) setI(i + 1); else onDone(); };

  if (s.kind === "intro") {
    const ex = wordByRu(L.example);
    return (
      <section className="screen">
        <TopBar onClose={onExit} step={i} total={steps.length} />
        <div className="label">Letra nueva</div>
        <div className="lettercard">
          <button className="big" onClick={() => speak(L.ch)} aria-label={`Escuchar la letra ${L.ch}`} lang="ru">{L.ch}<small>{L.low}</small></button>
          <div className="sound">suena «{L.sound}»</div>
          <p className="tip">{L.tip}</p>
          <div className="example">
            <span className="w" lang="ru">{ex.ru}</span>
            <span>{ex.tr} · {ex.es}</span>
            <button className="audio" onClick={() => speak(ex.ru)}>▶ Escuchar</button>
          </div>
        </div>
        <div className="spacer" />
        <button className="btn" onClick={next}>Entendido</button>
      </section>
    );
  }

  const done = picked !== null;
  const right = picked === s.ch;
  return (
    <section className="screen">
      <TopBar onClose={onExit} step={i} total={steps.length} />
      <div className="label">Prueba rápida</div>
      <h2>¿Cuál de estas letras suena «{L.sound}»?</h2>
      <div className="letter-opts">
        {s.opts.map((o) => (
          <button key={o} lang="ru" disabled={done}
            className={`letter-opt ${done && o === s.ch ? "right" : ""} ${done && o === picked && !right ? "wrong" : ""}`}
            onClick={() => { const ok = o === s.ch; setPicked(o); play(ok ? "ok" : "bad"); update((p) => recordAnswer(p, ok)); }}>{o}</button>
        ))}
      </div>
      <div className={`feedback ${done ? (right ? "ok" : "bad") : ""}`} role="status">
        {done ? (right ? "¡Exacto!" : `Es la ${s.ch}. La ${picked} suena «${LETTERS[picked!].sound}».`) : ""}
      </div>
      <div className="spacer" />
      <button className="btn" disabled={!done} onClick={next}>Continuar</button>
    </section>
  );
}

function Read({ mission, onExit, onDone }: Step) {
  const { speak, play, update } = useGame();
  const items = useMemo(() => {
    const pool = wordsThrough(mission.id).map((w) => w.es);
    return shuffle(mission.read).map((ru) => ({ w: wordByRu(ru), opts: options(wordByRu(ru).es, pool, 3) }));
  }, [mission]);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const { w, opts } = items[i];
  const done = picked !== null;
  const right = picked === w.es;
  return (
    <section className="screen">
      <TopBar onClose={onExit} step={i + (done ? 1 : 0)} total={items.length} />
      <div className="label">Descifra el mensaje</div>
      <div className="code" lang="ru">{w.ru}</div>
      <div className="opts">
        {opts.map((o) => (
          <button key={o} disabled={done}
            className={`opt ${done && o === w.es ? "right" : ""} ${done && o === picked && !right ? "wrong" : ""}`}
            onClick={() => { const ok = o === w.es; setPicked(o); play(ok ? "ok" : "bad"); update((p) => recordAnswer(p, ok)); speak(w.ru); }}>{o}</button>
        ))}
      </div>
      <div className={`feedback ${done ? (right ? "ok" : "bad") : ""}`} role="status">
        {done ? (right ? `¡Descifrado! Se lee «${w.tr}».` : `Casi. ${w.ru} se lee «${w.tr}» y significa «${w.es}».`) : ""}
        {done ? <button className="audio inline" onClick={() => speak(w.ru)}>▶ Otra vez</button> : null}
      </div>
      <div className="spacer" />
      <button className="btn" disabled={!done} onClick={() => { setPicked(null); if (i < items.length - 1) setI(i + 1); else onDone(); }}>
        {i < items.length - 1 ? "Siguiente" : "Ahora, a escribir"}
      </button>
    </section>
  );
}

function Write({ mission, onExit, onDone }: Step) {
  const { speak, play, update } = useGame();
  const keys = useMemo(() => lettersThrough(mission.id), [mission]);
  const [i, setI] = useState(0);
  const [result, setResult] = useState<boolean | null>(null);
  const [hint, setHint] = useState(false);
  const item = mission.write[i];
  const w = wordByRu(item.ru);
  const check = (text: string) => {
    if (!text || result !== null) return;
    const ok = normalize(text) === w.ru;
    setResult(ok); play(ok ? "ok" : "bad"); update((p) => recordAnswer(p, ok));
  };
  const { typed, setTyped, add, del } = useTyping(keys, result === null, check);
  const done = result !== null;
  const st = done ? (result ? "ok" : "bad") : undefined;
  const next = () => { setTyped(""); setResult(null); setHint(false); if (i < mission.write.length - 1) setI(i + 1); else onDone(); };
  return (
    <section className="screen">
      <TopBar onClose={onExit} step={i + (done ? 1 : 0)} total={mission.write.length} />
      <div className="label">{item.listen ? "Dictado" : "Escribe en ruso"}</div>
      <p className="prompt">
        {item.listen
          ? <>Una Sombra susurra algo en la niebla. Escúchalo y escríbelo. <button className="audio" onClick={() => speak(w.ru)}>▶ Escuchar</button></>
          : <>La radio del escuadrón solo acepta cirílico. Escribe <b>«{w.es}»</b>.</>}
      </p>
      <Slots text={typed} state={st} />
      <div className={`feedback ${st ?? ""}`} role="status">
        {done
          ? (result ? `¡Perfecto! ${w.ru} = «${w.es}».` : `Así se escribe: ${w.ru} (se lee «${w.tr}»). Fíjate letra por letra.`)
          : hint ? `Pista: se lee «${w.tr}»${item.listen ? ` y significa «${w.es}»` : ""}.` : ""}
      </div>
      <div className="spacer" />
      {done
        ? <button className="btn" onClick={next}>{i < mission.write.length - 1 ? "Siguiente" : `Enfrentar a ${mission.boss.name}`}</button>
        : (
          <>
            <Keyboard keys={keys} onKey={add} onDel={del} />
            <div className="row2">
              <button className="btn ghost" disabled={hint} onClick={() => setHint(true)}>Pista</button>
              <button className="btn" disabled={!typed} onClick={() => check(typed)}>Comprobar</button>
            </div>
          </>
        )}
    </section>
  );
}

const HITS_TO_WIN = 4;
const SHIELDS = 3;

function Boss({ mission, onExit, onWin }: { mission: M; onExit: () => void; onWin: () => void }) {
  const { play, update, toast } = useGame();
  const keys = useMemo(() => lettersThrough(mission.id), [mission]);
  const reads = useMemo(() => shuffle(mission.read), [mission]);
  const writes = useMemo(() => shuffle(mission.write.map((w) => w.ru)), [mission]);
  const pool = useMemo(() => wordsThrough(mission.id).map((w) => w.es), [mission]);
  const [round, setRound] = useState(0);
  const [hits, setHits] = useState(0);
  const [shields, setShields] = useState(SHIELDS);
  const [shake, setShake] = useState(0);
  const mode: "read" | "write" = round % 2 === 0 ? "read" : "write";
  const w = wordByRu(mode === "read" ? reads[(round / 2) % reads.length] : writes[Math.floor(round / 2) % writes.length]);
  const opts = useMemo(() => options(w.es, pool, 3), [w, pool]);
  const seconds = mode === "read" ? 12 : 25;
  const [left, setLeft] = useState(seconds);
  const lost = shields <= 0;

  const answer = (given: string | null) => {
    const ok = given !== null && (mode === "read" ? given === w.es : normalize(given) === w.ru);
    update((p) => recordAnswer(p, ok));
    if (ok) {
      play("hit");
      if (hits + 1 >= HITS_TO_WIN) { onWin(); return; }
      setHits(hits + 1);
    } else {
      play("bad"); setShake((s) => s + 1); setShields(shields - 1);
      const sol = mode === "read" ? `${w.ru} = «${w.es}»` : `«${w.es}» se escribe ${w.ru}`;
      toast(given === null ? `¡Se acabó el tiempo! ${sol}.` : `Fallaste: ${sol}. Pierdes un escudo.`);
    }
    setTyped(""); setRound(round + 1);
  };
  const answerRef = useRef(answer);
  answerRef.current = answer;
  const { typed, setTyped, add, del } = useTyping(keys, mode === "write" && !lost, (t) => t && answer(t));

  useEffect(() => {
    if (lost) return;
    setLeft(seconds);
    const start = Date.now();
    const t = window.setInterval(() => {
      const remaining = seconds - (Date.now() - start) / 1000;
      if (remaining <= 0) { window.clearInterval(t); answerRef.current(null); } else setLeft(remaining);
    }, 100);
    return () => window.clearInterval(t);
  }, [round, lost, seconds]);

  if (lost) {
    return (
      <section className="screen">
        <div className="reward">
          <div className="boss"><EnemyFace /><div><b>{mission.boss.name}</b><div className="sub">{mission.boss.lose}</div></div></div>
          <p className="sub">Repasa y vuelve. No pierdes la experiencia que ganaste.</p>
        </div>
        <button className="btn" onClick={() => { setShields(SHIELDS); setHits(0); setRound(0); }}>Intentar otra vez</button>
        <button className="btn ghost" onClick={onExit}>Volver al mapa</button>
      </section>
    );
  }

  return (
    <section className="screen">
      <div className="topbar">
        <button className="back" onClick={onExit}>✕ Huir</button>
        <span className="shields" aria-label={`${shields} escudos`}>{Array.from({ length: SHIELDS }, (_, k) => <Shield key={k} on={k < shields} />)}</span>
      </div>
      <div className={`boss ${shake ? "shake" : ""}`} key={shake}>
        <EnemyFace />
        <div>
          <div className="label enemy">Jefe final · {mission.boss.tagline}</div>
          <b lang="ru">{mission.boss.name}</b> <span className="sub">· {mission.boss.ru}</span>
          <div className="hp" role="progressbar" aria-label="Vida del jefe" aria-valuemin={0} aria-valuemax={HITS_TO_WIN} aria-valuenow={HITS_TO_WIN - hits}>
            <i style={{ width: `${((HITS_TO_WIN - hits) / HITS_TO_WIN) * 100}%` }} />
          </div>
        </div>
      </div>
      {mode === "read" ? (
        <>
          <p className="sub">{mission.boss.readPrompt}</p>
          <div className="code" lang="ru">{w.ru}</div>
          <div className="timer"><i style={{ width: `${(left / seconds) * 100}%` }} /></div>
          <div className="opts">{opts.map((o) => <button key={o} className="opt" onClick={() => answer(o)}>{o}</button>)}</div>
        </>
      ) : (
        <>
          <p className="sub">{mission.boss.writePrompt} <b>«{w.es}»</b></p>
          <Slots text={typed} />
          <div className="timer"><i style={{ width: `${(left / seconds) * 100}%` }} /></div>
          <Keyboard keys={keys} onKey={add} onDel={del} />
          <button className="btn" disabled={!typed} onClick={() => answer(typed)}>Enviar por radio</button>
        </>
      )}
    </section>
  );
}

function Reward({ mission }: { mission: M }) {
  const { go, p } = useGame();
  const ru = ruName(p.name);
  const known = [...new Set([...ru.toUpperCase()].filter((c) => lettersThrough(mission.id).includes(c)))];
  const nextMission = MISSIONS[MISSIONS.findIndex((m) => m.id === mission.id) + 1];
  return (
    <section className="screen">
      <div className="reward">
        <div className="label">Misión {mission.id} cumplida</div>
        <h2>¡Lo lograste, {p.name || "cadete"}!</h2>
        <p className="sub"><Rich text={mission.outro} /></p>
        <div className="xp">+{mission.xp} XP</div>
        <div className="cards six">{mission.letters.map((l, i) => <div key={l} className="card got pulse" style={{ animationDelay: `${i * 0.08}s` }} lang="ru">{l}</div>)}</div>
        {known.length ? <p className="sub">Tu nombre en ruso, <b className="fg" lang="ru">{ru}</b>, ya tiene letras que sabes leer: {known.join(" ")}.</p> : null}
        <div className="secret"><div className="label">Archivo secreto {MISSIONS.indexOf(mission) + 1} de 12</div>{mission.secret}</div>
        <p className="sub">Desde mañana estas letras y palabras aparecerán en la <b className="fg">Patrulla nocturna</b> para que no se te olviden.</p>
      </div>
      {nextMission ? <button className="btn" onClick={() => go({ name: "mission", id: nextMission.id })}>Siguiente misión: {nextMission.title}</button> : null}
      <button className={nextMission ? "btn ghost" : "btn"} onClick={() => go({ name: "map" })}>Volver al mapa</button>
    </section>
  );
}
