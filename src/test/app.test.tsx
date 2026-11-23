import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import { STORAGE_KEY, completeMission, fresh } from "../lib/progress";
import { MISSIONS } from "../content/missions";
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
});
