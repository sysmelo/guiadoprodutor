import React, { useState } from 'react';
import { instrumentsData } from '../data/instrumentsData';
import { Music, Search, Sliders, Layers, Sparkles, Activity, Mic2, Plug, ArrowRight } from 'lucide-react';
import { InstrumentGuide, NavigationTab } from '../types';

interface InstrumentsViewProps {
  onNavigate: (tab: NavigationTab) => void;
  onOpenAnalyzer: () => void;
}

type PluginChainEcosystem = 'flNative' | 's1Native' | 'waves' | 'fabfilter' | 'hybridPro';

export const InstrumentsView: React.FC<InstrumentsViewProps> = ({ onNavigate, onOpenAnalyzer }) => {
  const [selectedId, setSelectedId] = useState<string>(instrumentsData[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [workflowFilter, setWorkflowFilter] = useState<'ALL' | 'VOCAL' | 'INSTRUMENTAL'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | 'VOCAL' | 'DRUMS' | 'BAIXO' | 'INSTRUMENTOS'>('ALL');
  const [selectedChainEcosystem, setSelectedChainEcosystem] = useState<PluginChainEcosystem>('flNative');

  const filteredInstruments = instrumentsData.filter((inst) => {
    const matchesSearch = inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (inst.description && inst.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          inst.stereoPlacement.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesWorkflow = workflowFilter === 'ALL' || inst.mixTarget === workflowFilter;
    const matchesCat = categoryFilter === 'ALL' || inst.category === categoryFilter;
    return matchesSearch && matchesWorkflow && matchesCat;
  });

  const current = instrumentsData.find(i => i.id === selectedId) || filteredInstruments[0] || instrumentsData[0];

  const getActiveChain = (inst: InstrumentGuide, ecosystem: PluginChainEcosystem): string[] => {
    switch (ecosystem) {
      case 's1Native':
        return inst.s1NativeChain || inst.flPluginChain;
      case 'waves':
        return inst.wavesChain || inst.flPluginChain;
      case 'fabfilter':
        return inst.fabfilterChain || inst.flPluginChain;
      case 'hybridPro':
        return inst.hybridProChain || inst.flPluginChain;
      case 'flNative':
      default:
        return inst.flPluginChain;
    }
  };

  const currentChain = getActiveChain(current, selectedChainEcosystem);

  return (
    <div className="p-3 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-4 sm:space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="rounded-2xl bg-[#15191E] border border-[#2A2F36] p-4 sm:p-6 md:p-8 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold">
              <Music className="w-3.5 h-3.5" />
              GUIA ELEMENTO POR ELEMENTO: VOCAL & INSTRUMENTAL
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
              Catálogo de Instrumentos e Cadeias de Efeitos
            </h1>
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
              Tratamento individual para Vocais, Kick, 808, Snare, Hi-Hats, Percussão Africana, Pianos, Guitarras e Synths com opções de cadeias nativas (<strong className="text-orange-400">FL Studio</strong> e <strong className="text-blue-400">Studio One</strong>) e externas (<strong className="text-indigo-400">Waves</strong>, <strong className="text-emerald-400">FabFilter</strong>, <strong className="text-purple-400">Híbridas de Elite</strong>).
            </p>
          </div>

          <button
            onClick={onOpenAnalyzer}
            className="px-4 py-2.5 rounded-xl bg-[#0B0E11] hover:bg-[#1E2329] border border-[#2A2F36] hover:border-cyan-500/50 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer shadow-sm w-full md:w-auto"
          >
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>Abrir Analisador FFT</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Selector and Filters */}
        <div className="space-y-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar elemento (ex: Lead Vocal, 808, Kick, Piano)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#15191E] border border-[#2A2F36] rounded-lg pl-9 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/60"
            />
          </div>

          {/* Workflow Mode Filter Tabs */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-[#15191E] border border-[#2A2F36] rounded-lg text-xs font-bold">
            <button
              onClick={() => setWorkflowFilter('ALL')}
              className={`py-1.5 rounded-md transition-all cursor-pointer text-[11px] ${
                workflowFilter === 'ALL'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setWorkflowFilter('VOCAL')}
              className={`py-1.5 rounded-md transition-all cursor-pointer text-[11px] flex items-center justify-center gap-1 ${
                workflowFilter === 'VOCAL'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Mic2 className="w-3 h-3" />
              <span>Vocal</span>
            </button>
            <button
              onClick={() => setWorkflowFilter('INSTRUMENTAL')}
              className={`py-1.5 rounded-md transition-all cursor-pointer text-[11px] flex items-center justify-center gap-1 ${
                workflowFilter === 'INSTRUMENTAL'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Music className="w-3 h-3" />
              <span>Beat</span>
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-1 p-1 bg-[#15191E] border border-[#2A2F36] rounded-lg text-xs">
            {(['ALL', 'VOCAL', 'DRUMS', 'BAIXO', 'INSTRUMENTOS'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`flex-1 py-1.5 rounded-md font-bold text-[10px] transition-all cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-gray-700 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredInstruments.map((inst) => {
              const isSelected = inst.id === selectedId;
              return (
                <div
                  key={inst.id}
                  onClick={() => setSelectedId(inst.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-cyan-500/10 border-cyan-500 text-white shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                      : 'bg-[#15191E] border-[#2A2F36] text-gray-300 hover:border-cyan-500/40 hover:bg-[#1A1F26]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold">{inst.name}</span>
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded ${
                      inst.category === 'VOCAL' ? 'bg-cyan-500/20 text-cyan-300' :
                      inst.category === 'DRUMS' ? 'bg-orange-500/20 text-orange-300' :
                      inst.category === 'BAIXO' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-purple-500/20 text-purple-300'
                    }`}>
                      {inst.subCategory || inst.category}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 block mt-1 truncate">
                    Posicionamento: {inst.stereoPlacement}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Instrument Inspector */}
        <div className="lg:col-span-2 rounded-xl bg-[#15191E] border border-[#2A2F36] p-6 md:p-7 space-y-6 shadow-xl">
          
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2A2F36] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  Elemento da Mixagem
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#0B0E11] text-gray-300 border border-[#2A2F36]">
                  {current.mixTarget === 'VOCAL' ? '🎙️ Mix Vocal' : '🎹 Mix Beat'}
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-white mt-0.5">{current.name}</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-1 rounded-lg bg-[#0B0E11] border border-[#2A2F36] text-gray-300 font-mono">
                Pan: {current.stereoPlacement}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-orange-500/10 text-orange-300 border border-orange-500/30 font-mono">
                Saturação: {current.saturationRec}
              </span>
            </div>
          </div>

          {current.description && (
            <p className="text-xs text-gray-300 leading-relaxed font-medium">
              {current.description}
            </p>
          )}

          {/* Frequencies */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              <span>Guia de Equalização Cirúrgica (Fruity Parametric EQ 2 / Pro EQ³ / Pro-Q 3)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="p-3.5 bg-[#0B0E11] border border-[#2A2F36] rounded-lg">
                <span className="text-[10px] text-red-400 font-mono font-bold block mb-0.5">CORTE / HPF / LPF</span>
                <span className="text-gray-200">{current.freqFocus.cut}</span>
              </div>
              <div className="p-3.5 bg-[#0B0E11] border border-[#2A2F36] rounded-lg">
                <span className="text-[10px] text-cyan-400 font-mono font-bold block mb-0.5">CORPO / PESO</span>
                <span className="text-gray-200">{current.freqFocus.body}</span>
              </div>
              <div className="p-3.5 bg-[#0B0E11] border border-[#2A2F36] rounded-lg">
                <span className="text-[10px] text-orange-400 font-mono font-bold block mb-0.5">PRESENÇA / DEFINIÇÃO</span>
                <span className="text-gray-200">{current.freqFocus.presence}</span>
              </div>
              <div className="p-3.5 bg-[#0B0E11] border border-[#2A2F36] rounded-lg">
                <span className="text-[10px] text-emerald-400 font-mono font-bold block mb-0.5">AR / PUNCH / TEXTURA</span>
                <span className="text-gray-200">{current.freqFocus.airOrPunch}</span>
              </div>
            </div>
          </div>

          {/* Compression Specs */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
              Parâmetros Iniciais de Compressão
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
              <div className="p-3 bg-[#0B0E11] border border-[#2A2F36] rounded-lg">
                <span className="text-[10px] text-gray-500 block">RATIO</span>
                <span className="text-white font-bold">{current.compressionSettings.ratio}</span>
              </div>
              <div className="p-3 bg-[#0B0E11] border border-[#2A2F36] rounded-lg">
                <span className="text-[10px] text-gray-500 block">ATTACK</span>
                <span className="text-white font-bold">{current.compressionSettings.attack}</span>
              </div>
              <div className="p-3 bg-[#0B0E11] border border-[#2A2F36] rounded-lg">
                <span className="text-[10px] text-gray-500 block">RELEASE</span>
                <span className="text-white font-bold">{current.compressionSettings.release}</span>
              </div>
              <div className="p-3 bg-[#0B0E11] border border-[#2A2F36] rounded-lg">
                <span className="text-[10px] text-gray-500 block">REDUÇÃO DE GANHO</span>
                <span className="text-emerald-400 font-bold">{current.compressionSettings.gainReduction}</span>
              </div>
            </div>
          </div>

          {/* Plugin Chain Selector & List */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <Plug className="w-3.5 h-3.5 text-cyan-400" />
                <span>Cadeia de Efeitos: DAW & Plugins</span>
              </h3>
              <div className="flex flex-wrap gap-1 p-1 bg-[#0B0E11] border border-[#2A2F36] rounded-lg">
                {[
                  { id: 'flNative', label: 'FL Studio' },
                  { id: 's1Native', label: 'Studio One' },
                  { id: 'waves', label: 'Waves' },
                  { id: 'fabfilter', label: 'FabFilter' },
                  { id: 'hybridPro', label: 'Híbrida' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedChainEcosystem(tab.id as PluginChainEcosystem)}
                    className={`text-[10px] px-2.5 py-1 rounded font-bold transition-all cursor-pointer ${
                      selectedChainEcosystem === tab.id
                        ? 'bg-cyan-600 text-white shadow-sm'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              {currentChain.map((step, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[#0B0E11] border border-[#2A2F36] text-xs text-gray-200 font-mono flex items-start gap-2.5 hover:border-cyan-500/40 transition-all">
                  <span className="w-5 h-5 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sidechain Tip (If any) */}
          {current.sidechainTip && (
            <div className="p-3.5 rounded-lg bg-orange-500/10 border border-orange-500/30 text-xs text-orange-200 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-orange-400 block mb-0.5">Configuração de Sidechain / Ducking:</strong>
                <span>{current.sidechainTip}</span>
              </div>
            </div>
          )}

          {/* Expert Tips */}
          {current.expertTips.length > 0 && (
            <div className="p-3.5 rounded-lg bg-cyan-500/5 border border-cyan-500/20 text-xs space-y-1 text-cyan-200">
              <span className="font-bold flex items-center gap-1.5 text-cyan-400">
                <Sparkles className="w-3.5 h-3.5" />
                Segredos de Estúdio & Engenharia
              </span>
              {current.expertTips.map((tip, idx) => (
                <p key={idx} className="text-[11px] text-gray-300 leading-relaxed">• {tip}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
