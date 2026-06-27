import { Hero } from '../components/Hero';
import { WhatIDo } from '../components/WhatIDo';
import { FeaturedWork } from '../components/FeaturedWork';
import { MyApproach } from '../components/MyApproach';
import { FooterSection } from '../components/FooterSection';

export function Home() {
  return (
    <>
      {/* Removido o pt-32 para o Hero colar no topo! */}
      <main className="w-full">
        <Hero />
        <WhatIDo />
        {/* FeaturedWork slides over WhatIDo with higher z-index and bg */}
        <div className="relative z-10 bg-[var(--color-background)] lg:-mt-[100vh]">
          <FeaturedWork />
        </div>

        {/* MyApproach & FooterSection slide over FeaturedWork with higher z-index (z-20) and bg */}
        <div className="relative z-20 bg-white lg:-mt-[100vh] flex flex-col min-h-screen">
          <MyApproach />
          <FooterSection className="flex-grow" />
        </div>
      </main>
    </>
  );
}