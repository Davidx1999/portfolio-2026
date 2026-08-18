import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Quote } from 'lucide-react';

export function TestimonialSection({ testimonial }) {
  const prefersReducedMotion = useReducedMotion();

  // If no testimonial provided or not authorized, hide gracefully as requested
  if (!testimonial || testimonial.autorizadoParaPublicacao === false) {
    return null;
  }

  return (
    <section className="relative w-full bg-[#F1F0EB] text-[#111210] py-24 sm:py-32 border-b border-[rgba(17,18,16,0.12)] select-none">
      <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-[#111210] text-[#FAFAF7] flex items-center justify-center mb-8">
            <Quote size={20} />
          </div>

          <motion.blockquote
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-snug text-[#111210] mb-8"
          >
            "{testimonial.citacao}"
          </motion.blockquote>

          <div className="flex flex-col items-center gap-1 font-sans">
            <span className="font-bold text-sm sm:text-base text-[#111210]">
              {testimonial.nome}
            </span>
            <span className="text-xs sm:text-sm text-[#8B8B85]">
              {testimonial.cargo} • {testimonial.empresa}
            </span>
            {testimonial.projeto && (
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#8B8B85] mt-1">
                PROJETO: {testimonial.projeto}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
