import { WorkReadyScenario } from '../types/workReady';

export interface WorkplaceModuleMeta {
  key: 'emotional_intelligence' | 'self_management' | 'professional_behavior';
  title: string;
  subtitle: string;
  description: string;
  activities: Array<{
    id: string;
    label: string;
    summary: string;
  }>;
}

export const WORKPLACE_MODULES_META: Record<
  'emotional_intelligence' | 'self_management' | 'professional_behavior',
  WorkplaceModuleMeta
> = {
  emotional_intelligence: {
    key: 'emotional_intelligence',
    title: 'Emotional Intelligence',
    subtitle: 'Navigating workplace relationships, tension, and empathy',
    description:
      'Workplaces run on people under pressure. Learn how to decode interpersonal dynamics, respond non-defensively, and build durable trust without jumping to conclusions.',
    activities: [
      { id: 'recognizing_emotions', label: 'Recognizing Emotions', summary: 'Reading situational cues and unspoken stress' },
      { id: 'responding_to_disagreement', label: 'Responding to Disagreement', summary: 'Disagreeing without escalating or taking critique personally' },
      { id: 'showing_empathy', label: 'Showing Empathy', summary: 'Validating teammate pressure before troubleshooting' },
      { id: 'handling_feedback', label: 'Handling Feedback', summary: 'Absorbing blunt critique without defensiveness' },
      { id: 'understanding_perspective', label: 'Understanding Perspective', summary: 'Stepping into competing stakeholder incentives' },
      { id: 'building_trust', label: 'Building Trust', summary: 'Proactive transparency and radical accountability' },
    ],
  },
  self_management: {
    key: 'self_management',
    title: 'Self-Management',
    subtitle: 'Ownership of your time, focus, and commitments',
    description:
      'Nobody manages your calendar or focus for you. Master the habits of realistic planning, protecting deep attention, triage under pressure, and independent follow-through.',
    activities: [
      { id: 'planning', label: 'Planning', summary: 'Scaffolding independent milestones from ambiguous goals' },
      { id: 'prioritization', label: 'Prioritization', summary: 'Triage when everything is labeled high-priority' },
      { id: 'time_management', label: 'Time Management', summary: 'Protecting deep blocks against meeting creep' },
      { id: 'deadline_management', label: 'Deadline Management', summary: 'Early warning protocols for slipping estimates' },
      { id: 'working_without_supervision', label: 'Working Without Constant Supervision', summary: 'Proactive momentum when leadership is absent' },
      { id: 'breaking_large_work', label: 'Breaking Large Work into Smaller Tasks', summary: 'Deconstructing daunting projects into crisp sub-tasks' },
      { id: 'handling_distractions', label: 'Handling Distractions', summary: 'Managing Slack pings, context switching, and focus leaks' },
    ],
  },
  professional_behavior: {
    key: 'professional_behavior',
    title: 'Professional Behavior',
    subtitle: 'Reliability, integrity, and operational consistency',
    description:
      'Professionalism is not about stiff formality; it is about predictability, respecting other people’s time, owning mistakes, and honoring commitments.',
    activities: [
      { id: 'ownership', label: 'Ownership', summary: 'Stepping up when code breaks or workflows stall' },
      { id: 'reliability', label: 'Reliability', summary: 'Consistently doing what you said you would do' },
      { id: 'asking_for_help', label: 'Asking for Help', summary: 'Unblocking yourself respectfully after a disciplined timebox' },
      { id: 'communicating_delays', label: 'Communicating Delays', summary: 'Early notice before dependencies become emergencies' },
      { id: 'meeting_expectations', label: 'Meeting Expectations', summary: 'Adhering to agreed quality standards even under crunch' },
      { id: 'following_through', label: 'Following Through', summary: 'Closing loops on voluntary commitments' },
    ],
  },
};

export const WORKPLACE_MODULE_SCENARIOS: WorkReadyScenario[] = [
  // =========================================================================
  // MODULE 1: EMOTIONAL INTELLIGENCE (6 Activities)
  // =========================================================================

  // 1. Recognizing Emotions
  {
    id: 'eq-act-recognizing-emotions',
    area: 'emotional_intelligence',
    moduleKey: 'emotional_intelligence',
    activityType: 'recognizing_emotions',
    title: 'Recognizing Emotions: Unspoken Tension in Standup',
    headlinePrompt: 'Your lead engineer is unusually abrupt and turns off their camera. How do you interpret and handle this?',
    workplaceContext:
      'In today’s 9:30 AM standup, your lead engineer Marcus—who is usually warm and talkative—gives a flat, 5-second update: "Still on the database sync. No blockers." When another colleague asks a routine question about API endpoints, Marcus replies abruptly: "It’s in the ticket comments. Read the ticket." He then turns off his video camera for the rest of the meeting. You have a PR waiting for his review before your afternoon release.',
    dilemmaStakes:
      'If you assume he is angry at you or the team and send an anxious message, you add to his stress. If you ignore the tone and ping him aggressively demanding your review, you risk a sharp conflict.',
    whatHappenedExplainer:
      'A colleague displayed a marked shift in communication style: flat tone, abrupt deflection to written docs, and physical/visual withdrawal (camera off). This indicates high cognitive overload, acute external stress, or emotional fatigue—not necessarily personal hostility.',
    whyReactionOccurredExplainer:
      'Workplace pressures often collide silently. Marcus might be firefighting a critical production bug, facing severe executive delivery pressure, or dealing with unstated personal fatigue. When cognitive load exceeds capacity, people instinctively conserve energy by cutting social pleasantries and retreating.',
    whatCouldYouDoDifferentlyExplainer:
      'Separate the person’s behavior from your personal security. Do not demand immediate emotional availability. Give space, lower communication friction, and offer low-pressure, asynchronous support.',
    choices: [
      {
        id: 'eq-act-rec-a',
        label: 'A',
        actionText: 'Immediately send a Slack DM: "Are you mad at me? Did I do something wrong on my pull request?"',
        isRecommended: false,
        whyItWorks: 'Seeks quick relief from personal anxiety.',
        potentialConsequences:
          'Centers the situation entirely on yourself. Forces an already overwhelmed colleague to manage your emotional validation on top of their own stress.',
        whatAProfessionalConsiders:
          'Colleagues’ stress is rarely about you. Avoid personalizing general workplace tension.',
        howToImprove:
          'Shift focus from "Are you mad at me?" to "How can I reduce their load right now?"',
        whatHappened: 'You interpreted workplace stress as personal rejection.',
        whySomeoneReactsThisWay: 'High anxiety often makes early-career builders assume they are the cause of team tension.',
        whatCouldYouDoDifferently: 'Wait and observe before assuming personal fault.',
      },
      {
        id: 'eq-act-rec-b',
        label: 'B',
        actionText: 'Recognize the situational overload: give him breathing room, review the ticket notes yourself first, and send a low-friction async note later.',
        isRecommended: true,
        whyItWorks:
          'Demonstrates high emotional maturity. Respects his focus boundary while keeping work moving forward without drama.',
        potentialConsequences:
          'Marcus appreciates that you didn’t take his bluntness personally or add to his immediate inbox noise. Trust increases.',
        whatAProfessionalConsiders:
          'Send a gentle async note after lunch: "Hey Marcus, saw things are super intense right now. I checked the ticket notes on the endpoints and got what I needed. For PR #142, no rush today—I can test with mock fixtures so you have breathing room for the DB sync."',
        howToImprove:
          'Anticipate teammates’ cognitive load and offer self-sufficient workarounds before asking for their time.',
        whatHappened: 'You accurately read stress cues and adapted your workflow.',
        whySomeoneReactsThisWay: 'Marcus reacted to severe operational pressure by conserving bandwidth.',
        whatCouldYouDoDifferently: 'Give space, read existing docs, and lower review urgency.',
      },
      {
        id: 'eq-act-rec-c',
        label: 'C',
        actionText: 'Post in the public #general channel asking why Marcus was so rude in standup today.',
        isRecommended: false,
        whyItWorks: 'Vents personal irritation publicly.',
        potentialConsequences:
          'Destroys psychological safety, humiliates Marcus in front of leadership, and creates toxic team factions.',
        whatAProfessionalConsiders:
          'Public call-outs show poor emotional regulation. Workplace conflicts must be handled with private, generous inquiry.',
        howToImprove:
          'Never air interpersonal grievances in shared team channels.',
        whatHappened: 'You escalated private team tension into a public controversy.',
        whySomeoneReactsThisWay: 'Feeling offended triggers retaliatory public venting.',
        whatCouldYouDoDifferently: 'Address concerns privately with curiosity, not public confrontation.',
      },
    ],
    keyMindsetTakeaway:
      'Recognizing emotions means noticing when someone’s bandwidth is exhausted and adapting your approach—not demanding that they manage your comfort.',
  },

  // 2. Responding to Disagreement
  {
    id: 'eq-act-responding-disagreement',
    area: 'emotional_intelligence',
    moduleKey: 'emotional_intelligence',
    activityType: 'responding_to_disagreement',
    title: 'Responding to Disagreement: Blunt Critique in Public Review',
    headlinePrompt: 'A senior peer publicly calls your proposed technical plan "flawed and unworkable". How do you respond?',
    workplaceContext:
      'In a team architecture review with 8 colleagues on the call, you present your proposal to cache user search results in local browser memory. Before you finish slide 4, a respected senior engineer, Elena, interrupts: "This approach is completely flawed. Local memory leaks on mobile, and users will see stale prices. It won’t work in production." Several teammates stay silent.',
    dilemmaStakes:
      'Your adrenaline spikes and your instinct is to either fight back aggressively ("You didn’t let me finish!") or shut down completely in shame. Both reactions hurt your professional stature.',
    whatHappenedExplainer:
      'A technical disagreement was delivered bluntly without diplomatic softening. The critique attacked the proposed mechanism ("flawed and unworkable"), triggering a threat response in front of peers.',
    whyReactionOccurredExplainer:
      'Senior engineers often prioritize operational risk and system reliability over conversational diplomacy. When they see a failure mode (memory leaks, stale financial data), their primary focus is preventing a production outage, not policing their own delivery tone.',
    whatCouldYouDoDifferentlyExplainer:
      'Separate your ego from your proposal. Treat the blunt objection as valuable data about production edge cases. Validate the real technical risk, invite Elena to explore solutions, and maintain emotional calm.',
    choices: [
      {
        id: 'eq-act-dis-a',
        label: 'A',
        actionText: 'Push back defensively: "If you had let me finish the presentation, you would see I already thought of that. You don’t need to be so negative."',
        isRecommended: false,
        whyItWorks: 'Protects personal pride in front of the audience.',
        potentialConsequences:
          'Shifts a technical discussion into an interpersonal power struggle. The meeting derails into an argument over tone rather than architecture.',
        whatAProfessionalConsiders:
          'Attacking someone’s tone during a technical review makes you look fragile. Strong engineers welcome hard stress-testing of their ideas.',
        howToImprove:
          'Focus 100% of your response on the technical constraint, not on how the comment made you feel.',
        whatHappened: 'You reacted to the delivery tone rather than the technical risk.',
        whySomeoneReactsThisWay: 'Being interrupted publicly feels like a loss of status.',
        whatCouldYouDoDifferently: 'Thank them for the edge-case catch and anchor back in technical facts.',
      },
      {
        id: 'eq-act-dis-b',
        label: 'B',
        actionText: 'Stay calm, validate the stale-data and memory risk directly, and ask for Elena’s experience on cache invalidation.',
        isRecommended: true,
        whyItWorks:
          'Neutralizes the tension instantly. Shows high confidence and leadership presence by engaging with the technical objection with curiosity.',
        potentialConsequences:
          'The entire room relaxes. Elena shifts from critic to collaborator. You gain respect for keeping your cool under fire.',
        whatAProfessionalConsiders:
          'Say: "That’s a critical callout on mobile memory leaks and stale pricing, Elena—preventing stale checkouts is non-negotiable. What strategy have you seen work best for mobile TTL invalidation? Let’s look at how we can integrate that into slide 5."',
        howToImprove:
          'Treat critiques as stress-testing the bridge before people drive on it. The stronger the critique, the safer the final build.',
        whatHappened: 'You absorbed blunt pushback without defensiveness and pivoted to technical alignment.',
        whySomeoneReactsThisWay: 'Elena reacted out of urgent concern for production stability.',
        whatCouldYouDoDifferently: 'Validate the concern and invite joint problem-solving.',
      },
      {
        id: 'eq-act-dis-c',
        label: 'C',
        actionText: 'Concede immediately: "You’re totally right, sorry everyone, let’s just scrap this whole proposal."',
        isRecommended: false,
        whyItWorks: 'Ends the confrontation immediately.',
        potentialConsequences:
          'Gives up on valuable work without evaluating alternatives. Signals that you lack conviction and fold under basic scrutiny.',
        whatAProfessionalConsiders:
          'Critique on one component does not invalidate the entire proposal. Address the specific flaw without discarding the core value.',
        howToImprove:
          'Distinguish between a fatal design flaw and a solvable implementation constraint.',
        whatHappened: 'You collapsed under pressure instead of evaluating the technical critique.',
        whySomeoneReactsThisWay: 'Fear of conflict often prompts premature surrender.',
        whatCouldYouDoDifferently: 'Hold your ground on the goal while being flexible on the implementation.',
      },
    ],
    keyMindsetTakeaway:
      'Responding to disagreement with calm curiosity turns potential adversaries into technical partners. Your idea is not your identity.',
  },

  // 3. Showing Empathy
  {
    id: 'eq-act-showing-empathy',
    area: 'emotional_intelligence',
    moduleKey: 'emotional_intelligence',
    activityType: 'showing_empathy',
    title: 'Showing Empathy: Teammate Struggling with Broken Local Setup',
    headlinePrompt: 'A junior peer stays up until 2 AM trying to fix an environment bug alone. How do you respond?',
    workplaceContext:
      'Your peer Ken joins the morning call looking exhausted. He apologizes repeatedly: "I’m so sorry, I didn’t get the analytics widget done yesterday. My local Docker environment crashed at 4 PM, and I stayed up until 2:30 AM trying to reinstall Node dependencies and Docker containers, but it still won’t build." He looks visibly stressed and fearful of getting reprimanded.',
    dilemmaStakes:
      'If you lecture him ("Why didn’t you ask for help earlier?"), you increase his shame and guarantee he will hide struggles in the future. If you dismiss it ("Don’t worry about it"), you don’t solve the broken setup.',
    whatHappenedExplainer:
      'A teammate fell into the common junior trap of "isolated panic debugging": spending 8+ hours alone on a systemic tooling issue out of fear of looking incompetent.',
    whyReactionOccurredExplainer:
      'Early-career professionals often believe asking for help is a sign of weakness or fraudulence. The fear of being evaluated harshly pushes them into exhaustive, late-night heroics rather than seeking early collaboration.',
    whatCouldYouDoDifferentlyExplainer:
      'Normalize the struggle immediately. Validate the emotional exhaustion first, reassure them that broken local toolchains happen to everyone, and step in to pair-debug for 15 minutes.',
    choices: [
      {
        id: 'eq-act-emp-a',
        label: 'A',
        actionText: 'Scold him in the meeting: "Staying up until 2 AM is bad for you. We told you in onboarding to ask for help after 45 minutes."',
        isRecommended: false,
        whyItWorks: 'Recites official team policy.',
        potentialConsequences:
          'Compounds Ken’s feelings of shame and isolation. He feels reprimanded while already physically and mentally drained.',
        whatAProfessionalConsiders:
          'People cannot process process advice when their nervous system is flooded with stress and sleep deprivation. Empathy must come before policy.',
        howToImprove:
          'Validate first, solve the immediate roadblock second, and discuss healthy timeboxes days later during a calm retro.',
        whatHappened: 'You delivered a procedural lecture to an exhausted colleague.',
        whySomeoneReactsThisWay: 'Frustration with missed team targets often comes out as harsh rule-reminding.',
        whatCouldYouDoDifferently: 'Offer warmth and practical troubleshooting before referencing guidelines.',
      },
      {
        id: 'eq-act-emp-b',
        label: 'B',
        actionText: 'Validate the frustration warmly, reassure him that local Docker issues happen to everyone, and hop on a 15-minute pairing call.',
        isRecommended: true,
        whyItWorks:
          'Restores psychological safety immediately. Ken learns that struggling is safe, asking for help is welcomed, and the team has his back.',
        potentialConsequences:
          'You likely fix the Docker permission bug in 10 minutes together (a fresh pair of eyes catches what 2 AM eyes miss). Ken feels loyal, respected, and relieved.',
        whatAProfessionalConsiders:
          'Say: "First off Ken, take a breath—Docker environment corruption has bitten literally every single engineer on this team. You put in huge effort. Let’s hop on a 15-minute screen share right after this standup and reset the container cache together so you can get your afternoon back."',
        howToImprove:
          'Follow up later with proactive advice: "Whenever Docker acts up for more than 30 mins, ping me immediately—never burn your evening alone on tooling."',
        whatHappened: 'You met distress with genuine empathy and immediate practical partnership.',
        whySomeoneReactsThisWay: 'Ken acted out of intense imposter anxiety and fear of falling short.',
        whatCouldYouDoDifferently: 'Normalize the technical failure and pair-program the solution.',
      },
      {
        id: 'eq-act-emp-c',
        label: 'C',
        actionText: 'Tell him to go take a nap and take over the analytics widget yourself without involving him.',
        isRecommended: false,
        whyItWorks: 'Solves the deliverable speed.',
        potentialConsequences:
          'Deprives Ken of the learning experience and reinforces his fear that he is incapable of doing the work.',
        whatAProfessionalConsiders:
          'Taking work away damages confidence. Helping someone unblock themselves builds capability and autonomy.',
        howToImprove:
          'Pair with him rather than taking over the task completely.',
        whatHappened: 'You treated the person as disposable and took the assignment.',
        whySomeoneReactsThisWay: 'Desire to hit deadlines can trigger rescuer syndrome.',
        whatCouldYouDoDifferently: 'Coach them through the fix rather than replacing them.',
      },
    ],
    keyMindsetTakeaway:
      'Empathy in the workplace is not pity; it is validating human difficulty, removing shame, and partnering to solve the obstacle.',
  },

  // 4. Handling Feedback
  {
    id: 'eq-act-handling-feedback',
    area: 'emotional_intelligence',
    moduleKey: 'emotional_intelligence',
    activityType: 'handling_feedback',
    title: 'Handling Feedback: Receiving 18 Changes on Your First Pull Request',
    headlinePrompt: 'Your first major pull request receives 18 requested changes. How do you process and respond?',
    workplaceContext:
      'You spent 4 days building a customer profile settings tab. You submit PR #104 with pride. Four hours later, the senior reviewer leaves 18 inline comments: 6 formatting issues, 5 missing error handlers, 4 naming convention requests, and 3 suggestions to rewrite queries. The review status is marked "Changes Requested".',
    dilemmaStakes:
      'Seeing 18 comments feels like an overwhelming indictment of your competence. If you react with bitterness or passive-aggressive compliance, you damage your relationship with your mentor.',
    whatHappenedExplainer:
      'A code review generated extensive critical markup. To an early-career contributor, 18 comments can feel like a failing grade on an exam.',
    whyReactionOccurredExplainer:
      'In high-performing engineering teams, thorough code reviews are an act of deep investment, not hostility. Senior engineers spend hours leaving detailed comments only on work they care about protecting in production. What feels like an attack is actually senior mentorship.',
    whatCouldYouDoDifferentlyExplainer:
      'Reframe the review as free coaching. Categorize comments into mechanical formatting vs. conceptual architectural suggestions. Thank the reviewer, address straightforward items quickly, and ask clarifying questions on the deeper queries.',
    choices: [
      {
        id: 'eq-act-hfb-a',
        label: 'A',
        actionText: 'Silently make all 18 changes with resentment, feeling like you are terrible at your job.',
        isRecommended: false,
        whyItWorks: 'Avoids any disagreement or conversation.',
        potentialConsequences:
          'Builds internal imposter syndrome and dread of future submissions. You miss the opportunity to understand *why* the reviewer suggested those changes.',
        whatAProfessionalConsiders:
          'Reviews are conversations, not commands. You are expected to understand the rationale behind suggestions, not just click buttons in quiet misery.',
        howToImprove:
          'Step back, take a 10-minute walk, and review the comments with an inquisitive mindset.',
        whatHappened: 'You internalized code critique as a personal verdict of inadequacy.',
        whySomeoneReactsThisWay: 'School trains us that red ink means failure.',
        whatCouldYouDoDifferently: 'Reframe code review comments as peer engineering collaboration.',
      },
      {
        id: 'eq-act-hfb-b',
        label: 'B',
        actionText: 'Categorize the feedback, acknowledge the review warmly, push the simple fixes, and ask for a 10-minute pairing on the query design.',
        isRecommended: true,
        whyItWorks:
          'Demonstrates professional poise and high coachability. Shows that you are organized, appreciative of reviewer time, and eager to master production standards.',
        potentialConsequences:
          'The reviewer respects your attitude immensely. Senior engineers love working with junior peers who handle feedback with enthusiasm and clarity.',
        whatAProfessionalConsiders:
          'Reply on the PR: "Thank you for the thorough review, Sarah! Super helpful catches on the missing error handlers and naming standards—I just pushed fixes for those 11 items. For comments #14–16 regarding query optimization, could we sync for 10 mins so I can make sure I understand the indexing approach?"',
        howToImprove:
          'Batch changes logically into clean commit messages: "refactor: apply PR review suggestions for error handling".',
        whatHappened: 'You organized feedback constructively and engaged as a collaborative learner.',
        whySomeoneReactsThisWay: 'Sarah invested significant time to ensure the codebase remains maintainable.',
        whatCouldYouDoDifferently: 'Triage the feedback into quick wins vs. conceptual learning.',
      },
      {
        id: 'eq-act-hfb-c',
        label: 'C',
        actionText: 'Argue back on all 18 comments defending why your original code was already good enough.',
        isRecommended: false,
        whyItWorks: 'Attempts to prove that you didn’t make any mistakes.',
        potentialConsequences:
          'Brands you as defensive, arrogant, and exhausting to review. Reviewers will start avoiding your pull requests.',
        whatAProfessionalConsiders:
          'Defending minor formatting quirks or missing tests waste team cycles. Save your debate energy for genuine architectural trade-offs.',
        howToImprove:
          'Pick battles wisely. Adopt team conventions gracefully.',
        whatHappened: 'You fought standard conventions to defend personal pride.',
        whySomeoneReactsThisWay: 'Ego preservation makes people resist even helpful guidance.',
        whatCouldYouDoDifferently: 'Adopt conventions easily; save debate for meaningful product trade-offs.',
      },
    ],
    keyMindsetTakeaway:
      'High feedback volume is a sign of high investment. The fastest learners view code reviews as free 1-on-1 masterclasses from experienced colleagues.',
  },

  // 5. Understanding Another Person's Perspective
  {
    id: 'eq-act-understanding-perspective',
    area: 'emotional_intelligence',
    moduleKey: 'emotional_intelligence',
    activityType: 'understanding_perspective',
    title: 'Understanding Perspective: The Sales Lead Pushing an Early Launch Date',
    headlinePrompt: 'A sales director promises a customer that your feature ships 2 weeks before your planned date. How do you respond?',
    workplaceContext:
      'Your engineering team estimated that the custom CSV report export will ship on November 15th. Today, David, the Enterprise Sales Director, sends an ecstatic Slack message: "Huge news! Just closed a $90k enterprise deal with Acme Corp! I promised their VP they would have the CSV export live in their account by November 1st!" Your sprint lead is furious, calling David reckless.',
    dilemmaStakes:
      'Attacking David as an enemy deepens company silos. But quietly accepting the 2-week deadline slip forces brutal weekend crunches and risks shipping untested code.',
    whatHappenedExplainer:
      'A cross-functional conflict occurred between commercial incentives (closing revenue under client pressure) and engineering constraints (realistic QA and testing timelines).',
    whyReactionOccurredExplainer:
      'David’s compensation and performance are directly evaluated on closing enterprise contracts against competitor deadlines. In competitive deals, clients demand commitments on the spot. David wasn’t trying to sabotage engineering; he was trying to win business that funds the entire company.',
    whatCouldYouDoDifferentlyExplainer:
      'Understand the commercial incentive without compromising engineering integrity. Bridge the gap by offering a scoped phased beta: give Acme Corp manual/preview access on Nov 1st while keeping full general availability on Nov 15th.',
    choices: [
      {
        id: 'eq-act-per-a',
        label: 'A',
        actionText: 'Post an angry reply in #general: "Sales needs to stop lying to customers. We said Nov 15th and we aren’t doing your work for you."',
        isRecommended: false,
        whyItWorks: 'Vents engineering frustration publicly.',
        potentialConsequences:
          'Creates a hostile wall between Sales and Engineering. Leadership will view you as divisive and blind to business reality.',
        whatAProfessionalConsiders:
          'Sales and Engineering are on the same team. Companies exist to serve paying customers. Public insults destroy cross-departmental collaboration.',
        howToImprove:
          'Schedule a private sync to explore what Acme Corp actually needs on Nov 1st.',
        whatHappened: 'You treated a commercial partner as an adversary.',
        whySomeoneReactsThisWay: 'Feeling your timeline trampled triggers resentment.',
        whatCouldYouDoDifferently: 'Explore the underlying client requirement with commercial empathy.',
      },
      {
        id: 'eq-act-per-b',
        label: 'B',
        actionText: 'Connect with David to understand Acme’s core requirement and propose a phased solution: a private beta export for Acme on Nov 1st, full GA on Nov 15th.',
        isRecommended: true,
        whyItWorks:
          'Solves both sides of the equation. David preserves his $90k client promise, and engineering preserves its testing runway for general availability.',
        potentialConsequences:
          'David sees engineering as a strategic commercial partner rather than a roadblock. The company wins the client without destroying team morale.',
        whatAProfessionalConsiders:
          'Discover what Acme actually needs on day 1: often the client only needs a manual CSV dump for 5 accounts, which takes 20 minutes to generate, not the entire automated UI.',
        howToImprove:
          'Ask: "What specific workflow does Acme need on Nov 1st? Can we give their account an admin preview flag while running our full QA in the background?"',
        whatHappened: 'You balanced commercial urgency with technical sustainability.',
        whySomeoneReactsThisWay: 'David felt commercial pressure to close a competitive contract.',
        whatCouldYouDoDifferently: 'Negotiate a private pilot scope rather than an all-or-nothing release.',
      },
      {
        id: 'eq-act-per-c',
        label: 'C',
        actionText: 'Stay completely silent and force your junior teammates to work 14-hour days to hit the artificial Nov 1st date.',
        isRecommended: false,
        whyItWorks: 'Avoids any disagreement with the Sales Director.',
        potentialConsequences:
          'Severe team burnout, regression bugs in production, and reinforcing the precedent that Sales can dictate arbitrary delivery dates.',
        whatAProfessionalConsiders:
          'True leadership means protecting your team’s sustainability through clear, respectful negotiation.',
        howToImprove:
          'Never sacrifice quality and team health without an open conversation about trade-offs.',
        whatHappened: 'You absorbed unreasonable scope without communicating constraints.',
        whySomeoneReactsThisWay: 'Fear of conflict often leads to silent team overwork.',
        whatCouldYouDoDifferently: 'Negotiate realistic trade-offs transparently.',
      },
    ],
    keyMindsetTakeaway:
      'Understanding perspective means realizing that different departments have different incentives. Align on the business outcome rather than fighting over territory.',
  },

  // 6. Building Trust
  {
    id: 'eq-act-building-trust',
    area: 'emotional_intelligence',
    moduleKey: 'emotional_intelligence',
    activityType: 'building_trust',
    title: 'Building Trust: Owning an Unnoticed Data Bug Before It Snowballs',
    headlinePrompt: 'You discover a quiet data calculation bug in your code that nobody else has noticed yet. What do you do?',
    workplaceContext:
      'While reviewing your merged code from yesterday, you discover a subtle logic error in your SQL query: user retention calculations were using `created_at` instead of `activated_at`, inflating weekly retention by 6%. The dashboard has already updated. Nobody has noticed, and the weekly executive metrics meeting is in 24 hours.',
    dilemmaStakes:
      'If you stay silent, someone might discover it months from now and your credibility is permanently destroyed. If you speak up immediately, you have to admit an embarrassing mistake.',
    whatHappenedExplainer:
      'A silent data flaw was introduced. The bug is currently invisible to others, creating a direct test of your personal and professional integrity.',
    whyReactionOccurredExplainer:
      'The instinct to conceal mistakes stems from fear of punishment, shame, or looking incompetent. Many workplace disasters happen not because someone made an error, but because someone tried to cover it up until it exploded.',
    whatCouldYouDoDifferentlyExplainer:
      'Flag the discrepancy immediately with total transparency, provide the corrected metric, and submit a verified hotfix. Radical honesty builds more lasting trust than flawless perfection.',
    choices: [
      {
        id: 'eq-act-tru-a',
        label: 'A',
        actionText: 'Quietly push a secret hotfix tonight without telling anyone, hoping the metric difference goes unnoticed in tomorrow’s meeting.',
        isRecommended: false,
        whyItWorks: 'Hides the mistake from immediate scrutiny.',
        potentialConsequences:
          'When leadership asks why retention dropped 6% overnight between yesterday’s preview and today’s meeting, you will be caught scrambling for excuses. Concealing errors destroys career trust permanently.',
        whatAProfessionalConsiders:
          'Cover-ups are always worse than the original bug. Leaders forgive errors; they never forgive hidden data manipulation.',
        howToImprove:
          'Bring the fix and the explanation together into the light.',
        whatHappened: 'You attempted to conceal an error out of fear of embarrassment.',
        whySomeoneReactsThisWay: 'Fear of looking foolish drives secrecy.',
        whatCouldYouDoDifferently: 'Disclose the issue immediately alongside the solution.',
      },
      {
        id: 'eq-act-tru-b',
        label: 'B',
        actionText: 'Post transparently in the metrics channel: explain the logic discrepancy, provide the corrected 6% delta, and link the verified hotfix PR.',
        isRecommended: true,
        whyItWorks:
          'Demonstrates elite integrity and reliability. Proves to leadership that you catch your own mistakes, own them publicly, and fix them immediately.',
        potentialConsequences:
          'Your credibility skyrockets. Management knows they can trust your data because you would never conceal an inconvenient truth.',
        whatAProfessionalConsiders:
          'Post: "Team, quick heads-up on the retention dashboard: while auditing my query logic this morning, I caught a date-field mismatch (`created_at` vs `activated_at`) that temporarily overstated weekly retention by ~6%. I have opened PR #119 with the corrected query and verified numbers. Updated dashboard will be live by 11:30 AM before tomorrow’s executive sync."',
        howToImprove:
          'Add an automated regression test to the PR so the mistake can never repeat.',
        whatHappened: 'You proactively owned the error with immediate transparency and resolution.',
        whySomeoneReactsThisWay: 'High ownership values systemic truth over temporary comfort.',
        whatCouldYouDoDifferently: 'State the finding, quantify the impact, and deliver the patch.',
      },
      {
        id: 'eq-act-tru-c',
        label: 'C',
        actionText: 'Wait to see if the Product Manager notices the difference in tomorrow’s meeting before saying anything.',
        isRecommended: false,
        whyItWorks: 'Avoids bringing attention to yourself unless forced.',
        potentialConsequences:
          'If they notice, you look careless. If they don’t notice, strategic company decisions are made based on false numbers.',
        whatAProfessionalConsiders:
          'Passive silence is a breach of fiduciary and professional responsibility.',
        howToImprove:
          'Own your work proactively. Never wait for someone else to catch your oversight.',
        whatHappened: 'You gambled company data accuracy on whether someone would notice.',
        whySomeoneReactsThisWay: 'Avoidance of awkward conversations.',
        whatCouldYouDoDifferently: 'Step forward immediately with the correction.',
      },
    ],
    keyMindsetTakeaway:
      'Trust is not built by never making mistakes; trust is built by being the first person to surface, explain, and fix your own mistakes.',
  },

  // =========================================================================
  // MODULE 2: SELF-MANAGEMENT (7 Activities)
  // =========================================================================

  // 1. Planning
  {
    id: 'sm-act-planning',
    area: 'self_management',
    moduleKey: 'self_management',
    activityType: 'planning',
    title: 'Planning: Scaffolding a 2-Week Project with Zero Pre-Set Schedule',
    headlinePrompt: 'Your manager assigns you a 2-week feature with no intermediate milestones. How do you plan your work?',
    workplaceContext:
      'Your manager says: "We need the new candidate filter drawer built by Friday in two weeks. Take full ownership and let me know when it’s ready for staging." She assigns you the broad user story and moves to her next meeting. You have 10 working days, multiple technical dependencies (Figma mockups, backend search endpoints, unit tests), and zero day-by-day roadmap.',
    dilemmaStakes:
      'If you jump straight into coding without planning, you risk hitting missing backend endpoints on Day 8 and panicking. If you spend 5 days over-planning, you run out of build time.',
    whatHappenedExplainer:
      'You received an autonomous assignment with high ambiguity and no structural scaffolding.',
    whyReactionOccurredExplainer:
      'Managers delegate broad outcomes to build and test employee autonomy. They assume you will self-scaffold intermediate milestones, rather than waiting for daily task assignments.',
    whatCouldYouDoDifferentlyExplainer:
      'Break the 10-day window into 3 distinct phases: Discovery & Dependencies (Days 1–2), Core Build & Mock Integration (Days 3–6), and Testing, Edge Cases & Polish (Days 7–9), leaving Day 10 as buffer.',
    choices: [
      {
        id: 'sm-act-plan-a',
        label: 'A',
        actionText: 'Immediately start coding the UI components on Day 1 and figure out the backend dependencies whenever you get there.',
        isRecommended: false,
        whyItWorks: 'Feels productive and shows immediate code velocity.',
        potentialConsequences:
          'High risk of building components on assumptions that clash with backend schemas, requiring painful rewrites on Day 8.',
        whatAProfessionalConsiders:
          'Software engineering is 60% system alignment and 40% typing. Clarifying dependencies early prevents wasted code.',
        howToImprove:
          'Map out the contract interfaces and test fixtures on Day 1 before writing UI code.',
        whatHappened: 'You rushed into implementation without architectural alignment.',
        whySomeoneReactsThisWay: 'Pressure to show immediate progress triggers hasty execution.',
        whatCouldYouDoDifferently: 'Spend Day 1 verifying schemas and creating a 3-phase milestone plan.',
      },
      {
        id: 'sm-act-plan-b',
        label: 'B',
        actionText: 'Structure a 3-phase roadmap with mid-point check-ins, identify dependency blockers early, and share a 3-bullet plan with your manager.',
        isRecommended: true,
        whyItWorks:
          'Demonstrates high executive functioning. Gives your manager instant confidence that you are organized and predictable.',
        potentialConsequences:
          'You surface missing endpoint specs on Day 2 instead of Day 8. The project ships smoothly with built-in buffer time.',
        whatAProfessionalConsiders:
          'Send a quick note: "Hey Brenda, mapped out the 10-day sprint for the candidate filter: Phase 1 (Days 1-2): Schema contract & mock fixtures; Phase 2 (Days 3-6): Core drawer UI & filter logic; Phase 3 (Days 7-9): Integration QA & keyboard accessibility; Day 10: Staging release buffer. Flagging that I’ll need Alex’s search endpoint specs by Wednesday."',
        howToImprove:
          'Always protect 10-20% of the project timeline as buffer for unexpected regressions.',
        whatHappened: 'You translated an ambiguous 2-week goal into structured milestones.',
        whySomeoneReactsThisWay: 'Managers expect self-scaffolding from reliable contributors.',
        whatCouldYouDoDifferently: 'Share intermediate milestones early to align expectations.',
      },
      {
        id: 'sm-act-plan-c',
        label: 'C',
        actionText: 'Ask your manager for a daily checklist so you know exactly what tasks to complete each morning.',
        isRecommended: false,
        whyItWorks: 'Eliminates all ambiguity and puts the planning burden on leadership.',
        potentialConsequences:
          'Makes you look dependent and high-maintenance. Signals that you cannot operate without constant micromanagement.',
        whatAProfessionalConsiders:
          'Managers want problem solvers, not checklist followers. Propose your own plan and ask for feedback rather than demanding their plan.',
        howToImprove:
          'Bring a proposed plan: "Here is what I’m thinking—does this sequence look right to you?"',
        whatHappened: 'You asked leadership to do your operational planning for you.',
        whySomeoneReactsThisWay: 'Fear of making autonomous mistakes drives dependence.',
        whatCouldYouDoDifferently: 'Draft your own plan and invite review.',
      },
    ],
    keyMindsetTakeaway:
      'Planning is not predicting the future; it is identifying dependencies early so surprises happen on Day 2, not Day 9.',
  },

  // 2. Prioritization
  {
    id: 'sm-act-prioritization',
    area: 'self_management',
    moduleKey: 'self_management',
    activityType: 'prioritization',
    title: 'Prioritization: The Morning Triage of Competing Urgencies',
    headlinePrompt: 'Three different stakeholders ask for top priority this morning. How do you decide what comes first?',
    workplaceContext:
      'At 9:15 AM, you log on to three urgent requests: 1) A Slack DM from a marketing lead asking for a color tweak on a campaign banner going out at 11 AM; 2) A Jira ticket showing that 3% of users are seeing an error when resetting passwords; 3) Your sprint commitment to finish the billing tax calculation logic due at 3 PM for tomorrow’s scheduled deploy.',
    dilemmaStakes:
      'If you satisfy the marketing lead, the password bug hurts users and your billing sprint slips. If you jump into the billing sprint, the 11 AM campaign launches with broken colors.',
    whatHappenedExplainer:
      'Multiple stakeholders arrived simultaneously with competing definitions of "P0 urgency".',
    whyReactionOccurredExplainer:
      'Every stakeholder evaluates urgency through their own lens. Marketing sees revenue on their 11 AM campaign; Security/Support sees locked-out users; Product sees the sprint deployment roadmap.',
    whatCouldYouDoDifferentlyExplainer:
      'Apply the Impact vs. Time-to-Resolve triage model: Fix the 5-minute marketing asset first if it unblocks a time-locked launch, isolate the password defect impact, and communicate clear time slots for the billing sprint.',
    choices: [
      {
        id: 'sm-act-prio-a',
        label: 'A',
        actionText: 'Work on whatever ticket was opened first chronologically (First In, First Out).',
        isRecommended: false,
        whyItWorks: 'Feels neutral and avoids taking responsibility for deciding.',
        potentialConsequences:
          'Terrible business outcomes. Chronological order ignores severity, business value, and blast radius.',
        whatAProfessionalConsiders:
          'Triage is an active judgment call, not an automated queue. High impact and blast radius always trump chronological order.',
        howToImprove:
          'Evaluate blast radius: how many users or dollars are impacted by a 2-hour delay?',
        whatHappened: 'You substituted a mechanical rule for active prioritization.',
        whySomeoneReactsThisWay: 'Avoiding conflict by deferring to chronological order.',
        whatCouldYouDoDifferently: 'Score requests by severity and time sensitivity.',
      },
      {
        id: 'sm-act-prio-b',
        label: 'B',
        actionText: 'Triage by blast radius and time-sensitivity: take 15 mins to unblock the 11 AM marketing launch, coordinate a hotfix for the password reset, and lock deep focus for billing from 12-3 PM.',
        isRecommended: true,
        whyItWorks:
          'Maximizes organizational throughput. Addresses the time-sensitive constraint without abandoning the system defect or sprint goal.',
        potentialConsequences:
          'All three stakeholders get clear visibility. You manage expectations transparently and prevent panic.',
        whatAProfessionalConsiders:
          'Quick 15-minute blockers can be cleared first *if* they have a firm external deadline (11 AM campaign), freeing you for uninterrupted deep work on billing in the afternoon.',
        howToImprove:
          'Communicate the sequence to all parties: "Elena, shipping the banner tweak by 9:45 AM. Team, password reset is being triaged with support now; billing lock runs 12-3 PM."',
        whatHappened: 'You balanced immediate time-locks with critical system health.',
        whySomeoneReactsThisWay: 'Different departments have legitimate, time-bound pressures.',
        whatCouldYouDoDifferently: 'Map dependencies and execute in disciplined sequence.',
      },
      {
        id: 'sm-act-prio-c',
        label: 'C',
        actionText: 'Try to do all three simultaneously by opening 15 browser tabs and switching every 3 minutes.',
        isRecommended: false,
        whyItWorks: 'Creates a frantic sensation of extreme effort.',
        potentialConsequences:
          'Context-switching tax destroys productivity. You make errors in the billing tax logic, miss the 11 AM deadline, and fail to diagnose the password bug.',
        whatAProfessionalConsiders:
          'Multitasking is an illusion that reduces cognitive performance by up to 40%. Single-task in sequenced time blocks.',
        howToImprove:
          'Close tabs, commit to one task for 45 minutes, then switch with intention.',
        whatHappened: 'You succumbed to context-switching panic.',
        whySomeoneReactsThisWay: 'Desire to please everyone simultaneously.',
        whatCouldYouDoDifferently: 'Sequence work into dedicated timeblocks.',
      },
    ],
    keyMindsetTakeaway:
      'Prioritization is not working faster on everything; it is choosing what to do first, what to do second, and what to communicate to everyone else.',
  },

  // 3. Time Management
  {
    id: 'sm-act-time-management',
    area: 'self_management',
    moduleKey: 'self_management',
    activityType: 'time_management',
    title: 'Time Management: Defending Deep Work Against Meeting Fragmentations',
    headlinePrompt: 'Your calendar has four 30-minute meetings scattered across the day, leaving zero focus blocks. How do you adapt?',
    workplaceContext:
      'Your schedule today: 10:00–10:30 AM (Sprint check-in), 11:30 AM–12:00 PM (1-on-1 with PM), 1:30–2:00 PM (Design critique), 3:00–3:30 PM (Cross-functional sync). Between each meeting is an awkward 45-to-60 minute gap. You have a complex backend caching algorithm to write that requires at least 2 consecutive hours of uninterrupted thinking.',
    dilemmaStakes:
      'Fragmented calendars induce "Swiss cheese syndrome": you spend the 45-minute gaps browsing Slack because you know you will be interrupted shortly, ending the day with zero deep progress.',
    whatHappenedExplainer:
      'Schedule fragmentation fragmented cognitive attention into sub-critical chunks insufficient for complex problem-solving.',
    whyReactionOccurredExplainer:
      'Meeting organizers pick the first open slot on your calendar without realizing that four 30-minute meetings can destroy an entire 8-hour engineering day.',
    whatCouldYouDoDifferentlyExplainer:
      'Proactively cluster meetings into adjacent blocks (e.g. morning cluster or afternoon cluster), protect dedicated "Focus Blocks" on your shared calendar, and utilize small gaps for low-cognitive admin tasks.',
    choices: [
      {
        id: 'sm-act-time-a',
        label: 'A',
        actionText: 'Decline all four meetings with a blunt message: "I am too busy coding to attend meetings today."',
        isRecommended: false,
        whyItWorks: 'Instantly clears your calendar.',
        potentialConsequences:
          'Damages cross-functional relationships, makes you look uncollaborative, and misses critical alignment on design and sprint priorities.',
        whatAProfessionalConsiders:
          'Meetings are how organizations coordinate. You cannot unilaterally reject all alignment; you must negotiate clustering.',
        howToImprove:
          'Propose rescheduling to consolidate meetings together rather than flat rejection.',
        whatHappened: 'You rejected team coordination to protect personal comfort.',
        whySomeoneReactsThisWay: 'Frustration with meeting overload leads to reactionary boundary setting.',
        whatCouldYouDoDifferently: 'Negotiate meeting consolidation respectfully.',
      },
      {
        id: 'sm-act-time-b',
        label: 'B',
        actionText: 'Cluster meetings adjacent to each other, place a recurring 2.5-hour Focus Block on your calendar, and use the 45-min gaps for PR reviews and email triage.',
        isRecommended: true,
        whyItWorks:
          'Preserves team collaboration while creating unbroken stretches for deep problem solving.',
        potentialConsequences:
          'You get 2.5 hours of uninterrupted focus in the morning or afternoon. Your code quality and velocity rise substantially.',
        whatAProfessionalConsiders:
          'Reach out to the PM: "Hey Sarah, noticed our 1-on-1 is at 11:30 right after standup. Would it work to move it to 10:30 AM right against standup? That clusters my syncs and leaves an open 3-hour focus block for the caching algorithm."',
        howToImprove:
          'Use calendar color-coding and shared team focus agreements (e.g., No-Meeting Wednesday afternoons).',
        whatHappened: 'You actively managed your calendar architecture rather than suffering through it.',
        whySomeoneReactsThisWay: 'Colleagues rarely realize schedule impact unless you propose consolidation.',
        whatCouldYouDoDifferently: 'Cluster meetings and protect dedicated focus blocks.',
      },
      {
        id: 'sm-act-time-c',
        label: 'C',
        actionText: 'Accept the fragmented calendar, browse social media during the 45-minute gaps, and work until 10 PM to code.',
        isRecommended: false,
        whyItWorks: 'Avoids asking anyone to move a meeting.',
        potentialConsequences:
          'Leads to chronic late-night work, resentment of colleagues, and poor long-term sustainability.',
        whatAProfessionalConsiders:
          'Treat your attention as a high-value asset. Professionals design their working rhythm proactively.',
        howToImprove:
          'Match task cognitive load to time slot size (45 mins = PR review; 2 hours = deep coding).',
        whatHappened: 'You surrendered control of your focus to schedule fragmentation.',
        whySomeoneReactsThisWay: 'Passive acceptance of default calendar layouts.',
        whatCouldYouDoDifferently: 'Batch meetings and align tasks to available time blocks.',
      },
    ],
    keyMindsetTakeaway:
      'Time management is attention management. Protect 2-hour focus blocks for deep work and cluster collaborative syncs together.',
  },

  // 4. Deadline Management
  {
    id: 'sm-act-deadline-management',
    area: 'self_management',
    moduleKey: 'self_management',
    activityType: 'deadline_management',
    title: 'Deadline Management: Mid-Sprint Warning on an Underestimated Task',
    headlinePrompt: 'On Wednesday afternoon, you realize your Friday 5 PM commitment requires 12 more hours than planned. What do you do?',
    workplaceContext:
      'In Monday planning, you estimated the third-party payment integration would take 16 hours, targeting Friday at 5:00 PM. By Wednesday at 2:00 PM, after spending 12 hours battling undocumented API webhooks, you estimate you still need at least 16 additional hours to finish. You have only 14 working hours left before the Friday deadline.',
    dilemmaStakes:
      'Admitting an estimate error mid-week feels humbling. But waiting until Friday afternoon guarantees that QA and product managers cannot ship their release.',
    whatHappenedExplainer:
      'An engineering estimate proved inaccurate due to hidden third-party complexity.',
    whyReactionOccurredExplainer:
      'Underestimating software complexity is an unavoidable reality of development. High-performing teams expect estimates to shift; what they evaluate is how quickly you communicate the variance.',
    whatCouldYouDoDifferentlyExplainer:
      'Notify stakeholders on Wednesday with the updated projection, explain the specific hidden complexity (webhook documentation), and present two concrete scope/schedule options.',
    choices: [
      {
        id: 'sm-act-dlm-a',
        label: 'A',
        actionText: 'Keep quiet, hope you code 2x faster on Thursday and Friday, and say nothing unless you actually miss the deadline on Friday afternoon.',
        isRecommended: false,
        whyItWorks: 'Postpones difficult conversations and clings to optimistic hope.',
        potentialConsequences:
          'Catastrophic failure of predictability. On Friday at 4:30 PM, the team learns the release cannot ship, wasting QA weekend prep time.',
        whatAProfessionalConsiders:
          'Hope is not an engineering strategy. The difference between a junior and a senior engineer is the speed at which they communicate an estimate deviation.',
        howToImprove:
          'Communicate variance the moment the 50% milestone passes with more than 50% work remaining.',
        whatHappened: 'You gambled on unrealistic speed instead of managing the commitment.',
        whySomeoneReactsThisWay: 'Fear of admitting an estimation error.',
        whatCouldYouDoDifferently: 'Sound the alarm on Wednesday while stakeholders still have options.',
      },
      {
        id: 'sm-act-dlm-b',
        label: 'B',
        actionText: 'Raise a clear mid-sprint adjustment on Wednesday: quantify the remaining 16 hours, explain the webhook obstacle, and propose 2 clear paths forward.',
        isRecommended: true,
        whyItWorks:
          'Gives stakeholders 48 hours to adapt (e.g. adjust release notes, descope a secondary feature, or shift release to Monday).',
        potentialConsequences:
          'Your manager thanks you for the proactive transparency. The team re-calibrates without panic or blame.',
        whatAProfessionalConsiders:
          'Update format: "Heads up on the payment integration: I spent 12 hours debugging the third-party webhook API, which requires manual fallback polling. Finishing robust retry logic requires ~16 more hours, so Friday 5 PM is at risk. Two options: 1) Ship core card payments Friday, adding webhooks Monday; 2) Shift the full release to Monday 2 PM. I recommend Option 2 for security."',
        howToImprove:
          'Pair every deadline alert with a scoping trade-off.',
        whatHappened: 'You treated a deadline as a live forecast rather than a secret trap.',
        whySomeoneReactsThisWay: 'Stakeholders value early predictability over late perfection.',
        whatCouldYouDoDifferently: 'Provide early notification and actionable alternatives.',
      },
      {
        id: 'sm-act-dlm-c',
        label: 'C',
        actionText: 'Cut out all testing, remove error handling, and deploy raw unverified code on Friday at 4:55 PM to technically hit the deadline.',
        isRecommended: false,
        whyItWorks: 'Allows you to claim you finished on time.',
        potentialConsequences:
          'Customers experience failed transactions over the weekend. A production incident is 10x more costly than an honest 2-day timeline extension.',
        whatAProfessionalConsiders:
          'Shipping dangerous shortcuts to hide estimate misses is an integrity failure.',
        howToImprove:
          'Never trade system reliability for artificial calendar dates.',
        whatHappened: 'You sacrificed code safety to preserve an artificial timeline.',
        whySomeoneReactsThisWay: 'Equating deadline misses with personal failure.',
        whatCouldYouDoDifferently: 'Hold quality non-negotiable and negotiate dates instead.',
      },
    ],
    keyMindsetTakeaway:
      'Estimates are forecasts, not contracts. When reality diverges from your forecast, communicate early while your team still has choices.',
  },

  // 5. Working Without Constant Supervision
  {
    id: 'sm-act-without-supervision',
    area: 'self_management',
    moduleKey: 'self_management',
    activityType: 'working_without_supervision',
    title: 'Working Without Constant Supervision: Managing a 3-Day Manager Absence',
    headlinePrompt: 'Your manager is away at an offsite for 3 days and you finish your assigned user story by Tuesday noon. What do you do?',
    workplaceContext:
      'Your engineering manager is at an all-company leadership offsite with zero Slack access until Thursday evening. You completed your assigned user story (refactoring the billing invoice table) on Tuesday at 12:30 PM. Your code is submitted for peer review. You have 2.5 full working days before your manager returns.',
    dilemmaStakes:
      'If you slack off and wait for instructions, you waste 20 hours and look passive. If you jump into high-risk production code without alignment, you might create unintended mess.',
    whatHappenedExplainer:
      'A period of autonomous downtime occurred where direct supervision was temporarily unavailable.',
    whyReactionOccurredExplainer:
      'Managers use offsites as an implicit test of team self-direction. They observe whether contributors freeze, slack off, or take disciplined initiative on secondary priorities.',
    whatCouldYouDoDifferentlyExplainer:
      'Triage low-risk, high-value backlog items: write automated test coverage, tackle documented tech debt, review peers’ open PRs, or conduct self-directed learning aligned with team goals.',
    choices: [
      {
        id: 'sm-act-sup-a',
        label: 'A',
        actionText: 'Treat the remaining 2.5 days as free vacation, browse Reddit, and pretend you are still coding the invoice table.',
        isRecommended: false,
        whyItWorks: 'Effortless in the moment.',
        potentialConsequences:
          'Destroys personal integrity. When Git commit history and PR timestamps reveal you finished Tuesday noon, leadership recognizes passive disengagement.',
        whatAProfessionalConsiders:
          'Autonomous time reveals your true professional character. High performers take pride in self-directed momentum.',
        howToImprove:
          'Use open time to build career evidence and tackle high-yield backlog items.',
        whatHappened: 'You treated supervisory absence as an excuse for disengagement.',
        whySomeoneReactsThisWay: 'Lack of intrinsic goal structure.',
        whatCouldYouDoDifferently: 'Pull self-directed, low-risk backlog items.',
      },
      {
        id: 'sm-act-sup-b',
        label: 'B',
        actionText: 'Post a concise async update: pick up a well-scoped P2 backlog task (e.g. accessibility audit or test coverage), and help unblock peer PR reviews.',
        isRecommended: true,
        whyItWorks:
          'Displays stellar autonomy and lateral leadership. You create tangible value without needing someone to hold your hand.',
        potentialConsequences:
          'Your manager returns Thursday to find your primary task ready, 3 peer PRs reviewed, and 8 accessibility bugs fixed. Your promotion readiness score skyrockets.',
        whatAProfessionalConsiders:
          'Post in the team channel: "Billing invoice table is up for review in PR #88. While Brenda is at the offsite, I’m picking up documented backlog item TECH-204 (improving automated test coverage on the auth module) and helping unblock peer reviews. Let me know if anyone needs pairing!"',
        howToImprove:
          'Document your autonomous contributions in your weekly status note.',
        whatHappened: 'You demonstrated high initiative and self-directed productivity.',
        whySomeoneReactsThisWay: 'Autonomous contributors proactively advance team health.',
        whatCouldYouDoDifferently: 'Pick low-risk, uncontroversial backlog items and support peers.',
      },
      {
        id: 'sm-act-sup-c',
        label: 'C',
        actionText: 'Unilaterally decide to rewrite the entire company database schema without asking anyone because you have free time.',
        isRecommended: false,
        whyItWorks: 'Ambitious and technically complex.',
        potentialConsequences:
          'Causes architectural chaos. Large, unaligned changes made in isolation break peer workflows and will likely be rejected.',
        whatAProfessionalConsiders:
          'Autonomy means picking safe, well-aligned work—not making unilateral architectural decisions behind leadership’s back.',
        howToImprove:
          'Save large speculative projects for formal RFC proposals.',
        whatHappened: 'You confused rogue unilateral action with constructive autonomy.',
        whySomeoneReactsThisWay: 'Unchecked ambition without architectural discipline.',
        whatCouldYouDoDifferently: 'Stick to aligned technical debt and test improvements.',
      },
    ],
    keyMindsetTakeaway:
      'Working without supervision is the ultimate test of professional maturity. High performers don’t wait for orders; they find safe, high-value ways to help the team.',
  },

  // 6. Breaking Large Work into Smaller Tasks
  {
    id: 'sm-act-breaking-large-work',
    area: 'self_management',
    moduleKey: 'self_management',
    activityType: 'breaking_large_work',
    title: 'Breaking Large Work into Smaller Tasks: Deconstructing an Overwhelming Epic',
    headlinePrompt: 'You are handed a massive vague epic: "Rebuild the user export system." Where do you begin?',
    workplaceContext:
      'Your product manager creates a ticket with two sentences: "Users need to be able to export their account data to comply with privacy laws. Rebuild the user export system." The epic feels paralyzingly huge: database queries, file compression, cloud storage, security permissions, email notifications, and download links.',
    dilemmaStakes:
      'Staring at a massive monolithic epic leads to analysis paralysis. Trying to write one giant PR that does everything creates a 2,000-line monster that no reviewer will touch.',
    whatHappenedExplainer:
      'You received a broad architectural epic with high cognitive complexity and undefined sub-boundaries.',
    whyReactionOccurredExplainer:
      'Large ambiguous projects trigger procrastination and anxiety because the human brain struggles to hold 10 interconnected unknowns at once.',
    whatCouldYouDoDifferentlyExplainer:
      'Deconstruct the epic into vertical, independently verifiable slices: 1) Data extraction query; 2) Async zip generation worker; 3) Secure S3 upload & signed URL; 4) Frontend download button. Ship each slice as a discrete 200-line PR.',
    choices: [
      {
        id: 'sm-act-blw-a',
        label: 'A',
        actionText: 'Spend 2 weeks writing code on a single local branch until the entire export system is 100% finished before showing anyone.',
        isRecommended: false,
        whyItWorks: 'Avoids breaking the task down into multiple reviews.',
        potentialConsequences:
          'Produces a 2,500-line monster PR that sits in review for 2 weeks, has massive merge conflicts, and is rejected because an early architectural assumption was flawed.',
        whatAProfessionalConsiders:
          'Small PRs get reviewed in 20 minutes; giant PRs get put off for days. Small PRs isolate regression bugs and keep team velocity high.',
        howToImprove:
          'Never submit PRs larger than 300–400 lines unless it is auto-generated code.',
        whatHappened: 'You built a monolithic branch that was painful to review and test.',
        whySomeoneReactsThisWay: 'Desire to complete the puzzle before showing the pieces.',
        whatCouldYouDoDifferently: 'Slice the project into vertical, reviewable increments.',
      },
      {
        id: 'sm-act-blw-b',
        label: 'B',
        actionText: 'Deconstruct the epic into 4 thin vertical milestones with discrete interface contracts, and submit small, testable PRs incrementally.',
        isRecommended: true,
        whyItWorks:
          'Eliminates paralysis immediately. Each sub-task can be coded, tested, and reviewed in 1–2 days, creating steady visible momentum.',
        potentialConsequences:
          'Reviewers praise the clean, bite-sized PRs. QA can test data extraction while you build the email delivery worker. The epic ships early.',
        whatAProfessionalConsiders:
          'Slice sequence: Milestone 1: SQL query function + unit tests (PR #1). Milestone 2: Background worker queue + zip generator (PR #2). Milestone 3: S3 presigned URL generation (PR #3). Milestone 4: Frontend UI trigger modal (PR #4).',
        howToImprove:
          'Create Jira sub-tasks with clear acceptance criteria for each slice.',
        whatHappened: 'You reduced systemic complexity by creating modular milestones.',
        whySomeoneReactsThisWay: 'Complex engineering succeeds through decomposition.',
        whatCouldYouDoDifferently: 'Break large epics into independently testable pull requests.',
      },
      {
        id: 'sm-act-blw-c',
        label: 'C',
        actionText: 'Freeze and spend 4 days writing a 30-page speculative architectural design doc without writing any code.',
        isRecommended: false,
        whyItWorks: 'Feels deeply intellectual.',
        potentialConsequences:
          'Over-engineering paralysis. You design for 10 hypothetical edge cases before verifying basic database extraction latency.',
        whatAProfessionalConsiders:
          'A 1-page design summary is plenty for a feature of this scale. Balance architectural planning with empirical prototyping.',
        howToImprove:
          'Write a 1-page spike summary, then build Milestone 1 to test assumptions.',
        whatHappened: 'You fell into analysis paralysis instead of incremental delivery.',
        whySomeoneReactsThisWay: 'Fear of building the wrong thing leads to endless documentation.',
        whatCouldYouDoDifferently: 'Write a lean 1-page spec and build proof-of-concept slices.',
      },
    ],
    keyMindsetTakeaway:
      'Any intimidating project is just 5 small, manageable tasks hiding under a scary title. Break the epic down until each piece takes 1 day.',
  },

  // 7. Handling Distractions
  {
    id: 'sm-act-handling-distractions',
    area: 'self_management',
    moduleKey: 'self_management',
    activityType: 'handling_distractions',
    title: 'Handling Distractions: Defending Attention Against Notification Pings',
    headlinePrompt: 'You get pinged on Slack every 10 minutes while trying to solve a complex bug. How do you protect focus?',
    workplaceContext:
      'It is 1:30 PM. You are deep in the middle of diagnosing a tricky database race condition that causes double-charging. Every 8 to 12 minutes, a notification sound fires: someone posts a meme in #random, a teammate asks where the Figma link is, an email arrives about company swag, and a direct message asks: "Hey, got a quick sec?"',
    dilemmaStakes:
      'Every time you check a ping, your brain loses its mental model of the race condition, resetting your progress by 15 minutes. But turning off all communication completely makes colleagues think you are offline or unresponsive.',
    whatHappenedExplainer:
      'Asynchronous workplace communication tools created notification fragmentation that destroyed deep cognitive flow.',
    whyReactionOccurredExplainer:
      'Colleagues message asynchronously because it is convenient for *them* in that moment; they rarely expect an immediate 30-second response unless it is a P0 production outage.',
    whatCouldYouDoDifferentlyExplainer:
      'Use asynchronous communication hygiene: set your Slack status to "Deep Work / Solving P0 Bug (Back at 3:30 PM)", snooze notifications for 90 minutes, and triage messages in scheduled batches.',
    choices: [
      {
        id: 'sm-act-dis-a',
        label: 'A',
        actionText: 'Reply immediately to every single notification within 15 seconds to prove that you are working hard at your desk.',
        isRecommended: false,
        whyItWorks: 'Makes you look hyper-responsive.',
        potentialConsequences:
          'Your deep work collapses completely. At 5:00 PM, the race condition is still unsolved, and you feel mentally drained without having accomplished anything substantial.',
        whatAProfessionalConsiders:
          'Being responsive to trivial pings is a poor substitute for delivering high-impact technical work. Value comes from output, not instant chat replies.',
        howToImprove:
          'Batch message checking into dedicated 15-minute windows before lunch and at the end of the day.',
        whatHappened: 'You prioritized notification responsiveness over critical problem solving.',
        whySomeoneReactsThisWay: 'Anxiety that delayed replies look like slacking off.',
        whatCouldYouDoDifferently: 'Set a clear focus status and snooze non-urgent notifications.',
      },
      {
        id: 'sm-act-dis-b',
        label: 'B',
        actionText: 'Set a clear Slack status ("🎧 Heads Down on Race Condition Bug • Checking DMs at 3:30 PM"), pause notifications for 90 mins, and solve the bug.',
        isRecommended: true,
        whyItWorks:
          'Eliminates distraction without leaving teammates in the dark. Colleagues see why you aren’t replying and know when you will be back.',
        potentialConsequences:
          'You solve the race condition in 75 minutes of uninterrupted focus. You check Slack at 3:30 PM and answer all accumulated questions in 10 minutes.',
        whatAProfessionalConsiders:
          'Status hygiene: "If there is a genuine P0 production outage, please call my mobile or tag the on-call engineer." This gives peers an emergency escape hatch while protecting your focus.',
        howToImprove:
          'Close browser tabs for email and team chat during deep work sprints.',
        whatHappened: 'You established transparent focus boundaries with asynchronous etiquette.',
        whySomeoneReactsThisWay: 'Teammates respect focus when you tell them when you will return.',
        whatCouldYouDoDifferently: 'Publish your focus window and check messages in batches.',
      },
      {
        id: 'sm-act-dis-c',
        label: 'C',
        actionText: 'Mute everything silently with no status, ignore messages for 2 days, and act annoyed when someone asks why you didn’t reply.',
        isRecommended: false,
        whyItWorks: 'Stops notifications completely.',
        potentialConsequences:
          'Breeds team friction. Teammates assume you are disconnected, leads worry you are MIA, and collaboration stalls.',
        whatAProfessionalConsiders:
          'Silence without context generates team anxiety. Communication boundaries must be explicit, not passive-aggressive.',
        howToImprove:
          'Always communicate the duration of your focus window.',
        whatHappened: 'You disconnected without setting expectations for colleagues.',
        whySomeoneReactsThisWay: 'Overwhelm can trigger defensive ghosting.',
        whatCouldYouDoDifferently: 'Provide a clear time-bound status indicator.',
      },
    ],
    keyMindsetTakeaway:
      'You do not have to be available every second to be a great teammate. Set an explicit status, protect 90 minutes of focus, and batch your replies.',
  },

  // =========================================================================
  // MODULE 3: PROFESSIONAL BEHAVIOR (6 Activities)
  // =========================================================================

  // 1. Ownership
  {
    id: 'pb-act-ownership',
    area: 'professionalism',
    moduleKey: 'professional_behavior',
    activityType: 'ownership',
    title: 'Ownership: Stepping Up When a Staging Deploy Breaks',
    headlinePrompt: 'Your commit was merged right before staging broke. What do you do?',
    workplaceContext:
      'At 4:15 PM, automated test suites on the shared staging server suddenly fail with red alerts. Four QA engineers and two frontend developers are blocked from testing tomorrow’s release. Someone in #eng-announcements posts: "Staging is completely down—who pushed code last?" You check Git history: your PR #108 was the most recent merge 10 minutes ago.',
    dilemmaStakes:
      'Your heart beats fast. You could stay quiet and wait for someone else to debug the logs, or step forward immediately, isolate the issue, and roll back if needed.',
    whatHappenedExplainer:
      'A code integration caused an unexpected failure on a shared environment, blocking downstream teammates.',
    whyReactionOccurredExplainer:
      'The initial urge to hide or deflect blame stems from fear of criticism. But in elite engineering cultures, breaking staging is normal; running away from it is what damages careers.',
    whatCouldYouDoDifferentlyExplainer:
      'Step forward immediately: "Taking ownership—reverting my PR now to unblock everyone while I investigate locally." Speed of unblocking the team matters 10x more than pride.',
    choices: [
      {
        id: 'pb-act-own-a',
        label: 'A',
        actionText: 'Stay silent in the channel and quietly hope someone else finds that it was actually a database network glitch.',
        isRecommended: false,
        whyItWorks: 'Avoids public association with the broken build.',
        potentialConsequences:
          'Wastes 45 minutes of team time while people search in the dark. When Git blame inevitably identifies your commit, you look cowardly and untrustworthy.',
        whatAProfessionalConsiders:
          'Git history is permanent and public. Everyone will know within 15 minutes anyway. Stepping forward voluntarily turns a mistake into a display of character.',
        howToImprove:
          'Be the first person to post: "Looking into this now."',
        whatHappened: 'You hid from an obvious technical dependency out of fear.',
        whySomeoneReactsThisWay: 'Fear of public failure triggers freeze responses.',
        whatCouldYouDoDifferently: 'Claim the incident immediately and prioritize unblocking peers.',
      },
      {
        id: 'pb-act-own-b',
        label: 'B',
        actionText: 'Reply in the channel immediately: "I merged PR #108 10 mins ago—reverting it right now to unblock staging while I investigate the failure locally."',
        isRecommended: true,
        whyItWorks:
          'Demonstrates elite professional ownership. Prioritizes the team’s productivity over personal pride and resolves the blocker in 2 minutes.',
        potentialConsequences:
          'Staging turns green immediately. The team is unblocked. Colleagues and leads respect your prompt accountability and poise under fire.',
        whatAProfessionalConsiders:
          'The first rule of incident response: "Revert first, debug later." Unblocking the 6 teammates waiting on staging is priority #1. You can inspect the logs safely on your local branch.',
        howToImprove:
          'Follow up after with a brief diagnosis: "Found the issue: missing env variable on staging. Added a validation check in PR #109."',
        whatHappened: 'You owned the impact and acted swiftly to restore team velocity.',
        whySomeoneReactsThisWay: 'High ownership values team uptime over personal ego.',
        whatCouldYouDoDifferently: 'Revert promptly, unblock peers, and debug locally.',
      },
      {
        id: 'pb-act-own-c',
        label: 'C',
        actionText: 'Post in the channel arguing that your code passed local tests, so it must be DevOps’ fault for having a broken staging environment.',
        isRecommended: false,
        whyItWorks: 'Deflects blame away from yourself.',
        potentialConsequences:
          'Creates hostile finger-pointing between software engineers and infrastructure teams. You look immature and combative.',
        whatAProfessionalConsiders:
          'Saying "it works on my machine" is an industry punchline. Professionals care about how code behaves in shared environments.',
        howToImprove:
          'Focus on fixing the environment discrepancy collaboratively.',
        whatHappened: 'You blamed infrastructure rather than investigating the regression.',
        whySomeoneReactsThisWay: 'Defensive reflex when code behaves differently in staging.',
        whatCouldYouDoDifferently: 'Work with DevOps to diagnose environment divergence.',
      },
    ],
    keyMindsetTakeaway:
      'Ownership is not being infallible; ownership is being the first person to say: "My change touched this—let me revert it and unblock the team right now."',
  },

  // 2. Reliability
  {
    id: 'pb-act-reliability',
    area: 'professionalism',
    moduleKey: 'professional_behavior',
    activityType: 'reliability',
    title: 'Reliability: Following Through on a Peer Promise Despite Schedule Chaos',
    headlinePrompt: 'You promised to review a peer’s pull request by 11 AM so they can merge before lunch. An unexpected meeting appears. What do you do?',
    workplaceContext:
      'Yesterday, your teammate Maya asked if you could review her complex 300-line checkout refactor by 11:00 AM today so she can merge before the noon staging freeze. You promised: "Yes, definitely, I’ll do it first thing." At 9:45 AM, an urgent cross-functional meeting is scheduled from 10:00 to 11:00 AM.',
    dilemmaStakes:
      'If you attend the meeting and silently ignore the review, Maya misses the staging freeze and her sprint commitment fails because of you. If you skip the meeting without context, you look unprofessional.',
    whatHappenedExplainer:
      'A scheduling collision threatened an explicit professional commitment made to a teammate.',
    whyReactionOccurredExplainer:
      'Calendar collisions happen daily in dynamic companies. Reliability is not never having conflicts; reliability is managing conflicting commitments proactively so others aren’t stranded.',
    whatCouldYouDoDifferentlyExplainer:
      'Give Maya immediate notice at 9:45 AM, propose an adjusted plan (e.g. review during the first 15 mins of the meeting or ask a second reviewer to co-pair), and verify she doesn’t miss the freeze.',
    choices: [
      {
        id: 'pb-act-rel-a',
        label: 'A',
        actionText: 'Say nothing to Maya, attend the meeting, and review her PR at 2:30 PM whenever you finally get around to it.',
        isRecommended: false,
        whyItWorks: 'Avoids having to negotiate or communicate the conflict.',
        potentialConsequences:
          'Maya misses the noon staging freeze, delaying her work by 24 hours. She learns that your word cannot be trusted for time-sensitive commitments.',
        whatAProfessionalConsiders:
          'A broken peer commitment damages relationships faster than almost anything else. If you make a promise, treat their deadline as your deadline.',
        howToImprove:
          'Communicate conflicts the instant they appear on your calendar.',
        whatHappened: 'You silently abandoned a peer commitment due to passive calendar drift.',
        whySomeoneReactsThisWay: 'Assuming peer promises are secondary to manager meetings.',
        whatCouldYouDoDifferently: 'Alert your peer immediately and arrange alternative review coverage.',
      },
      {
        id: 'pb-act-rel-b',
        label: 'B',
        actionText: 'Message Maya at 9:45 AM: explain the 10 AM meeting, offer to review before the meeting or tag Ken as a backup reviewer to protect her noon freeze.',
        isRecommended: true,
        whyItWorks:
          'Protects Maya’s deadline proactively. Shows that you take your commitments seriously and won’t leave her stranded.',
        potentialConsequences:
          'Maya appreciates the rapid heads-up. Ken reviews the PR by 10:45 AM, Maya hits her noon freeze, and your reputation for reliability is cemented.',
        whatAProfessionalConsiders:
          'Ping Maya: "Hey Maya! A sudden sync was just scheduled for 10-11 AM. I want to make sure you don’t miss your noon freeze: I am reviewing the first half right now (9:45-10:00 AM), and I asked Ken to pair on the rest if I get tied up. You will have review sign-off by 11:15 AM guaranteed."',
        howToImprove:
          'Always provide a concrete mitigation plan, not just an apology.',
        whatHappened: 'You proactively safeguarded a peer’s deadline despite calendar interference.',
        whySomeoneReactsThisWay: 'High reliability treats peer dependencies with urgency.',
        whatCouldYouDoDifferently: 'Coordinate backup review coverage and communicate immediately.',
      },
      {
        id: 'pb-act-rel-c',
        label: 'C',
        actionText: 'Rubber-stamp approve Maya’s PR in 30 seconds without reading any of the code just to say you approved it.',
        isRecommended: false,
        whyItWorks: 'Takes zero effort and hits the 11 AM time.',
        potentialConsequences:
          'Extreme risk of production checkout bugs. Blind "LGTM" approvals violate engineering ethics and compromise team quality.',
        whatAProfessionalConsiders:
          'A review is a quality guarantee, not a formality. Never approve code you haven’t thoroughly inspected.',
        howToImprove:
          'Ask for backup rather than submitting fake approvals.',
        whatHappened: 'You sacrificed code safety to pretend you honored a timeline.',
        whySomeoneReactsThisWay: 'Treating code review as a bureaucratic checkbox.',
        whatCouldYouDoDifferently: 'Ensure thorough review coverage through honest delegation.',
      },
    ],
    keyMindsetTakeaway:
      'Reliability means people can build plans around your promises. When schedule collisions happen, alert your peer immediately and protect their deadline.',
  },

  // 3. Asking for Help
  {
    id: 'pb-act-asking-for-help',
    area: 'professionalism',
    moduleKey: 'professional_behavior',
    activityType: 'asking_for_help',
    title: 'Asking for Help: Unblocking After a Disciplined 45-Minute Timebox',
    headlinePrompt: 'You have been stuck on a database migration error for 75 minutes. When and how should you ask for help?',
    workplaceContext:
      'You are trying to run a local migration script to add foreign key constraints. The terminal repeatedly fails with `Error: ER_FK_CANNOT_OPEN_TABLE: Can\'t create table (errno: 150)`. You searched StackOverflow, tried deleting cache files, and re-read the schema docs. It has been 75 minutes. You are making zero progress and feeling increasingly frustrated and inadequate.',
    dilemmaStakes:
      'If you keep banging your head against the wall for 4 more hours, you waste half a working day. If you ping a senior colleague saying "Help it’s broken", you force them to do all the work.',
    whatHappenedExplainer:
      'A technical blocker crossed the standard 45-minute self-troubleshooting threshold.',
    whyReactionOccurredExplainer:
      'Struggling alone for hours is not heroism; it is an inefficient waste of company capital. Senior engineers expect junior peers to try for 30–45 minutes, document what they tried, and then ask for targeted guidance.',
    whatCouldYouDoDifferentlyExplainer:
      'Structure a high-context question: 1) What goal you are pursuing; 2) The exact error code; 3) The 3 specific things you already tried; 4) A targeted question.',
    choices: [
      {
        id: 'pb-act-ask-a',
        label: 'A',
        actionText: 'Keep trying alone for the rest of the day until 5:00 PM because asking for help makes you look incompetent.',
        isRecommended: false,
        whyItWorks: 'Protects personal pride temporarily.',
        potentialConsequences:
          'Wastes 6 hours of engineering time on an issue a senior colleague could have diagnosed in 3 minutes (e.g. mismatched collation or engine types). The sprint slips.',
        whatAProfessionalConsiders:
          'Companies pay you to deliver outcomes, not to suffer in silence. A 45-minute timebox rule protects both learning and team velocity.',
        howToImprove:
          'Adopt the Rule of 45: Try independently for 45 minutes; if zero forward progress is made, ask.',
        whatHappened: 'You let pride burn half a working day on a routine syntax edge case.',
        whySomeoneReactsThisWay: 'Imposter syndrome convinces builders that asking for help reveals weakness.',
        whatCouldYouDoDifferently: 'Timebox independent troubleshooting to 45 minutes, then escalate.',
      },
      {
        id: 'pb-act-ask-b',
        label: 'B',
        actionText: 'Craft a structured async message: state the goal, the exact error, the 3 things you tested, and ask a targeted question.',
        isRecommended: true,
        whyItWorks:
          'Proves initiative and respect for colleague time. The senior engineer can answer in 30 seconds asynchronously because you provided all the context.',
        potentialConsequences:
          'The senior engineer replies in 5 minutes: "Check the collation—table A is utf8mb4 and table B is latin1." You fix it in 2 minutes and learn the underlying rule.',
        whatAProfessionalConsiders:
          'Message format: "Hey David, when you have a 2-min breather: stuck on local migration #42 with errno 150 (FK creation failure). What I’ve tested so far: 1) Verified foreign key data types match (both INT unsigned); 2) Dropped and recreated the parent table; 3) Verified indexing on parent column. My question: do our tables use different storage engines or collations in local Docker? Thanks!"',
        howToImprove:
          'Always list what you tried so colleagues don’t suggest things you already did.',
        whatHappened: 'You formulated a high-yield, high-context technical question.',
        whySomeoneReactsThisWay: 'High-performing teams value efficient unblocking over silent struggle.',
        whatCouldYouDoDifferently: 'State the error, list attempted solutions, and ask a targeted question.',
      },
      {
        id: 'pb-act-ask-c',
        label: 'C',
        actionText: 'Drop a message in the channel: "My migration is broken. Can someone jump on Zoom and fix it for me?"',
        isRecommended: false,
        whyItWorks: 'Offloads the effort to someone else immediately.',
        potentialConsequences:
          'Disrespects teammates’ time. Forces someone to stop their own coding flow to do basic diagnosis that you should have documented first.',
        whatAProfessionalConsiders:
          'Helpless questions build a reputation as someone who gives up without trying. High-context questions build a reputation as a rigorous engineer.',
        howToImprove:
          'Never ask for a live call without providing written context and error logs first.',
        whatHappened: 'You demanded synchronous attention without providing context.',
        whySomeoneReactsThisWay: 'Frustration and cognitive overload make people demand immediate rescues.',
        whatCouldYouDoDifferently: 'Provide asynchronous documentation before requesting live pairing.',
      },
    ],
    keyMindsetTakeaway:
      'Asking for help is a professional skill. Try for 45 minutes, document what you tried, and ask a structured question that saves your teammate’s time.',
  },

  // 4. Communicating Delays
  {
    id: 'pb-act-communicating-delays',
    area: 'professionalism',
    moduleKey: 'professional_behavior',
    activityType: 'communicating_delays',
    title: 'Communicating Delays: Early Notification on an External Dependency Failure',
    headlinePrompt: 'A third-party API outage delays your delivery. How do you notify downstream stakeholders?',
    workplaceContext:
      'You promised to deliver the verified payment gateway integration by 2:00 PM today so QA can run compliance tests before the Friday launch. At 11:00 AM, the sandbox payment provider announces an unscheduled API outage expected to last until 3:30 PM. Your code is complete, but cannot be tested end-to-end until their servers come back.',
    dilemmaStakes:
      'The delay is not your fault, but staying silent until 2:00 PM leaves QA stranded and annoyed. How you frame external delays reflects your ownership.',
    whatHappenedExplainer:
      'An external vendor dependency failed, threatening an internal team delivery commitment.',
    whyReactionOccurredExplainer:
      'When delays are caused by third parties, people often feel passive: "It’s not my fault, so I’ll just wait." But downstream colleagues don’t care whose fault it is; they care about how it impacts their afternoon.',
    whatCouldYouDoDifferentlyExplainer:
      'Notify stakeholders at 11:00 AM immediately. State what is complete (your code), what is blocked (vendor API), when the next update will happen, and offer mock testing fixtures so QA isn’t totally idle.',
    choices: [
      {
        id: 'pb-act-del-a',
        label: 'A',
        actionText: 'Wait until 2:00 PM, then post: "Stripe sandbox is down so I couldn’t test it. Not my fault."',
        isRecommended: false,
        whyItWorks: 'Postpones conversation and deflects responsibility.',
        potentialConsequences:
          'QA wasted their 2:00 PM time block waiting for you. You sound defensive and uninterested in the shared team outcome.',
        whatAProfessionalConsiders:
          'Saying "not my fault" signals low ownership. High-ownership professionals manage the impact of external failures proactively.',
        howToImprove:
          'Communicate at 11:00 AM, not 2:00 PM.',
        whatHappened: 'You delayed notification and washed your hands of team impact.',
        whySomeoneReactsThisWay: 'Defensiveness when external factors disrupt personal commitments.',
        whatCouldYouDoDifferently: 'Alert downstream peers hours in advance with proactive mitigations.',
      },
      {
        id: 'pb-act-del-b',
        label: 'B',
        actionText: 'Alert QA and Product at 11:00 AM: explain the vendor downtime, confirm code is frozen, provide mock fixtures for partial testing, and set an ETA.',
        isRecommended: true,
        whyItWorks:
          'Gives QA 3 hours of advance notice to rearrange their schedule. You provide a workaround that lets them test happy-path validation immediately.',
        potentialConsequences:
          'QA praises your rapid communication. Product adjusts the release gate without panic. You turn an external outage into a showcase of operational excellence.',
        whatAProfessionalConsiders:
          'Note: "Heads-up for QA @Brenda: Sandbox payment provider announced an API outage from 11:00 AM to ~3:30 PM. Our integration code is 100% written and frozen in PR #92. To unblock QA this afternoon, I created mock fixtures in branch \`mock-payments\` so you can test UI form validation right now. Will post a live status update at 3:30 PM the moment their API unlocks."',
        howToImprove:
          'Always separate code readiness from dependency availability.',
        whatHappened: 'You shielded downstream partners from external vendor fallout.',
        whySomeoneReactsThisWay: 'Professionals take ownership of outcomes, even when inputs fail.',
        whatCouldYouDoDifferently: 'Give immediate notice and supply mock workarounds.',
      },
      {
        id: 'pb-act-del-c',
        label: 'C',
        actionText: 'Tell QA that everything is 100% ready and let them discover the 500 error on the payment provider themselves.',
        isRecommended: false,
        whyItWorks: 'Allows you to pretend you hit your 2:00 PM commitment.',
        potentialConsequences:
          'QA spends 45 minutes debugging why their cards fail before realizing the sandbox is down. They will never trust your readiness declarations again.',
        whatAProfessionalConsiders:
          'Declaring something "ready" when it cannot function is a breach of professional integrity.',
        howToImprove:
          'Never declare readiness on broken or blocked dependencies.',
        whatHappened: 'You passed broken dependencies to QA to pretend you delivered.',
        whySomeoneReactsThisWay: 'Desire to check off a task on paper.',
        whatCouldYouDoDifferently: 'Verify end-to-end readiness before handing off.',
      },
    ],
    keyMindsetTakeaway:
      'When an external dependency slips, the delta between when you learn about the outage and when you notify your team is the true measure of your professionalism.',
  },

  // 5. Meeting Expectations
  {
    id: 'pb-act-meeting-expectations',
    area: 'professionalism',
    moduleKey: 'professional_behavior',
    activityType: 'meeting_expectations',
    title: 'Meeting Expectations: Holding to Team Quality Standards Under Time Crunch',
    headlinePrompt: 'Your team agreed to require automated tests, but you are rushing to finish before sprint close. What do you do?',
    workplaceContext:
      'In team retrospectives, the engineering squad agreed to a non-negotiable standard: every new feature must include at least two automated unit tests to prevent production regressions. It is Friday at 3:30 PM, and sprint freeze is at 5:00 PM. Your feature logic works manually in your browser, but writing the automated unit tests will take another 90 minutes. You have only 90 minutes left.',
    dilemmaStakes:
      'You could skip the tests, push the code, and pretend you forgot, or hold to the agreed team standard and make a conscious choice about sprint freeze.',
    whatHappenedExplainer:
      'A delivery deadline created intense temptation to cut corners on agreed team engineering standards.',
    whyReactionOccurredExplainer:
      'Time pressure always tests cultural agreements. Teams often talk about high standards during calm meetings, but true culture is revealed when someone has 90 minutes left before a deadline.',
    whatCouldYouDoDifferentlyExplainer:
      'Hold the standard non-negotiable. Write the automated tests with focus. If time runs short, communicate with your lead to either merge with tests as priority #1 Monday morning or take 20 minutes of overtime with explicit alignment.',
    choices: [
      {
        id: 'pb-act-exp-a',
        label: 'A',
        actionText: 'Skip the tests, push the code, and tell yourself you will write the tests next week in a future sprint.',
        isRecommended: false,
        whyItWorks: 'Hits the 5:00 PM deadline easily.',
        potentialConsequences:
          'You almost certainly won’t write the tests next week because new priorities will arrive. Over time, code debt accumulates and regressions slip into production.',
        whatAProfessionalConsiders:
          '"I’ll write tests later" is a widespread software lie. If code doesn’t have tests when it merges, it will never have tests.',
        howToImprove:
          'Treat tests as part of the feature, not an optional bonus add-on.',
        whatHappened: 'You abandoned team standards under routine time pressure.',
        whySomeoneReactsThisWay: 'Prioritizing superficial completion over enduring quality.',
        whatCouldYouDoDifferently: 'Define "done" as including automated tests.',
      },
      {
        id: 'pb-act-exp-b',
        label: 'B',
        actionText: 'Honor the team standard: spend the 90 mins writing the required unit tests. If you finish at 5:10 PM, update the lead with complete quality proof.',
        isRecommended: true,
        whyItWorks:
          'Protects the codebase from silent bugs. Proves to leads and peers that your word and the team’s quality agreements mean something.',
        potentialConsequences:
          'The PR merges with 100% test coverage. No bugs escape to staging. The lead respects that you refused to cut corners on team commitments.',
        whatAProfessionalConsiders:
          'Quality agreements exist precisely to prevent rushed Friday afternoon mistakes. Delivering 20 minutes late with bulletproof tests is 100x better than delivering on time with broken code.',
        howToImprove:
          'In future sprints, write unit tests alongside feature code (TDD style) rather than leaving them all to the final Friday hour.',
        whatHappened: 'You held to agreed professional standards despite crunch.',
        whySomeoneReactsThisWay: 'High performers protect system integrity under pressure.',
        whatCouldYouDoDifferently: 'Integrate automated tests into your routine development loop.',
      },
      {
        id: 'pb-act-exp-c',
        label: 'C',
        actionText: 'Write a fake mock test that just asserts \`expect(true).toBe(true)\` so the CI pipeline passes green.',
        isRecommended: false,
        whyItWorks: 'Tricks the automated system.',
        potentialConsequences:
          'Blatant ethics violation. When a peer reviewer or git audit uncovers the fake assertion, your integrity is completely destroyed.',
        whatAProfessionalConsiders:
          'Faking compliance to fool CI checks is a severe breach of professional conduct in any engineering organization.',
        howToImprove:
          'Never deceive automated guards or teammates.',
        whatHappened: 'You engaged in deceptive compliance to bypass team guardrails.',
        whySomeoneReactsThisWay: 'Desire to look compliant without doing the work.',
        whatCouldYouDoDifferently: 'Write genuine tests or communicate scope trade-offs honestly.',
      },
    ],
    keyMindsetTakeaway:
      'Standards are meaningless if you only follow them when it is easy. True professionalism is maintaining agreed quality even when the clock is ticking.',
  },

  // 6. Following Through
  {
    id: 'pb-act-following-through',
    area: 'professionalism',
    moduleKey: 'professional_behavior',
    activityType: 'following_through',
    title: 'Following Through: Closing Loops on Casual Volunteer Commitments',
    headlinePrompt: 'In Monday’s standup, you casually volunteered to "look into fixing the broken wiki links." By Thursday, nobody has asked about it. What do you do?',
    workplaceContext:
      'In Monday’s standup, the team lead lamented that the onboarding wiki was full of broken Figma and GitHub links. You spoke up and said: "I can take a pass at updating those this week." It wasn’t an official Jira ticket and nobody wrote it down. It is now Thursday afternoon. Nobody has reminded you or mentioned it.',
    dilemmaStakes:
      'You could easily pretend you forgot or that you were too busy. Nobody will reprimand you. But how you handle unprompted commitments determines whether you are viewed as casual or indispensable.',
    whatHappenedExplainer:
      'An informal voluntary commitment was made without a formal tracking ticket or oversight.',
    whyReactionOccurredExplainer:
      'Many contributors only do work that is tracked on a ticket with an assigned boss breathing down their neck. They treat verbal offers as disposable pleasantries.',
    whatCouldYouDoDifferentlyExplainer:
      'Follow through completely or close the loop transparently. Spend 45 minutes fixing the links, post the updated guide in the team channel, and fulfill your word.',
    choices: [
      {
        id: 'pb-act-fol-a',
        label: 'A',
        actionText: 'Do nothing and forget about it since nobody assigned a formal Jira ticket to you.',
        isRecommended: false,
        whyItWorks: 'Saves 45 minutes of effort.',
        potentialConsequences:
          'The lead remembers you volunteered, even if they don’t say it out loud. Over time, they register that your casual commitments have a 0% follow-through rate.',
        whatAProfessionalConsiders:
          'Leaders remember who follows through without being chased. Unprompted follow-through is the #1 indicator of promotion readiness.',
        howToImprove:
          'If you say you will do something, write it down on your personal task list immediately.',
        whatHappened: 'You discarded a voluntary commitment because nobody was tracking you.',
        whySomeoneReactsThisWay: 'Assuming unmeasured commitments don’t count.',
        whatCouldYouDoDifferently: 'Treat voluntary commitments with the same rigor as sprint tickets.',
      },
      {
        id: 'pb-act-fol-b',
        label: 'B',
        actionText: 'Carve out 45 minutes on Thursday to audit and fix the links, then post a clean 2-sentence confirmation in the team channel.',
        isRecommended: true,
        whyItWorks:
          'Closes the loop seamlessly. Establishes a track record as someone who keeps their word even when no one is watching.',
        potentialConsequences:
          'The team lead and next new hires are delighted. Colleagues notice that when you say something, it gets done. You build immense quiet credibility.',
        whatAProfessionalConsiders:
          'Post: "Quick follow-up from Monday’s retro: took a pass through the onboarding wiki this afternoon and updated all 14 broken Figma and GitHub links. Next new hires will have a seamless onboarding guide!"',
        howToImprove:
          'Close loops visibly with a humble, service-oriented note.',
        whatHappened: 'You honored an informal commitment with independent execution.',
        whySomeoneReactsThisWay: 'High-reliability professionals take pride in closing all open loops.',
        whatCouldYouDoDifferently: 'Execute the voluntary task and post a brief closure note.',
      },
      {
        id: 'pb-act-fol-c',
        label: 'C',
        actionText: 'Wait until Friday standup and make an excuse: "I wanted to fix the wiki, but I was just way too busy with tickets."',
        isRecommended: false,
        whyItWorks: 'Attempts to excuse inaction before anyone asks.',
        potentialConsequences:
          'Draws awkward attention to your lack of follow-through. Making unsolicited excuses highlights that you dropped the ball.',
        whatAProfessionalConsiders:
          'If you genuinely didn’t have time, it is better to say: "I wasn’t able to get to the wiki due to the billing crunch; I’ve slated it for next Tuesday."',
        howToImprove:
          'Never make excuses; renegotiate timelines with clear ownership.',
        whatHappened: 'You made unsolicited excuses for a task you volunteered for.',
        whySomeoneReactsThisWay: 'Guilt over unfulfilled verbal commitments.',
        whatCouldYouDoDifferently: 'Either execute the task or reschedule it with clear ownership.',
      },
    ],
    keyMindsetTakeaway:
      'Indispensable professionals don’t need a boss or a ticket to keep their word. Closing loops on what you volunteered to do builds quiet, unbreakable reputation.',
  },
];
