import React from 'react';
import {
  Compass,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  BookOpen,
  ShieldCheck,
  Target,
  Award,
  Users,
  Lightbulb,
  HeartHandshake,
} from 'lucide-react';
import { RouteId } from '../types/navigation';
import { UserProfile } from '../types/user';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ProgressBar, ProgressSteps } from '../components/ui/Progress';
import { Alert } from '../components/ui/ErrorState';

export interface OverviewViewProps {
  onNavigate: (route: RouteId) => void;
  onOpenQuickTask?: () => void;
  userProfile?: UserProfile;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onNavigate,
  onOpenQuickTask,
  userProfile,
}) => {
  const readinessSteps = [
    { id: '1', title: 'Start', description: 'Where you are today' },
    { id: '2', title: 'Do Useful Work', description: 'Practical small tasks' },
    { id: '3', title: 'Learn & Reflect', description: 'Real feedback loop' },
    { id: '4', title: 'Build Proof', description: 'Tangible artifacts' },
    { id: '5', title: 'Become Ready', description: 'Internships & jobs' },
  ];

  const userName = userProfile?.name || 'Jordan';
  const primaryWorry = userProfile?.primaryWorry || "I don't have experience.";
  const needRightNow = userProfile?.needRightNow || "I want to learn and gain experience first.";

  // Dynamic recommendation tailored to the user's specific worry
  const getTailoredRecommendation = () => {
    if (primaryWorry.includes("don't have experience") || primaryWorry.includes("don't know enough")) {
      return {
        title: 'Task: "Deconstruct 1 Real Job Requirement into Proof"',
        desc: 'You do not need years of past experience. Pick 1 role you like, choose a required skill, and complete a 20-minute micro-exercise to begin your evidence vault.',
        actionLabel: 'Start First Proof Task',
      };
    }
    if (primaryWorry.includes("don't know where to start") || primaryWorry.includes("not sure yet")) {
      return {
        title: 'Exploration: "The 15-Minute Curiosity & Path Audit"',
        desc: 'Uncover the work patterns you naturally gravitate toward before committing to rigid job titles.',
        actionLabel: 'Launch Path Explorer',
      };
    }
    if (primaryWorry.includes("interviews") || primaryWorry.includes("present myself")) {
      return {
        title: 'Practice: "Frame 1 Honest Project Story using STAR"',
        desc: 'Learn how to present what you built simply, honestly, and without buzzwords or imposter anxiety.',
        actionLabel: 'Practice Storytelling',
      };
    }
    return {
      title: 'Task: "Deconstruct 1 Real Job Requirement"',
      desc: 'Pick a role that sparks your curiosity. Find 1 realistic job post and translate three bullet points into actionable skills you can practice this week.',
      actionLabel: 'Start Practical Task',
    };
  };

  const recommendation = getTailoredRecommendation();

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Editorial Welcome Header */}
      <div className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E8E6DF]">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#5B5BD6]">
                Welcome, {userName}
              </span>
              <span className="text-[#98A2B3]">·</span>
              <span className="text-xs text-[#667085]">Personalized Starting Point</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#101828] leading-tight">
              &ldquo;Start wherever you are. Do something useful. Learn from it. Build proof. Become ready.&rdquo;
            </h1>
            <p className="mt-2.5 text-sm sm:text-base text-[#475467] leading-relaxed">
              You don&apos;t need everything figured out yet. We have a clear starting point tailored to your rhythm ({userProfile?.availableTime || '5-8 hours / week'}).
            </p>
          </div>

          <div className="shrink-0 flex flex-col items-start md:items-end justify-center bg-[#F8F8F5] p-4 rounded-xl border border-[#E8E6DF]">
            <span className="text-xs font-medium text-[#667085]">Your Readiness Score</span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-bold font-mono tabular-nums text-[#101828]">28</span>
              <span className="text-xs font-mono text-[#98A2B3]">/ 100</span>
            </div>
            <div className="w-36 mt-2">
              <ProgressBar value={28} color="indigo" size="sm" />
            </div>
            <span className="text-[11px] text-[#21B47A] font-medium mt-1.5 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Foundation in progress
            </span>
          </div>
        </div>

        {/* The 5-Step Journey Line */}
        <div className="pt-6">
          <p className="text-xs font-semibold text-[#667085] uppercase tracking-wider mb-4">
            Continuous Growth Journey
          </p>
          <ProgressSteps
            steps={readinessSteps}
            currentStepIndex={1}
            onStepClick={(idx) => {
              const routes: RouteId[] = ['discovery', 'skills', 'plans', 'evidence', 'opportunities'];
              onNavigate(routes[idx]);
            }}
          />
        </div>
      </div>

      {/* Focus Anchor: Tailored Next Useful Action */}
      <div className="bg-[#F0EEFF]/50 border border-[#E4E0FD] rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-xl text-left">
          <div className="flex items-center gap-2">
            <Badge variant="indigo" size="sm">Recommended Next Step</Badge>
            <span className="text-xs text-[#667085]">Addressing: &ldquo;{primaryWorry}&rdquo;</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-[#101828]">
            {recommendation.title}
          </h2>
          <p className="text-sm text-[#475467] leading-relaxed">
            {recommendation.desc}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
          <Button
            variant="primary"
            size="md"
            onClick={() => onNavigate('skills')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            {recommendation.actionLabel}
          </Button>
        </div>
      </div>

      {/* Onboarding Summary Snapshot Pill */}
      <div className="p-4 rounded-xl bg-white border border-[#E8E6DF] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2 rounded-lg bg-[#E8F8F1] text-[#21B47A] shrink-0">
            <HeartHandshake className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-[#667085]">
              Current focus: <span className="font-semibold text-[#101828]">{needRightNow}</span>
            </p>
            <p className="text-[11px] text-[#98A2B3]">
              Rhythm: {userProfile?.availableTime || 'Steady'} · Learning style: {userProfile?.preferredLearningStyle || 'Practical tasks'}
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate('onboarding')}
          className="self-start sm:self-auto text-xs"
        >
          Review Onboarding
        </Button>
      </div>

      {/* The 4 Architectural Pillars Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-[#101828]">
            CareerOS Pillars
          </h3>
          <span className="text-xs text-[#667085]">
            Modular foundation ready for future iterations
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pillar 1 */}
          <Card
            variant="interactive"
            onClick={() => onNavigate('discovery')}
            className="group"
          >
            <CardHeader className="mb-2">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-lg bg-[#F0EEFF] text-[#5B5BD6] flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <Badge variant="neutral" size="sm">Discovery</Badge>
              </div>
              <CardTitle className="text-base group-hover:text-[#5B5BD6] transition-colors mt-3">
                Career Discovery & Self-Knowledge
              </CardTitle>
              <CardDescription>
                Map your natural aptitudes, curiosity areas, and real-world career paths without pressure or guesswork.
              </CardDescription>
            </CardHeader>
            <CardFooter className="mt-2 pt-3">
              <span className="text-xs font-medium text-[#5B5BD6] group-hover:underline flex items-center gap-1">
                Explore discovery paths <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </CardFooter>
          </Card>

          {/* Pillar 2 */}
          <Card
            variant="interactive"
            onClick={() => onNavigate('skills')}
            className="group"
          >
            <CardHeader className="mb-2">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-lg bg-[#E8F8F1] text-[#21B47A] flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <Badge variant="mint" size="sm">Practice</Badge>
              </div>
              <CardTitle className="text-base group-hover:text-[#5B5BD6] transition-colors mt-3">
                Practical Tasks & Human Skills
              </CardTitle>
              <CardDescription>
                Actionable micro-tasks paired with foundational human skills: communication, critical thinking, teamwork, and self-management.
              </CardDescription>
            </CardHeader>
            <CardFooter className="mt-2 pt-3">
              <span className="text-xs font-medium text-[#5B5BD6] group-hover:underline flex items-center gap-1">
                Browse practical tasks <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </CardFooter>
          </Card>

          {/* Pillar 3 */}
          <Card
            variant="interactive"
            onClick={() => onNavigate('evidence')}
            className="group"
          >
            <CardHeader className="mb-2">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-lg bg-[#F8F8F5] text-[#101828] border border-[#E8E6DF] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <Badge variant="neutral" size="sm">Evidence</Badge>
              </div>
              <CardTitle className="text-base group-hover:text-[#5B5BD6] transition-colors mt-3">
                Career Proof & Artifacts
              </CardTitle>
              <CardDescription>
                Convert completed projects, tasks, and contributions into verifiable career proof that speaks louder than an empty resume.
              </CardDescription>
            </CardHeader>
            <CardFooter className="mt-2 pt-3">
              <span className="text-xs font-medium text-[#5B5BD6] group-hover:underline flex items-center gap-1">
                View proof repository <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </CardFooter>
          </Card>

          {/* Pillar 4 */}
          <Card
            variant="interactive"
            onClick={() => onNavigate('opportunities')}
            className="group"
          >
            <CardHeader className="mb-2">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-lg bg-[#FDF0EE] text-[#F26B5B] flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <Badge variant="coral" size="sm">Readiness</Badge>
              </div>
              <CardTitle className="text-base group-hover:text-[#5B5BD6] transition-colors mt-3">
                Opportunities & Interview Readiness
              </CardTitle>
              <CardDescription>
                Tailored interview preparation, internship applications, and continuous lifelong career trajectory management.
              </CardDescription>
            </CardHeader>
            <CardFooter className="mt-2 pt-3">
              <span className="text-xs font-medium text-[#5B5BD6] group-hover:underline flex items-center gap-1">
                Prepare for opportunities <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Motivational Principle Note */}
      <div className="p-4 rounded-xl bg-white border border-[#E8E6DF] flex items-start gap-3.5">
        <Lightbulb className="w-5 h-5 text-[#5B5BD6] shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-[#475467] leading-relaxed">
          <strong className="text-[#101828] font-semibold">Incremental Growth Architecture: </strong>
          CareerOS develops in deliberate, high-quality phases. Every component and view built here supports the upcoming discovery modules, task runners, AI feedback pipelines, and portfolio publishers.
        </div>
      </div>
    </div>
  );
};
