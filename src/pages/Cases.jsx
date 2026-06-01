import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { LimeActionButton, RotatingStamp } from '../components/Buttons';

const casesList = [
  {
    id: "focusly",
    number: "01",
    title: "FOCUSLY",
    subtitle: "Productivity App",
    category: "PRODUCT",
    description: "A clean and motivating productivity app that helps users build better routines, stay focused, and track progress with clarity.",
    role: "Product Designer",
    disciplines: ["UX / UI Design", "Prototyping"],
    year: "2024",
    link: "/project/focusly",
    icon: (
      <svg className="w-6 h-6 text-neutral-carvao/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <circle cx="12" cy="18" r="1" fill="currentColor" />
      </svg>
    ),
    challenge: "Users struggle to maintain focus in a world of constant digital distractions. Existing apps overwhelm with complex workflows and lack of emotional connection.",
    solution: "We designed a minimal, engaging mobile experience that combines simple planning, timed focus sessions, and insightful feedback to build solid routines."
  },
  {
    id: "forma-studio",
    number: "02",
    title: "FORMA STUDIO",
    subtitle: "Design Agency Website",
    category: "WEB",
    description: "A minimal, editorial website designed to reflect the studio's philosophy and showcase selected work.",
    role: "Lead Designer",
    disciplines: ["Web Design", "Development"],
    year: "2024",
    link: "/project/forma-studio",
    icon: (
      <svg className="w-6 h-6 text-neutral-carvao/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10m0-20a15.3 15.3 0 00-4 10 15.3 15.3 0 004 10M2 12h20" />
      </svg>
    ),
    challenge: "The agency needed a website that served not just as a portfolio, but as a direct statement of their minimal design philosophy and detail-oriented approach.",
    solution: "A highly typographic, grid-locked editorial web experience that displays work with maximum whitespace, subtle parallax, and smooth transitions."
  },
  {
    id: "aurora",
    number: "03",
    title: "AURORA",
    subtitle: "Brand Identity",
    category: "BRAND",
    description: "Brand identity and packaging for a wellness brand focused on natural ingredients and everyday rituals.",
    role: "Brand Designer",
    disciplines: ["Branding", "Packaging"],
    year: "2023",
    link: "/project/aurora",
    icon: (
      <svg className="w-6 h-6 text-neutral-carvao/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    challenge: "Entering a crowded wellness market, Aurora needed a visual identity that felt premium, organic, and grounded in ancient self-care rituals.",
    solution: "Developed a holistic brand identity centered around elegant custom typography, a warm earthy color palette, and premium minimalist packaging systems."
  },
  {
    id: "lattice",
    number: "04",
    title: "LATTICE",
    subtitle: "Design System",
    category: "SYSTEMS",
    description: "A scalable design system that brings consistency, accessibility, and speed to product teams.",
    role: "Design Systems Lead",
    disciplines: ["UI Design", "Design Systems"],
    year: "2023",
    link: "/project/lattice",
    icon: (
      <svg className="w-6 h-6 text-neutral-carvao/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="18" r="3" />
        <path d="M9 6h6M9 18h6M6 9v6M18 9v6" strokeDasharray="2 2" />
      </svg>
    ),
    challenge: "With multiple engineering teams building overlapping features, product UI was becoming fragmented and accessibility audits were consistently failing.",
    solution: "Created a component-driven design system with strict accessibility compliance, built with React token architectures and clear design guidelines."
  }
];

export function Cases() {
  const [expandedId, setExpandedId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("ALL CASES");

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredCases = activeFilter === "ALL CASES" 
    ? casesList 
    : casesList.filter(c => c.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 95 } }
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
          <div className="px-6 md:px-[16%] py-12 md:py-16 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 items-center">
            <div className="flex flex-col gap-6">
              <div className="relative">
                <img 
                  src={`${import.meta.env.BASE_URL}assets/titles/cases.png`} 
                  alt="Cases" 
                  className="w-full max-w-[280px] md:max-w-[360px] h-auto object-contain select-none"
                />
              </div>

              <div className="relative">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-neutral-carvao leading-snug tracking-tight uppercase max-w-xl font-sans">
                  In-depth case studies that explore <span className="text-[#E6A045]">strategy</span>, process, and <span className="text-[var(--color-primary)]">impact.</span>
                </h2>
                <svg className="absolute -right-8 top-0 w-6 h-6 text-neutral-carvao/30 hidden sm:block animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 3.143L13 22l-2.286-6.857L5 12l5.714-3.143L13 3z" />
                </svg>
              </div>

              <p className="text-sm md:text-base text-neutral-carvao/75 max-w-lg leading-relaxed font-sans">
                A closer look at selected projects—framing problems, shaping solutions, and delivering meaningful outcomes through thoughtful design and collaboration.
              </p>
            </div>

            {/* Right side collage */}
            <div className="grid grid-cols-1 gap-4 max-w-sm md:max-w-md mx-auto w-full">
              <div className="grid grid-cols-2 gap-4">
                {/* Block 1: Eye image */}
                <div className="border border-neutral-carvao/10 rounded-[2px] overflow-hidden aspect-square">
                  <img src={`${import.meta.env.BASE_URL}assets/apoio/eye.jpg`} alt="Eye details" className="w-full h-full object-cover grayscale" />
                </div>
                {/* Block 2: Purple text block */}
                <div className="bg-[#B3A0E6]/25 border border-neutral-carvao/10 rounded-[2px] flex flex-col justify-center p-5 font-mono text-[9px] uppercase tracking-widest font-bold text-[#5c567a] shadow-sm">
                  <span className="border-b border-[#5c567a]/20 py-2">DESIGN</span>
                  <span className="border-b border-[#5c567a]/20 py-2">THINKER</span>
                  <span className="border-b border-[#5c567a]/20 py-2">PROBLEM</span>
                  <span className="py-2">SOLVER</span>
                </div>
              </div>
              
              {/* Block 3: Hands sketching */}
              <div className="border border-neutral-carvao/10 rounded-[2px] overflow-hidden aspect-[16/9] w-full shadow-md">
                <img src={`${import.meta.env.BASE_URL}assets/profile/cases_hands.png`} alt="Hands sketching" className="w-full h-full object-cover grayscale" />
              </div>
              
              <div className="grid grid-cols-[1.5fr_1fr] gap-4">
                {/* Block 4: Purple curve block */}
                <div className="bg-[#B3A0E6]/10 border border-neutral-carvao/10 rounded-[2px] overflow-hidden relative aspect-[2/1] flex items-center justify-center">
                  <svg className="w-full h-full text-[#8b7ec8]/30" viewBox="0 0 100 50" fill="none">
                    <path d="M0 50 C25 10, 75 10, 100 50" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M0 45 C25 5, 75 5, 100 45" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                  </svg>
                </div>
                {/* Block 5: Asterisk square */}
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

        {/* Row 2: Filters and Accordion List */}
        <div className="w-full border-b border-neutral-carvao/10">
          <div className="px-6 md:px-[16%] py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 items-center">
              {["ALL CASES", "PRODUCT", "BRAND", "WEB", "SYSTEMS", "EXPERIMENTATION"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveFilter(tab);
                    setExpandedId(null);
                  }}
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

            {/* Sort options */}
            <div className="flex items-center gap-2 font-mono text-[9px] font-bold text-neutral-carvao/45 uppercase tracking-widest self-end md:self-auto">
              <span>Sort By:</span>
              <span className="text-neutral-carvao underline cursor-pointer hover:text-[var(--color-primary)]">Newest</span>
            </div>
          </div>

          {/* Cases Accordion List */}
          <div className="px-6 md:px-[16%] pb-12 w-full">
            <div className="border-t border-neutral-carvao/10 divide-y divide-neutral-carvao/10">
              <AnimatePresence>
                {filteredCases.map((c) => {
                  const isExpanded = expandedId === c.id;
                  return (
                    <motion.div
                      key={c.id}
                      layout="position"
                      variants={itemVariants}
                      className="w-full overflow-hidden flex flex-col"
                    >
                      {/* Accordion Header */}
                      <div
                        onClick={() => toggleExpand(c.id)}
                        className={`w-full grid grid-cols-[auto_1fr] md:grid-cols-[40px_60px_2fr_1.2fr_1.5fr_1fr_auto] items-center gap-4 md:gap-6 py-6 md:py-8 px-4 -mx-4 transition-all duration-300 hover:bg-neutral-carvao/5 cursor-pointer ${
                          isExpanded ? 'bg-neutral-carvao/[0.03]' : ''
                        }`}
                      >
                        {/* Number blob */}
                        <div className="w-8 h-6 flex items-center justify-center bg-[#B3A0E6]/25 text-neutral-carvao font-mono text-[10px] font-bold rounded-[30%_70%_70%_30%_/_50%_60%_40%_50%]">
                          {c.number}
                        </div>

                        {/* Icon */}
                        <div className="hidden md:flex items-center justify-center">
                          {c.icon}
                        </div>

                        {/* Title & category */}
                        <div className="flex flex-col gap-1 pr-4">
                          <span className="font-mono text-[8px] uppercase tracking-widest text-[var(--color-primary)] font-bold">
                            {c.category}
                          </span>
                          <h3 className="font-sans font-bold text-lg md:text-xl text-neutral-carvao leading-none">
                            {c.title}
                          </h3>
                          <span className="font-sans text-xs text-neutral-carvao/50 mt-0.5">{c.subtitle}</span>
                        </div>

                        {/* Role */}
                        <div className="hidden md:flex flex-col gap-0.5">
                          <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-carvao/40">Role</span>
                          <span className="font-sans text-xs text-neutral-carvao font-semibold leading-tight">{c.role}</span>
                        </div>

                        {/* Disciplines */}
                        <div className="hidden md:flex flex-col gap-0.5">
                          <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-carvao/40">Disciplines</span>
                          <span className="font-sans text-xs text-neutral-carvao/75 leading-tight">
                            {c.disciplines.join(" & ")}
                          </span>
                        </div>

                        {/* Year */}
                        <div className="hidden md:flex flex-col gap-0.5">
                          <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-carvao/40">Year</span>
                          <span className="font-mono text-xs text-neutral-carvao/70">{c.year}</span>
                        </div>

                        {/* View case button */}
                        <div className="flex items-center justify-end">
                          <div className="flex flex-col items-center gap-1 group/btn">
                            <div className="w-8 h-8 rounded-full border border-neutral-carvao/10 bg-[var(--color-lime-500)]/30 group-hover/btn:bg-[var(--color-lime-500)] flex items-center justify-center text-neutral-carvao transition-colors duration-300">
                              <ArrowRight size={14} className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
                            </div>
                            <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-neutral-carvao/60 mt-0.5">
                              {isExpanded ? 'CLOSE' : 'VIEW CASE'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Accordion Expanded Content */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                          >
                            <div className="border-t border-neutral-carvao/5 bg-neutral-carvao/[0.015] px-6 py-8 flex flex-col lg:flex-row gap-8 items-start justify-between -mx-4">
                              <div className="flex-1 max-w-2xl flex flex-col gap-4 font-sans text-sm text-neutral-carvao/80 leading-relaxed pr-2">
                                <p className="font-bold text-neutral-carvao uppercase text-xs tracking-wider">Project Summary</p>
                                <p>{c.description}</p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2 pt-4 border-t border-neutral-carvao/10">
                                  <div>
                                    <span className="font-bold text-neutral-carvao text-xs uppercase block mb-1">The Challenge</span>
                                    <p className="text-xs text-neutral-carvao/75">{c.challenge}</p>
                                  </div>
                                  <div>
                                    <span className="font-bold text-[#E6A045] text-xs uppercase block mb-1">The Solution</span>
                                    <p className="text-xs text-neutral-carvao/75">{c.solution}</p>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex-shrink-0 w-full lg:w-auto flex flex-col justify-end h-full gap-4 mt-4 lg:mt-8 self-end">
                                <Link
                                  to={c.link}
                                  className="w-full lg:w-auto bg-neutral-carvao text-background hover:bg-[var(--color-primary)] px-6 py-3 rounded-sm font-mono text-[9px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-md"
                                >
                                  <span>Read Full Case Study</span>
                                  <ArrowRight size={12} />
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
            {filteredCases.length === 0 && (
              <div className="py-16 text-center font-sans text-sm text-neutral-carvao/50 border-t border-neutral-carvao/10">
                No cases found for this category yet. Stay tuned for experiments!
              </div>
            )}
          </div>
        </div>

        {/* Row 3: Featured Case (Field Notes) */}
        <div className="w-full border-b border-neutral-carvao/10 py-16 px-6 md:px-[16%]">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--color-lime-500)]" />
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-neutral-carvao/45">
              Featured Case
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_2.5fr_1.5fr] gap-0 border border-neutral-carvao/15 rounded-sm overflow-hidden shadow-md bg-background">
            {/* Column 1: Info */}
            <div className="bg-[#B3A0E6]/15 p-8 flex flex-col justify-between border-b lg:border-b-0 border-neutral-carvao/10">
              <div className="flex flex-col gap-6">
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#8b7ec8] bg-[#8b7ec8]/10 border border-[#8b7ec8]/25 px-2 py-0.5 rounded-sm w-fit">
                  Editorial Case
                </span>
                <div className="flex flex-col gap-2">
                  <h4 className="font-sans font-extrabold text-2xl text-neutral-carvao uppercase tracking-tight leading-none">
                    Field Notes
                  </h4>
                  <span className="font-sans text-sm font-medium text-neutral-carvao/60">Editorial Website</span>
                </div>
                <p className="font-sans text-xs text-neutral-carvao/75 leading-relaxed">
                  A content-driven website for a publication sharing insights on creativity, design, and culture. Focuses on immersive reading layouts.
                </p>
              </div>

              <a
                href="#"
                className="group w-fit mt-8 flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-widest text-neutral-carvao hover:text-[#8b7ec8] transition-colors py-2 cursor-pointer"
              >
                <span>View Case Study</span>
                <ArrowRight size={12} className="transform transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            {/* Column 2: Web Mockup */}
            <div className="bg-neutral-carvao/5 relative overflow-hidden aspect-[4/3] flex items-center justify-center p-6 border-b lg:border-b-0 lg:border-x border-neutral-carvao/10">
              <div className="relative w-full h-full border border-neutral-carvao/25 rounded-md overflow-hidden shadow-lg bg-neutral-carvao/5 select-none">
                {/* Browser top bar */}
                <div className="h-6 bg-neutral-carvao/10 border-b border-neutral-carvao/15 flex items-center px-3 gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-carvao/30" />
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-carvao/30" />
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-carvao/30" />
                  <div className="h-3 w-32 bg-background border border-neutral-carvao/5 rounded-sm mx-auto flex items-center justify-center text-[7px] font-mono text-neutral-carvao/40">
                    fieldnotes.publication
                  </div>
                </div>
                <img
                  src={`${import.meta.env.BASE_URL}assets/profile/field_notes_mock.png`}
                  alt="Field Notes web mockup"
                  className="w-full h-[calc(100%-24px)] object-cover grayscale opacity-95"
                />
              </div>
            </div>

            {/* Column 3: Meta details */}
            <div className="bg-[#E6A045]/15 p-8 flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-6">
                {[
                  { label: "Role", val: "Lead Designer" },
                  { label: "Disciplines", val: "UX / UI Design, Development" },
                  { label: "Year", val: "2024" },
                  { label: "Duration", val: "Jan - Mar 2024" },
                  { label: "Platform", val: "Web" },
                  { label: "Team", val: "2 Designers, 1 Developer" }
                ].map((item) => (
                  <div key={item.label} className="flex flex-col gap-0.5 pb-2 border-b border-neutral-carvao/5">
                    <span className="font-mono text-[8px] uppercase tracking-widest text-[#E6A045] font-bold">
                      {item.label}
                    </span>
                    <span className="font-sans text-xs text-neutral-carvao font-bold">
                      {item.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Row 4: bottom CTA banner */}
        <div className="w-full px-6 md:px-[16%] py-12">
          <div className="bg-[#B3A0E6]/5 border border-neutral-carvao/10 rounded-sm relative overflow-hidden flex flex-col lg:flex-row items-center justify-between p-8 md:p-12 gap-8 shadow-sm">
            <div className="flex flex-col gap-3 max-w-lg text-center lg:text-left">
              <h3 className="font-sans font-extrabold text-2xl text-neutral-carvao leading-none uppercase tracking-tight">
                Interested in working <span className="text-[#E6A045]">together?</span>
              </h3>
              <p className="font-sans text-xs md:text-sm text-neutral-carvao/70 leading-relaxed">
                I'm open to new opportunities and exciting collaborations. Let's build something great.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 z-10 w-full sm:w-auto justify-center">
              <LimeActionButton
                as="a"
                href="mailto:davidsalviano52@gmail.com"
              >
                Let's connect
              </LimeActionButton>
              
              <div className="flex flex-col items-center sm:items-start gap-1">
                <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-carvao/40 font-bold">Email Me</span>
                <a 
                  href="mailto:davidsalviano52@gmail.com"
                  className="font-mono text-xs font-bold text-neutral-carvao hover:text-[#8b7ec8] transition-colors"
                >
                  hello@davidsalviano.com
                </a>
              </div>
            </div>

            {/* Rotating Stamp */}
            <div className="absolute right-4 top-4 lg:relative lg:right-auto lg:top-auto z-0 scale-75 opacity-20 lg:opacity-100 flex-shrink-0">
              <RotatingStamp 
                text="AVAILABLE FOR NEW PROJECTS • AVAILABLE FOR NEW PROJECTS •" 
                icon={ArrowUpRight}
              />
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
