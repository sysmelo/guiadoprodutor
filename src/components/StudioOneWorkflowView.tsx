import React, { useState } from 'react';
import { 
  Sliders, 
  Sparkles, 
  Zap, 
  Copy, 
  Check, 
  ArrowRight, 
  Layers, 
  Volume2, 
  ShieldCheck, 
  Radio, 
  Flame, 
  HelpCircle,
  Share2,
  Activity,
  Disc3,
  Waves,
  CheckCircle2,
  AlertTriangle,
  FolderKanban,
  Music,
  ArrowDownRight,
  GitFork,
  Maximize2,
  Cpu
} from 'lucide-react';
import { 
  studioOneCleanWorkflow, 
  studioOneAuxChannels, 
  studioOneVsBusComparison,
  studioOneNativePluginsGuide,
  StudioOneStep,
  StudioOneAuxChannel
} from '../data/studioOneData';
import { NavigationTab } from '../types';

interface StudioOneWorkflowViewProps {
  onNavigate: (tab: NavigationTab) => void;
  onOpenAnalyzer: () => void;
  onOpenDelayCalc: () => void;
}

export const StudioOneWorkflowView: React.FC<StudioOneWorkflowViewProps> = ({
  onNavigate,
  onOpenAnalyzer,
  onOpenDelayCalc
}) => {
  const [activeTab, setActiveTab] = useState<'WORKFLOW' | 'AUX_CHANNELS' | 'BUS_VS_FX' | 'PLUGINS_GUIDE'>('WORKFLOW');
  const [selectedStepNumber, setSelectedStepNumber] = useState<number>(1);
  const [selectedAuxId, setSelectedAuxId] = useState<string>(studioOneAuxChannels[0].id);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [copiedAuxId, setCopiedAuxId] = useState<string | null>(null);
  const [copiedAllWorkflow, setCopiedAllWorkflow] = useState<boolean>(false);

  const currentStep: StudioOneStep = studioOneCleanWorkflow.find(s => s.stepNumber === selectedStepNumber) || studioOneCleanWorkflow[0];
  const currentAux: StudioOneAuxChannel = studioOneAuxChannels.find(a => a.id === selectedAuxId) || studioOneAuxChannels[0];

  const toggleStepCompleted = (stepNum: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepNum) ? prev.filter(n => n !== stepNum) : [...prev, stepNum]
    );
  };

  const handleCopyAuxPreset = (aux: StudioOneAuxChannel) => {
    const text = `=== STUDIO ONE 7 - CANAL AUXILIAR NATIVO ===\n` +
      `Canal: ${aux.name}\n` +
      `Tipo: ${aux.auxType} | Categoria: ${aux.category}\n` +
      `Plugin Nativo: ${aux.nativePlugin}\n\n` +
      `COMO CRIAR NO STUDIO ONE 7:\n` +
      aux.howToCreateInStudioOne.join('\n') +
      `\n\nPARÂMETROS RECOMENDADOS:\n` +
      aux.recommendedSettings.map(s => `• ${s.parameter}: ${s.value} (${s.note})`).join('\n') +
      `\n\nROTEAMENTO:\n` +
      `• Origem: ${aux.routingWorkflow.fromTrack}\n` +
      `• Nível de Send: ${aux.routingWorkflow.sendLevel}\n` +
      `• Pan: ${aux.routingWorkflow.panning}\n` +
      `• Modo: ${aux.routingWorkflow.prePostFader}\n\n` +
      `DICAS PRO STUDIO ONE 7:\n` +
      aux.studioOneTips.map(t => `• ${t}`).join('\n');

    navigator.clipboard.writeText(text);
    setCopiedAuxId(aux.id);
    setTimeout(() => setCopiedAuxId(null), 2500);
  };

  const handleCopyFullWorkflow = () => {
    const text = `=== FLUXO DE TRABALHO LIMPO E PROFISSIONAL (STUDIO ONE 7) ===\n\n` +
      studioOneCleanWorkflow.map(step => (
        `ETAPA ${step.stepNumber}: ${step.title.toUpperCase()}\n` +
        `Subtítulo: ${step.subtitle}\n` +
        `Resumo: ${step.summary}\n` +
        `Ações Práticas:\n` +
        step.actions.map(a => `  • ${a.title}: ${a.instruction} ${a.studioOneShortcut ? `[Atalho: ${a.studioOneShortcut}]` : ''} ${a.nativePlugin ? `[Plugin: ${a.nativePlugin}]` : ''}`).join('\n') +
        `\n  💡 Dica de Ouro: ${step.proTip}\n` +
        `  ⚠️ O Que Evitar: ${step.whatToAvoid}\n`
      )).join('\n---\n\n') +
      `\n\n=== 5 CANAIS AUXILIARES ESSENCIAIS (SENDS NATIVOS) ===\n\n` +
      studioOneAuxChannels.map(aux => (
        `[${aux.name}] (${aux.nativePlugin})\n` +
        `• Nível de Send: ${aux.routingWorkflow.sendLevel}\n` +
        `• Configurações: ${aux.recommendedSettings.map(s => `${s.parameter}=${s.value}`).join(', ')}\n`
      )).join('\n');

    navigator.clipboard.writeText(text);
    setCopiedAllWorkflow(true);
    setTimeout(() => setCopiedAllWorkflow(false), 2500);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200">
      
      {/* Top Banner: Studio One 7 Clean Master Station */}
      <div className="rounded-2xl bg-[#15191E] border border-[#2A2F36] p-5 md:p-7 shadow-xl space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>STUDIO ONE 7 • FLUXO LIMPO & CANAIS AUXILIARES</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Workflow Profissional Sem Confusão
            </h1>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
              Estrutura limpa em 5 etapas sequenciais com <strong>Canais Auxiliares (Sends FX)</strong> e <strong>Bus Channels</strong> totalmente configurados com os plugins nativos do <strong>PreSonus Studio One 7</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleCopyFullWorkflow}
              className="px-4 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(6,182,212,0.35)] cursor-pointer"
            >
              {copiedAllWorkflow ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedAllWorkflow ? 'Guia Copiado com Sucesso!' : 'Copiar Fluxo Completo'}</span>
            </button>
            <button
              onClick={onOpenDelayCalc}
              className="px-3.5 py-2.5 rounded-lg bg-[#0B0E11] hover:bg-[#1E2329] border border-[#2A2F36] text-gray-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Calculadora de Reverb/Delay (ms)</span>
            </button>
          </div>
        </div>

        {/* Primary View Switcher Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-[#2A2F36]">
          <button
            onClick={() => setActiveTab('WORKFLOW')}
            className={`py-3 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'WORKFLOW'
                ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                : 'bg-[#0B0E11] text-gray-400 border border-[#2A2F36] hover:text-white hover:border-gray-600'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>1. Fluxo em 5 Etapas</span>
          </button>

          <button
            onClick={() => setActiveTab('AUX_CHANNELS')}
            className={`py-3 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer relative ${
              activeTab === 'AUX_CHANNELS'
                ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                : 'bg-[#0B0E11] text-gray-400 border border-[#2A2F36] hover:text-white hover:border-cyan-500/50'
            }`}
          >
            <Waves className="w-4 h-4 text-orange-400" />
            <span>2. 5 Canais Auxiliares (Sends)</span>
            <span className="hidden lg:inline-block px-1.5 py-0.2 text-[8px] font-mono font-black uppercase rounded bg-orange-500/20 text-orange-300 border border-orange-500/30">
              FX
            </span>
          </button>

          <button
            onClick={() => setActiveTab('BUS_VS_FX')}
            className={`py-3 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'BUS_VS_FX'
                ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                : 'bg-[#0B0E11] text-gray-400 border border-[#2A2F36] hover:text-white hover:border-gray-600'
            }`}
          >
            <GitFork className="w-4 h-4 text-emerald-400" />
            <span>3. FX Channel vs Bus Channel</span>
          </button>

          <button
            onClick={() => setActiveTab('PLUGINS_GUIDE')}
            className={`py-3 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'PLUGINS_GUIDE'
                ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                : 'bg-[#0B0E11] text-gray-400 border border-[#2A2F36] hover:text-white hover:border-gray-600'
            }`}
          >
            <Cpu className="w-4 h-4 text-purple-400" />
            <span>4. Arsenal Nativo Studio One 7</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: CLEAN 5-STAGE SEQUENTIAL WORKFLOW */}
      {activeTab === 'WORKFLOW' && (
        <div className="space-y-6">
          {/* 5 Stages Progress Step Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {studioOneCleanWorkflow.map((step) => {
              const isSelected = step.stepNumber === selectedStepNumber;
              const isDone = completedSteps.includes(step.stepNumber);
              return (
                <button
                  key={step.stepNumber}
                  onClick={() => setSelectedStepNumber(step.stepNumber)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 relative ${
                    isSelected
                      ? 'bg-cyan-500/15 border-cyan-500 ring-1 ring-cyan-500/40 shadow-lg'
                      : 'bg-[#15191E] border-[#2A2F36] hover:border-gray-600 hover:bg-[#1A1F26]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-black ${
                        isDone
                          ? 'bg-emerald-500 text-black'
                          : isSelected
                            ? 'bg-cyan-500 text-black'
                            : 'bg-[#0B0E11] text-gray-400 border border-[#2A2F36]'
                      }`}>
                        {isDone ? '✓' : step.stepNumber}
                      </span>
                      <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${step.badgeColor}`}>
                        {step.tag}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-gray-200'}`}>
                      {step.title}
                    </h4>
                    <p className="text-[10px] text-gray-400 line-clamp-2 mt-1 leading-snug">
                      {step.subtitle}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#242A34] flex items-center justify-between text-[10px] font-mono">
                    <span className={isSelected ? 'text-cyan-400 font-bold' : 'text-gray-500'}>
                      Etapa {step.stepNumber}/5
                    </span>
                    <span className="text-gray-400">{step.actions.length} Ações</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Stage Execution Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Actions Checklist */}
            <div className="lg:col-span-7 rounded-2xl bg-[#15191E] border border-[#2A2F36] p-6 space-y-5 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2A2F36] pb-4">
                <div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${currentStep.badgeColor}`}>
                    ETAPA {currentStep.stepNumber} • {currentStep.tag}
                  </span>
                  <h2 className="text-xl font-extrabold text-white mt-1.5">
                    {currentStep.title}
                  </h2>
                  <p className="text-xs text-gray-300 mt-0.5">
                    {currentStep.subtitle}
                  </p>
                </div>

                <button
                  onClick={() => toggleStepCompleted(currentStep.stepNumber)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    completedSteps.includes(currentStep.stepNumber)
                      ? 'bg-emerald-500 text-black shadow-md'
                      : 'bg-[#0B0E11] text-gray-300 border border-[#2A2F36] hover:border-emerald-500/50 hover:text-white'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{completedSteps.includes(currentStep.stepNumber) ? 'Etapa Concluída' : 'Marcar como Feito'}</span>
                </button>
              </div>

              {/* Summary Description */}
              <div className="p-4 rounded-xl bg-[#0B0E11] border border-[#2A2F36] text-xs text-gray-200 leading-relaxed">
                {currentStep.summary}
              </div>

              {/* Action Steps */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Procedimentos Práticos no Studio One 7</span>
                </h3>

                <div className="space-y-3">
                  {currentStep.actions.map((act, aIdx) => (
                    <div
                      key={aIdx}
                      className="p-4 rounded-xl bg-[#0B0E11] border border-[#2A2F36] space-y-2 hover:border-cyan-500/40 transition-colors"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="text-xs font-bold text-cyan-300 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono text-[10px]">
                            {aIdx + 1}
                          </span>
                          <span>{act.title}</span>
                        </h4>

                        <div className="flex items-center gap-1.5">
                          {act.studioOneShortcut && (
                            <span className="text-[10px] font-mono bg-[#15191E] text-amber-300 px-2 py-0.5 rounded border border-amber-500/20">
                              ⌨️ {act.studioOneShortcut}
                            </span>
                          )}
                          {act.nativePlugin && (
                            <span className="text-[10px] font-mono bg-[#15191E] text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/20">
                              🔌 {act.nativePlugin}
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-gray-300 leading-relaxed pl-7">
                        {act.instruction}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-[#2A2F36]">
                <button
                  disabled={currentStep.stepNumber === 1}
                  onClick={() => setSelectedStepNumber(Math.max(1, currentStep.stepNumber - 1))}
                  className="px-3 py-1.5 rounded-lg bg-[#0B0E11] hover:bg-[#1E2329] disabled:opacity-40 disabled:pointer-events-none text-gray-300 text-xs font-semibold border border-[#2A2F36] transition-colors cursor-pointer"
                >
                  ← Etapa Anterior
                </button>

                <div className="flex items-center gap-1.5">
                  {studioOneCleanWorkflow.map((s) => (
                    <button
                      key={s.stepNumber}
                      onClick={() => setSelectedStepNumber(s.stepNumber)}
                      className={`w-6 h-6 rounded-full text-[10px] font-mono font-bold transition-all cursor-pointer ${
                        s.stepNumber === selectedStepNumber
                          ? 'bg-cyan-500 text-black shadow-md'
                          : 'bg-[#0B0E11] text-gray-500 border border-[#2A2F36] hover:text-white'
                      }`}
                    >
                      {s.stepNumber}
                    </button>
                  ))}
                </div>

                <button
                  disabled={currentStep.stepNumber === studioOneCleanWorkflow.length}
                  onClick={() => setSelectedStepNumber(Math.min(studioOneCleanWorkflow.length, currentStep.stepNumber + 1))}
                  className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Próxima Etapa</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right: Pro Tips & Golden Rules */}
            <div className="lg:col-span-5 space-y-4">
              {/* Pro Secret Tip Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-[#15191E] to-[#15191E] border border-amber-500/30 shadow-xl space-y-2.5">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                    Dica de Ouro no Studio One 7
                  </h3>
                </div>
                <p className="text-xs text-gray-200 leading-relaxed font-medium">
                  {currentStep.proTip}
                </p>
              </div>

              {/* What to Avoid */}
              <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/20 shadow-xl space-y-2.5">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <h3 className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
                    O Que Evitar (Erros Frequentes)
                  </h3>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {currentStep.whatToAvoid}
                </p>
              </div>

              {/* Fast Jump to Aux Channels Card */}
              <div 
                onClick={() => setActiveTab('AUX_CHANNELS')}
                className="p-5 rounded-2xl bg-[#15191E] border border-[#2A2F36] hover:border-cyan-500/50 transition-all cursor-pointer group shadow-xl space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Waves className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                      Configurar os 5 Canais Auxiliares (Sends)
                    </h3>
                  </div>
                  <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Aprenda a montar Reverb Vocal, Delay Rítmico, Widener e Compressão Paralela NY com os plugins nativos do Studio One 7.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: 5 ESSENTIAL AUX CHANNELS WITH STUDIO ONE 7 NATIVE PLUGINS */}
      {activeTab === 'AUX_CHANNELS' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-200">
          
          {/* Left Column: Aux Channels Selector */}
          <div className="lg:col-span-5 space-y-3">
            <div className="p-4 rounded-xl bg-[#15191E] border border-[#2A2F36] space-y-2">
              <div className="flex items-center gap-2">
                <Waves className="w-4 h-4 text-orange-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Os 5 Canais Auxiliares (Sends)
                </h3>
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Roteamentos paralelos fundamentais. NUNCA insira esses efeitos como insert 100% nas faixas principais.
              </p>
            </div>

            <div className="space-y-2">
              {studioOneAuxChannels.map((aux) => {
                const isSelected = aux.id === selectedAuxId;
                return (
                  <button
                    key={aux.id}
                    onClick={() => setSelectedAuxId(aux.id)}
                    className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer space-y-2 ${
                      isSelected
                        ? 'bg-gradient-to-r from-orange-500/20 to-[#15191E] border-orange-500 ring-1 ring-orange-500/40 shadow-lg'
                        : 'bg-[#15191E] border-[#2A2F36] hover:border-gray-600 hover:bg-[#1A1F26]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-orange-500/10 text-orange-300 border border-orange-500/20">
                        {aux.category}
                      </span>
                      {isSelected && <Zap className="w-3.5 h-3.5 text-orange-400 animate-pulse" />}
                    </div>

                    <h4 className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                      {aux.name}
                    </h4>

                    <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 pt-1 border-t border-[#2A2F36]">
                      <span className="text-cyan-400">🔌 {aux.nativePlugin.split('(')[0]}</span>
                      <span>Send: {aux.routingWorkflow.sendLevel.split('(')[0]}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detailed Aux Channel Inspector & Setup Guide */}
          <div className="lg:col-span-7 rounded-2xl bg-[#15191E] border border-[#2A2F36] p-6 space-y-6 shadow-xl">
            {/* Aux Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2F36] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/40">
                    {currentAux.auxType}
                  </span>
                  <span className="text-[10px] font-mono text-gray-400">
                    Categoria: {currentAux.category}
                  </span>
                </div>
                <h2 className="text-xl font-extrabold text-white mt-1.5">
                  {currentAux.name}
                </h2>
                <p className="text-xs text-cyan-400 font-mono font-bold mt-0.5">
                  Plugin Nativo Recomendado: {currentAux.nativePlugin}
                </p>
              </div>

              <button
                onClick={() => handleCopyAuxPreset(currentAux)}
                className="px-3.5 py-2 rounded-lg bg-[#0B0E11] hover:bg-[#1E2329] text-gray-300 hover:text-white border border-[#2A2F36] hover:border-orange-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                {copiedAuxId === currentAux.id ? <Check className="w-3.5 h-3.5 text-orange-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedAuxId === currentAux.id ? 'Copiado!' : 'Copiar Preset'}</span>
              </button>
            </div>

            {/* Description */}
            <div className="p-3.5 rounded-xl bg-[#0B0E11] border border-[#2A2F36] text-xs text-gray-200 leading-relaxed">
              {currentAux.description}
            </div>

            {/* How to create in Studio One 7 Step by Step */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FolderKanban className="w-3.5 h-3.5 text-cyan-400" />
                <span>Como Criar e Rotear no Studio One 7 Passo a Passo</span>
              </h3>
              <div className="space-y-1.5 p-4 rounded-xl bg-[#0B0E11] border border-[#2A2F36]">
                {currentAux.howToCreateInStudioOne.map((instruction, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                    <span>{instruction}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Plugin Settings */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-orange-400" />
                <span>Parâmetros Exatos do Plugin Nativo</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentAux.recommendedSettings.map((param, pIdx) => (
                  <div
                    key={pIdx}
                    className="p-3 rounded-xl bg-[#0B0E11] border border-[#2A2F36] space-y-1 hover:border-orange-500/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-300">
                        {param.parameter}
                      </span>
                      <span className="text-xs font-mono font-black text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                        {param.value}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400 leading-tight">
                      ℹ️ {param.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Routing Workflow Box */}
            <div className="p-4 rounded-xl bg-[#0B0E11] border border-[#2A2F36] space-y-2">
              <h4 className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <GitFork className="w-3.5 h-3.5" />
                Roteamento de Sinal (Send Routing)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="p-2 rounded bg-[#15191E] border border-[#2A2F36]">
                  <span className="text-gray-400 text-[10px] block">Pistas de Origem:</span>
                  <span className="font-bold text-white">{currentAux.routingWorkflow.fromTrack}</span>
                </div>
                <div className="p-2 rounded bg-[#15191E] border border-[#2A2F36]">
                  <span className="text-gray-400 text-[10px] block">Nível do Send:</span>
                  <span className="font-bold text-orange-400">{currentAux.routingWorkflow.sendLevel}</span>
                </div>
                <div className="p-2 rounded bg-[#15191E] border border-[#2A2F36]">
                  <span className="text-gray-400 text-[10px] block">Posição do Send:</span>
                  <span className="font-bold text-cyan-300">{currentAux.routingWorkflow.prePostFader}</span>
                </div>
              </div>
            </div>

            {/* Studio One Pro Tips */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-orange-500/10 via-[#15191E] to-transparent border border-orange-500/30 space-y-2">
              <span className="text-[11px] font-mono font-bold text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                Dica Profissional no Studio One 7
              </span>
              <div className="space-y-1.5">
                {currentAux.studioOneTips.map((tip, tIdx) => (
                  <p key={tIdx} className="text-xs text-gray-200 leading-relaxed">
                    • {tip}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: FX CHANNEL (SENDS) VS BUS CHANNEL (SUBGROUPS) COMPARISON */}
      {activeTab === 'BUS_VS_FX' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-5 rounded-2xl bg-[#15191E] border border-[#2A2F36] text-center max-w-3xl mx-auto space-y-2">
            <h2 className="text-xl font-extrabold text-white">
              Entendendo a Diferença Crucial: FX Channel vs Bus Channel
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Evite o erro número 1 que arruina mixagens no Studio One: misturar canais de efeitos paralelos com canais de agrupamento de faixas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: FX Channel (Sends) */}
            <div className="rounded-2xl bg-[#15191E] border border-orange-500/30 p-6 space-y-4 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-2">
                <Waves className="w-5 h-5 text-orange-400" />
                <h3 className="text-base font-extrabold text-white">
                  {studioOneVsBusComparison.fxChannelTitle}
                </h3>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed">
                {studioOneVsBusComparison.fxChannelDesc}
              </p>

              {/* Visual Signal Flow Diagram */}
              <div className="p-4 rounded-xl bg-[#0B0E11] border border-[#2A2F36] font-mono text-xs text-gray-300 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-cyan-400 pb-1 border-b border-[#2A2F36]">
                  <span>DIAGRAMA DE SINAL PARALELO</span>
                  <span>100% WET</span>
                </div>
                <div className="space-y-1 text-[11px]">
                  <p className="text-white font-bold">🎤 Faixa de Áudio (Vocal)</p>
                  <p className="pl-4 text-gray-400">├── Saída Direta (Main Out) ──► <strong>Mix Master</strong> (Sinal Seco Limpo)</p>
                  <p className="pl-4 text-orange-400">└── Botão Send (-12dB) ──────► <strong>FX Channel (Reverb 100% Wet)</strong> ──► <strong>Mix Master</strong></p>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                  Regras Inegociáveis do Canal FX:
                </h4>
                <div className="space-y-1.5">
                  {studioOneVsBusComparison.fxChannelRules.map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0 mt-1.5" />
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 2: Bus Channel (Subgroups) */}
            <div className="rounded-2xl bg-[#15191E] border border-cyan-500/30 p-6 space-y-4 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-2">
                <FolderKanban className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-extrabold text-white">
                  {studioOneVsBusComparison.busChannelTitle}
                </h3>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed">
                {studioOneVsBusComparison.busChannelDesc}
              </p>

              {/* Visual Signal Flow Diagram */}
              <div className="p-4 rounded-xl bg-[#0B0E11] border border-[#2A2F36] font-mono text-xs text-gray-300 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-cyan-400 pb-1 border-b border-[#2A2F36]">
                  <span>DIAGRAMA DE SUBGRUPO / BUS</span>
                  <span>SINAL TOTAL</span>
                </div>
                <div className="space-y-1 text-[11px]">
                  <p className="text-white font-bold">🥁 Pistas de Bateria (Kick, Snare, HiHat)</p>
                  <p className="pl-4 text-cyan-400">├── Kick Out ───┐</p>
                  <p className="pl-4 text-cyan-400">├── Snare Out ──┼──► <strong>DRUM BUS</strong> (Glue Comp + EQ) ──► <strong>Mix Master</strong></p>
                  <p className="pl-4 text-cyan-400">└── HiHat Out ──┘</p>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  Regras Inegociáveis do Canal Bus:
                </h4>
                <div className="space-y-1.5">
                  {studioOneVsBusComparison.busChannelRules.map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: STUDIO ONE 7 NATIVE PLUGINS ARSENAL GUIDE */}
      {activeTab === 'PLUGINS_GUIDE' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-5 rounded-2xl bg-[#15191E] border border-[#2A2F36] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
            <div>
              <h2 className="text-xl font-extrabold text-white">
                Arsenal de Plugins Nativos do Studio One 7
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Você não precisa de plugins caros de terceiros. A suíte nativa do Studio One 7 entrega qualidade profissional de estúdio.
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shrink-0">
              6 Ferramentas Essenciais
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {studioOneNativePluginsGuide.map((plugin, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#15191E] border border-[#2A2F36] hover:border-cyan-500/40 transition-all space-y-3 shadow-lg flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-extrabold text-white">
                      {plugin.name}
                    </h3>
                    <span className="text-[9px] font-mono uppercase bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/20">
                      Nativo
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-cyan-300 font-semibold block">
                    {plugin.category}
                  </span>

                  <p className="text-xs text-gray-300 leading-relaxed">
                    {plugin.description}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#0B0E11] border border-[#2A2F36] text-[11px] text-gray-400 space-y-1">
                  <span className="font-bold text-gray-300 block">Melhor Utilização:</span>
                  <p className="leading-snug">{plugin.bestFor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
