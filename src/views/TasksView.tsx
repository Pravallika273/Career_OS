import React, { useState, useMemo, useEffect } from 'react';
import {
  Sparkles,
  Play,
  Clock,
  Gauge,
  Layers,
  ArrowRight,
  Filter,
  CheckCircle2,
  Zap,
  Target,
  Compass,
  FileCheck,
  RotateCcw,
  Search,
  Plus,
  ShieldCheck,
  Flag,
} from 'lucide-react';
import { RouteId } from '../types/navigation';
import { ReportModal } from '../components/trust/ReportModal';
import {
  TaskTab,
  TaskDifficulty,
  TaskItem,
  TASKS_CATALOG,
  CAREER_FILTER_OPTIONS,
  SKILL_FILTER_OPTIONS,
  DIFFICULTY_FILTER_OPTIONS,
  TIME_FILTER_OPTIONS,
  INTEREST_FILTER_OPTIONS,
} from '../types/tasks';
import {
  DynamicTask,
  TaskProgressionLevel,
  TaskFormatVariation,
  FORMAT_VARIATION_META,
  PROGRESSION_LEVEL_META,
} from '../types/dynamicTask';
import {
  getDynamicTasks,
  convertDynamicTaskToTaskItem,
} from '../services/dynamicTaskEngine';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { SearchInput } from '../components/ui/Input';
import { TaskExecutionModal } from '../components/tasks/TaskExecutionModal';
import { GenerateTaskModal } from '../components/tasks/GenerateTaskModal';
import { useToast } from '../components/ui/Toast';

export interface TasksViewProps {
  onNavigate: (route: RouteId) => void;
  onOpenAICompanion?: () => void;
  initialTab?: TaskTab;
  onOpenTaskWorkspace?: (taskId: string) => void;
}

export const TasksView: React.FC<TasksViewProps> = ({
  onNavigate,
  onOpenAICompanion,
  initialTab,
  onOpenTaskWorkspace,
}) => {
  const { toast } = useToast();

  // Active Tab: Recommended, Tasks, Projects, Challenges, Practice, Dynamic
  const [activeTab, setActiveTab] = useState<TaskTab | 'dynamic'>(initialTab || 'recommended');

  // Dynamic Tasks State
  const [dynamicTasks, setDynamicTasks] = useState<DynamicTask[]>([]);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);

  // Filter States
  const [selectedCareer, setSelectedCareer] = useState('All Careers');
  const [selectedSkill, setSelectedSkill] = useState('All Skills');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | TaskDifficulty>('All');
  const [selectedFormatVariation, setSelectedFormatVariation] = useState<'All' | TaskFormatVariation>('All');
  const [selectedTime, setSelectedTime] = useState('Any Duration');
  const [selectedInterest, setSelectedInterest] = useState('All Interests');
  const [searchQuery, setSearchQuery] = useState('');

  // Active Task Runner Modal (for legacy tasks)
  const [activeRunningTask, setActiveRunningTask] = useState<TaskItem | null>(null);
  const [reportingTask, setReportingTask] = useState<{ id: string; title: string } | null>(null);

  useEffect(() => {
    setDynamicTasks(getDynamicTasks());
  }, []);

  // Convert Dynamic Tasks to TaskItem format with metadata
  const convertedDynamicTasks: (TaskItem & {
    isDynamic: boolean;
    formatVariation: TaskFormatVariation;
    isSimulation: boolean;
  })[] = useMemo(() => {
    return dynamicTasks.map((dt) => {
      const item = convertDynamicTaskToTaskItem(dt);
      // Map format variations to corresponding tabs
      if (dt.formatVariation === 'project') item.tab = 'projects';
      else if (dt.formatVariation === 'challenge') item.tab = 'challenges';
      else if (dt.formatVariation === 'simulation') item.tab = 'practice';
      else item.tab = 'tasks';

      return {
        ...item,
        isDynamic: true,
        formatVariation: dt.formatVariation,
        isSimulation: dt.isSimulation,
      };
    });
  }, [dynamicTasks]);

  // Combined Catalog (Static Catalog + Dynamic Personalized Tasks)
  const combinedTasks = useMemo(() => {
    const staticItems = TASKS_CATALOG.map((t) => ({
      ...t,
      isDynamic: false,
      formatVariation: (t.tab === 'projects'
        ? 'project'
        : t.tab === 'challenges'
        ? 'challenge'
        : t.tab === 'practice'
        ? 'simulation'
        : t.timeMinutes <= 20
        ? 'quick_task'
        : 'small_task') as TaskFormatVariation,
      isSimulation: true,
    }));

    return [...convertedDynamicTasks, ...staticItems];
  }, [convertedDynamicTasks]);

  // Tab definitions
  const tabsList = [
    {
      id: 'recommended' as const,
      label: 'Recommended',
      count: combinedTasks.filter((t) => t.tab === 'recommended' || t.isDynamic).length,
    },
    {
      id: 'dynamic' as const,
      label: 'Personalized AI Tasks',
      count: dynamicTasks.length,
    },
    {
      id: 'tasks' as const,
      label: 'Tasks',
      count: combinedTasks.filter((t) => t.tab === 'tasks').length,
    },
    {
      id: 'projects' as const,
      label: 'Projects',
      count: combinedTasks.filter((t) => t.tab === 'projects').length,
    },
    {
      id: 'challenges' as const,
      label: 'Challenges',
      count: combinedTasks.filter((t) => t.tab === 'challenges').length,
    },
    {
      id: 'practice' as const,
      label: 'Practice Simulations',
      count: combinedTasks.filter((t) => t.tab === 'practice').length,
    },
  ];

  // Filtering Logic
  const filteredTasks = useMemo(() => {
    return combinedTasks.filter((task) => {
      // Tab matching
      if (activeTab === 'dynamic') {
        if (!task.isDynamic) return false;
      } else if (activeTab === 'recommended') {
        if (!task.isRightNowEligible && !task.isDynamic && task.tab !== 'recommended') return false;
      } else if (task.tab !== activeTab) {
        return false;
      }

      // Format variation filter
      if (selectedFormatVariation !== 'All' && task.formatVariation !== selectedFormatVariation) {
        return false;
      }

      // Career filter
      if (selectedCareer !== 'All Careers' && task.career !== selectedCareer) return false;

      // Skill filter
      if (selectedSkill !== 'All Skills' && !task.skills.includes(selectedSkill)) return false;

      // Difficulty filter
      if (selectedDifficulty !== 'All' && task.difficulty !== selectedDifficulty) return false;

      // Time filter
      if (selectedTime === 'Quick (< 20 mins)' && task.timeMinutes >= 20) return false;
      if (selectedTime === 'Focused (20–45 mins)' && (task.timeMinutes < 20 || task.timeMinutes > 45))
        return false;
      if (selectedTime === 'Deep (45–90 mins)' && (task.timeMinutes < 45 || task.timeMinutes > 90))
        return false;
      if (selectedTime === 'Project (2+ hours)' && task.timeMinutes < 120) return false;

      // Interest filter
      if (selectedInterest !== 'All Interests' && task.interest !== selectedInterest) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesSkills = task.skills.some((s) => s.toLowerCase().includes(query));
        const matchesWhat = task.whatYouWillDo.toLowerCase().includes(query);
        if (!matchesTitle && !matchesSkills && !matchesWhat) return false;
      }

      return true;
    });
  }, [
    activeTab,
    combinedTasks,
    selectedFormatVariation,
    selectedCareer,
    selectedSkill,
    selectedDifficulty,
    selectedTime,
    selectedInterest,
    searchQuery,
  ]);

  // "Give me something I can do right now." feature
  const handleGiveMeSomethingRightNow = () => {
    const eligible = combinedTasks.filter((t) => t.isRightNowEligible);
    const chosen = eligible[Math.floor(Math.random() * eligible.length)] || combinedTasks[0];

    toast.info('Instant Action Selected', `Launching workspace for "${chosen.title}" (~${chosen.time}).`);
    if (onOpenTaskWorkspace) {
      onOpenTaskWorkspace(chosen.id);
    } else {
      onNavigate(`tasks/${chosen.id}`);
    }
  };

  const handleResetFilters = () => {
    setSelectedCareer('All Careers');
    setSelectedSkill('All Skills');
    setSelectedDifficulty('All');
    setSelectedFormatVariation('All');
    setSelectedTime('Any Duration');
    setSelectedInterest('All Interests');
    setSearchQuery('');
  };

  const handleTaskCreated = (newTask: DynamicTask) => {
    const updated = getDynamicTasks();
    setDynamicTasks(updated);
    toast.success('Personalized Task Generated!', `"${newTask.title}" added to your task pipeline.`);
  };

  const handleLaunchTask = (taskId: string) => {
    if (onOpenTaskWorkspace) {
      onOpenTaskWorkspace(taskId);
    } else {
      onNavigate(`tasks/${taskId}`);
    }
  };

  const hasActiveFilters =
    selectedCareer !== 'All Careers' ||
    selectedSkill !== 'All Skills' ||
    selectedDifficulty !== 'All' ||
    selectedFormatVariation !== 'All' ||
    selectedTime !== 'Any Duration' ||
    selectedInterest !== 'All Interests' ||
    searchQuery.trim() !== '';

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-left pb-16">
      {/* 0. Section Switcher: Action Catalog vs Skill Diagnostics */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E8E6DF] pb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#5B5BD6] text-white shadow-xs"
          >
            Practical Action Catalog &amp; Tasks
          </button>
          <button
            type="button"
            onClick={() => onNavigate('communication')}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-[#475467] hover:bg-[#F0EEFF] hover:text-[#5B5BD6] transition-colors"
          >
            Workplace Communication Practice
          </button>
          <button
            type="button"
            onClick={() => onNavigate('work-ready')}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-[#475467] hover:bg-[#F0EEFF] hover:text-[#5B5BD6] transition-colors flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5 text-[#5B5BD6]" />
            Work-Ready (How Work Works)
          </button>
          <button
            type="button"
            onClick={() => onNavigate('learn-and-do')}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-[#475467] hover:bg-[#F0EEFF] hover:text-[#5B5BD6] transition-colors"
          >
            What Can I Do With My Skills? (Diagnostics)
          </button>
        </div>

        {onOpenAICompanion && (
          <button
            type="button"
            onClick={onOpenAICompanion}
            className="text-xs font-medium text-[#5B5BD6] hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Need advice on what to tackle first?</span>
          </button>
        )}
      </div>

      {/* 1. Header with Dynamic Task Engine Hero & Instant Action Mode */}
      <div className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E8E6DF]">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="indigo" size="sm">
                Dynamic Task Engine
              </Badge>
              <span className="text-xs text-[#667085]">No Fixed Curriculum</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#101828]">
              Personalized Practice &amp; Actionable Proof
            </h1>
            <p className="text-sm sm:text-base text-[#475467] leading-relaxed">
              CareerOS does not lock you into a rigid 40-hour syllabus. Generate custom tasks
              synthesized from your live evidence, career goal, available time, and learning pace.
            </p>
          </div>

          {/* Action Hub: Generate Task & Instant Action Mode */}
          <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => setIsGenerateModalOpen(true)}
              className="py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#5B5BD6] text-white hover:bg-[#4949C0] transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate Personalized Task</span>
            </button>

            <button
              onClick={handleGiveMeSomethingRightNow}
              className="py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#FAF9F5] hover:bg-[#F2F0E8] text-[#101828] border border-[#E8E6DF] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Do Something Right Now (15m)</span>
            </button>
          </div>
        </div>

        {/* Progression Track Indicator (Starter -> Beginner -> Intermediate -> Advanced) */}
        <div className="pt-6">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#98A2B3] mb-2.5 flex items-center justify-between">
            <span>Progression Track</span>
            <span className="text-xs text-[#667085] normal-case">
              Starter → Beginner → Intermediate → Advanced
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(['Starter', 'Beginner', 'Intermediate', 'Advanced'] as TaskProgressionLevel[]).map(
              (lvl) => {
                const count = combinedTasks.filter((t) => t.difficulty === lvl).length;
                const isFilterActive = selectedDifficulty === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSelectedDifficulty(isFilterActive ? 'All' : lvl)}
                    className={`p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
                      isFilterActive
                        ? 'border-[#5B5BD6] bg-[#EEEDFC] text-[#5B5BD6]'
                        : 'border-[#E8E6DF] bg-[#FAF9F5] text-[#344054] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span>{lvl}</span>
                      <span className="text-[11px] font-mono opacity-80">({count})</span>
                    </div>
                    <div className="text-[10px] text-[#667085] mt-1 line-clamp-1">
                      {PROGRESSION_LEVEL_META[lvl].summary}
                    </div>
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* 2. Interactive Navigation Tabs */}
        <div className="pt-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-[#E8E6DF] overflow-x-auto pb-1">
            {tabsList.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-3 px-3.5 text-xs sm:text-sm font-semibold border-b-2 -mb-1.5 transition-all whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'border-[#5B5BD6] text-[#5B5BD6]'
                      : 'border-transparent text-[#667085] hover:text-[#101828]'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded-md ${
                      isActive ? 'bg-[#F0EEFF] text-[#5B5BD6]' : 'bg-[#F8F8F5] text-[#98A2B3]'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 3. Search and Facet Bar */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex-1 max-w-lg">
                <SearchInput
                  placeholder="Search tasks by keyword (e.g. Git, Contrast, State, STAR)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClear={() => setSearchQuery('')}
                />
              </div>

              {hasActiveFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetFilters}
                  leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                  className="shrink-0 cursor-pointer"
                >
                  Reset Filters
                </Button>
              )}
            </div>

            {/* Facet Dropdowns */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 text-xs">
              {/* Career Filter */}
              <div>
                <label className="block text-[10px] font-bold text-[#667085] uppercase tracking-wider mb-1">
                  Career Area
                </label>
                <select
                  value={selectedCareer}
                  onChange={(e) => setSelectedCareer(e.target.value)}
                  className="w-full bg-white border border-[#E8E6DF] rounded-lg p-2 text-xs text-[#101828] focus:outline-hidden focus:ring-1 focus:ring-[#5B5BD6]"
                >
                  {CAREER_FILTER_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Skill Filter */}
              <div>
                <label className="block text-[10px] font-bold text-[#667085] uppercase tracking-wider mb-1">
                  Skill
                </label>
                <select
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="w-full bg-white border border-[#E8E6DF] rounded-lg p-2 text-xs text-[#101828] focus:outline-hidden focus:ring-1 focus:ring-[#5B5BD6]"
                >
                  {SKILL_FILTER_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Format Variation Filter */}
              <div>
                <label className="block text-[10px] font-bold text-[#667085] uppercase tracking-wider mb-1">
                  Task Format
                </label>
                <select
                  value={selectedFormatVariation}
                  onChange={(e) => setSelectedFormatVariation(e.target.value as any)}
                  className="w-full bg-white border border-[#E8E6DF] rounded-lg p-2 text-xs text-[#101828] focus:outline-hidden focus:ring-1 focus:ring-[#5B5BD6]"
                >
                  <option value="All">All Formats</option>
                  <option value="quick_task">Quick Task (5–15m)</option>
                  <option value="small_task">Small Task (20–35m)</option>
                  <option value="medium_task">Medium Task (45–75m)</option>
                  <option value="project">Project (2–4h)</option>
                  <option value="challenge">Challenge (Timed)</option>
                  <option value="simulation">Practice Simulation</option>
                </select>
              </div>

              {/* Time Filter */}
              <div>
                <label className="block text-[10px] font-bold text-[#667085] uppercase tracking-wider mb-1">
                  Duration
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full bg-white border border-[#E8E6DF] rounded-lg p-2 text-xs text-[#101828] focus:outline-hidden focus:ring-1 focus:ring-[#5B5BD6]"
                >
                  {TIME_FILTER_OPTIONS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Interest Filter */}
              <div>
                <label className="block text-[10px] font-bold text-[#667085] uppercase tracking-wider mb-1">
                  Interest
                </label>
                <select
                  value={selectedInterest}
                  onChange={(e) => setSelectedInterest(e.target.value)}
                  className="w-full bg-white border border-[#E8E6DF] rounded-lg p-2 text-xs text-[#101828] focus:outline-hidden focus:ring-1 focus:ring-[#5B5BD6]"
                >
                  {INTEREST_FILTER_OPTIONS.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Task Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#101828]">
            Practical Action Items ({filteredTasks.length})
          </h2>
          <span className="text-xs text-[#667085]">
            Every task produces a tangible evidence output
          </span>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-[#D3D0C6] rounded-2xl bg-[#F8F8F5]/60 space-y-3">
            <Compass className="w-8 h-8 text-[#98A2B3] mx-auto" />
            <h4 className="text-base font-bold text-[#101828]">No tasks match these filter criteria</h4>
            <p className="text-xs text-[#667085] max-w-sm mx-auto">
              Generate a personalized task tailored to your target skills or reset your active filters.
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={handleResetFilters}>
                Reset Filters
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsGenerateModalOpen(true)}
                leftIcon={<Sparkles className="w-3.5 h-3.5" />}
              >
                Generate Task Now
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTasks.map((task) => {
              const difficultyBadgeVariant =
                task.difficulty === 'Starter'
                  ? 'mint'
                  : task.difficulty === 'Beginner'
                  ? 'indigo'
                  : task.difficulty === 'Intermediate'
                  ? 'neutral'
                  : 'coral';

              const formatMeta = FORMAT_VARIATION_META[task.formatVariation];

              return (
                <Card
                  key={task.id}
                  variant="default"
                  padding="md"
                  className="flex flex-col justify-between bg-white hover:border-[#5B5BD6]/50 transition-all space-y-4 shadow-xs"
                >
                  <div className="space-y-3">
                    {/* Header Metadata (Difficulty, Format, Time, Career) */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <Badge variant={difficultyBadgeVariant} size="sm">
                          {task.difficulty}
                        </Badge>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                          CareerOS simulation
                        </span>
                        {task.isDynamic && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#F0EEFF] text-[#5B5BD6] font-semibold border border-[#E4E0FD] flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5" />
                            AI-generated
                          </span>
                        )}
                        {formatMeta && (
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#F4F3EF] text-[#344054] font-medium border border-[#E8E6DF]">
                            {formatMeta.label}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono text-[#101828] font-medium flex items-center gap-1 shrink-0">
                        <Clock className="w-3.5 h-3.5 text-[#667085]" />
                        {task.time}
                      </span>
                    </div>

                    {/* Task Title */}
                    <h3 className="text-base font-bold text-[#101828] leading-snug">
                      {task.title}
                    </h3>

                    {/* 1. What you will do */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#101828]">
                        What you will do:
                      </span>
                      <p className="text-xs text-[#475467] leading-relaxed line-clamp-3">
                        {task.whatYouWillDo}
                      </p>
                    </div>

                    {/* 2. Skills */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#98A2B3]">
                        Skills Practiced
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {task.skills.map((s, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded text-[11px] bg-[#F8F8F5] text-[#344054] border border-[#E8E6DF]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 3. Expected Output */}
                    <div className="space-y-1 pt-1 border-t border-[#E8E6DF]/70">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#21B47A]">
                        Expected Output
                      </span>
                      <p className="text-xs text-[#101828] font-medium leading-relaxed line-clamp-2">
                        {task.expectedOutput}
                      </p>
                    </div>
                  </div>

                  {/* Card Action */}
                  <div className="pt-3 border-t border-[#E8E6DF] flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setReportingTask({ id: task.id, title: task.title })}
                      title="Report task inaccuracies or issues"
                      aria-label={`Report task ${task.title}`}
                      className="p-1.5 rounded-lg border border-[#E8E6DF] text-[#98A2B3] hover:text-[#C93B2B] hover:bg-[#FFF2F0] transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
                    >
                      <Flag className="w-3 h-3" />
                      <span className="hidden sm:inline">Report</span>
                    </button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleLaunchTask(task.id)}
                      leftIcon={<Play className="w-3.5 h-3.5 fill-current" />}
                      className="cursor-pointer"
                    >
                      Start Task
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Dynamic Task Generator Modal */}
      <GenerateTaskModal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        onTaskCreated={handleTaskCreated}
        onLaunchTaskInWorkspace={handleLaunchTask}
      />

      {/* 6. Interactive Task Runner Modal (Legacy tasks) */}
      <TaskExecutionModal
        isOpen={Boolean(activeRunningTask)}
        onClose={() => setActiveRunningTask(null)}
        task={activeRunningTask}
        onCompleteTask={(task) => {
          toast.success('Task Logged to Evidence Vault!', `Recorded deliverable for "${task.title}".`);
        }}
      />

      {/* Task Safety & Quality Report Modal */}
      {reportingTask && (
        <ReportModal
          isOpen={Boolean(reportingTask)}
          onClose={() => setReportingTask(null)}
          targetType="task"
          targetId={reportingTask.id}
          targetTitle={reportingTask.title}
        />
      )}
    </div>
  );
};
