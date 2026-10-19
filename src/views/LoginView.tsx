import React, { useState } from 'react';
import { ArrowRight, Sparkles, KeyRound, Check } from 'lucide-react';
import { RouteId } from '../types/navigation';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { useToast } from '../components/ui/Toast';
import { useAuth } from '../context/AuthContext';

export interface LoginViewProps {
  onNavigate: (route: RouteId) => void;
  onLoginSuccess: (email: string) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onNavigate,
  onLoginSuccess,
}) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { signInWithGoogle } = useAuth();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      toast.success('Signed in with Google', 'Cloud Firestore synchronized.');
      onLoginSuccess('google-authenticated-user');
    } catch (err: any) {
      setError(err?.message || 'Google sign-in could not be completed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please provide your email and password');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Welcome back!', 'Your workspace is ready.');
      onLoginSuccess(email);
    }, 400);
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Logged in as Jordan (Early Career)', 'Resuming saved career path.');
      onLoginSuccess('jordan@example.com');
    }, 300);
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
          New to CareerOS?{' '}
          <button
            onClick={() => onNavigate('signup')}
            className="font-semibold text-[#5B5BD6] hover:underline transition-all"
          >
            Create an account
          </button>
        </div>
      </div>

      {/* Main Center Card */}
      <div className="w-full max-w-md mx-auto my-8">
        <Card variant="default" padding="lg" className="bg-white border-[#E8E6DF] shadow-xs text-left">
          <div className="mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5B5BD6]">
              Sign In
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-[#101828] mt-1">
              Welcome back
            </h1>
            <p className="text-sm text-[#667085] mt-1 leading-relaxed">
              Pick up right where you left off. Every small step counts toward your career proof.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              autoFocus
            />

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-[#101828] uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => toast.info('Password Reset', 'In development mode, you can sign in directly.')}
                  className="text-xs text-[#5B5BD6] hover:underline"
                >
                  Forgot?
                </button>
              </div>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                error={error}
              />
            </div>

            <div className="pt-2 space-y-3">
              <Button
                type="submit"
                variant="primary"
                size="md"
                fullWidth
                isLoading={isLoading}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Sign In to Workspace
              </Button>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-2.5 px-4 rounded-xl border border-[#E8E6DF] bg-white hover:bg-[#F8F8F5] text-xs font-semibold text-[#101828] transition-colors flex items-center justify-center gap-2.5 shadow-xs"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="relative flex items-center justify-center my-3">
                <div className="border-t border-[#E8E6DF] w-full" />
                <span className="bg-white px-3 text-[11px] text-[#98A2B3] uppercase tracking-wider relative shrink-0">
                  quick access
                </span>
              </div>

              <Button
                type="button"
                variant="secondary"
                size="md"
                fullWidth
                onClick={handleDemoLogin}
                leftIcon={<Sparkles className="w-4 h-4 text-[#5B5BD6]" />}
              >
                Quick Sign In as Demo Builder
              </Button>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-[#E8E6DF] text-center">
            <p className="text-xs text-[#667085]">
              Don&apos;t have an account yet?{' '}
              <button
                onClick={() => onNavigate('signup')}
                className="font-semibold text-[#5B5BD6] hover:underline"
              >
                Let&apos;s start with where you are
              </button>
            </p>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <div className="w-full max-w-5xl mx-auto py-4 text-center text-xs text-[#98A2B3]">
        CareerOS · Global Career Development Platform
      </div>
    </div>
  );
};
