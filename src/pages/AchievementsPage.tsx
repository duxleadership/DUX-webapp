import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Award,
  Lock,
  Check,
  Compass,
  Footprints,
  Lightbulb,
  Users,
  TrendingUp,
  MapPin,
  Flame,
  Sparkles,
  ShieldAlert
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Footprints,
  Compass,
  Lightbulb,
  Users,
  TrendingUp,
  MapPin,
  Flame,
  Sparkles
};

export const AchievementsPage: React.FC = () => {
  const { achievements, user } = useApp();
  const [filter, setFilter] = useState<'ALL' | 'UNLOCKED' | 'LOCKED'>('ALL');

  const filtered = achievements.filter((a) => {
    if (filter === 'UNLOCKED') return a.unlocked;
    if (filter === 'LOCKED') return !a.unlocked;
    return true;
  });

  const unlockedTotal = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#777777] mb-1 font-semibold">
          <Award className="w-3.5 h-3.5 text-[#FFD400]" />
          <span>PROVEN MOMENTUM</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#111111]">
          DUX ACHIEVEMENTS
        </h1>
        <p className="text-sm text-[#777777] font-medium mt-1">
          Evidence of your evolution. Badges are not participation trophies; they mark tangible steps.
        </p>
      </div>

      {/* Overview Stat Strip */}
      <div className="p-6 bg-white border border-[#E5E0D5] rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#111111] text-[#FFD400] flex items-center justify-center font-black">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-mono text-sm font-bold uppercase text-[#111111]">
              PASSPORT BADGES
            </h3>
            <p className="text-xs text-[#777777]">
              {unlockedTotal} of {achievements.length} milestones conquered
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F5F1E8] rounded-xl self-start sm:self-center">
          {(['ALL', 'UNLOCKED', 'LOCKED'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer ${
                filter === tab
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'text-[#777777] hover:text-[#111111]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((ach) => {
          const IconComponent = ICON_MAP[ach.iconName] || Award;

          return (
            <div
              key={ach.id}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                ach.unlocked
                  ? 'bg-white border-[#111111] shadow-xs'
                  : 'bg-[#FBF9F5] border-[#E5E0D5] opacity-75'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform ${
                      ach.unlocked
                        ? 'bg-[#111111] text-[#FFD400]'
                        : 'bg-[#E5E0D5] text-[#777777]'
                    }`}
                  >
                    <IconComponent className="w-6 h-6 stroke-[1.75]" />
                  </div>

                  <span
                    className={`font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded-md ${
                      ach.unlocked
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-[#E5E0D5]/50 text-[#777777]'
                    }`}
                  >
                    {ach.unlocked ? '✓ UNLOCKED' : '🔒 LOCKED'}
                  </span>
                </div>

                <h3 className="font-black text-sm uppercase tracking-wide text-[#111111] mb-1">
                  {ach.title}
                </h3>

                <p className="text-xs text-[#777777] leading-relaxed mb-4">
                  {ach.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F5F1E8] flex items-center justify-between font-mono text-[11px]">
                <span className="text-[#777777] uppercase">{ach.category}</span>
                <span className="font-bold text-[#111111]">+{ach.points} PTS</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
