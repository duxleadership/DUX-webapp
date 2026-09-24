import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Bell,
  Check,
  CheckCheck,
  Target,
  Award,
  MessageSquare,
  Calendar,
  Flame,
  ArrowRight
} from 'lucide-react';

const NOTIF_ICONS: Record<string, React.ElementType> = {
  challenge: Target,
  achievement: Award,
  comment: MessageSquare,
  event: Calendar,
  streak: Flame,
  system: Bell
};

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useApp();
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#777777] mb-1 font-semibold">
            <Bell className="w-3.5 h-3.5 text-[#FFD400]" />
            <span>DISPATCH LOG</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#111111]">
            NOTIFICATIONS
          </h1>
          <p className="text-sm text-[#777777] font-medium mt-1">
            Activity reminders, unlocked achievements, and community responses.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsAsRead}
            className="self-start sm:self-center flex items-center gap-2 px-4 py-2 border border-[#E5E0D5] hover:border-[#111111] text-[#111111] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
          >
            <CheckCheck className="w-4 h-4" />
            <span>MARK ALL AS READ</span>
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="bg-white border border-[#E5E0D5] rounded-3xl divide-y divide-[#F5F1E8] overflow-hidden shadow-xs">
        {notifications.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#777777]">
            NO NOTIFICATIONS IN LOG
          </div>
        ) : (
          notifications.map((notif) => {
            const IconComponent = NOTIF_ICONS[notif.type] || Bell;

            return (
              <div
                key={notif.id}
                onClick={() => {
                  markNotificationAsRead(notif.id);
                  if (notif.link) navigate(notif.link);
                }}
                className={`p-5 flex items-start gap-4 transition-colors cursor-pointer hover:bg-[#FBF9F5] ${
                  !notif.read ? 'bg-[#FFFDF5]' : ''
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    !notif.read
                      ? 'bg-[#111111] text-[#FFD400]'
                      : 'bg-[#F5F1E8] text-[#777777]'
                  }`}
                >
                  <IconComponent className="w-5 h-5 stroke-[1.75]" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className={`text-xs uppercase tracking-wide font-black ${
                      !notif.read ? 'text-[#111111]' : 'text-[#777777]'
                    }`}>
                      {notif.title}
                    </h3>
                    <span className="font-mono text-[10px] text-[#777777] shrink-0">
                      {notif.time}
                    </span>
                  </div>

                  <p className="text-xs text-[#777777] leading-relaxed">
                    {notif.message}
                  </p>
                </div>

                <div className="shrink-0 self-center">
                  {!notif.read ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFD400] block" />
                  ) : (
                    <ArrowRight className="w-4 h-4 text-[#E5E0D5]" />
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
