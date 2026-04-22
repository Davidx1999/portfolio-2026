import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="w-full min-h-[90dvh] flex flex-col justify-center py-20 relative overflow-hidden">
      {/* Background Active Motion Engine */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40 pointer-events-none">
          <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="w-[80vw] h-[80vw] max-w-[1200px] max-h-[1200px] border-[1px] border-zinc-800/60 rounded-full border-dashed flex items-center justify-center relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-zinc-800/10 to-transparent mix-blend-overlay rounded-full"></div>
              
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                className="w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] border-[1px] border-zinc-700/40 rounded-full flex items-center justify-center relative"
                >
                  <div className="w-4 h-4 bg-zinc-300 rounded-full blur-[2px] shadow-[0_0_20px_10px_rgba(255,255,255,0.1)]"></div>
                  <div className="absolute bottom-10 left-20 w-2 h-2 bg-zinc-500 rounded-full blur-[1px]"></div>
                  
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] border-[1px] border-zinc-600/20 rounded-full border-dotted flex items-center justify-center"
                    >
                  </motion.div>
              </motion.div>
          </motion.div>
          
          <div className="absolute bottom-10 right-10 text-zinc-700 font-mono text-sm uppercase flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-zinc-600 animate-pulse"></div> Active Motion Engine
          </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full flex items-center h-full">
        {/* Main Typography content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="flex flex-col gap-6 max-w-4xl"
        >
          <div className="flex items-center gap-4">
            <span className="h-[1px] w-12 bg-zinc-700 block"></span>
            <span className="text-zinc-500 font-mono tracking-widest text-xs font-semibold uppercase">
              David Salviano // IHC Professional
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl lg:text-[7rem] tracking-tighter leading-[0.95] text-zinc-50 font-bold backdrop-blur-[2px]">
            Design <br/>
            <span className="text-zinc-500">&</span> Interface<br />
            Egineering.
          </h1>

          <p className="max-w-[55ch] text-zinc-400 text-lg md:text-xl leading-relaxed mt-4 backdrop-blur-[2px]">
            UI/UX Designer and HCI Researcher crafting interfaces that feel like a trick but scale like an engine. I bridge the gap between complex design and seamless dev handoffs—no illusions, just high-agency products.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-8">
            <a 
              href="#projetos"
              className="bg-zinc-100 text-zinc-950 px-8 py-4 rounded-full font-semibold transition-all hover:rounded-lg hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              Explore Projects <ChevronRight className="w-4 h-4" />
            </a>
            <Link 
              to="/about" 
              className="text-zinc-500 hover:text-zinc-300 transition-colors underline underline-offset-4 decoration-zinc-800 uppercase tracking-wider text-sm font-semibold"
            >
              About Me
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
