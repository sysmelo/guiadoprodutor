import React, { useState } from 'react';
import { instrumentsData } from '../data/instrumentsData';
import { Music, Search, Sliders, Layers, Sparkles, CheckCircle2, ChevronRight, Activity } from 'lucide-react';
import { InstrumentGuide, NavigationTab } from '../types';

interface InstrumentsViewProps {
  onNavigate: (tab: NavigationTab) => void;
  onOpenAnalyzer: () => void;
}

export const InstrumentsView: React.FC<InstrumentsViewProps> = ({ onNavigate, onOpenAnalyzer }) => {
  const [selectedId, setSelectedId] = useState<string>(instrumentsData[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | 'VOCAL' | 'DRUMS' | 'BAIXO' | 'INSTRUMENTOS'>('ALL');

  const filteredInstruments = instrumentsData.filter((inst) => {
    const matchesSearch = inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          inst.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          inst.stereoPlacement.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'ALL' || inst.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const current = instrumentsData.find(i => i.id === selectedId) || instrumentsData[0];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="rounded-xl bg-[#15191E] border border-[#2A2F36] p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold">
              <Music className="w-3.5 h-3.5" />
              GUIA ELEMENTO POR ELEMENTO DE PRODUÇÃO & MIX
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              Guia Completo de Instrumentos
            </h1>
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
              Tratamento individual para Kick, 808, Snare, Hi-Hats, Vocais, Pianos, Guitarras, Synths e Percussões com frequências cirúrgicas e compressão.
            </p>
          </div>

          <button
            onClick={onOpenAnalyzer}
            className="px-4 py-2.5 rounded-lg bg-[#0B0E11] hover:bg-[#1E2329] border border-[#2A2F36] hover:border-cyan-500/50 text-white text-xs font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer"
          >
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>Abrir Analisador FFT</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Selector */}
        <div className="space-y-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar instrumento (ex: Kick, 808, Piano)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#15191E] border border-[#2A2F36] rounded-lg pl-9 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/60"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-1 p-1 bg-[#15191E] border border-[#2A2F36] rounded-lg text-xs">
            {(['ALL', 'VOCAL', 'DRUMS', 'BAIXO', 'INSTRUMENTOS'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`flex-1 py-1.5 rounded-md font-bold text-[10px] transition-all cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-cyan-600 text-white shadow-sm'
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
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#0B0E11] text-cyan-400 border border-[#2A2F36]">
                      {inst.category}
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
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2A2F36] pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                Elemento da Mixagem
              </span>
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

          <p className="text-xs text-gray-300 leading-relaxed font-medium">
            {current.description}
          </p>

          {/* Frequencies */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
              Guia de Equalização Cirúrgica (Fruity Parametric EQ 2 / Pro-Q 3)
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
                <span className="text-[10px] text-emerald-400 font-mono font-bold block mb-0.5">AR / PUNCH</span>
                <span className="text-gray-200">{current.freqFocus.airOrPunch}</span>
              </div>
            </div>
          </div>

          {/* Compression Specs */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
              Parâmetros de Compressão
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

          {/* Plugin Chain */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
              Cadeia de Inserção no Mixer (FL Studio)
            </h3>
            <div className="space-y-1.5">
              {current.flPluginChain.map((step, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-[#0B0E11] border border-[#2A2F36] text-xs text-gray-200 font-mono flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Expert Tips */}
          {current.expertTips.length > 0 && (
            <div className="p-3.5 rounded-lg bg-cyan-500/5 border border-cyan-500/20 text-xs space-y-1 text-cyan-200">
              <span className="font-bold flex items-center gap-1.5 text-cyan-400">
                <Sparkles className="w-3.5 h-3.5" />
                Segredo de Estúdio
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

