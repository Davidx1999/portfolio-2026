import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const ROWS = 6;
const COLS = 8;
const EASING = [0.22, 1, 0.36, 1];

export function PixelTileReveal({
  imageSrc,
  isHovered,
  className = '',
}) {
  const prefersReducedMotion = useReducedMotion();

  // Precompute grid tiles with radial clockwise delay distribution
  const tiles = useMemo(() => {
    const list = [];
    const centerR = (ROWS - 1) / 2;
    const centerC = (COLS - 1) / 2;

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const dx = c - centerC;
        const dy = r - centerR;
        let angle = Math.atan2(dy, dx);
        if (angle < 0) angle += 2 * Math.PI;

        const distance = Math.sqrt(dx * dx + dy * dy);
        const angleProgress = angle / (2 * Math.PI);
        const delay = angleProgress * 0.28 + (distance / 6) * 0.1;

        list.push({
          key: `${r}-${c}`,
          r,
          c,
          delay,
          initialRotate: (dx > 0 ? 1 : -1) * (12 + (r + c) * 2),
        });
      }
    }
    return list;
  }, []);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* 
        CAMADA DE SEGURANÇA CONTÍNUA:
        A segunda imagem fica renderizada integralmente por baixo dos tiles durante a transição.
        Assim, qualquer microfresta ou antialiasing de subpixel exibe a nova imagem, NUNCA a anterior.
      */}
      <div
        className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500 ease-out ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <img
          src={imageSrc}
          alt=""
          className="w-full h-full object-cover scale-[1.02]"
        />
      </div>

      {/* 
        GRID DE TILES PIXELIZADOS COM SOBREPOSIÇÃO DE 2PX E OVERSCALE:
        Elimina gaps, remove bordas e garante transição sólida e sem seams.
      */}
      {!prefersReducedMotion && (
        <div
          className="absolute inset-0 w-full h-full grid pointer-events-none"
          style={{
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
        >
          {tiles.map((tile) => {
            const bgPosX = COLS > 1 ? (tile.c / (COLS - 1)) * 100 : 0;
            const bgPosY = ROWS > 1 ? (tile.r / (ROWS - 1)) * 100 : 0;

            return (
              <div
                key={tile.key}
                className="w-full h-full relative overflow-hidden"
                style={{
                  margin: '-1px',
                  width: 'calc(100% + 2px)',
                  height: 'calc(100% + 2px)',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                }}
              >
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1.04 : 0.15,
                    rotate: isHovered ? 0 : tile.initialRotate,
                  }}
                  transition={{
                    duration: isHovered ? 0.6 : 0.4,
                    delay: isHovered ? tile.delay : (0.28 - tile.delay * 0.5),
                    ease: EASING,
                  }}
                  className="w-full h-full"
                  style={{
                    backgroundImage: `url(${imageSrc})`,
                    backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
                    backgroundPosition: `${bgPosX}% ${bgPosY}%`,
                    backgroundRepeat: 'no-repeat',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
