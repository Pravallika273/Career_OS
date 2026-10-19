/**
 * CareerOS - Global Career Development Platform
 * "Start wherever you are. Do something useful. Learn from it. Build proof. Become ready."
 */

import React, { useState, useEffect } from 'react';
import { RouteId } from './types/navigation';
import { UserProfile, DEFAULT_USER_PROFILE } from './types/user';
import { ToastProvider, useToast } from './components/ui/Toast';
import { AppShell } from './components/layout/AppShell';
import { Dialog } from './components/ui/Dialog';
import { Button } from './components/ui/Button';
import { Input, Textarea } from './components/ui/Input';
import { HomeView } from './views/HomeView';
import { AuthProvider, useAuth } from './context/AuthContext';
import { I18nProvider } from './context/I18nContext';
import { LazyLoadBoundary } from './components/common/LazyLoadBoundary';

// Lazy-loaded views for instant mobile startup and small initial asset bundle
const ExploreView = React.lazy(() => import('./views/ExploreView').then((m) => ({ default: m.ExploreView })));
const DiscoveryView = React.lazy(() => import('./views/DiscoveryView').then((m) => ({ default: m.DiscoveryView })));
const PlansView = React.lazy(() => import('./views/PlansView').then((m) => ({ default: m.PlansView })));
const SkillToActionView = React.lazy(() => import('./views/SkillToActionView').then((m) => ({ default: m.SkillToActionView })));
const TasksView = React.lazy(() => import('./views/TasksView').then((m) => ({ default: m.TasksView })));
const TaskWorkspaceView = React.lazy(() => import('./views/TaskWorkspaceView').then((m) => ({ default: m.TaskWorkspaceView })));
const SkillsView = React.lazy(() => import('./views/SkillsView').then((m) => ({ default: m.SkillsView })));
const ProjectsView = React.lazy(() => import('./views/ProjectsView').then((m) => ({ default: m.ProjectsView })));
const EvidenceView = React.lazy(() => import('./views/EvidenceView').then((m) => ({ default: m.EvidenceView })));
const CommunicationView = React.lazy(() => import('./views/CommunicationView').then((m) => ({ default: m.CommunicationView })));
const WorkReadyView = React.lazy(() => import('./views/WorkReadyView').then((m) => ({ default: m.WorkReadyView })));
const PortfolioView = React.lazy(() => import('./views/PortfolioView').then((m) => ({ default: m.PortfolioView })));
const ResumeView = React.lazy(() => import('./views/ResumeView').then((m) => ({ default: m.ResumeView })));
const NetworkView = React.lazy(() => import('./views/NetworkView').then((m) => ({ default: m.NetworkView })));
const MentorsView = React.lazy(() => import('./views/MentorsView').then((m) => ({ default: m.MentorsView })));
const OpportunitiesView = React.lazy(() => import('./views/OpportunitiesView').then((m) => ({ default: m.OpportunitiesView })));
const ApplicationsView = React.lazy(() => import('./views/ApplicationsView').then((m) => ({ default: m.ApplicationsView })));
const InterviewView = React.lazy(() => import('./views/InterviewView').then((m) => ({ default: m.InterviewView })));
const DesignSystemShowcase = React.lazy(() => import('./views/DesignSystemShowcase').then((m) => ({ default: m.DesignSystemShowcase })));
const LoginView = React.lazy(() => import('./views/LoginView').then((m) => ({ default: m.LoginView })));
const SignupView = React.lazy(() => import('./views/SignupView').then((m) => ({ default: m.SignupView })));
const OnboardingView = React.lazy(() => import('./views/OnboardingView').then((m) => ({ default: m.OnboardingView })));
const ProfileView = React.lazy(() => import('./views/ProfileView').then((m) => ({ default: m.ProfileView })));
const SettingsView = React.lazy(() => import('./views/SettingsView').then((m) => ({ default: m.SettingsView })));
const HelpView = React.lazy(() => import('./views/HelpView').then((m) => ({ default: m.HelpView })));
const NotificationsView = React.lazy(() => import('./views/NotificationsView').then((m) => ({ default: m.NotificationsView })));
const CareerOSAIModal = React.lazy(() => import('./components/ai/CareerOSAIModal').then((m) => ({ default: m.CareerOSAIModal })));

function CareerOSApp() {
  const { userProfile, updateUserProfile, currentUser } = useAuth();
  const [currentRoute, setCurrentRoute] = useState<RouteId>('home');
  const [activeTaskId, setActiveTaskId] = useState<string>('task-deconstruct-req');

  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);
  const [isAICompanionOpen, setIsAICompanionOpen] = useState(false);
  const [quickTaskTitle, setQuickTaskTitle] = useState('Deconstruct 1 Real Job Requirement');
  const [quickTaskNotes, setQuickTaskNotes] = useState('');
  const [interviewTargetCompany, setInterviewTargetCompany] = useState<string>('');
  const [interviewTargetRole, setInterviewTargetRole] = useState<string>('');
  const { toast } = useToast();

  // Listen to hash changes (e.g. #home, #tasks/task-deconstruct-req, #login)
  useEffect(() => {
    const handleHash = () => {
      const rawHash = window.location.hash.replace('#', '').trim();

      // Match /tasks/[id] or tasks/[id]
      if (rawHash.startsWith('tasks/') || rawHash.startsWith('/tasks/')) {
        const id = rawHash.replace(/^\/?tasks\//, '');
        if (id) {
          setActiveTaskId(id);
          setCurrentRoute('task-workspace');
          return;
        }
      }

      if (rawHash === 'tasks' || rawHash === '/tasks') {
        setCurrentRoute('tasks');
        return;
      }

      if (rawHash === 'communication' || rawHash === '/communication') {
        setCurrentRoute('communication');
        return;
      }

      if (
        rawHash === 'work-ready' ||
        rawHash === '/work-ready' ||
        rawHash.startsWith('work-ready')
      ) {
        setCurrentRoute('work-ready');
        return;
      }

      if (
        rawHash === 'career/evidence' ||
        rawHash === '/career/evidence' ||
        rawHash === 'evidence' ||
        rawHash === '/evidence'
      ) {
        setCurrentRoute('evidence');
        return;
      }

      if (rawHash === 'resume' || rawHash === '/resume') {
        setCurrentRoute('resume');
        return;
      }

      if (rawHash === 'applications' || rawHash === '/applications') {
        setCurrentRoute('applications');
        return;
      }

      if (rawHash === 'interview' || rawHash === '/interview') {
        setCurrentRoute('interview');
        return;
      }

      if (rawHash === 'mentors' || rawHash === '/mentors') {
        setCurrentRoute('mentors');
        return;
      }

      if (rawHash === 'opportunities' || rawHash === '/opportunities') {
        setCurrentRoute('opportunities');
        return;
      }

      const hash = rawHash as RouteId;
      const validRoutes: RouteId[] = [
        'home',
        'my-plan',
        'explore',
        'careers',
        'learn',
        'tasks',
        'task-workspace',
        'learn-and-do',
        'communication',
        'work-ready',
        '/work-ready',
        'opportunities',
        'applications',
        'interview',
        'mentors',
        '/mentors',
        'my-career',
        'career/evidence',
        'evidence',
        'portfolio',
        'resume',
        'help',
        'notifications',
        'profile',
        'settings',
        'overview',
        'discovery',
        'plans',
        'skills',
        'projects',
        'network',
        'design-system',
        'login',
        'signup',
        'onboarding',
      ];
      if (validRoutes.includes(hash)) {
        setCurrentRoute(hash);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const routeBreadcrumbsMap: Record<RouteId, { label: string; routeId?: RouteId }[]> = {
    home: [{ label: 'CareerOS' }, { label: 'Home' }],
    overview: [{ label: 'CareerOS' }, { label: 'Home' }],
    'my-plan': [{ label: 'CareerOS', routeId: 'home' }, { label: 'My Plan' }],
    plans: [{ label: 'CareerOS', routeId: 'home' }, { label: 'My Plan' }],
    explore: [{ label: 'CareerOS', routeId: 'home' }, { label: 'Explore & Careers' }],
    careers: [{ label: 'CareerOS', routeId: 'home' }, { label: 'Explore & Careers' }],
    discovery: [{ label: 'CareerOS', routeId: 'home' }, { label: 'Explore & Careers' }],
    learn: [{ label: 'CareerOS', routeId: 'home' }, { label: 'Learn & Do (Tasks)' }],
    tasks: [{ label: 'CareerOS', routeId: 'home' }, { label: 'Practical Tasks & Challenges' }],
    'task-workspace': [
      { label: 'CareerOS', routeId: 'home' },
      { label: 'Practical Tasks', routeId: 'tasks' },
      { label: 'Task Workspace' },
    ],
    'learn-and-do': [{ label: 'CareerOS', routeId: 'home' }, { label: 'Skill to Action' }],
    skills: [{ label: 'CareerOS', routeId: 'home' }, { label: 'Skill to Action' }],
    communication: [
      { label: 'CareerOS', routeId: 'home' },
      { label: 'Learn & Do', routeId: 'tasks' },
      { label: 'Workplace Communication' },
    ],
    'work-ready': [
      { label: 'CareerOS', routeId: 'home' },
      { label: 'Work-Ready (How Work Works)' },
    ],
    '/work-ready': [
      { label: 'CareerOS', routeId: 'home' },
      { label: 'Work-Ready (How Work Works)' },
    ],
    projects: [{ label: 'CareerOS', routeId: 'home' }, { label: 'Projects & Challenges' }],
    opportunities: [{ label: 'CareerOS', routeId: 'home' }, { label: 'Opportunities' }],
    applications: [
      { label: 'CareerOS', routeId: 'home' },
      { label: 'Opportunities', routeId: 'opportunities' },
      { label: 'Applications Pipeline' },
    ],
    interview: [
      { label: 'CareerOS', routeId: 'home' },
      { label: 'Applications', routeId: 'applications' },
      { label: 'AI Interview Practice' },
    ],
    'my-career': [{ label: 'CareerOS', routeId: 'home' }, { label: 'My Career & Proof' }],
    'career/evidence': [
      { label: 'CareerOS', routeId: 'home' },
      { label: 'My Career', routeId: 'my-career' },
      { label: 'Career Evidence' },
    ],
    evidence: [
      { label: 'CareerOS', routeId: 'home' },
      { label: 'My Career', routeId: 'my-career' },
      { label: 'Career Evidence' },
    ],
    portfolio: [{ label: 'CareerOS', routeId: 'home' }, { label: 'Portfolio & Resume' }],
    resume: [
      { label: 'CareerOS', routeId: 'home' },
      { label: 'My Career', routeId: 'my-career' },
      { label: 'Resume Builder' },
    ],
    network: [{ label: 'CareerOS', routeId: 'home' }, { label: 'Mentors & Community' }],
    mentors: [{ label: 'CareerOS', routeId: 'home' }, { label: 'Friendly Mentors & Alumni' }],
    '/mentors': [{ label: 'CareerOS', routeId: 'home' }, { label: 'Friendly Mentors & Alumni' }],
    help: [{ label: 'CareerOS', routeId: 'home' }, { label: 'Help' }],
    notifications: [{ label: 'CareerOS', routeId: 'home' }, { label: 'Notifications' }],
    profile: [{ label: 'CareerOS', routeId: 'home' }, { label: 'Profile' }],
    settings: [{ label: 'CareerOS', routeId: 'home' }, { label: 'Settings' }],
    'design-system': [{ label: 'CareerOS', routeId: 'home' }, { label: 'Design System Lab' }],
    login: [{ label: 'CareerOS', routeId: 'home' }, { label: 'Sign In' }],
    signup: [{ label: 'CareerOS', routeId: 'home' }, { label: 'Sign Up' }],
    onboarding: [{ label: 'CareerOS', routeId: 'home' }, { label: 'Onboarding Flow' }],
  };

  const handleNavigate = (route: RouteId, targetTaskId?: string) => {
    if (route.startsWith('tasks/') || route.startsWith('/tasks/')) {
      const id = route.replace(/^\/?tasks\//, '');
      if (id) setActiveTaskId(id);
      setCurrentRoute('task-workspace');
      window.location.hash = `tasks/${id}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (route === 'task-workspace') {
      if (targetTaskId) setActiveTaskId(targetTaskId);
      setCurrentRoute('task-workspace');
      window.location.hash = `tasks/${targetTaskId || activeTaskId}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentRoute(route);
    window.location.hash = route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenericActionClick = (featureName: string) => {
    toast.info(
      `${featureName} is queued for the next phase`,
      'Foundational architecture is primed. Building incrementally.'
    );
  };

  const handleSaveQuickAction = () => {
    setIsQuickActionOpen(false);
    toast.success(
      'Task Logged!',
      `"${quickTaskTitle}" added to today's progress.`
    );
  };

  const handleOnboardingComplete = (updatedProfile: UserProfile) => {
    updateUserProfile(updatedProfile);
    toast.success(
      'Starting Point Configured',
      `Welcome to your personalized workspace, ${updatedProfile.name}!`
    );
    handleNavigate('home');
  };

  const handleUpdateProfile = (updatedProfile: UserProfile) => {
    updateUserProfile(updatedProfile);
  };

  const handleSignupSuccess = (name: string, email: string) => {
    const updated = {
      ...userProfile,
      name: name || userProfile.name,
      email: email || userProfile.email,
    };
    updateUserProfile(updated);
    handleNavigate('onboarding');
  };

  const handleLoginSuccess = (email: string) => {
    const updated = {
      ...userProfile,
      email: email || userProfile.email,
    };
    updateUserProfile(updated);
    handleNavigate('home');
  };

  // Fullscreen standalone views for dedicated auth & onboarding
  if (currentRoute === 'login') {
    return <LoginView onNavigate={handleNavigate} onLoginSuccess={handleLoginSuccess} />;
  }

  if (currentRoute === 'signup') {
    return <SignupView onNavigate={handleNavigate} onSignupSuccess={handleSignupSuccess} />;
  }

  if (currentRoute === 'onboarding') {
    return (
      <OnboardingView
        initialProfile={userProfile}
        onComplete={handleOnboardingComplete}
        onNavigate={handleNavigate}
      />
    );
  }

  return (
    <>
      <AppShell
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        breadcrumbs={routeBreadcrumbsMap[currentRoute] || [{ label: 'CareerOS' }, { label: 'Home' }]}
        onQuickAction={() => setIsQuickActionOpen(true)}
        quickActionLabel="Next Useful Action"
        userName={userProfile.name}
        onOpenAICompanion={() => setIsAICompanionOpen(true)}
      >
        <LazyLoadBoundary onNavigateHome={() => handleNavigate('home')}>
          {(currentRoute === 'home' || currentRoute === 'overview') && (
            <HomeView
              onNavigate={handleNavigate}
              userProfile={userProfile}
              onOpenAICompanion={() => setIsAICompanionOpen(true)}
            />
          )}
          {(currentRoute === 'my-plan' || currentRoute === 'plans') && (
            <PlansView
              onNavigate={handleNavigate}
              onActionClick={() => handleGenericActionClick('Plan Generator')}
              onOpenAICompanion={() => setIsAICompanionOpen(true)}
            />
          )}
          {(currentRoute === 'explore' || currentRoute === 'careers' || currentRoute === 'discovery') && (
            <ExploreView
              onNavigate={handleNavigate}
              onOpenAICompanion={() => setIsAICompanionOpen(true)}
            />
          )}
          {(currentRoute === 'learn' || currentRoute === 'tasks') && (
            <TasksView
              onNavigate={handleNavigate}
              onOpenAICompanion={() => setIsAICompanionOpen(true)}
              onOpenTaskWorkspace={(tId) => handleNavigate('task-workspace', tId)}
            />
          )}
          {currentRoute === 'task-workspace' && (
            <TaskWorkspaceView
              taskId={activeTaskId}
              onNavigate={handleNavigate}
              userProfile={userProfile}
              onOpenAICompanion={() => setIsAICompanionOpen(true)}
            />
          )}
          {(currentRoute === 'learn-and-do' || currentRoute === 'skills') && (
            <SkillToActionView
              onNavigate={handleNavigate}
              userProfile={userProfile}
              onOpenAICompanion={() => setIsAICompanionOpen(true)}
            />
          )}
          {currentRoute === 'communication' && (
            <CommunicationView
              onNavigate={handleNavigate}
              onOpenAICompanion={() => setIsAICompanionOpen(true)}
            />
          )}
          {(currentRoute === 'work-ready' || currentRoute === '/work-ready') && (
            <WorkReadyView
              onNavigate={handleNavigate}
              onOpenAICompanion={() => setIsAICompanionOpen(true)}
            />
          )}
          {currentRoute === 'projects' && (
            <ProjectsView
              onNavigate={handleNavigate}
              onActionClick={() => handleGenericActionClick('Project Challenges')}
            />
          )}
          {(currentRoute === 'evidence' ||
            currentRoute === 'career/evidence' ||
            currentRoute === '/career/evidence') && (
            <EvidenceView
              onNavigate={handleNavigate}
              onOpenAICompanion={() => setIsAICompanionOpen(true)}
            />
          )}
          {(currentRoute === 'my-career' || currentRoute === 'portfolio') && (
            <PortfolioView
              onNavigate={handleNavigate}
              onActionClick={() => handleGenericActionClick('Portfolio Publisher')}
            />
          )}
          {currentRoute === 'resume' && (
            <ResumeView
              onNavigate={handleNavigate}
              onOpenAICompanion={() => setIsAICompanionOpen(true)}
            />
          )}
          {currentRoute === 'opportunities' && (
            <OpportunitiesView
              onNavigate={handleNavigate}
              onActionClick={() => handleNavigate('applications')}
            />
          )}
          {(currentRoute === 'applications' || currentRoute === '/applications') && (
            <ApplicationsView
              onNavigate={handleNavigate}
              onOpenAICompanion={() => setIsAICompanionOpen(true)}
              onStartInterviewForRole={(company, role) => {
                setInterviewTargetCompany(company);
                setInterviewTargetRole(role);
                handleNavigate('interview');
              }}
            />
          )}
          {(currentRoute === 'interview' || currentRoute === '/interview') && (
            <InterviewView
              onNavigate={handleNavigate}
              targetCompany={interviewTargetCompany}
              targetRole={interviewTargetRole}
            />
          )}
          {(currentRoute === 'mentors' ||
            currentRoute === '/mentors' ||
            currentRoute === 'network') && (
            <MentorsView
              onNavigate={handleNavigate}
              onOpenAICompanion={() => setIsAICompanionOpen(true)}
            />
          )}
          {currentRoute === 'profile' && (
            <ProfileView
              userProfile={userProfile}
              onUpdateProfile={handleUpdateProfile}
            />
          )}
          {currentRoute === 'settings' && <SettingsView />}
          {currentRoute === 'help' && (
            <HelpView onOpenAICompanion={() => setIsAICompanionOpen(true)} />
          )}
          {currentRoute === 'notifications' && <NotificationsView />}
          {currentRoute === 'design-system' && <DesignSystemShowcase />}
        </LazyLoadBoundary>
      </AppShell>

      {/* Persistent CareerOS AI Assistant Modal/Drawer - Loaded only when requested */}
      {isAICompanionOpen && (
        <LazyLoadBoundary fallbackMessage="Loading CareerOS AI...">
          <CareerOSAIModal
            isOpen={isAICompanionOpen}
            onClose={() => setIsAICompanionOpen(false)}
            userProfile={userProfile}
            onStartSuggestedTask={(taskTitle) => {
              setQuickTaskTitle(taskTitle);
              setIsQuickActionOpen(true);
            }}
          />
        </LazyLoadBoundary>
      )}

      {/* Global Quick Action Modal */}
      <Dialog
        isOpen={isQuickActionOpen}
        onClose={() => setIsQuickActionOpen(false)}
        title="Today's Next Useful Action"
        description="“Start wherever you are. Do something useful. Learn from it. Build proof. Become ready.”"
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsQuickActionOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSaveQuickAction}
            >
              Log Action
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-left">
          <Input
            label="Action or Practical Task"
            value={quickTaskTitle}
            onChange={(e) => setQuickTaskTitle(e.target.value)}
            hint="Keep it small enough to finish today."
          />
          <Textarea
            label="What did you learn or produce?"
            placeholder="e.g. Identified 3 core skills needed for junior backend engineers and saved links."
            value={quickTaskNotes}
            onChange={(e) => setQuickTaskNotes(e.target.value)}
            hint="This reflection forms the seed of your career proof."
          />
        </div>
      </Dialog>
    </>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <I18nProvider>
          <CareerOSApp />
        </I18nProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
