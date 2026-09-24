import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  Heart,
  MessageSquare,
  Bookmark,
  Send,
  Plus,
  Share2,
  Filter,
  Check
} from 'lucide-react';
import { Modal } from '../components/ui/CommonUI';

export const CommunityPage: React.FC = () => {
  const { posts, user, createPost, toggleLikePost, toggleSavePost, addCommentToPost } = useApp();

  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<any>('PROJECTS');

  // Comment input per post
  const [openCommentPostId, setOpenCommentPostId] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  const tabs = ['ALL', 'IDEAS', 'QUESTIONS', 'PROJECTS', 'LEARNING', 'INSPIRATION'];

  const filteredPosts = activeTab === 'ALL'
    ? posts
    : posts.filter((p) => p.category === activeTab);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;
    createPost(newContent, newCategory);
    setNewContent('');
    setIsCreateModalOpen(false);
  };

  const handleCommentSubmit = (postId: string) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;
    addCommentToPost(postId, text);
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#777777] mb-1 font-semibold">
            <Users className="w-3.5 h-3.5 text-[#FFD400]" />
            <span>COLLECTIVE FORUM</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#111111]">
            DUX COMMUNITY
          </h1>
          <p className="text-sm text-[#777777] font-medium mt-1">
            Build in the open. Share breakthroughs, questions, and weekly sprint learnings.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="self-start sm:self-center px-6 py-3 bg-[#111111] text-white hover:bg-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#FFD400]" />
          <span>NEW DISCUSSION</span>
        </button>
      </div>

      {/* Tabs Filter (Zero-pill discipline) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-[#E5E0D5]">
        {tabs.map((tab) => (
          <button
            key={tab}
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

      {/* Feed Posts */}
      <div className="space-y-6">
        {filteredPosts.map((post) => {
          const isCommentsOpen = openCommentPostId === post.id;
          const currentCommentText = commentInputs[post.id] || '';

          return (
            <div
              key={post.id}
              className="p-6 bg-white border border-[#E5E0D5] rounded-3xl shadow-xs space-y-4 hover:border-[#111111]/30 transition-all"
            >
              {/* Post Header: Profile & Category */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#111111]/15"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#111111]">
                        {post.author.name}
                      </span>
                      <span className="text-[11px] font-mono text-[#777777]">
                        @{post.author.username}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-[#777777]">
                      {post.author.direction && (
                        <>
                          <span className="text-[#111111] font-semibold">{post.author.direction}</span>
                          <span>·</span>
                        </>
                      )}
                      <span>{post.createdAt}</span>
                    </div>
                  </div>
                </div>

                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#777777] bg-[#F5F1E8] px-2.5 py-1 rounded-md">
                  {post.category}
                </span>
              </div>

              {/* Post Content */}
              <p className="text-xs sm:text-sm text-[#111111] leading-relaxed whitespace-pre-line">
                {post.content}
              </p>

              {/* Engagement counts strip */}
              <div className="flex items-center gap-4 text-xs font-mono text-[#777777] pt-2 border-t border-[#F5F1E8]">
                <span>♡ {post.likesCount} Likes</span>
                <span>💬 {post.comments.length} Comments</span>
              </div>

              {/* Action Buttons: LIKE, COMMENT, SAVE */}
              <div className="flex items-center justify-between pt-2 border-t border-[#F5F1E8]">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleLikePost(post.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      post.isLiked
                        ? 'bg-red-50 text-red-600'
                        : 'text-[#777777] hover:text-[#111111] hover:bg-[#F5F1E8]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-red-600' : ''}`} />
                    <span>{post.isLiked ? 'LIKED' : 'LIKE'}</span>
                  </button>

                  <button
                    onClick={() => setOpenCommentPostId(isCommentsOpen ? null : post.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#777777] hover:text-[#111111] hover:bg-[#F5F1E8] transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>COMMENT ({post.comments.length})</span>
                  </button>
                </div>

                <button
                  onClick={() => toggleSavePost(post.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    post.isSaved
                      ? 'bg-[#111111] text-white'
                      : 'text-[#777777] hover:text-[#111111] hover:bg-[#F5F1E8]'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${post.isSaved ? 'fill-white' : ''}`} />
                  <span>{post.isSaved ? 'SAVED' : 'SAVE'}</span>
                </button>
              </div>

              {/* Expandable Comment Interface */}
              {isCommentsOpen && (
                <div className="pt-4 border-t border-[#E5E0D5] space-y-4 animate-in fade-in duration-150">
                  {/* List existing comments */}
                  {post.comments.length > 0 && (
                    <div className="space-y-3 pl-4 border-l-2 border-[#E5E0D5]">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="text-xs space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#111111]">
                              {comment.author.name}
                            </span>
                            <span className="text-[#777777] font-mono text-[10px]">
                              @{comment.author.username} · {comment.createdAt}
                            </span>
                          </div>
                          <p className="text-[#111111] leading-relaxed">
                            {comment.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add comment input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentCommentText}
                      onChange={(e) =>
                        setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleCommentSubmit(post.id);
                      }}
                      placeholder="Add to the conversation..."
                      className="flex-1 p-2.5 bg-[#FBF9F5] border border-[#E5E0D5] rounded-xl text-xs text-[#111111] focus:outline-none focus:border-[#111111] focus:bg-white transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => handleCommentSubmit(post.id)}
                      disabled={!currentCommentText.trim()}
                      className="px-4 py-2.5 bg-[#111111] text-white hover:bg-black rounded-xl text-xs font-bold uppercase transition-colors disabled:opacity-40 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* New Post Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="CREATE DISCUSSION"
        subtitle="Share a project update, idea, or strategic inquiry with the DUX network."
      >
        <form onSubmit={handleCreatePost} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1.5">
              Category
            </label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full p-2.5 bg-[#FBF9F5] border border-[#E5E0D5] rounded-xl text-xs text-[#111111] font-mono focus:outline-none focus:border-[#111111]"
            >
              <option value="PROJECTS">PROJECTS</option>
              <option value="IDEAS">IDEAS</option>
              <option value="QUESTIONS">QUESTIONS</option>
              <option value="LEARNING">LEARNING</option>
              <option value="INSPIRATION">INSPIRATION</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1.5">
              Post Content
            </label>
            <textarea
              required
              rows={4}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="What are you building, testing, or questioning right now?"
              className="w-full p-3 bg-[#FBF9F5] border border-[#E5E0D5] rounded-xl text-xs text-[#111111] focus:outline-none focus:border-[#111111] resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2.5 border border-[#E5E0D5] text-[#777777] text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#111111] text-white hover:bg-black text-xs font-bold uppercase tracking-wider rounded-xl shadow-md cursor-pointer"
            >
              Publish Post (+15 PTS)
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
