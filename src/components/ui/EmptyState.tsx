import React from 'react';
import { Compass } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 border border-dashed border-[#D3D0C6] rounded-2xl bg-[#F8F8F5]/60 ${className}`}
    >
      <div className="w-12 h-12 rounded-xl bg-[#F0EEFF] text-[#5B5BD6] flex items-center justify-center mb-4 shadow-xs">
        {icon || <Compass className="w-6 h-6 stroke-[1.75]" />}
      </div>
      <h3 className="text-base sm:text-lg font-semibold tracking-tight text-[#101828] mb-1.5 max-w-md">
        {title}
      </h3>
      <p className="text-sm text-[#667085] max-w-sm leading-relaxed mb-6">
        {description}
      </p>
      {(primaryAction || secondaryAction) && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {primaryAction && (
            <Button
              variant="primary"
              size="md"
              onClick={primaryAction.onClick}
              leftIcon={primaryAction.icon}
            >
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              variant="outline"
              size="md"
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
