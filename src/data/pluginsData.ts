import { AudioPlugin } from '../types';

export const audioPluginsData: AudioPlugin[] = [
  // FL STUDIO NATIVES
  {
    id: 'fl-parametric-eq2',
    name: 'Fruity Parametric EQ 2',
    type: 'FL Native',
    category: 'Equalizador',
    level: 'Mix & Master',
    suggestedPosition: 1,
    description: 'Equalizador paramétrico de 7 bandas com visualizador de espectro em tempo real. Ideal para corte cirúrgico e reforço tonal.',
    functions: [
      'High-pass / Low-pass filtering (corte de graves/agudos)',
      'Remoção de ressonâncias pontuais com Q estreito',
      'Modelagem tonal suave com curvas Bell e High Shelf',
      'Análise espectral em tempo real (HQ mode)'
    ],
    suggestedParams: [
      'Vocal HPF: 70Hz - 90Hz (Ordem 4 / 24dB/oct)',
      'Mud Cut: 200Hz - 350Hz (-1.5dB a -3dB com Q moderado)',
      'Presença: 3kHz - 5kHz (+1.5dB a +2.5dB suave)',
      'Ar: 12kHz High Shelf (+1dB a +2dB)'
    ],
    problemsSolved: ['Boxiness (som de caixa)', 'Muddy mix (lama de frequências)', 'Vocal abafado', 'Ressonâncias estridentes'],
    tips: [
      'Ative o botão HQ para reduzir o aliasing nas altas frequências.',
      'Corte estreito para corrigir problemas; amplie o Q para reforços musicais.'
    ],
    warnings: [
      'Evite High-Pass muito alto em vozes masculinas (acima de 120Hz remove o corpo natural).',
      'Não faça cortes cegos: sempre verifique em solo e depois no contexto da música.'
    ]
  },
  {
    id: 'fl-limiter',
    name: 'Fruity Limiter',
    type: 'FL Native',
    category: 'Compressor',
    level: 'Mix & Master',
    suggestedPosition: 2,
    description: 'Poderoso compressor, limiter, gate e visualizador de envelope dinâmico. O gráfico em tempo real permite ver exatamente a redução de ganho.',
    functions: [
      'Controle dinâmico transparente ou agressivo (aba COMP)',
      'Limiting final e proteção contra picos (aba LIMIT)',
      'Noise Gate embutido para limpar respirações e ruídos de fundo',
      'Visualização da curva de compressão em milissegundos'
    ],
    suggestedParams: [
      'Vocal Ratio: 2.5:1 a 4:1',
      'Attack: 10ms a 25ms (permite os transientes passarem)',
      'Release: 60ms a 120ms (ajustado ao andamento da música)',
      'Gain Reduction Alvo: 2dB a 5dB nos picos mais fortes'
    ],
    problemsSolved: ['Vocal sumindo na mix', 'Picos descontrolados', 'Falta de consistência dinâmica'],
    tips: [
      'Use o visor verde para ver se o compressor está liberando a tempo para o próximo golpe/frase.',
      'Na aba LIMIT, ajuste o CEIL para -0.3dB a -1.0dB para evitar True Peak clipping.'
    ],
    warnings: [
      'Cuidado com ATTACK em 0ms: esmaga os transientes do vocal ou kick, deixando-os sem impacto.',
      'Se o som soar sem vida ou sufocado, diminua a redução de ganho.'
    ]
  },
  {
    id: 'fl-maximus',
    name: 'Maximus',
    type: 'FL Native',
    category: 'Compressor',
    level: 'Mix & Master',
    suggestedPosition: 3,
    description: 'Compressor e expansor multibanda com 3 bandas independentes (Low, Mid, High) + Master band e saturação embutida.',
    functions: [
      'De-essing cirúrgico (isolando a banda High entre 4k-9k)',
      'Controle multibanda de graves e agudos',
      'Saturação harmônica por banda (Saturation knob)',
      'Maximização e controle de dinâmica no Master'
    ],
    suggestedParams: [
      'De-Esser Mode: Banda HIGH ativa (4.5kHz a 9kHz) com threshold controlado',
      'Low Band: Manter em mono abaixo de 100Hz usando o Stereo Sep knob',
      'Master Band: Compressão sutil com ratio 1.5:1 para colar a mix'
    ],
    problemsSolved: ['Sibilância descontrolada', 'Graves fora de fase', 'Falta de volume no master'],
    tips: [
      'Use o preset "De-Esser" ou "Clean Master" como excelente ponto de partida.',
      'Gire o botão Stereo Sep da banda LOW totalmente para a direita para forçar mono nos graves.'
    ],
    warnings: [
      'Evite o preset "Soundgoodizer style" se sua mix já estiver densa, para não distorcer os médios.'
    ]
  },
  {
    id: 'fl-soft-clipper',
    name: 'Fruity Soft Clipper',
    type: 'FL Native',
    category: 'Limiter & Clipper',
    level: 'Mix & Master',
    suggestedPosition: 6,
    description: 'Clipper suave analógico que arredonda os picos mais rápidos sem adicionar a compressão "pumping" de um limiter.',
    functions: [
      'Retenção de transientes de bateria e 808',
      'Aumento de loudness antes do limiter final',
      'Distorção suave quando empurrado contra o teto'
    ],
    suggestedParams: [
      'Threshold: Padrão (2 horas) ou ligeiramente ajustado',
      'Post Gain: 0dB',
      'Entrada: Bateria ou Mix entrando com picos em torno de 0dB a +1.5dB'
    ],
    problemsSolved: ['Perda de punch da bateria no master', 'Kick perdendo pressão quando comprimido'],
    tips: [
      'Coloque ANTES do Fruity Limiter no Master para cortar os picos do kick antes que o limiter tenha que trabalhar.',
      'Essencial para Trap, Drill, Afrobeat e Hip Hop moderno.'
    ],
    warnings: [
      'Não exagere no ganho de entrada para não gerar distorção audível áspera em vocais e pratos.'
    ]
  },
  {
    id: 'fl-blood-overdrive',
    name: 'Fruity Blood Overdrive',
    type: 'FL Native',
    category: 'Saturação / Distorção',
    level: 'Mix',
    suggestedPosition: 5,
    description: 'Saturador analógico clássico com filtro passa-baixa e pré-amplificação de harmônicos quentes.',
    functions: [
      'Aquecimento de vocais digitais frios',
      'Adição de harmônicos no 808 para ser audível em celulares',
      'Cola de grupos de sintetizadores e baterias'
    ],
    suggestedParams: [
      'Pre-Band: 0.2 a 0.4',
      'Color: 4kHz a 7kHz',
      'Drive: 0.1 a 0.3 (suave) ou 0.6 (agressivo)',
      'Post Gain: Compensar volume de saída'
    ],
    problemsSolved: ['808 inaudível em alto-falantes pequenos', 'Vocal magro ou estéril'],
    tips: ['Adicione saturação suave e diminua o volume da pista para o mesmo nível anterior (gain matching).'],
    warnings: ['Saturação em excesso traz ruído de fundo e sibilância à tona.']
  },
  {
    id: 'fl-waveshaper',
    name: 'Fruity WaveShaper',
    type: 'FL Native',
    category: 'Saturação / Distorção',
    level: 'Mix',
    suggestedPosition: 5,
    description: 'Processador de distorção baseado em gráfico que altera a forma de onda do sinal de forma totalmente visual.',
    functions: [
      'Criação de saturação de fita ou tubo personalizada',
      'Soft clipping preciso desenhado à mão',
      'Hard distortion para guitarras e baixos industriais'
    ],
    suggestedParams: [
      'Saturação Leve: Curva suavemente arqueada para cima no centro',
      'Oversampling: 2x ou 4x (aba Options) para reduzir aliasing'
    ],
    problemsSolved: ['Falta de corpo no som', 'Transientes excessivamente pontiagudos'],
    tips: ['Ative HQ Oversampling no menu de opções do plugin.'],
    warnings: ['Mudanças milimétricas no gráfico causam grandes alterações sonoras.']
  },
  {
    id: 'fl-reeverb2',
    name: 'Fruity Reeverb 2',
    type: 'FL Native',
    category: 'Reverb & Espaço',
    level: 'Bus & Send',
    suggestedPosition: 6,
    description: 'Algoritmo de reverberação flexível com controle total de pré-delay, tamanho da sala, difusão e corte de frequências.',
    functions: [
      'Criação de profundidade tridimensional para vocais e instrumentos',
      'Corte de graves embutido no reverb (Low Cut) para não embolar a mix',
      'Damping para simular materiais reflexivos ou absorventes'
    ],
    suggestedParams: [
      'Vocal Plate/Hall: Pre-delay 20ms - 40ms (mantém a voz na frente)',
      'Low Cut: 300Hz - 500Hz (Fundamental para não sujar o baixo)',
      'High Cut: 6kHz - 8kHz (Evita reverb estridente)',
      'Dry: 0% (em canal Send) / Wet: 100%'
    ],
    problemsSolved: ['Mix muito seca e artificial', 'Instrumentos sem profundidade'],
    tips: [
      'SEMPRE use reverb em uma faixa Send (Canal de Envio) ao invés de direto no canal do vocal.',
      'Equalize o canal de Reverb cortando 500Hz e 3kHz para abrir espaço para o vocal seco.'
    ],
    warnings: ['Reverb com graves abertos abaixo de 200Hz destrói a clareza da mixagem inteira.']
  },
  {
    id: 'fl-delay3',
    name: 'Fruity Delay 3',
    type: 'FL Native',
    category: 'Delay',
    level: 'Bus & Send',
    suggestedPosition: 6,
    description: 'Delay analógico e digital moderno com modulação, saturação de fita, filtros passa-alta/baixa e modos Ping Pong.',
    functions: [
      'Ecos sincronizados ao andamento (1/4, 1/8, 1/8 Dotted)',
      'Sensação de largura estéreo com modo Ping Pong',
      'Saturação e modulação de fita (Wow/Flutter vintage)'
    ],
    suggestedParams: [
      'Tempo Sync: ON (1/4 beat para baladas, 1/8 Dotted para ritmo moderno)',
      'Feedback: 25% a 40%',
      'High Pass: 350Hz (remove eco de graves)',
      'Low Pass: 4.5kHz (eco mais escuro e atrás da voz)'
    ],
    problemsSolved: ['Sensação de vazio nas pausas do vocal', 'Falta de movimento rítmico'],
    tips: [
      'Adicione um compressor com Sidechain no canal do Delay acionado pelo vocal: o delay baixa quando o cantor canta e sobe nas pausas (Ducking Delay).'
    ],
    warnings: ['Feedback muito longo causa acúmulo de som confuso.']
  },
  {
    id: 'fl-wave-candy',
    name: 'Wave Candy',
    type: 'FL Native',
    category: 'Analisador & Medição',
    level: 'Master',
    suggestedPosition: 8,
    description: 'Ferramenta de visualização visual com osciloscópio, espectrográfico e medidor de pico com precisão cirúrgica.',
    functions: [
      'Análise de espectro visual contínuo',
      'Identificação visual de frequências ressonantes',
      'Medição de picos estéreo'
    ],
    suggestedParams: ['Mode: Spectrum', 'Resolution: Máxima', 'Color scheme: High Contrast'],
    problemsSolved: ['Dificuldade em enxergar acúmulo de frequências graves e ressonâncias'],
    tips: ['Deixe o Wave Candy aberto em um segundo monitor durante a sessão.'],
    warnings: ['Lembre-se: use os olhos como guia secundário; o ouvido é o juiz final.']
  },

  // FABFILTER SUITE (EXTERNAL PRO)
  {
    id: 'fabfilter-pro-q3',
    name: 'FabFilter Pro-Q 3',
    type: 'FabFilter',
    category: 'Equalizador',
    level: 'Mix & Master',
    suggestedPosition: 1,
    description: 'Padrão da indústria para equalização dinâmica, cirúrgica e linear phase. Oferece até 24 bandas com processamento Mid/Side.',
    functions: [
      'EQ Dinâmico por banda (comprime a frequência apenas quando ela passa do limite)',
      'Processamento Mid/Side e Left/Right independente',
      'Modo Linear Phase para masterização sem distorção de fase',
      'Comparação de espectro com outras pistas (Spectrum Grab & Collision Detection)'
    ],
    suggestedParams: [
      'De-Mud Dinâmico: 250Hz com Dynamic Range de -3dB',
      'Mid/Side Master: Cortar graves abaixo de 100Hz no canal SIDE',
      'Presença: 4kHz com curva Bell dinâmica suave'
    ],
    problemsSolved: ['Conflito de frequências entre kick e baixo', 'Ressonâncias intermitentes', 'Graves estéreo descontrolados'],
    tips: [
      'Clique com o botão direito em uma banda e selecione "Make Dynamic" para controlar ressonâncias apenas quando o cantor gritar.',
      'Use o filtro Low Cut no canal SIDE a 120Hz para garantir graves perfeitamente em mono.'
    ],
    warnings: ['Linear Phase mode adiciona latência; evite durante a gravação ao vivo.']
  },
  {
    id: 'fabfilter-pro-c2',
    name: 'FabFilter Pro-C 2',
    type: 'FabFilter',
    category: 'Compressor',
    level: 'Mix & Master',
    suggestedPosition: 2,
    description: 'Compressor premium com 8 estilos de compressão distintos (Vocal, Clean, Classic, Bus, Punch, Mastering, etc.).',
    functions: [
      'Algoritmos especializados para cada tipo de elemento',
      'Sidechain EQ avançado com filtros integrados',
      'Visualização animada de envelope de nível e ganho',
      'Processamento Mid/Side com controle de link estéreo'
    ],
    suggestedParams: [
      'Style: Vocal (ataque adaptativo e curva musical)',
      'Lookahead: 1ms a 2ms para capturar picos rápidos',
      'Sidechain HPF: 120Hz para o compressor não responder apenas ao grave'
    ],
    problemsSolved: ['Compressão com artefatos de pumping indesejados', 'Inconsistência de presença'],
    tips: ['No Master Bus, use o estilo "Bus" ou "Mastering" com 2:1 e Knee suave.'],
    warnings: ['Ajuste sempre o Auto Gain ou faça ganho manual para comparar antes/depois com volumes idênticos.']
  },
  {
    id: 'fabfilter-pro-ds',
    name: 'FabFilter Pro-DS',
    type: 'FabFilter',
    category: 'De-Esser',
    level: 'Mix',
    suggestedPosition: 3,
    description: 'De-esser inteligente com algoritmo "Single Vocal" que detecta sibilância em tempo real sem afetar a voz cantada.',
    functions: [
      'Detecção inteligente de Sibilâncias (S, T, CH, SH)',
      'Modo All Round para buses de bateria ou instrumentos brilhantes',
      'Audition sidechain para ouvir exatamente o que está sendo filtrado'
    ],
    suggestedParams: [
      'Mode: Single Vocal',
      'Range: 5kHz a 10kHz',
      'Reduction: 3dB a 6dB de atenuação nos S'
    ],
    problemsSolved: ['Sibilância penetrante nos fones de ouvido', 'Pratos de bateria ásperos'],
    tips: ['Use o botão Audition (fone de ouvido) para isolar a frequência exata da sibilância do artista.'],
    warnings: ['De-essing agressivo demais fará o cantor parecer que está com a língua presa (efeito lisp).']
  },
  {
    id: 'fabfilter-pro-l2',
    name: 'FabFilter Pro-L 2',
    type: 'FabFilter',
    category: 'Limiter & Clipper',
    level: 'Master',
    suggestedPosition: 7,
    description: 'True Peak Limiter de referência mundial para masterização profissional, com medição EBU R128 / ITU-R BS.1770 integrada.',
    functions: [
      '8 algoritmos de limiting (Transparent, Modern, Dynamic, Aggressive, etc.)',
      'Medição de LUFS (Integrated, Short-term, Momentary)',
      'True Peak Limiting para prevenir distorção na conversão MP3/AAC',
      'DC Offset removal e Dithering de alta fidelidade'
    ],
    suggestedParams: [
      'Style: Modern ou Transparent',
      'True Peak Limiting: Ativado',
      'Out Ceiling: -1.0 dBTP (para streaming seguro)',
      'Target LUFS: -14 LUFS (Spotify) ou -9 a -7 LUFS (Trap/Club)'
    ],
    problemsSolved: ['Inter-sample peaks (distorção em MP3)', 'Falta de volume competitivo sem distorção'],
    tips: ['Para música urbana (Afrobeat, Trap, Drill), experimente o estilo "Aggressive" ou "Punchy" com ataque rápido.'],
    warnings: ['Não sacrifique a dinâmica da música apenas para alcançar números de volume excessivos.']
  },

  // FREE PLUGINS (GRATUITOS)
  {
    id: 'free-tdr-nova',
    name: 'TDR Nova (Tokyo Dawn Records)',
    type: 'Free External',
    category: 'Equalizador',
    level: 'Mix & Master',
    suggestedPosition: 1,
    isFree: true,
    description: 'Equalizador dinâmico paralelo gratuito de alta precisão. Uma das melhores ferramentas gratuitas do mundo.',
    functions: [
      'Equalização paramétrica tradicional de 4 bandas',
      'Compressão dinâmica por banda independente',
      'Filtros passa-alta e passa-baixa de alta ordem',
      'Analisador de espectro em tempo real'
    ],
    suggestedParams: ['Banda 2: 250Hz com Threshold dinâmico ativado', 'Banda 4: 10kHz com reforço suave'],
    problemsSolved: ['Lama de médios graves', 'Vocal instável em determinadas notas'],
    tips: ['Ideal como alternativa gratuita de nível profissional ao FabFilter Pro-Q 3.'],
    warnings: ['Processamento em modo "Insane" consome mais CPU.']
  },
  {
    id: 'free-tdr-kotelnikov',
    name: 'TDR Kotelnikov',
    type: 'Free External',
    category: 'Compressor',
    level: 'Master',
    suggestedPosition: 2,
    isFree: true,
    description: 'Compressor de masterização transparente que não colore o som, controlando a dinâmica com naturalidade absoluta.',
    functions: [
      'Processamento de picos e RMS desacoplados',
      'Filtro passa-alta no sidechain integrado',
      'Controle estéreo independente e Delta monitoring'
    ],
    suggestedParams: ['Ratio: 1.5:1 a 2:1', 'Attack: 30ms - 50ms', 'Release: Auto', 'Gain Reduction: 1dB - 2dB'],
    problemsSolved: ['Perda de dinâmica ao colar a mixagem no Master'],
    tips: ['Ative o HPF no Sidechain em 80Hz para que o bumbo não cause compressão em toda a música.'],
    warnings: ['Não use se você estiver procurando uma compressão com cor analógica quente; ele é 100% limpo.']
  },
  {
    id: 'free-youlean-loudness',
    name: 'Youlean Loudness Meter Free',
    type: 'Free External',
    category: 'Analisador & Medição',
    level: 'Master',
    suggestedPosition: 8,
    isFree: true,
    description: 'Medidor de loudness padrão da indústria gratuito para garantir conformidade com Spotify, YouTube, Apple Music e broadcast.',
    functions: [
      'Medição de LUFS Integrado, Short-term e Momentary',
      'Medidor True Peak Max (dBTP)',
      'Dynamic Range (LRA) e histograma de volume no tempo',
      'Presets dedicados para plataformas de streaming'
    ],
    suggestedParams: ['Target: -14 LUFS (Spotify) ou -16 LUFS (Apple Music)', 'True Peak: Max -1.0 dBTP'],
    problemsSolved: ['Música sendo atenuada pelas plataformas de streaming por excesso de volume'],
    tips: ['Coloque como o ÚLTIMO plugin absoluto na cadeia do Master.'],
    warnings: ['Resete a medição ao iniciar a reprodução da música do começo ao fim para o cálculo correto de Integrated LUFS.']
  },
  {
    id: 'free-voxengo-span',
    name: 'Voxengo SPAN',
    type: 'Free External',
    category: 'Analisador & Medição',
    level: 'Master',
    suggestedPosition: 8,
    isFree: true,
    description: 'Analisador de espectro de áudio por FFT profissional, gratuito e extremamente customizável.',
    functions: [
      'Análise de frequências com decaimento suave',
      'Medição de correlação de fase e balanço estéreo',
      'Comparação de espectro A/B entre duas faixas'
    ],
    suggestedParams: ['Block Size: 4096 ou 8192', 'Slope: 4.5dB/oct (curva padrão de equilíbrio tonal)'],
    problemsSolved: ['Erros de fase entre microfones', 'Desequilíbrio de graves que não são ouvidos na sala'],
    tips: ['Ajuste o "Slope" para 4.5 dB para que uma mixagem equilibrada pareça reta na tela.'],
    warnings: ['Não tente forçar o espectro a ficar perfeitamente reto: confie nos seus ouvidos!']
  },
  {
    id: 'free-melda-mfreefx',
    name: 'MeldaProduction MFreeFXBundle',
    type: 'Free External',
    category: 'Stereo & Utility',
    level: 'Mix & Master',
    suggestedPosition: 5,
    isFree: true,
    description: 'Pacote com mais de 30 plugins de alta qualidade, incluindo MSaturator, MEqualizer, MUtility, MCompressor e MOscillator.',
    functions: [
      'Saturação harmônica com controle de ordem de harmônicos',
      'Utilitários de ganho, fase e mono-maker para graves',
      'Equalização com curvas de saturação analógica'
    ],
    suggestedParams: ['MSaturator: 10% a 25% para calor harmônico no vocal'],
    problemsSolved: ['Falta de ferramentas analíticas e modelagem de estéreo no arsenal gratuito'],
    tips: ['O plugin MStereoProcessor é excelente para abrir o campo estéreo dos pratos e sintetizadores.'],
    warnings: ['A interface do Melda é densa; salve seus próprios presets para agilizar a sessão.']
  }
];
