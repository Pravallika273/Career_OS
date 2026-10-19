import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Compass,
  Sparkles,
  HelpCircle,
  Heart,
  CheckCircle2,
  Clock,
  Target,
  ShieldCheck,
} from 'lucide-react';
import { RouteId } from '../types/navigation';
import { UserProfile, DEFAULT_USER_PROFILE } from '../types/user';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/Progress';
import { useToast } from '../components/ui/Toast';

export interface OnboardingViewProps {
  initialProfile?: Partial<UserProfile>;
  onComplete: (profile: UserProfile) => void;
  onNavigate: (route: RouteId) => void;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({
  initialProfile,
  onComplete,
  onNavigate,
}) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  // State encompassing all required onboarding dimensions
  const [profile, setProfile] = useState<UserProfile>({
    ...DEFAULT_USER_PROFILE,
    ...initialProfile,
  });

  const updateProfile = (field: keyof UserProfile, value: any) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Completed - go to final reflection summary
      setStep(6);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onNavigate('overview');
    }
  };

  const handleIDontKnow = (field: keyof UserProfile, fallbackValue: string = "I don't know yet.") => {
    updateProfile(field, fallbackValue);
    toast.info("That's completely okay", "We'll explore this together as you build proof.");
    handleNext();
  };

  const handleFinalSubmit = () => {
    const finalProfile: UserProfile = {
      ...profile,
      completedAt: new Date().toISOString(),
    };
    onComplete(finalProfile);
  };

  // Option lists with precise required text
  const needRightNowOptions = [
    'I need to get a job soon.',
    'I want to learn and gain experience first.',
    'I want to do both.',
    "I'm still figuring things out.",
  ];

  const worryOptions = [
    "I don't know where to start.",
    "I don't have experience.",
    "I don't know enough.",
    "I'm afraid of interviews.",
    "I'm afraid of failing.",
    "I don't know what companies expect.",
    "I don't know how to present myself.",
    "I'm not sure yet.",
  ];

  const graduationStageOptions = [
    'Currently studying (1st or 2nd year)',
    'Final year / graduating soon',
    'Recent graduate (within last 12 months)',
    'Self-taught / transitioning careers',
    "I don't know / It's complicated",
  ];

  const situationOptions = [
    'Student looking to prepare ahead of graduation',
    'Fresher / beginner seeking my first real opportunity',
    'Career changer starting fresh in a new field',
    'Self-learner wanting structured practice',
    "I'm still figuring out my situation",
  ];

  const clarityOptions = [
    'Clear goal (I know the exact role I want)',
    'Rough direction (e.g. software, design, data)',
    'Completely open (I want to discover what fits me)',
    "I don't know",
  ];

  const confidenceOptions = [
    'Overwhelmed or starting from zero',
    'A little unsure, but curious to try',
    'Growing steadily with practice',
    'Fairly confident and ready to build proof',
    "I don't know",
  ];

  const timeOptions = [
    '1-3 hours / week (small steady steps)',
    '4-7 hours / week (steady weekly habit)',
    '8-15 hours / week (dedicated focus)',
    '15+ hours / week (full-time immersion)',
    "I don't know yet",
  ];

  const learningStyleOptions = [
    'Practical tasks with concrete examples',
    'Step-by-step guided instructions',
    'Analyzing real projects & case studies',
    'Learning through human feedback & mentorship',
    "I don't know",
  ];

  const successDefinitions = [
    'Landing my first job or internship',
    'Building tangible proof that I can do the work',
    'Gaining self-confidence and clear direction',
    'Financial independence & stability',
    "I'm still figuring out what success means to me",
  ];

  return (
    <div className="min-h-screen bg-[#F8F8F5] flex flex-col justify-between p-4 sm:p-6 md:p-8 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="w-full max-w-3xl mx-auto flex items-center justify-between pb-4 border-b border-[#E8E6DF]">
        <button
          onClick={() => onNavigate('overview')}
          className="flex items-center gap-2.5 text-left focus-visible:outline-none group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#5B5BD6] flex items-center justify-center text-white font-bold text-base shadow-xs group-hover:bg-[#4B4BC2] transition-colors">
            C
          </div>
          <span className="text-base font-bold tracking-tight text-[#101828]">
            CareerOS
          </span>
        </button>

        {step <= totalSteps ? (
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono tabular-nums text-[#667085]">
              Step {step} of {totalSteps}
            </span>
            <div className="w-24 sm:w-32">
              <ProgressBar
                value={(step / totalSteps) * 100}
                color="indigo"
                size="sm"
              />
            </div>
          </div>
        ) : (
          <Badge variant="mint" size="sm" dot>
            Ready to Begin
          </Badge>
        )}
      </div>

      {/* Main Conversation Container */}
      <div className="w-full max-w-2xl mx-auto my-6 sm:my-10">
        {/* STEP 1: Name, Education & Background */}
        {step === 1 && (
          <div className="space-y-6 text-left animate-in fade-in duration-200">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5B5BD6]">
                <Heart className="w-3.5 h-3.5" />
                <span>The Foundation</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#101828]">
                First, let&apos;s get to know you.
              </h1>
              <p className="text-sm text-[#667085] leading-relaxed">
                No formal resume needed. We just want to tailor your recommendations to where you are right now.
              </p>
            </div>

            <Card variant="default" padding="lg" className="space-y-5 bg-white">
              <Input
                label="What should we call you?"
                placeholder="Your name or preferred nickname"
                value={profile.name}
                onChange={(e) => updateProfile('name', e.target.value)}
                autoFocus
                hint="We'll use this to personalize your daily compass."
              />

              <Input
                label="Where are you based? (Optional)"
                placeholder="City or Country (e.g. Bangalore, London, New York)"
                value={profile.location}
                onChange={(e) => updateProfile('location', e.target.value)}
                hint="Helps with remote/local opportunity matching."
              />

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#101828] uppercase tracking-wider">
                  Degree or Current Education Field
                </label>
                <Input
                  placeholder="e.g. Computer Science, Business, Design, or Self-taught"
                  value={profile.degree}
                  onChange={(e) => updateProfile('degree', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#101828] uppercase tracking-wider">
                  Where are you in your graduation timeline?
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {graduationStageOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => updateProfile('graduationStage', opt)}
                      className={`w-full text-left p-3 rounded-lg border text-sm transition-all duration-150 flex items-center justify-between ${
                        profile.graduationStage === opt
                          ? 'border-[#5B5BD6] bg-[#F0EEFF]/50 text-[#101828] font-medium'
                          : 'border-[#E8E6DF] bg-white text-[#475467] hover:border-[#D3D0C6]'
                      }`}
                    >
                      <span>{opt}</span>
                      {profile.graduationStage === opt && (
                        <Check className="w-4 h-4 text-[#5B5BD6] shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* STEP 2: Current Situation & "What do you need right now?" */}
        {step === 2 && (
          <div className="space-y-6 text-left animate-in fade-in duration-200">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5B5BD6]">
                <Compass className="w-3.5 h-3.5" />
                <span>Current Realities</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#101828]">
                Where are you standing right now?
              </h1>
              <p className="text-sm text-[#667085] leading-relaxed">
                Be completely honest. Whether you are actively hunting or just exploring, CareerOS adapts to your reality.
              </p>
            </div>

            <Card variant="default" padding="lg" className="space-y-6 bg-white">
              {/* Important Question 1: What do you need right now? */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-[#101828] uppercase tracking-wider">
                    What do you need right now? *
                  </label>
                  <span className="text-[11px] text-[#5B5BD6] font-medium">Core Question</span>
                </div>
                <div className="grid grid-cols-1 gap-2.5">
                  {needRightNowOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => updateProfile('needRightNow', option)}
                      className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all duration-150 flex items-center justify-between ${
                        profile.needRightNow === option
                          ? 'border-[#5B5BD6] bg-[#F0EEFF]/60 text-[#101828] font-semibold ring-1 ring-[#5B5BD6]'
                          : 'border-[#E8E6DF] bg-white text-[#475467] hover:border-[#D3D0C6] hover:bg-[#F8F8F5]'
                      }`}
                    >
                      <span className="leading-snug">{option}</span>
                      {profile.needRightNow === option && (
                        <Check className="w-4 h-4 text-[#5B5BD6] shrink-0 ml-2" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Career situation selector */}
              <div className="space-y-2.5 pt-4 border-t border-[#E8E6DF]">
                <label className="block text-xs font-semibold text-[#101828] uppercase tracking-wider">
                  How would you describe your overall situation?
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {situationOptions.map((sit) => (
                    <button
                      key={sit}
                      type="button"
                      onClick={() => updateProfile('careerSituation', sit)}
                      className={`w-full text-left p-3 rounded-lg border text-sm transition-all flex items-center justify-between ${
                        profile.careerSituation === sit
                          ? 'border-[#5B5BD6] bg-[#F0EEFF]/50 text-[#101828] font-medium'
                          : 'border-[#E8E6DF] bg-white text-[#475467] hover:border-[#D3D0C6]'
                      }`}
                    >
                      <span className="text-xs sm:text-sm">{sit}</span>
                      {profile.careerSituation === sit && (
                        <Check className="w-4 h-4 text-[#5B5BD6] shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* STEP 3: "What worries you most?" & Confidence */}
        {step === 3 && (
          <div className="space-y-6 text-left animate-in fade-in duration-200">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#F26B5B]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Honest Obstacles</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#101828]">
                What worries you most?
              </h1>
              <p className="text-sm text-[#667085] leading-relaxed">
                Almost everyone starting out feels this. Naming your worry lets us turn it into a concrete action plan.
              </p>
            </div>

            <Card variant="default" padding="lg" className="space-y-6 bg-white">
              {/* Important Question 2: What worries you most? */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-[#101828] uppercase tracking-wider">
                    Select the option that speaks closest to you *
                  </label>
                  <span className="text-[11px] text-[#667085]">Choose 1 or more</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {worryOptions.map((worry) => {
                    const isSelected = profile.primaryWorry === worry;
                    return (
                      <button
                        key={worry}
                        type="button"
                        onClick={() => updateProfile('primaryWorry', worry)}
                        className={`text-left p-3.5 rounded-xl border text-sm transition-all flex items-start justify-between ${
                          isSelected
                            ? 'border-[#5B5BD6] bg-[#F0EEFF]/60 text-[#101828] font-semibold ring-1 ring-[#5B5BD6]'
                            : 'border-[#E8E6DF] bg-white text-[#475467] hover:border-[#D3D0C6] hover:bg-[#F8F8F5]'
                        }`}
                      >
                        <span className="leading-snug">{worry}</span>
                        {isSelected && (
                          <Check className="w-4 h-4 text-[#5B5BD6] shrink-0 ml-2 mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Confidence measure */}
              <div className="space-y-2.5 pt-4 border-t border-[#E8E6DF]">
                <label className="block text-xs font-semibold text-[#101828] uppercase tracking-wider">
                  How confident do you feel about your career right now?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {confidenceOptions.map((conf) => (
                    <button
                      key={conf}
                      type="button"
                      onClick={() => updateProfile('confidence', conf)}
                      className={`text-left p-3 rounded-lg border text-xs sm:text-sm transition-all flex items-center justify-between ${
                        profile.confidence === conf
                          ? 'border-[#5B5BD6] bg-[#F0EEFF]/50 text-[#101828] font-medium'
                          : 'border-[#E8E6DF] bg-white text-[#475467] hover:border-[#D3D0C6]'
                      }`}
                    >
                      <span>{conf}</span>
                      {profile.confidence === conf && (
                        <Check className="w-4 h-4 text-[#5B5BD6] shrink-0 ml-1.5" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* STEP 4: Goals, Clarity, Skills & Interests */}
        {step === 4 && (
          <div className="space-y-6 text-left animate-in fade-in duration-200">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5B5BD6]">
                <Target className="w-3.5 h-3.5" />
                <span>Interests & Exploration</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#101828]">
                What directions spark your curiosity?
              </h1>
              <p className="text-sm text-[#667085] leading-relaxed">
                If you aren&apos;t sure, pick &ldquo;Rough direction&rdquo; or say &ldquo;I don&apos;t know&rdquo;. We will discover it together.
              </p>
            </div>

            <Card variant="default" padding="lg" className="space-y-5 bg-white">
              <Input
                label="Target Role or General Direction (Optional)"
                placeholder="e.g. Frontend developer, Product analyst, UX designer, or AI tools"
                value={profile.careerGoal}
                onChange={(e) => updateProfile('careerGoal', e.target.value)}
                hint="You can leave this rough or change it anytime."
              />

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#101828] uppercase tracking-wider">
                  How clear does your path feel right now?
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {clarityOptions.map((clarity) => (
                    <button
                      key={clarity}
                      type="button"
                      onClick={() => updateProfile('careerClarity', clarity)}
                      className={`text-left p-3 rounded-lg border text-sm transition-all flex items-center justify-between ${
                        profile.careerClarity === clarity
                          ? 'border-[#5B5BD6] bg-[#F0EEFF]/50 text-[#101828] font-medium'
                          : 'border-[#E8E6DF] bg-white text-[#475467] hover:border-[#D3D0C6]'
                      }`}
                    >
                      <span>{clarity}</span>
                      {profile.careerClarity === clarity && (
                        <Check className="w-4 h-4 text-[#5B5BD6] shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skills / Interests quick tags */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold text-[#101828] uppercase tracking-wider">
                  Select any skills or tools you have touched (even a little):
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'HTML & CSS',
                    'JavaScript / TypeScript',
                    'Python',
                    'React',
                    'UI / Figma',
                    'SQL / Databases',
                    'Problem Solving',
                    'Writing / Communication',
                    'Git / GitHub',
                  ].map((skill) => {
                    const isSelected = profile.skills.includes(skill);
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => {
                          const updated = isSelected
                            ? profile.skills.filter((s) => s !== skill)
                            : [...profile.skills, skill];
                          updateProfile('skills', updated);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          isSelected
                            ? 'bg-[#5B5BD6] text-white border-[#5B5BD6]'
                            : 'bg-[#F8F8F5] text-[#475467] border-[#E8E6DF] hover:border-[#D3D0C6]'
                        }`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() => updateProfile('skills', ["I don't know yet"])}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border border-dashed border-[#D3D0C6] text-[#667085] hover:border-[#5B5BD6]"
                  >
                    I don&apos;t know / None yet
                  </button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* STEP 5: Time, Learning Style & Definition of Success */}
        {step === 5 && (
          <div className="space-y-6 text-left animate-in fade-in duration-200">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#21B47A]">
                <Clock className="w-3.5 h-3.5" />
                <span>Your Rhythm & Definition of Success</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#101828]">
                How do you want to pace your journey?
              </h1>
              <p className="text-sm text-[#667085] leading-relaxed">
                Consistency beats intensity. Set a realistic rhythm that fits around exams, work, or family.
              </p>
            </div>

            <Card variant="default" padding="lg" className="space-y-6 bg-white">
              {/* Available Time */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#101828] uppercase tracking-wider">
                  How much time can you realistically invest each week?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {timeOptions.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => updateProfile('availableTime', time)}
                      className={`text-left p-3 rounded-lg border text-xs sm:text-sm transition-all flex items-center justify-between ${
                        profile.availableTime === time
                          ? 'border-[#5B5BD6] bg-[#F0EEFF]/50 text-[#101828] font-medium'
                          : 'border-[#E8E6DF] bg-white text-[#475467] hover:border-[#D3D0C6]'
                      }`}
                    >
                      <span>{time}</span>
                      {profile.availableTime === time && (
                        <Check className="w-4 h-4 text-[#5B5BD6] shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred Learning Style */}
              <div className="space-y-2 pt-3 border-t border-[#E8E6DF]">
                <label className="block text-xs font-semibold text-[#101828] uppercase tracking-wider">
                  What is your preferred learning style?
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {learningStyleOptions.map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => updateProfile('preferredLearningStyle', style)}
                      className={`text-left p-3 rounded-lg border text-xs sm:text-sm transition-all flex items-center justify-between ${
                        profile.preferredLearningStyle === style
                          ? 'border-[#5B5BD6] bg-[#F0EEFF]/50 text-[#101828] font-medium'
                          : 'border-[#E8E6DF] bg-white text-[#475467] hover:border-[#D3D0C6]'
                      }`}
                    >
                      <span>{style}</span>
                      {profile.preferredLearningStyle === style && (
                        <Check className="w-4 h-4 text-[#5B5BD6] shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Definition of Success */}
              <div className="space-y-2 pt-3 border-t border-[#E8E6DF]">
                <label className="block text-xs font-semibold text-[#101828] uppercase tracking-wider">
                  What is your primary definition of success right now?
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {successDefinitions.map((def) => (
                    <button
                      key={def}
                      type="button"
                      onClick={() => updateProfile('definitionOfSuccess', def)}
                      className={`text-left p-3 rounded-lg border text-xs sm:text-sm transition-all flex items-center justify-between ${
                        profile.definitionOfSuccess === def
                          ? 'border-[#5B5BD6] bg-[#F0EEFF]/50 text-[#101828] font-medium'
                          : 'border-[#E8E6DF] bg-white text-[#475467] hover:border-[#D3D0C6]'
                      }`}
                    >
                      <span>{def}</span>
                      {profile.definitionOfSuccess === def && (
                        <Check className="w-4 h-4 text-[#5B5BD6] shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* STEP 6: Completion Screen! */}
        {step === 6 && (
          <div className="space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#E8F8F1] text-[#21B47A] flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-8 h-8 stroke-[2]" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#101828]">
                &ldquo;You don&apos;t need everything figured out yet.&rdquo;
              </h1>
              <p className="text-base sm:text-lg text-[#5B5BD6] font-semibold">
                &ldquo;We have a starting point.&rdquo;
              </p>
              <p className="text-xs sm:text-sm text-[#667085] leading-relaxed pt-1">
                Thank you, {profile.name || 'friend'}. We have translated your answers into a calm, personalized daily compass.
              </p>
            </div>

            {/* Personalized Starting Point Anchor Summary */}
            <Card variant="default" padding="lg" className="text-left bg-white max-w-xl mx-auto space-y-4 border-[#E8E6DF]">
              <div className="flex items-center justify-between border-b border-[#E8E6DF] pb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#101828]">
                  Your Customized Starting Profile
                </span>
                <Badge variant="mint" size="sm">Tailored</Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-[#F8F8F5] border border-[#E8E6DF]">
                  <span className="text-[#98A2B3] block text-[11px] mb-0.5">What you need right now</span>
                  <strong className="text-[#101828] font-semibold">{profile.needRightNow}</strong>
                </div>

                <div className="p-2.5 rounded-lg bg-[#F8F8F5] border border-[#E8E6DF]">
                  <span className="text-[#98A2B3] block text-[11px] mb-0.5">Primary concern addressed</span>
                  <strong className="text-[#101828] font-semibold">{profile.primaryWorry}</strong>
                </div>

                <div className="p-2.5 rounded-lg bg-[#F8F8F5] border border-[#E8E6DF]">
                  <span className="text-[#98A2B3] block text-[11px] mb-0.5">Weekly rhythm</span>
                  <strong className="text-[#101828] font-semibold">{profile.availableTime}</strong>
                </div>

                <div className="p-2.5 rounded-lg bg-[#F8F8F5] border border-[#E8E6DF]">
                  <span className="text-[#98A2B3] block text-[11px] mb-0.5">Definition of success</span>
                  <strong className="text-[#101828] font-semibold">{profile.definitionOfSuccess}</strong>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#F0EEFF]/60 border border-[#E4E0FD] text-xs text-[#475467] leading-relaxed">
                <strong className="text-[#5B5BD6] font-semibold">How CareerOS responds: </strong>
                Because you shared &ldquo;{profile.primaryWorry}&rdquo;, our first recommended tasks will be bite-sized proof-builders designed to give you quick, verifiable confidence.
              </div>
            </Card>

            {/* Required CTA: "Show Me My Next Step" */}
            <div className="pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={handleFinalSubmit}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto px-8 py-3 text-base shadow-sm"
              >
                Show Me My Next Step
              </Button>
            </div>
          </div>
        )}

        {/* Bottom Navigation Buttons (for steps 1-5) */}
        {step <= totalSteps && (
          <div className="flex items-center justify-between pt-6 border-t border-[#E8E6DF] mt-6">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleBack}
              leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
            >
              {step === 1 ? 'Cancel' : 'Back'}
            </Button>

            <div className="flex items-center gap-2.5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  const fallbackField: keyof UserProfile =
                    step === 1
                      ? 'graduationStage'
                      : step === 2
                      ? 'needRightNow'
                      : step === 3
                      ? 'primaryWorry'
                      : step === 4
                      ? 'careerClarity'
                      : 'availableTime';
                  handleIDontKnow(fallbackField);
                }}
              >
                I don&apos;t know / Skip
              </Button>

              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={handleNext}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                {step === totalSteps ? 'Complete & Review' : 'Continue'}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Footer reassurance */}
      <div className="w-full max-w-3xl mx-auto py-3 text-center text-xs text-[#98A2B3]">
        CareerOS · &ldquo;Start wherever you are. Do something useful. Learn from it. Build proof. Become ready.&rdquo;
      </div>
    </div>
  );
};
