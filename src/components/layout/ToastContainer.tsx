import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Info, Award, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg transition-all transform animate-in slide-in-from-right duration-200 ${
            toast.type === 'reward'
              ? 'bg-[#111111] text-white border-[#FFD400]'
              : toast.type === 'success'
              ? 'bg-white text-[#111111] border-[#111111]'
              : 'bg-white text-[#111111] border-[#E5E0D5]'
          }`}
        >
          <div className="mt-0.5 shrink-0">
            {toast.type === 'reward' ? (
              <Award className="w-5 h-5 text-[#FFD400]" />
            ) : toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-[#111111]" />
            ) : (
              <Info className="w-5 h-5 text-[#777777]" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4
              className={`text-xs font-bold uppercase tracking-wider ${
                toast.type === 'reward' ? 'text-[#FFD400]' : 'text-[#111111]'
              }`}
            >
              {toast.title}
            </h4>
            {toast.message && (
              <p
                className={`text-xs mt-0.5 leading-relaxed ${
                  toast.type === 'reward' ? 'text-neutral-300' : 'text-[#777777]'
                }`}
              >
                {toast.message}
              </p>
            )}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className={`shrink-0 p-1 rounded-md transition-colors cursor-pointer ${
              toast.type === 'reward'
                ? 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                : 'text-[#777777] hover:text-[#111111] hover:bg-[#F5F1E8]'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
