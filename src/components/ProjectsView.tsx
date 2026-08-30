import React, { useState } from 'react';
import { Project, ProcessLevel, ProjectPriority } from '../types';
import { 
  FolderKanban, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Music, 
  Download, 
  Upload, 
  Copy, 
  Sparkles, 
  Clock, 
  ArrowRight,
  AlertTriangle,
  Calendar,
  Layers,
  Sliders,
  Disc3,
  CheckCircle2,
  Filter,
  Search,
  Github,
  TrendingUp,
  Tag,
  Radio
} from 'lucide-react';
import { getProjectDeadlineStatus } from '../utils/audioCalculator';
import { GitHubExportModal } from './GitHubExportModal';

interface ProjectsViewProps {
  projects: Project[];
  activeProjectId: string;
  onSelectProject: (id: string) => void;
  onSaveProjects: (projects: Project[]) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  activeProjectId,
  onSelectProject,
  onSaveProjects
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);

  // Filters and sorting
  const [filterStage, setFilterStage] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'DEADLINE' | 'RECENT' | 'PROGRESS' | 'NAME'>('DEADLINE');

  // Form State
  const [formName, setFormName] = useState('');
  const [formArtist, setFormArtist] = useState('');
  const [formGenre, setFormGenre] = useState('Afrobeat');
  const [formBpm, setFormBpm] = useState<number>(120);
  const [formKey, setFormKey] = useState('C Menor');
  const [formProcessLevel, setFormProcessLevel] = useState<ProcessLevel>('Nível 2: Mixagem');
  const [formDeadline, setFormDeadline] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  });
  const [formPriority, setFormPriority] = useState<ProjectPriority>('Normal');
  const [formNotes, setFormNotes] = useState('');
  const [formRefTracks, setFormRefTracks] = useState('');
  const [formClientContact, setFormClientContact] = useState('');
  const [formDeliveryFormat, setFormDeliveryFormat] = useState('WAV 24-bit / 48kHz + MP3 320k');

  const resetForm = () => {
    setFormName('');
    setFormArtist('');
    setFormGenre('Afrobeat');
    setFormBpm(120);
    setFormKey('C Menor');
    setFormProcessLevel('Nível 2: Mixagem');
    const d = new Date();
    d.setDate(d.getDate() + 7);
    setFormDeadline(d.toISOString().split('T')[0]);
    setFormPriority('Normal');
    setFormNotes('');
    setFormRefTracks('');
    setFormClientContact('');
    setFormDeliveryFormat('WAV 24-bit / 48kHz + MP3 320k');
    setIsCreating(false);
    setEditingId(null);
  };

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const statusFromLevel = (level: ProcessLevel) => {
      if (level === 'Nível 4: Finalização / Entrega') return 'Finalizado';
      if (level === 'Nível 3: Masterização') return 'Em Master';
      return 'Em Mixagem';
    };

    if (editingId) {
      // Edit existing
      const updated = projects.map((p) => {
        if (p.id === editingId) {
          return {
            ...p,
            name: formName,
            artist: formArtist || 'Artista Não Especificado',
            genre: formGenre,
            bpm: formBpm,
            key: formKey,
            processLevel: formProcessLevel,
            status: statusFromLevel(formProcessLevel),
            deadline: formDeadline,
            priority: formPriority,
            notes: formNotes,
            referenceTracks: formRefTracks,
            clientContact: formClientContact,
            deliveryFormat: formDeliveryFormat
          };
        }
        return p;
      });
      onSaveProjects(updated);
    } else {
      // Create new
      const newProj: Project = {
        id: `proj-${Date.now()}`,
        name: formName,
        artist: formArtist || 'Artista Não Especificado',
        genre: formGenre,
        bpm: formBpm,
        key: formKey,
        date: new Date().toISOString().split('T')[0],
        deadline: formDeadline,
        priority: formPriority,
        processLevel: formProcessLevel,
        status: statusFromLevel(formProcessLevel),
        notes: formNotes,
        referenceTracks: formRefTracks,
        clientContact: formClientContact,
        deliveryFormat: formDeliveryFormat,
        checklist: {},
        mixProgress: formProcessLevel === 'Nível 4: Finalização / Entrega' ? 100 : formProcessLevel === 'Nível 3: Masterização' ? 80 : formProcessLevel === 'Nível 2: Mixagem' ? 40 : 15,
        masterChecklist: {}
      };
      const updated = [newProj, ...projects];
      onSaveProjects(updated);
      onSelectProject(newProj.id);
    }

    resetForm();
  };

  const handleStartEdit = (proj: Project) => {
    setEditingId(proj.id);
    setFormName(proj.name);
    setFormArtist(proj.artist);
    setFormGenre(proj.genre);
    setFormBpm(proj.bpm);
    setFormKey(proj.key);
    setFormProcessLevel(proj.processLevel || 'Nível 2: Mixagem');
    setFormDeadline(proj.deadline || new Date().toISOString().split('T')[0]);
    setFormPriority(proj.priority || 'Normal');
    setFormNotes(proj.notes || '');
    setFormRefTracks(proj.referenceTracks || '');
    setFormClientContact(proj.clientContact || '');
    setFormDeliveryFormat(proj.deliveryFormat || 'WAV 24-bit / 48kHz');
    setIsCreating(true);
  };

  const handleQuickChangeLevel = (projId: string, newLevel: ProcessLevel) => {
    const updated = projects.map(p => {
      if (p.id === projId) {
        let newStatus: Project['status'] = 'Em Mixagem';
        let newProgress = p.mixProgress || 0;

        if (newLevel === 'Nível 1: Gravação / Pré-Mix') {
          newStatus = 'Em Mixagem';
          newProgress = Math.max(15, p.mixProgress);
        } else if (newLevel === 'Nível 2: Mixagem') {
          newStatus = 'Em Mixagem';
          newProgress = Math.max(45, p.mixProgress);
        } else if (newLevel === 'Nível 3: Masterização') {
          newStatus = 'Em Master';
          newProgress = Math.max(85, p.mixProgress);
        } else if (newLevel === 'Nível 4: Finalização / Entrega') {
          newStatus = 'Finalizado';
          newProgress = 100;
        }

        return {
          ...p,
          processLevel: newLevel,
          status: newStatus,
          mixProgress: newProgress
        };
      }
      return p;
    });
    onSaveProjects(updated);
  };

  const handleDelete = (id: string) => {
    if (projects.length <= 1) {
      alert('Você deve manter pelo menos um projeto ativo.');
      return;
    }
    const updated = projects.filter(p => p.id !== id);
    onSaveProjects(updated);
    if (activeProjectId === id) {
      onSelectProject(updated[0].id);
    }
  };

  const handleExportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(projects, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `melo_studio_projects_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed) && parsed.length > 0) {
          onSaveProjects(parsed);
          onSelectProject(parsed[0].id);
          alert('Projetos restaurados com sucesso do arquivo JSON!');
        }
      } catch (err) {
        alert('Erro ao importar arquivo JSON de backup.');
      }
    };
    reader.readAsText(file);
  };

  // Metrics Calculation
  const totalCount = projects.length;
  const level1Count = projects.filter(p => (p.processLevel || 'Nível 2: Mixagem') === 'Nível 1: Gravação / Pré-Mix').length;
  const level2Count = projects.filter(p => (p.processLevel || 'Nível 2: Mixagem') === 'Nível 2: Mixagem').length;
  const level3Count = projects.filter(p => (p.processLevel || 'Nível 2: Mixagem') === 'Nível 3: Masterização').length;
  const level4Count = projects.filter(p => p.status === 'Finalizado' || p.processLevel === 'Nível 4: Finalização / Entrega').length;
  
  const overdueProjects = projects.filter(p => {
    const dStatus = getProjectDeadlineStatus(p.deadline, p.status);
    return dStatus.isOverdue || (dStatus.isUrgent && p.status !== 'Finalizado');
  });

  // Filtered & Sorted Projects
  const filteredProjects = projects.filter(p => {
    // Search Query
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.genre.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchSearch) return false;

    // Stage filter
    if (filterStage === 'ALL') return true;
    if (filterStage === 'OVERDUE') {
      const dStatus = getProjectDeadlineStatus(p.deadline, p.status);
      return dStatus.isOverdue || (dStatus.isUrgent && p.status !== 'Finalizado');
    }
    if (filterStage === 'LEVEL1') return (p.processLevel || 'Nível 2: Mixagem') === 'Nível 1: Gravação / Pré-Mix';
    if (filterStage === 'LEVEL2') return (p.processLevel || 'Nível 2: Mixagem') === 'Nível 2: Mixagem';
    if (filterStage === 'LEVEL3') return (p.processLevel || 'Nível 2: Mixagem') === 'Nível 3: Masterização';
    if (filterStage === 'LEVEL4') return p.status === 'Finalizado' || p.processLevel === 'Nível 4: Finalização / Entrega';
    return true;
  }).sort((a, b) => {
    if (sortBy === 'DEADLINE') {
      const statusA = getProjectDeadlineStatus(a.deadline, a.status);
      const statusB = getProjectDeadlineStatus(b.deadline, b.status);
      // Overdue first
      if (statusA.isOverdue && !statusB.isOverdue) return -1;
      if (!statusA.isOverdue && statusB.isOverdue) return 1;
      return statusA.daysRemaining - statusB.daysRemaining;
    }
    if (sortBy === 'PROGRESS') {
      return (b.mixProgress || 0) - (a.mixProgress || 0);
    }
    if (sortBy === 'NAME') {
      return a.name.localeCompare(b.name);
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="rounded-2xl bg-[#15191E] border border-[#2A2F36] p-6 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold font-mono">
              <FolderKanban className="w-3.5 h-3.5" />
              FL STUDIO PIPELINE & CONTROLE DE PRAZOS
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Gestão de Sessões & Níveis de Processo
            </h1>
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
              Monitore o estágio de cada projeto (Pré-Mix, Mix, Master ou Finalização), datas limites de entrega, alertas de atraso e sincronização 100% offline.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                resetForm();
                setIsCreating(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-cyan-600/30 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Projeto</span>
            </button>

            <button
              onClick={() => setIsGitHubModalOpen(true)}
              className="px-3.5 py-2.5 rounded-xl bg-[#090C0F] hover:bg-[#1C232D] text-white text-xs font-bold flex items-center gap-2 border border-cyan-500/40 shadow-md transition-all cursor-pointer"
              title="Preparar e exportar para GitHub"
            >
              <Github className="w-4 h-4 text-cyan-400" />
              <span>Link no GitHub</span>
            </button>

            <button
              onClick={handleExportBackup}
              title="Baixar cópia de segurança em JSON"
              className="px-3.5 py-2.5 rounded-xl bg-[#0B0E11] hover:bg-[#1E2329] text-gray-300 text-xs font-semibold flex items-center gap-2 border border-[#2A2F36] transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Backup</span>
            </button>

            <label className="cursor-pointer px-3.5 py-2.5 rounded-xl bg-[#0B0E11] hover:bg-[#1E2329] text-gray-300 text-xs font-semibold flex items-center gap-2 border border-[#2A2F36] transition-colors">
              <Upload className="w-4 h-4 text-cyan-400" />
              <span>Restaurar</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportBackup}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* 5 KPI Metric Cards for Process Levels & Deadlines */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
          {/* Total */}
          <div 
            onClick={() => setFilterStage('ALL')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              filterStage === 'ALL' ? 'bg-[#1C232D] border-cyan-500 ring-1 ring-cyan-500/40 shadow-md' : 'bg-[#0B0E11] border-[#2A2F36] hover:border-gray-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-gray-400 uppercase font-bold">Total Projetos</span>
              <FolderKanban className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-2xl font-black text-white mt-1">{totalCount}</div>
            <span className="text-[10px] text-gray-500">Todas as sessões</span>
          </div>

          {/* Level 1: Pré-Mix */}
          <div 
            onClick={() => setFilterStage('LEVEL1')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              filterStage === 'LEVEL1' ? 'bg-[#1C232D] border-cyan-500 ring-1 ring-cyan-500/40 shadow-md' : 'bg-[#0B0E11] border-[#2A2F36] hover:border-gray-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">1. Pré-Mix / Rec</span>
              <Radio className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-2xl font-black text-white mt-1">{level1Count}</div>
            <span className="text-[10px] text-gray-500">Tracking e captação</span>
          </div>

          {/* Level 2: Mix */}
          <div 
            onClick={() => setFilterStage('LEVEL2')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              filterStage === 'LEVEL2' ? 'bg-[#1C232D] border-cyan-500 ring-1 ring-cyan-500/40 shadow-md' : 'bg-[#0B0E11] border-[#2A2F36] hover:border-gray-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-blue-400 uppercase font-bold">2. Mixagem</span>
              <Sliders className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="text-2xl font-black text-white mt-1">{level2Count}</div>
            <span className="text-[10px] text-gray-500">Equilíbrio e buses</span>
          </div>

          {/* Level 3: Master */}
          <div 
            onClick={() => setFilterStage('LEVEL3')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              filterStage === 'LEVEL3' ? 'bg-[#1C232D] border-cyan-500 ring-1 ring-cyan-500/40 shadow-md' : 'bg-[#0B0E11] border-[#2A2F36] hover:border-gray-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-orange-400 uppercase font-bold">3. Masterização</span>
              <Disc3 className="w-3.5 h-3.5 text-orange-400" />
            </div>
            <div className="text-2xl font-black text-white mt-1">{level3Count}</div>
            <span className="text-[10px] text-gray-500">Loudness & LUFS</span>
          </div>

          {/* Overdue / Urgent Alert */}
          <div 
            onClick={() => setFilterStage('OVERDUE')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              filterStage === 'OVERDUE' ? 'bg-[#2A1616] border-red-500 ring-1 ring-red-500/40 shadow-md' : overdueProjects.length > 0 ? 'bg-red-500/10 border-red-500/30 hover:border-red-400' : 'bg-[#0B0E11] border-[#2A2F36]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-red-400 uppercase font-bold flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-red-400" />
                Prazos Críticos
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-red-500 text-black font-bold">
                {overdueProjects.length}
              </span>
            </div>
            <div className="text-2xl font-black text-red-400 mt-1">{overdueProjects.length}</div>
            <span className="text-[10px] text-red-300/80">Atrasados ou Urgentes</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#15191E] border border-[#2A2F36]">
        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por faixa, artista ou gênero..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0B0E11] border border-[#2A2F36] rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Filter Stage Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-thin">
          {[
            { id: 'ALL', label: 'Todos' },
            { id: 'OVERDUE', label: `🚨 Atrasados (${overdueProjects.length})` },
            { id: 'LEVEL1', label: '1. Pré-Mix' },
            { id: 'LEVEL2', label: '2. Mix' },
            { id: 'LEVEL3', label: '3. Master' },
            { id: 'LEVEL4', label: '4. Finalizados' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterStage(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                filterStage === f.id
                  ? 'bg-cyan-500 text-black shadow-md'
                  : 'bg-[#0B0E11] text-gray-400 hover:text-white border border-[#2A2F36]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-mono text-gray-400">Ordenar:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="bg-[#0B0E11] border border-[#2A2F36] text-xs font-bold text-cyan-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="DEADLINE">📅 Prazo Mais Próximo / Atrasado</option>
            <option value="RECENT">⏱️ Mais Recentes</option>
            <option value="PROGRESS">📊 Maior Progresso</option>
            <option value="NAME">🔤 Nome da Faixa</option>
          </select>
        </div>
      </div>

      {/* Form Modal / Drawer when Creating or Editing */}
      {isCreating && (
        <form onSubmit={handleCreateNew} className="rounded-2xl bg-[#15191E] border-2 border-cyan-500/50 p-6 md:p-7 space-y-6 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between border-b border-[#2A2F36] pb-4">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>{editingId ? 'Editar Detalhes do Projeto & Nível' : 'Cadastrar Novo Projeto de Áudio'}</span>
            </h3>
            <button
              type="button"
              onClick={resetForm}
              className="text-xs text-gray-400 hover:text-white cursor-pointer"
            >
              Cancelar
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="text-gray-400 font-bold block mb-1">Nome da Faixa / Projeto *</label>
              <input
                type="text"
                required
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Ex: Minha Nova Música"
                className="w-full bg-[#0B0E11] border border-[#2A2F36] rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-gray-400 font-bold block mb-1">Artista / Cliente</label>
              <input
                type="text"
                value={formArtist}
                onChange={(e) => setFormArtist(e.target.value)}
                placeholder="Ex: João Silva"
                className="w-full bg-[#0B0E11] border border-[#2A2F36] rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-gray-400 font-bold block mb-1">Gênero Musical</label>
              <select
                value={formGenre}
                onChange={(e) => setFormGenre(e.target.value)}
                className="w-full bg-[#0B0E11] border border-[#2A2F36] rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-cyan-500"
              >
                {['Afrobeat', 'Amapiano', 'Kizomba / Zouk', 'Trap', 'Drill', 'Hip Hop Clássico', 'Pop Moderno', 'R&B Contemporâneo', 'Reggaeton', 'EDM / House', 'Rock / Indie', 'Funk Brasileiro', 'Sertanejo', 'Lo-Fi', 'Gospel'].map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-gray-400 font-bold block mb-1">Andamento (BPM)</label>
              <input
                type="number"
                min="40"
                max="280"
                value={formBpm}
                onChange={(e) => setFormBpm(parseInt(e.target.value) || 120)}
                className="w-full bg-[#0B0E11] border border-[#2A2F36] rounded-lg px-3 py-2.5 text-white font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-gray-400 font-bold block mb-1">Tom Musical (Key)</label>
              <input
                type="text"
                value={formKey}
                onChange={(e) => setFormKey(e.target.value)}
                placeholder="Ex: F# Menor, C Maior"
                className="w-full bg-[#0B0E11] border border-[#2A2F36] rounded-lg px-3 py-2.5 text-white font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* PROCESS LEVEL SELECTOR */}
            <div>
              <label className="text-cyan-400 font-bold block mb-1">Nível do Processo (Etapa Atual) *</label>
              <select
                value={formProcessLevel}
                onChange={(e) => setFormProcessLevel(e.target.value as ProcessLevel)}
                className="w-full bg-[#0B0E11] border border-cyan-500/50 rounded-lg px-3 py-2.5 text-cyan-300 font-bold focus:outline-none focus:border-cyan-400"
              >
                <option value="Nível 1: Gravação / Pré-Mix">🎙️ Nível 1: Gravação / Pré-Mix</option>
                <option value="Nível 2: Mixagem">🎛️ Nível 2: Mixagem</option>
                <option value="Nível 3: Masterização">💿 Nível 3: Masterização</option>
                <option value="Nível 4: Finalização / Entrega">✅ Nível 4: Finalização / Entrega</option>
              </select>
            </div>

            {/* DEADLINE DATE */}
            <div>
              <label className="text-orange-400 font-bold block mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Data Limite de Entrega (Prazo Final) *
              </label>
              <input
                type="date"
                required
                value={formDeadline}
                onChange={(e) => setFormDeadline(e.target.value)}
                className="w-full bg-[#0B0E11] border border-orange-500/40 rounded-lg px-3 py-2.5 text-white font-mono focus:outline-none focus:border-orange-400"
              />
            </div>

            {/* PRIORITY */}
            <div>
              <label className="text-gray-400 font-bold block mb-1">Prioridade</label>
              <select
                value={formPriority}
                onChange={(e) => setFormPriority(e.target.value as ProjectPriority)}
                className="w-full bg-[#0B0E11] border border-[#2A2F36] rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Normal">Normal</option>
                <option value="Alta">Alta</option>
                <option value="Urgente">🚨 Urgente (Prioridade Máxima)</option>
                <option value="Baixa">Baixa</option>
              </select>
            </div>

            {/* CLIENT CONTACT */}
            <div>
              <label className="text-gray-400 font-bold block mb-1">Contato do Cliente / WhatsApp</label>
              <input
                type="text"
                value={formClientContact}
                onChange={(e) => setFormClientContact(e.target.value)}
                placeholder="Ex: +244 923 000 000 ou email"
                className="w-full bg-[#0B0E11] border border-[#2A2F36] rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-gray-400 font-bold block mb-1">Faixas de Referência</label>
              <input
                type="text"
                value={formRefTracks}
                onChange={(e) => setFormRefTracks(e.target.value)}
                placeholder="Ex: Burna Boy - City Boys / Travis Scott"
                className="w-full bg-[#0B0E11] border border-[#2A2F36] rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-gray-400 font-bold block mb-1">Anotações da Mixagem / Instruções do Cliente</label>
              <textarea
                rows={2}
                value={formNotes}
                onChange={(e) => setFormNotes(e.target.value)}
                placeholder="Ex: Vocal precisa de corte em 320Hz. Cliente pediu master a -14 LUFS para Spotify..."
                className="w-full bg-[#0B0E11] border border-[#2A2F36] rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 rounded-lg bg-[#0B0E11] hover:bg-[#1E2329] border border-[#2A2F36] text-xs font-semibold text-gray-300 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              {editingId ? 'Salvar Alterações' : 'Criar Projeto & Iniciar Sessão'}
            </button>
          </div>
        </form>
      )}

      {/* Projects List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((proj) => {
          const isActive = proj.id === activeProjectId;
          const deadlineStatus = getProjectDeadlineStatus(proj.deadline, proj.status);
          const currentProcessLevel = proj.processLevel || (proj.status === 'Finalizado' ? 'Nível 4: Finalização / Entrega' : proj.status === 'Em Master' ? 'Nível 3: Masterização' : 'Nível 2: Mixagem');

          return (
            <div
              key={proj.id}
              className={`rounded-2xl border p-5 space-y-4 transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-[#161C24] border-cyan-500 shadow-2xl ring-1 ring-cyan-500/50'
                  : 'bg-[#15191E] border-[#2A2F36] hover:border-gray-500'
              }`}
            >
              <div className="space-y-3.5">
                {/* Top Badges & Actions */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {/* Process Level Badge */}
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                        currentProcessLevel === 'Nível 1: Gravação / Pré-Mix' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' :
                        currentProcessLevel === 'Nível 2: Mixagem' ? 'bg-blue-500/20 text-blue-300 border-blue-500/40' :
                        currentProcessLevel === 'Nível 3: Masterização' ? 'bg-orange-500/20 text-orange-300 border-orange-500/40' :
                        'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      }`}>
                        {currentProcessLevel}
                      </span>

                      {/* Deadline Countdown Badge */}
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${deadlineStatus.badgeColor}`}>
                        {deadlineStatus.label}
                      </span>

                      {proj.priority === 'Urgente' && (
                        <span className="text-[9px] font-mono font-black px-1.5 py-0.5 rounded bg-red-500 text-black">
                          URGENTE
                        </span>
                      )}

                      {isActive && (
                        <span className="text-[9px] px-2 py-0.5 rounded bg-cyan-500 text-black font-extrabold">
                          SESSÃO ATIVA
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-extrabold text-white truncate">{proj.name}</h3>
                    <p className="text-xs text-gray-400 truncate">{proj.artist}</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleStartEdit(proj)}
                      className="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-[#0B0E11] transition-colors cursor-pointer"
                      title="Editar"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(proj.id)}
                      className="p-1.5 rounded-md text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                      title="Excluir"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Specs pill */}
                <div className="flex items-center gap-2 text-xs font-mono text-gray-300">
                  <span className="px-2 py-0.5 rounded bg-[#0B0E11] border border-[#2A2F36]">{proj.genre}</span>
                  <span className="px-2 py-0.5 rounded bg-[#0B0E11] border border-[#2A2F36] text-emerald-400 font-bold">{proj.bpm} BPM</span>
                  <span className="px-2 py-0.5 rounded bg-[#0B0E11] border border-[#2A2F36] text-orange-400">{proj.key}</span>
                </div>

                {/* Interactive Process Level Fast-Switcher */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-mono text-gray-400 uppercase font-bold">
                    Avançar Nível do Processo:
                  </span>
                  <div className="grid grid-cols-4 gap-1 text-[9px] font-mono">
                    {[
                      { id: 'Nível 1: Gravação / Pré-Mix' as ProcessLevel, label: '1. Pré-Mix' },
                      { id: 'Nível 2: Mixagem' as ProcessLevel, label: '2. Mix' },
                      { id: 'Nível 3: Masterização' as ProcessLevel, label: '3. Master' },
                      { id: 'Nível 4: Finalização / Entrega' as ProcessLevel, label: '4. Pronto' }
                    ].map(st => {
                      const isCurrent = currentProcessLevel === st.id;
                      return (
                        <button
                          key={st.id}
                          onClick={() => handleQuickChangeLevel(proj.id, st.id)}
                          className={`py-1.5 rounded text-center font-bold transition-all cursor-pointer border ${
                            isCurrent
                              ? 'bg-cyan-500 text-black border-cyan-400 shadow-sm'
                              : 'bg-[#0B0E11] text-gray-400 hover:text-white border-[#2A2F36]'
                          }`}
                          title={`Mudar para ${st.id}`}
                        >
                          {st.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1">
                    <span>Progresso Geral</span>
                    <span className="font-mono text-cyan-400 font-bold">{proj.mixProgress || 0}%</span>
                  </div>
                  <div className="h-1.5 bg-[#0B0E11] border border-[#2A2F36] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-300"
                      style={{ width: `${proj.mixProgress || 0}%` }}
                    />
                  </div>
                </div>

                {/* Deadline and Contact Details */}
                <div className="p-2.5 rounded-lg bg-[#0B0E11] border border-[#22272F] space-y-1 text-[11px] text-gray-400">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-gray-400">
                      <Calendar className="w-3 h-3 text-orange-400" />
                      Prazo:
                    </span>
                    <span className="font-mono text-white font-bold">{proj.deadline || 'Não especificado'}</span>
                  </div>
                  {proj.clientContact && (
                    <div className="flex items-center justify-between text-[10px] text-gray-500 pt-0.5 border-t border-[#181D24]">
                      <span>Cliente:</span>
                      <span className="text-cyan-400 truncate max-w-[150px]">{proj.clientContact}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                {isActive ? (
                  <div className="w-full py-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 text-xs font-bold flex items-center justify-center gap-2 border border-emerald-500/30">
                    <Check className="w-4 h-4" />
                    <span>Sessão Carregada no Painel</span>
                  </div>
                ) : (
                  <button
                    onClick={() => onSelectProject(proj.id)}
                    className="w-full py-2.5 rounded-xl bg-[#0B0E11] hover:bg-cyan-600 hover:text-white text-gray-300 text-xs font-bold transition-all flex items-center justify-center gap-2 border border-[#2A2F36] cursor-pointer"
                  >
                    <span>Carregar Este Projeto</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* GitHub Export Modal */}
      <GitHubExportModal
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
      />
    </div>
  );
};
