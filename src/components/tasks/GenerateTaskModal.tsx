import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Compass,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Layers,
  Flame,
  Zap,
  Target,
  FileCheck,
  Code2,
  Play,
  RotateCcw,
} from 'lucide-react';
import {
  DynamicTask,
  TaskProgressionLevel,
  TaskFormatVariation,
  PROGRESSION_LEVEL_META,
  FORMAT_VARIATION_META,
} from '../../types/dynamicTask';
import { generatePersonalizedTask } from '../../services/dynamicTaskEngine';
import { buildCareerOSUserContext } from '../../services/aiContextService';
import { Button } from '../ui/Button';

export interface GenerateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated: (task: DynamicTask) => void;
  onLaunchTaskInWorkspace: (taskId: string) => void;
}

export const GenerateTaskModal: React.FC<GenerateTaskModalProps> = ({
  isOpen,
  onClose,
  onTaskCreated,
  onLaunchTaskInWorkspace,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<TaskProgressionLevel>('Beginner');
  const [selectedFormat, setSelectedFormat] = useState<TaskFormatVariation>('small_task');
  const [customSkill, setCustomSkill] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTask, setGeneratedTask] = useState<DynamicTask | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const context = buildCareerOSUserContext();

  const handleGenerate = async () => {
    setIsGenerating(true);
    setErrorMsg(null);

    try {
      const task = await generatePersonalizedTask({
        difficulty: selectedDifficulty,
        formatVariation: selectedFormat,
        targetSkill: customSkill.trim() || undefined,
      });

      setGeneratedTask(task);
      onTaskCreated(task);
    } catch (err: any) {
      console.error('Task generation failed:', err);
      setErrorMsg('Could not synthesize task. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleResetForAnother = () => {
    setGeneratedTask(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-[#E8E6DF] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-left">
        {/* Header */}
        <div className="p-5 border-b border-[#E8E6DF] flex items-center justify-between bg-[#F8F8F5]/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#5B5BD6] text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#101828]">
                  CareerOS Dynamic Task Engine
                </h2>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#EEEDFC] text-[#5B5BD6] border border-[#DDD9FA]">
                  Personalized AI
                </span>
              </div>
              <p className="text-xs text-[#667085]">
                Generates verifiable practice tasks tailored to your live evidence, skills, and pace
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#667085] hover:text-[#101828] hover:bg-[#E8E6DF] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {generatedTask ? (
            /* Generated Task Preview & Inspection */
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Validation & Simulation Badge Header */}
              <div className="flex items-center justify-between gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold">
                    Validated Against CareerOS Schema · 100% Safe Simulation
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-700 bg-white/80 px-2 py-0.5 rounded-md">
                  {generatedTask.difficulty} · {generatedTask.estimatedTime}
                </span>
              </div>

              {/* Task Title & Badges */}
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1.5">
                  <span className="text-xs px-2.5 py-0.5 rounded-md bg-[#5B5BD6] text-white font-semibold">
                    {FORMAT_VARIATION_META[generatedTask.formatVariation].label}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-md bg-[#FAF9F5] text-[#344054] border border-[#E8E6DF] font-medium">
                    {generatedTask.difficulty} Progression
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-md bg-purple-50 text-purple-800 border border-purple-200 font-medium">
                    Practice Simulation
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#101828]">{generatedTask.title}</h3>
                <p className="text-xs text-[#667085] mt-1">
                  Target Career: <strong className="text-[#101828]">{generatedTask.careerArea}</strong> · Primary Skill: <strong className="text-[#5B5BD6]">{generatedTask.skill}</strong>
                </p>
              </div>

              {/* Context & Objective */}
              <div className="bg-[#FAF9F5] border border-[#EFECE6] p-4 rounded-xl text-xs space-y-2.5">
                <div>
                  <span className="font-bold text-[#101828] block mb-0.5">Realistic Workplace Context:</span>
                  <p className="text-[#475467] leading-relaxed">{generatedTask.context}</p>
                </div>
                <div className="pt-2 border-t border-[#EFECE6]">
                  <span className="font-bold text-[#101828] block mb-0.5">Primary Objective:</span>
                  <p className="text-[#475467] leading-relaxed">{generatedTask.objective}</p>
                </div>
              </div>

              {/* Step-by-Step Instructions */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#98A2B3] mb-2">
                  Actionable Step Instructions ({generatedTask.instructions.length} Steps)
                </h4>
                <div className="space-y-2">
                  {generatedTask.instructions.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white border border-[#E8E6DF] rounded-xl text-xs text-[#344054] flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#EEEDFC] text-[#5B5BD6] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expected Output Deliverable */}
              <div className="p-3.5 bg-blue-50/60 border border-blue-200 rounded-xl text-xs text-blue-900 space-y-1">
                <span className="font-bold flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-blue-700" />
                  Expected Verifiable Output Deliverable:
                </span>
                <p className="text-blue-800 leading-relaxed">{generatedTask.expectedOutput}</p>
              </div>

              {/* Evaluation Criteria & Hints */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-[#FCFCFA] border border-[#E8E6DF] rounded-xl space-y-1.5">
                  <span className="font-bold text-[#101828]">Evaluation Pass Criteria:</span>
                  <ul className="list-disc pl-4 space-y-1 text-[#475467]">
                    {generatedTask.evaluationCriteria.map((crit, idx) => (
                      <li key={idx}>{crit}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-3.5 bg-[#FCFCFA] border border-[#E8E6DF] rounded-xl space-y-1.5">
                  <span className="font-bold text-[#101828]">Common Beginner Trap to Avoid:</span>
                  <p className="text-[#475467] leading-relaxed">
                    {generatedTask.commonMistakes[0] || 'Over-complicating the solution before testing.'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#F2F0E8] flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleResetForAnother}
                  className="py-2 px-3 text-xs font-semibold text-[#5B5BD6] hover:bg-[#EEEDFC] rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Generate Another Task
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="py-2 px-3.5 text-xs font-semibold rounded-lg border border-[#D0CFC8] text-[#344054] hover:bg-[#F9F8F6] transition-colors cursor-pointer"
                  >
                    Keep in Task List
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onLaunchTaskInWorkspace(generatedTask.id);
                      onClose();
                    }}
                    className="py-2 px-4 text-xs font-semibold rounded-lg bg-[#5B5BD6] text-white hover:bg-[#4949C0] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Open in Task Workspace Now
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Generation Configuration Form */
            <div className="space-y-6">
              {/* Context Summary Pill */}
              <div className="bg-[#FAF9F5] border border-[#EFECE6] p-4 rounded-xl text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#101828]">
                  <Target className="w-4 h-4 text-[#5B5BD6]" />
                  <span>Synthesizing from Your CareerOS Evidence & Profile</span>
                </div>
                <div className="text-[#475467] leading-relaxed grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-[#98A2B3]">Career Goal:</span> {context.goal}
                  </div>
                  <div>
                    <span className="text-[#98A2B3]">Experience:</span> {context.profile.currentLevel}
                  </div>
                  <div>
                    <span className="text-[#98A2B3]">Available Time:</span> {context.availableTime}
                  </div>
                  <div>
                    <span className="text-[#98A2B3]">Evidence Proofs:</span> {context.careerEvidence.length} in vault
                  </div>
                </div>
              </div>

              {/* Progression Level Selector (Starter -> Beginner -> Intermediate -> Advanced) */}
              <div>
                <label className="block text-xs font-bold text-[#101828] mb-1.5">
                  1. Difficulty Progression Level
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['Starter', 'Beginner', 'Intermediate', 'Advanced'] as TaskProgressionLevel[]).map((lvl) => {
                    const isSelected = selectedDifficulty === lvl;
                    const meta = PROGRESSION_LEVEL_META[lvl];
                    return (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setSelectedDifficulty(lvl)}
                        className={`p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
                          isSelected
                            ? 'border-[#5B5BD6] bg-[#EEEDFC] text-[#5B5BD6] shadow-xs'
                            : 'border-[#E8E6DF] bg-white text-[#475467] hover:bg-[#FAF9F5]'
                        }`}
                      >
                        <div className="font-bold flex items-center justify-between">
                          <span>{lvl}</span>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                        <div className="text-[10px] text-[#667085] mt-1 line-clamp-2">
                          {meta.summary}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Task Format Variation Selector */}
              <div>
                <label className="block text-xs font-bold text-[#101828] mb-1.5">
                  2. Task Format Variation
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(
                    [
                      'quick_task',
                      'small_task',
                      'medium_task',
                      'project',
                      'challenge',
                      'simulation',
                    ] as TaskFormatVariation[]
                  ).map((fmt) => {
                    const isSelected = selectedFormat === fmt;
                    const meta = FORMAT_VARIATION_META[fmt];
                    return (
                      <button
                        key={fmt}
                        type="button"
                        onClick={() => setSelectedFormat(fmt)}
                        className={`p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
                          isSelected
                            ? 'border-[#5B5BD6] bg-[#EEEDFC] text-[#5B5BD6] shadow-xs'
                            : 'border-[#E8E6DF] bg-white text-[#475467] hover:bg-[#FAF9F5]'
                        }`}
                      >
                        <div className="font-bold flex items-center justify-between">
                          <span>{meta.label}</span>
                          <span className="text-[10px] font-mono text-[#98A2B3]">{meta.timeRange}</span>
                        </div>
                        <div className="text-[10px] text-[#667085] mt-1 line-clamp-2">
                          {meta.description}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional Custom Skill Override */}
              <div>
                <label className="block text-xs font-bold text-[#101828] mb-1">
                  3. Specific Skill Target (Optional)
                </label>
                <input
                  type="text"
                  value={customSkill}
                  onChange={(e) => setCustomSkill(e.target.value)}
                  placeholder={`Leave empty to auto-select from ${context.skills.slice(0, 3).join(', ')}`}
                  className="w-full text-xs p-2.5 rounded-lg border border-[#D0CFC8] focus:outline-hidden focus:ring-2 focus:ring-[#5B5BD6] text-[#101828]"
                />
              </div>

              {/* Safety & Compliance Notice */}
              <div className="flex items-start gap-2.5 p-3 bg-[#FAF9F5] border border-[#EFECE6] rounded-xl text-xs text-[#475467]">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed text-[11px]">
                  <strong>CareerOS Safety Standard:</strong> Every generated task is strictly
                  validated against our structured schema. No unsafe, exploitative, or impossible
                  tasks are permitted. All simulated workplace drills are transparently marked as
                  practice simulations.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

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
                  type="button"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="py-2 px-5 text-xs font-semibold rounded-lg bg-[#5B5BD6] text-white hover:bg-[#4949C0] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5 animate-spin" />
                      Synthesizing Task for {context.goal}...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      Generate Personalized Task
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
