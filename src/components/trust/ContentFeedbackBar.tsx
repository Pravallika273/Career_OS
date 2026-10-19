import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Flag, Sparkles, Check } from 'lucide-react';
import { TrustSafetyService } from '../../services/trustSafetyService';
import { useToast } from '../ui/Toast';
import { ReportModal } from './ReportModal';

export interface ContentFeedbackBarProps {
  messageId?: string;
  contextSnippet?: string;
  className?: string;
  showDisclaimer?: boolean;
}

export const ContentFeedbackBar: React.FC<ContentFeedbackBarProps> = ({
  messageId,
  contextSnippet,
  className = '',
  showDisclaimer = true,
}) => {
  const { toast } = useToast();
  const [feedbackGiven, setFeedbackGiven] = useState<'up' | 'down' | null>(null);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const handleFeedback = async (isHelpful: boolean) => {
    setFeedbackGiven(isHelpful ? 'up' : 'down');
    await TrustSafetyService.submitContentFeedback({
      targetId: messageId,
      contextSnippet: contextSnippet ? contextSnippet.slice(0, 200) : undefined,
      isHelpful,
    });
    toast.info(
      isHelpful ? 'Feedback Recorded' : 'Feedback Noted',
      isHelpful
        ? 'Glad this guidance was clear and useful.'
        : 'Thank you. We use this to prevent hallucinations and improve guidance.'
    );
  };

  return (
    <>
      <div
        className={`flex flex-wrap items-center justify-between gap-2 pt-2 mt-2 border-t border-[#F2F0E8] text-[11px] text-[#667085] ${className}`}
      >
        {/* Left: AI Transparency Badge */}
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#F0EEFF] text-[#5B5BD6] font-semibold text-[10px] shrink-0 border border-[#E4E0FD]">
            <Sparkles className="w-2.5 h-2.5" />
            AI-generated
          </span>
          {showDisclaimer && (
            <span className="text-[10px] text-[#98A2B3] truncate hidden sm:inline">
              Coaching only · Never guarantees employment
            </span>
          )}
        </div>

        {/* Right: Thumbs & Report Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          {feedbackGiven ? (
            <span className="inline-flex items-center gap-1 text-[10px] text-[#1B9A67] font-medium">
              <Check className="w-3 h-3 text-[#21B47A]" />
              Feedback noted
            </span>
          ) : (
            <>
              <button
                type="button"
                onClick={() => handleFeedback(true)}
                title="Helpful guidance"
                className="p-1 rounded text-[#98A2B3] hover:text-[#21B47A] hover:bg-[#E8F8F1] transition-colors cursor-pointer"
                aria-label="Mark AI response as helpful"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleFeedback(false)}
                title="Unhelpful or inaccurate"
                className="p-1 rounded text-[#98A2B3] hover:text-[#F26B5B] hover:bg-[#FFF2F0] transition-colors cursor-pointer"
                aria-label="Mark AI response as unhelpful"
              >
                <ThumbsDown className="w-3.5 h-3.5" />
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => setIsReportOpen(true)}
            title="Report inaccurate, hallucinated, or inappropriate AI content"
            className="p-1 rounded text-[#98A2B3] hover:text-[#C93B2B] hover:bg-[#FFF2F0] transition-colors cursor-pointer ml-1"
            aria-label="Report AI response"
          >
            <Flag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {isReportOpen && (
        <ReportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          targetType="ai_content"
          targetId={messageId || 'ai-message'}
          targetTitle={contextSnippet ? `AI response: "${contextSnippet.slice(0, 50)}..."` : 'AI Output'}
        />
      )}
    </>
  );
};
