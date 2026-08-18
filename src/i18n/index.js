import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonEn from './locales/en/common.json';
import homeEn from './locales/en/home.json';
import workEn from './locales/en/work.json';
import aboutEn from './locales/en/about.json';
import contactEn from './locales/en/contact.json';
import caseEn from './locales/en/case.json';
import validationEn from './locales/en/validation.json';

import commonPt from './locales/pt-BR/common.json';
import homePt from './locales/pt-BR/home.json';
import workPt from './locales/pt-BR/work.json';
import aboutPt from './locales/pt-BR/about.json';
import contactPt from './locales/pt-BR/contact.json';
import casePt from './locales/pt-BR/case.json';
import validationPt from './locales/pt-BR/validation.json';

export const defaultNS = 'common';
export const resources = {
  en: {
    common: commonEn,
    home: homeEn,
    work: workEn,
    about: aboutEn,
    contact: contactEn,
    case: caseEn,
    validation: validationEn,
  },
  'pt-BR': {
    common: commonPt,
    home: homePt,
    work: workPt,
    about: aboutPt,
    contact: contactPt,
    case: casePt,
    validation: validationPt,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
