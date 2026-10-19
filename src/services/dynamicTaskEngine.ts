import {
  DynamicTask,
  TaskGenerationOptions,
  TaskProgressionLevel,
  TaskFormatVariation,
  FORMAT_VARIATION_META,
} from '../types/dynamicTask';
import { UserProfile } from '../types/user';
import { buildCareerOSUserContext } from './aiContextService';
import { validateAndSanitizeDynamicTask } from './dynamicTaskValidator';
import { TaskWorkspaceData } from '../types/taskWorkspace';
import { TaskItem } from '../types/tasks';

const DYNAMIC_TASKS_STORAGE_KEY = 'careeros_dynamic_tasks';

export function getDynamicTasks(): DynamicTask[] {
  try {
    const raw = localStorage.getItem(DYNAMIC_TASKS_STORAGE_KEY);
    if (!raw) return getInitialSeedDynamicTasks();
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : getInitialSeedDynamicTasks();
  } catch {
    return getInitialSeedDynamicTasks();
  }
}

export function saveDynamicTask(task: DynamicTask): void {
  try {
    const current = getDynamicTasks();
    const filtered = current.filter((t) => t.id !== task.id);
    const updated = [task, ...filtered];
    localStorage.setItem(DYNAMIC_TASKS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save dynamic task:', err);
  }
}

export function getDynamicTaskById(taskId: string): DynamicTask | undefined {
  const all = getDynamicTasks();
  return all.find((t) => t.id === taskId);
}

/**
 * Generate a personalized task based on all 11 user context signals.
 */
export async function generatePersonalizedTask(
  options: TaskGenerationOptions = {},
  userProfile?: UserProfile
): Promise<DynamicTask> {
  const context = buildCareerOSUserContext(userProfile);

  const difficulty: TaskProgressionLevel = options.difficulty || 'Beginner';
  const formatVariation: TaskFormatVariation = options.formatVariation || 'small_task';
  const meta = FORMAT_VARIATION_META[formatVariation];

  // Construct structured generation prompt
  const prompt = `Generate 1 personalized CareerOS task in JSON format based on:
- User Interests: ${context.interests.join(', ')}
- Current Skills: ${context.skills.join(', ')}
- Career Direction & Goal: ${context.goal}
- Experience Level: ${context.profile.currentLevel}
- Target Difficulty: ${difficulty}
- Task Format: ${meta.label} (${meta.timeRange}, variation: ${formatVariation})
- Available Time: ${context.availableTime}
- Urgency: ${context.urgency}
- Previous Tasks: ${context.completedTasks.map((t) => t.title).join('; ') || 'None yet'}
- Feedback Takeaways: ${context.taskFeedback.map((f) => f.improvements.join(', ')).join('; ') || 'Focus on concrete verification'}
- Preferred Learning Style: Practical step-by-step with inspectable output deliverable

JSON SCHEMA REQUIREMENTS:
{
  "title": string (5-100 chars),
  "careerArea": string (e.g. "${context.goal}"),
  "skill": string,
  "secondarySkills": string[],
  "difficulty": "${difficulty}",
  "formatVariation": "${formatVariation}",
  "estimatedTime": "${meta.timeRange}",
  "estimatedMinutes": number,
  "objective": string,
  "context": string (realistic workplace scenario),
  "instructions": string[] (at least 3 step-by-step instructions),
  "example": {
    "title": string,
    "scenario": string,
    "deliverableContent": string,
    "whatWasDoneWell": string[],
    "commonMistakes": string[]
  },
  "expectedOutput": string,
  "evaluationCriteria": string[] (at least 2 criteria),
  "hints": string[],
  "commonMistakes": string[],
  "reflectionQuestions": string[],
  "nextRecommendedStep": string,
  "isSimulation": true
}
Return ONLY valid JSON matching this schema.`;

  try {
    const response = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        capability: 'project_generation',
        userPrompt: prompt,
        context,
        detailLevel: 'detailed',
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const rawText = data.text || '';
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        parsed.personalizedFor = {
          studentGoal: context.goal,
          level: context.profile.currentLevel,
          reasonWhyChosen: `Generated for ${context.goal} targeting ${difficulty} level (${meta.label}).`,
        };
        const validation = validateAndSanitizeDynamicTask(parsed);
        if (validation.valid && validation.sanitizedTask) {
          saveDynamicTask(validation.sanitizedTask);
          return validation.sanitizedTask;
        } else {
          console.warn('AI task validation had errors:', validation.errors);
        }
      }
    }
  } catch (err) {
    console.warn('Server AI generation failed, using intelligent local task synthesis:', err);
  }

  // Fallback: Synthesize deterministic high-quality task matching inputs
  const synthesized = synthesizePersonalizedTask(options, context);
  saveDynamicTask(synthesized);
  return synthesized;
}

/**
 * High-fidelity deterministic synthesis engine when offline or API is unavailable.
 */
function synthesizePersonalizedTask(
  options: TaskGenerationOptions,
  context: ReturnType<typeof buildCareerOSUserContext>
): DynamicTask {
  const difficulty: TaskProgressionLevel = options.difficulty || 'Beginner';
  const format: TaskFormatVariation = options.formatVariation || 'small_task';
  const meta = FORMAT_VARIATION_META[format];
  const goal = context.goal || 'Frontend Engineering';
  const primarySkill = options.targetSkill || context.skills[0] || 'React';

  const taskCatalog = [
    {
      level: 'Starter' as TaskProgressionLevel,
      format: 'quick_task' as TaskFormatVariation,
      title: 'Inspect & Document Live UI Accessibility Tree in DevTools',
      skill: 'Accessibility (WCAG)',
      secondary: ['Chrome DevTools', 'ARIA', 'UI Inspection'],
      estTime: '15 mins',
      estMins: 15,
      obj: 'Open Chrome DevTools Accessibility tab on any public site and verify if the primary button has an accessible name.',
      ctx: 'In early-career UI engineering, recruiters look for candidates who verify screen reader support rather than guessing.',
      instructions: [
        'Open DevTools (F12) on a live website and open the Accessibility pane in the Elements drawer.',
        'Locate the primary Call-To-Action button and inspect its computed Name and Role.',
        'Record whether the button has an explicit aria-label or accessible text node in your notes.',
      ],
      output: 'A 1-paragraph DevTools Accessibility Audit snippet documenting the element, computed name, and WCAG AA status.',
    },
    {
      level: 'Beginner' as TaskProgressionLevel,
      format: 'small_task' as TaskFormatVariation,
      title: 'Build Resilient Asynchronous Data Fetching Hook with Error Fallback',
      skill: 'React State Management',
      secondary: ['TypeScript', 'Error Handling', 'Async/Await'],
      estTime: '30 mins',
      estMins: 30,
      obj: 'Implement a custom React hook that manages data, loading, and error states without unmounted memory leaks.',
      ctx: 'You are working on a team where the backend API occasionally returns 504 gateway timeouts. Your UI must not crash.',
      instructions: [
        'Write a custom TypeScript hook `useAsyncResource<T>()` with explicit loading, error, and data state values.',
        'Implement an AbortController cleanup in the useEffect to cancel in-flight requests on component unmount.',
        'Provide a Retry button that calls the refetch callback safely.',
      ],
      output: 'A self-contained TypeScript file containing the hook and a demo component with a working retry action.',
    },
    {
      level: 'Intermediate' as TaskProgressionLevel,
      format: 'medium_task' as TaskFormatVariation,
      title: 'Simulate Optimistic UI Mutation with Rollback on Server Failure',
      skill: 'Optimistic State',
      secondary: ['React', 'UX Resilience', 'TypeScript'],
      estTime: '50 mins',
      estMins: 50,
      obj: 'Implement an instant bookmark toggle that immediately reflects user intent and reverts state if the network call rejects.',
      ctx: 'Users complain that liking an item feels laggy on mobile. Product management requests instant UI feedback.',
      instructions: [
        'Create a BookmarkButton that immediately sets active state in local component state upon click.',
        'Simulate a mock network call with a 15% random failure rate after 1200ms.',
        'If the mock network rejects, revert the bookmark state gracefully and display a gentle inline notification.',
      ],
      output: 'Working component code demonstrating immediate visual feedback, graceful rollback handling, and retry mechanics.',
    },
    {
      level: 'Advanced' as TaskProgressionLevel,
      format: 'project' as TaskFormatVariation,
      title: 'Architect Fully Accessible Multi-Step Checkout Modal with Focus Trapping',
      skill: 'Design Systems',
      secondary: ['Accessibility (WCAG)', 'Keyboard Navigation', 'Focus Management'],
      estTime: '2 hours',
      estMins: 120,
      obj: 'Build a 3-step modal dialog that traps keyboard focus, closes on Escape, and announces active steps to VoiceOver.',
      ctx: 'Your team is refactoring a checkout flow to pass an external accessibility audit for public municipal compliance.',
      instructions: [
        'Construct a multi-step modal with step indicators and keyboard tab cycle locking.',
        'Implement `aria-live="polite"` step announcement banners for screen readers.',
        'Document the WCAG 2.1 AA success criteria passed in a clean project README.',
      ],
      output: 'A complete GitHub-ready mini project with live preview, component files, and an accessibility compliance audit report.',
    },
  ];

  // Match closest or default
  const matched =
    taskCatalog.find((t) => t.level === difficulty && t.format === format) ||
    taskCatalog.find((t) => t.level === difficulty) ||
    taskCatalog[1];

  const now = new Date().toISOString();
  const id = `dynamic-task-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

  return {
    id,
    title: matched.title,
    careerArea: goal,
    skill: matched.skill || primarySkill,
    secondarySkills: matched.secondary,
    difficulty,
    formatVariation: format,
    estimatedTime: matched.estTime,
    estimatedMinutes: matched.estMins,
    objective: matched.obj,
    context: matched.ctx,
    instructions: matched.instructions,
    example: {
      title: `Model Deliverable: ${matched.title}`,
      scenario: `Simulated realistic scenario in ${goal}.`,
      deliverableContent: `### Model Output Extract\n- **Target**: ${matched.obj}\n- **Implementation**: Completed within ${matched.estTime}.\n- **Evidence**: Verifiable code deliverable prepared for review.`,
      whatWasDoneWell: ['Addressed the constraint directly', 'Documented clean edge-case handling'],
      commonMistakes: ['Skipping error boundaries', 'Ignoring keyboard accessibility'],
    },
    expectedOutput: matched.output,
    evaluationCriteria: [
      'Produces a working verifiable deliverable',
      'Follows industry standard conventions without unnecessary dependencies',
      'Includes clear documentation ready to cite as evidence',
    ],
    hints: [
      'Write the simplest passing implementation first before adding polish.',
      'Check browser console for warnings or unexpected re-renders.',
    ],
    commonMistakes: [
      'Overcomplicating the solution before testing the happy path.',
      'Forgetting to test keyboard navigation or error fallbacks.',
    ],
    reflectionQuestions: [
      'How does this task demonstrate practical competence to a future employer?',
      'What unexpected edge case did you encounter while completing it?',
    ],
    nextRecommendedStep: 'Save deliverable to Career Evidence Vault and generate a verified resume bullet point.',
    isSimulation: true,
    generatedAt: now,
    personalizedFor: {
      studentGoal: goal,
      level: context.profile.currentLevel,
      reasonWhyChosen: `Synthesized dynamically for ${goal} at ${difficulty} level (${meta.label}).`,
    },
  };
}

/**
 * Seed initial dynamic tasks so the user immediately sees a rich progression from day one.
 */
function getInitialSeedDynamicTasks(): DynamicTask[] {
  return [
    {
      id: 'dynamic-task-seed-1',
      title: 'Inspect & Document Live UI Accessibility Tree in DevTools',
      careerArea: 'Software & Frontend',
      skill: 'Accessibility (WCAG)',
      secondarySkills: ['Chrome DevTools', 'ARIA', 'UI Inspection'],
      difficulty: 'Starter',
      formatVariation: 'quick_task',
      estimatedTime: '15 mins',
      estimatedMinutes: 15,
      objective: 'Open Chrome DevTools Accessibility tab on any public site and verify if the primary button has an accessible name.',
      context: 'In early-career UI engineering, hiring managers look for candidates who verify screen reader support rather than assuming.',
      instructions: [
        'Open DevTools (F12) on any live website and inspect the primary call-to-action button.',
        'Switch to the Accessibility tab in the Elements drawer and note the computed accessible name.',
        'Document whether screen readers would announce the button accurately.',
      ],
      example: {
        title: 'Municipal Civic Portal Button Audit',
        scenario: 'Auditing public accessibility compliance.',
        deliverableContent: `Element: <button class="btn-primary">Get Started</button>\nComputed Name: "Get Started"\nRole: button\nContrast Ratio: 4.8:1 (Passes WCAG AA)`,
        whatWasDoneWell: ['Verified exact computed properties', 'Cited WCAG AA threshold'],
        commonMistakes: ['Relying solely on visual appearance'],
      },
      expectedOutput: 'A concise 1-paragraph accessibility inspection report documenting element tag, computed name, and WCAG AA status.',
      evaluationCriteria: ['Identifies computed accessibility tree', 'Reports specific WCAG ratio'],
      hints: ['Use Ctrl+Shift+C to inspect directly.'],
      commonMistakes: ['Confusing title attributes with accessible names'],
      reflectionQuestions: ['Why is an accessible name critical for screen readers?'],
      nextRecommendedStep: 'Build a component with explicit aria-label and keyboard focus ring.',
      isSimulation: true,
      generatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      personalizedFor: {
        studentGoal: 'Frontend Engineer',
        level: 'Starter',
        reasonWhyChosen: 'High-yield 15-minute verification drill.',
      },
    },
    {
      id: 'dynamic-task-seed-2',
      title: 'Build Resilient Asynchronous Data Fetching Hook with Error Fallback',
      careerArea: 'Software & Frontend',
      skill: 'React State Management',
      secondarySkills: ['TypeScript', 'Error Handling', 'Async/Await'],
      difficulty: 'Beginner',
      formatVariation: 'small_task',
      estimatedTime: '30 mins',
      estimatedMinutes: 30,
      objective: 'Implement a custom React hook that manages data, loading, and error states without unmounted memory leaks.',
      context: 'You are working on a team where the backend API occasionally returns 504 gateway timeouts. Your UI must handle it gracefully.',
      instructions: [
        'Create `useFetchData<T>()` in TypeScript with loading, error, and data state variables.',
        'Implement an AbortController in useEffect cleanup to prevent state updates after unmount.',
        'Build a simple demo component that renders a retry button on error.',
      ],
      example: {
        title: 'Product Catalog Fetcher',
        scenario: 'Handling network latency without blank screen crashes.',
        deliverableContent: `export function useFetchData(url) {\n  const [state, setState] = useState({ loading: true, data: null, error: null });\n  // AbortController cleanup included\n  return { ...state, refetch };\n}`,
        whatWasDoneWell: ['Separated concerns cleanly', 'Included explicit retry callback'],
        commonMistakes: ['Forgetting cleanup functions on unmount'],
      },
      expectedOutput: 'Self-contained TypeScript hook and demo component with retry button.',
      evaluationCriteria: ['Handles loading, error, and success states', 'Prevents memory leaks with cleanup'],
      hints: ['Remember to return a cleanup function from useEffect.'],
      commonMistakes: ['Setting state after component unmounts'],
      reflectionQuestions: ['How would you explain your error handling approach in an interview?'],
      nextRecommendedStep: 'Add optimistic caching to your hook.',
      isSimulation: true,
      generatedAt: new Date(Date.now() - 86400000).toISOString(),
      personalizedFor: {
        studentGoal: 'Frontend Engineer',
        level: 'Beginner',
        reasonWhyChosen: 'Core state management drill required for early career engineering roles.',
      },
    },
    {
      id: 'dynamic-task-seed-3',
      title: 'Simulate Optimistic UI Mutation with Rollback on Server Failure',
      careerArea: 'Software & Frontend',
      skill: 'Optimistic State',
      secondarySkills: ['React', 'UX Resilience', 'TypeScript'],
      difficulty: 'Intermediate',
      formatVariation: 'medium_task',
      estimatedTime: '50 mins',
      estimatedMinutes: 50,
      objective: 'Implement an instant bookmark toggle that immediately reflects user intent and reverts state if the network call rejects.',
      context: 'Users complain that liking an item feels laggy on mobile. Product management requests instant UI feedback.',
      instructions: [
        'Build a BookmarkToggle component with optimistic visual state toggle on click.',
        'Simulate a mock network call with a 15% random failure rate after 1000ms.',
        'If the request rejects, revert the bookmark state and display a gentle inline notification.',
      ],
      example: {
        title: 'Optimistic Bookmark Button with Rollback',
        scenario: 'Handling intermittent mobile connectivity.',
        deliverableContent: `// Optimistic state update\nsetBookmarked(nextState);\ntry {\n  await api.save(id);\n} catch {\n  setBookmarked(!nextState);\n  showToast("Failed to save. Reverted.");\n}`,
        whatWasDoneWell: ['Immediate tactile UI response', 'Clear rollback and user notification'],
        commonMistakes: ['Silent failures where the UI lies to the user'],
      },
      expectedOutput: 'Working interactive component demonstrating optimistic updates and rollback handling.',
      evaluationCriteria: ['Instant response on click', 'Accurate state rollback on simulated network error'],
      hints: ['Store previous state before mutating so you can restore on catch.'],
      commonMistakes: ['Leaving optimistic state active when server errors out'],
      reflectionQuestions: ['When is optimistic UI dangerous (e.g. money transfers)?'],
      nextRecommendedStep: 'Write a STAR interview story explaining this rollback architecture.',
      isSimulation: true,
      generatedAt: new Date().toISOString(),
      personalizedFor: {
        studentGoal: 'Frontend Engineer',
        level: 'Intermediate',
        reasonWhyChosen: 'Prepares for technical interview discussions around state synchronization.',
      },
    },
  ];
}

/**
 * Adapter: Convert DynamicTask to TaskWorkspaceData for TaskWorkspaceView execution.
 */
export function convertDynamicTaskToWorkspaceData(task: DynamicTask): TaskWorkspaceData {
  return {
    id: task.id,
    title: task.title,
    career: task.careerArea,
    skills: [task.skill, ...task.secondarySkills],
    difficulty: task.difficulty,
    time: task.estimatedTime,
    timeMinutes: task.estimatedMinutes,
    overview: task.context,
    whyItMatters: task.objective,
    skillDevelopmentSummary: [
      `Primary focus: ${task.skill}`,
      `Practice format: ${FORMAT_VARIATION_META[task.formatVariation].label} (${task.estimatedTime})`,
      ...task.evaluationCriteria,
    ],
    finalOutputDescription: task.expectedOutput,
    finalOutputFormat: 'Structured Evidence Deliverable (Markdown / Code / Audit Memo)',
    example: {
      title: task.example.title,
      scenario: task.example.scenario,
      deliverableContent: task.example.deliverableContent,
      approach:
        'The candidate focused on creating an inspectable, verified deliverable without scope creep.',
      whatWasDoneWell: task.example.whatWasDoneWell,
      whatBeginnerShouldNotice: [
        'Notice how clarity and conciseness beat unnecessary complexity every time.',
        'Notice that proof comes from verifiable details, not buzzwords.',
      ],
      commonMistakes: task.commonMistakes,
    },
    steps: task.instructions.slice(0, 4).map((inst, idx) => ({
      stepNumber: idx + 1,
      title: `Step ${idx + 1}: ${inst.split('.')[0] || 'Execute Phase'}`,
      objective: inst,
      guidance: `Follow the step instructions carefully: "${inst}". Focus on tangible output.`,
      prompt: `Record your work and notes for Step ${idx + 1}:`,
      starterTemplate: `Step ${idx + 1} Deliverable:\n- Objective: ${inst}\n- Output / Code / Notes:\n\n`,
      checkpoints: [
        `Completed requirements for Step ${idx + 1}`,
        'Verified output syntax and clarity',
      ],
      stuckTips: task.hints,
    })),
  };
}

/**
 * Adapter: Convert DynamicTask to TaskItem for listing in TasksView.
 */
export function convertDynamicTaskToTaskItem(task: DynamicTask): TaskItem {
  return {
    id: task.id,
    title: task.title,
    tab: 'tasks',
    career: task.careerArea,
    skills: [task.skill, ...task.secondarySkills],
    difficulty: task.difficulty,
    time: task.estimatedTime,
    timeMinutes: task.estimatedMinutes,
    interest: task.skill,
    whatYouWillDo: task.objective,
    whyItMatters: task.context,
    expectedOutput: task.expectedOutput,
    steps: task.instructions,
    isRightNowEligible: task.formatVariation === 'quick_task' || task.formatVariation === 'small_task',
  };
}
