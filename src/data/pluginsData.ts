import { AudioPlugin } from '../types';

export const audioPluginsData: AudioPlugin[] = [
  // ==========================================
  // 1. FL STUDIO NATIVES
  // ==========================================
  {
    id: 'fl-parametric-eq2',
    name: 'Fruity Parametric EQ 2',
    type: 'FL Native',
    category: 'Equalizador',
    level: 'Mix & Master',
    suggestedPosition: 1,
    description: 'Equalizador paramétrico de 7 bandas com visualizador de espectro em tempo real. Ideal para corte cirúrgico e reforço tonal.',
    functions: [
      'High-pass / Low-pass filtering (corte de subgraves e agudos ásperos)',
      'Remoção de ressonâncias pontuais com Q estreito',
      'Modelagem tonal suave com curvas Bell e High Shelf',
      'Análise espectral em tempo real (modo HQ)'
    ],
    suggestedParams: [
      'Vocal HPF: 75Hz - 90Hz (Ordem 4 / 24dB/oct)',
      'Mud Cut: 220Hz - 380Hz (-1.5dB a -3dB com Q moderado)',
      'Presença: 3.5kHz - 5kHz (+1.5dB a +2.5dB suave)',
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
      'Essencial para Trap, Drill, Afrobeat, Kuduro e Hip Hop moderno.'
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
    id: 'fl-pitcher-newtone',
    name: 'Pitcher & NewTone',
    type: 'FL Native',
    category: 'Afinação & Correção',
    level: 'Mix',
    suggestedPosition: 1,
    description: 'Pitcher (Auto-tune em tempo real no mixer) e NewTone (Editor gráfico cirúrgico de afinação e tempo de vocais).',
    functions: [
      'Correção automática em tempo real na escala da música (Pitcher)',
      'Ajuste manual nota por nota de pitch, drift e transições (NewTone)',
      'Efeito robótico / trap clássico ou correção imperceptível'
    ],
    suggestedParams: [
      'Pitcher Speed: Rápido (estilo Trap/Afro-Pop) ou Lento (estilo Acústico/R&B)',
      'Escala: Travar na tonalidade exata do beat (ex: C# Menor / A Maior)',
      'NewTone Center: 85% para manter naturalidade com afinação estável'
    ],
    problemsSolved: ['Voz fora do tom', 'Flutuações indesejadas de pitch', 'Fraseado vocal instável'],
    tips: ['Sempre configure a escala correta antes de começar a mixar para evitar notas falsas.'],
    warnings: ['NewTone altera o arquivo de áudio; salve uma cópia do vocal original antes de editar.']
  },

  // ==========================================
  // 2. STUDIO ONE NATIVES
  // ==========================================
  {
    id: 's1-pro-eq3',
    name: 'PreSonus Pro EQ³',
    type: 'Studio One Native',
    category: 'Equalizador',
    level: 'Mix & Master',
    suggestedPosition: 1,
    description: 'Equalizador de 7 bandas com filtros dinâmicos por banda, modo Solo de frequência e visualização FFT cristalina.',
    functions: [
      'Equalização dinâmica por banda com Attack/Release automáticos',
      'Cortes de alta ordem (24dB/oct, 48dB/oct)',
      'Filtro passa-alta e passa-baixa cirúrgicos',
      'Modo Solo Band para audição isolada de ressonâncias'
    ],
    suggestedParams: [
      'Vocal HPF: 80Hz com 24dB/oct',
      'Dynamic Notch: 3.2kHz (-2.5dB atenuando dinamicamente apenas nas sibilâncias)',
      'High Shelf: 10kHz (+2dB com boost musical e transparente)'
    ],
    problemsSolved: ['Ressonâncias pontuais agressivas', 'Conflito de graves entre kick e baixo'],
    tips: ['Use o botão de fone de ouvido para isolar a banda e encontrar a frequência exata que está incomodando.'],
    warnings: ['Evite ganhos excessivos acima de +6dB sem compensação de saída.']
  },
  {
    id: 's1-fat-channel-xt',
    name: 'Fat Channel XT',
    type: 'Studio One Native',
    category: 'Channel Strip',
    level: 'Mix & Master',
    suggestedPosition: 2,
    description: 'Channel strip completo e modular com emulações de consoles analógicos clássicos, compressores vintage (FET, Tube, OPTO) e EQs musicais.',
    functions: [
      'Emulações de compressores lendários (Tube 670, FET 1176, OPTO LA-2A)',
      'EQ Vintage (Passive Pultec style, British EQ)',
      'Gate / Expander com sidechain integrado',
      'Processamento completo em uma única interface ultra-otimizada'
    ],
    suggestedParams: [
      'Vocal: Modo Tube ou OPTO com redução de 3 a 5dB',
      'Bateria: Modo FET (1176) com ataque rápido e release 7 para punch firme',
      'EQ: British Channel com boost em 100Hz e 4.5kHz'
    ],
    problemsSolved: ['Falta de calor analógico', 'Necessidade de abrir múltiplos plugins em cada pista'],
    tips: ['Alterne entre os modelos de compressor com 1 clique para encontrar o timbre perfeito para o vocal.'],
    warnings: ['A ordem dos módulos (Gate -> EQ -> Compressor) pode ser invertida dependendo da intenção da mix.']
  },
  {
    id: 's1-tricomp',
    name: 'PreSonus Tricomp',
    type: 'Studio One Native',
    category: 'Compressor',
    level: 'Mix & Master',
    suggestedPosition: 3,
    description: 'Compressor multibanda de 3 faixas com controle de saturação analógica, compressão paralela integrada e ganho automático.',
    functions: [
      'Controle simultâneo de Low, Mid e High',
      'Saturação quente analógica com knob Drive',
      'Mix Dry/Wet para compressão paralela instantânea'
    ],
    suggestedParams: [
      'Vocal Bus: Compressão leve com 20% de Drive',
      'Drum Bus: Pressionar os médios e agudos para aumentar a densidade e impacto',
      'Mix Knob: 65% para manter a dinâmica natural por baixo'
    ],
    problemsSolved: ['Mix soando fina e sem peso', 'Falta de coesão no grupo de bateria'],
    tips: ['Perfeito no Drum Bus e no Master Bus para colar os instrumentos sem abafar os agudos.'],
    warnings: ['Cuidado com o Drive no Master para não saturar pratos e agudos.']
  },
  {
    id: 's1-redlightdist',
    name: 'RedlightDist',
    type: 'Studio One Native',
    category: 'Saturação / Distorção',
    level: 'Mix',
    suggestedPosition: 5,
    description: 'Processador de distorção e saturação com múltiplos estágios de válvulas (Tubes), Fuzz e transistor com controle de frequências.',
    functions: [
      'Aquecimento sutil estilo fita ou saturação agressiva estilo Fuzz',
      'Filtros de corte passa-alta e passa-baixa antes da distorção',
      'Mix Dry/Wet para aplicação paralela em 808 e sintetizadores'
    ],
    suggestedParams: [
      '808 Sub: Tube Mode, Drive 25%, High Cut em 5kHz',
      'Adlibs de Voz: Hard Fuzz com HPF em 300Hz e 60% Wet'
    ],
    problemsSolved: ['808 inaudível no celular', 'Guitarras ou Synths estéreis'],
    tips: ['Adicione no canal de Envio (FX Bus) para saturar apenas frequências médias da voz.'],
    warnings: ['Em 100% Wet pode destruir a fidelidade de gravações limpas.']
  },
  {
    id: 's1-openair',
    name: 'PreSonus OpenAIR',
    type: 'Studio One Native',
    category: 'Reverb & Espaço',
    level: 'Bus & Send',
    suggestedPosition: 6,
    description: 'Reverb de convolução de alta fidelidade com resposta a impulsos reais de salas de estúdio, catedrais e placas analógicas.',
    functions: [
      'Reprodução acústica hiper-realista baseada em Impulse Responses (IR)',
      'EQ de 6 bandas integrado no retorno do reverb',
      'Crossfeed e controle de imagem estéreo tridimensional'
    ],
    suggestedParams: [
      'Vocal: IR de "Vintage Plate" com 1.8s de decaimento e 25ms de Pre-delay',
      'Bateria: IR de "Studio Drum Room" com 0.8s para criar ambiente natural'
    ],
    problemsSolved: ['Reverb soando metálico ou falso', 'Sensação de separação artificial'],
    tips: ['Importe seus próprios arquivos WAV de Impulse Response arrastando direto para a interface.'],
    warnings: ['Reverbs de convolução consomem ligeiramente mais CPU que algoritmos sintéticos.']
  },
  {
    id: 's1-groove-delay',
    name: 'PreSonus Groove Delay',
    type: 'Studio One Native',
    category: 'Delay',
    level: 'Bus & Send',
    suggestedPosition: 6,
    description: 'Delay multitap avançado de 4 taps independentes com filtros passa-banda e modulação rítmica.',
    functions: [
      '4 linhas de delay independentes com controle de Pan, Volume e Filtro',
      'Criação de padrões rítmicos complexos e ecos espaciais',
      'Sincronização milimétrica com o andamento do Studio One'
    ],
    suggestedParams: [
      'Tap 1: 1/8 beat (Pan 40% Left)',
      'Tap 2: 1/4 beat (Pan 40% Right)',
      'Tap 3: 1/2 beat com filtro passa-banda em 1kHz'
    ],
    problemsSolved: ['Ecos monótonos e estáticos', 'Falta de espacialidade em instrumentos de teclado'],
    tips: ['Excelente para guitarras de Kizomba e sintetizadores de Afro-Pop.'],
    warnings: ['Mantenha os volumes dos taps secundários atenuados (-6dB) para não sujar a mix.']
  },

  // ==========================================
  // 3. WAVES AUDIO SUITE
  // ==========================================
  {
    id: 'waves-cla-76',
    name: 'Waves CLA-76 (Blacky / Bluey)',
    type: 'Waves Audio',
    category: 'Compressor',
    level: 'Mix',
    suggestedPosition: 2,
    description: 'Emulação lendária do compressor FET 1176 classe A. Ultrarrápido, ideal para agarrar transientes de vocais, caixas e baterias com atitude.',
    functions: [
      'Ataque ultrarrápido (microsegundos) para controle instantâneo de picos',
      'Saturação harmônica característica de transformador analógico',
      'Modo "All-Buttons In" (British Mode) para explosão de transientes na bateria'
    ],
    suggestedParams: [
      'Vocal Principal: Attack 3 (moderado), Release 7 (super rápido), Ratio 4:1',
      'Gain Reduction: 3dB a 7dB nos picos mais agressivos',
      'Input: Empurrar até atingir a agulha no ritmo da música'
    ],
    problemsSolved: ['Voz instável com picos pulando na cara do ouvinte', 'Caixa de bateria sem estalo e pegada'],
    tips: [
      'No 1176, o número 7 é o mais rápido e o 1 é o mais lento (inverso da maioria dos plugins).',
      'Coloque o CLA-76 PRIMEIRO na cadeia de voz para segurar os picos rápidos antes de um CLA-2A.'
    ],
    warnings: ['Attack em 7 em uma bateria pode matar completamente o transiente inicial do tambor.']
  },
  {
    id: 'waves-cla-2a',
    name: 'Waves CLA-2A',
    type: 'Waves Audio',
    category: 'Compressor',
    level: 'Mix',
    suggestedPosition: 3,
    description: 'Emulação do compressor óptico valvulado Teletronix LA-2A. Ataque suave e curva de release dependente do programa musical.',
    functions: [
      'Nivelamento suave e musical de vocais, baixos e guitarras',
      'Calor valvulado rico em harmônicos de segunda ordem',
      'Operação simples com 2 botões principais (Gain e Peak Reduction)'
    ],
    suggestedParams: [
      'Modo: Compress (não Limit)',
      'Peak Reduction: Ajustar para 2dB a 4dB de redução contínua',
      'Gain: Compensar o volume para igualar a entrada (Gain Matching)'
    ],
    problemsSolved: ['Vocal soando digital e frio', 'Baixo oscilando de volume entre notas graves e agudas'],
    tips: [
      'A combinação de ouro da indústria: CLA-76 (pega os picos rápidos) -> CLA-2A (cola e dá calor aveludado).'
    ],
    warnings: ['Não use em bumbos rápidos de Kuduro ou Trap, pois o release óptico é lento demais para kicks.']
  },
  {
    id: 'waves-ssl-e-channel',
    name: 'Waves SSL E-Channel',
    type: 'Waves Audio',
    category: 'Channel Strip',
    level: 'Mix',
    suggestedPosition: 1,
    description: 'Emulação fiel do canal do console Solid State Logic 4000E com EQ Black/Brown Knob, Compressor VCA e Expander/Gate.',
    functions: [
      'Equalização cirúrgica e incisiva clássica de estúdio',
      'Compressor VCA agressivo com curva musical',
      'Filtros passa-alta e passa-baixa de inclinação acentuada'
    ],
    suggestedParams: [
      'Vocal: High Shelf 8kHz (+3dB), corte em 350Hz (-2dB), compressor Ratio 3:1',
      'Snare: Reforço em 200Hz (+3dB) e 5kHz (+4dB) com Fast Attack ativado'
    ],
    problemsSolved: ['Falta de definição no mix', 'Canais soando soltos sem cola de console'],
    tips: ['Ative o botão "Dyn To Channel" para rotear os filtros diretamente para o detector do compressor.'],
    warnings: ['Os botões analógicos (Analog Noise) adicionam chiado de fundo; desligue se gravar muitas pistas.']
  },
  {
    id: 'waves-r-vox',
    name: 'Waves Renaissance Vox (R-Vox)',
    type: 'Waves Audio',
    category: 'Compressor',
    level: 'Mix',
    suggestedPosition: 2,
    description: 'O compressor de vocal mais famoso da história da música urbana. Combina compressão inteligente, expansão de ruído e ganho automático.',
    functions: [
      'Compressão vocal com 1 único fader',
      'Gate/Expander automático para silenciar ruído de ar condicionado e respiração',
      'Ganho de maquiagem automático perfeitamente calibrado'
    ],
    suggestedParams: [
      'Comp: Baixar o fader até indicar -3dB a -6dB de redução',
      'Gate: Ajustar suavemente em -45dB a -55dB para fechar nas pausas',
      'Gain: Ajustar saída para não clipar o master'
    ],
    problemsSolved: ['Vocais que somem atrás do beat', 'Processo lento de ajuste de múltiplos botões'],
    tips: ['Usado por engenheiros de mixagem em 90% dos hits de Rap, Trap, Afrobeat e Pop mundial.'],
    warnings: ['Compressão acima de -10dB de redução deixará o vocal excessivamente sufocado.']
  },
  {
    id: 'waves-r-bass',
    name: 'Waves Renaissance Bass (R-Bass)',
    type: 'Waves Audio',
    category: 'Saturação / Distorção',
    level: 'Mix',
    suggestedPosition: 4,
    description: 'Gerador de harmônicos psicoacústicos patenteado que permite ouvir os graves mais profundos em celulares e caixas pequenas.',
    functions: [
      'Geração de harmônicos superiores a partir da fundamental grave',
      'Aumento perceptível de peso e presença de graves sem aumentar o pico em dBFS',
      'Frequência fundamental ajustável de 32Hz a 120Hz'
    ],
    suggestedParams: [
      '808 Trap/Kuduro: Frequência em 55Hz - 65Hz com Intensidade em -4dB a -8dB',
      'Baixo Elétrico: Frequência em 80Hz - 100Hz',
      'Bumbo: Frequência em 50Hz'
    ],
    problemsSolved: ['Baixo desaparece ao escutar no celular ou notebook', 'Falta de peso no sub'],
    tips: ['Adicione no 808 antes de um clipper suave para dar máxima presença e consistência.'],
    warnings: ['Intensidade excessiva fará o som soar abafado e plastificado nos fones de ouvido.']
  },
  {
    id: 'waves-puigtec-eqp1a',
    name: 'Waves PuigTec EQP-1A',
    type: 'Waves Audio',
    category: 'Equalizador',
    level: 'Mix & Master',
    suggestedPosition: 4,
    description: 'Emulação do equalizador passivo valvulado Pultec EQP-1A. Famoso pelo "truque do Pultec" de boost e atenuação simultâneos.',
    functions: [
      'Graves sólidos e aveludados com o truque Boost + Atten em 30Hz ou 60Hz',
      'Agudos sedosos e abertos em 12kHz ou 16kHz sem nenhuma aspereza digital',
      'Saturação valvulada analógica suave de transformador'
    ],
    suggestedParams: [
      'Low End Trick: Freq 60Hz -> Boost em 4 -> Atten em 3.5 (limpa o grave e dá peso compacto)',
      'High End Air: Freq 12kHz ou 16kHz -> Boost em 3.5 com Bandwidth larga (3 a 5)'
    ],
    problemsSolved: ['Agudos estridentes', 'Graves ocos ou fracos'],
    tips: ['Coloque no Master Bus ou no Vocal Bus para adicionar aquele "ar de disco de platina".'],
    warnings: ['Como é um EQ passivo, pequenas rotações causam grandes mudanças na curva tonal.']
  },
  {
    id: 'waves-h-delay',
    name: 'Waves H-Delay Hybrid Delay',
    type: 'Waves Audio',
    category: 'Delay',
    level: 'Bus & Send',
    suggestedPosition: 6,
    description: 'Delay híbrido analógico/digital com emulação de saturação de fita, modulação Lo-Fi, pitch shift ao alterar tempo e modos Ping-Pong.',
    functions: [
      'Sincronização musical por tempo (BPM Sync) com divisões Dotted e Triplet',
      'Filtros High-Pass e Low-Pass integrados para o truque Abbey Road',
      'Modulação de pitch analógica clássica (Lo-Fi e Analog knobs)'
    ],
    suggestedParams: [
      'Vocal Moderno: 1/8 D (Dotted), Feedback 25%, HPF em 350Hz, LPF em 4kHz, Ping-Pong ON',
      'Analog Mode: Desligar (0) ou Modo 1 para evitar ruído residual indesejado'
    ],
    problemsSolved: ['Delay atrapalhando a clareza do vocal', 'Falta de largura no espaço estéreo'],
    tips: ['Sempre filtre os graves (HPF 300Hz+) e agudos (LPF 4kHz) para o eco sentar naturalmente atrás da voz.'],
    warnings: ['Os modos analógicos (1, 2, 3, 4) introduzem ruído contínuo de 50Hz/60Hz se não forem desativados.']
  },
  {
    id: 'waves-silk-vocal',
    name: 'Waves Silk Vocal',
    type: 'Waves Audio',
    category: 'De-Esser',
    level: 'Mix',
    suggestedPosition: 1,
    description: 'Processador dinâmico vocal inteligente que detecta e remove automaticamente asperezas, ressonâncias estridentes e sibilâncias em tempo real.',
    functions: [
      'Processamento inteligente de ressonâncias médias e agudas',
      'Curva dinâmica que atua apenas quando frequências irritantes ocorrem',
      'Filtro passa-alta e modelador de calor tonal integrado'
    ],
    suggestedParams: [
      'Mid Resonance Reduction: 20% a 40%',
      'High Sibilance Reduction: 30% a 50%',
      'Warmth: Ativar se a voz gravada for muito magra'
    ],
    problemsSolved: ['Voz estridente gravada em microfone barato', 'Sibilância metálica agressiva'],
    tips: ['Use como primeiro plugin na cadeia de voz antes do compressor para facilitar a mixagem.'],
    warnings: ['Valores extremos de redução podem deixar o vocal sem brilho natural e opaco.']
  },

  // ==========================================
  // 4. FABFILTER SUITE
  // ==========================================
  {
    id: 'fabfilter-pro-q3',
    name: 'FabFilter Pro-Q 3',
    type: 'FabFilter',
    category: 'Equalizador',
    level: 'Mix & Master',
    suggestedPosition: 1,
    description: 'Padrão global da indústria musical para equalização dinâmica, cirúrgica e linear phase com até 24 bandas e processamento Mid/Side.',
    functions: [
      'EQ Dinâmico automático por banda (comprime apenas quando a frequência ultrapassa o teto)',
      'Processamento Mid/Side e Left/Right independente por banda',
      'Modo Linear Phase de alta resolução para masterização',
      'Detecção de colisão espectral com outras pistas em tempo real (Spectrum Clash)'
    ],
    suggestedParams: [
      'Sidechain Dynamic EQ: No Beat ou Baixo, atenuar dinamicamente 3kHz quando o vocal cantar',
      'Mid/Side Master: Cortar graves abaixo de 100Hz no canal SIDE (mono maker)',
      'Vocal Mud: Corte dinâmico de -2.5dB em 280Hz'
    ],
    problemsSolved: ['Conflito de frequências entre kick e baixo', 'Ressonâncias intermitentes', 'Graves estéreo descontrolados'],
    tips: [
      'Clique com botão direito em qualquer banda e selecione "Make Dynamic" para transformar em EQ dinâmico.',
      'Use o Spectrum Grab para congelar picos ressonantes na tela e puxar para baixo.'
    ],
    warnings: ['O modo Linear Phase gera latência; evite usar enquanto grava voz ao vivo.']
  },
  {
    id: 'fabfilter-pro-c2',
    name: 'FabFilter Pro-C 2',
    type: 'FabFilter',
    category: 'Compressor',
    level: 'Mix & Master',
    suggestedPosition: 2,
    description: 'Compressor de precisão cirúrgica com 8 estilos sonoros (Vocal, Clean, Classic, Bus, Punch, Mastering, Opto, Pumping).',
    functions: [
      'Algoritmos especializados de compressão para qualquer fonte sonora',
      'Filtro de Sidechain avançado com curvas Low/High Cut e Band-pass',
      'Visualização de envelope de ganho e nível em tempo real com Lookahead'
    ],
    suggestedParams: [
      'Vocal: Style "Vocal" ou "Opto", Ratio 3:1, Attack 15ms, Release Auto, Lookahead 1.5ms',
      'Drum Bus: Style "Punch" ou "Bus", Ratio 4:1, Attack 30ms, Release 100ms'
    ],
    problemsSolved: ['Compressão com artefatos de pumping', 'Falta de consistência dinâmica na voz'],
    tips: ['Ative o filtro de sidechain cortando abaixo de 120Hz para que o grave do beat não acione a compressão do Master.'],
    warnings: ['Ajuste o Auto Gain ou faça ganho manual para sempre comparar com o mesmo volume aparente.']
  },
  {
    id: 'fabfilter-pro-ds',
    name: 'FabFilter Pro-DS',
    type: 'FabFilter',
    category: 'De-Esser',
    level: 'Mix',
    suggestedPosition: 3,
    description: 'De-esser inteligente com algoritmo "Single Vocal" de detecção preditiva de sibilâncias em tempo real sem afetar os agudos da voz.',
    functions: [
      'Detecção inteligente de consoantes sibilantes (S, T, CH, Z)',
      'Modo All Round para buses de bateria, guitarras ou pratos ásperos',
      'Modo Audition para ouvir isoladamente o que está sendo atenuado'
    ],
    suggestedParams: [
      'Mode: Single Vocal',
      'Range: 5.5kHz a 9.5kHz',
      'Threshold: Ajustar até a linha amarela atingir -3dB a -5dB nos momentos de S'
    ],
    problemsSolved: ['Sibilância penetrante nos ouvidos', 'Pratos de bateria ásperos'],
    tips: ['Use o botão de fone de ouvido (Audition) para garantir que você só está ouvindo assobios de S e não vogais cantadas.'],
    warnings: ['Atenuação excessiva fará o artista parecer ter problemas de dicção (língua presa).']
  },
  {
    id: 'fabfilter-saturn-2',
    name: 'FabFilter Saturn 2',
    type: 'FabFilter',
    category: 'Saturação / Distorção',
    level: 'Mix & Master',
    suggestedPosition: 5,
    description: 'Processador de saturação e distorção multibanda com emulações de fita magnética, válvulas, amplificadores e transformadores.',
    functions: [
      'Até 6 bandas de frequência com diferentes tipos de saturação por banda',
      'Emulações analógicas ricas (Warm Tube, Tape, Gentle Saturation, Clean Tube)',
      'Modulação profunda com envelopes, LFOs e controladores MIDI'
    ],
    suggestedParams: [
      'Vocal Warmth: Warm Tape nos médios (300Hz-3kHz) com 15% Drive',
      '808 Bass: Saturation Tube nos médios-altos (500Hz-2kHz) para presença em celulares',
      'Master Tape Glue: Gentle Saturation com 5% de Drive no sinal inteiro'
    ],
    problemsSolved: ['Sons digitais frios e estéreis', 'Instrumentos que não se destacam na mix'],
    tips: ['Separe o sinal em 2 bandas: mantenha o sub limpo e sature apenas a faixa média dos 808s.'],
    warnings: ['Ajuste o botão Mix ou compensação de ganho para não confundir ganho de volume com melhoria harmônica.']
  },
  {
    id: 'fabfilter-timeless-3',
    name: 'FabFilter Timeless 3',
    type: 'FabFilter',
    category: 'Delay',
    level: 'Bus & Send',
    suggestedPosition: 6,
    description: 'Delay de fita estéreo vintage com filtros analógicos lendários, modulação ilimitada e controle de difusão de reverberação.',
    functions: [
      'Ecos quentes com emulação de fita analógica',
      'Até 6 filtros multimodo integrados no loop de feedback',
      'Mecanismo de difusão que transforma delay em ambiência fluida'
    ],
    suggestedParams: [
      'Ping Pong Delay: 1/8 Dotted com filtro passa-banda e 30% feedback',
      'Tape Chorus: Delay de 25ms com modulação sutil para abertura estéreo'
    ],
    problemsSolved: ['Delay soando digital demais', 'Falta de ambiência envolvente'],
    tips: ['Adicione saturação interna no menu de efeitos do Timeless para ecos com personalidade analógica.'],
    warnings: ['Evite feedbacks muito longos sem filtro passa-baixa ativado.']
  },
  {
    id: 'fabfilter-pro-r2',
    name: 'FabFilter Pro-R 2',
    type: 'FabFilter',
    category: 'Reverb & Espaço',
    level: 'Bus & Send',
    suggestedPosition: 6,
    description: 'Reverb algorítmico e por impulsos de alta fidelidade com controles acústicos naturais (Brightness, Character, Distance, Decay Rate EQ).',
    functions: [
      'Decay Rate EQ para controlar o tempo de decaimento exato em cada frequência',
      'Importação de Impulse Responses (IRs) em WAV com suporte surround e Dolby Atmos',
      'Duck Reverb integrado que diminui o efeito automaticamente enquanto o vocal canta'
    ],
    suggestedParams: [
      'Vocal Plate: Space em 1.5s, Distance 35%, Pre-delay 30ms, Ducking em 3dB',
      'Decay EQ: Atenuar decaimento em 200Hz para não sujar os graves'
    ],
    problemsSolved: ['Reverb embolando a voz', 'Dificuldade em controlar a cauda do efeito'],
    tips: ['Use o controle "Ducking" embutido no Pro-R 2 para evitar ter que configurar sidechain manual.'],
    warnings: ['Mantenha a distância (Distance) baixa para que a voz principal permaneça próxima e íntima.']
  },
  {
    id: 'fabfilter-pro-mb',
    name: 'FabFilter Pro-MB',
    type: 'FabFilter',
    category: 'Compressor',
    level: 'Mix & Master',
    suggestedPosition: 3,
    description: 'Compressor e expansor multibanda profissional com fluxo de trabalho aberto sem crossovers fixos e processamento Mid/Side.',
    functions: [
      'Criação de bandas dinâmicas livres em qualquer ponto do espectro',
      'Controle dinâmico cirúrgico de graves (ex: segurar sub em 50Hz)',
      'Processamento Mid/Side independente por banda'
    ],
    suggestedParams: [
      'Vocal De-Box: Banda em 300Hz-500Hz comprimindo 3dB apenas quando soa nasal',
      'Master Low Glue: Banda em 40Hz-120Hz com compressão suave 2:1 para amarrar o subgrave'
    ],
    problemsSolved: ['Conflito de graves descontrolado', 'Mudança excessiva de timbre entre frases vocais'],
    tips: ['O Pro-MB permite definir uma faixa de detecção diferente da faixa de compressão (Sidechain avançado).'],
    warnings: ['Mantenha o número de bandas baixo (2 a 4) para preservar a integridade de fase.']
  },
  {
    id: 'fabfilter-pro-l2',
    name: 'FabFilter Pro-L 2',
    type: 'FabFilter',
    category: 'Limiter & Clipper',
    level: 'Master',
    suggestedPosition: 7,
    description: 'True Peak Limiter de referência mundial para masterização com medição LUFS, 8 algoritmos e proteção inter-sample.',
    functions: [
      '8 algoritmos sonoros de ponta (Modern, Transparent, Aggressive, Dynamic, Punchy, etc.)',
      'Medição integrada de LUFS (Integrated, Short-term, Momentary) e True Peak (dBTP)',
      'DC Offset removal e Dithering de estúdio com noise shaping'
    ],
    suggestedParams: [
      'Style: Modern ou Transparent para Pop/Afrobeat; Aggressive para Trap/Drill/Kuduro',
      'Ceiling: -1.0 dBTP (streaming seguro contra distorção)',
      'Lookahead: 0.5ms a 1.0ms com True Peak Limiting ativado'
    ],
    problemsSolved: ['Distorção inter-sample na conversão MP3', 'Perda de impacto e volume no master'],
    tips: ['Para sons com muito 808 e sub, o algoritmo "Aggressive" ou "Punchy" preserva os graves sem abafar a mix.'],
    warnings: ['Não aperte o ganho além do necessário se a mix começar a perder profundidade estéreo.']
  },

  // ==========================================
  // 5. SOUNDTOYS, iZOTOPE, SLATE, UAD & OUTRAS EMPRESAS TOP
  // ==========================================
  {
    id: 'soundtoys-decapitator',
    name: 'Soundtoys Decapitator',
    type: 'Soundtoys',
    category: 'Saturação / Distorção',
    level: 'Mix',
    suggestedPosition: 5,
    description: 'O saturador analógico mais aclamado pelos maiores produtores do mundo. 5 modelos de saturação analógica (A, E, N, T, P) com botão Punish.',
    functions: [
      '5 estilos analógicos: Neve, EMI, Ampex, Thermionic Culture Vulture',
      'Controle Tone e Dark/Bright com filtros Low/High Cut',
      'Botão "Punish" (+20dB de ganho analógico) e Mix Dry/Wet integrado'
    ],
    suggestedParams: [
      'Vocal: Style "E" ou "A", Drive em 2.5, Tone em +1 (brilho aveludado), Mix em 100%',
      '808 / Baixo: Style "N" ou "T", Drive em 3.5 para rugir e aparecer no celular',
      'Bateria Paralela: Style "P", botão Punish ativado com Mix em 25%'
    ],
    problemsSolved: ['Sons estéreis e sem atitude', 'Vocal afundando atrás dos sintetizadores'],
    tips: ['Use o botão "Thump" no estilo analógico para adicionar peso no subgrave ao saturar.'],
    warnings: ['Com o botão Punish ligado, ajuste o volume de saída imediatamente para não estourar seus ouvidos.']
  },
  {
    id: 'soundtoys-echoboy',
    name: 'Soundtoys EchoBoy',
    type: 'Soundtoys',
    category: 'Delay',
    level: 'Bus & Send',
    suggestedPosition: 6,
    description: 'A enciclopédia definitiva de delays analógicos com mais de 30 emulações históricas de máquinas de fita, bucket brigade e digitais.',
    functions: [
      'Emulações de Roland Space Echo, Echoplex, Memory Man, Tel-Ray e delays digitais clássicos',
      'Controle de saturação de fita integrado (Groove, Feel, Accent)',
      'Modos Single, Dual Echo, Ping-Pong e Rhythm Echo'
    ],
    suggestedParams: [
      'Vocal Send: Style "Studio Tape" ou "Echoplex", 1/8 Dotted, Saturation em 3.0, High Cut 3.8kHz',
      'Guitarras/Synths: Style "Memory Man" com modulação Chorus sutil'
    ],
    problemsSolved: ['Delays frios e desconectados do clima da música'],
    tips: ['Adicione saturação no próprio delay para criar um eco com cor vintage que não compete com a voz limpa.'],
    warnings: ['Ajuste o High Cut para não deixar o eco com agudos excessivos.']
  },
  {
    id: 'soundtoys-microshift',
    name: 'Soundtoys MicroShift',
    type: 'Soundtoys',
    category: 'Stereo & Utility',
    level: 'Mix & Master',
    suggestedPosition: 5,
    description: 'Emulação do clássico truque de micro pitch shift estéreo dos processadores Eventide H3000 e AMS DMX para largura estéreo gigantesca.',
    functions: [
      'Alargamento estéreo encorpado sem problemas de cancelamento de fase',
      '3 estilos de desafinação e micro-delay sutis',
      'Filtro Focus para alargar apenas frequências médias e agudas mantendo o centro limpo'
    ],
    suggestedParams: [
      'Vocal Lead: Mix em 15% - 25%, Focus em 400Hz (deixa o centro sólido e abre os lados)',
      'Backing Vocals: Style 2, Mix em 50% - 70% para espalhar nas laterais',
      'Sintetizadores: Style 1, Mix em 40%'
    ],
    problemsSolved: ['Voz soando magra e fina no centro', 'Backing vocals sem dimensão espacial estéreo'],
    tips: ['Ajuste o controle "Focus" para que as frequências graves continuem 100% no centro mono.'],
    warnings: ['Mix em 100% no vocal principal pode fazer a voz perder o foco central.']
  },
  {
    id: 'izotope-nectar-4',
    name: 'iZotope Nectar 4',
    type: 'iZotope',
    category: 'Channel Strip',
    level: 'Mix',
    suggestedPosition: 1,
    description: 'Suíte completa de produção vocal com inteligência artificial, módulo Auto-Level, Backer (gerador de coros), Dynamic EQ e Harmonics.',
    functions: [
      'Módulo Auto-Level: ajusta o ganho da voz dinamicamente antes de bater nos compressores',
      'Módulo Voices / Backer: criação de dobras e harmonias vocais automáticas',
      'Módulo Vocal Unmask: limpa o instrumental na frequência exata onde a voz está cantando'
    ],
    suggestedParams: [
      'Auto-Level: Target -18 LUFS com resposta moderada',
      'Compressor: 2 estágios (Digital Clean -> Vintage Optical)',
      'De-Esser: Range 6kHz - 10kHz com -4dB de redução'
    ],
    problemsSolved: ['Vocalista cantando muito perto e longe do microfone', 'Instrumental cobrindo a voz'],
    tips: ['Use o Vocal Assistant para obter um ponto de partida calibrado em 5 segundos.'],
    warnings: ['Desative módulos que não estiver usando para poupar processamento da CPU.']
  },
  {
    id: 'izotope-rx10',
    name: 'iZotope RX 10 (Voice De-noise & Mouth De-click)',
    type: 'iZotope',
    category: 'Channel Strip',
    level: 'Mix',
    suggestedPosition: 1,
    description: 'Padrão ouro de restauração de áudio mundial. Remove ruídos de fundo, estalos de saliva na boca, sopros de ar e ressonâncias acústicas da sala.',
    functions: [
      'Mouth De-click: remove cliques e estalos de saliva na voz sem alterar o timbre',
      'Voice De-noise: elimina chiado de pré-amplificador, ar condicionado e ruído ambiente',
      'De-plosive: remove estouros de ar no microfone nas letras P e B'
    ],
    suggestedParams: [
      'Mouth De-click: Sensibilidade em 3.5 a 5.0 (remove saliva sem artefatos)',
      'Voice De-noise: Modo "Adaptive", redução de 6dB a 10dB de ruído estático'
    ],
    problemsSolved: ['Gravação feita em quarto sem tratamento com chiado', 'Estalos de saliva na voz'],
    tips: ['Coloque SEMPRE como o primeiro plugin absoluto antes de qualquer compressor.'],
    warnings: ['Redução de ruído acima de 15dB pode gerar artefatos metálicos tipo "flanger aquático".']
  },
  {
    id: 'slate-fresh-air',
    name: 'Slate Digital Fresh Air',
    type: 'Slate Digital',
    category: 'Equalizador',
    level: 'Mix & Master',
    suggestedPosition: 4,
    description: 'Processador de brilho e ar dinâmico baseado em circuitos vintage de excitação de alta frequência (Air Band).',
    functions: [
      'Adição de brilho cristalino moderno (Mid Air e High Air)',
      'Processamento dinâmico que não satura nem soa áspero',
      'Abertura instantânea de vocais, pratos e mixagens fechadas'
    ],
    suggestedParams: [
      'Vocal Principal: Mid Air em 12% - 20%, High Air em 15% - 25%',
      'Master Bus: Mid Air em 5%, High Air em 8% para toque final de polimento'
    ],
    problemsSolved: ['Vocal escuro ou abafado', 'Mixagem sem brilho comercial'],
    tips: ['Adicione APÓS o de-esser para não excitar as sibilâncias da voz.'],
    warnings: ['Mais de 30% em ambos os knobs tornará a mixagem cansativa para o ouvido em fones.']
  },
  {
    id: 'oeksound-soothe2',
    name: 'Oeksound Soothe2',
    type: 'Valhalla & Oeksound',
    category: 'Equalizador',
    level: 'Mix & Master',
    suggestedPosition: 2,
    description: 'Supressor dinâmico de ressonâncias revolucionário. Escaneia milhares de frequências em tempo real e atenua apenas picos ásperos.',
    functions: [
      'Remoção instantânea de asperezas, nasalidade e sibilâncias',
      'Abertura de espaço para vocais no instrumental via Sidechain Dinâmico',
      'Modo Mid/Side para suavizar agudos nas laterais'
    ],
    suggestedParams: [
      'Vocal: Depth em 2.5 a 4.0, Sharpness 5.0, focado na faixa de 2kHz a 9kHz',
      'Instrumental Bus (Sidechain com Voz): Reduzir 2dB nas frequências em que a voz está cantando'
    ],
    problemsSolved: ['Voz estridente e metálica', 'Pratos e guitarras furando os ouvidos'],
    tips: ['Coloque no Bus do Instrumental com Sidechain na voz para o beat abrir espaço para a voz magicamente.'],
    warnings: ['Depth muito alto (acima de 7) deixará o som abafado e sem energia natural.']
  },
  {
    id: 'valhalla-vintageverb',
    name: 'Valhalla VintageVerb',
    type: 'Valhalla & Oeksound',
    category: 'Reverb & Espaço',
    level: 'Bus & Send',
    suggestedPosition: 6,
    description: 'Reverb algorítmico moderno e vintage aclamado mundialmente com 20 modos sonoros (1970s, 1980s, NOW, Sanctuary, Concert Hall, Plate).',
    functions: [
      '3 eras sonoras: 1970s (10kHz Lo-Fi), 1980s (brilhante), NOW (cristalino sem coloração)',
      'Algoritmos de Plate, Concert Hall, Chamber e Ambience',
      'Controles integrados de Pre-delay, High Cut, Low Cut e Damping'
    ],
    suggestedParams: [
      'Vocal Plate: Color "1980s", Mode "Plate" ou "Concert Hall", Decay 1.8s, Pre-delay 25ms, High Cut 5.5kHz',
      'Snare Room: Mode "Ambience", Decay 0.8s, Mix 100% no canal Send'
    ],
    problemsSolved: ['Reverb artificial ou gelado', 'Falta de profundidade tridimensional'],
    tips: ['O modo "1980s" tem um timbre aveludado que casa perfeitamente com vocais de Trap, RnB, Pop e Afro-Pop.'],
    warnings: ['Sempre corte abaixo de 250Hz com o Low Cut integrado para manter a clareza da mixagem.']
  },
  {
    id: 'antares-autotune-pro',
    name: 'Antares Auto-Tune Pro X',
    type: 'Antares & Celemony',
    category: 'Afinação & Correção',
    level: 'Mix',
    suggestedPosition: 1,
    description: 'O padrão mundial definitivo de correção e efeito vocal de afinação em tempo real usado nos maiores hits do planeta.',
    functions: [
      'Correção automática em tempo real de pitch com latência zero',
      'Controle de Retune Speed (de natural transparente a efeito robótico hard-tune)',
      'Flex-Tune e Humanize para preservar a expressão e vibrato natural do cantor'
    ],
    suggestedParams: [
      'Trap / Drill / Kuduro Moderno: Retune Speed 0 - 5, Flex-Tune 0, Humanize 0',
      'Pop / Afrobeat / R&B: Retune Speed 15 - 25, Flex-Tune 20, Humanize 15',
      'Acústico / Natural: Retune Speed 35 - 50, Flex-Tune 40, Humanize 30'
    ],
    problemsSolved: ['Voz fora do tom', 'Falta de identidade moderna no vocal'],
    tips: ['Trave sempre a escala e o tom exato da música (ex: D# Minor) para não afinar notas erradas.'],
    warnings: ['Coloque como o primeiro plugin absoluto antes de qualquer compressão ou EQ.']
  },
  {
    id: 'celemony-melodyne-5',
    name: 'Celemony Melodyne 5 Studio',
    type: 'Antares & Celemony',
    category: 'Afinação & Correção',
    level: 'Mix',
    suggestedPosition: 1,
    description: 'Editor de afinação e tempo nota por nota de máxima precisão mundial com tecnologia ARA integrada nativamente no Studio One e FL Studio.',
    functions: [
      'Separação automática de componentes vocais com tom e componentes sibilantes sem tom',
      'Ajuste cirúrgico de afinação, modulação de vibrato e formantes de voz',
      'Correção rítmica de tempo e alinhamento de dobras vocais'
    ],
    suggestedParams: [
      'Pitch Center: 80% - 90% (corrige o tom preservando a emoção humana)',
      'Pitch Drift: Suavizar flutuações involuntárias em notas longas'
    ],
    problemsSolved: ['Afinação instável', 'Notas específicas desafinadas em uma tomada perfeita de interpretação'],
    tips: ['No Studio One, pressione Ctrl + M no evento de áudio para abrir o Melodyne instantaneamente via ARA.'],
    warnings: ['Nunca faça pitch shift de oitavas inteiras em gravações acústicas para não gerar formantes não-naturais.']
  },
  {
    id: 'uad-teletronix-la2a',
    name: 'Universal Audio Teletronix LA-2A Collection',
    type: 'Universal Audio',
    category: 'Compressor',
    level: 'Mix',
    suggestedPosition: 3,
    description: 'A emulação mais precisa da UAD do lendário compressor óptico valvulado. Três versões: Silver (rápido), Gray (médio) e LA-2 Original (lento).',
    functions: [
      'Atenuação eletro-óptica lendária com resposta não-linear de dois estágios',
      'Circuito valvulado classe A emulando todas as não-linearidades de transformador',
      'Operação intuitiva com Peak Reduction e Gain'
    ],
    suggestedParams: [
      'LA-2A Silver: Vocais principais modernos e baixos elétricos com 3dB a 5dB de redução',
      'LA-2A Gray: Backing vocals, violões e cordas acústicas'
    ],
    problemsSolved: ['Voz estéril', 'Falta de sustentação e peso musical'],
    tips: ['Combine com um 1176 da UAD antes para a clássica cadeia de vocais do Grammy.'],
    warnings: ['Deixe o seletor em "Compress", o modo "Limit" é mais agressivo e corta os transientes.']
  },
  {
    id: 'uad-1176ln-collection',
    name: 'Universal Audio 1176LN Classic Limiter Collection',
    type: 'Universal Audio',
    category: 'Compressor',
    level: 'Mix',
    suggestedPosition: 2,
    description: 'A mais fiel emulação dos compressores FET 1176 Rev A (Bluestripe), Rev E (Blackface) e 1176AE (Edição de 40 anos com ratio 2:1).',
    functions: [
      'Ataque ultrarrápido (20 a 800 microssegundos) para capturar picos indesejados',
      'Distorção harmônica clássica de transformador FET',
      'Modo "All-Buttons In" com compressão explosiva para drum parallel bus'
    ],
    suggestedParams: [
      'Rev E (Blackface): Vocal Principal, Ratio 4:1, Attack 3, Release 7, 4dB Gain Reduction',
      'Rev A (Bluestripe): Vocais com mais atitude agressiva e caixas de bateria'
    ],
    problemsSolved: ['Picos repentinos no vocal', 'Falta de punch e ataque na bateria'],
    tips: ['Gire o Attack no sentido horário para deixá-lo mais rápido e no sentido anti-horário para mais lento.'],
    warnings: ['Ajuste o Output para manter o volume equilibrado com a pista sem o plugin ativo.']
  },

  // ==========================================
  // 6. FREE EXTERNAL PLUGINS
  // ==========================================
  {
    id: 'free-tdr-nova',
    name: 'TDR Nova (Tokyo Dawn Records)',
    type: 'Free External',
    category: 'Equalizador',
    level: 'Mix & Master',
    suggestedPosition: 1,
    isFree: true,
    description: 'Equalizador dinâmico paralelo gratuito de alta precisão. Uma das melhores ferramentas gratuitas do mundo, comparável ao Pro-Q 3.',
    functions: [
      'Equalização paramétrica tradicional de 4 bandas com display FFT',
      'Compressão dinâmica independente por banda',
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
    id: 'free-valhalla-supermassive',
    name: 'Valhalla Supermassive',
    type: 'Free External',
    category: 'Reverb & Espaço',
    level: 'Bus & Send',
    suggestedPosition: 6,
    isFree: true,
    description: 'O melhor plugin gratuito de reverb e delay espacial do planeta. Cria paisagens sonoras infinitas e caudas de ambiência cinematográficas.',
    functions: [
      '18 modos de reverberação cósmica e ecos modulados (Gemini, Hydra, Centaurus, etc.)',
      'Modulação de pitch estéreo com difusão tridimensional',
      'Controles de Warp, Feedback, Density e EQs integrados'
    ],
    suggestedParams: ['Modo "Gemini" ou "Lyra", Mix em 100% no canal Send, Warp 50%'],
    problemsSolved: ['Sons secos ou sem grandiosidade espacial'],
    tips: ['Perfeito para transições de sintetizadores, adlibs vocais épicas e pads de introdução.'],
    warnings: ['Em 100% wet no canal principal a clareza rítmica será perdida.']
  }
];
