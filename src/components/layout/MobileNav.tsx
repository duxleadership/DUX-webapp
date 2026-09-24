import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Compass,
  Target,
  Users,
  User,
  Menu,
  X,
  CalendarDays,
  Map,
  BookOpen,
  FlaskConical,
  Award,
  Gift,
  ShoppingBag,
  Calendar,
  Settings,
  ShieldCheck
} from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { user } = useApp();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const mainTabs = [
    { label: 'Home', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Direction', path: '/direction', icon: Compass },
    { label: 'Challenges', path: '/challenges', icon: Target },
    { label: 'Community', path: '/community', icon: Users },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  const drawerItems = [
    { label: 'Daily DUX', path: '/daily', icon: CalendarDays },
    { label: 'Journey Map', path: '/map', icon: Map },
    { label: 'Stories', path: '/stories', icon: BookOpen },
    { label: 'DUX Lab', path: '/lab', icon: FlaskConical },
    { label: 'Achievements', path: '/achievements', icon: Award },
    { label: 'Rewards', path: '/rewards', icon: Gift },
    { label: 'Store', path: '/store', icon: ShoppingBag },
    { label: 'Events', path: '/events', icon: Calendar },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  if (user?.isAdmin) {
    drawerItems.push({ label: 'Admin Console', path: '/admin', icon: ShieldCheck });
  }

  return (
    <>
      {/* Bottom Sticky Navigation */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-[#FBF9F5] border-t border-[#E5E0D5] lg:hidden px-2 py-1.5 shadow-lg">
        <div className="flex items-center justify-around">
          {mainTabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-colors ${
                  isActive ? 'text-[#111111]' : 'text-[#777777] hover:text-[#111111]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="relative">
                    <tab.icon className={`w-5 h-5 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.75]'}`} />
                    {isActive && (
                      <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-[#FFD400]" />
                    )}
                  </div>
                  <span className="text-[10px] font-semibold mt-1 tracking-tight">
                    {tab.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}

          {/* More menu drawer trigger */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex flex-col items-center justify-center py-1 px-2.5 rounded-lg text-[#777777] hover:text-[#111111] cursor-pointer"
          >
            <Menu className="w-5 h-5 stroke-[1.75]" />
            <span className="text-[10px] font-semibold mt-1 tracking-tight">More</span>
          </button>
        </div>
      </nav>

      {/* Slide-out "More" Drawer for Mobile */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 max-w-xs w-full bg-[#FBF9F5] border-l border-[#E5E0D5] flex flex-col p-6 shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D5]">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#111111] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-[#FFD400] rotate-45" />
                </div>
                <span className="font-bold text-sm tracking-wider uppercase text-[#111111]">
                  DUX MENU
                </span>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 text-[#777777] hover:text-[#111111] rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-1">
              {drawerItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setDrawerOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-colors ${
                      isActive
                        ? 'bg-[#111111] text-white'
                        : 'text-[#111111] hover:bg-[#EFEAE1]'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4 text-[#777777]" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>

            {user && (
              <div className="pt-4 border-t border-[#E5E0D5]">
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#111111]/20"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#111111]">{user.name}</p>
                    <p className="text-[11px] font-mono text-[#777777]">{user.points} PTS · {user.streak}d</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
