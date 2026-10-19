export type CommunicationCategory =
  | 'professional_emails'
  | 'asking_questions'
  | 'giving_updates'
  | 'explaining_technical_work'
  | 'presentations'
  | 'meetings'
  | 'customer_communication'
  | 'manager_communication'
  | 'written_communication'
  | 'spoken_communication'
  | 'professional_messaging';

export type CommunicationMedium =
  | 'written'
  | 'spoken'
  | 'messaging'
  | 'written_communication'
  | 'spoken_communication'
  | 'professional_messaging';

export interface CommunicationExample {
  scenarioContext: string;
  goodExample: string;
  goodExplanation: string;
  suboptimalExample?: string;
  suboptimalExplanation?: string;
  keyPrinciples: string[];
}

export interface CommunicationPrompt {
  context: string;
  yourRole: string;
  audience: string;
  goal: string;
  constraintsOrContext: string[];
  suggestedStarter?: string;
  checklistBeforeSubmit: string[];
}

export interface CommunicationActivity {
  id: string;
  title: string;
  category: CommunicationCategory;
  medium: CommunicationMedium;
  estimatedTime: string;
  difficulty: 'Starter' | 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  whyItMatters: string;
  skillsPracticed: string[];
  example: CommunicationExample;
  prompt: CommunicationPrompt;
}

export interface ReviewCriteriaScores {
  clarityScore: number; // 1-100
  clarityNotes: string[];
  toneScore: number; // 1-100
  toneNotes: string[];
  structureScore: number; // 1-100
  structureNotes: string[];
  professionalismScore: number; // 1-100
  professionalismNotes: string[];
}

export type WorkspaceStep = 'example' | 'try' | 'feedback' | 'improve' | 'retry';

export interface ImprovementRecommendation {
  id: string;
  dimension: 'clarity' | 'tone' | 'structure' | 'professionalism';
  title: string;
  explanation: string;
  beforeSnippet?: string;
  afterSnippet?: string;
  actionSnippet?: string;
  applied?: boolean;
}

export interface ReviewAttemptHistory {
  attemptNumber: number;
  submittedAt: string;
  overallScore: number;
  scores: ReviewCriteriaScores;
  userInput: string;
}

export interface AICommunicationReview {
  id: string;
  activityId: string;
  submittedAt: string;
  attemptNumber: number;
  userInput: string;
  overallSummary: string;
  scores: ReviewCriteriaScores;
  overallScore: number;
  strengths: string[];
  areasToImprove: string[];
  suggestedRevision: string;
  actionableImprovements?: ImprovementRecommendation[];
  history?: ReviewAttemptHistory[];
  factualIntegrityAffirmed: boolean;
  accentOrPersonalityExcluded: boolean; // explicitly confirms zero judgment on accent or personal style
}
