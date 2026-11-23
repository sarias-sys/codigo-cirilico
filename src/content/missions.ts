import { LETTERS } from "./letters";

/**
 * Contenido de la historia. Para agregar una misión basta con escribirla aquí:
 * las pruebas revisan que cada palabra use solo letras que el jugador ya aprendió.
 * {N} = nombre del jugador, {R} = su nombre en ruso.
 */
export type Word = { ru: string; tr: string; es: string };
export type Line = { who: string; text: string; code?: string };

export type Mission = {
  id: string;
  title: string;
  subtitle: string;
  letters: string[];
  intro: Line[];
  read: string[];
  write: { ru: string; listen?: boolean }[];
  boss: { name: string; ru: string; tagline: string; readPrompt: string; writePrompt: string; lose: string };
  secret: string;
  outro: string;
  xp: number;
};

/** tr: pronunciación para hispanohablantes; la tilde marca la sílaba con fuerza. */
export const WORDS: Word[] = [
  { ru: "КОТ", tr: "kot", es: "gato" },
  { ru: "МАМА", tr: "máma", es: "mamá" },
  { ru: "АТОМ", tr: "átam", es: "átomo" },
  { ru: "ТОМАТ", tr: "tamát", es: "tomate" },
  { ru: "ТЕМА", tr: "tiéma", es: "tema" },
  { ru: "КОМЕТА", tr: "kamiéta", es: "cometa" },
  { ru: "ТАК", tr: "tak", es: "así" },
  { ru: "НОС", tr: "nos", es: "nariz" },
  { ru: "РУКА", tr: "ruká", es: "mano" },
  { ru: "СОК", tr: "sok", es: "jugo" },
  { ru: "МУХА", tr: "mujá", es: "mosca" },
  { ru: "ВОР", tr: "vor", es: "ladrón" },
  { ru: "ТЕАТР", tr: "tiátr", es: "teatro" },
  { ru: "МЕТРО", tr: "mietró", es: "metro" },
  { ru: "КОСМОС", tr: "kósmas", es: "cosmos" },
  { ru: "РАКЕТА", tr: "rakiéta", es: "cohete" },
  { ru: "НЕТ", tr: "niet", es: "no" },
  { ru: "ХОР", tr: "jor", es: "coro" },
];

export const wordByRu = (ru: string): Word => {
  const w = WORDS.find((x) => x.ru === ru);
  if (!w) throw new Error(`Falta la palabra ${ru} en WORDS`);
  return w;
};

export const MISSIONS: Mission[] = [
  {
    id: "0.1",
    title: "Letras gemelas",
    subtitle: "А К М О Т Е",
    letters: ["А", "К", "М", "О", "Т", "Е"],
    intro: [
      { who: "Сова", text: "{N}, despierta. Soy la capitana <ru>Сова</ru> (Sova), del <b>Escuadrón К</b>. Anoche las Sombras volvieron a atacar la ciudad." },
      { who: "Сова", text: "Desde hoy eres el cadete <ru>{R}</ru>. Así se escribe tu nombre en ruso. Muy pronto sabrás leerlo tú solo." },
      { who: "Сова", text: "Antes de desaparecer, las Sombras dejaron esto grabado en la muralla. Está en cirílico, el alfabeto del ruso:", code: "КОТ · АТОМ · ТОМАТ" },
      { who: "Сова", text: "Nadie sabe por qué las Sombras escriben en ruso. Si entendemos sus mensajes, sabremos dónde atacarán. <b>Seis de estas letras se parecen a las nuestras</b>, pero una es una trampa." },
      { who: "Сова", text: "Aprende las letras, {N}. Descifra el mensaje y defiende la puerta norte. Su líder, <ru>Тень</ru>, vendrá en persona." },
    ],
    read: ["КОТ", "МАМА", "АТОМ", "ТОМАТ", "КОМЕТА"],
    write: [{ ru: "КОТ" }, { ru: "ТАК" }, { ru: "МАМА" }, { ru: "ТЕМА", listen: true }, { ru: "ТОМАТ", listen: true }],
    boss: {
      name: "Тень", ru: "Ten', la Sombra", tagline: "Líder de las Sombras",
      readPrompt: "Тень ataca la puerta norte gritando en ruso. Descifra la palabra antes de que se acabe el tiempo.",
      writePrompt: "Тень bloquea la radio. Escribe la palabra en ruso para pedir refuerzos:",
      lose: "Тень rompió tus escudos y se retiró a la niebla. La puerta norte resiste.",
    },
    secret: "Entre las ruinas encontraste una página quemada: «Las Sombras no inventaron este idioma. Lo aprendieron de alguien… de nosotros».",
    outro: "Тень se retiró a la niebla. Volverá.",
    xp: 60,
  },
  {
    id: "0.2",
    title: "Falsas amigas",
    subtitle: "Р Н В С У Х",
    letters: ["Р", "Н", "В", "С", "У", "Х"],
    intro: [
      { who: "Сова", text: "{N}, el mensaje de la muralla era una distracción. Mientras defendíamos la puerta norte, alguien entró al cuartel." },
      { who: "Сова", text: "Se llevó la radio del escuadrón. Solo dejó una palabra escrita en la pared:", code: "ВОР" },
      { who: "Сова", text: "Cuidado: estas letras parecen nuestras, pero mienten. La <ru>Р</ru> no es P y la <ru>Н</ru> no es H. Son las <b>falsas amigas</b>." },
      { who: "Сова", text: "Apréndelas y atrapa al ladrón antes de que la radio cruce el río." },
    ],
    read: ["НОС", "РУКА", "СОК", "МУХА", "ТЕАТР", "МЕТРО"],
    write: [{ ru: "НЕТ" }, { ru: "СОК" }, { ru: "ВОР" }, { ru: "РУКА", listen: true }, { ru: "КОСМОС", listen: true }],
    boss: {
      name: "Вор", ru: "Vor, el Ladrón", tagline: "Espía de las Sombras",
      readPrompt: "El ladrón huye por los tejados y te lanza palabras para confundirte. Descífralas a tiempo.",
      writePrompt: "Вор intenta usar la radio robada. Escribe la palabra en ruso para bloquearla:",
      lose: "Вор se escapó por los tejados. Todavía no ha cruzado el río.",
    },
    secret: "En el bolsillo del ladrón había un mapa viejo: «Hace cien años la ciudad tenía otro nombre. Alguien lo borró de todos los mapas».",
    outro: "Recuperaste la radio. Esa misma noche, un explorador herido llamado <ru>Лев</ru> llega a la puerta: trae noticias del otro lado del río.",
    xp: 80,
  },
];

export const UPCOMING = [
  { id: "0.3", title: "Símbolos nuevos", subtitle: "Б Г Д Ж З И Л П Ф" },
  { id: "0.4", title: "Letras raras", subtitle: "Ц Ч Ш Щ Ы Ь Э Ю Я" },
  { id: "1", title: "Expediente 1 · Más allá del río", subtitle: "Saludar y presentarte: Привет!" },
  { id: "2", title: "Expediente 2 · El mercado de la frontera", subtitle: "Números, dinero y comida" },
];

/** Letras aprendidas hasta la misión indicada (incluida). */
export function lettersThrough(missionId: string): string[] {
  const i = MISSIONS.findIndex((m) => m.id === missionId);
  return MISSIONS.slice(0, i + 1).flatMap((m) => m.letters);
}

/** Palabras vistas hasta la misión indicada (incluida). */
export function wordsThrough(missionId: string): Word[] {
  const i = MISSIONS.findIndex((m) => m.id === missionId);
  return MISSIONS.slice(0, i + 1).flatMap(missionWords);
}

/** Palabras que enseña una misión: las de leer, escribir y los ejemplos de sus letras. */
export function missionWords(m: Mission): Word[] {
  const ru = new Set([...m.read, ...m.write.map((w) => w.ru), ...m.letters.map((l) => LETTERS[l].example)]);
  return WORDS.filter((w) => ru.has(w.ru));
}
