import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import { STORAGE_KEY, completeMission, fresh } from "../lib/progress";
import { MISSIONS, wordByRu } from "../content/missions";
import { addDays, dayOf } from "../lib/dates";

describe("la app", () => {
  it("la primera vez pide el nombre y lo usa en la historia, también en ruso", () => {
    render(<App />);
    const input = screen.getByLabelText("¿Cómo te llamas, cadete?");
    fireEvent.change(input, { target: { value: "Daniel" } });
    expect(screen.getByText("ДАНИИЛ")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Unirme al escuadrón" }));
    expect(screen.getByText(/Daniel, despierta/)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Siguiente" }));
    expect(screen.getByText("Даниил")).toBeTruthy();
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!).name).toBe("Daniel");
  });

  it("recorre la historia y llega a la primera letra", () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText("¿Cómo te llamas, cadete?"), { target: { value: "Ana" } });
    fireEvent.click(screen.getByRole("button", { name: "Unirme al escuadrón" }));
    for (let i = 1; i < MISSIONS[0].intro.length; i++) fireEvent.click(screen.getByRole("button", { name: "Siguiente" }));
    fireEvent.click(screen.getByRole("button", { name: "Listo, capitana" }));
    expect(screen.getByText("Letra nueva")).toBeTruthy();
    expect(screen.getByText("suena «a»")).toBeTruthy();
  });

  it("si ya jugó, abre en el mapa con la misión 0.2 desbloqueada", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completeMission({ ...fresh(), name: "Ana" }, MISSIONS[0], dayOf())));
    render(<App />);
    expect(screen.getByText(/Misión 0.2 · Falsas amigas/).closest("button")?.disabled).toBe(false);
  });

  it("la patrulla nocturna repasa lo que toca y escribe con el teclado en pantalla", () => {
    const yesterday = addDays(dayOf(), -1);
    const p = completeMission({ ...fresh(), name: "Ana" }, MISSIONS[0], yesterday);
    const srs = Object.fromEntries(Object.entries(p.srs).filter(([k]) => k === "W:КОТ").map(([k, v]) => [k, { ...v, box: 2 }]));
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...p, srs }));
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /Patrulla nocturna/ }));
    expect(screen.getByText("Escribe «gato» en ruso")).toBeTruthy();
    for (const k of ["К", "О", "Т"]) fireEvent.click(screen.getByRole("button", { name: `Letra ${k}` }));
    fireEvent.click(screen.getByRole("button", { name: "Comprobar" }));
    expect(screen.getByText(/¡Bien!/)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Terminar patrulla" }));
    expect(screen.getByText("Ronda perfecta")).toBeTruthy();
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(saved.srs["W:КОТ"].box).toBe(3);
  });

  it("guarda una copia del progreso y la recupera en otro teléfono", () => {
    const played = completeMission({ ...fresh(), name: "Ana" }, MISSIONS[0], dayOf());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(played));
    render(<App />);
    expect(screen.getByText(/Guarda una copia de tu progreso/)).toBeTruthy();
    fireEvent.click(screen.getByText(/Guarda una copia de tu progreso/));
    fireEvent.click(screen.getByRole("button", { name: "Guardar copia" }));
    const code = (screen.getByLabelText(/Este código es tu copia/) as HTMLTextAreaElement).value;
    expect(code.startsWith("CC1-")).toBe(true);
    cleanup();

    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...fresh(), name: "Ana" }));
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /Escuadrón/ }));
    fireEvent.click(screen.getByRole("button", { name: "Recuperar" }));
    const box = screen.getByLabelText(/Pega aquí el código/);
    fireEvent.change(box, { target: { value: "esto no sirve" } });
    fireEvent.click(screen.getByRole("button", { name: "Revisar copia" }));
    expect(screen.getByRole("alert").textContent).toMatch(/no es una copia/);
    fireEvent.change(box, { target: { value: code } });
    fireEvent.click(screen.getByRole("button", { name: "Revisar copia" }));
    fireEvent.click(screen.getByRole("button", { name: "Sí, recuperar" }));
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(saved.xp).toBe(played.xp);
    expect(saved.completed).toEqual(["0.1"]);
  });

  it("el nivel 0 tiene las cuatro misiones y se abren en orden", () => {
    let p = { ...fresh(), name: "Ana" };
    for (const m of MISSIONS.slice(0, 3)) p = completeMission(p, m, dayOf());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    render(<App />);
    expect(screen.getByText(/Misión 0.4 · Letras raras/).closest("button")?.disabled).toBe(false);
  });

  it("al terminar el alfabeto se abre el Expediente 1 y su conversación usa el nombre en ruso", () => {
    let p = { ...fresh(), name: "Ana" };
    for (const m of MISSIONS.filter((x) => x.level === 0)) p = completeMission(p, m, dayOf());
    p = completeMission(p, MISSIONS.find((m) => m.id === "1.1")!, dayOf());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    render(<App />);
    expect(screen.getByText("Expediente 1 · Más allá del río")).toBeTruthy();
    fireEvent.click(screen.getByText(/Misión 1.2/));
    const m = MISSIONS.find((x) => x.id === "1.2")!;
    for (let i = 1; i < m.intro.length; i++) fireEvent.click(screen.getByRole("button", { name: "Siguiente" }));
    fireEvent.click(screen.getByRole("button", { name: "¡Vamos!" }));
    expect(screen.getByText("Frase nueva")).toBeTruthy();
    // Lección de frases: tarjeta y prueba rápida por cada frase.
    for (const ru of m.learn!) {
      fireEvent.click(screen.getByRole("button", { name: "Entendido" }));
      fireEvent.click(screen.getByRole("button", { name: wordByRu(ru).es }));
      fireEvent.click(screen.getByRole("button", { name: "Continuar" }));
    }
    // Descifrar: se responde lo que muestre la pantalla.
    for (let i = 0; i < m.read.length; i++) {
      const shown = document.querySelector(".code")!.textContent!;
      fireEvent.click(screen.getByRole("button", { name: wordByRu(shown).es }));
      fireEvent.click(screen.getByRole("button", { name: i < m.read.length - 1 ? "Siguiente" : "Ahora, a conversar" }));
    }
    expect(screen.getByText("Conversación")).toBeTruthy();
    expect(screen.getByText("КТО ТЫ?")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Я Анна." }));
    expect(screen.getByRole("status").textContent).toMatch(/¡Bien dicho!.*soy Анна/);
    fireEvent.click(screen.getByRole("button", { name: "Siguiente" }));
    fireEvent.click(screen.getByRole("button", { name: "ДОБРОЕ УТРО!" }));
    expect(screen.getByRole("status").textContent).toMatch(/Mejor: «МЕНЯ ЗОВУТ Анна\.»/);
  });

  it("al terminar el Expediente 1 se abre el mercado y llega Мира", () => {
    let p = { ...fresh(), name: "Ana" };
    for (const m of MISSIONS.filter((x) => x.level <= 1)) p = completeMission(p, m, dayOf());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    render(<App />);
    expect(screen.getByText("Expediente 2 · El mercado de la frontera")).toBeTruthy();
    expect(screen.getByText(/Misión 2.1 · Cuenta conmigo/).closest("button")?.disabled).toBe(false);
    expect(screen.getByText(/Misión 2.2/).closest("button")?.disabled).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: /Escuadrón/ }));
    expect(screen.getByText(/Cuenta cada moneda del escuadrón/)).toBeTruthy();
  });

  describe("hablar al micrófono", () => {
    const heard: string[][] = [];
    class FakeRec {
      onresult: ((e: unknown) => void) | null = null;
      onerror: ((e: unknown) => void) | null = null;
      onend: (() => void) | null = null;
      lang = ""; interimResults = false; maxAlternatives = 1; continuous = false;
      start() {
        const alts = heard.shift();
        if (alts) this.onresult?.({ results: [alts.map((transcript) => ({ transcript }))] });
        else this.onerror?.({ error: "not-allowed" });
      }
      abort() {}
    }
    afterEach(() => { delete (window as unknown as Record<string, unknown>).webkitSpeechRecognition; });

    const playTo13Speak = () => {
      let p = { ...fresh(), name: "Ana" };
      for (const m of MISSIONS.filter((x) => x.id !== "1.3")) p = completeMission(p, m, dayOf());
      localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
      render(<App />);
      fireEvent.click(screen.getByText(/Misión 1.3/));
      const m = MISSIONS.find((x) => x.id === "1.3")!;
      for (let i = 1; i < m.intro.length; i++) fireEvent.click(screen.getByRole("button", { name: "Siguiente" }));
      fireEvent.click(screen.getByRole("button", { name: "¡Vamos!" }));
      for (const ru of m.learn!) {
        fireEvent.click(screen.getByRole("button", { name: "Entendido" }));
        fireEvent.click(screen.getByRole("button", { name: wordByRu(ru).es }));
        fireEvent.click(screen.getByRole("button", { name: "Continuar" }));
      }
      for (let i = 0; i < m.read.length; i++) {
        fireEvent.click(screen.getByRole("button", { name: wordByRu(document.querySelector(".code")!.textContent!).es }));
        fireEvent.click(screen.getByRole("button", { name: i < m.read.length - 1 ? "Siguiente" : "Ahora, a conversar" }));
      }
      m.talk!.forEach((t, i) => {
        fireEvent.click(screen.getByRole("button", { name: t.answer }));
        fireEvent.click(screen.getByRole("button", { name: i < m.talk!.length - 1 ? "Siguiente" : "Ahora, a hablar" }));
      });
      return m;
    };

    it("pide permiso con el aviso de privacidad y califica lo que dijo", () => {
      (window as unknown as Record<string, unknown>).webkitSpeechRecognition = FakeRec;
      const m = playTo13Speak();
      expect(screen.getByText(/envía tu voz a Google/)).toBeTruthy();
      fireEvent.click(screen.getByRole("button", { name: "Activar micrófono" }));
      expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!).mic).toBe("on");
      expect(screen.getByText(m.speak![0])).toBeTruthy();
      heard.push(["как тебя"]);
      fireEvent.click(screen.getByRole("button", { name: "Toca y habla" }));
      expect(screen.getByRole("status").textContent).toMatch(/Escuché «как тебя»/);
      heard.push(["Как дела"]);
      fireEvent.click(screen.getByRole("button", { name: "Toca y habla" }));
      expect(screen.getByRole("status").textContent).toMatch(/¡Te entendí!/);
      fireEvent.click(screen.getByRole("button", { name: "Siguiente" }));
      // Micrófono bloqueado: lo dice y deja seguir.
      fireEvent.click(screen.getByRole("button", { name: "Toca y habla" }));
      expect(screen.getByRole("status").textContent).toMatch(/bloqueado/);
      fireEvent.click(screen.getByRole("button", { name: "No puedo hablar ahora" }));
      fireEvent.click(screen.getByRole("button", { name: "No puedo hablar ahora" }));
      expect(screen.getByText("Escribe en ruso")).toBeTruthy();
    });

    it("si prefiere no hablar, salta al escribir y no lo vuelve a preguntar", () => {
      (window as unknown as Record<string, unknown>).webkitSpeechRecognition = FakeRec;
      playTo13Speak();
      fireEvent.click(screen.getByRole("button", { name: "Prefiero no hablar" }));
      expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!).mic).toBe("off");
      expect(screen.getByText("Escribe en ruso")).toBeTruthy();
    });

    it("si el navegador no puede escuchar, lo avisa y deja seguir", () => {
      playTo13Speak();
      expect(screen.getByRole("alert").textContent).toMatch(/no puede escucharte/);
      fireEvent.click(screen.getByRole("button", { name: "Ahora, a escribir" }));
      expect(screen.getByText("Escribe en ruso")).toBeTruthy();
    });
  });
});
