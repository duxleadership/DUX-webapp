import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Compass,
  CalendarDays,
  Target,
  Map,
  BookOpen,
  Users,
  FlaskConical,
  Award,
  Gift,
  ShoppingBag,
  Calendar,
  User,
  Settings,
  ShieldCheck
} from 'lucide-react';

interface SidebarProps {
  className?: string;
  onItemClick?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ className = '', onItemClick }) => {
  const { user } = useApp();

  const navItems = [
    { label: 'DASHBOARD', path: '/dashboard', icon: LayoutDashboard, primary: true },
    { label: 'Direction', path: '/direction', icon: Compass },
    { label: 'Daily', path: '/daily', icon: CalendarDays },
    { label: 'Challenges', path: '/challenges', icon: Target },
    { label: 'Map', path: '/map', icon: Map },
    { label: 'Stories', path: '/stories', icon: BookOpen },
    { label: 'Community', path: '/community', icon: Users },
    { label: 'DUX Lab', path: '/lab', icon: FlaskConical },
    { label: 'Achievements', path: '/achievements', icon: Award },
    { label: 'Rewards', path: '/rewards', icon: Gift },
    { label: 'Store', path: '/store', icon: ShoppingBag },
    { label: 'Events', path: '/events', icon: Calendar },
  ];

  const bottomNavItems = [
    { label: 'Profile', path: '/profile', icon: User },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  if (user?.isAdmin) {
    bottomNavItems.unshift({ label: 'Admin Console', path: '/admin', icon: ShieldCheck });
  }

  return (
    <aside
      className={`w-64 bg-[#FBF9F5] border-r border-[#E5E0D5] flex flex-col justify-between py-6 px-4 h-[calc(100vh-61px)] sticky top-[61px] overflow-y-auto ${className}`}
    >
      <div className="space-y-6">
        {/* Navigation list */}
        <div className="space-y-1">
          <div className="px-3 pb-2 text-[10px] font-mono tracking-widest uppercase text-[#777777] font-semibold">
            NAVIGATION
          </div>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onItemClick}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all group ${
                  isActive
                    ? 'bg-[#111111] text-white shadow-sm'
                    : 'text-[#111111] hover:bg-[#EFEAE1]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-[#FFD400]' : 'text-[#777777] group-hover:text-[#111111]'
                    }`}
                  />
                  <span className={item.primary ? 'font-bold uppercase tracking-wider' : ''}>
                    {item.label}
                  </span>
                  {item.label === 'Direction' && user?.direction && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FFD400]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Bottom links */}
      <div className="pt-4 border-t border-[#E5E0D5] space-y-1">
        {bottomNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onItemClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                isActive
                  ? 'bg-[#111111] text-white'
                  : 'text-[#777777] hover:text-[#111111] hover:bg-[#EFEAE1]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={`w-4 h-4 ${isActive ? 'text-[#FFD400]' : 'text-[#777777]'}`}
                />
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}

        {/* Mini stats widget */}
        {user && (
          <div className="mt-4 p-3 bg-white border border-[#E5E0D5] rounded-xl text-[11px]">
            <div className="flex justify-between text-[#777777] mb-1 font-mono">
              <span>DUX POINTS</span>
              <span className="text-[#111111] font-bold">{user.points}</span>
            </div>
            <div className="w-full bg-[#F5F1E8] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#FFD400] h-full"
                style={{ width: `${Math.min(100, (user.points / 1000) * 100)}%` }}
              />
            </div>
            <div className="mt-1.5 flex justify-between text-[10px] text-[#777777]">
              <span>Next reward: 1,000</span>
              <NavLink to="/rewards" className="text-[#111111] font-bold hover:underline">
                View →
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
