import { Hero } from '../components/Hero';
import { BentoProjects } from '../components/BentoProjects';

export function Home() {
  return (
    <>
      <main className="mx-auto pt-16 pb-32">
        <Hero />
        <div className="mt-20">
          <BentoProjects />
        </div>
      </main>
    </>
  );
}
