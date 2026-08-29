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
import { RouteCurtainProvider, useRouteCurtain, CurtainLink } from './context/RouteCurtainContext';
import { RouteCurtainOverlay } from './components/RouteCurtainOverlay';
import { NotFound } from './pages/NotFound';
import { AppReadyProvider, useAppReady } from './context/AppReadyContext';
import { ErrorBoundary } from './ErrorBoundary';
import { useGlobalSmoothScroll } from './hooks/useGlobalSmoothScroll';
import {
  LanguageRouteWrapper,
  RootRedirect,
  LegacyRedirect,
  LegacyCaseRedirect,
} from './components/LanguageRouteWrapper';
import { SEOHead } from './components/SEOHead';
import { usePageTracking } from './hooks/usePageTracking';
import { AnalyticsConsent } from './components/AnalyticsConsent';

function AppContent() {
  useGlobalSmoothScroll();
  usePageTracking();
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return false;
    }
    return true;
  });
  const { isCurtainActive } = useRouteCurtain();
  const { setIsAppReady } = useAppReady();

  // Failsafe timer: ensures app scroll & visibility are unlocked under any circumstance
  useEffect(() => {
    if (!isLoading) return;
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsAppReady(true);
      document.body.style.overflow = '';
    }, 2000);
    return () => clearTimeout(timer);
  }, [isLoading, setIsAppReady]);

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
      <SEOHead />
      <Navbar />

      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <Routes>
          {/* Root / redirects to /en or saved language preference */}
          <Route path="/" element={<RootRedirect />} />

          {/* Prefixed language routes: /en and /pt */}
          <Route path="/:lang" element={<LanguageRouteWrapper />}>
            <Route index element={<Home />} />
            <Route path="work" element={<Work />} />
            <Route path="work/:slug" element={<CaseStudyPage />} />
            <Route path="cases/:slug" element={<Navigate to="../work" replace />} />
            <Route path="about" element={<AboutMe />} />
            <Route path="contact" element={<Contact />} />
            <Route path="talk" element={<Navigate to="../contact" replace />} />
            <Route path="lets-talk" element={<Navigate to="../contact" replace />} />
            <Route path="projects" element={<Navigate to="../work" replace />} />
            <Route path="projects/:slug" element={<Navigate to="../work" replace />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Legacy un-prefixed routes redirecting to localized equivalent */}
          <Route path="/work" element={<LegacyRedirect to="work" />} />
          <Route path="/cases" element={<LegacyRedirect to="work" />} />
          <Route path="/about" element={<LegacyRedirect to="about" />} />
          <Route path="/contact" element={<LegacyRedirect to="contact" />} />
          <Route path="/talk" element={<LegacyRedirect to="contact" />} />
          <Route path="/lets-talk" element={<LegacyRedirect to="contact" />} />
          <Route path="/projects" element={<LegacyRedirect to="work" />} />

          <Route path="/cases/:slug" element={<LegacyCaseRedirect />} />
          <Route path="/work/:slug" element={<LegacyCaseRedirect />} />
          <Route path="/project/:slug" element={<LegacyCaseRedirect />} />
          <Route path="/projects/:slug" element={<LegacyCaseRedirect />} />

          {/* Legacy specific slug shortcuts */}
          <Route path="/mapear" element={<LegacyRedirect to="work/mapear" />} />
          <Route path="/aula-f75" element={<LegacyRedirect to="work/aula-f75" />} />

          {/* Global catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="w-full bg-[#10110F] text-[#FAFAF7] border-t border-white/[0.08] py-5 sm:py-6 z-10 relative select-none">
        <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 text-[#F4F3EE]/40 font-mono text-xs text-center sm:text-left">
          <CurtainLink
            to="/"
            className="hover:text-[#FAFAF7] transition-colors focus-visible:outline-2 focus-visible:outline-[#C7F000]"
          >
            © 2026 David Salviano.
          </CurtainLink>
          <span className="uppercase tracking-[0.22em] text-[10px] sm:text-[11px] text-[#F4F3EE]/30">
            Accessing the Gates of Art
          </span>
        </div>
      </footer>

      {/* Initial Loading Screen (Only on first app visit) */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen
            key="loading"
            setIsAppReady={setIsAppReady}
            onComplete={() => {
              setIsLoading(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* Global Route Curtain Transition Overlay */}
      <RouteCurtainOverlay />

      {/* Analytics Cookie Consent Banner */}
      <AnalyticsConsent />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AppReadyProvider>
        <RouteCurtainProvider>
          <AppContent />
        </RouteCurtainProvider>
      </AppReadyProvider>
    </ErrorBoundary>
  );
}

export default App;
