import React, { useState } from 'react';
import {
  ArrowRight,
  Clock,
  Gauge,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  FileCheck,
  FileText,
  Play,
  RotateCcw,
  BookOpen,
  Target,
  ShieldCheck,
  Info,
  Calendar,
  Layers,
  ChevronRight,
  Compass,
  Users,
} from 'lucide-react';
import { RouteId } from '../types/navigation';
import { UserProfile } from '../types/user';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/Progress';
import { Dialog } from '../components/ui/Dialog';
import { useToast } from '../components/ui/Toast';
import {
  generatePersonalizedRoadmap,
  logUserFeedback,
  breakDownStruggleSkill,
} from '../services/personalizationEngine';
import { PersonalizedNextStepCard } from '../components/personalization/PersonalizedNextStepCard';
import { WhyAmISeeingThisModal } from '../components/personalization/WhyAmISeeingThisModal';
import { UserFeedbackType } from '../types/personalization';
import { useTranslation } from '../context/I18nContext';

export interface HomeViewProps {
  onNavigate: (route: RouteId) => void;
  userProfile?: UserProfile;
  onOpenAICompanion?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  userProfile,
  onOpenAICompanion,
}) => {
  const { toast } = useToast();
  const { t, formatRelativeTime } = useTranslation();

  const [isWhyModalOpen, setIsWhyModalOpen] = useState(false);
  const [isTaskRunnerOpen, setIsTaskRunnerOpen] = useState(false);
  const [taskStep, setTaskStep] = useState(1);
  const [taskInput, setTaskInput] = useState('');

  // Personalization Engine integration
  const [roadmap, setRoadmap] = useState(() =>
    generatePersonalizedRoadmap(userProfile)
  );

  const refreshRoadmap = () => {
    setRoadmap(generatePersonalizedRoadmap(userProfile));
  };

  const handleFeedback = (type: UserFeedbackType, skillOrTrack?: string) => {
    if (roadmap.activeNextStep) {
      logUserFeedback(roadmap.activeNextStep.id, type, skillOrTrack);
      refreshRoadmap();
      if (type === 'enjoyed') {
        toast.success(
          'Preference Recorded',
          'Roadmap adapted: surfacing more tasks like this.'
        );
      } else if (type === 'struggled') {
        toast.info(
          'Skill Deconstructed',
          'CareerOS never says "learn more". We broke this skill into 3 micro-drills.'
        );
      } else if (type === 'avoid') {
        toast.info('Track Deprioritized', 'Removed from your top recommendations.');
      }
    }
  };

  const handleBreakDownSkill = (skill: string) => {
    breakDownStruggleSkill(skill);
    refreshRoadmap();
    toast.info(
      'Deconstructing Skill',
      `Broke ${skill} into 3 bite-sized 10-minute micro-drills.`
    );
  };

  const handleStartAction = (route: RouteId, targetId?: string) => {
    if (targetId && route === 'tasks') {
      onNavigate('tasks');
    } else {
      onNavigate(route);
    }
  };

  // User Profile Data
  const name = userProfile?.name || 'Jordan';
  const currentGoal = userProfile?.careerGoal || 'Full-Stack Software & Product Engineering';
  const currentLevel = userProfile?.currentLevel || 'Level 1: Foundation Builder';
  const availableTime = userProfile?.availableTime || '5-8 hours / week';
  const careerUrgency = userProfile?.urgency || 'Medium (Next 3-6 months)';

  // Time-aware greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('header.greeting.morning', { name }, `Good morning, ${name}.`);
    if (hour < 17) return t('header.greeting.afternoon', { name }, `Good afternoon, ${name}.`);
    return t('header.greeting.evening', { name }, `Good evening, ${name}.`);
  };

  const handleStartTask = () => {
    if (roadmap.activeNextStep) {
      handleStartAction(
        roadmap.activeNextStep.whatShouldIDoNext.actionRoute,
        roadmap.activeNextStep.whatShouldIDoNext.targetId
      );
    } else {
      onNavigate('tasks');
    }
  };

  const handleCompleteMicroTask = () => {
    setIsTaskRunnerOpen(false);
    toast.success(
      'Micro-task completed!',
      'Artifact saved to your Career Evidence Vault.'
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200 text-left">
      {/* 1. Header Greeting & Reassurance */}
      <div className="space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#101828]">
          {getGreeting()}
        </h1>
        <p className="text-sm sm:text-base text-[#475467] leading-relaxed">
          &ldquo;{t('brand.subtagline', undefined, "You don't need to do everything today. One useful step is enough.")}&rdquo;
        </p>

        {/* Profile Context Bar (current goal, current level, available time, career urgency) */}
        <div className="pt-3 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-[#667085]">
          <div className="flex items-center gap-1.5">
            <span className="text-[#98A2B3]">{t('home.goalLabel', undefined, 'Goal')}:</span>
            <span className="font-semibold text-[#101828]">{currentGoal}</span>
          </div>
          <span className="text-[#D3D0C6] hidden sm:inline" aria-hidden="true">·</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[#98A2B3]">{t('home.levelLabel', undefined, 'Level')}:</span>
            <span className="font-medium text-[#101828]">{currentLevel}</span>
          </div>
          <span className="text-[#D3D0C6] hidden sm:inline" aria-hidden="true">·</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[#98A2B3]">{t('home.timeLabel', undefined, 'Time')}:</span>
            <span className="font-medium text-[#101828]">{availableTime}</span>
          </div>
          <span className="text-[#D3D0C6] hidden sm:inline" aria-hidden="true">·</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[#98A2B3]">{t('home.urgencyLabel', undefined, 'Urgency')}:</span>
            <span className="font-medium text-[#101828]">{careerUrgency}</span>
          </div>
        </div>
      </div>

      {/* 2. THE DOMINANT FOCAL ANCHOR: "WHAT SHOULD I DO NEXT?" */}
      {/* Dynamic Personalization Engine Active Next Step */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#FAF9F5] border border-[#E8E6DF] text-xs">
          <div className="flex items-center gap-2 text-[#475467]">
            <span className="w-2 h-2 rounded-full bg-[#5B5BD6]" />
            <span>
              <strong>Personalized Roadmap:</strong> Calibrated for <em>{roadmap.urgencyCalibration}</em>
            </span>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('plans')}
            className="font-semibold text-[#5B5BD6] hover:underline flex items-center gap-1"
          >
            Inspect Continuous Signals Matrix <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <PersonalizedNextStepCard
          recommendation={roadmap.activeNextStep}
          onStartAction={handleStartAction}
          onWhyClick={() => setIsWhyModalOpen(true)}
          onFeedback={handleFeedback}
          onBreakDownSkill={handleBreakDownSkill}
          onOpenAICompanion={onOpenAICompanion}
        />
      </div>

      {/* 3. CALM SECONDARY DASHBOARD MODULES */}
      {/* Kept uncluttered and paced deliberately without card overload */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 cols): In-progress Work & Recent Logs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Continue where you stopped */}
          <Card variant="default" padding="md" className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#667085]">
                Continue where you stopped
              </span>
              <span className="text-[11px] text-[#98A2B3]">Saved 2 hours ago</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F8F8F5] border border-[#E8E6DF] flex items-center justify-between gap-4">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5B5BD6]" />
                  <h4 className="text-sm font-semibold text-[#101828] truncate">
                    Draft: 3-Sentence Project Impact Note
                  </h4>
                </div>
                <p className="text-xs text-[#667085] truncate">
                  Drafting problem statement and outcome for your portfolio repo.
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  toast.info('Resuming Draft', 'Opening project impact note workspace.');
                  onNavigate('tasks');
                }}
                leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                className="shrink-0"
              >
                Resume
              </Button>
            </div>
          </Card>

          {/* Work-Ready Area Teaser */}
          <Card variant="default" padding="md" className="space-y-3 bg-[#FAF9F5] border-[#E8E6DF]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#5B5BD6] flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                Work-Ready: Learn How Work Actually Works
              </span>
              <button
                onClick={() => onNavigate('work-ready')}
                className="text-xs font-semibold text-[#5B5BD6] hover:underline flex items-center gap-1"
              >
                All 8 Areas <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <p className="text-xs text-[#475467] leading-relaxed">
              Navigate realistic workplace dilemmas: manager updates, missed deadlines, defensive feedback, and conflicting data. No boring theory.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              {['Manager Updates', 'Missed Deadlines', 'Critical Thinking', 'Feedback EQ'].map((tag) => (
                <span
                  key={tag}
                  onClick={() => onNavigate('work-ready')}
                  className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white text-[#344054] border border-[#E8E6DF] cursor-pointer hover:border-[#5B5BD6] hover:text-[#5B5BD6] transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Card>

          {/* Recent work */}
          <Card variant="default" padding="md" className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#667085]">
                Recent Work
              </span>
              <button
                onClick={() => onNavigate('tasks')}
                className="text-xs font-medium text-[#5B5BD6] hover:underline"
              >
                View all tasks
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-[#F8F8F5] transition-colors">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#21B47A] shrink-0" />
                  <div>
                    <h5 className="text-xs font-semibold text-[#101828]">
                      Completed: Git Commit Structure Reflection
                    </h5>
                    <p className="text-[11px] text-[#98A2B3]">Completed yesterday · Proof verified</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-[#667085]">+15 Proof</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-[#F8F8F5] transition-colors border-t border-[#E8E6DF]/60">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#21B47A] shrink-0" />
                  <div>
                    <h5 className="text-xs font-semibold text-[#101828]">
                      Completed: Early Career Curiosity Audit
                    </h5>
                    <p className="text-[11px] text-[#98A2B3]">Completed 3 days ago · Core track identified</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-[#667085]">+20 Proof</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column (5 cols): Progress, Evidence & Resume */}
        <div className="lg:col-span-5 space-y-6">
          {/* Progress Overview */}
          <Card variant="default" padding="md" className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#667085]">
                Progress & Readiness
              </span>
              <span className="text-xs font-mono tabular-nums text-[#5B5BD6] font-semibold">
                Level 1 (28 / 100)
              </span>
            </div>

            <div className="space-y-1.5">
              <ProgressBar value={28} color="indigo" size="md" />
              <p className="text-[11px] text-[#667085]">
                4 micro-tasks away from reaching Level 2: Project Builder.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E8E6DF] text-center">
              <div className="p-2.5 rounded-lg bg-[#F8F8F5]">
                <span className="text-[11px] text-[#98A2B3] block">Weekly streak</span>
                <span className="text-base font-bold text-[#101828] font-mono">3 days</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#F8F8F5]">
                <span className="text-[11px] text-[#98A2B3] block">Time invested</span>
                <span className="text-base font-bold text-[#101828] font-mono">2.5 hrs</span>
              </div>
            </div>
          </Card>

          {/* Career Evidence & Resume Progress */}
          <Card variant="default" padding="md" className="space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#667085]">
                Proof & Resume
              </span>
              <button
                onClick={() => onNavigate('evidence')}
                className="text-xs font-medium text-[#5B5BD6] hover:underline"
              >
                View Evidence Timeline
              </button>
            </div>

            {/* Career evidence item */}
            <div className="p-3 rounded-lg bg-[#F8F8F5] border border-[#E8E6DF] space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#101828] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#21B47A]" />
                  Verified Evidence
                </span>
                <span className="font-mono text-[#667085]">2 Artifacts</span>
              </div>
              <p className="text-[11px] text-[#667085] leading-relaxed">
                GitHub PR audit & API specification note cataloged in your vault.
              </p>
            </div>

            {/* Resume progress */}
            <div className="p-3 rounded-lg bg-[#F8F8F5] border border-[#E8E6DF] space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#101828] flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#5B5BD6]" />
                  Resume Readiness
                </span>
                <span className="font-mono text-[#5B5BD6] font-semibold">68%</span>
              </div>
              <ProgressBar value={68} color="mint" size="sm" />
              <p className="text-[11px] text-[#667085]">
                3 proof points ready to be exported to your public resume format.
              </p>
            </div>
          </Card>

          {/* Mentors Card */}
          <Card variant="default" padding="md" className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#667085] flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#5B5BD6]" />
                Friendly Mentors
              </span>
              <button
                onClick={() => onNavigate('mentors')}
                className="text-xs font-medium text-[#5B5BD6] hover:underline"
              >
                Browse All (8)
              </button>
            </div>
            <p className="text-xs text-[#475467] leading-relaxed">
              Ask one question to alumni and senior practitioners without cold outreach anxiety.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs justify-center"
              onClick={() => onNavigate('mentors')}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Ask a Mentor One Question
            </Button>
          </Card>
        </div>
      </div>

      {/* 4. MODAL: "Why am I seeing this?" Continuous Signal Explanation */}
      {roadmap.activeNextStep && (
        <WhyAmISeeingThisModal
          isOpen={isWhyModalOpen}
          onClose={() => setIsWhyModalOpen(false)}
          recommendation={roadmap.activeNextStep}
          onStartAction={handleStartAction}
          onOpenSignalControls={() => onNavigate('plans')}
          onOpenAICompanion={onOpenAICompanion}
        />
      )}

      {/* 5. MODAL / RUNNER: "Start" Task Runner */}
      <Dialog
        isOpen={isTaskRunnerOpen}
        onClose={() => setIsTaskRunnerOpen(false)}
        title={`Task Runner · Step ${taskStep} of 3`}
        description="Deconstruct 1 Real Job Requirement into Verifiable Skills (~25 mins)"
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsTaskRunnerOpen(false)}
            >
              Save Draft & Exit
            </Button>
            {taskStep < 3 ? (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setTaskStep(taskStep + 1)}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Next Step
              </Button>
            ) : (
              <Button
                variant="mint"
                size="sm"
                onClick={handleCompleteMicroTask}
                leftIcon={<CheckCircle2 className="w-4 h-4" />}
              >
                Complete & Save to Evidence
              </Button>
            )}
          </>
        }
      >
        <div className="space-y-4 text-xs sm:text-sm text-left">
          {taskStep === 1 && (
            <div className="space-y-3">
              <p className="text-[#475467] leading-relaxed">
                <strong>Step 1: Pick 1 Real Job Requirement.</strong> Find a bullet point from any early-career role in your target track (e.g. &ldquo;Build responsive frontend interfaces with clean component architecture&rdquo;).
              </p>
              <div>
                <label className="block text-xs font-semibold text-[#101828] mb-1">
                  Paste or write the bullet point here:
                </label>
                <textarea
                  value={taskInput}
                  onChange={(e) => setTaskInput(e.target.value)}
                  placeholder="e.g. Experience building and consuming RESTful APIs, handling error states..."
                  className="w-full h-24 p-3 rounded-lg border border-[#E8E6DF] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#5B5BD6]"
                />
              </div>
            </div>
          )}

          {taskStep === 2 && (
            <div className="space-y-3">
              <p className="text-[#475467] leading-relaxed">
                <strong>Step 2: Translate into 3 micro-skills.</strong> What is the core behavior the company is actually testing for?
              </p>
              <div className="space-y-2 p-3 bg-[#F8F8F5] rounded-xl border border-[#E8E6DF] text-xs">
                <p>1. <strong>Technical grammar: </strong> Knowing the HTTP methods and payload formats.</p>
                <p>2. <strong>Resilience: </strong> Showing a graceful error banner when the network drops.</p>
                <p>3. <strong>Clear documentation: </strong> Writing down how the API works so others can test it.</p>
              </div>
            </div>
          )}

          {taskStep === 3 && (
            <div className="space-y-3">
              <p className="text-[#475467] leading-relaxed">
                <strong>Step 3: Define your proof action.</strong> What 15-minute artifact will prove you understand this?
              </p>
              <div className="p-3 bg-[#E8F8F1] rounded-xl border border-[#C6EFE0] text-xs text-[#1B9A67]">
                <strong>Your Proof Commitment: </strong> &ldquo;I will build a minimal fetch call with a retry button and screenshot the successful response in my log.&rdquo;
              </div>
            </div>
          )}
        </div>
      </Dialog>
    </div>
  );
};
