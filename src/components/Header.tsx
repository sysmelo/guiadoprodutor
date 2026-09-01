import React from 'react';
import { NavigationTab, Project } from '../types';
import { Activity, Clock, AudioWaveform, Disc3, Keyboard, Github, Download, Wifi, WifiOff, Cloud, CloudOff } from 'lucide-react';
import { usePWA } from '../hooks/usePWA';

interface HeaderProps {
  currentTab: NavigationTab;
  activeProject: Project | null;
  projects: Project[];
  isFirebaseSynced?: boolean;
  onSelectProject: (id: string) => void;
  onOpenAnalyzer: () => void;
  onOpenDelayCalc: () => void;
  onOpenShortcuts?: () => void;
  onOpenGitHubExport?: () => void;
  onOpenMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  activeProject,
  projects,
  isFirebaseSynced = false,
  onSelectProject,
  onOpenAnalyzer,
  onOpenDelayCalc,
  onOpenShortcuts,
  onOpenGitHubExport,
  onOpenMenu
}) => {
  const { isOnline, isInstalled, canInstall, handleInstallApp } = usePWA();

  return (
    <nav className="flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3 bg-[#15191E] border-b border-[#2A2F36] shrink-0 select-none z-20">
      {/* Left: Mobile Menu Trigger + Brand Title */}
      <div className="flex items-center gap-2 sm:gap-3">
        {onOpenMenu && (
          <button
            onClick={onOpenMenu}
            aria-label="Abrir menu de navegação"
            className="md:hidden p-2 rounded-xl bg-[#0B0E11] hover:bg-[#1E2329] border border-[#2A2F36] text-cyan-400 cursor-pointer transition-colors"
          >
            <div className="w-4 h-4 flex flex-col justify-around">
              <span className="w-full h-0.5 bg-cyan-400 rounded-full" />
              <span className="w-3/4 h-0.5 bg-cyan-400 rounded-full" />
              <span className="w-full h-0.5 bg-cyan-400 rounded-full" />
            </div>
          </button>
        )}

        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)] shrink-0">
          <Disc3 className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-[spin_12s_linear_infinite]" />
        </div>
        <div>
          <h1 className="text-sm sm:text-lg font-bold tracking-tight text-white leading-none">
            MELO <span className="text-cyan-400">MIX & MASTER</span>
          </h1>
          <p className="text-[9px] sm:text-[10px] text-gray-400 tracking-wide mt-0.5">FL STUDIO & STUDIO ONE</p>
        </div>
      </div>

      {/* Right Tools & Status Indicators */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Mobile Quick Action Buttons */}
        <div className="flex md:hidden items-center gap-1.5">
          <button
            onClick={onOpenAnalyzer}
            className="p-2 rounded-lg bg-[#0B0E11] border border-[#2A2F36] text-cyan-400 text-xs"
            title="Analisador FFT"
          >
            <Activity className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onOpenDelayCalc}
            className="p-2 rounded-lg bg-[#0B0E11] border border-[#2A2F36] text-orange-400 text-xs"
            title="Calculadora Delay"
          >
            <Clock className="w-3.5 h-3.5" />
          </button>
        </div>
        {/* Firebase Cloud Sync & Offline Status Indicator */}
        <div className="hidden lg:flex items-center gap-2 bg-[#0B0E11] px-3 py-1.5 rounded-lg border border-[#2A2F36]">
          {isOnline ? (
            <span className="text-[11px] font-mono text-emerald-400 font-bold flex items-center gap-1.5" title="Conectado ao Firebase Firestore com cache local ativo">
              <Cloud className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isFirebaseSynced ? 'FIREBASE SINCRONIZADO' : 'FIREBASE OFFLINE CACHE'}</span>
            </span>
          ) : (
            <span className="text-[11px] font-mono text-amber-400 font-bold flex items-center gap-1.5" title="Sem internet. Dados salvos localmente no dispositivo via Firestore IndexedDB + LocalStorage">
              <CloudOff className="w-3.5 h-3.5 text-amber-400" />
              <span>FIREBASE CACHE LOCAL (100% OFFLINE)</span>
            </span>
          )}
        </div>

        {/* Install PWA Button (if browser prompt available) */}
        {canInstall && !isInstalled && (
          <button
            onClick={handleInstallApp}
            className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-md shadow-cyan-500/20 transition-all cursor-pointer animate-pulse"
            title="Instalar como aplicativo no computador / celular"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Instalar App</span>
          </button>
        )}

        {/* Quick Studio Tools */}
        <div className="hidden md:flex items-center gap-2">
          {onOpenShortcuts && (
            <button
              onClick={onOpenShortcuts}
              className="flex items-center gap-1.5 bg-[#0B0E11] hover:bg-[#1E2329] text-gray-300 hover:text-cyan-400 px-2.5 py-1.5 rounded-lg border border-[#2A2F36] hover:border-cyan-500/50 text-xs transition-colors cursor-pointer"
              title="Atalhos Globais (Ctrl + / ou ?)"
            >
              <Keyboard className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden xl:inline">Atalhos</span>
              <kbd className="text-[9px] font-mono text-gray-400 bg-[#15191E] px-1 rounded border border-[#2A2F36]">?</kbd>
            </button>
          )}
          <button
            onClick={onOpenAnalyzer}
            className="flex items-center gap-1.5 bg-[#0B0E11] hover:bg-[#1E2329] text-gray-300 hover:text-cyan-400 px-3 py-1.5 rounded-lg border border-[#2A2F36] hover:border-cyan-500/50 text-xs transition-colors cursor-pointer"
            title="Analisador FFT (Ctrl + F)"
          >
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>FFT Analyzer</span>
          </button>
          <button
            onClick={onOpenDelayCalc}
            className="flex items-center gap-1.5 bg-[#0B0E11] hover:bg-[#1E2329] text-gray-300 hover:text-orange-400 px-3 py-1.5 rounded-lg border border-[#2A2F36] hover:border-orange-500/50 text-xs transition-colors cursor-pointer"
            title="Calculadora BPM / ms (Ctrl + D)"
          >
            <Clock className="w-3.5 h-3.5 text-orange-400" />
            <span>Delay Calc</span>
          </button>
          {onOpenGitHubExport && (
            <button
              onClick={onOpenGitHubExport}
              className="flex items-center gap-1.5 bg-[#0B0E11] hover:bg-[#1E2329] text-gray-300 hover:text-white px-2.5 py-1.5 rounded-lg border border-cyan-500/40 hover:border-cyan-400 text-xs transition-colors cursor-pointer"
              title="Preparar e Exportar para GitHub / Netlify"
            >
              <Github className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden xl:inline">Exportar</span>
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
