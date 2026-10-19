import React from 'react';
import { Loader2 } from 'lucide-react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width,
  height,
  className = '',
  style,
  ...props
}) => {
  const variantStyles = {
    text: 'h-4 w-full rounded',
    rectangular: 'rounded-xl',
    circular: 'rounded-full',
  };

  const inlineStyles: React.CSSProperties = {
    width: width !== undefined ? width : undefined,
    height: height !== undefined ? height : undefined,
    ...style,
  };

  return (
    <div
      className={`animate-pulse bg-[#E8E6DF]/80 ${variantStyles[variant]} ${className}`}
      style={inlineStyles}
      {...props}
    />
  );
};

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'indigo' | 'mint' | 'muted' | 'white';
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'indigo',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const colorStyles = {
    indigo: 'text-[#5B5BD6]',
    mint: 'text-[#21B47A]',
    muted: 'text-[#98A2B3]',
    white: 'text-white',
  };

  return (
    <Loader2
      className={`animate-spin ${sizeStyles[size]} ${colorStyles[color]} ${className}`}
    />
  );
};

export interface PageLoadingStateProps {
  message?: string;
  subtext?: string;
  className?: string;
}

export const PageLoadingState: React.FC<PageLoadingStateProps> = ({
  message = 'Loading CareerOS...',
  subtext = 'Preparing your roadmap and workspace',
  className = '',
}) => {
  return (
    <div
      className={`min-h-[320px] flex flex-col items-center justify-center p-8 text-center ${className}`}
    >
      <div className="w-10 h-10 rounded-full bg-[#F0EEFF] flex items-center justify-center mb-4">
        <Spinner size="md" color="indigo" />
      </div>
      <p className="text-sm font-semibold text-[#101828] mb-1">{message}</p>
      {subtext && <p className="text-xs text-[#667085]">{subtext}</p>}
    </div>
  );
};
