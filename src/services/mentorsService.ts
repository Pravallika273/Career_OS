import {
  MentorCategory,
  MentorArchetype,
  MentorProfile,
  MentorQuestionRecord,
  GuidanceRequestRecord,
} from '../types/mentors';

const SAVED_MENTORS_KEY = 'careeros_saved_mentors';
const MENTOR_QUESTIONS_KEY = 'careeros_mentor_questions';
const GUIDANCE_REQUESTS_KEY = 'careeros_guidance_requests';

export const MENTOR_CATEGORIES_CONFIG: {
  id: MentorCategory;
  label: string;
  description: string;
}[] = [
  {
    id: 'career_guidance',
    label: 'Career Guidance',
    description: 'First job roadmap, switching into tech, managing early career transitions.',
  },
  {
    id: 'technical_skills',
    label: 'Technical Skills',
    description: 'Frontend architectures, TypeScript, state management, testing, and debugging.',
  },
  {
    id: 'communication',
    label: 'Communication',
    description: 'PR reviews, asynchronous updates, communicating delays, cross-team collaboration.',
  },
  {
    id: 'interview_prep',
    label: 'Interview Preparation',
    description: 'Technical walkthroughs, STAR behavioral framing, whiteboarding, and mock prep.',
  },
  {
    id: 'portfolio_review',
    label: 'Portfolio Review',
    description: 'Case study audits, README improvements, demo polish, and proof of work.',
  },
  {
    id: 'industry_knowledge',
    label: 'Industry Knowledge',
    description: 'SaaS metrics, fintech regulations, open-source ecosystems, healthtech standards.',
  },
  {
    id: 'leadership',
    label: 'Leadership',
    description: 'Taking ownership, managing junior teammates, initiative without supervision.',
  },
  {
    id: 'other',
    label: 'Other',
    description: 'Work-life balance, remote work habits, overcoming imposter syndrome, negotiation.',
  },
];

export const ARCHETYPE_CONFIG: Record<
  MentorArchetype,
  { label: string; description: string; badgeClass: string }
> = {
  alumni: {
    label: 'CareerOS Alumni',
    description: 'Navigated the transition from zero proof to employed engineer.',
    badgeClass: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  },
  young_professional: {
    label: 'Young Professional',
    description: '1–3 years experience; remembers what breaking in feels like.',
    badgeClass: 'text-sky-700 bg-sky-50 border-sky-200',
  },
  experienced_professional: {
    label: 'Experienced Professional',
    description: '5+ years experience; senior engineers, tech leads, engineering managers.',
    badgeClass: 'text-indigo-700 bg-indigo-50 border-indigo-200',
  },
  founder: {
    label: 'Founder & Builder',
    description: 'Built software products from zero to one and hired early talent.',
    badgeClass: 'text-amber-700 bg-amber-50 border-amber-200',
  },
  industry_specialist: {
    label: 'Industry Specialist',
    description: 'Domain experts in accessibility, developer tooling, or cloud systems.',
    badgeClass: 'text-purple-700 bg-purple-50 border-purple-200',
  },
};

export const MOCK_MENTORS: MentorProfile[] = [
  {
    id: 'mentor-elena-rodriguez',
    name: 'Elena Rodriguez',
    role: 'Frontend Engineer (Design Systems)',
    industry: 'Enterprise SaaS & Design Tooling',
    experience: '4 years',
    categories: ['technical_skills', 'portfolio_review', 'career_guidance'],
    topics: [
      'Accessible Component Libraries (WCAG)',
      'Design Tokens & Tailwind CSS',
      'Refining Case Studies for Design Engineers',
    ],
    availability: 'Async Q&A: reply within 24h · 1 portfolio teardown/week',
    shortIntroduction:
      'I transitioned into frontend engineering 4 years ago after teaching myself web accessibility. I love looking at practical code samples, helping you explain trade-offs without overcomplicating things, and showing you how to turn small components into undeniable proof.',
    archetype: 'young_professional',
    avatarBg: 'bg-indigo-600',
    initials: 'ER',
    location: 'Remote · Pacific Time',
    preferredFormat: 'async',
    sampleQuestions: [
      'How do I structure my component library case study so hiring managers actually notice the accessibility decisions?',
      'What should I say when an interviewer asks why I picked Tailwind instead of standard CSS modules?',
      'How do you handle disagreements with designers on responsive constraints?',
    ],
    highlights: ['Specializes in Design Systems', 'Accessible UI Advocate', 'Active Mentorship Contributor'],
  },
  {
    id: 'mentor-marcus-vance',
    name: 'Marcus Vance',
    role: 'Staff Software Engineer',
    industry: 'Fintech & Cloud Infrastructure',
    experience: '9 years',
    categories: ['technical_skills', 'interview_prep', 'leadership', 'industry_knowledge'],
    topics: [
      'System Architecture & State Flow',
      'Technical Drill & Whiteboard Explanations',
      'Ownership & Communicating Technical Delays',
    ],
    availability: 'Async Q&A: within 48h · Monthly group AMA',
    shortIntroduction:
      'Over the past 9 years, I have interviewed over 150 candidates. The biggest differentiator is never trivia—it is how clearly you explain why your code is structured the way it is, and whether you take accountability when things break. Happy to help you sharpen your technical story.',
    archetype: 'experienced_professional',
    avatarBg: 'bg-slate-700',
    initials: 'MV',
    location: 'New York, NY',
    preferredFormat: 'written_review',
    sampleQuestions: [
      'How do I explain a bug I caused in an interview without sounding negligent?',
      'What do senior engineers look for in an entry-level candidate’s GitHub repository?',
      'How do I demonstrate technical ownership when I was only working on a simulation or individual project?',
    ],
    highlights: ['150+ Technical Interviews Conducted', 'Fintech Architecture', 'Senior Reviewer'],
  },
  {
    id: 'mentor-priya-nair',
    name: 'Priya Nair',
    role: 'Software Engineer (CareerOS Cohort 2024)',
    industry: 'EdTech & Consumer Web',
    experience: '2 years',
    categories: ['career_guidance', 'interview_prep', 'communication'],
    topics: [
      'First Job Onboarding Survival',
      'STAR Method for Non-Traditional Backgrounds',
      'Overcoming Imposter Syndrome as a Junior',
    ],
    availability: 'Async Q&A: reply within 24h · Open for coffee chats',
    shortIntroduction:
      'I completed my transition into tech just two years ago through project-driven evidence. I remember exactly what it feels like to stare at a job description that asks for 3 years of experience when you have 0. Ask me anything about building confidence and landing that first role.',
    archetype: 'alumni',
    avatarBg: 'bg-emerald-600',
    initials: 'PN',
    location: 'Austin, TX',
    preferredFormat: 'chat',
    sampleQuestions: [
      'How did you format your resume when you had zero prior tech employer names?',
      'What should I do during the first 30 days on the job to make sure I do not fall behind?',
      'How do I ask senior teammates for help without feeling like a burden?',
    ],
    highlights: ['CareerOS Program Alumni', 'Junior Onboarding Specialist', 'First-Time Job Seeker Champion'],
  },
  {
    id: 'mentor-tariq-al-mansoor',
    name: 'Tariq Al-Mansoor',
    role: 'Founder & CTO',
    industry: 'B2B Software & AI Developer Tools',
    experience: '7 years',
    categories: ['leadership', 'portfolio_review', 'industry_knowledge', 'career_guidance'],
    topics: [
      'Building with Scrappy Resourcefulness',
      'What Founders Actually Look for in Early Hires',
      'Autonomous Problem-Solving & Shipping',
    ],
    availability: 'Async Q&A: reply within 36h',
    shortIntroduction:
      'As a startup founder, I hire for velocity, curiosity, and whether someone can pick up an ambiguous problem, break it into three steps, and communicate when they are stuck. If you want candid feedback on whether your projects demonstrate true execution capability, ask away.',
    archetype: 'founder',
    avatarBg: 'bg-amber-600',
    initials: 'TA',
    location: 'San Francisco, CA',
    preferredFormat: 'async',
    sampleQuestions: [
      'What kind of project catches an early-stage startup founder’s eye?',
      'How do I prove I can work without constant supervision?',
      'Should I focus on depth in one framework or breadth across the stack for startup roles?',
    ],
    highlights: ['Bootstrapped 2 SaaS Tools', 'Seed-Stage Hiring Lead', 'Product-Minded Engineer'],
  },
  {
    id: 'mentor-chloe-dupont',
    name: 'Chloe Dupont',
    role: 'Lead Accessibility (a11y) & Standards Specialist',
    industry: 'Public Sector & Civic Tech',
    experience: '6 years',
    categories: ['technical_skills', 'portfolio_review', 'other'],
    topics: [
      'WCAG 2.1 / 2.2 AA Auditing & Compliance',
      'Screen Reader Testing (VoiceOver, NVDA)',
      'Inclusive Design as an Employment Differentiator',
    ],
    availability: 'Async Q&A: reply within 24h · 2 project audits/month',
    shortIntroduction:
      'Web accessibility is often the single most underrated superpower for early-career developers. Very few applicants understand how screen readers navigate a DOM tree. If you want your projects to stand out with ironclad accessibility credentials, I would love to mentor you.',
    archetype: 'industry_specialist',
    avatarBg: 'bg-purple-600',
    initials: 'CD',
    location: 'Montreal · Eastern Time',
    preferredFormat: 'written_review',
    sampleQuestions: [
      'How do I properly test keyboard navigation and document it in my project README?',
      'What are the most common a11y mistakes you see in junior developer portfolios?',
      'Can you review my modal dialog implementation for focus trapping?',
    ],
    highlights: ['IAAP Certified Accessibility Specialist', 'Civic Tech Contributor', 'Standards Author'],
  },
  {
    id: 'mentor-daniel-okafor',
    name: 'Daniel Okafor',
    role: 'Senior Engineering Manager',
    industry: 'HealthTech & Distributed Systems',
    experience: '11 years',
    categories: ['communication', 'leadership', 'interview_prep', 'career_guidance'],
    topics: [
      'Managing Disagreements in Engineering Teams',
      'Writing Clear Incident Reports & Status Briefs',
      'Behavioral Interviewing: Showing True Empathy',
    ],
    availability: 'Async Q&A: within 48h · 1 mock behavioral session/week',
    shortIntroduction:
      'I manage engineering teams across four timezones. The engineers who get promoted fastest are the ones who write clearly, de-escalate tensions during outages, and show empathy to both teammates and end-users. I enjoy helping early engineers master workplace emotional intelligence.',
    archetype: 'experienced_professional',
    avatarBg: 'bg-teal-700',
    initials: 'DO',
    location: 'London, UK · GMT',
    preferredFormat: 'chat',
    sampleQuestions: [
      'How should I respond when a senior reviewer leaves harsh comments on my pull request?',
      'What is the best way to flag to my manager that a project deadline is unrealistic?',
      'How do I demonstrate emotional intelligence in an HR behavioral screen?',
    ],
    highlights: ['Manages 18 Engineers', 'Workplace EQ Advocate', 'Former Tech Lead'],
  },
  {
    id: 'mentor-maya-chen',
    name: 'Maya Chen',
    role: 'Full-Stack Developer (CareerOS Cohort 2023)',
    industry: 'E-commerce & Web Platforms',
    experience: '3 years',
    categories: ['technical_skills', 'portfolio_review', 'communication'],
    topics: [
      'Explaining REST vs GraphQL Trade-offs',
      'Refining GitHub READMEs for Recruiter Skimming',
      'Building Collaborative Git PR Workflows',
    ],
    availability: 'Async Q&A: reply within 24h',
    shortIntroduction:
      'I was working in retail management before breaking into software engineering through CareerOS proof exercises. I know how intimidating technical jargon can be at first. My goal is to make mentorship approachable, friendly, and practical.',
    archetype: 'alumni',
    avatarBg: 'bg-rose-600',
    initials: 'MC',
    location: 'Seattle, WA',
    preferredFormat: 'async',
    sampleQuestions: [
      'How should I organize my GitHub repository README so it explains what I built in 30 seconds?',
      'How do I practice explaining my code out loud without freezing up?',
      'What is a healthy daily learning routine when applying to jobs full-time?',
    ],
    highlights: ['CareerOS Program Alumni', 'Former Career Changer', 'Open Source Contributor'],
  },
  {
    id: 'mentor-samuel-wright',
    name: 'Samuel Wright',
    role: 'Security & Auth Specialist',
    industry: 'Cybersecurity & Identity Infrastructure',
    experience: '5 years',
    categories: ['technical_skills', 'industry_knowledge', 'other'],
    topics: [
      'OAuth2 & JWT Implementation Best Practices',
      'Preventing OWASP Top 10 Vulnerabilities',
      'Clean Credential Handling in Client Applications',
    ],
    availability: 'Async Q&A: within 48h',
    shortIntroduction:
      'Security isn’t just for dedicated security teams—it starts with writing safe client code and understanding how authentication flows work. If you are building projects with user auth or API integrations, let’s make sure they are bulletproof.',
    archetype: 'industry_specialist',
    avatarBg: 'bg-blue-700',
    initials: 'SW',
    location: 'Chicago, IL',
    preferredFormat: 'written_review',
    sampleQuestions: [
      'What are the red flags hiring managers look for in how a portfolio app handles API tokens?',
      'How can I demonstrate basic security hygiene in a frontend project?',
      'What should I say in an interview if asked how I secure sensitive client state?',
    ],
    highlights: ['Security Researcher', 'Identity Architect', 'OWASP Contributor'],
  },
];

// LocalStorage helpers
export const getSavedMentorIds = (): string[] => {
  try {
    const raw = localStorage.getItem(SAVED_MENTORS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

export const toggleSaveMentor = (mentorId: string): boolean => {
  const current = getSavedMentorIds();
  const exists = current.includes(mentorId);
  const updated = exists ? current.filter((id) => id !== mentorId) : [...current, mentorId];
  try {
    localStorage.setItem(SAVED_MENTORS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save mentor id', e);
  }
  return !exists;
};

export const getMentorQuestions = (): MentorQuestionRecord[] => {
  try {
    const raw = localStorage.getItem(MENTOR_QUESTIONS_KEY);
    if (!raw) {
      // Seed with one initial welcoming Q&A sample to demonstrate functionality
      const initial: MentorQuestionRecord[] = [
        {
          id: 'q-sample-1',
          mentorId: 'mentor-priya-nair',
          mentorName: 'Priya Nair',
          mentorRole: 'Software Engineer (CareerOS Cohort 2024)',
          question:
            'How did you structure your resume when you had zero prior tech employer names?',
          relatedEvidenceActivity: 'Built SaaS Tier Pricing Calculator with Currency & Billing Toggle',
          askedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          status: 'answered',
          answer:
            'Great question! When I didn’t have a traditional tech employer on my resume, I led with a dedicated "Verified Projects & Evidence" section right beneath my summary. For each project, I wrote 2 concise bullet points focusing on concrete outcomes: what problem it solved, the exact tech stack, and what accessibility or performance testing I completed. Hiring managers care far more about whether you can produce working software with good practices than whether you had a previous tech title. Keep linking to your live deployments and clean GitHub repositories!',
          keyTakeaway:
            'Lead with verified project evidence over job titles, emphasize concrete outcomes, and link to clean code.',
        },
      ];
      localStorage.setItem(MENTOR_QUESTIONS_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

export const getGuidanceRequests = (): GuidanceRequestRecord[] => {
  try {
    const raw = localStorage.getItem(GUIDANCE_REQUESTS_KEY);
    if (!raw) {
      const initial: GuidanceRequestRecord[] = [
        {
          id: 'gr-sample-1',
          mentorId: 'mentor-elena-rodriguez',
          mentorName: 'Elena Rodriguez',
          mentorRole: 'Frontend Engineer (Design Systems)',
          category: 'portfolio_review',
          goal: 'Case Study Polish & Accessibility Teardown',
          message:
            'Hi Elena! I recently finished my municipal portal WCAG 2.1 AA audit project. Could you provide a quick async review of how I documented my color contrast tokens and focus trapping in my README?',
          preferredFormat: 'Async Written Review',
          status: 'scheduled',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          meetingDate: 'Async response queued (expected within 24h)',
        },
      ];
      localStorage.setItem(GUIDANCE_REQUESTS_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

// Generates an empathetic, high-quality simulated mentor response tailored to the mentor profile
export const generateMentorResponse = (
  mentor: MentorProfile,
  question: string,
  relatedEvidence?: string
): { answer: string; keyTakeaway: string } => {
  const lowerQ = question.toLowerCase();

  let answer = '';
  let takeaway = '';

  if (lowerQ.includes('resume') || lowerQ.includes('experience') || lowerQ.includes('gap')) {
    answer = `Hi there! Thanks for reaching out with this question. Regarding "${question.trim()}"—in my experience at ${mentor.industry}, interviewers appreciate transparency paired with momentum. Instead of apologizing for a gap or lack of formal years, anchor your conversation in what you built recently${relatedEvidence ? ` (such as your work on ${relatedEvidence})` : ''}. Walk through the architectural decisions you made, how you resolved unexpected roadblocks, and what you learned. That shifts the focus immediately from your past credentials to your present execution ability.`;
    takeaway =
      'Reframe gaps by demonstrating recent momentum and walking through concrete problem-solving trade-offs.';
  } else if (
    lowerQ.includes('feedback') ||
    lowerQ.includes('pr') ||
    lowerQ.includes('disagreement') ||
    lowerQ.includes('review')
  ) {
    answer = `That is one of the most important situations you will encounter on an engineering team. When handling code reviews or disagreements, separate your ego from the code. I always recommend asking clarifying questions before defending an implementation: "Thanks for pointing that out—could you share what edge case you see with this approach so I can benchmark the alternative?" That turns potential friction into a collaborative discussion.`;
    takeaway =
      'Separate ego from code, ask clarifying questions first, and treat feedback as team calibration.';
  } else if (
    lowerQ.includes('interview') ||
    lowerQ.includes('talk') ||
    lowerQ.includes('explain') ||
    lowerQ.includes('freeze')
  ) {
    answer = `I hear this from almost every early-career engineer! In technical interviews, silence feels agonizing to you, but to the interviewer, thoughtful pauses are normal. When asked a tough question, take 5 seconds to summarize your understanding out loud: "To make sure I have all the constraints, we want to handle dynamic updates while preserving accessibility." This gives your brain time to structure your thoughts using the STAR framework without rushing into an incomplete answer.`;
    takeaway =
      'Restate constraints out loud to buy thinking time and keep your interview explanation structured.';
  } else if (
    lowerQ.includes('accessibility') ||
    lowerQ.includes('a11y') ||
    lowerQ.includes('wcag') ||
    lowerQ.includes('css')
  ) {
    answer = `Terrific focus area! Hiring managers love seeing candidates who treat accessibility as a foundational requirement rather than a compliance checklist. When explaining your accessible work, highlight semantic HTML first, then keyboard navigation focus states, and finally screen reader announcements with ARIA landmarks. That shows you understand the progression from basics to advanced edge cases.`;
    takeaway =
      'Show accessibility depth by progressing from semantic markup to keyboard focus rings and screen reader testing.';
  } else {
    answer = `Thanks for asking this! As someone working in ${mentor.industry} with ${mentor.experience} of experience, here is how I view it: The strongest engineers aren't the ones who know every API by heart—they are the ones who break complex ambiguity into three small, verifiable milestones and communicate early when assumptions change. Keep your questions specific, document what you tried before asking for help, and ground your rationale in user experience or performance.`;
    takeaway =
      'Break ambiguous problems into three small milestones, test your assumptions, and communicate early.';
  }

  return { answer, keyTakeaway: takeaway };
};

export const submitQuestionToMentor = (
  mentor: MentorProfile,
  question: string,
  relatedEvidenceActivity?: string
): MentorQuestionRecord => {
  const { answer, keyTakeaway } = generateMentorResponse(mentor, question, relatedEvidenceActivity);

  const newRecord: MentorQuestionRecord = {
    id: `q-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    mentorId: mentor.id,
    mentorName: mentor.name,
    mentorRole: mentor.role,
    question,
    relatedEvidenceActivity,
    askedAt: new Date().toISOString(),
    status: 'answered',
    answer,
    keyTakeaway,
  };

  const current = getMentorQuestions();
  const updated = [newRecord, ...current];
  try {
    localStorage.setItem(MENTOR_QUESTIONS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save mentor question', e);
  }
  return newRecord;
};

export const submitQuestionToMentorAsync = async (
  mentor: MentorProfile,
  question: string,
  relatedEvidenceActivity?: string
): Promise<MentorQuestionRecord> => {
  try {
    const { CareerOSAIService } = await import('./careerOSAIService');
    const res = await CareerOSAIService.generate({
      capability: 'workplace_scenario_coaching',
      userPrompt: `You are answering as mentor ${mentor.name} (${mentor.role} in ${mentor.industry}, ${mentor.experience} experience).
Topics: ${mentor.topics.join(', ')}.
Student question: "${question}".
Linked evidence: "${relatedEvidenceActivity || 'None'}".
Answer warmly and concisely (max 2 short paragraphs), and conclude with 1 sentence Key Takeaway:`,
      detailLevel: 'concise',
    });

    if (res.text && res.text.trim()) {
      const parts = res.text.split(/Key Takeaway:?/i);
      const answer = parts[0].trim();
      const keyTakeaway = parts[1]
        ? parts[1].trim()
        : 'Focus on verifiable momentum and concrete problem-solving.';

      const newRecord: MentorQuestionRecord = {
        id: `q-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        mentorId: mentor.id,
        mentorName: mentor.name,
        mentorRole: mentor.role,
        question,
        relatedEvidenceActivity,
        askedAt: new Date().toISOString(),
        status: 'answered',
        answer,
        keyTakeaway,
      };

      const current = getMentorQuestions();
      const updated = [newRecord, ...current];
      try {
        localStorage.setItem(MENTOR_QUESTIONS_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save mentor question', e);
      }
      return newRecord;
    }
  } catch {}

  return submitQuestionToMentor(mentor, question, relatedEvidenceActivity);
};

export const submitGuidanceRequest = (
  mentor: MentorProfile,
  category: MentorCategory,
  goal: string,
  message: string,
  preferredFormat: string
): GuidanceRequestRecord => {
  const newRequest: GuidanceRequestRecord = {
    id: `gr-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    mentorId: mentor.id,
    mentorName: mentor.name,
    mentorRole: mentor.role,
    category,
    goal,
    message,
    preferredFormat,
    status: 'scheduled',
    createdAt: new Date().toISOString(),
    meetingDate:
      preferredFormat.includes('Chat')
        ? 'Tentative: Next Tuesday at 4:00 PM EST'
        : 'Async response confirmed (within 24–48 hours)',
  };

  const current = getGuidanceRequests();
  const updated = [newRequest, ...current];
  try {
    localStorage.setItem(GUIDANCE_REQUESTS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save guidance request', e);
  }
  return newRequest;
};
