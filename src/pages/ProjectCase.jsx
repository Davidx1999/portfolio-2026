import React, { useState, useRef, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MoveLeft, ExternalLink, Play, Pause, RefreshCw, Trophy, Cpu, Code, Palette, Type, ArrowRight } from 'lucide-react';
import { ALL_WORK } from '../data/allWork';
import { LimeActionButton, MagneticTextLink } from '../components/Buttons';
import { useLanguage } from '../context/LanguageContext';

// Live Interactive Canvas Sandbox Component for Experiments
function InteractiveSandbox({ projectId }) {
  const canvasRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    let mouse = { x: null, y: null };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const resize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let angle = 0;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      if (projectId === 'lattice' || projectId === 'generative-layouts') {
        // Draw grid lattice
        const cols = 15;
        const rows = 8;
        const colW = width / cols;
        const rowH = height / rows;

        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const cx = i * colW + colW / 2;
            const cy = j * rowH + rowH / 2;

            let dist = 1000;
            if (mouse.x !== null && mouse.y !== null) {
              const dx = mouse.x - cx;
              const dy = mouse.y - cy;
              dist = Math.sqrt(dx * dx + dy * dy);
            }

            const maxDist = 180;
            const factor = Math.max(0, 1 - dist / maxDist);
            const size = 3 + factor * 14;

            ctx.fillStyle = factor > 0.35 ? '#8B7EC8' : '#1A1A1A';
            ctx.strokeStyle = '#B6A9ED';
            ctx.lineWidth = 1;

            ctx.beginPath();
            ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
            ctx.fill();
            if (factor > 0.4) {
              ctx.stroke();
            }
          }
        }
      } else {
        // Draw interactive wave dots
        ctx.fillStyle = 'rgba(139, 126, 200, 0.7)';
        const count = 40;
        for (let i = 0; i < count; i++) {
          const x = (width / count) * i;
          let offset = 0;
          if (mouse.x !== null) {
            const d = Math.abs(mouse.x - x);
            if (d < 120) {
              offset = (120 - d) * 0.35 * Math.sin(angle + i * 0.25);
            }
          }
          const y = height / 2 + Math.sin(angle + i * 0.15) * 25 + offset;

          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fill();
        }
        angle += 0.035;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [projectId]);

  return (
    <div className="relative w-full h-64 border border-neutral-carvao/10 rounded-[2px] bg-background/50 overflow-hidden shadow-sm">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute top-2 left-2 pointer-events-none font-mono text-[7px] text-neutral-carvao/45 bg-background/70 px-2 py-0.5 rounded-sm border border-neutral-carvao/5 uppercase tracking-widest">
        {t('project_sandbox_title', 'Interactive Canvas Sandbox • Hover mouse to interact')}
      </div>
    </div>
  );
}

export function ProjectCase() {
  const { projectId } = useParams();
  const { t } = useLanguage();
  const project = ALL_WORK.find((w) => w.id === projectId);

  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedHex, setCopiedHex] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const videoRef = useRef(null);

  if (!project) {
    return <Navigate to="/cases" replace />;
  }

  // Animation page video play controls
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const copyHex = (hex) => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 1500);
    });
  };

  const copyCodeToClipboard = () => {
    if (!project.codeSnippet) return;
    navigator.clipboard.writeText(project.codeSnippet).then(() => {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 1500);
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  // Render Category Specific Sections
  const renderTypeLayout = () => {
    switch (project.workType) {
      case 'cases':
        return (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mt-16 border-t border-neutral-carvao/10 pt-16">
            <div className="md:col-span-4">
              <h2 className="text-xl md:text-2xl font-serif font-bold tracking-tight md:sticky md:top-32 text-neutral-carvao">
                {t('project_challenge_title', '01. The Challenge')}
              </h2>
            </div>
            <div className="md:col-span-8 text-neutral-carvao/75 text-base md:text-lg leading-relaxed font-light mb-12 md:mb-16">
              <p>{t('project_' + project.id + '_challenge', project.challenge)}</p>
            </div>

            <div className="md:col-span-4">
              <h2 className="text-xl md:text-2xl font-serif font-bold tracking-tight md:sticky md:top-32 text-[#E6A045]">
                {t('project_solution_title', '02. The Solution')}
              </h2>
            </div>
            <div className="md:col-span-8 text-neutral-carvao/75 text-base md:text-lg leading-relaxed font-light mb-12 md:mb-16">
              <p>{t('project_' + project.id + '_solution', project.solution)}</p>
            </div>

            <div className="md:col-span-4">
              <h2 className="text-xl md:text-2xl font-serif font-bold tracking-tight md:sticky md:top-32 text-[#8b7ec8]">
                {t('project_process_title', '03. Process & Engineering')}
              </h2>
            </div>
            <div className="md:col-span-8 text-neutral-carvao/75 text-base md:text-lg leading-relaxed font-light mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {t('project_' + project.id + '_process', project.process).map((step, idx) => (
                  <div key={idx} className="flex gap-4 items-start border border-neutral-carvao/10 bg-background/50 p-4 rounded-sm shadow-sm">
                    <div className="w-6 h-6 rounded-full bg-[#B3A0E6]/25 border border-neutral-carvao/10 flex items-center justify-center font-mono text-[9px] font-bold text-neutral-carvao flex-shrink-0">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <span className="font-sans font-bold text-xs uppercase tracking-wide text-neutral-carvao">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'animations':
        return (
          <div className="w-full mt-12 flex flex-col gap-12 bg-neutral-carvao -mx-4 md:-mx-24 px-4 md:px-24 py-16 text-[#fbf9f6] border-y border-neutral-branco/10 rounded-sm">
            {/* Cinematic Video Player Container */}
            <div className="flex flex-col gap-6 w-full">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--color-lime-500)] animate-pulse" />
                <h3 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#fbf9f6]/45">
                  {t('project_cinematic_player_title', 'Cinematic Screen Player')}
                </h3>
              </div>

              {/* Video Player Shell */}
              <div className="border border-neutral-branco/15 rounded-md overflow-hidden relative shadow-2xl bg-black aspect-[16/9] w-full flex items-center justify-center group/player">
                {project.videoUrl ? (
                  <video 
                    ref={videoRef}
                    src={project.videoUrl}
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    onClick={togglePlay}
                  />
                ) : (
                  <div className="text-[#fbf9f6]/30 font-mono text-xs uppercase tracking-widest">
                    {t('project_video_placeholder', 'Video File Placeholder')}
                  </div>
                )}
                
                {/* Control Overlay */}
                <div 
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-100 group-hover/player:opacity-100 transition-opacity duration-300 cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full border border-neutral-branco/30 bg-neutral-carvao/70 flex items-center justify-center text-[#fbf9f6] hover:scale-105 transition-all duration-300">
                    {isPlaying ? <Pause size={28} /> : <Play size={28} className="translate-x-0.5" />}
                  </div>
                </div>

                {/* Scrubber bottom bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex items-center gap-4 text-xs font-mono text-[#fbf9f6]/70">
                  <span className="text-[10px]">{isPlaying ? "0:12" : "0:00"}</span>
                  <div className="flex-1 h-1 bg-neutral-branco/25 rounded-full overflow-hidden relative">
                    <div 
                      className="absolute left-0 top-0 h-full bg-[#8B7EC8] transition-all duration-500" 
                      style={{ width: isPlaying ? '35%' : '0%' }}
                    />
                  </div>
                  <span className="text-[10px]">0:45</span>
                </div>
              </div>
            </div>

            {/* Video description metadata */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 w-full pt-8 border-t border-neutral-branco/10">
              <div className="md:col-span-4 flex flex-col gap-3">
                <span className="font-mono text-[9px] text-[#E6A045] font-bold uppercase tracking-wider">
                  {t('project_animation_concept', 'Concept')}
                </span>
                <h4 className="font-sans font-bold text-xl uppercase tracking-tight">
                  {t('project_' + project.id + '_concept', project.concept)}
                </h4>
              </div>
              <div className="md:col-span-5 text-[#fbf9f6]/75 text-sm md:text-base leading-relaxed font-light">
                <span className="font-mono text-[9px] text-[#B6A9ED] font-bold uppercase tracking-wider block mb-2">
                  {t('project_animation_narrative', 'Narrative & Story')}
                </span>
                <p>{t('project_' + project.id + '_story', project.story)}</p>
              </div>
              <div className="md:col-span-3 flex flex-col gap-4">
                <span className="font-mono text-[9px] text-[var(--color-lime-500)] font-bold uppercase tracking-wider">
                  {t('project_animation_stack', 'Production Stack')}
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.motionTools.map(tool => (
                    <span key={tool} className="border border-neutral-branco/15 bg-neutral-branco/5 px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider text-[#fbf9f6]/80 rounded-sm font-semibold">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'branding':
        return (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mt-16 border-t border-neutral-carvao/10 pt-16">
            {/* Brand philosophy */}
            <div className="md:col-span-4">
              <h2 className="text-xl md:text-2xl font-serif font-bold tracking-tight md:sticky md:top-32 text-neutral-carvao">
                {t('project_brand_concept_title', '01. Brand Concept')}
              </h2>
            </div>
            <div className="md:col-span-8 text-neutral-carvao/75 text-base md:text-lg leading-relaxed font-light mb-12 md:mb-16">
              <p>{t('project_' + project.id + '_brandConcept', project.brandConcept)}</p>
            </div>

            {/* Interactive Color Swatches */}
            <div className="md:col-span-4 flex flex-col gap-2">
              <h2 className="text-xl md:text-2xl font-serif font-bold tracking-tight md:sticky md:top-32 text-[#E6A045] flex items-center gap-2">
                <Palette size={20} /> {t('project_color_palette_title', '02. Color Palette')}
              </h2>
              <span className="font-mono text-[8px] text-neutral-carvao/45 uppercase tracking-widest hidden md:block">
                {t('project_copy_hex_hint', 'Click swatch to copy hex')}
              </span>
            </div>
            <div className="md:col-span-8 mb-12 md:mb-16">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {project.palette.map((color) => (
                  <div
                    key={color.hex}
                    onClick={() => copyHex(color.hex)}
                    className="group/swatch border border-neutral-carvao/10 rounded-[2px] overflow-hidden bg-background shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between aspect-[1/1.2] p-4 relative select-none"
                  >
                    <div 
                      className="w-full h-[65%] rounded-[2px] border border-neutral-carvao/5 shadow-inner transition-transform duration-300 group-hover/swatch:scale-[1.01]"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="flex flex-col mt-2">
                      <span className="font-sans font-bold text-xs text-neutral-carvao uppercase tracking-tight leading-none">
                        {color.name}
                      </span>
                      <span className="font-mono text-[9px] text-neutral-carvao/50 mt-1 uppercase">
                        {copiedHex === color.hex ? t('project_swatch_copied', 'COPIED! ✓') : color.hex}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography scale */}
            <div className="md:col-span-4">
              <h2 className="text-xl md:text-2xl font-serif font-bold tracking-tight md:sticky md:top-32 text-[#8b7ec8] flex items-center gap-2">
                <Type size={20} /> {t('project_typography_title', '03. Typography')}
              </h2>
            </div>
            <div className="md:col-span-8 mb-12 md:mb-16">
              <div className="border border-neutral-carvao/10 rounded-sm bg-background/50 p-6 md:p-8 flex flex-col gap-6 shadow-sm">
                <div className="flex flex-col gap-1.5 border-b border-neutral-carvao/5 pb-4">
                  <span className="font-mono text-[8px] text-neutral-carvao/45 uppercase tracking-widest">
                    {t('project_primary_serif', 'Primary Serif Typeface')}
                  </span>
                  <div className="font-serif text-2xl md:text-3xl text-neutral-carvao">{project.typography.serif}</div>
                  <div className="font-serif text-[10px] text-neutral-carvao/50 tracking-wider mt-1 uppercase">Aa Bb Cc Dd Ee Ff Gg Hh 12345</div>
                </div>
                <div className="flex flex-col gap-1.5 border-b border-neutral-carvao/5 pb-4">
                  <span className="font-mono text-[8px] text-neutral-carvao/45 uppercase tracking-widest">
                    {t('project_secondary_sans', 'Secondary Sans Typeface')}
                  </span>
                  <div className="font-sans text-2xl md:text-3xl text-neutral-carvao font-semibold">{project.typography.sans}</div>
                  <div className="font-sans text-[10px] text-neutral-carvao/50 tracking-wider mt-1 uppercase">Aa Bb Cc Dd Ee Ff Gg Hh 12345</div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="font-mono text-[8px] text-neutral-carvao/45 uppercase tracking-widest">
                    {t('project_metadata_mono', 'Metadata Mono Typeface')}
                  </span>
                  <div className="font-mono text-xl md:text-2xl text-neutral-carvao font-bold">{project.typography.mono}</div>
                  <div className="font-mono text-[9px] text-neutral-carvao/50 tracking-wider mt-1 uppercase">Aa Bb Cc Dd Ee Ff Gg Hh 12345</div>
                </div>
              </div>
            </div>

            {/* Mockups list */}
            <div className="md:col-span-4">
              <h2 className="text-xl md:text-2xl font-serif font-bold tracking-tight md:sticky md:top-32 text-neutral-carvao">
                {t('project_deliverables_title', '04. Deliverables')}
              </h2>
            </div>
            <div className="md:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.mockups.map((m, i) => (
                  <div key={i} className="border border-neutral-carvao/10 bg-background/50 rounded-sm p-4 flex flex-col justify-between aspect-video relative shadow-sm">
                    <span className="font-mono text-[8px] text-[#E6A045] font-bold">
                      {t('project_mockup_label', 'MOCKUP')} {i + 1}
                    </span>
                    <span className="font-sans font-bold text-xs uppercase text-neutral-carvao tracking-wide mt-2">
                      {t('project_' + project.id + '_mockup_' + i, m)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'experiments':
        return (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mt-16 border-t border-neutral-carvao/10 pt-16">
            {/* Tech stack specification */}
            <div className="md:col-span-4 flex flex-col gap-2">
              <h2 className="text-xl md:text-2xl font-serif font-bold tracking-tight md:sticky md:top-32 text-neutral-carvao flex items-center gap-2">
                <Cpu size={20} /> {t('project_specifications_title', '01. Specifications')}
              </h2>
            </div>
            <div className="md:col-span-8 mb-12 md:mb-16 flex flex-col gap-4">
              <p className="text-neutral-carvao/75 text-base leading-relaxed font-light">
                {t('project_' + project.id + '_challenge', project.challenge)}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.techStack.map(tech => (
                  <span key={tech} className="border border-neutral-carvao/15 bg-background/60 px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-neutral-carvao rounded-full font-bold">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive live canvas sandbox */}
            <div className="md:col-span-4">
              <h2 className="text-xl md:text-2xl font-serif font-bold tracking-tight md:sticky md:top-32 text-[#E6A045] flex items-center gap-2">
                <RefreshCw size={20} className="animate-spin-slow" /> {t('project_canvas_live_title', '02. Live Sandbox')}
              </h2>
            </div>
            <div className="md:col-span-8 mb-12 md:mb-16">
              <InteractiveSandbox projectId={project.id} />
            </div>

            {/* Code viewer block */}
            <div className="md:col-span-4">
              <h2 className="text-xl md:text-2xl font-serif font-bold tracking-tight md:sticky md:top-32 text-[#8b7ec8] flex items-center gap-2">
                <Code size={20} /> {t('project_code_snippet_title', '03. Code Snippet')}
              </h2>
            </div>
            <div className="md:col-span-8">
              <div className="border border-neutral-carvao/15 rounded-md overflow-hidden bg-neutral-carvao text-neutral-branco font-mono text-xs shadow-md">
                {/* Editor Top Bar */}
                <div className="h-8 bg-neutral-carvao/90 border-b border-background/10 flex items-center justify-between px-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500/80" />
                    <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                    <span className="w-2 h-2 rounded-full bg-green-500/80" />
                    <span className="text-[9px] text-[#fbf9f6]/40 ml-2">sandbox.js</span>
                  </div>
                  <button 
                    onClick={copyCodeToClipboard}
                    className="text-[8px] text-[#fbf9f6]/60 hover:text-[#fbf9f6] uppercase tracking-widest bg-background/5 px-2 py-0.5 rounded-sm border border-background/10 cursor-pointer transition-colors"
                  >
                    {copiedCode ? t('project_code_copied', 'COPIED ✓') : t('project_copy_code', 'COPY CODE')}
                  </button>
                </div>
                {/* Syntax Code block */}
                <pre className="p-4 overflow-x-auto text-[11px] leading-relaxed max-h-72 text-[#fbf9f6]/85 bg-neutral-carvao select-all">
                  <code>{project.codeSnippet}</code>
                </pre>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen w-full pt-32 pb-24 px-4 md:px-[calc(16%-24px)] bg-background">
      <div className="w-full">
        
        {/* Back Link */}
        <MagneticTextLink 
          as={Link}
          to="/cases" 
          theme="dark"
          className="mb-12"
        >
          <MoveLeft size={14} className="transform transition-transform duration-300 group-hover/link:-translate-x-1" />
          {t('project_back_link', 'Back to Work')}
        </MagneticTextLink>

        {/* Project Header */}
        <header className="mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-[1px] bg-neutral-carvao/25" />
            <span className="text-[10px] tracking-[0.2em] text-neutral-carvao/50 font-mono uppercase font-bold">
              {project.workType === 'cases' 
                ? t('cases_card_case_study', 'Case Study') 
                : t('project_type_' + project.workType, project.workType.toUpperCase())} // {t('category_' + project.category.toLowerCase().replace(/[^a-z0-9]+/g, '_'), project.category)}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[3rem] md:text-[5rem] lg:text-[6rem] font-serif font-normal tracking-tight leading-[0.95] mb-6 text-neutral-carvao uppercase"
          >
            {project.title}.
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12"
          >
            <p className="max-w-2xl text-neutral-carvao/75 text-base md:text-lg leading-relaxed font-light">
              {t('project_' + project.id + '_description', project.description)}
            </p>

            {project.liveLinks ? (
              <div className="flex flex-col sm:flex-row gap-3">
                {project.liveLinks.map((link, idx) => (
                  <a 
                    key={idx}
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`${
                      link.type === 'primary' 
                        ? 'bg-primary text-neutral-branco hover:bg-[#7b6db8]' 
                        : 'bg-[#B6A9ED]/25 text-neutral-carvao/45 hover:bg-[#B6A9ED]/40 border border-neutral-carvao/10'
                    } px-6 py-3.5 rounded-[2px] font-mono text-[9px] font-bold uppercase tracking-widest flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md whitespace-nowrap w-max`}
                  >
                    {t('project_' + project.id + '_link_' + idx, link.label)}
                    <ExternalLink size={12} strokeWidth={2.5} />
                  </a>
                ))}
              </div>
            ) : project.liveLink ? (
              <a 
                href={project.liveLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-primary text-neutral-branco px-6 py-3.5 rounded-[2px] font-mono text-[9px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-[#7b6db8] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md whitespace-nowrap w-max"
              >
                {t('project_view_live', 'View Live Project')}
                <ExternalLink size={12} strokeWidth={2.5} />
              </a>
            ) : null}
          </motion.div>

          {/* Grid of details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-neutral-carvao/10"
          >
            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] font-mono text-neutral-carvao/45 uppercase tracking-widest font-bold">
                {t('project_meta_role', 'Role')}
              </span>
              <span className="text-xs text-neutral-carvao font-bold">
                {t('role_' + (project.role || 'designer').toLowerCase().replace(/[^a-z0-9]+/g, '_'), project.role || "Designer")}
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] font-mono text-neutral-carvao/45 uppercase tracking-widest font-bold">
                {t('project_meta_year', 'Year')}
              </span>
              <span className="text-xs text-neutral-carvao font-bold">{project.year}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] font-mono text-neutral-carvao/45 uppercase tracking-widest font-bold">
                {t('project_meta_category', 'Work Category')}
              </span>
              <span className="text-xs text-neutral-carvao font-bold">
                {t('category_' + project.category.toLowerCase().replace(/[^a-z0-9]+/g, '_'), project.category)}
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] font-mono text-neutral-carvao/45 uppercase tracking-widest font-bold">
                {t('project_meta_disciplines', 'Disciplines')}
              </span>
              <span className="text-xs text-neutral-carvao font-bold">
                {project.disciplines 
                  ? project.disciplines.map(d => t('discipline_' + d.toLowerCase().replace(/[^a-z0-9]+/g, '_'), d)).join(" & ") 
                  : t('discipline_design_layout', "Design & Layout")}
              </span>
            </div>
          </motion.div>
        </header>

        {/* Hero Banner Image (visible for non-cinematic modes, or specifically for Vincenzo Fadda to showcase cover images) */}
        {(project.workType !== 'animations' || project.id === 'vincenzo') && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full h-[45vh] md:h-[60vh] rounded-[2px] bg-neutral-carvao/5 border border-neutral-carvao/10 flex flex-col items-center justify-center mb-16 overflow-hidden relative group shadow-sm select-none"
          >
            {project.image ? (
              <>
                {(project.imageHover && project.id !== 'vincenzo') ? (
                  <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-neutral-carvao/10">
                    <img 
                      src={project.image} 
                      alt={`${project.title} Cover 1`} 
                      className="w-full h-full object-cover opacity-95 transition-all duration-700" 
                    />
                    <img 
                      src={project.imageHover} 
                      alt={`${project.title} Cover 2`} 
                      className="w-full h-full object-cover opacity-95 transition-all duration-700" 
                    />
                  </div>
                ) : (
                  <img 
                    src={project.heroImage || project.image} 
                    alt={project.title} 
                    className={`w-full h-full object-cover ${
                      (project.id === 'vincenzo' || project.id === 'focusly' || project.id === 'aula-f75' || project.workType === 'cases') ? '' : 'grayscale opacity-90'
                    } transition-all duration-700`} 
                  />
                )}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay bg-repeat z-10"
                  style={{ 
                    backgroundImage: `url('${import.meta.env.BASE_URL}assets/Textures/texture.png')`, 
                    backgroundSize: '120px 120px' 
                  }}
                />
              </>
            ) : (
              <span className="text-neutral-carvao/40 font-mono tracking-widest text-xs uppercase relative z-10 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-neutral-carvao/30 animate-pulse"></div>
                {t('project_hero_image_placeholder', 'Hero Image')}
              </span>
            )}
          </motion.div>
        )}

        {/* Dynamic Category Layout Content */}
        {renderTypeLayout()}

        {/* Next Project Footer Link */}
        <div className="w-full py-12 mt-16 border-t border-neutral-carvao/10">
          <Link
            to="/cases"
            className="group flex items-center justify-between border border-neutral-carvao/10 bg-background/40 hover:bg-neutral-carvao/5 p-6 rounded-sm transition-colors duration-300"
          >
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[8px] uppercase tracking-widest text-[#E6A045] font-bold">
                {t('project_browse_work', 'Browse Work')}
              </span>
              <span className="font-sans font-bold text-base text-neutral-carvao uppercase">
                {t('project_view_all', 'View All Projects & Cases')}
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[var(--color-lime-500)]/30 group-hover:bg-[var(--color-lime-500)] flex items-center justify-center text-neutral-carvao transition-colors duration-300">
              <ArrowRight size={14} className="transform transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
          </Link>
        </div>

      </div>
    </main>
  );
}
