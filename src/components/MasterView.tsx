import React, { useState } from 'react';
import { masterStepsData, referenceMetersGuide, MasterStep } from '../data/masterChainData';
import { Flame, Activity, ShieldCheck, Zap, Info, Sparkles, ChevronRight, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { PluginEcosystem, NavigationTab } from '../types';

interface MasterViewProps {
  onNavigate: (tab: NavigationTab) => void;
  onOpenAnalyzer: () => void;
}

export const MasterView: React.FC<MasterViewProps> = ({ onNavigate, onOpenAnalyzer }) => {
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(0);
  const [activeEcosystem, setActiveEcosystem] = useState<PluginEcosystem>('NATIVE_FL');

  const currentStep = masterStepsData[selectedStepIndex];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="rounded-xl bg-[#15191E] border border-[#2A2F36] p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30 text-xs font-bold">
              <Flame className="w-3.5 h-3.5" />
              NÍVEL 2 — MASTERIZAÇÃO PROFISSIONAL
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              Cadeia de Masterização (8 Etapas)
            </h1>
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
              O caminho sequencial exato para atingir volume comercial, clareza cirúrgica e preservação de dinâmica sem distorção.
            </p>
          </div>

          {/* Ecosystem Switcher */}
          <div className="p-1 rounded-lg bg-[#0B0E11] border border-[#2A2F36] flex gap-1 shrink-0">
            <button
              onClick={() => setActiveEcosystem('NATIVE_FL')}
              className={`px-3 py-2 rounded-md text-xs font-bold transition-all ${
                activeEcosystem === 'NATIVE_FL'
                  ? 'bg-orange-600 text-white shadow-[0_0_10px_rgba(249,115,22,0.4)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Nativo FL Studio
            </button>
            <button
              onClick={() => setActiveEcosystem('FABFILTER')}
              className={`px-3 py-2 rounded-md text-xs font-bold transition-all ${
                activeEcosystem === 'FABFILTER'
                  ? 'bg-cyan-600 text-white shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              FabFilter Suíte
            </button>
            <button
              onClick={() => setActiveEcosystem('FREE')}
              className={`px-3 py-2 rounded-md text-xs font-bold transition-all ${
                activeEcosystem === 'FREE'
                  ? 'bg-emerald-600 text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Plugins Gratuitos
            </button>
          </div>
        </div>
      </div>

      {/* HORIZONTAL 8-STEP VISUAL CHAIN */}
      <div className="rounded-xl bg-[#15191E] border border-[#2A2F36] p-5 md:p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Fluxo Sequencial do Canal Master (Clique para inspecionar parâmetros)
          </span>
          <span className="text-xs text-gray-500 font-mono">
            Ordem: 1 → 8
          </span>
        </div>

        {/* Horizontal Chain Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {masterStepsData.map((step, idx) => {
            const isSelected = selectedStepIndex === idx;
            const pluginName = activeEcosystem === 'NATIVE_FL'
              ? step.nativePlugin
              : activeEcosystem === 'FABFILTER'
              ? step.fabFilterPlugin
              : step.freePlugin;

            return (
              <div
                key={step.position}
                onClick={() => setSelectedStepIndex(idx)}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-all flex flex-col justify-between min-h-[110px] ${
                  isSelected
                    ? 'bg-orange-500/15 border-orange-500 text-white shadow-[0_0_12px_rgba(249,115,22,0.2)]'
                    : 'bg-[#0B0E11] border-[#2A2F36] text-gray-300 hover:border-orange-500/40 hover:bg-[#15191E]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="w-5 h-5 rounded bg-[#15191E] text-gray-300 border border-[#2A2F36] text-[10px] font-mono font-bold flex items-center justify-center">
                      {step.position}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_6px_rgba(249,115,22,0.9)] animate-pulse" />
                    )}
                  </div>
                  <span className="text-xs font-bold block leading-tight">{step.shortName}</span>
                </div>

                <div className="mt-2 pt-2 border-t border-[#2A2F36]">
                  <span className="text-[10px] font-mono text-gray-400 block truncate" title={pluginName}>
                    {pluginName}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* INSPECTOR PANEL FOR SELECTED STEP */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Step Deep Dive */}
        <div className="lg:col-span-2 rounded-xl bg-[#15191E] border border-[#2A2F36] p-6 md:p-7 space-y-6 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2A2F36] pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                Etapa {currentStep.position} de 8 no Master
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-1">{currentStep.name}</h2>
            </div>

            <div className="px-3 py-1.5 rounded-lg bg-[#0B0E11] border border-[#2A2F36] text-xs font-mono text-cyan-400 font-bold">
              {activeEcosystem === 'NATIVE_FL' ? 'Nativo: ' : activeEcosystem === 'FABFILTER' ? 'FabFilter: ' : 'Free: '}
              {activeEcosystem === 'NATIVE_FL'
                ? currentStep.nativePlugin
                : activeEcosystem === 'FABFILTER'
                ? currentStep.fabFilterPlugin
                : currentStep.freePlugin}
            </div>
          </div>

          {/* Function Description */}
          <div className="p-4 rounded-lg bg-[#0B0E11] border border-[#2A2F36] space-y-1 text-xs">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Função Técnica</span>
            <p className="text-gray-200 leading-relaxed text-sm">{currentStep.functionDesc}</p>
          </div>

          {/* Suggested Action */}
          <div className="p-4 rounded-lg bg-[#0B0E11] border border-[#2A2F36] space-y-1.5 text-xs">
            <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              Ação Prática Sugerida no FL Studio
            </span>
            <p className="text-gray-200 leading-relaxed">{currentStep.suggestedAction}</p>
          </div>

          {/* Important Engineering Note */}
          <div className="p-4 rounded-lg bg-orange-500/5 border border-orange-500/20 text-xs space-y-1">
            <span className="font-bold text-orange-400 flex items-center gap-1.5">
              <Info className="w-4 h-4" />
              Alerta de Masterização Crítico
            </span>
            <p className="text-gray-300 leading-relaxed text-[11px]">
              {currentStep.importantNote}
            </p>
          </div>

          {/* Step Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              disabled={selectedStepIndex === 0}
              onClick={() => setSelectedStepIndex(prev => Math.max(0, prev - 1))}
              className="px-4 py-2 rounded-lg bg-[#0B0E11] hover:bg-[#1E2329] border border-[#2A2F36] disabled:opacity-30 text-xs font-semibold text-white transition-colors cursor-pointer"
            >
              ← Etapa Anterior
            </button>
            <span className="text-xs text-gray-500 font-mono">
              {selectedStepIndex + 1} / 8
            </span>
            <button
              disabled={selectedStepIndex === masterStepsData.length - 1}
              onClick={() => setSelectedStepIndex(prev => Math.min(masterStepsData.length - 1, prev + 1))}
              className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 disabled:opacity-30 text-xs font-bold text-white transition-colors flex items-center gap-1 cursor-pointer shadow-[0_0_10px_rgba(249,115,22,0.3)]"
            >
              <span>Próxima Etapa</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* REFERENCE METERS & STATUS GUIDE */}
        <div className="rounded-xl bg-[#15191E] border border-[#2A2F36] p-6 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#2A2F36] pb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-extrabold text-white">Guia de Medidores de Master</h3>
            </div>
            <button
              onClick={onOpenAnalyzer}
              className="text-[10px] text-cyan-400 hover:underline font-mono"
            >
              Abrir FFT →
            </button>
          </div>

          <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1">
            {referenceMetersGuide.map((meter) => (
              <div key={meter.id} className="p-3.5 rounded-lg bg-[#0B0E11] border border-[#2A2F36] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{meter.title}</span>
                  <span className="text-[10px] font-mono text-orange-400 font-bold">{meter.target}</span>
                </div>
                <p className="text-[11px] text-gray-400 leading-tight">{meter.description}</p>

                {/* Green/Yellow/Red bands */}
                <div className="space-y-1 pt-1">
                  {meter.levels.map((lvl, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[10px] font-mono">
                      <span className={`w-2 h-2 rounded-full shrink-0 mt-1 ${
                        idx === 0 ? 'bg-emerald-400' : idx === 1 ? 'bg-amber-400' : 'bg-red-400'
                      }`} />
                      <div className="text-gray-300">
                        <span className="font-bold">{lvl.range}: </span>
                        <span className="text-gray-400">{lvl.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Jump to Export */}
          <button
            onClick={() => onNavigate('export')}
            className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_12px_rgba(16,185,129,0.3)] cursor-pointer"
          >
            <span>Ir para Configurações de Exportação</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

