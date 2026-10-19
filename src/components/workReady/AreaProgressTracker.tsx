import React from 'react';
import {
  MessageSquare,
  Users,
  ShieldCheck,
  Brain,
  HeartHandshake,
  Clock,
  Compass,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Award,
} from 'lucide-react';
import {
  WorkReadyArea,
  AreaProgressSummary,
} from '../../types/workReady';
import { WORK_READY_AREAS_META } from '../../services/workReadyCatalog';
import { Badge } from '../ui/Badge';

export interface AreaProgressTrackerProps {
  progressList: AreaProgressSummary[];
  selectedArea: WorkReadyArea | 'all';
  onSelectArea: (area: WorkReadyArea | 'all') => void;
}

const ICON_MAP: Record<WorkReadyArea, React.FC<{ className?: string }>> = {
  communication: MessageSquare,
  teamwork: Users,
  professionalism: ShieldCheck,
  critical_thinking: Brain,
  emotional_intelligence: HeartHandshake,
  self_management: Clock,
  leadership: Compass,
  lifelong_learning: Sparkles,
};

export const AreaProgressTracker: React.FC<AreaProgressTrackerProps> = ({
  progressList,
  selectedArea,
  onSelectArea,
}) => {
  const totalCompleted = progressList.reduce((acc, p) => acc + p.completedScenarios, 0);
  const totalScenarios = progressList.reduce((acc, p) => acc + p.totalScenarios, 0);

  return (
    <div className="bg-white rounded-xl border border-[#E8E6DF] p-6 shadow-xs mb-8">
      {/* Header with Competence Philosophy */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#E8E6DF]">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-[#101828] tracking-tight">
              Workplace Judgment & Maturity Tracking
            </h3>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#F2F4F7] text-[#344054]">
              {totalCompleted} of {totalScenarios} Scenarios Resolved
            </span>
          </div>
          <p className="text-xs text-[#667085] mt-1 max-w-2xl leading-relaxed">
            Professional maturity is not a video game score. We track the real dilemmas you have analyzed, the trade-offs you navigated, and the practical judgment principles you have internalized.
          </p>
        </div>

        {/* Filter All Pill */}
        <button
          onClick={() => onSelectArea('all')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all shrink-0 ${
            selectedArea === 'all'
              ? 'bg-[#101828] text-white border-[#101828]'
              : 'bg-white text-[#344054] border-[#D0D5DD] hover:bg-[#F9FAFB]'
          }`}
        >
          View All 8 Areas
        </button>
      </div>

      {/* Grid of 8 Practical Development Areas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-5">
        {progressList.map((summary) => {
          const meta = WORK_READY_AREAS_META[summary.area];
          const Icon = ICON_MAP[summary.area] || Compass;
          const isSelected = selectedArea === summary.area;

          // Color & stage styling
          let stageBadgeColor = 'bg-[#F2F4F7] text-[#475467] border-[#E4E7EC]';
          if (summary.depthStage === 'Developing Judgment') {
            stageBadgeColor = 'bg-[#EFF8FF] text-[#175CD3] border-[#B2DDFF]';
          } else if (summary.depthStage === 'Pragmatic & Grounded') {
            stageBadgeColor = 'bg-[#F9F5FF] text-[#6941C6] border-[#E9D7FE]';
          } else if (summary.depthStage === 'Seasoned Judgment') {
            stageBadgeColor = 'bg-[#ECFDF3] text-[#027A48] border-[#A6F4C5]';
          }

          return (
            <div
              key={summary.area}
              onClick={() => onSelectArea(isSelected ? 'all' : summary.area)}
              className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-150 flex flex-col justify-between ${
                isSelected
                  ? 'border-[#5B5BD6] bg-[#F9F9FE] ring-1 ring-[#5B5BD6] shadow-xs'
                  : 'border-[#E8E6DF] bg-white hover:border-[#D0D5DD] hover:bg-[#FAFAFB]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF9F5] border border-[#E8E6DF] flex items-center justify-center text-[#5B5BD6]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${stageBadgeColor}`}
                  >
                    {summary.depthStage}
                  </span>
                </div>

                <div className="font-bold text-sm text-[#101828]">
                  {meta.label}
                </div>
                <div className="text-xs text-[#667085] line-clamp-1 mt-0.5">
                  {meta.tagline}
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#F2F4F7] flex items-center justify-between text-xs text-[#475467]">
                <span>
                  <strong>{summary.completedScenarios}</strong> / {summary.totalScenarios} resolved
                </span>
                {summary.completedScenarios > 0 && (
                  <span className="flex items-center gap-1 text-[#027A48] font-medium text-[11px]">
                    <CheckCircle2 className="w-3 h-3" /> Practiced
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
