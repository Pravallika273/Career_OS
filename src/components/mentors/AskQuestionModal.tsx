import React, { useState } from 'react';
import {
  X,
  MessageCircleQuestion,
  Sparkles,
  Send,
  CheckCircle2,
  Copy,
  Check,
  FolderGit2,
  ArrowRight,
  Clock,
} from 'lucide-react';
import { MentorProfile, MentorQuestionRecord } from '../../types/mentors';
import { getEvidenceItems } from '../../services/evidenceService';
import { submitQuestionToMentor, submitQuestionToMentorAsync } from '../../services/mentorsService';

export interface AskQuestionModalProps {
  mentor: MentorProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onQuestionSubmitted?: (record: MentorQuestionRecord) => void;
  onNavigateToEvidence?: () => void;
}

export const AskQuestionModal: React.FC<AskQuestionModalProps> = ({
  mentor,
  isOpen,
  onClose,
  onQuestionSubmitted,
}) => {
  if (!isOpen || !mentor) return null;

  const [question, setQuestion] = useState('');
  const [selectedEvidence, setSelectedEvidence] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answeredRecord, setAnsweredRecord] = useState<MentorQuestionRecord | null>(null);
  const [copied, setCopied] = useState(false);

  // Load user's evidence items for context attachment
  const userEvidence = getEvidenceItems();

  const handleSelectSample = (sample: string) => {
    setQuestion(sample);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsSubmitting(true);
    try {
      const record = await submitQuestionToMentorAsync(
        mentor,
        question.trim(),
        selectedEvidence || undefined
      );
      setAnsweredRecord(record);
      if (onQuestionSubmitted) {
        onQuestionSubmitted(record);
      }
    } catch {
      const record = submitQuestionToMentor(
        mentor,
        question.trim(),
        selectedEvidence || undefined
      );
      setAnsweredRecord(record);
      if (onQuestionSubmitted) {
        onQuestionSubmitted(record);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyAnswer = () => {
    if (!answeredRecord?.answer) return;
    navigator.clipboard.writeText(
      `Mentor Advice from ${answeredRecord.mentorName} (${answeredRecord.mentorRole}):\n\nQ: ${answeredRecord.question}\n\nA: ${answeredRecord.answer}\n\nKey Takeaway: ${answeredRecord.keyTakeaway}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetForAnother = () => {
    setAnsweredRecord(null);
    setQuestion('');
    setSelectedEvidence('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-[#E8E6DF] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-[#E8E6DF] flex items-center justify-between bg-[#FCFCFA]">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg ${mentor.avatarBg} text-white flex items-center justify-center font-bold text-sm shrink-0`}
            >
              {mentor.initials}
            </div>
            <div>
              <h2 className="text-base font-bold text-[#101828]">
                Ask {mentor.name} One Question
              </h2>
              <p className="text-xs text-[#667085]">
                {mentor.role} · {mentor.availability}
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {answeredRecord ? (
            /* Answered State View */
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Async Response Received from {mentor.name}</span>
              </div>

              {/* The User's Question */}
              <div className="bg-[#FAF9F5] p-3.5 rounded-xl border border-[#EFECE6] text-xs">
                <div className="font-semibold text-[#667085] mb-1">Your Question:</div>
                <p className="text-[#344054] font-medium">{answeredRecord.question}</p>
                {answeredRecord.relatedEvidenceActivity && (
                  <div className="mt-2 text-[11px] text-[#667085] flex items-center gap-1">
                    <FolderGit2 className="w-3 h-3 text-[#5B5BD6]" />
                    Linked Evidence: {answeredRecord.relatedEvidenceActivity}
                  </div>
                )}
              </div>

              {/* The Mentor's Answer */}
              <div className="bg-white border border-[#E8E6DF] p-4 rounded-xl shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-md ${mentor.avatarBg} text-white flex items-center justify-center font-bold text-[10px]`}
                    >
                      {mentor.initials}
                    </div>
                    <span className="text-xs font-bold text-[#101828]">
                      {mentor.name}'s Guidance
                    </span>
                  </div>
                  <span className="text-[11px] text-[#667085]">Just now</span>
                </div>

                <p className="text-xs text-[#344054] leading-relaxed whitespace-pre-line">
                  {answeredRecord.answer}
                </p>

                {answeredRecord.keyTakeaway && (
                  <div className="bg-[#F6F5F0] border-l-2 border-[#5B5BD6] p-2.5 rounded-r-lg text-xs">
                    <span className="font-semibold text-[#101828]">Key Takeaway: </span>
                    <span className="text-[#475467]">{answeredRecord.keyTakeaway}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleCopyAnswer}
                  className="py-2 px-3 text-xs font-semibold rounded-lg border border-[#D0CFC8] text-[#344054] hover:bg-[#F9F8F6] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Answer
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleResetForAnother}
                    className="py-2 px-3 text-xs font-semibold text-[#5B5BD6] hover:bg-[#EEEDFC] rounded-lg transition-colors cursor-pointer"
                  >
                    Ask Another Question
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="py-2 px-4 text-xs font-semibold rounded-lg bg-[#5B5BD6] text-white hover:bg-[#4949C0] transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Input Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-[#FAF9F5] border border-[#EFECE6] p-3 rounded-xl text-xs text-[#475467] leading-relaxed">
                💡 <span className="font-medium text-[#101828]">Zero-Pressure Rule:</span> Ask
                one specific question about your projects, code structure, or early career steps.
                Mentors prefer questions with concrete context over broad inquiries like "How do I
                get a job?"
              </div>

              {/* Mentor sample prompts */}
              {mentor.sampleQuestions.length > 0 && (
                <div>
                  <label className="block text-xs font-semibold text-[#344054] mb-1.5">
                    Suggested Questions for {mentor.name.split(' ')[0]}:
                  </label>
                  <div className="space-y-1.5">
                    {mentor.sampleQuestions.map((sq, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectSample(sq)}
                        className="w-full text-left text-xs bg-[#F9F8F6] hover:bg-[#F0EEEA] text-[#475467] hover:text-[#101828] p-2.5 rounded-lg border border-[#EFECE6] transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <span className="line-clamp-1">{sq}</span>
                        <ArrowRight className="w-3 h-3 text-[#98A2B3] group-hover:text-[#5B5BD6] shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Question Text Area */}
              <div>
                <label className="block text-xs font-semibold text-[#344054] mb-1">
                  Your Question <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="e.g. How do you explain state management trade-offs during a technical screen?"
                  rows={4}
                  required
                  className="w-full text-xs p-3 rounded-lg border border-[#D0CFC8] focus:outline-hidden focus:ring-2 focus:ring-[#5B5BD6] focus:border-transparent text-[#101828] placeholder-[#98A2B3]"
                />
              </div>

              {/* Optional: Link CareerOS Evidence */}
              <div>
                <label className="block text-xs font-semibold text-[#344054] mb-1">
                  Attach CareerOS Evidence (Optional context)
                </label>
                {userEvidence.length > 0 ? (
                  <select
                    value={selectedEvidence}
                    onChange={(e) => setSelectedEvidence(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-[#D0CFC8] focus:outline-hidden focus:ring-2 focus:ring-[#5B5BD6] text-[#344054]"
                  >
                    <option value="">No evidence attached</option>
                    {userEvidence.map((ev) => (
                      <option key={ev.id} value={ev.activity}>
                        {ev.activity} ({ev.category} {ev.verificationBadge ? `· ${ev.verificationBadge}` : ''})
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-xs text-[#667085] italic">
                    No verified evidence items recorded yet. You can still ask your question!
                  </p>
                )}
              </div>

              {/* Submit Buttons */}
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
                  disabled={!question.trim() || isSubmitting}
                  className="py-2 px-4 text-xs font-semibold rounded-lg bg-[#5B5BD6] text-white hover:bg-[#4949C0] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="w-3.5 h-3.5 animate-spin" />
                      Sending to {mentor.name.split(' ')[0]}...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Submit Question
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
