import { useState, useEffect } from 'react';
import { sanityClient, urlFor } from '../services/sanityClient';
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
    'Product Design',
    'UX/UI',
    'Design System',
    'Website ou Landing Page',
    'Identidade visual',
    'Outro',
  ],
  servicesOptions_en: [
    'Product Design',
    'UX/UI',
    'Design System',
    'Website or Landing Page',
    'Brand Identity',
    'Other',
  ],
  collaborationFormats: [
    'Projeto fechado',
    'Consultoria',
    'Apoio recorrente',
    'Colaboração com time',
    'Ainda não sei',
  ],
  collaborationFormats_en: [
    'Fixed-scope project',
    'Consulting',
    'Ongoing retainer',
    'Team collaboration',
    'Not sure yet',
  ],
  timelineOptions: [
    'Assim que possível',
    'Neste mês',
    'Nos próximos 3 meses',
    'Ainda estou explorando',
  ],
  timelineOptions_en: [
    'As soon as possible',
    'This month',
    'Within 3 months',
    'Still exploring',
  ],
  budgetOptions: DEFAULT_BUDGET_OPTIONS,
  budgetRanges: [
    'Até R$2.500',
    'R$2.500–5.000',
    'R$5.000–10.000',
    'R$10.000–20.000',
    'Acima de R$20.000',
    'Ainda não defini',
  ],
  budgetRanges_en: [
    'Under US$1,000',
    'US$1,000–2,500',
    'US$2,500–5,000',
    'US$5,000–10,000',
    'US$10,000+',
    'I’m not sure yet',
  ],
  ctaText: 'ENVIAR PROJETO ↗',
  ctaText_en: 'SUBMIT PROJECT ↗',
  confirmationMessage: 'Mensagem recebida com sucesso. Entrarei em contato em breve com contexto e próximos passos.',
  confirmationMessage_en: 'Message received successfully. I’ll be in touch shortly with context and next steps.',
};

export function useLetsTalk() {
  const [talkData, setTalkData] = useState(FALLBACK_LETS_TALK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchLetsTalk() {
      try {
        const data = await sanityClient.fetch(
          `*[_type == "letsTalkPage"][0]{
            ...,
            "profileImageUrl": profileImage.asset->url
          }`
        );

        if (data && isMounted) {
          setTalkData({
            ...FALLBACK_LETS_TALK,
            ...data,
            profileImageUrl: data.profileImageUrl || (data.profileImage ? urlFor(data.profileImage).url() : FALLBACK_LETS_TALK.profileImageUrl),
          });
        }
      } catch (err) {
        console.warn('Could not fetch letsTalkPage from Sanity, using built-in defaults:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchLetsTalk();

    return () => {
      isMounted = false;
    };
  }, []);

  return { talkData, loading };
}

export default useLetsTalk;
