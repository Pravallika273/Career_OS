export type InterviewTrack =
  | 'technical'
  | 'hr'
  | 'behavioral'
  | 'resume'
  | 'project'
  | 'communication';

export interface InterviewQuestion {
  id: string;
  track: InterviewTrack;
  question: string;
  context?: string;
  relatedEvidenceActivity?: string;
  targetSkills: string[];
  interviewerIntent: string;
}

export interface AnswerFeedback {
  whatWasGood: string[];
  whatCouldImprove: string[];
  whatInterviewerMayWant: string;
  betterAnswerStructure: {
    framework: string;
    modelAnswer: string;
    keyPoints: string[];
  };
  scorePercentage: number;
}

export interface InterviewExchange {
  id: string;
  questionIndex: number;
  question: InterviewQuestion;
  userAnswer: string;
  feedback: AnswerFeedback;
  answeredAt: string;
}

export interface InterviewSession {
  id: string;
  track: InterviewTrack;
  targetCompany?: string;
  targetRole?: string;
  currentQuestionIndex: number;
  questions: InterviewQuestion[];
  exchanges: InterviewExchange[];
  isCompleted: boolean;
  startedAt: string;
  completedAt?: string;
}
