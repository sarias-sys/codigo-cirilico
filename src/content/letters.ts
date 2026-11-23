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
};

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
};
