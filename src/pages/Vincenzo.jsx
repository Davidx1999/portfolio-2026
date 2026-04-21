import { PageTransition } from '../components/PageTransition';

export function Vincenzo() {
  return (
    <PageTransition>
      <main className="max-w-[1400px] mx-auto px-6 md:px-16 pt-32 pb-32">
        <div className="max-w-3xl">
          <span className="text-zinc-500 font-mono text-sm tracking-widest uppercase mb-4 block">Retro UI & Data Science</span>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-zinc-100 leading-none mb-8">
            Terminal Vincenzo
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed mb-6">
            Plataforma Retro-OS combinada com matrizes de computação e algoritmos estocásticos para visualização de portfólio em Data Science do colega Vincenzo Fadda.
          </p>
          <a 
            href="/vincenzosite/teste.html" 
            className="inline-block bg-zinc-100 text-zinc-950 px-8 py-4 rounded-full font-semibold transition-colors hover:bg-white"
          >
            Acessar Terminal Vincenzo
          </a>
        </div>
      </main>
    </PageTransition>
  );
}
