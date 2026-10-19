import { ProjectItem, ProjectField, ProjectLevel } from '../types/projects';

export const PROJECT_FIELDS: ProjectField[] = [
  'All Fields',
  'Data',
  'Business',
  'Design',
  'Marketing',
  'Research',
  'Writing',
  'Finance',
  'Education',
  'Health',
  'Operations',
  'Engineering',
  'Creative Work',
];

export const PROJECT_LEVELS: Array<'All Levels' | ProjectLevel> = [
  'All Levels',
  'Starter',
  'Beginner',
  'Intermediate',
  'Advanced',
];

export const PROJECTS_CATALOG: ProjectItem[] = [
  // 1. BUSINESS
  {
    id: 'proj-biz-market-brief',
    title: 'Zero-to-One Competitive Landscape & Market Positioning Brief',
    field: 'Business',
    level: 'Beginner',
    timeEstimate: '4-6 hours',
    tagline: 'Analyze 4 competitors, identify market white space, and pitch a differentiated business model.',
    problem:
      'Early-stage founders and business managers often jump into product development without mapping the competitive landscape, burning cash on undifferentiated features.',
    goal:
      'Deliver an executive-level 5-page competitive intelligence briefing and positioning matrix for a hypothetical or real emerging business opportunity.',
    skills: ['Competitive Intelligence', 'Market Sizing', 'Value Proposition Design', 'Executive Synthesis'],
    tools: ['Notion / Google Docs', 'Figma / Miro', 'Crunchbase', 'Similarweb'],
    steps: [
      {
        stepNumber: 1,
        title: 'Market Category & Competitor Scouting',
        description: 'Map 2 direct competitors and 2 indirect alternatives across pricing, target user, and key weaknesses.',
        expectedOutput: 'Structured 4x6 competitor comparison table.',
      },
      {
        stepNumber: 2,
        title: 'User Frustration & Review Mining',
        description: 'Analyze 50+ real Trustpilot/G2/Reddit reviews to identify top unaddressed customer complaints.',
        expectedOutput: 'Top 3 validated customer pain point themes with verbatim quotes.',
      },
      {
        stepNumber: 3,
        title: 'White Space & Positioning Matrix',
        description: 'Create a 2x2 positioning grid illustrating where existing players cluster and where the opportunity lies.',
        expectedOutput: 'Visual 2x2 positioning quadrant diagram with strategic rationale.',
      },
      {
        stepNumber: 4,
        title: 'Executive Pitch & Unit Economics Rationale',
        description: 'Synthesize the strategic argument into an actionable 1-page executive summary for leadership.',
        expectedOutput: 'One-page strategic memo with recommended pricing model and differentiation moats.',
      },
    ],
    deliverables: [
      'Competitive Feature & Pricing Benchmark Matrix',
      '2x2 Market Positioning Quadrant Diagram',
      'One-Page Executive Strategy Brief for Leadership',
    ],
    example: {
      title: 'Competitive Intelligence: Remote Team Asynchronous Standup Tools',
      scenario: 'A B2B SaaS startup wanted to understand why remote engineering teams were abandoning video standups.',
      summary: 'Analyzed Geekbot and Standuply, identified that developers hated context switching during deep work hours, and mapped an asynchronous audio/slack brief positioning that cut meeting fatigue by 70%.',
      keyHighlights: [
        'Surveyed 35 developer forum threads on meeting fatigue',
        'Built clear 2x2 matrix plotting Synchronous vs Asynchronous against Text vs Voice',
        'Formulated a 3-tier freemium monetization model with $8/user/mo pricing anchor',
      ],
    },
    commonMistakes: [
      'Listing only basic features instead of analyzing pricing leverage and distribution channels.',
      'Assuming competitors have zero flaws; always look at customer support forums and 2-star reviews.',
      'Writing a 30-page novel; business leaders read 1-page executive summaries.',
    ],
    portfolioValue:
      'Demonstrates you can think strategically about product-market fit, commercial viability, and business strategy without drowning in operational trivia.',
    resumeValue: {
      bulletPoints: [
        'Conducted competitive market intelligence research across 4 incumbents, pinpointing high-margin white space that informed a 3-tier pricing model.',
        'Synthesized 50+ customer reviews into a 1-page executive strategy memo presented to business stakeholders.',
      ],
    },
    interviewValue: {
      talkingPoints: [
        'Explain how you dug into customer reviews on Reddit and G2 to uncover the real reason users churned.',
        'Walk through how you designed the 2x2 positioning matrix and defended your axes.',
      ],
      starFramework: {
        situation: 'Identified a crowded B2B SaaS market where new entrants were struggling to differentiate.',
        task: 'Conduct a thorough competitive analysis to identify viable positioning and defend a commercial pricing tier.',
        action: 'Mapped 4 key competitors, mined 50+ user reviews, and formulated a 2x2 white-space matrix.',
        result: 'Produced a concise 1-page executive brief that clarified target user segments and pricing.',
      },
    },
  },

  // 2. DATA
  {
    id: 'proj-data-retention-cohort',
    title: 'E-Commerce Customer Retention & Churn Cohort Diagnostic',
    field: 'Data',
    level: 'Intermediate',
    timeEstimate: '6-8 hours',
    tagline: 'Clean 1,000+ transaction records, construct a monthly cohort retention matrix, and propose retention fixes.',
    problem:
      'Customer acquisition costs have doubled across retail. Businesses that cannot track when and why customers stop re-ordering lose profitability quickly.',
    goal:
      'Ingest raw order logs, calculate Month 1 through Month 6 cohort retention rates, identify drop-off cliffs, and produce a data-backed business recommendation.',
    skills: ['SQL / Spreadsheets', 'Cohort Analysis', 'Data Cleaning', 'Data Storytelling'],
    tools: ['SQL (Postgres/BigQuery)', 'Python / Pandas', 'Tableau / Looker Studio', 'Spreadsheets'],
    steps: [
      {
        stepNumber: 1,
        title: 'Data Hygiene & Outlier Triage',
        description: 'Clean raw transaction logs, handle null user IDs, and deduplicate refunds and chargebacks.',
        expectedOutput: 'Clean dataset documentation with recorded data transformation rules.',
      },
      {
        stepNumber: 2,
        title: 'Cohort Matrix Calculation',
        description: 'Group users by first-purchase month and compute percentage retained at Months 1, 2, 3, 4, 5, and 6.',
        expectedOutput: 'Heatmap cohort retention table with percentages.',
      },
      {
        stepNumber: 3,
        title: 'Sub-Segment Exploration',
        description: 'Segment cohorts by discount code usage and product category to detect which channels produce loyal buyers.',
        expectedOutput: 'Segment comparative charts showing discounted vs organic user lifetime retention.',
      },
      {
        stepNumber: 4,
        title: 'Executive Diagnostic Memo',
        description: 'Draft a 2-page briefing connecting data findings to concrete marketing and product initiatives.',
        expectedOutput: 'Actionable executive report with 3 prioritized retention recommendations.',
      },
    ],
    deliverables: [
      'Documented SQL Script / Python Notebook with Cohort Calculations',
      'Visual Cohort Retention Heatmap with Month 1-6 Drop-offs',
      'Executive Retention Brief with Prioritized Recommendations',
    ],
    example: {
      title: 'Retention Analysis: DTC Coffee Subscription Company',
      scenario: 'A direct-to-consumer beverage brand noticed overall revenue grew, but customer repeat rate was crashing after month 2.',
      summary: 'Proved that 68% of churn occurred after the introductory promo box expired, and discovered customers receiving tasting notes had 2.4x higher 90-day retention.',
      keyHighlights: [
        'Analyzed 3,200 subscription transaction records across 8 monthly cohorts',
        'Discovered promotional 50% discount buyers had only 11% Month 3 retention vs 42% for organic buyers',
        'Recommended shifting marketing spend from paid ads into unboxing engagement',
      ],
    },
    commonMistakes: [
      'Confusing repeat revenue with customer retention percentages.',
      'Treating all customers as a monolith without segmenting by acquisition channel.',
      'Delivering raw charts without explaining what business action management should take.',
    ],
    portfolioValue:
      'Proves you do not merely create dashboards; you understand the financial levers of customer lifetime value and churn.',
    resumeValue: {
      bulletPoints: [
        'Constructed a 6-month cohort retention matrix from 1,000+ raw transaction records, identifying a 45% Month 2 cliff.',
        'Formulated 3 data-driven retention interventions projected to lift customer 90-day repeat purchases by 18%.',
      ],
    },
    interviewValue: {
      talkingPoints: [
        'Explain how you structured the SQL self-join or Pandas groupby to calculate acquisition vs subsequent activity dates.',
        'Discuss why organic buyers had higher lifetime value and how that shapes acquisition strategy.',
      ],
      starFramework: {
        situation: 'Subscription e-commerce business was experiencing silent churn without knowing which customer cohorts dropped off.',
        task: 'Build a rigorous cohort retention diagnostic to isolate the churn timing and root cause.',
        action: 'Cleaned raw transaction logs, built a cohort matrix in SQL/Python, and segmented by promo codes.',
        result: 'Uncovered that promo discounts generated poor retention and reoriented focus toward organic retention.',
      },
    },
  },

  // 3. DESIGN
  {
    id: 'proj-design-wcag-system',
    title: 'Community Non-Profit Design System & WCAG Accessible Redesign',
    field: 'Design',
    level: 'Intermediate',
    timeEstimate: '5-7 hours',
    tagline: 'Audit a public service interface, build atomic Figma design tokens, and deliver accessible WCAG AA prototypes.',
    problem:
      'Community health and civic web services frequently fail accessibility standards, locking out elderly citizens and people with motor or visual impairments.',
    goal:
      'Audit an existing public civic service, establish an accessible typography and color token system in Figma, and redesign 3 core responsive screens to full WCAG AA compliance.',
    skills: ['Accessibility (WCAG 2.1)', 'Design Systems (Tokens)', 'Figma Auto-Layout', 'Responsive UX Design'],
    tools: ['Figma', 'WebAIM Contrast Checker', 'Stark / Axe DevTools', 'FigJam'],
    steps: [
      {
        stepNumber: 1,
        title: 'Accessibility & Usability Audit',
        description: 'Audit the existing civic site for contrast ratios, missing focus rings, font legibility, and tap targets.',
        expectedOutput: 'Annotated visual audit report detailing 8 WCAG AA violations.',
      },
      {
        stepNumber: 2,
        title: 'Design System Tokens Foundation',
        description: 'Create standardized color styles (contrast-verified), typography scale, and 8px spatial grid tokens in Figma.',
        expectedOutput: 'Figma token library page with Primary, Neutral, and Semantic feedback colors.',
      },
      {
        stepNumber: 3,
        title: 'Atomic Components with Interactive States',
        description: 'Build buttons, form inputs, badges, and modal dialogs using Auto-Layout with Default, Hover, and Keyboard Focus states.',
        expectedOutput: 'Reusable Figma component set with accessible states.',
      },
      {
        stepNumber: 4,
        title: 'High-Fidelity Responsive Prototype',
        description: 'Assemble mobile (375px) and desktop (1440px) flows for form completion and appointment confirmation.',
        expectedOutput: 'Interactive Figma prototype link with documented before-and-after improvements.',
      },
    ],
    deliverables: [
      'WCAG 2.1 Accessibility Audit Scorecard & Findings Memo',
      'Figma Accessible Token & Component Library (Auto-Layout)',
      'Responsive Before/After Civic Service Redesign Flow',
    ],
    example: {
      title: 'Civic Service Redesign: County Food Assistance Application',
      scenario: 'A local county benefits portal had pale grey text on white backgrounds and form inputs that broke on mobile phones.',
      summary: 'Redesigned the 3-step application flow, boosted contrast from 2.1:1 to 7.2:1, increased tap targets to 48px, and cut form completion steps from 9 to 4.',
      keyHighlights: [
        'Passed 100% of WCAG AA criteria including 4.5:1 text contrast and visible 3px focus rings',
        'Implemented clear error validation messages right below the offending input field',
        'Built with Figma Auto-Layout 5.0 for seamless responsiveness across mobile and tablet',
      ],
    },
    commonMistakes: [
      'Focusing solely on pretty colors without checking contrast with automated tools.',
      'Designing static screens without Hover, Active, and Keyboard Focus states.',
      'Neglecting screen reader labels and clear descriptive error message states.',
    ],
    portfolioValue:
      'Proves you design for real humans in complex real-world conditions, an instant hiring differentiator over generic Dribbble mockups.',
    resumeValue: {
      bulletPoints: [
        'Spearheaded a WCAG 2.1 AA accessibility redesign of a civic portal, remediating 8 accessibility violations across mobile and desktop.',
        'Engineered an atomic design system in Figma with 8px spatial grid tokens and accessible state variants.',
      ],
    },
    interviewValue: {
      talkingPoints: [
        'Walk through how you prioritized contrast ratios without sacrificing modern, calm aesthetic beauty.',
        'Explain why focus states and single-column form layouts dramatically reduce cognitive load for users.',
      ],
      starFramework: {
        situation: 'Public assistance interface was illegible on mobile devices and failed accessibility standards.',
        task: 'Conduct a thorough accessibility audit and deliver a modern, fully accessible design system.',
        action: 'Audited contrast, created atomic tokens in Figma, and redesigned 3 core screens.',
        result: 'Achieved 100% WCAG AA compliance with tested mobile responsiveness.',
      },
    },
  },

  // 4. WRITING
  {
    id: 'proj-writing-tech-onboarding',
    title: 'B2B Technical Onboarding Guide & API Documentation Suite',
    field: 'Writing',
    level: 'Starter',
    timeEstimate: '3-4 hours',
    tagline: 'Transform confusing technical documentation into an intuitive 15-minute quickstart guide.',
    problem:
      'Software tools lose up to 60% of new users during initial setup because developer documentation is fragmented, jargon-heavy, and lacks working copy-paste code snippets.',
    goal:
      'Author a comprehensive, clean, 3-part technical quickstart guide for a developer API or productivity workflow that enables a newcomer to succeed in under 15 minutes.',
    skills: ['Technical Documentation', 'Clear Writing', 'Information Architecture', 'Developer Experience (DX)'],
    tools: ['Markdown / GitHub', 'Notion', 'Postman / cURL', 'Mermaid.js'],
    steps: [
      {
        stepNumber: 1,
        title: 'User Journey & Pre-Requisite Audit',
        description: 'Audit common setup failures and list minimal required credentials and environment tools.',
        expectedOutput: 'Prerequisites checklist and conceptual architecture diagram.',
      },
      {
        stepNumber: 2,
        title: '15-Minute "Hello World" Quickstart',
        description: 'Draft the step-by-step tutorial with verified code snippets and expected terminal output.',
        expectedOutput: 'Markdown quickstart guide with clear code blocks and screenshots.',
      },
      {
        stepNumber: 3,
        title: 'Error Handling & Troubleshooting Playbook',
        description: 'Document the 4 most frequent errors (e.g. 401 Unauthorized, rate limit, invalid JSON) and their exact fixes.',
        expectedOutput: 'Self-serve troubleshooting reference matrix.',
      },
      {
        stepNumber: 4,
        title: 'Clarity Review & Peer Readability Test',
        description: 'Run the guide through readability benchmarks (Hemingway/Flesch-Kincaid) and test on a fresh user.',
        expectedOutput: 'Final published Markdown repository guide.',
      },
    ],
    deliverables: [
      'Architecture Overview & Pre-requisites Checklist',
      'Tested 15-Minute Developer Quickstart Guide (Markdown)',
      'Self-Service Error Remediation Matrix',
    ],
    example: {
      title: 'Documentation: Open Weather & Climate Data API Quickstart',
      scenario: 'A climate research organization had public API documentation written in dense academic prose that developers struggled to integrate.',
      summary: 'Rewrote the quickstart into 3 clear steps: Get Key -> Make First Fetch -> Parse Output, reducing onboarding time from 45 mins to 8 mins.',
      keyHighlights: [
        'Created copy-paste cURL and JavaScript fetch examples with inline comments',
        'Added realistic JSON response samples with annotated property explanations',
        'Built a 4-row troubleshooting table covering 403 Forbidden and rate limits',
      ],
    },
    commonMistakes: [
      'Assuming the reader already knows internal terminology and unspoken conventions.',
      'Providing code snippets that fail when copy-pasted without explaining where to add API keys.',
      'Writing huge text walls instead of visual numbered steps.',
    ],
    portfolioValue:
      'Technical writing and clear documentation are among the highest-paid hybrid capabilities in modern tech, research, and product organizations.',
    resumeValue: {
      bulletPoints: [
        'Authored an end-to-end technical onboarding guide and API documentation suite, reducing initial developer setup friction.',
        'Formulated a self-service troubleshooting matrix covering authentication and rate-limiting error remediation.',
      ],
    },
    interviewValue: {
      talkingPoints: [
        'Explain how you structured progressive disclosure: basic setup first, advanced configuration later.',
        'Discuss how concise technical writing prevents customer support overhead.',
      ],
      starFramework: {
        situation: 'New users struggled to configure an API integration due to jargon-heavy documentation.',
        task: 'Write a beginner-friendly 15-minute quickstart guide with error recovery steps.',
        action: 'Audited friction points, authored clean Markdown tutorials with verified snippets, and built troubleshooting docs.',
        result: 'Produced a pristine technical documentation asset ready for production developer portals.',
      },
    },
  },

  // 5. FINANCE
  {
    id: 'proj-fin-saas-unit-economics',
    title: 'Early-Stage SaaS Unit Economics & Cash Runway Model',
    field: 'Finance',
    level: 'Intermediate',
    timeEstimate: '5-7 hours',
    tagline: 'Build an interactive 12-month financial model calculating CAC, LTV, gross margin, and monthly burn runway.',
    problem:
      'Startups frequently fail not because their product lacks users, but because unit economics are underwater (spending $200 to acquire a customer who only yields $100 in gross profit).',
    goal:
      'Construct a structured 12-month financial forecasting spreadsheet modeling revenue streams, customer acquisition cost (CAC), lifetime value (LTV), and cash runway scenarios.',
    skills: ['Financial Modeling', 'Unit Economics (CAC/LTV)', 'Scenario Planning', 'Spreadsheet Architecture'],
    tools: ['Google Sheets / Excel', 'Causal', 'Notion'],
    steps: [
      {
        stepNumber: 1,
        title: 'Assumptions Architecture & Variable Drivers',
        description: 'Define core drivers: Average Revenue Per User (ARPU), churn rate, cost of goods sold, and paid marketing spend.',
        expectedOutput: 'Assumptions tab with color-coded inputs vs formulas.',
      },
      {
        stepNumber: 2,
        title: 'Monthly Cash Flow & P&L Forecast',
        description: 'Build a dynamic 12-month projection tracking monthly recurring revenue (MRR), payroll, server hosting, and net cash burn.',
        expectedOutput: '12-month forecast table with automated cash balance calculations.',
      },
      {
        stepNumber: 3,
        title: 'Unit Economics Diagnostic (CAC : LTV Ratio)',
        description: 'Compute Customer Acquisition Cost, Payback Period in months, and LTV:CAC ratio across organic vs paid acquisition.',
        expectedOutput: 'Unit economics summary dashboard with payback metrics.',
      },
      {
        stepNumber: 4,
        title: 'Sensitivity & Runway Scenario Stress Test',
        description: 'Model 3 scenarios: Base Case, Bear Case (churn rises by 25%), and Bull Case, determining months of runway remaining.',
        expectedOutput: 'Scenario sensitivity table with runway summary chart.',
      },
    ],
    deliverables: [
      'Interactive 12-Month Financial Forecasting Model (Google Sheets/Excel)',
      'Unit Economics Diagnostic Dashboard (LTV, CAC, Payback Period)',
      'Executive Financial Runway Memo for Investors/Founders',
    ],
    example: {
      title: 'Financial Model: B2B Micro-SaaS Collaborative Tool',
      scenario: 'A bootstrap SaaS team had $80,000 in bank balance and needed to decide whether to hire their first full-time engineer.',
      summary: 'Demonstrated that their customer payback period was 4.2 months with an LTV:CAC ratio of 3.8:1, giving them 14 months of runway at current growth rates.',
      keyHighlights: [
        'Enforced strict spreadsheet discipline with distinct blue font for raw inputs and black for formulas',
        'Modeled realistic payment processor fees (2.9% + 30¢) and customer support costs into Gross Margin',
        'Identified that annual upfront plans improved cash runway by 3.5 months',
      ],
    },
    commonMistakes: [
      'Hardcoding numbers inside formulas instead of keeping all assumptions on a single dedicated tab.',
      'Assuming 0% customer churn and 100% gross margins.',
      'Ignoring payment processing fees and hosting server scaling costs.',
    ],
    portfolioValue:
      'Financial acumen and unit economics literacy signal executive readiness for business operations, founder associate, and analyst roles.',
    resumeValue: {
      bulletPoints: [
        'Engineered a dynamic 12-month financial forecast model calculating CAC, LTV, payback period, and monthly cash burn.',
        'Stress-tested 3 financial runway scenarios, pinpointing an optimal customer payback period of 4.2 months.',
      ],
    },
    interviewValue: {
      talkingPoints: [
        'Walk through why a 3:1 LTV:CAC ratio is the classic benchmark and what happens when payback exceeds 12 months.',
        'Discuss how annual prepayments fundamentally change startup cash runway.',
      ],
      starFramework: {
        situation: 'An early-stage venture was making hiring decisions without modeling their unit economics or cash runway.',
        task: 'Build a rigorous financial forecasting model to evaluate cash burn and acquisition efficiency.',
        action: 'Structured a 12-month P&L model with variable CAC, churn, and scenario sensitivity tables.',
        result: 'Provided management with clear visibility into their 14-month runway and safe hiring threshold.',
      },
    },
  },

  // 6. HEALTH
  {
    id: 'proj-health-telehealth-intake',
    title: 'Patient Intake Friction Audit & Clinical Telehealth Workflow',
    field: 'Health',
    level: 'Beginner',
    timeEstimate: '4-5 hours',
    tagline: 'Audit a digital clinic intake journey, remove redundant questionnaire steps, and design a compliant workflow.',
    problem:
      'Up to 35% of patients abandon digital clinic registrations because intake questionnaires are repetitive, ask for unnecessary insurance data upfront, and violate plain-language health communication standards.',
    goal:
      'Map the patient registration and clinical triage journey, eliminate 50% of redundant data requests, and design a compliant, compassionate intake process.',
    skills: ['Clinical Workflow Design', 'Patient Journey Mapping', 'Health Literacy & HIPAA', 'Service Design'],
    tools: ['Figma / Miro', 'Notion', 'Lucidchart'],
    steps: [
      {
        stepNumber: 1,
        title: 'Current-State Journey Map',
        description: 'Map all 22 steps of a typical clinic onboarding flow from sign-up to doctor consultation.',
        expectedOutput: 'Detailed journey map highlighting patient drop-off points.',
      },
      {
        stepNumber: 2,
        title: 'Regulatory & Health Literacy Review',
        description: 'Identify medical jargon terms and evaluate which questions are medically essential before appointment vs after.',
        expectedOutput: 'Question classification matrix (Essential Pre-visit vs Post-visit Deferred).',
      },
      {
        stepNumber: 3,
        title: 'Streamlined Intake Wireframe Flow',
        description: 'Redesign the intake journey into a clean 3-part progressive flow with plain-language symptom descriptions.',
        expectedOutput: 'Wireframe user flow diagram with mobile screen sketches.',
      },
      {
        stepNumber: 4,
        title: 'Clinical Operations Impact Memo',
        description: 'Document how the redesigned flow protects clinician review time while boosting patient completion.',
        expectedOutput: '1-page operational impact memo for clinical directors.',
      },
    ],
    deliverables: [
      'Current-State Patient Journey Map & Drop-Off Audit',
      'Plain-Language Intake Question Optimization Matrix',
      'Clinical Operations Impact Memo for Medical Leadership',
    ],
    example: {
      title: 'Workflow Redesign: Pediatric Urgent Care Telehealth Intake',
      scenario: 'Parents seeking same-day virtual urgent care were abandoning intake forms due to 18 required screens before seeing a triage nurse.',
      summary: 'Deferred insurance card uploads to post-consultation and created an intuitive 1-screen symptom checker, reducing time to see a nurse from 22 mins to 6 mins.',
      keyHighlights: [
        'Categorized triage urgency into 3 clear color-coded indicators',
        'Wrote compassionate reassuring microcopy for anxious parents',
        'Preserved strict HIPAA compliance while deferring non-urgent billing entries',
      ],
    },
    commonMistakes: [
      'Asking for billing and insurance card photos before explaining when the patient will see a provider.',
      'Using clinical medical terminology instead of words everyday patients use.',
      'Failing to provide clear emergency redirection (e.g. Call 911 for severe symptoms).',
    ],
    portfolioValue:
      'Demonstrates healthcare operations and health-tech service design skills that bridge patient experience with strict regulatory requirements.',
    resumeValue: {
      bulletPoints: [
        'Mapped and redesigned a digital clinical intake workflow, eliminating 50% of redundant pre-consultation questions.',
        'Authored a clinical operations briefing on streamlining patient intake while preserving medical triage compliance.',
      ],
    },
    interviewValue: {
      talkingPoints: [
        'Discuss why healthcare UX requires deep empathy: patients are often sick, stressed, or in pain when filling out forms.',
        'Explain how progressive disclosure protects both clinical safety and patient conversion.',
      ],
      starFramework: {
        situation: 'Telehealth patients were abandoning consultations due to exhausting 20-minute digital intake questionnaires.',
        task: 'Audit the intake journey to reduce friction without compromising clinical triage data.',
        action: 'Mapped the patient journey, deferred non-urgent insurance uploads, and redesigned plain-language forms.',
        result: 'Decreased intake time by over 60% while maintaining clinical compliance.',
      },
    },
  },

  // 7. OPERATIONS
  {
    id: 'proj-ops-fulfillment-audit',
    title: 'Warehouse Fulfillment Bottleneck Audit & Standard Operating Procedure',
    field: 'Operations',
    level: 'Beginner',
    timeEstimate: '4-6 hours',
    tagline: 'Diagnose an order fulfillment bottleneck, map value stream cycle times, and draft an actionable SOP.',
    problem:
      'Growing direct-to-consumer businesses suffer order dispatch delays because packing stations lack standardized handoffs, causing inventory misplacement and overtime labor costs.',
    goal:
      'Map the end-to-end warehouse picking, packing, and dispatch pipeline, quantify cycle-time bottlenecks, and write a foolproof Standard Operating Procedure (SOP).',
    skills: ['Process Mapping', 'Standard Operating Procedures (SOP)', 'Root Cause Analysis', 'Operational Efficiency'],
    tools: ['Process Mapping (Miro/Lucidchart)', 'Notion / Docs', 'Spreadsheets'],
    steps: [
      {
        stepNumber: 1,
        title: 'Value Stream Mapping',
        description: 'Map each touchpoint from customer order placement to carrier pickup, recording average minutes per step.',
        expectedOutput: 'End-to-end operational flow diagram with cycle time annotations.',
      },
      {
        stepNumber: 2,
        title: 'Bottleneck & Root Cause Investigation',
        description: 'Conduct a 5-Whys root cause analysis to discover why packing stations experience 45-minute idle queues.',
        expectedOutput: '5-Whys root cause diagnostic matrix.',
      },
      {
        stepNumber: 3,
        title: 'Standard Operating Procedure (SOP) Formulation',
        description: 'Author a step-by-step SOP with visual checklists, quality checks, and exception escalation protocols.',
        expectedOutput: '2-page visual SOP document ready for operational warehouse teams.',
      },
      {
        stepNumber: 4,
        title: 'KPI Scorecard & Performance Metrics',
        description: 'Define 4 operational metrics (Dock-to-Stock, Pick Accuracy, Cost-per-Order, On-Time Dispatch).',
        expectedOutput: 'Operational KPI tracking dashboard template.',
      },
    ],
    deliverables: [
      'Value Stream Process Map with Cycle Time Metrics',
      '5-Whys Operational Root Cause Analysis Matrix',
      'Standard Operating Procedure (SOP) with Quality Checklists',
    ],
    example: {
      title: 'Operations Optimization: Regional Distribution Center Order Packing',
      scenario: 'A specialty goods retailer experienced 24-hour shipping delays during promotional flash sales.',
      summary: 'Discovered pickers were waiting in line for packing tape and bubble wrap restocking. Reorganized station layout using 5S methodology, cutting dispatch delays by 42%.',
      keyHighlights: [
        'Created station layout diagram ensuring all packing supplies sit within arm\'s reach',
        'Drafted a 1-page visual SOP posted at every packing bench',
        'Established a daily 5-minute morning shift standup checklist',
      ],
    },
    commonMistakes: [
      'Writing an SOP in dense passive paragraphs that floor workers will never read; use visual checklists and bullet points.',
      'Treating symptoms instead of finding the root cause (e.g. telling workers to move faster instead of fixing supply stockouts).',
      'Forgetting exception handling: what happens when an item is damaged or out of stock?',
    ],
    portfolioValue:
      'Operational excellence is universally valued across logistics, tech ops, manufacturing, and business management.',
    resumeValue: {
      bulletPoints: [
        'Conducted a value-stream process audit of an order fulfillment pipeline, identifying bottlenecks that reduced cycle times.',
        'Authored a standardized operating procedure (SOP) with visual quality checklists adopted by dispatch teams.',
      ],
    },
    interviewValue: {
      talkingPoints: [
        'Explain how you applied root cause analysis (5-Whys) to identify physical workflow bottlenecks.',
        'Discuss why clear documentation and visual management drive consistent team performance.',
      ],
      starFramework: {
        situation: 'Order dispatch was experiencing unpredictable delays during high-volume sales spikes.',
        task: 'Diagnose the physical workflow bottlenecks and establish standardized operational handoffs.',
        action: 'Mapped the process flow, performed root-cause analysis, and authored a 1-page visual SOP.',
        result: 'Established predictable dispatch times and eliminated packing station idle queues.',
      },
    },
  },

  // 8. MARKETING
  {
    id: 'proj-mkt-influencer-launch',
    title: 'Product Launch Acquisition Strategy & Micro-Influencer Playbook',
    field: 'Marketing',
    level: 'Beginner',
    timeEstimate: '4-5 hours',
    tagline: 'Design an organic creator outreach campaign, craft outreach templates, and project acquisition ROI.',
    problem:
      'Direct-to-consumer and modern software brands waste thousands of dollars hiring expensive celebrity influencers who generate vanity likes but zero paying customers.',
    goal:
      'Design a 30-day product launch strategy leveraging 20 targeted micro-creators, complete with personalized pitch scripts, content briefs, and conversion tracking.',
    skills: ['Creator Outreach', 'Campaign Planning', 'Customer Acquisition Cost', 'Copywriting'],
    tools: ['Notion / Sheets', 'Canva', 'Social Search'],
    steps: [
      {
        stepNumber: 1,
        title: 'Creator Persona & Audience Alignment',
        description: 'Define the target creator archetype (5k-50k followers) with high engagement and demographic overlap.',
        expectedOutput: 'Target creator persona profile with vetting criteria.',
      },
      {
        stepNumber: 2,
        title: 'Pitch Script & Outreach Sequence',
        description: 'Draft a 3-part direct messaging sequence that avoids corporate spam and highlights genuine product value.',
        expectedOutput: 'Personalized outreach email/DM templates with follow-up cadences.',
      },
      {
        stepNumber: 3,
        title: 'Creative Brief & Storyboard Guidance',
        description: 'Write a 1-page creative brief that gives creators authentic freedom while requiring the core value proposition.',
        expectedOutput: 'Creator campaign brief with mandatory brand guidelines.',
      },
      {
        stepNumber: 4,
        title: 'Attribution & Performance Scorecard',
        description: 'Set up unique promo code and affiliate UTM tracking to measure click-through rate, CAC, and conversion rate.',
        expectedOutput: 'Campaign performance tracking sheet with projected ROI calculations.',
      },
    ],
    deliverables: [
      'Target Creator Vetting Scorecard & Selection Criteria',
      '3-Part Direct Message & Email Outreach Sequence',
      'One-Page Creative Brief & Conversion Tracking Scorecard',
    ],
    example: {
      title: 'Campaign Playbook: Sustainable Kitchenware Launch',
      scenario: 'An eco-friendly cookware brand launched a plastic-free storage kit with a $1,500 total marketing budget.',
      summary: 'Partnered with 15 zero-waste food bloggers by gifting sample kits, generating 48 user-generated videos and 320 first-week orders at a $4.80 customer acquisition cost.',
      keyHighlights: [
        'Avoided paid upfront sponsorship fees by offering 20% affiliate rev-share and gifted product',
        'Provided creators with recipe prompt ideas rather than rigid corporate scripts',
        'Achieved a 28% response rate on initial outreach DMs',
      ],
    },
    commonMistakes: [
      'Sending generic cut-and-paste emails without referencing specific content the creator recently posted.',
      'Forcing creators to read rigid marketing scripts that alienate their followers.',
      'Forgetting to set up specific UTM tracking links or unique discount codes for attribution.',
    ],
    portfolioValue:
      'Proves modern growth marketing instincts: understanding organic distribution, creator economics, and conversion funnels.',
    resumeValue: {
      bulletPoints: [
        'Architected a 30-day creator partnership launch campaign targeting 20 micro-influencers with attribution tracking.',
        'Authored high-conversion outreach copy and creative guidelines that achieved a 28% creator response rate.',
      ],
    },
    interviewValue: {
      talkingPoints: [
        'Explain why micro-creators with 10k engaged followers often drive 5x higher purchase conversion than 1M-follower accounts.',
        'Discuss how to maintain brand integrity while letting creators speak in their authentic voice.',
      ],
      starFramework: {
        situation: 'New product needed early customer traction with limited paid advertising budget.',
        task: 'Develop an organic creator outreach playbook to drive verified first-month sales.',
        action: 'Defined creator criteria, wrote personalized pitch sequences, and structured UTM attribution.',
        result: 'Executed an acquisition campaign yielding a low $4.80 customer acquisition cost.',
      },
    },
  },
];

export function getProjectById(id: string): ProjectItem | undefined {
  return PROJECTS_CATALOG.find((p) => p.id === id);
}

export function filterProjects(
  field: ProjectField,
  level: 'All Levels' | ProjectLevel,
  searchQuery: string
): ProjectItem[] {
  return PROJECTS_CATALOG.filter((project) => {
    if (field !== 'All Fields' && project.field !== field) return false;
    if (level !== 'All Levels' && project.level !== level) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = project.title.toLowerCase().includes(q);
      const matchTagline = project.tagline.toLowerCase().includes(q);
      const matchSkills = project.skills.some((s) => s.toLowerCase().includes(q));
      const matchProblem = project.problem.toLowerCase().includes(q);
      if (!matchTitle && !matchTagline && !matchSkills && !matchProblem) return false;
    }
    return true;
  });
}
