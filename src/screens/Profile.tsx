import { useState } from "react";
import { useGame } from "../game";
import { ALPHABET, LETTERS } from "../content/letters";
import { MISSIONS, WORDS } from "../content/missions";
import { fresh, rank, visibleStreak, type Progress } from "../lib/progress";
import { BackupError, exportCode, importCode } from "../lib/backup";
import { isDue, letterKey, mastery, wordKey } from "../lib/srs";
import { ruName } from "../lib/text";
import { TabBar, TopBar } from "../ui";

export function Cards() {
  const { p, today, go } = useGame();
  const got = ALPHABET.filter((l) => p.srs[letterKey(l)]);
  return (
    <>
      <section className="screen">
        <TopBar onClose={() => go({ name: "map" })} />
        <h2>Mis cartas</h2>
        <p className="sub">{got.length} de 33 letras. Las cartas que necesitan repaso se apagan hasta que las recargas en la Patrulla nocturna.</p>
        {got.length === 0 ? <div className="empty"><b>Aún no tienes cartas</b>Termina la misión 0.1 para ganar las 6 primeras.</div> : null}
        <div className="cards">
          {ALPHABET.map((l) => {
            const item = p.srs[letterKey(l)];
            const cls = !item ? "" : isDue(item, today) ? "got dim" : "got";
            return (
              <div key={l} className={`card ${cls}`} lang="ru" title={item ? `${l}: suena «${LETTERS[l]?.sound}»` : "Bloqueada"}>
                {item ? l : "?"}
                {item && mastery(item) === "dominada" ? <i className="star" aria-label="dominada">★</i> : null}
              </div>
            );
          })}
        </div>
      </section>
      <TabBar current="cards" />
    </>
  );
}

export function Squad() {
  const { p, go, update } = useGame();
  const ru = ruName(p.name);
  const levDone = p.completed.includes("0.2");
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(p.name);
  const [confirmReset, setConfirmReset] = useState(false);
  return (
    <>
      <section className="screen">
        <TopBar onClose={() => go({ name: "map" })} />
        <h2>Escuadrón К</h2>
        <p className="sub">Cada expediente suma a alguien nuevo, y cada uno te enseña algo distinto del ruso.</p>
        <div className="squad">
          <Member face={ru[0]} name={`${p.name} · ${ru}`} text={`Tú. ${rank(p.xp).name} del escuadrón. Las Sombras ya saben tu nombre.`} />
          <Member face="С" name="Сова · Sova" text="Capitana. Te enseña el alfabeto y las órdenes del escuadrón." />
          <Member face="Л" name="Лев · Lev" locked={!levDone} text={levDone ? "Explorador. Llegó herido del otro lado del río. Te enseñará a saludar y presentarte." : "Explorador. Llega al terminar la misión 0.2."} />
          <Member face="М" name="Мира · Mira" locked text="Intendente. Llega en el Expediente 2: números, dinero y comida." />
          <Member face="?" name="???" locked text="Alguien del escuadrón guarda un secreto. ¿Puedes confiar en todos?" />
        </div>

        <button className="btn ghost" onClick={() => go({ name: "report" })}>Informe para papá o mamá</button>

        <Backup />

        <div className="section-t">Ajustes</div>
        <div className="settings">
          <label className="toggle"><input type="checkbox" id="sound" checked={p.sound} onChange={(e) => update((x) => ({ ...x, sound: e.target.checked }))} /> Sonidos y vibración</label>
          <label className="toggle"><input type="checkbox" id="mic" checked={p.mic === "on"} onChange={(e) => update((x) => ({ ...x, mic: e.target.checked ? "on" : "off" }))} /> Hablar al micrófono</label>
          <p className="sub small">Para entenderte, el navegador envía tu voz a Google (Chrome) o Apple (Safari). La app no graba ni guarda tu voz.</p>
          {editing ? (
            <form className="namefield" onSubmit={(e) => { e.preventDefault(); const n = name.trim(); if (n) { update((x) => ({ ...x, name: n })); setEditing(false); } }}>
              <label htmlFor="rename">Nombre del cadete</label>
              <input id="rename" value={name} maxLength={20} onChange={(e) => setName(e.target.value)} />
              <div className="row2"><button type="button" className="btn ghost" onClick={() => setEditing(false)}>Cancelar</button><button className="btn" type="submit" disabled={!name.trim()}>Guardar</button></div>
            </form>
          ) : <button className="link" onClick={() => setEditing(true)}>Cambiar nombre</button>}
          {confirmReset ? (
            <div className="danger">
              <b>¿Borrar todo el progreso?</b> Se pierden la experiencia, las cartas y la racha de este teléfono. No se puede deshacer.
              <div className="row2"><button className="btn ghost" onClick={() => setConfirmReset(false)}>Cancelar</button><button className="btn red" onClick={() => { update(() => fresh()); go({ name: "start" }); }}>Sí, borrar</button></div>
            </div>
          ) : <button className="link danger-link" onClick={() => setConfirmReset(true)}>Borrar progreso</button>}
        </div>
      </section>
      <TabBar current="squad" />
    </>
  );
}

/** Guardar y recuperar el progreso con un código, sin servidor ni cuentas. */
function Backup() {
  const { p, update, toast, today } = useGame();
  const [mode, setMode] = useState<"none" | "save" | "restore">("none");
  const [code, setCode] = useState("");
  const [pasted, setPasted] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState<Progress | null>(null);
  const saved = () => update((x) => ({ ...x, backupAt: today }));
  const open = (m: typeof mode) => { setMode(m); setError(""); setPending(null); setPasted(""); if (m === "save") setCode(exportCode(p)); };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      saved();
      toast("Copia guardada en el portapapeles. Pégala en un lugar seguro, por ejemplo en un chat contigo mismo.");
    } catch {
      toast("No se pudo copiar sola. Mantén el dedo sobre el código, selecciónalo todo y cópialo a mano.");
    }
  };
  const share = async () => {
    try {
      await navigator.share({ title: "Copia de Código Cirílico", text: code });
      saved();
    } catch (e) {
      if ((e as Error).name !== "AbortError") toast("No se pudo compartir. Usa el botón Copiar.");
    }
  };
  const check = () => {
    try { setPending(importCode(pasted)); setError(""); }
    catch (e) { setPending(null); setError(e instanceof BackupError ? e.message : "No se pudo leer la copia."); }
  };

  return (
    <div className="backup">
      <div className="section-t">Copia de seguridad</div>
      <p className="sub">
        Tu progreso vive solo en este teléfono. Si borras los datos del navegador o cambias de celular, lo recuperas con una copia.{" "}
        {p.backupAt ? `Última copia: ${p.backupAt}.` : "Todavía no has guardado ninguna."}
      </p>
      {mode === "none" ? (
        <div className="row2">
          <button className="btn ghost" onClick={() => open("restore")}>Recuperar</button>
          <button className="btn" onClick={() => open("save")}>Guardar copia</button>
        </div>
      ) : null}
      {mode === "save" ? (
        <>
          <label htmlFor="backup-out" className="sub">Este código es tu copia. Incluye tu nombre: guárdalo solo para ti.</label>
          <textarea id="backup-out" className="code-box" readOnly value={code} onFocus={(e) => e.currentTarget.select()} />
          <div className="row2">
            {"share" in navigator ? <button className="btn ghost" onClick={share}>Compartir</button> : <button className="btn ghost" onClick={() => setMode("none")}>Cerrar</button>}
            <button className="btn" onClick={copy}>Copiar</button>
          </div>
          {"share" in navigator ? <button className="link" onClick={() => setMode("none")}>Cerrar</button> : null}
        </>
      ) : null}
      {mode === "restore" ? (
        <>
          <label htmlFor="backup-in" className="sub">Pega aquí el código de tu copia (empieza por CC1-).</label>
          <textarea id="backup-in" className="code-box" value={pasted} onChange={(e) => { setPasted(e.target.value); setPending(null); setError(""); }} />
          {error ? <div className="danger" role="alert">{error}</div> : null}
          {pending ? (
            <div className="danger">
              <b>¿Reemplazar el progreso de este teléfono?</b> Ahora tienes {p.xp} XP y {p.completed.length} misiones. La copia de {pending.name || "un cadete"} tiene {pending.xp} XP y {pending.completed.length} misiones.
              <div className="row2">
                <button className="btn ghost" onClick={() => setPending(null)}>Cancelar</button>
                <button className="btn" onClick={() => { update(() => pending); setMode("none"); toast(`Progreso recuperado. Bienvenido de vuelta, ${pending.name || "cadete"}.`); }}>Sí, recuperar</button>
              </div>
            </div>
          ) : (
            <div className="row2">
              <button className="btn ghost" onClick={() => setMode("none")}>Cancelar</button>
              <button className="btn" disabled={!pasted.trim()} onClick={check}>Revisar copia</button>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}

function Member({ face, name, text, locked }: { face: string; name: string; text: string; locked?: boolean }) {
  return (
    <div className={`member ${locked ? "locked" : ""}`}>
      <div className="face" lang="ru">{face}</div>
      <div><b>{name}</b><small>{text}</small></div>
    </div>
  );
}

export function Report() {
  const { p, go, today } = useGame();
  const learned = ALPHABET.filter((l) => p.srs[letterKey(l)]);
  const mastered = learned.filter((l) => mastery(p.srs[letterKey(l)]) === "dominada");
  const words = WORDS.filter((w) => p.srs[wordKey(w.ru)]);
  const acc = p.stats.answers ? Math.round((p.stats.correct / p.stats.answers) * 100) : 0;
  const hard = Object.entries(p.srs).filter(([, i]) => i.wrong > 0).sort((a, b) => b[1].wrong - a[1].wrong).slice(0, 5);
  return (
    <section className="screen">
      <TopBar onClose={() => go({ name: "squad" })} />
      <div className="label">Informe para papá o mamá</div>
      <h2>Cómo va {p.name || "el cadete"}</h2>
      <div className="kpis">
        <div><b>{visibleStreak(p.streak, today)}</b><span>días seguidos</span></div>
        <div><b>{learned.length}<small>/33</small></b><span>letras vistas</span></div>
        <div><b>{mastered.length}</b><span>letras dominadas</span></div>
        <div><b>{words.length}</b><span>palabras</span></div>
        <div><b>{acc}%</b><span>aciertos</span></div>
        <div><b>{p.completed.length}<small>/{MISSIONS.length}</small></b><span>misiones</span></div>
      </div>
      <div className="section-t">Letras</div>
      <div className="cards">
        {ALPHABET.map((l) => {
          const m = mastery(p.srs[letterKey(l)]);
          return <div key={l} className={`card m-${m}`} lang="ru" title={`${l}: ${m}`}>{l}</div>;
        })}
      </div>
      <p className="legend"><span className="sw m-dominada" /> dominada <span className="sw m-aprendiendo" /> aprendiendo <span className="sw m-nueva" /> sin ver</p>
      <div className="section-t">Le cuestan más</div>
      {hard.length ? (
        <ul className="hard">{hard.map(([k, i]) => <li key={k}><b lang="ru">{k.slice(2)}</b> · falló {i.wrong} {i.wrong === 1 ? "vez" : "veces"}</li>)}</ul>
      ) : <p className="sub">Todavía no hay errores en el repaso. Los errores de cada misión aparecen aquí cuando llegan a la Patrulla nocturna.</p>}
      <p className="fine">Una «letra dominada» es una que acertó varias veces seguidas en días distintos. Lo ideal son 10 a 15 minutos al día: la Patrulla nocturna se encarga de repasar justo lo que se está olvidando.</p>
    </section>
  );
}
