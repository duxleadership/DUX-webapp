import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Calendar, MapPin, Clock, Users, ArrowRight, Check } from 'lucide-react';

export const EventsPage: React.FC = () => {
  const { events, toggleRsvpEvent } = useApp();

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#777777] mb-1 font-semibold">
          <Calendar className="w-3.5 h-3.5 text-[#FFD400]" />
          <span>GATHERINGS & SPRINTS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#111111]">
          DUX EVENTS
        </h1>
        <p className="text-sm text-[#777777] font-medium mt-1">
          High-trust spaces for live dialogue, sprint reviews, and connecting with fellow builders.
        </p>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="p-6 sm:p-8 bg-white border border-[#E5E0D5] rounded-3xl flex flex-col justify-between hover:border-[#111111] transition-all shadow-xs group"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-[#777777] mb-3">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#111111] bg-[#F5F1E8] px-2.5 py-0.5 rounded-md">
                  {evt.category}
                </span>

                {evt.isRsvpd && (
                  <span className="font-mono text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    ✓ YOU'RE GOING
                  </span>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#111111] mb-3 leading-snug">
                {evt.title}
              </h3>

              <div className="space-y-1.5 text-xs text-[#777777] mb-4 font-mono">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#111111]" />
                  <span>{evt.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#111111]" />
                  <span>{evt.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#111111]" />
                  <span className="truncate">{evt.location}</span>
                </div>
              </div>

              <p className="text-xs text-[#777777] leading-relaxed mb-6">
                {evt.description}
              </p>
            </div>

            <div className="pt-4 border-t border-[#F5F1E8] flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#777777]">
                <Users className="w-3.5 h-3.5" />
                <span>{evt.attendeesCount} Attending</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleRsvpEvent(evt.id)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                    evt.isRsvpd
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                      : 'border border-[#111111] text-[#111111] hover:bg-[#F5F1E8]'
                  }`}
                >
                  {evt.isRsvpd ? "✓ Going" : "RSVP (+100 PTS)"}
                </button>

                <Link
                  to={`/events/${evt.id}`}
                  className="px-4 py-2 bg-[#111111] text-white hover:bg-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xs flex items-center gap-1.5"
                >
                  <span>VIEW EVENT</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#FFD400]" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
