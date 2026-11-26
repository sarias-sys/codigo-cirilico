# Cómo se grabó la voz rusa

1. `node scripts/voz/plan.mjs` arma la lista de letras (por su nombre ruso) y palabras de `src/content/missions.ts`.
2. Se generan tandas de 8 con ElevenLabs (modelo `eleven_multilingual_v2`, voz «Viktoriya Voloshina»),
   separadas por pausas `<break time="1.2s" />`. Las tandas largas salen cortadas a ~24 s: no pasar de 8.
3. `node scripts/voz/split.mjs <tanda> <audio.mp3>` corta cada tanda por los silencios (con ffmpeg) y deja un
   mp3 por palabra en `public/voz/`. Si no encuentra el número exacto de pausas, no corta nada.
4. `src/content/voice.ts` dice qué archivo corresponde a cada letra o palabra. Una prueba revisa que no falte ninguno.

Al agregar palabras o frases nuevas: grabar solo las que faltan y sumarlas a `voice.ts`. La clave va sin signos
(«КАК ДЕЛА?» se guarda como «КАК ДЕЛА»); la prueba «voz grabada» dice cuáles faltan, también las de las conversaciones.
