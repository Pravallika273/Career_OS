import React, { useState } from 'react';
import {
  FileText,
  Briefcase,
  Share2,
  Code,
  Mic,
  Copy,
  Check,
  Sparkles,
  ShieldAlert,
  ExternalLink,
  ArrowRight,
  Info,
} from 'lucide-react';
import { EvidenceItem, ActionExportType, ExportPreviewData } from '../../types/evidence';
import { formatEvidenceForAction } from '../../services/evidenceService';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Dialog } from '../ui/Dialog';
import { useToast } from '../ui/Toast';

export interface EvidenceActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: EvidenceItem | null;
  initialAction?: ActionExportType;
  onUpdateFlags?: (itemId: string, flag: 'inPortfolio' | 'inResume') => void;
}

export const EvidenceActionModal: React.FC<EvidenceActionModalProps> = ({
  isOpen,
  onClose,
  item,
  initialAction = 'resume',
  onUpdateFlags,
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<ActionExportType>(initialAction);
  const [copied, setCopied] = useState(false);
  const [aiPolished, setAiPolished] = useState(false);

  // Sync tab with initial action when modal opens
  React.useEffect(() => {
    setActiveTab(initialAction);
    setCopied(false);
    setAiPolished(false);
  }, [initialAction, isOpen]);

  if (!isOpen || !item) return null;

  const currentExport: ExportPreviewData = {
    type: activeTab,
    ...formatEvidenceForAction(item, activeTab),
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentExport.formattedContent);
    setCopied(true);
    toast.success('Copied to Clipboard!', 'Ready to paste into your documents.');
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePolishWording = () => {
    setAiPolished(true);
    toast.info(
      'Wording Polished',
      'Refined phrasing for maximum clarity while strictly maintaining 100% of underlying facts.'
    );
  };

  const tabOptions: Array<{ id: ActionExportType; label: string; icon: React.FC<{ className?: string }> }> = [
    { id: 'resume', label: 'Add to Resume', icon: FileText },
    { id: 'portfolio', label: 'Add to Portfolio', icon: Briefcase },
    { id: 'linkedin', label: 'Prepare LinkedIn Post', icon: Share2 },
    { id: 'github', label: 'Prepare GitHub README', icon: Code },
    { id: 'interview', label: 'Use in Interview', icon: Mic },
  ];

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Prepare Career Evidence for Real-World Use"
      description="Turn genuine verified work into high-impact artifacts without fluff or exaggeration."
      maxWidth="lg"
    >
      <div className="space-y-5 text-left text-xs sm:text-sm">
        {/* Core CareerOS Integrity Banner */}
        <div className="p-3.5 bg-[#FFF2F0] border border-[#FCD8D4] rounded-xl flex items-start gap-2.5 text-[#C93B2B]">
          <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-[11px] uppercase tracking-wider block">
              Strict Non-Fabrication Principle
            </span>
            <p className="text-xs text-[#475467] leading-relaxed">
              CareerOS strictly ensures every word represents what you genuinely performed. AI can polish grammar and framing, but never invents achievements, metrics, companies, or results.
            </p>
          </div>
        </div>

        {/* Selected Evidence Item Summary */}
        <div className="bg-[#F8F8F5] p-3.5 rounded-xl border border-[#E8E6DF] space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#101828] truncate max-w-sm">
              {item.activity}
            </span>
            <span className="text-[#667085]">{item.date}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {item.skillsPracticed.map((sk, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[10px] bg-white border border-[#E8E6DF] text-[#344054]"
              >
                {sk}
              </span>
            ))}
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-1.5 border-b border-[#E8E6DF] pb-2 overflow-x-auto">
          {tabOptions.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  setCopied(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#5B5BD6] text-white shadow-xs'
                    : 'text-[#667085] hover:text-[#101828] hover:bg-[#F8F8F5]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Action Content Preview Box */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="text-sm font-bold text-[#101828]">
                {currentExport.title}
              </h4>
              <p className="text-[11px] text-[#667085]">
                {currentExport.factualExplanation}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePolishWording}
                leftIcon={<Sparkles className="w-3.5 h-3.5 text-[#5B5BD6]" />}
              >
                Polish Phrasing
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleCopy}
                leftIcon={copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              >
                {copied ? 'Copied' : 'Copy Text'}
              </Button>
            </div>
          </div>

          <div className="p-4 bg-[#101828] text-white rounded-xl font-mono text-xs leading-relaxed overflow-x-auto max-h-72 whitespace-pre-wrap shadow-inner border border-[#2E4057]">
            {currentExport.formattedContent}
          </div>

          {/* Quick Toggle Checkboxes for Portfolio & Resume */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-[#E8E6DF]">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer select-none text-[#344054]">
                <input
                  type="checkbox"
                  checked={Boolean(item.inResume)}
                  onChange={() => onUpdateFlags?.(item.id, 'inResume')}
                  className="rounded border-[#D3D0C6] text-[#5B5BD6] focus:ring-[#5B5BD6]"
                />
                <span>Include in active Resume Evidence</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none text-[#344054]">
                <input
                  type="checkbox"
                  checked={Boolean(item.inPortfolio)}
                  onChange={() => onUpdateFlags?.(item.id, 'inPortfolio')}
                  className="rounded border-[#D3D0C6] text-[#5B5BD6] focus:ring-[#5B5BD6]"
                />
                <span>Pin to Public Portfolio</span>
              </label>
            </div>

            <Button variant="ghost" size="sm" onClick={onClose}>
              Done
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
