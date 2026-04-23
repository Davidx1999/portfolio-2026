import { motion } from 'framer-motion';
import davidProfile from '../assets/david+profile.jpg';

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
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  const skills = [
    { name: "UX/UI Design", rating: 5 },
    { name: "Figma", rating: 5 },
    { name: "Organization", rating: 5 },
    { name: "Communication", rating: 5 },
    { name: "HTML/CSS", rating: 3 },
    { name: "Flutter", rating: 3 }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 lg:px-12 max-w-6xl mx-auto">
      
      {/* SVG Filter for Liquid/Turbulence Effect */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <filter id="liquid-turbulence" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="1" result="turbulence">
            <animate attributeName="baseFrequency" values="0.01;0.05;0.01" dur="3s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="15" xChannelSelector="R" yChannelSelector="G">
            <animate attributeName="scale" values="5;15;5" dur="3s" repeatCount="indefinite" />
          </feDisplacementMap>
        </filter>
      </svg>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16"
      >
        {/* Left Column - Sticky Bio */}
        <div className="flex flex-col gap-8 md:sticky md:top-32 h-fit">
          <motion.div variants={itemVariants} className="overflow-hidden rounded-3xl aspect-square border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] to-transparent z-10 opacity-60 mix-blend-overlay"></div>
            <img 
              src={davidProfile}
              alt="David Salviano" 
              className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
            />
            <div className="absolute inset-0 border border-white/5 rounded-3xl pointer-events-none z-20"></div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h1 className="text-4xl font-bold tracking-tight mb-2 text-zinc-100">David Salviano</h1>
            <p className="text-zinc-400 leading-relaxed font-light">
              I'm a hardworking and dedicated individual with experience in UX/UI design, bridging the gap between aesthetics and solid front-end engineering.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
            {['Brazilian Native', 'English Advanced', 'French Basic'].map((lang) => (
              <span key={lang} className="px-3 py-1.5 text-[10px] uppercase tracking-widest font-mono bg-[#141514] border border-white/5 rounded-full text-zinc-400 shadow-sm">
                {lang}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right Column - Curriculum Data */}
        <div className="flex flex-col gap-16">
          {/* Work Experience */}
          <motion.section variants={itemVariants}>
            <div className="flex items-center gap-4 mb-8">
              <span className="w-8 h-[1px] bg-zinc-700 block"></span>
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500">Work Experience</h2>
            </div>
            
            <div className="flex flex-col gap-10 border-l border-zinc-800/50 ml-4 pl-8 relative">
              <div className="relative group">
                <div className="absolute -left-[37px] top-1.5 w-2 h-2 rounded-xl bg-zinc-400 border-4 border-[#050505] ring-1 ring-zinc-700 group-hover:bg-white transition-colors duration-300"></div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                  <h3 className="text-xl font-semibold text-zinc-200 tracking-tight">UX/UI Designer</h3>
                  <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">@ CEnPE FGV (Mapear)</span>
                </div>
                <p className="text-zinc-500 text-sm mb-4 font-mono">March 2022 - Present</p>
                <ul className="list-disc list-outside text-zinc-400 font-light space-y-2.5 ml-4 marker:text-zinc-700">
                  <li>Designing user interfaces for complex web applications</li>
                  <li>Conducting user research and direct usability testing</li>
                  <li>Collaborating directly with developers to implement designs flawlessly</li>
                  <li>Creating layout wireframes, high-fidelity prototypes, and graphic identities</li>
                </ul>
              </div>

              <div className="relative group">
                <div className="absolute -left-[37px] top-1.5 w-2 h-2 rounded-xl bg-zinc-800 border-4 border-[#050505] ring-1 ring-zinc-800 group-hover:bg-zinc-600 transition-colors duration-300"></div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                  <h3 className="text-xl font-semibold text-zinc-200 tracking-tight">Graphic Designer</h3>
                  <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">@ Luz do Saber</span>
                </div>
                <p className="text-zinc-500 text-sm mb-4 font-mono">March 2021 - 2022</p>
                <ul className="list-disc list-outside text-zinc-400 font-light space-y-2.5 ml-4 marker:text-zinc-700">
                  <li>Logomark creation for Programe_ce and CEnPE Projects</li>
                  <li>Illustration production for Luz do Saber program studies</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Education & Certification */}
          <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="w-8 h-[1px] bg-zinc-700 block"></span>
                <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500">Education</h2>
              </div>
              <div className="bg-[#141514]/50 border border-white/5 p-6 rounded-2xl backdrop-blur-sm group hover:bg-[#141514] transition-colors duration-300">
                <h3 className="font-semibold text-zinc-200 leading-tight mb-2 tracking-tight">Digital Systems and Media</h3>
                <p className="text-zinc-400 font-light text-sm mb-6">Federal University of Ceará</p>
                <div className="inline-flex items-center justify-center px-3 py-1 bg-white/5 rounded-full border border-white/5">
                  <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">Bachelor's Degree • 18 - 22</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="w-8 h-[1px] bg-zinc-700 block"></span>
                <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500">Certifications</h2>
              </div>
              <ul className="space-y-6">
                <li className="flex flex-col gap-1.5 group">
                  <span className="text-zinc-200 font-medium tracking-tight group-hover:text-white transition-colors">Figma UI UX Design Essentials</span>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Daniel Walter Scott (2025)</span>
                </li>
                <li className="flex flex-col gap-1.5 group">
                  <span className="text-zinc-200 font-medium tracking-tight group-hover:text-white transition-colors">Introduction to Digital Painting</span>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Guilherme Freitas (2019)</span>
                </li>
              </ul>
            </div>
          </motion.section>

          {/* Skills (Animated Progress Bars) */}
          <motion.section variants={itemVariants}>
            <div className="flex items-center gap-4 mb-8">
              <span className="w-8 h-[1px] bg-zinc-700 block"></span>
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500">Engineering & Design Arsenal</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
               {skills.map(skill => {
                 const percentage = (skill.rating / 5) * 100;
                 return (
                   <div key={skill.name} className="flex flex-col gap-2.5 group">
                     <div className="flex justify-between items-end">
                       <span className="text-sm font-medium text-zinc-300 tracking-tight group-hover:text-white transition-colors duration-300">
                         {skill.name}
                       </span>
                       <span className="font-mono text-[10px] text-[#fd1843] tracking-widest font-bold drop-shadow-[0_0_8px_rgba(253,24,67,0.5)]">
                         {percentage}%
                       </span>
                     </div>
                     
                     {/* Track */}
                     <div className="h-3 w-full bg-[#141514] rounded-full overflow-hidden relative border border-white/5 shadow-inner">
                       {/* Fill (Animado com Turbulência e True Pink) */}
                       <motion.div
                         initial={{ width: 0 }}
                         whileInView={{ width: `${percentage}%` }}
                         viewport={{ once: true, margin: "-50px" }}
                         transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                         className="absolute top-0 left-0 bottom-0 bg-[#fd1843]"
                         style={{ filter: "url(#liquid-turbulence)" }}
                       >
                         {/* Glow effect na ponta da barra */}
                         <div className="absolute right-0 top-0 bottom-0 w-2 bg-white shadow-[0_0_12px_4px_rgba(253,24,67,0.9)] rounded-full blur-[1px]" />
                       </motion.div>
                     </div>
                   </div>
                 );
               })}
            </div>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
}
