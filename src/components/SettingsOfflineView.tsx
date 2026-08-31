import React, { useState, useRef } from 'react';
import { 
  Settings, 
  WifiOff, 
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
  ArrowRight,
  FolderArchive,
  Layers,
  FileText
} from 'lucide-react';
import { Project } from '../types';
import { 
  downloadBackupFile, 
  validateBackupContent, 
  restoreBackup, 
  getLocalSnapshots, 
  createLocalSnapshot, 
  restoreLocalSnapshot, 
  deleteLocalSnapshot,
  LocalSnapshot 
} from '../utils/backupManager';
import { getSavedProjects } from '../utils/audioCalculator';

interface SettingsOfflineViewProps {
  onResetData: () => void;
  onProjectsUpdated?: (projects: Project[]) => void;
}

export const SettingsOfflineView: React.FC<SettingsOfflineViewProps> = ({ onResetData, onProjectsUpdated }) => {
  const [snapshots, setSnapshots] = useState<LocalSnapshot[]>(() => getLocalSnapshots());
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [isRawJsonModalOpen, setIsRawJsonModalOpen] = useState(false);
  const [rawJsonText, setRawJsonText] = useState('');
  const [restoreMode, setRestoreMode] = useState<'replace' | 'merge'>('replace');
  const [newSnapshotName, setNewSnapshotName] = useState('');
  const [isCreatingSnapshot, setIsCreatingSnapshot] = useState(false);
  const [copiedBackup, setCopiedBackup] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentProjects = getSavedProjects();

  const showStatus = (type: 'success' | 'error' | 'info', text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => {
      setStatusMessage(null);
    }, 6000);
  };

  const handleDownloadBackup = () => {
    try {
      downloadBackupFile();
      showStatus('success', 'Arquivo de Backup baixado com sucesso! Guarde este arquivo em seu pendrive ou nuvem.');
      // Refresh snapshots as auto snapshot is created
      setSnapshots(getLocalSnapshots());
    } catch {
      showStatus('error', 'Falha ao gerar arquivo de backup.');
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

      const validation = validateBackupContent(content);
      if (!validation.valid || (!validation.data && !validation.singleProject)) {
        showStatus('error', validation.error || 'Arquivo de backup inválido.');
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
        // Single project restore
        const current = getSavedProjects();
        const updated = [validation.singleProject, ...current.filter((p: Project) => p.id !== validation.singleProject!.id)];
        restoreBackup({
          schemaVersion: '1.0',
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
    reader.readAsText(file);

    // Reset input value so same file can be uploaded again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCreateSnapshot = (e: React.FormEvent) => {
    e.preventDefault();
    const snap = createLocalSnapshot(newSnapshotName.trim() || undefined);
    setSnapshots(getLocalSnapshots());
    setNewSnapshotName('');
    setIsCreatingSnapshot(false);
    showStatus('success', `Ponto de restauração "${snap.name}" salvo no cache local!`);
  };

  const handleRestoreSnapshot = (id: string, name: string) => {
    if (window.confirm(`Deseja restaurar o ponto de restauração "${name}"? Os projetos atuais serão substituídos pelos salvos nesse ponto.`)) {
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
      const data = getSavedProjects();
      navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      setCopiedBackup(true);
      setTimeout(() => setCopiedBackup(false), 3000);
      showStatus('success', 'Código do backup copiado para a área de transferência!');
    } catch {
      showStatus('error', 'Falha ao copiar dados.');
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
    { key: 'Ctrl + R (Cmd + R)', action: 'Exportar Áudio WAV direto' },
    { key: 'Ctrl + Shift + R', action: 'Exportar Áudio MP3' },
    { key: 'Ctrl + L', action: 'Roteia canal selecionado para o Mixer' },
    { key: 'Alt + S', action: 'Strumizer no Piano Roll' },
    { key: 'S', action: 'Ferramenta Slip na Playlist' },
    { key: 'C', action: 'Ferramenta Cut (Corte de áudio / fatiar)' },
    { key: 'Mute / Solo (Right-click)', action: 'Isola canal no Mixer' }
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Top Banner Status */}
      <div className="rounded-xl bg-[#15191E] border border-[#2A2F36] p-6 shadow-lg relative overflow-hidden">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            100% OFFLINE & PERSISTÊNCIA TOTAL
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Configurações, Backup & Modo Offline
          </h1>
          <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
            O assistente funciona sem dependência de internet ou servidores externos. Todos os seus projetos, agendamentos, notas de mix, estilos musicais e templates ficam salvos localmente e podem ser transportados para qualquer outro computador em segundos.
          </p>
        </div>

        {/* Global Alert Message */}
        {statusMessage && (
          <div className={`mt-4 p-3.5 rounded-xl border text-xs font-bold flex items-center gap-2 animate-in fade-in ${
            statusMessage.type === 'success' 
              ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' 
              : statusMessage.type === 'error'
              ? 'bg-red-500/15 border-red-500/40 text-red-300'
              : 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300'
          }`}>
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{statusMessage.text}</span>
          </div>
        )}
      </div>

      {/* BACKUP & MIGRATION HUB - MAIN SECTION */}
      <div className="rounded-xl bg-gradient-to-br from-[#12161D] to-[#151922] border-2 border-cyan-500/30 p-6 md:p-8 space-y-6 shadow-2xl relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2A2F36] pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FolderArchive className="w-6 h-6 text-cyan-400" />
              <h2 className="text-lg md:text-xl font-black text-white">
                📦 Central de Backup & Transferência de Estúdio
              </h2>
            </div>
            <p className="text-xs text-gray-400">
              Mudar de computador, levar para o estúdio de gravação ou guardar cópia segura no pendrive.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1.5 rounded-lg border border-cyan-500/30">
              {currentProjects.length} Projeto(s) no Estúdio
            </span>
          </div>
        </div>

        {/* Action Grid: Export & Import */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Exportar Backup */}
          <div className="p-5 rounded-xl bg-[#0B0E11] border border-[#2A2F36] hover:border-cyan-500/50 transition-all space-y-4 flex flex-col justify-between shadow-lg">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">1. Exportar Backup do Estúdio</h3>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  Gera um arquivo <code className="text-cyan-400 bg-black/40 px-1 py-0.5 rounded">.JSON</code> leve e completo com todas as sessões, mixnotes, agendamentos, gêneros (Kuduro, Semba, etc.) e checklists.
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={handleDownloadBackup}
                className="w-full py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer active:scale-[0.99]"
              >
                <Download className="w-4 h-4 text-black" />
                <span>BAIXAR ARQUIVO DE BACKUP (.JSON)</span>
              </button>

              <button
                onClick={handleCopyRawBackup}
                className="w-full py-2 px-3 rounded-lg bg-[#15191E] hover:bg-[#1E2329] text-gray-300 hover:text-white font-semibold text-xs border border-[#2A2F36] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5 text-cyan-400" />
                <span>{copiedBackup ? '✓ Copiado com Sucesso!' : 'Copiar Backup em Texto (Área de Transferência)'}</span>
              </button>
            </div>
          </div>

          {/* Card 2: Restaurar / Importar Backup */}
          <div className="p-5 rounded-xl bg-[#0B0E11] border border-[#2A2F36] hover:border-emerald-500/50 transition-all space-y-4 flex flex-col justify-between shadow-lg">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">2. Restaurar / Carregar em Outro Dispositivo</h3>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  Carregue o arquivo de backup baixado do outro computador ou pendrive. O assistente recupera instantaneamente todas as suas sessões.
                </p>
              </div>

              {/* Mode Selection */}
              <div className="flex items-center gap-3 text-xs pt-1">
                <span className="text-gray-400 font-bold">Modo de Restauração:</span>
                <label className="flex items-center gap-1.5 cursor-pointer text-gray-300">
                  <input
                    type="radio"
                    name="restoreMode"
                    value="replace"
                    checked={restoreMode === 'replace'}
                    onChange={() => setRestoreMode('replace')}
                    className="accent-cyan-500"
                  />
                  <span>Substituir tudo</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-gray-300">
                  <input
                    type="radio"
                    name="restoreMode"
                    value="merge"
                    checked={restoreMode === 'merge'}
                    onChange={() => setRestoreMode('merge')}
                    className="accent-cyan-500"
                  />
                  <span>Mesclar (Merge)</span>
                </label>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".json,.melobackup,.meloproj"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer active:scale-[0.99]"
              >
                <Upload className="w-4 h-4 text-black" />
                <span>ESCOLHER ARQUIVO DE BACKUP NO DISPOSITIVO</span>
              </button>

              <button
                onClick={() => setIsRawJsonModalOpen(true)}
                className="w-full py-2 px-3 rounded-lg bg-[#15191E] hover:bg-[#1E2329] text-gray-300 hover:text-white font-semibold text-xs border border-[#2A2F36] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span>Colar Código JSON Manualmente</span>
              </button>
            </div>
          </div>
        </div>

        {/* STEP-BY-STEP MIGRATION GUIDE */}
        <div className="p-4 rounded-xl bg-[#0B0E11] border border-[#2A2F36] space-y-3">
          <div className="flex items-center gap-2 text-xs font-extrabold text-amber-400">
            <Laptop className="w-4 h-4" />
            <span>COMO MUDAR DE COMPUTADOR OU LEVAR PARA OUTRO ESTÚDIO EM 3 PASSOS:</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-[#15191E] rounded-lg border border-[#242A34] space-y-1">
              <span className="text-[10px] font-mono font-bold text-cyan-400 block">PASSO 1: No Computador Antigo</span>
              <p className="text-gray-300 leading-relaxed">
                Clique no botão <strong>"Baixar Arquivo de Backup (.JSON)"</strong> e salve o arquivo no seu Pendrive, Google Drive ou envie por WhatsApp/E-mail.
              </p>
            </div>
            <div className="p-3 bg-[#15191E] rounded-lg border border-[#242A34] space-y-1">
              <span className="text-[10px] font-mono font-bold text-cyan-400 block">PASSO 2: No Novo Computador</span>
              <p className="text-gray-300 leading-relaxed">
                Abra o aplicativo em qualquer navegador do novo computador (Chrome, Edge, Firefox, Safari).
              </p>
            </div>
            <div className="p-3 bg-[#15191E] rounded-lg border border-[#242A34] space-y-1">
              <span className="text-[10px] font-mono font-bold text-emerald-400 block">PASSO 3: Restaurar</span>
              <p className="text-gray-300 leading-relaxed">
                Venha em <strong>Configurações & Backup</strong>, clique em <strong>"Escolher Arquivo de Backup"</strong> e selecione o arquivo. Pronto! Tudo é recuperado instantaneamente.
              </p>
            </div>
          </div>
        </div>

        {/* LOCAL RESTORE POINTS (SNAPSHOTS) */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Pontos de Restauração Locais (Snapshots Automáticos)</span>
              </h3>
              <p className="text-xs text-gray-400">
                Histórico de versões salvas no navegador para reverter alterações a qualquer momento.
              </p>
            </div>

            <button
              onClick={() => setIsCreatingSnapshot(prev => !prev)}
              className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Criar Ponto de Restauração Agora</span>
            </button>
          </div>

          {/* New Snapshot Input Box */}
          {isCreatingSnapshot && (
            <form onSubmit={handleCreateSnapshot} className="p-3.5 rounded-xl bg-[#0B0E11] border border-cyan-500/40 flex items-center gap-2 animate-in fade-in">
              <input
                type="text"
                value={newSnapshotName}
                onChange={(e) => setNewSnapshotName(e.target.value)}
                placeholder="Nome do ponto (ex: Antes da Gravação do Kuduro com o Artista)"
                className="flex-1 bg-[#15191E] border border-[#2A2F36] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                autoFocus
              />
              <button
                type="submit"
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold rounded-lg cursor-pointer"
              >
                Salvar Ponto
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

          {/* Snapshots List */}
          <div className="space-y-2">
            {snapshots.length === 0 ? (
              <div className="p-4 rounded-xl bg-[#0B0E11] border border-[#2A2F36] text-center text-xs text-gray-500">
                Nenhum ponto de restauração gravado ainda. Crie um ponto acima para ter segurança contra perdas.
              </div>
            ) : (
              snapshots.map((snap) => (
                <div 
                  key={snap.id}
                  className="p-3.5 rounded-xl bg-[#0B0E11] border border-[#2A2F36] hover:border-gray-600 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{snap.name}</span>
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">
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
                      className="px-3 py-1.5 rounded-lg bg-[#15191E] hover:bg-emerald-500/20 text-emerald-400 hover:border-emerald-500/40 border border-[#2A2F36] text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Restaurar Este Ponto</span>
                    </button>

                    <button
                      onClick={() => handleDeleteSnapshot(snap.id)}
                      className="p-1.5 rounded-lg bg-[#15191E] hover:bg-red-500/20 text-gray-500 hover:text-red-400 border border-[#2A2F36] hover:border-red-500/30 transition-all cursor-pointer"
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

      {/* Raw JSON Modal */}
      {isRawJsonModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#15191E] border border-[#2A2F36] rounded-2xl w-full max-w-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#2A2F36] pb-3">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
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
              className="w-full bg-[#0B0E11] border border-[#2A2F36] rounded-xl p-3 text-xs font-mono text-gray-300 focus:outline-none focus:border-emerald-500"
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

      {/* Offline Architecture Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-[#15191E] border border-[#2A2F36] space-y-3 shadow-lg">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <WifiOff className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Zero Conexão com Internet</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Nenhum dado, áudio ou projeto é enviado para servidores externos. Você pode usar a aplicação no estúdio mesmo em modo avião ou sem sinal de internet.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-[#15191E] border border-[#2A2F36] space-y-3 shadow-lg">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
            <HardDrive className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">LocalStorage Persistente</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Seus projetos, notas, checklists de mix e parâmetros ficam gravados de forma segura no cache local do seu navegador.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-[#15191E] border border-[#2A2F36] space-y-3 shadow-lg">
          <div className="w-10 h-10 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center border border-orange-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Web Audio API</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            O gerador de sinais, ruído rosa e analisador de frequências operam usando os recursos nativos da placa de som do seu computador.
          </p>
        </div>
      </div>

      {/* FL Studio Hotkeys Reference Table */}
      <div className="rounded-xl bg-[#15191E] border border-[#2A2F36] p-6 md:p-7 space-y-5 shadow-xl">
        <div className="flex items-center gap-2 text-white font-extrabold text-base">
          <Keyboard className="w-5 h-5 text-cyan-400" />
          <span>Atalhos Essenciais do FL Studio para Mixagem Rápida</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {flShortcuts.map((sc, idx) => (
            <div key={idx} className="p-3 bg-[#0B0E11] rounded-lg border border-[#2A2F36] space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-400 bg-[#15191E] px-2 py-0.5 rounded inline-block border border-[#2A2F36]">
                {sc.key}
              </span>
              <span className="text-[11px] text-gray-300 block font-medium mt-1">
                {sc.action}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Studio Philosophy & Golden Rules */}
      <div className="rounded-xl bg-[#15191E] border border-[#2A2F36] p-6 md:p-7 space-y-5 shadow-xl">
        <div className="flex items-center gap-2 text-white font-extrabold text-base">
          <BookOpen className="w-5 h-5 text-cyan-400" />
          <span>Princípios Imutáveis de Engenharia de Áudio</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-[#0B0E11] rounded-lg border border-[#2A2F36] space-y-1.5">
            <span className="text-xs font-bold text-cyan-400 block">1. O ouvido toma a decisão final</span>
            <p className="text-gray-400 leading-relaxed">
              Plugins e números na tela são guias visuais. Se soa bem nos monitores e fones, está bem.
            </p>
          </div>

          <div className="p-4 bg-[#0B0E11] rounded-lg border border-[#2A2F36] space-y-1.5">
            <span className="text-xs font-bold text-orange-400 block">2. Menos é mais</span>
            <p className="text-gray-400 leading-relaxed">
              Não empilhe 10 plugins em um canal se 2 resolvem. Cada plugin adiciona processamento e possível rotação de fase.
            </p>
          </div>

          <div className="p-4 bg-[#0B0E11] rounded-lg border border-[#2A2F36] space-y-1.5">
            <span className="text-xs font-bold text-emerald-400 block">3. Volume não é qualidade</span>
            <p className="text-gray-400 leading-relaxed">
              Sempre compare o sinal antes e depois do plugin com volume igualado (A/B Matching) para não se enganar.
            </p>
          </div>
        </div>
      </div>

      {/* Storage Reset Danger Zone */}
      <div className="rounded-xl bg-[#15191E] border border-red-500/20 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span>Restaurar Padrões de Fábrica do Sistema</span>
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Redefine os projetos e checklists para as demonstrações originais de estúdio (inclui Kuduro na Batida de Luanda, Afrobeat e Trap).
          </p>
        </div>

        <button
          onClick={onResetData}
          className="px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Restaurar Demonstrações Originais</span>
        </button>
      </div>
    </div>
  );
};
