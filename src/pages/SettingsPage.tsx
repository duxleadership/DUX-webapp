import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Settings,
  User,
  Shield,
  Bell,
  Eye,
  Lock,
  LogOut,
  Check,
  Moon,
  Sun
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user, updateProfile, logout, showToast } = useApp();
  const navigate = useNavigate();

  // Account form
  const [name, setName] = useState(user?.name || '');
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');

  // Privacy toggles
  const [profileVisible, setProfileVisible] = useState(true);
  const [activityVisible, setActivityVisible] = useState(true);

  // Notification toggles
  const [challengeReminders, setChallengeReminders] = useState(true);
  const [communityNotifs, setCommunityNotifs] = useState(true);
  const [eventReminders, setEventReminders] = useState(true);

  // Security password
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleAccountSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, username, email });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      showToast({
        type: 'info',
        title: 'Password Too Short',
        message: 'Must be at least 6 characters.'
      });
      return;
    }
    if (newPassword !== confirmNewPassword) {
      showToast({
        type: 'info',
        title: 'Passwords Mismatch',
        message: 'Confirmation does not match new password.'
      });
      return;
    }

    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    showToast({
      type: 'success',
      title: 'Password Updated',
      message: 'Your login credentials have been renewed.'
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#777777] mb-1 font-semibold">
          <Settings className="w-3.5 h-3.5 text-[#FFD400]" />
          <span>PREFERENCES & ACCESS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#111111]">
          SETTINGS
        </h1>
        <p className="text-sm text-[#777777] font-medium mt-1">
          Manage identity, privacy settings, notification frequencies, and authentication.
        </p>
      </div>

      {/* SECTION 1: ACCOUNT */}
      <div className="bg-white border border-[#E5E0D5] rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-[#E5E0D5]">
          <User className="w-4 h-4 text-[#111111]" />
          <h2 className="text-sm font-black uppercase tracking-wider text-[#111111]">
            ACCOUNT DETAILS
          </h2>
        </div>

        <form onSubmit={handleAccountSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 bg-[#FBF9F5] border border-[#E5E0D5] rounded-xl text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1.5">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2.5 bg-[#FBF9F5] border border-[#E5E0D5] rounded-xl text-xs font-mono text-[#111111] focus:outline-none focus:border-[#111111]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 bg-[#FBF9F5] border border-[#E5E0D5] rounded-xl text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#111111] text-white hover:bg-black font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Save Account Changes
            </button>
          </div>
        </form>
      </div>

      {/* SECTION 2: PRIVACY */}
      <div className="bg-white border border-[#E5E0D5] rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-[#E5E0D5]">
          <Eye className="w-4 h-4 text-[#111111]" />
          <h2 className="text-sm font-black uppercase tracking-wider text-[#111111]">
            PRIVACY
          </h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3.5 bg-[#FBF9F5] rounded-xl">
            <div>
              <h4 className="text-xs font-bold uppercase text-[#111111]">Profile Visibility</h4>
              <p className="text-xs text-[#777777]">Allow other DUX members to see your direction archetype and badges.</p>
            </div>
            <button
              type="button"
              onClick={() => setProfileVisible(!profileVisible)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                profileVisible ? 'bg-[#111111]' : 'bg-[#E5E0D5]'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  profileVisible ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3.5 bg-[#FBF9F5] rounded-xl">
            <div>
              <h4 className="text-xs font-bold uppercase text-[#111111]">Activity Visibility</h4>
              <p className="text-xs text-[#777777]">Share completed challenge milestones in the collective community stream.</p>
            </div>
            <button
              type="button"
              onClick={() => setActivityVisible(!activityVisible)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                activityVisible ? 'bg-[#111111]' : 'bg-[#E5E0D5]'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  activityVisible ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 3: NOTIFICATIONS */}
      <div className="bg-white border border-[#E5E0D5] rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-[#E5E0D5]">
          <Bell className="w-4 h-4 text-[#111111]" />
          <h2 className="text-sm font-black uppercase tracking-wider text-[#111111]">
            NOTIFICATIONS
          </h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3.5 bg-[#FBF9F5] rounded-xl">
            <div>
              <h4 className="text-xs font-bold uppercase text-[#111111]">Challenge Reminders</h4>
              <p className="text-xs text-[#777777]">Receive alerts for daily challenge sprint steps.</p>
            </div>
            <button
              type="button"
              onClick={() => setChallengeReminders(!challengeReminders)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                challengeReminders ? 'bg-[#111111]' : 'bg-[#E5E0D5]'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  challengeReminders ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3.5 bg-[#FBF9F5] rounded-xl">
            <div>
              <h4 className="text-xs font-bold uppercase text-[#111111]">Community Notifications</h4>
              <p className="text-xs text-[#777777]">Notify when members comment or like your thoughts.</p>
            </div>
            <button
              type="button"
              onClick={() => setCommunityNotifs(!communityNotifs)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                communityNotifs ? 'bg-[#111111]' : 'bg-[#E5E0D5]'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  communityNotifs ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3.5 bg-[#FBF9F5] rounded-xl">
            <div>
              <h4 className="text-xs font-bold uppercase text-[#111111]">Event Reminders</h4>
              <p className="text-xs text-[#777777]">Send 24-hour reminders prior to registered RSVPs.</p>
            </div>
            <button
              type="button"
              onClick={() => setEventReminders(!eventReminders)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                eventReminders ? 'bg-[#111111]' : 'bg-[#E5E0D5]'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  eventReminders ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 4: SECURITY */}
      <div className="bg-white border border-[#E5E0D5] rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-[#E5E0D5]">
          <Lock className="w-4 h-4 text-[#111111]" />
          <h2 className="text-sm font-black uppercase tracking-wider text-[#111111]">
            SECURITY & PASSWORD
          </h2>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1.5">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full p-2.5 bg-[#FBF9F5] border border-[#E5E0D5] rounded-xl text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1.5">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full p-2.5 bg-[#FBF9F5] border border-[#E5E0D5] rounded-xl text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1.5">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full p-2.5 bg-[#FBF9F5] border border-[#E5E0D5] rounded-xl text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#111111] text-white hover:bg-black font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>

      {/* SECTION 5: ACCOUNT LOGOUT */}
      <div className="bg-white border border-red-200 rounded-3xl p-6 sm:p-8 shadow-xs flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-red-600">
            SIGN OUT OF DUX
          </h3>
          <p className="text-xs text-[#777777] mt-0.5">
            Safely disconnect your active session on this device.
          </p>
        </div>

        <button
          onClick={() => {
            logout();
            navigate('/');
          }}
          className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>LOGOUT</span>
        </button>
      </div>
    </div>
  );
};
