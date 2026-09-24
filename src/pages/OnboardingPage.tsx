import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Compass, ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const OnboardingPage: React.FC = () => {
  const { user, completeOnboarding } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  // Step 1: What brings you to DUX?
  const [intentions, setIntentions] = useState<string[]>(['Discover myself', 'Build something']);
  // Step 2: How would you describe yourself?
  const [archetype, setArchetype] = useState<string>('Builder');
  // Step 3: What do you want to work on?
  const [focusAreas, setFocusAreas] = useState<string[]>(['Confidence', 'Personal Growth']);

  const step1Options = [
    'Discover myself',
    'Build something',
    'Meet people',
    'Learn',
    'Grow',
    'Find inspiration'
  ];

  const step2Options = [
    { title: 'Builder', desc: 'Energized by shipping tangible things and relentless execution.' },
    { title: 'Creator', desc: 'Energized by original ideas, aesthetic craft, and vision.' },
    { title: 'Connector', desc: 'Energized by human synergy, teams, and high emotional resonance.' },
    { title: 'Evolver', desc: 'Energized by systems, feedback loops, and continuous mastery.' }
  ];

  const step3Options = [
    'Confidence',
    'Leadership',
    'Creativity',
    'Career',
    'Learning',
    'Personal Growth'
  ];

  const toggleIntention = (opt: string) => {
    setIntentions((prev) =>
      prev.includes(opt) ? prev.filter((i) => i !== opt) : [...prev, opt]
    );
  };

  const toggleFocus = (opt: string) => {
    setFocusAreas((prev) =>
      prev.includes(opt) ? prev.filter((i) => i !== opt) : [...prev, opt]
    );
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Final Step: Complete and navigate to /dashboard
      completeOnboarding({
        intentions,
        archetype,
        focusAreas
      });
      try {
        confetti({ particleCount: 90, spread: 60, origin: { y: 0.6 } });
      } catch (e) { /* ignore */ }
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] flex flex-col justify-between py-10 px-4 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="max-w-2xl w-full mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#111111] flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
              <polygon points="12,3 15.5,12 12,10 8.5,12" fill="#FFD400" />
              <polygon points="12,21 15.5,12 12,10 8.5,12" fill="#FFFFFF" />
            </svg>
          </div>
          <span className="font-black text-xl tracking-tight text-[#111111]">DUX</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#777777] uppercase">STEP {step} OF 3</span>
          <div className="flex gap-1.5">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-6 h-1.5 rounded-full transition-all duration-300 ${
                  s === step
                    ? 'bg-[#111111]'
                    : s < step
                    ? 'bg-[#FFD400]'
                    : 'bg-[#E5E0D5]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-2xl w-full mx-auto my-auto py-8">
        <div className="bg-white border border-[#E5E0D5] rounded-3xl p-6 sm:p-10 shadow-sm">
          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <span className="font-mono text-xs font-bold text-[#777777] uppercase tracking-widest">
                STAGE 1 / INTENT
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#111111] mt-1 mb-2">
                WHAT BRINGS YOU TO DUX?
              </h2>
              <p className="text-xs text-[#777777] mb-8">
                Select everything that applies. We tailor your dashboard to your primary drivers.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {step1Options.map((opt) => {
                  const selected = intentions.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleIntention(opt)}
                      className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        selected
                          ? 'border-[#111111] bg-[#111111] text-white shadow-sm'
                          : 'border-[#E5E0D5] bg-[#FBF9F5] text-[#111111] hover:border-[#111111]'
                      }`}
                    >
                      <span className="text-xs font-bold uppercase tracking-wider">{opt}</span>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
                          selected
                            ? 'bg-[#FFD400] border-[#FFD400] text-[#111111]'
                            : 'border-[#E5E0D5]'
                        }`}
                      >
                        {selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              <span className="font-mono text-xs font-bold text-[#777777] uppercase tracking-widest">
                STAGE 2 / ARCHETYPE INSTINCT
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#111111] mt-1 mb-2">
                HOW WOULD YOU DESCRIBE YOURSELF?
              </h2>
              <p className="text-xs text-[#777777] mb-8">
                Choose the natural state where you do your most energized work.
              </p>

              <div className="grid grid-cols-1 gap-3 mb-8">
                {step2Options.map((opt) => {
                  const selected = archetype === opt.title;
                  return (
                    <button
                      key={opt.title}
                      type="button"
                      onClick={() => setArchetype(opt.title)}
                      className={`flex items-start justify-between p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        selected
                          ? 'border-[#111111] bg-[#111111] text-white shadow-sm'
                          : 'border-[#E5E0D5] bg-[#FBF9F5] text-[#111111] hover:border-[#111111]'
                      }`}
                    >
                      <div>
                        <h4 className="text-xs font-extrabold uppercase tracking-wider">
                          {opt.title}
                        </h4>
                        <p
                          className={`text-xs mt-1 ${
                            selected ? 'text-neutral-300' : 'text-[#777777]'
                          }`}
                        >
                          {opt.desc}
                        </p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center border shrink-0 mt-0.5 transition-colors ${
                          selected
                            ? 'bg-[#FFD400] border-[#FFD400] text-[#111111]'
                            : 'border-[#E5E0D5]'
                        }`}
                      >
                        {selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div>
              <span className="font-mono text-xs font-bold text-[#777777] uppercase tracking-widest">
                STAGE 3 / GROWTH HORIZON
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#111111] mt-1 mb-2">
                WHAT DO YOU WANT TO WORK ON?
              </h2>
              <p className="text-xs text-[#777777] mb-8">
                Select your primary growth domains. We will queue up relevant challenges and stories.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {step3Options.map((opt) => {
                  const selected = focusAreas.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleFocus(opt)}
                      className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        selected
                          ? 'border-[#111111] bg-[#111111] text-white shadow-sm'
                          : 'border-[#E5E0D5] bg-[#FBF9F5] text-[#111111] hover:border-[#111111]'
                      }`}
                    >
                      <span className="text-xs font-bold uppercase tracking-wider">{opt}</span>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
                          selected
                            ? 'bg-[#FFD400] border-[#FFD400] text-[#111111]'
                            : 'border-[#E5E0D5]'
                        }`}
                      >
                        {selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-[#E5E0D5]">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-2 px-5 py-2.5 border border-[#E5E0D5] hover:border-[#111111] text-[#111111] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>BACK</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 px-7 py-3 bg-[#111111] text-white hover:bg-black text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer"
            >
              <span>{step === 3 ? 'START MY JOURNEY' : 'NEXT'}</span>
              <ArrowRight className="w-4 h-4 text-[#FFD400]" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl w-full mx-auto text-center text-xs text-[#777777]">
        DUX PLATFORM · CALIBRATING PERSONAL TRAJECTORY
      </div>
    </div>
  );
};
