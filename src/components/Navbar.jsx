import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CurtainLink, useRouteCurtain } from '../context/RouteCurtainContext';
import { registerHeaderElement } from '../hooks/useHeaderMetrics';
import { useAppReady } from '../context/AppReadyContext';
import { RollingButton } from './RollingButton';
import { RollingText } from './RollingText';
import {
  extractRouteInfo,
} from '../context/RouteCurtainContext';

const EASING = [0.22, 1, 0.36, 1];

function HeaderNavLink({ to, isActive, children, onClick }) {
  const text = typeof children === 'string' ? children : '';
  return (
    <CurtainLink
      to={to}
      onClick={onClick}
      className={`
        relative py-1 font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em]
        transition-colors duration-200 group focus-visible:outline-2 focus-visible:outline-[#C7F000] focus-visible:outline-offset-4
        ${isActive ? 'text-[#C7F000]' : 'text-[#F4F3EE]/70 hover:text-[#F4F3EE]'}
      `}
    >
      <span className="relative z-10">
        <RollingText text={text} />
      </span>
      {isActive && (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C7F000]" />
      )}
    </CurtainLink>
  );
}

export function SiteHeader() {
  const { t } = useTranslation(['common']);
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const headerRef = useRef(null);
  const { isAppReady } = useAppReady();
  const { navigateWithCurtain } = useRouteCurtain();

  // Active route language derived directly from URL path
  const { lang: currentLang, unPrefixed } = extractRouteInfo(location.pathname);

  // Clean translation string in case it includes arrows natively
  const rawContactText = t('header_contact', "LET'S TALK ↗");
  const contactText = typeof rawContactText === 'string' ? rawContactText.replace('↗', '').trim() : "LET'S TALK";

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isMobileMenuOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close mobile drawer on navigation
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  /**
   * Switches language while preserving current route, slug, query parameters, and hash
   */
  const handleLanguageSwitch = (targetLang) => {
    if (targetLang === currentLang) return;
    setIsMobileMenuOpen(false);

    const targetPath = `/${targetLang}${unPrefixed === '/' ? '' : unPrefixed}${location.search || ''}${location.hash || ''}`;
    navigateWithCurtain(targetPath, {
      title: targetLang === 'en' ? 'ENGLISH' : 'PORTUGUÊS',
      eyebrow: targetLang === 'en' ? 'SWITCHING LANGUAGE //' : 'MUDANDO IDIOMA //',
    });
  };

  return (
    <>
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
            isScrolled ? 'border-white/15' : 'border-[#F4F3EE]/5'
          }`}
        >
          <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16 h-[54px] flex items-center justify-between">
            {/* ============================================================ */}
            {/* ESQUERDA: Logo + Links de Navegação Desktop (≥ 768px / md)   */}
            {/* ============================================================ */}
            <div className="flex items-center gap-6 sm:gap-8 h-full">
              {/* Logo */}
              <CurtainLink
                to={`/${currentLang}`}
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

              <div className="hidden md:block w-[1px] h-4 bg-white/15" />

              {/* Links Desktop (hidden on mobile, visible on md+) */}
              <nav className="hidden md:flex items-center gap-6 md:gap-8">
                <HeaderNavLink
                  to={`/${currentLang}/work`}
                  isActive={unPrefixed === '/work' || unPrefixed === '/cases' || unPrefixed.startsWith('/work/') || unPrefixed.startsWith('/cases/')}
                  onClick={handleLinkClick}
                >
                  {t('nav_work', 'Work')}
                </HeaderNavLink>
                <HeaderNavLink
                  to={`/${currentLang}/about`}
                  isActive={unPrefixed === '/about'}
                  onClick={handleLinkClick}
                >
                  {t('nav_about', 'About')}
                </HeaderNavLink>
              </nav>
            </div>

            {/* ============================================================ */}
            {/* DIREITA: Desktop Seletor + CTA (≥ md) / Mobile Hambúrguer    */}
            {/* ============================================================ */}
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Seletor de Idioma (Desktop) */}
              <div className="hidden md:flex items-center gap-1 font-mono text-[11px] tracking-widest uppercase text-[#F4F3EE]/50">
                <button
                  type="button"
                  onClick={() => handleLanguageSwitch('pt')}
                  className={`px-1.5 py-0.5 transition-colors cursor-pointer rounded-[8px] focus-visible:outline-2 focus-visible:outline-[#C7F000] ${
                    currentLang === 'pt' ? 'text-[#C7F000] font-bold' : 'hover:text-[#F4F3EE]'
                  }`}
                  aria-label={t('header_switch_to_pt', 'Mudar idioma para Português')}
                >
                  PT
                </button>
                <span className="text-white/20">/</span>
                <button
                  type="button"
                  onClick={() => handleLanguageSwitch('en')}
                  className={`px-1.5 py-0.5 transition-colors cursor-pointer rounded-[8px] focus-visible:outline-2 focus-visible:outline-[#C7F000] ${
                    currentLang === 'en' ? 'text-[#C7F000] font-bold' : 'hover:text-[#F4F3EE]'
                  }`}
                  aria-label={t('header_switch_to_en', 'Switch language to English')}
                >
                  EN
                </button>
              </div>

              <div className="hidden md:block w-[1px] h-4 bg-white/15" />

              {/* CTA de Contato Verde Ácido (Desktop) */}
              <div className="hidden md:block">
                <RollingButton
                  variant="primary"
                  size="sm"
                  to={`/${currentLang}/contact`}
                  onClick={handleLinkClick}
                  icon={<ArrowUpRight size={14} />}
                >
                  {contactText}
                </RollingButton>
              </div>

              {/* Mobile Menu Toggle (Visible only below md < 768px) */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-white/90 hover:text-white rounded-[8px] focus-visible:outline-2 focus-visible:outline-[#C7F000] z-[160]"
                aria-label={isMobileMenuOpen ? t('nav_close_menu', 'Close navigation menu') : t('nav_open_menu', 'Open navigation menu')}
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
      </motion.header>

      {/* ============================================================ */}
      {/* FULLSCREEN MOBILE MENU OVERLAY (< 768px)                     */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: EASING }}
            className="fixed inset-0 w-full h-[100dvh] bg-[#10110F] z-[95] md:hidden flex flex-col justify-between px-6 sm:px-10 pt-[80px] pb-10 select-none overflow-y-auto"
          >
            {/* Navegação Principal em Tipografia Grande com Touch Target >= 44px */}
            <div className="flex flex-col gap-3 my-auto">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#8B8B85] mb-2">
                // {t('nav_navigation', 'NAVIGATION')}
              </span>

              <CurtainLink
                to={`/${currentLang}`}
                onClick={handleLinkClick}
                className="min-h-[48px] py-2 flex items-center justify-between border-b border-white/[0.08] font-serif text-3xl sm:text-4xl text-[#FAFAF7] hover:text-[#C7F000] transition-colors group"
              >
                <span>{t('nav_home', 'Home')}</span>
                <span className="font-mono text-xs text-white/30 group-hover:text-[#C7F000] tracking-widest font-sans">01</span>
              </CurtainLink>

              <CurtainLink
                to={`/${currentLang}/work`}
                onClick={handleLinkClick}
                className="min-h-[48px] py-2 flex items-center justify-between border-b border-white/[0.08] font-serif text-3xl sm:text-4xl text-[#FAFAF7] hover:text-[#C7F000] transition-colors group"
              >
                <span>{t('nav_work', 'Work')}</span>
                <span className="font-mono text-xs text-white/30 group-hover:text-[#C7F000] tracking-widest font-sans">02</span>
              </CurtainLink>

              <CurtainLink
                to={`/${currentLang}/about`}
                onClick={handleLinkClick}
                className="min-h-[48px] py-2 flex items-center justify-between border-b border-white/[0.08] font-serif text-3xl sm:text-4xl text-[#FAFAF7] hover:text-[#C7F000] transition-colors group"
              >
                <span>{t('nav_about', 'About')}</span>
                <span className="font-mono text-xs text-white/30 group-hover:text-[#C7F000] tracking-widest font-sans">03</span>
              </CurtainLink>
            </div>

            {/* Rodapé do Menu Mobile: Seletor de Idioma + CTA "Let's Talk" */}
            <div className="flex flex-col gap-6 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#F4F3EE]/50 uppercase tracking-widest">
                  {currentLang === 'pt' ? 'Idioma' : 'Language'}
                </span>

                <div className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase bg-white/[0.06] p-1 rounded-[10px] border border-white/10">
                  <button
                    type="button"
                    onClick={() => handleLanguageSwitch('pt')}
                    className={`min-h-[38px] px-4 py-1.5 transition-all cursor-pointer rounded-[8px] font-bold ${
                      currentLang === 'pt' ? 'bg-[#C7F000] text-[#10110F]' : 'text-[#F4F3EE]/60 hover:text-white'
                    }`}
                  >
                    PT
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLanguageSwitch('en')}
                    className={`min-h-[38px] px-4 py-1.5 transition-all cursor-pointer rounded-[8px] font-bold ${
                      currentLang === 'en' ? 'bg-[#C7F000] text-[#10110F]' : 'text-[#F4F3EE]/60 hover:text-white'
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>

              <CurtainLink
                to={`/${currentLang}/contact`}
                onClick={handleLinkClick}
                className="min-h-[52px] w-full flex items-center justify-center gap-2.5 px-6 py-4 font-mono text-xs sm:text-sm font-bold tracking-widest uppercase text-[#10110F] bg-[#C7F000] hover:bg-[#d8ff1a] active:scale-[0.98] transition-all rounded-[14px] shadow-lg"
              >
                <span>{contactText}</span>
                <ArrowUpRight size={18} />
              </CurtainLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export const Navbar = SiteHeader;
export default SiteHeader;