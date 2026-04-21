import { motion } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';

const PROJECTS = [
  {
    id: 1,
    title: 'UI/UX Study Case',
    category: 'UI · UX Design',
    year: '2024',
    tags: ['UI', 'UX', 'Research'],
    description: 'Estudo de caso completo explorando fluxos de usuário, wireframes e prototipagem de alta fidelidade.',
    behance: 'https://www.behance.net/gallery/214858013/UIUX-Study-Case',
  },
  {
    id: 2,
    title: 'Plataforma CEnPE',
    category: 'Product Design',
    year: '2024',
    tags: ['Product', 'UI', 'Platform'],
    description: 'Design de plataforma empresarial para o Centro de Empreendedorismo e Novos Projetos da FGV.',
    behance: 'https://www.behance.net/gallery/207396025/Plataforma-CEnPE',
  },
  {
    id: 3,
    title: 'Estudo de Kinect Type',
    category: 'Typography · Motion',
    year: '2023',
    tags: ['Typography', 'Motion', 'Kinect'],
    description: 'Exploração tipográfica interativa combinando movimento e design de tipos em ambiente digital.',
    behance: 'https://www.behance.net/gallery/168235069/Estudo-de-Kinect-Type-Udemycom',
  },
  {
    id: 4,
    title: 'CEnPE Brand Design',
    category: 'Branding · Identity',
    year: '2023',
    tags: ['Branding', 'Identity', 'Logo'],
    description: 'Construção completa da identidade visual do CEnPE, da marca ao sistema gráfico.',
    behance: 'https://www.behance.net/gallery/163169405/CEnPE-Brand-Design',
  },
  {
    id: 5,
    title: 'Oni Blood Hashira',
    category: 'Illustration · Digital Art',
    year: '2023',
    tags: ['Illustration', 'Digital Art', 'Character'],
    description: 'Ilustração digital de personagem com referências ao universo de Demon Slayer.',
    behance: 'https://www.behance.net/gallery/167610879/Oni-Blood-Hashira',
  },
  {
    id: 6,
    title: 'A Presa — Curta 2D',
    category: 'Animation · Film',
    year: '2023',
    tags: ['Animation', '2D', 'Short Film'],
    description: 'Curta-metragem de animação 2D com narrativa visual e direção de arte autoral.',
    behance: 'https://www.behance.net/gallery/166913877/A-Presa-Curta-Metragem-2d',
    vimeo: 'https://vimeo.com/811815113',
  },
  {
    id: 7,
    title: 'Programe_ce Brand Design',
    category: 'Branding · Identity',
    year: '2023',
    tags: ['Branding', 'Identity', 'Logo'],
    description: 'Identidade visual completa para o programa Programe_ce de educação em tecnologia.',
    behance: 'https://www.behance.net/gallery/163168495/Programe_ce-Brand-Design',
  },
  {
    id: 8,
    title: 'Guaraci — Stop Motion',
    category: 'Animation · Film',
    year: '2022',
    tags: ['Stop Motion', 'Animation', 'Film'],
    description: 'Curta-metragem em stop motion com construção artesanal de cenários e personagens.',
    behance: 'https://www.behance.net/gallery/137853795/Guaraci-Curta-em-Stop-Motion',
    vimeo: 'https://vimeo.com/679789333',
  },
];

const pad = (n) => String(n).padStart(2, '0');

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 20 } },
};

export function Projects() {
  return (
    <div className="min-h-screen pt-28 pb-32 px-6 lg:px-12 max-w-6xl mx-auto">

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
          Um recorte de projetos em UI/UX, identidade visual, ilustração e animação —
          todos disponíveis no Behance.
        </p>
      </motion.div>

      {/* ── Divider ────────────────────────────────── */}
      <div className="w-full h-[1px] bg-zinc-800 mb-2" />

      {/* ── Project list ───────────────────────────── */}
      <motion.ul
        variants={container}
        initial="hidden"
        animate="show"
        className="divide-y divide-zinc-800/60"
      >
        {PROJECTS.map((p) => (
          <motion.li
            key={p.id}
            variants={item}
            className="group grid grid-cols-[48px_1fr_auto] md:grid-cols-[56px_1fr_auto_auto] items-center gap-x-6 py-8 transition-colors hover:bg-zinc-900/40 px-4 -mx-4 rounded-2xl cursor-default"
          >
            {/* Index */}
            <span className="font-mono text-xs text-zinc-700 group-hover:text-zinc-500 transition-colors">
              {pad(p.id)}
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
              {/* Behance button */}
              <a
                href={p.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-700 bg-zinc-900 text-zinc-300 font-mono text-[10px] uppercase tracking-wider transition-all duration-200 hover:rounded-lg hover:bg-zinc-800 hover:border-zinc-500 hover:text-white whitespace-nowrap"
              >
                Behance <ArrowUpRight className="w-3 h-3" />
              </a>

              {/* Vimeo button — only for films */}
              {p.vimeo && (
                <a
                  href={p.vimeo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-900/60 bg-violet-950/30 text-violet-400 font-mono text-[10px] uppercase tracking-wider transition-all duration-200 hover:rounded-lg hover:bg-violet-900/40 hover:border-violet-600 hover:text-violet-200 whitespace-nowrap"
                >
                  <Play className="w-3 h-3 fill-current" /> Vimeo
                </a>
              )}
            </div>
          </motion.li>
        ))}
      </motion.ul>

      {/* ── Bottom divider ─────────────────────────── */}
      <div className="w-full h-[1px] bg-zinc-800 mt-2" />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="font-mono text-[10px] uppercase tracking-widest text-zinc-700 mt-12 text-right"
      >
        {PROJECTS.length} projetos · Behance
      </motion.p>
    </div>
  );
}
