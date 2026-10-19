import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  ExternalLink,
  Target,
  SlidersHorizontal,
  PlusCircle,
  HelpCircle,
  Compass,
  MessageSquare,
} from 'lucide-react';
import { RouteId } from '../types/navigation';
import {
  Opportunity,
  OpportunityCategory,
  OpportunityNature,
} from '../types/opportunities';
import {
  getOpportunities,
  getApplications,
  addApplication,
  NATURE_LABELS,
} from '../services/opportunitiesService';
import { OpportunityCard } from '../components/opportunities/OpportunityCard';
import { NoOpportunityMatchState } from '../components/opportunities/NoOpportunityMatchState';
import { Button } from '../components/ui/Button';
import { DEFAULT_USER_PROFILE } from '../types/user';
import { useTranslation } from '../context/I18nContext';
import { TARGET_MARKETS } from '../i18n/constants';
import { TargetMarketId } from '../i18n/types';

export interface OpportunitiesViewProps {
  onNavigate: (route: RouteId) => void;
  onActionClick?: () => void;
}

const CATEGORIES: { id: OpportunityCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Opportunities' },
  { id: 'jobs', label: 'Jobs' },
  { id: 'internships', label: 'Internships' },
  { id: 'apprenticeships', label: 'Apprenticeships' },
  { id: 'projects', label: 'Projects' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'company_simulations', label: 'Company Simulations' },
  { id: 'other', label: 'Other Early-Career' },
];

const NATURE_FILTERS: { id: OpportunityNature | 'all'; label: string }[] = [
  { id: 'all', label: 'All Types' },
  { id: 'real_job', label: 'Real Job' },
  { id: 'real_internship', label: 'Real Internship' },
  { id: 'community_project', label: 'Community Project' },
  { id: 'company_challenge', label: 'Company Challenge' },
  { id: 'careeros_challenge', label: 'CareerOS Challenge' },
  { id: 'practice_simulation', label: 'Practice Simulation' },
];

export const OpportunitiesView: React.FC<OpportunitiesViewProps> = ({
  onNavigate,
  onActionClick,
}) => {
  const { targetMarket, marketMeta, regionalTerms, t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<OpportunityCategory | 'all'>('all');
  const [selectedNature, setSelectedNature] = useState<OpportunityNature | 'all'>('all');
  const [selectedMarket, setSelectedMarket] = useState<TargetMarketId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedIds, setSavedIds] = useState<Set<string>>(() => {
    const apps = getApplications();
    return new Set(apps.map((a) => a.opportunityId).filter(Boolean) as string[]);
  });

  const allOpportunities = useMemo(() => {
    return getOpportunities(DEFAULT_USER_PROFILE);
  }, []);

  const filteredOpportunities = useMemo(() => {
    return allOpportunities.filter((opp) => {
      const matchCat = selectedCategory === 'all' || opp.category === selectedCategory;
      const matchNature = selectedNature === 'all' || opp.nature === selectedNature;
      const matchMarket =
        selectedMarket === 'all' ||
        !opp.targetMarket ||
        opp.targetMarket === selectedMarket ||
        opp.targetMarket === 'global_remote';
      const matchQuery =
        searchQuery === '' ||
        opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCat && matchNature && matchMarket && matchQuery;
    });
  }, [allOpportunities, selectedCategory, selectedNature, selectedMarket, searchQuery]);

  const handleSaveToApplications = (opp: Opportunity) => {
    addApplication({
      opportunityId: opp.id,
      title: opp.title,
      organization: opp.organization,
      company: opp.organization,
      role: opp.title,
      date: new Date().toISOString().split('T')[0],
      nature: opp.nature,
      category: opp.category,
      location: opp.location,
      status: 'Saved',
      stage: 'Saved',
      notes: `Bookmarked from CareerOS Opportunities. Match score: ${opp.matchScore || 'N/A'}%.`,
      nextAction: 'Review job requirements and prepare targeted application.',
      evidenceCited: opp.matchHighlights || [],
      followUpDate: opp.deadline,
    });
    setSavedIds((prev) => new Set([...prev, opp.id]));
  };

  const handlePerformAction = (opp: Opportunity) => {
    if (opp.action.type === 'start_simulation') {
      onNavigate(opp.action.routeTarget as RouteId || 'work-ready');
    } else if (opp.action.type === 'start_challenge') {
      onNavigate(opp.action.routeTarget as RouteId || 'tasks');
    } else if (opp.action.url) {
      window.open(opp.action.url, '_blank', 'noopener,noreferrer');
    }
  };

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedNature('all');
    setSearchQuery('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Navigation Switcher */}
      <div className="flex items-center gap-1.5 p-1 bg-[#F2F4F7] rounded-xl w-fit">
        <button
          onClick={() => onNavigate('opportunities')}
          className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-white text-[#101828] shadow-xs flex items-center gap-2"
        >
          <Briefcase className="w-3.5 h-3.5 text-[#5B5BD6]" />
          <span>Browse Opportunities</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-bold">
            {allOpportunities.length}
          </span>
        </button>
        <button
          onClick={() => onNavigate('applications')}
          className="px-3.5 py-1.5 text-xs font-semibold rounded-lg text-[#667085] hover:text-[#101828] transition-colors flex items-center gap-2"
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>Applications Pipeline</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200/80 text-slate-700 font-bold">
            {savedIds.size}
          </span>
        </button>
        <button
          onClick={() => onNavigate('interview')}
          className="px-3.5 py-1.5 text-xs font-semibold rounded-lg text-[#667085] hover:text-[#101828] transition-colors flex items-center gap-2"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>AI Interview Practice</span>
        </button>
      </div>

      {/* Header Banner */}
      <div className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                Early-Career Marketplace
              </span>
              <span className="text-xs text-[#667085]">
                Verified Employers & Authentic Proof
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#101828]">
              Opportunities & Work Experience
            </h1>
            <p className="text-sm text-[#475467] mt-1 max-w-2xl leading-relaxed">
              Explore vetted entry-level jobs, internships, apprenticeships, open source projects, and realistic simulations matched directly against your CareerOS evidence vault.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="primary"
              size="md"
              onClick={() => onNavigate('applications')}
              leftIcon={<Bookmark className="w-4 h-4" />}
            >
              Tracked Pipeline ({savedIds.size})
            </Button>
          </div>
        </div>

        {/* Ethical Standards Notice: Real Employers vs Simulations */}
        <div className="mt-6 pt-5 border-t border-[#F2F4F7] grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F8F9FA] border border-[#EAECF0]">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">Only Verified Organizations:</span>
              <p className="text-slate-600 mt-0.5">
                Real jobs and internships originate from authenticated employer channels. We never fabricate fictitious tech employers.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F8F9FA] border border-[#EAECF0]">
            <HelpCircle className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">Clear Simulation Distinction:</span>
              <p className="text-slate-600 mt-0.5">
                Practice simulations and sandbox drills are labeled transparently so you know exactly what is a safe practice environment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs (Segmented controls) */}
      <div className="bg-white border border-[#E8E6DF] rounded-xl p-2 overflow-x-auto">
        <div className="flex items-center gap-1 min-w-max">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const count =
              cat.id === 'all'
                ? allOpportunities.length
                : allOpportunities.filter((o) => o.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#5B5BD6] text-white shadow-xs'
                    : 'text-[#475467] hover:text-[#101828] hover:bg-slate-50'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search & Nature Type Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-[#E8E6DF]">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search title, skills (e.g. React), organization..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-[#667085] flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Distinction:
          </span>
          <select
            value={selectedNature}
            onChange={(e) => setSelectedNature(e.target.value as any)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {NATURE_FILTERS.map((nf) => (
              <option key={nf.id} value={nf.id}>
                {nf.label}
              </option>
            ))}
          </select>

          <span className="text-xs text-[#667085] ml-1">Market:</span>
          <select
            value={selectedMarket}
            onChange={(e) => setSelectedMarket(e.target.value as any)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="all">Global / All Regions</option>
            {TARGET_MARKETS.map((tm) => (
              <option key={tm.id} value={tm.id}>
                {tm.label} ({tm.primaryCurrency})
              </option>
            ))}
          </select>

          {(selectedCategory !== 'all' || selectedNature !== 'all' || selectedMarket !== 'all' || searchQuery !== '') && (
            <button
              onClick={clearAllFilters}
              className="text-xs font-semibold text-[#5B5BD6] hover:underline px-2 py-1"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Opportunities Grid or Empty State with No Dead-End Guarantee */}
      {filteredOpportunities.length === 0 ? (
        <NoOpportunityMatchState
          onNavigate={onNavigate}
          onClearFilters={clearAllFilters}
          filterSummary={
            searchQuery
              ? searchQuery
              : selectedCategory !== 'all'
              ? `${selectedCategory} category`
              : 'selected criteria'
          }
        />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#667085] px-1">
            <span>
              Showing <strong>{filteredOpportunities.length}</strong> matching opportunit{filteredOpportunities.length === 1 ? 'y' : 'ies'}
            </span>
            <span>
              Sorted by Career Evidence alignment
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredOpportunities.map((opp) => (
              <OpportunityCard
                key={opp.id}
                opportunity={opp}
                isSaved={savedIds.has(opp.id)}
                onSaveToApplications={handleSaveToApplications}
                onPerformAction={handlePerformAction}
                onNavigateToApplications={() => onNavigate('applications')}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
