import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { BackgroundParticles } from './components/BackgroundParticles';
import { Home } from './pages/Home';
import { Cases } from './pages/Cases';
import { Mapear } from './pages/Mapear';
import { AulaF75 } from './pages/AulaF75';
import { Vincenzo } from './pages/Vincenzo';
import { AboutMe } from './pages/AboutMe';
import { Projects } from './pages/Projects';
import { ProjectCase } from './pages/ProjectCase';
import { Contact } from './pages/Contact';
import { LoadingScreen } from './components/LoadingScreen';
import { MouseFollower } from './components/MouseFollower';

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full min-h-[100dvh] font-sans overflow-x-hidden text-foreground paper-texture">
      <MouseFollower />
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Navbar />

            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/cases" element={<Cases />} />
                <Route path="/about" element={<AboutMe />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/mapear" element={<Mapear />} />
                <Route path="/aula-f75" element={<AulaF75 />} />
                <Route path="/vincenzo" element={<Vincenzo />} />
                <Route path="/project/:projectId" element={<ProjectCase />} />
              </Routes>
            </AnimatePresence>

            <footer className="w-full border-t border-neutral-carvao/10 py-12 px-6 md:px-[120px] text-center md:text-left flex flex-col md:flex-row justify-between items-center text-neutral-carvao/50 font-mono text-sm z-10 relative">
              <span>© 2026 David Salviano.</span>
              <span className="uppercase mt-4 md:mt-0 tracking-[0.2em] text-xs">Accessing the Gates of Art</span>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
