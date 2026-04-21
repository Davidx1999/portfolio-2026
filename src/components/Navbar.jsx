import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

export function Navbar() {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-20 border-b border-white/5 bg-background/80 backdrop-blur-lg z-40 px-6 md:px-16 flex items-center justify-between">
      <Link 
        to="/" 
        className="flex items-center gap-3 text-zinc-200 tracking-tight group transition-colors hover:text-[#fd1843]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img 
          src={`${import.meta.env.BASE_URL}Union.svg`} 
          alt="DS" 
          className="h-6 w-auto transition-all duration-300 group-hover:filter-none" 
          style={{ 
            filter: isHovered 
              ? 'brightness(0) saturate(100%) invert(21%) sepia(91%) saturate(6146%) hue-rotate(344deg) brightness(98%) contrast(101%)' 
              : 'brightness(0) saturate(100%) invert(98%) sepia(2%) saturate(151%) hue-rotate(182deg) brightness(101%) contrast(97%)'
          }} 
        />
        
        <span className="font-semibold text-xl transition-colors">David Salviano</span>
      </Link>
      
      <nav className="hidden md:flex gap-8 text-sm text-zinc-400 font-mono uppercase tracking-widest items-center">
        <Link 
          to="/projects" 
          className={`hover:text-zinc-100 transition-colors ${location.pathname === '/projects' ? 'text-zinc-100' : ''}`}
        >
          Projetos
        </Link>
        <Link 
          to="/about" 
          className={`hover:text-zinc-100 transition-colors ${location.pathname === '/about' ? 'text-zinc-100' : ''}`}
        >
          Sobre mim
        </Link>
        <Link 
          to="/mapear" 
          className={`hover:text-zinc-100 transition-colors ${location.pathname === '/mapear' ? 'text-zinc-100' : ''}`}
        >
          Mapear
        </Link>
        <a 
          href="https://davidx1999.github.io/f75-site-test-2/#features"
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-zinc-100 transition-colors"
        >
          Aula F75
        </a>
        <Link 
          to="/vincenzo" 
          className={`hover:text-zinc-100 transition-colors ${location.pathname === '/vincenzo' ? 'text-zinc-100' : ''}`}
        >
          Vincenzo
        </Link>
      </nav>
    </header>
  );
}
