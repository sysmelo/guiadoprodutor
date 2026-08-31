import React, { useState, useRef } from 'react';
import { 
  Settings, 
  WifiOff, 
  Wifi,
  HardDrive, 
  Keyboard, 
  ShieldCheck, 
  RefreshCw, 
  Sparkles, 
  BookOpen, 
  AlertTriangle,
  Download,
  Upload,
  FileJson,
  CheckCircle2,
  Copy,
  Clock,
  Trash2,
  Laptop,
  FolderArchive,
  Layers,
  FileText,
  Music,
  Flame,
  HelpCircle,
  FolderDown,
  ArrowRight,
  Database,
  Globe,
  Monitor,
  Check,
  Zap
} from 'lucide-react';
import { Project } from '../types';
import { 
  downloadBackupFile, 
  exportAllProjectsToJson,
  validateBackupContent, 
  restoreBackup, 
  getLocalSnapshots, 
  createLocalSnapshot, 
  restoreLocalSnapshot, 
  deleteLocalSnapshot,
  LocalSnapshot 
} from '../utils/backupManager';
import { getSavedProjects } from '../utils/audioCalculator';
import { usePWA } from '../hooks/usePWA';

interface SettingsOfflineViewProps {
  onResetData: () => void;
  onProjectsUpdated?: (projects: Project[]) => void;
}

type SettingsSection = 'backup_export' | 'pwa_offline' | 'shortcuts_guide' | 'system_info';

export const SettingsOfflineView: React.FC<SettingsOfflineViewProps> = ({ onResetData, onProjectsUpdated }) => {
  const [activeSection, setActiveSection] = useState<SettingsSection>('backup_export');
  const { isOnline, isInstalled, swActive, canInstall, handleInstallApp } = usePWA();
  const [snapshots, setSnapshots] = useState<LocalSnapshot[]>(() => getLocalSnapshots());
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [isRawJsonModalOpen, setIsRawJsonModalOpen] = useState(false);
  const [rawJsonText, setRawJsonText] = useState('');
  const [restoreMode, setRestoreMode] = useState<'replace' | 'merge'>('replace');
  const [newSnapshotName, setNewSnapshotName] = useState('');
  const [isCreatingSnapshot, setIsCreatingSnapshot] = useState(false);
  const [copiedBackup, setCopiedBackup] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentProjects = getSavedProjects();

  const showStatus = (type: 'success' | 'error' | 'info', text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => {
      setStatusMessage(null);
    }, 6000);
  };

  const handleExportAllProjects = () => {
    try {
      const res = exportAllProjectsToJson();
      showStatus('success', `Exportação concluída! Arquivo "${res.fileName}" gerado com ${res.count} projeto(s). Guarde no seu pendrive ou nuvem para migração.`);
      setSnapshots(getLocalSnapshots());
    } catch {
      showStatus('error', 'Falha ao exportar projetos em JSON.');
    }
  };

  const handleDownloadFullBackup = () => {
    try {
      downloadBackupFile();
      showStatus('success', 'Backup total do estúdio (projetos + gêneros personalizados) exportado com sucesso!');
      setSnapshots(getLocalSnapshots());
    } catch {
      showStatus('error', 'Falha ao gerar arquivo de backup completo.');
    }
  };

  const processFileContent = (content: string) => {
    const validation = validateBackupContent(content);
    if (!validation.valid || (!validation.data && !validation.singleProject)) {
      showStatus('error', validation.error || 'Arquivo de backup inválido ou incompatível.');
      return;
    }

    if (validation.data) {
      const res = restoreBackup(validation.data, restoreMode);
      if (res.success) {
        showStatus('success', res.message);
        setSnapshots(getLocalSnapshots());
        if (onProjectsUpdated) {
          onProjectsUpdated(getSavedProjects());
        }
      } else {
        showStatus('error', res.message);
      }
    } else if (validation.singleProject) {
      const current = getSavedProjects();
      const updated = [validation.singleProject, ...current.filter((p: Project) => p.id !== validation.singleProject!.id)];
      restoreBackup({
        schemaVersion: '1.2.0',
        exportedAt: new Date().toISOString(),
        appName: 'Melo Assistant',
        stats: { totalProjects: updated.length, totalCustomGenres: 0 },
        projects: updated,
        customGenres: [],
        activeProjectId: validation.singleProject.id
      }, 'replace');
      showStatus('success', `Projeto individual "${validation.singleProject.name}" importado com sucesso!`);
      setSnapshots(getLocalSnapshots());
      if (onProjectsUpdated) {
        onProjectsUpdated(getSavedProjects());
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (!content) {
        showStatus('error', 'O arquivo selecionado está vazio.');
        return;
      }
      processFileContent(content);
    };
    reader.readAsText(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) processFileContent(content);
    };
    reader.readAsText(file);
  };

  const handleCreateSnapshot = (e: React.FormEvent) => {
    e.preventDefault();
    const snap = createLocalSnapshot(newSnapshotName.trim() || undefined);
    setSnapshots(getLocalSnapshots());
    setNewSnapshotName('');
    setIsCreatingSnapshot(false);
    showStatus('success', `Ponto de restauração "${snap.name}" gravado no navegador!`);
  };

  const handleRestoreSnapshot = (id: string, name: string) => {
    if (window.confirm(`Deseja restaurar o ponto "${name}"? Os projetos atuais serão revertidos para a versão salva nesse momento.`)) {
      const ok = restoreLocalSnapshot(id);
      if (ok) {
        showStatus('success', `Ponto "${name}" restaurado com sucesso!`);
        setSnapshots(getLocalSnapshots());
        if (onProjectsUpdated) {
          onProjectsUpdated(getSavedProjects());
        }
      } else {
        showStatus('error', 'Não foi possível restaurar esse ponto.');
      }
    }
  };

  const handleDeleteSnapshot = (id: string) => {
    const updated = deleteLocalSnapshot(id);
    setSnapshots(updated);
    showStatus('info', 'Ponto de restauração removido.');
  };

  const handleCopyRawBackup = () => {
    try {
      const data = {
        type: 'MELO_ALL_PROJECTS_BACKUP',
        exportedAt: new Date().toISOString(),
        projects: getSavedProjects()
      };
      navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      setCopiedBackup(true);
      setTimeout(() => setCopiedBackup(false), 3000);
      showStatus('success', 'Código JSON de todos os projetos copiado para a área de transferência!');
    } catch {
      showStatus('error', 'Falha ao copiar dados para a área de transferência.');
    }
  };

  const handleApplyRawJson = () => {
    if (!rawJsonText.trim()) return;
    const validation = validateBackupContent(rawJsonText);
    if (!validation.valid || !validation.data) {
      showStatus('error', validation.error || 'Código JSON inválido.');
      return;
    }

    const res = restoreBackup(validation.data, restoreMode);
    if (res.success) {
      showStatus('success', res.message);
      setSnapshots(getLocalSnapshots());
      setIsRawJsonModalOpen(false);
      setRawJsonText('');
      if (onProjectsUpdated) {
        onProjectsUpdated(getSavedProjects());
      }
    } else {
      showStatus('error', res.message);
    }
  };

  const flShortcuts = [
    { key: 'F9', action: 'Abrir / Fechar Mixer' },
    { key: 'F5', action: 'Abrir / Fechar Playlist' },
    { key: 'F6', action: 'Abrir / Fechar Channel Rack' },
    { key: 'Ctrl + R', action: 'Exportar Áudio WAV direto' },
    { key: 'Ctrl + Shift + R', action: 'Exportar Áudio MP3' },
    { key: 'Ctrl + L', action: 'Roteia canal selecionado para o Mixer' },
    { key: 'Alt + S', action: 'Strumizer no Piano Roll' },
    { key: 'S', action: 'Ferramenta Slip na Playlist' },
    { key: 'C', action: 'Ferramenta Cut (Corte de áudio)' },
    { key: 'Mute/Solo', action: 'Clique direito na luz do canal isola sinal' }
  ];

  const s1Shortcuts = [
    { key: 'F3', action: 'Abrir Console / Mixer' },
    { key: 'F4', action: 'Abrir Painel Inspector de Pistas' },
    { key: 'F5', action: 'Abrir Navegador de Arquivos & Plugins' },
    { key: 'D', action: 'Duplicar Evento / Pista de Áudio' },
    { key: 'Ctrl + B', action: 'Exportar Mixdown (Bounce)' },
    { key: 'Alt + Click', action: 'Resetar fader ou knob para 0.0 dB' },
    { key: 'Shift + T', action: 'Adicionar nova Pista de Áudio' },
    { key: 'T', action: 'Criar Pista de Instrumento / MIDI' },
    { key: 'Z', action: 'Alternar Zoom Horizontal' },
    { key: 'Space', action: 'Play / Pause com retorno ao cursor' }
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Top Banner - Clean & Uncluttered */}
      <div className="rounded-2xl bg-gradient-to-r from-[#12161D] via-[#161B24] to-[#12161D] border border-[#242A34] p-5 md:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-lime-500/15 text-lime-400 border border-lime-500/30 text-[11px] font-extrabold tracking-wide">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% OFFLINE • ARQUITETURA LOCAL SEGURA</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
            Central de Backup, Exportação JSON & Configurações
          </h1>
          <p className="text-xs text-gray-400 max-w-2xl leading-relaxed">
            Exporte todos os seus projetos para migrar de computador, salvar em pendrive ou criar cópias de segurança instantâneas sem depender de internet.
          </p>
        </div>

        {/* Studio Stats Summary */}
        <div className="flex items-center gap-2 bg-[#0B0E11] p-2.5 rounded-xl border border-[#242A34] shrink-0">
          <div className="px-3 py-1.5 rounded-lg bg-[#15191E] text-center border border-[#1E242E]">
            <span className="text-xs font-mono font-bold text-cyan-400 block">{currentProjects.length}</span>
            <span className="text-[9px] text-gray-500 uppercase font-bold">Projetos</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-[#15191E] text-center border border-[#1E242E]">
            <span className="text-xs font-mono font-bold text-lime-400 block">{snapshots.length}</span>
            <span className="text-[9px] text-gray-500 uppercase font-bold">Snapshots</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-[#15191E] text-center border border-[#1E242E]">
            <span className="text-xs font-mono font-bold text-emerald-400 block">0ms</span>
            <span className="text-[9px] text-gray-500 uppercase font-bold">Cloud Lag</span>
          </div>
        </div>
      </div>

      {/* Global Status Message Toast */}
      {statusMessage && (
        <div className={`p-4 rounded-xl border text-xs font-bold flex items-center justify-between gap-3 shadow-lg animate-in fade-in ${
          statusMessage.type === 'success' 
            ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300' 
            : statusMessage.type === 'error'
            ? 'bg-red-500/15 border-red-500/50 text-red-300'
            : 'bg-cyan-500/15 border-cyan-500/50 text-cyan-300'
        }`}>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{statusMessage.text}</span>
          </div>
          <button 
            onClick={() => setStatusMessage(null)}
            className="text-[10px] underline hover:opacity-75 cursor-pointer"
          >
            Dispensar
          </button>
        </div>
      )}

      {/* Navigation Segment Tabs */}
      <div className="flex items-center gap-2 border-b border-[#242A34] pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveSection('backup_export')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeSection === 'backup_export'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
              : 'text-gray-400 hover:text-gray-200 hover:bg-[#15191E]'
          }`}
        >
          <FolderArchive className="w-4 h-4 text-cyan-400" />
          <span>Exportar & Migrar Projetos (JSON)</span>
          <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-1.5 py-0.2 rounded font-bold">
            {currentProjects.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSection('pwa_offline')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeSection === 'pwa_offline'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
              : 'text-gray-400 hover:text-gray-200 hover:bg-[#15191E]'
          }`}
        >
          <Monitor className="w-4 h-4 text-emerald-400" />
          <span>Modo Offline PWA & Netlify</span>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-bold">
            {isOnline ? 'ONLINE' : 'OFFLINE'}
          </span>
        </button>

        <button
          onClick={() => setActiveSection('shortcuts_guide')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeSection === 'shortcuts_guide'
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
              : 'text-gray-400 hover:text-gray-200 hover:bg-[#15191E]'
          }`}
        >
          <Keyboard className="w-4 h-4 text-purple-400" />
          <span>Atalhos DAW & Engenharia</span>
        </button>

        <button
          onClick={() => setActiveSection('system_info')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeSection === 'system_info'
              ? 'bg-lime-500/20 text-lime-300 border border-lime-500/40 shadow-[0_0_15px_rgba(132,204,22,0.15)]'
              : 'text-gray-400 hover:text-gray-200 hover:bg-[#15191E]'
          }`}
        >
          <HardDrive className="w-4 h-4 text-lime-400" />
          <span>Diagnóstico & Manutenção</span>
        </button>
      </div>

      {/* SECTION 1: BACKUP & EXPORT JSON (PRIMARY FOCUS) */}
      {activeSection === 'backup_export' && (
        <div className="space-y-6">
          {/* Main Action Cards: Export vs Import */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* CARD 1: EXPORT ALL PROJECTS */}
            <div className="rounded-2xl bg-gradient-to-br from-[#12161E] to-[#161C26] border-2 border-cyan-500/40 p-6 space-y-5 shadow-2xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-3 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
                    <Download className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/30">
                    FORMATO UNIVERSAL .JSON
                  </span>
                </div>

                <div>
                  <h2 className="text-lg font-black text-white tracking-tight">
                    1. Exportar Todos os Projetos do Estúdio
                  </h2>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                    Baixa um arquivo <code className="text-cyan-400 bg-black/50 px-1 py-0.5 rounded font-mono font-bold">.JSON</code> completo contendo todas as sessões cadastradas (Kuduro, Semba, Trap, etc.), checklists de mix/master, anotações de clientes, BPM e tonalidades.
                  </p>
                </div>

                {/* Export Highlights */}
                <div className="p-3 bg-[#0B0E11] rounded-xl border border-[#242A34] space-y-1.5 text-xs text-gray-300">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-gray-400">Total de Projetos:</span>
                    <strong className="text-cyan-400 font-mono">{currentProjects.length} Sessões</strong>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-gray-400">Inclui Kuduro & African Beats:</span>
                    <strong className="text-emerald-400 font-mono">Sim (140 BPM, Dikanza, 808)</strong>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-gray-400">Compatibilidade:</span>
                    <strong className="text-white font-mono">Qualquer Navegador / PC</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2 relative z-10">
                <button
                  onClick={handleExportAllProjects}
                  className="w-full py-3.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer active:scale-[0.99]"
                >
                  <Download className="w-4 h-4 text-black" />
                  <span>EXPORTAR TODOS OS PROJETOS (.JSON)</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleDownloadFullBackup}
                    className="py-2.5 px-3 rounded-lg bg-[#161B22] hover:bg-[#1E2430] text-gray-300 hover:text-white font-bold text-[11px] border border-[#242A34] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    title="Exporta projetos + estilos musicais customizados"
                  >
                    <FolderDown className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Backup Completo</span>
                  </button>

                  <button
                    onClick={handleCopyRawBackup}
                    className="py-2.5 px-3 rounded-lg bg-[#161B22] hover:bg-[#1E2430] text-gray-300 hover:text-white font-bold text-[11px] border border-[#242A34] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{copiedBackup ? '✓ Copiado!' : 'Copiar Texto JSON'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* CARD 2: IMPORT & RESTORE */}
            <div 
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              className={`rounded-2xl bg-gradient-to-br from-[#12161E] to-[#161C26] border-2 p-6 space-y-5 shadow-2xl flex flex-col justify-between transition-all ${
                isDragOver ? 'border-emerald-400 bg-emerald-950/20' : 'border-emerald-500/40'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                    <Upload className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/30">
                    RESTAURAÇÃO INSTANTÂNEA
                  </span>
                </div>

                <div>
                  <h2 className="text-lg font-black text-white tracking-tight">
                    2. Importar / Migrar para Novo Dispositivo
                  </h2>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                    Arraste ou selecione o arquivo <code className="text-emerald-400 bg-black/50 px-1 py-0.5 rounded font-mono font-bold">.JSON</code> exportado do outro computador. Todas as faixas, clientes e mixagens serão restaurados no mesmo segundo.
                  </p>
                </div>

                {/* Mode Selector */}
                <div className="p-3 bg-[#0B0E11] rounded-xl border border-[#242A34] space-y-2">
                  <span className="text-[11px] font-bold text-gray-400 block">Modo de Importação:</span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <label className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                      restoreMode === 'replace' 
                        ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 font-bold' 
                        : 'bg-[#15191E] border-[#242A34] text-gray-400 hover:text-gray-200'
                    }`}>
                      <input
                        type="radio"
                        name="restoreMode"
                        value="replace"
                        checked={restoreMode === 'replace'}
                        onChange={() => setRestoreMode('replace')}
                        className="accent-emerald-500"
                      />
                      <span>Substituir Tudo</span>
                    </label>

                    <label className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                      restoreMode === 'merge' 
                        ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 font-bold' 
                        : 'bg-[#15191E] border-[#242A34] text-gray-400 hover:text-gray-200'
                    }`}>
                      <input
                        type="radio"
                        name="restoreMode"
                        value="merge"
                        checked={restoreMode === 'merge'}
                        onChange={() => setRestoreMode('merge')}
                        className="accent-emerald-500"
                      />
                      <span>Mesclar (Merge)</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".json,.melobackup,.meloproj"
                  className="hidden"
                />

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer active:scale-[0.99]"
                >
                  <Upload className="w-4 h-4 text-black" />
                  <span>SELECIONAR ARQUIVO DE BACKUP NO COMPUTADOR</span>
                </button>

                <button
                  onClick={() => setIsRawJsonModalOpen(true)}
                  className="w-full py-2.5 px-3 rounded-lg bg-[#161B22] hover:bg-[#1E2430] text-gray-300 hover:text-white font-bold text-[11px] border border-[#242A34] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Colar Texto JSON Diretamente</span>
                </button>
              </div>
            </div>
          </div>

          {/* PROJECT LIST PREVIEW READY FOR BACKUP */}
          <div className="rounded-2xl bg-[#12151A] border border-[#242A34] p-5 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-extrabold text-white">
                  Projetos no Estúdio Prontos para Backup ({currentProjects.length})
                </h3>
              </div>
              <span className="text-[10px] font-mono text-gray-500">
                Garantidos na Exportação Local
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto custom-scrollbar p-1">
              {currentProjects.map((p) => {
                const isKuduro = p.genre.toLowerCase().includes('kuduro');
                const checkCount = p.checklist ? Object.values(p.checklist).filter(Boolean).length : 0;
                return (
                  <div 
                    key={p.id}
                    className="p-3 bg-[#0B0E11] rounded-xl border border-[#222730] hover:border-cyan-500/40 transition-colors flex flex-col justify-between gap-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate">{p.name}</p>
                        <p className="text-[10px] text-gray-400 truncate">{p.artist || 'Artista Estúdio'}</p>
                      </div>
                      {isKuduro ? (
                        <span className="text-[9px] font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded shrink-0 flex items-center gap-1">
                          <Flame className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                          Kuduro
                        </span>
                      ) : (
                        <span className="text-[9px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-1.5 py-0.5 rounded shrink-0">
                          {p.genre}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 border-t border-[#1C212B] pt-1.5">
                      <span className="text-emerald-400 font-bold">{p.bpm} BPM • {p.key}</span>
                      <span>{checkCount} checks</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3-STEP MIGRATION GUIDE */}
          <div className="p-5 rounded-2xl bg-[#0B0E11] border border-[#242A34] space-y-3">
            <div className="flex items-center gap-2 text-xs font-extrabold text-amber-400">
              <Laptop className="w-4 h-4" />
              <span>GUIA DE MIGRAÇÃO ENTRE COMPUTADORES EM 3 PASSOS SIMPLES:</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 bg-[#15191E] rounded-xl border border-[#222730] space-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-cyan-400">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center text-[10px]">1</span>
                  <span>Exportar Arquivo</span>
                </div>
                <p className="text-gray-300 text-[11px] leading-relaxed">
                  No computador atual, clique em <strong>"Exportar Todos os Projetos (.JSON)"</strong> e salve o arquivo no seu Pendrive ou envie por WhatsApp/E-mail.
                </p>
              </div>

              <div className="p-3.5 bg-[#15191E] rounded-xl border border-[#222730] space-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-purple-400">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center text-[10px]">2</span>
                  <span>Abrir no Novo PC</span>
                </div>
                <p className="text-gray-300 text-[11px] leading-relaxed">
                  Abra o aplicativo em qualquer navegador do novo computador (Chrome, Edge, Firefox ou Safari).
                </p>
              </div>

              <div className="p-3.5 bg-[#15191E] rounded-xl border border-[#222730] space-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px]">3</span>
                  <span>Restaurar em 1 Clique</span>
                </div>
                <p className="text-gray-300 text-[11px] leading-relaxed">
                  Acesse esta tela, clique em <strong>"Selecionar Arquivo de Backup"</strong> e escolha o arquivo. Pronto! Tudo fica carregado.
                </p>
              </div>
            </div>
          </div>

          {/* LOCAL RESTORE SNAPSHOTS */}
          <div className="rounded-2xl bg-[#12151A] border border-[#242A34] p-5 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>Pontos de Restauração Locais (Snapshots no Navegador)</span>
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Versões salvas automaticamente no cache para reverter alterações com segurança.
                </p>
              </div>

              <button
                onClick={() => setIsCreatingSnapshot(prev => !prev)}
                className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Gravar Ponto Agora</span>
              </button>
            </div>

            {isCreatingSnapshot && (
              <form onSubmit={handleCreateSnapshot} className="p-3 rounded-xl bg-[#0B0E11] border border-cyan-500/40 flex items-center gap-2 animate-in fade-in">
                <input
                  type="text"
                  value={newSnapshotName}
                  onChange={(e) => setNewSnapshotName(e.target.value)}
                  placeholder="Nome do ponto (ex: Antes de gravar os vocais do Kuduro)"
                  className="flex-1 bg-[#15191E] border border-[#242A34] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold rounded-lg cursor-pointer"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreatingSnapshot(false)}
                  className="px-3 py-2 bg-[#15191E] text-gray-400 text-xs rounded-lg hover:text-white cursor-pointer"
                >
                  Cancelar
                </button>
              </form>
            )}

            <div className="space-y-2">
              {snapshots.length === 0 ? (
                <div className="p-4 rounded-xl bg-[#0B0E11] border border-[#242A34] text-center text-xs text-gray-500">
                  Nenhum ponto gravado ainda. Crie um ponto acima para ter segurança contra alterações acidentais.
                </div>
              ) : (
                snapshots.map((snap) => (
                  <div 
                    key={snap.id}
                    className="p-3 bg-[#0B0E11] rounded-xl border border-[#222730] hover:border-gray-600 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{snap.name}</span>
                        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.2 rounded border border-cyan-500/20">
                          {snap.totalProjects} projetos
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-gray-500 block">
                        Salvo em: {new Date(snap.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleRestoreSnapshot(snap.id, snap.name)}
                        className="px-3 py-1.5 rounded-lg bg-[#15191E] hover:bg-emerald-500/20 text-emerald-400 hover:border-emerald-500/40 border border-[#242A34] text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Restaurar</span>
                      </button>

                      <button
                        onClick={() => handleDeleteSnapshot(snap.id)}
                        className="p-1.5 rounded-lg bg-[#15191E] hover:bg-red-500/20 text-gray-500 hover:text-red-400 border border-[#242A34] transition-all cursor-pointer"
                        title="Excluir snapshot"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* SECTION: PWA OFFLINE & NETLIFY STATUS */}
      {activeSection === 'pwa_offline' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Realtime Diagnostic Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Status 1: Internet Connection */}
            <div className="p-5 rounded-2xl bg-[#12151A] border border-[#242A34] space-y-3 shadow-lg">
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                  isOnline 
                    ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' 
                    : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                }`}>
                  {isOnline ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
                </div>
                <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${
                  isOnline 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                }`}>
                  {isOnline ? 'CONECTADO' : 'OFFLINE'}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Status da Rede</h3>
                <p className="text-xs text-gray-400 mt-1">
                  {isOnline 
                    ? 'Conexão ativa. Pronto para baixar atualizações e sincronizar cache.' 
                    : 'Sem internet. O aplicativo está rodando 100% no cache local do computador.'}
                </p>
              </div>
            </div>

            {/* Status 2: Service Worker & Cache */}
            <div className="p-5 rounded-2xl bg-[#12151A] border border-[#242A34] space-y-3 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
                  <HardDrive className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                  {swActive ? 'ATIVO NO DISCO' : 'REGISTRADO'}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Service Worker & Cache Storage</h3>
                <p className="text-xs text-gray-400 mt-1">
                  Arquivos HTML, scripts, calculadoras e ferramentas gravados na memória offline permanente.
                </p>
              </div>
            </div>

            {/* Status 3: PWA Standalone Mode */}
            <div className="p-5 rounded-2xl bg-[#12151A] border border-[#242A34] space-y-3 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center border border-purple-500/30">
                  <Monitor className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                  {isInstalled ? 'APP INSTALADO' : 'PRONTO P/ INSTALAR'}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Modo Aplicativo Nativo</h3>
                <p className="text-xs text-gray-400 mt-1">
                  {isInstalled 
                    ? 'Rodando como aplicativo independente na sua área de trabalho/sistema.' 
                    : 'Pode ser instalado no computador para abrir direto sem digitar link no navegador.'}
                </p>
              </div>
            </div>
          </div>

          {/* Solution & Explanation Card: Netlify Offline Fix */}
          <div className="rounded-2xl bg-gradient-to-br from-[#12161E] via-[#161C26] to-[#12161E] border-2 border-emerald-500/40 p-6 space-y-5 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#242A34] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40 shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-white tracking-tight">
                    Como Usar 100% Offline no Netlify (guiadoprodutor.netlify.app)
                  </h2>
                  <p className="text-xs text-emerald-400 font-semibold mt-0.5">
                    Solução definitiva para a tela do dinossauro (ERR_INTERNET_DISCONNECTED)
                  </p>
                </div>
              </div>

              {/* Install Button Trigger */}
              {canInstall && !isInstalled && (
                <button
                  onClick={handleInstallApp}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-extrabold text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Instalar App no Computador</span>
                </button>
              )}
            </div>

            {/* Step-by-Step Practical Guide */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-[#0B0E11] rounded-xl border border-[#222730] space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-cyan-500 text-black font-extrabold text-xs flex items-center justify-center">1</span>
                  <span className="text-xs font-bold text-white">Abra 1 Vez Conectado</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Acesse <span className="text-cyan-400 font-mono">guiadoprodutor.netlify.app</span> uma vez com internet. O navegador salva automaticamente o Service Worker e todos os módulos de mixagem no cache local.
                </p>
              </div>

              <div className="p-4 bg-[#0B0E11] rounded-xl border border-[#222730] space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-black font-extrabold text-xs flex items-center justify-center">2</span>
                  <span className="text-xs font-bold text-white">Instale como App (PWA)</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Clique no botão <strong className="text-emerald-400">"Instalar App"</strong> no topo da tela ou no ícone de instalação do Google Chrome na barra de endereços para criar um atalho na Área de Trabalho.
                </p>
              </div>

              <div className="p-4 bg-[#0B0E11] rounded-xl border border-[#222730] space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-purple-500 text-white font-extrabold text-xs flex items-center justify-center">3</span>
                  <span className="text-xs font-bold text-white">Use no Estúdio Sem Wi-Fi</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Desligue a internet completamente. Ao abrir o aplicativo ou recarregar a página, o Service Worker serve o app direto do seu SSD sem depender dos servidores do Netlify.
                </p>
              </div>
            </div>

            {/* Didactic Explanation Box */}
            <div className="p-4 bg-[#15191E] rounded-xl border border-[#2A2F36] space-y-2 text-xs">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                Por que a tela do dinossauro apareceu antes?
              </span>
              <p className="text-gray-300 leading-relaxed">
                Antes do Service Worker ser configurado, o navegador tentava enviar uma solicitação HTTP online para os servidores do Netlify para buscar a página. Sem conexão, o navegador falhava. Com o novo <strong>Service Worker (sw.js)</strong> e o <strong>Manifest PWA</strong>, a aplicação é interceptada antes mesmo de sair do computador e carregada instantaneamente do cache local.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: SHORTCUTS & AUDIO PHILOSOPHY */}
      {activeSection === 'shortcuts_guide' && (
        <div className="space-y-6 animate-in fade-in">
          {/* FL Studio Shortcuts */}
          <div className="rounded-2xl bg-[#12151A] border border-[#242A34] p-5 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-white font-extrabold text-sm">
              <Keyboard className="w-4 h-4 text-cyan-400" />
              <span>Atalhos Rápidos de Produção • FL Studio</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
              {flShortcuts.map((sc, idx) => (
                <div key={idx} className="p-3 bg-[#0B0E11] rounded-xl border border-[#222730] space-y-1">
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-[#15191E] px-2 py-0.5 rounded inline-block border border-[#242A34]">
                    {sc.key}
                  </span>
                  <span className="text-[11px] text-gray-300 block font-medium mt-1">
                    {sc.action}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Studio One Shortcuts */}
          <div className="rounded-2xl bg-[#12151A] border border-[#242A34] p-5 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-white font-extrabold text-sm">
              <Keyboard className="w-4 h-4 text-purple-400" />
              <span>Atalhos Rápidos de Produção • Studio One 7</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
              {s1Shortcuts.map((sc, idx) => (
                <div key={idx} className="p-3 bg-[#0B0E11] rounded-xl border border-[#222730] space-y-1">
                  <span className="text-xs font-mono font-bold text-purple-400 bg-[#15191E] px-2 py-0.5 rounded inline-block border border-[#242A34]">
                    {sc.key}
                  </span>
                  <span className="text-[11px] text-gray-300 block font-medium mt-1">
                    {sc.action}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Golden Rules */}
          <div className="rounded-2xl bg-[#12151A] border border-[#242A34] p-5 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-white font-extrabold text-sm">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Princípios Imutáveis de Engenharia de Áudio</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-4 bg-[#0B0E11] rounded-xl border border-[#222730] space-y-1.5">
                <span className="text-xs font-bold text-cyan-400 block">1. O ouvido toma a decisão final</span>
                <p className="text-gray-400 leading-relaxed text-[11px]">
                  Plugins e números na tela são guias visuais. Se soa bem nos monitores e fones, está correto.
                </p>
              </div>
              <div className="p-4 bg-[#0B0E11] rounded-xl border border-[#222730] space-y-1.5">
                <span className="text-xs font-bold text-orange-400 block">2. Menos é mais</span>
                <p className="text-gray-400 leading-relaxed text-[11px]">
                  Não empilhe 10 plugins em um canal se 2 resolvem o problema de mixagem.
                </p>
              </div>
              <div className="p-4 bg-[#0B0E11] rounded-xl border border-[#222730] space-y-1.5">
                <span className="text-xs font-bold text-emerald-400 block">3. Volume não é qualidade</span>
                <p className="text-gray-400 leading-relaxed text-[11px]">
                  Sempre compare o sinal antes e depois do plugin com volume igualado (A/B Matching).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: SYSTEM INFO & RESET */}
      {activeSection === 'system_info' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-[#12151A] border border-[#242A34] space-y-2.5 shadow-lg">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <WifiOff className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">Privacidade Absoluta</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Nenhum dado é enviado para servidores na nuvem. Você pode usar a aplicação no estúdio mesmo em modo avião.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#12151A] border border-[#242A34] space-y-2.5 shadow-lg">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
                <HardDrive className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">Cache Local Persistente</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Tudo fica gravado com alta durabilidade na memória do navegador atual com suporte a backup portátil.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#12151A] border border-[#242A34] space-y-2.5 shadow-lg">
              <div className="w-9 h-9 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center border border-orange-500/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">Processamento Local</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Geradores de sinal de teste, ruído rosa e analisadores operam diretamente na placa de som do seu computador.
              </p>
            </div>
          </div>

          {/* Reset Factory Danger Zone */}
          <div className="rounded-2xl bg-[#12151A] border border-red-500/30 p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span>Restaurar Projetos de Demonstração Originais</span>
              </h3>
              <p className="text-xs text-gray-400">
                Redefine o estúdio para os projetos iniciais de fábrica (incluindo o projeto de Kuduro na Batida de Luanda).
              </p>
            </div>

            <button
              onClick={onResetData}
              className="px-4 py-2.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/40 text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Restaurar Demonstrações de Fábrica</span>
            </button>
          </div>
        </div>
      )}

      {/* Raw JSON Paste Modal */}
      {isRawJsonModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#15191E] border border-[#242A34] rounded-2xl w-full max-w-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#242A34] pb-3">
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <FileJson className="w-5 h-5 text-emerald-400" />
                <span>Colar Código JSON de Backup</span>
              </h3>
              <button
                onClick={() => setIsRawJsonModalOpen(false)}
                className="text-gray-400 hover:text-white text-xs font-bold cursor-pointer"
              >
                ✕ Fechar
              </button>
            </div>

            <p className="text-xs text-gray-400">
              Cole o texto copiado de outro estúdio ou backup abaixo para restaurar todos os projetos:
            </p>

            <textarea
              value={rawJsonText}
              onChange={(e) => setRawJsonText(e.target.value)}
              placeholder="Cole o JSON de backup aqui..."
              rows={8}
              className="w-full bg-[#0B0E11] border border-[#242A34] rounded-xl p-3 text-xs font-mono text-gray-300 focus:outline-none focus:border-emerald-500"
            />

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsRawJsonModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-[#0B0E11] text-gray-400 text-xs font-bold hover:text-white cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleApplyRawJson}
                disabled={!rawJsonText.trim()}
                className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-extrabold disabled:opacity-50 cursor-pointer"
              >
                Aplicar e Restaurar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
