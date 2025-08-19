import React from 'react';
import { usePWA } from '@/hooks/usePWA';

interface PWAInstallButtonProps {
  variant?: 'primary' | 'secondary' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

/**
 * PWA Install Button Component
 * Shows install button when PWA is installable
 */
const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = 'primary',
  size = 'md',
  showIcon = true,
  className = '',
}) => {
  const { isInstallable, isInstalled, installPWA, showInstallGuide, platform } = usePWA();

  // Don't show if not installable or already installed
  if (!isInstallable || isInstalled) return null;

  const handleInstall = async () => {
    const success = await installPWA();
    if (!success) {
      // Fallback to install guide
      showInstallGuide();
    }
  };

  const getButtonStyles = () => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const sizeStyles = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    };

    const variantStyles = {
      primary: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-lg hover:shadow-xl',
      secondary: 'border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white focus:ring-red-500',
      minimal: 'text-red-600 hover:bg-red-50 focus:ring-red-500'
    };

    return `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;
  };

  const getButtonText = () => {
    switch (platform) {
      case 'ios':
        return 'Ajouter à l\'écran';
      case 'android':
        return 'Installer l\'app';
      case 'desktop':
        return 'Installer AKAWA';
      default:
        return 'Installer';
    }
  };

  const getIcon = () => {
    if (!showIcon) return null;

    switch (platform) {
      case 'ios':
        return (
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        );
      case 'android':
      case 'desktop':
        return (
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <button
      onClick={handleInstall}
      className={getButtonStyles()}
      aria-label={`Installer l'application AKAWA sur ${platform}`}
    >
      {getIcon()}
      <span>{getButtonText()}</span>
    </button>
  );
};

export default PWAInstallButton;
