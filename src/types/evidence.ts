export type EvidenceCategory =
  | 'tasks'
  | 'projects'
  | 'challenges'
  | 'practice'
  | 'teamwork'
  | 'communication'
  | 'leadership'
  | 'mentor_feedback'
  | 'interview_practice'
  | 'certifications'
  | 'other';

export interface EvidenceItem {
  id: string;
  category: EvidenceCategory;
  activity: string; // The specific genuine activity performed
  date: string; // ISO string or human formatted date (e.g., '2026-10-04')
  skillsPracticed: string[];
  output: string; // Verifiable output or deliverable created
  reflection: string; // Student's own reflection on what was learned / improved
  feedback?: string; // Mentor, peer, evaluator or system-validated feedback
  evidenceLink?: string; // Link to GitHub repo, live deployment, PR, Figma, or recorded artifact
  timeSpent?: string;
  sourceType?: 'system_task' | 'external_verified' | 'manual_student';
  sourceTaskId?: string;
  verificationBadge?: 'Verified Micro-Proof' | 'Peer Reviewed' | 'Mentor Evaluated' | 'Self-Documented';
  inPortfolio?: boolean;
  inResume?: boolean;
}

export interface CareerMilestone {
  period: string; // e.g., 'October 2026'
  items: EvidenceItem[];
}

export type ActionExportType =
  | 'resume'
  | 'portfolio'
  | 'linkedin'
  | 'github'
  | 'interview';

export interface ExportPreviewData {
  type: ActionExportType;
  title: string;
  formattedContent: string;
  factualExplanation: string;
}
