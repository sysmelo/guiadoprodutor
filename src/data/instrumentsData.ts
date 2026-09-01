import { InstrumentGuide } from '../types';

export const instrumentsData: InstrumentGuide[] = [
  // ==========================================
  // VOCAL SECTION (GUIA DE MIXAGEM VOCAL)
  // ==========================================
  {
    id: 'vocal-principal',
    name: 'Vocal Principal (Lead Vocal)',
    category: 'VOCAL',
    mixTarget: 'VOCAL',
    subCategory: 'Lead Vocal',
    description: 'A voz principal que carrega a letra e a emoção do ouvinte. Requer presença frontal firme, corpo controlado e agudos sedosos.',
    freqFocus: {
      cut: 'HPF a 80Hz - 100Hz (elimina rumble, vibração de chão e respiração excessiva)',
      body: '180Hz - 260Hz (calor e fundamento tonal da voz; atenuar se soar abafado)',
      presence: '3.5kHz - 5kHz (inteligibilidade das consoantes e posicionamento na cara do ouvinte)',
      airOrPunch: '11kHz - 14kHz (ar sedoso moderno "air band" de estúdio)'
    },
    compressionSettings: {
      ratio: '3:1 a 4:1 (ou compressão serial de 2 estágios)',
      attack: '15ms - 25ms (permite os transientes das consoantes passarem antes de comprimir)',
      release: '80ms - 120ms (recuperação rítmica no andamento da música)',
      gainReduction: '3dB a 6dB de redução nos momentos mais energéticos'
    },
    stereoPlacement: 'Mono (Centro)',
    saturationRec: 'SUAVE',
    flPluginChain: [
      '1. Pitcher ou NewTone (Correção e estabilização de afinação na escala da música)',
      '2. Fruity Parametric EQ 2 (Corte HPF 85Hz + Atenuação de ressonâncias em 300Hz e 3.2kHz)',
      '3. Fruity Limiter - Aba COMP (Compressor dinâmico com ratio 3.5:1, attack 15ms, release 90ms)',
      '4. Maximus (Preset De-Esser na banda HIGH entre 5.5kHz e 8.5kHz)',
      '5. Fruity Parametric EQ 2 (EQ Tonal: +1.5dB em 4.5kHz e +2dB High Shelf em 12kHz)',
      '6. Fruity Blood Overdrive (Saturação harmônica sutil: Pre-band 0.25, Color 6kHz, Mix 15%)',
      '7. Envio para Aux Sends: Fruity Reeverb 2 (Plate) e Fruity Delay 3 (Ping-Pong com Ducking)'
    ],
    s1NativeChain: [
      '1. Melodyne Essential / Studio via ARA (Pressione Ctrl+M para afinação cirúrgica)',
      '2. PreSonus Pro EQ³ (HPF 85Hz 24dB/oct + Dynamic Notch em ressonâncias nasais)',
      '3. PreSonus Fat Channel XT (Módulo FET 1176 para picos rápidos + Módulo Tube para calor)',
      '4. PreSonus Pro EQ³ (Banda High Shelf em 12kHz com +2.5dB para brilho aberto)',
      '5. PreSonus RedlightDist (Saturação analógica suave no modo Tube com 15% de Drive)',
      '6. Sends para canais FX: PreSonus OpenAIR Reverb (Vintage Plate) e Groove Delay'
    ],
    wavesChain: [
      '1. Waves Silk Vocal (Atenuação inteligente de ressonâncias médias e sibilâncias)',
      '2. Waves CLA-76 Blacky (Ratio 4:1, Attack 3, Release 7 para capturar picos rápidos com 3-5dB GR)',
      '3. Waves CLA-2A (Nivelamento óptico suave com 2-3dB de cola aveludada)',
      '4. Waves PuigTec EQP-1A (Boost de ar em 12kHz ou 16kHz +2.5dB)',
      '5. Waves Renaissance Vox (R-Vox com gate sutil em -48dB e leve compressão final)',
      '6. Envio para FX Aux: Waves H-Delay (1/8 Dotted com filtros HPF/LPF) e Reverb Plate'
    ],
    fabfilterChain: [
      '1. FabFilter Pro-Q 3 (HPF 85Hz + Dynamic EQ nas ressonâncias e de-mudding em 260Hz)',
      '2. FabFilter Pro-DS (Modo Single Vocal entre 5.5kHz e 9kHz com -4dB de redução nos S)',
      '3. FabFilter Pro-C 2 (Estilo Vocal, Ratio 3:1, Attack 15ms, Lookahead 1.5ms, Auto-Release)',
      '4. FabFilter Saturn 2 (Banda média-alta com saturação Warm Tape ou Gentle Tube com 12% Drive)',
      '5. FabFilter Pro-Q 3 (Reforço musical com curva Bell em 4kHz e High Shelf em 13kHz)',
      '6. Sends: FabFilter Timeless 3 (Tape Delay) e FabFilter Pro-R 2 (Decay Rate EQ com Ducking)'
    ],
    hybridProChain: [
      '1. Antares Auto-Tune Pro X (Retune Speed 12-25 para afinação moderna com tom travado)',
      '2. iZotope RX 10 (Mouth De-click para saliva + Voice De-noise para ruído de fundo)',
      '3. FabFilter Pro-Q 3 (Limpeza dinâmica cirúrgica)',
      '4. Universal Audio 1176LN (Ataque rápido pegando picos) -> UAD LA-2A (Calor valvulado)',
      '5. Oeksound Soothe2 (Remoção dinâmica contínua de ressonâncias ásperas na faixa 2k-8kHz)',
      '6. Slate Digital Fresh Air (Mid Air 12%, High Air 18% para presença cristalina)',
      '7. Soundtoys MicroShift (Abertura estéreo paralela sutil 15% nos refrões)',
      '8. Valhalla VintageVerb (Modo 1980s Plate 1.8s) + Soundtoys EchoBoy (Studio Tape Delay)'
    ],
    expertTips: [
      'Mantenha o vocal principal 100% no centro mono para ancorar todo o arranjo da música.',
      'Sempre use compressão serial: dois compressores trabalhando de 2dB a 3dB soam infinitamente mais naturais que um compressor trabalhando sozinho em 8dB.',
      'Equalize o canal de retorno de Reverb e Delay com corte em 500Hz e 3kHz para que os efeitos não sujem a voz seca.'
    ]
  },
  {
    id: 'vocal-back',
    name: 'Back Vocal (Backing Vocals / Dobras L & R)',
    category: 'VOCAL',
    mixTarget: 'VOCAL',
    subCategory: 'Backing Vocals',
    description: 'Vozes de apoio, harmonias e dobras que conferem largura estéreo, grandiosidade e textura atrás do vocal principal.',
    freqFocus: {
      cut: 'HPF mais alto: 120Hz - 160Hz (elimina o grave para não mascarar o corpo do lead)',
      body: '200Hz - 350Hz (atenuar 2dB a 3dB para emagrecer o timbre e recuar no plano)',
      presence: '2.5kHz - 4kHz (reduzir suavemente para não disputar espaço frontal)',
      airOrPunch: '10kHz - 16kHz (reforçar suavemente para criar uma cortina de brilho estéreo)'
    },
    compressionSettings: {
      ratio: '4:1 a 6:1 (compressão mais firme e densa que a voz principal)',
      attack: '5ms - 10ms (ataque rápido achata o transiente e empurra o backing para trás)',
      release: '60ms - 100ms',
      gainReduction: '5dB a 8dB de redução contínua para homogeneidade perfeita'
    },
    stereoPlacement: 'Sides / Panning',
    saturationRec: 'SUAVE',
    flPluginChain: [
      '1. Pitcher (Afinação estrita em lote para que todas as vozes casem perfeitamente)',
      '2. Fruity Parametric EQ 2 (HPF 140Hz + corte de 3dB em 3kHz)',
      '3. Fruity Stereo Shaper ou Panpot (Pan 80% Left para Dobra A e 80% Right para Dobra B)',
      '4. Fruity Limiter (Compressão firme 5:1 para colar o bloco vocal)',
      '5. Fruity Reeverb 2 (Reverb mais molhado com 30% wet para posicionar no fundo da sala)'
    ],
    s1NativeChain: [
      '1. PreSonus Pro EQ³ (HPF 150Hz + atenuação de presença)',
      '2. PreSonus Binaural Pan ou Pan L/R extremo nas pistas',
      '3. PreSonus Fat Channel XT (Modo Tube com compressão 4:1 e ganho compensado)',
      '4. PreSonus OpenAIR (IR de Hall espaçoso com 2.5s)'
    ],
    wavesChain: [
      '1. Waves Doubler 2 ou 4 (Para gerar textura estéreo rica)',
      '2. Waves SSL E-Channel (Corte de presença em 3kHz e HPF em 150Hz)',
      '3. Waves CLA-76 (Modo All-Buttons ou 8:1 com compressão agressiva)',
      '4. Waves Renaissance DeEsser (Para controlar sibilâncias estéreo nos cantos)'
    ],
    fabfilterChain: [
      '1. FabFilter Pro-Q 3 (HPF 140Hz + Corte no canal MID em 3kHz mantendo os SIDE abertos)',
      '2. FabFilter Pro-C 2 (Estilo Classic / Bus com ratio 4:1 e ataque rápido)',
      '3. FabFilter Saturn 2 (Gentle Saturation nos agudos com 15% Drive)',
      '4. FabFilter Pro-R 2 (Modo Ambient Hall 2.2s)'
    ],
    hybridProChain: [
      '1. Antares Auto-Tune Pro X (Retune Speed rápido para alinhamento rígido)',
      '2. Celemony Melodyne 5 (Alinhamento de formantes e timing com o Lead)',
      '3. Soundtoys MicroShift (Style 2, Mix 60% para abrir nas extremidades estéreo)',
      '4. FabFilter Pro-C 2 (Compressão em grupo)',
      '5. Valhalla Supermassive ou VintageVerb (Grande ambiência estéreo)'
    ],
    expertTips: [
      'Abra as dobras em estéreo: Pista 1 em 80% L e Pista 2 em 80% R.',
      'Corte 3kHz nos backing vocals para que o vocal principal apareça sem precisar aumentar o volume.',
      'Use um de-esser mais agressivo nas dobras para evitar sibilâncias duplas e desencontradas.'
    ]
  },
  {
    id: 'vocal-adlibs',
    name: 'Adlibs & Efeitos Vocais (Telefone / Space FX)',
    category: 'VOCAL',
    mixTarget: 'VOCAL',
    subCategory: 'Vocal FX',
    description: 'Interjeições, gritos de fundo, risadas, frases de efeito e adlibs que preenchem as pausas com atitude e dinâmica.',
    freqFocus: {
      cut: 'HPF em 250Hz - 400Hz + LPF em 3.5kHz - 4.5kHz (Efeito Telefone / Rádio clássico)',
      body: 'Totalmente atenuado para não concorrer com o arranjo',
      presence: 'Distorcida e ressonante nos médios',
      airOrPunch: 'Processada com delays longos e reverbs gigantes'
    },
    compressionSettings: {
      ratio: '6:1 a 10:1 (Hard Limiting / Compressão Esmagada)',
      attack: '2ms - 5ms (esmagamento total de transientes)',
      release: '50ms - 80ms',
      gainReduction: '8dB a 14dB de redução'
    },
    stereoPlacement: 'Sides / Panning',
    saturationRec: 'FORTE',
    flPluginChain: [
      '1. Fruity Parametric EQ 2 (Band-Pass Filter: corta tudo abaixo de 300Hz e acima de 4kHz)',
      '2. Fruity Blood Overdrive ou Fast Dist (Distorção aparente de rádio/megafone)',
      '3. Fruity Limiter (Compressão pesada para segurar gritos e sussurros no mesmo nível)',
      '4. Fruity Delay 3 (Ping-Pong 1/8 Dotted com Feedback alto)',
      '5. Fruity Reeverb 2 (Large Hall com 45% Wet)'
    ],
    s1NativeChain: [
      '1. PreSonus Pro EQ³ (Filtro passa-faixa estilo Walkie-Talkie)',
      '2. PreSonus RedlightDist (Distorção Fuzz/Tube agressiva)',
      '3. PreSonus Groove Delay (Multi-tap estéreo dançante)',
      '4. PreSonus OpenAIR (Caverna ou Catacumba com 4 segundos de decaimento)'
    ],
    wavesChain: [
      '1. Waves The King\'s Microphones ou SSL EQ (Curva estreita de telefone)',
      '2. Waves CLA-76 (Todos os botões pressionados "All-In" para distorção FET)',
      '3. Waves H-Delay (Ping-Pong estéreo com Hi-Cut acentuado)',
      '4. Waves Renaissance Reverb (Wet 50%)'
    ],
    fabfilterChain: [
      '1. FabFilter Pro-Q 3 (Filtro Brickwall em 350Hz e 4.2kHz com ressonância no topo)',
      '2. FabFilter Saturn 2 (Modo Heavy Tube ou Broken Tube com 50% Drive)',
      '3. FabFilter Pro-C 2 (Modo Pumping com 8:1 de ratio)',
      '4. FabFilter Timeless 3 (Tape Flange Delay)'
    ],
    hybridProChain: [
      '1. Soundtoys Little AlterBoy (Pitch shift -12 semitons ou Formant Shift para voz alienígena/monstro)',
      '2. Soundtoys Decapitator (Modo T ou E com botão Punish ativado)',
      '3. Soundtoys EchoBoy (Space Echo 201 com saturação no limite)',
      '4. Valhalla Supermassive (Preset "Dark Matter" para cauda cósmica)'
    ],
    expertTips: [
      'Automatize o botão de Pan das adlibs para que cada palavra surja em um lado diferente do fone de ouvido.',
      'Use o truque do pitch shift (-1 oitava ou +1 oitava) em paralelo para dar densidade monstruosa ou espacial.'
    ]
  },
  {
    id: 'vocal-bus',
    name: 'Grupo Vocal / Master Vocal Bus',
    category: 'VOCAL',
    mixTarget: 'VOCAL',
    subCategory: 'Mix Bus',
    description: 'O canal que reúne todos os vocais (Lead, Backings, Dobras e Adlibs). Onde é feita a cola final, o de-essing coletivo e a automação global.',
    freqFocus: {
      cut: 'HPF a 75Hz para garantir que nenhum subgrave residual chegue ao master',
      body: 'Verificação em 250Hz se o acúmulo de vozes não está embolando',
      presence: '3.5kHz - 4.5kHz polimento suave',
      airOrPunch: '12kHz ar coletivo brilhante'
    },
    compressionSettings: {
      ratio: '1.5:1 a 2:1 (Compressão de cola "Glue" muito sutil)',
      attack: '30ms (lento para manter os transientes intactos)',
      release: 'Auto ou 100ms',
      gainReduction: '1dB a 2.5dB nos momentos de pico do refrão'
    },
    stereoPlacement: 'Mono (Centro)',
    saturationRec: 'SUAVE',
    flPluginChain: [
      '1. Fruity Parametric EQ 2 (Limpeza de ressonâncias somadas)',
      '2. Fruity Limiter (Compressão suave 2:1 apenas para colar o bloco)',
      '3. Maximus (De-Esser global suave para controlar sibilâncias somadas)',
      '4. Fruity Soft Clipper (Proteção contra picos rápidos antes do master)'
    ],
    s1NativeChain: [
      '1. PreSonus Pro EQ³ (Polimento tonal suave)',
      '2. PreSonus Tricomp ou Fat Channel XT (Modo VCA Bus com 1.5dB de redução)',
      '3. PreSonus Pro EQ³ (High Shelf suave)'
    ],
    wavesChain: [
      '1. Waves SSL G-Master Buss Compressor (Ratio 2:1, Attack 30ms, Release Auto, 2dB GR)',
      '2. Waves C6 Multiband Compressor (Para segurar picos dinâmicos nos agudos)',
      '3. Waves PuigTec EQP-1A (+1dB em 16kHz para ar no grupo inteiro)'
    ],
    fabfilterChain: [
      '1. FabFilter Pro-MB (Compressão suave de médios-graves e agudos)',
      '2. FabFilter Pro-C 2 (Estilo Bus com ratio 2:1 e Knee suave)',
      '3. FabFilter Pro-DS (Modo Allround cobrindo o grupo vocal)',
      '4. FabFilter Saturn 2 (Gentle Saturation 5% no sinal inteiro)'
    ],
    hybridProChain: [
      '1. Oeksound Soothe2 (Profundidade suave em 1.5 para tirar asperezas do grupo)',
      '2. Universal Audio SSL 4000 G-Bus Compressor (2:1 cola do Grammy)',
      '3. Slate Digital Fresh Air (High Air em 8% para toque de ar de rádio)',
      '4. FabFilter Pro-L 2 (True Peak Ceiling em -0.5dB com 0.5dB de contenção preventiva)'
    ],
    expertTips: [
      'Nunca comprima o Vocal Bus pesadamente: toda a compressão de atitude deve ser feita nas faixas individuais.',
      'Automatize o volume do Vocal Bus em +0.5dB a +1.0dB durante os refrões para dar impacto energético.'
    ]
  },

  // ==========================================
  // INSTRUMENTAL & BEAT SECTION
  // ==========================================
  {
    id: 'kick-bumbo',
    name: 'Kick / Bumbo (Punch & Sub-Kick)',
    category: 'DRUMS',
    mixTarget: 'INSTRUMENTAL',
    subCategory: 'Bateria / Drums',
    description: 'A fundação rítmica e de impacto da música. Precisa de peso no sub, pegada no peito (punch) e estalo no agudo para ser audível em fones.',
    freqFocus: {
      cut: 'HPF a 25Hz - 30Hz (remove frequências inaudíveis que roubam headroom)',
      body: '50Hz - 65Hz (o peso subgrave fundamental do bumbo)',
      presence: '250Hz - 400Hz (CORTAR 2dB a 4dB para tirar o som oco de "papelão / caixa de sapato")',
      airOrPunch: '2.5kHz - 4.5kHz (o estalo da batedeira / beater que dá presença em caixas pequenas)'
    },
    compressionSettings: {
      ratio: '4:1 a 6:1 (ou Soft Clipping)',
      attack: '30ms - 45ms (ataque lento é FUNDAMENTAL para deixar o transiente inicial bater)',
      release: '40ms - 80ms (rápido para recuperar antes do próximo golpe)',
      gainReduction: '2dB a 4dB de redução'
    },
    stereoPlacement: 'Mono (Centro)',
    saturationRec: 'MÉDIA',
    flPluginChain: [
      '1. Fruity Parametric EQ 2 (HPF 28Hz + Corte cirúrgico de -3.5dB em 320Hz + Boost +2dB em 60Hz e 3.5kHz)',
      '2. Fruity Soft Clipper (Threshold padrão para ceifar o pico e aumentar a energia de saída)',
      '3. Fruity Limiter - Aba COMP (Compressor com Attack em 35ms, Release 50ms)',
      '4. Fruity Blood Overdrive (Pre-Band 0.3, Drive 0.2 para adicionar harmônicos de impacto)'
    ],
    s1NativeChain: [
      '1. PreSonus Pro EQ³ (HPF 30Hz 24dB/oct + Notch de-box em 350Hz)',
      '2. PreSonus Fat Channel XT (Modo FET 1176 com Attack lento 4 e Release rápido 7)',
      '3. PreSonus RedlightDist (Saturação suave no modo Transistor)',
      '4. PreSonus Tricomp'
    ],
    wavesChain: [
      '1. Waves SSL E-Channel (Boost em 60Hz + Boost em 4kHz + Atenuação em 350Hz)',
      '2. Waves CLA-76 (Attack 1, Release 7 com ratio 4:1)',
      '3. Waves Renaissance Bass (R-Bass em 55Hz para turbinar o peso sub)',
      '4. Waves Smack Attack (Transient Shaper: +3dB de Attack boost)'
    ],
    fabfilterChain: [
      '1. FabFilter Pro-Q 3 (HPF Brickwall 25Hz + De-Box em 300Hz + Dynamic EQ para evitar clipping)',
      '2. FabFilter Pro-C 2 (Estilo "Punch" com Attack 35ms e Release 60ms)',
      '3. FabFilter Saturn 2 (Banda de 50Hz-200Hz com Clean Tube para densidade)',
      '4. FabFilter Pro-L 2 ou Clipper'
    ],
    hybridProChain: [
      '1. FabFilter Pro-Q 3 (Cortes cirúrgicos)',
      '2. Oeksound Spiff (Reforço inteligente de transiente no estalo)',
      '3. Soundtoys Decapitator (Style A ou E com Drive 2 para punch analógico)',
      '4. Slate Digital FG-Stress (Emulação do Empirical Labs Distressor no modo 6:1)',
      '5. Sir Audio StandardCLIP (Hard/Soft Clipper final para ganho extremo sem perda de punch)'
    ],
    expertTips: [
      'NUNCA coloque reverb no Kick em músicas urbanas (Trap, Afrobeat, Kuduro). Mantenha 100% seco e em mono.',
      'Sincronize a fase do Kick com o 808 invertendo a polaridade se os dois cancelarem os graves.'
    ]
  },
  {
    id: 'baixo-808',
    name: '808 & Sub-Bass (Trap, Drill, Afrobeat, Kuduro)',
    category: 'BAIXO',
    mixTarget: 'INSTRUMENTAL',
    subCategory: 'Baixo / Bass',
    description: 'O elemento mais poderoso da música moderna. Deve vibrar no peito em sistemas grandes e ter harmônicos suficientes para tocar no alto-falante do celular.',
    freqFocus: {
      cut: 'HPF a 28Hz - 32Hz (remove sub-infrassom) + LPF em 6kHz - 8kHz (elimina chiado residual)',
      body: '35Hz - 55Hz (energia subsônica pura que move o ar)',
      presence: '100Hz - 250Hz (harmônicos de segundo nível para definição no celular)',
      airOrPunch: '700Hz - 1.5kHz (saturação e distorção perceptível em pequenos alto-falantes)'
    },
    compressionSettings: {
      ratio: '4:1 ou Saturation Hard Clipping (muitos engenheiros preferem não comprimir e sim saturar)',
      attack: '20ms - 30ms (deixa o ataque do 808 passar)',
      release: '100ms - 200ms',
      gainReduction: '2dB a 4dB'
    },
    stereoPlacement: 'Mono (Centro)',
    sidechainTip: 'Obrigatório: Configure Sidechain com o Kick para que o 808 abaixe 3dB a 5dB nos primeiros 40ms de cada batida do bumbo.',
    saturationRec: 'FORTE',
    flPluginChain: [
      '1. Fruity Parametric EQ 2 (HPF 30Hz com corte 48dB/oct + Reforço harmônico em 150Hz)',
      '2. Fruity WaveShaper ou Blood Overdrive (Curva suave de saturação para criar harmônicos audíveis no smartphone)',
      '3. Fruity Limiter - Aba COMP em modo Sidechain com o canal do Kick (Ducking de 4dB instantâneo)',
      '4. Maximus (Stereo Separation: girar para 100% Mono na banda Low)',
      '5. Fruity Soft Clipper (Arredondamento de picos para máxima pressão sonora)'
    ],
    s1NativeChain: [
      '1. PreSonus Pro EQ³ (Filtro passa-alta 30Hz e passa-baixa 7kHz)',
      '2. PreSonus RedlightDist (Modo Tube com Drive em 35% e Mix em 70%)',
      '3. PreSonus Compressor (Sidechain acionado pelo Kick)',
      '4. PreSonus Binaural Pan (Colocar em 100% Mono)'
    ],
    wavesChain: [
      '1. Waves Renaissance Bass (R-Bass configurado na nota fundamental do 808, ex: 45Hz a 55Hz)',
      '2. Waves SSL E-Channel (HPF em 30Hz e leve saturação do pré-amplificador)',
      '3. Waves CLA-2A (Apenas 2dB de redução para consistência de volume entre notas)',
      '4. Waves C6 Multiband (Sidechain multibanda no grave)'
    ],
    fabfilterChain: [
      '1. FabFilter Pro-Q 3 (HPF 30Hz + Sidechain Dynamic EQ que atenua 50Hz quando o Kick bate)',
      '2. FabFilter Saturn 2 (Banda dividida: Sub 30-100Hz limpo; Médio 100Hz-2kHz com Warm Tube 30% Drive)',
      '3. FabFilter Pro-C 2 (Sidechain externo linkado ao Kick)',
      '4. FabFilter Pro-L 2 (True Peak Limiting)'
    ],
    hybridProChain: [
      '1. FabFilter Pro-Q 3 (Escultura cirúrgica)',
      '2. Soundtoys Decapitator (Style N ou T, Drive 3.5, Tone voltado para o escuro)',
      '3. Slate Digital Fresh Air (Desativado no sub, apenas se quiser ar no ataque)',
      '4. Oeksound Soothe2 (Para domar ressonâncias exageradas em notas altas do 808)',
      '5. Cableguys VolumeShaper / Kickstart 2 (Curva de ducking milimétrica com o Kick)'
    ],
    expertTips: [
      'Grave abaixo de 100Hz DEVE estar 100% em MONO para evitar cancelamento de fase em pistas de dança e caixas de som.',
      'Sature apenas as frequências médias do 808 (150Hz - 1kHz) mantendo a onda senoidal pura no subgrave (30Hz - 60Hz).'
    ]
  },
  {
    id: 'snare-caixa',
    name: 'Caixa (Snare) & Claps',
    category: 'DRUMS',
    mixTarget: 'INSTRUMENTAL',
    subCategory: 'Bateria / Drums',
    description: 'O estalo que define o ritmo de volta da música. Deve ter corpo firme, estalo de transiente nítido e cauda brilhante de esteira.',
    freqFocus: {
      cut: 'HPF a 90Hz - 120Hz (remove graves inúteis que disputam com kick e baixo)',
      body: '180Hz - 240Hz (o "thump" e peso encorpado da madeira da caixa)',
      presence: '1.2kHz - 2.5kHz (o ataque do corpo do golpe)',
      airOrPunch: '4.5kHz - 8kHz (o estalo nítido da esteira metálica e o estalo do clap)'
    },
    compressionSettings: {
      ratio: '4:1 a 6:1',
      attack: '15ms - 30ms (deixa o estalo inicial passar com punch total)',
      release: '60ms - 100ms',
      gainReduction: '3dB a 6dB'
    },
    stereoPlacement: 'Mono (Centro)',
    saturationRec: 'MÉDIA',
    flPluginChain: [
      '1. Fruity Parametric EQ 2 (HPF 100Hz + Boost +2.5dB em 200Hz + Boost +3dB em 5kHz)',
      '2. Fruity Limiter - Aba COMP (Ratio 4:1, Attack 20ms, Release 80ms)',
      '3. Fruity Blood Overdrive (Color em 4kHz com Drive suave para dar calor)',
      '4. Fruity Reeverb 2 no canal Send (Gated Reverb ou Plate com 1.2s e pré-delay de 15ms)'
    ],
    s1NativeChain: [
      '1. PreSonus Pro EQ³ (HPF 100Hz + Shelf em 6kHz)',
      '2. PreSonus Fat Channel XT (Modo FET 1176 com Attack 3 e Release 7 para estalo estalado)',
      '3. PreSonus RedlightDist (Saturação harmônica suave)'
    ],
    wavesChain: [
      '1. Waves SSL E-Channel (EQ clássico de caixa de rock/pop/urban)',
      '2. Waves CLA-76 (Modo Bluey para mordida agressiva)',
      '3. Waves Smack Attack (+4dB de Attack para caixas sem vida)',
      '4. Waves Abbey Road Chambers (Ambiência curta de estúdio)'
    ],
    fabfilterChain: [
      '1. FabFilter Pro-Q 3 (Reforço em 200Hz e 5kHz)',
      '2. FabFilter Pro-C 2 (Estilo "Punch" com Lookahead desativado para preservar transientes)',
      '3. FabFilter Saturn 2 (Tape Saturation nos agudos)'
    ],
    hybridProChain: [
      '1. Universal Audio 1176LN (Rev A Bluestripe)',
      '2. Soundtoys Decapitator (Style E)',
      '3. Oeksound Spiff (Transient shaper para esteira)',
      '4. Valhalla VintageVerb (Modo 1980s Ambience 0.6s para ar natural)'
    ],
    expertTips: [
      'Se o snare soar fraco, adicione uma camada sutil de White Noise ou use um saturador harmônico.',
      'Um reverb muito longo na caixa em andamentos rápidos (Kuduro 140BPM) deixará o ritmo confuso; prefira reverbs curtos (0.6s - 1.0s).'
    ]
  },
  {
    id: 'hihats-pratos',
    name: 'Hi-Hats, Shakers & Pratos',
    category: 'DRUMS',
    mixTarget: 'INSTRUMENTAL',
    subCategory: 'Bateria / Drums',
    description: 'Elementos de alta frequência que conferem movimento e velocidade à batida. Devem ser brilhantes e nítidos sem furar os tímpanos do ouvinte.',
    freqFocus: {
      cut: 'HPF a 300Hz - 500Hz (elimina todo o médio-grave inútil)',
      body: '600Hz - 1kHz (corpo metálico da cúpula do prato)',
      presence: '4kHz - 7kHz (atenção: região onde o hi-hat pode soar estridente e cansativo)',
      airOrPunch: '10kHz - 18kHz (brilho sedoso e textura aberta de alta fidelidade)'
    },
    compressionSettings: {
      ratio: '2:1 a 3:1 (ou apenas controle de transientes com De-Esser)',
      attack: '10ms',
      release: '40ms',
      gainReduction: '1dB a 3dB'
    },
    stereoPlacement: 'Sides / Panning',
    saturationRec: 'SUAVE',
    flPluginChain: [
      '1. Fruity Parametric EQ 2 (HPF a 400Hz + corte suave de -2dB em 5.5kHz para tirar aspereza)',
      '2. Fruity Stereo Enhancer ou Panpot (Pan 25% Left ou Right para tirar do centro do vocal)',
      '3. Maximus (De-Esser em 6kHz para amaciar pratos metálicos cortantes)',
      '4. Fruity Delay 3 (Envio sutil de delay ping-pong em colcheias)'
    ],
    s1NativeChain: [
      '1. PreSonus Pro EQ³ (HPF 450Hz + Dynamic Notch em ressonâncias agudas)',
      '2. PreSonus Binaural Pan (Posicionamento estéreo sutil)',
      '3. PreSonus Fat Channel XT'
    ],
    wavesChain: [
      '1. Waves SSL E-Channel (HPF em 400Hz + High Shelf em 12kHz)',
      '2. Waves Renaissance DeEsser (Para domar picos estridentes nos hi-hat rolls)',
      '3. Waves S1 Stereo Imager (Abertura estéreo)'
    ],
    fabfilterChain: [
      '1. FabFilter Pro-Q 3 (HPF 400Hz + Dynamic EQ atenuando 5kHz apenas quando toca forte)',
      '2. FabFilter Pro-DS (Modo Allround)',
      '3. FabFilter Saturn 2 (Tape Saturation sutil para amaciar agudos)'
    ],
    hybridProChain: [
      '1. Oeksound Soothe2 (Remoção contínua de ressonâncias metálicas nos pratos)',
      '2. Slate Digital Fresh Air (High Air suave em 6%)',
      '3. Soundtoys PanMan (Automação rítmica de pan sincronizada com o BPM)',
      '4. Valhalla VintageVerb (Espaço estéreo sutil)'
    ],
    expertTips: [
      'Nunca deixe Hi-Hats e Shakers 100% no centro mono: dê um pan de 20% a 40% para abrir espaço para o vocal principal e a caixa.',
      'Varie a velocidade (velocity) de cada nota do hi-hat para criar o balanço e humanização natural.'
    ]
  },
  {
    id: 'percussao-africana',
    name: 'Percussões Tradicionais (Kuduro, Batucada, Kizomba, Afrobeat)',
    category: 'DRUMS',
    mixTarget: 'INSTRUMENTAL',
    subCategory: 'Percussão Tradicional',
    description: 'Congas, bongôs, djembês, dikanza, tambores e percussões étnicas que dão a ginga e a identidade sonora dos ritmos angolanos e africanos.',
    freqFocus: {
      cut: 'HPF a 80Hz - 150Hz (dependendo do tamanho do tambor)',
      body: '200Hz - 350Hz (o impacto da pele do tambor e ressonância da madeira)',
      presence: '2.5kHz - 4.5kHz (o estalo da mão batendo na pele / slap)',
      airOrPunch: '8kHz+ (o brilho do ar e atrito)'
    },
    compressionSettings: {
      ratio: '3:1 a 4:1',
      attack: '20ms - 35ms (mantém a dinâmica percussiva)',
      release: '80ms',
      gainReduction: '2dB a 5dB'
    },
    stereoPlacement: 'Sides / Panning',
    saturationRec: 'MÉDIA',
    flPluginChain: [
      '1. Fruity Parametric EQ 2 (HPF 100Hz + Boost tonal na frequência fundamental da percussão)',
      '2. Fruity Stereo Shaper (Distribuição estéreo no espaço: Conga Low 30% L, Conga High 30% R)',
      '3. Fruity Limiter (Compressão controlada)',
      '4. Fruity Blood Overdrive (Aquecimento analógico de fita)',
      '5. Fruity Reeverb 2 (Room com 1.0s para criar a sensação de músicos ao vivo na sala)'
    ],
    s1NativeChain: [
      '1. PreSonus Pro EQ³ (Modelagem tonal)',
      '2. PreSonus Fat Channel XT (Modo VCA)',
      '3. PreSonus OpenAIR (IR de Studio Room acústico)'
    ],
    wavesChain: [
      '1. Waves SSL E-Channel (EQ percussivo e Gate para limpar cauda de tambor)',
      '2. Waves Smack Attack (+3dB de Attack para estalo de mão)',
      '3. Waves CLA-76 (Compressão rápida)'
    ],
    fabfilterChain: [
      '1. FabFilter Pro-Q 3 (EQ dinâmico por instrumento)',
      '2. FabFilter Pro-C 2 (Estilo "Punch")',
      '3. FabFilter Saturn 2 (Warm Tube)'
    ],
    hybridProChain: [
      '1. Soundtoys Decapitator (Style A com Drive 2)',
      '2. Oeksound Spiff (Reforço do slap da mão)',
      '3. Universal Audio Neve 1073 Preamp & EQ',
      '4. Valhalla VintageVerb (Concert Hall curto)'
    ],
    expertTips: [
      'Faça o pan de cada tambor diferente para criar um círculo de percussionistas ao redor do ouvinte.',
      'Use compressão paralela no grupo de percussão para dar energia sem esmagar as nuances da interpretação.'
    ]
  },
  {
    id: 'pianos-teclados',
    name: 'Pianos Acústicos, Elétricos (Rhodes) & Teclados',
    category: 'INSTRUMENTOS',
    mixTarget: 'INSTRUMENTAL',
    subCategory: 'Harmonia & Synths',
    description: 'A base harmônica e melódica. Ocupa uma faixa gigantesca de frequências e precisa ser esculpido com cuidado para não brigar com o vocal e o baixo.',
    freqFocus: {
      cut: 'HPF a 100Hz - 160Hz (fundamental para limpar espaço para o 808 e baixo)',
      body: '250Hz - 450Hz (corpo da madeira do piano; atenuar se embolar a voz)',
      presence: '2.5kHz - 4.5kHz (clareza das notas melódicas; abrir espaço no centro para o vocal)',
      airOrPunch: '8kHz - 12kHz (brilho aveludado dos martelos e teclas)'
    },
    compressionSettings: {
      ratio: '2.5:1 a 4:1',
      attack: '25ms - 40ms',
      release: '100ms - 200ms',
      gainReduction: '2dB a 4dB'
    },
    stereoPlacement: 'Estéreo Largo',
    saturationRec: 'SUAVE',
    flPluginChain: [
      '1. Fruity Parametric EQ 2 (HPF 120Hz + Atenuação cirúrgica de -2.5dB em 350Hz e 3.2kHz)',
      '2. Fruity Stereo Enhancer (Abertura de largura estéreo mantendo o centro desobstruído)',
      '3. Fruity Limiter (Compressão suave 2.5:1 para nivelar a intensidade dos acordes)',
      '4. Fruity Delay 3 (1/4 de tempo com modulação de chorus suave)',
      '5. Fruity Reeverb 2 (Ambiência estéreo com 25% Wet e Low Cut ativado)'
    ],
    s1NativeChain: [
      '1. PreSonus Pro EQ³ (Corte passa-alta 120Hz + Mid/Side EQ cortando o MID em 3kHz)',
      '2. PreSonus Fat Channel XT (Modo Tube para calor de piano clássico)',
      '3. PreSonus OpenAIR (IR de Hall acústico com 2.0s)'
    ],
    wavesChain: [
      '1. Waves PuigTec EQP-1A (Boost aveludado em 10kHz)',
      '2. Waves CLA-2A (Nivelamento óptico suave)',
      '3. Waves S1 Stereo Imager (Alargamento do campo estéreo)',
      '4. Waves H-Delay'
    ],
    fabfilterChain: [
      '1. FabFilter Pro-Q 3 (Mid/Side EQ: corte no MID em 3kHz para a voz respirar, reforço nos SIDES)',
      '2. FabFilter Pro-C 2 (Estilo Opto / Classic)',
      '3. FabFilter Timeless 3 (Vintage Tape Delay)',
      '4. FabFilter Pro-R 2 (Decay Rate EQ natural)'
    ],
    hybridProChain: [
      '1. FabFilter Pro-Q 3 (EQ Mid/Side)',
      '2. Soundtoys MicroShift (Abertura estéreo rica)',
      '3. Universal Audio LA-2A Gray (Compressão suave)',
      '4. Valhalla VintageVerb (Modo 1980s Concert Hall)',
      '5. Oeksound Soothe2 (Sidechain com Vocal Lead para abrir espaço automático)'
    ],
    expertTips: [
      'Use o truque do Equalizador Mid/Side: corte a frequência de 3kHz apenas no canal MID (centro) e mantenha ou reforce em SIDE (laterais). O vocal encaixa perfeitamente no centro sem você precisar abaixar o volume do piano.',
      'Sempre corte os graves do piano abaixo de 120Hz a menos que seja uma música tocada apenas de piano e voz.'
    ]
  },
  {
    id: 'guitarras',
    name: 'Guitarras Elétricas & Violões Acústicos',
    category: 'INSTRUMENTOS',
    mixTarget: 'INSTRUMENTAL',
    subCategory: 'Harmonia & Synths',
    description: 'Cordas dedilhadas e bases rítmicas de Kizomba, Semba, Afrobeat, Pop e Rock. Devem ter clareza rítmica, brilho das palhetadas e corpo limpo.',
    freqFocus: {
      cut: 'HPF a 100Hz (elétricas) ou 80Hz (violões acústicos)',
      body: '200Hz - 300Hz (ressonância do corpo do violão; cuidado com acúmulo)',
      presence: '2.5kHz - 4.5kHz (mordida da palheta e definição)',
      airOrPunch: '8kHz - 14kHz (ar e brilho metálico das cordas)'
    },
    compressionSettings: {
      ratio: '3:1 a 4:1',
      attack: '20ms (mantém o ataque das palhetadas)',
      release: '80ms - 120ms',
      gainReduction: '2dB a 4dB'
    },
    stereoPlacement: 'Sides / Panning',
    saturationRec: 'SUAVE',
    flPluginChain: [
      '1. Fruity Parametric EQ 2 (HPF 100Hz + Notch em 280Hz para limpar ressonância de caixa)',
      '2. Fruity Panpot (Guitarras base em L/R aberto)',
      '3. Fruity Limiter (Compressão niveladora)',
      '4. Fruity Blood Overdrive ou Chorus (Para espessura e textura)',
      '5. Fruity Delay 3 (1/8 Dotted)'
    ],
    s1NativeChain: [
      '1. PreSonus Pro EQ³ (HPF e corte de ressonância)',
      '2. PreSonus Ampire (Se for guitarra elétrica direta na placa)',
      '3. PreSonus Fat Channel XT (Modo FET/Tube)',
      '4. PreSonus Groove Delay'
    ],
    wavesChain: [
      '1. Waves CLA Guitars (Channel strip completo de guitarra com EQ, comp e reverb)',
      '2. Waves SSL E-Channel (Mordida em 3kHz)',
      '3. Waves CLA-76 (Attack rápido para violão dinâmico)'
    ],
    fabfilterChain: [
      '1. FabFilter Pro-Q 3 (EQ Dinâmico nas ressonâncias das cordas)',
      '2. FabFilter Pro-C 2 (Estilo Classic)',
      '3. FabFilter Saturn 2 (Warm Tube)',
      '4. FabFilter Pro-R 2'
    ],
    hybridProChain: [
      '1. Oeksound Soothe2 (Eliminação do som estridente das cordas de aço)',
      '2. Universal Audio 1176LN',
      '3. Soundtoys EchoBoy (Modo Memory Man para texturas épicas)',
      '4. Valhalla VintageVerb'
    ],
    expertTips: [
      'Grave duas tomadas diferentes da mesma base de violão e faça o pan de uma 100% Left e outra 100% Right para uma parede sonora gigantesca.',
      'Violões captados em linha (piezo) soam plásticos; use um simulador de saturação de fita e atenue 3.5kHz para soar natural.'
    ]
  },
  {
    id: 'sintetizadores-pads',
    name: 'Sintetizadores, Leads & Pads Atmosféricos',
    category: 'INSTRUMENTOS',
    mixTarget: 'INSTRUMENTAL',
    subCategory: 'Harmonia & Synths',
    description: 'Elementos de textura espacial e sintetizadores principais de melodia. Devem preencher as laterais e o fundo da mix sem disputar com a voz.',
    freqFocus: {
      cut: 'HPF a 150Hz - 250Hz (pads não precisam de graves)',
      body: '300Hz - 600Hz (aquecimento harmônico)',
      presence: '2kHz - 4kHz (controlar com Sidechain Ducking quando o vocal cantar)',
      airOrPunch: '10kHz+ (abertura estéreo e ambiência)'
    },
    compressionSettings: {
      ratio: '2:1 a 4:1',
      attack: '30ms',
      release: '150ms',
      gainReduction: '1.5dB a 3dB'
    },
    stereoPlacement: 'Estéreo Largo',
    sidechainTip: 'Sidechain leve com o vocal principal (-1.5dB a -3dB) para que o pad recue suavemente quando o cantor canta.',
    saturationRec: 'SUAVE',
    flPluginChain: [
      '1. Fruity Parametric EQ 2 (HPF 180Hz + High Shelf em 10kHz)',
      '2. Fruity Stereo Enhancer ou Stereo Shaper (Máxima largura estéreo)',
      '3. Fruity Limiter (Sidechain Ducking com o Vocal Lead)',
      '4. Fruity Delay 3 (Ping-Pong 1/4)',
      '5. Fruity Reeverb 2 (Large Hall com 35% Wet)'
    ],
    s1NativeChain: [
      '1. PreSonus Pro EQ³ (HPF 200Hz)',
      '2. PreSonus Binaural Pan (Abertura 150% estéreo)',
      '3. PreSonus Compressor (Sidechain acionado pela voz)',
      '4. PreSonus OpenAIR'
    ],
    wavesChain: [
      '1. Waves S1 Stereo Imager (Alargamento amplo)',
      '2. Waves SSL G-Master',
      '3. Waves H-Delay e Renaissance Reverb'
    ],
    fabfilterChain: [
      '1. FabFilter Pro-Q 3 (Mid/Side EQ com corte central em 3kHz)',
      '2. FabFilter Saturn 2 (Tape Saturation estéreo)',
      '3. FabFilter Timeless 3 e Pro-R 2'
    ],
    hybridProChain: [
      '1. Oeksound Soothe2 com Sidechain vocal ativado',
      '2. Soundtoys MicroShift e PanMan',
      '3. Valhalla Supermassive (Preset "Hydra" ou "Centaurus")',
      '4. Slate Digital Fresh Air'
    ],
    expertTips: [
      'Pads podem ser colocados 100% nas laterais com processamento Mid/Side: retire o centro mono e deixe o pad abraçar o vocal por trás.',
      'Automatize o filtro passa-baixa (LPF) do pad abrindo gradualmente durante os momentos de subida (build-up).'
    ]
  },
  {
    id: 'drum-bus',
    name: 'Drum Bus / Bateria Completa (Cola & Punch)',
    category: 'DRUMS',
    mixTarget: 'INSTRUMENTAL',
    subCategory: 'Mix Bus',
    description: 'O canal de grupo que reúne Kick, Snare, Hi-Hats, Percussões e Claps. Onde os tambores são colados em um único instrumento coeso e potente.',
    freqFocus: {
      cut: 'HPF a 25Hz para eliminar sub-infrassom',
      body: '60Hz (peso de sub) e 200Hz (corpo de caixa)',
      presence: '3kHz - 5kHz (pegada e estalo de conjunto)',
      airOrPunch: '10kHz - 14kHz (ar e brilho dos pratos)'
    },
    compressionSettings: {
      ratio: '2:1 a 4:1 (Compressão Glue estilo SSL VCA)',
      attack: '30ms (lento para não engolir o ataque do kick e snare)',
      release: 'Auto ou 100ms',
      gainReduction: '2dB a 4dB de redução no ritmo da batida'
    },
    stereoPlacement: 'Estéreo Estreito',
    saturationRec: 'MÉDIA',
    flPluginChain: [
      '1. Fruity Parametric EQ 2 (Corte HPF 25Hz)',
      '2. Fruity Soft Clipper (Arredonda os picos dos kicks e snares para dar volume)',
      '3. Fruity Limiter - Aba COMP (Ratio 3:1, Attack 30ms, Release 90ms)',
      '4. Maximus (Banda Low em Mono abaixo de 100Hz)'
    ],
    s1NativeChain: [
      '1. PreSonus Pro EQ³ (HPF 28Hz)',
      '2. PreSonus Tricomp (Saturação e compressão multibanda)',
      '3. PreSonus Fat Channel XT (Modo VCA Bus Compressor)'
    ],
    wavesChain: [
      '1. Waves SSL G-Master Buss Compressor (Ratio 4:1, Attack 30ms, Release Auto, 3dB GR)',
      '2. Waves Smack Attack (Ajuste global de punch)',
      '3. Waves PuigTec EQP-1A (+1.5dB em 60Hz e 12kHz)'
    ],
    fabfilterChain: [
      '1. FabFilter Pro-C 2 (Estilo "Bus" ou "Punch", Ratio 3:1, Attack 30ms)',
      '2. FabFilter Saturn 2 (Gentle Saturation 10% para amarrar os tambores)',
      '3. FabFilter Pro-Q 3 (Mono Maker nos graves abaixo de 100Hz)'
    ],
    hybridProChain: [
      '1. Universal Audio SSL 4000 G-Bus Compressor',
      '2. Soundtoys Decapitator (Style A ou E em modo suave)',
      '3. Sir Audio StandardCLIP (Ceifamento transparente de picos)',
      '4. FabFilter Pro-MB (Controle dinâmico de graves)'
    ],
    expertTips: [
      'Use a técnica de Compressão Paralela (New York Compression): duplique o Drum Bus, comprima a cópia agressivamente (10dB+ de redução) e misture 20% dessa cópia esmagada com a bateria original limpa. O resultado é punch e corpo descomunais.'
    ]
  },
  {
    id: 'music-bus',
    name: 'Instrument Bus (Harmonia / Beat sem Bateria)',
    category: 'INSTRUMENTOS',
    mixTarget: 'INSTRUMENTAL',
    subCategory: 'Mix Bus',
    description: 'O canal que reúne todos os instrumentos harmônicos (Pianos, Guitarras, Synths, Cordas e FX). Onde é esculpida a "cama" harmônica perfeita.',
    freqFocus: {
      cut: 'HPF a 100Hz para garantir que todo o grave pertença ao Kick e Baixo',
      body: '250Hz - 400Hz (de-mudding coletivo)',
      presence: '2.5kHz - 4.5kHz (corte cirúrgico suave para o vocal sentar perfeitamente)',
      airOrPunch: '10kHz+ (abertura estéreo aveludada)'
    },
    compressionSettings: {
      ratio: '1.5:1 a 2:1',
      attack: '30ms',
      release: 'Auto',
      gainReduction: '1dB a 2dB'
    },
    stereoPlacement: 'Estéreo Largo',
    sidechainTip: 'Sidechain Dinâmico com o Vocal Lead: atenue 1.5dB a 2.5dB na faixa de 1kHz a 4kHz apenas enquanto o vocal estiver cantando.',
    saturationRec: 'SUAVE',
    flPluginChain: [
      '1. Fruity Parametric EQ 2 (HPF 100Hz + Corte suave de -2dB em 3kHz)',
      '2. Fruity Stereo Shaper (Abertura estéreo do arranjo)',
      '3. Fruity Limiter (Compressão suave de cola)'
    ],
    s1NativeChain: [
      '1. PreSonus Pro EQ³ (Mid/Side EQ com corte no centro)',
      '2. PreSonus Fat Channel XT',
      '3. PreSonus Binaural Pan'
    ],
    wavesChain: [
      '1. Waves SSL G-Master (Ratio 2:1, 1.5dB GR)',
      '2. Waves PuigTec EQP-1A (+1dB em 16kHz)',
      '3. Waves S1 Stereo Imager'
    ],
    fabfilterChain: [
      '1. FabFilter Pro-Q 3 (Mid/Side EQ + Dynamic EQ com Sidechain acionado pelo Vocal)',
      '2. FabFilter Pro-C 2 (Estilo "Bus")',
      '3. FabFilter Saturn 2 (Gentle Tube)'
    ],
    hybridProChain: [
      '1. Oeksound Soothe2 (Sidechain dinâmico com o vocal: abre espaço automático para a voz)',
      '2. Universal Audio Neve 33609 Compressor',
      '3. Slate Digital Fresh Air (High Air em 6%)'
    ],
    expertTips: [
      'Se a voz não estiver se destacando na música, NÃO aumente o volume da voz; diminua 1.5dB em 3kHz no Instrument Bus com um EQ Mid/Side. O arranjo se abrirá instantaneamente como mágica.'
    ]
  }
];
