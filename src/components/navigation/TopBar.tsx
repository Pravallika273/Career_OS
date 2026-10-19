import React, { useState } from 'react';
import { Menu, Bell, User, ArrowRight, LogIn, LogOut, Sparkles, Cloud, CloudOff, Globe, Wifi } from 'lucide-react';
import { RouteId } from '../../types/navigation';
import { Breadcrumbs, BreadcrumbItem } from './Breadcrumbs';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../context/I18nContext';
import { GlobalPreferencesModal } from '../global/GlobalPreferencesModal';

export interface TopBarProps {
  breadcrumbs: BreadcrumbItem[];
  onNavigate: (route: RouteId) => void;
  onOpenMobileSidebar: () => void;
  onQuickAction?: () => void;
  quickActionLabel?: string;
  userName?: string;
  onOpenAICompanion?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  breadcrumbs,
  onNavigate,
  onOpenMobileSidebar,
  onQuickAction,
  quickActionLabel = 'Start Next Action',
  userName = 'Jordan',
  onOpenAICompanion,
}) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isGlobalModalOpen, setIsGlobalModalOpen] = useState(false);
  const { currentUser, signInWithGoogle, logout, isFirebaseConnected } = useAuth();
  const { localeMeta, currencyMeta, lowBandwidthMode, t } = useTranslation();

  const displayName = currentUser?.displayName || userName || 'Jordan';
  const displayEmail = currentUser?.email || 'Local Session';

  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'CO';

  return (
    <header className="h-16 bg-white border-b border-[#E8E6DF] px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30">
      {/* Zone 1: Mobile toggle & Breadcrumb trail */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobileSidebar}
          className="md:hidden p-2 -ml-1 text-[#475467] hover:text-[#101828] hover:bg-[#F4F3EF] rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />
        </div>
      </div>

      {/* Zone 2 & 3: Actions & Profile */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Global & Regional Preferences */}
        <button
          type="button"
          onClick={() => setIsGlobalModalOpen(true)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-[#F8F8F5] border border-[#E8E6DF] hover:border-[#D0D5DD] hover:bg-white text-[#344054] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#5B5BD6]"
          title={t('header.globalSettings', undefined, 'Global & Regional Preferences')}
          aria-label={t('header.globalSettings', undefined, 'Global & Regional Preferences')}
        >
          <span className="text-sm leading-none">{localeMeta.flag}</span>
          <span className="font-semibold text-xs text-[#101828]">{currencyMeta.code}</span>
          {lowBandwidthMode && (
            <span className="hidden lg:inline text-[10px] text-[#1B9A67] font-semibold bg-[#ECFDF3] px-1.5 py-0.5 rounded">
              Lite
            </span>
          )}
        </button>

        {/* Persistent Ask CareerOS AI Action */}
        {onOpenAICompanion && (
          <Button
            variant="secondary"
            size="sm"
            onClick={onOpenAICompanion}
            leftIcon={<Sparkles className="w-3.5 h-3.5 text-[#5B5BD6]" />}
            className="hidden sm:inline-flex border border-[#E4E0FD]"
          >
            {t('header.askAI', undefined, 'Ask CareerOS AI')}
          </Button>
        )}

        {onQuickAction && (
          <Button
            variant="primary"
            size="sm"
            onClick={onQuickAction}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            className="hidden lg:inline-flex"
          >
            {quickActionLabel}
          </Button>
        )}

        {/* Google Sign In button if not signed in */}
        {!currentUser && (
          <button
            type="button"
            onClick={() => signInWithGoogle().catch(() => {})}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#E8E6DF] bg-white hover:bg-[#F8F8F5] text-xs font-semibold text-[#101828] transition-colors shadow-xs"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Sign in with Google</span>
          </button>
        )}

        {/* Calm notification trigger */}
        <button
          type="button"
          onClick={() => onNavigate('notifications')}
          className="relative p-2 text-[#667085] hover:text-[#101828] hover:bg-[#F4F3EF] rounded-lg transition-colors"
          title="Notifications"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#5B5BD6]" />
        </button>

        {/* User profile capsule with dropdown */}
        <div className="relative pl-2 border-l border-[#E8E6DF]">
          <button
            type="button"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center gap-2 text-left rounded-lg p-1 hover:bg-[#F8F8F5] transition-colors focus-visible:outline-none"
            aria-expanded={isProfileMenuOpen}
            aria-label="User profile menu"
          >
            {currentUser?.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt={displayName}
                className="w-8 h-8 rounded-full border border-[#E4E0FD] object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#F0EEFF] text-[#5B5BD6] flex items-center justify-center font-semibold text-xs border border-[#E4E0FD]">
                {initials}
              </div>
            )}
            <div className="hidden lg:block text-left text-xs">
              <p className="font-semibold text-[#101828] leading-tight truncate max-w-[120px]">
                {displayName}
              </p>
              <p className="text-[#98A2B3] text-[11px] leading-tight truncate max-w-[120px]">
                {currentUser ? 'Authenticated' : 'Starting Point'}
              </p>
            </div>
          </button>

          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl border border-[#E8E6DF] shadow-lg py-1.5 z-40 text-xs animate-in fade-in duration-150">
              <div className="px-3.5 py-2.5 border-b border-[#E8E6DF]">
                <p className="font-semibold text-[#101828] truncate">{displayName}</p>
                <p className="text-[#667085] text-[11px] truncate">{displayEmail}</p>
                <div className="mt-1 flex items-center gap-1.5 text-[10px] text-[#1B9A67]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#21B47A]" />
                  <span>{currentUser ? 'Firebase Auth & Cloud Firestore' : 'Local Storage Fallback'}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsProfileMenuOpen(false);
                  onNavigate('profile');
                }}
                className="w-full text-left px-3.5 py-2 text-[#475467] hover:text-[#101828] hover:bg-[#F8F8F5] flex items-center gap-2"
              >
                <User className="w-3.5 h-3.5 text-[#5B5BD6]" />
                <span>My Career Profile</span>
              </button>

              <button
                onClick={() => {
                  setIsProfileMenuOpen(false);
                  onNavigate('onboarding');
                }}
                className="w-full text-left px-3.5 py-2 text-[#475467] hover:text-[#101828] hover:bg-[#F8F8F5] flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#5B5BD6]" />
                <span>Restart Onboarding</span>
              </button>

              <button
                onClick={() => {
                  setIsProfileMenuOpen(false);
                  setIsGlobalModalOpen(true);
                }}
                className="w-full text-left px-3.5 py-2 text-[#475467] hover:text-[#101828] hover:bg-[#F8F8F5] flex items-center gap-2 border-t border-[#E8E6DF]"
              >
                <Globe className="w-3.5 h-3.5 text-[#5B5BD6]" />
                <span>{t('header.globalSettings', undefined, 'Global & Regional Preferences')}</span>
              </button>

              {currentUser ? (
                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    logout();
                  }}
                  className="w-full text-left px-3.5 py-2 text-[#D92D20] hover:bg-[#FEE4E2]/40 flex items-center gap-2 border-t border-[#E8E6DF]"
                >
                  <LogOut className="w-3.5 h-3.5 text-[#D92D20]" />
                  <span>{t('header.signOut', undefined, 'Sign Out')}</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    signInWithGoogle().catch(() => {});
                  }}
                  className="w-full text-left px-3.5 py-2 text-[#5B5BD6] hover:bg-[#F0EEFF] flex items-center gap-2 border-t border-[#E8E6DF] font-semibold"
                >
                  <LogIn className="w-3.5 h-3.5 text-[#5B5BD6]" />
                  <span>{t('header.signInGoogle', undefined, 'Sign in with Google')}</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Global & Regional Preferences Modal */}
      <GlobalPreferencesModal
        isOpen={isGlobalModalOpen}
        onClose={() => setIsGlobalModalOpen(false)}
      />
    </header>
  );
};
