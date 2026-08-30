import React, { useState } from 'react';
import { vocalProblemsData } from '../data/vocalCleaningData';
import { 
  Mic, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Sliders, 
  Activity, 
  ShieldAlert, 
  Zap, 
  Layers,
  ArrowRight,
  Disc3,
  Flame
} from 'lucide-react';
import { NavigationTab } from '../types';
import { ProVocalChainSection } from './ProVocalChainSection';

interface VocalCleaningViewProps {
  onNavigate: (tab: NavigationTab) => void;
  onOpenAnalyzer: () => void;
  onOpenDelayCalc?: () => void;
}

export const VocalCleaningView: React.FC<VocalCleaningViewProps> = ({ 
  onNavigate, 
  onOpenAnalyzer,
  onOpenDelayCalc
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'DIAGNOSTICS' | 'PRO_CHAIN'>('DIAGNOSTICS');
  const [selectedProblemId, setSelectedProblemId] = useState<string>(vocalProblemsData[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProblems = vocalProblemsData.filter((prob) => {
    const matchesSearch = prob.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prob.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prob.frequencyFocus.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prob.rootCauses.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  const currentProblem = vocalProblemsData.find(p => p.id === selectedProblemId) || vocalProblemsData[0];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Header Banner with Subtab Switcher */}
      <div className="rounded-2xl bg-[#15191E] border border-[#2A2F36] p-6 shadow-xl space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold">
              <Mic className="w-3.5 h-3.5" />
              SISTEMA DE LIMPEZA E CADEIA VOCAL PROFISSIONAL
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              Vocal Cleaning & Pro Chain Studio
            </h1>
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
              Trate com precisão cirúrgica sibilância, ruído de fundo, plosivas e ressonâncias ou aplique a <strong>Pro Vocal Chain</strong> com presets completos de EQ, Compressão e De-Esser calibrados para o FL Studio.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onOpenAnalyzer}
              className="px-4 py-2.5 rounded-lg bg-[#0B0E11] hover:bg-[#1E2329] border border-[#2A2F36] hover:border-cyan-500/50 text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Varredura FFT de Frequências</span>
            </button>
          </div>
        </div>

        {/* Primary View Switcher Tabs (Diagnostics vs Pro Vocal Chain) */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#2A2F36]">
          <button
            onClick={() => setActiveSubTab('DIAGNOSTICS')}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
              activeSubTab === 'DIAGNOSTICS'
                ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'bg-[#0B0E11] text-gray-400 border border-[#2A2F36] hover:text-white hover:border-gray-500'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>11 Diagnósticos de Limpeza Vocal</span>
          </button>

          <button
            onClick={() => setActiveSubTab('PRO_CHAIN')}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer relative ${
              activeSubTab === 'PRO_CHAIN'
                ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'bg-[#0B0E11] text-gray-400 border border-[#2A2F36] hover:text-white hover:border-cyan-500/50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Pro Vocal Chain Presets (EQ + Comp + De-Esser)</span>
            <span className="hidden sm:inline-block px-1.5 py-0.2 text-[9px] font-mono font-black uppercase rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
              PRO
            </span>
          </button>
        </div>
      </div>

      {/* RENDER VIEW: PRO VOCAL CHAIN PRESETS */}
      {activeSubTab === 'PRO_CHAIN' && (
        <ProVocalChainSection 
          onOpenAnalyzer={onOpenAnalyzer} 
          onOpenDelayCalc={onOpenDelayCalc} 
        />
      )}

      {/* RENDER VIEW: 11 VOCAL DIAGNOSTICS */}
      {activeSubTab === 'DIAGNOSTICS' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
          {/* Left: Problem Selector */}
          <div className="space-y-3">
            {/* Search bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar problema (ex: ruído, sibilância, 300Hz)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#15191E] border border-[#2A2F36] rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/60"
              />
            </div>

            {/* Quick Switch to Pro Chain Banner */}
            <div 
              onClick={() => setActiveSubTab('PRO_CHAIN')}
              className="p-3 rounded-xl bg-gradient-to-r from-cyan-500/10 via-[#15191E] to-[#15191E] border border-cyan-500/30 hover:border-cyan-400 transition-all cursor-pointer group flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    Pro Vocal Chain Presets
                  </h4>
                  <p className="text-[10px] text-gray-400">Ver cadeia completa no FL Studio</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
            </div>

            {/* List of 11 Problems */}
            <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
              {filteredProblems.map((prob) => {
                const isSelected = prob.id === selectedProblemId;
                return (
                  <div
                    key={prob.id}
                    onClick={() => setSelectedProblemId(prob.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-cyan-500/10 border-cyan-500 text-white shadow-[0_0_12px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/40'
                        : 'bg-[#15191E] border-[#2A2F36] text-gray-300 hover:border-cyan-500/40 hover:bg-[#1A1F26]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold">{prob.title}</span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 font-semibold block mt-0.5">{prob.frequencyFocus}</span>
                    <p className="text-[11px] text-gray-400 mt-1 line-clamp-1">
                      {prob.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Detailed Diagnostic & Treatment Plan */}
          <div className="lg:col-span-2 rounded-2xl bg-[#15191E] border border-[#2A2F36] p-6 md:p-7 space-y-6 shadow-xl">
            {/* Diagnostic Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2A2F36] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#0B0E11] text-cyan-400 border border-[#2A2F36]">
                  Frequência Crítica: {currentProblem.frequencyFocus}
                </span>
                <h2 className="text-xl md:text-2xl font-extrabold text-white mt-2">
                  {currentProblem.title}
                </h2>
              </div>

              <button
                onClick={() => setActiveSubTab('PRO_CHAIN')}
                className="px-3 py-1.5 rounded-lg bg-[#0B0E11] hover:bg-[#1E2329] border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Ver Pro Chain Completa</span>
              </button>
            </div>

            {/* Description & Root Causes */}
            <div className="p-4 rounded-xl bg-[#0B0E11] border border-[#2A2F36] space-y-3 text-xs">
              <p className="text-gray-200 leading-relaxed font-medium">
                {currentProblem.description}
              </p>
              <div className="space-y-1.5 pt-2.5 border-t border-[#2A2F36]">
                <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  Causas Físicas Comuns
                </span>
                {currentProblem.rootCauses.map((cause, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-gray-300 text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                    <span>{cause}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FL Studio Native Chain */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>Cadeia de Tratamento no FL Studio (Nativo)</span>
              </h3>
              <div className="space-y-2.5">
                {currentProblem.flNativeChain.map((step) => (
                  <div
                    key={step.position}
                    className="p-3.5 rounded-xl bg-[#0B0E11] border border-[#2A2F36] text-xs space-y-1.5 relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-bold">
                          {step.position}
                        </span>
                        <span className="font-bold text-white">{step.pluginName}</span>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">{step.action}</span>
                    </div>
                    <div className="p-2 bg-[#15191E] rounded-lg border border-[#2A2F36] font-mono text-[11px] text-gray-300">
                      {step.suggestedParams}
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed italic">
                      💡 {step.tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* External Suite Alternatives */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Alternativas Profissionais Externas (FabFilter / iZotope / Waves)
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentProblem.externalChainAlternative.map((alt, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-[#0B0E11] border border-[#2A2F36] text-cyan-300 text-xs font-mono font-semibold"
                  >
                    {alt}
                  </span>
                ))}
              </div>
            </div>

            {/* Dos and Don'ts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-1.5">
                <span className="font-bold text-emerald-400 flex items-center gap-1.5 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  O QUE FAZER (Boas Práticas)
                </span>
                {currentProblem.dos.map((item, idx) => (
                  <p key={idx} className="text-[11px] text-gray-300 leading-relaxed">• {item}</p>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-red-500/5 border border-red-500/20 space-y-1.5">
                <span className="font-bold text-red-400 flex items-center gap-1.5 text-[11px]">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  O QUE NÃO FAZER (Erros Fatais)
                </span>
                {currentProblem.donts.map((item, idx) => (
                  <p key={idx} className="text-[11px] text-gray-300 leading-relaxed">• {item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
