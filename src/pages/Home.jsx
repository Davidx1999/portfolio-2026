import React from 'react';
import { HomeHero } from '../components/home/HomeHero';
import { CredibilitySection } from '../components/home/CredibilitySection';
import { FeaturedWorkSection } from '../components/home/FeaturedWorkSection';
import { PrinciplesGrid } from '../components/home/PrinciplesGrid';
import { StatementSection } from '../components/home/StatementSection';
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

        {/* 3. Trabalhos Selecionados (2 Viewports, Sticky Title, Pixel Reveal & Parallax) */}
        <FeaturedWorkSection />

        {/* 4. Princípios e Capacidades em Grid Modular Assimétrica */}
        <PrinciplesGrid />

        {/* 5. Declaração Profissional Tipográfica com Amplo Espaço Negativo */}
        <StatementSection />

        {/* 6. Galeria de Produção Sobreposta Reversível com o Scroll */}
        <OverlappingGallery />

        {/* 7. Prova Social (Oculta graciosamente se não houver dados autorizados) */}
        <TestimonialSection />

        {/* 8. Encerramento & Três Caminhos de Continuação */}
        <ClosingNavigation />
      </main>
    </div>
  );
}