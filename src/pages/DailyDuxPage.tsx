import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Lock, Share2, Calendar, Flame, Check, History } from 'lucide-react';

export const DailyDuxPage: React.FC = () => {
  const { user, dailyAnswers, saveDailyAnswer } = useApp();

  const todaysQuestion = "What is one thing you are afraid to start?";
  const [answerText, setAnswerText] = useState('');
  const [hasAnsweredToday, setHasAnsweredToday] = useState(() => {
    return dailyAnswers.some((a) => a.date === 'Today');
  });

  const handleSave = (isPrivate: boolean) => {
    if (!answerText.trim()) return;
    saveDailyAnswer(todaysQuestion, answerText, isPrivate);
    setHasAnsweredToday(true);
    setAnswerText('');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#777777] mb-1 font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#FFD400]" />
          <span>DAILY COMPASS HABIT</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#111111]">
          DAILY DUX
        </h1>
        <p className="text-sm text-[#777777] font-medium mt-1">
          One question. One thought. One step forward.
        </p>
      </div>

      {/* Streak & Stats Header Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-white border border-[#E5E0D5] rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#111111] text-[#FFD400] flex items-center justify-center">
            <Flame className="w-5 h-5 fill-[#FFD400]" />
          </div>
          <div>
            <p className="font-mono text-base font-bold text-[#111111]">{user?.streak || 1} DAYS</p>
            <p className="text-[10px] uppercase tracking-wider text-[#777777]">Current Streak</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F5F1E8] text-[#111111] flex items-center justify-center font-mono font-bold text-xs">
            +20
          </div>
          <div>
            <p className="font-mono text-base font-bold text-[#111111]">POINTS</p>
            <p className="text-[10px] uppercase tracking-wider text-[#777777]">Per Reflection</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F5F1E8] text-[#111111] flex items-center justify-center font-mono font-bold text-xs">
            {dailyAnswers.length}
          </div>
          <div>
            <p className="font-mono text-base font-bold text-[#111111]">LOGGED</p>
            <p className="text-[10px] uppercase tracking-wider text-[#777777]">Total Reflections</p>
          </div>
        </div>
      </div>

      {/* Today's Question Card */}
      <div className="bg-white border border-[#E5E0D5] rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D5] mb-6">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#777777]">
            TODAY'S PROMPT · {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          {hasAnsweredToday && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider rounded-md font-mono">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>COMPLETED FOR TODAY</span>
            </span>
          )}
        </div>

        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#111111] leading-snug">
            "{todaysQuestion}"
          </h2>
          <p className="text-xs text-[#777777] mt-2">
            Silence your internal critic. Let the honest raw thought reveal what is beneath your hesitation.
          </p>
        </div>

        <div className="space-y-4">
          <textarea
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            placeholder="Write your thoughts..."
            rows={5}
            className="w-full p-4 bg-[#FBF9F5] border border-[#E5E0D5] rounded-2xl text-xs sm:text-sm text-[#111111] placeholder:text-[#777777] focus:outline-none focus:border-[#111111] focus:bg-white transition-all resize-none leading-relaxed"
          />

          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => handleSave(true)}
              disabled={!answerText.trim()}
              className={`w-full sm:w-auto px-6 py-3 border border-[#111111] text-[#111111] hover:bg-[#F5F1E8] font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                !answerText.trim() ? 'opacity-40 cursor-not-allowed' : ''
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>SAVE PRIVATELY</span>
            </button>

            <button
              type="button"
              onClick={() => handleSave(false)}
              disabled={!answerText.trim()}
              className={`w-full sm:w-auto px-7 py-3 bg-[#111111] text-white hover:bg-black font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                !answerText.trim() ? 'opacity-40 cursor-not-allowed' : ''
              }`}
            >
              <Share2 className="w-3.5 h-3.5 text-[#FFD400]" />
              <span>SHARE WITH DUX</span>
            </button>
          </div>
        </div>
      </div>

      {/* Previous Answers History */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#111111]">
          <History className="w-4 h-4 text-[#777777]" />
          <span>PREVIOUS ANSWERS ({dailyAnswers.length})</span>
        </div>

        {dailyAnswers.length === 0 ? (
          <div className="p-8 text-center bg-white border border-[#E5E0D5] rounded-2xl">
            <p className="font-mono text-xs uppercase text-[#777777]">No previous answers recorded.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {dailyAnswers.map((entry) => (
              <div
                key={entry.id}
                className="p-5 bg-white border border-[#E5E0D5] rounded-2xl hover:border-[#111111] transition-colors"
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#F5F1E8] text-xs">
                  <div className="flex items-center gap-2 font-mono text-[#777777]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{entry.date}</span>
                  </div>
                  <span className="font-mono text-[10px] uppercase font-bold text-[#777777] flex items-center gap-1">
                    {entry.isPrivate ? (
                      <>
                        <Lock className="w-3 h-3" />
                        <span>Private</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3 h-3 text-[#FFD400]" />
                        <span>Shared with DUX</span>
                      </>
                    )}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wide mb-1">
                  "{entry.question}"
                </h4>
                <p className="text-xs text-[#777777] leading-relaxed">
                  {entry.answer}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
