import { ExportProfile } from '../types';

export const exportProfilesData: ExportProfile[] = [
  {
    id: 'master-wav-archival',
    title: 'Master WAV Oficial (Alta Fidelidade)',
    category: 'MASTER',
    format: 'WAV',
    targetLufs: '-12 a -9 LUFS (Conforme o estilo)',
    truePeak: '-1.0 dBTP (Seguro)',
    sampleRate: '44.1 kHz ou 48.0 kHz',
    bitDepth: '24-bit / 32-bit Float',
    description: 'O arquivo definitivo de alta resolução sem perdas para arquivo mestre, distribuição em distribuidoras (DistroKid, TuneCore, CD Baby) e prensagem física.',
    flStudioSettings: {
      resampling: '512-point sinc (Qualidade Máxima)',
      dithering: 'Enabled (Triangular ou Shape Dither se exportar em 24-bit a partir de 32-bit)',
      hqPlugins: true,
      splitMixerTracks: false
    },
    notes: [
      'Sempre exporte em 24-bit ou 32-bit Float para manter o range dinâmico intacto.',
      'Não aplique normalização automática de volume no exportador.',
      'Guarde esse arquivo em backup seguro na nuvem ou HD externo.'
    ]
  },
  {
    id: 'streaming-spotify',
    title: 'Streaming — Spotify & YouTube',
    category: 'STREAMING',
    format: 'WAV',
    targetLufs: '-14 LUFS Integrado',
    truePeak: '-1.0 dBTP a -2.0 dBTP',
    sampleRate: '44.1 kHz',
    bitDepth: '24-bit',
    description: 'Calibrado para os algoritmos de normalização de loudness do Spotify e YouTube, evitando que sua música seja abaixada ou distorcida.',
    flStudioSettings: {
      resampling: '512-point sinc',
      dithering: 'Enabled',
      hqPlugins: true
    },
    notes: [
      'Se sua música for entregue com -9 LUFS, o Spotify irá atenuar o volume para -14 LUFS na reprodução do usuário padrão.',
      'Deixar o True Peak em -1.0 dBTP é crucial para evitar distorção quando o Spotify converter de WAV para Ogg Vorbis / AAC.'
    ]
  },
  {
    id: 'streaming-apple-music',
    title: 'Streaming — Apple Music & TIDAL',
    category: 'STREAMING',
    format: 'WAV',
    targetLufs: '-16 LUFS Integrado',
    truePeak: '-1.0 dBTP',
    sampleRate: '48.0 kHz ou 44.1 kHz (Hi-Res Lossless)',
    bitDepth: '24-bit',
    description: 'Padrão Apple Digital Masters (ADM). Foco em profundidade estéreo, dinâmica aberta e máxima pureza acústica.',
    flStudioSettings: {
      resampling: '512-point sinc',
      dithering: 'Enabled',
      hqPlugins: true
    },
    notes: [
      'A Apple Music utiliza o Sound Check (-16 LUFS). Músicas com dinâmica preservada soam mais impactantes e abertas na plataforma.',
      'Verifique se não há inter-sample peaks acima de -1.0 dBTP.'
    ]
  },
  {
    id: 'client-mp3-preview',
    title: 'Cliente — MP3 de Alta Qualidade (320 kbps)',
    category: 'CLIENTE',
    format: 'MP3',
    targetLufs: 'Idêntico ao Master',
    truePeak: '-1.5 dBTP (Margem extra para MP3)',
    sampleRate: '44.1 kHz',
    bitDepth: '16-bit / 320 kbps CBR',
    description: 'Arquivo leve para audição do cliente em smartphones, envio rápido por WhatsApp, Telegram, e-mail e aprovação de mix.',
    flStudioSettings: {
      resampling: '512-point sinc',
      dithering: 'Enabled',
      hqPlugins: true
    },
    notes: [
      'Sempre utilize taxa de bits constante (CBR) a 320 kbps para máxima qualidade.',
      'O encoder MP3 pode elevar os picos em até +0.5dB a +1.0dB. Uma margem de -1.5 dBTP no master previne distorção no MP3.'
    ]
  },
  {
    id: 'client-stems-multitracks',
    title: 'Cliente — Stems / Faixas Separadas (Mix Multitrack)',
    category: 'CLIENTE',
    format: 'STEMS',
    targetLufs: 'Sem limiter no master',
    truePeak: '< -3.0 dBFS',
    sampleRate: '44.1 kHz / 48.0 kHz',
    bitDepth: '24-bit WAV',
    description: 'Exportação de cada canal do mixer separadamente (Vocal Lead, Backs, Kick, Snare, 808, Synths, FX) para shows ao vivo, remixes ou sincronização de TV/Cinema.',
    flStudioSettings: {
      resampling: '128-point ou 512-point sinc',
      dithering: 'Disabled (evita acúmulo de dither em cada pista)',
      hqPlugins: true,
      splitMixerTracks: true
    },
    notes: [
      'Ative a opção "Split mixer tracks" na janela de exportação do FL Studio.',
      'DESATIVE limiters ou compressores pesados do canal Master antes de exportar as stems.',
      'Nomeie claramente todos os canais do mixer antes de exportar para que as pastas fiquem organizadas.'
    ]
  },
  {
    id: 'client-performance-versions',
    title: 'Cliente — Versões Instrumental & Acapella',
    category: 'CLIENTE',
    format: 'MULTI',
    targetLufs: 'Igual ao Master',
    truePeak: '-1.0 dBTP',
    sampleRate: '44.1 kHz',
    bitDepth: '24-bit WAV + 320kbps MP3',
    description: 'Pacote completo profissional contendo: 1. Versão Oficial | 2. Instrumental | 3. Acapella | 4. Playback TV (com coros).',
    flStudioSettings: {
      resampling: '512-point sinc',
      dithering: 'Enabled',
      hqPlugins: true
    },
    notes: [
      'Entregar as versões instrumental e acapella agrega valor profissional ao seu trabalho e é exigido por contratantes e DJs.'
    ]
  }
];

export const flStudioExportSteps = [
  {
    stepNumber: 1,
    title: 'Passo 1: Acessar a Janela de Exportação',
    action: 'No menu superior do FL Studio, clique em File → Export → Wave file... (ou use o atalho Ctrl + R / Cmd + R).',
    details: 'Selecione a pasta do seu projeto e digite o nome padronizado (Ex: NOME_ARTISTA_TITULO_MASTER_24BIT.wav).'
  },
  {
    stepNumber: 2,
    title: 'Passo 2: Configurações de Formato e Resolução',
    action: 'Defina o formato de saída:',
    details: 'WAV: 24Bit int ou 32Bit float | MP3: 320 kbps CBR (se desejar versão compacta junto).'
  },
  {
    stepNumber: 3,
    title: 'Passo 3: Qualidade de Renderização e Interpolação',
    action: 'Na seção "Quality":',
    details: 'Samplerate: 44100 Hz ou 48000 Hz | Resampling: 512-point sinc (a mais alta fidelidade de áudio) | Marque "HQ for all plugins" | Marque "Disable maximum polyphony".'
  },
  {
    stepNumber: 4,
    title: 'Passo 4: Caudas de Efeitos e Dithering',
    action: 'Na seção "Miscellaneous":',
    details: 'Tail: Selecione "Leave remainder" para não cortar a cauda do reverb e delay no final da música. | Dithering: Marque "Enable dithering" se estiver reduzindo de 32bit para 24bit ou 16bit. | Se for exportar Stems, marque "Split mixer tracks".'
  },
  {
    stepNumber: 5,
    title: 'Passo 5: Iniciar Renderização e Teste',
    action: 'Clique em "Start".',
    details: 'Após a renderização, escute a música exportada em fones de ouvido, no celular e no som do carro para validação real.'
  }
];

export const finalChecklistItems = [
  { id: 'chk-1', title: 'Vocal compreensível e inteligível em todo o arranjo', category: 'Vocal' },
  { id: 'chk-2', title: 'Sem clipping audível ou distorção indesejada', category: 'Dinâmica' },
  { id: 'chk-3', title: 'Kick equilibrado com punch e definição', category: 'Bateria' },
  { id: 'chk-4', title: 'Bass / 808 controlado e 100% afinado no tom da faixa', category: 'Baixo' },
  { id: 'chk-5', title: 'Instrumental abre espaço para o vocal sem competir', category: 'Equilíbrio' },
  { id: 'chk-6', title: 'Sibilância (S e T) domada com De-Esser', category: 'Vocal' },
  { id: 'chk-7', title: 'Graves limpos e focados em mono abaixo de 100Hz', category: 'Fase' },
  { id: 'chk-8', title: 'Mix com folga de Headroom (pelo menos -1.0 dBTP no limiter)', category: 'Master' },
  { id: 'chk-9', title: 'Master comparado em diferentes volumes (alto e bem baixinho)', category: 'Referência' },
  { id: 'chk-10', title: 'Exportação testada em fones, celular e caixas de som', category: 'Entrega' }
];
