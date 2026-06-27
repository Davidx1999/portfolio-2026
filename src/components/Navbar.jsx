import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { LimeActionButton } from './Buttons';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const MotionLink = motion(Link);

/* ------------------------------------------------------------------ */
/*  Magnetic Nav Link — each link subtly follows the cursor on hover   */
/* ------------------------------------------------------------------ */
function MagneticNavLink({ to, isActive, children, onClick, index }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 20, mass: 0.15 });
  const springY = useSpring(y, { stiffness: 250, damping: 20, mass: 0.15 });

  const handleMouse = useCallback((e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.2);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.2);
  }, [x, y]);

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <Link
        to={to}
        onClick={onClick}
        className={`
          relative py-2 px-1 font-mono text-[11px] sm:text-[13px] font-semibold uppercase tracking-[0.18em]
          transition-colors duration-300 group/link
          ${isActive
            ? 'text-[var(--color-primary)]'
            : 'text-[var(--color-foreground)]/70 hover:text-[var(--color-foreground)]'
          }
        `}
      >
        {/* Label */}
        <span className="relative z-10">{children}</span>

        {/* Active bar indicator */}
        <span
          className={`
            absolute -bottom-[2px] left-1/2 -translate-x-1/2 rounded-full bg-[var(--color-primary)]
            transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)]
            ${isActive ? 'w-[16px] h-[2px] opacity-100' : 'w-0 h-0 opacity-0'}
          `}
        />

        {/* Hover underline sweep */}
        <span
          className={`
            absolute bottom-0 left-0 h-[1.5px] bg-[var(--color-foreground)]
            transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] origin-left
            ${isActive ? 'scale-x-0' : 'scale-x-0 group-hover/link:scale-x-100'}
          `}
          style={{ width: '100%' }}
        />
      </Link>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Copyright Icon                                                     */
/* ------------------------------------------------------------------ */
function CopyrightIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M14.83 14.83a4 4 0 1 1 0-5.66" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Globe Icon                                                         */
/* ------------------------------------------------------------------ */
function GlobeIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Chevron Down Icon                                                  */
/* ------------------------------------------------------------------ */
function ChevronDownIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Navbar                                                        */
/* ------------------------------------------------------------------ */
export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [isPastHero, setIsPastHero] = useState(false);
  const [isOverDark, setIsOverDark] = useState(false);
  const ticking = useRef(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* ---------- scroll logic: crop expansion + dark detection ---------- */
  useEffect(() => {
    const isHome = location.pathname === '/';
    const isAbout = location.pathname === '/about';

    if (!isHome && !isAbout) {
      setIsPastHero(false);
      setIsOverDark(false);
      const timer = setTimeout(() => setIsPastHero(true), 250);
      return () => clearTimeout(timer);
    }

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;

        // Logo crop expand/collapse
        if (isHome) {
          setIsPastHero(currentY > 200);
        } else {
          setIsPastHero(true);
        }

        // Detect dark background overlap
        const navH = 64;
        if (isHome) {
          const darkSection = document.getElementById('what-i-do');
          if (darkSection) {
            const rect = darkSection.getBoundingClientRect();
            const featuredWork = document.getElementById('featured-work');
            const fwTop = featuredWork ? featuredWork.getBoundingClientRect().top : Infinity;
            setIsOverDark(rect.top < navH && fwTop > navH);
          } else {
            setIsOverDark(false);
          }
        } else if (isAbout) {
          const darkStart = document.getElementById('about-dark-start');
          const darkEnd = document.getElementById('about-dark-end');
          if (darkStart) {
            const startTop = darkStart.getBoundingClientRect().top;
            const endTop = darkEnd ? darkEnd.getBoundingClientRect().top : Infinity;
            setIsOverDark(startTop < navH && endTop > navH);
          } else {
            setIsOverDark(false);
          }
        } else {
          setIsOverDark(false);
        }

        ticking.current = false;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  /* ---------- navigation data ---------- */
  const navLinks = [
    { label: t('nav_cases'), path: '/cases' },
    { label: t('nav_about'), path: '/about' },
  ];

  const handleLinkClick = (e, path) => {
    if (path.startsWith('#')) {
      e.preventDefault();
      const targetId = path.substring(1);
      if (location.pathname === '/') {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  };

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-[100]"
      style={{
        '--color-foreground': isOverDark ? '#fbf9f6' : '#1A1A1A',
        '--color-background': isOverDark ? '#171717' : '#fbf9f6',
      }}
    >
      <div className="flex items-center justify-between px-4 md:px-[calc(16%-24px)] py-3 md:py-4">
        {/* Left: Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 tracking-tight group focus:outline-none shrink-0"
        >
          <motion.div
            className="transition-all duration-500 group-hover:scale-[1.03] relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={`logo-crop-container ${isPastHero ? 'expanded' : ''}`}>
              <img
                src={`${import.meta.env.BASE_URL}assets/logo_fullname.png`}
                alt="David Salviano"
                className={`h-full w-auto max-w-none object-left object-contain block transition-[filter] duration-500 ${isOverDark ? 'brightness-0 invert' : ''}`}
              />
            </div>
            <span className="absolute left-full bottom-[1px] ml-[4px] text-[var(--color-foreground)]/60 select-none transition-colors duration-500">
              <CopyrightIcon className="w-[10px] h-[10px]" />
            </span>
          </motion.div>
        </Link>

        {/* Center / Right: Navigation */}
        <nav className="flex items-center gap-5 sm:gap-7 md:gap-9">
          {navLinks.map((link, i) => {
            const isHash = link.path.startsWith('#');
            const isActive = isHash
              ? location.pathname === '/' && location.hash === link.path
              : location.pathname === link.path;

            return (
              <MagneticNavLink
                key={link.label}
                to={link.path}
                isActive={isActive}
                index={i}
                onClick={(e) => handleLinkClick(e, link.path)}
              >
                {link.label}
              </MagneticNavLink>
            );
          })}

          {/* Language Switcher */}
          <div ref={dropdownRef} className="relative z-50">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`
                flex items-center gap-1.5 py-1 px-1.5 font-mono text-[11px] sm:text-[13px] font-semibold uppercase tracking-[0.18em]
                transition-all duration-300 focus:outline-none cursor-pointer rounded
                ${isOverDark 
                  ? 'text-white/70 hover:text-white hover:bg-white/5' 
                  : 'text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-black/5'
                }
              `}
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
            >
              <GlobeIcon className="w-3.5 h-3.5 sm:w-4 h-4 opacity-75" />
              <span>{language}</span>
              <ChevronDownIcon 
                className={`w-3 h-3 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
              />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className={`
                    absolute right-0 mt-2 py-1.5 w-32 rounded-lg border shadow-xl
                    ${isOverDark
                      ? 'bg-[#1E1E1E] border-white/10 text-white'
                      : 'bg-white border-black/10 text-[#1A1A1A]'
                    }
                  `}
                >
                  {[
                    { code: 'pt', label: 'Português' },
                    { code: 'en', label: 'English' },
                    { code: 'es', label: 'Español' },
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsDropdownOpen(false);
                      }}
                      className={`
                        w-full text-left px-4 py-2 font-mono text-[10px] sm:text-xs font-semibold tracking-wider transition-colors duration-200 cursor-pointer
                        ${language === lang.code
                          ? 'text-[var(--color-primary)]'
                          : isOverDark
                            ? 'hover:bg-white/5 text-white/70 hover:text-white'
                            : 'hover:bg-black/5 text-[#1A1A1A]/70 hover:text-[#1A1A1A]'
                        }
                      `}
                    >
                      {lang.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CTA separator — subtle vertical line */}
          <motion.span
            className="hidden sm:block w-[1px] h-5 bg-[var(--color-foreground)]/12"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          />

          {/* CTA button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              '--color-foreground': '#1A1A1A',
              '--color-background': '#fbf9f6',
            }}
          >
            <LimeActionButton
              as={MotionLink}
              to="/contact"
            >
              {t('nav_connect')}
            </LimeActionButton>
          </motion.div>
        </nav>
      </div>
    </motion.header>
  );
}