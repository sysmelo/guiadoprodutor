import React from 'react';
import {
  LayoutDashboard,
  Sliders,
  Mic,
  Music,
  Flame,
  Globe,
  Plug,
  Stethoscope,
  Share2,
  FolderKanban,
  Settings,
  Activity,
  Clock,
  Radio,
  Keyboard,
  Waves,
  Calendar,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { NavigationTab, Project } from '../types';

interface SidebarProps {
  currentTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  activeProject: Project | null;
  projects?: Project[];
  onOpenAnalyzer: () => void;
  onOpenDelayCalc: () => void;
  onOpenShortcuts?: () => void;
}

interface SidebarItemConfig {
  id: NavigationTab;
  label: string;
  icon: React.ElementType;
  badge?: string;
  shortcutKey?: string;
  glowColor: string;
  activeClass: string;
  activeIndicator: string;
  activeIconBox: string;
  activeBadge: string;
  hoverClass: string;
  idleIconBox: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  activeProject,
  projects = [],
  onOpenAnalyzer,
  onOpenDelayCalc,
  onOpenShortcuts
}) => {
  const sections: { title: string; items: SidebarItemConfig[] }[] = [
    {
      title: 'PRODUÇÃO & FLUXO DAW',
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard Central',
          icon: LayoutDashboard,
          shortcutKey: '^1',
          glowColor: 'rgba(6,182,212,0.35)',
          activeClass: 'bg-gradient-to-r from-cyan-500/25 via-cyan-500/12 to-cyan-500/5 border-cyan-400 text-white font-extrabold shadow-[0_0_20px_rgba(6,182,212,0.35)]',
          activeIndicator: 'bg-cyan-400 shadow-[0_0_10px_#06b6d4]',
          activeIconBox: 'bg-gradient-to-br from-cyan-500/40 to-cyan-900/60 text-cyan-300 border-cyan-400/80 shadow-[0_0_12px_rgba(6,182,212,0.4)]',
          activeBadge: 'bg-cyan-500/25 text-cyan-200 border-cyan-400/60 shadow-[0_0_8px_rgba(6,182,212,0.3)]',
          hoverClass: 'hover:bg-gradient-to-r hover:from-cyan-500/12 hover:to-transparent hover:border-cyan-500/40 hover:text-cyan-200 hover:shadow-[0_0_14px_rgba(6,182,212,0.2)]',
          idleIconBox: 'bg-[#151920] text-cyan-400 border-[#242A34] group-hover:border-cyan-500/50 group-hover:text-cyan-300'
        },
        {
          id: 'studio_one',
          label: 'Studio One 7 & Aux',
          icon: Waves,
          badge: 'S1 v7',
          shortcutKey: '^S',
          glowColor: 'rgba(168,85,247,0.35)',
          activeClass: 'bg-gradient-to-r from-purple-500/25 via-purple-500/12 to-purple-500/5 border-purple-400 text-white font-extrabold shadow-[0_0_20px_rgba(168,85,247,0.35)]',
          activeIndicator: 'bg-purple-400 shadow-[0_0_10px_#a855f7]',
          activeIconBox: 'bg-gradient-to-br from-purple-500/40 to-purple-900/60 text-purple-300 border-purple-400/80 shadow-[0_0_12px_rgba(168,85,247,0.4)]',
          activeBadge: 'bg-purple-500/25 text-purple-200 border-purple-400/60 shadow-[0_0_8px_rgba(168,85,247,0.3)]',
          hoverClass: 'hover:bg-gradient-to-r hover:from-purple-500/12 hover:to-transparent hover:border-purple-500/40 hover:text-purple-200 hover:shadow-[0_0_14px_rgba(168,85,247,0.2)]',
          idleIconBox: 'bg-[#151920] text-purple-400 border-[#242A34] group-hover:border-purple-500/50 group-hover:text-purple-300'
        },
        {
          id: 'recording_schedule',
          label: 'Agendar Gravação',
          icon: Calendar,
          badge: 'Agenda',
          shortcutKey: '^G',
          glowColor: 'rgba(14,165,233,0.35)',
          activeClass: 'bg-gradient-to-r from-sky-500/25 via-sky-500/12 to-sky-500/5 border-sky-400 text-white font-extrabold shadow-[0_0_20px_rgba(14,165,233,0.35)]',
          activeIndicator: 'bg-sky-400 shadow-[0_0_10px_#0ea5e9]',
          activeIconBox: 'bg-gradient-to-br from-sky-500/40 to-sky-900/60 text-sky-300 border-sky-400/80 shadow-[0_0_12px_rgba(14,165,233,0.4)]',
          activeBadge: 'bg-sky-500/25 text-sky-200 border-sky-400/60 shadow-[0_0_8px_rgba(14,165,233,0.3)]',
          hoverClass: 'hover:bg-gradient-to-r hover:from-sky-500/12 hover:to-transparent hover:border-sky-500/40 hover:text-sky-200 hover:shadow-[0_0_14px_rgba(14,165,233,0.2)]',
          idleIconBox: 'bg-[#151920] text-sky-400 border-[#242A34] group-hover:border-sky-500/50 group-hover:text-sky-300'
        },
        {
          id: 'vocal_recording',
          label: 'Gravação & Tracking',
          icon: Radio,
          badge: 'Nível 1',
          shortcutKey: '^2',
          glowColor: 'rgba(244,63,94,0.35)',
          activeClass: 'bg-gradient-to-r from-rose-500/25 via-rose-500/12 to-rose-500/5 border-rose-400 text-white font-extrabold shadow-[0_0_20px_rgba(244,63,94,0.35)]',
          activeIndicator: 'bg-rose-400 shadow-[0_0_10px_#f43f5e]',
          activeIconBox: 'bg-gradient-to-br from-rose-500/40 to-rose-900/60 text-rose-300 border-rose-400/80 shadow-[0_0_12px_rgba(244,63,94,0.4)]',
          activeBadge: 'bg-rose-500/25 text-rose-200 border-rose-400/60 shadow-[0_0_8px_rgba(244,63,94,0.3)]',
          hoverClass: 'hover:bg-gradient-to-r hover:from-rose-500/12 hover:to-transparent hover:border-rose-500/40 hover:text-rose-200 hover:shadow-[0_0_14px_rgba(244,63,94,0.2)]',
          idleIconBox: 'bg-[#151920] text-rose-400 border-[#242A34] group-hover:border-rose-500/50 group-hover:text-rose-300'
        },
        {
          id: 'mix',
          label: 'Mix & Preparação',
          icon: Sliders,
          badge: 'Nível 2',
          shortcutKey: '^3',
          glowColor: 'rgba(245,158,11,0.35)',
          activeClass: 'bg-gradient-to-r from-amber-500/25 via-amber-500/12 to-amber-500/5 border-amber-400 text-white font-extrabold shadow-[0_0_20px_rgba(245,158,11,0.35)]',
          activeIndicator: 'bg-amber-400 shadow-[0_0_10px_#f59e0b]',
          activeIconBox: 'bg-gradient-to-br from-amber-500/40 to-amber-900/60 text-amber-300 border-amber-400/80 shadow-[0_0_12px_rgba(245,158,11,0.4)]',
          activeBadge: 'bg-amber-500/25 text-amber-200 border-amber-400/60 shadow-[0_0_8px_rgba(245,158,11,0.3)]',
          hoverClass: 'hover:bg-gradient-to-r hover:from-amber-500/12 hover:to-transparent hover:border-amber-500/40 hover:text-amber-200 hover:shadow-[0_0_14px_rgba(245,158,11,0.2)]',
          idleIconBox: 'bg-[#151920] text-amber-400 border-[#242A34] group-hover:border-amber-500/50 group-hover:text-amber-300'
        },
        {
          id: 'vocal_cleaning',
          label: 'Vocal Cleaning',
          icon: Mic,
          badge: 'Vocal',
          shortcutKey: '^4',
          glowColor: 'rgba(16,185,129,0.35)',
          activeClass: 'bg-gradient-to-r from-emerald-500/25 via-emerald-500/12 to-emerald-500/5 border-emerald-400 text-white font-extrabold shadow-[0_0_20px_rgba(16,185,129,0.35)]',
          activeIndicator: 'bg-emerald-400 shadow-[0_0_10px_#10b981]',
          activeIconBox: 'bg-gradient-to-br from-emerald-500/40 to-emerald-900/60 text-emerald-300 border-emerald-400/80 shadow-[0_0_12px_rgba(16,185,129,0.4)]',
          activeBadge: 'bg-emerald-500/25 text-emerald-200 border-emerald-400/60 shadow-[0_0_8px_rgba(16,185,129,0.3)]',
          hoverClass: 'hover:bg-gradient-to-r hover:from-emerald-500/12 hover:to-transparent hover:border-emerald-500/40 hover:text-emerald-200 hover:shadow-[0_0_14px_rgba(16,185,129,0.2)]',
          idleIconBox: 'bg-[#151920] text-emerald-400 border-[#242A34] group-hover:border-emerald-500/50 group-hover:text-emerald-300'
        },
        {
          id: 'master',
          label: 'Master Suite',
          icon: Flame,
          badge: 'Nível 3',
          shortcutKey: '^5',
          glowColor: 'rgba(217,70,239,0.35)',
          activeClass: 'bg-gradient-to-r from-fuchsia-500/25 via-fuchsia-500/12 to-fuchsia-500/5 border-fuchsia-400 text-white font-extrabold shadow-[0_0_20px_rgba(217,70,239,0.35)]',
          activeIndicator: 'bg-fuchsia-400 shadow-[0_0_10px_#d946ef]',
          activeIconBox: 'bg-gradient-to-br from-fuchsia-500/40 to-fuchsia-900/60 text-fuchsia-300 border-fuchsia-400/80 shadow-[0_0_12px_rgba(217,70,239,0.4)]',
          activeBadge: 'bg-fuchsia-500/25 text-fuchsia-200 border-fuchsia-400/60 shadow-[0_0_8px_rgba(217,70,239,0.3)]',
          hoverClass: 'hover:bg-gradient-to-r hover:from-fuchsia-500/12 hover:to-transparent hover:border-fuchsia-500/40 hover:text-fuchsia-200 hover:shadow-[0_0_14px_rgba(217,70,239,0.2)]',
          idleIconBox: 'bg-[#151920] text-fuchsia-400 border-[#242A34] group-hover:border-fuchsia-500/50 group-hover:text-fuchsia-300'
        }
      ]
    },
    {
      title: 'PRESETS & ARSENAL',
      items: [
        {
          id: 'instruments',
          label: 'Instrumentos',
          icon: Music,
          shortcutKey: '^6',
          glowColor: 'rgba(234,179,8,0.35)',
          activeClass: 'bg-gradient-to-r from-yellow-500/25 via-yellow-500/12 to-yellow-500/5 border-yellow-400 text-white font-extrabold shadow-[0_0_20px_rgba(234,179,8,0.35)]',
          activeIndicator: 'bg-yellow-400 shadow-[0_0_10px_#eab308]',
          activeIconBox: 'bg-gradient-to-br from-yellow-500/40 to-yellow-900/60 text-yellow-300 border-yellow-400/80 shadow-[0_0_12px_rgba(234,179,8,0.4)]',
          activeBadge: 'bg-yellow-500/25 text-yellow-200 border-yellow-400/60 shadow-[0_0_8px_rgba(234,179,8,0.3)]',
          hoverClass: 'hover:bg-gradient-to-r hover:from-yellow-500/12 hover:to-transparent hover:border-yellow-500/40 hover:text-yellow-200 hover:shadow-[0_0_14px_rgba(234,179,8,0.2)]',
          idleIconBox: 'bg-[#151920] text-yellow-400 border-[#242A34] group-hover:border-yellow-500/50 group-hover:text-yellow-300'
        },
        {
          id: 'genres',
          label: 'Estilos & Kuduro 🇦🇴',
          icon: Globe,
          badge: 'Kuduro',
          shortcutKey: '^7',
          glowColor: 'rgba(249,115,22,0.35)',
          activeClass: 'bg-gradient-to-r from-orange-500/25 via-orange-500/12 to-orange-500/5 border-orange-400 text-white font-extrabold shadow-[0_0_20px_rgba(249,115,22,0.35)]',
          activeIndicator: 'bg-orange-400 shadow-[0_0_10px_#f97316]',
          activeIconBox: 'bg-gradient-to-br from-orange-500/40 to-orange-900/60 text-orange-300 border-orange-400/80 shadow-[0_0_12px_rgba(249,115,22,0.4)]',
          activeBadge: 'bg-orange-500/25 text-orange-200 border-orange-400/60 shadow-[0_0_8px_rgba(249,115,22,0.3)]',
          hoverClass: 'hover:bg-gradient-to-r hover:from-orange-500/12 hover:to-transparent hover:border-orange-500/40 hover:text-orange-200 hover:shadow-[0_0_14px_rgba(249,115,22,0.2)]',
          idleIconBox: 'bg-[#151920] text-orange-400 border-[#242A34] group-hover:border-orange-500/50 group-hover:text-orange-300'
        },
        {
          id: 'plugins',
          label: 'Plugins & Arsenal',
          icon: Plug,
          shortcutKey: '^8',
          glowColor: 'rgba(99,102,241,0.35)',
          activeClass: 'bg-gradient-to-r from-indigo-500/25 via-indigo-500/12 to-indigo-500/5 border-indigo-400 text-white font-extrabold shadow-[0_0_20px_rgba(99,102,241,0.35)]',
          activeIndicator: 'bg-indigo-400 shadow-[0_0_10px_#6366f1]',
          activeIconBox: 'bg-gradient-to-br from-indigo-500/40 to-indigo-900/60 text-indigo-300 border-indigo-400/80 shadow-[0_0_12px_rgba(99,102,241,0.4)]',
          activeBadge: 'bg-indigo-500/25 text-indigo-200 border-indigo-400/60 shadow-[0_0_8px_rgba(99,102,241,0.3)]',
          hoverClass: 'hover:bg-gradient-to-r hover:from-indigo-500/12 hover:to-transparent hover:border-indigo-500/40 hover:text-indigo-200 hover:shadow-[0_0_14px_rgba(99,102,241,0.2)]',
          idleIconBox: 'bg-[#151920] text-indigo-400 border-[#242A34] group-hover:border-indigo-500/50 group-hover:text-indigo-300'
        },
        {
          id: 'mix_doctor',
          label: 'Mix Doctor',
          icon: Stethoscope,
          badge: 'Alerts',
          shortcutKey: '^9',
          glowColor: 'rgba(239,68,68,0.35)',
          activeClass: 'bg-gradient-to-r from-red-500/25 via-red-500/12 to-red-500/5 border-red-400 text-white font-extrabold shadow-[0_0_20px_rgba(239,68,68,0.35)]',
          activeIndicator: 'bg-red-400 shadow-[0_0_10px_#ef4444]',
          activeIconBox: 'bg-gradient-to-br from-red-500/40 to-red-900/60 text-red-300 border-red-400/80 shadow-[0_0_12px_rgba(239,68,68,0.4)]',
          activeBadge: 'bg-red-500/25 text-red-200 border-red-400/60 shadow-[0_0_8px_rgba(239,68,68,0.3)]',
          hoverClass: 'hover:bg-gradient-to-r hover:from-red-500/12 hover:to-transparent hover:border-red-500/40 hover:text-red-200 hover:shadow-[0_0_14px_rgba(239,68,68,0.2)]',
          idleIconBox: 'bg-[#151920] text-red-400 border-[#242A34] group-hover:border-red-500/50 group-hover:text-red-300'
        },
        {
          id: 'export',
          label: 'Exportação & Guia',
          icon: Share2,
          badge: 'Nível 4',
          shortcutKey: '^0',
          glowColor: 'rgba(20,184,166,0.35)',
          activeClass: 'bg-gradient-to-r from-teal-500/25 via-teal-500/12 to-teal-500/5 border-teal-400 text-white font-extrabold shadow-[0_0_20px_rgba(20,184,166,0.35)]',
          activeIndicator: 'bg-teal-400 shadow-[0_0_10px_#14b8a6]',
          activeIconBox: 'bg-gradient-to-br from-teal-500/40 to-teal-900/60 text-teal-300 border-teal-400/80 shadow-[0_0_12px_rgba(20,184,166,0.4)]',
          activeBadge: 'bg-teal-500/25 text-teal-200 border-teal-400/60 shadow-[0_0_8px_rgba(20,184,166,0.3)]',
          hoverClass: 'hover:bg-gradient-to-r hover:from-teal-500/12 hover:to-transparent hover:border-teal-500/40 hover:text-teal-200 hover:shadow-[0_0_14px_rgba(20,184,166,0.2)]',
          idleIconBox: 'bg-[#151920] text-teal-400 border-[#242A34] group-hover:border-teal-500/50 group-hover:text-teal-300'
        }
      ]
    },
    {
      title: 'GESTÃO & BACKUP',
      items: [
        {
          id: 'projects',
          label: 'Meus Projetos',
          icon: FolderKanban,
          shortcutKey: '^P',
          glowColor: 'rgba(59,130,246,0.35)',
          activeClass: 'bg-gradient-to-r from-blue-500/25 via-blue-500/12 to-blue-500/5 border-blue-400 text-white font-extrabold shadow-[0_0_20px_rgba(59,130,246,0.35)]',
          activeIndicator: 'bg-blue-400 shadow-[0_0_10px_#3b82f6]',
          activeIconBox: 'bg-gradient-to-br from-blue-500/40 to-blue-900/60 text-blue-300 border-blue-400/80 shadow-[0_0_12px_rgba(59,130,246,0.4)]',
          activeBadge: 'bg-blue-500/25 text-blue-200 border-blue-400/60 shadow-[0_0_8px_rgba(59,130,246,0.3)]',
          hoverClass: 'hover:bg-gradient-to-r hover:from-blue-500/12 hover:to-transparent hover:border-blue-500/40 hover:text-blue-200 hover:shadow-[0_0_14px_rgba(59,130,246,0.2)]',
          idleIconBox: 'bg-[#151920] text-blue-400 border-[#242A34] group-hover:border-blue-500/50 group-hover:text-blue-300'
        },
        {
          id: 'settings',
          label: 'Config & Backup Offline',
          icon: Settings,
          badge: '100%',
          shortcutKey: '^,',
          glowColor: 'rgba(132,204,22,0.35)',
          activeClass: 'bg-gradient-to-r from-lime-500/25 via-lime-500/12 to-lime-500/5 border-lime-400 text-white font-extrabold shadow-[0_0_20px_rgba(132,204,22,0.35)]',
          activeIndicator: 'bg-lime-400 shadow-[0_0_10px_#84cc16]',
          activeIconBox: 'bg-gradient-to-br from-lime-500/40 to-lime-900/60 text-lime-300 border-lime-400/80 shadow-[0_0_12px_rgba(132,204,22,0.4)]',
          activeBadge: 'bg-lime-500/25 text-lime-200 border-lime-400/60 shadow-[0_0_8px_rgba(132,204,22,0.3)]',
          hoverClass: 'hover:bg-gradient-to-r hover:from-lime-500/12 hover:to-transparent hover:border-lime-500/40 hover:text-lime-200 hover:shadow-[0_0_14px_rgba(132,204,22,0.2)]',
          idleIconBox: 'bg-[#151920] text-lime-400 border-[#242A34] group-hover:border-lime-500/50 group-hover:text-lime-300'
        }
      ]
    }
  ];

  return (
    <aside className="w-56 sm:w-64 bg-[#0E1116] border-r border-[#222731] flex flex-col shrink-0 select-none overflow-hidden h-full shadow-2xl">
      {/* Navigation Links with Glowing Buttons */}
      <div className="p-2.5 space-y-3.5 flex-1 overflow-y-auto custom-scrollbar">
        {sections.map((sec, secIdx) => (
          <div key={sec.title} className="space-y-1">
            <div className="flex items-center justify-between px-2 py-1">
              <span className="text-[9px] text-gray-500 tracking-wider font-extrabold uppercase">
                {sec.title}
              </span>
              {secIdx === 0 && onOpenShortcuts && (
                <button
                  onClick={onOpenShortcuts}
                  title="Ver todos os atalhos de teclado (Ctrl + /)"
                  className="text-[9px] text-gray-400 hover:text-cyan-400 font-mono flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Keyboard className="w-3 h-3 text-cyan-400" />
                  <span>Atalhos</span>
                </button>
              )}
            </div>

            <div className="space-y-1">
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`group relative w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-all duration-150 cursor-pointer text-left border ${
                      isActive
                        ? `${item.activeClass}`
                        : `text-gray-400 bg-[#13161D] border-[#1F242E] ${item.hoverClass}`
                    }`}
                  >
                    {/* Glowing Left Neon Indicator Pill */}
                    {isActive && (
                      <div className={`absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full ${item.activeIndicator}`} />
                    )}

                    <div className="flex items-center gap-2.5 min-w-0 pl-1">
                      {/* Stylized Icon Container with Glow */}
                      <div className={`p-1.5 rounded-lg border transition-all shrink-0 ${
                        isActive
                          ? item.activeIconBox
                          : item.idleIconBox
                      }`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>

                      <span className={`truncate text-xs ${
                        isActive ? 'text-white font-bold tracking-tight' : 'text-gray-300 font-medium group-hover:text-white'
                      }`}>
                        {item.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 ml-1">
                      {item.badge && (
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold shrink-0 border transition-all ${
                            isActive
                              ? item.activeBadge
                              : 'bg-[#0B0E11] text-gray-400 border-[#242A34] group-hover:border-gray-600 group-hover:text-gray-200'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      {item.shortcutKey && (
                        <span className="text-[9px] font-mono text-gray-600 hidden lg:inline group-hover:text-gray-400">
                          {item.shortcutKey}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Sessions / Active Project Footer Widget */}
      <div className="mt-auto p-3 border-t border-[#222731] bg-[#0A0C10] space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-[9px] text-gray-500 tracking-wider font-extrabold uppercase">Sessões Ativas</span>
          <button 
            onClick={() => onTabChange('projects')}
            className="text-[9px] text-cyan-400 hover:text-cyan-300 font-mono font-bold cursor-pointer transition-colors flex items-center gap-0.5"
          >
            <span>Ver Todas ({projects.length})</span>
            <ChevronRight className="w-2.5 h-2.5" />
          </button>
        </div>

        {projects.length > 0 ? (
          <div className="space-y-1.5">
            {projects.slice(0, 2).map((proj) => {
              const isSelected = activeProject?.id === proj.id;
              return (
                <div
                  key={proj.id}
                  onClick={() => onTabChange('projects')}
                  className={`flex flex-col gap-0.5 p-2 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-500/20 to-[#121620] border-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                      : 'bg-[#12151B] border-[#1F242E] hover:border-gray-600 opacity-85 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className={`text-xs font-bold truncate ${isSelected ? 'text-cyan-300' : 'text-gray-300'}`}>
                      {proj.name}
                    </p>
                    <span className="text-[9px] font-mono text-emerald-400 font-bold">{proj.bpm} BPM</span>
                  </div>
                  <p className="text-[9px] text-gray-400 truncate font-mono">
                    {proj.genre} • {proj.key}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-2 rounded-xl bg-[#12151B] border border-[#1F242E] text-[10px] text-gray-500 text-center">
            Nenhum projeto aberto
          </div>
        )}

        {/* Quick Studio Triggers */}
        <div className="grid grid-cols-2 gap-1.5 pt-0.5">
          <button
            onClick={onOpenAnalyzer}
            className="px-2 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 hover:from-emerald-500/20 hover:to-emerald-500/10 border border-emerald-500/30 hover:border-emerald-400 text-[10px] font-bold text-emerald-300 flex items-center justify-center gap-1.5 transition-all shadow-sm hover:shadow-[0_0_12px_rgba(16,185,129,0.25)] cursor-pointer"
          >
            <Activity className="w-3 h-3 text-emerald-400" />
            <span>FFT RTA</span>
          </button>
          <button
            onClick={onOpenDelayCalc}
            className="px-2 py-1.5 rounded-lg bg-gradient-to-r from-amber-500/10 to-amber-500/5 hover:from-amber-500/20 hover:to-amber-500/10 border border-amber-500/30 hover:border-amber-400 text-[10px] font-bold text-amber-300 flex items-center justify-center gap-1.5 transition-all shadow-sm hover:shadow-[0_0_12px_rgba(245,158,11,0.25)] cursor-pointer"
          >
            <Clock className="w-3 h-3 text-amber-400" />
            <span>Delay MS</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
