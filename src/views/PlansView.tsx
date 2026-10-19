import React, { useState, useEffect } from 'react';
import {
  GitBranch,
  Sparkles,
  ArrowRight,
  Clock,
  Compass,
  Flame,
  CheckCircle2,
  Sliders,
  AlertTriangle,
  Play,
  RotateCcw,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { RouteId } from '../types/navigation';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useToast } from '../components/ui/Toast';
import {
  PersonalizedRoadmap,
  PersonalizedRecommendation,
  UserFeedbackType,
} from '../types/personalization';
import {
  generatePersonalizedRoadmap,
  getBehavioralProfile,
  logUserFeedback,
  breakDownStruggleSkill,
} from '../services/personalizationEngine';
import { PersonalizedNextStepCard } from '../components/personalization/PersonalizedNextStepCard';
import { WhyAmISeeingThisModal } from '../components/personalization/WhyAmISeeingThisModal';
import { ContinuousSignalsPanel } from '../components/personalization/ContinuousSignalsPanel';

export interface PlansViewProps {
  onNavigate: (route: RouteId) => void;
  onActionClick?: () => void;
  onOpenAICompanion?: () => void;
}

export const PlansView: React.FC<PlansViewProps> = ({
  onNavigate,
  onActionClick,
  onOpenAICompanion,
}) => {
  const { toast } = useToast();
  const [roadmap, setRoadmap] = useState<PersonalizedRoadmap>(() =>
    generatePersonalizedRoadmap()
  );
  const [behavioralProfile, setBehavioralProfile] = useState(() =>
    getBehavioralProfile()
  );
  const [selectedWhyRecommendation, setSelectedWhyRecommendation] =
    useState<PersonalizedRecommendation | null>(null);
  const [showSignalsPanel, setShowSignalsPanel] = useState(false);

  const refreshRoadmap = () => {
    const updated = generatePersonalizedRoadmap();
    setRoadmap(updated);
    setBehavioralProfile(getBehavioralProfile());
  };

  useEffect(() => {
    refreshRoadmap();
  }, []);

  const handleFeedback = (type: UserFeedbackType, skillOrTrack?: string) => {
    if (roadmap.activeNextStep) {
      logUserFeedback(roadmap.activeNextStep.id, type, skillOrTrack);
      refreshRoadmap();

      if (type === 'enjoyed') {
        toast.success(
          'Preference Saved',
          'Roadmap adapted: we will prioritize more activities in this track.'
        );
      } else if (type === 'struggled') {
        toast.info(
          'Skill Deconstructed',
          'CareerOS never says "learn more". We broke this skill into 3 micro-drills.'
        );
      } else if (type === 'avoid') {
        toast.info(
          'Track Adjusted',
          'Topic deprioritized from your active recommendations.'
        );
      }
    }
  };

  const handleBreakDownSkill = (skill: string) => {
    breakDownStruggleSkill(skill);
    refreshRoadmap();
    toast.info(
      'Deconstructing Skill',
      `Broke ${skill} into 3 bite-sized 10-minute micro-exercises.`
    );
  };

  const handleStartAction = (route: RouteId, targetId?: string) => {
    onNavigate(route);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200 text-left">
      {/* 1. Header Banner & Calibration Status */}
      <div className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Badge variant="indigo" size="sm">
                <GitBranch className="w-3 h-3 mr-1 inline" />
                Adaptive Career Roadmap
              </Badge>
              <Badge
                variant={
                  roadmap.urgencyCalibration === 'Job Readiness Sprint'
                    ? 'indigo'
                    : roadmap.urgencyCalibration === 'Exploratory Experimentation Track'
                    ? 'mint'
                    : 'neutral'
                }
                size="sm"
              >
                {roadmap.urgencyCalibration === 'Job Readiness Sprint' && (
                  <Flame className="w-3 h-3 mr-1 inline text-[#5B5BD6]" />
                )}
                {roadmap.urgencyCalibration === 'Exploratory Experimentation Track' && (
                  <Compass className="w-3 h-3 mr-1 inline text-[#21B47A]" />
                )}
                {roadmap.urgencyCalibration}
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#101828]">
              {roadmap.currentMilestoneTitle}
            </h1>
            <p className="text-sm text-[#475467] max-w-2xl leading-relaxed">
              &ldquo;{roadmap.urgencyRationale}. No two learners follow the same fixed roadmap.&rdquo;
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSignalsPanel(!showSignalsPanel)}
              leftIcon={<Sliders className="w-4 h-4 text-[#5B5BD6]" />}
            >
              {showSignalsPanel ? 'Hide Signal Matrix' : 'Continuous Signals Matrix'}
            </Button>
            {onOpenAICompanion && (
              <Button
                variant="primary"
                size="sm"
                onClick={onOpenAICompanion}
                leftIcon={<Sparkles className="w-4 h-4" />}
              >
                Plan with AI
              </Button>
            )}
          </div>
        </div>

        {/* Adaptive Signals Bar */}
        <div className="mt-5 pt-4 border-t border-[#E8E6DF] flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-[#667085]">
          <div className="flex items-center gap-1.5">
            <span className="text-[#98A2B3]">Top Affinities:</span>
            <span className="font-semibold text-[#101828]">
              {roadmap.adaptiveSignalsSummary.topAffinities.join(', ') || 'Research & Analysis'}
            </span>
          </div>
          <span className="text-[#D3D0C6] hidden sm:inline">·</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[#98A2B3]">Deconstructed Skills:</span>
            <span className="font-semibold text-[#D97706]">
              {roadmap.adaptiveSignalsSummary.deconstructedSkills.length > 0
                ? `${roadmap.adaptiveSignalsSummary.deconstructedSkills.length} active`
                : 'None currently'}
            </span>
          </div>
          <span className="text-[#D3D0C6] hidden sm:inline">·</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[#98A2B3]">Demonstrated Proofs:</span>
            <span className="font-semibold text-[#21B47A]">
              {roadmap.completedStepsCount} verified in Vault
            </span>
          </div>
        </div>
      </div>

      {/* 2. Optional: Continuous Signals Drawer / Panel */}
      {showSignalsPanel && (
        <ContinuousSignalsPanel
          signals={roadmap.continuousSignals}
          behavioralProfile={behavioralProfile}
          onSignalsUpdated={refreshRoadmap}
        />
      )}

      {/* 3. THE DOMINANT FOCAL ANCHOR: "WHAT SHOULD I DO NEXT?" */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#667085]">
            Primary Focus For You Right Now
          </h2>
          <span className="text-xs text-[#5B5BD6] font-medium">
            Dynamically chosen from 9 continuous signals
          </span>
        </div>

        <PersonalizedNextStepCard
          recommendation={roadmap.activeNextStep}
          onStartAction={handleStartAction}
          onWhyClick={() => setSelectedWhyRecommendation(roadmap.activeNextStep)}
          onFeedback={handleFeedback}
          onBreakDownSkill={handleBreakDownSkill}
          onOpenAICompanion={onOpenAICompanion}
        />
      </div>

      {/* 4. UPCOMING MILESTONE QUEUE (Continuously Re-ranked) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-base font-bold text-[#101828]">
              Upcoming Adaptive Steps
            </h3>
            <p className="text-xs text-[#667085]">
              These will dynamically re-order as you complete work, provide feedback, or change timelines.
            </p>
          </div>
          <Badge variant="indigo" size="sm">
            {roadmap.upcomingSteps.length} Adaptive Actions Queued
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roadmap.upcomingSteps.map((step, idx) => (
            <Card
              key={step.id}
              variant="default"
              padding="md"
              className="space-y-3 hover:border-[#5B5BD6]/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[#5B5BD6]">Step {idx + 2}</span>
                    <span className="text-[#98A2B3]">·</span>
                    <span className="text-[#667085]">{step.category}</span>
                  </div>
                  {step.isDeconstructedSkill ? (
                    <Badge variant="coral" size="sm">Micro-Drill</Badge>
                  ) : (
                    <Badge variant="mint" size="sm">{step.difficulty}</Badge>
                  )}
                </div>

                <h4 className="text-sm font-bold text-[#101828] leading-snug">
                  {step.whatShouldIDoNext.title}
                </h4>

                <p className="text-xs text-[#475467] line-clamp-2 leading-relaxed">
                  {step.whatShouldIDoNext.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8E6DF] space-y-2">
                {/* Why am I seeing this preview */}
                <div className="text-[11px] text-[#667085] flex items-start gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-[#5B5BD6] shrink-0 mt-0.5" />
                  <span className="line-clamp-1 italic">
                    Why: {step.whyAmISeeingThis.primaryReason}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setSelectedWhyRecommendation(step)}
                    className="text-xs text-[#5B5BD6] hover:underline font-medium"
                  >
                    Why am I seeing this?
                  </button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleStartAction(
                        step.whatShouldIDoNext.actionRoute,
                        step.whatShouldIDoNext.targetId
                      )
                    }
                    rightIcon={<ArrowRight className="w-3 h-3" />}
                  >
                    Preview
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 5. Continuous Signals Matrix (always accessible at the bottom if not opened in drawer) */}
      {!showSignalsPanel && (
        <div className="p-6 rounded-2xl bg-[#F8F8F5] border border-[#E8E6DF] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-xs">
            <h4 className="font-bold text-[#101828] text-sm">
              Want to see how your roadmap adapts in real-time?
            </h4>
            <p className="text-[#667085]">
              Inspect all 9 live signals (what you say, choose, enjoy, avoid, complete, struggle, perform, demonstrate, pursue) or simulate learner scenarios.
            </p>
          </div>
          <Button
            variant="outline"
            size="md"
            onClick={() => setShowSignalsPanel(true)}
            leftIcon={<Sliders className="w-4 h-4 text-[#5B5BD6]" />}
          >
            Open Continuous Signals Matrix
          </Button>
        </div>
      )}

      {/* 6. Why Am I Seeing This Modal */}
      {selectedWhyRecommendation && (
        <WhyAmISeeingThisModal
          isOpen={!!selectedWhyRecommendation}
          onClose={() => setSelectedWhyRecommendation(null)}
          recommendation={selectedWhyRecommendation}
          onStartAction={handleStartAction}
          onOpenSignalControls={() => setShowSignalsPanel(true)}
          onOpenAICompanion={onOpenAICompanion}
        />
      )}
    </div>
  );
};
