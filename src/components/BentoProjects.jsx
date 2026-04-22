import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MoveRight, Terminal, Plus } from 'lucide-react';

export function BentoProjects() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section id="projetos" className="w-full py-24 container mx-auto px-6 lg:px-12">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-zinc-100">
          Selected <span className="text-zinc-600">Works</span>
        </h2>
        <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest hidden md:block">01 // Case Studies</span>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Large Main Feature: Mapear */}
        <motion.div 
          variants={item} 
          data-magnetic-card
          onClick={(e) => { if(!e.target.closest('a')) e.currentTarget.querySelector('a').click() }}
          className="md:col-span-2 group relative h-[500px] border border-zinc-800 rounded-3xl overflow-hidden bg-zinc-900/50 backdrop-blur-md p-8 md:p-12 flex flex-col justify-end transition-all hover:bg-zinc-900 cursor-pointer"
        >
          <div className="absolute inset-[1px] border border-white/5 rounded-3xl pointer-events-none" />
          
          <div className="relative z-10 w-full md:w-2/3">
            <span className="px-3 py-1 text-xs uppercase tracking-wider font-mono bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-400 mb-6 inline-block">App Platform</span>
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight group-hover:text-zinc-300 transition-colors">Mapear Plataform</h3>
            <p className="text-zinc-400 mb-8 leading-relaxed line-clamp-3">
              An educational platform designed to empower student wisdom. The UX architecture bridges complex design systems with asynchronous integration, focused on data visualization.
            </p>
            <Link to="/mapear" data-magnetic-button className="inline-flex items-center gap-3 text-sm font-semibold text-white uppercase tracking-wider hover:gap-5 transition-all">
              Ler Case Study <MoveRight className="w-4 h-4 text-zinc-500" />
            </Link>
          </div>
          
          <div className="absolute top-0 right-0 w-2/3 h-full mix-blend-luminosity opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700 pointer-events-none">
             <div className="w-full h-full bg-gradient-to-l from-transparent to-zinc-900 absolute inset-0 z-10"></div>
             <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          </div>
        </motion.div>

        {/* Top Right Box: AULA F75 */}
        <motion.div 
          variants={item} 
          data-magnetic-card
          onClick={(e) => { if(!e.target.closest('a')) e.currentTarget.querySelector('a').click() }}
          className="group relative h-full min-h-[500px] md:min-h-0 border border-zinc-800 rounded-3xl overflow-hidden bg-zinc-900/50 backdrop-blur-md p-8 flex flex-col justify-between transition-all hover:bg-zinc-900 cursor-pointer"
        >
          <div className="absolute inset-[1px] border border-white/5 rounded-3xl pointer-events-none" />
          <div className="flex justify-between items-start">
            <span className="px-3 py-1 text-xs uppercase tracking-wider font-mono bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-400">Promo Landing</span>
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
          </div>
          
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-white mb-3">AULA F75</h3>
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
               Interactive on-demand page for premium mechanical keyboards. Featuring high-performance video and simulated 3D rendering.
            </p>
            <a href="https://davidx1999.github.io/f75-site-test-2/#features" data-magnetic-button target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-semibold text-white uppercase tracking-wider border-b border-zinc-700 pb-1 hover:border-white transition-all">
              Access Launch <Plus className="w-3 h-3 text-zinc-500" />
            </a>
          </div>
        </motion.div>
        
        {/* Bottom Left Box: VINCENZO DATA SCIENCE */}
        <motion.div 
          variants={item} 
          data-magnetic-card
          onClick={(e) => { if(!e.target.closest('a')) e.currentTarget.querySelector('a').click() }}
          className="md:col-span-3 group relative border border-zinc-800 rounded-3xl overflow-hidden bg-zinc-900/50 backdrop-blur-md p-8 md:p-12 transition-all hover:bg-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8 cursor-pointer"
        >
           <div className="absolute inset-[1px] border border-white/5 rounded-3xl pointer-events-none" />
           <div className="w-full md:w-1/2">
             <span className="px-3 py-1 text-xs uppercase tracking-wider font-mono bg-zinc-950 border border-zinc-800 text-neon-green border-green-900/50 rounded-xl text-green-500 mb-4 inline-block">Retro Terminal OS</span>
             <h3 className="text-3xl font-bold text-white mb-4">Vincenzo Data Science</h3>
             <p className="text-zinc-400 leading-relaxed max-w-xl">
               A high-exclusivity interactive portfolio built on stretched architecture and an 80s-inspired shell terminal simulator, integrating matrix visualization for Big Data.
             </p>
           </div>
           
           <div className="w-full md:w-auto mt-6 md:mt-0">
             <Link to="/vincenzo" data-magnetic-button className="w-full md:w-auto inline-flex justify-center items-center gap-3 bg-zinc-100 text-zinc-950 px-8 py-4 rounded-full font-semibold transition-all hover:rounded-lg hover:scale-105 active:scale-95">
                Boot System <Terminal className="w-4 h-4" />
             </Link>
           </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
