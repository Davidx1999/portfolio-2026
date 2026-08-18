/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import pt from '../data/locales/pt';
import en from '../data/locales/en';
import es from '../data/locales/es';
import { detectCountryByIp } from '../services/currencyLocalization';

const LanguageContext = createContext();

const translations = { pt, en, es };

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem('portfolio_lang');
    if (saved && ['pt', 'en', 'es'].includes(saved)) {
      return saved;
    }
    // Fallback inicial por navegador
    const browserLang = navigator.language?.split('-')[0];
    if (browserLang === 'pt') return 'pt';
    if (browserLang === 'es') return 'es';
    if (browserLang === 'en') return 'en';
    return 'pt';
  });

  // Detecção não-bloqueante por país na primeira visita
  useEffect(() => {
    const saved = localStorage.getItem('portfolio_lang');
    if (saved) return; // Respeita escolha prévia

    let isMounted = true;
    detectCountryByIp().then((countryCode) => {
      if (!isMounted || !countryCode) return;
      if (countryCode === 'BR') {
        setLanguageState('pt');
      } else {
        setLanguageState('en');
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const setLanguage = (lang) => {
    if (['pt', 'en', 'es'].includes(lang)) {
      setLanguageState(lang);
      localStorage.setItem('portfolio_lang', lang);
    }
  };

  const t = (key, defaultValue) => {
    return translations[language]?.[key] || defaultValue || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
