export const fallbackGenres = [
  {
    _id: 'g1',
    name: 'Anime Soundtrack',
    description: 'Bandas sonoras originales de series y películas de animación japonesa en ediciones de colección.',
    originDecade: '1990s'
  },
  {
    _id: 'g2',
    name: 'Video Game OST',
    description: 'Música orquestal, electrónica y vocal de grandes videojuegos en prensajes especiales y box sets.',
    originDecade: '2010s'
  },
  {
    _id: 'g3',
    name: 'Alternative R&B',
    description: 'Sonidos oscuros, atmosféricos y vanguardistas de la trilogía original de mixtapes de The Weeknd.',
    originDecade: '2010s'
  },
  {
    _id: 'g4',
    name: 'Synthwave / R&B',
    description: 'Producciones conceptuales con sintetizadores retro-futuristas, dream pop y R&B cinematográfico.',
    originDecade: '2020s'
  }
];

export const fallbackVinyls = [
  {
    _id: 'v1',
    title: 'Berserk (Original Soundtrack)',
    artist: 'Susumu Hirasawa',
    year: 1997,
    price: 54000,
    stock: 8,
    genre: 'Anime Soundtrack',
    coverUrl: '/images/berserk.jpg',
    description: 'Banda sonora original del mítico anime de fantasía oscura Berserk (1997), compuesta por Susumu Hirasawa. Incluye los temas icónicos Forces, Gatsu y Behelit en prensaje japonés remasterizado.',
    format: 'LP 12" 180g Audiophile Edition'
  },
  {
    _id: 'v2',
    title: 'NieR:Automata (Original Soundtrack)',
    artist: 'Keiichi Okabe (MONACA)',
    year: 2017,
    price: 62000,
    stock: 6,
    genre: 'Video Game OST',
    coverUrl: '/images/nier-automata.jpg',
    description: 'Edición oficial de Square Enix con las composiciones orquestales y vocales de Keiichi Okabe e interpretaciones de Emi Evans y J\'Nique Nicole, incluyendo Weight of the World y City Ruins.',
    format: '2xLP 12" 180g Gatefold'
  },
  {
    _id: 'v3',
    title: 'Cyberpunk: Edgerunners (Original Series Soundtrack)',
    artist: 'Akira Yamaoka & Marcin Przybyłowicz',
    year: 2022,
    price: 58500,
    stock: 10,
    genre: 'Anime Soundtrack',
    coverUrl: '/images/cyberpunk-edgerunners.jpg',
    description: 'Edición especial en vinilo amarillo neón de la serie de Studio Trigger y CD Projekt RED. Arte de portada exclusivo de Lucy e himnos electrónicos de Night City.',
    format: 'LP 12" Neon Yellow Vinyl'
  },
  {
    _id: 'v4',
    title: 'Persona 3 Reload: Megamix',
    artist: 'Atlus Sound Team (Azumi Takahashi & Lotus Juice)',
    year: 2024,
    price: 59000,
    stock: 9,
    genre: 'Video Game OST',
    coverUrl: '/images/persona3-reload.webp',
    description: 'Selección Megamix de la banda sonora de Persona 3 Reload en vinilo blanco translúcido con salpicaduras azules. Incluye It\'s Going Down Now, Full Moon Full Life y Mass Destruction -Reload-.',
    format: 'LP 12" Blue & White Splatter Vinyl'
  },
  {
    _id: 'v5',
    title: 'Stellar Blade (Collector\'s Edition Soundtrack)',
    artist: 'Shift Up Sound Team & MONACA',
    year: 2024,
    price: 78000,
    stock: 5,
    genre: 'Video Game OST',
    coverUrl: '/images/stellar-blade.webp',
    description: 'Box Set de colección de 4 vinilos con efecto splatter azul galáctico y obi strip. Recopila la banda sonora sci-fi completa de Stellar Blade bajo la dirección creativa de Hyung-Tae Kim.',
    format: '4xLP 12" Blue Splatter Box Set'
  },
  {
    _id: 'v6',
    title: 'One Last Kiss (Evangelion: 3.0+1.0)',
    artist: 'Hikaru Utada',
    year: 2021,
    price: 49500,
    stock: 11,
    genre: 'Anime Soundtrack',
    coverUrl: '/images/one-last-kiss.jpg',
    description: 'Vinilo de 12 pulgadas con portada ilustrada de Rei Ayanami que reúne los temas principales de Rebuild of Evangelion interpretados por Hikaru Utada, incluyendo One Last Kiss y Beautiful World.',
    format: 'LP 12" Edición Ilustrada Rei Ayanami'
  },
  {
    _id: 'v7',
    title: 'House of Balloons (10th Anniversary Edition)',
    artist: 'The Weeknd',
    year: 2011,
    price: 65000,
    stock: 7,
    genre: 'Alternative R&B',
    coverUrl: '/images/house-of-balloons.jpg',
    description: 'Edición especial por el 10° aniversario del mixtape debut de The Weeknd con arte escultórico reimaginado por Daniel Arsham. Incluye High for This, Wicked Games y House of Balloons / Glass Table Girls.',
    format: '2xLP 12" Edición Daniel Arsham'
  },
  {
    _id: 'v8',
    title: 'Thursday (10th Anniversary Picture Disc)',
    artist: 'The Weeknd',
    year: 2011,
    price: 68000,
    stock: 6,
    genre: 'Alternative R&B',
    coverUrl: '/images/thursday.jpg',
    description: 'Edición coleccionista 10° Aniversario de Thursday en doble Picture Disc ilustrado por el artista japonés Mr. Yanen. Incluye Lonely Star, The Zone (feat. Drake) y The Birds Pt. 1 & 2.',
    format: '2xLP 12" Picture Disc (Arte Mr. Yanen)'
  },
  {
    _id: 'v9',
    title: 'Echoes of Silence',
    artist: 'The Weeknd',
    year: 2011,
    price: 56000,
    stock: 9,
    genre: 'Alternative R&B',
    coverUrl: '/images/echoes-of-silence.png',
    description: 'El capítulo final de la trilogía original de mixtapes de The Weeknd en doble vinilo de 180 gramos. Incluye D.D. (Dirty Diana), Montreal, Outside, XO / The Host e Initiation.',
    format: '2xLP 12" 180g Gatefold'
  },
  {
    _id: 'v10',
    title: 'After Hours (Collector\'s Blood Splatter Edition)',
    artist: 'The Weeknd',
    year: 2020,
    price: 64000,
    stock: 10,
    genre: 'Synthwave / R&B',
    coverUrl: '/images/after-hours.png',
    description: 'Cuarto álbum de estudio de The Weeknd en doble vinilo transparente con salpicaduras rojas. Incluye los éxitos globales Blinding Lights, Save Your Tears, Heartless y After Hours.',
    format: '2xLP 12" Clear w/ Red Blood Splatter'
  },
  {
    _id: 'v11',
    title: 'Dawn FM (Collector\'s Edition)',
    artist: 'The Weeknd',
    year: 2022,
    price: 59500,
    stock: 12,
    genre: 'Synthwave / R&B',
    coverUrl: '/images/dawn-fm.jpg',
    description: 'Álbum conceptual synth-pop narrado por Jim Carrey como una estación de radio hacia el más allá. Incluye Take My Breath, Sacrifice, Out of Time e Is There Someone Else?.',
    format: '2xLP 12" Edición Portada Alternativa'
  },
  {
    _id: 'v12',
    title: 'Hurry Up Tomorrow',
    artist: 'The Weeknd',
    year: 2025,
    price: 61000,
    stock: 14,
    genre: 'Synthwave / R&B',
    coverUrl: '/images/hurry-up-tomorrow.jpg',
    description: 'El cierre épico de la trilogía moderna iniciada con After Hours y Dawn FM. Prensaje original en vinilo negro de alta fidelidad con producción electrónica y cinematográfica.',
    format: 'LP 12" First Pressing Black Vinyl'
  }
];
