import React, { useState } from 'react';
import { Project, NavigationTab, InstrumentGuide } from '../types';
import { 
  CheckCircle2, 
  Circle, 
  Sliders, 
  AlertTriangle, 
  ArrowRight, 
  Gauge, 
  Layers, 
  Info, 
  Sparkles, 
  Mic2, 
  Music, 
  Radio, 
  Plug, 
  Cpu, 
  Headphones,
  Check
} from 'lucide-react';
import { instrumentsData } from '../data/instrumentsData';

interface MixViewProps {
  activeProject: Project | null;
  onUpdateProject: (updated: Project) => void;
  onNavigate: (tab: NavigationTab) => void;
}

const defaultPreparationChecklist = [
  { id: 'chk-prep-1', label: 'Organizar instrumentos por cores e ordem lógica no mixer', category: 'Organização' },
  { id: 'chk-prep-2', label: 'Nomear todos os canais claramente (Lead, Backs, Kick, Snare, 808, Keys)', category: 'Organização' },
  { id: 'chk-prep-3', label: 'Separar faixas de Vocais em canais dedicados com bus exclusivo', category: 'Roteamento' },
  { id: 'chk-prep-4', label: 'Separar Instrumental em grupos (Drums, Bass, Synths, FX)', category: 'Roteamento' },
  { id: 'chk-prep-5', label: 'Ajustar volumes iniciais em mono para equilibrar a relação de níveis', category: 'Balanço' },
  { id: 'chk-prep-6', label: 'Verificar se não há clipping nos canais individuais (picos abaixo de 0dB)', category: 'Ganho' },
  { id: 'chk-prep-7', label: 'Fazer Gain Staging calibrado: manter o Master com -6dBFS de pico livre', category: 'Ganho' },
  { id: 'chk-prep-8', label: 'Remover plugins desnecessários e desativar efeitos de demonstração', category: 'Limpeza' }
];

type MixingWorkflowMode = 'VOCAL_MODE' | 'BEAT_MODE' | 'ALL_MODE';
type PluginChainEcosystem = 'flNative' | 's1Native' | 'waves' | 'fabfilter' | 'hybridPro';

export const MixView: React.FC<MixViewProps> = ({
  activeProject,
  onUpdateProject,
  onNavigate
}) => {
  const [workflowMode, setWorkflowMode] = useState<MixingWorkflowMode>('VOCAL_MODE');
  const [selectedInstrumentId, setSelectedInstrumentId] = useState<string>('vocal-principal');
  const [selectedChainEcosystem, setSelectedChainEcosystem] = useState<PluginChainEcosystem>('flNative');
  const [gainStagingPeak, setGainStagingPeak] = useState<number>(-2.5);

  const checklist = activeProject?.checklist || {};

  const toggleChecklist = (id: string) => {
    if (!activeProject) return;
    const newChecklist = { ...checklist, [id]: !checklist[id] };
    const totalItems = defaultPreparationChecklist.length;
    const completedItems = Object.values(newChecklist).filter(Boolean).length;
    const progress = Math.round((completedItems / totalItems) * 100);

    const updated: Project = {
      ...activeProject,
      checklist: newChecklist,
      mixProgress: progress
    };
    onUpdateProject(updated);
  };

  const completedCount = Object.values(checklist).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / defaultPreparationChecklist.length) * 100);

  // Filter elements by workflow mode
  const filteredInstruments = instrumentsData.filter((inst) => {
    if (workflowMode === 'VOCAL_MODE') return inst.mixTarget === 'VOCAL';
    if (workflowMode === 'BEAT_MODE') return inst.mixTarget === 'INSTRUMENTAL';
    return true;
  });

  // Ensure selected instrument belongs to current filter
  const currentInstrument: InstrumentGuide = 
    instrumentsData.find(i => i.id === selectedInstrumentId) || 
    filteredInstruments[0] || 
    instrumentsData[0];

  const handleSelectWorkflow = (mode: MixingWorkflowMode) => {
    setWorkflowMode(mode);
    if (mode === 'VOCAL_MODE') {
      setSelectedInstrumentId('vocal-principal');
    } else if (mode === 'BEAT_MODE') {
      setSelectedInstrumentId('kick-bumbo');
    }
  };

  // Helper to extract active chain based on chosen ecosystem
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

  const currentChain = getActiveChain(currentInstrument, selectedChainEcosystem);

  return (
    <div className="p-3 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-5 sm:space-y-8 animate-in fade-in duration-200">
      
      {/* HEADER WITH DEDICATED WORKFLOW SELECTOR */}
      <div className="rounded-2xl bg-[#15191E] border border-[#2A2F36] p-4 sm:p-6 md:p-8 shadow-xl space-y-5 sm:space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold">
              <Sliders className="w-3.5 h-3.5" />
              SISTEMA DE MIXAGEM MULTI-DAW & PLUGINS
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
              Centro de Mixagem: Vocal vs Instrumental
            </h1>
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
              Tratamento cirúrgico separado para mixagem de voz e beat com suporte nativo a <strong className="text-orange-400">FL Studio</strong>, <strong className="text-blue-400">Studio One</strong>, além de cadeias com <strong className="text-indigo-400">Waves</strong>, <strong className="text-emerald-400">FabFilter</strong> e <strong className="text-purple-400">Plugins Híbridos de Elite</strong>.
            </p>
          </div>

          {/* Mixing Progress Bar Widget */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-[#0B0E11] border border-[#2A2F36] shrink-0 w-full lg:w-auto lg:min-w-[260px]">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-gray-400 uppercase tracking-wider text-[10px]">
                PROGRESSO DO PROJETO
              </span>
              <span className={`font-mono font-extrabold text-base ${
                progressPercent === 100 ? 'text-emerald-400' : progressPercent > 50 ? 'text-orange-400' : 'text-cyan-400'
              }`}>
                {progressPercent}%
              </span>
            </div>
            <div className="h-2.5 w-full bg-[#15191E] rounded-full overflow-hidden p-0.5 border border-[#2A2F36]">
              <div
                className="h-full rounded-full transition-all duration-300 bg-gradient-to-r from-cyan-500 via-orange-500 to-emerald-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] text-gray-500 mt-1.5 font-mono">
              <span>{completedCount} de {defaultPreparationChecklist.length} etapas</span>
              <span>{progressPercent === 100 ? '✨ Pronto' : 'Em andamento'}</span>
            </div>
          </div>
        </div>

        {/* WORKFLOW TABS SELECTOR (VOCAL vs INSTRUMENTAL vs ALL) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-2">
          <button
            onClick={() => handleSelectWorkflow('VOCAL_MODE')}
            className={`p-3.5 sm:p-4 rounded-xl border flex items-center gap-3 transition-all text-left cursor-pointer ${
              workflowMode === 'VOCAL_MODE'
                ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)] ring-1 ring-cyan-400'
                : 'bg-[#0B0E11] border-[#2A2F36] text-gray-400 hover:border-gray-500 hover:text-white'
            }`}
          >
            <div className={`p-2.5 rounded-lg shrink-0 ${workflowMode === 'VOCAL_MODE' ? 'bg-cyan-500 text-white' : 'bg-[#15191E] text-cyan-400'}`}>
              <Mic2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-extrabold text-xs sm:text-sm text-white">MIX VOCAL</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono font-bold">VOZ</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-gray-400 mt-0.5">
                Lead Vocal, Backings, Dobras L/R, Adlibs & Bus.
              </p>
            </div>
          </button>

          <button
            onClick={() => handleSelectWorkflow('BEAT_MODE')}
            className={`p-3.5 sm:p-4 rounded-xl border flex items-center gap-3 transition-all text-left cursor-pointer ${
              workflowMode === 'BEAT_MODE'
                ? 'bg-orange-500/15 border-orange-400 text-white shadow-[0_0_15px_rgba(249,115,22,0.2)] ring-1 ring-orange-400'
                : 'bg-[#0B0E11] border-[#2A2F36] text-gray-400 hover:border-gray-500 hover:text-white'
            }`}
          >
            <div className={`p-2.5 rounded-lg shrink-0 ${workflowMode === 'BEAT_MODE' ? 'bg-orange-500 text-white' : 'bg-[#15191E] text-orange-400'}`}>
              <Music className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-extrabold text-xs sm:text-sm text-white">MIX INSTRUMENTAL</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-300 font-mono font-bold">BEAT</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-gray-400 mt-0.5">
                Kick, 808, Baixo, Caixa, Hi-Hats, Synths & Drums.
              </p>
            </div>
          </button>

          <button
            onClick={() => handleSelectWorkflow('ALL_MODE')}
            className={`p-3.5 sm:p-4 rounded-xl border flex items-center gap-3 transition-all text-left cursor-pointer ${
              workflowMode === 'ALL_MODE'
                ? 'bg-purple-500/15 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.2)] ring-1 ring-purple-400'
                : 'bg-[#0B0E11] border-[#2A2F36] text-gray-400 hover:border-gray-500 hover:text-white'
            }`}
          >
            <div className={`p-2.5 rounded-lg shrink-0 ${workflowMode === 'ALL_MODE' ? 'bg-purple-500 text-white' : 'bg-[#15191E] text-purple-400'}`}>
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-extrabold text-xs sm:text-sm text-white">TODAS AS PISTAS</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono font-bold">TODOS</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-gray-400 mt-0.5">
                Todos os 11 elementos e grupos integrados.
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* DEDICATED WORKFLOW GUIDANCE BANNER */}
      {workflowMode === 'VOCAL_MODE' && (
        <div className="rounded-xl bg-gradient-to-r from-cyan-950/40 via-[#15191E] to-[#15191E] border border-cyan-500/30 p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
              <Mic2 className="w-4 h-4 text-cyan-400" />
              <span>Ordem de Processamento da Cadeia Vocal Padrão da Indústria</span>
            </div>
            <button
              onClick={() => onNavigate('vocal_cleaning')}
              className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
            >
              <span>Vocal Studio & Afinação</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
            <div className="p-2.5 rounded bg-[#0B0E11] border border-[#2A2F36]">
              <span className="text-[10px] text-cyan-400 font-bold block font-mono">1. AFINAÇÃO</span>
              <span className="text-gray-300 text-[11px]">NewTone / Melodyne / Auto-Tune Pro</span>
            </div>
            <div className="p-2.5 rounded bg-[#0B0E11] border border-[#2A2F36]">
              <span className="text-[10px] text-cyan-400 font-bold block font-mono">2. LIMPEZA & EQ</span>
              <span className="text-gray-300 text-[11px]">HPF 85Hz + RX Mouth De-Click</span>
            </div>
            <div className="p-2.5 rounded bg-[#0B0E11] border border-[#2A2F36]">
              <span className="text-[10px] text-cyan-400 font-bold block font-mono">3. DE-ESSER</span>
              <span className="text-gray-300 text-[11px]">Pro-DS / Maximus / Silk Vocal</span>
            </div>
            <div className="p-2.5 rounded bg-[#0B0E11] border border-[#2A2F36]">
              <span className="text-[10px] text-cyan-400 font-bold block font-mono">4. COMPRESSÃO</span>
              <span className="text-gray-300 text-[11px]">1176 rápido (picos) + LA-2A (calor)</span>
            </div>
            <div className="p-2.5 rounded bg-[#0B0E11] border border-[#2A2F36]">
              <span className="text-[10px] text-cyan-400 font-bold block font-mono">5. AR & TONAL</span>
              <span className="text-gray-300 text-[11px]">Fresh Air / Pultec EQP-1A / Decapitator</span>
            </div>
            <div className="p-2.5 rounded bg-[#0B0E11] border border-[#2A2F36]">
              <span className="text-[10px] text-cyan-400 font-bold block font-mono">6. FX AUX SENDS</span>
              <span className="text-gray-300 text-[11px]">Reverb Plate & Ducking Delay 3</span>
            </div>
          </div>
        </div>
      )}

      {workflowMode === 'BEAT_MODE' && (
        <div className="rounded-xl bg-gradient-to-r from-orange-950/40 via-[#15191E] to-[#15191E] border border-orange-500/30 p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-orange-300 font-bold text-sm">
              <Music className="w-4 h-4 text-orange-400" />
              <span>Pilares da Mixagem de Instrumental (Kick, 808, Bateria & Harmonia)</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0B0E11] text-orange-400 border border-orange-500/20">
              Punch & Definição
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-xs">
            <div className="p-2.5 rounded bg-[#0B0E11] border border-[#2A2F36]">
              <span className="text-[10px] text-orange-400 font-bold block font-mono">1. KICK VS 808</span>
              <span className="text-gray-300 text-[11px]">Sidechain Ducking + 100% Mono abaixo de 100Hz</span>
            </div>
            <div className="p-2.5 rounded bg-[#0B0E11] border border-[#2A2F36]">
              <span className="text-[10px] text-orange-400 font-bold block font-mono">2. DE-MUDDING</span>
              <span className="text-gray-300 text-[11px]">Corte em 250-400Hz nos instrumentos e caixas</span>
            </div>
            <div className="p-2.5 rounded bg-[#0B0E11] border border-[#2A2F36]">
              <span className="text-[10px] text-orange-400 font-bold block font-mono">3. TRANSIENTES</span>
              <span className="text-gray-300 text-[11px]">Soft Clipper na Bateria para reter impacto</span>
            </div>
            <div className="p-2.5 rounded bg-[#0B0E11] border border-[#2A2F36]">
              <span className="text-[10px] text-orange-400 font-bold block font-mono">4. ABERTURA ESTÉREO</span>
              <span className="text-gray-300 text-[11px]">Pan 80% L/R nas percussões e Mid/Side nos pads</span>
            </div>
            <div className="p-2.5 rounded bg-[#0B0E11] border border-[#2A2F36]">
              <span className="text-[10px] text-orange-400 font-bold block font-mono">5. DRUM BUS GLUE</span>
              <span className="text-gray-300 text-[11px]">SSL G-Master ou Tricomp colando o conjunto</span>
            </div>
          </div>
        </div>
      )}

      {/* ELEMENT SELECTOR & INTERACTIVE PROCESSING RACK */}
      <div className="rounded-xl bg-[#15191E] border border-[#2A2F36] p-6 shadow-lg space-y-6">
        
        {/* Title & Plugin Ecosystem Selector */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-[#2A2F36] pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                GUIA DE PROCESSAMENTO POR ELEMENTO
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0B0E11] text-gray-300 border border-[#2A2F36]">
                {workflowMode === 'VOCAL_MODE' ? 'Modo Vocal' : workflowMode === 'BEAT_MODE' ? 'Modo Instrumental' : 'Todos'}
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-white mt-1">
              Tratamento de {currentInstrument.name}
            </h2>
          </div>

          {/* Plugin Chain Selector (FL Native vs S1 Native vs Waves vs FabFilter vs Hybrid) */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-gray-400 uppercase font-bold tracking-wider block">
              Escolha a DAW / Família de Plugins:
            </span>
            <div className="flex flex-wrap gap-1.5 p-1 rounded-lg bg-[#0B0E11] border border-[#2A2F36]">
              {[
                { id: 'flNative', label: '🟠 FL Studio Nativo', desc: '100% Nativos FL' },
                { id: 's1Native', label: '🔵 Studio One Nativo', desc: '100% Nativos PreSonus' },
                { id: 'waves', label: '🔷 Waves Audio', desc: 'CLA, SSL, R-Vox' },
                { id: 'fabfilter', label: '🟢 FabFilter Suite', desc: 'Pro-Q3, Pro-C2, Pro-DS' },
                { id: 'hybridPro', label: '🟣 Híbrida de Elite', desc: 'Soundtoys, Slate, UAD, Soothe2' }
              ].map((eco) => {
                const isSelected = selectedChainEcosystem === eco.id;
                return (
                  <button
                    key={eco.id}
                    onClick={() => setSelectedChainEcosystem(eco.id as PluginChainEcosystem)}
                    className={`text-xs px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-600 text-white shadow-sm ring-1 ring-cyan-400'
                        : 'text-gray-400 hover:text-white hover:bg-[#15191E]'
                    }`}
                  >
                    {eco.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Grid: Left Element Selector | Right Detailed Processing Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Elements List */}
          <div className="space-y-2 max-h-[560px] overflow-y-auto pr-1">
            <span className="text-[10px] font-mono text-gray-400 uppercase font-bold tracking-wider block px-1">
              Selecione a Pista:
            </span>
            {filteredInstruments.map((inst) => {
              const isSelected = inst.id === selectedInstrumentId;
              return (
                <div
                  key={inst.id}
                  onClick={() => setSelectedInstrumentId(inst.id)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                      : 'bg-[#0B0E11] border-[#2A2F36] text-gray-300 hover:border-cyan-500/40 hover:bg-[#15191E]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold">{inst.name}</span>
                    <span className={`text-[9px] px-2 py-0.5 rounded font-mono ${
                      inst.category === 'VOCAL' ? 'bg-cyan-500/20 text-cyan-300' :
                      inst.category === 'DRUMS' ? 'bg-orange-500/20 text-orange-300' :
                      inst.category === 'BAIXO' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-purple-500/20 text-purple-300'
                    }`}>
                      {inst.subCategory || inst.category}
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-400 block mt-1 truncate">
                    Posicionamento: {inst.stereoPlacement}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Selected Instrument Detail Card */}
          <div className="lg:col-span-2 rounded-xl bg-[#0B0E11] border border-[#2A2F36] p-6 space-y-5 shadow-lg">
            
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2A2F36] pb-4">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider">
                  Especificações Técnicas
                </span>
                <h3 className="text-xl font-extrabold text-white">{currentInstrument.name}</h3>
                {currentInstrument.description && (
                  <p className="text-xs text-gray-400 mt-0.5">{currentInstrument.description}</p>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs px-2.5 py-1 rounded-lg bg-[#15191E] border border-[#2A2F36] text-gray-300 font-mono">
                  Panorama: {currentInstrument.stereoPlacement}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-lg bg-orange-500/10 text-orange-300 border border-orange-500/30 font-mono">
                  Saturação: {currentInstrument.saturationRec}
                </span>
              </div>
            </div>

            {/* FREQUENCY FOCUS GRID */}
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                <span>Equalização Cirúrgica & Frequências Críticas</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 bg-[#15191E] border border-[#2A2F36] rounded-lg">
                  <span className="text-[10px] text-red-400 font-mono font-bold block mb-0.5">CORTE (High/Low Pass)</span>
                  <span className="text-gray-200 font-medium">{currentInstrument.freqFocus.cut}</span>
                </div>
                <div className="p-3 bg-[#15191E] border border-[#2A2F36] rounded-lg">
                  <span className="text-[10px] text-cyan-400 font-mono font-bold block mb-0.5">CORPO / PESO</span>
                  <span className="text-gray-200 font-medium">{currentInstrument.freqFocus.body}</span>
                </div>
                <div className="p-3 bg-[#15191E] border border-[#2A2F36] rounded-lg">
                  <span className="text-[10px] text-orange-400 font-mono font-bold block mb-0.5">PRESENÇA / DEFINIÇÃO</span>
                  <span className="text-gray-200 font-medium">{currentInstrument.freqFocus.presence}</span>
                </div>
                <div className="p-3 bg-[#15191E] border border-[#2A2F36] rounded-lg">
                  <span className="text-[10px] text-emerald-400 font-mono font-bold block mb-0.5">AR / PUNCH / TEXTURA</span>
                  <span className="text-gray-200 font-medium">{currentInstrument.freqFocus.airOrPunch}</span>
                </div>
              </div>
            </div>

            {/* COMPRESSION SETTINGS */}
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-orange-400" />
                <span>Calibração de Compressão Dinâmica</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
                <div className="p-2.5 bg-[#15191E] border border-[#2A2F36] rounded-lg">
                  <span className="text-[10px] text-gray-500 block">RATIO</span>
                  <span className="text-white font-bold">{currentInstrument.compressionSettings.ratio}</span>
                </div>
                <div className="p-2.5 bg-[#15191E] border border-[#2A2F36] rounded-lg">
                  <span className="text-[10px] text-gray-500 block">ATTACK</span>
                  <span className="text-white font-bold">{currentInstrument.compressionSettings.attack}</span>
                </div>
                <div className="p-2.5 bg-[#15191E] border border-[#2A2F36] rounded-lg">
                  <span className="text-[10px] text-gray-500 block">RELEASE</span>
                  <span className="text-white font-bold">{currentInstrument.compressionSettings.release}</span>
                </div>
                <div className="p-2.5 bg-[#15191E] border border-[#2A2F36] rounded-lg">
                  <span className="text-[10px] text-gray-500 block">GAIN REDUCTION</span>
                  <span className="text-emerald-400 font-bold">{currentInstrument.compressionSettings.gainReduction}</span>
                </div>
              </div>
            </div>

            {/* DYNAMIC PLUGIN CHAIN SEQUENCE */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Plug className="w-3.5 h-3.5 text-cyan-400" />
                  <span>
                    Cadeia Sequencial: {
                      selectedChainEcosystem === 'flNative' ? 'FL Studio Nativo' :
                      selectedChainEcosystem === 's1Native' ? 'Studio One Nativo' :
                      selectedChainEcosystem === 'waves' ? 'Waves Audio Suite' :
                      selectedChainEcosystem === 'fabfilter' ? 'FabFilter Suite' : 'Cadeia Híbrida de Elite'
                    }
                  </span>
                </h4>
                <button
                  onClick={() => onNavigate('plugins')}
                  className="text-[10px] text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>Ver Todos no Banco de Plugins</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-1.5">
                {currentChain.map((step, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-[#15191E] border border-[#2A2F36] text-xs text-gray-200 font-mono flex items-start gap-2.5 hover:border-cyan-500/30 transition-all">
                    <span className="w-5 h-5 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidechain Tip (If any) */}
            {currentInstrument.sidechainTip && (
              <div className="p-3.5 rounded-lg bg-orange-500/10 border border-orange-500/30 text-xs text-orange-200 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-orange-400 block mb-0.5">Configuração de Sidechain / Ducking:</strong>
                  <span>{currentInstrument.sidechainTip}</span>
                </div>
              </div>
            )}

            {/* Expert Tips */}
            {currentInstrument.expertTips.length > 0 && (
              <div className="p-3.5 rounded-lg bg-amber-500/5 border border-amber-500/20 text-xs space-y-1 text-amber-200">
                <span className="font-bold flex items-center gap-1.5 text-amber-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  Dicas Profissionais de Engenharia de Áudio
                </span>
                {currentInstrument.expertTips.map((tip, idx) => (
                  <p key={idx} className="text-[11px] text-gray-300 leading-relaxed">• {tip}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* GAIN STAGING & BUS ROUTING SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Gain Staging Calculator Widget */}
        <div className="lg:col-span-1 rounded-xl bg-[#15191E] border border-[#2A2F36] p-6 space-y-4 shadow-lg">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Gauge className="w-4 h-4 text-orange-400" />
            <span>Calculadora de Headroom & Gain Staging</span>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed">
            Informe o pico máximo atual do seu canal Master na DAW para calcular a redução necessária:
          </p>

          <div className="p-4 bg-[#0B0E11] border border-[#2A2F36] rounded-lg space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">Pico Máximo no Master</span>
              <span className="font-mono font-bold text-orange-400 text-sm">{gainStagingPeak > 0 ? `+${gainStagingPeak}` : gainStagingPeak} dBFS</span>
            </div>
            <input
              type="range"
              min="-12"
              max="4"
              step="0.5"
              value={gainStagingPeak}
              onChange={(e) => setGainStagingPeak(parseFloat(e.target.value))}
              className="w-full h-2 bg-[#15191E] rounded-lg accent-orange-500 cursor-pointer"
            />
            <div className="flex justify-between text-[9px] font-mono text-gray-500">
              <span>-12 dB (Muito baixo)</span>
              <span>-6 dB (Alvo Perfeito)</span>
              <span>0 dB (Clipping)</span>
            </div>
          </div>

          {/* Diagnosis Result */}
          <div className={`p-4 rounded-lg border text-xs space-y-1.5 ${
            gainStagingPeak > 0 
              ? 'bg-red-500/10 border-red-500/30 text-red-300' 
              : gainStagingPeak > -3 
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
          }`}>
            <div className="font-bold flex items-center gap-1.5">
              {gainStagingPeak > 0 ? (
                <>
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span>Atenção: Mixagem Clipando ({gainStagingPeak} dBFS)!</span>
                </>
              ) : gainStagingPeak > -3 ? (
                <>
                  <Info className="w-4 h-4 text-amber-400" />
                  <span>Pouco Headroom ({gainStagingPeak} dBFS)</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Headroom Perfeito para Masterização ({gainStagingPeak} dBFS)</span>
                </>
              )}
            </div>
            <p className="text-[11px] leading-relaxed text-gray-300">
              {gainStagingPeak > -6 
                ? `Reduza aproximadamente ${(gainStagingPeak - (-6)).toFixed(1)} dB em todas as pistas para deixar -6.0 dBFS de folga livre para o Master.`
                : 'Sua mixagem possui espaço dinâmico suficiente para compressores, EQs analógicos e limiters trabalharem com fidelidade total.'}
            </p>
          </div>
        </div>

        {/* Bus Architecture Guide */}
        <div className="lg:col-span-2 rounded-xl bg-[#15191E] border border-[#2A2F36] p-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Arquitetura de Buses no Mixer (FL Studio & Studio One)</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0B0E11] text-gray-400 border border-[#2A2F36]">
              Roteamento Padrão da Indústria
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-lg bg-[#0B0E11] border border-[#2A2F36] space-y-1">
              <span className="text-xs font-bold text-cyan-400 block">1. VOCAL BUS</span>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Reúne Lead + Backs + Adlibs. Recebe compressão de cola leve (SSL Bus / Fruity Limiter 2:1) e de-essing coletivo.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#0B0E11] border border-[#2A2F36] space-y-1">
              <span className="text-xs font-bold text-orange-400 block">2. DRUM BUS</span>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Reúne Kick + Snare + HiHats + Percs. Recebe Fruity Soft Clipper ou Fat Channel FET para retenção de impacto.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#0B0E11] border border-[#2A2F36] space-y-1">
              <span className="text-xs font-bold text-emerald-400 block">3. INSTRUMENT BUS</span>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Reúne Pianos, Guitarras, Synths. Corte suave Mid/Side em 3kHz para abrir espaço para a voz no centro.
              </p>
            </div>
          </div>

          {/* Interactive Checklist Box */}
          <div className="space-y-2 pt-2 border-t border-[#2A2F36]">
            <span className="text-xs font-bold text-white block">
              Checklist Rápido de Preparação:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {defaultPreparationChecklist.slice(0, 4).map((item) => {
                const isChecked = !!checklist[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleChecklist(item.id)}
                    className={`p-2.5 rounded-lg border flex items-center gap-2 cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                        : 'bg-[#0B0E11] border-[#2A2F36] text-gray-400 hover:text-white'
                    }`}
                  >
                    {isChecked ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> : <Circle className="w-3.5 h-3.5 text-gray-500 shrink-0" />}
                    <span className="text-[11px] truncate">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
