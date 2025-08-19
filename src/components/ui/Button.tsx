import React from 'react';
import { cn } from '@/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Button Component - Following ACAWA Design System
 * Reusable button component with multiple variants and states
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false,
    leftIcon,
    rightIcon,
    disabled,
    children, 
    ...props 
  }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variantClasses = {
      primary: 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] focus:ring-red-500',
      secondary: 'bg-yellow-500 text-white hover:bg-yellow-600 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] focus:ring-yellow-400',
      accent: 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] focus:ring-green-500',
      outline: 'border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] focus:ring-red-500',
      ghost: 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 active:scale-[0.98] focus:ring-gray-400',
      whatsapp: 'bg-green-500 text-white hover:bg-green-600 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] focus:ring-green-400'
    };
    
    const sizeClasses = {
      sm: 'px-4 py-2 text-sm rounded-md',
      md: 'px-6 py-3 text-base rounded-lg',
      lg: 'px-8 py-4 text-lg rounded-lg'
    };
    
    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          isLoading && 'cursor-wait',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2"></div>
            Chargement...
          </div>
        ) : (
          <>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-2">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
