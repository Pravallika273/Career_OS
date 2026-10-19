import { RouteId } from './navigation';
import { TaskDifficulty } from './tasks';

export type PaceMode =
  | 'urgent_job_readiness'
  | 'exploratory_experimentation'
  | 'steady_proof_building';

export type UserFeedbackType =
  | 'enjoyed'
  | 'struggled'
  | 'avoid'
  | 'completed'
  | 'too_easy';

export interface ContinuousSignalDimension {
  id: string;
  label: string;
  description: string;
  activeSignals: string[];
  impactOnRoadmap: string;
}

export interface ContinuousLearnerSignals {
  // 1. What the user says
  whatUserSays: {
    statedGoal: string;
    statedUrgency: string;
    primaryWorry: string;
    recentQueries: string[];
    reflectionStatements: string[];
  };
  // 2. What they choose
  whatTheyChoose: {
    selectedTrack: string;
    learningStyle: string;
    preferredTimeCommitment: string;
    chosenFormat: string;
  };
  // 3. What they enjoy
  whatTheyEnjoy: {
    enjoyedTracks: string[];
    topAffinityAreas: string[];
    positiveFeedbackCount: number;
    enjoysResearch: boolean;
  };
  // 4. What they avoid
  whatTheyAvoid: {
    avoidedTracks: string[];
    skippedCategories: string[];
    dismissedRecommendations: string[];
  };
  // 5. What they complete
  whatTheyComplete: {
    completedTaskIds: string[];
    completedTasksCount: number;
    completedProjectsCount: number;
    completedScenariosCount: number;
  };
  // 6. Where they struggle
  whereTheyStruggle: {
    struggleSkills: Array<{
      skill: string;
      detectedFrom: string;
      deconstructedCount: number;
      isCurrentlyDeconstructed: boolean;
    }>;
    hasTechnicalStruggle: boolean;
  };
  // 7. How they perform
  howTheyPerform: {
    averageInterviewScore: number;
    scenarioAccuracyScore: number;
    verifiedDeliverablesCount: number;
    performanceTier: 'developing' | 'competent' | 'strong';
  };
  // 8. What skills they demonstrate
  whatSkillsTheyDemonstrate: {
    verifiedSkills: string[];
    uniqueSkillCount: number;
    badgeCount: number;
  };
  // 9. What opportunities they pursue
  whatOpportunitiesTheyPursue: {
    pursuedOpportunityTypes: string[]; // e.g. "real_job", "practice_simulation", "community_project"
    activeApplicationsCount: number;
    savedJobsCount: number;
    targetRoles: string[];
  };
}

export interface UserBehavioralProfile {
  lastUpdated: string;
  paceMode: PaceMode;
  affinities: Record<string, number>; // e.g., research: 4, technical: 1, communication: 2, design: 1
  struggleSkills: Array<{
    skill: string;
    detectedFrom: string;
    deconstructedCount: number;
    isCurrentlyDeconstructed?: boolean;
  }>;
  avoidedTracks: string[];
  enjoyedTracks: string[];
  demonstratedSkills: string[];
  pursuedOpportunityTypes: string[];
  feedbackLogs: Array<{
    recommendationId: string;
    type: UserFeedbackType;
    timestamp: string;
    note?: string;
    skillOrTrack?: string;
  }>;
  signalsSnapshot?: ContinuousLearnerSignals;
}

export interface RecommendationActionDetail {
  title: string;
  description: string;
  timeEstimate: string;
  actionRoute: RouteId;
  targetId?: string;
  deliverableOutput: string;
  actionLabel: string;
  stepBreakdown?: {
    stepNumber: number;
    totalSteps: number;
    stepObjective: string;
    concreteAction: string;
  };
}

export interface RecommendationRationale {
  primaryReason: string;
  signalsCited: string[]; // Exact signals cited e.g. ["Repeated enjoyment of research tasks", "High urgency (ready in 2-3 months)"]
  adaptiveActionTaken: string; // e.g. "Prioritized job-readiness artifacts over theoretical reading", "Deconstructed asynchronous state into a 15-minute micro-drill"
  learningStyleMatch?: string;
}

export interface PersonalizedRecommendation {
  id: string;
  title: string;
  actionType:
    | 'task'
    | 'micro_drill'
    | 'job_readiness'
    | 'interview'
    | 'portfolio'
    | 'explore'
    | 'simulation';
  difficulty: TaskDifficulty;
  category: string;
  whatShouldIDoNext: RecommendationActionDetail;
  whyAmISeeingThis: RecommendationRationale;
  isDeconstructedSkill?: boolean;
  parentStruggleSkill?: string;
  breakdownStepNumber?: number;
  totalBreakdownSteps?: number;
}

export interface PersonalizedRoadmap {
  id: string;
  learnerName: string;
  currentMilestoneTitle: string;
  urgencyCalibration:
    | 'Job Readiness Sprint'
    | 'Exploratory Experimentation Track'
    | 'Balanced Proof Building';
  urgencyRationale: string;
  activeNextStep: PersonalizedRecommendation;
  upcomingSteps: PersonalizedRecommendation[];
  completedStepsCount: number;
  adaptiveSignalsSummary: {
    topAffinities: string[];
    deconstructedSkills: string[];
    urgencyDriver: string;
    avoidedTopics: string[];
    demonstratedSkillsCount: number;
  };
  continuousSignals: ContinuousLearnerSignals;
}
