import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Info, RefreshCw } from 'lucide-react';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  actionLabel?: string;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something unexpected occurred',
  message = 'We encountered an issue retrieving this information. Please try refreshing.',
  onRetry,
  actionLabel = 'Try again',
  className = '',
}) => {
  return (
    <div
      role="alert"
      className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 border border-[#FADBD7] rounded-2xl bg-[#FDF0EE]/50 ${className}`}
    >
      <div className="w-12 h-12 rounded-xl bg-[#FDF0EE] text-[#F26B5B] flex items-center justify-center mb-4">
        <AlertTriangle className="w-6 h-6 stroke-[1.75]" />
      </div>
      <h3 className="text-base sm:text-lg font-semibold tracking-tight text-[#101828] mb-1.5">
        {title}
      </h3>
      <p className="text-sm text-[#667085] max-w-sm leading-relaxed mb-6">
        {message}
      </p>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          leftIcon={<RefreshCw className="w-4 h-4" />}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  action,
  onClose,
  className = '',
}) => {
  const variantConfig = {
    info: {
      container: 'bg-[#F0EEFF]/60 border-[#E4E0FD] text-[#5B5BD6]',
      icon: <Info className="w-4 h-4 text-[#5B5BD6] shrink-0 mt-0.5" />,
      text: 'text-[#101828]',
    },
    success: {
      container: 'bg-[#E8F8F1]/70 border-[#C6EFE0] text-[#1B9A67]',
      icon: <CheckCircle2 className="w-4 h-4 text-[#21B47A] shrink-0 mt-0.5" />,
      text: 'text-[#101828]',
    },
    warning: {
      container: 'bg-[#FDF0EE]/70 border-[#FADBD7] text-[#CC4737]',
      icon: <AlertTriangle className="w-4 h-4 text-[#F26B5B] shrink-0 mt-0.5" />,
      text: 'text-[#101828]',
    },
    error: {
      container: 'bg-[#FDF0EE] border-[#F8BEBA] text-[#CC4737]',
      icon: <AlertCircle className="w-4 h-4 text-[#F26B5B] shrink-0 mt-0.5" />,
      text: 'text-[#101828]',
    },
  };

  const current = variantConfig[variant];

  return (
    <div
      role="alert"
      className={`flex items-start gap-3 p-3.5 rounded-xl border text-sm transition-all duration-150 ${current.container} ${className}`}
    >
      {current.icon}
      <div className="flex-1">
        {title && <h5 className="font-semibold text-xs uppercase tracking-wider mb-0.5 text-[#101828]">{title}</h5>}
        <div className={`text-xs sm:text-sm text-[#475467] leading-relaxed`}>{children}</div>
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="text-xs font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity ml-2 shrink-0 self-center"
        >
          {action.label}
        </button>
      )}
      {onClose && (
        <button
          onClick={onClose}
          className="text-[#98A2B3] hover:text-[#101828] p-1 rounded transition-colors ml-1"
          aria-label="Dismiss alert"
        >
          ×
        </button>
      )}
    </div>
  );
};
