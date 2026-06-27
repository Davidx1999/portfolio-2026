import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Cases } from './pages/Cases';
import { Mapear } from './pages/Mapear';
import { AulaF75 } from './pages/AulaF75';
import { Vincenzo } from './pages/Vincenzo';
import { AboutMe } from './pages/AboutMe';
import { ProjectCase } from './pages/ProjectCase';
import { Contact } from './pages/Contact';
import { LoadingScreen } from './components/LoadingScreen';
import { PageTransition } from './components/PageTransition';
import { MouseFollower } from './components/MouseFollower';

function NavigateToProject() {
  const { projectId } = useParams();
  if (projectId === 'mapear') {
    return <Navigate to="/mapear" replace />;
  }
  return <Navigate to={`/project/${projectId}`} replace />;
}

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
    <div className="w-full min-h-[100dvh] font-sans overflow-x-clip text-foreground paper-texture relative">
      <MouseFollower />

      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={renderedLocation} key={renderedLocation.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/projects" element={<Navigate to="/cases" replace />} />
          <Route path="/projects/:projectId" element={<NavigateToProject />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mapear" element={<Mapear />} />
          <Route path="/aula-f75" element={<AulaF75 />} />
          <Route path="/vincenzo" element={<Vincenzo />} />
          <Route path="/project/:projectId" element={<ProjectCase />} />
        </Routes>
      </AnimatePresence>

      <footer className="w-full border-t border-neutral-carvao/10 py-12 px-4 md:px-[calc(16%-24px)] text-center md:text-left flex flex-col md:flex-row justify-between items-center text-neutral-carvao/50 font-mono text-sm z-10 relative">
        <span>© 2026 David Salviano.</span>
        <span className="uppercase mt-4 md:mt-0 tracking-[0.2em] text-xs">Accessing the Gates of Art</span>
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
