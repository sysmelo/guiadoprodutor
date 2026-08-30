export interface VocalChainStep {
  slot: number;
  category: 'EQ Subtrativo' | 'De-Esser' | 'Compressão' | 'EQ Aditivo / Air' | 'Saturação / Cor' | 'Limiting / Dinâmica Final';
  pluginFlNative: string;
  pluginExternalAlternative: string;
  primaryAction: string;
  parameters: {
    label: string;
    value: string;
    flKnobHint?: string;
  }[];
  explanation: string;
  flStudioTip: string;
}

export interface ProVocalPreset {
  id: string;
  name: string;
  genreVibe: string;
  tag: string;
  badgeColor: string;
  description: string;
  targetTone: string;
  signalFlow: VocalChainStep[];
  auxSends: {
    sendName: string;
    flPlugin: string;
    settings: string;
    tip: string;
  }[];
  goldenRules: string[];
}

export const proVocalChainPresets: ProVocalPreset[] = [
  {
    id: 'modern-pop-trap',
    name: 'Modern Pop & Trap Lead (Bright & In-Your-Face)',
    genreVibe: 'Pop, Trap, Hyperpop, Reggaeton',
    tag: 'BRIGHT & CRISPY',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    description: 'Vocal cortante, ultra-brilhante e com presença imediata na mixagem. Controla sibilâncias estridentes antes de empurrar o brilho dos agudos com compressão densa e consistente.',
    targetTone: 'Brilho aéreo (Air), médios focados sem embolamento nos 300Hz, dinâmica ultra estável.',
    signalFlow: [
      {
        slot: 1,
        category: 'EQ Subtrativo',
        pluginFlNative: 'Fruity Parametric EQ 2',
        pluginExternalAlternative: 'FabFilter Pro-Q 3 / Waves F6',
        primaryAction: 'Corte de Subgraves + Limpeza de Mud (Lama)',
        parameters: [
          { label: 'Banda 1 (HPF)', value: '100 Hz', flKnobHint: 'Type: High Pass | Order: Steep 4 (24 dB/oct)' },
          { label: 'Banda 2 (Mud Cut)', value: '320 Hz (-2.5 dB)', flKnobHint: 'Bandwidth / Q: 2.8' },
          { label: 'Banda 3 (Boxiness)', value: '750 Hz (-1.8 dB)', flKnobHint: 'Bandwidth / Q: 3.5' },
          { label: 'Banda 7 (Air Prep)', value: 'Flat (0 dB)', flKnobHint: 'Deixe o boost de ar para após o De-Esser' }
        ],
        explanation: 'Remove ruídos e frequências que fariam os compressores seguintes bombear (pumping) desnecessariamente.',
        flStudioTip: 'Ative o HQ Mode no menu de engrenagem do Parametric EQ 2 para oversampling de fase linear.'
      },
      {
        slot: 2,
        category: 'De-Esser',
        pluginFlNative: 'Maximus (De-Esser Mode)',
        pluginExternalAlternative: 'FabFilter Pro-DS / Waves Renaissance DeEsser',
        primaryAction: 'Atenuação Dinâmica de Sibilâncias ("S", "T", "Ch")',
        parameters: [
          { label: 'Frequência Alvo', value: '6.2 kHz – 8.8 kHz', flKnobHint: 'Banda HIGH solo ajustada nas sibilâncias' },
          { label: 'Threshold', value: '-18 dB', flKnobHint: 'Redução de 3dB a 5dB nos picos de "S"' },
          { label: 'Attack / Release', value: '0.8 ms / 45 ms', flKnobHint: 'Ataque ultrarrápido para capturar o transiente do S' },
          { label: 'Knee', value: 'Hard Knee', flKnobHint: 'Atuação cirúrgica sem escurecer as vogais' }
        ],
        explanation: 'Elimina as sibilâncias antes da compressão forte. Se você comprimir antes de de-essar, os "S" se tornam agressivos e cortantes.',
        flStudioTip: 'No Maximus, selecione o preset nativo "De-Esser Split Band" ou use a banda MID/HIGH em solo para calibrar o ponto exato do atrito bucal.'
      },
      {
        slot: 3,
        category: 'Compressão',
        pluginFlNative: 'Fruity Limiter (COMP Mode)',
        pluginExternalAlternative: 'FabFilter Pro-C 2 (Vocal Mode) / CLA-76',
        primaryAction: 'Compressão Dinâmica Principal (Controle de Picos e Nivelamento)',
        parameters: [
          { label: 'Ratio', value: '4:1 a 5:1', flKnobHint: 'Curva firme para vocal moderno' },
          { label: 'Threshold', value: '-16 dB a -20 dB', flKnobHint: 'Almeje 4 dB – 6 dB de Gain Reduction constante' },
          { label: 'Attack', value: '12 ms', flKnobHint: 'Preserva a primeira consoante da palavra (punch)' },
          { label: 'Release', value: '110 ms', flKnobHint: 'Recupera o fôlego antes da próxima sílaba' },
          { label: 'Gain (Makeup)', value: '+3.5 dB', flKnobHint: 'Compensa a energia atenuada' }
        ],
        explanation: 'Cola o vocal no topo da mixagem, garantindo que mesmo as palavras sussurradas fiquem perfeitamente audíveis sobre a batida de Trap/Pop.',
        flStudioTip: 'Use a tela visual do Fruity Limiter para ver a linha roxa de redução de ganho descer exatamente nas sílabas mais fortes.'
      },
      {
        slot: 4,
        category: 'EQ Aditivo / Air',
        pluginFlNative: 'Fruity Parametric EQ 2',
        pluginExternalAlternative: 'Maag EQ4 (Air Band) / Pultec EQP-1A',
        primaryAction: 'Adição de Presença + Top End Air (Brilho Comercial)',
        parameters: [
          { label: 'Banda 5 (Presença)', value: '3.8 kHz (+1.5 dB)', flKnobHint: 'Bandwidth / Q: 1.8 (ajuda a cortar o instrumental)' },
          { label: 'Banda 7 (Air Shelf)', value: '12 kHz (+3.0 dB)', flKnobHint: 'High Shelf suave para brilho aéreo e textura' },
          { label: 'Banda 4 (Corpo)', value: '1.2 kHz (+0.8 dB)', flKnobHint: 'Inteligibilidade lírica da voz' }
        ],
        explanation: 'Como a sibilância já foi domada no slot 2, agora você pode abrir o brilho sem medo de machucar o ouvido.',
        flStudioTip: 'No Parametric EQ 2, use o botão direito na Banda 7 e selecione "High Shelf" com inclinação suave.'
      },
      {
        slot: 5,
        category: 'Saturação / Cor',
        pluginFlNative: 'Fruity Blood Overdrive (ou Soft Clipper)',
        pluginExternalAlternative: 'Soundtoys Decapitator / FabFilter Saturn 2',
        primaryAction: 'Harmônicos Agradáveis e Presença Analógica',
        parameters: [
          { label: 'PreBand / Drive', value: '15% a 20%', flKnobHint: 'Apenas para gerar saturação harmônica sutil' },
          { label: 'Color', value: '60% (Warm/Bright blend)', flKnobHint: 'Harmônicos pares e ímpares' },
          { label: 'Post Gain', value: '-1.5 dB', flKnobHint: 'Evite clipar a saída do mixer slot' }
        ],
        explanation: 'A saturação adiciona densidade espectral, fazendo o vocal soar "caro" e presente mesmo em caixas de som de celular baratas.',
        flStudioTip: 'Se não quiser distorção perceptível, troque por Fruity Soft Clipper com Post-gain em 85% para segurar picos rápidos de transiente.'
      }
    ],
    auxSends: [
      {
        sendName: 'Send 1: Reverb de Placa Espacial',
        flPlugin: 'Fruity Reeverb 2',
        settings: 'Decay: 1.8s | Wet: 100% (Insert Send) | Low Cut: 300Hz | High Cut: 6kHz | Predelay: 35ms',
        tip: 'O Predelay de 35ms separa a voz seca do reflexo, mantendo a dicção límpida e o efeito grandioso.'
      },
      {
        sendName: 'Send 2: Stereo Ping-Pong / Slapback Delay',
        flPlugin: 'Fruity Delay 3',
        settings: 'Time: 1/8 Dotted ou 1/4 | Feedback: 25% | Stereo Offset: 15ms | High Pass: 400Hz | Low Pass: 4.5kHz',
        tip: 'Filtre os graves e agudos do delay (Efeito Telefone) para não competir com o vocal central.'
      }
    ],
    goldenRules: [
      'Grave com o microfone a 15-20cm com pop filter para evitar o efeito de proximidade excessivo.',
      'Sempre use De-Esser ANTES de compressores pesados e boosters de agudos.',
      'Monitore o ganho de entrada no Slot 1 por volta de -18 dBFS (Sweet Spot).'
    ]
  },
  {
    id: 'warm-rnb-afrobeat',
    name: 'Warm R&B, Afrobeat & Kizomba Lead (Smooth & Intimate)',
    genreVibe: 'R&B, Neo-Soul, Afrobeat, Kizomba, Zouk, Amapiano',
    tag: 'SMOOTH & SILKY',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    description: 'Focado em textura aveludada, graves encorpados sem embolar e agudos sedosos e macios sem aspereza digital. Ideal para vozes românticas e melódicas.',
    targetTone: 'Corpo aveludado, agudos macios (Silk Highs), compressão musical e invisível com dinâmica respirando.',
    signalFlow: [
      {
        slot: 1,
        category: 'EQ Subtrativo',
        pluginFlNative: 'Fruity Parametric EQ 2',
        pluginExternalAlternative: 'FabFilter Pro-Q 3 / Neve 1073 EQ',
        primaryAction: 'High-Pass Musical + Drenagem de Ressonâncias Nasais',
        parameters: [
          { label: 'Banda 1 (HPF)', value: '85 Hz', flKnobHint: 'Type: High Pass | Order: 3 (18 dB/oct) para preservar o grave aveludado' },
          { label: 'Banda 2 (Warmth Clean)', value: '240 Hz (-1.2 dB)', flKnobHint: 'Limpeza suave sem perder o corpo íntimo' },
          { label: 'Banda 3 (Nasal Cut)', value: '500 Hz (-2.0 dB)', flKnobHint: 'Bandwidth / Q: 3.2' },
          { label: 'Banda 4 (Harshness)', value: '2.8 kHz (-1.0 dB)', flKnobHint: 'Suaviza asperezas de microfones condensadores baratos' }
        ],
        explanation: 'No R&B e Afrobeat, o calor e a proximidade do peito do cantor são cruciais, por isso o High-Pass é mais baixo (85Hz) e suave.',
        flStudioTip: 'Use a curva suave no Parametric EQ 2 para não descaracterizar a maciez do timbre.'
      },
      {
        slot: 2,
        category: 'De-Esser',
        pluginFlNative: 'Maximus (Smooth De-Ess)',
        pluginExternalAlternative: 'FabFilter Pro-DS / Weiss Deess',
        primaryAction: 'Atenuação Musical e Suave de Sibilância',
        parameters: [
          { label: 'Frequência Alvo', value: '5.5 kHz – 7.8 kHz', flKnobHint: 'Banda de atuação mais baixa e suave' },
          { label: 'Threshold', value: '-15 dB', flKnobHint: 'Redução moderada de 2 dB a 3 dB' },
          { label: 'Attack / Release', value: '1.5 ms / 60 ms', flKnobHint: 'Ataque mais suave para manter o brilho natural das respirações' },
          { label: 'Knee', value: 'Soft Knee', flKnobHint: 'Transição imperceptível' }
        ],
        explanation: 'Um De-Esser muito duro estraga a sedosidade de vozes de R&B. Queremos apenas conter picos pontuais.',
        flStudioTip: 'Mantenha a atenuação suave para não deixar o cantor com som de língua presa (lisping).'
      },
      {
        slot: 3,
        category: 'Compressão',
        pluginFlNative: 'Fruity Compressor / Fruity Limiter (Opto Mode)',
        pluginExternalAlternative: 'Teletronix LA-2A / CLA-2A / Pro-C 2 (Opto)',
        primaryAction: 'Compressão Lenta com Curva Estilo Óptica (LA-2A Style)',
        parameters: [
          { label: 'Ratio', value: '2.5:1 a 3:1', flKnobHint: 'Compressão transparente e musical' },
          { label: 'Attack', value: '25 ms a 35 ms', flKnobHint: 'Ataque lento para deixar a voz respirar naturalmente' },
          { label: 'Release', value: '250 ms a 350 ms', flKnobHint: 'Release longo que abraça as caudas das notas' },
          { label: 'Gain Reduction', value: '2 dB – 4 dB máx', flKnobHint: 'Compressão imperceptível de nivelamento' }
        ],
        explanation: 'Simula o comportamento de compressores valvulados ópticos como o lendário LA-2A, dando sustentação aveludada às notas longas.',
        flStudioTip: 'No Fruity Limiter, aumente o Attack para 25ms e o Release para 300ms com curva suave (Knee amplo).'
      },
      {
        slot: 4,
        category: 'EQ Aditivo / Air',
        pluginFlNative: 'Fruity Parametric EQ 2',
        pluginExternalAlternative: 'Pultec EQP-1A / Tube-Tech CL 1B',
        primaryAction: 'Abertura de Agudos Sedosos + Calor de Médios',
        parameters: [
          { label: 'Banda 6 (Silk Highs)', value: '10.5 kHz (+2.0 dB)', flKnobHint: 'High Shelf largo e sedoso' },
          { label: 'Banda 3 (Intimacy Boost)', value: '1.8 kHz (+1.0 dB)', flKnobHint: 'Presença sedosa sem agressividade' },
          { label: 'Banda 2 (Chest Warmth)', value: '180 Hz (+0.8 dB)', flKnobHint: 'Toque de calor analógico' }
        ],
        explanation: 'Cria o som característico de estúdio de alta gama com agudos que acariciam os ouvidos sem nenhuma aspereza.',
        flStudioTip: 'Experimente usar o Fruity Warmth / Soft Saturation para reforçar o corpo de 200Hz.'
      },
      {
        slot: 5,
        category: 'Saturação / Cor',
        pluginFlNative: 'Fruity WaveShaper (Soft Tube Curve)',
        pluginExternalAlternative: 'Soundtoys Radiator / Black Box HG-2',
        primaryAction: 'Aquecimento Valvulado e Harmônicos Pares',
        parameters: [
          { label: 'Curva', value: 'Suave S-Curve (Centro arqueado)', flKnobHint: 'Saturação suave de tubo vintage' },
          { label: 'Pre-Gain', value: '0 dB', flKnobHint: 'Mantenha o sinal equilibrado' },
          { label: 'Mix Level', value: '30%', flKnobHint: 'Processamento paralelo para manter naturalidade' }
        ],
        explanation: 'Harmônicos de tubo adicionam profundidade e calor 3D para vocais emotivos.',
        flStudioTip: 'No WaveShaper, clique com o botão direito e desenhe uma leve curva simétrica no centro.'
      }
    ],
    auxSends: [
      {
        sendName: 'Send 1: Lush Hall & Chorus Reverb',
        flPlugin: 'Fruity Reeverb 2 + Fruity Chorus',
        settings: 'Decay: 2.6s | Size: 85% | Pre-Delay: 45ms | Chorus Depth: 15% | Wet: 100%',
        tip: 'Uma leve modulação de chorus no send do reverb cria uma aura etérea e cinematográfica.'
      },
      {
        sendName: 'Send 2: Warm Tape Delay 1/4',
        flPlugin: 'Fruity Delay 3',
        settings: 'Mode: Tape | Time: 1/4 Tempo Sync | Diffusion: 20% | Color: Warm | Feedback: 30%',
        tip: 'O modo Tape adiciona leve flutuação analógica que se funde perfeitamente com violões e pianos.'
      }
    ],
    goldenRules: [
      'Não use ataques de compressor menores que 15ms em R&B para não matar a emoção da voz.',
      'Saturação excessiva estraga a maciez vocal: mantenha sempre abaixo de 20% no Mix knob.',
      'A automação de volume manual antes dos compressores entrega um resultado 10x mais limpo.'
    ]
  },
  {
    id: 'aggressive-drill-rap',
    name: 'Aggressive Drill & Hard Rap (Punchy, Gritty & Dense)',
    genreVibe: 'UK Drill, Brazilian Drill, Gangsta Rap, Hard Trap, Boom Bap',
    tag: 'PUNCHY & IN YOUR FACE',
    badgeColor: 'bg-red-500/20 text-red-300 border-red-500/40',
    description: 'Vocal de impacto máximo, com compressão agressiva estilo 1176 All-Buttons, transientes rápidos para cortar baterias pesadas com 808s deslizantes e saturação encorpada.',
    targetTone: 'Ataque rápido, consistência dinâmica extrema (vocal como uma parede sonora), brilho médio cortante.',
    signalFlow: [
      {
        slot: 1,
        category: 'EQ Subtrativo',
        pluginFlNative: 'Fruity Parametric EQ 2',
        pluginExternalAlternative: 'FabFilter Pro-Q 3 / SSL Channel EQ',
        primaryAction: 'High-Pass Agressivo + Limpeza de Médios-Graves',
        parameters: [
          { label: 'Banda 1 (HPF)', value: '120 Hz', flKnobHint: 'Type: High Pass | Steep 4 (24 dB/oct) para dar espaço total ao 808' },
          { label: 'Banda 2 (Boxy Cut)', value: '400 Hz (-3.0 dB)', flKnobHint: 'Bandwidth / Q: 3.0' },
          { label: 'Banda 3 (Nasal Dip)', value: '850 Hz (-2.2 dB)', flKnobHint: 'Bandwidth / Q: 3.5' }
        ],
        explanation: 'Em Drill e Trap pesado, o 808 ocupa todo o espectro até 100Hz. Cortar o vocal em 120Hz é obrigatório para não haver choque de graves.',
        flStudioTip: 'O corte íngreme em 120Hz garante que o vocal não embole quando o 808 subir de pitch nos slides.'
      },
      {
        slot: 2,
        category: 'De-Esser',
        pluginFlNative: 'Maximus (Hard De-Ess)',
        pluginExternalAlternative: 'Waves Sibilance / FabFilter Pro-DS',
        primaryAction: 'Controle Firme de Consoantes Agressivas',
        parameters: [
          { label: 'Frequência Alvo', value: '6.5 kHz – 9.0 kHz', flKnobHint: 'Foco nos picos cortantes de rap rápido' },
          { label: 'Threshold', value: '-22 dB', flKnobHint: 'Redução ativa de 4 dB a 6 dB' },
          { label: 'Attack / Release', value: '0.4 ms / 35 ms', flKnobHint: 'Ataque instantâneo para rimas rápidas em alta velocidade' }
        ],
        explanation: 'Em raps rápidos com muita pronúncia de rimas, o De-Esser precisa ser ultra veloz para não deixar nenhum pico escapar.',
        flStudioTip: 'Use o display de pico do Maximus para garantir que as sibilâncias fiquem totalmente alinhadas com o resto do corpo.'
      },
      {
        slot: 3,
        category: 'Compressão',
        pluginFlNative: 'Fruity Limiter (Fast Peak Crunch / 1176 Style)',
        pluginExternalAlternative: 'Universal Audio 1176LN / Waves CLA-76 (Bluey/Blacky)',
        primaryAction: 'Compressão Agressiva de Transiente Rápido (1176 Style)',
        parameters: [
          { label: 'Ratio', value: '8:1', flKnobHint: 'Compressão dura e presente' },
          { label: 'Threshold', value: '-22 dB', flKnobHint: '6 dB a 10 dB de Gain Reduction constante' },
          { label: 'Attack', value: '4 ms (Fast)', flKnobHint: 'Segura as sílabas cuspindo no microfone' },
          { label: 'Release', value: '65 ms (Fast recovery)', flKnobHint: 'Recuperação imediata para dar densidade energética' },
          { label: 'Gain (Makeup)', value: '+6.0 dB', flKnobHint: 'Traz o vocal para o primeiro plano da mix' }
        ],
        explanation: 'Esmaga a faixa dinâmica para que o cantor soe com a mesma intensidade do primeiro ao último verso, competindo de igual para igual com o kick.',
        flStudioTip: 'O release rápido cria uma energia emocionante que eleva os detalhes do ar e da respiração entre as rimas.'
      },
      {
        slot: 4,
        category: 'EQ Aditivo / Air',
        pluginFlNative: 'Fruity Parametric EQ 2',
        pluginExternalAlternative: 'SSL 4000 E-Channel EQ / API 550A',
        primaryAction: 'Boost de Ataque em Médios-Altos + Mordida',
        parameters: [
          { label: 'Banda 5 (Bite / Mordida)', value: '4.5 kHz (+3.0 dB)', flKnobHint: 'Bandwidth / Q: 1.6 (mordida agressiva)' },
          { label: 'Banda 4 (Dicção)', value: '2.2 kHz (+1.5 dB)', flKnobHint: 'Clareza lírica instantânea' },
          { label: 'Banda 7 (Air)', value: '14 kHz (+2.0 dB)', flKnobHint: 'Brilho moderno' }
        ],
        explanation: 'O boost em 4.5kHz dá a "mordida" e a energia característica dos vocais de Drill de Londres e Nova York.',
        flStudioTip: 'Use o visualizador espectral para ver se o boost está alinhado com os harmônicos da voz.'
      },
      {
        slot: 5,
        category: 'Saturação / Cor',
        pluginFlNative: 'Fruity Fast Dist (ou Blood Overdrive)',
        pluginExternalAlternative: 'Soundtoys Decapitator (Punish Mode) / CamelCrusher',
        primaryAction: 'Grit e Distorção Harmônica Paralela',
        parameters: [
          { label: 'Pre-Amp', value: '25%', flKnobHint: 'Distorção harmônica controlada' },
          { label: 'Mix Level', value: '25% a 30%', flKnobHint: 'Processamento paralelo sutil' },
          { label: 'Post Gain', value: '-2 dB', flKnobHint: 'Equaliza o volume de saída' }
        ],
        explanation: 'Adiciona granulação e textura analógica crua que faz o vocal parecer gravado em uma fita saturada de alta velocidade.',
        flStudioTip: 'Insira o Fruity Fast Dist e reduza o knob de Mix para 20% para obter textura sem perder clareza.'
      }
    ],
    auxSends: [
      {
        sendName: 'Send 1: Tight Slap Delay (Sem Cauda Longa)',
        flPlugin: 'Fruity Delay 3',
        settings: 'Time: 60ms a 90ms | Feedback: 0% (Single Tap) | High Pass: 500Hz | Wet: 100%',
        tip: 'Em rap rápido, evite reverbs longos que embolam as palavras. O Slapback delay dá sensação de espaço 3D mantendo o vocal seco e na cara.'
      },
      {
        sendName: 'Send 2: Microshift / Stereo Doubler',
        flPlugin: 'Fruity Stereo Shaper / Pitcher',
        settings: 'Detune: -7 cents (Esq) / +7 cents (Dir) | Delay Offset: 12ms | Width: 100%',
        tip: 'Alarga as laterais do vocal principal sem criar problemas de cancelamento de fase no centro mono.'
      }
    ],
    goldenRules: [
      'Em Drill, corte 100% dos subgraves até 120Hz para não colidir com os deslizes (slides) do 808.',
      'Use compressores com release rápido (abaixo de 80ms) para dar a sensação de agressividade e energia.',
      'Sempre use mono-compatibilidade: certifique-se de que a voz principal está travada no centro estéreo.'
    ]
  },
  {
    id: 'clean-podcast-speech',
    name: 'Clean Spoken Word, Podcast & Voiceover (Natural & Transparent)',
    genreVibe: 'Podcast, Entrevistas, Audiolivros, Dublagem, Locução',
    tag: 'NATURAL & BALANCED',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    description: 'Focado em naturalidade, inteligibilidade absoluta das palavras, eliminação de ruídos de sala e controle de volume balanceado para longas horas de audição confortável em fones de ouvido.',
    targetTone: 'Timbre natural, sem compressão evidente, controle de sibilância e redução de ruído nas pausas.',
    signalFlow: [
      {
        slot: 1,
        category: 'EQ Subtrativo',
        pluginFlNative: 'Fruity Parametric EQ 2',
        pluginExternalAlternative: 'FabFilter Pro-Q 3 / iZotope RX Voice EQ',
        primaryAction: 'High Pass + Limpeza de Efeito de Proximidade',
        parameters: [
          { label: 'Banda 1 (HPF)', value: '80 Hz', flKnobHint: 'High Pass suave (18 dB/oct)' },
          { label: 'Banda 2 (Proximidade)', value: '200 Hz (-1.5 dB)', flKnobHint: 'Remove o excesso de peso caso o locutor fale muito próximo' },
          { label: 'Banda 3 (Ressonância de Sala)', value: '550 Hz (-2.0 dB)', flKnobHint: 'Corta reflexões de quarto ou escritório sem tratamento' }
        ],
        explanation: 'Limpa o som sem desfigurar a voz original do locutor, mantendo o tom natural da conversa.',
        flStudioTip: 'Ouça em fones fechados para identificar a frequência exata da ressonância do ambiente.'
      },
      {
        slot: 2,
        category: 'De-Esser',
        pluginFlNative: 'Maximus (De-Esser Clean)',
        pluginExternalAlternative: 'FabFilter Pro-DS / Waves Renaissance DeEsser',
        primaryAction: 'Suavização Confortável de Sibilâncias',
        parameters: [
          { label: 'Frequência Alvo', value: '5.8 kHz – 8.0 kHz', flKnobHint: 'Foco suave nas sibilâncias' },
          { label: 'Threshold', value: '-16 dB', flKnobHint: 'Redução média de 2.5 dB a 3.5 dB' },
          { label: 'Attack / Release', value: '1.2 ms / 50 ms', flKnobHint: 'Resposta transparente' }
        ],
        explanation: 'Evita a fadiga auditiva em ouvintes que escutam podcasts inteiros de 1 a 2 horas no fone de ouvido.',
        flStudioTip: 'Use o De-Esser com sensibilidade moderada para não parecer que o locutor está usando aparelho ortodôntico.'
      },
      {
        slot: 3,
        category: 'Compressão',
        pluginFlNative: 'Fruity Limiter (Smooth Leveler)',
        pluginExternalAlternative: 'FabFilter Pro-C 2 (Vocal) / Waves Vocal Rider',
        primaryAction: 'Nivelamento de Volume com Ganho Transparente',
        parameters: [
          { label: 'Ratio', value: '2.5:1', flKnobHint: 'Proporção suave e imperceptível' },
          { label: 'Threshold', value: '-18 dB', flKnobHint: 'Almeje 3 dB a 4 dB de Gain Reduction nas frases mais altas' },
          { label: 'Attack', value: '20 ms', flKnobHint: 'Não amassa os transientes naturais da fala' },
          { label: 'Release', value: '150 ms', flKnobHint: 'Recuperação suave e linear' },
          { label: 'Noise Gate (Integrado)', value: 'Thresh: -45 dB', flKnobHint: 'Muta automaticamente as respirações e ruídos de sala' }
        ],
        explanation: 'Equilibra momentos em que o participante fala baixo e quando dá risadas ou se empolga, mantendo o volume constante.',
        flStudioTip: 'Ative o Noise Gate embutido no Fruity Limiter para limpar o ruído de fundo durante as pausas de fala.'
      },
      {
        slot: 4,
        category: 'EQ Aditivo / Air',
        pluginFlNative: 'Fruity Parametric EQ 2',
        pluginExternalAlternative: 'FabFilter Pro-Q 3',
        primaryAction: 'Clareza de Dicção e Presença Discreta',
        parameters: [
          { label: 'Banda 4 (Dicção)', value: '3.0 kHz (+1.2 dB)', flKnobHint: 'Melhora a inteligibilidade das consoantes' },
          { label: 'Banda 7 (Air Suave)', value: '10 kHz (+1.0 dB)', flKnobHint: 'Abertura sutil de alta frequência' }
        ],
        explanation: 'Garante que o ouvinte entenda cada palavra com clareza cristalina, mesmo em ambientes barulhentos como dentro do carro ou metrô.',
        flStudioTip: 'Mantenha os boosts abaixo de 2dB para não perder a naturalidade documental.'
      },
      {
        slot: 5,
        category: 'Limiting / Dinâmica Final',
        pluginFlNative: 'Fruity Limiter (Brickwall Safe Ceiling)',
        pluginExternalAlternative: 'FabFilter Pro-L 2 / iZotope Ozone Maximizer',
        primaryAction: 'Prevenção de Clipping e Normalização para Plataformas',
        parameters: [
          { label: 'Ceiling', value: '-1.0 dBFS (True Peak Safe)', flKnobHint: 'Evita intersample peaks na conversão para MP3/AAC' },
          { label: 'Target Loudness', value: '-16 LUFS Integrated', flKnobHint: 'Padrão da indústria para Podcasts (Spotify/Apple Podcasts)' }
        ],
        explanation: 'Protege contra estouros de volume causados por risadas ou batidas na mesa e atende às normas de streaming de áudio falado.',
        flStudioTip: 'Ajuste o Gain para atingir -16 LUFS integrado medindo com o Youlean Loudness Meter ou Fruity dB Meter.'
      }
    ],
    auxSends: [],
    goldenRules: [
      'Locução para podcast deve sempre atingir o padrão de -16 LUFS integrado e True Peak de -1.0 dBTP.',
      'Use um filtro pop físico a 10cm do microfone para evitar 100% dos "P" e "B" estourando o diafragma.',
      'Nunca adicione reverb em gravações de podcast; o objetivo é som seco, limpo e intimista.'
    ]
  }
];
