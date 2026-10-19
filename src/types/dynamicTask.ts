export type TaskProgressionLevel = 'Starter' | 'Beginner' | 'Intermediate' | 'Advanced';

export type TaskFormatVariation =
  | 'quick_task'
  | 'small_task'
  | 'medium_task'
  | 'project'
  | 'challenge'
  | 'simulation';

export interface DynamicTaskExample {
  title: string;
  scenario: string;
  deliverableContent: string;
  whatWasDoneWell: string[];
  commonMistakes: string[];
}

export interface DynamicTask {
  id: string;
  title: string;
  careerArea: string;
  skill: string;
  secondarySkills: string[];
  difficulty: TaskProgressionLevel;
  formatVariation: TaskFormatVariation;
  estimatedTime: string;
  estimatedMinutes: number;
  objective: string;
  context: string;
  instructions: string[];
  example: DynamicTaskExample;
  expectedOutput: string;
  evaluationCriteria: string[];
  hints: string[];
  commonMistakes: string[];
  reflectionQuestions: string[];
  nextRecommendedStep: string;
  isSimulation: boolean;
  organization?: {
    name: string;
    isVerified: boolean;
    verificationDetails?: string;
  };
  generatedAt: string;
  personalizedFor?: {
    studentGoal?: string;
    level?: string;
    reasonWhyChosen?: string;
  };
}

export interface TaskGenerationOptions {
  difficulty?: TaskProgressionLevel;
  formatVariation?: TaskFormatVariation;
  targetSkill?: string;
  careerArea?: string;
  focusTopic?: string;
}

export const FORMAT_VARIATION_META: Record<
  TaskFormatVariation,
  { label: string; timeRange: string; badgeLabel: string; description: string }
> = {
  quick_task: {
    label: 'Quick Task',
    timeRange: '5–15 mins',
    badgeLabel: 'Quick Drill',
    description: 'Rapid focused exercise to reinforce an isolated concept or syntax pattern.',
  },
  small_task: {
    label: 'Small Task',
    timeRange: '20–35 mins',
    badgeLabel: 'Single Deliverable',
    description: 'Self-contained milestone that generates an inspectable artifact.',
  },
  medium_task: {
    label: 'Medium Task',
    timeRange: '45–75 mins',
    badgeLabel: 'Multi-Step Execution',
    description: 'Deep dive requiring planning, code execution, and reflection.',
  },
  project: {
    label: 'Project',
    timeRange: '2–4 hours',
    badgeLabel: 'Portfolio Proof',
    description: 'Substantive end-to-end work suitable for GitHub and resume citation.',
  },
  challenge: {
    label: 'Challenge',
    timeRange: '30–60 mins',
    badgeLabel: 'Timed Problem',
    description: 'Time-boxed problem solving testing edge-case resilience.',
  },
  simulation: {
    label: 'Simulation',
    timeRange: '30–60 mins',
    badgeLabel: 'Workplace Scenario',
    description: 'Realistic simulated workplace friction, PR review, or client requirement.',
  },
};

export const PROGRESSION_LEVEL_META: Record<
  TaskProgressionLevel,
  { label: string; stage: string; summary: string }
> = {
  Starter: {
    label: 'Starter',
    stage: 'Level 1: Orientation & Deconstruction',
    summary: 'Focuses on breaking down intimidating requirements and understanding core concepts.',
  },
  Beginner: {
    label: 'Beginner',
    stage: 'Level 2: Execution & Output',
    summary: 'Building working components, running audits, and writing clean technical notes.',
  },
  Intermediate: {
    label: 'Intermediate',
    stage: 'Level 3: Edge Cases & Trade-offs',
    summary: 'Handling state synchronization, accessibility edge cases, and asynchronous delays.',
  },
  Advanced: {
    label: 'Advanced',
    stage: 'Level 4: Architecture & Systems',
    summary: 'Full-stack integration, performance optimizations, and cross-functional leadership.',
  },
};
