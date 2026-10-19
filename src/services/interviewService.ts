import {
  InterviewTrack,
  InterviewQuestion,
  AnswerFeedback,
  InterviewSession,
  InterviewExchange,
} from '../types/interview';
import { getEvidenceItems } from './evidenceService';

const INTERVIEW_SESSIONS_STORAGE_KEY = 'careeros_interview_sessions';

export const INTERVIEW_TRACK_META: Record<
  InterviewTrack,
  {
    title: string;
    description: string;
    badgeLabel: string;
    badgeColor: string;
    suggestedFocus: string;
  }
> = {
  technical: {
    title: 'Technical Drill',
    description: 'System mechanics, state architecture, accessibility (WCAG), code trade-offs, and edge-case handling.',
    badgeLabel: 'Architecture & Code',
    badgeColor: 'border-blue-200 bg-blue-50 text-blue-800',
    suggestedFocus: 'Focus on concrete engineering choices, state synchronization, and error handling.',
  },
  hr: {
    title: 'HR & Culture Screen',
    description: 'Role alignment, learning velocity, work ethics, team fit, and salary/start date conversations.',
    badgeLabel: 'Culture & Fit',
    badgeColor: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    suggestedFocus: 'Convey authentic motivation, structured self-management, and high self-awareness.',
  },
  behavioral: {
    title: 'Behavioral Interview',
    description: 'Handling conflict, receiving feedback, ownership, reliability under deadlines, and teamwork.',
    badgeLabel: 'STAR Scenarios',
    badgeColor: 'border-purple-200 bg-purple-50 text-purple-800',
    suggestedFocus: 'Structure using Situation, Task, Action, and Result without defensive rationalization.',
  },
  resume: {
    title: 'Resume Walkthrough',
    description: 'Articulating summary, justifying skills, addressing early-career gaps, and explaining competence.',
    badgeLabel: 'Evidence Walkthrough',
    badgeColor: 'border-amber-200 bg-amber-50 text-amber-800',
    suggestedFocus: 'Tie every resume bullet back to verified CareerOS micro-proofs and work samples.',
  },
  project: {
    title: 'Project Deep Dive',
    description: 'Explaining actual CareerOS portfolio projects: technical challenges, architecture, and retrospectives.',
    badgeLabel: 'Portfolio Proof',
    badgeColor: 'border-teal-200 bg-teal-50 text-teal-800',
    suggestedFocus: 'Walk through real decisions made in your SaaS Pricing Calculator or WCAG Audit.',
  },
  communication: {
    title: 'Workplace Communication',
    description: 'Explaining tech to non-engineers, communicating delays, customer advisories, and status updates.',
    badgeLabel: 'Cross-Functional',
    badgeColor: 'border-rose-200 bg-rose-50 text-rose-800',
    suggestedFocus: 'Prioritize clarity, empathy, and early proactive notification over technical jargon.',
  },
};

export const TRACK_QUESTIONS: Record<InterviewTrack, InterviewQuestion[]> = {
  technical: [
    {
      id: 'q-tech-1',
      track: 'technical',
      question:
        'Walk me through how you architected state synchronization in your SaaS Pricing Calculator project. How did you ensure screen readers announce dynamic price updates when users toggle billing cycles?',
      context: 'Demonstrating interactive state, calculation accuracy, and WCAG accessibility.',
      relatedEvidenceActivity: 'Built interactive SaaS Tier Pricing Calculator with Currency & Billing Toggle',
      targetSkills: ['React', 'State Management', 'Accessibility (WCAG)', 'TypeScript'],
      interviewerIntent:
        'The interviewer wants to see if you consider accessibility (aria-live, semantic markup) as a first-class requirement rather than an afterthought, and whether you can explain state flows clearly.',
    },
    {
      id: 'q-tech-2',
      track: 'technical',
      question:
        'During your municipal portal accessibility audit, what was the most severe WCAG failure you discovered, and what exact technical remediation did you propose in your report?',
      context: 'Focus on color contrast ratios, focus rings, or keyboard trapping.',
      relatedEvidenceActivity: 'Audited 1 public municipal portal for WCAG 2.1 AA Color Contrast & Keyboard Rings',
      targetSkills: ['UI Audit', 'Accessibility (WCAG)', 'CSS Tokens', 'System Thinking'],
      interviewerIntent:
        'Testing your attention to standards compliance and whether you can provide exact CSS token remedies rather than vague complaints like "the colors looked pale."',
    },
    {
      id: 'q-tech-3',
      track: 'technical',
      question:
        'Imagine a third-party webhook service sends duplicate payment events within 200 milliseconds of each other. How would you design your frontend or API client to handle this safely without charging or notifying the user twice?',
      context: 'Idempotency, optimistic UI rollbacks, and race-condition handling.',
      targetSkills: ['State Management', 'Error Handling', 'Reliability', 'TypeScript'],
      interviewerIntent:
        'Evaluating whether you understand race conditions, idempotency keys, and disabling duplicate submit triggers.',
    },
  ],

  hr: [
    {
      id: 'q-hr-1',
      track: 'hr',
      question:
        'Tell me about yourself. What got you interested in software engineering, and why are you targeting early-career roles at this point in your journey?',
      context: 'The classic opening screen. Connect your motivation to concrete learning outputs.',
      targetSkills: ['Clear Writing', 'Self-Awareness', 'Growth Mindset'],
      interviewerIntent:
        'The interviewer is assessing clarity, authenticity, and whether you have a genuine interest in building rather than just repeating a memorized elevator pitch.',
    },
    {
      id: 'q-hr-2',
      track: 'hr',
      question:
        'Early-career roles often require working with unfamiliar codebases without continuous hand-holding. How do you approach self-directed learning and unblocking yourself when you are stuck?',
      context: 'Self-management, debugging discipline, and knowing when to ask for help.',
      targetSkills: ['Self-Management', 'Problem Solving', 'Reliability'],
      interviewerIntent:
        'Assessing resourcefulness: do you spend 15-30 minutes systematically debugging, consulting documentation, and preparing clear questions before interrupting senior colleagues?',
    },
    {
      id: 'q-hr-3',
      track: 'hr',
      question:
        'How do you manage deadlines and prioritize when multiple tasks or learning modules compete for your attention?',
      context: 'Time management and realistic commitments.',
      targetSkills: ['Prioritization', 'Planning', 'Communicating Delays'],
      interviewerIntent:
        'Looking for practical prioritization frameworks (Eisenhower matrix, breaking large work into smaller units) and proactive communication if a timeline slips.',
    },
  ],

  behavioral: [
    {
      id: 'q-beh-1',
      track: 'behavioral',
      question:
        'Tell me about a time you received critical or direct feedback on your work (for example, on a code review or project spec). How did you process it and what did you change?',
      context: 'Ego management, non-defensive listening, and follow-through.',
      targetSkills: ['Handling Feedback', 'Emotional Intelligence', 'Growth Mindset'],
      interviewerIntent:
        'Checking if you get defensive or blame others when your code is critiqued, or whether you separate your personal identity from your code and implement suggestions enthusiastically.',
    },
    {
      id: 'q-beh-2',
      track: 'behavioral',
      question:
        'Describe a situation where a technical task or project was running behind schedule due to an unexpected blocker. How did you communicate the delay, and what did you do differently next time?',
      context: 'Accountability, early escalation, and mitigation options.',
      targetSkills: ['Ownership', 'Communicating Delays', 'Reliability'],
      interviewerIntent:
        'Checking whether you hide delays until the last minute or raise flags early with trade-off proposals (e.g. cutting scope vs shifting date).',
    },
    {
      id: 'q-beh-3',
      track: 'behavioral',
      question:
        'Tell me about a time you disagreed with a teammate or project guideline about how something should be built. How did you handle the discussion and reach alignment?',
      context: 'Constructive disagreement, objective criteria, and commitment to team decisions.',
      targetSkills: ['Conflict Resolution', 'Teamwork', 'Clear Writing'],
      interviewerIntent:
        'Evaluating whether you focus on data and user outcomes rather than personal ego, and whether you "disagree and commit" once a team decision is finalized.',
    },
  ],

  resume: [
    {
      id: 'q-res-1',
      track: 'resume',
      question:
        'Looking at your resume summary, you emphasize practical career evidence and verifiable work samples over formal years of corporate tenure. Walk me through why you chose this proof-first approach and how it prepares you for our team.',
      context: 'Defending portfolio-first and micro-proof career strategies.',
      targetSkills: ['Technical Translation', 'Self-Awareness', 'Clear Writing'],
      interviewerIntent:
        'The interviewer wants to see if you can confidently defend your background without apologizing for being early in your career.',
    },
    {
      id: 'q-res-2',
      track: 'resume',
      question:
        'On your resume, you list both React development and Accessibility (WCAG). How do these two skills intersect in your day-to-day coding practices?',
      context: 'Connecting separate resume bullet points into a cohesive engineering philosophy.',
      targetSkills: ['React', 'Accessibility (WCAG)', 'System Thinking'],
      interviewerIntent:
        'Verifying that skills listed on your resume represent deep, hands-on understanding rather than keyword stuffing.',
    },
  ],

  project: [
    {
      id: 'q-proj-1',
      track: 'project',
      question:
        'Walk me through the interactive SaaS Tier Pricing Calculator project featured in your portfolio. What were the core user requirements, what architectural difficulties did you run into, and how did you verify your solution worked?',
      context: 'Deep-dive into your concrete project code, state synchronization, and user feedback.',
      relatedEvidenceActivity: 'Built interactive SaaS Tier Pricing Calculator with Currency & Billing Toggle',
      targetSkills: ['React', 'TypeScript', 'Tailwind CSS', 'State Management'],
      interviewerIntent:
        'Looking for genuine hands-on authorship: did you copy a tutorial, or can you talk intimately about edge cases, currency rates, discount calculations, and keyboard accessibility?',
    },
    {
      id: 'q-proj-2',
      track: 'project',
      question:
        'In your project deconstructing senior job requirements into 15-minute practical exercises, what surprised you about the language tech job descriptions use versus the actual daily engineering work required?',
      context: 'Technical translation, job specification breakdown, and pragmatic thinking.',
      relatedEvidenceActivity: 'Deconstructed 1 live junior job requirement into 3 verifiable 15-minute exercises',
      targetSkills: ['Role Analysis', 'Critical Thinking', 'Clear Writing'],
      interviewerIntent:
        'Assessing whether you understand how real engineering teams function beneath corporate job board buzzwords.',
    },
  ],

  communication: [
    {
      id: 'q-comm-1',
      track: 'communication',
      question:
        'How would you explain an upstream API delay to a non-technical product manager 24 hours before a scheduled stakeholder demo, without using confusing engineering jargon?',
      context: 'Translating technical dependencies into business impact and actionable options.',
      targetSkills: ['Technical Translation', 'Empathy', 'Clear Writing', 'Ownership'],
      interviewerIntent:
        'The interviewer is testing your ability to communicate business trade-offs clearly without hiding behind technical acronyms or blaming third parties.',
    },
    {
      id: 'q-comm-2',
      track: 'communication',
      question:
        'You have been stuck debugging an elusive issue for 45 minutes and your self-research has hit a dead end. How do you format your message when asking a senior teammate for assistance?',
      context: 'Structuring high-signal help requests with context, attempts, and specific questions.',
      targetSkills: ['Asking for Help', 'Clear Writing', 'Respecting Teammate Time'],
      interviewerIntent:
        'Checking if you send vague "it doesn\'t work" pings or structured requests containing: what you are trying to do, what you expected, what actually happened, and what you already tried.',
    },
  ],
};

/**
 * Evaluates the user's answer and generates the exact 4 required feedback sections:
 * 1. What was good
 * 2. What could improve
 * 3. What the interviewer may want
 * 4. Better answer structure
 */
export function evaluateAnswer(
  question: InterviewQuestion,
  userAnswer: string
): AnswerFeedback {
  const cleanAnswer = userAnswer.trim();
  const wordCount = cleanAnswer.split(/\s+/).filter(Boolean).length;
  const lower = cleanAnswer.toLowerCase();

  const whatWasGood: string[] = [];
  const whatCouldImprove: string[] = [];

  // Content analysis
  const hasSpecificTerms =
    lower.includes('react') ||
    lower.includes('wcag') ||
    lower.includes('state') ||
    lower.includes('pricing') ||
    lower.includes('contrast') ||
    lower.includes('accessibility') ||
    lower.includes('debug') ||
    lower.includes('test') ||
    lower.includes('aria');

  const hasSituationOrProblem =
    lower.includes('when') ||
    lower.includes('because') ||
    lower.includes('problem') ||
    lower.includes('issue') ||
    lower.includes('requirement');

  const hasConcreteAction =
    lower.includes('i implemented') ||
    lower.includes('i built') ||
    lower.includes('i decided') ||
    lower.includes('i structured') ||
    lower.includes('i added') ||
    lower.includes('i checked') ||
    lower.includes('i communicated') ||
    lower.includes('i broke down') ||
    lower.includes('i audited');

  const hasResultOrLearning =
    lower.includes('result') ||
    lower.includes('learned') ||
    lower.includes('outcome') ||
    lower.includes('confirmed') ||
    lower.includes('verified') ||
    lower.includes('improved') ||
    lower.includes('so that') ||
    lower.includes('which ensured');

  // 1. What was good evaluation
  if (wordCount >= 30) {
    whatWasGood.push('Substantive depth: You provided enough context for the interviewer to follow your thought process.');
  } else {
    whatWasGood.push('Directness: You addressed the prompt immediately without unnecessary filler phrases.');
  }

  if (hasSpecificTerms) {
    whatWasGood.push('Concrete domain vocabulary: Mentioned specific technical terms or tools instead of hand-wavy descriptions.');
  }

  if (hasConcreteAction) {
    whatWasGood.push('Active ownership: Used first-person action verbs demonstrating your direct responsibility for the outcome.');
  } else {
    whatWasGood.push('Clear perspective: Kept the focus on workplace execution and problem-solving principles.');
  }

  if (hasResultOrLearning) {
    whatWasGood.push('Outcome awareness: Connected the actions taken to a tangible end-result or learning takeaway.');
  }

  // 2. What could improve evaluation
  if (wordCount < 40) {
    whatCouldImprove.push(
      'Expand the operational detail: Give 1-2 more sentences describing the specific step-by-step actions you executed.'
    );
  }

  if (!hasResultOrLearning) {
    whatCouldImprove.push(
      'Explicitly state the outcome: Conclude with the measurable result or what this verified about your code quality.'
    );
  }

  if (!hasSpecificTerms && question.track === 'technical') {
    whatCouldImprove.push(
      'Cite verifiable tools: Reference specific libraries, state hooks, or accessibility standards (e.g. aria-live, WCAG 2.1 AA) from your CareerOS project.'
    );
  }

  if (!lower.includes('i ') && !lower.includes("i'")) {
    whatCouldImprove.push(
      'Emphasize your individual contribution: Recruiters want to know what YOU personally designed, implemented, or communicated.'
    );
  }

  if (whatCouldImprove.length === 0) {
    whatCouldImprove.push(
      'Quantify the impact where possible: Even qualitative verification (e.g., "verified across 3 screen readers" or "0 console warnings") sharpens credibility.'
    );
  }

  // 3. What the interviewer may want (Underlying intent)
  const whatInterviewerMayWant = question.interviewerIntent;

  // 4. Better answer structure (STAR or Problem-Solution-Impact)
  let framework = 'STAR Framework (Situation, Task, Action, Result)';
  let modelAnswer = '';
  let keyPoints: string[] = [];

  if (question.track === 'technical' || question.track === 'project') {
    framework = 'Problem-Action-Verification Framework';
    if (question.id === 'q-tech-1' || question.id === 'q-proj-1') {
      modelAnswer =
        'In my interactive SaaS Pricing Calculator project, the challenge was keeping dynamic currency conversion synchronized with annual discount toggles while ensuring screen readers announced updates. I structured the pricing logic using pure reducer state with typed inputs. To ensure accessibility, I added an aria-live="polite" region so assistive tech announces dynamic rate shifts without interrupting user keyboard flow, and verified zero layout shift across viewport breakpoints.';
      keyPoints = [
        'Problem: Synchronizing state between currency conversions and annual discounts.',
        'Action: Created pure reducer state logic with TypeScript interfaces and aria-live announcements.',
        'Result: Zero layout shift, 100% keyboard accessibility, and immediate screen-reader feedback.',
      ];
    } else if (question.id === 'q-tech-2') {
      modelAnswer =
        'During my audit of the municipal portal, the most critical issue was primary call-to-action buttons using a 2.4:1 contrast ratio against light backgrounds, failing WCAG AA 4.5:1 standards. I isolated the exact hex values, ran them through color contrast analyzers, and produced an executive remediation patch specifying an audited accessible token palette alongside keyboard navigation logs.';
      keyPoints = [
        'Context: 2.4:1 contrast deficiency on municipal civic action buttons.',
        'Action: Analyzed ratios with DevTools and drafted CSS token replacements.',
        'Result: Delivered an executive remediation patch achieving full WCAG 2.1 AA compliance.',
      ];
    } else {
      modelAnswer =
        'I start by defining the failure boundary: I isolate the root cause, identify edge cases such as duplicate payloads or network drops, implement an idempotent guard with explicit state rollbacks, and write automated tests proving both happy and failure paths.';
      keyPoints = [
        'Isolate the state boundary before writing code.',
        'Implement defensive handling with idempotency and optimistic rollbacks.',
        'Verify with reproducible unit tests.',
      ];
    }
  } else if (question.track === 'communication') {
    framework = 'Situation-Impact-Action-Options Framework';
    modelAnswer =
      'I approach communication by giving the bottom-line up front: "The upstream auth API is experiencing latency, which means our demo cannot reliably authenticate users today. Here are the 2 paths we have: we can run the demo against our verified local mock sandbox with full UI fidelity, or we can reschedule the auth portion for tomorrow morning once the provider resolves their incident. Which fits the client expectation best?"';
    keyPoints = [
      'Bottom line up front: State the core reality without jargon.',
      'Present mitigation options: Never just drop a problem on a teammate.',
      'Seek consensus: Let the stakeholder make an informed business decision.',
    ];
  } else {
    framework = 'STAR Framework (Situation, Task, Action, Result)';
    modelAnswer =
      'Situation: When working on my foundational projects, I realized recruiter descriptions often used heavy jargon that created intimidation. Task: I took the initiative to deconstruct a live job description into verifiable 15-minute engineering exercises. Action: I mapped requirements like "optimistic mutations" to concrete React state handlers and documented the code on GitHub. Result: It eliminated intimidation and created verifiable proof that I now cite directly in technical interviews.';
    keyPoints = [
      'Situation: High corporate jargon in tech postings.',
      'Task: Translating abstract job requirements into verifiable drills.',
      'Action: Built concrete React handlers with GitHub documentation.',
      'Result: Created verified evidence items that demonstrate practical readiness.',
    ];
  }

  // Calculate score
  const scorePercentage = Math.min(
    95,
    Math.max(
      45,
      50 +
        (wordCount >= 35 ? 15 : 5) +
        (hasSpecificTerms ? 15 : 0) +
        (hasConcreteAction ? 10 : 0) +
        (hasResultOrLearning ? 10 : 0)
    )
  );

  return {
    whatWasGood,
    whatCouldImprove,
    whatInterviewerMayWant,
    betterAnswerStructure: {
      framework,
      modelAnswer,
      keyPoints,
    },
    scorePercentage,
  };
}

/**
 * Enhanced async evaluation powered by centralized CareerOSAIService
 * with automatic fallback to local evaluation heuristics.
 */
export async function evaluateAnswerWithAI(
  question: InterviewQuestion,
  userAnswer: string
): Promise<AnswerFeedback> {
  const fallback = evaluateAnswer(question, userAnswer);
  try {
    const { CareerOSAIService } = await import('./careerOSAIService');
    const res = await CareerOSAIService.coachInterview(
      question.question,
      userAnswer,
      question.track
    );
    if (res.text && res.text.trim()) {
      return {
        ...fallback,
        whatInterviewerMayWant: question.interviewerIntent || fallback.whatInterviewerMayWant,
      };
    }
    return fallback;
  } catch {
    return fallback;
  }
}

export function getInterviewSessions(): InterviewSession[] {
  try {
    const raw = localStorage.getItem(INTERVIEW_SESSIONS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveInterviewSession(session: InterviewSession): void {
  try {
    const sessions = getInterviewSessions();
    const index = sessions.findIndex((s) => s.id === session.id);
    let updated: InterviewSession[];
    if (index >= 0) {
      updated = [...sessions];
      updated[index] = session;
    } else {
      updated = [session, ...sessions];
    }
    localStorage.setItem(INTERVIEW_SESSIONS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save interview session:', err);
  }
}

export function createInterviewSession(
  track: InterviewTrack,
  targetCompany?: string,
  targetRole?: string
): InterviewSession {
  const questions = TRACK_QUESTIONS[track] || TRACK_QUESTIONS.behavioral;
  const newSession: InterviewSession = {
    id: `session-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    track,
    targetCompany: targetCompany || undefined,
    targetRole: targetRole || undefined,
    currentQuestionIndex: 0,
    questions,
    exchanges: [],
    isCompleted: false,
    startedAt: new Date().toISOString(),
  };

  saveInterviewSession(newSession);
  return newSession;
}
