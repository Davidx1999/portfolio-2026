import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { AsymmetricDrawerButton, LimeActionButton } from './Buttons';
import { ArrowRight } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';

export function FooterSection({ className = '' }) {
  const { t } = useLanguage();

  return (
    <section id="contact" className={`w-full bg-white aspect-auto md:aspect-[21/5.4] py-12 md:py-0 px-4 md:px-[calc(16%-24px)] relative overflow-hidden border-t border-neutral-carvao/10 flex items-center ${className}`}>
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}assets/BG/footer2.png)`
        }}
      />
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-[#F0EBDF]/10 mix-blend-multiply z-0 pointer-events-none" />

      {/* Content Container - 48% width on desktop */}
      <div className="relative z-10 w-full lg:w-[48%] flex flex-col justify-center py-6">
        {/* Title */}
        <h2 className="text-[2.75rem] md:text-[3rem] lg:text-[3.25rem] font-extrabold tracking-tight text-neutral-carvao leading-[1.05] uppercase">
          {t('footer_title_main')}{' '}
          <span className="text-red-500">{t('footer_title_meaningful')}</span>{' '}
          <span className="text-yellow-500">{t('footer_title_together')}</span>
        </h2>

        {/* Subtitle */}
        <p className="text-body-base text-neutral-carvao/85 font-sans mt-4 leading-relaxed">
          {t('footer_description')}
        </p>

        {/* Actions Row */}
        <div className="flex flex-col items-start gap-6 mt-8 pt-6 border-t border-neutral-carvao/10 w-full">
          {/* Action Button */}
          <div className="flex-shrink-0">
            <LimeActionButton
              as="a"
              href="mailto:davidsalviano52@gmail.com"
              theme="lime"
              variant="primary"
              icon={ArrowRight}
            >
              {t('footer_cta')}
            </LimeActionButton>
          </div>

          {/* Email Address */}
          <div className="flex flex-col items-start gap-1">
            <span className="font-mono text-[14px] uppercase tracking-widest text-neutral-carvao font-normal">{t('footer_email_tag')}</span>
            <a
              href="mailto:davidsalviano52@gmail.com"
              className="group relative font-mono text-[18px] font-normal text-neutral-carvao hover:text-[#8b7ec8] transition-colors duration-300 w-fit"
            >
              <span>davidsalviano52@gmail.com</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-carvao scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
