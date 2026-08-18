import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Download, ExternalLink, Sparkles, Layers, ShieldCheck, Cpu, Globe, RefreshCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAbout } from '../hooks/useAbout';
import { CurtainLink } from '../context/RouteCurtainContext';
import { ClosingNavigation } from '../components/home/ClosingNavigation';
import { RollingText } from '../components/RollingText';

const EASING = [0.22, 1, 0.36, 1];

export function AboutMe() {
  const { t, language } = useLanguage();
  const { aboutData, brandingProjects } = useAbout();
  const prefersReducedMotion = useReducedMotion();
  const [, setHoveredSpectrumStep] = useState(null);

  const resumeDownloadUrl = aboutData?.resumeUrl || null;
  const lattesUrl = aboutData?.lattesUrl || 'http://lattes.cnpq.br/2300088312341296';

  // Trajetória Oficial: 6 Momentos Cronológicos
  const trajectoryMoments = [
    {
      num: '01',
      period: t('about_moment_1_period', '2019—2023'),
      title: t('about_moment_1_title', 'Ilustração & Narrativa Visual'),
      desc: t(
        'about_moment_1_desc',
        'Início da trajetória em ilustração autoral, explorando composição, metáforas gráficas e ritmo visual.'
      ),
      repertoire: t('about_moment_1_repertoire', 'Composição · Narrativa · Ritmo Visual'),
    },
    {
      num: '02',
      period: t('about_moment_2_period', '2021—2022'),
      title: t('about_moment_2_title', 'UI, Ilustração & Identidade'),
      desc: t(
        'about_moment_2_desc',
        'Atuação como bolsista em UI, ilustração e identidade visual; participação na criação dos manuais de marca do Programe_CE e do CEnPE.'
      ),
      repertoire: t('about_moment_2_repertoire', 'Manuais de Marca · Programe_CE · CEnPE'),
    },
    {
      num: '03',
      period: t('about_moment_3_period', '2022'),
      title: t('about_moment_3_title', 'Identidade CEnPE & Embrião Mapear'),
      desc: t(
        'about_moment_3_desc',
        'Criação da identidade visual do CEnPE e início do trabalho no projeto educacional que viria a evoluir e se tornar o Mapear.'
      ),
      repertoire: t('about_moment_3_repertoire', 'Identidade CEnPE · Concepção · Mapear'),
    },
    {
      num: '04',
      period: t('about_moment_4_period', '2022—2024'),
      title: t('about_moment_4_title', 'Evolução UX/UI & Produto'),
      desc: t(
        'about_moment_4_desc',
        'Evolução da atuação para UX/UI e Product Design no contexto do CEnPE/UFC e no desenvolvimento da plataforma Mapear.'
      ),
      repertoire: t('about_moment_4_repertoire', 'UX/UI · Arquitetura · CEnPE / UFC'),
    },
    {
      num: '05',
      period: t('about_moment_5_period', '2025+'),
      title: t('about_moment_5_title', 'Product Design, Systems & IA'),
      desc: t(
        'about_moment_5_desc',
        'Maior responsabilidade em Product Design, Design Systems, arquitetura de informação, documentação, handoff e prototipagem funcional com IA e vibe coding.'
      ),
      repertoire: t('about_moment_5_repertoire', 'Design Systems · Handoff · Vibe Coding & IA'),
    },
    {
      num: '06',
      period: t('about_moment_6_period', '2026'),
      title: t('about_moment_6_title', 'Freelance Selecionado'),
      desc: t(
        'about_moment_6_desc',
        'Atuação independente em projetos selecionados: manual de marca, produção digital e modernização web para Atlanta Home Concierge e redesign para Escutha.'
      ),
      repertoire: t('about_moment_6_repertoire', 'Atlanta Home Concierge · Escutha · Web'),
    },
  ];

  // Princípios de trabalho
  const workPrinciples = [
    {
      num: '01',
      title: t('about_principle_1_title', 'Entendo antes de simplificar.'),
      desc: t(
        'about_principle_1_desc',
        'Investigo contexto, regras e dependências antes de reduzir o problema.'
      ),
    },
    {
      num: '02',
      title: t('about_principle_2_title', 'Documento para que decisões sobrevivam ao handoff.'),
      desc: t(
        'about_principle_2_desc',
        'Componentes, tokens e especificações devem continuar compreensíveis fora do Figma.'
      ),
    },
    {
      num: '03',
      title: t('about_principle_3_title', 'Aproximo design e desenvolvimento.'),
      desc: t(
        'about_principle_3_desc',
        'Trato restrições técnicas como parte da solução, não como uma etapa posterior.'
      ),
    },
    {
      num: '04',
      title: t('about_principle_4_title', 'Construo sistemas, não apenas telas.'),
      desc: t(
        'about_principle_4_desc',
        'Procuro decisões que permaneçam consistentes entre módulos, fluxos e equipes.'
      ),
    },
  ];

  // Espectro de atuação principal
  const primarySpectrum = [
    { id: 'p1', name: t('about_spectrum_step_1', 'Pesquisa & Imersão'), desc: t('about_spectrum_step_1_desc', 'Mapeamento de contexto, regras de negócio e usuários') },
    { id: 'p2', name: t('about_spectrum_step_2', 'Estrutura & Arquitetura'), desc: t('about_spectrum_step_2_desc', 'Arquitetura de informação, fluxos de navegação e taxonomia') },
    { id: 'p3', name: t('about_spectrum_step_3', 'Interface & Usabilidade'), desc: t('about_spectrum_step_3_desc', 'Design de telas, microinterações e estados funcionais') },
    { id: 'p4', name: t('about_spectrum_step_4', 'Design System & Tokens'), desc: t('about_spectrum_step_4_desc', 'Componentes modulares, tokens semânticos e variantes') },
    { id: 'p5', name: t('about_spectrum_step_5', 'Documentação Técnica'), desc: t('about_spectrum_step_5_desc', 'Guias de uso, regras técnicas e acessibilidade WCAG') },
    { id: 'p6', name: t('about_spectrum_step_6', 'Handoff & Validação'), desc: t('about_spectrum_step_6_desc', 'Alinhamento com engenharia, prototipagem com IA e QA') },
  ];

  // Espectro complementar
  const complementarySpectrum = [
    { id: 'c1', name: t('about_spectrum_comp_1', 'Identidade & Marca'), desc: t('about_spectrum_comp_1_desc', 'Direção de arte, manuais de marca e consistência visual') },
    { id: 'c2', name: t('about_spectrum_comp_2', 'Motion & Interação'), desc: t('about_spectrum_comp_2_desc', 'Microinterações, timing, respostas táteis e fluidez') },
    { id: 'c3', name: t('about_spectrum_comp_3', 'Ilustração & Narrativa'), desc: t('about_spectrum_comp_3_desc', 'Metáforas visuais, composição e ícones autorais') },
  ];

  // 5 Formatos de Colaboração Comercial
  const collaborationModes = [
    {
      num: '01',
      icon: Layers,
      title: t('about_collab_1_title', 'Product and Interface Design'),
      tag: t('about_collab_1_tag', 'PRODUTO END-TO-END'),
      desc: t(
        'about_collab_1_desc',
        'Concepção completa de interfaces e produtos digitais: desde a arquitetura de fluxos e wireframes até o visual design refinado e validação de usabilidade.'
      ),
      tools: 'Figma · Arquitetura · Prototipagem IA · Handoff',
    },
    {
      num: '02',
      icon: ShieldCheck,
      title: t('about_collab_2_title', 'UX/UI Audit and Direction'),
      tag: t('about_collab_2_tag', 'DIAGNÓSTICO & DIREÇÃO'),
      desc: t(
        'about_collab_2_desc',
        'Auditoria heurística aprofundada, mapeamento de gargalos de conversão/usabilidade e direcionamento estratégico de interface para produtos em produção.'
      ),
      tools: 'Auditoria Heurística · Relatório de Ação · Benchmarks',
    },
    {
      num: '03',
      icon: Cpu,
      title: t('about_collab_3_title', 'Design Systems'),
      tag: t('about_collab_3_tag', 'SISTEMAS & ESCALA'),
      desc: t(
        'about_collab_3_desc',
        'Criação, governança e documentação técnica de Design Systems, tokens semânticos e bibliotecas escaláveis alinhadas com a equipe de engenharia.'
      ),
      tools: 'Design Tokens · Variantes · Documentação Viva',
    },
    {
      num: '04',
      icon: Globe,
      title: t('about_collab_4_title', 'Web Presence'),
      tag: t('about_collab_4_tag', 'PRESENÇA DIGITAL'),
      desc: t(
        'about_collab_4_desc',
        'Criação e modernização de websites e experiências digitais com alto padrão visual, microinterações, narrativa editorial e foco em autoridade.'
      ),
      tools: 'Direção Web · Vibe Coding & Motion · Identidade Digital',
    },
    {
      num: '05',
      icon: RefreshCw,
      title: t('about_collab_5_title', 'Ongoing Design Support'),
      tag: t('about_collab_5_tag', 'SQUADS & CONTINUIDADE'),
      desc: t(
        'about_collab_5_desc',
        'Apoio contínuo e integrado a squads de produto para evolução de features, manutenção de consistência e handoff ágil para desenvolvimento.'
      ),
      tools: 'Apoio Recorrente · Parceria com Engenharia · Iteração',
    },
  ];

  // Retrato pessoal real
  const portraitImage =
    aboutData?.portraitUrl || `${import.meta.env.BASE_URL}assets/profile/profile3.png`;

  return (
    <div className="w-full min-h-screen bg-[#10110F] text-[#FAFAF7] select-none">
      {/* ============================================================ */}
      {/* 1. HERO PESSOAL E COMPACTA                                    */}
      {/* ============================================================ */}
      <section className="relative w-full pt-20 md:pt-24 lg:pt-28 pb-12 md:pb-16 border-b border-[rgba(244,243,238,0.16)] bg-[#10110F] flex items-center lg:min-h-[clamp(540px,68svh,720px)]">
        <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Coluna Esquerda: Conteúdo Editorial e Metadados (~62%) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Eyebrow */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASING }}
                className="flex items-center gap-3 mb-4"
              >
                <span className="w-2 h-2 rounded-full bg-[#C4FF00]" />
                <span className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#C4FF00]">
                  {aboutData?.heroEyebrow && language === 'pt'
                    ? aboutData.heroEyebrow
                    : aboutData?.heroEyebrow_en && language === 'en'
                    ? aboutData.heroEyebrow_en
                    : t('about_hero_eyebrow', 'SOBRE / DAVID SALVIANO')}
                </span>
              </motion.div>

              {/* Título Principal */}
              <motion.h1
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05, ease: EASING }}
                className="font-serif text-[2.25rem] sm:text-[2.75rem] md:text-[3.25rem] lg:text-[3.6rem] font-normal leading-[1.08] tracking-tight text-[#FAFAF7] mb-5"
              >
                {aboutData?.heroTitle && language === 'pt'
                  ? aboutData.heroTitle
                  : aboutData?.heroTitle_en && language === 'en'
                  ? aboutData.heroTitle_en
                  : t(
                      'about_hero_title',
                      'Sou David Salviano, Product Designer em Fortaleza. Desenho a estrutura por trás de produtos digitais complexos.'
                    )}
              </motion.h1>

              {/* Supporting Text */}
              <motion.p
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1, ease: EASING }}
                className="font-sans text-sm sm:text-base lg:text-lg text-[#F4F3EE]/75 leading-relaxed max-w-2xl mb-8"
              >
                {aboutData?.heroDescription && language === 'pt'
                  ? aboutData.heroDescription
                  : aboutData?.heroDescription_en && language === 'en'
                  ? aboutData.heroDescription_en
                  : t(
                      'about_hero_text',
                      'Há mais de quatro anos trabalho entre estratégia, arquitetura, interface e Design Systems — transformando decisões complexas em experiências que equipes conseguem construir e pessoas conseguem usar.'
                    )}
              </motion.p>

              {/* Metadados Bar */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="pt-6 border-t border-[rgba(244,243,238,0.16)] flex flex-wrap items-center gap-y-3 gap-x-5 font-mono text-[11px] sm:text-xs text-[#F4F3EE]/70 uppercase tracking-wider"
              >
                <div className="flex items-center gap-2 text-[#FAFAF7]">
                  <span>{t('about_hero_location', 'Fortaleza, Brasil')}</span>
                </div>
                <span className="text-white/20 hidden sm:inline">•</span>
                <div>
                  <span className="text-[#C4FF00] font-bold">[ </span>
                  <span>{t('about_hero_role', 'Product Designer')}</span>
                  <span className="text-[#C4FF00] font-bold"> ]</span>
                </div>
                <span className="text-white/20 hidden sm:inline">•</span>
                <div>{t('about_hero_availability', 'Freelance selecionado & consultoria')}</div>
                <span className="text-white/20 hidden sm:inline">•</span>
                <div className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-[4px] text-[10px]">
                  {t('about_hero_languages', 'PT / EN / ES')}
                </div>
              </motion.div>
            </div>

            {/* Coluna Direita: Fotografia Pessoal (~38%) */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASING }}
              className="lg:col-span-5 flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-[380px] lg:max-w-[420px] aspect-[4/5] rounded-[18px] overflow-hidden border border-[rgba(244,243,238,0.18)] bg-[#151613] shadow-2xl">
                <img
                  src={portraitImage}
                  alt={
                    aboutData?.portraitAlt && language === 'pt'
                      ? aboutData.portraitAlt
                      : aboutData?.portraitAlt_en && language === 'en'
                      ? aboutData.portraitAlt_en
                      : 'David Salviano — Product Designer'
                  }
                  className="w-full h-full object-cover object-center filter saturate-[0.92] contrast-[1.02]"
                />
                
                {/* Overlay sutil inferior para integração */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#10110F]/80 via-transparent to-transparent pointer-events-none" />

                {/* Badge Autoral no Canto */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 bg-[#10110F]/90 backdrop-blur-sm border border-white/10 rounded-[8px] font-mono text-[10px] uppercase tracking-wider text-[#F4F3EE]/80">
                    David Salviano · Design System & UI
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#C4FF00]" />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. SEÇÃO “NÃO COMECEI PELAS INTERFACES” (TRAJETÓRIA OFICIAL)   */}
      {/* ============================================================ */}
      <section id="trajectory-section" className="w-full py-20 lg:py-28 border-b border-[rgba(244,243,238,0.16)] bg-[#10110F]">
        <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
          
          {/* Cabeçalho da Seção */}
          <div className="max-w-4xl mb-14 lg:mb-18">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C4FF00] block mb-3">
              {t('about_trajectory_eyebrow', 'TRAJETÓRIA OFICIAL')}
            </span>
            <h2 className="font-serif text-[2rem] sm:text-[2.6rem] lg:text-[3.25rem] font-normal leading-[1.08] tracking-tight text-[#FAFAF7] mb-5">
              {t(
                'about_trajectory_headline',
                'Não comecei desenhando interfaces. Comecei aprendendo a construir significado visual.'
              )}
            </h2>
            <p className="font-sans text-sm sm:text-base lg:text-lg text-[#F4F3EE]/75 leading-relaxed max-w-3xl">
              {t(
                'about_trajectory_text',
                'Ilustração, identidade e motion formaram a base que hoje levo para produtos digitais. Ao longo dos anos, composição se tornou arquitetura de informação, consistência visual se tornou Design System e movimento se transformou em resposta funcional.'
              )}
            </p>
          </div>

          {/* 6 Momentos de Evolução da Trajetória Oficial */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {trajectoryMoments.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#151613] border border-[rgba(244,243,238,0.16)] rounded-[18px] p-7 flex flex-col justify-between hover:border-[rgba(196,255,0,0.45)] transition-all duration-300 group min-h-[280px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#C4FF00]">
                        {item.num} //
                      </span>
                      <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-[4px] font-mono text-[10px] text-[#F4F3EE]/70">
                        {item.period}
                      </span>
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#C4FF00] transition-colors" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-white font-normal mb-3">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#F4F3EE]/70 leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block group-hover:text-[#F4F3EE]/80 transition-colors">
                    {item.repertoire}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. SEÇÃO “PERMANECER TAMBÉM É PROFUNDIDADE” (MAPEAR & PRODUTO)*/}
      {/* ============================================================ */}
      <section className="w-full py-20 lg:py-28 border-b border-[rgba(244,243,238,0.16)] bg-[#10110F]">
        <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Coluna Esquerda: Narrativa de Continuidade (~55%) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C4FF00] block mb-3">
                {t('about_depth_eyebrow', 'PROFUNDIDADE INSTITUCIONAL')}
              </span>
              <h2 className="font-serif text-[2rem] sm:text-[2.6rem] lg:text-[3.25rem] font-normal leading-[1.08] tracking-tight text-[#FAFAF7] mb-5">
                {t(
                  'about_depth_headline',
                  'Permanecer no produto também é uma forma de profundidade.'
                )}
              </h2>
              <p className="font-sans text-sm sm:text-base lg:text-lg text-[#F4F3EE]/80 leading-relaxed mb-8">
                {t(
                  'about_depth_text',
                  'O Mapear nasceu no contexto institucional do CEnPE/UFC e da FGV DGPE como um projeto educacional de larga escala. Ao longo de mais de quatro anos como experiência profissional principal, acompanhei sua evolução entre novos módulos, regras de negócio, acessibilidade e integrações. Decisões de design sólidas não terminam no handoff: precisam continuar escalando no tempo.'
                )}
              </p>

              {/* 4 Pilares de Continuidade Técnica */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 bg-[#151613] border border-[rgba(244,243,238,0.16)] rounded-[12px] flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-[#C4FF00] flex-shrink-0" />
                  <span className="font-mono text-xs text-[#FAFAF7] uppercase tracking-wider">
                    {t('about_depth_art_interface', 'Interface & Módulos')}
                  </span>
                </div>
                <div className="p-4 bg-[#151613] border border-[rgba(244,243,238,0.16)] rounded-[12px] flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-[#C4FF00] flex-shrink-0" />
                  <span className="font-mono text-xs text-[#FAFAF7] uppercase tracking-wider">
                    {t('about_depth_art_ds', 'Design System & Tokens')}
                  </span>
                </div>
                <div className="p-4 bg-[#151613] border border-[rgba(244,243,238,0.16)] rounded-[12px] flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-[#C4FF00] flex-shrink-0" />
                  <span className="font-mono text-xs text-[#FAFAF7] uppercase tracking-wider">
                    {t('about_depth_art_docs', 'Documentação & Handoff')}
                  </span>
                </div>
                <div className="p-4 bg-[#151613] border border-[rgba(244,243,238,0.16)] rounded-[12px] flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-[#C4FF00] flex-shrink-0" />
                  <span className="font-mono text-xs text-[#FAFAF7] uppercase tracking-wider">
                    {t('about_depth_art_arch', 'Arquitetura & Fluxos')}
                  </span>
                </div>
              </div>
            </div>

            {/* Coluna Direita: Composição Limpa de Artefato Real (~45%) */}
            <div className="lg:col-span-5 flex justify-center w-full">
              <CurtainLink
                to="/cases/fgv-mapear"
                className="group relative w-full rounded-[20px] overflow-hidden border border-[rgba(244,243,238,0.16)] bg-[#141512] p-4 sm:p-6 shadow-xl hover:border-[rgba(196,255,0,0.5)] transition-all duration-300 flex flex-col justify-between focus-visible:outline-2 focus-visible:outline-[#C4FF00]"
              >
                <div className="aspect-[16/10] w-full rounded-[14px] overflow-hidden border border-white/10 bg-[#10110F] relative mb-4 sm:mb-5">
                  <img
                    src={`${import.meta.env.BASE_URL}assets/projects_cape/fgvmapear_card.png`}
                    alt="Mapear Product Architecture & Interface"
                    className="w-full h-full object-cover filter saturate-[0.95] group-hover:scale-[1.03] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-[#10110F]/80 backdrop-blur-md border border-white/15 rounded-[6px] font-mono text-[9px] uppercase font-bold tracking-widest text-[#C4FF00]">
                    ESTUDO PRINCIPAL
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#C4FF00]">
                      MAPEAR // FGV DGPE · CEnPE / UFC
                    </span>
                    <span className="font-mono text-[10px] text-white/40 uppercase">
                      2022—2026
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl text-white font-normal leading-snug group-hover:text-[#C4FF00] transition-colors">
                    Evolução Contínua de Produto & Sistema (4+ anos)
                  </h3>

                  <div className="mt-2 pt-3 border-t border-white/[0.08] flex items-center justify-between font-mono text-[11px] font-bold uppercase tracking-wider text-[#FAFAF7]/75 group-hover:text-[#C4FF00] transition-colors">
                    <span>{language === 'en' ? 'Explore Full Case Study' : 'Ver Estudo Completo'}</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                </div>
              </CurtainLink>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. SEÇÃO “COMO EU TRABALHO” (COMPORTAMENTOS PROFISSIONAIS)    */}
      {/* ============================================================ */}
      <section className="w-full py-20 lg:py-28 border-b border-[rgba(244,243,238,0.16)] bg-[#10110F]">
        <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
          
          <div className="max-w-4xl mb-14 lg:mb-18">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C4FF00] block mb-3">
              MÉTODO & ATUAÇÃO
            </span>
            <h2 className="font-serif text-[2rem] sm:text-[2.6rem] lg:text-[3.25rem] font-normal leading-[1.08] tracking-tight text-[#FAFAF7]">
              {t(
                'about_principles_headline',
                'Como transformo complexidade em trabalho compartilhável.'
              )}
            </h2>
          </div>

          {/* Grid Estruturado com 4 Colunas, Bordas Laterais e Corner Radius */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-[rgba(244,243,238,0.16)] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#10110F]">
            {workPrinciples.map((item, idx) => {
              const isNotLastLg = idx < 3;
              const isOddMd = idx % 2 === 0;
              const isTopHalfMd = idx < 2;
              const isNotLastMobile = idx < 3;

              return (
                <div
                  key={idx}
                  className={`
                    p-6 sm:p-8 lg:p-10 flex flex-col justify-between h-full bg-[#151613] hover:bg-white/[0.02] transition-colors
                    ${isNotLastMobile ? 'border-b border-[rgba(244,243,238,0.16)]' : ''}
                    ${isTopHalfMd ? 'md:border-b md:border-[rgba(244,243,238,0.16)]' : 'md:border-b-0'}
                    ${isOddMd ? 'md:border-r md:border-[rgba(244,243,238,0.16)]' : 'md:border-r-0'}
                    ${isNotLastLg ? 'lg:border-r lg:border-[rgba(244,243,238,0.16)]' : 'lg:border-r-0'}
                    lg:border-b-0
                  `}
                >
                  <div>
                    {/* Número do princípio */}
                    <div className="flex items-center justify-between mb-6 sm:mb-8">
                      <span className="font-mono text-xs font-bold text-[#8B8B85] tracking-wider">
                        {item.num} //
                      </span>
                    </div>

                    {/* Título */}
                    <h3 className="font-serif text-xl sm:text-2xl text-white font-normal mb-3 sm:mb-4 leading-snug">
                      {item.title}
                    </h3>

                    {/* Descrição */}
                    <p className="font-sans text-xs sm:text-sm text-[#F4F3EE]/70 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. SEÇÃO “ESPECTRO DE ATUAÇÃO” (PROCESSO LINEAR PONTILHADO)  */}
      {/* ============================================================ */}
      <section className="w-full py-20 lg:py-28 border-b border-[rgba(244,243,238,0.16)] bg-[#10110F]">
        <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
          
          <div className="max-w-4xl mb-14">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C4FF00] block mb-3">
              {t('about_spectrum_eyebrow', 'ESPECTRO DE ATUAÇÃO')}
            </span>
            <h2 className="font-serif text-[2rem] sm:text-[2.6rem] lg:text-[3.25rem] font-normal leading-[1.08] tracking-tight text-[#FAFAF7]">
              {t(
                'about_spectrum_headline',
                'Processo ponta a ponta e repertório visual complementar.'
              )}
            </h2>
          </div>

          {/* Linha 1: Atuação Principal */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4FF00]" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#C4FF00]">
                {t('about_spectrum_primary_label', 'ATUAÇÃO PRINCIPAL')}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 sm:gap-4">
              {primarySpectrum.map((step, sIdx) => (
                <div
                  key={step.id}
                  onMouseEnter={() => setHoveredSpectrumStep(step.id)}
                  onMouseLeave={() => setHoveredSpectrumStep(null)}
                  className="p-5 sm:p-6 bg-[#141512] border border-[rgba(244,243,238,0.12)] rounded-[16px] flex flex-col justify-between hover:border-[rgba(196,255,0,0.5)] hover:bg-[#181916] transition-all duration-300 group min-h-[160px] shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-white/[0.06]">
                    <span className="font-mono text-xs font-bold text-[#C4FF00] tracking-wider">
                      0{sIdx + 1}. //
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#C4FF00] transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg sm:text-[1.15rem] text-white font-normal mb-2 leading-snug group-hover:text-[#C4FF00] transition-colors">
                      {step.name}
                    </h4>
                    <p className="font-sans text-xs text-[#F4F3EE]/70 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Linha 2: Repertório Complementar */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-white/50">
                {t('about_spectrum_comp_label', 'REPERTÓRIO COMPLEMENTAR')}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
              {complementarySpectrum.map((step) => (
                <div
                  key={step.id}
                  className="p-5 sm:p-6 bg-[#141512] border border-[rgba(244,243,238,0.12)] rounded-[16px] flex flex-col justify-between hover:border-white/40 hover:bg-[#181916] transition-all duration-300 group min-h-[140px] shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-white/[0.06]">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/50">
                      + COMPLEMENTAR
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white/60 transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg sm:text-[1.15rem] text-white font-normal mb-2 leading-snug">
                      {step.name}
                    </h4>
                    <p className="font-sans text-xs text-[#F4F3EE]/70 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. SEÇÃO “ALÉM DA INTERFACE” (DINÂMICO DO SANITY - MÁX 3)    */}
      {/* ============================================================ */}
      {brandingProjects && brandingProjects.length > 0 && (
        <section className="w-full py-20 lg:py-28 border-b border-[rgba(244,243,238,0.16)] bg-[#10110F]">
          <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
            
            <div className="max-w-4xl mb-14">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C4FF00] block mb-3">
                {t('about_beyond_eyebrow', 'ALÉM DA INTERFACE')}
              </span>
              <h2 className="font-serif text-[2rem] sm:text-[2.6rem] lg:text-[3.25rem] font-normal leading-[1.08] tracking-tight text-[#FAFAF7]">
                {t(
                  'about_beyond_headline',
                  'Antes de organizar produtos, aprendi a organizar marcas, imagens e movimento.'
                )}
              </h2>
            </div>

            {/* No máximo 3 Cases de Branding vindos do Sanity */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {brandingProjects.slice(0, 3).map((piece, pIdx) => (
                <CurtainLink
                  key={piece.id || pIdx}
                  to={`/cases/${piece.slug}`}
                  className="group bg-[#151613] border border-[rgba(244,243,238,0.16)] rounded-[18px] overflow-hidden flex flex-col justify-between hover:border-[rgba(196,255,0,0.45)] transition-all duration-500 cursor-pointer shadow-lg hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-[#C4FF00]"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#10110F] relative flex items-center justify-center p-6 border-b border-white/5">
                    {piece.imageUrl ? (
                      <img
                        src={piece.imageUrl}
                        alt={piece.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-mono text-xs text-white/30 tracking-widest uppercase">
                        {piece.title}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#151613] via-transparent to-transparent opacity-60 pointer-events-none" />
                    
                    {/* Tag superior */}
                    <div className="absolute top-3.5 right-3.5 px-2 py-0.5 bg-[#10110F]/80 backdrop-blur-sm border border-white/10 rounded-[6px] font-mono text-[9px] uppercase tracking-wider text-white/70">
                      {piece.tag || 'BRANDING'}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#C4FF00] block mb-1">
                        {piece.area}
                      </span>
                      <h3 className="font-serif text-xl text-white font-normal mb-2 group-hover:text-[#C4FF00] transition-colors">
                        {piece.title}
                      </h3>
                      <p className="font-sans text-xs text-[#F4F3EE]/70 leading-relaxed mb-4">
                        {language === 'en' && piece.context_en ? piece.context_en : piece.context}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px] font-bold uppercase tracking-wider text-[#F4F3EE]/70 group-hover:text-[#C4FF00] transition-colors">
                      <span>{language === 'en' ? 'Explore Case' : 'Ver Estudo'}</span>
                      <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </CurtainLink>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 7. SEÇÃO “EXPERIÊNCIA E FORMAÇÃO” (FICHA PROFISSIONAL OBJETIVA)*/}
      {/* ============================================================ */}
      <section className="w-full py-20 lg:py-28 border-b border-[rgba(244,243,238,0.16)] bg-[#10110F]">
        <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
          
          <div className="max-w-4xl mb-14">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C4FF00] block mb-3">
              {t('about_bio_eyebrow', 'FICHA PROFISSIONAL')}
            </span>
            <h2 className="font-serif text-[2rem] sm:text-[2.6rem] lg:text-[3.25rem] font-normal leading-[1.08] tracking-tight text-[#FAFAF7]">
              {t('about_bio_headline', 'Formação acadêmica, ferramentas e contexto de atuação.')}
            </h2>
          </div>

          {/* Grid Estruturada de Ficha */}
          <div className="bg-[#151613] border border-[rgba(244,243,238,0.16)] rounded-[18px] p-8 sm:p-12 divide-y divide-[rgba(244,243,238,0.12)]">
            
            {/* Linha 1: Formação */}
            <div className="pb-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-4 font-mono text-xs uppercase font-bold tracking-wider text-white/50">
                {t('about_bio_edu_label', 'Formação Acadêmica')}
              </div>
              <div className="md:col-span-8">
                <h4 className="font-serif text-xl sm:text-2xl text-white font-normal mb-1">
                  {t('about_bio_edu_title', 'Bacharelado em Sistemas e Mídias Digitais')}
                </h4>
                <p className="font-sans text-sm text-[#F4F3EE]/70">
                  {t('about_bio_edu_inst', 'Universidade Federal do Ceará (UFC)')}
                </p>
              </div>
            </div>

            {/* Linha 2: Atuação Central */}
            <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-4 font-mono text-xs uppercase font-bold tracking-wider text-white/50">
                {t('about_bio_practice_label', 'Atuação Central')}
              </div>
              <div className="md:col-span-8 font-sans text-sm sm:text-base text-[#FAFAF7] leading-relaxed">
                {t(
                  'about_bio_practice_items',
                  'Product Design · UX/UI · Design Systems · Arquitetura de Informação · Documentação & Handoff · Prototipagem Funcional com IA'
                )}
              </div>
            </div>

            {/* Linha 3: Contextos de Atuação */}
            <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-4 font-mono text-xs uppercase font-bold tracking-wider text-white/50">
                {t('about_bio_projects_label', 'Contextos de Atuação')}
              </div>
              <div className="md:col-span-8 font-sans text-sm sm:text-base text-[#FAFAF7] leading-relaxed">
                {t(
                  'about_bio_projects_items',
                  'Mapear (4+ anos de evolução contínua · FGV DGPE / CEnPE / UFC) · Projetos Selecionados (Atlanta Home Concierge, Escutha)'
                )}
              </div>
            </div>

            {/* Linha 4: Meios & Ferramentas */}
            <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-4 font-mono text-xs uppercase font-bold tracking-wider text-white/50">
                {t('about_bio_tools_label', 'Meios & Ferramentas')}
              </div>
              <div className="md:col-span-8 font-sans text-sm sm:text-base text-[#F4F3EE]/80 leading-relaxed">
                {t(
                  'about_bio_tools_items',
                  'Figma, prototipagem com IA, vibe coding, documentação técnica e handoff como meios para entregar soluções completas de design.'
                )}
              </div>
            </div>

            {/* Linha 5: Idiomas */}
            <div className="pt-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-4 font-mono text-xs uppercase font-bold tracking-wider text-white/50">
                {t('about_bio_lang_label', 'Idiomas')}
              </div>
              <div className="md:col-span-8 font-mono text-xs text-[#FAFAF7]">
                {t('about_bio_lang_items', 'Português (Nativo) · Inglês (Profissional) · Espanhol (Básico)')}
              </div>
            </div>

          </div>

          {/* Currículo Buttons (PDF via Sanity + Lattes Complementar) */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {resumeDownloadUrl ? (
              <a
                href={resumeDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#C4FF00] hover:bg-[#d4ff1a] text-[#10110F] rounded-[12px] font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg focus-visible:outline-2 focus-visible:outline-[#C4FF00]"
              >
                <Download size={15} />
                <RollingText text={t('about_bio_resume_btn', 'Baixar Currículo (PDF)')} />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white/5 border border-white/10 text-white/40 rounded-[12px] font-mono text-xs font-bold uppercase tracking-wider cursor-not-allowed">
                <Download size={15} />
                <span>{t('about_bio_resume_btn', 'Currículo (Em Breve)')}</span>
              </span>
            )}

            <a
              href={lattesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-3.5 bg-white/5 hover:bg-white/10 hover:text-[#C4FF00] border border-[rgba(244,243,238,0.2)] rounded-[12px] font-mono text-xs font-bold uppercase tracking-wider text-[#FAFAF7] transition-all focus-visible:outline-2 focus-visible:outline-[#C4FF00]"
            >
              <RollingText text={t('about_bio_lattes_btn', 'Currículo Lattes ↗')} />
              <ExternalLink size={13} />
            </a>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. SEÇÃO “POSICIONAMENTO COMERCIAL” (5 FORMATOS)              */}
      {/* ============================================================ */}
      <section className="w-full py-20 lg:py-28 border-b border-[rgba(244,243,238,0.16)] bg-[#10110F]">
        <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
          
          <div className="max-w-4xl mb-6">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C4FF00] block mb-3">
              {t('about_collab_eyebrow', 'POSICIONAMENTO COMERCIAL')}
            </span>
            <h2 className="font-serif text-[2rem] sm:text-[2.6rem] lg:text-[3.25rem] font-normal leading-[1.08] tracking-tight text-[#FAFAF7] mb-4">
              {t('about_collab_headline', 'Cinco formatos de colaboração para transformar complexidade em resultado.')}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#F4F3EE]/60 max-w-2xl">
              {t(
                'about_collab_means_note',
                'Figma, prototipagem com IA, documentação e handoff estruturado são os meios utilizados para viabilizar e acelerar cada solução.'
              )}
            </p>
          </div>

          {/* 5 Formatos Comerciais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {collaborationModes.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-8 bg-[#141512] border border-[rgba(244,243,238,0.12)] rounded-[18px] flex flex-col justify-between hover:border-[rgba(196,255,0,0.45)] hover:bg-[#181916] transition-all duration-300 min-h-[260px] shadow-sm"
                >
                  <div>
                    {/* Header do Card: Número + Ícone à esquerda, Tag à direita */}
                    <div className="flex items-center justify-between mb-5 pb-3.5 border-b border-white/[0.08]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-[6px] bg-[#C4FF00]/10 border border-[#C4FF00]/20 flex items-center justify-center text-[#C4FF00]">
                          <IconComp size={15} />
                        </div>
                        <span className="font-mono text-xs font-bold text-[#C4FF00] tracking-wider">
                          {item.num} //
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 bg-white/[0.04] border border-white/10 rounded-[6px] font-mono text-[9px] uppercase font-bold tracking-widest text-[#F4F3EE]/75">
                        {item.tag}
                      </span>
                    </div>

                    {/* Título sem indentação artificial */}
                    <h3 className="font-serif text-xl sm:text-[1.35rem] text-white font-normal mb-3 leading-snug">
                      {item.title}
                    </h3>

                    {/* Descrição */}
                    <p className="font-sans text-xs sm:text-sm text-[#F4F3EE]/70 leading-relaxed mb-6">
                      {item.desc}
                    </p>
                  </div>

                  {/* Rodapé com Ferramentas/Entregáveis */}
                  <div className="pt-3.5 border-t border-white/[0.08] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C4FF00]/70 flex-shrink-0" />
                    <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#F4F3EE]/60 block leading-tight">
                      {item.tools}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. DEPOIMENTO OPCIONAL (SOMENTE SE REAL E AUTORIZADO NO SANITY) */}
      {/* ============================================================ */}
      {aboutData?.testimonial && aboutData.testimonial.published && (
        <section className="w-full py-20 lg:py-28 border-b border-[rgba(244,243,238,0.16)] bg-[#10110F]">
          <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
            <div className="max-w-3xl mx-auto p-10 bg-[#151613] border border-[rgba(244,243,238,0.2)] rounded-[20px]">
              <span className="font-mono text-[10px] uppercase font-bold tracking-[0.2em] text-[#C4FF00] block mb-4">
                DEPOIMENTO
              </span>
              <p className="font-serif text-2xl sm:text-3xl text-white font-normal leading-snug mb-8">
                “{language === 'en' && aboutData.testimonial.quote_en ? aboutData.testimonial.quote_en : aboutData.testimonial.quote_pt}”
              </p>
              <div className="flex items-center gap-4">
                <div>
                  <h5 className="font-serif text-lg text-white font-normal">
                    {aboutData.testimonial.author}
                  </h5>
                  <p className="font-mono text-xs text-white/50">
                    {aboutData.testimonial.role} · {aboutData.testimonial.organization}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 10. CTA & ENCERRAMENTO COMPARTILHADO COM LANDING & WORK       */}
      {/* ============================================================ */}
      <ClosingNavigation />
    </div>
  );
}

export default AboutMe;
