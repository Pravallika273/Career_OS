import React from 'react';
import { CheckSquare, BookOpen, MessageSquare, Brain, Compass, ArrowRight } from 'lucide-react';
import { RouteId } from '../types/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';

export interface SkillsViewProps {
  onNavigate: (route: RouteId) => void;
  onActionClick: () => void;
}

export const SkillsView: React.FC<SkillsViewProps> = ({
  onNavigate,
  onActionClick,
}) => {
  const humanSkills = [
    { title: 'Clear Communication', desc: 'Translating complex ideas into concise, human updates.' },
    { title: 'Critical Thinking', desc: 'Evaluating trade-offs, edge cases, and root causes.' },
    { title: 'Emotional Intelligence & Teamwork', desc: 'Navigating feedback, active listening, and collaboration.' },
    { title: 'Self-Management & Ownership', desc: 'Managing time, setting priorities, and following through.' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Badge variant="mint" size="sm">Action Oriented</Badge>
              <span className="text-xs text-[#667085]">Skills & Practical Tasks</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#101828]">
              Practical Tasks & Human Skills
            </h1>
            <p className="text-sm text-[#475467] mt-1 max-w-xl leading-relaxed">
              Theory is forgotten quickly; practical tasks build enduring instincts. Pair technical practice with foundational human communication.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={() => onNavigate('tasks')}
            leftIcon={<CheckSquare className="w-4 h-4" />}
          >
            Explore Task Library
          </Button>
        </div>
      </div>

      {/* Human Skills Pillars */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#667085] mb-3">
          Essential Human Capabilities
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {humanSkills.map((skill, idx) => (
            <Card key={idx} variant="default" padding="sm" className="bg-[#F8F8F5]/80">
              <span className="text-[11px] font-semibold text-[#5B5BD6]">Core Skill 0{idx + 1}</span>
              <h4 className="text-sm font-semibold text-[#101828] mt-1 mb-1">{skill.title}</h4>
              <p className="text-xs text-[#667085] leading-relaxed">{skill.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      <EmptyState
        icon={<CheckSquare className="w-6 h-6 stroke-[1.75]" />}
        title="Practical Task Library Initialized"
        description="The upcoming release will host modular micro-tasks with step-by-step guidance, real examples, rubric criteria, and instant proof submission."
        primaryAction={{
          label: 'Request Early Task Access',
          onClick: onActionClick,
          icon: <ArrowRight className="w-4 h-4" />,
        }}
        secondaryAction={{
          label: 'Explore Projects & Challenges',
          onClick: () => onNavigate('projects'),
        }}
      />
    </div>
  );
};
