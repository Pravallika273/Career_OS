import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Edit3,
  Send,
  ShieldCheck,
  Eye,
  Clock,
  Compass,
  Lightbulb,
  ArrowUpRight,
  Check,
  ThumbsUp,
  Smile,
  Meh,
  Frown,
  Heart,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { TaskSubmission, TaskWorkspaceData } from '../../types/taskWorkspace';
import {
  TaskReviewFeedback,
  TaskFeeling,
  generateTaskReviewFeedback,
  saveTaskFeelingFeedback,
} from '../../services/taskReviewEngine';
import { RouteId } from '../../types/navigation';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { useToast } from '../ui/Toast';

export interface TaskReviewFeedbackViewProps {
  task: TaskWorkspaceData;
  submission: TaskSubmission;
  onTryAgain: () => void;
  onAskWhy: (feedbackItem?: string) => void;
  onImproveWork: (updatedArtifact: string) => void;
  onNavigate: (route: RouteId) => void;
}

export const TaskReviewFeedbackView: React.FC<TaskReviewFeedbackViewProps> = ({
  task,
  submission,
  onTryAgain,
  onAskWhy,
  onImproveWork,
  onNavigate,
}) => {
  const { toast } = useToast();

  // Generated specific feedback
  const feedback: TaskReviewFeedback = generateTaskReviewFeedback(task, submission);

  // User Sentiment state
  const [selectedFeeling, setSelectedFeeling] = useState<TaskFeeling | null>(null);
  const [isFeelingSaved, setIsFeelingSaved] = useState(false);

  // Evidence vault status
  const [isAddedToEvidence, setIsAddedToEvidence] = useState(false);

  // Inline "Improve My Work" mode
  const [isImprovingMode, setIsImprovingMode] = useState(false);
  const [improvedDraft, setImprovedDraft] = useState(submission.compiledArtifact);

  // "Your attempt" expandable section
  const [isAttemptExpanded, setIsAttemptExpanded] = useState(true);

  const feelingOptions: { label: TaskFeeling; icon: string; color: string }[] = [
    { label: 'Easy', icon: '⚡', color: 'hover:border-[#21B47A]' },
    { label: 'Manageable', icon: '👌', color: 'hover:border-[#5B5BD6]' },
    { label: 'Difficult', icon: '🧩', color: 'hover:border-[#F26B5B]' },
    { label: 'Very difficult', icon: '🔥', color: 'hover:border-[#F26B5B]' },
    { label: 'I enjoyed it', icon: '❤️', color: 'hover:border-[#5B5BD6]' },
    { label: "I didn't enjoy it", icon: '💬', color: 'hover:border-[#667085]' },
  ];

  const handleSelectFeeling = (feeling: TaskFeeling) => {
    setSelectedFeeling(feeling);
    saveTaskFeelingFeedback({
      taskId: task.id,
      submissionId: submission.id,
      feeling,
      submittedAt: new Date().toISOString(),
    });
    setIsFeelingSaved(true);
    toast.success('Feedback Saved', `We will personalize future recommendations based on your input.`);
  };

  const handleSaveImprovedVersion = () => {
    onImproveWork(improvedDraft);
    setIsImprovingMode(false);
    toast.success('Improvements Saved!', 'Your final version has been updated with your edits.');
  };

  const handleAddToEvidenceVault = () => {
    try {
      const raw = localStorage.getItem('careeros_evidence_vault');
      const vault: any[] = raw ? JSON.parse(raw) : [];

      const exists = vault.some((item) => item.taskId === task.id || item.title === task.title);
      if (!exists) {
        vault.unshift({
          id: `proof-${Date.now()}`,
          taskId: task.id,
          title: task.title,
          type: 'Verifiable Task Artifact',
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          skills: task.skills,
          track: task.career,
          summary: submission.reflection || task.overview,
          fullDeliverable: improvedDraft || submission.compiledArtifact,
          verified: true,
          sentiment: selectedFeeling || 'Completed',
        });
        localStorage.setItem('careeros_evidence_vault', JSON.stringify(vault));
      }
    } catch {}

    setIsAddedToEvidence(true);
    toast.success(
      'Added to Career Evidence Vault!',
      `"${task.title}" is now recorded as verified proof.`
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200 text-left pb-24 max-w-5xl mx-auto">
      {/* 0. Header Summary Card */}
      <div className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E6DF] pb-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Badge variant="mint" size="sm">
                Deliverable Evaluated
              </Badge>
              <span className="text-xs text-[#667085]">
                {task.career} · {submission.timeSpentMinutes} mins invested
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#101828]">
              Feedback &amp; Diagnostic Review: {task.title}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onTryAgain}
              leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            >
              Try Again
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => onAskWhy()}
              leftIcon={<Sparkles className="w-3.5 h-3.5" />}
            >
              Ask Why
            </Button>
          </div>
        </div>

        <p className="text-sm text-[#475467] leading-relaxed">
          {feedback.overallEvaluationSummary}
        </p>
      </div>

      {/* 1. SECTION: "Your attempt" */}
      <section className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-7 space-y-4">
        <div className="flex items-center justify-between border-b border-[#E8E6DF] pb-3">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#5B5BD6]" />
            <h2 className="text-base font-bold text-[#101828]">
              Your Attempt
            </h2>
            <span className="text-xs text-[#667085]">
              ({submission.stepDeliverables.length} progressive steps submitted)
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsAttemptExpanded(!isAttemptExpanded)}
            className="text-xs text-[#5B5BD6] hover:underline flex items-center gap-1 font-medium cursor-pointer"
          >
            <span>{isAttemptExpanded ? 'Hide Attempt' : 'View Attempt'}</span>
            {isAttemptExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {isAttemptExpanded && (
          <div className="space-y-4">
            <div className="p-4 sm:p-5 rounded-xl bg-[#101828] text-white/95 font-mono text-xs leading-relaxed max-h-72 overflow-y-auto whitespace-pre-wrap shadow-inner">
              {submission.compiledArtifact}
            </div>

            {submission.reflection && (
              <div className="p-3.5 rounded-xl bg-[#F8F8F5] border border-[#E8E6DF] text-xs space-y-1">
                <span className="font-bold text-[#667085] uppercase tracking-wider text-[10px]">
                  Your Reflection Note:
                </span>
                <p className="text-[#344054] italic">
                  &ldquo;{submission.reflection}&rdquo;
                </p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* 2. SECTION: "What you did well" & "What needs improvement" */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* What you did well */}
        <section className="bg-[#E8F8F1]/40 border border-[#C6EFE0] rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#21B47A] text-white flex items-center justify-center">
              <Check className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#101828]">
                What You Did Well
              </h3>
              <span className="text-[11px] text-[#1B9A67]">Concrete strengths observed</span>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs text-[#2E4057]">
            {feedback.whatYouDidWell.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-[#21B47A] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* What needs improvement */}
        <section className="bg-[#FFF2F0]/40 border border-[#FCD8D4] rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#F26B5B] text-white flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#101828]">
                What Needs Improvement
              </h3>
              <span className="text-[11px] text-[#C93B2B]">Specific gaps to tighten</span>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs text-[#475467]">
            {feedback.whatNeedsImprovement.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F26B5B] shrink-0 mt-1.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* 3. SECTION: "Possible mistakes" & "Here's how to fix it" */}
      <section className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-7 space-y-5">
        <div className="border-b border-[#E8E6DF] pb-3 space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="indigo" size="sm">
              Root Cause Analysis
            </Badge>
            <span className="text-xs text-[#667085]">Workplace Pitfalls</span>
          </div>
          <h3 className="text-base font-bold text-[#101828]">
            Possible Mistakes in this Exercise
          </h3>
        </div>

        <div className="space-y-2.5 text-xs text-[#475467]">
          {feedback.possibleMistakes.map((mistake, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-[#F8F8F5] border border-[#E8E6DF] flex items-start gap-3"
            >
              <span className="w-5 h-5 rounded-full bg-[#E8E6DF] text-[#101828] text-[11px] font-bold flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <p className="leading-relaxed text-[#344054]">{mistake}</p>
            </div>
          ))}
        </div>

        {/* SPECIFIC MANDATE: "Here's how to fix it." */}
        <div className="p-5 rounded-xl bg-[#F0EEFF]/70 border border-[#E4E0FD] space-y-3">
          <div className="flex items-center gap-2 text-[#5B5BD6]">
            <Lightbulb className="w-4 h-4" />
            <h4 className="text-sm font-bold tracking-tight">
              Here&apos;s how to fix it:
            </h4>
          </div>

          <ul className="space-y-2 text-xs text-[#344054]">
            {feedback.howToCorrectThem.map((correction, idx) => (
              <li key={idx} className="flex items-start gap-2 leading-relaxed font-medium">
                <ArrowRight className="w-3.5 h-3.5 text-[#5B5BD6] shrink-0 mt-0.5" />
                <span>{correction}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. SECTION: "What you learned" & "What to try next" */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* What you learned (7 cols) */}
        <div className="md:col-span-7 bg-white border border-[#E8E6DF] rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-[#E8E6DF] pb-3">
            <Compass className="w-4 h-4 text-[#5B5BD6]" />
            <h3 className="text-sm font-bold text-[#101828]">
              What You Learned
            </h3>
          </div>

          <div className="space-y-2">
            {feedback.whatYouLearned.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-[#F8F8F5] border border-[#E8E6DF] text-xs text-[#344054] flex items-start gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#21B47A] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* What to try next (5 cols) */}
        <div className="md:col-span-5 bg-white border border-[#E8E6DF] rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#E8E6DF] pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#5B5BD6]" />
              <h3 className="text-sm font-bold text-[#101828]">
                What to Try Next
              </h3>
            </div>
            <span className="text-[11px] font-mono text-[#667085]">
              {feedback.whatToTryNext.time}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#F8F8F5] border border-[#E8E6DF] space-y-2">
            <h4 className="text-xs font-bold text-[#101828]">
              {feedback.whatToTryNext.title}
            </h4>
            <p className="text-xs text-[#667085] leading-relaxed">
              {feedback.whatToTryNext.description}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (feedback.whatToTryNext.taskId) {
                  onNavigate(`tasks/${feedback.whatToTryNext.taskId}`);
                } else {
                  onNavigate('tasks');
                }
              }}
              rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
              className="mt-2 w-full justify-center"
            >
              Start Next Practical Task
            </Button>
          </div>
        </div>
      </div>

      {/* 5. FOUR MANDATED ACTIONS: Try Again, Ask Why, Improve My Work, Submit Final Version */}
      <section className="bg-white border border-[#E8E6DF] rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E6DF] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#101828]">
            Refine &amp; Finalize Actions:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onTryAgain}
              leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            >
              Try Again
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onAskWhy(feedback.whatNeedsImprovement[0])}
              leftIcon={<Sparkles className="w-3.5 h-3.5 text-[#5B5BD6]" />}
            >
              Ask Why
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsImprovingMode(!isImprovingMode)}
              leftIcon={<Edit3 className="w-3.5 h-3.5" />}
            >
              {isImprovingMode ? 'Cancel Editing' : 'Improve My Work'}
            </Button>
          </div>
        </div>

        {/* Inline Improvement Canvas if active */}
        {isImprovingMode && (
          <div className="p-4 sm:p-5 rounded-xl bg-[#F8F8F5] border border-[#5B5BD6]/40 space-y-3 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#101828]">
                Revise Your Deliverable Based on the Feedback:
              </span>
              <span className="text-[11px] text-[#5B5BD6]">
                Apply the &ldquo;Here&apos;s how to fix it&rdquo; points above
              </span>
            </div>

            <textarea
              value={improvedDraft}
              onChange={(e) => setImprovedDraft(e.target.value)}
              rows={8}
              className="w-full p-4 rounded-xl bg-white border border-[#E8E6DF] text-xs font-mono text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#5B5BD6]"
            />

            <div className="flex items-center justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsImprovingMode(false)}
              >
                Cancel
              </Button>
              <Button
                variant="mint"
                size="sm"
                onClick={handleSaveImprovedVersion}
                leftIcon={<Check className="w-3.5 h-3.5" />}
              >
                Submit Final Version
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* 6. MANDATED QUESTION: "How did this task feel?" */}
      <section className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-7 space-y-4">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5B5BD6]">
            Personalization Reflection
          </span>
          <h3 className="text-base sm:text-lg font-bold text-[#101828]">
            How did this task feel?
          </h3>
          <p className="text-xs text-[#667085]">
            CareerOS adapts future challenge pacing and skill paths based on your real experience.
          </p>
        </div>

        {/* 6 Choices */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {feelingOptions.map((opt) => {
            const isSelected = selectedFeeling === opt.label;
            return (
              <button
                key={opt.label}
                type="button"
                onClick={() => handleSelectFeeling(opt.label)}
                className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-all select-none cursor-pointer ${
                  isSelected
                    ? 'border-[#5B5BD6] bg-[#F0EEFF] text-[#5B5BD6] ring-2 ring-[#5B5BD6]/20'
                    : `border-[#E8E6DF] bg-white text-[#344054] ${opt.color} hover:bg-[#F8F8F5]`
                }`}
              >
                <span className="text-lg">{opt.icon}</span>
                <span className="text-center">{opt.label}</span>
              </button>
            );
          })}
        </div>

        {isFeelingSaved && (
          <div className="p-3 bg-[#E8F8F1] border border-[#C6EFE0] rounded-xl text-xs text-[#1B9A67] flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Saved: We will calibrate future recommendations to your pacing.</span>
          </div>
        )}
      </section>

      {/* 7. FINAL MANDATED CTA: "Add this to My Career Evidence" */}
      <section className="bg-white border-2 border-[#5B5BD6] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2">
            <Badge variant="mint" size="sm">
              Verifiable Proof
            </Badge>
            <span className="text-xs font-semibold text-[#5B5BD6]">
              Permanent Career Asset
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#101828]">
            Turn this completed work into verified career evidence.
          </h3>
          <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
            Records your deliverable, specific feedback notes, and reflection to your permanent Career Evidence Vault so you can reference it in job applications and interviews.
          </p>
        </div>

        <div className="shrink-0 flex flex-col items-start sm:items-end gap-2">
          {isAddedToEvidence ? (
            <div className="space-y-2 text-right">
              <Button
                variant="mint"
                size="lg"
                disabled
                leftIcon={<ShieldCheck className="w-5 h-5 text-white" />}
                className="font-bold cursor-default"
              >
                Added to My Career Evidence
              </Button>
              <div>
                <button
                  type="button"
                  onClick={() => onNavigate('my-career')}
                  className="text-xs text-[#5B5BD6] hover:underline font-semibold flex items-center gap-1 ml-auto"
                >
                  <span>View in Evidence Vault</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <Button
              variant="mint"
              size="lg"
              onClick={handleAddToEvidenceVault}
              leftIcon={<ShieldCheck className="w-5 h-5" />}
              className="font-bold text-sm px-6 py-3 shadow-md"
            >
              Add this to My Career Evidence
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};
