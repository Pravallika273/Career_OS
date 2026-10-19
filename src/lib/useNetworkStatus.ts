import { useState, useEffect, useCallback } from 'react';

export interface NetworkStatus {
  isOnline: boolean;
  wasOffline: boolean;
  reconnected: boolean;
  lastChecked: Date;
  checkConnection: () => Promise<boolean>;
}

export function useNetworkStatus(): NetworkStatus {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });
  const [wasOffline, setWasOffline] = useState(false);
  const [reconnected, setReconnected] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date>(new Date());

  const checkConnection = useCallback(async (): Promise<boolean> => {
    setLastChecked(new Date());
    if (!navigator.onLine) {
      setIsOnline(false);
      return false;
    }

    try {
      // Lightweight cache-busted ping to check real internet availability
      const response = await fetch('/favicon.ico?_ping=' + Date.now(), {
        method: 'HEAD',
        cache: 'no-store',
      });
      const online = response.ok || response.status === 304 || response.type === 'opaque';
      setIsOnline(online);
      return online;
    } catch {
      // If fetch fails, we might still be offline or restricted
      setIsOnline(false);
      return false;
    }
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setReconnected(true);
      // Auto-hide the "Back online" message after 4 seconds
      const timer = setTimeout(() => {
        setReconnected(false);
        setWasOffline(false);
      }, 4000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setWasOffline(true);
      setReconnected(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return {
    isOnline,
    wasOffline,
    reconnected,
    lastChecked,
    checkConnection,
  };
}
