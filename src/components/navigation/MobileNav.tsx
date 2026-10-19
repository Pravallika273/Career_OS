import React from 'react';
import { Home, GitBranch, CheckSquare, Sparkles, Menu } from 'lucide-react';
import { RouteId } from '../../types/navigation';

export interface MobileNavProps {
  currentRoute: RouteId;
  onNavigate: (route: RouteId) => void;
  onOpenMenu: () => void;
  onOpenAICompanion?: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentRoute,
  onNavigate,
  onOpenMenu,
  onOpenAICompanion,
}) => {
  const isHome = currentRoute === 'home' || currentRoute === 'overview';
  const isPlan = currentRoute === 'my-plan' || currentRoute === 'plans';
  const isLearn =
    currentRoute === 'tasks' ||
    currentRoute === 'learn' ||
    currentRoute === 'learn-and-do' ||
    currentRoute === 'skills';

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-[#E8E6DF] z-40 px-2 py-1.5 flex items-center justify-around select-none safe-area-pb"
    >
      <button
        onClick={() => onNavigate('home')}
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg text-[10px] font-medium transition-colors ${
          isHome ? 'text-[#5B5BD6] font-semibold' : 'text-[#667085]'
        }`}
      >
        <Home className={`w-5 h-5 mb-0.5 ${isHome ? 'text-[#5B5BD6]' : 'text-[#667085]'}`} />
        <span>Home</span>
      </button>

      <button
        onClick={() => onNavigate('my-plan')}
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg text-[10px] font-medium transition-colors ${
          isPlan ? 'text-[#5B5BD6] font-semibold' : 'text-[#667085]'
        }`}
      >
        <GitBranch className={`w-5 h-5 mb-0.5 ${isPlan ? 'text-[#5B5BD6]' : 'text-[#667085]'}`} />
        <span>My Plan</span>
      </button>

      <button
        onClick={() => onNavigate('tasks')}
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg text-[10px] font-medium transition-colors ${
          isLearn ? 'text-[#5B5BD6] font-semibold' : 'text-[#667085]'
        }`}
      >
        <CheckSquare className={`w-5 h-5 mb-0.5 ${isLearn ? 'text-[#5B5BD6]' : 'text-[#667085]'}`} />
        <span>Learn & Do</span>
      </button>

      {onOpenAICompanion && (
        <button
          onClick={onOpenAICompanion}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-lg text-[10px] font-medium text-[#5B5BD6]"
        >
          <Sparkles className="w-5 h-5 mb-0.5 text-[#5B5BD6]" />
          <span>Ask AI</span>
        </button>
      )}

      <button
        onClick={onOpenMenu}
        className="flex flex-col items-center justify-center py-1 px-2.5 rounded-lg text-[10px] font-medium text-[#667085]"
      >
        <Menu className="w-5 h-5 mb-0.5 text-[#667085]" />
        <span>More</span>
      </button>
    </nav>
  );
};

