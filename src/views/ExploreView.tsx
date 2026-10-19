import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Play,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Compass,
  CheckCircle2,
  Layers,
  ChevronDown,
  RotateCcw,
  BookOpen,
  ThumbsUp,
  Meh,
  ThumbsDown,
  Flame,
  Shuffle,
  Info,
} from 'lucide-react';
import { RouteId } from '../types/navigation';
import {
  CareerCategory,
  CareerRole,
  CAREER_CATEGORIES,
  CAREER_ROLES_CATALOG,
  ActivityFeedback,
} from '../types/careers';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { SearchInput } from '../components/ui/Input';
import { TryBeforeYouDecideModal } from '../components/careers/TryBeforeYouDecideModal';
import { CareerDetailModal } from '../components/careers/CareerDetailModal';
import { useToast } from '../components/ui/Toast';

export interface ExploreViewProps {
  onNavigate: (route: RouteId) => void;
  onOpenAICompanion?: () => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  onNavigate,
  onOpenAICompanion,
}) => {
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [isCategoryListExpanded, setIsCategoryListExpanded] = useState(false);

  // Modals state
  const [inspectingRole, setInspectingRole] = useState<CareerRole | null>(null);
  const [activeTryRole, setActiveTryRole] = useState<CareerRole | null>(null);

  // Stored feedback history for personalization
  const [feedbackHistory, setFeedbackHistory] = useState<ActivityFeedback[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('careeros_career_feedback') || '[]');
    } catch {
      return [];
    }
  });

  const handleFeedbackSaved = (newFeedback: ActivityFeedback) => {
    setFeedbackHistory((prev) => [newFeedback, ...prev]);
  };

  // Filter roles based on category and search query
  const filteredRoles = CAREER_ROLES_CATALOG.filter((role) => {
    const matchesCategory =
      selectedCategoryId === 'all' ||
      role.categoryId.toLowerCase() === selectedCategoryId.toLowerCase();

    const matchesSearch =
      role.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.usefulSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      role.whatItInvolves.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Calculate user's enjoyed affinity domains based on saved feedback
  const enjoyedCount = feedbackHistory.filter((f) => f.feeling === 'I enjoyed it.').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-200 text-left pb-16">
      {/* 1. View Header */}
      <div className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E8E6DF]">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="indigo" size="sm">
                Career Discovery
              </Badge>
              <span className="text-xs text-[#667085]">Expandable Catalog</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#101828]">
              Explore Careers &amp; &ldquo;Try Before You Decide&rdquo;
            </h1>
            <p className="text-sm sm:text-base text-[#475467] leading-relaxed">
              Never commit to a career path based on guesswork or pressure. Experience low-stakes 5-minute activities across Technology, Data, AI, Design, Business, Healthcare, Public Sector, and more.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F0EEFF]/50 border border-[#E4E0FD] text-xs text-[#475467] max-w-xs shrink-0 space-y-1.5">
            <div className="flex items-center gap-1.5 text-[#5B5BD6] font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Zero Commitment Rule</span>
            </div>
            <p className="leading-relaxed">
              Trying a career doesn&apos;t bind you to it. Experiment freely to discover what work energizes you.
            </p>
          </div>
        </div>

        {/* Search Bar & Category Segmented Filters */}
        <div className="pt-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex-1">
              <SearchInput
                placeholder="Search by role title, skill, or keyword (e.g. React, SQL, UX, Finance)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClear={() => setSearchQuery('')}
              />
            </div>

            {searchQuery && (
              <Button
                variant="outline"
                size="md"
                onClick={() => setSearchQuery('')}
              >
                Clear Search
              </Button>
            )}
          </div>

          {/* Expandable Categories Grid */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#667085] uppercase tracking-wider">
                Browse by Category ({CAREER_CATEGORIES.length}+ fields)
              </span>
              <button
                type="button"
                onClick={() => setIsCategoryListExpanded(!isCategoryListExpanded)}
                className="text-xs font-semibold text-[#5B5BD6] hover:underline flex items-center gap-1"
              >
                <span>{isCategoryListExpanded ? 'Show Fewer' : 'Show All Categories'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isCategoryListExpanded ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedCategoryId('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  selectedCategoryId === 'all'
                    ? 'bg-[#5B5BD6] text-white shadow-xs'
                    : 'bg-[#F8F8F5] text-[#475467] hover:bg-[#F0EEFF] hover:text-[#101828] border border-[#E8E6DF]'
                }`}
              >
                All Fields ({CAREER_ROLES_CATALOG.length})
              </button>

              {(isCategoryListExpanded ? CAREER_CATEGORIES : CAREER_CATEGORIES.slice(0, 9)).map((cat) => {
                const isSelected = selectedCategoryId === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategoryId(cat.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                      isSelected
                        ? 'bg-[#5B5BD6] text-white shadow-xs'
                        : 'bg-[#F8F8F5] text-[#475467] hover:bg-[#F0EEFF] hover:text-[#101828] border border-[#E8E6DF]'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Experimentation Log & Feedback Personalization Banner */}
      {feedbackHistory.length > 0 && (
        <Card variant="muted" padding="md" className="space-y-3 border-[#E8E6DF]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#5B5BD6]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#101828]">
                Your &ldquo;Try Before You Decide&rdquo; Experimentation Log
              </h3>
            </div>
            <span className="text-xs font-mono text-[#667085]">
              {feedbackHistory.length} {feedbackHistory.length === 1 ? 'activity' : 'activities'} sampled
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {feedbackHistory.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="px-3 py-2 rounded-xl bg-white border border-[#E8E6DF] text-xs space-y-0.5 shadow-xs"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-semibold text-[#101828]">{item.roleTitle}</span>
                  <span className="text-[11px] text-[#21B47A] font-medium">{item.feeling}</span>
                </div>
                <p className="text-[11px] text-[#98A2B3] truncate">{item.activityTitle}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* 3. Career Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#101828]">
            Career Blueprints ({filteredRoles.length})
          </h2>
          <span className="text-xs text-[#667085]">
            Click any card to read full work details or test an activity
          </span>
        </div>

        {filteredRoles.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-[#D3D0C6] rounded-2xl bg-[#F8F8F5]/60 space-y-3">
            <Compass className="w-8 h-8 text-[#98A2B3] mx-auto" />
            <h4 className="text-base font-bold text-[#101828]">No career roles match your search</h4>
            <p className="text-xs text-[#667085] max-w-sm mx-auto">
              Try searching for broader skills like &ldquo;Python&rdquo;, &ldquo;Design&rdquo;, or select &ldquo;All Fields&rdquo;.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategoryId('all');
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredRoles.map((role) => (
              <Card
                key={role.id}
                variant="interactive"
                padding="md"
                className="flex flex-col justify-between group hover:border-[#5B5BD6]/60 transition-all bg-white"
                onClick={() => setInspectingRole(role)}
              >
                <div className="space-y-3">
                  {/* Card Header & Kicker */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-[#5B5BD6] uppercase tracking-wider">
                      {role.categoryId}
                    </span>
                    <Badge variant="neutral" size="sm">
                      Blueprint
                    </Badge>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-base font-bold text-[#101828] group-hover:text-[#5B5BD6] transition-colors leading-snug">
                      {role.title}
                    </h3>
                    <p className="text-xs text-[#667085] line-clamp-2 mt-1 leading-relaxed">
                      {role.tagline}
                    </p>
                  </div>

                  {/* What it involves snippet */}
                  <p className="text-xs text-[#475467] line-clamp-2 leading-relaxed bg-[#F8F8F5] p-2.5 rounded-lg border border-[#E8E6DF]/70">
                    {role.whatItInvolves}
                  </p>

                  {/* Useful skills tags */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#98A2B3]">
                      Useful Skills
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {role.usefulSkills.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[11px] bg-[#F8F8F5] text-[#475467] border border-[#E8E6DF]"
                        >
                          {skill}
                        </span>
                      ))}
                      {role.usefulSkills.length > 3 && (
                        <span className="px-1.5 py-0.5 text-[11px] text-[#98A2B3]">
                          +{role.usefulSkills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 mt-4 border-t border-[#E8E6DF] flex items-center justify-between gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setInspectingRole(role);
                    }}
                    className="text-xs"
                  >
                    View Details
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTryRole(role);
                    }}
                    leftIcon={<Play className="w-3.5 h-3.5 fill-current" />}
                    className="text-xs font-semibold"
                  >
                    Try ~5m
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* 4. Career Detail Modal */}
      <CareerDetailModal
        isOpen={Boolean(inspectingRole)}
        onClose={() => setInspectingRole(null)}
        role={inspectingRole}
        onLaunchTryActivity={(role) => {
          setInspectingRole(null);
          setActiveTryRole(role);
        }}
      />

      {/* 5. "Try Before You Decide" Activity Runner Modal */}
      <TryBeforeYouDecideModal
        isOpen={Boolean(activeTryRole)}
        onClose={() => setActiveTryRole(null)}
        role={activeTryRole}
        onFeedbackSaved={handleFeedbackSaved}
        onTryAnotherArea={() => {
          toast.info('Switching Areas', 'Pick any other career card to sample a different field.');
        }}
      />
    </div>
  );
};
