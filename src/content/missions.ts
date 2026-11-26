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
  // 0.3
  { ru: "БРАТ", tr: "brat", es: "hermano" },
  { ru: "ГОРА", tr: "gará", es: "montaña" },
  { ru: "ДОМ", tr: "dom", es: "casa" },
  { ru: "ЗВЕЗДА", tr: "zviezdá", es: "estrella" },
  { ru: "ИГРА", tr: "igrá", es: "juego" },
  { ru: "ГЕРОЙ", tr: "gierói", es: "héroe" },
  { ru: "ЛУНА", tr: "luná", es: "luna" },
  { ru: "ПАПА", tr: "pápa", es: "papá" },
  { ru: "ФОТО", tr: "fóta", es: "foto" },
  { ru: "ЖУК", tr: "zhuk", es: "escarabajo" },
  { ru: "ВОДА", tr: "vadá", es: "agua" },
  { ru: "ГОРОД", tr: "górat", es: "ciudad" },
  { ru: "МОСТ", tr: "most", es: "puente" },
  { ru: "ПРИВЕТ", tr: "priviét", es: "hola" },
  { ru: "ДА", tr: "da", es: "sí" },
  { ru: "ДРУГ", tr: "druk", es: "amigo" },
  { ru: "ВРАГ", tr: "vrak", es: "enemigo" },
  { ru: "ЗИМА", tr: "zimá", es: "invierno" },
  { ru: "БАНАН", tr: "banán", es: "banano" },
  // 0.4
  { ru: "ЦИРК", tr: "tsirk", es: "circo" },
  { ru: "ЧАЙ", tr: "chai", es: "té" },
  { ru: "ШКОЛА", tr: "shkóla", es: "escuela" },
  { ru: "ЩИТ", tr: "shchit", es: "escudo" },
  { ru: "СЫР", tr: "syr", es: "queso" },
  { ru: "ДЕНЬ", tr: "dien'", es: "día" },
  { ru: "ОБЪЕКТ", tr: "abiékt", es: "objeto" },
  { ru: "ЭХО", tr: "éja", es: "eco" },
  { ru: "ЮГ", tr: "iuk", es: "sur" },
  { ru: "ЯБЛОКО", tr: "iábloka", es: "manzana" },
  { ru: "ЁЛКА", tr: "iólka", es: "abeto" },
  { ru: "Я", tr: "ia", es: "yo" },
  { ru: "ЭТО", tr: "éta", es: "esto" },
  { ru: "ЦАРЬ", tr: "tsar'", es: "zar" },
  { ru: "ТИШИНА", tr: "tishiná", es: "silencio" },
  { ru: "МЕНЯ ЗОВУТ", tr: "miniá zavút", es: "me llamo" },
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
  {
    id: "0.3",
    title: "Símbolos nuevos",
    subtitle: "Б Г Д З И Й Л П Ф Ж",
    letters: ["Б", "Г", "Д", "З", "И", "Й", "Л", "П", "Ф", "Ж"],
    intro: [
      { who: "Лев", text: "Me llamo <ru>Лев</ru> (Liev), que en ruso significa «león». Crucé el río para traerles esto. Estaba clavado en el puente:", code: "ДРУГ ИЛИ ВРАГ?" },
      { who: "Сова", text: "Todavía no puedes leerlo, {N}. Tiene letras que nunca has visto: <b>símbolos nuevos</b>, sin ningún parecido con los nuestros." },
      { who: "Лев", text: "Del otro lado hay una ciudad entera escrita con ellos. Y el puente lo vigila <ru>Страж</ru>, el Guardián. Nadie ha pasado." },
      { who: "Сова", text: "Son diez letras. Apréndelas y cruza el puente con Лев. De paso aprenderás a saludar como un ruso: <ru>ПРИВЕТ</ru>." },
    ],
    read: ["ДОМ", "ПАПА", "ВОДА", "ГОРОД", "МОСТ", "ПРИВЕТ"],
    write: [{ ru: "ДА" }, { ru: "ДРУГ" }, { ru: "ВРАГ" }, { ru: "ЗИМА", listen: true }, { ru: "БАНАН", listen: true }],
    boss: {
      name: "Страж", ru: "Strazh, el Guardián", tagline: "Guardián del puente",
      readPrompt: "Страж bloquea el puente y te grita palabras en ruso. Descífralas para avanzar un paso.",
      writePrompt: "Страж solo deja pasar a quien escribe la contraseña en ruso:",
      lose: "Страж te empujó de vuelta a la orilla. El puente sigue en pie.",
    },
    secret: "En la mochila de Лев hay una foto vieja del Escuadrón К. Él sale en ella, igual que hoy… pero la foto tiene cien años.",
    outro: "Cruzaste el puente. Del otro lado, la nieve cubre una ciudad en ruinas llena de letras que no conoces: <ru>Ц Ч Ш Щ</ru>… Allí te espera la última parte del alfabeto.",
    xp: 100,
  },
  {
    id: "0.4",
    title: "Letras raras",
    subtitle: "Ц Ч Ш Щ Ы Ь Ъ Э Ю Я Ё",
    letters: ["Ц", "Ч", "Ш", "Щ", "Ы", "Ь", "Ъ", "Э", "Ю", "Я", "Ё"],
    intro: [
      { who: "Сова", text: "{N}, la ciudad en ruinas está llena de carteles. Usan las letras más raras del ruso: dos de ellas ni siquiera suenan." },
      { who: "Лев", text: "Aquí vivía la gente antes de las Sombras. En la plaza alguien escribió esto con ceniza:", code: "Я ВЕРНУСЬ" },
      { who: "Сова", text: "Es la letra de <ru>Тень</ru>. Dice que volverá… y esta vez no viene sola. Viene con su rey, <ru>Царь</ru>." },
      { who: "Сова", text: "Son once letras, cadete: las más difíciles. Cuando las domines conocerás las 33 y podrás presentarte en ruso: <ru>Меня зовут {R}</ru>." },
    ],
    read: ["ЧАЙ", "ШКОЛА", "СЫР", "ЭТО", "ЦАРЬ", "МЕНЯ ЗОВУТ"],
    write: [{ ru: "Я" }, { ru: "ЩИТ" }, { ru: "ЮГ" }, { ru: "ДЕНЬ", listen: true }, { ru: "ТИШИНА", listen: true }],
    boss: {
      name: "Царь", ru: "Tsar', el Rey de las Sombras", tagline: "Rey de las Sombras",
      readPrompt: "Царь habla con mil ecos a la vez. Descifra su palabra antes de que el eco te confunda.",
      writePrompt: "Las Sombras rodean la plaza. Escribe la palabra en ruso para levantar el escudo:",
      lose: "Царь apagó tus escudos con un grito. Retrocedes, pero la plaza sigue siendo tuya.",
    },
    secret: "Bajo el trono de Царь había un diario. La letra es igual a la de la capitana Сова… y está fechado hace cien años.",
    outro: "¡Ya conoces las 33 letras del alfabeto ruso! Ahora puedes presentarte como un ruso de verdad: <ru>Меня зовут {R}</ru>. Лев sonríe: «Ahora te enseñaré a hablar con la gente del otro lado».",
    xp: 120,
  },
];

export const UPCOMING = [
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
