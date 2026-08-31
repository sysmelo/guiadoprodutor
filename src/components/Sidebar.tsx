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
  Calendar
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

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  activeProject,
  projects = [],
  onOpenAnalyzer,
  onOpenDelayCalc,
  onOpenShortcuts
}) => {
  const menuItems: { id: NavigationTab; label: string; icon: React.ElementType; badge?: string; shortcutKey?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, shortcutKey: '^1' },
    { id: 'studio_one', label: 'Studio One 7 & Aux', icon: Waves, badge: 'S1 v7', shortcutKey: '^S' },
    { id: 'recording_schedule', label: 'Agendar Gravação', icon: Calendar, badge: 'Pipeline', shortcutKey: '^G' },
    { id: 'vocal_recording', label: 'Gravação & Tracking', icon: Radio, badge: 'Nível 1', shortcutKey: '^2' },
    { id: 'mix', label: 'Mix & Preparação', icon: Sliders, badge: 'Nível 2', shortcutKey: '^3' },
    { id: 'vocal_cleaning', label: 'Vocal Cleaning', icon: Mic, badge: 'Studio', shortcutKey: '^4' },
    { id: 'master', label: 'Master Suite', icon: Flame, badge: 'Nível 3', shortcutKey: '^5' },
    { id: 'instruments', label: 'Instrumentos', icon: Music, shortcutKey: '^6' },
    { id: 'genres', label: 'Estilos & Kuduro', icon: Globe, badge: 'Kuduro+', shortcutKey: '^7' },
    { id: 'plugins', label: 'Plugins & Arsenal', icon: Plug, shortcutKey: '^8' },
    { id: 'mix_doctor', label: 'Mix Doctor', icon: Stethoscope, badge: 'Alerts', shortcutKey: '^9' },
    { id: 'export', label: 'Exportação & Guia', icon: Share2, badge: 'Nível 4', shortcutKey: '^0' },
    { id: 'projects', label: 'Meus Projetos', icon: FolderKanban, shortcutKey: '^P' },
    { id: 'settings', label: 'Config & Offline', icon: Settings, shortcutKey: '^,' }
  ];

  return (
    <aside className="w-56 sm:w-60 bg-[#15191E] border-r border-[#2A2F36] flex flex-col shrink-0 select-none overflow-hidden h-full">
      {/* Navigation Links */}
      <div className="p-3 space-y-1 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between px-3 py-1.5">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
            Navegação DAW
          </p>
          {onOpenShortcuts && (
            <button
              onClick={onOpenShortcuts}
              title="Ver todos os atalhos de teclado (Ctrl + /)"
              className="text-[10px] text-gray-400 hover:text-cyan-400 font-mono flex items-center gap-1 cursor-pointer"
            >
              <Keyboard className="w-3 h-3" />
              <span>Atalhos</span>
            </button>
          )}
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors cursor-pointer text-left ${
                isActive
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_12px_rgba(6,182,212,0.15)]'
                  : 'text-gray-400 hover:bg-[#1E2329] hover:text-gray-200 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-cyan-400' : 'text-gray-400'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold shrink-0 ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300'
                        : 'bg-[#0B0E11] text-gray-400 border border-[#2A2F36]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {item.shortcutKey && (
                  <span className="text-[9px] font-mono text-gray-600 group-hover:text-gray-400 hidden sm:inline">
                    {item.shortcutKey}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Recent Sessions / Active Project Widget (as in Sleek Interface Design) */}
      <div className="mt-auto p-4 border-t border-[#2A2F36] bg-[#0E1116] space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Sessões Recentes</p>
          <button 
            onClick={() => onTabChange('projects')}
            className="text-[9px] text-cyan-400 hover:underline font-mono cursor-pointer"
          >
            Ver Todas
          </button>
        </div>

        <div className="space-y-2">
          {projects.slice(0, 2).map((proj, idx) => (
            <div
              key={proj.id}
              onClick={() => onTabChange('projects')}
              className={`flex flex-col gap-0.5 p-2 rounded-lg bg-[#0B0E11] border border-[#2A2F36] cursor-pointer hover:border-cyan-500/40 transition-colors ${
                idx > 0 ? 'opacity-60 hover:opacity-100' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-gray-200 truncate">{proj.name}</p>
                <span className="text-[9px] font-mono text-cyan-400">{proj.bpm} BPM</span>
              </div>
              <p className="text-[9px] text-gray-400 truncate">{proj.genre} • {proj.key}</p>
            </div>
          ))}
        </div>

        {/* Studio quick triggers */}
        <div className="grid grid-cols-2 gap-1.5 pt-1">
          <button
            onClick={onOpenAnalyzer}
            className="px-2 py-1.5 rounded bg-[#15191E] hover:bg-[#1E2329] border border-[#2A2F36] text-[10px] font-semibold text-emerald-400 flex items-center justify-center gap-1 transition-colors cursor-pointer"
          >
            <Activity className="w-3 h-3" />
            <span>FFT (^F)</span>
          </button>
          <button
            onClick={onOpenDelayCalc}
            className="px-2 py-1.5 rounded bg-[#15191E] hover:bg-[#1E2329] border border-[#2A2F36] text-[10px] font-semibold text-orange-400 flex items-center justify-center gap-1 transition-colors cursor-pointer"
          >
            <Clock className="w-3 h-3" />
            <span>Delay (^D)</span>
          </button>
        </div>
      </div>
    </aside>
  );
};


