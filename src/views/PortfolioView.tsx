import React from 'react';
import { FileText, Share2, Download, ArrowRight } from 'lucide-react';
import { RouteId } from '../types/navigation';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';

export interface PortfolioViewProps {
  onNavigate: (route: RouteId) => void;
  onActionClick: () => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({
  onNavigate,
  onActionClick,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Badge variant="indigo" size="sm">Showcase</Badge>
              <span className="text-xs text-[#667085]">Portfolio & Resume</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#101828]">
              Evidence-Backed Portfolio & Resume
            </h1>
            <p className="text-sm text-[#475467] mt-1 max-w-xl leading-relaxed">
              Transform your accumulated proof into a living portfolio, tailored resume exports, and LinkedIn/GitHub shareable links.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="md"
              onClick={() => onNavigate('resume')}
              leftIcon={<FileText className="w-4 h-4" />}
            >
              Open Resume Builder
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={onActionClick}
              leftIcon={<Share2 className="w-4 h-4" />}
            >
              Share Link
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card variant="default">
          <CardHeader>
            <span className="text-xs font-semibold text-[#5B5BD6] uppercase tracking-wider">Module 01</span>
            <CardTitle className="text-base mt-1">Living Proof Profile</CardTitle>
            <CardDescription>
              Clean, unpretentious web profile showcasing verified projects, human communication skills, and real artifacts.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card
          variant="default"
          className="cursor-pointer hover:border-[#5B5BD6] transition-colors"
          onClick={() => onNavigate('resume')}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#21B47A] uppercase tracking-wider">Module 02</span>
              <span className="text-xs text-[#5B5BD6] font-semibold flex items-center gap-1">
                Open Builder <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
            <CardTitle className="text-base mt-1">Targeted Resume Generator</CardTitle>
            <CardDescription>
              Live interactive resume editor with Clean, Professional, Modern & ATS templates, built from your Career Evidence.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <EmptyState
        icon={<FileText className="w-6 h-6 stroke-[1.75]" />}
        title="Resume & Portfolio Foundation"
        description="As you accumulate evidence items in the Evidence Vault, this view automatically syncs and populates your public showcase."
        primaryAction={{
          label: 'Preview Profile Format',
          onClick: onActionClick,
          icon: <ArrowRight className="w-4 h-4" />,
        }}
        secondaryAction={{
          label: 'View Evidence Vault',
          onClick: () => onNavigate('evidence'),
        }}
      />
    </div>
  );
};
