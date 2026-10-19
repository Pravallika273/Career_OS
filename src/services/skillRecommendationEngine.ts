import {
  SkillToActionInput,
  SkillRecommendationsResult,
  CareerDirectionMatch,
  PracticalTaskRec,
  SmallProjectRec,
  SkillBuildingActivityRec,
} from '../types/skillToAction';

/**
 * Skill-to-Action Synthesis Engine
 * Designed with an extensible schema contract so generative AI can easily
 * replace or augment this logic for novel, interdisciplinary domains.
 */
export function generateSkillRecommendations(input: SkillToActionInput): SkillRecommendationsResult {
  const { skills, interests, careerDirection, experienceLevel, availableTime, isUnknownSkillsMode } = input;

  // Handle "I don't know what my skills are yet" mode
  if (isUnknownSkillsMode || skills.length === 0) {
    return generateBeginnerDiscoveryRecommendations(input);
  }

  const hasTech = skills.some((s) =>
    ['HTML & CSS', 'JavaScript / TypeScript', 'Python Basics', 'SQL & Databases', 'React / Frontend Frameworks'].includes(s)
  );
  const hasDesign = skills.some((s) =>
    ['Figma & UI Wireframing', 'Visual Hierarchy & Typography', 'Prototyping & User Flows', 'Design Thinking'].includes(s)
  );
  const hasWriting = skills.some((s) =>
    ['Concise Written Communication', 'Explaining Technical Concepts Simply', 'Copywriting & Content Design'].includes(s)
  );
  const hasResearch = skills.some((s) =>
    ['User Interviews & Surveys', 'Synthesizing Qualitative Data', 'Fact-Checking & Source Audit', 'Market & Competitor Analysis'].includes(s)
  );
  const hasBusiness = skills.some((s) =>
    ['Product Prioritization', 'Customer Empathy & Discovery', 'Project Planning & Scoping'].includes(s)
  );

  // 1. Possible Career Directions
  const possibleDirections: CareerDirectionMatch[] = [];

  if (hasTech && hasDesign) {
    possibleDirections.push({
      id: 'dir-design-eng',
      title: 'Design Engineer / UI Technologist',
      category: 'Tech & Design Hybrid',
      matchScore: 94,
      whyThisFitsYou: `You bridge both visual design (${skills.filter((s) => s.includes('Figma') || s.includes('Visual')).join(', ') || 'UI'}) and coding implementation (${skills.filter((s) => s.includes('HTML') || s.includes('JavaScript') || s.includes('React')).join(', ') || 'code'}). Teams desperately value engineers who actually care about UX ergonomics.`,
      matchedSkills: skills.filter((s) => ['HTML & CSS', 'JavaScript / TypeScript', 'React / Frontend Frameworks', 'Figma & UI Wireframing', 'Prototyping & User Flows'].includes(s)),
      growthSkills: ['Design System Tokens', 'Web Animation & Transitions'],
    });
  }

  if (hasTech && hasWriting) {
    possibleDirections.push({
      id: 'dir-dev-rel',
      title: 'Developer Advocate & Technical Writer',
      category: 'Tech & Communications',
      matchScore: 91,
      whyThisFitsYou: `You combine coding ability with clear human communication. Most software documentation is dry or confusing; someone who understands code and explains it simply can build tremendous career leverage.`,
      matchedSkills: skills.filter((s) => ['Concise Written Communication', 'Explaining Technical Concepts Simply', 'Git & Version Control', 'REST APIs & Web Services'].includes(s)),
      growthSkills: ['Interactive Code Demos', 'Open Source Community Building'],
    });
  }

  if (hasDesign && hasResearch) {
    possibleDirections.push({
      id: 'dir-product-design',
      title: 'Product & UX Researcher',
      category: 'Design & Human Behavior',
      matchScore: 89,
      whyThisFitsYou: `You pair visual prototyping with investigative research. You won't just make pretty screens; you will validate whether real humans can actually complete tasks without friction.`,
      matchedSkills: skills.filter((s) => ['User Interviews & Surveys', 'Synthesizing Qualitative Data', 'Figma & UI Wireframing'].includes(s)),
      growthSkills: ['Usability Metric Benchmarks', 'Cognitive Accessibility'],
    });
  }

  if (hasBusiness || (hasResearch && !hasTech)) {
    possibleDirections.push({
      id: 'dir-product-analyst',
      title: 'Associate Product / Operations Analyst',
      category: 'Business & Strategy',
      matchScore: 86,
      whyThisFitsYou: `Your combination of qualitative empathy and analytical prioritization matches early-stage product teams looking to solve user churn.`,
      matchedSkills: skills.filter((s) => ['Product Prioritization', 'Customer Empathy & Discovery', 'Market & Competitor Analysis'].includes(s)),
      growthSkills: ['SQL Cohort Analysis', 'Metrics Funnel Mapping'],
    });
  }

  // Fallback direction ensuring every combination gets grounded options
  if (possibleDirections.length === 0) {
    possibleDirections.push({
      id: 'dir-general-builder',
      title: `${careerDirection || 'Digital Solutions'} Specialist`,
      category: 'Cross-Disciplinary',
      matchScore: 82,
      whyThisFitsYou: `Based on your selection of ${skills.slice(0, 3).join(', ')}, you possess a versatile foundation that allows you to contribute immediately to cross-functional teams without pigeonholing yourself.`,
      matchedSkills: skills.slice(0, 3),
      growthSkills: ['1 End-to-End Capstone', 'Public Evidence Curation'],
    });
  }

  // 2. Practical Tasks (Immediate ~20-30 min wins)
  const practicalTasks: PracticalTaskRec[] = [
    {
      id: 'task-deconstruct',
      title: 'Deconstruct 1 Real Job Requirement into Verifiable Skills',
      timeEstimate: '20 mins',
      difficulty: 'Beginner',
      whyThisFitsYou: `Because you have ${skills[0] || 'emerging skills'}, grounding your learning in an actual job posting prevents wasted study time and focuses your ${availableTime} on verified market demand.`,
      skillsUsed: [skills[0] || 'Technical Analysis', 'Critical Thinking'],
      deliverable: 'A 1-page breakdown mapping 3 job requirements to tangible exercises.',
      steps: [
        'Find 1 job description for your desired role on LinkedIn or Wellfound.',
        'Select 3 bullet points that sound intimidating or abstract.',
        'Translate each bullet into a concrete 15-minute action you can practice.',
      ],
    },
    {
      id: 'task-doc-audit',
      title: 'Write a 3-Sentence Problem-Solution-Proof Note',
      timeEstimate: '25 mins',
      difficulty: 'Beginner',
      whyThisFitsYou: `You know how to use ${skills[1] || 'your core tools'}; explaining the "Why" and "Outcome" is the exact proof hiring managers look for in early-career candidates.`,
      skillsUsed: ['Concise Writing', 'Technical Reflection'],
      deliverable: 'A polished 3-sentence project impact note ready for GitHub README or portfolio.',
      steps: [
        'Sentence 1: What was broken or missing before you started?',
        'Sentence 2: What did you build or analyze using your skills?',
        'Sentence 3: What was the measurable or verifiable result?',
      ],
    },
    {
      id: 'task-accessibility-audit',
      title: 'Audit 1 Public Website for Color Contrast & Keyboard Focus',
      timeEstimate: '25 mins',
      difficulty: 'Beginner',
      whyThisFitsYou: `This combines user empathy with tangible inspection. It yields instant, verifiable proof for your portfolio that sets you apart from 90% of beginners.`,
      skillsUsed: ['Accessibility (WCAG)', 'Attention to Detail'],
      deliverable: 'A 3-bullet accessibility audit with before/after contrast ratio values.',
      steps: [
        'Open any local community or university website.',
        'Use the WebAIM Contrast Checker to test body text contrast against the background.',
        'Tab through the navigation without a mouse to test focus rings.',
      ],
    },
  ];

  // 3. Small Projects (1-2 week builds for Evidence Vault)
  const smallProjects: SmallProjectRec[] = [
    {
      id: 'proj-proof-portfolio',
      title: 'Zero-Fluff Evidence Showcase',
      timeCommitment: '6–8 hours across 2 weeks',
      difficulty: 'Beginner to Intermediate',
      whyThisFitsYou: `Tailored to your rhythm of ${availableTime}. Instead of building a generic tutorial clone, this project showcases your actual verified task artifacts and problem-solving process.`,
      problemStatement: 'Most early-career resumes look identical with generic buzzwords and no proof of actual capability.',
      concreteDeliverables: [
        'Responsive single-page web portfolio built with clean layout',
        '3 case-study cards detailing problem, decision trade-offs, and outcomes',
        'GitHub repository with clear semantic commit history and README',
      ],
      evidenceProofOutcome: 'A public URL you can drop directly on job applications and LinkedIn.',
      milestones: [
        { step: 'Milestone 1', output: 'Wireframe content hierarchy & draft project blurbs (2 hrs)' },
        { step: 'Milestone 2', output: 'Implement component architecture & responsive styles (3 hrs)' },
        { step: 'Milestone 3', output: 'Deploy to Vercel/Cloud and record a 60-second walkthrough (2 hrs)' },
      ],
    },
    {
      id: 'proj-data-explorer',
      title: 'Domain Trend & Taxonomy Analyzer',
      timeCommitment: '4–6 hours',
      difficulty: 'Beginner',
      whyThisFitsYou: `Leverages your interest in ${interests[0] || 'technology'} and skills in ${skills.slice(0, 2).join(' & ')} to produce an analytical asset cited in interviews.`,
      problemStatement: 'Students struggle to understand how salaries, skills, and titles change across different industry sectors.',
      concreteDeliverables: [
        'Clean data summary of 50 open entry-level job postings in your track',
        'Top 5 most frequent technical and communication requirements isolated',
        'Interactive or visual markdown report published as an open resource',
      ],
      evidenceProofOutcome: 'A documented research memo demonstrating market awareness and analytical discipline.',
      milestones: [
        { step: 'Milestone 1', output: 'Collect sample postings into a structured spreadsheet (2 hrs)' },
        { step: 'Milestone 2', output: 'Isolate frequency patterns and requirement clusters (2 hrs)' },
        { step: 'Milestone 3', output: 'Publish findings as a shareable LinkedIn/Dev.to article (1 hr)' },
      ],
    },
  ];

  // 4. Skill-Building Activities ("What Should I Learn Next?")
  const skillBuildingActivities: SkillBuildingActivityRec[] = [
    {
      id: 'skill-next-git',
      skillName: 'Semantic Git & Pull Request Reviews',
      category: 'Collaboration',
      priority: 'High leverage',
      whyThisFitsYou: `Since you already have ${skills[0] || 'core foundation'}, knowing how to open professional PRs and write atomic commit messages immediately signals you are ready for real engineering teams.`,
      recommendedStartingAction: 'Contribute a typo or contrast fix to any active open source repository.',
      timeToAcquire: '3 hours',
    },
    {
      id: 'skill-next-tradeoffs',
      skillName: 'Articulating Technical Trade-offs',
      category: 'Communication',
      priority: 'High leverage',
      whyThisFitsYou: `In interviews, answering "Why did you choose tool X over tool Y?" matters far more than memorizing syntax. This elevates your answers from beginner to thoughtful practitioner.`,
      recommendedStartingAction: 'Write down 2 pros and 2 cons for every library you use in your next project.',
      timeToAcquire: '2 hours',
    },
    {
      id: 'skill-next-testing',
      skillName: 'Defensive Error Handling & Edge Cases',
      category: 'Technical',
      priority: 'Recommended',
      whyThisFitsYou: `Building interfaces or logic that handles network timeouts gracefully will make your projects feel like senior-grade software rather than fragile school assignments.`,
      recommendedStartingAction: 'Add a deliberate network delay and retry button to an existing API call.',
      timeToAcquire: '4 hours',
    },
  ];

  return {
    headlineSummary: `You have ${skills.length} confirmed skill anchors. Based on ${availableTime} available time, here is how you turn those skills into verified proof.`,
    possibleDirections,
    practicalTasks,
    smallProjects,
    skillBuildingActivities,
  };
}

function generateBeginnerDiscoveryRecommendations(input: SkillToActionInput): SkillRecommendationsResult {
  return {
    headlineSummary: `Starting from zero is a great place to begin. Here are 3 low-pressure discovery actions designed to uncover your natural aptitudes without intimidation.`,
    possibleDirections: [
      {
        id: 'dir-curiosity-explorer',
        title: 'Technology & Design Generalist',
        category: 'Discovery Track',
        matchScore: 88,
        whyThisFitsYou: `You don't need prior skills to begin. Early-career exploration is about testing small 15-minute tasks across design, code, and writing to see what feels energizing.`,
        matchedSkills: ['Natural Curiosity', 'Beginner Fresh Perspective'],
        growthSkills: ['First 15-min HTML Task', 'First Figma Wireframe'],
      },
      {
        id: 'dir-content-ops',
        title: 'Digital Operations & Community Builder',
        category: 'Human Skills Track',
        matchScore: 84,
        whyThisFitsYou: `Most early-career work relies heavily on organization, reliability, and human communication. These are real, high-demand skills you can practice immediately.`,
        matchedSkills: ['Resourcefulness', 'Organization'],
        growthSkills: ['Documentation Writing', 'Process Mapping'],
      },
    ],
    practicalTasks: [
      {
        id: 'task-beginner-audit',
        title: 'The 15-Minute Curiosity & Aptitude Audit',
        timeEstimate: '15 mins',
        difficulty: 'Absolute Beginner',
        whyThisFitsYou: `You don't need to guess what career fits you. This audit uncovers the work patterns you naturally gravitate toward in everyday life.`,
        skillsUsed: ['Self-Reflection', 'Honest Inventory'],
        deliverable: 'A list of your top 2 work patterns (e.g. Visual vs Analytical vs Communication).',
        steps: [
          'Recall the last time you lost track of time doing something useful.',
          'Identify whether you were organizing information, creating visuals, or solving a logic puzzle.',
          'Map that pattern to 2 corresponding CareerOS tracks.',
        ],
      },
      {
        id: 'task-beginner-html',
        title: 'Edit 1 Line of Code in Browser DevTools',
        timeEstimate: '10 mins',
        difficulty: 'Absolute Beginner',
        whyThisFitsYou: `Demystifies coding instantly. You will see that web pages are just plain text with styling instructions, not magic.`,
        skillsUsed: ['Browser DevTools', 'Curiosity'],
        deliverable: 'A modified website headline screenshot in your local browser.',
        steps: [
          'Right click on any news or social media headline.',
          'Select "Inspect" to open Browser DevTools.',
          'Double click the text in the HTML tree and change it to your name.',
        ],
      },
    ],
    smallProjects: [
      {
        id: 'proj-first-win',
        title: 'Curiosity Learning Log & Proof Journal',
        timeCommitment: '2 hours over 1 week',
        difficulty: 'Absolute Beginner',
        whyThisFitsYou: `Documenting what you learn as an absolute beginner creates an authentic journey log that demonstrates curiosity, humility, and fast growth.`,
        problemStatement: 'Beginners feel they have nothing to show because they haven’t built complex systems yet.',
        concreteDeliverables: [
          'A public GitHub markdown repo or Notion document titled "My 30-Day Learning Log"',
          'Daily 2-sentence reflections on 1 new concept discovered',
          'Links to 3 small tutorials or tools explored',
        ],
        evidenceProofOutcome: 'Proof of consistency and self-directed learning instinct.',
        milestones: [
          { step: 'Day 1', output: 'Set up markdown document & state learning goal (30 mins)' },
          { step: 'Day 3', output: 'Log reflections on 2 exploration tasks (30 mins)' },
          { step: 'Day 7', output: 'Publish weekly synthesis summary (30 mins)' },
        ],
      },
    ],
    skillBuildingActivities: [
      {
        id: 'skill-next-first-tool',
        skillName: 'Basic Git & GitHub Workflow',
        category: 'Foundation',
        priority: 'High leverage',
        whyThisFitsYou: `GitHub is the universal home for modern work proof. Setting up a profile is your first step to building tangible career evidence.`,
        recommendedStartingAction: 'Create a free GitHub account and create your first markdown repository.',
        timeToAcquire: '1 hour',
      },
      {
        id: 'skill-next-curiosity',
        skillName: 'Asking Great Technical Questions',
        category: 'Communication',
        priority: 'High leverage',
        whyThisFitsYou: `Knowing how to explain what you tried before asking for help is the #1 trait senior mentors love about beginners.`,
        recommendedStartingAction: 'Draft a 3-part question: What I tried, What happened, What I expected.',
        timeToAcquire: '30 mins',
      },
    ],
  };
}
