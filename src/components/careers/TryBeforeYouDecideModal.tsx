import React, { useState } from 'react';
import {
  Sparkles,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  Heart,
  ThumbsUp,
  Meh,
  ThumbsDown,
  Flame,
  Shuffle,
  ShieldCheck,
  X,
} from 'lucide-react';
import { CareerRole, ActivityFeeling, ActivityFeedback } from '../../types/careers';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { useToast } from '../ui/Toast';

export interface TryBeforeYouDecideModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: CareerRole | null;
  onFeedbackSaved?: (feedback: ActivityFeedback) => void;
  onTryAnotherArea?: () => void;
}

export const TryBeforeYouDecideModal: React.FC<TryBeforeYouDecideModalProps> = ({
  isOpen,
  onClose,
  role,
  onFeedbackSaved,
  onTryAnotherArea,
}) => {
  const { toast } = useToast();
  const [selectedChoiceIdx, setSelectedChoiceIdx] = useState<number | null>(null);
  const [hasSubmittedAnswer, setHasSubmittedAnswer] = useState(false);
  const [step, setStep] = useState<'activity' | 'feedback' | 'summary'>('activity');
  const [selectedFeeling, setSelectedFeeling] = useState<ActivityFeeling | null>(null);
  const [userReflectionNote, setUserReflectionNote] = useState('');

  if (!isOpen || !role) return null;

  const activity = role.tryActivity;

  const feelingsList: { feeling: ActivityFeeling; icon: React.ReactNode; color: string }[] = [
    { feeling: 'I enjoyed it.', icon: <ThumbsUp className="w-4 h-4 text-[#21B47A]" />, color: 'hover:border-[#21B47A]' },
    { feeling: 'It was okay.', icon: <Meh className="w-4 h-4 text-[#5B5BD6]" />, color: 'hover:border-[#5B5BD6]' },
    { feeling: "I didn't enjoy it.", icon: <ThumbsDown className="w-4 h-4 text-[#F26B5B]" />, color: 'hover:border-[#F26B5B]' },
    { feeling: 'I want something harder.', icon: <Flame className="w-4 h-4 text-[#E68A00]" />, color: 'hover:border-[#E68A00]' },
    { feeling: 'I want to try another area.', icon: <Shuffle className="w-4 h-4 text-[#667085]" />, color: 'hover:border-[#667085]' },
  ];

  const handleAnswerSubmit = () => {
    if (selectedChoiceIdx === null) return;
    setHasSubmittedAnswer(true);
  };

  const handleProceedToFeedback = () => {
    setStep('feedback');
  };

  const handleSaveFeedback = () => {
    if (!selectedFeeling) return;

    const feedbackItem: ActivityFeedback = {
      id: `fb-${Date.now()}`,
      roleId: role.id,
      roleTitle: role.title,
      categoryName: role.categoryId,
      activityTitle: activity.title,
      feeling: selectedFeeling,
      completedAt: new Date().toISOString(),
      notes: userReflectionNote.trim() || undefined,
    };

    // Save to localStorage for future personalization
    try {
      const existing = JSON.parse(localStorage.getItem('careeros_career_feedback') || '[]');
      existing.unshift(feedbackItem);
      localStorage.setItem('careeros_career_feedback', JSON.stringify(existing));
    } catch {}

    onFeedbackSaved?.(feedbackItem);
    toast.success('Reflection recorded', 'Saved for your future career personalization.');

    if (selectedFeeling === 'I want to try another area.') {
      onClose();
      onTryAnotherArea?.();
    } else {
      setStep('summary');
    }
  };

  const handleResetAndClose = () => {
    setSelectedChoiceIdx(null);
    setHasSubmittedAnswer(false);
    setStep('activity');
    setSelectedFeeling(null);
    setUserReflectionNote('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-3 sm:p-4 text-left">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#101828]/45 backdrop-blur-xs transition-opacity"
        onClick={handleResetAndClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-[#E8E6DF] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-[#E8E6DF] bg-[#F8F8F5]/80 flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#5B5BD6] uppercase tracking-wider">
                Try Before You Decide
              </span>
              <span className="text-[#98A2B3]">·</span>
              <span className="text-xs text-[#667085]">{role.title}</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#101828]">
              {activity.title}
            </h3>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-lg text-[#98A2B3] hover:text-[#101828] hover:bg-[#E8E6DF] transition-colors"
            aria-label="Close activity"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Reassurance Banner: Zero Commitment */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#F0EEFF]/50 border-b border-[#E4E0FD] flex items-center justify-between gap-3 text-xs text-[#475467]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#5B5BD6] shrink-0" />
            <span>
              <strong className="text-[#101828] font-semibold">Zero commitment: </strong>
              Trying this field is safe experimentation. You are never locked into any choice.
            </span>
          </div>
          <span className="hidden sm:inline-flex text-[11px] font-mono text-[#667085] shrink-0">
            ~{activity.timeEstimate}
          </span>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {step === 'activity' && (
            <div className="space-y-5">
              {/* Scenario */}
              <div className="p-4 rounded-xl bg-[#F8F8F5] border border-[#E8E6DF] space-y-1.5">
                <span className="text-[11px] font-semibold text-[#667085] uppercase tracking-wider">
                  The Real-World Scenario
                </span>
                <p className="text-sm text-[#101828] leading-relaxed">
                  {activity.scenario}
                </p>
              </div>

              {/* Challenge Question */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-[#101828]">
                  {activity.interactiveChallenge.question}
                </h4>

                <div className="space-y-2.5">
                  {activity.interactiveChallenge.choices.map((choice, idx) => {
                    const isSelected = selectedChoiceIdx === idx;
                    const showResult = hasSubmittedAnswer;

                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          if (!hasSubmittedAnswer) setSelectedChoiceIdx(idx);
                        }}
                        className={`p-3.5 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#5B5BD6] bg-[#F0EEFF]/40 ring-1 ring-[#5B5BD6]'
                            : 'border-[#E8E6DF] hover:border-[#D3D0C6] bg-white'
                        } ${showResult && choice.isRecommended ? 'border-[#21B47A] bg-[#E8F8F1]/40' : ''}`}
                      >
                        <div className="flex items-start gap-2.5">
                          <div
                            className={`w-4 h-4 rounded-full border mt-0.5 shrink-0 flex items-center justify-center text-[10px] ${
                              isSelected
                                ? 'border-[#5B5BD6] bg-[#5B5BD6] text-white'
                                : 'border-[#D3D0C6]'
                            }`}
                          >
                            {isSelected && '✓'}
                          </div>
                          <div className="space-y-1 flex-1">
                            <p className="font-medium text-[#101828] leading-snug">
                              {choice.text}
                            </p>
                            {showResult && isSelected && (
                              <p className="text-xs text-[#475467] pt-1 leading-relaxed border-t border-[#E8E6DF]/60 mt-2">
                                <strong className="text-[#101828] font-semibold">Insight: </strong>
                                {choice.rationale}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP: How did this feel? */}
          {step === 'feedback' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#5B5BD6] uppercase tracking-wider">
                  Honest Self-Reflection
                </span>
                <h4 className="text-lg font-bold text-[#101828]">
                  How did this feel?
                </h4>
                <p className="text-xs text-[#667085] leading-relaxed">
                  Your feedback helps CareerOS understand what energizes you versus what drains you. There are no right or wrong reactions.
                </p>
              </div>

              {/* Exact 5 Required Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {feelingsList.map((item) => {
                  const isSelected = selectedFeeling === item.feeling;

                  return (
                    <button
                      key={item.feeling}
                      type="button"
                      onClick={() => setSelectedFeeling(item.feeling)}
                      className={`p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all text-left flex items-center justify-between ${
                        isSelected
                          ? 'border-[#5B5BD6] bg-[#F0EEFF]/60 text-[#101828] font-semibold ring-1 ring-[#5B5BD6]'
                          : `border-[#E8E6DF] bg-white text-[#475467] hover:bg-[#F8F8F5] ${item.color}`
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {item.icon}
                        <span>{item.feeling}</span>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-[#5B5BD6] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Optional brief reflection note */}
              <div className="space-y-1.5 pt-2">
                <label className="block text-xs font-semibold text-[#101828]">
                  Any quick notes on why you felt this way? (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Liked solving the logic, but wanted more visual design..."
                  value={userReflectionNote}
                  onChange={(e) => setUserReflectionNote(e.target.value)}
                  className="w-full bg-[#F8F8F5] border border-[#E8E6DF] rounded-lg p-2.5 text-xs text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#5B5BD6]"
                />
              </div>
            </div>
          )}

          {/* STEP: Summary & Confirmation */}
          {step === 'summary' && (
            <div className="space-y-4 text-center py-4 animate-in fade-in duration-150">
              <div className="w-12 h-12 mx-auto rounded-xl bg-[#E8F8F1] text-[#21B47A] flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-[#101828]">
                Exploration Recorded
              </h4>
              <p className="text-xs sm:text-sm text-[#475467] max-w-md mx-auto leading-relaxed">
                You experienced a real slice of <strong>{role.title}</strong> and marked: &ldquo;{selectedFeeling}&rdquo;. This has been added to your discovery history to calibrate future recommendations.
              </p>
              <div className="p-3 bg-[#F8F8F5] border border-[#E8E6DF] rounded-xl text-xs text-[#667085] max-w-sm mx-auto">
                Remember: Trying different careers is how you eliminate guesswork. Try as many as you like!
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:px-6 border-t border-[#E8E6DF] bg-white flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetAndClose}
          >
            {step === 'summary' ? 'Done' : 'Exit Activity'}
          </Button>

          {step === 'activity' && (
            <>
              {!hasSubmittedAnswer ? (
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleAnswerSubmit}
                  disabled={selectedChoiceIdx === null}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Submit Answer
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleProceedToFeedback}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Rate How It Felt
                </Button>
              )}
            </>
          )}

          {step === 'feedback' && (
            <Button
              variant="primary"
              size="md"
              onClick={handleSaveFeedback}
              disabled={!selectedFeeling}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Save Reflection
            </Button>
          )}

          {step === 'summary' && (
            <Button
              variant="primary"
              size="md"
              onClick={handleResetAndClose}
            >
              Explore More Careers
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
