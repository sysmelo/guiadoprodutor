import React, { useState } from 'react';
import { Project } from '../types';
import { FolderKanban, Plus, Trash2, Edit3, Check, Music, Download, Upload, Copy, Sparkles, Clock, ArrowRight } from 'lucide-react';

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

  // Form State
  const [formName, setFormName] = useState('');
  const [formArtist, setFormArtist] = useState('');
  const [formGenre, setFormGenre] = useState('Afrobeat');
  const [formBpm, setFormBpm] = useState<number>(120);
  const [formKey, setFormKey] = useState('C Menor');
  const [formStatus, setFormStatus] = useState<'Em Mixagem' | 'Em Master' | 'Finalizado'>('Em Mixagem');
  const [formNotes, setFormNotes] = useState('');
  const [formRefTracks, setFormRefTracks] = useState('');

  const resetForm = () => {
    setFormName('');
    setFormArtist('');
    setFormGenre('Afrobeat');
    setFormBpm(120);
    setFormKey('C Menor');
    setFormStatus('Em Mixagem');
    setFormNotes('');
    setFormRefTracks('');
    setIsCreating(false);
    setEditingId(null);
  };

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

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
            status: formStatus,
            notes: formNotes,
            referenceTracks: formRefTracks
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
        status: formStatus,
        notes: formNotes,
        referenceTracks: formRefTracks,
        checklist: {},
        mixProgress: 0,
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
    setFormStatus(proj.status);
    setFormNotes(proj.notes || '');
    setFormRefTracks(proj.referenceTracks || '');
    setIsCreating(true);
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

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="rounded-xl bg-[#15191E] border border-[#2A2F36] p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold">
              <FolderKanban className="w-3.5 h-3.5" />
              GERENCIAMENTO OFFLINE DE SESSÕES DE ESTÚDIO
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              Meus Projetos & Sessões
            </h1>
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
              Todos os seus projetos, BPMs, tons, anotações de mix e status salvos de forma 100% segura no seu navegador (LocalStorage).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                resetForm();
                setIsCreating(true);
              }}
              className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Projeto</span>
            </button>

            <button
              onClick={handleExportBackup}
              title="Baixar cópia de segurança em JSON"
              className="px-3.5 py-2 rounded-lg bg-[#0B0E11] hover:bg-[#1E2329] text-gray-300 text-xs font-semibold flex items-center gap-2 border border-[#2A2F36] transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Backup JSON</span>
            </button>

            <label className="cursor-pointer px-3.5 py-2 rounded-lg bg-[#0B0E11] hover:bg-[#1E2329] text-gray-300 text-xs font-semibold flex items-center gap-2 border border-[#2A2F36] transition-colors">
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
      </div>

      {/* Form Drawer / Modal when Creating or Editing */}
      {isCreating && (
        <form onSubmit={handleCreateNew} className="rounded-xl bg-[#15191E] border border-cyan-500/40 p-6 md:p-7 space-y-6 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between border-b border-[#2A2F36] pb-4">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>{editingId ? 'Editar Detalhes do Projeto' : 'Cadastrar Novo Projeto de Áudio'}</span>
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

            <div>
              <label className="text-gray-400 font-bold block mb-1">Status Atual</label>
              <select
                value={formStatus}
                onChange={(e) => setFormStatus(e.target.value as typeof formStatus)}
                className="w-full bg-[#0B0E11] border border-[#2A2F36] rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Em Mixagem">Em Mixagem</option>
                <option value="Em Master">Em Master</option>
                <option value="Finalizado">Finalizado</option>
              </select>
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
              <label className="text-gray-400 font-bold block mb-1">Anotações da Mixagem</label>
              <textarea
                rows={2}
                value={formNotes}
                onChange={(e) => setFormNotes(e.target.value)}
                placeholder="Ex: Vocal precisa de corte em 320Hz. 808 sidechain no Kick..."
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
              className="px-6 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              {editingId ? 'Salvar Alterações' : 'Criar Projeto'}
            </button>
          </div>
        </form>
      )}

      {/* Projects List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => {
          const isActive = proj.id === activeProjectId;
          return (
            <div
              key={proj.id}
              className={`rounded-xl border p-5 space-y-4 transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-[#181D23] border-cyan-500 shadow-xl ring-1 ring-cyan-500/40'
                  : 'bg-[#15191E] border-[#2A2F36] hover:border-gray-500'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                        proj.status === 'Finalizado' ? 'bg-emerald-500/20 text-emerald-400' :
                        proj.status === 'Em Master' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-cyan-500/20 text-cyan-400'
                      }`}>
                        {proj.status}
                      </span>
                      {isActive && (
                        <span className="text-[9px] px-2 py-0.5 rounded bg-cyan-500 text-black font-bold">
                          ATIVO
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-extrabold text-white mt-1.5 truncate">{proj.name}</h3>
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
                  <span className="px-2 py-1 rounded bg-[#0B0E11] border border-[#2A2F36]">{proj.genre}</span>
                  <span className="px-2 py-1 rounded bg-[#0B0E11] border border-[#2A2F36] text-emerald-400 font-bold">{proj.bpm} BPM</span>
                  <span className="px-2 py-1 rounded bg-[#0B0E11] border border-[#2A2F36] text-orange-400">{proj.key}</span>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1">
                    <span>Progresso da Mix</span>
                    <span className="font-mono text-white font-bold">{proj.mixProgress || 0}%</span>
                  </div>
                  <div className="h-1.5 bg-[#0B0E11] border border-[#2A2F36] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                      style={{ width: `${proj.mixProgress || 0}%` }}
                    />
                  </div>
                </div>

                {/* Notes */}
                {proj.notes && (
                  <p className="text-[11px] text-gray-400 bg-[#0B0E11] p-2.5 rounded-lg border border-[#2A2F36] line-clamp-2">
                    {proj.notes}
                  </p>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-2">
                {isActive ? (
                  <div className="w-full py-2.5 rounded-lg bg-emerald-500/15 text-emerald-400 text-xs font-bold flex items-center justify-center gap-2 border border-emerald-500/30">
                    <Check className="w-4 h-4" />
                    <span>Sessão Aberta na Aplicação</span>
                  </div>
                ) : (
                  <button
                    onClick={() => onSelectProject(proj.id)}
                    className="w-full py-2.5 rounded-lg bg-[#0B0E11] hover:bg-cyan-600 hover:text-white text-gray-300 text-xs font-bold transition-all flex items-center justify-center gap-2 border border-[#2A2F36] cursor-pointer"
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
    </div>
  );
};

