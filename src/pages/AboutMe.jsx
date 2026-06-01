import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { LimeActionButton, RotatingStamp } from '../components/Buttons';

const values = [
  {
    title: "CLARITY FIRST",
    text: "I simplify complexity to create experiences that just make sense.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      </svg>
    )
  },
  {
    title: "EMPATHETIC DESIGN",
    text: "I design with real people in mind, grounded in research and insight.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  },
  {
    title: "PURPOSEFUL IMPACT",
    text: "I focus on outcomes that matter—for users, for businesses, and for the future.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M12 8a4 4 0 100 8 4 4 0 000-8z" />
      </svg>
    )
  },
  {
    title: "COLLABORATIVE SPIRIT",
    text: "I believe the best work happens together through trust, curiosity, and open communication.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m16-10a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  }
];

const experiences = [
  {
    number: "01",
    period: "2024 - PRESENT",
    role: "Freelance UI/UX Designer",
    details: "Partner with startups and agencies to design strategic, user-centered digital experiences."
  },
  {
    number: "02",
    period: "2022 - 2024",
    role: "Senior UI/UX Designer",
    company: "FOCUSLY",
    details: "Led product design for a productivity app, from research and flows to UI systems and handoff."
  },
  {
    number: "03",
    period: "2020 - 2022",
    role: "UX Designer",
    company: "FORMA STUDIO",
    details: "Designed websites and digital campaigns for brands across industries."
  },
  {
    number: "04",
    period: "2018 - 2020",
    role: "Junior Designer",
    company: "AURORA BRAND IDENTITY",
    details: "Supported brand and packaging projects with research, wireframes, and visual exploration."
  },
  {
    number: "05",
    period: "2016 - 2018",
    role: "Graphic Designer",
    company: "FIELO NOTES",
    details: "Created editorial content and marketing materials for digital and print."
  }
];

const processSteps = [
  { 
    number: "01", 
    title: "DISCOVER", 
    text: "I research, listen and understand the real problems and context.",
    icon: (className) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
      </svg>
    )
  },
  { 
    number: "02", 
    title: "DEFINE", 
    text: "I turn insights into clear problems, user needs and design goals.",
    icon: (className) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      </svg>
    )
  },
  { 
    number: "03", 
    title: "DESIGN", 
    text: "I explore ideas and craft interfaces that are simple, useful and delightful.",
    icon: (className) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    )
  },
  { 
    number: "04", 
    title: "DELIVER", 
    text: "I refine, prototype and handoff with clarity, ready for impact.",
    icon: (className) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M12 3c-1.2 2-3 5.5-3 8.5V15h6v-3.5c0-3-1.8-6.5-3-8.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15l-3 2.5V20l3-1M15 15l3 2.5V20l-3-1" />
        <circle cx="12" cy="10" r="1.5" fill="currentColor" />
      </svg>
    )
  }
];

const ProfileCollage = () => (
  <div className="relative w-full aspect-[4/3] md:aspect-square max-w-sm md:max-w-md mx-auto flex items-center justify-center pt-8">
    {/* Wavy Purple Blob behind profile on the left */}
    <div className="absolute left-4 top-1/4 w-[45%] h-[45%] bg-[#B3A0E6]/30 rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] -rotate-12 blur-[1px]" />
    
    {/* Grid-patterned Orange Box on the right */}
    <div 
      className="absolute right-4 bottom-4 w-[42%] h-[55%] border border-neutral-carvao/10 bg-[#E6A045]/20 rounded-[2px]"
      style={{
        backgroundImage: `radial-gradient(var(--color-foreground) 0.75px, transparent 0.75px)`,
        backgroundSize: '12px 12px'
      }}
    >
      <div className="absolute inset-0 bg-[#E6A045]/10" />
    </div>

    {/* Black Square with Lime Asterisk on top right */}
    <div className="absolute right-6 top-6 w-14 h-14 bg-neutral-carvao rounded-[2px] flex items-center justify-center shadow-md rotate-3 z-20">
      <svg className="w-7 h-7 text-[var(--color-lime-500)] fill-current" viewBox="0 0 100 100">
        <path d="M46 15 h8 v70 h-8 z" />
        <path d="M15 46 h70 v8 h-70 z" />
        <path d="M24.75 30.41 l49.5 49.5 l-5.66 5.66 l-49.5 -49.5 z" />
        <path d="M74.25 30.41 l-49.5 49.5 l-5.66 -5.66 l49.5 -49.5 z" />
      </svg>
    </div>

    {/* Rotating Stamp "DESIGNING WITH PURPOSE" */}
    <div className="absolute right-0 top-1/3 translate-x-4 z-20 scale-75 md:scale-90">
      <RotatingStamp 
        text="DESIGNING WITH PURPOSE • DESIGNING WITH PURPOSE •" 
        icon={ArrowUpRight} 
      />
    </div>

    {/* The profile photo */}
    <div className="relative z-10 w-[68%] aspect-[3/4] rounded-[2px] overflow-hidden border border-neutral-carvao bg-neutral-carvao/5 shadow-lg rotate-[-2.5deg]">
      <img
        src={`${import.meta.env.BASE_URL}assets/profile/profile3.png`}
        alt="David Salviano"
        className="w-full h-full object-cover grayscale contrast-115"
      />
      {/* Halftone texture blend */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-50" 
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}assets/Textures/texture.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
    </div>
  </div>
);

export function AboutMe() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
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
        {/* Row 1: Hero Intro */}
        <div className="w-full border-b border-neutral-carvao/10">
          <div className="px-6 md:px-[16%] py-12 md:py-16 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 items-center">
            {/* Left Column: Heading, intro, CTA */}
            <motion.div variants={itemVariants} className="flex flex-col gap-6">
              <div className="relative">
                <img 
                  src={`${import.meta.env.BASE_URL}assets/titles/about.png`} 
                  alt="About" 
                  className="w-full max-w-[280px] md:max-w-[350px] h-auto object-contain select-none"
                />
              </div>

              <div className="relative">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-neutral-carvao leading-snug tracking-tight uppercase max-w-2xl font-sans">
                  I'm David Salviano, a UI/UX designer creating editorial digital experiences with <span className="text-neutral-carvao">clarity</span> and <span className="text-[#E6A045]">personality.</span>
                </h2>
                <svg className="absolute -right-8 top-0 w-6 h-6 text-neutral-carvao/30 hidden sm:block animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 3.143L13 22l-2.286-6.857L5 12l5.714-3.143L13 3z" />
                </svg>
              </div>

              <p className="text-sm md:text-base text-neutral-carvao/75 max-w-xl leading-relaxed font-sans">
                I believe great design is equal parts strategy and soul. I craft purposeful, intuitive experiences that help brands communicate clearly, connect deeply, and grow with confidence.
              </p>

              <div className="flex flex-wrap items-center gap-6 mt-2">
                <LimeActionButton
                  as="a"
                  href="mailto:davidsalviano52@gmail.com"
                >
                  Let's connect
                </LimeActionButton>
                
                <a 
                  href="#"
                  className="group flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-neutral-carvao/70 hover:text-neutral-carvao transition-colors py-2 cursor-pointer"
                >
                  <span>Download Résumé</span>
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
              </div>
            </motion.div>

            {/* Right Column: Profile Collage */}
            <motion.div variants={itemVariants}>
              <ProfileCollage />
            </motion.div>
          </div>
        </div>

        {/* Row 2: Bento Grid info */}
        <div className="w-full border-b border-neutral-carvao/10">
          <div className="px-6 md:px-[16%] grid grid-cols-1 lg:grid-cols-[1.2fr_1.5fr_2.3fr] gap-0">
            
            {/* Column 1: My Story */}
            <div className="py-10 lg:pr-8 border-b border-neutral-carvao/10 lg:border-b-0 lg:border-r border-neutral-carvao/10 flex flex-col gap-6">
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-neutral-carvao/45">
                My Story
              </h3>
              <div className="font-sans text-sm text-neutral-carvao/75 leading-relaxed space-y-4">
                <p>
                  I've always been drawn to the intersection of design, technology, and human behavior. My path started in graphic design, evolved through front-end development, and led me to UI/UX design—where strategy, creativity, and empathy come together.
                </p>
                <p>
                  Today, I partner with forward-thinking teams and early-stage startups to turn complex ideas into clear, engaging digital experiences that make an impact.
                </p>
              </div>
            </div>

            {/* Column 2: Values & Approach */}
            <div className="py-10 lg:px-8 border-b border-neutral-carvao/10 lg:border-b-0 lg:border-r border-neutral-carvao/10 bg-[#B3A0E6]/5 flex flex-col gap-6">
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-neutral-carvao/45 pl-2 lg:pl-0">
                Values & Approach
              </h3>
              <div className="flex flex-col gap-6 pl-2 lg:pl-0 pr-2 lg:pr-0">
                {values.map((val) => (
                  <div key={val.title} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full border border-neutral-carvao/15 flex items-center justify-center text-neutral-carvao/60 flex-shrink-0 bg-background/30 shadow-sm">
                      {val.icon}
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="font-sans font-bold text-xs tracking-wider text-neutral-carvao uppercase">
                        {val.title}
                      </h4>
                      <p className="font-sans text-xs text-neutral-carvao/65 leading-normal">
                        {val.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Experience Highlights */}
            <div className="py-10 lg:pl-8 flex flex-col gap-6">
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-neutral-carvao/45">
                Experience Highlights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12">
                {/* Sub-column 1: 01, 02, 03 */}
                <div className="flex flex-col gap-8">
                  {experiences.slice(0, 3).map((exp) => (
                    <div key={exp.number} className="flex gap-4 items-start">
                      <div className="w-8 h-6 flex items-center justify-center bg-[#B3A0E6]/25 text-neutral-carvao font-mono text-[10px] font-bold rounded-[30%_70%_70%_30%_/_50%_60%_40%_50%] flex-shrink-0">
                        {exp.number}
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-[9px] text-neutral-carvao/45 font-bold tracking-wider">{exp.period}</span>
                        <h4 className="font-sans font-bold text-sm text-neutral-carvao">{exp.role}</h4>
                        {exp.company && <span className="font-sans text-xs font-semibold text-[#8b7ec8]">{exp.company}</span>}
                        <p className="font-sans text-xs text-neutral-carvao/65 leading-relaxed mt-1">{exp.details}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sub-column 2: 04, 05, badge */}
                <div className="flex flex-col gap-8 justify-between">
                  <div className="flex flex-col gap-8">
                    {experiences.slice(3).map((exp) => (
                      <div key={exp.number} className="flex gap-4 items-start">
                        <div className="w-8 h-6 flex items-center justify-center bg-[#B3A0E6]/25 text-neutral-carvao font-mono text-[10px] font-bold rounded-[30%_70%_70%_30%_/_50%_60%_40%_50%] flex-shrink-0">
                          {exp.number}
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="font-mono text-[9px] text-neutral-carvao/45 font-bold tracking-wider">{exp.period}</span>
                          <h4 className="font-sans font-bold text-sm text-neutral-carvao">{exp.role}</h4>
                          {exp.company && <span className="font-sans text-xs font-semibold text-[#8b7ec8]">{exp.company}</span>}
                          <p className="font-sans text-xs text-neutral-carvao/65 leading-relaxed mt-1">{exp.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Always learning Badge */}
                  <div className="bg-[#B3A0E6]/5 border border-neutral-carvao/10 p-4 rounded-sm flex items-center gap-3 relative overflow-hidden mt-4 shadow-sm">
                    <svg className="w-6 h-6 text-[#8b7ec8] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2a14.5 14.5 0 000 20M2 12h20M3 6h18M3 18h18" strokeDasharray="2 2" />
                    </svg>
                    <p className="font-sans text-[11px] font-bold text-neutral-carvao/75 uppercase tracking-wider leading-snug">
                      Always learning.<br />Always exploring.<br />Always designing.
                    </p>
                    <svg className="w-6 h-6 text-[var(--color-lime-500)] absolute right-2 bottom-2" viewBox="0 0 24 24" fill="none">
                      <path d="M2 18c4-2 8-4 12-2s4 4 8 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Row 3: Selected Clients & Collaborators */}
        <div className="w-full border-b border-neutral-carvao/10 bg-background/50">
          <div className="px-6 md:px-[16%] py-6 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="w-2 h-2 rounded-full bg-[var(--color-lime-500)]" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-carvao/50">
                Selected Clients & Collaborators
              </span>
            </div>

            {/* Logos List */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 font-sans font-bold text-xs uppercase tracking-wider text-neutral-carvao/60">
              <div className="flex items-center gap-1.5 hover:text-neutral-carvao transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-carvao/30" />
                <span>FOCUSLY</span>
              </div>
              <div className="hover:text-neutral-carvao transition-colors">
                <span>FORMA STUDIO</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-neutral-carvao transition-colors">
                <svg className="w-3.5 h-3.5 fill-current text-neutral-carvao/40" viewBox="0 0 100 100">
                  <path d="M46 15 h8 v70 h-8 z" />
                  <path d="M15 46 h70 v8 h-70 z" />
                </svg>
                <span>AURORA</span>
              </div>
              <div className="hover:text-neutral-carvao transition-colors">
                <span>FIELO NOTES</span>
              </div>
              <div className="flex items-center gap-1 hover:text-neutral-carvao transition-colors">
                <svg className="w-3.5 h-3.5 text-neutral-carvao/40" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
                <span>LATTICE</span>
              </div>
              <div className="hover:text-neutral-carvao transition-colors">
                <span>CLOVER LABS</span>
              </div>
            </div>

            <Link
              to="/projects"
              className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#8b7ec8] hover:text-[#B6A9ED] transition-colors flex items-center gap-1 flex-shrink-0 cursor-pointer"
            >
              <span>View All Projects</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Row 4: Skills, Process, Tools */}
        <div className="w-full border-b border-neutral-carvao/10">
          <div className="px-6 md:px-[16%] grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-0">
            
            {/* Column 1: Skills */}
            <div className="py-10 lg:pr-8 border-b border-neutral-carvao/10 lg:border-b-0 lg:border-r border-neutral-carvao/10 bg-[#B3A0E6]/5 flex flex-col justify-between gap-8 relative">
              <div className="flex flex-col gap-6">
                <h3 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-neutral-carvao/45 pl-2 lg:pl-0">
                  Skills & Expertise
                </h3>
                <div className="flex flex-wrap gap-2 pl-2 lg:pl-0">
                  {[
                    "UI/UX Design", "User Research", "Interaction Design",
                    "Wireframing", "Prototyping", "Design Systems",
                    "Information Architecture", "Visual Design",
                    "Accessibility", "Front-end Awareness"
                  ].map((skill) => (
                    <span 
                      key={skill}
                      className="border border-neutral-carvao/25 bg-background/50 text-neutral-carvao hover:bg-neutral-carvao hover:text-background transition-colors duration-300 px-3 py-1 font-mono text-[9px] uppercase tracking-wider rounded-full font-bold select-none cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              {/* Arrow Badge at the bottom right */}
              <div className="absolute right-4 bottom-4 w-6 h-6 rounded-full border border-neutral-carvao/20 flex items-center justify-center text-neutral-carvao/40">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>

            {/* Column 2: My Process */}
            <div className="py-10 lg:px-8 border-b border-neutral-carvao/10 lg:border-b-0 lg:border-r border-neutral-carvao/10 flex flex-col gap-6">
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-neutral-carvao/45 pl-2 lg:pl-0">
                My Process
              </h3>
              <div className="w-full flex flex-col md:flex-row items-start justify-between gap-6 md:gap-2 pl-2 lg:pl-0 pr-2 lg:pr-0">
                {processSteps.map((step, idx) => (
                  <React.Fragment key={step.number}>
                    <div className="flex flex-col items-start w-full md:w-[22%] max-w-xs">
                      {/* Tiny Number Blob */}
                      <div className="w-7 h-5 flex items-center justify-center bg-[#B3A0E6]/25 text-neutral-carvao font-mono text-[9px] font-bold rounded-sm mb-4">
                        {step.number}
                      </div>
                      {/* Icon */}
                      <div className="mb-3 text-neutral-carvao">
                        {step.icon("w-7 h-7")}
                      </div>
                      {/* Title */}
                      <h4 className="font-sans font-bold text-xs tracking-wider uppercase text-neutral-carvao mb-1">
                        {step.title}
                      </h4>
                      {/* Text */}
                      <p className="font-sans text-[11px] text-neutral-carvao/75 leading-relaxed">
                        {step.text}
                      </p>
                    </div>
                    {idx < processSteps.length - 1 && (
                      <div className="hidden md:flex items-center justify-center flex-1 px-1 mt-6">
                        <svg className="w-full max-w-[40px] h-4 text-neutral-carvao/20" fill="none" viewBox="0 0 40 24">
                          <path d="M0 12h36m-6-6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                        </svg>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Column 3: Tools */}
            <div className="py-10 lg:pl-8 bg-[#E6A045]/5 flex flex-col justify-between gap-8 relative">
              <div className="flex flex-col gap-6">
                <h3 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-neutral-carvao/45">
                  Tools
                </h3>
                <div className="grid grid-cols-2 gap-3 pr-2 lg:pr-0">
                  {[
                    "FIGMA", "ADOBE XD", "PHOTOSHOP", "ILLUSTRATOR", "WEBFLOW", "NOTION"
                  ].map((tool) => (
                    <div 
                      key={tool}
                      className="border border-neutral-carvao/25 bg-background/50 hover:bg-neutral-carvao hover:text-background transition-colors duration-300 p-2.5 rounded-sm font-mono text-[9px] uppercase tracking-wider font-bold flex items-center justify-between shadow-sm cursor-default"
                    >
                      <span>{tool}</span>
                      <svg className="w-3 h-3 text-neutral-carvao/30 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>
              {/* Arrow Badge at the bottom right */}
              <div className="absolute right-4 bottom-4 w-6 h-6 rounded-full border border-neutral-carvao/20 flex items-center justify-center text-neutral-carvao/40">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>

          </div>
        </div>

        {/* Row 5: Principles, Interests, CTA */}
        <div className="w-full">
          <div className="px-6 md:px-[16%] grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr_1.5fr] gap-0">
            
            {/* Column 1: Principles */}
            <div className="py-12 lg:pr-8 border-b border-neutral-carvao/10 lg:border-b-0 lg:border-r border-neutral-carvao/10 flex flex-col gap-6">
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-neutral-carvao/45">
                Principles I Design By
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-6 items-center">
                <div className="flex flex-col gap-4">
                  {[
                    { num: "01", text: "Design with empathy" },
                    { num: "02", text: "Communicate with clarity" },
                    { num: "03", text: "Create with purpose" },
                    { num: "04", text: "Evolve through feedback" }
                  ].map((pr) => (
                    <div key={pr.num} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[var(--color-lime-500)]/30 border border-neutral-carvao/10 flex items-center justify-center font-mono text-[9px] font-bold text-neutral-carvao">
                        {pr.num}
                      </div>
                      <span className="font-sans font-bold text-xs uppercase tracking-wide text-neutral-carvao">
                        {pr.text}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Radial target SVG decoration */}
                <div className="w-full aspect-square max-w-[100px] border border-neutral-carvao/15 rounded-sm relative overflow-hidden flex items-center justify-center bg-[#E6A045]/5">
                  <svg className="w-16 h-16 text-neutral-carvao/15" fill="none" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" />
                    <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                    <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M50 0v100M0 50h100" stroke="currentColor" strokeWidth="0.5" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Column 2: Interests & Inspiration */}
            <div className="py-12 lg:px-8 border-b border-neutral-carvao/10 lg:border-b-0 lg:border-r border-neutral-carvao/10 flex flex-col gap-6">
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-neutral-carvao/45 pl-2 lg:pl-0">
                Interests & Inspiration
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6 pl-2 lg:pl-0 items-center">
                {/* Interests Grid list */}
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 pr-2">
                  {[
                    { label: "Editorial Design", icon: (
                      <svg className="w-4 h-4 text-neutral-carvao/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    )},
                    { label: "Typography", icon: (
                      <span className="font-serif font-bold text-xs leading-none text-neutral-carvao/60 mt-0.5">Aa</span>
                    )},
                    { label: "Architecture", icon: (
                      <svg className="w-4 h-4 text-neutral-carvao/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    )},
                    { label: "Film & Photo", icon: (
                      <svg className="w-4 h-4 text-neutral-carvao/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <circle cx="12" cy="13" r="3" />
                      </svg>
                    )},
                    { label: "Technology", icon: (
                      <span className="font-mono font-bold text-[10px] leading-none text-neutral-carvao/60 mt-0.5">&lt;&gt;</span>
                    )},
                    { label: "Travel", icon: (
                      <svg className="w-4 h-4 text-neutral-carvao/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    )}
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col gap-1 items-start">
                      <div className="w-8 h-8 rounded-sm border border-neutral-carvao/10 bg-background/50 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-carvao/75">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Mountains landscape photo frame */}
                <div className="relative w-full aspect-video md:aspect-[3/4] max-w-[130px] mx-auto rounded-sm overflow-hidden border border-neutral-carvao shadow-md rotate-2 z-10 bg-neutral-carvao/5">
                  <img
                    src={`${import.meta.env.BASE_URL}assets/profile/about_mountain.png`}
                    alt="Mountains Inspiration"
                    className="w-full h-full object-cover grayscale"
                  />
                  {/* Yellow overlay squiggle SVG */}
                  <svg className="w-8 h-8 text-[var(--color-lime-500)] absolute bottom-2 right-2 drop-shadow-md" viewBox="0 0 24 24" fill="none">
                    <path d="M2 18c4-2 8-4 12-2s4 4 8 2" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Column 3: CTA */}
            <div className="py-12 lg:pl-8 bg-[#B3A0E6]/5 border-b border-neutral-carvao/10 lg:border-b-0 flex flex-col justify-between gap-8 relative">
              <div className="flex flex-col gap-6">
                <h3 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-neutral-carvao/45">
                  Let's Create Something Great
                </h3>
                <div className="flex flex-col gap-3">
                  <h4 className="font-sans font-extrabold text-lg leading-tight uppercase text-neutral-carvao">
                    Let's Create Something Great.
                  </h4>
                  <p className="font-sans text-xs text-neutral-carvao/70 leading-relaxed pr-8">
                    I'm open to new opportunities, exciting collaborations and meaningful projects.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="w-fit">
                  <LimeActionButton
                    as="a"
                    href="mailto:davidsalviano52@gmail.com"
                  >
                    Let's connect
                  </LimeActionButton>
                </div>
                <a 
                  href="mailto:davidsalviano52@gmail.com"
                  className="font-mono text-[11px] font-bold tracking-wider text-neutral-carvao hover:text-[#8b7ec8] transition-colors w-fit"
                >
                  davidsalviano52@gmail.com
                </a>
              </div>

              {/* Rotating Stamp "AVAILABLE FOR NEW PROJECTS" on top right */}
              <div className="absolute right-4 top-4 z-20 scale-75 transform translate-x-2 -translate-y-2">
                <RotatingStamp 
                  text="AVAILABLE FOR NEW PROJECTS • AVAILABLE FOR NEW PROJECTS •" 
                  icon={ArrowUpRight}
                />
              </div>
            </div>

          </div>
        </div>

      </motion.div>
    </div>
  );
}
