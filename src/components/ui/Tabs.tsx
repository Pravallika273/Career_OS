import React, { createContext, useContext, useState } from 'react';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
  variant: 'segmented' | 'underline';
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  variant?: 'segmented' | 'underline';
  children: React.ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  defaultValue,
  value,
  onValueChange,
  variant = 'segmented',
  children,
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const activeTab = value !== undefined ? value : internalValue;

  const setActiveTab = (newTab: string) => {
    if (value === undefined) {
      setInternalValue(newTab);
    }
    onValueChange?.(newTab);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, variant }}>
      <div className={`w-full ${className}`}>{children}</div>
    </TabsContext.Provider>
  );
};

export interface TabListProps {
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

export const TabList: React.FC<TabListProps> = ({
  children,
  className = '',
  'aria-label': ariaLabel = 'Navigation Tabs',
}) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabList must be used within Tabs');

  if (context.variant === 'segmented') {
    return (
      <div
        role="tablist"
        aria-label={ariaLabel}
        className={`inline-flex items-center p-1 bg-[#F4F3EF] border border-[#E8E6DF] rounded-lg gap-1 max-w-full overflow-x-auto ${className}`}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={`flex items-center gap-6 border-b border-[#E8E6DF] overflow-x-auto ${className}`}
    >
      {children}
    </div>
  );
};

export interface TabTriggerProps {
  value: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export const TabTrigger: React.FC<TabTriggerProps> = ({
  value,
  children,
  icon,
  badge,
  disabled = false,
  className = '',
}) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabTrigger must be used within Tabs');

  const isActive = context.activeTab === value;

  if (context.variant === 'segmented') {
    return (
      <button
        role="tab"
        aria-selected={isActive}
        disabled={disabled}
        onClick={() => context.setActiveTab(value)}
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B5BD6] ${
          isActive
            ? 'bg-white text-[#101828] shadow-xs font-semibold'
            : 'text-[#667085] hover:text-[#101828] hover:bg-white/50'
        } disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
        {badge && <span className="ml-1 text-[11px]">{badge}</span>}
      </button>
    );
  }

  return (
    <button
      role="tab"
      aria-selected={isActive}
      disabled={disabled}
      onClick={() => context.setActiveTab(value)}
      className={`inline-flex items-center gap-2 py-3 px-1 text-sm font-medium whitespace-nowrap shrink-0 border-b-2 -mb-px transition-all duration-150 focus-visible:outline-none ${
        isActive
          ? 'border-[#5B5BD6] text-[#101828] font-semibold'
          : 'border-transparent text-[#667085] hover:text-[#101828] hover:border-[#D3D0C6]'
      } disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {badge && <span className="ml-1">{badge}</span>}
    </button>
  );
};

export interface TabContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const TabContent: React.FC<TabContentProps> = ({
  value,
  children,
  className = '',
}) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabContent must be used within Tabs');

  if (context.activeTab !== value) return null;

  return (
    <div role="tabpanel" className={`pt-4 ${className}`}>
      {children}
    </div>
  );
};
