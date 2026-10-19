import React, { useState } from 'react';
import {
  Play,
  Rocket,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Layers,
  X,
  FileCheck,
} from 'lucide-react';
import { PracticalTaskRec, SmallProjectRec, SkillBuildingActivityRec } from '../../types/skillToAction';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { useToast } from '../ui/Toast';

// 1. "Try This" Task Runner Modal
export interface TryThisModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: PracticalTaskRec | null;
  onCompleteTask?: (task: PracticalTaskRec) => void;
}

export const TryThisModal: React.FC<TryThisModalProps> = ({
  isOpen,
  onClose,
  task,
  onCompleteTask,
}) => {
  const { toast } = useToast();
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [reflectionInput, setReflectionInput] = useState('');

  if (!isOpen || !task) return null;

  const handleFinish = () => {
    onCompleteTask?.(task);
    toast.success('Task Completed!', `Artifact recorded for "${task.title}".`);
    onClose();
    setCurrentStepIdx(0);
    setReflectionInput('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-3 sm:p-4 text-left">
      <div className="fixed inset-0 bg-[#101828]/45 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-white rounded-2xl border border-[#E8E6DF] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-[#E8E6DF] bg-[#F8F8F5]/80 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="mint" size="sm">
                Try This · Action Mode
              </Badge>
              <span className="text-xs text-[#667085] font-mono">{task.timeEstimate}</span>
            </div>
            <h3 className="text-lg font-bold text-[#101828]">{task.title}</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded text-[#98A2B3] hover:text-[#101828]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Why this fits you callout */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#F0EEFF]/50 border-b border-[#E4E0FD] text-xs text-[#475467]">
          <strong className="text-[#5B5BD6] font-semibold">Why this fits you: </strong>
          {task.whyThisFitsYou}
        </div>

        {/* Body Steps */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs sm:text-sm">
          <div className="space-y-2">
            <h4 className="font-semibold text-[#101828]">Step {currentStepIdx + 1} of {task.steps.length}</h4>
            <div className="p-3.5 bg-[#F8F8F5] rounded-xl border border-[#E8E6DF] text-[#101828] leading-relaxed">
              {task.steps[currentStepIdx]}
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="block text-xs font-semibold text-[#101828]">
              Your Proof Reflection or Deliverable Notes:
            </label>
            <textarea
              value={reflectionInput}
              onChange={(e) => setReflectionInput(e.target.value)}
              placeholder="e.g. Completed step 1: found role on LinkedIn and isolated 3 core requirements..."
              className="w-full h-24 p-3 rounded-lg border border-[#E8E6DF] text-xs text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#5B5BD6]"
            />
            <p className="text-[11px] text-[#667085]">
              Deliverable goal: {task.deliverable}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:px-6 border-t border-[#E8E6DF] bg-white flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (currentStepIdx > 0) setCurrentStepIdx(currentStepIdx - 1);
              else onClose();
            }}
          >
            {currentStepIdx > 0 ? 'Previous' : 'Cancel'}
          </Button>

          {currentStepIdx < task.steps.length - 1 ? (
            <Button
              variant="primary"
              size="md"
              onClick={() => setCurrentStepIdx(currentStepIdx + 1)}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Next Step
            </Button>
          ) : (
            <Button
              variant="mint"
              size="md"
              onClick={handleFinish}
              leftIcon={<CheckCircle2 className="w-4 h-4" />}
            >
              Complete &amp; Save Proof
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

// 2. "Give Me a Project Idea" Project Synthesizer Modal
export interface ProjectIdeaModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: SmallProjectRec | null;
  onAddToRoadmap?: (project: SmallProjectRec) => void;
}

export const ProjectIdeaModal: React.FC<ProjectIdeaModalProps> = ({
  isOpen,
  onClose,
  project,
  onAddToRoadmap,
}) => {
  const { toast } = useToast();

  if (!isOpen || !project) return null;

  const handleCommit = () => {
    onAddToRoadmap?.(project);
    toast.success('Project Added to Roadmap', `"${project.title}" queued for proof building.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-3 sm:p-4 text-left">
      <div className="fixed inset-0 bg-[#101828]/45 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-[#E8E6DF] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-[#E8E6DF] bg-[#F8F8F5]/80 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="indigo" size="sm">
                Project Synthesizer
              </Badge>
              <span className="text-xs font-mono text-[#667085]">{project.timeCommitment}</span>
            </div>
            <h3 className="text-xl font-bold text-[#101828]">{project.title}</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded text-[#98A2B3] hover:text-[#101828]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Why this fits you callout */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#F0EEFF]/50 border-b border-[#E4E0FD] text-xs text-[#475467]">
          <strong className="text-[#5B5BD6] font-semibold">Why this fits you: </strong>
          {project.whyThisFitsYou}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-xs sm:text-sm">
          {/* Problem Statement */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#667085]">
              Real-World Problem to Solve
            </h4>
            <p className="text-sm text-[#101828] bg-[#F8F8F5] p-3 rounded-xl border border-[#E8E6DF] leading-relaxed">
              {project.problemStatement}
            </p>
          </div>

          {/* Concrete Deliverables */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#101828]">
              Tangible Deliverables
            </h4>
            <ul className="space-y-1.5 pl-0 list-none">
              {project.concreteDeliverables.map((deliv, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-[#475467]">
                  <CheckCircle2 className="w-4 h-4 text-[#21B47A] shrink-0 mt-0.5" />
                  <span>{deliv}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Milestones */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#5B5BD6]">
              Step-by-Step Milestones
            </h4>
            <div className="space-y-2">
              {project.milestones.map((m, idx) => (
                <div key={idx} className="p-3 bg-white border border-[#E8E6DF] rounded-xl flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#101828]">{m.step}</span>
                  <span className="text-[#667085]">{m.output}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Evidence Vault Outcome */}
          <div className="p-3 bg-[#E8F8F1] border border-[#C6EFE0] rounded-xl text-xs text-[#1B9A67]">
            <strong className="block mb-0.5">Proof for your resume / portfolio:</strong>
            {project.evidenceProofOutcome}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:px-6 border-t border-[#E8E6DF] bg-white flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Back
          </Button>
          <Button variant="primary" size="md" onClick={handleCommit} rightIcon={<Rocket className="w-4 h-4" />}>
            Add Project to My Plan
          </Button>
        </div>
      </div>
    </div>
  );
};

// 3. "What Should I Learn Next?" Skill Gap Modal
export interface LearnNextModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity: SkillBuildingActivityRec | null;
}

export const LearnNextModal: React.FC<LearnNextModalProps> = ({
  isOpen,
  onClose,
  activity,
}) => {
  const { toast } = useToast();

  if (!isOpen || !activity) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-3 sm:p-4 text-left">
      <div className="fixed inset-0 bg-[#101828]/45 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-2xl border border-[#E8E6DF] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 sm:px-6 border-b border-[#E8E6DF] bg-[#F8F8F5]/80 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="indigo" size="sm">
                Skill Unlock
              </Badge>
              <span className="text-xs font-mono text-[#667085]">{activity.timeToAcquire}</span>
            </div>
            <h3 className="text-lg font-bold text-[#101828]">{activity.skillName}</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded text-[#98A2B3] hover:text-[#101828]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 text-xs sm:text-sm">
          <div className="p-3 rounded-xl bg-[#F0EEFF]/50 border border-[#E4E0FD] text-xs text-[#475467] leading-relaxed">
            <strong className="text-[#5B5BD6] font-semibold block mb-0.5">Why this fits you:</strong>
            {activity.whyThisFitsYou}
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#101828]">
              Recommended 15-Minute Starting Action
            </h4>
            <div className="p-3.5 bg-[#F8F8F5] rounded-xl border border-[#E8E6DF] text-sm text-[#101828] leading-relaxed">
              {activity.recommendedStartingAction}
            </div>
          </div>
        </div>

        <div className="p-4 sm:px-6 border-t border-[#E8E6DF] bg-white flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              toast.success('Skill added to goals', `Tracking ${activity.skillName} in your learning queue.`);
              onClose();
            }}
          >
            Add to Learning Queue
          </Button>
        </div>
      </div>
    </div>
  );
};
