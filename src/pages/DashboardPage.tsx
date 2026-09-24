import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Compass,
  ArrowRight,
  Target,
  Sparkles,
  CheckCircle2,
  Calendar,
  Flame,
  Award,
  ChevronRight,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { ProgressBar } from '../components/ui/CommonUI';

export const DashboardPage: React.FC = () => {
  const { user, challenges, startChallenge, mapStages } = useApp();
  const navigate = useNavigate();

  const firstName = user?.name ? user.name.split(' ')[0].toUpperCase() : 'EXPLORER';

  // Active challenge
  const activeChallenge = challenges.find((c) => c.id === '7-day-direction') || challenges[0];
  const activeDay = activeChallenge.days.find((d) => !d.completed) || activeChallenge.days[0];

  // Discover stage status
  const discoverStage = mapStages.find((s) => s.id === 'discover');
  const createStage = mapStages.find((s) => s.id === 'create');
  const connectStage = mapStages.find((s) => s.id === 'connect');
  const growStage = mapStages.find((s) => s.id === 'grow');

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#777777] mb-1 font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#FFD400]" />
          <span>DUX COMMAND CENTER</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#111111]">
          GOOD MORNING, {firstName}.
        </h1>
        <p className="text-sm text-[#777777] font-medium mt-1">
          What direction are you taking today?
        </p>
      </div>

      {/* Main 5-Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* CARD 1 — FIND YOUR DIRECTION */}
        <div className="p-6 bg-white border border-[#E5E0D5] rounded-2xl flex flex-col justify-between hover:border-[#111111] transition-all group shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#777777]">
                CARD 01 · DIRECTION QUIZ
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#111111] text-[#FFD400] flex items-center justify-center">
                <Compass className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight text-[#111111] mb-2">
              FIND YOUR DIRECTION
            </h3>
            <p className="text-xs text-[#777777] leading-relaxed mb-4">
              Discover your core DUX archetype—Builder, Creator, Connector, or Evolver—through 8 situational reflections.
            </p>
            {user?.direction && (
              <div className="p-3 bg-[#FBF9F5] border border-[#E5E0D5] rounded-xl text-xs mb-4">
                <span className="text-[#777777] block text-[10px] font-mono uppercase">Current Archetype:</span>
                <span className="font-black text-[#111111]">{user.direction}</span>
              </div>
            )}
          </div>
          <div>
            <Link
              to="/direction"
              className="w-full py-2.5 bg-[#111111] text-white hover:bg-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 group-hover:shadow-sm"
            >
              <span>{user?.direction ? 'RETAKE THE QUIZ →' : 'TAKE THE QUIZ →'}</span>
            </Link>
          </div>
        </div>

        {/* CARD 2 — TODAY'S CHALLENGE */}
        <div className="p-6 bg-white border border-[#E5E0D5] rounded-2xl flex flex-col justify-between hover:border-[#111111] transition-all group shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#777777]">
                CARD 02 · DAILY ACTION
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#FFD400] text-[#111111] flex items-center justify-center font-mono font-bold text-xs">
                D{activeChallenge.currentDay}
              </div>
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight text-[#111111] mb-1">
              TODAY'S CHALLENGE
            </h3>
            <p className="text-[11px] font-mono text-[#777777] uppercase tracking-wide mb-3">
              {activeChallenge.title} · DAY {activeDay?.day || 1}
            </p>
            <div className="p-3.5 bg-[#FBF9F5] border border-[#E5E0D5] rounded-xl mb-4">
              <p className="text-xs font-bold text-[#111111]">
                "{activeDay?.task || "Take 10 minutes to work on something you've been postponing."}"
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to={`/challenges/${activeChallenge.id}`}
              className="flex-1 py-2.5 bg-[#111111] text-white hover:bg-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5"
            >
              <span>START CHALLENGE</span>
            </Link>
            <Link
              to="/challenges"
              className="px-4 py-2.5 border border-[#E5E0D5] text-[#111111] hover:bg-[#F5F1E8] font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
            >
              VIEW ALL
            </Link>
          </div>
        </div>

        {/* CARD 3 — DAILY QUESTION */}
        <div className="p-6 bg-white border border-[#E5E0D5] rounded-2xl flex flex-col justify-between hover:border-[#111111] transition-all group shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#777777]">
                CARD 03 · REFLECTIVE PROMPT
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#111111] text-white flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#FFD400]" />
              </div>
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight text-[#111111] mb-2">
              DAILY QUESTION
            </h3>
            <p className="text-xs text-[#777777] mb-3">
              One question. One thought. One step forward.
            </p>
            <div className="p-3.5 bg-[#FBF9F5] border border-[#E5E0D5] rounded-xl mb-4">
              <p className="text-xs font-semibold text-[#111111] italic">
                "What is one thing you want to become better at this month?"
              </p>
            </div>
          </div>
          <div>
            <Link
              to="/daily"
              className="w-full py-2.5 bg-[#111111] text-white hover:bg-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <span>ANSWER →</span>
            </Link>
          </div>
        </div>

        {/* CARD 4 — YOUR PROGRESS */}
        <div className="p-6 bg-white border border-[#E5E0D5] rounded-2xl flex flex-col justify-between hover:border-[#111111] transition-all group shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#777777]">
                CARD 04 · MILESTONES
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#111111] text-white flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-[#FFD400]" />
              </div>
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight text-[#111111] mb-1">
              YOUR PROGRESS
            </h3>
            <p className="text-[11px] font-mono text-[#777777] uppercase tracking-wide mb-4">
              DUX JOURNEY METRICS
            </p>

            <div className="space-y-2.5 font-mono text-xs mb-4">
              <div className="flex items-center justify-between p-2 bg-[#FBF9F5] rounded-lg">
                <span className="text-[#111111] font-bold">DISCOVER</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  ✓ COMPLETED
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-[#FBF9F5] rounded-lg">
                <span className="text-[#111111] font-bold">CREATE</span>
                <span className="text-[#111111] font-bold">{createStage?.progress || 40}%</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-[#FBF9F5] rounded-lg">
                <span className="text-[#111111] font-bold">CONNECT</span>
                <span className="text-[#111111] font-bold">{connectStage?.progress || 20}%</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-[#FBF9F5] rounded-lg">
                <span className="text-[#111111] font-bold">GROW</span>
                <span className="text-[#111111] font-bold">{growStage?.progress || 10}%</span>
              </div>
            </div>
          </div>

          <div>
            <Link
              to="/map"
              className="w-full py-2.5 border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <span>VIEW MY MAP →</span>
            </Link>
          </div>
        </div>

        {/* CARD 5 — YOUR DIRECTION */}
        <div className="p-6 bg-[#111111] text-white rounded-2xl flex flex-col justify-between shadow-md md:col-span-2 lg:col-span-2">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#FFD400]">
                CARD 05 · CORE ORIENTATION
              </span>
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Compass className="w-4 h-4 text-[#FFD400]" />
              </div>
            </div>

            {user?.direction ? (
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                  {user.direction}
                </h3>
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#FFD400]">
                  {user.directionVirtue || 'DETERMINATION'}
                </p>
                <p className="text-sm text-neutral-300 italic border-l-2 border-[#FFD400] pl-3 py-1">
                  "{user.directionMantra || 'You turn ideas into action.'}"
                </p>
                <p className="text-xs text-neutral-400 max-w-xl leading-relaxed">
                  Your direction guides your challenges, story recommendations, and community focus. Stay anchored to your innate strength.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <h3 className="text-xl font-black uppercase text-white">
                  DIRECTION NOT DISCOVERED YET
                </h3>
                <p className="text-xs text-neutral-400">
                  Take the 8-question Direction Quiz to uncover your archetype and calibrate your personalized compass.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between">
            <span className="text-xs text-neutral-400 font-mono">
              {user?.points} DUX POINTS
            </span>
            <Link
              to="/direction"
              className="px-6 py-2.5 bg-[#FFD400] text-[#111111] hover:bg-[#eec600] font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5"
            >
              <span>{user?.direction ? 'VIEW RESULT →' : 'DISCOVER IT →'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Visual Journey Overview Banner */}
      <div className="p-6 sm:p-8 bg-white border border-[#E5E0D5] rounded-3xl shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#E5E0D5]">
          <div>
            <h2 className="text-lg font-black uppercase tracking-tight text-[#111111]">
              YOUR DUX JOURNEY
            </h2>
            <p className="font-mono text-xs uppercase tracking-wider text-[#777777] mt-0.5">
              DISCOVER → CREATE → CONNECT → GROW
            </p>
          </div>
          <Link
            to="/map"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111] hover:underline"
          >
            <span>Open Interactive Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 Stage Pills & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-[#FBF9F5] border border-[#111111] rounded-2xl relative">
            <div className="flex justify-between items-center mb-2">
              <span className="font-mono text-[10px] font-bold text-[#777777]">STAGE 01</span>
              <span className="w-5 h-5 rounded-full bg-[#111111] text-[#FFD400] flex items-center justify-center text-[10px] font-bold">
                ✓
              </span>
            </div>
            <h4 className="font-extrabold text-sm uppercase text-[#111111]">DISCOVER</h4>
            <p className="text-[11px] text-[#777777] mt-1">Compass calibrated</p>
          </div>

          <div className="p-4 bg-[#FBF9F5] border border-[#E5E0D5] rounded-2xl">
            <div className="flex justify-between items-center mb-2">
              <span className="font-mono text-[10px] font-bold text-[#777777]">STAGE 02</span>
              <span className="font-mono text-[10px] font-bold text-[#111111]">{createStage?.progress || 40}%</span>
            </div>
            <h4 className="font-extrabold text-sm uppercase text-[#111111]">CREATE</h4>
            <p className="text-[11px] text-[#777777] mt-1">7-Day Challenge in progress</p>
          </div>

          <div className="p-4 bg-[#FBF9F5] border border-[#E5E0D5] rounded-2xl">
            <div className="flex justify-between items-center mb-2">
              <span className="font-mono text-[10px] font-bold text-[#777777]">STAGE 03</span>
              <span className="font-mono text-[10px] font-bold text-[#111111]">{connectStage?.progress || 20}%</span>
            </div>
            <h4 className="font-extrabold text-sm uppercase text-[#111111]">CONNECT</h4>
            <p className="text-[11px] text-[#777777] mt-1">Community & meetups</p>
          </div>

          <div className="p-4 bg-[#FBF9F5] border border-[#E5E0D5] rounded-2xl">
            <div className="flex justify-between items-center mb-2">
              <span className="font-mono text-[10px] font-bold text-[#777777]">STAGE 04</span>
              <span className="font-mono text-[10px] font-bold text-[#111111]">{growStage?.progress || 10}%</span>
            </div>
            <h4 className="font-extrabold text-sm uppercase text-[#111111]">GROW</h4>
            <p className="text-[11px] text-[#777777] mt-1">Daily habits & compounding</p>
          </div>
        </div>
      </div>
    </div>
  );
};
