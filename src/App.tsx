import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GameCtx, type Game, type Screen } from "./game";
import { load, save, type Progress } from "./lib/progress";
import { say, sfx, warmVoices } from "./lib/audio";
import { dayOf } from "./lib/dates";
import Mission from "./screens/Mission";
import Review from "./screens/Review";
import { MapScreen, Start } from "./screens/Home";
import { Cards, Report, Squad } from "./screens/Profile";

export default function App() {
  const [p, setP] = useState<Progress>(() => load());
  const [screen, setScreen] = useState<Screen>(() => (p.name ? { name: "map" } : { name: "start" }));
  const [toasts, setToasts] = useState<{ id: number; msg: string }[]>([]);
  const [saveFailed, setSaveFailed] = useState(false);
  const pRef = useRef(p);
  pRef.current = p;
  const today = dayOf();

  useEffect(() => { setSaveFailed(!save(p)); }, [p]);
  useEffect(() => { warmVoices(); }, []);

  const toast = useCallback((msg: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t.slice(-1), { id, msg }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
  }, []);

  const game = useMemo<Game>(() => ({
    p,
    today,
    update: (fn) => setP((prev) => fn(prev)),
    go: (s) => { setScreen(s); window.scrollTo?.(0, 0); },
    toast,
    speak: (ru) => say(ru, () => toast("No se pudo reproducir la voz en ruso. Lee la pronunciación escrita mientras tanto.")),
    play: (kind) => { if (pRef.current.sound) sfx[kind](); },
  }), [p, today, toast]);

  let view;
  switch (screen.name) {
    case "start": view = <Start />; break;
    case "map": view = <MapScreen />; break;
    case "mission": view = <Mission key={screen.id} id={screen.id} />; break;
    case "review": view = <Review />; break;
    case "cards": view = <Cards />; break;
    case "squad": view = <Squad />; break;
    case "report": view = <Report />; break;
  }

  return (
    <GameCtx.Provider value={game}>
      <main className="app">
        {saveFailed ? <div className="warn" role="alert">Este teléfono no está dejando guardar el progreso (¿modo incógnito?). Puedes jugar, pero se perderá al cerrar.</div> : null}
        {view}
        <div className="toasts" aria-live="assertive">{toasts.map((t) => <div key={t.id} className="toast" role="status">{t.msg}</div>)}</div>
      </main>
    </GameCtx.Provider>
  );
}
