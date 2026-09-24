import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { QUIZ_QUESTIONS, DIRECTION_ARCHETYPES } from '../data/mockData';
import { DirectionType } from '../types';
import { Compass, ArrowRight, ArrowLeft, RotateCcw, Check, Sparkles, Award } from 'lucide-react';
import { ProgressBar } from '../components/ui/CommonUI';

export const DirectionQuizPage: React.FC = () => {
  const { user, saveDirectionResult } = useApp();
  const navigate = useNavigate();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, DirectionType>>({});
  const [showingResult, setShowingResult] = useState<DirectionType | null>(() => {
    // If user already has a direction and wants to see result, start with it
    return user?.direction || null;
  });
  const [isRetaking, setIsRetaking] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const currentAnswer = selectedAnswers[currentQ?.id];

  const handleSelectOption = (archetype: DirectionType) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: archetype
    }));
  };

  const handleNext = () => {
    if (!currentAnswer) return;

    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Calculate dominant archetype
      const tally: Record<string, number> = {
        'THE BUILDER': 0,
        'THE CREATOR': 0,
        'THE CONNECTOR': 0,
        'THE EVOLVER': 0
      };

      Object.values(selectedAnswers).forEach((arch) => {
        tally[arch] = (tally[arch] || 0) + 1;
      });

      // Find top archetype
      let topArch: DirectionType = 'THE BUILDER';
      let maxCount = -1;
      (Object.keys(tally) as DirectionType[]).forEach((arch) => {
        if (tally[arch] > maxCount) {
          maxCount = tally[arch];
          topArch = arch;
        }
      });

      // Save connected result
      saveDirectionResult(topArch);
      setShowingResult(topArch);
      setIsRetaking(false);
    }
  };

  const handleBack = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setShowingResult(null);
    setIsRetaking(true);
  };

  // If showing result view
  if (showingResult && !isRetaking) {
    const details = DIRECTION_ARCHETYPES[showingResult];

    return (
      <div className="max-w-3xl mx-auto py-6 space-y-8 animate-in fade-in duration-200">
        <div className="text-center">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#777777]">
            COMPASS CALIBRATED · RESULT
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#111111] mt-2 mb-2">
            YOUR DIRECTION
          </h1>
          <p className="text-xs font-mono uppercase tracking-widest text-[#777777]">
            DISCOVERED · RECORDED TO YOUR DUX PASSPORT
          </p>
        </div>

        {/* Hero Result Card */}
        <div className="bg-[#111111] text-white border border-neutral-800 rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-neutral-800">
            <div>
              <span className="font-mono text-xs font-bold text-[#FFD400] uppercase tracking-widest block mb-2">
                CORE ARCHETYPE
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-2">
                {details.type}
              </h2>
              <div className="inline-block px-3 py-1 bg-white/10 rounded-md font-mono text-xs uppercase tracking-widest text-[#FFD400] font-bold">
                VIRTUE: {details.virtue}
              </div>
            </div>

            <div className="w-20 h-20 rounded-2xl bg-[#FFD400] text-[#111111] flex items-center justify-center font-black text-3xl shrink-0 shadow-lg">
              <Compass className="w-10 h-10 stroke-[2.5]" />
            </div>
          </div>

          <div className="relative z-10 py-8 border-b border-neutral-800">
            <blockquote className="text-xl sm:text-2xl font-bold italic text-white leading-relaxed mb-4">
              "{details.quote}"
            </blockquote>
            <p className="text-sm text-neutral-300 leading-relaxed max-w-2xl font-normal">
              {details.description}
            </p>
          </div>

          <div className="relative z-10 pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#FFD400] mb-3">
                PRIMARY STRENGTHS
              </h4>
              <ul className="space-y-2 text-xs text-neutral-300">
                {details.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#FFD400] shrink-0 mt-0.5" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#FFD400] mb-3">
                CRITICAL GROWTH AREA
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10">
                {details.growthArea}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="relative z-10 mt-10 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handleRetake}
              className="text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-white flex items-center gap-2 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>

            <button
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto px-8 py-4 bg-[#FFD400] text-[#111111] hover:bg-[#eec600] font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>CONTINUE TO DASHBOARD</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active Quiz View
  return (
    <div className="max-w-2xl mx-auto py-6 space-y-6">
      <div className="text-center">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#777777]">
          THE DUX COMPASS
        </span>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#111111] mt-1 mb-2">
          FIND YOUR DIRECTION
        </h1>
        <p className="text-xs text-[#777777] max-w-md mx-auto">
          Answer instinctively. There are no wrong directions—only clarity waiting to be claimed.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="bg-white border border-[#E5E0D5] rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex justify-between items-center text-xs font-mono mb-2">
          <span className="font-bold text-[#111111]">
            QUESTION {currentIdx + 1} OF {totalQuestions}
          </span>
          <span className="text-[#777777]">
            {Math.round(((currentIdx + 1) / totalQuestions) * 100)}%
          </span>
        </div>
        <ProgressBar
          value={currentIdx + 1}
          max={totalQuestions}
          color="bg-[#111111]"
        />
      </div>

      {/* Question Card */}
      <div className="bg-white border border-[#E5E0D5] rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#111111] leading-snug">
            {currentQ.question}
          </h2>
          <p className="text-xs text-[#777777] mt-1.5 font-medium">
            {currentQ.subtitle}
          </p>
        </div>

        {/* 4 Answers */}
        <div className="space-y-3 mb-8">
          {currentQ.options.map((opt, i) => {
            const isSelected = currentAnswer === opt.archetype;
            const letter = ['A', 'B', 'C', 'D'][i];

            return (
              <button
                key={opt.label}
                type="button"
                onClick={() => handleSelectOption(opt.archetype)}
                className={`w-full flex items-start gap-4 p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#111111] bg-[#111111] text-white shadow-md'
                    : 'border-[#E5E0D5] bg-[#FBF9F5] text-[#111111] hover:border-[#111111] hover:bg-white'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 transition-colors ${
                    isSelected
                      ? 'bg-[#FFD400] text-[#111111]'
                      : 'bg-white border border-[#E5E0D5] text-[#777777]'
                  }`}
                >
                  {letter}
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold uppercase tracking-wide leading-snug">
                    {opt.label}
                  </h4>
                  <p
                    className={`text-xs mt-1 leading-relaxed ${
                      isSelected ? 'text-neutral-300' : 'text-[#777777]'
                    }`}
                  >
                    {opt.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-[#E5E0D5]">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentIdx === 0}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              currentIdx === 0
                ? 'opacity-40 cursor-not-allowed border-[#E5E0D5] text-[#777777]'
                : 'border-[#E5E0D5] hover:border-[#111111] text-[#111111]'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={!currentAnswer}
            className={`flex items-center gap-2 px-7 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer ${
              !currentAnswer
                ? 'opacity-50 cursor-not-allowed bg-[#E5E0D5] text-[#777777]'
                : 'bg-[#111111] text-white hover:bg-black shadow-md'
            }`}
          >
            <span>
              {currentIdx === totalQuestions - 1
                ? 'DISCOVER MY DIRECTION'
                : 'NEXT'}
            </span>
            <ArrowRight className="w-4 h-4 text-[#FFD400]" />
          </button>
        </div>
      </div>
    </div>
  );
};
