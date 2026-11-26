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
];

export const UPCOMING = [
  { id: "2", title: "Expediente 2 · El mercado de la frontera", subtitle: "Números, dinero y comida", icon: "₽" },
];

/** Nombre de cada nivel en el mapa. */
export const LEVELS: Record<number, string> = {
  0: "Nivel 0 · El alfabeto",
  1: "Expediente 1 · Más allá del río",
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
