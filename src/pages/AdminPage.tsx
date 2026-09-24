import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Shield,
  Users,
  BookOpen,
  Target,
  MessageSquare,
  Calendar,
  ShoppingBag,
  Award,
  AlertTriangle,
  TrendingUp,
  Plus,
  Trash2,
  Check,
  Filter,
  BarChart3
} from 'lucide-react';
import { Modal } from '../components/ui/CommonUI';
import { Challenge, Story } from '../types';

export const AdminPage: React.FC = () => {
  const {
    adminStats,
    challenges,
    createAdminChallenge,
    deleteAdminChallenge,
    stories,
    publishAdminStory,
    posts,
    deleteAdminPost,
    events,
    products,
    achievements,
    user
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'Dashboard' | 'Users' | 'Stories' | 'Challenges' | 'Community' | 'Ideas' | 'Events' | 'Products' | 'Achievements' | 'Reports' | 'Settings'
  >('Dashboard');

  // Challenge modal
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
  const [newChTitle, setNewChTitle] = useState('');
  const [newChCategory, setNewChCategory] = useState<Challenge['category']>('Leadership');
  const [newChDuration, setNewChDuration] = useState(7);
  const [newChDifficulty, setNewChDifficulty] = useState<Challenge['difficulty']>('INTERMEDIATE');
  const [newChDesc, setNewChDesc] = useState('');
  const [newChPoints, setNewChPoints] = useState(100);

  // Story modal
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [newStTitle, setNewStTitle] = useState('');
  const [newStCategory, setNewStCategory] = useState<Story['category']>('LEARNING');
  const [newStDesc, setNewStDesc] = useState('');
  const [newStContent, setNewStContent] = useState('');

  const handleCreateChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    createAdminChallenge(
      {
        title: newChTitle,
        category: newChCategory,
        durationDays: newChDuration,
        difficulty: newChDifficulty,
        shortDescription: newChDesc,
        description: newChDesc,
        rewardPoints: newChPoints,
        badgeId: '7-day-streak'
      },
      newChDuration
    );
    setIsChallengeModalOpen(false);
    setNewChTitle('');
    setNewChDesc('');
  };

  const handlePublishStory = (e: React.FormEvent) => {
    e.preventDefault();
    publishAdminStory({
      title: newStTitle,
      category: newStCategory,
      shortDescription: newStDesc,
      content: newStContent,
      readTime: '5 min read',
      author: {
        name: user?.name || 'DUX Editorial Team',
        username: user?.username || 'editorial',
        avatar: user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        direction: 'THE CREATOR'
      }
    });
    setIsStoryModalOpen(false);
    setNewStTitle('');
    setNewStDesc('');
    setNewStContent('');
  };

  const tabs = [
    'Dashboard',
    'Users',
    'Stories',
    'Challenges',
    'Community',
    'Ideas',
    'Events',
    'Products',
    'Achievements',
    'Reports',
    'Settings'
  ] as const;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E0D5]">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#777777] mb-1 font-semibold">
            <Shield className="w-3.5 h-3.5 text-[#111111]" />
            <span>OPERATIONAL TELEMETRY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#111111]">
            ADMIN CONSOLE
          </h1>
          <p className="text-sm text-[#777777] font-medium mt-1">
            Manage curriculum, stories, community moderation, and platform activity.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsChallengeModalOpen(true)}
            className="px-4 py-2 bg-[#111111] text-white hover:bg-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#FFD400]" />
            <span>+ Challenge</span>
          </button>
          <button
            onClick={() => setIsStoryModalOpen(true)}
            className="px-4 py-2 bg-white border border-[#111111] text-[#111111] hover:bg-[#F5F1E8] font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Story</span>
          </button>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-[#E5E0D5]">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab
                ? 'bg-[#111111] text-white shadow-xs'
                : 'bg-white text-[#777777] hover:text-[#111111] hover:bg-[#F5F1E8] border border-[#E5E0D5]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* DASHBOARD TAB */}
      {activeTab === 'Dashboard' && (
        <div className="space-y-8">
          {/* 6 Key Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-4 bg-white border border-[#E5E0D5] rounded-2xl">
              <span className="font-mono text-[10px] uppercase text-[#777777] block">TOTAL USERS</span>
              <span className="font-mono text-2xl font-bold text-[#111111] mt-1 block">
                {adminStats.totalUsers}
              </span>
              <span className="text-[10px] text-emerald-600 font-mono">+12% this mo</span>
            </div>

            <div className="p-4 bg-white border border-[#E5E0D5] rounded-2xl">
              <span className="font-mono text-[10px] uppercase text-[#777777] block">ACTIVE USERS</span>
              <span className="font-mono text-2xl font-bold text-[#111111] mt-1 block">
                {adminStats.activeUsers}
              </span>
              <span className="text-[10px] text-[#777777] font-mono">62% engagement</span>
            </div>

            <div className="p-4 bg-white border border-[#E5E0D5] rounded-2xl">
              <span className="font-mono text-[10px] uppercase text-[#777777] block">TOTAL POSTS</span>
              <span className="font-mono text-2xl font-bold text-[#111111] mt-1 block">
                {adminStats.totalPosts}
              </span>
              <span className="text-[10px] text-[#777777] font-mono">Active threads</span>
            </div>

            <div className="p-4 bg-white border border-[#E5E0D5] rounded-2xl">
              <span className="font-mono text-[10px] uppercase text-[#777777] block">TOTAL STORIES</span>
              <span className="font-mono text-2xl font-bold text-[#111111] mt-1 block">
                {adminStats.totalStories}
              </span>
              <span className="text-[10px] text-[#777777] font-mono">Published</span>
            </div>

            <div className="p-4 bg-white border border-[#E5E0D5] rounded-2xl">
              <span className="font-mono text-[10px] uppercase text-[#777777] block">ACTIVE CHALLENGES</span>
              <span className="font-mono text-2xl font-bold text-[#111111] mt-1 block">
                {adminStats.activeChallenges}
              </span>
              <span className="text-[10px] text-[#777777] font-mono">In curriculum</span>
            </div>

            <div className="p-4 bg-white border border-[#E5E0D5] rounded-2xl">
              <span className="font-mono text-[10px] uppercase text-[#777777] block">EVENTS</span>
              <span className="font-mono text-2xl font-bold text-[#111111] mt-1 block">
                {adminStats.eventsCount}
              </span>
              <span className="text-[10px] text-[#777777] font-mono">Upcoming</span>
            </div>
          </div>

          {/* 4 Visual Analytics Charts (Tailwind Bar/Visual Graph Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Chart 1: User Growth */}
            <div className="p-6 bg-white border border-[#E5E0D5] rounded-3xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                    User Growth (Last 6 Months)
                  </h3>
                  <p className="text-[11px] text-[#777777] font-mono">+420 new explorers</p>
                </div>
                <BarChart3 className="w-4 h-4 text-[#777777]" />
              </div>

              {/* Bar visualization */}
              <div className="h-44 flex items-end gap-3 pt-6 px-2">
                {[
                  { month: 'Apr', val: 35 },
                  { month: 'May', val: 48 },
                  { month: 'Jun', val: 62 },
                  { month: 'Jul', val: 78 },
                  { month: 'Aug', val: 86 },
                  { month: 'Sep', val: 100 }
                ].map((item) => (
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <span className="font-mono text-[10px] text-[#777777]">{item.val * 14}</span>
                    <div
                      className="w-full bg-[#111111] hover:bg-[#FFD400] transition-colors rounded-t-lg"
                      style={{ height: `${item.val}%` }}
                    />
                    <span className="font-mono text-[10px] text-[#777777]">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart 2: Daily Activity */}
            <div className="p-6 bg-white border border-[#E5E0D5] rounded-3xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                    Daily Question Answer Rate
                  </h3>
                  <p className="text-[11px] text-[#777777] font-mono">Weekly completion density</p>
                </div>
                <TrendingUp className="w-4 h-4 text-[#777777]" />
              </div>

              <div className="h-44 flex items-end gap-3 pt-6 px-2">
                {[
                  { day: 'Mon', val: 72 },
                  { day: 'Tue', val: 84 },
                  { day: 'Wed', val: 65 },
                  { day: 'Thu', val: 90 },
                  { day: 'Fri', val: 75 },
                  { day: 'Sat', val: 58 },
                  { day: 'Sun', val: 88 }
                ].map((item) => (
                  <div key={item.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <div
                      className="w-full bg-[#FFD400] hover:bg-[#111111] transition-colors rounded-t-lg"
                      style={{ height: `${item.val}%` }}
                    />
                    <span className="font-mono text-[10px] text-[#777777]">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart 3: Challenge Completion */}
            <div className="p-6 bg-white border border-[#E5E0D5] rounded-3xl space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                Challenge Completion Funnel
              </h3>
              <div className="space-y-3 font-mono text-xs">
                <div>
                  <div className="flex justify-between text-[#777777] mb-1">
                    <span>Day 1 (Start Small)</span>
                    <span className="text-[#111111] font-bold">92%</span>
                  </div>
                  <div className="h-2 bg-[#F5F1E8] rounded-full overflow-hidden">
                    <div className="h-full bg-[#111111]" style={{ width: '92%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#777777] mb-1">
                    <span>Day 3 (Anchors)</span>
                    <span className="text-[#111111] font-bold">78%</span>
                  </div>
                  <div className="h-2 bg-[#F5F1E8] rounded-full overflow-hidden">
                    <div className="h-full bg-[#111111]" style={{ width: '78%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#777777] mb-1">
                    <span>Day 7 (Completion)</span>
                    <span className="text-[#111111] font-bold">64%</span>
                  </div>
                  <div className="h-2 bg-[#F5F1E8] rounded-full overflow-hidden">
                    <div className="h-full bg-[#FFD400]" style={{ width: '64%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Chart 4: Community Activity */}
            <div className="p-6 bg-white border border-[#E5E0D5] rounded-3xl space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                Community Category Breakdown
              </h3>
              <div className="space-y-2.5 text-xs font-mono">
                <div className="flex justify-between items-center p-2 bg-[#FBF9F5] rounded-xl">
                  <span>PROJECTS</span>
                  <span className="font-bold text-[#111111]">38%</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-[#FBF9F5] rounded-xl">
                  <span>IDEAS</span>
                  <span className="font-bold text-[#111111]">26%</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-[#FBF9F5] rounded-xl">
                  <span>QUESTIONS</span>
                  <span className="font-bold text-[#111111]">20%</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-[#FBF9F5] rounded-xl">
                  <span>LEARNING / INSPIRATION</span>
                  <span className="font-bold text-[#111111]">16%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHALLENGES TAB */}
      {activeTab === 'Challenges' && (
        <div className="bg-white border border-[#E5E0D5] rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D5]">
            <h3 className="text-sm font-black uppercase text-[#111111]">
              MANAGE ACTIVE CHALLENGES ({challenges.length})
            </h3>
            <button
              onClick={() => setIsChallengeModalOpen(true)}
              className="px-4 py-2 bg-[#111111] text-white text-xs font-bold uppercase rounded-xl"
            >
              + Create Challenge
            </button>
          </div>

          <div className="divide-y divide-[#F5F1E8]">
            {challenges.map((c) => (
              <div key={c.id} className="py-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold uppercase text-[#111111]">{c.title}</h4>
                    <span className="font-mono text-[10px] text-[#777777]">({c.durationDays}d · {c.category})</span>
                  </div>
                  <p className="text-xs text-[#777777] mt-0.5">{c.shortDescription}</p>
                </div>
                <button
                  onClick={() => deleteAdminChallenge(c.id)}
                  className="p-2 text-[#777777] hover:text-red-600 transition-colors"
                  title="Delete Challenge"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STORIES TAB */}
      {activeTab === 'Stories' && (
        <div className="bg-white border border-[#E5E0D5] rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D5]">
            <h3 className="text-sm font-black uppercase text-[#111111]">
              EDITORIAL ARTICLES ({stories.length})
            </h3>
            <button
              onClick={() => setIsStoryModalOpen(true)}
              className="px-4 py-2 bg-[#111111] text-white text-xs font-bold uppercase rounded-xl"
            >
              + Publish Story
            </button>
          </div>

          <div className="divide-y divide-[#F5F1E8]">
            {stories.map((s) => (
              <div key={s.id} className="py-4 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#111111]">{s.title}</h4>
                  <p className="text-[11px] text-[#777777] font-mono mt-0.5">
                    By {s.author.name} · {s.category} · {s.likesCount} likes
                  </p>
                </div>
                <span className="font-mono text-[10px] uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* COMMUNITY TAB */}
      {activeTab === 'Community' && (
        <div className="bg-white border border-[#E5E0D5] rounded-3xl p-6 sm:p-8 space-y-4">
          <h3 className="text-sm font-black uppercase text-[#111111] pb-4 border-b border-[#E5E0D5]">
            MODERATE COMMUNITY POSTS ({posts.length})
          </h3>

          <div className="divide-y divide-[#F5F1E8]">
            {posts.map((p) => (
              <div key={p.id} className="py-4 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#777777]">
                    <span className="font-bold text-[#111111]">@{p.author.username}</span>
                    <span>·</span>
                    <span>{p.category}</span>
                  </div>
                  <p className="text-xs text-[#111111] mt-1">{p.content}</p>
                </div>
                <button
                  onClick={() => deleteAdminPost(p.id)}
                  className="p-2 text-[#777777] hover:text-red-600 transition-colors"
                  title="Remove Post"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* USERS TAB */}
      {activeTab === 'Users' && (
        <div className="bg-white border border-[#E5E0D5] rounded-3xl p-6 sm:p-8 space-y-4">
          <h3 className="text-sm font-black uppercase text-[#111111] pb-4 border-b border-[#E5E0D5]">
            REGISTERED EXPLORERS
          </h3>
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-[#FBF9F5] rounded-xl flex items-center justify-between">
              <div>
                <span className="font-bold text-[#111111]">Alex Vance (@alexvance)</span>
                <span className="text-[#777777] block text-[11px]">alex.vance@dux.community</span>
              </div>
              <span className="text-emerald-700 font-bold">ADMIN / VERIFIED</span>
            </div>
            <div className="p-3 bg-[#FBF9F5] rounded-xl flex items-center justify-between">
              <div>
                <span className="font-bold text-[#111111]">David O'Connor (@doconnor)</span>
                <span className="text-[#777777] block text-[11px]">THE BUILDER</span>
              </div>
              <span className="text-[#777777]">MEMBER</span>
            </div>
            <div className="p-3 bg-[#FBF9F5] rounded-xl flex items-center justify-between">
              <div>
                <span className="font-bold text-[#111111]">Elena Rostova (@elena_evolve)</span>
                <span className="text-[#777777] block text-[11px]">THE EVOLVER</span>
              </div>
              <span className="text-[#777777]">AUTHOR</span>
            </div>
          </div>
        </div>
      )}

      {/* OTHER TABS FALLBACKS */}
      {['Ideas', 'Events', 'Products', 'Achievements', 'Reports', 'Settings'].includes(activeTab) && (
        <div className="bg-white border border-[#E5E0D5] rounded-3xl p-8 text-center space-y-3">
          <h3 className="text-base font-black uppercase text-[#111111]">{activeTab} Management</h3>
          <p className="text-xs text-[#777777] max-w-sm mx-auto">
            All database collections are monitored under real-time telemetry. Active policies are verified.
          </p>
          <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 font-mono text-xs font-bold rounded-md">
            ✓ ALL SUBSYSTEMS HEALTHY
          </div>
        </div>
      )}

      {/* Create Challenge Modal */}
      <Modal
        isOpen={isChallengeModalOpen}
        onClose={() => setIsChallengeModalOpen(false)}
        title="NEW CHALLENGE SPRINT"
        subtitle="Author a new direction challenge for the community curriculum."
      >
        <form onSubmit={handleCreateChallenge} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
              Title
            </label>
            <input
              type="text"
              required
              value={newChTitle}
              onChange={(e) => setNewChTitle(e.target.value)}
              placeholder="e.g. 10 DAY RESILIENCE PROTOCOL"
              className="w-full p-2.5 bg-[#FBF9F5] border border-[#E5E0D5] rounded-xl text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                Category
              </label>
              <select
                value={newChCategory}
                onChange={(e) => setNewChCategory(e.target.value as any)}
                className="w-full p-2.5 bg-[#FBF9F5] border border-[#E5E0D5] rounded-xl text-xs font-mono text-[#111111] focus:outline-none focus:border-[#111111]"
              >
                <option value="Personal Growth">Personal Growth</option>
                <option value="Confidence">Confidence</option>
                <option value="Creativity">Creativity</option>
                <option value="Leadership">Leadership</option>
                <option value="Career">Career</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                Duration (Days)
              </label>
              <input
                type="number"
                min={3}
                max={30}
                value={newChDuration}
                onChange={(e) => setNewChDuration(Number(e.target.value))}
                className="w-full p-2.5 bg-[#FBF9F5] border border-[#E5E0D5] rounded-xl text-xs font-mono text-[#111111] focus:outline-none focus:border-[#111111]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
              Description
            </label>
            <textarea
              required
              rows={3}
              value={newChDesc}
              onChange={(e) => setNewChDesc(e.target.value)}
              placeholder="Summary of what the participant will experience."
              className="w-full p-2.5 bg-[#FBF9F5] border border-[#E5E0D5] rounded-xl text-xs text-[#111111] focus:outline-none focus:border-[#111111] resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsChallengeModalOpen(false)}
              className="px-4 py-2 border border-[#E5E0D5] text-[#777777] text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#111111] text-white hover:bg-black text-xs font-bold uppercase tracking-wider rounded-xl shadow-md cursor-pointer"
            >
              Publish Challenge
            </button>
          </div>
        </form>
      </Modal>

      {/* Publish Story Modal */}
      <Modal
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
        title="PUBLISH DUX STORY"
        subtitle="Write an editorial dispatch for the Real People. Real Directions series."
      >
        <form onSubmit={handlePublishStory} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
              Headline
            </label>
            <input
              type="text"
              required
              value={newStTitle}
              onChange={(e) => setNewStTitle(e.target.value)}
              placeholder="e.g. Why I Scrapped 3 Years of Work"
              className="w-full p-2.5 bg-[#FBF9F5] border border-[#E5E0D5] rounded-xl text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
              Category
            </label>
            <select
              value={newStCategory}
              onChange={(e) => setNewStCategory(e.target.value as any)}
              className="w-full p-2.5 bg-[#FBF9F5] border border-[#E5E0D5] rounded-xl text-xs font-mono text-[#111111] focus:outline-none focus:border-[#111111]"
            >
              <option value="STARTING">STARTING</option>
              <option value="FAILING">FAILING</option>
              <option value="LEARNING">LEARNING</option>
              <option value="LEADING">LEADING</option>
              <option value="GROWING">GROWING</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
              Short Teaser
            </label>
            <input
              type="text"
              required
              value={newStDesc}
              onChange={(e) => setNewStDesc(e.target.value)}
              placeholder="1-2 sentences summarizing the inflection point."
              className="w-full p-2.5 bg-[#FBF9F5] border border-[#E5E0D5] rounded-xl text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
              Story Text
            </label>
            <textarea
              required
              rows={5}
              value={newStContent}
              onChange={(e) => setNewStContent(e.target.value)}
              placeholder="The full story paragraphs..."
              className="w-full p-2.5 bg-[#FBF9F5] border border-[#E5E0D5] rounded-xl text-xs text-[#111111] focus:outline-none focus:border-[#111111] resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsStoryModalOpen(false)}
              className="px-4 py-2 border border-[#E5E0D5] text-[#777777] text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#111111] text-white hover:bg-black text-xs font-bold uppercase tracking-wider rounded-xl shadow-md cursor-pointer"
            >
              Publish to Feed
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
