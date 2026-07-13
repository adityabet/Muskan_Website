import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import Lenis from "lenis";

// Import custom components
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import CinematicVideo from "./components/CinematicVideo";
import Projects from "./components/Projects";
import StatsAndTestimonials from "./components/StatsAndTestimonials";
import InspirationGrid from "./components/InspirationGrid";
import ConsultationForm from "./components/ConsultationForm";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ChapterHUD from "./components/ChapterHUD";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Sync theme with HTML DOM element - strictly light mode
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }, []);

  const [loadedCount, setLoadedCount] = useState(0);
  const [minimumTimeElapsed, setMinimumTimeElapsed] = useState(false);

  // Simulate premium intro loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinimumTimeElapsed(true);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  // Preload all 65 cinematic frames
  useEffect(() => {
    let loaded = 0;
    const total = 65;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= total; i++) {
      const img = new Image();
      const num = String(i).padStart(2, "0");
      img.src = `/60FPS/frame_${num}.jpg`;
      
      const onImageLoad = () => {
        loaded++;
        setLoadedCount(loaded);
      };

      img.onload = onImageLoad;
      img.onerror = onImageLoad; // count errors too so we don't get stuck
      images.push(img);
    }
  }, []);

  // Hide loader only when both minimum time has passed and frames are fully loaded
  useEffect(() => {
    if (minimumTimeElapsed && loadedCount >= 65) {
      setIsLoading(false);
    }
  }, [minimumTimeElapsed, loadedCount]);

  // Initialize Lenis for smooth momentum-scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard easing
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Top Gold Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#C5A059] origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      {/* Chapter Indicator HUD */}
      <ChapterHUD />

      {/* Custom Cursor follower */}
      <CustomCursor />

      {/* Cinematic Curtain Loader */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 bg-[#1C1A17] text-[#FAF9F6] flex flex-col items-center justify-center p-6"
          >
            <div className="text-center space-y-4">
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A870]"
              >
                Atelier Mumbai • Goa • Delhi
              </motion.span>
              
              <div className="overflow-hidden h-20 flex items-center justify-center">
                <motion.h1
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                  className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-[0.18em] uppercase font-semibold"
                >
                  Muskan Singh
                </motion.h1>
              </div>

              <div className="w-48 h-[1px] bg-white/15 mx-auto relative overflow-hidden mt-4">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-[#C5A870] w-1/2"
                />
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[9px] font-mono tracking-widest uppercase mt-4"
              >
                Loading Spatial Geometries... {Math.round((loadedCount / 65) * 100)}%
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Layout */}
      <div className="min-h-screen bg-[#FAF9F6] text-[#1C1A17] transition-colors duration-500 selection:bg-[#B5945B] selection:text-white">
        
        {/* Floating Header Navbar */}
        <Navbar />

        {/* Content Sections */}
        <main>
          {/* Hero */}
          <Hero />

          {/* About */}
          <About />

          {/* Cinematic Scroll Video Interlude */}
          <CinematicVideo />

          {/* Featured Projects (with Before/After slide compare) */}
          <Projects />

          {/* Testimonials */}
          <StatsAndTestimonials />

          {/* Mood board / Instagram Grid */}
          <InspirationGrid />

          {/* Consultation Booking */}
          <ConsultationForm />

          {/* FAQ Accordion */}
          <FAQ />

          {/* Contact Details & Maps */}
          <Contact />
        </main>

        {/* Brand Footer */}
        <Footer />
        
      </div>
    </>
  );
}
