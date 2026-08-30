import React, { useState } from 'react';
import {
  Mic2,
  Sliders,
  Sparkles,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Flame,
  Volume2,
  Radio,
  AudioWaveform,
  Headphones,
  Zap,
  Activity,
  Layers,
  ArrowRight,
  Info,
  Clock,
  Settings,
  ShieldCheck,
  Music,
  Maximize2,
  Cpu,
  HelpCircle,
  Check,
  SlidersHorizontal,
  FolderLock
} from 'lucide-react';
import { NavigationTab, Project } from '../types';
import { VirtualRecordingConsole } from './VirtualRecordingConsole';
import {
  recordingPhasesData,
  recSetupPillarsData,
  micSetupGuides,
  latencyReferenceTable,
  vocalTrackArrangement
} from '../data/vocalRecordingData';

interface VocalRecordingViewProps {
  activeProject: Project | null;
  onNavigate: (tab: NavigationTab) => void;
  onOpenAnalyzer?: () => void;
}

export const VocalRecordingView: React.FC<VocalRecordingViewProps> = ({
  activeProject,
  onNavigate,
  onOpenAnalyzer
}) => {
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>(recordingPhasesData[0].id);
  const [selectedPillarId, setSelectedPillarId] = useState<string>(recSetupPillarsData[0].id);
  const [selectedScenario, setSelectedScenario] = useState<'direct_monitor' | 'software_monitor' | 'low_cpu'>('software_monitor');
  const [activeTabMode, setActiveTabMode] = useState<'rec_setup' | 'phases' | 'latency_calc' | 'gain_stage' | 'mic_guide' | 'arrangement' | 'checklist'>('rec_setup');

  // Interactive Latency Calculator States
  const [calcSampleRate, setCalcSampleRate] = useState<number>(48000);
  const [calcBufferSamples, setCalcBufferSamples] = useState<number>(128);

  // Interactive Gain Staging Simulator State (in dBFS)
  const [simulatedGain, setSimulatedGain] = useState<number>(-14);

  // Session Checklist state
  const defaultChecklistItems = [
    { id: 'chk-bpm', text: 'BPM & Tom definidos corretamente no projeto do FL Studio', phase: 'Fase 1' },
    { id: 'chk-headroom', text: 'Beat atenuado em -5 dB no Mixer para gerar headroom limpo', phase: 'Fase 1' },
    { id: 'chk-markers', text: 'Marcadores de Seção criados na Playlist (Alt + T para Verso/Refrão)', phase: 'Fase 1' },
    { id: 'chk-asio', text: 'Driver ASIO dedicado selecionado nas configurações de áudio (F10)', phase: 'Fase 2' },
    { id: 'chk-buffer-low', text: 'Buffer Size configurado entre 64 ou 128 samples (baixa latência)', phase: 'Fase 2' },
    { id: 'chk-48v', text: 'Phantom Power +48V ligado na interface (se mic condensador)', phase: 'Fase 2' },
    { id: 'chk-popfilter', text: 'Pop Filter posicionado a 15-20cm com cantor alinhado', phase: 'Fase 2' },
    { id: 'chk-gain-test', text: 'Passagem de som: Ganho ajustado com picos entre -18dB e -12dBFS', phase: 'Fase 2' },
    { id: 'chk-rec-in', text: 'Canal REC IN nomeado no mixer com entrada MONO (In 1) selecionada', phase: 'Fase 3' },
    { id: 'chk-no-double-monitor', text: 'Direct Monitoring calibrado para evitar eco ou duplo monitoramento', phase: 'Fase 3' },
    { id: 'chk-rec-fx', text: 'Canal de Reverb/Pitch de conforto criado em envio paralelo (sinal Dry limpo)', phase: 'Fase 4' },
    { id: 'chk-takes', text: 'Gravados pelo menos 3 a 5 takes de Lead Vocal e Dobras na Playlist', phase: 'Fase 5' },
    { id: 'chk-comping', text: 'Comping realizado (seleção das melhores frases com fades suaves nas emendas)', phase: 'Fase 6' },
    { id: 'chk-consolidate', text: 'Takes finais consolidados em WAV contínuo (Ctrl + Alt + C)', phase: 'Fase 7' },
    { id: 'chk-buffer-high', text: 'Buffer Size aumentado para 512 ou 1024 samples para iniciar a Mixagem', phase: 'Fase 7' }
  ];

  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(() => {
    try {
      const saved = localStorage.getItem('melo_vocal_recording_checklist');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleChecklist = (id: string) => {
    const updated = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(updated);
    try {
      localStorage.setItem('melo_vocal_recording_checklist', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / defaultChecklistItems.length) * 100);

  const selectedPhase = recordingPhasesData.find(p => p.id === selectedPhaseId) || recordingPhasesData[0];

  // Calculate live latency ms
  const calculatedLatencyMs = ((calcBufferSamples / calcSampleRate) * 1000).toFixed(2);
  const roundTripEstimateMs = ((calcBufferSamples / calcSampleRate) * 1000 * 2.2).toFixed(2);

  const getLatencyRating = (samples: number) => {
    if (samples <= 128) return { text: 'IDEAL PARA GRAVAÇÃO', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' };
    if (samples === 256) return { text: 'ACEITÁVEL / REGULAR', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' };
    return { text: 'APENAS PARA MIX / MASTER', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' };
  };

  const latencyRating = getLatencyRating(calcBufferSamples);

  // Gain staging evaluation
  const getGainAssessment = (gain: number) => {
    if (gain < -24) return { status: 'MUITO BAIXO', desc: 'Sinal fraco. Você terá que amplificar muito na mix, trazendo ruído elétrico de fundo.', color: 'text-gray-400', barColor: 'bg-gray-500' };
    if (gain >= -24 && gain < -18) return { status: 'MODERADO', desc: 'Sinal seguro, porém poderia ter um pouco mais de ganho para melhor relação sinal-ruído.', color: 'text-blue-400', barColor: 'bg-blue-500' };
    if (gain >= -18 && gain <= -12) return { status: 'SWEET SPOT PERFEITO', desc: 'Faixa ideal da indústria (-18dBFS a -12dBFS). Excelente clareza com bastante headroom contra clipping.', color: 'text-emerald-400', barColor: 'bg-emerald-500' };
    if (gain > -12 && gain <= -3) return { status: 'ALERTA: QUENTE', desc: 'Sinal muito alto. Qualquer grito ou sílaba explosiva do cantor pode clipar a entrada.', color: 'text-yellow-400', barColor: 'bg-yellow-500' };
    return { status: 'CLIPPING DIGITAL (DISTORÇÃO)', desc: 'PERIGO! O conversor A/D da interface está saturando e gerando distorção digital irreversível.', color: 'text-red-400', barColor: 'bg-red-500' };
  };

  const gainAssessment = getGainAssessment(simulatedGain);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Sleek Hardware Top Banner */}
      <div className="rounded-xl bg-[#15191E] border border-[#2A2F36] p-6 shadow-lg relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold font-mono">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                FL STUDIO VOCAL RECORDING WORKFLOW
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-bold">
                DAW TRACKING SUITE
              </span>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Manual Completo de Gravação de Vocal no FL Studio
            </h1>
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
              Guia definitivo e prático para produzir desde a preparação e criação do beat até a calibração de microfones, latência zero, roteamento do mixer, gravação de takes, comping e consolidação para a mixagem.
            </p>
          </div>

          {/* Quick Stats / Active Project Info */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
            <div className="p-3 rounded-lg bg-[#0B0E11] border border-[#2A2F36] min-w-[200px] space-y-1">
              <div className="flex items-center justify-between text-[11px] text-gray-400">
                <span>Checklist de Sessão:</span>
                <span className="text-cyan-400 font-mono font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#1E2329] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-cyan-500 transition-all duration-300 shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-[10px] text-gray-500">{completedCount} de {defaultChecklistItems.length} etapas concluídas</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('vocal_cleaning')}
                className="px-3.5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>Ir para Vocal Cleaning</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Module Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {[
          { id: 'rec_setup', label: 'Configuração de Gravação', icon: SlidersHorizontal, badge: 'NÍVEL 1' },
          { id: 'phases', label: '7 Fases do Fluxo FL Studio', icon: Layers, badge: 'Passo a Passo' },
          { id: 'latency_calc', label: 'Calculadora de Latência / Buffer', icon: Zap },
          { id: 'gain_stage', label: 'Simulador de Ganho (Gain Staging)', icon: Sliders },
          { id: 'mic_guide', label: 'Guia de Microfones & Acústica', icon: Mic2 },
          { id: 'arrangement', label: 'Estrutura de Vozes (Lead / Dobras)', icon: AudioWaveform },
          { id: 'checklist', label: 'Checklist da Sessão', icon: CheckCircle2, badge: `${progressPercent}%` }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTabMode === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTabMode(tab.id as typeof activeTabMode)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.15)]'
                  : 'bg-[#15191E] hover:bg-[#1E2329] text-gray-400 hover:text-gray-200 border border-[#2A2F36]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-gray-400'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                  isActive ? 'bg-cyan-500/30 text-cyan-200' : 'bg-[#0B0E11] text-gray-400 border border-[#2A2F36]'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* MODE 0: NÍVEL 1 - CONFIGURAÇÃO DE GRAVAÇÃO NO FL STUDIO */}
      {activeTabMode === 'rec_setup' && (
        <div className="space-y-6">
          {/* Virtual Hardware Console Strip (Level 1 Tracking Station) */}
          <VirtualRecordingConsole
            activeProject={activeProject}
            onNavigateToCleaning={() => onNavigate('vocal_cleaning')}
          />

          {/* Header Banner Nível 1 */}
          <div className="rounded-xl bg-gradient-to-r from-[#15191E] via-[#16202A] to-[#15191E] border border-cyan-500/40 p-6 shadow-xl relative overflow-hidden space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.5)] flex items-center gap-1">
                    <Radio className="w-3 h-3 text-black animate-pulse" />
                    NÍVEL 1
                  </span>
                  <span className="text-xs font-mono text-cyan-300 font-bold">
                    FL STUDIO RECORDING ENGINE & ZERO LATENCY
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                  Configuração de Gravação: Buffer, Entrada & Pré-Ganho
                </h2>
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                  O Nível 1 é a fundação obrigatória antes de cantar. Ajuste o Buffer ASIO para latência zero (&lt; 3ms), selecione a entrada Mono correta no Mixer para evitar eco/cancelamento de fase e calibre o pré-ganho físico no sweet spot de -18 dBFS.
                </p>
              </div>

              {/* Quick Action Navigation */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={() => setActiveTabMode('latency_calc')}
                  className="px-3.5 py-2 rounded-lg bg-[#0B0E11] hover:bg-[#1E2329] text-cyan-400 border border-cyan-500/30 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Calc de Latência</span>
                </button>
                <button
                  onClick={() => setActiveTabMode('gain_stage')}
                  className="px-3.5 py-2 rounded-lg bg-[#0B0E11] hover:bg-[#1E2329] text-cyan-400 border border-cyan-500/30 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Simulador de Ganho</span>
                </button>
              </div>
            </div>

            {/* 3 Pillar Quick Cards Selector */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              {recSetupPillarsData.map((pillar, idx) => {
                const isSelected = pillar.id === selectedPillarId;
                return (
                  <div
                    key={pillar.id}
                    onClick={() => setSelectedPillarId(pillar.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                      isSelected
                        ? 'bg-[#181E27] border-cyan-400 ring-2 ring-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                        : 'bg-[#0B0E11] border-[#2A2F36] hover:border-gray-600 hover:bg-[#12161C]'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          isSelected ? 'bg-cyan-500 text-black' : 'bg-[#15191E] text-gray-400 border border-[#2A2F36]'
                        }`}>
                          PILAR {idx + 1}
                        </span>
                        <span className="text-[10px] font-mono text-cyan-400 font-bold">{pillar.badge}</span>
                      </div>
                      <h3 className="text-sm font-bold text-white">{pillar.shortTitle}</h3>
                      <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-2">
                        {pillar.summary}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#1E2329] text-[10px] text-gray-400">
                      <span className="font-mono">{pillar.flLocation.split('>')[0]}</span>
                      <span className={`font-bold flex items-center gap-1 ${isSelected ? 'text-cyan-400' : 'text-gray-500'}`}>
                        {isSelected ? 'Explorando' : 'Ver Detalhes'}
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Pillar Comprehensive Exploration */}
          {(() => {
            const currentPillar = recSetupPillarsData.find(p => p.id === selectedPillarId) || recSetupPillarsData[0];
            return (
              <div className="space-y-6 animate-in fade-in duration-150">
                {/* Pillar Header Card */}
                <div className="rounded-xl bg-[#15191E] border border-[#2A2F36] p-6 shadow-lg space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#2A2F36] pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/30">
                          {currentPillar.badge}
                        </span>
                        <span className="text-xs font-mono text-gray-400">
                          Local no FL: <strong className="text-white">{currentPillar.flLocation}</strong>
                        </span>
                      </div>
                      <h3 className="text-xl font-extrabold text-white">{currentPillar.title}</h3>
                      <p className="text-xs text-amber-400 font-mono flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        {currentPillar.importance}
                      </p>
                    </div>
                  </div>

                  {/* 4 Technical Key Parameters Grid */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
                      Parâmetros Críticos de Configuração no FL Studio
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentPillar.keySettings.map((setting, sIdx) => (
                        <div key={sIdx} className="rounded-xl bg-[#0B0E11] border border-[#2A2F36] p-4.5 space-y-2.5">
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs font-bold text-white">{setting.label}</span>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shrink-0">
                              {setting.recommendation}
                            </span>
                          </div>
                          <div className="p-2.5 rounded-lg bg-[#15191E] border border-[#1E2329] text-xs font-mono text-cyan-400 font-bold">
                            {setting.value}
                          </div>
                          <p className="text-xs text-gray-400 leading-relaxed">
                            {setting.explanation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step-by-Step Configuration Steps */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Como Configurar no FL Studio Passo a Passo
                    </h4>
                    <div className="space-y-2">
                      {currentPillar.stepByStep.map((stepText, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3.5 rounded-lg bg-[#0B0E11] border border-[#2A2F36]">
                          <div className="w-5 h-5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </div>
                          <p className="text-xs text-gray-200 leading-relaxed font-medium">
                            {stepText}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pro Tips & Fatal Mistakes Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {/* Pro Tips */}
                    <div className="p-4.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                        <Sparkles className="w-4 h-4" />
                        <span>Dicas Pro de Engenheiro (Melhores Práticas)</span>
                      </div>
                      <ul className="space-y-2 text-xs text-gray-300">
                        {currentPillar.proTips.map((tip, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-2">
                            <span className="text-emerald-400 font-bold">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Fatal Mistakes */}
                    <div className="p-4.5 rounded-xl bg-red-500/10 border border-red-500/30 space-y-2.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-red-400">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Erros Graves que Arruinam a Gravação</span>
                      </div>
                      <ul className="space-y-2 text-xs text-gray-300">
                        {currentPillar.fatalMistakes.map((mistake, mIdx) => (
                          <li key={mIdx} className="flex items-start gap-2">
                            <span className="text-red-400 font-bold">•</span>
                            <span>{mistake}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Interactive Studio Scenario Assistant (Direct Monitor vs Software Monitor vs Low-End PC) */}
          <div className="rounded-xl bg-[#15191E] border border-[#2A2F36] p-6 shadow-lg space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2A2F36] pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-bold">
                  <Headphones className="w-3.5 h-3.5" />
                  ROTEAMENTO DE SESSÃO REAL
                </div>
                <h3 className="text-lg font-bold text-white">
                  Escolha o Seu Cenário de Gravação no FL Studio
                </h3>
                <p className="text-xs text-gray-400">
                  Veja exatamente como ligar os cabos, calibrar o buffer e desativar o eco para a sua configuração de hardware.
                </p>
              </div>

              {/* Scenario Toggles */}
              <div className="flex items-center gap-1.5 p-1 bg-[#0B0E11] rounded-lg border border-[#2A2F36] shrink-0">
                <button
                  onClick={() => setSelectedScenario('software_monitor')}
                  className={`px-3 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    selectedScenario === 'software_monitor'
                      ? 'bg-cyan-500 text-black shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Software FX (Auto-Tune)
                </button>
                <button
                  onClick={() => setSelectedScenario('direct_monitor')}
                  className={`px-3 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    selectedScenario === 'direct_monitor'
                      ? 'bg-cyan-500 text-black shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Direct Monitor (Placa)
                </button>
                <button
                  onClick={() => setSelectedScenario('low_cpu')}
                  className={`px-3 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    selectedScenario === 'low_cpu'
                      ? 'bg-cyan-500 text-black shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  PC Básico / Sem Estalos
                </button>
              </div>
            </div>

            {/* Scenario Detailed Cards */}
            {selectedScenario === 'software_monitor' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 animate-in fade-in">
                <div className="p-4.5 rounded-xl bg-[#0B0E11] border border-[#2A2F36] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-400">1. Buffer & Driver</span>
                    <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded">F10 Audio</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Selecione <strong>ASIO da Interface</strong> com Buffer em <strong>64 ou 128 samples</strong> (latência entre 1.3ms e 2.7ms). Desative o "Triple Buffer" para resposta instantânea.
                  </p>
                </div>

                <div className="p-4.5 rounded-xl bg-[#0B0E11] border border-[#2A2F36] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-400">2. Roteamento no Mixer</span>
                    <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded">F9 Mixer</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Selecione <strong>Mono In 1</strong> no canal REC IN. Envie um cabo auxiliar (Send) para o canal de <strong>Reverb/Pitcher</strong> em 100% Wet. A gravação principal permanece 100% Dry.
                  </p>
                </div>

                <div className="p-4.5 rounded-xl bg-[#0B0E11] border border-[#2A2F36] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-400">3. Anti-Eco & Hardware</span>
                    <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded">Interface Física</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    <strong>DESLIGUE o botão "Direct Monitor"</strong> na sua placa de som física! Como você está ouvindo pelo FL Studio, ligar o Direct Monitor geraria voz dupla com phasing.
                  </p>
                </div>
              </div>
            )}

            {selectedScenario === 'direct_monitor' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 animate-in fade-in">
                <div className="p-4.5 rounded-xl bg-[#0B0E11] border border-[#2A2F36] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400">1. Latência Absoluta Zero</span>
                    <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">0.0 ms Real</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    <strong>LIGUE o botão "Direct Monitor"</strong> na interface física. O sinal do microfone vai direto para o fone sem passar pelo Windows ou pelo processador do computador.
                  </p>
                </div>

                <div className="p-4.5 rounded-xl bg-[#0B0E11] border border-[#2A2F36] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400">2. Desvincular no Mixer</span>
                    <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">Mixer F9</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    No canal "REC IN" do FL Studio, <strong>DESCONECTE o envio para o Master</strong> (clique na seta verde na base do Master). O FL grava o áudio na Playlist sem reproduzir no fone.
                  </p>
                </div>

                <div className="p-4.5 rounded-xl bg-[#0B0E11] border border-[#2A2F36] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400">3. Vantagem & Estabilidade</span>
                    <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">CPU 0%</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Você pode usar qualquer tamanho de buffer (até 512 samples) sem nenhum eco na voz, pois a monitoração é 100% analógica no hardware.
                  </p>
                </div>
              </div>
            )}

            {selectedScenario === 'low_cpu' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 animate-in fade-in">
                <div className="p-4.5 rounded-xl bg-[#0B0E11] border border-[#2A2F36] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400">1. Congelar Beat em WAV</span>
                    <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">Ctrl + Alt + C</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Dê "Quick render as audio clip" nos VSTs pesados (Serum, Kontakt, Omnisphere). Ter o beat como um único arquivo WAV libera 90% da sua CPU para gravação.
                  </p>
                </div>

                <div className="p-4.5 rounded-xl bg-[#0B0E11] border border-[#2A2F36] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400">2. FL Studio ASIO & Safe</span>
                    <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">Buffer 128/256</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Use 128 samples com "Triple Buffer" ativado se sua CPU engasgar. Monitore a caixa "Underruns" para garantir que nenhum estalo entre no take gravado.
                  </p>
                </div>

                <div className="p-4.5 rounded-xl bg-[#0B0E11] border border-[#2A2F36] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400">3. Master 100% Desativado</span>
                    <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">PDC 0ms</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Desative todos os slots de efeitos no canal Master do Mixer. Nunca grave com limitadores ou compressores pesados de masterização ligados.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Quick 4 Golden Rules Summary Card */}
          <div className="rounded-xl bg-[#15191E] border border-cyan-500/30 p-5 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                As 4 Leis do Nível 1 para Gravação Perfeita no FL Studio
              </h4>
              <p className="text-xs text-gray-400">
                1. Buffer ≤ 128 samples • 2. Entrada Mono (In 1) • 3. Ganho no Sweet Spot (-18 dBFS) • 4. Master sem plugins de latência.
              </p>
            </div>

            <button
              onClick={() => setActiveTabMode('phases')}
              className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer shrink-0"
            >
              <span>Ver as 7 Fases do Fluxo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* MODE 1: 7 PHASES STEP-BY-STEP WORKFLOW */}
      {activeTabMode === 'phases' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Phase Selector Sidebar */}
          <div className="lg:col-span-4 space-y-2">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold px-1">
              Roteiro de Gravação no FL Studio
            </p>
            <div className="space-y-1.5">
              {recordingPhasesData.map(phase => {
                const isSelected = phase.id === selectedPhaseId;
                return (
                  <button
                    key={phase.id}
                    onClick={() => setSelectedPhaseId(phase.id)}
                    className={`w-full text-left p-3.5 rounded-lg border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#181D23] border-cyan-500 shadow-md ring-1 ring-cyan-500/30'
                        : 'bg-[#15191E] border-[#2A2F36] hover:border-gray-600 text-gray-400'
                    }`}
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          isSelected ? 'bg-cyan-500 text-black' : 'bg-[#0B0E11] text-gray-400 border border-[#2A2F36]'
                        }`}>
                          FASE {phase.number}
                        </span>
                        <span className="text-xs font-bold text-white truncate">{phase.shortTitle}</span>
                      </div>
                      <p className="text-[11px] text-gray-400 line-clamp-1">{phase.tagline}</p>
                    </div>
                    <ArrowRight className={`w-4 h-4 shrink-0 mt-1 transition-transform ${isSelected ? 'text-cyan-400 translate-x-0.5' : 'text-gray-600'}`} />
                  </button>
                );
              })}
            </div>

            {/* Quick FL Studio Shortcuts Box */}
            <div className="p-4 rounded-xl bg-[#15191E] border border-[#2A2F36] space-y-3 mt-4">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Atalhos Rápidos de Gravação no FL</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded bg-[#0B0E11] border border-[#2A2F36]">
                  <span className="text-gray-400">Armar / Iniciar Gravação</span>
                  <span className="font-mono text-cyan-400 font-bold bg-[#15191E] px-1.5 py-0.5 rounded">R + Barra Espaço</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-[#0B0E11] border border-[#2A2F36]">
                  <span className="text-gray-400">Abrir Configurações Áudio</span>
                  <span className="font-mono text-cyan-400 font-bold bg-[#15191E] px-1.5 py-0.5 rounded">F10</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-[#0B0E11] border border-[#2A2F36]">
                  <span className="text-gray-400">Adicionar Marcador de Tempo</span>
                  <span className="font-mono text-cyan-400 font-bold bg-[#15191E] px-1.5 py-0.5 rounded">Alt + T</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-[#0B0E11] border border-[#2A2F36]">
                  <span className="text-gray-400">Abrir Edison no Canal</span>
                  <span className="font-mono text-cyan-400 font-bold bg-[#15191E] px-1.5 py-0.5 rounded">Ctrl + E</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-[#0B0E11] border border-[#2A2F36]">
                  <span className="text-gray-400">Consolidar Takes Selecionados</span>
                  <span className="font-mono text-cyan-400 font-bold bg-[#15191E] px-1.5 py-0.5 rounded">Ctrl + Alt + C</span>
                </div>
              </div>
            </div>
          </div>

          {/* Phase Detailed Guide View */}
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-xl bg-[#15191E] border border-[#2A2F36] p-6 shadow-lg space-y-6">
              {/* Header of selected phase */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2A2F36] pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                      FASE {selectedPhase.number} DE 7
                    </span>
                    <span className="text-xs font-mono text-gray-400">Menu: {selectedPhase.flMenuLocation}</span>
                  </div>
                  <h2 className="text-xl font-extrabold text-white">{selectedPhase.title}</h2>
                  <p className="text-xs text-gray-400">{selectedPhase.tagline}</p>
                </div>
              </div>

              {/* Step By Step Instructions */}
              <div className="space-y-4">
                {selectedPhase.steps.map(step => (
                  <div key={step.stepNumber} className="rounded-lg bg-[#0B0E11] border border-[#2A2F36] p-4.5 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1E2329] pb-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center text-xs font-mono font-bold">
                          {step.stepNumber}
                        </div>
                        <h3 className="text-sm font-bold text-white">{step.title}</h3>
                      </div>
                      {step.flShortcut && (
                        <span className="text-[11px] font-mono text-cyan-300 bg-[#15191E] px-2 py-0.5 rounded border border-[#2A2F36] font-semibold">
                          {step.flShortcut}
                        </span>
                      )}
                    </div>

                    <div className="p-2.5 rounded bg-[#15191E] border border-[#2A2F36]/60 text-xs font-semibold text-gray-200">
                      {step.action}
                    </div>

                    {/* Detailed bullet instructions */}
                    <div className="space-y-1.5 pt-1">
                      {step.detailedGuide.map((line, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
                          <span className="leading-relaxed">{line}</span>
                        </div>
                      ))}
                    </div>

                    {step.flSettingsTip && (
                      <div className="p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/20 flex items-start gap-2.5 text-xs text-cyan-300">
                        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold text-white block mb-0.5">Dica de Configuração no FL Studio:</strong>
                          <span className="text-gray-300">{step.flSettingsTip}</span>
                        </div>
                      </div>
                    )}

                    {step.warning && (
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-300">
                        <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold text-red-200 block mb-0.5">Aviso Crítico:</strong>
                          <span>{step.warning}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Pro Tips & Mistakes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-lg bg-[#0B0E11] border border-emerald-500/20 space-y-2">
                  <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Dicas Pro de Engenheiro de Estúdio</span>
                  </h4>
                  <ul className="space-y-1.5 text-[11px] text-gray-300">
                    {selectedPhase.proTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-[#0B0E11] border border-red-500/20 space-y-2">
                  <h4 className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    <span>Erros Comuns a Evitar</span>
                  </h4>
                  <ul className="space-y-1.5 text-[11px] text-gray-300">
                    {selectedPhase.commonMistakes.map((mistake, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-red-400 font-bold">•</span>
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom navigation between phases */}
              <div className="flex items-center justify-between pt-4 border-t border-[#2A2F36]">
                <button
                  disabled={selectedPhase.number === 1}
                  onClick={() => {
                    const prev = recordingPhasesData[selectedPhase.number - 2];
                    if (prev) setSelectedPhaseId(prev.id);
                  }}
                  className="px-4 py-2 rounded-lg bg-[#0B0E11] hover:bg-[#1E2329] border border-[#2A2F36] text-xs font-semibold text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  &larr; Fase Anterior
                </button>

                <span className="text-xs font-mono text-gray-500">
                  {selectedPhase.number} / {recordingPhasesData.length}
                </span>

                <button
                  disabled={selectedPhase.number === recordingPhasesData.length}
                  onClick={() => {
                    const next = recordingPhasesData[selectedPhase.number];
                    if (next) setSelectedPhaseId(next.id);
                  }}
                  className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-md flex items-center gap-1.5"
                >
                  <span>Próxima Fase</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: LATENCY & BUFFER CALCULATOR */}
      {activeTabMode === 'latency_calc' && (
        <div className="space-y-6">
          <div className="rounded-xl bg-[#15191E] border border-[#2A2F36] p-6 shadow-lg space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-bold">
                <Zap className="w-3.5 h-3.5" />
                CALIBRADOR DE BUFFER & LATÊNCIA FL STUDIO
              </div>
              <h2 className="text-xl font-extrabold text-white">Calculadora Interativa de Latência ASIO</h2>
              <p className="text-xs text-gray-400">
                Ajuste o tamanho do buffer e taxa de amostragem para ver o atraso em milissegundos e saber a configuração perfeita para gravar ou mixar.
              </p>
            </div>

            {/* Interactive Controller */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sample Rate Selector */}
              <div className="p-4 rounded-lg bg-[#0B0E11] border border-[#2A2F36] space-y-3">
                <label className="text-xs font-bold text-gray-300 block">Taxa de Amostragem (Sample Rate)</label>
                <div className="grid grid-cols-3 gap-2">
                  {[44100, 48000, 96000].map(sr => (
                    <button
                      key={sr}
                      onClick={() => setCalcSampleRate(sr)}
                      className={`py-2 px-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        calcSampleRate === sr
                          ? 'bg-cyan-500 text-black shadow-md'
                          : 'bg-[#15191E] text-gray-400 border border-[#2A2F36] hover:text-white'
                      }`}
                    >
                      {sr === 44100 ? '44.1 kHz' : sr === 48000 ? '48.0 kHz' : '96.0 kHz'}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Padrão atual: 48 kHz para streaming moderno e vídeos, ou 44.1 kHz para distribuição em CD/Áudio padrão.
                </p>
              </div>

              {/* Buffer Size Selector */}
              <div className="p-4 rounded-lg bg-[#0B0E11] border border-[#2A2F36] space-y-3">
                <label className="text-xs font-bold text-gray-300 block">Tamanho do Buffer (Samples)</label>
                <div className="grid grid-cols-3 gap-2">
                  {[64, 128, 256, 512, 1024].map(s => (
                    <button
                      key={s}
                      onClick={() => setCalcBufferSamples(s)}
                      className={`py-2 px-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        calcBufferSamples === s
                          ? 'bg-cyan-500 text-black shadow-md'
                          : 'bg-[#15191E] text-gray-400 border border-[#2A2F36] hover:text-white'
                      }`}
                    >
                      {s} smp
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Definido no FL Studio em: Options (F10) &gt; Audio &gt; Buffer Length.
                </p>
              </div>

              {/* Real-time Calculation Result Display */}
              <div className={`p-4 rounded-lg border space-y-2 flex flex-col justify-between ${latencyRating.bg} ${latencyRating.border}`}>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-gray-400">Latência Unilateral / Ida & Volta</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold font-mono text-white">{calculatedLatencyMs} ms</span>
                    <span className="text-xs font-mono text-gray-400">(~{roundTripEstimateMs}ms RTL)</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className={`text-xs font-bold font-mono ${latencyRating.color}`}>
                    ● {latencyRating.text}
                  </span>
                  <p className="text-[11px] text-gray-300 leading-relaxed">
                    {calcBufferSamples <= 128
                      ? 'Excelente para gravação. O vocalista cantará no tempo sem nenhum eco perceptível no fone.'
                      : calcBufferSamples === 256
                      ? 'Razoável se o computador for mais fraco. Quase imperceptível com fones abertos.'
                      : 'NÃO grave voz neste valor! Use apenas para a fase de mixagem e masterização com muitos plugins.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Reference Table */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Tabela Comparativa de Latência & Uso Recomendado</span>
              </h3>

              <div className="overflow-x-auto rounded-lg border border-[#2A2F36]">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#0B0E11] text-gray-400 font-mono text-[11px] border-b border-[#2A2F36]">
                    <tr>
                      <th className="p-3">Buffer (Samples)</th>
                      <th className="p-3">Latência @ 44.1 kHz</th>
                      <th className="p-3">Latência @ 48 kHz</th>
                      <th className="p-3">Finalidade Recomendada</th>
                      <th className="p-3">Carga na CPU</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2A2F36] bg-[#15191E]">
                    {latencyReferenceTable.map(row => (
                      <tr key={row.bufferSamples} className={row.bufferSamples === calcBufferSamples ? 'bg-cyan-500/10' : ''}>
                        <td className="p-3 font-mono font-bold text-white">{row.bufferSamples} samples</td>
                        <td className="p-3 font-mono text-cyan-400">{row.latencyAt44k}</td>
                        <td className="p-3 font-mono text-cyan-300">{row.latencyAt48k}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                            row.idealUse === 'GRAVAÇÃO IDEAL'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : row.idealUse === 'GRAVAÇÃO ACEITÁVEL'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-orange-500/20 text-orange-400'
                          }`}>
                            {row.idealUse}
                          </span>
                        </td>
                        <td className="p-3 text-gray-400">{row.cpuLoad}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: GAIN STAGING SIMULATOR */}
      {activeTabMode === 'gain_stage' && (
        <div className="space-y-6">
          <div className="rounded-xl bg-[#15191E] border border-[#2A2F36] p-6 shadow-lg space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-bold">
                <Sliders className="w-3.5 h-3.5" />
                SIMULADOR DE GANHO DE ENTRADA (GAIN STAGING)
              </div>
              <h2 className="text-xl font-extrabold text-white">Medição Correta de Microfone no FL Studio</h2>
              <p className="text-xs text-gray-400">
                Arraste o medidor para entender onde o sinal vocal deve bater na régua do mixer para evitar ruído e clipping digital.
              </p>
            </div>

            {/* Visual DAW Metering Bar */}
            <div className="p-6 rounded-xl bg-[#0B0E11] border border-[#2A2F36] space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-300">Medidor de Nível do Canal REC IN (dBFS)</span>
                <span className={`text-sm font-mono font-extrabold px-3 py-1 rounded ${gainAssessment.color} bg-[#15191E] border border-[#2A2F36]`}>
                  {simulatedGain} dBFS
                </span>
              </div>

              {/* Realistic VU / Peak Bar */}
              <div className="space-y-2">
                <div className="h-8 rounded-lg bg-[#15191E] border border-[#2A2F36] overflow-hidden p-1 flex items-center relative">
                  {/* Target Sweet Spot Highlight Box */}
                  <div 
                    className="absolute top-0 bottom-0 bg-emerald-500/20 border-x border-emerald-500/50 pointer-events-none z-10"
                    style={{ left: '50%', width: '25%' }}
                    title="Sweet Spot (-18dB a -12dB)"
                  />
                  
                  {/* Active Meter Fill */}
                  <div 
                    className={`h-full rounded transition-all duration-150 ${gainAssessment.barColor} shadow-md`}
                    style={{ width: `${Math.max(5, Math.min(100, ((simulatedGain + 36) / 36) * 100))}%` }}
                  />
                </div>

                {/* Scale Markings */}
                <div className="flex justify-between text-[10px] font-mono text-gray-500 px-1">
                  <span>-36 dB</span>
                  <span>-24 dB</span>
                  <span className="text-emerald-400 font-bold">-18 dB (Sweet Spot)</span>
                  <span className="text-emerald-400 font-bold">-12 dB</span>
                  <span className="text-yellow-400">-6 dB</span>
                  <span className="text-red-400 font-bold">0 dBFS (Clip)</span>
                </div>
              </div>

              {/* Slider Controller */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Simular Ganho do Pré da Interface:</span>
                  <span className="font-mono text-white">{simulatedGain} dBFS</span>
                </div>
                <input
                  type="range"
                  min="-36"
                  max="0"
                  step="1"
                  value={simulatedGain}
                  onChange={(e) => setSimulatedGain(parseInt(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer h-2 bg-[#1E2329] rounded-lg"
                />
              </div>

              {/* Evaluation Card */}
              <div className="p-4 rounded-lg bg-[#15191E] border border-[#2A2F36] space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${gainAssessment.color} bg-[#0B0E11]`}>
                    STATUS: {gainAssessment.status}
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {gainAssessment.desc}
                </p>
              </div>
            </div>

            {/* 3 Golden Rules of Vocal Gain Staging */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-[#0B0E11] border border-[#2A2F36] space-y-2">
                <div className="text-xs font-bold text-cyan-400 font-mono">Regra 1: Resolução de 24-bit</div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Em 24-bit você tem 144 dB de faixa dinâmica. Não é necessário gravar perto de 0 dB como na era das fitas analógicas antigas.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-[#0B0E11] border border-[#2A2F36] space-y-2">
                <div className="text-xs font-bold text-emerald-400 font-mono">Regra 2: Picos em -12 dBFS</div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Deixe o cantor dar o grito mais alto da música. Se o pico máximo bater em -12 dB ou -10 dB, você nunca terá distorção indesejada.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-[#0B0E11] border border-[#2A2F36] space-y-2">
                <div className="text-xs font-bold text-orange-400 font-mono">Regra 3: Calibração de Fone</div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Se o cantor pedir para aumentar a voz dele no fone, NUNCA aumente o ganho do pré da interface! Aumente o fader de monitoramento ou o botão de fone físico.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 4: MICROPHONE GUIDES & ACOUSTICS */}
      {activeTabMode === 'mic_guide' && (
        <div className="space-y-6">
          <div className="rounded-xl bg-[#15191E] border border-[#2A2F36] p-6 shadow-lg space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-bold">
                <Mic2 className="w-3.5 h-3.5" />
                MICROFONES, DISTÂNCIA & AMBIENTE
              </div>
              <h2 className="text-xl font-extrabold text-white">Guia de Microfones & Posicionamento de Estúdio</h2>
              <p className="text-xs text-gray-400">
                Como posicionar o microfone, usar o pop filter e tirar a máxima qualidade sonora de cada tipo de cápsula.
              </p>
            </div>

            {/* Microphones Comparison Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {micSetupGuides.map(mic => (
                <div key={mic.id} className="rounded-xl bg-[#0B0E11] border border-[#2A2F36] p-5 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          {mic.type}
                        </span>
                        {mic.phantomPower && (
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse">
                            +48V OBRIGATÓRIO
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-extrabold text-white mt-1">{mic.name}</h3>
                      <p className="text-xs text-gray-400">{mic.bestFor}</p>
                    </div>

                    <div className="space-y-2 text-xs bg-[#15191E] p-3 rounded-lg border border-[#2A2F36]/60">
                      <div>
                        <span className="text-gray-400 text-[11px] block">Distância Recomendada:</span>
                        <span className="font-mono text-cyan-400 font-bold">{mic.idealDistance}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 text-[11px] block">Padrão Polar:</span>
                        <span className="font-mono text-gray-200">{mic.polarPattern}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 text-[11px] block">Ponto Doce de Ganho:</span>
                        <span className="font-mono text-emerald-400 font-bold">{mic.gainSweetSpot}</span>
                      </div>
                    </div>

                    {/* Studio Tips */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-bold text-gray-300 block">Dicas de Estúdio:</span>
                      {mic.studioTips.map((tip, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-[11px] text-gray-400">
                          <span className="text-cyan-400 font-bold">•</span>
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Acoustic Treatment Tips for Bedroom Recording */}
            <div className="rounded-xl bg-[#0B0E11] border border-[#2A2F36] p-6 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Como Gravar Vocal Limpo em Quarto / Home Studio Não Tratado</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-300">
                <div className="p-3.5 rounded-lg bg-[#15191E] border border-[#2A2F36] space-y-1.5">
                  <span className="text-cyan-400 font-bold block">1. Fique de costas para o guarda-roupa</span>
                  <p className="text-gray-400 leading-relaxed">
                    Abra as portas do guarda-roupa cheio de roupas e cante de costas para ele. O microfone cardioide rejeita o som traseiro e as roupas absorvem as reflexões da voz.
                  </p>
                </div>
                <div className="p-3.5 rounded-lg bg-[#15191E] border border-[#2A2F36] space-y-1.5">
                  <span className="text-emerald-400 font-bold block">2. Evite o centro e os cantos exatos</span>
                  <p className="text-gray-400 leading-relaxed">
                    O centro geométrico de um quarto quadrado cria ondas estacionárias de cancelamento de fase. Cantos acumulam graves estrondosos (boomy bass).
                  </p>
                </div>
                <div className="p-3.5 rounded-lg bg-[#15191E] border border-[#2A2F36] space-y-1.5">
                  <span className="text-orange-400 font-bold block">3. O truque do edredom / cobertor</span>
                  <p className="text-gray-400 leading-relaxed">
                    Pendure um edredom grosso ou cobertor atrás da cabeça do cantor para matar a reverberação primária da parede que voltaria para a frente do microfone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 5: VOCAL TRACK ARRANGEMENT */}
      {activeTabMode === 'arrangement' && (
        <div className="space-y-6">
          <div className="rounded-xl bg-[#15191E] border border-[#2A2F36] p-6 shadow-lg space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-bold">
                <AudioWaveform className="w-3.5 h-3.5" />
                ESTRUTURA DE FAIXAS & PANNING VOCAL
              </div>
              <h2 className="text-xl font-extrabold text-white">Como Gravar e Posicionar Todas as Camadas de Voz</h2>
              <p className="text-xs text-gray-400">
                Uma produção vocal profissional de alto nível é feita em camadas (Lead, Dobras, Harmonias, Ad-libs). Veja o posicionamento estéreo ideal.
              </p>
            </div>

            {/* Visual Stereo Placement Table */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vocalTrackArrangement.map((track, idx) => (
                <div key={idx} className="rounded-xl bg-[#0B0E11] border border-[#2A2F36] p-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-[#1E2329] pb-2.5">
                    <span className="text-xs font-bold text-cyan-400 font-mono">{track.role}</span>
                    <span className="text-[11px] font-mono text-gray-400 bg-[#15191E] px-2 py-0.5 rounded border border-[#2A2F36]">
                      {track.panPosition}
                    </span>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed">{track.description}</p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                    <div className="p-2 rounded bg-[#15191E] border border-[#2A2F36]">
                      <span className="text-gray-500 block text-[10px]">Volume no Mixer:</span>
                      <span className="font-mono text-emerald-400 font-bold">{track.faderBalance}</span>
                    </div>
                    <div className="p-2 rounded bg-[#15191E] border border-[#2A2F36]">
                      <span className="text-gray-500 block text-[10px]">Foco Tonal / EQ:</span>
                      <span className="font-mono text-gray-200">{track.eqFocus}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Vocal Bus Signal Flow Diagram */}
            <div className="rounded-xl bg-[#0B0E11] border border-[#2A2F36] p-6 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Fluxo de Roteamento de Vozes no Mixer do FL Studio</span>
              </h3>
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-mono">
                <div className="p-3 rounded-lg bg-[#15191E] border border-cyan-500/30 text-center w-full">
                  <span className="text-cyan-400 font-bold block">1. LEAD VOX</span>
                  <span className="text-[10px] text-gray-400">Insert 15 (Mono)</span>
                </div>
                <span className="text-gray-500 hidden md:inline">&rarr;</span>
                <div className="p-3 rounded-lg bg-[#15191E] border border-cyan-500/30 text-center w-full">
                  <span className="text-cyan-400 font-bold block">2. DOUBLES L/R</span>
                  <span className="text-[10px] text-gray-400">Insert 16 (Stereo)</span>
                </div>
                <span className="text-gray-500 hidden md:inline">&rarr;</span>
                <div className="p-3 rounded-lg bg-[#15191E] border border-cyan-500/30 text-center w-full">
                  <span className="text-cyan-400 font-bold block">3. HARMONIAS / AD-LIBS</span>
                  <span className="text-[10px] text-gray-400">Insert 17 / 18</span>
                </div>
                <span className="text-gray-500 hidden md:inline">&rarr;</span>
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/40 text-center w-full">
                  <span className="text-emerald-400 font-bold block">VOCAL BUS (BUS 20)</span>
                  <span className="text-[10px] text-emerald-300">Glue / Saturation / Limiter</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 6: INTERACTIVE CHECKLIST */}
      {activeTabMode === 'checklist' && (
        <div className="space-y-6">
          <div className="rounded-xl bg-[#15191E] border border-[#2A2F36] p-6 shadow-lg space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  CHECKLIST DE SESSÃO FL STUDIO
                </div>
                <h2 className="text-xl font-extrabold text-white">Checklist de Gravação Salvo Localmente</h2>
                <p className="text-xs text-gray-400">
                  Marque cada etapa da sua sessão. O progresso é gravado de forma 100% offline no seu navegador.
                </p>
              </div>

              <button
                onClick={() => {
                  if (confirm('Deseja limpar todo o checklist desta sessão?')) {
                    setCheckedItems({});
                    localStorage.removeItem('melo_vocal_recording_checklist');
                  }
                }}
                className="px-3 py-1.5 rounded-lg bg-[#0B0E11] hover:bg-[#1E2329] border border-[#2A2F36] text-xs font-semibold text-gray-400 hover:text-white transition-colors cursor-pointer self-start"
              >
                Limpar Checklist
              </button>
            </div>

            {/* Checklist Items */}
            <div className="space-y-2">
              {defaultChecklistItems.map(item => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleChecklist(item.id)}
                    className={`flex items-center justify-between p-3.5 rounded-lg border transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-gray-200'
                        : 'bg-[#0B0E11] border-[#2A2F36] hover:border-gray-500 text-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${
                        isChecked ? 'bg-emerald-500 text-black' : 'border border-gray-600 bg-[#15191E]'
                      }`}>
                        {isChecked ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3 h-3 text-transparent" />}
                      </div>
                      <span className={`text-xs font-medium leading-relaxed ${isChecked ? 'line-through text-gray-400' : 'text-gray-200'}`}>
                        {item.text}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#15191E] text-cyan-400 border border-[#2A2F36] shrink-0 ml-3">
                      {item.phase}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Completion Prompt */}
            {progressPercent === 100 && (
              <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in">
                <div className="space-y-1">
                  <h3 className="text-sm font-extrabold text-emerald-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    Sessão de Gravação Concluída com Sucesso!
                  </h3>
                  <p className="text-xs text-gray-300">
                    Seus áudios estão consolidados e prontos para limpeza espectral, afinação fina e equalização.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('vocal_cleaning')}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-black font-bold text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer shrink-0"
                >
                  <span>Avançar para Vocal Cleaning</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
