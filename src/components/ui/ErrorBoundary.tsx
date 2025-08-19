import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; reset?: () => void }>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

/**
 * Enhanced Error Boundary with better UX
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo });
    
    // Log error to monitoring service
    this.props.onError?.(error, errorInfo);
    
    // Log to console in development
    if (import.meta.env.DEV) {
      console.group('🚨 Error Boundary Caught An Error');
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.error('Component Stack:', errorInfo.componentStack);
      console.groupEnd();
    }
  }

  reset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error} reset={this.reset} />;
    }

    return this.props.children;
  }
}

/**
 * Default error fallback component
 */
const DefaultErrorFallback: React.FC<{ error?: Error; reset?: () => void }> = ({ 
  error, 
  reset 
}) => {
  const isDev = import.meta.env.DEV;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
        {/* Error Icon */}
        <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>

        {/* Error Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Oops! Quelque chose s'est mal passé
        </h1>
        
        <p className="text-gray-600 mb-6">
          Une erreur inattendue s'est produite. Nos équipes ont été automatiquement notifiées.
        </p>

        {/* Error Details (Development Only) */}
        {isDev && error && (
          <details className="mb-6 text-left">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 mb-2">
              Détails de l'erreur (dev uniquement)
            </summary>
            <div className="bg-gray-100 p-3 rounded text-xs font-mono text-gray-800 overflow-auto max-h-32">
              <div className="font-semibold mb-1">Message:</div>
              <div className="mb-2">{error.message}</div>
              {error.stack && (
                <>
                  <div className="font-semibold mb-1">Stack:</div>
                  <pre className="whitespace-pre-wrap">{error.stack}</pre>
                </>
              )}
            </div>
          </details>
        )}

        {/* Actions */}
        <div className="space-y-4">
          <button
            onClick={reset}
            className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Réessayer
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Retour à l'accueil
          </button>
        </div>

        {/* Contact Support */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-3">
            Le problème persiste ?
          </p>
          <a
            href="mailto:support@acawa-cameroon.org"
            className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
          >
            Contactez notre support technique
          </a>
        </div>
      </div>
    </div>
  );
};

/**
 * Component-level error boundary for smaller sections
 */
export const SectionErrorBoundary: React.FC<{
  children: React.ReactNode;
  sectionName: string;
}> = ({ children, sectionName }) => {
  return (
    <ErrorBoundary
      fallback={({ reset }) => (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-red-800 mb-2">
            Erreur dans la section "{sectionName}"
          </h3>
          <p className="text-red-600 text-sm mb-4">
            Cette section n'a pas pu se charger correctement.
          </p>
          <button
            onClick={reset}
            className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      )}
      onError={(error, errorInfo) => {
        console.error(`Error in section "${sectionName}":`, error, errorInfo);
        // Here you could send the error to your monitoring service
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

/**
 * Async error boundary for handling promise rejections
 */
export const AsyncErrorBoundary: React.FC<{
  children: React.ReactNode;
  onError?: (error: Error) => void;
}> = ({ children, onError }) => {
  React.useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      onError?.(event.reason);
    };

    const handleError = (event: ErrorEvent) => {
      console.error('Global error:', event.error);
      onError?.(event.error);
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleError);
    };
  }, [onError]);

  return <>{children}</>;
};

export default ErrorBoundary;