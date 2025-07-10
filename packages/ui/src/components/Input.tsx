import React from 'react';
import { cn } from '../utils/cn';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
}

export const Input: React.FC<InputProps> = ({
  className,
  type = 'text',
  label,
  error,
  helperText,
  icon,
  iconPosition = 'left',
  variant = 'default',
  size = 'md',
  ...props
}) => {
  const variantClasses = {
    default: 'border border-gray-300 bg-white focus-visible:ring-blue-500 focus-visible:border-blue-500',
    filled: 'border-0 bg-gray-100 focus-visible:bg-white focus-visible:ring-blue-500',
    outlined: 'border-2 border-gray-300 bg-transparent focus-visible:border-blue-500',
  };
  
  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-3 text-base',
    lg: 'h-12 px-4 text-lg',
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const iconPaddingLeft = icon && iconPosition === 'left' ? 'pl-10' : '';
  const iconPaddingRight = icon && iconPosition === 'right' ? 'pr-10' : '';

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium leading-none text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className={`absolute ${iconPosition === 'left' ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-gray-400`}>
            <div className={iconSizeClasses[size]}>
              {icon}
            </div>
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex w-full rounded-lg transition-all duration-200 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 shadow-sm hover:shadow-md',
            variantClasses[variant],
            sizeClasses[size],
            iconPaddingLeft,
            iconPaddingRight,
            error && 'border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-500 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};
