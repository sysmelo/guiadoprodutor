import { RecordingPhase } from '../types';

export const recordingPhasesData: RecordingPhase[] = [
  {
    id: 'fase-1-beat-session',
    number: 1,
    title: 'Fase 1: Preparação do Beat & Sessão no FL Studio',
    shortTitle: 'Beat & Sessão',
    tagline: 'Criar headroom e estruturar a Playlist antes de ligar o microfone',
    flMenuLocation: 'Playlist (F5) + Mixer (F9) + Transport Bar',
    steps: [
      {
        stepNumber: 1,
        title: 'Importar Instrumental & Definir BPM / Tom',
        flShortcut: 'Ctrl + O (Projeto) / F5 (Playlist)',
        action: 'Arraste o arquivo WAV do Beat para a Playlist e alinhe rigorosamente na grade (Grid 1/4 ou Bar).',
        detailedGuide: [
          'Se você criou o beat no mesmo projeto: garanta que o projeto esteja salvo como uma nova versão antes de gravar (ex: "Musica_Rec_V1.flp" via Ctrl+Shift+S).',
          'Se for gravar com 2-Track (WAV estéreo): configure o BPM do FL Studio no mesmo andamento exato da música.',
          'Identifique e anote a escala/tom da música (ex: F# Menor) para uso correto no Auto-Tune / Pitcher mais tarde.'
        ],
        flSettingsTip: 'No Channel Settings do clipe de áudio do beat, defina o modo de Time Stretching como "Resample" ou "Auto" para evitar alterações indesejadas de tom.',
        warning: 'Nunca grave com o BPM descalibrado do beat! Isso impossibilita o uso de delays sincronizados e quantização.'
      },
      {
        stepNumber: 2,
        title: 'Criar Headroom no Beat (-4 dB a -6 dB)',
        flShortcut: 'F9 (Mixer)',
        action: 'Envie a faixa do beat para um canal do Mixer (ex: Insert 1) e reduza o fader em -4 dB a -6 dB.',
        detailedGuide: [
          'A maioria dos beats baixados da internet ou produzidos já vem com limiter ou volume estourando em 0 dBFS.',
          'Se você tentar gravar a voz por cima de um beat em 0 dB, a soma do volume no Master vai clipar (distorcer em vermelho) ou o vocalista não conseguirá se ouvir claramente.',
          'Reduzir o fader do beat para -5 dB cria espaço dinâmico limpo para a voz sentar naturalmente.'
        ],
        flSettingsTip: 'Desative qualquer Limiter ou Maximizer no canal Master durante a gravação para ouvir a dinâmica real sem latência adicional.'
      },
      {
        stepNumber: 3,
        title: 'Criar Marcadores de Seção na Playlist (Time Markers)',
        flShortcut: 'Alt + T (Add Time Marker)',
        action: 'Marque visualmente as seções da música: Intro, Verso 1, Pré-Refrão, Refrão, Verso 2, Ponte, Outro.',
        detailedGuide: [
          'Clique no topo da régua da Playlist onde começa o Refrão e aperte Alt + T.',
          'Digite "REFRÃO" e repita o processo para todas as partes da música.',
          'Isso permite saltar rapidamente entre as partes durante a gravação com o cantor no estúdio (usando os atalhos de navegação do teclado numérico).'
        ],
        flSettingsTip: 'Você também pode usar marcadores de Loop (Loop Markers) para gravar repetições automáticas do refrão.'
      }
    ],
    proTips: [
      'Sempre salve uma cópia do projeto antes de começar a gravar: "File > Save new version" (Ctrl + N no FL Studio).',
      'Mantenha a Playlist limpa: reserve as Tracks 1 a 4 para o Beat e as Tracks 5 a 16 exclusivamente para Vocais.'
    ],
    commonMistakes: [
      'Deixar plugins pesados de masterização ligados no Master durante a gravação (isso gera latência inaceitável).',
      'Gravar vocal com o beat clipando em 0 dBFS no canal Master.'
    ]
  },
  {
    id: 'fase-2-hardware-latencia',
    number: 2,
    title: 'Fase 2: Interface de Áudio, Buffer & Latência Zero',
    shortTitle: 'Hardware & Latência',
    tagline: 'Configurar o driver ASIO e eliminar o eco/delay nos fones',
    flMenuLocation: 'Options (F10) > Audio Settings',
    steps: [
      {
        stepNumber: 1,
        title: 'Selecionar Driver ASIO Dedicado',
        flShortcut: 'F10 > Audio',
        action: 'Em "Input / output device", selecione o driver ASIO nativo da sua placa de áudio.',
        detailedGuide: [
          'Prioridade máxima: use o driver proprietário da sua interface (ex: Focusrite USB ASIO, Behringer UMC ASIO, Universal Audio Thunderbolt ASIO, Solid State Logic ASIO).',
          'Se você não possui interface de áudio dedicada: use "FL Studio ASIO" ou "ASIO4ALL v2".',
          'Nunca use "Primary Sound Driver" ou "DirectSound" para gravação de áudio, pois eles possuem latência superior a 50ms.'
        ],
        flSettingsTip: 'Garanta que o Sample Rate do projeto esteja em 44.100 Hz ou 48.000 Hz.'
      },
      {
        stepNumber: 2,
        title: 'Calibrar o Buffer Size para Baixa Latência (64 a 128 samples)',
        flShortcut: 'F10 > Audio > Buffer Length',
        action: 'Reduza o buffer para 64 samples (~2ms) ou 128 samples (~4ms) antes de iniciar a gravação.',
        detailedGuide: [
          'O Buffer Size é o tempo que o processador leva para processar o áudio antes de enviá-lo de volta ao fone do cantor.',
          'Em 128 samples: a latência é imperceptível para o cérebro humano, permitindo que o vocalista cante no tempo exato do beat.',
          'Em 512 ou 1024 samples: o cantor ouve um eco desconfortável da própria voz, desafinando e perdendo o ritmo (groove).',
          'Dica de transição: use 64/128 samples para GRAVAR e 512/1024 samples para MIXAR.'
        ],
        flSettingsTip: 'Se ouvir estalos ou engasgos na CPU (underruns), aumente de 64 para 128 samples ou congele/desative plugins de sintetizador pesados.'
      },
      {
        stepNumber: 3,
        title: 'Ajuste de Ganho no Pré-amplificador (Gain Staging de Entrada)',
        flShortcut: 'Knob de Ganho (Gain) na Interface Física',
        action: 'Ajuste o knob de ganho físico para que a voz bata no medidor do FL Studio entre -18 dBFS e -12 dBFS nas partes mais fortes.',
        detailedGuide: [
          'Peça ao cantor para cantar a parte mais intensa e alta da música (geralmente o Refrão).',
          'O medidor verde do canal de entrada no Mixer do FL Studio deve oscilar em torno de -18 dBFS a -14 dBFS, com picos máximos em -10 dBFS a -8 dBFS.',
          'NUNCA deixe o medidor encostar no amarelo ou vermelho (0 dBFS). O clipping digital em ponto flutuante arruína o sinal de forma irreversível.',
          'Gravar em 24-bit ou 32-bit float oferece faixa dinâmica enorme; você não precisa gravar no talo para ter sinal limpo!'
        ],
        warning: 'Se a interface tiver um botão PAD de atenuação, use-o apenas se o cantor for extremamente potente e clipar mesmo no ganho mínimo.'
      }
    ],
    proTips: [
      'Posicionamento acústico: Mantenha o cantor a 15-20cm do microfone com Pop Filter e evite cantos retos da sala.',
      'Se a sua interface tiver "Direct Monitoring" (monitoramento direto por hardware), ative-o para latência absoluta 0ms.'
    ],
    commonMistakes: [
      'Gravar o microfone com ganho muito baixo (-30dB) obrigando a aumentar o volume depois, trazendo ruído de fundo.',
      'Gravar com a chave "48V Phantom Power" desligada em microfones condensadores (o microfone não captará nenhum som).'
    ]
  },
  {
    id: 'fase-3-roteamento-mixer',
    number: 3,
    title: 'Fase 3: Roteamento Profissional no Mixer do FL Studio',
    shortTitle: 'Roteamento do Mixer',
    tagline: 'Configurar canal de entrada (REC IN) e roteamento limpo para Playlist',
    flMenuLocation: 'Mixer (F9) > Input Source & Routing Cables',
    steps: [
      {
        stepNumber: 1,
        title: 'Nomear e Colorir o Canal de Gravação (REC IN)',
        flShortcut: 'F9 (Mixer) > Selecionar Insert 10 > F2 (Rename/Color)',
        action: 'Escolha uma faixa livre do mixer (ex: Insert 10), renomeie para "REC IN" e escolha uma cor de destaque (Vermelho ou Ciano).',
        detailedGuide: [
          'No topo do canal "REC IN", clique na caixa de entrada de áudio (Input Selector) onde diz "(none)".',
          'Selecione a entrada MONO do seu microfone: "In 1" ou "Mic/Inst 1".',
          'IMPORTANTE: Selecione sempre entrada MONO (In 1), nunca STEREO (In 1 - In 2), a menos que use um par estéreo de microfones. Microfones vocais são sinais mono; gravar em estéreo faz o som sair apenas em um lado do fone.'
        ],
        flSettingsTip: 'Ative o ícone de disquete/gravação no pé do canal (Arm for recording) se desejar gravar diretamente como Audio Clip.'
      },
      {
        stepNumber: 2,
        title: 'Evitar o Eco de Monitoramento Duplo (Direct Monitoring vs FL Routing)',
        flShortcut: 'F9 (Mixer) > Cabo de Roteamento para a Master',
        action: 'Se sua interface tem Direct Monitor ativado: clique na seta de envio do canal REC IN para o Master e DESATIVE o envio.',
        detailedGuide: [
          'Problema comum: O cantor ouve a própria voz duplicada com um efeito de "flanger" ou eco robótico.',
          'Causa: Ele está ouvindo o som direto da interface + o som processado pelo FL Studio voltando com 4ms de atraso.',
          'Solução A (Direct Monitor): Desconecte o canal REC IN da Master no FL Studio. O áudio será gravado normalmente, mas o som no fone vem 100% puro da interface física.',
          'Solução B (Monitorar pelo FL com Efeitos): Desative o Direct Monitor físico na interface e deixe o cabo do REC IN conectado à Master no FL Studio com buffer baixo.'
        ],
        flSettingsTip: 'No FL Studio 20/21/24, você pode alterar o modo de monitoramento no canal para "When armed", "On" ou "Off".'
      },
      {
        stepNumber: 3,
        title: 'Configurar o Destino dos Áudios Gravados (Audio Track na Playlist)',
        flShortcut: 'F5 (Playlist) > Clicar c/ botão direito no cabeçalho da Track 5 > Track mode > Audio track > Insert 10 (REC IN)',
        action: 'Vincule uma Track da Playlist diretamente ao canal de gravação do Mixer.',
        detailedGuide: [
          'No FL Studio moderno, vincular uma Track da Playlist como "Audio Track" ao Insert 10 faz com que cada novo take caia automaticamente organizado na mesma linha ou em sub-faixas organizadas.',
          'Isso economiza tempo absurdo e evita que seus clipes de áudio fiquem espalhados desorganizados pela tela da Playlist.'
        ]
      }
    ],
    proTips: [
      'Grave SEMPRE o sinal DRY (limpo e puro). Não insira compressores ou equalizadores destrutivos no canal de gravação.',
      'Se quiser usar Auto-Tune ou Reverb no fone para conforto, use canais de SEND paralelos ou plugins não-destrutivos.'
    ],
    commonMistakes: [
      'Gravar o microfone direto no canal Master (isso grava o beat misturado junto com a voz no mesmo arquivo WAV!).',
      'Selecionar entrada Stereo no mixer e ficar com áudio apenas no lado esquerdo do fone.'
    ]
  },
  {
    id: 'fase-4-monitor-reverb-fx',
    number: 4,
    title: 'Fase 4: Headphone Mix (Reverb & Auto-Tune Confortável)',
    shortTitle: 'Headphone Mix',
    tagline: 'Criar ambiência nos fones para o cantor brilhar sem gravar o efeito no WAV',
    flMenuLocation: 'Mixer (F9) > FX Sends & Low-latency Monitoring',
    steps: [
      {
        stepNumber: 1,
        title: 'Criar Canal de Envio para Reverb de Conforto (REC FX)',
        flShortcut: 'F9 > Insert 11 (Nomear "REC FX") > Inserir Fruity Reeverb 2',
        action: 'Envie um sinal paralelo do canal REC IN para o canal REC FX com 100% Wet e 0% Dry.',
        detailedGuide: [
          'Cantores com fone fechado sentem a voz "presa dentro da cabeça" e tendem a forçar a garganta se não ouvirem um pouco de espaço.',
          'Ao enviar o sinal para um Insert paralelo com Reverb suave e conectar esse Insert ao Master, o vocalista ouve a ambiência agradável no fone.',
          'Como o canal REC IN está gravando apenas o sinal de entrada puro, o arquivo WAV salvo na Playlist fica 100% LIMPO (Dry), perfeito para mixar depois!'
        ],
        flSettingsTip: 'No Fruity Reeverb 2 do fone: Decay em 1.5s, Low Cut em 250Hz, High Cut em 7kHz, Wet 40%.'
      },
      {
        stepNumber: 2,
        title: 'Auto-Tune / Pitcher em Baixa Latência (Opcional)',
        flShortcut: 'F9 > Inserir "Pitcher" ou "Auto-Tune Access/Realtime" no canal de monitor',
        action: 'Se o gênero for Trap, Afrobeats, Pop ou R&B moderno, adicione um corretor tonal configurado na escala correta da música.',
        detailedGuide: [
          'No plugin de afinação (ex: Pitcher ou Auto-Tune): configure a Key (ex: F#) e a Scale (Minor).',
          'Mantenha o modo "Low Latency" ativado no plugin para evitar atraso.',
          'Ouvir a afinação em tempo real ajuda o cantor a atingir os melismas e notas corretas sem esforço.'
        ],
        warning: 'Certifique-se de que o plugin de afinação NÃO esteja gravando de forma impressa/destrutiva, a menos que seja sua intenção artística.'
      }
    ],
    proTips: [
      'Volume do fone: O vocalista precisa ouvir o beat claramente, mas o volume da voz dele no fone deve estar 1-2 dB acima do beat para afinação impecável.',
      'Técnica do "Um Fone Fora": Se o cantor tiver dificuldade de afinação com fone fechado, oriente-o a afastar um dos lados do fone da orelha.'
    ],
    commonMistakes: [
      'Colocar Reverb no canal Master durante a gravação (isso vai afogar o beat inteiro em reverb).',
      'Usar plugins pesados de correção de tom que adicionam 50ms de latência e deixam o cantor perdido no tempo.'
    ]
  },
  {
    id: 'fase-5-metodos-gravacao',
    number: 5,
    title: 'Fase 5: Métodos de Gravação (Playlist vs Edison)',
    shortTitle: 'Playlist vs Edison',
    tagline: 'Escolha a técnica ideal para o seu fluxo de trabalho no estúdio',
    flMenuLocation: 'Transport Bar (Gravar) ou Edison Plugin',
    steps: [
      {
        stepNumber: 1,
        title: 'Método A: Gravação Direta na Playlist (Recomendado para Músicas Completas)',
        flShortcut: 'Botão Gravar (R) > "Audio, into the playlist as an audio clip" > Barra de Espaço',
        action: 'Grave takes completos ou versos inteiros diretamente dispostos na linha do tempo.',
        detailedGuide: [
          '1. Clique com o botão direito no botão redondo de Gravação (Record) na barra superior do FL Studio e marque "Audio".',
          '2. Ative a contagem regressiva (ícone "3 2 1" na barra superior) para ter 1 compasso de preparação antes do microfone começar a gravar.',
          '3. Selecione o canal REC IN no mixer com o microfone armado.',
          '4. Pressione R (Gravar) e dê Play (Barra de Espaço).',
          '5. Cante a seção. Ao apertar Stop (Barra de Espaço), o clipe de áudio aparecerá instantaneamente posicionado na Playlist.'
        ],
        flSettingsTip: 'Ative a opção "Loop Recording" na barra superior se quiser gravar vários takes contínuos sem parar a reprodução.'
      },
      {
        stepNumber: 2,
        title: 'Método B: Gravação no Edison (Recomendado para Amostras, Frases & Loop Takes)',
        flShortcut: 'Ctrl + E (Abre o Edison no canal selecionado)',
        action: 'Insira o Edison no canal de gravação e use o modo "On play" ou "On input".',
        detailedGuide: [
          '1. No canal REC IN, adicione o plugin "Edison" no primeiro slot de efeitos.',
          '2. No Edison, clique no modo de gravação e mude de "Now" para "On play" (grava sincronizado quando você der play no FL Studio).',
          '3. Aperte o botão Record no Edison e dê Play no FL Studio.',
          '4. O Edison registrará todo o áudio na sua memória interna de alta fidelidade.',
          '5. Use o mouse para selecionar o melhor trecho no Edison e arraste o ícone de arrastar ("Drag / copy sample") direto para a Playlist.'
        ],
        flSettingsTip: 'O Edison possui a ferramenta de redução de ruído espectral integrada (Denoise Tool - Ctrl+U).'
      }
    ],
    proTips: [
      'Grave sempre pelo menos 3 a 5 takes de cada verso/refrão para poder fazer a montagem perfeita (Comping) posteriormente.',
      'Dê nomes claros aos takes enquanto grava (ex: "Lead_Verso1_Take1", "Lead_Verso1_Take2").'
    ],
    commonMistakes: [
      'Esquecer de desarmar a gravação e regravar por cima de um take excelente que não foi salvo.',
      'Gravar sem contagem regressiva (pre-count) e cortar a primeira sílaba da voz.'
    ]
  },
  {
    id: 'fase-6-estrutura-takes-comping',
    number: 6,
    title: 'Fase 6: Estrutura de Vozes, Dobras & Comping',
    shortTitle: 'Dobras & Comping',
    tagline: 'Gravar Leads, Dobras L/R, Harmonias, Ad-libs e fazer a edição perfeita',
    flMenuLocation: 'Playlist (F5) > Tools: Cut (C), Mute (T), Slip (S)',
    steps: [
      {
        stepNumber: 1,
        title: 'Estrutura Completa de Faixas Vocais da Música',
        flShortcut: 'Organização das Tracks na Playlist (F5)',
        action: 'Grave cada camada vocal em sua respectiva track para construir a parede de som profissional.',
        detailedGuide: [
          '1. LEAD VOCAL (Voz Principal): Centralizada no meio (Mono / Pan Centro). É a voz guia com maior presença e foco.',
          '2. LEAD DOUBLE (Dobra de Lead): O cantor regrava a mesma melodia do lead exatamente igual. Pode ser misturada -6 dB abaixo do lead ou dividida em 2 takes abertos em L40% / R40%.',
          '3. HARMONIAS (Terças / Quintas / Oitavas): Camadas melódicas complementares para o refrão. Panning aberto em L60% / R60% para criar largura e grandiosidade.',
          '4. BACKING VOCALS / RESPOSTAS: Frases de apoio no final dos versos.',
          '5. AD-LIBS & GRITOS / ONOMATOPEIAS: Sons soltos, sussurros, risadas e frases de efeito espalhados nos lados estéreo (L80% / R80%).'
        ],
        flSettingsTip: 'Use a ferramenta Slice (C) com Snap ajustado para "None" (Alt segurado) para alinhar as consoantes das dobras perfeitamente com a voz principal.'
      },
      {
        stepNumber: 2,
        title: 'Comping Profissional (Montagem do Take Definitivo)',
        flShortcut: 'C (Slice) + T (Mute) + Shift (Mover na grade)',
        action: 'Ouça todos os takes gravados e monte a versão definitiva frase por frase.',
        detailedGuide: [
          '1. Posicione os takes alternativos em tracks paralelas embaixo da track principal.',
          '2. Corte (C) nos silêncios naturais entre as frases da voz.',
          '3. Escolha a melhor interpretação da primeira frase, a melhor da segunda frase, e assim por diante.',
          '4. Suba todos os trechos escolhidos para a Track Principal.',
          '5. Aplique Crossfades ou pequenos fades manuais de 5ms nas pontas de cada corte para eliminar qualquer estalo (click).'
        ],
        flSettingsTip: 'No FL Studio 21+, ative "Show fades" no canto superior esquerdo da Playlist para ajustar curvas de volume de fade in/out arrastando os nós diretamente no clipe!'
      }
    ],
    proTips: [
      'A afinação e o timing das dobras (doubles) precisam ser cirúrgicos; se ficarem fora de tempo, o vocal soa confuso e amador.',
      'Sempre limpe respirações ofegantes exageradas ou ruídos de boca nos silêncios durante a fase de comping.'
    ],
    commonMistakes: [
      'Deixar clipes cortados sobrepostos sem crossfade, gerando estalos a cada junção.',
      'Gravar dobras em tom diferente sem intenção de harmonia.'
    ]
  },
  {
    id: 'fase-7-transicao-mix',
    number: 7,
    title: 'Fase 7: Transição de Gravação para Mixagem',
    shortTitle: 'Transição p/ Mix',
    tagline: 'Consolidar áudios, aumentar buffer e preparar a sessão para os plugins',
    flMenuLocation: 'Playlist > Consolidate (Ctrl+Alt+C) & Mixer Routing',
    steps: [
      {
        stepNumber: 1,
        title: 'Consolidar / Renderizar os Takes Selecionados',
        flShortcut: 'Ctrl + Alt + C (Consolidate Playlist Selection)',
        action: 'Selecione a track editada na Playlist e consolide em um arquivo de áudio contínuo e limpo.',
        detailedGuide: [
          'Ao consolidar os múltiplos pedacinhos de áudio em um único arquivo WAV de ponta a ponta (Consolidated Track), você reduz o consumo de disco e simplifica a mixagem.',
          'Dê nomes organizados aos novos arquivos gerados: "VOX_LEAD_FINAL.wav", "VOX_DOUBLE_L.wav", "VOX_DOUBLE_R.wav", "VOX_ADLIBS.wav".'
        ],
        flSettingsTip: 'Na janela de renderização da consolidação, marque "Cut remainder" e selecione formato 24-bit ou 32-bit float WAV.'
      },
      {
        stepNumber: 2,
        title: 'Aumentar o Buffer Size para Modo Mixagem (512 ou 1024 samples)',
        flShortcut: 'F10 > Audio > Buffer Length > 512 / 1024 samples',
        action: 'Agora que as gravações estão concluídas, aumente o buffer para dar folga ao processador.',
        detailedGuide: [
          'Durante a mixagem você vai usar compressores pesados, reverbs convolutivos, equalizadores dinâmicos e oversampling.',
          'Em 512 ou 1024 samples, o FL Studio processa todos os plugins sem estalos de áudio (underruns) ou travamentos de CPU.'
        ]
      },
      {
        stepNumber: 3,
        title: 'Roteamento para os Canais de Mix & Vocal Bus',
        flShortcut: 'F9 (Mixer) > Criar Canal "VOCAL BUS" (Insert 20)',
        action: 'Roteie todas as tracks vocais para um canal agrupador (Vocal Bus) antes de enviar para o Master.',
        detailedGuide: [
          'Insert 15: LEAD VOX → Envia para Insert 20 (VOCAL BUS)',
          'Insert 16: DOUBLES → Envia para Insert 20 (VOCAL BUS)',
          'Insert 17: HARMONIAS → Envia para Insert 20 (VOCAL BUS)',
          'Insert 18: AD-LIBS → Envia para Insert 20 (VOCAL BUS)',
          'No VOCAL BUS você poderá aplicar compressão de cola (glue), saturação harmônica e automações de volume gerais para todas as vozes da música!'
        ]
      }
    ],
    proTips: [
      'Salve este projeto como "Musica_MIX_V1.flp" para manter a sessão de gravação bruta guardada em segurança.',
      'Agora você está pronto para navegar para a aba "Vocal Cleaning" e "Mix & Preparação" no assistente!'
    ],
    commonMistakes: [
      'Continuar mixando com o buffer em 64 samples e sofrer com cliques e lentidão no FL Studio.',
      'Mixar sem criar um canal Vocal Bus centralizado.'
    ]
  }
];

export interface MicSetupGuide {
  id: string;
  name: string;
  type: 'Condensador' | 'Dinâmico' | 'Fita (Ribbon)' | 'USB';
  idealDistance: string;
  polarPattern: string;
  phantomPower: boolean;
  gainSweetSpot: string;
  bestFor: string;
  pros: string[];
  studioTips: string[];
}

export const micSetupGuides: MicSetupGuide[] = [
  {
    id: 'mic-condensador',
    name: 'Microfone Condensador de Grande Diafragma',
    type: 'Condensador',
    idealDistance: '15 cm a 20 cm (4 a 6 dedos de distância com Pop Filter)',
    polarPattern: 'Cardioide (captura frontal, rejeita a traseira)',
    phantomPower: true,
    gainSweetSpot: '-18 dBFS a -14 dBFS (Picos máximos em -8 dBFS)',
    bestFor: 'Vocais Modernos, Trap, Pop, Afrobeats, R&B, Rap, Vozes Femininas e Acústico',
    pros: [
      'Resposta de agudos ultra detalhada e ar ("Air / Sheen")',
      'Alta sensibilidade dinâmica para sussurros e transientes rápidos',
      'Timbre brilhante e presente que se destaca no beat'
    ],
    studioTips: [
      'OBRIGATÓRIO: Ligar a chave +48V Phantom Power na interface antes de gravar.',
      'USE SEMPRE Pop Filter posicionado a 5cm da cápsula para evitar estouros de ar das letras "P" e "B" (plosivas).',
      'Por ser muito sensível, capture em ambiente com o mínimo de ruído e evite cantos reflexivos.'
    ]
  },
  {
    id: 'mic-dinamico',
    name: 'Microfone Dinâmico Cardioide (ex: Shure SM7B, SM58)',
    type: 'Dinâmico',
    idealDistance: '5 cm a 12 cm (Perto da cápsula com espuma anti-pop)',
    polarPattern: 'Cardioide / Supercardioide',
    phantomPower: false,
    gainSweetSpot: '-18 dBFS a -12 dBFS',
    bestFor: 'Rap Pesado, Rock, Metal, Vocais Agressivos, Gravação em Quarto Não Tratado',
    pros: [
      'Excelente rejeição de ruído ambiente e acústica ruim de quartos',
      'Suporta volumes extremos sem distorcer (alto SPL)',
      'Corpo quente e graves encorpados'
    ],
    studioTips: [
      'Microfones dinâmicos de baixa saída (como SM7B) exigem MUITO ganho no pré da interface (ou uso de ativador inline como Cloudlifter / FetHead).',
      'Não necessita de Phantom Power +48V (a menos que use Cloudlifter ativo).',
      'O efeito de proximidade é pronunciado: afaste-se 2-3cm se a voz ficar muito abafada/grave.'
    ]
  },
  {
    id: 'mic-usb',
    name: 'Microfone USB Direto (ex: Blue Yeti, Rode NT-USB, HyperX)',
    type: 'USB',
    idealDistance: '12 cm a 18 cm com Pop Filter',
    polarPattern: 'Selecione sempre modo Cardioide (ícone de coração)',
    phantomPower: false,
    gainSweetSpot: '-18 dBFS a -14 dBFS',
    bestFor: 'Home Studio Inicial, Gravação Rápida sem Interface Externa',
    pros: [
      'Prático e econômico (conecta direto no cabo USB do computador)',
      'Não exige interface de áudio dedicada nem cabos XLR'
    ],
    studioTips: [
      'No FL Studio (F10 > Audio), configure o driver como "FL Studio ASIO" e selecione o Microfone USB como Input e seus fones como Output.',
      'Ajuste o knob físico de ganho (Gain) no corpo do microfone para 40-50% para não clipar o conversor USB interno.',
      'Coloque o microfone sobre um suporte isolador ou braço articulado para não captar vibrações da mesa e digitação.'
    ]
  }
];

export interface LatencyReferenceRow {
  bufferSamples: number;
  latencyAt44k: string;
  latencyAt48k: string;
  idealUse: 'GRAVAÇÃO IDEAL' | 'GRAVAÇÃO ACEITÁVEL' | 'MIXAGEM / MASTER';
  cpuLoad: string;
  description: string;
}

export const latencyReferenceTable: LatencyReferenceRow[] = [
  {
    bufferSamples: 64,
    latencyAt44k: '1.45 ms',
    latencyAt48k: '1.33 ms',
    idealUse: 'GRAVAÇÃO IDEAL',
    cpuLoad: 'Mais Alta',
    description: 'Resposta instantânea em tempo real. O cantor não percebe nenhum atraso. Ideal para tracking com poucos plugins.'
  },
  {
    bufferSamples: 128,
    latencyAt44k: '2.90 ms',
    latencyAt48k: '2.67 ms',
    idealUse: 'GRAVAÇÃO IDEAL',
    cpuLoad: 'Média / Balanceada',
    description: 'O padrão ouro da indústria para home studios. Estabilidade excelente e latência imperceptível.'
  },
  {
    bufferSamples: 256,
    latencyAt44k: '5.80 ms',
    latencyAt48k: '5.33 ms',
    idealUse: 'GRAVAÇÃO ACEITÁVEL',
    cpuLoad: 'Baixa',
    description: 'Aceitável para gravação se o computador for mais modesto. Pode ser levemente perceptível com fones fechados.'
  },
  {
    bufferSamples: 512,
    latencyAt44k: '11.61 ms',
    latencyAt48k: '10.67 ms',
    idealUse: 'MIXAGEM / MASTER',
    cpuLoad: 'Muito Baixa',
    description: 'NÃO use para gravar voz (gera eco desconfortável). Excelente para mixar com muitos plugins e equalizadores.'
  },
  {
    bufferSamples: 1024,
    latencyAt44k: '23.22 ms',
    latencyAt48k: '21.33 ms',
    idealUse: 'MIXAGEM / MASTER',
    cpuLoad: 'Mínima',
    description: 'Máxima estabilidade para masterizações pesadas, oversampling 8x e dezenas de pistas ativas.'
  }
];

export interface VocalTrackRole {
  role: string;
  name: string;
  panPosition: string;
  faderBalance: string;
  eqFocus: string;
  description: string;
}

export const vocalTrackArrangement: VocalTrackRole[] = [
  {
    role: 'LEAD VOCAL (Voz Principal)',
    name: 'Lead Vox',
    panPosition: 'Centro (0% Pan / Mono)',
    faderBalance: '0 dB (Referência principal)',
    eqFocus: 'Presença nítida em 3kHz-5kHz e Ar em 12kHz',
    description: 'A voz condutora que conta a história da música. Deve ter clareza total, dinâmica controlada e destaque supremo.'
  },
  {
    role: 'LEAD DOUBLE (Dobra Principal)',
    name: 'Lead Double L/R',
    panPosition: 'Pan 35% L e 35% R (ou Centro -6dB)',
    faderBalance: '-6 dB a -8 dB em relação ao Lead',
    eqFocus: 'Corte mais agressivo em 200Hz e agudos suaves',
    description: 'Gera espessura e reforço no refrão. Deve ser cantada com a mesma dicção e ritmo exatos do lead.'
  },
  {
    role: 'HARMONIAS (Backing Vocals)',
    name: 'Harmonias Terças / Quintas',
    panPosition: 'Pan 60% L e 60% R (Abertura Estéreo)',
    faderBalance: '-7 dB a -10 dB',
    eqFocus: 'Corte de agudos ásperos para não competir com as consoantes do lead',
    description: 'Adiciona emoção, grandiosidade e textura harmônica nas partes altas e refrões.'
  },
  {
    role: 'AD-LIBS & RESPOSTAS',
    name: 'Ad-Libs / Efeitos FX',
    panPosition: 'Pan 75% L a 90% R ou Panning Automático',
    faderBalance: '-8 dB a -12 dB (com Reverb/Delay molhado)',
    eqFocus: 'Filtro Telefone (Bandpass 400Hz - 4kHz) ou Saturação',
    description: 'Sussurros, gritos, frases soltas de apoio e efeitos criativos que preenchem os vazios do beat.'
  }
];
