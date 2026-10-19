import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  ArrowRight,
  Check,
  Plus,
  Play,
  Rocket,
  BookOpen,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
  Compass,
  RotateCcw,
  Sliders,
  Filter,
} from 'lucide-react';
import { RouteId } from '../types/navigation';
import { UserProfile } from '../types/user';
import {
  SkillCategory,
  SKILL_CATEGORIES_CATALOG,
  SkillToActionInput,
  PracticalTaskRec,
  SmallProjectRec,
  SkillBuildingActivityRec,
} from '../types/skillToAction';
import { generateSkillRecommendations } from '../services/skillRecommendationEngine';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import {
  TryThisModal,
  ProjectIdeaModal,
  LearnNextModal,
} from '../components/skills/SkillActionModals';
import { useToast } from '../components/ui/Toast';

export interface SkillToActionViewProps {
  onNavigate: (route: RouteId) => void;
  userProfile?: UserProfile;
  onOpenAICompanion?: () => void;
}

export const SkillToActionView: React.FC<SkillToActionViewProps> = ({
  onNavigate,
  userProfile,
  onOpenAICompanion,
}) => {
  const { toast } = useToast();

  // Active Category Tab for skills selection
  const [activeCategoryTab, setActiveCategoryTab] = useState<SkillCategory>('technical');

  // Selected Skills State (preloaded from userProfile if available)
  const [selectedSkills, setSelectedSkills] = useState<string[]>(() => {
    return userProfile?.skills && userProfile.skills.length > 0
      ? userProfile.skills
      : ['HTML & CSS', 'JavaScript / TypeScript', 'Concise Written Communication'];
  });

  // "I don't know what my skills are yet" toggle mode
  const [isUnknownSkillsMode, setIsUnknownSkillsMode] = useState(false);

  // Custom added skill input
  const [customSkillInput, setCustomSkillInput] = useState('');

  // Context filters
  const [careerDirection, setCareerDirection] = useState(
    userProfile?.careerGoal || 'Full-Stack Software & Product Engineering'
  );
  const [experienceLevel, setExperienceLevel] = useState(
    userProfile?.currentLevel || 'Level 1: Foundation Builder'
  );
  const [availableTime, setAvailableTime] = useState(
    userProfile?.availableTime || '5-8 hours / week'
  );

  // Active Results Tab
  const [resultsTab, setResultsTab] = useState<
    'directions' | 'tasks' | 'projects' | 'learn-next'
  >('tasks');

  // Modals for the 3 distinct actionable tools
  const [activeTryTask, setActiveTryTask] = useState<PracticalTaskRec | null>(null);
  const [activeProjectIdea, setActiveProjectIdea] = useState<SmallProjectRec | null>(null);
  const [activeLearnNext, setActiveLearnNext] = useState<SkillBuildingActivityRec | null>(null);

  // Toggle skill selection
  const handleToggleSkill = (skill: string) => {
    if (isUnknownSkillsMode) setIsUnknownSkillsMode(false);

    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customSkillInput.trim();
    if (!trimmed) return;
    if (!selectedSkills.includes(trimmed)) {
      setSelectedSkills((prev) => [...prev, trimmed]);
      toast.info('Skill Added', `"${trimmed}" included in your active skill anchors.`);
    }
    setCustomSkillInput('');
    if (isUnknownSkillsMode) setIsUnknownSkillsMode(false);
  };

  const handleUnknownSkillsClick = () => {
    setIsUnknownSkillsMode(true);
    setSelectedSkills([]);
    toast.info('Discovery Mode Enabled', "Let's explore your starting point without prior assumptions.");
  };

  // Compute recommendations dynamically
  const recommendations = useMemo(() => {
    const input: SkillToActionInput = {
      skills: selectedSkills,
      interests: userProfile?.interests || ['Technology', 'Design'],
      careerDirection,
      experienceLevel,
      availableTime,
      isUnknownSkillsMode,
    };
    return generateSkillRecommendations(input);
  }, [
    selectedSkills,
    careerDirection,
    experienceLevel,
    availableTime,
    isUnknownSkillsMode,
    userProfile,
  ]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-left pb-16">
      {/* 0. Section Switcher: Action Catalog vs Skill Diagnostics */}
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
            onClick={() => onNavigate('communication')}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-[#475467] hover:bg-[#F0EEFF] hover:text-[#5B5BD6] transition-colors"
          >
            Workplace Communication Practice
          </button>
          <button
            type="button"
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#5B5BD6] text-white shadow-xs"
          >
            What Can I Do With My Skills? (Diagnostics)
          </button>
        </div>

        {onOpenAICompanion && (
          <button
            type="button"
            onClick={onOpenAICompanion}
            className="text-xs font-medium text-[#5B5BD6] hover:underline flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Need advice on what to tackle first?</span>
          </button>
        )}
      </div>

      {/* 1. View Header with Exact Main Heading */}
      <div className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E8E6DF]">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="indigo" size="sm">
                Skill-to-Action Engine
              </Badge>
              <span className="text-xs text-[#667085]">Evidence Builder</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#101828]">
              What can I actually do with the skills I have?
            </h1>
            <p className="text-sm sm:text-base text-[#475467] leading-relaxed">
              Don&apos;t wait until you &ldquo;know everything&rdquo;. Connect your current combination of technical, creative, business, and human skills into immediate practical tasks, small portfolio projects, and next steps.
            </p>
          </div>

          {/* Quick Action Triggers summary pill */}
          <div className="p-4 rounded-xl bg-[#F0EEFF]/50 border border-[#E4E0FD] text-xs text-[#475467] max-w-xs shrink-0 space-y-2">
            <div className="flex items-center gap-1.5 text-[#5B5BD6] font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>3 Immediate Action Tools</span>
            </div>
            <ul className="space-y-1 text-[11px] text-[#475467] list-none pl-0">
              <li>• <strong>Try This: </strong> 15-min practical win</li>
              <li>• <strong>Project Idea: </strong> Scoped portfolio brief</li>
              <li>• <strong>Learn Next: </strong> High-leverage gap filler</li>
            </ul>
          </div>
        </div>

        {/* 2. Interactive Skill Selector */}
        <div className="pt-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs font-semibold text-[#101828] uppercase tracking-wider">
              Select or add your skills ({selectedSkills.length} selected):
            </span>

            {/* "I don't know what my skills are yet" Option */}
            <button
              type="button"
              onClick={handleUnknownSkillsClick}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                isUnknownSkillsMode
                  ? 'bg-[#5B5BD6] text-white border-[#5B5BD6] shadow-xs'
                  : 'bg-[#F8F8F5] text-[#5B5BD6] border-[#E8E6DF] hover:border-[#5B5BD6]'
              }`}
            >
              I don&apos;t know what my skills are yet.
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-[#F8F8F5] rounded-xl border border-[#E8E6DF]">
            {SKILL_CATEGORIES_CATALOG.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategoryTab(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  activeCategoryTab === cat.id
                    ? 'bg-white text-[#101828] shadow-xs font-semibold'
                    : 'text-[#667085] hover:text-[#101828]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Skills Pill Cloud for Selected Category */}
          <div className="p-4 bg-white rounded-xl border border-[#E8E6DF] space-y-3">
            <p className="text-xs text-[#667085]">
              {SKILL_CATEGORIES_CATALOG.find((c) => c.id === activeCategoryTab)?.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {SKILL_CATEGORIES_CATALOG.find(
                (c) => c.id === activeCategoryTab
              )?.skills.map((skill) => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleToggleSkill(skill)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      isSelected
                        ? 'bg-[#5B5BD6] text-white border-[#5B5BD6] shadow-xs'
                        : 'bg-[#F8F8F5] text-[#344054] border-[#E8E6DF] hover:border-[#D3D0C6] hover:bg-white'
                    }`}
                  >
                    {isSelected && <span className="mr-1.5">✓</span>}
                    {skill}
                  </button>
                );
              })}
            </div>

            {/* Custom Skill Input to ensure system is never limited */}
            <form onSubmit={handleAddCustomSkill} className="pt-2 flex items-center gap-2 max-w-md">
              <input
                type="text"
                placeholder="Add any other skill (e.g. Docker, Sales, Notion, Audio)..."
                value={customSkillInput}
                onChange={(e) => setCustomSkillInput(e.target.value)}
                className="flex-1 bg-[#F8F8F5] border border-[#E8E6DF] rounded-lg px-3 py-1.5 text-xs text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#5B5BD6]"
              />
              <Button type="submit" variant="outline" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
                Add Skill
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* 3. Synthesis Output Canvas */}
      <div className="space-y-5">
        {/* Synthesis Headline */}
        <div className="p-4 rounded-xl bg-white border border-[#E8E6DF] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5B5BD6]">
              Action Synthesis
            </span>
            <p className="text-xs sm:text-sm text-[#101828] font-medium">
              {recommendations.headlineSummary}
            </p>
          </div>

          {/* Direct Tools Quick Launchers */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setResultsTab('tasks');
                if (recommendations.practicalTasks[0]) setActiveTryTask(recommendations.practicalTasks[0]);
              }}
              leftIcon={<Play className="w-3.5 h-3.5 text-[#21B47A]" />}
            >
              Try This
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setResultsTab('projects');
                if (recommendations.smallProjects[0]) setActiveProjectIdea(recommendations.smallProjects[0]);
              }}
              leftIcon={<Rocket className="w-3.5 h-3.5 text-[#5B5BD6]" />}
            >
              Give Me a Project Idea
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setResultsTab('learn-next');
                if (recommendations.skillBuildingActivities[0]) setActiveLearnNext(recommendations.skillBuildingActivities[0]);
              }}
              leftIcon={<BookOpen className="w-3.5 h-3.5 text-[#F26B5B]" />}
            >
              What Should I Learn Next?
            </Button>
          </div>
        </div>

        {/* Results Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#E8E6DF] pb-2">
          <button
            type="button"
            onClick={() => setResultsTab('tasks')}
            className={`pb-2 px-3 text-xs sm:text-sm font-semibold border-b-2 -mb-2.5 transition-all ${
              resultsTab === 'tasks'
                ? 'border-[#5B5BD6] text-[#5B5BD6]'
                : 'border-transparent text-[#667085] hover:text-[#101828]'
            }`}
          >
            Practical Tasks ({recommendations.practicalTasks.length})
          </button>

          <button
            type="button"
            onClick={() => setResultsTab('projects')}
            className={`pb-2 px-3 text-xs sm:text-sm font-semibold border-b-2 -mb-2.5 transition-all ${
              resultsTab === 'projects'
                ? 'border-[#5B5BD6] text-[#5B5BD6]'
                : 'border-transparent text-[#667085] hover:text-[#101828]'
            }`}
          >
            Small Projects ({recommendations.smallProjects.length})
          </button>

          <button
            type="button"
            onClick={() => setResultsTab('directions')}
            className={`pb-2 px-3 text-xs sm:text-sm font-semibold border-b-2 -mb-2.5 transition-all ${
              resultsTab === 'directions'
                ? 'border-[#5B5BD6] text-[#5B5BD6]'
                : 'border-transparent text-[#667085] hover:text-[#101828]'
            }`}
          >
            Possible Career Directions ({recommendations.possibleDirections.length})
          </button>

          <button
            type="button"
            onClick={() => setResultsTab('learn-next')}
            className={`pb-2 px-3 text-xs sm:text-sm font-semibold border-b-2 -mb-2.5 transition-all ${
              resultsTab === 'learn-next'
                ? 'border-[#5B5BD6] text-[#5B5BD6]'
                : 'border-transparent text-[#667085] hover:text-[#101828]'
            }`}
          >
            What Should I Learn Next? ({recommendations.skillBuildingActivities.length})
          </button>
        </div>

        {/* 4. Tab 1: Practical Tasks */}
        {resultsTab === 'tasks' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-in fade-in duration-150">
            {recommendations.practicalTasks.map((task) => (
              <Card
                key={task.id}
                variant="default"
                padding="md"
                className="flex flex-col justify-between bg-white hover:border-[#5B5BD6]/50 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-[#21B47A] font-semibold">
                      {task.timeEstimate}
                    </span>
                    <Badge variant="neutral" size="sm">
                      {task.difficulty}
                    </Badge>
                  </div>

                  <h3 className="text-base font-bold text-[#101828] leading-snug">
                    {task.title}
                  </h3>

                  {/* Mandated "Why this fits you." */}
                  <div className="p-3 rounded-lg bg-[#F0EEFF]/50 border border-[#E4E0FD] text-xs text-[#475467] leading-relaxed">
                    <strong className="text-[#5B5BD6] font-semibold block mb-0.5">
                      Why this fits you:
                    </strong>
                    {task.whyThisFitsYou}
                  </div>

                  <div className="text-xs text-[#667085] space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#98A2B3]">Deliverable</span>
                    <p className="text-xs text-[#101828] font-medium">{task.deliverable}</p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E8E6DF] flex items-center justify-between">
                  <span className="text-[11px] text-[#667085]">Micro-Proof Win</span>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setActiveTryTask(task)}
                    leftIcon={<Play className="w-3.5 h-3.5 fill-current" />}
                  >
                    Try This
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* 5. Tab 2: Small Projects */}
        {resultsTab === 'projects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-in fade-in duration-150">
            {recommendations.smallProjects.map((proj) => (
              <Card
                key={proj.id}
                variant="default"
                padding="lg"
                className="flex flex-col justify-between bg-white hover:border-[#5B5BD6]/50 transition-all space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono text-[#5B5BD6] font-semibold">
                      {proj.timeCommitment}
                    </span>
                    <Badge variant="indigo" size="sm">
                      {proj.difficulty}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-bold text-[#101828]">
                    {proj.title}
                  </h3>

                  {/* Mandated "Why this fits you." */}
                  <div className="p-3.5 rounded-xl bg-[#F0EEFF]/50 border border-[#E4E0FD] text-xs text-[#475467] leading-relaxed">
                    <strong className="text-[#5B5BD6] font-semibold block mb-0.5">
                      Why this fits you:
                    </strong>
                    {proj.whyThisFitsYou}
                  </div>

                  <div className="space-y-1.5 text-xs text-[#475467]">
                    <strong className="text-[#101828] font-semibold block">Concrete Deliverables:</strong>
                    <ul className="space-y-1 pl-0 list-none">
                      {proj.concreteDeliverables.map((deliv, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#21B47A] shrink-0 mt-0.5" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8E6DF] flex items-center justify-between">
                  <span className="text-xs text-[#21B47A] font-medium">Vault Proof Outcome</span>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => setActiveProjectIdea(proj)}
                    rightIcon={<Rocket className="w-4 h-4" />}
                  >
                    Give Me a Project Idea
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* 6. Tab 3: Possible Career Directions */}
        {resultsTab === 'directions' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-in fade-in duration-150">
            {recommendations.possibleDirections.map((dir) => (
              <Card
                key={dir.id}
                variant="default"
                padding="lg"
                className="bg-white hover:border-[#5B5BD6]/50 transition-all space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="indigo" size="sm">
                      {dir.category}
                    </Badge>
                    <span className="text-xs font-mono font-bold text-[#21B47A]">
                      {dir.matchScore}% Match
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#101828]">{dir.title}</h3>

                  {/* Mandated "Why this fits you." */}
                  <div className="p-3.5 rounded-xl bg-[#F0EEFF]/50 border border-[#E4E0FD] text-xs text-[#475467] leading-relaxed">
                    <strong className="text-[#5B5BD6] font-semibold block mb-0.5">
                      Why this fits you:
                    </strong>
                    {dir.whyThisFitsYou}
                  </div>

                  <div className="space-y-1.5 pt-1 text-xs">
                    <div className="flex items-center gap-1.5 text-[#667085]">
                      <span className="font-semibold text-[#101828]">Matched anchors: </span>
                      <span>{dir.matchedSkills.join(', ')}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E8E6DF] flex items-center justify-between">
                  <span className="text-xs text-[#667085]">Explore deeper in catalog</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigate('explore')}
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    View in Career Explorer
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* 7. Tab 4: What Should I Learn Next? */}
        {resultsTab === 'learn-next' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-in fade-in duration-150">
            {recommendations.skillBuildingActivities.map((act) => (
              <Card
                key={act.id}
                variant="default"
                padding="md"
                className="flex flex-col justify-between bg-white hover:border-[#5B5BD6]/50 transition-all space-y-3"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="mint" size="sm">
                      {act.priority}
                    </Badge>
                    <span className="text-xs font-mono text-[#667085]">{act.timeToAcquire}</span>
                  </div>

                  <h3 className="text-base font-bold text-[#101828] leading-snug">
                    {act.skillName}
                  </h3>

                  {/* Mandated "Why this fits you." */}
                  <div className="p-3 rounded-lg bg-[#F0EEFF]/50 border border-[#E4E0FD] text-xs text-[#475467] leading-relaxed">
                    <strong className="text-[#5B5BD6] font-semibold block mb-0.5">
                      Why this fits you:
                    </strong>
                    {act.whyThisFitsYou}
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#F8F8F5] text-xs text-[#101828] leading-relaxed">
                    <strong className="block text-[10px] uppercase text-[#667085] mb-0.5">Starting action</strong>
                    {act.recommendedStartingAction}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E8E6DF] flex items-center justify-between">
                  <span className="text-xs text-[#667085]">Gap filler</span>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setActiveLearnNext(act)}
                  >
                    What Should I Learn Next?
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* 8. Modals for the 3 Action Triggers */}
      <TryThisModal
        isOpen={Boolean(activeTryTask)}
        onClose={() => setActiveTryTask(null)}
        task={activeTryTask}
        onCompleteTask={(task) => {
          toast.success('Task Logged to Vault', `Verified artifact for "${task.title}".`);
        }}
      />

      <ProjectIdeaModal
        isOpen={Boolean(activeProjectIdea)}
        onClose={() => setActiveProjectIdea(null)}
        project={activeProjectIdea}
        onAddToRoadmap={(proj) => {
          toast.success('Added to Roadmap', `"${proj.title}" scheduled for execution.`);
        }}
      />

      <LearnNextModal
        isOpen={Boolean(activeLearnNext)}
        onClose={() => setActiveLearnNext(null)}
        activity={activeLearnNext}
      />
    </div>
  );
};
