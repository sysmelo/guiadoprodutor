import React from 'react';
import { NavigationTab, Project } from '../types';
import { Activity, Clock, Sliders, AudioWaveform, Disc3, ShieldCheck, Keyboard, Github } from 'lucide-react';

interface HeaderProps {
  currentTab: NavigationTab;
  activeProject: Project | null;
  projects: Project[];
  onSelectProject: (id: string) => void;
  onOpenAnalyzer: () => void;
  onOpenDelayCalc: () => void;
  onOpenShortcuts?: () => void;
  onOpenGitHubExport?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  activeProject,
  projects,
  onSelectProject,
  onOpenAnalyzer,
  onOpenDelayCalc,
  onOpenShortcuts,
  onOpenGitHubExport
}) => {
  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-[#15191E] border-b border-[#2A2F36] shrink-0 select-none z-20">
      {/* Brand Title */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)] shrink-0">
          <Disc3 className="w-5 h-5 text-white animate-[spin_12s_linear_infinite]" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-white leading-none">
            MELO <span className="text-cyan-400">MIX & MASTER</span>
          </h1>
          <p className="text-[10px] text-gray-400 tracking-wide mt-0.5">FL STUDIO AUDIO SUITE</p>
        </div>
      </div>

      {/* Right Tools & Status Indicators */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Offline Status */}
        <div className="hidden lg:flex items-center gap-2 bg-[#0B0E11] px-3 py-1.5 rounded border border-[#2A2F36]">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Status:</span>
          <span className="text-[11px] font-mono text-emerald-400 font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            OFFLINE MODE
          </span>
        </div>

        {/* Quick Studio Tools */}
        <div className="hidden md:flex items-center gap-2">
          {onOpenShortcuts && (
            <button
              onClick={onOpenShortcuts}
              className="flex items-center gap-1.5 bg-[#0B0E11] hover:bg-[#1E2329] text-gray-300 hover:text-cyan-400 px-2.5 py-1.5 rounded border border-[#2A2F36] hover:border-cyan-500/50 text-xs transition-colors cursor-pointer"
              title="Atalhos Globais (Ctrl + / ou ?)"
            >
              <Keyboard className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden xl:inline">Atalhos</span>
              <kbd className="text-[9px] font-mono text-gray-400 bg-[#15191E] px-1 rounded border border-[#2A2F36]">?</kbd>
            </button>
          )}
          <button
            onClick={onOpenAnalyzer}
            className="flex items-center gap-1.5 bg-[#0B0E11] hover:bg-[#1E2329] text-gray-300 hover:text-cyan-400 px-3 py-1.5 rounded border border-[#2A2F36] hover:border-cyan-500/50 text-xs transition-colors cursor-pointer"
            title="Analisador FFT (Ctrl + F)"
          >
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>FFT Analyzer</span>
          </button>
          <button
            onClick={onOpenDelayCalc}
            className="flex items-center gap-1.5 bg-[#0B0E11] hover:bg-[#1E2329] text-gray-300 hover:text-orange-400 px-3 py-1.5 rounded border border-[#2A2F36] hover:border-orange-500/50 text-xs transition-colors cursor-pointer"
            title="Calculadora BPM / ms (Ctrl + D)"
          >
            <Clock className="w-3.5 h-3.5 text-orange-400" />
            <span>Delay Calc</span>
          </button>
          {onOpenGitHubExport && (
            <button
              onClick={onOpenGitHubExport}
              className="flex items-center gap-1.5 bg-[#0B0E11] hover:bg-[#1E2329] text-gray-300 hover:text-white px-2.5 py-1.5 rounded border border-cyan-500/40 hover:border-cyan-400 text-xs transition-colors cursor-pointer"
              title="Preparar e Exportar para GitHub"
            >
              <Github className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden xl:inline">GitHub</span>
            </button>
          )}
        </div>

        {/* Project Selector / Info */}
        <div className="flex items-center gap-3 pl-2 sm:border-l sm:border-[#2A2F36]">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider">Projeto Atual</p>
            <select
              value={activeProject?.id || ''}
              onChange={(e) => onSelectProject(e.target.value)}
              className="bg-transparent text-xs font-semibold text-gray-200 focus:outline-none cursor-pointer pr-1 text-right"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id} className="bg-[#15191E] text-white">
                  {p.name} ({p.bpm} BPM)
                </option>
              ))}
            </select>
          </div>
          <div className="w-8 h-8 rounded-full border border-[#2A2F36] flex items-center justify-center bg-[#1E2329] text-cyan-400 shrink-0">
            <AudioWaveform className="w-4 h-4" />
          </div>
        </div>
      </div>
    </nav>
  );
};


