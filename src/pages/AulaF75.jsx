import { PageTransition } from '../components/PageTransition';

export function AulaF75() {
  return (
    <PageTransition>
      <main className="max-w-[1400px] mx-auto px-6 md:px-16 pt-32 pb-32">
        <div className="max-w-3xl">
          <span className="text-zinc-500 font-mono text-sm tracking-widest uppercase mb-4 block">Product Landing Page</span>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-zinc-100 leading-none mb-8">
            AULA F75 Antigravity
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed mb-6">
            Página construída sob demanda para visualização 3D e promoção do teclado mecânico premium AULA F75.
          </p>
          <a 
            href="/AULA F75 ANTIGRAVITY/index.html" 
            className="inline-block bg-zinc-100 text-zinc-950 px-8 py-4 rounded-full font-semibold transition-colors hover:bg-white"
          >
            Acessar Site do AULA F75
          </a>
        </div>
      </main>
    </PageTransition>
  );
}
