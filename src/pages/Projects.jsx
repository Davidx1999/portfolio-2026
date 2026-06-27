import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, Star } from 'lucide-react';
import { PLAYGROUND_PROJECTS } from '../data/playground';
import { LimeActionButton, RotatingStamp } from '../components/Buttons';

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("ALL EXPERIMENTS");

  const filteredProjects = activeFilter === "ALL EXPERIMENTS"
    ? PLAYGROUND_PROJECTS
    : PLAYGROUND_PROJECTS.filter(p => p.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 95 } }
  };

  // Custom renderer for each project card to match the mockup's high-fidelity designs
  const renderCardVisual = (project) => {
    switch (project.id) {
      case 'kinetic-study':
        return (
          <div className="absolute inset-y-0 right-0 w-[55%] bg-[#8b7ec8]/25 flex items-center justify-center overflow-hidden border-l border-neutral-carvao/10 select-none">
            {/* MOVE MOVE kinetic text overlay */}
            <div className="font-sans font-extrabold text-5xl md:text-6xl text-[#8b7ec8] leading-none tracking-tighter uppercase rotate-[-6deg] flex flex-col gap-1 items-center opacity-85">
              <span>MOVE</span>
              <span className="text-neutral-carvao/20">MOVE</span>
              <span className="text-[#8b7ec8]/40 translate-x-4">MOVE</span>
            </div>
            {/* Small yellow wiggle line at bottom */}
            <svg className="w-16 h-3 text-[var(--color-lime-500)] absolute bottom-4 right-4" viewBox="0 0 24 24" fill="none">
              <path d="M2 18c4-2 8-4 12-2s4 4 8 2" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
          </div>
        );
      case 'type-explorations':
        return (
          <div className="absolute inset-y-0 right-0 w-[55%] bg-neutral-carvao/5 flex items-center justify-center overflow-hidden border-l border-neutral-carvao/10 select-none p-4">
            <div className="grid grid-cols-3 gap-3 font-serif text-3xl md:text-4xl text-neutral-carvao/80 font-bold items-center text-center">
              <span className="text-5xl font-sans font-extrabold text-[#E6A045]">R</span>
              <span>g</span>
              <span className="font-mono text-2xl text-neutral-carvao/40">9</span>
              <span className="font-sans text-neutral-carvao/30 font-light">E</span>
              <span className="font-sans font-extrabold text-[#8b7ec8]">k</span>
              <span className="italic font-normal">ae</span>
            </div>
          </div>
        );
      case 'poster-studies':
        return (
          <div className="absolute inset-y-0 right-0 w-[55%] bg-[#E6A045]/20 flex items-center justify-center overflow-hidden border-l border-neutral-carvao/10 p-4 select-none">
            <div className="relative w-full h-full border border-neutral-carvao/15 rounded-[2px] overflow-hidden shadow-md bg-background select-none rotate-2">
              <img
                src={`${import.meta.env.BASE_URL}assets/profile/poster_signal.png`}
                alt="Signal poster study"
                className="w-full h-full object-cover grayscale opacity-95"
              />
            </div>
          </div>
        );
      case 'ui-micro-interactions':
        return (
          <div className="absolute inset-y-0 right-0 w-[55%] bg-neutral-carvao text-background flex flex-col justify-center p-5 select-none font-mono text-[9px] border-l border-neutral-carvao/10 gap-3">
            <div className="flex items-center justify-between border-b border-background/10 pb-2">
              <span className="text-background/40">Active</span>
              <div className="w-8 h-4 rounded-full bg-[#C8E63C] p-0.5 flex justify-end cursor-pointer">
                <div className="w-3 h-3 rounded-full bg-neutral-carvao" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-5 h-5 rounded-full border border-background/25 flex items-center justify-center text-[#C8E63C] bg-background/5">+</div>
              <div className="w-5 h-5 rounded-full border border-background/25 flex items-center justify-center text-background/80 bg-background/5">✓</div>
              <div className="w-5 h-5 rounded-full border border-background/25 flex items-center justify-center text-background/40 bg-background/5">→</div>
              <div className="w-5 h-5 rounded-full bg-[#8b7ec8] flex items-center justify-center text-background">→</div>
            </div>
            <div className="w-full h-1 bg-background/15 rounded-full overflow-hidden relative">
              <div className="absolute left-0 top-0 h-full w-[60%] bg-[#8b7ec8]" />
              <div className="absolute left-[60%] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-background border border-[#8b7ec8] -translate-x-1" />
            </div>
            <div className="h-6 w-full bg-background text-neutral-carvao rounded-[2px] flex items-center justify-center font-bold tracking-wider uppercase">
              Primary Button
            </div>
          </div>
        );
      case 'generative-layouts':
        return (
          <div className="absolute inset-y-0 right-0 w-[55%] bg-[#B3A0E6]/10 flex flex-col justify-center p-4 border-l border-neutral-carvao/10 select-none overflow-hidden text-neutral-carvao/60 font-mono text-[8px] leading-tight">
            <div className="flex flex-col gap-1 pr-4 bg-background/40 p-2 rounded-sm border border-neutral-carvao/5">
              <span>for (x = 0; x &lt; 10; x++) &#123;</span>
              <span className="pl-3">for (y = 0; y &lt; 10; y++) &#123;</span>
              <span className="pl-6 text-[#8b7ec8]">let d = dist (x, y, mouseX, mouseY);</span>
              <span className="pl-6">let n = map (d, 0, 200, 0, 1);</span>
              <span className="pl-6 text-[#E6A045]">fill (n * 255);</span>
              <span className="pl-6">rect (x * 20, y * 20, 20, 20);</span>
              <span className="pl-3">&#125;</span>
              <span>&#125;</span>
            </div>
          </div>
        );
      case 'early-ideas':
        return (
          <div className="absolute inset-y-0 right-0 w-[55%] bg-neutral-carvao/5 flex items-center justify-center p-4 border-l border-neutral-carvao/10 select-none overflow-hidden">
            <div className="relative w-full h-[85%] border border-neutral-carvao/15 rounded-md overflow-hidden bg-background p-2 flex gap-1.5 shadow-sm">
              {/* Mini wireframe phone screens */}
              <div className="border border-neutral-carvao/10 rounded-sm w-[48%] h-full p-1 flex flex-col justify-between">
                <div className="h-1.5 w-6 bg-neutral-carvao/10 rounded-full" />
                <div className="flex flex-col gap-1">
                  <div className="h-1 w-full bg-[#8b7ec8]/20" />
                  <div className="h-1 w-full bg-neutral-carvao/10" />
                  <div className="h-1 w-[70%] bg-neutral-carvao/10" />
                </div>
                <div className="h-2 w-full bg-neutral-carvao/5 rounded-sm" />
              </div>
              <div className="border border-neutral-carvao/10 rounded-sm w-[48%] h-full p-1 flex flex-col justify-between">
                <div className="h-1.5 w-4 bg-[#E6A045]/30 rounded-full" />
                <div className="h-6 w-full bg-neutral-carvao/5 border border-dashed border-neutral-carvao/10 rounded-sm" />
                <div className="h-2 w-8 bg-neutral-carvao/15 rounded-sm self-end" />
              </div>
            </div>
          </div>
        );
      case 'icon-play':
        return (
          <div className="absolute inset-y-0 right-0 w-[55%] bg-neutral-carvao text-background flex items-center justify-center p-4 border-l border-neutral-carvao/10 select-none overflow-hidden">
            <div className="grid grid-cols-3 gap-3 w-full max-w-[120px] text-[var(--color-lime-500)] text-center font-bold">
              <svg className="w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 8v8M8 12h8" /></svg>
              <svg className="w-5 h-5 mx-auto text-[#B6A9ED]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /></svg>
              <svg className="w-5 h-5 mx-auto text-[#E6A045]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
              <svg className="w-5 h-5 mx-auto text-[#B6A9ED]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="6" cy="6" r="3" /><circle cx="18" cy="6" r="3" /><path d="M6 9v6" /></svg>
              <svg className="w-5 h-5 mx-auto text-[#E6A045]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <svg className="w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
            </div>
          </div>
        );
      case 'loop-studies':
        return (
          <div className="absolute inset-y-0 right-0 w-[55%] bg-neutral-carvao flex items-center justify-center overflow-hidden border-l border-neutral-carvao/10 p-4 select-none">
            <div className="relative w-full h-full border border-background/10 rounded-[2px] overflow-hidden shadow-md bg-neutral-carvao select-none">
              <img
                src={`${import.meta.env.BASE_URL}assets/profile/loop_vortex.png`}
                alt="Loop studies vortex"
                className="w-full h-full object-cover grayscale opacity-90 contrast-125"
              />
              <div className="absolute bottom-2 left-2 w-5 h-5 rounded-full bg-[var(--color-lime-500)]/30 border border-neutral-carvao/15 flex items-center justify-center text-neutral-carvao cursor-pointer hover:bg-[var(--color-lime-500)] transition-colors">
                <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </div>
          </div>
        );
      default:
        if (project.image) {
          const isNoGrayscale = project.id === 'vincenzo' || project.id === 'focusly';
          const hasHoverImage = !!project.imageHover;
          
          return (
            <div className="absolute inset-y-0 right-0 w-[55%] h-full overflow-hidden border-l border-neutral-carvao/10 select-none relative group/img bg-neutral-carvao/5">
              {hasHoverImage ? (
                <>
                  {/* Base Image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-700 ease-out ${
                      isNoGrayscale ? '' : 'grayscale group-hover/card:grayscale-0'
                    } group-hover/card:opacity-0 scale-100 group-hover/card:scale-[1.02]`}
                  />
                  {/* Hover Image */}
                  <img
                    src={project.imageHover}
                    alt={`${project.title} hover`}
                    className={`w-full h-full object-cover absolute inset-0 opacity-0 transition-all duration-700 ease-out ${
                      isNoGrayscale ? '' : 'grayscale group-hover/card:grayscale-0'
                    } group-hover/card:opacity-100 scale-[1.01] group-hover/card:scale-[1.02]`}
                  />
                </>
              ) : (
                <img
                  src={project.image}
                  alt={project.title}
                  className={`w-full h-full object-cover ${
                    isNoGrayscale ? '' : 'grayscale group-hover/card:grayscale-0'
                  } transition-all duration-750 ease-out scale-100 group-hover/card:scale-[1.02]`}
                />
              )}
              {/* Repeating paper texture overlay */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay bg-repeat z-10"
                style={{ 
                  backgroundImage: `url('${import.meta.env.BASE_URL}assets/Textures/texture.png')`, 
                  backgroundSize: '120px 120px' 
                }}
              />
            </div>
          );
        }
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 bg-[var(--color-background)]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full flex flex-col"
      >
        {/* Row 1: Hero */}
        <div className="w-full border-b border-neutral-carvao/10">
          <div className="px-4 md:px-[calc(16%-24px)] py-12 md:py-16 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 items-center">
            {/* Left side */}
            <div className="flex flex-col gap-6">
              <div className="relative">
                <img 
                  src={`${import.meta.env.BASE_URL}assets/titles/projects.png`} 
                  alt="Projects" 
                  className="w-full max-w-[320px] md:max-w-[420px] h-auto object-contain select-none"
                />
              </div>

              <div className="relative">
                <h2 className="text-title-h2 font-extrabold text-neutral-carvao leading-snug tracking-tight uppercase max-w-xl font-sans">
                  A space for <span className="text-[#E6A045]">experimentation</span>, curiosity and <span className="text-[var(--color-primary)]">creative play.</span>
                </h2>
                <svg className="absolute -right-8 top-0 w-6 h-6 text-neutral-carvao/30 hidden sm:block animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 3.143L13 22l-2.286-6.857L5 12l5.714-3.143L13 3z" />
                </svg>
              </div>

              <p className="text-body-lg text-neutral-carvao/75 max-w-lg leading-relaxed font-sans">
                Ideas in progress. Visual experiments, motion studies, type explorations and early prototypes. Where direction starts to take shape.
              </p>

              <div className="flex items-center gap-6 mt-2">
                <LimeActionButton
                  as="a"
                  href="mailto:davidsalviano52@gmail.com"
                >
                  How I experiment
                </LimeActionButton>
              </div>
            </div>

            {/* Right side collage */}
            <div className="grid grid-cols-1 gap-4 max-w-sm md:max-w-md mx-auto w-full">
              <div className="grid grid-cols-[1.5fr_1fr] gap-4">
                {/* Block 1: Eye image */}
                <div className="border border-neutral-carvao/10 rounded-[2px] overflow-hidden aspect-square">
                  <img src={`${import.meta.env.BASE_URL}assets/apoio/eye.jpg`} alt="Eye details" className="w-full h-full object-cover grayscale" />
                </div>
                {/* Block 2: Purple text block */}
                <div className="bg-[#B3A0E6]/25 border border-neutral-carvao/10 rounded-[2px] flex flex-col justify-center p-5 font-mono text-[9px] uppercase tracking-widest font-bold text-[#5c567a] shadow-sm">
                  <span className="border-b border-[#5c567a]/20 py-1.5">EXPLORE</span>
                  <span className="border-b border-[#5c567a]/20 py-1.5">PLAY</span>
                  <span className="border-b border-[#5c567a]/20 py-1.5">ITERATE</span>
                  <span className="py-1.5">REPEAT</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Block 3: Orbit graphic */}
                <div className="border border-neutral-carvao/10 bg-background rounded-[2px] flex items-center justify-center relative aspect-square p-4 overflow-hidden">
                  {/* Orbit SVG */}
                  <svg className="w-full h-full text-neutral-carvao/30" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                    <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="1" />
                    <circle cx="75" cy="50" r="3" fill="currentColor" className="text-[#8b7ec8]" />
                    <path d="M50 25 A 25 25 0 0 1 75 50" stroke="#8b7ec8" strokeWidth="2" />
                  </svg>
                </div>
                {/* Block 4: Orange star shape */}
                <div className="bg-[#E6A045]/10 border border-[#E6A045]/30 rounded-[2px] flex items-center justify-center relative aspect-square p-4">
                  <svg className="w-14 h-14 text-[#E6A045]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707" />
                    <circle cx="12" cy="12" r="5" fill="currentColor" className="opacity-10" />
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-[2fr_1fr] gap-4">
                {/* Block 5: Typography Aa Card */}
                <div className="bg-[#B3A0E6]/10 border border-neutral-carvao/10 rounded-[2px] p-4 flex flex-col justify-between aspect-[2/1] relative overflow-hidden shadow-sm">
                  <div className="flex gap-4 items-baseline">
                    <span className="font-sans font-extrabold text-3xl text-neutral-carvao">Aa</span>
                    <span className="font-serif font-bold text-2xl text-neutral-carvao/60">A</span>
                    <span className="font-mono text-xl text-neutral-carvao/40">A</span>
                    <span className="font-sans font-light text-base text-neutral-carvao/30">A</span>
                  </div>
                  <div className="grid grid-cols-4 font-mono text-[7px] text-neutral-carvao/40 uppercase tracking-wider text-center mt-2 border-t border-neutral-carvao/5 pt-2">
                    <span>Condensed</span>
                    <span>Expanded</span>
                    <span>Grid Fit</span>
                    <span>Playful</span>
                  </div>
                </div>
                {/* Block 6: Asterisk square */}
                <div className="bg-neutral-carvao rounded-[2px] flex items-center justify-center aspect-square shadow-md">
                  <svg className="w-8 h-8 text-[var(--color-lime-500)] fill-current" viewBox="0 0 100 100">
                    <path d="M46 15 h8 v70 h-8 z" />
                    <path d="M15 46 h70 v8 h-70 z" />
                    <path d="M24.75 30.41 l49.5 49.5 l-5.66 5.66 l-49.5 -49.5 z" />
                    <path d="M74.25 30.41 l-49.5 49.5 l-5.66 -5.66 l49.5 -49.5 z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Filters and Grid of Cards */}
        <div className="w-full border-b border-neutral-carvao/10">
          <div className="px-4 md:px-[calc(16%-24px)] py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 items-center">
              {["ALL EXPERIMENTS", "MOTION", "TYPE", "POSTERS", "INTERACTIONS", "CODE EXPERIMENTS", "PROTOTYPES"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-4 py-1.5 font-mono text-[9px] uppercase tracking-wider rounded-full border transition-all duration-300 font-bold ${
                    activeFilter === tab 
                      ? 'bg-neutral-carvao text-background border-neutral-carvao shadow-sm'
                      : 'bg-background/50 border-neutral-carvao/15 text-neutral-carvao hover:border-neutral-carvao/40'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 font-mono text-[9px] font-bold text-neutral-carvao/45 uppercase tracking-widest self-end md:self-auto">
              <span>Sort By:</span>
              <span className="text-neutral-carvao underline cursor-pointer hover:text-[var(--color-primary)]">Latest</span>
            </div>
          </div>

          {/* Playground Bento Grid */}
          <div className="px-4 md:px-[calc(16%-24px)] pb-16 w-full">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {filteredProjects.map((p) => (
                <Link
                  key={p.id}
                  to={`/project/${p.id}`}
                  className="group relative h-48 border border-neutral-carvao/10 rounded-[2px] bg-background overflow-hidden shadow-sm flex hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  {/* Left Side Info (45%) */}
                  <div className="w-[45%] p-5 flex flex-col justify-between relative z-10">
                    <div className="flex flex-col gap-1.5">
                      <span className="font-mono text-[8px] uppercase tracking-widest text-[#8b7ec8] font-bold">
                        {p.category}
                      </span>
                      <h3 className="font-sans font-bold text-title-h3 text-neutral-carvao uppercase tracking-tight leading-none group-hover:text-[var(--color-primary)] transition-colors">
                        {p.title}
                      </h3>
                      <p className="font-sans text-body-sm text-neutral-carvao/60 mt-2 leading-relaxed line-clamp-3">
                        {p.description}
                      </p>
                    </div>
                    {/* View project button indicator */}
                    <div className="w-5 h-5 rounded-full border border-neutral-carvao/10 bg-background flex items-center justify-center text-neutral-carvao group-hover:bg-[var(--color-lime-500)] transition-colors duration-300">
                      <ArrowRight size={10} className="transform transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </div>

                  {/* Right Side Visual (55%) */}
                  {renderCardVisual(p)}
                </Link>
              ))}
            </motion.div>
            {filteredProjects.length === 0 && (
              <div className="py-16 text-center font-sans text-sm text-neutral-carvao/50 border-t border-neutral-carvao/10 mt-8">
                No experiments in this category yet.
              </div>
            )}
          </div>
        </div>

        {/* Row 3: Featured Experiment */}
        <div className="w-full border-b border-neutral-carvao/10 py-16 px-4 md:px-[calc(16%-24px)]">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--color-lime-500)]" />
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-neutral-carvao/45">
              Featured Experiment
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_2.5fr_1.5fr] gap-0 border border-neutral-carvao/15 rounded-sm overflow-hidden shadow-md bg-background">
            {/* Column 1: Info */}
            <div className="bg-[#B3A0E6]/10 p-8 flex flex-col justify-between border-b lg:border-b-0 border-neutral-carvao/10">
              <div className="flex flex-col gap-6">
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#8b7ec8] bg-[#8b7ec8]/10 border border-[#8b7ec8]/25 px-2 py-0.5 rounded-sm w-fit">
                  Interactions
                </span>
                <div className="flex flex-col gap-2">
                  <h4 className="font-sans font-extrabold text-title-h3 text-neutral-carvao uppercase tracking-tight leading-none">
                    Fluid Grid
                  </h4>
                  <span className="font-sans text-body-sm font-medium text-neutral-carvao/60">Interface Concept</span>
                </div>
                <p className="font-sans text-body-base text-neutral-carvao/75 leading-relaxed">
                  An interface concept that adapts, reflows and rethinks structure in real time. Built to explore responsive component boundaries.
                </p>
              </div>

              <Link
                to="/project/ui-micro-interactions"
                className="group w-fit mt-8 flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-widest text-neutral-carvao hover:text-[#8b7ec8] transition-colors py-2 cursor-pointer"
              >
                <span>View Experiment</span>
                <ArrowRight size={12} className="transform transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Column 2: Devices Mockups */}
            <div className="bg-neutral-carvao/5 relative overflow-hidden aspect-[4/3] flex items-center justify-center p-6 border-b lg:border-b-0 lg:border-x border-neutral-carvao/10 select-none">
              <div className="relative w-[90%] h-[90%] flex gap-4 items-center justify-center">
                {/* Tablet Frame */}
                <div className="w-[60%] h-[85%] border border-neutral-carvao/25 rounded-md overflow-hidden bg-background shadow-lg relative flex flex-col p-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-neutral-carvao/20 self-center mb-2" />
                  <div className="flex-1 border border-neutral-carvao/10 rounded-sm p-3 flex flex-col justify-between">
                    <span className="font-sans font-extrabold text-base text-neutral-carvao leading-none">Ideas<br />shaped by<br />curiosity.</span>
                    <div className="w-8 h-8 rounded-full border border-neutral-carvao/10 bg-[#B3A0E6]/10 flex items-center justify-center text-neutral-carvao/40">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 8v8M8 12h8" /></svg>
                    </div>
                  </div>
                </div>
                {/* Phone Frame */}
                <div className="w-[35%] h-[75%] border border-neutral-carvao/25 rounded-md overflow-hidden bg-background shadow-lg relative flex flex-col p-1.5 -translate-y-2">
                  <div className="h-1 w-8 bg-neutral-carvao/25 rounded-full mx-auto mb-1.5" />
                  <div className="flex-1 border border-neutral-carvao/10 rounded-sm p-2 flex flex-col justify-between">
                    <div className="h-1 w-full bg-neutral-carvao/10" />
                    <div className="h-10 w-full bg-[#E6A045]/10 border border-[#E6A045]/30 rounded-sm" />
                    <div className="h-2 w-full bg-neutral-carvao/5 rounded-sm" />
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Bullet Specs */}
            <div className="bg-[#E6A045]/15 p-8 flex flex-col justify-center gap-6">
              {[
                "ADAPTIVE LAYOUT", "REAL TIME REFLOW", "CONTENT AWARE", "LIGHTWEIGHT PROTOTYPE"
              ].map((spec) => (
                <div key={spec} className="flex items-center gap-3 pb-3 border-b border-neutral-carvao/5">
                  <div className="w-4 h-4 rounded-full bg-[#E6A045] flex items-center justify-center text-background">
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="font-sans font-bold text-xs uppercase tracking-wide text-neutral-carvao">
                    {spec}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 4: bottom CTA banner */}
        <div className="w-full px-4 md:px-[calc(16%-24px)] py-12">
          <div className="bg-[#B3A0E6]/5 border border-neutral-carvao/10 rounded-sm relative overflow-hidden flex flex-col lg:flex-row items-center justify-between p-8 md:p-12 gap-8 shadow-sm">
            <div className="flex flex-col gap-3 max-w-lg text-center lg:text-left">
              <h3 className="font-sans font-extrabold text-title-h2 text-neutral-carvao leading-none uppercase tracking-tight">
                There's always <span className="text-[#E6A045]">more</span> to explore.
              </h3>
              <p className="font-sans text-body-base text-neutral-carvao/70 leading-relaxed">
                New experiments, ideas and prototypes are always in the works. Let's build something great together.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 z-10 w-full sm:w-auto justify-center">
              <LimeActionButton
                as="a"
                href="mailto:davidsalviano52@gmail.com"
              >
                Let's connect
              </LimeActionButton>
            </div>

            {/* Rotating Stamp */}
            <div className="absolute right-4 top-4 lg:relative lg:right-auto lg:top-auto z-0 scale-75 opacity-20 lg:opacity-100 flex-shrink-0">
              <RotatingStamp 
                text="AVAILABLE FOR NEW PROJECTS • AVAILABLE FOR NEW PROJECTS •" 
                icon={Star}
              />
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
