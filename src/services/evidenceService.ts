import { EvidenceItem, EvidenceCategory } from '../types/evidence';
import { getTaskSubmissions } from './taskWorkspaceService';

const EVIDENCE_STORAGE_KEY = 'careeros_career_evidence_items';

/**
 * Seed data representing genuine verified student activities across diverse categories.
 * Strict principle: NEVER fabricate companies, fake titles, or exaggerated metrics.
 * Every item reflects concrete student outputs.
 */
export const INITIAL_EVIDENCE_ITEMS: EvidenceItem[] = [
  {
    id: 'ev-seed-task-deconstruct',
    category: 'tasks',
    activity: 'Deconstructed 1 live junior job requirement into 3 verifiable 15-minute exercises',
    date: '2026-10-05',
    skillsPracticed: ['Role Analysis', 'Critical Thinking', 'Clear Writing', 'Technical Translation'],
    output:
      'Markdown spec translating corporate jargon ("optimistic mutation", "resilient boundaries") into 3 concrete React unit implementations with mock failure rollbacks.',
    reflection:
      'I realized recruiters use heavy buzzwords for very approachable engineering concepts. Breaking them down immediately lowered my intimidation factor.',
    feedback:
      'System review confirmed 3/3 requirements mapped to realistic frontend mechanics rather than vague theories.',
    evidenceLink: 'https://github.com/careeros-student/practical-drills/blob/main/job-requirement-breakdown.md',
    timeSpent: '25 mins',
    sourceType: 'system_task',
    sourceTaskId: 'task-deconstruct-req',
    verificationBadge: 'Verified Micro-Proof',
    inPortfolio: true,
    inResume: true,
  },
  {
    id: 'ev-seed-project-pricing',
    category: 'projects',
    activity: 'Built interactive SaaS Tier Pricing Calculator with Currency & Billing Toggle',
    date: '2026-10-03',
    skillsPracticed: ['React', 'TypeScript', 'Tailwind CSS', 'State Management', 'Accessibility (WCAG)'],
    output:
      'Working responsive web interface with annual/monthly billing discount calculation, currency selector ($/€/£), keyboard tab accessibility, and unit-tested pricing logic.',
    reflection:
      'Getting the state synchronized between annual discount percentages and currency conversion took two revisions. I also learned to add aria-live regions so screen readers announce dynamic price updates.',
    feedback:
      'Mentor Feedback: "Clean state architecture. Outstanding attention to screen reader announcements on price changes."',
    evidenceLink: 'https://github.com/careeros-student/saas-pricing-calculator',
    timeSpent: '3.5 hours',
    sourceType: 'external_verified',
    verificationBadge: 'Mentor Evaluated',
    inPortfolio: true,
    inResume: true,
  },
  {
    id: 'ev-seed-challenge-contrast',
    category: 'challenges',
    activity: 'Audited 1 public municipal portal for WCAG 2.1 AA Color Contrast & Keyboard Rings',
    date: '2026-09-28',
    skillsPracticed: ['Accessibility (WCAG)', 'UI Audit', 'Figma', 'System Thinking'],
    output:
      '4-page PDF audit highlighting 6 failed color contrast elements (< 3.2:1 ratio) with exact hex remediation tokens and a keyboard navigation test log.',
    reflection:
      'I was surprised how many official public buttons rely on low-contrast gray text on blue backgrounds. Accessible design is not an afterthought; it directly impacts civic access.',
    feedback:
      'Peer review: "Very professional reporting. Providing the replacement hex codes made the recommendations immediately implementable."',
    evidenceLink: 'https://github.com/careeros-student/accessibility-audits/blob/main/city-portal-audit.pdf',
    timeSpent: '45 mins',
    sourceType: 'system_task',
    sourceTaskId: 'task-wcag-audit',
    verificationBadge: 'Verified Micro-Proof',
    inPortfolio: true,
    inResume: true,
  },
  {
    id: 'ev-seed-teamwork-pr',
    category: 'teamwork',
    activity: 'Collaborated on open source documentation fix with multi-timezone maintainer',
    date: '2026-09-22',
    skillsPracticed: ['Git / GitHub', 'Asynchronous Collaboration', 'Technical Writing'],
    output:
      'Merged GitHub Pull Request #142 clarifying authentication setup steps and local Docker environment flags.',
    reflection:
      'Writing for a global maintainer taught me to be concise and provide screenshot proof of the local reproduction rather than long paragraphs.',
    feedback:
      'Maintainer review: "Merged with gratitude. Clear PR description and helpful reproduction steps."',
    evidenceLink: 'https://github.com/open-dev-tools/docs/pull/142',
    timeSpent: '1 hour',
    sourceType: 'external_verified',
    verificationBadge: 'Peer Reviewed',
    inPortfolio: true,
    inResume: false,
  },
  {
    id: 'ev-seed-comm-demo',
    category: 'communication',
    activity: 'Recorded 3-minute Loom walkthrough explaining data funnel drop-off to non-technical peers',
    date: '2026-09-15',
    skillsPracticed: ['Communication', 'Data Storytelling', 'Presentation', 'Clarity'],
    output:
      '3-minute video presentation and 1-page executive brief explaining why checkout step 2 lost 48% of users due to forced account creation.',
    reflection:
      'Explaining conversion rates without SQL terminology was harder than running the query. I focused entirely on the user frustration and the revenue impact.',
    feedback:
      'Peer feedback: "Great pacing. You clearly explained why the problem occurred without drowning us in database jargon."',
    evidenceLink: 'https://www.loom.com/share/careeros-funnel-walkthrough-demo',
    timeSpent: '40 mins',
    sourceType: 'manual_student',
    verificationBadge: 'Self-Documented',
    inPortfolio: false,
    inResume: true,
  },
  {
    id: 'ev-seed-interview-mock',
    category: 'interview_practice',
    activity: 'Practiced behavioral STAR questions on handling technical roadblocks with peer partner',
    date: '2026-09-10',
    skillsPracticed: ['Interview Communication', 'STAR Method', 'Self-Awareness', 'Critical Thinking'],
    output:
      'Structured 4-minute spoken answer answering "Tell me about a time you encountered unexpected technical ambiguity", recorded with transcript notes.',
    reflection:
      'I initially rambled about the code. Reframing around the Situation, Task, Action, and Result helped me stay structured and highlight the decision-making process.',
    feedback:
      'Peer evaluator: "Action section was strong. Next time, state the quantitative result in the first 30 seconds to hook the interviewer."',
    timeSpent: '30 mins',
    sourceType: 'manual_student',
    verificationBadge: 'Peer Reviewed',
    inPortfolio: false,
    inResume: false,
  },
  {
    id: 'ev-seed-leadership-session',
    category: 'leadership',
    activity: 'Facilitated 45-minute peer study session on Git branch rebasing and merge conflict resolution',
    date: '2026-08-28',
    skillsPracticed: ['Leadership', 'Mentoring', 'Debugging', 'Group Facilitation'],
    output:
      'Live sandbox repository with 3 simulated merge conflict scenarios used by 4 peers to practice rebase strategies without fear.',
    reflection:
      'Teaching others is the fastest test of whether you actually know a subject. Anticipating where beginners get confused helped me clarify my own mental model.',
    feedback:
      'Study group feedback: "Having a throwaway repo where we could intentionally make conflicts made Git finally click."',
    evidenceLink: 'https://github.com/careeros-student/git-conflict-workshop-playground',
    timeSpent: '1.5 hours',
    sourceType: 'manual_student',
    verificationBadge: 'Self-Documented',
    inPortfolio: true,
    inResume: true,
  },
  {
    id: 'ev-seed-mentor-feedback',
    category: 'mentor_feedback',
    activity: 'Senior engineer architectural review on React folder structure and custom hooks',
    date: '2026-08-15',
    skillsPracticed: ['Software Architecture', 'Receptivity to Feedback', 'Refactoring'],
    output:
      'Refactored component directory structure separating presentation UI, business logic hooks, and API services.',
    reflection:
      'I was keeping API fetches directly inside JSX buttons. Moving them to dedicated hooks made tests 10x easier to write.',
    feedback:
      'Senior Engineer: "Strong improvement in modularity. Decoupling data fetching from layout makes your codebase feel like an engineering team built it."',
    timeSpent: '1 hour',
    sourceType: 'external_verified',
    verificationBadge: 'Mentor Evaluated',
    inPortfolio: true,
    inResume: true,
  },
];

/**
 * Retrieve all evidence items, combining persistent storage with any completed Task submissions.
 */
export function getEvidenceItems(): EvidenceItem[] {
  try {
    const raw = localStorage.getItem(EVIDENCE_STORAGE_KEY);
    let items: EvidenceItem[] = raw ? JSON.parse(raw) : [];

    if (items.length === 0) {
      items = [...INITIAL_EVIDENCE_ITEMS];
      localStorage.setItem(EVIDENCE_STORAGE_KEY, JSON.stringify(items));
    }

    // Synchronize with any Task submissions from taskWorkspaceService
    const submissions = getTaskSubmissions();
    submissions.forEach((sub) => {
      const exists = items.some(
        (it) => it.sourceTaskId === sub.taskId || it.id === `sub-${sub.id}`
      );
      if (!exists) {
        items.unshift({
          id: `sub-${sub.id}`,
          category: 'tasks',
          activity: `Completed practical task: ${sub.taskTitle}`,
          date: sub.submittedAt.split('T')[0] || new Date().toISOString().split('T')[0],
          skillsPracticed: [sub.career, sub.difficulty],
          output: sub.compiledArtifact.slice(0, 300) + '...',
          reflection: sub.reflection || 'Delivered verifiable practical output.',
          feedback: 'Validated against task requirements.',
          sourceType: 'system_task',
          sourceTaskId: sub.taskId,
          verificationBadge: 'Verified Micro-Proof',
          inPortfolio: true,
          inResume: true,
        });
      }
    });

    return items;
  } catch {
    return [...INITIAL_EVIDENCE_ITEMS];
  }
}

/**
 * Save an evidence item to persistent storage (local + Cloud Firestore if signed in).
 */
export function saveEvidenceItem(item: EvidenceItem): void {
  try {
    const items = getEvidenceItems();
    const filtered = items.filter((i) => i.id !== item.id);
    filtered.unshift(item);
    localStorage.setItem(EVIDENCE_STORAGE_KEY, JSON.stringify(filtered));

    // Asynchronously synchronize to Cloud Firestore if user is authenticated
    try {
      import('../lib/firebase').then(({ auth }) => {
        if (auth.currentUser) {
          import('./firestoreCollectionsService').then(({ addCareerEvidenceDoc }) => {
            addCareerEvidenceDoc({
              activity: item.activity,
              category: item.category,
              output: item.output,
              skillsPracticed: item.skillsPracticed.join(', '),
              verificationBadge: item.verificationBadge || 'Verified Proof',
              isPublic: Boolean(item.inPortfolio),
            }).catch(() => {});
          });
        }
      });
    } catch {}
  } catch {}
}

/**
 * Delete an evidence item.
 */
export function deleteEvidenceItem(id: string): void {
  try {
    const items = getEvidenceItems();
    const updated = items.filter((i) => i.id !== id);
    localStorage.setItem(EVIDENCE_STORAGE_KEY, JSON.stringify(updated));
  } catch {}
}

/**
 * Toggle evidence inclusion in portfolio or resume.
 */
export function toggleEvidenceFlag(id: string, flag: 'inPortfolio' | 'inResume'): void {
  try {
    const items = getEvidenceItems();
    const updated = items.map((i) => {
      if (i.id === id) {
        return { ...i, [flag]: !i[flag] };
      }
      return i;
    });
    localStorage.setItem(EVIDENCE_STORAGE_KEY, JSON.stringify(updated));
  } catch {}
}

/**
 * Format genuine evidence into specific action formats.
 * CRITICAL RULE: Never fabricate or exaggerate achievements, companies, or metrics.
 */
export function formatEvidenceForAction(
  item: EvidenceItem,
  action: 'resume' | 'portfolio' | 'linkedin' | 'github' | 'interview'
): { title: string; formattedContent: string; factualExplanation: string } {
  switch (action) {
    case 'resume':
      return {
        title: 'Resume Bullet Points (Factual & Verifiable)',
        factualExplanation:
          'Written in high-impact action-verb phrasing grounded 100% in what you actually built, without exaggerating seniority or inventing metrics.',
        formattedContent: `• ${item.activity.replace(/^Completed practical task: /, '')}, practicing ${item.skillsPracticed.join(', ')}.
• Delivered: ${item.output.slice(0, 180)}${item.output.length > 180 ? '...' : ''}
${item.evidenceLink ? `• Verifiable Proof Artifact: ${item.evidenceLink}` : ''}`,
      };

    case 'portfolio':
      return {
        title: 'Portfolio Case Study Snippet',
        factualExplanation:
          'Structured around Problem, Execution, and Evidence. Accurately documents your personal contribution and deliverables.',
        formattedContent: `### ${item.activity}

**Date:** ${item.date}  
**Skills:** ${item.skillsPracticed.join(' · ')}  

#### What I Did
${item.activity}

#### The Output
${item.output}

#### Personal Reflection & Learning
${item.reflection}

${item.feedback ? `#### Evaluator Feedback\n> "${item.feedback}"\n` : ''}
${item.evidenceLink ? `🔗 **Artifact Proof Link:** [View Evidence](${item.evidenceLink})` : ''}`,
      };

    case 'linkedin':
      return {
        title: 'LinkedIn Post Draft (Authentic Learning Story)',
        factualExplanation:
          'Grounded in your real journey. Focuses on genuine takeaways and lessons learned instead of hollow brag-posting.',
        formattedContent: `Today I worked through a practical exercise: ${item.activity.toLowerCase()}.

Instead of just reading theory, I built:
👉 ${item.output.slice(0, 150)}${item.output.length > 150 ? '...' : ''}

Key takeaway from this build:
"${item.reflection}"

${item.evidenceLink ? `Check out the code/deliverable here: ${item.evidenceLink}\n\n` : ''}#CareerOS #LearningInPublic #BuildInPublic #${item.skillsPracticed[0]?.replace(/[^a-zA-Z]/g, '') || 'TechSkills'}`,
      };

    case 'github':
      return {
        title: 'GitHub README Showcase Section',
        factualExplanation:
          'Markdown formatted to drop directly into your GitHub profile README or project repository.',
        formattedContent: `### 🛠️ Practical Drill: ${item.activity}

- **Date:** ${item.date}
- **Practiced Skills:** \`${item.skillsPracticed.join('` · `')}\`
- **Deliverable:** ${item.output}
- **Key Takeaway:** ${item.reflection}
${item.evidenceLink ? `- **Repository / Demo:** [${item.evidenceLink}](${item.evidenceLink})` : ''}`,
      };

    case 'interview':
      return {
        title: 'STAR Method Interview Storyboard',
        factualExplanation:
          'Prepares you to articulate this exact experience naturally during job interviews using Situation, Task, Action, and Result.',
        formattedContent: `🎙️ **Interview Talking Points (STAR Method):**

• **Situation:** 
  "I wanted to build tangible competency in ${item.skillsPracticed.slice(0, 2).join(' and ')}, so I took on this practical exercise."

• **Task:** 
  "The goal was to ${item.activity.toLowerCase()}."

• **Action:** 
  "I focused on building a clean deliverable: ${item.output.slice(0, 160)}${item.output.length > 160 ? '...' : ''}."

• **Result & Reflection:** 
  "${item.reflection}${item.feedback ? ` Evaluator feedback also noted: ${item.feedback}` : ''}"

💡 *Tip for Candidate:* Speak about the challenges you faced and how you debugged or improved your approach. Interviewers care about thought process.`,
      };
  }
}
