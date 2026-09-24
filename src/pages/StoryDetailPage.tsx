import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  Heart,
  Bookmark,
  Share2,
  Calendar,
  Clock,
  Compass,
  Check
} from 'lucide-react';

export const StoryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { stories, toggleLikeStory, toggleSaveStory, showToast } = useApp();
  const navigate = useNavigate();

  const story = stories.find((s) => s.id === id) || stories[0];

  if (!story) {
    return (
      <div className="text-center py-20">
        <p>Story not found.</p>
        <Link to="/stories" className="text-xs uppercase font-bold text-[#111111] underline mt-4 block">
          Back to Stories
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
      message: 'Story URL copied to your clipboard.'
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/stories"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#777777] hover:text-[#111111] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO STORIES</span>
        </Link>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleLikeStory(story.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition-colors cursor-pointer ${
              story.isLiked
                ? 'border-red-200 bg-red-50 text-red-600'
                : 'border-[#E5E0D5] bg-white text-[#777777] hover:border-[#111111]'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${story.isLiked ? 'fill-red-600' : ''}`} />
            <span>{story.likesCount}</span>
          </button>

          <button
            onClick={() => toggleSaveStory(story.id)}
            className={`p-2 rounded-lg border text-xs transition-colors cursor-pointer ${
              story.isSaved
                ? 'border-[#111111] bg-[#111111] text-white'
                : 'border-[#E5E0D5] bg-white text-[#777777] hover:border-[#111111]'
            }`}
            title="Save Story"
          >
            <Bookmark className={`w-4 h-4 ${story.isSaved ? 'fill-white' : ''}`} />
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-lg border border-[#E5E0D5] bg-white text-[#777777] hover:border-[#111111] hover:text-[#111111] transition-colors cursor-pointer"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Story Article Header */}
      <article className="bg-white border border-[#E5E0D5] rounded-3xl p-6 sm:p-12 shadow-sm space-y-8">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#777777] mb-3">
            <span className="font-mono font-bold text-[#111111] uppercase tracking-wider">
              {story.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>{story.readTime}</span>
            <span aria-hidden="true">·</span>
            <span>{story.publishedAt}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-[#111111] leading-tight mb-6">
            {story.title}
          </h1>

          {/* Author Strip */}
          <div className="flex items-center gap-3 py-4 border-y border-[#F5F1E8]">
            <img
              src={story.author.avatar}
              alt={story.author.name}
              className="w-12 h-12 rounded-full object-cover border border-[#111111]/20"
            />
            <div>
              <p className="text-sm font-bold text-[#111111]">{story.author.name}</p>
              <div className="flex items-center gap-2 text-xs text-[#777777] font-mono">
                <span>@{story.author.username}</span>
                <span>·</span>
                <span className="text-[#111111] font-semibold">{story.author.direction}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Story Body */}
        <div className="text-sm sm:text-base leading-relaxed text-[#111111]/90 space-y-6 font-normal whitespace-pre-line">
          {story.content}
        </div>

        {/* Bottom Author Signoff */}
        <div className="p-6 bg-[#FBF9F5] border border-[#E5E0D5] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#111111]">
              Reflect & Take Action
            </p>
            <p className="text-xs text-[#777777] mt-0.5">
              Every story points back to your own next move. What will you build today?
            </p>
          </div>

          <Link
            to="/challenges"
            className="px-6 py-2.5 bg-[#111111] text-white hover:bg-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xs shrink-0"
          >
            Start a Challenge →
          </Link>
        </div>
      </article>
    </div>
  );
};
