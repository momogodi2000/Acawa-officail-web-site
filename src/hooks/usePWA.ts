import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface PWAInstallState {
  isInstallable: boolean;
  isInstalled: boolean;
  showInstallPrompt: boolean;
  platform: 'ios' | 'android' | 'desktop' | 'unknown';
  deferredPrompt: BeforeInstallPromptEvent | null;
}

interface PWAUpdateState {
  isUpdateAvailable: boolean;
  showUpdatePrompt: boolean;
}

/**
 * Custom hook for PWA installation and updates
 */
export const usePWA = () => {
  const [installState, setInstallState] = useState<PWAInstallState>({
    isInstallable: false,
    isInstalled: false,
    showInstallPrompt: false,
    platform: 'unknown',
    deferredPrompt: null,
  });

  const [updateState, setUpdateState] = useState<PWAUpdateState>({
    isUpdateAvailable: false,
    showUpdatePrompt: false,
  });

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Detect platform
    const userAgent = navigator.userAgent.toLowerCase();
    let platform: PWAInstallState['platform'] = 'unknown';
    
    if (/ipad|iphone|ipod/.test(userAgent)) {
      platform = 'ios';
    } else if (/android/.test(userAgent)) {
      platform = 'android';
    } else {
      platform = 'desktop';
    }

    // Check if app is already installed
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches ||
                       (window.navigator as any).standalone === true;

    setInstallState(prev => ({ ...prev, platform, isInstalled }));

    // Handle beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const beforeInstallEvent = e as BeforeInstallPromptEvent;
      
      setInstallState(prev => ({
        ...prev,
        isInstallable: true,
        deferredPrompt: beforeInstallEvent,
        showInstallPrompt: !isInstalled && shouldShowInstallPrompt(),
      }));
    };

    // Handle app installed event
    const handleAppInstalled = () => {
      setInstallState(prev => ({
        ...prev,
        isInstalled: true,
        isInstallable: false,
        deferredPrompt: null,
        showInstallPrompt: false,
      }));

      // Store installation date
      localStorage.setItem('pwa_installed_date', new Date().toISOString());
      
      // Show success message
      showInstallSuccessMessage();
    };

    // Handle online/offline status
    const handleOnlineStatus = () => setIsOnline(navigator.onLine);
    const handleOfflineStatus = () => setIsOnline(navigator.onLine);

    // Service worker update detection
    const handleSWUpdate = () => {
      setUpdateState(prev => ({
        ...prev,
        isUpdateAvailable: true,
        showUpdatePrompt: true,
      }));
    };

    // Add event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOfflineStatus);

    // Service worker message listener
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data?.type === 'SW_UPDATE_AVAILABLE') {
          handleSWUpdate();
        }
      });

      // Check for existing service worker updates
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          if (registration.waiting) {
            handleSWUpdate();
          }
        });
      });
    }

    // Check if should show install prompt on first visit
    if (!installState.isInstalled && installState.platform !== 'unknown' && shouldShowInstallPrompt()) {
      setTimeout(() => {
        setInstallState(prev => ({ ...prev, showInstallPrompt: true }));
      }, 10000); // Show after 10 seconds
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOfflineStatus);
    };
  }, []);

  // Check if should show install prompt based on user behavior
  const shouldShowInstallPrompt = (): boolean => {
    const visitCount = parseInt(localStorage.getItem('pwa_visit_count') || '0');
    const lastPromptDate = localStorage.getItem('pwa_last_prompt_date');
    const userDismissedCount = parseInt(localStorage.getItem('pwa_dismiss_count') || '0');
    
    // Don't show if user dismissed more than 3 times
    if (userDismissedCount >= 3) return false;
    
    // Don't show if prompted in last 7 days
    if (lastPromptDate) {
      const daysSinceLastPrompt = (Date.now() - new Date(lastPromptDate).getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceLastPrompt < 7) return false;
    }
    
    // Show after 3+ visits
    return visitCount >= 3;
  };

  // Install the PWA
  const installPWA = async (): Promise<boolean> => {
    if (!installState.deferredPrompt) return false;

    try {
      await installState.deferredPrompt.prompt();
      const { outcome } = await installState.deferredPrompt.userChoice;
      
      setInstallState(prev => ({
        ...prev,
        deferredPrompt: null,
        showInstallPrompt: false,
      }));

      // Track installation attempt
      trackInstallAttempt(outcome);
      
      return outcome === 'accepted';
    } catch (error) {
      console.error('Error installing PWA:', error);
      return false;
    }
  };

  // Dismiss install prompt
  const dismissInstallPrompt = () => {
    setInstallState(prev => ({ ...prev, showInstallPrompt: false }));
    
    // Track dismissal
    const dismissCount = parseInt(localStorage.getItem('pwa_dismiss_count') || '0') + 1;
    localStorage.setItem('pwa_dismiss_count', dismissCount.toString());
    localStorage.setItem('pwa_last_prompt_date', new Date().toISOString());
  };

  // Show install guide
  const showInstallGuide = () => {
    setInstallState(prev => ({ ...prev, showInstallPrompt: true }));
  };

  // Update PWA
  const updatePWA = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          if (registration.waiting) {
            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
            window.location.reload();
          }
        });
      });
    }
  };

  // Dismiss update prompt
  const dismissUpdatePrompt = () => {
    setUpdateState(prev => ({ ...prev, showUpdatePrompt: false }));
  };

  // Get install instructions for current platform
  const getInstallInstructions = () => {
    switch (installState.platform) {
      case 'ios':
        return [
          'Ouvrez ce site dans Safari',
          'Appuyez sur le bouton Partager ⬆️',
          'Sélectionnez "Ajouter à l\'écran d\'accueil"',
          'Appuyez sur "Ajouter" pour confirmer'
        ];
      case 'android':
        return [
          'Une bannière d\'installation va apparaître',
          'Appuyez sur "Installer" dans la bannière',
          'Ou allez dans Menu → "Ajouter à l\'écran d\'accueil"',
          'Confirmez l\'installation'
        ];
      case 'desktop':
        return [
          'Recherchez l\'icône d\'installation dans la barre d\'adresse',
          'Cliquez sur l\'icône d\'installation',
          'Cliquez sur "Installer" dans la popup',
          'L\'app s\'ouvrira dans sa propre fenêtre'
        ];
      default:
        return ['Installation non supportée sur cette plateforme'];
    }
  };

  // Track user engagement
  const trackPageVisit = () => {
    const visitCount = parseInt(localStorage.getItem('pwa_visit_count') || '0') + 1;
    localStorage.setItem('pwa_visit_count', visitCount.toString());
  };

  // Track installation attempt
  const trackInstallAttempt = (outcome: string) => {
    const attempts = parseInt(localStorage.getItem('pwa_install_attempts') || '0') + 1;
    localStorage.setItem('pwa_install_attempts', attempts.toString());
    localStorage.setItem('pwa_last_install_attempt', JSON.stringify({
      date: new Date().toISOString(),
      outcome,
      platform: installState.platform
    }));
  };

  // Show success message after installation
  const showInstallSuccessMessage = () => {
    // You can implement a toast notification here
    console.log('🎉 AKAWA installé avec succès !');
  };

  return {
    // Install state
    isInstallable: installState.isInstallable,
    isInstalled: installState.isInstalled,
    showInstallPrompt: installState.showInstallPrompt,
    platform: installState.platform,
    
    // Update state
    isUpdateAvailable: updateState.isUpdateAvailable,
    showUpdatePrompt: updateState.showUpdatePrompt,
    
    // Network state
    isOnline,
    
    // Actions
    installPWA,
    dismissInstallPrompt,
    showInstallGuide,
    updatePWA,
    dismissUpdatePrompt,
    trackPageVisit,
    
    // Helpers
    getInstallInstructions,
    canInstall: installState.isInstallable && !installState.isInstalled,
  };
};

// Hook for PWA status detection
export const usePWAStatus = () => {
  const [isPWA, setIsPWA] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if running as PWA
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches ||
                            (window.navigator as any).standalone === true;
    
    setIsStandalone(isStandaloneMode);
    setIsPWA(isStandaloneMode);
  }, []);

  return {
    isPWA,
    isStandalone,
    isWebVersion: !isPWA,
  };
};
