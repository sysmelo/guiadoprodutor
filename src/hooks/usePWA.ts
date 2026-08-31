import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function usePWA() {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });

  const [isInstalled, setIsInstalled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
  });

  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [swActive, setSwActive] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' && 'serviceWorker' in navigator && !!navigator.serviceWorker.controller;
  });

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check service worker state
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(() => {
        setSwActive(true);
      });
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        setSwActive(true);
      });
    }

    // Capture install prompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Capture app installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallApp = async (): Promise<boolean> => {
    if (!installPrompt) {
      // Fallback instruction for browsers where prompt cannot be triggered programmatically
      return false;
    }
    try {
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsInstalled(true);
        setInstallPrompt(null);
        return true;
      }
    } catch (err) {
      console.warn('[PWA] Install prompt error:', err);
    }
    return false;
  };

  return {
    isOnline,
    isInstalled,
    swActive,
    canInstall: !!installPrompt,
    handleInstallApp
  };
}
