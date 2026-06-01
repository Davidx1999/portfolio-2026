import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { AsymmetricDrawerButton, LimeActionButton } from './Buttons';
import { ArrowRight } from '@phosphor-icons/react';

export function FooterSection() {
  return (
    <section id="contact" className="w-full aspect-auto md:aspect-[21/5] py-12 md:py-0 px-6 md:px-[16%] relative overflow-hidden border-t border-neutral-carvao/10 flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}assets/BG/footer.png)`
        }}
      />
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-[#F0EBDF]/10 mix-blend-multiply z-0 pointer-events-none" />

      {/* Content Container - 32% width on desktop */}
      <div className="relative z-10 w-full lg:w-[32%] flex flex-col justify-center py-4">
        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-carvao leading-[1.05] uppercase">
          Let's create something <span className="text-red-500">meaningful</span> <span className="text-yellow-500">together.</span>
        </h2>

        {/* Subtitle */}
        <p className="text-sm md:text-base text-neutral-carvao/85 font-sans mt-4 leading-relaxed">
          I'm currently open to new opportunities and exciting collaborations. Let's build something great.
        </p>

        {/* Actions Row */}
        <div className="flex flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-neutral-carvao/10 w-full">
          {/* Asymmetric Button */}
          <div className="flex-shrink-0">
            <LimeActionButton
              as="a"
              href="mailto:davidsalviano52@gmail.com"
              theme="lime"
              variant="primary"
              icon={ArrowRight}
            >
              Get in touch
            </LimeActionButton>
          </div>

          {/* Email Address */}
          <a
            href="mailto:davidsalviano52@gmail.com"
            className="group relative font-mono text-sm md:text-base text-neutral-carvao/70 hover:text-neutral-carvao transition-colors duration-300 w-fit text-right"
          >
            <span>davidsalviano52@gmail.com</span>
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-carvao scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
          </a>
        </div>
      </div>
    </section>
  );
}
