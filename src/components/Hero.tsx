import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Scroll tracking across the 180vh scroll track
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 34,
    mass: 0.7,
  });

  // Smooth scroll video scrubbing (lerped) targeting 70FPS responsiveness
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start playback immediately for fallback/ambient motion
    video.play()
      .then(() => setIsPlaying(true))
      .catch((err) => {
        console.warn("Autoplay was prevented, waiting for user scroll.", err);
      });

    let targetTime = 0;
    let currentTime = 0;

    // Track scroll and compute target currentTime
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (video.duration) {
        // Map scroll percentage directly to video duration (0% -> 0s, 100% -> duration)
        targetTime = latest * video.duration;
      }
    });

    let rafId: number;
    const updateVideoTime = () => {
      if (video && video.duration) {
        // High-performance Linear Interpolation (lerp) with a damping coefficient of 0.08.
        // This decouples raw wheel scroll ticks from video rendering, resulting in buttery smooth 70FPS cinematic performance.
        currentTime += (targetTime - currentTime) * 0.08;

        // Apply only if the difference is noticeable to save CPU cycles
        if (Math.abs(currentTime - video.currentTime) > 0.01) {
          video.currentTime = Math.max(0, Math.min(video.duration - 0.05, currentTime));
        }
      }
      rafId = requestAnimationFrame(updateVideoTime);
    };

    rafId = requestAnimationFrame(updateVideoTime);

    return () => {
      unsubscribe();
      cancelAnimationFrame(rafId);
    };
  }, [scrollYProgress]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Cinematic scroll transforms for the video container
  const videoScale = useTransform(smoothScrollProgress, [0, 0.5, 1], [1.08, 1.0, 0.95]);
  const videoBlur = useTransform(smoothScrollProgress, [0, 0.7, 1], ["blur(0px)", "blur(2px)", "blur(7px)"]);
  const videoY = useTransform(smoothScrollProgress, [0, 1], ["0%", "9%"]);
  const videoBorderRadius = useTransform(smoothScrollProgress, [0, 0.5, 1], ["0px", "24px", "40px"]);
  const videoX = useTransform(smoothScrollProgress, [0, 0.5, 1], ["-1.2%", "0%", "1.2%"]);
  const videoRotate = useTransform(smoothScrollProgress, [0, 0.5, 1], [-0.3, 0, 0.4]);
  const videoOpacity = useTransform(smoothScrollProgress, [0, 0.35, 1], [0.95, 1, 0.9]);

  // Main high-impact heading scroll transforms (fully visible at start, fades out rapidly as user scrolls)
  const headingOpacity = useTransform(smoothScrollProgress, [0, 0.08], [1, 0]);
  const headingY = useTransform(smoothScrollProgress, [0, 0.08], [0, -20]);
  const headingScale = useTransform(smoothScrollProgress, [0, 0.08], [1, 1.02]);

  // Sequential Storytelling transforms synced with scrubbing
  const story1Opacity = useTransform(smoothScrollProgress, [0.04, 0.18, 0.32], [0, 1, 0]);
  const story1Y = useTransform(smoothScrollProgress, [0.04, 0.18, 0.32], [24, 0, -22]);
  const story1Scale = useTransform(smoothScrollProgress, [0.04, 0.18, 0.32], [0.97, 1, 1.02]);

  const story2Opacity = useTransform(smoothScrollProgress, [0.36, 0.52, 0.66], [0, 1, 0]);
  const story2Y = useTransform(smoothScrollProgress, [0.36, 0.52, 0.66], [24, 0, -22]);
  const story2Scale = useTransform(smoothScrollProgress, [0.36, 0.52, 0.66], [0.97, 1, 1.02]);

  const story3Opacity = useTransform(smoothScrollProgress, [0.7, 0.85, 0.96], [0, 1, 0]);
  const story3Y = useTransform(smoothScrollProgress, [0.7, 0.85, 0.96], [24, 0, -22]);
  const story3Scale = useTransform(smoothScrollProgress, [0.7, 0.85, 0.96], [0.97, 1, 1.02]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-[180vh] w-full overflow-hidden bg-[#0D0D0C] transition-colors duration-500"
    >
      {/* Sticky Child Container: Keeps the scene locked on viewport as the user scrubs */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center px-3 sm:px-6">
        
        {/* Cinematic Video Background Frame with 70FPS scroll transformations */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
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
            className="w-full h-full relative overflow-hidden transition-all duration-300 will-change-transform"
          >
            <video
              ref={videoRef}
              src="https://player.vimeo.com/external/393132641.hd.mp4?s=cfd9432e604f21db597d627c27774ff0ba47372c&profile_id=170&oauth2_token_id=57447761"
              poster="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=2200"
              muted
              playsInline
              loop
              preload="auto"
              className="w-full h-full object-cover brightness-[0.4] contrast-[1.05]"
            />
            {/* Ambient luxury dark vignette gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0C] via-transparent to-[#0D0D0C]/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0C]/30 via-transparent to-[#0D0D0C]/30" />
          </motion.div>
        </div>

        {/* Ambient Warm Golden Gradient Orb */}
        <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
          <div className="absolute top-[30%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C5A059]/10 blur-[120px]" />
        </div>

        {/* Cinematic Scroll Storytelling Blocks */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="absolute inset-0 z-20 pointer-events-none px-3 sm:px-6"
        >
          <div className="relative h-full w-full max-w-5xl mx-auto flex items-center justify-center text-center">
            {/* Main Welcome Heading */}
            <motion.div
              style={{
                opacity: headingOpacity,
                y: headingY,
                scale: headingScale,
              }}
              className="pointer-events-none absolute left-1/2 top-1/2 w-[calc(100%-1.5rem)] sm:w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 px-2 sm:px-6 text-center z-10"
            >
              <span className="text-[11px] font-mono tracking-[0.45em] uppercase text-[#C5A059] mb-4 font-semibold">
                Muskan Singh Studio
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#FAF9F6] tracking-wider leading-none font-extralight max-w-3xl mx-auto">
                Sculpting Sensory Spaces
              </h1>
              <p className="text-[11px] sm:text-xs font-mono tracking-[0.3em] uppercase text-[#FAF9F6]/50 mt-6 font-light">
                Warm Minimalism & Structural Poetry
              </p>
            </motion.div>

            {/* Story Block 1 */}
            <motion.div
              style={{
                opacity: story1Opacity,
                y: story1Y,
                scale: story1Scale,
              }}
              className="pointer-events-none absolute left-1/2 top-1/2 w-[calc(100%-1.5rem)] sm:w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 px-2 sm:px-6 text-center z-20"
            >
              <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#C5A059] mb-4 font-semibold">
                Chapter I / Spatial Silence
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#FAF9F6] tracking-wide leading-relaxed max-w-xl mx-auto font-light">
                Silent travertine speaking in geometric rhythms.
              </h2>
            </motion.div>

            {/* Story Block 2 */}
            <motion.div
              style={{
                opacity: story2Opacity,
                y: story2Y,
                scale: story2Scale,
              }}
              className="pointer-events-none absolute left-1/2 top-1/2 w-[calc(100%-1.5rem)] sm:w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 px-2 sm:px-6 text-center z-30"
            >
              <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#C5A059] mb-4 font-semibold">
                Chapter II / Materiality
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#FAF9F6] tracking-wide leading-relaxed max-w-xl mx-auto font-light">
                Raw oak, organic stone, and unlacquered brass.
              </h2>
            </motion.div>

            {/* Story Block 3 */}
            <motion.div
              style={{
                opacity: story3Opacity,
                y: story3Y,
                scale: story3Scale,
              }}
              className="pointer-events-none absolute left-1/2 top-1/2 w-[calc(100%-1.5rem)] sm:w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 px-2 sm:px-6 text-center z-40"
            >
              <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#C5A059] mb-4 font-semibold">
                Chapter III / Poetry
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#FAF9F6] tracking-wide leading-relaxed max-w-xl mx-auto font-light">
                Sensory spaces designed for natural light.
              </h2>
            </motion.div>
          </div>
        </motion.div>


        {/* Scroll indicator hint at the bottom */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
          <motion.button
            onClick={() => scrollToSection("about")}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{
              opacity: { duration: 1, delay: 1.8 },
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
            className="text-white/60 hover:text-[#C5A059] transition-colors duration-300 flex flex-col items-center cursor-pointer"
            data-cursor="tap"
          >
            <span className="text-[9px] font-mono tracking-[0.25em] uppercase mb-2">Scroll To Discover</span>
            <ChevronDown className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
