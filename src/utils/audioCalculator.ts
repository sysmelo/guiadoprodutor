// Audio Engineering Formulas & Utility Calculations for FL Studio Producers

export interface DelayTiming {
  name: string;
  fraction: string;
  normalMs: number;
  dottedMs: number;
  tripletMs: number;
}

export function calculateDelayTimes(bpm: number): DelayTiming[] {
  const safeBpm = Math.max(20, Math.min(300, bpm || 120));
  const quarterNoteMs = (60000 / safeBpm); // 1/4 note in ms

  return [
    {
      name: 'Semibreve (1 bar)',
      fraction: '1/1',
      normalMs: Math.round(quarterNoteMs * 4),
      dottedMs: Math.round(quarterNoteMs * 4 * 1.5),
      tripletMs: Math.round((quarterNoteMs * 4 * 2) / 3)
    },
    {
      name: 'Mínima (Half Note)',
      fraction: '1/2',
      normalMs: Math.round(quarterNoteMs * 2),
      dottedMs: Math.round(quarterNoteMs * 2 * 1.5),
      tripletMs: Math.round((quarterNoteMs * 2 * 2) / 3)
    },
    {
      name: 'Semínima (Quarter Note)',
      fraction: '1/4',
      normalMs: Math.round(quarterNoteMs),
      dottedMs: Math.round(quarterNoteMs * 1.5),
      tripletMs: Math.round((quarterNoteMs * 2) / 3)
    },
    {
      name: 'Colcheia (Eighth Note)',
      fraction: '1/8',
      normalMs: Math.round(quarterNoteMs / 2),
      dottedMs: Math.round((quarterNoteMs / 2) * 1.5),
      tripletMs: Math.round((quarterNoteMs / 2 * 2) / 3)
    },
    {
      name: 'Semicolcheia (Sixteenth)',
      fraction: '1/16',
      normalMs: Math.round(quarterNoteMs / 4),
      dottedMs: Math.round((quarterNoteMs / 4) * 1.5),
      tripletMs: Math.round((quarterNoteMs / 4 * 2) / 3)
    },
    {
      name: 'Fusa (Thirty-Second)',
      fraction: '1/32',
      normalMs: Math.round(quarterNoteMs / 8),
      dottedMs: Math.round((quarterNoteMs / 8) * 1.5),
      tripletMs: Math.round((quarterNoteMs / 8 * 2) / 3)
    }
  ];
}

export function calculateReverbSettings(bpm: number) {
  const safeBpm = Math.max(20, Math.min(300, bpm || 120));
  const quarterNoteMs = (60000 / safeBpm);

  return {
    preDelayTightMs: Math.round(quarterNoteMs / 16), // 1/64 note predelay ~ 15-30ms
    preDelayWideMs: Math.round(quarterNoteMs / 8),  // 1/32 note predelay ~ 30-60ms
    decayShortSec: Number(((quarterNoteMs * 2) / 1000).toFixed(2)), // 1/2 note decay
    decayMediumSec: Number(((quarterNoteMs * 4) / 1000).toFixed(2)), // 1 bar decay
    decayLongSec: Number(((quarterNoteMs * 8) / 1000).toFixed(2)) // 2 bars decay
  };
}

// LocalStorage helpers for Projects
const STORAGE_KEY = 'melo_mix_master_projects_v3';
const ACTIVE_PROJECT_KEY = 'melo_mix_master_active_project';

export const defaultDemoProjects = [
  {
    id: 'proj-1',
    name: 'Sabor de Luanda',
    artist: 'Melo & Banda',
    genre: 'Afrobeat',
    bpm: 104,
    key: 'F# Menor',
    date: '2026-08-28',
    deadline: '2026-09-02',
    priority: 'Alta' as const,
    processLevel: 'Nível 2: Mixagem' as const,
    status: 'Em Mixagem' as const,
    notes: 'Vocal feminino gravado com microfone condensador. Necessita de-essing em 6.5kHz e corte de boxiness em 320Hz. Bateria com percussões ricas.',
    checklist: {
      'chk-prep-1': true,
      'chk-prep-2': true,
      'chk-prep-3': true,
      'chk-prep-4': false,
      'chk-prep-5': false,
      'chk-prep-6': false,
      'chk-prep-7': false,
      'chk-prep-8': false
    },
    mixProgress: 45,
    masterChecklist: {
      'chk-1': false,
      'chk-2': false
    },
    exportNotes: 'Exportar versão com -14 LUFS para Spotify e versão sem limiter para o DJ.',
    referenceTracks: 'Burna Boy - Last Last / Wizkid - Essence',
    clientContact: 'melo.banda@studio.com'
  },
  {
    id: 'proj-2',
    name: 'Noite Urbana',
    artist: 'K-Trap & Young Driller',
    genre: 'Trap',
    bpm: 142,
    key: 'C Menor',
    date: '2026-08-25',
    deadline: '2026-08-31',
    priority: 'Urgente' as const,
    processLevel: 'Nível 3: Masterização' as const,
    status: 'Em Master' as const,
    notes: '808 pesado com distorção de harmônicos. Vocal com autotune moderno e delay 1/8 dotted ducking. Masterizar a -8.5 LUFS para clubes.',
    checklist: {
      'chk-prep-1': true,
      'chk-prep-2': true,
      'chk-prep-3': true,
      'chk-prep-4': true,
      'chk-prep-5': true,
      'chk-prep-6': true,
      'chk-prep-7': true,
      'chk-prep-8': true
    },
    mixProgress: 100,
    masterChecklist: {
      'chk-1': true,
      'chk-2': true,
      'chk-3': true,
      'chk-4': false,
      'chk-5': false
    },
    exportNotes: 'Entregar Master WAV 24bit e Instrumental para show.',
    referenceTracks: 'Travis Scott - FE!N / Gunna - fukumean',
    clientContact: '+244 923 000 111'
  },
  {
    id: 'proj-3',
    name: 'Coração em Chamas',
    artist: 'Sara Lima',
    genre: 'R&B Contemporâneo',
    bpm: 92,
    key: 'A Menor',
    date: '2026-08-29',
    deadline: '2026-09-08',
    priority: 'Normal' as const,
    processLevel: 'Nível 1: Gravação / Pré-Mix' as const,
    status: 'Em Mixagem' as const,
    notes: 'Sessão de tracking vocal inicial. Gravar Lead, dobras em L/R e adlibs com Reverb de conforto. Buffer ajustado em 128 samples.',
    checklist: {
      'chk-prep-1': true,
      'chk-prep-2': true,
      'chk-prep-3': false
    },
    mixProgress: 15,
    masterChecklist: {},
    exportNotes: 'Versão Acústica e Versão Completa para streaming.',
    referenceTracks: 'SZA - Kill Bill / H.E.R.'
  },
  {
    id: 'proj-4',
    name: 'Vencedor do Amanhã',
    artist: 'Coral Graça & Luz',
    genre: 'Gospel',
    bpm: 78,
    key: 'G Maior',
    date: '2026-08-20',
    deadline: '2026-08-28',
    priority: 'Urgente' as const,
    processLevel: 'Nível 4: Finalização / Entrega' as const,
    status: 'Finalizado' as const,
    notes: 'Mixagem com 32 vozes de coral, piano de cauda e bateria acústica. Aprovado pelo cliente.',
    checklist: {
      'chk-prep-1': true,
      'chk-prep-2': true,
      'chk-prep-3': true,
      'chk-prep-4': true,
      'chk-prep-5': true
    },
    mixProgress: 100,
    masterChecklist: {
      'chk-1': true,
      'chk-2': true,
      'chk-3': true,
      'chk-4': true,
      'chk-5': true
    },
    exportNotes: 'Entregue em WAV 24bit/48kHz e MP3 320kbps com Stems separados.',
    referenceTracks: 'Tasha Cobbs / Maverick City Music'
  }
];

export interface ProjectDeadlineStatus {
  daysRemaining: number;
  label: string;
  badgeColor: string;
  isOverdue: boolean;
  isUrgent: boolean;
  isToday: boolean;
}

export function getProjectDeadlineStatus(deadlineStr?: string, status?: string): ProjectDeadlineStatus {
  if (status === 'Finalizado') {
    return {
      daysRemaining: 0,
      label: 'Entregue',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      isOverdue: false,
      isUrgent: false,
      isToday: false
    };
  }

  if (!deadlineStr) {
    return {
      daysRemaining: 999,
      label: 'Sem Prazo',
      badgeColor: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      isOverdue: false,
      isUrgent: false,
      isToday: false
    };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadline = new Date(deadlineStr);
  deadline.setHours(0, 0, 0, 0);

  const diffTime = deadline.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    const daysLate = Math.abs(diffDays);
    return {
      daysRemaining: diffDays,
      label: `Atrasado há ${daysLate} ${daysLate === 1 ? 'dia' : 'dias'}!`,
      badgeColor: 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse font-bold',
      isOverdue: true,
      isUrgent: true,
      isToday: false
    };
  }

  if (diffDays === 0) {
    return {
      daysRemaining: 0,
      label: 'Entrega HOJE!',
      badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/40 font-extrabold animate-pulse',
      isOverdue: false,
      isUrgent: true,
      isToday: true
    };
  }

  if (diffDays <= 2) {
    return {
      daysRemaining: diffDays,
      label: `Faltam ${diffDays} ${diffDays === 1 ? 'dia' : 'dias'}`,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30 font-bold',
      isOverdue: false,
      isUrgent: true,
      isToday: false
    };
  }

  return {
    daysRemaining: diffDays,
    label: `${diffDays} dias restantes`,
    badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
    isOverdue: false,
    isUrgent: false,
    isToday: false
  };
}

export function getSavedProjects() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultDemoProjects));
      return defaultDemoProjects;
    }
    return JSON.parse(data);
  } catch {
    return defaultDemoProjects;
  }
}

export function saveProjects(projects: unknown) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (err) {
    console.error('Failed to save projects to localStorage:', err);
  }
}

export function getActiveProjectId(): string {
  try {
    return localStorage.getItem(ACTIVE_PROJECT_KEY) || 'proj-1';
  } catch {
    return 'proj-1';
  }
}

export function setActiveProjectId(id: string) {
  try {
    localStorage.setItem(ACTIVE_PROJECT_KEY, id);
  } catch (err) {
    console.error('Failed to set active project id:', err);
  }
}
