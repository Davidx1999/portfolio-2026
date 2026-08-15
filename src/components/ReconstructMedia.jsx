import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, useReducedMotion } from 'framer-motion';

const EASING = [0.22, 1, 0.36, 1];
const ENTER_TILE_DURATION = 0.38;
const ENTER_INTERVAL = 0.25;
const TOTAL_ENTER_DURATION = 1.35;
const TOTAL_EXIT_DURATION = 1.35;

/**
 * Sub-componente de Tile Modular
 * Conectado exclusivamente ao MotionValue central de `progress` [0, 1].
 * Atualiza estilos diretamente na GPU sem re-renderizações do React.
 */
function ModularTile({ tile, progress, sourceFinal, cols, rows }) {
  const bgPosX = cols > 1 ? (tile.c / (cols - 1)) * 100 : 0;
  const bgPosY = rows > 1 ? (tile.r / (rows - 1)) * 100 : 0;

  const { startP, settleP, endP } = tile;

  // Keyframes derivados do progress central [0, 1]:
  // 0% a 70%: Opacidade 0 -> 1, Scale 0.94 -> 0.995, Deslocamento -> 0.5px, Rotação -> 0deg
  // 70% a 100%: Scale 0.995 -> 1.0, Deslocamento 0.5px -> 0px (acomodação suave)
  const opacity = useTransform(
    progress,
    [0, startP, settleP, 1],
    [0, 0, 1, 1],
    { clamp: true }
  );

  const scale = useTransform(
    progress,
    [0, startP, settleP, endP, 1],
    [0.94, 0.94, 0.995, 1.0, 1.0],
    { clamp: true }
  );

  const x = useTransform(
    progress,
    [0, startP, settleP, endP, 1],
    [tile.initialX, tile.initialX, 0.5, 0, 0],
    { clamp: true }
  );

  const y = useTransform(
    progress,
    [0, startP, settleP, endP, 1],
    [tile.initialY, tile.initialY, 0.5, 0, 0],
    { clamp: true }
  );

  const rotate = useTransform(
    progress,
    [0, startP, settleP, 1],
    [tile.initialRotate, tile.initialRotate, 0, 0],
    { clamp: true }
  );

  return (
    <div
      className="w-full h-full relative overflow-hidden pointer-events-none"
      style={{
        margin: '-1px', // Overlap contra sub-pixel gap em telas de alta densidade
        width: 'calc(100% + 2px)',
        height: 'calc(100% + 2px)',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}
    >
      <motion.div
        className="w-full h-full pointer-events-none"
        style={{
          opacity,
          scale,
          x,
          y,
          rotate,
          backgroundImage: `url(${sourceFinal})`,
          backgroundSize: `${cols * 100}% ${rows * 100}%`,
          backgroundPosition: `${bgPosX}% ${bgPosY}%`,
          backgroundRepeat: 'no-repeat',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
      />
    </div>
  );
}

/**
 * ReconstructMedia
 *
 * Arquitetura com controlador único centralizado de progresso (Framer Motion useMotionValue).
 * - Entrada: Reconstrução progressiva, legível e determinística.
 * - Saída: Rápida, coordenada e paralela (<= 280ms), proporcional ao progresso atual.
 * - Totalmente interruptível sem dessincronização, flicker ou timers concorrentes.
 */
export function ReconstructMedia({
  initialImage,
  finalImage,
  image, // fallback para imagem única
  alt = 'Project media showcase',
  isHovered: controlledIsHovered,
  interactive = false, // se true, gerencia próprio hover/focus/touch no wrapper
  rows = 3,
  cols = 4,
  aspectRatio = 'aspect-[16/10]',
  className = '',
  loading = 'lazy',
}) {
  const [internalHovered, setInternalHovered] = useState(false);
  const [isTouchRevealed, setIsTouchRevealed] = useState(false);
  const [imagesReady, setImagesReady] = useState(false);

  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const progress = useMotionValue(0);
  const prefersReducedMotion = useReducedMotion();

  const isRevealed = controlledIsHovered !== undefined ? controlledIsHovered : (internalHovered || isTouchRevealed);

  // Normalização de imagens
  const sourceFinal = finalImage || image || initialImage;
  const sourceInitial = initialImage || sourceFinal;
  const isSingleImage = !initialImage || initialImage === sourceFinal;

  // Pré-carregamento garantido para evitar renderizações incompletas
  useEffect(() => {
    let isMounted = true;
    const sources = [sourceInitial, sourceFinal].filter(Boolean);
    if (sources.length === 0) {
      setImagesReady(true);
      return;
    }

    let loaded = 0;
    sources.forEach((src) => {
      const img = new Image();
      img.src = src;
      if (img.complete) {
        loaded++;
        if (loaded >= sources.length && isMounted) {
          setImagesReady(true);
        }
      } else {
        img.onload = img.onerror = () => {
          loaded++;
          if (loaded >= sources.length && isMounted) {
            setImagesReady(true);
          }
        };
      }
    });

    return () => {
      isMounted = false;
    };
  }, [sourceInitial, sourceFinal]);

  // Touch observer para dispositivos móveis
  useEffect(() => {
    if (!interactive) return;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouch || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          setIsTouchRevealed(true);
        }
      },
      { threshold: [0.6] }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [interactive]);

  // Pré-computa as janelas de progresso normalizado de cada tile
  const tiles = useMemo(() => {
    const list = [];
    const totalTiles = rows * cols;
    const totalEnterTime = (totalTiles - 1) * ENTER_INTERVAL + ENTER_TILE_DURATION;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const sequenceIndex = r * cols + c;

        // Janela de progresso normalizada [0, 1]
        const startTime = sequenceIndex * ENTER_INTERVAL;
        const settleTime = startTime + 0.70 * ENTER_TILE_DURATION;
        const endTime = startTime + ENTER_TILE_DURATION;

        const startP = startTime / totalEnterTime;
        const settleP = settleTime / totalEnterTime;
        const endP = Math.min(1, endTime / totalEnterTime);

        // Deslocamentos iniciais
        const initialX = -6;
        const initialY = -6;
        const initialRotate = -0.75;

        list.push({
          key: `tile-${r}-${c}`,
          r,
          c,
          sequenceIndex,
          startP,
          settleP,
          endP,
          initialX,
          initialY,
          initialRotate,
        });
      }
    }
    return list;
  }, [rows, cols]);

  // Controlador único central de animação (Interruptível e coordenado)
  useEffect(() => {
    if (prefersReducedMotion || isSingleImage) {
      if (animationRef.current) animationRef.current.stop();
      progress.set(isRevealed ? 1 : 0);
      return;
    }

    // Interrompe imediatamente qualquer animação anterior em andamento
    if (animationRef.current) {
      animationRef.current.stop();
    }

    const currentProgress = progress.get();

    if (isRevealed) {
      // ENTRADA: Retoma do progresso atual até 1
      const remainingProgress = Math.max(0, 1 - currentProgress);
      const enterDuration = Math.max(0.1, remainingProgress * TOTAL_ENTER_DURATION);

      animationRef.current = animate(progress, 1, {
        duration: enterDuration,
        ease: EASING,
      });
    } else {
      // SAÍDA: Retorno no mesmo ritmo e velocidade da entrada (1.35s total)
      // Duração proporcional ao progresso atual
      const exitDuration = Math.max(0.1, currentProgress * TOTAL_EXIT_DURATION);

      animationRef.current = animate(progress, 0, {
        duration: exitDuration,
        ease: EASING,
      });
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, [isRevealed, prefersReducedMotion, isSingleImage]);

  // Derivações contínuas para camada base e camada de segurança
  const baseOpacity = useTransform(progress, [0, 1], [1, 0.2], { clamp: true });
  const baseScale = useTransform(progress, [0, 1], [1, 1.015], { clamp: true });
  const safetyOpacity = useTransform(progress, [0, 0.98, 1], [0, 0, 1], { clamp: true });

  if (!sourceFinal) {
    return (
      <div className={`w-full h-full bg-[#10110F] flex items-center justify-center ${aspectRatio} ${className}`}>
        <span className="font-mono text-xs text-white/30 tracking-widest uppercase">Sem Imagem</span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onPointerEnter={interactive ? () => setInternalHovered(true) : undefined}
      onPointerLeave={interactive ? () => setInternalHovered(false) : undefined}
      onFocus={interactive ? () => setInternalHovered(true) : undefined}
      onBlur={interactive ? () => setInternalHovered(false) : undefined}
      tabIndex={interactive ? 0 : undefined}
      className={`relative w-full overflow-hidden select-none bg-[#10110F] ${aspectRatio} ${className} ${
        interactive ? 'focus-visible:outline-2 focus-visible:outline-[#C7F000] focus-visible:outline-offset-2' : ''
      }`}
      aria-label={alt}
      style={{
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}
    >
      {/* 
        ========================================================================
        1. CAMADA BASE (ESTADO INICIAL: PROCESSO / WIREFRAME)
        ========================================================================
      */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          opacity: baseOpacity,
          scale: baseScale,
        }}
      >
        <img
          src={sourceInitial}
          alt={alt}
          loading={loading}
          className="w-full h-full object-cover filter saturate-[0.85] contrast-[0.96] brightness-[0.88]"
        />
      </motion.div>

      {/* 
        ========================================================================
        2. CAMADA DE SEGURANÇA CONTÍNUA (IMAGEM FINAL 100% RECONSTRUÍDA)
        ========================================================================
      */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          opacity: safetyOpacity,
          scale: 1.015,
        }}
      >
        <img
          src={sourceFinal}
          alt=""
          aria-hidden="true"
          loading={loading}
          className="w-full h-full object-cover filter saturate-100 contrast-100 brightness-100"
        />
      </motion.div>

      {/* 
        ========================================================================
        3. MATRIZ DE RECONSTRUÇÃO MODULAR CENTRALIZADA NO PROGRESS
        ========================================================================
      */}
      {!prefersReducedMotion && !isSingleImage && (
        <div
          className="absolute inset-0 w-full h-full grid pointer-events-none"
          style={{
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
          aria-hidden="true"
        >
          {tiles.map((tile) => (
            <ModularTile
              key={tile.key}
              tile={tile}
              progress={progress}
              sourceFinal={sourceFinal}
              cols={cols}
              rows={rows}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ReconstructMedia;
