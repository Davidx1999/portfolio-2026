import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MoveLeft, ArrowRight } from 'lucide-react';
import { PLAYGROUND_PROJECTS } from '../data/playground';

export function PlaygroundProjectDetail() {
  const { projectId } = useParams();
  const project = PLAYGROUND_PROJECTS.find(p => p.id === projectId);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 15 } }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 bg-[var(--color-background)]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full flex flex-col"
      >
        {/* Back Link */}
        <div className="px-6 md:px-[16%] pt-8">
          <Link 
            to="/projects" 
            className="inline-flex items-center gap-2 text-neutral-carvao/60 hover:text-[var(--color-primary)] transition-colors font-mono text-xs uppercase tracking-widest font-bold"
          >
            <MoveLeft size={14} /> Back to Playground
          </Link>
        </div>

        {/* Hero Section */}
        <div className="w-full border-b border-neutral-carvao/10 mt-4 pb-16">
          <div className="px-6 md:px-[16%] grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 items-center">
            {/* Left Column: Heading, subtitle, summary */}
            <div className="flex flex-col gap-6">
              <div className="relative">
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#8b7ec8] bg-[#8b7ec8]/10 border border-[#8b7ec8]/25 px-2 py-0.5 rounded-sm w-fit mb-3 block">
                  {project.category} Experiment
                </span>
                <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-extrabold text-neutral-carvao leading-[0.9] tracking-tighter uppercase font-sans select-none">
                  {project.title}
                </h1>
                <div className="text-[var(--color-lime-500)] mt-2">
                  <svg className="w-56 h-4" viewBox="0 0 180 12" fill="none" preserveAspectRatio="none">
                    <path 
                      d="M3 9C30 5 60 3 90 4C120 5 150 7 177 5M12 10C50 9 90 8 130 7C145 6.5 160 6 172 5.5" 
                      stroke="currentColor" 
                      strokeWidth="3.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <p className="text-sm md:text-base text-neutral-carvao/75 max-w-xl leading-relaxed font-sans">
                {project.description}
              </p>

              {/* Meta details list */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-neutral-carvao/10 mt-4">
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-carvao/40 font-bold">Category</span>
                  <span className="font-sans text-xs text-neutral-carvao font-bold">{project.category}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-carvao/40 font-bold">Year</span>
                  <span className="font-mono text-xs text-neutral-carvao font-bold">{project.year}</span>
                </div>
                <div className="flex flex-col gap-1 col-span-2 md:col-span-1">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-carvao/40 font-bold">Tags</span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="border border-neutral-carvao/20 bg-background/50 rounded-full px-2.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-neutral-carvao/70 font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Decorative Vector Frame */}
            <div className="relative w-full aspect-[4/3] max-w-sm md:max-w-md mx-auto flex items-center justify-center bg-neutral-carvao/[0.02] border border-neutral-carvao/10 rounded-[2px] p-6 shadow-sm overflow-hidden select-none">
              <svg className="w-[50%] h-[50%] text-neutral-carvao/15" fill="none" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" />
                <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M50 0v100M0 50h100" stroke="currentColor" strokeWidth="0.5" />
              </svg>
              <div className="absolute right-4 bottom-4 w-8 h-8 rounded-full border border-neutral-carvao/10 bg-background flex items-center justify-center text-neutral-carvao/30 font-mono text-[9px] font-bold">
                {project.year}
              </div>
            </div>
          </div>
        </div>

        {/* Challenge & Solution */}
        <div className="w-full border-b border-neutral-carvao/10 py-16 px-6 md:px-[16%]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* The Challenge */}
            <div className="flex flex-col gap-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-neutral-carvao/45">
                01. The Challenge
              </h3>
              <p className="font-sans text-sm md:text-base text-neutral-carvao/75 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            {/* The Solution */}
            <div className="flex flex-col gap-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#E6A045]">
                02. The Solution
              </h3>
              <p className="font-sans text-sm md:text-base text-neutral-carvao/75 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>
        </div>

        {/* Process & Steps */}
        <div className="w-full border-b border-neutral-carvao/10 py-16 px-6 md:px-[16%]">
          <div className="flex flex-col gap-8">
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-neutral-carvao/45">
              03. Process & Engineering
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {project.process.map((step, idx) => (
                <div key={idx} className="flex flex-col gap-2 items-start border border-neutral-carvao/10 bg-background/50 p-5 rounded-[2px] shadow-sm">
                  <div className="w-6 h-6 rounded-full bg-[#B3A0E6]/20 border border-neutral-carvao/10 flex items-center justify-center font-mono text-[9px] font-bold text-neutral-carvao">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <span className="font-sans font-bold text-xs uppercase tracking-wide text-neutral-carvao mt-2">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Next Project footer */}
        <div className="w-full px-6 md:px-[16%] py-12">
          <Link
            to="/projects"
            className="group flex items-center justify-between border border-neutral-carvao/10 bg-background/40 hover:bg-neutral-carvao/5 p-6 rounded-[2px] transition-colors duration-300"
          >
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[8px] uppercase tracking-widest text-[#E6A045] font-bold">Browse Playground</span>
              <span className="font-sans font-bold text-base text-neutral-carvao uppercase">View All Experiments</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[var(--color-lime-500)]/30 group-hover:bg-[var(--color-lime-500)] flex items-center justify-center text-neutral-carvao transition-colors duration-300">
              <ArrowRight size={14} className="transform transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
          </Link>
        </div>

      </motion.div>
    </div>
  );
}
