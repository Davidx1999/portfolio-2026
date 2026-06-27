import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { LimeActionButton, RotatingStamp } from '../components/Buttons';
import { useLanguage } from '../context/LanguageContext';

export function Contact() {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budgetRange: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [fortalezaTime, setFortalezaTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'America/Fortaleza',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const locale = language === 'pt' ? 'pt-BR' : language === 'es' ? 'es-ES' : 'en-US';
      const formatter = new Intl.DateTimeFormat(locale, options);
      setFortalezaTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        projectType: '',
        budgetRange: '',
        message: ''
      });
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 15 } }
  };

  return (
    <div className="min-h-screen pt-[64px] md:pt-[78px] pb-16 bg-[var(--color-background)]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full flex flex-col"
      >
        {/* Timezone Indicator Banner - logo abaixo do header e antes de contact */}
        <div className="w-full bg-neutral-carvao text-background py-3 px-4 flex items-center justify-center select-none border-b border-neutral-carvao/10">
          <div className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.2em] font-semibold text-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-lime-500)] animate-pulse" />
            <span>Fortaleza, CE • {fortalezaTime || '00:00:00'} (GMT-3)</span>
          </div>
        </div>

        <div className="w-full border-b border-neutral-carvao/10 px-4 md:px-[calc(16%-24px)] py-6 md:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-x-12 lg:gap-x-16 items-stretch">

            {/* Row 1 Left: Page Title */}
            <motion.div variants={itemVariants} className="w-full pb-4 border-b border-neutral-carvao/10 flex flex-col justify-end">
              <div className="relative flex items-center justify-between">
                <img
                  src={`${import.meta.env.BASE_URL}assets/titles/contact.png`}
                  alt={t('contact_title_alt')}
                  className="w-full max-w-[240px] md:max-w-[300px] h-auto object-contain select-none"
                />
                {/* Rotating Stamp Button */}
                <div className="hidden sm:block transform scale-90 origin-right">
                  <RotatingStamp
                    as="div"
                    text={t('contact_available_stamp')}
                    icon={CheckCircle2}
                  />
                </div>
              </div>
            </motion.div>

            {/* Row 1 Right: CTA Text */}
            <motion.div variants={itemVariants} className="w-full pb-4 flex flex-col justify-end gap-4">
              <h2 className="text-title-h2 font-extrabold text-neutral-carvao uppercase tracking-tight leading-snug font-sans max-w-xl">
                {t('contact_h2_main')}{' '}
                <span className="text-purple-500">{t('contact_h2_meaningful')}</span>{' '}
                <span className="text-red-500">{t('contact_h2_together')}</span>
              </h2>
              <p className="text-body-lg text-neutral-carvao/75 w-full leading-relaxed font-sans">
                {t('contact_description')}
              </p>
            </motion.div>

            {/* Row 2 Left: Images, Timezone & Socials */}
            <motion.div variants={itemVariants} className="flex flex-col gap-6 lg:gap-0 lg:justify-between w-full pt-6 lg:h-full">
              {/* Images Row */}
              <div className="grid grid-cols-2 gap-0 w-full">
                {/* Halftone Hands Image */}
                <div className="bg-[#B3A0E6]/25 relative overflow-hidden aspect-square flex items-center justify-center border border-neutral-carvao/10 rounded-[1px] select-none">
                  <img
                    src={`${import.meta.env.BASE_URL}assets/profile/cases_hands.png`}
                    alt="Hands touching"
                    className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-multiply opacity-85"
                  />
                  <div
                    className="absolute inset-0 mix-blend-overlay opacity-35 pointer-events-none"
                    style={{
                      backgroundImage: `url(${import.meta.env.BASE_URL}assets/Textures/texture.png)`,
                      backgroundSize: 'cover'
                    }}
                  />
                </div>

                {/* Orange Available Block */}
                <div className="bg-[#E6A045] p-6 flex flex-col justify-between items-center text-center text-neutral-carvao relative overflow-hidden select-none aspect-square border border-neutral-carvao/10 rounded-[1px]">
                  <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none scale-150">
                    <svg className="w-full h-full text-neutral-carvao" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
                      <circle cx="50" cy="50" r="45" stroke="currentColor" />
                      <ellipse cx="50" cy="50" rx="30" ry="45" stroke="currentColor" />
                      <ellipse cx="50" cy="50" rx="15" ry="45" stroke="currentColor" />
                      <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" />
                      <line x1="10" y1="25" x2="90" y2="25" stroke="currentColor" />
                      <line x1="10" y1="75" x2="90" y2="75" stroke="currentColor" />
                    </svg>
                  </div>
                  <div className="relative z-10 w-8 h-8 rounded-full border border-neutral-carvao flex items-center justify-center bg-background/25">
                    <svg className="w-4 h-4 text-neutral-carvao" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" />
                      <ellipse cx="12" cy="12" rx="4" ry="10" stroke="currentColor" />
                      <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" />
                    </svg>
                  </div>
                  <div className="relative z-10 flex flex-col gap-0.5 items-center">
                    <span className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-neutral-carvao/60">{t('contact_status_tag')}</span>
                    <span className="font-sans font-extrabold text-[10px] md:text-xs uppercase tracking-wide text-neutral-carvao">
                      {t('contact_status_value')}
                    </span>
                  </div>
                  <div className="relative z-10 text-neutral-carvao/60">
                    <svg className="w-8 h-2" viewBox="0 0 24 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M1 3c2-1 4-2 6-1s4 2 6 1 4-2 6-1" stroke="currentColor" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Asterisk and Socials */}
              <div className="flex flex-col gap-4 border-t border-neutral-carvao/10 pt-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-carvao/45">
                    {t('contact_connect_tag')}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-end">
                  <div className="flex flex-col gap-2 w-full">
                    {[
                      {
                        label: "Email",
                        value: "davidsalviano52@gmail.com",
                        href: "mailto:davidsalviano52@gmail.com",
                        icon: (
                          <svg className="w-3.5 h-3.5 text-[#8b7ec8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        )
                      },
                      {
                        label: "LinkedIn",
                        value: "David Salviano",
                        href: "https://www.linkedin.com/in/david-salviano-12b41b264/",
                        icon: (
                          <svg className="w-3.5 h-3.5 text-[#8b7ec8] fill-current" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        )
                      },
                      {
                        label: "Instagram",
                        value: "@davidolix11",
                        href: "https://instagram.com/davidolix11",
                        icon: (
                          <svg className="w-3.5 h-3.5 text-[#8b7ec8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
                          </svg>
                        )
                      }
                    ].map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="flex items-center justify-between py-2.5 px-3 group hover:bg-lilac bg-background/25 border border-neutral-carvao/10 rounded-[1px] transition-colors duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-[1px] bg-lilac/15 flex items-center justify-center shadow-sm">
                            {link.icon}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-carvao/45">{link.label}:</span>
                            <span className="font-sans text-xs font-bold text-neutral-carvao">{link.value}</span>
                          </div>
                        </div>
                        <svg className="w-3.5 h-3.5 text-neutral-carvao/40 transform group-hover:translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    ))}
                  </div>

                  {/* Asterisk Container (96x96px to match the 3 links height perfectly) */}
                  <div className="w-24 h-24 border border-neutral-carvao/10 rounded-[1px] overflow-hidden bg-neutral-carvao/5 relative select-none hidden md:block">
                    <img
                      src={`${import.meta.env.BASE_URL}assets/apoio/asterisco.png`}
                      alt="Asterisk sketch"
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-0 mix-blend-overlay opacity-35 pointer-events-none"
                      style={{
                        backgroundImage: `url(${import.meta.env.BASE_URL}assets/Textures/texture.png)`,
                        backgroundSize: 'cover'
                      }}
                    />
                  </div>
                </div>
              </div>

            </motion.div>

            {/* Row 2 Right: Form Container */}
            <motion.div variants={itemVariants} className="w-full flex flex-col pt-0 -mt-[2px]">
              <form onSubmit={handleSubmit} className="border border-neutral-carvao/10 bg-background/40 p-6 md:p-8 rounded-[1px] flex flex-col gap-6 w-full relative">
                {/* Inputs */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-carvao/60">{t('contact_form_name_label', "Name")}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={t('contact_form_name_placeholder', "Your name")}
                    className="w-full h-12 px-4 rounded-[1px] border border-neutral-carvao/20 bg-background focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 font-sans text-sm text-neutral-carvao transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-carvao/60">{t('contact_form_email_label', "Email")}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder={t('contact_form_email_placeholder', "your.email@example.com")}
                    className="w-full h-12 px-4 rounded-[1px] border border-neutral-carvao/20 bg-background focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 font-sans text-sm text-neutral-carvao transition-all"
                  />
                </div>

                {/* Dropdowns row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="projectType" className="font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-carvao/60">{t('contact_form_type_label', "Project Type")}</label>
                    <div className="relative">
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        required
                        className="w-full h-12 px-4 pr-10 rounded-[1px] border border-neutral-carvao/20 bg-background focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 font-sans text-sm text-neutral-carvao transition-all appearance-none cursor-pointer"
                      >
                        <option value="">{t('contact_form_type_placeholder', "Select project type")}</option>
                        <option value="UI/UX Design">{t('contact_form_type_opt1', "UI/UX Design")}</option>
                        <option value="Web Development">{t('contact_form_type_opt2', "Web Design & Development")}</option>
                        <option value="Branding & Identity">{t('contact_form_type_opt3', "Branding & Identity")}</option>
                        <option value="Other Collaboration">{t('contact_form_type_opt4', "Motion & Interaction")}</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-carvao/50">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="budgetRange" className="font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-carvao/60">{t('contact_form_budget_label', "Budget Range")}</label>
                    <div className="relative">
                      <select
                        id="budgetRange"
                        name="budgetRange"
                        value={formData.budgetRange}
                        onChange={handleChange}
                        required
                        className="w-full h-12 px-4 pr-10 rounded-[1px] border border-neutral-carvao/20 bg-background focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 font-sans text-sm text-neutral-carvao transition-all appearance-none cursor-pointer"
                      >
                        <option value="">{t('contact_form_budget_placeholder', "Select budget range")}</option>
                        <option value="Under $500">{t('contact_form_budget_under_500', "Under $500")}</option>
                        <option value="$500 - $750">$500 - $750</option>
                        <option value="$750 - $1500">$750 - $1.5k</option>
                        <option value="$1500 - $2500">$1.5k - $2.5k</option>
                        <option value="$2500 - $5000">$2.5k - $5k</option>
                        <option value="$5000+">$5k+</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-carvao/50">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-carvao/60">{t('contact_form_message_label', "Tell me about your project")}</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder={t('contact_form_message_placeholder', "Share your goals, challenges, and ideas...")}
                    className="w-full p-4 rounded-[1px] border border-neutral-carvao/20 bg-background focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 font-sans text-sm text-neutral-carvao transition-all resize-none"
                  ></textarea>
                </div>

                {/* Form Footer */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mt-2 pt-2">
                  <div className="flex items-start gap-2 max-w-[320px]">
                    <svg className="w-4 h-4 text-neutral-carvao/50 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <p className="font-sans text-body-sm text-neutral-carvao/60 leading-normal">
                      {t('contact_form_info_disclaimer', "Your information is safe with me. I'll get back to you within 1-2 business days.")}
                    </p>
                  </div>

                  <LimeActionButton
                    type="submit"
                    theme="purple"
                    disabled={status === 'sending' || status === 'success'}
                    icon={ArrowRight}
                  >
                    {status === 'sending' ? t('contact_form_sending', 'Sending...') : status === 'success' ? t('contact_form_sent', 'Message Sent!') : t('contact_form_send', 'Send Message')}
                  </LimeActionButton>
                </div>

                {/* Success Banner */}
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute inset-0 bg-background/95 flex flex-col items-center justify-center text-center p-6 rounded-[1px] z-20 border border-neutral-carvao/10"
                  >
                    <div className="w-12 h-12 rounded-full bg-[var(--color-lime-500)] flex items-center justify-center border border-neutral-carvao mb-4">
                      <svg className="w-6 h-6 text-neutral-carvao" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="font-sans font-extrabold text-subtitle-sm text-neutral-carvao uppercase tracking-tight mb-2">{t('contact_success_thanks', "Thank you!")}</h4>
                    <p className="font-sans text-body-sm text-neutral-carvao/75 max-w-xs leading-relaxed mb-4">
                      {t('contact_success_desc', "Your message has been sent successfully. I'll get in touch with you very soon!")}
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus('')}
                      className="mt-6 font-mono text-[9px] font-bold uppercase tracking-wider text-[#8b7ec8] underline hover:text-neutral-carvao"
                    >
                      {t('contact_success_another', "Send another message")}
                    </button>
                  </motion.div>
                )}
              </form>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
