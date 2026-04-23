import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, Star, Terminal } from 'lucide-react';

import mapearImg from '../assets/mapear.jpg';
import aulaf75Img from '../assets/aulaf75.png';
import vincenzoImg from '../assets/vincenzo.jpg';

export function BentoProjects() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  const featuredProjects = [
    {
      id: 'mapear',
      category: 'Web App',
      title: 'Mapear Platform',
      description: 'Advanced mapping platform to optimize real-time geographic data visualization and routing with high precision.',
      image: mapearImg,
      rating: '4.9',
      badge: 'Enterprise',
      link: '/mapear'
    },
    {
      id: 'aula-f75',
      category: 'E-learning',
      title: 'Aula F75',
      description: 'Redesign of the online learning experience, elevating engagement through gamification and immersive interface.',
      image: aulaf75Img,
      rating: '5.0',
      badge: 'Guest Favorite',
      link: '/aula-f75'
    }
  ];

  return (
    <section id="projects" className="w-full py-24 container mx-auto px-6 lg:px-12">
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
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {featuredProjects.map((p) => (
          <motion.div
            key={p.id}
            variants={itemAnim}
            className="relative h-[520px] rounded-[2rem] overflow-hidden group bg-[#141514] border border-white/5 shadow-2xl flex flex-col cursor-pointer"
          >
            {/* Background Image no Topo */}
            <div className="absolute top-0 left-[-10px] w-[110%] h-[75%] overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Gradiente estilo "Fade para Escuro" */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#141514] from-40% via-[#141514]/80 to-transparent pointer-events-none" />

            {/* Conteúdo do Card */}
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col z-10">
              <h2 className="text-2xl font-semibold text-white mb-2 tracking-tight">
                {p.title}
              </h2>
              <p className="text-zinc-300 text-sm mb-5 line-clamp-2 leading-relaxed">
                {p.description}
              </p>

              {/* Tags/Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-xs text-white flex items-center gap-1 font-medium">
                  {p.rating === '5.0' ? <Trophy size={12} className="text-white" /> : <Star size={12} className="text-white fill-white" />}
                  {p.rating} {p.badge}
                </span>
                <span className="bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-xs text-white font-medium">
                  {p.category}
                </span>
              </div>

              {/* Botão Largo */}
              <Link
                to={p.link}
                className="w-full bg-white text-black py-3.5 rounded-2xl font-bold hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-center"
              >
                View Case
              </Link>
            </div>
          </motion.div>
        ))}

        {/* Full Width Bottom: Vincenzo (Special treatment) */}
        <motion.div
          variants={itemAnim}
          className="md:col-span-2 group relative border border-zinc-800 rounded-[2rem] overflow-hidden bg-[#141514] border-white/5 p-8 md:p-12 transition-all hover:bg-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8 cursor-pointer"
        >
          <div className="absolute inset-[1px] border border-white/5 rounded-[2rem] pointer-events-none" />

          <div className="w-full md:w-1/2 z-20">
            <span className="px-3 py-1 text-xs uppercase tracking-wider font-mono bg-zinc-950 border border-zinc-800 text-neon-green border-green-900/50 rounded-xl text-green-500 mb-4 inline-block">Retro Terminal OS</span>
            <h3 className="text-3xl font-bold text-white mb-4">Vincenzo Data Science</h3>
            <p className="text-zinc-400 leading-relaxed max-w-xl">
              High-exclusivity interactive portfolio built on an 80s-inspired shell terminal simulator.
            </p>
          </div>

          <div className="w-full md:w-auto mt-6 md:mt-0 z-20">
            <Link to="/vincenzo" className="w-full md:w-auto inline-flex justify-center items-center gap-3 bg-zinc-100 text-zinc-950 px-8 py-4 rounded-full font-semibold transition-all hover:rounded-lg hover:scale-105 active:scale-95">
              Boot System <Terminal className="w-4 h-4" />
            </Link>
          </div>

          <div className="absolute top-0 right-0 w-1/2 h-full opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
            <img src={vincenzoImg} alt="Vincenzo" className="w-full h-full object-cover grayscale" />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-transparent"></div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
