import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastItem {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  duration?: number;
}

/**
 * Global helper untuk memunculkan notifikasi berhasil / gagal pada setiap tombol fungsi
 */
export function showToast(type: 'success' | 'error' | 'info' | 'warning', title: string, message?: string, duration: number = 4500) {
  if (typeof window === 'undefined') return;
  const event = new CustomEvent('osn_toast_show', {
    detail: {
      id: `toast-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      type,
      title,
      message,
      duration
    }
  });
  window.dispatchEvent(event);
}

export const NotificationToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handleToastEvent = (e: Event) => {
      const customEvent = e as CustomEvent<ToastItem>;
      if (!customEvent.detail) return;
      const newToast = customEvent.detail;

      setToasts((prev) => [...prev, newToast]);

      // Auto dismiss after duration
      const timer = setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, newToast.duration || 4500);

      return () => clearTimeout(timer);
    };

    window.addEventListener('osn_toast_show', handleToastEvent);
    return () => {
      window.removeEventListener('osn_toast_show', handleToastEvent);
    };
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed top-5 right-5 z-[99999] flex flex-col gap-2.5 max-w-sm sm:max-w-md w-full pointer-events-none px-3"
      style={{ isolation: 'isolate' }}
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto rounded-2xl p-4 shadow-[0_12px_35px_rgba(0,0,0,0.22)] border flex items-start gap-3 transition-all animate-in fade-in slide-in-from-top-4 duration-200 ${
              isSuccess
                ? 'bg-emerald-900/95 text-white border-emerald-400/60 ring-2 ring-emerald-500/20'
                : isError
                ? 'bg-rose-950/95 text-white border-rose-400/60 ring-2 ring-rose-500/20'
                : isWarning
                ? 'bg-amber-950/95 text-white border-amber-400/60 ring-2 ring-amber-500/20'
                : 'bg-[#1A1615]/95 text-white border-[#D4AF37]/60 ring-2 ring-[#D4AF37]/20'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {isSuccess && (
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              )}
              {isError && (
                <div className="w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-300">
                  <AlertCircle className="w-5 h-5" />
                </div>
              )}
              {isWarning && (
                <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-300">
                  <AlertCircle className="w-5 h-5" />
                </div>
              )}
              {!isSuccess && !isError && !isWarning && (
                <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-[#D4AF37]">
                  <Info className="w-5 h-5" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0 pr-1">
              <h5 className="text-xs sm:text-sm font-extrabold leading-snug">
                {toast.title}
              </h5>
              {toast.message && (
                <p className="text-[11px] sm:text-xs text-neutral-200/90 mt-1 leading-relaxed">
                  {toast.message}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="shrink-0 text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Tutup notifikasi"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
