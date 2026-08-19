import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { CurtainLink } from '../../context/RouteCurtainContext';
import { RollingText } from '../RollingText';

const EASING = [0.22, 1, 0.36, 1];

/**
 * CaseEditorialHeader
 * Abertura editorial apresentada no começo da folha frontal.
 * - Link discreto de retorno para /work
 * - Eyebrow / Classificação
 * - Nome do projeto (h1 com tipografia fluida)
 * - Descrição principal e contexto breve
 * - Metadados estruturados dinâmicos (renderiza APENAS campos preenchidos)
 * - Escalonamento por caseDepth ('compact' vs 'full')
 */
export function CaseEditorialHeader({ caseStudy }) {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  if (!caseStudy) return null;

  const isCompact = caseStudy.caseDepth === 'compact';

  const projectTypeLabels = {
    professionalProject: {
      pt: 'PROJETO PROFISSIONAL',
      en: 'PROFESSIONAL PROJECT',
      es: 'PROYECTO PROFESIONAL',
    },
    clientProject: {
      pt: 'PROJETO PARA CLIENTE',
      en: 'CLIENT PROJECT',
      es: 'PROYECTO PARA CLIENTE',
    },
    independentStudy: {
      pt: 'ESTUDO INDEPENDENTE',
      en: 'INDEPENDENT STUDY',
      es: 'ESTUDIO INDEPENDIENTE',
    },
  };

  const statusLabels = {
    ongoing: { pt: 'Em andamento', en: 'Ongoing', es: 'En curso' },
    completed: { pt: 'Concluído', en: 'Completed', es: 'Completado' },
    concept: { pt: 'Direção & Proposta', en: 'Concept / Proposal', es: 'Concepto' },
  };

  const typeLabel =
    projectTypeLabels[caseStudy.projectType]?.[language] ||
    projectTypeLabels.professionalProject[language] ||
    'CASE STUDY';

  const eyebrowText =
    caseStudy.eyebrow ||
    `CASE STUDY // ${typeLabel}`;

  const shortDescription =
    language === 'en' && caseStudy.shortDescription_en
      ? caseStudy.shortDescription_en
      : caseStudy.shortDescription ||
        (language === 'en' && caseStudy.heroSummary_en ? caseStudy.heroSummary_en : caseStudy.heroSummary) ||
        caseStudy.description;

  const contextText =
    language === 'en' && caseStudy.longDescription_en
      ? caseStudy.longDescription_en
      : caseStudy.longDescription ||
        (language === 'en' && caseStudy.context_en ? caseStudy.context_en : caseStudy.context) ||
        (language === 'en' && caseStudy.overview_en ? caseStudy.overview_en : caseStudy.overview);

  const disciplines = Array.isArray(caseStudy.disciplines) && caseStudy.disciplines.length > 0
    ? caseStudy.disciplines
    : null;

  const role = caseStudy.role || null;
  const period = caseStudy.period || caseStudy.year || null;
  const clientOrContext = caseStudy.clientOrContext || caseStudy.client || null;
  const duration = caseStudy.duration || null;
  const status = caseStudy.projectStatus && statusLabels[caseStudy.projectStatus]
    ? statusLabels[caseStudy.projectStatus][language] || statusLabels[caseStudy.projectStatus].pt
    : null;

  // Build list of valid metadata items (filtering out null/empty values)
  const metadataItems = [
    period && {
      label: language === 'en' ? 'PERIOD' : 'PERÍODO',
      value: period,
    },
    clientOrContext && {
      label:
        caseStudy.projectType === 'independentStudy'
          ? language === 'en'
            ? 'CONTEXT'
            : 'CONTEXTO'
          : language === 'en'
          ? 'CLIENT / CONTEXT'
          : 'CLIENTE / CONTEXTO',
      value: clientOrContext,
    },
    role && {
      label: language === 'en' ? 'ROLE' : 'FUNÇÃO',
      value: role,
    },
    duration && {
      label: language === 'en' ? 'DURATION' : 'DURAÇÃO',
      value: duration,
    },
    status && {
      label: language === 'en' ? 'STATUS' : 'STATUS',
      value: status,
    },
    disciplines && {
      label: language === 'en' ? 'DISCIPLINES' : 'DISCIPLINAS',
      value: isCompact ? disciplines.slice(0, 2).join(' · ') : disciplines.slice(0, 3).join(' · ') + (disciplines.length > 3 ? ` +${disciplines.length - 3}` : ''),
    },
  ].filter(Boolean);

  return (
    <header className="w-full pt-10 sm:pt-14 md:pt-16 pb-10 md:pb-14 border-b border-[rgba(244,243,238,0.14)] bg-[#10110F] text-[#FAFAF7]">
      <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* Link discreto de retorno para /work */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: EASING }}
          className="mb-8 md:mb-10"
        >
          <CurtainLink
            to={`/${language}/work`}
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#F4F3EE]/60 hover:text-[#C4FF00] transition-colors focus-visible:outline-2 focus-visible:outline-[#C4FF00] rounded-[4px]"
          >
            <ArrowLeft
              size={13}
              className="transition-transform duration-300 group-hover:-translate-x-1 text-[#C4FF00]"
            />
            <RollingText text={language === 'en' ? 'All Projects' : 'Todos os projetos'} />
          </CurtainLink>
        </motion.div>

        {/* Eyebrow + Título Principal + Descrição */}
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASING }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-[#C4FF00]" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#C4FF00]">
              {eyebrowText}
            </span>
          </motion.div>

          {/* Título Principal */}
          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: EASING }}
            className={`font-serif ${
              isCompact
                ? 'text-[2.25rem] sm:text-[3rem] md:text-[3.75rem]'
                : 'text-[2.5rem] sm:text-[3.25rem] md:text-[4rem] lg:text-[4.75rem]'
            } font-normal leading-[1.03] tracking-tight text-[#FAFAF7] mb-6`}
          >
            {caseStudy.title}
          </motion.h1>

          {/* Descrição Principal */}
          {shortDescription && (
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1, ease: EASING }}
              className="font-sans text-base sm:text-lg lg:text-xl text-[#F4F3EE]/85 leading-relaxed max-w-3xl mb-4"
            >
              {shortDescription}
            </motion.p>
          )}

          {/* Texto breve contextualizando o produto (quando diferente da descrição) */}
          {contextText && contextText !== shortDescription && !isCompact && (
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.14, ease: EASING }}
              className="font-sans text-xs sm:text-sm text-[#F4F3EE]/60 leading-relaxed max-w-3xl mb-6"
            >
              {contextText}
            </motion.p>
          )}

          {/* Link externo opcional */}
          {caseStudy.externalUrl && (
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.18 }}
              className="mt-4 mb-2"
            >
              <a
                href={caseStudy.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[8px] bg-white/5 hover:bg-[#C4FF00]/10 border border-white/10 hover:border-[#C4FF00]/40 text-[#C4FF00] font-mono text-xs uppercase font-bold tracking-wider transition-all"
              >
                <span>{language === 'en' ? 'Open Live Project' : 'Acessar Projeto no Ar'}</span>
                <ExternalLink size={12} />
              </a>
            </motion.div>
          )}
        </div>

        {/* Grid de Metadados Estruturados (Apenas campos com conteúdo) */}
        {metadataItems.length > 0 && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASING }}
            className={`grid grid-cols-2 ${
              metadataItems.length >= 4 ? 'sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6' : 'sm:grid-cols-3'
            } gap-6 pt-8 mt-8 border-t border-[rgba(244,243,238,0.12)] font-mono text-xs`}
          >
            {metadataItems.map((item, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-white/40 block mb-1 uppercase tracking-wider text-[10px]">
                  {item.label}
                </span>
                <span className="text-[#FAFAF7] font-medium leading-snug break-words">
                  {item.value}
                </span>
              </div>
            ))}
          </motion.div>
        )}

      </div>
    </header>
  );
}

export default CaseEditorialHeader;
