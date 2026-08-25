import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getGlobalLenis } from '../../hooks/useGlobalSmoothScroll';

export function CaseTableOfContents({ sections = [] }) {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '');

  // Sincroniza activeSection quando a lista de seções muda
  useEffect(() => {
    if (sections.length > 0 && !sections.some((s) => s.id === activeSection)) {
      setActiveSection(sections[0].id);
    }
  }, [sections, activeSection]);

  useEffect(() => {
    if (!Array.isArray(sections) || sections.length < 2) return;

    const calculateActiveSection = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Se o usuário estiver próximo ao fim da página, ativa a última seção
      if (windowHeight + scrollPosition >= documentHeight - 120) {
        setActiveSection(sections[sections.length - 1].id);
        return;
      }

      // Ponto de detecção: 35% do topo da tela
      const threshold = windowHeight * 0.35;
      let currentActive = sections[0].id;

      for (let i = 0; i < sections.length; i++) {
        const sec = sections[i];
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= threshold) {
            currentActive = sec.id;
          }
        }
      }

      setActiveSection(currentActive);
    };

    calculateActiveSection();

    window.addEventListener('scroll', calculateActiveSection, { passive: true });
    window.addEventListener('resize', calculateActiveSection, { passive: true });

    const lenis = getGlobalLenis();
    if (lenis) {
      lenis.on('scroll', calculateActiveSection);
    }

    return () => {
      window.removeEventListener('scroll', calculateActiveSection);
      window.removeEventListener('resize', calculateActiveSection);
      if (lenis) {
        lenis.off('scroll', calculateActiveSection);
      }
    };
  }, [sections]);

  if (!Array.isArray(sections) || sections.length < 2) {
    return null;
  }

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    setActiveSection(id);

    const lenis = getGlobalLenis();
    if (lenis) {
      lenis.scrollTo(el, { offset: -90, duration: 1.2 });
    } else {
      const headerOffset = 90;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="hidden xl:block fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 pointer-events-none">
      <div className="p-3 py-2.5 bg-[#10110F]/90 backdrop-blur-md border border-white/10 rounded-[12px] pointer-events-auto flex flex-col gap-1.5 shadow-2xl w-[145px] max-w-[150px]">
        <span className="font-mono text-[8.5px] uppercase font-bold tracking-widest text-white/40 block mb-0.5">
          {language === 'en' ? 'INDEX' : 'SUMÁRIO'}
        </span>

        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => scrollToSection(sec.id)}
              className={`text-left font-mono text-[9px] uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                isActive ? 'text-[#C4FF00] font-bold translate-x-0.5' : 'text-white/40 hover:text-white/80'
              }`}
            >
              <span
                className={`w-1 h-1 rounded-full transition-all duration-200 shrink-0 ${
                  isActive ? 'bg-[#C4FF00] scale-125 shadow-[0_0_6px_#C4FF00]' : 'bg-white/20'
                }`}
              />
              <span className="truncate">{sec.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CaseTableOfContents;
