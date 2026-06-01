import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Globe2 } from "lucide-react";

const MATRIX_STYLES = {
  purple: {
    primary: {
      container: "bg-[#8b7ec8] text-[#F0EBDF] hover:bg-[#B6A9ED]",
      divider: "border-l border-[#F0EBDF]/30 group-hover:border-[#F0EBDF]/30",
      iconArea: "bg-transparent text-[#F0EBDF] hover:bg-[#B6A9ED]"
    },
    secondary: {
      container: "border border-[#1A1A1A] bg-[#8b7ec8] text-[#F0EBDF] hover:bg-[#B6A9ED]",
      divider: "border-l border-[#1A1A1A]",
      iconArea: "bg-[#F0EBDF] text-[#1A1A1A] group-hover:bg-[#5c567a] group-hover:text-[#F0EBDF]"
    },
    tertiary: {
      container: "border border-[#1A1A1A] bg-[#B6A9ED] text-[#1A1A1A] hover:bg-[#EAE5F7]",
      divider: "border-l border-[#1A1A1A]",
      iconArea: "bg-transparent text-[#1A1A1A]"
    }
  },
  lime: {
    primary: {
      container: "border border-[#1A1A1A] bg-[#C8E63C] text-[#1A1A1A] hover:bg-[#EAF59D]",
      divider: "border-l border-[#1A1A1A]",
      iconArea: "bg-transparent text-[#1A1A1A]"
    },
    secondary: {
      container: "border border-[#1A1A1A] bg-[#C8E63C] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#C8E63C]",
      divider: "border-l border-[#1A1A1A] group-hover:border-[#1A1A1A]",
      iconArea: "bg-[#1A1A1A] text-[#C8E63C] group-hover:bg-[#EAF59D] group-hover:text-[#1A1A1A]"
    },
    tertiary: {
      container: "bg-[#C8E63C] text-[#1A1A1A] hover:bg-[#EAF59D]",
      divider: "border-l border-[#1A1A1A]/10",
      iconArea: "bg-transparent text-[#1A1A1A]"
    }
  },
  neutral: {
    primary: {
      container: "border border-[#1A1A1A] bg-[#F0EBDF] text-[#1A1A1A] hover:bg-[#7A7A7A] hover:text-[#F0EBDF]",
      divider: "border-l border-[#1A1A1A] group-hover:border-[#7A7A7A]",
      iconArea: "bg-transparent text-[#1A1A1A] group-hover:text-[#F0EBDF]"
    },
    secondary: {
      container: "border border-[#1A1A1A] bg-[#F0EBDF] text-[#1A1A1A] hover:bg-[#7A7A7A] hover:text-[#F0EBDF]",
      divider: "border-l border-[#1A1A1A] group-hover:border-[#1A1A1A]",
      iconArea: "bg-[#C8E63C] text-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-[#C8E63C]"
    },
    tertiary: {
      container: "border border-[#1A1A1A] bg-[#F0EBDF] text-[#1A1A1A] hover:bg-[#7A7A7A] hover:text-[#F0EBDF]",
      divider: "border-l border-[#1A1A1A]",
      iconArea: "bg-[#B6A9ED] text-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-[#B6A9ED]"
    }
  }
};

export function LabelRoll({ children }) {
  return (
    <span className="relative block h-[1.1em] overflow-hidden">
      <span className="block transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)] group-hover:-translate-y-[1.1em]">
        <span className="block h-[1.1em]">{children}</span>
        <span className="block h-[1.1em]">{children}</span>
      </span>
    </span>
  );
}

export function RotatingStamp({
  as: Component = "button",
  text = "AVAILABLE FOR PROJECTS • AVAILABLE FOR PROJECTS •",
  icon: Icon = Globe2,
  ...props
}) {
  const isButton = Component === "button" || Component === motion.button;
  return (
    <Component
      type={isButton ? "button" : undefined}
      aria-label={text}
      className="group relative flex h-24 w-24 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/40"
      {...props}
    >
      <span className="absolute z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-foreground)] bg-[var(--color-semantic-yellow)] text-[var(--color-foreground)] transition-transform duration-300 group-hover:scale-110">
        <Icon size={24} strokeWidth={1.5} />
      </span>

      <svg
        className="absolute inset-0 h-full w-full animate-[spin_12s_linear_infinite] transition-all group-hover:animate-[spin_6s_linear_infinite]"
        viewBox="0 0 100 100"
      >
        <defs>
          <path
            id="stampCircle"
            d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          />
        </defs>

        <text className="fill-[var(--color-foreground)] font-mono text-[8.5px] font-bold uppercase tracking-[3px]">
          <textPath href="#stampCircle">
            {text}
          </textPath>
        </text>
      </svg>
    </Component>
  );
}

export function LimeActionButton({
  children = "Let’s connect",
  icon: Icon = ArrowUpRight,
  as: Component = motion.button,
  ...props
}) {
  const isButton = Component === motion.button || Component === 'button';
  return (
    <Component
      type={isButton ? "button" : undefined}
      whileTap={{ scale: 0.97 }}
      className="group relative inline-flex h-12 items-center overflow-hidden rounded-[2px] border border-[var(--color-foreground)] bg-[var(--color-tertiary)] font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-foreground)] transition-all duration-500 ease-[cubic-bezier(.76,0,.24,1)] hover:bg-[var(--color-foreground)] hover:text-[var(--color-background)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/40 cursor-pointer"
      {...props}
    >
      <span className="absolute inset-y-0 left-0 w-0 bg-[var(--color-background)]/20 transition-all duration-500 ease-[cubic-bezier(.76,0,.24,1)] group-hover:w-full" />

      <span className="relative z-10 py-3 pl-5 pr-4">
        <LabelRoll>{children}</LabelRoll>
      </span>

      <span className="relative z-10 flex h-full w-12 items-center justify-center overflow-hidden border-l border-[var(--color-foreground)] bg-[var(--color-foreground)] text-[var(--color-tertiary)] transition-all duration-500 ease-[cubic-bezier(.76,0,.24,1)] group-hover:bg-[var(--color-tertiary)] group-hover:text-[var(--color-foreground)]">
        <Icon size={16} className="absolute inset-0 m-auto transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)] translate-x-0 group-hover:translate-x-8" />
        <Icon size={16} className="absolute inset-0 m-auto transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)] -translate-x-8 group-hover:translate-x-0" />
      </span>
    </Component>
  );
}

export function AsymmetricDrawerButton({
  theme = "purple",      // "purple" | "lime" | "neutral"
  variant = "secondary",  // "primary" | "secondary" | "tertiary"
  children = "View my work",
  icon: Icon = ArrowRight,
  as: Component = motion.button,
  ...props
}) {
  const isButton = Component === motion.button || Component === 'button';
  const themeStyles = MATRIX_STYLES[theme] || MATRIX_STYLES.purple;
  const style = themeStyles[variant] || themeStyles.secondary;

  return (
    <Component
      type={isButton ? "button" : undefined}
      whileTap={{ scale: 0.97 }}
      className={`group flex items-center overflow-hidden rounded-[2px] font-sans text-xs font-bold uppercase tracking-[0.16em] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/40 cursor-pointer ${style.container}`}
      {...props}
    >
      <span className="py-3 pl-6 pr-4">
        <LabelRoll>{children}</LabelRoll>
      </span>

      <span className={`flex items-center justify-center px-3.5 py-3.5 transition-colors duration-300 ${style.divider} ${style.iconArea}`}>
        <Icon
          size={16}
          strokeWidth={2.5}
          className="transition-transform duration-300 ease-out group-hover:translate-x-1.5"
        />
      </span>
    </Component>
  );
}

export function TertiaryButton({
  children = "Let's connect",
  icon: Icon = ArrowUpRight,
  as: Component = motion.button,
  ...props
}) {
  const isButton = Component === motion.button || Component === 'button';
  return (
    <Component
      type={isButton ? "button" : undefined}
      whileTap={{ scale: 0.97 }}
      className="group flex items-center overflow-hidden rounded-[2px] border border-[var(--color-foreground)] bg-[var(--color-tertiary)] font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-foreground)] transition-all duration-300 hover:border-[var(--color-foreground)] hover:bg-[var(--color-foreground)] hover:text-[var(--color-background)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/40 cursor-pointer"
      {...props}
    >
      <span className="py-3 pl-5 pr-4">
        <LabelRoll>{children}</LabelRoll>
      </span>

      <span className="flex items-center justify-center border-l border-[var(--color-foreground)] bg-[var(--color-foreground)] px-3.5 py-3.5 text-[var(--color-tertiary)] transition-colors duration-300 group-hover:bg-[var(--color-tertiary)] group-hover:text-[var(--color-foreground)]">
        <Icon
          size={16}
          strokeWidth={2.5}
          className="transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </span>
    </Component>
  );
}

export function TagPillButton({ children = "UI/UX Design", ...props }) {
  return (
    <button
      type="button"
      className="group relative inline-flex h-10 items-center overflow-hidden rounded-full border border-[var(--color-foreground)]/35 bg-transparent px-4 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-foreground)] transition-all duration-500 hover:border-[var(--color-foreground)] hover:bg-[var(--color-semantic-yellow)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/40 cursor-pointer"
      {...props}
    >
      <span className="mr-2 h-2 w-2 rounded-full bg-[var(--color-tertiary)] transition-transform duration-500 group-hover:scale-[2.2]" />

      <span className="flex items-center leading-none mt-[2px] pr-[0.16em]">
        <LabelRoll>{children}</LabelRoll>
      </span>
    </button>
  );
}

export function TextButton({
  children,
  variant = "secondary", // "primary" | "secondary"
  as: Component = "button",
  ...props
}) {
  const isButton = Component === "button" || Component === motion.button;

  const textColorClass = variant === "primary"
    ? "text-[var(--color-primary)] hover:text-[var(--color-foreground)]"
    : "text-[var(--color-foreground)] hover:text-[var(--color-primary)]";

  const baseLineColor = variant === "primary"
    ? "bg-[var(--color-primary)]"
    : "bg-[var(--color-foreground)]";

  const hoverLineColor = variant === "primary"
    ? "bg-[var(--color-foreground)]"
    : "bg-[var(--color-primary)]";

  return (
    <Component
      type={isButton ? "button" : undefined}
      className={`group relative inline-flex items-center gap-2 font-sans font-bold text-xs tracking-wider uppercase py-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 rounded-[2px] cursor-pointer ${textColorClass}`}
      {...props}
    >
      <span>{children}</span>
      <div className="absolute bottom-0 left-0 w-full h-[1px] overflow-hidden pointer-events-none">
        {/* Linha Padrão: Recolhe para a direita */}
        <span className={`absolute inset-0 origin-right transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-x-0 ${baseLineColor}`} />
        {/* Linha Hovered: Expande a partir da esquerda */}
        <span className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] delay-75 group-hover:scale-x-100 ${hoverLineColor}`} />
      </div>
    </Component>
  );
}
