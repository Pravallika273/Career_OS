import React from 'react';
import { Bell, CheckCircle2, Award, Clock, Sparkles } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const NotificationsView: React.FC = () => {
  const notifications = [
    {
      id: '1',
      title: 'Weekly Streak Reached: 3 Days Active',
      desc: 'You completed 3 practical micro-tasks this week. Consistency is your greatest advantage.',
      time: 'Today, 9:30 AM',
      read: false,
      icon: <Award className="w-4 h-4 text-[#21B47A]" />,
    },
    {
      id: '2',
      title: 'Artifact Recorded to Vault',
      desc: '"Git Commit Structure Reflection" was saved to your career proof repository.',
      time: 'Yesterday',
      read: true,
      icon: <CheckCircle2 className="w-4 h-4 text-[#5B5BD6]" />,
    },
    {
      id: '3',
      title: 'New Recommended Next Step Ready',
      desc: 'Based on your goal, a new 25-minute task "Deconstruct 1 Real Job Requirement" was unlocked.',
      time: '2 days ago',
      read: true,
      icon: <Sparkles className="w-4 h-4 text-[#5B5BD6]" />,
    },
  ];

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-200">
      <div className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-7 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant="indigo" size="sm">Activity Log</Badge>
            <span className="text-xs text-[#667085]">Notifications</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#101828]">
            Notifications & Milestones
          </h1>
          <p className="text-sm text-[#475467] mt-0.5">
            Quiet, high-signal alerts about your progress and verified proof.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {notifications.map((item) => (
          <Card
            key={item.id}
            variant="default"
            padding="md"
            className={`transition-all bg-white ${!item.read ? 'border-l-4 border-l-[#5B5BD6]' : ''}`}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#F8F8F5] border border-[#E8E6DF] shrink-0">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs sm:text-sm font-semibold text-[#101828] truncate">
                    {item.title}
                  </h4>
                  <span className="text-[11px] text-[#98A2B3] shrink-0">{item.time}</span>
                </div>
                <p className="text-xs text-[#475467] mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
