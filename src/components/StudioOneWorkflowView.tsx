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
  Cpu,
  Scissors,
  VolumeX,
  Gauge,
  SlidersHorizontal,
  Bookmark
} from 'lucide-react';
import { 
  studioOneCleanWorkflow, 
  studioOneAuxChannels, 
  studioOneVsBusComparison,
  studioOneNativePluginsGuide,
  studioOneChannelSplitterPresets,
  studioOneAutoDuckerGuide,
  studioOneAbbeyRoadFilterMatrix,
  studioOneGainLoudnessMatrix,
  StudioOneStep,
  StudioOneAuxChannel,
  ChannelSplitterPreset
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
  const [activeTab, setActiveTab] = useState<
    'WORKFLOW' | 'AUX_CHANNELS' | 'CHANNEL_SPLITTER' | 'AUTO_DUCKER' | 'ABBEY_ROAD_EQ' | 'GAIN_LOUDNESS' | 'BUS_VS_FX' | 'PLUGINS_GUIDE'
  >('WORKFLOW');

  const [selectedStepNumber, setSelectedStepNumber] = useState<number>(1);
  const [selectedAuxId, setSelectedAuxId] = useState<string>(studioOneAuxChannels[0].id);
  const [selectedSplitterId, setSelectedSplitterId] = useState<string>(studioOneChannelSplitterPresets[0].id);
  const [selectedAbbeyStyle, setSelectedAbbeyStyle] = useState<number>(0);
  
  // Interactive Ducker Simulator State
  const [isVocalSinging, setIsVocalSinging] = useState<boolean>(true);
  const [duckerReleaseTime, setDuckerReleaseTime] = useState<number>(250);
  const [duckerThreshold, setDuckerThreshold] = useState<number>(-24);

  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [copiedAuxId, setCopiedAuxId] = useState<string | null>(null);
  const [copiedAllWorkflow, setCopiedAllWorkflow] = useState<boolean>(false);
  const [copiedSplitterId, setCopiedSplitterId] = useState<string | null>(null);

  const currentStep: StudioOneStep = studioOneCleanWorkflow.find(s => s.stepNumber === selectedStepNumber) || studioOneCleanWorkflow[0];
  const currentAux: StudioOneAuxChannel = studioOneAuxChannels.find(a => a.id === selectedAuxId) || studioOneAuxChannels[0];
  const currentSplitter: ChannelSplitterPreset = studioOneChannelSplitterPresets.find(s => s.id === selectedSplitterId) || studioOneChannelSplitterPresets[0];

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

  const handleCopySplitterPreset = (preset: ChannelSplitterPreset) => {
    const text = `=== STUDIO ONE 7 - CHANNEL SPLITTER PRESET ===\n` +
      `Preset: ${preset.title}\n` +
      `Modo: ${preset.mode} | Faixa Alvo: ${preset.targetTrack}\n\n` +
      `COMO CONFIGURAR:\n` +
      preset.setupSteps.join('\n') +
      `\n\nDIVISÃO DOS RAMOS:\n` +
      preset.splits.map(sp => `• [${sp.name}] (${sp.range})\n  Plugins: ${sp.plugins.join(', ')}\n  Ajuste: ${sp.settings}\n  Por que funciona: ${sp.whyItWorks}`).join('\n\n') +
      `\n\nDICA DE OURO:\n${preset.proTip}`;

    navigator.clipboard.writeText(text);
    setCopiedSplitterId(preset.id);
    setTimeout(() => setCopiedSplitterId(null), 2500);
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
      )).join('\n') +
      `\n\n=== TÉCNICA ABBEY ROAD EQ (REVERB SEDOSO) ===\n` +
      `• High-Pass: 350 Hz (24dB/oct)\n` +
      `• Low-Pass: 6.000 Hz (12 a 24dB/oct)\n` +
      `• Posição: Antes do Reverb OpenAIR\n\n` +
      `=== GAIN STAGING & LUFS ALVO ===\n` +
      `• Entrada / Gravação: -18 dBFS RMS / -12 dBFS Peak\n` +
      `• Master Headroom: -6 a -3 dBFS True Peak\n` +
      `• Spotify & Streaming: -14 LUFS / -1.0 True Peak\n` +
      `• Trap/Club: -8 a -6.5 LUFS`;

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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
              <span>STUDIO ONE 7 SUITE • FLUXO LIMPO & PLUGINS NATIVOS</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Workflow Profissional Sem Confusão
            </h1>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
              Estrutura em 5 etapas, <strong>Canais Auxiliares (Sends FX)</strong>, <strong>Channel Splitter Multibanda & Mid/Side</strong>, <strong>Auto-Ducker</strong>, <strong>Abbey Road EQ</strong> e <strong>Gain Staging</strong> com os plugins nativos do <strong>PreSonus Studio One 7</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleCopyFullWorkflow}
              className="px-4 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-black font-extrabold text-xs flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(249,115,22,0.35)] cursor-pointer"
            >
              {copiedAllWorkflow ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedAllWorkflow ? 'Guia Copiado com Sucesso!' : 'Copiar Tudo'}</span>
            </button>
            <button
              onClick={onOpenDelayCalc}
              className="px-3.5 py-2.5 rounded-lg bg-[#0B0E11] hover:bg-[#1E2329] border border-[#2A2F36] text-gray-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Calculadora ms (Delay/Reverb)</span>
            </button>
          </div>
        </div>

        {/* Primary View Switcher Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-3 border-t border-[#2A2F36]">
          <button
            onClick={() => setActiveTab('WORKFLOW')}
            className={`py-2.5 px-2 rounded-xl text-xs font-extrabold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
              activeTab === 'WORKFLOW'
                ? 'bg-orange-500 text-black shadow-[0_0_12px_rgba(249,115,22,0.3)]'
                : 'bg-[#0B0E11] text-gray-400 border border-[#2A2F36] hover:text-white hover:border-gray-600'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span className="text-[11px] text-center">1. Fluxo 5 Etapas</span>
          </button>

          <button
            onClick={() => setActiveTab('AUX_CHANNELS')}
            className={`py-2.5 px-2 rounded-xl text-xs font-extrabold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer relative ${
              activeTab === 'AUX_CHANNELS'
                ? 'bg-orange-500 text-black shadow-[0_0_12px_rgba(249,115,22,0.3)]'
                : 'bg-[#0B0E11] text-gray-400 border border-[#2A2F36] hover:text-white hover:border-orange-500/50'
            }`}
          >
            <Waves className="w-4 h-4 text-cyan-400" />
            <span className="text-[11px] text-center">2. 5 Auxiliares (Sends)</span>
          </button>

          <button
            onClick={() => setActiveTab('CHANNEL_SPLITTER')}
            className={`py-2.5 px-2 rounded-xl text-xs font-extrabold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
              activeTab === 'CHANNEL_SPLITTER'
                ? 'bg-orange-500 text-black shadow-[0_0_12px_rgba(249,115,22,0.3)]'
                : 'bg-[#0B0E11] text-gray-400 border border-[#2A2F36] hover:text-white hover:border-emerald-500/50'
            }`}
          >
            <Scissors className="w-4 h-4 text-emerald-400" />
            <span className="text-[11px] text-center">3. Channel Splitter</span>
          </button>

          <button
            onClick={() => setActiveTab('AUTO_DUCKER')}
            className={`py-2.5 px-2 rounded-xl text-xs font-extrabold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
              activeTab === 'AUTO_DUCKER'
                ? 'bg-orange-500 text-black shadow-[0_0_12px_rgba(249,115,22,0.3)]'
                : 'bg-[#0B0E11] text-gray-400 border border-[#2A2F36] hover:text-white hover:border-yellow-500/50'
            }`}
          >
            <VolumeX className="w-4 h-4 text-yellow-400" />
            <span className="text-[11px] text-center">4. Auto Ducker FX</span>
          </button>

          <button
            onClick={() => setActiveTab('ABBEY_ROAD_EQ')}
            className={`py-2.5 px-2 rounded-xl text-xs font-extrabold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
              activeTab === 'ABBEY_ROAD_EQ'
                ? 'bg-orange-500 text-black shadow-[0_0_12px_rgba(249,115,22,0.3)]'
                : 'bg-[#0B0E11] text-gray-400 border border-[#2A2F36] hover:text-white hover:border-blue-500/50'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 text-blue-400" />
            <span className="text-[11px] text-center">5. Abbey Road EQ</span>
          </button>

          <button
            onClick={() => setActiveTab('GAIN_LOUDNESS')}
            className={`py-2.5 px-2 rounded-xl text-xs font-extrabold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
              activeTab === 'GAIN_LOUDNESS'
                ? 'bg-orange-500 text-black shadow-[0_0_12px_rgba(249,115,22,0.3)]'
                : 'bg-[#0B0E11] text-gray-400 border border-[#2A2F36] hover:text-white hover:border-rose-500/50'
            }`}
          >
            <Gauge className="w-4 h-4 text-rose-400" />
            <span className="text-[11px] text-center">6. Gain & LUFS</span>
          </button>

          <button
            onClick={() => setActiveTab('BUS_VS_FX')}
            className={`py-2.5 px-2 rounded-xl text-xs font-extrabold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
              activeTab === 'BUS_VS_FX'
                ? 'bg-orange-500 text-black shadow-[0_0_12px_rgba(249,115,22,0.3)]'
                : 'bg-[#0B0E11] text-gray-400 border border-[#2A2F36] hover:text-white hover:border-gray-600'
            }`}
          >
            <GitFork className="w-4 h-4 text-purple-400" />
            <span className="text-[11px] text-center">7. FX vs Bus</span>
          </button>

          <button
            onClick={() => setActiveTab('PLUGINS_GUIDE')}
            className={`py-2.5 px-2 rounded-xl text-xs font-extrabold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
              activeTab === 'PLUGINS_GUIDE'
                ? 'bg-orange-500 text-black shadow-[0_0_12px_rgba(249,115,22,0.3)]'
                : 'bg-[#0B0E11] text-gray-400 border border-[#2A2F36] hover:text-white hover:border-gray-600'
            }`}
          >
            <Cpu className="w-4 h-4 text-pink-400" />
            <span className="text-[11px] text-center">8. Arsenal Nativo</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: CLEAN 5-STAGE SEQUENTIAL WORKFLOW */}
      {activeTab === 'WORKFLOW' && (
        <div className="space-y-6">
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
                      ? 'bg-orange-500/15 border-orange-500 ring-1 ring-orange-500/40 shadow-lg'
                      : 'bg-[#15191E] border-[#2A2F36] hover:border-gray-600 hover:bg-[#1A1F26]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-black ${
                        isDone
                          ? 'bg-emerald-500 text-black'
                          : isSelected
                            ? 'bg-orange-500 text-black'
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
                    <span className={isSelected ? 'text-orange-400 font-bold' : 'text-gray-500'}>
                      Etapa {step.stepNumber}/5
                    </span>
                    <span className="text-gray-400">{step.actions.length} Ações</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Active Step Inspector */}
          <div className="p-6 md:p-8 rounded-2xl bg-[#15191E] border border-[#2A2F36] shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#2A2F36]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-black text-orange-400">
                    ETAPA {currentStep.stepNumber} DE 5
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded border ${currentStep.badgeColor}`}>
                    {currentStep.tag}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-black text-white">
                  {currentStep.title}
                </h2>
                <p className="text-xs text-gray-300">
                  {currentStep.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleStepCompleted(currentStep.stepNumber)}
                  className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                    completedSteps.includes(currentStep.stepNumber)
                      ? 'bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                      : 'bg-[#0B0E11] text-gray-300 border border-[#2A2F36] hover:text-white'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{completedSteps.includes(currentStep.stepNumber) ? 'Etapa Concluída' : 'Marcar Concluída'}</span>
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-200 leading-relaxed bg-[#0B0E11] p-4 rounded-xl border border-[#2A2F36]">
              {currentStep.summary}
            </p>

            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-orange-400" />
                Ações Práticas Passo a Passo no Studio One 7
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {currentStep.actions.map((act, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#0B0E11] border border-[#2A2F36] space-y-2 flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-gray-500 font-bold">
                          AÇÃO #{idx + 1}
                        </span>
                        {act.nativePlugin && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-300 border border-orange-500/20">
                            {act.nativePlugin}
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-white">
                        {act.title}
                      </h4>
                      <p className="text-[11px] text-gray-300 leading-relaxed">
                        {act.instruction}
                      </p>
                    </div>

                    {act.studioOneShortcut && (
                      <div className="pt-2 border-t border-[#1C2127] flex items-center justify-between text-[10px] font-mono text-orange-400">
                        <span>Atalho S1:</span>
                        <code className="bg-[#15191E] px-1.5 py-0.5 rounded border border-[#2A2F36] text-white">
                          {act.studioOneShortcut}
                        </code>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/30 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>Dica de Ouro Studio One 7</span>
                </div>
                <p className="text-xs text-emerald-200/90 leading-relaxed">
                  {currentStep.proTip}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/30 space-y-1.5">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold">
                  <AlertTriangle className="w-4 h-4" />
                  <span>O Que Evitar a Todo Custo</span>
                </div>
                <p className="text-xs text-rose-200/90 leading-relaxed">
                  {currentStep.whatToAvoid}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: 5 ESSENTIAL AUXILIARY CHANNELS (SENDS) */}
      {activeTab === 'AUX_CHANNELS' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {studioOneAuxChannels.map((aux) => {
              const isSelected = aux.id === selectedAuxId;
              return (
                <button
                  key={aux.id}
                  onClick={() => setSelectedAuxId(aux.id)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-orange-500/15 border-orange-500 ring-1 ring-orange-500/40 shadow-lg'
                      : 'bg-[#15191E] border-[#2A2F36] hover:border-gray-600 hover:bg-[#1A1F26]'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono uppercase text-orange-400 font-bold block">
                      {aux.category}
                    </span>
                    <h4 className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-gray-200'}`}>
                      {aux.name.split(':')[0]}
                    </h4>
                    <p className="text-[10px] text-gray-400 line-clamp-1">
                      {aux.nativePlugin}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#242A34] flex items-center justify-between text-[10px] font-mono text-cyan-400">
                    <span>Send:</span>
                    <span className="text-white font-bold">{aux.routingWorkflow.sendLevel.split(' ')[0]}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-6 md:p-8 rounded-2xl bg-[#15191E] border border-[#2A2F36] shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#2A2F36]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/40">
                    {currentAux.auxType}
                  </span>
                  <span className="text-xs font-mono text-gray-400">
                    Plugin: <strong className="text-white">{currentAux.nativePlugin}</strong>
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-black text-white">
                  {currentAux.name}
                </h2>
                <p className="text-xs text-gray-300">
                  {currentAux.description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyAuxPreset(currentAux)}
                  className="px-3.5 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-black font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  {copiedAuxId === currentAux.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedAuxId === currentAux.id ? 'Preset Copiado!' : 'Copiar Preset'}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5" />
                  Como Criar e Conectar no Studio One 7
                </h3>
                <div className="p-4 rounded-xl bg-[#0B0E11] border border-[#2A2F36] space-y-2 font-sans text-xs text-gray-200">
                  {currentAux.howToCreateInStudioOne.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#15191E] border border-[#2A2F36] text-[10px] font-mono text-orange-400 flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-[#0B0E11] border border-cyan-500/30 space-y-2">
                  <h4 className="text-xs font-bold text-cyan-300 flex items-center gap-2">
                    <Radio className="w-3.5 h-3.5 text-cyan-400" />
                    Regras de Roteamento & Sends
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <div className="p-2 rounded bg-[#15191E] border border-[#2A2F36]">
                      <span className="text-gray-500 block text-[9px]">ORIGEM TÍPICA</span>
                      <span className="text-white font-bold">{currentAux.routingWorkflow.fromTrack}</span>
                    </div>
                    <div className="p-2 rounded bg-[#15191E] border border-[#2A2F36]">
                      <span className="text-gray-500 block text-[9px]">NÍVEL DE SEND</span>
                      <span className="text-cyan-400 font-bold">{currentAux.routingWorkflow.sendLevel}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5" />
                  Parâmetros Calibrados do Plugin Nativo
                </h3>
                <div className="space-y-2">
                  {currentAux.recommendedSettings.map((setting, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#0B0E11] border border-[#2A2F36] flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-0.5">
                        <span className="font-bold text-white block">{setting.parameter}</span>
                        <span className="text-[10px] text-gray-400">{setting.note}</span>
                      </div>
                      <span className="font-mono font-extrabold text-orange-400 bg-[#15191E] px-2.5 py-1 rounded border border-[#2A2F36] shrink-0">
                        {setting.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 space-y-1.5">
                  <h4 className="text-xs font-bold text-orange-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                    Dica de Produção Studio One
                  </h4>
                  {currentAux.studioOneTips.map((tip, idx) => (
                    <p key={idx} className="text-xs text-orange-200/90 leading-relaxed">
                      • {tip}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: CHANNEL SPLITTER POWER (MULTIBAND & MID/SIDE) */}
      {activeTab === 'CHANNEL_SPLITTER' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-5 md:p-6 rounded-2xl bg-gradient-to-r from-[#15191E] via-[#1F271E] to-[#15191E] border border-emerald-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
                <Scissors className="w-3.5 h-3.5 text-emerald-400" />
                <span>EXCLUSIVO STUDIO ONE 7 • PROCESSAMENTO MULTICANAL NATIVO</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white">
                O Poder Secreto do Channel Splitter
              </h2>
              <p className="text-xs text-gray-300 leading-relaxed">
                Divida qualquer canal por frequência (ex: 808 mono abaixo de 120Hz + distorção nos agudos), em Mid/Side nativo ou em caminhos paralelos sem nenhum plugin de terceiros.
              </p>
            </div>

            <button
              onClick={() => handleCopySplitterPreset(currentSplitter)}
              className="px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs flex items-center gap-2 transition-all shadow-[0_0_12px_rgba(16,185,129,0.3)] shrink-0 cursor-pointer"
            >
              {copiedSplitterId === currentSplitter.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedSplitterId === currentSplitter.id ? 'Preset Copiado!' : 'Copiar Preset Splitter'}</span>
            </button>
          </div>

          {/* Splitter Presets Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {studioOneChannelSplitterPresets.map((preset) => {
              const isSelected = preset.id === selectedSplitterId;
              return (
                <button
                  key={preset.id}
                  onClick={() => setSelectedSplitterId(preset.id)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-emerald-500/15 border-emerald-500 ring-1 ring-emerald-500/40 shadow-lg'
                      : 'bg-[#15191E] border-[#2A2F36] hover:border-gray-600'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${preset.badgeColor}`}>
                        {preset.mode.split(' ')[0]}
                      </span>
                      <span className="text-[10px] font-mono text-gray-400">{preset.difficulty}</span>
                    </div>
                    <h4 className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-gray-200'}`}>
                      {preset.title}
                    </h4>
                    <p className="text-[10px] text-gray-400 line-clamp-2">
                      {preset.targetTrack}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#242A34] text-[10px] font-mono text-emerald-400 flex items-center justify-between">
                    <span>{preset.splits.length} Ramos de Sinal</span>
                    <span>Ver Roteamento →</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Splitter Details & Diagram */}
          <div className="p-6 md:p-8 rounded-2xl bg-[#15191E] border border-[#2A2F36] shadow-xl space-y-6">
            <div className="space-y-2 pb-4 border-b border-[#2A2F36]">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded border ${currentSplitter.badgeColor}`}>
                  {currentSplitter.mode}
                </span>
                <span className="text-xs font-mono text-gray-400">
                  Faixa Alvo: <strong className="text-white">{currentSplitter.targetTrack}</strong>
                </span>
              </div>
              <h3 className="text-xl font-black text-white">
                {currentSplitter.title}
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                {currentSplitter.description}
              </p>
            </div>

            {/* Visual Signal Tree Flow */}
            <div className="p-4 rounded-xl bg-[#0B0E11] border border-[#2A2F36] space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-emerald-400 text-[11px] pb-1 border-b border-[#2A2F36]">
                <span>DIAGRAMA DO SPLITTER DENTRO DO CANAL (INSERTS)</span>
                <span>STUDIO ONE 7 ROUTING</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentSplitter.splits.map((sp, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-[#15191E] border border-emerald-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{sp.name}</span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                        {sp.range}
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-300 space-y-1 font-sans">
                      <p><strong className="text-orange-400">Plugins:</strong> {sp.plugins.join(', ')}</p>
                      <p><strong className="text-cyan-400">Config:</strong> {sp.settings}</p>
                      <p className="text-[10px] text-gray-400 italic">💡 {sp.whyItWorks}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step by step setup */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#0B0E11] border border-[#2A2F36] space-y-2">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Passo a Passo de Configuração:
                </h4>
                <div className="space-y-1.5 text-xs text-gray-300">
                  {currentSplitter.setupSteps.map((st, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-mono font-bold">•</span>
                      <span>{st}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2 flex flex-col justify-center">
                <h4 className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  Dica de Mestre Studio One 7
                </h4>
                <p className="text-xs text-emerald-200/90 leading-relaxed">
                  {currentSplitter.proTip}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: AUTO DUCKER ON REVERB & DELAY */}
      {activeTab === 'AUTO_DUCKER' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-5 md:p-6 rounded-2xl bg-gradient-to-r from-[#15191E] via-[#262214] to-[#15191E] border border-yellow-500/30 shadow-xl space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 text-xs font-mono font-bold">
              <VolumeX className="w-3.5 h-3.5 text-yellow-400" />
              <span>TÉCNICA ESPAÇO LIMPO • REVERB & DELAY DUCKING</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white">
              {studioOneAutoDuckerGuide.title}
            </h2>
            <p className="text-xs text-gray-300 leading-relaxed max-w-3xl">
              {studioOneAutoDuckerGuide.objective} {studioOneAutoDuckerGuide.whyItWorks}
            </p>
          </div>

          {/* Interactive Ducker Simulator */}
          <div className="p-6 rounded-2xl bg-[#15191E] border border-[#2A2F36] shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#2A2F36]">
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-yellow-400 animate-pulse" />
                  Simulador Interativo de Ducking no Studio One
                </h3>
                <p className="text-xs text-gray-400">
                  Alterne o estado da voz para ver como o Compressor no canal de Reverb/Delay reage automaticamente via Sidechain.
                </p>
              </div>

              <button
                onClick={() => setIsVocalSinging(!isVocalSinging)}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                  isVocalSinging
                    ? 'bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.4)]'
                    : 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                }`}
              >
                {isVocalSinging ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span>{isVocalSinging ? 'Voz Cantando (Vocal ON)' : 'Pausa de Frase (Vocal OFF)'}</span>
              </button>
            </div>

            {/* Meters & Visual Feedback */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#0B0E11] border border-[#2A2F36] space-y-3">
                <span className="text-[10px] font-mono text-gray-400 uppercase font-bold">1. Pista Lead Vocal</span>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-400">Status:</span>
                    <span className={isVocalSinging ? 'text-yellow-400 font-bold' : 'text-gray-500'}>
                      {isVocalSinging ? 'CANTANDO (-12 dBFS)' : 'SILÊNCIO (-inf dB)'}
                    </span>
                  </div>
                  <div className="h-4 bg-[#15191E] rounded-full overflow-hidden border border-[#2A2F36] p-0.5">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isVocalSinging ? 'w-[75%] bg-gradient-to-r from-emerald-500 to-yellow-500' : 'w-[2%] bg-gray-700'
                      }`}
                    />
                  </div>
                </div>
                <p className="text-[10px] text-gray-500">Envia sinal para o Sidechain do Reverb</p>
              </div>

              <div className="p-4 rounded-xl bg-[#0B0E11] border border-yellow-500/40 space-y-3">
                <span className="text-[10px] font-mono text-yellow-400 uppercase font-bold">2. Compressor Sidechain (FX Return)</span>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-400">Gain Reduction:</span>
                    <span className={isVocalSinging ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                      {isVocalSinging ? '-5.5 dB (Atenuado)' : '0.0 dB (Totalmente Aberto)'}
                    </span>
                  </div>
                  <div className="h-4 bg-[#15191E] rounded-full overflow-hidden border border-[#2A2F36] p-0.5">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isVocalSinging ? 'w-[55%] bg-rose-500' : 'w-[0%] bg-transparent'
                      }`}
                    />
                  </div>
                </div>
                <p className="text-[10px] text-yellow-300/80">Abaixa o efeito durante a cantoria</p>
              </div>

              <div className="p-4 rounded-xl bg-[#0B0E11] border border-cyan-500/40 space-y-3">
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">3. Volume Final do Reverb/Delay</span>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-400">Cauda Espacial:</span>
                    <span className={isVocalSinging ? 'text-cyan-400' : 'text-cyan-300 font-bold'}>
                      {isVocalSinging ? 'Sutil em Segundo Plano' : '✨ Cauda Completa 3D'}
                    </span>
                  </div>
                  <div className="h-4 bg-[#15191E] rounded-full overflow-hidden border border-[#2A2F36] p-0.5">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isVocalSinging ? 'w-[30%] bg-cyan-700' : 'w-[90%] bg-cyan-400'
                      }`}
                    />
                  </div>
                </div>
                <p className="text-[10px] text-cyan-300/80">Sobe nas pausas e preenche o espaço sonoro</p>
              </div>
            </div>

            {/* 5-Step Setup Guide */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono font-bold text-yellow-400 uppercase tracking-wider">
                Configuração Passo a Passo no Studio One 7:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {studioOneAutoDuckerGuide.stepByStep.map((st) => (
                  <div key={st.step} className="p-3.5 rounded-xl bg-[#0B0E11] border border-[#2A2F36] space-y-1.5 flex flex-col justify-between">
                    <div>
                      <span className="w-5 h-5 rounded-full bg-yellow-500/20 text-yellow-400 font-mono text-xs font-bold flex items-center justify-center mb-1">
                        {st.step}
                      </span>
                      <h5 className="text-xs font-bold text-white">{st.title}</h5>
                    </div>
                    <p className="text-[11px] text-gray-300 leading-snug">{st.instruction}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 5: ABBEY ROAD REVERB EQ MATRIX */}
      {activeTab === 'ABBEY_ROAD_EQ' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-5 md:p-6 rounded-2xl bg-gradient-to-r from-[#15191E] via-[#14202B] to-[#15191E] border border-blue-500/30 shadow-xl space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-mono font-bold">
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
              <span>TÉCNICA CLÁSSICA DE ESTÚDIO • ABBEY ROAD FILTER</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white">
              {studioOneAbbeyRoadFilterMatrix.title}
            </h2>
            <p className="text-xs text-gray-300 leading-relaxed max-w-3xl">
              {studioOneAbbeyRoadFilterMatrix.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {studioOneAbbeyRoadFilterMatrix.goldenRules.map((rule, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#15191E] border border-blue-500/30 shadow-lg space-y-2">
                <span className="text-[10px] font-mono text-blue-400 uppercase font-bold">Regra #{idx + 1}</span>
                <h3 className="text-base font-extrabold text-white">{rule.freq}</h3>
                <div className="font-mono text-sm font-black text-cyan-300 bg-[#0B0E11] px-3 py-1.5 rounded-lg border border-[#2A2F36]">
                  {rule.value}
                </div>
                <p className="text-xs text-gray-300 leading-relaxed pt-1">{rule.purpose}</p>
              </div>
            ))}
          </div>

          {/* Style Presets Matrix */}
          <div className="p-6 rounded-2xl bg-[#15191E] border border-[#2A2F36] shadow-xl space-y-4">
            <h3 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
              Calibração por Gênero Musical no Studio One 7
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {studioOneAbbeyRoadFilterMatrix.stylePresets.map((preset, idx) => {
                const isSelected = selectedAbbeyStyle === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedAbbeyStyle(idx)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer space-y-2 ${
                      isSelected
                        ? 'bg-blue-500/20 border-blue-500 ring-1 ring-blue-500/40 shadow-lg'
                        : 'bg-[#0B0E11] border-[#2A2F36] hover:border-gray-600'
                    }`}
                  >
                    <h4 className="text-xs font-bold text-white">{preset.style}</h4>
                    <div className="space-y-1 font-mono text-[11px]">
                      <p className="text-cyan-300">HPF: {preset.hpf}</p>
                      <p className="text-blue-300">LPF: {preset.lpf}</p>
                      <p className="text-orange-300">Decay: {preset.decay}</p>
                    </div>
                    <p className="text-[10px] text-gray-400 pt-1 border-t border-[#1C2127]">{preset.character}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 6: GAIN STAGING, K-SYSTEM & LUFS MATRIX */}
      {activeTab === 'GAIN_LOUDNESS' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-5 md:p-6 rounded-2xl bg-gradient-to-r from-[#15191E] via-[#2A161E] to-[#15191E] border border-rose-500/30 shadow-xl space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-mono font-bold">
              <Gauge className="w-3.5 h-3.5 text-rose-400" />
              <span>HEADROOM & LOUDNESS • CALIBRAÇÃO DE METERS S1</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white">
              {studioOneGainLoudnessMatrix.title}
            </h2>
            <p className="text-xs text-gray-300 leading-relaxed max-w-3xl">
              {studioOneGainLoudnessMatrix.gainStagingOverview}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {studioOneGainLoudnessMatrix.gainStagingSteps.map((stp, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#15191E] border border-rose-500/30 shadow-lg space-y-2">
                <span className="text-[10px] font-mono text-rose-400 uppercase font-bold">Calibração #{idx + 1}</span>
                <h3 className="text-base font-extrabold text-white">{stp.step}</h3>
                <div className="font-mono text-xs font-black text-rose-300 bg-[#0B0E11] px-3 py-1.5 rounded-lg border border-[#2A2F36]">
                  {stp.target}
                </div>
                <p className="text-xs text-gray-300 leading-relaxed pt-1">{stp.desc}</p>
              </div>
            ))}
          </div>

          {/* Streaming Targets Table */}
          <div className="p-6 rounded-2xl bg-[#15191E] border border-[#2A2F36] shadow-xl space-y-4">
            <h3 className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
              Tabela de Alvos de LUFS & True Peak para Exportação no Studio One 7
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#2A2F36] text-gray-400 text-[10px]">
                    <th className="pb-3 pr-4">PLATAFORMA / DESTINO</th>
                    <th className="pb-3 pr-4">LUFS INTEGRADO</th>
                    <th className="pb-3 pr-4">TRUE PEAK TETO</th>
                    <th className="pb-3 pr-4">DYNAMIC RANGE</th>
                    <th className="pb-3">NOTA DE MASTERIZAÇÃO</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1C2127]">
                  {studioOneGainLoudnessMatrix.streamingTargets.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#1A1F26] transition-colors">
                      <td className="py-3 pr-4 font-bold text-white">{row.platform}</td>
                      <td className="py-3 pr-4 text-cyan-400 font-bold">{row.integratedLufs}</td>
                      <td className="py-3 pr-4 text-orange-400">{row.truePeak}</td>
                      <td className="py-3 pr-4 text-emerald-400">{row.dynamicRange}</td>
                      <td className="py-3 text-gray-400 font-sans text-[11px]">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 7: FX CHANNEL VS BUS CHANNEL DETAILED MATRIX */}
      {activeTab === 'BUS_VS_FX' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-5 md:p-6 rounded-2xl bg-gradient-to-r from-[#15191E] via-[#1A222D] to-[#15191E] border border-cyan-500/30 shadow-xl space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-bold">
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>ROTEAMENTO AVANÇADO NO STUDIO ONE 7</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white">
              FX Channel (Sends) vs Bus Channel (Submixes)
            </h2>
            <p className="text-xs text-gray-300 leading-relaxed max-w-3xl">
              Entenda de forma definitiva a diferença estrutural entre duplicar o sinal para processamento paralelo (FX Send) e rotear a saída obrigatória para controle de grupo (Bus).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Card 1: FX Channel */}
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

              <div className="p-4 rounded-xl bg-[#0B0E11] border border-[#2A2F36] font-mono text-xs text-gray-300 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-orange-400 pb-1 border-b border-[#2A2F36]">
                  <span>DIAGRAMA DE FLUXO FX CHANNEL (SEND)</span>
                  <span>SINAL DUPLICADO</span>
                </div>
                <div className="space-y-1 text-[11px]">
                  <p className="text-white font-bold">🎙️ Pista Lead Vocal</p>
                  <p className="pl-4 text-gray-400">├── Saída Principal (Main Out) ────► <strong>Mix Master</strong> (100% Seco)</p>
                  <p className="pl-4 text-orange-400">└── Send Auxiliar (-12 dB) ────────► <strong>FX Reverb OpenAIR</strong> (100% Wet) ──► <strong>Mix Master</strong></p>
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

            {/* Card 2: Bus Channel */}
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

      {/* VIEW 8: STUDIO ONE 7 NATIVE PLUGINS ARSENAL GUIDE */}
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
            <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-orange-500/10 text-orange-300 border border-orange-500/30 shrink-0">
              {studioOneNativePluginsGuide.length} Ferramentas Essenciais
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {studioOneNativePluginsGuide.map((plugin, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#15191E] border border-[#2A2F36] hover:border-orange-500/40 transition-all space-y-3 shadow-lg flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-extrabold text-white">
                      {plugin.name}
                    </h3>
                    <span className="text-[9px] font-mono uppercase bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded border border-orange-500/20">
                      Nativo
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-orange-300 font-semibold block">
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
