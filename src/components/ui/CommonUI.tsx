import React from 'react';
import { Compass, AlertCircle, ArrowRight, RotateCcw } from 'lucide-react';

export const EmptyState: React.FC<{
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}> = ({
  title = "NOTHING HERE YET.",
  description = "Your direction starts with the first step.",
  actionText,
  onAction
}) => (
  <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-[#E5E0D5] rounded-xl my-6">
    <div className="w-12 h-12 rounded-full bg-[#F5F1E8] flex items-center justify-center mb-4 text-[#111111]">
      <Compass className="w-6 h-6 stroke-[1.75]" />
    </div>
    <h3 className="font-bold text-base tracking-wide uppercase text-[#111111] mb-1 font-mono">
      {title}
    </h3>
    <p className="text-sm text-[#777777] max-w-sm mb-6 leading-relaxed">
      {description}
    </p>
    {actionText && onAction && (
      <button
        onClick={onAction}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111111] text-white hover:bg-black font-semibold text-xs tracking-wider uppercase rounded-lg transition-colors cursor-pointer"
      >
        <span>{actionText}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    )}
  </div>
);

export const LoadingState: React.FC<{ message?: string }> = ({
  message = "Finding your direction..."
}) => (
  <div className="flex flex-col items-center justify-center min-h-[300px] p-8 text-center">
    <div className="relative w-12 h-12 mb-4">
      <div className="absolute inset-0 rounded-full border-2 border-[#E5E0D5] border-t-[#111111] animate-spin" />
      <div className="absolute inset-2 flex items-center justify-center">
        <div className="w-2.5 h-2.5 bg-[#FFD400] rounded-sm rotate-45" />
      </div>
    </div>
    <p className="text-xs font-mono tracking-widest text-[#777777] uppercase">
      LOADING...
    </p>
    <p className="text-sm font-medium text-[#111111] mt-1">
      {message}
    </p>
  </div>
);

export const ErrorState: React.FC<{
  title?: string;
  message?: string;
  onRetry?: () => void;
}> = ({
  title = "SOMETHING WENT OFF COURSE.",
  message = "Try again.",
  onRetry
}) => (
  <div className="flex flex-col items-center justify-center p-10 text-center bg-white border border-[#E5E0D5] rounded-xl my-6">
    <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-3">
      <AlertCircle className="w-6 h-6 stroke-[1.75]" />
    </div>
    <h3 className="font-bold text-sm tracking-wide uppercase text-[#111111] mb-1 font-mono">
      {title}
    </h3>
    <p className="text-sm text-[#777777] max-w-sm mb-5 leading-relaxed">
      {message}
    </p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-4 py-2 border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white font-medium text-xs tracking-wider uppercase rounded-lg transition-colors cursor-pointer"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>RETRY</span>
      </button>
    )}
  </div>
);

export const ProgressBar: React.FC<{
  value: number;
  max?: number;
  showPercent?: boolean;
  className?: string;
  color?: string;
}> = ({ value, max = 100, showPercent = false, className = '', color = 'bg-[#FFD400]' }) => {
  const percent = Math.min(100, Math.max(0, Math.round((value / max) * 100)));
  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center text-xs mb-1">
        {showPercent && (
          <span className="font-mono text-[11px] text-[#777777] font-medium ml-auto">
            {percent}%
          </span>
        )}
      </div>
      <div className="w-full h-2 bg-[#E5E0D5]/50 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-500 ease-out`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: string;
}> = ({ isOpen, onClose, title, subtitle, children, maxWidth = 'max-w-md' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="fixed inset-0" onClick={onClose} />
      <div className={`relative w-full ${maxWidth} bg-white border border-[#E5E0D5] rounded-2xl shadow-2xl p-6 sm:p-8 z-10 animate-in fade-in zoom-in-95 duration-200`}>
        <div className="flex items-start justify-between mb-5 pb-4 border-b border-[#E5E0D5]">
          <div>
            <h3 className="text-lg font-bold text-[#111111] tracking-tight">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-[#777777] mt-0.5">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-[#777777] hover:text-[#111111] p-1.5 rounded-lg hover:bg-[#F5F1E8] transition-colors cursor-pointer"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
