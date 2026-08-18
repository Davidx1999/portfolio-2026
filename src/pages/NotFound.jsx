import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CurtainLink } from '../context/RouteCurtainContext';

export function NotFound() {
  const { t } = useTranslation(['common']);

  return (
    <div className="w-full min-h-[calc(100svh-var(--header-safe-offset,72px))] bg-[#10110F] text-[#FAFAF7] flex flex-col justify-center items-center py-32 select-none">
      <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
        <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C4FF00] block mb-4">
          {t('not_found_eyebrow', '404 // NOT FOUND')}
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal mb-6">
          {t('not_found_title', 'Page not found')}
        </h1>
        <p className="font-sans text-sm sm:text-base text-[#F4F3EE]/70 max-w-md mx-auto mb-8">
          {t(
            'not_found_desc',
            "The page you're looking for doesn't exist or has been moved. Explore selected work or return to home."
          )}
        </p>
        <CurtainLink
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C4FF00] hover:bg-[#d4ff1a] text-[#10110F] font-mono text-xs font-bold uppercase tracking-wider rounded-[12px] transition-all cursor-pointer shadow-lg"
        >
          <ArrowLeft size={14} />
          <span>{t('not_found_back_home', 'Back to Home')}</span>
        </CurtainLink>
      </div>
    </div>
  );
}

export default NotFound;
