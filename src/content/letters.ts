export type Letter = {
  ch: string;
  low: string;
  /** Cómo suena, escrito para alguien que habla español. */
  sound: string;
  tip: string;
  /** Palabra de ejemplo (debe existir en WORDS). */
  example: string;
  /** Teclas latinas que la escriben en un teclado de computador. */
  latin: string[];
  /** Signos que no suenan solos (Ь, Ъ): «sound» es su nombre. */
  silent?: boolean;
};

/** Cómo se explica el sonido de una letra en una frase. */
export const describeLetter = (L: Letter) => (L.silent ? `${L.ch} es el ${L.sound}: no suena sola` : `${L.ch} suena «${L.sound}»`);

export const ALPHABET = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split("");

export const LETTERS: Record<string, Letter> = {
  А: { ch: "А", low: "а", sound: "a", tip: "Igual que nuestra A. Suena «a» como en casa.", example: "МАМА", latin: ["a"] },
  К: { ch: "К", low: "к", sound: "k", tip: "Igual que la K. Suena «k» como en kilo.", example: "КОТ", latin: ["k"] },
  М: { ch: "М", low: "м", sound: "m", tip: "Igual que la M. Suena «m» como en mesa.", example: "МАМА", latin: ["m"] },
  О: { ch: "О", low: "о", sound: "o", tip: "Igual que la O. Cuando la sílaba no lleva la fuerza, suena casi como «a».", example: "АТОМ", latin: ["o"] },
  Т: { ch: "Т", low: "т", sound: "t", tip: "Igual que la T. Suena «t» como en tomate.", example: "ТОМАТ", latin: ["t"] },
  Е: { ch: "Е", low: "е", sound: "ie", tip: "¡Trampa! Se ve como E, pero suena «ie», como en pie.", example: "ТЕМА", latin: ["e"] },
  Р: { ch: "Р", low: "р", sound: "r", tip: "Falsa amiga: parece P, pero suena «r», como en pero o rata.", example: "РУКА", latin: ["r"] },
  Н: { ch: "Н", low: "н", sound: "n", tip: "Falsa amiga: parece H, pero suena «n», como en nube.", example: "НОС", latin: ["n"] },
  В: { ch: "В", low: "в", sound: "v", tip: "Falsa amiga: parece B, pero suena «v» apoyando los dientes en el labio, como en inglés.", example: "ВОР", latin: ["v"] },
  С: { ch: "С", low: "с", sound: "s", tip: "Falsa amiga: parece C, pero siempre suena «s», como en sol.", example: "СОК", latin: ["s", "c"] },
  У: { ch: "У", low: "у", sound: "u", tip: "Falsa amiga: parece Y, pero suena «u», como en uva.", example: "МУХА", latin: ["u", "y"] },
  Х: { ch: "Х", low: "х", sound: "j", tip: "Falsa amiga: parece X, pero suena «j», como en jota.", example: "ХОР", latin: ["j", "h", "x"] },
  Б: { ch: "Б", low: "б", sound: "b", tip: "Nueva: parece un 6. Suena «b» como en barco.", example: "БРАТ", latin: ["b"] },
  Г: { ch: "Г", low: "г", sound: "g", tip: "Parece una horca. Suena siempre «g» suave, como en gato (nunca como en gente).", example: "ГОРА", latin: ["g"] },
  Д: { ch: "Д", low: "д", sound: "d", tip: "Parece una casita con patas. Suena «d» como en dedo.", example: "ДОМ", latin: ["d"] },
  З: { ch: "З", low: "з", sound: "z", tip: "Parece un 3. Suena «z» zumbando como una abeja: zzz. No es la z de España.", example: "ЗВЕЗДА", latin: ["z"] },
  И: { ch: "И", low: "и", sound: "i", tip: "Parece una N al revés. Suena «i» como en isla.", example: "ИГРА", latin: ["i"] },
  Й: { ch: "Й", low: "й", sound: "i corta", tip: "Es la И con gorrito. Suena «i» cortita, como la y de rey.", example: "ГЕРОЙ", latin: [] },
  Л: { ch: "Л", low: "л", sound: "l", tip: "Parece una tienda de campaña. Suena «l» como en lobo.", example: "ЛУНА", latin: ["l"] },
  П: { ch: "П", low: "п", sound: "p", tip: "Parece una puerta. Suena «p» como en papá.", example: "ПАПА", latin: ["p"] },
  Ф: { ch: "Ф", low: "ф", sound: "f", tip: "Un círculo atravesado por una línea. Suena «f» como en foco.", example: "ФОТО", latin: ["f"] },
  Ж: { ch: "Ж", low: "ж", sound: "zh", tip: "Parece un escarabajo. Suena como «sh» pero vibrando la garganta, como la ll de los argentinos en «yo» (sho).", example: "ЖУК", latin: [] },
  Ц: { ch: "Ц", low: "ц", sound: "ts", tip: "Una U cuadrada con colita. Suena «ts», como en tsunami.", example: "ЦИРК", latin: [] },
  Ч: { ch: "Ч", low: "ч", sound: "ch", tip: "Parece un 4. Suena «ch» como en chocolate.", example: "ЧАЙ", latin: [] },
  Ш: { ch: "Ш", low: "ш", sound: "sh", tip: "Parece un tridente. Suena «sh», como cuando pides silencio: shhh.", example: "ШКОЛА", latin: [] },
  Щ: { ch: "Щ", low: "щ", sound: "shch", tip: "Es la Ш con colita. Suena «sh» larga y suave, como si sonrieras: shsh.", example: "ЩИТ", latin: [] },
  Ы: { ch: "Ы", low: "ы", sound: "y", tip: "Una «i» grave: dila con la lengua hacia atrás, como si te dieran un golpe suave en la barriga. En la pronunciación la escribimos «y».", example: "СЫР", latin: [] },
  Ь: { ch: "Ь", low: "ь", sound: "signo suave", silent: true, tip: "No suena sola: ablanda la letra de antes, como una «i» chiquitita. En la pronunciación la marcamos con un apóstrofo: dien'.", example: "ДЕНЬ", latin: [] },
  Ъ: { ch: "Ъ", low: "ъ", sound: "signo duro", silent: true, tip: "No suena: separa las letras con una pausa cortita. Es la letra que menos se usa.", example: "ОБЪЕКТ", latin: [] },
  Э: { ch: "Э", low: "э", sound: "e", tip: "Una E al revés. Suena «e» como en eco. ¡Esta sí es la e de verdad!", example: "ЭХО", latin: [] },
  Ю: { ch: "Ю", low: "ю", sound: "iu", tip: "Una I pegada a una O. Suena «iu», como en ciudad.", example: "ЮГ", latin: [] },
  Я: { ch: "Я", low: "я", sound: "ia", tip: "Parece una R al revés. Suena «ia». Sola, significa «yo».", example: "ЯБЛОКО", latin: [] },
  Ё: { ch: "Ё", low: "ё", sound: "io", tip: "La Е con dos puntos. Suena «io» y siempre lleva la fuerza de la palabra.", example: "ЁЛКА", latin: [] },
};
