import React, { useState } from 'react';
import {
  Palette,
  Check,
  Sparkles,
  ArrowRight,
  Send,
  Plus,
  Trash2,
  AlertCircle,
  HelpCircle,
  Search,
  Layers,
  Sliders,
  Bell,
  Compass,
} from 'lucide-react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  SearchInput,
  Textarea,
  Select,
  Checkbox,
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
  Badge,
  ProgressBar,
  ProgressCircle,
  ProgressSteps,
  Dialog,
  ConfirmationDialog,
  Drawer,
  EmptyState,
  Skeleton,
  Spinner,
  PageLoadingState,
  ErrorState,
  Alert,
  useToast,
} from '../components/ui';

export const DesignSystemShowcase: React.FC = () => {
  const { toast } = useToast();

  // Dialog & Drawer state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  // Form input demos
  const [searchVal, setSearchVal] = useState('');
  const [inputVal, setInputVal] = useState('Career Explorer');
  const [inputErr, setInputErr] = useState('');
  const [textareaVal, setTextareaVal] = useState(
    'I want to build a career in frontend architecture and full-stack systems.'
  );
  const [selectedRole, setSelectedRole] = useState('swe');
  const [agreed, setAgreed] = useState(true);

  // Progress interactive demo
  const [progressVal, setProgressVal] = useState(64);
  const [activeStep, setActiveStep] = useState(1);

  // Color Swatches info
  const colorTokens = [
    { name: 'Midnight Ink', hex: '#101828', role: 'Primary typography & dark canvas foundation', bg: 'bg-[#101828]', text: 'text-white' },
    { name: 'Career Indigo', hex: '#5B5BD6', role: 'Main brand color & focused CTAs', bg: 'bg-[#5B5BD6]', text: 'text-white' },
    { name: 'Lavender Mist', hex: '#F0EEFF', role: 'Soft brand surface & secondary states', bg: 'bg-[#F0EEFF]', text: 'text-[#5B5BD6]' },
    { name: 'Fresh Mint', hex: '#21B47A', role: 'Progress, success & verified badges', bg: 'bg-[#21B47A]', text: 'text-white' },
    { name: 'Soft Coral', hex: '#F26B5B', role: 'Human alerts, warnings & attention (used sparingly)', bg: 'bg-[#F26B5B]', text: 'text-white' },
    { name: 'Warm Cloud', hex: '#F8F8F5', role: 'Calm ambient background & structural tone', bg: 'bg-[#F8F8F5]', text: 'text-[#101828]', border: 'border border-[#E8E6DF]' },
    { name: 'White', hex: '#FFFFFF', role: 'Clean card surface & high-clarity elements', bg: 'bg-white', text: 'text-[#101828]', border: 'border border-[#E8E6DF]' },
  ];

  return (
    <div className="space-y-12 pb-16 animate-in fade-in duration-200">
      {/* Intro Header */}
      <div className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E6DF]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="indigo" size="sm">Design System v1.0</Badge>
              <span className="text-xs text-[#667085]">Zero-Pill Discipline · Calm · Human</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#101828]">
              CareerOS Component Architecture
            </h1>
            <p className="text-sm text-[#475467] mt-1 max-w-2xl leading-relaxed">
              Every reusable component, token, interactive state, and pattern built to scale CareerOS incrementally across desktop, tablet, and mobile.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => toast.info('Design system tokens synchronized')}
            >
              Check Tokens
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => toast.success('Interactive preview ready')}
            >
              Ready
            </Button>
          </div>
        </div>

        {/* 60-30-10 Color Strategy Overview */}
        <div className="pt-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#667085] mb-3">
            01. Curated Palette & Tokens
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {colorTokens.map((c) => (
              <div
                key={c.name}
                className="flex flex-col p-3 rounded-xl border border-[#E8E6DF] bg-white text-left transition-all hover:border-[#5B5BD6]/40"
              >
                <div
                  className={`w-full h-12 rounded-lg mb-2.5 flex items-end p-1.5 ${c.bg} ${c.text} ${c.border || ''}`}
                >
                  <span className="text-[10px] font-mono opacity-80">{c.hex}</span>
                </div>
                <h3 className="text-xs font-bold text-[#101828] truncate">{c.name}</h3>
                <p className="text-[11px] text-[#667085] mt-1 leading-tight line-clamp-2">
                  {c.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 02: Buttons */}
      <section className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#5B5BD6]">
            Interactive Controls
          </span>
          <h2 className="text-xl font-bold text-[#101828] mt-1">Buttons & States</h2>
          <p className="text-xs sm:text-sm text-[#667085] mt-0.5">
            Single-line controls with truncation resilience, active micro-interactions, and accessible states.
          </p>
        </div>

        {/* Variants */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-[#101828] uppercase tracking-wider">
            Variants
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" onClick={() => toast.info('Primary Indigo clicked')}>
              Primary Indigo
            </Button>
            <Button variant="secondary" onClick={() => toast.info('Secondary Mist clicked')}>
              Secondary Mist
            </Button>
            <Button variant="outline" onClick={() => toast.info('Outline clicked')}>
              Outline
            </Button>
            <Button variant="ghost" onClick={() => toast.info('Ghost clicked')}>
              Ghost
            </Button>
            <Button variant="mint" onClick={() => toast.success('Mint completed')}>
              Fresh Mint
            </Button>
            <Button variant="coral" onClick={() => toast.warning('Coral action clicked')}>
              Soft Coral
            </Button>
          </div>
        </div>

        {/* Sizes & Icons */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-[#101828] uppercase tracking-wider">
            Sizes & Icon Affordances
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm" leftIcon={<Sparkles className="w-3.5 h-3.5" />}>
              Small (32px)
            </Button>
            <Button size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Medium (40px)
            </Button>
            <Button size="lg" leftIcon={<Plus className="w-4 h-4" />}>
              Large (44px)
            </Button>
            <Button variant="outline" isLoading>
              Loading State
            </Button>
            <Button variant="outline" disabled>
              Disabled
            </Button>
          </div>
        </div>
      </section>

      {/* Section 03: Cards & Elevation */}
      <section className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#5B5BD6]">
            Spatial Presence
          </span>
          <h2 className="text-xl font-bold text-[#101828] mt-1">Cards & Dividers</h2>
          <p className="text-xs sm:text-sm text-[#667085] mt-0.5">
            Single-elevation depth with hairline 1px borders. Never nested inside inner cards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card variant="default">
            <CardHeader>
              <Badge variant="indigo" size="sm">Standard Card</Badge>
              <CardTitle className="mt-2">Default Card</CardTitle>
              <CardDescription>
                Clean white background with hairline border `#E8E6DF` for calm reading scannability.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-[#667085]">
                Content flows cleanly without nested sub-boxes.
              </p>
            </CardContent>
            <CardFooter>
              <span className="text-xs text-[#98A2B3]">Footer zone</span>
              <Button size="sm" variant="outline">Action</Button>
            </CardFooter>
          </Card>

          <Card variant="muted">
            <CardHeader>
              <Badge variant="neutral" size="sm">Muted Canvas</Badge>
              <CardTitle className="mt-2">Muted Card</CardTitle>
              <CardDescription>
                Subtle Warm Cloud background for reference panels, logs, or secondary modules.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-[#667085]">
                Pairs naturally alongside default cards.
              </p>
            </CardContent>
            <CardFooter>
              <span className="text-xs text-[#98A2B3]">Read-only status</span>
            </CardFooter>
          </Card>

          <Card
            variant="interactive"
            onClick={() => toast.info('Interactive Card clicked')}
          >
            <CardHeader>
              <Badge variant="mint" size="sm">Interactive</Badge>
              <CardTitle className="mt-2">Interactive Card</CardTitle>
              <CardDescription>
                Hover micro-interaction with subtle border highlight and smooth cursor feedback.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-[#667085]">
                Click this card to trigger an action.
              </p>
            </CardContent>
            <CardFooter>
              <span className="text-xs text-[#5B5BD6] font-medium flex items-center gap-1">
                Explore card <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Section 04: Form Controls & Inputs */}
      <section className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#5B5BD6]">
            Form Architecture
          </span>
          <h2 className="text-xl font-bold text-[#101828] mt-1">Inputs & Selections</h2>
          <p className="text-xs sm:text-sm text-[#667085] mt-0.5">
            Accessible labels, focus rings, clear buttons, hints, and error validation states.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <SearchInput
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              onClear={() => setSearchVal('')}
              placeholder="Search skills, projects, tasks..."
              label="Live Search Input"
              hint="Includes clear icon button when text is entered."
            />

            <Input
              label="Standard Text Input"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
                if (e.target.value.length < 3) {
                  setInputErr('Requires at least 3 characters');
                } else {
                  setInputErr('');
                }
              }}
              error={inputErr}
              hint="Try backspacing to 2 characters to test error state."
            />

            <Select
              label="Track / Discipline"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              options={[
                { value: 'swe', label: 'Software Engineering & Systems' },
                { value: 'product', label: 'Product Design & UX' },
                { value: 'data', label: 'Data Science & Machine Learning' },
                { value: 'growth', label: 'Product Growth & Technical Sales' },
              ]}
              hint="Native accessible select with customized hairline borders."
            />
          </div>

          <div className="space-y-4">
            <Textarea
              label="Reflective Journal / Notes"
              value={textareaVal}
              onChange={(e) => setTextareaVal(e.target.value)}
              hint="Supports multiline prompts and feedback."
            />

            <div className="pt-2">
              <Checkbox
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                label="Receive weekly early-career mentorship opportunities"
                description="No spam. Only high-signal guidance matching your evidence profile."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 05: Tabs & Badges */}
      <section className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#5B5BD6]">
            Content Segmentation
          </span>
          <h2 className="text-xl font-bold text-[#101828] mt-1">Tabs & Badges (Zero-Pill Discipline)</h2>
          <p className="text-xs sm:text-sm text-[#667085] mt-0.5">
            Categorical metadata uses clean, unboxed text or subtle chips. Interactive tabs provide keyboard-accessible switching.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-[#101828] uppercase tracking-wider">
            Segmented Tab Navigation
          </h3>
          <Tabs defaultValue="tab1" variant="segmented">
            <TabList>
              <TabTrigger value="tab1">Foundation</TabTrigger>
              <TabTrigger value="tab2" badge={<Badge variant="mint" size="sm">Active</Badge>}>
                Practical Tasks
              </TabTrigger>
              <TabTrigger value="tab3">Career Evidence</TabTrigger>
            </TabList>
            <TabContent value="tab1">
              <div className="p-4 rounded-xl bg-[#F8F8F5] border border-[#E8E6DF] text-xs text-[#475467]">
                Foundation tab panel: focuses on initial self-knowledge, curiosity audit, and setting initial trajectories.
              </div>
            </TabContent>
            <TabContent value="tab2">
              <div className="p-4 rounded-xl bg-[#F8F8F5] border border-[#E8E6DF] text-xs text-[#475467]">
                Practical Tasks panel: actionable micro-challenges with tangible outputs.
              </div>
            </TabContent>
            <TabContent value="tab3">
              <div className="p-4 rounded-xl bg-[#F8F8F5] border border-[#E8E6DF] text-xs text-[#475467]">
                Career Evidence panel: verified contributions, pull requests, and live artifacts.
              </div>
            </TabContent>
          </Tabs>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#E8E6DF]">
          <h3 className="text-xs font-semibold text-[#101828] uppercase tracking-wider">
            Badge Palette & Metadata
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="neutral">Neutral Tag</Badge>
            <Badge variant="indigo">Career Indigo</Badge>
            <Badge variant="mint" dot>Fresh Mint Progress</Badge>
            <Badge variant="coral" dot>Attention Point</Badge>
            <Badge variant="textOnly" dot>Unboxed Text Metadata</Badge>
          </div>
        </div>
      </section>

      {/* Section 06: Progress & Roadmaps */}
      <section className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#5B5BD6]">
            Measurement
          </span>
          <h2 className="text-xl font-bold text-[#101828] mt-1">Progress Indicators</h2>
          <p className="text-xs sm:text-sm text-[#667085] mt-0.5">
            Tabular numbers, clean bars, circular completion, and multi-step milestone progress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="space-y-4">
            <ProgressBar
              value={progressVal}
              label="Sprint Progress (Mint)"
              color="mint"
              showValue
            />
            <ProgressBar
              value={42}
              label="Overall Readiness (Indigo)"
              color="indigo"
              showValue
            />
            <ProgressBar
              value={18}
              label="Weekly Attention Buffer (Coral)"
              color="coral"
              showValue
            />
          </div>

          <div className="flex items-center justify-around p-4 rounded-xl bg-[#F8F8F5] border border-[#E8E6DF]">
            <div className="flex flex-col items-center gap-2">
              <ProgressCircle value={progressVal} color="mint" size={54} />
              <span className="text-xs text-[#667085]">Sprint Goal</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ProgressCircle value={85} color="indigo" size={54} />
              <span className="text-xs text-[#667085]">Verified Proof</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#F8F8F5] border border-[#E8E6DF] space-y-2">
            <p className="text-xs font-semibold text-[#101828]">Interactive Bar Slider</p>
            <input
              type="range"
              min="0"
              max="100"
              value={progressVal}
              onChange={(e) => setProgressVal(Number(e.target.value))}
              className="w-full accent-[#5B5BD6] cursor-pointer"
            />
            <p className="text-[11px] text-[#667085] font-mono tabular-nums">
              Current value: {progressVal}%
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-[#E8E6DF]">
          <h3 className="text-xs font-semibold text-[#101828] uppercase tracking-wider mb-4">
            Milestone Steps Indicator
          </h3>
          <ProgressSteps
            steps={[
              { id: '1', title: 'Start', description: 'Beginner baseline' },
              { id: '2', title: 'Do Useful Work', description: 'Practical task' },
              { id: '3', title: 'Learn from it', description: 'Reflect & iterate' },
              { id: '4', title: 'Build proof', description: 'Public evidence' },
              { id: '5', title: 'Become ready', description: 'Career opportunity' },
            ]}
            currentStepIndex={activeStep}
            onStepClick={(idx) => setActiveStep(idx)}
          />
        </div>
      </section>

      {/* Section 07: Dialogs & Overlays */}
      <section className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#5B5BD6]">
            Overlays & Dialogs
          </span>
          <h2 className="text-xl font-bold text-[#101828] mt-1">Modals & Drawers</h2>
          <p className="text-xs sm:text-sm text-[#667085] mt-0.5">
            Calm backdrops, keyboard escape handling, and responsive slide-overs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" onClick={() => setIsModalOpen(true)}>
            Open Standard Modal
          </Button>
          <Button variant="coral" onClick={() => setIsConfirmOpen(true)}>
            Open Confirmation Dialog
          </Button>
          <Button variant="secondary" onClick={() => setIsDrawerOpen(true)}>
            Open Side Drawer
          </Button>
        </div>

        {/* Modal Dialog Instance */}
        <Dialog
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Career Action Commitment"
          description="Commit to a concrete 20-minute daily task to maintain learning momentum."
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setIsModalOpen(false);
                  toast.success('Task committed to your roadmap');
                }}
              >
                Save Commitment
              </Button>
            </>
          }
        >
          <div className="space-y-3">
            <Input
              label="Task Title"
              defaultValue="Analyze 1 open source GitHub issue"
              hint="Keep it specific and scoped."
            />
            <Textarea
              label="Success Evidence"
              defaultValue="Write a 1-paragraph summary of how the bug was solved."
            />
          </div>
        </Dialog>

        {/* Confirmation Dialog Instance */}
        <ConfirmationDialog
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={() => {
            setIsConfirming(true);
            setTimeout(() => {
              setIsConfirming(false);
              setIsConfirmOpen(false);
              toast.warning('Draft task removed');
            }, 600);
          }}
          isConfirming={isConfirming}
          variant="danger"
          title="Remove Draft Evidence"
          message="Are you sure you want to remove this unverified evidence draft? This cannot be undone."
          confirmLabel="Remove Draft"
        />

        {/* Drawer Instance */}
        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          title="CareerOS Companion Drawer"
        >
          <div className="space-y-4 text-xs text-[#475467]">
            <p className="leading-relaxed">
              This slide-over drawer is ideal for secondary inspection, task guidelines, rubric details, and side-by-side reading without losing page context.
            </p>
            <div className="p-3 rounded-lg bg-[#F0EEFF] text-[#5B5BD6] border border-[#E4E0FD]">
              <strong>Tip: </strong>
              Press Escape or tap outside on mobile to dismiss gracefully.
            </div>
            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => setIsDrawerOpen(false)}
            >
              Close Drawer
            </Button>
          </div>
        </Drawer>
      </section>

      {/* Section 08: Toast Notifications */}
      <section className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#5B5BD6]">
            Notifications
          </span>
          <h2 className="text-xl font-bold text-[#101828] mt-1">Toast Notifications</h2>
          <p className="text-xs sm:text-sm text-[#667085] mt-0.5">
            Auto-dismissing, non-intrusive feedback stacked in the viewport with high color contrast.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            onClick={() => toast.info('New Task Discovered', 'A practical task matching your track was added.')}
          >
            Trigger Info Toast
          </Button>
          <Button
            variant="mint"
            onClick={() => toast.success('Task Verified!', 'Proof artifact recorded to your evidence vault.')}
          >
            Trigger Success Toast
          </Button>
          <Button
            variant="coral"
            onClick={() => toast.warning('Missing Submission', 'Please attach your reflection before submitting.')}
          >
            Trigger Warning Toast
          </Button>
          <Button
            variant="outline"
            className="border-[#F26B5B] text-[#F26B5B]"
            onClick={() => toast.error('Connection Interrupted', 'Could not sync proof artifact. Retrying automatically.')}
          >
            Trigger Error Toast
          </Button>
        </div>
      </section>

      {/* Section 09: Empty, Loading & Error States */}
      <section className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#5B5BD6]">
            Edge & Fallback States
          </span>
          <h2 className="text-xl font-bold text-[#101828] mt-1">Empty, Loading & Error States</h2>
          <p className="text-xs sm:text-sm text-[#667085] mt-0.5">
            Clear, honest states that guide the user on what to do next instead of presenting dead ends.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-[#101828] uppercase tracking-wider">
            Inline Banners (Alerts)
          </h3>
          <div className="space-y-2.5">
            <Alert variant="info" title="Guidance Note">
              Start with small 15-minute tasks to build confidence before jumping into full capstone projects.
            </Alert>
            <Alert variant="success" title="Milestone Met">
              You have completed 3 practical exercises this week. Your proof score has increased.
            </Alert>
            <Alert
              variant="warning"
              title="Attention Needed"
              action={{ label: 'Review link', onClick: () => toast.info('Checking link') }}
            >
              Your GitHub repo link is currently private. Make it public for peer verification.
            </Alert>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#E8E6DF]">
          {/* Skeleton Loaders */}
          <div className="p-5 rounded-xl border border-[#E8E6DF] bg-[#F8F8F5]/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#101828]">Skeleton Loaders</span>
              <Spinner size="sm" color="indigo" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton variant="circular" width={40} height={40} />
              <div className="space-y-1.5 flex-1">
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="40%" />
              </div>
            </div>
            <Skeleton variant="rectangular" height={54} />
          </div>

          {/* Inline Error State */}
          <ErrorState
            title="Failed to Load Task Stream"
            message="We were unable to load recent tasks. You can refresh or try again in a few moments."
            onRetry={() => toast.info('Retrying task fetch...')}
          />
        </div>
      </section>
    </div>
  );
};

export default DesignSystemShowcase;
