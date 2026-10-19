import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  FileText,
  Trash2,
  ExternalLink,
  ChevronRight,
  Edit3,
  Bookmark,
  Sparkles,
  MessageSquare,
  Layers,
  Target,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { RouteId } from '../types/navigation';
import {
  ApplicationItem,
  ApplicationStatus,
  OpportunityNature,
  OpportunityCategory,
} from '../types/opportunities';
import {
  getApplications,
  updateApplicationStage,
  deleteApplication,
  addApplication,
  updateApplication,
  NATURE_LABELS,
} from '../services/opportunitiesService';
import { getEvidenceItems } from '../services/evidenceService';
import { Button } from '../components/ui/Button';

export interface ApplicationsViewProps {
  onNavigate: (route: RouteId, targetTaskId?: string) => void;
  onOpenAICompanion?: () => void;
  onStartInterviewForRole?: (company: string, role: string) => void;
}

export const APPLICATION_STATUS_LIST: {
  id: ApplicationStatus;
  label: string;
  badgeStyle: string;
  headerBorder: string;
}[] = [
  {
    id: 'Saved',
    label: 'Saved',
    badgeStyle: 'bg-slate-50 text-slate-700 border-slate-200',
    headerBorder: 'border-slate-300',
  },
  {
    id: 'Applied',
    label: 'Applied',
    badgeStyle: 'bg-blue-50 text-blue-700 border-blue-200',
    headerBorder: 'border-blue-400',
  },
  {
    id: 'Assessment',
    label: 'Assessment',
    badgeStyle: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    headerBorder: 'border-indigo-400',
  },
  {
    id: 'Interview',
    label: 'Interview',
    badgeStyle: 'bg-amber-50 text-amber-700 border-amber-200',
    headerBorder: 'border-amber-400',
  },
  {
    id: 'Offer',
    label: 'Offer',
    badgeStyle: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    headerBorder: 'border-emerald-400',
  },
  {
    id: 'Rejected',
    label: 'Rejected',
    badgeStyle: 'bg-rose-50 text-rose-700 border-rose-200',
    headerBorder: 'border-rose-400',
  },
];

export const ApplicationsView: React.FC<ApplicationsViewProps> = ({
  onNavigate,
  onOpenAICompanion,
  onStartInterviewForRole,
}) => {
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New application form state
  const [newCompany, setNewCompany] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newStatus, setNewStatus] = useState<ApplicationStatus>('Applied');
  const [newNotes, setNewNotes] = useState('');
  const [newNextAction, setNewNextAction] = useState('');
  const [newLocation, setNewLocation] = useState('Remote');

  const evidenceItems = getEvidenceItems();

  useEffect(() => {
    setApplications(getApplications());
  }, []);

  const refreshApplications = () => {
    setApplications(getApplications());
  };

  const handleStatusChange = (id: string, newStatus: ApplicationStatus) => {
    updateApplicationStage(id, newStatus);
    refreshApplications();
  };

  const handleDelete = (id: string) => {
    if (confirm('Remove this application from your tracker?')) {
      deleteApplication(id);
      refreshApplications();
    }
  };

  const handleCreateApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.trim() || !newRole.trim()) return;

    addApplication({
      company: newCompany.trim(),
      role: newRole.trim(),
      title: newRole.trim(),
      organization: newCompany.trim(),
      date: newDate || new Date().toISOString().split('T')[0],
      status: newStatus,
      stage: newStatus,
      nature: 'real_job',
      category: 'jobs',
      location: newLocation || 'Remote',
      notes: newNotes.trim(),
      nextAction: newNextAction.trim() || 'Follow up with hiring coordinator',
      nextStep: newNextAction.trim() || 'Follow up with hiring coordinator',
      evidenceCited: evidenceItems.slice(0, 2).map((e) => e.activity),
    });

    setIsAddModalOpen(false);
    setNewCompany('');
    setNewRole('');
    setNewNotes('');
    setNewNextAction('');
    refreshApplications();
  };

  const handleLaunchInterview = (app: ApplicationItem) => {
    if (onStartInterviewForRole) {
      onStartInterviewForRole(app.company, app.role);
    } else {
      onNavigate('interview');
    }
  };

  const filteredApps = applications.filter((app) => {
    const appStatus = app.status || app.stage || 'Saved';
    const matchesStatus = selectedStatus === 'all' || appStatus === selectedStatus;
    const company = (app.company || app.organization || '').toLowerCase();
    const role = (app.role || app.title || '').toLowerCase();
    const notes = (app.notes || '').toLowerCase();
    const nextAction = (app.nextAction || app.nextStep || '').toLowerCase();
    const query = searchQuery.toLowerCase();

    const matchesQuery =
      searchQuery === '' ||
      company.includes(query) ||
      role.includes(query) ||
      notes.includes(query) ||
      nextAction.includes(query);

    return matchesStatus && matchesQuery;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Navigation Switcher */}
      <div className="flex items-center gap-1.5 p-1 bg-[#F2F4F7] rounded-xl w-fit">
        <button
          onClick={() => onNavigate('opportunities')}
          className="px-3.5 py-1.5 text-xs font-semibold rounded-lg text-[#667085] hover:text-[#101828] transition-colors flex items-center gap-2"
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Browse Opportunities</span>
        </button>
        <button
          onClick={() => onNavigate('applications')}
          className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-white text-[#101828] shadow-xs flex items-center gap-2"
        >
          <Bookmark className="w-3.5 h-3.5 text-[#5B5BD6]" />
          <span>Applications Pipeline</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-bold">
            {applications.length}
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

      {/* Main Header Banner */}
      <div className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                Application Tracking System
              </span>
              <span className="text-xs text-[#667085]">
                {applications.length} Tracked Applications
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#101828]">
              Applications & Interviews Tracker
            </h1>
            <p className="text-sm text-[#475467] mt-1 max-w-2xl leading-relaxed">
              Track company, role, dates, statuses, notes, and concrete next actions across all 6 pipeline stages. Launch 1-on-1 interview practice drills tailored to any active role.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="md"
              onClick={() => onNavigate('interview')}
              leftIcon={<MessageSquare className="w-4 h-4" />}
            >
              Practice Interview
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => setIsAddModalOpen(true)}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add Application
            </Button>
          </div>
        </div>

        {/* 6 Exact Status Tabs (Segmented bar) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mt-6 pt-6 border-t border-[#F2F4F7]">
          {APPLICATION_STATUS_LIST.map((st) => {
            const count = applications.filter(
              (a) => (a.status || a.stage) === st.id
            ).length;
            const isActive = selectedStatus === st.id;
            return (
              <button
                key={st.id}
                onClick={() => setSelectedStatus(isActive ? 'all' : st.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isActive
                    ? 'border-[#5B5BD6] bg-[#F8F9FE] ring-1 ring-[#5B5BD6]'
                    : 'border-[#E8E6DF] hover:border-[#D0D5DD] bg-[#FCFCFD]'
                }`}
              >
                <div className="text-xs text-[#667085] font-medium">{st.label}</div>
                <div className="text-lg font-bold text-[#101828] mt-0.5">{count}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search and Status Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-[#E8E6DF]">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search company, role, notes, next action..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-[#667085]">Filter stage:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as any)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="all">All Statuses ({applications.length})</option>
            {APPLICATION_STATUS_LIST.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label} ({applications.filter((a) => (a.status || a.stage) === s.id).length})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Applications List */}
      {filteredApps.length === 0 ? (
        <div className="bg-white border border-[#E8E6DF] rounded-2xl p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 mx-auto flex items-center justify-center text-slate-500">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              No applications match this filter
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              {searchQuery || selectedStatus !== 'all'
                ? 'Try clearing your search query or switching to All Statuses.'
                : 'Your pipeline is currently empty. Add an application or explore verified opportunities to begin tracking.'}
            </p>
          </div>
          <div className="pt-2 flex items-center justify-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setSelectedStatus('all');
              }}
            >
              Reset Filters
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => onNavigate('opportunities')}
              leftIcon={<Briefcase className="w-4 h-4" />}
            >
              Explore Opportunities
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredApps.map((app) => {
            const currentStatus = app.status || app.stage || 'Saved';
            const statusConfig =
              APPLICATION_STATUS_LIST.find((s) => s.id === currentStatus) ||
              APPLICATION_STATUS_LIST[0];

            const company = app.company || app.organization || 'Company';
            const role = app.role || app.title || 'Role';
            const date = app.date || app.lastUpdated;
            const nextAction = app.nextAction || app.nextStep || 'Review application status';

            return (
              <div
                key={app.id}
                className="bg-white border border-[#E8E6DF] hover:border-[#D0D5DD] rounded-xl p-5 transition-all flex flex-col md:flex-row md:items-start justify-between gap-4"
              >
                {/* Main Application Details: Company, Role, Date, Notes, Next Action */}
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Status Pill Badge */}
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded border ${statusConfig.badgeStyle}`}
                    >
                      {statusConfig.label}
                    </span>

                    <span className="text-xs text-[#667085] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Date: <strong>{date}</strong>
                    </span>

                    <span aria-hidden="true" className="text-slate-300">·</span>

                    <span className="text-xs text-[#667085]">
                      {app.location || 'Remote'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#101828]">
                      {role}
                    </h3>
                    <div className="text-sm font-semibold text-[#344054] mt-0.5">
                      {company}
                    </div>
                  </div>

                  {/* Notes */}
                  {app.notes && (
                    <div className="text-xs text-[#475467] leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
                      <span className="font-semibold text-slate-700">Notes: </span>
                      {app.notes}
                    </div>
                  )}

                  {/* Required Next Action */}
                  <div className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-200/80 flex items-start gap-2 text-xs">
                    <Target className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-amber-900">Next Action: </span>
                      <span className="text-amber-800">{nextAction}</span>
                    </div>
                  </div>

                  {/* Attached Career Evidence */}
                  {app.evidenceCited && app.evidenceCited.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[11px] font-semibold text-[#667085] flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#21B47A]" />
                        Attached Evidence:
                      </span>
                      {app.evidenceCited.map((ev, i) => (
                        <span
                          key={i}
                          className="text-[11px] px-2 py-0.5 rounded bg-[#F2F4F7] text-[#344054] truncate max-w-xs"
                        >
                          {ev}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Action Bar: Status Dropdown, Practice Interview, and Delete */}
                <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end justify-between gap-3 shrink-0 pt-2 md:pt-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-medium">Status:</span>
                    <select
                      value={currentStatus}
                      onChange={(e) =>
                        handleStatusChange(app.id, e.target.value as ApplicationStatus)
                      }
                      className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                      {APPLICATION_STATUS_LIST.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleLaunchInterview(app)}
                      leftIcon={<MessageSquare className="w-3.5 h-3.5" />}
                    >
                      Practice Interview
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <button
                      onClick={() => onNavigate('resume')}
                      className="text-slate-500 hover:text-indigo-600 inline-flex items-center gap-1"
                    >
                      <FileText className="w-3 h-3" />
                      Resume
                    </button>
                    <span className="text-slate-300">|</span>
                    <button
                      onClick={() => handleDelete(app.id)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                      title="Remove application"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Manual Add Application Modal (Required fields: company, role, date, status, notes, next action) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white border border-[#E8E6DF] rounded-2xl w-full max-w-lg shadow-xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#F2F4F7]">
              <div>
                <h3 className="text-lg font-bold text-[#101828]">
                  Track New Application
                </h3>
                <p className="text-xs text-[#667085] mt-0.5">
                  Record company, role, status, notes, and concrete next actions.
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateApplication} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Company *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Khan Academy"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Role *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Associate Frontend Engineer"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Application Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Status *
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as ApplicationStatus)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    {APPLICATION_STATUS_LIST.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Next Action *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Complete take-home assessment before Friday 5 PM"
                  value={newNextAction}
                  onChange={(e) => setNewNextAction(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Key requirements, interviewer contacts, take-home notes, or interview feedback..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white resize-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Location (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Remote or Hybrid (San Francisco)"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#F2F4F7]">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Save Application
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
