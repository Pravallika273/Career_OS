import { TaskItem, TASKS_CATALOG } from '../types/tasks';
import {
  TaskWorkspaceData,
  TaskExample,
  TaskWorkspaceStep,
  TaskDraft,
  TaskSubmission,
} from '../types/taskWorkspace';
import { getDynamicTaskById, convertDynamicTaskToWorkspaceData } from './dynamicTaskEngine';

// Curated Deep Workspace Data for key tasks
const CURATED_WORKSPACES: Record<string, Partial<TaskWorkspaceData>> = {
  'task-deconstruct-req': {
    id: 'task-deconstruct-req',
    title: 'Deconstruct 1 Real Job Requirement into Verifiable Skills',
    career: 'Software & Frontend',
    skills: ['Role Analysis', 'Critical Thinking', 'Skill Translation', 'Clear Writing'],
    difficulty: 'Starter',
    time: '20 mins',
    timeMinutes: 20,
    overview:
      'Locate 1 live entry-level job posting in your target career track. Select 3 intimidating or jargon-heavy requirements and translate each into a 15-minute practical exercise that proves you understand the underlying concept.',
    whyItMatters:
      'Job descriptions are often written by recruiters using exaggerated jargon. Learning to deconstruct them eliminates imposter syndrome and helps you target the exact problem-solving behaviors companies test for.',
    skillDevelopmentSummary: [
      'Role requirement deconstruction & requirement parsing',
      'Translating corporate buzzwords into concrete daily actions',
      'Designing rapid micro-exercises to build proof fast',
      'Self-directed career readiness without course overload',
    ],
    finalOutputDescription:
      'A structured 3-part Markdown breakdown documenting the original posting, your plain-language translation of 3 requirements, and 3 actionable 15-minute exercises with expected outputs.',
    finalOutputFormat: 'Structured Markdown Document (3 translated requirements + 3 micro-actions)',
    example: {
      title: 'Junior Frontend Engineer posting at a FinTech Startup',
      scenario:
        'A job post stated: "Seeking an engineer with demonstrated proficiency in complex asynchronous client-side state, optimistic mutation flows, and resilient error recovery."',
      deliverableContent: `### Requirement Breakdown: FinTech Junior Frontend Role

#### Requirement 1: "Complex asynchronous client-side state"
- **Corporate Speak:** "Proficiency in managing complex asynchronous state lifecycles."
- **Plain-English Translation:** The hiring team wants to know: when you fetch data from an API, does your UI handle loading spinners, empty responses, and data caching without crashing?
- **15-Minute Micro-Action:** Write a custom React hook \`useFetchUsers()\` that explicitly returns \`{ data, isLoading, error }\` and render a fallback spinner and retry button.
- **Proof Deliverable:** A 25-line TypeScript hook with unit test or sandbox demo link.

#### Requirement 2: "Optimistic mutation flows"
- **Corporate Speak:** "Design optimistic UI updates for real-time transactional responsiveness."
- **Plain-English Translation:** Update the UI immediately when the user clicks a button, rather than waiting 800ms for the server to reply. If the server fails, roll the change back.
- **15-Minute Micro-Action:** Build a "Bookmark" toggle button. On click, toggle filled star instantly. Simulate a 10% chance of server failure with \`setTimeout\`; if failure occurs, reset the star and show a gentle error badge.
- **Proof Deliverable:** A sandbox component demonstrating instant UI feedback and graceful rollback.

#### Requirement 3: "Resilient error recovery"
- **Corporate Speak:** "Implement robust fault-tolerant boundary protections."
- **Plain-English Translation:** Don't let 1 broken component crash the whole page into a blank white screen.
- **15-Minute Micro-Action:** Wrap a broken mock card in a React Error Boundary that displays: "We couldn't load this card. [Try Again]" while the rest of the application remains fully interactive.
- **Proof Deliverable:** An Error Boundary demo component preventing app tree unmounting.`,
      approach:
        'The candidate resisted feeling intimidated by words like "asynchronous lifecycle" and "optimistic mutation." They asked: "What does an engineer sitting at their desk actually do on Tuesday at 2 PM to satisfy this?" They broke each requirement down into the smallest possible 10-line experiment.',
      whatWasDoneWell: [
        'Ignored hype and identified the core technical behavior the company really wanted.',
        'Kept each micro-action under 20 minutes so it could be practiced in one sitting.',
        'Clearly defined the exact proof artifact that could be linked in a portfolio or mentioned in an interview.',
      ],
      whatBeginnerShouldNotice: [
        'Notice that "optimistic mutation" is literally just setting state before the network call finishes.',
        'Notice how breaking down 3 bullet points provides more practical confidence than watching 10 hours of video tutorials.',
      ],
      commonMistakes: [
        'Trying to analyze all 20 bullet points in a job description instead of the top 3 core ones.',
        'Planning massive 3-month projects instead of rapid 15-minute verification drills.',
        'Accepting jargon at face value and assuming you need 3 years of experience before trying it.',
      ],
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Locate 1 Live Job Posting & Pick 3 Requirements',
        objective: 'Find a real posting in your target track and identify 3 intimidating bullets.',
        guidance:
          'Search LinkedIn, Wellfound, GitHub Jobs, or a company careers page. Look for an entry-level or junior posting. Copy the job title, company name, and 3 specific requirements that feel vague or challenging.',
        prompt:
          'Paste the job title, company/industry, and the 3 bullet points you want to deconstruct:',
        starterTemplate: `Job Title: [e.g. Junior Frontend Developer]
Company / Industry: [e.g. HealthTech / EdTech]
Posting URL or Source: [e.g. LinkedIn / Wellfound]

Bullet Point 1:
"[Paste exact requirement text here]"

Bullet Point 2:
"[Paste exact requirement text here]"

Bullet Point 3:
"[Paste exact requirement text here]"`,
        checkpoints: [
          'Found a live job posting for early-career or junior role',
          'Selected 3 specific technical or workflow requirements',
          'Identified requirements with jargon you want to clarify',
        ],
        stuckTips: [
          'If you cannot find an entry-level posting, pick an associate or mid-level post and ignore the "years of experience" line.',
          'Focus on requirements that mention daily tasks like APIs, state, components, testing, or Git.',
        ],
      },
      {
        stepNumber: 2,
        title: 'Translate Corporate Jargon into Plain Human Actions',
        objective: 'Strip away buzzwords and define what the engineer actually does daily.',
        guidance:
          'For each of the 3 bullets, write: "What does this actually mean in plain English?" Think about what daily problem the hiring manager wants solved.',
        prompt: 'Write your plain-English translation for each requirement:',
        starterTemplate: `Requirement 1 Translation:
- In Plain English: [Explain what the company actually wants you to do]
- Why this matters to the team: [Why does the company care about this?]

Requirement 2 Translation:
- In Plain English: [Explain what the company actually wants you to do]
- Why this matters to the team: [Why does the company care about this?]

Requirement 3 Translation:
- In Plain English: [Explain what the company actually wants you to do]
- Why this matters to the team: [Why does the company care about this?]`,
        checkpoints: [
          'Removed buzzwords and corporate phrases',
          'Identified the actual daily problem being solved',
          'Explained in words a friend outside tech would understand',
        ],
        stuckTips: [
          'Ask yourself: "If I was sitting next to the developer, what would I see on their screen?"',
          'Use the "Ask CareerOS AI" button if you need help decoding acronyms or company speak.',
        ],
      },
      {
        stepNumber: 3,
        title: 'Design 3 Concrete 15-Minute Micro-Exercises',
        objective: 'Formulate tiny practical experiments that prove each translation.',
        guidance:
          'Design an exercise you could sit down and finish in 15 to 20 minutes. It must produce a tangible artifact (a code snippet, screenshot, diagram, or test).',
        prompt: 'Specify the 15-minute micro-exercise for each requirement:',
        starterTemplate: `Micro-Exercise 1:
- Action: [What specific small code or analysis will you perform?]
- Estimated Time: [15–20 minutes]
- Verifiable Deliverable: [What will you have to show when done?]

Micro-Exercise 2:
- Action: [What specific small code or analysis will you perform?]
- Estimated Time: [15–20 minutes]
- Verifiable Deliverable: [What will you have to show when done?]

Micro-Exercise 3:
- Action: [What specific small code or analysis will you perform?]
- Estimated Time: [15–20 minutes]
- Verifiable Deliverable: [What will you have to show when done?]`,
        checkpoints: [
          'Each exercise can be completed in under 25 minutes',
          'No external permissions or massive setups required',
          'Each produces a verifiable proof output',
        ],
        stuckTips: [
          'Keep it minimal. One function or one component is enough to demonstrate mastery of a principle.',
          'If an exercise feels like it will take 3 hours, cut it down to just the smallest core test case.',
        ],
      },
      {
        stepNumber: 4,
        title: 'Review, Polish & Compile Your Proof Blueprint',
        objective: 'Assemble your findings into a clear artifact ready for your Evidence Vault.',
        guidance:
          'Review your complete breakdown. Add 2 sentences reflecting on how this exercise changed your perspective on this job role.',
        prompt: 'Finalize your synthesized Proof Blueprint and add your personal takeaway:',
        starterTemplate: `### CareerOS Proof Blueprint: Job Requirement Deconstruction

[Review your complete 3-requirement mapping above and paste or polish the unified summary here]

#### Personal Takeaway & Next Step:
- What surprised me most: [Write 1-2 sentences on what you learned about this role]
- Which micro-exercise I will execute first: [Name which one you will do today]`,
        checkpoints: [
          'All 3 requirements have clear translations and micro-exercises',
          'Formatted with clean markdown headings and bullets',
          'Ready to be saved as a permanent proof artifact in your Evidence Vault',
        ],
        stuckTips: [
          'Check that your tone is direct and factual. You now have a concrete study guide instead of a vague wish.',
        ],
      },
    ],
  },

  'task-devtools-tweak': {
    id: 'task-devtools-tweak',
    title: 'Live Inspect & Fix a Layout in Browser DevTools',
    career: 'Software & Frontend',
    skills: ['HTML & CSS', 'Browser DevTools', 'Debugging', 'Troubleshooting & Bugs'],
    difficulty: 'Starter',
    time: '15 mins',
    timeMinutes: 15,
    overview:
      'Open Browser DevTools on any public live website. Use the Element Inspector to adjust font sizing, padding, and center an off-balance headline, capturing the live before-and-after proof.',
    whyItMatters:
      'Demystifies web development instantly. It proves that all websites are made of plain-text DOM nodes and CSS cascade rules that you can inspect, test, and debug in real time without special software.',
    skillDevelopmentSummary: [
      'DOM tree inspection and element selection',
      'Live CSS style overrides in the Styles pane',
      'Box model navigation (margin, border, padding, content)',
      'Visual debugging instincts for rapid iteration',
    ],
    finalOutputDescription:
      'A documented DevTools inspection log detailing the inspected element, CSS rules altered, visual layout shift observed, and a screenshot or CSS snippet.',
    finalOutputFormat: 'CSS Inspection & Mutation Report (Selector, Overrides, Layout Impact)',
    example: {
      title: 'Fixing cramped header typography on a local community website',
      scenario:
        'A local community library website had a headline overlapping the navigation bar on viewports under 800px.',
      deliverableContent: `### DevTools Inspection Log: Community Library Headline Fix

#### 1. Target Element Selector:
\`\`\`css
header.site-header h1.page-title
\`\`\`

#### 2. Original Computed Properties:
- \`font-size: 36px\`
- \`line-height: 1.1\`
- \`margin-bottom: -12px\` (causing negative overlap into the search bar)
- \`padding: 0px\`

#### 3. Live CSS Injected in DevTools:
\`\`\`css
header.site-header h1.page-title {
  font-size: 28px !important;
  line-height: 1.35 !important;
  margin-bottom: 16px !important;
  padding: 8px 0 !important;
  color: #101828 !important;
}
\`\`\`

#### 4. Visual Result & Verification:
- Overlap eliminated. The search bar now sits 16px below the headline.
- Text readability improved with 1.35 line-height ratio.
- Keyboard focus test confirmed no layout shift occurred when tabbing through nav links.`,
      approach:
        'The developer right-clicked directly on the misaligned headline, found the CSS rule causing the negative margin in the Styles pane, unchecked the offending property to see the instant effect, and added clean replacement values.',
      whatWasDoneWell: [
        'Isolated the exact CSS selector responsible for the layout bug.',
        'Documented computed styles before and after modification.',
        'Tested the result against surrounding navigation elements to ensure no unintended ripple effects.',
      ],
      whatBeginnerShouldNotice: [
        'Notice how disabling a checkbox next to a CSS rule in DevTools lets you test hypotheses instantly without refreshing.',
        'Notice that changes made in DevTools are safe sandbox experiments that do not alter the live server.',
      ],
      commonMistakes: [
        'Editing styles on the wrong parent wrapper instead of the direct element.',
        'Making 5 changes simultaneously without noting which specific rule resolved the issue.',
        'Forgetting to record the CSS snippet before accidentally closing the browser tab.',
      ],
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Choose a Live Website & Inspect an Element',
        objective: 'Open DevTools on any website and select a text or layout element.',
        guidance:
          'Open any news, university, or public site in Chrome/Firefox/Safari. Press F12 (or right-click and choose "Inspect"). Find a heading or card element in the Elements panel.',
        prompt: 'Record the website URL and the HTML element you inspected:',
        starterTemplate: `Target Website URL: [e.g. https://example.org]
Element Tag & Class: [e.g. <h2 class="article-title">]
Parent Container: [e.g. <div class="main-content">]
What caught your eye: [e.g. The headline feels cramped against the image]`,
        checkpoints: [
          'Opened Browser DevTools successfully',
          'Highlighted element in the DOM tree',
          'Identified the tag name and CSS class',
        ],
        stuckTips: [
          'Press Ctrl+Shift+C (Cmd+Shift+C on Mac) to turn on the element picker cursor, then click any text on the page.',
        ],
      },
      {
        stepNumber: 2,
        title: 'Identify the Active CSS Rules in the Styles Pane',
        objective: 'Read the styles currently controlling color, spacing, and size.',
        guidance:
          'Look at the Styles panel on the right side. Notice which styles are active and which are crossed out (overridden by other rules). Note down the current font-size and padding.',
        prompt: 'Document the current CSS rules for this element:',
        starterTemplate: `Current CSS Properties:
- font-size: [e.g. 24px]
- color: [e.g. #333333]
- padding / margin: [e.g. margin-top: 10px]
- display / flex properties: [e.g. display: block]`,
        checkpoints: [
          'Located the Styles panel',
          'Identified active CSS rules',
          'Found margin and padding values',
        ],
        stuckTips: [
          'Scroll down to the Box Model diagram at the bottom of the Styles pane to see exact computed pixels.',
        ],
      },
      {
        stepNumber: 3,
        title: 'Inject Custom Overrides & Fix the Layout',
        objective: 'Modify properties live to improve spacing and typography.',
        guidance:
          'Click inside the \`element.style\` block at the top of the Styles pane. Add \`color: #5B5BD6;\`, \`padding: 20px;\`, and \`line-height: 1.4;\`. Toggle rules on and off to see changes.',
        prompt: 'Paste your injected CSS modifications and describe the visual change:',
        starterTemplate: `Injected CSS Overrides:
\`\`\`css
/* Your custom rules added in DevTools */
color: #5B5BD6;
padding: 16px;
border-radius: 8px;
background-color: #F8F8F5;
\`\`\`

Visual Impact Observed:
- What happened on the page: [Describe how the element shifted or changed]
- What felt better or cleaner: [Explain the improvement]`,
        checkpoints: [
          'Added custom CSS in DevTools',
          'Observed instant live layout change',
          'Toggled property checkboxes to confirm effect',
        ],
        stuckTips: [
          'If your style does not appear, ensure you typed valid CSS syntax (e.g. ending in a semicolon \`;\`).',
        ],
      },
      {
        stepNumber: 4,
        title: 'Document Your Key Takeaway & Save Proof',
        objective: 'Compile your DevTools log and capture your understanding of the DOM.',
        guidance:
          'Write down what this inspection taught you about how browsers render layouts. You now understand that any website is inspectable and testable.',
        prompt: 'Finalize your DevTools inspection deliverable:',
        starterTemplate: `### DevTools Inspection Summary
- Target Element: [Summarize element]
- Fix Applied: [Summarize CSS applied]
- Why this matters: [1 sentence on how inspecting live code builds your engineering instincts]`,
        checkpoints: [
          'Complete DevTools log recorded',
          'Before-and-after change documented',
          'Ready to save proof artifact to Evidence Vault',
        ],
        stuckTips: [
          'Keep it clear and concise. You have performed real frontend debugging.',
        ],
      },
    ],
  },
};

/**
 * Generates dynamic, high-fidelity workspace data for any task item from TASKS_CATALOG
 */
export function getTaskWorkspaceData(taskId: string): TaskWorkspaceData {
  // 1. Check if this is a dynamically generated task
  const dynamicTask = getDynamicTaskById(taskId);
  if (dynamicTask) {
    return convertDynamicTaskToWorkspaceData(dynamicTask);
  }

  const existing = CURATED_WORKSPACES[taskId];
  const catalogItem = TASKS_CATALOG.find((t) => t.id === taskId) || TASKS_CATALOG[0];

  if (existing && existing.example && existing.steps) {
    return {
      ...catalogItem,
      ...existing,
      id: catalogItem.id,
      title: catalogItem.title,
      career: catalogItem.career,
      skills: catalogItem.skills,
      difficulty: catalogItem.difficulty,
      time: catalogItem.time,
      timeMinutes: catalogItem.timeMinutes,
      overview: catalogItem.whatYouWillDo,
      whyItMatters: catalogItem.whyItMatters,
      skillDevelopmentSummary: existing.skillDevelopmentSummary || [
        `Hands-on practical execution in ${catalogItem.career}`,
        `Verifiable proof generation with tangible deliverable output`,
        `Developing durable problem-solving reflexes`,
      ],
      finalOutputDescription: catalogItem.expectedOutput,
      finalOutputFormat: existing.finalOutputFormat || 'Verifiable Proof Deliverable Document',
      example: existing.example,
      steps: existing.steps,
    } as TaskWorkspaceData;
  }

  // Dynamic intelligent fallback generation
  const stepsList: TaskWorkspaceStep[] = catalogItem.steps.map((stepText, idx) => {
    return {
      stepNumber: idx + 1,
      title: `Step ${idx + 1}: ${stepText.split('.')[0]}`,
      objective: stepText,
      guidance: `Focus on executing this specific phase thoroughly. Keep notes on what decisions you made and what trade-offs you noticed.`,
      prompt: `Record your work, code, or diagnostic notes for Step ${idx + 1}:`,
      starterTemplate: `### Step ${idx + 1} Deliverable Notes
- Action Taken: [Describe what you did]
- Result / Output: [Paste code, findings, or metrics]
- Key Reflection: [What did you notice?]`,
      checkpoints: [
        `Completed objective for Step ${idx + 1}`,
        `Verified output meets quality criteria`,
        `Documented notes for Evidence Vault`,
      ],
      stuckTips: [
        `Break down this step into 2 smaller actions if you feel blocked.`,
        `Use the "Ask CareerOS AI" assistant button above for step-by-step unblocking suggestions.`,
      ],
    };
  });

  // Ensure at least 4 progressive steps
  while (stepsList.length < 4) {
    const nextIdx = stepsList.length + 1;
    stepsList.push({
      stepNumber: nextIdx,
      title: `Step ${nextIdx}: Synthesis & Proof Verification`,
      objective: `Review your outputs against the expected deliverable criteria.`,
      guidance: `Verify that your deliverable meets professional standards and is ready to show a hiring team or mentor.`,
      prompt: `Draft your final synthesis and verification notes:`,
      starterTemplate: `### Final Proof Summary
- Deliverable Status: Verified & Complete
- Proof Artifact: [Summary of output]
- Workplace Value: [How this demonstrates job readiness]`,
      checkpoints: [
        `All previous steps checked and reconciled`,
        `Proof artifact formatted and clean`,
        `Ready to submit to Evidence Vault`,
      ],
      stuckTips: [
        `Check if your deliverable answers the primary problem statement.`,
      ],
    });
  }

  return {
    id: catalogItem.id,
    title: catalogItem.title,
    career: catalogItem.career,
    skills: catalogItem.skills,
    difficulty: catalogItem.difficulty,
    time: catalogItem.time,
    timeMinutes: catalogItem.timeMinutes,
    overview: catalogItem.whatYouWillDo,
    whyItMatters: catalogItem.whyItMatters,
    skillDevelopmentSummary: [
      `Real-world workplace execution in ${catalogItem.career}`,
      `Practical mastery of ${catalogItem.skills.join(', ')}`,
      `Demonstrating verifiable outcomes over theoretical credentials`,
      `Confidence building through progressive micro-actions`,
    ],
    finalOutputDescription: catalogItem.expectedOutput,
    finalOutputFormat: 'Structured Evidence Deliverable (Markdown / Code / Audit Memo)',
    example: {
      title: `Completed Benchmark Model: ${catalogItem.title}`,
      scenario: `Simulated workplace scenario in ${catalogItem.career} where an early-career team member delivered this exact artifact to resolve a project hurdle.`,
      deliverableContent: `### Completed Deliverable Sample
**Track:** ${catalogItem.career}  
**Skills Practiced:** ${catalogItem.skills.join(', ')}  
**Deliverable Summary:**
${catalogItem.expectedOutput}

#### Sample Artifact Extract:
1. **Core Problem Statement:** Identified friction points and constraints in the primary workflow.
2. **Methodology:** Applied structured, step-by-step problem deconstruction without relying on assumptions.
3. **Verified Output:** Produced clear documentation with before-and-after verification evidence.
4. **Impact:** Ready for peer review and portfolio documentation.`,
      approach:
        'The practitioner started with the smallest verifiable unit of work, avoided premature optimization, and documented every finding in clear human language.',
      whatWasDoneWell: [
        'Maintained tight focus on the specific problem without scope creep.',
        'Documented reproducible findings and clear steps.',
        'Ensured the deliverable directly proves the intended skill.',
      ],
      whatBeginnerShouldNotice: [
        'Notice how clarity and conciseness beat length every single time.',
        'Notice that proof comes from verifiable details, not corporate buzzwords.',
      ],
      commonMistakes: [
        'Trying to overcomplicate the deliverable before finishing the core requirement.',
        'Skipping the verification step and assuming everything worked.',
        'Writing vague notes that cannot be referenced later in an interview.',
      ],
    },
    steps: stepsList.slice(0, 4),
  };
}

/**
 * Storage helpers
 */
const DRAFT_PREFIX = 'careeros_task_draft_';
const SUBMISSION_KEY = 'careeros_task_submissions';

export function getTaskDraft(taskId: string): TaskDraft | null {
  try {
    const raw = localStorage.getItem(`${DRAFT_PREFIX}${taskId}`);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

export function saveTaskDraft(draft: TaskDraft): void {
  try {
    localStorage.setItem(`${DRAFT_PREFIX}${draft.taskId}`, JSON.stringify(draft));
  } catch {}
}

export function removeTaskDraft(taskId: string): void {
  try {
    localStorage.removeItem(`${DRAFT_PREFIX}${taskId}`);
  } catch {}
}

export function saveTaskSubmission(submission: TaskSubmission): void {
  try {
    const raw = localStorage.getItem(SUBMISSION_KEY);
    const list: TaskSubmission[] = raw ? JSON.parse(raw) : [];
    const filtered = list.filter((item) => item.id !== submission.id);
    filtered.unshift(submission);
    localStorage.setItem(SUBMISSION_KEY, JSON.stringify(filtered));

    // Also sync to evidence vault
    const evidenceRaw = localStorage.getItem('careeros_evidence_vault');
    const vault: any[] = evidenceRaw ? JSON.parse(evidenceRaw) : [];
    vault.unshift({
      id: `proof-${Date.now()}`,
      title: submission.taskTitle,
      type: 'Task Artifact',
      date: new Date().toISOString(),
      skills: [submission.career, submission.difficulty],
      summary: submission.reflection || submission.compiledArtifact.slice(0, 150),
      verified: true,
    });
    localStorage.setItem('careeros_evidence_vault', JSON.stringify(vault));
  } catch {}
}

export function getTaskSubmissions(): TaskSubmission[] {
  try {
    const raw = localStorage.getItem(SUBMISSION_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export function getTaskSubmissionForTask(taskId: string): TaskSubmission | null {
  const submissions = getTaskSubmissions();
  return submissions.find((s) => s.taskId === taskId) || null;
}
