import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Plus,
  FileCheck,
  Calendar,
  Sparkles,
  Download,
  Share2,
  Filter,
  CheckCircle2,
  FileText,
  Briefcase,
  Code,
  Mic,
  Search,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import { RouteId } from '../types/navigation';
import { EvidenceItem, EvidenceCategory, ActionExportType } from '../types/evidence';
import {
  getEvidenceItems,
  saveEvidenceItem,
  toggleEvidenceFlag,
} from '../services/evidenceService';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { CareerTimeline } from '../components/evidence/CareerTimeline';
import { AddEvidenceModal, CATEGORY_OPTIONS } from '../components/evidence/AddEvidenceModal';
import { EvidenceActionModal } from '../components/evidence/EvidenceActionModal';
import { useToast } from '../components/ui/Toast';

export interface EvidenceViewProps {
  onNavigate: (route: RouteId) => void;
  onOpenAICompanion?: () => void;
}

export const EvidenceView: React.FC<EvidenceViewProps> = ({
  onNavigate,
  onOpenAICompanion,
}) => {
  const { toast } = useToast();

  const [evidenceItems, setEvidenceItems] = useState<EvidenceItem[]>(() => getEvidenceItems());
  const [selectedCategory, setSelectedCategory] = useState<EvidenceCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedActionItem, setSelectedActionItem] = useState<EvidenceItem | null>(null);
  const [activeActionType, setActiveActionType] = useState<ActionExportType>('resume');
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);

  // Sync refresh
  const refreshItems = () => {
    setEvidenceItems(getEvidenceItems());
  };

  const handleAddEvidence = (item: EvidenceItem) => {
    saveEvidenceItem(item);
    refreshItems();
  };

  const handleTriggerAction = (item: EvidenceItem, action: ActionExportType) => {
    setSelectedActionItem(item);
    setActiveActionType(action);
    setIsActionModalOpen(true);
  };

  const handleToggleFlag = (itemId: string, flag: 'inPortfolio' | 'inResume') => {
    toggleEvidenceFlag(itemId, flag);
    refreshItems();
    toast.info('Evidence Updated', `Status updated for your active ${flag === 'inPortfolio' ? 'portfolio' : 'resume'}.`);
  };

  // Filtered items
  const filteredItems = useMemo(() => {
    return evidenceItems.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.activity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.output.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.skillsPracticed.some((s) =>
          s.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [evidenceItems, selectedCategory, searchQuery]);

  // Aggregate stats
  const stats = useMemo(() => {
    const total = evidenceItems.length;
    const portfolioCount = evidenceItems.filter((i) => i.inPortfolio).length;
    const resumeCount = evidenceItems.filter((i) => i.inResume).length;
    const verifiedMicroProofs = evidenceItems.filter(
      (i) => i.verificationBadge === 'Verified Micro-Proof' || i.verificationBadge === 'Mentor Evaluated'
    ).length;
    return { total, portfolioCount, resumeCount, verifiedMicroProofs };
  }, [evidenceItems]);

  return (
    <div className="space-y-8 animate-in fade-in duration-200 text-left pb-24 max-w-6xl mx-auto">
      {/* 1. Header Banner */}
      <div className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Badge variant="mint" size="sm">
                Authentic Verification
              </Badge>
              <span className="text-xs text-[#667085]">Career Evidence Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#101828]">
              Career Evidence
            </h1>
            <p className="text-sm sm:text-base text-[#475467] max-w-2xl leading-relaxed">
              The verified record of what you have genuinely done. No fabricated achievements, fake metrics, or exaggerated titles. Build high-conviction proof that employers immediately trust.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              variant="outline"
              size="md"
              onClick={() => onNavigate('resume')}
              leftIcon={<FileText className="w-4 h-4 text-[#5B5BD6]" />}
            >
              Resume Builder ({stats.resumeCount})
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => onNavigate('tasks')}
              leftIcon={<CheckCircle2 className="w-4 h-4 text-[#5B5BD6]" />}
            >
              Practice More Tasks
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => setIsAddModalOpen(true)}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Record Evidence
            </Button>
          </div>
        </div>

        {/* Strict Non-Fabrication Guarantee Notice */}
        <div className="p-3.5 bg-[#FFF2F0] border border-[#FCD8D4] rounded-xl flex items-start sm:items-center gap-3 text-xs text-[#C93B2B]">
          <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 sm:mt-0" />
          <div className="leading-relaxed">
            <strong className="font-bold uppercase tracking-wider text-[11px] mr-1.5">
              CareerOS Integrity Guarantee:
            </strong>
            CareerOS must NEVER fabricate achievements, metrics, companies, work experience or results. AI improves clarity, grammar, and packaging, but will never invent facts.
          </div>
        </div>

        {/* High-Level Proof Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3 bg-[#F8F8F5] border border-[#E8E6DF] rounded-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#667085] block">
              Logged Evidence
            </span>
            <span className="text-xl font-bold text-[#101828]">{stats.total} items</span>
          </div>

          <div className="p-3 bg-[#F8F8F5] border border-[#E8E6DF] rounded-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#21B47A] block">
              Verified Proofs
            </span>
            <span className="text-xl font-bold text-[#21B47A]">{stats.verifiedMicroProofs} verified</span>
          </div>

          <div className="p-3 bg-[#F8F8F5] border border-[#E8E6DF] rounded-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5B5BD6] block">
              Pinned to Portfolio
            </span>
            <span className="text-xl font-bold text-[#5B5BD6]">{stats.portfolioCount} artifacts</span>
          </div>

          <div className="p-3 bg-[#F8F8F5] border border-[#E8E6DF] rounded-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#344054] block">
              Resume Ready
            </span>
            <span className="text-xl font-bold text-[#344054]">{stats.resumeCount} bullets</span>
          </div>
        </div>
      </div>

      {/* 2. Filter & Search Toolbar */}
      <div className="bg-white border border-[#E8E6DF] rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#98A2B3]" />
            <input
              type="text"
              placeholder="Search evidence by activity, skills, or outputs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#F8F8F5] border border-[#E8E6DF] rounded-xl text-xs sm:text-sm text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:ring-1 focus:ring-[#5B5BD6]"
            />
          </div>

          {/* Quick link to portfolio or resume */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('portfolio')}
              leftIcon={<Briefcase className="w-3.5 h-3.5 text-[#5B5BD6]" />}
            >
              View Full Portfolio
            </Button>
          </div>
        </div>

        {/* Category Pills (tasks, projects, challenges, practice, teamwork, communication, leadership, mentor_feedback, interview_practice, certifications, other) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#101828] text-white shadow-xs'
                : 'bg-[#F8F8F5] text-[#667085] hover:bg-[#E8E6DF] hover:text-[#101828]'
            }`}
          >
            All Categories ({evidenceItems.length})
          </button>

          {CATEGORY_OPTIONS.map((cat) => {
            const count = evidenceItems.filter((i) => i.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#5B5BD6] text-white shadow-xs'
                    : 'bg-[#F8F8F5] text-[#667085] hover:bg-[#E8E6DF] hover:text-[#101828]'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-[#E8E6DF] text-[#667085]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Visual Career Timeline Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#101828] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#5B5BD6]" />
              Visual Career Timeline
            </h2>
            <p className="text-xs text-[#667085]">
              Chronological log of genuine tasks, projects, challenges, and verified activities.
            </p>
          </div>
          <span className="text-xs font-mono text-[#667085]">
            Showing {filteredItems.length} of {evidenceItems.length} items
          </span>
        </div>

        {/* Visual Timeline Component */}
        <CareerTimeline
          items={filteredItems}
          onTriggerAction={handleTriggerAction}
        />
      </section>

      {/* 4. Real-World Action Modal (Add to Resume, Portfolio, LinkedIn, GitHub, Interview) */}
      <EvidenceActionModal
        isOpen={isActionModalOpen}
        onClose={() => {
          setIsActionModalOpen(false);
          setSelectedActionItem(null);
        }}
        item={selectedActionItem}
        initialAction={activeActionType}
        onUpdateFlags={handleToggleFlag}
      />

      {/* 5. Add Manual Genuine Evidence Modal */}
      <AddEvidenceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddEvidence={handleAddEvidence}
      />
    </div>
  );
};
