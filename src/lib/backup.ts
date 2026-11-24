import { fromData, type Progress } from "./progress";

/**
 * Copia de seguridad sin servidor: el progreso se convierte en un código de texto que el jugador
 * guarda donde quiera (por ejemplo, mandándoselo a sí mismo) y pega en otro teléfono para recuperarlo.
 */
const PREFIX = "CC1-";

export class BackupError extends Error {}

export function exportCode(p: Progress): string {
  const bytes = new TextEncoder().encode(JSON.stringify(p));
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return PREFIX + btoa(bin);
}

export function importCode(code: string): Progress {
  const clean = code.replace(/\s+/g, "");
  if (!clean) throw new BackupError("Pega primero el código de tu copia.");
  if (!clean.startsWith(PREFIX)) throw new BackupError("Ese texto no es una copia de Código Cirílico. El código empieza por CC1-.");
  let data: unknown;
  try {
    const bin = atob(clean.slice(PREFIX.length));
    data = JSON.parse(new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0))));
  } catch {
    throw new BackupError("El código está incompleto o dañado. Cópialo otra vez completo, sin cortar nada.");
  }
  const p = fromData(data);
  if (!p) throw new BackupError("El código no tiene un progreso válido. Crea una copia nueva desde el otro teléfono.");
  return p;
}
