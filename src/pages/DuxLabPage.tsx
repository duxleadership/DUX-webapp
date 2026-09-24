import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FlaskConical,
  Plus,
  ArrowUp,
  Tag,
  Lightbulb,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Modal } from '../components/ui/CommonUI';
import { LabIdea } from '../types';

export const DuxLabPage: React.FC = () => {
  const { ideas, submitIdea, toggleUpvoteIdea } = useApp();

  const [selectedSection, setSelectedSection] = useState<string>('ALL');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<LabIdea['category']>('Startup Ideas');
  const [tagsInput, setTagsInput] = useState('');

  const sections = ['ALL', 'Ideas', 'Projects', 'Experiments', 'Creative Work', 'Startup Ideas'];

  const filteredIdeas = selectedSection === 'ALL'
    ? ideas
    : ideas.filter((idea) => idea.category === selectedSection);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    submitIdea(title, description, category, tags);

    setTitle('');
    setDescription('');
    setTagsInput('');
    setIsSubmitModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#777777] mb-1 font-semibold">
            <FlaskConical className="w-3.5 h-3.5 text-[#FFD400]" />
            <span>INCUBATOR & SANDBOX</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#111111]">
            THINK. EXPERIMENT. BUILD.
          </h1>
          <p className="text-sm text-[#777777] font-medium mt-1">
            The DUX Laboratory is where raw hunches turn into prototypes, experiments, and startup ventures.
          </p>
        </div>

        <button
          onClick={() => setIsSubmitModalOpen(true)}
          className="self-start sm:self-center px-6 py-3 bg-[#111111] text-white hover:bg-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#FFD400]" />
          <span>+ SUBMIT AN IDEA</span>
        </button>
      </div>

      {/* Sections Tab Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-[#E5E0D5]">
        {sections.map((sec) => (
          <button
            key={sec}
            type="button"
            onClick={() => setSelectedSection(sec)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              selectedSection === sec
                ? 'bg-[#111111] text-white shadow-xs'
                : 'bg-white text-[#777777] hover:text-[#111111] hover:bg-[#F5F1E8] border border-[#E5E0D5]'
            }`}
          >
            {sec}
          </button>
        ))}
      </div>

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIdeas.map((idea) => (
          <div
            key={idea.id}
            className="p-6 bg-white border border-[#E5E0D5] rounded-3xl flex flex-col justify-between hover:border-[#111111] transition-all shadow-xs group"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-[#777777] mb-3">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#111111] bg-[#F5F1E8] px-2 py-0.5 rounded-md">
                  {idea.category}
                </span>
                <span className="font-mono text-[10px] uppercase font-bold text-emerald-700">
                  {idea.status}
                </span>
              </div>

              <h3 className="text-lg font-black uppercase tracking-tight text-[#111111] mb-2 leading-snug">
                {idea.title}
              </h3>

              <p className="text-xs text-[#777777] leading-relaxed mb-4">
                {idea.description}
              </p>

              {/* Tags (Zero-pill compliant metadata) */}
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-[#777777] mb-4">
                {idea.tags.map((t, idx) => (
                  <span key={idx} className="font-mono">
                    #{t} {idx < idea.tags.length - 1 ? '·' : ''}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#F5F1E8] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={idea.author.avatar}
                  alt={idea.author.name}
                  className="w-6 h-6 rounded-full object-cover border border-[#111111]/15"
                />
                <span className="text-[11px] text-[#777777] font-mono">
                  @{idea.author.username}
                </span>
              </div>

              <button
                type="button"
                onClick={() => toggleUpvoteIdea(idea.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                  idea.isUpvoted
                    ? 'border-[#111111] bg-[#111111] text-[#FFD400]'
                    : 'border-[#E5E0D5] bg-[#FBF9F5] text-[#111111] hover:border-[#111111]'
                }`}
              >
                <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{idea.upvotesCount}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Idea Modal */}
      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title="SUBMIT LAB EXPERIMENT"
        subtitle="Pitch an idea, tool, or hypothesis. Earn +50 DUX Points."
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1.5">
              Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Offline Direction Circles"
              className="w-full p-2.5 bg-[#FBF9F5] border border-[#E5E0D5] rounded-xl text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full p-2.5 bg-[#FBF9F5] border border-[#E5E0D5] rounded-xl text-xs text-[#111111] font-mono focus:outline-none focus:border-[#111111]"
            >
              <option value="Ideas">Ideas</option>
              <option value="Projects">Projects</option>
              <option value="Experiments">Experiments</option>
              <option value="Creative Work">Creative Work</option>
              <option value="Startup Ideas">Startup Ideas</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1.5">
              Description
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain the problem, proposed solution, and what feedback or collaborators you are looking for."
              className="w-full p-2.5 bg-[#FBF9F5] border border-[#E5E0D5] rounded-xl text-xs text-[#111111] focus:outline-none focus:border-[#111111] resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1.5">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Productivity, Hardware, Future of Work"
              className="w-full p-2.5 bg-[#FBF9F5] border border-[#E5E0D5] rounded-xl text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsSubmitModalOpen(false)}
              className="px-4 py-2.5 border border-[#E5E0D5] text-[#777777] text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#111111] text-white hover:bg-black text-xs font-bold uppercase tracking-wider rounded-xl shadow-md cursor-pointer"
            >
              Submit Idea (+50 PTS)
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
