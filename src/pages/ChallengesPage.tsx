import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Target, ArrowRight, CheckCircle2, Clock, Award, Flame, Filter } from 'lucide-react';
import { ProgressBar } from '../components/ui/CommonUI';

export const ChallengesPage: React.FC = () => {
  const { challenges, startChallenge } = useApp();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Personal Growth', 'Confidence', 'Creativity', 'Leadership', 'Career'];

  const filteredChallenges = selectedCategory === 'ALL'
    ? challenges
    : challenges.filter((c) => c.category === selectedCategory);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#777777] mb-1 font-semibold">
          <Target className="w-3.5 h-3.5 text-[#FFD400]" />
          <span>ACTION CURRICULUM</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#111111]">
          DUX CHALLENGES
        </h1>
        <p className="text-sm text-[#777777] font-medium mt-1">
          Stop overthinking. Calibrate direction through focused micro-commitments.
        </p>
      </div>

      {/* Category Filter Tabs (Zero-pill compliant buttons) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-[#E5E0D5]">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-[#111111] text-white shadow-sm'
                  : 'bg-white text-[#777777] hover:text-[#111111] hover:bg-[#F5F1E8] border border-[#E5E0D5]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Challenge Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredChallenges.map((challenge) => {
          const completedDays = challenge.days.filter((d) => d.completed).length;
          const isComplete = challenge.completed || completedDays === challenge.durationDays;

          return (
            <div
              key={challenge.id}
              className={`p-6 sm:p-8 bg-white border rounded-3xl flex flex-col justify-between transition-all hover:border-[#111111] shadow-xs group ${
                challenge.enrolled ? 'border-[#111111]/30' : 'border-[#E5E0D5]'
              }`}
            >
              <div>
                {/* Meta details */}
                <div className="flex items-center justify-between text-xs text-[#777777] mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#111111]">
                      {challenge.durationDays} DAYS
                    </span>
                    <span>·</span>
                    <span className="font-mono text-[11px] uppercase">{challenge.difficulty}</span>
                    <span>·</span>
                    <span>{challenge.category}</span>
                  </div>

                  <span className="font-mono text-xs font-bold text-[#111111] bg-[#FFD400] px-2 py-0.5 rounded-md">
                    +{challenge.rewardPoints} PTS
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#111111] mb-2 leading-snug">
                  {challenge.title}
                </h3>

                <p className="text-xs text-[#777777] leading-relaxed mb-6">
                  {challenge.shortDescription}
                </p>

                {/* Progress bar if enrolled */}
                {challenge.enrolled && (
                  <div className="p-4 bg-[#FBF9F5] border border-[#E5E0D5] rounded-2xl mb-6 space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="font-bold text-[#111111]">
                        {isComplete ? 'CHALLENGE COMPLETED' : `DAY ${challenge.currentDay} OF ${challenge.durationDays}`}
                      </span>
                      <span className="text-[#777777]">
                        {completedDays}/{challenge.durationDays} Days Done
                      </span>
                    </div>
                    <ProgressBar
                      value={completedDays}
                      max={challenge.durationDays}
                      color={isComplete ? 'bg-emerald-500' : 'bg-[#111111]'}
                    />
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[#F5F1E8] flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-xs text-[#777777]">
                  <Flame className="w-4 h-4 text-[#FFD400]" />
                  <span>Unlocks badge upon Day {challenge.durationDays}</span>
                </div>

                <Link
                  to={`/challenges/${challenge.id}`}
                  onClick={() => {
                    if (!challenge.enrolled) {
                      startChallenge(challenge.id);
                    }
                  }}
                  className="px-6 py-3 bg-[#111111] text-white hover:bg-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer group-hover:bg-black"
                >
                  <span>
                    {isComplete
                      ? 'REVIEW SPRINT'
                      : challenge.enrolled
                      ? 'CONTINUE SPRINT'
                      : 'START CHALLENGE'}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#FFD400]" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
