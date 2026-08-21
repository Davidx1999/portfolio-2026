import React, { useState, useEffect } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  MessageCircle,
  Upload,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { useLetsTalk } from '../hooks/useLetsTalk';
import { useHeaderMetrics } from '../hooks/useHeaderMetrics';
import { RollingText } from '../components/RollingText';
import { getLocalizedBudgetOptions } from '../services/currencyLocalization';

const LinkedInIcon = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const InstagramIcon = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export function Contact() {
  const { t } = useTranslation(['contact', 'validation', 'common']);
  const { language, currency, market, currencySymbol } = useLanguage();
  const { talkData } = useLetsTalk();
  const { safeOffset } = useHeaderMetrics();

  const isPt = language === 'pt';

  // 1. Fortaleza Live Clock (Client-only safe hydration)
  const [fortalezaTime, setFortalezaTime] = useState('');
  useEffect(() => {
    const updateTime = () => {
      try {
        const formatter = new Intl.DateTimeFormat('pt-BR', {
          timeZone: 'America/Fortaleza',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        setFortalezaTime(formatter.format(new Date()));
      } catch {
        const now = new Date();
        setFortalezaTime(now.toTimeString().slice(0, 8));
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 2. Email Copy Interaction
  const [copiedEmail, setCopiedEmail] = useState(false);
  const handleCopyEmail = (e) => {
    e.preventDefault();
    const emailToCopy = talkData?.email || 'davidsalviano52@gmail.com';
    navigator.clipboard.writeText(emailToCopy).then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2400);
    });
  };

  // 3. Form State & Selections
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState('');
  const [selectedTimeline, setSelectedTimeline] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');

  // Limpa orçamento selecionado ao alternar idioma
  useEffect(() => {
    setSelectedBudget('');
  }, [language]);

  const [formData, setFormData] = useState({
    description: '',
    name: '',
    email: '',
    company: '',
    deadline: '',
    referenceLink: '',
    honeypot: '',
  });

  const [attachmentName, setAttachmentName] = useState('');
  const [attachmentError, setAttachmentError] = useState('');

  const [submissionState, setSubmissionState] = useState({
    status: 'idle',
    message: '',
  });

  const handleServiceToggle = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setAttachmentError('');
    if (!file) {
      setAttachmentName('');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setAttachmentError(
        isPt ? 'O arquivo excede o limite máximo de 5MB.' : 'File exceeds maximum limit of 5MB.'
      );
      setAttachmentName('');
      e.target.value = '';
      return;
    }
    setAttachmentName(file.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.honeypot) {
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.description.trim()) {
      setSubmissionState({
        status: 'error',
        message: isPt
          ? 'Por favor, preencha os campos obrigatórios (Nome, Email e Descrição do Projeto).'
          : 'Please fill in the required fields (Name, Email, and Project Description).',
      });
      return;
    }

    setSubmissionState({ status: 'submitting', message: '' });

    const servicesListFormatted = selectedServices.length > 0 ? selectedServices.join(', ') : (isPt ? 'Não especificado' : 'Not specified');
    const formatValue = selectedFormat || (isPt ? 'Não especificado' : 'Not specified');
    const timelineValue = selectedTimeline || (isPt ? 'Não especificado' : 'Not specified');
    const budgetValue = selectedBudget || (isPt ? 'Não especificado' : 'Not specified');

    const emailSubject = encodeURIComponent(
      `New Project Inquiry // ${formData.name} ${formData.company ? `(${formData.company})` : ''}`
    );

    const emailBody = encodeURIComponent(
      `Hello David,

I would like to discuss a project. Here are the details:

--------------------------------------------------
1. SERVICES OF INTEREST:
${servicesListFormatted}

2. PREFERRED FORMAT:
${formatValue}

3. TARGET TIMELINE:
${timelineValue}

4. ESTIMATED INVESTMENT RANGE:
${budgetValue} (Currency: ${currency} | Market: ${market})
--------------------------------------------------

PROJECT OVERVIEW & GOALS:
${formData.description}

CONTACT DETAILS:
- Name: ${formData.name}
- Email: ${formData.email}
- Company: ${formData.company || 'N/A'}
- Desired Deadline: ${formData.deadline || 'N/A'}
- Reference Link: ${formData.referenceLink || 'N/A'}
${attachmentName ? `- Attachment: ${attachmentName}` : ''}

--------------------------------------------------
Sent via official portfolio (davidsalviano.com)
`
    );

    const customEndpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;

    if (customEndpoint) {
      try {
        const response = await fetch(customEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            ...formData,
            selectedServices,
            selectedFormat,
            selectedTimeline,
            selectedBudget: budgetValue,
            selectedMarket: market,
            selectedCurrency: currency,
            attachmentName,
          }),
        });

        if (response.ok) {
          setSubmissionState({
            status: 'success',
            message: isPt
              ? (talkData?.confirmationMessage || 'Mensagem recebida com sucesso. Entrarei em contato em breve.')
              : (talkData?.confirmationMessage_en || 'Message received successfully. I’ll be in touch shortly.'),
          });
          return;
        }
      } catch (err) {
        console.warn('Endpoint submission failed, using direct email fallback:', err);
      }
    }

    // Fallback mailto
    const mailtoUrl = `mailto:${talkData?.email || 'davidsalviano52@gmail.com'}?subject=${emailSubject}&body=${emailBody}`;
    window.open(mailtoUrl, '_self');

    setTimeout(() => {
      setSubmissionState({
        status: 'success',
        message: isPt
          ? 'Seu briefing foi estruturado e aberto no seu aplicativo de email. Caso não tenha aberto automaticamente, você também pode copiar meu email direto ao lado.'
          : 'Your project brief was formatted and opened in your email client. If it did not open automatically, you can also copy my direct email on the left.',
      });
    }, 600);
  };

  // Content Selection
  const defaultServices = isPt
    ? ['Design de Produto (End-to-End)', 'Auditoria & Diagnóstico UX/UI', 'Design System & Tokens', 'Presença Digital & Web', 'Suporte Contínuo a Squads']
    : ['Product Design (End-to-End)', 'UX/UI Audit & Diagnostic', 'Design System & Tokens', 'Digital Web Presence', 'Ongoing Squad Support'];

  const defaultFormats = isPt
    ? ['Projeto Dedicado', 'Consultoria Pontual', 'Apoio Integrado a Squads', 'Acompanhamento Recorrente']
    : ['Dedicated Project', 'Design Consulting', 'Embedded Squad Support', 'Ongoing Retainer'];

  const defaultTimelines = isPt
    ? ['Imediato / Este Mês', 'Próximos 1–2 Meses', 'Próximo Trimestre', 'Apenas Sondando']
    : ['Immediate / This Month', 'Next 1–2 Months', 'Next Quarter', 'Flexible / Exploratory'];

  const servicesOptions = (isPt ? talkData?.servicesOptions : talkData?.servicesOptions_en) || defaultServices;
  const formatOptions = (isPt ? talkData?.collaborationFormats : talkData?.collaborationFormats_en) || defaultFormats;
  const timelineOptions = (isPt ? talkData?.timelineOptions : talkData?.timelineOptions_en) || defaultTimelines;

  const budgetsList = getLocalizedBudgetOptions(
    talkData?.budgetOptions,
    language
  );

  const scrollToForm = () => {
    document.getElementById('talk-form-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-[#10110F] text-[#FAFAF7] select-none min-h-screen">
      {/* ============================================================ */}
      {/* 1. HERO COMPACTA (Respeitando Safe Area do Header)           */}
      {/* ============================================================ */}
      <section
        style={{ paddingTop: `calc(${safeOffset || 72}px + 2rem)` }}
        className="w-full pb-16 lg:pb-24 border-b border-[rgba(244,243,238,0.12)] bg-[#10110F]"
      >
        <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#C4FF00]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#C4FF00]">
                {t('contact:hero_eyebrow', 'NEW PROJECTS / CONSULTING')}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-[2.25rem] sm:text-[3.25rem] md:text-[4rem] font-normal leading-[1.08] tracking-tight text-[#FAFAF7] mb-6">
              {t(
                'contact:hero_title',
                "Have an idea, a complex product, or a digital presence to elevate? Let's talk."
              )}
            </h1>

            {/* Description */}
            <p className="font-sans text-base sm:text-lg lg:text-xl text-[#F4F3EE]/80 leading-relaxed max-w-3xl mb-8">
              {t(
                'contact:hero_text',
                "Tell me what you need to build, organize, or evolve. I'll reply with context, next steps, and honest guidance on what truly makes sense."
              )}
            </p>

            {/* Scroll Indicator Button */}
            <button
              type="button"
              onClick={scrollToForm}
              className="group inline-flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-widest text-[#F4F3EE]/70 hover:text-[#C4FF00] transition-colors cursor-pointer"
            >
              <RollingText text={isPt ? 'ESTRUTURAR PROJETO' : 'STRUCTURE YOUR PROJECT'} />
              <ArrowDown size={14} className="transition-transform group-hover:translate-y-1 text-[#C4FF00]" />
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. FAIXA DE HORÁRIO GLOBAL (Fortaleza, CE • GMT-3)          */}
      {/* ============================================================ */}
      <div className="w-full bg-[#151613] border-b border-[rgba(244,243,238,0.1)] py-3 px-6 sm:px-10 lg:px-16">
        <div className="w-full max-w-[1560px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left font-mono text-xs text-[#F4F3EE]/60">
          <div className="flex items-center justify-center sm:justify-start gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#C4FF00] animate-pulse" />
            <span className="text-[#FAFAF7] font-semibold tracking-wider">
              FORTALEZA, CE • {fortalezaTime || '18:00:00'} (GMT-3)
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-widest text-white/40">
            <span>{isPt ? 'REMOTO & GLOBAL' : 'REMOTE & WORLDWIDE'}</span>
            <span>·</span>
            <span>PT / EN / ES</span>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. SEÇÃO PRINCIPAL OFF-WHITE (Grid de 12 Colunas)            */}
      {/* ============================================================ */}
      <section id="talk-form-section" className="w-full bg-[#FAFAF7] text-[#10110F] py-20 lg:py-28">
        <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* ============================================================ */}
            {/* LADO ESQUERDO: Painel de Disponibilidade e Contato (5 Cols)   */}
            {/* ============================================================ */}
            <aside className="lg:col-span-5 flex flex-col gap-4 sm:gap-5 lg:sticky lg:top-[calc(var(--header-safe-offset)+1rem)]">

              <div className="border border-[#10110F]/12 bg-white p-5 sm:p-6 rounded-[16px] shadow-sm flex flex-col gap-4">

                {talkData?.profileImageUrl && (
                  <div className="w-full aspect-[16/8] max-h-[165px] rounded-[10px] overflow-hidden border border-[#10110F]/10 bg-[#10110F]/5">
                    <img
                      src={talkData.profileImageUrl}
                      alt={talkData.profileImageAlt || 'David Salviano | Product Designer'}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10110F] relative flex items-center justify-center shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#C4FF00] absolute animate-ping opacity-75" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#C4FF00]" />
                    </span>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#10110F]">
                      {t('contact:status_accepting', 'Accepting new projects')}
                    </span>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-[#10110F]/70 leading-relaxed">
                    {t(
                      'contact:status_subtitle',
                      'Freelance projects, consulting, and collaboration with product squads.'
                    )}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#10110F]/10 flex items-center gap-2 text-xs text-[#10110F]/65 font-mono">
                  <Clock size={14} className="text-[#4056F4] shrink-0" />
                  <span>{t('contact:response_time_value', 'I usually reply within 24–48 business hours.')}</span>
                </div>
              </div>

              <div className="border border-[#10110F]/12 bg-white p-4 sm:p-5 rounded-[16px] shadow-sm flex flex-col gap-3">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#10110F]/45">
                  {t('contact:direct_channels_title', 'DIRECT CHANNELS')}
                </span>

                <div className="flex items-center justify-between p-3 rounded-[10px] bg-[#FAFAF7] border border-[#10110F]/10 hover:border-[#10110F]/30 transition-colors">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <Mail size={15} className="text-[#10110F]/60 shrink-0" />
                    <div className="flex flex-col overflow-hidden">
                      <span className="font-mono text-[9px] uppercase text-[#10110F]/45">Email</span>
                      <span className="font-sans text-xs sm:text-[13px] font-semibold text-[#10110F] truncate">
                        {talkData?.email || 'davidsalviano52@gmail.com'}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-[6px] hover:bg-[#10110F]/10 text-[#10110F] transition-colors shrink-0 ml-2 focus-visible:outline-2 focus-visible:outline-[#4056F4] cursor-pointer"
                    aria-label="Copy contact email"
                    title={copiedEmail ? (isPt ? 'Email copiado!' : 'Email copied!') : (isPt ? 'Copiar email' : 'Copy email')}
                  >
                    {copiedEmail ? <Check size={15} className="text-green-600" /> : <Copy size={15} />}
                  </button>
                </div>
                {copiedEmail && (
                  <span className="font-mono text-[11px] text-green-700 font-bold -mt-1 px-1 block animate-fadeIn">
                    ✓ {isPt ? 'Email copiado para a área de transferência!' : 'Email copied to clipboard!'}
                  </span>
                )}

                {talkData?.linkedIn && (
                  <a
                    href={talkData.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-3 rounded-[10px] bg-[#FAFAF7] border border-[#10110F]/10 hover:border-[#10110F]/30 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <LinkedInIcon size={15} className="text-[#10110F]/60" />
                      <div className="flex flex-col">
                        <span className="font-mono text-[9px] uppercase text-[#10110F]/45">LinkedIn</span>
                        <span className="font-sans text-xs sm:text-[13px] font-semibold text-[#10110F]">
                          David Salviano
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight size={15} className="text-[#10110F]/40 group-hover:text-[#10110F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                )}

                {talkData?.whatsapp && (
                  <a
                    href={`https://wa.me/${talkData.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-3 rounded-[10px] bg-[#FAFAF7] border border-[#10110F]/10 hover:border-[#10110F]/30 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <MessageCircle size={15} className="text-[#10110F]/60" />
                      <div className="flex flex-col">
                        <span className="font-mono text-[9px] uppercase text-[#10110F]/45">WhatsApp</span>
                        <span className="font-sans text-xs sm:text-[13px] font-semibold text-[#10110F]">
                          {talkData.whatsapp}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight size={15} className="text-[#10110F]/40 group-hover:text-[#10110F] transition-transform" />
                  </a>
                )}

                {talkData?.instagram && (
                  <a
                    href={`https://instagram.com/${talkData.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-3 rounded-[10px] bg-[#FAFAF7] border border-[#10110F]/10 hover:border-[#10110F]/30 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <InstagramIcon size={15} className="text-[#10110F]/60" />
                      <div className="flex flex-col">
                        <span className="font-mono text-[9px] uppercase text-[#10110F]/45">Instagram</span>
                        <span className="font-sans text-xs sm:text-[13px] font-semibold text-[#10110F]">
                          {talkData.instagram}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight size={15} className="text-[#10110F]/40 group-hover:text-[#10110F] transition-transform" />
                  </a>
                )}
              </div>
            </aside>

            {/* ============================================================ */}
            {/* LADO DIREITO: Conversa Estruturada (7 Cols)                  */}
            {/* ============================================================ */}
            <main className="lg:col-span-7 flex flex-col gap-10">
              <form onSubmit={handleSubmit} className="flex flex-col gap-10">

                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleInputChange}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden opacity-0 pointer-events-none absolute"
                />

                {/* 1. SERVIÇOS */}
                <fieldset className="flex flex-col gap-3.5 border-b border-[#10110F]/10 pb-8">
                  <legend className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#10110F] mb-1">
                    {t('contact:form_step_services', '1. What do you need help with?')}
                  </legend>

                  <div className="flex flex-wrap gap-2.5">
                    {servicesOptions.map((service) => {
                      const isSelected = selectedServices.includes(service);
                      return (
                        <label
                          key={service}
                          className={`
                            group inline-flex items-center gap-2 px-4 py-2.5 rounded-[12px] font-sans text-xs sm:text-sm font-semibold
                            transition-all duration-200 cursor-pointer select-none border focus-within:ring-2 focus-within:ring-[#4056F4]
                            ${isSelected
                              ? 'bg-[#10110F] text-[#FAFAF7] border-[#10110F] shadow-sm'
                              : 'bg-white text-[#10110F]/80 border-[#10110F]/15 hover:border-[#10110F]/40 hover:text-[#10110F]'
                            }
                          `}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleServiceToggle(service)}
                            className="sr-only"
                          />
                          <span
                            className={`w-2 h-2 rounded-full transition-colors ${isSelected ? 'bg-[#C4FF00]' : 'bg-[#10110F]/20 group-hover:bg-[#10110F]/40'
                              }`}
                          />
                          <span>{service}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                {/* 2. FORMATO */}
                <fieldset className="flex flex-col gap-3.5 border-b border-[#10110F]/10 pb-8">
                  <legend className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#10110F] mb-1">
                    {t('contact:form_step_format', '2. Preferred collaboration format?')}
                  </legend>

                  <div className="flex flex-wrap gap-2.5">
                    {formatOptions.map((format) => {
                      const isSelected = selectedFormat === format;
                      return (
                        <label
                          key={format}
                          className={`
                            group inline-flex items-center gap-2 px-4 py-2.5 rounded-[12px] font-sans text-xs sm:text-sm font-semibold
                            transition-all duration-200 cursor-pointer select-none border focus-within:ring-2 focus-within:ring-[#4056F4]
                            ${isSelected
                              ? 'bg-[#10110F] text-[#FAFAF7] border-[#10110F] shadow-sm'
                              : 'bg-white text-[#10110F]/80 border-[#10110F]/15 hover:border-[#10110F]/40 hover:text-[#10110F]'
                            }
                          `}
                        >
                          <input
                            type="radio"
                            name="collaborationFormat"
                            value={format}
                            checked={isSelected}
                            onChange={() => setSelectedFormat(format)}
                            className="sr-only"
                          />
                          <span
                            className={`w-2 h-2 rounded-full transition-colors ${isSelected ? 'bg-[#C4FF00]' : 'bg-[#10110F]/20 group-hover:bg-[#10110F]/40'
                              }`}
                          />
                          <span>{format}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                {/* 3. TIMELINE */}
                <fieldset className="flex flex-col gap-3.5 border-b border-[#10110F]/10 pb-8">
                  <legend className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#10110F] mb-1">
                    {t('contact:form_step_timeline', "3. What's your target timeline?")}
                  </legend>

                  <div className="flex flex-wrap gap-2.5">
                    {timelineOptions.map((timeline) => {
                      const isSelected = selectedTimeline === timeline;
                      return (
                        <label
                          key={timeline}
                          className={`
                            group inline-flex items-center gap-2 px-4 py-2.5 rounded-[12px] font-sans text-xs sm:text-sm font-semibold
                            transition-all duration-200 cursor-pointer select-none border focus-within:ring-2 focus-within:ring-[#4056F4]
                            ${isSelected
                              ? 'bg-[#10110F] text-[#FAFAF7] border-[#10110F] shadow-sm'
                              : 'bg-white text-[#10110F]/80 border-[#10110F]/15 hover:border-[#10110F]/40 hover:text-[#10110F]'
                            }
                          `}
                        >
                          <input
                            type="radio"
                            name="timelineOption"
                            value={timeline}
                            checked={isSelected}
                            onChange={() => setSelectedTimeline(timeline)}
                            className="sr-only"
                          />
                          <span
                            className={`w-2 h-2 rounded-full transition-colors ${isSelected ? 'bg-[#C4FF00]' : 'bg-[#10110F]/20 group-hover:bg-[#10110F]/40'
                              }`}
                          />
                          <span>{timeline}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                {/* 4. INVESTIMENTO */}
                <fieldset className="flex flex-col gap-3.5 border-b border-[#10110F]/10 pb-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-1">
                    <legend className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#10110F]">
                      {t('contact:form_step_budget', '4. Estimated investment range?')}
                    </legend>

                    <div className="flex items-center gap-1.5 self-start sm:self-auto px-2.5 py-1 bg-[#10110F]/5 rounded-[8px] border border-[#10110F]/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10110F]" />
                      <span className="font-mono text-[11px] font-bold tracking-wider text-[#10110F]">
                        {currency} ({currencySymbol})
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {budgetsList.map((budget) => {
                      const isSelected = selectedBudget === budget;
                      return (
                        <label
                          key={budget}
                          className={`
                            group inline-flex items-center gap-2 px-4 py-2.5 rounded-[12px] font-sans text-xs sm:text-sm font-semibold
                            transition-all duration-200 cursor-pointer select-none border focus-within:ring-2 focus-within:ring-[#4056F4]
                            ${isSelected
                              ? 'bg-[#10110F] text-[#FAFAF7] border-[#10110F] shadow-sm'
                              : 'bg-white text-[#10110F]/80 border-[#10110F]/15 hover:border-[#10110F]/40 hover:text-[#10110F]'
                            }
                          `}
                        >
                          <input
                            type="radio"
                            name="budgetRange"
                            value={budget}
                            checked={isSelected}
                            onChange={() => setSelectedBudget(budget)}
                            className="sr-only"
                          />
                          <span
                            className={`w-2 h-2 rounded-full transition-colors ${isSelected ? 'bg-[#C4FF00]' : 'bg-[#10110F]/20 group-hover:bg-[#10110F]/40'
                              }`}
                          />
                          <span>{budget}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                {/* 5. DETALHES */}
                <div className="flex flex-col gap-6">
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#10110F]">
                    {t('contact:form_step_details', '5. Tell me about your project')}
                  </span>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="description" className="font-mono text-[11px] font-bold uppercase text-[#10110F]/70">
                      {t('contact:field_message_label', 'Project Overview & Goals')} *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      required
                      rows={4}
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder={t(
                        'contact:field_message_placeholder',
                        'Tell me about the problem, current state, and what success looks like...'
                      )}
                      className="w-full p-4 rounded-[14px] border border-[#10110F]/15 bg-white text-[#10110F] font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#4056F4] focus:border-transparent transition-all resize-y"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="font-mono text-[11px] font-bold uppercase text-[#10110F]/70">
                        {t('contact:field_name_label', 'Your Name')} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t('contact:field_name_placeholder', 'Jane Doe')}
                        className="w-full h-12 px-4 rounded-[14px] border border-[#10110F]/15 bg-white text-[#10110F] font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#4056F4] transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="font-mono text-[11px] font-bold uppercase text-[#10110F]/70">
                        {t('contact:field_email_label', 'Email Address')} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t('contact:field_email_placeholder', 'jane@company.com')}
                        className="w-full h-12 px-4 rounded-[14px] border border-[#10110F]/15 bg-white text-[#10110F] font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#4056F4] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="company" className="font-mono text-[11px] font-bold uppercase text-[#10110F]/70">
                        {t('contact:field_company_label', 'Company / Organization (Optional)')}
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder={t('contact:field_company_placeholder', 'Acme Inc.')}
                        className="w-full h-12 px-4 rounded-[14px] border border-[#10110F]/15 bg-white text-[#10110F] font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#4056F4] transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="deadline" className="font-mono text-[11px] font-bold uppercase text-[#10110F]/70">
                        {isPt ? 'Prazo Desejado (Opcional)' : 'Target Deadline (Optional)'}
                      </label>
                      <input
                        type="text"
                        id="deadline"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleInputChange}
                        placeholder={isPt ? 'ex: Fim do trimestre, 6 semanas' : 'e.g. End of Q2, 6 weeks'}
                        className="w-full h-12 px-4 rounded-[14px] border border-[#10110F]/15 bg-white text-[#10110F] font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#4056F4] transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="referenceLink" className="font-mono text-[11px] font-bold uppercase text-[#10110F]/70">
                      {isPt ? 'Link de Referência ou Site Atual (Opcional)' : 'Reference Link or Website (Optional)'}
                    </label>
                    <input
                      type="url"
                      id="referenceLink"
                      name="referenceLink"
                      value={formData.referenceLink}
                      onChange={handleInputChange}
                      placeholder="https://..."
                      className="w-full h-12 px-4 rounded-[14px] border border-[#10110F]/15 bg-white text-[#10110F] font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#4056F4] transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="font-mono text-[11px] font-bold uppercase text-[#10110F]/70">
                      {t('contact:field_attachment_label', 'Briefing / Attachments (Optional)')}
                    </span>
                    <label className="flex items-center gap-3 p-4 rounded-[14px] border border-dashed border-[#10110F]/25 bg-white hover:bg-[#FAFAF7] hover:border-[#10110F]/50 transition-colors cursor-pointer">
                      <Upload size={18} className="text-[#10110F]/60" />
                      <span className="font-sans text-xs text-[#10110F]/75">
                        {attachmentName || t('contact:field_attachment_hint', 'PDF, Figma link or image up to 10MB')}
                      </span>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.png,.jpg,.jpeg,.zip,.fig"
                        className="sr-only"
                      />
                    </label>
                    {attachmentError && (
                      <span className="font-mono text-xs text-red-600 font-bold">{attachmentError}</span>
                    )}
                  </div>
                </div>

                {/* STATUS */}
                <div aria-live="polite" className="w-full">
                  {submissionState.status === 'error' && (
                    <div className="p-4 rounded-[14px] bg-red-50 border border-red-200 flex items-start gap-3 text-red-800 text-xs sm:text-sm font-sans">
                      <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
                      <span>{submissionState.message}</span>
                    </div>
                  )}

                  {submissionState.status === 'success' && (
                    <div className="p-6 rounded-[16px] bg-emerald-50 border border-emerald-200 flex flex-col gap-3 text-emerald-900 font-sans">
                      <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
                        <Check size={20} className="text-emerald-700" />
                        <span>{t('contact:confirmation_title', 'Message received successfully')}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-emerald-800/90 leading-relaxed">
                        {submissionState.message}
                      </p>
                    </div>
                  )}
                </div>

                {/* SUBMIT BUTTON */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-[#10110F]/10">
                  <div className="flex items-center gap-2.5 text-xs text-[#10110F]/65 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10110F]/40" />
                    <span>{t('contact:response_time_value', 'I usually reply within 24–48 business hours.')}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={submissionState.status === 'submitting'}
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 font-mono text-xs sm:text-sm font-bold tracking-widest uppercase text-[#10110F] bg-[#C4FF00] hover:bg-[#d8ff1a] active:scale-[0.98] transition-all rounded-[16px] shadow-md focus-visible:outline-2 focus-visible:outline-[#10110F] cursor-pointer disabled:opacity-50"
                  >
                    <span>
                      {submissionState.status === 'submitting'
                        ? t('contact:submit_sending', 'SENDING...')
                        : t('contact:submit_button', 'SUBMIT PROJECT ↗')}
                    </span>
                    <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>

              </form>
            </main>

          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
