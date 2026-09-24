import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FBF9F5] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#111111] text-[#FFD400] flex items-center justify-center mb-6">
        <Compass className="w-8 h-8" />
      </div>
      <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#777777] mb-2">
        ERROR 404 · OFF COURSE
      </span>
      <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#111111] mb-3">
        THIS PATH DOES NOT EXIST.
      </h1>
      <p className="text-xs sm:text-sm text-[#777777] max-w-sm mb-8 leading-relaxed">
        Even wrong turns reveal where you actually wanted to go. Let's return to your main compass.
      </p>
      <Link
        to="/dashboard"
        className="px-8 py-3.5 bg-[#111111] text-white hover:bg-black font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md inline-flex items-center gap-2"
      >
        <span>RETURN TO DASHBOARD</span>
        <ArrowRight className="w-4 h-4 text-[#FFD400]" />
      </Link>
    </div>
  );
};
