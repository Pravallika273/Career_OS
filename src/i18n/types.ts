export type LocaleCode =
  | 'en-US'
  | 'en-GB'
  | 'en-IN'
  | 'es-ES'
  | 'fr-FR'
  | 'de-DE'
  | 'pt-BR'
  | 'ja-JP'
  | 'zh-CN';

export type EducationSystemId =
  | 'us_canada'
  | 'uk_commonwealth'
  | 'india_south_asia'
  | 'europe_bologna'
  | 'latin_america'
  | 'alternative_self_taught';

export type TargetMarketId =
  | 'us_na'
  | 'uk_europe'
  | 'india_south_asia'
  | 'latin_america'
  | 'asia_pacific'
  | 'global_remote';

export type CurrencyCode =
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'INR'
  | 'CAD'
  | 'AUD'
  | 'JPY'
  | 'BRL';

export interface EducationSystemMeta {
  id: EducationSystemId;
  label: string;
  region: string;
  description: string;
  typicalStages: string[];
  gradingScale: string; // e.g. "4.0 GPA", "1st/2:1/2:2 Honours", "10-point CGPA / Percentage", "ECTS Credits"
  recruitmentStyle: string; // e.g. "On-Campus Placements & Off-campus Drives", "Direct ATS Applications", "Spring Weeks & Graduate Schemes"
}

export interface TargetMarketMeta {
  id: TargetMarketId;
  label: string;
  region: string;
  primaryCurrency: CurrencyCode;
  resumeTerm: string; // "Resume" vs "CV" vs "Curriculum Vitae"
  coverLetterTerm: string;
  entryLevelTerm: string; // "Junior Engineer" vs "Graduate" vs "Fresher / SDE-1" vs "Desarrollador Jr"
  internshipTerm: string; // "Internship" vs "Placement / Scheme" vs "Estágio" vs "Pasantía"
  compensationMetric: string; // "Annual Base (USD)" vs "CTC / LPA (Lakhs per annum)" vs "Annual Gross (£/€)"
  typicalHiringMonths: string;
}

export interface CurrencyMeta {
  code: CurrencyCode;
  symbol: string;
  name: string;
  formatLocale: string;
  decimals: number;
  useIndianNumbering?: boolean; // For Lakhs & Crores grouping (e.g. ₹6,50,000)
}

export type TranslationKey =
  // Brand & Tagline
  | 'brand.name'
  | 'brand.tagline'
  | 'brand.subtagline'
  | 'brand.principle'

  // Navigation
  | 'nav.home'
  | 'nav.myPlan'
  | 'nav.explore'
  | 'nav.learnAndDo'
  | 'nav.communication'
  | 'nav.workReady'
  | 'nav.resume'
  | 'nav.opportunities'
  | 'nav.applications'
  | 'nav.interview'
  | 'nav.mentors'
  | 'nav.evidence'
  | 'nav.portfolio'
  | 'nav.profile'
  | 'nav.settings'
  | 'nav.help'
  | 'nav.notifications'

  // Header & Common
  | 'header.greeting.morning'
  | 'header.greeting.afternoon'
  | 'header.greeting.evening'
  | 'header.askAI'
  | 'header.notifications'
  | 'header.cloudSynced'
  | 'header.offline'
  | 'header.signInGoogle'
  | 'header.signOut'
  | 'header.globalSettings'

  // Common Actions
  | 'action.start'
  | 'action.startTask'
  | 'action.resume'
  | 'action.viewDetails'
  | 'action.save'
  | 'action.cancel'
  | 'action.close'
  | 'action.continue'
  | 'action.back'
  | 'action.submit'
  | 'action.complete'
  | 'action.edit'
  | 'action.delete'
  | 'action.preview'
  | 'action.whyAmISeeingThis'
  | 'action.inspectSignals'
  | 'action.breakDownSkill'
  | 'action.enjoyed'
  | 'action.avoid'

  // Home Focal Anchor
  | 'home.nextStepLabel'
  | 'home.primaryFocusForToday'
  | 'home.readyToBegin'
  | 'home.deliverable'
  | 'home.difficulty'
  | 'home.estimatedTime'
  | 'home.goalLabel'
  | 'home.levelLabel'
  | 'home.timeLabel'
  | 'home.urgencyLabel'
  | 'home.viewRoadmap'
  | 'home.continueWhereStopped'
  | 'home.workReadyTeaser'

  // Regional Terms
  | 'term.resume'
  | 'term.coverLetter'
  | 'term.entryLevel'
  | 'term.internship'
  | 'term.compensation'
  | 'term.collegeOrUniversity'
  | 'term.degree'
  | 'term.graduationYear'

  // Globalization & Low Bandwidth
  | 'global.title'
  | 'global.subtitle'
  | 'global.language'
  | 'global.regionMarket'
  | 'global.educationSystem'
  | 'global.currency'
  | 'global.timezone'
  | 'global.lowBandwidthTitle'
  | 'global.lowBandwidthDesc'
  | 'global.lowBandwidthActive'
  | 'global.highContrastTitle'
  | 'global.highContrastDesc'
  | 'global.savePreferences'
  | 'global.savedSuccess';

export type TranslationDictionary = Record<TranslationKey, string>;

export interface LocaleMeta {
  code: LocaleCode;
  name: string;
  nativeName: string;
  flag: string;
  isRTL?: boolean;
  defaultCurrency: CurrencyCode;
  defaultMarket: TargetMarketId;
  defaultEducation: EducationSystemId;
}
