import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoDuration, setVideoDuration] = useState(0);

  // Scroll tracking: "start start" means tracking begins when hero section enters viewport
  // "end end" means tracking ends when hero section exits viewport
  // This creates a massive scroll distance (600vh) for the sticky behavior
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Spring smoothing for silky animations
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.8,
  });

  // Video scrubbing with smooth interpolation
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let targetTime = 0;
    let currentTime = 0;
    let rafId: number;

    // Subscribe to scroll progress changes
    const unsubscribe = smoothScrollProgress.on("change", (latest) => {
      if (video.duration) {
        // Map scroll progress (0-1) to video time (0-duration)
        targetTime = latest * video.duration;
      }
    });

    // Smooth video scrubbing using RAF interpolation
    const updateVideoTime = () => {
      if (video && video.duration) {
        // Lerp coefficient 0.08 for smooth 70FPS scrubbing
        currentTime += (targetTime - currentTime) * 0.08;

        // Only update if difference is noticeable (saves CPU)
        if (Math.abs(currentTime - video.currentTime) > 0.02) {
          video.currentTime = Math.max(0, Math.min(video.duration - 0.05, currentTime));
        }
      }
      rafId = requestAnimationFrame(updateVideoTime);
    };

    rafId = requestAnimationFrame(updateVideoTime);

    // Handle video metadata
    const handleLoadedMetadata = () => {
      setVideoDuration(video.duration);
      // Ensure video starts at frame 0
      video.currentTime = 0;
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      unsubscribe();
      cancelAnimationFrame(rafId);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [smoothScrollProgress]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // ============================================
  // VIDEO TRANSFORMS
  // ============================================
  const videoScale = useTransform(smoothScrollProgress, [0, 0.3, 1], [1.08, 1.0, 0.92]);
  const videoBlur = useTransform(
    smoothScrollProgress,
    [0, 0.4, 1],
    ["blur(0px)", "blur(1px)", "blur(6px)"]
  );
  const videoY = useTransform(smoothScrollProgress, [0, 1], ["0%", "8%"]);
  const videoX = useTransform(smoothScrollProgress, [0, 0.5, 1], ["-0.8%", "0%", "0.8%"]);
  const videoRotate = useTransform(smoothScrollProgress, [0, 0.5, 1], [-0.2, 0, 0.3]);
  const videoBorderRadius = useTransform(
    smoothScrollProgress,
    [0, 0.4, 1],
    ["0px", "20px", "36px"]
  );
  const videoOpacity = useTransform(smoothScrollProgress, [0, 0.2, 0.9, 1], [0.95, 1, 1, 0.85]);

  // ============================================
  // TEXT ANIMATIONS
  // ============================================

  // Main Heading: Visible at start, fades out quickly
  const headingOpacity = useTransform(smoothScrollProgress, [0, 0.04, 0.12], [1, 0.8, 0]);
  const headingY = useTransform(smoothScrollProgress, [0, 0.12], [0, -80]);
  const headingScale = useTransform(smoothScrollProgress, [0, 0.12], [1, 1.08]);

  // Chapter 1: Enters after heading fades, stays for 25% of scroll
  const chapter1Opacity = useTransform(
    smoothScrollProgress,
    [0.08, 0.18, 0.35],
    [0, 1, 0]
  );
  const chapter1Y = useTransform(smoothScrollProgress, [0.08, 0.18, 0.35], [100, 0, -100]);
  const chapter1Scale = useTransform(smoothScrollProgress, [0.08, 0.18, 0.35], [0.8, 1, 1.1]);

  // Chapter 2: Enters after chapter 1 fades, stays for 25% of scroll
  const chapter2Opacity = useTransform(
    smoothScrollProgress,
    [0.32, 0.52, 0.68],
    [0, 1, 0]
  );
  const chapter2Y = useTransform(smoothScrollProgress, [0.32, 0.52, 0.68], [100, 0, -100]);
  const chapter2Scale = useTransform(smoothScrollProgress, [0.32, 0.52, 0.68], [0.8, 1, 1.1]);

  // Chapter 3: Enters after chapter 2 fades, stays until near end
  const chapter3Opacity = useTransform(
    smoothScrollProgress,
    [0.65, 0.82, 0.95],
    [0, 1, 0]
  );
  const chapter3Y = useTransform(smoothScrollProgress, [0.65, 0.82, 0.95], [100, 0, -100]);
  const chapter3Scale = useTransform(smoothScrollProgress, [0.65, 0.82, 0.95], [0.8, 1, 1.1]);

  // Scroll indicator: Fades out after scrolling begins
  const indicatorOpacity = useTransform(smoothScrollProgress, [0, 0.08], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-[600vh] w-full bg-[#0D0D0C]"
    >
      {/* Sticky viewport container - keeps hero pinned while scrolling */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#0D0D0C]">
        
        {/* Video Background - Fixed during scroll */}
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              scale: videoScale,
              filter: videoBlur,
              y: videoY,
              x: videoX,
              rotate: videoRotate,
              opacity: videoOpacity,
              borderRadius: videoBorderRadius,
            }}
            className="w-full h-full will-change-transform"
          >
            <video
              ref={videoRef}
              src="https://player.vimeo.com/external/393132641.hd.mp4?s=cfd9432e604f21db597d627c27774ff0ba47372c&profile_id=170&oauth2_token_id=57447761"
              poster="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=2200"
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover brightness-[0.4] contrast-[1.05]"
            />
            {/* Dark vignette overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0C] via-transparent to-[#0D0D0C]/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0C]/20 via-transparent to-[#0D0D0C]/20" />
          </motion.div>
        </div>

        {/* Ambient Golden Glow */}
        <div className="absolute inset-0 pointer-events-none z-5 overflow-hidden">
          <div className="absolute top-[30%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C5A059]/8 blur-[120px]" />
        </div>

        {/* Text Content - Animates while background stays fixed */}
        <div className="absolute inset-0 z-20 flex items-center justify-center px-3 sm:px-6">
          <div className="w-full max-w-4xl mx-auto">
            
            {/* MAIN HEADING */}
            <motion.div
              style={{
                opacity: headingOpacity,
                y: headingY,
                scale: headingScale,
              }}
              className="absolute inset-0 flex items-center justify-center text-center"
            >
              <div className="w-full max-w-3xl px-4">
                <span className="block text-[10px] sm:text-[11px] font-mono tracking-[0.45em] uppercase text-[#C5A059] mb-3 sm:mb-4 font-semibold">
                  Muskan Singh Studio
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[#FAF9F6] tracking-wider leading-none font-extralight">
                  Sculpting Sensory Spaces
                </h1>
                <p className="text-[9px] sm:text-[10px] font-mono tracking-[0.3em] uppercase text-[#FAF9F6]/50 mt-4 sm:mt-6 font-light">
                  Warm Minimalism & Structural Poetry
                </p>
              </div>
            </motion.div>

            {/* CHAPTER 1 */}
            <motion.div
              style={{
                opacity: chapter1Opacity,
                y: chapter1Y,
                scale: chapter1Scale,
              }}
              className="absolute inset-0 flex items-center justify-center text-center"
            >
              <div className="w-full max-w-2xl px-4">
                <span className="block text-[9px] sm:text-[10px] font-mono tracking-[0.4em] uppercase text-[#C5A059] mb-3 sm:mb-4 font-semibold">
                  Chapter I / Spatial Silence
                </span>
                <h2 className="font-serif text-xl sm:text-3xl md:text-4xl lg:text-5xl text-[#FAF9F6] tracking-wide leading-relaxed font-light">
                  Silent travertine speaking in geometric rhythms.
                </h2>
              </div>
            </motion.div>

            {/* CHAPTER 2 */}
            <motion.div
              style={{
                opacity: chapter2Opacity,
                y: chapter2Y,
                scale: chapter2Scale,
              }}
              className="absolute inset-0 flex items-center justify-center text-center"
            >
              <div className="w-full max-w-2xl px-4">
                <span className="block text-[9px] sm:text-[10px] font-mono tracking-[0.4em] uppercase text-[#C5A059] mb-3 sm:mb-4 font-semibold">
                  Chapter II / Materiality
                </span>
                <h2 className="font-serif text-xl sm:text-3xl md:text-4xl lg:text-5xl text-[#FAF9F6] tracking-wide leading-relaxed font-light">
                  Raw oak, organic stone, and unlacquered brass.
                </h2>
              </div>
            </motion.div>

            {/* CHAPTER 3 */}
            <motion.div
              style={{
                opacity: chapter3Opacity,
                y: chapter3Y,
                scale: chapter3Scale,
              }}
              className="absolute inset-0 flex items-center justify-center text-center"
            >
              <div className="w-full max-w-2xl px-4">
                <span className="block text-[9px] sm:text-[10px] font-mono tracking-[0.4em] uppercase text-[#C5A059] mb-3 sm:mb-4 font-semibold">
                  Chapter III / Poetry
                </span>
                <h2 className="font-serif text-xl sm:text-3xl md:text-4xl lg:text-5xl text-[#FAF9F6] tracking-wide leading-relaxed font-light">
                  Sensory spaces designed for natural light.
                </h2>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Scroll Indicator - Fades out when scrolling starts */}
        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none"
        >
          <button
            onClick={() => scrollToSection("about")}
            className="text-white/60 hover:text-[#C5A059] transition-colors duration-300 flex flex-col items-center cursor-pointer"
            data-cursor="tap"
          >
            <span className="text-[8px] sm:text-[9px] font-mono tracking-[0.25em] uppercase mb-2">Scroll To Discover</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>
        </motion.div>

      </div>
    </section>
  );
}
