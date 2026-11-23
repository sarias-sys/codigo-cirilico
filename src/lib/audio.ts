/** Voz rusa del teléfono. Devuelve false si el teléfono no tiene voz en ruso. */
export function say(text: string): boolean {
  try {
    if (!("speechSynthesis" in window)) return false;
    const voices = window.speechSynthesis.getVoices();
    const ru = voices.find((v) => v.lang?.toLowerCase().startsWith("ru"));
    if (voices.length > 0 && !ru) return false;
    const u = new SpeechSynthesisUtterance(text.toLowerCase());
    u.lang = "ru-RU";
    u.rate = 0.75;
    if (ru) u.voice = ru;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
    return true;
  } catch {
    return false;
  }
}

/** Precarga la lista de voces (en Chrome llega un momento después de abrir la página). */
export function warmVoices() {
  try { window.speechSynthesis?.getVoices(); } catch { /* sin voz */ }
}

let ctx: AudioContext | null = null;
function audio(): AudioContext | null {
  try {
    ctx ??= new AudioContext();
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(freq: number, start: number, dur: number, type: OscillatorType = "triangle", gain = 0.12) {
  const a = audio();
  if (!a) return;
  const o = a.createOscillator();
  const g = a.createGain();
  o.type = type;
  o.frequency.value = freq;
  const t = a.currentTime + start;
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  o.connect(g).connect(a.destination);
  o.start(t);
  o.stop(t + dur);
}

function buzz(ms: number | number[]) {
  try { navigator.vibrate?.(ms); } catch { /* sin vibración */ }
}

export const sfx = {
  ok: () => { tone(660, 0, 0.12); tone(990, 0.09, 0.18); },
  bad: () => { tone(160, 0, 0.25, "sawtooth", 0.08); buzz(120); },
  hit: () => { tone(220, 0, 0.08, "square", 0.1); tone(110, 0.06, 0.2, "square", 0.1); buzz([40, 30, 60]); },
  win: () => { [523, 659, 784, 1046].forEach((f, i) => tone(f, i * 0.12, 0.3)); },
  tap: () => tone(880, 0, 0.04, "sine", 0.05),
};
