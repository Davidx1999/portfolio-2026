import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
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
  MapPin,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useLetsTalk } from '../hooks/useLetsTalk';
import { useHeaderMetrics } from '../hooks/useHeaderMetrics';
import {
  resolveInitialCurrency,
  getSavedCurrency,
  setSavedCurrency,
  getUrlCurrency,
  detectCountryByIp,
  getLocalizedBudgetOptions,
} from '../services/currencyLocalization';

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

const EASING = [0.22, 1, 0.36, 1];

export function Contact() {
  const { language, t } = useLanguage();
  const { talkData } = useLetsTalk();
  const { safeOffset } = useHeaderMetrics();
  const prefersReducedMotion = useReducedMotion();

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
      } catch (err) {
        // Fallback
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
    const emailToCopy = talkData.email || 'davidsalviano52@gmail.com';
    navigator.clipboard.writeText(emailToCopy).then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2400);
    });
  };

  // 3. Currency Localization & Market Selection
  const [currencyInfo, setCurrencyInfo] = useState(() => resolveInitialCurrency(language));
  const [detectedCountry, setDetectedCountry] = useState(null);

  // Sync currency with language change ONLY IF user hasn't set manual choice or URL param
  useEffect(() => {
    const saved = getSavedCurrency();
    const urlCurr = getUrlCurrency();
    if (!saved && !urlCurr) {
      setCurrencyInfo(resolveInitialCurrency(language));
    }
  }, [language]);

  // Non-blocking, safe IP country check on mount
  useEffect(() => {
    let isMounted = true;
    const saved = getSavedCurrency();
    const urlCurr = getUrlCurrency();

    detectCountryByIp().then((countryCode) => {
      if (!isMounted || !countryCode) return;
      setDetectedCountry(countryCode);

      // Only suggest currency if no manual or URL choice was provided
      if (!saved && !urlCurr) {
        if (countryCode === 'BR') {
          setCurrencyInfo({ currency: 'BRL', market: 'BR', source: 'ip' });
        } else {
          setCurrencyInfo({ currency: 'USD', market: 'INTL', source: 'ip' });
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCurrencyChange = (newCurrency) => {
    if (newCurrency === currencyInfo.currency) return;
    setSavedCurrency(newCurrency);
    setCurrencyInfo({
      currency: newCurrency,
      market: newCurrency === 'BRL' ? 'BR' : 'INTL',
      source: 'manual',
    });
    // Reset selected budget to avoid carrying mismatched market string
    setSelectedBudget('');
  };

  // 4. Form State & Selections
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState('');
  const [selectedTimeline, setSelectedTimeline] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');

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
    status: 'idle', // 'idle' | 'submitting' | 'success' | 'error'
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
        language === 'en' ? 'File exceeds maximum limit of 5MB.' : 'O arquivo excede o limite máximo de 5MB.'
      );
      setAttachmentName('');
      e.target.value = '';
      return;
    }
    setAttachmentName(file.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot validation against spam bots
    if (formData.honeypot) {
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.description.trim()) {
      setSubmissionState({
        status: 'error',
        message:
          language === 'en'
            ? 'Please fill in the required fields (Name, Email, and Project Description).'
            : 'Por favor, preencha os campos obrigatórios (Nome, Email e Descrição do Projeto).',
      });
      return;
    }

    setSubmissionState({ status: 'submitting', message: '' });

    // Format structured summary
    const servicesList = selectedServices.length > 0 ? selectedServices.join(', ') : 'Não especificado';
    const formatValue = selectedFormat || 'Não especificado';
    const timelineValue = selectedTimeline || 'Não especificado';
    const budgetValue = selectedBudget || 'Não especificado';

    const emailSubject = encodeURIComponent(
      `Novo Projeto // ${formData.name} ${formData.company ? `(${formData.company})` : ''}`
    );

    const emailBody = encodeURIComponent(
`Olá David,

Gostaria de conversar sobre um projeto. Aqui estão os detalhes:

--------------------------------------------------
1. SERVIÇOS DE INTERESSE:
${servicesList}

2. FORMATO PREFERIDO:
${formatValue}

3. PREVISÃO DE INÍCIO:
${timelineValue}

4. FAIXA DE INVESTIMENTO ESTIMADA:
${budgetValue} (Moeda: ${currencyInfo.currency} | Mercado: ${currencyInfo.market})
${currencyInfo.source ? `- Origem da definição de moeda: ${currencyInfo.source}${detectedCountry ? ` (País sugerido: ${detectedCountry})` : ''}` : ''}
--------------------------------------------------

DESCRIÇÃO DO PROJETO / DESAFIO:
${formData.description}

INFORMAÇÕES DE CONTATO:
- Nome: ${formData.name}
- Email: ${formData.email}
- Empresa: ${formData.company || 'N/A'}
- Prazo desejado: ${formData.deadline || 'N/A'}
- Link de referência: ${formData.referenceLink || 'N/A'}
${attachmentName ? `- Anexo informado: ${attachmentName}` : ''}

--------------------------------------------------
Enviado através do portfólio oficial (davidsalviano.com)
`
    );

    // If an external endpoint is configured via VITE_CONTACT_FORM_ENDPOINT, POST JSON to it.
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
            selectedMarket: currencyInfo.market,
            selectedCurrency: currencyInfo.currency,
            detectedCountry: detectedCountry || undefined,
            detectionSource: currencyInfo.source,
            attachmentName,
          }),
        });

        if (response.ok) {
          setSubmissionState({
            status: 'success',
            message:
              language === 'en'
                ? talkData.confirmationMessage_en || 'Message received successfully. I’ll be in touch shortly.'
                : talkData.confirmationMessage || 'Mensagem recebida com sucesso. Entrarei em contato em breve.',
          });
          return;
        }
      } catch (err) {
        console.warn('Endpoint submission failed, using direct email fallback:', err);
      }
    }

    // Direct mailto fallback with immediate user guidance
    const mailtoUrl = `mailto:${talkData.email || 'davidsalviano52@gmail.com'}?subject=${emailSubject}&body=${emailBody}`;
    window.location.href = mailtoUrl;

    setTimeout(() => {
      setSubmissionState({
        status: 'success',
        message:
          language === 'en'
            ? 'Your project brief was formatted and opened in your email client. If it did not open automatically, you can also copy my direct email below.'
            : 'Seu briefing foi estruturado e aberto no seu aplicativo de email. Caso não tenha aberto automaticamente, você também pode copiar meu email direto ao lado.',
      });
    }, 600);
  };

  // Content Selection based on language & currency
  const heroEyebrow = language === 'en' ? talkData.heroEyebrow_en : talkData.heroEyebrow;
  const heroTitle = language === 'en' ? talkData.heroTitle_en : talkData.heroTitle;
  const heroDescription = language === 'en' ? talkData.heroDescription_en : talkData.heroDescription;
  const availabilityText = language === 'en' ? talkData.availabilityText_en : talkData.availabilityText;
  const availabilitySubtext = language === 'en' ? talkData.availabilitySubtext_en : talkData.availabilitySubtext;
  const responseTime = language === 'en' ? talkData.responseTime_en : talkData.responseTime;
  const ctaText = language === 'en' ? talkData.ctaText_en : talkData.ctaText;

  const servicesList = language === 'en' ? talkData.servicesOptions_en : talkData.servicesOptions;
  const formatsList = language === 'en' ? talkData.collaborationFormats_en : talkData.collaborationFormats;
  const timelinesList = language === 'en' ? talkData.timelineOptions_en : talkData.timelineOptions;
  
  // Dynamic Budget options resolved by active currency & language (from Sanity budgetOptions or fallback)
  const budgetsList = getLocalizedBudgetOptions(
    talkData.budgetOptions,
    currencyInfo.currency,
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
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#C4FF00]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#C4FF00]">
                {heroEyebrow || 'NOVOS PROJETOS / CONSULTORIA'}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-[2.25rem] sm:text-[3.25rem] md:text-[4rem] font-normal leading-[1.08] tracking-tight text-[#FAFAF7] mb-6">
              {heroTitle}
            </h1>

            {/* Description */}
            <p className="font-sans text-base sm:text-lg lg:text-xl text-[#F4F3EE]/80 leading-relaxed max-w-3xl mb-8">
              {heroDescription}
            </p>

            {/* Scroll Indicator Button */}
            <button
              type="button"
              onClick={scrollToForm}
              className="group inline-flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-widest text-[#F4F3EE]/70 hover:text-[#C4FF00] transition-colors cursor-pointer"
            >
              <span>{language === 'en' ? 'STRUCTURE YOUR PROJECT' : 'ESTRUTURAR PROJETO'}</span>
              <ArrowDown size={14} className="transition-transform group-hover:translate-y-1 text-[#C4FF00]" />
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. FAIXA DE HORÁRIO GLOBAL (Fortaleza, CE • GMT-3)          */}
      {/* ============================================================ */}
      <div className="w-full bg-[#151613] border-b border-[rgba(244,243,238,0.1)] py-3 px-6 sm:px-10 lg:px-16">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-xs text-[#F4F3EE]/60">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#C4FF00] animate-pulse" />
            <span className="text-[#FAFAF7] font-semibold tracking-wider">
              FORTALEZA, CE • {fortalezaTime || '18:00:00'} (GMT-3)
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] uppercase tracking-widest text-white/40">
            <span>{language === 'en' ? 'REMOTE & WORLDWIDE' : 'REMOTO & GLOBAL'}</span>
            <span>·</span>
            <span>{language === 'en' ? 'ENGLISH & PORTUGUESE' : 'PORTUGUÊS & INGLÊS'}</span>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. SEÇÃO PRINCIPAL OFF-WHITE (Grid de 12 Colunas)            */}
      {/* ============================================================ */}
      <section id="talk-form-section" className="w-full bg-[#FAFAF7] text-[#10110F] py-20 lg:py-28">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* ============================================================ */}
            {/* LADO ESQUERDO: Painel de Disponibilidade e Contato (5 Cols)   */}
            {/* ============================================================ */}
            <aside className="lg:col-span-5 flex flex-col gap-8 lg:sticky lg:top-[calc(var(--header-safe-offset)+1rem)]">
              
              {/* Card de Perfil e Disponibilidade */}
              <div className="border border-[#10110F]/15 bg-white p-6 sm:p-8 rounded-[20px] shadow-sm flex flex-col gap-6">
                
                {/* Imagem de Apoio (Sem filtros artificiais) */}
                {talkData.profileImageUrl && (
                  <div className="w-full aspect-[4/3] rounded-[14px] overflow-hidden border border-[#10110F]/10 bg-[#10110F]/5">
                    <img
                      src={talkData.profileImageUrl}
                      alt={talkData.profileImageAlt || 'David Salviano — Product Designer'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Status de Disponibilidade */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10110F] relative flex items-center justify-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#C4FF00] absolute animate-ping opacity-75" />
                      <span className="w-2 rounded-full bg-[#C4FF00]" />
                    </span>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#10110F]">
                      {availabilityText}
                    </span>
                  </div>
                  <p className="font-sans text-sm text-[#10110F]/70 leading-relaxed">
                    {availabilitySubtext}
                  </p>
                </div>

                {/* Prazo Médio de Resposta */}
                <div className="pt-4 border-t border-[#10110F]/10 flex items-start gap-3 text-xs text-[#10110F]/65 font-mono">
                  <Clock size={15} className="text-[#4056F4] shrink-0 mt-0.5" />
                  <span>{responseTime}</span>
                </div>
              </div>

              {/* Contatos Diretos com Interações Úteis */}
              <div className="border border-[#10110F]/15 bg-white p-6 rounded-[20px] shadow-sm flex flex-col gap-4">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#10110F]/45">
                  {language === 'en' ? 'DIRECT CHANNELS' : 'CANAIS DIRETOS'}
                </span>

                {/* Email com Ação de Copiar */}
                <div className="flex items-center justify-between p-3.5 rounded-[12px] bg-[#FAFAF7] border border-[#10110F]/10 hover:border-[#10110F]/30 transition-colors">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <Mail size={16} className="text-[#10110F]/60 shrink-0" />
                    <div className="flex flex-col overflow-hidden">
                      <span className="font-mono text-[10px] uppercase text-[#10110F]/45">Email</span>
                      <span className="font-sans text-xs sm:text-sm font-semibold text-[#10110F] truncate">
                        {talkData.email}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-2 rounded-[8px] hover:bg-[#10110F]/10 text-[#10110F] transition-colors shrink-0 ml-2 focus-visible:outline-2 focus-visible:outline-[#4056F4] cursor-pointer"
                    aria-label="Copiar email de contato"
                    title={copiedEmail ? 'Email copiado!' : 'Copiar email'}
                  >
                    {copiedEmail ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                  </button>
                </div>
                {copiedEmail && (
                  <span className="font-mono text-[11px] text-green-700 font-bold -mt-2 px-1 block animate-fadeIn">
                    ✓ {language === 'en' ? 'Email copied to clipboard!' : 'Email copiado para a área de transferência!'}
                  </span>
                )}

                {/* LinkedIn */}
                {talkData.linkedIn && (
                  <a
                    href={talkData.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-3.5 rounded-[12px] bg-[#FAFAF7] border border-[#10110F]/10 hover:border-[#10110F]/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <LinkedInIcon size={16} className="text-[#10110F]/60" />
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] uppercase text-[#10110F]/45">LinkedIn</span>
                        <span className="font-sans text-xs sm:text-sm font-semibold text-[#10110F]">
                          David Salviano
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight size={16} className="text-[#10110F]/40 group-hover:text-[#10110F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                )}

                {/* WhatsApp (Opcional) */}
                {talkData.whatsapp && (
                  <a
                    href={`https://wa.me/${talkData.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-3.5 rounded-[12px] bg-[#FAFAF7] border border-[#10110F]/10 hover:border-[#10110F]/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <MessageCircle size={16} className="text-[#10110F]/60" />
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] uppercase text-[#10110F]/45">WhatsApp</span>
                        <span className="font-sans text-xs sm:text-sm font-semibold text-[#10110F]">
                          {talkData.whatsapp}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight size={16} className="text-[#10110F]/40 group-hover:text-[#10110F] transition-transform" />
                  </a>
                )}

                {/* Instagram (Secundário) */}
                {talkData.instagram && (
                  <a
                    href={`https://instagram.com/${talkData.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-3.5 rounded-[12px] bg-[#FAFAF7] border border-[#10110F]/10 hover:border-[#10110F]/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <InstagramIcon size={16} className="text-[#10110F]/60" />
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] uppercase text-[#10110F]/45">Instagram</span>
                        <span className="font-sans text-xs sm:text-sm font-semibold text-[#10110F]">
                          {talkData.instagram}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight size={16} className="text-[#10110F]/40 group-hover:text-[#10110F] transition-transform" />
                  </a>
                )}
              </div>
            </aside>

            {/* ============================================================ */}
            {/* LADO DIREITO: Conversa Estruturada (7 Cols)                  */}
            {/* ============================================================ */}
            <main className="lg:col-span-7 flex flex-col gap-10">
              <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                
                {/* Honeypot invisível para proteção contra bots */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleInputChange}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden opacity-0 pointer-events-none absolute"
                />

                {/* ======================================================== */}
                {/* PERGUNTA 1: Serviços / Necessidades (Multi-select)       */}
                {/* ======================================================== */}
                <fieldset className="flex flex-col gap-3.5 border-b border-[#10110F]/10 pb-8">
                  <legend className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#10110F] mb-1">
                    01 // {language === 'en' ? 'What do you need help with?' : 'Com o que você precisa de ajuda?'}
                  </legend>
                  <p className="font-sans text-xs text-[#10110F]/60 -mt-2 mb-2">
                    {language === 'en' ? 'Select all that apply:' : 'Selecione uma ou mais opções:'}
                  </p>

                  <div className="flex flex-wrap gap-2.5">
                    {servicesList.map((service) => {
                      const isSelected = selectedServices.includes(service);
                      return (
                        <label
                          key={service}
                          className={`
                            group inline-flex items-center gap-2 px-4 py-2.5 rounded-[12px] font-sans text-xs sm:text-sm font-semibold
                            transition-all duration-200 cursor-pointer select-none border focus-within:ring-2 focus-within:ring-[#4056F4]
                            ${
                              isSelected
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
                            className={`w-2 h-2 rounded-full transition-colors ${
                              isSelected ? 'bg-[#C4FF00]' : 'bg-[#10110F]/20 group-hover:bg-[#10110F]/40'
                            }`}
                          />
                          <span>{service}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                {/* ======================================================== */}
                {/* PERGUNTA 2: Formato de Colaboração (Single Radio)        */}
                {/* ======================================================== */}
                <fieldset className="flex flex-col gap-3.5 border-b border-[#10110F]/10 pb-8">
                  <legend className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#10110F] mb-1">
                    02 // {language === 'en' ? 'Which format makes the most sense right now?' : 'Qual formato faz mais sentido agora?'}
                  </legend>

                  <div className="flex flex-wrap gap-2.5">
                    {formatsList.map((format) => {
                      const isSelected = selectedFormat === format;
                      return (
                        <label
                          key={format}
                          className={`
                            group inline-flex items-center gap-2 px-4 py-2.5 rounded-[12px] font-sans text-xs sm:text-sm font-semibold
                            transition-all duration-200 cursor-pointer select-none border focus-within:ring-2 focus-within:ring-[#4056F4]
                            ${
                              isSelected
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
                            className={`w-2 h-2 rounded-full transition-colors ${
                              isSelected ? 'bg-[#C4FF00]' : 'bg-[#10110F]/20 group-hover:bg-[#10110F]/40'
                            }`}
                          />
                          <span>{format}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                {/* ======================================================== */}
                {/* PERGUNTA 3: Previsão de Início (Single Radio)            */}
                {/* ======================================================== */}
                <fieldset className="flex flex-col gap-3.5 border-b border-[#10110F]/10 pb-8">
                  <legend className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#10110F] mb-1">
                    03 // {language === 'en' ? 'When are you looking to start?' : 'Quando pretende começar?'}
                  </legend>

                  <div className="flex flex-wrap gap-2.5">
                    {timelinesList.map((timeline) => {
                      const isSelected = selectedTimeline === timeline;
                      return (
                        <label
                          key={timeline}
                          className={`
                            group inline-flex items-center gap-2 px-4 py-2.5 rounded-[12px] font-sans text-xs sm:text-sm font-semibold
                            transition-all duration-200 cursor-pointer select-none border focus-within:ring-2 focus-within:ring-[#4056F4]
                            ${
                              isSelected
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
                            className={`w-2 h-2 rounded-full transition-colors ${
                              isSelected ? 'bg-[#C4FF00]' : 'bg-[#10110F]/20 group-hover:bg-[#10110F]/40'
                            }`}
                          />
                          <span>{timeline}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                {/* ======================================================== */}
                {/* PERGUNTA 4: Faixa de Investimento (Single Radio)         */}
                {/* ======================================================== */}
                <fieldset className="flex flex-col gap-3.5 border-b border-[#10110F]/10 pb-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-1">
                    <legend className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#10110F]">
                      04 // {language === 'en' ? 'Do you have an estimated budget range?' : 'Você já possui uma faixa de investimento?'}
                    </legend>

                    {/* Discreet Currency Switcher (BRL | USD) */}
                    <div className="flex items-center gap-1.5 self-start sm:self-auto bg-[#10110F]/5 p-1 rounded-lg border border-[#10110F]/10">
                      <button
                        type="button"
                        onClick={() => handleCurrencyChange('BRL')}
                        className={`px-2.5 py-1 rounded-[6px] font-mono text-[11px] font-bold tracking-wider transition-all cursor-pointer ${
                          currencyInfo.currency === 'BRL'
                            ? 'bg-[#10110F] text-[#FAFAF7] shadow-xs'
                            : 'text-[#10110F]/60 hover:text-[#10110F]'
                        }`}
                        aria-pressed={currencyInfo.currency === 'BRL'}
                      >
                        BRL (R$)
                      </button>
                      <span className="text-[#10110F]/20 text-xs">|</span>
                      <button
                        type="button"
                        onClick={() => handleCurrencyChange('USD')}
                        className={`px-2.5 py-1 rounded-[6px] font-mono text-[11px] font-bold tracking-wider transition-all cursor-pointer ${
                          currencyInfo.currency === 'USD'
                            ? 'bg-[#10110F] text-[#FAFAF7] shadow-xs'
                            : 'text-[#10110F]/60 hover:text-[#10110F]'
                        }`}
                        aria-pressed={currencyInfo.currency === 'USD'}
                      >
                        USD (US$)
                      </button>
                    </div>
                  </div>

                  {/* Subtle indication */}
                  <div className="flex items-center gap-2 -mt-1 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B6A9ED]" />
                    <span className="font-mono text-[11px] text-[#10110F]/60">
                      {language === 'en'
                        ? `Values displayed in ${currencyInfo.currency}`
                        : `Valores exibidos em ${currencyInfo.currency}`}
                    </span>
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
                            ${
                              isSelected
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
                            className={`w-2 h-2 rounded-full transition-colors ${
                              isSelected ? 'bg-[#C4FF00]' : 'bg-[#10110F]/20 group-hover:bg-[#10110F]/40'
                            }`}
                          />
                          <span>{budget}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                {/* ======================================================== */}
                {/* CAMPOS DETALHADOS DE PROJETO & CONTATO                   */}
                {/* ======================================================== */}
                <div className="flex flex-col gap-6">
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#10110F]">
                    05 // {language === 'en' ? 'Tell me about the project' : 'Conte sobre o projeto'}
                  </span>

                  {/* Descrição do Projeto */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="description" className="font-mono text-[11px] font-bold uppercase text-[#10110F]/70">
                      {language === 'en' ? 'Project Goals & Context *' : 'Objetivos do Projeto & Contexto *'}
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      required
                      rows={4}
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder={
                        language === 'en'
                          ? 'What are you aiming to build or solve? Share your current state and expectations...'
                          : 'O que você precisa construir ou resolver? Compartilhe o momento atual e os desafios...'
                      }
                      className="w-full p-4 rounded-[14px] border border-[#10110F]/15 bg-white text-[#10110F] font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#4056F4] focus:border-transparent transition-all resize-y"
                    />
                  </div>

                  {/* Nome e Email em 2 Colunas */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="font-mono text-[11px] font-bold uppercase text-[#10110F]/70">
                        {language === 'en' ? 'Your Name *' : 'Seu Nome *'}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={language === 'en' ? 'e.g. Alex Silva' : 'ex: Alex Silva'}
                        className="w-full h-12 px-4 rounded-[14px] border border-[#10110F]/15 bg-white text-[#10110F] font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#4056F4] transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="font-mono text-[11px] font-bold uppercase text-[#10110F]/70">
                        {language === 'en' ? 'Your Email *' : 'Seu Email *'}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={language === 'en' ? 'alex@company.com' : 'alex@empresa.com'}
                        className="w-full h-12 px-4 rounded-[14px] border border-[#10110F]/15 bg-white text-[#10110F] font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#4056F4] transition-all"
                      />
                    </div>
                  </div>

                  {/* Empresa e Prazo Desejado em 2 Colunas */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="company" className="font-mono text-[11px] font-bold uppercase text-[#10110F]/70">
                        {language === 'en' ? 'Company / Organization (Optional)' : 'Empresa / Organização (Opcional)'}
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder={language === 'en' ? 'Company name' : 'Nome da empresa'}
                        className="w-full h-12 px-4 rounded-[14px] border border-[#10110F]/15 bg-white text-[#10110F] font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#4056F4] transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="deadline" className="font-mono text-[11px] font-bold uppercase text-[#10110F]/70">
                        {language === 'en' ? 'Target Deadline (Optional)' : 'Prazo Desejado (Opcional)'}
                      </label>
                      <input
                        type="text"
                        id="deadline"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleInputChange}
                        placeholder={language === 'en' ? 'e.g. End of Q2, 6 weeks' : 'ex: Fim do trimestre, 6 semanas'}
                        className="w-full h-12 px-4 rounded-[14px] border border-[#10110F]/15 bg-white text-[#10110F] font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#4056F4] transition-all"
                      />
                    </div>
                  </div>

                  {/* Link de Referência */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="referenceLink" className="font-mono text-[11px] font-bold uppercase text-[#10110F]/70">
                      {language === 'en' ? 'Reference Link or Website (Optional)' : 'Link de Referência ou Site Atual (Opcional)'}
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

                  {/* Anexo Opcional */}
                  <div className="flex flex-col gap-2">
                    <span className="font-mono text-[11px] font-bold uppercase text-[#10110F]/70">
                      {language === 'en' ? 'Briefing Document or Attachment (Optional - Max 5MB)' : 'Documento de Briefing ou Anexo (Opcional - Máx 5MB)'}
                    </span>
                    <label className="flex items-center gap-3 p-4 rounded-[14px] border border-dashed border-[#10110F]/25 bg-white hover:bg-[#FAFAF7] hover:border-[#10110F]/50 transition-colors cursor-pointer">
                      <Upload size={18} className="text-[#10110F]/60" />
                      <span className="font-sans text-xs text-[#10110F]/75">
                        {attachmentName || (language === 'en' ? 'Upload PDF, image, or deck (Max 5MB)' : 'Selecionar PDF, imagem ou apresentação (Máx 5MB)')}
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

                {/* ======================================================== */}
                {/* MENSAGENS DE STATUS (Aria-live para Acessibilidade)      */}
                {/* ======================================================== */}
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
                        <span>{language === 'en' ? 'Briefing Structured Successfully!' : 'Briefing Estruturado com Sucesso!'}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-emerald-800/90 leading-relaxed">
                        {submissionState.message}
                      </p>
                    </div>
                  )}
                </div>

                {/* ======================================================== */}
                {/* BOTÃO DE SUBMISSÃO (CTA) & TEXTO AUXILIAR                */}
                {/* ======================================================== */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-[#10110F]/10">
                  <div className="flex items-center gap-2.5 text-xs text-[#10110F]/65 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10110F]/40" />
                    <span>{responseTime}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={submissionState.status === 'submitting'}
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 font-mono text-xs sm:text-sm font-bold tracking-widest uppercase text-[#10110F] bg-[#C4FF00] hover:bg-[#d8ff1a] active:scale-[0.98] transition-all rounded-[16px] shadow-md focus-visible:outline-2 focus-visible:outline-[#10110F] cursor-pointer disabled:opacity-50"
                  >
                    <span>
                      {submissionState.status === 'submitting'
                        ? language === 'en'
                          ? 'FORMATTING...'
                          : 'ESTRUTURANDO...'
                        : ctaText || 'ENVIAR PROJETO ↗'}
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
