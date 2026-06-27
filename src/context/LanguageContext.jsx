import React, { createContext, useContext, useState } from 'react';
import pt from '../data/locales/pt';
import en from '../data/locales/en';
import es from '../data/locales/es';

const LanguageContext = createContext();

const translations = { pt, en, es };

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem('portfolio_lang');
    if (saved && ['pt', 'en', 'es'].includes(saved)) {
      return saved;
    }
    // Fallback to browser language if available and matches our languages
    const browserLang = navigator.language?.split('-')[0];
    if (browserLang && ['pt', 'en', 'es'].includes(browserLang)) {
      return browserLang;
    }
    return 'pt'; // Default fallback
  });

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
