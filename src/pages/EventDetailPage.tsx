import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowLeft,
  Check,
  Share2,
  ShieldCheck
} from 'lucide-react';

export const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { events, toggleRsvpEvent, showToast } = useApp();

  const event = events.find((e) => e.id === id) || events[0];

  if (!event) {
    return (
      <div className="text-center py-20">
        <p>Event not found.</p>
        <Link to="/events" className="text-xs uppercase font-bold text-[#111111] underline mt-4 block">
          Back to Events
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    showToast({
      type: 'info',
      title: 'Link Copied',
      message: 'Event invite link copied to clipboard.'
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#777777] hover:text-[#111111] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO EVENTS</span>
        </Link>

        <button
          onClick={handleShare}
          className="p-2 border border-[#E5E0D5] bg-white rounded-xl text-[#777777] hover:text-[#111111] hover:border-[#111111] transition-colors cursor-pointer"
          title="Share Event"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Main Event Card */}
      <div className="bg-white border border-[#E5E0D5] rounded-3xl p-6 sm:p-12 shadow-sm space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#111111] bg-[#F5F1E8] px-3 py-1 rounded-md">
              {event.category}
            </span>

            {event.isRsvpd && (
              <span className="font-mono text-xs uppercase font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>YOU'RE GOING</span>
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#111111] mb-4">
            {event.title}
          </h1>

          {/* Time & Location details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-[#FBF9F5] border border-[#E5E0D5] rounded-2xl font-mono text-xs text-[#111111] mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#777777]" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#777777]" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#777777]" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-[#111111]/90 leading-relaxed space-y-4">
            <p>{event.description}</p>
            <p>
              Host: <span className="font-bold">{event.host}</span> · Capacity: {event.capacity} seats · Registered: {event.attendeesCount}
            </p>
          </div>
        </div>

        {/* RSVP Action */}
        <div className="pt-6 border-t border-[#E5E0D5] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#777777]">
            <span>Earn +100 DUX Points upon RSVP confirmation.</span>
          </div>

          <button
            type="button"
            onClick={() => toggleRsvpEvent(event.id)}
            className={`w-full sm:w-auto px-8 py-3.5 font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
              event.isRsvpd
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-[#111111] hover:bg-black text-white'
            }`}
          >
            {event.isRsvpd ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>✓ YOU'RE GOING (CANCEL RSVP)</span>
              </>
            ) : (
              <span>RSVP NOW (+100 PTS)</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
