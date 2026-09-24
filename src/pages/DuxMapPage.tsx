import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Map,
  Flag,
  Compass,
  Hammer,
  Share2,
  TrendingUp,
  Award,
  Check,
  Lock,
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import { ProgressBar } from '../components/ui/CommonUI';

const STAGE_ICONS: Record<string, React.ElementType> = {
  Flag,
  Compass,
  Hammer,
  Share2,
  TrendingUp,
  Award
};

export const DuxMapPage: React.FC = () => {
  const { mapStages, user } = useApp();
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#777777] mb-1 font-semibold">
          <Map className="w-3.5 h-3.5 text-[#FFD400]" />
          <span>LIFELONG CARTOGRAPHY</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#111111]">
          DUX MAP
        </h1>
        <p className="text-sm text-[#777777] font-medium mt-1">
          Your path from confusion to aligned momentum. Every stage unlocked creates permanent self-trust.
        </p>
      </div>

      {/* Visual Vertical Roadmap */}
      <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-3.5 sm:before:left-5 before:top-6 before:bottom-6 before:w-0.5 before:bg-[#E5E0D5]">
        {mapStages.map((stage, idx) => {
          const IconComponent = STAGE_ICONS[stage.icon] || Compass;
          const isCompleted = stage.status === 'completed' || stage.progress === 100;
          const isInProgress = stage.status === 'in-progress' && !isCompleted;
          const isLocked = stage.status === 'locked';

          return (
            <div key={stage.id} className="relative group">
              {/* Stage Node Marker on vertical line */}
              <div
                className={`absolute -left-6 sm:-left-10 top-6 -translate-x-1/2 w-8 h-8 rounded-full border-2 flex items-center justify-center font-mono text-xs font-bold transition-all shadow-sm ${
                  isCompleted
                    ? 'bg-[#111111] text-[#FFD400] border-[#111111]'
                    : isInProgress
                    ? 'bg-[#FFD400] text-[#111111] border-[#111111]'
                    : 'bg-white text-[#777777] border-[#E5E0D5]'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : isLocked ? (
                  <Lock className="w-3.5 h-3.5" />
                ) : (
                  <span>{stage.number}</span>
                )}
              </div>

              {/* Stage Content Card */}
              <div
                className={`p-6 sm:p-8 bg-white border rounded-3xl transition-all ${
                  isCompleted
                    ? 'border-[#111111]'
                    : isInProgress
                    ? 'border-[#111111] shadow-md ring-1 ring-[#111111]/10'
                    : 'border-[#E5E0D5] opacity-70'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F5F1E8]">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isCompleted
                          ? 'bg-[#111111] text-[#FFD400]'
                          : isInProgress
                          ? 'bg-[#FFD400] text-[#111111]'
                          : 'bg-[#F5F1E8] text-[#777777]'
                      }`}
                    >
                      <IconComponent className="w-5 h-5 stroke-[2]" />
                    </div>

                    <div>
                      <span className="font-mono text-[10px] uppercase font-bold text-[#777777]">
                        STAGE 0{stage.number}
                      </span>
                      <h3 className="text-xl font-black uppercase tracking-tight text-[#111111]">
                        {stage.name} · {stage.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-start sm:self-center">
                    <span
                      className={`font-mono text-xs font-bold px-3 py-1 rounded-md uppercase ${
                        isCompleted
                          ? 'bg-emerald-50 text-emerald-700'
                          : isInProgress
                          ? 'bg-[#111111] text-white'
                          : 'bg-[#F5F1E8] text-[#777777]'
                      }`}
                    >
                      {isCompleted ? '✓ COMPLETE' : isInProgress ? `${stage.progress}% ACTIVE` : '🔒 LOCKED'}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#777777] mt-4 leading-relaxed max-w-2xl">
                  {stage.description}
                </p>

                {/* Milestones list */}
                <div className="my-5 p-4 bg-[#FBF9F5] border border-[#E5E0D5] rounded-2xl">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#777777] font-bold block mb-2">
                    CORE MILESTONES
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {stage.milestones.map((m, mIdx) => (
                      <div key={mIdx} className="flex items-center gap-2 text-xs text-[#111111]">
                        <div
                          className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${
                            isCompleted ? 'bg-[#111111] text-[#FFD400]' : 'border border-[#E5E0D5]'
                          }`}
                        >
                          {isCompleted && <Check className="w-2.5 h-2.5" />}
                        </div>
                        <span className="truncate">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <ProgressBar
                    value={stage.progress}
                    max={100}
                    color={isCompleted ? 'bg-emerald-500' : 'bg-[#FFD400]'}
                  />
                </div>

                {/* Direct Action Link */}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => navigate(stage.targetRoute)}
                    disabled={isLocked}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                      isLocked
                        ? 'opacity-40 cursor-not-allowed bg-[#E5E0D5] text-[#777777]'
                        : 'bg-[#111111] text-white hover:bg-black shadow-sm'
                    }`}
                  >
                    <span>{stage.actionLabel}</span>
                    <ArrowRight className="w-4 h-4 text-[#FFD400]" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
