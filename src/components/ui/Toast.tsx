import React, { createContext, useContext, useState, useCallback, useId } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, 'id'>) => string;
  removeToast: (id: string) => void;
  toast: {
    info: (title: string, message?: string) => string;
    success: (title: string, message?: string) => string;
    warning: (title: string, message?: string) => string;
    error: (title: string, message?: string) => string;
  };
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    ({ type, title, message, duration = 4000 }: Omit<ToastItem, 'id'>) => {
      const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newToast: ToastItem = { id, type, title, message, duration };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }

      return id;
    },
    [removeToast]
  );

  const toastHelpers = {
    info: (title: string, message?: string) => addToast({ type: 'info', title, message }),
    success: (title: string, message?: string) => addToast({ type: 'success', title, message }),
    warning: (title: string, message?: string) => addToast({ type: 'warning', title, message }),
    error: (title: string, message?: string) => addToast({ type: 'error', title, message }),
  };

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
        toast: toastHelpers,
      }}
    >
      {children}
      {/* Toast Render Stack */}
      <div
        aria-live="polite"
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none p-4 sm:p-0"
      >
        {toasts.map((item) => (
          <ToastCard key={item.id} item={item} onDismiss={() => removeToast(item.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const ToastCard: React.FC<{ item: ToastItem; onDismiss: () => void }> = ({
  item,
  onDismiss,
}) => {
  const icons: Record<ToastType, React.ReactNode> = {
    info: <Info className="w-4 h-4 text-[#5B5BD6] shrink-0" />,
    success: <CheckCircle2 className="w-4 h-4 text-[#21B47A] shrink-0" />,
    warning: <AlertTriangle className="w-4 h-4 text-[#F26B5B] shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-[#F26B5B] shrink-0" />,
  };

  const borders: Record<ToastType, string> = {
    info: 'border-l-4 border-l-[#5B5BD6]',
    success: 'border-l-4 border-l-[#21B47A]',
    warning: 'border-l-4 border-l-[#F26B5B]',
    error: 'border-l-4 border-l-[#F26B5B]',
  };

  return (
    <div
      role="status"
      className={`pointer-events-auto flex items-start gap-3 p-3.5 bg-white border border-[#E8E6DF] rounded-xl shadow-lg transition-all animate-in slide-in-from-bottom-3 duration-200 ${borders[item.type]}`}
    >
      <div className="mt-0.5">{icons[item.type]}</div>
      <div className="flex-1 text-left min-w-0">
        <h5 className="text-sm font-semibold text-[#101828] leading-tight truncate">
          {item.title}
        </h5>
        {item.message && (
          <p className="text-xs text-[#667085] mt-0.5 leading-relaxed">
            {item.message}
          </p>
        )}
      </div>
      <button
        onClick={onDismiss}
        className="p-1 rounded-md text-[#98A2B3] hover:text-[#101828] hover:bg-[#F4F3EF] transition-colors"
        aria-label="Close notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
