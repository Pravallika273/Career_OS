export type ResumeTemplateId = 'clean' | 'professional' | 'modern' | 'ats_friendly';

export type ResumeSectionType =
  | 'summary'
  | 'experience'
  | 'projects'
  | 'evidence'
  | 'skills'
  | 'education'
  | 'certifications'
  | 'achievements';

export interface ResumeContactInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedinUrl: string;
  githubUrl: string;
  portfolioUrl: string;
}

export interface ResumeEducation {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string;
  highlights?: string[];
}

export interface ResumeExperience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
  isFromEvidence?: boolean;
  evidenceId?: string;
}

export interface ResumeProject {
  id: string;
  title: string;
  role?: string;
  techStack: string[];
  link?: string;
  bullets: string[];
  isFromEvidence?: boolean;
  evidenceId?: string;
}

export interface ResumeEvidenceHighlight {
  id: string;
  evidenceId: string;
  title: string;
  category: string;
  date: string;
  outputSummary: string;
  skills: string[];
  verificationBadge?: string;
  link?: string;
}

export interface ResumeSkills {
  technical: string[];
  toolsAndFrameworks: string[];
  softAndProfessional: string[];
}

export interface ResumeCertification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  verificationBadge?: string;
}

export interface ResumeAchievement {
  id: string;
  title: string;
  date: string;
  description: string;
  metricOrProof?: string;
}

export interface ResumeData {
  id: string;
  title: string;
  targetRole: string;
  templateId: ResumeTemplateId;
  contact: ResumeContactInfo;
  summary: string;
  sectionOrder: ResumeSectionType[];
  education: ResumeEducation[];
  experience: ResumeExperience[];
  projects: ResumeProject[];
  evidenceHighlights: ResumeEvidenceHighlight[];
  skills: ResumeSkills;
  certifications: ResumeCertification[];
  achievements: ResumeAchievement[];
  lastSaved: string;
  evidenceCitationCount: number;
  showEvidenceBadges: boolean;
}

export type AIAssistanceAction =
  | 'improve_summary'
  | 'improve_project_description'
  | 'improve_skill_relevance'
  | 'improve_clarity'
  | 'remove_repetition';

export interface AIAssistanceOption {
  id: AIAssistanceAction;
  label: string;
  description: string;
  applicableSections: ResumeSectionType[];
  icon: string;
}

export interface AIAssistanceResult {
  action: AIAssistanceAction;
  targetSection: ResumeSectionType;
  targetItemId?: string;
  originalContent: string;
  suggestedContent: string;
  explanation: string;
  improvementsApplied: string[];
  guardrailNote: string;
}
