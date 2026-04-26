import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

export function Navbar() {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  const links = [
    { id: '/projects', label: 'Projects' },
    { id: '/about', label: 'About Me' },
    { id: '/mapear', label: 'Mapear' },
    { id: '/aula-f75', label: 'Aula F75' },
    { id: '/vincenzo', label: 'Fadda' }
  ];

  return (
    <>
      {/* Top HUD - Mantive o mix-blend-difference para o logo e texto lateral */}
      <div className="fixed top-0 left-0 right-0 p-6 md:p-8 z-[100] flex items-start justify-between pointer-events-none mix-blend-difference text-white">
        <Link
          to="/"
          className="pointer-events-auto flex items-center gap-3 tracking-tight group transition-colors focus:outline-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="w-8 h-8 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <img
              src={`${import.meta.env.BASE_URL}Union.svg`}
              alt="DS"
              className="w-full h-full transition-all duration-300"
              style={{
                filter: isHovered
                  ? 'brightness(0) saturate(100%) invert(21%) sepia(91%) saturate(6146%) hue-rotate(344deg) brightness(98%) contrast(101%)'
                  : 'brightness(0) saturate(100%) invert(100%)'
              }}
            />
          </div>
          <span className="font-semibold text-lg drop-shadow-lg hidden sm:block">David Salviano</span>
        </Link>

        {/* Status Indicator */}
        <div className="pointer-events-auto flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase mt-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400"></span>
          </span>
          <span className="hidden sm:inline">Active Engine</span>
        </div>
      </div>

      {/* Floating Dock Navigation - Scroll removido, background permanente */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-max px-4">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          /* CLASSES FIXAS AQUI: Sempre com background preto esfumaçado e borda */
          className="flex items-center gap-1 p-1.5 rounded-full border transition-all duration-500 bg-black/80 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        >
          {links.map((link) => {
            const isActive = location.pathname === link.id;

            if (link.isExternal) {
              return (
                <a
                  key={link.id}
                  href={link.id}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative px-4 py-2 text-[11px] text-zinc-400 hover:text-zinc-100 font-mono uppercase tracking-[0.15em] transition-colors duration-300 rounded-full whitespace-nowrap"
                >
                  {link.label}
                </a>
              );
            }

            return (
              <Link
                key={link.id}
                to={link.id}
                className={`relative px-4 py-2 text-[11px] font-mono uppercase tracking-[0.15em] transition-colors duration-300 rounded-full z-10 whitespace-nowrap ${isActive ? 'text-black font-bold' : 'text-zinc-400 hover:text-zinc-100'
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-white rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {link.label}
              </Link>
            );
          })}
        </motion.nav>
      </div>
    </>
  );
}