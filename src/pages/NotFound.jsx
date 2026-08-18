import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CurtainLink } from '../context/RouteCurtainContext';

export function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="w-full min-h-[calc(100svh-var(--header-safe-offset,72px))] bg-[#10110F] text-[#FAFAF7] flex flex-col justify-center items-center py-32 select-none">
      <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
        <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C4FF00] block mb-4">
          404 // NOT FOUND
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal mb-6">
          {t('404_title', 'Página não encontrada')}
        </h1>
        <p className="font-sans text-sm sm:text-base text-[#F4F3EE]/70 max-w-md mx-auto mb-8">
          {t(
            '404_desc',
            'O endereço acessado não existe ou foi movido. Navegue pelos trabalhos selecionados ou retorne ao início.'
          )}
        </p>
        <CurtainLink
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C4FF00] hover:bg-[#d4ff1a] text-[#10110F] font-mono text-xs font-bold uppercase tracking-wider rounded-[12px] transition-all cursor-pointer shadow-lg"
        >
          <ArrowLeft size={14} />
          <span>{t('404_back_home', 'Voltar ao Início')}</span>
        </CurtainLink>
      </div>
    </div>
  );
}

export default NotFound;
