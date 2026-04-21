import { PageTransition } from '../components/PageTransition';
import { motion } from 'framer-motion';
import { ExternalLink, Sparkles } from 'lucide-react';

export function Vincenzo() {
  return (
    <PageTransition>
      <main className="min-h-screen w-full flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl border border-green-900/40 bg-zinc-950/80 backdrop-blur-xl p-12 md:p-24 rounded-3xl"
        >
          <div className="w-16 h-16 rounded-xl bg-black border border-green-800 flex items-center justify-center mx-auto mb-8 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
            <span className="font-mono text-green-500 font-bold tracking-tighter">._</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">
            Vincenzo DS <span className="text-green-500">Terminal</span>
          </h1>
          
          <p className="text-zinc-400 font-mono text-sm leading-relaxed mb-10 max-w-lg mx-auto">
            [SYS_MESSAGE]: Placeholder deployed. Retro terminal layout and Data Science matrices are currently compiling in the background. Waiting for user input.
          </p>

          <p className="text-zinc-600 font-mono text-xs uppercase tracking-widest mb-6">// Select experience mode</p>

          <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4">
            <a
              href="/vincenzosite/teste.html"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="primary"
              className="px-6 py-4 bg-zinc-100 text-zinc-900 border border-zinc-700 font-semibold rounded-xl uppercase tracking-widest text-xs hover:bg-white hover:scale-105 transition-all inline-flex items-center justify-center gap-2 flex-1"
            >
              Access Data Scientist World <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="/vincenzosite/portfolio_hero_cimatics.html"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="primary"
              className="px-6 py-4 bg-transparent text-green-400 border border-green-800 font-semibold rounded-xl uppercase tracking-widest text-xs hover:bg-green-950 hover:border-green-500 hover:scale-105 transition-all inline-flex items-center justify-center gap-2 flex-1"
            >
              Cymatics Experience <Sparkles className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </main>
    </PageTransition>
  );
}

