# Entregas

Cada entrega es pequeña, se puede probar en el celular y no rompe el progreso guardado.

| # | Entrega | Estado |
|---|---|---|
| 1 | Misiones 0.1 y 0.2, Patrulla nocturna, cartas, escuadrón, informe, app instalable | Hecha |
| 2 | Misiones 0.3 y 0.4: el alfabeto completo (33 letras). Archivos secretos 3 y 4 | Hecha (PR #2) |
| 3 | Audio grabado por voces rusas de calidad para cada letra y palabra (ElevenLabs, pago único de unos 0,65 USD en créditos) | Hecha (PR #2) |
| 4 | Expediente 1 · Más allá del río (A1): misiones 1.1 a 1.3 para saludar, presentarse y preguntar cómo están. Ejercicio nuevo de conversación. Entran Вера y Ника. Voz de 29 frases nuevas (unos 0,14 USD) | Hecha (PR #3) |
| 5 | Hablar: en cada misión el jugador dice 3 palabras al micrófono y la app le dice si le entendió. Usa el reconocimiento del navegador, sin costo | Hecha (PR #4) |
| 6 | Expediente 2 · El mercado de la frontera (A1): misiones 2.1 a 2.3 para contar del 1 al 10, preguntar precios, regatear y pedir comida. Entra Мира. Voz de 31 frases nuevas (unos 0,21 USD con la revisión) | Hecha (PR #5) |
| 7 | Expediente 3 · El traidor (A1): misiones 3.1 a 3.3 para hablar de la familia, decir dónde están las cosas de la casa y los días (hoy, mañana, ayer). Se descubre quién es Тень. Voz de 38 frases nuevas (unos 0,26 USD con la revisión) | Esta entrega |
| 8 | Expediente 4 · Mi hermano, la Sombra (A1): el cuerpo, la ropa y el clima | Siguiente |
| 9 | Ilustraciones de personajes y escenas; música | |
| 10 | Chat de práctica con un personaje (requiere servidor y filtros para menores) | Por decidir |

## Decisiones técnicas

- **App web instalable (PWA)** con React, TypeScript y Vite. Sin servidor ni base de datos.
- **Progreso en el teléfono** (`localStorage`). Si el teléfono no deja guardar, la app lo avisa en rojo.
- **Publicación gratis en GitHub Pages**.
- **Micrófono con el reconocimiento del navegador** (decisión del dueño, 25-nov-2026). Gratis y sin servidor. Para convertir la voz en texto, Chrome la envía a Google y Safari a Apple; la app solo recibe el texto y no graba ni guarda audio. Antes de usarlo se muestra un aviso, se pide que un menor consulte a sus papás y se puede apagar en Escuadrón › Ajustes. Si el navegador no puede escuchar o no hay internet, la app lo dice y deja seguir sin hablar.
- **Costo mensual: 0**. Las voces de cada expediente (centavos) y el chat de la entrega 10 tienen costo (voces y modelo de IA) y se aprueban aparte.

## Riesgos

- La voz rusa del teléfono no existe en todos los equipos. Resuelto en la entrega 3: audios grabados que funcionan sin internet; la voz del teléfono queda solo de respaldo.
- Si se borran los datos del navegador, se pierde el progreso. Mitigado: el jugador guarda una copia con un código (pestaña Escuadrón) y el mapa le recuerda hacerlo cada semana.
- El reconocimiento de voz falla con palabras sueltas muy cortas o con ruido. Mitigado: 3 intentos, luego deja seguir sin castigo; las palabras cortas piden coincidencia exacta y las largas perdonan una letra.
