import React, { useState } from 'react';
import {
  ResumeData,
  ResumeSectionType,
  AIAssistanceAction,
  ResumeProject,
  ResumeExperience,
  ResumeEducation,
  ResumeCertification,
  ResumeAchievement,
} from '../../types/resume';
import {
  Sparkles,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  ArrowDown,
  ShieldCheck,
  RotateCcw,
  ExternalLink,
  Code,
  Briefcase,
  GraduationCap,
  Award,
  Layers,
  User,
  FileText,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Input, Textarea } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { getEvidenceItems } from '../../services/evidenceService';

export interface ResumeEditorPanelProps {
  resume: ResumeData;
  onChange: (updated: ResumeData) => void;
  onOpenAI: (action: AIAssistanceAction, section: ResumeSectionType, itemId?: string) => void;
  onResetFromEvidence: () => void;
}

export const ResumeEditorPanel: React.FC<ResumeEditorPanelProps> = ({
  resume,
  onChange,
  onOpenAI,
  onResetFromEvidence,
}) => {
  const [activeSection, setActiveSection] = useState<ResumeSectionType | 'contact' | 'reorder'>('summary');
  const allEvidence = getEvidenceItems();

  // Helper updates
  const updateContact = (field: keyof typeof resume.contact, value: string) => {
    onChange({
      ...resume,
      contact: {
        ...resume.contact,
        [field]: value,
      },
    });
  };

  const updateSummary = (value: string) => {
    onChange({
      ...resume,
      summary: value,
    });
  };

  const moveSection = (idx: number, direction: 'up' | 'down') => {
    const order = [...resume.sectionOrder];
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= order.length) return;
    const temp = order[idx];
    order[idx] = order[targetIdx];
    order[targetIdx] = temp;
    onChange({ ...resume, sectionOrder: order });
  };

  // Skill updates
  const addSkill = (category: 'technical' | 'toolsAndFrameworks' | 'softAndProfessional', skill: string) => {
    if (!skill.trim()) return;
    const current = resume.skills[category];
    if (current.includes(skill.trim())) return;
    onChange({
      ...resume,
      skills: {
        ...resume.skills,
        [category]: [...current, skill.trim()],
      },
    });
  };

  const removeSkill = (category: 'technical' | 'toolsAndFrameworks' | 'softAndProfessional', skill: string) => {
    onChange({
      ...resume,
      skills: {
        ...resume.skills,
        [category]: resume.skills[category].filter((s) => s !== skill),
      },
    });
  };

  // Project updates
  const addProject = () => {
    const newProj: ResumeProject = {
      id: `proj-manual-${Date.now()}`,
      title: 'New Engineering Project',
      role: 'Frontend / Full-Stack Developer',
      techStack: ['React', 'TypeScript', 'Tailwind CSS'],
      bullets: [
        'Architected and implemented responsive component interface with clean state architecture.',
        'Enforced strict WCAG 2.1 AA accessibility standards and keyboard-navigable UX.',
      ],
      isFromEvidence: false,
    };
    onChange({
      ...resume,
      projects: [newProj, ...resume.projects],
    });
  };

  const updateProject = (id: string, updates: Partial<ResumeProject>) => {
    onChange({
      ...resume,
      projects: resume.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    });
  };

  const deleteProject = (id: string) => {
    onChange({
      ...resume,
      projects: resume.projects.filter((p) => p.id !== id),
    });
  };

  // Experience updates
  const addExperience = () => {
    const newExp: ResumeExperience = {
      id: `exp-${Date.now()}`,
      company: 'Company / Organization Name',
      role: 'Junior Software Engineer',
      location: 'Remote',
      startDate: '2026-01',
      endDate: 'Present',
      current: true,
      bullets: [
        'Coordinated with team members on weekly sprints, feature releases, and pull request reviews.',
      ],
    };
    onChange({
      ...resume,
      experience: [newExp, ...resume.experience],
    });
  };

  const updateExperience = (id: string, updates: Partial<ResumeExperience>) => {
    onChange({
      ...resume,
      experience: resume.experience.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    });
  };

  const deleteExperience = (id: string) => {
    onChange({
      ...resume,
      experience: resume.experience.filter((e) => e.id !== id),
    });
  };

  // Education updates
  const updateEducation = (id: string, updates: Partial<ResumeEducation>) => {
    onChange({
      ...resume,
      education: resume.education.map((edu) => (edu.id === id ? { ...edu, ...updates } : edu)),
    });
  };

  const addEducation = () => {
    const newEdu: ResumeEducation = {
      id: `edu-${Date.now()}`,
      institution: 'University / College',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      startDate: '2023',
      endDate: '2026',
    };
    onChange({
      ...resume,
      education: [...resume.education, newEdu],
    });
  };

  // Evidence highlights toggling
  const toggleEvidenceHighlight = (evidenceId: string) => {
    const existing = resume.evidenceHighlights.find((h) => h.evidenceId === evidenceId);
    if (existing) {
      onChange({
        ...resume,
        evidenceHighlights: resume.evidenceHighlights.filter((h) => h.evidenceId !== evidenceId),
      });
    } else {
      const source = allEvidence.find((e) => e.id === evidenceId);
      if (!source) return;
      const newHighlight = {
        id: `hl-${source.id}`,
        evidenceId: source.id,
        title: source.activity,
        category: source.category,
        date: source.date,
        outputSummary: source.output,
        skills: source.skillsPracticed,
        verificationBadge: source.verificationBadge,
        link: source.evidenceLink,
      };
      onChange({
        ...resume,
        evidenceHighlights: [...resume.evidenceHighlights, newHighlight],
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E8E6DF] shadow-xs overflow-hidden flex flex-col h-full text-left">
      {/* Tab Selector Header */}
      <div className="p-3 border-b border-[#E8E6DF] bg-[#FAF9F5] flex items-center gap-1.5 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveSection('contact')}
          className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
            activeSection === 'contact'
              ? 'bg-[#101828] text-white shadow-xs'
              : 'text-[#667085] hover:text-[#101828] hover:bg-[#E8E6DF]'
          }`}
        >
          Contact & Role
        </button>
        <button
          onClick={() => setActiveSection('summary')}
          className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
            activeSection === 'summary'
              ? 'bg-[#101828] text-white shadow-xs'
              : 'text-[#667085] hover:text-[#101828] hover:bg-[#E8E6DF]'
          }`}
        >
          Summary
        </button>
        <button
          onClick={() => setActiveSection('skills')}
          className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
            activeSection === 'skills'
              ? 'bg-[#101828] text-white shadow-xs'
              : 'text-[#667085] hover:text-[#101828] hover:bg-[#E8E6DF]'
          }`}
        >
          Skills ({resume.skills.technical.length})
        </button>
        <button
          onClick={() => setActiveSection('projects')}
          className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
            activeSection === 'projects'
              ? 'bg-[#101828] text-white shadow-xs'
              : 'text-[#667085] hover:text-[#101828] hover:bg-[#E8E6DF]'
          }`}
        >
          Projects ({resume.projects.length})
        </button>
        <button
          onClick={() => setActiveSection('experience')}
          className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
            activeSection === 'experience'
              ? 'bg-[#101828] text-white shadow-xs'
              : 'text-[#667085] hover:text-[#101828] hover:bg-[#E8E6DF]'
          }`}
        >
          Experience ({resume.experience.length})
        </button>
        <button
          onClick={() => setActiveSection('evidence')}
          className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
            activeSection === 'evidence'
              ? 'bg-[#101828] text-white shadow-xs'
              : 'text-[#667085] hover:text-[#101828] hover:bg-[#E8E6DF]'
          }`}
        >
          Evidence Highlights
        </button>
        <button
          onClick={() => setActiveSection('education')}
          className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
            activeSection === 'education'
              ? 'bg-[#101828] text-white shadow-xs'
              : 'text-[#667085] hover:text-[#101828] hover:bg-[#E8E6DF]'
          }`}
        >
          Education
        </button>
        <button
          onClick={() => setActiveSection('reorder')}
          className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
            activeSection === 'reorder'
              ? 'bg-[#101828] text-white shadow-xs'
              : 'text-[#667085] hover:text-[#101828] hover:bg-[#E8E6DF]'
          }`}
        >
          Reorder Sections
        </button>
      </div>

      {/* Editor Body */}
      <div className="p-6 space-y-6 flex-1 overflow-y-auto max-h-[750px]">
        {/* 1. CONTACT INFO & TARGET ROLE */}
        {activeSection === 'contact' && (
          <div className="space-y-4 animate-in fade-in duration-100">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#101828] flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#5B5BD6]" />
                Contact Info & Target Role
              </h3>
              <span className="text-xs text-[#667085]">Personal Details</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-xs font-semibold text-[#344054] block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={resume.contact.fullName}
                  onChange={(e) => updateContact('fullName', e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-[#D0D5DD] bg-white focus:outline-none focus:ring-2 focus:ring-[#5B5BD6]/20"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#344054] block mb-1">
                  Target Role / Headline
                </label>
                <input
                  type="text"
                  value={resume.targetRole}
                  onChange={(e) => onChange({ ...resume, targetRole: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-[#D0D5DD] bg-white focus:outline-none focus:ring-2 focus:ring-[#5B5BD6]/20 font-semibold text-[#5B5BD6]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#344054] block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={resume.contact.email}
                  onChange={(e) => updateContact('email', e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-[#D0D5DD] bg-white focus:outline-none focus:ring-2 focus:ring-[#5B5BD6]/20"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#344054] block mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={resume.contact.phone}
                  onChange={(e) => updateContact('phone', e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-[#D0D5DD] bg-white focus:outline-none focus:ring-2 focus:ring-[#5B5BD6]/20"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#344054] block mb-1">
                  Location (City, Country / Remote)
                </label>
                <input
                  type="text"
                  value={resume.contact.location}
                  onChange={(e) => updateContact('location', e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-[#D0D5DD] bg-white focus:outline-none focus:ring-2 focus:ring-[#5B5BD6]/20"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#344054] block mb-1">
                  GitHub Profile URL
                </label>
                <input
                  type="text"
                  value={resume.contact.githubUrl}
                  onChange={(e) => updateContact('githubUrl', e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-[#D0D5DD] bg-white focus:outline-none focus:ring-2 focus:ring-[#5B5BD6]/20"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#344054] block mb-1">
                  LinkedIn Profile URL
                </label>
                <input
                  type="text"
                  value={resume.contact.linkedinUrl}
                  onChange={(e) => updateContact('linkedinUrl', e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-[#D0D5DD] bg-white focus:outline-none focus:ring-2 focus:ring-[#5B5BD6]/20"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#344054] block mb-1">
                  Personal Portfolio Website
                </label>
                <input
                  type="text"
                  value={resume.contact.portfolioUrl}
                  onChange={(e) => updateContact('portfolioUrl', e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-[#D0D5DD] bg-white focus:outline-none focus:ring-2 focus:ring-[#5B5BD6]/20"
                />
              </div>
            </div>
          </div>
        )}

        {/* 2. PROFESSIONAL SUMMARY */}
        {activeSection === 'summary' && (
          <div className="space-y-4 animate-in fade-in duration-100">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-[#101828] flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#5B5BD6]" />
                  Professional Summary
                </h3>
                <p className="text-xs text-[#667085]">
                  Factual overview anchored in your verified CareerOS deliverables.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onOpenAI('improve_clarity', 'summary')}
                  className="text-xs gap-1"
                >
                  <Sparkles className="w-3 h-3 text-[#5B5BD6]" />
                  Improve Clarity
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onOpenAI('improve_summary', 'summary')}
                  className="text-xs gap-1"
                >
                  <Sparkles className="w-3 h-3 text-[#5B5BD6]" />
                  Improve Summary
                </Button>
              </div>
            </div>

            <textarea
              rows={5}
              value={resume.summary}
              onChange={(e) => updateSummary(e.target.value)}
              className="w-full text-xs px-3 py-2.5 rounded-lg border border-[#D0D5DD] bg-white leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#5B5BD6]/20 text-[#344054]"
              placeholder="Factual summary highlighting verified engineering deliverables and practical competencies..."
            />

            <div className="p-3 rounded-lg bg-[#FAF9F5] border border-[#E8E6DF] text-[11px] text-[#667085] flex items-center justify-between">
              <span>Word count: {resume.summary.split(/\s+/).filter(Boolean).length} words</span>
              <span className="text-[#027A48] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Never invent metrics or roles
              </span>
            </div>
          </div>
        )}

        {/* 3. SKILLS */}
        {activeSection === 'skills' && (
          <div className="space-y-5 animate-in fade-in duration-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#101828] flex items-center gap-1.5">
                  <Code className="w-4 h-4 text-[#5B5BD6]" />
                  Technical & Professional Skills
                </h3>
                <p className="text-xs text-[#667085]">
                  Extracted from your profile and verified Career Evidence items.
                </p>
              </div>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => onOpenAI('improve_skill_relevance', 'skills')}
                className="text-xs gap-1"
              >
                <Sparkles className="w-3 h-3 text-[#5B5BD6]" />
                Improve Skill Relevance
              </Button>
            </div>

            {/* Technical Skills */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#101828] block">
                Technical Skills & Languages
              </label>
              <div className="flex flex-wrap gap-1.5 p-3 rounded-xl bg-[#FAF9F5] border border-[#E8E6DF]">
                {resume.skills.technical.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-white border border-[#E0E0FC] text-[#5B5BD6] font-semibold"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill('technical', skill)}
                      className="text-[#98A2B3] hover:text-[#CC4737] ml-0.5"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="new-tech-skill-input"
                  placeholder="Add skill (e.g. Next.js, Redux, Docker)..."
                  className="text-xs px-3 py-1.5 rounded-lg border border-[#D0D5DD] flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addSkill('technical', (e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const el = document.getElementById('new-tech-skill-input') as HTMLInputElement;
                    if (el && el.value) {
                      addSkill('technical', el.value);
                      el.value = '';
                    }
                  }}
                >
                  Add
                </Button>
              </div>
            </div>

            {/* Tools & Frameworks */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#101828] block">
                Tools, Platforms & Testing
              </label>
              <div className="flex flex-wrap gap-1.5 p-3 rounded-xl bg-[#FAF9F5] border border-[#E8E6DF]">
                {resume.skills.toolsAndFrameworks.map((tool) => (
                  <span
                    key={tool}
                    className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-white border border-[#E8E6DF] text-[#344054] font-medium"
                  >
                    {tool}
                    <button
                      onClick={() => removeSkill('toolsAndFrameworks', tool)}
                      className="text-[#98A2B3] hover:text-[#CC4737] ml-0.5"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="new-tool-input"
                  placeholder="Add tool (e.g. Jest, Postman, Vercel)..."
                  className="text-xs px-3 py-1.5 rounded-lg border border-[#D0D5DD] flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addSkill('toolsAndFrameworks', (e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const el = document.getElementById('new-tool-input') as HTMLInputElement;
                    if (el && el.value) {
                      addSkill('toolsAndFrameworks', el.value);
                      el.value = '';
                    }
                  }}
                >
                  Add
                </Button>
              </div>
            </div>

            {/* Professional Practices */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#101828] block">
                Workplace & Professional Habits
              </label>
              <div className="flex flex-wrap gap-1.5 p-3 rounded-xl bg-[#FAF9F5] border border-[#E8E6DF]">
                {resume.skills.softAndProfessional.map((p) => (
                  <span
                    key={p}
                    className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-white border border-[#D1FADF] text-[#027A48] font-medium"
                  >
                    {p}
                    <button
                      onClick={() => removeSkill('softAndProfessional', p)}
                      className="text-[#98A2B3] hover:text-[#CC4737] ml-0.5"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. PROJECTS */}
        {activeSection === 'projects' && (
          <div className="space-y-5 animate-in fade-in duration-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#101828] flex items-center gap-1.5">
                  <Code className="w-4 h-4 text-[#5B5BD6]" />
                  Projects & Technical Deliverables
                </h3>
                <p className="text-xs text-[#667085]">
                  Anchor every project in real code, verifiable outputs, and actual frameworks.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onOpenAI('remove_repetition', 'projects')}
                  className="text-xs gap-1"
                >
                  <Sparkles className="w-3 h-3 text-[#5B5BD6]" />
                  Remove Repetition
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={addProject}
                  leftIcon={<Plus className="w-3.5 h-3.5" />}
                  className="text-xs"
                >
                  Add Project
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {resume.projects.map((proj, pIdx) => (
                <div
                  key={proj.id}
                  className="p-4 rounded-xl border border-[#E8E6DF] bg-white space-y-3 shadow-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E8E6DF] pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#EEF4FF] text-[#3538CD] flex items-center justify-center text-xs font-bold">
                        {pIdx + 1}
                      </span>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => updateProject(proj.id, { title: e.target.value })}
                        className="text-sm font-bold text-[#101828] bg-transparent border-b border-transparent hover:border-[#D0D5DD] focus:border-[#5B5BD6] focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          onOpenAI('improve_project_description', 'projects', proj.id)
                        }
                        className="text-xs text-[#5B5BD6] hover:bg-[#F0EEFF] gap-1"
                      >
                        <Sparkles className="w-3 h-3" />
                        Improve Description
                      </Button>
                      <button
                        onClick={() => deleteProject(proj.id)}
                        className="p-1 text-[#98A2B3] hover:text-[#CC4737]"
                        title="Delete project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="text-[11px] font-semibold text-[#667085] block mb-1">
                        Role / Contribution
                      </label>
                      <input
                        type="text"
                        value={proj.role || ''}
                        onChange={(e) => updateProject(proj.id, { role: e.target.value })}
                        placeholder="e.g. Lead Developer, Frontend Contributor"
                        className="w-full px-2.5 py-1.5 rounded-md border border-[#D0D5DD]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-[#667085] block mb-1">
                        Tech Stack (comma separated)
                      </label>
                      <input
                        type="text"
                        value={proj.techStack.join(', ')}
                        onChange={(e) =>
                          updateProject(proj.id, {
                            techStack: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                          })
                        }
                        placeholder="React, TypeScript, Tailwind CSS"
                        className="w-full px-2.5 py-1.5 rounded-md border border-[#D0D5DD]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-semibold text-[#667085] block mb-1">
                        Repository or Live Demo Link
                      </label>
                      <input
                        type="text"
                        value={proj.link || ''}
                        onChange={(e) => updateProject(proj.id, { link: e.target.value })}
                        placeholder="https://github.com/..."
                        className="w-full px-2.5 py-1.5 rounded-md border border-[#D0D5DD]"
                      />
                    </div>
                  </div>

                  {/* Bullet points */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-[11px] font-semibold text-[#667085] block">
                      Bullet Points (one per line)
                    </label>
                    <textarea
                      rows={3}
                      value={proj.bullets.join('\n')}
                      onChange={(e) =>
                        updateProject(proj.id, {
                          bullets: e.target.value.split('\n').filter(Boolean),
                        })
                      }
                      className="w-full text-xs px-2.5 py-2 rounded-md border border-[#D0D5DD] leading-relaxed font-sans"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. EXPERIENCE */}
        {activeSection === 'experience' && (
          <div className="space-y-5 animate-in fade-in duration-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#101828] flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-[#5B5BD6]" />
                  Experience & Practicum
                </h3>
                <p className="text-xs text-[#667085]">
                  Practical roles, fellowships, and verified collaborative experiences.
                </p>
              </div>

              <Button
                variant="secondary"
                size="sm"
                onClick={addExperience}
                leftIcon={<Plus className="w-3.5 h-3.5" />}
                className="text-xs"
              >
                Add Experience
              </Button>
            </div>

            <div className="space-y-4">
              {resume.experience.map((exp) => (
                <div
                  key={exp.id}
                  className="p-4 rounded-xl border border-[#E8E6DF] bg-white space-y-3 shadow-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E8E6DF] pb-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
                        className="text-sm font-bold text-[#101828] bg-transparent border-b border-transparent hover:border-[#D0D5DD] focus:border-[#5B5BD6] focus:outline-none"
                      />
                      <span className="text-xs text-[#667085]">@</span>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                        className="text-xs font-semibold text-[#5B5BD6] bg-transparent border-b border-transparent hover:border-[#D0D5DD] focus:border-[#5B5BD6] focus:outline-none"
                      />
                    </div>

                    <button
                      onClick={() => deleteExperience(exp.id)}
                      className="p-1 text-[#98A2B3] hover:text-[#CC4737]"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                    <div>
                      <label className="text-[11px] font-semibold text-[#667085] block mb-0.5">
                        Start Date
                      </label>
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                        placeholder="2026-08"
                        className="w-full px-2.5 py-1.5 rounded-md border border-[#D0D5DD]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-[#667085] block mb-0.5">
                        End Date
                      </label>
                      <input
                        type="text"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                        placeholder="Present"
                        className="w-full px-2.5 py-1.5 rounded-md border border-[#D0D5DD]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-[#667085] block mb-0.5">
                        Location
                      </label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                        placeholder="Remote / City"
                        className="w-full px-2.5 py-1.5 rounded-md border border-[#D0D5DD]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 pt-1">
                    <label className="text-[11px] font-semibold text-[#667085] block">
                      Bullets (one per line)
                    </label>
                    <textarea
                      rows={3}
                      value={exp.bullets.join('\n')}
                      onChange={(e) =>
                        updateExperience(exp.id, {
                          bullets: e.target.value.split('\n').filter(Boolean),
                        })
                      }
                      className="w-full text-xs px-2.5 py-2 rounded-md border border-[#D0D5DD] leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. CAREER EVIDENCE HIGHLIGHTS (Direct Sync with Vault) */}
        {activeSection === 'evidence' && (
          <div className="space-y-4 animate-in fade-in duration-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#101828] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#5B5BD6]" />
                  Career Evidence Highlights
                </h3>
                <p className="text-xs text-[#667085]">
                  Select verified items from your Career Evidence Vault to feature directly on your resume.
                </p>
              </div>

              <span className="text-xs text-[#5B5BD6] font-semibold">
                {resume.evidenceHighlights.length} / {allEvidence.length} Featured
              </span>
            </div>

            <div className="space-y-2.5">
              {allEvidence.map((evItem) => {
                const isSelected = resume.evidenceHighlights.some(
                  (h) => h.evidenceId === evItem.id
                );
                return (
                  <div
                    key={evItem.id}
                    onClick={() => toggleEvidenceHighlight(evItem.id)}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'border-[#5B5BD6] bg-[#F9F9FE] ring-1 ring-[#5B5BD6]'
                        : 'border-[#E8E6DF] bg-white hover:border-[#D0D5DD]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      className="mt-1 w-4 h-4 rounded text-[#5B5BD6] focus:ring-[#5B5BD6]"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-[#101828]">
                          {evItem.activity}
                        </span>
                        <span className="text-[10px] uppercase font-semibold text-[#667085] px-1.5 py-0.5 rounded bg-[#F2F4F7]">
                          {evItem.category}
                        </span>
                      </div>

                      <p className="text-xs text-[#475467] line-clamp-1 mt-0.5">
                        {evItem.output}
                      </p>

                      <div className="flex items-center gap-2 mt-1.5 text-[10px] text-[#667085]">
                        <span>{evItem.date}</span>
                        <span>•</span>
                        <span>{evItem.skillsPracticed.slice(0, 3).join(', ')}</span>
                        {evItem.verificationBadge && (
                          <span className="text-[#027A48] font-semibold">
                            • {evItem.verificationBadge}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 7. EDUCATION */}
        {activeSection === 'education' && (
          <div className="space-y-4 animate-in fade-in duration-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#101828] flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#5B5BD6]" />
                  Education
                </h3>
                <p className="text-xs text-[#667085]">
                  Degrees, institutions, and relevant coursework.
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={addEducation}
                leftIcon={<Plus className="w-3.5 h-3.5" />}
                className="text-xs"
              >
                Add Degree
              </Button>
            </div>

            <div className="space-y-3.5">
              {resume.education.map((edu) => (
                <div
                  key={edu.id}
                  className="p-4 rounded-xl border border-[#E8E6DF] bg-white space-y-3 shadow-xs"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="text-[11px] font-semibold text-[#667085] block mb-1">
                        Degree
                      </label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-md border border-[#D0D5DD]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-[#667085] block mb-1">
                        Field of Study
                      </label>
                      <input
                        type="text"
                        value={edu.fieldOfStudy}
                        onChange={(e) => updateEducation(edu.id, { fieldOfStudy: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-md border border-[#D0D5DD]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-[#667085] block mb-1">
                        Institution
                      </label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-md border border-[#D0D5DD]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] font-semibold text-[#667085] block mb-1">
                          Start
                        </label>
                        <input
                          type="text"
                          value={edu.startDate}
                          onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded-md border border-[#D0D5DD]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-[#667085] block mb-1">
                          End
                        </label>
                        <input
                          type="text"
                          value={edu.endDate}
                          onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded-md border border-[#D0D5DD]"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-semibold text-[#667085] block mb-1">
                        Honors / Core Coursework
                      </label>
                      <input
                        type="text"
                        value={edu.honors || ''}
                        onChange={(e) => updateEducation(edu.id, { honors: e.target.value })}
                        placeholder="Relevant Coursework, GPA, or Academic Focus"
                        className="w-full px-2.5 py-1.5 rounded-md border border-[#D0D5DD]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. REORDER SECTIONS */}
        {activeSection === 'reorder' && (
          <div className="space-y-4 animate-in fade-in duration-100">
            <div>
              <h3 className="text-sm font-bold text-[#101828] flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#5B5BD6]" />
                Reorder Resume Sections
              </h3>
              <p className="text-xs text-[#667085]">
                Adjust the visual flow of your resume sections for optimal ATS or human recruiter scan.
              </p>
            </div>

            <div className="space-y-2">
              {resume.sectionOrder.map((sec, idx) => (
                <div
                  key={sec}
                  className="p-3 rounded-xl border border-[#E8E6DF] bg-white flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5 font-bold text-[#101828]">
                    <span className="w-5 h-5 rounded-md bg-[#F2F4F7] text-[#475467] flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="uppercase tracking-wider">{sec.replace('_', ' ')}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      disabled={idx === 0}
                      onClick={() => moveSection(idx, 'up')}
                      className="p-1 rounded hover:bg-[#F2F4F7] disabled:opacity-30 disabled:hover:bg-transparent text-[#475467]"
                      title="Move Up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      disabled={idx === resume.sectionOrder.length - 1}
                      onClick={() => moveSection(idx, 'down')}
                      className="p-1 rounded hover:bg-[#F2F4F7] disabled:opacity-30 disabled:hover:bg-transparent text-[#475467]"
                      title="Move Down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Editor Footer */}
      <div className="p-4 border-t border-[#E8E6DF] bg-[#FAF9F5] flex items-center justify-between">
        <button
          onClick={onResetFromEvidence}
          className="text-xs text-[#667085] hover:text-[#CC4737] flex items-center gap-1 font-medium transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Re-sync from Career Evidence
        </button>

        <span className="text-[11px] text-[#21B47A] font-semibold flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          Auto-saved to Vault
        </span>
      </div>
    </div>
  );
};
