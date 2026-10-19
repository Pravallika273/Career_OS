export interface CareerCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface TryActivity {
  id: string;
  title: string;
  timeEstimate: string;
  scenario: string;
  taskPrompt: string;
  sampleDeliverable: string;
  interactiveChallenge: {
    question: string;
    choices: {
      text: string;
      rationale: string;
      isRecommended?: boolean;
    }[];
  };
}

export interface CareerRole {
  id: string;
  title: string;
  categoryId: string;
  tagline: string;
  whatItInvolves: string;
  commonWork: string[];
  usefulSkills: string[];
  beginnerFriendlyTasks: string[];
  exampleProjects: string[];
  typicalWorkplaceActivities: string[];
  tryActivity: TryActivity;
}

export type ActivityFeeling =
  | 'I enjoyed it.'
  | 'It was okay.'
  | "I didn't enjoy it."
  | 'I want something harder.'
  | 'I want to try another area.';

export interface ActivityFeedback {
  id: string;
  roleId: string;
  roleTitle: string;
  categoryName: string;
  activityTitle: string;
  feeling: ActivityFeeling;
  completedAt: string;
  notes?: string;
}

export const CAREER_CATEGORIES: CareerCategory[] = [
  { id: 'tech', name: 'Technology', description: 'Software, web apps, infrastructure & digital systems', icon: 'Code' },
  { id: 'data', name: 'Data', description: 'Analytics, data engineering, dashboards & insights', icon: 'Database' },
  { id: 'ai', name: 'AI', description: 'Machine learning, model evaluation & prompt engineering', icon: 'Sparkles' },
  { id: 'design', name: 'Design', description: 'User interfaces, product ergonomics & visual systems', icon: 'Palette' },
  { id: 'business', name: 'Business', description: 'Product management, strategy & startup operations', icon: 'Briefcase' },
  { id: 'finance', name: 'Finance', description: 'Financial modeling, budget planning & accounting', icon: 'TrendingUp' },
  { id: 'marketing', name: 'Marketing', description: 'Brand storytelling, audience growth & content', icon: 'Megaphone' },
  { id: 'healthcare', name: 'Healthcare', description: 'Clinical informatics, public health & patient workflows', icon: 'Heart' },
  { id: 'education', name: 'Education', description: 'Instructional design, learning technology & coaching', icon: 'BookOpen' },
  { id: 'research', name: 'Research', description: 'Empirical studies, user discovery & market audits', icon: 'Search' },
  { id: 'operations', name: 'Operations', description: 'Process optimization, supply chains & execution', icon: 'Cpu' },
  { id: 'media', name: 'Media', description: 'Journalism, creative production & digital publishing', icon: 'Video' },
  { id: 'science', name: 'Science', description: 'Laboratory analysis, bioinformatics & climate study', icon: 'FlaskConical' },
  { id: 'engineering', name: 'Engineering', description: 'Hardware, structural design & electrical systems', icon: 'Wrench' },
  { id: 'hospitality', name: 'Hospitality', description: 'Guest experience, travel tech & event management', icon: 'Coffee' },
  { id: 'agriculture', name: 'Agriculture', description: 'AgTech, sustainability & food supply systems', icon: 'Sprout' },
  { id: 'law', name: 'Law', description: 'Legal technology, compliance & intellectual property', icon: 'Scale' },
  { id: 'public-sector', name: 'Public sector', description: 'Civic technology, public policy & community impact', icon: 'Building' },
];

export const CAREER_ROLES_CATALOG: CareerRole[] = [
  // 1. TECHNOLOGY
  {
    id: 'frontend-dev',
    title: 'Frontend Engineer',
    categoryId: 'tech',
    tagline: 'Crafting responsive, accessible, and delightful interfaces people use daily.',
    whatItInvolves:
      'Frontend engineering combines design sensibilities with software principles to build responsive web and mobile interfaces. You translate Figma prototypes into clean, resilient code and ensure applications load quickly on all devices.',
    commonWork: [
      'Building UI components in React, TypeScript, and Tailwind CSS',
      'Integrating backend APIs and handling loading, empty, and network error states',
      'Optimizing rendering performance and ensuring WCAG AA accessibility',
      'Writing automated component tests and collaborating with designers',
    ],
    usefulSkills: ['React & TypeScript', 'CSS Architecture & Layouts', 'Web Accessibility (WCAG)', 'API Integration', 'Debugging & Browser DevTools'],
    beginnerFriendlyTasks: [
      'Build a single responsive card with hover effects and accessible keyboard focus',
      'Fetch a random quote from a free public API and display it gracefully',
      'Fix 3 color contrast issues on an open-source landing page',
    ],
    exampleProjects: [
      'Student Study Habit Tracker with local storage persistence',
      'Accessible Job Board with instant live filter tabs',
      'Personal portfolio showcasing verified GitHub contributions',
    ],
    typicalWorkplaceActivities: [
      'Daily 15-minute sync with product managers and designers',
      'Reviewing pull requests from peers and discussing component architecture',
      'Pair-programming with a backend engineer to align on JSON payloads',
    ],
    tryActivity: {
      id: 'act-fe-1',
      title: 'Fix a Broken Button & Error State',
      timeEstimate: '6 mins',
      scenario:
        'A student is trying to submit an assignment on a slow mobile connection. The current button gives zero feedback when clicked, leaving the user confused.',
      taskPrompt: 'Which UX decision will best prevent double submissions and reassure the student?',
      sampleDeliverable: 'A UI state specification: disabled state + loading spinner + clear status banner.',
      interactiveChallenge: {
        question: 'When the submit button is clicked on a slow connection, what should happen immediately?',
        choices: [
          {
            text: 'Disable the button, show an inline spinner, and keep the user on the screen until confirmation.',
            rationale: 'Correct! This immediately reassures the user that their action is registered and prevents duplicate submissions.',
            isRecommended: true,
          },
          {
            text: 'Leave the button active so the user can click it multiple times to ensure it went through.',
            rationale: 'This often causes multiple submissions, database race conditions, and user anxiety.',
          },
          {
            text: 'Immediately close the page and assume the request succeeded.',
            rationale: 'If the network drops, the user loses their work with zero error recovery.',
          },
        ],
      },
    },
  },

  // 2. DATA
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    categoryId: 'data',
    tagline: 'Translating messy spreadsheets and tables into clear, actionable business stories.',
    whatItInvolves:
      'Data analysts inspect historical records, user behaviors, and performance metrics to help teams make confident decisions. You clean data, spot patterns, and build dashboards that non-technical leaders can understand.',
    commonWork: [
      'Writing SQL queries to extract cohorts and filter metrics',
      'Cleaning missing or inconsistent data rows in Python or spreadsheets',
      'Building scannable charts and dashboards (Metabase, Tableau, PowerBI)',
      'Presenting findings to product teams with concrete recommendations',
    ],
    usefulSkills: ['SQL Querying', 'Spreadsheet Formulas & Pivot Tables', 'Data Storytelling', 'Critical Thinking', 'Basic Python / Pandas'],
    beginnerFriendlyTasks: [
      'Audit a 100-row CSV file and identify 3 data anomalies or duplicate entries',
      'Write a SQL query that calculates average customer spend by month',
      'Create 1 clean chart that answers: "What day of the week has peak traffic?"',
    ],
    exampleProjects: [
      'Early-Career Salary Explorer analyzing open public tech surveys',
      'Campus Library Usage heat map identifying peak study hours',
      'E-commerce return rate analysis pinpointing problem product categories',
    ],
    typicalWorkplaceActivities: [
      'Gathering reporting requirements from marketing or operations leads',
      'Investigating why a key metric dropped 12% over the weekend',
      'Publishing a weekly 1-page data insights memo for executives',
    ],
    tryActivity: {
      id: 'act-data-1',
      title: 'Spot the Conversion Drop Leak',
      timeEstimate: '5 mins',
      scenario:
        'Your university app notice: 1,000 students visited the scholarship portal. 850 clicked "Apply". 820 started the form. But only 110 completed it. The drop happened at Step 3.',
      taskPrompt: 'Analyze where the critical drop occurred and diagnose the root cause.',
      sampleDeliverable: 'A 2-bullet data diagnostic identifying the friction point at Step 3.',
      interactiveChallenge: {
        question: 'Looking at the conversion funnel (1000 → 850 → 820 → 110), where should the product team investigate first?',
        choices: [
          {
            text: 'Step 3 of the form, where 86% of interested students abandoned the process.',
            rationale: 'Spot on! The data clearly isolates Step 3 as the high-friction bottleneck (e.g. asking for cumbersome PDF uploads).',
            isRecommended: true,
          },
          {
            text: 'The homepage banner, because 150 students did not click apply.',
            rationale: '85% click-through from the homepage is actually exceptionally high; the real drop-off is inside Step 3.',
          },
          {
            text: 'Run more ads to get 5,000 students into the same leaky funnel.',
            rationale: 'Pouring more traffic into a broken funnel burns budget without fixing the user hurdle.',
          },
        ],
      },
    },
  },

  // 3. AI
  {
    id: 'ai-prompt-engineer',
    title: 'AI Solutions Specialist',
    categoryId: 'ai',
    tagline: 'Bridging human domain expertise and generative models to automate complex workflows.',
    whatItInvolves:
      'AI specialists structure system instructions, benchmark model outputs, and integrate LLM APIs into business workflows. You evaluate hallucinations, design few-shot examples, and safeguard reliability.',
    commonWork: [
      'Drafting structured system prompts with schema output constraints (JSON)',
      'Designing evaluation datasets to measure AI answer accuracy',
      'Integrating model APIs into web services and customer workflows',
      'Implementing safety guardrails and anti-hallucination verification steps',
    ],
    usefulSkills: ['Prompt Crafting & Few-Shot Design', 'Evaluation Benchmarking', 'JSON Schemas', 'Domain Knowledge', 'Model Capabilities Awareness'],
    beginnerFriendlyTasks: [
      'Write a system prompt that forces an LLM to return only valid JSON without markdown wrapping',
      'Test 5 edge-case prompts on a customer support bot to find vulnerabilities',
      'Compare output quality across 2 different model sizes for speed vs accuracy',
    ],
    exampleProjects: [
      'Automated Resume Keyword Gap Analyzer using structured LLM outputs',
      'Study Notes Summarizer with cited timestamps and flashcard exports',
      'Customer Feedback Topic Classifier with 95% evaluation accuracy',
    ],
    typicalWorkplaceActivities: [
      'Reviewing automated evaluation test runs across 500 benchmark queries',
      'Refining system prompt instructions based on customer edge cases',
      'Assisting legal and security teams in reviewing data privacy boundaries',
    ],
    tryActivity: {
      id: 'act-ai-1',
      title: 'Craft a Zero-Hallucination Prompt',
      timeEstimate: '6 mins',
      scenario:
        'You are designing an AI study assistant for medical students. If the model is uncertain about a drug interaction, it must NEVER guess.',
      taskPrompt: 'Which prompt instruction best prevents fabricated medical advice?',
      sampleDeliverable: 'A strict grounding instruction specifying safe fallback behavior.',
      interactiveChallenge: {
        question: 'Which system instruction reliably prevents medical hallucinations?',
        choices: [
          {
            text: '"Answer strictly using the provided clinical handbook. If the question cannot be answered from the excerpt, reply: \'Information not in database; please consult clinical supervisor.\' Do not speculate."',
            rationale: 'Excellent! Explicitly bounding source material and prescribing an exact fallback prevents dangerous guesses.',
            isRecommended: true,
          },
          {
            text: '"Be smart, friendly, and try your very best to guess the drug interaction even if you aren\'t totally sure."',
            rationale: 'Encouraging guessing in high-stakes domains leads directly to dangerous hallucinations.',
          },
          {
            text: '"Just make your answer sound professional and confident."',
            rationale: 'Confidence without factual grounding is the definition of AI hallucination.',
          },
        ],
      },
    },
  },

  // 4. DESIGN
  {
    id: 'product-designer',
    title: 'Product & UX Designer',
    categoryId: 'design',
    tagline: 'Designing intuitive flows, humane interfaces, and solving real user frustrations.',
    whatItInvolves:
      'Product designers talk to users, sketch wireframes, and design high-fidelity design systems. You bridge empathy for human needs with business constraints to ensure software feels effortless to navigate.',
    commonWork: [
      'Conducting user interviews to uncover workflow frustrations',
      'Creating interactive wireframes and prototypes in Figma',
      'Establishing typography scales, spacing tokens, and accessible color palettes',
      'Testing designs with early users to observe where they hesitate or get confused',
    ],
    usefulSkills: ['User Empathy & Research', 'Figma Prototyping', 'Visual Hierarchy', 'Information Architecture', 'Usability Testing'],
    beginnerFriendlyTasks: [
      'Redesign a cluttered mobile checkout screen into 3 clear steps',
      'Conduct a 5-minute usability test on a peer using any everyday website',
      'Create a Figma button component with default, hover, and disabled variants',
    ],
    exampleProjects: [
      'Calm Habit Tracker eliminating gamified guilt and dark patterns',
      'Campus Food Pantry mobile booking app designed for privacy and speed',
      'Design system style guide with accessible WCAG AA contrast pairings',
    ],
    typicalWorkplaceActivities: [
      'Leading a design critique session with engineering leads',
      'Watching user session replays to spot confusion in the onboarding flow',
      'Handing off design specs to developers with explicit spacing tokens',
    ],
    tryActivity: {
      id: 'act-ux-1',
      title: 'Audit a Confusing Form Flow',
      timeEstimate: '5 mins',
      scenario:
        'A mobile sign-up form requires 14 fields on one single screen. 70% of users leave without completing it on mobile.',
      taskPrompt: 'Apply progressive disclosure to reduce cognitive overload.',
      sampleDeliverable: 'A 2-step multi-stage onboarding breakdown.',
      interactiveChallenge: {
        question: 'How should you redesign a 14-field mobile sign-up form to maximize completion?',
        choices: [
          {
            text: 'Break into 3 progressive chapters (Account Basics → Preferences → Confirmation) showing a subtle progress indicator.',
            rationale: 'Spot on! Progressive disclosure breaks intimidation, reduces cognitive load, and increases momentum.',
            isRecommended: true,
          },
          {
            text: 'Make all the text boxes tiny so they all fit on the screen without scrolling.',
            rationale: 'Tiny inputs violate mobile touch targets (44px min) and increase visual anxiety.',
          },
          {
            text: 'Add flashing red countdown timers to rush the user.',
            rationale: 'Artificial urgency creates stress and high cancellation rates.',
          },
        ],
      },
    },
  },

  // 5. BUSINESS & PRODUCT
  {
    id: 'product-manager',
    title: 'Associate Product Manager',
    categoryId: 'business',
    tagline: 'Aligning user needs, technology, and business strategy to build the right thing.',
    whatItInvolves:
      'Product managers define the "why" and "what" of a product. You prioritize features, align engineering and design teams, and ensure the team builds solutions that solve genuine user problems.',
    commonWork: [
      'Writing clear Product Requirement Documents (PRDs) with user stories',
      'Prioritizing feature backlogs using trade-off matrices (Impact vs Effort)',
      'Analyzing user feedback tickets and diagnosing root pain points',
      'Coordinating product launch roadmaps across cross-functional teams',
    ],
    usefulSkills: ['Prioritization & Trade-offs', 'Clear Written Communication', 'User Empathy', 'Basic Tech Fluency', 'Stakeholder Alignment'],
    beginnerFriendlyTasks: [
      'Write a 1-page PRD for a feature you wish your favorite app had',
      'Prioritize a list of 5 user feature requests using an Impact vs Effort grid',
      'Interview 2 peers about their biggest daily productivity headache',
    ],
    exampleProjects: [
      'Redesign brief for student course registration portal',
      'Competitor feature teardown matrix comparing 3 popular note-taking apps',
      'User feedback categorization dashboard prioritizing top 10 bug fixes',
    ],
    typicalWorkplaceActivities: [
      'Facilitating sprint planning with engineers to estimate effort',
      'Talking to customers to validate if a prototype solves their problem',
      'Reviewing launch metrics with leadership to assess feature adoption',
    ],
    tryActivity: {
      id: 'act-pm-1',
      title: 'Prioritize a Feature Backlog',
      timeEstimate: '6 mins',
      scenario:
        'Your team only has engineering bandwidth to ship 1 feature before launch. Option A: Dark mode (asked by 50 users, 1 day of work). Option B: Fix password reset bug (affects 10 users daily who get locked out, 2 days of work). Option C: NFT integration (requested by 1 executive, 3 weeks).',
      taskPrompt: 'Determine which initiative must take top priority and why.',
      sampleDeliverable: 'A prioritized trade-off decision memo.',
      interactiveChallenge: {
        question: 'Which feature should a strong PM prioritize first?',
        choices: [
          {
            text: 'Fix the password reset bug, because users getting locked out breaks the fundamental core utility of the app.',
            rationale: 'Correct! Reliability and core user access always take precedence over cosmetic requests or speculative buzzwords.',
            isRecommended: true,
          },
          {
            text: 'Build dark mode because more raw users voted for it.',
            rationale: 'While popular, dark mode is a cosmetic convenience; broken login prevents users from accessing the product at all.',
          },
          {
            text: 'Build the executive NFT feature to impress leadership.',
            rationale: 'Chasing buzzwords without user need wastes weeks of engineering time.',
          },
        ],
      },
    },
  },

  // 6. MARKETING
  {
    id: 'growth-marketer',
    title: 'Content & Growth Marketer',
    categoryId: 'marketing',
    tagline: 'Connecting people with tools that genuinely solve their problems through honest storytelling.',
    whatItInvolves:
      'Growth and content marketers help valuable products find their audience. You craft tutorials, write case studies, measure distribution channels, and communicate value clearly without hype or manipulation.',
    commonWork: [
      'Writing helpful educational articles, case studies, and practical guides',
      'Testing headline messaging and measuring click-through and reading rates',
      'Running community newsletters and engaging early adopters on social channels',
      'Analyzing customer acquisition channels (SEO, organic, partnerships)',
    ],
    usefulSkills: ['Compelling Writing', 'Audience Psychology', 'SEO Fundamentals', 'Data Analytics', 'Storytelling'],
    beginnerFriendlyTasks: [
      'Write a 3-paragraph practical breakdown explaining a complex tool to a beginner',
      'Draft 3 different headlines for the same article and test which is clearest',
      'Audit 1 company newsletter and identify what makes it engaging or boring',
    ],
    exampleProjects: [
      'Beginner Guide to Git & GitHub published on Medium/Dev.to',
      'Student newsletter curating 5 free internships every Friday',
      'Case study breaking down how a local small business doubled foot traffic',
    ],
    typicalWorkplaceActivities: [
      'Interviewing a satisfied customer to write an honest case study',
      'Reviewing web traffic analytics to see which educational guides rank highest',
      'Collaborating with product designers on in-app copy and onboarding emails',
    ],
    tryActivity: {
      id: 'act-mkt-1',
      title: 'Craft a Clear Value Proposition',
      timeEstimate: '5 mins',
      scenario:
        'A new app helps students find vetted mentors. The current headline reads: "Synergistic paradigm enablement for holistic human capital growth." Nobody understands what it means.',
      taskPrompt: 'Rewrite the headline into clear, honest human English.',
      sampleDeliverable: 'A high-clarity 1-line value proposition.',
      interactiveChallenge: {
        question: 'Which headline will resonate best with students seeking guidance?',
        choices: [
          {
            text: '"Find a friendly mentor in your target field. Free 30-minute advice sessions from people who\'ve been there."',
            rationale: 'Spot on! It speaks in plain human terms, states the concrete mechanism, and removes corporate jargon.',
            isRecommended: true,
          },
          {
            text: '"The world\'s #1 revolutionary next-gen career accelerator utilizing quantum networking."',
            rationale: 'Full of empty buzzwords and hyperbolic claims that trigger skepticism.',
          },
          {
            text: '"Mentorship portal."',
            rationale: 'Too dry and provides zero context on what makes it useful.',
          },
        ],
      },
    },
  },

  // 7. HEALTHCARE
  {
    id: 'health-informatics',
    title: 'Health Informatics Specialist',
    categoryId: 'healthcare',
    tagline: 'Optimizing digital clinical systems to reduce doctor burnout and improve patient care.',
    whatItInvolves:
      'Health informatics professionals design and configure electronic health record (EHR) workflows, telehealth portals, and clinical decision support tools to keep patient data secure and medical teams efficient.',
    commonWork: [
      'Auditing clinical intake workflows to reduce redundant paperwork for nurses',
      'Ensuring medical software complies with patient privacy laws (HIPAA/GDPR)',
      'Analyzing patient wait times and appointment scheduling bottlenecks',
      'Training hospital staff on updated digital prescribing protocols',
    ],
    usefulSkills: ['Healthcare Workflows', 'Patient Privacy (HIPAA)', 'System Usability', 'Data Integrity', 'Interpersonal Communication'],
    beginnerFriendlyTasks: [
      'Map out the steps a patient takes from entering a clinic to receiving a prescription',
      'Audit a public patient intake form and identify 3 accessibility barriers for elderly patients',
      'Write a 1-page guide explaining how patient data encryption protects medical privacy',
    ],
    exampleProjects: [
      'Medication Reminder SMS service for elderly chronic care patients',
      'Emergency room triage queue simulation model in Python',
      'Patient privacy checklist for small dental and pediatric practices',
    ],
    typicalWorkplaceActivities: [
      'Meeting with head nurses to review EHR form frustrations',
      'Reviewing automated alerts to ensure doctors aren’t experiencing "alert fatigue"',
      'Testing software updates before clinical deployment',
    ],
    tryActivity: {
      id: 'act-health-1',
      title: 'Reduce Clinical Alert Fatigue',
      timeEstimate: '5 mins',
      scenario:
        'A hospital computer triggers 40 pop-up alerts per hour for doctors. Most are harmless warnings (e.g. minor vitamin overlap), causing doctors to click "Dismiss" without reading.',
      taskPrompt: 'Solve alert fatigue to prevent doctors from missing critical drug interactions.',
      sampleDeliverable: 'A tiered alert classification protocol.',
      interactiveChallenge: {
        question: 'How should clinical informatics handle alert fatigue?',
        choices: [
          {
            text: 'Tier alerts into Critical (hard stop, requires explicit override) vs Informational (quiet inline note, no pop-up disruption).',
            rationale: 'Correct! Tiered signaling reserves disruptive pop-ups strictly for lethal interactions, preserving doctor attention.',
            isRecommended: true,
          },
          {
            text: 'Make every single alert sound an alarm siren so doctors cannot ignore it.',
            rationale: 'Alarm fatigue causes severe doctor burnout and leads to people muting devices entirely.',
          },
          {
            text: 'Turn off all alerts completely.',
            rationale: 'Turning off all warnings removes patient safety nets and risks fatal errors.',
          },
        ],
      },
    },
  },

  // 8. FINANCE
  {
    id: 'financial-analyst',
    title: 'Financial Analyst',
    categoryId: 'finance',
    tagline: 'Evaluating capital allocation, forecasting revenue, and modeling risk.',
    whatItInvolves:
      'Financial analysts examine company statements, market trends, and economic indicators to forecast performance and recommend investments or cost controls.',
    commonWork: [
      'Building revenue and expenditure forecasts in Excel and financial software',
      'Auditing income statements, balance sheets, and cash flow reports',
      'Calculating key ratios (Gross Margin, Runway, ROI, Debt-to-Equity)',
      'Preparing quarterly budget review presentations for department heads',
    ],
    usefulSkills: ['Financial Modeling', 'Excel Formulas & VBA', 'Accounting Principles', 'Risk Evaluation', 'Analytical Rigor'],
    beginnerFriendlyTasks: [
      'Build a simple monthly budget tracker calculating runway for a student club',
      'Read 1 public 10-K report from Apple or Microsoft and summarize their top revenue stream',
      'Calculate the compound interest growth of a $50/month investment over 10 years',
    ],
    exampleProjects: [
      'Startup Runway & Burn Rate scenario calculator in Google Sheets',
      'Personal finance debt-payoff visualizer comparing snowball vs avalanche methods',
      'SaaS unit economics dashboard tracking customer acquisition cost (CAC) vs lifetime value (LTV)',
    ],
    typicalWorkplaceActivities: [
      'Updating financial models with actual end-of-month sales figures',
      'Comparing forecasted departmental spending against actual invoices',
      'Briefing the CFO on emerging interest rate impacts',
    ],
    tryActivity: {
      id: 'act-fin-1',
      title: 'Calculate Startup Runway',
      timeEstimate: '5 mins',
      scenario:
        'A company has $300,000 in the bank. They earn $20,000 in monthly revenue, but their team and server expenses are $50,000 per month. How many months before they run out of money?',
      taskPrompt: 'Calculate net burn rate and runway.',
      sampleDeliverable: 'A net burn calculation ($30,000/mo) and runway estimate (10 months).',
      interactiveChallenge: {
        question: 'What is the company’s net monthly burn rate and runway?',
        choices: [
          {
            text: 'Net burn is $30,000/month ($50k - $20k), leaving exactly 10 months of runway ($300k / $30k).',
            rationale: 'Spot on! Net burn accounts for incoming revenue against total expenses to determine actual remaining months.',
            isRecommended: true,
          },
          {
            text: 'Net burn is $50,000/month, leaving 6 months of runway.',
            rationale: 'That ignores the $20,000 in monthly revenue coming in, giving an overly pessimistic cash projection.',
          },
          {
            text: 'Runway is unlimited because they have revenue.',
            rationale: 'Expenses exceed revenue by $30k/mo; without intervention, the bank account hits zero in 10 months.',
          },
        ],
      },
    },
  },

  // 9. EDUCATION
  {
    id: 'instructional-designer',
    title: 'Instructional & EdTech Designer',
    categoryId: 'education',
    tagline: 'Transforming complex subjects into engaging, step-by-step learning pathways.',
    whatItInvolves:
      'Instructional designers architect curriculum pathways, interactive quizzes, and visual explainers. You leverage cognitive science to ensure learners actually retain skills rather than just skimming text.',
    commonWork: [
      'Breaking broad syllabi into 15-minute modular learning bites',
      'Designing rubrics and feedback loops that celebrate incremental progress',
      'Authoring interactive simulations and scenario-based assessments',
      'Evaluating learner completion rates to pinpoint confusing lessons',
    ],
    usefulSkills: ['Cognitive Load Theory', 'Curriculum Mapping', 'Clear Explanations', 'EdTech Tooling', 'Empathy for Beginners'],
    beginnerFriendlyTasks: [
      'Take a 10-page textbook chapter and condense it into a 1-page visual cheat sheet',
      'Write a 3-question formative quiz where every wrong answer includes a helpful explanation',
      'Draft a step-by-step tutorial teaching a senior citizen how to back up phone photos',
    ],
    exampleProjects: [
      'Interactive 5-Day Python starter course for absolute beginners',
      'Financial literacy visual curriculum for high school seniors',
      'Remote onboarding guide for distributed remote workforces',
    ],
    typicalWorkplaceActivities: [
      'Interviewing subject matter experts to unpack tacit knowledge',
      'Reviewing quiz error statistics to rewrite ambiguous questions',
      'Testing lesson pacing on real beginner learners',
    ],
    tryActivity: {
      id: 'act-edu-1',
      title: 'Diagnose Learner Drop-off',
      timeEstimate: '5 mins',
      scenario:
        'In an online coding course, 90% of students complete Lesson 1 (intro). But in Lesson 2, the teacher introduces recursion, pointer math, and dynamic memory in a single 45-minute video. 60% of students quit.',
      taskPrompt: 'Apply cognitive load principles to fix the dropout rate.',
      sampleDeliverable: 'A scaffolded curriculum re-sequencing plan.',
      interactiveChallenge: {
        question: 'What is the primary instructional design flaw in Lesson 2?',
        choices: [
          {
            text: 'Cognitive overload: introducing 3 advanced concepts simultaneously without hands-on scaffolding or micro-practice.',
            rationale: 'Correct! Beginners need one concept at a time paired immediately with a small win before moving to advanced abstractions.',
            isRecommended: true,
          },
          {
            text: 'Students are just lazy and should study harder.',
            rationale: 'Blaming students ignores the structural flaw of dumping high-friction concepts all at once.',
          },
          {
            text: 'The video was 45 minutes; making it 2 hours will fix the problem.',
            rationale: 'Longer videos increase fatigue and cognitive exhaustion.',
          },
        ],
      },
    },
  },

  // 10. PUBLIC SECTOR & CIVIC TECH
  {
    id: 'civic-tech-analyst',
    title: 'Civic Tech & Public Policy Analyst',
    categoryId: 'public-sector',
    tagline: 'Building modern digital public services that serve every citizen fairly.',
    whatItInvolves:
      'Civic technologists and public analysts modernize government portals, food assistance benefits, voter guides, and public transit apps. You ensure public services are accessible to people of all income and tech levels.',
    commonWork: [
      'Auditing government benefit applications to remove redundant legalistic jargon',
      'Designing multilingual, low-bandwidth interfaces for rural and public libraries',
      'Analyzing public census data to identify underserved neighborhoods',
      'Drafting open-data policies that protect citizen privacy',
    ],
    usefulSkills: ['Plain Language Writing', 'Accessibility (WCAG)', 'Public Policy Ethics', 'Low-Bandwidth Web Design', 'Community Research'],
    beginnerFriendlyTasks: [
      'Rewrite 1 page of complex local government parking/permit rules into 5 plain bullet points',
      'Test a local city council website on an old phone using 3G throttling to measure load time',
      'Create an infographic summarizing local library free resources',
    ],
    exampleProjects: [
      'Plain-English voting guide for local municipal elections',
      'Public park accessibility directory for wheelchair users and young families',
      'Low-bandwidth transit schedule text message bot',
    ],
    typicalWorkplaceActivities: [
      'Testing intake forms with community center members who have limited tech literacy',
      'Collaborating with city agencies to release open transit data',
      'Presenting accessibility audit findings to city council representatives',
    ],
    tryActivity: {
      id: 'act-civic-1',
      title: 'Translate Bureaucratic Jargon to Plain Language',
      timeEstimate: '5 mins',
      scenario:
        'A local transit notice reads: "Patrons seeking vehicular indemnification pursuant to subsection 4B must tender notarized documentation antecedent to remittance adjudication."',
      taskPrompt: 'Translate this public notice so any everyday citizen can understand it.',
      sampleDeliverable: 'A 1-sentence plain-language instruction.',
      interactiveChallenge: {
        question: 'Which rewritten notice serves everyday citizens best?',
        choices: [
          {
            text: '"To dispute a parking ticket, please bring a signed copy of your parking receipt to the clerk’s office before paying."',
            rationale: 'Spot on! It uses active voice, simple verbs, and tells the citizen exactly what to do and bring.',
            isRecommended: true,
          },
          {
            text: '"Citizens requiring ticket relief must execute procedural statutory stipulations."',
            rationale: 'Still full of legalistic jargon that intimidates and confuses residents.',
          },
          {
            text: '"Parking is prohibited."',
            rationale: 'That does not explain how to dispute an existing ticket.',
          },
        ],
      },
    },
  },
];
