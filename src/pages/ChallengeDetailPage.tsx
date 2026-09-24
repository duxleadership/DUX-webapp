import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Target,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Award,
  Sparkles,
  Flame,
  Check,
  Calendar
} from 'lucide-react';
import { ProgressBar } from '../components/ui/CommonUI';

export const ChallengeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { challenges, completeChallengeDay, claimChallengeAchievement, startChallenge } = useApp();
  const navigate = useNavigate();

  const challenge = challenges.find((c) => c.id === id) || challenges[0];

  // Active view day index (1-based)
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(() => {
    // If there's an incomplete day, open that, or default to 1
    const nextIncomplete = challenge.days.find((d) => !d.completed);
    return nextIncomplete ? nextIncomplete.day : 1;
  });

  const [reflectionInput, setReflectionInput] = useState('');

  if (!challenge) {
    return (
      <div className="text-center py-20">
        <p>Challenge not found.</p>
        <Link to="/challenges" className="text-xs uppercase font-bold text-[#111111] underline mt-4 block">
          Back to Challenges
        </Link>
      </div>
    );
  }

  const currentDayData = challenge.days.find((d) => d.day === selectedDayNumber) || challenge.days[0];
  const allDaysCompleted = challenge.days.every((d) => d.completed);
  const completedCount = challenge.days.filter((d) => d.completed).length;

  const handleMarkComplete = () => {
    completeChallengeDay(challenge.id, selectedDayNumber);
  };

  const handleContinueNextDay = () => {
    const nextDay = Math.min(challenge.durationDays, selectedDayNumber + 1);
    setSelectedDayNumber(nextDay);
    setReflectionInput('');
  };

  const handleClaimReward = () => {
    claimChallengeAchievement(challenge.id);
    navigate('/achievements');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Nav */}
      <div className="flex items-center justify-between">
        <Link
          to="/challenges"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#777777] hover:text-[#111111] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Challenges</span>
        </Link>

        <span className="font-mono text-xs font-bold text-[#111111] bg-[#FFD400] px-3 py-1 rounded-md">
          +{challenge.rewardPoints} REWARD POINTS
        </span>
      </div>

      {/* Challenge Title Banner */}
      <div className="bg-[#111111] text-white p-6 sm:p-10 rounded-3xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FFD400] uppercase tracking-widest mb-2 font-bold">
              <span>{challenge.category}</span>
              <span>·</span>
              <span>{challenge.durationDays} DAYS PROTOCOL</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mb-2">
              {challenge.title}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl leading-relaxed">
              {challenge.description}
            </p>
          </div>

          <div className="text-left md:text-right font-mono shrink-0">
            <span className="text-xs text-neutral-400 uppercase tracking-widest block mb-1">
              Sprint Progress
            </span>
            <span className="text-3xl font-black text-white">
              {completedCount}/{challenge.durationDays}
            </span>
            <span className="text-xs text-[#FFD400] ml-1">DAYS</span>
          </div>
        </div>
      </div>

      {/* Day Track Tabs */}
      <div className="bg-white border border-[#E5E0D5] rounded-2xl p-4 sm:p-5">
        <div className="text-[11px] font-mono uppercase tracking-wider text-[#777777] font-bold mb-3">
          CHALLENGE TIMELINE
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {challenge.days.map((d) => {
            const isCurrent = d.day === selectedDayNumber;
            const isDone = d.completed;

            return (
              <button
                key={d.day}
                type="button"
                onClick={() => setSelectedDayNumber(d.day)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isCurrent
                    ? 'border-[#111111] bg-[#111111] text-white shadow-sm'
                    : isDone
                    ? 'border-emerald-300 bg-emerald-50/50 text-[#111111]'
                    : 'border-[#E5E0D5] bg-[#FBF9F5] text-[#777777] hover:border-[#111111]'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[11px] mb-1">
                  <span className="font-bold">DAY {d.day}</span>
                  {isDone && <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />}
                </div>
                <p className="text-[10px] font-bold uppercase truncate">
                  {d.title}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* If All 7 Days Complete: Celebration Banner */}
      {allDaysCompleted ? (
        <div className="bg-[#111111] text-white border border-[#FFD400] rounded-3xl p-8 sm:p-12 text-center shadow-xl">
          <div className="w-16 h-16 rounded-full bg-[#FFD400] text-[#111111] flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-2">
            CHALLENGE COMPLETE 🎉
          </h2>
          <p className="text-sm text-neutral-300 max-w-md mx-auto mb-6 leading-relaxed">
            You've taken 7 steps forward. You didn't just plan direction; you embodied it through continuous daily proof.
          </p>
          <button
            onClick={handleClaimReward}
            className="px-8 py-4 bg-[#FFD400] text-[#111111] hover:bg-[#eec600] font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg inline-flex items-center gap-2 cursor-pointer"
          >
            <span>CLAIM ACHIEVEMENT (+{challenge.rewardPoints} PTS)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        /* Active Day Task Card */
        <div className="bg-white border border-[#E5E0D5] rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D5]">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#111111] uppercase">
              <Calendar className="w-4 h-4 text-[#FFD400]" />
              <span>
                DAY {currentDayData.day} · {currentDayData.title}
              </span>
            </div>

            {currentDayData.completed && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider rounded-md font-mono">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>DAY {currentDayData.day} COMPLETE</span>
              </span>
            )}
          </div>

          <div>
            <span className="font-mono text-xs uppercase text-[#777777] font-semibold">
              TODAY'S MISSION
            </span>
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#111111] mt-1 mb-3">
              Task: {currentDayData.task}
            </h3>
            {currentDayData.reflectionPrompt && (
              <div className="p-4 bg-[#FBF9F5] border border-[#E5E0D5] rounded-xl text-xs text-[#111111]">
                <span className="font-mono text-[10px] text-[#777777] uppercase block mb-1">
                  Guiding Reflection:
                </span>
                <p className="font-medium italic leading-relaxed">
                  "{currentDayData.reflectionPrompt}"
                </p>
              </div>
            )}
          </div>

          {/* Optional reflection text box */}
          {!currentDayData.completed && (
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#111111]">
                Execution Log (Optional)
              </label>
              <textarea
                value={reflectionInput}
                onChange={(e) => setReflectionInput(e.target.value)}
                placeholder="Log what you actually completed or noticed during this task..."
                rows={3}
                className="w-full p-4 bg-[#FBF9F5] border border-[#E5E0D5] rounded-xl text-xs text-[#111111] focus:outline-none focus:border-[#111111] focus:bg-white transition-all resize-none"
              />
            </div>
          )}

          {/* Action Button */}
          <div className="pt-4 border-t border-[#E5E0D5] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#777777]">
              <span>Step {currentDayData.day} of {challenge.durationDays}</span>
            </div>

            {!currentDayData.completed ? (
              <button
                type="button"
                onClick={handleMarkComplete}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#111111] text-white hover:bg-black font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>MARK COMPLETE</span>
                <Check className="w-4 h-4 text-[#FFD400]" />
              </button>
            ) : (
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-xs font-mono text-emerald-600 font-bold hidden sm:inline">
                  ✓ RECORDED
                </span>
                {selectedDayNumber < challenge.durationDays ? (
                  <button
                    type="button"
                    onClick={handleContinueNextDay}
                    className="w-full sm:w-auto px-7 py-3 bg-[#111111] text-white hover:bg-black font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>CONTINUE TO DAY {selectedDayNumber + 1} →</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleClaimReward}
                    className="w-full sm:w-auto px-7 py-3 bg-[#FFD400] text-[#111111] hover:bg-[#eec600] font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>CLAIM ACHIEVEMENT</span>
                    <Award className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
