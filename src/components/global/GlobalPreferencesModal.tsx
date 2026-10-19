import React, { useState } from 'react';
import {
  Globe,
  GraduationCap,
  Briefcase,
  Coins,
  Clock,
  Wifi,
  Eye,
  Check,
  CheckCircle2,
  Sliders,
  Sparkles,
  Info,
} from 'lucide-react';
import { Dialog } from '../ui/Dialog';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useTranslation } from '../../context/I18nContext';
import {
  CURRENCIES,
  EDUCATION_SYSTEMS,
  SUPPORTED_LOCALES,
  TARGET_MARKETS,
  COMMON_TIMEZONES,
} from '../../i18n/constants';
import {
  CurrencyCode,
  EducationSystemId,
  LocaleCode,
  TargetMarketId,
} from '../../i18n/types';
import { useToast } from '../ui/Toast';

interface GlobalPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'general' | 'education' | 'market' | 'connection';

export const GlobalPreferencesModal: React.FC<GlobalPreferencesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    locale,
    setLocale,
    targetMarket,
    setTargetMarket,
    educationSystem,
    setEducationSystem,
    currency,
    setCurrency,
    timezone,
    setTimezone,
    lowBandwidthMode,
    setLowBandwidthMode,
    highContrastMode,
    setHighContrastMode,
    t,
    formatCurrency,
    formatTime,
    regionalTerms,
  } = useTranslation();

  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabType>('general');

  // Local draft states
  const [draftLocale, setDraftLocale] = useState<LocaleCode>(locale);
  const [draftMarket, setDraftMarket] = useState<TargetMarketId>(targetMarket);
  const [draftEducation, setDraftEducation] = useState<EducationSystemId>(educationSystem);
  const [draftCurrency, setDraftCurrency] = useState<CurrencyCode>(currency);
  const [draftTimezone, setDraftTimezone] = useState<string>(timezone);
  const [draftLowBandwidth, setDraftLowBandwidth] = useState<boolean>(lowBandwidthMode);
  const [draftHighContrast, setDraftHighContrast] = useState<boolean>(highContrastMode);

  // Sync draft states on open
  React.useEffect(() => {
    if (isOpen) {
      setDraftLocale(locale);
      setDraftMarket(targetMarket);
      setDraftEducation(educationSystem);
      setDraftCurrency(currency);
      setDraftTimezone(timezone);
      setDraftLowBandwidth(lowBandwidthMode);
      setDraftHighContrast(highContrastMode);
    }
  }, [isOpen, locale, targetMarket, educationSystem, currency, timezone, lowBandwidthMode, highContrastMode]);

  const handleApply = () => {
    setLocale(draftLocale);
    setTargetMarket(draftMarket);
    setEducationSystem(draftEducation);
    setCurrency(draftCurrency);
    setTimezone(draftTimezone);
    setLowBandwidthMode(draftLowBandwidth);
    setHighContrastMode(draftHighContrast);

    toast.success(
      t('global.savedSuccess', undefined, 'Preferences updated successfully.'),
      `Configured for ${draftLocale} · ${draftMarket}`
    );
    onClose();
  };

  const selectedMarketMeta = TARGET_MARKETS.find((m) => m.id === draftMarket) || TARGET_MARKETS[0];
  const selectedEduMeta =
    EDUCATION_SYSTEMS.find((e) => e.id === draftEducation) || EDUCATION_SYSTEMS[0];

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={t('global.title', undefined, 'Global & Regional Preferences')}
      description={t(
        'global.subtitle',
        undefined,
        'Tailor CareerOS to your language, local education system, hiring market, and connection speed.'
      )}
      maxWidth="xl"
    >
      <div className="space-y-6 pt-2">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F4F3EF] rounded-xl overflow-x-auto text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all shrink-0 ${
              activeTab === 'general'
                ? 'bg-white text-[#101828] shadow-xs'
                : 'text-[#667085] hover:text-[#101828]'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-[#5B5BD6]" />
            <span>Language & Currency</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('market')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all shrink-0 ${
              activeTab === 'market'
                ? 'bg-white text-[#101828] shadow-xs'
                : 'text-[#667085] hover:text-[#101828]'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-[#21B47A]" />
            <span>Job Market & Terminology</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('education')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all shrink-0 ${
              activeTab === 'education'
                ? 'bg-white text-[#101828] shadow-xs'
                : 'text-[#667085] hover:text-[#101828]'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#F37021]" />
            <span>Education System</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('connection')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all shrink-0 ${
              activeTab === 'connection'
                ? 'bg-white text-[#101828] shadow-xs'
                : 'text-[#667085] hover:text-[#101828]'
            }`}
          >
            <Wifi className="w-3.5 h-3.5 text-[#6366F1]" />
            <span>Lite Mode & Accessibility</span>
          </button>
        </div>

        {/* Tab 1: General (Language, Currency, Timezone) */}
        {activeTab === 'general' && (
          <div className="space-y-5 animate-in fade-in duration-150">
            {/* Language Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#475467]">
                {t('global.language', undefined, 'Interface Language')}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {SUPPORTED_LOCALES.map((item) => {
                  const isSelected = draftLocale === item.code;
                  return (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => {
                        setDraftLocale(item.code);
                        setDraftMarket(item.defaultMarket);
                        setDraftEducation(item.defaultEducation);
                        setDraftCurrency(item.defaultCurrency);
                      }}
                      className={`text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-[#5B5BD6] bg-[#F0EEFF]/50 ring-1 ring-[#5B5BD6]'
                          : 'border-[#E8E6DF] bg-white hover:border-[#D0CFC7]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-xl shrink-0">{item.flag}</span>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-[#101828] truncate">
                            {item.nativeName}
                          </p>
                          <p className="text-[11px] text-[#667085] truncate">{item.name}</p>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[#5B5BD6] shrink-0 ml-1.5" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Currency & Timezone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#E8E6DF]">
              {/* Currency */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#475467]">
                  {t('global.currency', undefined, 'Currency Display')}
                </label>
                <select
                  value={draftCurrency}
                  onChange={(e) => setDraftCurrency(e.target.value as CurrencyCode)}
                  className="w-full bg-white border border-[#E8E6DF] rounded-xl px-3 py-2 text-xs font-medium text-[#101828] focus:border-[#5B5BD6] focus:outline-none"
                >
                  {Object.values(CURRENCIES).map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.symbol} {c.code} - {c.name}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-[#667085]">
                  Sample compensation:{' '}
                  <span className="font-semibold text-[#101828]">
                    {formatCurrency(85000, draftCurrency, { compactLPA: true })}
                  </span>
                </p>
              </div>

              {/* Timezone */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#475467]">
                  {t('global.timezone', undefined, 'Local Timezone')}
                </label>
                <select
                  value={draftTimezone}
                  onChange={(e) => setDraftTimezone(e.target.value)}
                  className="w-full bg-white border border-[#E8E6DF] rounded-xl px-3 py-2 text-xs font-medium text-[#101828] focus:border-[#5B5BD6] focus:outline-none"
                >
                  {COMMON_TIMEZONES.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      ({tz.utcOffset}) {tz.label}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-[#667085] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#5B5BD6]" />
                  <span>
                    Current local time: <strong className="text-[#101828]">{formatTime(new Date())}</strong>
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Target Market & Terminology */}
        {activeTab === 'market' && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#475467]">
                {t('global.regionMarket', undefined, 'Target Job Market')}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TARGET_MARKETS.map((market) => {
                  const isSelected = draftMarket === market.id;
                  return (
                    <button
                      key={market.id}
                      type="button"
                      onClick={() => {
                        setDraftMarket(market.id);
                        setDraftCurrency(market.primaryCurrency);
                      }}
                      className={`text-left p-3.5 rounded-xl border transition-all ${
                        isSelected
                          ? 'border-[#21B47A] bg-[#ECFDF3] ring-1 ring-[#21B47A]'
                          : 'border-[#E8E6DF] bg-white hover:border-[#D0CFC7]'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-[#101828]">{market.label}</p>
                          <p className="text-[11px] text-[#475467] mt-0.5">{market.region}</p>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-[#21B47A] shrink-0" />}
                      </div>
                      <div className="mt-2.5 pt-2 border-t border-[#E8E6DF]/60 text-[11px] text-[#667085] space-y-1">
                        <p>
                          Terminology:{' '}
                          <span className="font-semibold text-[#101828]">
                            {market.resumeTerm} · {market.entryLevelTerm}
                          </span>
                        </p>
                        <p>
                          Compensation unit:{' '}
                          <span className="font-medium text-[#101828]">
                            {market.compensationMetric}
                          </span>
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Terminology preview */}
            <div className="p-4 rounded-xl bg-[#F8F8F5] border border-[#E8E6DF] space-y-2.5">
              <div className="flex items-center gap-2">
                <Badge variant="mint" size="sm">
                  Localized Terminology Preview
                </Badge>
                <span className="text-xs text-[#667085]">
                  Automatically applied throughout UI
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="bg-white p-2.5 rounded-lg border border-[#E8E6DF]">
                  <p className="text-[10px] text-[#667085] uppercase tracking-wider">Document</p>
                  <p className="font-bold text-[#101828] truncate mt-0.5">
                    {selectedMarketMeta.resumeTerm}
                  </p>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-[#E8E6DF]">
                  <p className="text-[10px] text-[#667085] uppercase tracking-wider">Entry Level</p>
                  <p className="font-bold text-[#101828] truncate mt-0.5">
                    {selectedMarketMeta.entryLevelTerm}
                  </p>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-[#E8E6DF]">
                  <p className="text-[10px] text-[#667085] uppercase tracking-wider">Experience</p>
                  <p className="font-bold text-[#101828] truncate mt-0.5">
                    {selectedMarketMeta.internshipTerm}
                  </p>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-[#E8E6DF]">
                  <p className="text-[10px] text-[#667085] uppercase tracking-wider">Hiring Window</p>
                  <p className="font-bold text-[#101828] truncate mt-0.5">
                    {selectedMarketMeta.typicalHiringMonths}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Education System */}
        {activeTab === 'education' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="p-3 rounded-xl bg-[#FDF8EB] border border-[#F5E0B7] text-xs text-[#8A5B00] flex items-start gap-2.5">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#F37021]" />
              <div>
                <p className="font-bold">CareerOS does not assume every user follows the US 4-year degree model.</p>
                <p className="text-[11px] text-[#6D4700] mt-0.5">
                  We adapt to your academic background or self-taught path. Real demonstrated tasks, code artifacts, and practical proof count more than institutional pedigree.
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              {EDUCATION_SYSTEMS.map((edu) => {
                const isSelected = draftEducation === edu.id;
                return (
                  <button
                    key={edu.id}
                    type="button"
                    onClick={() => setDraftEducation(edu.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                      isSelected
                        ? 'border-[#F37021] bg-[#FFF8F2] ring-1 ring-[#F37021]'
                        : 'border-[#E8E6DF] bg-white hover:border-[#D0CFC7]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-[#101828]">{edu.label}</p>
                          <span className="text-[11px] text-[#667085]">· {edu.region}</span>
                        </div>
                        <p className="text-xs text-[#475467] mt-1">{edu.description}</p>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[#F37021] shrink-0 ml-2" />}
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-[#E8E6DF]/60 flex flex-wrap gap-1.5 text-[11px]">
                      <span className="text-[#667085] font-medium">Grading system:</span>
                      <span className="font-semibold text-[#101828] mr-3">{edu.gradingScale}</span>
                      <span className="text-[#667085] font-medium">Recruitment style:</span>
                      <span className="text-[#475467]">{edu.recruitmentStyle}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 4: Connection & Accessibility */}
        {activeTab === 'connection' && (
          <div className="space-y-5 animate-in fade-in duration-150">
            {/* Low-Bandwidth Mode */}
            <div className="p-4 rounded-xl border border-[#E8E6DF] bg-white space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Wifi className="w-4 h-4 text-[#6366F1]" />
                    <h4 className="text-xs font-bold text-[#101828]">
                      {t('global.lowBandwidthTitle', undefined, 'Low-Bandwidth Mode (Lite)')}
                    </h4>
                    {draftLowBandwidth && (
                      <Badge variant="mint" size="sm">
                        {t('global.lowBandwidthActive', undefined, 'Lite Mode Active')}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-[#475467]">
                    {t(
                      'global.lowBandwidthDesc',
                      undefined,
                      'Minimizes network payloads, disables heavy animations, simplifies gradients, and saves mobile data on spotty connections.'
                    )}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={draftLowBandwidth}
                  onChange={(e) => setDraftLowBandwidth(e.target.checked)}
                  className="w-5 h-5 rounded text-[#5B5BD6] border-[#D0CFC7] focus:ring-[#5B5BD6] cursor-pointer mt-0.5"
                />
              </div>
            </div>

            {/* High-Contrast Mode */}
            <div className="p-4 rounded-xl border border-[#E8E6DF] bg-white space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-[#101828]" />
                    <h4 className="text-xs font-bold text-[#101828]">
                      {t('global.highContrastTitle', undefined, 'High-Contrast Accessibility')}
                    </h4>
                    {draftHighContrast && (
                      <Badge variant="indigo" size="sm">
                        High Contrast Active
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-[#475467]">
                    {t(
                      'global.highContrastDesc',
                      undefined,
                      'Enhanced text contrast ratios, prominent borders, and clear keyboard focus rings for optimal accessibility.'
                    )}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={draftHighContrast}
                  onChange={(e) => setDraftHighContrast(e.target.checked)}
                  className="w-5 h-5 rounded text-[#5B5BD6] border-[#D0CFC7] focus:ring-[#5B5BD6] cursor-pointer mt-0.5"
                />
              </div>
            </div>

            {/* Mobile First Note */}
            <div className="p-3.5 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7] text-xs text-[#166534] flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#21B47A] shrink-0" />
              <p>
                Mobile-first responsive architecture is baked into all views, supporting small screens with 44px minimum touch targets and zero horizontal overflow.
              </p>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="pt-4 border-t border-[#E8E6DF] flex items-center justify-between gap-3">
          <div className="text-xs text-[#667085] flex items-center gap-1.5">
            <span>Active:</span>
            <span className="font-semibold text-[#101828]">
              {draftLocale} · {draftMarket} · {draftCurrency}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onClose}>
              {t('action.cancel', undefined, 'Cancel')}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleApply}
              leftIcon={<Check className="w-3.5 h-3.5" />}
            >
              {t('global.savePreferences', undefined, 'Apply Regional Settings')}
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
