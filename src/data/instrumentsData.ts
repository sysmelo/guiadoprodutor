import { InstrumentGuide } from '../types';

export const instrumentsData: InstrumentGuide[] = [
  // --- VOCAL CATEGORY ---
  {
    id: 'vocal-principal',
    name: 'Vocal Principal (Lead Vocal)',
    category: 'VOCAL',
    freqFocus: {
      cut: 'HPF a 80Hz - 100Hz (elimina rumble e ruído de chão)',
      body: '150Hz - 250Hz (calor e corpo tonal da voz)',
      presence: '3.5kHz - 5kHz (presença focal e inteligibilidade)',
      airOrPunch: '11kHz - 14kHz (ar e brilho moderno)'
    },
    compressionSettings: {
      ratio: '3:1 a 4:1',
      attack: '15ms - 25ms (preserva transientes das consoantes)',
      release: '80ms - 120ms (recuperação musical com o andamento)',
      gainReduction: '3dB a 6dB nos momentos mais fortes'
    },
    stereoPlacement: 'Mono (Centro)',
    saturationRec: 'SUAVE',
    flPluginChain: [
      '1. Fruity Parametric EQ 2 (Corte HPF 85Hz + De-Mud em 300Hz)',
      '2. Fruity Limiter (Compressor dinâmico com 4:1)',
      '3. Maximus (De-Esser em 5.5kHz - 8kHz)',
      '4. Fruity Parametric EQ 2 (Reforço tonal +2dB em 4kHz e +2dB em 12kHz)',
      '5. Fruity Blood Overdrive (Saturação harmônica 15% mix)',
      '6. Sends para Reverb 2 e Delay 3'
    ],
    expertTips: [
      'Mantenha o vocal principal 100% no centro para ancorar a música.',
      'Sempre use compressão serial (2 compressores leves em vez de um pesado).'
    ]
  },
  {
    id: 'vocal-back',
    name: 'Back Vocal (Backing Vocals / Dobras)',
    category: 'VOCAL',
    freqFocus: {
      cut: 'HPF mais alto: 120Hz - 160Hz (deixa espaço para o lead)',
      body: '200Hz - 300Hz (atenuar para não embolar)',
      presence: '2.5kHz - 4kHz (reduzir suavemente para ficar atrás)',
      airOrPunch: '10kHz+ (reforçar para textura brilhante e estéreo)'
    },
    compressionSettings: {
      ratio: '4:1 a 6:1 (mais comprimido para ficar uniforme)',
      attack: '5ms - 10ms (ataque mais rápido para recuar no plano)',
      release: '100ms',
      gainReduction: '5dB a 8dB'
    },
    stereoPlacement: 'Sides / Panning',
    saturationRec: 'SUAVE',
    flPluginChain: [
      '1. Fruity Parametric EQ 2 (HPF 140Hz + Corte 3.5kHz)',
      '2. Fruity Stereo Shaper / Pan L & R (Abertura estéreo)',
      '3. Fruity Limiter (Compressão firme para colar o grupo)',
      '4. Fruity Reeverb 2 (Reverb mais molhado com 25% wet)'
    ],
    expertTips: [
      'Faça o pan de dobras vocais: uma 80% para a esquerda e outra 80% para a direita.',
      'Corte frequências médias de presença (3kHz) nos backing vocals para que o vocal principal brilhe sem esforço.'
    ]
  },
  {
    id: 'vocal-adlibs',
    name: 'Adlibs & Efeitos Vocais',
    category: 'VOCAL',
    freqFocus: {
      cut: 'HPF a 250Hz + LPF a 4.5kHz (efeito telefone / rádio opcional)',
      body: 'Atenuado',
      presence: 'Distorcido ou saturado',
      airOrPunch: 'Processado com delay ping-pong'
    },
    compressionSettings: {
      ratio: '6:1 ou Hard Limiting',
      attack: '5ms',
      release: '60ms',
      gainReduction: '6dB a 10dB'
    },
    stereoPlacement: 'Sides / Panning',
    saturationRec: 'FORTE',
    flPluginChain: [
      '1. Fruity Parametric EQ 2 (Filtro Band-Pass estilo telefone)',
      '2. Fruity Fast Dist / Blood Overdrive (Distorção aparente)',
      '3. Fruity Delay 3 (Modo Ping-Pong 1/8 Dotted)',
      '4. Fruity Reeverb 2 (Large Hall com 40% wet)'
    ],
    expertTips: [
      'Automatize o pan das adlibs para dançarem ao redor da cabeça do ouvinte.',
      'Use efeitos criativos como flanger, chorus ou pitch-shifter de oitava.'
    ]
  },
  {
    id: 'vocal-masculina',
    name: 'Voz Masculina',
    category: 'VOCAL',
    freqFocus: {
      cut: 'HPF a 70Hz - 85Hz',
      body: '120Hz - 180Hz (fundamentais graves do peito)',
      presence: '2.5kHz - 4kHz (mordida e clareza)',
      airOrPunch: '10kHz - 12kHz'
    },
    compressionSettings: {
      ratio: '3.5:1',
      attack: '20ms',
      release: '90ms',
      gainReduction: '3dB a 5dB'
    },
    stereoPlacement: 'Mono (Centro)',
    saturationRec: 'SUAVE',
    flPluginChain: [
      '1. Fruity Parametric EQ 2 (Corte cuidadoso do HPF em 75Hz)',
      '2. Fruity Limiter (Compressão musical)',
      '3. Maximus (De-Esser em 5.5kHz)',
      '4. Fruity Blood Overdrive (Aquecimento harmônico de médios)'
    ],
    expertTips: [
      'Cuidado ao cortar 150Hz para não remover a masculinidade e autoridade do timbre.'
    ]
  },
  {
    id: 'vocal-feminina',
    name: 'Voz Feminina',
    category: 'VOCAL',
    freqFocus: {
      cut: 'HPF a 90Hz - 120Hz',
      body: '200Hz - 300Hz',
      presence: '3.5kHz - 6kHz',
      airOrPunch: '12kHz - 16kHz (ar e brilho sedoso)'
    },
    compressionSettings: {
      ratio: '3:1',
      attack: '15ms',
      release: '80ms',
      gainReduction: '3dB a 5dB'
    },
    stereoPlacement: 'Mono (Centro)',
    saturationRec: 'SUAVE',
    flPluginChain: [
      '1. Fruity Parametric EQ 2 (HPF 100Hz + De-box 400Hz)',
      '2. Fruity Limiter (Compressão transparente)',
      '3. Maximus (De-Esser calibrado para 6.5kHz - 8.5kHz)',
      '4. Fruity Parametric EQ 2 (High Shelf de ar em 13kHz)'
    ],
    expertTips: [
      'Vozes femininas tendem a ter sibilâncias mais altas (6k-9kHz). Calibre o De-Esser com precisão.'
    ]
  },
  {
    id: 'vocal-rap',
    name: 'Rap Vocal (Trap / Drill / Hip Hop)',
    category: 'VOCAL',
    freqFocus: {
      cut: 'HPF a 85Hz',
      body: '140Hz - 220Hz (peso e autoridade rítmica)',
      presence: '3.5kHz - 5.5kHz (articulação rápida e direta na cara)',
      airOrPunch: '10kHz+ (brilho moderno e polido)'
    },
    compressionSettings: {
      ratio: '4:1 a 6:1 (alta densidade para ficar colado no microfone)',
      attack: '8ms - 15ms (rápido o suficiente para segurar sílabas velozes)',
      release: '50ms - 80ms (recuperação super rápida)',
      gainReduction: '5dB a 8dB'
    },
    stereoPlacement: 'Mono (Centro)',
    saturationRec: 'MÉDIA',
    flPluginChain: [
      '1. Fruity Parametric EQ 2 (HPF 85Hz + boost de 3dB em 4.5kHz)',
      '2. Fruity Limiter (Compressor com Ratio 4:1 e ataque rápido)',
      '3. Maximus (De-Esser ativo)',
      '4. Fruity Soft Clipper (Arredondamento de picos com saturação)',
      '5. Fruity Delay 3 (1/8 Dotted com Sidechain Ducking)'
    ],
    expertTips: [
      'O vocal de Rap precisa soar imóvel na frente dos 808s e Kicks. Use compressão forte e saturação para consistência.'
    ]
  },
  {
    id: 'vocal-singing',
    name: 'Singing Vocal (Afrobeat / R&B / Pop)',
    category: 'VOCAL',
    freqFocus: {
      cut: 'HPF a 80Hz',
      body: '180Hz - 260Hz (riqueza melódica)',
      presence: '3.8kHz - 5kHz (emoção e clareza)',
      airOrPunch: '12kHz - 16kHz (ar de estúdio)'
    },
    compressionSettings: {
      ratio: '2.5:1 a 3.5:1 (preserva a dinâmica emocional)',
      attack: '25ms (deixa a respiração e notas fluírem)',
      release: '120ms (suave)',
      gainReduction: '2dB a 4dB'
    },
    stereoPlacement: 'Mono (Centro)',
    saturationRec: 'SUAVE',
    flPluginChain: [
      '1. Fruity Parametric EQ 2 (Limpeza suave)',
      '2. Fruity Limiter (Compressão óptica musical)',
      '3. Fruity Parametric EQ 2 (Tonal air boost)',
      '4. Fruity Delay 3 + Reeverb 2 nos canais de Envio'
    ],
    expertTips: [
      'Automatize o volume das frases em vez de amassar a voz com compressores.'
    ]
  },

  // --- DRUMS CATEGORY ---
  {
    id: 'drum-kick',
    name: 'Kick (Bumbo Acústico / Eletrônico)',
    category: 'DRUMS',
    freqFocus: {
      cut: 'HPF a 25Hz - 35Hz (subgraves inaudíveis)',
      body: '45Hz - 65Hz (peso do sub) ou 80Hz - 100Hz (punch do bumbo acústico)',
      presence: '2.5kHz - 4.5kHz (o "click" do batedor do kick)',
      airOrPunch: '300Hz - 500Hz (CORTAR aqui para limpar o som de caixa)'
    },
    compressionSettings: {
      ratio: '3:1 a 5:1',
      attack: '30ms (lento para deixar o transiente inicial passar intacto)',
      release: '40ms - 70ms (ajustado à cauda do kick)',
      gainReduction: '2dB a 4dB'
    },
    stereoPlacement: 'Mono (Centro)',
    sidechainTip: 'Envie sinal de Sidechain do Kick para o 808/Bass para atenuar o baixo quando o kick bater.',
    saturationRec: 'SUAVE',
    flPluginChain: [
      '1. Fruity Parametric EQ 2 (HPF 30Hz + corte de 3dB em 350Hz + boost no click em 3.5kHz)',
      '2. Fruity Limiter (Compressão com ataque em 30ms para preservar o snap)',
      '3. Fruity Soft Clipper (Adiciona punch sem clipping digital estridente)'
    ],
    expertTips: [
      'O kick deve ser 100% mono. Nunca use efeitos estéreo no bumbo.',
      'Ajuste o tom (Pitch) do sample do kick para casar com o tom da música.'
    ]
  },
  {
    id: 'drum-snare',
    name: 'Snare (Caixa)',
    category: 'DRUMS',
    freqFocus: {
      cut: 'HPF a 80Hz - 100Hz',
      body: '180Hz - 240Hz (o "corpo/peso" do tambor)',
      presence: '3kHz - 5kHz (o estalo/ataque frontal)',
      airOrPunch: '8kHz - 10kHz (o ruído da esteira da caixa)'
    },
    compressionSettings: {
      ratio: '4:1',
      attack: '15ms - 25ms (deixa o estalo passar)',
      release: '80ms - 120ms',
      gainReduction: '3dB a 6dB'
    },
    stereoPlacement: 'Mono (Centro)',
    saturationRec: 'MÉDIA',
    flPluginChain: [
      '1. Fruity Parametric EQ 2 (HPF 90Hz + boost em 200Hz para peso + boost em 4kHz)',
      '2. Fruity Limiter (Compressor com ataque moderado)',
      '3. Fruity Blood Overdrive (Saturação para harmônicos)',
      '4. Fruity Reeverb 2 (Gated Reverb ou Plate sutil de 1s)'
    ],
    expertTips: [
      'Para caixas sem corpo, aumente 200Hz; para caixas sem estalo, aumente 3.5kHz.',
      'Um reverb de placa curto (0.8s) com pré-delay dá tamanho e atmosfera.'
    ]
  },
  {
    id: 'drum-clap',
    name: 'Clap (Palma)',
    category: 'DRUMS',
    freqFocus: {
      cut: 'HPF a 120Hz',
      body: '400Hz - 800Hz',
      presence: '2kHz - 5kHz',
      airOrPunch: '8kHz - 12kHz'
    },
    compressionSettings: {
      ratio: '3:1',
      attack: '10ms',
      release: '60ms',
      gainReduction: '2dB a 4dB'
    },
    stereoPlacement: 'Estéreo Estreito',
    saturationRec: 'SUAVE',
    flPluginChain: [
      '1. Fruity Parametric EQ 2 (HPF a 130Hz)',
      '2. Fruity Stereo Enhancer (Abertura sutil de 10-15%)',
      '3. Fruity Limiter (Controle de picos)'
    ],
    expertTips: [
      'Combine uma palma seca no centro com uma palma mais aberta com micro-delay nas laterais.'
    ]
  },
  {
    id: 'drum-hihat',
    name: 'Hi-Hat (Chimbal Aberto / Fechado / Rolls)',
    category: 'DRUMS',
    freqFocus: {
      cut: 'HPF a 300Hz - 400Hz (corta todo o grave e médio-grave)',
      body: '1kHz - 2kHz (corpo metálico)',
      presence: '5kHz - 8kHz (clareza do toque da baqueta)',
      airOrPunch: '10kHz - 15kHz (brilho e definição)'
    },
    compressionSettings: {
      ratio: '2:1 ou sem compressão (manter dinâmica das velocities)',
      attack: '20ms',
      release: '50ms',
      gainReduction: '1dB a 2dB máximo'
    },
    stereoPlacement: 'Sides / Panning',
    saturationRec: 'OFF',
    flPluginChain: [
      '1. Fruity Parametric EQ 2 (HPF a 350Hz + corte de ressonâncias metálicas)',
      '2. Fruity PanOMatic / Panning (Ligeiramente deslocado 15% L ou R)'
    ],
    expertTips: [
      'Varie as velocities no piano roll do FL Studio para dar humanização e ritmo natural.',
      'Corte ressonâncias pontuais com Q fino entre 3kHz e 6kHz para não ferir os ouvidos.'
    ]
  },
  {
    id: 'drum-percussion',
    name: 'Percussão / Congas / Shakers (Afrobeat / House)',
    category: 'DRUMS',
    freqFocus: {
      cut: 'HPF a 150Hz (a menos que seja surdo ou djembe)',
      body: '300Hz - 600Hz',
      presence: '2.5kHz - 5kHz',
      airOrPunch: '8kHz - 12kHz'
    },
    compressionSettings: {
      ratio: '2.5:1',
      attack: '25ms',
      release: '80ms',
      gainReduction: '2dB a 3dB'
    },
    stereoPlacement: 'Sides / Panning',
    saturationRec: 'SUAVE',
    flPluginChain: [
      '1. Fruity Parametric EQ 2 (Corte de frequências concorrentes)',
      '2. Fruity Stereo Shaper (Distribuição estéreo nos lados)',
      '3. Fruity Delay 3 (Efeito rítmico cruzado)'
    ],
    expertTips: [
      'No Afrobeat e Amapiano, distribua congas, woodblocks e rimshots em diferentes pontos do panorama estéreo (L30%, R25%, etc.).'
    ]
  },

  // --- BAIXO CATEGORY ---
  {
    id: 'bass-808',
    name: '808 Bass (Trap / Drill / Hip Hop / Afrobeat)',
    category: 'BAIXO',
    freqFocus: {
      cut: 'HPF a 25Hz (corta subgraves inúteis que roubam energia)',
      body: '35Hz - 70Hz (o subgrave fundamental que sacode o peito)',
      presence: '300Hz - 900Hz (harmônicos para tocar no alto-falante do celular)',
      airOrPunch: 'LPF a 3kHz - 5kHz (corta ruídos agudos desnecessários)'
    },
    compressionSettings: {
      ratio: '3:1 a 4:1',
      attack: '20ms (deixa o ataque inicial passar)',
      release: '100ms - 200ms (sustentação controlada)',
      gainReduction: '2dB a 4dB'
    },
    stereoPlacement: 'Mono (Centro)',
    sidechainTip: 'Ative Sidechain com o Kick usando o Fruity Limiter (Duck mode) ou automação de volume para evitar conflito de fase.',
    saturationRec: 'MÉDIA',
    flPluginChain: [
      '1. Fruity Parametric EQ 2 (HPF a 28Hz + boost em 45Hz)',
      '2. Fruity Blood Overdrive / WaveShaper (Saturação para gerar harmônicos audíveis em celulares)',
      '3. Fruity Limiter (Sidechain compressor ligado ao canal do Kick)',
      '4. Maximus (Stereo Separation: 100% Mono nos graves)'
    ],
    expertTips: [
      'Distorça ou sature os médios do 808 para que a linha de baixo continue perfeitamente audível em smartphones e caixas Bluetooth pequenas.',
      'Sintonize o 808 exatamente no tom (Key) da música no sampler do FL Studio.'
    ]
  },
  {
    id: 'bass-sub',
    name: 'Sub Bass Puro (Sine Sub)',
    category: 'BAIXO',
    freqFocus: {
      cut: 'HPF a 25Hz',
      body: '35Hz - 80Hz (onda senoidal pura)',
      presence: 'Sem agudos',
      airOrPunch: 'LPF estrito em 120Hz'
    },
    compressionSettings: {
      ratio: '2:1',
      attack: '15ms',
      release: '80ms',
      gainReduction: '1dB a 2dB'
    },
    stereoPlacement: 'Mono (Centro)',
    saturationRec: 'OFF',
    flPluginChain: [
      '1. Fruity Parametric EQ 2 (LPF íngreme a 120Hz)',
      '2. Fruity Limiter (Limiting suave para manter volume 100% constante)'
    ],
    expertTips: [
      'O Sub Bass deve ser a coisa mais estável da mixagem. 100% Mono, sem modulação de fase.'
    ]
  },
  {
    id: 'bass-electric',
    name: 'Baixo Elétrico / Sintetizado (Slap / Finger / Synth Bass)',
    category: 'BAIXO',
    freqFocus: {
      cut: 'HPF a 35Hz',
      body: '80Hz - 160Hz (corpo da nota)',
      presence: '700Hz - 1.5kHz (som da palheta ou dedo no traste)',
      airOrPunch: 'LPF a 4.5kHz'
    },
    compressionSettings: {
      ratio: '4:1',
      attack: '25ms',
      release: '90ms',
      gainReduction: '3dB a 5dB'
    },
    stereoPlacement: 'Mono (Centro)',
    saturationRec: 'SUAVE',
    flPluginChain: [
      '1. Fruity Parametric EQ 2 (HPF 35Hz + corte em 250Hz se soar embolado)',
      '2. Fruity Limiter (Compressão firme para sustentar notas longas)',
      '3. Fruity Blood Overdrive (Aquecimento de amplificador)',
      '4. Fruity Parametric EQ 2 (LPF a 4.5kHz)'
    ],
    expertTips: [
      'Divida o baixo em duas pistas no mixer: uma com o Sub (abaixo de 120Hz em mono) e outra com os médios (com distorção e leve abertura estéreo).'
    ]
  },

  // --- INSTRUMENTOS CATEGORY ---
  {
    id: 'inst-piano',
    name: 'Piano Acústico / Elétrico (Keys / Rhodes)',
    category: 'INSTRUMENTOS',
    freqFocus: {
      cut: 'HPF a 80Hz - 120Hz (limpa o grave para o baixo e bumbo)',
      body: '200Hz - 400Hz (corpo da madeira do piano)',
      presence: '2.5kHz - 4kHz (ataque do martelo nas cordas)',
      airOrPunch: '8kHz - 12kHz (brilho e ambiência estéreo)'
    },
    compressionSettings: {
      ratio: '2.5:1',
      attack: '30ms (preserva o ataque expressivo dos martelos)',
      release: '100ms',
      gainReduction: '2dB a 4dB'
    },
    stereoPlacement: 'Estéreo Largo',
    saturationRec: 'SUAVE',
    flPluginChain: [
      '1. Fruity Parametric EQ 2 (HPF 100Hz + corte de 2dB em 300Hz se competir com o vocal)',
      '2. Fruity Limiter (Compressão dinâmica suave)',
      '3. Fruity Stereo Enhancer (Abertura estéreo)',
      '4. Fruity Reeverb 2 (Reverb Hall rico)'
    ],
    expertTips: [
      'Se o piano competir com o vocal principal, use o EQ para atenuar -2dB em 3kHz no canal do piano.'
    ]
  },
  {
    id: 'inst-guitar',
    name: 'Guitarra Acústica / Elétrica (Violão / Guitarras)',
    category: 'INSTRUMENTOS',
    freqFocus: {
      cut: 'HPF a 90Hz - 150Hz',
      body: '200Hz - 350Hz (corpo da caixa de ressonância)',
      presence: '2.5kHz - 4.5kHz (ataque da palheta e definição de acordes)',
      airOrPunch: '8kHz - 12kHz'
    },
    compressionSettings: {
      ratio: '3:1',
      attack: '20ms',
      release: '80ms',
      gainReduction: '2dB a 4dB'
    },
    stereoPlacement: 'Sides / Panning',
    saturationRec: 'SUAVE',
    flPluginChain: [
      '1. Fruity Parametric EQ 2 (HPF 110Hz + corte de ressonâncias nas notas agudas)',
      '2. Fruity Limiter (Controle de dinâmica da palhetada)',
      '3. Fruity Delay 3 (Stereo Delay sutil)'
    ],
    expertTips: [
      'Grave duas tomadas diferentes de violão e faça pan 100% L e 100% R (Hard Panning) para uma parede acústica gigante.'
    ]
  },
  {
    id: 'inst-synth-pad',
    name: 'Synths & Pads Atmosféricos',
    category: 'INSTRUMENTOS',
    freqFocus: {
      cut: 'HPF a 150Hz - 200Hz',
      body: '300Hz - 600Hz',
      presence: '1.5kHz - 3kHz (manter suave para não cansar)',
      airOrPunch: '6kHz - 14kHz (abertura espacial luxuosa)'
    },
    compressionSettings: {
      ratio: '2:1',
      attack: '40ms',
      release: '150ms',
      gainReduction: '1dB a 3dB'
    },
    stereoPlacement: 'Estéreo Largo',
    saturationRec: 'SUAVE',
    flPluginChain: [
      '1. Fruity Parametric EQ 2 (HPF 180Hz + corte no centro de frequências vocais)',
      '2. Fruity Stereo Shaper (Máxima largura estéreo)',
      '3. Fruity Delay 3 / Chorus (Modulação suave)'
    ],
    expertTips: [
      'Pads servem para preencher os fundos e as laterais do palco sonoro; corte seus graves para que eles flutuem sobre o baixo.'
    ]
  },
  {
    id: 'inst-brass-strings',
    name: 'Metais & Cordas (Brass & Strings / Orquestral)',
    category: 'INSTRUMENTOS',
    freqFocus: {
      cut: 'HPF a 100Hz',
      body: '300Hz - 500Hz',
      presence: '2kHz - 5kHz (brilho e mordida dos metais)',
      airOrPunch: '8kHz - 12kHz (ar do arco das cordas)'
    },
    compressionSettings: {
      ratio: '3:1',
      attack: '25ms',
      release: '100ms',
      gainReduction: '2dB a 4dB'
    },
    stereoPlacement: 'Estéreo Largo',
    saturationRec: 'SUAVE',
    flPluginChain: [
      '1. Fruity Parametric EQ 2 (HPF 90Hz + de-harshness em 3.5kHz)',
      '2. Fruity Limiter (Nivelamento)',
      '3. Fruity Reeverb 2 (Concert Hall Reverb)'
    ],
    expertTips: [
      'Metais sintetizados tendem a ficar muito cortantes em 3.5kHz. Suavize com EQ paramétrico.'
    ]
  },
  {
    id: 'inst-full-beat',
    name: 'Instrumental Completo (2-Track / Beat Único)',
    category: 'INSTRUMENTOS',
    freqFocus: {
      cut: 'HPF a 25Hz',
      body: 'Equilibrado',
      presence: 'Abrir espaço para o vocal no centro',
      airOrPunch: 'Equilibrado'
    },
    compressionSettings: {
      ratio: '1.5:1 a 2:1 (muito sutil, pois o beat já vem masterizado)',
      attack: '30ms',
      release: '100ms',
      gainReduction: '1dB a 2dB no máximo'
    },
    stereoPlacement: 'Estéreo Largo',
    sidechainTip: 'Use Dynamic EQ ou Mid/Side EQ cortando 3kHz apenas no canal MID do instrumental para o vocal encaixar como uma luva.',
    saturationRec: 'OFF',
    flPluginChain: [
      '1. Fruity Parametric EQ 2 (Modo Mid/Side: Cortar 1dB a 2.5dB em 1kHz - 4kHz no canal MID para abrir buraco para o vocal)',
      '2. Fruity Limiter (Apenas controle sutil de picos)'
    ],
    expertTips: [
      'Quando mixar vocal sobre um beat de 2 faixas (WAV/MP3 estéreo), NUNCA tente re-equalizar o beat inteiro bruscamente. Use EQ Mid/Side para mexer apenas no centro.'
    ]
  }
];
