import { VocalProblem } from '../types';

export const vocalProblemsData: VocalProblem[] = [
  {
    id: 'muito-ruido',
    title: 'Muito ruído / Rumble de fundo',
    iconName: 'VolumeX',
    frequencyFocus: '20 Hz – 80 Hz & Ruído contínuo',
    description: 'Vocal gravado em ambiente não tratado, com barulho de ar-condicionado, vibração do pedestal ou ruído estático de pré-amplificador.',
    rootCauses: [
      'Microfone captou vibrações mecânicas pelo pedestal',
      'Ganho da interface de áudio excessivamente alto em pré ruidoso',
      'Cabos de baixa qualidade ou ruído elétrico da rede'
    ],
    flNativeChain: [
      {
        position: 1,
        pluginName: 'Fruity Parametric EQ 2',
        action: 'High Pass Filter Íngreme',
        suggestedParams: 'HPF a 85Hz - 100Hz com Slope tipo 4 (24dB/oct)',
        tip: 'Elimina subgraves inaudíveis que roubam energia dos compressores sem alterar o timbre vocal.'
      },
      {
        position: 2,
        pluginName: 'Fruity Limiter (Noise Gate)',
        action: 'Porta de Ruído nas Pausas',
        suggestedParams: 'Threshold: -42dB a -35dB | Release: 150ms | Gain: 0dB',
        tip: 'Muta o sinal automaticamente durante os silêncios entre as frases do cantor.'
      },
      {
        position: 3,
        pluginName: 'Edison (Clean / Denoise Tool)',
        action: 'Remoção Espectral Offline',
        suggestedParams: 'Acquire Noise Profile nas pausas → Clean Up com 50% de intensidade',
        tip: 'No Edison, selecione 1 segundo de silêncio ruidoso, aperte Ctrl+U e limpe o ruído contínuo.'
      }
    ],
    externalChainAlternative: ['iZotope RX Voice De-noise', 'FabFilter Pro-G', 'Waves Clarity VX'],
    dos: [
      'Grave com shockmount (aranha) e filtro pop para evitar ruído mecânico futuro.',
      'Ajuste o Release do Gate para que as caudas das palavras não soem cortadas abruptamente.'
    ],
    donts: [
      'Não passe o High-Pass acima de 130Hz, ou a voz soará fina como um interfone.',
      'Não force Denoise a 100% para não gerar artefatos metálicos aquáticos (robóticos).'
    ]
  },
  {
    id: 'muito-grave',
    title: 'Muito grave / Efeito de proximidade',
    iconName: 'Activity',
    frequencyFocus: '100 Hz – 250 Hz',
    description: 'O cantor cantou colado demais na cápsula do microfone direcional (cardioide), gerando um ganho desproporcional de graves e peso exagerado.',
    rootCauses: [
      'Efeito de proximidade do microfone cardioide',
      'Reflexões de canto de sala sem tratamento acústico nos graves'
    ],
    flNativeChain: [
      {
        position: 1,
        pluginName: 'Fruity Parametric EQ 2',
        action: 'Corte High-Pass + Low Shelf Suave',
        suggestedParams: 'HPF a 80Hz + Low Shelf ou Bell em 180Hz (-2dB a -4.5dB)',
        tip: 'Limpe a energia acumulada até a voz respirar e não competir com o Kick e Baixo.'
      },
      {
        position: 2,
        pluginName: 'Fruity Limiter',
        action: 'Compressão Estável',
        suggestedParams: 'Ratio 3:1 | Attack 15ms | Release 90ms | GR: 3dB',
        tip: 'Com os graves controlados antes, o compressor não irá bombear exageradamente.'
      }
    ],
    externalChainAlternative: ['FabFilter Pro-Q 3 (Dynamic EQ em 160Hz)', 'Soothe2', 'TDR Nova'],
    dos: ['Limpe primeiro no EQ antes de passar por qualquer saturador ou compressor.'],
    donts: ['Não corte todo o grave: a faixa de 150Hz é onde vive o calor e a autoridade da voz.']
  },
  {
    id: 'muito-abafada',
    title: 'Muito abafada / Boxy (Som de Caixa)',
    iconName: 'Box',
    frequencyFocus: '250 Hz – 500 Hz',
    description: 'A voz soa como se estivesse gravada dentro de uma caixa de papelão ou guarda-roupa pequeno com som oco e embolado.',
    rootCauses: [
      'Ressonâncias modais de salas pequenas com paredes paralelas',
      'Microfones dinâmicos com resposta pobre nos médios-altos'
    ],
    flNativeChain: [
      {
        position: 1,
        pluginName: 'Fruity Parametric EQ 2',
        action: 'Corte Cirúrgico de Boxiness',
        suggestedParams: 'Band 3 (Bell): 300Hz - 450Hz (-2.5dB a -5dB com Q médio de 1.8)',
        tip: 'Faça uma varredura (Sweep): aumente 6dB e procure a frequência que soa mais oca. Em seguida, atenue.'
      },
      {
        position: 2,
        pluginName: 'Fruity Parametric EQ 2 (Pós)',
        action: 'Reforço de Clareza',
        suggestedParams: 'Band 5: 3.5kHz (+1.5dB suave)',
        tip: 'Após remover a caixa, uma leve abertura de presença traz a voz para frente.'
      }
    ],
    externalChainAlternative: ['FabFilter Pro-Q 3', 'Oeksound Soothe2', 'Waves F6 Dynamic EQ'],
    dos: ['Compare sempre o volume antes e depois com o botão de bypass para ter certeza do ganho de clareza.'],
    donts: ['Não deixe o Q muito largo a ponto de remover 150Hz ou 800Hz ao mesmo tempo.']
  },
  {
    id: 'muito-nasal',
    title: 'Muito nasal / Telefone',
    iconName: 'Radio',
    frequencyFocus: '700 Hz – 1.5 kHz',
    description: 'Voz com característica de corneta, som anasalado excessivo ou timbre que soa preso pelo nariz.',
    rootCauses: [
      'Fisiologia vocal natural do cantor ou técnica de canto',
      'Reflexão em telas de computador ou superfícies de vidro próximas ao microfone'
    ],
    flNativeChain: [
      {
        position: 1,
        pluginName: 'Fruity Parametric EQ 2',
        action: 'Atenuação da Região Nasal',
        suggestedParams: 'Band 4 (Bell): 900Hz - 1.2kHz (-2dB a -4dB com Q=2.2)',
        tip: 'Atenue suavemente até a sensação de "buzina" desaparecer e o timbre abrir.'
      },
      {
        position: 2,
        pluginName: 'Fruity Blood Overdrive',
        action: 'Harmônicos de Equilíbrio',
        suggestedParams: 'Color: 5kHz | Drive: 0.1 (mínimo) | Mix: 15%',
        tip: 'Adicionar harmônicos superiores equilibra a energia nasal média.'
      }
    ],
    externalChainAlternative: ['FabFilter Pro-MB (Mid Band)', 'TDR Nova'],
    dos: ['Use Dynamic EQ se a nasalidade só ocorrer em palavras e notas específicas.'],
    donts: ['Não corte mais de 6dB fixos para não deixar o vocal oco e sem inteligibilidade.']
  },
  {
    id: 'muito-estridente',
    title: 'Muito estridente / Dureza metálica (Harshness)',
    iconName: 'Zap',
    frequencyFocus: '2.5 kHz – 5 kHz',
    description: 'Voz cortante, que cansa os ouvidos em volumes médios ou altos, parecendo rasgar nas notas agudas.',
    rootCauses: [
      'Microfones condensadores chineses baratos com cápsulas brilhantes agressivas',
      'Cantor forçando a garganta (belting agressivo sem apoio diafragmático)'
    ],
    flNativeChain: [
      {
        position: 1,
        pluginName: 'Maximus',
        action: 'Compressão Dinâmica de Médios-Altos',
        suggestedParams: 'Isolar banda MID/HIGH entre 2.8kHz e 5kHz com compressão rápida de 3dB',
        tip: 'Comprime a estridência somente quando o vocalista atinge passagens fortes.'
      },
      {
        position: 2,
        pluginName: 'Fruity Parametric EQ 2',
        action: 'Corte Suave de Aspereza',
        suggestedParams: 'Band 5: 3.2kHz (-2dB suave com Q amplo de 1.2)',
        tip: 'Amacia a resposta sem perder o entendimento das palavras.'
      }
    ],
    externalChainAlternative: ['Oeksound Soothe2', 'FabFilter Pro-Q 3 Dynamic', 'Baby Audio Smooth Operator'],
    dos: ['Adicione um reverb escuro com corte em 4kHz para amenizar a textura áspera.'],
    donts: ['Não elimine completamente a região de 3k-4kHz, pois ela é a chave para o vocal cortar na mixagem.']
  },
  {
    id: 'sibilancia-excessiva',
    title: 'Sibilância excessiva (S, SH, CH, T cortantes)',
    iconName: 'Scissors',
    frequencyFocus: '5 kHz – 8.5 kHz',
    description: 'Os sons consonantais sibilantes explodem como navalhas nos fones de ouvido dos ouvintes.',
    rootCauses: [
      'Microfone alinhado diretamente com a boca sem ângulo de 15 graus',
      'Compressão e equalização de brilho anteriores que empurraram os agudos'
    ],
    flNativeChain: [
      {
        position: 1,
        pluginName: 'Maximus (De-Esser Mode)',
        action: 'De-Essing com Banda High',
        suggestedParams: 'High Band Crossover em 4.8kHz | Comp Threshold ajustado para -4dB de atenuação nos S',
        tip: 'Carregue o preset "De-Esser" e ajuste o Threshold da banda HIGH até os S soarem macios.'
      },
      {
        position: 2,
        pluginName: 'Fruity Multiband Compressor',
        action: 'Alternativa Multibanda',
        suggestedParams: 'Banda High ativa a partir de 5.5kHz | Attack 2ms | Release 40ms',
        tip: 'Excelente controle rápido com tempo de recuperação imediato.'
      }
    ],
    externalChainAlternative: ['FabFilter Pro-DS', 'Waves Renaissance DeEsser', 'Weiss Deess'],
    dos: [
      'Posicione o De-Esser APÓS a compressão principal ou após qualquer EQ que tenha adicionado brilho.',
      'Sempre teste a mix em volume baixo para sentir se o S pula para fora.'
    ],
    donts: [
      'Não passe do ponto: se o cantor disser "você" e soar "focê", você destruiu a dicção.'
    ]
  },
  {
    id: 'falta-presenca',
    title: 'Falta presença / Vocal afundado na mix',
    iconName: 'Eye',
    frequencyFocus: '3 kHz – 6 kHz',
    description: 'O vocal parece estar 2 metros atrás dos instrumentos e não consegue ficar em primeiro plano.',
    rootCauses: [
      'Sintetizadores, guitarras e teclados ocupando a mesma faixa dos médios vocais',
      'Compressão insuficiente com ataque muito rápido que engoliu a voz'
    ],
    flNativeChain: [
      {
        position: 1,
        pluginName: 'Fruity Parametric EQ 2',
        action: 'Reforço de Presença Focal',
        suggestedParams: 'Band 5 (Bell): 3.8kHz a 4.5kHz (+2dB a +3.5dB com Q=1.5)',
        tip: 'Traz a articulação dos lábios e dentes para o primeiro plano da cena sonora.'
      },
      {
        position: 2,
        pluginName: 'Fruity Limiter (Compressão 1176 Style)',
        action: 'Ataque Médio / Release Rápido',
        suggestedParams: 'Attack: 12ms | Release: 50ms | Ratio: 4:1 | GR: 4dB a 6dB',
        tip: 'Faz a voz morder a mix e ficar estática na frente dos instrumentos.'
      },
      {
        position: 3,
        pluginName: 'Fruity Blood Overdrive',
        action: 'Saturação de Harmônicos',
        suggestedParams: 'Color: 4.5kHz | Drive: 0.2 | Mix: 25%',
        tip: 'Adiciona novos harmônicos na faixa de presença que o EQ sozinho não cria.'
      }
    ],
    externalChainAlternative: ['Waves CLA-76', 'FabFilter Pro-Q 3', 'Soundtoys Decapitator'],
    dos: [
      'Abra espaço nos instrumentos: corte -2dB em 3.5kHz no bus de guitarras/synths com EQ.',
      'Use compressão paralela no vocal para corpo e densidade constantes.'
    ],
    donts: ['Não resolva apenas aumentando o volume do fader do vocal até ele engolir a bateria.']
  },
  {
    id: 'falta-brilho',
    title: 'Falta brilho e ar (Top End opaco)',
    iconName: 'Sun',
    frequencyFocus: '10 kHz – 16 kHz',
    description: 'Vocal parece escuro, pesado, gravado em fita velha e sem a sofisticação moderna do pop contemporâneo.',
    rootCauses: [
      'Resposta de alta frequência deficiente do microfone',
      'Uso de filtros Low-Pass agressivos em gravações anteriores'
    ],
    flNativeChain: [
      {
        position: 1,
        pluginName: 'Fruity Parametric EQ 2',
        action: 'High Shelf de Ar',
        suggestedParams: 'Band 7 (High Shelf): 11kHz (+2.5dB a +4.5dB com Slope suave)',
        tip: 'Injeta respiração, ar e luxo estético no topo da voz.'
      },
      {
        position: 2,
        pluginName: 'Maximus',
        action: 'Controle de Picos Agudos',
        suggestedParams: 'Garantir que a banda High não amplifique sibilâncias com o brilho adicionado',
        tip: 'O EQ de ar vem ANTES do De-Esser final para que qualquer brilho não estoure sibilâncias.'
      }
    ],
    externalChainAlternative: ['Maag Audio EQ4 (Air Band a 20kHz)', 'FabFilter Pro-Q 3', 'Fresh Air (Slate Digital)'],
    dos: ['Equalize com o instrumental tocando junto para calibrar o brilho com os pratos e hi-hats.'],
    donts: ['Não exagere a ponto de transformar a voz em chiado metálico artificial.']
  },
  {
    id: 'volume-inconsistente',
    title: 'Volume inconsistente / Palavras sumindo',
    iconName: 'Sliders',
    frequencyFocus: 'Controle de Macro e Micro Dinâmica',
    description: 'Partes sussurradas somem atrás da base musical e notas altas explodem em volume no refrão.',
    rootCauses: [
      'Cantor sem técnica de microfone (não se afasta nas notas fortes)',
      'Falta de automação de volume e compressão em série'
    ],
    flNativeChain: [
      {
        position: 1,
        pluginName: 'Fruity Limiter (Compressor 1 - Transientes)',
        action: 'Controle Rápido de Picos',
        suggestedParams: 'Attack: 5ms | Release: 60ms | Ratio: 4:1 | Redução: 2dB a 3dB apenas nos picos',
        tip: 'Primeiro estágio segura os picos mais rápidos sem alterar o tom geral.'
      },
      {
        position: 2,
        pluginName: 'Fruity Compressor / Limiter 2 (Compressor 2 - Corpo)',
        action: 'Compressão Óptica / Niveladora',
        suggestedParams: 'Attack: 25ms | Release: 150ms | Ratio: 2:1 | Redução: 3dB a 4dB constante',
        tip: 'Segundo estágio cola e levanta as sílabas mais baixas com naturalidade (Compressão Serial).'
      },
      {
        position: 3,
        pluginName: 'Volume Automation (FL Playlist)',
        action: 'Automação de Ganho Manual',
        suggestedParams: 'Crie um Clip de Automação de Volume no canal antes do compressor',
        tip: 'Automação antes da compressão faz o compressor trabalhar de maneira 100% uniforme.'
      }
    ],
    externalChainAlternative: ['Waves Vocal Rider', 'Teletronix LA-2A + 1176 Serial Chain', 'FabFilter Pro-C 2'],
    dos: ['Sempre use dois compressores trabalhando pouco (2-3dB cada) em vez de um único compressor esmagando 8dB.'],
    donts: ['Não confie apenas em compressores para resolver variações de 15dB entre estrofe e refrão. Use automação!']
  },
  {
    id: 'muito-seca',
    title: 'Muito seca / Desconectada do instrumental',
    iconName: 'Droplets',
    frequencyFocus: 'Dimensão Espacial & Profundidade 3D',
    description: 'Vocal soa como uma faixa isolada colada por cima da música, sem profundidade, sem ambiente e artificial.',
    rootCauses: [
      'Gravação em cabine 100% anecóica sem nenhum envio de efeitos espaciais',
      'Instrumental com muito reverb enquanto o vocal está totalmente cru'
    ],
    flNativeChain: [
      {
        position: 1,
        pluginName: 'Fruity Delay 3 (Canal Send 1)',
        action: 'Stereo Echo Sincronizado',
        suggestedParams: 'Time: 1/8 Dotted ou 1/4 | Feedback: 30% | High Pass: 400Hz | Low Pass: 4.5kHz',
        tip: 'Delay cria espaço tridimensional sem cobrir o vocal com a névoa do reverb.'
      },
      {
        position: 2,
        pluginName: 'Fruity Reeverb 2 (Canal Send 2)',
        action: 'Plate / Hall Reverb Espacial',
        suggestedParams: 'Pre-delay: 30ms | Decay: 1.8s | Low Cut: 450Hz | High Cut: 6.5kHz | Wet: 100%',
        tip: 'O Pré-delay de 30ms garante que a voz chegue primeiro limpa, e o reverb venha logo em seguida.'
      }
    ],
    externalChainAlternative: ['Valhalla VintageVerb', 'Soundtoys EchoBoy', 'FabFilter Pro-R'],
    dos: [
      'Envie o Delay para dentro do Reverb para criar um espaço ainda mais luxuoso e fluido.',
      'Sempre coloque o Reverb e Delay em canais do Mixer separados (Sends) com 100% Wet.'
    ],
    donts: ['Nunca coloque reverb direto no slot do canal do vocal com Wet alto, ou a voz perderá todo o foco e peso.']
  },
  {
    id: 'muito-agressiva',
    title: 'Muito agressiva / Excesso de dinâmica',
    iconName: 'Flame',
    frequencyFocus: '1 kHz – 4 kHz & Picos Descontrolados',
    description: 'O timbre soa irritante, agressivo e corta a audição como vidro, com transientes descontrolados.',
    rootCauses: [
      'Microfone muito brilhante + compressão com ataque muito lento',
      'Distorção e saturação anteriores aplicadas de forma desordenada'
    ],
    flNativeChain: [
      {
        position: 1,
        pluginName: 'Fruity Parametric EQ 2',
        action: 'Equalização Suave de Domínio',
        suggestedParams: 'Band 4 (1.5kHz: -2dB) + Band 5 (3.5kHz: -2.5dB com Q largo)',
        tip: 'Acalma as frequências mais sensíveis ao ouvido humano segundo as curvas de Fletcher-Munson.'
      },
      {
        position: 2,
        pluginName: 'Fruity Soft Clipper',
        action: 'Arredondamento de Transientes',
        suggestedParams: 'Threshold ajustado para domar os picos de ataque mais violentos',
        tip: 'Arredonda a forma de onda de maneira quente e musical.'
      }
    ],
    externalChainAlternative: ['Oeksound Spiff / Soothe2', 'Klanghelm MJUC', 'FabFilter Pro-MB'],
    dos: ['Experimente usar emulação de fita (Tape Saturation) para amaciar os transientes com calor analógico.'],
    donts: ['Não comprima com ratio acima de 8:1 sem necessidade real.']
  }
];

// Complete Frequency Spectrum Reference Map (20 Hz to 16 kHz)
export const frequencySpectrumReference = [
  {
    range: '20 Hz – 80 Hz',
    name: 'Sub-graves / Rumble',
    description: 'Ruído de baixa frequência, vibração do chão, passos e ar condicionado.',
    actionVocal: 'Cortar SEMPRE com High-Pass (HPF a 70Hz - 90Hz).',
    color: '#3b82f6',
    warning: 'Inaudível na maioria dos fones, mas consome headroom do master.'
  },
  {
    range: '100 Hz – 250 Hz',
    name: 'Corpo & Calor',
    description: 'Fundamentais da voz humana, calor e plenitude acústica.',
    actionVocal: 'Cuidado com excesso (voz abafada/pesada) ou falta (voz magra/sem peso).',
    color: '#06b6d4',
    warning: 'Muito sensível ao efeito de proximidade do microfone.'
  },
  {
    range: '250 Hz – 500 Hz',
    name: 'Boxiness / Som de Caixa',
    description: 'Frequências ocas, som de sala sem tratamento, ressonâncias de caixa de papelão.',
    actionVocal: 'Atenuar de 1.5dB a 4dB com Q médio para abrir clareza.',
    color: '#10b981',
    warning: 'Corte em excesso deixa o vocal esquelético e oco.'
  },
  {
    range: '700 Hz – 1.5 kHz',
    name: 'Região Nasal & Telefone',
    description: 'Som anasalado, buzina, características de megafone e inteligibilidade central.',
    actionVocal: 'Atenuar pontualmente se o vocalista soar anasalado.',
    color: '#eab308',
    warning: 'Essa faixa é vital para o vocal cortar em celulares.'
  },
  {
    range: '2 kHz – 5 kHz',
    name: 'Presença & Ataque',
    description: 'Consoantes, articulação, clareza e energia frontal na mixagem.',
    actionVocal: 'Aumentar suavemente para trazer para a frente; atenuar se soar estridente.',
    color: '#f97316',
    warning: 'Área de maior sensibilidade do ouvido humano. Excesso causa fadiga rápida.'
  },
  {
    range: '5 kHz – 8.5 kHz',
    name: 'Sibilância (S, SH, CH, T)',
    description: 'Consoantes fricativas e ruídos sibilantes cortantes.',
    actionVocal: 'Controlar com De-Esser cirúrgico em vez de corte fixo no EQ.',
    color: '#ef4444',
    warning: 'De-essing exagerado causa efeito de língua presa (lisping).'
  },
  {
    range: '10 kHz – 16 kHz',
    name: 'Ar, Brilho & Luxo',
    description: 'Extensão de altas frequências, brilho sedoso, sensação de gravação de estúdio cara.',
    actionVocal: 'Adicionar com High-Shelf suave (1dB - 3dB) para abrir ar.',
    color: '#a855f7',
    warning: 'Pode amplificar chiados de pré-amplificador se a gravação for ruidosa.'
  }
];
