import React from 'react';
import {
  HelpCircle,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sliders,
  AlertTriangle,
  Compass,
  Layers,
} from 'lucide-react';
import { Dialog } from '../ui/Dialog';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { PersonalizedRecommendation } from '../../types/personalization';
import { RouteId } from '../../types/navigation';

export interface WhyAmISeeingThisModalProps {
  isOpen: boolean;
  onClose: () => void;
  recommendation: PersonalizedRecommendation;
  onStartAction: (route: RouteId, targetId?: string) => void;
  onOpenSignalControls?: () => void;
  onOpenAICompanion?: () => void;
}

export const WhyAmISeeingThisModal: React.FC<WhyAmISeeingThisModalProps> = ({
  isOpen,
  onClose,
  recommendation,
  onStartAction,
  onOpenSignalControls,
  onOpenAICompanion,
}) => {
  const { whatShouldIDoNext, whyAmISeeingThis } = recommendation;

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Why Am I Seeing This Recommendation?"
      description="CareerOS Personalization Engine · Continuous Learner Adaptation Rationale"
      maxWidth="lg"
      footer={
        <div className="flex flex-wrap items-center justify-between w-full gap-3">
          <div className="flex items-center gap-2">
            {onOpenSignalControls && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onClose();
                  onOpenSignalControls();
                }}
                leftIcon={<Sliders className="w-3.5 h-3.5 text-[#5B5BD6]" />}
              >
                Inspect Continuous Signals
              </Button>
            )}
            {onOpenAICompanion && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onClose();
                  onOpenAICompanion();
                }}
                leftIcon={<Sparkles className="w-3.5 h-3.5 text-[#5B5BD6]" />}
              >
                Ask CareerOS AI
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                onClose();
                onStartAction(whatShouldIDoNext.actionRoute, whatShouldIDoNext.targetId);
              }}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Start This Action
            </Button>
          </div>
        </div>
      }
    >
      <div className="space-y-5 text-left text-xs sm:text-sm">
        {/* Recommended Action Summary Box */}
        <div className="p-4 rounded-xl bg-[#F0EEFF]/60 border border-[#E4E0FD] space-y-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5B5BD6]">
                What Should I Do Next?
              </span>
              <span className="text-[#98A2B3]">·</span>
              <span className="text-xs text-[#667085]">{whatShouldIDoNext.timeEstimate}</span>
            </div>
            {recommendation.isDeconstructedSkill && (
              <Badge variant="coral" size="sm">
                Deconstructed Skill
              </Badge>
            )}
          </div>
          <h3 className="text-base font-bold text-[#101828]">
            {whatShouldIDoNext.title}
          </h3>
          <p className="text-xs text-[#475467] leading-relaxed">
            {whatShouldIDoNext.description}
          </p>
        </div>

        {/* Primary Transparent Reason */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#667085]">
            <HelpCircle className="w-4 h-4 text-[#5B5BD6]" />
            <span>Primary Decision Rationale</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-[#E8E6DF] text-[#101828] font-medium leading-relaxed">
            &ldquo;{whyAmISeeingThis.primaryReason}&rdquo;
          </div>
        </div>

        {/* Real Continuous Signals Cited */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#101828]">
            <span>Continuous Signals Cited from Your History:</span>
            <span className="text-[11px] text-[#667085] font-normal">Real User Context</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#F8F8F5] border border-[#E8E6DF] space-y-2">
            {whyAmISeeingThis.signalsCited.map((signal, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-[#475467]">
                <CheckCircle2 className="w-4 h-4 text-[#21B47A] shrink-0 mt-0.5" />
                <span>{signal}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Exact Adaptive Action Taken */}
        <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#E8E6DF] space-y-1 text-xs">
          <div className="font-semibold text-[#5B5BD6] flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            <span>How CareerOS Adapted Your Path:</span>
          </div>
          <p className="text-[#344054] leading-relaxed">
            {whyAmISeeingThis.adaptiveActionTaken}
          </p>
        </div>

        {/* Core Product Promise Notice */}
        <div className="p-3 rounded-lg bg-white border border-[#E8E6DF] text-[11px] text-[#667085] leading-relaxed">
          <strong>The CareerOS Personalization Guarantee: </strong>
          No two learners follow the exact same roadmap. If you enjoy research, we amplify investigative tasks. If you struggle with technical tasks, we never say &ldquo;learn more&rdquo; — we deconstruct the skill into bite-sized micro-drills.
        </div>
      </div>
    </Dialog>
  );
};
