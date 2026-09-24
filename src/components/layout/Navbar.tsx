import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Bell,
  ShoppingBag,
  LogOut,
  Settings as SettingsIcon,
  Shield,
  User,
  Compass,
  Check,
  Menu,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC<{ onMobileMenuToggle?: () => void }> = ({ onMobileMenuToggle }) => {
  const { user, logout, notifications, markNotificationAsRead, cart, setIsCartOpen, searchQuery, setSearchQuery } = useApp();
  const navigate = useNavigate();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/search');
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#E5E0D5] px-4 lg:px-8 py-3.5 transition-colors">
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Mobile menu & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMobileMenuToggle}
            className="p-2 lg:hidden text-[#111111] hover:bg-[#F5F1E8] rounded-lg transition-colors cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2.5 group">
            {/* Compass Geometric Icon */}
            <div className="w-8 h-8 rounded-lg bg-[#111111] flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                <polygon points="12,3 15.5,12 12,10 8.5,12" fill="#FFD400" />
                <polygon points="12,21 15.5,12 12,10 8.5,12" fill="#FFFFFF" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tighter text-[#111111] leading-none">
                DUX
              </span>
              <span className="text-[9px] font-mono tracking-widest text-[#777777] uppercase hidden sm:inline leading-tight mt-0.5">
                WHERE DIRECTION BEGINS
              </span>
            </div>
          </Link>
        </div>

        {/* Global Search */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex-1 max-w-md mx-2 sm:mx-6 hidden md:block"
        >
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777777]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stories, challenges, ideas, directions..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-[#E5E0D5] rounded-xl text-xs placeholder:text-[#777777] focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all"
            />
          </div>
        </form>

        {/* Right side actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search icon for mobile */}
          <button
            onClick={() => navigate('/search')}
            className="p-2 md:hidden text-[#777777] hover:text-[#111111] hover:bg-[#F5F1E8] rounded-xl transition-colors cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-[#777777] hover:text-[#111111] hover:bg-[#F5F1E8] rounded-xl transition-colors cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#111111] text-[#FFD400] text-[10px] font-mono font-bold flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 text-[#777777] hover:text-[#111111] hover:bg-[#F5F1E8] rounded-xl transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FFD400] border-2 border-white rounded-full" />
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-[#E5E0D5] rounded-2xl shadow-xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D5]">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs uppercase tracking-wider text-[#111111]">
                      Notifications
                    </span>
                    {unreadCount > 0 && (
                      <span className="font-mono text-[10px] bg-[#111111] text-[#FFD400] px-1.5 py-0.5 rounded-full font-bold">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <Link
                    to="/notifications"
                    onClick={() => setIsNotifOpen(false)}
                    className="text-xs font-semibold text-[#777777] hover:text-[#111111] transition-colors"
                  >
                    View all →
                  </Link>
                </div>

                <div className="divide-y divide-[#F5F1E8] max-h-72 overflow-y-auto">
                  {notifications.slice(0, 4).map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markNotificationAsRead(n.id);
                        if (n.link) {
                          navigate(n.link);
                          setIsNotifOpen(false);
                        }
                      }}
                      className={`p-3 text-left hover:bg-[#FBF9F5] transition-colors cursor-pointer rounded-lg ${
                        !n.read ? 'bg-[#FFFDF5]' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-xs font-bold text-[#111111]">
                          {n.title}
                        </span>
                        <span className="text-[10px] text-[#777777] font-mono shrink-0">
                          {n.time}
                        </span>
                      </div>
                      <p className="text-xs text-[#777777] mt-0.5 line-clamp-2">
                        {n.message}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-center border-t border-[#E5E0D5]">
                  <Link
                    to="/notifications"
                    onClick={() => setIsNotifOpen(false)}
                    className="text-xs font-bold uppercase tracking-wider text-[#111111] hover:underline"
                  >
                    All Notifications ({notifications.length})
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Profile dropdown */}
          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2.5 p-1.5 hover:bg-[#F5F1E8] rounded-xl transition-colors cursor-pointer"
              >
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border border-[#111111]/15"
                />
                <div className="hidden sm:flex flex-col text-left leading-tight">
                  <span className="text-xs font-bold text-[#111111] truncate max-w-[110px]">
                    {user.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#777777] uppercase truncate max-w-[110px]">
                    {user.direction || 'Discovering'}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#777777] hidden sm:block" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-[#E5E0D5] rounded-2xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-3 border-b border-[#F5F1E8] mb-1">
                    <p className="text-xs font-bold text-[#111111]">{user.name}</p>
                    <p className="text-[11px] text-[#777777] font-mono truncate">@{user.username}</p>
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#F5F1E8] text-[11px]">
                      <span className="font-mono font-bold text-[#111111]">{user.points} PTS</span>
                      <span className="text-[#777777]">·</span>
                      <span className="font-mono text-[#777777]">{user.streak}d streak</span>
                    </div>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#111111] hover:bg-[#F5F1E8] rounded-lg transition-colors"
                  >
                    <User className="w-4 h-4 text-[#777777]" />
                    <span>My Profile</span>
                  </Link>

                  <Link
                    to="/direction"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#111111] hover:bg-[#F5F1E8] rounded-lg transition-colors"
                  >
                    <Compass className="w-4 h-4 text-[#777777]" />
                    <span>Direction Compass</span>
                  </Link>

                  <Link
                    to="/settings"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#111111] hover:bg-[#F5F1E8] rounded-lg transition-colors"
                  >
                    <SettingsIcon className="w-4 h-4 text-[#777777]" />
                    <span>Settings</span>
                  </Link>

                  {user.isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#111111] hover:bg-[#FFD400]/20 rounded-lg transition-colors"
                    >
                      <Shield className="w-4 h-4 text-[#111111]" />
                      <span className="font-bold">Admin Console</span>
                    </Link>
                  )}

                  <div className="pt-1 mt-1 border-t border-[#F5F1E8]">
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        logout();
                        navigate('/');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3.5 py-1.5 text-xs font-bold text-[#111111] hover:text-black uppercase tracking-wider transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-[#111111] text-white hover:bg-black text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
              >
                Start
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
