import { DynamicTask, TaskFormatVariation, TaskProgressionLevel } from '../types/dynamicTask';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  sanitizedTask?: DynamicTask;
}

// Blocklist of unsafe, illegal, exploitative or malicious patterns
const UNSAFE_KEYWORDS = [
  'ddos',
  'malware',
  'keylogger',
  'ransomware',
  'exploit zero-day',
  'phishing',
  'unauthorized access',
  'bypass paywall',
  'steal credentials',
  'scrape private data',
  'unpaid client work',
  'do my homework',
  'crack password',
  'crypto miner',
  'trojan',
  'illegal',
];

export function validateAndSanitizeDynamicTask(raw: any): ValidationResult {
  const errors: string[] = [];

  if (!raw || typeof raw !== 'object') {
    return { valid: false, errors: ['Task payload must be a non-null object.'] };
  }

  // 1. Title validation
  const title = typeof raw.title === 'string' ? raw.title.trim() : '';
  if (!title || title.length < 5 || title.length > 150) {
    errors.push('Title must be a non-empty string between 5 and 150 characters.');
  }

  // 2. Career Area & Skill
  const careerArea = typeof raw.careerArea === 'string' ? raw.careerArea.trim() : 'Software & Frontend';
  const skill = typeof raw.skill === 'string' ? raw.skill.trim() : 'Problem Solving';
  const secondarySkills = Array.isArray(raw.secondarySkills)
    ? raw.secondarySkills.filter((s: any) => typeof s === 'string').map((s: string) => s.trim())
    : [];

  // 3. Difficulty progression
  const validDifficulties: TaskProgressionLevel[] = ['Starter', 'Beginner', 'Intermediate', 'Advanced'];
  let difficulty: TaskProgressionLevel = 'Beginner';
  if (validDifficulties.includes(raw.difficulty)) {
    difficulty = raw.difficulty;
  } else {
    difficulty = 'Beginner';
  }

  // 4. Format variation
  const validFormats: TaskFormatVariation[] = [
    'quick_task',
    'small_task',
    'medium_task',
    'project',
    'challenge',
    'simulation',
  ];
  let formatVariation: TaskFormatVariation = 'small_task';
  if (validFormats.includes(raw.formatVariation)) {
    formatVariation = raw.formatVariation;
  } else {
    formatVariation = 'small_task';
  }

  // 5. Time & Minutes
  const estimatedTime = typeof raw.estimatedTime === 'string' ? raw.estimatedTime.trim() : '25 mins';
  const estimatedMinutes = typeof raw.estimatedMinutes === 'number' && raw.estimatedMinutes > 0
    ? raw.estimatedMinutes
    : 25;

  // 6. Objective & Context
  const objective = typeof raw.objective === 'string' ? raw.objective.trim() : '';
  if (!objective || objective.length < 15) {
    errors.push('Task objective must be at least 15 characters long.');
  }

  const context = typeof raw.context === 'string' ? raw.context.trim() : '';
  if (!context || context.length < 20) {
    errors.push('Task context must be at least 20 characters long.');
  }

  // 7. Instructions array
  const instructions: string[] = Array.isArray(raw.instructions)
    ? raw.instructions.filter((i: any) => typeof i === 'string' && i.trim().length > 0).map((i: string) => i.trim())
    : [];
  if (instructions.length < 2) {
    errors.push('Task must provide at least 2 structured instructions steps.');
  }

  // 8. Expected Output
  const expectedOutput = typeof raw.expectedOutput === 'string' ? raw.expectedOutput.trim() : '';
  if (!expectedOutput || expectedOutput.length < 10) {
    errors.push('Expected output description must be at least 10 characters.');
  }

  // 9. Evaluation Criteria
  const evaluationCriteria: string[] = Array.isArray(raw.evaluationCriteria)
    ? raw.evaluationCriteria.filter((c: any) => typeof c === 'string' && c.trim().length > 0).map((c: string) => c.trim())
    : ['Produces verifiable working artifact', 'Meets semantic code or design standards'];

  // 10. Hints & Common Mistakes
  const hints: string[] = Array.isArray(raw.hints) && raw.hints.length > 0
    ? raw.hints.filter((h: any) => typeof h === 'string').map((h: string) => h.trim())
    : ['Break this step into the smallest verifiable piece before assembling.'];

  const commonMistakes: string[] = Array.isArray(raw.commonMistakes) && raw.commonMistakes.length > 0
    ? raw.commonMistakes.filter((m: any) => typeof m === 'string').map((m: string) => m.trim())
    : ['Skipping verification before declaring the task done.'];

  // 11. Reflection Questions & Next Recommended Step
  const reflectionQuestions: string[] = Array.isArray(raw.reflectionQuestions) && raw.reflectionQuestions.length > 0
    ? raw.reflectionQuestions.filter((q: any) => typeof q === 'string').map((q: string) => q.trim())
    : [
        'What was the most challenging technical decision in this exercise?',
        'How would you explain this deliverable to an interviewer in 2 sentences?',
      ];

  const nextRecommendedStep = typeof raw.nextRecommendedStep === 'string' && raw.nextRecommendedStep.trim().length > 0
    ? raw.nextRecommendedStep.trim()
    : 'Log deliverable in Career Evidence Vault and link to active Resume.';

  // 12. Safety & Exploit Guardrails
  const fullTextToInspect = `${title} ${objective} ${context} ${instructions.join(' ')} ${expectedOutput}`.toLowerCase();
  for (const badKeyword of UNSAFE_KEYWORDS) {
    if (fullTextToInspect.includes(badKeyword)) {
      errors.push(`Safety Policy Violation: Task contains prohibited or unsafe term ("${badKeyword}").`);
      break;
    }
  }

  // 13. Employer verification vs Simulation labeling
  const isSimulation = raw.isSimulation !== false; // Default to true unless explicitly verified
  let organization = undefined;

  if (raw.organization && typeof raw.organization === 'object') {
    if (raw.organization.isVerified === true && typeof raw.organization.name === 'string') {
      organization = {
        name: raw.organization.name.trim(),
        isVerified: true,
        verificationDetails: raw.organization.verificationDetails || 'Verified Employer Opportunity',
      };
    } else {
      // Unverified employer tasks must not claim to be real employers
      organization = {
        name: typeof raw.organization.name === 'string' ? raw.organization.name.trim() : 'Simulation Lab',
        isVerified: false,
        verificationDetails: 'Simulated Practice Environment (Not a verified employer)',
      };
    }
  }

  // 14. Example model
  const example = {
    title: raw.example?.title || `Completed Model Deliverable: ${title}`,
    scenario: raw.example?.scenario || `Simulated realistic scenario in ${careerArea}.`,
    deliverableContent: raw.example?.deliverableContent || `### Sample Output\n- **Output**: Verified implementation for ${skill}\n- **Outcome**: Confirmed functional specification.`,
    whatWasDoneWell: Array.isArray(raw.example?.whatWasDoneWell) && raw.example.whatWasDoneWell.length > 0
      ? raw.example.whatWasDoneWell
      : ['Clean separation of concerns', 'Verifiable implementation without scope creep'],
    commonMistakes: Array.isArray(raw.example?.commonMistakes) && raw.example.commonMistakes.length > 0
      ? raw.example.commonMistakes
      : ['Over-engineering before solving the core problem'],
  };

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  const sanitizedTask: DynamicTask = {
    id: raw.id || `dynamic-task-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    title,
    careerArea,
    skill,
    secondarySkills,
    difficulty,
    formatVariation,
    estimatedTime,
    estimatedMinutes,
    objective,
    context,
    instructions,
    example,
    expectedOutput,
    evaluationCriteria,
    hints,
    commonMistakes,
    reflectionQuestions,
    nextRecommendedStep,
    isSimulation,
    organization,
    generatedAt: raw.generatedAt || new Date().toISOString(),
    personalizedFor: raw.personalizedFor,
  };

  return { valid: true, errors: [], sanitizedTask };
}
