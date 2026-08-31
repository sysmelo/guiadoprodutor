export type NavigationTab = 
  | 'dashboard'
  | 'studio_one'
  | 'recording_schedule'
  | 'vocal_recording'
  | 'mix'
  | 'vocal_cleaning'
  | 'instruments'
  | 'genres'
  | 'master'
  | 'plugins'
  | 'mix_doctor'
  | 'export'
  | 'projects'
  | 'settings';

export type ProjectStatus = 'Em Mixagem' | 'Em Revisão' | 'Em Master' | 'Finalizado';

export type ProcessLevel = 
  | 'Nível 1: Gravação / Pré-Mix'
  | 'Nível 2: Mixagem'
  | 'Nível 3: Masterização'
  | 'Nível 4: Finalização / Entrega';

export type ProjectPriority = 'Baixa' | 'Normal' | 'Alta' | 'Urgente';

export type InstrumentalStatus = 'Em Criação' | 'Beat Pronto' | 'Aprovado pelo Artista' | 'Stems Exportados';
export type RecordingSessionStatus = 'Agendado' | 'Confirmado' | 'Gravando Hoje' | 'Concluído' | 'Remarcado' | 'Cancelado';

export interface Project {
  id: string;
  name: string;
  artist: string;
  genre: string;
  bpm: number;
  key: string;
  date: string;
  deadline?: string; // YYYY-MM-DD
  priority?: ProjectPriority;
  processLevel?: ProcessLevel;
  status: ProjectStatus;
  notes: string;
  checklist: {
    [key: string]: boolean;
  };
  mixProgress: number; // 0-100%
  masterChecklist: {
    [key: string]: boolean;
  };
  exportNotes?: string;
  referenceTracks?: string;
  clientContact?: string;
  deliveryFormat?: string;
  
  // Pipeline Beat -> Gravação
  instrumentalDate?: string; // Data da criação do instrumental (YYYY-MM-DD)
  instrumentalStatus?: InstrumentalStatus;
  recordingDate?: string; // Data da gravação agendada (YYYY-MM-DD)
  recordingTime?: string; // Horário de início (HH:mm)
  recordingEndTime?: string; // Horário de término (HH:mm)
  recordingStatus?: RecordingSessionStatus;
  recordingMic?: string;
  recordingRoom?: string;
  recordingEngineer?: string;
  recordingType?: string;
  recordingNotes?: string;
}

export interface RecordingScheduleItem {
  id: string;
  projectId?: string;
  projectName: string;
  artist: string;
  genre: string;
  bpm: number;
  key: string;
  instrumentalDate: string;
  instrumentalStatus: InstrumentalStatus;
  recordingDate: string;
  recordingTime: string;
  recordingEndTime?: string;
  recordingStatus: RecordingSessionStatus;
  micAndPreamp?: string;
  studioRoom?: string;
  engineer?: string;
  sessionType?: string;
  clientContact?: string;
  checklist?: {
    [key: string]: boolean;
  };
  notes?: string;
}

export type PluginType = 'FL Native' | 'FabFilter' | 'Free External' | 'Other External';
export type PluginEcosystem = PluginType;
export type PluginCategory = 'Equalizador' | 'Compressor' | 'De-Esser' | 'Saturação / Distorção' | 'Reverb & Espaço' | 'Delay' | 'Limiter & Clipper' | 'Analisador & Medição' | 'Stereo & Utility';

export interface AudioPlugin {
  id: string;
  name: string;
  type: PluginType;
  category: PluginCategory;
  level: 'Mix' | 'Master' | 'Mix & Master' | 'Bus & Send';
  suggestedPosition: number;
  description: string;
  functions: string[];
  suggestedParams: string[];
  problemsSolved: string[];
  tips: string[];
  warnings: string[];
  externalUrl?: string;
  isFree?: boolean;
}

export interface VocalProblem {
  id: string;
  title: string;
  iconName: string;
  frequencyFocus: string;
  description: string;
  rootCauses: string[];
  flNativeChain: {
    position: number;
    pluginName: string;
    action: string;
    suggestedParams: string;
    tip: string;
  }[];
  externalChainAlternative: string[];
  dos: string[];
  donts: string[];
}

export type GenreMode = 'CLEAN' | 'MODERN' | 'AGGRESSIVE';

export interface GenreChain {
  id: string;
  name: string;
  origin: string;
  bpmRange: string;
  modes: {
    [key in GenreMode]: {
      description: string;
      vocalChain: { position: number; plugin: string; action: string; params?: string }[];
      drumsChain: { element: string; plugin: string; action: string }[];
      bassChain: { element: string; plugin: string; action: string }[];
      masterChain: { position: number; plugin: string; action: string }[];
      mixSecret: string;
    };
  };
  keyAdvice: string[];
}

export type InstrumentCategory = 'VOCAL' | 'DRUMS' | 'BAIXO' | 'INSTRUMENTOS';

export interface InstrumentGuide {
  id: string;
  name: string;
  category: InstrumentCategory;
  description?: string;
  freqFocus: {
    cut: string;
    body: string;
    presence: string;
    airOrPunch: string;
  };
  compressionSettings: {
    ratio: string;
    attack: string;
    release: string;
    gainReduction: string;
  };
  stereoPlacement: 'Mono (Centro)' | 'Estéreo Estreito' | 'Estéreo Largo' | 'Sides / Panning';
  sidechainTip?: string;
  saturationRec: 'OFF' | 'SUAVE' | 'MÉDIA' | 'FORTE';
  flPluginChain: string[];
  expertTips: string[];
}

export interface MixDoctorAlert {
  id: string;
  title: string;
  severity: 'warning' | 'critical' | 'info';
  freqRange: string;
  symptoms: string[];
  diagnosis: string;
  solutionSteps: string[];
  flPluginRecommended: string;
}

export interface ExportProfile {
  id: string;
  title: string;
  category: 'MASTER' | 'STREAMING' | 'CLIENTE';
  format: 'WAV' | 'MP3' | 'FLAC' | 'STEMS' | 'MULTI';
  targetLufs: string;
  truePeak: string;
  sampleRate: string;
  bitDepth: string;
  description: string;
  flStudioSettings: {
    resampling: string;
    dithering: string;
    hqPlugins: boolean;
    splitMixerTracks?: boolean;
  };
  notes: string[];
}

export interface RecordingPhaseStep {
  stepNumber: number;
  title: string;
  flShortcut?: string;
  action: string;
  detailedGuide: string[];
  flSettingsTip?: string;
  warning?: string;
}

export interface RecordingPhase {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  tagline: string;
  flMenuLocation: string;
  steps: RecordingPhaseStep[];
  proTips: string[];
  commonMistakes: string[];
}

