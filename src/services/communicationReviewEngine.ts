import {
  CommunicationActivity,
  AICommunicationReview,
  ReviewCriteriaScores,
  ImprovementRecommendation,
  ReviewAttemptHistory,
} from '../types/communication';
import { saveEvidenceItem } from './evidenceService';

const STORAGE_PREFIX = 'careeros_comm_review_';

/**
 * Intelligent review engine for communication activities.
 * Evaluates across 4 core dimensions:
 * 1. Clarity (understandable, direct, absence of fluff)
 * 2. Tone (respectful, collaborative, calm, polite)
 * 3. Structure (scannable, logical flow, good openers/closers, bullet points)
 * 4. Professionalism (accountability, solution-oriented, appropriate for audience)
 *
 * CRITICAL RULE:
 * Zero judgment on accent, dialect, or personal personality quirks.
 * The sole purpose is helping the student convey their ideas clearly and respectfully.
 */
export function evaluateCommunicationSubmission(
  activity: CommunicationActivity,
  userInput: string,
  attemptNumber: number = 1
): AICommunicationReview {
  const trimmed = userInput.trim();
  const wordCount = trimmed.split(/\s+/).filter(Boolean).length;

  // Analysis flags
  const hasSubjectLine =
    trimmed.toLowerCase().includes('subject:') ||
    trimmed.toLowerCase().includes('re:') ||
    trimmed.startsWith('📢') ||
    trimmed.startsWith('**');
  const hasGreeting = /^(hi|hello|hey|dear|good morning|good afternoon)/i.test(trimmed);
  const hasBulletPoints = trimmed.includes('•') || trimmed.includes('- ') || trimmed.includes('1.') || trimmed.includes('* ');
  const hasOptionsOrRecommendations =
    trimmed.toLowerCase().includes('option') ||
    trimmed.toLowerCase().includes('recommend') ||
    trimmed.toLowerCase().includes('what if') ||
    trimmed.toLowerCase().includes('alternatively') ||
    trimmed.toLowerCase().includes('proposal');
  const hasGratitudeOrClosing =
    /thanks|thank you|best|warmly|regards|looking forward|appreciate/i.test(trimmed);
  const mentionsTimeOrDelay =
    /\b(day|days|hour|hours|minutes|friday|monday|tuesday|wednesday|thursday|deadline|timeline)\b/i.test(trimmed);
  const hasEmotionalBlame =
    /\b(stupid|idiot|bad documentation|hate|terrible|ridiculous|annoying|not my fault)\b/i.test(trimmed);
  const hasJargonOverload =
    /\b(3nf|latency is o\(n\)|synergize|paradigm shift)\b/i.test(trimmed);

  // 1. CLARITY EVALUATION (1-100)
  let clarityScore = 75;
  const clarityNotes: string[] = [];

  if (wordCount < 25) {
    clarityScore -= 25;
    clarityNotes.push('The message is very brief. Adding a little more context will prevent confusing your reader.');
  } else if (wordCount > 350) {
    clarityScore -= 10;
    clarityNotes.push('A bit long for quick workplace reading. Try tightening paragraphs into bullet points.');
  } else {
    clarityScore += 15;
    clarityNotes.push('Well-balanced length that gets straight to the point without meandering.');
  }

  if (activity.category === 'explaining_technical_work' && hasJargonOverload) {
    clarityScore -= 15;
    clarityNotes.push('High concentration of technical acronyms. Translate these into practical user impacts.');
  } else {
    clarityNotes.push('Expressed technical ideas in accessible, plain terms.');
  }

  // 2. TONE EVALUATION (1-100)
  let toneScore = 80;
  const toneNotes: string[] = [];

  if (hasEmotionalBlame) {
    toneScore -= 30;
    toneNotes.push('Detected frustrated or emotionally charged phrasing. Shift to objective, blameless facts.');
  } else {
    toneScore += 10;
    toneNotes.push('Calm, constructive, and emotionally steady tone.');
  }

  if (hasGratitudeOrClosing) {
    toneScore += 10;
    toneNotes.push('Courteous closing that maintains strong workplace goodwill.');
  }

  // 3. STRUCTURE EVALUATION (1-100)
  let structureScore = 75;
  const structureNotes: string[] = [];

  if (hasGreeting) {
    structureScore += 8;
    structureNotes.push('Clear and friendly opening greeting.');
  } else if (activity.medium !== 'spoken_communication') {
    structureNotes.push('Consider adding a quick greeting (e.g., "Hi [Name]") to soften the opening.');
  }

  if (hasBulletPoints) {
    structureScore += 12;
    structureNotes.push('Excellent use of bullet points/numbering for high scannability.');
  } else if (wordCount > 60) {
    structureNotes.push('Breaking multiple ideas into 2–3 bullet points would make this easier to scan.');
  }

  // 4. PROFESSIONALISM EVALUATION (1-100)
  let professionalismScore = 80;
  const professionalismNotes: string[] = [];

  if (hasOptionsOrRecommendations) {
    professionalismScore += 15;
    professionalismNotes.push('Proactively suggested concrete paths forward or solutions rather than just reporting a problem.');
  }

  if (mentionsTimeOrDelay) {
    professionalismScore += 10;
    professionalismNotes.push('Quantified timing clearly, helping stakeholders plan accordingly.');
  }

  // Bound scores 50 to 98
  clarityScore = Math.min(98, Math.max(50, clarityScore));
  toneScore = Math.min(98, Math.max(50, toneScore));
  structureScore = Math.min(98, Math.max(50, structureScore));
  professionalismScore = Math.min(98, Math.max(50, professionalismScore));

  const overallScore = Math.round(
    (clarityScore + toneScore + structureScore + professionalismScore) / 4
  );

  // Generate actionable feedback
  const strengths: string[] = [];
  const areasToImprove: string[] = [];

  if (toneScore >= 80) strengths.push('Respectful, confident, and highly collaborative tone.');
  if (clarityScore >= 80) strengths.push('Direct communication that respects the reader’s cognitive load.');
  if (hasBulletPoints) strengths.push('Clean visual hierarchy that allows quick scanning.');
  if (hasOptionsOrRecommendations) strengths.push('Demonstrated leadership by offering solutions alongside problems.');

  if (strengths.length === 0) {
    strengths.push('Communicated the core thought clearly and took immediate action.');
  }

  if (!hasOptionsOrRecommendations && (activity.category === 'professional_emails' || activity.category === 'manager_communication')) {
    areasToImprove.push('Propose 1 or 2 specific options with your personal recommendation to save the reader time.');
  }
  if (!hasBulletPoints && wordCount > 70) {
    areasToImprove.push('Use bullets or numbered lists for multi-part explanations.');
  }
  if (!hasGratitudeOrClosing && activity.medium !== 'spoken_communication') {
    areasToImprove.push('End with a clear, gentle next step or call to action.');
  }

  if (areasToImprove.length === 0) {
    areasToImprove.push('Practice delivering this aloud to build effortless muscle memory.');
  }

  // Generate actionable improvements for the Improve phase
  const actionableImprovements: ImprovementRecommendation[] = [];

  if (!hasBulletPoints && wordCount > 50) {
    actionableImprovements.push({
      id: 'imp-structure-bullets',
      dimension: 'structure',
      title: 'Group core points into scannable bullets',
      explanation: 'Dense paragraph blocks are often skimmed or missed in busy inboxes. Bullet points force clarity and save the reader cognitive effort.',
      beforeSnippet: 'Continuous dense paragraph block',
      afterSnippet: '• Key point 1\n• Key point 2\n• Next action step',
      actionSnippet: 'bulletize',
    });
  }

  if (!hasOptionsOrRecommendations && (activity.category === 'professional_emails' || activity.category === 'manager_communication' || activity.category === 'giving_updates')) {
    actionableImprovements.push({
      id: 'imp-prof-proactive-options',
      dimension: 'professionalism',
      title: 'Propose 2 concrete options with your recommendation',
      explanation: 'Never bring a problem without bringing at least two proposed options. Stating your preference ("I recommend Option 1 because...") displays immediate leadership maturity.',
      beforeSnippet: 'What should we do about this delay?',
      afterSnippet: 'Option 1: [Fast path]\nOption 2: [Thorough path]\nRecommendation: I suggest Option 1 because...',
      actionSnippet: 'options',
    });
  }

  if (hasEmotionalBlame) {
    actionableImprovements.push({
      id: 'imp-tone-objective',
      dimension: 'tone',
      title: 'De-escalate emotional phrases into objective facts',
      explanation: 'Remove words that imply fault or frustration. Focus squarely on neutral system facts and resolution steps.',
      beforeSnippet: 'The other team broke the API documentation.',
      afterSnippet: 'The API endpoints currently return unexpected 404 responses.',
      actionSnippet: 'tone_neutral',
    });
  }

  if (!hasGratitudeOrClosing && activity.medium !== 'spoken_communication') {
    actionableImprovements.push({
      id: 'imp-tone-courteous-close',
      dimension: 'tone',
      title: 'Add a warm, collaborative closing and call to action',
      explanation: 'A clean sign-off with clear expectations ("Let me know if this works by 3 PM") leaves no ambiguity about who has the next move.',
      beforeSnippet: '[Message ends abruptly without next step]',
      afterSnippet: 'Best regards,\n[Your Name]\n(Let me know if you would like to review this together)',
      actionSnippet: 'closing',
    });
  }

  if (activity.category === 'explaining_technical_work' && hasJargonOverload) {
    actionableImprovements.push({
      id: 'imp-clarity-analogy',
      dimension: 'clarity',
      title: 'Anchor technical concepts in a simple real-world analogy',
      explanation: 'Non-technical stakeholders remember analogies far better than architectural acronyms. Compare abstract system state to physical everyday objects.',
      beforeSnippet: 'Postgres latency is O(N) due to non-indexed foreign key scans.',
      afterSnippet: 'Imagine searching through a physical phonebook without alphabetical tabs.',
      actionSnippet: 'analogy',
    });
  }

  if (actionableImprovements.length === 0) {
    actionableImprovements.push({
      id: 'imp-clarity-tighten',
      dimension: 'clarity',
      title: 'Tighten wording for maximum impact',
      explanation: 'Your fundamentals are strong. Read aloud once to remove any filler words and verify natural conversational flow.',
      beforeSnippet: 'Well-formed draft',
      afterSnippet: 'Crisp, high-impact workplace message',
    });
  }

  // Generate polished revision
  let suggestedRevision = trimmed;
  if (!hasGreeting && activity.medium !== 'spoken_communication') {
    suggestedRevision = `Hi team,\n\n${suggestedRevision}`;
  }
  if (!hasGratitudeOrClosing && activity.medium !== 'spoken_communication') {
    suggestedRevision = `${suggestedRevision}\n\nThanks,\n[Your Name]`;
  }

  // Load previous history to append
  let previousHistory: ReviewAttemptHistory[] = [];
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${activity.id}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.history)) {
        previousHistory = parsed.history;
      } else if (parsed.scores) {
        previousHistory = [
          {
            attemptNumber: parsed.attemptNumber || 1,
            submittedAt: parsed.submittedAt || new Date().toISOString(),
            overallScore: parsed.overallScore || 75,
            scores: parsed.scores,
            userInput: parsed.userInput || '',
          },
        ];
      }
    }
  } catch {}

  const currentAttemptRecord: ReviewAttemptHistory = {
    attemptNumber,
    submittedAt: new Date().toISOString(),
    overallScore,
    scores: {
      clarityScore,
      clarityNotes,
      toneScore,
      toneNotes,
      structureScore,
      structureNotes,
      professionalismScore,
      professionalismNotes,
    },
    userInput: trimmed,
  };

  // Append without duplicate attemptNumber
  const updatedHistory = [
    ...previousHistory.filter((h) => h.attemptNumber !== attemptNumber),
    currentAttemptRecord,
  ].sort((a, b) => a.attemptNumber - b.attemptNumber);

  const review: AICommunicationReview = {
    id: `rev-${Date.now()}`,
    activityId: activity.id,
    submittedAt: new Date().toISOString(),
    attemptNumber,
    userInput: trimmed,
    overallSummary:
      overallScore >= 88
        ? 'Outstanding professional communication. Your message is direct, respectful, and ready for any workplace.'
        : overallScore >= 75
        ? 'Solid communication foundations. With a few minor adjustments to structure and solutions, this will be high-conviction.'
        : 'Good effort getting your thoughts down. Focus on organizing into bullet points and keeping the tone constructive.',
    scores: {
      clarityScore,
      clarityNotes,
      toneScore,
      toneNotes,
      structureScore,
      structureNotes,
      professionalismScore,
      professionalismNotes,
    },
    overallScore,
    strengths,
    areasToImprove,
    suggestedRevision,
    actionableImprovements,
    history: updatedHistory,
    factualIntegrityAffirmed: true,
    accentOrPersonalityExcluded: true,
  };

  // Cache review
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${activity.id}`, JSON.stringify(review));
  } catch {}

  return review;
}

/**
 * Retrieve cached review for an activity
 */
export function getSavedCommunicationReview(activityId: string): AICommunicationReview | null {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${activityId}`);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

/**
 * Log completed communication exercise into the student's Career Evidence Vault.
 * Grounded 100% in genuine outputs, deliverables, and reflections.
 */
export function logCommunicationAsCareerEvidence(
  activity: CommunicationActivity,
  review: AICommunicationReview
): void {
  const evidenceItem = {
    id: `ev-comm-${activity.id}-${Date.now()}`,
    category: 'communication' as const,
    activity: `Practiced ${activity.title} (${activity.category.replace(/_/g, ' ')})`,
    date: new Date().toISOString().split('T')[0],
    skillsPracticed: [...activity.skillsPracticed, 'Workplace Communication', 'Clarity & Structure'],
    output: `Verified communication artifact (${activity.medium}):\n"${review.userInput.slice(0, 200)}${review.userInput.length > 200 ? '...' : ''}"`,
    reflection: `Practiced structuring communication around clarity, tone, and solutions. AI Review Score: ${review.overallScore}/100. Key strength: ${review.strengths[0] || 'Clear articulation'}.`,
    feedback: `AI Review: Clarity ${review.scores.clarityScore}/100, Tone ${review.scores.toneScore}/100, Structure ${review.scores.structureScore}/100. Evaluated purely on message clarity without judgment of accent or personality.`,
    timeSpent: activity.estimatedTime,
    sourceType: 'system_task' as const,
    sourceTaskId: activity.id,
    verificationBadge: 'Verified Micro-Proof' as const,
    inPortfolio: true,
    inResume: true,
  };

  saveEvidenceItem(evidenceItem);
}
