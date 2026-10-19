import React, { useState, useMemo } from 'react';
import {
  MessageSquare,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  Filter,
  Search,
  BookOpen,
  Send,
  HelpCircle,
  FileText,
  Users,
  Mic,
  Award,
  ShieldCheck,
} from 'lucide-react';
import { RouteId } from '../types/navigation';
import {
  CommunicationActivity,
  CommunicationCategory,
} from '../types/communication';
import {
  COMMUNICATION_ACTIVITIES,
  COMMUNICATION_CATEGORIES_CONFIG,
} from '../services/communicationCatalog';
import { CommunicationPracticeWorkspace } from '../components/communication/CommunicationPracticeWorkspace';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export interface CommunicationViewProps {
  onNavigate: (route: RouteId) => void;
  onOpenAICompanion?: () => void;
  initialActivityId?: string;
}

export const CommunicationView: React.FC<CommunicationViewProps> = ({
  onNavigate,
  onOpenAICompanion,
  initialActivityId,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CommunicationCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<CommunicationActivity | null>(() => {
    if (initialActivityId) {
      return (
        COMMUNICATION_ACTIVITIES.find((a) => a.id === initialActivityId) || null
      );
    }
    return null;
  });

  // Filter activities
  const filteredActivities = useMemo(() => {
    return COMMUNICATION_ACTIVITIES.filter((act) => {
      const matchesCat =
        selectedCategory === 'all' || act.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.skillsPracticed.some((s) =>
          s.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // If an activity is selected, render the dedicated deep workspace
  if (selectedActivity) {
    return (
      <CommunicationPracticeWorkspace
        activity={selectedActivity}
        onBack={() => setSelectedActivity(null)}
        onNavigate={onNavigate}
      />
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-200 text-left pb-24 max-w-6xl mx-auto">
      {/* 0. Section Switcher Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E8E6DF] pb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate('tasks')}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-[#475467] hover:bg-[#F0EEFF] hover:text-[#5B5BD6] transition-colors"
          >
            Practical Action Catalog &amp; Tasks
          </button>
          <button
            type="button"
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#5B5BD6] text-white shadow-xs"
          >
            Workplace Communication Practice
          </button>
          <button
            type="button"
            onClick={() => onNavigate('learn-and-do')}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-[#475467] hover:bg-[#F0EEFF] hover:text-[#5B5BD6] transition-colors"
          >
            Skill-to-Action Diagnostics
          </button>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('evidence')}
          className="text-xs text-[#5B5BD6] hover:underline font-semibold flex items-center gap-1"
        >
          <span>View Career Evidence</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 1. Header Banner */}
      <div className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Badge variant="indigo" size="sm">
                Human Skill Mastery
              </Badge>
              <span className="text-xs text-[#667085]">CareerOS Practice</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#101828]">
              Workplace Communication Practice
            </h1>
            <p className="text-sm sm:text-base text-[#475467] max-w-2xl leading-relaxed">
              Technical capability opens doors; clear, respectful communication builds careers. Practice high-stakes emails, updates, technical explanations, and meeting discussions with instant AI diagnostic reviews.
            </p>
          </div>

          <div className="shrink-0 flex flex-col items-start md:items-end justify-center bg-[#F8F8F5] p-4 rounded-xl border border-[#E8E6DF] space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#21B47A] flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-[#21B47A]" />
              Career Evidence Ready
            </span>
            <span className="text-xs text-[#475467]">
              Every completed drill logs verified proof to your timeline.
            </span>
          </div>
        </div>

        {/* Respect & Dignity Guarantee Notice */}
        <div className="p-3.5 bg-[#F0EEFF]/60 border border-[#E4E0FD] rounded-xl flex items-start sm:items-center gap-3 text-xs text-[#475467]">
          <ShieldCheck className="w-4 h-4 text-[#5B5BD6] shrink-0 mt-0.5 sm:mt-0" />
          <div className="leading-relaxed">
            <strong className="text-[#5B5BD6] font-semibold mr-1">
              Constructive AI Review Standard:
            </strong>
            AI reviews clarity, tone, structure, and professionalism. We{' '}
            <strong>never judge accent, dialect, or personality</strong>. The purpose is to help you convey your ideas clearly, respectfully, and effectively.
          </div>
        </div>
      </div>

      {/* 2. Filter & Category Bar */}
      <div className="bg-white border border-[#E8E6DF] rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#98A2B3]" />
            <input
              type="text"
              placeholder="Search communication activities by title, skill, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#F8F8F5] border border-[#E8E6DF] rounded-xl text-xs sm:text-sm text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:ring-1 focus:ring-[#5B5BD6]"
            />
          </div>

          <span className="text-xs font-mono text-[#667085] shrink-0">
            Showing {filteredActivities.length} of {COMMUNICATION_ACTIVITIES.length} drills
          </span>
        </div>

        {/* Category Pills (all 11 required categories) */}
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
            All Activities ({COMMUNICATION_ACTIVITIES.length})
          </button>

          {COMMUNICATION_CATEGORIES_CONFIG.map((cat) => {
            const count = COMMUNICATION_ACTIVITIES.filter((a) => a.category === cat.id).length;
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

      {/* 3. Communication Activity Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredActivities.map((act) => {
          const catConfig = COMMUNICATION_CATEGORIES_CONFIG.find((c) => c.id === act.category);

          return (
            <Card
              key={act.id}
              variant="default"
              padding="md"
              className="flex flex-col justify-between bg-white hover:border-[#5B5BD6]/50 transition-all space-y-4 shadow-xs"
            >
              <div className="space-y-3">
                {/* Meta header */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={catConfig?.badgeColor || 'indigo'} size="sm">
                      {catConfig?.label || act.category}
                    </Badge>
                    <span className="text-xs font-mono text-[#667085] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {act.estimatedTime}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#98A2B3] capitalize">
                    {act.medium.replace('_', ' ')}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-[#101828] leading-snug">
                  {act.title}
                </h3>

                {/* Summary */}
                <p className="text-xs text-[#475467] leading-relaxed">
                  {act.summary}
                </p>

                {/* Why it matters */}
                <div className="p-3 rounded-lg bg-[#F0EEFF]/40 border border-[#E4E0FD] text-xs text-[#475467] leading-relaxed">
                  <strong className="text-[#5B5BD6] font-semibold block mb-0.5">
                    Why it matters:
                  </strong>
                  {act.whyItMatters}
                </div>

                {/* Skills practiced */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#98A2B3]">
                    Skills Practiced:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {act.skillsPracticed.map((sk, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[11px] bg-[#F8F8F5] text-[#344054] border border-[#E8E6DF]"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-[#E8E6DF] flex items-center justify-between">
                <span className="text-[11px] text-[#21B47A] font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  AI Reviewed
                </span>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setSelectedActivity(act)}
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Start Practice
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
