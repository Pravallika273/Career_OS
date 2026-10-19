export type CareerOSCapability =
  | 'career_exploration'
  | 'career_planning'
  | 'task_recommendation'
  | 'task_explanation'
  | 'task_examples'
  | 'task_hints'
  | 'task_feedback'
  | 'project_generation'
  | 'skill_gap_analysis'
  | 'resume_improvement'
  | 'portfolio_writing'
  | 'linkedin_writing'
  | 'github_readme_writing'
  | 'interview_practice'
  | 'workplace_scenario_coaching'
  | 'stuck_support'
  | 'reflection'
  | 'general_assistant';

export interface StructuredUserContext {
  profile: {
    name: string;
    bio?: string;
    currentLevel: string;
    primaryWorry?: string;
  };
  education?: {
    degree?: string;
    institution?: string;
    status?: string;
  };
  goal: string;
  careerClarity: string;
  interests: string[];
  skills: string[];
  availableTime: string;
  urgency: string;
  completedTasks: {
    id: string;
    title: string;
    completedAt?: string;
    skillsVerified?: string[];
  }[];
  taskFeedback: {
    taskId: string;
    strengths: string[];
    improvements: string[];
  }[];
  projects: {
    id: string;
    title: string;
    status: string;
    techStack: string[];
    deliverableSummary?: string;
  }[];
  careerEvidence: {
    activity: string;
    category: string;
    output: string;
    verificationBadge?: string;
    skillsPracticed: string[];
  }[];
  resume: {
    targetRole: string;
    summary: string;
    atsReadinessScore: number;
    bulletCount: number;
    topSkills: string[];
  };
  applications: {
    totalActive: number;
    inInterview: number;
    recentTargetRoles: string[];
  };
  interviewPractice: {
    completedSessionsCount: number;
    recentTracksPracticed: string[];
    averageScorePercentage: number;
  };
  workplaceSkillDevelopment: {
    completedModulesCount: number;
    focusAreas: string[];
  };
}

export interface CareerOSAIRequest {
  capability: CareerOSCapability;
  userPrompt: string;
  context?: Partial<StructuredUserContext>;
  detailLevel?: 'concise' | 'detailed';
  conversationHistory?: { sender: 'user' | 'assistant'; text: string }[];
}

export interface CareerOSAIResponse {
  text: string;
  capability: CareerOSCapability;
  suggestedAction?: {
    label: string;
    routeId?: string;
    targetPayload?: string;
  };
  followUpPrompts?: string[];
  expansionAvailable?: boolean;
}
