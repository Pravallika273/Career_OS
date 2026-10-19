import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Shield, Heart, Sparkles } from 'lucide-react';
import { RouteId } from '../types/navigation';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { useToast } from '../components/ui/Toast';

export interface SignupViewProps {
  onNavigate: (route: RouteId) => void;
  onSignupSuccess: (name: string, email: string) => void;
}

export const SignupView: React.FC<SignupViewProps> = ({
  onNavigate,
  onSignupSuccess,
}) => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  const validate = () => {
    const errs: { name?: string; email?: string; password?: string } = {};
    if (!name.trim()) errs.name = 'Please tell us your name';
    if (!email.trim() || !email.includes('@')) errs.email = 'Please provide a valid email';
    if (password.length < 6) errs.password = 'Password must be at least 6 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Welcome to CareerOS!', "Let's personalize your starting point.");
      onSignupSuccess(name, email);
    }, 400);
  };

  const handleGuestStart = () => {
    toast.info('Starting as explorer', "We'll set up your personalized journey.");
    onSignupSuccess('Explorer', 'explorer@careeros.local');
  };

  return (
    <div className="min-h-screen bg-[#F8F8F5] flex flex-col justify-between p-4 sm:p-6 md:p-8 animate-in fade-in duration-200">
      {/* Top Brand Bar */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between py-2">
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

        <div className="text-xs text-[#667085]">
          Already have an account?{' '}
          <button
            onClick={() => onNavigate('login')}
            className="font-semibold text-[#5B5BD6] hover:underline transition-all"
          >
            Sign in
          </button>
        </div>
      </div>

      {/* Center Content */}
      <div className="w-full max-w-4xl mx-auto my-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Reassuring Narrative */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F0EEFF] text-[#5B5BD6] text-xs font-medium">
            <Heart className="w-3.5 h-3.5" />
            <span>A calm, supportive space</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#101828] leading-tight">
              Let&apos;s start with where you are.
            </h1>
            <p className="text-base text-[#475467] leading-relaxed">
              You don&apos;t need a perfect resume, years of experience, or a clear career plan to begin.
            </p>
          </div>

          <div className="space-y-3.5 pt-2">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#21B47A] shrink-0 mt-0.5" />
              <p className="text-sm text-[#475467]">
                <strong className="text-[#101828] font-semibold">Zero judgment: </strong>
                Whether you&apos;re a fresher, changing fields, or completely unsure, CareerOS meets you at step zero.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#21B47A] shrink-0 mt-0.5" />
              <p className="text-sm text-[#475467]">
                <strong className="text-[#101828] font-semibold">Proof over pedigree: </strong>
                Build real small artifacts and practical tasks that employers actually value.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#21B47A] shrink-0 mt-0.5" />
              <p className="text-sm text-[#475467]">
                <strong className="text-[#101828] font-semibold">Take small breaths: </strong>
                No rush, no high-pressure tests. Just one useful step at a time.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#E8E6DF] text-xs text-[#667085] leading-relaxed">
            &ldquo;Start wherever you are. Do something useful. Learn from it. Build proof. Become ready.&rdquo;
          </div>
        </div>

        {/* Right Column: Reassuring Signup Card */}
        <div className="lg:col-span-6">
          <Card variant="default" padding="lg" className="shadow-xs border-[#E8E6DF] bg-white">
            <div className="mb-5 text-left">
              <h2 className="text-xl font-bold tracking-tight text-[#101828]">
                Create your career space
              </h2>
              <p className="text-xs text-[#667085] mt-1">
                Takes 30 seconds. No credit card, no rigid expectations.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Your Name or Preferred Nickname"
                placeholder="e.g. Alex or Priya"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={errors.name}
                autoFocus
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
              />

              <Input
                label="Create a Password"
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                hint="Keep it safe and easy to remember."
              />

              <div className="pt-2 space-y-3">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  fullWidth
                  isLoading={isLoading}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Create Account & Start Onboarding
                </Button>

                <div className="relative flex items-center justify-center my-3">
                  <div className="border-t border-[#E8E6DF] w-full" />
                  <span className="bg-white px-3 text-[11px] text-[#98A2B3] uppercase tracking-wider relative shrink-0">
                    or jump straight in
                  </span>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  fullWidth
                  onClick={handleGuestStart}
                  leftIcon={<Sparkles className="w-4 h-4 text-[#5B5BD6]" />}
                >
                  Explore Directly without Signing Up
                </Button>
              </div>
            </form>

            <div className="mt-5 pt-4 border-t border-[#E8E6DF] text-center">
              <p className="text-[11px] text-[#98A2B3] leading-relaxed">
                By continuing, you agree to treat your learning journey with kindness.
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full max-w-5xl mx-auto py-4 text-center text-xs text-[#98A2B3]">
        CareerOS · Global Career Development for Students & Beginners
      </div>
    </div>
  );
};
