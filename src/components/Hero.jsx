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

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-[4rem] md:text-[6rem] lg:text-[7.5rem] font-bold tracking-tighter leading-[0.95] mb-8 text-white drop-shadow-lg"
        >
          Design<br />
          <span className="italic font-normal text-[#52525c]">&amp; Interface Engineering.</span>
        </motion.h1>

          <p className="max-w-[55ch] text-zinc-400 text-lg md:text-xl leading-relaxed mt-4 backdrop-blur-[2px]">
            Focused on creating digital products with high agency. Bridging the gap between aesthetics and engineering, I ensure technical handoffs are flawless.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-8">
            <a 
              href="#projects"
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
