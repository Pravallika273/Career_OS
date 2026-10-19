import React from 'react';
import {
  Calendar,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  FileText,
  Briefcase,
  Share2,
  Code,
  Mic,
  Tag,
  CheckCircle2,
  MessageSquare,
  Award,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { EvidenceItem, EvidenceCategory, ActionExportType } from '../../types/evidence';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export interface CareerTimelineProps {
  items: EvidenceItem[];
  onTriggerAction: (item: EvidenceItem, action: ActionExportType) => void;
  onFilterByCategory?: (category: EvidenceCategory | 'all') => void;
  activeCategory?: EvidenceCategory | 'all';
}

const CATEGORY_COLORS: Record<EvidenceCategory, { bg: string; text: string; badge: 'indigo' | 'mint' | 'coral' | 'neutral' }> = {
  tasks: { bg: 'bg-[#5B5BD6]', text: 'text-[#5B5BD6]', badge: 'indigo' },
  projects: { bg: 'bg-[#21B47A]', text: 'text-[#21B47A]', badge: 'mint' },
  challenges: { bg: 'bg-[#F26B5B]', text: 'text-[#F26B5B]', badge: 'coral' },
  practice: { bg: 'bg-[#4B4BC2]', text: 'text-[#4B4BC2]', badge: 'indigo' },
  teamwork: { bg: 'bg-[#0E9384]', text: 'text-[#0E9384]', badge: 'mint' },
  communication: { bg: 'bg-[#7A5AF8]', text: 'text-[#7A5AF8]', badge: 'indigo' },
  leadership: { bg: 'bg-[#D97706]', text: 'text-[#D97706]', badge: 'coral' },
  mentor_feedback: { bg: 'bg-[#12B76A]', text: 'text-[#12B76A]', badge: 'mint' },
  interview_practice: { bg: 'bg-[#6172F3]', text: 'text-[#6172F3]', badge: 'indigo' },
  certifications: { bg: 'bg-[#2E90FA]', text: 'text-[#2E90FA]', badge: 'neutral' },
  other: { bg: 'bg-[#667085]', text: 'text-[#667085]', badge: 'neutral' },
};

const CATEGORY_LABELS: Record<EvidenceCategory, string> = {
  tasks: 'Task Deliverable',
  projects: 'Project Build',
  challenges: 'Challenge Solution',
  practice: 'Practice Drill',
  teamwork: 'Teamwork',
  communication: 'Communication',
  leadership: 'Leadership Activity',
  mentor_feedback: 'Mentor Feedback',
  interview_practice: 'Interview Practice',
  certifications: 'Certification',
  other: 'Verified Experience',
};

export const CareerTimeline: React.FC<CareerTimelineProps> = ({
  items,
  onTriggerAction,
}) => {
  // Sort items descending by date
  const sortedItems = [...items].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (sortedItems.length === 0) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-[#E8E6DF] space-y-2">
        <p className="text-sm font-semibold text-[#101828]">No evidence items found for this filter.</p>
        <p className="text-xs text-[#667085]">Record a task, project, or activity to populate your timeline.</p>
      </div>
    );
  }

  return (
    <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#E8E6DF]">
      {sortedItems.map((item, idx) => {
        const catConfig = CATEGORY_COLORS[item.category] || CATEGORY_COLORS.other;
        const catLabel = CATEGORY_LABELS[item.category] || 'Evidence';

        return (
          <div key={item.id} className="relative group text-left">
            {/* Timeline node icon */}
            <div
              className={`absolute -left-6 sm:-left-8 top-1.5 w-4 sm:w-5 h-4 sm:h-5 rounded-full border-2 border-white ring-2 ring-[#E8E6DF] ${catConfig.bg} group-hover:scale-110 transition-transform`}
            />

            {/* Evidence Card */}
            <div className="bg-white border border-[#E8E6DF] rounded-2xl p-5 sm:p-6 shadow-xs hover:border-[#5B5BD6]/40 transition-all space-y-4">
              {/* Header: Category Badge, Date, Verification Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E8E6DF]/60 pb-3">
                <div className="flex items-center gap-2">
                  <Badge variant={catConfig.badge} size="sm">
                    {catLabel}
                  </Badge>
                  <span className="text-xs font-mono text-[#667085] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </span>
                  {item.timeSpent && (
                    <span className="text-[11px] text-[#98A2B3]">
                      · {item.timeSpent}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {item.verificationBadge && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#21B47A] bg-[#E8F8F1] px-2 py-0.5 rounded-full border border-[#C6EFE0]">
                      <ShieldCheck className="w-3 h-3" />
                      {item.verificationBadge}
                    </span>
                  )}
                  {item.evidenceLink && (
                    <a
                      href={item.evidenceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#5B5BD6] font-semibold hover:underline"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Artifact</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Activity Heading */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#101828] leading-snug">
                  {item.activity}
                </h3>
              </div>

              {/* Skills practiced */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#98A2B3]">
                  Skills Practiced:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.skillsPracticed.map((sk, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-[#F8F8F5] text-[#344054] border border-[#E8E6DF]"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tangible Output & Deliverable */}
              <div className="space-y-1 bg-[#F8F8F5]/70 p-3.5 rounded-xl border border-[#E8E6DF]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#21B47A] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#21B47A]" />
                  Verifiable Output:
                </span>
                <p className="text-xs sm:text-sm text-[#101828] font-medium leading-relaxed">
                  {item.output}
                </p>
              </div>

              {/* Student Reflection */}
              <div className="space-y-1 bg-[#F0EEFF]/40 p-3.5 rounded-xl border border-[#E4E0FD]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5B5BD6]">
                  Student Reflection & Key Takeaway:
                </span>
                <p className="text-xs text-[#475467] leading-relaxed italic">
                  &ldquo;{item.reflection}&rdquo;
                </p>
              </div>

              {/* Optional Feedback */}
              {item.feedback && (
                <div className="space-y-1 bg-[#E8F8F1]/40 p-3.5 rounded-xl border border-[#C6EFE0]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B9A67] flex items-center gap-1">
                    <MessageSquare className="w-3 h-3 text-[#1B9A67]" />
                    Evaluator / Mentor Feedback:
                  </span>
                  <p className="text-xs text-[#2E4057] leading-relaxed">
                    {item.feedback}
                  </p>
                </div>
              )}

              {/* Action Toolbar: 5 Key Real-World Actions */}
              <div className="pt-3 border-t border-[#E8E6DF] flex flex-wrap items-center justify-between gap-2.5">
                <span className="text-xs font-semibold text-[#667085] hidden sm:inline">
                  Take Genuine Action:
                </span>

                <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => onTriggerAction(item, 'resume')}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#F8F8F5] text-[#344054] hover:bg-[#F0EEFF] hover:text-[#5B5BD6] border border-[#E8E6DF] flex items-center gap-1 transition-all"
                    title="Add to Resume as high-impact bullet"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Add to Resume</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onTriggerAction(item, 'portfolio')}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#F8F8F5] text-[#344054] hover:bg-[#F0EEFF] hover:text-[#5B5BD6] border border-[#E8E6DF] flex items-center gap-1 transition-all"
                    title="Add to Portfolio as case study snippet"
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Add to Portfolio</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onTriggerAction(item, 'linkedin')}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#F8F8F5] text-[#344054] hover:bg-[#F0EEFF] hover:text-[#5B5BD6] border border-[#E8E6DF] flex items-center gap-1 transition-all"
                    title="Draft authentic LinkedIn post"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>LinkedIn Post</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onTriggerAction(item, 'github')}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#F8F8F5] text-[#344054] hover:bg-[#F0EEFF] hover:text-[#5B5BD6] border border-[#E8E6DF] flex items-center gap-1 transition-all"
                    title="Prepare GitHub README section"
                  >
                    <Code className="w-3.5 h-3.5" />
                    <span>GitHub README</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onTriggerAction(item, 'interview')}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#F8F8F5] text-[#344054] hover:bg-[#F0EEFF] hover:text-[#5B5BD6] border border-[#E8E6DF] flex items-center gap-1 transition-all"
                    title="Prepare STAR method interview response"
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>In Interview</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
