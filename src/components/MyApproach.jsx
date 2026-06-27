import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const steps = [
  {
    number: "01",
    title: "DISCOVER",
    description: "I research, listen and understand the real problems and opportunities.",
    icon: (className) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
      </svg>
    ),
    blobStyle: "rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%]"
  },
  {
    number: "02",
    title: "DEFINE",
    description: "I turn insights into clear problems, user needs and design goals.",
    icon: (className) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      </svg>
    ),
    blobStyle: "rounded-[60%_40%_50%_50%_/_50%_60%_40%_50%]"
  },
  {
    number: "03",
    title: "DESIGN",
    description: "I explore ideas and craft interfaces that are simple, useful and delightful.",
    icon: (className) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    blobStyle: "rounded-[50%_50%_60%_40%_/_40%_40%_60%_60%]"
  },
  {
    number: "04",
    title: "DELIVER",
    description: "I refine, prototype and handoff with clarity, ready for impact.",
    icon: (className) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M12 3c-1.2 2-3 5.5-3 8.5V15h6v-3.5c0-3-1.8-6.5-3-8.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15l-3 2.5V20l3-1M15 15l3 2.5V20l-3-1" />
        <circle cx="12" cy="10" r="1.5" fill="currentColor" />
      </svg>
    ),
    blobStyle: "rounded-[45%_55%_40%_60%_/_50%_45%_55%_50%]"
  }
];

const HighlightSquiggle = () => (
  <svg className="w-36 md:w-44 h-4 text-[var(--color-lime-500)] mt-2" viewBox="0 0 180 12" fill="none" preserveAspectRatio="none">
    <path 
      d="M3 9C30 5 60 3 90 4C120 5 150 7 177 5M12 10C50 9 90 8 130 7C145 6.5 160 6 172 5.5" 
      stroke="currentColor" 
      strokeWidth="3.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="opacity-90"
    />
  </svg>
);

const DashedArrow = () => (
  <div className="hidden lg:flex items-center justify-center flex-1 px-1 xl:px-4 mt-8">
    <svg className="w-full max-w-[60px] xl:max-w-[100px] h-6 text-neutral-carvao/30" fill="none" viewBox="0 0 80 24">
      <path 
        d="M0 12h76m-8-6l8 6-8 6" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeDasharray="4 4" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  </div>
);

export function MyApproach() {
  const { t } = useLanguage();
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 80, 
        damping: 15 
      } 
    }
  };

  return (
    <section id="approach" className="w-full bg-white px-0 md:px-[calc(16%-24px)] py-16 md:py-24 border-t border-neutral-carvao/10 mt-[40px]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-8"
      >
        {/* Left Column: Heading and description */}
        <motion.div variants={itemVariants} className="w-full lg:w-[28%] flex flex-col gap-4">
            <img 
              src={`${import.meta.env.BASE_URL}assets/titles/my_approach.png`} 
              alt={t('approach_title_alt')} 
              className="w-full max-w-[240px] h-auto object-contain select-none"
            />
          <p className="text-sm md:text-base text-neutral-carvao/75 max-w-xs mt-2 leading-relaxed">
            {t('approach_description')}
          </p>
        </motion.div>

        {/* Right Column: Steps sequence */}
        <div className="w-full lg:w-[68%] flex flex-col md:flex-row flex-wrap lg:flex-nowrap items-start justify-between gap-8 md:gap-y-12 lg:gap-0 mt-4 lg:mt-0">
          {steps.map((step, idx) => (
            <React.Fragment key={step.number}>
              <motion.div 
                variants={itemVariants} 
                className="flex flex-col items-start w-full md:w-[45%] lg:w-[22%] max-w-xs"
              >
                {/* Number Blob */}
                <div className={`w-9 h-7 flex items-center justify-center bg-[#B3A0E6]/30 text-neutral-carvao font-mono text-[11px] font-bold ${step.blobStyle} mb-5`}>
                  {step.number}
                </div>
                {/* Icon */}
                <div className="mb-4 text-neutral-carvao">
                  {step.icon("w-9 h-9")}
                </div>
                {/* Title */}
                <h3 className="font-sans font-bold text-sm tracking-wider uppercase text-neutral-carvao mb-2">
                  {t('approach_step_' + step.number + '_title')}
                </h3>
                {/* Description */}
                <p className="font-sans text-xs text-neutral-carvao/70 leading-relaxed">
                  {t('approach_step_' + step.number + '_desc')}
                </p>
              </motion.div>
              {idx < steps.length - 1 && <DashedArrow />}
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
