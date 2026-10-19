import React, { useState } from 'react';
import {
  Play,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Layers,
  X,
  Sparkles,
  FileText,
} from 'lucide-react';
import { TaskItem } from '../../types/tasks';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useToast } from '../ui/Toast';

export interface TaskExecutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: TaskItem | null;
  onCompleteTask?: (task: TaskItem, notes: string) => void;
}

export const TaskExecutionModal: React.FC<TaskExecutionModalProps> = ({
  isOpen,
  onClose,
  task,
  onCompleteTask,
}) => {
  const { toast } = useToast();
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [userDeliverableNotes, setUserDeliverableNotes] = useState('');

  if (!isOpen || !task) return null;

  const handleFinish = () => {
    onCompleteTask?.(task, userDeliverableNotes);
    toast.success('Task Completed & Logged!', `Proof artifact recorded for "${task.title}".`);
    onClose();
    setCurrentStepIdx(0);
    setUserDeliverableNotes('');
  };

  const handleClose = () => {
    onClose();
    setCurrentStepIdx(0);
    setUserDeliverableNotes('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-3 sm:p-4 text-left">
      <div className="fixed inset-0 bg-[#101828]/45 backdrop-blur-xs transition-opacity" onClick={handleClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-[#E8E6DF] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-[#E8E6DF] bg-[#F8F8F5]/80 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="mint" size="sm">
                Practical Execution
              </Badge>
              <span className="text-xs font-mono text-[#667085]">{task.time}</span>
              <span className="text-[#98A2B3]">·</span>
              <span className="text-xs text-[#667085]">{task.difficulty}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#101828]">
              {task.title}
            </h3>
          </div>
          <button onClick={handleClose} className="p-1 rounded text-[#98A2B3] hover:text-[#101828]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Why it matters banner */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#F0EEFF]/50 border-b border-[#E4E0FD] text-xs text-[#475467] leading-relaxed">
          <strong className="text-[#5B5BD6] font-semibold">Why this matters: </strong>
          {task.whyItMatters}
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-xs sm:text-sm">
          {/* Step guidance */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#101828]">
                Step {currentStepIdx + 1} of {task.steps.length}
              </span>
              <span className="text-xs text-[#667085]">
                {Math.round(((currentStepIdx + 1) / task.steps.length) * 100)}% complete
              </span>
            </div>

            <div className="p-4 bg-[#F8F8F5] rounded-xl border border-[#E8E6DF] text-sm text-[#101828] leading-relaxed font-medium">
              {task.steps[currentStepIdx]}
            </div>
          </div>

          {/* Expected Output */}
          <div className="p-3 bg-[#E8F8F1] border border-[#C6EFE0] rounded-xl text-xs text-[#1B9A67]">
            <strong className="block mb-0.5 font-semibold">Expected Proof Deliverable:</strong>
            {task.expectedOutput}
          </div>

          {/* Notes / Deliverable input */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-xs font-semibold text-[#101828]">
              Your Deliverable Work Notes or Reflection:
            </label>
            <textarea
              value={userDeliverableNotes}
              onChange={(e) => setUserDeliverableNotes(e.target.value)}
              placeholder="e.g. Completed step: wrote down the 3 core requirements and documented the 15-minute action..."
              className="w-full h-24 p-3 rounded-lg border border-[#E8E6DF] text-xs text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#5B5BD6]"
            />
            <p className="text-[11px] text-[#667085]">
              These notes are recorded directly to your Evidence Vault so you can reference them in interviews.
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
              else handleClose();
            }}
          >
            {currentStepIdx > 0 ? 'Previous Step' : 'Cancel'}
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
              Complete Task &amp; Save Proof
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
