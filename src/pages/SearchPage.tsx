import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Search,
  BookOpen,
  Target,
  FlaskConical,
  MessageSquare,
  Calendar,
  User,
  ArrowRight
} from 'lucide-react';

export const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const { searchQuery, setSearchQuery, stories, challenges, ideas, posts, events, user } = useApp();

  const query = (searchQuery || initialQuery).toLowerCase().trim();

  // Search Results
  const matchingStories = query
    ? stories.filter(
        (s) =>
          s.title.toLowerCase().includes(query) ||
          s.shortDescription.toLowerCase().includes(query) ||
          s.category.toLowerCase().includes(query)
      )
    : [];

  const matchingChallenges = query
    ? challenges.filter(
        (c) =>
          c.title.toLowerCase().includes(query) ||
          c.shortDescription.toLowerCase().includes(query) ||
          c.category.toLowerCase().includes(query)
      )
    : [];

  const matchingIdeas = query
    ? ideas.filter(
        (i) =>
          i.title.toLowerCase().includes(query) ||
          i.description.toLowerCase().includes(query) ||
          i.tags.some((t) => t.toLowerCase().includes(query))
      )
    : [];

  const matchingPosts = query
    ? posts.filter(
        (p) =>
          p.content.toLowerCase().includes(query) ||
          p.author.name.toLowerCase().includes(query)
      )
    : [];

  const matchingEvents = query
    ? events.filter(
        (e) =>
          e.title.toLowerCase().includes(query) ||
          e.location.toLowerCase().includes(query) ||
          e.description.toLowerCase().includes(query)
      )
    : [];

  const totalResults =
    matchingStories.length +
    matchingChallenges.length +
    matchingIdeas.length +
    matchingPosts.length +
    matchingEvents.length;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Header & Search Bar */}
      <div>
        <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#777777] mb-1 font-semibold">
          <Search className="w-3.5 h-3.5 text-[#FFD400]" />
          <span>GLOBAL INDEX</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#111111]">
          SEARCH DUX
        </h1>

        <div className="mt-4 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#777777]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stories, challenges, ideas, discussions, events..."
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-[#E5E0D5] rounded-2xl text-sm text-[#111111] placeholder:text-[#777777] focus:outline-none focus:border-[#111111] shadow-xs"
          />
        </div>
      </div>

      {query && (
        <div className="font-mono text-xs uppercase text-[#777777]">
          FOUND {totalResults} RESULTS FOR "{query}"
        </div>
      )}

      {/* Results Sections */}
      {!query ? (
        <div className="p-12 text-center bg-white border border-[#E5E0D5] rounded-3xl">
          <Search className="w-8 h-8 text-[#E5E0D5] mx-auto mb-3" />
          <p className="font-mono text-xs uppercase text-[#777777]">
            ENTER A QUERY TO SEARCH ACROSS THE ENTIRE DUX PLATFORM
          </p>
        </div>
      ) : totalResults === 0 ? (
        <div className="p-12 text-center bg-white border border-[#E5E0D5] rounded-3xl">
          <p className="font-mono text-xs uppercase text-[#777777]">
            NO MATCHING RESULTS FOUND FOR "{query}".
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Challenges */}
          {matchingChallenges.length > 0 && (
            <div className="bg-white border border-[#E5E0D5] rounded-3xl p-6 space-y-3">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#777777] flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-[#111111]" />
                <span>CHALLENGES ({matchingChallenges.length})</span>
              </span>
              <div className="divide-y divide-[#F5F1E8]">
                {matchingChallenges.map((c) => (
                  <Link
                    key={c.id}
                    to={`/challenges/${c.id}`}
                    className="py-3 flex items-center justify-between hover:text-black transition-colors block"
                  >
                    <div>
                      <h4 className="text-xs font-bold uppercase text-[#111111]">{c.title}</h4>
                      <p className="text-xs text-[#777777]">{c.shortDescription}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#777777]" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Stories */}
          {matchingStories.length > 0 && (
            <div className="bg-white border border-[#E5E0D5] rounded-3xl p-6 space-y-3">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#777777] flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#111111]" />
                <span>STORIES ({matchingStories.length})</span>
              </span>
              <div className="divide-y divide-[#F5F1E8]">
                {matchingStories.map((s) => (
                  <Link
                    key={s.id}
                    to={`/stories/${s.id}`}
                    className="py-3 flex items-center justify-between hover:text-black transition-colors block"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-[#111111]">{s.title}</h4>
                      <p className="text-xs text-[#777777]">{s.shortDescription}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#777777]" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Ideas */}
          {matchingIdeas.length > 0 && (
            <div className="bg-white border border-[#E5E0D5] rounded-3xl p-6 space-y-3">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#777777] flex items-center gap-1.5">
                <FlaskConical className="w-3.5 h-3.5 text-[#111111]" />
                <span>DUX LAB IDEAS ({matchingIdeas.length})</span>
              </span>
              <div className="divide-y divide-[#F5F1E8]">
                {matchingIdeas.map((i) => (
                  <Link
                    key={i.id}
                    to="/lab"
                    className="py-3 flex items-center justify-between hover:text-black transition-colors block"
                  >
                    <div>
                      <h4 className="text-xs font-bold uppercase text-[#111111]">{i.title}</h4>
                      <p className="text-xs text-[#777777]">{i.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#777777]" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Events */}
          {matchingEvents.length > 0 && (
            <div className="bg-white border border-[#E5E0D5] rounded-3xl p-6 space-y-3">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#777777] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#111111]" />
                <span>EVENTS ({matchingEvents.length})</span>
              </span>
              <div className="divide-y divide-[#F5F1E8]">
                {matchingEvents.map((e) => (
                  <Link
                    key={e.id}
                    to={`/events/${e.id}`}
                    className="py-3 flex items-center justify-between hover:text-black transition-colors block"
                  >
                    <div>
                      <h4 className="text-xs font-bold uppercase text-[#111111]">{e.title}</h4>
                      <p className="text-xs text-[#777777]">{e.date} · {e.location}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#777777]" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
