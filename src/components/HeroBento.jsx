function EyeCard() {
  return (
    <div className="rounded-[1px] bg-neutral-branco border border-neutral-carvao/10 flex items-center justify-center overflow-hidden relative group w-full h-full">
      {/* Eye Image */}
      <img
        src={`${import.meta.env.BASE_URL}assets/apoio/eye.jpg`}
        alt="Eye"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

function TagsCard() {
  return (
    <div className="rounded-[1px] bg-secondary/35 border border-neutral-carvao/10 flex flex-col items-start justify-center p-5 relative overflow-hidden w-full h-full">
      {/* Background Video */}
      <video
        src={`${import.meta.env.BASE_URL}assets/videos/mp3_.mp4`}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Organic SVG Background Blob */}
      <svg className="absolute -inset-2 w-full h-full text-secondary/60 fill-current z-10" viewBox="0 0 100 100">
        <path d="M20,50 Q10,20 50,15 T85,45 T65,80 T25,75 Z" />
      </svg>

      {/* Stacked Tags */}
      <div className="flex flex-col gap-1.5 z-20">
        {['DESIGN', 'THINKER', 'PROBLEM', 'SOLVER'].map((tag) => (
          <div
            key={tag}
            className="bg-neutral-carvao text-tertiary text-left w-fit py-1.5 px-2.5 text-[9px] md:text-[10px] font-mono tracking-[0.2em] font-semibold"
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}

function HandCard() {
  return (
    <div className="rounded-[1px] bg-neutral-branco border border-neutral-carvao/10 flex items-center justify-center overflow-hidden relative group w-full h-full">
      <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:6px_6px]" />
      {/* Technical SVG Hand/Pencil illustration */}
      <svg className="w-20 h-20 text-neutral-carvao/70 z-10 transition-transform duration-500 group-hover:rotate-3" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
        {/* Paper line */}
        <line x1="10" y1="80" x2="90" y2="80" strokeDasharray="3 3" />
        {/* Drafting grid */}
        <path d="M20 20h60v60H20z" strokeWidth="0.7" strokeDasharray="1 4" />
        {/* Pencil */}
        <path d="M65 25 L75 35 L40 70 L30 70 L30 60 Z" />
        <path d="M30 70 L33 60 M30 70 L40 67" />
        <path d="M70 30 L60 40 M65 35 L55 45" />
        {/* Wavy drawing line */}
        <path d="M10 80 Q 25 65 30 70" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function VideoCard({ src, className = "" }) {
  return (
    <div className={`rounded-[1px] border border-neutral-carvao/10 overflow-hidden relative group w-full h-full ${className}`}>
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  );
}

function AsteriskCard() {
  return (
    <div className="rounded-[1px] bg-neutral-carvao border border-neutral-carvao/10 flex items-center justify-center overflow-hidden relative group w-full h-full">
      {/* Asterisk Image */}
      <img
        src={`${import.meta.env.BASE_URL}assets/apoio/asterisco.png`}
        alt="Asterisk"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

function BentoGrid({ children }) {
  return (
    <div className="w-full max-w-[558px] lg:max-w-[620px] aspect-[280/289] lg:h-full lg:w-auto grid grid-rows-[30fr_45fr_25fr] gap-[8px] mx-auto lg:mx-0 lg:justify-self-end">
      {children}
    </div>
  );
}

function BentoRow({ cols, children }) {
  return (
    <div className={`grid ${cols} gap-[8px] h-full`}>
      {children}
    </div>
  );
}

export function HeroBento() {
  return (
    <BentoGrid>
      {/* Row 1: Columns 50% and 50% (Height 30%) */}
      <BentoRow cols="grid-cols-2">
        <EyeCard />
        <TagsCard />
      </BentoRow>

      {/* Row 2: Columns 70% and 30% (Height 45%) */}
      <BentoRow cols="grid-cols-[70fr_30fr]">
        <HandCard />
        <VideoCard src={`${import.meta.env.BASE_URL}assets/mp2_.mp4`} className="bg-semantic-yellow" />
      </BentoRow>

      {/* Row 3: Columns 70% and 30% (Height 25%) */}
      <BentoRow cols="grid-cols-[70fr_30fr]">
        <VideoCard src={`${import.meta.env.BASE_URL}assets/videos/lines.mp4`} className="bg-secondary/25" />
        <AsteriskCard />
      </BentoRow>
    </BentoGrid>
  );
}

