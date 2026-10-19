import React, { useState, useEffect } from 'react';
import {
  FileText,
  Sparkles,
  Download,
  Copy,
  Printer,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  RotateCcw,
  Sliders,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Check,
  Code,
  FileCode,
  Share2,
  Eye,
  Edit3,
} from 'lucide-react';
import { RouteId } from '../types/navigation';
import {
  ResumeData,
  ResumeTemplateId,
  AIAssistanceAction,
  AIAssistanceResult,
  ResumeSectionType,
} from '../types/resume';
import {
  getSavedResume,
  saveResume,
  resetResumeFromEvidence,
  exportResumeAsPlainText,
  exportResumeAsMarkdown,
  exportResumeAsJSON,
} from '../services/resumeService';
import { ResumeRenderer } from '../components/resume/ResumeRenderer';
import { ResumeEditorPanel } from '../components/resume/ResumeEditorPanel';
import { AIAssistanceModal } from '../components/resume/AIAssistanceModal';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useToast } from '../components/ui/Toast';

export interface ResumeViewProps {
  onNavigate: (route: RouteId) => void;
  onOpenAICompanion?: () => void;
}

const TEMPLATES: Array<{
  id: ResumeTemplateId;
  name: string;
  tagline: string;
}> = [
  { id: 'clean', name: 'Clean', tagline: 'Minimalist & Legible' },
  { id: 'professional', name: 'Professional', tagline: 'Corporate Standard' },
  { id: 'modern', name: 'Modern', tagline: 'Two-Column Tech Layout' },
  { id: 'ats_friendly', name: 'ATS-Friendly', tagline: 'High-Scoring Single Column' },
];

export const ResumeView: React.FC<ResumeViewProps> = ({
  onNavigate,
  onOpenAICompanion,
}) => {
  const { toast } = useToast();

  const [resume, setResume] = useState<ResumeData>(() => getSavedResume());
  const [activeTabMobile, setActiveTabMobile] = useState<'editor' | 'preview'>('editor');
  const [previewMode, setPreviewMode] = useState<'visual' | 'plainText'>('visual');
  const [zoomScale, setZoomScale] = useState<number>(0.9);
  const [showEvidenceBadges, setShowEvidenceBadges] = useState<boolean>(true);

  // AI Modal State
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiAction, setAiAction] = useState<AIAssistanceAction>('improve_summary');
  const [aiSection, setAiSection] = useState<ResumeSectionType>('summary');
  const [aiItemId, setAiItemId] = useState<string | undefined>(undefined);

  // Auto-save on change
  const handleResumeChange = (updated: ResumeData) => {
    setResume(updated);
    saveResume(updated);
  };

  const handleReset = () => {
    if (window.confirm('Reset this resume draft with fresh data directly from your Career Evidence Vault?')) {
      const fresh = resetResumeFromEvidence();
      setResume(fresh);
      toast.success(
        'Synced from Evidence',
        `Re-populated all sections from ${fresh.evidenceCitationCount} verified artifacts.`
      );
    }
  };

  const handleOpenAI = (
    action: AIAssistanceAction,
    section: ResumeSectionType,
    itemId?: string
  ) => {
    setAiAction(action);
    setAiSection(section);
    setAiItemId(itemId);
    setIsAIModalOpen(true);
  };

  const handleApplyAIImprovement = (res: AIAssistanceResult) => {
    let updated = { ...resume };

    if (res.targetSection === 'summary') {
      updated.summary = res.suggestedContent;
    } else if (res.targetSection === 'skills') {
      const parsed = res.suggestedContent.split(',').map((s) => s.trim()).filter(Boolean);
      updated.skills = {
        ...updated.skills,
        technical: parsed,
      };
    } else if (res.targetSection === 'projects') {
      if (res.targetItemId) {
        updated.projects = updated.projects.map((p) =>
          p.id === res.targetItemId
            ? { ...p, bullets: res.suggestedContent.split('\n').filter(Boolean) }
            : p
        );
      } else {
        // Upgrade all or first
        if (updated.projects.length > 0) {
          updated.projects[0] = {
            ...updated.projects[0],
            bullets: res.suggestedContent.split('\n').filter(Boolean),
          };
        }
      }
    }

    handleResumeChange(updated);
    toast.success('Enhancement Applied', `Updated ${res.targetSection} with verified phrasing.`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyPlainText = () => {
    const text = exportResumeAsPlainText(resume);
    navigator.clipboard.writeText(text);
    toast.success('ATS Text Copied', 'Formatted plain text copied to clipboard.');
  };

  const handleCopyMarkdown = () => {
    const md = exportResumeAsMarkdown(resume);
    navigator.clipboard.writeText(md);
    toast.success('Markdown Copied', 'Markdown document ready for GitHub / Portfolio.');
  };

  const handleDownloadJSON = () => {
    const jsonStr = JSON.stringify(resume, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resume.contact.fullName.replace(/\s+/g, '_')}_CareerOS_Resume.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('JSON Downloaded', 'Full structured resume exported.');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150 text-left">
      {/* 1. Header & Evidence Heritage Banner */}
      <div className="bg-white rounded-2xl border border-[#E8E6DF] p-6 shadow-xs print:hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#EEF4FF] text-[#3538CD] border border-[#C7D7FE] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Built from your Career Evidence
              </span>
              <span className="text-xs text-[#027A48] bg-[#ECFDF3] border border-[#D1FADF] px-2.5 py-0.5 rounded-full font-medium">
                {resume.evidenceCitationCount} Verified Deliverables Linked
              </span>
              <span className="text-xs text-[#667085]">
                Never Invented Information • Real Proof
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#101828] tracking-tight">
              Evidence-Backed Resume Builder
            </h1>

            <p className="text-sm text-[#475467] max-w-2xl leading-relaxed">
              Your resume is the natural capstone of your CareerOS journey. Every bullet point, project, and skill is anchored in real code, audits, and workplace communications you demonstrated.
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleOpenAI('improve_summary', 'summary')}
              className="text-xs gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#5B5BD6]" />
              AI Assistant
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyPlainText}
              className="text-xs gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              Copy Plain Text (ATS)
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={handlePrint}
              leftIcon={<Printer className="w-3.5 h-3.5" />}
              className="text-xs"
            >
              Export PDF / Print
            </Button>
          </div>
        </div>

        {/* Templates Selector Row */}
        <div className="mt-6 pt-5 border-t border-[#E8E6DF] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-bold uppercase tracking-wider text-[#667085] shrink-0 mr-1">
              Template:
            </span>
            {TEMPLATES.map((tmpl) => {
              const isSelected = resume.templateId === tmpl.id;
              return (
                <button
                  key={tmpl.id}
                  onClick={() => handleResumeChange({ ...resume, templateId: tmpl.id })}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#101828] text-white shadow-xs'
                      : 'bg-[#FAF9F5] border border-[#E8E6DF] text-[#475467] hover:border-[#D0D5DD] hover:text-[#101828]'
                  }`}
                >
                  <span>{tmpl.name}</span>
                  <span className={`text-[10px] ${isSelected ? 'text-[#D0D5DD]' : 'text-[#98A2B3]'}`}>
                    • {tmpl.tagline}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sub-controls: Zoom and badges toggle */}
          <div className="flex items-center gap-3 text-xs text-[#667085] shrink-0">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={showEvidenceBadges}
                onChange={(e) => setShowEvidenceBadges(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-[#5B5BD6] focus:ring-[#5B5BD6]"
              />
              <span>Show Evidence Proof Watermark</span>
            </label>

            <div className="h-4 w-px bg-[#E8E6DF]" />

            <div className="flex items-center gap-1 bg-[#F2F4F7] p-0.5 rounded-lg">
              <button
                onClick={() => setZoomScale((s) => Math.max(0.6, s - 0.1))}
                className="p-1 text-[#475467] hover:text-[#101828]"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono font-bold px-1 text-[#101828]">
                {Math.round(zoomScale * 100)}%
              </span>
              <button
                onClick={() => setZoomScale((s) => Math.min(1.2, s + 0.1))}
                className="p-1 text-[#475467] hover:text-[#101828]"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden flex rounded-xl bg-[#F2F4F7] p-1 border border-[#E8E6DF] print:hidden">
        <button
          onClick={() => setActiveTabMobile('editor')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            activeTabMobile === 'editor'
              ? 'bg-white text-[#101828] shadow-xs'
              : 'text-[#667085]'
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          Editor & Reorder
        </button>
        <button
          onClick={() => setActiveTabMobile('preview')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            activeTabMobile === 'preview'
              ? 'bg-white text-[#101828] shadow-xs'
              : 'text-[#667085]'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          Live Preview
        </button>
      </div>

      {/* 2. Main Two-Column Split Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Editor Panel (5 cols on desktop) */}
        <div
          className={`lg:col-span-5 h-[800px] print:hidden ${
            activeTabMobile === 'editor' ? 'block' : 'hidden lg:block'
          }`}
        >
          <ResumeEditorPanel
            resume={resume}
            onChange={handleResumeChange}
            onOpenAI={handleOpenAI}
            onResetFromEvidence={handleReset}
          />
        </div>

        {/* Right Column: Live Responsive Paper Preview (7 cols on desktop) */}
        <div
          className={`lg:col-span-7 space-y-3 ${
            activeTabMobile === 'preview' ? 'block' : 'hidden lg:block'
          }`}
        >
          {/* Preview Mode Switcher */}
          <div className="flex items-center justify-between px-1 print:hidden">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPreviewMode('visual')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  previewMode === 'visual'
                    ? 'bg-[#101828] text-white'
                    : 'bg-white text-[#667085] hover:text-[#101828] border border-[#E8E6DF]'
                }`}
              >
                Visual Paper
              </button>
              <button
                onClick={() => setPreviewMode('plainText')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  previewMode === 'plainText'
                    ? 'bg-[#101828] text-white'
                    : 'bg-white text-[#667085] hover:text-[#101828] border border-[#E8E6DF]'
                }`}
              >
                ATS Raw Text
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#667085]">
              <button
                onClick={handleCopyMarkdown}
                className="hover:text-[#5B5BD6] flex items-center gap-1 font-medium"
              >
                <FileCode className="w-3.5 h-3.5" />
                Copy Markdown
              </button>
              <span>•</span>
              <button
                onClick={handleDownloadJSON}
                className="hover:text-[#5B5BD6] flex items-center gap-1 font-medium"
              >
                <Download className="w-3.5 h-3.5" />
                Download JSON
              </button>
            </div>
          </div>

          {/* Paper Canvas */}
          {previewMode === 'visual' ? (
            <div className="bg-[#EAE8E1]/60 p-4 sm:p-6 rounded-2xl border border-[#DCD9D0] overflow-x-auto min-h-[800px] flex justify-center print:bg-white print:p-0 print:border-none">
              <ResumeRenderer
                resume={resume}
                scale={zoomScale}
                showEvidenceBadges={showEvidenceBadges}
              />
            </div>
          ) : (
            <div className="bg-[#101828] text-[#F2F4F7] p-6 rounded-2xl border border-[#1E293B] font-mono text-xs overflow-x-auto min-h-[800px] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-700">
                <span className="text-[#98A2B3]">ATS Parser Friendly View</span>
                <button
                  onClick={handleCopyPlainText}
                  className="px-2.5 py-1 rounded bg-[#5B5BD6] text-white hover:bg-[#4B4BC2] flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" /> Copy All
                </button>
              </div>
              <pre className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed">
                {exportResumeAsPlainText(resume)}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* AI Assistance Modal */}
      <AIAssistanceModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        resume={resume}
        initialAction={aiAction}
        initialSection={aiSection}
        initialItemId={aiItemId}
        onApplyImprovement={handleApplyAIImprovement}
      />
    </div>
  );
};
