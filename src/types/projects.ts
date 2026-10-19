export type ProjectLevel = 'Starter' | 'Beginner' | 'Intermediate' | 'Advanced';

export type ProjectField =
  | 'All Fields'
  | 'Data'
  | 'Business'
  | 'Design'
  | 'Marketing'
  | 'Research'
  | 'Writing'
  | 'Finance'
  | 'Education'
  | 'Health'
  | 'Operations'
  | 'Engineering'
  | 'Creative Work';

export interface ProjectStep {
  stepNumber: number;
  title: string;
  description: string;
  expectedOutput: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  field: ProjectField;
  level: ProjectLevel;
  timeEstimate: string;
  tagline: string;
  problem: string;
  goal: string;
  skills: string[];
  tools: string[];
  steps: ProjectStep[];
  deliverables: string[];
  example: {
    title: string;
    scenario: string;
    summary: string;
    keyHighlights: string[];
  };
  commonMistakes: string[];
  portfolioValue: string;
  resumeValue: {
    bulletPoints: string[];
  };
  interviewValue: {
    talkingPoints: string[];
    starFramework: {
      situation: string;
      task: string;
      action: string;
      result: string;
    };
  };
}
