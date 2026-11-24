# Entregas

Cada entrega es pequeña, se puede probar en el celular y no rompe el progreso guardado.

| # | Entrega | Estado |
|---|---|---|
| 1 | Misiones 0.1 y 0.2, Patrulla nocturna, cartas, escuadrón, informe, app instalable | Hecha |
| 2 | Misiones 0.3 y 0.4: el alfabeto completo (33 letras). Archivos secretos 3 y 4 | Esta entrega |
| 3 | Audio grabado por voces rusas de calidad para cada letra y palabra (ElevenLabs, pago único de unos 0,65 USD en créditos) | Esta entrega |
| 4 | Expediente 1 · Más allá del río (A1): saludar y presentarse. Entra Лев | Siguiente |
| 5 | Hablar: el jugador dice la palabra al micrófono y la app la reconoce | |
| 6 | Expediente 2 · El mercado de la frontera (A1): números, dinero y comida. Entra Мира | |
| 7 | Ilustraciones de personajes y escenas; música | |
| 8 | Chat de práctica con un personaje (requiere servidor y filtros para menores) | Por decidir |

## Decisiones técnicas

- **App web instalable (PWA)** con React, TypeScript y Vite. Sin servidor ni base de datos.
- **Progreso en el teléfono** (`localStorage`). Si el teléfono no deja guardar, la app lo avisa en rojo.
- **Publicación gratis en GitHub Pages**.
- **Costo mensual: 0**. Las entregas 3 y 8 tendrían costo (voces y modelo de IA) y se aprueban aparte.

## Riesgos

- La voz rusa del teléfono no existe en todos los equipos. Resuelto en la entrega 3: audios grabados que funcionan sin internet; la voz del teléfono queda solo de respaldo.
- Si se borran los datos del navegador, se pierde el progreso. Mitigado: el jugador guarda una copia con un código (pestaña Escuadrón) y el mapa le recuerda hacerlo cada semana.
