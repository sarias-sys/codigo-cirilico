import { useState } from "react";
import { useGame } from "../game";
import { MISSIONS, UPCOMING } from "../content/missions";
import { ruName } from "../lib/text";
import { rank } from "../lib/progress";
import { isDue } from "../lib/srs";
import { addDays } from "../lib/dates";
import { Stats, TabBar } from "../ui";

export function Start() {
  const { p, update, go } = useGame();
  const [name, setName] = useState(p.name);
  const clean = name.trim();
  return (
    <section className="screen">
      <div className="hero">
        <div className="label">La última ciudad en pie</div>
        <h1 className="logo">CÓDIGO<span lang="ru">КИРИЛЛИЦА</span></h1>
        <p className="sub">Las Sombras atacan de noche y dejan mensajes en ruso. Descifrarlos es la única forma de sobrevivir. Empiezas sin saber ni una letra.</p>
        <form className="namefield" onSubmit={(e) => { e.preventDefault(); if (!clean) return; update((x) => ({ ...x, name: clean })); go({ name: "mission", id: "0.1" }); }}>
          <label htmlFor="cadet-name">¿Cómo te llamas, cadete?</label>
          <input id="cadet-name" value={name} maxLength={20} autoComplete="off" autoCapitalize="words" onChange={(e) => setName(e.target.value)} placeholder="Escribe tu nombre" />
          <div className="badge">CADETE <span lang="ru">{ruName(clean).toUpperCase()}</span> · ESCUADRÓN К</div>
          <button className="btn" type="submit" disabled={!clean}>Unirme al escuadrón</button>
        </form>
        <p className="fine">Tu nombre y tu progreso se guardan solo en este teléfono.</p>
      </div>
    </section>
  );
}

export function MapScreen() {
  const { p, go, today } = useGame();
  const r = rank(p.xp);
  const due = Object.values(p.srs).filter((i) => isDue(i, today)).length;
  const span = r.next - r.base || 1;
  return (
    <>
      <section className="screen">
        <div className="topbar"><span className="label">Escuadrón К</span><Stats /></div>
        <div className="agent">
          <div className="avatar" lang="ru">{ruName(p.name)[0]}</div>
          <div className="grow">
            <b>{p.name}</b> <span className="sub">· <span lang="ru">{ruName(p.name)}</span> · {r.name}</span>
            <div className="xpbar" aria-label={`Experiencia: ${p.xp}`}><i style={{ width: `${Math.min(100, ((p.xp - r.base) / span) * 100)}%` }} /></div>
          </div>
        </div>
        {due > 0 ? (
          <button className="patrol" onClick={() => go({ name: "review" })}>
            <span className="moon">☾</span>
            <span><b>Patrulla nocturna</b><small>{due} {due === 1 ? "carta necesita" : "cartas necesitan"} repaso hoy. Si no las repasas, se apagan.</small></span>
          </button>
        ) : null}
        {p.completed.length > 0 && (!p.backupAt || p.backupAt < addDays(today, -7)) ? (
          <button className="nudge" onClick={() => go({ name: "squad" })}>
            💾 <b>Guarda una copia de tu progreso</b> para no perderlo si cambias de celular. Toma 10 segundos.
          </button>
        ) : null}
        <div className="section-t">Nivel 0 · El alfabeto</div>
        <div className="missions">
          {MISSIONS.map((m, i) => {
            const done = p.completed.includes(m.id);
            const open = i === 0 || p.completed.includes(MISSIONS[i - 1].id);
            const st = done ? "done" : open ? "open" : "locked";
            return (
              <button key={m.id} className={`mission ${st}`} disabled={st === "locked"} onClick={() => go({ name: "mission", id: m.id })}>
                <span className="ic" lang="ru">{m.letters[0]}</span>
                <span><b>Misión {m.id} · {m.title}</b><small lang="ru">{m.subtitle}</small></span>
                <span className="st">{done ? "REPETIR" : open ? "JUGAR" : "🔒"}</span>
              </button>
            );
          })}
        </div>
        <div className="section-t">Nivel 1 · Primeras misiones</div>
        <div className="missions">{UPCOMING.map((m) => <Locked key={m.id} {...m} />)}</div>
      </section>
      <TabBar current="map" />
    </>
  );
}

function Locked({ id, title, subtitle }: { id: string; title: string; subtitle: string }) {
  return (
    <div className="mission locked" aria-disabled="true">
      <span className="ic" lang="ru">{subtitle.trim()[0]}</span>
      <span><b>{id.includes(".") ? `Misión ${id} · ` : ""}{title}</b><small lang="ru">{subtitle}</small></span>
      <span className="st">PRONTO</span>
    </div>
  );
}
