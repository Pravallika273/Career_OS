import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  Briefcase,
  Layers,
  ChevronRight,
  Play,
  Send,
  Sliders,
  Compass,
  FileText,
  Zap,
  Award,
} from 'lucide-react';
import { RouteId } from '../types/navigation';
import {
  InterviewTrack,
  InterviewQuestion,
  InterviewSession,
  AnswerFeedback,
  InterviewExchange,
} from '../types/interview';
import {
  INTERVIEW_TRACK_META,
  TRACK_QUESTIONS,
  evaluateAnswer,
  evaluateAnswerWithAI,
  createInterviewSession,
  saveInterviewSession,
} from '../services/interviewService';
import { getEvidenceItems } from '../services/evidenceService';
import { Button } from '../components/ui/Button';

export interface InterviewViewProps {
  onNavigate: (route: RouteId) => void;
  targetCompany?: string;
  targetRole?: string;
  initialTrack?: InterviewTrack;
}

const TRACKS: InterviewTrack[] = [
  'technical',
  'hr',
  'behavioral',
  'resume',
  'project',
  'communication',
];

export const InterviewView: React.FC<InterviewViewProps> = ({
  onNavigate,
  targetCompany: propCompany,
  targetRole: propRole,
  initialTrack = 'behavioral',
}) => {
  const [selectedTrack, setSelectedTrack] = useState<InterviewTrack>(initialTrack);
  const [targetCompany, setTargetCompany] = useState<string>(propCompany || '');
  const [targetRole, setTargetRole] = useState<string>(propRole || '');
  const [activeSession, setActiveSession] = useState<InterviewSession | null>(null);

  // Active question and user response
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [latestFeedback, setLatestFeedback] = useState<AnswerFeedback | null>(null);

  const evidenceItems = getEvidenceItems();

  const handleStartSession = (track: InterviewTrack) => {
    const session = createInterviewSession(
      track,
      targetCompany.trim() || undefined,
      targetRole.trim() || undefined
    );
    setSelectedTrack(track);
    setActiveSession(session);
    setCurrentAnswer('');
    setLatestFeedback(null);
  };

  const handleRestart = () => {
    if (activeSession) {
      handleStartSession(activeSession.track);
    }
  };

  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSession || !currentAnswer.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const currentQ = activeSession.questions[activeSession.currentQuestionIndex];
    let feedback: AnswerFeedback;
    try {
      feedback = await evaluateAnswerWithAI(currentQ, currentAnswer);
    } catch {
      feedback = evaluateAnswer(currentQ, currentAnswer);
    }

    const exchange: InterviewExchange = {
      id: `ex-${Date.now()}`,
      questionIndex: activeSession.currentQuestionIndex,
      question: currentQ,
      userAnswer: currentAnswer.trim(),
      feedback,
      answeredAt: new Date().toISOString(),
    };

    const updatedExchanges = [...activeSession.exchanges, exchange];
    const isLastQuestion =
      activeSession.currentQuestionIndex >= activeSession.questions.length - 1;

    const updatedSession: InterviewSession = {
      ...activeSession,
      exchanges: updatedExchanges,
      isCompleted: isLastQuestion,
      completedAt: isLastQuestion ? new Date().toISOString() : undefined,
    };

    saveInterviewSession(updatedSession);
    setActiveSession(updatedSession);
    setLatestFeedback(feedback);
    setIsSubmitting(false);
  };

  const handleNextQuestion = () => {
    if (!activeSession) return;
    const nextIndex = activeSession.currentQuestionIndex + 1;
    if (nextIndex < activeSession.questions.length) {
      const updated: InterviewSession = {
        ...activeSession,
        currentQuestionIndex: nextIndex,
      };
      saveInterviewSession(updated);
      setActiveSession(updated);
      setCurrentAnswer('');
      setLatestFeedback(null);
    }
  };

  const handleRetryQuestion = () => {
    setLatestFeedback(null);
  };

  const insertEvidencePrompt = (activityText: string) => {
    if (!currentAnswer) {
      setCurrentAnswer(`In my project where I ${activityText.toLowerCase()}, `);
    } else {
      setCurrentAnswer(
        `${currentAnswer.trim()} For instance, when I ${activityText.toLowerCase()}, `
      );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header Switcher */}
      <div className="flex items-center gap-1.5 p-1 bg-[#F2F4F7] rounded-xl w-fit">
        <button
          onClick={() => onNavigate('opportunities')}
          className="px-3.5 py-1.5 text-xs font-semibold rounded-lg text-[#667085] hover:text-[#101828] transition-colors flex items-center gap-2"
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Opportunities</span>
        </button>
        <button
          onClick={() => onNavigate('applications')}
          className="px-3.5 py-1.5 text-xs font-semibold rounded-lg text-[#667085] hover:text-[#101828] transition-colors flex items-center gap-2"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Applications Pipeline</span>
        </button>
        <button
          onClick={() => onNavigate('interview')}
          className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-white text-[#101828] shadow-xs flex items-center gap-2"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#5B5BD6]" />
          <span>AI Interview Practice</span>
        </button>
      </div>

      {/* Main Header Card */}
      <div className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200">
                1-on-1 AI Interview Simulator
              </span>
              <span className="text-xs text-[#667085]">
                One Question at a Time · Real Career Evidence Proof
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#101828]">
              Interview Practice Engine
            </h1>
            <p className="text-sm text-[#475467] mt-1 max-w-2xl leading-relaxed">
              Practice answering realistic technical, behavioral, and HR questions based on your actual CareerOS projects. Receive structured 4-part feedback after every single answer.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {activeSession && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleRestart}
                leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
              >
                Restart Track
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('applications')}
              leftIcon={<Layers className="w-3.5 h-3.5" />}
            >
              Back to Tracker
            </Button>
          </div>
        </div>

        {/* Real Evidence Grounding Principle */}
        <div className="mt-5 pt-4 border-t border-[#F2F4F7] flex items-start gap-2.5 text-xs text-[#475467]">
          <ShieldCheck className="w-4 h-4 text-[#21B47A] shrink-0 mt-0.5" />
          <div>
            <strong>Authentic Evidence Standard:</strong> We will never ask you to fabricate corporate experience or memorize fake credentials. The AI interviewer prompts you to explain your <em>actual verified projects, technical trade-offs, and micro-proofs</em> stored in your CareerOS vault.
          </div>
        </div>
      </div>

      {/* TRACK SELECTION (If no active session or choosing track) */}
      {!activeSession ? (
        <div className="space-y-5">
          {/* Target Role & Company Contextualizer */}
          <div className="bg-white border border-[#E8E6DF] rounded-xl p-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#667085]">
              Optional Target Role Customization
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Target Organization (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Khan Academy, Mozilla, or Early-Stage Startup"
                  value={targetCompany}
                  onChange={(e) => setTargetCompany(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Target Role / Level (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Associate Frontend Engineer or Intern"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* 6 Required Interview Practice Tracks */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#667085] mb-3">
              Select an Interview Practice Track
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {TRACKS.map((trk) => {
                const meta = INTERVIEW_TRACK_META[trk];
                const questions = TRACK_QUESTIONS[trk];
                return (
                  <div
                    key={trk}
                    className="bg-white border border-[#E8E6DF] hover:border-[#5B5BD6] rounded-xl p-5 transition-all flex flex-col justify-between space-y-4 shadow-2xs hover:shadow-xs group"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-semibold px-2.5 py-0.5 rounded border ${meta.badgeColor}`}
                        >
                          {meta.badgeLabel}
                        </span>
                        <span className="text-xs text-slate-400">
                          {questions.length} questions
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-[#101828] group-hover:text-[#5B5BD6] transition-colors">
                        {meta.title}
                      </h3>
                      <p className="text-xs text-[#475467] leading-relaxed">
                        {meta.description}
                      </p>
                      <div className="p-2.5 rounded bg-slate-50 border border-slate-200/70 text-[11px] text-slate-600">
                        <strong>Focus:</strong> {meta.suggestedFocus}
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleStartSession(trk)}
                      rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                      className="w-full justify-between"
                    >
                      Start {meta.title}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* ACTIVE INTERVIEW PRACTICE SESSION */
        <div className="space-y-5">
          {/* Active Track Progress Bar */}
          <div className="bg-white border border-[#E8E6DF] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200">
                {INTERVIEW_TRACK_META[activeSession.track].title}
              </span>
              {activeSession.targetCompany && (
                <span className="text-xs text-[#667085]">
                  Target: <strong>{activeSession.targetCompany}</strong>
                  {activeSession.targetRole && ` · ${activeSession.targetRole}`}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="text-xs font-semibold text-[#101828]">
                Question {activeSession.currentQuestionIndex + 1} of{' '}
                {activeSession.questions.length}
              </div>
              <div className="w-32 bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#5B5BD6] h-full transition-all duration-300"
                  style={{
                    width: `${
                      ((activeSession.currentQuestionIndex + (latestFeedback ? 1 : 0.5)) /
                        activeSession.questions.length) *
                      100
                    }%`,
                  }}
                />
              </div>
              <button
                onClick={() => setActiveSession(null)}
                className="text-xs text-slate-400 hover:text-slate-700 underline ml-2"
              >
                Change Track
              </button>
            </div>
          </div>

          {/* QUESTION CARD (ONE QUESTION AT A TIME) */}
          {(() => {
            const currentQ = activeSession.questions[activeSession.currentQuestionIndex];
            return (
              <div className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-7 space-y-5">
                {/* AI Interviewer Avatar & Question */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 font-bold shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                        AI Interviewer
                      </span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="text-xs text-[#667085]">
                        Question {activeSession.currentQuestionIndex + 1}
                      </span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold text-[#101828] leading-relaxed">
                      "{currentQ.question}"
                    </h2>

                    {currentQ.context && (
                      <p className="text-xs text-[#667085] leading-relaxed">
                        <em>Context:</em> {currentQ.context}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[11px] font-semibold text-[#667085]">
                        Target skills:
                      </span>
                      {currentQ.targetSkills.map((s) => (
                        <span
                          key={s}
                          className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Evidence vault insertion hints */}
                {evidenceItems.length > 0 && !latestFeedback && (
                  <div className="p-3.5 rounded-xl bg-[#F8F9FC] border border-[#E0E7FF] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#4338CA] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#5B5BD6]" />
                        Cite your verified Career Evidence in your answer:
                      </span>
                      <span className="text-[11px] text-[#667085]">
                        Click to insert into answer
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {evidenceItems.slice(0, 3).map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => insertEvidencePrompt(item.activity)}
                          className="text-left text-xs px-2.5 py-1 rounded bg-white border border-[#C7D2FE] text-[#374151] hover:border-[#5B5BD6] hover:bg-indigo-50/50 transition-colors"
                        >
                          + {item.activity}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Answer Submission Form (Shown when no feedback or retrying) */}
                {!latestFeedback ? (
                  <form onSubmit={handleSubmitAnswer} className="space-y-4 pt-2">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-[#344054]">
                          Your Spoken / Written Answer
                        </label>
                        <span className="text-[11px] text-[#667085]">
                          {currentAnswer.split(/\s+/).filter(Boolean).length} words
                        </span>
                      </div>
                      <textarea
                        rows={6}
                        required
                        value={currentAnswer}
                        onChange={(e) => setCurrentAnswer(e.target.value)}
                        placeholder="Speak or type your answer clearly. Structure your thought process (Situation, Task, Action, Result) and reference real project decisions..."
                        className="w-full px-3.5 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white resize-y leading-relaxed font-sans"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                      <div className="text-[11px] text-[#667085]">
                        💡 Tip: Recruiters evaluate <em>how you think</em>, not rehearsed buzzwords. Talk about concrete trade-offs.
                      </div>
                      <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        disabled={!currentAnswer.trim() || isSubmitting}
                        rightIcon={<Send className="w-3.5 h-3.5" />}
                      >
                        {isSubmitting ? 'Evaluating...' : 'Submit Answer for Feedback'}
                      </Button>
                    </div>
                  </form>
                ) : (
                  /* STRUCTURED 4-PART FEEDBACK PANEL AFTER EACH ANSWER */
                  <div className="space-y-5 pt-3 border-t border-[#F2F4F7]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Evaluation Complete
                        </span>
                        <span className="text-xs text-[#667085]">
                          Score: <strong>{latestFeedback.scorePercentage}%</strong>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleRetryQuestion}
                          leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                        >
                          Improve & Retry
                        </Button>
                        {activeSession.currentQuestionIndex <
                        activeSession.questions.length - 1 ? (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={handleNextQuestion}
                            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                          >
                            Next Question
                          </Button>
                        ) : (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => onNavigate('applications')}
                            rightIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                          >
                            Finish Track & Return to Pipeline
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* The 4 Exact Feedback Blocks */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* 1. What was good */}
                      <div className="bg-[#F6FEF9] border border-emerald-200 rounded-xl p-4 space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>1. What was good</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-emerald-800 leading-relaxed list-disc list-inside">
                          {latestFeedback.whatWasGood.map((good, i) => (
                            <li key={i}>{good}</li>
                          ))}
                        </ul>
                      </div>

                      {/* 2. What could improve */}
                      <div className="bg-[#FFFBF5] border border-amber-200 rounded-xl p-4 space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                          <AlertCircle className="w-4 h-4 text-amber-600" />
                          <span>2. What could improve</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-amber-800 leading-relaxed list-disc list-inside">
                          {latestFeedback.whatCouldImprove.map((imp, i) => (
                            <li key={i}>{imp}</li>
                          ))}
                        </ul>
                      </div>

                      {/* 3. What the interviewer may want */}
                      <div className="bg-[#F9FAFB] border border-slate-200 rounded-xl p-4 space-y-2 md:col-span-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                          <HelpCircle className="w-4 h-4 text-[#5B5BD6]" />
                          <span>3. What the interviewer may want</span>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed">
                          {latestFeedback.whatInterviewerMayWant}
                        </p>
                      </div>

                      {/* 4. Better answer structure */}
                      <div className="bg-[#F8F9FE] border border-[#C7D2FE] rounded-xl p-4 space-y-2.5 md:col-span-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#4338CA]">
                            <Sparkles className="w-4 h-4 text-[#5B5BD6]" />
                            <span>4. Better answer structure</span>
                          </div>
                          <span className="text-[11px] font-semibold text-[#4338CA] px-2 py-0.5 rounded bg-white border border-[#C7D2FE]">
                            {latestFeedback.betterAnswerStructure.framework}
                          </span>
                        </div>

                        <div className="p-3 bg-white rounded-lg border border-[#E0E7FF] text-xs text-slate-800 leading-relaxed italic">
                          "{latestFeedback.betterAnswerStructure.modelAnswer}"
                        </div>

                        <div className="space-y-1 pt-1">
                          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                            Key Structural Elements:
                          </span>
                          <ul className="space-y-1 text-xs text-slate-600">
                            {latestFeedback.betterAnswerStructure.keyPoints.map((kp, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-[#5B5BD6] font-bold">›</span>
                                <span>{kp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Past completed answers in this session */}
          {activeSession.exchanges.length > 0 && (
            <div className="bg-white border border-[#E8E6DF] rounded-xl p-5 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#667085]">
                Session History ({activeSession.exchanges.length} Answered)
              </div>
              <div className="space-y-2">
                {activeSession.exchanges.map((ex, i) => (
                  <div
                    key={ex.id}
                    className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-center justify-between"
                  >
                    <div className="truncate max-w-md">
                      <span className="font-semibold text-slate-900">
                        Q{i + 1}:
                      </span>{' '}
                      <span className="text-slate-600">{ex.question.question}</span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                      {ex.feedback.scorePercentage}% Score
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
