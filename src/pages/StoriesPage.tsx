import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { BookOpen, ArrowRight, Heart, Bookmark, Clock, User } from 'lucide-react';

export const StoriesPage: React.FC = () => {
  const { stories, toggleLikeStory, toggleSaveStory } = useApp();
  const [selectedCat, setSelectedCat] = useState<string>('ALL');

  const categories = ['ALL', 'STARTING', 'FAILING', 'LEARNING', 'LEADING', 'GROWING'];

  const filtered = selectedCat === 'ALL'
    ? stories
    : stories.filter((s) => s.category === selectedCat);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#777777] mb-1 font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-[#FFD400]" />
          <span>EDITORIAL DISPATCHES</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#111111]">
          REAL PEOPLE. REAL DIRECTIONS.
        </h1>
        <p className="text-sm text-[#777777] font-medium mt-1">
          Unfiltered accounts of pivots, breakdowns, quiet leaps, and lessons from the road.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-[#E5E0D5]">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCat(cat)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              selectedCat === cat
                ? 'bg-[#111111] text-white shadow-sm'
                : 'bg-white text-[#777777] hover:text-[#111111] hover:bg-[#F5F1E8] border border-[#E5E0D5]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Story Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((story) => (
          <div
            key={story.id}
            className="p-6 sm:p-8 bg-white border border-[#E5E0D5] rounded-3xl flex flex-col justify-between hover:border-[#111111] transition-all shadow-xs group"
          >
            <div>
              {/* Category & Read Time (Clean unboxed metadata) */}
              <div className="flex items-center gap-2 text-xs text-[#777777] mb-3">
                <span className="font-mono font-bold text-[#111111] uppercase tracking-wider">
                  {story.category}
                </span>
                <span aria-hidden="true">·</span>
                <span>{story.readTime}</span>
                <span aria-hidden="true">·</span>
                <span>{story.publishedAt}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[#111111] mb-3 leading-snug group-hover:text-black">
                {story.title}
              </h3>

              <p className="text-xs text-[#777777] leading-relaxed mb-6">
                {story.shortDescription}
              </p>
            </div>

            <div className="pt-4 border-t border-[#F5F1E8] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={story.author.avatar}
                  alt={story.author.name}
                  className="w-9 h-9 rounded-full object-cover border border-[#111111]/15"
                />
                <div className="leading-tight">
                  <p className="text-xs font-bold text-[#111111]">{story.author.name}</p>
                  <p className="text-[10px] font-mono text-[#777777] uppercase">{story.author.direction}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleLikeStory(story.id)}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    story.isLiked ? 'text-red-500 bg-red-50' : 'text-[#777777] hover:bg-[#F5F1E8]'
                  }`}
                  aria-label="Like story"
                >
                  <Heart className={`w-4 h-4 ${story.isLiked ? 'fill-red-500' : ''}`} />
                </button>

                <button
                  type="button"
                  onClick={() => toggleSaveStory(story.id)}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    story.isSaved ? 'text-[#111111] bg-[#F5F1E8]' : 'text-[#777777] hover:bg-[#F5F1E8]'
                  }`}
                  aria-label="Save story"
                >
                  <Bookmark className={`w-4 h-4 ${story.isSaved ? 'fill-[#111111]' : ''}`} />
                </button>

                <Link
                  to={`/stories/${story.id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#111111] text-white hover:bg-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xs"
                >
                  <span>READ STORY</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#FFD400]" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
