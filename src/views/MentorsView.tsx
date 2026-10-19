import React, { useState, useMemo, useEffect } from 'react';
import {
  Users,
  Search,
  Filter,
  Bookmark,
  BookmarkCheck,
  MessageCircleQuestion,
  CalendarDays,
  Sparkles,
  ShieldCheck,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  ChevronRight,
  Clock,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Copy,
  Check,
} from 'lucide-react';
import { RouteId } from '../types/navigation';
import {
  MentorProfile,
  MentorCategory,
  MentorArchetype,
  MentorQuestionRecord,
  GuidanceRequestRecord,
} from '../types/mentors';
import {
  MOCK_MENTORS,
  MENTOR_CATEGORIES_CONFIG,
  ARCHETYPE_CONFIG,
  getSavedMentorIds,
  toggleSaveMentor,
  getMentorQuestions,
  getGuidanceRequests,
} from '../services/mentorsService';
import { MentorCard } from '../components/mentors/MentorCard';
import { AskQuestionModal } from '../components/mentors/AskQuestionModal';
import { RequestGuidanceModal } from '../components/mentors/RequestGuidanceModal';

export interface MentorsViewProps {
  onNavigate: (route: RouteId) => void;
  onOpenAICompanion?: () => void;
}

export const MentorsView: React.FC<MentorsViewProps> = ({
  onNavigate,
  onOpenAICompanion,
}) => {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<'discover' | 'saved' | 'my_interactions'>('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MentorCategory | 'all'>('all');
  const [selectedArchetype, setSelectedArchetype] = useState<MentorArchetype | 'all'>('all');

  // Persistence State
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [questions, setQuestions] = useState<MentorQuestionRecord[]>([]);
  const [guidanceRequests, setGuidanceRequests] = useState<GuidanceRequestRecord[]>([]);

  // Modals
  const [activeAskMentor, setActiveAskMentor] = useState<MentorProfile | null>(null);
  const [activeGuidanceMentor, setActiveGuidanceMentor] = useState<MentorProfile | null>(null);
  const [copiedQuestionId, setCopiedQuestionId] = useState<string | null>(null);

  // Load saved state on mount
  useEffect(() => {
    setSavedIds(getSavedMentorIds());
    setQuestions(getMentorQuestions());
    setGuidanceRequests(getGuidanceRequests());
  }, []);

  const handleToggleSave = (mentorId: string) => {
    toggleSaveMentor(mentorId);
    setSavedIds(getSavedMentorIds());
  };

  const handleQuestionSubmitted = (record: MentorQuestionRecord) => {
    setQuestions(getMentorQuestions());
  };

  const handleGuidanceSubmitted = (record: GuidanceRequestRecord) => {
    setGuidanceRequests(getGuidanceRequests());
  };

  const handleCopyInteraction = (q: MentorQuestionRecord) => {
    navigator.clipboard.writeText(
      `Mentor Advice from ${q.mentorName} (${q.mentorRole}):\n\nQuestion: ${q.question}\n\nAnswer: ${q.answer}\n\nKey Takeaway: ${q.keyTakeaway}`
    );
    setCopiedQuestionId(q.id);
    setTimeout(() => setCopiedQuestionId(null), 2000);
  };

  // Filtered Mentors
  const filteredMentors = useMemo(() => {
    return MOCK_MENTORS.filter((mentor) => {
      // Tab filter
      if (activeTab === 'saved' && !savedIds.includes(mentor.id)) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && !mentor.categories.includes(selectedCategory)) {
        return false;
      }

      // Archetype filter
      if (selectedArchetype !== 'all' && mentor.archetype !== selectedArchetype) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = mentor.name.toLowerCase().includes(query);
        const matchesRole = mentor.role.toLowerCase().includes(query);
        const matchesIndustry = mentor.industry.toLowerCase().includes(query);
        const matchesTopics = mentor.topics.some((t) => t.toLowerCase().includes(query));
        const matchesIntro = mentor.shortIntroduction.toLowerCase().includes(query);
        if (!matchesName && !matchesRole && !matchesIndustry && !matchesTopics && !matchesIntro) {
          return false;
        }
      }

      return true;
    });
  }, [activeTab, savedIds, selectedCategory, selectedArchetype, searchQuery]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Hero & Welcoming Header */}
      <div className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-7 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-[#EEEDFC] text-[#5B5BD6] border border-[#DDD9FA]">
                Welcoming Mentorship
              </span>
              <span className="text-xs text-[#667085]">CareerOS Community Network</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#101828]">
              Friendly Mentors & Alumni
            </h1>
            <p className="text-sm text-[#475467] mt-1.5 leading-relaxed">
              No cold outreach anxiety. Connect with alumni, young professionals, and seasoned
              specialists who have walked this path. Ask one specific question, request async
              guidance, or bookmark mentors to your circle.
            </p>
          </div>

          {/* Quick Etiquette / Confidence Tip Box */}
          <div className="bg-[#FAF9F5] border border-[#EFECE6] rounded-xl p-4 sm:w-80 shrink-0 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-[#101828] mb-1">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Low-Anxiety Mentorship</span>
            </div>
            <p className="text-[#475467] leading-relaxed">
              Mentors love specific questions with context over generic greetings. You don't need a
              perfect resume to reach out.
            </p>
          </div>
        </div>

        {/* Mentorship Integrity & Safety Policy */}
        <div className="mt-4 p-3 rounded-xl bg-[#F0EEFF]/60 border border-[#E4E0FD] text-xs text-[#344054] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#5B5BD6] shrink-0" />
            <span>
              <strong>Authentic Mentorship:</strong> Mentors in this directory are real industry professionals and alumni. CareerOS AI <strong>never</strong> impersonates mentors or manufactures responses.
            </span>
          </div>
          <span className="text-[11px] text-[#667085] hidden md:inline shrink-0">
            Report any misconduct directly on the mentor's card.
          </span>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#F2F0E8] overflow-x-auto">
          <button
            onClick={() => setActiveTab('discover')}
            className={`py-2 px-3.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'discover'
                ? 'bg-[#101828] text-white shadow-xs'
                : 'text-[#475467] hover:bg-[#F4F3EF] hover:text-[#101828]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Discover Mentors</span>
            <span className="text-[11px] opacity-75">({MOCK_MENTORS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`py-2 px-3.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'saved'
                ? 'bg-[#101828] text-white shadow-xs'
                : 'text-[#475467] hover:bg-[#F4F3EF] hover:text-[#101828]'
            }`}
          >
            <BookmarkCheck className="w-4 h-4 text-amber-500" />
            <span>Saved Mentors</span>
            <span
              className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                savedIds.length > 0 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {savedIds.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('my_interactions')}
            className={`py-2 px-3.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'my_interactions'
                ? 'bg-[#101828] text-white shadow-xs'
                : 'text-[#475467] hover:bg-[#F4F3EF] hover:text-[#101828]'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-[#5B5BD6]" />
            <span>My Q&A & Guidance</span>
            <span className="text-[11px] px-1.5 py-0.2 rounded-full font-bold bg-indigo-100 text-indigo-800">
              {questions.length + guidanceRequests.length}
            </span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'my_interactions' ? (
        /* Interacted Q&A & Guidance Tracking View */
        <div className="space-y-6">
          <div className="bg-white border border-[#E8E6DF] rounded-2xl p-6">
            <h2 className="text-lg font-bold text-[#101828] mb-1">
              Your Questions & Guidance Sessions
            </h2>
            <p className="text-xs text-[#667085] mb-5">
              Review advice received from mentors and track upcoming async guidance teardowns.
            </p>

            {/* Questions Section */}
            <div className="space-y-4 mb-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#98A2B3] flex items-center gap-2">
                <MessageCircleQuestion className="w-4 h-4 text-[#5B5BD6]" />
                Questions Asked ({questions.length})
              </h3>

              {questions.length === 0 ? (
                <div className="p-8 text-center bg-[#FAF9F5] rounded-xl border border-[#EFECE6] text-xs text-[#667085]">
                  You haven't asked any mentor questions yet. Pick any mentor and click "Ask One
                  Question".
                </div>
              ) : (
                <div className="space-y-3">
                  {questions.map((q) => (
                    <div
                      key={q.id}
                      className="border border-[#E8E6DF] rounded-xl p-4 bg-[#FCFCFA] hover:border-[#D0CFC8] transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-2 border-b border-[#F2F0E8]">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#101828]">{q.mentorName}</span>
                          <span className="text-xs text-[#667085]">({q.mentorRole})</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#667085]">
                          <span>
                            {new Date(q.askedAt).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                          <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200">
                            Answered
                          </span>
                        </div>
                      </div>

                      {/* Question Text */}
                      <p className="text-xs font-semibold text-[#101828] mb-2">
                        “{q.question}”
                      </p>

                      {q.relatedEvidenceActivity && (
                        <div className="text-[11px] text-[#667085] bg-[#F4F3EF] px-2.5 py-1 rounded-md inline-flex items-center gap-1 mb-3">
                          <span>Context:</span>
                          <span className="text-[#344054] font-medium">
                            {q.relatedEvidenceActivity}
                          </span>
                        </div>
                      )}

                      {/* Answer */}
                      {q.answer && (
                        <div className="bg-white p-3.5 rounded-lg border border-[#E8E6DF] text-xs text-[#344054] leading-relaxed mb-3">
                          {q.answer}
                        </div>
                      )}

                      {/* Key Takeaway & Copy Button */}
                      <div className="flex items-center justify-between gap-3 text-xs pt-1">
                        {q.keyTakeaway ? (
                          <div className="text-[#667085] italic">
                            <span className="font-semibold text-[#101828]">Takeaway: </span>
                            {q.keyTakeaway}
                          </div>
                        ) : <div />}

                        <button
                          onClick={() => handleCopyInteraction(q)}
                          className="py-1 px-2.5 rounded-md border border-[#D0CFC8] text-[#475467] hover:bg-[#F4F3EF] transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                        >
                          {copiedQuestionId === q.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Advice</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Guidance Requests Section */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#98A2B3] flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-[#5B5BD6]" />
                Guidance Sessions ({guidanceRequests.length})
              </h3>

              {guidanceRequests.length === 0 ? (
                <div className="p-8 text-center bg-[#FAF9F5] rounded-xl border border-[#EFECE6] text-xs text-[#667085]">
                  No guidance sessions requested yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {guidanceRequests.map((gr) => (
                    <div
                      key={gr.id}
                      className="border border-[#E8E6DF] rounded-xl p-4 bg-[#FCFCFA] text-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#101828]">{gr.mentorName}</span>
                        <span className="text-xs px-2 py-0.5 rounded-md font-medium text-emerald-700 bg-emerald-50 border border-emerald-200">
                          {gr.status}
                        </span>
                      </div>
                      <div className="font-semibold text-[#344054]">{gr.goal}</div>
                      <p className="text-[#667085] line-clamp-2">{gr.message}</p>
                      <div className="pt-2 border-t border-[#F2F0E8] text-[11px] text-[#667085] flex justify-between">
                        <span>Format: {gr.preferredFormat}</span>
                        <span>{gr.meetingDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Discovery / Saved Grid View */
        <div className="space-y-6">
          {/* Filters & Search Controls */}
          <div className="bg-white border border-[#E8E6DF] rounded-2xl p-5 space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#98A2B3]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search mentors by name, topic (e.g. WCAG, TypeScript), role, or company..."
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-[#D0CFC8] focus:outline-hidden focus:ring-2 focus:ring-[#5B5BD6] text-[#101828] placeholder-[#98A2B3]"
              />
            </div>

            {/* Category Segmented Tabs (All 8 prompt categories) */}
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#98A2B3] mb-2 flex items-center justify-between">
                <span>Category</span>
                {selectedCategory !== 'all' && (
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="text-[#5B5BD6] hover:underline normal-case cursor-pointer text-xs"
                  >
                    Reset category
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`py-1.5 px-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-[#101828] text-white shadow-xs'
                      : 'bg-[#F4F3EF] text-[#475467] hover:bg-[#EAE8E1] hover:text-[#101828]'
                  }`}
                >
                  All Categories
                </button>
                {MENTOR_CATEGORIES_CONFIG.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`py-1.5 px-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-[#101828] text-white shadow-xs'
                        : 'bg-[#F4F3EF] text-[#475467] hover:bg-[#EAE8E1] hover:text-[#101828]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Archetype / Experience Track Tabs */}
            <div className="pt-3 border-t border-[#F2F0E8]">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#98A2B3] mb-2 flex items-center justify-between">
                <span>Background & Experience Track</span>
                {selectedArchetype !== 'all' && (
                  <button
                    onClick={() => setSelectedArchetype('all')}
                    className="text-[#5B5BD6] hover:underline normal-case cursor-pointer text-xs"
                  >
                    Reset track
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedArchetype('all')}
                  className={`py-1.5 px-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    selectedArchetype === 'all'
                      ? 'bg-[#5B5BD6] text-white shadow-xs'
                      : 'bg-[#F4F3EF] text-[#475467] hover:bg-[#EAE8E1] hover:text-[#101828]'
                  }`}
                >
                  All Tracks
                </button>
                {(
                  [
                    'alumni',
                    'young_professional',
                    'experienced_professional',
                    'founder',
                    'industry_specialist',
                  ] as MentorArchetype[]
                ).map((arch) => (
                  <button
                    key={arch}
                    onClick={() => setSelectedArchetype(arch)}
                    className={`py-1.5 px-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      selectedArchetype === arch
                        ? 'bg-[#5B5BD6] text-white shadow-xs'
                        : 'bg-[#F4F3EF] text-[#475467] hover:bg-[#EAE8E1] hover:text-[#101828]'
                    }`}
                  >
                    {ARCHETYPE_CONFIG[arch].label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mentors Grid or Empty State */}
          {filteredMentors.length === 0 ? (
            <div className="bg-white border border-[#E8E6DF] rounded-2xl p-10 text-center space-y-4">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#101828]">
                  No mentors match your current filter
                </h3>
                <p className="text-xs text-[#667085] max-w-md mx-auto mt-1">
                  Try clearing your search query or selecting "All Categories" to see all available
                  alumni and leaders.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedArchetype('all');
                  setSearchQuery('');
                }}
                className="py-2 px-4 text-xs font-semibold rounded-lg bg-[#5B5BD6] text-white hover:bg-[#4949C0] transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredMentors.map((mentor) => (
                <MentorCard
                  key={mentor.id}
                  mentor={mentor}
                  isSaved={savedIds.includes(mentor.id)}
                  onToggleSave={handleToggleSave}
                  onAskQuestion={(m) => setActiveAskMentor(m)}
                  onRequestGuidance={(m) => setActiveGuidanceMentor(m)}
                />
              ))}
            </div>
          )}

          {/* Architecture Transparency Card */}
          <div className="bg-[#FAF9F5] border border-[#EFECE6] rounded-2xl p-5 text-xs text-[#475467] flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-bold text-[#101828]">CareerOS Community Architecture: </span>
              Profiles represent curated mentorship tracks across alumni, young professionals,
              experienced engineers, startup founders, and industry specialists. Real mentors must
              never be fabricated without explicit consent; this system enables safe, structured
              Q&A practice and asynchronous guidance requests for early-career growth.
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <AskQuestionModal
        mentor={activeAskMentor}
        isOpen={Boolean(activeAskMentor)}
        onClose={() => setActiveAskMentor(null)}
        onQuestionSubmitted={handleQuestionSubmitted}
      />

      <RequestGuidanceModal
        mentor={activeGuidanceMentor}
        isOpen={Boolean(activeGuidanceMentor)}
        onClose={() => setActiveGuidanceMentor(null)}
        onRequestSubmitted={handleGuidanceSubmitted}
      />
    </div>
  );
};
