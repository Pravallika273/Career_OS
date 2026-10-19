export type MentorCategory =
  | 'career_guidance'
  | 'technical_skills'
  | 'communication'
  | 'interview_prep'
  | 'portfolio_review'
  | 'industry_knowledge'
  | 'leadership'
  | 'other';

export type MentorArchetype =
  | 'alumni'
  | 'young_professional'
  | 'experienced_professional'
  | 'founder'
  | 'industry_specialist';

export interface MentorProfile {
  id: string;
  name: string;
  role: string;
  company?: string;
  industry: string;
  experience: string; // e.g. "4 years", "8 years", "2 years"
  categories: MentorCategory[];
  topics: string[];
  availability: string; // e.g. "Async Q&A: within 24h", "1 session/month", "Open for project teardowns"
  shortIntroduction: string;
  archetype: MentorArchetype;
  avatarBg: string;
  initials: string;
  location?: string;
  preferredFormat: 'async' | 'written_review' | 'chat';
  sampleQuestions: string[];
  highlights?: string[];
}

export interface MentorQuestionRecord {
  id: string;
  mentorId: string;
  mentorName: string;
  mentorRole: string;
  question: string;
  relatedEvidenceActivity?: string;
  askedAt: string;
  status: 'answered' | 'pending';
  answer?: string;
  keyTakeaway?: string;
}

export interface GuidanceRequestRecord {
  id: string;
  mentorId: string;
  mentorName: string;
  mentorRole: string;
  category: MentorCategory;
  goal: string;
  message: string;
  preferredFormat: string;
  status: 'requested' | 'scheduled' | 'completed';
  createdAt: string;
  meetingDate?: string;
}
