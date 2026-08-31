import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Zap,
  Sliders,
  Flame,
  Music,
  Disc3,
  Clock,
  ArrowRight,
  ShieldCheck,
  Radio,
  Layers,
  CheckCircle2,
  HelpCircle,
  FolderKanban,
  ChevronRight,
  Gauge
} from 'lucide-react';
import { Project, GenreMode, GenreChain, NavigationTab } from '../types';
import { genreChainsData } from '../data/genreChainsData';

interface SmartGenreTipsProps {
  activeProject: Project | null;
  onNavigate: (tab: NavigationTab) => void;
  onOpenDelayCalc?: () => void;
  onOpenAnalyzer?: () => void;
}

export const SmartGenreTips: React.FC<SmartGenreTipsProps> = ({
  activeProject,
  onNavigate,
  onOpenDelayCalc,
  onOpenAnalyzer
}) => {
  const [selectedMode, setSelectedMode] = useState<GenreMode>('MODERN');
  const [activeCategoryTab, setActiveCategoryTab] = useState<'vocal' | 'drums' | 'bass' | 'master' | 'advice'>('vocal');
  const [manualGenreOverride, setManualGenreOverride] = useState<string | null>(null);

  // Find matching genre in dataset
  const currentGenreName = manualGenreOverride || activeProject?.genre || 'Afrobeat';

  const matchedGenre: GenreChain = useMemo(() => {
    const searchTarget = currentGenreName.toLowerCase();

    // 1. Direct or partial matches
    const found = genreChainsData.find(g => {
      const gName = g.name.toLowerCase();
      const gId = g.id.toLowerCase();
      return (
        searchTarget.includes(gId) ||
        searchTarget.includes(gName) ||
        gName.includes(searchTarget) ||
        (searchTarget.includes('kuduro') && gId === 'kuduro') ||
        (searchTarget.includes('afrobeat') && gId === 'afrobeat') ||
        (searchTarget.includes('amapiano') && gId === 'amapiano') ||
        (searchTarget.includes('kizomba') && gId === 'kizomba') ||
        (searchTarget.includes('tarrax') && gId === 'tarraxinha') ||
        (searchTarget.includes('semba') && gId === 'semba') ||
        (searchTarget.includes('trap') && gId === 'trap') ||
        (searchTarget.includes('drill') && gId === 'drill') ||
        (searchTarget.includes('r&b') && gId === 'rnb') ||
        (searchTarget.includes('soul') && gId === 'rnb') ||
        (searchTarget.includes('hip') && gId === 'hiphop') ||
        (searchTarget.includes('boombap') && gId === 'hiphop') ||
        (searchTarget.includes('gospel') && gId === 'gospel') ||
        (searchTarget.includes('pop') && gId === 'pop') ||
        (searchTarget.includes('zouk') && gId === 'zouk') ||
        (searchTarget.includes('deep') && gId === 'deephouse') ||
        (searchTarget.includes('house') && gId === 'afrohouse') ||
        (searchTarget.includes('dancehall') && gId === 'dancehall') ||
        (searchTarget.includes('afropop') && gId === 'afropop')
      );
    });

    return found || genreChainsData[0]; // Default to Afrobeat if not found
  }, [currentGenreName]);

  const activeModeData = matchedGenre.modes[selectedMode] || matchedGenre.modes.MODERN;

  // BPM Intelligence Calculation
  const bpmAnalysis = useMemo(() => {
    const projectBpm = activeProject?.bpm || 120;
    const bpmRangeStr = matchedGenre.bpmRange; // e.g. "98 – 112 BPM" or "135 – 145 BPM"
    const matches = bpmRangeStr.match(/(\d+)\s*[–-]\s*(\d+)/);
    
    if (matches) {
      const minBpm = parseInt(matches[1], 10);
      const maxBpm = parseInt(matches[2], 10);

      if (projectBpm >= minBpm && projectBpm <= maxBpm) {
        return {
          status: 'perfect',
          text: `Seu projeto está a ${projectBpm} BPM — na zona ideal perfeita para ${matchedGenre.name} (${matchedGenre.bpmRange}).`,
          badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
        };
      } else if (projectBpm < minBpm) {
        return {
          status: 'low',
          text: `Seu projeto está a ${projectBpm} BPM (abaixo da média de ${matchedGenre.bpmRange}). Se for intencional, adicione mais swing e delays longos.`,
          badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
        };
      } else {
        return {
          status: 'high',
          text: `Seu projeto está a ${projectBpm} BPM (acima da média de ${matchedGenre.bpmRange}). Cuidado com transientes rápidos para não embolar o subgrave.`,
          badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
        };
      }
    }

    return {
      status: 'neutral',
      text: `Andamento do projeto: ${projectBpm} BPM. Faixa típica do gênero: ${matchedGenre.bpmRange}.`,
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
    };
  }, [activeProject?.bpm, matchedGenre]);

  return (
    <div className="rounded-2xl bg-[#11141A] border border-cyan-500/30 p-5 md:p-6 shadow-2xl space-y-5 relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER: Title & Active Genre Badge */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#222731] pb-4 relative z-10">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)] shrink-0">
            <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_8px_rgba(6,182,212,0.2)]">
                Dicas Inteligentes por Gênero
              </span>
              <span className="text-[10px] font-mono text-gray-400">
                Assistente de Produção & Mixagem
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-black text-white tracking-tight mt-1 flex items-center gap-2">
              <span>Técnicas Recomendadas para</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-amber-200 font-extrabold">
                {matchedGenre.name}
              </span>
            </h3>
          </div>
        </div>

        {/* Project Context & Genre Override Selector */}
        <div className="flex flex-wrap items-center gap-2">
          {activeProject ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#161B22] border border-[#242A34] text-xs">
              <FolderKanban className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-gray-300 font-medium truncate max-w-[140px] sm:max-w-[180px]">
                {activeProject.name}
              </span>
              <span className="text-[10px] font-mono text-cyan-400 font-bold px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                {activeProject.bpm} BPM
              </span>
              <span className="text-[10px] font-mono text-amber-400 font-bold px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                {activeProject.key}
              </span>
            </div>
          ) : (
            <span className="text-[11px] text-gray-400 italic">
              Nenhuma sessão ativa selecionada
            </span>
          )}

          {/* Quick Switch Genre Dropdown */}
          <select
            value={matchedGenre.id}
            onChange={(e) => setManualGenreOverride(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-[#090C0F] border border-cyan-500/30 text-xs font-mono font-bold text-cyan-300 focus:outline-none focus:border-cyan-400 cursor-pointer shadow-inner"
          >
            {genreChainsData.map(g => (
              <option key={g.id} value={g.id} className="bg-[#11141A] text-white">
                {g.name} ({g.origin.split('/')[0].trim()})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* BPM & STYLE INTELLIGENCE ALERT */}
      <div className="p-3.5 rounded-xl bg-[#0D1015] border border-[#1F242E] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/20">
            <Gauge className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-gray-400 uppercase font-bold tracking-wider block">
              Análise Rítmica & Andamento
            </span>
            <p className="text-gray-200 text-xs font-medium">
              {bpmAnalysis.text}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-[10px] font-mono font-bold px-2 py-1 rounded-lg border ${bpmAnalysis.badgeColor}`}>
            {matchedGenre.bpmRange}
          </span>
          {onOpenDelayCalc && (
            <button
              onClick={onOpenDelayCalc}
              className="px-2.5 py-1 rounded-lg bg-[#18202A] hover:bg-cyan-600 hover:text-white text-cyan-300 text-[10px] font-mono font-bold border border-cyan-500/30 transition-all flex items-center gap-1 cursor-pointer"
            >
              <Clock className="w-3 h-3" />
              <span>Delay Calc</span>
            </button>
          )}
        </div>
      </div>

      {/* MIX SECRET HIGHLIGHT (GOLDEN TIP) */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/15 via-amber-500/8 to-transparent border-l-4 border-amber-400 border-y border-r border-amber-500/20 relative shadow-lg">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-400/40 shrink-0 mt-0.5 shadow-[0_0_10px_rgba(245,158,11,0.25)]">
            <Zap className="w-4 h-4 text-amber-300" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/50">
                SEGREDO DA MIX ({matchedGenre.name} - {selectedMode})
              </span>
              <span className="text-[10px] font-mono text-gray-400">Origem: {matchedGenre.origin}</span>
            </div>
            <p className="text-xs md:text-sm text-gray-100 font-semibold leading-relaxed">
              "{activeModeData.mixSecret}"
            </p>
          </div>
        </div>
      </div>

      {/* MODE SELECTOR BUTTONS (CLEAN / MODERN / AGGRESSIVE) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            Perfil Tonal Desejado
          </span>
          <span className="text-[10px] text-gray-500 font-mono">
            Altera automaticamente a cadeia e parâmetros recomendados
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {(['CLEAN', 'MODERN', 'AGGRESSIVE'] as GenreMode[]).map((mode) => {
            const isSelected = selectedMode === mode;
            const config = {
              CLEAN: {
                label: '1. CLEAN / NATURAL',
                desc: 'Vocal aveludado, orgânico e dinâmico',
                activeClass: 'bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.25)]',
                idleClass: 'hover:border-emerald-500/30'
              },
              MODERN: {
                label: '2. MODERN / STUDIO',
                desc: 'Padrão rádio comercial e streaming',
                activeClass: 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.25)]',
                idleClass: 'hover:border-cyan-500/30'
              },
              AGGRESSIVE: {
                label: '3. AGGRESSIVE / CLUB',
                desc: 'Máxima pressão, 808 saturado e loud',
                activeClass: 'bg-orange-500/20 border-orange-400 text-orange-200 shadow-[0_0_15px_rgba(249,115,22,0.25)]',
                idleClass: 'hover:border-orange-500/30'
              }
            }[mode];

            return (
              <button
                key={mode}
                onClick={() => setSelectedMode(mode)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? `${config.activeClass} font-bold`
                    : `bg-[#0E1116] border-[#222731] text-gray-400 ${config.idleClass} hover:bg-[#141820]`
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-extrabold">{config.label}</span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
                </div>
                <p className="text-[10px] opacity-75 mt-1 leading-snug truncate">
                  {config.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* CATEGORY TABS (VOCAL / DRUMS / BASS / MASTER / KEY ADVICE) */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 border-b border-[#222731] pb-2 overflow-x-auto custom-scrollbar">
          {[
            { id: 'vocal' as const, label: 'Cadeia Vocal', icon: Radio, count: activeModeData.vocalChain.length },
            { id: 'drums' as const, label: 'Bateria & Percs', icon: Music, count: activeModeData.drumsChain.length },
            { id: 'bass' as const, label: 'Baixo & 808', icon: Disc3, count: activeModeData.bassChain.length },
            { id: 'master' as const, label: 'Master & LUFS', icon: Flame, count: activeModeData.masterChain.length },
            { id: 'advice' as const, label: 'Dicas de Ouro', icon: ShieldCheck, count: matchedGenre.keyAdvice.length }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeCategoryTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategoryTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 border ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                    : 'bg-[#0E1116] border-[#1F242E] text-gray-400 hover:text-gray-200 hover:bg-[#141820]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-gray-500'}`} />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  isActive ? 'bg-cyan-500/30 text-white font-black' : 'bg-[#181D25] text-gray-500'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* TAB CONTENTS */}
        <div className="bg-[#0B0E12] border border-[#1F242E] rounded-xl p-4 min-h-[140px]">
          {/* TAB 1: VOCAL CHAIN */}
          {activeCategoryTab === 'vocal' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400 pb-1 border-b border-[#1A1F29]">
                <span className="font-bold text-cyan-300">Cadeia Vocal Recomendada no FL Studio ({selectedMode}):</span>
                <span>{activeModeData.vocalChain.length} Plugins em Série</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {activeModeData.vocalChain.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-[#11151D] border border-[#222734] hover:border-cyan-500/40 transition-colors flex flex-col justify-between space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-cyan-400 font-extrabold px-1.5 py-0.2 rounded bg-cyan-500/10">
                        Slot 0{step.position || idx + 1}
                      </span>
                      <span className="text-[9px] font-mono text-gray-400 uppercase font-bold truncate max-w-[120px]">
                        {step.action}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-white truncate">{step.plugin}</p>
                    {step.params && (
                      <p className="text-[10px] font-mono text-gray-400 bg-[#090C10] p-1.5 rounded border border-[#1A1F29]">
                        {step.params}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: DRUMS CHAIN */}
          {activeCategoryTab === 'drums' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400 pb-1 border-b border-[#1A1F29]">
                <span className="font-bold text-orange-300">Bateria & Percussões para {matchedGenre.name}:</span>
                <span>Punch & Transientes</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {activeModeData.drumsChain.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-[#11151D] border border-[#222734] hover:border-orange-500/40 transition-colors flex flex-col justify-between space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-orange-400 uppercase">
                        {item.element}
                      </span>
                      <Music className="w-3 h-3 text-orange-400" />
                    </div>
                    <p className="text-xs font-bold text-white">{item.plugin}</p>
                    <p className="text-[11px] text-gray-300 bg-[#090C10] p-2 rounded border border-[#1A1F29] leading-relaxed">
                      {item.action}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: BASS CHAIN */}
          {activeCategoryTab === 'bass' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400 pb-1 border-b border-[#1A1F29]">
                <span className="font-bold text-purple-300">Baixo, 808 & Subgraves ({matchedGenre.name}):</span>
                <span>Frequências e Mono</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeModeData.bassChain.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-[#11151D] border border-[#222734] hover:border-purple-500/40 transition-colors flex flex-col justify-between space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-purple-400 uppercase">
                        {item.element}
                      </span>
                      <Disc3 className="w-3.5 h-3.5 text-purple-400" />
                    </div>
                    <p className="text-xs font-bold text-white">{item.plugin}</p>
                    <p className="text-[11px] text-gray-300 bg-[#090C10] p-2 rounded border border-[#1A1F29] leading-relaxed">
                      {item.action}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: MASTER CHAIN & LUFS */}
          {activeCategoryTab === 'master' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400 pb-1 border-b border-[#1A1F29]">
                <span className="font-bold text-fuchsia-300">Cadeia de Masterização Sugerida ({selectedMode}):</span>
                <span>Loudness & Limiting</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {activeModeData.masterChain.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-[#11151D] border border-[#222734] hover:border-fuchsia-500/40 transition-colors flex flex-col justify-between space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-fuchsia-400 font-extrabold px-1.5 py-0.2 rounded bg-fuchsia-500/10">
                        Master 0{step.position || idx + 1}
                      </span>
                      <Flame className="w-3 h-3 text-fuchsia-400" />
                    </div>
                    <p className="text-xs font-bold text-white truncate">{step.plugin}</p>
                    <p className="text-[10px] font-mono text-gray-300 bg-[#090C10] p-1.5 rounded border border-[#1A1F29]">
                      {step.action}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: KEY ADVICE (DICAS DE OURO) */}
          {activeCategoryTab === 'advice' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400 pb-1 border-b border-[#1A1F29]">
                <span className="font-bold text-emerald-300">Dicas de Ouro & Avisos Críticos de Produção:</span>
                <span>{matchedGenre.keyAdvice.length} Regras Fundamentais</span>
              </div>

              <div className="space-y-2">
                {matchedGenre.keyAdvice.map((advice, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-[#11151D] border border-[#222734] flex items-start gap-2.5 text-xs text-gray-200"
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/20 font-mono text-[10px] font-bold">
                      {idx + 1}
                    </div>
                    <p className="leading-relaxed">{advice}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER ACTIONS: Direct Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-[#222731]">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Preset inteligente sincronizado com {matchedGenre.name}</span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => onNavigate('genres')}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#141820] hover:bg-[#1A202C] text-gray-200 hover:text-white text-xs font-bold border border-[#242A34] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Ver Arsenal de 15 Estilos</span>
            <ChevronRight className="w-3.5 h-3.5 text-orange-400" />
          </button>

          <button
            onClick={() => onNavigate('mix')}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-black font-extrabold text-xs transition-all shadow-[0_0_15px_rgba(6,182,212,0.35)] flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Aplicar na Mixagem</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
