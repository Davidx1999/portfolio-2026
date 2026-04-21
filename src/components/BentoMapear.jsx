import { motion } from 'framer-motion';

export function BentoMapear() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  return (
    <section id="mapear" className="w-full py-32 border-t border-zinc-900">
      <div className="mb-16">
        <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-zinc-100 mb-4">
          Projeto Mapear
        </h2>
        <p className="text-xl text-zinc-500 max-w-3xl">
          Quatro anos arquitetando e evoluindo uma plataforma enterprise. O desafio central foi traduzir complexidade colossal em interações fluidas, focadas em usabilidade (IHC) e num handoff livre de fricções.
        </p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 auto-rows-[300px]"
      >
        {/* Card 1: 4 Anos de Processo (Largo) */}
        <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-1 border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-xl rounded-[2.5rem] p-8 flex flex-col justify-between shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="text-zinc-600 font-mono text-sm tracking-widest uppercase">Escala Temporal</div>
          <div>
            <h3 className="text-3xl font-semibold text-zinc-200 mb-2">Processo Ininterrupto</h3>
            <p className="text-zinc-400">Desenvolvimento contínuo da arquitetura da plataforma e do produto. Refinamentos modulares ano após ano.</p>
          </div>
        </motion.div>

        {/* Card 2: Handoff Extremo (Quadrado Alto) */}
        <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-2 border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-xl rounded-[2.5rem] p-8 flex flex-col justify-between shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
           <div className="text-zinc-600 font-mono text-sm tracking-widest uppercase relative z-10">Integração</div>
           
           <div className="flex-1 flex flex-col items-center justify-center relative my-8">
              {/* Perpetual Micro-Animation for Handoff sync */}
              <div className="w-16 h-16 border border-zinc-700/50 rounded-lg flex relative mb-4">
                 <motion.div 
                   animate={{ y: [0, -10, 0] }}
                   transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute top-2 left-2 right-2 h-1 bg-zinc-500 rounded-full"
                 />
                 <motion.div 
                   animate={{ opacity: [0.3, 1, 0.3] }}
                   transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                   className="w-full h-full bg-zinc-800/50 rounded-lg"
                 />
              </div>
              <div className="text-center">
                 <span className="block text-2xl font-mono text-zinc-100 mb-1">UI/UX {'->'} DEV</span>
                 <span className="text-sm text-zinc-500">Lossless Handoff</span>
              </div>
           </div>

           <div>
              <p className="text-zinc-400 text-sm">Garantia absoluta de que a vivência visual seria 100% implementável pelos engenheiros.</p>
           </div>
        </motion.div>

        {/* Card 3: IHC & User Testing */}
        <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1 border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-xl rounded-[2.5rem] p-8 flex flex-col justify-between shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
          <div className="text-zinc-600 font-mono text-sm tracking-widest uppercase">User Testing</div>
          <div>
            <h3 className="text-2xl font-semibold text-zinc-200 mb-2">Usabilidade</h3>
            <p className="text-zinc-400 text-sm">Design focado em performance humana (IHC). Menos cliques e menor carga cognitiva.</p>
          </div>
        </motion.div>

         {/* Card 4: Experiências e Interfaces */}
         <motion.div variants={itemVariants} className="md:col-span-3 md:row-span-1 border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-xl rounded-[2.5rem] p-8 flex gap-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] overflow-hidden relative">
          <div className="w-1/3 border-r border-zinc-800/50 pr-8 hidden md:flex flex-col justify-end">
            <span className="text-4xl font-mono text-zinc-300">4+</span>
            <span className="text-zinc-500 font-mono text-sm uppercase">Anos de Dados Visuais</span>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-zinc-200 mb-2">As Interfaces Mapear</h3>
            <p className="text-zinc-400 relative z-10 w-full max-w-lg">
              Um sistema de experiências interligadas. Criação de fluxos, componentes de estado zero (empty states) polidos e loops de feedback em tempo real.
            </p>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
