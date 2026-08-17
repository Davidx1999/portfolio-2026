import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useScroll, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { CurtainLink } from '../context/RouteCurtainContext';
import { registerHeaderElement } from '../hooks/useHeaderMetrics';
import { useAppReady } from '../context/AppReadyContext';

const EASING = [0.22, 1, 0.36, 1];

function HeaderNavLink({ to, isActive, children, onClick }) {
  return (
    <CurtainLink
      to={to}
      onClick={onClick}
      className={`
        relative py-1 font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em]
        transition-colors duration-200 group/navlink focus-visible:outline-2 focus-visible:outline-[#C7F000] focus-visible:outline-offset-4
        ${isActive ? 'text-[#C7F000]' : 'text-[#F4F3EE]/70 hover:text-[#F4F3EE]'}
      `}
    >
      <span className="relative z-10">{children}</span>
      {isActive && (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C7F000]" />
      )}
    </CurtainLink>
  );
}

export function SiteHeader() {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const headerRef = useRef(null);
  const { isAppReady } = useAppReady();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();

  // Register single global header for dynamic metrics contract
  useEffect(() => {
    if (headerRef.current) {
      const cleanup = registerHeaderElement(headerRef.current);
      return cleanup;
    }
  }, []);

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setIsScrolled(latest > 40);
    });
  }, [scrollY]);

  // Close mobile drawer on navigation
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      ref={headerRef}
      data-site-header
      initial={prefersReducedMotion ? false : { y: -64, opacity: 0 }}
      animate={isAppReady ? { y: 0, opacity: 1 } : { y: -64, opacity: 0 }}
      transition={{ duration: 0.75, ease: EASING }}
      className="fixed top-0 inset-x-0 w-full z-[100] select-none"
    >
      <div
        className={`w-full bg-[#10110F]/95 backdrop-blur-md border-b transition-all duration-300 ${
          isScrolled ? 'border-white/15 shadow-xl shadow-black/40' : 'border-white/10 shadow-md shadow-black/20'
        }`}
      >
        <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16 h-[54px] flex items-center justify-between">
          {/* ============================================================ */}
          {/* ESQUERDA: Logo + Links de Navegação                          */}
          {/* ============================================================ */}
          <div className="flex items-center gap-6 sm:gap-8 h-full">
            {/* Logo */}
            <CurtainLink
              to="/"
              onClick={handleLinkClick}
              className="flex items-center group focus-visible:outline-2 focus-visible:outline-[#C7F000] focus-visible:outline-offset-4"
              aria-label="David Salviano - Home"
            >
              <img
                src={`${import.meta.env.BASE_URL}assets/logo alt.svg`}
                alt="David Salviano"
                className="h-7 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </CurtainLink>

            <div className="hidden sm:block w-[1px] h-4 bg-white/15" />

            {/* Links Desktop */}
            <nav className="hidden sm:flex items-center gap-6 md:gap-8">
              <HeaderNavLink
                to="/work"
                isActive={location.pathname === '/work' || location.pathname === '/cases' || location.pathname.startsWith('/project')}
                onClick={handleLinkClick}
              >
                {t('nav_cases', 'PROJETOS')}
              </HeaderNavLink>
              <HeaderNavLink
                to="/about"
                isActive={location.pathname === '/about'}
                onClick={handleLinkClick}
              >
                {t('nav_about', 'SOBRE')}
              </HeaderNavLink>
            </nav>
          </div>

          {/* ============================================================ */}
          {/* CENTRO: Badge de Posicionamento                              */}
          {/* ============================================================ */}
          <div className="hidden lg:block pointer-events-none">
            <span className="font-mono text-[10px] tracking-[0.22em] text-[#F4F3EE]/45 uppercase">
              {t('header_badge', 'PRODUCT DESIGNER — BRASIL')}
            </span>
          </div>

          {/* ============================================================ */}
          {/* DIREITA: Seletor de Idioma + CTA de Contato                  */}
          {/* ============================================================ */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Seletor de Idioma */}
            <div className="flex items-center gap-1 font-mono text-[11px] tracking-widest uppercase text-[#F4F3EE]/50">
              <button
                type="button"
                onClick={() => setLanguage('pt')}
                className={`px-1.5 py-0.5 transition-colors cursor-pointer rounded-[8px] focus-visible:outline-2 focus-visible:outline-[#C7F000] ${
                  language === 'pt' ? 'text-[#C7F000] font-bold' : 'hover:text-[#F4F3EE]'
                }`}
                aria-label="Mudar idioma para Português"
              >
                PT
              </button>
              <span className="text-white/20">/</span>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-0.5 transition-colors cursor-pointer rounded-[8px] focus-visible:outline-2 focus-visible:outline-[#C7F000] ${
                  language === 'en' ? 'text-[#C7F000] font-bold' : 'hover:text-[#F4F3EE]'
                }`}
                aria-label="Switch language to English"
              >
                EN
              </button>
            </div>

            <div className="hidden sm:block w-[1px] h-4 bg-white/15" />

            {/* CTA de Contato Verde Ácido */}
            <CurtainLink
              to="/contact"
              onClick={handleLinkClick}
              className="group inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 font-mono text-xs font-bold tracking-widest uppercase text-[#10110F] bg-[#C7F000] hover:bg-[#d8ff1a] active:scale-[0.98] transition-all rounded-[16px] shadow-sm focus-visible:outline-2 focus-visible:outline-[#C7F000] focus-visible:outline-offset-2 cursor-pointer"
            >
              <span>{t('header_contact', 'FALE COMIGO ↗')}</span>
            </CurtainLink>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="sm:hidden p-1.5 text-white/80 hover:text-white focus-visible:outline-2 focus-visible:outline-[#C7F000]"
              aria-label="Abrir menu de navegação"
              aria-expanded={isMobileMenuOpen}
            >
              <div className={`hamb-menu style-spin ${isMobileMenuOpen ? 'open' : ''}`}>
                <span className="bar" />
                <span className="bar" />
                <span className="bar" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* Mobile Drawer Menu                                           */}
      {/* ============================================================ */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ duration: 0.35, ease: EASING }}
          className="pointer-events-auto sm:hidden mx-3 mt-2 bg-[#10110F] border border-white/10 rounded-[20px] p-6 flex flex-col gap-4 shadow-2xl z-[110]"
        >
          <div className="font-mono text-[10px] tracking-[0.2em] text-[#F4F3EE]/40 uppercase">
            {t('header_badge', 'PRODUCT DESIGNER — BRASIL')}
          </div>
          <CurtainLink
            to="/work"
            onClick={handleLinkClick}
            className="font-mono text-sm font-semibold tracking-wider text-[#F4F3EE] hover:text-[#C7F000] py-2 border-b border-white/[0.08]"
          >
            {t('nav_cases', 'PROJETOS')}
          </CurtainLink>
          <CurtainLink
            to="/about"
            onClick={handleLinkClick}
            className="font-mono text-sm font-semibold tracking-wider text-[#F4F3EE] hover:text-[#C7F000] py-2 border-b border-white/[0.08]"
          >
            {t('nav_about', 'SOBRE')}
          </CurtainLink>
          <CurtainLink
            to="/contact"
            onClick={handleLinkClick}
            className="inline-flex items-center justify-center gap-2 mt-2 px-5 py-3 font-mono text-xs font-bold tracking-widest uppercase text-[#10110F] bg-[#C7F000] hover:bg-[#d8ff1a] transition-colors rounded-[16px]"
          >
            <span>{t('header_contact', 'FALE COMIGO ↗')}</span>
          </CurtainLink>
        </motion.div>
      )}
    </motion.header>
  );
}

export const Navbar = SiteHeader;
export default SiteHeader;