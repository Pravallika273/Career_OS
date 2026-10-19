import React, { useState } from 'react';
import {
  X,
  CalendarDays,
  Sparkles,
  CheckCircle2,
  FileCheck,
  Clock,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { MentorProfile, MentorCategory, GuidanceRequestRecord } from '../../types/mentors';
import { MENTOR_CATEGORIES_CONFIG, submitGuidanceRequest } from '../../services/mentorsService';

export interface RequestGuidanceModalProps {
  mentor: MentorProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestSubmitted?: (record: GuidanceRequestRecord) => void;
}

export const RequestGuidanceModal: React.FC<RequestGuidanceModalProps> = ({
  mentor,
  isOpen,
  onClose,
  onRequestSubmitted,
}) => {
  if (!isOpen || !mentor) return null;

  const [category, setCategory] = useState<MentorCategory>(
    mentor.categories[0] || 'career_guidance'
  );
  const [goal, setGoal] = useState('');
  const [message, setMessage] = useState('');
  const [preferredFormat, setPreferredFormat] = useState('Async Written Review');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState<GuidanceRequestRecord | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const record = submitGuidanceRequest(
        mentor,
        category,
        goal.trim(),
        message.trim(),
        preferredFormat
      );
      setSubmittedRecord(record);
      setIsSubmitting(false);
      if (onRequestSubmitted) {
        onRequestSubmitted(record);
      }
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-[#E8E6DF] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#E8E6DF] flex items-center justify-between bg-[#FCFCFA]">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg ${mentor.avatarBg} text-white flex items-center justify-center font-bold text-sm shrink-0`}
            >
              {mentor.initials}
            </div>
            <div>
              <h2 className="text-base font-bold text-[#101828]">
                Request Guidance from {mentor.name}
              </h2>
              <p className="text-xs text-[#667085]">
                {mentor.role} · {mentor.industry}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#667085] hover:text-[#101828] hover:bg-[#F2F0E8] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {submittedRecord ? (
            <div className="space-y-4 text-center py-4 animate-in fade-in duration-200">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-base font-bold text-[#101828]">
                  Guidance Request Dispatched!
                </h3>
                <p className="text-xs text-[#475467] max-w-md mx-auto mt-1">
                  We notified {mentor.name}. You can track this request and any follow-up notes in
                  your Mentorship tracker.
                </p>
              </div>

              <div className="bg-[#FAF9F5] border border-[#EFECE6] p-4 rounded-xl text-left text-xs space-y-2">
                <div className="flex justify-between text-[#667085]">
                  <span>Track:</span>
                  <span className="font-semibold text-[#101828] capitalize">
                    {submittedRecord.category.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex justify-between text-[#667085]">
                  <span>Goal:</span>
                  <span className="font-semibold text-[#101828]">{submittedRecord.goal}</span>
                </div>
                <div className="flex justify-between text-[#667085]">
                  <span>Format:</span>
                  <span className="font-semibold text-[#101828]">
                    {submittedRecord.preferredFormat}
                  </span>
                </div>
                <div className="flex justify-between text-[#667085]">
                  <span>Status:</span>
                  <span className="font-semibold text-emerald-700">
                    {submittedRecord.meetingDate || 'Queued for Review'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="mt-2 py-2 px-5 text-xs font-semibold rounded-lg bg-[#5B5BD6] text-white hover:bg-[#4949C0] transition-colors cursor-pointer"
              >
                Back to Mentors
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-[#FAF9F5] border border-[#EFECE6] p-3 rounded-xl text-xs text-[#475467]">
                🎯 Mentors give their best feedback when you share a specific milestone or decision.
                Be clear about what you have already completed.
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-[#344054] mb-1">
                  Focus Area
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as MentorCategory)}
                  className="w-full text-xs p-2.5 rounded-lg border border-[#D0CFC8] focus:outline-hidden focus:ring-2 focus:ring-[#5B5BD6] text-[#344054]"
                >
                  {MENTOR_CATEGORIES_CONFIG.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label} ({cat.description})
                    </option>
                  ))}
                </select>
              </div>

              {/* Goal Title */}
              <div>
                <label className="block text-xs font-semibold text-[#344054] mb-1">
                  What is your primary goal for this session? <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="e.g. Audit my GitHub README before sending applications"
                  required
                  className="w-full text-xs p-2.5 rounded-lg border border-[#D0CFC8] focus:outline-hidden focus:ring-2 focus:ring-[#5B5BD6] text-[#101828]"
                />
              </div>

              {/* Preferred Format */}
              <div>
                <label className="block text-xs font-semibold text-[#344054] mb-1">
                  Preferred Format
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Async Written Review', desc: 'Code teardown / written advice' },
                    { label: '15-Minute Intro Chat', desc: 'Live video or audio coffee chat' },
                  ].map((fmt) => (
                    <button
                      key={fmt.label}
                      type="button"
                      onClick={() => setPreferredFormat(fmt.label)}
                      className={`p-3 text-left rounded-lg border text-xs transition-colors cursor-pointer ${
                        preferredFormat === fmt.label
                          ? 'border-[#5B5BD6] bg-[#EEEDFC] text-[#5B5BD6]'
                          : 'border-[#E8E6DF] bg-white text-[#475467] hover:bg-[#FAF9F5]'
                      }`}
                    >
                      <div className="font-semibold">{fmt.label}</div>
                      <div className="text-[11px] text-[#667085] mt-0.5">{fmt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Details */}
              <div>
                <label className="block text-xs font-semibold text-[#344054] mb-1">
                  Context & Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell the mentor what you've built, where you feel stuck or unsure, and what specific feedback would help you move forward..."
                  rows={4}
                  required
                  className="w-full text-xs p-3 rounded-lg border border-[#D0CFC8] focus:outline-hidden focus:ring-2 focus:ring-[#5B5BD6] text-[#101828]"
                />
              </div>

              {/* Buttons */}
              <div className="pt-3 border-t border-[#F2F0E8] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2 px-3.5 text-xs font-semibold rounded-lg border border-[#D0CFC8] text-[#344054] hover:bg-[#F9F8F6] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!goal.trim() || !message.trim() || isSubmitting}
                  className="py-2 px-4 text-xs font-semibold rounded-lg bg-[#5B5BD6] text-white hover:bg-[#4949C0] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="w-3.5 h-3.5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CalendarDays className="w-3.5 h-3.5" />
                      Request Guidance
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
