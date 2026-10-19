export type SkillCategory =
  | 'technical'
  | 'creative'
  | 'business'
  | 'communication'
  | 'research'
  | 'domain'
  | 'other';

export interface SkillCategoryDefinition {
  id: SkillCategory;
  label: string;
  description: string;
  skills: string[];
}

export const SKILL_CATEGORIES_CATALOG: SkillCategoryDefinition[] = [
  {
    id: 'technical',
    label: 'Technical Skills',
    description: 'Coding, database queries, tooling, and system logic',
    skills: [
      'HTML & CSS',
      'JavaScript / TypeScript',
      'Python Basics',
      'SQL & Databases',
      'Git & Version Control',
      'REST APIs & Web Services',
      'React / Frontend Frameworks',
      'Debugging & DevTools',
      'Command Line (Bash/Terminal)',
      'Spreadsheets & Advanced Excel',
    ],
  },
  {
    id: 'creative',
    label: 'Creative Skills',
    description: 'Visual ergonomics, interface layout, and creative problem solving',
    skills: [
      'Figma & UI Wireframing',
      'Visual Hierarchy & Typography',
      'Prototyping & User Flows',
      'Design Thinking',
      'Copywriting & Content Design',
      'Color Theory & Accessibility',
      'Graphic Design Basics',
      'Video Storytelling & Editing',
    ],
  },
  {
    id: 'business',
    label: 'Business Skills',
    description: 'Product prioritization, market strategy, and stakeholder alignment',
    skills: [
      'Product Prioritization',
      'Customer Empathy & Discovery',
      'Market & Competitor Analysis',
      'Project Planning & Scoping',
      'Sales & Outreach',
      'Basic Financial Literacy',
      'Process Improvement',
      'Startup Fundamentals',
    ],
  },
  {
    id: 'communication',
    label: 'Communication Skills',
    description: 'Expressing ideas with clarity, listening, and collaborative teamwork',
    skills: [
      'Concise Written Communication',
      'Explaining Technical Concepts Simply',
      'Active Listening & Note Taking',
      'Constructive Feedback Giving',
      'Presenting & Public Speaking',
      'Cross-Functional Collaboration',
      'Conflict Resolution',
      'Professional Documentation',
    ],
  },
  {
    id: 'research',
    label: 'Research Skills',
    description: 'Empirical inquiry, survey analysis, and validating assumptions',
    skills: [
      'User Interviews & Surveys',
      'Synthesizing Qualitative Data',
      'Fact-Checking & Source Audit',
      'Benchmarking & Usability Testing',
      'Scientific Methodology',
      'Root Cause Analysis',
      'Trend Spotting & Literature Review',
    ],
  },
  {
    id: 'domain',
    label: 'Domain Skills',
    description: 'Specialized context in healthcare, education, law, policy, or finance',
    skills: [
      'Healthcare & Patient Context',
      'Educational Principles (Pedagogy)',
      'Accounting & Budgeting',
      'Civic Tech & Public Policy',
      'Legal Compliance & Ethics',
      'Environmental & Sustainability',
      'E-commerce & Retail Operations',
    ],
  },
  {
    id: 'other',
    label: 'Other & Human Skills',
    description: 'Self-management, fast learning, and adaptability',
    skills: [
      'Rapid Self-Directed Learning',
      'Time Management & Focus',
      'Resourcefulness & Curiosity',
      'Imposter Syndrome Resilience',
      'Multilingual Fluency',
      'Attention to Detail',
    ],
  },
];

export interface SkillToActionInput {
  skills: string[];
  interests: string[];
  careerDirection: string;
  experienceLevel: string;
  availableTime: string;
  isUnknownSkillsMode?: boolean;
}

export interface CareerDirectionMatch {
  id: string;
  title: string;
  category: string;
  matchScore: number;
  whyThisFitsYou: string;
  matchedSkills: string[];
  growthSkills: string[];
}

export interface PracticalTaskRec {
  id: string;
  title: string;
  timeEstimate: string;
  difficulty: string;
  whyThisFitsYou: string;
  skillsUsed: string[];
  deliverable: string;
  steps: string[];
}

export interface SmallProjectRec {
  id: string;
  title: string;
  timeCommitment: string;
  difficulty: string;
  whyThisFitsYou: string;
  problemStatement: string;
  concreteDeliverables: string[];
  evidenceProofOutcome: string;
  milestones: { step: string; output: string }[];
}

export interface SkillBuildingActivityRec {
  id: string;
  skillName: string;
  category: string;
  priority: 'High leverage' | 'Recommended' | 'Emerging';
  whyThisFitsYou: string;
  recommendedStartingAction: string;
  timeToAcquire: string;
}

export interface SkillRecommendationsResult {
  headlineSummary: string;
  possibleDirections: CareerDirectionMatch[];
  practicalTasks: PracticalTaskRec[];
  smallProjects: SmallProjectRec[];
  skillBuildingActivities: SkillBuildingActivityRec[];
}
