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
  Waves
} from 'lucide-react';
import { proVocalChainPresets, ProVocalPreset, VocalChainStep } from '../data/vocalChainPresets';

interface ProVocalChainSectionProps {
  onOpenAnalyzer?: () => void;
  onOpenDelayCalc?: () => void;
}

export const ProVocalChainSection: React.FC<ProVocalChainSectionProps> = ({
  onOpenAnalyzer,
  onOpenDelayCalc
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(proVocalChainPresets[0].id);
  const [activeSlot, setActiveSlot] = useState<number>(1);
  const [viewEcosystem, setViewEcosystem] = useState<'FL_NATIVE' | 'EXTERNAL_PRO'>('FL_NATIVE');
  const [copiedSlot, setCopiedSlot] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);

  const currentPreset: ProVocalPreset = proVocalChainPresets.find(p => p.id === selectedPresetId) || proVocalChainPresets[0];
  const currentStep: VocalChainStep = currentPreset.signalFlow.find(s => s.slot === activeSlot) || currentPreset.signalFlow[0];

  const handleCopySlot = (step: VocalChainStep) => {
    const textToCopy = `[FL STUDIO VOCAL CHAIN - SLOT ${step.slot}: ${step.pluginFlNative}]\n` +
      `Ação: ${step.primaryAction}\n` +
      `Parâmetros Recomendados:\n` +
      step.parameters.map(p => `• ${p.label}: ${p.value} (${p.flKnobHint || ''})`).join('\n') +
      `\nDica FL Studio: ${step.flStudioTip}`;

    navigator.clipboard.writeText(textToCopy);
    setCopiedSlot(step.slot);
    setTimeout(() => setCopiedSlot(null), 2500);
  };

  const handleCopyFullChain = () => {
    const fullText = `=== PRO VOCAL CHAIN PRESET: ${currentPreset.name.toUpperCase()} ===\n` +
      `Estilo: ${currentPreset.genreVibe}\n` +
      `Descrição: ${currentPreset.description}\n` +
      `Tom Alvo: ${currentPreset.targetTone}\n\n` +
      `--- CADEIA DE INSERTS NO MIXER (FL STUDIO NATIVO) ---\n` +
      currentPreset.signalFlow.map(step => (
        `[Slot ${step.slot}] ${step.pluginFlNative} (${step.category})\n` +
        `  Ação: ${step.primaryAction}\n` +
        step.parameters.map(p => `  • ${p.label}: ${p.value}`).join('\n') +
        `\n  💡 Dica: ${step.flStudioTip}\n`
      )).join('\n') +
      `\n--- AUX SENDS SUGERIDOS ---\n` +
      currentPreset.auxSends.map(send => (
        `• ${send.sendName} (${send.flPlugin}):\n  ${send.settings}\n  Dica: ${send.tip}\n`
      )).join('\n') +
      `\n--- REGRAS DE OURO ---\n` +
      currentPreset.goldenRules.map(r => `• ${r}`).join('\n');

    navigator.clipboard.writeText(fullText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Preset Selector Header Bar */}
      <div className="bg-[#15191E] border border-[#2A2F36] rounded-2xl p-5 md:p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2A2F36] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
                FL STUDIO PRO VOCAL CHAIN
              </span>
              <span className="text-xs text-gray-400 font-mono">Cadeia Padrão da Indústria</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
              Presets de Cadeia Vocal de Elite
            </h2>
            <p className="text-xs text-gray-300 leading-relaxed max-w-3xl">
              Configurações calibradas para <strong>EQ Subtrativo</strong>, <strong>De-Esser Dinâmico</strong>, <strong>Compressão Niveladora</strong>, <strong>Top-End Air</strong> e <strong>Saturação Harmônica</strong> no Mixer do FL Studio.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleCopyFullChain}
              className="px-3.5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(6,182,212,0.3)] cursor-pointer"
              title="Copiar todas as configurações de todos os slots para o clipboard"
            >
              {copiedAll ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedAll ? 'Cadeia Completa Copiada!' : 'Copiar Preset Completo'}</span>
            </button>
          </div>
        </div>

        {/* Preset Cards Grid (4 Archetypes) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {proVocalChainPresets.map((preset) => {
            const isSelected = preset.id === selectedPresetId;
            return (
              <button
                key={preset.id}
                onClick={() => {
                  setSelectedPresetId(preset.id);
                  setActiveSlot(1);
                }}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  isSelected
                    ? 'bg-cyan-500/15 border-cyan-500 ring-1 ring-cyan-500/40 shadow-lg'
                    : 'bg-[#0B0E11] border-[#242A34] hover:border-gray-600 hover:bg-[#101419]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${preset.badgeColor}`}>
                    {preset.tag}
                  </span>
                  {isSelected && <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />}
                </div>

                <div>
                  <h4 className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-gray-200'}`}>
                    {preset.name.split('(')[0]}
                  </h4>
                  <p className="text-[10px] text-gray-400 line-clamp-2 mt-1">
                    {preset.genreVibe}
                  </p>
                </div>

                <div className="text-[10px] font-mono text-cyan-400 pt-1 border-t border-[#242A34] flex items-center justify-between">
                  <span>{preset.signalFlow.length} Slots de Insert</span>
                  <span className="text-gray-500">FL Studio</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Signal Flow Visualizer & Parameter Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Mixer Signal Flow Strip (Slots 1 to 5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#15191E] border border-[#2A2F36] rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-[#2A2F36] pb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Mixer Insert Chain ({currentPreset.signalFlow.length} Slots)
                </h3>
              </div>
              <span className="text-[10px] font-mono text-gray-500">Ordem Obrigatória</span>
            </div>

            {/* Signal Flow Notice */}
            <div className="p-2.5 rounded-lg bg-cyan-500/5 border border-cyan-500/20 text-[11px] text-cyan-200 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>O sinal de áudio percorre do <strong>Slot 1</strong> até o <strong>Slot {currentPreset.signalFlow.length}</strong> de forma sequencial.</span>
            </div>

            {/* Vertical Slot Deck */}
            <div className="space-y-2">
              {currentPreset.signalFlow.map((step, idx) => {
                const isActive = step.slot === activeSlot;
                const isFirst = idx === 0;
                const isLast = idx === currentPreset.signalFlow.length - 1;

                return (
                  <div key={step.slot} className="relative">
                    <button
                      onClick={() => setActiveSlot(step.slot)}
                      className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-500/20 to-[#101419] border-cyan-500 shadow-md ring-1 ring-cyan-500/40'
                          : 'bg-[#0B0E11] border-[#242A34] hover:border-gray-600 hover:bg-[#12161C]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-black ${
                          isActive ? 'bg-cyan-500 text-black' : 'bg-[#1E2329] text-gray-400'
                        }`}>
                          {step.slot}
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] font-mono uppercase font-bold text-gray-400 tracking-wider">
                              {step.category}
                            </span>
                          </div>
                          <h4 className={`text-xs font-bold ${isActive ? 'text-white' : 'text-gray-300'}`}>
                            {viewEcosystem === 'FL_NATIVE' ? step.pluginFlNative : step.pluginExternalAlternative.split('/')[0]}
                          </h4>
                          <p className="text-[10px] text-gray-400 line-clamp-1">
                            {step.primaryAction}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                        )}
                        <ArrowRight className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-gray-600'}`} />
                      </div>
                    </button>

                    {/* Connecting Signal Arrow */}
                    {!isLast && (
                      <div className="flex justify-center -my-1 py-0.5 pointer-events-none">
                        <div className="w-0.5 h-2 bg-cyan-500/30" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Plugin Ecosystem Toggle (FL Native vs External Suite) */}
            <div className="pt-3 border-t border-[#2A2F36]">
              <div className="flex items-center justify-between text-[11px] mb-2">
                <span className="text-gray-400 font-medium">Ecossistema Exibido:</span>
                <span className="text-cyan-400 font-mono text-[10px] font-bold">
                  {viewEcosystem === 'FL_NATIVE' ? 'FL Studio Nativo (100% Gratuito)' : 'Suítes Pro Externas (FabFilter/Waves)'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setViewEcosystem('FL_NATIVE')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    viewEcosystem === 'FL_NATIVE'
                      ? 'bg-cyan-500 text-black shadow-md'
                      : 'bg-[#0B0E11] text-gray-400 border border-[#2A2F36] hover:text-white'
                  }`}
                >
                  🍊 FL Studio Nativo
                </button>
                <button
                  onClick={() => setViewEcosystem('EXTERNAL_PRO')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    viewEcosystem === 'EXTERNAL_PRO'
                      ? 'bg-cyan-500 text-black shadow-md'
                      : 'bg-[#0B0E11] text-gray-400 border border-[#2A2F36] hover:text-white'
                  }`}
                >
                  ⚡ FabFilter / Waves
                </button>
              </div>
            </div>
          </div>

          {/* Quick Aux Sends Box */}
          {currentPreset.auxSends.length > 0 && (
            <div className="bg-[#15191E] border border-[#2A2F36] rounded-2xl p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-[#2A2F36] pb-2.5">
                <div className="flex items-center gap-2">
                  <Waves className="w-4 h-4 text-orange-400" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Efeitos Espaciais Auxiliares (Sends Paralelos)
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-orange-400 font-bold">Bus FX</span>
              </div>

              <div className="space-y-2.5">
                {currentPreset.auxSends.map((send, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#0B0E11] border border-[#2A2F36] text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-orange-300">{send.sendName}</span>
                      <span className="text-[10px] font-mono bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded border border-orange-500/20">
                        {send.flPlugin}
                      </span>
                    </div>
                    <p className="font-mono text-[11px] text-gray-300 bg-[#15191E] p-2 rounded border border-[#2A2F36]">
                      {send.settings}
                    </p>
                    <p className="text-[11px] text-gray-400 leading-snug">
                      💡 {send.tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Detailed Parameter Inspection Console for Active Slot */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#15191E] border border-[#2A2F36] rounded-2xl p-5 md:p-6 shadow-xl space-y-5">
            
            {/* Slot Header Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2A2F36] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    SLOT {currentStep.slot} • {currentStep.category}
                  </span>
                  <span className="text-[10px] font-mono text-gray-400">
                    Preset: {currentPreset.tag}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-white mt-1.5 flex items-center gap-2">
                  {viewEcosystem === 'FL_NATIVE' ? currentStep.pluginFlNative : currentStep.pluginExternalAlternative}
                </h3>
                <p className="text-xs text-gray-300 mt-0.5">
                  {currentStep.primaryAction}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleCopySlot(currentStep)}
                  className="px-3 py-1.5 rounded-lg bg-[#0B0E11] hover:bg-[#1E2329] text-gray-300 hover:text-white border border-[#2A2F36] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Copiar parâmetros deste slot"
                >
                  {copiedSlot === currentStep.slot ? <Check className="w-3.5 h-3.5 text-cyan-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSlot === currentStep.slot ? 'Copiado!' : 'Copiar Slot'}</span>
                </button>
              </div>
            </div>

            {/* Why this step matters */}
            <div className="p-3.5 rounded-xl bg-[#0B0E11] border border-[#2A2F36] space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                Por que este plugin está nesta posição exata?
              </span>
              <p className="text-xs text-gray-300 leading-relaxed">
                {currentStep.explanation}
              </p>
            </div>

            {/* Exact Parameter Knobs & Sliders Cards */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Configuração Exata de Knobs no FL Studio</span>
                </h4>
                <span className="text-[10px] font-mono text-gray-500">Valores Calibrados</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentStep.parameters.map((param, pIdx) => (
                  <div
                    key={pIdx}
                    className="p-3 rounded-xl bg-[#0B0E11] border border-[#2A2F36] space-y-1.5 hover:border-cyan-500/40 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-300 group-hover:text-cyan-300 transition-colors">
                        {param.label}
                      </span>
                      <span className="text-xs font-mono font-black text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                        {param.value}
                      </span>
                    </div>
                    {param.flKnobHint && (
                      <p className="text-[10px] font-mono text-gray-400 leading-tight">
                        ⚙️ {param.flKnobHint}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* FL Studio Pro Secret Tip */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-[#15191E] to-transparent border border-amber-500/30 space-y-1.5">
              <span className="text-[11px] font-mono font-bold text-amber-400 flex items-center gap-1.5 uppercase">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                Dica de Ouro no FL Studio
              </span>
              <p className="text-xs text-gray-200 leading-relaxed">
                {currentStep.flStudioTip}
              </p>
            </div>

            {/* Step Navigation Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-[#2A2F36]">
              <button
                disabled={currentStep.slot === 1}
                onClick={() => setActiveSlot(Math.max(1, currentStep.slot - 1))}
                className="px-3 py-1.5 rounded-lg bg-[#0B0E11] hover:bg-[#1E2329] disabled:opacity-40 disabled:pointer-events-none text-gray-300 text-xs font-semibold border border-[#2A2F36] transition-colors cursor-pointer"
              >
                ← Slot Anterior
              </button>

              <div className="flex items-center gap-1.5">
                {currentPreset.signalFlow.map((s) => (
                  <button
                    key={s.slot}
                    onClick={() => setActiveSlot(s.slot)}
                    className={`w-6 h-6 rounded-full text-[10px] font-mono font-bold transition-all cursor-pointer ${
                      s.slot === activeSlot
                        ? 'bg-cyan-500 text-black shadow-md'
                        : 'bg-[#0B0E11] text-gray-500 border border-[#2A2F36] hover:text-white'
                    }`}
                  >
                    {s.slot}
                  </button>
                ))}
              </div>

              <button
                disabled={currentStep.slot === currentPreset.signalFlow.length}
                onClick={() => setActiveSlot(Math.min(currentPreset.signalFlow.length, currentStep.slot + 1))}
                className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>Próximo Slot</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Golden Rules Checklist for this Vocal Genre */}
          <div className="bg-[#15191E] border border-[#2A2F36] rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center gap-2 border-b border-[#2A2F36] pb-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Regras de Ouro para Vocais ({currentPreset.tag})
              </h4>
            </div>

            <div className="space-y-2">
              {currentPreset.goldenRules.map((rule, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
