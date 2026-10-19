import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  X,
} from 'lucide-react';
import {
  AIAssistanceAction,
  AIAssistanceResult,
  ResumeData,
  ResumeSectionType,
} from '../../types/resume';
import {
  runResumeAIAssistance,
  runResumeAIAssistanceAsync,
} from '../../services/resumeService';
import { Button } from '../ui/Button';

export interface AIAssistanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  resume: ResumeData;
  initialAction?: AIAssistanceAction;
  initialSection?: ResumeSectionType;
  initialItemId?: string;
  onApplyImprovement: (result: AIAssistanceResult) => void;
}

const AI_ACTIONS: Array<{
  id: AIAssistanceAction;
  label: string;
  description: string;
  section: ResumeSectionType;
}> = [
  {
    id: 'improve_summary',
    label: 'Improve Summary',
    description: 'Elevates profile punchiness using verified deliverables; eliminates cliché filler.',
    section: 'summary',
  },
  {
    id: 'improve_project_description',
    label: 'Improve Project Description',
    description: 'Restructures bullets into Google XYZ format (Action + Context + Deliverable).',
    section: 'projects',
  },
  {
    id: 'improve_skill_relevance',
    label: 'Improve Skill Relevance',
    description: 'Prioritizes skills backed by verified Career Evidence over generic assertions.',
    section: 'skills',
  },
  {
    id: 'improve_clarity',
    label: 'Improve Clarity',
    description: 'Trims corporate fluff, passive voice ("was responsible for"), and run-ons.',
    section: 'summary',
  },
  {
    id: 'remove_repetition',
    label: 'Remove Repetition',
    description: 'Replaces repetitive opening verbs ("Built...", "Built...") with varied technical verbs.',
    section: 'projects',
  },
];

export const AIAssistanceModal: React.FC<AIAssistanceModalProps> = ({
  isOpen,
  onClose,
  resume,
  initialAction = 'improve_summary',
  initialSection = 'summary',
  initialItemId,
  onApplyImprovement,
}) => {
  const [selectedAction, setSelectedAction] = useState<AIAssistanceAction>(initialAction);
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>(
    initialItemId || resume.projects[0]?.id
  );
  const [result, setResult] = useState<AIAssistanceResult>(() =>
    runResumeAIAssistance(initialAction, {
      resume,
      targetSection: initialSection,
      targetItemId: initialItemId || resume.projects[0]?.id,
    })
  );
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleRunAction = async (actionId: AIAssistanceAction) => {
    setSelectedAction(actionId);
    const targetSec =
      actionId === 'improve_project_description' || actionId === 'remove_repetition'
        ? 'projects'
        : actionId === 'improve_skill_relevance'
        ? 'skills'
        : 'summary';

    const instantResult = runResumeAIAssistance(actionId, {
      resume,
      targetSection: targetSec,
      targetItemId: selectedItemId,
    });
    setResult(instantResult);

    try {
      const aiResult = await runResumeAIAssistanceAsync(actionId, {
        resume,
        targetSection: targetSec,
        targetItemId: selectedItemId,
      });
      setResult(aiResult);
    } catch {}
  };

  const handleApply = () => {
    onApplyImprovement(result);
    onClose();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result.suggestedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl border border-[#E8E6DF] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col text-left">
        {/* Modal Header */}
        <div className="p-6 border-b border-[#E8E6DF] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#5B5BD6] text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-base font-bold text-[#101828]">
                CareerOS AI Resume Enhancement
              </h3>
              <p className="text-xs text-[#667085]">
                Strictly faithful to your Career Evidence • Never invents facts
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#667085] hover:text-[#101828] hover:bg-[#F4F3EF] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Selector Pills */}
        <div className="p-4 border-b border-[#E8E6DF] bg-[#FAF9F5] flex items-center gap-1.5 overflow-x-auto">
          {AI_ACTIONS.map((act) => {
            const isSelected = selectedAction === act.id;
            return (
              <button
                key={act.id}
                onClick={() => handleRunAction(act.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#5B5BD6] text-white shadow-xs'
                    : 'bg-white border border-[#E8E6DF] text-[#475467] hover:border-[#D0D5DD] hover:text-[#101828]'
                }`}
              >
                {act.label}
              </button>
            );
          })}
        </div>

        {/* Project selector if improving project description */}
        {(selectedAction === 'improve_project_description' || selectedAction === 'remove_repetition') &&
          resume.projects.length > 1 && (
            <div className="px-6 pt-4 flex items-center gap-2 text-xs">
              <span className="font-semibold text-[#667085]">Target Project:</span>
              <select
                value={selectedItemId}
                onChange={(e) => {
                  setSelectedItemId(e.target.value);
                  const newResult = runResumeAIAssistance(selectedAction, {
                    resume,
                    targetSection: 'projects',
                    targetItemId: e.target.value,
                  });
                  setResult(newResult);
                }}
                className="px-2.5 py-1 rounded-md border border-[#D0D5DD] bg-white text-xs text-[#101828]"
              >
                {resume.projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>
          )}

        {/* Body Content */}
        <div className="p-6 space-y-5 flex-1">
          {/* Diagnostic & Guarantee Banner */}
          <div className="p-3.5 rounded-xl bg-[#F0EEFF] border border-[#E0E0FC] flex items-start gap-2.5 text-xs text-[#475467]">
            <ShieldCheck className="w-4 h-4 text-[#5B5BD6] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <strong className="text-[#5B5BD6] font-semibold block">
                Evidence Fidelity Guarantee:
              </strong>
              <p className="leading-relaxed">
                {result.guardrailNote}
              </p>
            </div>
          </div>

          {/* Diff Grid: Original vs Suggested */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Original Draft */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#667085]">
                Current Draft
              </span>
              <div className="p-3.5 rounded-xl bg-[#F8F8F5] border border-[#E8E6DF] text-xs text-[#475467] min-h-[140px] whitespace-pre-wrap leading-relaxed font-sans">
                {result.originalContent || '(Empty or default content)'}
              </div>
            </div>

            {/* Suggested Upgrade */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#027A48] flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Polished Upgrade
                </span>
                <button
                  onClick={handleCopy}
                  className="text-[11px] text-[#5B5BD6] hover:underline flex items-center gap-1"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F6FEF9] border border-[#A6F4C5] text-xs text-[#054F31] min-h-[140px] whitespace-pre-wrap leading-relaxed font-sans">
                {result.suggestedContent}
              </div>
            </div>
          </div>

          {/* Rationale & Improvements Applied */}
          <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E8E6DF] space-y-2 text-xs">
            <h4 className="font-bold text-[#101828] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#21B47A]" />
              Why This Works Better:
            </h4>
            <p className="text-[#475467] leading-relaxed">
              {result.explanation}
            </p>

            <div className="pt-2 flex flex-wrap gap-1.5">
              {result.improvementsApplied.map((item, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-white border border-[#E8E6DF] text-[10px] text-[#344054] font-medium"
                >
                  ✓ {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-[#E8E6DF] bg-white flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={onClose}>
            Keep Current
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleApply}
            leftIcon={<Sparkles className="w-3.5 h-3.5" />}
          >
            Apply to Resume
          </Button>
        </div>
      </div>
    </div>
  );
};
