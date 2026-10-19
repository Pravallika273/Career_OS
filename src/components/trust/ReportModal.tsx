import React, { useState } from 'react';
import {
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  Flag,
  X,
  Send,
  Info,
} from 'lucide-react';
import { Dialog } from '../ui/Dialog';
import { Button } from '../ui/Button';
import { useToast } from '../ui/Toast';
import { ReportTargetType } from '../../types/trustAndSafety';
import { TrustSafetyService } from '../../services/trustSafetyService';

export interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetType: ReportTargetType;
  targetId: string;
  targetTitle: string;
}

const REASONS_BY_TYPE: Record<ReportTargetType, { value: string; label: string; description: string }[]> = {
  opportunity: [
    {
      value: 'fraudulent_company',
      label: 'Suspicious or fraudulent employer',
      description: 'The organization appears illegitimate, misrepresented, or suspect.',
    },
    {
      value: 'unverified_employer',
      label: 'Unverified employer presenting as official',
      description: 'The listing falsely claims an official corporate partnership or verified status.',
    },
    {
      value: 'misleading_compensation',
      label: 'Misleading compensation or hidden fees',
      description: 'Pay, stipend, or terms are deceptive, unpaid masquerading as paid, or asks for applicant payment.',
    },
    {
      value: 'expired_listing',
      label: 'Expired or closed opportunity',
      description: 'The application link is dead, expired, or no longer accepting submissions.',
    },
    {
      value: 'inappropriate_content',
      label: 'Inappropriate or discriminatory requirements',
      description: 'Contains offensive, discriminatory, or unlawful criteria.',
    },
    {
      value: 'other',
      label: 'Other integrity concern',
      description: 'Any other safety or trust issue with this listing.',
    },
  ],
  task: [
    {
      value: 'broken_template',
      label: 'Broken template or missing assets',
      description: 'The starter template, links, or instructions cannot be completed as described.',
    },
    {
      value: 'inaccurate_prompt',
      label: 'Inaccurate or misleading technical prompt',
      description: 'Concepts, workplace expectations, or industry claims are factually incorrect.',
    },
    {
      value: 'unrealistic_difficulty',
      label: 'Unrealistic scope or difficulty',
      description: 'Task cannot practically be completed within the stated timeframe or starter level.',
    },
    {
      value: 'offensive_content',
      label: 'Inappropriate or offensive content',
      description: 'Task includes unprofessional or unsuitable language or material.',
    },
    {
      value: 'other',
      label: 'Other task issue',
      description: 'Any other feedback or concern regarding this simulation.',
    },
  ],
  mentor: [
    {
      value: 'impersonation',
      label: 'Impersonation or fake profile',
      description: 'Mentor appears to be falsely using a person’s identity or company affiliation.',
    },
    {
      value: 'inappropriate_behavior',
      label: 'Unprofessional or inappropriate behavior',
      description: 'Responses or interactions violate respectful community guidelines.',
    },
    {
      value: 'unverified_credentials',
      label: 'Unverified or exaggerated claims',
      description: 'Career history or employer endorsements appear fabricated.',
    },
    {
      value: 'spam_or_solicitation',
      label: 'Commercial solicitation or paid service pitching',
      description: 'Mentor attempted to sell paid coaching, bootcamps, or commercial services.',
    },
    {
      value: 'other',
      label: 'Other mentor concern',
      description: 'Any other safety or conduct concern regarding this community mentor.',
    },
  ],
  ai_content: [
    {
      value: 'hallucinated_achievement',
      label: 'Fabricated achievement or credentials',
      description: 'AI invented achievements, scores, or milestones not found in my Career Evidence.',
    },
    {
      value: 'hallucinated_employer',
      label: 'Fabricated employer or nonexistent job',
      description: 'AI suggested or cited a fictional hiring company or fake position.',
    },
    {
      value: 'guaranteed_employment',
      label: 'Guaranteed employment or unrealistic placement promise',
      description: 'AI promised a job offer, hiring outcome, or guaranteed salary.',
    },
    {
      value: 'attempted_student_work',
      label: 'AI attempted to do student work instead of coaching',
      description: 'AI wrote the entire assignment/answer instead of guiding and diagnosing.',
    },
    {
      value: 'privacy_or_pii_leak',
      label: 'Privacy concern or exposed sensitive data',
      description: 'AI prompted for or reflected private personal information inappropriately.',
    },
    {
      value: 'other',
      label: 'Other AI quality issue',
      description: 'Advice was inaccurate, confusing, or contradictory.',
    },
  ],
  general_feedback: [
    {
      value: 'general_safety',
      label: 'General trust or safety issue',
      description: 'Feedback on safety guidelines or trust standards.',
    },
    {
      value: 'other',
      label: 'Other',
      description: 'General feedback.',
    },
  ],
};

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  targetType,
  targetId,
  targetTitle,
}) => {
  const { toast } = useToast();
  const reasons = REASONS_BY_TYPE[targetType] || REASONS_BY_TYPE.general_feedback;

  const [selectedReason, setSelectedReason] = useState<string>(reasons[0]?.value || 'other');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const targetTypeLabel = {
    opportunity: 'Opportunity',
    task: 'Task',
    mentor: 'Mentor Profile',
    ai_content: 'AI Response',
    general_feedback: 'Content',
  }[targetType];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReason) return;

    setIsSubmitting(true);
    try {
      await TrustSafetyService.submitReport({
        targetId,
        targetTitle,
        targetType,
        reason: selectedReason,
        details: details.trim(),
      });

      toast.success(
        'Report Submitted',
        'Thank you for helping keep CareerOS authentic, transparent, and safe. Our team reviews all reports.'
      );
      setDetails('');
      onClose();
    } catch {
      toast.error('Submission Error', 'Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={`Report ${targetTypeLabel}`}
      description="Help maintain a high standard of trust, transparency, and safety across CareerOS."
      footer={
        <div className="flex items-center justify-end gap-2 w-full">
          <Button variant="outline" size="sm" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            variant="coral"
            size="sm"
            onClick={handleSubmit}
            disabled={isSubmitting}
            leftIcon={<Flag className="w-3.5 h-3.5" />}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-left text-xs sm:text-sm">
        {/* Item context banner */}
        <div className="p-3 bg-[#F8F8F5] border border-[#E8E6DF] rounded-xl flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-[#F26B5B] shrink-0 mt-0.5" />
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#667085] block">
              Reporting:
            </span>
            <p className="font-bold text-[#101828] truncate text-xs sm:text-sm">
              {targetTitle}
            </p>
          </div>
        </div>

        {/* Reason Selector */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-[#101828]">
            Select Primary Reason <span className="text-[#F26B5B]">*</span>
          </label>
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {reasons.map((r) => (
              <label
                key={r.value}
                className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                  selectedReason === r.value
                    ? 'border-[#5B5BD6] bg-[#F0EEFF]/50 ring-1 ring-[#5B5BD6]'
                    : 'border-[#E8E6DF] bg-white hover:bg-[#F8F8F5]'
                }`}
              >
                <input
                  type="radio"
                  name="reportReason"
                  value={r.value}
                  checked={selectedReason === r.value}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  className="mt-0.5 text-[#5B5BD6] focus:ring-[#5B5BD6]"
                />
                <div className="min-w-0">
                  <span className="font-semibold text-[#101828] block">
                    {r.label}
                  </span>
                  <p className="text-[11px] text-[#667085] mt-0.5">
                    {r.description}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Additional Context Field */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-[#101828]">
            Additional context or evidence (optional)
          </label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Describe what you observed (e.g. broken external link, misleading claim, inappropriate message)..."
            rows={3}
            className="w-full p-3 rounded-xl border border-[#E8E6DF] bg-white text-xs sm:text-sm text-[#101828] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#5B5BD6]"
          />
        </div>

        {/* CareerOS Safety Assurance */}
        <div className="p-3 bg-[#E8F8F1] rounded-xl border border-[#C6EFE0] text-[11px] text-[#1B9A67] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#21B47A] shrink-0" />
          <span>
            Reports are confidential and handled with care to protect students and truthful creators.
          </span>
        </div>
      </form>
    </Dialog>
  );
};
