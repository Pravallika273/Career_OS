import React, { useState } from 'react';
import {
  Bookmark,
  BookmarkCheck,
  MessageCircleQuestion,
  CalendarDays,
  Clock,
  Sparkles,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Flag,
} from 'lucide-react';
import { MentorProfile } from '../../types/mentors';
import { ARCHETYPE_CONFIG } from '../../services/mentorsService';
import { ReportModal } from '../trust/ReportModal';

export interface MentorCardProps {
  mentor: MentorProfile;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onAskQuestion: (mentor: MentorProfile) => void;
  onRequestGuidance: (mentor: MentorProfile) => void;
  onViewDetails?: (mentor: MentorProfile) => void;
}

export const MentorCard: React.FC<MentorCardProps> = ({
  mentor,
  isSaved,
  onToggleSave,
  onAskQuestion,
  onRequestGuidance,
}) => {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const archetypeInfo = ARCHETYPE_CONFIG[mentor.archetype];

  return (
    <>
      <div className="bg-white border border-[#E8E6DF] rounded-2xl p-6 transition-all hover:border-[#D0CFC8] hover:shadow-xs flex flex-col justify-between">
        <div>
          {/* Header: Identity, Archetype & Save Bookmark */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-start gap-3.5">
              {/* Avatar Initials */}
              <div
                className={`w-12 h-12 rounded-xl ${mentor.avatarBg} text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0`}
              >
                {mentor.initials}
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-bold text-[#101828] leading-tight">
                    {mentor.name}
                  </h3>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-md font-medium border ${archetypeInfo.badgeClass}`}
                  >
                    {archetypeInfo.label}
                  </span>
                </div>
                <p className="text-xs text-[#475467] font-medium mt-0.5">
                  {mentor.role}{mentor.company ? ` at ${mentor.company}` : ` · ${mentor.industry}`}
                </p>
                <div className="flex items-center gap-2 text-xs text-[#667085] mt-1">
                  <span>{mentor.industry}</span>
                  <span aria-hidden="true">·</span>
                  <span>{mentor.experience} exp</span>
                  {mentor.location && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#98A2B3]" />
                        {mentor.location}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Top Right: Report & Bookmark Actions */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setIsReportOpen(true)}
                title="Report mentor conduct or false claims"
                aria-label={`Report mentor ${mentor.name}`}
                className="p-2 rounded-lg border border-[#E8E6DF] bg-white text-[#98A2B3] hover:text-[#C93B2B] hover:bg-[#FFF2F0] transition-colors cursor-pointer"
              >
                <Flag className="w-4 h-4" />
              </button>

              <button
                onClick={() => onToggleSave(mentor.id)}
                aria-label={isSaved ? 'Remove from saved mentors' : 'Save mentor to favorites'}
                className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                  isSaved
                    ? 'bg-amber-50 border-amber-200 text-amber-700'
                    : 'bg-white border-[#E8E6DF] text-[#667085] hover:text-[#101828] hover:bg-[#F9F8F6]'
                }`}
              >
                {isSaved ? (
                  <BookmarkCheck className="w-4 h-4 fill-amber-500 text-amber-600" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Short Introduction */}
          <p className="text-xs text-[#475467] leading-relaxed line-clamp-3 mb-4">
            “{mentor.shortIntroduction}”
          </p>

          {/* Topics / Focus Areas */}
          <div className="mb-4">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#98A2B3] mb-1.5">
              Mentoring Topics
            </div>
            <div className="flex flex-wrap gap-1.5">
              {mentor.topics.map((topic, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-[#F4F3EF] text-[#344054] px-2.5 py-1 rounded-md"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Availability & Human Identity Guarantee */}
          <div className="flex items-center justify-between gap-1.5 text-xs text-[#475467] bg-[#FAF9F5] border border-[#EFECE6] rounded-lg px-3 py-2 mb-4">
            <div className="flex items-center gap-1.5 truncate">
              <Clock className="w-3.5 h-3.5 text-[#5B5BD6] shrink-0" />
              <span className="truncate">{mentor.availability}</span>
            </div>
            <span className="text-[10px] font-semibold text-[#1B9A67] bg-[#E8F8F1] px-1.5 py-0.5 rounded shrink-0">
              Verified Human Mentor
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-[#F2F0E8] flex items-center gap-2">
          <button
            onClick={() => onAskQuestion(mentor)}
            className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg bg-[#5B5BD6] text-white hover:bg-[#4949C0] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <MessageCircleQuestion className="w-3.5 h-3.5" />
            Ask One Question
          </button>
          <button
            onClick={() => onRequestGuidance(mentor)}
            className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg bg-white border border-[#D0CFC8] text-[#344054] hover:bg-[#F9F8F6] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <CalendarDays className="w-3.5 h-3.5" />
            Request Guidance
          </button>
        </div>
      </div>

      {isReportOpen && (
        <ReportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          targetType="mentor"
          targetId={mentor.id}
          targetTitle={`${mentor.name} (${mentor.role}${mentor.company ? ` at ${mentor.company}` : ` · ${mentor.industry}`})`}
        />
      )}
    </>
  );
};
