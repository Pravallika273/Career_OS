import { WorkReadyScenario, WorkReadyAreaMeta, WorkReadyArea } from '../types/workReady';
import { WORKPLACE_MODULE_SCENARIOS } from './workplaceModulesCatalog';

export const WORK_READY_AREAS_META: Record<WorkReadyArea, WorkReadyAreaMeta> = {
  communication: {
    id: 'communication',
    label: 'Communication',
    tagline: 'Clarity, conciseness, and stakeholder alignment',
    description: 'Learn how information actually travels in companies. Avoid vague assurances, reduce friction, and keep teams aligned.',
    examplePrompt: '“Your manager asks for an update. What do you say?”',
    iconName: 'MessageSquare',
  },
  teamwork: {
    id: 'teamwork',
    label: 'Teamwork',
    tagline: 'Collaboration under pressure and shared accountability',
    description: 'Understand how healthy teams handle missed handoffs, conflicting styles, and shared ownership without pointing fingers.',
    examplePrompt: '“Your teammate missed a deadline. What do you do?”',
    iconName: 'Users',
  },
  professionalism: {
    id: 'professionalism',
    label: 'Professionalism',
    tagline: 'Reliability, transparency, and owning outcomes',
    description: 'How to manage delays, own honest mistakes, and build a reputation as someone others can trust with critical work.',
    examplePrompt: '“You realize you cannot finish today’s task on time. What should you do?”',
    iconName: 'ShieldCheck',
  },
  critical_thinking: {
    id: 'critical_thinking',
    label: 'Critical Thinking',
    tagline: 'Investigating anomalies and questioning assumptions',
    description: 'Navigate conflicting data, unverified assumptions, and high-stakes trade-offs before jumping to conclusions.',
    examplePrompt: '“Two reports show different results. How do you investigate?”',
    iconName: 'Brain',
  },
  emotional_intelligence: {
    id: 'emotional_intelligence',
    label: 'Emotional Intelligence',
    tagline: 'Reading the room, de-escalation, and non-defensive empathy',
    description: 'Decode unstated stress, listen without defensiveness, and navigate interpersonal friction with emotional steadiness.',
    examplePrompt: '“A teammate reacts badly to your feedback. What might be happening?”',
    iconName: 'HeartHandshake',
  },
  self_management: {
    id: 'self_management',
    label: 'Self-Management',
    tagline: 'Prioritization, focus defense, and sustainable capacity',
    description: 'Triage competing deadlines, protect deep focus, and maintain calm composure without burning out or hiding.',
    examplePrompt: '“You have three deadlines tomorrow. How do you prioritize?”',
    iconName: 'Clock',
  },
  leadership: {
    id: 'leadership',
    label: 'Leadership',
    tagline: 'Unblocking teams, driving clarity, and lateral influence',
    description: 'Leadership is an action, not a job title. Learn how to rally stalled peers, clarify next steps, and create momentum.',
    examplePrompt: '“Your team is stuck. How can you move the work forward?”',
    iconName: 'Compass',
  },
  lifelong_learning: {
    id: 'lifelong_learning',
    label: 'Lifelong Learning',
    tagline: 'Rapid adaptation, experimentation, and curiosity',
    description: 'When workflows change or new tech appears, how do you learn quickly on the job without waiting for formal training?',
    examplePrompt: '“A tool you use at work has changed. How do you adapt?”',
    iconName: 'Sparkles',
  },
};

export const WORK_READY_SCENARIOS: WorkReadyScenario[] = [
  // 1. COMMUNICATION
  {
    id: 'wr-comm-01',
    area: 'communication',
    title: 'Manager Status Check In',
    headlinePrompt: 'Your manager asks for an update. What do you say?',
    workplaceContext:
      'It is 3:30 PM on a Thursday. Your manager pings you on Slack: "Hey, how are things going with the customer churn export?" You finished data extraction yesterday, but found 14 anomalous missing customer IDs this morning and have been debugging for the last 2 hours. You are about 65% confident you can patch it by tomorrow morning.',
    dilemmaStakes:
      'If you say "Almost done!", you set false expectations and risk panic tomorrow. If you send a 5-paragraph technical dump of SQL error codes, you overwhelm your manager and make them worry you are lost.',
    choices: [
      {
        id: 'wr-comm-01-a',
        label: 'A',
        actionText: 'Reply: "Going great, almost finished! Should have it over to you shortly!"',
        isRecommended: false,
        whyItWorks:
          'It provides instant temporary relief and gets your manager off your back for a few hours.',
        potentialConsequences:
          'Extreme risk of breaking trust. When tomorrow morning arrives and the deliverable is missing or corrupted, your manager realizes you were withholding blockers.',
        whatAProfessionalConsiders:
          'Managers do not expect perfection, but they despise surprises. An early warning gives them time to manage upstream stakeholder expectations.',
        howToImprove:
          'Never trade temporary comfort for tomorrow’s credibility. Use the 3-part update: Status, Blocker, Next Step + ETA.',
      },
      {
        id: 'wr-comm-01-b',
        label: 'B',
        actionText:
          'Reply with a concise 3-part update: What is done, the current blocker with context, and your next step with an ETA.',
        isRecommended: true,
        whyItWorks:
          'Gives your manager complete visibility without drama. They know exactly where things stand, what is holding it up, and that you have a plan.',
        potentialConsequences:
          'Establishes you as reliable and mature. Your manager might offer a quick suggestion or adjust the timeline with peace of mind.',
        whatAProfessionalConsiders:
          'A great update answers 3 questions in 30 seconds: 1) What is done? 2) What is the blocker? 3) What is the next check-in time? E.g., "Extraction is done. I caught 14 missing customer IDs this morning; isolating the filter rule now. Aiming to have the patch verified by 5:30 PM, and will update you if I need a second pair of eyes."',
        howToImprove:
          'Pair the update with an explicit "decision fork": indicate if you need manager intervention or if you are managing it yourself.',
      },
      {
        id: 'wr-comm-01-c',
        label: 'C',
        actionText: 'Copy-paste the raw terminal logs and SQL query error stack into Slack so they see the technical issue.',
        isRecommended: false,
        whyItWorks:
          'Proves that you are actively working hard and not slacking off.',
        potentialConsequences:
          'Creates cognitive overload. Your manager likely doesn’t have time to parse log traces and may wonder if you understand the business context.',
        whatAProfessionalConsiders:
          'Translate technical obstacles into business impact and timeline implications. Keep raw logs in tickets or PR comments, not status DMs.',
        howToImprove:
          'Summarize the error in plain English: "14 customer IDs have null values in the legacy schema, which breaks the CSV exporter."',
      },
      {
        id: 'wr-comm-01-d',
        label: 'D',
        actionText: 'Ignore the message until you finish debugging the patch so you can give a 100% positive answer.',
        isRecommended: false,
        whyItWorks:
          'Avoids interrupting your coding flow.',
        potentialConsequences:
          'Silence signals anxiety or abandonment. Your manager may escalate or assume you are stuck, prompting more check-ins.',
        whatAProfessionalConsiders:
          'Silence in remote or hybrid teams generates anxiety. A 10-second acknowledgment preserves focus while keeping trust intact.',
        howToImprove:
          'If deep in the zone, send an immediate holding ping: "Heads down debugging one schema edge case right now. Will send a clean 2-bullet update by 4:15 PM!"',
      },
    ],
    keyMindsetTakeaway:
      'Managers do not need you to be finished; they need predictability. An honest update with an ETA builds more trust than a premature "almost done".',
  },

  // 2. TEAMWORK
  {
    id: 'wr-team-01',
    area: 'teamwork',
    title: 'Missed Peer Dependency',
    headlinePrompt: 'Your teammate missed a deadline. What do you do?',
    workplaceContext:
      'You and Jordan are co-presenting a feature demo to the product team tomorrow at 10:00 AM. Jordan was responsible for providing the finalized API mock endpoints by 2:00 PM today so you could integrate them into the frontend. It is now 4:30 PM. Jordan has not delivered the mocks, has not updated the sprint board, and has not posted in the team channel.',
    dilemmaStakes:
      'Escalating directly to the engineering lead looks petty and damages your relationship with Jordan. But staying silent means tomorrow’s demo fails and both of you look unprepared.',
    choices: [
      {
        id: 'wr-team-01-a',
        label: 'A',
        actionText: 'Immediately tag your manager and team lead in the public channel: "@Jordan where are the endpoints? The demo is tomorrow."',
        isRecommended: false,
        whyItWorks:
          'Forces a fast response through public peer pressure and protects your personal reputation.',
        potentialConsequences:
          'Severely erodes trust and psychological safety. Jordan will feel publicly shamed, creating future friction and defensive teamwork.',
        whatAProfessionalConsiders:
          'Public call-outs signal poor emotional regulation and lack of peer solidarity. First-line resolution should always be direct, private, and collaborative.',
        howToImprove:
          'Address peers privately first. Only escalate publicly if there is repeated negligence or after direct outreach fails.',
      },
      {
        id: 'wr-team-01-b',
        label: 'B',
        actionText: 'Reach out to Jordan 1-on-1 with supportive curiosity, offer to triage the scope, and agree on a fallback plan.',
        isRecommended: true,
        whyItWorks:
          'Preserves trust while focusing on the shared goal: delivering a successful demo tomorrow.',
        potentialConsequences:
          'Jordan feels supported rather than attacked. You discover what actually happened (e.g., unexpected prod incident or technical roadblock) and can adapt together.',
        whatAProfessionalConsiders:
          'Focus on the shared outcome: "Hey Jordan, checking in on the demo endpoints. How is it looking on your end? If you’re blocked, I can hardcode static JSON fixtures for the UI so you don’t have to rush, and we can link the real endpoints after. What works best?"',
        howToImprove:
          'Always bring a concrete fallback option (e.g. mock data or scoped-down demo flow) to lower the panic threshold.',
      },
      {
        id: 'wr-team-01-c',
        label: 'C',
        actionText: 'Stay silent and let tomorrow’s meeting expose that Jordan didn’t deliver, so management sees who was responsible.',
        isRecommended: false,
        whyItWorks:
          'Ensures Jordan bears the full visible blame.',
        potentialConsequences:
          'The whole team looks dysfunctional. Leadership evaluates both of you on how you handle dependencies, not just individual outputs.',
        whatAProfessionalConsiders:
          'Senior professionals treat shared deliverables as shared responsibilities. Letting a teammate fail in front of leadership reflects poorly on your maturity.',
        howToImprove:
          'Step into proactive coordination. The question leadership asks is: "When you saw the dependency was late, what did you do?"',
      },
      {
        id: 'wr-team-01-d',
        label: 'D',
        actionText: 'Quietly work until midnight writing Jordan’s API mock endpoints yourself without telling anyone.',
        isRecommended: false,
        whyItWorks:
          'Guarantees the demo succeeds tomorrow.',
        potentialConsequences:
          'Leads to resentment and burnout, and prevents the team from seeing realistic velocity bottlenecks or coaching Jordan.',
        whatAProfessionalConsiders:
          'Heroics without communication mask systemic problems. If you bail out peers invisibly, workloads become unsustainable.',
        howToImprove:
          'If you do help implement a fallback, do it in partnership: "Let’s hop on a 15-minute sync and pair on a quick mock schema together."',
      },
    ],
    keyMindsetTakeaway:
      'Great teammates don’t point fingers or silently rescue; they diagnose the blocker privately and negotiate a practical fallback for the team.',
  },

  // 3. PROFESSIONALISM
  {
    id: 'wr-prof-01',
    area: 'professionalism',
    title: 'Impending Deadline Slip',
    headlinePrompt: 'You realize you cannot finish today’s task on time. What should you do?',
    workplaceContext:
      'You committed in morning standup to shipping the payment webhook handler by 5:00 PM today. At 2:00 PM, while running integration tests, you realize the external sandbox API rate limits fail with 429 errors. Fixing the retry backoff and idempotency key logic will take at least 4 more hours. You will definitely not finish by 5:00 PM.',
    dilemmaStakes:
      'Admitting a delay feels like failure. But waiting until 5:00 PM (or tomorrow morning) to announce you missed it leaves the team blind and delays downstream testing.',
    choices: [
      {
        id: 'wr-prof-01-a',
        label: 'A',
        actionText: 'Wait until 5:00 PM, then post a quick message saying you ran into issues and will finish it tomorrow.',
        isRecommended: false,
        whyItWorks:
          'Postpones the awkward conversation until the last possible minute.',
        potentialConsequences:
          'Frustrates QA engineers and product managers who planned their evening or next morning around your 5:00 PM delivery.',
        whatAProfessionalConsiders:
          'The time delta between *knowing* you will be late and *communicating* you will be late is the direct measure of your professional maturity.',
        howToImprove:
          'Notify stakeholders the moment you are certain (at 2:00 PM, not 5:00 PM), giving them 3 hours to re-allocate their schedule.',
      },
      {
        id: 'wr-prof-01-b',
        label: 'B',
        actionText: 'Notify the team immediately with the specific cause, a revised timeline, and the impact on downstream work.',
        isRecommended: true,
        whyItWorks:
          'Transforms a potential failure into a demonstration of high ownership and professional predictability.',
        potentialConsequences:
          'Respect increases. The team can re-sequence tasks (e.g., QA works on another feature this afternoon) and nobody gets blindsided.',
        whatAProfessionalConsiders:
          'A professional message has 4 parts: 1) What happened (sandbox 429 rate limit issue), 2) Why it matters (need idempotency logic to prevent double billing), 3) New realistic ETA (tomorrow 11:00 AM), 4) Downstream impact check ("Does this block anyone this evening?").',
        howToImprove:
          'Always offer a partial option if applicable: "If QA needs to test the happy path now, branch A is ready; edge case retries will be in branch B."',
      },
      {
        id: 'wr-prof-01-c',
        label: 'C',
        actionText: 'Ship the code without the idempotency retry logic by 5:00 PM and plan to patch it in secret tomorrow.',
        isRecommended: false,
        whyItWorks:
          'Technically hits the deadline on paper.',
        potentialConsequences:
          'High risk of production bugs, duplicate payment processing, or failed audits. Sacrificing quality for artificial deadlines destroys trust.',
        whatAProfessionalConsiders:
          'Shipping broken or dangerous code to pretend you hit a deadline is an ethics and competence red flag in high-performing teams.',
        howToImprove:
          'Never hide technical compromise. Be explicit about trade-offs if leadership asks for a temporary quick cut.',
      },
      {
        id: 'wr-prof-01-d',
        label: 'D',
        actionText: 'Stay up late and push the code at 2:00 AM without telling anyone you were having trouble.',
        isRecommended: false,
        whyItWorks:
          'Avoids asking for an extension and shows dedication.',
        potentialConsequences:
          'Code written late at night under panic often introduces regression bugs. It also sets unrealistic expectations that you can absorb scope quietly.',
        whatAProfessionalConsiders:
          'Sustainable pacing is an asset. Good managers prefer an engineer who communicates clearly over one who hides bottlenecks and burns out.',
        howToImprove:
          'Reserve late-night pushes exclusively for genuine production emergencies, not routine sprint estimation misses.',
      },
    ],
    keyMindsetTakeaway:
      'Professionalism isn’t never missing an estimate; it’s giving downstream teammates enough advance notice that your delay doesn’t become their crisis.',
  },

  // 4. CRITICAL THINKING
  {
    id: 'wr-crit-01',
    area: 'critical_thinking',
    title: 'Conflicting Data Reports',
    headlinePrompt: 'Two reports show different results. How do you investigate?',
    workplaceContext:
      'You are preparing the monthly operational briefing. The Marketing analytics dashboard shows 14,200 active users this month (+18% growth). However, the Engineering database query for active sessions shows only 9,800 active users (-3% decline). Your executive team meets in 48 hours to decide whether to double marketing spend.',
    dilemmaStakes:
      'Picking the higher number to please marketing leads to poor capital decisions. Picking the lower number without understanding will trigger defensive pushback. Guessing or taking an average is reckless.',
    choices: [
      {
        id: 'wr-crit-01-a',
        label: 'A',
        actionText: 'Split the difference and report the average (~12,000 active users) to avoid conflict between Marketing and Engineering.',
        isRecommended: false,
        whyItWorks:
          'Appears diplomatic and avoids confronting either team.',
        potentialConsequences:
          'Fabricates reality. An average is mathematically meaningless when the underlying definitions are conflicting. You lose analytical credibility.',
        whatAProfessionalConsiders:
          'Never compromise on truth for social comfort. Business decisions depend on precise definitions, not agreeable compromises.',
        howToImprove:
          'Investigate the definitions rather than massaging the numbers.',
      },
      {
        id: 'wr-crit-01-b',
        label: 'B',
        actionText: 'Audit the definitions, data sources, filters, and timezones used by both reports to identify the discrepancy mechanism.',
        isRecommended: true,
        whyItWorks:
          'Discrepancies in analytics almost always stem from mismatched definitions (e.g., page views vs. authenticated sessions, UTC vs. PST, bot filtering).',
        potentialConsequences:
          'You pinpoint the exact root cause (e.g., Marketing counts anonymous unique visitors; Engineering counts logged-in account IDs). Both teams gain clarity.',
        whatAProfessionalConsiders:
          'Ask: 1) What constitutes an "active user" in each system? 2) How are bot crawlers or duplicate cookies handled? 3) What date boundaries are used? 4) Present a reconciliation table showing both metrics with explicit labels.',
        howToImprove:
          'Present the finding as clarity, not blame: "Both numbers are accurate to their definitions: 14.2k refers to top-of-funnel web visitors, while 9.8k represents signed-in platform users."',
      },
      {
        id: 'wr-crit-01-c',
        label: 'C',
        actionText: 'Assume Engineering’s database is always the single source of truth and discard Marketing’s dashboard entirely.',
        isRecommended: false,
        whyItWorks:
          'Simple and fast decision rule.',
        potentialConsequences:
          'You miss critical business context. Marketing’s data might capture unauthenticated intent or mobile web traffic that the core DB query excluded.',
        whatAProfessionalConsiders:
          'Databases also have query bugs, caching lags, and omitted legacy tables. Never assume authority without inspecting the query parameters.',
        howToImprove:
          'Verify the SQL query join conditions and date filters before declaring it the unquestioned authority.',
      },
      {
        id: 'wr-crit-01-d',
        label: 'D',
        actionText: 'Send an email to both team leads saying: "Your numbers don’t match. Please fix this before the meeting."',
        isRecommended: false,
        whyItWorks:
          'Delegates the work back to the owners.',
        potentialConsequences:
          'Triggers defensive territorial debates between the two leads and leaves the executive presentation in limbo.',
        whatAProfessionalConsiders:
          'Value is created by connecting dots and synthesizing. Bringing a pre-analyzed comparison table to the leads helps them align in 10 minutes.',
        howToImprove:
          'Do the preliminary discovery first, then bring specific questions: "I noticed Marketing tracks cookie sessions while DB tracks user_id. Is that the expected distinction?"',
      },
    ],
    keyMindsetTakeaway:
      'Data discrepancies are rarely mathematical errors; they are almost always mismatched definitions. Investigate the assumptions before choosing a number.',
  },

  // 5. EMOTIONAL INTELLIGENCE
  {
    id: 'wr-eq-01',
    area: 'emotional_intelligence',
    title: 'Defensive Teammate Reaction',
    headlinePrompt: 'A teammate reacts badly to your feedback. What might be happening?',
    workplaceContext:
      'During code review / design critique, you left a comment: "This layout breaks the grid hierarchy and doesn’t match the design system tokens. Please rewrite this component." In the afternoon team sync, your teammate Priya is unusually quiet, snaps when you ask a question, and later writes on Slack: "If you think my work is so bad, you can just do it yourself."',
    dilemmaStakes:
      'If you respond defensively ("I was just stating facts!"), the conflict escalates into a personal feud. If you ignore it, resentment festers and collaboration grinds to a halt.',
    choices: [
      {
        id: 'wr-eq-01-a',
        label: 'A',
        actionText: 'Reply firmly on Slack: "Don’t take it personally. I was giving objective feedback on the work, not attacking you."',
        isRecommended: false,
        whyItWorks:
          'Defends your logical rationale.',
        potentialConsequences:
          'Saying "don’t take it personally" invalidates the other person’s emotional experience and usually makes them feel more defensive.',
        whatAProfessionalConsiders:
          'Telling someone how to feel rarely works. Written text lacks tone and inflection; critique easily sounds harsh or contemptuous on screen.',
        howToImprove:
          'Shift from text to a quick voice/video conversation to restore empathy and human context.',
      },
      {
        id: 'wr-eq-01-b',
        label: 'B',
        actionText: 'Pause, recognize the tone impact, and invite Priya to a quick private 1-on-1 to clarify your intent and listen.',
        isRecommended: true,
        whyItWorks:
          'De-escalates the tension immediately. Acknowledges that written feedback can sound cold, and demonstrates you value the person over the code review.',
        potentialConsequences:
          'Priya feels respected. You likely discover contextual stressors (e.g., she spent 3 days on it under tight deadlines, or felt micromanaged). Trust is repaired.',
        whatAProfessionalConsiders:
          'Start with ownership: "Hey Priya, I saw your Slack note and realized my PR comment came across as blunt and dismissive. That wasn’t my intent at all. Your work is super valued—can we jump on a 5-min call so I can listen to what you had in mind for that layout?"',
        howToImprove:
          'In future reviews, frame suggestions collaboratively: "What do you think about using the tokens here to keep it aligned with the design system?" rather than "Please rewrite this."',
      },
      {
        id: 'wr-eq-01-c',
        label: 'C',
        actionText: 'Report Priya’s message to your manager as unprofessional behavior and hostile communication.',
        isRecommended: false,
        whyItWorks:
          'Formally documents the friction.',
        potentialConsequences:
          'Turns a normal interpersonal misunderstanding into an HR incident. Priya will never trust you with vulnerability or collaboration again.',
        whatAProfessionalConsiders:
          'Managers want peers to develop healthy conflict resolution muscles. Escalate to leadership only if there is targeted harassment, persistent toxicity, or after 1-on-1 efforts fail.',
        howToImprove:
          'Seek to understand before seeking to escalate.',
      },
      {
        id: 'wr-eq-01-d',
        label: 'D',
        actionText: 'Stop giving Priya any feedback in the future to keep the peace and avoid confrontation.',
        isRecommended: false,
        whyItWorks:
          'Completely eliminates friction in the short term.',
        potentialConsequences:
          'Product quality degrades, Priya doesn’t grow, and passive-aggressive distance grows between you.',
        whatAProfessionalConsiders:
          'Conflict avoidance is not kindness. True professional kindness is giving clear, actionable, respectful feedback with warm support.',
        howToImprove:
          'Separate the person’s identity from the deliverable. Praise effort and intent while collaboratively troubleshooting the implementation.',
      },
    ],
    keyMindsetTakeaway:
      'People rarely react to feedback itself; they react to feeling evaluated, judged, or unseen. Separate the problem from the person and clarify your shared goal.',
  },

  // 6. SELF-MANAGEMENT
  {
    id: 'wr-self-01',
    area: 'self_management',
    title: 'Triple Deadline Collision',
    headlinePrompt: 'You have three deadlines tomorrow. How do you prioritize?',
    workplaceContext:
      'It is 11:00 AM. You have three deliverables due by tomorrow at 5:00 PM: 1) The Q3 Client ROI slide deck requested by the Sales Director, 2) A critical database schema migration script for the new billing cycle requested by Engineering, 3) Reviewing 12 onboarding documentation PRs for two new interns. Each task takes about 4 hours. You only have ~6 working hours left today and ~7 tomorrow.',
    dilemmaStakes:
      'If you try to multitask all three, you will produce mediocre, rushed work on all of them or miss everything. If you unilaterally drop one without warning, that stakeholder will be angry.',
    choices: [
      {
        id: 'wr-self-01-a',
        label: 'A',
        actionText: 'Work on whatever task feels most interesting and fun first, hoping the others magically take less time.',
        isRecommended: false,
        whyItWorks:
          'Reduces immediate cognitive friction and anxiety.',
        potentialConsequences:
          'Leaves the highest-risk or highest-impact item stranded at the end of tomorrow afternoon when you have the least energy.',
        whatAProfessionalConsiders:
          'Prioritization must be grounded in business impact and reversibility, not mood or task preference.',
        howToImprove:
          'Map tasks on an Impact vs. Urgency matrix before touching your keyboard.',
      },
      {
        id: 'wr-self-01-b',
        label: 'B',
        actionText: 'Assess impact and urgency, communicate trade-offs to stakeholders early, and negotiate a clear sequence.',
        isRecommended: true,
        whyItWorks:
          'Treats prioritization as an explicit stakeholder agreement rather than a secret guessing game.',
        potentialConsequences:
          'The billing migration (high financial/system risk) and Sales deck (revenue tied) get top priority. Intern reviews are gracefully shifted to Friday with intern consent.',
        whatAProfessionalConsiders:
          'Stakeholders will always say their task is Priority #1 if asked in isolation. You must present the explicit trade-off: "I have capacity for two of these three by tomorrow. The billing migration and client deck impact revenue directly; would it work to schedule the intern PR reviews for Friday 10:00 AM?"',
        howToImprove:
          'Ask your direct manager to break ties if two directors are claiming conflicting top priorities.',
      },
      {
        id: 'wr-self-01-c',
        label: 'C',
        actionText: 'Drink extra coffee, skip lunch, work until 3:00 AM, and try to complete all 3 perfectly by yourself.',
        isRecommended: false,
        whyItWorks:
          'Avoids saying "no" or negotiating with any stakeholder.',
        potentialConsequences:
          'Extreme burnout, sleep deprivation leading to errors in the billing migration, and setting an unsustainable precedent that you have unlimited capacity.',
        whatAProfessionalConsiders:
          'Saying "yes" to everything is actually saying "no" to quality, focus, and your own sustainability. High performers manage boundaries proactively.',
        howToImprove:
          'Treat your work capacity as a fixed container. When someone adds a new rock, ask which existing rock should come out.',
      },
      {
        id: 'wr-self-01-d',
        label: 'D',
        actionText: 'Quietly ignore the Sales Director’s slide deck because Sales isn’t your direct functional department.',
        isRecommended: false,
        whyItWorks:
          'Eliminates one task without confrontation.',
        potentialConsequences:
          'Severely damages cross-departmental relationships and jeopardizes a live client renewal.',
        whatAProfessionalConsiders:
          'Cross-functional reputation is vital for career growth. A quick 2-sentence note to Sales explaining the bottleneck is 100x better than ghosting.',
        howToImprove:
          'Reach out immediately: "Hey Alex, flagging that my engineering team has a mandatory billing migration due tomorrow. I can deliver a draft of the 2 key ROI charts today, but the full formatted deck will be ready Friday morning. Does that unblock you?"',
      },
    ],
    keyMindsetTakeaway:
      'Prioritization isn’t working faster; it is making deliberate trade-offs visible to stakeholders before deadlines arrive.',
  },

  // 7. LEADERSHIP
  {
    id: 'wr-lead-01',
    area: 'leadership',
    title: 'Stalled Team Momentum',
    headlinePrompt: 'Your team is stuck. How can you move the work forward?',
    workplaceContext:
      'Your project team has spent three consecutive meetings debating which cloud architecture to use (serverless vs. containerized microservices). The deadline to start coding was Monday. Two senior engineers have dug into opposite ideological trenches, and the rest of the team sits silently on mute. No code has been written and frustration is growing.',
    dilemmaStakes:
      'You may not be the official manager or team lead. If you stay silent, the sprint burns down and the project fails. If you try to decree an answer arrogantly, the engineers will resent you.',
    choices: [
      {
        id: 'wr-lead-01-a',
        label: 'A',
        actionText: 'Wait for the manager to step in and make an executive decision; it’s not your job to manage technical debates.',
        isRecommended: false,
        whyItWorks:
          'Safe and avoids stepping on senior engineers’ toes.',
        potentialConsequences:
          'The project continues drifting, sprint momentum is destroyed, and team morale plummets as cynicism sets in.',
        whatAProfessionalConsiders:
          'Leadership is lateral, not hierarchical. You don’t need authority to facilitate clarity or unblock decision-making.',
        howToImprove:
          'Ask clarifying questions rather than waiting for formal authority.',
      },
      {
        id: 'wr-lead-01-b',
        label: 'B',
        actionText: 'Frame the decision around concrete constraints: build a quick matrix of criteria, propose a timeboxed test, or suggest a 2-way door decision.',
        isRecommended: true,
        whyItWorks:
          'Re-centers the conversation on objective customer requirements and timeline constraints rather than theoretical ego battles.',
        potentialConsequences:
          'Breaks analysis paralysis. The team agrees on a 24-hour spike or a reversible decision ("two-way door") with clear re-evaluation criteria.',
        whatAProfessionalConsiders:
          'Say: "Both approaches have real strengths. To help us unblock for this sprint: what are the 3 non-negotiable requirements for Phase 1? Can we do a 4-hour spike of the simpler option, and if it hits our latency target, proceed with that for v1?"',
        howToImprove:
          'Introduce the concept of "disagree and commit": pick the pragmatic path now with an agreed checkpoint 30 days post-launch.',
      },
      {
        id: 'wr-lead-01-c',
        label: 'C',
        actionText: 'Pick one senior engineer’s side publicly and tell the other engineer they are overcomplicating things.',
        isRecommended: false,
        whyItWorks:
          'Creates a majority vote to force an end to the debate.',
        potentialConsequences:
          'Alienates the opposing engineer, deepens team division, and turns technical disagreement into personal animosity.',
        whatAProfessionalConsiders:
          'Taking sides in ideological debates creates winners and losers within the same team. Focus on shared criteria instead.',
        howToImprove:
          'Validate both engineers’ core concerns: "Marcus is worried about operational maintenance, and Elena is worried about cold start latency. How do we test both?"',
      },
      {
        id: 'wr-lead-01-d',
        label: 'D',
        actionText: 'Send an anonymous poll to Slack asking the team to vote so nobody has to defend their choice.',
        isRecommended: false,
        whyItWorks:
          'Quick, democratic, and avoids conflict.',
        potentialConsequences:
          'Architecture decisions should not be decided by popular vote without evaluating engineering trade-offs. The losing side still won’t commit.',
        whatAProfessionalConsiders:
          'Voting without consensus or criteria leads to passive resistance during implementation.',
        howToImprove:
          'Create transparent decision criteria (cost, team familiarity, delivery speed, maintenance) and score options together.',
      },
    ],
    keyMindsetTakeaway:
      'Lateral leadership doesn’t mean telling people what to do; it means proposing a clear framework to help smart people stop debating and make a decision.',
  },

  // 8. LIFELONG LEARNING
  {
    id: 'wr-learn-01',
    area: 'lifelong_learning',
    title: 'Sudden Workflow Tool Migration',
    headlinePrompt: 'A tool you use at work has changed. How do you adapt?',
    workplaceContext:
      'Your company abruptly announces it is retiring the project management and tracking tool you’ve used for two years in favor of an entirely new platform starting next Monday. Several colleagues are complaining loudly in Slack channels about how unintuitive the new tool is, how it ruins their workflow, and how management doesn’t listen.',
    dilemmaStakes:
      'Joining the complaint chorus feels bonding and cathartic, but wastes hours and makes you look resistant to change. But struggling silently makes you look slow or incompetent in the new workflow.',
    choices: [
      {
        id: 'wr-learn-01-a',
        label: 'A',
        actionText: 'Join the Slack venting thread and complain about how bad the new tool is compared to the old one.',
        isRecommended: false,
        whyItWorks:
          'Feels socially validating and connects you with frustrated peers.',
        potentialConsequences:
          'Brands you as negative, resistant to change, and unadaptable in the eyes of leads and management. Changes nothing about the migration.',
        whatAProfessionalConsiders:
          'Companies switch tools constantly for licensing costs, security, or enterprise compliance. Venting changes nothing; fast learners become invaluable.',
        howToImprove:
          'Direct energy into discovering the 20% of features you need 80% of the time in the new system.',
      },
      {
        id: 'wr-learn-01-b',
        label: 'B',
        actionText: 'Invest 30 minutes in the core workflow changes, build a personal cheat sheet, and share a 2-minute quick-start tip with the team.',
        isRecommended: true,
        whyItWorks:
          'Turns a disruptive annoyance into a high-visibility opportunity to demonstrate adaptability and peer leadership.',
        potentialConsequences:
          'You master the necessary workflows while others are still complaining. Peers and managers look to you as a helpful resource.',
        whatAProfessionalConsiders:
          'You don’t need to love the tool; you need to achieve your outcomes through it. Sharing a simple 3-step cheat sheet ("Here’s where our sprint boards moved in the new tool") builds instant peer goodwill.',
        howToImprove:
          'Frame feedback constructively to the IT/admin team after you’ve tested it: "Here are 2 specific settings that helped our squad save 15 minutes in the new layout."',
      },
      {
        id: 'wr-learn-01-c',
        label: 'C',
        actionText: 'Refuse to log in to the new tool until someone from HR or IT schedules an individual training session for you.',
        isRecommended: false,
        whyItWorks:
          'Avoids learning the tool on your own time.',
        potentialConsequences:
          'You miss team updates, sprint tasks fall through the cracks, and you appear helpless or entitled.',
        whatAProfessionalConsiders:
          'In modern work environments, professionals are expected to self-onboard onto basic SaaS tools using docs and discovery.',
        howToImprove:
          'Search for a 5-minute YouTube overview or read the official getting-started guide before requesting hand-holding.',
      },
      {
        id: 'wr-learn-01-d',
        label: 'D',
        actionText: 'Secretly keep using your own personal notes and ignore the team’s new shared system entirely.',
        isRecommended: false,
        whyItWorks:
          'Preserves your personal comfort zone.',
        potentialConsequences:
          'Creates a silo. Your team cannot see your status, tickets get lost, and cross-functional visibility is broken.',
        whatAProfessionalConsiders:
          'Shared tools exist for team coordination, not personal preference. Working outside the system damages team predictability.',
        howToImprove:
          'Sync your personal notes with the team’s single source of truth.',
      },
    ],
    keyMindsetTakeaway:
      'Tools change constantly in modern organizations. The professionals who thrive aren’t the ones who know every feature—they are the ones who adapt without drama.',
  },
  ...WORKPLACE_MODULE_SCENARIOS,
];
