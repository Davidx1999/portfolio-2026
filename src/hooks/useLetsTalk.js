import { useState, useEffect } from 'react';
import { sanityClient, urlFor } from '../services/sanityClient';
import { useLanguage } from '../context/LanguageContext';
import { DEFAULT_BUDGET_OPTIONS } from '../services/currencyLocalization';

const FALLBACK_LETS_TALK = {
  heroEyebrow: 'NOVOS PROJETOS / CONSULTORIA',
  heroEyebrow_en: 'NEW PROJECTS / CONSULTING',
  heroTitle: 'Tem uma ideia, um produto complexo ou uma presença digital para melhorar? Vamos conversar.',
  heroTitle_en: 'Have an idea, a complex product, or a digital presence to elevate? Let’s talk.',
  heroDescription:
    'Conte o que você precisa construir, organizar ou evoluir. Eu respondo com contexto, próximos passos e honestidade sobre o que realmente faz sentido.',
  heroDescription_en:
    'Tell me what you need to build, organize, or evolve. I’ll reply with context, next steps, and honest guidance on what truly makes sense.',
  availabilityStatus: true,
  availabilityText: 'Aceitando novos projetos',
  availabilityText_en: 'Accepting new projects',
  availabilitySubtext: 'Projetos freelance, consultoria e colaboração com times de produto.',
  availabilitySubtext_en: 'Freelance projects, consulting, and collaboration with product squads.',
  responseTime: 'Normalmente respondo em até 24–48 horas úteis.',
  responseTime_en: 'I usually reply within 24–48 business hours.',
  email: 'davidsalviano52@gmail.com',
  linkedIn: 'https://www.linkedin.com/in/david-salviano-12b41b264/',
  whatsapp: '',
  instagram: '@davidolix11',
  profileImageUrl: `${import.meta.env.BASE_URL}assets/profile/cases_hands.png`,
  servicesOptions: [
    'Design de Produto (End-to-End)',
    'Auditoria & Diagnóstico UX/UI',
    'Design System & Tokens',
    'Presença Digital & Web',
    'Suporte Contínuo a Squads',
  ],
  servicesOptions_en: [
    'Product Design (End-to-End)',
    'UX/UI Audit & Diagnostic',
    'Design System & Tokens',
    'Digital Web Presence',
    'Ongoing Squad Support',
  ],
  collaborationFormats: [
    'Projeto Dedicado',
    'Consultoria Pontual',
    'Apoio Integrado a Squads',
    'Acompanhamento Recorrente',
  ],
  collaborationFormats_en: [
    'Dedicated Project',
    'Design Consulting',
    'Embedded Squad Support',
    'Ongoing Retainer',
  ],
  timelineOptions: [
    'Imediato / Este Mês',
    'Próximos 1–2 Meses',
    'Próximo Trimestre',
    'Apenas Sondando',
  ],
  timelineOptions_en: [
    'Immediate / This Month',
    'Next 1–2 Months',
    'Next Quarter',
    'Flexible / Exploratory',
  ],
  budgetOptions: DEFAULT_BUDGET_OPTIONS,
  ctaText: 'ENVIAR PROJETO ↗',
  ctaText_en: 'SUBMIT PROJECT ↗',
  confirmationMessage: 'Mensagem recebida com sucesso. Entrarei em contato em breve com contexto e próximos passos.',
  confirmationMessage_en: 'Message received successfully. I’ll be in touch shortly with context and next steps.',
};

export function useLetsTalk() {
  const { locale, language } = useLanguage();
  const [talkData, setTalkData] = useState(FALLBACK_LETS_TALK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const targetLocale = locale || (language === 'pt' ? 'pt-BR' : 'en');

    async function fetchLetsTalk() {
      try {
        const data = await sanityClient.fetch(
          `*[_type == "letsTalkPage" && !(_id in path("drafts.**")) && coalesce(language, "en") == $targetLocale][0]{
            ...,
            "profileImageUrl": profileImage.asset->url
          }`,
          { targetLocale }
        );

        if (data && isMounted) {
          setTalkData({
            ...FALLBACK_LETS_TALK,
            ...data,
            profileImageUrl: data.profileImageUrl || (data.profileImage ? urlFor(data.profileImage).url() : FALLBACK_LETS_TALK.profileImageUrl),
          });
        }
      } catch (err) {
        console.error('❌ [Sanity Query Error in useLetsTalk]:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchLetsTalk();

    return () => {
      isMounted = false;
    };
  }, [locale, language]);

  return { talkData, loading };
}

export default useLetsTalk;
