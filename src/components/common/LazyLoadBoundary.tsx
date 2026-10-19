import React, { Component, ReactNode, Suspense } from 'react';
import { Loader2, WifiOff, RotateCcw, Home } from 'lucide-react';
import { Button } from '../ui/Button';

interface Props {
  children: ReactNode;
  fallbackMessage?: string;
  onNavigateHome?: () => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class LazyLoadBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn('Chunk load error intercepted by LazyLoadBoundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 sm:p-10 my-6 bg-white border border-[#E8E6DF] rounded-2xl text-center max-w-md mx-auto space-y-4 shadow-sm animate-in fade-in">
          <div className="w-12 h-12 rounded-full bg-[#FFF4ED] text-[#F79009] flex items-center justify-center mx-auto">
            <WifiOff className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#101828]">
              Connection Interrupted
            </h3>
            <p className="text-xs text-[#475467] leading-relaxed">
              We couldn&apos;t load this section due to a weak or spotty network connection. Your local drafts and profile are completely safe.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
            <Button
              variant="primary"
              size="sm"
              onClick={this.handleRetry}
              leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
              className="w-full sm:w-auto"
            >
              Retry Loading
            </Button>
            {this.props.onNavigateHome && (
              <Button
                variant="outline"
                size="sm"
                onClick={this.props.onNavigateHome}
                leftIcon={<Home className="w-3.5 h-3.5" />}
                className="w-full sm:w-auto"
              >
                Go to Home
              </Button>
            )}
          </div>
        </div>
      );
    }

    return (
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center min-h-[300px] p-6 text-xs text-[#667085] space-y-2 animate-in fade-in duration-150">
            <Loader2 className="w-6 h-6 animate-spin text-[#5B5BD6]" />
            <span className="font-medium text-[#475467]">
              {this.props.fallbackMessage || 'Loading lightweight view...'}
            </span>
          </div>
        }
      >
        {this.props.children}
      </Suspense>
    );
  }
}
