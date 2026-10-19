import React from 'react';
import { HelpCircle, BookOpen, Compass, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export interface HelpViewProps {
  onOpenAICompanion?: () => void;
}

export const HelpView: React.FC<HelpViewProps> = ({ onOpenAICompanion }) => {
  const faqs = [
    {
      q: 'What is the CareerOS philosophy?',
      a: '"Start wherever you are. Do something useful. Learn from it. Build proof. Become ready." We believe students and beginners learn best by building small verifiable artifacts rather than drowning in endless theory or feeling paralyzed by zero past experience.',
    },
    {
      q: 'What does "one useful step" mean?',
      a: 'A single 20-30 minute focused micro-task that yields a tangible output: e.g. a Git commit reflection, a code snippet, an API request analysis, or a structured project summary.',
    },
    {
      q: 'How does Career evidence help my resume?',
      a: 'Employers increasingly prioritize verifiable work over buzzwords. Every task artifact you save can be linked directly in your portfolio and cited during technical or behavioral interviews.',
    },
    {
      q: 'Can I change my direction or track later?',
      a: 'Yes, completely. CareerOS is designed for exploration. You can adjust your track anytime in your Profile without losing previously completed proof artifacts.',
    },
  ];

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-200">
      <div className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant="indigo" size="sm">Support & Guidance</Badge>
            <span className="text-xs text-[#667085]">Help Center</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#101828]">
            Frequently Asked Questions & Support
          </h1>
          <p className="text-sm text-[#475467] mt-0.5">
            Clear, honest answers to help you navigate your early career with confidence.
          </p>
        </div>

        {onOpenAICompanion && (
          <Button
            variant="primary"
            size="md"
            onClick={onOpenAICompanion}
            leftIcon={<Sparkles className="w-4 h-4" />}
          >
            Ask CareerOS AI
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {faqs.map((faq, idx) => (
          <Card key={idx} variant="default" padding="md" className="space-y-2 bg-white">
            <h3 className="text-sm font-bold text-[#101828] leading-snug">
              {faq.q}
            </h3>
            <p className="text-xs text-[#475467] leading-relaxed">
              {faq.a}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};
