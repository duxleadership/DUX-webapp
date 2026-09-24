import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Gift,
  Award,
  Sparkles,
  ArrowRight,
  Check,
  CheckCircle2,
  Lock,
  Flame,
  ShoppingBag
} from 'lucide-react';
import { ProgressBar } from '../components/ui/CommonUI';

export const RewardsPage: React.FC = () => {
  const { user, rewards, redeemReward } = useApp();

  const currentPoints = user?.points || 0;
  const nextMilestone = 1000;
  const progressToNext = Math.min(100, Math.round((currentPoints / nextMilestone) * 100));

  const waysToEarn = [
    { action: 'Complete challenge', points: '+100' },
    { action: 'Answer Daily DUX', points: '+20' },
    { action: 'Share story', points: '+150' },
    { action: 'Submit idea', points: '+50' },
    { action: 'Join event', points: '+100' },
    { action: 'Community activity', points: '+10' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#777777] mb-1 font-semibold">
          <Gift className="w-3.5 h-3.5 text-[#FFD400]" />
          <span>VALUE EXCHANGE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#111111]">
          DUX REWARDS
        </h1>
        <p className="text-sm text-[#777777] font-medium mt-1">
          Turn your discipline into physical discounts, private workshops, and digital assets.
        </p>
      </div>

      {/* Main Points Dashboard Card */}
      <div className="bg-[#111111] text-white p-6 sm:p-10 rounded-3xl relative overflow-hidden shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-neutral-800">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#FFD400] font-bold block mb-1">
              YOUR DUX POINTS
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-6xl font-black text-white font-mono">
                {currentPoints}
              </span>
              <span className="text-sm font-mono text-neutral-400 uppercase">PTS</span>
            </div>
          </div>

          <div className="bg-white/10 p-4 rounded-2xl border border-white/10 min-w-[220px]">
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-neutral-400">NEXT REWARD</span>
              <span className="text-[#FFD400] font-bold">{nextMilestone} PTS</span>
            </div>
            <ProgressBar value={currentPoints} max={nextMilestone} color="bg-[#FFD400]" />
            <span className="text-[10px] text-neutral-400 font-mono block mt-1.5 text-right">
              {Math.max(0, nextMilestone - currentPoints)} points to unlock next tier
            </span>
          </div>
        </div>

        {/* Ways to Earn Strip */}
        <div className="relative z-10 pt-6">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-3">
            WAYS TO EARN
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {waysToEarn.map((w, idx) => (
              <div key={idx} className="p-3 bg-white/5 border border-white/10 rounded-xl text-xs">
                <span className="font-mono font-bold text-[#FFD400] block text-sm">{w.points}</span>
                <span className="text-neutral-300 text-[11px] leading-tight block mt-0.5">{w.action}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Available Rewards Catalogue */}
      <div className="space-y-4">
        <h2 className="text-xl font-black uppercase tracking-tight text-[#111111]">
          AVAILABLE REWARDS & PERKS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rewards.map((reward) => {
            const canAfford = currentPoints >= reward.pointsCost;

            return (
              <div
                key={reward.id}
                className="p-6 bg-white border border-[#E5E0D5] rounded-3xl flex flex-col justify-between hover:border-[#111111] transition-all shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#777777] bg-[#F5F1E8] px-2.5 py-0.5 rounded-md">
                      {reward.type}
                    </span>
                    <span className="font-mono text-sm font-bold text-[#111111]">
                      {reward.pointsCost} PTS
                    </span>
                  </div>

                  <h3 className="text-lg font-black uppercase tracking-tight text-[#111111] mb-2">
                    {reward.title}
                  </h3>

                  <p className="text-xs text-[#777777] leading-relaxed mb-4">
                    {reward.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F5F1E8] flex items-center justify-between">
                  {reward.unlocked ? (
                    <div className="w-full p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs flex items-center justify-between">
                      <span className="font-mono font-bold text-emerald-800">
                        CODE: {reward.rewardCode}
                      </span>
                      <span className="text-emerald-700 font-bold uppercase text-[10px]">
                        ✓ CLAIMED
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={() => redeemReward(reward.id)}
                      disabled={!canAfford}
                      className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        canAfford
                          ? 'bg-[#111111] text-white hover:bg-black shadow-sm'
                          : 'bg-[#E5E0D5] text-[#777777] opacity-60 cursor-not-allowed'
                      }`}
                    >
                      <Gift className="w-4 h-4 text-[#FFD400]" />
                      <span>{canAfford ? 'REDEEM REWARD' : `NEED ${reward.pointsCost - currentPoints} MORE PTS`}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
