export type ReportTargetType = 'opportunity' | 'task' | 'mentor' | 'ai_content' | 'general_feedback';

export type OpportunityReportReason =
  | 'misleading_compensation'
  | 'expired_listing'
  | 'fraudulent_company'
  | 'unverified_employer'
  | 'inappropriate_content'
  | 'broken_link'
  | 'other';

export type TaskReportReason =
  | 'broken_template'
  | 'inaccurate_prompt'
  | 'unrealistic_difficulty'
  | 'offensive_content'
  | 'solution_spoiler'
  | 'other';

export type MentorReportReason =
  | 'impersonation'
  | 'inappropriate_behavior'
  | 'unverified_credentials'
  | 'unresponsive'
  | 'spam_or_solicitation'
  | 'other';

export type AIContentReportReason =
  | 'hallucinated_achievement'
  | 'hallucinated_employer'
  | 'guaranteed_employment'
  | 'attempted_student_work'
  | 'inaccurate_or_harmful_advice'
  | 'privacy_or_pii_leak'
  | 'other';

export interface SafetyReport {
  id: string;
  targetId: string;
  targetTitle: string;
  targetType: ReportTargetType;
  reason: string;
  details: string;
  reportedAt: string;
  status: 'submitted' | 'under_review' | 'resolved';
}

export interface PrivacySettings {
  profileVisibility: 'private' | 'mentors_only' | 'public';
  aiPersonalizationConsent: boolean;
  hideContactInfo: boolean;
  preventSearchEngineIndexing: boolean;
  requireExplicitPublishConfirmation: boolean;
}

export const DEFAULT_PRIVACY_SETTINGS: PrivacySettings = {
  profileVisibility: 'private',
  aiPersonalizationConsent: true,
  hideContactInfo: true,
  preventSearchEngineIndexing: true,
  requireExplicitPublishConfirmation: true,
};

export interface ContentFeedbackItem {
  id: string;
  targetId?: string;
  contextSnippet?: string;
  isHelpful: boolean;
  reason?: string;
  comment?: string;
  submittedAt: string;
}
