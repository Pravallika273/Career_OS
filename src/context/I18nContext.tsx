import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import {
  CurrencyCode,
  CurrencyMeta,
  EducationSystemId,
  EducationSystemMeta,
  LocaleCode,
  LocaleMeta,
  TargetMarketId,
  TargetMarketMeta,
  TranslationKey,
} from '../i18n/types';
import {
  CURRENCIES,
  EDUCATION_SYSTEMS,
  SUPPORTED_LOCALES,
  TARGET_MARKETS,
} from '../i18n/constants';
import { getDictionary } from '../i18n/dictionaries';
import { enDictionary } from '../i18n/dictionaries/en';

export interface RegionalTerms {
  resumeTerm: string;
  coverLetterTerm: string;
  entryLevelTerm: string;
  internshipTerm: string;
  compensationMetric: string;
  collegeOrUniversityTerm: string;
  degreeTerm: string;
  graduationYearTerm: string;
}

export interface I18nContextType {
  locale: LocaleCode;
  setLocale: (locale: LocaleCode) => void;
  targetMarket: TargetMarketId;
  setTargetMarket: (market: TargetMarketId) => void;
  educationSystem: EducationSystemId;
  setEducationSystem: (edu: EducationSystemId) => void;
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  timezone: string;
  setTimezone: (timezone: string) => void;
  lowBandwidthMode: boolean;
  setLowBandwidthMode: (enabled: boolean) => void;
  highContrastMode: boolean;
  setHighContrastMode: (enabled: boolean) => void;

  // Translation & formatting
  t: (key: TranslationKey, params?: Record<string, string | number>, defaultVal?: string) => string;
  formatCurrency: (amount: number, currencyOverride?: CurrencyCode, options?: { compactLPA?: boolean }) => string;
  formatDate: (date: Date | string | number, options?: Intl.DateTimeFormatOptions) => string;
  formatTime: (date: Date | string | number) => string;
  formatRelativeTime: (date: Date | string | number) => string;

  // Metadata
  localeMeta: LocaleMeta;
  educationMeta: EducationSystemMeta;
  marketMeta: TargetMarketMeta;
  currencyMeta: CurrencyMeta;
  regionalTerms: RegionalTerms;
}

const STORAGE_KEY = 'careeros_global_preferences_v1';

const I18nContext = createContext<I18nContextType | null>(null);

// Detect reasonable browser defaults
function detectInitialPreferences() {
  let detectedLocale: LocaleCode = 'en-US';
  let detectedTimezone = 'UTC';

  try {
    const navLang = navigator.language || '';
    if (navLang.startsWith('en-GB') || navLang === 'en-AU' || navLang === 'en-NZ') {
      detectedLocale = 'en-GB';
    } else if (navLang.startsWith('en-IN') || navLang.includes('IN')) {
      detectedLocale = 'en-IN';
    } else if (navLang.startsWith('es')) {
      detectedLocale = 'es-ES';
    } else if (navLang.startsWith('fr')) {
      detectedLocale = 'fr-FR';
    } else if (navLang.startsWith('de')) {
      detectedLocale = 'de-DE';
    } else if (navLang.startsWith('pt')) {
      detectedLocale = 'pt-BR';
    } else if (navLang.startsWith('ja')) {
      detectedLocale = 'ja-JP';
    } else if (navLang.startsWith('zh')) {
      detectedLocale = 'zh-CN';
    }

    detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  } catch {
    // Keep defaults
  }

  const defaultMeta = SUPPORTED_LOCALES.find((l) => l.code === detectedLocale) || SUPPORTED_LOCALES[0];

  return {
    locale: detectedLocale,
    targetMarket: defaultMeta.defaultMarket,
    educationSystem: defaultMeta.defaultEducation,
    currency: defaultMeta.defaultCurrency,
    timezone: detectedTimezone,
    lowBandwidthMode: false,
    highContrastMode: false,
  };
}

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...detectInitialPreferences(), ...JSON.parse(saved) };
      }
    } catch {
      // Fallback
    }
    return detectInitialPreferences();
  });

  const { locale, targetMarket, educationSystem, currency, timezone, lowBandwidthMode, highContrastMode } =
    preferences;

  // Persist whenever preferences update
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch {
      // Ignore storage errors
    }

    // Apply document attributes for CSS styling
    document.documentElement.setAttribute('lang', locale);
    document.documentElement.setAttribute('data-low-bandwidth', lowBandwidthMode ? 'true' : 'false');
    document.documentElement.setAttribute('data-high-contrast', highContrastMode ? 'true' : 'false');
  }, [preferences, locale, lowBandwidthMode, highContrastMode]);

  const setLocale = (newLocale: LocaleCode) => {
    const meta = SUPPORTED_LOCALES.find((l) => l.code === newLocale) || SUPPORTED_LOCALES[0];
    setPreferences((prev: typeof preferences) => ({
      ...prev,
      locale: newLocale,
      // Adapt market, currency & education system default if matching locale preset
      targetMarket: prev.targetMarket === prev.locale ? meta.defaultMarket : prev.targetMarket,
    }));
  };

  const setTargetMarket = (newMarket: TargetMarketId) => {
    const market = TARGET_MARKETS.find((m) => m.id === newMarket);
    setPreferences((prev: typeof preferences) => ({
      ...prev,
      targetMarket: newMarket,
      currency: market?.primaryCurrency || prev.currency,
    }));
  };

  const setEducationSystem = (newEdu: EducationSystemId) => {
    setPreferences((prev: typeof preferences) => ({ ...prev, educationSystem: newEdu }));
  };

  const setCurrency = (newCurrency: CurrencyCode) => {
    setPreferences((prev: typeof preferences) => ({ ...prev, currency: newCurrency }));
  };

  const setTimezone = (newTimezone: string) => {
    setPreferences((prev: typeof preferences) => ({ ...prev, timezone: newTimezone }));
  };

  const setLowBandwidthMode = (enabled: boolean) => {
    setPreferences((prev: typeof preferences) => ({ ...prev, lowBandwidthMode: enabled }));
  };

  const setHighContrastMode = (enabled: boolean) => {
    setPreferences((prev: typeof preferences) => ({ ...prev, highContrastMode: enabled }));
  };

  // Active dictionary
  const currentDictionary = useMemo(() => getDictionary(locale), [locale]);

  // Translation function with interpolation
  const t = (key: TranslationKey, params?: Record<string, string | number>, defaultVal?: string): string => {
    let str = currentDictionary[key] || enDictionary[key] || defaultVal || key;
    if (params) {
      Object.entries(params).forEach(([paramKey, val]) => {
        str = str.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(val));
      });
    }
    return str;
  };

  // Currency Formatter
  const currencyMeta = useMemo(() => CURRENCIES[currency as CurrencyCode] || CURRENCIES.USD, [currency]);

  const formatCurrency = (
    amount: number,
    currencyOverride?: CurrencyCode,
    options?: { compactLPA?: boolean }
  ): string => {
    const activeCode = (currencyOverride || currency) as CurrencyCode;
    const meta = CURRENCIES[activeCode] || CURRENCIES.USD;

    // Special handling for INR (Lakhs / LPA)
    if (activeCode === 'INR') {
      if (options?.compactLPA && amount >= 100000) {
        const lpa = (amount / 100000).toFixed(1).replace(/\.0$/, '');
        return `₹${lpa} LPA`;
      }
      try {
        return new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0,
        }).format(amount);
      } catch {
        return `₹${amount.toLocaleString('en-IN')}`;
      }
    }

    try {
      return new Intl.NumberFormat(meta.formatLocale, {
        style: 'currency',
        currency: activeCode,
        maximumFractionDigits: meta.decimals,
      }).format(amount);
    } catch {
      return `${meta.symbol}${amount.toLocaleString()}`;
    }
  };

  // Date Formatter (Timezone-Aware)
  const formatDate = (date: Date | string | number, options?: Intl.DateTimeFormatOptions): string => {
    const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
    if (isNaN(d.getTime())) return '';

    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: timezone,
      ...options,
    };

    try {
      return new Intl.DateTimeFormat(locale, defaultOptions).format(d);
    } catch {
      return d.toLocaleDateString();
    }
  };

  // Time Formatter
  const formatTime = (date: Date | string | number): string => {
    const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
    if (isNaN(d.getTime())) return '';

    try {
      return new Intl.DateTimeFormat(locale, {
        hour: 'numeric',
        minute: '2-digit',
        timeZone: timezone,
      }).format(d);
    } catch {
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  // Relative Time Formatter
  const formatRelativeTime = (date: Date | string | number): string => {
    const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
    const diffMs = Date.now() - d.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHour / 24);

    if (diffDays > 7) {
      return formatDate(d, { month: 'short', day: 'numeric' });
    }
    if (diffDays >= 1) {
      return diffDays === 1 ? 'Yesterday' : `${diffDays} days ago`;
    }
    if (diffHour >= 1) {
      return `${diffHour}h ago`;
    }
    if (diffMin >= 1) {
      return `${diffMin}m ago`;
    }
    return 'Just now';
  };

  // Active Metadata
  const localeMeta = useMemo(
    () => SUPPORTED_LOCALES.find((l) => l.code === locale) || SUPPORTED_LOCALES[0],
    [locale]
  );
  const educationMeta = useMemo(
    () => EDUCATION_SYSTEMS.find((e) => e.id === educationSystem) || EDUCATION_SYSTEMS[0],
    [educationSystem]
  );
  const marketMeta = useMemo(
    () => TARGET_MARKETS.find((m) => m.id === targetMarket) || TARGET_MARKETS[0],
    [targetMarket]
  );

  // Regional Terms
  const regionalTerms: RegionalTerms = useMemo(() => {
    return {
      resumeTerm: t('term.resume', undefined, marketMeta.resumeTerm),
      coverLetterTerm: t('term.coverLetter', undefined, marketMeta.coverLetterTerm),
      entryLevelTerm: t('term.entryLevel', undefined, marketMeta.entryLevelTerm),
      internshipTerm: t('term.internship', undefined, marketMeta.internshipTerm),
      compensationMetric: t('term.compensation', undefined, marketMeta.compensationMetric),
      collegeOrUniversityTerm: t('term.collegeOrUniversity', undefined, 'College / University'),
      degreeTerm: t('term.degree', undefined, 'Major / Degree'),
      graduationYearTerm: t('term.graduationYear', undefined, 'Graduation Year'),
    };
  }, [t, marketMeta]);

  const value = {
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
    formatDate,
    formatTime,
    formatRelativeTime,
    localeMeta,
    educationMeta,
    marketMeta,
    currencyMeta,
    regionalTerms,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};
