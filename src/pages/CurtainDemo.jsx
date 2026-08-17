import React from 'react';
import { usePageCurtain, PageCurtainStage, PageCurtainContent } from '../components/motion-ui/page-curtain';

const PAGE_ORDER = ['lp', 'work', 'about', 'contact'];
const TITLES = {
  lp: 'INÍCIO',
  work: 'PROJETOS',
  about: 'SOBRE',
  contact: "LET'S TALK",
};

export function CurtainDemo() {
  const {
    page,
    direction,
    isPending,
    curtainState,
    title,
    go,
    handleCoverComplete,
    handleRevealComplete,
  } = usePageCurtain({
    initialPage: 'work',
    pageOrder: PAGE_ORDER,
    titles: TITLES,
  });

  return (
    <div className="w-full min-h-screen bg-[#10110F] text-[#FBF9F6] font-sans p-6 md:p-12 flex flex-col justify-between relative overflow-hidden">
      {/* 1. STAGE: Anime.js Parallelogram Curtain & Independent Label */}
      <PageCurtainStage
        curtainState={curtainState}
        direction={direction}
        title={title}
        onCoverComplete={handleCoverComplete}
        onRevealComplete={handleRevealComplete}
      />

      {/* HEADER / CONTROLS */}
      <header className="max-w-4xl mx-auto w-full z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B6A9ED]/10 border border-[#B6A9ED]/30 text-[#B6A9ED] text-xs font-mono mb-2">
            <span className="w-2 h-2 rounded-full bg-[#C4FF00] animate-pulse" />
            ISOLATED COMPONENT PREVIEW
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-mono tracking-tight">
            Page Curtain (Anime.js)
          </h1>
        </div>

        {/* State Badge */}
        <div className="flex items-center gap-3 font-mono text-xs bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
          <span className="text-white/50">STATE:</span>
          <span className="text-[#C4FF00] font-bold uppercase">{curtainState}</span>
          <span className="text-white/30">|</span>
          <span className="text-white/50">DIR:</span>
          <span className="text-[#B6A9ED] font-bold uppercase">{direction}</span>
        </div>
      </header>

      {/* 2. DEMO CONTENT / LABELS TEST */}
      <main className="max-w-4xl mx-auto w-full my-auto py-12 z-10">
        <PageCurtainContent>
          <div className="bg-[#181917] border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl relative">
            {/* Top Tag */}
            <div className="text-xs font-mono text-[#B6A9ED] uppercase tracking-widest mb-4">
              Active Screen: <span className="text-white font-bold">{page.toUpperCase()}</span>
            </div>

            {/* Main Current View */}
            {page === 'work' && (
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white font-mono">
                  PROJETOS (Work)
                </h2>
                <p className="text-white/70 max-w-xl text-base md:text-lg leading-relaxed">
                  Este é o primeiro label de teste. Clique no botão abaixo para disparar a transição
                  diagonal com a cortina lilás e ver o label deslizar suavemente.
                </p>
              </div>
            )}

            {page === 'about' && (
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white font-mono">
                  SOBRE (About)
                </h2>
                <p className="text-white/70 max-w-xl text-base md:text-lg leading-relaxed">
                  Este é o segundo label de teste. A cortina inverte a geometria do paralelogramo
                  automaticamente ao navegar para frente ou para trás.
                </p>
              </div>
            )}

            {page === 'lp' && (
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white font-mono">
                  INÍCIO (Home LP)
                </h2>
                <p className="text-white/70 max-w-xl text-base md:text-lg leading-relaxed">
                  Ponto de partida da navegação principal.
                </p>
              </div>
            )}

            {page === 'contact' && (
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white font-mono">
                  LET'S TALK (Contact)
                </h2>
                <p className="text-white/70 max-w-xl text-base md:text-lg leading-relaxed">
                  Ponto final da sequência de navegação.
                </p>
              </div>
            )}

            {/* Test Trigger Buttons */}
            <div className="mt-8 pt-8 border-t border-white/10 flex flex-wrap gap-3">
              <span className="w-full text-xs font-mono text-white/40 uppercase mb-1">
                Disparar Transição com Labels:
              </span>

              <button
                type="button"
                disabled={isPending || page === 'work'}
                onClick={() => go('work')}
                className={`px-5 py-3 rounded-xl font-mono text-sm font-semibold transition-all ${
                  page === 'work'
                    ? 'bg-[#B6A9ED] text-[#10110F] cursor-default'
                    : 'bg-white/10 hover:bg-white/20 text-white active:scale-95 disabled:opacity-50'
                }`}
              >
                1. Ir para "PROJETOS"
              </button>

              <button
                type="button"
                disabled={isPending || page === 'about'}
                onClick={() => go('about')}
                className={`px-5 py-3 rounded-xl font-mono text-sm font-semibold transition-all ${
                  page === 'about'
                    ? 'bg-[#B6A9ED] text-[#10110F] cursor-default'
                    : 'bg-white/10 hover:bg-white/20 text-white active:scale-95 disabled:opacity-50'
                }`}
              >
                2. Ir para "SOBRE"
              </button>

              <button
                type="button"
                disabled={isPending || page === 'lp'}
                onClick={() => go('lp')}
                className={`px-5 py-3 rounded-xl font-mono text-sm font-semibold transition-all ${
                  page === 'lp'
                    ? 'bg-[#B6A9ED] text-[#10110F] cursor-default'
                    : 'bg-white/5 hover:bg-white/15 text-white/80 active:scale-95 disabled:opacity-50'
                }`}
              >
                ← INÍCIO (Voltar)
              </button>

              <button
                type="button"
                disabled={isPending || page === 'contact'}
                onClick={() => go('contact')}
                className={`px-5 py-3 rounded-xl font-mono text-sm font-semibold transition-all ${
                  page === 'contact'
                    ? 'bg-[#B6A9ED] text-[#10110F] cursor-default'
                    : 'bg-white/5 hover:bg-white/15 text-white/80 active:scale-95 disabled:opacity-50'
                }`}
              >
                LET'S TALK →
              </button>
            </div>
          </div>
        </PageCurtainContent>
      </main>

      {/* FOOTER INFO */}
      <footer className="max-w-4xl mx-auto w-full z-10 text-xs font-mono text-white/40 flex flex-col sm:flex-row justify-between gap-2 border-t border-white/10 pt-4">
        <span>Fórmula da cortina: Paralelogramo Clip-Path via Anime.js (0% a 100% cover & reveal)</span>
        <span>Movimento do label: Independente (t=0)</span>
      </footer>
    </div>
  );
}

export default CurtainDemo;
