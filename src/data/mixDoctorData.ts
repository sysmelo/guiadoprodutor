import { MixDoctorAlert } from '../types';

export const mixDoctorAlertsData: MixDoctorAlert[] = [
  {
    id: 'excesso-graves',
    title: 'POSSÍVEL EXCESSO DE GRAVES',
    severity: 'critical',
    freqRange: '20 Hz – 120 Hz',
    symptoms: [
      'Mixagem soa pesada e embolada em carros e fones de ouvido',
      'O medidor do master atinge 0dB muito rápido mesmo com pouco volume percebido',
      'Falta de clareza nos vocais e caixas'
    ],
    diagnosis: 'Acúmulo descontrolado de frequências subgraves e efeito de proximidade em várias faixas ao mesmo tempo.',
    solutionSteps: [
      '1. Ative High Pass Filter (HPF) em 75Hz - 100Hz em TODAS as faixas que não sejam Kick ou 808/Bass (vocais, guitarras, teclados, pads, efeitos).',
      '2. Coloque o Bass e o Kick em MONO absoluto abaixo de 100Hz usando o Fruity Stereo Shaper ou Maximus.',
      '3. Aplique corte passa-alta de 25Hz no Master para remover energia subgrave inaudível que satura o limiter.'
    ],
    flPluginRecommended: 'Fruity Parametric EQ 2 (Filtro High-Pass ordem 4 a 28Hz no Master)'
  },
  {
    id: 'vocal-abafado',
    title: 'POSSÍVEL VOCAL ABAFADO / MUDDY',
    severity: 'warning',
    freqRange: '200 Hz – 500 Hz',
    symptoms: [
      'A voz soa como se o cantor estivesse cantando com uma almofada ou dentro de uma caixa',
      'Falta de definição nas palavras',
      'Conflito constante entre o corpo da voz, o piano e a caixa da bateria'
    ],
    diagnosis: 'Ressonância acumulada na região dos médios-graves (Boxiness / Mud).',
    solutionSteps: [
      '1. Abra o Fruity Parametric EQ 2 no canal do vocal principal.',
      '2. Selecione a Banda 3 (Bell) com Q moderado (~1.8).',
      '3. Faça uma varredura entre 250Hz e 450Hz e atenue de 2dB a 4dB onde o som soar oco.',
      '4. Verifique se o bus de instrumentos tem um corte suave de 1dB na mesma frequência.'
    ],
    flPluginRecommended: 'Fruity Parametric EQ 2 (Corte Bell de 3dB em 320Hz)'
  },
  {
    id: 'possivel-sibilancia',
    title: 'POSSÍVEL SIBILÂNCIA AGRESSIVA',
    severity: 'warning',
    freqRange: '5 kHz – 9 kHz',
    symptoms: [
      'Letras "S", "SH", "T" e "CH" cortam os ouvidos como navalha',
      'Fadiga auditiva rápida ao escutar em fones de ouvido',
      'Pratos da bateria com som de vidro quebrado'
    ],
    diagnosis: 'Picos ressonantes descontrolados nas altas frequências amplificados por compressores rápidos ou boosts excessivos de agudo.',
    solutionSteps: [
      '1. Insira o Maximus no canal do vocal e carregue o preset "De-Esser".',
      '2. Isole a banda HIGH entre 5.5kHz e 8.5kHz.',
      '3. Ajuste o Threshold para que a atenuação ocorra APENAS quando o cantor pronunciar os "S", com redução de 3dB a 5dB.',
      '4. Nunca tente resolver com um corte fixo no EQ, pois deixará o vocal apagado quando não houver S.'
    ],
    flPluginRecommended: 'Maximus (De-Esser Mode na banda HIGH)'
  },
  {
    id: 'mix-muito-alta',
    title: 'MIXAGEM MUITO ALTA / SEM HEADROOM',
    severity: 'critical',
    freqRange: 'Nível Geral (0 dBFS)',
    symptoms: [
      'A luz vermelha do canal Master está acendendo durante a reprodução',
      'O áudio soa distorcido ou "craquelando" mesmo sem plugins no master',
      'Não há espaço dinâmico para os plugins de masterização processarem o som'
    ],
    diagnosis: 'Gain staging incorreto. Os faders individuais dos canais do mixer foram aumentados demais.',
    solutionSteps: [
      '1. Selecione todos os canais do mixer no FL Studio (exceto o Master).',
      '2. Reduza todos os faders simultaneamente para que o pico mais forte da música fique entre -6dB e -4dB no Master.',
      '3. Se preferir, insira um plugin de ganho transparente (como o Fruity Balance) no primeiro slot do canal Master e abaixe -5dB.'
    ],
    flPluginRecommended: 'Fruity Balance (-5dB de ganho) ou ajuste de Faders de Mixer'
  },
  {
    id: 'kick-bass-conflito',
    title: 'CONFLITO DE FASE: KICK & 808 EMBOLANDO',
    severity: 'critical',
    freqRange: '40 Hz – 100 Hz',
    symptoms: [
      'Quando o kick e o 808 tocam juntos, o grave desaparece ou enfraquece (cancelamento de fase)',
      'O bumbo não tem impacto e parece mole e indefinido',
      'Flutuação inconstante de volume nas notas graves'
    ],
    diagnosis: 'Kick e 808 disputando a exata mesma frequência fundamental ou com ondas fora de fase.',
    solutionSteps: [
      '1. Decida quem domina o subgrave mais profundo: Se o 808 for em 40Hz, ajuste o punch do kick para 75Hz-90Hz.',
      '2. No canal do 808, use o Fruity Parametric EQ 2 e dê um corte suave de 3dB na frequência fundamental do Kick.',
      '3. Configure Sidechain Compressor (Fruity Limiter no modo COMP com Sidechain do Kick) para que o 808 baixe 3dB instantaneamente quando o kick der o golpe.',
      '4. No sampler do Kick, experimente clicar em "Reverse Polarity" (Inverter fase) para checar se o grave fica mais gordo.'
    ],
    flPluginRecommended: 'Fruity Limiter (Sidechain Ducking) + Inverter Polaridade'
  },
  {
    id: 'falta-largura-stereo',
    title: 'MIXAGEM MUITO ESTREITA / SEM ESPAÇO',
    severity: 'info',
    freqRange: 'Campo Estéreo (L & R)',
    symptoms: [
      'Todos os instrumentos soam amontoados no meio da tela',
      'Falta de profundidade e sensação de estúdio profissional',
      'O vocal disputa atenção com guitarras, teclados e chimbal'
    ],
    diagnosis: 'Uso excessivo de faixas no centro sem distribuição de panning e ambiência estéreo.',
    solutionSteps: [
      '1. Mantenha no CENTRO (Mono): Kick, 808/Bass, Vocal Principal e Caixa principal.',
      '2. Faça PANNING nas laterais: Dobras vocais (L80% e R80%), Violões/Guitarras (L100% e R100%), Chimbais e Percussões (L25% a R35%).',
      '3. Adicione Reverbs e Delays em canais Send estéreo para criar largura ao redor do vocal.'
    ],
    flPluginRecommended: 'Fruity Stereo Enhancer / Fruity Stereo Shaper nos canais de instrumentos'
  },
  {
    id: 'vocal-afogado',
    title: 'VOCAL AFOGADO / INSTRUMENTAL MUITO ALTO',
    severity: 'warning',
    freqRange: '1 kHz – 4 kHz',
    symptoms: [
      'Não se consegue entender a letra da música sem esforço',
      'Os sintetizadores e guitarras cobrem a presença da voz',
      'Aumentar o volume do vocal deixa a mix desbalanceada'
    ],
    diagnosis: 'Mascaramento de frequências. Os instrumentos estão ocupando a mesma faixa dos harmônicos de inteligibilidade da voz.',
    solutionSteps: [
      '1. No bus de instrumentos (ou no beat 2-track), use um EQ e corte -1.5dB a -2.5dB em 3kHz com curva larga.',
      '2. Use compressão com ataque rápido (10ms) e release rápido no vocal para que ele fique estático na frente.',
      '3. Adicione saturação suave (Fruity Blood Overdrive) no vocal para gerar harmônicos que cortam a mixagem.'
    ],
    flPluginRecommended: 'Fruity Parametric EQ 2 (Corte no instrumental) + Fruity Blood Overdrive no vocal'
  },
  {
    id: 'over-compression',
    title: 'MIXAGEM ACHATADA / OVER-COMPRESSION',
    severity: 'critical',
    freqRange: 'Dinâmica Geral',
    symptoms: [
      'A música parece cansativa, sem vida e sem impacto quando o refrão entra',
      'A bateria não tem estalo e parece abafada',
      'Efeito de bombeamento (pumping) desagradável'
    ],
    diagnosis: 'Compressores e limiters com ataque rápido demais ou redução de ganho acima do recomendado.',
    solutionSteps: [
      '1. Aumente o tempo de ATTACK dos compressores de bateria e master (mude de 2ms para 25ms - 40ms) para deixar o estalo passar.',
      '2. Reduza o Ratio nos compressores individuais (mantenha entre 2:1 e 4:1).',
      '3. No master, garanta que a redução de ganho no compressor não passe de 2dB.'
    ],
    flPluginRecommended: 'Fruity Limiter (Ajustar ATTACK para 30ms e reduzir GAIN)'
  }
];
