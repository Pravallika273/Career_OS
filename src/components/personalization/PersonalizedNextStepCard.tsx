import React, { useState } from 'react';
import {
  Sparkles,
  HelpCircle,
  Play,
  Clock,
  CheckCircle2,
  ThumbsUp,
  AlertTriangle,
  EyeOff,
  Layers,
  ArrowRight,
  Info,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { PersonalizedRecommendation, UserFeedbackType } from '../../types/personalization';
import { RouteId } from '../../types/navigation';

export interface PersonalizedNextStepCardProps {
  recommendation: PersonalizedRecommendation;
  onStartAction: (route: RouteId, targetId?: string) => void;
  onWhyClick: () => void;
  onFeedback: (type: UserFeedbackType, skillOrTrack?: string) => void;
  onBreakDownSkill?: (skill: string) => void;
  onOpenAICompanion?: () => void;
  compact?: boolean;
}

export const PersonalizedNextStepCard: React.FC<PersonalizedNextStepCardProps> = ({
  recommendation,
  onStartAction,
  onWhyClick,
  onFeedback,
  onBreakDownSkill,
  onOpenAICompanion,
  compact = false,
}) => {
  const [isWhyExpanded, setIsWhyExpanded] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState<UserFeedbackType | null>(null);

  const { whatShouldIDoNext, whyAmISeeingThis } = recommendation;

  const handleFeedback = (type: UserFeedbackType) => {
    setFeedbackGiven(type);
    onFeedback(type, recommendation.category);
    if (type === 'struggled' && onBreakDownSkill && recommendation.parentStruggleSkill) {
      onBreakDownSkill(recommendation.parentStruggleSkill);
    }
  };

  return (
    <div className="relative rounded-2xl bg-white border-2 border-[#5B5BD6]/30 shadow-sm p-6 sm:p-8 overflow-hidden transition-all hover:border-[#5B5BD6]/50 text-left">
      {/* Top Header Badge & Tracking info */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#5B5BD6] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#5B5BD6]">
            What Should I Do Next?
          </span>
          <span className="text-[#98A2B3]">·</span>
          <span className="text-xs text-[#667085] font-medium">
            {recommendation.category}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {recommendation.isDeconstructedSkill ? (
            <Badge variant="coral" size="sm">
              ⚡ Deconstructed Micro-Drill (Step {recommendation.breakdownStepNumber || 1} of {recommendation.totalBreakdownSteps || 3})
            </Badge>
          ) : (
            <Badge variant="mint" size="sm" dot>
              Personalized Next Step
            </Badge>
          )}
        </div>
      </div>

      {/* Deconstructed alert banner if skill was broken down */}
      {recommendation.isDeconstructedSkill && (
        <div className="mb-4 p-3.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E] flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">CareerOS Adaptation Notice: </span>
            You flagged difficulty with {recommendation.parentStruggleSkill || 'this technical skill'}. Rather than saying &ldquo;learn more&rdquo;, the system decomposed this into 3 isolated 10-minute micro-drills. This is Step {recommendation.breakdownStepNumber || 1}.
          </div>
        </div>
      )}

      {/* Action Title (What Should I Do Next?) */}
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#101828] mb-3">
        {whatShouldIDoNext.title}
      </h2>

      {/* Action Description */}
      <p className="text-sm sm:text-base text-[#475467] leading-relaxed max-w-3xl mb-4">
        {whatShouldIDoNext.description}
      </p>

      {/* Deliverable & Metadata Bar */}
      <div className="flex flex-wrap items-center gap-y-2 gap-x-6 py-3 border-y border-[#E8E6DF] text-xs text-[#475467] mb-5">
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-[#5B5BD6]" />
          <span className="font-semibold text-[#101828]">{whatShouldIDoNext.timeEstimate}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-[#21B47A]" />
          <span className="text-[#667085]">Deliverable: </span>
          <span className="font-medium text-[#101828] truncate max-w-md">{whatShouldIDoNext.deliverableOutput}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-[#667085]" />
          <span className="text-[#667085]">Difficulty: </span>
          <span className="font-medium text-[#101828]">{recommendation.difficulty}</span>
        </div>
      </div>

      {/* Dominant Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="primary"
            size="lg"
            onClick={() => onStartAction(whatShouldIDoNext.actionRoute, whatShouldIDoNext.targetId)}
            leftIcon={<Play className="w-4 h-4 fill-current" />}
            className="px-6 py-2.5 font-semibold shadow-xs"
          >
            {whatShouldIDoNext.actionLabel}
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={onWhyClick}
            leftIcon={<HelpCircle className="w-4 h-4 text-[#5B5BD6]" />}
            className="font-medium"
          >
            Why am I seeing this?
          </Button>

          {onOpenAICompanion && (
            <button
              type="button"
              onClick={onOpenAICompanion}
              className="text-xs text-[#5B5BD6] hover:underline font-medium ml-2 hidden sm:inline-flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask CareerOS AI</span>
            </button>
          )}
        </div>

        {/* Live Continuous Feedback Toggles */}
        <div className="flex items-center gap-1 text-xs text-[#667085]">
          <span className="text-[11px] text-[#98A2B3] mr-1 hidden sm:inline">Adapt my path:</span>
          <button
            type="button"
            onClick={() => handleFeedback('enjoyed')}
            title="I enjoyed this: recommend more like this"
            className={`p-1.5 rounded-lg border transition-colors flex items-center gap-1 text-[11px] ${
              feedbackGiven === 'enjoyed'
                ? 'bg-[#E8F8F1] border-[#21B47A] text-[#1B9A67] font-semibold'
                : 'bg-white border-[#E8E6DF] hover:border-[#21B47A] text-[#475467]'
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Enjoyed</span>
          </button>

          <button
            type="button"
            onClick={() => handleFeedback('struggled')}
            title="Too difficult: break into smaller tasks"
            className={`p-1.5 rounded-lg border transition-colors flex items-center gap-1 text-[11px] ${
              feedbackGiven === 'struggled'
                ? 'bg-[#FFFBEB] border-[#D97706] text-[#B45309] font-semibold'
                : 'bg-white border-[#E8E6DF] hover:border-[#D97706] text-[#475467]'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Break Down</span>
          </button>

          <button
            type="button"
            onClick={() => handleFeedback('avoid')}
            title="Avoid this topic"
            className={`p-1.5 rounded-lg border transition-colors flex items-center gap-1 text-[11px] ${
              feedbackGiven === 'avoid'
                ? 'bg-[#FEE4E2] border-[#F04438] text-[#D92D20] font-semibold'
                : 'bg-white border-[#E8E6DF] hover:border-[#F04438] text-[#475467]'
            }`}
          >
            <EyeOff className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Avoid</span>
          </button>
        </div>
      </div>

      {/* Inline Quick "Why am I seeing this?" expander */}
      <div className="mt-4 pt-4 border-t border-[#F2F1EA]">
        <button
          type="button"
          onClick={() => setIsWhyExpanded(!isWhyExpanded)}
          className="flex items-center justify-between w-full text-xs text-[#667085] hover:text-[#101828] font-medium"
        >
          <span className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#5B5BD6]" />
            <span>Why am I seeing this? — {whyAmISeeingThis.primaryReason}</span>
          </span>
          {isWhyExpanded ? (
            <ChevronUp className="w-4 h-4 text-[#98A2B3]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#98A2B3]" />
          )}
        </button>

        {isWhyExpanded && (
          <div className="mt-3 p-4 rounded-xl bg-[#F8F8F5] border border-[#E8E6DF] space-y-3 text-xs animate-in fade-in duration-150">
            <div>
              <span className="font-semibold text-[#101828] block mb-1">
                Continuous Signals Cited:
              </span>
              <ul className="space-y-1 list-none pl-0">
                {whyAmISeeingThis.signalsCited.map((sig, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-[#475467]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5B5BD6] shrink-0" />
                    <span>{sig}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-[#E8E6DF] text-[#101828]">
              <span className="font-semibold text-[#5B5BD6]">Adaptive Action Taken: </span>
              <span className="text-[#475467]">{whyAmISeeingThis.adaptiveActionTaken}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
