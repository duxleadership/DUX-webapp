import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Compass,
  ArrowRight,
  Target,
  Sparkles,
  Users,
  TrendingUp,
  Award,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { DIRECTION_ARCHETYPES } from '../data/mockData';

export const LandingPage: React.FC = () => {
  const { user } = useApp();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#111111] selection:bg-[#FFD400] selection:text-[#111111] flex flex-col">
      {/* Top Bar / Nav */}
      <header className="border-b border-[#E5E0D5] bg-[#FBF9F5]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#111111] flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                <polygon points="12,3 15.5,12 12,10 8.5,12" fill="#FFD400" />
                <polygon points="12,21 15.5,12 12,10 8.5,12" fill="#FFFFFF" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tighter text-[#111111] leading-none">
                DUX
              </span>
              <span className="text-[9px] font-mono tracking-widest text-[#777777] uppercase">
                WHERE DIRECTION BEGINS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111111] text-white hover:bg-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm"
              >
                <span>OPEN DASHBOARD</span>
                <ArrowRight className="w-4 h-4 text-[#FFD400]" />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-xs font-bold uppercase tracking-wider text-[#111111] hover:text-[#777777] transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2.5 bg-[#111111] text-white hover:bg-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm"
                >
                  START JOURNEY
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-32 px-4 sm:px-6 lg:px-8 border-b border-[#E5E0D5]">
        {/* Subtle geometric lines */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[#E5E0D5]/60" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[#E5E0D5]/60" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5F1E8] border border-[#E5E0D5] rounded-md text-[11px] font-mono uppercase tracking-widest text-[#111111] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FFD400]" />
            <span>A MODERN PLATFORM FOR INTENTIONAL LIVING</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#111111] uppercase leading-[0.95] mb-6">
            WHERE DIRECTION <br />
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#111111] via-[#111111] to-[#333333]">
              BEGINS.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[#777777] max-w-2xl mx-auto leading-relaxed mb-10">
            Everyone has a direction. DUX helps you discover it through science-backed archetypes, daily actionable habits, curated challenges, and a community of doers.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link
              to={user ? "/dashboard" : "/signup"}
              className="w-full sm:w-auto px-8 py-4 bg-[#111111] text-white hover:bg-black font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>START YOUR JOURNEY</span>
              <ArrowRight className="w-4 h-4 text-[#FFD400] transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-4 bg-white border border-[#111111] text-[#111111] hover:bg-[#F5F1E8] font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>EXPLORE DUX</span>
            </Link>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 pt-12 border-t border-[#E5E0D5] text-left">
            <div>
              <p className="font-mono text-2xl sm:text-3xl font-black text-[#111111]">4</p>
              <p className="text-xs text-[#777777] uppercase tracking-wider font-semibold mt-0.5">Core Archetypes</p>
            </div>
            <div>
              <p className="font-mono text-2xl sm:text-3xl font-black text-[#111111]">7-Day</p>
              <p className="text-xs text-[#777777] uppercase tracking-wider font-semibold mt-0.5">Action Sprints</p>
            </div>
            <div>
              <p className="font-mono text-2xl sm:text-3xl font-black text-[#111111]">Daily</p>
              <p className="text-xs text-[#777777] uppercase tracking-wider font-semibold mt-0.5">Micro-Reflections</p>
            </div>
            <div>
              <p className="font-mono text-2xl sm:text-3xl font-black text-[#111111]">100%</p>
              <p className="text-xs text-[#777777] uppercase tracking-wider font-semibold mt-0.5">Momentum Driven</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Archetypes Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E5E0D5] bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#777777]">
              THE DUX TAXONOMY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#111111] mt-2">
              FOUR PATHS. ONE COMPASS.
            </h2>
            <p className="text-sm text-[#777777] mt-3">
              Direction is not one-size-fits-all. Find which instinct powers your highest state of flow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.values(DIRECTION_ARCHETYPES).map((arch) => (
              <div
                key={arch.type}
                className="p-6 bg-[#FBF9F5] border border-[#E5E0D5] rounded-2xl flex flex-col justify-between hover:border-[#111111] transition-all group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#111111] text-[#FFD400] flex items-center justify-center font-black text-sm mb-4">
                    {arch.type.split(' ')[1]?.[0] || 'D'}
                  </div>
                  <h3 className="font-black text-base tracking-wider uppercase text-[#111111]">
                    {arch.type}
                  </h3>
                  <p className="text-xs font-mono font-bold text-[#777777] uppercase tracking-widest mt-0.5 mb-3">
                    {arch.virtue}
                  </p>
                  <p className="text-xs italic text-[#111111] font-medium border-l-2 border-[#FFD400] pl-3 py-0.5 mb-4">
                    "{arch.quote}"
                  </p>
                  <p className="text-xs text-[#777777] leading-relaxed">
                    {arch.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E5E0D5]">
                  <Link
                    to="/direction"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#111111] group-hover:text-black"
                  >
                    <span>Test Your Fit</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The 5-Step Ecosystem */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E5E0D5] bg-[#FBF9F5]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#777777]">
                THE SYSTEM
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#111111] mt-2 mb-6">
                DISCOVER → CREATE → CONNECT → GROW
              </h2>
              <p className="text-sm text-[#777777] leading-relaxed mb-6">
                DUX is not a passive reading app. Every element is engineered around deliberate progressive exposure: answering high-signal prompts, taking 7-day micro-challenges, and building publicly with other creators.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-[#111111] text-[#FFD400] flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase text-[#111111]">Direction Compass</h4>
                    <p className="text-xs text-[#777777]">Calibrate your intrinsic archetype through 8 situational questions.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-[#111111] text-[#FFD400] flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase text-[#111111]">Daily DUX Habit</h4>
                    <p className="text-xs text-[#777777]">One thoughtful daily inquiry to maintain clarity and log your personal evolution.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-[#111111] text-[#FFD400] flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase text-[#111111]">Action Sprints & Lab</h4>
                    <p className="text-xs text-[#777777]">Turn paralysis into proof by shipping small projects in the DUX Lab.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-[#111111] text-[#FFD400] flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase text-[#111111]">Earned Badges & Store Gear</h4>
                    <p className="text-xs text-[#777777]">Compound points into real perks, digital badges, and high-craft apparel.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  to="/map"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#111111] text-white hover:bg-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  <span>Explore The Full DUX Map</span>
                  <ArrowRight className="w-4 h-4 text-[#FFD400]" />
                </Link>
              </div>
            </div>

            {/* Interactive Preview Card */}
            <div className="p-8 bg-white border border-[#E5E0D5] rounded-3xl shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D5]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#111111] text-[#FFD400] flex items-center justify-center">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-[#777777] uppercase">Interactive Preview</p>
                    <h3 className="text-sm font-bold uppercase text-[#111111]">TODAY'S DIRECTION CARD</h3>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold bg-[#FFD400] text-[#111111] px-2.5 py-1 rounded-md">
                  ACTIVE
                </span>
              </div>

              <div className="my-6 space-y-4">
                <div className="p-4 bg-[#FBF9F5] border border-[#E5E0D5] rounded-xl">
                  <p className="text-[11px] font-mono text-[#777777] uppercase">Current Step</p>
                  <p className="text-base font-bold text-[#111111] mt-1">
                    "Take 10 minutes to work on something you've been postponing."
                  </p>
                  <div className="flex items-center gap-2 mt-3 text-xs text-[#777777]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Estimated time: 10 mins · Reward: +25 Points</span>
                  </div>
                </div>

                <div className="p-4 bg-[#FBF9F5] border border-[#E5E0D5] rounded-xl">
                  <p className="text-[11px] font-mono text-[#777777] uppercase">Daily Prompt</p>
                  <p className="text-sm font-medium text-[#111111] mt-1">
                    What is one thing you want to become better at this month?
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Link
                  to="/challenges/7-day-direction"
                  className="flex-1 py-3 bg-[#111111] text-white hover:bg-black font-bold text-xs uppercase tracking-wider rounded-xl text-center transition-colors"
                >
                  Start Challenge
                </Link>
                <Link
                  to="/daily"
                  className="px-5 py-3 border border-[#111111] text-[#111111] hover:bg-[#F5F1E8] font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
                >
                  Answer Daily
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 33: FINAL DUX EXPERIENCE */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#111111] text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-8">
            <Compass className="w-8 h-8 text-[#FFD400]" />
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-none mb-6">
            WHERE ARE YOU HEADED?
          </h2>

          <p className="text-lg sm:text-xl text-neutral-400 max-w-xl mx-auto mb-10 leading-relaxed font-light">
            You don't need the entire map. <br />
            <span className="text-white font-semibold">You just need the next step.</span>
          </p>

          <Link
            to={user ? "/dashboard" : "/signup"}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#FFD400] text-[#111111] hover:bg-[#eec600] font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl cursor-pointer"
          >
            <span>START YOUR DUX JOURNEY</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Rich Footer */}
      <footer className="bg-white border-t border-[#E5E0D5] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-[#E5E0D5]">
            <div className="col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-lg bg-[#111111] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-[#FFD400] rotate-45" />
                </div>
                <span className="font-black text-xl tracking-tight text-[#111111]">DUX</span>
              </div>
              <p className="font-mono text-xs uppercase tracking-widest text-[#777777] font-semibold mb-3">
                WHERE DIRECTION BEGINS.
              </p>
              <p className="text-xs text-[#777777] max-w-sm leading-relaxed">
                A digital ecosystem for self-discovery, leadership, creativity, community challenges, and finding direction in life and career.
              </p>
            </div>

            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#111111] mb-3">
                EXPLORE
              </h4>
              <ul className="space-y-2 text-xs text-[#777777]">
                <li><Link to="/direction" className="hover:text-[#111111] transition-colors">Direction Quiz</Link></li>
                <li><Link to="/challenges" className="hover:text-[#111111] transition-colors">Challenges</Link></li>
                <li><Link to="/daily" className="hover:text-[#111111] transition-colors">Daily DUX</Link></li>
                <li><Link to="/map" className="hover:text-[#111111] transition-colors">Journey Map</Link></li>
                <li><Link to="/achievements" className="hover:text-[#111111] transition-colors">Achievements</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#111111] mb-3">
                PLATFORM
              </h4>
              <ul className="space-y-2 text-xs text-[#777777]">
                <li><Link to="/stories" className="hover:text-[#111111] transition-colors">Stories</Link></li>
                <li><Link to="/community" className="hover:text-[#111111] transition-colors">Community</Link></li>
                <li><Link to="/lab" className="hover:text-[#111111] transition-colors">DUX Lab</Link></li>
                <li><Link to="/store" className="hover:text-[#111111] transition-colors">Store</Link></li>
                <li><Link to="/events" className="hover:text-[#111111] transition-colors">Events</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#111111] mb-3">
                LEGAL & TERMS
              </h4>
              <ul className="space-y-2 text-xs text-[#777777]">
                <li><Link to="/settings" className="hover:text-[#111111] transition-colors">Privacy</Link></li>
                <li><Link to="/settings" className="hover:text-[#111111] transition-colors">Terms of Service</Link></li>
                <li><Link to="/settings" className="hover:text-[#111111] transition-colors">Security</Link></li>
                <li><Link to="/admin" className="hover:text-[#111111] transition-colors">Admin Console</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#777777]">
            <p>© {new Date().getFullYear()} DUX Platform. All rights reserved.</p>
            <p className="mt-2 sm:mt-0 font-mono text-[11px]">EVERYONE HAS A DIRECTION. DUX HELPS YOU DISCOVER IT.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
