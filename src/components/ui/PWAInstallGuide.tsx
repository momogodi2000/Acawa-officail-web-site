import React, { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface PWAInstallGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * PWA Installation Guide Modal Component
 * Provides step-by-step installation instructions for different platforms
 */
const PWAInstallGuide: React.FC<PWAInstallGuideProps> = ({ isOpen, onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [platform, setPlatform] = useState<'ios' | 'android' | 'desktop' | 'unknown'>('unknown');
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Detect platform
    const userAgent = navigator.userAgent;
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      setPlatform('ios');
    } else if (/Android/.test(userAgent)) {
      setPlatform('android');
    } else {
      setPlatform('desktop');
    }

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    // Listen for appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
  };

  const getInstallInstructions = () => {
    switch (platform) {
      case 'ios':
        return {
          title: 'Installation sur iPhone/iPad',
          icon: '📱',
          steps: [
            {
              icon: '🌐',
              title: 'Ouvrir Safari',
              description: 'Assurez-vous d\'utiliser Safari (pas Chrome ou Firefox)',
              image: '/images/install/ios-step1.png'
            },
            {
              icon: '📄',
              title: 'Naviguer vers AKAWA',
              description: 'Allez sur akawa-cameroon.org',
              image: '/images/install/ios-step2.png'
            },
            {
              icon: '📤',
              title: 'Appuyer sur Partager',
              description: 'Touchez l\'icône de partage en bas de l\'écran',
              image: '/images/install/ios-step3.png'
            },
            {
              icon: '📱',
              title: 'Ajouter à l\'écran d\'accueil',
              description: 'Sélectionnez "Ajouter à l\'écran d\'accueil" dans le menu',
              image: '/images/install/ios-step4.png'
            },
            {
              icon: '✅',
              title: 'Confirmer',
              description: 'Appuyez sur "Ajouter" pour installer l\'app AKAWA',
              image: '/images/install/ios-step5.png'
            }
          ]
        };
        
      case 'android':
        return {
          title: 'Installation sur Android',
          icon: '🤖',
          steps: [
            {
              icon: '🌐',
              title: 'Ouvrir Chrome',
              description: 'Utilisez Google Chrome pour la meilleure expérience',
              image: '/images/install/android-step1.png'
            },
            {
              icon: '📄',
              title: 'Visiter AKAWA',
              description: 'Naviguez vers akawa-cameroon.org',
              image: '/images/install/android-step2.png'
            },
            {
              icon: '📥',
              title: 'Bannière d\'installation',
              description: 'Une bannière apparaîtra automatiquement, appuyez sur "Installer"',
              image: '/images/install/android-step3.png'
            },
            {
              icon: '⚙️',
              title: 'Menu navigateur',
              description: 'Si pas de bannière: Menu ⋮ → "Ajouter à l\'écran d\'accueil"',
              image: '/images/install/android-step4.png'
            },
            {
              icon: '✅',
              title: 'Installation terminée',
              description: 'L\'app AKAWA apparaît sur votre écran d\'accueil',
              image: '/images/install/android-step5.png'
            }
          ]
        };
        
      default:
        return {
          title: 'Installation sur Desktop',
          icon: '💻',
          steps: [
            {
              icon: '🌐',
              title: 'Ouvrir votre navigateur',
              description: 'Chrome, Edge ou Firefox (Chrome recommandé)',
              image: '/images/install/desktop-step1.png'
            },
            {
              icon: '📄',
              title: 'Aller sur AKAWA',
              description: 'Visitez akawa-cameroon.org',
              image: '/images/install/desktop-step2.png'
            },
            {
              icon: '📥',
              title: 'Icône d\'installation',
              description: 'Recherchez l\'icône d\'installation dans la barre d\'adresse',
              image: '/images/install/desktop-step3.png'
            },
            {
              icon: '💾',
              title: 'Installer l\'application',
              description: 'Cliquez sur "Installer AKAWA" dans la popup',
              image: '/images/install/desktop-step4.png'
            },
            {
              icon: '🚀',
              title: 'Lancement',
              description: 'L\'app s\'ouvre dans sa propre fenêtre',
              image: '/images/install/desktop-step5.png'
            }
          ]
        };
    }
  };

  const instructions = getInstallInstructions();

  if (!isOpen) return null;

  if (isInstalled) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-md w-full p-6 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            AKAWA est installé !
          </h2>
          <p className="text-gray-600 mb-6">
            L'application AKAWA est maintenant disponible sur votre appareil. 
            Vous pouvez la lancer depuis votre écran d'accueil.
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Fermer
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Relancer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                🥋
              </div>
              <div>
                <h2 className="text-2xl font-bold">Installer AKAWA</h2>
                <p className="text-red-100">L'Art Martial de l'Excellence dans votre poche</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="flex h-[60vh]">
          {/* Navigation */}
          <div className="w-1/3 bg-gray-50 p-4 border-r">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
              <span className="text-2xl mr-2">{instructions.icon}</span>
              {instructions.title}
            </h3>
            
            <div className="space-y-2">
              {instructions.steps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    currentStep === index
                      ? 'bg-red-100 border border-red-300 text-red-800'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{step.icon}</span>
                    <div>
                      <div className="font-medium">Étape {index + 1}</div>
                      <div className="text-sm opacity-75">{step.title}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-lg mx-auto">
              {/* Step Content */}
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">{instructions.steps[currentStep].icon}</div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                  {instructions.steps[currentStep].title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {instructions.steps[currentStep].description}
                </p>
              </div>

              {/* Visual Guide */}
              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                  <div className="text-4xl text-gray-400 mb-2">📱</div>
                  <p className="text-sm text-gray-500">
                    Image d'illustration pour {instructions.steps[currentStep].title}
                  </p>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  ← Précédent
                </button>
                
                <div className="flex items-center space-x-1">
                  {instructions.steps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentStep ? 'bg-red-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setCurrentStep(Math.min(instructions.steps.length - 1, currentStep + 1))}
                  disabled={currentStep === instructions.steps.length - 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  Suivant →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t bg-gray-50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <span>✅</span>
                <span>Fonctionne hors ligne</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>📱</span>
                <span>Notifications push</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>⚡</span>
                <span>Chargement rapide</span>
              </div>
            </div>

            <div className="flex gap-3">
              {deferredPrompt && (
                <button
                  onClick={handleInstallClick}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  📥 Installation Rapide
                </button>
              )}
              
              <button
                onClick={onClose}
                className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Plus tard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallGuide;
