import React, { useState, useEffect, useRef } from 'react';
import {
  StickyNote,
  CheckSquare,
  Square,
  Plus,
  Trash2,
  Save,
  Copy,
  Check,
  Sparkles,
  Tag,
  FolderKanban,
  FileText,
  Sliders,
  AlertCircle,
  Clock,
  Send,
  ListTodo,
  CheckCircle2,
  CornerDownLeft,
  Flame,
  Radio,
  Music,
  Share2,
  Headphones,
  RotateCcw
} from 'lucide-react';
import { Project, ProjectTodoItem } from '../types';

interface ProjectNotesSectionProps {
  activeProject: Project | null;
  projects?: Project[];
  onUpdateProject?: (project: Project) => void;
  onSelectProject?: (id: string) => void;
}

export const ProjectNotesSection: React.FC<ProjectNotesSectionProps> = ({
  activeProject,
  projects = [],
  onUpdateProject,
  onSelectProject
}) => {
  // Active Tab: 'notes' (Anotações Livres) | 'todos' (Lista de Tarefas) | 'delivery' (Entrega & Referências)
  const [activeTab, setActiveTab] = useState<'notes' | 'todos' | 'delivery'>('notes');

  // Text Notes State
  const [notesText, setNotesText] = useState<string>(activeProject?.notes || '');
  const [refTracks, setRefTracks] = useState<string>(activeProject?.referenceTracks || '');
  const [exportNotes, setExportNotes] = useState<string>(activeProject?.exportNotes || '');
  const [clientContact, setClientContact] = useState<string>(activeProject?.clientContact || '');
  
  // TODOs State
  const [todos, setTodos] = useState<ProjectTodoItem[]>(activeProject?.projectTodos || []);
  const [newTodoText, setNewTodoText] = useState<string>('');
  const [newTodoCategory, setNewTodoCategory] = useState<'Mix' | 'Master' | 'Vocal' | 'Gravação' | 'Arranjo' | 'Geral'>('Mix');
  const [newTodoPriority, setNewTodoPriority] = useState<'Normal' | 'Alta' | 'Urgente'>('Normal');
  const [todoFilter, setTodoFilter] = useState<'ALL' | 'PENDING' | 'DONE' | string>('ALL');

  // Status & Feedback
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [lastSavedTime, setLastSavedTime] = useState<string>('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync state when activeProject changes
  useEffect(() => {
    if (activeProject) {
      setNotesText(activeProject.notes || '');
      setRefTracks(activeProject.referenceTracks || '');
      setExportNotes(activeProject.exportNotes || '');
      setClientContact(activeProject.clientContact || '');
      setTodos(activeProject.projectTodos || []);
      setSaveStatus('saved');
    }
  }, [activeProject?.id]);

  // Debounced auto-save for notes
  useEffect(() => {
    if (!activeProject || !onUpdateProject) return;

    // Check if anything changed compared to current activeProject
    const hasNotesChanged = notesText !== (activeProject.notes || '');
    const hasRefChanged = refTracks !== (activeProject.referenceTracks || '');
    const hasExportChanged = exportNotes !== (activeProject.exportNotes || '');
    const hasContactChanged = clientContact !== (activeProject.clientContact || '');

    if (!hasNotesChanged && !hasRefChanged && !hasExportChanged && !hasContactChanged) {
      return;
    }

    setSaveStatus('unsaved');
    const timer = setTimeout(() => {
      setSaveStatus('saving');
      const updated: Project = {
        ...activeProject,
        notes: notesText,
        referenceTracks: refTracks,
        exportNotes: exportNotes,
        clientContact: clientContact,
        lastNotesModified: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      onUpdateProject(updated);
      setSaveStatus('saved');
      setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 800);

    return () => clearTimeout(timer);
  }, [notesText, refTracks, exportNotes, clientContact, activeProject, onUpdateProject]);

  // Save manual trigger
  const handleManualSave = () => {
    if (!activeProject || !onUpdateProject) return;
    setSaveStatus('saving');
    const updated: Project = {
      ...activeProject,
      notes: notesText,
      referenceTracks: refTracks,
      exportNotes: exportNotes,
      clientContact: clientContact,
      projectTodos: todos,
      lastNotesModified: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    onUpdateProject(updated);
    setSaveStatus('saved');
    setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };

  // Quick Tags
  const handleInsertTag = (tag: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setNotesText(prev => `${prev ? prev + '\n' : ''}${tag}: `);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentVal = notesText;
    const insertVal = `\n${tag}: `;
    const updated = currentVal.substring(0, start) + insertVal + currentVal.substring(end);
    
    setNotesText(updated);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + insertVal.length, start + insertVal.length);
    }, 50);
  };

  // Quick Templates
  const handleApplyTemplate = (templateType: 'mix_review' | 'vocal_notes' | 'artist_feedback' | 'master_target') => {
    let templateContent = '';

    if (templateType === 'mix_review') {
      templateContent = `\n--- 🎛️ REVISÃO GERAL DE MIXAGEM (${activeProject?.genre || 'Geral'}) ---
[BALANÇO & GANHOS]
- Kick & 808: Ajustar relação de ganho e checar mascaramento em 50-90Hz.
- Vocais Principais: Nível de automação nos versos vs refrão.
- Percussões & Hi-Hats: Panning estéreo e corte de altas ressonantes.

[DINÂMICA & ESPACIALIDADE]
- Compressor de Bus: 2-3dB de Gain Reduction em 4:1.
- Reverbs / Delays: Sidechain ducking ativo para não embolar o centro.`;
    } else if (templateType === 'vocal_notes') {
      templateContent = `\n--- 🎙️ OBSERVAÇÕES DE GRAVAÇÃO & TRATAMENTO VOCAL ---
[CADÊNCIA VOCAL]
- Microfone utilizado: Shure SM7B / Condensador.
- Ganho de entrada (Preamp): Picos em -12dBFS.
- De-Esser: Atenuar 6.5kHz a 8.2kHz (-4dB máx).
- Afinação / Melodyne: Ajustar formantes e transições sutis.`;
    } else if (templateType === 'artist_feedback') {
      templateContent = `\n--- 💬 SOLICITAÇÕES DO ARTISTA / CLIENTE ---
- Data do Feedback: ${new Date().toLocaleDateString()}
- Alteração 1: Aumentar volume da voz no Refrão 2 (+1.5dB).
- Alteração 2: Mais brilho na tarola e adicionar delay com throw no final das frases.
- Status: Em andamento.`;
    } else if (templateType === 'master_target') {
      templateContent = `\n--- 🔥 METAS DE MASTERIZAÇÃO & EXPORTAÇÃO ---
- Alvo de Loudness: -9.0 LUFS Integrado (Short-term máx: -7.5 LUFS).
- True Peak Ceiling: -1.0 dBTP (Segurança para streaming).
- Faixa de Subgrave (Mono): 20Hz - 110Hz estritamente mono.
- Arquivos para Entrega: WAV 24bit/48kHz Master + Playback + Acapella.`;
    }

    setNotesText(prev => prev ? `${prev}\n${templateContent}` : templateContent.trim());
  };

  // Copy to Clipboard
  const handleCopyNotes = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(label);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  // TODO Management
  const handleAddTodo = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newTodoText.trim() || !activeProject) return;

    const newTodo: ProjectTodoItem = {
      id: `todo-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      text: newTodoText.trim(),
      completed: false,
      category: newTodoCategory,
      priority: newTodoPriority,
      createdAt: new Date().toLocaleDateString([], { day: '2-digit', month: '2-digit' })
    };

    const updatedTodos = [newTodo, ...todos];
    setTodos(updatedTodos);
    setNewTodoText('');

    if (onUpdateProject) {
      onUpdateProject({
        ...activeProject,
        projectTodos: updatedTodos
      });
    }
  };

  const handleToggleTodo = (id: string) => {
    if (!activeProject || !onUpdateProject) return;

    const updatedTodos = todos.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTodos(updatedTodos);

    onUpdateProject({
      ...activeProject,
      projectTodos: updatedTodos
    });
  };

  const handleDeleteTodo = (id: string) => {
    if (!activeProject || !onUpdateProject) return;

    const updatedTodos = todos.filter(t => t.id !== id);
    setTodos(updatedTodos);

    onUpdateProject({
      ...activeProject,
      projectTodos: updatedTodos
    });
  };

  const handleAddGenreRecommendedTodos = () => {
    if (!activeProject || !onUpdateProject) return;

    const genre = activeProject.genre || 'Geral';
    let suggestedTasks: { text: string; category: 'Mix' | 'Master' | 'Vocal' | 'Gravação' | 'Arranjo' | 'Geral'; priority: 'Normal' | 'Alta' | 'Urgente' }[] = [];

    if (genre.toLowerCase().includes('kuduro')) {
      suggestedTasks = [
        { text: 'Ajustar Sidechain agressivo do Kick no Sub/Bassline', category: 'Mix', priority: 'Alta' },
        { text: 'Passar Dikanza e Apito com clipper suave para não furar a mix', category: 'Mix', priority: 'Normal' },
        { text: 'Checar se vocais cortam o instrumental com presença em 3-5kHz', category: 'Vocal', priority: 'Alta' },
        { text: 'Masterizar em -8.5 LUFS com True Peak em -0.5 dBTP para sistemas de som', category: 'Master', priority: 'Urgente' }
      ];
    } else if (genre.toLowerCase().includes('afrobeat')) {
      suggestedTasks = [
        { text: 'Humanizar Shakers e Congas com leve atraso de milissegundos', category: 'Arranjo', priority: 'Normal' },
        { text: 'Vocal Lead aveludado com saturação analógica em fita', category: 'Vocal', priority: 'Alta' },
        { text: 'EQ cirúrgico no Sub-Bass para abrir espaço para o Kick grave', category: 'Mix', priority: 'Alta' },
        { text: 'Master suave a -12 LUFS preservando dinâmica e calor orgânico', category: 'Master', priority: 'Normal' }
      ];
    } else if (genre.toLowerCase().includes('trap') || genre.toLowerCase().includes('drill')) {
      suggestedTasks = [
        { text: 'Checar afinação do 808 de acordo com o tom da música', category: 'Mix', priority: 'Urgente' },
        { text: 'Autotune rápido (Retune speed 0-10) com De-Esser preciso', category: 'Vocal', priority: 'Alta' },
        { text: 'Soft Clipper no Master Bus antes do Limiter final', category: 'Master', priority: 'Alta' },
        { text: 'Stereo Spreader nos sintetizadores e manter 808 em Mono abaixo de 120Hz', category: 'Mix', priority: 'Normal' }
      ];
    } else {
      suggestedTasks = [
        { text: 'Limpar frequências graves desnecessárias (High-Pass em canais não-graves)', category: 'Mix', priority: 'Alta' },
        { text: 'Equilibrar ganhos com medidor VU em -18dBFS', category: 'Mix', priority: 'Normal' },
        { text: 'Testar mix em Mono para verificar cancelamento de fase', category: 'Master', priority: 'Urgente' },
        { text: 'Conferir níveis de loudness e True Peak para Spotify / Apple Music', category: 'Master', priority: 'Alta' }
      ];
    }

    const newTodos: ProjectTodoItem[] = suggestedTasks.map((t, idx) => ({
      id: `todo-gen-${Date.now()}-${idx}`,
      text: t.text,
      completed: false,
      category: t.category,
      priority: t.priority,
      createdAt: new Date().toLocaleDateString([], { day: '2-digit', month: '2-digit' })
    }));

    const merged = [...newTodos, ...todos];
    setTodos(merged);
    onUpdateProject({
      ...activeProject,
      projectTodos: merged
    });
  };

  const completedCount = todos.filter(t => t.completed).length;
  const totalCount = todos.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const filteredTodos = todos.filter(t => {
    if (todoFilter === 'PENDING') return !t.completed;
    if (todoFilter === 'DONE') return t.completed;
    if (todoFilter !== 'ALL') return t.category === todoFilter;
    return true;
  });

  return (
    <div className="rounded-2xl bg-[#0E1116] border border-cyan-500/30 p-5 md:p-6 shadow-2xl space-y-5 relative overflow-hidden">
      {/* Background Lighting Gradients */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER: Title, Active Project Switcher & Sync Status */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#222731] pb-4 relative z-10">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/25 to-blue-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)] shrink-0">
            <StickyNote className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_8px_rgba(6,182,212,0.2)]">
                Caderno de Estúdio & TODOs
              </span>
              
              {/* Storage Sync Badge */}
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#141820] border border-[#242A34] text-[10px] font-mono">
                <span className={`w-1.5 h-1.5 rounded-full ${
                  saveStatus === 'saving' ? 'bg-amber-400 animate-ping' :
                  saveStatus === 'saved' ? 'bg-emerald-400' : 'bg-orange-400'
                }`} />
                <span className={
                  saveStatus === 'saving' ? 'text-amber-300' :
                  saveStatus === 'saved' ? 'text-emerald-300 font-bold' : 'text-orange-300'
                }>
                  {saveStatus === 'saving' ? 'Gravando...' :
                   saveStatus === 'saved' ? 'Sincronizado no LocalStorage' : 'Alterações pendentes'}
                </span>
                {lastSavedTime && (
                  <span className="text-gray-500">({lastSavedTime})</span>
                )}
              </div>
            </div>

            <h3 className="text-lg md:text-xl font-black text-white tracking-tight mt-1 flex items-center gap-2">
              <span>Anotações & Tarefas da Sessão:</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-amber-200 font-extrabold truncate max-w-[220px] sm:max-w-[320px]">
                {activeProject?.name || 'Nenhum Projeto Ativo'}
              </span>
            </h3>
          </div>
        </div>

        {/* Project Context / Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {projects.length > 0 && onSelectProject && (
            <div className="flex items-center gap-2 bg-[#12151B] border border-[#242A34] rounded-xl px-2.5 py-1.5">
              <FolderKanban className="w-3.5 h-3.5 text-cyan-400" />
              <select
                value={activeProject?.id || ''}
                onChange={(e) => onSelectProject(e.target.value)}
                className="bg-transparent text-xs font-mono font-bold text-gray-200 focus:outline-none cursor-pointer"
              >
                {projects.map(p => (
                  <option key={p.id} value={p.id} className="bg-[#11141A] text-white">
                    {p.name} ({p.artist}) — {p.genre}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={handleManualSave}
            title="Salvar imediatamente no LocalStorage"
            className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-mono font-bold border border-cyan-500/40 transition-all flex items-center gap-1.5 shadow-[0_0_10px_rgba(6,182,212,0.2)] cursor-pointer"
          >
            {saveStatus === 'saving' ? (
              <Clock className="w-3.5 h-3.5 animate-spin text-cyan-400" />
            ) : (
              <Save className="w-3.5 h-3.5 text-cyan-400" />
            )}
            <span>Salvar</span>
          </button>
        </div>
      </div>

      {/* TOP METRICS & PROGRESS (For TODOs) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-[#0B0E12] border border-[#1F242E] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[9px] font-mono text-gray-500 uppercase font-bold block">Anotações</span>
              <span className="text-xs font-bold text-gray-200">
                {notesText.trim() ? `${notesText.trim().split(/\s+/).length} palavras` : 'Sem anotações'}
              </span>
            </div>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
            {notesText.length} caracteres
          </span>
        </div>

        <div className="p-3 rounded-xl bg-[#0B0E12] border border-[#1F242E] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <ListTodo className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[9px] font-mono text-gray-500 uppercase font-bold block">Tarefas Concluídas</span>
              <span className="text-xs font-bold text-gray-200">
                {completedCount} de {totalCount} concluídas
              </span>
            </div>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            {progressPercent}%
          </span>
        </div>

        <div className="p-3 rounded-xl bg-[#0B0E12] border border-[#1F242E] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[9px] font-mono text-gray-500 uppercase font-bold block">Gênero & BPM</span>
              <span className="text-xs font-bold text-gray-200 truncate max-w-[120px]">
                {activeProject?.genre || 'Indefinido'}
              </span>
            </div>
          </div>
          <span className="text-[10px] font-mono text-purple-400 font-bold bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
            {activeProject?.bpm || 120} BPM
          </span>
        </div>
      </div>

      {/* NAVIGATION TABS (Notes vs. TODOs vs. Delivery Info) */}
      <div className="flex items-center gap-2 border-b border-[#222731] pb-2 overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setActiveTab('notes')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
            activeTab === 'notes'
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
              : 'bg-[#12151B] border-[#1F242E] text-gray-400 hover:text-gray-200 hover:bg-[#161B23]'
          }`}
        >
          <FileText className={`w-3.5 h-3.5 ${activeTab === 'notes' ? 'text-cyan-400' : 'text-gray-500'}`} />
          <span>Observações & Diário de Mix</span>
          {notesText.trim() && (
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('todos')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
            activeTab === 'todos'
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
              : 'bg-[#12151B] border-[#1F242E] text-gray-400 hover:text-gray-200 hover:bg-[#161B23]'
          }`}
        >
          <CheckSquare className={`w-3.5 h-3.5 ${activeTab === 'todos' ? 'text-emerald-400' : 'text-gray-500'}`} />
          <span>Checklist de Tarefas (TODOs)</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
            activeTab === 'todos' ? 'bg-emerald-500/30 text-white font-black' : 'bg-[#181D25] text-gray-500'
          }`}>
            {completedCount}/{totalCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('delivery')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
            activeTab === 'delivery'
              ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-[0_0_12px_rgba(168,85,247,0.25)]'
              : 'bg-[#12151B] border-[#1F242E] text-gray-400 hover:text-gray-200 hover:bg-[#161B23]'
          }`}
        >
          <Share2 className={`w-3.5 h-3.5 ${activeTab === 'delivery' ? 'text-purple-400' : 'text-gray-500'}`} />
          <span>Referências & Entrega</span>
        </button>
      </div>

      {/* TAB 1: FREE-FORM TEXT NOTES */}
      {activeTab === 'notes' && (
        <div className="space-y-3.5 animate-in fade-in">
          {/* Quick Tag Tools & Templates */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-[#090C0F] border border-[#1F242E]">
            {/* Tag Badges */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-mono text-gray-500 uppercase font-bold flex items-center gap-1 mr-1">
                <Tag className="w-3 h-3 text-cyan-400" />
                Tags Rápidas:
              </span>
              {[
                { tag: '[VOCAL]', color: 'text-rose-300 bg-rose-500/10 border-rose-500/30 hover:border-rose-400' },
                { tag: '[808/BASS]', color: 'text-purple-300 bg-purple-500/10 border-purple-500/30 hover:border-purple-400' },
                { tag: '[KICK/PERC]', color: 'text-orange-300 bg-orange-500/10 border-orange-500/30 hover:border-orange-400' },
                { tag: '[REVERB/DELAY]', color: 'text-sky-300 bg-sky-500/10 border-sky-500/30 hover:border-sky-400' },
                { tag: '[MASTERING]', color: 'text-fuchsia-300 bg-fuchsia-500/10 border-fuchsia-500/30 hover:border-fuchsia-400' },
                { tag: '[AUTOMAÇÃO]', color: 'text-amber-300 bg-amber-500/10 border-amber-500/30 hover:border-amber-400' },
                { tag: '[CORREÇÃO]', color: 'text-red-300 bg-red-500/10 border-red-500/30 hover:border-red-400' },
                { tag: '[FEEDBACK CLIENTE]', color: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-400' }
              ].map(({ tag, color }) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleInsertTag(tag)}
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border transition-all cursor-pointer ${color}`}
                >
                  + {tag}
                </button>
              ))}
            </div>

            {/* Template Dropdown / Buttons */}
            <div className="flex items-center gap-1.5 ml-auto">
              <span className="text-[10px] font-mono text-gray-500 uppercase font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Modelos:
              </span>
              <button
                type="button"
                onClick={() => handleApplyTemplate('mix_review')}
                className="text-[10px] font-mono text-gray-300 hover:text-white bg-[#151920] hover:bg-[#1C222C] px-2 py-1 rounded border border-[#242A34] transition-colors cursor-pointer"
              >
                Revisão Mix
              </button>
              <button
                type="button"
                onClick={() => handleApplyTemplate('vocal_notes')}
                className="text-[10px] font-mono text-gray-300 hover:text-white bg-[#151920] hover:bg-[#1C222C] px-2 py-1 rounded border border-[#242A34] transition-colors cursor-pointer"
              >
                Vocal Tracking
              </button>
              <button
                type="button"
                onClick={() => handleApplyTemplate('artist_feedback')}
                className="text-[10px] font-mono text-gray-300 hover:text-white bg-[#151920] hover:bg-[#1C222C] px-2 py-1 rounded border border-[#242A34] transition-colors cursor-pointer"
              >
                Feedback Artista
              </button>
              <button
                type="button"
                onClick={() => handleApplyTemplate('master_target')}
                className="text-[10px] font-mono text-gray-300 hover:text-white bg-[#151920] hover:bg-[#1C222C] px-2 py-1 rounded border border-[#242A34] transition-colors cursor-pointer"
              >
                Metas Master
              </button>
            </div>
          </div>

          {/* Large Studio Text Area */}
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              placeholder="Digite aqui as observações críticas de mixagem, frequências problemáticas, ajustes de compressor, solicitações do artista ou ideias de arranjo para esta faixa..."
              className="w-full h-64 p-4 rounded-xl bg-[#090C0F] border border-[#222731] focus:border-cyan-400 text-sm font-mono text-gray-100 placeholder-gray-600 focus:outline-none transition-all leading-relaxed shadow-inner resize-y custom-scrollbar"
            />

            {/* Quick Action Toolbar inside/bottom of Textarea */}
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleCopyNotes(notesText, 'all_notes')}
                title="Copiar todas as anotações"
                className="px-2.5 py-1 rounded-lg bg-[#151920]/90 hover:bg-cyan-600 hover:text-white text-cyan-300 text-xs font-mono font-bold border border-cyan-500/30 backdrop-blur transition-all flex items-center gap-1.5 cursor-pointer shadow"
              >
                {copiedSection === 'all_notes' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar</span>
                  </>
                )}
              </button>

              {notesText && (
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Tem certeza de que deseja limpar todas as anotações deste projeto?')) {
                      setNotesText('');
                    }
                  }}
                  title="Limpar anotações"
                  className="px-2 py-1 rounded-lg bg-[#151920]/90 hover:bg-red-600 hover:text-white text-gray-400 hover:text-white text-xs font-mono border border-gray-700 backdrop-blur transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE TODO CHECKLIST */}
      {activeTab === 'todos' && (
        <div className="space-y-4 animate-in fade-in">
          {/* Progress Bar & Summary */}
          <div className="p-3.5 rounded-xl bg-[#090C0F] border border-[#1F242E] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-gray-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Progresso das Tarefas da Sessão
              </span>
              <span className="font-mono text-emerald-400 font-extrabold">
                {completedCount} de {totalCount} concluídas ({progressPercent}%)
              </span>
            </div>
            
            <div className="w-full bg-[#161B23] h-2.5 rounded-full overflow-hidden border border-[#242A34]">
              <div
                className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Add New TODO Input Form */}
          <form onSubmit={handleAddTodo} className="flex flex-col sm:flex-row gap-2 bg-[#090C0F] p-3 rounded-xl border border-cyan-500/30 shadow-inner">
            <div className="flex-1 flex items-center gap-2 bg-[#12151B] border border-[#222731] focus-within:border-cyan-400 rounded-lg px-3 py-1.5">
              <Plus className="w-4 h-4 text-cyan-400 shrink-0" />
              <input
                type="text"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                placeholder="Ex: Corrigir ganho do vocal no Refrão 2, testar limiter FabFilter Pro-L2..."
                className="w-full bg-transparent text-xs text-gray-100 placeholder-gray-500 focus:outline-none font-sans"
              />
            </div>

            <div className="flex items-center gap-2">
              {/* Category selector */}
              <select
                value={newTodoCategory}
                onChange={(e) => setNewTodoCategory(e.target.value as any)}
                className="bg-[#12151B] border border-[#222731] text-xs font-mono font-bold text-gray-300 px-2.5 py-2 rounded-lg focus:outline-none cursor-pointer"
              >
                <option value="Mix">Mix</option>
                <option value="Master">Master</option>
                <option value="Vocal">Vocal</option>
                <option value="Gravação">Gravação</option>
                <option value="Arranjo">Arranjo</option>
                <option value="Geral">Geral</option>
              </select>

              {/* Priority selector */}
              <select
                value={newTodoPriority}
                onChange={(e) => setNewTodoPriority(e.target.value as any)}
                className={`text-xs font-mono font-bold px-2 py-2 rounded-lg border focus:outline-none cursor-pointer ${
                  newTodoPriority === 'Urgente' ? 'bg-red-500/20 text-red-300 border-red-500/40' :
                  newTodoPriority === 'Alta' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                  'bg-[#12151B] text-cyan-300 border-[#222731]'
                }`}
              >
                <option value="Normal">Normal</option>
                <option value="Alta">Alta</option>
                <option value="Urgente">Urgente</option>
              </select>

              <button
                type="submit"
                disabled={!newTodoText.trim()}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 disabled:opacity-40 disabled:pointer-events-none text-black font-extrabold text-xs transition-all shadow-[0_0_12px_rgba(6,182,212,0.3)] flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <span>Adicionar</span>
                <CornerDownLeft className="w-3 h-3" />
              </button>
            </div>
          </form>

          {/* Filters & Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'ALL', label: `Todas (${todos.length})` },
                { id: 'PENDING', label: `Pendentes (${todos.filter(t => !t.completed).length})` },
                { id: 'DONE', label: `Concluídas (${completedCount})` },
                { id: 'Mix', label: 'Mix' },
                { id: 'Master', label: 'Master' },
                { id: 'Vocal', label: 'Vocal' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setTodoFilter(f.id)}
                  className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                    todoFilter === f.id
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                      : 'bg-[#12151B] text-gray-400 border-[#222731] hover:text-gray-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Quick Generator Button */}
            <button
              type="button"
              onClick={handleAddGenreRecommendedTodos}
              className="text-[10px] font-mono text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 px-2.5 py-1 rounded-lg border border-amber-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>+ Gerar Tarefas de {activeProject?.genre || 'Mix'}</span>
            </button>
          </div>

          {/* TODOs Items List */}
          <div className="space-y-2 max-h-[320px] overflow-y-auto custom-scrollbar pr-1">
            {filteredTodos.length > 0 ? (
              filteredTodos.map((todo) => {
                const priorityBadge = {
                  Urgente: 'bg-red-500/20 text-red-300 border-red-500/40',
                  Alta: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
                  Normal: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20'
                }[todo.priority || 'Normal'];

                return (
                  <div
                    key={todo.id}
                    className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 group ${
                      todo.completed
                        ? 'bg-[#0B0E12]/80 border-[#1B202A] opacity-60'
                        : 'bg-[#12151B] border-[#222731] hover:border-cyan-500/40'
                    }`}
                  >
                    <div
                      onClick={() => handleToggleTodo(todo.id)}
                      className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                    >
                      <button
                        type="button"
                        className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all shrink-0 ${
                          todo.completed
                            ? 'bg-emerald-500 border-emerald-400 text-black shadow-[0_0_8px_rgba(16,185,129,0.4)]'
                            : 'bg-[#090C0F] border-gray-600 hover:border-cyan-400 text-transparent'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </button>

                      <div className="min-w-0 flex-1">
                        <p className={`text-xs font-medium leading-relaxed ${
                          todo.completed ? 'line-through text-gray-500' : 'text-gray-200'
                        }`}>
                          {todo.text}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {todo.category && (
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#181D25] text-gray-400 border border-[#242A34]">
                          {todo.category}
                        </span>
                      )}

                      {todo.priority && todo.priority !== 'Normal' && (
                        <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${priorityBadge}`}>
                          {todo.priority}
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => handleDeleteTodo(todo.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500/20 text-gray-500 hover:text-red-400 transition-all cursor-pointer"
                        title="Excluir tarefa"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center bg-[#090C0F] rounded-xl border border-[#1F242E] space-y-2">
                <ListTodo className="w-8 h-8 text-gray-600 mx-auto" />
                <p className="text-xs text-gray-400 font-medium">
                  {todoFilter === 'ALL' ? 'Nenhuma tarefa cadastrada para este projeto.' : 'Nenhuma tarefa encontrada com o filtro selecionado.'}
                </p>
                <p className="text-[11px] text-gray-500">
                  Adicione uma tarefa no campo acima ou clique em "Gerar Tarefas" para carregar as recomendações do gênero.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: CLIENT & DELIVERY REFERENCES */}
      {activeTab === 'delivery' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Reference Tracks */}
            <div className="space-y-1.5 bg-[#090C0F] p-4 rounded-xl border border-[#1F242E]">
              <label className="text-xs font-mono font-bold text-gray-300 flex items-center gap-1.5">
                <Headphones className="w-3.5 h-3.5 text-cyan-400" />
                Faixas de Referência (Mix / Master Reference)
              </label>
              <textarea
                value={refTracks}
                onChange={(e) => setRefTracks(e.target.value)}
                placeholder="Ex: Burna Boy - Last Last (para balanço de vocal), Travis Scott - FE!N (para peso do 808)..."
                className="w-full h-24 p-3 rounded-lg bg-[#12151B] border border-[#222731] focus:border-cyan-400 text-xs font-mono text-gray-200 placeholder-gray-600 focus:outline-none transition-all leading-relaxed resize-none custom-scrollbar"
              />
              <span className="text-[10px] text-gray-500 font-mono block">
                Músicas comerciais usadas como parâmetro A/B no estúdio.
              </span>
            </div>

            {/* Export & Delivery Formats */}
            <div className="space-y-1.5 bg-[#090C0F] p-4 rounded-xl border border-[#1F242E]">
              <label className="text-xs font-mono font-bold text-gray-300 flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-purple-400" />
                Instruções de Exportação & Entregáveis
              </label>
              <textarea
                value={exportNotes}
                onChange={(e) => setExportNotes(e.target.value)}
                placeholder="Ex: Entregar Master WAV 24-bit 48kHz (-14 LUFS), MP3 320kbps, Playback para show e Stems de vocais separados."
                className="w-full h-24 p-3 rounded-lg bg-[#12151B] border border-[#222731] focus:border-purple-400 text-xs font-mono text-gray-200 placeholder-gray-600 focus:outline-none transition-all leading-relaxed resize-none custom-scrollbar"
              />
              <span className="text-[10px] text-gray-500 font-mono block">
                Formatos exigidos pela distribuidora ou combinados com o artista.
              </span>
            </div>
          </div>

          {/* Client Contact Details */}
          <div className="bg-[#090C0F] p-4 rounded-xl border border-[#1F242E] space-y-2">
            <label className="text-xs font-mono font-bold text-gray-300 flex items-center gap-1.5">
              <FolderKanban className="w-3.5 h-3.5 text-emerald-400" />
              Contato do Cliente / Artista & Prazo
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={clientContact}
                onChange={(e) => setClientContact(e.target.value)}
                placeholder="Telefone / WhatsApp / E-mail do cliente..."
                className="bg-[#12151B] border border-[#222731] focus:border-emerald-400 rounded-lg px-3 py-2 text-xs font-mono text-gray-200 placeholder-gray-600 focus:outline-none"
              />
              <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#12151B] border border-[#222731] text-xs font-mono text-gray-400">
                <span>Prazo Final da Faixa:</span>
                <span className="text-amber-400 font-bold">{activeProject?.deadline || 'Sem prazo definido'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER HELPER */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-[#222731] text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>Todas as observações e tarefas são salvas no armazenamento local instantaneamente.</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-gray-400">
          <span>{projects.length} {projects.length === 1 ? 'projeto ativo' : 'projetos gerenciados'}</span>
        </div>
      </div>
    </div>
  );
};
