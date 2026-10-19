export interface TaskWorkspaceStep {
  stepNumber: number;
  title: string;
  objective: string;
  guidance: string;
  prompt: string;
  starterTemplate: string;
  checkpoints: string[];
  stuckTips: string[];
}

export interface TaskExample {
  title: string;
  scenario: string;
  deliverableContent: string;
  approach: string;
  whatWasDoneWell: string[];
  whatBeginnerShouldNotice: string[];
  commonMistakes: string[];
}

export interface TaskWorkspaceData {
  id: string;
  title: string;
  career: string;
  skills: string[];
  difficulty: 'Starter' | 'Beginner' | 'Intermediate' | 'Advanced';
  time: string;
  timeMinutes: number;
  overview: string;
  whyItMatters: string;
  skillDevelopmentSummary: string[];
  finalOutputDescription: string;
  finalOutputFormat: string;
  example: TaskExample;
  steps: TaskWorkspaceStep[];
}

export interface TaskDraft {
  taskId: string;
  lastUpdated: string;
  currentStepIndex: number;
  stepResponses: Record<number, string>; // step 1-4
  completedSteps: number[];
  reflectionNote?: string;
  timeSpentSeconds?: number;
}

export interface TaskSubmission {
  id: string;
  taskId: string;
  taskTitle: string;
  career: string;
  difficulty: string;
  submittedAt: string;
  stepDeliverables: Array<{
    stepNumber: number;
    title: string;
    content: string;
  }>;
  compiledArtifact: string;
  reflection: string;
  timeSpentMinutes: number;
}
