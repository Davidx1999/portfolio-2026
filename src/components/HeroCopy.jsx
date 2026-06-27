import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Planet } from '@phosphor-icons/react';
import { AsymmetricDrawerButton, TagPillButton, RotatingStamp, TextButton, LimeActionButton } from './Buttons';
import { useLanguage } from '../context/LanguageContext';

const PlanetIcon = (props) => <Planet {...props} weight="duotone" />;

export function HeroCopy() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col justify-between lg:h-full relative pr-4">
      {/* Top Star Ornament */}
      <div className="absolute right-0 top-0 md:top-2 md:-right-4 xl:-right-4 xl:top-0 hidden sm:block w-16 h-16 pointer-events-none select-none z-10">
        {/* Star in the center */}
        <svg className="w-full h-full text-secondary fill-current animate-pulse" viewBox="-4 -4 32 32">
          <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
        </svg>
        {/* Orbit wrapper that rotates */}
        <div className="absolute inset-0 animate-[spin_8s_linear_infinite]">
          <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-secondary opacity-80" />
        </div>
      </div>

      {/* RotatingStamp in place of Top Star Ornament */}
      <div className="absolute -top-0 left-52 md:left-84 z-20">
        <RotatingStamp
          as="div"
          text={t('hero_stamp')}
          icon={PlanetIcon}
        />
      </div>
      <div className="flex flex-col">
        {/* Heading Logo/Title */}
        <div className="relative mb-4 xl:mb-6">
          <h1 className="font-sans text-neutral-carvao">
            <span className="sr-only">David Salviano</span>
            <img
              src={`${import.meta.env.BASE_URL}assets//David/my_name_purple.png`}
              alt="David Salviano"
              className="w-[280px] md:w-[340px] lg:w-[380px] xl:w-[420px] h-auto object-contain block"
            />
          </h1>

          {/* Wavy Lime Underline Accent */}
          <div className="w-full max-w-[320px] md:max-w-[420px] mt-3">
            {/*<svg className="w-full h-4 text-tertiary stroke-current fill-none stroke-[3.5] stroke-linecap-round" viewBox="0 0 400 12">
              <path d="M 5,6 Q 25,2 45,6 T 85,6 T 125,6 T 165,6 T 205,6 T 245,6 T 285,6 T 325,6 T 365,6 T 395,6" />
            </svg>*/}
          </div>
        </div>

        {/* Editorial Hook with Star Ornament */}
        <div className="relative mb-4 xl:mb-6">
          <h1 className="font-serif text-[2.75rem] md:text-[3rem] lg:text-[3.25rem] font-bold leading-[1.1] text-neutral-carvao max-w-3xl">
            {t('hero_title_editorial')}{' '}
            {t('hero_title_with')}{' '}
            <span className="relative inline-block text-semantic-red italic font-semibold">
              {t('hero_title_clarity')}
              <span className="absolute bottom-1 left-0 right-0 h-[1.5px] bg-semantic-red" />
            </span>{' '}
            {t('hero_title_and')}{' '}
            <span className="relative inline-block text-semantic-red italic font-semibold">
              {t('hero_title_personality')}
              <span className="absolute bottom-1 left-0 right-0 h-[1.5px] bg-semantic-red" />
            </span>
          </h1>

          {/* Right Side Star Ornament */}
          <div className="absolute top-12 -right-4 md:-right-8 pointer-events-none select-none">
            <svg className="w-6 h-6 text-neutral-carvao/80 fill-current" viewBox="0 0 24 24">
              <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
            </svg>
          </div>
        </div>

        <hr className="w-full max-w-xl mb-4 xl:mb-6" />

        {/* Body description */}
        <p className="font-sans text-neutral-carvao/75 text-body-base max-w-[48ch] leading-relaxed mb-6 xl:mb-10">
          {t('hero_description')}
        </p>

        {/* Tags section under copy 
        <div className="flex flex-wrap gap-2.5 mb-8">
          <TagPillButton>UI/UX Design</TagPillButton>
          <TagPillButton>Editorial Web</TagPillButton>
          <TagPillButton>Design System</TagPillButton>
        </div>*/}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-6 mt-8 lg:mt-0 relative w-full pb-6 md:pb-0">
        {/* VIEW MY WORK Button */}
        <AsymmetricDrawerButton
          as={motion.a}
          href="#projects"
          icon={ArrowRight}
          theme="lime"
          variant="secondary"
        >
          {t('hero_cta')}
        </AsymmetricDrawerButton>
      </div>
    </div>
  );
}
