import { Hero } from '../components/Hero';
import { FeaturedWork } from '../components/FeaturedWork';
import { MyApproach } from '../components/MyApproach';
import { FooterSection } from '../components/FooterSection';

export function Home() {
  return (
    <>
      {/* Removido o pt-32 para o Hero colar no topo! */}
      <main className="w-full">
        <Hero />
        <div className="mt-4">
          <FeaturedWork />
        </div>
        <div className="mt-16 md:mt-24">
          <MyApproach />
        </div>
        <div className="mt-16 md:mt-24">
          <FooterSection />
        </div>
      </main>
    </>
  );
}