import React from 'react';
import { CurtainLink } from '../context/RouteCurtainContext';

const baseStyles =
  'group inline-flex items-center justify-center font-mono font-bold tracking-widest uppercase transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer select-none';

const variants = {
  primary:
    'text-[#10110F] bg-[#C7F000] hover:bg-[#d8ff1a] active:scale-[0.98] focus-visible:outline-[#C7F000] shadow-sm',
  secondary:
    'text-[#111210] border border-[rgba(17,18,16,0.2)] hover:border-[#111210] hover:bg-[#111210]/5 active:scale-[0.98] focus-visible:outline-[#111210]',
  light:
    'text-[#10110F] bg-[#FAFAF7] hover:bg-[#C7F000] hover:text-[#10110F] active:scale-[0.98] focus-visible:outline-[#C7F000] shadow-md',
  dark: 'text-[#FAFAF7] bg-[#10110F] hover:bg-white/10 active:scale-[0.98] border border-[rgba(255,255,255,0.2)] focus-visible:outline-[#C7F000]',
};

const sizes = {
  sm: 'px-4 sm:px-5 py-2 text-xs rounded-[16px]',
  md: 'px-6 py-4 text-xs rounded-[18px]',
  lg: 'px-7 py-4 sm:px-8 text-xs rounded-[18px]',
};

export function RollingButton({
  children,
  variant = 'primary',
  size = 'lg',
  icon,
  to,
  href,
  className = '',
  disabled,
  ...props
}) {
  const Component = to ? CurtainLink : href ? 'a' : 'button';
  const routeProps = to ? { to } : href ? { href } : { type: props.type || 'button' };

  const text = typeof children === 'string' ? children : '';
  const chars = text.split('');

  const combinedClassName = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.lg} ${className} ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`;

  return (
    <Component
      {...routeProps}
      {...props}
      disabled={disabled}
      className={combinedClassName}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="relative flex overflow-hidden">
        {/* Camada Inicial */}
        <span className="flex">
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
        {/* Camada que entra por baixo */}
        <span className="absolute flex inset-0">
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
      {icon && (
        <span className="flex-shrink-0 flex items-center justify-center ml-2 sm:ml-2.5">
          {icon}
        </span>
      )}
    </Component>
  );
}
