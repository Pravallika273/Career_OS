import { CommunicationActivity, CommunicationCategory } from '../types/communication';

export const COMMUNICATION_CATEGORIES_CONFIG: Array<{
  id: CommunicationCategory;
  label: string;
  description: string;
  badgeColor: 'indigo' | 'mint' | 'coral' | 'neutral';
}> = [
  {
    id: 'professional_emails',
    label: 'Professional Emails',
    description: 'Clear, concise emails for requests, follow-ups, and formal communication.',
    badgeColor: 'indigo',
  },
  {
    id: 'asking_questions',
    label: 'Asking Questions',
    description: 'Unblocking yourself respectfully without wasting team members’ time.',
    badgeColor: 'coral',
  },
  {
    id: 'giving_updates',
    label: 'Giving Updates',
    description: 'Async standup briefs, project status checks, and milestone progress notes.',
    badgeColor: 'mint',
  },
  {
    id: 'explaining_technical_work',
    label: 'Explaining Technical Work',
    description: 'Translating complex architectural or analytical logic to non-technical stakeholders.',
    badgeColor: 'indigo',
  },
  {
    id: 'presentations',
    label: 'Presentations',
    description: 'Demo presentations, slide walkthroughs, and project showcase pitches.',
    badgeColor: 'neutral',
  },
  {
    id: 'meetings',
    label: 'Meetings',
    description: 'Meeting agendas, framing talking points, speaking up constructively, and meeting minutes.',
    badgeColor: 'indigo',
  },
  {
    id: 'customer_communication',
    label: 'Customer Communication',
    description: 'Empathetic responses, handling bug reports, and clarifying product constraints.',
    badgeColor: 'coral',
  },
  {
    id: 'manager_communication',
    label: 'Manager Communication',
    description: 'Raising roadblocks early, 1-on-1 alignment, and requesting guidance or feedback.',
    badgeColor: 'mint',
  },
  {
    id: 'written_communication',
    label: 'Written Communication',
    description: 'Design docs, incident postmortems, readmes, and async team notes.',
    badgeColor: 'neutral',
  },
  {
    id: 'spoken_communication',
    label: 'Spoken Communication',
    description: 'Verbal summaries, audio notes, and concise 60-second spoken walkthroughs.',
    badgeColor: 'mint',
  },
  {
    id: 'professional_messaging',
    label: 'Professional Messaging',
    description: 'Slack/Teams etiquette, direct messages that respect attention, and channel thread etiquette.',
    badgeColor: 'indigo',
  },
];

export const COMMUNICATION_ACTIVITIES: CommunicationActivity[] = [
  // 1. PROFESSIONAL EMAILS
  {
    id: 'comm-email-timeline-adjustment',
    title: 'Request a Realistic Scope Adjustment Without Panic',
    category: 'professional_emails',
    medium: 'written',
    estimatedTime: '15 mins',
    difficulty: 'Starter',
    summary:
      'Draft a professional email to your project lead when unexpected technical complexity threatens a deadline.',
    whyItMatters:
      'Early-career professionals often wait until the deadline has passed to speak up. Proactive, solution-oriented timeline adjustments build immense trust with managers.',
    skillsPracticed: ['Professional Tone', 'Proactive Communication', 'Solutions-Oriented Framing', 'Respectful Boundaries'],
    example: {
      scenarioContext:
        'A frontend developer discovered that the third-party payment API documentation lacked necessary webhooks, requiring 2 additional days to build fallback polling.',
      goodExample: `Subject: Update on Checkout Integration & Timeline Adjustment Proposal

Hi Sarah,

Quick update on the checkout payment integration. 

While testing sandbox transactions this morning, I discovered the payment provider’s API does not support automatic webhooks for failed cards. To ensure customer payments don’t fail silently, we need to implement fallback polling.

This adds roughly 2 days of engineering work. To maintain high code quality, here are two options:
1. Shift the public launch by 2 days to Thursday, October 16.
2. Launch on Tuesday as scheduled with single-tier card support, adding the fallback flow in a fast-follow release on Thursday.

I recommend Option 1 to avoid transaction drop-offs. Let me know your preference or if you’d like to discuss in tomorrow's standup.

Best,
Alex`,
      goodExplanation:
        'Notice: Subject line is searchable and clear. Identifies the issue immediately without emotional panic. Quantifies the impact (2 days). Provides 2 distinct options with a clear personal recommendation.',
      suboptimalExample: `Subject: Help / deadline issue
Hey, so the payment API is broken and it’s really confusing. I don’t think I can finish by Tuesday because of their bad documentation. Sorry! What should I do?`,
      suboptimalExplanation:
        'Places the burden entirely back onto the manager without proposing options, relies on emotional venting ("their bad documentation"), and lacks clarity on time needed.',
      keyPrinciples: [
        'State the headline in the first two sentences.',
        'Never bring a problem without bringing at least two proposed options.',
        'Quantify timeline impact in days or hours rather than vague terms.',
      ],
    },
    prompt: {
      context:
        'You were assigned to deliver a customer feedback dashboard by Friday. However, you discovered that the customer database export has duplicate rows that must be cleaned first. It will take 1 full extra day.',
      yourRole: 'Junior Analyst / Developer',
      audience: 'Product Manager (Marcus)',
      goal: 'Inform Marcus about the duplicate data issue, state the 1-day delay clearly, and propose 2 clear paths forward.',
      constraintsOrContext: [
        'Do not blame the data engineering team.',
        'Propose an option to deliver a preliminary partial dashboard vs a complete cleaned dashboard.',
        'Keep the tone calm, professional, and respectful.',
      ],
      suggestedStarter: 'Subject: Timeline update on Customer Feedback Dashboard\n\nHi Marcus,\n\nI am writing to share a brief update on the feedback dashboard scheduled for Friday...',
      checklistBeforeSubmit: [
        'Clear subject line indicating project and topic',
        'Direct explanation of the data duplication roadblock',
        'Specific 1-day time estimate',
        'At least two viable options with your recommendation',
        'Professional closing and call to action',
      ],
    },
  },

  // 2. ASKING QUESTIONS
  {
    id: 'comm-ask-unblock-respectful',
    title: 'Ask a Senior Colleague for Help After Being Stuck for 45 Mins',
    category: 'asking_questions',
    medium: 'professional_messaging',
    estimatedTime: '12 mins',
    difficulty: 'Starter',
    summary:
      'Craft a Slack or Teams message asking a senior teammate for assistance without being helpless or interrupting their flow.',
    whyItMatters:
      'Saying just "Hi, can you help me?" forces colleagues to pull context out of you. High-performing juniors explain what they wanted, what they already tried, and where they are stuck.',
    skillsPracticed: ['Respect for Colleague Time', 'Synthesizing Technical Blockers', 'Asynchronous Clarity'],
    example: {
      scenarioContext:
        'A junior engineer is stuck on a Docker container build error after spending 45 minutes trying Google and reading error logs.',
      goodExample: `Hey Elena, when you have a 5-minute break between tasks, could I get your guidance on the local Docker build?

• Goal: Spin up the auth service locally.
• The Error: \`EACCES: permission denied, mkdir '/app/cache'\`
• What I’ve tried so far:
  1. Ran \`docker-compose down -v\` to clear stale volumes.
  2. Verified directory write permissions in my local terminal (\`chmod 755\`).
  3. Checked our internal wiki onboarding guide step 4.
• My question: Do we need a local \`.env\` override for container user permissions on macOS?

No rush at all—happy to read async or sync whenever convenient. Thank you!`,
      goodExplanation:
        'Respects Elena’s focus. States the exact error verbatim. Lists 3 specific things already attempted (proving initiative). Asks a precise, targeted question that Elena can answer in 30 seconds.',
      suboptimalExample: `Hey Elena, are you free? My Docker is totally broken and giving me errors. Can you jump on a call and look?`,
      suboptimalExplanation:
        'No context provided, obligates an immediate live call, doesn’t state the error or what was tried.',
      keyPrinciples: [
        'State what you are trying to accomplish.',
        'List 2–3 things you have already tried.',
        'Include the exact error or screenshot link.',
        'Give them an async out ("no rush / whenever you have a breather").',
      ],
    },
    prompt: {
      context:
        'You are trying to query the test user database using SQL, but your queries keep timing out after 30 seconds. You checked your syntax and tested on a smaller 10-row table which worked.',
      yourRole: 'Data Analyst / Associate Engineer',
      audience: 'Senior Data Engineer (Priya)',
      goal: 'Send Priya a message describing the timeout, what you already tested, and asking whether there is an indexed test table you should query instead.',
      constraintsOrContext: [
        'Keep under 150 words.',
        'Bullet point what you tried so far.',
        'Acknowledge her busy schedule.',
      ],
      suggestedStarter: 'Hi Priya, whenever you have a few minutes, could I ask a quick question regarding the test analytics database?...',
      checklistBeforeSubmit: [
        'Specific goal stated upfront',
        'Clear error or symptom (30s timeout)',
        'Evidence that syntax was checked and small table worked',
        'Targeted question about table indexing or alternatives',
      ],
    },
  },

  // 3. GIVING UPDATES
  {
    id: 'comm-update-async-standup',
    title: 'Write a Crisp 3-Bullet Async Standup Update',
    category: 'giving_updates',
    medium: 'written',
    estimatedTime: '10 mins',
    difficulty: 'Starter',
    summary:
      'Structure an asynchronous daily standup update that clearly communicates progress, today’s focus, and genuine blockers.',
    whyItMatters:
      'Remote and hybrid teams rely on daily async updates. Concise standups prevent unnecessary meetings and make your velocity visible.',
    skillsPracticed: ['Brevity', 'Accountability', 'Clear Prioritization'],
    example: {
      scenarioContext: 'Daily Slack standup in a product development team channel.',
      goodExample: `**Daily Update — Wed Oct 8**

✅ **Yesterday:**
• Finished mobile responsive styles for User Profile tab (#PR-89).
• Verified keyboard focus order on all modal dialogs.

🎯 **Today:**
• Wiring up avatar image upload with client-side file compression.
• Reviewing Ken’s pull request on the notifications drawer.

⚠️ **Blockers / Needs:**
• Waiting on Figma spec for empty states in the activity feed (pinged Maya yesterday; will follow up if unblocked by noon).`,
      goodExplanation:
        'Structured in the industry-standard 3 parts (Yesterday, Today, Blockers). Hyperlinks or ticket numbers included. Blockers note proactive ownership.',
      suboptimalExample: `Yesterday did some styling stuff. Today probably going to work on uploads. Nothing blocked.`,
      suboptimalExplanation:
        'Vague, provides no team accountability, doesn’t name specific PRs or tickets.',
      keyPrinciples: [
        'Use bullet points and bold headers for instant readability.',
        'Name concrete deliverables rather than vague activities.',
        'If blocked, state who you contacted and when you will follow up.',
      ],
    },
    prompt: {
      context:
        'You worked on testing the search filter yesterday and found 1 edge-case bug. Today you plan to fix that bug and write 2 automated tests. You need the lead to approve your staging environment PR before merging.',
      yourRole: 'Software Engineer',
      audience: 'Team Slack Channel (#engineering-standup)',
      goal: 'Write your 3-bullet standup (Yesterday, Today, Blockers/Review Requests).',
      constraintsOrContext: [
        'Keep concise and readable in under 20 seconds.',
        'Explicitly request the staging PR review with gentle politeness.',
      ],
      suggestedStarter: '**Daily Standup — [Date]**\n\n✅ **Yesterday:**\n• ...',
      checklistBeforeSubmit: [
        'Completed tasks from yesterday clearly listed',
        'Specific focus for today named',
        'PR review request noted with context',
      ],
    },
  },

  // 4. EXPLAINING TECHNICAL WORK
  {
    id: 'comm-tech-nontech-stakeholder',
    title: 'Explain a Database Migration / Technical Refactor to Marketing',
    category: 'explaining_technical_work',
    medium: 'written',
    estimatedTime: '18 mins',
    difficulty: 'Intermediate',
    summary:
      'Explain to a marketing or business stakeholder why your team needs 3 days to refactor database schema without using confusing jargon.',
    whyItMatters:
      'Engineers who cannot communicate the business value of technical debt get frustrated when leadership denies refactoring requests. Translating technical risk into business impact earns organizational respect.',
    skillsPracticed: ['Technical Translation', 'Business Empathy', 'Analogy Usage', 'Persuasion'],
    example: {
      scenarioContext:
        'Explaining why the engineering team is spending 3 days cleaning up database customer records before launching a campaign.',
      goodExample: `Hi Jordan,

Following up on our campaign launch timeline!

To ensure our email campaign sends the right promotion to the right customer, our team is spending Wednesday through Friday restructuring our customer profile database.

Think of our current database like an overstuffed physical filing cabinet where some folders have three copies of the same receipt. If we launched the 50,000-person campaign right now, about 8% of customers would receive duplicate emails or incorrect discount codes.

By taking 3 days to consolidate these records now:
1. Every customer will receive exactly one tailored email code.
2. Our landing page will load 40% faster under heavy traffic.
3. We avoid customer support tickets on launch day.

We will be ready to test send with your team first thing Monday morning. Let me know if you have any questions!`,
      goodExplanation:
        'Uses an intuitive filing cabinet analogy. Connects technical debt directly to customer experience (avoiding duplicate emails and support tickets). Sets clear next milestones.',
      suboptimalExample: `We have to normalize the 3NF relational Postgres schema and re-index the foreign keys because the latency is O(N) right now. So campaign has to wait.`,
      suboptimalExplanation:
        'Alienates the stakeholder with computer science acronyms that mean nothing to marketing.',
      keyPrinciples: [
        'Replace acronyms with real customer or business outcomes.',
        'Use one simple physical analogy if the concept is abstract.',
        'Explain what happens if we do it vs what happens if we don’t.',
      ],
    },
    prompt: {
      context:
        'Your team needs 2 days to implement image compression and lazy loading. The sales team wants to know why you aren’t building the new pricing slider right now.',
      yourRole: 'Frontend Developer',
      audience: 'Head of Sales (David)',
      goal: 'Write an email explaining to David why optimizing image loading directly increases sales conversions on mobile devices before adding new sliders.',
      constraintsOrContext: [
        'Avoid jargon like WebP, DOMContentLoaded, or byte-streaming.',
        'Focus on mobile buyer drop-off and conversion rates.',
        'Reassure him the pricing slider will start immediately next.',
      ],
      suggestedStarter: 'Hi David,\n\nThanks for checking in on the pricing slider timeline! Before we build the new slider, our team is taking 2 days to optimize page loading speeds...',
      checklistBeforeSubmit: [
        'Respectful opening acknowledging his priority',
        'Plain-language explanation of why slow images hurt sales',
        'Direct connection to mobile customer behavior',
        'Clear timeline for when the pricing slider will begin',
      ],
    },
  },

  // 5. PRESENTATIONS
  {
    id: 'comm-pres-demo-walkthrough',
    title: 'Frame a 3-Minute Demo Walkthrough for a Sprint Showcase',
    category: 'presentations',
    medium: 'spoken_communication',
    estimatedTime: '20 mins',
    difficulty: 'Intermediate',
    summary:
      'Structure the spoken script and talking points for a 3-minute live product demo to the entire company.',
    whyItMatters:
      'Demos often fail because presenters jump straight into code lines or menus without telling the human story of who this helps.',
    skillsPracticed: ['Spoken Structure', 'Story Arc', 'Executive Summarization', 'Engagement'],
    example: {
      scenarioContext: 'Presenting a newly built password reset self-service flow during all-hands demo day.',
      goodExample: `**[Slide / Screen 1: The Problem — 30 seconds]**
"Last month, our customer support team spent 35 hours manually resetting passwords for locked-out accounts. That meant frustrated users waiting 4 hours just to log back in.

**[Slide / Screen 2: The Solution & Live Action — 90 seconds]**
"Today, I’m excited to show you our new Instant Magic Link Self-Reset. Watch what happens when a user types their email here... Within 3 seconds, a verified secure link arrives. The user clicks once, sets a new password with immediate strength validation, and is back inside their account. Zero support tickets required.

**[Slide / Screen 3: Impact & Next Steps — 60 seconds]**
"In early testing with 100 beta users, 94% successfully reset their account in under 45 seconds. Huge shoutout to Maya on design and Kevin on security for partnering on this. We go live to 100% of users tomorrow morning. Happy to take questions!"`,
      goodExplanation:
        'Follows the classic 3-beat presentation arc: Pain Point -> Live Delightful Solution -> Verifiable Impact & Gratitude.',
      suboptimalExample: `So yeah, I worked on the password reset. Here is the form. Here is the button. You click it. It sends an email. Any questions?`,
      suboptimalExplanation:
        'Boring, mechanical, forgets why the feature was built, doesn’t give credit to teammates.',
      keyPrinciples: [
        'Start with the human problem, not the UI buttons.',
        'Show, don’t just tell: describe the user feeling.',
        'State the concrete metric or feedback result.',
        'Acknowledge cross-functional partners.',
      ],
    },
    prompt: {
      context:
        'You built a filter that lets users sort job listings by "Entry Level / Zero Experience Required". You are presenting this in the company sprint demo.',
      yourRole: 'Associate Product Engineer',
      audience: 'Company All-Hands (Design, Product, Operations, Leadership)',
      goal: 'Write the 3-minute spoken presentation script in 3 clear sections: Problem, Live Demo Action, Business Impact.',
      constraintsOrContext: [
        'Write as spoken script text with stage directions (e.g. "[Show search bar]").',
        'Highlight how this reduces student job search anxiety.',
        'Keep spoken pacing natural and energetic.',
      ],
      suggestedStarter: '[Intro — 30s]\n"Every week, thousands of early-career candidates tell us the hardest part of job hunting is finding roles that don’t require 3 years of secret experience..."',
      checklistBeforeSubmit: [
        'Hook addressing candidate anxiety in the first 30 seconds',
        'Clear narrative of the live screen actions',
        'Positive metric or user reaction included',
        'Clear closing with gratitude',
      ],
    },
  },

  // 6. MEETINGS
  {
    id: 'comm-meeting-speaking-up',
    title: 'Voice a Constructive Counter-Perspective in a Team Meeting',
    category: 'meetings',
    medium: 'spoken_communication',
    estimatedTime: '15 mins',
    difficulty: 'Intermediate',
    summary:
      'Frame a spoken contribution in a team meeting when you see a flaw in a proposed plan, without sounding defensive or argumentative.',
    whyItMatters:
      'Speaking up when leadership proposes an idea requires tactical tact. Affirming the shared goal before pointing out the operational risk shows immense maturity.',
    skillsPracticed: ['Meeting Contribution', 'Psychological Safety', 'Constructive Disagreement', 'Diplomacy'],
    example: {
      scenarioContext:
        'In a planning meeting, the lead proposes removing all email notifications to reduce server costs.',
      goodExample: `"I completely agree with the goal of reducing server costs—that makes total sense for this quarter. 

My only concern with turning off all email notifications immediately is that our daily active users rely on the weekly digest to remember to log in. In last month’s user interviews, 40% said the email was their primary trigger.

What if instead of cutting all emails, we combined them into a single consolidated weekly digest? That would cut 80% of our email server load while keeping the engagement hook intact. What do folks think?"`,
      goodExplanation:
        'Starts by validating the leader’s objective (reducing costs). Points to objective user interview data rather than personal opinion. Offers a collaborative compromise.',
      suboptimalExample: `"That’s a terrible idea. If we turn off emails our users will stop coming back. We shouldn't do that."`,
      suboptimalExplanation:
        'Directly attacks the idea, sounds hostile, and offers no alternative solution.',
      keyPrinciples: [
        'Agree with the high-level intent first ("I love that we’re targeting X").',
        'Introduce the risk using objective facts or user observations.',
        'Propose a middle ground or ask an open question to invite discussion.',
      ],
    },
    prompt: {
      context:
        'In a sprint retro, a teammate suggests requiring 3 peer approvals before any code can be merged to avoid bugs. You realize this will slow down team velocity significantly.',
      yourRole: 'Team Member',
      audience: 'Engineering Team & Engineering Manager',
      goal: 'Write the exact words you would speak out loud in the meeting to raise the velocity concern constructively and propose a better alternative (like automated test CI checks).',
      constraintsOrContext: [
        'Validate the desire for zero bugs.',
        'Point out the bottleneck risk politely.',
        'Suggest automated CI checks as the primary defense.',
      ],
      suggestedStarter: '"I really appreciate the focus on reducing bugs—having production breaks last sprint was stressful for all of us. One thing I want to consider about requiring 3 manual approvals..."',
      checklistBeforeSubmit: [
        'Validates the teammate’s good intention',
        'Raises the velocity bottleneck respectfully',
        'Proposes automated testing or a 1-reviewer + CI standard',
        'Invites the team into open dialogue',
      ],
    },
  },

  // 7. CUSTOMER COMMUNICATION
  {
    id: 'comm-customer-bug-empathy',
    title: 'Respond to an Angry Customer Regarding a Data Sync Glitch',
    category: 'customer_communication',
    medium: 'written',
    estimatedTime: '15 mins',
    difficulty: 'Starter',
    summary:
      'Write a customer support or community response to a user whose saved work temporarily disappeared due to a cloud cache glitch.',
    whyItMatters:
      'Defensive replies destroy customer loyalty. Validating customer frustration and explaining the exact resolution transparently turns angry users into brand champions.',
    skillsPracticed: ['Customer Empathy', 'De-escalation', 'Transparent Communication', 'Brand Trust'],
    example: {
      scenarioContext:
        'A user posted an angry message: "Your app just deleted 2 hours of my project notes!! This is totally unacceptable, fix it or I am canceling my subscription!"',
      goodExample: `Hi Brandon,

I am so sorry to hear this happened. Losing 2 hours of project notes is incredibly stressful, especially when you are working on a deadline.

I checked your account immediately: your notes were NOT permanently deleted. They were temporarily hidden due to a browser cache sync delay on our server. I have manually re-synced your workspace, and all 4 pages of your notes are safely restored. You can see them right now by refreshing your browser.

To ensure this never happens to you or anyone else again, our team deployed an automatic offline backup guard that saves a local copy every 5 seconds.

Please check your workspace and let me know if everything looks complete. I am here until you are 100% satisfied.

Warmly,
Jordan from CareerOS Support`,
      goodExplanation:
        'Validates feelings immediately without making excuses. Delivers the good news fast. Explains root cause plainly. Explains the long-term fix. Offers ongoing personal care.',
      suboptimalExample: `Hi, the notes weren't deleted. If you read our status page you would see there was a cache update. Just refresh your page and it will work.`,
      suboptimalExplanation:
        'Patronizing, blames the customer for not checking the status page, completely lacks empathy.',
      keyPrinciples: [
        'Validate their emotional reality first before explaining tech.',
        'Give the resolution immediately in the second paragraph.',
        'Explain the safeguard put in place to prevent recurrence.',
      ],
    },
    prompt: {
      context:
        'A student sent an urgent message: "I submitted my portfolio link for a job interview tomorrow, but when I open it on my phone the pictures won\'t load! Please help!"',
      yourRole: 'Community & Product Support Lead',
      audience: 'Stressed Student (Kavita)',
      goal: 'Write an empathetic, calming reply explaining that image links needed an HTTPS certificate update (which you just resolved), and verify that mobile viewing is working now.',
      constraintsOrContext: [
        'Acknowledge the high stakes of tomorrow’s interview.',
        'Confirm the fix is complete and tested by you.',
        'Offer to review her link on 2 other mobile devices if she wants extra peace of mind.',
      ],
      suggestedStarter: 'Hi Kavita,\n\nFirst take a deep breath—I completely understand how stressful this is with your interview tomorrow morning!...',
      checklistBeforeSubmit: [
        'Calming and empathetic opening',
        'Direct confirmation that the image issue is resolved',
        'Reassurance for tomorrow’s job interview',
        'Extra offer of verification to build complete confidence',
      ],
    },
  },

  // 8. MANAGER COMMUNICATION
  {
    id: 'comm-manager-career-1on1',
    title: 'Frame a 1-on-1 Agenda Point to Discuss Skill Growth and Promotion',
    category: 'manager_communication',
    medium: 'written',
    estimatedTime: '15 mins',
    difficulty: 'Intermediate',
    summary:
      'Write a pre-meeting note to your manager proposing a discussion about your career development and next-level expectations.',
    whyItMatters:
      'Managers are overwhelmed with daily fires. Approaching career growth proactively with clear agendas makes it effortless for your manager to champion you.',
    skillsPracticed: ['Career Agency', 'Manager Collaboration', 'Objective Framing'],
    example: {
      scenarioContext: 'Preparing for a bi-weekly 1-on-1 after 6 months on the job.',
      goodExample: `Hi Samantha,

Looking forward to our 1-on-1 on Thursday!

Along with our regular project updates, I’d love to reserve 15 minutes of our agenda to discuss my career growth trajectory. 

Over the last 6 months, I’ve hit my delivery goals on the search filters and accessibility audit. To prepare for the next level (Associate -> Mid-level), I’d love your guidance on:
1. What gaps you currently see in my technical scope or team leadership.
2. 1 or 2 high-impact responsibilities I can take on in Q4 to prove readiness.

I put together a quick 1-page summary of my recent deliveries and self-reflections which I’ve linked here. Looking forward to your candid feedback!`,
      goodExplanation:
        'Gives advance notice (not springing a surprise). Asks for specific gap analysis rather than demanding an instant raise. Anchors in readiness and service to the team.',
      suboptimalExample: `Hey, during our 1-on-1 I want to know when I am getting promoted. I've been working hard and think I deserve it.`,
      suboptimalExplanation:
        'Confrontational, entitlement-driven, gives no notice, provides no evidence.',
      keyPrinciples: [
        'Give at least 48 hours notice before deep career conversations.',
        'Ask "What gaps do you see?" instead of "Why haven’t you promoted me?"',
        'Tie your growth to high-impact team responsibilities.',
      ],
    },
    prompt: {
      context:
        'You have been doing solid work for 4 months. You want to ask your manager for permission to lead the team’s bi-weekly learning workshop to demonstrate leadership skills.',
      yourRole: 'Junior Contributor',
      audience: 'Engineering / Design Manager (Carlos)',
      goal: 'Write an agenda item message to Carlos proposing to lead the workshop and explaining how it benefits the whole team while helping your growth.',
      constraintsOrContext: [
        'Explain the benefit to the team first, not just your resume.',
        'Propose an initial 30-minute pilot session topic.',
        'Ask for his blessing and feedback.',
      ],
      suggestedStarter: 'Hi Carlos, for our upcoming 1-on-1, I wanted to propose an initiative that I think could really help our team knowledge sharing...',
      checklistBeforeSubmit: [
        'Clear proposal for the learning workshop',
        'Emphasis on how peer knowledge sharing benefits team productivity',
        'Specific topic for the initial pilot',
        'Respectful request for guidance and approval',
      ],
    },
  },

  // 9. WRITTEN COMMUNICATION
  {
    id: 'comm-written-pr-breakdown',
    title: 'Write a Flawless Pull Request Description with Testing Proof',
    category: 'written_communication',
    medium: 'written',
    estimatedTime: '15 mins',
    difficulty: 'Starter',
    summary:
      'Document a GitHub pull request using the industry-standard Why, What, and How to Test framework.',
    whyItMatters:
      'PR descriptions are permanent engineering artifacts. Clean descriptions speed up code review from 2 days to 20 minutes and prevent regression bugs.',
    skillsPracticed: ['Technical Documentation', 'Asynchronous Reviewing', 'Clarity', 'Self-QA'],
    example: {
      scenarioContext: 'A pull request fixing a mobile hamburger menu bug that wouldn’t close on escape key.',
      goodExample: `## 📌 Summary of Changes
Fixes issue #204 where pressing the \`Escape\` key failed to close the mobile navigation drawer, leaving keyboard-only users trapped in the modal overlay.

### 🔍 Root Cause
The keydown listener was bound to \`window\` inside \`useEffect\` without checking for modal open state, causing unmounted handlers to swallow the event.

### 🛠️ What Was Done
- Added \`onKeyDown\` listener directly on the active drawer element.
- Added \`focus-trap-react\` wrapper to maintain WCAG 2.1 AA keyboard compliance.
- Added automated unit test verifying escape key dispatch unmounts modal.

### 🧪 How to Test
1. Checkout this branch: \`git checkout fix/nav-esc-trap\`
2. Run \`npm run dev\` and open mobile viewport (< 640px).
3. Click hamburger icon to open drawer.
4. Press \`Tab\` three times, then press \`Escape\`.
5. **Expected result:** Drawer closes smoothly and focus returns to the hamburger toggle button.

### 📸 Screenshots
[Before/After GIF or Screenshot link]`,
      goodExplanation:
        'Includes problem link, root cause diagnosis, bulleted solutions, step-by-step reproduction guide, and expected visual result.',
      suboptimalExample: `fixed the bug with menu. should work now. please review and merge.`,
      suboptimalExplanation:
        'Zero details, forces the reviewer to guess how to test or what broke.',
      keyPrinciples: [
        'Always explain the WHY before the WHAT.',
        'Give exact, step-by-step instructions on how the reviewer can test it in 60 seconds.',
        'Link the related ticket or issue number.',
      ],
    },
    prompt: {
      context:
        'You built a new search autocomplete debouncer that waits 300ms before sending API queries to stop spamming the database on every keystroke.',
      yourRole: 'Software Engineer',
      audience: 'Senior Peer Reviewer',
      goal: 'Write the complete PR description covering Context, Changes Made, How to Test, and Performance Impact.',
      constraintsOrContext: [
        'Use Markdown headings (## Why, ## Changes, ## Testing Steps).',
        'Explain the 300ms debounce trade-off clearly.',
      ],
      suggestedStarter: '## 🚀 Why This Change Matters\nCurrently, our search input dispatches an API request on every single keystroke...',
      checklistBeforeSubmit: [
        'Clear problem explanation (excess API requests)',
        'Explanation of the 300ms debounce solution',
        'Reproducible step-by-step testing instructions',
        'Impact statement on network requests reduced',
      ],
    },
  },

  // 10. SPOKEN COMMUNICATION
  {
    id: 'comm-spoken-audio-summary',
    title: 'Script & Deliver a 60-Second Verbal Project Summary',
    category: 'spoken_communication',
    medium: 'spoken_communication',
    estimatedTime: '15 mins',
    difficulty: 'Starter',
    summary:
      'Craft a punchy, conversational 60-second verbal summary answering "What are you working on right now?" for a team coffee chat or interview.',
    whyItMatters:
      'When someone asks what you are building, rambling for 5 minutes loses their attention. A crisp 60-second verbal pitch sparks curiosity and invites questions.',
    skillsPracticed: ['Spoken Delivery', 'Verbal Conciseness', 'Elevator Pitching', 'Confidence'],
    example: {
      scenarioContext: 'Answering an engineering manager or mentor during an informal networking coffee chat.',
      goodExample: `"Right now I'm building an accessibility audit tool for university portals. 

The core problem is that over 90% of local public portals fail basic color contrast for low-vision readers, which actually violates federal guidelines. 

What I built is a lightweight scanner that parses page DOM elements, measures contrast ratios against WCAG AA standards, and automatically suggests exact hex color replacements that designers can use. 

In my first test on our local community college site, it flagged 6 broken buttons and generated the fix in under 10 seconds. My next step is packaging it as a browser extension. 

I'd love to hear how your team approaches accessibility testing in your sprint cycles!"`,
      goodExplanation:
        'Under 100 words (approx. 50 seconds speaking time). Problem -> Solution -> Concrete Real Result -> Engaging Closing Question that turns it into a two-way dialogue.',
      suboptimalExample: `Uh, so basically I'm just coding some stuff with HTML and React and doing accessibility. There's a lot of tools out there. It's kind of hard. Yeah that's pretty much it.`,
      suboptimalExplanation:
        'Full of filler words, conveys no passion or concrete outcome, ends with a dead drop.',
      keyPrinciples: [
        'State what you are building in the first sentence.',
        'Share 1 concrete metric or test result.',
        'End with an open question to invite the other person into conversation.',
      ],
    },
    prompt: {
      context:
        'You are talking to a mentor or recruiter at a career event. They ask: "What is a project you built recently that you are proud of?"',
      yourRole: 'Aspiring Professional',
      audience: 'Industry Mentor / Recruiter',
      goal: 'Write the complete 60-second spoken script (approx. 100-130 words) with clear storytelling and a conversation-sparking closing question.',
      constraintsOrContext: [
        'Keep under 140 words so it fits in 60 seconds.',
        'Focus on authentic deliverables and genuine learning.',
        'Do not judge accent—focus purely on message clarity and confidence.',
      ],
      suggestedStarter: '"Recently, I built a project focused on...\n\nThe problem I wanted to solve was..."',
      checklistBeforeSubmit: [
        'Direct project statement in sentence 1',
        'Specific real-world problem addressed',
        'Tangible deliverable or test result highlighted',
        'Engaging question turned back to the listener',
      ],
    },
  },

  // 11. PROFESSIONAL MESSAGING
  {
    id: 'comm-messaging-slack-etiquette',
    title: 'Drop a Public Slack Announcement That People Actually Read',
    category: 'professional_messaging',
    medium: 'professional_messaging',
    estimatedTime: '12 mins',
    difficulty: 'Starter',
    summary:
      'Write a team-wide Slack or Teams announcement about a new internal tool release or workflow change without annoying @channel pings.',
    whyItMatters:
      'Abusing `@channel` or posting walls of unformatted text causes alert fatigue. Masterful messaging uses clear headers, emojis for scannability, and clear calls to action.',
    skillsPracticed: ['Slack/Teams Formatting', 'Attention Economy', 'Scannability', 'Action-Oriented Messaging'],
    example: {
      scenarioContext: 'Posting in the #announcements channel about new Figma component library tokens.',
      goodExample: `📢 **Quick Heads Up: New Button Tokens Live in Figma**

Hey team! To support WCAG contrast compliance, we just updated the primary button tokens in the design library.

**What changes for you:**
• **Designers:** When you insert a Primary Button, the new hover state is automatic.
• **Engineers:** Token name is now \`color-brand-primary-600\` (mapped in PR #88).
• **Action needed:** Please review and update any draft mockups before Friday’s sprint freeze.

📄 **1-Page Spec & Migration Guide:** [Link to Notion / Doc]

Got questions or spot a bug? Drop a reply in this thread and I'll jump right in! 👇`,
      goodExplanation:
        'Scannable in 5 seconds. Clear bold tags. Separates impact by role. Direct call to action. Keeps discussion contained in the thread.',
      suboptimalExample: `@channel hey everyone the button colors changed so please update your components thanks.`,
      suboptimalExplanation:
        'Annoying @channel notification, no links, doesn’t explain what engineers or designers need to do.',
      keyPrinciples: [
        'Avoid @channel unless there is an emergency outage.',
        'Use bold labels and bullet points for instant scanning.',
        'Explicitly request replies stay in the thread.',
      ],
    },
    prompt: {
      context:
        'You updated the shared team README with instructions on how to run tests locally with a single command (`npm run test:fast`).',
      yourRole: 'Team Contributor',
      audience: 'Entire Engineering Team (#engineering-general)',
      goal: 'Write a scannable, welcoming Slack message letting teammates know about the new faster test command and inviting them to try it.',
      constraintsOrContext: [
        'Do not use @channel or @everyone.',
        'Include the exact command in backticks.',
        'Keep friendly, encouraging, and under 100 words.',
      ],
      suggestedStarter: '🎉 **Faster Local Testing Command Now Live**\n\nHey team! To speed up local PR checks, we just added a streamlined test runner...',
      checklistBeforeSubmit: [
        'Scannable emoji and bold title',
        'Clear explanation of the time saved',
        'Exact command clearly formatted in backticks',
        'Invitation to test and reply in thread',
      ],
    },
  },

  // 12. PROFESSIONAL EMAILS (EXPANDED)
  {
    id: 'comm-email-decline-out-of-scope',
    title: 'Decline an Out-of-Scope Client Request with Constructive Boundaries',
    category: 'professional_emails',
    medium: 'written',
    estimatedTime: '15 mins',
    difficulty: 'Intermediate',
    summary:
      'Draft an email politely declining an out-of-scope feature request without sounding unhelpful or damaging the client relationship.',
    whyItMatters:
      'Saying yes to everything leads to scope creep and missed commitments. Seasoned professionals say "no" by offering trade-offs and future roadmaps.',
    skillsPracticed: ['Boundary Setting', 'Client Diplomacy', 'Scope Management', 'Professional Tact'],
    example: {
      scenarioContext:
        'A corporate client asks to add custom automated PDF invoice generation to a sprint scheduled for release this Friday.',
      goodExample: `Subject: Re: Adding PDF invoice generation to Friday's release

Hi Jonathan,

Thanks for reaching out! Automated PDF invoices would definitely save your finance team manual entry time.

Looking at our current sprint commitments for Friday's launch, our core focus is delivering the secure Stripe billing integration and multi-currency support. Adding custom PDF templating requires roughly 3 additional engineering days to ensure proper tax formatting and security.

To ensure Friday's launch remains smooth and on schedule, here are two ways we can handle this:
1. Include PDF invoice generation as the Priority #1 item in our next sprint (targeting delivery by Thursday, Oct 23).
2. Swap out multi-currency support from this week's release in order to fit PDF generation into Friday's launch instead.

I recommend Option 1 so your international users can start paying immediately. Let me know what aligns best with your team's launch priorities!

Best regards,
Alex Chen`,
      goodExplanation:
        'Validates the business value of the client request first. Explains the engineering trade-off without whining. Provides 2 distinct pathways and an informed recommendation.',
      suboptimalExample: `Subject: Re: PDF invoices
Hey Jonathan, we can't do this. The sprint is already locked and we don't have time. You should have told us two weeks ago.`,
      suboptimalExplanation:
        'Combative, blames the client, offers no alternatives, and damages partnership trust.',
      keyPrinciples: [
        'Validate the value of their idea before explaining the constraint.',
        'Never say a flat "no" without presenting trade-off options.',
        'Offer a clear target delivery date for Phase 2.',
      ],
    },
    prompt: {
      context:
        'A key marketing partner asks you to add animated confetti and custom social share banners to the user onboarding flow due in 24 hours.',
      yourRole: 'Lead Product Developer',
      audience: 'Marketing Partner (Rachel)',
      goal: 'Write an email explaining that the core onboarding flow must ship bug-free tomorrow, while scheduling the animated share banners for next Tuesday.',
      constraintsOrContext: [
        'Acknowledge why animated banners are great for virality.',
        'Protect tomorrow’s QA freeze.',
        'Propose a specific date next week to ship the animations.',
      ],
      suggestedStarter: 'Subject: Re: Onboarding flow share banners\n\nHi Rachel,\n\nThanks for sharing the banner mockups! The animations look super engaging...',
      checklistBeforeSubmit: [
        'Positive acknowledgment of her marketing goal',
        'Clear statement about tomorrow’s launch freeze',
        'Constructive proposal for next Tuesday',
        'Warm and collaborative sign-off',
      ],
    },
  },

  // 13. ASKING QUESTIONS (EXPANDED)
  {
    id: 'comm-ask-ambiguous-requirements',
    title: 'Clarify Ambiguous User Story Requirements Before Writing Code',
    category: 'asking_questions',
    medium: 'written',
    estimatedTime: '12 mins',
    difficulty: 'Starter',
    summary:
      'Ask targeted questions on a Jira ticket or Slack thread when product specs contradict each other or lack edge case details.',
    whyItMatters:
      'Writing code based on assumptions causes 70% of rework. Clarifying edge cases proactively demonstrates high engineering rigor.',
    skillsPracticed: ['Requirement Analysis', 'Root-Cause Inquiry', 'Edge Case Thinking'],
    example: {
      scenarioContext:
        'The user story says "Users should be able to upload a profile photo," but doesn’t specify file types, max file sizes, or what happens if the user is offline.',
      goodExample: `Hey @Maya, quick question as I begin implementing the avatar upload story (PROD-412):

To ensure a smooth user experience and prevent server overload, could we clarify 3 edge cases?
1. **File formats & size:** Are we supporting PNG, JPG, and WebP up to 5MB, or should SVG also be allowed?
2. **Cropping flow:** Should users crop into a 1:1 circle inside the app, or will the backend resize automatically?
3. **Delete state:** If a user removes their avatar, should it revert to their first-name initials or a generic silhouette icon?

My recommendation for v1: allow PNG/JPG/WebP up to 5MB with automatic backend center-crop and initials fallback. Let me know if that matches your design intent!`,
      goodExplanation:
        'Numbers each specific question cleanly. Shows proactive system thinking (formats, sizes, edge cases). Offers an immediate recommended default so the PM only has to reply "Yes, go with that!"',
      suboptimalExample: `Hey, this ticket doesn't have enough info. What file sizes do you want? And what about SVG? Can you update the ticket?`,
      suboptimalExplanation:
        'Passive and accusatory. Dumps the problem back onto the PM without structured options.',
      keyPrinciples: [
        'Group ambiguities into numbered, scannable questions.',
        'Frame questions around user impact and system stability.',
        'Propose sensible defaults to reduce the PM’s decision fatigue.',
      ],
    },
    prompt: {
      context:
        'You are assigned a ticket: "Add discount code input on checkout." The spec doesn’t say whether discounts apply to shipping fees or whether multiple codes can be stacked.',
      yourRole: 'Software Developer',
      audience: 'Product Manager (Taylor)',
      goal: 'Write a comment on the ticket asking about code stacking, expiration date handling, and whether discounts apply to shipping, with your suggested defaults.',
      constraintsOrContext: [
        'Keep friendly and proactive.',
        'Provide your recommendation: 1 code per order, excludes shipping.',
      ],
      suggestedStarter: 'Hi @Taylor, looking forward to building the discount code input! Before I wire up the checkout calculation logic, could we clarify two quick business rules?...',
      checklistBeforeSubmit: [
        'Clear reference to the checkout feature',
        'Specific question about code stacking',
        'Specific question about shipping fee discount eligibility',
        'Proposed default recommendation',
      ],
    },
  },

  // 14. GIVING UPDATES (EXPANDED)
  {
    id: 'comm-update-executive-outage-brief',
    title: 'Deliver a High-Stakes Production Outage Briefing to Executives',
    category: 'giving_updates',
    medium: 'written',
    estimatedTime: '15 mins',
    difficulty: 'Advanced',
    summary:
      'Draft an executive incident briefing during an active platform slowdown, balancing calm transparency, blast radius analysis, and mitigation timelines.',
    whyItMatters:
      'During production emergencies, panicked or overly technical updates alarm executives. A structured 4-part incident brief builds immense trust under fire.',
    skillsPracticed: ['Crisis Communication', 'Executive Presence', 'Incident Management', 'Calm Demeanor'],
    example: {
      scenarioContext:
        'The search API response times jumped from 80ms to 4,200ms due to a database connection pool exhaustion.',
      goodExample: `🚨 **INCIDENT UPDATE #2 — Search Latency Degradation**
**Status:** MITIGATING | **Incident Lead:** Alex C. | **Time:** 14:15 UTC

**1. Customer Impact (Blast Radius):**
Approximately 12% of logged-in web users are experiencing 4-second delays when searching for products. Checkout and payment flows are 100% unaffected.

**2. Root Cause Identified:**
A connection pool leak in the search microservice after the 13:30 deployment saturated available PostgreSQL database workers.

**3. Actions Taken & In Progress:**
• Rolled back the search microservice to stable release v2.14 at 14:05 UTC.
• Terminated orphaned DB connections; latency has dropped back to 350ms and is stabilizing.
• Traffic throttler active to prevent database reconnection spikes.

**4. Next Checkpoint:**
Full stabilization expected by 14:35 UTC. Next executive status brief will be posted at 14:40 UTC or immediately if status changes.`,
      goodExplanation:
        'Immediate clarity on blast radius. Explicitly confirms what is unaffected (payments). Lists concrete actions taken with timestamps. Commits to a specific next checkpoint time.',
      suboptimalExample: `Search is down. The database crashed because of connections. We are working on it and restarted some stuff. Will let you know when it's back.`,
      suboptimalExplanation:
        'Induces panic, doesn’t specify impact, gives no timeline, provides no next checkpoint.',
      keyPrinciples: [
        'Always quantify blast radius (who is affected and who is NOT).',
        'State what actions are complete vs. in progress.',
        'Give a firm timestamp for the next update.',
      ],
    },
    prompt: {
      context:
        'An email delivery queue is delayed by 45 minutes because the third-party email gateway is experiencing an API slowdown. Password resets are delayed, but account logins work normally.',
      yourRole: 'On-Call Operations Engineer',
      audience: 'Executive Channel (#incident-exec-updates)',
      goal: 'Write the incident briefing stating the impact, the third-party root cause, the fallback queue deployed, and the ETA for full clearing.',
      constraintsOrContext: [
        'State that existing logins and active sessions are unaffected.',
        'Give the next update time in 30 minutes.',
      ],
      suggestedStarter: '🚨 **INCIDENT STATUS: Email Delivery Queue Delay**\n**Current Status:** Active Mitigation\n\n**1. Customer Impact:**...',
      checklistBeforeSubmit: [
        'Clear incident status tag at top',
        'Specific impact stated (password reset delay)',
        'Confirmation that core login is functional',
        'Concrete actions and next check-in timestamp',
      ],
    },
  },

  // 15. EXPLAINING TECHNICAL WORK (EXPANDED)
  {
    id: 'comm-tech-explain-2fa-security',
    title: 'Explain Why Mandatory 2FA Is Essential to Non-Technical Founders',
    category: 'explaining_technical_work',
    medium: 'written',
    estimatedTime: '15 mins',
    difficulty: 'Intermediate',
    summary:
      'Convince non-technical business founders why requiring Two-Factor Authentication (2FA) is vital despite potential onboarding friction.',
    whyItMatters:
      'Technical teams frequently lose budget or mandate battles because they talk about cryptography instead of customer trust and business liability.',
    skillsPracticed: ['Security Communication', 'Risk Framing', 'Business Translation', 'Persuasion'],
    example: {
      scenarioContext:
        'A startup founder wants to remove 2FA requirements because "it adds an extra step that might hurt conversion rates."',
      goodExample: `Hi David,

I completely understand the concern about onboarding friction—every extra second during sign-up matters for growth.

The reason 2FA is critical right now comes down to customer trust and enterprise contracts:
Think of a standard password like a physical key. Over 80% of credential leaks happen not because our app was hacked, but because users reuse the exact same password on five other websites that had data breaches. If one of those sites leaks, an attacker walks straight into their account on our platform.

With 2FA, even if an attacker has the password, they cannot enter without the second physical device.

**How we balance security with zero user drop-off:**
1. We keep standard sign-up effortless (1-click Google/GitHub login bypasses extra forms entirely).
2. We enable "Remember this browser for 30 days" so legitimate users only verify once a month.
3. SOC-2 enterprise compliance requires 2FA; having this active unlocks $200k+ enterprise pilot deals next quarter.

Would you be open to running a 2-week test with the 30-day remembered browser feature to verify conversion rates stay high?`,
      goodExplanation:
        'Validates the founder’s growth concern upfront. Uses the physical key analogy to explain credential stuffing in 10 seconds. Connects security directly to revenue ($200k enterprise deals). Offers a reversible 2-week experiment.',
      suboptimalExample: `We can't disable 2FA. TOTP algorithms and HMAC SHA-256 tokens are standard security best practices. Removing it is irresponsible.`,
      suboptimalExplanation:
        'Lectures the founder, uses cryptographic jargon, and shows zero empathy for business conversion metrics.',
      keyPrinciples: [
        'Acknowledge the business concern (conversion friction) first.',
        'Use an analogy to explain the actual threat (credential stuffing).',
        'Connect security directly to commercial upside or risk reduction.',
      ],
    },
    prompt: {
      context:
        'Your product manager wants to skip database backups during the weekend launch to save $150 on cloud infrastructure costs.',
      yourRole: 'DevOps / Backend Engineer',
      audience: 'Product Manager (Liam)',
      goal: 'Write a persuasive, respectful note explaining why automated daily snapshots are non-negotiable insurance that protects the launch against catastrophic data loss.',
      constraintsOrContext: [
        'Acknowledge the budget constraint.',
        'Compare the $150 cost to the cost of 40 hours of emergency manual data recovery.',
        'Propose an optimized backup retention policy that keeps costs minimal.',
      ],
      suggestedStarter: 'Hi Liam,\n\nI understand we are keeping a close eye on our cloud costs for launch weekend—saving every dollar where possible is super smart...',
      checklistBeforeSubmit: [
        'Empathetic opening on budget mindfulness',
        'Plain explanation of disaster recovery risk',
        'Cost comparison ($150 vs team rebuilding data)',
        'Sensible compromise (retention pruning)',
      ],
    },
  },

  // 16. PRESENTATIONS (EXPANDED)
  {
    id: 'comm-pres-internal-tool-pitch',
    title: 'Pitch an Internal Productivity Tool or Refactor to Team Leads',
    category: 'presentations',
    medium: 'spoken_communication',
    estimatedTime: '20 mins',
    difficulty: 'Intermediate',
    summary:
      'Deliver a compelling 3-minute pitch convincing engineering leads to adopt a new automated test generator or design token synchronizer.',
    whyItMatters:
      'Great ideas die if you cannot pitch them effectively to your peers. Structuring your pitch around hours saved and developer joy wins allies.',
    skillsPracticed: ['Spoken Pitching', 'ROI Demonstration', 'Peer Buy-In', 'Storytelling'],
    example: {
      scenarioContext: 'Pitching an automated component documentation tool during team tech council.',
      goodExample: `**[Hook — 30 seconds]**
"Last week, three different engineers on our squad built three slightly different versions of the exact same dropdown component. Why? Because finding our official design tokens took 15 minutes of digging through Figma inspect tabs.

**[The Solution & Demo — 90 seconds]**
"Over the weekend hackathon, I hooked up an automated CLI script called \`tokens-sync\`. Watch what happens: with one command, it pulls our tokens from Figma and auto-generates TypeScript types directly in our IDE with autocomplete. If a designer changes a hex code in Figma, our build warning flags it before we even push a PR.

**[The ROI & Ask — 60 seconds]**
"This saves roughly 2 hours per engineer every sprint and completely eliminates UI regression bugs. My ask today is simple: let our squad pilot this for Sprint 14. If the team loves it, we roll it out org-wide. If not, it uninstalls in 5 seconds. What questions do you have?"`,
      goodExplanation:
        'Hooks listeners with a painful shared experience. Demonstrates the live CLI workflow. Frames the adoption as a low-risk 2-week pilot with zero lock-in.',
      suboptimalExample: `I wrote a script for tokens. It uses Figma API. You should all use it because it's better than what we have now.`,
      suboptimalExplanation:
        'Vague, arrogant, provides no proof of time saved, doesn’t address adoption risk.',
      keyPrinciples: [
        'Quantify the current pain point in wasted hours.',
        'Show the tool working in under 60 seconds.',
        'Make the ask low-risk (a pilot, not a permanent mandate).',
      ],
    },
    prompt: {
      context:
        'You created a set of reusable template PR templates that include automatic accessibility and mobile test checklists.',
      yourRole: 'Associate Engineer / Team Contributor',
      audience: 'Engineering Team Council',
      goal: 'Write the spoken pitch script (approx. 2-3 minutes) demonstrating why the team should adopt the PR checklist to speed up reviews.',
      constraintsOrContext: [
        'Focus on how it saves reviewers from asking repetitive questions.',
        'Keep the tone humble and team-centric.',
      ],
      suggestedStarter: '[Opening — 30s]\n"How many times this month have you reviewed a PR and had to ask: \'Did you check this on mobile?\' or \'Does this work with keyboard tabs?\'..."',
      checklistBeforeSubmit: [
        'Relatable hook about repetitive PR comments',
        'Clear demonstration of the checklist template',
        'Statement of time saved for reviewers',
        'Low-friction pilot proposal',
      ],
    },
  },

  // 17. MEETINGS (EXPANDED)
  {
    id: 'comm-meeting-facilitate-retro',
    title: 'Facilitate a Focused 25-Minute Sprint Retrospective',
    category: 'meetings',
    medium: 'spoken_communication',
    estimatedTime: '15 mins',
    difficulty: 'Intermediate',
    summary:
      'Frame spoken facilitation prompts to guide a team through a productive, psychologically safe retrospective without venting or finger-pointing.',
    whyItMatters:
      'Unstructured retros devolve into cynical complaint sessions. Skilful facilitators steer conversations toward actionable system improvements.',
    skillsPracticed: ['Facilitation', 'Active Listening', 'Psychological Safety', 'Action Orientation'],
    example: {
      scenarioContext: 'Opening a retro after a difficult sprint where a critical bug slipped into production.',
      goodExample: `"Welcome everyone to our Sprint 12 retro. Before we look at the board, let's remember our core prime directive: regardless of what we discover today, we know everyone did the best work they could with the information and tools they had at the time.

Today we have 25 minutes, and our only goal is leaving this room with 2 concrete experiments for next sprint that make our lives easier.

Let's do 3 minutes of silent reflection:
• Column 1: What felt energizing and worked well?
• Column 2: What slowed us down or created drag?
• Column 3: One specific idea you want to test next sprint.

No names, no blame—just systems and processes. Let's start the timer."`,
      goodExplanation:
        'Establishes the prime directive immediately. Sets the timebox (25 mins). Focuses on systems instead of individuals. Sets clear expectations of 2 actionable experiments.',
      suboptimalExample: `Okay, so this sprint was pretty bad with that bug. Let's talk about what went wrong and who broke staging.`,
      suboptimalExplanation:
        'Breeds fear, invites finger-pointing, destroys psychological safety.',
      keyPrinciples: [
        'Start with the blameless prime directive.',
        'Frame challenges as system friction, not human incompetence.',
        'Keep the outcome constrained to 2 high-impact experiments.',
      ],
    },
    prompt: {
      context:
        'You are facilitating a retro for a group project where team members felt communication across different timezones was disjointed.',
      yourRole: 'Meeting Facilitator / Student Lead',
      audience: '4 Project Teammates',
      goal: 'Write your spoken opening script and prompt to guide the team toward an asynchronous communication agreement without making remote teammates feel guilty.',
      constraintsOrContext: [
        'Establish a welcoming, appreciative tone.',
        'Ask an open question on async handoffs.',
      ],
      suggestedStarter: '"Hey team, thanks for hopping on. Everyone put in huge effort this week across multiple timezones, which is not easy..."',
      checklistBeforeSubmit: [
        'Warm acknowledgment of team effort across timezones',
        'Blameless framing of timezone coordination challenges',
        'Structured prompt inviting specific suggestions',
        'Focus on leaving with an agreed async ritual',
      ],
    },
  },

  // 18. CUSTOMER COMMUNICATION (EXPANDED)
  {
    id: 'comm-customer-feature-deprecation',
    title: 'Explain an Upcoming Feature Deprecation to Active Users',
    category: 'customer_communication',
    medium: 'written',
    estimatedTime: '15 mins',
    difficulty: 'Intermediate',
    summary:
      'Compose an empathetic, transparent announcement explaining why a legacy feature is being retired and guiding users to the improved replacement.',
    whyItMatters:
      'Retiring features causes backlash if users feel ignored. Transparent messaging explaining the "why" and offering a generous migration window preserves brand loyalty.',
    skillsPracticed: ['Customer Communications', 'Change Management', 'Empathetic Transparency'],
    example: {
      scenarioContext: 'Retiring the legacy manual CSV import in favor of automated live cloud sync.',
      goodExample: `Subject: Notice: Upgrading from Manual CSV Imports to Live Cloud Sync on Nov 15

Hi Maria,

We are writing to share advance notice about an upcoming improvement to your CareerOS workspace.

On **November 15, 2026**, we will be officially retiring the legacy manual CSV upload tool in favor of our new automated Live Cloud Sync.

**Why we are making this change:**
Over 30% of manual CSV uploads failed due to mismatched column headers, causing sync delays. Our new Cloud Sync updates automatically in real-time, eliminating file formatting errors and saving you an average of 45 minutes every month.

**What this means for you:**
• **Your historical data is 100% safe:** All previous CSV imports remain safely archived in your account.
• **Migration is 1-click:** You can link your Google Drive or Notion in 30 seconds using our step-by-step migration guide [Link].
• **Generous timeline:** The old CSV tool will remain fully operational until November 15.

If you have custom workflows that rely on raw CSVs, please reply directly to this email—our engineering team is happy to help migrate your setup personally!

Warmly,
The CareerOS Product Team`,
      goodExplanation:
        'Gives 30+ days notice. Explains the exact customer benefit (eliminating formatting errors, saving 45 minutes). Reassures data safety. Offers personal white-glove assistance.',
      suboptimalExample: `Subject: CSV Import Deprecated
Notice: CSV imports are shutting down next week. Use the new sync feature instead. Thanks.`,
      suboptimalExplanation:
        'Short notice, cold tone, gives zero justification, offers no migration help.',
      keyPrinciples: [
        'Provide at least 30 days advance notice.',
        'Reassure customers that their historical data is safe.',
        'Explain the real customer benefit behind the change.',
        'Offer a direct human support channel for custom setups.',
      ],
    },
    prompt: {
      context:
        'Your web app is retiring support for an outdated browser version (Safari 13 and Internet Explorer) to enable modern WebGL accessibility features.',
      yourRole: 'Product Communications Specialist',
      audience: 'Impacted End Users',
      goal: 'Write the in-app notice or email explaining the retirement date (4 weeks away), why modern browser security standards require it, and how to update.',
      constraintsOrContext: [
        'Keep friendly, patient, and non-condescending.',
        'Provide simple 1-click browser update links.',
      ],
      suggestedStarter: 'Subject: Upcoming browser compatibility update for CareerOS\n\nHi [Name],\n\nTo ensure your career data remains protected by modern web security standards...',
      checklistBeforeSubmit: [
        'Clear statement of the 4-week timeline',
        'Emphasis on security and modern performance',
        'Reassurance that accounts and data remain safe',
        'Simple instructions to update browser',
      ],
    },
  },

  // 19. MANAGER COMMUNICATION (EXPANDED)
  {
    id: 'comm-manager-difficult-roadblock',
    title: 'Deliver Difficult Roadblock News Before the Weekly Executive Sync',
    category: 'manager_communication',
    medium: 'written',
    estimatedTime: '15 mins',
    difficulty: 'Intermediate',
    summary:
      'Inform your manager that a high-profile milestone is blocked by an external vendor, giving them the ammunition to defend the team.',
    whyItMatters:
      'Managers hate being blindsided in executive meetings. Providing early, objective briefing notes turns your manager into an ally rather than an antagonist.',
    skillsPracticed: ['Upward Management', 'Risk Escalation', 'Executive Shielding', 'Accountability'],
    example: {
      scenarioContext:
        'An external payment provider failed their compliance audit, delaying the subscription billing launch by 2 weeks.',
      goodExample: `Hi Marcus,

Flagging an important update for your 2:00 PM executive staff meeting regarding the Q3 Subscription Launch.

**The Headline:**
Stripe notified us this morning that their EU banking partner audit is delayed by 10 business days. Because of this external vendor freeze, our team cannot turn on live EUR credit card processing by Friday as planned.

**What This Means:**
• **Launch Date:** US subscription launch is 100% on track for Friday. EU launch must be re-slated for Oct 24.
• **Financial Impact:** Pushes ~$12k in projected European Q3 revenue into early Q4.

**Our Mitigation Plan:**
1. We have completed all frontend work and integration tests; code is frozen and ready the moment their API unlocks.
2. We prepared a "Notify Me When Available in EU" pre-order waitlist to capture demand on Friday.

I've summarized this in 3 bullet points in your executive slide notes (slide 4). Let me know if you need any additional data points before your 2:00 PM sync!`,
      goodExplanation:
        'Flags the issue hours before the executive meeting. Separates what is blocked from what is shipping. Quantifies revenue impact. Pre-fills the manager’s presentation slide notes.',
      suboptimalExample: `Hey Marcus, bad news. Stripe delayed their audit so EU won't work on Friday. Don't know what to do. Hope the exec meeting goes okay.`,
      suboptimalExplanation:
        'Helpless tone, leaves manager unprepared, offers no mitigation plan.',
      keyPrinciples: [
        'Never let your manager be blindsided in leadership meetings.',
        'Isolate the external dependency clearly from team execution.',
        'Arm your manager with slide talking points and mitigation plans.',
      ],
    },
    prompt: {
      context:
        'A partner university API has been offline for 48 hours, blocking your integration tests for the campus job board launch due Monday.',
      yourRole: 'Technical Project Lead',
      audience: 'Direct Manager (Brenda)',
      goal: 'Write a concise briefing note before Brenda’s Monday morning leadership sync, explaining the partner downtime, actions taken, and the proposed fallback launch strategy.',
      constraintsOrContext: [
        'Be objective and fact-based.',
        'Propose using mock campus data for Monday’s demo.',
      ],
      suggestedStarter: 'Hi Brenda,\n\nQuick heads up before your Monday leadership briefing regarding the campus job board launch...',
      checklistBeforeSubmit: [
        'Identifies the partner API downtime with exact duration',
        'Reassures manager that our code is complete',
        'Proposes the mock data demo fallback plan',
        'Equips Brenda with clear talking points',
      ],
    },
  },

  // 20. WRITTEN COMMUNICATION (EXPANDED)
  {
    id: 'comm-written-blameless-postmortem',
    title: 'Author a Blameless Postmortem / Incident Analysis',
    category: 'written_communication',
    medium: 'written',
    estimatedTime: '20 mins',
    difficulty: 'Advanced',
    summary:
      'Write a comprehensive, blameless postmortem document following an outage, analyzing system flaws and establishing verifiable prevention items.',
    whyItMatters:
      'Blameless postmortems are the hallmark of elite engineering cultures. Shifting from "Who made a mistake?" to "Why did the system allow this mistake to happen?" creates resilient teams.',
    skillsPracticed: ['Systemic Thinking', 'Blameless Culture', 'Technical Writing', 'Root Cause Analysis'],
    example: {
      scenarioContext: 'An engineer accidentally dropped a staging database table during a schema migration.',
      goodExample: `## 📋 Incident Postmortem: Staging Database Table Drop
**Date:** October 4, 2026 | **Duration:** 38 minutes | **Author:** Engineering Team

### 🔍 Executive Summary
At 14:12 UTC, during a routine schema refactor, a migration script executed against the shared staging database without a dry-run safety prompt, dropping the \`user_preferences\` table. Service was fully restored from automated snapshot backups within 38 minutes. Zero production data or customer records were affected.

### ⏱️ Timeline of Events
• **14:12 UTC:** Migration command dispatched from local CLI.
• **14:15 UTC:** First test failure flagged in CI test runner.
• **14:18 UTC:** Incident channel opened; automated snapshot identified.
• **14:50 UTC:** Snapshot restored and verified; staging tests passing green.

### 🧠 Systemic Contributing Factors
1. **Tooling Guardrails:** The local database CLI lacked an environment check verifying whether the target connection was local \`localhost\` vs shared \`staging\`.
2. **Permission Boundaries:** Developer database credentials had unrestricted \`DROP TABLE\` privileges on shared environments.

### 🛠️ Action Items to Prevent Recurrence
| Task | Owner | Priority | Status |
|---|---|---|---|
| Add mandatory \`--confirm-database-name\` flag to migration CLI | Jordan | P0 | PR #204 open |
| Revoke raw \`DROP\` permissions on staging DB roles | Security | P0 | Done |
| Add pre-flight connection indicator in terminal prompt | Maya | P1 | Scheduled Sprint 14 |`,
      goodExplanation:
        'Zero personal blame (never says "Jordan typed the wrong command"). Focuses entirely on missing system guardrails (CLI didn’t verify environment). Action items have owners and clear priorities.',
      suboptimalExample: `Postmortem: Jordan dropped the table because he was careless and didn't check his terminal. He was told to be more careful in the future.`,
      suboptimalExplanation:
        'Toxic and useless. Relies on human perfection instead of building systemic guardrails.',
      keyPrinciples: [
        'Assume people are smart and well-intentioned; blame the tooling guardrails.',
        'Document the exact timeline with timestamps.',
        'Create actionable, prioritized engineering tickets to prevent recurrence.',
      ],
    },
    prompt: {
      context:
        'An uncompressed 15MB hero video was pushed to the production homepage, causing mobile data usage spikes and slow loading for 2 hours before being replaced with an optimized WebM asset.',
      yourRole: 'Lead Web Engineer',
      audience: 'Whole Engineering & Design Team',
      goal: 'Write a blameless postmortem analyzing the incident, why CI allowed a 15MB file to pass, and the automated size-limit checks being added.',
      constraintsOrContext: [
        'Focus on missing automated bundle-size guards.',
        'Include a concrete action table.',
      ],
      suggestedStarter: '## 📋 Incident Postmortem: Homepage Mobile Loading Slowdown\n**Date:** [Date] | **Duration:** 2 hours | **Status:** Resolved\n\n### 🔍 Summary:...',
      checklistBeforeSubmit: [
        'Summary quantifying mobile user impact',
        'Blameless root cause (missing CI file-size guardrail)',
        'Timeline of discovery and fix',
        'Specific preventive action items (bundle limit rules)',
      ],
    },
  },

  // 21. SPOKEN COMMUNICATION (EXPANDED)
  {
    id: 'comm-spoken-constructive-peer-feedback',
    title: 'Deliver Kind, Direct Constructive Feedback to a Peer',
    category: 'spoken_communication',
    medium: 'spoken_communication',
    estimatedTime: '15 mins',
    difficulty: 'Intermediate',
    summary:
      'Deliver constructive verbal feedback to a teammate in a private 1-on-1 regarding code review delays or communication friction.',
    whyItMatters:
      'Avoiding difficult conversations allows resentment to build. Seasoned colleagues deliver feedback using the Situation-Behavior-Impact (SBI) framework with warmth and curiosity.',
    skillsPracticed: ['Constructive Candor', 'SBI Framework', 'Interpersonal Empathy', 'Relationship Building'],
    example: {
      scenarioContext: 'A teammate consistently takes 3–4 days to review your pull requests, blocking your sprint velocity.',
      goodExample: `"Hey Marcus, thanks for grabbing coffee with me today. 

I wanted to check in on our code review workflow because I really value your technical feedback—your catch on the caching bug last week saved us a huge headache.

I noticed over the last two sprints, when I submit PRs on Monday, they often sit until Thursday before getting an initial review. 

The impact on my end is that my branch gets stale with merge conflicts, and I get blocked from testing our features in staging before sprint freeze.

I know how intense your workload is right now with the database migration. How can we make this smoother? Would it help if I flagged urgent PRs in the morning, or could we set aside 15 minutes before lunch to pair on reviews together?"`,
      goodExplanation:
        'Starts with genuine appreciation. Uses the Situation-Behavior-Impact framework. Acknowledges the peer’s heavy workload without being accusatory. Proposes 2 collaborative alternatives.',
      suboptimalExample: `"You take way too long to review my PRs. You're holding up my work and making me miss my sprint commitments."`,
      suboptimalExplanation:
        'Puts the peer on the defensive immediately, lacks empathy, offers no constructive solution.',
      keyPrinciples: [
        'Praise specific good work before raising the concern.',
        'Describe the objective behavior, not their character or intent.',
        'Explain the concrete impact on team delivery.',
        'Ask how you can collaborate to solve it together.',
      ],
    },
    prompt: {
      context:
        'A peer frequently interrupts others during team video calls, accidentally talking over quieter colleagues.',
      yourRole: 'Peer Colleague',
      audience: 'Teammate (Chris)',
      goal: 'Write the spoken script you would use in a private 1-on-1 to kindly share this feedback and propose a meeting hand-raise convention.',
      constraintsOrContext: [
        'Validate their passion and ideas.',
        'Highlight the impact on team members speaking up.',
        'Suggest using Zoom/Meet hand-raise emoji buttons.',
      ],
      suggestedStarter: '"Hey Chris, thanks for jumping on a quick 1-on-1. I wanted to chat about our team syncs because I love how much energy and great ideas you bring to our discussions..."',
      checklistBeforeSubmit: [
        'Affirmation of their enthusiasm and contributions',
        'Specific observation of interruption pattern',
        'Impact on quieter teammates’ participation',
        'Gentle suggestion of meeting hand-raising',
      ],
    },
  },

  // 22. PROFESSIONAL MESSAGING (EXPANDED)
  {
    id: 'comm-messaging-respectful-disagreement',
    title: 'Respectfully Disagree with an Architecture Choice in Public Slack',
    category: 'professional_messaging',
    medium: 'professional_messaging',
    estimatedTime: '12 mins',
    difficulty: 'Intermediate',
    summary:
      'Express technical dissent in a public Slack channel without creating tribal conflict, defensiveness, or ego battles.',
    whyItMatters:
      'Healthy debate is the lifeblood of high-performing engineering teams. Knowing how to challenge ideas respectfully in public channels earns immense peer credibility.',
    skillsPracticed: ['Technical Dissent', 'Public Channel Etiquette', 'Ego De-escalation', 'Objective Inquiry'],
    example: {
      scenarioContext: 'A senior engineer proposes replacing all REST endpoints with GraphQL in a Slack thread.',
      goodExample: `Really appreciate the thorough write-up, @Julian! The automated query batching and type safety benefits you outlined make a ton of sense, especially for our mobile client.

I wanted to raise one potential trade-off for our team to consider:
Currently, our backend caching layer relies heavily on standard HTTP cache headers (Cloudflare Varnish). Moving to GraphQL single-endpoint POST requests means we lose native HTTP edge caching out of the box, which could increase database read load by roughly 40% during peak traffic.

What do you think about doing a hybrid approach?
• Keep high-traffic read endpoints (product catalog) on cached REST.
• Pilot GraphQL on our personalized account dashboard where custom querying shines most.

Would love to hear your thoughts or see if Apollo edge caching could mitigate the DB load!`,
      goodExplanation:
        'Validates the colleague’s proposal first. Explains the technical trade-off factually (edge caching vs database load) with an estimate. Proposes a collaborative compromise (hybrid rollout) and asks an open question.',
      suboptimalExample: `GraphQL is totally wrong for our architecture. It will kill our database and our Cloudflare caching won't work. We shouldn't do this.`,
      suboptimalExplanation:
        'Dismissive, aggressive, creates a win/lose ego contest in front of the entire team.',
      keyPrinciples: [
        'Validate what is strong about their idea first.',
        'Frame your counter-point around objective system constraints.',
        'Propose an incremental pilot or hybrid middle ground.',
      ],
    },
    prompt: {
      context:
        'A colleague suggests migrating the entire project to a brand-new CSS library right before the sprint release freeze.',
      yourRole: 'Frontend Engineer',
      audience: 'Engineering Team Channel (#frontend-guild)',
      goal: 'Write a public Slack reply thanking them for exploring modern tools, raising the regression risk right before the freeze, and proposing to spike it in the next sprint instead.',
      constraintsOrContext: [
        'Keep friendly, appreciative, and calm.',
        'Highlight the risk to next week’s release.',
        'Propose a 1-day spike during the next sprint.',
      ],
      suggestedStarter: 'Thanks for putting this together, @Sam! The bundle size numbers you shared look really promising...',
      checklistBeforeSubmit: [
        'Positive appreciation of the library evaluation',
        'Polite concern regarding the release freeze timeline',
        'Constructive suggestion of a next-sprint spike',
        'Respectful and collaborative tone',
      ],
    },
  },

  // 23. PROFESSIONAL EMAILS (FOLLOW-UP COURTESY)
  {
    id: 'comm-email-courteous-followup',
    title: 'Follow Up on an Unanswered High-Priority Email Without Being Passive-Aggressive',
    category: 'professional_emails',
    medium: 'written',
    estimatedTime: '12 mins',
    difficulty: 'Starter',
    summary:
      'Draft a polite, value-first follow-up to a busy stakeholder after 4 days of silence without sounding frustrated or passive-aggressive.',
    whyItMatters:
      'Writing "Per my last email..." or "Just bumping this" irritates busy people. High-EQ professionals re-anchor the context, reiterate the deadline impact, and make it effortless to reply in 10 seconds.',
    skillsPracticed: ['Follow-up Etiquette', 'Diplomacy', 'Context Re-anchoring', 'Asynchronous Tact'],
    example: {
      scenarioContext:
        'You sent the updated logo assets to the external brand director 4 days ago asking for approval before print cut-off, but haven\'t heard back.',
      goodExample: `Subject: Quick Follow-up: Logo Asset Sign-off for Print Cut-off (Friday 2 PM)

Hi David,

Following up on the updated vector logo package sent on Monday!

To ensure our brochures arrive before the conference, our printer needs file sign-off by **Friday at 2:00 PM**. 

If the current files look good to you, a quick "Approved" reply to this email is all we need. If you have any tweaks, please let me know and I'll jump on them right away!

Best,
Maya`,
      goodExplanation:
        'Subject line names the exact cut-off date. Re-anchors why the deadline matters (conference brochures). Makes responding effortless (a 1-word "Approved" is sufficient).',
      suboptimalExample: `Subject: Bump
Per my last email sent Monday, I still haven't heard from you. We need this ASAP.`,
      suboptimalExplanation:
        'Passive-aggressive, finger-pointing, sounds demanding, provides no context or easy exit.',
      keyPrinciples: [
        'Never write "per my last email" or "just bumping this".',
        'State the concrete date and real-world reason for the deadline.',
        'Lower the effort to reply (e.g. "a 1-word reply is plenty").',
      ],
    },
    prompt: {
      context:
        'You emailed the security lead 4 days ago asking to review your API permissions for the new analytics dashboard. You need sign-off before deploying to staging on Thursday.',
      yourRole: 'Junior Full-Stack Engineer',
      audience: 'Security Architect (Evelyn)',
      goal: 'Write a gracious, concise follow-up email explaining the Thursday staging deployment milestone and offering a 5-minute sync or quick async sign-off.',
      constraintsOrContext: [
        'Acknowledge her busy calendar.',
        'Highlight the Thursday staging deployment milestone.',
        'Keep under 100 words.',
      ],
      suggestedStarter: 'Subject: Re: API Permissions Review for Analytics Dashboard (Target: Thursday)\n\nHi Evelyn,\n\nHope your week is going well! Following up briefly on the API permissions review...',
      checklistBeforeSubmit: [
        'Re-anchored subject line with target date',
        'Polite acknowledgment of heavy workload',
        'Clear statement of Thursday staging target',
        'Effortless call to action',
      ],
    },
  },

  // 24. ASKING QUESTIONS (FEEDBACK ON FIRST DELIVERABLE)
  {
    id: 'comm-ask-first-project-feedback',
    title: 'Ask Your Manager for High-Yield Feedback on Your First Major Deliverable',
    category: 'asking_questions',
    medium: 'written',
    estimatedTime: '15 mins',
    difficulty: 'Starter',
    summary:
      'Structure a feedback request after shipping your first feature, framing specific questions that elicit actionable advice rather than polite platitudes.',
    whyItMatters:
      'Asking "How did I do?" gets you generic "Good job!" praise. Asking targeted questions about your speed, code clarity, and communication uncovers real growth levers.',
    skillsPracticed: ['Constructive Inquiry', 'Self-Awareness', 'Feedback Solicitation', 'Career Agency'],
    example: {
      scenarioContext: 'An associate engineer shipped their first user authentication flow and wants real performance feedback.',
      goodExample: `Hi Sarah,

Now that the auth flow has shipped and is performing smoothly in production, I’d love to gather your candid feedback to help me calibrate for my next project.

To make this quick, I’d love your thoughts on three specific areas:
1. **Technical Execution:** Did the modular architecture align with team standards, or were there patterns that felt over-engineered?
2. **Delivery & Pacing:** Was my 2-week turnaround on track with your expectations for this scope?
3. **One Thing to Elevate:** What is one specific habit or skill I should focus on improving during Sprint 6?

Happy to chat async or reserve 10 minutes in our 1-on-1 next Tuesday. Thank you for all your guidance on this first milestone!`,
      goodExplanation:
        'Points to 3 specific evaluative dimensions. Shows genuine desire to improve rather than fishing for compliments. Offers async or 1-on-1 options.',
      suboptimalExample: `Hey, how do you think I did on the auth project? Did I do good?`,
      suboptimalExplanation:
        'Vague, puts all the work on the manager, usually receives shallow reassurance rather than helpful coaching.',
      keyPrinciples: [
        'Ask about specific dimensions (code, pace, communication).',
        'Ask "What is one thing to elevate?" rather than "Did I do well?"',
        'Give them time to think or link to your 1-on-1 agenda.',
      ],
    },
    prompt: {
      context:
        'You finished designing and shipping the team’s customer satisfaction survey widget. You want to ask your design lead for honest feedback on your component design and user test notes.',
      yourRole: 'Associate Product Designer',
      audience: 'Design Lead (Devin)',
      goal: 'Write a note requesting structured feedback on visual polish, component reusability, and team collaboration.',
      constraintsOrContext: [
        'Keep humble and growth-minded.',
        'Target 2-3 specific focus questions.',
      ],
      suggestedStarter: 'Hi Devin,\n\nNow that the survey widget is live, I’d love to ask for your quick feedback to help me grow...',
      checklistBeforeSubmit: [
        'Warm gratitude for support',
        'Specific question regarding component design reusability',
        'Specific question regarding user test documentation',
        'Clear call to action for async or sync reflection',
      ],
    },
  },

  // 25. GIVING UPDATES (END-OF-WEEK MILESTONE RECAP)
  {
    id: 'comm-update-weekly-milestone-recap',
    title: 'Author an End-of-Week Executive Milestone Recap with Clear Deliverables',
    category: 'giving_updates',
    medium: 'written',
    estimatedTime: '15 mins',
    difficulty: 'Intermediate',
    summary:
      'Write a Friday afternoon milestone recap that showcases finished deliverables, ongoing work, and next week’s priorities for cross-functional stakeholders.',
    whyItMatters:
      'Stakeholders forget what you did if you don\'t summarize it. A Friday recap builds a verifiable track record of velocity and demonstrates operational excellence.',
    skillsPracticed: ['Executive Summarization', 'Weekly Velocity Tracking', 'Stakeholder Visibility', 'Proactive Ownership'],
    example: {
      scenarioContext: 'Sending a Friday afternoon summary of the Mobile App v2.4 sprint.',
      goodExample: `📊 **Weekly Project Recap: Mobile App v2.4 (Week 38)**

Hi team,

Here is our quick wrap-up of what shipped this week and where we are heading next week:

🎉 **Shipped This Week:**
• **Biometric Login:** Merged FaceID/TouchID authentication (#PR-102); tested on iOS 17 and Android 14.
• **Offline Caching:** Configured local SQLite database sync for offline flight itineraries (#PR-109).
• **Design QA:** Resolved 6 UI contrast bugs flagged in the accessibility audit.

⏳ **In Progress:**
• **Push Notifications:** Wired up Firebase messaging; waiting on Apple APNS production certs (expected Monday).

🎯 **Priorities for Next Week:**
1. Complete APNS push notification end-to-end testing.
2. Begin 500-user TestFlight beta release on Wednesday.

Have a wonderful weekend everyone!

Best,
Jordan`,
      goodExplanation:
        'Clean section headers with emojis for instant scanning. Ticket/PR numbers linked. Dependencies highlighted with expected resolution times. Next week’s top priorities clearly numbered.',
      suboptimalExample: `Hey, this week we worked on biometrics, caching, and some QA. Next week we are doing push notifications and testing. Have a good weekend.`,
      suboptimalExplanation:
        'Flat, unstructured, lacks specifics, mentions no ticket numbers or target beta dates.',
      keyPrinciples: [
        'Group into 3 distinct sections: Shipped, In Progress, Next Week Priorities.',
        'Include PR or ticket identifiers for traceability.',
        'Send before 4:00 PM on Friday so team members disconnect with clarity.',
      ],
    },
    prompt: {
      context:
        'It is Friday afternoon. This week your team delivered the CSV export feature, fixed 3 pagination bugs, and started building the dark mode toggle. Next week you plan to finish dark mode and conduct user testing.',
      yourRole: 'Product Contributor',
      audience: 'Product Team Channel (#product-updates)',
      goal: 'Write the Friday recap covering Shipped, In Flight, and Next Week Priorities.',
      constraintsOrContext: [
        'Use bullet points and bold headers.',
        'Keep scannable in under 30 seconds.',
      ],
      suggestedStarter: '📊 **Weekly Roundup — [Project Name]**\n\nHi everyone! Quick recap of this week’s wins and next week’s focus...',
      checklistBeforeSubmit: [
        'Clear header tag with week date',
        'Distinct "Shipped" section with deliverables',
        'Distinct "In Flight" section with current state',
        'Clear next week commitments',
      ],
    },
  },

  // 26. EXPLAINING TECHNICAL WORK (API RATE LIMITING)
  {
    id: 'comm-tech-explain-rate-limits',
    title: 'Explain API Rate Limits and Latency Throttling to an Enterprise Sales Lead',
    category: 'explaining_technical_work',
    medium: 'written',
    estimatedTime: '15 mins',
    difficulty: 'Intermediate',
    summary:
      'Explain to a sales account executive why our API restricts third-party partners to 60 requests per minute without losing a major prospective deal.',
    whyItMatters:
      'Sales reps view technical limits as sales blockers. Explaining how rate limits guarantee 99.99% uptime and prevent noisy neighbors turns a perceived limit into an enterprise security selling point.',
    skillsPracticed: ['Technical Translation', 'Commercial Alignment', 'Analogy Framing', 'Customer Security'],
    example: {
      scenarioContext: 'An enterprise sales rep is frustrated because an enterprise client wants unlimited API requests per second.',
      goodExample: `Hi Taylor,

Thanks for bringing this prospect’s requirement to our attention! Closing a $150k enterprise client is a huge opportunity, so let’s make sure we address their data throughput needs.

Here is why our standard plan enforces a 60 requests/minute rate limit, and how we can frame this as a major selling point:

Think of our API like an exclusive VIP highway lane. If one driver brings 500 semi-trucks onto the highway all at once, the whole highway grinds to a halt for every customer. Our rate limit acts as the automated traffic controller—it guarantees that even during peak Black Friday spikes, our servers will never crash and our response latency stays under 100ms.

**How we satisfy this enterprise client:**
1. We offer an **Enterprise Tier Burst Pack** that allows up to 300 requests/minute with dedicated Redis server capacity.
2. We support **Batch Webhooks**, meaning instead of pinging us 1,000 times for 1,000 orders, they can query 1,000 orders in a single payload.

Would you like me to join the technical discovery call with their CTO for 10 minutes on Thursday to walk them through the batch webhook architecture?`,
      goodExplanation:
        'Validates the sales goal ($150k deal). Uses the VIP highway lane analogy. Reframes the technical limit as an uptime guarantee. Proposes 2 commercial solutions and offers to support on the client call.',
      suboptimalExample: `We can't do unlimited requests. Our Postgres DB will OOM crash and Redis queues will overflow. Tell them 60 per minute is the limit.`,
      suboptimalExplanation:
        'Jargon-heavy, rigid, unhelpful, and completely fails to help sales win the client.',
      keyPrinciples: [
        'Acknowledge the commercial value of the client.',
        'Use an analogy (highway lane / traffic controller) to explain noisy neighbors.',
        'Reframe stability and uptime as an enterprise security feature.',
        'Offer a multi-tier solution (batch endpoints or enterprise tier).',
      ],
    },
    prompt: {
      context:
        'A marketing partner wants to upload 50,000 customer emails all at once every morning. Your team enforces a 500-records-per-minute throttle to keep database CPU below 70%.',
      yourRole: 'Backend Engineer',
      audience: 'Marketing Operations Lead (Nathan)',
      goal: 'Write an email explaining why the 500-per-minute throttle protects database speed for live website shoppers, and propose an automated background nightly sync.',
      constraintsOrContext: [
        'Avoid deep database jargon like thread contention or IOPS.',
        'Propose a nightly scheduled cron job as the painless solution.',
      ],
      suggestedStarter: 'Hi Nathan,\n\nThanks for reaching out about the daily customer email upload! To make sure this data imports smoothly without impacting live shoppers...',
      checklistBeforeSubmit: [
        'Respectful opening acknowledging the marketing goal',
        'Plain analogy explaining server capacity protection',
        'Proposal of the overnight automated background sync',
        'Offer to set up the automated schedule together',
      ],
    },
  },

  // 27. PRESENTATIONS (PROJECT KICKOFF BRIEFING)
  {
    id: 'comm-pres-project-kickoff',
    title: 'Deliver a 2-Minute Project Kickoff Briefing Establishing Goals and Non-Goals',
    category: 'presentations',
    medium: 'spoken_communication',
    estimatedTime: '15 mins',
    difficulty: 'Intermediate',
    summary:
      'Deliver the spoken opening remarks for a new cross-functional initiative, defining the primary mission, what is explicitly out of scope, and team ownership.',
    whyItMatters:
      'Projects fail early when teams don\'t align on "Non-Goals". Articulating what we are NOT doing protects team bandwidth and sets clear boundaries.',
    skillsPracticed: ['Spoken Facilitation', 'Scope Boundary Framing', 'Alignment', 'Leadership Presence'],
    example: {
      scenarioContext: 'Kicking off the Customer Reviews & Ratings project with engineers, designers, and marketing.',
      goodExample: `**[The Mission — 30 seconds]**
"Welcome everyone! Today we are officially kicking off our Customer Reviews & Ratings project. Our primary goal over the next 4 weeks is simple: let verified buyers leave a 1-to-5 star rating and photo review in under 30 seconds.

**[What is In-Scope vs Non-Goals — 60 seconds]**
"To guarantee we hit our launch date of November 1st before the holiday shopping rush, here is our strict scope boundary:
• **What IS in scope:** Star rating submission, verified buyer badge, and automatic profanity filtering.
• **What is explicitly a NON-GOAL for v1:** We are NOT building social threaded replies, upvoting, or video uploads. Those belong in Phase 2 in Q1. Saying no to video now is how we ensure our mobile app launch remains rock-solid.

**[Ownership & Rhythm — 30 seconds]**
"Maya owns frontend design, Alex leads backend APIs, and Jordan is our QA champion. We will run async Slack standups every morning and a 15-minute demo on Fridays. Let's build something our customers love—any quick questions before we begin?"`,
      goodExplanation:
        'Clearly separates Mission from Non-Goals. Explicitly justifies why video is deferred (protecting holiday launch). Defines clear single-owner roles.',
      suboptimalExample: `So yeah, reviews. We're going to build reviews. Everyone kind of knows what reviews are like on Amazon. We have 4 weeks. Let me know if you need anything.`,
      suboptimalExplanation:
        'Lazy, lacks boundaries, invites massive scope creep, establishes zero operational ownership.',
      keyPrinciples: [
        'State the core mission in one inspiring sentence.',
        'Explicitly name 2–3 NON-GOALS to protect team capacity.',
        'Name individual role owners so accountability is crystal clear.',
      ],
    },
    prompt: {
      context:
        'You are leading a project to add dark mode to your web platform. You need to brief the team that dark mode will support core navigation and dashboard pages, but NOT custom third-party embedded charts for v1.',
      yourRole: 'Project Lead',
      audience: 'Team Kickoff Meeting (Engineering & Design)',
      goal: 'Write the spoken 2-minute script clearly announcing the Dark Mode project, the specific non-goal (third-party charts), and the delivery date.',
      constraintsOrContext: [
        'Include stage directions like [Mission] and [Non-Goals].',
        'Keep upbeat, disciplined, and under 150 words.',
      ],
      suggestedStarter: '[Opening / Mission — 30s]\n"Hey team! Super excited to officially kick off our Dark Mode project today..."',
      checklistBeforeSubmit: [
        'Clear statement of the dark mode mission',
        'Explicit non-goal naming third-party charts',
        'Target release date clearly articulated',
        'Encouraging and collaborative closing',
      ],
    },
  },

  // 28. MEETINGS (ACTION ITEMS SUMMARY)
  {
    id: 'comm-meeting-action-items-close',
    title: 'Summarize Action Items, Owners, and Next Steps in the Final 3 Minutes of a Meeting',
    category: 'meetings',
    medium: 'spoken_communication',
    estimatedTime: '12 mins',
    difficulty: 'Starter',
    summary:
      'Interject kindly in the last 3 minutes of a rambling meeting to synthesize decisions, assign owners, and confirm next deadlines.',
    whyItMatters:
      'Without an explicit action items recap, 80% of meetings result in zero follow-through. Stepping up to summarize makes you indispensable to any team.',
    skillsPracticed: ['Meeting Synthesis', 'Accountability Driving', 'Spoken Interjection', 'Clarity'],
    example: {
      scenarioContext: 'A 45-minute discussion on hiring freelance contractors is about to end without clear next steps.',
      goodExample: `"Hey folks, looking at the clock, we have about 3 minutes left. Before we drop, do you mind if I quickly synthesize our 3 key action items so we’re all aligned?

1. **Marcus:** Draft the 1-page freelance scope of work by Thursday 5 PM.
2. **Elena:** Confirm our remaining Q4 contractor budget with finance by tomorrow morning.
3. **Myself:** Review the contract templates with our legal contact and post the link in #contractor-hiring by Friday noon.

Does that capture everything, or did I miss any key dependencies?"`,
      goodExplanation:
        'Watches the clock respectfully. Uses the Who-Does-What-by-When framework. Names specific days and times. Asks a confirmatory closing question.',
      suboptimalExample: `Meeting is over. Okay bye everyone, talk next week.`,
      suboptimalExplanation:
        'Abrupt ending with zero accountability, leading to repeated discussions next week.',
      keyPrinciples: [
        'Interject with 3 minutes remaining before people drop off.',
        'Use the Who / What / When formula.',
        'Follow up immediately with a 2-line Slack recap of the same points.',
      ],
    },
    prompt: {
      context:
        'A team meeting about organizing the customer bug tracker is ending. Priya agreed to triage open bugs, Carlos agreed to update Jira tags, and you agreed to write the triage guide by Wednesday.',
      yourRole: 'Meeting Synthesizer / Team Member',
      audience: 'Meeting Participants (5 colleagues)',
      goal: 'Write the exact spoken script you would speak aloud in the meeting to summarize these 3 commitments and confirm agreement.',
      constraintsOrContext: [
        'Acknowledge the remaining time on the clock.',
        'State each person’s name, deliverable, and target day.',
      ],
      suggestedStarter: '"Looking at our time, with 2 minutes remaining, let’s quickly confirm our action items so we can jump into our next calls..."',
      checklistBeforeSubmit: [
        'Time check acknowledging the meeting end',
        'Priya’s action item and timeline',
        'Carlos’s action item and timeline',
        'Your own commitment clearly stated',
        'Open confirmatory question',
      ],
    },
  },

  // 29. CUSTOMER COMMUNICATION (DECLINING UNREASONABLE FEATURE)
  {
    id: 'comm-customer-decline-feature-request',
    title: 'Decline an Unreasonable Custom Feature Request While Retaining Client Goodwill',
    category: 'customer_communication',
    medium: 'written',
    estimatedTime: '15 mins',
    difficulty: 'Intermediate',
    summary:
      'Respond to a customer demanding a bespoke feature outside the product roadmap, explaining the design philosophy and offering existing workflows.',
    whyItMatters:
      'Saying yes to every bespoke customer request turns SaaS products into Frankenstein tools. Saying no with empathy and curiosity protects your product integrity.',
    skillsPracticed: ['Customer Diplomacy', 'Product Philosophy Framing', 'Alternative Problem Solving', 'Brand Protection'],
    example: {
      scenarioContext: 'A customer demands that your team build a custom Bitcoin payment checkout button exclusively for their shop.',
      goodExample: `Hi Samantha,

Thanks so much for reaching out with this suggestion! We always love seeing how our community thinks about expanding payment options.

While we completely understand why cryptocurrency checkout is interesting for your niche store, custom crypto checkout is not currently on our product roadmap. Our product focus is centered on optimizing zero-friction card checkout and Apple/Google Pay, which represents over 98% of total customer checkouts across our platform.

To help you accept Bitcoin right now without waiting on custom platform builds, our platform integrates seamlessly with Zapier and Stripe Crypto Invoicing [Guide Link]. Many store owners in our community use this setup to collect crypto payments with automated receipt syncing.

I’ve noted your vote for native crypto in our quarterly feature tracker. Please let me know if you would like any help setting up the Zapier integration!

Warmly,
Leo from Customer Success`,
      goodExplanation:
        'Appreciates customer creativity. Explains product focus (core 98% checkout speed) objectively without being dismissive. Provides an immediate functional workaround (Zapier + Stripe).',
      suboptimalExample: `Hi Samantha, we don't support Bitcoin and we aren't going to build it. It's too volatile and not worth our time. Thanks.`,
      suboptimalExplanation:
        'Rude, dismissive, insults the customer’s business model, offers zero alternatives.',
      keyPrinciples: [
        'Thank them genuinely for their creative input.',
        'Explain the core product focus that drives current prioritization.',
        'Offer a functional alternative or integration workaround.',
        'Log their request in the official feature tracker.',
      ],
    },
    prompt: {
      context:
        'A user writes in demanding that you build a desktop Windows-only widget that plays a loud horn sound whenever a task is marked done. Your app is a web-first minimalist productivity tool.',
      yourRole: 'Customer Support Lead',
      audience: 'Passionate User (Greg)',
      goal: 'Write a warm, respectful response explaining that the app focuses on clean, notification-quiet productivity, while pointing him to browser sound extensions.',
      constraintsOrContext: [
        'Never laugh at or mock his idea.',
        'Emphasize focus and distraction-free design philosophy.',
        'Suggest an existing browser extension solution.',
      ],
      suggestedStarter: 'Hi Greg,\n\nThanks for sharing this creative suggestion! Celebrating completed tasks is definitely super satisfying...',
      checklistBeforeSubmit: [
        'Appreciative opening acknowledging his celebration idea',
        'Calm explanation of the app’s distraction-free design focus',
        'Helpful recommendation of a browser sound extension',
        'Warm, respectful closing',
      ],
    },
  },

  // 30. MANAGER COMMUNICATION (MAXIMUM WORK CAPACITY)
  {
    id: 'comm-manager-at-capacity-prioritization',
    title: 'Professionally Signal Maximum Capacity When Assigned Another Urgent Priority',
    category: 'manager_communication',
    medium: 'written',
    estimatedTime: '15 mins',
    difficulty: 'Intermediate',
    summary:
      'Communicate that your current workload is at 100% capacity and invite your manager to help re-prioritize existing commitments.',
    whyItMatters:
      'Saying yes to everything results in burnout and botched deliverables. High-performing professionals don\'t say "I refuse"; they say "I can take this on—which of my current commitments should I pause to make room?"',
    skillsPracticed: ['Capacity Management', 'Executive Prioritization', 'Professional Boundaries', 'Transparent Trade-offs'],
    example: {
      scenarioContext: 'Your manager asks you to take on a brand-new user onboarding redesign due in 3 days, while you are in the middle of shipping payment security fixes.',
      goodExample: `Hi David,

I’d love to help with the new user onboarding redesign—improving activation rates is super important for our quarterly goals.

Right now, my bandwidth is 100% committed to delivering the PCI compliance payment security updates due this Thursday. To ensure high quality on both fronts, taking on the onboarding redesign means one of our current tasks needs to shift.

Here are two ways we can balance this:
1. **Focus on Payments (Recommended):** I finish the PCI security update by Thursday as committed, and start onboarding redesign first thing Friday morning.
2. **Swap Priorities:** I pause the PCI update and ship the onboarding redesign by Thursday, moving payment compliance to next sprint.

Let me know which trade-off best matches your priorities for the team!

Best,
Maya`,
      goodExplanation:
        'Accepts the task enthusiastically in principle. Clearly states current commitment and real capacity limits. Puts the prioritization choice back to the manager with 2 clear options.',
      suboptimalExample: `I can't do this. I'm already drowning in work with the payment stuff. You keep giving me too many things to do.`,
      suboptimalExplanation:
        'Emotional venting, combative, sounds like a refusal rather than a strategic trade-off.',
      keyPrinciples: [
        'Never say "I can’t do that" without offering a trade-off.',
        'Phrase the conversation around "Which project should we pause?"',
        'Provide your recommendation while respecting the manager’s decision.',
      ],
    },
    prompt: {
      context:
        'Your lead asks you to build a new promotional banner for a surprise marketing campaign tomorrow, while you are scheduled to finish the mobile checkout bug fixes.',
      yourRole: 'Frontend Developer',
      audience: 'Direct Lead (Brendan)',
      goal: 'Write a note explaining that both cannot fit in the same 8-hour window, presenting the trade-off, and asking which one to prioritize.',
      constraintsOrContext: [
        'Keep calm, solution-oriented, and objective.',
        'Highlight the risk to mobile checkout stability if rushed.',
      ],
      suggestedStarter: 'Hi Brendan,\n\nHappy to help support the marketing promo campaign! Looking at our commitments for today...',
      checklistBeforeSubmit: [
        'Willingness to support team goals stated upfront',
        'Factual explanation of current mobile checkout commitment',
        'Two distinct prioritization options presented',
        'Respectful request for his priority call',
      ],
    },
  },

  // 31. WRITTEN COMMUNICATION (ARCHITECTURE DECISION RECORD)
  {
    id: 'comm-written-adr-record',
    title: 'Author a 1-Page Architecture Decision Record (ADR) Evaluating Two Frameworks',
    category: 'written_communication',
    medium: 'written',
    estimatedTime: '20 mins',
    difficulty: 'Intermediate',
    summary:
      'Document a technical architectural decision (e.g., choosing state management libraries or database schemas) using the industry-standard Context, Decision, and Consequences framework.',
    whyItMatters:
      'ADRs provide historical clarity so future teammates understand why decisions were made. Well-documented decisions prevent cyclical rehashing of past debates.',
    skillsPracticed: ['Technical Writing', 'Architecture Documentation', 'Objective Evaluation', 'Trade-off Analysis'],
    example: {
      scenarioContext: 'Documenting the decision to use Zustand over Redux Toolkit for client state management.',
      goodExample: `## 📄 ADR-008: Adopting Zustand for Client State Management
**Status:** Accepted | **Date:** Oct 6, 2026 | **Author:** Engineering Guild

### 1. Context & Problem Statement
Our application needs global client state for user sessions, shopping cart items, and notification drawers. Our current prop-drilling setup is causing unnecessary re-renders in deep component trees. We need a state solution that is lightweight, TypeScript-native, and requires minimal boilerplate.

### 2. Options Considered
• **Option A: Redux Toolkit:** Battle-tested, excellent DevTools, but introduces ~35kB bundle overhead and heavy slice boilerplate for simple toggles.
• **Option B: Zustand:** Minimal bundle footprint (< 3kB), hooks-based, zero provider wrapping required, excellent TypeScript inference.

### 3. Decision
We choose **Option B (Zustand)** for all client-side UI and session state. Server caching will remain managed by TanStack Query.

### 4. Positive & Negative Consequences
• **Pros:** 90% reduction in state boilerplate; bundles stay lean; onboarding new engineers takes under 30 minutes.
• **Cons:** Fewer out-of-the-box time-travel debugging tools compared to Redux DevTools (mitigated by Zustand devtools middleware).`,
      goodExplanation:
        'Follows the canonical ADR structure (Context, Options, Decision, Consequences). Quantifies bundle sizes. Names both positive and negative consequences honestly.',
      suboptimalExample: `We decided to use Zustand because Redux is too complicated and everyone hates boilerplate.`,
      suboptimalExplanation:
        'Biased, provides no technical justification or bundle metrics, omits trade-offs.',
      keyPrinciples: [
        'Document the problem before documenting the solution.',
        'List at least two viable options with objective pros and cons.',
        'Always include both positive and negative consequences.',
      ],
    },
    prompt: {
      context:
        'Your team is deciding between storing uploaded user images in local disk storage vs cloud object storage (AWS S3 / Google Cloud Storage) for your web service.',
      yourRole: 'Backend Engineer',
      audience: 'Engineering Team & Future Maintainers',
      goal: 'Write the 1-page ADR covering Context, Options Considered, Decision, and Consequences.',
      constraintsOrContext: [
        'Use standard markdown headings (Context, Decision, Consequences).',
        'State the decision to adopt Cloud Object Storage.',
      ],
      suggestedStarter: '## 📄 ADR-012: Adoption of Cloud Object Storage for User Uploads\n**Status:** Proposed | **Date:** [Date]\n\n### 1. Context...',
      checklistBeforeSubmit: [
        'Clear problem context regarding user uploads and scalability',
        'Comparison between local disk and cloud storage',
        'Clear decision statement',
        'Both pros (durability) and cons (network cost) noted',
      ],
    },
  },

  // 32. SPOKEN COMMUNICATION (PROFESSIONAL INTRODUCTION)
  {
    id: 'comm-spoken-two-minute-intro',
    title: 'Deliver a Warm, Authentic 2-Minute Professional Introduction in a Team All-Hands',
    category: 'spoken_communication',
    medium: 'spoken_communication',
    estimatedTime: '15 mins',
    difficulty: 'Starter',
    summary:
      'Script and deliver a warm 90-to-120 second spoken introduction when joining a new team or kicking off an internship.',
    whyItMatters:
      'First impressions set the tone for your team relationships. Combining what you build, what energizes you, and how colleagues can collaborate with you builds immediate warmth.',
    skillsPracticed: ['Spoken Introduction', 'Relatability', 'Warmth', 'Professional Presence'],
    example: {
      scenarioContext: 'Introducing yourself during your first company all-hands or departmental sync.',
      goodExample: `"Hi everyone! Super excited to be here. My name is Alex, and I’m joining the growth engineering squad as an associate developer.

A quick background: I recently graduated where I focused on building accessible web apps and data visualization tools. Most recently, I built a community open-source dashboard that helps local students discover paid apprenticeships.

What energizes me most about software is taking complex workflows and making them feel effortless and fast for real people. Outside of work, I’m a huge fan of urban cycling, brewing pour-over coffee, and trying to keep my houseplants alive.

Over the next few weeks, I’d love to grab a virtual coffee with folks across design, support, and product to learn how our squads collaborate. Looking forward to building great things together!"`,
      goodExplanation:
        'Clear and confident. Connects technical background to authentic user impact. Includes 2 memorable personal hobbies that spark informal coffee chat connections. Ends with an open invitation to connect.',
      suboptimalExample: `Hi, I'm Alex. I code in JavaScript and Python. That's pretty much it. Excited to be here.`,
      suboptimalExplanation:
        'Flat, forgets to share what energizes them, gives teammates zero hooks to strike up conversation.',
      keyPrinciples: [
        'State your role and squad in sentence 1.',
        'Share what problems you love solving.',
        'Include 1–2 human personal interests to make yourself approachable.',
        'Extend an open invitation to connect.',
      ],
    },
    prompt: {
      context:
        'You just joined a new project team of 8 people. In tomorrow’s kickoff, each new member has 90 seconds to introduce themselves.',
      yourRole: 'New Team Member',
      audience: 'New Colleagues & Team Lead',
      goal: 'Write your 90-second spoken introduction script (approx. 100-120 words) balancing professional focus, passion, and personal approachability.',
      constraintsOrContext: [
        'Keep natural, conversational, and energetic.',
        'Focus purely on clarity and warmth without self-consciousness.',
      ],
      suggestedStarter: '"Hey everyone, really glad to meet you all! My name is [Name], and I’m joining the team as..."',
      checklistBeforeSubmit: [
        'Clear statement of your name and role',
        'Brief highlight of what projects you enjoy building',
        '1 or 2 relatable personal hobbies',
        'Warm closing expressing excitement to collaborate',
      ],
    },
  },

  // 33. PROFESSIONAL MESSAGING (PUBLIC HELP CHANNEL)
  {
    id: 'comm-messaging-urgent-help-channel',
    title: 'Ask an Urgent Cross-Functional Question in a Public Help Channel Without Using @here',
    category: 'professional_messaging',
    medium: 'professional_messaging',
    estimatedTime: '12 mins',
    difficulty: 'Starter',
    summary:
      'Frame an urgent request in a shared company help channel (e.g. #help-billing or #help-it) that captures attention and gets fast resolution without annoying notifications.',
    whyItMatters:
      'Dropping `@here` in a 500-person channel interrupts everyone and breeds resentment. Formatting your request with a clear tag, customer impact, and repro details gets you answered 5x faster.',
    skillsPracticed: ['Channel Etiquette', 'Incident Signaling', 'Asynchronous Precision', 'Respectful Urgency'],
    example: {
      scenarioContext: 'Posting in #help-devops when a database migration script is failing on the test cluster.',
      goodExample: `🚨 **[URGENT / BLOCKER] Sandbox DB Migration Failing on Cluster-3**

Hey team! Raising a quick blocker as we prepare for today’s 2 PM partner demo:

• **The Issue:** Running \`npm run db:migrate\` on cluster-3 fails with \`Connection closed by remote host (ECONNRESET)\`.
• **Impact:** Blocks 4 engineers from verifying demo seed data before 2 PM.
• **What we verified:** Cluster credentials are valid; local migrations pass without error.
• **Logs link:** [Link to Datadog / Terminal Gist]

If an on-call engineer has a 2-minute breather, we’d deeply appreciate a quick look! Will keep updates contained in this thread. 👇`,
      goodExplanation:
        'Uses bold tag for scannability without tagging @here or @channel. Highlights specific demo time constraint. Shares exact error and reproduction logs. Requests discussion stay in thread.',
      suboptimalExample: `@here @channel SOMEONE HELP!!! DB is broken for everyone fix this now!`,
      suboptimalExplanation:
        'Noisy, panic-inducing, pinged 500 people, shares zero error logs or context.',
      keyPrinciples: [
        'Never use @channel or @here unless production is experiencing a total blackout.',
        'Use bold tags like **[URGENT / BLOCKER]** at the top.',
        'Provide error code, reproduction step, and logs link in bullets.',
        'Keep replies inside the thread.',
      ],
    },
    prompt: {
      context:
        'Your test account in the billing sandbox cannot create mock credit cards, blocking your checkout testing before the 4:00 PM team review. You need to ask #help-payments for a quick reset.',
      yourRole: 'QA / Test Engineer',
      audience: 'Company Channel (#help-payments)',
      goal: 'Write the message asking for a sandbox credit reset, noting the 4 PM review deadline, without tagging @here or @channel.',
      constraintsOrContext: [
        'Include your sandbox account ID.',
        'Explain the deadline politely.',
        'Keep under 100 words.',
      ],
      suggestedStarter: '🚨 **[TIME-SENSITIVE] Sandbox Test Account Credit Reset Request**\n\nHey #help-payments team!...',
      checklistBeforeSubmit: [
        'Scannable bold header with tag',
        'Specific sandbox account ID mentioned',
        'Explanation of the 4 PM review timeline',
        'Polite thread containment reminder',
      ],
    },
  },
];

