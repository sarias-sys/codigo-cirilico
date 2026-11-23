# Código Cirílico

Aprende ruso desde cero con una historia épica de supervivencia y misterio, pensada para un adolescente.

Las Sombras atacan la última ciudad en pie y dejan mensajes en ruso. El jugador es un cadete del **Escuadrón К**: para sobrevivir tiene que aprender a leer, escuchar y escribir cirílico. Cada misión revela un archivo secreto sobre quiénes son las Sombras.

## Qué tiene hoy

- **Misión 0.1 · Letras gemelas** (А К М О Т Е) y **Misión 0.2 · Falsas amigas** (Р Н В С У Х), completas.
- En cada misión: historia → letras nuevas con prueba rápida → descifrar (leer) → escribir con teclado cirílico en pantalla y dictado → jefe final con tiempo, escudos y vida.
- **Patrulla nocturna**: repaso espaciado diario (cajas de Leitner) de letras y palabras; las cartas que no se repasan se «apagan».
- Cartas coleccionables, escuadrón, rangos, racha de días y experiencia.
- **Informe para papá o mamá**: letras vistas y dominadas, aciertos y lo que más le cuesta.
- Se instala en el celular como app y funciona sin internet.
- El nombre del jugador se escribe al empezar y se guarda **solo en su teléfono**; nunca queda en el código.

## Cómo correrla en tu computador

```bash
npm install
npm run dev        # abre http://localhost:5173
```

Pruebas y verificación:

```bash
npm test           # pruebas automáticas
npm run typecheck  # revisión de tipos
npm run build      # versión final en dist/
```

## Cómo agregar contenido

Todo el contenido vive en `src/content/`:

- `letters.ts`: las letras, cómo suenan y un consejo para recordarlas.
- `missions.ts`: las palabras, la historia de cada misión, el jefe y el archivo secreto.

Las pruebas (`src/test/content.test.ts`) revisan que ninguna misión pida leer o escribir una letra que todavía no se ha enseñado.

## Publicación

Al mezclar a `main`, GitHub Actions construye la app y la publica en GitHub Pages (`.github/workflows/deploy.yml`).
