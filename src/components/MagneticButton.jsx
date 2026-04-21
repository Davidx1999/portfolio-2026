import { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

export function MagneticButton({ children, href, className = "" }) {
  const ref = useRef(null);

  // Motion Values for X and Y coordinate tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Added spring to make the motion extremely smooth across 60fps
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  // Minimal scaling interaction
  const scale = useTransform(x, [-100, 100], [0.98, 1.02]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    // Subtle magnetic pull scale
    x.set(middleX * 0.25);
    y.set(middleY * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const ContentWrapper = href ? motion.a : motion.button;

  return (
    <ContentWrapper
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
      style={{ x: mouseXSpring, y: mouseYSpring, scale }}
      className={`bg-zinc-100 text-zinc-950 px-8 py-4 rounded-full font-semibold transition-colors hover:bg-white flex items-center justify-center cursor-pointer ${className}`}
    >
      {children}
    </ContentWrapper>
  );
}
