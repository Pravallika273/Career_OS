export type WorkReadyArea =
  | 'communication'
  | 'teamwork'
  | 'professionalism'
  | 'critical_thinking'
  | 'emotional_intelligence'
  | 'self_management'
  | 'leadership'
  | 'lifelong_learning';

export type ExperienceLevelTag = 'Foundational' | 'Real-World' | 'Complex Dilemma';

export type EmotionalIntelligenceActivity =
  | 'recognizing_emotions'
  | 'responding_to_disagreement'
  | 'showing_empathy'
  | 'handling_feedback'
  | 'understanding_perspective'
  | 'building_trust';

export type SelfManagementActivity =
  | 'planning'
  | 'prioritization'
  | 'time_management'
  | 'deadline_management'
  | 'working_without_supervision'
  | 'breaking_large_work'
  | 'handling_distractions';

export type ProfessionalBehaviorActivity =
  | 'ownership'
  | 'reliability'
  | 'asking_for_help'
  | 'communicating_delays'
  | 'meeting_expectations'
  | 'following_through';

export type WorkReadyModuleKey =
  | 'emotional_intelligence'
  | 'self_management'
  | 'professional_behavior'
  | 'all';

export interface ScenarioChoice {
  id: string;
  label: string;
  actionText: string;
  isRecommended: boolean;
  whyItWorks: string;
  potentialConsequences: string;
  whatAProfessionalConsiders: string;
  howToImprove: string;
  whatHappened?: string;
  whySomeoneReactsThisWay?: string;
  whatCouldYouDoDifferently?: string;
}

export interface WorkReadyScenario {
  id: string;
  area: WorkReadyArea;
  moduleKey?: 'emotional_intelligence' | 'self_management' | 'professional_behavior';
  activityType?: string; // e.g. 'recognizing_emotions', 'prioritization', 'ownership', etc.
  title: string;
  headlinePrompt: string; // e.g., "Your manager asks for an update. What do you say?"
  workplaceContext: string;
  dilemmaStakes: string;
  // Core AI workplace explanation framework (What happened? Why might someone react this way? What could you do differently?)
  whatHappenedExplainer?: string;
  whyReactionOccurredExplainer?: string;
  whatToDoDifferentlyExplainer?: string;
  whatCouldYouDoDifferentlyExplainer?: string;
  choices: ScenarioChoice[];
  keyMindsetTakeaway: string;
}

export interface ScenarioResolutionRecord {
  scenarioId: string;
  chosenOptionId: string;
  selectedAt: string;
  reflectionNotes?: string;
  area: WorkReadyArea;
}

export interface AreaProgressSummary {
  area: WorkReadyArea;
  totalScenarios: number;
  completedScenarios: number;
  depthStage: 'Unexplored' | 'Developing Judgment' | 'Pragmatic & Grounded' | 'Seasoned Judgment';
  practicalInsightsGained: string[];
}

export interface WorkReadyAreaMeta {
  id: WorkReadyArea;
  label: string;
  tagline: string;
  description: string;
  examplePrompt: string;
  iconName: string;
}
