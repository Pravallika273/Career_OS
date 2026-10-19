export type OpportunityNature =
  | 'practice_simulation'
  | 'careeros_challenge'
  | 'community_project'
  | 'company_challenge'
  | 'real_internship'
  | 'real_job';

export type OpportunityCategory =
  | 'jobs'
  | 'internships'
  | 'apprenticeships'
  | 'projects'
  | 'challenges'
  | 'company_simulations'
  | 'other';

export interface OpportunityAction {
  label: string;
  type: 'external_apply' | 'start_simulation' | 'start_challenge' | 'view_project' | 'careeros_apply';
  url?: string;
  routeTarget?: string;
}

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  organizationVerified: boolean; // True ONLY for verified real employers/organizations
  nature: OpportunityNature; // Strict distinction: Practice Simulation vs Real Internship, etc.
  category: OpportunityCategory;
  location: string;
  locationType: 'remote' | 'hybrid' | 'onsite';
  skills: string[];
  experience: string; // e.g. "Early Career / No experience required", "Student / 0-1 yrs"
  description: string;
  whyItMayFit: string;
  matchScore?: number; // 0-100 calculated from user profile & evidence
  matchHighlights?: string[];
  missingSkills?: string[];
  compensation?: string; // e.g. "$35 - $42/hr", "Stipend $3,000", "Unpaid Learning Drill", "Volunteer"
  targetMarket?: 'us_na' | 'uk_europe' | 'india_south_asia' | 'latin_america' | 'asia_pacific' | 'global_remote';
  regionalCurrency?: string;
  salaryNumeric?: number;
  deadline?: string;
  postedDate: string;
  action: OpportunityAction;
}

export type ApplicationStatus =
  | 'Saved'
  | 'Applied'
  | 'Assessment'
  | 'Interview'
  | 'Offer'
  | 'Rejected';

// Backwards-compatible alias for existing code
export type ApplicationStage = ApplicationStatus;

export interface ApplicationItem {
  id: string;
  opportunityId?: string;
  company: string; // Required by spec
  role: string;    // Required by spec
  title: string;   // Synced with role for compatibility
  organization: string; // Synced with company for compatibility
  date: string;    // Application date or date added
  status: ApplicationStatus; // Saved | Applied | Assessment | Interview | Offer | Rejected
  stage: ApplicationStatus;  // Synced with status for compatibility
  nature: OpportunityNature;
  category: OpportunityCategory;
  location: string;
  notes: string;
  nextAction: string; // Required by spec
  nextStep?: string; // Synced with nextAction
  evidenceCited: string[]; // List of CareerOS evidence item titles/IDs cited
  resumeVersion?: string;
  followUpDate?: string;
  lastUpdated: string;
}

