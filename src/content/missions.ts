import { LETTERS } from "./letters";

/**
 * Contenido de la historia. Para agregar una misión basta con escribirla aquí:
 * las pruebas revisan que cada palabra use solo letras que el jugador ya aprendió.
 * {N} = nombre del jugador, {R} = su nombre en ruso.
 */
export type Word = { ru: string; tr: string; es: string; note?: string };
export type Line = { who: string; text: string; code?: string };

/**
 * Conversación: un personaje dice algo y el jugador elige qué responder (en ruso).
 * {R} en una respuesta = nombre del jugador en ruso.
 */
export type Talk = { who: string; ctx: string; says: string; tr: string; es: string; answer: string; wrong: string[]; why: string };

export type Mission = {
  id: string;
  /** 0 = alfabeto; 1 = Expediente 1, etc. */
  level: number;
  title: string;
  subtitle: string;
  letters: string[];
  /** Frases nuevas que enseña la misión (cuando ya no hay letras nuevas). */
  learn?: string[];
  intro: Line[];
  read: string[];
  /** Palabras o frases que el jugador dice en voz alta al micrófono. */
  speak?: string[];
  write: { ru: string; listen?: boolean }[];
  talk?: Talk[];
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
  // Expediente 1 · 1.1
  { ru: "ЗДРАВСТВУЙТЕ", tr: "zdrástvuitie", es: "hola (con respeto)", note: "Para adultos y desconocidos. La primera В casi no se pronuncia." },
  { ru: "ПОКА", tr: "paká", es: "chao", note: "Despedida entre amigos." },
  { ru: "ДО СВИДАНИЯ", tr: "da svidánia", es: "adiós", note: "Despedida con respeto, para adultos." },
  { ru: "ДОБРОЕ УТРО", tr: "dóbraie útra", es: "buenos días" },
  { ru: "ДОБРЫЙ ВЕЧЕР", tr: "dóbryi viéchir", es: "buenas noches", note: "Para saludar al llegar en la noche, no para irse a dormir." },
  { ru: "СПАСИБО", tr: "spasíba", es: "gracias" },
  { ru: "ПОЖАЛУЙСТА", tr: "pazhálsta", es: "por favor / de nada", note: "Sirve para pedir algo y para responder a СПАСИБО. Se dice más corto de lo que se escribe." },
  // 1.2
  { ru: "КТО ТЫ?", tr: "kto ty?", es: "¿quién eres?" },
  { ru: "КАК ТЕБЯ ЗОВУТ?", tr: "kak tibiá zavút?", es: "¿cómo te llamas?", note: "Literalmente: «¿cómo te llaman?». Se responde МЕНЯ ЗОВУТ…" },
  { ru: "ОЧЕНЬ ПРИЯТНО", tr: "óchin' priiátna", es: "mucho gusto" },
  { ru: "ТЫ", tr: "ty", es: "tú" },
  { ru: "ОН", tr: "on", es: "él" },
  { ru: "ОНА", tr: "aná", es: "ella" },
  { ru: "МЫ", tr: "my", es: "nosotros" },
  // 1.3
  { ru: "КАК ДЕЛА?", tr: "kak dielá?", es: "¿cómo estás?", note: "Literalmente: «¿cómo van las cosas?»." },
  { ru: "ХОРОШО", tr: "jarashó", es: "bien" },
  { ru: "ПЛОХО", tr: "plója", es: "mal" },
  { ru: "НОРМАЛЬНО", tr: "narmál'na", es: "más o menos" },
  { ru: "ОТЛИЧНО", tr: "atlíchna", es: "excelente" },
  { ru: "А ТЫ?", tr: "a ty?", es: "¿y tú?" },
  { ru: "ИЗВИНИТЕ", tr: "izviníte", es: "perdón" },
  // Expediente 2 · números, dinero y comida
  { ru: "ОДИН", tr: "adín", es: "uno" },
  { ru: "ДВА", tr: "dva", es: "dos" },
  { ru: "ТРИ", tr: "tri", es: "tres" },
  { ru: "ЧЕТЫРЕ", tr: "chitýrie", es: "cuatro" },
  { ru: "ПЯТЬ", tr: "piat'", es: "cinco", note: "La Ь del final ablanda la Т: suena como «piati» muy corto." },
  { ru: "СКОЛЬКО?", tr: "skól'ka?", es: "¿cuántos?", note: "La О sin fuerza suena casi como A." },
  { ru: "ШЕСТЬ", tr: "shest'", es: "seis" },
  { ru: "СЕМЬ", tr: "siem'", es: "siete" },
  { ru: "ВОСЕМЬ", tr: "vósiem'", es: "ocho" },
  { ru: "ДЕВЯТЬ", tr: "diéviat'", es: "nueve" },
  { ru: "ДЕСЯТЬ", tr: "diésiat'", es: "diez" },
  { ru: "СКОЛЬКО СТОИТ?", tr: "skól'ka stóit?", es: "¿cuánto cuesta?" },
  { ru: "РУБЛЬ", tr: "rubl'", es: "rublo", note: "Con 2, 3 y 4 se dice РУБЛЯ; de 5 a 10, РУБЛЕЙ: ДЕСЯТЬ РУБЛЕЙ." },
  { ru: "ДОРОГО", tr: "dóraga", es: "caro" },
  { ru: "Я ХОЧУ", tr: "ia jachú", es: "yo quiero" },
  { ru: "ДАЙТЕ", tr: "dáitie", es: "deme", note: "Para pedir algo en una tienda. Con ПОЖАЛУЙСТА suena amable." },
  { ru: "ХЛЕБ", tr: "jliep", es: "pan", note: "La Б del final suena como П." },
  { ru: "МОЛОКО", tr: "malakó", es: "leche" },
  { ru: "РЫБА", tr: "rýba", es: "pescado" },
  { ru: "ДЁШЕВО", tr: "dióshiva", es: "barato" },
  { ru: "ВКУСНО", tr: "fkúsna", es: "rico (de sabor)", note: "La В antes de К suena como F." },
  // Expediente 3 · 3.1 la familia
  { ru: "СЕМЬЯ", tr: "siem'iá", es: "familia" },
  { ru: "СЕСТРА", tr: "sistrá", es: "hermana" },
  { ru: "БАБУШКА", tr: "bábushka", es: "abuela" },
  { ru: "ДЕДУШКА", tr: "diédushka", es: "abuelo" },
  { ru: "МОЙ", tr: "moi", es: "mi / mío", note: "Con palabras masculinas: МОЙ БРАТ, МОЙ ДОМ." },
  { ru: "МОЯ", tr: "maiá", es: "mi / mía", note: "Con palabras femeninas, que casi siempre terminan en А o Я: МОЯ СЕСТРА, МОЯ СЕМЬЯ." },
  { ru: "КТО ЭТО?", tr: "kto éta?", es: "¿quién es?" },
  // 3.2 la casa
  { ru: "ГДЕ?", tr: "gdie?", es: "¿dónde?" },
  { ru: "ЗДЕСЬ", tr: "zdies'", es: "aquí" },
  { ru: "ТАМ", tr: "tam", es: "allí" },
  { ru: "КОМНАТА", tr: "kómnata", es: "cuarto" },
  { ru: "КУХНЯ", tr: "kújnia", es: "cocina" },
  { ru: "ДВЕРЬ", tr: "dvier'", es: "puerta" },
  { ru: "ОКНО", tr: "aknó", es: "ventana" },
  // 3.3 los días
  { ru: "КОГДА?", tr: "kagdá?", es: "¿cuándo?" },
  { ru: "СЕГОДНЯ", tr: "sivódnia", es: "hoy", note: "La Г suena como В: «sivódnia»." },
  { ru: "ЗАВТРА", tr: "záftra", es: "mañana", note: "La В antes de Т suena como F." },
  { ru: "ВЧЕРА", tr: "fchirá", es: "ayer" },
  { ru: "ПЯТНИЦА", tr: "piátnitsa", es: "viernes" },
  { ru: "СУББОТА", tr: "subóta", es: "sábado" },
  { ru: "НЕДЕЛЯ", tr: "nidiélia", es: "semana" },
];

export const wordByRu = (ru: string): Word => {
  const w = WORDS.find((x) => x.ru === ru);
  if (!w) throw new Error(`Falta la palabra ${ru} en WORDS`);
  return w;
};

export const MISSIONS: Mission[] = [
  {
    id: "0.1",
    level: 0,
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
    speak: ["КОТ", "МАМА", "ТОМАТ"],
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
    level: 0,
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
    speak: ["НОС", "РУКА", "МЕТРО"],
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
    level: 0,
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
    speak: ["ДОМ", "ВОДА", "ПРИВЕТ"],
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
    level: 0,
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
    speak: ["ЧАЙ", "ШКОЛА", "МЕНЯ ЗОВУТ"],
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
  {
    id: "1.1",
    level: 1,
    title: "Primer contacto",
    subtitle: "Saludar, agradecer y despedirte",
    letters: [],
    learn: ["ЗДРАВСТВУЙТЕ", "ДОБРОЕ УТРО", "ДОБРЫЙ ВЕЧЕР", "СПАСИБО", "ПОЖАЛУЙСТА", "ПОКА", "ДО СВИДАНИЯ"],
    intro: [
      { who: "Лев", text: "Del otro lado del río todavía vive gente, {N}. Se esconden de las Sombras en un refugio bajo la nieve." },
      { who: "Лев", text: "No confían en nadie: las Sombras ya se han disfrazado de personas. Mira lo que hay escrito en la puerta del refugio:", code: "СКАЖИ ЗДРАВСТВУЙТЕ" },
      { who: "Сова", text: "Dice «di <ru>ЗДРАВСТВУЙТЕ</ru>». Es una contraseña. Las Sombras saben leer ruso, pero no saben <b>ser educadas</b>. Quien no saluda bien, no entra." },
      { who: "Лев", text: "En ruso hay dos «hola»: <ru>ПРИВЕТ</ru> para amigos y <ru>ЗДРАВСТВУЙТЕ</ru> para adultos y desconocidos. Hoy aprenderás a saludar, a dar las gracias y a despedirte." },
    ],
    read: ["ПРИВЕТ", "ПОКА", "СПАСИБО", "ДОБРОЕ УТРО", "ДО СВИДАНИЯ", "ПОЖАЛУЙСТА"],
    speak: ["ЗДРАВСТВУЙТЕ", "СПАСИБО", "ДО СВИДАНИЯ"],
    talk: [
      { who: "Вера", ctx: "Una anciana abre la puerta del refugio. Es una adulta que no conoces.", says: "ЗДРАВСТВУЙТЕ.", tr: "zdrástvuitie", es: "hola",
        answer: "ЗДРАВСТВУЙТЕ!", wrong: ["ПРИВЕТ!", "ПОКА!"], why: "Con adultos y desconocidos se dice ЗДРАВСТВУЙТЕ. ПРИВЕТ es para amigos." },
      { who: "Вера", ctx: "Vera te sirve una taza de té caliente.", says: "ВОТ ЧАЙ.", tr: "vot chai", es: "aquí tienes té",
        answer: "СПАСИБО!", wrong: ["ПОЖАЛУЙСТА!", "ДО СВИДАНИЯ!"], why: "Cuando te dan algo, respondes СПАСИБО: «gracias»." },
      { who: "Вера", ctx: "La ayudas a cargar leña y ella te da las gracias.", says: "СПАСИБО!", tr: "spasíba", es: "gracias",
        answer: "ПОЖАЛУЙСТА!", wrong: ["ЗДРАВСТВУЙТЕ!", "ДОБРОЕ УТРО!"], why: "ПОЖАЛУЙСТА sirve para «por favor» y también para «de nada»." },
      { who: "Лев", ctx: "Amanece. Лев se despierta junto al fuego.", says: "ДОБРОЕ УТРО!", tr: "dóbraie útra", es: "buenos días",
        answer: "ДОБРОЕ УТРО!", wrong: ["ДОБРЫЙ ВЕЧЕР!", "ДО СВИДАНИЯ!"], why: "En la mañana: ДОБРОЕ УТРО. En la noche, al llegar: ДОБРЫЙ ВЕЧЕР." },
    ],
    write: [{ ru: "ПОКА" }, { ru: "СПАСИБО" }, { ru: "ПРИВЕТ", listen: true }, { ru: "ПОЖАЛУЙСТА", listen: true }],
    boss: {
      name: "Туман", ru: "Tumán, la Niebla", tagline: "Niebla que roba las palabras",
      readPrompt: "Туман se traga las palabras del refugio. Descifra cada saludo antes de que desaparezca.",
      writePrompt: "Туман borra la contraseña de la puerta. Escríbela de nuevo en ruso:",
      lose: "Туман te envolvió y perdiste el camino. El refugio sigue esperándote.",
    },
    secret: "Vera se quedó mirando tu insignia: «Escuadrón К… Mi abuela decía que ese escuadrón desapareció hace cien años».",
    outro: "Vera te deja entrar al refugio: «<ru>Добрый вечер</ru>, cadete». Adentro, alguien te vigila desde la oscuridad con una linterna.",
    xp: 120,
  },
  {
    id: "1.2",
    level: 1,
    title: "¿Quién eres?",
    subtitle: "Presentarte: Меня зовут…",
    letters: [],
    learn: ["КТО ТЫ?", "КАК ТЕБЯ ЗОВУТ?", "ОЧЕНЬ ПРИЯТНО", "ТЫ", "ОН", "ОНА", "МЫ"],
    intro: [
      { who: "¿?", text: "¡No te muevas! Aquí las Sombras se hacen pasar por personas. Contesta:", code: "КТО ТЫ?" },
      { who: "Лев", text: "Tranquilo, {N}. Es <ru>Ника</ru> (Nika), la exploradora del refugio. Anoche entró una Sombra con la cara de su hermano." },
      { who: "Лев", text: "Las Sombras copian caras, pero no saben presentarse. Respóndele en ruso y te creerá." },
      { who: "Ника", text: "Si eres humano, dime cómo te llamas. En ruso: <ru>Как тебя зовут?</ru>" },
    ],
    read: ["КТО ТЫ?", "ТЫ", "ОНА", "МЫ", "ОЧЕНЬ ПРИЯТНО", "КАК ТЕБЯ ЗОВУТ?"],
    speak: ["КТО ТЫ?", "ОЧЕНЬ ПРИЯТНО", "КАК ТЕБЯ ЗОВУТ?"],
    talk: [
      { who: "Ника", ctx: "Ника te apunta con la linterna.", says: "КТО ТЫ?", tr: "kto ty?", es: "¿quién eres?",
        answer: "Я {R}.", wrong: ["Я ВРАГ.", "ПОКА!"], why: "Te preguntó «¿quién eres?». «Я {R}» significa «soy {R}». ¡En ruso no hace falta decir «soy»!" },
      { who: "Ника", ctx: "Ника todavía no está segura.", says: "КАК ТЕБЯ ЗОВУТ?", tr: "kak tibiá zavút?", es: "¿cómo te llamas?",
        answer: "МЕНЯ ЗОВУТ {R}.", wrong: ["ДОБРОЕ УТРО!", "СПАСИБО!"], why: "A «КАК ТЕБЯ ЗОВУТ?» se responde «МЕНЯ ЗОВУТ…»: «me llamo…»." },
      { who: "Ника", ctx: "Ника baja la linterna y se presenta.", says: "МЕНЯ ЗОВУТ НИКА.", tr: "miniá zavút Nika", es: "me llamo Nika",
        answer: "ОЧЕНЬ ПРИЯТНО!", wrong: ["ДО СВИДАНИЯ!", "КТО ТЫ?"], why: "Cuando alguien se presenta, dices ОЧЕНЬ ПРИЯТНО: «mucho gusto»." },
      { who: "Ника", ctx: "Ника señala a Лев con desconfianza.", says: "А ОН КТО?", tr: "a on kto?", es: "¿y él quién es?",
        answer: "ОН ДРУГ.", wrong: ["ОН ВРАГ.", "ОНА ДРУГ."], why: "ОН = «él» y ДРУГ = «amigo». ОНА sería «ella»." },
    ],
    write: [{ ru: "ТЫ" }, { ru: "ОН" }, { ru: "ОНА", listen: true }, { ru: "МЫ", listen: true }],
    boss: {
      name: "Двойник", ru: "Dvóinik, el Doble", tagline: "Sombra que copia caras",
      readPrompt: "Двойник tiene tu misma cara y le habla en ruso a Ника para confundirla. Descifra sus palabras.",
      writePrompt: "Ника no sabe cuál de los dos es el verdadero. Escríbele en ruso:",
      lose: "Двойник escapó con tu cara puesta. Ника todavía duda de ti.",
    },
    secret: "Ника te muestra un papel viejo de su bisabuela: «Un día llegará un cadete que no sabe ni una letra. En ruso se llamará <ru>{R}</ru>».",
    outro: "Ника sonríe por primera vez: «<ru>Очень приятно</ru>, {R}». Ya confía en ti. Pero en el refugio todos están cansados… y Тень anda cerca.",
    xp: 140,
  },
  {
    id: "1.3",
    level: 1,
    title: "¿Cómo estás?",
    subtitle: "Preguntar y responder: Как дела?",
    letters: [],
    learn: ["КАК ДЕЛА?", "ХОРОШО", "ОТЛИЧНО", "НОРМАЛЬНО", "ПЛОХО", "А ТЫ?", "ИЗВИНИТЕ"],
    intro: [
      { who: "Сова", text: "{N}, buen trabajo. Ahora todo el refugio quiere conocerte. Aquí la gente no pregunta «¿cómo estás?»: pregunta <ru>Как дела?</ru>, «¿cómo van las cosas?»." },
      { who: "Ника", text: "Esta mañana encontramos esto escrito en la nieve, frente a la puerta:", code: "Я ЗДЕСЬ" },
      { who: "Лев", text: "Es la letra de <ru>Тень</ru>. Dice «estoy aquí». Volvió por ti, {N}." },
      { who: "Сова", text: "Aprende a decir cómo estás y a pedir perdón. Y prepárate: esta noche Тень vendrá al refugio." },
    ],
    read: ["КАК ДЕЛА?", "ХОРОШО", "ПЛОХО", "ОТЛИЧНО", "А ТЫ?", "ИЗВИНИТЕ"],
    speak: ["КАК ДЕЛА?", "ХОРОШО", "ОТЛИЧНО"],
    talk: [
      { who: "Вера", ctx: "Llegas al refugio sano y salvo. Estás feliz.", says: "КАК ДЕЛА?", tr: "kak dielá?", es: "¿cómo estás?",
        answer: "ОТЛИЧНО!", wrong: ["ПЛОХО.", "ИЗВИНИТЕ!"], why: "Estás feliz: ОТЛИЧНО, «excelente». ПЛОХО sería «mal»." },
      { who: "Ника", ctx: "Estás bien y quieres preguntarle a Ника cómo está ella.", says: "ПРИВЕТ! КАК ДЕЛА?", tr: "priviét! kak dielá?", es: "¡hola! ¿cómo estás?",
        answer: "ХОРОШО. А ТЫ?", wrong: ["ХОРОШО. ПОКА!", "ЗДРАВСТВУЙТЕ."], why: "ХОРОШО = «bien» y А ТЫ? = «¿y tú?». Así la conversación sigue." },
      { who: "Лев", ctx: "Sin querer pisas el pie de Лев.", says: "АЙ!", tr: "ai!", es: "¡ay!",
        answer: "ИЗВИНИТЕ!", wrong: ["ОТЛИЧНО!", "ПРИВЕТ!"], why: "Para pedir perdón: ИЗВИНИТЕ." },
      { who: "Лев", ctx: "Es de noche. Лев se va a hacer la guardia.", says: "ПОКА, ДРУГ!", tr: "paká, druk!", es: "¡chao, amigo!",
        answer: "ПОКА!", wrong: ["ДОБРОЕ УТРО!", "ЗДРАВСТВУЙТЕ!"], why: "Entre amigos, para despedirse: ПОКА." },
    ],
    write: [{ ru: "ХОРОШО" }, { ru: "ПЛОХО" }, { ru: "ОТЛИЧНО", listen: true }, { ru: "НОРМАЛЬНО", listen: true }],
    boss: {
      name: "Тень", ru: "Ten', la Sombra", tagline: "Ha vuelto por ti",
      readPrompt: "Тень grita en ruso alrededor del refugio. Descifra cada palabra para mantener encendida la hoguera.",
      writePrompt: "La hoguera se apaga. Escribe la palabra en ruso para avivarla:",
      lose: "Тень apagó la hoguera y se escondió en la nieve. El refugio aguanta hasta el amanecer.",
    },
    secret: "Antes de huir, Тень te llamó por tu nombre en ruso: «<ru>{R}</ru>… ¿de verdad no te acuerdas de mí?».",
    outro: "¡Expediente 1 resuelto! Ya sabes saludar, presentarte y preguntar cómo están. Лев mira hacia el sur: «Mañana vamos al mercado de la frontera. Allí tendrás que contar… y regatear».",
    xp: 160,
  },
  {
    id: "2.1",
    level: 2,
    title: "Cuenta conmigo",
    subtitle: "Los números del 1 al 5",
    letters: [],
    learn: ["ОДИН", "ДВА", "ТРИ", "ЧЕТЫРЕ", "ПЯТЬ", "СКОЛЬКО?"],
    intro: [
      { who: "Сова", text: "Llegamos al mercado de la frontera, {N}. Aquí se cambia de todo: comida, abrigo… y secretos. Te presento a Мира, nuestra intendente." },
      { who: "Мира", text: "Hola, {N}. Aquí nadie regala nada: si no sabes contar, te roban. Mira lo que dejaron anoche en mi puesto:", code: "СКОЛЬКО?" },
      { who: "Лев", text: "«¿Cuántos?». Es la marca de las Sombras. Alguien en el mercado les cuenta cuántos somos." },
      { who: "Мира", text: "Entonces cuenta mejor que ellos. Empieza del uno al cinco." },
    ],
    read: ["ОДИН", "ДВА", "ТРИ", "ЧЕТЫРЕ", "ПЯТЬ", "СКОЛЬКО?"],
    speak: ["ОДИН", "ТРИ", "ПЯТЬ"],
    talk: [
      { who: "Мира", ctx: "Мира señala tres cajas de provisiones.", says: "СКОЛЬКО?", tr: "skól'ka?", es: "¿cuántos?",
        answer: "ТРИ.", wrong: ["ДВА.", "ПЯТЬ."], why: "Hay tres cajas: ТРИ." },
      { who: "Мира", ctx: "Ahora te muestra un solo saco de harina.", says: "А ЗДЕСЬ?", tr: "a zdies'?", es: "¿y aquí?",
        answer: "ОДИН.", wrong: ["ЧЕТЫРЕ.", "ТРИ."], why: "Un solo saco: ОДИН." },
      { who: "Лев", ctx: "Лев levanta la mano con los cinco dedos abiertos.", says: "СКОЛЬКО?", tr: "skól'ka?", es: "¿cuántos?",
        answer: "ПЯТЬ!", wrong: ["ДВА!", "ОДИН!"], why: "Cinco dedos: ПЯТЬ." },
      { who: "Мира", ctx: "Мира cuenta en voz alta y se detiene. ¿Qué número sigue?", says: "ОДИН, ДВА, ТРИ…", tr: "adín, dva, tri…", es: "uno, dos, tres…",
        answer: "ЧЕТЫРЕ!", wrong: ["ДВА!", "ПЯТЬ!"], why: "Después de ТРИ viene ЧЕТЫРЕ." },
    ],
    write: [{ ru: "ОДИН" }, { ru: "ДВА" }, { ru: "ТРИ", listen: true }, { ru: "ПЯТЬ", listen: true }],
    boss: {
      name: "Шёпот", ru: "Shiópat, el Susurro", tagline: "Te cambia los números al oído",
      readPrompt: "Шёпот susurra números falsos para confundirte. Descifra cada palabra de verdad.",
      writePrompt: "Шёпот borra la cuenta de Мира. Escríbela otra vez en ruso:",
      lose: "Шёпот se perdió entre la gente del mercado. Мира tendrá que contar todo otra vez.",
    },
    secret: "En el libro de cuentas de Мира falta una página. Solo queda un número, <ru>ПЯТЬ</ru>… y la firma de alguien del escuadrón.",
    outro: "Ya cuentas hasta cinco. Мира te mira de reojo: «Nada mal, {R}. Mañana aprendes a pagar sin que te estafen».",
    xp: 180,
  },
  {
    id: "2.2",
    level: 2,
    title: "¿Cuánto cuesta?",
    subtitle: "Del 6 al 10, rublos y precios",
    letters: [],
    learn: ["ШЕСТЬ", "СЕМЬ", "ВОСЕМЬ", "ДЕВЯТЬ", "ДЕСЯТЬ", "СКОЛЬКО СТОИТ?", "РУБЛЬ", "ДОРОГО"],
    intro: [
      { who: "Мира", text: "En el mercado se paga en rublos: <ru>рубль</ru>. Y aquí todos te quieren cobrar el doble, {N}." },
      { who: "Лев", text: "Anoche alguien pagó con monedas falsas. Todas tenían esto grabado:", code: "ДЕВЯТЬ" },
      { who: "Мира", text: "Nueve… Las Sombras eran nueve cuando cruzaron el río, hace cien años." },
      { who: "Сова", text: "Aprende a contar hasta diez y a preguntar el precio. Que no te engañen." },
    ],
    read: ["ШЕСТЬ", "СЕМЬ", "ВОСЕМЬ", "ДЕСЯТЬ", "СКОЛЬКО СТОИТ?", "ДОРОГО"],
    speak: ["СЕМЬ", "ДЕСЯТЬ", "СКОЛЬКО СТОИТ?"],
    talk: [
      { who: "Торговка", ctx: "Ves un gorro de piel en un puesto. Quieres saber el precio.", says: "ЗДРАВСТВУЙТЕ!", tr: "zdrástvuitie!", es: "¡buenos días!",
        answer: "СКОЛЬКО СТОИТ?", wrong: ["КАК ДЕЛА?", "ДО СВИДАНИЯ!"], why: "Para preguntar el precio: СКОЛЬКО СТОИТ?" },
      { who: "Торговка", ctx: "¡Diez rublos por un gorro viejo! Мира te susurra: «es carísimo».", says: "ДЕСЯТЬ РУБЛЕЙ.", tr: "diésiat' rubliéi", es: "diez rublos",
        answer: "ДОРОГО!", wrong: ["ОТЛИЧНО!", "СПАСИБО!"], why: "Para decir «caro»: ДОРОГО. Así empieza el regateo." },
      { who: "Торговка", ctx: "La vendedora pregunta cuánto ofreces. Quieres pagar siete.", says: "СКОЛЬКО?", tr: "skól'ka?", es: "¿cuánto?",
        answer: "СЕМЬ.", wrong: ["ШЕСТЬ.", "ДЕВЯТЬ."], why: "Siete es СЕМЬ." },
      { who: "Мира", ctx: "Мира cuenta sus monedas y se detiene. ¿Qué número sigue?", says: "ШЕСТЬ, СЕМЬ, ВОСЕМЬ…", tr: "shest', siem', vósiem'…", es: "seis, siete, ocho…",
        answer: "ДЕВЯТЬ!", wrong: ["ПЯТЬ!", "ДЕСЯТЬ!"], why: "Después de ВОСЕМЬ viene ДЕВЯТЬ, y luego ДЕСЯТЬ." },
    ],
    write: [{ ru: "СЕМЬ" }, { ru: "ШЕСТЬ" }, { ru: "ДЕСЯТЬ", listen: true }, { ru: "РУБЛЬ", listen: true }],
    boss: {
      name: "Фальшивка", ru: "Fal'shífka, la Falsificadora", tagline: "Paga con monedas falsas",
      readPrompt: "Фальшивка lanza monedas con palabras grabadas. Descifra cuáles son de verdad.",
      writePrompt: "Para atraparla, escribe en ruso lo que dice la moneda:",
      lose: "Фальшивка escapó con la bolsa de Мира. Mañana habrá que recuperarla.",
    },
    secret: "Las monedas falsas llevan grabado el escudo del escuadrón К. Alguien de adentro las fabrica.",
    outro: "Ya cuentas hasta diez y sabes preguntar el precio. Мира guarda una moneda falsa en el bolsillo: «Esta noche seguimos el rastro, {R}. Pero antes… hay que comer».",
    xp: 200,
  },
  {
    id: "2.3",
    level: 2,
    title: "El trato",
    subtitle: "Pedir comida y regatear",
    letters: [],
    learn: ["Я ХОЧУ", "ДАЙТЕ", "ХЛЕБ", "МОЛОКО", "РЫБА", "ДЁШЕВО", "ВКУСНО"],
    intro: [
      { who: "Мира", text: "{N}, el escuadrón lleva días comiendo nieve. Hoy compras tú, y sin pagar de más." },
      { who: "Лев", text: "Ojo: la vendedora del pescado lleva una cinta negra en la muñeca, como las Sombras. En su puesto hay un cartel:", code: "ДЁШЕВО" },
      { who: "Мира", text: "«Barato». Demasiado barato… Pide lo que necesitamos: <ru>хлеб</ru>, <ru>молоко</ru>, <ru>рыба</ru>. Y escucha bien lo que dice." },
    ],
    read: ["Я ХОЧУ", "ХЛЕБ", "МОЛОКО", "РЫБА", "ДЁШЕВО", "ВКУСНО"],
    speak: ["ХЛЕБ", "МОЛОКО", "Я ХОЧУ"],
    talk: [
      { who: "Торговка", ctx: "Tienes hambre y en el puesto hay pan recién hecho.", says: "ЧТО ВЫ ХОТИТЕ?", tr: "shto vy jatítie?", es: "¿qué desea?",
        answer: "Я ХОЧУ ХЛЕБ.", wrong: ["МЕНЯ ЗОВУТ ХЛЕБ.", "ДО СВИДАНИЯ."], why: "Я ХОЧУ ХЛЕБ = «quiero pan»." },
      { who: "Торговка", ctx: "Te da el pan. También quieres leche: pídela con cortesía.", says: "ВОТ ХЛЕБ.", tr: "vot jliep", es: "aquí está el pan",
        answer: "ДАЙТЕ МОЛОКО, ПОЖАЛУЙСТА.", wrong: ["ДАЙТЕ МОЛОКО, ПОКА.", "МОЛОКО ДОРОГО."], why: "ДАЙТЕ = «deme», y con ПОЖАЛУЙСТА suena amable." },
      { who: "Торговка", ctx: "Preguntas por el pescado. Cuesta solo dos rublos: ¡muy poco!", says: "ДВА РУБЛЯ.", tr: "dva rubliá", es: "dos rublos",
        answer: "ДЁШЕВО!", wrong: ["ДОРОГО!", "ПЛОХО!"], why: "Dos rublos es poco: ДЁШЕВО, «barato». ДОРОГО sería «caro»." },
      { who: "Мира", ctx: "En la noche Мира prepara sopa de pescado. La pruebas.", says: "НУ КАК?", tr: "nu kak?", es: "¿y qué tal?",
        answer: "ВКУСНО!", wrong: ["ДОРОГО!", "ИЗВИНИТЕ!"], why: "ВКУСНО = «rico, delicioso»." },
    ],
    write: [{ ru: "ХЛЕБ" }, { ru: "РЫБА" }, { ru: "МОЛОКО", listen: true }, { ru: "ВКУСНО", listen: true }],
    boss: {
      name: "Голод", ru: "Gólat, el Hambre", tagline: "Se come las provisiones",
      readPrompt: "Голод se lleva la comida del escuadrón. Descifra cada palabra para salvarla.",
      writePrompt: "Голод se acerca a la olla. Escribe en ruso para espantarlo:",
      lose: "Голод se llevó medio pan. Esta noche se come poco en el refugio.",
    },
    secret: "Dentro del pan encuentras una nota: «<ru>{R}</ru>, el traidor está en tu escuadrón. Fíjate quién nunca come con ustedes».",
    outro: "¡Expediente 2 resuelto! Ya sabes contar, pagar y pedir comida. Pero la nota del pan no te deja dormir: ¿quién del escuadrón es el traidor?",
    xp: 220,
  },
  {
    id: "3.1",
    level: 3,
    title: "La foto",
    subtitle: "La familia",
    letters: [],
    learn: ["СЕМЬЯ", "СЕСТРА", "БАБУШКА", "ДЕДУШКА", "МОЙ", "МОЯ", "КТО ЭТО?"],
    intro: [
      { who: "Ника", text: "{N}, ven. A Лев se le cayó esto de la mochila. Es otra foto vieja… pero esta vez es una familia." },
      { who: "Мира", text: "Atrás tiene algo escrito a mano:", code: "ЭТО МОЯ СЕМЬЯ" },
      { who: "Ника", text: "«Esta es mi familia». Y fíjate: Лев nunca come con nosotros… como decía la nota del pan." },
      { who: "Сова", text: "No acusemos a nadie todavía. Primero aprende a nombrar a la familia: quién es quién en esa foto." },
    ],
    read: ["СЕМЬЯ", "СЕСТРА", "БАБУШКА", "ДЕДУШКА", "МОЯ", "КТО ЭТО?"],
    speak: ["СЕМЬЯ", "СЕСТРА", "БАБУШКА"],
    talk: [
      { who: "Ника", ctx: "Ника señala a la señora mayor de la foto.", says: "КТО ЭТО?", tr: "kto éta?", es: "¿quién es?",
        answer: "ЭТО БАБУШКА.", wrong: ["ЭТО СЕСТРА.", "ЭТО ПАПА."], why: "Una señora mayor de la familia: БАБУШКА, «abuela»." },
      { who: "Ника", ctx: "Ahora señala a una niña pequeña, al lado de la mamá.", says: "А ЭТО?", tr: "a éta?", es: "¿y esta?",
        answer: "ЭТО СЕСТРА.", wrong: ["ЭТО ДЕДУШКА.", "ЭТО БРАТ."], why: "Una niña de la familia: СЕСТРА, «hermana». БРАТ es «hermano»." },
      { who: "Мира", ctx: "Uno de los niños de la foto tiene tu cara. Мира te pregunta si es tu familia. Sientes que sí.", says: "ЭТО ТВОЯ СЕМЬЯ?", tr: "éta tvaiá siem'iá?", es: "¿es tu familia?",
        answer: "ДА, МОЯ СЕМЬЯ.", wrong: ["ДА, МОЙ СЕМЬЯ.", "НЕТ, СПАСИБО."], why: "СЕМЬЯ es femenina, por eso se dice МОЯ. МОЙ va con palabras masculinas: МОЙ БРАТ." },
      { who: "Лев", ctx: "Лев vuelve de la patrulla y se pone pálido. Señala a un niño mayor que lleva una máscara en la mano.", says: "А ОН КТО?", tr: "a on kto?", es: "¿y él quién es?",
        answer: "ЭТО БРАТ.", wrong: ["ЭТО БАБУШКА.", "ЭТО СЕСТРА."], why: "Un niño de la familia: БРАТ, «hermano»." },
    ],
    write: [{ ru: "СЕСТРА" }, { ru: "СЕМЬЯ" }, { ru: "БАБУШКА", listen: true }, { ru: "ДЕДУШКА", listen: true }],
    boss: {
      name: "Забвение", ru: "Zabviénie, el Olvido", tagline: "Borra las caras de las fotos",
      readPrompt: "Забвение borra las caras de la foto una por una. Descifra cada palabra para recordarlas.",
      writePrompt: "Para que no se borre del todo, escribe en ruso quién es:",
      lose: "Забвение borró una cara de la foto. Ника guardó lo que quedó.",
    },
    secret: "Uno de los niños de la foto tiene tu cara. El otro, un poco mayor, lleva en la mano una máscara negra… la máscara de Тень.",
    outro: "Ya sabes nombrar a la familia. Detrás de la foto hay una dirección borrosa: una casa al otro lado del mercado.",
    xp: 240,
  },
  {
    id: "3.2",
    level: 3,
    title: "La casa vacía",
    subtitle: "La casa: dónde está cada cosa",
    letters: [],
    learn: ["ГДЕ?", "ЗДЕСЬ", "ТАМ", "КОМНАТА", "КУХНЯ", "ДВЕРЬ", "ОКНО"],
    intro: [
      { who: "Сова", text: "La dirección de la foto lleva a una casa abandonada, al otro lado del mercado. Vamos todos." },
      { who: "Лев", text: "Yo no entro. Los espero afuera." },
      { who: "Ника", text: "En la puerta alguien escribió con carbón:", code: "ГДЕ ТЫ?" },
      { who: "Мира", text: "«¿Dónde estás?»… Busquen en toda la casa, {N}. Y no se separen." },
    ],
    read: ["ГДЕ?", "ЗДЕСЬ", "ТАМ", "КОМНАТА", "КУХНЯ", "ОКНО"],
    speak: ["ГДЕ?", "КУХНЯ", "ОКНО"],
    talk: [
      { who: "Ника", ctx: "Ника te llama desde el pasillo. Tú estás en un cuarto.", says: "ГДЕ ТЫ?", tr: "gdie ty?", es: "¿dónde estás?",
        answer: "Я ЗДЕСЬ!", wrong: ["Я ХОЧУ!", "ТЫ ТАМ!"], why: "Я ЗДЕСЬ = «estoy aquí». En ruso no hace falta decir «estoy»." },
      { who: "Мира", ctx: "Мира busca la cocina. Tú la ves al fondo, lejos de ustedes.", says: "ГДЕ КУХНЯ?", tr: "gdie kújnia?", es: "¿dónde está la cocina?",
        answer: "ТАМ.", wrong: ["ЗДЕСЬ.", "ДА."], why: "Lejos: ТАМ, «allí». ЗДЕСЬ es «aquí»." },
      { who: "Ника", ctx: "Ника señala un hueco roto en la pared, por donde entran la luz y la nieve.", says: "ЧТО ЭТО?", tr: "shto éta?", es: "¿qué es esto?",
        answer: "ЭТО ОКНО.", wrong: ["ЭТО ДВЕРЬ.", "ЭТО КУХНЯ."], why: "Por donde entran la luz y la nieve: ОКНО, «ventana»." },
      { who: "Сова", ctx: "Сова encuentra una puerta con candado. Por la rendija ves una cama.", says: "А ТАМ?", tr: "a tam?", es: "¿y allí?",
        answer: "ТАМ КОМНАТА.", wrong: ["ТАМ КУХНЯ.", "ТАМ ХЛЕБ."], why: "Donde hay una cama: КОМНАТА, «cuarto»." },
    ],
    write: [{ ru: "ОКНО" }, { ru: "ДВЕРЬ" }, { ru: "КУХНЯ", listen: true }, { ru: "КОМНАТА", listen: true }],
    boss: {
      name: "Скрип", ru: "Skrip, el Crujido", tagline: "La casa misma te ataca",
      readPrompt: "Las paredes crujen y las puertas se cierran solas. Descifra cada palabra para encontrar la salida.",
      writePrompt: "Скрип tapa la salida. Escribe en ruso por dónde escapar:",
      lose: "Скрип cerró la puerta de golpe. Salieron por la ventana, con un buen susto.",
    },
    secret: "En la cocina hay un calendario de hace cien años. Un día está marcado en rojo: <ru>СУББОТА</ru>.",
    outro: "Ya sabes moverte por una casa en ruso. Al salir, ves a Лев mirando la ventana del segundo piso… como si alguien lo saludara desde adentro.",
    xp: 260,
  },
  {
    id: "3.3",
    level: 3,
    title: "El día marcado",
    subtitle: "Los días: hoy, mañana, ayer",
    letters: [],
    learn: ["КОГДА?", "СЕГОДНЯ", "ЗАВТРА", "ВЧЕРА", "ПЯТНИЦА", "СУББОТА", "НЕДЕЛЯ"],
    intro: [
      { who: "Мира", text: "{N}, anoche vi a Лев salir solo del refugio. Volvió al amanecer, sin decir nada." },
      { who: "Сова", text: "Y el calendario de la casa marcaba un día en rojo:", code: "СУББОТА" },
      { who: "Ника", text: "Sábado… ¡es hoy! Las Sombras atacan esta noche." },
      { who: "Сова", text: "Aprende los días, {N}. Esta noche seguimos a Лев, sin que nos vea." },
    ],
    read: ["КОГДА?", "СЕГОДНЯ", "ЗАВТРА", "ВЧЕРА", "ПЯТНИЦА", "СУББОТА"],
    speak: ["СЕГОДНЯ", "ЗАВТРА", "ПЯТНИЦА"],
    talk: [
      { who: "Мира", ctx: "Мира quiere saber cuándo viste a Лев salir solo. Fue ayer.", says: "КОГДА?", tr: "kagdá?", es: "¿cuándo?",
        answer: "ВЧЕРА.", wrong: ["ЗАВТРА.", "СЕГОДНЯ."], why: "Ya pasó: ВЧЕРА, «ayer». ЗАВТРА es «mañana»." },
      { who: "Ника", ctx: "Ника está confundida y cree que hoy es viernes. Pero hoy es sábado.", says: "СЕГОДНЯ ПЯТНИЦА?", tr: "sivódnia piátnitsa?", es: "¿hoy es viernes?",
        answer: "НЕТ, СУББОТА.", wrong: ["ДА, ПЯТНИЦА.", "НЕТ, ВЧЕРА."], why: "Hoy es sábado: НЕТ, СУББОТА. ПЯТНИЦА es «viernes»." },
      { who: "Сова", ctx: "Сова pregunta cuándo es el ataque. El día marcado es hoy.", says: "КОГДА АТАКА?", tr: "kagdá atáka?", es: "¿cuándo es el ataque?",
        answer: "СЕГОДНЯ!", wrong: ["ВЧЕРА!", "ЗАВТРА!"], why: "El día marcado es hoy: СЕГОДНЯ." },
      { who: "Тень", ctx: "En la noche, una figura con máscara sale de la niebla y te habla en ruso.", says: "ПРИВЕТ, БРАТ.", tr: "priviét, brat", es: "hola, hermano",
        answer: "КТО ТЫ?", wrong: ["СПАСИБО.", "ВКУСНО!"], why: "Para preguntar «¿quién eres?»: КТО ТЫ?" },
    ],
    write: [{ ru: "ВЧЕРА" }, { ru: "ЗАВТРА" }, { ru: "СЕГОДНЯ", listen: true }, { ru: "СУББОТА", listen: true }],
    boss: {
      name: "Капюшон", ru: "Kapiushón, el Encapuchado", tagline: "Se reúne con las Sombras de noche",
      readPrompt: "El Encapuchado les pasa mensajes a las Sombras. Descifra cada palabra antes de que lleguen a ellas.",
      writePrompt: "Escribe en ruso el mensaje verdadero para avisarle al escuadrón:",
      lose: "El Encapuchado se perdió en la niebla. Pero dejó huellas en la nieve.",
    },
    secret: "Bajo la capucha estaba Лев. «No soy un traidor, {N}. Тень es tu hermano. Le prometí a tu familia que algún día los traería de vuelta… a los dos».",
    outro: "¡Expediente 3 resuelto! Ya sabes hablar de la familia, de la casa y de los días. Тень es tu hermano, y Лев lo sabía desde el principio. ¿En quién vas a confiar ahora?",
    xp: 280,
  },
];

export const UPCOMING = [
  { id: "4", title: "Expediente 4 · Mi hermano, la Sombra", subtitle: "El cuerpo, la ropa y el clima", icon: "?" },
];

/** Nombre de cada nivel en el mapa. */
export const LEVELS: Record<number, string> = {
  0: "Nivel 0 · El alfabeto",
  1: "Expediente 1 · Más allá del río",
  2: "Expediente 2 · El mercado de la frontera",
  3: "Expediente 3 · El traidor",
};

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

/** Texto para mostrar o pronunciar una respuesta de conversación: {R} es el nombre en ruso. */
export const fillName = (s: string, ru: string) => s.replaceAll("{R}", ru);

/** Letra o frase que identifica una misión en el mapa. */
export const missionIcon = (m: Mission) => m.letters[0] ?? (m.learn?.[0] ?? m.read[0])[0];

/** Palabras que enseña una misión: las de leer, escribir y los ejemplos de sus letras. */
export function missionWords(m: Mission): Word[] {
  const ru = new Set([...(m.learn ?? []), ...m.read, ...m.write.map((w) => w.ru), ...m.letters.map((l) => LETTERS[l].example)]);
  return WORDS.filter((w) => ru.has(w.ru));
}
