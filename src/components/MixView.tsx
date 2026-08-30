import React, { useState } from 'react';
import { Project, NavigationTab } from '../types';
import { CheckCircle2, Circle, Sliders, AlertTriangle, ArrowRight, Gauge, Layers, Info, Sparkles, Volume2 } from 'lucide-react';
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

export const MixView: React.FC<MixViewProps> = ({
  activeProject,
  onUpdateProject,
  onNavigate
}) => {
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'VOCAL' | 'DRUMS' | 'BAIXO' | 'INSTRUMENTOS'>('VOCAL');
  const [selectedInstrumentId, setSelectedInstrumentId] = useState<string>('vocal-principal');
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

  const filteredInstruments = activeCategory === 'ALL'
    ? instrumentsData
    : instrumentsData.filter(inst => inst.category === activeCategory);

  const currentInstrument = instrumentsData.find(i => i.id === selectedInstrumentId) || instrumentsData[0];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* SECTION 4.1: PREPARAÇÃO & PROGRESSO DA MIXAGEM */}
      <div className="rounded-xl bg-[#15191E] border border-[#2A2F36] p-6 shadow-lg space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2A2F36] pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold mb-2">
              <Sliders className="w-3.5 h-3.5" />
              ETAPA 4.1 — PREPARAÇÃO DO PROJETO
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-white">
              Checklist de Preparação & Gain Staging
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Uma boa mixagem começa com 80% de organização e gain staging antes de tocar em qualquer equalizador.
            </p>
          </div>

          {/* PROGRESSO DA MIXAGEM 0% -> 100% Indicator */}
          <div className="p-4 rounded-lg bg-[#0B0E11] border border-[#2A2F36] shrink-0 min-w-[240px]">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-gray-400 uppercase tracking-wider text-[10px]">
                PROGRESSO DA MIXAGEM
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
              <span>{progressPercent === 100 ? '🎉 Pronto para Master' : 'Em progresso'}</span>
            </div>
          </div>
        </div>

        {/* Interactive Checklist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {defaultPreparationChecklist.map((item) => {
            const isChecked = !!checklist[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleChecklist(item.id)}
                className={`p-3.5 rounded-lg border flex items-start gap-3 cursor-pointer select-none transition-all ${
                  isChecked
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-white'
                    : 'bg-[#0B0E11] border-[#2A2F36] text-gray-300 hover:border-cyan-500/40 hover:bg-[#15191E]'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isChecked ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Circle className="w-4 h-4 text-gray-500" />
                  )}
                </div>
                <div className="min-w-0">
                  <span className={`text-xs font-semibold block leading-relaxed ${
                    isChecked ? 'line-through text-gray-400' : 'text-white'
                  }`}>
                    {item.label}
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono mt-0.5 block">
                    {item.category}
                  </span>
                </div>
              </div>
            );
          })}
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
            Informe o pico máximo atual do seu canal Master no FL Studio para calcular a redução necessária:
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

        {/* FL Studio Buses Architecture */}
        <div className="lg:col-span-2 rounded-xl bg-[#15191E] border border-[#2A2F36] p-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Arquitetura de Buses no FL Studio Mixer</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0B0E11] text-gray-400 border border-[#2A2F36]">
              Roteamento Padrão da Indústria
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-lg bg-[#0B0E11] border border-[#2A2F36] space-y-1">
              <span className="text-xs font-bold text-cyan-400 block">1. VOCAL BUS</span>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Reúne Lead + Backs + Adlibs. Recebe compressão de cola leve (Fruity Limiter 2:1) e de-essing sutil.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#0B0E11] border border-[#2A2F36] space-y-1">
              <span className="text-xs font-bold text-orange-400 block">2. DRUM BUS</span>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Reúne Kick + Snare + HiHats + Percs. Recebe Fruity Soft Clipper para controle de transientes.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#0B0E11] border border-[#2A2F36] space-y-1">
              <span className="text-xs font-bold text-emerald-400 block">3. MUSIC / INSTRUMENT BUS</span>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Reúne Pianos, Guitarras, Synths. Corte suave em 3kHz para abrir espaço para o vocal no centro.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#0B0E11] border border-[#2A2F36] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-gray-300">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Precisa tratar problemas específicos de voz (ruído, estridência, falta de ar)?</span>
            </div>
            <button
              onClick={() => onNavigate('vocal_cleaning')}
              className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-colors shrink-0 flex items-center gap-1 cursor-pointer shadow-[0_0_8px_rgba(6,182,212,0.3)]"
            >
              <span>Abrir Vocal Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 5: SISTEMA DE TIPOS DE ELEMENTOS & CADEIAS RECOMENDADAS */}
      <div className="rounded-xl bg-[#15191E] border border-[#2A2F36] p-6 shadow-lg space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2A2F36] pb-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block mb-1">
              SEÇÃO 5 — GUIA POR ELEMENTO DE MIX
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-white">
              Cadeia de Tratamento por Instrumento
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Selecione qualquer elemento para visualizar frequências críticas, compressão recomendada, saturação e cadeia no FL Studio.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-lg bg-[#0B0E11] border border-[#2A2F36]">
            {(['ALL', 'VOCAL', 'DRUMS', 'BAIXO', 'INSTRUMENTOS'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Selector & Detailed Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Instrument List Selector */}
          <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
            {filteredInstruments.map((inst) => {
              const isSelected = inst.id === selectedInstrumentId;
              return (
                <div
                  key={inst.id}
                  onClick={() => setSelectedInstrumentId(inst.id)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-cyan-500/10 border-cyan-500 text-white shadow-[0_0_10px_rgba(6,182,212,0.15)]'
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
                      {inst.category}
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
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2A2F36] pb-4">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider">
                  Configuração Recomendada
                </span>
                <h3 className="text-xl font-extrabold text-white">{currentInstrument.name}</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-1 rounded-lg bg-[#15191E] border border-[#2A2F36] text-gray-300 font-mono">
                  Panorama: {currentInstrument.stereoPlacement}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-lg bg-orange-500/10 text-orange-300 border border-orange-500/30 font-mono">
                  Saturação: {currentInstrument.saturationRec}
                </span>
              </div>
            </div>

            {/* Frequency Focus Grid */}
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
                Frequências Críticas (Equalização no Fruity Parametric EQ 2)
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

            {/* Compression Settings */}
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
                Parâmetros Iniciais de Compressão (Fruity Limiter / Compressor)
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

            {/* Recommended Plugin Chain Sequence */}
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
                Cadeia de Plugins Recomendada (Ordem no Mixer do FL Studio)
              </h4>
              <div className="space-y-1.5">
                {currentInstrument.flPluginChain.map((step, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-[#15191E] border border-[#2A2F36] text-xs text-gray-200 font-mono flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Expert Tips */}
            {currentInstrument.expertTips.length > 0 && (
              <div className="p-3.5 rounded-lg bg-amber-500/5 border border-amber-500/20 text-xs space-y-1 text-amber-200">
                <span className="font-bold flex items-center gap-1.5 text-amber-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  Dica de Engenharia de Áudio
                </span>
                {currentInstrument.expertTips.map((tip, idx) => (
                  <p key={idx} className="text-[11px] text-gray-300 leading-relaxed">• {tip}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

