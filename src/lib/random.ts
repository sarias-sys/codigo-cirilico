export type Rng = () => number;

export function shuffle<T>(items: readonly T[], rng: Rng = Math.random): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** La respuesta correcta más n-1 distractores distintos, en orden aleatorio. */
export function options(correct: string, pool: readonly string[], n = 3, rng: Rng = Math.random): string[] {
  const others = shuffle([...new Set(pool.filter((x) => x !== correct))], rng).slice(0, n - 1);
  return shuffle([correct, ...others], rng);
}
