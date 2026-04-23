import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Play, Trophy, Star } from 'lucide-react';
import { PROJECTS } from '../data/projects';

const pad = (n) => String(n).padStart(2, '0');

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemAnim = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 20 } },
};

export function Projects() {
  const featuredProjects = PROJECTS.filter(p => p.featured);
  const listProjects = PROJECTS.filter(p => !p.featured);

  return (
    <div className="min-h-screen pt-32 pb-32 px-6 lg:px-12 max-w-6xl mx-auto">

      {/* ── Page header ───────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-20"
      >
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-500 mb-5">
          Selected work · 2022 – 2024
        </p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-100 leading-none mb-6">
          Craft, Brand<br />
          <span className="text-zinc-600 italic font-light">&amp; Motion.</span>
        </h1>
        <p className="text-zinc-400 max-w-lg leading-relaxed font-light">
          A selection of projects in UI/UX, visual identity, illustration, and animation —
          all available on Behance.
        </p>
      </motion.div>

      {/* ── Featured Cards ───────────────── */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24"
      >
        {featuredProjects.map((p) => (
          <motion.div 
            key={p.id} 
            variants={itemAnim}
            className="relative h-[520px] rounded-[2rem] overflow-hidden group bg-[#141514] border border-white/5 shadow-2xl flex flex-col"
          >
            {/* Background Image no Topo */}
            <div className="absolute top-0 left-0 w-full h-[65%] overflow-hidden">
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
                to={['mapear', 'vincenzo', 'aula-f75'].includes(p.id) ? `/${p.id}` : `/project/${p.id}`}
                className="w-full bg-white text-black py-3.5 rounded-2xl font-bold hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-center"
              >
                View Case
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Divider ────────────────────────────────── */}
      <div className="w-full h-[1px] bg-zinc-800/60 mb-2" />

      {/* ── Project list ───────────────────────────── */}
      <motion.ul
        variants={container}
        initial="hidden"
        animate="show"
        className="divide-y divide-zinc-800/60"
      >
        {listProjects.map((p, index) => (
          <motion.li
            key={p.id}
            variants={itemAnim}
            className="group grid grid-cols-[48px_1fr_auto] md:grid-cols-[56px_1fr_auto_auto] items-center gap-x-6 py-8 transition-colors hover:bg-zinc-900/40 px-4 -mx-4 rounded-2xl cursor-default"
          >
            {/* Index */}
            <span className="font-mono text-xs text-zinc-700 group-hover:text-zinc-500 transition-colors">
              {pad(index + 3)}
            </span>

            {/* Main body */}
            <div className="flex flex-col gap-2 min-w-0">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                {p.category}
              </span>
              <h2 className="text-xl md:text-2xl font-semibold text-zinc-200 tracking-tight group-hover:text-white transition-colors truncate">
                {p.title}
              </h2>
              <p className="text-sm text-zinc-500 leading-relaxed hidden md:block max-w-xl">
                {p.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-1">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-mono border border-zinc-800 rounded-full text-zinc-600 group-hover:border-zinc-700 group-hover:text-zinc-500 transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Year — hidden on small screens */}
            <span className="font-mono text-xs text-zinc-700 hidden md:block">
              {p.year}
            </span>

            {/* CTAs */}
            <div className="flex flex-col gap-2 items-end shrink-0">
              <Link
                to={['mapear', 'vincenzo', 'aula-f75'].includes(p.id) ? `/${p.id}` : `/project/${p.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-700 bg-zinc-900 text-zinc-300 font-mono text-[10px] uppercase tracking-wider transition-all duration-200 hover:rounded-lg hover:bg-zinc-800 hover:border-zinc-500 hover:text-white whitespace-nowrap"
              >
                View Case <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.li>
        ))}
      </motion.ul>

      {/* ── Bottom divider ─────────────────────────── */}
      <div className="w-full h-[1px] bg-zinc-800/60 mt-2" />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="font-mono text-[10px] uppercase tracking-widest text-zinc-700 mt-12 text-right"
      >
        {PROJECTS.length} projects · Behance
      </motion.p>
    </div>
  );
}
