import React from 'react';
import {
  Compass,
  Zap,
  FileText,
  MessageSquare,
  FolderGit2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { RouteId } from '../../types/navigation';

export interface NoOpportunityMatchStateProps {
  onNavigate: (route: RouteId) => void;
  onClearFilters?: () => void;
  filterSummary?: string;
}

export const NoOpportunityMatchState: React.FC<NoOpportunityMatchStateProps> = ({
  onNavigate,
  onClearFilters,
  filterSummary,
}) => {
  const pathways = [
    {
      id: 'build_skill',
      title: 'Build missing skill',
      description: 'Strengthen in-demand skills through structured, evidence-based learning tracks.',
      route: 'skills' as RouteId,
      icon: Compass,
      buttonText: 'Explore Skill Paths',
      badge: 'Targeted Growth',
    },
    {
      id: 'practical_task',
      title: 'Complete a practical task',
      description: 'Spend 15-25 minutes solving an authentic workplace work sample to earn immediate proof.',
      route: 'tasks' as RouteId,
      icon: Zap,
      buttonText: 'Open Micro-Tasks',
      badge: 'Instant Proof',
    },
    {
      id: 'improve_resume',
      title: 'Improve resume',
      description: 'Run CareerOS AI assistance to audit clarity, remove repetition, and spotlight verified evidence.',
      route: 'resume' as RouteId,
      icon: FileText,
      buttonText: 'Launch Resume Engine',
      badge: 'ATS & Clarity',
    },
    {
      id: 'practice_interview',
      title: 'Practice interview',
      description: 'Rehearse realistic behavioral situations, cross-team conflict resolution, and communication.',
      route: 'interview' as RouteId,
      icon: MessageSquare,
      buttonText: 'Start AI Interview Drills',
      badge: 'Simulation Lab',
    },
    {
      id: 'build_project',
      title: 'Build project',
      description: 'Create a standalone interactive project to provide unassailable public evidence of your skills.',
      route: 'projects' as RouteId,
      icon: FolderGit2,
      buttonText: 'Choose Project Spec',
      badge: 'Portfolio Asset',
    },
  ];

  return (
    <div className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-8 space-y-6">
      <div className="max-w-2xl space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>No Dead-End Guarantee</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#101828]">
          We didn't find a strong match today.
        </h3>
        <p className="text-sm text-[#475467] leading-relaxed">
          {filterSummary
            ? `No current listings match "${filterSummary}". Rather than waiting idly on job boards, spend today creating tangible career evidence that forces employers to notice you.`
            : 'Early-career hiring shifts constantly. The highest-converting strategy while waiting for openings is stacking verified micro-proofs and refining your application materials.'}
        </p>

        {onClearFilters && (
          <div className="pt-1">
            <button
              onClick={onClearFilters}
              className="text-xs font-semibold text-[#5B5BD6] hover:text-[#4338CA] hover:underline"
            >
              Reset search & show all verified opportunities →
            </button>
          </div>
        )}
      </div>

      <div className="pt-2">
        <div className="text-xs font-bold uppercase tracking-wider text-[#667085] mb-3">
          Recommended Next Steps to Expand Your Fit
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {pathways.map((path) => {
            const Icon = path.icon;
            return (
              <div
                key={path.id}
                className="group border border-[#E8E6DF] hover:border-[#5B5BD6] rounded-xl p-4 transition-all duration-150 flex flex-col justify-between bg-[#FCFCFD] hover:bg-white hover:shadow-xs"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#E8E6DF] flex items-center justify-center text-[#5B5BD6]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-medium text-[#667085]">
                      {path.badge}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#101828] group-hover:text-[#5B5BD6] transition-colors">
                    {path.title}
                  </h4>
                  <p className="text-xs text-[#475467] leading-relaxed">
                    {path.description}
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => onNavigate(path.route)}
                    className="w-full inline-flex items-center justify-between text-xs font-semibold text-[#5B5BD6] group-hover:text-[#4338CA] pt-2 border-t border-[#F2F4F7]"
                  >
                    <span>{path.buttonText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#E8E6DF] flex items-center gap-3 text-xs text-[#475467]">
        <ShieldCheck className="w-5 h-5 text-[#21B47A] shrink-0" />
        <span>
          <strong>CareerOS Truth Standard:</strong> We will never generate fabricated job postings or claim an AI training exercise is a real corporate internship. Every listed job or internship is confirmed through audited employer career channels.
        </span>
      </div>
    </div>
  );
};
