import { PageTransition } from '../components/PageTransition';

export function Mapear() {
  return (
    <PageTransition>
      <main className="max-w-[1400px] mx-auto px-6 md:px-16 pt-32 pb-32">
        <div className="max-w-3xl">
          <span className="text-zinc-500 font-mono text-sm tracking-widest uppercase mb-4 block">Case Study</span>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-zinc-100 leading-none mb-8">
            Projeto Mapear
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed mb-12">
            Um estudo de caso cobrindo 4 anos de desenvolvimento focado em criar um sistema de interfaces de alta performance, melhorando drasticamente a usabilidade (IHC) e orquestrando handoffs impecáveis para os engenheiros.
          </p>
        </div>

        <div className="w-full aspect-video bg-zinc-900 border border-zinc-800 rounded-[2.5rem] flex items-center justify-center p-8 mb-16 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-tr from-zinc-800/20 to-transparent"></div>
             <span className="text-zinc-600 font-mono text-sm">[ Diagrama Arquitetural / Visualizações do Projeto ]</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-zinc-400">
           <div>
              <h3 className="text-2xl font-semibold text-zinc-200 mb-4">Experiência do Usuário (UX)</h3>
              <p className="leading-relaxed">A plataforma Mapear foi construída com a premissa de simplificar dados ultra-complexos.</p>
           </div>
           <div>
              <h3 className="text-2xl font-semibold text-zinc-200 mb-4">Lossless Handoff</h3>
              <p className="leading-relaxed">Meu trabalho atuou diretamente como ponte. Criei protótipos em alta fidelidade onde 100% das métricas eram transpostas perfeitamente para código.</p>
           </div>
        </div>
      </main>
    </PageTransition>
  );
}
