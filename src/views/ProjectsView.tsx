import React from 'react';
import { Rocket, Trophy, Sparkles, ArrowRight } from 'lucide-react';
import { RouteId } from '../types/navigation';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';

export interface ProjectsViewProps {
  onNavigate: (route: RouteId) => void;
  onActionClick: () => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  onNavigate,
  onActionClick,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Badge variant="indigo" size="sm">Deep Work</Badge>
              <span className="text-xs text-[#667085]">Projects & Challenges</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#101828]">
              Real-World Projects & Challenges
            </h1>
            <p className="text-sm text-[#475467] mt-1 max-w-xl leading-relaxed">
              Synthesize your skills through realistic scenario briefs, peer challenges, and structured AI guidance.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={() => onNavigate('tasks')}
            leftIcon={<Rocket className="w-4 h-4" />}
          >
            Browse Challenges
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="default">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="mint" size="sm">Guided Build</Badge>
              <span className="text-xs text-[#667085]">Level 1</span>
            </div>
            <CardTitle className="text-base mt-2">API Integration & Error Handling</CardTitle>
            <CardDescription>
              Build a resilient service with schema validation, network retries, and comprehensive error boundaries.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card variant="default">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="indigo" size="sm">Product Challenge</Badge>
              <span className="text-xs text-[#667085]">Level 2</span>
            </div>
            <CardTitle className="text-base mt-2">User Feedback Aggregator</CardTitle>
            <CardDescription>
              Design and code a data pipeline that categorizes user bugs and feature requests into actionable themes.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card variant="default">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="coral" size="sm">Systems</Badge>
              <span className="text-xs text-[#667085]">Level 3</span>
            </div>
            <CardTitle className="text-base mt-2">Production Deployment & CI/CD</CardTitle>
            <CardDescription>
              Containerize an application and configure an automated build verification workflow.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <EmptyState
        icon={<Rocket className="w-6 h-6 stroke-[1.75]" />}
        title="Project Workspace Ready"
        description="Select a project challenge to access guided specs, reference examples, checkpoint tests, and peer code review."
        primaryAction={{
          label: 'View First Challenge',
          onClick: onActionClick,
          icon: <ArrowRight className="w-4 h-4" />,
        }}
        secondaryAction={{
          label: 'Check Skills First',
          onClick: () => onNavigate('skills'),
        }}
      />
    </div>
  );
};
