import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Send,
  RotateCcw,
  ShieldCheck,
  Lightbulb,
  MessageSquare,
  HelpCircle,
  ChevronRight,
  TrendingUp,
  Award,
  Volume2,
  Mic,
  MicOff,
  Play,
  Pause,
  ArrowRight,
  RefreshCw,
  BookOpen,
  FileCheck,
  Layers,
  Wand2,
} from 'lucide-react';
import {
  CommunicationActivity,
  AICommunicationReview,
  WorkspaceStep,
  ImprovementRecommendation,
} from '../../types/communication';
import {
  evaluateCommunicationSubmission,
  getSavedCommunicationReview,
  logCommunicationAsCareerEvidence,
} from '../../services/communicationReviewEngine';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { useToast } from '../ui/Toast';
import { RouteId } from '../../types/navigation';

export interface CommunicationPracticeWorkspaceProps {
  activity: CommunicationActivity;
  onBack: () => void;
  onNavigate: (route: RouteId) => void;
}

export const CommunicationPracticeWorkspace: React.FC<CommunicationPracticeWorkspaceProps> = ({
  activity,
  onBack,
  onNavigate,
}) => {
  const { toast } = useToast();

  const [activeStep, setActiveStep] = useState<WorkspaceStep>('example');
  const [userInput, setUserInput] = useState('');
  const [attemptCount, setAttemptCount] = useState(1);
  const [review, setReview] = useState<AICommunicationReview | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedExample, setCopiedExample] = useState(false);
  const [isSavedToEvidence, setIsSavedToEvidence] = useState(false);

  // Spoken communication simulation states
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [spokenSeconds, setSpokenSeconds] = useState(0);

  // Load existing draft or review
  useEffect(() => {
    const existing = getSavedCommunicationReview(activity.id);
    if (existing) {
      setReview(existing);
      setUserInput(existing.userInput);
      setAttemptCount(existing.attemptNumber + 1);
      setActiveStep('feedback');
    } else {
      setActiveStep('example');
    }
    setIsSavedToEvidence(false);
  }, [activity.id]);

  // Audio timer simulation
  useEffect(() => {
    let interval: any = null;
    if (isRecording) {
      interval = setInterval(() => {
        setSpokenSeconds((s) => s + 1);
      }, 1000);
    } else {
      setSpokenSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleCopyExample = () => {
    navigator.clipboard.writeText(activity.example.goodExample);
    setCopiedExample(true);
    toast.success('Example Copied', 'Paste into your editor to study or adapt.');
    setTimeout(() => setCopiedExample(false), 2000);
  };

  const handleSimulateAudioPlay = () => {
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
      toast.info('Audio Paused', 'Paused sample playback.');
      return;
    }
    setIsPlayingAudio(true);
    toast.info('Audio Playback', 'Playing simulated spoken example walkthrough.');
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 4500);
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      toast.success(
        'Speech Captured',
        `Recorded ${spokenSeconds}s spoken delivery. Pacing analyzed for clarity.`
      );
    } else {
      setIsRecording(true);
      toast.info(
        'Recording Started',
        'Speak clearly at a natural pace. Accent is never judged.'
      );
    }
  };

  const handleInsertStarter = () => {
    if (activity.prompt.suggestedStarter) {
      setUserInput(activity.prompt.suggestedStarter);
      toast.info('Template Inserted', 'Fill in your own details and thoughts.');
    }
  };

  const handleSubmitForReview = () => {
    if (!userInput.trim()) {
      toast.warning('Draft Empty', 'Please write your response before requesting AI feedback.');
      return;
    }
    if (userInput.trim().length < 20) {
      toast.warning(
        'More Detail Needed',
        'Please write a complete response (at least a couple of sentences).'
      );
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const evaluation = evaluateCommunicationSubmission(activity, userInput, attemptCount);
      setReview(evaluation);
      setIsSubmitting(false);
      setActiveStep('feedback');
      toast.success(
        'AI Feedback Ready',
        'Review clarity, tone, structure, and professionalism scores.'
      );
    }, 450);
  };

  const handleApplyImprovement = (rec: ImprovementRecommendation) => {
    let updated = userInput;
    if (rec.id === 'imp-structure-bullets') {
      if (!updated.includes('•')) {
        updated = `${updated}\n\nKey takeaways:\n• Primary objective achieved\n• Concrete next step identified`;
      }
    } else if (rec.id === 'imp-prof-proactive-options') {
      if (!updated.includes('Option 1')) {
        updated = `${updated}\n\nProposed Options:\n1. Option A (Fast path): Proceed with current milestone by Friday.\n2. Option B (Comprehensive path): Add 1 buffer day to verify quality.\nRecommendation: I suggest Option A to maintain team momentum.`;
      }
    } else if (rec.id === 'imp-tone-courteous-close') {
      if (!/thanks|regards|best/i.test(updated)) {
        updated = `${updated}\n\nThanks,\nAlex`;
      }
    } else if (rec.id === 'imp-tone-objective') {
      updated = updated.replace(/bad|terrible|stupid|not my fault/gi, 'unexpected');
    }
    setUserInput(updated);
    toast.success('Upgrade Applied', `Incorporated: "${rec.title}" into your draft.`);
  };

  const handleAdoptPolished = () => {
    if (review?.suggestedRevision) {
      setUserInput(review.suggestedRevision);
      toast.success(
        'Polished Draft Adopted',
        'Ready to review differences or run your retry evaluation.'
      );
    }
  };

  const handleProceedToRetry = () => {
    setAttemptCount((prev) => prev + 1);
    setActiveStep('retry');
    toast.info('Retry Studio Ready', 'Submit your improved draft to verify your growth.');
  };

  const handleSaveToEvidence = () => {
    if (!review) return;
    logCommunicationAsCareerEvidence(activity, review);
    setIsSavedToEvidence(true);
    toast.success(
      'Logged to Career Evidence!',
      `"${activity.title}" recorded in your verified timeline.`
    );
  };

  // Step definitions
  const steps: Array<{
    id: WorkspaceStep;
    num: string;
    label: string;
    disabled?: boolean;
    badge?: string;
  }> = [
    { id: 'example', num: '1', label: 'Example' },
    { id: 'try', num: '2', label: 'Try It Yourself' },
    {
      id: 'feedback',
      num: '3',
      label: 'AI Feedback',
      disabled: !review,
      badge: review ? `${review.overallScore}%` : undefined,
    },
    {
      id: 'improve',
      num: '4',
      label: 'Improve',
      disabled: !review,
    },
    {
      id: 'retry',
      num: '5',
      label: `Retry (Attempt #${attemptCount})`,
      disabled: !review,
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-left max-w-5xl mx-auto pb-24">
      {/* 0. Top Bar & Stepper */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border border-[#E8E6DF] rounded-2xl p-4 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              All Drills
            </Button>
            <div className="border-l border-[#E8E6DF] pl-3">
              <span className="text-xs text-[#667085] flex items-center gap-1.5">
                <Badge variant="indigo" size="sm">
                  {activity.difficulty}
                </Badge>
                <Clock className="w-3.5 h-3.5 text-[#98A2B3]" />
                <span>~{activity.estimatedTime}</span>
                <span className="capitalize text-[#98A2B3]">· {activity.medium.replace('_', ' ')}</span>
              </span>
              <h1 className="text-sm sm:text-base font-bold text-[#101828] truncate max-w-md">
                {activity.title}
              </h1>
            </div>
          </div>

          {/* Direct Evidence Quick Action */}
          {review && (
            <div className="flex items-center gap-2">
              <Button
                variant={isSavedToEvidence ? 'secondary' : 'mint'}
                size="sm"
                onClick={handleSaveToEvidence}
                disabled={isSavedToEvidence}
                leftIcon={<Award className="w-3.5 h-3.5" />}
              >
                {isSavedToEvidence ? 'Logged in Evidence' : 'Add to Evidence'}
              </Button>
            </div>
          )}
        </div>

        {/* 5-Step Process Switcher: Example -> Try -> Feedback -> Improve -> Retry */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 pt-1 bg-[#F8F8F5] p-1.5 rounded-xl border border-[#E8E6DF]">
          {steps.map((st) => {
            const isActive = activeStep === st.id;
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => !st.disabled && setActiveStep(st.id)}
                disabled={st.disabled}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white text-[#5B5BD6] shadow-xs'
                    : st.disabled
                    ? 'text-[#98A2B3] cursor-not-allowed opacity-50'
                    : 'text-[#667085] hover:text-[#101828]'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isActive
                      ? 'bg-[#5B5BD6] text-white'
                      : 'bg-[#E8E6DF] text-[#667085]'
                  }`}
                >
                  {st.num}
                </span>
                <span>{st.label}</span>
                {st.badge && (
                  <span className="px-1.5 py-0.2 rounded text-[10px] bg-[#E8F8F1] text-[#21B47A] font-bold">
                    {st.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dignity Guarantee Banner */}
      <div className="p-3.5 bg-[#F0EEFF]/50 border border-[#E4E0FD] rounded-xl flex items-start gap-3 text-xs text-[#475467]">
        <ShieldCheck className="w-4 h-4 text-[#5B5BD6] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-[#5B5BD6] font-semibold block mb-0.5">
            Objective Workplace Coaching Standard:
          </strong>
          AI reviews clarity, tone, structure, and professionalism. We{' '}
          <strong>never judge accent, dialect, or personality</strong>. The purpose is to help you communicate your ideas clearly and respectfully in any workplace.
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STEP 1: EXAMPLE                                                           */}
      {/* ========================================================================= */}
      {activeStep === 'example' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <Card variant="default" padding="lg" className="space-y-6">
            <div className="space-y-2 border-b border-[#E8E6DF] pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5B5BD6]">
                Step 1: Study the Example
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#101828]">
                {activity.title}
              </h2>
              <p className="text-sm text-[#475467] leading-relaxed">
                {activity.summary}
              </p>
            </div>

            {/* Scenario Context */}
            <div className="p-4 rounded-xl bg-[#F8F8F5] border border-[#E8E6DF] space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#667085]">
                Workplace Context:
              </span>
              <p className="text-xs sm:text-sm text-[#101828] font-medium leading-relaxed">
                {activity.example.scenarioContext}
              </p>
            </div>

            {/* High Impact Example */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#21B47A] uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#21B47A]" />
                  Exemplary Workplace Approach
                </span>
                <div className="flex items-center gap-3">
                  {(activity.medium === 'spoken_communication' || activity.category === 'presentations' || activity.category === 'meetings') && (
                    <button
                      type="button"
                      onClick={handleSimulateAudioPlay}
                      className="flex items-center gap-1 text-[#5B5BD6] hover:underline font-medium"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{isPlayingAudio ? 'Listening...' : 'Listen to Spoken Sample'}</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleCopyExample}
                    className="flex items-center gap-1 text-[#5B5BD6] hover:underline font-medium"
                  >
                    {copiedExample ? <Check className="w-3.5 h-3.5 text-[#21B47A]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedExample ? 'Copied' : 'Copy Sample'}</span>
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-xl bg-[#101828] text-white/90 font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap shadow-inner border border-[#2E4057]">
                {activity.example.goodExample}
              </div>

              <div className="p-3.5 bg-[#E8F8F1] border border-[#C6EFE0] rounded-xl text-xs text-[#1B9A67] leading-relaxed">
                <strong className="block mb-0.5">Why this works well:</strong>
                {activity.example.goodExplanation}
              </div>
            </div>

            {/* Suboptimal contrast example */}
            {activity.example.suboptimalExample && (
              <div className="space-y-2 pt-2 border-t border-[#E8E6DF]">
                <span className="text-xs font-bold text-[#F26B5B] uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-[#F26B5B]" />
                  Common Pitfall to Avoid
                </span>
                <div className="p-3.5 rounded-xl bg-[#FFF2F0] border border-[#FCD8D4] text-xs font-mono text-[#C93B2B] leading-relaxed whitespace-pre-wrap">
                  {activity.example.suboptimalExample}
                </div>
                <p className="text-xs text-[#667085] leading-relaxed">
                  {activity.example.suboptimalExplanation}
                </p>
              </div>
            )}

            {/* Key Principles Checklist */}
            <div className="p-4 bg-[#F8F8F5] border border-[#E8E6DF] rounded-xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#101828]">
                Key Principles for This Scenario:
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#344054]">
                {activity.example.keyPrinciples.map((kp, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-[#E8E6DF]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5B5BD6] shrink-0 mt-0.5" />
                    <span>{kp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                variant="primary"
                size="md"
                onClick={() => setActiveStep('try')}
                rightIcon={<ChevronRight className="w-4 h-4" />}
              >
                Proceed to Step 2: Try It Yourself
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: TRY IT YOURSELF                                                   */}
      {/* ========================================================================= */}
      {activeStep === 'try' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <Card variant="default" padding="lg" className="space-y-6">
            <div className="space-y-2 border-b border-[#E8E6DF] pb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5B5BD6]">
                  Step 2: Try It Yourself (Attempt #{attemptCount})
                </span>
                <button
                  type="button"
                  onClick={() => setActiveStep('example')}
                  className="text-xs text-[#5B5BD6] hover:underline"
                >
                  Review Example
                </button>
              </div>
              <h2 className="text-xl font-bold text-[#101828]">
                Your Turn: {activity.title}
              </h2>
            </div>

            {/* Prompt Briefing Card */}
            <div className="bg-[#F8F8F5] p-5 rounded-2xl border border-[#E8E6DF] space-y-3.5 text-xs sm:text-sm">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#667085] block mb-0.5">
                  The Workplace Challenge:
                </span>
                <p className="font-semibold text-[#101828] leading-relaxed">
                  {activity.prompt.context}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#E8E6DF]/70 text-xs">
                <div>
                  <strong className="text-[#667085]">Your Role: </strong>
                  <span className="text-[#101828]">{activity.prompt.yourRole}</span>
                </div>
                <div>
                  <strong className="text-[#667085]">Audience: </strong>
                  <span className="text-[#101828]">{activity.prompt.audience}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E8E6DF]/70 text-xs space-y-1">
                <strong className="text-[#5B5BD6]">Your Goal: </strong>
                <p className="text-[#344054]">{activity.prompt.goal}</p>
              </div>
            </div>

            {/* Spoken Recording Helper if spoken medium */}
            {(activity.medium === 'spoken_communication' || activity.category === 'presentations' || activity.category === 'meetings') && (
              <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E8E6DF] flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-[#101828] flex items-center gap-1.5">
                    <Mic className="w-4 h-4 text-[#5B5BD6]" />
                    Spoken Rehearsal Studio
                  </span>
                  <p className="text-xs text-[#667085]">
                    Practice delivering aloud to test conversational rhythm and timing.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={isRecording ? 'coral' : 'outline'}
                    size="sm"
                    onClick={handleToggleRecording}
                    leftIcon={isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                  >
                    {isRecording ? `Recording (${spokenSeconds}s)...` : 'Simulate Voice Practice'}
                  </Button>
                </div>
              </div>
            )}

            {/* Working Textarea */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#101828] uppercase tracking-wider">
                  Draft Your Response:
                </label>
                {activity.prompt.suggestedStarter && (
                  <button
                    type="button"
                    onClick={handleInsertStarter}
                    className="text-xs text-[#5B5BD6] hover:underline font-semibold"
                  >
                    Insert Starter Template
                  </button>
                )}
              </div>

              <textarea
                rows={9}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Draft your message, email, meeting remarks, or update here..."
                className="w-full p-4 bg-white border border-[#D3D0C6] rounded-xl text-xs sm:text-sm text-[#101828] font-mono leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#5B5BD6] placeholder-[#98A2B3]"
              />

              <div className="flex items-center justify-between text-xs text-[#667085]">
                <span>
                  Words: {userInput.trim() ? userInput.trim().split(/\s+/).length : 0} · Characters:{' '}
                  {userInput.length}
                </span>
                <span className="text-[11px] text-[#98A2B3]">
                  AI evaluates clarity, tone, structure, and professionalism
                </span>
              </div>
            </div>

            {/* Checklist Before Submit */}
            <div className="p-4 bg-[#F8F8F5] rounded-xl border border-[#E8E6DF] space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#667085]">
                Self-Verification Checklist:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#344054]">
                {activity.prompt.checklistBeforeSubmit.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#21B47A] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#E8E6DF]">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveStep('example')}
              >
                Back to Example
              </Button>

              <Button
                variant="primary"
                size="md"
                onClick={handleSubmitForReview}
                isLoading={isSubmitting}
                leftIcon={<Sparkles className="w-4 h-4 fill-current" />}
              >
                Submit for AI Feedback
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 3: AI FEEDBACK                                                       */}
      {/* ========================================================================= */}
      {activeStep === 'feedback' && review && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-7 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E6DF] pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="mint" size="sm">
                    Step 3: AI Diagnostic Feedback
                  </Badge>
                  <span className="text-xs text-[#667085]">
                    Attempt #{review.attemptNumber}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#101828]">
                  Diagnostic Evaluation
                </h2>
                <p className="text-xs sm:text-sm text-[#475467] max-w-xl">
                  {review.overallSummary}
                </p>
              </div>

              {/* Total Score Meter */}
              <div className="p-4 bg-[#F8F8F5] border border-[#E8E6DF] rounded-2xl text-center min-w-[130px] shrink-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#667085] block">
                  Overall Score
                </span>
                <span className="text-3xl font-extrabold text-[#5B5BD6] font-mono">
                  {review.overallScore}
                  <span className="text-base text-[#98A2B3]">/100</span>
                </span>
                <span className="text-[10px] text-[#21B47A] font-semibold block mt-0.5">
                  {review.overallScore >= 80 ? 'Workplace Ready' : 'In Progress'}
                </span>
              </div>
            </div>

            {/* 4 Core Dimensions: Clarity, Tone, Structure, Professionalism */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Clarity */}
              <div className="p-4 rounded-xl bg-[#F8F8F5] border border-[#E8E6DF] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#101828]">1. Clarity</span>
                  <span className="text-xs font-mono font-bold text-[#5B5BD6]">
                    {review.scores.clarityScore}%
                  </span>
                </div>
                <div className="w-full bg-[#E8E6DF] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#5B5BD6] h-full rounded-full"
                    style={{ width: `${review.scores.clarityScore}%` }}
                  />
                </div>
                <p className="text-xs text-[#475467] leading-relaxed">
                  {review.scores.clarityNotes[0]}
                </p>
              </div>

              {/* Tone */}
              <div className="p-4 rounded-xl bg-[#F8F8F5] border border-[#E8E6DF] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#101828]">2. Tone</span>
                  <span className="text-xs font-mono font-bold text-[#21B47A]">
                    {review.scores.toneScore}%
                  </span>
                </div>
                <div className="w-full bg-[#E8E6DF] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#21B47A] h-full rounded-full"
                    style={{ width: `${review.scores.toneScore}%` }}
                  />
                </div>
                <p className="text-xs text-[#475467] leading-relaxed">
                  {review.scores.toneNotes[0]}
                </p>
              </div>

              {/* Structure */}
              <div className="p-4 rounded-xl bg-[#F8F8F5] border border-[#E8E6DF] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#101828]">3. Structure</span>
                  <span className="text-xs font-mono font-bold text-[#5B5BD6]">
                    {review.scores.structureScore}%
                  </span>
                </div>
                <div className="w-full bg-[#E8E6DF] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#5B5BD6] h-full rounded-full"
                    style={{ width: `${review.scores.structureScore}%` }}
                  />
                </div>
                <p className="text-xs text-[#475467] leading-relaxed">
                  {review.scores.structureNotes[0]}
                </p>
              </div>

              {/* Professionalism */}
              <div className="p-4 rounded-xl bg-[#F8F8F5] border border-[#E8E6DF] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#101828]">4. Professionalism</span>
                  <span className="text-xs font-mono font-bold text-[#101828]">
                    {review.scores.professionalismScore}%
                  </span>
                </div>
                <div className="w-full bg-[#E8E6DF] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#101828] h-full rounded-full"
                    style={{ width: `${review.scores.professionalismScore}%` }}
                  />
                </div>
                <p className="text-xs text-[#475467] leading-relaxed">
                  {review.scores.professionalismNotes[0]}
                </p>
              </div>
            </div>

            {/* Strengths & Areas to Improve */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#E8F8F1] border border-[#C6EFE0] space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1B9A67] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#21B47A]" />
                  What You Did Well:
                </span>
                <ul className="space-y-1.5 text-xs text-[#2E4057]">
                  {review.strengths.map((str, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#21B47A] font-bold">✓</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-[#FFF2F0] border border-[#FCD8D4] space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C93B2B] flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-[#F26B5B]" />
                  Concrete Areas to Refine:
                </span>
                <ul className="space-y-1.5 text-xs text-[#475467]">
                  {review.areasToImprove.map((imp, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#F26B5B] font-bold">→</span>
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Submitted Draft Snapshot */}
            <div className="p-4 rounded-xl bg-[#F8F8F5] border border-[#E8E6DF] space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#101828] block">
                Your Submitted Draft:
              </span>
              <div className="text-xs font-mono text-[#344054] leading-relaxed whitespace-pre-wrap">
                {review.userInput}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-[#E8E6DF] flex flex-wrap items-center justify-between gap-3">
              <Button
                variant="ghost"
                size="md"
                onClick={() => setActiveStep('try')}
              >
                Back to Draft
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setActiveStep('improve')}
                  rightIcon={<ChevronRight className="w-4 h-4" />}
                >
                  Proceed to Step 4: Improve
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 4: IMPROVE                                                           */}
      {/* ========================================================================= */}
      {activeStep === 'improve' && review && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <Card variant="default" padding="lg" className="space-y-6">
            <div className="space-y-1 border-b border-[#E8E6DF] pb-4">
              <div className="flex items-center gap-2">
                <Badge variant="indigo" size="sm">
                  Step 4: Improvement Workshop
                </Badge>
                <span className="text-xs text-[#667085]">
                  Targeted Coaching Upgrades
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#101828]">
                Elevate Your Communication
              </h2>
              <p className="text-xs sm:text-sm text-[#475467]">
                Compare your draft with the suggested workplace polish, apply specific structural enhancements, or refine your copy before moving to Retry.
              </p>
            </div>

            {/* Actionable Upgrade Recommendations */}
            {review.actionableImprovements && review.actionableImprovements.length > 0 && (
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#101828] flex items-center gap-1.5">
                  <Wand2 className="w-4 h-4 text-[#5B5BD6]" />
                  Recommended Upgrades for This Response:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {review.actionableImprovements.map((rec) => (
                    <div
                      key={rec.id}
                      className="p-4 rounded-xl bg-[#F8F8F5] border border-[#E8E6DF] space-y-2.5 flex flex-col justify-between"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#101828]">
                            {rec.title}
                          </span>
                          <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-white text-[#5B5BD6] border border-[#E8E6DF]">
                            {rec.dimension}
                          </span>
                        </div>
                        <p className="text-xs text-[#475467] leading-relaxed">
                          {rec.explanation}
                        </p>
                        {rec.afterSnippet && (
                          <div className="p-2 rounded bg-white border border-[#E8E6DF] text-[11px] font-mono text-[#21B47A]">
                            {rec.afterSnippet}
                          </div>
                        )}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleApplyImprovement(rec)}
                        leftIcon={<Sparkles className="w-3.5 h-3.5" />}
                      >
                        Apply to My Draft
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Side-by-Side: Current Working Draft vs AI Suggested Polish */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-2">
              {/* Left: Your Editable Draft */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#101828]">
                    Your Draft (Live Refinement):
                  </label>
                  <span className="text-xs text-[#667085]">
                    {userInput.split(/\s+/).filter(Boolean).length} words
                  </span>
                </div>
                <textarea
                  rows={9}
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="w-full p-4 bg-white border border-[#D3D0C6] rounded-xl text-xs sm:text-sm text-[#101828] font-mono leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#5B5BD6]"
                />
              </div>

              {/* Right: AI Polished Blueprint */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#5B5BD6] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    AI Suggested Polish Blueprint:
                  </span>
                  <button
                    type="button"
                    onClick={handleAdoptPolished}
                    className="text-xs text-[#5B5BD6] hover:underline font-semibold"
                  >
                    Adopt Whole Blueprint
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-[#F9F9FE] border border-[#E0E0FC] text-xs sm:text-sm font-mono text-[#101828] leading-relaxed whitespace-pre-wrap min-h-[190px]">
                  {review.suggestedRevision}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-[#E8E6DF] flex flex-wrap items-center justify-between gap-3">
              <Button
                variant="ghost"
                size="md"
                onClick={() => setActiveStep('feedback')}
              >
                Back to Feedback
              </Button>

              <Button
                variant="primary"
                size="md"
                onClick={handleProceedToRetry}
                rightIcon={<ChevronRight className="w-4 h-4" />}
              >
                Proceed to Step 5: Retry &amp; Verify Growth
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 5: RETRY                                                             */}
      {/* ========================================================================= */}
      {activeStep === 'retry' && review && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <Card variant="default" padding="lg" className="space-y-6">
            <div className="space-y-1 border-b border-[#E8E6DF] pb-4">
              <div className="flex items-center gap-2">
                <Badge variant="mint" size="sm">
                  Step 5: Retry &amp; Progression Tracking
                </Badge>
                <span className="text-xs text-[#667085]">
                  Attempt #{attemptCount}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#101828]">
                Submit Re-evaluation &amp; Log Evidence
              </h2>
              <p className="text-xs sm:text-sm text-[#475467]">
                Test your newly refined draft to measure score improvement, compare attempts, and record verified proof to your career evidence vault.
              </p>
            </div>

            {/* Attempt Progression History if available */}
            {review.history && review.history.length > 0 && (
              <div className="p-4 bg-[#F8F8F5] border border-[#E8E6DF] rounded-2xl space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#101828] flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-[#5B5BD6]" />
                  Growth Trajectory Across Attempts:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {review.history.map((hist) => (
                    <div
                      key={hist.attemptNumber}
                      className="p-3 bg-white rounded-xl border border-[#E8E6DF] space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#101828]">
                          Attempt #{hist.attemptNumber}
                        </span>
                        <span className="font-mono font-bold text-[#5B5BD6]">
                          {hist.overallScore}/100
                        </span>
                      </div>
                      <div className="text-[11px] text-[#667085] flex items-center gap-2">
                        <span>Clarity: {hist.scores.clarityScore}%</span>
                        <span>Tone: {hist.scores.toneScore}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Current Refined Draft ready for Re-evaluation */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#101828] uppercase tracking-wider">
                Your Improved Draft for Re-evaluation:
              </label>
              <textarea
                rows={8}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Finalize your polished response..."
                className="w-full p-4 bg-white border border-[#D3D0C6] rounded-xl text-xs sm:text-sm text-[#101828] font-mono leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#5B5BD6]"
              />
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-[#E8E6DF] flex flex-wrap items-center justify-between gap-3">
              <Button
                variant="outline"
                size="md"
                onClick={handleSubmitForReview}
                isLoading={isSubmitting}
                leftIcon={<RefreshCw className="w-4 h-4" />}
              >
                Run AI Re-Evaluation (Attempt #{attemptCount})
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant={isSavedToEvidence ? 'secondary' : 'mint'}
                  size="md"
                  onClick={handleSaveToEvidence}
                  disabled={isSavedToEvidence}
                  leftIcon={<Award className="w-4 h-4" />}
                >
                  {isSavedToEvidence ? 'Added to Career Evidence' : 'Add to Career Evidence'}
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => onNavigate('evidence')}
                  rightIcon={<ArrowLeft className="w-4 h-4 rotate-180" />}
                >
                  View Evidence Vault
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
