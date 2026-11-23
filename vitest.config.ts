import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// Configuración de pruebas separada: sin el plugin de PWA, que genera íconos y no hace falta aquí.
export default defineConfig({
  plugins: [react()],
  test: { environment: "jsdom", setupFiles: ["src/test/setup.ts"] },
});
