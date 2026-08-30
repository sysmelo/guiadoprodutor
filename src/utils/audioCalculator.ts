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
const STORAGE_KEY = 'melo_mix_master_projects_v2';
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
    mixProgress: 38,
    masterChecklist: {
      'chk-1': true,
      'chk-2': false
    },
    exportNotes: 'Exportar versão com -14 LUFS para Spotify e versão sem limiter para o DJ.',
    referenceTracks: 'Burna Boy - Last Last / Wizkid - Essence'
  },
  {
    id: 'proj-2',
    name: 'Noite Urbana',
    artist: 'K-Trap & Young Driller',
    genre: 'Trap',
    bpm: 142,
    key: 'C Menor',
    date: '2026-08-25',
    status: 'Em Master' as const,
    notes: '808 pesado com distorção de harmônicos. Vocal com autotune moderno e delay 1/8 dotted ducking.',
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
      'chk-4': true,
      'chk-5': true
    },
    exportNotes: 'Entregar Master WAV 24bit e Instrumental para show.',
    referenceTracks: 'Travis Scott - FE!N / Gunna - fukumean'
  }
];

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
