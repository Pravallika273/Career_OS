import React from 'react';

export type BadgeVariant = 'neutral' | 'indigo' | 'mint' | 'coral' | 'textOnly';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  icon,
  className = '',
  ...props
}) => {
  if (variant === 'textOnly') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 text-xs text-[#667085] font-medium ${className}`}
        {...props}
      >
        {dot && <span className="w-1.5 h-1.5 rounded-full bg-[#98A2B3] shrink-0" />}
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
      </span>
    );
  }

  const variantStyles: Record<Exclude<BadgeVariant, 'textOnly'>, string> = {
    neutral: 'bg-[#F4F3EF] text-[#344054] border border-[#E8E6DF]',
    indigo: 'bg-[#F0EEFF] text-[#5B5BD6] border border-[#E4E0FD]',
    mint: 'bg-[#E8F8F1] text-[#1B9A67] border border-[#C6EFE0]',
    coral: 'bg-[#FDF0EE] text-[#CC4737] border border-[#FADBD7]',
  };

  const dotColors: Record<Exclude<BadgeVariant, 'textOnly'>, string> = {
    neutral: 'bg-[#667085]',
    indigo: 'bg-[#5B5BD6]',
    mint: 'bg-[#21B47A]',
    coral: 'bg-[#F26B5B]',
  };

  const sizeStyles: Record<BadgeSize, string> = {
    sm: 'text-[11px] px-2 py-0.5 gap-1 font-medium rounded-md',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium rounded-md',
  };

  return (
    <span
      className={`inline-flex items-center select-none whitespace-nowrap shrink-0 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[variant]}`}
          aria-hidden="true"
        />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
