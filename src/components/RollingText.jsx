import React from 'react';

/**
 * RollingText
 * Aplica o micro-efeito de texto rolante escalonado (staggered rolling text)
 * em botões e links que são puramente textuais, preservando 100% da tipografia,
 * cores, espaçamento e sem alterar a estrutura visual.
 * 
 * Requer que o elemento interativo pai tenha a classe `group`.
 */
export function RollingText({ text, className = '' }) {
  if (typeof text !== 'string') return text;
  const chars = text.split('');

  return (
    <span className={`relative inline-flex overflow-hidden ${className}`}>
      <span className="sr-only">{text}</span>
      {/* Camada Inicial (Top) */}
      <span aria-hidden="true" className="inline-flex">
        {chars.map((char, i) => (
          <span
            key={`top-${i}`}
            className="rolling-char top"
            style={{ '--char-index': i }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
      {/* Camada que entra por baixo (Bottom) */}
      <span aria-hidden="true" className="absolute inline-flex inset-0">
        {chars.map((char, i) => (
          <span
            key={`bottom-${i}`}
            className="rolling-char bottom"
            style={{ '--char-index': i }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    </span>
  );
}

export default RollingText;
