export type TaskTab = 'recommended' | 'tasks' | 'projects' | 'challenges' | 'practice';

export type TaskDifficulty = 'Starter' | 'Beginner' | 'Intermediate' | 'Advanced';

export interface TaskItem {
  id: string;
  title: string;
  tab: TaskTab;
  career: string;
  skills: string[];
  difficulty: TaskDifficulty;
  time: string;
  timeMinutes: number;
  interest: string;
  whatYouWillDo: string;
  whyItMatters: string;
  expectedOutput: string;
  steps: string[];
  isRightNowEligible: boolean;
}

export const CAREER_FILTER_OPTIONS = [
  'All Careers',
  'Software & Frontend',
  'Data & Analytics',
  'AI & ML',
  'Design & UX',
  'Product & Business',
  'Healthcare & Bio',
  'Public Sector & Policy',
  'Research & Writing',
];

export const SKILL_FILTER_OPTIONS = [
  'All Skills',
  'HTML & CSS',
  'JavaScript / TypeScript',
  'Python',
  'SQL',
  'React',
  'Figma',
  'Git / GitHub',
  'API Integration',
  'Problem Solving',
  'Clear Writing',
  'Accessibility (WCAG)',
  'Data Storytelling',
  'User Research',
  'Prompt Engineering',
  'System Thinking',
];

export const DIFFICULTY_FILTER_OPTIONS: Array<'All' | TaskDifficulty> = [
  'All',
  'Starter',
  'Beginner',
  'Intermediate',
  'Advanced',
];

export const TIME_FILTER_OPTIONS = [
  'Any Duration',
  'Quick (< 20 mins)',
  'Focused (20–45 mins)',
  'Deep (45–90 mins)',
  'Project (2+ hours)',
];

export const INTEREST_FILTER_OPTIONS = [
  'All Interests',
  'Building Interfaces',
  'Analyzing Insights',
  'Systems & Architecture',
  'Visual Design',
  'Human Storytelling',
  'Troubleshooting & Bugs',
  'User Research',
];

export const TASKS_CATALOG: TaskItem[] = [
  // -------------------------------------------------------------
  // 1. RECOMMENDED (Hand-picked high-impact actions to start today)
  // -------------------------------------------------------------
  {
    id: 'task-deconstruct-req',
    title: 'Deconstruct 1 Real Job Requirement into Verifiable Skills',
    tab: 'recommended',
    career: 'Software & Frontend',
    skills: ['Clear Writing', 'Critical Thinking', 'Problem Solving'],
    difficulty: 'Starter',
    time: '20 mins',
    timeMinutes: 20,
    interest: 'Human Storytelling',
    whatYouWillDo:
      'Locate 1 live entry-level job posting in your target track. Pick 3 intimidating bullet points and translate each into a 15-minute practical exercise you can practice this week.',
    whyItMatters:
      'Eliminates guesswork about what tech stacks to study. Shows you that companies test for core problem-solving principles rather than 20 separate tools.',
    expectedOutput:
      'A 1-page markdown breakdown mapping 3 job requirements to tangible micro-exercises.',
    steps: [
      'Find 1 job post on LinkedIn, Wellfound, or GitHub Jobs.',
      'Copy 3 requirements that feel intimidating or jargon-heavy.',
      'Write down what real daily behavior the hiring team is actually looking for.',
      'Define a 15-minute action that proves you understand each behavior.',
    ],
    isRightNowEligible: true,
  },
  {
    id: 'task-devtools-tweak',
    title: 'Live Inspect & Fix a Layout in Browser DevTools',
    tab: 'recommended',
    career: 'Software & Frontend',
    skills: ['HTML & CSS', 'Troubleshooting & Bugs'],
    difficulty: 'Starter',
    time: '15 mins',
    timeMinutes: 15,
    interest: 'Building Interfaces',
    whatYouWillDo:
      'Open Browser DevTools on any live news or university website. Use the Element Inspector to change text color, adjust padding, and fix an off-center headline.',
    whyItMatters:
      'Demystifies web development immediately. You will experience that web apps are just plain text and layout rules you can inspect in real time.',
    expectedOutput:
      'A screenshot of the inspected element with custom inline styles applied.',
    steps: [
      'Right click on any webpage element and choose "Inspect".',
      'Select the Styles pane on the right-hand panel.',
      'Add `padding: 24px` and change the color to `#5B5BD6`.',
      'Toggle the styles on and off to observe instant layout shifts.',
    ],
    isRightNowEligible: true,
  },
  {
    id: 'task-rec-user-flow',
    title: 'Reverse-Engineer 1 Flawless Sign-Up Flow into 4 User Steps',
    tab: 'recommended',
    career: 'Product & Business',
    skills: ['User Research', 'Clear Writing', 'System Thinking'],
    difficulty: 'Beginner',
    time: '20 mins',
    timeMinutes: 20,
    interest: 'User Research',
    whatYouWillDo:
      'Sign up for an app known for world-class onboarding (like Linear, Duolingo, or Stripe). Screenshot each screen, note friction points, and annotate the single moment of aha discovery.',
    whyItMatters:
      'Product managers and founders do this constantly. Teaches you how great products minimize cognitive load for newcomers.',
    expectedOutput:
      'A 4-step user journey audit highlighting where user hesitation was avoided.',
    steps: [
      'Pick an app you have never used before.',
      'Document each step required to create an account.',
      'Note how many form fields were required vs deferred.',
      'Write 2 lessons on how to simplify your own project flows.',
    ],
    isRightNowEligible: true,
  },
  {
    id: 'task-rec-sql-diagnostic',
    title: 'Diagnose Why Sales Dropped on Day 14 in a Live Dataset',
    tab: 'recommended',
    career: 'Data & Analytics',
    skills: ['SQL', 'Data Storytelling', 'Problem Solving'],
    difficulty: 'Beginner',
    time: '25 mins',
    timeMinutes: 25,
    interest: 'Analyzing Insights',
    whatYouWillDo:
      'Filter a simulated retail dataset with 500 rows. Query by date and region to discover whether revenue fell due to server downtime, holiday dip, or inventory stockouts.',
    whyItMatters:
      'Interviews test diagnostic thinking: raw numbers mean nothing until connected to business reality.',
    expectedOutput:
      'A 3-bullet incident root-cause summary with query proof and immediate business takeaway.',
    steps: [
      'Open the mock sales transaction dataset.',
      'Group total daily revenue between Day 10 and Day 20.',
      'Cross-reference inventory availability on Day 14.',
      'Draft a 3-bullet diagnostic briefing for the team manager.',
    ],
    isRightNowEligible: true,
  },

  // -------------------------------------------------------------
  // 2. TASKS (Action-packed discrete deliverables)
  // -------------------------------------------------------------
  {
    id: 'task-wcag-audit',
    title: 'Audit 1 Public Website for Color Contrast & Keyboard Focus',
    tab: 'tasks',
    career: 'Design & UX',
    skills: ['Accessibility (WCAG)', 'Figma', 'Visual Design'],
    difficulty: 'Starter',
    time: '25 mins',
    timeMinutes: 25,
    interest: 'Visual Design',
    whatYouWillDo:
      'Test body text against background colors using the WebAIM Contrast Checker. Then press Tab repeatedly on your keyboard to verify whether all buttons have visible focus rings.',
    whyItMatters:
      'Over 95% of early-career portfolios forget accessibility. Demonstrating WCAG AA compliance instantly signals senior-level product maturity.',
    expectedOutput:
      'A 3-bullet accessibility audit document with measured contrast ratios and remediation recommendations.',
    steps: [
      'Choose any local community, university, or non-profit website.',
      'Sample the foreground text hex code and background hex code.',
      'Calculate contrast ratio using WebAIM (aim for at least 4.5:1).',
      'Navigate using only Tab and Enter to identify missing focus outlines.',
    ],
    isRightNowEligible: true,
  },
  {
    id: 'task-sql-cohort',
    title: 'Spot the Conversion Drop-Off in a 100-Row Dataset',
    tab: 'tasks',
    career: 'Data & Analytics',
    skills: ['SQL', 'Data Storytelling', 'Problem Solving'],
    difficulty: 'Beginner',
    time: '25 mins',
    timeMinutes: 25,
    interest: 'Analyzing Insights',
    whatYouWillDo:
      'Examine a simulated user signup cohort table. Calculate drop-off percentages between Step 1, Step 2, and Step 3 to pinpoint the exact conversion bottleneck.',
    whyItMatters:
      'Data analysis is not just making charts; it is diagnosing where users get stuck so engineers and designers know what to fix.',
    expectedOutput:
      'A 2-paragraph diagnostic memo with funnel percentages and a prioritized fix recommendation.',
    steps: [
      'Download or open the provided signup funnel CSV dataset.',
      'Calculate drop-off rate: `(Step N - Step N+1) / Step N * 100`.',
      'Identify which step caused more than 50% user abandonment.',
      'Write a 2-sentence hypothesis on why users abandoned that step.',
    ],
    isRightNowEligible: true,
  },
  {
    id: 'task-pr-writeup',
    title: 'Draft an Exemplary GitHub Pull Request Description',
    tab: 'tasks',
    career: 'Software & Frontend',
    skills: ['Clear Writing', 'Git / GitHub', 'Problem Solving'],
    difficulty: 'Beginner',
    time: '20 mins',
    timeMinutes: 20,
    interest: 'Human Storytelling',
    whatYouWillDo:
      'Write a PR description for a hypothetical bug fix using the "Why, What, How to Test" framework, complete with testing steps and trade-offs considered.',
    whyItMatters:
      'Engineering teams care deeply about how you collaborate. Great PR writeups speed up reviews and prevent costly regression bugs.',
    expectedOutput:
      'A markdown PR template ready to paste into GitHub with clear before/after context.',
    steps: [
      'State the customer problem or bug symptoms clearly.',
      'List specific code changes made in 3 bullets.',
      'Provide exact manual verification steps for the code reviewer.',
      'Include 1 line on any edge case considered or left for next sprint.',
    ],
    isRightNowEligible: true,
  },
  {
    id: 'task-api-contract-spec',
    title: 'Design a RESTful API Contract for an Early-Stage Healthcare App',
    tab: 'tasks',
    career: 'Healthcare & Bio',
    skills: ['API Integration', 'System Thinking', 'Problem Solving'],
    difficulty: 'Intermediate',
    time: '35 mins',
    timeMinutes: 35,
    interest: 'Systems & Architecture',
    whatYouWillDo:
      'Define endpoints, HTTP verbs, response codes, and JSON schemas for patient appointment scheduling, ensuring no sensitive PII leaks into URL parameters.',
    whyItMatters:
      'Health tech requires extreme rigor around patient privacy and predictable API contracts before any frontend or backend code is written.',
    expectedOutput:
      'A valid OpenAPI / Swagger YAML snippet covering 3 CRUD endpoints with authentication error responses.',
    steps: [
      'Identify the 3 core patient resources: `/patients`, `/appointments`, `/clinicians`.',
      'Define strict JSON schemas for request bodies and error responses.',
      'Specify 401 Unauthorized and 403 Forbidden scenarios.',
      'Verify HIPAA/GDPR best practices (no patient ID in query string).',
    ],
    isRightNowEligible: false,
  },
  {
    id: 'task-query-index-tune',
    title: 'Benchmark Slow SQL Query Execution Plan & Add Targeted Index',
    tab: 'tasks',
    career: 'Data & Analytics',
    skills: ['SQL', 'Troubleshooting & Bugs', 'System Thinking'],
    difficulty: 'Advanced',
    time: '45 mins',
    timeMinutes: 45,
    interest: 'Systems & Architecture',
    whatYouWillDo:
      'Analyze an `EXPLAIN ANALYZE` output on a 500,000-row table suffering from full sequential scans. Design a composite B-tree index that slashes execution time from 850ms to 4ms.',
    whyItMatters:
      'Junior engineers blindly query; engineers who understand indexing protect production infrastructure from collapsing during traffic spikes.',
    expectedOutput:
      'An EXPLAIN before-and-after comparison with measured cost reduction and index creation DDL.',
    steps: [
      'Inspect the query predicate and sort order.',
      'Identify sequential scan bottlenecks in the query tree.',
      'Write `CREATE INDEX CONCURRENTLY` statement on target columns.',
      'Re-run explain plan to prove index-scan utilization.',
    ],
    isRightNowEligible: false,
  },

  // -------------------------------------------------------------
  // 3. PROJECTS (Substantial portfolio-grade builds)
  // -------------------------------------------------------------
  {
    id: 'proj-evidence-showcase',
    title: 'Zero-Fluff Evidence Showcase & Portfolio Site',
    tab: 'projects',
    career: 'Software & Frontend',
    skills: ['React', 'HTML & CSS', 'Git / GitHub', 'Clear Writing'],
    difficulty: 'Intermediate',
    time: '3 hours',
    timeMinutes: 180,
    interest: 'Building Interfaces',
    whatYouWillDo:
      'Build and deploy a responsive single-page portfolio that leads with verifiable task proof, problem statements, and live links instead of generic bio text.',
    whyItMatters:
      'Gives employers immediate, tangible proof of your ability to ship clean code and structure information clearly.',
    expectedOutput:
      'A live public URL on Vercel/Netlify with clean GitHub repo and semantic commit history.',
    steps: [
      'Create responsive layout with Header, Proof Cards, and Contact.',
      'Write 3-sentence impact notes for your top 3 completed artifacts.',
      'Enforce zero-pill discipline and accessible color contrast.',
      'Deploy to production and link in your CareerOS profile.',
    ],
    isRightNowEligible: false,
  },
  {
    id: 'proj-data-tracker',
    title: 'Open Tech Salary & Early-Career Transparency Explorer',
    tab: 'projects',
    career: 'Data & Analytics',
    skills: ['Python', 'SQL', 'Data Storytelling'],
    difficulty: 'Intermediate',
    time: '2.5 hours',
    timeMinutes: 150,
    interest: 'Analyzing Insights',
    whatYouWillDo:
      'Analyze 50+ entry-level tech and design compensation records. Group by experience level, remote status, and required skill clusters to uncover realistic starting expectations.',
    whyItMatters:
      'Proves you can clean unstructured data, handle outliers, and communicate quantitative trends without hype.',
    expectedOutput:
      'An interactive dashboard or Jupyter markdown notebook summarizing average salaries and skill premiums.',
    steps: [
      'Ingest sample compensation CSV into Python or spreadsheet.',
      'Filter out extreme anomalies or missing fields.',
      'Calculate median salary grouped by remote vs in-office.',
      'Draft a 1-page visual summary with 3 actionable insights.',
    ],
    isRightNowEligible: false,
  },
  {
    id: 'proj-starter-bio',
    title: 'Minimal One-Link Proof Card (Clean HTML & CSS)',
    tab: 'projects',
    career: 'Software & Frontend',
    skills: ['HTML & CSS', 'Visual Design'],
    difficulty: 'Starter',
    time: '45 mins',
    timeMinutes: 45,
    interest: 'Building Interfaces',
    whatYouWillDo:
      'Craft a single mobile-responsive landing card with your bio, target role, 3 GitHub repo links, and a contact link using pure vanilla CSS without external frameworks.',
    whyItMatters:
      'Demonstrates you master basic box-model, typography, and responsive media queries from scratch before relying on heavy libraries.',
    expectedOutput:
      'A clean HTML/CSS file hosted on GitHub Pages with 100% Lighthouse accessibility score.',
    steps: [
      'Write semantic HTML (`<header>`, `<main>`, `<footer>`).',
      'Style with clean centered card and CSS custom properties.',
      'Test responsiveness on viewport widths 375px through 1440px.',
      'Publish to GitHub Pages.',
    ],
    isRightNowEligible: false,
  },
  {
    id: 'proj-rate-limiter-service',
    title: 'Production-Grade API Rate Limiter with Sliding Window Counter',
    tab: 'projects',
    career: 'Software & Frontend',
    skills: ['JavaScript / TypeScript', 'API Integration', 'System Thinking'],
    difficulty: 'Advanced',
    time: '3.5 hours',
    timeMinutes: 210,
    interest: 'Systems & Architecture',
    whatYouWillDo:
      'Implement an Express middleware service using a memory sliding window log algorithm to protect public endpoints from brute-force DDoS. Include 429 Too Many Requests headers.',
    whyItMatters:
      'Shows backend system maturity. Every enterprise service requires resilient rate limiting to protect shared databases.',
    expectedOutput:
      'A tested Node/TypeScript module with automated Jest suite asserting exact boundary rate-limits.',
    steps: [
      'Write algorithm tracking timestamps per client IP within a 60s sliding window.',
      'Return standard `Retry-After` and `X-RateLimit-Remaining` headers.',
      'Write 5 unit tests validating burst traffic and window resets.',
      'Document memory footprint and trade-offs compared to Redis token-bucket.',
    ],
    isRightNowEligible: false,
  },

  // -------------------------------------------------------------
  // 4. CHALLENGES (High-intensity problem solving against constraints)
  // -------------------------------------------------------------
  {
    id: 'chal-defensive-api',
    title: 'Network Resilience & Offline Retry Boundary Challenge',
    tab: 'challenges',
    career: 'Software & Frontend',
    skills: ['JavaScript / TypeScript', 'API Integration', 'Troubleshooting & Bugs'],
    difficulty: 'Intermediate',
    time: '45 mins',
    timeMinutes: 45,
    interest: 'Troubleshooting & Bugs',
    whatYouWillDo:
      'Build an API fetch client that simulates network timeouts. Implement exponential backoff, a visual retry button, and clear fallback UI when offline.',
    whyItMatters:
      'Anyone can fetch data when the network is fast. Senior teams hire candidates who can gracefully handle when things go wrong.',
    expectedOutput:
      'A sandbox demo showing seamless recovery across simulated 500 error, 404 error, and network offline states.',
    steps: [
      'Set up a component that calls a mock failing endpoint.',
      'Catch error without crashing the parent React tree.',
      'Render a friendly error state card with a working "Try Again" handler.',
      'Add an auto-retry counter with 1-second delay.',
    ],
    isRightNowEligible: false,
  },
  {
    id: 'chal-prompt-guardrail',
    title: 'Zero-Hallucination AI Guardrail Benchmark Challenge',
    tab: 'challenges',
    career: 'AI & ML',
    skills: ['Prompt Engineering', 'Problem Solving', 'Clear Writing'],
    difficulty: 'Advanced',
    time: '50 mins',
    timeMinutes: 50,
    interest: 'Systems & Architecture',
    whatYouWillDo:
      'Design a system prompt and validation test suite of 10 adversarial questions designed to trick an LLM into making up facts. Ensure 100% adherence to fallback boundaries.',
    whyItMatters:
      'In high-stakes enterprise applications, preventing fabricated facts is the #1 engineering challenge.',
    expectedOutput:
      'A benchmark test report with 10 test prompts and 0 hallucinations verified.',
    steps: [
      'Draft system instructions with strict citation requirements.',
      'Craft 5 trick questions outside the provided knowledge context.',
      'Verify the model replies with prescribed fallback message.',
      'Document edge-case behavior in an evaluation matrix.',
    ],
    isRightNowEligible: false,
  },
  {
    id: 'chal-flexbox-puzzle',
    title: 'Resolve 4 Broken CSS Alignment & Overflow Layout Puzzles',
    tab: 'challenges',
    career: 'Design & UX',
    skills: ['HTML & CSS', 'Troubleshooting & Bugs', 'Visual Design'],
    difficulty: 'Beginner',
    time: '25 mins',
    timeMinutes: 25,
    interest: 'Building Interfaces',
    whatYouWillDo:
      'Fix 4 stubborn CSS layout bugs: an unconstrained text overflow breaking flex containers, a stuck sticky header, a collapsing grid row, and misaligned baseline buttons.',
    whyItMatters:
      'Layout bugs consume hours for junior devs. Mastering `min-width: 0`, stacking contexts, and flex shrink builds lasting confidence.',
    expectedOutput:
      'Clean bugfix code snippets with a 1-sentence explanation of why each bug occurred.',
    steps: [
      'Inspect the overflowing flex child and apply `min-w-0 truncate`.',
      'Resolve z-index clipping caused by ancestor `overflow: hidden`.',
      'Align input icon and text using flex baseline alignment.',
      'Verify layout integrity across mobile and desktop viewport widths.',
    ],
    isRightNowEligible: true,
  },
  {
    id: 'chal-race-condition',
    title: 'Triage & Eliminate a Concurrent State Race Condition',
    tab: 'challenges',
    career: 'Software & Frontend',
    skills: ['React', 'JavaScript / TypeScript', 'Troubleshooting & Bugs'],
    difficulty: 'Advanced',
    time: '55 mins',
    timeMinutes: 55,
    interest: 'Troubleshooting & Bugs',
    whatYouWillDo:
      'Identify why rapid keystrokes in a search autocomplete trigger out-of-order API results showing stale data. Implement an `AbortController` cancellation cleanup pattern.',
    whyItMatters:
      'Subtle async race conditions are top interview questions for mid/senior frontend roles because they ruin user trust in production.',
    expectedOutput:
      'A clean React search hook with AbortController signal cleanup and zero stale render artifacts.',
    steps: [
      'Simulate random async delays (200ms vs 800ms) on mock network requests.',
      'Observe stale query results overwriting fresh user input.',
      'Attach `AbortController` signal to the active fetch request.',
      'Abort previous pending request upon each new keystroke.',
    ],
    isRightNowEligible: false,
  },

  // -------------------------------------------------------------
  // 5. PRACTICE (Deliberate micro-drills to sharpen reflexes)
  // -------------------------------------------------------------
  {
    id: 'prac-git-commit',
    title: 'Craft 5 Semantic Conventional Git Commits',
    tab: 'practice',
    career: 'Software & Frontend',
    skills: ['Git / GitHub', 'Clear Writing'],
    difficulty: 'Starter',
    time: '15 mins',
    timeMinutes: 15,
    interest: 'Human Storytelling',
    whatYouWillDo:
      'Transform sloppy commit messages like "fix stuff" into clean Conventional Commits: `feat(ui): add accessible focus ring`, `fix(auth): handle empty email error`.',
    whyItMatters:
      'Clean Git history is the first thing engineering hiring managers inspect on your GitHub profile.',
    expectedOutput:
      'A GitHub repository with 5 structured commits following Conventional Commits standard.',
    steps: [
      'Create a local repository or code sandbox.',
      'Make 3 atomic file adjustments.',
      'Commit each with `feat:`, `fix:`, or `docs:` prefixes.',
      'Push to GitHub and verify clean commit history.',
    ],
    isRightNowEligible: true,
  },
  {
    id: 'prac-star-story',
    title: 'Frame 1 Project Dilemma in STAR Format (Interview Prep)',
    tab: 'practice',
    career: 'Product & Business',
    skills: ['Clear Writing', 'Problem Solving'],
    difficulty: 'Beginner',
    time: '20 mins',
    timeMinutes: 20,
    interest: 'Human Storytelling',
    whatYouWillDo:
      'Write a 4-paragraph story detailing a technical or team hurdle you faced using Situation, Task, Action, and Result.',
    whyItMatters:
      'Eliminates rambling in behavioral interviews and grounds your answers in honest problem-solving proof.',
    expectedOutput:
      'A structured 150-word STAR response ready to be rehearsed for internship interviews.',
    steps: [
      'Situation: What was the context and constraints? (1-2 sentences)',
      'Task: What was your specific responsibility? (1 sentence)',
      'Action: What concrete steps did you take? (2-3 sentences)',
      'Result: What was the measurable or verified outcome? (1-2 sentences)',
    ],
    isRightNowEligible: true,
  },
  {
    id: 'prac-figma-button',
    title: 'Build a 3-State Accessible Button Component in Figma',
    tab: 'practice',
    career: 'Design & UX',
    skills: ['Figma', 'Visual Design', 'Accessibility (WCAG)'],
    difficulty: 'Beginner',
    time: '25 mins',
    timeMinutes: 25,
    interest: 'Visual Design',
    whatYouWillDo:
      'Create an Auto-Layout button component in Figma with Primary Default, Hover, and Focus states following 8px spatial grid.',
    whyItMatters:
      'Design systems rely on reusable atomic components with consistent padding and typography tokens.',
    expectedOutput:
      'A shareable Figma file link with an interactive component set.',
    steps: [
      'Create a text layer with 14px SemiBold type.',
      'Apply Auto-Layout with `py-2.5 px-4` padding.',
      'Create Component and add Variants for Hover and Focus Ring.',
    ],
    isRightNowEligible: true,
  },
  {
    id: 'prac-code-walkthrough',
    title: 'Record a 3-Minute Loom Code Walkthrough as if for a Tech Lead',
    tab: 'practice',
    career: 'Software & Frontend',
    skills: ['Clear Writing', 'Problem Solving', 'System Thinking'],
    difficulty: 'Intermediate',
    time: '25 mins',
    timeMinutes: 25,
    interest: 'Human Storytelling',
    whatYouWillDo:
      'Screen record a 3-minute explanation of your most complex code function. Walk through inputs, edge cases handled, and performance trade-offs without apologizing for simple code.',
    whyItMatters:
      'Verbal technical articulation separates candidates who copy tutorials from builders who genuinely understand their code.',
    expectedOutput:
      'A 3-minute video link with timestamps and a clean 2-sentence summary.',
    steps: [
      'Select a function with at least 1 conditional branch.',
      'Outline 3 talking points: Input expectation, logic flow, and edge case.',
      'Record screen using Loom or QuickTime in 1 single take.',
      'Listen back once and write down 1 communication tweak for next time.',
    ],
    isRightNowEligible: false,
  },
  {
    id: 'prac-postmortem-brief',
    title: 'Author a Blameless Post-Mortem Incident Memo',
    tab: 'practice',
    career: 'Public Sector & Policy',
    skills: ['Clear Writing', 'Critical Thinking', 'System Thinking'],
    difficulty: 'Advanced',
    time: '40 mins',
    timeMinutes: 40,
    interest: 'Human Storytelling',
    whatYouWillDo:
      'Write a 1-page incident review for a simulated data outage. Focus strictly on system weaknesses, timeline of events, and preventative automated safeguards without blaming individual engineers.',
    whyItMatters:
      'High-performing organizations evaluate senior leadership by how safely teams learn from failure.',
    expectedOutput:
      'A 1-page blameless post-mortem document with 5-whys root cause analysis and action items with owners.',
    steps: [
      'Establish incident timeline (Detection, Triage, Remediation).',
      'Perform 5-Whys analysis focused on missing safeguards.',
      'Draft 3 concrete engineering action items to prevent recurrence.',
      'Check tone to ensure 100% blameless language.',
    ],
    isRightNowEligible: false,
  },
];
