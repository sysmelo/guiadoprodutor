import React, { useState } from 'react';
import { Project, InstrumentalStatus, RecordingSessionStatus, NavigationTab } from '../types';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Mic, 
  Disc3, 
  MessageSquare, 
  User, 
  Sliders, 
  Sparkles, 
  Send, 
  Check, 
  Copy, 
  Music, 
  ChevronRight,
  ArrowRight,
  Filter,
  Search,
  Layers,
  Phone,
  Flame,
  Volume2
} from 'lucide-react';
import { getAllGenres } from '../utils/genresManager';

interface RecordingScheduleViewProps {
  projects: Project[];
  activeProjectId: string;
  onSelectProject: (id: string) => void;
  onSaveProjects: (projects: Project[]) => void;
  onNavigate: (tab: NavigationTab) => void;
}

export const RecordingScheduleView: React.FC<RecordingScheduleViewProps> = ({
  projects,
  activeProjectId,
  onSelectProject,
  onSaveProjects,
  onNavigate
}) => {
  const [filterMode, setFilterMode] = useState<'ALL' | 'TODAY' | 'UPCOMING' | 'CONFIRMED' | 'DONE'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formArtist, setFormArtist] = useState('');
  const [formGenre, setFormGenre] = useState('Kuduro (Batida / Luanda)');
  const [formBpm, setFormBpm] = useState<number>(140);
  const [formKey, setFormKey] = useState('F# Menor');
  const [formClientContact, setFormClientContact] = useState('');
  
  // Instrumental Details
  const [formInstrumentalDate, setFormInstrumentalDate] = useState<string>(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [formInstrumentalStatus, setFormInstrumentalStatus] = useState<InstrumentalStatus>('Beat Pronto');
  
  // Recording Session Details
  const [formRecordingDate, setFormRecordingDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [formRecordingTime, setFormRecordingTime] = useState('14:30');
  const [formRecordingEndTime, setFormRecordingEndTime] = useState('17:30');
  const [formRecordingStatus, setFormRecordingStatus] = useState<RecordingSessionStatus>('Agendado');
  const [formRecordingMic, setFormRecordingMic] = useState('Neumann U87 / Apollo Twin Preamp');
  const [formRecordingRoom, setFormRecordingRoom] = useState('Cabine Vocal A (Tratamento Acústico Seco)');
  const [formRecordingEngineer, setFormRecordingEngineer] = useState('Engenheiro Chefe');
  const [formRecordingType, setFormRecordingType] = useState('Lead Vocal + Dobras L/R + Adlibs');
  const [formRecordingNotes, setFormRecordingNotes] = useState('');

  const allGenresList = getAllGenres();

  const resetForm = () => {
    setEditingProjectId(null);
    setFormName('');
    setFormArtist('');
    setFormGenre('Kuduro (Batida / Luanda)');
    setFormBpm(140);
    setFormKey('F# Menor');
    setFormClientContact('');
    setFormInstrumentalDate(new Date().toISOString().split('T')[0]);
    setFormInstrumentalStatus('Beat Pronto');
    const d = new Date();
    d.setDate(d.getDate() + 2);
    setFormRecordingDate(d.toISOString().split('T')[0]);
    setFormRecordingTime('14:30');
    setFormRecordingEndTime('17:30');
    setFormRecordingStatus('Agendado');
    setFormRecordingMic('Neumann U87 / Apollo Twin Preamp');
    setFormRecordingRoom('Cabine Vocal A (Tratamento Acústico Seco)');
    setFormRecordingEngineer('Engenheiro Chefe');
    setFormRecordingType('Lead Vocal + Dobras L/R + Adlibs');
    setFormRecordingNotes('');
    setIsModalOpen(false);
  };

  const handleStartEdit = (proj: Project) => {
    setEditingProjectId(proj.id);
    setFormName(proj.name);
    setFormArtist(proj.artist);
    setFormGenre(proj.genre || 'Kuduro (Batida / Luanda)');
    setFormBpm(proj.bpm || 140);
    setFormKey(proj.key || 'F# Menor');
    setFormClientContact(proj.clientContact || '');
    setFormInstrumentalDate(proj.instrumentalDate || proj.date || new Date().toISOString().split('T')[0]);
    setFormInstrumentalStatus(proj.instrumentalStatus || 'Beat Pronto');
    setFormRecordingDate(proj.recordingDate || proj.deadline || new Date().toISOString().split('T')[0]);
    setFormRecordingTime(proj.recordingTime || '14:30');
    setFormRecordingEndTime(proj.recordingEndTime || '17:30');
    setFormRecordingStatus(proj.recordingStatus || 'Agendado');
    setFormRecordingMic(proj.recordingMic || 'Neumann U87 / Apollo Twin Preamp');
    setFormRecordingRoom(proj.recordingRoom || 'Cabine Vocal A (Tratamento Acústico Seco)');
    setFormRecordingEngineer(proj.recordingEngineer || 'Engenheiro Chefe');
    setFormRecordingType(proj.recordingType || 'Lead Vocal + Dobras L/R + Adlibs');
    setFormRecordingNotes(proj.recordingNotes || proj.notes || '');
    setIsModalOpen(true);
  };

  const handleSaveSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    if (editingProjectId) {
      const updated = projects.map(p => {
        if (p.id === editingProjectId) {
          return {
            ...p,
            name: formName,
            artist: formArtist || 'Artista',
            genre: formGenre,
            bpm: formBpm,
            key: formKey,
            clientContact: formClientContact,
            instrumentalDate: formInstrumentalDate,
            instrumentalStatus: formInstrumentalStatus,
            recordingDate: formRecordingDate,
            recordingTime: formRecordingTime,
            recordingEndTime: formRecordingEndTime,
            recordingStatus: formRecordingStatus,
            recordingMic: formRecordingMic,
            recordingRoom: formRecordingRoom,
            recordingEngineer: formRecordingEngineer,
            recordingType: formRecordingType,
            recordingNotes: formRecordingNotes,
            // If recording is happening or confirmed, ensure process level is aligned
            processLevel: formRecordingStatus === 'Concluído' ? 'Nível 2: Mixagem' : 'Nível 1: Gravação / Pré-Mix'
          };
        }
        return p;
      });
      onSaveProjects(updated);
    } else {
      const newProj: Project = {
        id: `proj-${Date.now()}`,
        name: formName,
        artist: formArtist || 'Artista',
        genre: formGenre,
        bpm: formBpm,
        key: formKey,
        date: new Date().toISOString().split('T')[0],
        deadline: formRecordingDate,
        priority: 'Alta',
        processLevel: 'Nível 1: Gravação / Pré-Mix',
        status: 'Em Mixagem',
        notes: formRecordingNotes,
        checklist: {},
        mixProgress: 15,
        masterChecklist: {},
        clientContact: formClientContact,
        instrumentalDate: formInstrumentalDate,
        instrumentalStatus: formInstrumentalStatus,
        recordingDate: formRecordingDate,
        recordingTime: formRecordingTime,
        recordingEndTime: formRecordingEndTime,
        recordingStatus: formRecordingStatus,
        recordingMic: formRecordingMic,
        recordingRoom: formRecordingRoom,
        recordingEngineer: formRecordingEngineer,
        recordingType: formRecordingType,
        recordingNotes: formRecordingNotes
      };
      const updated = [newProj, ...projects];
      onSaveProjects(updated);
      onSelectProject(newProj.id);
    }

    resetForm();
  };

  const handleToggleScheduleStatus = (projectId: string, newStatus: RecordingSessionStatus) => {
    const updated = projects.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          recordingStatus: newStatus,
          processLevel: newStatus === 'Concluído' ? 'Nível 2: Mixagem' : p.processLevel
        };
      }
      return p;
    });
    onSaveProjects(updated);
  };

  const handleGenerateWhatsAppMessage = (proj: Project) => {
    const recDate = proj.recordingDate || 'Data a confirmar';
    const recTime = proj.recordingTime || '14:30';
    const artist = proj.artist || 'Artista';
    const song = proj.name;
    const bpm = proj.bpm || 140;
    const key = proj.key || 'Tom do Beat';
    const genre = proj.genre || 'Estilo';
    const mic = proj.recordingMic || 'Equipamento de ponta';

    const text = `🎙️ *CONFIRMAÇÃO DE SESSÃO DE GRAVAÇÃO*\n` +
      `-------------------------------------------\n` +
      `Olá *${artist}*, aqui é do Estúdio!\n\n` +
      `Tudo pronto para a nossa sessão de gravação da faixa *"${song}"* (${genre})!\n\n` +
      `📅 *Data da Gravação:* ${recDate}\n` +
      `⏰ *Horário:* ${recTime} às ${proj.recordingEndTime || '17:30'}\n` +
      `🎹 *Instrumental:* Pronto & Carregado (${bpm} BPM • ${key})\n` +
      `🎙️ *Microfone & Setup:* ${mic}\n\n` +
      `📌 *Dicas para o melhor rendimento vocal:*\n` +
      `• Chegue 10 minutos antes para aquecimento de voz.\n` +
      `• Traga água em temperatura ambiente para hidratação.\n` +
      `• Tenha a letra decorada ou acessível no telemóvel.\n\n` +
      `Por favor, responda confirmando a sua presença! Até já no estúdio! 🚀🔥`;

    navigator.clipboard.writeText(text);
    setCopiedMessageId(proj.id);
    setTimeout(() => setCopiedMessageId(null), 3000);
  };

  // Filter projects with recording info
  const todayStr = new Date().toISOString().split('T')[0];

  const scheduledList = projects.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (p.genre || '').toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchSearch) return false;

    const recDate = p.recordingDate || p.deadline || '';
    const status = p.recordingStatus || 'Agendado';

    if (filterMode === 'TODAY') return recDate === todayStr;
    if (filterMode === 'CONFIRMED') return status === 'Confirmado' || status === 'Gravando Hoje';
    if (filterMode === 'UPCOMING') return recDate >= todayStr && status !== 'Concluído' && status !== 'Cancelado';
    if (filterMode === 'DONE') return status === 'Concluído';
    return true;
  }).sort((a, b) => {
    const dateA = a.recordingDate || a.deadline || '9999';
    const dateB = b.recordingDate || b.deadline || '9999';
    return dateA.localeCompare(dateB);
  });

  // Metrics
  const totalScheduled = projects.length;
  const todayCount = projects.filter(p => (p.recordingDate || p.deadline) === todayStr).length;
  const beatsReadyCount = projects.filter(p => (p.instrumentalStatus || 'Beat Pronto') === 'Beat Pronto' || p.instrumentalStatus === 'Aprovado pelo Artista').length;
  const confirmedCount = projects.filter(p => p.recordingStatus === 'Confirmado' || p.recordingStatus === 'Gravando Hoje').length;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="rounded-2xl bg-[#15191E] border border-[#2A2F36] p-6 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold font-mono">
              <Calendar className="w-3.5 h-3.5" />
              FL STUDIO PIPELINE — CRIAÇÃO DO INSTRUMENTAL & AGENDAMENTO DE GRAVAÇÃO
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Agendamento de Sessões & Pipeline de Produção
            </h1>
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
              Organize o fluxo completo: acompanhe a data de criação e finalização do instrumental (Beat), agende as sessões de gravação de voz/instrumentos, dispare mensagens de confirmação para o artista e prepare o estúdio.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                resetForm();
                setIsModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-cyan-600/30 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Agendar Nova Sessão</span>
            </button>

            <button
              onClick={() => onNavigate('vocal_recording')}
              className="px-3.5 py-2.5 rounded-xl bg-[#0B0E11] hover:bg-[#1E2329] text-gray-300 text-xs font-semibold flex items-center gap-2 border border-[#2A2F36] transition-colors cursor-pointer"
            >
              <Mic className="w-4 h-4 text-cyan-400" />
              <span>Console de Gravação</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div 
            onClick={() => setFilterMode('ALL')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              filterMode === 'ALL' ? 'bg-[#1C232D] border-cyan-500 ring-1 ring-cyan-500/40 shadow-md' : 'bg-[#0B0E11] border-[#2A2F36] hover:border-gray-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-gray-400 uppercase font-bold">Total de Sessões</span>
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-2xl font-black text-white mt-1">{totalScheduled}</div>
            <span className="text-[10px] text-gray-500">Pipeline ativo</span>
          </div>

          <div 
            onClick={() => setFilterMode('TODAY')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              filterMode === 'TODAY' ? 'bg-orange-500/10 border-orange-500 ring-1 ring-orange-500/40 shadow-md' : 'bg-[#0B0E11] border-[#2A2F36] hover:border-gray-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-orange-400 uppercase font-bold">Gravações Hoje</span>
              <Flame className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
            </div>
            <div className="text-2xl font-black text-orange-300 mt-1">{todayCount}</div>
            <span className="text-[10px] text-orange-400/80">Sessões do dia</span>
          </div>

          <div 
            onClick={() => setFilterMode('CONFIRMED')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              filterMode === 'CONFIRMED' ? 'bg-emerald-500/10 border-emerald-500 ring-1 ring-emerald-500/40 shadow-md' : 'bg-[#0B0E11] border-[#2A2F36] hover:border-gray-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Confirmadas</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-300 mt-1">{confirmedCount}</div>
            <span className="text-[10px] text-emerald-400/80">Artistas confirmados</span>
          </div>

          <div 
            className="p-3.5 rounded-xl border bg-[#0B0E11] border-[#2A2F36]"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">Beats Prontos</span>
              <Disc3 className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-2xl font-black text-white mt-1">{beatsReadyCount}</div>
            <span className="text-[10px] text-gray-500">Instrumentais finalizados</span>
          </div>
        </div>
      </div>

      {/* Checklist de Preparação do Estúdio antes da Gravação */}
      <div className="rounded-xl bg-[#15191E] border border-[#2A2F36] p-5 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
            <Mic className="w-4 h-4 text-cyan-400" />
            Checklist de Preparação do Estúdio (Técnico / Engenheiro)
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            Regra de Ouro: -18 dBFS RMS / Latência &lt; 5ms
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-[#0B0E11] border border-[#2A2F36] space-y-1">
            <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
              <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px]">1</span>
              <span>Aquecimento & Phantom Power</span>
            </div>
            <p className="text-[11px] text-gray-400">Ligue o microfone condensador e pré-amplificador 15 min antes para estabilizar a resposta de frequência e ruído de fundo.</p>
          </div>

          <div className="p-3 rounded-lg bg-[#0B0E11] border border-[#2A2F36] space-y-1">
            <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
              <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px]">2</span>
              <span>Cue Mix & Fones Sem Latência</span>
            </div>
            <p className="text-[11px] text-gray-400">Ajuste o buffer da interface em 64 ou 128 samples. Crie uma mandada de Reverb de conforto para o cantor se ouvir afinado.</p>
          </div>

          <div className="p-3 rounded-lg bg-[#0B0E11] border border-[#2A2F36] space-y-1">
            <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
              <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px]">3</span>
              <span>Calibração de Ganho (Gain Stage)</span>
            </div>
            <p className="text-[11px] text-gray-400">Peça para o artista cantar o refrão mais alto: ajuste o ganho para que os picos mais fortes nunca ultrapassem -12 dBFS.</p>
          </div>

          <div className="p-3 rounded-lg bg-[#0B0E11] border border-[#2A2F36] space-y-1">
            <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
              <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px]">4</span>
              <span>Posicionamento & Pop Filter</span>
            </div>
            <p className="text-[11px] text-gray-400">Mantenha o pop filter a 10-15 cm da cápsula. Posicione o microfone levemente acima dos lábios apontado para a boca para evitar plosivas.</p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#15191E] border border-[#2A2F36]">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por artista, música ou gênero..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0B0E11] border border-[#2A2F36] rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-thin">
          {[
            { id: 'ALL', label: 'Todas as Sessões' },
            { id: 'TODAY', label: `🔥 Hoje (${todayCount})` },
            { id: 'UPCOMING', label: '📅 Próximas' },
            { id: 'CONFIRMED', label: `✅ Confirmadas (${confirmedCount})` },
            { id: 'DONE', label: '🏁 Concluídas' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterMode(tab.id as typeof filterMode)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                filterMode === tab.id
                  ? 'bg-cyan-500 text-black shadow-md'
                  : 'bg-[#0B0E11] text-gray-400 hover:text-white border border-[#2A2F36]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Modal: Form for Scheduling or Editing */}
      {isModalOpen && (
        <form onSubmit={handleSaveSession} className="rounded-2xl bg-[#15191E] border-2 border-cyan-500/50 p-6 md:p-7 space-y-6 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between border-b border-[#2A2F36] pb-4">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>{editingProjectId ? 'Editar Agendamento & Dados do Beat' : 'Novo Agendamento: Instrumental & Gravação'}</span>
            </h3>
            <button
              type="button"
              onClick={resetForm}
              className="text-xs text-gray-400 hover:text-white cursor-pointer"
            >
              Cancelar
            </button>
          </div>

          <div className="space-y-6">
            {/* Bloco 1: Informações Gerais da Faixa */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                1. Informações Básicas da Música & Artista
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div>
                  <label className="text-gray-400 font-bold block mb-1">Título da Música *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Ex: Batida Quente de Luanda"
                    className="w-full bg-[#0B0E11] border border-[#2A2F36] rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-gray-400 font-bold block mb-1">Artista / Vocalista</label>
                  <input
                    type="text"
                    value={formArtist}
                    onChange={(e) => setFormArtist(e.target.value)}
                    placeholder="Ex: Puto Português / Cabo Snoop"
                    className="w-full bg-[#0B0E11] border border-[#2A2F36] rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-cyan-400 font-bold block">Estilo Musical (Gênero) *</label>
                    {formGenre.toLowerCase().includes('kuduro') && (
                      <span className="text-[10px] font-mono text-amber-400 font-bold flex items-center gap-1">
                        <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
                        Kuduro de Luanda
                      </span>
                    )}
                  </div>
                  <select
                    value={formGenre}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormGenre(val);
                      if (val.toLowerCase().includes('kuduro')) setFormBpm(140);
                      else if (val.toLowerCase().includes('semba')) setFormBpm(105);
                      else if (val.toLowerCase().includes('tarraxinha')) setFormBpm(88);
                      else if (val.toLowerCase().includes('afrobeat')) setFormBpm(104);
                      else if (val.toLowerCase().includes('amapiano')) setFormBpm(113);
                      else if (val.toLowerCase().includes('trap')) setFormBpm(140);
                      else if (val.toLowerCase().includes('drill')) setFormBpm(142);
                    }}
                    className="w-full bg-[#0B0E11] border border-cyan-500/50 rounded-lg px-3 py-2.5 text-white font-medium focus:outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    <optgroup label="🇦🇴 Ritmos Angolanos & Africanos">
                      <option value="Kuduro (Batida / Luanda)">🇦🇴 Kuduro (Batida / Luanda) — 135-145 BPM</option>
                      <option value="Semba & Ritmos Tradicionais">🇦🇴 Semba & Ritmos Tradicionais — 95-115 BPM</option>
                      <option value="Tarraxinha & Tarraxo">🇦🇴 Tarraxinha & Tarraxo — 82-94 BPM</option>
                      <option value="Afrobeat">🌍 Afrobeat — 98-112 BPM</option>
                      <option value="Amapiano">🇿🇦 Amapiano — 110-118 BPM</option>
                      <option value="Kizomba & Ghetto Zouk">🇦🇴 Kizomba & Ghetto Zouk — 88-98 BPM</option>
                      <option value="Afro House">🌍 Afro House — 120-126 BPM</option>
                    </optgroup>

                    <optgroup label="🎧 Urban, Trap & Hip-Hop">
                      <option value="Trap">🔥 Trap — 130-160 BPM</option>
                      <option value="Drill (UK / NY / Afro Drill)">🇬🇧 Drill (UK / NY / Afro Drill) — 138-148 BPM</option>
                      <option value="Hip Hop / Boombap">🎙️ Hip Hop / Boombap — 85-98 BPM</option>
                      <option value="R&B / Soul Contemporâneo">💜 R&B / Soul Contemporâneo — 65-95 BPM</option>
                      <option value="Dancehall">🇯🇲 Dancehall — 95-110 BPM</option>
                      <option value="Reggaeton">🌴 Reggaeton — 88-100 BPM</option>
                    </optgroup>

                    <optgroup label="🎛️ Pop, Eletrônica & Outros">
                      <option value="Pop Comercial">✨ Pop Comercial — 105-128 BPM</option>
                      <option value="Deep House">🎧 Deep House — 120-125 BPM</option>
                      <option value="EDM / House">⚡ EDM / House — 124-130 BPM</option>
                      <option value="Funk Brasileiro">🇧🇷 Funk Brasileiro — 128-135 BPM</option>
                      <option value="Rock / Indie">🎸 Rock / Indie — 110-140 BPM</option>
                      <option value="Sertanejo">🤠 Sertanejo — 110-130 BPM</option>
                      <option value="Lo-Fi">☕ Lo-Fi Hip Hop — 75-88 BPM</option>
                      <option value="Gospel">🙏 Gospel / Worship — 68-95 BPM</option>
                      <option value="Zouk & Retro Zouk">🏝️ Zouk & Retro Zouk — 90-102 BPM</option>
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label className="text-gray-400 font-bold block mb-1">Contato / WhatsApp do Artista</label>
                  <input
                    type="text"
                    value={formClientContact}
                    onChange={(e) => setFormClientContact(e.target.value)}
                    placeholder="Ex: +244 923 000 000"
                    className="w-full bg-[#0B0E11] border border-[#2A2F36] rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>

            {/* Bloco 2: Pipeline do Instrumental (Data de Criação & Status do Beat) */}
            <div className="p-4 rounded-xl bg-[#0B0E11] border border-[#2A2F36] space-y-3">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
                <Disc3 className="w-4 h-4 text-orange-400" />
                2. Etapa do Instrumental / Beatmaking
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div>
                  <label className="text-gray-400 font-bold block mb-1">Data de Criação do Instrumental *</label>
                  <input
                    type="date"
                    required
                    value={formInstrumentalDate}
                    onChange={(e) => setFormInstrumentalDate(e.target.value)}
                    className="w-full bg-[#15191E] border border-[#2A2F36] rounded-lg px-3 py-2.5 text-white font-mono focus:outline-none focus:border-orange-400"
                  />
                </div>

                <div>
                  <label className="text-gray-400 font-bold block mb-1">Status do Instrumental</label>
                  <select
                    value={formInstrumentalStatus}
                    onChange={(e) => setFormInstrumentalStatus(e.target.value as InstrumentalStatus)}
                    className="w-full bg-[#15191E] border border-[#2A2F36] rounded-lg px-3 py-2.5 text-orange-300 font-bold focus:outline-none focus:border-orange-400 cursor-pointer"
                  >
                    <option value="Em Criação">⏳ Em Criação (Arranjando no FL Studio)</option>
                    <option value="Beat Pronto">🎹 Beat Pronto / Mixado</option>
                    <option value="Aprovado pelo Artista">✅ Aprovado pelo Artista</option>
                    <option value="Stems Exportados">📦 Stems / Faixas Separadas Prontas</option>
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
                    className="w-full bg-[#15191E] border border-[#2A2F36] rounded-lg px-3 py-2.5 text-emerald-400 font-bold font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-gray-400 font-bold block mb-1">Tom Musical (Key)</label>
                  <input
                    type="text"
                    value={formKey}
                    onChange={(e) => setFormKey(e.target.value)}
                    placeholder="Ex: F# Menor, C Maior"
                    className="w-full bg-[#15191E] border border-[#2A2F36] rounded-lg px-3 py-2.5 text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>

            {/* Bloco 3: Agendamento da Gravação no Estúdio */}
            <div className="p-4 rounded-xl bg-[#0B0E11] border border-cyan-500/30 space-y-3">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Mic className="w-4 h-4 text-cyan-400" />
                3. Agendamento da Sessão de Gravação (Vocal / Tracking)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div>
                  <label className="text-gray-400 font-bold block mb-1">Data da Gravação Agendada *</label>
                  <input
                    type="date"
                    required
                    value={formRecordingDate}
                    onChange={(e) => setFormRecordingDate(e.target.value)}
                    className="w-full bg-[#15191E] border border-cyan-500/50 rounded-lg px-3 py-2.5 text-cyan-300 font-bold font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-gray-400 font-bold block mb-1">Horário de Início & Término</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      value={formRecordingTime}
                      onChange={(e) => setFormRecordingTime(e.target.value)}
                      className="w-full bg-[#15191E] border border-[#2A2F36] rounded-lg px-2 py-2 text-white font-mono text-center focus:outline-none focus:border-cyan-500"
                    />
                    <span className="text-gray-500 font-mono">às</span>
                    <input
                      type="time"
                      value={formRecordingEndTime}
                      onChange={(e) => setFormRecordingEndTime(e.target.value)}
                      className="w-full bg-[#15191E] border border-[#2A2F36] rounded-lg px-2 py-2 text-white font-mono text-center focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-400 font-bold block mb-1">Status da Sessão</label>
                  <select
                    value={formRecordingStatus}
                    onChange={(e) => setFormRecordingStatus(e.target.value as RecordingSessionStatus)}
                    className="w-full bg-[#15191E] border border-[#2A2F36] rounded-lg px-3 py-2.5 text-white font-bold focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value="Agendado">📅 Agendado (Aguardando Confirmação)</option>
                    <option value="Confirmado">✅ Confirmado com o Artista</option>
                    <option value="Gravando Hoje">🔴 Gravando Hoje no Estúdio</option>
                    <option value="Concluído">🏁 Gravação Concluída (Pronto para Mix)</option>
                    <option value="Remarcado">🔄 Remarcado para Nova Data</option>
                    <option value="Cancelado">❌ Cancelado</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-400 font-bold block mb-1">Tipo de Captação</label>
                  <select
                    value={formRecordingType}
                    onChange={(e) => setFormRecordingType(e.target.value)}
                    className="w-full bg-[#15191E] border border-[#2A2F36] rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value="Lead Vocal + Dobras L/R + Adlibs">Lead Vocal + Dobras L/R + Adlibs</option>
                    <option value="Apenas Voz Principal">Apenas Voz Principal</option>
                    <option value="Coro / Backing Vocals">Coro / Backing Vocals</option>
                    <option value="Instrumento Acústico (Guitarra/Percussão)">Instrumento Acústico (Guitarra/Percussão)</option>
                    <option value="Sessão Completa / Álbum">Sessão Completa / Álbum</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
                <div>
                  <label className="text-gray-400 font-bold block mb-1">Microfone & Preamp Selecionados</label>
                  <input
                    type="text"
                    value={formRecordingMic}
                    onChange={(e) => setFormRecordingMic(e.target.value)}
                    placeholder="Ex: Neumann U87 / Apollo Twin Preamp"
                    className="w-full bg-[#15191E] border border-[#2A2F36] rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-gray-400 font-bold block mb-1">Cabine / Sala de Gravação</label>
                  <input
                    type="text"
                    value={formRecordingRoom}
                    onChange={(e) => setFormRecordingRoom(e.target.value)}
                    placeholder="Ex: Cabine Vocal A (Tratada)"
                    className="w-full bg-[#15191E] border border-[#2A2F36] rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-gray-400 font-bold block mb-1">Técnico / Produtor Responsável</label>
                  <input
                    type="text"
                    value={formRecordingEngineer}
                    onChange={(e) => setFormRecordingEngineer(e.target.value)}
                    placeholder="Ex: Engenheiro Chefe"
                    className="w-full bg-[#15191E] border border-[#2A2F36] rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-400 font-bold block mb-1">Instruções Específicas / Observações da Gravação</label>
                <textarea
                  rows={2}
                  value={formRecordingNotes}
                  onChange={(e) => setFormRecordingNotes(e.target.value)}
                  placeholder="Ex: Artista prefere fone com mais volume no instrumental. Refrão requer 2 dobras abertas em estéreo..."
                  className="w-full bg-[#15191E] border border-[#2A2F36] rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
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
              className="px-6 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>{editingProjectId ? 'Salvar Alterações do Agendamento' : 'Confirmar Agendamento de Gravação'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Scheduled Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scheduledList.map((proj) => {
          const isActive = proj.id === activeProjectId;
          const recDate = proj.recordingDate || proj.deadline || 'Data não definida';
          const recTime = proj.recordingTime || '14:30';
          const instDate = proj.instrumentalDate || proj.date || 'Data não definida';
          const recStatus = proj.recordingStatus || 'Agendado';
          const instStatus = proj.instrumentalStatus || 'Beat Pronto';

          const isToday = recDate === todayStr;

          return (
            <div
              key={proj.id}
              className={`rounded-2xl border p-5 space-y-4 transition-all flex flex-col justify-between ${
                isToday
                  ? 'bg-[#181924] border-orange-500/60 shadow-xl ring-1 ring-orange-500/30'
                  : isActive
                  ? 'bg-[#161C24] border-cyan-500 shadow-2xl ring-1 ring-cyan-500/50'
                  : 'bg-[#15191E] border-[#2A2F36] hover:border-gray-500'
              }`}
            >
              <div className="space-y-3.5">
                {/* Top Badges & Quick Action */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {isToday && (
                        <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded bg-orange-500 text-black animate-pulse flex items-center gap-1">
                          <Flame className="w-3 h-3" />
                          GRAVAÇÃO HOJE
                        </span>
                      )}

                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                        recStatus === 'Confirmado' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' :
                        recStatus === 'Gravando Hoje' ? 'bg-orange-500/20 text-orange-300 border-orange-500/40 animate-pulse' :
                        recStatus === 'Concluído' ? 'bg-blue-500/20 text-blue-300 border-blue-500/40' :
                        recStatus === 'Remarcado' ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' :
                        'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                      }`}>
                        {recStatus}
                      </span>

                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0B0E11] text-gray-300 border border-[#2A2F36]">
                        {proj.genre || 'Estilo'}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-white truncate">{proj.name}</h3>
                    <p className="text-xs text-gray-400 truncate flex items-center gap-1">
                      <User className="w-3 h-3 text-cyan-400" />
                      {proj.artist}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleStartEdit(proj)}
                      className="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-[#0B0E11] transition-colors cursor-pointer"
                      title="Editar agendamento"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Timeline Box: Beat -> Gravação */}
                <div className="p-3 bg-[#0B0E11] rounded-xl border border-[#2A2F36] space-y-2.5 text-xs">
                  {/* Instrumental Date & Status */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <Disc3 className="w-3.5 h-3.5 text-orange-400" />
                      <span>Criação do Beat:</span>
                    </div>
                    <span className="font-mono text-gray-200 font-bold">{instDate}</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-gray-500">Status do Beat:</span>
                    <span className="text-orange-400 font-semibold">{instStatus}</span>
                  </div>

                  <div className="border-t border-[#1C222A] pt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Data da Gravação:</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-white font-extrabold block">{recDate}</span>
                      <span className="font-mono text-cyan-400 text-[10px] flex items-center justify-end gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        {recTime} - {proj.recordingEndTime || '17:30'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Technical Setup Pill */}
                <div className="p-2.5 rounded-lg bg-[#0B0E11] border border-[#22272F] space-y-1 text-[11px] text-gray-400">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-gray-400">
                      <Mic className="w-3 h-3 text-cyan-400" />
                      Microfone:
                    </span>
                    <span className="text-gray-200 truncate max-w-[170px]">{proj.recordingMic || 'Neumann U87 / Apollo'}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-gray-500 pt-0.5 border-t border-[#181D24]">
                    <span>BPM & Tom:</span>
                    <span className="text-emerald-400 font-mono font-bold">{proj.bpm} BPM • {proj.key}</span>
                  </div>
                </div>

                {/* Quick Status Fast Switcher */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-gray-400 uppercase font-bold">
                    Status do Agendamento:
                  </span>
                  <div className="grid grid-cols-3 gap-1 text-[9px] font-mono">
                    {(['Agendado', 'Confirmado', 'Concluído'] as RecordingSessionStatus[]).map(st => {
                      const isCurrent = recStatus === st;
                      return (
                        <button
                          key={st}
                          onClick={() => handleToggleScheduleStatus(proj.id, st)}
                          className={`py-1 rounded font-bold transition-all cursor-pointer border ${
                            isCurrent
                              ? st === 'Confirmado'
                                ? 'bg-emerald-500 text-black border-emerald-400'
                                : st === 'Concluído'
                                ? 'bg-blue-500 text-black border-blue-400'
                                : 'bg-cyan-500 text-black border-cyan-400'
                              : 'bg-[#0B0E11] text-gray-400 hover:text-white border-[#2A2F36]'
                          }`}
                        >
                          {st}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 space-y-2 border-t border-[#22272F]">
                <button
                  onClick={() => handleGenerateWhatsAppMessage(proj)}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                    copiedMessageId === proj.id
                      ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                      : 'bg-[#0B0E11] hover:bg-emerald-500/20 hover:text-emerald-300 text-gray-300 border-[#2A2F36]'
                  }`}
                  title="Gerar e copiar mensagem de confirmação para enviar ao artista via WhatsApp"
                >
                  {copiedMessageId === proj.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Mensagem WhatsApp Copiada!</span>
                    </>
                  ) : (
                    <>
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Lembrete WhatsApp p/ Artista</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onSelectProject(proj.id);
                      onNavigate('vocal_recording');
                    }}
                    className="flex-1 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>Iniciar Gravação</span>
                  </button>

                  <button
                    onClick={() => {
                      onSelectProject(proj.id);
                      onNavigate('mix');
                    }}
                    className="py-2 px-3 rounded-xl bg-[#0B0E11] hover:bg-[#1E2329] text-gray-300 text-xs font-bold border border-[#2A2F36] transition-colors cursor-pointer"
                    title="Ir para Mixagem do Beat"
                  >
                    <Sliders className="w-3.5 h-3.5 text-orange-400" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
