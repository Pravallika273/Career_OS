import React from 'react';
import { Target, Search, ArrowRight, Sparkles } from 'lucide-react';
import { RouteId } from '../types/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';

export interface DiscoveryViewProps {
  onNavigate: (route: RouteId) => void;
  onActionClick: () => void;
}

export const DiscoveryView: React.FC<DiscoveryViewProps> = ({
  onNavigate,
  onActionClick,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* View Header */}
      <div className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Badge variant="indigo" size="sm">Phase 1</Badge>
              <span className="text-xs text-[#667085]">Career Discovery</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#101828]">
              Career Discovery & Pathfinder
            </h1>
            <p className="text-sm text-[#475467] mt-1 max-w-xl leading-relaxed">
              Find where your curiosities, strengths, and market realities intersect. Designed for students and beginners exploring without pressure.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={onActionClick}
            leftIcon={<Sparkles className="w-4 h-4" />}
          >
            Start Discovery Survey
          </Button>
        </div>
      </div>

      {/* Planned Discovery Streams */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="default">
          <CardHeader>
            <span className="text-xs font-semibold text-[#5B5BD6] uppercase tracking-wider">Stream 01</span>
            <CardTitle className="text-base mt-1">Aptitude & Curiosity Audit</CardTitle>
            <CardDescription>
              Uncover the work patterns you naturally gravitate toward before deciding on job titles.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card variant="default">
          <CardHeader>
            <span className="text-xs font-semibold text-[#21B47A] uppercase tracking-wider">Stream 02</span>
            <CardTitle className="text-base mt-1">Industry Landscape Explorer</CardTitle>
            <CardDescription>
              Interactive breakdowns of modern tech, design, engineering, product, and business roles.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card variant="default">
          <CardHeader>
            <span className="text-xs font-semibold text-[#F26B5B] uppercase tracking-wider">Stream 03</span>
            <CardTitle className="text-base mt-1">Path Clarifier & Fit Index</CardTitle>
            <CardDescription>
              Compare role requirements against where you are today to choose your starting path.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Scalable Placeholder Canvas */}
      <EmptyState
        icon={<Target className="w-6 h-6 stroke-[1.75]" />}
        title="Discovery Foundation Ready"
        description="In the next incremental build, this view will feature the interactive role explorer, curiosity mapping questions, and AI-assisted path clarification."
        primaryAction={{
          label: 'Take First Discovery Step',
          onClick: onActionClick,
          icon: <ArrowRight className="w-4 h-4" />,
        }}
        secondaryAction={{
          label: 'Return to Daily Compass',
          onClick: () => onNavigate('overview'),
        }}
      />
    </div>
  );
};
