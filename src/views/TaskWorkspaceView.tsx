import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Save,
  Pause,
  Play,
  RotateCcw,
  Send,
  Eye,
  Check,
  Copy,
  ChevronRight,
  ChevronDown,
  Layers,
  Lightbulb,
  FileText,
  ShieldCheck,
  Compass,
  ArrowRight,
  Bookmark,
  Share2,
  WifiOff,
  Wifi,
  Flag,
} from 'lucide-react';
import { RouteId } from '../types/navigation';
import { ReportModal } from '../components/trust/ReportModal';
import {
  TaskWorkspaceData,
  TaskDraft,
  TaskSubmission,
} from '../types/taskWorkspace';
import {
  getTaskWorkspaceData,
  getTaskDraft,
  saveTaskDraft,
  saveTaskSubmission,
  getTaskSubmissionForTask,
} from '../services/taskWorkspaceService';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Dialog } from '../components/ui/Dialog';
import { useToast } from '../components/ui/Toast';
import { UserProfile } from '../types/user';
import { TaskAICompanion } from '../components/tasks/TaskAICompanion';
import { TaskAIContext } from '../services/taskAIEngine';
import { TaskReviewFeedbackView } from '../components/tasks/TaskReviewFeedbackView';
import { useNetworkStatus } from '../lib/useNetworkStatus';

export interface TaskWorkspaceViewProps {
  taskId: string;
  onNavigate: (route: RouteId) => void;
  userProfile?: UserProfile;
  onOpenAICompanion?: () => void;
}

export const TaskWorkspaceView: React.FC<TaskWorkspaceViewProps> = ({
  taskId,
  onNavigate,
  userProfile,
  onOpenAICompanion,
}) => {
  const { toast } = useToast();
  const { isOnline } = useNetworkStatus();

  // Load task data
  const task: TaskWorkspaceData = useMemo(() => {
    return getTaskWorkspaceData(taskId);
  }, [taskId]);

  // View mode: 'workspace' or 'review'
  const [viewMode, setViewMode] = useState<'workspace' | 'review'>('workspace');
  const [activeSubmission, setActiveSubmission] = useState<TaskSubmission | null>(null);

  // Contextual Task AI Companion state
  const [isTaskAIOpen, setIsTaskAIOpen] = useState(false);
  const [taskAIInitialQuery, setTaskAIInitialQuery] = useState<string | undefined>(undefined);

  // Workspace progressive state
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [stepResponses, setStepResponses] = useState<Record<number, string>>({
    1: '',
    2: '',
    3: '',
    4: '',
  });
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);

  // Timer & pause state
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Modal dialog states
  const [isStuckModalOpen, setIsStuckModalOpen] = useState(false);
  const [isPauseModalOpen, setIsPauseModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [submissionReflection, setSubmissionReflection] = useState('');

  // Example collapsible view
  const [isExampleExpanded, setIsExampleExpanded] = useState(true);
  const [copiedExample, setCopiedExample] = useState(false);

  // Active step checkpoints state
  const [checkedCheckpoints, setCheckedCheckpoints] = useState<Record<string, boolean>>({});

  // Restore draft on load
  useEffect(() => {
    const draft = getTaskDraft(taskId);
    if (draft) {
      setStepResponses(draft.stepResponses || { 1: '', 2: '', 3: '', 4: '' });
      setCurrentStepIdx(draft.currentStepIndex || 0);
      setCompletedSteps(draft.completedSteps || []);
      setElapsedSeconds(draft.timeSpentSeconds || 0);
      setLastSavedTime(draft.lastUpdated);
      toast.info('Draft Restored', 'Your previous work was automatically recovered.');
    }

    const existingSubmission = getTaskSubmissionForTask(taskId);
    if (existingSubmission) {
      setActiveSubmission(existingSubmission);
    }
  }, [taskId]);

  // Elapsed timer tick
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Auto-save debounced every 15s if user typed
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSaveDraft(false);
    }, 15000);
    return () => clearTimeout(timer);
  }, [stepResponses, currentStepIdx, completedSteps]);

  // Formatting helpers
  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSaveDraft = (showToast = true) => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const draft: TaskDraft = {
      taskId,
      lastUpdated: now,
      currentStepIndex: currentStepIdx,
      stepResponses,
      completedSteps,
      timeSpentSeconds: elapsedSeconds,
    };
    saveTaskDraft(draft);
    setLastSavedTime(now);
    if (showToast) {
      if (isOnline) {
        toast.success('Work Saved', `Draft saved safely to your browser at ${now}.`);
      } else {
        toast.info('Draft Stored on Phone', `Saved offline locally (${now}). Your work is 100% preserved.`);
      }
    }
  };

  const handlePauseWork = () => {
    setIsPaused(true);
    handleSaveDraft(false);
    setIsPauseModalOpen(true);
  };

  const handleResumeWork = () => {
    setIsPaused(false);
    setIsPauseModalOpen(false);
  };

  const handleContinueLater = () => {
    handleSaveDraft(false);
    toast.info('Progress Preserved', 'Your draft is saved. Returning to catalog.');
    onNavigate('tasks');
  };

  // Step response updater
  const handleUpdateCurrentStepResponse = (value: string) => {
    const stepNum = currentStepIdx + 1;
    setStepResponses((prev) => ({
      ...prev,
      [stepNum]: value,
    }));
  };

  const handleInsertTemplate = () => {
    const currentStep = task.steps[currentStepIdx];
    if (!currentStep) return;
    const stepNum = currentStepIdx + 1;
    const existing = stepResponses[stepNum] || '';
    if (existing.trim().length > 0) {
      if (confirm('Append the starter template to your current work?')) {
        setStepResponses((prev) => ({
          ...prev,
          [stepNum]: `${existing}\n\n${currentStep.starterTemplate}`,
        }));
      }
    } else {
      setStepResponses((prev) => ({
        ...prev,
        [stepNum]: currentStep.starterTemplate,
      }));
    }
    toast.info('Template Inserted', 'Fill in the bracketed fields with your own work.');
  };

  const handleToggleCheckpoint = (key: string) => {
    setCheckedCheckpoints((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleMarkStepComplete = () => {
    const stepNum = currentStepIdx + 1;
    if (!completedSteps.includes(stepNum)) {
      setCompletedSteps((prev) => [...prev, stepNum]);
    }
    handleSaveDraft(false);
    if (currentStepIdx < task.steps.length - 1) {
      setCurrentStepIdx(currentStepIdx + 1);
      toast.success(`Step ${stepNum} Complete`, `Moving to Step ${stepNum + 1}.`);
    } else {
      toast.success('All Steps Complete!', 'Ready to review and submit your deliverable.');
    }
  };

  // Submission validation: "Do not automatically complete the task for the user"
  const handleOpenSubmit = () => {
    // Check whether user has entered any substantial text
    const totalChars = Object.values(stepResponses).reduce(
      (acc, text) => acc + (text ? text.trim().length : 0),
      0
    );

    if (totalChars < 30) {
      toast.warning(
        'Deliverable Incomplete',
        'Please draft your work for the steps before submitting. CareerOS requires tangible proof.'
      );
      return;
    }

    setIsSubmitModalOpen(true);
  };

  const handleFinalSubmit = () => {
    const stepDeliverables = task.steps.map((st) => ({
      stepNumber: st.stepNumber,
      title: st.title,
      content: stepResponses[st.stepNumber] || 'No notes provided.',
    }));

    const compiledArtifact = stepDeliverables
      .map((sd) => `### ${sd.title}\n${sd.content}`)
      .join('\n\n---\n\n');

    const submission: TaskSubmission = {
      id: `submission-${Date.now()}`,
      taskId,
      taskTitle: task.title,
      career: task.career,
      difficulty: task.difficulty,
      submittedAt: new Date().toISOString(),
      stepDeliverables,
      compiledArtifact,
      reflection: submissionReflection,
      timeSpentMinutes: Math.max(1, Math.round(elapsedSeconds / 60)),
    };

    saveTaskSubmission(submission);
    setActiveSubmission(submission);
    setIsSubmitModalOpen(false);
    setViewMode('review');
    if (isOnline) {
      toast.success('Task Evaluated!', 'Your feedback and diagnostic review is ready.');
    } else {
      toast.success('Deliverable Recorded Offline', 'Saved permanently to Evidence Vault on your phone. Review generated.');
    }
  };

  const handleCopyExample = () => {
    navigator.clipboard.writeText(task.example.deliverableContent);
    setCopiedExample(true);
    toast.success('Example Copied', 'Sample deliverable copied to clipboard.');
    setTimeout(() => setCopiedExample(false), 2000);
  };

  const activeStep = task.steps[currentStepIdx] || task.steps[0];
  const activeStepNum = currentStepIdx + 1;
  const currentStepResponse = stepResponses[activeStepNum] || '';

  // Render Review and Feedback mode if active
  if (viewMode === 'review' && activeSubmission) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto pb-24 text-left animate-in fade-in duration-200">
        <div className="flex items-center justify-between border-b border-[#E8E6DF] pb-3 bg-white p-4 rounded-2xl shadow-xs">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode('workspace')}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Back to Step Workspace
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#667085]">Stage:</span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#E8F8F1] text-[#1B9A67]">
              Review &amp; Diagnostic Feedback
            </span>
          </div>
        </div>

        <TaskReviewFeedbackView
          task={task}
          submission={activeSubmission}
          onTryAgain={() => setViewMode('workspace')}
          onAskWhy={(item) => {
            setTaskAIInitialQuery(
              item
                ? `Can you explain why this was flagged: "${item}" and how an engineering manager evaluates it?`
                : `Can you explain the feedback on what needs improvement and what hiring managers look for?`
            );
            setIsTaskAIOpen(true);
          }}
          onImproveWork={(updatedArtifact) => {
            const updated = {
              ...activeSubmission,
              compiledArtifact: updatedArtifact,
            };
            setActiveSubmission(updated);
            saveTaskSubmission(updated);
          }}
          onNavigate={onNavigate}
        />

        {/* Floating AI Helper Trigger */}
        <button
          type="button"
          onClick={() => {
            setTaskAIInitialQuery(undefined);
            setIsTaskAIOpen(true);
          }}
          className="fixed bottom-6 right-6 z-40 bg-[#5B5BD6] hover:bg-[#4B4BC2] text-white py-2.5 px-4 rounded-full shadow-lg flex items-center gap-2 group transition-all cursor-pointer"
          title="Ask CareerOS AI about feedback"
        >
          <Sparkles className="w-4 h-4 text-white animate-pulse" />
          <span className="text-xs font-semibold">Ask AI about Review</span>
        </button>

        {/* Contextual CareerOS AI Help Experience */}
        <TaskAICompanion
          isOpen={isTaskAIOpen}
          onClose={() => {
            setIsTaskAIOpen(false);
            setTaskAIInitialQuery(undefined);
          }}
          context={{
            task,
            studentLevel: userProfile?.currentLevel || 'Level 1: Foundation Builder',
            selectedSkills: task.skills,
            currentStep: activeStep,
            stepNumber: activeStepNum,
            totalSteps: task.steps.length,
            stepResponses,
            currentStepDraft: currentStepResponse,
          }}
          initialQuery={taskAIInitialQuery}
          onInsertTextIntoStep={(text) => {
            const stepNum = activeStepNum;
            const existing = stepResponses[stepNum] || '';
            setStepResponses((prev) => ({
              ...prev,
              [stepNum]: existing ? `${existing}\n\n${text}` : text,
            }));
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-200 text-left pb-24 max-w-6xl mx-auto">
      {/* 0. PERSISTENT WORKSPACE TOP BAR */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border border-[#E8E6DF] rounded-2xl p-3 sm:p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        {/* Left: Back & Title info */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('tasks')}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            className="shrink-0 text-xs sm:text-sm"
          >
            <span className="hidden sm:inline">All Tasks</span>
            <span className="sm:hidden">Tasks</span>
          </Button>
          <div className="min-w-0 border-l border-[#E8E6DF] pl-2 sm:pl-3">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <Badge variant="indigo" size="sm">
                {task.difficulty}
              </Badge>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                CareerOS simulation
              </span>
              <span className="text-[11px] sm:text-xs text-[#667085] hidden sm:inline">
                {task.career}
              </span>
            </div>
            <h1 className="text-xs sm:text-sm md:text-base font-bold text-[#101828] truncate max-w-[180px] sm:max-w-md">
              {task.title}
            </h1>
          </div>
        </div>

        {/* Center / Right: Live Timer, Last Saved, Persistent Actions */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 justify-end">
          {/* Offline indicator badge if connection lost */}
          {!isOnline && (
            <div
              title="Working offline. Drafts and deliverables are saved safely on your device."
              className="flex items-center gap-1 px-2 py-1 bg-[#FFF4ED] border border-[#FDDCAB] text-[#B54708] rounded-md text-[10px] sm:text-[11px] font-semibold"
            >
              <WifiOff className="w-3 h-3 text-[#F79009]" />
              <span className="hidden sm:inline">Offline (Saved Locally)</span>
              <span className="sm:hidden">Offline</span>
            </div>
          )}

          {/* Live Timer */}
          <div className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 bg-[#F8F8F5] border border-[#E8E6DF] rounded-lg text-xs font-mono text-[#101828]">
            <Clock className="w-3.5 h-3.5 text-[#667085]" />
            <span>{formatTimer(elapsedSeconds)}</span>
            <span className="text-[10px] text-[#98A2B3] hidden sm:inline">/ ~{task.time}</span>
          </div>

          {/* Last Saved indicator */}
          {lastSavedTime && (
            <span className="text-[11px] text-[#667085] hidden lg:inline">
              Saved {lastSavedTime}
            </span>
          )}

          {/* Persistent Action: "I'm stuck" */}
          <Button
            variant="coral"
            size="sm"
            onClick={() => {
              setTaskAIInitialQuery("I'm stuck.");
              setIsTaskAIOpen(true);
            }}
            leftIcon={<HelpCircle className="w-3.5 h-3.5" />}
            className="font-semibold shadow-xs text-xs"
          >
            I&apos;m stuck
          </Button>

          {/* Ask CareerOS AI */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setTaskAIInitialQuery(undefined);
              setIsTaskAIOpen(true);
            }}
            leftIcon={<Sparkles className="w-3.5 h-3.5 text-[#5B5BD6]" />}
            className="hidden sm:inline-flex text-xs"
          >
            Ask AI
          </Button>

          {/* Save Action */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSaveDraft(true)}
            leftIcon={<Save className="w-3.5 h-3.5" />}
            title="Save draft to local storage"
            className="text-xs"
          >
            Save
          </Button>

          {/* Pause Action */}
          <Button
            variant="outline"
            size="sm"
            onClick={handlePauseWork}
            leftIcon={<Pause className="w-3.5 h-3.5" />}
            title="Pause timer and take a break"
            className="hidden sm:inline-flex text-xs"
          >
            Pause
          </Button>

          {/* Continue later */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleContinueLater}
            className="hidden lg:inline-flex text-[#667085] text-xs"
          >
            Continue later
          </Button>

          {/* View Review Button if previously submitted */}
          {activeSubmission && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode('review')}
              leftIcon={<Eye className="w-3.5 h-3.5 text-[#5B5BD6]" />}
              className="border-[#5B5BD6]/40 text-[#5B5BD6] font-semibold text-xs"
            >
              View Review
            </Button>
          )}

          {/* Submit Action */}
          <Button
            variant="mint"
            size="sm"
            onClick={handleOpenSubmit}
            leftIcon={<Send className="w-3.5 h-3.5" />}
            className="font-bold shadow-xs text-xs"
          >
            Submit
          </Button>

          {/* Report Task Trigger */}
          <button
            type="button"
            onClick={() => setIsReportModalOpen(true)}
            title="Report this task for inaccuracies, broken steps, or content issues"
            aria-label={`Report task: ${task.title}`}
            className="p-2 rounded-lg border border-[#E8E6DF] bg-white text-[#98A2B3] hover:text-[#C93B2B] hover:bg-[#FFF2F0] transition-colors cursor-pointer shrink-0"
          >
            <Flag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 1. SECTION: "Before You Start" */}
      <section className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2 border-b border-[#E8E6DF] pb-4">
          <Badge variant="mint" size="sm">
            Phase 1 of 3
          </Badge>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#101828]">
            Before You Start
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left Column (8 cols): Explanations */}
          <div className="md:col-span-8 space-y-5">
            {/* What the task is */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#101828]">
                What the task is:
              </span>
              <p className="text-sm text-[#475467] leading-relaxed">
                {task.overview}
              </p>
            </div>

            {/* Why it matters */}
            <div className="p-4 rounded-xl bg-[#F0EEFF]/50 border border-[#E4E0FD] space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5B5BD6]">
                Why it matters in the workplace:
              </span>
              <p className="text-sm text-[#344054] leading-relaxed">
                {task.whyItMatters}
              </p>
            </div>

            {/* What skill it develops */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#101828]">
                What skills this develops:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {task.skillDevelopmentSummary.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-[#F8F8F5] border border-[#E8E6DF] text-xs text-[#344054] flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#21B47A] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Final Output Expectation & Estimated Time */}
          <div className="md:col-span-4 bg-[#F8F8F5] p-5 rounded-2xl border border-[#E8E6DF] space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#21B47A]">
                What the final output looks like:
              </span>
              <p className="text-xs text-[#101828] font-medium leading-relaxed">
                {task.finalOutputDescription}
              </p>
              <div className="pt-2">
                <span className="inline-block px-2.5 py-1 rounded text-[11px] font-mono bg-white border border-[#E8E6DF] text-[#475467]">
                  {task.finalOutputFormat}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E8E6DF] space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#667085] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#5B5BD6]" />
                Estimated Time:
              </span>
              <p className="text-base font-bold text-[#101828]">
                ~{task.time}
              </p>
              <p className="text-[11px] text-[#667085] leading-relaxed">
                There is zero penalty for taking longer. Work at your own rhythm; thoughtful proof always beats rushed work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION: "See an Example" */}
      <section className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#E8E6DF] pb-4">
          <div className="flex items-center gap-2">
            <Badge variant="indigo" size="sm">
              Phase 2 of 3
            </Badge>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#101828]">
              See an Example
            </h2>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExampleExpanded(!isExampleExpanded)}
            rightIcon={
              isExampleExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )
            }
          >
            {isExampleExpanded ? 'Collapse Example' : 'Study Example'}
          </Button>
        </div>

        {isExampleExpanded && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Example Context & Scenario */}
            <div className="bg-[#F8F8F5] p-4 sm:p-5 rounded-xl border border-[#E8E6DF] space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#101828]">
                  Example Case: {task.example.title}
                </h3>
                <span className="text-xs text-[#667085]">Verified Model Artifact</span>
              </div>
              <p className="text-xs text-[#475467] leading-relaxed">
                <strong>Scenario: </strong>
                {task.example.scenario}
              </p>
            </div>

            {/* Complete Sample Deliverable Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#101828] uppercase tracking-wider">
                  Complete Deliverable Sample
                </span>
                <button
                  type="button"
                  onClick={handleCopyExample}
                  className="flex items-center gap-1 text-[#5B5BD6] hover:underline font-medium"
                >
                  {copiedExample ? <Check className="w-3.5 h-3.5 text-[#21B47A]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedExample ? 'Copied' : 'Copy Sample'}</span>
                </button>
              </div>

              <div className="p-4 sm:p-5 rounded-xl bg-[#101828] text-white/90 font-mono text-xs leading-relaxed overflow-x-auto max-h-96 shadow-inner whitespace-pre-wrap">
                {task.example.deliverableContent}
              </div>
            </div>

            {/* 4 Explanatory Pillars: Approach, Done Well, Beginner Notice, Common Mistakes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* How the example was approached */}
              <div className="p-4 rounded-xl bg-white border border-[#E8E6DF] space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#5B5BD6] font-bold uppercase tracking-wider text-[11px]">
                  <Compass className="w-3.5 h-3.5" />
                  <span>How the example was approached:</span>
                </div>
                <p className="text-[#475467] leading-relaxed">
                  {task.example.approach}
                </p>
              </div>

              {/* What was done well */}
              <div className="p-4 rounded-xl bg-[#E8F8F1] border border-[#C6EFE0] space-y-1.5 text-[#1B9A67]">
                <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] text-[#21B47A]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>What was done well:</span>
                </div>
                <ul className="space-y-1 list-disc pl-4 text-xs text-[#2E4057]">
                  {task.example.whatWasDoneWell.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>

              {/* What a beginner should notice */}
              <div className="p-4 rounded-xl bg-[#F0EEFF]/60 border border-[#E4E0FD] space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#5B5BD6] font-bold uppercase tracking-wider text-[11px]">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>What a beginner should notice:</span>
                </div>
                <ul className="space-y-1 list-disc pl-4 text-xs text-[#475467]">
                  {task.example.whatBeginnerShouldNotice.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>

              {/* Common mistakes */}
              <div className="p-4 rounded-xl bg-[#FFF2F0] border border-[#FCD8D4] space-y-1.5 text-[#C93B2B]">
                <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] text-[#F26B5B]">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Common mistakes to avoid:</span>
                </div>
                <ul className="space-y-1 list-disc pl-4 text-xs text-[#475467]">
                  {task.example.commonMistakes.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 3. SECTION: "Now it's your turn." */}
      <section className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="border-b border-[#E8E6DF] pb-4 space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="mint" size="sm">
              Phase 3 of 3
            </Badge>
            <span className="text-xs text-[#667085]">Interactive Workspace</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#101828]">
            Now it&apos;s your turn.
          </h2>
          <p className="text-sm text-[#475467]">
            Work progressively across the 4 steps below. Your progress saves automatically.
          </p>
        </div>

        {/* Step Indicator Navigation (Step 1, Step 2, Step 3, Step 4) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {task.steps.map((st, idx) => {
            const stepNum = idx + 1;
            const isCurrent = currentStepIdx === idx;
            const isCompleted = completedSteps.includes(stepNum);
            const hasDraftContent = Boolean(stepResponses[stepNum]?.trim());

            return (
              <button
                key={stepNum}
                type="button"
                onClick={() => setCurrentStepIdx(idx)}
                className={`p-3 rounded-xl border text-left transition-all relative ${
                  isCurrent
                    ? 'border-[#5B5BD6] bg-[#F0EEFF]/50 ring-1 ring-[#5B5BD6]'
                    : isCompleted
                    ? 'border-[#C6EFE0] bg-[#E8F8F1]/40'
                    : 'border-[#E8E6DF] bg-[#F8F8F5]/60 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider ${
                      isCurrent
                        ? 'text-[#5B5BD6]'
                        : isCompleted
                        ? 'text-[#21B47A]'
                        : 'text-[#667085]'
                    }`}
                  >
                    Step {stepNum}
                  </span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#21B47A]" />
                  ) : hasDraftContent ? (
                    <span className="w-2 h-2 rounded-full bg-[#5B5BD6]" />
                  ) : null}
                </div>
                <h4 className="text-xs font-semibold text-[#101828] truncate">
                  {st.title.replace(/^Step \d+: /, '')}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Active Step Working Canvas */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#F8F8F5]/60 border border-[#E8E6DF] space-y-6">
          {/* Step Header & Objective */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-[#5B5BD6] text-white">
                Step {activeStepNum} of {task.steps.length}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#101828]">
                {activeStep.title}
              </h3>
            </div>
            <p className="text-sm font-medium text-[#101828]">
              <strong>Objective: </strong>
              {activeStep.objective}
            </p>
            <p className="text-xs text-[#475467] leading-relaxed">
              {activeStep.guidance}
            </p>
          </div>

          {/* Interactive Checkpoints */}
          {activeStep.checkpoints && activeStep.checkpoints.length > 0 && (
            <div className="p-4 bg-white rounded-xl border border-[#E8E6DF] space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#667085]">
                Self-Verification Checkpoints:
              </span>
              <div className="space-y-1.5">
                {activeStep.checkpoints.map((cp, i) => {
                  const checkKey = `step_${activeStepNum}_cp_${i}`;
                  const isChecked = Boolean(checkedCheckpoints[checkKey]);
                  return (
                    <label
                      key={i}
                      className="flex items-start gap-2.5 text-xs text-[#344054] cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleCheckpoint(checkKey)}
                        className="mt-0.5 rounded border-[#D3D0C6] text-[#5B5BD6] focus:ring-[#5B5BD6]"
                      />
                      <span className={isChecked ? 'line-through text-[#98A2B3]' : ''}>
                        {cp}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* User Input Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#101828]">
                {activeStep.prompt}
              </label>
              <Button
                variant="outline"
                size="sm"
                onClick={handleInsertTemplate}
                leftIcon={<FileText className="w-3.5 h-3.5" />}
              >
                Insert Starter Template
              </Button>
            </div>

            <textarea
              value={currentStepResponse}
              onChange={(e) => handleUpdateCurrentStepResponse(e.target.value)}
              placeholder="Write or paste your step notes, analysis, code snippet, or reflection here..."
              rows={9}
              className="w-full p-4 rounded-xl bg-white border border-[#E8E6DF] text-sm sm:text-base font-mono text-[#101828] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#5B5BD6] transition-all leading-relaxed"
            />

            <div className="flex items-center justify-between text-[11px] text-[#667085] pt-1">
              <span>{currentStepResponse.length} characters</span>
              <span className="flex items-center gap-1 font-medium text-[#21B47A]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#21B47A]" />
                {isOnline ? 'Draft auto-saves locally' : 'Saved on phone (Offline safe)'}
              </span>
            </div>
          </div>

          {/* Progressive Navigation Actions */}
          <div className="pt-4 border-t border-[#E8E6DF] flex items-center justify-between gap-3">
            <Button
              variant="ghost"
              size="sm"
              disabled={currentStepIdx === 0}
              onClick={() => setCurrentStepIdx(currentStepIdx - 1)}
            >
              Previous Step
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                size="md"
                onClick={handleMarkStepComplete}
                rightIcon={
                  currentStepIdx < task.steps.length - 1 ? (
                    <ArrowRight className="w-4 h-4" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )
                }
              >
                {currentStepIdx < task.steps.length - 1
                  ? `Save & Go to Step ${activeStepNum + 1}`
                  : 'Complete Step 4 & Review'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PERSISTENT ACTION MODALS & ASSISTANTS */}
      {/* ========================================================================= */}

      {/* 1. "I'M STUCK" MODAL */}
      <Dialog
        isOpen={isStuckModalOpen}
        onClose={() => setIsStuckModalOpen(false)}
        title="Feeling stuck is completely normal."
        description="“Start wherever you are. Do something useful. Learn from it.”"
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsStuckModalOpen(false)}
            >
              Back to Workspace
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setIsStuckModalOpen(false);
                setTaskAIInitialQuery("I'm stuck.");
                setIsTaskAIOpen(true);
              }}
              leftIcon={<Sparkles className="w-4 h-4" />}
            >
              Ask CareerOS AI for Guidance
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-left text-xs sm:text-sm">
          <div className="p-3.5 rounded-xl bg-[#F0EEFF]/60 border border-[#E4E0FD] text-[#344054] leading-relaxed">
            <strong className="text-[#5B5BD6] block mb-1">
              Remember the CareerOS principle:
            </strong>
            You are not being graded. You do not need to build a flawless system on your first try. Even a rough 2-sentence draft is tangible proof that breaks inertia.
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-[#101828] text-xs uppercase tracking-wider">
              3 Quick Ways to Unblock Step {activeStepNum}:
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-[#F8F8F5] rounded-lg border border-[#E8E6DF] space-y-1">
                <strong className="text-[#101828] block">1. Compare with the benchmark example above:</strong>
                <p className="text-[#667085]">
                  Scroll up to &ldquo;See an Example&rdquo;. Look at how the model deliverable answered this exact phase and use a similar structure.
                </p>
              </div>

              <div className="p-3 bg-[#F8F8F5] rounded-lg border border-[#E8E6DF] space-y-1">
                <strong className="text-[#101828] block">2. Cut the scope in half:</strong>
                <p className="text-[#667085]">
                  If you are stuck trying to analyze 3 things, do just 1 single thing thoroughly. One clear bullet point is worth ten vague ones.
                </p>
              </div>

              <div className="p-3 bg-[#F8F8F5] rounded-lg border border-[#E8E6DF] space-y-1">
                <strong className="text-[#101828] block">3. Step tips for &ldquo;{activeStep.title}&rdquo;:</strong>
                <ul className="list-disc pl-4 text-[#667085] space-y-1">
                  {activeStep.stuckTips?.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Dialog>

      {/* 2. PAUSE MODAL */}
      <Dialog
        isOpen={isPauseModalOpen}
        onClose={handleResumeWork}
        title="Workspace Paused"
        description="Take a breath. Step away from the screen for a minute."
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={handleContinueLater}
            >
              Continue Later &amp; Exit
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleResumeWork}
              leftIcon={<Play className="w-4 h-4 fill-current" />}
            >
              Resume Working
            </Button>
          </>
        }
      >
        <div className="space-y-3 text-left text-xs sm:text-sm">
          <p className="text-[#475467] leading-relaxed">
            Your draft across all 4 steps is safely stored in your browser. Timer is paused at{' '}
            <strong className="font-mono text-[#101828]">{formatTimer(elapsedSeconds)}</strong>.
          </p>
          <div className="p-3.5 bg-[#E8F8F1] rounded-xl border border-[#C6EFE0] text-xs text-[#1B9A67]">
            <CheckCircle2 className="w-4 h-4 inline mr-1 text-[#21B47A]" />
            Zero work has been lost. Grab some water, stretch, and return when ready.
          </div>
        </div>
      </Dialog>

      {/* 3. REVIEW & SUBMIT DELIVERABLE MODAL */}
      <Dialog
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title="Submit Deliverable to Evidence Vault"
        description="Compile and verify your work as permanent proof of career competence."
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSubmitModalOpen(false)}
            >
              Keep Editing
            </Button>
            <Button
              variant="mint"
              size="sm"
              onClick={handleFinalSubmit}
              leftIcon={<ShieldCheck className="w-4 h-4" />}
            >
              Confirm &amp; Record to Vault
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-left text-xs sm:text-sm max-h-[60vh] overflow-y-auto pr-1">
          <div className="p-3 bg-[#F8F8F5] rounded-xl border border-[#E8E6DF] space-y-1">
            <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider">
              Deliverable Summary
            </span>
            <h4 className="font-bold text-[#101828]">{task.title}</h4>
            <p className="text-xs text-[#475467]">
              Time invested: ~{Math.max(1, Math.round(elapsedSeconds / 60))} minutes · {task.difficulty}
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#101828]">
              Personal Reflection (1-2 sentences):
            </label>
            <textarea
              value={submissionReflection}
              onChange={(e) => setSubmissionReflection(e.target.value)}
              placeholder="e.g. Breaking down real job bullets taught me that optimistic UI is just setting client state before the API finishes. I can now speak to this with confidence in an interview."
              rows={3}
              className="w-full p-2.5 rounded-lg border border-[#E8E6DF] text-xs text-[#101828] focus:outline-none focus:ring-1 focus:ring-[#5B5BD6]"
            />
          </div>

          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#667085]">
              Compiled Output Preview:
            </span>
            <div className="p-3 bg-[#101828] text-white/90 rounded-lg font-mono text-[11px] max-h-40 overflow-y-auto whitespace-pre-wrap">
              {task.steps
                .map((st) => `[${st.title}]\n${stepResponses[st.stepNumber] || '(No notes)'}`)
                .join('\n\n')}
            </div>
          </div>
        </div>
      </Dialog>

      {/* 4. SUCCESS CELEBRATION MODAL */}
      <Dialog
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          onNavigate('tasks');
        }}
        title="Proof Artifact Verified & Saved!"
        description="“Start wherever you are. Do something useful. Build proof. Become ready.”"
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsSuccessModalOpen(false);
                onNavigate('tasks');
              }}
            >
              Browse Next Task
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setIsSuccessModalOpen(false);
                onNavigate('my-career');
              }}
              leftIcon={<ShieldCheck className="w-4 h-4" />}
            >
              View in Evidence Vault
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-left text-xs sm:text-sm">
          <div className="p-4 bg-[#E8F8F1] rounded-xl border border-[#C6EFE0] space-y-2 text-[#1B9A67]">
            <div className="flex items-center gap-2 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-[#21B47A]" />
              <span>Deliverable logged permanently</span>
            </div>
            <p className="text-xs text-[#2E4057] leading-relaxed">
              You completed this practical exercise without cutting corners. You now have verified evidence of your ability to tackle real workplace problems.
            </p>
          </div>

          <div className="p-3.5 bg-[#F8F8F5] rounded-xl border border-[#E8E6DF] space-y-1 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#667085]">
              Recorded Artifact
            </span>
            <h5 className="font-bold text-[#101828]">{task.title}</h5>
            <p className="text-[#475467]">
              Track: {task.career} · Time: {Math.max(1, Math.round(elapsedSeconds / 60))} mins
            </p>
          </div>
        </div>
      </Dialog>

      {/* Mobile-First Task Dock (Bottom) - Ensures task workspace is effortless to operate on ordinary phones */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#E8E6DF] p-2.5 px-3 flex items-center justify-between gap-2 md:hidden shadow-lg">
        <div className="flex items-center gap-1.5 min-w-0">
          <button
            type="button"
            onClick={() => setCurrentStepIdx(Math.max(0, currentStepIdx - 1))}
            disabled={currentStepIdx === 0}
            className="px-2.5 py-1.5 rounded-lg border border-[#E8E6DF] text-xs font-semibold text-[#344054] disabled:opacity-40 cursor-pointer min-h-[38px] bg-white"
          >
            Prev
          </button>
          <span className="text-xs font-bold text-[#101828] whitespace-nowrap px-1">
            Step {activeStepNum}/4
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            variant="coral"
            size="sm"
            onClick={() => {
              setTaskAIInitialQuery("I'm stuck.");
              setIsTaskAIOpen(true);
            }}
            leftIcon={<HelpCircle className="w-3.5 h-3.5" />}
            className="font-bold min-h-[38px] text-xs"
          >
            Stuck
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSaveDraft(true)}
            leftIcon={<Save className="w-3.5 h-3.5" />}
            title="Save draft"
            className="min-h-[38px] text-xs"
          >
            Save
          </Button>

          {currentStepIdx < task.steps.length - 1 ? (
            <Button
              variant="primary"
              size="sm"
              onClick={handleMarkStepComplete}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              className="min-h-[38px] text-xs"
            >
              Next
            </Button>
          ) : (
            <Button
              variant="mint"
              size="sm"
              onClick={handleOpenSubmit}
              leftIcon={<Send className="w-3.5 h-3.5" />}
              className="font-bold min-h-[38px] text-xs"
            >
              Submit
            </Button>
          )}
        </div>
      </div>

      {/* Floating AI Helper Trigger */}
      <button
        type="button"
        onClick={() => {
          setTaskAIInitialQuery(undefined);
          setIsTaskAIOpen(true);
        }}
        className="fixed bottom-16 right-3 md:bottom-6 md:right-6 z-40 bg-[#5B5BD6] hover:bg-[#4B4BC2] text-white py-2 px-3 sm:py-2.5 sm:px-4 rounded-full shadow-lg flex items-center gap-2 group transition-all cursor-pointer text-xs font-semibold"
        title="Ask CareerOS AI about this step"
      >
        <Sparkles className="w-4 h-4 text-white animate-pulse" />
        <span className="text-xs font-semibold">Ask AI: Step {activeStepNum}</span>
      </button>

      {/* Contextual CareerOS AI Help Experience */}
      <TaskAICompanion
        isOpen={isTaskAIOpen}
        onClose={() => {
          setIsTaskAIOpen(false);
          setTaskAIInitialQuery(undefined);
        }}
        context={{
          task,
          studentLevel: userProfile?.currentLevel || 'Level 1: Foundation Builder',
          selectedSkills: task.skills,
          currentStep: activeStep,
          stepNumber: activeStepNum,
          totalSteps: task.steps.length,
          stepResponses,
          currentStepDraft: currentStepResponse,
        }}
        initialQuery={taskAIInitialQuery}
        onInsertTextIntoStep={(text) => {
          const stepNum = activeStepNum;
          const existing = stepResponses[stepNum] || '';
          setStepResponses((prev) => ({
            ...prev,
            [stepNum]: existing ? `${existing}\n\n${text}` : text,
          }));
        }}
      />

      {/* Task Safety & Quality Report Modal */}
      {isReportModalOpen && (
        <ReportModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          targetType="task"
          targetId={taskId}
          targetTitle={task.title}
        />
      )}
    </div>
  );
};
