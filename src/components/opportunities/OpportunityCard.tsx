import React, { useState } from 'react';
import {
  ShieldCheck,
  MapPin,
  Clock,
  Sparkles,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Briefcase,
  PlayCircle,
  HelpCircle,
  Target,
  AlertTriangle,
  Flag,
} from 'lucide-react';
import { Opportunity } from '../../types/opportunities';
import { NATURE_LABELS } from '../../services/opportunitiesService';
import { Button } from '../ui/Button';
import { ReportModal } from '../trust/ReportModal';

export interface OpportunityCardProps {
  opportunity: Opportunity;
  isSaved: boolean;
  onSaveToApplications: (opp: Opportunity) => void;
  onPerformAction: (opp: Opportunity) => void;
  onNavigateToApplications: () => void;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  isSaved,
  onSaveToApplications,
  onPerformAction,
  onNavigateToApplications,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const natureMeta = NATURE_LABELS[opportunity.nature];
  const isRealRole = opportunity.nature === 'real_job' || opportunity.nature === 'real_internship';

  return (
    <>
      <div className="bg-white border border-[#E8E6DF] rounded-xl hover:border-[#D0D5DD] transition-all duration-150 p-5 sm:p-6 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Top Header: Standardized Badging & Verified Employer Status */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {/* Primary Category Badge */}
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-md ${
                  isRealRole
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : opportunity.nature === 'community_project'
                    ? 'bg-teal-50 text-teal-800 border border-teal-200'
                    : opportunity.nature === 'company_challenge'
                    ? 'bg-amber-50 text-amber-800 border border-amber-200'
                    : 'bg-purple-50 text-purple-800 border border-purple-200'
                }`}
              >
                {natureMeta.label}
              </span>

              {/* Strict Employer Verification Rule: Real employers MUST be verified */}
              {isRealRole ? (
                opportunity.organizationVerified ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50/70 px-2 py-0.5 rounded border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Employer
                  </span>
                ) : (
                  <span
                    title="Employer verification is pending. Proceed with standard career caution."
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-300"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    Unverified (Employer Verification Pending)
                  </span>
                )
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  Practice Simulation
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {opportunity.compensation && (
                <span className="text-xs font-medium text-[#344054]">
                  {opportunity.compensation}
                </span>
              )}

              {/* Report Opportunity Trigger */}
              <button
                type="button"
                onClick={() => setIsReportOpen(true)}
                title="Report misleading, unverified, or expired opportunity"
                className="p-1 text-[#98A2B3] hover:text-[#C93B2B] hover:bg-[#FFF2F0] rounded-md transition-colors cursor-pointer"
                aria-label={`Report opportunity: ${opportunity.title}`}
              >
                <Flag className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Title & Organization */}
          <div>
            <h3 className="text-lg font-bold text-[#101828] leading-snug">
              {opportunity.title}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-[#475467]">
              <span className="font-semibold text-[#344054]">
                {opportunity.organization}
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="inline-flex items-center gap-1 text-xs text-[#667085]">
                <MapPin className="w-3.5 h-3.5" />
                {opportunity.location}
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-xs text-[#667085]">
                Exp: {opportunity.experience}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-[#475467] leading-relaxed line-clamp-3">
            {opportunity.description}
          </p>

          {/* Why it may fit - Highlight Card */}
          <div className="p-3.5 rounded-lg bg-[#F8F9FC] border border-[#E0E7FF]/70 space-y-2">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4338CA]">
                <Sparkles className="w-3.5 h-3.5 text-[#5B5BD6]" />
                <span>Why it may fit you</span>
              </div>
              {opportunity.matchScore && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-white text-[#4338CA] border border-[#C7D2FE]">
                  {opportunity.matchScore}% Match
                </span>
              )}
            </div>
            <p className="text-xs text-[#374151] leading-relaxed">
              {opportunity.whyItMayFit}
            </p>

            {opportunity.matchHighlights && opportunity.matchHighlights.length > 0 && (
              <div className="pt-1 flex flex-wrap gap-2 text-[11px] text-[#4B5563]">
                {opportunity.matchHighlights.map((hl, i) => (
                  <span key={i} className="inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#21B47A]" />
                    {hl}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Skills List */}
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] mb-1.5">
              Key Skills & Technologies
            </div>
            <div className="flex flex-wrap gap-1.5">
              {opportunity.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-2.5 py-0.5 rounded bg-[#F2F4F7] text-[#344054] border border-[#EAECF0]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Collapsible details for full view */}
          {isExpanded && (
            <div className="pt-3 border-t border-[#F2F4F7] space-y-3 text-xs text-[#475467]">
              <div>
                <span className="font-semibold text-[#101828]">About this role type: </span>
                {natureMeta.description}
              </div>
              {opportunity.deadline && (
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Application Deadline: <strong>{opportunity.deadline}</strong></span>
                </div>
              )}
              {opportunity.missingSkills && opportunity.missingSkills.length > 0 && (
                <div>
                  <span className="font-semibold text-[#101828]">Skills to strengthen: </span>
                  <span className="text-slate-600">{opportunity.missingSkills.join(', ')}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="mt-5 pt-4 border-t border-[#F2F4F7] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-medium text-[#667085] hover:text-[#101828] inline-flex items-center gap-1"
          >
            {isExpanded ? (
              <>
                Less details <ChevronUp className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                More details & timeline <ChevronDown className="w-3.5 h-3.5" />
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            {isSaved ? (
              <button
                onClick={onNavigateToApplications}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
              >
                <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" />
                In Pipeline
              </button>
            ) : (
              <button
                onClick={() => onSaveToApplications(opportunity)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-white text-[#344054] border border-[#D0D5DD] hover:bg-[#F9FAFB] transition-colors"
              >
                <Bookmark className="w-3.5 h-3.5" />
                Track in Pipeline
              </button>
            )}

            <Button
              variant="primary"
              size="sm"
              onClick={() => onPerformAction(opportunity)}
              leftIcon={
                opportunity.action.type === 'start_simulation' ? (
                  <PlayCircle className="w-4 h-4" />
                ) : opportunity.action.type === 'external_apply' ? (
                  <ExternalLink className="w-4 h-4" />
                ) : (
                  <Target className="w-4 h-4" />
                )
              }
            >
              {opportunity.action.label}
            </Button>
          </div>
        </div>
      </div>

      {/* Report Opportunity Dialog */}
      {isReportOpen && (
        <ReportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          targetType="opportunity"
          targetId={opportunity.id}
          targetTitle={`${opportunity.title} at ${opportunity.organization}`}
        />
      )}
    </>
  );
};
