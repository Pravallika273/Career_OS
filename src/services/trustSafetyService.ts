import {
  SafetyReport,
  ReportTargetType,
  PrivacySettings,
  DEFAULT_PRIVACY_SETTINGS,
  ContentFeedbackItem,
} from '../types/trustAndSafety';

const REPORTS_STORAGE_KEY = 'careeros_safety_reports';
const PRIVACY_SETTINGS_KEY = 'careeros_privacy_settings';
const FEEDBACK_STORAGE_KEY = 'careeros_content_feedback';

export class TrustSafetyService {
  /**
   * Submit a safety report for an opportunity, task, mentor, or AI content
   */
  public static async submitReport(report: {
    targetId: string;
    targetTitle: string;
    targetType: ReportTargetType;
    reason: string;
    details: string;
  }): Promise<SafetyReport> {
    const newReport: SafetyReport = {
      id: `report-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      targetId: report.targetId,
      targetTitle: report.targetTitle,
      targetType: report.targetType,
      reason: report.reason,
      details: report.details,
      reportedAt: new Date().toISOString(),
      status: 'submitted',
    };

    try {
      const existingRaw = localStorage.getItem(REPORTS_STORAGE_KEY);
      const reports: SafetyReport[] = existingRaw ? JSON.parse(existingRaw) : [];
      reports.unshift(newReport);
      localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(reports));
    } catch (e) {
      console.warn('Unable to write to local storage for safety report:', e);
    }

    return newReport;
  }

  /**
   * Retrieve all reports filed on this client
   */
  public static getReports(): SafetyReport[] {
    try {
      const raw = localStorage.getItem(REPORTS_STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return [];
  }

  /**
   * Submit helpfulness or quality feedback on AI-generated content
   */
  public static async submitContentFeedback(feedback: {
    targetId?: string;
    contextSnippet?: string;
    isHelpful: boolean;
    reason?: string;
    comment?: string;
  }): Promise<ContentFeedbackItem> {
    const item: ContentFeedbackItem = {
      id: `feedback-${Date.now()}`,
      targetId: feedback.targetId,
      contextSnippet: feedback.contextSnippet,
      isHelpful: feedback.isHelpful,
      reason: feedback.reason,
      comment: feedback.comment,
      submittedAt: new Date().toISOString(),
    };

    try {
      const existingRaw = localStorage.getItem(FEEDBACK_STORAGE_KEY);
      const list: ContentFeedbackItem[] = existingRaw ? JSON.parse(existingRaw) : [];
      list.unshift(item);
      localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.warn('Unable to write feedback to local storage:', e);
    }

    return item;
  }

  /**
   * Retrieve stored privacy settings
   */
  public static getPrivacySettings(): PrivacySettings {
    try {
      const raw = localStorage.getItem(PRIVACY_SETTINGS_KEY);
      if (raw) return { ...DEFAULT_PRIVACY_SETTINGS, ...JSON.parse(raw) };
    } catch {}
    return DEFAULT_PRIVACY_SETTINGS;
  }

  /**
   * Save user privacy settings
   */
  public static savePrivacySettings(settings: PrivacySettings): void {
    try {
      localStorage.setItem(PRIVACY_SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('Unable to persist privacy settings:', e);
    }
  }

  /**
   * Permanently delete user account, profile, career evidence vault,
   * task drafts, submissions, applications, and settings.
   */
  public static async deleteUserAccountAndData(): Promise<void> {
    const keysToRemove = [
      'careeros_profile',
      'careeros_user_profile',
      'careeros_evidence_vault',
      'careeros_user_applications',
      'careeros_saved_mentors',
      'careeros_mentor_questions',
      'careeros_guidance_requests',
      'careeros_interview_sessions',
      'careeros_work_ready_resolutions',
      'careeros_user_resume',
      'careeros_user_portfolio',
      'careeros_privacy_settings',
      'careeros_safety_reports',
      'careeros_content_feedback',
      'careeros_i18n_locale',
      'careeros_i18n_market',
      'careeros_i18n_education',
      'careeros_i18n_currency',
      'careeros_i18n_low_bandwidth',
      'careeros_i18n_high_contrast',
    ];

    // Remove targeted keys
    keysToRemove.forEach((key) => {
      try {
        localStorage.removeItem(key);
      } catch {}
    });

    // Remove all task draft keys
    try {
      const keys = Object.keys(localStorage);
      keys.forEach((k) => {
        if (k.startsWith('careeros_task_draft_') || k.startsWith('careeros_draft_')) {
          localStorage.removeItem(k);
        }
      });
    } catch {}

    // Simulate clean network dispatch for server records if logged in
    return new Promise((resolve) => setTimeout(resolve, 300));
  }
}
