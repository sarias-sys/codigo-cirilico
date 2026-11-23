# Código Cirílico

App web (PWA) para que un adolescente aprenda ruso con una historia épica. Proyecto personal del dueño.

- Contenido en `src/content/`; lógica pura en `src/lib/` (con pruebas); pantallas en `src/screens/`.
- El nombre del jugador y cualquier dato de él **nunca** van en el código ni en el repositorio: solo en `localStorage` del teléfono.
- Nada de personajes, nombres ni arte de animes existentes: la historia es original.
- Antes de abrir un PR: `npm run typecheck`, `npm test` y `npm run build` en verde.
- Todo entra por PR a `main`; al mezclar se publica solo en GitHub Pages.
- Textos para el jugador en español, cercanos y épicos; las palabras rusas en mayúsculas en `missions.ts` con su pronunciación (`tr`) y la tilde en la sílaba fuerte.
