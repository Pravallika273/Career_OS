import React, { useState } from 'react';
import { RouteId } from '../../types/navigation';
import { Sidebar } from '../navigation/Sidebar';
import { TopBar } from '../navigation/TopBar';
import { MobileNav } from '../navigation/MobileNav';
import { BreadcrumbItem } from '../navigation/Breadcrumbs';
import { OfflineBanner } from '../common/OfflineBanner';

export interface AppShellProps {
  currentRoute: RouteId;
  onNavigate: (route: RouteId) => void;
  breadcrumbs: BreadcrumbItem[];
  children: React.ReactNode;
  onQuickAction?: () => void;
  quickActionLabel?: string;
  userName?: string;
  onOpenAICompanion?: () => void;
}

export const AppShell: React.FC<AppShellProps> = ({
  currentRoute,
  onNavigate,
  breadcrumbs,
  children,
  onQuickAction,
  quickActionLabel,
  userName = 'Jordan',
  onOpenAICompanion,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F8F8F5] text-[#101828]">
      {/* Sidebar for Desktop / Tablet + Mobile Drawer */}
      <Sidebar
        currentRoute={currentRoute}
        onNavigate={onNavigate}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        onOpenAICompanion={onOpenAICompanion}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Offline / Reconnect Banner */}
        <OfflineBanner />

        {/* Top Navigation */}
        <TopBar
          breadcrumbs={breadcrumbs}
          onNavigate={onNavigate}
          onOpenMobileSidebar={() => setIsMobileMenuOpen(true)}
          onQuickAction={onQuickAction}
          quickActionLabel={quickActionLabel}
          userName={userName}
          onOpenAICompanion={onOpenAICompanion}
        />

        {/* Scrollable View Canvas */}
        <main
          className={`flex-1 overflow-y-auto px-3 sm:px-6 md:px-8 py-4 sm:py-6 ${
            currentRoute === 'task-workspace' ? 'pb-6' : 'pb-20 md:pb-8'
          }`}
        >
          <div className="max-w-6xl mx-auto w-full">
            {children}
          </div>
        </main>

        {/* Mobile Bottom Navigation (Hidden during focused task workspace to prioritize task action bar) */}
        {currentRoute !== 'task-workspace' && (
          <MobileNav
            currentRoute={currentRoute}
            onNavigate={onNavigate}
            onOpenMenu={() => setIsMobileMenuOpen(true)}
            onOpenAICompanion={onOpenAICompanion}
          />
        )}
      </div>
    </div>
  );
};
