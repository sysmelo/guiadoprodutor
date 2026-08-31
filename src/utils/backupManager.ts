import { Project, GenreChain } from '../types';
import { getSavedProjects, saveProjects, getActiveProjectId, setActiveProjectId, defaultDemoProjects } from './audioCalculator';
import { getCustomGenres } from './genresManager';

export interface MeloStudioBackup {
  schemaVersion: string;
  exportedAt: string;
  appName: string;
  deviceInfo?: string;
  stats: {
    totalProjects: number;
    totalCustomGenres: number;
  };
  projects: Project[];
  customGenres: GenreChain[];
  activeProjectId: string;
}

export interface LocalSnapshot {
  id: string;
  createdAt: string;
  name: string;
  totalProjects: number;
  data: MeloStudioBackup;
}

const SNAPSHOTS_KEY = 'melo_studio_local_snapshots_v1';
const CUSTOM_GENRES_KEY = 'melo_mix_custom_genres_v1';

export function createBackupPayload(): MeloStudioBackup {
  const projects = getSavedProjects();
  const customGenres = getCustomGenres();
  const activeProjectId = getActiveProjectId();

  return {
    schemaVersion: '1.2.0',
    exportedAt: new Date().toISOString(),
    appName: 'Melo Mix & Master Assistant - Studio One 7 & FL Studio Edition',
    stats: {
      totalProjects: projects.length,
      totalCustomGenres: customGenres.length,
    },
    projects,
    customGenres,
    activeProjectId,
  };
}

/**
 * Trigger browser file download with complete studio backup JSON
 */
export function downloadBackupFile(customName?: string) {
  const payload = createBackupPayload();
  const dateStr = new Date().toISOString().slice(0, 10);
  const fileName = customName || `melo_studio_backup_${dateStr}.json`;
  
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export a single project to a portable .meloproj JSON file
 */
export function downloadSingleProjectFile(project: Project) {
  const sanitizedName = project.name.toLowerCase().replace(/[^a-z0-9_-]/g, '_');
  const fileName = `melo_projeto_${sanitizedName}_${project.bpm}bpm.json`;
  
  const payload = {
    schemaVersion: '1.2.0',
    type: 'MELO_SINGLE_PROJECT',
    exportedAt: new Date().toISOString(),
    project,
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Validates a backup JSON string or object
 */
export function validateBackupContent(rawText: string): { 
  valid: boolean; 
  error?: string; 
  data?: MeloStudioBackup; 
  singleProject?: Project 
} {
  try {
    const parsed = JSON.parse(rawText);

    if (parsed.type === 'MELO_SINGLE_PROJECT' && parsed.project && parsed.project.id && parsed.project.name) {
      return { valid: true, singleProject: parsed.project };
    }

    // Check if standard full backup
    if (parsed && Array.isArray(parsed.projects)) {
      return {
        valid: true,
        data: {
          schemaVersion: parsed.schemaVersion || '1.0.0',
          exportedAt: parsed.exportedAt || new Date().toISOString(),
          appName: parsed.appName || 'Melo Assistant',
          stats: {
            totalProjects: parsed.projects.length,
            totalCustomGenres: Array.isArray(parsed.customGenres) ? parsed.customGenres.length : 0,
          },
          projects: parsed.projects,
          customGenres: Array.isArray(parsed.customGenres) ? parsed.customGenres : [],
          activeProjectId: parsed.activeProjectId || (parsed.projects[0]?.id || 'proj-1'),
        }
      };
    }

    // Fallback: maybe it's just an array of projects
    if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].name && parsed[0].id) {
      return {
        valid: true,
        data: {
          schemaVersion: '1.0.0',
          exportedAt: new Date().toISOString(),
          appName: 'Melo Assistant',
          stats: { totalProjects: parsed.length, totalCustomGenres: 0 },
          projects: parsed,
          customGenres: [],
          activeProjectId: parsed[0].id,
        }
      };
    }

    return { valid: false, error: 'O arquivo selecionado não contém um formato de backup válido do Melo Assistant.' };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Erro ao processar JSON';
    return { valid: false, error: `Arquivo corrompido ou inválido: ${errorMsg}` };
  }
}

/**
 * Restores full backup into local storage
 */
export function restoreBackup(
  backup: MeloStudioBackup, 
  mode: 'replace' | 'merge' = 'replace'
): { success: boolean; message: string; projectsCount: number } {
  try {
    // Auto-create an emergency restore snapshot before replacing
    createLocalSnapshot(`Auto-backup antes de restaurar (${new Date().toLocaleTimeString()})`);

    let finalProjects: Project[] = [];
    if (mode === 'replace') {
      finalProjects = backup.projects;
    } else {
      const existing = getSavedProjects();
      const existingIds = new Set(existing.map((p: Project) => p.id));
      const newOnly = backup.projects.filter((p: Project) => !existingIds.has(p.id));
      finalProjects = [...newOnly, ...existing];
    }

    saveProjects(finalProjects);

    // Restore custom genres if present
    if (Array.isArray(backup.customGenres) && backup.customGenres.length > 0) {
      try {
        localStorage.setItem(CUSTOM_GENRES_KEY, JSON.stringify(backup.customGenres));
      } catch (err) {
        console.error('Failed to restore custom genres:', err);
      }
    }

    if (backup.activeProjectId) {
      setActiveProjectId(backup.activeProjectId);
    } else if (finalProjects.length > 0) {
      setActiveProjectId(finalProjects[0].id);
    }

    return {
      success: true,
      message: `Restauração concluída com sucesso! ${finalProjects.length} projeto(s) disponíveis no estúdio.`,
      projectsCount: finalProjects.length
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Erro desconhecido';
    return {
      success: false,
      message: `Falha ao restaurar backup: ${errorMsg}`,
      projectsCount: 0
    };
  }
}

/**
 * Snapshots Management (In-Browser Restore Points)
 */
export function getLocalSnapshots(): LocalSnapshot[] {
  try {
    const raw = localStorage.getItem(SNAPSHOTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function createLocalSnapshot(customName?: string): LocalSnapshot {
  const existing = getLocalSnapshots();
  const payload = createBackupPayload();
  
  const newSnapshot: LocalSnapshot = {
    id: `snap-${Date.now()}`,
    createdAt: new Date().toISOString(),
    name: customName || `Ponto de Restauração (${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`,
    totalProjects: payload.projects.length,
    data: payload
  };

  // Keep last 10 snapshots to prevent storage bloat
  const updated = [newSnapshot, ...existing].slice(0, 10);
  try {
    localStorage.setItem(SNAPSHOTS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save snapshot:', err);
  }

  return newSnapshot;
}

export function restoreLocalSnapshot(snapshotId: string): boolean {
  const snapshots = getLocalSnapshots();
  const target = snapshots.find(s => s.id === snapshotId);
  if (!target) return false;

  const result = restoreBackup(target.data, 'replace');
  return result.success;
}

export function deleteLocalSnapshot(snapshotId: string): LocalSnapshot[] {
  const snapshots = getLocalSnapshots();
  const updated = snapshots.filter(s => s.id !== snapshotId);
  try {
    localStorage.setItem(SNAPSHOTS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to delete snapshot:', err);
  }
  return updated;
}
