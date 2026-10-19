import React, { useState } from 'react';
import { WifiOff, Wifi, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useNetworkStatus } from '../../lib/useNetworkStatus';

export const OfflineBanner: React.FC = () => {
  const { isOnline, reconnected, checkConnection } = useNetworkStatus();
  const [isChecking, setIsChecking] = useState(false);

  const handleManualCheck = async () => {
    setIsChecking(true);
    await checkConnection();
    setTimeout(() => setIsChecking(false), 600);
  };

  if (reconnected && isOnline) {
    return (
      <aside
        aria-live="polite"
        className="bg-[#ECFDF3] border-b border-[#A6F4C5] px-3 sm:px-4 py-2 text-xs text-[#027A48] flex items-center justify-between gap-2 z-50 sticky top-0 animate-in fade-in duration-200"
      >
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#12B76A] shrink-0" />
          <span className="font-semibold">
            Connection restored. Your local drafts are synchronized.
          </span>
        </div>
      </aside>
    );
  }

  if (!isOnline) {
    return (
      <aside
        aria-live="assertive"
        className="bg-[#FFF4ED] border-b border-[#FDDCAB] px-3 sm:px-4 py-2 text-xs text-[#B54708] flex flex-wrap items-center justify-between gap-2 z-50 sticky top-0 animate-in fade-in duration-200 shadow-xs"
      >
        <div className="flex items-center gap-2 min-w-0">
          <WifiOff className="w-4 h-4 text-[#F79009] shrink-0" />
          <p className="font-medium truncate">
            <strong className="font-bold">Offline Mode:</strong> Don&apos;t worry — your task drafts, notes, and progress are saved safely on your phone.
          </p>
        </div>

        <button
          type="button"
          onClick={handleManualCheck}
          disabled={isChecking}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#D0D5DD] hover:bg-[#F9FAFB] text-[#344054] font-semibold text-[11px] rounded-md shadow-2xs transition-colors shrink-0 cursor-pointer disabled:opacity-60"
        >
          <RefreshCw className={`w-3 h-3 ${isChecking ? 'animate-spin' : ''}`} />
          <span>{isChecking ? 'Checking...' : 'Check Connection'}</span>
        </button>
      </aside>
    );
  }

  return null;
};
