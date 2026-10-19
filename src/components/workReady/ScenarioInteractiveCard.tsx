import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  BookOpen,
  MessageSquare,
  ShieldCheck,
  Send,
  RotateCcw,
  Check,
  FileCheck,
  Compass,
} from 'lucide-react';
import {
  WorkReadyScenario,
  ScenarioChoice,
  ScenarioResolutionRecord,
} from '../../types/workReady';
import { WORK_READY_AREAS_META } from '../../services/workReadyCatalog';
import {
  saveScenarioResolution,
  addScenarioToCareerEvidence,
} from '../../services/workReadyService';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Textarea } from '../ui/Input';

export interface ScenarioInteractiveCardProps {
  scenario: WorkReadyScenario;
  savedResolution?: ScenarioResolutionRecord;
  onResolutionSaved?: () => void;
  onNavigateToEvidence?: () => void;
}

export const ScenarioInteractiveCard: React.FC<ScenarioInteractiveCardProps> = ({
  scenario,
  savedResolution,
  onResolutionSaved,
  onNavigateToEvidence,
}) => {
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(
    savedResolution?.chosenOptionId || null
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(!!savedResolution);
  const [userReflection, setUserReflection] = useState<string>(
    savedResolution?.reflectionNotes || ''
  );
  const [activeTab, setActiveTab] = useState<
    'why' | 'consequences' | 'professional' | 'improve'
  >('why');
  const [comparingChoiceId, setComparingChoiceId] = useState<string | null>(null);
  const [evidenceAdded, setEvidenceAdded] = useState<boolean>(false);

  const areaMeta = WORK_READY_AREAS_META[scenario.area];
  const chosenChoice: ScenarioChoice | undefined = scenario.choices.find(
    (c) => c.id === (comparingChoiceId || selectedChoiceId)
  );

  const handleSubmitChoice = (choiceId: string) => {
    setSelectedChoiceId(choiceId);
    setComparingChoiceId(null);
    setIsSubmitted(true);

    const record: ScenarioResolutionRecord = {
      scenarioId: scenario.id,
      chosenOptionId: choiceId,
      selectedAt: new Date().toISOString(),
      reflectionNotes: userReflection,
      area: scenario.area,
    };
    saveScenarioResolution(record);
    onResolutionSaved?.();
  };

  const handleSaveReflection = () => {
    if (!selectedChoiceId) return;
    const record: ScenarioResolutionRecord = {
      scenarioId: scenario.id,
      chosenOptionId: selectedChoiceId,
      selectedAt: new Date().toISOString(),
      reflectionNotes: userReflection,
      area: scenario.area,
    };
    saveScenarioResolution(record);
    onResolutionSaved?.();
  };

  const handleAddToEvidence = () => {
    if (!selectedChoiceId) return;
    const result = addScenarioToCareerEvidence(
      scenario,
      selectedChoiceId,
      userReflection
    );
    if (result.success) {
      setEvidenceAdded(true);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSelectedChoiceId(null);
    setComparingChoiceId(null);
    setEvidenceAdded(false);
  };

  return (
    <div className="bg-white rounded-xl border border-[#E8E6DF] shadow-xs overflow-hidden transition-all duration-200">
      {/* Scenario Header */}
      <div className="p-6 border-b border-[#E8E6DF] bg-[#FAF9F5]">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white text-[#5B5BD6] border border-[#E0E0FC]">
              {areaMeta.label}
            </span>
            <span className="text-xs text-[#667085] flex items-center gap-1 font-medium">
              <Compass className="w-3.5 h-3.5 text-[#5B5BD6]" />
              Workplace Situation
            </span>
          </div>
          {isSubmitted && (
            <Badge variant="mint" size="sm" className="gap-1 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Analyzed & Completed
            </Badge>
          )}
        </div>

        <h3 className="text-xl font-bold text-[#101828] tracking-tight mb-2">
          {scenario.headlinePrompt}
        </h3>
        <p className="text-sm text-[#475467] leading-relaxed">
          {scenario.workplaceContext}
        </p>

        {/* The Stakes */}
        <div className="mt-4 p-3.5 rounded-lg bg-amber-50/70 border border-amber-200/60 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 leading-relaxed">
            <strong className="font-semibold text-amber-950">The Workplace Friction: </strong>
            {scenario.dilemmaStakes}
          </div>
        </div>
      </div>

      {/* Choices Section */}
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#667085]">
            Choose your action:
          </span>
          {isSubmitted && (
            <button
              onClick={handleReset}
              className="text-xs text-[#5B5BD6] hover:text-[#4338CA] font-medium flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Try another action
            </button>
          )}
        </div>

        {/* Options Grid */}
        <div className="space-y-3">
          {scenario.choices.map((choice) => {
            const isSelected = selectedChoiceId === choice.id;
            const isComparing = comparingChoiceId === choice.id;
            const isCurrentCardActive = isComparing || (!comparingChoiceId && isSelected);

            let borderClass = 'border-[#E8E6DF] hover:border-[#D0D5DD] bg-white';
            if (isSubmitted && isSelected) {
              borderClass = choice.isRecommended
                ? 'border-[#12B76A] bg-[#F6FEF9] ring-1 ring-[#12B76A]'
                : 'border-[#F79009] bg-[#FFFAEB] ring-1 ring-[#F79009]';
            } else if (isSubmitted && isComparing) {
              borderClass = 'border-[#5B5BD6] bg-[#F9F9FE] ring-1 ring-[#5B5BD6]';
            } else if (!isSubmitted && selectedChoiceId === choice.id) {
              borderClass = 'border-[#5B5BD6] bg-[#F9F9FE] ring-1 ring-[#5B5BD6]';
            }

            return (
              <div
                key={choice.id}
                onClick={() => {
                  if (isSubmitted) {
                    setComparingChoiceId(choice.id);
                  } else {
                    handleSubmitChoice(choice.id);
                  }
                }}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all duration-150 flex items-start gap-3.5 ${borderClass}`}
              >
                <div
                  className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center font-bold text-xs ${
                    isCurrentCardActive
                      ? 'bg-[#5B5BD6] text-white shadow-xs'
                      : 'bg-[#F2F4F7] text-[#475467]'
                  }`}
                >
                  {choice.label}
                </div>

                <div className="flex-1">
                  <p className="text-sm font-medium text-[#101828] leading-snug">
                    {choice.actionText}
                  </p>

                  {isSubmitted && (
                    <div className="mt-2 flex items-center gap-2">
                      {choice.isRecommended ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#027A48]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Seasoned Professional Approach
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-[#B54708]">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Common Pitfall / Short-Term Instinct
                        </span>
                      )}
                      {isSelected && (
                        <span className="text-[11px] text-[#667085] bg-[#F2F4F7] px-2 py-0.5 rounded-full font-medium">
                          Your chosen action
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Feedback & Analysis */}
        {isSubmitted && chosenChoice && (
          <div className="mt-6 pt-6 border-t border-[#E8E6DF] animate-in fade-in duration-200">
            {/* Active Analysis Banner */}
            <div
              className={`p-4 rounded-xl border mb-5 ${
                chosenChoice.isRecommended
                  ? 'bg-emerald-50/60 border-emerald-200/80 text-emerald-950'
                  : 'bg-amber-50/60 border-amber-200/80 text-amber-950'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider">
                  Analyzing Option {chosenChoice.label}:
                </span>
                {comparingChoiceId && comparingChoiceId !== selectedChoiceId && (
                  <button
                    onClick={() => setComparingChoiceId(null)}
                    className="text-xs font-semibold underline text-[#5B5BD6] hover:text-[#4338CA]"
                  >
                    Return to my chosen action ({scenario.choices.find((c) => c.id === selectedChoiceId)?.label})
                  </button>
                )}
              </div>
              <p className="text-sm font-medium leading-relaxed italic">
                “{chosenChoice.actionText}”
              </p>
            </div>

            {/* AI Workplace Diagnostics: 3 Core Questions Framework */}
            <div className="mb-6 rounded-2xl bg-[#F8F8F5] border border-[#E8E6DF] p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E8E6DF] pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#5B5BD6] text-white flex items-center justify-center text-xs font-bold">
                    AI
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-[#101828]">
                      AI Workplace Diagnostic Coaching
                    </h4>
                    <p className="text-[11px] text-[#667085]">
                      Objective analysis focused strictly on workplace development, communication, and cognitive pressures.
                    </p>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-[#5B5BD6] border border-[#E0E0FC] font-semibold">
                  Zero Clinical Diagnoses • Professional Development Only
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {/* 1. What happened? */}
                <div className="p-4 rounded-xl bg-white border border-[#E8E6DF] space-y-1.5 shadow-xs">
                  <span className="text-[11px] font-bold text-[#101828] uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-[#EEF4FF] text-[#3538CD] flex items-center justify-center text-[10px] font-extrabold">
                      1
                    </span>
                    What happened?
                  </span>
                  <p className="text-xs text-[#344054] leading-relaxed">
                    {chosenChoice.whatHappened ||
                      scenario.whatHappenedExplainer ||
                      `${scenario.dilemmaStakes} This created an immediate trade-off between speed, social comfort, and operational predictability.`}
                  </p>
                </div>

                {/* 2. Why might someone react this way? */}
                <div className="p-4 rounded-xl bg-white border border-[#E8E6DF] space-y-1.5 shadow-xs">
                  <span className="text-[11px] font-bold text-[#101828] uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-[#FFF4ED] text-[#B54708] flex items-center justify-center text-[10px] font-extrabold">
                      2
                    </span>
                    Why might someone react this way?
                  </span>
                  <p className="text-xs text-[#344054] leading-relaxed">
                    {chosenChoice.whySomeoneReactsThisWay ||
                      scenario.whyReactionOccurredExplainer ||
                      chosenChoice.whyItWorks}
                  </p>
                  <span className="block text-[10px] text-[#98A2B3] italic pt-1">
                    *Explores professional incentives and cognitive load; never diagnoses mental health conditions.
                  </span>
                </div>

                {/* 3. What could you do differently? */}
                <div className="p-4 rounded-xl bg-white border border-[#E8E6DF] space-y-1.5 shadow-xs">
                  <span className="text-[11px] font-bold text-[#101828] uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-[#ECFDF3] text-[#027A48] flex items-center justify-center text-[10px] font-extrabold">
                      3
                    </span>
                    What could you do differently?
                  </span>
                  <p className="text-xs text-[#344054] leading-relaxed">
                    {chosenChoice.whatCouldYouDoDifferently ||
                      scenario.whatCouldYouDoDifferentlyExplainer ||
                      chosenChoice.howToImprove}
                  </p>
                </div>
              </div>
            </div>

            {/* Analysis Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-[#F2F4F7] rounded-lg mb-4">
              <button
                onClick={() => setActiveTab('why')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  activeTab === 'why'
                    ? 'bg-white text-[#101828] shadow-xs'
                    : 'text-[#667085] hover:text-[#101828]'
                }`}
              >
                Why It Works (or Stumbles)
              </button>
              <button
                onClick={() => setActiveTab('consequences')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  activeTab === 'consequences'
                    ? 'bg-white text-[#101828] shadow-xs'
                    : 'text-[#667085] hover:text-[#101828]'
                }`}
              >
                Potential Consequences
              </button>
              <button
                onClick={() => setActiveTab('professional')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  activeTab === 'professional'
                    ? 'bg-white text-[#101828] shadow-xs'
                    : 'text-[#667085] hover:text-[#101828]'
                }`}
              >
                What a Professional Considers
              </button>
              <button
                onClick={() => setActiveTab('improve')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  activeTab === 'improve'
                    ? 'bg-white text-[#101828] shadow-xs'
                    : 'text-[#667085] hover:text-[#101828]'
                }`}
              >
                How to Improve / Script
              </button>
            </div>

            {/* Tab Content Display */}
            <div className="bg-[#FAF9F5] rounded-xl p-4 border border-[#E8E6DF] mb-5">
              {activeTab === 'why' && (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#101828] uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#5B5BD6]" />
                    Underlying Dynamic & Psychology
                  </div>
                  <p className="text-sm text-[#344054] leading-relaxed">
                    {chosenChoice.whyItWorks}
                  </p>
                </div>
              )}

              {activeTab === 'consequences' && (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#101828] uppercase tracking-wider">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    Organizational Ripple Effects
                  </div>
                  <p className="text-sm text-[#344054] leading-relaxed">
                    {chosenChoice.potentialConsequences}
                  </p>
                </div>
              )}

              {activeTab === 'professional' && (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#101828] uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#5B5BD6]" />
                    Unwritten Rules & Hidden Context
                  </div>
                  <p className="text-sm text-[#344054] leading-relaxed">
                    {chosenChoice.whatAProfessionalConsiders}
                  </p>
                </div>
              )}

              {activeTab === 'improve' && (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#101828] uppercase tracking-wider">
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                    Exact Actionable Script & Phrasing
                  </div>
                  <p className="text-sm text-[#344054] leading-relaxed">
                    {chosenChoice.howToImprove}
                  </p>
                </div>
              )}
            </div>

            {/* Core Mindset Takeaway */}
            <div className="p-3.5 rounded-lg bg-[#F0F2FF] border border-[#D5D9FC] mb-5 flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-[#5B5BD6] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-[#3538CD] uppercase tracking-wide">
                  Core Workplace Takeaway:
                </span>
                <p className="text-xs text-[#2D31A6] font-medium mt-0.5 leading-relaxed">
                  {scenario.keyMindsetTakeaway}
                </p>
              </div>
            </div>

            {/* Student Reflection & Authentic Evidence Entry */}
            <div className="border border-[#E8E6DF] rounded-xl p-4 bg-white space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#101828] uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#5B5BD6]" />
                  Your Takeaway & Next Application:
                </span>
                <span className="text-[11px] text-[#667085]">
                  Grounds your authentic judgment record
                </span>
              </div>

              <Textarea
                placeholder="What did this scenario teach you about your instinctive reaction? What specific phrasing or strategy will you use next time?"
                value={userReflection}
                onChange={(e) => setUserReflection(e.target.value)}
                rows={2}
                className="text-xs"
              />

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSaveReflection}
                  className="text-xs"
                >
                  Save Reflection Note
                </Button>

                {evidenceAdded ? (
                  <div className="flex items-center gap-2">
                    <Badge variant="mint" size="sm" className="gap-1 font-medium text-xs">
                      <Check className="w-3.5 h-3.5" />
                      Saved to Career Evidence
                    </Badge>
                    {onNavigateToEvidence && (
                      <button
                        onClick={onNavigateToEvidence}
                        className="text-xs text-[#5B5BD6] hover:underline font-semibold flex items-center gap-1"
                      >
                        View in Timeline <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleAddToEvidence}
                    className="text-xs gap-1.5 bg-[#5B5BD6] hover:bg-[#4B4BC2]"
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    Add this to My Career Evidence
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
