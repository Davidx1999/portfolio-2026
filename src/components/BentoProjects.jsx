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
    <section id="projects" className="w-full py-24 container mx-auto px-6 lg:px-12 bg-background">
      <div className="flex items-center justify-between mb-12 border-b border-neutral-carvao/10 pb-6">
        <h2 className="text-3xl md:text-5xl font-serif text-neutral-carvao font-normal">
          Selected <span className="text-primary italic font-semibold">Works</span>
        </h2>
        <span className="font-mono text-[10px] text-neutral-carvao/40 uppercase tracking-[0.2em] hidden md:block">
          01 // Case Studies
        </span>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
      >
        {featuredProjects.map((p) => (
          <motion.div
            key={p.id}
            variants={itemAnim}
            className="relative h-[530px] rounded-2xl overflow-hidden group bg-white border border-neutral-carvao/10 shadow-sm flex flex-col cursor-pointer"
          >
            {/* Background Image Container */}
            <div className="absolute top-0 left-0 w-full h-[70%] overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
              />
            </div>

            {/* Gradient Transition into White Card Bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-white from-35% via-white/80 to-transparent pointer-events-none" />

            {/* Card Content Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col z-10">
              <h3 className="text-2xl font-serif font-bold text-neutral-carvao mb-2 tracking-tight">
                {p.title}
              </h3>
              <p className="text-neutral-carvao/70 text-sm mb-5 line-clamp-2 leading-relaxed">
                {p.description}
              </p>

              {/* Tags & Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {/* Rating Badge */}
                <span className="bg-semantic-yellow/15 border border-semantic-yellow/30 px-3 py-1 rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider text-neutral-carvao flex items-center gap-1">
                  {p.rating === '5.0' ? (
                    <Trophy size={11} className="text-semantic-red" />
                  ) : (
                    <Star size={11} className="text-semantic-red fill-current" />
                  )}
                  {p.rating} {p.badge}
                </span>
                
                {/* Category Tag */}
                <span className="bg-secondary/20 border border-secondary/35 px-3 py-1 rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider text-neutral-carvao">
                  {p.category}
                </span>
              </div>

              {/* Action Button: Primary Purple Action */}
              <Link
                to={p.link}
                className="w-full bg-primary text-neutral-branco py-3 rounded-xl font-mono text-[10px] font-bold uppercase tracking-widest hover:brightness-90 hover:scale-[1.01] active:scale-[0.99] transition-all text-center shadow-sm"
              >
                View Case
              </Link>
            </div>
          </motion.div>
        ))}

        {/* Full Width Card: Vincenzo */}
        <motion.div
          variants={itemAnim}
          className="md:col-span-2 group relative border border-neutral-carvao/10 rounded-2xl overflow-hidden bg-white p-8 md:p-12 transition-all hover:border-neutral-carvao/30 flex flex-col md:flex-row justify-between items-center gap-8 cursor-pointer shadow-sm"
        >
          <div className="w-full md:w-1/2 z-20">
            <span className="px-3 py-1 text-[9px] font-mono font-bold uppercase tracking-wider bg-semantic-red text-neutral-branco rounded-lg mb-4 inline-block shadow-sm">
              Retro Terminal OS
            </span>
            <h3 className="text-3xl font-serif font-bold text-neutral-carvao mb-4">
              Vincenzo Data Science
            </h3>
            <p className="text-neutral-carvao/70 font-sans text-sm leading-relaxed max-w-xl">
              High-exclusivity interactive portfolio built on an 80s-inspired shell terminal simulator.
            </p>
          </div>

          <div className="w-full md:w-auto mt-6 md:mt-0 z-20">
            <Link
              to="/vincenzo"
              className="w-full md:w-auto inline-flex justify-center items-center gap-3 bg-tertiary text-neutral-carvao hover:bg-[#b0c82f] px-8 py-3.5 rounded-xl font-mono text-[10px] font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-sm"
            >
              Boot System <Terminal className="w-4 h-4" />
            </Link>
          </div>

          {/* Vignette/Overlay for project image */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none">
            <img
              src={vincenzoImg}
              alt="Vincenzo"
              className="w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
