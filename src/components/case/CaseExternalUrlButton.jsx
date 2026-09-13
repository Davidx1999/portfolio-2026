import React from 'react';
import { ExternalLink } from 'lucide-react';
import { isValidHttpUrl } from '../../utils/url';

/**
 * CaseExternalUrlButton
 * Botão padronizado com altura de 48px, preenchimento lima (#C7F000),
 * texto escuro (#10110F), bordas arredondadas e ícone de link externo.
 */
export function CaseExternalUrlButton({
  url,
  label,
  projectTitle,
  className = '',
}) {
  if (!isValidHttpUrl(url)) return null;

  return (
    <a
      href={url.trim()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label || 'Live Project'}${projectTitle ? `: ${projectTitle}` : ''}`}
      className={`group inline-flex items-center justify-center gap-2 px-6 h-[48px] rounded-[16px] bg-[#C7F000] hover:bg-[#d8ff1a] active:scale-[0.98] text-[#10110F] font-mono text-xs sm:text-sm uppercase font-bold tracking-wider transition-all duration-200 shadow-sm cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7F000] focus-visible:ring-offset-2 focus-visible:ring-offset-[#10110F] ${className}`}
    >
      <span>{label}</span>
      <ExternalLink
        size={15}
        className="text-[#10110F] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden="true"
      />
    </a>
  );
}

export default CaseExternalUrlButton;
