import { motion } from 'framer-motion';
import { ExternalLink, MoveLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CaseStudyTemplate({ title, subtitle, tags, liveLink, image, challenge, solution, process }) {
  return (
    <main className="min-h-screen w-full pt-32 pb-24 px-6 md:px-24">
      <div className="max-w-5xl mx-auto">
        
        {/* Back Button */}
        <Link 
          to="/projects" 
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-100 transition-colors mb-12 font-mono text-xs uppercase tracking-widest"
        >
          <MoveLeft size={16} /> Back to Projects
        </Link>

        {/* Header do Projeto */}
        <header className="mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-[1px] bg-zinc-700" />
            <span className="text-[10px] tracking-[0.2em] text-zinc-500 font-mono uppercase">
              Case Study // {tags ? tags[0] : 'Project'}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[3rem] md:text-[5rem] lg:text-[6rem] font-bold tracking-tighter leading-[0.95] mb-6 text-white drop-shadow-lg"
          >
            {title}.
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12"
          >
            <p className="max-w-2xl text-zinc-400 text-base md:text-lg leading-relaxed drop-shadow-md">
              {subtitle}
            </p>

            {liveLink && (
              <a 
                href={liveLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-black px-6 py-3 rounded-full font-semibold text-sm flex items-center gap-2 hover:bg-zinc-200 hover:scale-105 transition-all duration-300 whitespace-nowrap w-max"
              >
                View Live Project
                <ExternalLink size={16} strokeWidth={2} />
              </a>
            )}
          </motion.div>

          {/* Grid de Metadados (Tags) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-white/5"
          >
            {tags && tags.map((tag, index) => (
              <div key={index} className="flex flex-col gap-1">
                <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                  {['Role', 'Year', 'Platform', 'Industry'][index] || 'Detail'}
                </span>
                <span className="text-sm text-zinc-300">{tag}</span>
              </div>
            ))}
          </motion.div>
        </header>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full h-[50vh] md:h-[70vh] rounded-3xl bg-zinc-900/50 border border-white/5 flex flex-col items-center justify-center mb-24 overflow-hidden relative group"
        >
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900 to-transparent opacity-50 mix-blend-overlay"></div>
              <span className="text-zinc-600 font-mono tracking-widest text-sm uppercase relative z-10 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-zinc-700 animate-pulse"></div>
                Hero Image Placeholder
              </span>
            </>
          )}
        </motion.div>

        {/* Corpo do Case */}
        <article className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 max-w-5xl">
          
          <div className="md:col-span-4">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight sticky top-32 text-zinc-200">
              01. The Challenge
            </h2>
          </div>
          <div className="md:col-span-8 text-zinc-400 text-lg leading-relaxed font-light mb-16 md:mb-24">
            {challenge || (
              <p>
                Details about the challenge will be listed here. Exploring user pain points and technical constraints.
              </p>
            )}
          </div>

          <div className="md:col-span-4">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight sticky top-32 text-zinc-200">
              02. The Solution
            </h2>
          </div>
          <div className="md:col-span-8 text-zinc-400 text-lg leading-relaxed font-light mb-16 md:mb-24">
            {solution || (
              <p>
                Description of the implemented solution, focus on UX architecture and visual interface.
              </p>
            )}
          </div>

          <div className="md:col-span-4">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight sticky top-32 text-zinc-200">
              03. Process & Engineering
            </h2>
          </div>
          <div className="md:col-span-8 text-zinc-400 text-lg leading-relaxed font-light mb-16">
            {process || (
              <ul className="list-disc pl-5 space-y-3 mb-6">
                <li>User research and heuristic analysis.</li>
                <li>Low and high fidelity wireframing.</li>
                <li>Scalable Design System built in React.</li>
                <li>High-precision handoff for the development team.</li>
              </ul>
            )}
          </div>
        </article>

      </div>
    </main>
  );
}
