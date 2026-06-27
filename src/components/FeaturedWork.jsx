import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronRight, ArrowRight } from 'lucide-react';
import { TextButton, AsymmetricDrawerButton, LimeActionButton, MagneticTextLink } from './Buttons';

import focuslyImg from '../assets/focusly.png';
import formaStudioImg from '../assets/forma_studio.png';

export function FeaturedWork() {
  const [isDesktop, setIsDesktop] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(media.matches);
    const listener = (e) => setIsDesktop(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const projects = [
    {
      number: "01",
      title: "MAPEAR PLATFORM",
      subtitle: "Geographic Routing System",
      description: "Advanced mapping platform to optimize real-time geographic data visualization and routing with high precision. Connecting data layers, routing, and user interface for complex geotech needs.",
      tags: ["Web App", "Geotech"],
      image: `${import.meta.env.BASE_URL}assets/projects_cape/fgvmapear_cape.png`,
      link: "/mapear"
    },
    {
      number: "02",
      title: "AULA F75",
      subtitle: "E-learning Experience",
      description: "Redesign of the online learning experience, elevating engagement through gamification and an immersive interface. Empowering students with modern learning paths.",
      tags: ["E-learning", "Gamification"],
      image: `${import.meta.env.BASE_URL}assets/projects_cape/aulaf75_cape.png`,
      link: "/project/aula-f75"
    },
    {
      number: "03",
      title: "VINCENZO DATA",
      subtitle: "80s Terminal & Matrix Sim",
      description: "High-exclusivity interactive portfolio with 80s terminal simulation, matrix visualization for Big Data, and cymatics patterns.",
      tags: ["Interactive System", "Retro CLI"],
      image: `${import.meta.env.BASE_URL}assets/projects_cape/vincenzo_cape.png`,
      link: "/project/vincenzo"
    },
    {
      number: "04",
      title: "FORMA STUDIO",
      subtitle: "Design Agency Website",
      description: "Minimal, editorial website for a creative studio showcasing work with strong identity. Clean typography, grid layouts, and smooth animations.",
      tags: ["Web Design", "Development"],
      image: formaStudioImg,
      link: "/project/forma-studio"
    }
  ];

  // Render on desktop (Sticky Stacked Accordion)
  const renderDesktop = () => {
    const cardHeightVar = "max(400px, calc(92vh - 336px))";
    const numCards = projects.length;

    return (
      <section
        id="featured-work"
        ref={sectionRef}
        className="relative w-full bg-[var(--color-background)] pb-4"
        style={{ height: `calc(61px + (4 * ${cardHeightVar}) + 100vh)` }}
      >
        {/* Header Row - Sticky below Navbar (72px + 24px = 96px) */}
        <div
          className="sticky z-[30] h-[64px] w-full bg-[var(--color-background)] border-t border-b border-neutral-carvao/20"
          style={{ top: '88px' }}
        >
          {/* Inner Header Content centered with horizontal padding */}
          <div className="w-full h-full px-6 md:px-[calc(16%-24px)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-lime-500)] animate-pulse" />
              <span className="font-sans font-bold text-xs tracking-wider uppercase text-[var(--color-foreground)]">
                Featured Work
              </span>
            </div>
            <MagneticTextLink as={Link} to="/projects">
              View All Projects
              <ArrowRight size={16} className="transition-transform duration-300 group-hover/link:translate-x-1" />
            </MagneticTextLink>
          </div>
        </div>

        {/* Stacking Rows — each card is sticky directly inside the section */}
        {projects.map((project, index) => {
          // Navbar = 72px + 24px gap = 96px. Header = 64px + 1px border overlap = 160px
          // Each subsequent card peeks 64px below the previous
          const topOffset = 144 + index * 64;
          const zIndex = 11 + index;

          const isOdd = index % 2 === 0;
          const bgImage = isOdd
            ? `${import.meta.env.BASE_URL}assets/BG/bg_neutral_carvao.png`
            : `${import.meta.env.BASE_URL}assets/BG/bg_lilas.png`;
          const textColorClass = isOdd
            ? "text-[var(--color-background)]"
            : "text-neutral-carvao";
          const borderColorClass = isOdd
            ? "border-[var(--color-background)]/20"
            : "border-neutral-carvao/20";
          const tagBorderColorClass = isOdd
            ? "border-[var(--color-background)]/30"
            : "border-neutral-carvao/20";
          const tagTextColorClass = isOdd
            ? "text-[var(--color-background)]/80"
            : "text-neutral-carvao/80";
          const hoverLinkColorClass = isOdd
            ? "hover:text-[var(--color-lime-500)]"
            : "hover:text-[var(--color-primary)]";

          return (
            <div
              key={project.number}
              data-card-index={index}
              data-magnetic-card
              className={`group/card sticky w-full border-t border-b border-neutral-carvao/20 -mt-[1px] overflow-hidden bg-white`}
              style={{
                top: `${topOffset}px`,
                height: `calc(${cardHeightVar})`,
                zIndex: zIndex,
              }}
            >
              {/* Content wrapper with the intended padding */}
              <Link to={project.link} className="w-full h-full px-6 md:px-[calc(16%-24px)] grid grid-cols-12 cursor-pointer no-underline text-neutral-carvao">
                {/* Column 1: Number */}
                <div className="col-span-1 border-l border-r border-neutral-carvao/20 flex flex-col justify-start items-center">
                  <div className="h-[64px] flex items-center justify-center font-sans font-bold text-sm md:text-base text-neutral-carvao">
                    {project.number} /
                  </div>
                </div>

                {/* Column 2: Image (Width increased to col-span-5) */}
                <div className="col-span-5 border-r border-neutral-carvao/20 h-full relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover/card:grayscale-0 transition-all duration-700 ease-out group-hover/card:scale-105"
                  />
                  {/* Halftone Texture Overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-60 transition-opacity duration-700 group-hover/card:opacity-30"
                    style={{
                      backgroundImage: `url(${import.meta.env.BASE_URL}assets/Textures/texture.png)`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                </div>

                {/* Column 3: Text Content (Width set to col-span-6) */}
                <div className="col-span-6 flex flex-col h-full border-r border-neutral-carvao/20">
                  {/* Title Area (Header align) — gets the background image */}
                  <div
                    className={`h-[64px] border-b border-neutral-carvao/20 px-8 flex items-center`}
                    style={{
                      backgroundImage: `url(${bgImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <h3 className={`font-sans font-bold text-[20px] uppercase tracking-wider ${textColorClass}`}>
                      {project.title}
                    </h3>
                  </div>

                  {/* Body Area */}
                  <div className="flex-grow p-8 flex flex-col justify-between overflow-hidden">
                    <div className="flex flex-col gap-3 lg:gap-4">
                      <h4 className="font-sans font-light text-2xl lg:text-3xl xl:text-4xl text-neutral-carvao tracking-tight leading-tight max-w-xl">
                        {project.subtitle}
                      </h4>
                      <p className="font-sans text-xs lg:text-sm text-neutral-carvao/75 max-w-lg leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4 lg:mt-6">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="border border-neutral-carvao/20 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-[2px] text-neutral-carvao/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Purple primary variant with light-toned icon/label */}
                      <AsymmetricDrawerButton
                        as="div"
                        data-magnetic-button
                        icon={ChevronRight}
                        theme="purple"
                        variant="primary"
                      >
                        View Project
                      </AsymmetricDrawerButton>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}

      </section>
    );
  };

  // Render on Mobile/Tablet (Normal scroll flow, elegant layout)
  const renderMobile = () => {
    return (
      <section id="featured-work" className="w-full bg-[var(--color-background)] px-0 pt-12 pb-6">
        {/* Mobile Header Row */}
        <div className="flex items-center justify-between border-b border-neutral-carvao/20 pb-4 mb-8 px-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-lime-500)]" />
            <span className="font-sans font-bold text-xs tracking-wider uppercase text-[var(--color-foreground)]">
              Featured Work
            </span>
          </div>
          <MagneticTextLink as={Link} to="/projects">
            View All
            <ArrowRight size={16} className="transition-transform duration-300 group-hover/link:translate-x-1" />
          </MagneticTextLink>
        </div>

        {/* Mobile Projects Stack */}
        <div className="flex flex-col gap-12">
          {projects.map((project, index) => {
            const isOdd = index % 2 === 0;
            const bgImage = isOdd
              ? `${import.meta.env.BASE_URL}assets/BG/bg_neutral_carvao.png`
              : `${import.meta.env.BASE_URL}assets/BG/bg_lilas.png`;
            const textColorClass = isOdd
              ? "text-[var(--color-background)]"
              : "text-neutral-carvao";
            const borderColorClass = isOdd
              ? "border-[var(--color-background)]/20"
              : "border-neutral-carvao/20";
            const tagBorderColorClass = isOdd
              ? "border-[var(--color-background)]/30"
              : "border-neutral-carvao/20";
            const tagTextColorClass = isOdd
              ? "text-[var(--color-background)]/80"
              : "text-neutral-carvao/80";

            return (
              <Link
                key={project.number}
                to={project.link}
                className="group/card flex flex-col border-t border-b border-neutral-carvao/20 -mt-[1px] overflow-hidden bg-white cursor-pointer no-underline text-neutral-carvao"
              >
                {/* Header inside Mobile card — gets the background image */}
                <div
                  className="flex items-center justify-between border-b border-neutral-carvao/20 px-6 py-3"
                  style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <span className={`font-mono text-xs font-bold ${textColorClass}/60`}>
                    {project.number} /
                  </span>
                  <span className={`font-sans font-semibold text-[20px] uppercase tracking-wider ${textColorClass}`}>
                    {project.title}
                  </span>
                </div>

                {/* Image Block */}
                <div className="w-full aspect-[4/3] overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover/card:grayscale-0 transition-all duration-700 ease-out group-hover/card:scale-105"
                  />
                </div>

                {/* Text content */}
                <div className="p-6 flex flex-col gap-4 border-t border-neutral-carvao/20">
                  <div className="flex flex-col gap-1">
                    <h4 className="font-sans font-bold text-lg text-neutral-carvao leading-snug">
                      {project.subtitle}
                    </h4>
                    <p className="font-sans text-xs text-neutral-carvao/75 leading-relaxed mt-1">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="border border-neutral-carvao/20 text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-[2px] text-neutral-carvao/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-neutral-carvao/10 flex justify-end">
                    <AsymmetricDrawerButton
                      as="div"
                      icon={ChevronRight}
                      theme="purple"
                      variant="primary"
                    >
                      View Project
                    </AsymmetricDrawerButton>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    );
  };

  return isDesktop ? renderDesktop() : renderMobile();
}

