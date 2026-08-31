import React, { useState, useEffect } from 'react';
import { NavigationTab, Project } from './types';
import { getSavedProjects, saveProjects, getActiveProjectId, setActiveProjectId, defaultDemoProjects } from './utils/audioCalculator';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { VocalRecordingView } from './components/VocalRecordingView';
import { MixView } from './components/MixView';
import { VocalCleaningView } from './components/VocalCleaningView';
import { InstrumentsView } from './components/InstrumentsView';
import { GenresView } from './components/GenresView';
import { MasterView } from './components/MasterView';
import { PluginsView } from './components/PluginsView';
import { MixDoctorView } from './components/MixDoctorView';
import { ExportView } from './components/ExportView';
import { ProjectsView } from './components/ProjectsView';
import { SettingsOfflineView } from './components/SettingsOfflineView';
import { StudioOneWorkflowView } from './components/StudioOneWorkflowView';
import { RecordingScheduleView } from './components/RecordingScheduleView';
import { AudioAnalyzerModal } from './components/AudioAnalyzerModal';
import { DelayCalculatorModal } from './components/DelayCalculatorModal';
import { ShortcutsModal } from './components/ShortcutsModal';
import { GitHubExportModal } from './components/GitHubExportModal';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [projects, setProjects] = useState<Project[]>(() => getSavedProjects());
  const [activeProjectId, setActiveId] = useState<string>(() => getActiveProjectId());

  // Modals
  const [isAnalyzerOpen, setIsAnalyzerOpen] = useState<boolean>(false);
  const [isDelayCalcOpen, setIsDelayCalcOpen] = useState<boolean>(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState<boolean>(false);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState<boolean>(false);

  // Global Keyboard Shortcuts (Ctrl/Cmd + 1-9, 0, P, comma, F, D, /, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const isCmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      // Ignore shortcuts if the user is typing in an input or textarea
      const activeElem = document.activeElement;
      const isInput = activeElem && (activeElem.tagName === 'INPUT' || activeElem.tagName === 'TEXTAREA' || (activeElem as HTMLElement).isContentEditable);

      // Escape always closes any open modal
      if (e.key === 'Escape') {
        setIsAnalyzerOpen(false);
        setIsDelayCalcOpen(false);
        setIsShortcutsOpen(false);
        return;
      }

      // '?' key opens shortcuts sheet if not typing in an input
      if (!isInput && (e.key === '?' || (isCmdOrCtrl && e.key === '/'))) {
        e.preventDefault();
        setIsShortcutsOpen(prev => !prev);
        return;
      }

      if (isCmdOrCtrl) {
        switch (e.key) {
          case '1':
            e.preventDefault();
            setCurrentTab('dashboard');
            break;
          case '2':
            e.preventDefault();
            setCurrentTab('vocal_recording');
            break;
          case '3':
            e.preventDefault();
            setCurrentTab('mix');
            break;
          case '4':
            e.preventDefault();
            setCurrentTab('vocal_cleaning');
            break;
          case '5':
            e.preventDefault();
            setCurrentTab('master');
            break;
          case '6':
            e.preventDefault();
            setCurrentTab('instruments');
            break;
          case '7':
            e.preventDefault();
            setCurrentTab('genres');
            break;
          case '8':
            e.preventDefault();
            setCurrentTab('plugins');
            break;
          case '9':
            e.preventDefault();
            setCurrentTab('mix_doctor');
            break;
          case '0':
            e.preventDefault();
            setCurrentTab('export');
            break;
          case 'p':
          case 'P':
            e.preventDefault();
            setCurrentTab('projects');
            break;
          case 's':
          case 'S':
            if (!isInput) {
              e.preventDefault();
              setCurrentTab('studio_one');
            }
            break;
          case 'g':
          case 'G':
            if (!isInput) {
              e.preventDefault();
              setCurrentTab('recording_schedule');
            }
            break;
          case ',':
            e.preventDefault();
            setCurrentTab('settings');
            break;
          case 'f':
          case 'F':
            // Toggle FFT Analyzer
            if (!isInput) {
              e.preventDefault();
              setIsAnalyzerOpen(prev => !prev);
            }
            break;
          case 'd':
          case 'D':
            // Toggle Delay Calc
            if (!isInput) {
              e.preventDefault();
              setIsDelayCalcOpen(prev => !prev);
            }
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync projects to localStorage
  const handleUpdateProject = (updated: Project) => {
    const newProjects = projects.map(p => p.id === updated.id ? updated : p);
    setProjects(newProjects);
    saveProjects(newProjects);
  };

  const handleSaveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    saveProjects(newProjects);
  };

  const handleSelectProject = (id: string) => {
    setActiveId(id);
    setActiveProjectId(id);
  };

  const handleResetData = () => {
    if (confirm('Deseja restaurar os projetos originais de demonstração?')) {
      setProjects(defaultDemoProjects);
      saveProjects(defaultDemoProjects);
      setActiveId(defaultDemoProjects[0].id);
      setActiveProjectId(defaultDemoProjects[0].id);
      alert('Dados restaurados com sucesso.');
    }
  };

  const activeProject = projects.find(p => p.id === activeProjectId) || projects[0] || null;

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#0B0E11] text-[#E0E0E0] font-sans select-none antialiased">
      {/* Top Header Navbar */}
      <Header
        currentTab={currentTab}
        activeProject={activeProject}
        projects={projects}
        onSelectProject={handleSelectProject}
        onOpenAnalyzer={() => setIsAnalyzerOpen(true)}
        onOpenDelayCalc={() => setIsDelayCalcOpen(true)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
        onOpenGitHubExport={() => setIsGitHubModalOpen(true)}
      />

      {/* Main Studio Body (Sidebar + Content) */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Studio Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          activeProject={activeProject}
          projects={projects}
          onOpenAnalyzer={() => setIsAnalyzerOpen(true)}
          onOpenDelayCalc={() => setIsDelayCalcOpen(true)}
          onOpenShortcuts={() => setIsShortcutsOpen(true)}
        />

        {/* Scrollable View Container */}
        <main className="flex-1 overflow-y-auto bg-[#0B0E11] pb-10">
          {currentTab === 'dashboard' && (
            <DashboardView
              onNavigate={setCurrentTab}
              activeProject={activeProject}
              projects={projects}
              onSelectProject={handleSelectProject}
              onUpdateProject={handleUpdateProject}
              onOpenAnalyzer={() => setIsAnalyzerOpen(true)}
              onOpenDelayCalc={() => setIsDelayCalcOpen(true)}
            />
          )}

          {currentTab === 'studio_one' && (
            <StudioOneWorkflowView
              onNavigate={setCurrentTab}
              onOpenAnalyzer={() => setIsAnalyzerOpen(true)}
              onOpenDelayCalc={() => setIsDelayCalcOpen(true)}
            />
          )}

          {currentTab === 'recording_schedule' && (
            <RecordingScheduleView
              projects={projects}
              activeProjectId={activeProjectId}
              onSelectProject={handleSelectProject}
              onSaveProjects={handleSaveProjects}
              onNavigate={setCurrentTab}
            />
          )}

          {currentTab === 'vocal_recording' && (
            <VocalRecordingView
              activeProject={activeProject}
              onNavigate={setCurrentTab}
              onOpenAnalyzer={() => setIsAnalyzerOpen(true)}
            />
          )}

          {currentTab === 'mix' && (
            <MixView
              activeProject={activeProject}
              onUpdateProject={handleUpdateProject}
              onNavigate={setCurrentTab}
            />
          )}

          {currentTab === 'vocal_cleaning' && (
            <VocalCleaningView
              onNavigate={setCurrentTab}
              onOpenAnalyzer={() => setIsAnalyzerOpen(true)}
            />
          )}

          {currentTab === 'instruments' && (
            <InstrumentsView
              onNavigate={setCurrentTab}
              onOpenAnalyzer={() => setIsAnalyzerOpen(true)}
            />
          )}

          {currentTab === 'genres' && (
            <GenresView onNavigate={setCurrentTab} />
          )}

          {currentTab === 'master' && (
            <MasterView
              onNavigate={setCurrentTab}
              onOpenAnalyzer={() => setIsAnalyzerOpen(true)}
            />
          )}

          {currentTab === 'plugins' && (
            <PluginsView />
          )}

          {currentTab === 'mix_doctor' && (
            <MixDoctorView
              onNavigate={setCurrentTab}
              onOpenAnalyzer={() => setIsAnalyzerOpen(true)}
            />
          )}

          {currentTab === 'export' && (
            <ExportView
              activeProject={activeProject}
              onUpdateProject={handleUpdateProject}
              onNavigate={setCurrentTab}
            />
          )}

          {currentTab === 'projects' && (
            <ProjectsView
              projects={projects}
              activeProjectId={activeProjectId}
              onSelectProject={handleSelectProject}
              onSaveProjects={handleSaveProjects}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsOfflineView
              onResetData={handleResetData}
              onProjectsUpdated={(newProjects) => {
                setProjects(newProjects);
                if (newProjects.length > 0) {
                  setActiveId(newProjects[0].id);
                  setActiveProjectId(newProjects[0].id);
                }
              }}
            />
          )}
        </main>
      </div>

      {/* Sleek Interface Studio Status Footer Bar */}
      <footer className="h-10 bg-[#0E1116] border-t border-[#2A2F36] px-6 flex items-center justify-between text-[10px] text-gray-500 uppercase tracking-widest shrink-0">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.8)] animate-pulse" />
            <span className="text-gray-400">Local Storage Ready</span>
          </span>
          <span className="hidden sm:flex items-center gap-1.5 text-gray-400">
            <span className="text-cyan-400 font-mono">100% OFFLINE</span>
          </span>
          {activeProject && (
            <span className="hidden md:inline text-gray-400">
              PROJETO: <span className="text-white font-mono font-semibold">{activeProject.name}</span> ({activeProject.bpm} BPM)
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Progresso da Mix:</span>
            <span className="text-cyan-400 font-bold font-mono">{activeProject?.mixProgress || 0}%</span>
          </div>
          <div className="w-28 sm:w-36 h-1.5 bg-[#1E2329] rounded-full overflow-hidden">
            <div 
              className="h-full bg-cyan-500 transition-all duration-300 shadow-[0_0_8px_rgba(6,182,212,0.6)]"
              style={{ width: `${activeProject?.mixProgress || 0}%` }}
            />
          </div>
          <span className="hidden lg:inline text-gray-600">&copy; Melo Mix Assistant</span>
        </div>
      </footer>

      {/* Web Audio API Real-time Spectrum Analyzer Modal */}
      <AudioAnalyzerModal
        isOpen={isAnalyzerOpen}
        onClose={() => setIsAnalyzerOpen(false)}
      />

      {/* BPM to Delay & Reverb ms Calculator Modal */}
      <DelayCalculatorModal
        isOpen={isDelayCalcOpen}
        onClose={() => setIsDelayCalcOpen(false)}
        initialBpm={activeProject?.bpm || 120}
      />

      {/* Global Keyboard Shortcuts Cheat Sheet Modal */}
      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      {/* GitHub Export Modal */}
      <GitHubExportModal
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
      />
    </div>
  );
};

export default App;

