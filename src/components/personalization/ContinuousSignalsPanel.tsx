import React, { useState } from 'react';
import {
  Activity,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Heart,
  EyeOff,
  Flame,
  Award,
  Briefcase,
  MessageSquare,
  Clock,
  Compass,
  Zap,
  RefreshCw,
  Plus,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import {
  ContinuousLearnerSignals,
  PaceMode,
  UserBehavioralProfile,
} from '../../types/personalization';
import {
  applyPersonalizationPreset,
  setPaceMode,
  breakDownStruggleSkill,
} from '../../services/personalizationEngine';

export interface ContinuousSignalsPanelProps {
  signals: ContinuousLearnerSignals;
  behavioralProfile: UserBehavioralProfile;
  onSignalsUpdated: () => void;
}

export const ContinuousSignalsPanel: React.FC<ContinuousSignalsPanelProps> = ({
  signals,
  behavioralProfile,
  onSignalsUpdated,
}) => {
  const [activeTab, setActiveTab] = useState<'signals' | 'presets'>('signals');
  const [customStruggleInput, setCustomStruggleInput] = useState('');
  const [isDeconstructing, setIsDeconstructing] = useState(false);

  const handleApplyPreset = (
    presetKey:
      | 'struggling_technical'
      | 'enjoys_research'
      | 'urgent_job_hunt'
      | 'exploring_curiosity'
      | 'reset_default'
  ) => {
    applyPersonalizationPreset(presetKey);
    onSignalsUpdated();
  };

  const handlePaceChange = (pace: PaceMode) => {
    setPaceMode(pace);
    onSignalsUpdated();
  };

  const handleCustomDeconstruction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customStruggleInput.trim()) return;
    setIsDeconstructing(true);
    breakDownStruggleSkill(customStruggleInput.trim());
    setCustomStruggleInput('');
    setIsDeconstructing(false);
    onSignalsUpdated();
  };

  return (
    <div className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-7 space-y-6 text-left">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E6DF]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="indigo" size="sm">
              <Activity className="w-3 h-3 mr-1 inline" />
              Continuous Adaptation Engine
            </Badge>
            <span className="text-xs text-[#667085]">9 Live Signal Dimensions</span>
          </div>
          <h3 className="text-lg font-bold text-[#101828]">
            Signals Shaping Your Unique Roadmap
          </h3>
          <p className="text-xs text-[#475467] mt-0.5">
            CareerOS never locks every student into the same curriculum. Your path continuously adapts based on real actions.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('signals')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'signals'
                ? 'bg-[#5B5BD6] text-white'
                : 'bg-[#F8F8F5] text-[#475467] hover:bg-[#E8E6DF]'
            }`}
          >
            Live 9-Signal Matrix
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('presets')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
              activeTab === 'presets'
                ? 'bg-[#5B5BD6] text-white'
                : 'bg-[#F8F8F5] text-[#475467] hover:bg-[#E8E6DF]'
            }`}
          >
            <Zap className="w-3 h-3" />
            <span>Simulate Scenarios</span>
          </button>
        </div>
      </div>

      {/* Pace Mode Calibration Selector */}
      <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E8E6DF] space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#667085] flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#5B5BD6]" />
            Timeline & Pace Calibration
          </span>
          <span className="text-xs text-[#5B5BD6] font-medium">
            Active: {behavioralProfile.paceMode.replace(/_/g, ' ')}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
          <button
            type="button"
            onClick={() => handlePaceChange('urgent_job_readiness')}
            className={`p-3 rounded-lg border text-left text-xs transition-all ${
              behavioralProfile.paceMode === 'urgent_job_readiness'
                ? 'border-[#5B5BD6] bg-white ring-2 ring-[#5B5BD6]/20 font-semibold text-[#101828]'
                : 'border-[#E8E6DF] bg-white text-[#475467] hover:border-[#5B5BD6]/50'
            }`}
          >
            <div className="flex items-center gap-1.5 text-[#5B5BD6] mb-1 font-bold">
              <Flame className="w-3.5 h-3.5" />
              <span>Job Readiness Sprint</span>
            </div>
            <p className="text-[11px] text-[#667085] font-normal leading-tight">
              Ready in 1–3 months. Prioritizes ATS resume & STAR interview drills.
            </p>
          </button>

          <button
            type="button"
            onClick={() => handlePaceChange('exploratory_experimentation')}
            className={`p-3 rounded-lg border text-left text-xs transition-all ${
              behavioralProfile.paceMode === 'exploratory_experimentation'
                ? 'border-[#5B5BD6] bg-white ring-2 ring-[#5B5BD6]/20 font-semibold text-[#101828]'
                : 'border-[#E8E6DF] bg-white text-[#475467] hover:border-[#5B5BD6]/50'
            }`}
          >
            <div className="flex items-center gap-1.5 text-[#21B47A] mb-1 font-bold">
              <Compass className="w-3.5 h-3.5" />
              <span>Exploratory Track</span>
            </div>
            <p className="text-[11px] text-[#667085] font-normal leading-tight">
              Flexible timeline. Prioritizes curiosity audits & cross-track trials.
            </p>
          </button>

          <button
            type="button"
            onClick={() => handlePaceChange('steady_proof_building')}
            className={`p-3 rounded-lg border text-left text-xs transition-all ${
              behavioralProfile.paceMode === 'steady_proof_building'
                ? 'border-[#5B5BD6] bg-white ring-2 ring-[#5B5BD6]/20 font-semibold text-[#101828]'
                : 'border-[#E8E6DF] bg-white text-[#475467] hover:border-[#5B5BD6]/50'
            }`}
          >
            <div className="flex items-center gap-1.5 text-[#475467] mb-1 font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>Balanced Proof Track</span>
            </div>
            <p className="text-[11px] text-[#667085] font-normal leading-tight">
              3–6 months pacing. Balanced skill challenges & evidence logging.
            </p>
          </button>
        </div>
      </div>

      {activeTab === 'presets' ? (
        /* Presets Tab: Easy live testing for user or reviewers */
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#F0EEFF]/60 border border-[#E4E0FD] space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#5B5BD6]">
              Interactive Rule Verification (Live Simulation)
            </h4>
            <p className="text-xs text-[#475467] leading-relaxed">
              Click any scenario to test the system adaptation in real time. CareerOS will immediately recalculate the next action and the rationale citations without page reload.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleApplyPreset('struggling_technical')}
              className="p-4 rounded-xl border border-[#FDE68A] bg-[#FFFBEB] hover:bg-[#FEF3C7] text-left transition-all group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[#B45309] flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-[#D97706]" />
                  Scenario: Struggles with Technical Code
                </span>
                <Badge variant="coral" size="sm">Rule Test</Badge>
              </div>
              <p className="text-xs text-[#92400E] leading-relaxed">
                <strong>Rule:</strong> System will <em>never</em> say &ldquo;learn more&rdquo;. It breaks the skill into 3 isolated 10-minute micro-drills.
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleApplyPreset('enjoys_research')}
              className="p-4 rounded-xl border border-[#D1FADF] bg-[#ECFDF3] hover:bg-[#D1FADF]/60 text-left transition-all group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[#027A48] flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-[#12B76A]" />
                  Scenario: Repeatedly Enjoys Research
                </span>
                <Badge variant="mint" size="sm">Rule Test</Badge>
              </div>
              <p className="text-xs text-[#065F46] leading-relaxed">
                <strong>Rule:</strong> Amplifies investigative analysis, accessibility teardowns, and DX audit memos.
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleApplyPreset('urgent_job_hunt')}
              className="p-4 rounded-xl border border-[#E8E6DF] bg-white hover:bg-[#F8F8F5] text-left transition-all group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[#101828] flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#5B5BD6]" />
                  Scenario: Needs Job Urgently
                </span>
                <Badge variant="indigo" size="sm">Rule Test</Badge>
              </div>
              <p className="text-xs text-[#475467] leading-relaxed">
                <strong>Rule:</strong> Pivots directly to ATS resume plain-text export and STAR behavioral interview screens.
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleApplyPreset('exploring_curiosity')}
              className="p-4 rounded-xl border border-[#E8E6DF] bg-white hover:bg-[#F8F8F5] text-left transition-all group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[#101828] flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-[#21B47A]" />
                  Scenario: Has Time to Explore
                </span>
                <Badge variant="mint" size="sm">Rule Test</Badge>
              </div>
              <p className="text-xs text-[#475467] leading-relaxed">
                <strong>Rule:</strong> Focuses on multi-track curiosity comparisons and experimentation.
              </p>
            </button>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleApplyPreset('reset_default')}
              leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            >
              Reset to Live Student Baseline
            </Button>
          </div>
        </div>
      ) : (
        /* Live 9-Signal Matrix Tab */
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* 1. What the user says */}
            <div className="p-3.5 rounded-xl border border-[#E8E6DF] bg-[#F8F8F5] space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#101828]">
                <MessageSquare className="w-3.5 h-3.5 text-[#5B5BD6]" />
                <span>1. What You Say</span>
              </div>
              <p className="text-[11px] text-[#475467]">
                <strong>Goal:</strong> {signals.whatUserSays.statedGoal}
              </p>
              <p className="text-[11px] text-[#475467]">
                <strong>Urgency:</strong> {signals.whatUserSays.statedUrgency}
              </p>
              <p className="text-[11px] text-[#667085] truncate">
                <strong>Worry:</strong> {signals.whatUserSays.primaryWorry}
              </p>
            </div>

            {/* 2. What they choose */}
            <div className="p-3.5 rounded-xl border border-[#E8E6DF] bg-[#F8F8F5] space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#101828]">
                <Sliders className="w-3.5 h-3.5 text-[#5B5BD6]" />
                <span>2. What You Choose</span>
              </div>
              <p className="text-[11px] text-[#475467]">
                <strong>Track:</strong> {signals.whatTheyChoose.selectedTrack}
              </p>
              <p className="text-[11px] text-[#475467]">
                <strong>Learning Style:</strong> {signals.whatTheyChoose.learningStyle}
              </p>
              <p className="text-[11px] text-[#667085]">
                <strong>Time:</strong> {signals.whatTheyChoose.preferredTimeCommitment}
              </p>
            </div>

            {/* 3. What they enjoy */}
            <div className="p-3.5 rounded-xl border border-[#E8E6DF] bg-[#F8F8F5] space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#101828]">
                <Heart className="w-3.5 h-3.5 text-[#21B47A]" />
                <span>3. What You Enjoy</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {signals.whatTheyEnjoy.enjoyedTracks.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#E8F8F1] text-[#1B9A67]"
                  >
                    +{t}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-[#667085]">
                Research Affinity: {signals.whatTheyEnjoy.enjoysResearch ? 'High (Amplified)' : 'Standard'}
              </p>
            </div>

            {/* 4. What they avoid */}
            <div className="p-3.5 rounded-xl border border-[#E8E6DF] bg-[#F8F8F5] space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#101828]">
                <EyeOff className="w-3.5 h-3.5 text-[#F04438]" />
                <span>4. What You Avoid</span>
              </div>
              {signals.whatTheyAvoid.avoidedTracks.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {signals.whatTheyAvoid.avoidedTracks.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#FEE4E2] text-[#D92D20]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-[11px] text-[#98A2B3]">No avoided topics flagged yet</span>
              )}
            </div>

            {/* 5. What they complete */}
            <div className="p-3.5 rounded-xl border border-[#E8E6DF] bg-[#F8F8F5] space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#101828]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#21B47A]" />
                <span>5. What You Complete</span>
              </div>
              <p className="text-[11px] text-[#475467]">
                <strong>Tasks:</strong> {signals.whatTheyComplete.completedTasksCount}
              </p>
              <p className="text-[11px] text-[#475467]">
                <strong>Scenarios:</strong> {signals.whatTheyComplete.completedScenariosCount}
              </p>
              <p className="text-[11px] text-[#667085]">
                Verified Deliverables: {signals.howTheyPerform.verifiedDeliverablesCount}
              </p>
            </div>

            {/* 6. Where they struggle */}
            <div className="p-3.5 rounded-xl border border-[#E8E6DF] bg-[#F8F8F5] space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#101828]">
                <AlertTriangle className="w-3.5 h-3.5 text-[#D97706]" />
                <span>6. Where You Struggle</span>
              </div>
              {signals.whereTheyStruggle.struggleSkills.length > 0 ? (
                <div className="space-y-1">
                  {signals.whereTheyStruggle.struggleSkills.map((s, i) => (
                    <div key={i} className="text-[11px] text-[#92400E]">
                      <span className="font-semibold">{s.skill}</span>
                      <span className="block text-[10px] text-[#B45309]">
                        ⚡ Deconstructed into micro-drills
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-[11px] text-[#98A2B3]">No active struggle blocks</span>
              )}
            </div>

            {/* 7. How they perform */}
            <div className="p-3.5 rounded-xl border border-[#E8E6DF] bg-[#F8F8F5] space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#101828]">
                <Award className="w-3.5 h-3.5 text-[#5B5BD6]" />
                <span>7. How You Perform</span>
              </div>
              <p className="text-[11px] text-[#475467]">
                <strong>Interview Screen:</strong> {signals.howTheyPerform.averageInterviewScore}%
              </p>
              <p className="text-[11px] text-[#475467]">
                <strong>Scenario EQ:</strong> {signals.howTheyPerform.scenarioAccuracyScore}%
              </p>
              <p className="text-[11px] text-[#667085]">
                Tier: <span className="capitalize">{signals.howTheyPerform.performanceTier}</span>
              </p>
            </div>

            {/* 8. What skills they demonstrate */}
            <div className="p-3.5 rounded-xl border border-[#E8E6DF] bg-[#F8F8F5] space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#101828]">
                <Award className="w-3.5 h-3.5 text-[#21B47A]" />
                <span>8. Demonstrated Skills</span>
              </div>
              <p className="text-[11px] text-[#475467]">
                <strong>Unique Skills:</strong> {signals.whatSkillsTheyDemonstrate.uniqueSkillCount}
              </p>
              <div className="flex flex-wrap gap-1 max-h-12 overflow-hidden">
                {signals.whatSkillsTheyDemonstrate.verifiedSkills.slice(0, 4).map((sk) => (
                  <span
                    key={sk}
                    className="px-1.5 py-0.5 rounded text-[10px] bg-white border border-[#E8E6DF] text-[#344054]"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* 9. What opportunities they pursue */}
            <div className="p-3.5 rounded-xl border border-[#E8E6DF] bg-[#F8F8F5] space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#101828]">
                <Briefcase className="w-3.5 h-3.5 text-[#5B5BD6]" />
                <span>9. Pursued Opportunities</span>
              </div>
              <p className="text-[11px] text-[#475467]">
                <strong>Active Applications:</strong> {signals.whatOpportunitiesTheyPursue.activeApplicationsCount}
              </p>
              <p className="text-[11px] text-[#475467]">
                <strong>Saved Opportunities:</strong> {signals.whatOpportunitiesTheyPursue.savedJobsCount}
              </p>
              <p className="text-[11px] text-[#667085]">
                Pursuit Style: Simulations & Verified Proof
              </p>
            </div>
          </div>

          {/* Manual Skill Deconstruction Trigger */}
          <form
            onSubmit={handleCustomDeconstruction}
            className="p-3.5 rounded-xl bg-white border border-[#E8E6DF] flex flex-col sm:flex-row items-center gap-3"
          >
            <div className="text-xs text-[#475467] shrink-0">
              <span className="font-semibold text-[#101828] block">Deconstruct a Specific Skill:</span>
              <span className="text-[11px] text-[#667085]">
                Never struggle in silence. Break any intimidating skill into 10-minute micro-tasks.
              </span>
            </div>
            <div className="flex-1 w-full flex items-center gap-2">
              <input
                type="text"
                value={customStruggleInput}
                onChange={(e) => setCustomStruggleInput(e.target.value)}
                placeholder="e.g. Asynchronous Redux, Complex SQL joins, System Design"
                className="flex-1 px-3 py-1.5 rounded-lg border border-[#E8E6DF] text-xs focus:outline-none focus:ring-2 focus:ring-[#5B5BD6]"
              />
              <Button
                type="submit"
                variant="outline"
                size="sm"
                disabled={!customStruggleInput.trim() || isDeconstructing}
                leftIcon={<Plus className="w-3.5 h-3.5 text-[#5B5BD6]" />}
              >
                Break Down
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
