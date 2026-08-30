import { GenreChain } from '../types';

export const genreChainsData: GenreChain[] = [
  {
    id: 'afrobeat',
    name: 'Afrobeat',
    origin: 'Nigéria / Gana / África Ocidental',
    bpmRange: '98 – 112 BPM',
    modes: {
      CLEAN: {
        description: 'Vocal natural, quente e relaxado com percussões ricas e baixo suave.',
        vocalChain: [
          { position: 1, plugin: 'Fruity Parametric EQ 2', action: 'Limpeza suave', params: 'HPF a 80Hz + corte de 2dB em 300Hz' },
          { position: 2, plugin: 'Fruity Limiter', action: 'Compressão óptica suave', params: 'Ratio 2.5:1 | Att 25ms | Rel 100ms | GR 2-3dB' },
          { position: 3, plugin: 'Maximus', action: 'De-Esser', params: 'High band 5.5kHz - 8kHz' },
          { position: 4, plugin: 'Fruity Parametric EQ 2', action: 'Tonal Shelf', params: 'High Shelf +2dB em 12kHz para ar' },
          { position: 5, plugin: 'Fruity Reeverb 2 (Send)', action: 'Plate Reverb', params: 'Decay 1.6s | Low cut 400Hz' },
          { position: 6, plugin: 'Fruity Delay 3 (Send)', action: '1/8 Dotted Delay', params: 'Ping Pong | High pass 350Hz' }
        ],
        drumsChain: [
          { element: 'Kick', plugin: 'Fruity Parametric EQ 2', action: 'Punch a 60Hz + corte em 400Hz' },
          { element: 'Rimshot/Snare', plugin: 'Fruity Reeverb 2', action: 'Short room para textura acústica' },
          { element: 'Shaker/Percs', plugin: 'Fruity Stereo Enhancer', action: 'Abertura estéreo suave' }
        ],
        bassChain: [
          { element: 'Sub Bass / Bassline', plugin: 'Fruity Parametric EQ 2', action: 'Mono total abaixo de 100Hz + calor em 120Hz' }
        ],
        masterChain: [
          { position: 1, plugin: 'Fruity Parametric EQ 2', action: 'Ajuste sutil tonal' },
          { position: 2, plugin: 'Maximus', action: 'Compressão suave colando a percussão' },
          { position: 3, plugin: 'Fruity Soft Clipper', action: 'Controle de transientes' },
          { position: 4, plugin: 'Fruity Limiter', action: 'Ceiling -1.0 dBTP | Alvo -12 a -14 LUFS' }
        ],
        mixSecret: 'Deixe as percussões e shakers conversarem em estéreo, mantendo o Kick, Bass e Vocal 100% no centro.'
      },
      MODERN: {
        description: 'Som comercial de estúdio moderno, vocal polido e brilhante com 808 gordo e transientes firmes.',
        vocalChain: [
          { position: 1, plugin: 'Fruity Parametric EQ 2', action: 'Corte cirúrgico', params: 'HPF a 85Hz + dip em 350Hz' },
          { position: 2, plugin: 'Fruity Limiter', action: 'Compressão moderna', params: 'Ratio 3.5:1 | Att 15ms | Rel 70ms | GR 4-5dB' },
          { position: 3, plugin: 'Maximus', action: 'De-Esser multibanda', params: 'Domar sibilâncias agudas' },
          { position: 4, plugin: 'Fruity Parametric EQ 2', action: 'Presença e Ar', params: '+2.5dB em 4.5kHz + +3dB em 13kHz' },
          { position: 5, plugin: 'Fruity Blood Overdrive', action: 'Saturação harmônica', params: 'Color 5k | Drive 0.2 | Mix 20%' },
          { position: 6, plugin: 'Fruity Delay 3 (Send)', action: 'Stereo Echo', params: 'Ducking delay acionado pelo vocal' }
        ],
        drumsChain: [
          { element: 'Kick', plugin: 'Fruity Soft Clipper', action: 'Pegada forte contra 0dB' },
          { element: 'Percussões', plugin: 'Fruity Parametric EQ 2', action: 'Boost de brilho em 8kHz' }
        ],
        bassChain: [
          { element: '808 / Synth Bass', plugin: 'Fruity Blood Overdrive', action: 'Harmônicos de médios para tocar em fones' }
        ],
        masterChain: [
          { position: 1, plugin: 'Fruity Parametric EQ 2', action: 'High Shelf de luxo em 14kHz' },
          { position: 2, plugin: 'Maximus', action: 'Punch multibanda' },
          { position: 3, plugin: 'Fruity Soft Clipper', action: 'Soft clipping para transientes' },
          { position: 4, plugin: 'Fruity Limiter', action: 'Target -9 a -11 LUFS' }
        ],
        mixSecret: 'Adicione saturação leve no bus de vocais e comprima levemente o bus de percussões junto com o kick.'
      },
      AGGRESSIVE: {
        description: 'Bateria super punchy, 808 distorcido e vocais empurrados na cara da mixagem.',
        vocalChain: [
          { position: 1, plugin: 'Fruity Parametric EQ 2', action: 'HPF 90Hz + boost forte em 4kHz' },
          { position: 2, plugin: 'Fruity Limiter', action: 'Hard Comp', params: 'Ratio 5:1 | Att 10ms | Rel 50ms | GR 6-8dB' },
          { position: 3, plugin: 'Fruity Fast Dist', action: 'Distorção aparente', params: 'Mix 25%' },
          { position: 4, plugin: 'Maximus', action: 'De-Esser duplo' }
        ],
        drumsChain: [
          { element: 'Drums Bus', plugin: 'Fruity Soft Clipper', action: 'Clip agressivo' }
        ],
        bassChain: [
          { element: '808', plugin: 'WaveShaper', action: 'Distorção rica' }
        ],
        masterChain: [
          { position: 1, plugin: 'Fruity Soft Clipper', action: 'Clip pesado nos picos' },
          { position: 2, plugin: 'Fruity Limiter', action: 'Target -8 a -7 LUFS (Club ready)' }
        ],
        mixSecret: 'Sidechain agressivo do kick no 808 para que a pancada do bumbo nunca seja encoberta.'
      }
    },
    keyAdvice: [
      'Geralmente em compasso 4/4 com andamento entre 100 e 106 BPM.',
      'A clave rítmica das percussões é a alma do estilo: não comprima demais as percussões para não matar a dinâmica.',
      'Auto-tune sutil e delay rítmico são assinaturas fundamentais do estilo.'
    ]
  },
  {
    id: 'amapiano',
    name: 'Amapiano',
    origin: 'África do Sul',
    bpmRange: '110 – 118 BPM',
    modes: {
      CLEAN: {
        description: 'Log Drum orgânico e profundo, pianos de jazz expressivos e shakers fluidos.',
        vocalChain: [
          { position: 1, plugin: 'Fruity Parametric EQ 2', action: 'Corte de graves', params: 'HPF 85Hz' },
          { position: 2, plugin: 'Fruity Limiter', action: 'Compressão suave', params: 'Ratio 3:1 | GR 3dB' },
          { position: 3, plugin: 'Fruity Reeverb 2', action: 'Large Hall para vocais e coros', params: 'Decay 2.2s' }
        ],
        drumsChain: [
          { element: 'Log Drum', plugin: 'Fruity Parametric EQ 2', action: 'Mono total abaixo de 90Hz + realce no thump em 50Hz' },
          { element: 'Shakers', plugin: 'Fruity Stereo Enhancer', action: 'Panning dinâmico' }
        ],
        bassChain: [
          { element: 'Log Drum Sub', plugin: 'Maximus', action: 'Controle de dinâmica para evitar explosão de subgraves' }
        ],
        masterChain: [
          { position: 1, plugin: 'Maximus', action: 'Banda LOW bem controlada em mono' },
          { position: 2, plugin: 'Fruity Limiter', action: 'Alvo -12 LUFS' }
        ],
        mixSecret: 'O Log Drum precisa de espaço livre abaixo de 80Hz: corte o grave dos pianos e pads sem dó.'
      },
      MODERN: {
        description: 'Log Drum estrondoso, com kicks secos e vocais cristalinos cortando a mixagem.',
        vocalChain: [
          { position: 1, plugin: 'Fruity Parametric EQ 2', action: 'Brilho e clareza', params: '+3dB em 4.5kHz' },
          { position: 2, plugin: 'Fruity Blood Overdrive', action: 'Harmônicos', params: 'Mix 15%' }
        ],
        drumsChain: [
          { element: 'Log Drum', plugin: 'Fruity Blood Overdrive', action: 'Saturação de harmônicos médios em 300Hz' }
        ],
        bassChain: [
          { element: 'Log Bass', plugin: 'Fruity Soft Clipper', action: 'Punch nos transientes de entrada' }
        ],
        masterChain: [
          { position: 1, plugin: 'Fruity Soft Clipper', action: 'Clip suave' },
          { position: 2, plugin: 'Fruity Limiter', action: 'Alvo -9 LUFS' }
        ],
        mixSecret: 'Equilibre o volume entre o primeiro toque do Log Drum (punch) e o glide tonal (pitch bend).'
      },
      AGGRESSIVE: {
        description: 'Foco total em pistas de dança com Log Drums pesadíssimos e graves vibrantes.',
        vocalChain: [
          { position: 1, plugin: 'Fruity Limiter', action: 'Heavy compression', params: 'Ratio 5:1' }
        ],
        drumsChain: [
          { element: 'Kick & Log Drum', plugin: 'Fruity Soft Clipper', action: 'Clip forte' }
        ],
        bassChain: [
          { element: 'Log Bass', plugin: 'WaveShaper', action: 'Harmonic distortion' }
        ],
        masterChain: [
          { position: 1, plugin: 'Fruity Limiter', action: 'Alvo -8 LUFS' }
        ],
        mixSecret: 'Sidechain sutil do Kick no Log Drum apenas nos primeiros 20ms.'
      }
    },
    keyAdvice: [
      'O segredo do Amapiano é a dinâmica do Log Drum (DX10 / FL Studio plugins).',
      'Use pianos com afinação brilhante e muito estéreo (estilo M1 Piano).'
    ]
  },
  {
    id: 'kizomba',
    name: 'Kizomba & Ghetto Zouk',
    origin: 'Angola / Cabo Verde / Guiné-Bissau',
    bpmRange: '88 – 98 BPM',
    modes: {
      CLEAN: {
        description: 'Graves redondos e profundos, guitarras semba limpas e vocais íntimos e aveludados.',
        vocalChain: [
          { position: 1, plugin: 'Fruity Parametric EQ 2', action: 'Calor vocal', params: 'HPF a 75Hz + corpo em 200Hz' },
          { position: 2, plugin: 'Fruity Limiter', action: 'Compressão transparente', params: 'Ratio 2.5:1 | Att 20ms' },
          { position: 3, plugin: 'Fruity Reeverb 2', action: 'Ambiente romântico suave', params: 'Plate 2.0s' }
        ],
        drumsChain: [
          { element: 'Kizomba Beat (Tarraxinha kick & snare)', plugin: 'Fruity Parametric EQ 2', action: 'Graves quentes e redondos' }
        ],
        bassChain: [
          { element: 'Bass Synth', plugin: 'Maximus', action: 'Low band control' }
        ],
        masterChain: [
          { position: 1, plugin: 'Fruity Limiter', action: 'Alvo -13 LUFS | True Peak -1.0 dBTP' }
        ],
        mixSecret: 'O bumbo e o baixo da Kizomba precisam de um grave muito macio, sem distorção áspera.'
      },
      MODERN: {
        description: 'Produção moderna com elementos de R&B urbano, vocais aveludados e graves potentes.',
        vocalChain: [
          { position: 1, plugin: 'Fruity Parametric EQ 2', action: 'Ar e brilho', params: 'High Shelf em 12kHz' },
          { position: 2, plugin: 'Fruity Delay 3', action: 'Ducking delay 1/4' }
        ],
        drumsChain: [
          { element: 'Snare/Rim', plugin: 'Fruity Reeverb 2', action: 'Reverb espacial' }
        ],
        bassChain: [
          { element: 'Deep Bass', plugin: 'Fruity Blood Overdrive', action: 'Harmônicos suaves' }
        ],
        masterChain: [
          { position: 1, plugin: 'Fruity Limiter', action: 'Alvo -10 LUFS' }
        ],
        mixSecret: 'Mantenha o vocal com sensação de sussurro no ouvido (gravação próxima + compressão óptica).'
      },
      AGGRESSIVE: {
        description: 'Versão Tarraxo / Heavy Bass para clubs e festivais.',
        vocalChain: [{ position: 1, plugin: 'Fruity Limiter', action: 'In-your-face comp', params: 'Ratio 4:1' }],
        drumsChain: [{ element: 'Drums', plugin: 'Fruity Soft Clipper', action: 'Punch extra' }],
        bassChain: [{ element: 'Heavy Sub', plugin: 'WaveShaper', action: 'Sub harmonics' }],
        masterChain: [{ position: 1, plugin: 'Fruity Limiter', action: 'Alvo -8.5 LUFS' }],
        mixSecret: 'Subgrave dominante entre 35Hz e 55Hz.'
      }
    },
    keyAdvice: [
      'Guitarras e teclados devem ficar abertos nas laterais para que a batida rítmica e o vocal dominem o centro.',
      'O bumbo tem uma batida característica sincopada (tum... tum-tá).'
    ]
  },
  {
    id: 'kuduro',
    name: 'Kuduro & Afro House',
    origin: 'Angola / África do Sul',
    bpmRange: '120 – 140 BPM',
    modes: {
      CLEAN: {
        description: 'Energia rítmica contagiante, percussões orgânicas e grooves de baixo rápidos.',
        vocalChain: [
          { position: 1, plugin: 'Fruity Parametric EQ 2', action: 'HPF a 95Hz' },
          { position: 2, plugin: 'Fruity Limiter', action: 'Compressão rápida', params: 'Ratio 4:1 | Att 10ms' }
        ],
        drumsChain: [
          { element: 'Percussões & Apitos', plugin: 'Fruity Parametric EQ 2', action: 'Corte de ressonâncias' }
        ],
        bassChain: [
          { element: 'Bass', plugin: 'Fruity Parametric EQ 2', action: 'Mono total e corte em 30Hz' }
        ],
        masterChain: [
          { position: 1, plugin: 'Fruity Limiter', action: 'Alvo -10 LUFS' }
        ],
        mixSecret: 'No Kuduro, o ritmo e as dobras vocais enérgicas precisam ter transientes rápidos e vivos.'
      },
      MODERN: {
        description: 'Produção eletrônica potente com graves de club e vocais incisivos.',
        vocalChain: [
          { position: 1, plugin: 'Fruity Fast Dist', action: 'Leve saturação', params: 'Mix 20%' }
        ],
        drumsChain: [
          { element: 'Kick 4x4', plugin: 'Fruity Soft Clipper', action: 'Punch no peito' }
        ],
        bassChain: [
          { element: 'Sub', plugin: 'Fruity Limiter', action: 'Sidechain direto com o 4x4 kick' }
        ],
        masterChain: [
          { position: 1, plugin: 'Fruity Soft Clipper + Limiter', action: 'Alvo -8 LUFS' }
        ],
        mixSecret: 'Sidechain do Kick em todas as faixas de sintetizadores para criar o bombeamento característico do House.'
      },
      AGGRESSIVE: {
        description: 'Som de festival de alta potência e pressão sonora máxima.',
        vocalChain: [{ position: 1, plugin: 'Fruity Limiter', action: 'Maximizer', params: 'Ratio 6:1' }],
        drumsChain: [{ element: 'All Drums', plugin: 'Fruity Soft Clipper', action: 'Hard clip' }],
        bassChain: [{ element: 'Bass', plugin: 'WaveShaper', action: 'Distorção analógica' }],
        masterChain: [{ position: 1, plugin: 'Fruity Limiter', action: 'Alvo -7 LUFS' }],
        mixSecret: 'Use o Fruity Soft Clipper no Master antes do limiter para absorver os transientes da caixa e bumbo.'
      }
    },
    keyAdvice: [
      'Bateria 4 no chão (Four-on-the-floor) com síncopes percussivas rápidas.',
      'Mantenha as frequências agudas dos pratos sem aspereza (de-harsh em 4kHz).'
    ]
  },
  {
    id: 'trap',
    name: 'Trap (Modern / Atlanta / Melodic)',
    origin: 'Atlanta / EUA & Global',
    bpmRange: '130 – 165 BPM',
    modes: {
      CLEAN: {
        description: 'Vocais melódicos com autotune sedoso, 808 limpo e hi-hat rolls nítidos.',
        vocalChain: [
          { position: 1, plugin: 'Fruity Parametric EQ 2', action: 'HPF a 90Hz + High Shelf em 12kHz' },
          { position: 2, plugin: 'Fruity Limiter', action: 'Compressão firme', params: 'Ratio 4:1 | Att 12ms | Rel 60ms' },
          { position: 3, plugin: 'Maximus', action: 'De-Esser', params: 'Domar 6k-8kHz' },
          { position: 4, plugin: 'Fruity Delay 3', action: '1/8 Dotted Ping Pong' },
          { position: 5, plugin: 'Fruity Reeverb 2', action: 'Plate Reverb espaçoso' }
        ],
        drumsChain: [
          { element: 'Kick', plugin: 'Fruity Parametric EQ 2', action: 'Punch a 55Hz' },
          { element: 'Hi-Hats', plugin: 'Fruity Parametric EQ 2', action: 'HPF a 400Hz + corte de ressonância em 4kHz' },
          { element: 'Clap', plugin: 'Fruity Stereo Enhancer', action: 'Estéreo controlado' }
        ],
        bassChain: [
          { element: '808', plugin: 'Fruity Blood Overdrive', action: 'Leve saturação (Drive 0.15) para harmônicos' }
        ],
        masterChain: [
          { position: 1, plugin: 'Fruity Soft Clipper', action: 'Arredondar transientes do kick' },
          { position: 2, plugin: 'Fruity Limiter', action: 'Alvo -9 a -11 LUFS' }
        ],
        mixSecret: 'Corte os graves das melodias (synths, guitarras, pianos) em 150Hz para deixar o 808 reinar sozinho.'
      },
      MODERN: {
        description: 'Vocal colado na cara do ouvinte, 808 rasgando nos médios e bateria com clipping controlado.',
        vocalChain: [
          { position: 1, plugin: 'Fruity Parametric EQ 2', action: 'High boost + corte de 300Hz' },
          { position: 2, plugin: 'Fruity Limiter', action: '1176 Style fast compression' },
          { position: 3, plugin: 'Fruity Blood Overdrive', action: 'Saturação harmônica 20%' }
        ],
        drumsChain: [
          { element: 'Kick + 808', plugin: 'Fruity Soft Clipper', action: 'Bater em 0dB no master sem distorcer' }
        ],
        bassChain: [
          { element: '808 Bass', plugin: 'WaveShaper', action: 'Oversampling 4x + saturação quente' }
        ],
        masterChain: [
          { position: 1, plugin: 'Fruity Soft Clipper', action: 'Teto em 0dB' },
          { position: 2, plugin: 'Fruity Limiter', action: 'Alvo -8 a -9 LUFS' }
        ],
        mixSecret: 'O segredo do Trap moderno é mixar a bateria e 808 contra o Fruity Soft Clipper no canal Master.'
      },
      AGGRESSIVE: {
        description: 'Distorção pesada, 808 overdrive e energia extrema para moshpits.',
        vocalChain: [{ position: 1, plugin: 'Fruity Fast Dist', action: 'Distorção', params: 'Drive 30%' }],
        drumsChain: [{ element: 'Drums', plugin: 'Fruity Soft Clipper', action: 'Empurrar ganho de entrada em +3dB' }],
        bassChain: [{ element: '808', plugin: 'Fruity Blood Overdrive', action: 'Drive 0.4' }],
        masterChain: [{ position: 1, plugin: 'Fruity Limiter', action: 'Alvo -7 LUFS' }],
        mixSecret: 'Coloque o Kick 1dB acima do 808 para que a cabeça da nota bata primeiro.'
      }
    },
    keyAdvice: [
      'Os hi-hats precisam de variação de velocity e panning para criar fluidez rítmica.',
      'Sintonize o 808 na nota tônica exata da melodia.'
    ]
  },
  {
    id: 'drill',
    name: 'Drill (UK / NY / Afro Drill)',
    origin: 'Reino Unido / Nova York / África',
    bpmRange: '138 – 148 BPM',
    modes: {
      CLEAN: {
        description: 'Sliding 808s melódicos, hi-hats sincopados e vocais com boa dinâmica.',
        vocalChain: [
          { position: 1, plugin: 'Fruity Parametric EQ 2', action: 'HPF a 90Hz' },
          { position: 2, plugin: 'Fruity Limiter', action: 'Compressão 4:1' },
          { position: 3, plugin: 'Maximus', action: 'De-Esser' }
        ],
        drumsChain: [
          { element: 'Snare (no 3º tempo)', plugin: 'Fruity Parametric EQ 2', action: 'Presença em 3.5kHz' },
          { element: 'Counter Snares', plugin: 'Fruity PanOMatic', action: 'Panning estéreo' }
        ],
        bassChain: [
          { element: 'Drill 808 Slides', plugin: 'Fruity Parametric EQ 2', action: 'Mono maker nos graves' }
        ],
        masterChain: [{ position: 1, plugin: 'Fruity Limiter', action: 'Alvo -10 LUFS' }],
        mixSecret: 'Nos 808 slides do Drill, certifique-se de que o glide não cause sobreposição de notas graves (Cut Itself ativado).'
      },
      MODERN: {
        description: '808 agressivo com glides agudos, vocal autoritário e caixa cortante.',
        vocalChain: [
          { position: 1, plugin: 'Fruity Limiter', action: 'Compressor 1176 rápido' },
          { position: 2, plugin: 'Fruity Blood Overdrive', action: 'Saturação de médios' }
        ],
        drumsChain: [{ element: 'Drums', plugin: 'Fruity Soft Clipper', action: 'Snappy snare' }],
        bassChain: [{ element: '808 Glides', plugin: 'WaveShaper', action: 'Saturação em 700Hz' }],
        masterChain: [{ position: 1, plugin: 'Fruity Soft Clipper', action: 'Alvo -8.5 LUFS' }],
        mixSecret: 'Adicione saturação de médios nos 808s para que os slides até a 5ª ou 8ª oitava continuem pesados.'
      },
      AGGRESSIVE: {
        description: 'Voz agressiva, 808 distorcido e impacto de rua máximo.',
        vocalChain: [{ position: 1, plugin: 'Fruity Limiter', action: 'Hard Comp', params: 'Ratio 6:1' }],
        drumsChain: [{ element: 'Drums', plugin: 'Fruity Soft Clipper', action: 'Clip pesado' }],
        bassChain: [{ element: '808', plugin: 'Fruity Fast Dist', action: 'Drive 35%' }],
        masterChain: [{ position: 1, plugin: 'Fruity Limiter', action: 'Alvo -7.5 LUFS' }],
        mixSecret: 'Sidechain estrito no kick para que o 808 abra espaço instantâneo.'
      }
    },
    keyAdvice: [
      'Padrão de caixa sincopada no 3º e 8º semi-tempo (padrão rítmico do Drill).',
      '808 Slides requerem o modo "Mono" e "Portamento/Slide" configurados no sampler do FL.'
    ]
  },
  {
    id: 'hiphop',
    name: 'Hip Hop / Boombap',
    origin: 'Nova York / Clássico & Moderno',
    bpmRange: '85 – 98 BPM',
    modes: {
      CLEAN: {
        description: 'Samples de vinil quentes, bumbo acústico gordo e voz com presença natural.',
        vocalChain: [
          { position: 1, plugin: 'Fruity Parametric EQ 2', action: 'HPF a 80Hz + corpo em 180Hz' },
          { position: 2, plugin: 'Fruity Limiter', action: 'Compressão musical óptica', params: 'Ratio 3:1 | GR 4dB' }
        ],
        drumsChain: [{ element: 'Drum Break', plugin: 'Fruity Parametric EQ 2', action: 'Calor analógico' }],
        bassChain: [{ element: 'Bassline', plugin: 'Fruity Blood Overdrive', action: 'Aquecimento suave' }],
        masterChain: [{ position: 1, plugin: 'Fruity Limiter', action: 'Alvo -12 LUFS' }],
        mixSecret: 'Não limpe todo o ruído de vinil ou textura do sample: a sujeira analógica é o charme do gênero.'
      },
      MODERN: {
        description: 'Batida pesada com fidelidade de ponta e rimas cristalinas.',
        vocalChain: [{ position: 1, plugin: 'Fruity Parametric EQ 2', action: 'Brilho em 10kHz' }],
        drumsChain: [{ element: 'Snare', plugin: 'Fruity Blood Overdrive', action: 'Punch harmônico' }],
        bassChain: [{ element: 'Bass', plugin: 'Maximus', action: 'Low-end glue' }],
        masterChain: [{ position: 1, plugin: 'Fruity Soft Clipper', action: 'Alvo -9.5 LUFS' }],
        mixSecret: 'Use compressão paralela (New York Compression) na bateria inteira.'
      },
      AGGRESSIVE: {
        description: 'Bateria esmagadora e vocal potente.',
        vocalChain: [{ position: 1, plugin: 'Fruity Limiter', action: 'Ratio 5:1' }],
        drumsChain: [{ element: 'Drums', plugin: 'Fruity Soft Clipper', action: 'Hard clipping' }],
        bassChain: [{ element: 'Bass', plugin: 'WaveShaper', action: 'Overdrive' }],
        masterChain: [{ position: 1, plugin: 'Fruity Limiter', action: 'Alvo -8 LUFS' }],
        mixSecret: 'Empurre a caixa e o bumbo para a frente com saturação analógica.'
      }
    },
    keyAdvice: [
      'O bumbo acústico tem seu punch em 80Hz - 100Hz (diferente do 808 eletrônico que vive em 45Hz).',
      'Caixa pesada com boa quantidade de médios (200Hz).'
    ]
  },
  {
    id: 'rnb',
    name: 'R&B / Soul Contemporâneo',
    origin: 'EUA & Global',
    bpmRange: '65 – 95 BPM',
    modes: {
      CLEAN: {
        description: 'Vocal aveludado, harmonias tridimensionais, delays longos e ambiência romântica.',
        vocalChain: [
          { position: 1, plugin: 'Fruity Parametric EQ 2', action: 'Corte cirúrgico suave' },
          { position: 2, plugin: 'Fruity Limiter', action: 'Compressão transparente 2.5:1' },
          { position: 3, plugin: 'Fruity Reeverb 2', action: 'Hall exuberante', params: 'Decay 2.4s' },
          { position: 4, plugin: 'Fruity Delay 3', action: '1/4 Ping Pong Delay' }
        ],
        drumsChain: [{ element: 'Snare/Snap', plugin: 'Fruity Reeverb 2', action: 'Placa espacial' }],
        bassChain: [{ element: 'Smooth Sub/Bass', plugin: 'Fruity Parametric EQ 2', action: 'Graves aveludados' }],
        masterChain: [{ position: 1, plugin: 'Fruity Limiter', action: 'Alvo -13 LUFS' }],
        mixSecret: 'Abra espaço no centro do estéreo abrindo as harmonias vocais 100% nas laterais (L/R).'
      },
      MODERN: {
        description: 'R&B contemporâneo estilo Drake/The Weeknd com graves potentes e vocais cheios de ar.',
        vocalChain: [{ position: 1, plugin: 'Fruity Parametric EQ 2', action: 'Air shelf em 13kHz (+3dB)' }],
        drumsChain: [{ element: 'Kick & Claps', plugin: 'Fruity Soft Clipper', action: 'Impacto suave' }],
        bassChain: [{ element: 'Sub 808', plugin: 'Fruity Blood Overdrive', action: 'Harmônicos de calor' }],
        masterChain: [{ position: 1, plugin: 'Fruity Soft Clipper + Limiter', action: 'Alvo -10 LUFS' }],
        mixSecret: 'Filtre os instrumentos em passagens com Low-Pass filter automação para dar destaque à voz.'
      },
      AGGRESSIVE: {
        description: 'Dark R&B / Trap Soul intenso.',
        vocalChain: [{ position: 1, plugin: 'Fruity Limiter', action: 'Compressão densa' }],
        drumsChain: [{ element: 'Drums', plugin: 'Fruity Soft Clipper', action: 'Clip' }],
        bassChain: [{ element: 'Deep 808', plugin: 'WaveShaper', action: 'Grit' }],
        masterChain: [{ position: 1, plugin: 'Fruity Limiter', action: 'Alvo -8.5 LUFS' }],
        mixSecret: 'Sidechain do Kick no sub para preservar o impacto do bumbo.'
      }
    },
    keyAdvice: [
      'O arranjo vocal com dobras, terças e quintas harmonizadas é o coração do R&B.',
      'Use compressores ópticos lentos para preservar a emoção natural da voz.'
    ]
  },
  {
    id: 'pop',
    name: 'Pop Comercial',
    origin: 'Global',
    bpmRange: '105 – 128 BPM',
    modes: {
      CLEAN: {
        description: 'Equilíbrio perfeito de rádio, vocais super claros e inteligíveis, sem estridência.',
        vocalChain: [
          { position: 1, plugin: 'Fruity Parametric EQ 2', action: 'HPF a 85Hz + dip em 300Hz' },
          { position: 2, plugin: 'Fruity Limiter', action: 'Compressão precisa', params: 'Ratio 3.5:1 | Att 15ms' },
          { position: 3, plugin: 'Maximus', action: 'De-Esser' },
          { position: 4, plugin: 'Fruity Parametric EQ 2', action: 'High Shelf +2.5dB em 12kHz' }
        ],
        drumsChain: [{ element: 'Drums Bus', plugin: 'Fruity Limiter', action: 'Compressão paralela de punch' }],
        bassChain: [{ element: 'Bass', plugin: 'Fruity Parametric EQ 2', action: 'Controle de transientes' }],
        masterChain: [{ position: 1, plugin: 'Fruity Limiter', action: 'Alvo -12 LUFS | True Peak -1.0 dBTP' }],
        mixSecret: 'O vocal é o rei absoluto no Pop: ele deve ficar pelo menos 1dB a 2dB acima de toda a instrumentação.'
      },
      MODERN: {
        description: 'Som de streaming moderno hiper-polido, brilhante e pronto para playlist de topo.',
        vocalChain: [{ position: 1, plugin: 'Fruity Blood Overdrive', action: 'Harmônicos de presença 15%' }],
        drumsChain: [{ element: 'Drums', plugin: 'Fruity Soft Clipper', action: 'Ataque vivo' }],
        bassChain: [{ element: 'Bass', plugin: 'Maximus', action: 'Glue multibanda' }],
        masterChain: [{ position: 1, plugin: 'Fruity Soft Clipper + Limiter', action: 'Alvo -9.5 LUFS' }],
        mixSecret: 'Automatize o volume do vocal no refrão para subir 1dB em relação às estrofes.'
      },
      AGGRESSIVE: {
        description: 'Dance Pop de alto impacto para pistas.',
        vocalChain: [{ position: 1, plugin: 'Fruity Limiter', action: 'Limit comp' }],
        drumsChain: [{ element: 'Drums', plugin: 'Fruity Soft Clipper', action: 'Heavy punch' }],
        bassChain: [{ element: 'Synth Bass', plugin: 'WaveShaper', action: 'Saturation' }],
        masterChain: [{ position: 1, plugin: 'Fruity Limiter', action: 'Alvo -8 LUFS' }],
        mixSecret: 'Use ducking de reverb para que os efeitos espaciais não embolem as palavras rápidas.'
      }
    },
    keyAdvice: [
      'Edição e afinação cirúrgica antes de iniciar o processo de mixagem.',
      'Sempre teste a mix em mono para checar se o vocal não cancela de fase.'
    ]
  },
  {
    id: 'gospel',
    name: 'Gospel & Worship',
    origin: 'Global',
    bpmRange: '68 – 110 BPM',
    modes: {
      CLEAN: {
        description: 'Ambiências grandiosas, corais ricos em estéreo, bateria viva e piano dinâmico.',
        vocalChain: [
          { position: 1, plugin: 'Fruity Parametric EQ 2', action: 'HPF a 80Hz + calor em 220Hz' },
          { position: 2, plugin: 'Fruity Limiter', action: 'Compressão transparente de 2 estágios' },
          { position: 3, plugin: 'Fruity Reeverb 2', action: 'Cathedral / Arena Reverb', params: 'Decay 3.2s' }
        ],
        drumsChain: [{ element: 'Acoustic Drums', plugin: 'Fruity Reeverb 2', action: 'Ambiente de sala real' }],
        bassChain: [{ element: 'Bass Guitar', plugin: 'Fruity Blood Overdrive', action: 'Calor de amplificador valvulado' }],
        masterChain: [{ position: 1, plugin: 'Fruity Limiter', action: 'Alvo -13 LUFS' }],
        mixSecret: 'Preserve a dinâmica entre os momentos sussurrados e a explosão de louvor no clímax da música.'
      },
      MODERN: {
        description: 'Produção contemporânea estilo Elevation / Maverick City com pressão de graves e corais modernos.',
        vocalChain: [{ position: 1, plugin: 'Fruity Parametric EQ 2', action: 'Ar de estúdio em 12kHz' }],
        drumsChain: [{ element: 'Snare', plugin: 'Fruity Parametric EQ 2', action: 'Corpo gordo em 180Hz' }],
        bassChain: [{ element: 'Bass + Synth Sub', plugin: 'Maximus', action: 'Controle de graves' }],
        masterChain: [{ position: 1, plugin: 'Fruity Soft Clipper', action: 'Alvo -10 LUFS' }],
        mixSecret: 'Abra o coral (Backing Vocals) em estéreo panorâmico total para envolver a voz do ministro no centro.'
      },
      AGGRESSIVE: {
        description: 'Gospel Rock / Urban Worship de alta energia.',
        vocalChain: [{ position: 1, plugin: 'Fruity Limiter', action: 'Firm compression' }],
        drumsChain: [{ element: 'Drums', plugin: 'Fruity Soft Clipper', action: 'Rock punch' }],
        bassChain: [{ element: 'Bass', plugin: 'WaveShaper', action: 'Grit' }],
        masterChain: [{ position: 1, plugin: 'Fruity Limiter', action: 'Alvo -9 LUFS' }],
        mixSecret: 'Cuidado com o acúmulo de reverb nos graves: use Low Cut em 500Hz no canal de Reverb.'
      }
    },
    keyAdvice: [
      'Guitarras com delay em semínima pontuada (U2 / Hillsong style) criam a textura celestial.',
      'O baixo elétrico precisa conversar diretamente com o bumbo acústico.'
    ]
  },
  {
    id: 'afropop',
    name: 'Afropop',
    origin: 'África Ocidental / Global',
    bpmRange: '100 – 116 BPM',
    modes: {
      CLEAN: {
        description: 'Melodias vocais contagiantes, guitarras highlife limpas e percussão balanceada.',
        vocalChain: [
          { position: 1, plugin: 'Fruity Parametric EQ 2', action: 'Limpeza + Ar suave' },
          { position: 2, plugin: 'Fruity Limiter', action: 'Compressão 3:1' },
          { position: 3, plugin: 'Fruity Delay 3', action: '1/8 Dotted Delay' }
        ],
        drumsChain: [{ element: 'Percs', plugin: 'Fruity Stereo Enhancer', action: 'Estéreo largo' }],
        bassChain: [{ element: 'Bass', plugin: 'Fruity Parametric EQ 2', action: 'Mono low-end' }],
        masterChain: [{ position: 1, plugin: 'Fruity Limiter', action: 'Alvo -11.5 LUFS' }],
        mixSecret: 'As guitarras Highlife brilhantes devem ficar nas laterais do estéreo para não cobrir a voz.'
      },
      MODERN: {
        description: 'Afropop moderno de rádio internacional com 808s macios e vocais em primeiro plano.',
        vocalChain: [{ position: 1, plugin: 'Fruity Blood Overdrive', action: 'Saturação 15%' }],
        drumsChain: [{ element: 'Kick', plugin: 'Fruity Soft Clipper', action: 'Punch' }],
        bassChain: [{ element: '808', plugin: 'WaveShaper', action: 'Warm harmonics' }],
        masterChain: [{ position: 1, plugin: 'Fruity Soft Clipper + Limiter', action: 'Alvo -9.5 LUFS' }],
        mixSecret: 'Ajuste o ataque do compressor da voz para 20ms para que o ritmo do sotaque seja preservado.'
      },
      AGGRESSIVE: {
        description: 'Afropop de pista de dança.',
        vocalChain: [{ position: 1, plugin: 'Fruity Limiter', action: 'High density' }],
        drumsChain: [{ element: 'Drums', plugin: 'Fruity Soft Clipper', action: 'Loudness punch' }],
        bassChain: [{ element: 'Bass', plugin: 'WaveShaper', action: 'Drive' }],
        masterChain: [{ position: 1, plugin: 'Fruity Limiter', action: 'Alvo -8 LUFS' }],
        mixSecret: 'Sidechain nos teclados acionado pelo kick.'
      }
    },
    keyAdvice: [
      'Ritmo alegre com metais e trompetes pontuais.',
      'Equilíbrio entre calor orgânico e fidelidade digital moderna.'
    ]
  },
  {
    id: 'zouk',
    name: 'Zouk & Retro Zouk',
    origin: 'Antilhas Francesas / Caribe',
    bpmRange: '90 – 102 BPM',
    modes: {
      CLEAN: {
        description: 'Baladas caribenhas com sintetizadores vintage, guitarras com chorus e vocais doces.',
        vocalChain: [
          { position: 1, plugin: 'Fruity Parametric EQ 2', action: 'Atenuação de estridência' },
          { position: 2, plugin: 'Fruity Limiter', action: 'Compressor óptico suave' }
        ],
        drumsChain: [{ element: 'Drums', plugin: 'Fruity Parametric EQ 2', action: 'Tom quente' }],
        bassChain: [{ element: 'Bass', plugin: 'Maximus', action: 'Suavização' }],
        masterChain: [{ position: 1, plugin: 'Fruity Limiter', action: 'Alvo -13 LUFS' }],
        mixSecret: 'Chorus e micro-delay nas guitarras e sintetizadores trazem a identidade do Zouk.'
      },
      MODERN: {
        description: 'Zouk moderno com produção digital limpa e batida marcante.',
        vocalChain: [{ position: 1, plugin: 'Fruity Parametric EQ 2', action: 'Brilho sedoso em 12kHz' }],
        drumsChain: [{ element: 'Kick', plugin: 'Fruity Soft Clipper', action: 'Pegada' }],
        bassChain: [{ element: 'Sub', plugin: 'Fruity Blood Overdrive', action: 'Warmth' }],
        masterChain: [{ position: 1, plugin: 'Fruity Limiter', action: 'Alvo -10 LUFS' }],
        mixSecret: 'Mantenha o balanço entre os médios graves para garantir a doçura do arranjo.'
      },
      AGGRESSIVE: {
        description: 'Zouk Bass para sistemas de som pesados.',
        vocalChain: [{ position: 1, plugin: 'Fruity Limiter', action: 'Comp 4:1' }],
        drumsChain: [{ element: 'Drums', plugin: 'Fruity Soft Clipper', action: 'Clip' }],
        bassChain: [{ element: 'Bass', plugin: 'WaveShaper', action: 'Harmônicos' }],
        masterChain: [{ position: 1, plugin: 'Fruity Limiter', action: 'Alvo -8.5 LUFS' }],
        mixSecret: 'Subgrave sólido e focado em mono.'
      }
    },
    keyAdvice: [
      'Guitarras limpas com efeito de chorus e reverb de mola.',
      'Vocais femininos e masculinos em dueto com bom entrosamento estéreo.'
    ]
  },
  {
    id: 'deephouse',
    name: 'Deep House',
    origin: 'Chicago / África do Sul / Europa',
    bpmRange: '120 – 125 BPM',
    modes: {
      CLEAN: {
        description: 'Acordes de Rhodes e sintetizadores quentes, bumbo 4x4 aveludado e linhas de baixo orgânicas.',
        vocalChain: [
          { position: 1, plugin: 'Fruity Parametric EQ 2', action: 'HPF 85Hz' },
          { position: 2, plugin: 'Fruity Delay 3', action: 'Stereo Echo espacial' }
        ],
        drumsChain: [{ element: '4x4 Kick', plugin: 'Fruity Parametric EQ 2', action: 'Punch em 50Hz' }],
        bassChain: [{ element: 'FM / Organ Bass', plugin: 'Fruity Parametric EQ 2', action: 'Mono abaixo de 110Hz' }],
        masterChain: [{ position: 1, plugin: 'Fruity Limiter', action: 'Alvo -11 LUFS' }],
        mixSecret: 'O groove repousa no casamento perfeito entre o kick 4x4 e o contratempo do hi-hat.'
      },
      MODERN: {
        description: 'Deep House contemporâneo com graves potentes e vocais etéreos com sidechain.',
        vocalChain: [{ position: 1, plugin: 'Fruity Reeverb 2', action: 'Large Hall com Sidechain Ducking' }],
        drumsChain: [{ element: 'Drums', plugin: 'Fruity Soft Clipper', action: 'Pegada firme' }],
        bassChain: [{ element: 'Bass', plugin: 'Fruity Blood Overdrive', action: 'Harmônicos para clubes' }],
        masterChain: [{ position: 1, plugin: 'Fruity Soft Clipper + Limiter', action: 'Alvo -9 LUFS' }],
        mixSecret: 'Sidechain do kick em quase todos os canais para criar a respiração da pista de dança.'
      },
      AGGRESSIVE: {
        description: 'Slap House / Club Deep com baixo dominante.',
        vocalChain: [{ position: 1, plugin: 'Fruity Limiter', action: 'Firm' }],
        drumsChain: [{ element: 'Kick', plugin: 'Fruity Soft Clipper', action: 'Pancada' }],
        bassChain: [{ element: 'Slap Bass', plugin: 'WaveShaper', action: 'Distorção agressiva' }],
        masterChain: [{ position: 1, plugin: 'Fruity Limiter', action: 'Alvo -7.5 LUFS' }],
        mixSecret: 'Ataque rápido no limiter para segurar o transiente inicial sem estourar o amplificador.'
      }
    },
    keyAdvice: [
      'Pads quentes com filtro passa-baixa automatizado.',
      'Graves com presença marcante no peito (40Hz-90Hz).'
    ]
  },
  {
    id: 'dancehall',
    name: 'Dancehall',
    origin: 'Jamaica / Caribe',
    bpmRange: '95 – 110 BPM',
    modes: {
      CLEAN: {
        description: 'Riddims pesados, toasters vocais diretos e graves potentes com ar caribenho.',
        vocalChain: [
          { position: 1, plugin: 'Fruity Parametric EQ 2', action: 'HPF a 85Hz + presença em 4kHz' },
          { position: 2, plugin: 'Fruity Limiter', action: 'Compressão rápida 4:1' },
          { position: 3, plugin: 'Fruity Delay 3', action: 'Tape delay dub style' }
        ],
        drumsChain: [{ element: 'Riddim Drums', plugin: 'Fruity Parametric EQ 2', action: 'Punch no kick e rimshot' }],
        bassChain: [{ element: 'Dub Bass', plugin: 'Fruity Parametric EQ 2', action: 'Grave profundo e sólido' }],
        masterChain: [{ position: 1, plugin: 'Fruity Limiter', action: 'Alvo -11 LUFS' }],
        mixSecret: 'Use efeitos estilo Dub (delays com automação de feedback e filtros manuais) nas pontas das frases.'
      },
      MODERN: {
        description: 'Dancehall moderno (estilo Popcaan / Shenseea) com fidelidade internacional e 808s híbridos.',
        vocalChain: [{ position: 1, plugin: 'Fruity Blood Overdrive', action: 'Calor harmônico 20%' }],
        drumsChain: [{ element: 'Drums', plugin: 'Fruity Soft Clipper', action: 'Punch' }],
        bassChain: [{ element: 'Sub 808', plugin: 'WaveShaper', action: 'Harmônicos' }],
        masterChain: [{ position: 1, plugin: 'Fruity Soft Clipper + Limiter', action: 'Alvo -8.5 LUFS' }],
        mixSecret: 'Mantenha a caixa e o bumbo com afinações que casem perfeitamente com a clave rítmica.'
      },
      AGGRESSIVE: {
        description: 'Sound System Ready de alta pressão.',
        vocalChain: [{ position: 1, plugin: 'Fruity Limiter', action: 'Heavy compression' }],
        drumsChain: [{ element: 'Drums', plugin: 'Fruity Soft Clipper', action: 'Hard clip' }],
        bassChain: [{ element: 'Bass', plugin: 'WaveShaper', action: 'Overdrive' }],
        masterChain: [{ position: 1, plugin: 'Fruity Limiter', action: 'Alvo -7.5 LUFS' }],
        mixSecret: 'Subgrave dominante pronto para paredes de alto-falantes (Sound Systems).'
      }
    },
    keyAdvice: [
      'A clave rítmica sincopada do Riddim é a identidade do Dancehall.',
      'Vocal forte e na cara, com presença nos médios para destacar as rimas rápidas.'
    ]
  },
  {
    id: 'afrohouse',
    name: 'Afro House',
    origin: 'África do Sul / Angola / Quênia',
    bpmRange: '120 – 126 BPM',
    modes: {
      CLEAN: {
        description: 'Tambores africanos orgânicos (djembes, congas), sintetizadores tribais e vocais em línguas nativas.',
        vocalChain: [
          { position: 1, plugin: 'Fruity Parametric EQ 2', action: 'HPF a 80Hz' },
          { position: 2, plugin: 'Fruity Reeverb 2', action: 'Espaço etéreo', params: 'Decay 2.5s' }
        ],
        drumsChain: [{ element: 'Tribal Percussions', plugin: 'Fruity Stereo Enhancer', action: 'Estéreo dinâmico' }],
        bassChain: [{ element: 'Bassline', plugin: 'Maximus', action: 'Controle de low-end' }],
        masterChain: [{ position: 1, plugin: 'Fruity Limiter', action: 'Alvo -11 LUFS' }],
        mixSecret: 'Deixe o bumbo 4x4 amarrado com as congas e shakers com diferentes níveis de volume e panorama.'
      },
      MODERN: {
        description: 'Som moderno de Black Coffee / Keinemusik com graves cirúrgicos e sofisticação premium.',
        vocalChain: [{ position: 1, plugin: 'Fruity Parametric EQ 2', action: 'Ar em 14kHz' }],
        drumsChain: [{ element: 'Kick & Toms', plugin: 'Fruity Soft Clipper', action: 'Pegada sólida' }],
        bassChain: [{ element: 'Moog / Synth Bass', plugin: 'Fruity Blood Overdrive', action: 'Harmônicos quentes' }],
        masterChain: [{ position: 1, plugin: 'Fruity Soft Clipper + Limiter', action: 'Alvo -9 LUFS' }],
        mixSecret: 'Crie uma reverberação sutil apenas nos toms e percussões agudas para sensação de ritual ao ar livre.'
      },
      AGGRESSIVE: {
        description: 'Afro Tech de alta intensidade para festivais.',
        vocalChain: [{ position: 1, plugin: 'Fruity Limiter', action: 'Comp' }],
        drumsChain: [{ element: 'Drums', plugin: 'Fruity Soft Clipper', action: 'Punch pesado' }],
        bassChain: [{ element: 'Heavy Bass', plugin: 'WaveShaper', action: 'Distorção' }],
        masterChain: [{ position: 1, plugin: 'Fruity Limiter', action: 'Alvo -7.8 LUFS' }],
        mixSecret: 'Sidechain rítmico bombeando os sintetizadores em sincronia com o bumbo.'
      }
    },
    keyAdvice: [
      'As polirritmias das percussões tribais são o centro da energia da faixa.',
      'Sons de sintetizadores analógicos com filtros de corte suave criam a atmosfera hipnótica.'
    ]
  }
];
