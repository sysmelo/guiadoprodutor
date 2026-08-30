import React, { useState } from 'react';
import { genreChainsData } from '../data/genreChainsData';
import { Globe, Music, Gauge, Layers, Sparkles, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { GenreMode } from '../types';

export const GenresView: React.FC = () => {
  const [selectedGenreId, setSelectedGenreId] = useState<string>(genreChainsData[0].id);
  const [selectedMode, setSelectedMode] = useState<GenreMode>('MODERN');

  const currentGenre = genreChainsData.find(g => g.id === selectedGenreId) || genreChainsData[0];
  const modeData = currentGenre.modes[selectedMode];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="rounded-xl bg-[#15191E] border border-[#2A2F36] p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold">
              <Globe className="w-3.5 h-3.5" />
              SEÇÃO 6 — CADEIAS DE PRODUÇÃO POR ESTILO MUSICAL (15 GÊNEROS)
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              Cadeias por Estilo Musical
            </h1>
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
              Configurações detalhadas de balance, saturação, graves, compressão e loudness ajustados para 15 gêneros musicais e 3 modos sonoros (Clean, Modern e Aggressive).
            </p>
          </div>
        </div>
      </div>

      {/* Genre Selector Pills */}
      <div className="p-2 rounded-xl bg-[#15191E] border border-[#2A2F36] overflow-x-auto flex gap-2 no-scrollbar">
        {genreChainsData.map((genre) => {
          const isSelected = genre.id === selectedGenreId;
          return (
            <button
              key={genre.id}
              onClick={() => setSelectedGenreId(genre.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                isSelected
                  ? 'bg-cyan-600 text-white shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                  : 'bg-[#0B0E11] text-gray-400 hover:text-white hover:bg-[#1E2329] border border-[#2A2F36]'
              }`}
            >
              <Music className="w-3.5 h-3.5 text-cyan-400" />
              <span>{genre.name}</span>
            </button>
          );
        })}
      </div>

      {/* Genre Detailed Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Genre Specs & Mode Selector */}
        <div className="space-y-6">
          {/* Genre Overview Card */}
          <div className="rounded-xl bg-[#15191E] border border-[#2A2F36] p-6 space-y-4 shadow-lg">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                Gênero Selecionado
              </span>
              <h2 className="text-2xl font-extrabold text-white">{currentGenre.name}</h2>
              <p className="text-xs text-gray-400 mt-1">
                Origem: <span className="text-gray-200">{currentGenre.origin}</span>
              </p>
            </div>

            <div className="p-3 bg-[#0B0E11] rounded-lg border border-[#2A2F36] text-xs font-mono">
              <span className="text-[10px] text-gray-500 block">ANDAMENTO TÍPICO</span>
              <span className="text-emerald-400 font-bold text-sm">{currentGenre.bpmRange}</span>
            </div>

            {/* Key Advice */}
            <div className="p-4 bg-[#0B0E11] rounded-lg border border-[#2A2F36] text-xs space-y-2">
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
          <div className="rounded-xl bg-[#15191E] border border-[#2A2F36] p-6 space-y-3 shadow-lg">
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
        <div className="lg:col-span-2 rounded-xl bg-[#15191E] border border-[#2A2F36] p-6 md:p-7 space-y-6 shadow-xl">
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
                Tratamento de Bateria
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

