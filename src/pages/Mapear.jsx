import { PageTransition } from '../components/PageTransition';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export function Mapear() {
  return (
    <PageTransition>
      <main className="min-h-screen w-full flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl border border-zinc-800 bg-surface/50 backdrop-blur-xl p-12 md:p-24 rounded-3xl"
        >
          <div className="w-16 h-16 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-8">
            <span className="w-2 h-2 bg-true-pink rounded-full animate-pulse"></span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">
            Mapear <span className="text-zinc-600">Case Study</span>
          </h1>
          
          <p className="text-zinc-400 leading-relaxed mb-10 max-w-lg mx-auto">
            This space is currently a designated placeholder. Layouts, data visualization architecture, and UX methodologies for the Mapear ecosystem are under construction.
          </p>
          
          <button 
            data-cursor="primary" 
            className="px-8 py-4 bg-white text-black font-semibold rounded-xl uppercase tracking-widest text-xs hover:scale-105 transition-transform flex items-center gap-2 mx-auto" 
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4" /> Return to Index
          </button>
        </motion.div>
      </main>
    </PageTransition>
  );
}
