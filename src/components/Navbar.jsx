import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export function Navbar() {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 h-20 border-b border-white/5 bg-background/80 backdrop-blur-lg z-40 px-6 md:px-16 flex items-center justify-between">
      <Link to="/" className="font-semibold text-zinc-200 tracking-tight text-xl">DAVID.SYS</Link>
      
      <nav className="hidden md:flex gap-8 text-sm text-zinc-400 font-mono uppercase tracking-widest items-center">
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
        <Link 
          to="/aula-f75" 
          className={`hover:text-zinc-100 transition-colors ${location.pathname === '/aula-f75' ? 'text-zinc-100' : ''}`}
        >
          Aula F75
        </Link>
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
