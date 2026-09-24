import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Compass,
  Award,
  Target,
  Flame,
  Bookmark,
  BookOpen,
  FlaskConical,
  Edit3,
  Calendar,
  Sparkles,
  Check
} from 'lucide-react';
import { Modal, ProgressBar } from '../components/ui/CommonUI';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile, achievements, challenges, stories, ideas, posts } = useApp();

  const [activeTab, setActiveTab] = useState<'ABOUT' | 'JOURNEY' | 'ACHIEVEMENTS' | 'STORIES' | 'IDEAS' | 'SAVED'>('ABOUT');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [bioEdit, setBioEdit] = useState(user?.bio || '');
  const [nameEdit, setNameEdit] = useState(user?.name || '');

  if (!user) {
    return (
      <div className="text-center py-20">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      bio: bioEdit,
      name: nameEdit
    });
    setIsEditModalOpen(false);
  };

  const savedStories = stories.filter((s) => s.isSaved);
  const savedPosts = posts.filter((p) => p.isSaved);
  const myIdeas = ideas.filter((i) => i.author.username === user.username);
  const myCompletedChallenges = challenges.filter((c) => c.completed);
  const unlockedBadges = achievements.filter((a) => a.unlocked);

  const tabs = ['ABOUT', 'JOURNEY', 'ACHIEVEMENTS', 'STORIES', 'IDEAS', 'SAVED'] as const;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Profile Header Card */}
      <div className="bg-white border border-[#E5E0D5] rounded-3xl p-6 sm:p-10 shadow-xs relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-[#E5E0D5]">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-[#111111] shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#FFD400] text-[#111111] rounded-full flex items-center justify-center border-2 border-white">
                <Compass className="w-4 h-4" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#111111]">
                  {user.name}
                </h1>
              </div>
              <p className="font-mono text-xs text-[#777777]">@{user.username}</p>

              {user.direction && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="font-mono text-xs font-bold bg-[#111111] text-[#FFD400] px-2.5 py-1 rounded-md uppercase">
                    {user.direction}
                  </span>
                  <span className="text-xs font-mono text-[#777777] uppercase font-semibold">
                    {user.directionVirtue}
                  </span>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              setNameEdit(user.name);
              setBioEdit(user.bio);
              setIsEditModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 border border-[#E5E0D5] hover:border-[#111111] text-[#111111] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Bio */}
        <div className="py-4">
          <p className="text-xs sm:text-sm text-[#777777] leading-relaxed max-w-2xl">
            {user.bio}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#F5F1E8]">
          <div className="p-3 bg-[#FBF9F5] rounded-xl">
            <span className="font-mono text-xs text-[#777777] uppercase block">CHALLENGES</span>
            <span className="font-mono text-xl font-bold text-[#111111]">
              {user.challengesCompletedCount}
            </span>
          </div>

          <div className="p-3 bg-[#FBF9F5] rounded-xl">
            <span className="font-mono text-xs text-[#777777] uppercase block">STREAK</span>
            <span className="font-mono text-xl font-bold text-[#111111] flex items-center gap-1">
              <span>{user.streak}</span>
              <Flame className="w-4 h-4 text-[#FFD400] fill-[#FFD400]" />
            </span>
          </div>

          <div className="p-3 bg-[#FBF9F5] rounded-xl">
            <span className="font-mono text-xs text-[#777777] uppercase block">ACHIEVEMENTS</span>
            <span className="font-mono text-xl font-bold text-[#111111]">
              {unlockedBadges.length}
            </span>
          </div>

          <div className="p-3 bg-[#FBF9F5] rounded-xl">
            <span className="font-mono text-xs text-[#777777] uppercase block">POINTS</span>
            <span className="font-mono text-xl font-bold text-[#111111]">
              {user.points}
            </span>
          </div>
        </div>
      </div>

      {/* Profile Sections Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-[#E5E0D5]">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab
                ? 'bg-[#111111] text-white shadow-xs'
                : 'bg-white text-[#777777] hover:text-[#111111] hover:bg-[#F5F1E8] border border-[#E5E0D5]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="space-y-6">
        {/* ABOUT TAB */}
        {activeTab === 'ABOUT' && (
          <div className="bg-white border border-[#E5E0D5] rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="font-black text-sm uppercase tracking-wider text-[#111111]">
              DUX PASSPORT DOSSIER
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-[#FBF9F5] rounded-2xl space-y-1">
                <span className="font-mono text-[#777777] uppercase">Member Identity</span>
                <p className="font-bold text-[#111111]">{user.name} (@{user.username})</p>
                <p className="text-[#777777]">{user.email}</p>
              </div>

              <div className="p-4 bg-[#FBF9F5] rounded-2xl space-y-1">
                <span className="font-mono text-[#777777] uppercase">Primary Intentions</span>
                <p className="font-bold text-[#111111]">
                  {user.onboardingData?.intentions?.join(', ') || 'Discover myself, Build something'}
                </p>
              </div>

              <div className="p-4 bg-[#FBF9F5] rounded-2xl space-y-1">
                <span className="font-mono text-[#777777] uppercase">Growth Focus Areas</span>
                <p className="font-bold text-[#111111]">
                  {user.onboardingData?.focusAreas?.join(', ') || 'Confidence, Personal Growth'}
                </p>
              </div>

              <div className="p-4 bg-[#FBF9F5] rounded-2xl space-y-1">
                <span className="font-mono text-[#777777] uppercase">Direction Status</span>
                <p className="font-bold text-[#111111]">{user.direction || 'Pending discovery'}</p>
                <p className="text-[#777777] italic">"{user.directionMantra}"</p>
              </div>
            </div>
          </div>
        )}

        {/* JOURNEY TAB */}
        {activeTab === 'JOURNEY' && (
          <div className="bg-white border border-[#E5E0D5] rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="font-black text-sm uppercase tracking-wider text-[#111111]">
              ACTIVE ROADMAP MILESTONES
            </h3>
            <div className="space-y-3">
              {challenges.map((c) => (
                <div
                  key={c.id}
                  className="p-4 border border-[#E5E0D5] rounded-2xl flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-bold text-xs uppercase text-[#111111]">{c.title}</h4>
                    <p className="text-[11px] text-[#777777]">
                      {c.days.filter((d) => d.completed).length} of {c.durationDays} Days Completed
                    </p>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#111111]">
                    {c.completed ? '✓ COMPLETED' : 'IN PROGRESS'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ACHIEVEMENTS TAB */}
        {activeTab === 'ACHIEVEMENTS' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {unlockedBadges.map((ach) => (
              <div
                key={ach.id}
                className="p-5 bg-white border border-[#111111] rounded-2xl flex items-center gap-3 shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-[#111111] text-[#FFD400] flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-[#111111]">{ach.title}</h4>
                  <p className="text-[10px] text-[#777777] line-clamp-1">{ach.description}</p>
                  <span className="font-mono text-[10px] text-emerald-600 font-bold">
                    ✓ Unlocked ({ach.unlockedAt || 'Active'})
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* STORIES TAB */}
        {activeTab === 'STORIES' && (
          <div className="bg-white border border-[#E5E0D5] rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="font-black text-sm uppercase tracking-wider text-[#111111]">
              MY EDITORIAL DISPATCHES
            </h3>
            <p className="text-xs text-[#777777]">
              You have not submitted a published story yet. Complete a 7-day challenge to submit your journey account.
            </p>
          </div>
        )}

        {/* IDEAS TAB */}
        {activeTab === 'IDEAS' && (
          <div className="bg-white border border-[#E5E0D5] rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="font-black text-sm uppercase tracking-wider text-[#111111]">
              SUBMITTED LAB EXPERIMENTS ({myIdeas.length})
            </h3>
            {myIdeas.length === 0 ? (
              <p className="text-xs text-[#777777]">
                No lab experiments yet. Pitch an idea in the DUX Lab to earn +50 Points!
              </p>
            ) : (
              <div className="space-y-3">
                {myIdeas.map((idea) => (
                  <div key={idea.id} className="p-4 border border-[#E5E0D5] rounded-2xl">
                    <h4 className="text-xs font-bold uppercase text-[#111111]">{idea.title}</h4>
                    <p className="text-xs text-[#777777] mt-1">{idea.description}</p>
                    <span className="font-mono text-[10px] text-emerald-600 font-bold block mt-2">
                      Status: {idea.status} · {idea.upvotesCount} Upvotes
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SAVED TAB */}
        {activeTab === 'SAVED' && (
          <div className="space-y-4">
            <h3 className="font-black text-sm uppercase tracking-wider text-[#111111]">
              BOOKMARKED STORIES & DISCUSSIONS
            </h3>
            {savedStories.length === 0 && savedPosts.length === 0 ? (
              <div className="p-8 text-center bg-white border border-[#E5E0D5] rounded-2xl text-xs text-[#777777]">
                No items bookmarked yet. Tap the bookmark icon on any story or community post.
              </div>
            ) : (
              <div className="space-y-3">
                {savedStories.map((story) => (
                  <div
                    key={story.id}
                    className="p-4 bg-white border border-[#E5E0D5] rounded-2xl flex items-center justify-between"
                  >
                    <div>
                      <span className="font-mono text-[10px] font-bold uppercase text-[#777777]">
                        Story · {story.category}
                      </span>
                      <h4 className="text-xs font-bold text-[#111111] mt-0.5">{story.title}</h4>
                    </div>
                    <span className="text-xs font-mono text-[#777777]">{story.readTime}</span>
                  </div>
                ))}

                {savedPosts.map((post) => (
                  <div
                    key={post.id}
                    className="p-4 bg-white border border-[#E5E0D5] rounded-2xl"
                  >
                    <span className="font-mono text-[10px] font-bold uppercase text-[#777777]">
                      Post · {post.category}
                    </span>
                    <p className="text-xs text-[#111111] mt-0.5 line-clamp-2">{post.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="EDIT PROFILE"
        subtitle="Update your public DUX explorer identity."
      >
        <form onSubmit={handleProfileSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              required
              value={nameEdit}
              onChange={(e) => setNameEdit(e.target.value)}
              className="w-full p-2.5 bg-[#FBF9F5] border border-[#E5E0D5] rounded-xl text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1.5">
              Bio
            </label>
            <textarea
              rows={4}
              value={bioEdit}
              onChange={(e) => setBioEdit(e.target.value)}
              className="w-full p-2.5 bg-[#FBF9F5] border border-[#E5E0D5] rounded-xl text-xs text-[#111111] focus:outline-none focus:border-[#111111] resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 border border-[#E5E0D5] text-[#777777] text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#111111] text-white hover:bg-black text-xs font-bold uppercase tracking-wider rounded-xl shadow-md cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
