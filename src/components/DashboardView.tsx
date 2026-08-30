import React from 'react';
import { 
  Sliders, 
  Flame, 
  Share2, 
  ArrowRight, 
  Mic, 
  Music, 
  Stethoscope, 
  Activity, 
  CheckCircle2, 
  ShieldAlert, 
  Sparkles, 
  FolderKanban, 
  Zap, 
  Radio, 
  Calendar,
  AlertTriangle,
  Clock,
  Disc3,
  Layers
} from 'lucide-react';
import { NavigationTab, Project, ProcessLevel } from '../types';
import { getProjectDeadlineStatus } from '../utils/audioCalculator';

interface DashboardViewProps {
  onNavigate: (tab: NavigationTab) => void;
  activeProject: Project | null;
  projects?: Project[];
  onSelectProject?: (id: string) => void;
  onOpenAnalyzer: () => void;
  onOpenDelayCalc: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  activeProject,
  projects = [],
  onSelectProject,
  onOpenAnalyzer,
  onOpenDelayCalc
}) => {
  const activeDeadlineStatus = activeProject ? getProjectDeadlineStatus(activeProject.deadline, activeProject.status) : null;
  const activeProcessLevel: ProcessLevel = activeProject?.processLevel || (
    activeProject?.status === 'Finalizado' ? 'Nível 4: Finalização / Entrega' :
    activeProject?.status === 'Em Master' ? 'Nível 3: Masterização' :
    'Nível 2: Mixagem'
  );

  const overdueList = projects.filter(p => {
    const s = getProjectDeadlineStatus(p.deadline, p.status);
    return s.isOverdue && p.status !== 'Finalizado';
  });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200">
      
      {/* CRITICAL OVERDUE ALERT BANNER (If any project is overdue) */}
      {overdueList.length > 0 && (
        <div className="p-4 rounded-xl bg-red-500/10 border-2 border-red-500/40 text-red-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-500 text-black flex items-center justify-center font-bold shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                Atenção: {overdueList.length} {overdueList.length === 1 ? 'Projeto com Prazo Vencido' : 'Projetos com Prazos Vencidos'}!
              </h4>
              <p className="text-[11px] text-red-300">
                Faixa(s): {overdueList.map(p => `"${p.name}" (${p.artist})`).join(', ')}. Verifique o painel de projetos para priorizar as entregas.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('projects')}
            className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold font-mono shrink-0 transition-colors cursor-pointer"
          >
            Ver Projetos Atrasados →
          </button>
        </div>
      )}

      {/* ACTIVE PROJECT PROCESS PIPELINE MONITOR */}
      {activeProject && (
        <div className="rounded-2xl bg-[#15191E] border border-cyan-500/40 p-5 md:p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2A2F36] pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <FolderKanban className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    SESSÃO ATIVA NO ESTÚDIO
                  </span>
                  {activeDeadlineStatus && (
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${activeDeadlineStatus.badgeColor}`}>
                      {activeDeadlineStatus.label}
                    </span>
                  )}
                </div>
                <h3 className="text-lg md:text-xl font-extrabold text-white mt-0.5">
                  {activeProject.name} — <span className="text-gray-400 font-normal text-sm">{activeProject.artist}</span>
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('projects')}
                className="px-3 py-1.5 rounded-lg bg-[#0B0E11] hover:bg-[#1E2329] text-gray-300 text-xs font-semibold border border-[#2A2F36] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Trocar Sessão</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            </div>
          </div>

          {/* 4-Stage Process Progress Deck */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-gray-400">Pipeline de Produção do Projeto:</span>
              <span className="text-cyan-400 font-bold">{activeProcessLevel}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              {[
                { 
                  id: 'Nível 1: Gravação / Pré-Mix', 
                  label: '1. Pré-Mix & Gravação', 
                  tab: 'vocal_recording' as NavigationTab,
                  desc: 'Buffer ASIO, Ganho -18dB',
                  icon: Radio,
                  color: 'cyan'
                },
                { 
                  id: 'Nível 2: Mixagem', 
                  label: '2. Mixagem de Canais', 
                  tab: 'mix' as NavigationTab,
                  desc: 'EQs, Dinâmica, 15 Gêneros',
                  icon: Sliders,
                  color: 'blue'
                },
                { 
                  id: 'Nível 3: Masterização', 
                  label: '3. Masterização & LUFS', 
                  tab: 'master' as NavigationTab,
                  desc: 'True Peak, Loudness, Chain',
                  icon: Disc3,
                  color: 'orange'
                },
                { 
                  id: 'Nível 4: Finalização / Entrega', 
                  label: '4. Finalização & Entrega', 
                  tab: 'export' as NavigationTab,
                  desc: 'WAV 24b, Stems, Streaming',
                  icon: Share2,
                  color: 'emerald'
                }
              ].map((stage, idx) => {
                const isCurrent = activeProcessLevel === stage.id;
                const Icon = stage.icon;
                return (
                  <button
                    key={stage.id}
                    onClick={() => onNavigate(stage.tab)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-1.5 ${
                      isCurrent
                        ? 'bg-cyan-500/15 border-cyan-500 ring-1 ring-cyan-500/40 shadow-lg'
                        : 'bg-[#0B0E11] border-[#242A34] hover:border-gray-600 hover:bg-[#101419]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-mono font-black ${isCurrent ? 'text-cyan-400' : 'text-gray-500'}`}>
                        0{idx + 1}
                      </span>
                      <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-cyan-400 animate-pulse' : 'text-gray-600'}`} />
                    </div>
                    <div>
                      <h5 className={`text-xs font-bold ${isCurrent ? 'text-white' : 'text-gray-300'}`}>
                        {stage.label}
                      </h5>
                      <p className="text-[10px] text-gray-500 leading-tight mt-0.5">
                        {stage.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* NEW PRO FEATURE BANNER: VOCAL RECORDING WORKFLOW */}
      <div className="rounded-xl bg-gradient-to-r from-[#15191E] via-[#1A222D] to-[#15191E] border border-cyan-500/30 p-5 md:p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative overflow-hidden">
        <div className="space-y-2 z-10 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
              FL STUDIO SUITE COMPLETA
            </span>
            <span className="text-[10px] font-mono text-gray-400">Desde a Criação do Beat até a Gravação do Vocal</span>
          </div>
          <h2 className="text-lg md:text-xl font-black text-white tracking-tight">
            Manual de Gravação de Vocal no FL Studio
          </h2>
          <p className="text-xs text-gray-300 leading-relaxed">
            Aprenda a calibrar buffer/latência zero (ASIO), ganho de microfone (-18dBFS sweet spot), console virtual de gravação, roteamento REC IN, headphone mix com reverb de conforto, comping e consolidação rápida.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 z-10">
          <button
            onClick={() => onNavigate('vocal_recording')}
            className="px-4 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] cursor-pointer"
          >
            <span>Abrir Console & Guia</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Core Action Cards (Level 1 to Level 4 Workflow) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CARD 1: GRAVAÇÃO & TRACKING (NÍVEL 1) */}
        <div className="bg-[#15191E] border border-cyan-500/40 rounded-xl p-5 flex flex-col justify-between relative overflow-hidden group hover:border-cyan-400 transition-all shadow-lg">
          <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-15 transition-opacity text-cyan-400">
            <Radio className="w-20 h-20" />
          </div>

          <div className="space-y-3 z-10">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                <Radio className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                NÍVEL 1
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white tracking-tight">GRAVAÇÃO</h3>
              <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                Buffer ASIO (64/128smp), entrada Mono, ganho (-18dBFS) e latência zero no FL Studio.
              </p>
            </div>

            <div className="space-y-1 pt-2 border-t border-[#2A2F36] text-[11px] text-gray-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Console Virtual & VU Meter</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Entrada Mono & Pré-Ganho</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('vocal_recording')}
            className="mt-4 w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_12px_rgba(6,182,212,0.3)] z-10"
          >
            <span>Configurar Gravação</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* CARD 2: MIX (NÍVEL 2) */}
        <div className="bg-[#15191E] border border-[#2A2F36] rounded-xl p-5 flex flex-col justify-between relative overflow-hidden group hover:border-blue-500/50 transition-all shadow-lg">
          <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-15 transition-opacity text-blue-400">
            <Sliders className="w-20 h-20" />
          </div>

          <div className="space-y-3 z-10">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Sliders className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#0B0E11] text-blue-400 border border-[#2A2F36]">
                NÍVEL 2
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white tracking-tight">MIX & PREPARAÇÃO</h3>
              <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                Organize, limpe e equilibre todos os instrumentos com ganho correto, EQs e buses.
              </p>
            </div>

            <div className="space-y-1 pt-2 border-t border-[#2A2F36] text-[11px] text-gray-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Gain Staging (-18 a -12 dBFS)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Kick, 808, Voz, Synths & Guitarras</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('mix')}
            className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_12px_rgba(59,130,246,0.3)] z-10"
          >
            <span>Começar Mix</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* CARD 3: MASTER (NÍVEL 3) */}
        <div className="bg-[#15191E] border border-[#2A2F36] rounded-xl p-5 flex flex-col justify-between relative overflow-hidden group hover:border-orange-500/50 transition-all shadow-lg">
          <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-15 transition-opacity text-orange-400">
            <Flame className="w-20 h-20" />
          </div>

          <div className="space-y-3 z-10">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400">
                <Flame className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#0B0E11] text-orange-400 border border-[#2A2F36]">
                NÍVEL 3
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white tracking-tight">MASTER SUITE</h3>
              <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                Alcance impacto, equilíbrio espectral e volume comercial sem distorção indesejada.
              </p>
            </div>

            <div className="space-y-1 pt-2 border-t border-[#2A2F36] text-[11px] text-gray-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span>Cadeia de 8 Etapas no Master</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span>Medidores LUFS, True Peak e Fase</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('master')}
            className="mt-4 w-full py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_12px_rgba(249,115,22,0.3)] z-10"
          >
            <span>Começar Master</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* CARD 4: EXPORT (NÍVEL 4) */}
        <div className="bg-[#15191E] border border-[#2A2F36] rounded-xl p-5 flex flex-col justify-between relative overflow-hidden group hover:border-emerald-500/50 transition-all shadow-lg">
          <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-15 transition-opacity text-emerald-400">
            <Share2 className="w-20 h-20" />
          </div>

          <div className="space-y-3 z-10">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <Share2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#0B0E11] text-emerald-400 border border-[#2A2F36]">
                NÍVEL 4
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white tracking-tight">EXPORT & ENTREGA</h3>
              <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                Checklist final e renderização correta (WAV 24-bit, 512-point sinc) para streaming.
              </p>
            </div>

            <div className="space-y-1 pt-2 border-t border-[#2A2F36] text-[11px] text-gray-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Spotify, Apple Music, Club WAV</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Exportação de Stems e Dithering</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('export')}
            className="mt-4 w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_12px_rgba(16,185,129,0.3)] z-10"
          >
            <span>Exportar Guia</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* VOCAL CLEANING STUDIO + SUGGESTED SIGNAL FLOW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Vocal Cleaning Quick Diagnostic */}
        <section className="lg:col-span-7 bg-[#15191E] border border-[#2A2F36] rounded-xl p-5 md:p-6 flex flex-col justify-between shadow-lg">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#2A2F36] pb-3">
              <h2 className="font-bold text-sm text-white flex items-center gap-2">
                <Mic className="w-4 h-4 text-cyan-400" />
                VOCAL CLEANING STUDIO
              </h2>
              <span className="text-[10px] bg-red-500/10 border border-red-500/30 text-red-400 px-2 py-0.5 rounded font-bold uppercase">
                11 Diagnósticos
              </span>
            </div>

            <p className="text-xs text-gray-400 font-medium">
              Qual é o problema prioritário da voz na sua gravação atual?
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => onNavigate('vocal_cleaning')}
                className="text-left px-3 py-2 rounded-lg border border-[#2A2F36] bg-[#0B0E11] text-xs text-gray-300 hover:border-cyan-500/50 hover:text-white transition-colors cursor-pointer"
              >
                Muito Ruído (Noise/Hum)
              </button>
              <button 
                onClick={() => onNavigate('vocal_cleaning')}
                className="text-left px-3 py-2 rounded-lg border border-cyan-500 bg-cyan-500/10 text-cyan-200 text-xs font-semibold hover:bg-cyan-500/20 transition-colors shadow-[0_0_8px_rgba(6,182,212,0.15)] cursor-pointer"
              >
                Sibilância Excessiva (S, Sh)
              </button>
              <button 
                onClick={() => onNavigate('vocal_cleaning')}
                className="text-left px-3 py-2 rounded-lg border border-[#2A2F36] bg-[#0B0E11] text-xs text-gray-300 hover:border-cyan-500/50 hover:text-white transition-colors cursor-pointer"
              >
                Voz Abafada / Escura
              </button>
              <button 
                onClick={() => onNavigate('vocal_cleaning')}
                className="text-left px-3 py-2 rounded-lg border border-[#2A2F36] bg-[#0B0E11] text-xs text-gray-300 hover:border-cyan-500/50 hover:text-white transition-colors cursor-pointer"
              >
                Volume Inconsistente
              </button>
              <button 
                onClick={() => onNavigate('vocal_cleaning')}
                className="text-left px-3 py-2 rounded-lg border border-[#2A2F36] bg-[#0B0E11] text-xs text-gray-300 hover:border-cyan-500/50 hover:text-white transition-colors cursor-pointer"
              >
                Ressonância Nasal (Boxy)
              </button>
              <button 
                onClick={() => onNavigate('vocal_cleaning')}
                className="text-left px-3 py-2 rounded-lg border border-[#2A2F36] bg-[#0B0E11] text-xs text-gray-300 hover:border-cyan-500/50 hover:text-white transition-colors cursor-pointer"
              >
                Falta de Presença / Air
              </button>
            </div>

            {/* Mix Doctor Alert Box */}
            <div className="p-3.5 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
              <p className="text-[11px] text-yellow-400 font-bold uppercase mb-1 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-yellow-400" />
                Mix Doctor Alerta em Frequência
              </p>
              <p className="text-xs text-gray-300">
                Sibilância detectada entre <span className="text-cyan-400 font-mono font-bold">5kHz - 8kHz</span>. Recomenda-se De-Esser dinâmico após compressão inicial para evitar picos estridentes no FL Studio.
              </p>
            </div>
          </div>

          <div className="pt-4 mt-2 flex items-center justify-between border-t border-[#2A2F36]">
            <span className="text-xs text-gray-500 font-medium">Guia completo para vozes limpas</span>
            <button
              onClick={() => onNavigate('vocal_cleaning')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>Abrir Vocal Cleaning</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>

        {/* Right: Suggested Signal Flow */}
        <section className="lg:col-span-5 bg-[#15191E] border border-[#2A2F36] rounded-xl p-5 flex flex-col justify-between shadow-lg">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#2A2F36] pb-3">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                CADEIA SUGERIDA (SIGNAL FLOW)
              </h2>
              <span className="text-[10px] font-mono text-gray-500">FL Studio</span>
            </div>

            <div className="flex flex-col gap-2.5">
              {/* Node 1 */}
              <div className="flex flex-col gap-0.5 p-2.5 bg-[#0B0E11] border border-[#2A2F36] rounded-lg relative">
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-cyan-400 font-bold">01</span>
                  <span className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">LIMPEZA</span>
                </div>
                <p className="text-xs font-bold text-white">Fruity Parametric EQ 2</p>
                <p className="text-[10px] text-gray-400 font-mono">HPF @ 100Hz | Corte 350Hz (Mud)</p>
              </div>

              {/* Node 2 */}
              <div className="flex flex-col gap-0.5 p-2.5 bg-[#0B0E11] border border-[#2A2F36] rounded-lg relative">
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_6px_rgba(249,115,22,0.8)]" />
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-orange-400 font-bold">02</span>
                  <span className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">DINÂMICA</span>
                </div>
                <p className="text-xs font-bold text-white">Fruity Limiter (COMP Mode)</p>
                <p className="text-[10px] text-gray-400 font-mono">Ratio 4:1 | Atk 12ms | Rel Auto</p>
              </div>

              {/* Node 3 */}
              <div className="flex flex-col gap-0.5 p-2.5 bg-[#0B0E11] border border-cyan-500/50 rounded-lg relative shadow-[0_0_12px_rgba(6,182,212,0.15)]">
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.9)]" />
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-cyan-400 font-bold">03</span>
                  <span className="text-[9px] text-cyan-400 uppercase font-bold tracking-wider">DE-ESSER</span>
                </div>
                <p className="text-xs font-bold text-cyan-100">Maximus (Mid Band Solo)</p>
                <p className="text-[10px] text-cyan-400 font-mono">Foco: 6200Hz - Controle de picos</p>
              </div>

              {/* Node 4 */}
              <div className="flex flex-col gap-0.5 p-2.5 bg-[#0B0E11] border border-[#2A2F36] rounded-lg relative opacity-70">
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-500" />
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-gray-400 font-bold">04</span>
                  <span className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">TEXTURA</span>
                </div>
                <p className="text-xs font-bold text-white">Fruity Blood Overdrive</p>
                <p className="text-[10px] text-gray-400 font-mono">Suave Saturação p/ Presença</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('plugins')}
            className="mt-3 w-full py-2 bg-[#1E2329] hover:bg-[#252B33] text-gray-300 hover:text-white rounded-lg text-xs font-semibold border border-[#2A2F36] transition-colors cursor-pointer"
          >
            Ver Plugins FL Studio & Suítes →
          </button>
        </section>
      </div>

      {/* QUICK ACCESS STUDIO SHORTCUTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Instruments */}
        <div 
          onClick={() => onNavigate('instruments')}
          className="p-4 rounded-xl bg-[#15191E] border border-[#2A2F36] hover:border-cyan-500/50 cursor-pointer transition-all group shadow-md"
        >
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <Music className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">Instrumentos & Elementos</h4>
          <p className="text-[11px] text-gray-400 mt-1 leading-snug">Kick, 808, Snare, Hi-hats, Guitarras, Synths com EQ e dinâmica.</p>
        </div>

        {/* 15 Musical Genres */}
        <div 
          onClick={() => onNavigate('genres')}
          className="p-4 rounded-xl bg-[#15191E] border border-[#2A2F36] hover:border-orange-500/50 cursor-pointer transition-all group shadow-md"
        >
          <div className="w-9 h-9 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-white group-hover:text-orange-400 transition-colors">15 Estilos Musicais</h4>
          <p className="text-[11px] text-gray-400 mt-1 leading-snug">Afrobeat, Amapiano, Kizomba, Trap, Drill com presets Clean/Modern.</p>
        </div>

        {/* Mix Doctor */}
        <div 
          onClick={() => onNavigate('mix_doctor')}
          className="p-4 rounded-xl bg-[#15191E] border border-[#2A2F36] hover:border-red-500/50 cursor-pointer transition-all group shadow-md"
        >
          <div className="w-9 h-9 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <Stethoscope className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">Mix Doctor</h4>
          <p className="text-[11px] text-gray-400 mt-1 leading-snug">Diagnósticos de fase, mascaramento de frequências e acúmulo de sub.</p>
        </div>

        {/* Real-time Spectrum Analyzer */}
        <div 
          onClick={onOpenAnalyzer}
          className="p-4 rounded-xl bg-[#15191E] border border-[#2A2F36] hover:border-emerald-500/50 cursor-pointer transition-all group shadow-md"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <Activity className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">Analisador FFT Offline</h4>
          <p className="text-[11px] text-gray-400 mt-1 leading-snug">Espectro de frequências em tempo real e gerador de tons de calibração.</p>
        </div>
      </div>
    </div>
  );
};
