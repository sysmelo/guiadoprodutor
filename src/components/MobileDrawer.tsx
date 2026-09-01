import React from 'react';
import {
  X,
  LayoutDashboard,
  Waves,
  Calendar,
  Radio,
  Sliders,
  Mic,
  Flame,
  Music,
  Globe,
  Plug,
  Stethoscope,
  Share2,
  FolderKanban,
  Settings,
  Activity,
  Clock,
  Keyboard,
  Disc3,
  Cloud,
  CloudOff,
  Download,
  ChevronRight
} from 'lucide-react';
import { NavigationTab, Project } from '../types';
import { usePWA } from '../hooks/usePWA';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  activeProject: Project | null;
  projects: Project[];
  isFirebaseSynced?: boolean;
  onSelectProject: (id: string) => void;
  onOpenAnalyzer: () => void;
  onOpenDelayCalc: () => void;
  onOpenShortcuts?: () => void;
}

interface DrawerItem {
  id: NavigationTab;
  label: string;
  icon: React.ElementType;
  badge?: string;
  colorClass: string;
  activeBg: string;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  currentTab,
  onTabChange,
  activeProject,
  projects,
  isFirebaseSynced = false,
  onSelectProject,
  onOpenAnalyzer,
  onOpenDelayCalc,
  onOpenShortcuts
}) => {
  const { isOnline, isInstalled, canInstall, handleInstallApp } = usePWA();

  if (!isOpen) return null;

  const sections: { title: string; items: DrawerItem[] }[] = [
    {
      title: 'PRODUÇÃO & FLUXO DAW',
      items: [
        { id: 'dashboard', label: 'Dashboard Central', icon: LayoutDashboard, colorClass: 'text-cyan-400', activeBg: 'bg-cyan-500/20 border-cyan-400 text-white' },
        { id: 'studio_one', label: 'Studio One 7 & Aux', icon: Waves, badge: 'S1 v7', colorClass: 'text-purple-400', activeBg: 'bg-purple-500/20 border-purple-400 text-white' },
        { id: 'recording_schedule', label: 'Agendar Gravação', icon: Calendar, badge: 'Agenda', colorClass: 'text-sky-400', activeBg: 'bg-sky-500/20 border-sky-400 text-white' },
        { id: 'vocal_recording', label: 'Gravação & Tracking', icon: Radio, badge: 'Nível 1', colorClass: 'text-rose-400', activeBg: 'bg-rose-500/20 border-rose-400 text-white' },
        { id: 'mix', label: 'Mix & Preparação', icon: Sliders, badge: 'Nível 2', colorClass: 'text-amber-400', activeBg: 'bg-amber-500/20 border-amber-400 text-white' },
        { id: 'vocal_cleaning', label: 'Vocal Cleaning Studio', icon: Mic, badge: 'Vocal', colorClass: 'text-emerald-400', activeBg: 'bg-emerald-500/20 border-emerald-400 text-white' },
        { id: 'master', label: 'Master Suite', icon: Flame, badge: 'Nível 3', colorClass: 'text-fuchsia-400', activeBg: 'bg-fuchsia-500/20 border-fuchsia-400 text-white' }
      ]
    },
    {
      title: 'PRESETS & ARSENAL',
      items: [
        { id: 'instruments', label: 'Instrumentos & Pistas', icon: Music, colorClass: 'text-yellow-400', activeBg: 'bg-yellow-500/20 border-yellow-400 text-white' },
        { id: 'genres', label: 'Estilos & Kuduro 🇦🇴', icon: Globe, badge: 'Kuduro', colorClass: 'text-orange-400', activeBg: 'bg-orange-500/20 border-orange-400 text-white' },
        { id: 'plugins', label: 'Plugins & Arsenal', icon: Plug, colorClass: 'text-indigo-400', activeBg: 'bg-indigo-500/20 border-indigo-400 text-white' },
        { id: 'mix_doctor', label: 'Mix Doctor (Diagnóstico)', icon: Stethoscope, badge: 'Alerts', colorClass: 'text-red-400', activeBg: 'bg-red-500/20 border-red-400 text-white' },
        { id: 'export', label: 'Exportação & Guia', icon: Share2, badge: 'Nível 4', colorClass: 'text-teal-400', activeBg: 'bg-teal-500/20 border-teal-400 text-white' }
      ]
    },
    {
      title: 'GESTÃO & BACKUP',
      items: [
        { id: 'projects', label: 'Meus Projetos', icon: FolderKanban, colorClass: 'text-blue-400', activeBg: 'bg-blue-500/20 border-blue-400 text-white' },
        { id: 'settings', label: 'Config & Backup Offline', icon: Settings, badge: '100%', colorClass: 'text-lime-400', activeBg: 'bg-lime-500/20 border-lime-400 text-white' }
      ]
    }
  ];

  const handleSelectTab = (tab: NavigationTab) => {
    onTabChange(tab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Backdrop tap to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Panel */}
      <div 
        className="relative bg-[#0E1116] border-t border-[#2A2F36] rounded-t-3xl shadow-2xl flex flex-col max-h-[88vh] z-10 overflow-hidden animate-in slide-in-from-bottom duration-200"
        style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      >
        {/* Drag handle & Header */}
        <div className="p-4 border-b border-[#222731] bg-[#12151B] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              <Disc3 className="w-5 h-5 text-white animate-[spin_12s_linear_infinite]" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-white">
                MELO <span className="text-cyan-400">STUDIO SUITE</span>
              </h2>
              <p className="text-[10px] text-gray-400 font-mono">MENU COMPLETO DE NAVEGAÇÃO</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#1A1F27] hover:bg-[#252B36] text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Utilities Row */}
        <div className="p-3 bg-[#0B0E11] border-b border-[#222731] grid grid-cols-3 gap-2 shrink-0">
          <button
            onClick={() => {
              onClose();
              onOpenAnalyzer();
            }}
            className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-bold cursor-pointer"
          >
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>FFT RTA</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenDelayCalc();
            }}
            className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-300 text-[11px] font-bold cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5 text-orange-400" />
            <span>Delay MS</span>
          </button>

          {onOpenShortcuts && (
            <button
              onClick={() => {
                onClose();
                onOpenShortcuts();
              }}
              className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[11px] font-bold cursor-pointer"
            >
              <Keyboard className="w-3.5 h-3.5 text-purple-400" />
              <span>Atalhos</span>
            </button>
          )}
        </div>

        {/* Active Project Switcher on Mobile */}
        {projects.length > 0 && (
          <div className="px-4 py-2.5 bg-[#12151B] border-b border-[#222731] flex items-center justify-between gap-3 shrink-0">
            <span className="text-[10px] text-gray-400 font-mono uppercase font-bold shrink-0">
              Projeto Ativo:
            </span>
            <select
              value={activeProject?.id || ''}
              onChange={(e) => onSelectProject(e.target.value)}
              className="bg-[#0B0E11] text-xs font-bold text-cyan-300 border border-[#2A2F36] rounded-lg px-2.5 py-1.5 focus:outline-none w-full max-w-[200px] truncate"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id} className="bg-[#15191E] text-white">
                  {p.name} ({p.bpm} BPM)
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Scrollable Navigation Sections */}
        <div className="p-4 space-y-4 overflow-y-auto flex-1 custom-scrollbar">
          {sections.map((sec) => (
            <div key={sec.title} className="space-y-1.5">
              <span className="text-[9px] text-gray-500 tracking-wider font-extrabold uppercase px-2 block">
                {sec.title}
              </span>
              <div className="grid grid-cols-1 gap-1">
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectTab(item.id)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                        isActive
                          ? `${item.activeBg} font-bold shadow-md`
                          : 'bg-[#13161D] border-[#1F242E] text-gray-300 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-lg bg-[#0B0E11] border border-[#242A34] ${item.colorClass}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-medium">{item.label}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {item.badge && (
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#0B0E11] text-gray-400 border border-[#2A2F36]">
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Offline / Cloud Status Badge */}
          <div className="p-3 rounded-xl bg-[#0B0E11] border border-[#222731] flex items-center justify-between text-xs mt-2">
            <span className="text-gray-400 font-mono text-[10px]">Sincronização</span>
            {isOnline ? (
              <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                <Cloud className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isFirebaseSynced ? 'Firebase Conectado' : 'Modo Cache'}</span>
              </span>
            ) : (
              <span className="text-[10px] font-mono text-amber-400 font-bold flex items-center gap-1.5">
                <CloudOff className="w-3.5 h-3.5 text-amber-400" />
                <span>100% Offline (Local)</span>
              </span>
            )}
          </div>

          {/* PWA Install in Drawer */}
          {canInstall && !isInstalled && (
            <button
              onClick={() => {
                onClose();
                handleInstallApp();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Instalar Aplicativo no Telemóvel</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
