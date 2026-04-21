import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useAnimationFrame } from 'framer-motion';

export function MouseFollower() {
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for high agency trailing
  const springX = useSpring(mouseX, { damping: 25, stiffness: 200, mass: 0.5 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 200, mass: 0.5 });
  
  const rotation = useMotionValue(0);
  const stretch = useMotionValue(1);

  useEffect(() => {
    const moveCursor = (e) => {
      // 16 is half the width (32px), centering the dot
      mouseX.set(e.clientX - 16); 
      mouseY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [mouseX, mouseY, isVisible]);

  // Disney Squash & Stretch Principle logic
  useAnimationFrame(() => {
    const vx = springX.getVelocity();
    const vy = springY.getVelocity();
    
    // Calculates absolute speed vector
    const speed = Math.sqrt(vx * vx + vy * vy);
    
    // Stretch scaling based on speed. Converts circle into a "red line" when fast.
    const newStretch = 1 + Math.min(speed / 800, 2);
    stretch.set(newStretch);

    // Only update rotation if speed is significant to avoid rotation jitter on micro-movements
    if (speed > 50) {
      const angle = Math.atan2(vy, vx);
      // Convert Radians to Degrees for framer-motion
      rotation.set(angle * (180 / Math.PI)); 
    }
  });

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999]"
      style={{
        x: springX,
        y: springY,
        rotate: rotation,
        scaleX: stretch,
        // Preserve mass volume: Squash Y axis as X stretches
        scaleY: useTransform(stretch, (s) => 1 / s), 
        opacity: isVisible ? 1 : 0,
        backgroundColor: "#ff0000",
        boxShadow: "0 0 20px rgba(255, 0, 0, 0.4)", // Red glow to enhance the line effect
        transformOrigin: "center center",
        mixBlendMode: "screen" // Looks better on dark backgrounds
      }}
    />
  );
}
