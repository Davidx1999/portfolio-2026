import { motion } from 'framer-motion';
import { ExternalLink, MoveLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MagneticTextLink } from './Buttons';

export function CaseStudyTemplate({ title, subtitle, tags, liveLink, image, challenge, solution, process }) {
  return (
    <main className="min-h-screen w-full pt-32 pb-24 px-4 md:px-[calc(16%-24px)] bg-background">
      <div className="w-full">
        
        {/* Back Button */}
        <MagneticTextLink 
          as={Link}
          to="/projects" 
          theme="dark"
          className="mb-12"
        >
          <MoveLeft size={14} className="transform transition-transform duration-300 group-hover/link:-translate-x-1" />
          Back to Projects
        </MagneticTextLink>

        {/* Header do Projeto */}
        <header className="mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-[1px] bg-neutral-carvao/25" />
            <span className="text-[10px] tracking-[0.2em] text-neutral-carvao/50 font-mono uppercase font-bold">
              Case Study // {tags ? tags[0] : 'Project'}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[3rem] md:text-[5rem] lg:text-[6rem] font-serif font-normal tracking-tight leading-[0.95] mb-6 text-neutral-carvao"
          >
            {title}.
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12"
          >
            <p className="max-w-2xl text-neutral-carvao/75 text-base md:text-lg leading-relaxed font-light">
              {subtitle}
            </p>

            {liveLink && (
              <a 
                href={liveLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-primary text-neutral-branco px-6 py-3.5 rounded-xl font-mono text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:brightness-90 hover:scale-103 active:scale-98 transition-all shadow-sm whitespace-nowrap w-max"
              >
                View Live Project
                <ExternalLink size={14} strokeWidth={2} />
              </a>
            )}
          </motion.div>

          {/* Grid de Metadados (Tags) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-neutral-carvao/10"
          >
            {tags && tags.map((tag, index) => (
              <div key={index} className="flex flex-col gap-1.5">
                <span className="text-[9px] font-mono text-neutral-carvao/45 uppercase tracking-widest font-bold">
                  {['Role', 'Year', 'Platform', 'Industry'][index] || 'Detail'}
                </span>
                <span className="text-sm text-neutral-carvao font-medium">{tag}</span>
              </div>
            ))}
          </motion.div>
        </header>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full h-[50vh] md:h-[70vh] rounded-2xl bg-white border border-neutral-carvao/10 flex flex-col items-center justify-center mb-20 overflow-hidden relative group shadow-sm"
        >
          {image ? (
            <>
              <img src={image} alt={title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700" />
              <div 
                className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay bg-repeat z-10"
                style={{ 
                  backgroundImage: `url('${import.meta.env.BASE_URL}assets/Textures/texture.png')`, 
                  backgroundSize: '120px 120px' 
                }}
              />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-tr from-neutral-carvao/5 to-transparent opacity-50 mix-blend-overlay"></div>
              <span className="text-neutral-carvao/40 font-mono tracking-widest text-xs uppercase relative z-10 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-neutral-carvao/30 animate-pulse"></div>
                Hero Image Placeholder
              </span>
            </>
          )}
        </motion.div>

        {/* Corpo do Case */}
        <article className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 w-full">
          
          <div className="md:col-span-4">
            <h2 className="text-xl md:text-2xl font-serif font-bold tracking-tight md:sticky md:top-32 text-neutral-carvao">
              01. The Challenge
            </h2>
          </div>
          <div className="md:col-span-8 text-neutral-carvao/75 text-base md:text-lg leading-relaxed font-light mb-12 md:mb-16">
            {challenge || (
              <p>
                Details about the challenge will be listed here. Exploring user pain points and technical constraints.
              </p>
            )}
          </div>

          <div className="md:col-span-4">
            <h2 className="text-xl md:text-2xl font-serif font-bold tracking-tight md:sticky md:top-32 text-neutral-carvao">
              02. The Solution
            </h2>
          </div>
          <div className="md:col-span-8 text-neutral-carvao/75 text-base md:text-lg leading-relaxed font-light mb-12 md:mb-16">
            {solution || (
              <p>
                Description of the implemented solution, focus on UX architecture and visual interface.
              </p>
            )}
          </div>

          <div className="md:col-span-4">
            <h2 className="text-xl md:text-2xl font-serif font-bold tracking-tight md:sticky md:top-32 text-neutral-carvao">
              03. Process & Engineering
            </h2>
          </div>
          <div className="md:col-span-8 text-neutral-carvao/75 text-base md:text-lg leading-relaxed font-light mb-8">
            {process || (
              <ul className="list-disc pl-5 space-y-3 mb-6 marker:text-primary">
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
