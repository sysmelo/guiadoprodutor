import React, { useState, useEffect } from 'react';
import { NavigationTab, Project } from './types';
import { getSavedProjects, saveProjects, getActiveProjectId, setActiveProjectId, defaultDemoProjects } from './utils/audioCalculator';
import { subscribeToProjects, syncProjectsToFirebase } from './firebase';
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
import { MobileBottomNav } from './components/MobileBottomNav';
import { MobileDrawer } from './components/MobileDrawer';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [projects, setProjects] = useState<Project[]>(() => getSavedProjects());
  const [activeProjectId, setActiveId] = useState<string>(() => getActiveProjectId());
  const [isFirebaseSynced, setIsFirebaseSynced] = useState<boolean>(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);

  // Modals
  const [isAnalyzerOpen, setIsAnalyzerOpen] = useState<boolean>(false);
  const [isDelayCalcOpen, setIsDelayCalcOpen] = useState<boolean>(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState<boolean>(false);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState<boolean>(false);

  // 1. Conexão em tempo real com Firebase Firestore + Suporte Offline Automático
  useEffect(() => {
    const unsubscribe = subscribeToProjects(
      (firestoreProjects, isFromCache) => {
        if (firestoreProjects && firestoreProjects.length > 0) {
          setProjects(firestoreProjects);
          setIsFirebaseSynced(!isFromCache);
        }
      },
      (err) => {
        console.warn('[Firebase] Usando modo local offline:', err);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

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

  // Sync projects to Firestore and LocalStorage
  const handleUpdateProject = (updated: Project) => {
    const newProjects = projects.map(p => p.id === updated.id ? updated : p);
    setProjects(newProjects);
    saveProjects(newProjects);
    syncProjectsToFirebase(newProjects);
  };

  const handleSaveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    saveProjects(newProjects);
    syncProjectsToFirebase(newProjects);
  };

  const handleSelectProject = (id: string) => {
    setActiveId(id);
    setActiveProjectId(id);
  };

  const handleResetData = () => {
    if (confirm('Deseja restaurar os projetos originais de demonstração?')) {
      setProjects(defaultDemoProjects);
      saveProjects(defaultDemoProjects);
      syncProjectsToFirebase(defaultDemoProjects);
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
        isFirebaseSynced={isFirebaseSynced}
        onSelectProject={handleSelectProject}
        onOpenAnalyzer={() => setIsAnalyzerOpen(true)}
        onOpenDelayCalc={() => setIsDelayCalcOpen(true)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
        onOpenGitHubExport={() => setIsGitHubModalOpen(true)}
        onOpenMenu={() => setIsMobileDrawerOpen(true)}
      />

      {/* Main Studio Body (Sidebar + Content) */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Studio Sidebar (Desktop/Tablet) */}
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
        <main className="flex-1 overflow-y-auto bg-[#0B0E11] pb-24 md:pb-10">
          {currentTab === 'dashboard' && (
            <DashboardView
              activeProject={activeProject}
              projects={projects}
              onNavigate={setCurrentTab}
              onSelectProject={handleSelectProject}
              onUpdateProject={handleUpdateProject}
            />
          )}

          {currentTab === 'studio_one' && (
            <StudioOneWorkflowView
              activeProject={activeProject}
              onNavigate={setCurrentTab}
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
              onUpdateProject={handleUpdateProject}
            />
          )}

          {currentTab === 'mix' && (
            <MixView
              activeProject={activeProject}
              onUpdateProject={handleUpdateProject}
            />
          )}

          {currentTab === 'vocal_cleaning' && (
            <VocalCleaningView
              activeProject={activeProject}
            />
          )}

          {currentTab === 'instruments' && (
            <InstrumentsView
              activeProject={activeProject}
            />
          )}

          {currentTab === 'genres' && (
            <GenresView
              activeProject={activeProject}
            />
          )}

          {currentTab === 'master' && (
            <MasterView
              activeProject={activeProject}
              onUpdateProject={handleUpdateProject}
            />
          )}

          {currentTab === 'plugins' && (
            <PluginsView />
          )}

          {currentTab === 'mix_doctor' && (
            <MixDoctorView />
          )}

          {currentTab === 'export' && (
            <ExportView
              activeProject={activeProject}
              onUpdateProject={handleUpdateProject}
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
              onProjectsUpdated={handleSaveProjects}
            />
          )}
        </main>
      </div>

      {/* Floating FFT Realtime Audio Spectrum Analyzer Modal */}
      {isAnalyzerOpen && (
        <AudioAnalyzerModal
          isOpen={isAnalyzerOpen}
          onClose={() => setIsAnalyzerOpen(false)}
          activeProjectBpm={activeProject?.bpm || 140}
          activeProjectKey={activeProject?.key || 'F# Menor'}
        />
      )}

      {/* Floating BPM Delay & Reverb Timing Calculator Modal */}
      {isDelayCalcOpen && (
        <DelayCalculatorModal
          isOpen={isDelayCalcOpen}
          onClose={() => setIsDelayCalcOpen(false)}
          currentBpm={activeProject?.bpm || 140}
        />
      )}

      {/* Global Hotkeys & Studio Shortcuts Modal */}
      {isShortcutsOpen && (
        <ShortcutsModal
          isOpen={isShortcutsOpen}
          onClose={() => setIsShortcutsOpen(false)}
          onNavigate={(tab) => {
            setCurrentTab(tab);
            setIsShortcutsOpen(false);
          }}
        />
      )}

      {/* GitHub Repository & Netlify Deployment Assistant Modal */}
      {isGitHubModalOpen && (
        <GitHubExportModal
          isOpen={isGitHubModalOpen}
          onClose={() => setIsGitHubModalOpen(false)}
        />
      )}

      {/* Mobile Full Slide-Over Navigation Drawer */}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        activeProject={activeProject}
        projects={projects}
        isFirebaseSynced={isFirebaseSynced}
        onSelectProject={handleSelectProject}
        onOpenAnalyzer={() => setIsAnalyzerOpen(true)}
        onOpenDelayCalc={() => setIsDelayCalcOpen(true)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
      />

      {/* Mobile 1-Thumb Bottom Navigation Bar */}
      <MobileBottomNav
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onOpenMenu={() => setIsMobileDrawerOpen(true)}
        isMenuOpen={isMobileDrawerOpen}
      />
    </div>
  );
};

export default App;
