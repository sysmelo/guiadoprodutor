export interface MasterStep {
  position: number;
  name: string;
  shortName: string;
  nativePlugin: string;
  fabFilterPlugin: string;
  freePlugin: string;
  functionDesc: string;
  suggestedAction: string;
  importantNote: string;
  color: string;
}

export const masterStepsData: MasterStep[] = [
  {
    position: 1,
    name: '1. PRE-MASTER & GAIN STAGING',
    shortName: 'PRE-MASTER',
    nativePlugin: 'Fruity Balance / Mixer Fader',
    fabFilterPlugin: 'FabFilter Pro-Q 3 (Gain)',
    freePlugin: 'MUtility / Level Meter',
    functionDesc: 'Garantir que o sinal entre no canal Master com folga (Headroom) de -6dB a -3dB de pico.',
    suggestedAction: 'Ajuste os faders individuais das pistas ou um plugin de ganho para que a mixagem bata em -6dB True Peak antes de qualquer plugin.',
    importantNote: 'Nunca inicie a masterização se a sua mixagem já estiver batendo em 0dB ou com a luz vermelha acesa no Master.',
    color: '#3b82f6'
  },
  {
    position: 2,
    name: '2. EQUALIZAÇÃO TONAL',
    shortName: 'EQ TONAL',
    nativePlugin: 'Fruity Parametric EQ 2',
    fabFilterPlugin: 'FabFilter Pro-Q 3 (Linear Phase)',
    freePlugin: 'TDR Nova / SlickEQ',
    functionDesc: 'Limpeza de subgraves desnecessários e correção sutil de equilíbrio tonal em toda a faixa.',
    suggestedAction: 'HPF a 25Hz - 30Hz (corte limpo). Se faltar ar, High-Shelf de +1dB a +1.5dB em 12kHz. Se embolar, corte -1dB em 250Hz.',
    importantNote: 'Na masterização, cortes e reforços de EQ devem ser sutis (geralmente entre 0.5dB e 2dB no máximo).',
    color: '#06b6d4'
  },
  {
    position: 3,
    name: '3. COMPRESSÃO MASTER (GLUE)',
    shortName: 'COMPRESSÃO',
    nativePlugin: 'Maximus / Fruity Limiter (COMP)',
    fabFilterPlugin: 'FabFilter Pro-C 2 (Mastering Style)',
    freePlugin: 'TDR Kotelnikov',
    functionDesc: 'Unir ("colar") todos os instrumentos e baterias em um único corpo sonoro coeso e musical.',
    suggestedAction: 'Ratio baixo (1.5:1 ou 2:1), Ataque lento (30ms a 50ms para preservar o transiente do bumbo), Release musical (100ms ou Auto). Redução de ganho: 1dB a 2dB.',
    importantNote: 'Se a redução de ganho passar de 3dB, você está achatando a dinâmica da sua música.',
    color: '#10b981'
  },
  {
    position: 4,
    name: '4. SATURAÇÃO HARMÔNICA',
    shortName: 'SATURAÇÃO',
    nativePlugin: 'WaveShaper / Blood Overdrive',
    fabFilterPlugin: 'FabFilter Saturn 2',
    freePlugin: 'MSaturator / Softube Saturation Knob',
    functionDesc: 'Adicionar harmônicos quentes e densidade para aumentar o volume percebido sem estourar picos.',
    suggestedAction: 'Saturação muito sutil (2% a 5% de mix) ou emulação de fita analógica (Tape) para colar as frequências altas.',
    importantNote: 'Saturação em excesso no master gera distorção áspera e cansaço auditivo imediato.',
    color: '#eab308'
  },
  {
    position: 5,
    name: '5. IMAGEM ESTÉREO & MONO LOW-END',
    shortName: 'STEREO',
    nativePlugin: 'Fruity Stereo Shaper / Maximus',
    fabFilterPlugin: 'FabFilter Pro-Q 3 (Mid/Side Cut)',
    freePlugin: 'MStereoProcessor / Voxengo SPAN',
    functionDesc: 'Garantir que os graves abaixo de 100Hz fiquem 100% em mono e abrir suavemente os médios/agudos.',
    suggestedAction: 'No Maximus ou Stereo Shaper, coloque o Stereo Separation totalmente em Mono para a banda Low (abaixo de 100Hz).',
    importantNote: 'Graves estéreo causam cancelamento de fase fatal em clubes, fones e caixas de som Bluetooth.',
    color: '#f97316'
  },
  {
    position: 6,
    name: '6. CLIPPER DE TRANSIENTES',
    shortName: 'CLIPPER',
    nativePlugin: 'Fruity Soft Clipper',
    fabFilterPlugin: 'FabFilter Pro-L 2 (Punch / Clip)',
    freePlugin: 'Venn Audio FreeClip / Kclip',
    functionDesc: 'Cortar os micro-picos mais rápidos do Kick e da Caixa antes do sinal chegar ao limiter.',
    suggestedAction: 'Deixe o sinal empurrar suavemente contra o threshold do Soft Clipper para absorver de 1dB a 2dB de picos rápidos.',
    importantNote: 'Isso tira o peso das costas do limiter final, permitindo um master mais alto e sem artefatos de bombeamento.',
    color: '#ef4444'
  },
  {
    position: 7,
    name: '7. TRUE PEAK LIMITER',
    shortName: 'LIMITER',
    nativePlugin: 'Fruity Limiter (Aba LIMIT)',
    fabFilterPlugin: 'FabFilter Pro-L 2',
    freePlugin: 'VladG Limiter No6 / LoudMax',
    functionDesc: 'O teto absoluto de segurança para evitar qualquer clipping digital e atingir o volume comercial alvo.',
    suggestedAction: 'Ceiling: -1.0 dBTP (Streaming seguro) ou -0.3 dBTP (CD). Empurre o ganho de entrada até atingir o LUFS desejado.',
    importantNote: 'Sempre deixe pelo menos -1.0 dB de margem de True Peak para as plataformas de streaming (Spotify/Apple Music) não distorcerem na conversão para AAC/MP3.',
    color: '#a855f7'
  },
  {
    position: 8,
    name: '8. ANÁLISE DE LOUDNESS & LRA',
    shortName: 'LOUDNESS CHECK',
    nativePlugin: 'Wave Candy (Spectrum & Peak)',
    fabFilterPlugin: 'FabFilter Pro-L 2 Metering',
    freePlugin: 'Youlean Loudness Meter Free',
    functionDesc: 'Verificação final com métricas mundiais de EBU R128 (LUFS Integrado, Short-term, True Peak e Dynamic Range).',
    suggestedAction: 'Toque a música do início ao fim e leia o valor de Integrated LUFS.',
    importantNote: 'O ouvido toma a decisão final. Não destrua o balanço musical apenas para ver um número na tela.',
    color: '#ec4899'
  }
];

export const referenceMetersGuide = [
  {
    id: 'peak',
    title: 'True Peak (dBTP)',
    description: 'Nível máximo de pico de sinal analógico reconstruído.',
    target: '-1.0 dBTP a -0.5 dBTP',
    levels: [
      { status: 'VERDE (Seguro)', range: '< -1.0 dBTP', desc: 'Perfeito para streaming e conversão sem distorção.' },
      { status: 'AMARELO (Atenção)', range: '-0.9 a -0.1 dBTP', desc: 'Risco de distorção em conversores de baixa qualidade.' },
      { status: 'VERMELHO (Problema)', range: '>= 0.0 dBTP', desc: 'Clipping digital e distorção audível nas plataformas.' }
    ]
  },
  {
    id: 'lufs',
    title: 'Loudness Integrado (LUFS / LKFS)',
    description: 'Volume médio ponderado pelo ouvido humano ao longo de toda a duração da faixa.',
    target: '-14 LUFS (Spotify) a -8 LUFS (Trap/Club)',
    levels: [
      { status: 'VERDE (Seguro)', range: '-14 a -12 LUFS', desc: 'Equilíbrio padrão para Spotify, Apple Music e YouTube.' },
      { status: 'AMARELO (Atenção)', range: '-11 a -9 LUFS', desc: 'Volume moderno competitivo para Afrobeats, Pop e Hip Hop.' },
      { status: 'VERMELHO (Atenção)', range: '> -8 LUFS', desc: 'Extrema compressão. Verifique se a dinâmica não foi esmagada.' }
    ]
  },
  {
    id: 'headroom',
    title: 'Headroom Pré-Master',
    description: 'Espaço livre entre o pico mais alto da sua mixagem e o teto de 0dBFS.',
    target: '-6.0 dBFS a -3.0 dBFS',
    levels: [
      { status: 'VERDE (Seguro)', range: '-6.0 a -3.0 dBFS', desc: 'Espaço ideal para plugins de masterização trabalharem com folga.' },
      { status: 'AMARELO (Atenção)', range: '-2.9 a -0.5 dBFS', desc: 'Pouca margem para processamento analógico e EQ.' },
      { status: 'VERMELHO (Problema)', range: '> 0.0 dBFS', desc: 'Mixagem clipando na entrada. Reduza o volume das pistas!' }
    ]
  },
  {
    id: 'dynamic-range',
    title: 'Dynamic Range (LRA / RMS)',
    description: 'Diferença entre as partes mais suaves e os momentos mais explosivos da música.',
    target: '5 LU a 10 LU',
    levels: [
      { status: 'VERDE (Seguro)', range: '6 a 10 LU', desc: 'Música viva, com respiração e impacto no refrão.' },
      { status: 'AMARELO (Atenção)', range: '4 a 5 LU', desc: 'Mix bastante compactada (estilo EDM / Trap pesado).' },
      { status: 'VERMELHO (Problema)', range: '< 3 LU', desc: 'Onda sonoro em formato de "bloco de tijolo", sem dinâmica.' }
    ]
  },
  {
    id: 'stereo-width',
    title: 'Correlação de Fase & Stereo Width',
    description: 'Alinhamento de fase entre o canal esquerdo e direito.',
    target: '+0.5 a +1.0',
    levels: [
      { status: 'VERDE (Seguro)', range: '+0.6 a +1.0', desc: 'Fase 100% saudável. Soa perfeitamente quando somado em mono.' },
      { status: 'AMARELO (Atenção)', range: '+0.2 a +0.5', desc: 'Campo estéreo largo, verifique se o vocal não some em mono.' },
      { status: 'VERMELHO (Problema)', range: '< 0.0 (Negativo)', desc: 'Cancelamento de fase destrutivo. O som sumirá em alto-falantes mono!' }
    ]
  }
];
