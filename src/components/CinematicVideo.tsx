import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

const FRAME_COUNT = 24;
const framePaths = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `/cinematic-frames/frame_${String(i + 1).padStart(2, "0")}.jpg`
);

export default function CinematicVideo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState(1);

  // Scroll tracking: "start start" / "end end" pins the section for its full
  // scroll track height, exactly like the Hero — the section stays stuck while
  // the frames scrub slowly underneath, instead of scrolling straight past.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Smooth scroll progress to simulate ultra-fluid 70FPS cinematic feedback
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.8,
  });

  // Animated scaling & corner morphing to make it incredibly immersive
  const containerScale = useTransform(smoothProgress, [0, 0.5, 1], [0.95, 1.05, 0.95]);
  const borderRadius = useTransform(smoothProgress, [0, 0.5, 1], ["24px", "0px", "24px"]);
  const frameScale = useTransform(smoothProgress, [0, 0.5, 1], [1.15, 1.0, 1.15]);

  // Preload every frame so scrubbing never flickers or waits on a network fetch
  useEffect(() => {
    framePaths.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Scrub through the photo sequence in lockstep with scroll, lerped for buttery motion
  useEffect(() => {
    let targetFrame = 0;
    let currentFrame = 0;
    let displayedFrame = 0;
    let rafId: number;

    const unsubscribe = smoothProgress.on("change", (latest) => {
      targetFrame = latest * (FRAME_COUNT - 1);
    });

    const tick = () => {
      currentFrame += (targetFrame - currentFrame) * 0.08;
      const rounded = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(currentFrame)));
      if (rounded !== displayedFrame) {
        displayedFrame = rounded;
        setFrame(rounded + 1);
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      unsubscribe();
      cancelAnimationFrame(rafId);
    };
  }, [smoothProgress]);

  return (
    <section
      id="cinematic-interlude"
      ref={sectionRef}
      className="relative h-[400vh] w-full bg-[#0D0D0C]"
    >
      {/* Sticky viewport container - keeps the symphony pinned while scrubbing */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-[#0D0D0C] text-[#FAF9F6] pt-24 sm:pt-28 pb-6">

        {/* Decorative Top Line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-[#FAF9F6]/10" />

        {/* Chapter Indicator Header */}
        <div className="text-center mb-4 sm:mb-6 z-20 px-6 max-w-xl shrink-0">
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

        {/* Fluid Parallax Photo-Sequence Frame */}
        <div className="w-full flex-1 min-h-0 flex items-center justify-center relative">
          <motion.div
            style={{
              scale: containerScale,
              borderRadius: borderRadius,
            }}
            className="h-full max-h-[82vh] aspect-[768/1364] overflow-hidden relative shadow-2xl border border-[#FAF9F6]/10"
          >
            {/* High-definition photo sequence, scrubbed frame-by-frame with scroll */}
            <motion.img
              src={framePaths[frame - 1]}
              style={{ scale: frameScale }}
              className="w-full h-full object-cover brightness-[0.45] contrast-[1.05]"
              alt="Cinematic interior walkthrough"
            />

            {/* Cinematic Overlay Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0C]/80 via-transparent to-[#0D0D0C]/40 pointer-events-none" />

            {/* Golden Corner brackets — enlarged ring frame */}
            <div className="absolute top-5 left-5 w-14 h-14 border-t-2 border-l-2 border-[#C5A059]/50 pointer-events-none" />
            <div className="absolute top-5 right-5 w-14 h-14 border-t-2 border-r-2 border-[#C5A059]/50 pointer-events-none" />
            <div className="absolute bottom-5 left-5 w-14 h-14 border-b-2 border-l-2 border-[#C5A059]/50 pointer-events-none" />
            <div className="absolute bottom-5 right-5 w-14 h-14 border-b-2 border-r-2 border-[#C5A059]/50 pointer-events-none" />
          </motion.div>
        </div>

        {/* Ambient bottom caption */}
        <div className="mt-4 sm:mt-6 px-6 text-center max-w-sm z-20 shrink-0">
          <p className="text-[10px] font-mono tracking-[0.25em] text-[#FAF9F6]/40 uppercase">
            Continuous camera pan • 4K UHD Master • Atmos Audio Enabled
          </p>
        </div>

      </div>
    </section>
  );
}
