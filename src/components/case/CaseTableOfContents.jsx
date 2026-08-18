import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export function CaseTableOfContents({ sections = [] }) {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '');

  useEffect(() => {
    if (sections.length < 3) return;

    const handleScroll = () => {
      const scrollY = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  if (!Array.isArray(sections) || sections.length < 3) {
    return null;
  }

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hidden xl:block fixed right-8 top-1/2 -translate-y-1/2 z-30 pointer-events-none">
      <div className="p-4 bg-[#10110F]/90 backdrop-blur-md border border-white/10 rounded-[14px] pointer-events-auto flex flex-col gap-2.5 shadow-2xl max-w-[200px]">
        <span className="font-mono text-[9px] uppercase font-bold tracking-widest text-white/40 block mb-1">
          {language === 'en' ? 'INDEX' : 'SUMÁRIO'}
        </span>

        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => scrollToSection(sec.id)}
              className={`text-left font-mono text-[10px] uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer ${
                isActive ? 'text-[#C4FF00] font-bold' : 'text-white/40 hover:text-white/80'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  isActive ? 'bg-[#C4FF00] scale-125' : 'bg-white/20'
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
