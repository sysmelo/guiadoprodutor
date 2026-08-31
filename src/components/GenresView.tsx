import React, { useState } from 'react';
import { 
  Globe, 
  Music, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Search, 
  Flame,
  HelpCircle
} from 'lucide-react';
import { GenreChain, GenreMode } from '../types';
import { getAllGenres, saveCustomGenre, deleteCustomGenre, getCustomGenres } from '../utils/genresManager';

export const GenresView: React.FC = () => {
  const [genresList, setGenresList] = useState<GenreChain[]>(() => getAllGenres());
  const [selectedGenreId, setSelectedGenreId] = useState<string>(() => {
    const all = getAllGenres();
    // Default to Kuduro if available or first
    const kuduro = all.find(g => g.id === 'kuduro');
    return kuduro ? kuduro.id : all[0].id;
  });
  const [selectedMode, setSelectedMode] = useState<GenreMode>('MODERN');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingModalOpen, setIsAddingModalOpen] = useState(false);
  const [editingCustomId, setEditingCustomId] = useState<string | null>(null);

  // Form state for creating / editing a genre
  const [formName, setFormName] = useState('');
  const [formOrigin, setFormOrigin] = useState('Angola / África');
  const [formBpmRange, setFormBpmRange] = useState('135 – 145 BPM');
  const [formAdvice1, setFormAdvice1] = useState('');
  const [formAdvice2, setFormAdvice2] = useState('');
  const [formAdvice3, setFormAdvice3] = useState('');
  const [formMixSecret, setFormMixSecret] = useState('');

  const currentGenre = genresList.find(g => g.id === selectedGenreId) || genresList[0];
  const modeData = currentGenre?.modes?.[selectedMode] || {
    description: 'Configurações de mixagem personalizadas para este estilo musical.',
    vocalChain: [
      { position: 1, plugin: 'Fruity Parametric EQ 2', action: 'Limpeza de frequências', params: 'HPF a 85Hz' },
      { position: 2, plugin: 'Fruity Limiter', action: 'Compressão dinâmica', params: 'Ratio 3.5:1 | GR 3-4dB' },
      { position: 3, plugin: 'Fruity Delay 3', action: 'Delay Rítmico', params: '1/8 Dotted' }
    ],
    drumsChain: [
      { element: 'Kick / Bumbo', plugin: 'Fruity Parametric EQ 2', action: 'Punch no grave' },
      { element: 'Snare / Tarola / Percussão', plugin: 'Fruity Soft Clipper', action: 'Controle de transientes' }
    ],
    bassChain: [
      { element: '808 / Linha de Baixo', plugin: 'Fruity Blood Overdrive', action: 'Harmônicos de médios' }
    ],
    masterChain: [
      { position: 1, plugin: 'Fruity Soft Clipper', action: 'Clip suave' },
      { position: 2, plugin: 'Fruity Limiter', action: 'Alvo -9 a -11 LUFS' }
    ],
    mixSecret: 'Mantenha o kick e o baixo no centro e abra as percussões e delays em estéreo.'
  };

  const customGenresIds = new Set(getCustomGenres().map(g => g.id));
  const isCurrentGenreCustom = customGenresIds.has(currentGenre.id);

  const resetForm = () => {
    setFormName('');
    setFormOrigin('Angola / África');
    setFormBpmRange('135 – 145 BPM');
    setFormAdvice1('');
    setFormAdvice2('');
    setFormAdvice3('');
    setFormMixSecret('');
    setEditingCustomId(null);
    setIsAddingModalOpen(false);
  };

  const handleOpenCreate = () => {
    resetForm();
    setIsAddingModalOpen(true);
  };

  const handleOpenEdit = (genre: GenreChain) => {
    setEditingCustomId(genre.id);
    setFormName(genre.name);
    setFormOrigin(genre.origin);
    setFormBpmRange(genre.bpmRange);
    setFormAdvice1(genre.keyAdvice[0] || '');
    setFormAdvice2(genre.keyAdvice[1] || '');
    setFormAdvice3(genre.keyAdvice[2] || '');
    setFormMixSecret(genre.modes.MODERN?.mixSecret || genre.modes.CLEAN?.mixSecret || '');
    setIsAddingModalOpen(true);
  };

  const handleSaveGenre = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const adviceList = [formAdvice1, formAdvice2, formAdvice3].filter(a => a.trim().length > 0);
    if (adviceList.length === 0) {
      adviceList.push('Ajuste o balanço de frequências e saturação respeitando a dinâmica do estilo.');
    }

    const secret = formMixSecret.trim() || `Equilibre o bumbo e o baixo no centro estéreo para garantir máxima potência em ${formName}.`;

    const genreObj: GenreChain = {
      id: editingCustomId || `custom-${Date.now()}`,
      name: formName,
      origin: formOrigin || 'Estilo Personalizado',
      bpmRange: formBpmRange || '120 – 140 BPM',
      keyAdvice: adviceList,
      modes: {
        CLEAN: {
          description: `Versão equilibrada e dinâmica de ${formName} com clareza vocal e transientes naturais.`,
          vocalChain: [
            { position: 1, plugin: 'Fruity Parametric EQ 2', action: 'HPF + Cirúrgico', params: 'HPF a 85Hz + corte em 350Hz' },
            { position: 2, plugin: 'Fruity Limiter', action: 'Compressão Óptica Transparente', params: 'Ratio 3:1 | GR 2-3dB' },
            { position: 3, plugin: 'Maximus', action: 'De-Esser Multibanda', params: 'Domar 5.5k - 7.5kHz' },
            { position: 4, plugin: 'Fruity Delay 3', action: 'Stereo Echo Sutil', params: 'Mix 15%' }
          ],
          drumsChain: [
            { element: 'Bateria / Percussão', plugin: 'Fruity Parametric EQ 2', action: 'Limpeza de médios-graves' }
          ],
          bassChain: [
            { element: 'Baixo / Sub', plugin: 'Fruity Parametric EQ 2', action: 'Mono total abaixo de 100Hz' }
          ],
          masterChain: [
            { position: 1, plugin: 'Fruity Limiter', action: 'Ceiling -1.0 dBTP | Alvo -12 LUFS' }
          ],
          mixSecret: secret
        },
        MODERN: {
          description: `Produção moderna e comercial de ${formName} com vocais brilhantes, graves firmes e presença de estúdio.`,
          vocalChain: [
            { position: 1, plugin: 'Fruity Parametric EQ 2', action: 'Presence & Air Boost', params: '+2.5dB em 4kHz + High Shelf em 12kHz' },
            { position: 2, plugin: 'Fruity Blood Overdrive', action: 'Saturação Harmônica', params: 'Drive 0.2 | Mix 20%' },
            { position: 3, plugin: 'Fruity Limiter', action: 'Fast Peak Limiting', params: 'Ratio 4.5:1 | Att 10ms' },
            { position: 4, plugin: 'Fruity Delay 3', action: 'Ducking Ping-Pong', params: '1/8 Dotted' }
          ],
          drumsChain: [
            { element: 'Bateria / Batida', plugin: 'Fruity Soft Clipper', action: 'Punch no peito' }
          ],
          bassChain: [
            { element: '808 / Linha de Baixo', plugin: 'WaveShaper', action: 'Saturação para colunas' }
          ],
          masterChain: [
            { position: 1, plugin: 'Fruity Soft Clipper', action: 'Clip suave de transientes' },
            { position: 2, plugin: 'Fruity Limiter', action: 'Alvo -9 a -10 LUFS (Potência)' }
          ],
          mixSecret: secret
        },
        AGGRESSIVE: {
          description: `Versão pesada para discoteca e sound system de ${formName} com pressão sonora máxima.`,
          vocalChain: [
            { position: 1, plugin: 'Fruity Fast Dist', action: 'Distorção & Atitude', params: 'Drive 30%' },
            { position: 2, plugin: 'Fruity Limiter', action: 'Hard Compression', params: 'Ratio 6:1 | GR 6-8dB' }
          ],
          drumsChain: [
            { element: 'Drums Bus', plugin: 'Fruity Soft Clipper', action: 'Hard clip em +2dB' }
          ],
          bassChain: [
            { element: 'Heavy Bass', plugin: 'Fruity Blood Overdrive', action: 'Drive 0.4' }
          ],
          masterChain: [
            { position: 1, plugin: 'Fruity Limiter', action: 'Alvo -7.5 a -8.5 LUFS' }
          ],
          mixSecret: secret
        }
      }
    };

    saveCustomGenre(genreObj);
    const updatedAll = getAllGenres();
    setGenresList(updatedAll);
    setSelectedGenreId(genreObj.id);
    resetForm();
  };

  const handleDeleteCustom = (id: string) => {
    if (confirm('Deseja excluir este estilo personalizado?')) {
      deleteCustomGenre(id);
      const updatedAll = getAllGenres();
      setGenresList(updatedAll);
      setSelectedGenreId(updatedAll[0].id);
    }
  };

  const filteredGenres = genresList.filter(g => {
    const q = searchQuery.toLowerCase();
    return g.name.toLowerCase().includes(q) || g.origin.toLowerCase().includes(q);
  });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="rounded-2xl bg-[#15191E] border border-[#2A2F36] p-6 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold font-mono">
              <Globe className="w-3.5 h-3.5" />
              CADEIAS DE PRODUÇÃO POR ESTILO MUSICAL ({genresList.length} ESTILOS DISPONÍVEIS)
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Cadeias por Estilo & Gêneros Musicais
            </h1>
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
              Configurações detalhadas de balance, saturação, graves, compressão e loudness ajustados para <span className="text-cyan-300 font-bold">Kuduro, Semba, Tarraxinha, Afrobeat, Amapiano, Trap, Drill</span> e estilos personalizados.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenCreate}
              className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-cyan-600/30 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar Mais Estilos</span>
            </button>
          </div>
        </div>

        {/* Search Bar for Genres */}
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filtrar por nome ou país (ex: Kuduro, Angola, Trap, Brasil...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0B0E11] border border-[#2A2F36] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Genre Selector Pills */}
      <div className="p-2.5 rounded-xl bg-[#15191E] border border-[#2A2F36] overflow-x-auto flex gap-2 no-scrollbar">
        {filteredGenres.map((genre) => {
          const isSelected = genre.id === selectedGenreId;
          const isKuduro = genre.id === 'kuduro';
          const isCustom = customGenresIds.has(genre.id);

          return (
            <button
              key={genre.id}
              onClick={() => setSelectedGenreId(genre.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                isSelected
                  ? isKuduro 
                    ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-[0_0_12px_rgba(234,88,12,0.4)]'
                    : 'bg-cyan-600 text-white shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                  : 'bg-[#0B0E11] text-gray-400 hover:text-white hover:bg-[#1E2329] border border-[#2A2F36]'
              }`}
            >
              {isKuduro ? (
                <Flame className="w-3.5 h-3.5 text-orange-300 animate-pulse" />
              ) : (
                <Music className="w-3.5 h-3.5 text-cyan-400" />
              )}
              <span>{genre.name}</span>
              {isCustom && (
                <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                  Custom
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Modal / Drawer for Creating / Editing Custom Genre */}
      {isAddingModalOpen && (
        <form onSubmit={handleSaveGenre} className="rounded-2xl bg-[#15191E] border-2 border-cyan-500/50 p-6 md:p-7 space-y-6 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between border-b border-[#2A2F36] pb-4">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-cyan-400" />
              <span>{editingCustomId ? 'Editar Estilo Musical Personalizado' : 'Adicionar Novo Estilo Musical Personalizado'}</span>
            </h3>
            <button
              type="button"
              onClick={resetForm}
              className="text-xs text-gray-400 hover:text-white cursor-pointer"
            >
              Cancelar
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="text-gray-400 font-bold block mb-1">Nome do Estilo / Gênero *</label>
              <input
                type="text"
                required
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Ex: Kuduro Puro, Tarraxinha Sensual, Semba Raiz..."
                className="w-full bg-[#0B0E11] border border-[#2A2F36] rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-gray-400 font-bold block mb-1">Origem / Região</label>
              <input
                type="text"
                value={formOrigin}
                onChange={(e) => setFormOrigin(e.target.value)}
                placeholder="Ex: Angola (Luanda), Cabo Verde, Brasil..."
                className="w-full bg-[#0B0E11] border border-[#2A2F36] rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-gray-400 font-bold block mb-1">Faixa de Andamento (BPM)</label>
              <input
                type="text"
                value={formBpmRange}
                onChange={(e) => setFormBpmRange(e.target.value)}
                placeholder="Ex: 135 – 145 BPM"
                className="w-full bg-[#0B0E11] border border-[#2A2F36] rounded-lg px-3 py-2.5 text-emerald-400 font-mono font-bold focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <label className="text-gray-400 font-bold block">Princípios & Dicas Fundamentais do Estilo (1 a 3 itens)</label>
            <input
              type="text"
              value={formAdvice1}
              onChange={(e) => setFormAdvice1(e.target.value)}
              placeholder="Dica 1: Ex: Bateria sincopada com apitos e dikanza nas laterais..."
              className="w-full bg-[#0B0E11] border border-[#2A2F36] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
            />
            <input
              type="text"
              value={formAdvice2}
              onChange={(e) => setFormAdvice2(e.target.value)}
              placeholder="Dica 2: Ex: 808 rápido com saturação harmônica para tocar em telemóveis..."
              className="w-full bg-[#0B0E11] border border-[#2A2F36] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
            />
            <input
              type="text"
              value={formAdvice3}
              onChange={(e) => setFormAdvice3(e.target.value)}
              placeholder="Dica 3: Ex: Vocais com autotune rápido e dobras enérgicas nos refrões..."
              className="w-full bg-[#0B0E11] border border-[#2A2F36] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="text-xs">
            <label className="text-gray-400 font-bold block mb-1">Segredo de Mixagem do Produtor</label>
            <textarea
              rows={2}
              value={formMixSecret}
              onChange={(e) => setFormMixSecret(e.target.value)}
              placeholder="Ex: Use compressão paralela no bus de percussões e corte frequências abaixo de 30Hz no Master..."
              className="w-full bg-[#0B0E11] border border-[#2A2F36] rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-cyan-500"
            />
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
              <span>{editingCustomId ? 'Salvar Alterações' : 'Criar & Adicionar Estilo'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Genre Detailed Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Genre Specs & Mode Selector */}
        <div className="space-y-6">
          {/* Genre Overview Card */}
          <div className="rounded-2xl bg-[#15191E] border border-[#2A2F36] p-6 space-y-4 shadow-lg">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1">
                  {currentGenre.id === 'kuduro' && <Flame className="w-3.5 h-3.5 text-orange-400" />}
                  Gênero Selecionado
                </span>
                <h2 className="text-2xl font-extrabold text-white">{currentGenre.name}</h2>
                <p className="text-xs text-gray-400 mt-1">
                  Origem: <span className="text-gray-200">{currentGenre.origin}</span>
                </p>
              </div>

              {isCurrentGenreCustom && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(currentGenre)}
                    className="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-[#0B0E11] transition-colors cursor-pointer"
                    title="Editar estilo personalizado"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteCustom(currentGenre.id)}
                    className="p-1.5 rounded-md text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                    title="Excluir estilo personalizado"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            <div className="p-3 bg-[#0B0E11] rounded-xl border border-[#2A2F36] text-xs font-mono flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-500 block">ANDAMENTO TÍPICO</span>
                <span className="text-emerald-400 font-bold text-sm">{currentGenre.bpmRange}</span>
              </div>
              {currentGenre.id === 'kuduro' && (
                <span className="text-[10px] px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 font-bold border border-orange-500/30">
                  Batida Rápida
                </span>
              )}
            </div>

            {/* Key Advice */}
            <div className="p-4 bg-[#0B0E11] rounded-xl border border-[#2A2F36] text-xs space-y-2.5">
              <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider block">
                Princípios do Estilo no FL Studio
              </span>
              {currentGenre.keyAdvice.map((adv, idx) => (
                <div key={idx} className="flex items-start gap-2 text-gray-300 text-[11px] leading-relaxed">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{adv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mode Switcher (Clean vs Modern vs Aggressive) */}
          <div className="rounded-2xl bg-[#15191E] border border-[#2A2F36] p-6 space-y-3 shadow-lg">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
              Selecione o Perfil Sonoro (Modo)
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(['CLEAN', 'MODERN', 'AGGRESSIVE'] as const).map((mode) => {
                const isSelected = selectedMode === mode;
                return (
                  <button
                    key={mode}
                    onClick={() => setSelectedMode(mode)}
                    className={`py-2.5 px-2 rounded-lg text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
                      isSelected
                        ? mode === 'CLEAN'
                          ? 'bg-cyan-600 text-white shadow-md'
                          : mode === 'MODERN'
                          ? 'bg-orange-600 text-white shadow-md'
                          : 'bg-red-600 text-white shadow-md'
                        : 'bg-[#0B0E11] text-gray-400 hover:text-white border border-[#2A2F36]'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>{mode}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Mode Detailed Recommendations & Plugin Chains */}
        <div className="lg:col-span-2 rounded-2xl bg-[#15191E] border border-[#2A2F36] p-6 md:p-7 space-y-6 shadow-xl">
          {/* Mode Header */}
          <div className="flex items-center justify-between border-b border-[#2A2F36] pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400">
                Perfil Sonoro Selecionado:
              </span>
              <h3 className="text-xl font-extrabold text-white flex items-center gap-2 mt-0.5">
                <span>Modo {selectedMode}</span>
                <span className={`text-xs px-2.5 py-0.5 rounded font-mono font-bold ${
                  selectedMode === 'CLEAN' ? 'bg-cyan-500/20 text-cyan-300' :
                  selectedMode === 'MODERN' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-red-500/20 text-red-300'
                }`}>
                  {selectedMode}
                </span>
              </h3>
            </div>
          </div>

          <p className="text-xs text-gray-300 leading-relaxed font-medium bg-[#0B0E11] p-3.5 rounded-lg border border-[#2A2F36]">
            {modeData.description}
          </p>

          {/* Vocal Chain */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
              Cadeia Vocal Recomendada ({currentGenre.name} - {selectedMode})
            </h4>
            <div className="space-y-2">
              {modeData.vocalChain.map((step) => (
                <div
                  key={step.position}
                  className="p-3 rounded-lg bg-[#0B0E11] border border-[#2A2F36] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-bold shrink-0">
                      {step.position}
                    </span>
                    <span className="font-bold text-white">{step.plugin}</span>
                    <span className="text-[11px] text-cyan-300">({step.action})</span>
                  </div>
                  <span className="text-[11px] font-mono text-gray-400">{step.params}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Drums & Bass Chains */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Tratamento de Bateria / Batida
              </h4>
              <div className="space-y-2">
                {modeData.drumsChain.map((d, idx) => (
                  <div key={idx} className="p-3 bg-[#0B0E11] border border-[#2A2F36] rounded-lg text-xs space-y-0.5">
                    <span className="font-bold text-orange-400 block">{d.element}</span>
                    <span className="text-gray-300 font-mono text-[11px] block">{d.plugin}</span>
                    <span className="text-gray-500 text-[10px] block">{d.action}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Tratamento de Baixo / 808
              </h4>
              <div className="space-y-2">
                {modeData.bassChain.map((b, idx) => (
                  <div key={idx} className="p-3 bg-[#0B0E11] border border-[#2A2F36] rounded-lg text-xs space-y-0.5">
                    <span className="font-bold text-cyan-400 block">{b.element}</span>
                    <span className="text-gray-300 font-mono text-[11px] block">{b.plugin}</span>
                    <span className="text-gray-500 text-[10px] block">{b.action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Master Chain for this genre */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Master Bus
            </h4>
            <div className="space-y-1.5">
              {modeData.masterChain.map((m) => (
                <div key={m.position} className="p-2.5 rounded-lg bg-[#0B0E11] border border-[#2A2F36] text-xs text-gray-200 flex items-center justify-between font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-bold">
                      {m.position}
                    </span>
                    <span className="font-bold text-white">{m.plugin}</span>
                  </div>
                  <span className="text-[11px] text-gray-400">{m.action}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mix Secret */}
          <div className="p-3.5 rounded-lg bg-orange-500/5 border border-orange-500/30 text-xs space-y-1 text-orange-200">
            <span className="font-bold flex items-center gap-1.5 text-orange-400">
              <Sparkles className="w-3.5 h-3.5" />
              Segredo de Mixagem para {currentGenre.name}
            </span>
            <p className="text-gray-300 leading-relaxed text-[11px]">
              {modeData.mixSecret}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
