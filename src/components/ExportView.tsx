import React, { useState } from 'react';
import { exportProfilesData, flStudioExportSteps, finalChecklistItems } from '../data/exportProfilesData';
import { Share2, CheckCircle2, Circle, Sparkles, Download, Layers, ShieldCheck, Info } from 'lucide-react';
import { Project, NavigationTab } from '../types';

interface ExportViewProps {
  activeProject: Project | null;
  onUpdateProject: (updated: Project) => void;
  onNavigate: (tab: NavigationTab) => void;
}

export const ExportView: React.FC<ExportViewProps> = ({
  activeProject,
  onUpdateProject,
  onNavigate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'MASTER' | 'STREAMING' | 'CLIENTE'>('ALL');
  const [selectedProfileId, setSelectedProfileId] = useState<string>(exportProfilesData[0].id);

  const masterChecklist = activeProject?.masterChecklist || {};

  const toggleChecklistItem = (id: string) => {
    if (!activeProject) return;
    const newMasterChecklist = { ...masterChecklist, [id]: !masterChecklist[id] };
    const updated: Project = {
      ...activeProject,
      masterChecklist: newMasterChecklist
    };
    onUpdateProject(updated);
  };

  const filteredProfiles = selectedCategory === 'ALL'
    ? exportProfilesData
    : exportProfilesData.filter(p => p.category === selectedCategory);

  const currentProfile = exportProfilesData.find(p => p.id === selectedProfileId) || exportProfilesData[0];

  const totalChecks = finalChecklistItems.length;
  const completedChecks = Object.values(masterChecklist).filter(Boolean).length;
  const checklistPercent = Math.round((completedChecks / totalChecks) * 100);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="rounded-xl bg-[#15191E] border border-[#2A2F36] p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
              <Share2 className="w-3.5 h-3.5" />
              NÍVEL 3 — GUIA DEFINITIVO DE EXPORTAÇÃO & ENTREGA
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              Exportação & Entrega Profissional
            </h1>
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
              Configurações exatas de sample rate, bit depth, dithering e True Peak para Spotify, Apple Music, Stems e entrega de arquivos para clientes.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#0B0E11] border border-[#2A2F36] shrink-0 min-w-[220px]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-gray-400 uppercase tracking-wider text-[10px]">
                Checklist de Validação
              </span>
              <span className={`font-mono font-bold ${
                checklistPercent === 100 ? 'text-emerald-400' : 'text-orange-400'
              }`}>
                {checklistPercent}%
              </span>
            </div>
            <div className="h-2 w-full bg-black/60 rounded-full overflow-hidden border border-[#2A2F36]">
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${checklistPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-gray-500 block mt-1">
              {completedChecks} de {totalChecks} itens aprovados
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 1: PROFILES SELECTION */}
      <div className="rounded-xl bg-[#15191E] border border-[#2A2F36] p-6 space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2A2F36] pb-4">
          <div>
            <h2 className="text-lg font-extrabold text-white">Perfis de Exportação por Destino</h2>
            <p className="text-xs text-gray-400">Selecione o destino da sua música para ver os parâmetros ideais de renderização.</p>
          </div>

          {/* Category Filter */}
          <div className="flex gap-1 p-1 bg-[#0B0E11] border border-[#2A2F36] rounded-lg">
            {(['ALL', 'MASTER', 'STREAMING', 'CLIENTE'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile List */}
          <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
            {filteredProfiles.map((prof) => {
              const isSelected = prof.id === selectedProfileId;
              return (
                <div
                  key={prof.id}
                  onClick={() => setSelectedProfileId(prof.id)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.15)]'
                      : 'bg-[#0B0E11] border-[#2A2F36] text-gray-300 hover:border-emerald-500/40 hover:bg-[#1A1F26]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold">{prof.title}</span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#15191E] border border-[#2A2F36] text-emerald-400">
                      {prof.format}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 block mt-1">
                    Alvo: {prof.targetLufs} • True Peak: {prof.truePeak}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Detailed Profile Info */}
          <div className="lg:col-span-2 rounded-xl bg-[#0B0E11] border border-[#2A2F36] p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2A2F36] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  Configuração de Saída
                </span>
                <h3 className="text-xl font-extrabold text-white mt-0.5">{currentProfile.title}</h3>
              </div>
              <span className="text-xs px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-mono font-bold">
                {currentProfile.format}
              </span>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed font-medium">
              {currentProfile.description}
            </p>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 bg-[#15191E] border border-[#2A2F36] rounded-lg">
                <span className="text-[10px] text-gray-500 block">LOUDNESS ALVO</span>
                <span className="text-emerald-400 font-bold">{currentProfile.targetLufs}</span>
              </div>
              <div className="p-3 bg-[#15191E] border border-[#2A2F36] rounded-lg">
                <span className="text-[10px] text-gray-500 block">TRUE PEAK MÁX</span>
                <span className="text-white font-bold">{currentProfile.truePeak}</span>
              </div>
              <div className="p-3 bg-[#15191E] border border-[#2A2F36] rounded-lg">
                <span className="text-[10px] text-gray-500 block">SAMPLE RATE</span>
                <span className="text-white font-bold">{currentProfile.sampleRate}</span>
              </div>
              <div className="p-3 bg-[#15191E] border border-[#2A2F36] rounded-lg">
                <span className="text-[10px] text-gray-500 block">BIT DEPTH</span>
                <span className="text-cyan-400 font-bold">{currentProfile.bitDepth}</span>
              </div>
            </div>

            {/* FL Studio Export Settings */}
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Janela de Renderização do FL Studio
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 bg-[#15191E] rounded-lg border border-[#2A2F36]">
                  <span className="text-[10px] text-gray-500 block">RESAMPLING</span>
                  <span className="text-white font-bold">{currentProfile.flStudioSettings.resampling}</span>
                </div>
                <div className="p-2.5 bg-[#15191E] rounded-lg border border-[#2A2F36]">
                  <span className="text-[10px] text-gray-500 block">DITHERING</span>
                  <span className="text-white font-bold">{currentProfile.flStudioSettings.dithering}</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="p-3.5 rounded-lg bg-[#15191E] border border-emerald-500/20 text-xs space-y-1">
              <span className="font-bold text-emerald-400 text-[11px] block">Orientações de Entrega</span>
              {currentProfile.notes.map((note, idx) => (
                <p key={idx} className="text-[11px] text-gray-300 leading-relaxed">• {note}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: FL STUDIO STEP-BY-STEP EXPORT GUIDE */}
      <div className="rounded-xl bg-[#15191E] border border-[#2A2F36] p-6 md:p-7 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-white font-extrabold text-lg">
          <Download className="w-5 h-5 text-cyan-400" />
          <span>Guia Passo a Passo de Exportação no FL Studio</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {flStudioExportSteps.map((step) => (
            <div key={step.stepNumber} className="p-4 rounded-lg bg-[#0B0E11] border border-[#2A2F36] space-y-2 flex flex-col justify-between">
              <div>
                <span className="w-6 h-6 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-mono font-bold mb-2">
                  {step.stepNumber}
                </span>
                <h4 className="text-xs font-bold text-white">{step.title}</h4>
                <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">{step.action}</p>
              </div>
              <div className="pt-2 border-t border-[#2A2F36] text-[10px] text-gray-500 font-mono">
                {step.details}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: FINAL CHECKLIST DE APROVAÇÃO (10 ITEMS) */}
      <div className="rounded-xl bg-[#15191E] border border-[#2A2F36] p-6 md:p-7 space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2A2F36] pb-4">
          <div>
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Checklist Final de Aprovação da Mix & Master (10 Pontos Críticos)</span>
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Antes de enviar para o cliente ou distribuidora, certifique-se de validar todos os itens abaixo.
            </p>
          </div>

          <span className="text-xs px-3 py-1 rounded-full bg-[#0B0E11] border border-[#2A2F36] text-gray-300 font-mono">
            {completedChecks} / {totalChecks} Aprovados
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {finalChecklistItems.map((item) => {
            const isChecked = !!masterChecklist[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleChecklistItem(item.id)}
                className={`p-3.5 rounded-lg border flex items-center gap-3 cursor-pointer select-none transition-all ${
                  isChecked
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-white'
                    : 'bg-[#0B0E11] border-[#2A2F36] text-gray-300 hover:border-emerald-500/30 hover:bg-[#1A1F26]'
                }`}
              >
                {isChecked ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-500 shrink-0" />
                )}
                <div className="min-w-0">
                  <span className={`text-xs font-semibold block ${isChecked ? 'line-through text-gray-400' : 'text-white'}`}>
                    {item.title}
                  </span>
                  <span className="text-[9px] font-mono text-gray-500">{item.category}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

