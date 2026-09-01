import React from 'react';
import { 
  LayoutDashboard, 
  Radio, 
  Sliders, 
  Flame, 
  Menu,
  Music,
  FolderKanban,
  Stethoscope
} from 'lucide-react';
import { NavigationTab } from '../types';

interface MobileBottomNavProps {
  currentTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  onOpenMenu: () => void;
  isMenuOpen: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onTabChange,
  onOpenMenu,
  isMenuOpen
}) => {
  const primaryTabs: { id: NavigationTab; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Início', icon: LayoutDashboard },
    { id: 'vocal_recording', label: 'Gravação', icon: Radio },
    { id: 'mix', label: 'Mixagem', icon: Sliders },
    { id: 'master', label: 'Master', icon: Flame },
  ];

  const isMoreTabActive = !primaryTabs.some(t => t.id === currentTab);

  return (
    <nav 
      aria-label="Navegação móvel" 
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0E1116]/95 backdrop-blur-xl border-t border-[#222731] px-2 py-1.5 shadow-[0_-4px_25px_rgba(0,0,0,0.6)]"
      style={{ paddingBottom: 'max(0.375rem, env(safe-area-inset-bottom))' }}
    >
      <div className="grid grid-cols-5 items-center max-w-lg mx-auto">
        {primaryTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id && !isMenuOpen;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer min-h-[48px] ${
                isActive
                  ? 'text-cyan-400 font-bold'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <div className={`p-1.5 rounded-lg transition-all ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.35)]'
                  : 'text-gray-400'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[64px]">
                {tab.label}
              </span>
            </button>
          );
        })}

        {/* Menu / Mais button */}
        <button
          onClick={onOpenMenu}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer min-h-[48px] ${
            isMenuOpen || isMoreTabActive
              ? 'text-purple-400 font-bold'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <div className={`p-1.5 rounded-lg transition-all relative ${
            isMenuOpen || isMoreTabActive
              ? 'bg-purple-500/20 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.35)]'
              : 'text-gray-400'
          }`}>
            <Menu className="w-5 h-5" />
            {isMoreTabActive && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-purple-400 animate-pulse ring-2 ring-[#0E1116]" />
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[64px]">
            {isMoreTabActive ? 'Outros' : 'Menu'}
          </span>
        </button>
      </div>
    </nav>
  );
};
