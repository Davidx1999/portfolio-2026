import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { BackgroundParticles } from './components/BackgroundParticles';
import { Home } from './pages/Home';
import { Mapear } from './pages/Mapear';
import { AulaF75 } from './pages/AulaF75';
import { Vincenzo } from './pages/Vincenzo';
import { AboutMe } from './pages/AboutMe';
import { Projects } from './pages/Projects';
import { ProjectCase } from './pages/ProjectCase';
import { LoadingScreen } from './components/LoadingScreen';
import { MouseFollower } from './components/MouseFollower';

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full min-h-[100dvh] font-sans overflow-x-hidden text-foreground selection:bg-white/10 selection:text-white">
      <MouseFollower />
      <BackgroundParticles />
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
                <Route path="/about" element={<AboutMe />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/mapear" element={<Mapear />} />
                <Route path="/aula-f75" element={<AulaF75 />} />
                <Route path="/vincenzo" element={<Vincenzo />} />
                <Route path="/project/:projectId" element={<ProjectCase />} />
              </Routes>
            </AnimatePresence>

            <footer className="w-full border-t border-zinc-900 py-12 px-6 md:px-16 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-zinc-500 font-mono text-sm max-w-[1400px] mx-auto z-10 relative">
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
