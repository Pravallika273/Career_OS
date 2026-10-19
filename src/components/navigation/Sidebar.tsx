import React from 'react';
import {
  Home,
  GitBranch,
  Target,
  CheckSquare,
  MessageSquare,
  Compass,
  Briefcase,
  BookmarkCheck,
  ShieldCheck,
  FileText,
  Sparkles,
  HelpCircle,
  Bell,
  User,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Palette,
  Users,
} from 'lucide-react';
import { RouteId } from '../../types/navigation';
import { Badge } from '../ui/Badge';
import { useTranslation } from '../../context/I18nContext';

export interface SidebarProps {
  currentRoute: RouteId;
  onNavigate: (route: RouteId) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  onOpenAICompanion?: () => void;
}

interface NavItemConfig {
  id: RouteId;
  label: string;
  icon: React.FC<{ className?: string }>;
  badge?: string;
  badgeVariant?: 'neutral' | 'mint' | 'indigo';
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRoute,
  onNavigate,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen = false,
  onCloseMobile,
  onOpenAICompanion,
}) => {
  const { t, regionalTerms } = useTranslation();

  const coreNavItems: NavItemConfig[] = [
    { id: 'home', label: t('nav.home', undefined, 'Home'), icon: Home },
    { id: 'my-plan', label: t('nav.myPlan', undefined, 'My Plan'), icon: GitBranch },
    { id: 'explore', label: t('nav.explore', undefined, 'Explore Careers'), icon: Target },
    { id: 'tasks', label: t('nav.learnAndDo', undefined, 'Learn & Do'), icon: CheckSquare },
  ];

  const practiceNavItems: NavItemConfig[] = [
    { id: 'work-ready', label: t('nav.workReady', undefined, 'Workplace Scenarios'), icon: Compass },
    { id: 'communication', label: t('nav.communication', undefined, 'Communication Drills'), icon: MessageSquare },
    { id: 'interview', label: t('nav.interview', undefined, 'Interview Practice'), icon: MessageSquare },
  ];

  const careerNavItems: NavItemConfig[] = [
    { id: 'my-career', label: t('nav.evidence', undefined, 'Career Evidence'), icon: ShieldCheck },
    { id: 'resume', label: regionalTerms.resumeTerm, icon: FileText },
    { id: 'opportunities', label: t('nav.opportunities', undefined, 'Opportunities'), icon: Briefcase },
    { id: 'applications', label: t('nav.applications', undefined, 'Applications'), icon: BookmarkCheck },
    { id: 'mentors', label: t('nav.mentors', undefined, 'Mentors'), icon: Users },
  ];

  const secondaryNavItems: NavItemConfig[] = [
    { id: 'notifications', label: t('nav.notifications', undefined, 'Notifications'), icon: Bell },
    { id: 'profile', label: t('nav.profile', undefined, 'Profile'), icon: User },
    { id: 'settings', label: t('nav.settings', undefined, 'Settings'), icon: Sliders },
    { id: 'help', label: t('nav.help', undefined, 'Help & FAQ'), icon: HelpCircle },
  ];

  // Maps route aliases for active highlighting
  const isItemActive = (id: RouteId) => {
    if (currentRoute === id) return true;
    if (id === 'home' && currentRoute === 'overview') return true;
    if (id === 'my-plan' && currentRoute === 'plans') return true;
    if (id === 'explore' && (currentRoute === 'discovery' || currentRoute === 'careers')) return true;
    if (
      (id === 'tasks' || id === 'learn' || id === 'learn-and-do') &&
      (currentRoute === 'tasks' ||
        currentRoute === 'learn' ||
        currentRoute === 'learn-and-do' ||
        currentRoute === 'skills')
    ) return true;
    if (id === 'communication' && currentRoute === 'communication') return true;
    if (
      id === 'work-ready' &&
      (currentRoute === 'work-ready' || currentRoute === '/work-ready')
    ) return true;
    if (id === 'resume' && currentRoute === 'resume') return true;
    if (
      id === 'opportunities' &&
      (currentRoute === 'opportunities' || currentRoute === '/opportunities')
    ) return true;
    if (
      id === 'applications' &&
      (currentRoute === 'applications' || currentRoute === '/applications')
    ) return true;
    if (
      id === 'interview' &&
      (currentRoute === 'interview' || currentRoute === '/interview')
    ) return true;
    if (
      id === 'mentors' &&
      (currentRoute === 'mentors' ||
        currentRoute === '/mentors' ||
        currentRoute === 'network')
    ) return true;
    if (
      id === 'my-career' &&
      (currentRoute === 'evidence' ||
        currentRoute === 'career/evidence' ||
        currentRoute === 'portfolio' ||
        currentRoute === 'my-career')
    ) return true;
    return false;
  };

  const content = (
    <div className="flex flex-col h-full select-none bg-white">
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-[#E8E6DF]">
        <button
          onClick={() => {
            onNavigate('home');
            onCloseMobile?.();
          }}
          className="flex items-center gap-2.5 text-left focus-visible:outline-none group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#5B5BD6] flex items-center justify-center text-white font-bold text-base shadow-xs group-hover:bg-[#4B4BC2] transition-colors">
            C
          </div>
          {!isCollapsed && (
            <div className="truncate">
              <span className="text-base font-bold tracking-tight text-[#101828]">
                CareerOS
              </span>
            </div>
          )}
        </button>

        {/* Desktop Collapse Toggle */}
        <button
          onClick={onToggleCollapse}
          className="hidden md:flex p-1.5 rounded-lg text-[#98A2B3] hover:text-[#101828] hover:bg-[#F4F3EF] transition-colors"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Persistent AI Action */}
      <div className="p-3 border-b border-[#E8E6DF] bg-[#F8F8F5]/50">
        <button
          type="button"
          onClick={() => {
            onOpenAICompanion?.();
            onCloseMobile?.();
          }}
          title={isCollapsed ? 'Ask CareerOS AI' : undefined}
          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#5B5BD6] hover:bg-[#4B4BC2] shadow-xs transition-all duration-150 active:scale-[0.98] ${
            isCollapsed ? 'justify-center p-2' : ''
          }`}
        >
          <Sparkles className="w-4 h-4 shrink-0 text-white fill-white/20" />
          {!isCollapsed && (
            <span className="truncate flex-1 text-left">Ask CareerOS AI</span>
          )}
        </button>
      </div>

      {/* Main Nav Links */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-5">
        {/* Core Workspace */}
        <div className="space-y-0.5">
          {!isCollapsed && (
            <h4 className="px-2.5 mb-1 text-[11px] font-semibold text-[#98A2B3] uppercase tracking-wider">
              Workspace
            </h4>
          )}
          {coreNavItems.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item.id);

            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onCloseMobile?.();
                }}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B5BD6] cursor-pointer ${
                  active
                    ? 'bg-[#F0EEFF] text-[#5B5BD6] font-semibold'
                    : 'text-[#475467] hover:text-[#101828] hover:bg-[#F4F3EF]'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    active ? 'text-[#5B5BD6]' : 'text-[#667085]'
                  }`}
                />
                {!isCollapsed && (
                  <span className="truncate flex-1">{item.label}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Practice & Workplace Readiness */}
        <div className="space-y-0.5 pt-3 border-t border-[#E8E6DF]">
          {!isCollapsed && (
            <h4 className="px-2.5 mb-1 text-[11px] font-semibold text-[#98A2B3] uppercase tracking-wider">
              Practice &amp; Scenarios
            </h4>
          )}
          {practiceNavItems.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item.id);

            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onCloseMobile?.();
                }}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B5BD6] cursor-pointer ${
                  active
                    ? 'bg-[#F0EEFF] text-[#5B5BD6] font-semibold'
                    : 'text-[#475467] hover:text-[#101828] hover:bg-[#F4F3EF]'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    active ? 'text-[#5B5BD6]' : 'text-[#667085]'
                  }`}
                />
                {!isCollapsed && (
                  <span className="truncate flex-1">{item.label}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Proof & Opportunities */}
        <div className="space-y-0.5 pt-3 border-t border-[#E8E6DF]">
          {!isCollapsed && (
            <h4 className="px-2.5 mb-1 text-[11px] font-semibold text-[#98A2B3] uppercase tracking-wider">
              Proof &amp; Careers
            </h4>
          )}
          {careerNavItems.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item.id);

            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onCloseMobile?.();
                }}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B5BD6] cursor-pointer ${
                  active
                    ? 'bg-[#F0EEFF] text-[#5B5BD6] font-semibold'
                    : 'text-[#475467] hover:text-[#101828] hover:bg-[#F4F3EF]'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    active ? 'text-[#5B5BD6]' : 'text-[#667085]'
                  }`}
                />
                {!isCollapsed && (
                  <span className="truncate flex-1">{item.label}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Account & Settings */}
        <div className="space-y-0.5 pt-3 border-t border-[#E8E6DF]">
          {!isCollapsed && (
            <h4 className="px-2.5 mb-1 text-[11px] font-semibold text-[#98A2B3] uppercase tracking-wider">
              Account
            </h4>
          )}
          {secondaryNavItems.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item.id);

            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onCloseMobile?.();
                }}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B5BD6] ${
                  active
                    ? 'bg-[#F0EEFF] text-[#5B5BD6] font-semibold'
                    : 'text-[#475467] hover:text-[#101828] hover:bg-[#F4F3EF]'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    active ? 'text-[#5B5BD6]' : 'text-[#667085]'
                  }`}
                />
                {!isCollapsed && (
                  <span className="truncate flex-1">{item.label}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer System Links */}
      <div className="p-3 border-t border-[#E8E6DF] bg-[#F8F8F5]/80 space-y-1">
        <button
          onClick={() => {
            onNavigate('design-system');
            onCloseMobile?.();
          }}
          title={isCollapsed ? 'Design System Lab' : undefined}
          className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#667085] hover:text-[#101828] hover:bg-[#E8E6DF] transition-colors text-left ${
            currentRoute === 'design-system' ? 'text-[#5B5BD6] font-semibold bg-white' : ''
          }`}
        >
          <Palette className="w-3.5 h-3.5 shrink-0" />
          {!isCollapsed && <span className="truncate">Design System</span>}
        </button>

        {!isCollapsed && (
          <div className="px-2 pt-1 text-[11px] text-[#98A2B3] leading-tight">
            <p>One useful step at a time.</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop / Tablet Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-white border-r border-[#E8E6DF] shrink-0 transition-all duration-200 ease-in-out ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-[#101828]/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <aside className="fixed inset-y-0 left-0 w-72 bg-white border-r border-[#E8E6DF] shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {content}
          </aside>
        </div>
      )}
    </>
  );
};
