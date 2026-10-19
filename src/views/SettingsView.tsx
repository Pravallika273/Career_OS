import React, { useState, useEffect } from 'react';
import {
  Sliders,
  Globe,
  GraduationCap,
  Briefcase,
  Coins,
  Clock,
  Wifi,
  Eye,
  Check,
  Sparkles,
  Shield,
  ShieldCheck,
  Lock,
  Trash2,
  AlertTriangle,
  Flag,
  FileX,
  UserX,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Checkbox } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Dialog } from '../components/ui/Dialog';
import { useToast } from '../components/ui/Toast';
import { useTranslation } from '../context/I18nContext';
import { GlobalPreferencesModal } from '../components/global/GlobalPreferencesModal';
import { TrustSafetyService } from '../services/trustSafetyService';
import { PrivacySettings, DEFAULT_PRIVACY_SETTINGS } from '../types/trustAndSafety';
import { ReportModal } from '../components/trust/ReportModal';

export const SettingsView: React.FC = () => {
  const { toast } = useToast();
  const {
    localeMeta,
    marketMeta,
    educationMeta,
    currencyMeta,
    timezone,
    lowBandwidthMode,
    setLowBandwidthMode,
    highContrastMode,
    setHighContrastMode,
    regionalTerms,
    t,
    formatTime,
    formatCurrency,
  } = useTranslation();

  const [emailDigest, setEmailDigest] = useState(true);
  const [mentorAlerts, setMentorAlerts] = useState(true);
  const [calmPacing, setCalmPacing] = useState(true);
  const [isGlobalModalOpen, setIsGlobalModalOpen] = useState(false);

  // Trust & Safety State
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>(DEFAULT_PRIVACY_SETTINGS);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  useEffect(() => {
    setPrivacySettings(TrustSafetyService.getPrivacySettings());
  }, []);

  const handleSavePrivacy = () => {
    TrustSafetyService.savePrivacySettings(privacySettings);
    toast.success('Privacy Controls Saved', 'Your privacy and data sharing preferences have been updated.');
  };

  const handleDeleteAccountAndData = async () => {
    if (deleteConfirmationText.trim().toUpperCase() !== 'DELETE') {
      toast.error('Confirmation Required', 'Please type DELETE exactly to confirm.');
      return;
    }

    setIsDeleting(true);
    try {
      await TrustSafetyService.deleteUserAccountAndData();
      toast.success('Account & Data Deleted', 'All local evidence, drafts, applications, and settings have been purged.');
      setIsDeleteModalOpen(false);
      setDeleteConfirmationText('');
      setTimeout(() => {
        window.location.reload();
      }, 800);
    } catch {
      toast.error('Deletion Failed', 'Unable to delete data. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-7">
        <div className="flex items-center gap-2 mb-1.5">
          <Badge variant="indigo" size="sm">
            Workspace Preferences
          </Badge>
          <span className="text-xs text-[#667085]">Settings</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-[#101828]">
          Settings & Environment
        </h1>
        <p className="text-sm text-[#475467] mt-0.5">
          Configure global localization, academic system, hiring markets, data saving, and workspace pacing.
        </p>
      </div>

      {/* Global & Regional Readiness Card (Prominent) */}
      <div className="bg-white border-2 border-[#5B5BD6]/20 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E6DF]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="indigo" size="sm">
                Global Architecture
              </Badge>
              <span className="text-xs text-[#667085]">Localization Ready</span>
            </div>
            <h2 className="text-lg font-bold text-[#101828]">
              {t('global.title', undefined, 'Global & Regional Preferences')}
            </h2>
            <p className="text-xs text-[#475467] mt-0.5">
              {t(
                'global.subtitle',
                undefined,
                'Tailor CareerOS to your language, local education system, hiring market, and connection speed.'
              )}
            </p>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsGlobalModalOpen(true)}
            leftIcon={<Globe className="w-4 h-4" />}
          >
            Customize Global Settings
          </Button>
        </div>

        {/* Current Active Configuration Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-4">
          {/* Language & Locale */}
          <div className="p-3.5 rounded-xl bg-[#F8F8F5] border border-[#E8E6DF]">
            <div className="flex items-center gap-2 text-xs text-[#667085] font-semibold">
              <Globe className="w-3.5 h-3.5 text-[#5B5BD6]" />
              <span>Language</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xl">{localeMeta.flag}</span>
              <div>
                <p className="text-xs font-bold text-[#101828] leading-tight">
                  {localeMeta.nativeName}
                </p>
                <p className="text-[11px] text-[#667085]">{localeMeta.code}</p>
              </div>
            </div>
          </div>

          {/* Job Market & Terminology */}
          <div className="p-3.5 rounded-xl bg-[#F8F8F5] border border-[#E8E6DF]">
            <div className="flex items-center gap-2 text-xs text-[#667085] font-semibold">
              <Briefcase className="w-3.5 h-3.5 text-[#21B47A]" />
              <span>Hiring Market</span>
            </div>
            <div className="mt-2">
              <p className="text-xs font-bold text-[#101828] leading-tight truncate">
                {marketMeta.label}
              </p>
              <p className="text-[11px] text-[#667085] truncate mt-0.5">
                {regionalTerms.resumeTerm} · {regionalTerms.entryLevelTerm}
              </p>
            </div>
          </div>

          {/* Education System */}
          <div className="p-3.5 rounded-xl bg-[#F8F8F5] border border-[#E8E6DF]">
            <div className="flex items-center gap-2 text-xs text-[#667085] font-semibold">
              <GraduationCap className="w-3.5 h-3.5 text-[#F37021]" />
              <span>Academic System</span>
            </div>
            <div className="mt-2">
              <p className="text-xs font-bold text-[#101828] leading-tight truncate">
                {educationMeta.label}
              </p>
              <p className="text-[11px] text-[#667085] truncate mt-0.5">
                {educationMeta.gradingScale}
              </p>
            </div>
          </div>

          {/* Currency & Time */}
          <div className="p-3.5 rounded-xl bg-[#F8F8F5] border border-[#E8E6DF]">
            <div className="flex items-center gap-2 text-xs text-[#667085] font-semibold">
              <Coins className="w-3.5 h-3.5 text-[#6366F1]" />
              <span>Currency & Clock</span>
            </div>
            <div className="mt-2">
              <p className="text-xs font-bold text-[#101828] leading-tight">
                {currencyMeta.symbol} {currencyMeta.code} ({formatCurrency(75000, undefined, { compactLPA: true })})
              </p>
              <p className="text-[11px] text-[#667085] flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3 text-[#667085]" />
                <span>{formatTime(new Date())}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Lite Mode & Accessibility Card */}
        <Card variant="default" padding="lg" className="space-y-4 bg-white">
          <h3 className="text-sm font-semibold text-[#101828] uppercase tracking-wider pb-2 border-b border-[#E8E6DF] flex items-center justify-between">
            <span>Connection & Accessibility</span>
            <Wifi className="w-4 h-4 text-[#667085]" />
          </h3>

          <Checkbox
            checked={lowBandwidthMode}
            onChange={(e) => setLowBandwidthMode(e.target.checked)}
            label="Low-Bandwidth Mode (Lite / Data Saver)"
            description="Reduces network payload size, suppresses complex animations and backdrop blurs, and caches aggressively for mobile data networks."
          />

          <Checkbox
            checked={highContrastMode}
            onChange={(e) => setHighContrastMode(e.target.checked)}
            label="High-Contrast Accessibility Mode"
            description="Increases text-to-background contrast ratios and enforces visible focus rings for keyboard navigation."
          />

          <div className="pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                toast.success(
                  'Environment Saved',
                  `Lite Mode: ${lowBandwidthMode ? 'Active' : 'Off'} · High Contrast: ${
                    highContrastMode ? 'Active' : 'Off'
                  }`
                )
              }
            >
              Update Display Environment
            </Button>
          </div>
        </Card>

        {/* Pacing & Experience Card */}
        <Card variant="default" padding="lg" className="space-y-4 bg-white">
          <h3 className="text-sm font-semibold text-[#101828] uppercase tracking-wider pb-2 border-b border-[#E8E6DF] flex items-center justify-between">
            <span>Pacing & Mentorship</span>
            <Sliders className="w-4 h-4 text-[#667085]" />
          </h3>

          <Checkbox
            checked={calmPacing}
            onChange={(e) => setCalmPacing(e.target.checked)}
            label="Calm pacing mode (Recommended)"
            description="Focuses on one primary daily action. Hides non-essential vanity metrics."
          />

          <Checkbox
            checked={emailDigest}
            onChange={(e) => setEmailDigest(e.target.checked)}
            label="Weekly Sunday digest"
            description="A gentle summary of the proof artifacts you completed this week."
          />

          <Checkbox
            checked={mentorAlerts}
            onChange={(e) => setMentorAlerts(e.target.checked)}
            label="Allow mentor peer-reviews"
            description="Verified early-career mentors can offer constructive feedback on your code and task artifacts."
          />

          <div className="pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.success('Settings saved', 'Preferences updated successfully.')}
            >
              Save Preferences
            </Button>
          </div>
        </Card>
      </div>

      {/* Trust & Safety Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Privacy Controls Card */}
        <Card variant="default" padding="lg" className="space-y-4 bg-white border-[#E8E6DF]">
          <div className="flex items-center justify-between pb-2 border-b border-[#E8E6DF]">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#5B5BD6]" />
              <h3 className="text-sm font-semibold text-[#101828] uppercase tracking-wider">
                Privacy Controls
              </h3>
            </div>
            <Badge variant="mint" size="sm">
              Protected
            </Badge>
          </div>

          <p className="text-xs text-[#667085] leading-relaxed">
            CareerOS is built to protect students. We never expose your private data, sell personal records, or publish work without explicit consent.
          </p>

          {/* Profile Visibility */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-xs font-bold text-[#101828]">
              Career Evidence & Profile Visibility
            </label>
            <select
              value={privacySettings.profileVisibility}
              onChange={(e) =>
                setPrivacySettings((prev) => ({
                  ...prev,
                  profileVisibility: e.target.value as any,
                }))
              }
              className="w-full bg-[#F8F8F5] border border-[#E8E6DF] rounded-xl p-2.5 text-xs text-[#101828] focus:outline-hidden focus:ring-1 focus:ring-[#5B5BD6]"
            >
              <option value="private">Private (Only visible to you)</option>
              <option value="mentors_only">Mentors Only (Verified mentors reviewing code drills)</option>
              <option value="public">Public Share Link (For citing verified evidence to employers)</option>
            </select>
          </div>

          <div className="space-y-3 pt-2">
            <Checkbox
              checked={privacySettings.hideContactInfo}
              onChange={(e) =>
                setPrivacySettings((prev) => ({
                  ...prev,
                  hideContactInfo: e.target.checked,
                }))
              }
              label="Hide private contact information"
              description="Never expose email address, phone numbers, or exact residential location to external viewers."
            />

            <Checkbox
              checked={privacySettings.aiPersonalizationConsent}
              onChange={(e) =>
                setPrivacySettings((prev) => ({
                  ...prev,
                  aiPersonalizationConsent: e.target.checked,
                }))
              }
              label="AI Coaching Personalization Consent"
              description="Allows CareerOS AI to read your verified skills and goals strictly to tailor task hints and resume feedback. Never used to train public models."
            />

            <Checkbox
              checked={privacySettings.requireExplicitPublishConfirmation}
              onChange={(e) =>
                setPrivacySettings((prev) => ({
                  ...prev,
                  requireExplicitPublishConfirmation: e.target.checked,
                }))
              }
              label="Require explicit confirmation before publishing"
              description="AI will never automatically publish, share, or submit your work without your manual click."
            />

            <Checkbox
              checked={privacySettings.preventSearchEngineIndexing}
              onChange={(e) =>
                setPrivacySettings((prev) => ({
                  ...prev,
                  preventSearchEngineIndexing: e.target.checked,
                }))
              }
              label="Prevent search engine indexing (noindex)"
              description="Instructs search engines not to index your work artifacts or profile."
            />
          </div>

          <div className="pt-2">
            <Button
              variant="primary"
              size="sm"
              onClick={handleSavePrivacy}
              leftIcon={<ShieldCheck className="w-3.5 h-3.5" />}
            >
              Save Privacy Settings
            </Button>
          </div>
        </Card>

        {/* Data Rights & Account Deletion Card */}
        <Card variant="default" padding="lg" className="space-y-4 bg-white border-[#E8E6DF] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E8E6DF]">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#F26B5B]" />
                <h3 className="text-sm font-semibold text-[#101828] uppercase tracking-wider">
                  Data Rights & Account Deletion
                </h3>
              </div>
              <Badge variant="coral" size="sm">
                Irreversible
              </Badge>
            </div>

            <p className="text-xs text-[#667085] leading-relaxed">
              You own 100% of your career data. In accordance with GDPR and digital rights standards, you can permanently wipe all your records at any time.
            </p>

            <div className="p-3.5 rounded-xl bg-[#FFF8F7] border border-[#FCD8D4] space-y-2 text-xs text-[#C93B2B]">
              <div className="flex items-center gap-2 font-bold">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>What deleting your account purges:</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-[11px] text-[#475467]">
                <li>All entries in your Career Evidence Vault</li>
                <li>All active task drafts, timer logs, and submissions</li>
                <li>All tracked job, internship, and project applications</li>
                <li>Mentor question records and guidance threads</li>
                <li>Saved resume versions and personalized settings</li>
              </ul>
            </div>

            <div className="pt-1">
              <Button
                variant="coral"
                size="sm"
                onClick={() => setIsDeleteModalOpen(true)}
                leftIcon={<Trash2 className="w-3.5 h-3.5" />}
              >
                Delete Account & Wipe All Data
              </Button>
            </div>
          </div>

          {/* Safety & Content Reporting Shortcut */}
          <div className="pt-4 border-t border-[#E8E6DF] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#101828]">Report a Trust or Safety Issue</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsReportModalOpen(true)}
                leftIcon={<Flag className="w-3.5 h-3.5 text-[#F26B5B]" />}
                className="text-xs"
              >
                File Safety Report
              </Button>
            </div>
            <p className="text-[11px] text-[#667085]">
              Encountered suspicious employers, broken tasks, or misleading AI output? File a confidential report.
            </p>
          </div>
        </Card>
      </div>

      {/* Global Preferences Modal */}
      <GlobalPreferencesModal
        isOpen={isGlobalModalOpen}
        onClose={() => setIsGlobalModalOpen(false)}
      />

      {/* General Safety & Integrity Report Modal */}
      {isReportModalOpen && (
        <ReportModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          targetType="general_feedback"
          targetId="general-safety"
          targetTitle="CareerOS Platform Safety & Trust Review"
        />
      )}

      {/* Delete Account & Data Confirmation Dialog */}
      <Dialog
        isOpen={isDeleteModalOpen}
        onClose={() => {
          if (!isDeleting) {
            setIsDeleteModalOpen(false);
            setDeleteConfirmationText('');
          }
        }}
        title="Permanently Delete Account & Data?"
        description="This action cannot be undone. All your verified proof, task drafts, and records will be deleted."
        footer={
          <div className="flex items-center justify-end gap-2 w-full">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setDeleteConfirmationText('');
              }}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="coral"
              size="sm"
              onClick={handleDeleteAccountAndData}
              disabled={deleteConfirmationText.trim().toUpperCase() !== 'DELETE' || isDeleting}
              leftIcon={<Trash2 className="w-3.5 h-3.5" />}
            >
              {isDeleting ? 'Deleting Everything...' : 'Permanently Delete'}
            </Button>
          </div>
        }
      >
        <div className="space-y-4 text-xs sm:text-sm text-left">
          <div className="p-3.5 rounded-xl bg-[#FFF2F0] border border-[#FCD8D4] text-[#C93B2B] flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Permanent Deletion Warning</p>
              <p className="text-xs text-[#475467] mt-0.5">
                Once deleted, your Evidence Vault cannot be recovered. If you need your completed deliverables, consider copying them to your local notes first.
              </p>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#101828]">
              Type <span className="font-mono text-[#C93B2B] bg-[#FFF2F0] px-1 py-0.5 rounded">DELETE</span> to confirm:
            </label>
            <input
              type="text"
              value={deleteConfirmationText}
              onChange={(e) => setDeleteConfirmationText(e.target.value)}
              placeholder="Type DELETE"
              className="w-full p-2.5 rounded-xl border border-[#E8E6DF] bg-white text-xs sm:text-sm text-[#101828] focus:outline-hidden focus:ring-2 focus:ring-[#F26B5B]"
              disabled={isDeleting}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};
