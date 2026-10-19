import {
  PersonalizedRecommendation,
  PersonalizedRoadmap,
  UserBehavioralProfile,
  UserFeedbackType,
  PaceMode,
  ContinuousLearnerSignals,
} from '../types/personalization';
import { UserProfile, DEFAULT_USER_PROFILE } from '../types/user';
import { getEvidenceItems } from './evidenceService';
import { getInterviewSessions } from './interviewService';
import { getApplications } from './opportunitiesService';
import { getScenarioResolutions } from './workReadyService';

const BEHAVIORAL_PROFILE_STORAGE_KEY = 'careeros_behavioral_profile';

/**
 * Loads the user's ongoing behavioral profile from storage
 * or generates an initial baseline.
 */
export function getBehavioralProfile(): UserBehavioralProfile {
  try {
    const raw = localStorage.getItem(BEHAVIORAL_PROFILE_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}

  const initial: UserBehavioralProfile = {
    lastUpdated: new Date().toISOString(),
    paceMode: 'steady_proof_building',
    affinities: {
      research: 2,
      technical: 1,
      communication: 2,
      design: 1,
      analysis: 2,
    },
    struggleSkills: [],
    avoidedTracks: [],
    enjoyedTracks: ['research', 'analysis'],
    demonstratedSkills: ['HTML & CSS', 'Critical Thinking', 'Requirements Parsing'],
    pursuedOpportunityTypes: ['practice_simulation'],
    feedbackLogs: [],
  };

  saveBehavioralProfile(initial);
  return initial;
}

export function saveBehavioralProfile(profile: UserBehavioralProfile): void {
  try {
    profile.lastUpdated = new Date().toISOString();
    localStorage.setItem(BEHAVIORAL_PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed to save behavioral profile:', err);
  }
}

/**
 * Log user feedback or interaction signal
 * (e.g. "enjoyed", "struggled" -> triggers breakdown, "avoid", "completed")
 */
export function logUserFeedback(
  recommendationId: string,
  type: UserFeedbackType,
  skillOrTrack?: string,
  note?: string
): UserBehavioralProfile {
  const profile = getBehavioralProfile();

  profile.feedbackLogs.push({
    recommendationId,
    type,
    timestamp: new Date().toISOString(),
    note,
    skillOrTrack,
  });

  if (type === 'enjoyed' && skillOrTrack) {
    const key = skillOrTrack.toLowerCase();
    profile.affinities[key] = (profile.affinities[key] || 0) + 2;
    if (!profile.enjoyedTracks.includes(key)) {
      profile.enjoyedTracks.push(key);
    }
    // If was avoided earlier, remove from avoided
    profile.avoidedTracks = profile.avoidedTracks.filter((t) => t.toLowerCase() !== key);
  } else if (type === 'struggled' && skillOrTrack) {
    const existingStruggle = profile.struggleSkills.find(
      (s) => s.skill.toLowerCase() === skillOrTrack.toLowerCase()
    );
    if (existingStruggle) {
      existingStruggle.deconstructedCount++;
      existingStruggle.isCurrentlyDeconstructed = true;
    } else {
      profile.struggleSkills.push({
        skill: skillOrTrack,
        detectedFrom: 'Student feedback: requested smaller breakdown',
        deconstructedCount: 1,
        isCurrentlyDeconstructed: true,
      });
    }
  } else if (type === 'avoid' && skillOrTrack) {
    const key = skillOrTrack.toLowerCase();
    if (!profile.avoidedTracks.includes(key)) {
      profile.avoidedTracks.push(key);
    }
    profile.enjoyedTracks = profile.enjoyedTracks.filter((t) => t.toLowerCase() !== key);
  }

  saveBehavioralProfile(profile);
  return profile;
}

/**
 * Explicitly breaks down a struggling skill into micro-tasks
 * ensuring we never simply tell the user to "learn more".
 */
export function breakDownStruggleSkill(skillName: string): UserBehavioralProfile {
  const profile = getBehavioralProfile();
  const existing = profile.struggleSkills.find(
    (s) => s.skill.toLowerCase() === skillName.toLowerCase()
  );

  if (existing) {
    existing.deconstructedCount++;
    existing.isCurrentlyDeconstructed = true;
  } else {
    profile.struggleSkills.push({
      skill: skillName,
      detectedFrom: 'Student requested deconstructed micro-tasks',
      deconstructedCount: 1,
      isCurrentlyDeconstructed: true,
    });
  }

  saveBehavioralProfile(profile);
  return profile;
}

/**
 * Update the user's pace mode (Urgent vs Exploratory vs Steady)
 */
export function setPaceMode(paceMode: PaceMode): UserBehavioralProfile {
  const profile = getBehavioralProfile();
  profile.paceMode = paceMode;
  saveBehavioralProfile(profile);
  return profile;
}

/**
 * Toggle track enjoyment or avoidance directly
 */
export function toggleTrackPreference(
  track: string,
  preference: 'enjoy' | 'avoid' | 'neutral'
): UserBehavioralProfile {
  const profile = getBehavioralProfile();
  const key = track.toLowerCase();

  profile.enjoyedTracks = profile.enjoyedTracks.filter((t) => t.toLowerCase() !== key);
  profile.avoidedTracks = profile.avoidedTracks.filter((t) => t.toLowerCase() !== key);

  if (preference === 'enjoy') {
    profile.enjoyedTracks.push(key);
    profile.affinities[key] = (profile.affinities[key] || 0) + 2;
  } else if (preference === 'avoid') {
    profile.avoidedTracks.push(key);
    profile.affinities[key] = Math.max(0, (profile.affinities[key] || 0) - 2);
  }

  saveBehavioralProfile(profile);
  return profile;
}

/**
 * Applies a preset to simulate live adaptation for testing & evaluation.
 */
export function applyPersonalizationPreset(
  presetKey:
    | 'struggling_technical'
    | 'enjoys_research'
    | 'urgent_job_hunt'
    | 'exploring_curiosity'
    | 'reset_default'
): UserBehavioralProfile {
  const profile = getBehavioralProfile();

  if (presetKey === 'struggling_technical') {
    profile.paceMode = 'steady_proof_building';
    profile.affinities.technical = 0;
    profile.struggleSkills = [
      {
        skill: 'Asynchronous State & Data Fetching',
        detectedFrom: 'Low interview screen score & workspace stuck signals',
        deconstructedCount: 1,
        isCurrentlyDeconstructed: true,
      },
    ];
    profile.enjoyedTracks = profile.enjoyedTracks.filter((t) => t !== 'technical');
  } else if (presetKey === 'enjoys_research') {
    profile.affinities.research = 5;
    profile.affinities.analysis = 4;
    if (!profile.enjoyedTracks.includes('research')) profile.enjoyedTracks.push('research');
    if (!profile.enjoyedTracks.includes('analysis')) profile.enjoyedTracks.push('analysis');
    profile.struggleSkills = [];
  } else if (presetKey === 'urgent_job_hunt') {
    profile.paceMode = 'urgent_job_readiness';
    // Update local profile urgency string as well
    try {
      const raw = localStorage.getItem('careeros_profile');
      if (raw) {
        const u = JSON.parse(raw);
        u.urgency = 'Immediate (Next 1-2 months)';
        localStorage.setItem('careeros_profile', JSON.stringify(u));
      }
    } catch {}
  } else if (presetKey === 'exploring_curiosity') {
    profile.paceMode = 'exploratory_experimentation';
    try {
      const raw = localStorage.getItem('careeros_profile');
      if (raw) {
        const u = JSON.parse(raw);
        u.urgency = 'Flexible (6+ months, exploring options)';
        u.careerClarity = 'Exploring broad options with high curiosity';
        localStorage.setItem('careeros_profile', JSON.stringify(u));
      }
    } catch {}
  } else if (presetKey === 'reset_default') {
    localStorage.removeItem(BEHAVIORAL_PROFILE_STORAGE_KEY);
    return getBehavioralProfile();
  }

  saveBehavioralProfile(profile);
  return profile;
}

/**
 * Collects and synthesizes all continuous learner signals across the 9 dimensions
 */
export function collectContinuousSignals(
  student: UserProfile,
  behavioral: UserBehavioralProfile
): ContinuousLearnerSignals {
  const evidence = getEvidenceItems();
  const interviewSessions = getInterviewSessions();
  const applications = getApplications();
  const resolutions = getScenarioResolutions();

  // 1. What the user says
  const whatUserSays = {
    statedGoal: student.careerGoal || 'Full-Stack Software & Product Engineering',
    statedUrgency: student.urgency || 'Medium (Next 3-6 months)',
    primaryWorry: student.primaryWorry || 'Lack of formal industry experience',
    recentQueries: [
      'How to explain non-traditional background in screens',
      'What proof should I attach to a junior application?',
    ],
    reflectionStatements: evidence.filter((e) => e.reflection).map((e) => e.reflection!).slice(0, 3),
  };

  // 2. What they choose
  const whatTheyChoose = {
    selectedTrack: student.careerGoal || 'Frontend & Full-Stack',
    learningStyle: student.preferredLearningStyle || 'Hands-on task with instant feedback',
    preferredTimeCommitment: student.availableTime || '5-8 hours / week',
    chosenFormat: 'Self-paced micro-drills + verifiable artifacts',
  };

  // 3. What they enjoy
  const researchEvidenceCount = evidence.filter(
    (e) =>
      e.activity.toLowerCase().includes('audit') ||
      e.activity.toLowerCase().includes('research') ||
      e.activity.toLowerCase().includes('deconstruct') ||
      e.skillsPracticed.some(
        (s) => s.toLowerCase().includes('analysis') || s.toLowerCase().includes('research')
      )
  ).length;

  const enjoysResearch =
    researchEvidenceCount >= 2 ||
    (behavioral.affinities.research || 0) >= 3 ||
    behavioral.enjoyedTracks.includes('research') ||
    behavioral.enjoyedTracks.includes('analysis');

  const whatTheyEnjoy = {
    enjoyedTracks: behavioral.enjoyedTracks,
    topAffinityAreas: Object.entries(behavioral.affinities)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([k]) => k),
    positiveFeedbackCount: behavioral.feedbackLogs.filter((l) => l.type === 'enjoyed').length,
    enjoysResearch,
  };

  // 4. What they avoid
  const whatTheyAvoid = {
    avoidedTracks: behavioral.avoidedTracks,
    skippedCategories: behavioral.avoidedTracks,
    dismissedRecommendations: behavioral.feedbackLogs
      .filter((l) => l.type === 'avoid')
      .map((l) => l.recommendationId),
  };

  // 5. What they complete
  const whatTheyComplete = {
    completedTaskIds: evidence.map((e) => e.id),
    completedTasksCount: evidence.filter((e) => e.category === 'tasks').length,
    completedProjectsCount: evidence.filter(
      (e) => e.category === 'projects' || e.category === 'challenges'
    ).length,
    completedScenariosCount: Object.keys(resolutions).length,
  };

  // 6. Where they struggle
  const technicalInterviews = interviewSessions.filter((s) => s.track === 'technical');
  const avgTechScore =
    technicalInterviews.length > 0
      ? technicalInterviews.reduce((acc, s) => {
          const sAvg =
            s.exchanges.reduce((sum, e) => sum + (e.feedback.scorePercentage || 0), 0) /
            Math.max(s.exchanges.length, 1);
          return acc + sAvg;
        }, 0) / technicalInterviews.length
      : 80;

  const hasTechnicalStruggle =
    avgTechScore < 70 ||
    behavioral.struggleSkills.some(
      (s) =>
        s.skill.toLowerCase().includes('technical') ||
        s.skill.toLowerCase().includes('state') ||
        s.skill.toLowerCase().includes('typescript') ||
        s.skill.toLowerCase().includes('asynchronous')
    );

  const whereTheyStruggle = {
    struggleSkills: behavioral.struggleSkills.map((s) => ({
      skill: s.skill,
      detectedFrom: s.detectedFrom,
      deconstructedCount: s.deconstructedCount,
      isCurrentlyDeconstructed: s.isCurrentlyDeconstructed !== false,
    })),
    hasTechnicalStruggle,
  };

  // 7. How they perform
  const completedSessions = interviewSessions.filter((s) => s.isCompleted);
  const avgInterviewScore =
    completedSessions.length > 0
      ? Math.round(
          completedSessions.reduce((acc, s) => {
            const sessionAvg =
              s.exchanges.reduce((sum, e) => sum + (e.feedback.scorePercentage || 0), 0) /
              Math.max(s.exchanges.length, 1);
            return acc + sessionAvg;
          }, 0) / completedSessions.length
        )
      : 78;

  const performanceTier: 'developing' | 'competent' | 'strong' =
    avgInterviewScore >= 85 ? 'strong' : avgInterviewScore >= 70 ? 'competent' : 'developing';

  const howTheyPerform = {
    averageInterviewScore: avgInterviewScore,
    scenarioAccuracyScore: Math.min(100, 70 + Object.keys(resolutions).length * 8),
    verifiedDeliverablesCount: evidence.length,
    performanceTier,
  };

  // 8. What skills they demonstrate
  const demonstratedSkillsList = Array.from(
    new Set([...evidence.flatMap((e) => e.skillsPracticed), ...student.skills])
  );

  const whatSkillsTheyDemonstrate = {
    verifiedSkills: demonstratedSkillsList,
    uniqueSkillCount: demonstratedSkillsList.length,
    badgeCount: evidence.filter((e) => e.verificationBadge).length,
  };

  // 9. What opportunities they pursue
  const whatOpportunitiesTheyPursue = {
    pursuedOpportunityTypes: behavioral.pursuedOpportunityTypes,
    activeApplicationsCount: applications.filter((a) => a.status !== 'Rejected').length,
    savedJobsCount: applications.length,
    targetRoles: Array.from(new Set(applications.map((a) => a.role))),
  };

  return {
    whatUserSays,
    whatTheyChoose,
    whatTheyEnjoy,
    whatTheyAvoid,
    whatTheyComplete,
    whereTheyStruggle,
    howTheyPerform,
    whatSkillsTheyDemonstrate,
    whatOpportunitiesTheyPursue,
  };
}

/**
 * Generates the full personalized roadmap and dominant active "What should I do next?"
 * strictly adapting to continuous signals and never repeating generic roadmaps.
 */
export function generatePersonalizedRoadmap(
  profileOverride?: UserProfile
): PersonalizedRoadmap {
  let user = profileOverride;
  if (!user) {
    try {
      const raw = localStorage.getItem('careeros_profile');
      if (raw) user = JSON.parse(raw);
    } catch {}
  }
  const student = user || DEFAULT_USER_PROFILE;

  // 1. Load behavioral profile and 9-dimension continuous signals
  const behavioral = getBehavioralProfile();
  const signals = collectContinuousSignals(student, behavioral);
  const evidence = getEvidenceItems();

  // 2. Pace & Urgency Calibration
  const urgencyRaw = (student.urgency || '').toLowerCase();
  let urgencyCalibration:
    | 'Job Readiness Sprint'
    | 'Exploratory Experimentation Track'
    | 'Balanced Proof Building' = 'Balanced Proof Building';
  let urgencyDriver = 'Balanced proof building based on available weekly time';

  if (
    behavioral.paceMode === 'urgent_job_readiness' ||
    urgencyRaw.includes('urgent') ||
    urgencyRaw.includes('immediate') ||
    urgencyRaw.includes('1-2') ||
    urgencyRaw.includes('2-3')
  ) {
    urgencyCalibration = 'Job Readiness Sprint';
    urgencyDriver = 'Student indicated high urgency (ready for employment in 1-3 months)';
    behavioral.paceMode = 'urgent_job_readiness';
  } else if (
    behavioral.paceMode === 'exploratory_experimentation' ||
    urgencyRaw.includes('explore') ||
    urgencyRaw.includes('low') ||
    urgencyRaw.includes('6+') ||
    urgencyRaw.includes('flexible') ||
    (student.careerClarity && student.careerClarity.toLowerCase().includes('exploring'))
  ) {
    urgencyCalibration = 'Exploratory Experimentation Track';
    urgencyDriver = 'Student has time to explore and requested broad discovery';
    behavioral.paceMode = 'exploratory_experimentation';
  }

  // 3. Build dynamic recommendations queue
  const recommendations: PersonalizedRecommendation[] = [];

  // -------------------------------------------------------------
  // RULE 1: If user repeatedly struggles with technical tasks:
  // DO NOT SIMPLY SAY "LEARN MORE" -> Break the skill into smaller tasks.
  // -------------------------------------------------------------
  if (signals.whereTheyStruggle.hasTechnicalStruggle) {
    const struggleSkillName =
      behavioral.struggleSkills[0]?.skill || 'Asynchronous State & Data Fetching';

    recommendations.push({
      id: 'rec-struggle-deconstructed-step-1',
      title: `Deconstructed Micro-Drill: ${struggleSkillName} (Step 1 of 3)`,
      actionType: 'micro_drill',
      difficulty: 'Starter',
      category: 'Technical Skills (Deconstructed Breakdown)',
      isDeconstructedSkill: true,
      parentStruggleSkill: struggleSkillName,
      breakdownStepNumber: 1,
      totalBreakdownSteps: 3,
      whatShouldIDoNext: {
        title: 'Step 1 of 3: Isolate 1 Single State Variable in Console (10 mins)',
        description:
          'Do not try to master full asynchronous architecture today. In this 10-minute micro-exercise, write 1 simple component with a single counter variable and log when it changes to the console.',
        timeEstimate: '10 mins',
        actionRoute: 'tasks',
        targetId: 'task-deconstruct-state-var',
        deliverableOutput: 'A clean 15-line component snippet proving you understand single-variable updates.',
        actionLabel: 'Start Step 1: 10-Min Micro-Drill',
        stepBreakdown: {
          stepNumber: 1,
          totalSteps: 3,
          stepObjective: 'Master single-variable updates without full async complexity',
          concreteAction: 'Write 1 component with 1 state variable and console.log the change.',
        },
      },
      whyAmISeeingThis: {
        primaryReason:
          `You flagged difficulty with ${struggleSkillName}. Instead of telling you to "learn more" or watch a long tutorial, CareerOS broke the skill into 3 bite-sized 10-minute micro-drills.`,
        signalsCited: [
          `Detected struggle signal with ${struggleSkillName} (quiz score or user breakdown request)`,
          'CareerOS Rule Enforced: Never say "learn more" to struggling learners',
          `Preferred learning style: ${signals.whatTheyChoose.learningStyle}`,
        ],
        adaptiveActionTaken:
          `Deconstructed ${struggleSkillName} into an isolated 10-minute single-variable inspection drill. Step 1 of 3.`,
        learningStyleMatch: 'Direct hands-on isolation without conceptual overload',
      },
    });

    recommendations.push({
      id: 'rec-struggle-deconstructed-step-2',
      title: `Deconstructed Micro-Drill: Handle 1 Simple Fetch Error State (Step 2 of 3)`,
      actionType: 'micro_drill',
      difficulty: 'Starter',
      category: 'Technical Skills (Deconstructed Breakdown)',
      isDeconstructedSkill: true,
      parentStruggleSkill: struggleSkillName,
      breakdownStepNumber: 2,
      totalBreakdownSteps: 3,
      whatShouldIDoNext: {
        title: 'Step 2 of 3: Render 1 Graceful Error Banner on Simulated 404',
        description:
          'Now that single state is clear, add 1 boolean `isError` flag that displays a friendly alert banner when an endpoint returns 404.',
        timeEstimate: '12 mins',
        actionRoute: 'tasks',
        deliverableOutput: 'A component showing graceful recovery UI instead of a blank crash screen.',
        actionLabel: 'Preview Step 2 Micro-Drill',
      },
      whyAmISeeingThis: {
        primaryReason:
          'Part 2 of the 3-step deconstruction progression. Focuses purely on error UI.',
        signalsCited: [
          'Continuous deconstruction sequence',
          'Prevents cognitive fatigue on async state handling',
        ],
        adaptiveActionTaken:
          'Isolated the error-state UI pattern into its own self-contained exercise.',
      },
    });
  }

  // -------------------------------------------------------------
  // RULE 2: If user repeatedly enjoys research tasks:
  // RECOMMEND MORE RESEARCH-RELATED ACTIVITIES
  // -------------------------------------------------------------
  if (signals.whatTheyEnjoy.enjoysResearch) {
    recommendations.push({
      id: 'rec-affinity-research-teardown',
      title: 'Competitive Architecture Teardown: Accessibility & UI Systems',
      actionType: 'task',
      difficulty: 'Beginner',
      category: 'Research & User Analysis',
      whatShouldIDoNext: {
        title: 'Conduct a 25-Minute Public Portal Accessibility Teardown',
        description:
          'Audit a public civic or university portal against WCAG 2.1 AA standards. Identify 3 color contrast and keyboard focus deficiencies and document recommendations with code fixes.',
        timeEstimate: '25 mins',
        actionRoute: 'tasks',
        deliverableOutput: 'A 1-page structured Accessibility Audit Memo ready for your Evidence Vault.',
        actionLabel: 'Launch Research Teardown',
      },
      whyAmISeeingThis: {
        primaryReason:
          'You completed multiple research and audit exercises and repeatedly marked high affinity for investigative analysis.',
        signalsCited: [
          `${signals.whatTheyComplete.completedTasksCount} completed deliverables in Evidence Vault with research tags`,
          'Learner tagged "I enjoyed this" on past problem deconstruction tasks',
          'Affinities tracked: Research (+5) · Analysis (+4)',
        ],
        adaptiveActionTaken:
          'Amplified research-oriented problem solving to capitalize on your natural investigative strength.',
        learningStyleMatch: 'Investigative discovery with tangible artifact output',
      },
    });

    recommendations.push({
      id: 'rec-affinity-api-teardown',
      title: 'Comparative API & Developer Experience Teardown',
      actionType: 'task',
      difficulty: 'Beginner',
      category: 'Research & Systems Analysis',
      whatShouldIDoNext: {
        title: 'Write a 20-Minute Developer Experience (DX) Audit Memo',
        description:
          'Inspect two public developer portals (e.g. GitHub REST vs Stripe API). Compare their error messages, authentication clarity, and developer onboarding flow.',
        timeEstimate: '20 mins',
        actionRoute: 'tasks',
        deliverableOutput: 'A 2-page DX comparison memo demonstrating high-level analytical acumen.',
        actionLabel: 'Start DX Audit Memo',
      },
      whyAmISeeingThis: {
        primaryReason:
          'Research-oriented learners excel at translating technical comparisons into clear engineering memos.',
        signalsCited: [
          'High affinity for analytical teardowns',
          'Demonstrated strength in critical requirements parsing',
        ],
        adaptiveActionTaken:
          'Recommended deep-dive DX research rather than routine tutorial coding.',
      },
    });
  }

  // -------------------------------------------------------------
  // RULE 3: Urgency Calibration (Job Readiness vs Exploratory)
  // -------------------------------------------------------------
  if (urgencyCalibration === 'Job Readiness Sprint') {
    recommendations.push({
      id: 'rec-urgent-job-readiness-ats',
      title: 'Job-Readiness Sprint: Synchronize Verified Proof to ATS Resume',
      actionType: 'job_readiness',
      difficulty: 'Beginner',
      category: 'Employment Readiness',
      whatShouldIDoNext: {
        title: 'Export ATS-Aligned Resume with Verified Evidence Citations',
        description:
          'Since you want a role urgently, skip theoretical coursework and focus directly on market readiness. Sync your verified evidence deliverables into clean recruiter-friendly bullet points and download your ATS plain text version.',
        timeEstimate: '15 mins',
        actionRoute: 'resume',
        deliverableOutput: 'An ATS-ready plain text resume with verified micro-proof citations.',
        actionLabel: 'Open Resume Builder',
      },
      whyAmISeeingThis: {
        primaryReason:
          'Your target timeline is Urgent (ready in 1–3 months), so CareerOS prioritized high-impact hiring artifacts over exploratory reading.',
        signalsCited: [
          `Urgency stated as: "${signals.whatUserSays.statedUrgency}"`,
          `${signals.whatTheyComplete.completedTasksCount} verified evidence artifacts ready to cite`,
          'Focus: Maximizing recruiter interview response rates immediately',
        ],
        adaptiveActionTaken:
          'Prioritized recruiter-facing evidence alignment and STAR interview preparation.',
        learningStyleMatch: 'Output-first job readiness sprint',
      },
    });

    recommendations.push({
      id: 'rec-urgent-interview-star',
      title: 'Job-Readiness Sprint: 1-on-1 Behavioral & STAR Interview Drill',
      actionType: 'interview',
      difficulty: 'Beginner',
      category: 'Interview Preparation',
      whatShouldIDoNext: {
        title: 'Practice Explaining 1 Real Project using Situation-Task-Action-Result',
        description:
          'Complete a 15-minute simulated HR screen focusing on how to articulate your verified project deliverables without defensive pauses.',
        timeEstimate: '15 mins',
        actionRoute: 'interview',
        deliverableOutput: 'AI-evaluated STAR response recording with key recruiter takeaways.',
        actionLabel: 'Start STAR Interview Drill',
      },
      whyAmISeeingThis: {
        primaryReason:
          'Urgent hiring timelines require immediate interview confidence. Practicing STAR framing now prevents freeze-ups during recruiter screens.',
        signalsCited: [
          'High career urgency timeline detected',
          `Primary concern: "${signals.whatUserSays.primaryWorry}"`,
          'Recent applications logged: ready for first phone screens',
        ],
        adaptiveActionTaken:
          'Scheduled targeted behavioral STAR walkthrough linking directly to your verified evidence.',
      },
    });
  } else if (urgencyCalibration === 'Exploratory Experimentation Track') {
    recommendations.push({
      id: 'rec-explore-cross-disciplinary',
      title: 'Exploratory Experiment: Compare 2 Adjacent Engineering Tracks',
      actionType: 'explore',
      difficulty: 'Starter',
      category: 'Career Discovery & Curiosity',
      whatShouldIDoNext: {
        title: 'Complete a 20-Minute Cross-Disciplinary Curiosity Audit',
        description:
          'Because you have time to explore, test two adjacent career tracks (e.g. Design Systems vs Data Storytelling) to discover which problems give you genuine energy before locking into one path.',
        timeEstimate: '20 mins',
        actionRoute: 'explore',
        deliverableOutput: 'A 2-column comparative notes matrix comparing daily work realities.',
        actionLabel: 'Explore Career Tracks',
      },
      whyAmISeeingThis: {
        primaryReason:
          'You indicated an exploratory timeline with room to experiment. CareerOS encourages broad curiosity audits before premature specialization.',
        signalsCited: [
          `Career clarity: ${student.careerClarity || 'Exploring with high curiosity'}`,
          `Urgency: ${signals.whatUserSays.statedUrgency}`,
          'Multiple broad interests across web, UI, and open source',
        ],
        adaptiveActionTaken:
          'Prioritized exploratory experimentation and cross-disciplinary comparison over narrow drillwork.',
      },
    });
  }

  // -------------------------------------------------------------
  // RULE 4: Baseline / Fallback Recommendation
  // -------------------------------------------------------------
  if (recommendations.length === 0) {
    recommendations.push({
      id: 'rec-baseline-job-req-deconstruction',
      title: 'Deconstruct 1 Real Job Requirement into Verifiable Skills',
      actionType: 'task',
      difficulty: 'Starter',
      category: 'Role Analysis & Deconstruction',
      whatShouldIDoNext: {
        title: 'Deconstruct 1 Job Posting into 3 Concrete 15-Minute Exercises',
        description:
          'Break down 1 live job description in your target track. Translate 3 corporate buzzwords into 15-minute practice tasks that generate verified proof.',
        timeEstimate: '20 mins',
        actionRoute: 'tasks',
        targetId: 'task-deconstruct-req',
        deliverableOutput: 'A 3-part requirement translation sheet stored in your Evidence Vault.',
        actionLabel: 'Start Deconstruction Task',
      },
      whyAmISeeingThis: {
        primaryReason:
          'This foundational action demystifies confusing job posts and establishes your initial verifiable micro-proofs.',
        signalsCited: [
          `Target goal: ${student.careerGoal || 'Software Engineering'}`,
          `Primary concern: "${student.primaryWorry || 'No experience'}"`,
          'Preferred style: Practical step-by-step tasks',
        ],
        adaptiveActionTaken:
          'Replaced intimidating reading with a self-contained 20-minute requirement deconstruction.',
      },
    });
  }

  // The first recommendation is the dominant "What should I do next?"
  const activeNextStep = recommendations[0];
  const upcomingSteps = recommendations.slice(1);

  return {
    id: `roadmap-${Date.now()}`,
    learnerName: student.name || 'Jordan',
    currentMilestoneTitle:
      urgencyCalibration === 'Job Readiness Sprint'
        ? 'Milestone 01: Job-Ready Evidence & Interview Confidence'
        : urgencyCalibration === 'Exploratory Experimentation Track'
        ? 'Milestone 01: Multi-Track Curiosity & Foundational Proof'
        : 'Milestone 01: Practical Foundation & Micro-Deliverables',
    urgencyCalibration,
    urgencyRationale: urgencyDriver,
    activeNextStep,
    upcomingSteps,
    completedStepsCount: evidence.length,
    adaptiveSignalsSummary: {
      topAffinities: signals.whatTheyEnjoy.enjoyedTracks,
      deconstructedSkills: signals.whereTheyStruggle.struggleSkills.map((s) => s.skill),
      urgencyDriver,
      avoidedTopics: signals.whatTheyAvoid.avoidedTracks,
      demonstratedSkillsCount: signals.whatSkillsTheyDemonstrate.uniqueSkillCount,
    },
    continuousSignals: signals,
  };
}
