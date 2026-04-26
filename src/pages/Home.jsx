import { Hero } from '../components/Hero';
import { BentoProjects } from '../components/BentoProjects';

export function Home() {
  return (
    <>
      {/* Removido o pt-32 para o Hero colar no topo! */}
      <main className="w-full pb-32">
        <Hero />
        <div className="mt-20">
          <BentoProjects />
        </div>
      </main>
    </>
  );
}