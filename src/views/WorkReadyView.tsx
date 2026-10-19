import React, { useState, useMemo, useEffect } from 'react';
import {
  Compass,
  Search,
  Filter,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  FileText,
  ArrowRight,
  BookOpen,
  Info,
  HelpCircle,
  TrendingUp,
  HeartHandshake,
  Clock,
  Layers,
  Award,
} from 'lucide-react';
import { RouteId } from '../types/navigation';
import {
  WorkReadyArea,
  WorkReadyScenario,
  ScenarioResolutionRecord,
  WorkReadyModuleKey,
} from '../types/workReady';
import {
  WORK_READY_SCENARIOS,
  WORK_READY_AREAS_META,
} from '../services/workReadyCatalog';
import { WORKPLACE_MODULES_META } from '../services/workplaceModulesCatalog';
import {
  getScenarioResolutions,
  getAllAreasProgress,
} from '../services/workReadyService';
import { ScenarioInteractiveCard } from '../components/workReady/ScenarioInteractiveCard';
import { AreaProgressTracker } from '../components/workReady/AreaProgressTracker';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export interface WorkReadyViewProps {
  onNavigate: (route: RouteId) => void;
  onOpenAICompanion?: () => void;
  initialModule?: WorkReadyModuleKey;
}

export const WorkReadyView: React.FC<WorkReadyViewProps> = ({
  onNavigate,
  onOpenAICompanion,
  initialModule = 'all',
}) => {
  const [activeModule, setActiveModule] = useState<WorkReadyModuleKey>(initialModule);
  const [selectedActivityType, setSelectedActivityType] = useState<string>('all');
  const [selectedArea, setSelectedArea] = useState<WorkReadyArea | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [resolutions, setResolutions] = useState<
    Record<string, ScenarioResolutionRecord>
  >(() => getScenarioResolutions());

  const reloadResolutions = () => {
    setResolutions(getScenarioResolutions());
  };

  const progressList = useMemo(() => {
    return getAllAreasProgress();
  }, [resolutions]);

  // Handle module change
  const handleSelectModule = (mod: WorkReadyModuleKey) => {
    setActiveModule(mod);
    setSelectedActivityType('all');
    if (mod === 'emotional_intelligence') {
      setSelectedArea('emotional_intelligence');
    } else if (mod === 'self_management') {
      setSelectedArea('self_management');
    } else if (mod === 'professional_behavior') {
      setSelectedArea('professionalism');
    } else {
      setSelectedArea('all');
    }
  };

  // Filter scenarios
  const filteredScenarios = useMemo(() => {
    return WORK_READY_SCENARIOS.filter((sc) => {
      // Module filter
      let matchesModule = true;
      if (activeModule === 'emotional_intelligence') {
        matchesModule =
          sc.moduleKey === 'emotional_intelligence' || sc.area === 'emotional_intelligence';
      } else if (activeModule === 'self_management') {
        matchesModule =
          sc.moduleKey === 'self_management' || sc.area === 'self_management';
      } else if (activeModule === 'professional_behavior') {
        matchesModule =
          sc.moduleKey === 'professional_behavior' || sc.area === 'professionalism';
      } else if (selectedArea !== 'all') {
        matchesModule = sc.area === selectedArea;
      }

      // Activity sub-filter
      const matchesActivity =
        selectedActivityType === 'all' || sc.activityType === selectedActivityType;

      // Search query
      const matchesSearch =
        searchQuery.trim() === '' ||
        sc.headlinePrompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sc.workplaceContext.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        WORK_READY_AREAS_META[sc.area]?.label
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      return matchesModule && matchesActivity && matchesSearch;
    });
  }, [activeModule, selectedActivityType, selectedArea, searchQuery]);

  // Current active module metadata
  const currentModuleMeta =
    activeModule !== 'all' ? WORKPLACE_MODULES_META[activeModule] : null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-150 text-left">
      {/* 0. Hero Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E8E6DF]">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#EEF4FF] text-[#3538CD] border border-[#C7D7FE] flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              Workplace Reality Simulations
            </span>
            <span className="text-xs text-[#667085]">
              Real Situations • No Boring Theory
            </span>
          </div>

          <h1 className="text-3xl font-extrabold text-[#101828] tracking-tight">
            Learn how work actually works.
          </h1>

          <p className="text-sm text-[#475467] max-w-2xl leading-relaxed">
            School teaches theory; workplaces run on communication, trade-offs, emotional intelligence, and hidden organizational dynamics. Practice realistic dilemmas, discover what professionals consider, and build genuine career readiness.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('evidence')}
            className="text-xs gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-[#5B5BD6]" />
            Career Evidence Vault
          </Button>

          {onOpenAICompanion && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onOpenAICompanion}
              className="text-xs gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-[#5B5BD6]" />
              Ask CareerOS AI
            </Button>
          )}
        </div>
      </div>

      {/* 1. Practical Modules Switcher */}
      <div className="bg-white rounded-2xl border border-[#E8E6DF] p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#101828] flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-[#5B5BD6]" />
            Practical Development Modules:
          </span>
          <span className="text-xs text-[#667085]">
            Realistic Situations • Action Choices • AI Diagnostic Coaching
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {/* Module 1: Emotional Intelligence */}
          <button
            type="button"
            onClick={() => handleSelectModule('emotional_intelligence')}
            className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between space-y-2 ${
              activeModule === 'emotional_intelligence'
                ? 'bg-[#F9F9FE] border-[#5B5BD6] ring-1 ring-[#5B5BD6]'
                : 'bg-[#F8F8F5] border-[#E8E6DF] hover:bg-white hover:border-[#D0D5DD]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-lg bg-[#EEF4FF] text-[#3538CD] flex items-center justify-center">
                <HeartHandshake className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-[#5B5BD6] border border-[#E0E0FC] font-bold">
                6 Activities
              </span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#101828]">
                Emotional Intelligence
              </h4>
              <p className="text-[11px] text-[#667085] line-clamp-1">
                Reading stress, empathy, feedback, and trust
              </p>
            </div>
          </button>

          {/* Module 2: Self-Management */}
          <button
            type="button"
            onClick={() => handleSelectModule('self_management')}
            className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between space-y-2 ${
              activeModule === 'self_management'
                ? 'bg-[#F9F9FE] border-[#5B5BD6] ring-1 ring-[#5B5BD6]'
                : 'bg-[#F8F8F5] border-[#E8E6DF] hover:bg-white hover:border-[#D0D5DD]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-lg bg-[#FEF6EE] text-[#B54708] flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-[#B54708] border border-[#FDE5D0] font-bold">
                7 Activities
              </span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#101828]">
                Self-Management
              </h4>
              <p className="text-[11px] text-[#667085] line-clamp-1">
                Planning, priorities, focus, and deadlines
              </p>
            </div>
          </button>

          {/* Module 3: Professional Behavior */}
          <button
            type="button"
            onClick={() => handleSelectModule('professional_behavior')}
            className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between space-y-2 ${
              activeModule === 'professional_behavior'
                ? 'bg-[#F9F9FE] border-[#5B5BD6] ring-1 ring-[#5B5BD6]'
                : 'bg-[#F8F8F5] border-[#E8E6DF] hover:bg-white hover:border-[#D0D5DD]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-lg bg-[#ECFDF3] text-[#027A48] flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-[#027A48] border border-[#D1FADF] font-bold">
                6 Activities
              </span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#101828]">
                Professional Behavior
              </h4>
              <p className="text-[11px] text-[#667085] line-clamp-1">
                Ownership, reliability, asking for help, delays
              </p>
            </div>
          </button>

          {/* All Workplace Areas Hub */}
          <button
            type="button"
            onClick={() => handleSelectModule('all')}
            className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between space-y-2 ${
              activeModule === 'all'
                ? 'bg-[#F9F9FE] border-[#5B5BD6] ring-1 ring-[#5B5BD6]'
                : 'bg-[#F8F8F5] border-[#E8E6DF] hover:bg-white hover:border-[#D0D5DD]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-lg bg-[#F2F4F7] text-[#344054] flex items-center justify-center">
                <Compass className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-[#344054] border border-[#E8E6DF] font-bold">
                All 8 Areas
              </span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#101828]">
                Complete Catalog
              </h4>
              <p className="text-[11px] text-[#667085] line-clamp-1">
                Overview across all 8 workplace areas
              </p>
            </div>
          </button>
        </div>

        {/* Sub-Activity Quick-Pills for the active module */}
        {currentModuleMeta && (
          <div className="pt-3 border-t border-[#E8E6DF] space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#667085]">
                {currentModuleMeta.title} Practical Activities:
              </span>
              <span className="text-[11px] text-[#5B5BD6] font-medium">
                {currentModuleMeta.subtitle}
              </span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <button
                type="button"
                onClick={() => setSelectedActivityType('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedActivityType === 'all'
                    ? 'bg-[#101828] text-white shadow-xs'
                    : 'bg-[#F8F8F5] text-[#667085] hover:bg-[#E8E6DF] hover:text-[#101828]'
                }`}
              >
                All {currentModuleMeta.title} ({currentModuleMeta.activities.length})
              </button>

              {currentModuleMeta.activities.map((act) => {
                const isSelected = selectedActivityType === act.id;
                return (
                  <button
                    key={act.id}
                    type="button"
                    onClick={() => setSelectedActivityType(act.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-[#5B5BD6] text-white shadow-xs'
                        : 'bg-[#F8F8F5] text-[#667085] hover:bg-[#E8E6DF] hover:text-[#101828]'
                    }`}
                  >
                    {act.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 2. AI 3-Question Framework Callout & Non-Clinical Safety Standard */}
      <div className="p-4 bg-[#F0EEFF]/50 border border-[#E4E0FD] rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[#475467]">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-[#5B5BD6] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-[#5B5BD6] font-semibold text-sm block">
              AI Workplace Diagnostic Framework:
            </strong>
            <p className="leading-relaxed">
              For every decision, CareerOS explains{' '}
              <span className="font-semibold text-[#101828]">"What happened?"</span>,{' '}
              <span className="font-semibold text-[#101828]">"Why might someone react this way?"</span>, and{' '}
              <span className="font-semibold text-[#101828]">"What could you do differently?"</span>
            </p>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-white/80 border border-[#E0E0FC] text-[11px] text-[#475467] max-w-sm shrink-0 leading-relaxed">
          <strong className="text-[#101828] block mb-0.5 font-semibold">
            Workplace Development Standard:
          </strong>
          Focused strictly on workplace dynamics, incentives, and cognitive load.{' '}
          <strong>We never diagnose mental health conditions.</strong>
        </div>
      </div>

      {/* 3. Qualitative Judgment Progress Tracker (Overview mode) */}
      {activeModule === 'all' && (
        <AreaProgressTracker
          progressList={progressList}
          selectedArea={selectedArea}
          onSelectArea={setSelectedArea}
        />
      )}

      {/* 4. Filters and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#98A2B3] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search scenarios by dilemma, manager, report, or skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-[#D0D5DD] bg-white placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#5B5BD6]/20 focus:border-[#5B5BD6] transition-all"
          />
        </div>

        {/* Selected Area Indicator */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#667085]">
            Showing:
          </span>
          <span className="text-xs font-bold text-[#101828] bg-white px-3 py-1 rounded-lg border border-[#E8E6DF]">
            {activeModule !== 'all'
              ? currentModuleMeta?.title
              : selectedArea === 'all'
              ? 'All Practical Scenarios'
              : WORK_READY_AREAS_META[selectedArea].label}
          </span>
          <span className="text-xs text-[#667085]">
            ({filteredScenarios.length} {filteredScenarios.length === 1 ? 'scenario' : 'scenarios'})
          </span>
        </div>
      </div>

      {/* 5. Scenarios Feed */}
      <div className="space-y-6">
        {filteredScenarios.map((scenario) => (
          <ScenarioInteractiveCard
            key={scenario.id}
            scenario={scenario}
            savedResolution={resolutions[scenario.id]}
            onResolutionSaved={reloadResolutions}
            onNavigateToEvidence={() => onNavigate('evidence')}
          />
        ))}

        {filteredScenarios.length === 0 && (
          <div className="p-12 text-center bg-white rounded-xl border border-[#E8E6DF]">
            <Compass className="w-10 h-10 text-[#98A2B3] mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#101828]">
              No workplace scenarios match your query
            </h3>
            <p className="text-xs text-[#667085] mt-1 max-w-md mx-auto">
              Try adjusting your search keywords or select "All Activities" to see the full set of realistic workplace dilemmas.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setSelectedActivityType('all');
                handleSelectModule('all');
              }}
              className="mt-4 text-xs"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
