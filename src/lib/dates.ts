/** Fechas como texto «AAAA-MM-DD» en la hora local del teléfono. */
export function dayOf(d: Date = new Date()): string {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export function addDays(day: string, n: number): string {
  const [y, m, d] = day.split("-").map(Number);
  return dayOf(new Date(y, m - 1, d + n));
}
