import {
  Opportunity,
  OpportunityCategory,
  OpportunityNature,
  ApplicationItem,
  ApplicationStage,
} from '../types/opportunities';
import { UserProfile } from '../types/user';
import { EvidenceItem } from '../types/evidence';
import { getEvidenceItems } from './evidenceService';

const APPLICATIONS_STORAGE_KEY = 'careeros_user_applications';

export const NATURE_LABELS: Record<OpportunityNature, { label: string; subLabel: string; badgeVariant: 'emerald' | 'blue' | 'purple' | 'amber' | 'slate' | 'coral'; description: string }> = {
  practice_simulation: {
    label: 'CareerOS simulation',
    subLabel: 'Practice Drill',
    badgeVariant: 'purple',
    description: 'Self-paced realistic workplace scenario powered by CareerOS simulation engine (Educational drill, not a real employer).',
  },
  careeros_challenge: {
    label: 'CareerOS simulation',
    subLabel: 'Skill Challenge',
    badgeVariant: 'blue',
    description: 'Structured practical problem with mentor-aligned criteria and portfolio evidence output.',
  },
  community_project: {
    label: 'Community project',
    subLabel: 'Open Source',
    badgeVariant: 'emerald',
    description: 'Open source or civic contribution for real public codebases and non-profit initiatives.',
  },
  company_challenge: {
    label: 'Company challenge',
    subLabel: 'Industry Problem',
    badgeVariant: 'amber',
    description: 'Official skills test or open case challenge published by partner engineering teams.',
  },
  real_internship: {
    label: 'Verified opportunity',
    subLabel: 'Verified Internship',
    badgeVariant: 'coral',
    description: 'Verified active corporate or institutional internship with vetted employer (Vetted & verified by CareerOS).',
  },
  real_job: {
    label: 'Verified opportunity',
    subLabel: 'Verified Job',
    badgeVariant: 'emerald',
    description: 'Verified full-time or part-time junior/entry-level position with vetted employer.',
  },
};

export const INITIAL_OPPORTUNITIES: Opportunity[] = [
  // --- REAL JOBS (Verified employers only) ---
  {
    id: 'opp-real-job-khan',
    title: 'Associate Frontend Engineer',
    organization: 'Khan Academy',
    organizationVerified: true,
    nature: 'real_job',
    category: 'jobs',
    location: 'Remote (US & Canada)',
    locationType: 'remote',
    targetMarket: 'us_na',
    regionalCurrency: 'USD',
    salaryNumeric: 100000,
    skills: ['React', 'TypeScript', 'Accessibility (WCAG)', 'State Management', 'Testing'],
    experience: 'Early Career (0-2 years, portfolio proof valued over degree)',
    description:
      'Build equitable, accessible learning interfaces used by millions of K-12 students and teachers. You will develop responsive interactive course components and ensure WCAG AA compliance.',
    whyItMayFit:
      'Matches your React and Accessibility proof. Your audit of color contrast and interactive pricing calculator serve as direct evidence.',
    compensation: '$92,000 - $108,000 / yr + Benefits',
    deadline: '2026-11-15',
    postedDate: '2026-10-02',
    action: {
      label: 'Apply on Khan Academy Careers',
      type: 'external_apply',
      url: 'https://www.khanacademy.org/careers',
    },
  },
  {
    id: 'opp-real-job-swiggy-india',
    title: 'Software Development Engineer - 1 (Fresher SDE-1)',
    organization: 'Swiggy',
    organizationVerified: true,
    nature: 'real_job',
    category: 'jobs',
    location: 'Bangalore / Hyderabad, India (Hybrid / Flexible)',
    locationType: 'hybrid',
    targetMarket: 'india_south_asia',
    regionalCurrency: 'INR',
    salaryNumeric: 1600000,
    skills: ['Data Structures & Algorithms', 'React', 'TypeScript', 'REST APIs', 'Problem Solving'],
    experience: 'Fresher / 2025-2026 Passing Out Batch (B.Tech / BE / MCA or demonstrated code proof)',
    description:
      'Join the consumer web team at Swiggy. Build responsive high-throughput checkout and food tracking web components supporting millions of daily active orders across Indian metros.',
    whyItMayFit:
      'Strong alignment with your problem solving drills, clean API contract design, and interactive UI component evidence.',
    compensation: '₹14 - ₹18 LPA (CTC) + ESOPs + Health Cover',
    deadline: '2026-11-20',
    postedDate: '2026-10-03',
    action: {
      label: 'Apply via Swiggy Early Careers',
      type: 'external_apply',
      url: 'https://careers.swiggy.com',
    },
  },
  {
    id: 'opp-real-job-monzo-uk',
    title: 'Graduate Software Engineer (Web & Core)',
    organization: 'Monzo Bank',
    organizationVerified: true,
    nature: 'real_job',
    category: 'jobs',
    location: 'London, UK / Remote UK',
    locationType: 'hybrid',
    targetMarket: 'uk_europe',
    regionalCurrency: 'GBP',
    salaryNumeric: 44000,
    skills: ['TypeScript', 'React', 'Financial Systems', 'Testing', 'Clear Writing'],
    experience: 'Graduate / Junior (All academic backgrounds & conversion bootcamps welcome)',
    description:
      'Help make money work for everyone. Work inside an autonomous product squad building accessible banking interfaces, customer budgeting tools, and fraud alert components.',
    whyItMayFit:
      'Direct match for your state management drills, clear written documentation, and resilient user error handling.',
    compensation: '£42,000 - £48,000 / yr + Equity & Pension',
    deadline: '2026-11-30',
    postedDate: '2026-10-01',
    action: {
      label: 'Apply on Monzo Graduate Scheme',
      type: 'external_apply',
      url: 'https://monzo.com/careers',
    },
  },
  {
    id: 'opp-real-job-nubank-latam',
    title: 'Desenvolvedor(a) Júnior Frontend (Junior Engineer)',
    organization: 'Nubank',
    organizationVerified: true,
    nature: 'real_job',
    category: 'jobs',
    location: 'São Paulo, Brasil / Remoto Brasil',
    locationType: 'remote',
    targetMarket: 'latin_america',
    regionalCurrency: 'BRL',
    salaryNumeric: 96000,
    skills: ['React', 'TypeScript', 'Clean Code', 'Testes Automatizados', 'Comunicação'],
    experience: 'Início de carreira (estudantes recém-formados ou transição de carreira com portfólio prático)',
    description:
      'Faça parte do maior neobanco da América Latina. Construa interfaces acessíveis e fluidas para dezenas de milhões de clientes no Brasil, México e Colômbia.',
    whyItMayFit:
      'Alinhamento com seus projetos práticos em TypeScript e experiência comprovada em auditoria de acessibilidade.',
    compensation: 'R$ 7.500 - R$ 9.000 / mês (CLT) + Benefícios Flexíveis',
    deadline: '2026-11-15',
    postedDate: '2026-10-05',
    action: {
      label: 'Candidatar-se no Nubank Carreiras',
      type: 'external_apply',
      url: 'https://nubank.com.br/carreiras',
    },
  },
  {
    id: 'opp-real-job-gitlab',
    title: 'Junior Developer Experience Engineer',
    organization: 'GitLab',
    organizationVerified: true,
    nature: 'real_job',
    category: 'jobs',
    location: 'Remote (Global - Anywhere in the World)',
    locationType: 'remote',
    targetMarket: 'global_remote',
    regionalCurrency: 'USD',
    salaryNumeric: 88000,
    skills: ['Git', 'JavaScript basics', 'TypeScript', 'Technical Translation', 'Clear Writing'],
    experience: 'Entry-Level (Demonstrated git workflow and documentation skills)',
    description:
      'Join the handbook-first, all-remote engineering organization. Help maintain developer workflows, triage community pull requests, and contribute to frontend tooling.',
    whyItMayFit:
      'Direct alignment with your Technical Translation and Role Analysis micro-proofs, plus Git collaboration evidence.',
    compensation: '$84,000 - $96,000 / yr (Geo-benchmarked)',
    deadline: '2026-11-01',
    postedDate: '2026-09-29',
    action: {
      label: 'View Job Posting & Apply',
      type: 'external_apply',
      url: 'https://about.gitlab.com/jobs',
    },
  },
  {
    id: 'opp-real-intern-zomato-india',
    title: 'Frontend Engineering Summer Intern',
    organization: 'Zomato',
    organizationVerified: true,
    nature: 'real_internship',
    category: 'internships',
    location: 'Gurgaon / Remote India',
    locationType: 'hybrid',
    targetMarket: 'india_south_asia',
    regionalCurrency: 'INR',
    salaryNumeric: 55000,
    skills: ['React', 'JavaScript basics', 'HTML & CSS', 'Mobile Web Optimization'],
    experience: 'Pre-final or final year college students (2025/2026 batch) or self-taught builders',
    description:
      'Paid 3-6 month engineering internship. Build fast, lightweight mobile web views for restaurant discovery, live delivery tracking, and merchant menus.',
    whyItMayFit:
      'Matches your mobile-first responsiveness focus and component decomposition evidence.',
    compensation: '₹50,000 / month stipend + PPO (Pre-Placement Offer) eligibility',
    deadline: '2026-11-25',
    postedDate: '2026-10-04',
    action: {
      label: 'Apply on Zomato Careers',
      type: 'external_apply',
      url: 'https://www.zomato.com/careers',
    },
  },

  // --- REAL INTERNSHIPS (Verified employers only) ---
  {
    id: 'opp-real-intern-mozilla',
    title: 'Open Web Engineering Intern',
    organization: 'Mozilla Foundation',
    organizationVerified: true,
    nature: 'real_internship',
    category: 'internships',
    location: 'Remote (Americas / EMEA)',
    locationType: 'remote',
    skills: ['HTML & CSS', 'JavaScript basics', 'Web Standards', 'Accessibility (WCAG)'],
    experience: 'Currently enrolled or recent graduate within 12 months',
    description:
      'Paid 12-week summer internship contributing to Firefox tools, MDN Web Docs interactive samples, and privacy-enhancing developer extensions with dedicated mentorship.',
    whyItMayFit:
      'Strong fit with your foundational web standards focus. Your verified WCAG contrast audit is an exact match for MDN quality standards.',
    compensation: '$42 / hr ($6,720 / mo)',
    deadline: '2026-11-30',
    postedDate: '2026-10-04',
    action: {
      label: 'Apply on Mozilla Careers',
      type: 'external_apply',
      url: 'https://www.mozilla.org/en-US/careers/university',
    },
  },
  {
    id: 'opp-real-intern-outreachy',
    title: 'Open Source Paid Intern (Dec - March Cohort)',
    organization: 'Outreachy',
    organizationVerified: true,
    nature: 'real_internship',
    category: 'internships',
    location: 'Fully Remote',
    locationType: 'remote',
    skills: ['Git', 'Problem Solving', 'Open Source', 'Clear Writing'],
    experience: 'Open to newcomers facing systemic barriers to tech',
    description:
      'A paid, 3-month remote internship supporting Free and Open Source Software (FOSS) communities. Includes dedicated one-on-one mentorship and public repository contributions.',
    whyItMayFit:
      'Matches your problem solving skills and written technical communication drills.',
    compensation: '$7,000 Total Stipend + $500 Travel Grant',
    deadline: '2026-10-25',
    postedDate: '2026-09-20',
    action: {
      label: 'Submit Initial Application',
      type: 'external_apply',
      url: 'https://www.outreachy.org',
    },
  },

  // --- APPRENTICESHIPS ---
  {
    id: 'opp-apprentice-multiverse',
    title: 'Software Engineering Degree Apprentice',
    organization: 'Multiverse UK & US Tech Network',
    organizationVerified: true,
    nature: 'real_internship',
    category: 'apprenticeships',
    location: 'Hybrid (New York, London, or Chicago)',
    locationType: 'hybrid',
    skills: ['Problem Solving', 'JavaScript basics', 'Growth Mindset', 'Team Communication'],
    experience: 'No computer science degree required (Alternative pathway)',
    description:
      'Earn while you learn. Pair full-time paid salaried work at an enterprise partner company with structured weekly software engineering coaching, capstone builds, and credentials.',
    whyItMayFit:
      'Ideal for your early-career foundation level. Prioritizes demonstrated learning velocity and practical tasks over formal pedigrees.',
    compensation: '$55,000 - $65,000 / yr + Tuition Paid',
    deadline: '2026-12-01',
    postedDate: '2026-09-25',
    action: {
      label: 'Check Eligibility & Apply',
      type: 'external_apply',
      url: 'https://www.multiverse.io',
    },
  },
  {
    id: 'opp-apprentice-techtonica',
    title: 'Full-Stack Software Engineering Fellow',
    organization: 'Techtonica',
    organizationVerified: true,
    nature: 'real_internship',
    category: 'apprenticeships',
    location: 'Remote (US)',
    locationType: 'remote',
    skills: ['HTML & CSS', 'JavaScript basics', 'React', 'Problem Solving'],
    experience: 'Beginners with completed introductory JavaScript projects',
    description:
      'Rigorous 6-month full-time training program followed by a guaranteed placement at a sponsoring tech company. Includes living stipend, laptop, and 1:1 professional mentors.',
    whyItMayFit:
      'Your interactive React pricing calculator qualifies as portfolio prerequisite proof for the technical phase.',
    compensation: '$1,000 / mo living stipend + Sponsored placement',
    deadline: '2026-11-10',
    postedDate: '2026-10-01',
    action: {
      label: 'Apply for Upcoming Cohort',
      type: 'external_apply',
      url: 'https://techtonica.org',
    },
  },

  // --- PRACTICE SIMULATIONS (Clearly simulated, NO fake internship claims) ---
  {
    id: 'opp-sim-stripe-webhook',
    title: 'Payment Gateway Webhook Resiliency Simulation',
    organization: 'CareerOS Workplace Sim Lab',
    organizationVerified: false,
    nature: 'practice_simulation',
    category: 'company_simulations',
    location: 'In-Browser Simulator',
    locationType: 'remote',
    skills: ['TypeScript', 'State Management', 'Error Handling', 'Reliability'],
    experience: 'Practice Simulation (Zero risk sandbox environment)',
    description:
      'Step into the role of an On-Call Junior Engineer handling duplicate Stripe checkout webhooks during peak holiday traffic. Implement idempotency keys and mock network rollbacks.',
    whyItMayFit:
      'Directly generates portfolio-grade evidence for backend reliability and edge-case handling without risking real production systems.',
    compensation: 'Practice Drill (Generates Verifiable Career Evidence)',
    postedDate: '2026-10-06',
    action: {
      label: 'Launch Workplace Simulation',
      type: 'start_simulation',
      routeTarget: 'work-ready',
    },
  },
  {
    id: 'opp-sim-cross-team-standup',
    title: 'Sprint Release Blocker & Cross-Team Negotiation',
    organization: 'CareerOS Teamwork Sim Lab',
    organizationVerified: false,
    nature: 'practice_simulation',
    category: 'company_simulations',
    location: 'In-Browser Interactive Case',
    locationType: 'remote',
    skills: ['Ownership', 'Communicating Delays', 'Conflict Resolution', 'Teamwork'],
    experience: 'Workplace Soft-Skills Drill (No experience needed)',
    description:
      'Simulate an urgent situation where a third-party auth service is failing 24 hours before a major product demo. Choose how to communicate the delay to your PM and propose solutions.',
    whyItMayFit:
      'Strengthens your behavioral interview answers for "Tell me about a time a project was delayed and how you handled it."',
    compensation: 'Practice Drill (Evidence Credited to Profile)',
    postedDate: '2026-10-05',
    action: {
      label: 'Start Leadership Simulation',
      type: 'start_simulation',
      routeTarget: 'work-ready',
    },
  },

  // --- CAREEROS CHALLENGES ---
  {
    id: 'opp-chal-wcag-audit',
    title: 'Public Sector Accessibility Remediator Sprint',
    organization: 'CareerOS Civic Practice Track',
    organizationVerified: false,
    nature: 'careeros_challenge',
    category: 'challenges',
    location: 'Async Portfolio Sprint',
    locationType: 'remote',
    skills: ['Accessibility (WCAG)', 'UI Audit', 'HTML & CSS', 'Clear Writing'],
    experience: 'All levels (Beginner friendly with rubric)',
    description:
      'Audit an open-source civic portal for keyboard trapping, color contrast deficiencies, and missing aria tags. Generate a 2-page executive summary remediation patch.',
    whyItMayFit:
      'Expands on your seed WCAG audit into a full GitHub repository submission recruiters love to review.',
    compensation: 'Open Challenge (Portfolio Certificate)',
    postedDate: '2026-10-01',
    action: {
      label: 'Start Challenge in Tasks',
      type: 'start_challenge',
      routeTarget: 'tasks',
    },
  },
  {
    id: 'opp-chal-perf-refactor',
    title: 'React Rendering & Lighthouse 95+ Performance Sprint',
    organization: 'CareerOS Performance Lab',
    organizationVerified: false,
    nature: 'careeros_challenge',
    category: 'challenges',
    location: 'Async Code Sandbox',
    locationType: 'remote',
    skills: ['React', 'TypeScript', 'Performance Optimization', 'Problem Solving'],
    experience: 'Intermediate Practice',
    description:
      'Take a sluggish e-commerce product catalog with unnecessary re-renders and unoptimized images and refactor it until Lighthouse hits 95+ score across mobile metrics.',
    whyItMayFit:
      'Adds a high-value performance bullet to your resume backed by before/after performance numbers.',
    compensation: 'Open Challenge (Verified Badge upon completion)',
    postedDate: '2026-09-28',
    action: {
      label: 'View Challenge Prompt',
      type: 'start_challenge',
      routeTarget: 'tasks',
    },
  },

  // --- COMMUNITY PROJECTS ---
  {
    id: 'opp-proj-freecodecamp',
    title: 'Curriculum Interactive Drill Contributor',
    organization: 'freeCodeCamp Open Source',
    organizationVerified: true,
    nature: 'community_project',
    category: 'projects',
    location: 'GitHub (Global Open Source)',
    locationType: 'remote',
    skills: ['HTML & CSS', 'JavaScript basics', 'Git', 'Clear Writing'],
    experience: 'First-time contributors welcome (Friendly maintainers)',
    description:
      'Help millions of learners by fixing test cases, polishing explanatory hints, and translating code explanations in freeCodeCamp’s monorepo.',
    whyItMayFit:
      'Provides public pull requests on a repository with 380k+ stars to cite in your GitHub README and resume.',
    compensation: 'Volunteer Open Source (Public GitHub Commits)',
    postedDate: '2026-10-03',
    action: {
      label: 'View Open Good First Issues',
      type: 'view_project',
      url: 'https://github.com/freeCodeCamp/freeCodeCamp/contribute',
    },
  },
  {
    id: 'opp-proj-public-lab',
    title: 'Civic Environmental Sensor Data Visualizer',
    organization: 'Public Lab Open Technology',
    organizationVerified: true,
    nature: 'community_project',
    category: 'projects',
    location: 'GitHub / GitLab Community',
    locationType: 'remote',
    skills: ['React', 'TypeScript', 'Data Visualization', 'Tailwind CSS'],
    experience: 'Student & early-career open source contributors',
    description:
      'Contribute charts and accessibility enhancements to grassroots environmental monitoring tools mapping air and water quality in community gardens.',
    whyItMayFit:
      'Proves you can integrate into existing team conventions and write maintainable frontend components for real users.',
    compensation: 'Civic Open Source Project',
    postedDate: '2026-09-27',
    action: {
      label: 'Explore Issues & Guidelines',
      type: 'view_project',
      url: 'https://publiclab.org',
    },
  },

  // --- COMPANY CHALLENGES ---
  {
    id: 'opp-comp-figma-plugin',
    title: 'Design-to-Code Tokens Sync Challenge',
    organization: 'Design Systems Community',
    organizationVerified: true,
    nature: 'company_challenge',
    category: 'challenges',
    location: 'Async Challenge',
    locationType: 'remote',
    skills: ['TypeScript', 'Design Systems', 'Figma', 'UI Audit'],
    experience: 'Open to all aspiring product & design engineers',
    description:
      'Build a lightweight Figma REST API script or plugin that exports design tokens directly into CSS custom properties and JSON schemas with zero layout shift.',
    whyItMayFit:
      'Showcases your dual interest in Design and Engineering. Highly relevant to Design Systems Engineer positions.',
    compensation: '$1,500 Community Prize Pool + Industry Spotlight',
    deadline: '2026-11-20',
    postedDate: '2026-10-02',
    action: {
      label: 'Review Challenge Brief',
      type: 'start_challenge',
      url: 'https://www.figma.com/community',
    },
  },

  // --- OTHER EARLY-CAREER OPPORTUNITIES ---
  {
    id: 'opp-other-rewriting-code',
    title: 'Early Career Tech Fellowship & Peer Mentorship',
    organization: 'Rewriting the Code',
    organizationVerified: true,
    nature: 'real_internship',
    category: 'other',
    location: 'Remote + Regional Hubs',
    locationType: 'remote',
    skills: ['Problem Solving', 'Teamwork', 'Clear Writing', 'Career Navigation'],
    experience: 'Undergraduates, graduate students, and career changers',
    description:
      'Year-round professional community offering exclusive recruiter mixers, technical interview workshops, executive fireside chats, and early internship access.',
    whyItMayFit:
      'Provides networking leverage and mentorship matching your current Level 1: Foundation Builder phase.',
    compensation: 'Free Fellowship & Travel Grants for Conferences',
    deadline: '2026-12-15',
    postedDate: '2026-10-04',
    action: {
      label: 'Join Fellowship Network',
      type: 'external_apply',
      url: 'https://rewritingthecode.org',
    },
  },
  {
    id: 'opp-other-mlh-fellowship',
    title: 'Open Source Software Engineering Fellow',
    organization: 'Major League Hacking (MLH)',
    organizationVerified: true,
    nature: 'real_internship',
    category: 'other',
    location: 'Remote (Worldwide)',
    locationType: 'remote',
    skills: ['Git', 'JavaScript basics', 'TypeScript', 'Problem Solving', 'Open Source'],
    experience: 'Students and early-career developers with code samples',
    description:
      '12-week remote internship alternative where you contribute directly to major open-source repositories used by millions. Guided by full-time professional mentors with weekly stipends.',
    whyItMayFit:
      'High alignment with your Git drills and interactive web tools. Real public commits elevate your GitHub portfolio above degree-only applicants.',
    compensation: '$5,000 Total Educational Stipend',
    deadline: '2026-11-28',
    postedDate: '2026-10-05',
    action: {
      label: 'Apply to MLH Fellowship',
      type: 'external_apply',
      url: 'https://fellowship.mlh.io',
    },
  },
  {
    id: 'opp-real-intern-wikimedia',
    title: 'Wikipedia Frontend Accessibility Intern',
    organization: 'Wikimedia Foundation',
    organizationVerified: true,
    nature: 'real_internship',
    category: 'internships',
    location: 'Remote (Global)',
    locationType: 'remote',
    skills: ['HTML & CSS', 'JavaScript basics', 'Accessibility (WCAG)', 'Clear Writing'],
    experience: 'Currently enrolled or recent graduate, self-taught welcome',
    description:
      'Contribute to the world’s largest open knowledge repository. Help refine the Vector 2022 skin, improve high-contrast reader experiences, and audit screen reader announcements.',
    whyItMayFit:
      'Your verified municipal portal WCAG contrast audit is an exact match for Wikipedia’s global accessibility mandate.',
    compensation: '$38 - $44 / hr ($6,000 / mo)',
    deadline: '2026-12-05',
    postedDate: '2026-10-06',
    action: {
      label: 'Apply on Wikimedia Careers',
      type: 'external_apply',
      url: 'https://wikimediafoundation.org/about/jobs',
    },
  },
  {
    id: 'opp-sim-incident-advisory',
    title: 'Production Incident Customer Advisory Simulation',
    organization: 'CareerOS Customer Comms Lab',
    organizationVerified: false,
    nature: 'practice_simulation',
    category: 'company_simulations',
    location: 'In-Browser Interactive Case',
    locationType: 'remote',
    skills: ['Customer Communication', 'Empathy', 'Clear Writing', 'Technical Translation'],
    experience: 'Practice Simulation (Safe learning sandbox)',
    description:
      'Simulate drafting a status-page advisory and customer response after a database latency spike causes degraded checkout performance. Learn how to explain root causes without technical obfuscation.',
    whyItMayFit:
      'Demonstrates the Emotional Intelligence and Professional Behavior employers look for in customer-facing and product engineering roles.',
    compensation: 'Practice Drill (Generates Verifiable Career Evidence)',
    postedDate: '2026-10-07',
    action: {
      label: 'Launch Customer Comms Sim',
      type: 'start_simulation',
      routeTarget: 'communication',
    },
  },
];

export const INITIAL_APPLICATIONS: ApplicationItem[] = [
  {
    id: 'app-seed-1',
    opportunityId: 'opp-real-intern-mozilla',
    company: 'Mozilla Foundation',
    role: 'Open Web Engineering Intern',
    title: 'Open Web Engineering Intern',
    organization: 'Mozilla Foundation',
    date: '2026-10-04',
    status: 'Interview',
    stage: 'Interview',
    nature: 'real_internship',
    category: 'internships',
    location: 'Remote (Americas / EMEA)',
    notes: 'Completed initial phone screen with engineering recruiter. Technical walkthrough scheduled for next Tuesday focusing on accessibility and web standards.',
    nextAction: 'Prepare STAR examples for accessibility audit and keyboard trap debugging.',
    evidenceCited: [
      'Audited 1 public municipal portal for WCAG 2.1 AA Color Contrast & Keyboard Rings',
      'Built interactive SaaS Tier Pricing Calculator with Currency & Billing Toggle',
    ],
    resumeVersion: 'Modern ATS - Web Standards Focus',
    followUpDate: '2026-10-14',
    lastUpdated: '2026-10-07',
  },
  {
    id: 'app-seed-2',
    opportunityId: 'opp-real-job-khan',
    company: 'Khan Academy',
    role: 'Associate Frontend Engineer',
    title: 'Associate Frontend Engineer',
    organization: 'Khan Academy',
    date: '2026-10-05',
    status: 'Assessment',
    stage: 'Assessment',
    nature: 'real_job',
    category: 'jobs',
    location: 'Remote (US & Canada)',
    notes: 'Received take-home technical challenge: React component performance audit and keyboard navigation implementation.',
    nextAction: 'Complete take-home challenge and record brief code walkthrough before Friday 5 PM.',
    evidenceCited: [
      'Built interactive SaaS Tier Pricing Calculator with Currency & Billing Toggle',
      'Audited 1 public municipal portal for WCAG 2.1 AA Color Contrast & Keyboard Rings',
    ],
    resumeVersion: 'Clean Professional - Frontend',
    followUpDate: '2026-10-12',
    lastUpdated: '2026-10-08',
  },
  {
    id: 'app-seed-3',
    opportunityId: 'opp-proj-freecodecamp',
    company: 'freeCodeCamp Open Source',
    role: 'Curriculum Interactive Drill Contributor',
    title: 'Curriculum Interactive Drill Contributor',
    organization: 'freeCodeCamp Open Source',
    date: '2026-10-06',
    status: 'Applied',
    stage: 'Applied',
    nature: 'community_project',
    category: 'projects',
    location: 'GitHub (Global Open Source)',
    notes: 'Submitted Pull Request #58129 addressing interactive hint clarification on flexbox order. Awaiting reviewer approval.',
    nextAction: 'Check PR comments and address requested test suite adjustments.',
    evidenceCited: [
      'Deconstructed 1 live junior job requirement into 3 verifiable 15-minute exercises',
    ],
    followUpDate: '2026-10-10',
    lastUpdated: '2026-10-06',
  },
  {
    id: 'app-seed-4',
    opportunityId: 'opp-real-job-gitlab',
    company: 'GitLab',
    role: 'Junior Developer Experience Engineer',
    title: 'Junior Developer Experience Engineer',
    organization: 'GitLab',
    date: '2026-10-07',
    status: 'Saved',
    stage: 'Saved',
    nature: 'real_job',
    category: 'jobs',
    location: 'Remote (Global)',
    notes: 'Bookmarked for submission this weekend. Need to polish portfolio case study and run AI Resume Clarity check first.',
    nextAction: 'Export ATS-friendly resume and submit application via official GitLab careers portal.',
    evidenceCited: [
      'Deconstructed 1 live junior job requirement into 3 verifiable 15-minute exercises',
    ],
    followUpDate: '2026-10-13',
    lastUpdated: '2026-10-07',
  },
  {
    id: 'app-seed-5',
    opportunityId: 'opp-apprentice-techtonica',
    company: 'Techtonica',
    role: 'Full-Stack Software Engineering Fellow',
    title: 'Full-Stack Software Engineering Fellow',
    organization: 'Techtonica',
    date: '2026-09-18',
    status: 'Offer',
    stage: 'Offer',
    nature: 'real_internship',
    category: 'apprenticeships',
    location: 'Remote (US)',
    notes: 'Received formal admission offer with living stipend sponsorship and dedicated mentor pairing!',
    nextAction: 'Review onboarding agreement and confirm hardware delivery preferences by Monday.',
    evidenceCited: [
      'Built interactive SaaS Tier Pricing Calculator with Currency & Billing Toggle',
    ],
    followUpDate: '2026-10-15',
    lastUpdated: '2026-10-05',
  },
  {
    id: 'app-seed-6',
    company: 'FinTech Startup Labs',
    role: 'Junior Full-Stack Engineer',
    title: 'Junior Full-Stack Engineer',
    organization: 'FinTech Startup Labs',
    date: '2026-09-10',
    status: 'Rejected',
    stage: 'Rejected',
    nature: 'real_job',
    category: 'jobs',
    location: 'Hybrid (New York)',
    notes: 'Hiring team reached capacity for this cycle. Encouraging note from engineering manager praising clean portfolio code and recommending re-applying in Q1.',
    nextAction: 'Log retrospective in CareerOS Evidence Vault and complete 2 advanced backend simulation drills.',
    evidenceCited: [
      'Built interactive SaaS Tier Pricing Calculator with Currency & Billing Toggle',
    ],
    lastUpdated: '2026-09-24',
  },
];

export function getOpportunities(userProfile?: UserProfile): Opportunity[] {
  const evidence = getEvidenceItems();
  const userSkills = userProfile?.skills || ['HTML & CSS', 'JavaScript basics', 'Problem Solving'];

  return INITIAL_OPPORTUNITIES.map((opp) => {
    // Dynamic matching calculation
    const matchedSkills = opp.skills.filter((skill) =>
      userSkills.some(
        (us) => us.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(us.toLowerCase())
      )
    );

    const relevantEvidence = evidence.filter((ev) =>
      ev.skillsPracticed.some((sp) =>
        opp.skills.some((os) => os.toLowerCase().includes(sp.toLowerCase()) || sp.toLowerCase().includes(os.toLowerCase()))
      )
    );

    const missingSkills = opp.skills.filter(
      (skill) =>
        !userSkills.some(
          (us) => us.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(us.toLowerCase())
        )
    );

    const matchScore = Math.min(
      98,
      Math.max(
        42,
        Math.round(
          (matchedSkills.length / Math.max(opp.skills.length, 1)) * 50 +
            Math.min(relevantEvidence.length * 15, 40) +
            (opp.nature === 'practice_simulation' ? 15 : 5)
        )
      )
    );

    const matchHighlights = [
      `${matchedSkills.length} of ${opp.skills.length} target skills verified in your profile`,
      `${relevantEvidence.length} verified Career Evidence item${relevantEvidence.length === 1 ? '' : 's'} can be cited directly`,
    ];

    if (opp.nature === 'practice_simulation') {
      matchHighlights.push('100% accessible now: Zero external screening barrier');
    }

    return {
      ...opp,
      matchScore,
      matchHighlights,
      missingSkills,
    };
  });
}

export function getApplications(): ApplicationItem[] {
  try {
    const raw = localStorage.getItem(APPLICATIONS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(INITIAL_APPLICATIONS));
      return INITIAL_APPLICATIONS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return INITIAL_APPLICATIONS;
    }
    return parsed;
  } catch {
    return INITIAL_APPLICATIONS;
  }
}

export function saveApplications(items: ApplicationItem[]): void {
  try {
    localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to save applications:', err);
  }
}

export function addApplication(item: Omit<ApplicationItem, 'id' | 'lastUpdated'>): ApplicationItem {
  const current = getApplications();
  const company = item.company || item.organization || 'Target Company';
  const role = item.role || item.title || 'Role';
  const status = item.status || item.stage || 'Saved';
  const date = item.date || new Date().toISOString().split('T')[0];
  const nextAction = item.nextAction || item.nextStep || 'Follow up on status';

  const newItem: ApplicationItem = {
    ...item,
    id: `app-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    company,
    role,
    title: role,
    organization: company,
    status,
    stage: status,
    date,
    nextAction,
    nextStep: nextAction,
    lastUpdated: new Date().toISOString().split('T')[0],
  };
  const updated = [newItem, ...current];
  saveApplications(updated);
  return newItem;
}

export function updateApplicationStage(id: string, stage: ApplicationStage): void {
  const current = getApplications();
  const updated = current.map((item) =>
    item.id === id
      ? {
          ...item,
          stage,
          status: stage,
          lastUpdated: new Date().toISOString().split('T')[0],
        }
      : item
  );
  saveApplications(updated);
}

export function updateApplication(id: string, patch: Partial<ApplicationItem>): void {
  const current = getApplications();
  const updated = current.map((item) =>
    item.id === id ? { ...item, ...patch, lastUpdated: new Date().toISOString().split('T')[0] } : item
  );
  saveApplications(updated);
}

export function deleteApplication(id: string): void {
  const current = getApplications();
  const updated = current.filter((item) => item.id !== id);
  saveApplications(updated);
}

export function isOpportunitySaved(opportunityId: string): boolean {
  const apps = getApplications();
  return apps.some((a) => a.opportunityId === opportunityId);
}
