import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { AboutMe } from './pages/AboutMe';
import { Contact } from './pages/Contact';
import { CaseStudyPage } from './pages/CaseStudyPage';
import { LoadingScreen } from './components/LoadingScreen';
import { MouseFollower } from './components/MouseFollower';
import { RouteCurtainProvider, useRouteCurtain, CurtainLink } from './context/RouteCurtainContext';
import { RouteCurtainOverlay } from './components/RouteCurtainOverlay';

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const { isCurtainActive } = useRouteCurtain();

  // Lock scroll during initial load OR when curtain transition is active
  useEffect(() => {
    document.body.style.overflow = isLoading || isCurtainActive ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading, isCurtainActive]);

  return (
    <div
      aria-busy={isCurtainActive}
      className="w-full min-h-[100dvh] font-sans overflow-x-clip text-foreground relative bg-[#10110F]"
    >
      <MouseFollower />

      <Navbar />

      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/cases" element={<Work />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/talk" element={<Navigate to="/contact" replace />} />
          <Route path="/lets-talk" element={<Navigate to="/contact" replace />} />
          <Route path="/projects" element={<Navigate to="/work" replace />} />

          {/* Unified Dynamic Case Study Routes */}
          <Route path="/cases/:slug" element={<CaseStudyPage />} />
          <Route path="/work/:slug" element={<CaseStudyPage />} />
          <Route path="/project/:slug" element={<CaseStudyPage />} />
          <Route path="/projects/:slug" element={<CaseStudyPage />} />

          {/* Legacy Slug Shortcuts */}
          <Route path="/mapear" element={<Navigate to="/cases/mapear" replace />} />
          <Route path="/aula-f75" element={<Navigate to="/cases/aula-f75" replace />} />
          <Route path="/vincenzo" element={<Navigate to="/cases/vincenzo" replace />} />
        </Routes>
      </main>

      <footer className="w-full bg-[#10110F] text-[#FAFAF7] border-t border-[rgba(244,243,238,0.16)] py-12 z-10 relative">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col md:flex-row justify-between items-center text-[#F4F3EE]/50 font-mono text-sm text-center md:text-left">
          <CurtainLink
            to="/"
            className="hover:text-[#FAFAF7] transition-colors focus-visible:outline-2 focus-visible:outline-[#C7F000]"
          >
            © 2026 David Salviano.
          </CurtainLink>
          <span className="uppercase mt-4 md:mt-0 tracking-[0.2em] text-xs text-[#F4F3EE]/60">
            Accessing the Gates of Art
          </span>
        </div>
      </footer>

      {/* Initial Loading Screen (Only on first app visit) */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen
            key="loading"
            onComplete={() => {
              setIsLoading(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* Global Route Curtain Transition Overlay */}
      <RouteCurtainOverlay />
    </div>
  );
}

function App() {
  return (
    <RouteCurtainProvider>
      <AppContent />
    </RouteCurtainProvider>
  );
}

export default App;
