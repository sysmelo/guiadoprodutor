export interface StudioOneStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  tag: string;
  badgeColor: string;
  summary: string;
  actions: {
    title: string;
    instruction: string;
    studioOneShortcut?: string;
    nativePlugin?: string;
  }[];
  proTip: string;
  whatToAvoid: string;
}

export interface StudioOneAuxChannel {
  id: string;
  name: string;
  auxType: 'FX Channel (Send)' | 'Bus Channel (Submix)' | 'Parallel Processing';
  category: 'Reverb Espacial' | 'Delay Rítmico' | 'Vocal Widener / Doubler' | 'Compressão Paralela NY' | 'Saturação Paralela';
  nativePlugin: string;
  alternativePlugin?: string;
  description: string;
  howToCreateInStudioOne: string[];
  recommendedSettings: {
    parameter: string;
    value: string;
    note: string;
  }[];
  routingWorkflow: {
    fromTrack: string;
    sendLevel: string;
    panning: string;
    prePostFader: 'Post-Fader (Padrão)' | 'Pre-Fader (Efeitos Especiais)';
  };
  studioOneTips: string[];
}

export const studioOneCleanWorkflow: StudioOneStep[] = [
  {
    stepNumber: 1,
    title: 'Organização, Cores & Gain Staging',
    subtitle: 'A base limpa que elimina 90% da confusão na mixagem',
    tag: 'PREPARAÇÃO LIMPA',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    summary: 'Antes de colocar qualquer plugin, estruture a sessão no Studio One 7. Pistas organizadas por cores, renomeadas e com ganho calibrado em -18 dBFS de média geram headroom limpo e mixers sem poluição visual.',
    actions: [
      {
        title: 'Colorir e Agrupar Pistas',
        instruction: 'Selecione pistas relacionadas (ex: todas as vozes) com Shift + Clique e escolha uma cor única na barra de cor inferior.',
        studioOneShortcut: 'Shift + Clique / Ctrl + G'
      },
      {
        title: 'Calibração de Ganho de Entrada (Gain Staging)',
        instruction: 'Abra o Inspector de Pista (F4) ou o topo do Mixer (F3) e ajuste o knob "Input Gain" até os picos ficarem em torno de -12 dBFS e média de -18 dBFS no medidor.',
        studioOneShortcut: 'F4 (Inspector) / F3 (Console Mixer)'
      },
      {
        title: 'Criação de Pastas de Faixas (Folder Tracks)',
        instruction: 'Clique com botão direito nas pistas selecionadas > "Pack Folder" (Empacotar em Pasta) para recolher pistas secundárias e manter a tela limpa.',
        studioOneShortcut: 'Ctrl + B ou Clique Direito > Pack Folder'
      }
    ],
    proTip: 'No Studio One 7, você pode vincular a Pasta diretamente a um Bus Channel clicando no ícone de saída da pasta!',
    whatToAvoid: 'Nunca pule o Gain Staging. Se a gravação entrar clipando no primeiro plugin, toda a cadeia de processamento ficará suja e saturada.'
  },
  {
    stepNumber: 2,
    title: 'Limpeza Cirúrgica & Filtragem',
    subtitle: 'Remoção de ruídos, subgraves inúteis e frequências em conflito',
    tag: 'EQ CIRÚRGICO',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    summary: 'Limpe o sinal antes de comprimir. Use o Pro EQ3 nativo com visualizador espectral de alta resolução para cortar ressonâncias ásperas e limpar o excesso de médios-graves (mud).',
    actions: [
      {
        title: 'High-Pass Filter (Corte de Graves Inaudíveis)',
        instruction: 'Insira o Pro EQ3 no canal. Ative a banda Low Cut (LC) em 24dB/oct: 80Hz a 120Hz em vocais, 100Hz em guitarras, 30Hz em Kicks e 808s.',
        nativePlugin: 'Pro EQ3 (Nativo Studio One 7)'
      },
      {
        title: 'Drenagem de Frequências Enlameadas (Mud)',
        instruction: 'Localize e atenue suavemente (-1.5 dB a -3 dB com Q médio) a região de 250Hz - 400Hz em instrumentos harmônicos para abrir clareza.',
        nativePlugin: 'Pro EQ3'
      },
      {
        title: 'Controle de Sibilância Cirúrgica',
        instruction: 'Em vozes estridentes, use o Pro EQ3 em modo Dynamic EQ na região de 6kHz a 8kHz ou insira o plugin nativo De-Esser para controlar sibilâncias.',
        nativePlugin: 'De-Esser / Pro EQ3 (Dynamic Mode)'
      }
    ],
    proTip: 'No Pro EQ3 do Studio One 7, você pode ativar o modo Dynamic em qualquer banda simplesmente clicando com botão direito na banda!',
    whatToAvoid: 'Não faça cortes estreitos demais (Q muito alto) a menos que seja um ruído elétrico contínuo de 60Hz. Cortes muito profundos deixam o áudio oco.'
  },
  {
    stepNumber: 3,
    title: 'Dinâmica, Controle & Coesão',
    subtitle: 'Nivelamento transparente e pegada analógica com Fat Channel XT',
    tag: 'DINÂMICA NATIVA',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    summary: 'Controle a energia das faixas para que fiquem firmes na mix. O Fat Channel XT do Studio One oferece emulações lendárias de compressores VCA, FET (1176) e Óptico (LA-2A) sem custo extra.',
    actions: [
      {
        title: 'Compressão Vocal Niveladora (Opto / LA-2A)',
        instruction: 'No Fat Channel XT, selecione o compressor "Tube / Opto". Ajuste o Peak Reduction para obter 2dB a 4dB de redução nas notas sustentadas.',
        nativePlugin: 'Fat Channel XT (Módulo Opto / Tube)'
      },
      {
        title: 'Punch e Pegada Rápida em Baterias (FET / 1176)',
        instruction: 'Na Caixa (Snare) ou Kick, use o modo "FET" no Fat Channel XT com ataque de 10ms e release rápido para destacar o impacto dos transientes.',
        nativePlugin: 'Fat Channel XT (Módulo FET)'
      },
      {
        title: 'Sidechain do Kick no 808 / Baixo',
        instruction: 'Insira o Compressor nativo no canal do 808. Ative o botão "Sidechain" no topo e selecione a pista de Kick como fonte para abaixar o 808 automaticamente quando o Kick bater.',
        nativePlugin: 'Compressor (Sidechain Mode)'
      }
    ],
    proTip: 'No Studio One 7, criar Sidechain leva 2 cliques: ative o botão Sidechain no Compressor e arraste o Send do Kick diretamente para o plugin!',
    whatToAvoid: 'Evite comprimir mais de 8dB de uma só vez em um único plugin. É muito melhor usar dois compressores reduzindo 2-3dB cada (Serial Compression).'
  },
  {
    stepNumber: 4,
    title: 'Canais Auxiliares & Efeitos Espaciais (Sends)',
    subtitle: 'Reverbs, Delays e Paralelos que dão dimensão 3D sem embolar o centro',
    tag: 'ROTEAMENTO AUX FX',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    summary: 'Esta é a chave de uma mix profissional limpa: NUNCA coloque reverb ou delay diretamente como insert nas pistas de áudio. Crie canais FX auxiliares dedicados (OpenAIR, Analog Delay, Chorus Doubler e Compressão Paralela NY) e envie o sinal através dos botões de Send.',
    actions: [
      {
        title: 'Criar Canal FX de Reverb Espacial',
        instruction: 'No Mixer (F3), clique direito > "Add FX Channel". Nomeie como "FX Reverb Vocal". Insira o OpenAIR com impulso de Plate e configure o Mix em 100% Wet.',
        nativePlugin: 'OpenAIR (Reverb de Convolução) ou Room Reverb'
      },
      {
        title: 'Criar Canal FX de Delay Rítmico',
        instruction: 'Crie outro FX Channel chamado "FX Delay 1/4". Insira o Analog Delay sincronizado no tempo da música com corte de graves e agudos ativado.',
        nativePlugin: 'Analog Delay / Beat Delay'
      },
      {
        title: 'Criar Canal de Compressão Paralela (NY Drums & Vocals)',
        instruction: 'Crie um FX Channel chamado "FX NY Comp". Insira o Compressor nativo esmagando com ratio alto e ataque rápido. Suba o fader lentamente por baixo do sinal seco.',
        nativePlugin: 'Compressor / Fat Channel XT'
      }
    ],
    proTip: 'No Studio One 7, basta arrastar o plugin do Browser para a área "Sends" de qualquer canal. A DAW cria o FX Channel e o Send instantaneamente!',
    whatToAvoid: 'Nunca deixe o botão Mix do Reverb/Delay do Canal Auxiliar em menos de 100% Wet. Se tiver sinal seco no canal FX, você terá duplicação de volume e problemas de fase.'
  },
  {
    stepNumber: 5,
    title: 'Busses de Agrupamento & Mix Bus Final',
    subtitle: 'Coesão do instrumental e master bus transparente',
    tag: 'AGRUPAMENTO & BUS',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    summary: 'Direcione pistas individuais para Busses (Submixes): Drum Bus, Bass Bus, Music Bus e Vocal Bus. No Main Out, use processamento sutil de colagem e verifique os níveis com os medidores integrados do Studio One 7.',
    actions: [
      {
        title: 'Roteamento para Bus Channels',
        instruction: 'Selecione todas as pistas de bateria > clique com botão direito > "Add Bus for Selected Channels". Nomeie como "DRUMS BUS".',
        studioOneShortcut: 'Shift + Selecionar > Add Bus for Selected Tracks'
      },
      {
        title: 'Glue Compression no Mix Bus',
        instruction: 'No canal Main/Master, insira o Fat Channel XT ou Tricomp aplicando apenas 1dB a 2dB de redução de ganho suave com ratio 2:1 e ataque lento.',
        nativePlugin: 'Tricomp / Fat Channel XT (Vintage VCA)'
      },
      {
        title: 'Verificação de Headroom e Medição',
        instruction: 'Garanta que o pico do canal Main nunca passe de -3 dBFS antes da masterização para deixar espaço seguro (headroom) para a etapa final.',
        nativePlugin: 'Level Meter / Spectrum Display (Nativo Studio One 7)'
      }
    ],
    proTip: 'Use a visualização Split do Mixer no Studio One 7 para manter os Busses e canais FX sempre fixos à direita do Console enquanto rola os canais de áudio!',
    whatToAvoid: 'Não coloque Limiters pesados no Main Out durante a mixagem. A mix deve soar equilibrada, dinâmica e com impacto natural.'
  }
];

export const studioOneAuxChannels: StudioOneAuxChannel[] = [
  {
    id: 'aux-vocal-reverb',
    name: 'FX 1: Reverb Espacial de Placa (Vocal Plate Reverb)',
    auxType: 'FX Channel (Send)',
    category: 'Reverb Espacial',
    nativePlugin: 'PreSonus OpenAIR (ou Room Reverb)',
    alternativePlugin: 'Room Reverb (Modo Plate)',
    description: 'Cria uma cauda rica e tridimensional que envolve a voz sem embolar a dicção do cantor nem poluir o centro da mixagem.',
    howToCreateInStudioOne: [
      '1. Pressione F3 para abrir o Console Mixer no Studio One 7.',
      '2. Na coluna FX Channels (à direita), clique com o botão direito e escolha "Add FX Channel" (ou clique no "+" da área Sends do canal de voz).',
      '3. Renomeie o canal criado para "FX Vocal Plate" e atribua uma cor azul clara.',
      '4. No rack de Inserts desse canal FX, insira o plugin nativo "OpenAIR" (ou "Room Reverb").',
      '5. Insira também um "Pro EQ3" logo antes do reverb para filtrar frequências (Técnica Abbey Road).'
    ],
    recommendedSettings: [
      { parameter: 'Mix (Wet)', value: '100% WET (Obrigatório)', note: 'O canal de áudio já tem o sinal seco (Dry). O canal Aux deve ter APENAS o efeito!' },
      { parameter: 'Preset / Impulso', value: 'Plate Reverb (Vocal Warm Plate)', note: 'Placa clássica de estúdio com densidade rica' },
      { parameter: 'Pre-Delay', value: '35 ms a 55 ms', note: 'Separa o impacto da voz limpa do início do eco, mantendo a pronúncia 100% límpida' },
      { parameter: 'Reverb Time (Decay)', value: '1.8s a 2.4s (Pop/Trap) | 2.8s (Baladas/R&B)', note: 'Ajuste conforme o andamento da música' },
      { parameter: 'Filtro Abbey Road (EQ)', value: 'HPF em 350Hz | LPF em 6.0kHz', note: 'Impede que os graves embolem e que as sibilâncias fiquem brilhando no reverb' }
    ],
    routingWorkflow: {
      fromTrack: 'Canal Lead Vocal (e Backing Vocals)',
      sendLevel: '-14 dB a -8 dB (ajuste a gosto no faderzinho do Send)',
      panning: 'Centro (Estéreo Aberto no FX)',
      prePostFader: 'Post-Fader (Padrão)'
    },
    studioOneTips: [
      'Abbey Road Trick no Studio One: No canal FX, coloque o Pro EQ3 no Slot 1 com corte de 400Hz nos graves e 6kHz nos agudos, e o OpenAIR no Slot 2. O resultado é um reverb aveludado e limpo.',
      'Ative a compensação de delay automática (Z-Drop / Low Latency Engine) no Studio One 7 para garantir que os envios fiquem em fase perfeita.'
    ]
  },
  {
    id: 'aux-tempo-delay',
    name: 'FX 2: Delay Rítmico Analógico (1/4 ou 1/8 Dotted)',
    auxType: 'FX Channel (Send)',
    category: 'Delay Rítmico',
    nativePlugin: 'PreSonus Analog Delay (ou Beat Delay)',
    alternativePlugin: 'Beat Delay',
    description: 'Adiciona repetições musicais sincronizadas com o BPM da sessão, criando profundidade e preenchimento nos espaços vazios das frases vocais ou solos.',
    howToCreateInStudioOne: [
      '1. No Mixer (F3), clique com o botão direito na área FX Channels > "Add FX Channel".',
      '2. Renomeie para "FX Analog Delay 1/4".',
      '3. No Insert do canal FX, insira o plugin nativo "Analog Delay".',
      '4. No canal do Vocal ou Guitarra, adicione um Send apontando para "FX Analog Delay 1/4".'
    ],
    recommendedSettings: [
      { parameter: 'Mix (Dry/Wet)', value: '100% WET', note: 'Nunca reduza no canal Auxiliar' },
      { parameter: 'Sync Mode', value: 'Straight 1/4 (ou 1/8 Dotted)', note: 'Sincronizado automaticamente com o BPM do Studio One 7' },
      { parameter: 'Feedback', value: '25% a 35%', note: 'Gera de 3 a 4 repetições musicais' },
      { parameter: 'Low Cut & High Cut', value: 'Low Cut: 450Hz | High Cut: 4.5kHz', note: 'Filtro telefônico clássico para o delay não competir com a voz ativa' },
      { parameter: 'Mode & Color', value: 'Tape / Tube Saturation', note: 'Adiciona calor analógico sutil às repetições' }
    ],
    routingWorkflow: {
      fromTrack: 'Lead Vocal, Guitarras, Sintetizadores de Solo',
      sendLevel: '-16 dB a -10 dB',
      panning: 'Estéreo com Ping-Pong ativo (L/R)',
      prePostFader: 'Post-Fader (Padrão)'
    },
    studioOneTips: [
      'Ducker no Delay: No Studio One 7, insira o Compressor nativo no canal FX do Delay DEPOIS do Analog Delay. Ative o Sidechain recebendo o sinal do Lead Vocal. Assim, quando o cantor estiver cantando o delay abaixa sozinho, e quando ele cala a boca o delay sobe preenchendo o espaço!',
      'Você pode desenhar automação de Send no Studio One clicando com botão direito no controle de Send > "Edit Automation".'
    ]
  },
  {
    id: 'aux-vocal-widener',
    name: 'FX 3: Vocal Widener & Doubler Estéreo 3D',
    auxType: 'FX Channel (Send)',
    category: 'Vocal Widener / Doubler',
    nativePlugin: 'PreSonus Chorus / Flanger (Modo Microshift)',
    alternativePlugin: 'Binaural Pan / Splitter',
    description: 'Transforma vocais mono estáticos em uma presença vocal ampla e encorpada nas laterais dos fones de ouvido sem criar cancelamento de fase no centro mono.',
    howToCreateInStudioOne: [
      '1. No Mixer (F3), clique com o botão direito > "Add FX Channel".',
      '2. Renomeie para "FX Vocal Widener".',
      '3. Insira o plugin nativo "Chorus" ou "Flanger".',
      '4. Envie sinal da voz principal através de um Send com nível sutil (-18 dB a -14 dB).'
    ],
    recommendedSettings: [
      { parameter: 'Mix', value: '100% WET', note: 'Totalmente processado no canal FX' },
      { parameter: 'Voices / Depth', value: '3 Voices | Depth: 15% a 20%', note: 'Ajuste sutil para não desafinar a voz' },
      { parameter: 'Speed (LFO)', value: '0.08 Hz a 0.15 Hz', note: 'Velocidade ultra lenta para evitar efeito de flange óbvio' },
      { parameter: 'Stereo Width', value: '100% (Full Stereo)', note: 'Espalha a imagem estéreo para as pontas dos fones' },
      { parameter: 'Low Cut', value: 'HPF em 300Hz', note: 'Garante que os graves do vocal permaneçam no centro mono' }
    ],
    routingWorkflow: {
      fromTrack: 'Lead Vocals, Backing Vocals, Pianos Elétricos',
      sendLevel: '-18 dB a -12 dB (efeito deve ser sentido quando mutado, não escutado explicitamente)',
      panning: 'Estéreo Aberto (Pan 100% L/R)',
      prePostFader: 'Post-Fader (Padrão)'
    },
    studioOneTips: [
      'Verifique no botão "Mono" do Main Out do Studio One para certificar-se de que a voz principal continua perfeitamente audível quando reproduzida em mono.',
      'Excelente para refrões: automatize o Send deste canal para ligar apenas nas partes do Refrão para abrir a energia da música!'
    ]
  },
  {
    id: 'aux-ny-parallel-comp',
    name: 'FX 4: Compressão Paralela New York (NY Parallel Comp)',
    auxType: 'Parallel Processing',
    category: 'Compressão Paralela NY',
    nativePlugin: 'PreSonus Fat Channel XT (FET / 1176) ou Compressor',
    alternativePlugin: 'Compressor (Punch Mode)',
    description: 'A técnica secreta de Nova York: esmaga uma cópia do áudio com compressão agressiva e mistura esse sinal hiper-denso por baixo do áudio dinâmico original, conferindo peso brutal, sustain e punch sem destruir os transientes naturais.',
    howToCreateInStudioOne: [
      '1. No Console Mixer (F3), crie um "Add FX Channel" e chame de "FX NY Parallel Drum/Vocal".',
      '2. Insira o "Fat Channel XT" (selecione o módulo FET / British Vintage) ou o "Compressor" nativo.',
      '3. Insira também um "Pro EQ3" com leve boost de graves (60Hz) e agudos (10kHz) para o "Smile Curve EQ" clássico de NY.',
      '4. Envie a Bateria (Kick, Snare, Toms) e/ou Vocais através de Sends configurados em 0.0 dB (Unity Gain).',
      '5. Mute o canal FX e comece a subir o fader do FX NY bem devagar até sentir o peso e a densidade encaixarem na mix.'
    ],
    recommendedSettings: [
      { parameter: 'Ratio', value: '8:1 ou 20:1 (Heavy Crush)', note: 'Compressão dura e sem piedade' },
      { parameter: 'Attack', value: '0.1 ms (Ultra Rápido)', note: 'Segura todos os picos para achatar o sinal' },
      { parameter: 'Release', value: '50 ms a 100 ms (Rápido)', note: 'Gera agressividade e bombeamento musical no ritmo da música' },
      { parameter: 'Gain Reduction (Medidor)', value: '10 dB a 15 dB de redução constante', note: 'O sinal do FX deve soar completamente esmagado quando colocado em solo' },
      { parameter: 'EQ Smile Curve', value: '+3dB em 60Hz | +3dB em 10kHz', note: 'A clássica equalização de NY que adiciona peso no bumbo e ar nos pratos' }
    ],
    routingWorkflow: {
      fromTrack: 'Kick, Snare, Drum Bus, Lead Vocal',
      sendLevel: '0.0 dB (Send pós-fader)',
      panning: 'Acompanha o pan dos instrumentos originais',
      prePostFader: 'Post-Fader (Padrão)'
    },
    studioOneTips: [
      'No Studio One 7, você também pode usar o recurso nativo "Splitter" dentro do próprio canal para fazer compressão paralela inline, mas criar no canal FX permite enviar múltiplos instrumentos simultâneos (como Kick + Snare + Vocal) para a mesma compressão de cola!',
      'Ao aplicar no vocal, a respiração e os detalhes sussurrados ganham vida imediata sem precisar subir o ganho geral.'
    ]
  },
  {
    id: 'aux-parallel-saturation',
    name: 'FX 5: Saturação Harmônica Quente (Warm Tape / Tube Sat)',
    auxType: 'Parallel Processing',
    category: 'Saturação Paralela',
    nativePlugin: 'PreSonus RedlightDist (ou Ampire / Pedalboard)',
    alternativePlugin: 'RedlightDist (Modo Tube / Tape)',
    description: 'Injeta calor analógico, riqueza de harmônicos e presença 3D em vocais, 808s e guitarras sem distorcer o sinal original de forma destrutiva.',
    howToCreateInStudioOne: [
      '1. No Mixer (F3), clique direito na área FX > "Add FX Channel".',
      '2. Renomeie para "FX Tube Saturation".',
      '3. Insira o plugin nativo "RedlightDist".',
      '4. Selecione o tipo "Tube" ou "OpAmp" com drive moderado e envie o sinal dos instrumentos que precisam de corpo.'
    ],
    recommendedSettings: [
      { parameter: 'Drive Type', value: 'Tube / Soft Tape (Harmônicos Pares)', note: 'Gera calor e redondeza analógica' },
      { parameter: 'Drive Amount', value: '40% a 60%', note: 'Distorção rica e perceptível no canal Aux' },
      { parameter: 'Mix no Plugin', value: '100% WET', note: 'O controle de mistura é feito pelo Fader do canal FX no Mixer' },
      { parameter: 'Filtro HPF pós-drive', value: '150 Hz', note: 'Evita embolamento nos subgraves' }
    ],
    routingWorkflow: {
      fromTrack: '808, Baixo, Lead Vocal, Snare, Teclados',
      sendLevel: '-20 dB a -12 dB',
      panning: 'Centro Mono ou Estéreo Neutro',
      prePostFader: 'Post-Fader (Padrão)'
    },
    studioOneTips: [
      'Excelente truque para 808 no Studio One 7: Envie o 808 para este FX de saturação com HPF em 150Hz. O 808 continuará limpo no subgrave, mas os harmônicos gerados no canal auxiliar farão o 808 ser ouvido perfeitamente em alto-falantes de celular e notebooks!'
    ]
  }
];

export const studioOneVsBusComparison = {
  fxChannelTitle: 'Canal Auxiliar / FX Channel (Sends)',
  fxChannelDesc: 'Utilizado para PROCESSAMENTO PARALELO (Reverb, Delay, Doubler, NY Compression). O sinal é DUPLICADO via Send: o som original seco continua indo para o Master, enquanto uma cópia passa pelo efeito com 100% WET.',
  fxChannelRules: [
    'Sempre use 100% WET no plugin.',
    'O nível do efeito é controlado pelo botão de Send do canal de origem ou pelo Fader do FX.',
    'Múltiplas pistas podem enviar sinal para o mesmo canal FX (economiza até 80% de CPU).',
    'Se mutar o canal FX, a música continua tocando normalmente (apenas sem o efeito).'
  ],
  busChannelTitle: 'Canal de Barramento / Bus Channel (Submixes)',
  busChannelDesc: 'Utilizado para AGRUPAMENTO E CONTROLE DE GRUPOS (Drum Bus, Vocal Bus, Guitar Bus). A saída principal da pista (Main Out) é RECOLOCADA para entrar no Bus. O sinal NÃO é duplicado.',
  busChannelRules: [
    'O sinal original PASSA OBRIGATORIAMENTE por dentro do Bus.',
    'Se você abaixar ou mutar o Drum Bus, TODAS as peças de bateria calam a boca juntas.',
    'Excelente para aplicar equalização coletiva, Glue Compression e automação de volume de grupos inteiros.',
    'No Studio One 7: Selecione as pistas > Clique Direito > "Add Bus for Selected Channels".'
  ]
};

export const studioOneNativePluginsGuide = [
  {
    name: 'Pro EQ3',
    category: 'Equalizador Paramétrico de Alta Resolução',
    description: 'EQ cirúrgico e musical de 7 bandas com modo Dynamic EQ por banda, display FFT de alta fidelidade e filtros de corte de até 48 dB/oct.',
    bestFor: 'Cortes corretivos, High-Pass e Dynamic EQ em frequências sibilantes ou ressonantes.'
  },
  {
    name: 'Fat Channel XT',
    category: 'Channel Strip Vintage Completo',
    description: 'Suíte analógica completa contendo Gate, Compressores lendários (Standard, Tube/Opto LA-2A, FET 1176, British Class A) e EQs Vintage (Passive Pultec, Vintage 1073).',
    bestFor: 'Compressão vocal, pegada em caixas/bombos, saturação analógica de fita e equalização musical.'
  },
  {
    name: 'OpenAIR',
    category: 'Reverb de Convolução Espacial',
    description: 'Reverb profissional baseado em respostas ao impulso (Impulse Responses) de salas reais, placas vintage e estúdios lendários com controle milimétrico de Pre-Delay e Damping.',
    bestFor: 'Reverbs vocais realistas, plate em caixas e ambiências 3D ultra transparentes.'
  },
  {
    name: 'Analog Delay',
    category: 'Delay de Fita & BBD Analógico',
    description: 'Emulador de eco de fita clássico com sincronia rítmica, saturação de tubo, modulação de flutter/wow e filtros passa-alta/baixa integrados.',
    bestFor: 'Delays rítmicos 1/4 e 1/8 dotted, slapback delay de 60ms e preenchimento de frases vocais.'
  },
  {
    name: 'Compressor',
    category: 'Compressor Dinâmico Flexível com Sidechain',
    description: 'Compressor versátil com visualizador de curva, controle de Knee, Lookahead, Auto-Release e roteamento nativo de Sidechain sem complicações.',
    bestFor: 'Ducking de Kick/808, nivelamento de faixas e compressão paralela limpa.'
  },
  {
    name: 'RedlightDist',
    category: 'Distorção & Saturação Harmônica',
    description: 'Processador de saturação analógica com múltiplos modelos: Tube, Transistor, OpAmp, Fuzz e controle de frequências de corte.',
    bestFor: 'Saturação paralela em 808s, calor em sintetizadores e textura para vocais modernos.'
  }
];
