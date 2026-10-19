import React, { useState } from 'react';
import { Plus, X, Link, Calendar, CheckSquare, Sparkles, ShieldCheck } from 'lucide-react';
import { EvidenceItem, EvidenceCategory } from '../../types/evidence';
import { Button } from '../ui/Button';
import { Dialog } from '../ui/Dialog';
import { useToast } from '../ui/Toast';

export interface AddEvidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvidence: (item: EvidenceItem) => void;
}

export const CATEGORY_OPTIONS: Array<{ id: EvidenceCategory; label: string }> = [
  { id: 'tasks', label: 'Task' },
  { id: 'projects', label: 'Project' },
  { id: 'challenges', label: 'Challenge' },
  { id: 'practice', label: 'Practice Drill' },
  { id: 'teamwork', label: 'Teamwork' },
  { id: 'communication', label: 'Communication Activity' },
  { id: 'leadership', label: 'Leadership Activity' },
  { id: 'mentor_feedback', label: 'Mentor Feedback' },
  { id: 'interview_practice', label: 'Interview Practice' },
  { id: 'certifications', label: 'Certification' },
  { id: 'other', label: 'Other Verified Experience' },
];

export const AddEvidenceModal: React.FC<AddEvidenceModalProps> = ({
  isOpen,
  onClose,
  onAddEvidence,
}) => {
  const { toast } = useToast();

  const [category, setCategory] = useState<EvidenceCategory>('projects');
  const [activity, setActivity] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [skillsInput, setSkillsInput] = useState('');
  const [output, setOutput] = useState('');
  const [reflection, setReflection] = useState('');
  const [feedback, setFeedback] = useState('');
  const [evidenceLink, setEvidenceLink] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!activity.trim()) {
      toast.warning('Activity Required', 'Please describe the genuine activity you completed.');
      return;
    }
    if (!output.trim()) {
      toast.warning('Output Required', 'Please record what you actually built, produced, or demonstrated.');
      return;
    }
    if (!reflection.trim()) {
      toast.warning('Reflection Required', 'Please share one takeaway or lesson learned.');
      return;
    }

    const skillsPracticed = skillsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const newItem: EvidenceItem = {
      id: `ev-manual-${Date.now()}`,
      category,
      activity: activity.trim(),
      date: date || new Date().toISOString().split('T')[0],
      skillsPracticed: skillsPracticed.length > 0 ? skillsPracticed : ['General Problem Solving'],
      output: output.trim(),
      reflection: reflection.trim(),
      feedback: feedback.trim() || undefined,
      evidenceLink: evidenceLink.trim() || undefined,
      sourceType: 'manual_student',
      verificationBadge: 'Self-Documented',
      inPortfolio: true,
      inResume: true,
    };

    onAddEvidence(newItem);
    toast.success('Career Proof Added!', 'Logged to your Career Evidence Timeline.');
    onClose();

    // Reset form
    setActivity('');
    setOutput('');
    setReflection('');
    setFeedback('');
    setEvidenceLink('');
    setSkillsInput('');
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Record Genuine Career Evidence"
      description="Document an authentic activity you completed. Ground every field in true artifacts and outputs."
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-left text-xs sm:text-sm">
        {/* Category & Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#101828]">
              Evidence Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as EvidenceCategory)}
              className="w-full px-3 py-2 bg-white border border-[#D3D0C6] rounded-xl text-xs sm:text-sm text-[#101828] focus:outline-none focus:ring-1 focus:ring-[#5B5BD6]"
            >
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#101828]">
              Date Completed *
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#D3D0C6] rounded-xl text-xs sm:text-sm text-[#101828] focus:outline-none focus:ring-1 focus:ring-[#5B5BD6]"
            />
          </div>
        </div>

        {/* Activity */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#101828]">
            Activity Description *
          </label>
          <input
            type="text"
            placeholder="e.g. Conducted usability testing on 3 peers for mobile navigation drawer"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-[#D3D0C6] rounded-xl text-xs sm:text-sm text-[#101828] focus:outline-none focus:ring-1 focus:ring-[#5B5BD6]"
          />
        </div>

        {/* Skills Practiced */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#101828]">
            Skills Practiced (comma separated)
          </label>
          <input
            type="text"
            placeholder="e.g. Usability Testing, Figma, Qualitative Synthesis, Active Listening"
            value={skillsInput}
            onChange={(e) => setSkillsInput(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-[#D3D0C6] rounded-xl text-xs sm:text-sm text-[#101828] focus:outline-none focus:ring-1 focus:ring-[#5B5BD6]"
          />
        </div>

        {/* Verifiable Output */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#101828]">
            Verifiable Output / Deliverable *
          </label>
          <textarea
            rows={2}
            placeholder="What tangible artifact was created? (e.g. 5-slide summary deck synthesizing 3 common navigation bottlenecks with Figma before/after mockups)"
            value={output}
            onChange={(e) => setOutput(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-[#D3D0C6] rounded-xl text-xs sm:text-sm text-[#101828] focus:outline-none focus:ring-1 focus:ring-[#5B5BD6]"
          />
        </div>

        {/* Reflection */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#101828]">
            Personal Reflection & Learning *
          </label>
          <textarea
            rows={2}
            placeholder="What did you learn? What would you do differently next time?"
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-[#D3D0C6] rounded-xl text-xs sm:text-sm text-[#101828] focus:outline-none focus:ring-1 focus:ring-[#5B5BD6]"
          />
        </div>

        {/* Optional Feedback */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#101828]">
            Evaluator / Mentor / Peer Feedback (optional)
          </label>
          <input
            type="text"
            placeholder="e.g. Mentor noted strong clarity on user pain points and clear action steps."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-[#D3D0C6] rounded-xl text-xs sm:text-sm text-[#101828] focus:outline-none focus:ring-1 focus:ring-[#5B5BD6]"
          />
        </div>

        {/* Optional Evidence Link */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#101828]">
            Evidence Link (URL to repo, deployment, Figma, or Loom)
          </label>
          <input
            type="url"
            placeholder="https://github.com/... or https://figma.com/..."
            value={evidenceLink}
            onChange={(e) => setEvidenceLink(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-[#D3D0C6] rounded-xl text-xs sm:text-sm text-[#101828] focus:outline-none focus:ring-1 focus:ring-[#5B5BD6]"
          />
        </div>

        {/* Form Actions */}
        <div className="pt-3 border-t border-[#E8E6DF] flex items-center justify-end gap-2.5">
          <Button variant="ghost" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="md" type="submit" leftIcon={<Plus className="w-4 h-4" />}>
            Save to Career Evidence
          </Button>
        </div>
      </form>
    </Dialog>
  );
};
