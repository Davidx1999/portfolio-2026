import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { LimeActionButton, RotatingStamp } from '../components/Buttons';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budgetRange: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        projectType: '',
        budgetRange: '',
        message: ''
      });
    }, 1500);
  };

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
        {/* Distressed Header Title Row */}
        <div className="w-full border-b border-neutral-carvao/10">
          <div className="px-6 md:px-[16%] py-12 md:py-16 flex flex-col gap-4">
            <motion.div variants={itemVariants} className="relative">
              <img 
                src={`${import.meta.env.BASE_URL}assets/titles/contact.png`} 
                alt="Contact" 
                className="w-full max-w-[280px] md:max-w-[360px] h-auto object-contain select-none"
              />
            </motion.div>
          </div>
        </div>

        {/* Form and Bento Grid Main Section */}
        <div className="w-full border-b border-neutral-carvao/10 px-6 md:px-[16%] py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Subtitles & Form */}
            <motion.div variants={itemVariants} className="flex flex-col gap-8 w-full">
              <div className="flex flex-col gap-4 relative">
                {/* Visual spark decorative icon */}
                <div className="absolute right-4 top-2 text-neutral-carvao/40 animate-pulse hidden sm:block">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 3.143L13 22l-2.286-6.857L5 12l5.714-3.143L13 3z" />
                  </svg>
                </div>
                
                <h2 className="text-2xl md:text-3.5xl font-extrabold text-neutral-carvao uppercase tracking-tight leading-snug font-sans max-w-xl">
                  Let's create something <span className="text-red-500">meaningful</span> <span className="text-yellow-500">together.</span>
                </h2>
                
                <p className="text-sm md:text-base text-neutral-carvao/75 max-w-lg leading-relaxed font-sans">
                  I'm always open to new opportunities and exciting collaborations. Whether you have a clear vision or just an idea, let's start a conversation.
                </p>
              </div>

              {/* Form Container */}
              <form onSubmit={handleSubmit} className="border border-neutral-carvao/10 bg-background/40 p-6 md:p-8 rounded-lg flex flex-col gap-6 shadow-sm w-full relative">
                {/* Inputs */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-carvao/60">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full h-12 px-4 rounded-full border border-neutral-carvao/20 bg-background focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 font-sans text-sm text-neutral-carvao transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-carvao/60">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                    className="w-full h-12 px-4 rounded-full border border-neutral-carvao/20 bg-background focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 font-sans text-sm text-neutral-carvao transition-all"
                  />
                </div>

                {/* Dropdowns row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="projectType" className="font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-carvao/60">Project Type</label>
                    <div className="relative">
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        required
                        className="w-full h-12 px-4 pr-10 rounded-full border border-neutral-carvao/20 bg-background focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 font-sans text-sm text-neutral-carvao transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select project type</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Branding & Identity">Branding & Identity</option>
                        <option value="Other Collaboration">Other Collaboration</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-carvao/50">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="budgetRange" className="font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-carvao/60">Budget Range</label>
                    <div className="relative">
                      <select
                        id="budgetRange"
                        name="budgetRange"
                        value={formData.budgetRange}
                        onChange={handleChange}
                        required
                        className="w-full h-12 px-4 pr-10 rounded-full border border-neutral-carvao/20 bg-background focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 font-sans text-sm text-neutral-carvao transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select budget range</option>
                        <option value="Under $5k">Under $5k</option>
                        <option value="$5k - $10k">$5k - $10k</option>
                        <option value="$10k - $20k">$10k - $20k</option>
                        <option value="$20k+">$20k+</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-carvao/50">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-carvao/60">Tell me about your project</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Share your goals, challenges, and ideas..."
                    className="w-full p-4 rounded-2xl border border-neutral-carvao/20 bg-background focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 font-sans text-sm text-neutral-carvao transition-all resize-none"
                  ></textarea>
                </div>

                {/* Form Footer */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mt-2 pt-2">
                  <button
                    type="submit"
                    disabled={status === 'sending' || status === 'success'}
                    className="group flex items-center gap-4 bg-[#b6a9ed]/70 text-neutral-carvao font-mono text-[10px] font-bold uppercase tracking-wider pl-6 pr-2 py-2 rounded-full border border-neutral-carvao hover:bg-[#8b7ec8] hover:text-white transition-all cursor-pointer disabled:opacity-50"
                  >
                    <span>
                      {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[var(--color-lime-500)] text-neutral-carvao flex items-center justify-center border border-neutral-carvao group-hover:bg-background transition-colors duration-300">
                      <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </button>

                  <div className="flex items-start gap-2 max-w-[240px]">
                    <svg className="w-4 h-4 text-neutral-carvao/50 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <p className="font-sans text-[10px] text-neutral-carvao/60 leading-normal">
                      Your information is safe with me. I'll get back to you within 1-2 business days.
                    </p>
                  </div>
                </div>

                {/* Success Banner */}
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute inset-0 bg-background/95 flex flex-col items-center justify-center text-center p-6 rounded-lg z-20 border border-neutral-carvao/10"
                  >
                    <div className="w-12 h-12 rounded-full bg-[var(--color-lime-500)] flex items-center justify-center border border-neutral-carvao mb-4">
                      <svg className="w-6 h-6 text-neutral-carvao" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="font-sans font-extrabold text-lg text-neutral-carvao uppercase tracking-tight mb-2">Thank you!</h4>
                    <p className="font-sans text-xs text-neutral-carvao/75 max-w-xs leading-relaxed">
                      Your message has been sent successfully. I'll get in touch with you very soon!
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus('')}
                      className="mt-6 font-mono text-[9px] font-bold uppercase tracking-wider text-[#8b7ec8] underline hover:text-neutral-carvao"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Right Column: Bento Collage */}
            <motion.div variants={itemVariants} className="w-full flex flex-col gap-6">
              
              {/* Bento Grid */}
              <div className="grid grid-cols-3 gap-4 w-full">
                
                {/* Column 1: Left */}
                <div className="flex flex-col gap-4">
                  {/* Card 1: Wavy Purple */}
                  <div className="bg-[#B3A0E6]/25 border border-neutral-carvao/10 rounded-sm p-4 flex flex-col justify-end min-h-[140px] relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-24 h-24 bg-[#8b7ec8]/20 rounded-full blur-lg" />
                    <div className="relative z-10 flex flex-col gap-1.5 items-start">
                      {["DESIGN", "THINKER", "PROBLEM", "SOLVER"].map(tag => (
                        <span key={tag} className="bg-neutral-carvao text-background font-mono text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-[2px]">{tag}</span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Card 2: Purple gridded card */}
                  <div
                    className="bg-[#B3A0E6]/10 border border-neutral-carvao/10 rounded-sm aspect-[4/3] relative overflow-hidden flex items-center justify-center"
                    style={{
                      backgroundImage: `radial-gradient(var(--color-foreground) 0.5px, transparent 0.5px)`,
                      backgroundSize: '8px 8px'
                    }}
                  >
                    <svg className="absolute w-[80%] h-[80%] text-[#8b7ec8]/50" viewBox="0 0 100 50" fill="none">
                      <path d="M10 40 Q 30 10, 50 40 T 90 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                {/* Column 2: Middle (Tall Sketch Image) */}
                <div className="border border-neutral-carvao/10 rounded-sm overflow-hidden h-full bg-neutral-carvao/5 shadow-sm min-h-[220px]">
                  <img
                    src={`${import.meta.env.BASE_URL}assets/profile/contact_hand_sketch.png`}
                    alt="Sketching ideas"
                    className="w-full h-full object-cover grayscale contrast-110"
                  />
                </div>

                {/* Column 3: Right */}
                <div className="flex flex-col gap-4">
                  {/* Card 3: Yellow target */}
                  <div className="bg-[#E6A045]/20 border border-neutral-carvao/10 rounded-sm p-4 flex items-center justify-center aspect-square relative overflow-hidden">
                    <svg className="w-full h-full text-[#E6A045]/60" fill="none" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" />
                      <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" />
                      <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                      <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="2" />
                      <path d="M50 0v100M0 50h100" stroke="currentColor" strokeWidth="0.5" />
                    </svg>
                  </div>
                  
                  {/* Card 4: Black asterisk */}
                  <div className="bg-neutral-carvao rounded-sm flex items-center justify-center aspect-[4/3] shadow-md">
                    <svg className="w-8 h-8 text-[var(--color-lime-500)] fill-current" viewBox="0 0 100 100">
                      <path d="M46 15 h8 v70 h-8 z" />
                      <path d="M15 46 h70 v8 h-70 z" />
                      <path d="M24.75 30.41 l49.5 49.5 l-5.66 5.66 l-49.5 -49.5 z" />
                      <path d="M74.25 30.41 l-49.5 49.5 l-5.66 -5.66 l49.5 -49.5 z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Other Ways to Connect */}
              <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-t border-neutral-carvao/10 pt-8 w-full">
                <div className="flex-1 w-full flex flex-col gap-6">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-neutral-carvao/45 mb-2">
                    Other Ways to Connect
                  </h3>

                  <div className="flex flex-col w-full">
                    {[
                      {
                        label: "Email",
                        value: "davidsalviano52@gmail.com",
                        href: "mailto:davidsalviano52@gmail.com",
                        icon: (
                          <svg className="w-5 h-5 text-[#8b7ec8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        )
                      },
                      {
                        label: "LinkedIn",
                        value: "linkedin.com/in/davidsalviano",
                        href: "https://linkedin.com/in/davidsalviano",
                        icon: (
                          <svg className="w-5 h-5 text-[#8b7ec8] fill-current" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        )
                      },
                      {
                        label: "Instagram",
                        value: "@davidsalviano.design",
                        href: "https://instagram.com/davidsalviano.design",
                        icon: (
                          <svg className="w-5 h-5 text-[#8b7ec8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
                          </svg>
                        )
                      },
                      {
                        label: "Location & Timezone",
                        value: "Based in Brazil • GMT-3",
                        href: "#",
                        icon: (
                          <svg className="w-5 h-5 text-[#8b7ec8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        )
                      }
                    ].map((link, idx) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className={`flex items-center justify-between py-4 border-b border-neutral-carvao/10 group hover:bg-neutral-carvao/[0.02] px-2 transition-colors duration-300 ${idx === 0 ? 'border-t border-neutral-carvao/10' : ''}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-[#B3A0E6]/25 flex items-center justify-center shadow-sm">
                            {link.icon}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-carvao/45">{link.label}</span>
                            <span className="font-sans text-sm font-bold text-neutral-carvao">{link.value}</span>
                          </div>
                        </div>
                        <svg className="w-4 h-4 text-neutral-carvao/40 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex-shrink-0 w-full md:w-auto flex justify-center md:justify-end items-center pr-4 mt-4 md:mt-0">
                  <RotatingStamp
                    text="AVAILABLE FOR NEW PROJECTS • AVAILABLE FOR NEW PROJECTS •"
                    icon={Star}
                  />
                </div>
              </div>

            </motion.div>
          </div>
        </div>

        {/* HAVE A PROJECT IN MIND Banner */}
        <motion.div variants={itemVariants} className="w-full px-6 md:px-[16%] mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_2.5fr_1.2fr] border border-neutral-carvao/15 rounded-sm overflow-hidden shadow-lg bg-background">
            
            {/* Column 1: Info and CTA */}
            <div className="bg-[#B3A0E6]/15 p-8 flex flex-col justify-between border-b lg:border-b-0 border-neutral-carvao/10">
              <div className="flex flex-col gap-6">
                <h3 className="font-sans font-extrabold text-3xl md:text-4xl text-neutral-carvao leading-none uppercase tracking-tight">
                  Have a project <br />
                  <span className="text-[#E6A045] inline-block mt-1 font-extrabold">In Mind?</span>
                </h3>

                <p className="font-sans text-xs md:text-sm text-neutral-carvao/75 leading-relaxed">
                  I partner with forward-thinking people and brands to turn ideas into clear, impactful digital experiences. Let's build something great—together.
                </p>
              </div>

              <div className="mt-8">
                <LimeActionButton
                  as="a"
                  href="mailto:davidsalviano52@gmail.com"
                >
                  Let's make it happen
                </LimeActionButton>
              </div>
            </div>

            {/* Column 2: Halftone Hands Image */}
            <div className="bg-[#B3A0E6]/25 relative overflow-hidden aspect-[16/9] lg:aspect-auto flex items-center justify-center border-b lg:border-b-0 lg:border-r border-neutral-carvao/10 select-none">
              <img
                src={`${import.meta.env.BASE_URL}assets/profile/cases_hands.png`}
                alt="Hands touching"
                className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-multiply opacity-85"
              />
              {/* Texture Overlay */}
              <div
                className="absolute inset-0 mix-blend-overlay opacity-35 pointer-events-none"
                style={{
                  backgroundImage: `url(${import.meta.env.BASE_URL}assets/Textures/texture.png)`,
                  backgroundSize: 'cover'
                }}
              />
            </div>

            {/* Column 3: Orange Available Block */}
            <div className="bg-[#E6A045] p-8 flex flex-col justify-between items-center text-center text-neutral-carvao relative overflow-hidden select-none min-h-[220px] lg:min-h-0">
              {/* Globe Grid SVG in background */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none scale-150">
                <svg className="w-full h-full text-neutral-carvao" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
                  <circle cx="50" cy="50" r="45" stroke="currentColor" />
                  <ellipse cx="50" cy="50" rx="30" ry="45" stroke="currentColor" />
                  <ellipse cx="50" cy="50" rx="15" ry="45" stroke="currentColor" />
                  <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" />
                  <line x1="10" y1="25" x2="90" y2="25" stroke="currentColor" />
                  <line x1="10" y1="75" x2="90" y2="75" stroke="currentColor" />
                </svg>
              </div>

              <div className="relative z-10 w-14 h-14 rounded-full border border-neutral-carvao flex items-center justify-center mb-4 bg-background/25">
                <svg className="w-6 h-6 text-neutral-carvao" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" />
                  <ellipse cx="12" cy="12" rx="4" ry="10" stroke="currentColor" />
                  <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" />
                </svg>
              </div>

              <div className="relative z-10 flex flex-col gap-1 items-center">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-carvao/60">Status</span>
                <span className="font-sans font-extrabold text-sm uppercase tracking-wide text-neutral-carvao">
                  Available for
                </span>
                <span className="font-sans font-extrabold text-sm uppercase tracking-wide text-neutral-carvao">
                  New Projects
                </span>
              </div>

              {/* Small squiggle graphic at bottom */}
              <div className="relative z-10 mt-4 text-neutral-carvao/60">
                <svg className="w-12 h-3" viewBox="0 0 24 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M1 3c2-1 4-2 6-1s4 2 6 1 4-2 6-1" stroke="currentColor" />
                </svg>
              </div>
            </div>

          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
