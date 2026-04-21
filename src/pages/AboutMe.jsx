import { motion } from 'framer-motion';

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

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 lg:px-12 max-w-6xl mx-auto">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16"
      >
        {/* Left Column - Sticky Bio */}
        <div className="flex flex-col gap-8 md:sticky md:top-32 h-fit">
          <motion.div variants={itemVariants} className="overflow-hidden rounded-3xl aspect-square border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm relative group">
            {/* We will use a gradient placeholder or default user avatar logic since the image might break cross-domain */}
            <div className="absolute inset-0 bg-gradient-to-tr from-zinc-800 to-zinc-950 mix-blend-overlay"></div>
            <img 
              src="https://avatars.githubusercontent.com/u/53235339?v=4" // GitHub Avatar fallback
              alt="David Salviano" 
              className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              onError={(e) => e.target.style.display = 'none'}
            />
            <div className="absolute inset-0 border border-white/5 rounded-3xl pointer-events-none"></div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h1 className="text-4xl font-bold tracking-tight mb-2">David Salviano</h1>
            <p className="text-zinc-400 leading-relaxed">
              I'm a hardworking and dedicated individual with experience in UX/UI design, bridging the gap between aesthetics and solid front-end engineering.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
            {['Brazilian Native', 'English Advanced', 'French Basic'].map((lang) => (
              <span key={lang} className="px-3 py-1 text-xs uppercase tracking-wider font-mono bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400">
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
              <h2 className="text-sm font-mono uppercase tracking-widest text-zinc-500">Work Experience</h2>
            </div>
            
            <div className="flex flex-col gap-8 border-l border-zinc-800/50 ml-4 pl-8 relative">
              <div className="relative">
                <div className="absolute -left-[37px] top-1.5 w-2 h-2 rounded-xl bg-zinc-500 border-4 border-background ring-1 ring-zinc-800"></div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                  <h3 className="text-xl font-medium text-zinc-200">UX/UI Designer</h3>
                  <span className="text-zinc-500 font-mono text-sm">@ CEnPE FGV (Mapear)</span>
                </div>
                <p className="text-zinc-500 text-sm mb-4 font-mono">March 2022 - Present</p>
                <ul className="list-disc list-outside text-zinc-400 space-y-2 ml-4 marker:text-zinc-700">
                  <li>Designing user interfaces for complex web applications</li>
                  <li>Conducting user research and direct usability testing</li>
                  <li>Collaborating directly with developers to implement designs flawlessly</li>
                  <li>Creating layout wireframes, high-fidelity prototypes, and graphic identities</li>
                </ul>
              </div>

              <div className="relative">
                <div className="absolute -left-[37px] top-1.5 w-2 h-2 rounded-xl bg-zinc-800 border-4 border-background ring-1 ring-zinc-800"></div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                  <h3 className="text-xl font-medium text-zinc-200">Graphic Designer</h3>
                  <span className="text-zinc-500 font-mono text-sm">@ Luz do Saber</span>
                </div>
                <p className="text-zinc-500 text-sm mb-4 font-mono">March 2021 - 2022</p>
                <ul className="list-disc list-outside text-zinc-400 space-y-2 ml-4 marker:text-zinc-700">
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
                <h2 className="text-sm font-mono uppercase tracking-widest text-zinc-500">Education</h2>
              </div>
              <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl backdrop-blur-sm">
                <h3 className="font-semibold text-zinc-200 leading-tight mb-2">Sistemas e Mídias Digitais</h3>
                <p className="text-zinc-500 text-sm mb-4">Universidade Federal do Ceará</p>
                <p className="font-mono text-xs text-zinc-600 uppercase">Bachelor's Degree • 2018 - 2022</p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="w-8 h-[1px] bg-zinc-700 block"></span>
                <h2 className="text-sm font-mono uppercase tracking-widest text-zinc-500">Certifications</h2>
              </div>
              <ul className="space-y-4">
                <li className="flex flex-col gap-1">
                  <span className="text-zinc-300">Figma UI UX Design Essentials</span>
                  <span className="font-mono text-xs text-zinc-600 uppercase">Daniel Walter Scott (2025)</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="text-zinc-300">Introdução a Pintura Digital</span>
                  <span className="font-mono text-xs text-zinc-600 uppercase">Guilherme Freitas (2019)</span>
                </li>
              </ul>
            </div>
          </motion.section>

          {/* Skills */}
          <motion.section variants={itemVariants}>
            <div className="flex items-center gap-4 mb-8">
              <span className="w-8 h-[1px] bg-zinc-700 block"></span>
              <h2 className="text-sm font-mono uppercase tracking-widest text-zinc-500">Hard & Soft Skills</h2>
            </div>
            
            <div className="flex flex-wrap gap-3">
               {[
                 { name: "UX/UI Design", rating: 5 },
                 { name: "Figma", rating: 5 },
                 { name: "Organization", rating: 5 },
                 { name: "Communication", rating: 5 },
                 { name: "HTML/CSS", rating: 3 },
                 { name: "Flutter", rating: 3 }
               ].map(skill => (
                 <div key={skill.name} className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl">
                   <span className="text-sm text-zinc-300">{skill.name}</span>
                   <span className="text-xs text-zinc-600 flex gap-0.5 ml-2">
                     {Array.from({ length: 5 }).map((_, i) => (
                       <span key={i} className={i < skill.rating ? "text-zinc-400" : "text-zinc-800"}>★</span>
                     ))}
                   </span>
                 </div>
               ))}
            </div>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
}
