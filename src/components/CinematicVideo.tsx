import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { Play, Sparkles } from "lucide-react";

export default function CinematicVideo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Track scroll within this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Smooth scroll progress to simulate ultra-fluid 70FPS cinematic feedback
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 22,
    restDelta: 0.001,
  });

  // Animated scaling & corner morphing to make it incredibly immersive
  const containerWidth = useTransform(smoothProgress, [0, 0.5, 1], ["90%", "100%", "90%"]);
  const containerScale = useTransform(smoothProgress, [0, 0.5, 1], [0.95, 1.05, 0.95]);
  const borderRadius = useTransform(smoothProgress, [0, 0.5, 1], ["24px", "0px", "24px"]);
  const videoScale = useTransform(smoothProgress, [0, 0.5, 1], [1.15, 1.0, 1.15]);
  const textY = useTransform(smoothProgress, [0.1, 0.5, 0.9], [40, 0, -40]);
  const textOpacity = useTransform(smoothProgress, [0.1, 0.45, 0.55, 0.9], [0, 1, 1, 0]);

  // Keep the video loop running beautifully at full frame rate
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section
      id="cinematic-interlude"
      ref={sectionRef}
      className="py-24 bg-[#0D0D0C] text-[#FAF9F6] relative overflow-hidden flex flex-col items-center justify-center min-h-[90vh]"
    >
      {/* Decorative Top Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-[#FAF9F6]/10" />

      {/* Chapter Indicator Header */}
      <div className="text-center mb-10 z-20 px-6 max-w-xl">
        <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#C5A059] mb-3 block font-semibold">
          Symphony IV / Motion
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl tracking-tight font-medium mb-2">
          Living Cinematic Walkthrough
        </h2>
        <p className="text-xs text-[#FAF9F6]/50 font-light leading-relaxed">
          Experience spatial warmth in continuous, hyper-smooth frame rates.
        </p>
      </div>

      {/* Fluid Parallax Video Frame */}
      <div className="w-full h-[55vh] sm:h-[65vh] md:h-[75vh] flex items-center justify-center relative">
        <motion.div
          style={{
            width: containerWidth,
            scale: containerScale,
            borderRadius: borderRadius,
          }}
          className="h-full overflow-hidden relative shadow-2xl border border-[#FAF9F6]/10 aspect-video max-w-7xl"
        >
          {/* High-definition, high frame rate cinematic video */}
          <motion.video
            ref={videoRef}
            src="https://player.vimeo.com/external/393132641.hd.mp4?s=cfd9432e604f21db597d627c27774ff0ba47372c&profile_id=170&oauth2_token_id=57447761"
            poster="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=2200"
            style={{ scale: videoScale }}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            className="w-full h-full object-cover brightness-[0.45] contrast-[1.05]"
          />

          {/* Cinematic Overlay Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0C]/80 via-transparent to-[#0D0D0C]/40 pointer-events-none" />

          {/* Floating Scrolling Text overlay */}
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 pointer-events-none z-10"
          >
            <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A059] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>70FPS Cinematic Scrubbing</span>
            </div>
            <h3 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-wide max-w-3xl leading-snug font-extralight text-[#FAF9F6]">
              A continuous flow of pure geometric warmth.
            </h3>
            <p className="text-xs sm:text-sm text-[#FAF9F6]/60 font-mono tracking-widest mt-6 uppercase">
              Drag or scroll to control momentum
            </p>
          </motion.div>

          {/* Golden Corner brackets */}
          <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-[#C5A059]/40 pointer-events-none" />
          <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-[#C5A059]/40 pointer-events-none" />
          <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-[#C5A059]/40 pointer-events-none" />
          <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-[#C5A059]/40 pointer-events-none" />
        </motion.div>
      </div>

      {/* Ambient bottom caption */}
      <div className="mt-10 px-6 text-center max-w-sm z-20">
        <p className="text-[10px] font-mono tracking-[0.25em] text-[#FAF9F6]/40 uppercase">
          Continuous camera pan • 4K UHD Master • Atmos Audio Enabled
        </p>
      </div>
    </section>
  );
}
