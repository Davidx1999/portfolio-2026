import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CurtainLink } from '../../context/RouteCurtainContext';

const EASING = [0.22, 1, 0.36, 1];

/**
 * ThreeColumnGrid: Unified structural 3-column system
 * Variants:
 *  - 'informational': Educational proofs / credibility statements
 *  - 'navigation': Full-card clickable navigation links
 * Themes:
 *  - 'light': on #FAFAF7 / #F1F0EB with dark charcoal strokes
 *  - 'dark': on #10110F / #111210 with crisp white strokes
 */
export function ThreeColumnGrid({
  variant = 'informational',
  theme = 'light',
  items = [],
  className = '',
}) {
  const prefersReducedMotion = useReducedMotion();
  const isDark = theme === 'dark';
  const isNav = variant === 'navigation';

  const borderColor = isDark ? 'border-white/15' : 'border-[rgba(17,18,16,0.15)]';
  const textColor = isDark ? 'text-[#FAFAF7]' : 'text-[#111210]';
  const descColor = isDark ? 'text-[#FAFAF7]/70' : 'text-[#111210]/75';
  const hoverBg = isDark ? 'hover:bg-white/[0.03]' : 'hover:bg-black/[0.02]';

  return (
    <div
      className={`w-full grid grid-cols-1 md:grid-cols-3 border ${borderColor} rounded-[20px] sm:rounded-[24px] overflow-hidden ${className}`}
    >
      {items.map((item, index) => {
        const isNotLastCol = index < items.length - 1;
        const cellBorders = `border-b md:border-b-0 ${borderColor} ${
          isNotLastCol ? `md:border-r ${borderColor}` : ''
        }`;

        const innerContent = (
          <div className="flex flex-col justify-between h-full">
            <div>
              {/* Header row: Number + Optional Action Arrow */}
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <span className="font-mono text-xs font-bold text-[#8B8B85] tracking-wider">
                  {item.num} //
                </span>
                {isNav && (
                  <ArrowUpRight
                    size={20}
                    className={`text-[#8B8B85] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${
                      isDark ? 'group-hover:text-white' : 'group-hover:text-[#111210]'
                    }`}
                  />
                )}
              </div>

              {/* Title */}
              <h3
                className={`font-serif text-xl sm:text-2xl lg:text-[1.65rem] font-normal mb-3 sm:mb-4 leading-snug ${textColor} transition-colors duration-200`}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p className={`font-sans text-xs sm:text-sm ${descColor} leading-relaxed`}>
                {item.desc}
              </p>
            </div>

            {/* Bottom Action for Navigation Variant (Without small internal top line) */}
            {isNav && (
              <div className={`mt-8 pt-2 flex items-center gap-2 font-mono text-[11px] font-bold tracking-wider uppercase text-[#8B8B85] ${
                isDark ? 'group-hover:text-[#C7F000]' : 'group-hover:text-[#10110F]'
              } transition-colors duration-200`}>
                <span>{item.actionLabel || 'ACESSAR'}</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </div>
            )}
          </div>
        );

        if (isNav) {
          return (
            <CurtainLink
              key={item.num || index}
              to={item.link || '#'}
              className={`group flex flex-col justify-between p-8 sm:p-10 lg:p-12 ${cellBorders} ${hoverBg} transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-[#C7F000]`}
            >
              {innerContent}
            </CurtainLink>
          );
        }

        return (
          <motion.div
            key={item.num || index}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: EASING }}
            className={`flex flex-col justify-between p-8 sm:p-10 lg:p-12 ${cellBorders}`}
          >
            {innerContent}
          </motion.div>
        );
      })}
    </div>
  );
}

export default ThreeColumnGrid;
