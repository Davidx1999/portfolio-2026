import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LimeActionButton } from './Buttons';

const MotionLink = motion(Link);

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Cases', path: '/cases' },
    { label: 'Projects', path: '/projects' },
    { label: 'About', path: '/about' }
  ];

  const handleLinkClick = (e, path) => {
    if (path.startsWith('#')) {
      e.preventDefault();
      const targetId = path.substring(1);
      if (location.pathname === '/') {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate('/');
        // Wait for page transition, then scroll
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-background/90 backdrop-blur-md transition-all duration-300">
      {/* Top Header Row */}
      <div className="w-full px-6 md:px-[16%] py-5 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 tracking-tight group focus:outline-none"
        >
          <div className="w-8 h-8 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <img
              src={`${import.meta.env.BASE_URL}assets/logo_purple.png`}
              alt="David Salviano"
              className="w-full h-full object-contain"
            />
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-4 sm:gap-6 md:gap-8">
          {navLinks.map((link) => {
            const isHash = link.path.startsWith('#');
            const isActive = isHash 
              ? location.pathname === '/' && location.hash === link.path
              : location.pathname === link.path;

            return (
              <Link
                key={link.label}
                to={link.path}
                onClick={(e) => handleLinkClick(e, link.path)}
                className={`font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-[0.16em] transition-colors relative group py-1 ${
                  isActive 
                    ? 'text-[var(--color-primary)]' 
                    : 'text-[var(--color-foreground)]/80 hover:text-[var(--color-primary)]'
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-[var(--color-primary)] transition-transform duration-300 origin-left ${
                  isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </Link>
            );
          })}
          
          <LimeActionButton
            as={MotionLink}
            to="/contact"
          >
            Lets Contact
          </LimeActionButton>
        </nav>
      </div>

      {/* Thin Editorial Divider Line spanning full viewport */}
      <div className="w-full h-[1px] bg-neutral-carvao/10" />
    </header>
  );
}