export interface UserProfile {
  name: string;
  email: string;
  location: string;
  education: string;
  degree: string;
  graduationStage: string;
  careerSituation: string;
  careerGoal: string;
  currentLevel: string;
  careerClarity: string;
  skills: string[];
  interests: string[];
  availableTime: string;
  urgency: string;
  concerns: string[];
  confidence: string;
  preferredLearningStyle: string;
  definitionOfSuccess: string;
  needRightNow: string;
  primaryWorry: string;
  completedAt?: string;
}

export const DEFAULT_USER_PROFILE: UserProfile = {
  name: 'Jordan',
  email: 'jordan@example.com',
  location: '',
  education: 'Undergraduate Student',
  degree: 'Computer Science & Design',
  graduationStage: 'Final year',
  careerSituation: 'Fresher / early beginner',
  careerGoal: 'Full-Stack Software & Product Engineering',
  currentLevel: 'Level 1: Foundation Builder',
  careerClarity: 'Rough direction, exploring options',
  skills: ['HTML & CSS', 'JavaScript basics', 'Problem Solving'],
  interests: ['Web Development', 'UI Engineering', 'Open Source'],
  availableTime: '5-8 hours / week',
  urgency: 'Medium (Next 3-6 months)',
  concerns: ["I don't have experience."],
  confidence: 'Cautious but motivated',
  preferredLearningStyle: 'Practical tasks with concrete examples',
  definitionOfSuccess: 'Building tangible proof and landing my first internship',
  needRightNow: 'I want to learn and gain experience first.',
  primaryWorry: "I don't have experience.",
};

