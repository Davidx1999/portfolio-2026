import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { AboutMe } from './pages/AboutMe';
import { Contact } from './pages/Contact';
import { CaseStudyPage } from './pages/CaseStudyPage';
import { LoadingScreen } from './components/LoadingScreen';
import { PageTransition } from './components/PageTransition';
import { MouseFollower } from './components/MouseFollower';

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [renderedLocation, setRenderedLocation] = useState(location);
  const prevPathRef = useRef(location.pathname);
  const timersRef = useRef([]);

  // Lock scroll during initial load OR page transition
  useEffect(() => {
    document.body.style.overflow = (isLoading || isTransitioning) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isLoading, isTransitioning]);

  // Watch for route changes — only fires after initial load is done
  useEffect(() => {
    if (isLoading) return; // Ignore navigation while the initial loader is up

    const nextPath = location.pathname;
    if (nextPath === prevPathRef.current) return;

    prevPathRef.current = nextPath;

    // Clear any lingering timers from rapid navigation
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    setIsTransitioning(true);

    // After fade-in covers screen (350ms), swap the rendered route
    const t1 = setTimeout(() => {
      setRenderedLocation(location);
      window.scrollTo(0, 0);
    }, 350);

    // After route is rendered + overlay fades out (350ms more), end transition
    const t2 = setTimeout(() => {
      setIsTransitioning(false);
    }, 800);

    timersRef.current = [t1, t2];

    return () => timersRef.current.forEach(clearTimeout);
  }, [location.pathname, isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="w-full min-h-[100dvh] font-sans overflow-x-clip text-foreground relative bg-[#10110F]">
      <MouseFollower />

      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={renderedLocation} key={renderedLocation.pathname}>
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
      </AnimatePresence>

      <footer className="w-full bg-[#10110F] text-[#FAFAF7] border-t border-[rgba(244,243,238,0.16)] py-12 z-10 relative">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col md:flex-row justify-between items-center text-[#F4F3EE]/50 font-mono text-sm text-center md:text-left">
          <span>© 2026 David Salviano.</span>
          <span className="uppercase mt-4 md:mt-0 tracking-[0.2em] text-xs text-[#F4F3EE]/60">Accessing the Gates of Art</span>
        </div>
      </footer>

      {/* Initial Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen key="loading" onComplete={() => {
            setIsLoading(false);
            setRenderedLocation(location);
          }} />
        )}
      </AnimatePresence>

      {/* Page Transition Overlay (fade in/out on navigation) */}
      <AnimatePresence>
        {isTransitioning && (
          <PageTransition key={`transition-${location.pathname}`} pathname={location.pathname} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
