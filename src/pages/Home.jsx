import React from 'react';
import { HomeHero } from '../components/home/HomeHero';
import { CredibilitySection } from '../components/home/CredibilitySection';
import { FeaturedWorkSection } from '../components/home/FeaturedWorkSection';
import { PrinciplesGrid } from '../components/home/PrinciplesGrid';
import { OverlappingGallery } from '../components/home/OverlappingGallery';
import { TestimonialSection } from '../components/home/TestimonialSection';
import { ClosingNavigation } from '../components/home/ClosingNavigation';

export function Home() {
  return (
    <div className="theme-homepage w-full min-h-screen overflow-x-clip bg-[#F1F0EB] text-[#111210]">
      <main className="w-full">
        {/* 1. Hero com proporção 42%/58%, tipografia editorial e vídeo de processo */}
        <HomeHero />

        {/* 2. Credibilidade, Posicionamento e Provas Técnicas */}
        <CredibilitySection />

        {/* 3. Trabalhos Selecionados (Scroll Natural, Sticky Title, Pixel Reveal & Parallax) */}
        <FeaturedWorkSection />

        {/* 4. Posicionamento e Capacidades (Bloco Tipográfico Cinético) */}
        <PrinciplesGrid />

        {/* 5. Galeria de Produção Real ("Da estratégia ao componente final") */}
        <OverlappingGallery />

        {/* 7. Prova Social (Oculta graciosamente se não houver dados autorizados) */}
        <TestimonialSection />

        {/* 8. Encerramento & Três Caminhos de Continuação */}
        <ClosingNavigation />
      </main>
    </div>
  );
}