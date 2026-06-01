import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { TextButton } from './Buttons';

import focuslyImg from '../assets/focusly.png';
import formaStudioImg from '../assets/forma_studio.png';

export function FeaturedWork() {
  const projects = [
    {
      number: "01",
      title: "MAPEAR PLATFORM",
      subtitle: "Geographic Routing System",
      description: "Advanced mapping platform to optimize real-time geographic data visualization and routing with high precision.",
      tags: ["Web App", "Geotech"],
      image: `${import.meta.env.BASE_URL}assets/projects_cape/fgvmapear.png`,
      link: "/projects/mapear",
      bgStyle: { backgroundImage: `url(${import.meta.env.BASE_URL}assets//BG/bg_neutral_carvao.png)`, backgroundSize: 'cover', backgroundPosition: 'center' },
      textColorClass: "text-[var(--color-background)]",
      borderColorClass: "border-[var(--color-background)]"
    },
    {
      number: "02",
      title: "AULA F75",
      subtitle: "E-learning Experience",
      description: "Redesign of the online learning experience, elevating engagement through gamification and immersive interface.",
      tags: ["E-learning", "Gamification"],
      image: `${import.meta.env.BASE_URL}assets/projects_cape/aulaf75.png`,
      link: "/projects/aula-f75",
      bgStyle: { backgroundImage: `url(${import.meta.env.BASE_URL}assets//BG/bg_lilas.png)`, backgroundSize: 'cover', backgroundPosition: 'center' },
      textColorClass: "text-[var(--color-foreground)]",
      borderColorClass: "border-[var(--color-foreground)]"
    },
    {
      number: "03",
      title: "FOCUSLY",
      subtitle: "Productivity App",
      description: "A clean and motivating productivity app that helps users build better routines and stay focused.",
      tags: ["UI/UX Design", "Mobile App"],
      image: focuslyImg,
      link: "/projects/focusly",
      bgStyle: { backgroundImage: `url(${import.meta.env.BASE_URL}assets//BG/bg_lilas.png)`, backgroundSize: 'cover', backgroundPosition: 'center' },
      textColorClass: "text-[var(--color-foreground)]",
      borderColorClass: "border-[var(--color-foreground)]"
    },
    {
      number: "04",
      title: "FORMA STUDIO",
      subtitle: "Design Agency Website",
      description: "Minimal, editorial website for a creative studio showcasing work with strong identity.",
      tags: ["Web Design", "Development"],
      image: formaStudioImg,
      link: "/projects/forma-studio",
      bgStyle: { backgroundImage: `url(${import.meta.env.BASE_URL}assets//BG/bg_neutral_carvao.png)`, backgroundSize: 'cover', backgroundPosition: 'center' },
      textColorClass: "text-[var(--color-background)]",
      borderColorClass: "border-[var(--color-background)]"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
  };

  return (
    <section id="featured-work" className="w-full bg-[var(--color-background)]">
      {/* Horizontal Divider Line */}
      <div className="w-full h-[1px] bg-[var(--color-foreground)]" />

      {/* Header Row */}
      <div className="pt-6 pb-1 px-6 md:px-[16%] flex items-center justify-between bg-[var(--color-background)]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-lime-500)]" />
          <span className="font-sans font-bold text-xs tracking-wider uppercase text-[var(--color-foreground)]">
            Featured Work
          </span>
        </div>
        <TextButton as={Link} to="/projects" variant="secondary">
          View All Projects
        </TextButton>
      </div>

      {/* Grid of Cards */}
      <div className="pt-2 pb-8 px-6 md:px-[16%] w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.number}
              variants={itemVariants}
              className="border border-[var(--color-foreground)] rounded-[2px] overflow-hidden flex flex-col md:flex-row h-auto md:aspect-[16/9] md:h-auto bg-[var(--color-background)] group shadow-sm"
            >
              {/* Left Side: Image (60%) */}
              <div className="w-full md:w-[60%] h-[220px] md:h-full relative overflow-hidden bg-black/5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-103 grayscale group-hover:grayscale-0"
                />
                {/* Halftone Texture Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-60 transition-opacity duration-700 group-hover:opacity-30"
                  style={{
                    backgroundImage: `url(${import.meta.env.BASE_URL}assets/Textures/texture.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
              </div>

              {/* Divider Line between Image and Info */}
              <div className="hidden md:block w-[1px] bg-[var(--color-foreground)] self-stretch" />
              <div className="block md:hidden h-[1px] w-full bg-[var(--color-foreground)]" />

              {/* Right Side: Info (40%) */}
              <div
                className="w-full md:w-[40%] p-6 md:p-8 flex flex-col justify-between relative"
                style={project.bgStyle}
              >
                <div className={project.textColorClass}>
                  {/* Number Bubble */}
                  <div className={`border ${project.borderColorClass} rounded-full h-7 w-12 flex items-center justify-center font-mono text-xs mb-6`}>
                    {project.number}
                  </div>

                  {/* Title */}
                  <h3 className="font-sans font-bold text-xl md:text-2xl uppercase tracking-tight leading-none">
                    {project.title}
                  </h3>

                  {/* Subtitle */}
                  <h4 className="font-sans font-medium text-xs md:text-sm opacity-85 mt-1.5 leading-none">
                    {project.subtitle}
                  </h4>

                  {/* Description */}
                  <p className="font-sans text-xs md:text-sm opacity-75 mt-6 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Bottom section with tags */}
                <div className="mt-8 md:mt-0 flex items-end justify-between">
                  {/* Tags stack */}
                  <div className="flex flex-col gap-1.5">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`border ${project.borderColorClass} ${project.textColorClass} font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-[2px] block w-fit leading-none`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Absolute sliding icon button matching Lime Action's icon block */}
                <Link
                  to={project.link}
                  aria-label={`View case study for ${project.title}`}
                  data-cursor="secondary"
                  className={`h-12 w-12 border-t border-l ${project.borderColorClass} bg-[var(--color-foreground)] text-[var(--color-tertiary)] group-hover:bg-[var(--color-tertiary)] group-hover:text-[var(--color-foreground)] overflow-hidden absolute right-0 bottom-0 flex items-center justify-center transition-colors duration-500 cursor-pointer`}
                >
                  <ArrowRight size={16} className="absolute inset-0 m-auto transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)] translate-x-0 group-hover:translate-x-8" />
                  <ArrowRight size={16} className="absolute inset-0 m-auto transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)] -translate-x-8 group-hover:translate-x-0" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
