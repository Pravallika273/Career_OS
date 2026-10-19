import React from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'mint' | 'coral';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    // Base styles: Zero-pill discipline, smooth transition, single-line text
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B5BD6] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none whitespace-nowrap shrink-0 active:scale-[0.99]';

    // Variant styles conforming to the color system
    const variantStyles: Record<ButtonVariant, string> = {
      primary:
        'bg-[#5B5BD6] text-white hover:bg-[#4B4BC2] shadow-xs active:bg-[#4343B0]',
      secondary:
        'bg-[#F0EEFF] text-[#5B5BD6] hover:bg-[#E5E1FC] active:bg-[#D9D3F8]',
      outline:
        'border border-[#E8E6DF] bg-white text-[#101828] hover:bg-[#F8F8F5] hover:border-[#D5D3CC] active:bg-[#F2F1ED]',
      ghost:
        'text-[#475467] hover:text-[#101828] hover:bg-[#F0EEFF]/50 active:bg-[#F0EEFF]',
      mint:
        'bg-[#21B47A] text-white hover:bg-[#1B9A67] shadow-xs active:bg-[#168759]',
      coral:
        'bg-[#F26B5B] text-white hover:bg-[#E05847] shadow-xs active:bg-[#CC4737]',
    };

    // Size styles (button padding ~2x horizontal over vertical)
    const sizeStyles: Record<ButtonSize, string> = {
      sm: 'text-xs px-3 py-1.5 gap-1.5 h-8',
      md: 'text-sm px-4 py-2 gap-2 h-10',
      lg: 'text-base px-5 py-2.5 gap-2.5 h-11',
    };

    const widthClass = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthClass} ${className}`}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0 text-current" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
