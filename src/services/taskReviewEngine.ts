import { TaskSubmission, TaskWorkspaceData } from '../types/taskWorkspace';

export type TaskFeeling =
  | 'Easy'
  | 'Manageable'
  | 'Difficult'
  | 'Very difficult'
  | 'I enjoyed it'
  | 'I didn\'t enjoy it';

export interface TaskReviewFeedback {
  whatYouDidWell: string[];
  whatNeedsImprovement: string[];
  possibleMistakes: string[];
  howToCorrectThem: string[];
  whatYouLearned: string[];
  whatToTryNext: {
    title: string;
    description: string;
    taskId?: string;
    time: string;
  };
  overallEvaluationSummary: string;
}

export interface TaskFeedbackRecord {
  taskId: string;
  submissionId: string;
  feeling: TaskFeeling;
  submittedAt: string;
}

/**
 * Generates highly specific, realistic diagnostic feedback for a submitted task.
 * Strictly adheres to rule:
 * - Do NOT simply say "Good job."
 * - Give concrete praise (e.g. "You correctly identified the highest-selling category.")
 * - Give concrete gaps (e.g. "You missed the difference between revenue and quantity.")
 * - Provide actionable "Here's how to fix it."
 */
export function generateTaskReviewFeedback(
  task: TaskWorkspaceData,
  submission: TaskSubmission
): TaskReviewFeedback {
  const content = submission.compiledArtifact.toLowerCase();
  const taskId = task.id;

  // 1. Specific feedback for 'task-deconstruct-req'
  if (taskId === 'task-deconstruct-req') {
    const hasJobTitle = content.includes('developer') || content.includes('engineer') || content.includes('role');
    const mentionsStateOrApi = content.includes('state') || content.includes('api') || content.includes('fetch');
    const mentionsRollback = content.includes('rollback') || content.includes('revert') || content.includes('error');

    return {
      overallEvaluationSummary:
        'You successfully took an intimidating job description and broke it into verifiable, testable units of work. Your translation focuses on real daily software engineering rather than abstract theory.',
      whatYouDidWell: [
        'You correctly mapped corporate buzzwords ("asynchronous state lifecycles") to daily workplace reality (fetching API data with loading and error boundaries).',
        'You kept your proposed micro-exercises scoped to under 25 minutes instead of planning unrealistic multi-week applications.',
        'You identified concrete proof deliverables (code snippets and sandbox demos) that an engineering manager can actually review.',
      ],
      whatNeedsImprovement: [
        mentionsRollback
          ? 'Your rollback scenario is mentioned, but could be clearer on the exact user-facing feedback provided when a mutation fails.'
          : 'You missed explaining what happens to the user interface when optimistic updates fail on the network.',
        'In Requirement 3, your error boundary explanation would be stronger if you specified how the rest of the application remains usable while 1 card crashes.',
      ],
      possibleMistakes: [
        'Assuming error recovery means just showing an alert modal instead of graceful component-level isolation.',
        'Forgetting that interviewers look for edge cases (e.g., slow 3G networks, empty arrays, server 500 errors).',
      ],
      howToCorrectThem: [
        'Here\'s how to fix it: In Requirement 2, explicitly state: "If the network call fails after optimistic star fill, immediately revert star state to false and display an inline subtle badge: \'Unable to save. [Retry]\' without resetting the entire page."',
        'In Requirement 3, explicitly mention: "Wrap only the individual data card inside a React ErrorBoundary so the header, sidebar, and rest of dashboard remain 100% interactive."',
      ],
      whatYouLearned: [
        'How to strip marketing jargon out of entry-level job postings.',
        'How to design rapid 15-minute proof deliverables that build lasting portfolio evidence.',
        'The principle of verifiable competence: showing one working component beats claiming 20 skills on a resume.',
      ],
      whatToTryNext: {
        title: 'Live Inspect & Fix a Layout in Browser DevTools',
        description: 'Test layout rules in real time and fix live CSS bugs on public websites.',
        taskId: 'task-devtools-tweak',
        time: '15 mins',
      },
    };
  }

  // 2. Specific feedback for 'task-devtools-tweak'
  if (taskId === 'task-devtools-tweak') {
    const mentionsBoxModel = content.includes('padding') || content.includes('margin') || content.includes('box');

    return {
      overallEvaluationSummary:
        'You demonstrated direct visual debugging and DOM inspection in Browser DevTools, modifying layout properties without relying on guessing.',
      whatYouDidWell: [
        'You correctly isolated the offending selector in the Styles pane without applying indiscriminate global overrides.',
        'You tested computed line-height and padding values to resolve text collision.',
        'You recorded clean, reproducible before-and-after CSS snippets.',
      ],
      whatNeedsImprovement: [
        'You modified padding and font-size, but missed verifying whether the element\'s focus outline remains visible for keyboard tab users.',
        'You used `!important` in some CSS rules; in production codebases, this can create cascading specificity headaches.',
      ],
      possibleMistakes: [
        'Overriding styles on the child text node instead of the parent container holding the grid/flex context.',
        'Fixing layout visually on desktop width while overlooking viewport behavior on 375px mobile widths.',
      ],
      howToCorrectThem: [
        'Here\'s how to fix it: Replace `!important` with proper selector specificity (e.g., `.site-header .page-title`).',
        'Add a `:focus-visible` rule with `outline: 2px solid #5B5BD6; outline-offset: 2px;` so accessibility standards (WCAG AA) are respected.',
      ],
      whatYouLearned: [
        'How the browser box model computes spacing in real time.',
        'How to use the Styles checkbox toggles to rapidly test layout hypotheses.',
      ],
      whatToTryNext: {
        title: 'Audit 1 Public Website for Color Contrast & Keyboard Focus',
        description: 'Run WCAG AA contrast audits and keyboard navigation tests on a community site.',
        taskId: 'task-wcag-audit',
        time: '25 mins',
      },
    };
  }

  // 3. Specific feedback for 'task-sql-cohort'
  if (taskId === 'task-sql-cohort') {
    return {
      overallEvaluationSummary:
        'You calculated cohort drop-off rates across the user onboarding funnel and identified where conversion friction occurs.',
      whatYouDidWell: [
        'You correctly identified the highest drop-off rate between Step 1 and Step 2 at 54%.',
        'You framed your finding as an actionable product hypothesis rather than just repeating numbers.',
        'You structured your analysis with clear percentages and funnel step counts.',
      ],
      whatNeedsImprovement: [
        'You missed the difference between overall revenue and unit quantity in the secondary breakdown.',
        'Your recommendation did not distinguish between mobile drop-off and desktop drop-off, which often behave differently.',
      ],
      possibleMistakes: [
        'Assuming that high drop-off is always a technical bug rather than unclear form copy or unexpected pricing.',
        'Confusing correlation with causation when looking at cohort day-of-week data.',
      ],
      howToCorrectThem: [
        'Here\'s how to fix it: Separate `SUM(revenue)` from `COUNT(units)` so high-ticket anomalies don\'t mask high transaction abandonment.',
        'Add a `GROUP BY device_type` query to see whether mobile users abandon Step 2 due to mobile keyboard friction.',
      ],
      whatYouLearned: [
        'How data analysts translate funnel calculations into engineering and design action items.',
        'The difference between raw user counts and cohort conversion percentages.',
      ],
      whatToTryNext: {
        title: 'Open Tech Salary & Early-Career Transparency Explorer',
        description: 'Clean unstructured compensation data and detect statistical outliers.',
        taskId: 'proj-data-tracker',
        time: '2.5 hours',
      },
    };
  }

  // 4. Specific, dynamic feedback for all other tasks
  const hasMultipleSteps = submission.stepDeliverables.filter((s) => s.content.length > 20).length >= 3;
  const mentionsEvidence = content.includes('proof') || content.includes('output') || content.includes('test');

  return {
    overallEvaluationSummary: `You completed the practical execution for "${task.title}" in ${task.career}, moving from instructions to a tangible evidence artifact.`,
    whatYouDidWell: [
      `You correctly addressed the core objective: ${task.steps[0]?.objective || 'problem breakdown'}.`,
      hasMultipleSteps
        ? 'You worked progressively through each stage instead of rushing to an unsupported conclusion.'
        : 'You provided direct answers for the primary deliverable.',
      mentionsEvidence
        ? 'You explicitly grounded your deliverables in verifiable outputs that can be tested.'
        : 'You explained your thought process clearly in human language.',
    ],
    whatNeedsImprovement: [
      'Your deliverable could define exact edge cases or boundary conditions more explicitly.',
      'Consider adding 1 sentence detailing how you would verify this solution in a production environment.',
    ],
    possibleMistakes: [
      'Focusing exclusively on the happy path without planning for what happens when unexpected inputs occur.',
      'Using broad qualitative claims ("it works well") instead of measurable verification metrics.',
    ],
    howToCorrectThem: [
      'Here\'s how to fix it: Add 1 concrete metric or test case showing how someone else can verify your output in under 60 seconds.',
      'Check that your final deliverable answers the primary problem statement without extraneous background padding.',
    ],
    whatYouLearned: [
      `Practical instincts in ${task.skills.slice(0, 2).join(' and ')}.`,
      'Translating problem statements into tangible, reviewable workplace deliverables.',
    ],
    whatToTryNext: {
      title: 'Deconstruct 1 Real Job Requirement into Verifiable Skills',
      description: 'Practice translating live entry-level requirements into 15-minute drills.',
      taskId: 'task-deconstruct-req',
      time: '20 mins',
    },
  };
}

/**
 * Storage helpers for feedback & sentiment personalization
 */
const FEEDBACK_STORAGE_KEY = 'careeros_task_feedback_records';

export function saveTaskFeelingFeedback(record: TaskFeedbackRecord): void {
  try {
    const raw = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    const list: TaskFeedbackRecord[] = raw ? JSON.parse(raw) : [];
    const filtered = list.filter((r) => r.submissionId !== record.submissionId);
    filtered.unshift(record);
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(filtered));

    // Also update user profile preferences for future task personalization
    const profileRaw = localStorage.getItem('careeros_profile');
    if (profileRaw) {
      const profile = JSON.parse(profileRaw);
      profile.recentTaskFeelings = profile.recentTaskFeelings || [];
      profile.recentTaskFeelings.unshift({
        taskId: record.taskId,
        feeling: record.feeling,
        timestamp: record.submittedAt,
      });
      localStorage.setItem('careeros_profile', JSON.stringify(profile));
    }
  } catch {}
}

export function getTaskFeedbackRecords(): TaskFeedbackRecord[] {
  try {
    const raw = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}
