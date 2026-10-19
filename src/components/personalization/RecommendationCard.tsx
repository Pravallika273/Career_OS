import React, { useState } from 'react';
import {
  Sparkles,
  Play,
  Clock,
  Layers,
  HelpCircle,
  CheckCircle2,
  ThumbsUp,
  Scissors,
  EyeOff,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  FileCheck,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import {
  PersonalizedRecommendation,
  UserFeedbackType,
} from '../../types/personalization';
import { RouteId } from '../../types/navigation';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export interface RecommendationCardProps {
  recommendation: PersonalizedRecommendation;
  isDominantAnchor?: boolean;
  onNavigate: (route: RouteId, targetId?: string) => void;
  onFeedback: (
    recommendationId: string,
    type: UserFeedbackType,
    skillOrTrack?: string,
    note?: string
  ) => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  isDominantAnchor = false,
  onNavigate,
  onFeedback,
}) => {
  const [isWhyExpanded, setIsWhyExpanded] = useState(isDominantAnchor);
  const [feedbackSent, setFeedbackSent] = useState<string | null>(null);

  const { whatShouldIDoNext, whyAmISeeingThis } = recommendation;

  const handleAction = () => {
    onNavigate(whatShouldIDoNext.actionRoute, whatShouldIDoNext.targetId);
  };

  const handleSendFeedback = (type: UserFeedbackType, label: string) => {
    onFeedback(recommendation.id, type, recommendation.category);
    setFeedbackSent(label);
    setTimeout(() => setFeedbackSent(null), 3000);
  };

  const difficultyVariant =
    recommendation.difficulty === 'Starter'
      ? 'mint'
      : recommendation.difficulty === 'Beginner'
      ? 'indigo'
      : recommendation.difficulty === 'Intermediate'
      ? 'neutral'
      : 'coral';

  return (
    <div
      className={`rounded-2xl bg-white border transition-all text-left overflow-hidden ${
        isDominantAnchor
          ? 'border-2 border-[#5B5BD6]/40 shadow-sm p-6 sm:p-7 hover:border-[#5B5BD6]/60'
          : 'border-[#E8E6DF] p-5 hover:border-[#D0CFC8] shadow-xs'
      }`}
    >
      {/* 1. Header Badges & Category */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant={difficultyVariant} size="sm">
            {recommendation.difficulty}
          </Badge>

          <span className="text-xs px-2.5 py-0.5 rounded-md bg-[#FAF9F5] text-[#344054] border border-[#E8E6DF] font-medium">
            {recommendation.category}
          </span>

          {recommendation.isDeconstructedSkill && (
            <span className="text-xs px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-semibold flex items-center gap-1">
              <Scissors className="w-3 h-3 text-amber-600" />
              <span>Step {recommendation.breakdownStepNumber || 1} of {recommendation.totalBreakdownSteps || 3} (Bite-Sized Breakdown)</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#475467] font-medium font-mono">
          <Clock className="w-3.5 h-3.5 text-[#5B5BD6]" />
          <span>{whatShouldIDoNext.timeEstimate}</span>
        </div>
      </div>

      {/* 2. Title */}
      <h3
        className={`font-bold tracking-tight text-[#101828] mb-2 ${
          isDominantAnchor ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'
        }`}
      >
        {recommendation.title}
      </h3>

      {/* 3. SECTION A: "WHAT SHOULD I DO NEXT?" */}
      <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#EFECE6] mb-4 space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#101828]">
          <Play className="w-3.5 h-3.5 text-[#5B5BD6] fill-[#5B5BD6]" />
          <span>What Should I Do Next?</span>
        </div>

        <p className="text-xs sm:text-sm text-[#344054] leading-relaxed">
          {whatShouldIDoNext.description}
        </p>

        {whatShouldIDoNext.deliverableOutput && (
          <div className="pt-2 border-t border-[#EFECE6] flex items-start gap-2 text-xs text-[#21B47A]">
            <FileCheck className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="text-[#101828]">
              <strong>Expected Output:</strong> {whatShouldIDoNext.deliverableOutput}
            </span>
          </div>
        )}
      </div>

      {/* 4. SECTION B: "WHY AM I SEEING THIS?" (Transparent Adaptive Rationale) */}
      <div className="rounded-xl border border-[#E8E6DF] overflow-hidden mb-5">
        <button
          type="button"
          onClick={() => setIsWhyExpanded(!isWhyExpanded)}
          className="w-full p-3 bg-[#FCFCFA] hover:bg-[#F8F8F5] transition-colors flex items-center justify-between text-xs font-semibold text-[#475467] cursor-pointer"
        >
          <span className="flex items-center gap-1.5 text-[#5B5BD6]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Why am I seeing this?</span>
          </span>
          <span className="text-[11px] text-[#98A2B3] flex items-center gap-1">
            <span>{isWhyExpanded ? 'Hide reason' : 'Show adaptive reason'}</span>
            {isWhyExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </span>
        </button>

        {isWhyExpanded && (
          <div className="p-4 bg-white border-t border-[#E8E6DF] text-xs space-y-3 animate-in fade-in duration-150">
            <div>
              <span className="font-bold text-[#101828] block mb-0.5">Primary Adaptive Reason:</span>
              <p className="text-[#475467] leading-relaxed">{whyAmISeeingThis.primaryReason}</p>
            </div>

            {whyAmISeeingThis.signalsCited.length > 0 && (
              <div>
                <span className="font-bold text-[#101828] block mb-1">Your Continuous Signals Cited:</span>
                <ul className="list-disc pl-4 space-y-1 text-[#475467]">
                  {whyAmISeeingThis.signalsCited.map((sig, idx) => (
                    <li key={idx}>{sig}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="p-2.5 rounded-lg bg-[#EEEDFC]/60 border border-[#DDD9FA] text-[11px] text-[#5B5BD6]">
              <strong>Adaptive Action: </strong>
              {whyAmISeeingThis.adaptiveActionTaken}
            </div>
          </div>
        )}
      </div>

      {/* 5. Primary CTA and Adaptive Feedback Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#F2F0E8]">
        <Button
          variant="primary"
          size={isDominantAnchor ? 'md' : 'sm'}
          onClick={handleAction}
          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          className="font-semibold shadow-xs cursor-pointer"
        >
          {whatShouldIDoNext.actionLabel || 'Start Now'}
        </Button>

        {/* Behavioral Tuning Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-[11px]">
          {feedbackSent ? (
            <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 font-medium">
              ✓ {feedbackSent}
            </span>
          ) : (
            <>
              <span className="text-[#98A2B3] text-[10px] uppercase font-bold tracking-wider mr-1">
                Tune:
              </span>
              <button
                type="button"
                onClick={() => handleSendFeedback('enjoyed', 'Prioritizing more like this')}
                title="I enjoy this kind of work"
                className="px-2 py-1 rounded-md border border-[#E8E6DF] bg-white text-[#475467] hover:bg-[#F9F8F6] hover:text-[#101828] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <ThumbsUp className="w-3 h-3 text-[#5B5BD6]" />
                <span>Enjoyed</span>
              </button>

              <button
                type="button"
                onClick={() => handleSendFeedback('struggled', 'Breaking down into micro-steps')}
                title="Break this skill into smaller tasks"
                className="px-2 py-1 rounded-md border border-[#E8E6DF] bg-white text-[#475467] hover:bg-[#F9F8F6] hover:text-[#101828] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Scissors className="w-3 h-3 text-amber-600" />
                <span>Break down</span>
              </button>

              <button
                type="button"
                onClick={() => handleSendFeedback('avoid', 'Deprioritizing this track')}
                title="Not interested in this direction"
                className="px-2 py-1 rounded-md border border-[#E8E6DF] bg-white text-[#475467] hover:bg-[#F9F8F6] hover:text-[#101828] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <EyeOff className="w-3 h-3 text-[#98A2B3]" />
                <span>Avoid</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
