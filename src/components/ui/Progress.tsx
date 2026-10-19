import React from 'react';
import { Check } from 'lucide-react';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  max?: number;
  label?: string;
  showValue?: boolean;
  color?: 'mint' | 'indigo' | 'coral';
  size?: 'sm' | 'md' | 'lg';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showValue = false,
  color = 'mint',
  size = 'md',
  className = '',
  ...props
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const heightStyles = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  const fillColors = {
    mint: 'bg-[#21B47A]',
    indigo: 'bg-[#5B5BD6]',
    coral: 'bg-[#F26B5B]',
  };

  return (
    <div className={`w-full space-y-1.5 ${className}`} {...props}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-xs text-[#475467]">
          {label && <span className="font-medium text-[#101828]">{label}</span>}
          {showValue && (
            <span className="font-mono tabular-nums text-[#667085]">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-[#E8E6DF] rounded-full overflow-hidden ${heightStyles[size]}`}>
        <div
          className={`h-full rounded-full transition-all duration-300 ease-out ${fillColors[color]}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
};

export interface ProgressCircleProps {
  value: number; // 0 - 100
  size?: number;
  strokeWidth?: number;
  color?: 'mint' | 'indigo' | 'coral';
  label?: string;
  className?: string;
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({
  value,
  size = 48,
  strokeWidth = 4,
  color = 'mint',
  label,
  className = '',
}) => {
  const normalizedValue = Math.min(100, Math.max(0, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (normalizedValue / 100) * circumference;

  const strokeColors = {
    mint: '#21B47A',
    indigo: '#5B5BD6',
    coral: '#F26B5B',
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E8E6DF"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColors[color]}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="none"
          className="transition-all duration-300 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-xs font-semibold font-mono tabular-nums text-[#101828]">
          {label ?? `${Math.round(normalizedValue)}%`}
        </span>
      </div>
    </div>
  );
};

export interface StepItem {
  id: string;
  title: string;
  description?: string;
}

export interface ProgressStepsProps {
  steps: StepItem[];
  currentStepIndex: number;
  onStepClick?: (index: number) => void;
  className?: string;
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({
  steps,
  currentStepIndex,
  onStepClick,
  className = '',
}) => {
  return (
    <nav aria-label="Progress Roadmap" className={`w-full ${className}`}>
      <ol className="flex items-center w-full">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const isUpcoming = index > currentStepIndex;

          return (
            <li
              key={step.id}
              className={`relative flex-1 ${
                index !== steps.length - 1
                  ? "after:content-[''] after:w-full after:h-0.5 after:bg-[#E8E6DF] after:inline-block after:absolute after:top-4 after:left-1/2"
                  : ''
              } ${isCompleted ? 'after:!bg-[#21B47A]' : ''}`}
            >
              <div
                className={`flex flex-col items-center relative z-10 text-center ${
                  onStepClick ? 'cursor-pointer group' : ''
                }`}
                onClick={() => onStepClick?.(index)}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs transition-colors duration-150 ${
                    isCompleted
                      ? 'bg-[#21B47A] text-white'
                      : isCurrent
                      ? 'bg-[#5B5BD6] text-white ring-4 ring-[#F0EEFF]'
                      : 'bg-white border border-[#D3D0C6] text-[#667085]'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                </div>
                <div className="mt-2 px-1">
                  <p
                    className={`text-xs font-medium ${
                      isCurrent
                        ? 'text-[#101828] font-semibold'
                        : isCompleted
                        ? 'text-[#21B47A]'
                        : 'text-[#667085]'
                    }`}
                  >
                    {step.title}
                  </p>
                  {step.description && (
                    <p className="text-[11px] text-[#98A2B3] hidden sm:block mt-0.5">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
