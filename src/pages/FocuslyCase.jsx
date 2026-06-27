import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, MoveLeft, ArrowRight } from 'lucide-react';

export function FocuslyCase() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
            to="/cases" 
            className="inline-flex items-center gap-2 text-neutral-carvao/60 hover:text-[var(--color-primary)] transition-colors font-mono text-xs uppercase tracking-widest font-bold"
          >
            <MoveLeft size={14} /> Back to Cases
          </Link>
        </div>

        {/* Hero Section */}
        <div className="w-full border-b border-neutral-carvao/10 mt-4">
          <div className="px-6 md:px-[16%] pb-16 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 items-center">
            {/* Left Column: Heading, subtitle, summary */}
            <div className="flex flex-col gap-6">
              <div className="relative">
                <h1 className="text-title-h1 font-extrabold text-neutral-carvao leading-[0.8] tracking-tighter uppercase font-sans select-none">
                  Focusly
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
                <span className="font-sans text-lg font-bold text-neutral-carvao/60 block mt-3 uppercase tracking-wider">Productivity App</span>
              </div>

              <h2 className="text-title-h3 font-extrabold text-neutral-carvao leading-snug tracking-tight uppercase max-w-xl font-sans">
                A clean and motivating <span className="text-[#E6A045]">productivity app</span> that helps users <span className="text-[#8b7ec8]">build better routines</span> and stay focused.
              </h2>

              {/* Project Summary */}
              <div className="flex flex-col gap-6 pt-6 border-t border-neutral-carvao/10 mt-4">
                <h3 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-neutral-carvao/45">
                  Project Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-8">
                  <p className="font-sans text-body-base text-neutral-carvao/75 leading-relaxed">
                    Focusly is a productivity mobile app designed to help users plan their day, minimize distractions, and build consistent habits. The app combines simple planning, timed focus sessions, and insightful analytics in a clean, motivating experience that promotes clarity and progress.
                  </p>
                  
                  {/* Meta details list */}
                  <div className="flex flex-col gap-4">
                    {[
                      { label: "Role", val: "Lead Designer" },
                      { label: "Timeline", val: "Jan – Mar 2024 (8 weeks)" },
                      { label: "Platform", val: "iOS & Android" },
                      { label: "Team", val: "Product Manager, Developer" },
                      { label: "Services", val: "UX/UI Design, Prototyping, Design System, Usability Testing" }
                    ].map((item) => (
                      <div key={item.label} className="flex flex-col gap-0.5 border-b border-neutral-carvao/5 pb-1">
                        <span className="font-mono text-[8px] uppercase tracking-widest text-[#8b7ec8] font-bold">{item.label}</span>
                        <span className="font-sans text-xs text-neutral-carvao font-bold">{item.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Phone Mockup Frame */}
            <div className="relative w-full aspect-[4/5] max-w-sm md:max-w-md mx-auto flex items-center justify-center bg-[#B3A0E6]/10 border border-neutral-carvao/10 rounded-[2px] p-6 shadow-md overflow-hidden select-none">
              {/* Halftone texture blend */}
              <div 
                className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-40" 
                style={{
                  backgroundImage: `url(${import.meta.env.BASE_URL}assets/Textures/texture.png)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              
              <img
                src={`${import.meta.env.BASE_URL}assets/profile/focusly_mobile_hero.png`}
                alt="Focusly app mockup"
                className="w-[85%] h-full object-contain relative z-10 drop-shadow-2xl grayscale contrast-110"
              />
            </div>
          </div>
        </div>

        {/* Row 2: Overview, Challenge, Process */}
        <div className="w-full border-b border-neutral-carvao/10 py-16 px-6 md:px-[16%]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.5fr_2.3fr] gap-12">
            {/* Overview */}
            <div className="flex flex-col gap-6">
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-neutral-carvao/45">
                Overview
              </h3>
              <p className="font-sans text-body-base text-neutral-carvao/75 leading-relaxed">
                Focusly was created to solve a common problem: most productivity tools are either too complex or not motivating enough to use daily. The goal was to design a minimal, engaging app that helps users plan with intention, stay focused, and reflect on progress.
              </p>
              <div className="border border-neutral-carvao/10 rounded-[2px] overflow-hidden aspect-video w-full shadow-sm">
                <img src={`${import.meta.env.BASE_URL}assets/profile/cases_hands.png`} alt="Design sketching" className="w-full h-full object-cover grayscale" />
              </div>
            </div>

            {/* Challenge */}
            <div className="flex flex-col gap-6">
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-neutral-carvao/45">
                The Challenge
              </h3>
              <p className="font-sans text-body-base text-neutral-carvao/75 leading-relaxed">
                Users struggle to maintain focus in a world of constant distractions. Existing apps overwhelm with features, complex workflows, and lack of emotional connection—leading to low retention and inconsistent use.
              </p>
              {/* Highlight Challenge Box */}
              <div className="bg-[#E6A045]/5 border border-[#E6A045] p-5 rounded-[2px] flex items-start gap-3 mt-2 shadow-sm">
                <svg className="w-5 h-5 text-[#E6A045] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
                <p className="font-sans text-xs font-bold text-neutral-carvao uppercase tracking-wide leading-normal">
                  How might we create a simple, motivating experience that helps users build focus as a habit?
                </p>
              </div>
            </div>

            {/* Process */}
            <div className="flex flex-col gap-6">
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-neutral-carvao/45">
                Process
              </h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                {[
                  {
                    num: "01",
                    title: "DISCOVER",
                    text: "Research, interviews and competitive analysis to uncover user pain points.",
                    icon: (className) => (
                      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="11" cy="11" r="8" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
                      </svg>
                    )
                  },
                  {
                    num: "02",
                    title: "DEFINE",
                    text: "Synthesize insights and define key problems and opportunities.",
                    icon: (className) => (
                      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="9" />
                        <circle cx="12" cy="12" r="4" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                      </svg>
                    )
                  },
                  {
                    num: "03",
                    title: "DESIGN",
                    text: "Ideate, wireframe and prototype solutions with user feedback.",
                    icon: (className) => (
                      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    )
                  },
                  {
                    num: "04",
                    title: "DELIVER",
                    text: "Refine, test and handoff a polished product ready for launch.",
                    icon: (className) => (
                      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M12 3c-1.2 2-3 5.5-3 8.5V15h6v-3.5c0-3-1.8-6.5-3-8.5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15l-3 2.5V20l3-1M15 15l3 2.5V20l-3-1" />
                      </svg>
                    )
                  }
                ].map((step) => (
                  <div key={step.num} className="flex flex-col items-start max-w-xs">
                    <div className="w-7 h-5 flex items-center justify-center bg-[#B3A0E6]/25 text-neutral-carvao font-mono text-[9px] font-bold rounded-sm mb-3">
                      {step.num}
                    </div>
                    <div className="mb-2 text-neutral-carvao">
                      {step.icon("w-6 h-6")}
                    </div>
                    <h4 className="font-sans font-bold text-xs tracking-wider uppercase text-neutral-carvao mb-1">
                      {step.title}
                    </h4>
                    <p className="font-sans text-[11px] text-neutral-carvao/70 leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Design System & Mobile Screens Mockups */}
        <div className="w-full border-b border-neutral-carvao/10 py-16 px-6 md:px-[16%]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_3.5fr] gap-12">
            
            {/* Design System Details */}
            <div className="flex flex-col gap-8 bg-[#B3A0E6]/5 border border-neutral-carvao/10 p-6 rounded-[2px] shadow-sm justify-between">
              <div className="flex flex-col gap-6">
                <h3 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#8b7ec8]">
                  Design System
                </h3>
                <p className="font-sans text-body-sm text-neutral-carvao/75 leading-relaxed">
                  A cohesive system built for clarity, consistency and calm. Includes:
                </p>
              </div>

              {/* Color Palette */}
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-carvao/40 font-bold">Color Palette</span>
                <div className="flex gap-2">
                  {["bg-[#8b7ec8]", "bg-[#B6A9ED]", "bg-[#C8E63C]", "bg-[#F0EBDF]", "bg-neutral-carvao"].map((color, i) => (
                    <div key={i} className={`w-6 h-6 rounded-full border border-neutral-carvao/10 ${color} shadow-sm`} />
                  ))}
                </div>
              </div>

              {/* Typography */}
              <div className="flex flex-col gap-1.5 border-t border-neutral-carvao/10 pt-4">
                <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-carvao/40 font-bold">Typography</span>
                <div className="flex gap-3 items-center">
                  <span className="font-sans font-extrabold text-2xl text-neutral-carvao">Aa</span>
                  <span className="font-mono text-[9px] text-neutral-carvao/70 uppercase tracking-wider leading-snug">
                    Heading: Compacta Bold<br />
                    Body: Source Serif 4
                  </span>
                </div>
              </div>

              {/* Iconography */}
              <div className="flex flex-col gap-2 border-t border-neutral-carvao/10 pt-4">
                <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-carvao/40 font-bold">Iconography</span>
                <div className="flex gap-4 text-neutral-carvao/60">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6m14 0v-6a2 2 0 00-2-2h-2a2 2 0 00-2 2v6M9 4h6m-3-2v4" /></svg>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.969 0 1.371 1.24.588 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.883a1 1 0 00-1.176 0l-3.97 2.883c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.49 10.1c-.783-.57-.38-1.81.588-1.81h4.907a1 1 0 00.95-.69l1.519-4.674z" /></svg>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><circle cx="12" cy="12" r="3" /></svg>
                </div>
              </div>
            </div>

            {/* Mobile Screens Carousel/Row */}
            <div className="flex flex-col gap-6">
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-neutral-carvao/45">
                Application Screens
              </h3>
              
              {/* Horizontal grid of 5 screens */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {/* Screen 1: Home */}
                <div className="border border-neutral-carvao/15 rounded-md overflow-hidden bg-background aspect-[9/16] p-4 flex flex-col justify-between shadow-sm relative text-neutral-carvao select-none">
                  <span className="font-mono text-[7px] text-neutral-carvao/35 font-bold uppercase block mb-1">01 Home</span>
                  <div className="flex flex-col gap-2 mt-4">
                    <h5 className="font-sans font-bold text-xs uppercase leading-tight">Plan.<br />Focus.<br />Grow.</h5>
                    <div className="bg-[#B3A0E6]/10 border border-[#8b7ec8]/20 p-2 rounded-sm text-[8px] flex flex-col gap-1 mt-2">
                      <span className="font-bold">Weekly Progress</span>
                      <div className="w-full bg-neutral-carvao/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#8b7ec8] h-full w-[65%]" />
                      </div>
                    </div>
                  </div>
                  <div className="h-6 w-full bg-neutral-carvao/5 rounded-sm flex items-center justify-center text-[7px] font-mono text-neutral-carvao/55 font-bold">
                    Let's start focus
                  </div>
                </div>

                {/* Screen 2: Today Plan */}
                <div className="border border-neutral-carvao/15 rounded-md overflow-hidden bg-background aspect-[9/16] p-4 flex flex-col justify-between shadow-sm relative text-neutral-carvao select-none">
                  <span className="font-mono text-[7px] text-neutral-carvao/35 font-bold uppercase block mb-1">02 Today Plan</span>
                  <div className="flex flex-col gap-3 mt-4">
                    <h5 className="font-sans font-bold text-xs uppercase leading-tight">Today</h5>
                    <div className="flex flex-col gap-2">
                      {[
                        { label: "Deep Work", val: "9:00 - 11:30" },
                        { label: "Design Review", val: "12:00 - 13:00" },
                        { label: "Lunch Break", val: "13:00 - 14:00" }
                      ].map((item) => (
                        <div key={item.label} className="bg-neutral-carvao/[0.03] border border-neutral-carvao/5 p-2 rounded-sm text-[8px] flex items-center justify-between">
                          <span className="font-bold">{item.label}</span>
                          <span className="text-[7px] text-neutral-carvao/50">{item.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="h-6 w-full bg-[#C8E63C]/20 border border-[#C8E63C]/40 rounded-sm flex items-center justify-center text-[7px] font-mono text-neutral-carvao/75 font-bold">
                    + Add Task
                  </div>
                </div>

                {/* Screen 3: Focus Timer */}
                <div className="border border-neutral-carvao/15 rounded-md overflow-hidden bg-background aspect-[9/16] p-4 flex flex-col justify-between shadow-sm relative text-neutral-carvao select-none">
                  <span className="font-mono text-[7px] text-neutral-carvao/35 font-bold uppercase block mb-1">03 Focus Timer</span>
                  <div className="flex flex-col items-center justify-center flex-1 gap-6">
                    <div className="w-18 h-18 rounded-full border-2 border-dashed border-[#8b7ec8] flex items-center justify-center relative">
                      <span className="font-mono text-xs font-bold text-neutral-carvao">34:27</span>
                    </div>
                    <span className="font-mono text-[7px] text-neutral-carvao/50 uppercase tracking-widest leading-none">Deep Work</span>
                  </div>
                  <div className="h-6 w-10 mx-auto bg-neutral-carvao text-background rounded-full flex items-center justify-center text-[7px] font-mono font-bold cursor-pointer">
                    || Pause
                  </div>
                </div>

                {/* Screen 4: Insights */}
                <div className="border border-neutral-carvao/15 rounded-md overflow-hidden bg-background aspect-[9/16] p-4 flex flex-col justify-between shadow-sm relative text-neutral-carvao select-none">
                  <span className="font-mono text-[7px] text-neutral-carvao/35 font-bold uppercase block mb-1">04 Insights</span>
                  <div className="flex flex-col gap-3 mt-4">
                    <h5 className="font-sans font-bold text-xs uppercase leading-tight">Insights</h5>
                    <div className="flex flex-col gap-1 bg-neutral-carvao/[0.03] p-2 rounded-sm border border-neutral-carvao/5">
                      <span className="font-mono text-[7px] text-neutral-carvao/40 font-bold uppercase">Focus Time</span>
                      <span className="font-mono text-xs font-bold text-neutral-carvao leading-none">12h 45m</span>
                    </div>
                    {/* Tiny bar chart */}
                    <div className="flex items-end justify-between h-10 px-1 border-b border-neutral-carvao/10 mt-1">
                      {[15, 30, 20, 45, 25].map((h, i) => (
                        <div key={i} className="w-2.5 bg-[#8b7ec8]/60 rounded-t-sm" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                  <span className="font-mono text-[6px] text-neutral-carvao/35 text-center block uppercase tracking-wider mb-1">Weekly Report</span>
                </div>

                {/* Screen 5: Achievements */}
                <div className="border border-neutral-carvao/15 rounded-md overflow-hidden bg-background aspect-[9/16] p-4 flex flex-col justify-between shadow-sm relative text-neutral-carvao select-none">
                  <span className="font-mono text-[7px] text-neutral-carvao/35 font-bold uppercase block mb-1">05 Achievements</span>
                  <div className="flex flex-col items-center justify-center flex-1 gap-3">
                    <svg className="w-8 h-8 text-[#E6A045] fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    <div className="text-center flex flex-col gap-0.5">
                      <span className="font-sans font-bold text-[9px] uppercase tracking-wide text-neutral-carvao leading-tight">You're on fire!</span>
                      <span className="font-sans text-[7px] text-neutral-carvao/50 leading-relaxed">Keep going to build something great.</span>
                    </div>
                  </div>
                  {/* Badges list */}
                  <div className="flex justify-center gap-1.5">
                    <div className="w-5 h-5 rounded-full border border-neutral-carvao/10 bg-[#E6A045]/20 flex items-center justify-center text-[7px] font-mono font-bold">3</div>
                    <div className="w-5 h-5 rounded-full border border-neutral-carvao/10 bg-[#8b7ec8]/25 flex items-center justify-center text-[7px] font-mono font-bold">7</div>
                    <div className="w-5 h-5 rounded-full border border-neutral-carvao/10 bg-[#C8E63C]/30 flex items-center justify-center text-[7px] font-mono font-bold">30</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Row 4: Impact & Results */}
        <div className="w-full border-b border-neutral-carvao/10 py-16 px-6 md:px-[16%]">
          <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1.5fr] gap-12 items-center">
            
            {/* Impact stats grid (yellow/orange bar color) */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 bg-[#E6A045]/15 border border-neutral-carvao/10 p-8 rounded-[2px] shadow-sm relative">
              {[
                { label: "7-Day Retention", val: "+32%", text: "Users returned 32% more within the first week." },
                { label: "App Store Rating", val: "4.8 / 5", text: "Average rating across 1,200+ reviews." },
                { label: "Focus Time Per User", val: "+28%", text: "Increase in weekly focus time reported by users." },
                { label: "Downloads", val: "25K+", text: "Reached 25,000+ downloads in the first 3 months." }
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1.5">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-[#E6A045] font-bold">{stat.label}</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-sans font-extrabold text-3xl text-neutral-carvao leading-none">{stat.val}</span>
                  </div>
                  <p className="font-sans text-body-sm text-neutral-carvao/75 leading-relaxed mt-1">{stat.text}</p>
                </div>
              ))}
            </div>

            {/* Quote Block */}
            <div className="bg-[#B3A0E6]/5 border border-neutral-carvao/10 p-6 md:p-8 rounded-[2px] flex flex-col gap-4 relative shadow-sm">
              <span className="font-serif text-[4rem] text-[#8b7ec8]/20 leading-none absolute top-2 left-4 select-none">“</span>
              <p className="font-sans text-body-base italic text-neutral-carvao/80 leading-relaxed pt-4 pl-4 z-10 relative">
                Focusly has completely changed how I work. It's simple, beautiful, and helps me actually get things done.
              </p>
              <div className="flex items-center gap-3 pl-4 mt-2">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-neutral-carvao/15 bg-neutral-carvao/5">
                  <img src={`${import.meta.env.BASE_URL}assets/profile/profile3.png`} alt="Sarah K." className="w-full h-full object-cover grayscale" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-sans font-bold text-xs uppercase tracking-wide text-neutral-carvao">Sarah K.</span>
                  <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-carvao/45">Product Designer</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Row 5: What's Next */}
        <div className="w-full px-6 md:px-[16%] py-12">
          <div className="border border-neutral-carvao/10 bg-background/50 rounded-[2px] shadow-sm grid grid-cols-1 md:grid-cols-[1.5fr_2fr_1fr] overflow-hidden">
            {/* Left side */}
            <div className="p-8 bg-[#B3A0E6]/10 flex flex-col justify-between gap-6 border-b md:border-b-0 border-neutral-carvao/10">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-carvao/45 font-bold">Finished Reading?</span>
                <h4 className="font-sans font-extrabold text-title-h3 text-neutral-carvao uppercase tracking-tight">What's Next?</h4>
              </div>
              <p className="font-sans text-body-sm text-neutral-carvao/70 leading-relaxed">
                Take a look at other digital products designed for agencies and tech brands.
              </p>
            </div>

            {/* Next Project Link */}
            <div className="p-8 flex items-center justify-between border-b md:border-b-0 md:border-r border-neutral-carvao/10">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[8px] uppercase tracking-widest text-[#E6A045] font-bold">Next Project</span>
                <Link
                  to="/project/forma-studio"
                  className="font-sans font-extrabold text-subtitle-sm text-neutral-carvao uppercase tracking-tight hover:text-[var(--color-primary)] transition-colors leading-tight"
                >
                  Forma Studio
                  <span className="font-sans text-xs text-neutral-carvao/50 block font-normal normal-case mt-0.5">Design Agency Website</span>
                </Link>
              </div>
              
              <Link 
                to="/project/forma-studio"
                className="w-10 h-10 rounded-full border border-neutral-carvao/10 bg-[var(--color-lime-500)]/30 hover:bg-[var(--color-lime-500)] flex items-center justify-center text-neutral-carvao transition-colors duration-300 flex-shrink-0 cursor-pointer"
              >
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Asterisk square decoration */}
            <div className="bg-neutral-carvao flex items-center justify-center aspect-square md:aspect-auto p-8">
              <svg className="w-12 h-12 text-[var(--color-lime-500)] fill-current" viewBox="0 0 100 100">
                <path d="M46 15 h8 v70 h-8 z" />
                <path d="M15 46 h70 v8 h-70 z" />
                <path d="M24.75 30.41 l49.5 49.5 l-5.66 5.66 l-49.5 -49.5 z" />
                <path d="M74.25 30.41 l-49.5 49.5 l-5.66 -5.66 l49.5 -49.5 z" />
              </svg>
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
