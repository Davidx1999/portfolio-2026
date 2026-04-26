import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="w-full h-screen flex flex-col justify-center relative overflow-hidden">
      {/* Background Video Engine - Starts at Pixel 0 */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          onContextMenu={(e) => e.preventDefault()}
          controlsList="nodownload"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        >
          <source src={`${import.meta.env.BASE_URL}assets/bg_hero.mp4`} type="video/mp4" />
        </video>

        {/* Dynamic Fog Overlay - Left Side Only for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-transparent z-[1]"></div>

        {/* Bottom Transition Gradient - Blends with the rest of the page (#0a0a0a) */}
        <div className="absolute inset-x-0 -bottom-1 h-[50vh] bg-gradient-to-t from-[#0a0a0a] from-15% via-[#0a0a0a]/80 to-transparent z-[2]"></div>

        {/* Subtle vignette for depth */}
        <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.3)] z-[1]"></div>
      </div>



      <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full flex items-center justify-center">
        {/* Main Typography content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="flex flex-col gap-6 max-w-4xl -translate-x-8 md:-translate-x-24 lg:-translate-x-40"
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
