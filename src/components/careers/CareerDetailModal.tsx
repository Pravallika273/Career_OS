import React from 'react';
import {
  X,
  Play,
  CheckCircle2,
  BookOpen,
  Briefcase,
  Layers,
  Sparkles,
  Rocket,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import { CareerRole } from '../../types/careers';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

export interface CareerDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: CareerRole | null;
  onLaunchTryActivity: (role: CareerRole) => void;
}

export const CareerDetailModal: React.FC<CareerDetailModalProps> = ({
  isOpen,
  onClose,
  role,
  onLaunchTryActivity,
}) => {
  if (!isOpen || !role) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-3 sm:p-4 text-left">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#101828]/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-[#E8E6DF] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Top Header */}
        <div className="p-4 sm:px-6 border-b border-[#E8E6DF] bg-[#F8F8F5]/80 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="indigo" size="sm">
                Career Blueprint
              </Badge>
              <span className="text-xs text-[#667085] uppercase tracking-wider font-semibold">
                {role.categoryId}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#101828]">
              {role.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
              {role.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#98A2B3] hover:text-[#101828] hover:bg-[#E8E6DF] transition-colors shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Callout Bar */}
        <div className="px-4 sm:px-6 py-3 bg-[#F0EEFF]/50 border-b border-[#E4E0FD] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-[#475467]">
            <strong className="text-[#5B5BD6] font-semibold">Try Before You Decide: </strong>
            Experience a ~5-minute slice of this work with zero commitment.
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              onClose();
              onLaunchTryActivity(role);
            }}
            leftIcon={<Play className="w-3.5 h-3.5 fill-current" />}
            className="shrink-0"
          >
            Try This Career
          </Button>
        </div>

        {/* Modal Scrollable Body showing the 6 required dimensions */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* 1. What this career involves */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#5B5BD6]">
              01. What this career involves
            </h4>
            <p className="text-sm text-[#344054] leading-relaxed bg-[#F8F8F5] p-3.5 rounded-xl border border-[#E8E6DF]">
              {role.whatItInvolves}
            </p>
          </div>

          {/* 2. Common work */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#101828]">
              02. Common day-to-day work
            </h4>
            <ul className="space-y-1.5 pl-0 list-none">
              {role.commonWork.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#475467]">
                  <CheckCircle2 className="w-4 h-4 text-[#21B47A] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Useful skills */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#101828]">
              03. Useful skills to build
            </h4>
            <div className="flex flex-wrap gap-2">
              {role.usefulSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#F8F8F5] text-[#344054] border border-[#E8E6DF]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* 4. Beginner-friendly tasks */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#21B47A]">
              04. Beginner-friendly tasks (Where to start)
            </h4>
            <div className="space-y-2">
              {role.beginnerFriendlyTasks.map((task, idx) => (
                <div key={idx} className="p-3 rounded-lg border border-[#E8E6DF] bg-white text-xs text-[#344054] flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#E8F8F1] text-[#21B47A] font-bold text-[11px] flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{task}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Example projects */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#101828]">
              05. Example projects for your evidence vault
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {role.exampleProjects.map((proj, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#F8F8F5] border border-[#E8E6DF] text-xs text-[#475467]">
                  <Rocket className="w-3.5 h-3.5 text-[#5B5BD6] mb-1.5" />
                  <p className="font-medium text-[#101828] leading-snug">{proj}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Typical workplace activities */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#667085]">
              06. Typical workplace activities & collaboration
            </h4>
            <ul className="space-y-1.5 pl-0 list-none">
              {role.typicalWorkplaceActivities.map((act, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-[#667085]">
                  <span className="text-[#98A2B3]">·</span>
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:px-6 border-t border-[#E8E6DF] bg-white flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Back to Catalog
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              onClose();
              onLaunchTryActivity(role);
            }}
            leftIcon={<Play className="w-4 h-4 fill-current" />}
          >
            Try Mini Activity (~5 mins)
          </Button>
        </div>
      </div>
    </div>
  );
};
