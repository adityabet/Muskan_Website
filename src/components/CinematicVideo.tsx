import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate } from "motion/react";
import { ChevronLeft, ChevronRight, MoveHorizontal } from "lucide-react";

const FRAME_COUNT = 24;
const framePath = (n: number) => `/cinematic-frames/frame_${String(n).padStart(2, "0")}.jpg`;
const frames = Array.from({ length: FRAME_COUNT }, (_, i) => framePath(i + 1));

// Covers the AI-generation watermark baked into the bottom edge of the source frames.
function WatermarkGuard() {
  return (
    <div className="absolute bottom-0 left-0 w-full h-[12%] bg-gradient-to-t from-[#0D0D0C] from-45% to-transparent pointer-events-none" />
  );
}

function SprocketRow() {
  return (
    <div className="hidden sm:flex items-center gap-3 px-1 opacity-30">
      {Array.from({ length: 28 }).map((_, i) => (
        <span key={i} className="h-1.5 w-1.5 shrink-0 rounded-[2px] bg-[#C5A059]" />
      ))}
    </div>
  );
}

export default function CinematicVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [maxDrag, setMaxDrag] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current || !stripRef.current) return;
      const overflow = stripRef.current.scrollWidth - containerRef.current.offsetWidth;
      setMaxDrag(Math.max(0, overflow));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const nudge = (direction: "left" | "right") => {
    const step = 260;
    const current = x.get();
    const next =
      direction === "left"
        ? Math.min(0, current + step)
        : Math.max(-maxDrag, current - step);
    animate(x, next, { type: "spring", stiffness: 260, damping: 32 });
  };

  return (
    <section
      id="cinematic-interlude"
      className="py-24 md:py-32 bg-[#0D0D0C] text-[#FAF9F6] overflow-hidden relative"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-[#FAF9F6]/10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
          <div className="overflow-hidden inline-block mx-auto">
            <motion.span
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#C5A059] mb-3 block font-semibold"
            >
              Symphony IV / Motion
            </motion.span>
          </div>
          <div className="overflow-hidden py-1">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight font-medium"
            >
              24 Frames Per Second
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-xs sm:text-sm text-[#FAF9F6]/50 font-light leading-relaxed mt-4"
          >
            Every still from the walkthrough, cut into a living reel. Drag it, or click through frame by frame.
          </motion.p>
        </div>
      </div>

      {/* Film Reel */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SprocketRow />
        </div>

        <div ref={containerRef} className="relative overflow-hidden py-3">
          {/* Edge fade masks */}
          <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-10 md:w-24 bg-gradient-to-r from-[#0D0D0C] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-10 md:w-24 bg-gradient-to-l from-[#0D0D0C] to-transparent" />

          <motion.div
            ref={stripRef}
            drag="x"
            dragConstraints={{ left: -maxDrag, right: 0 }}
            dragElastic={0.06}
            style={{ x }}
            className="flex w-max gap-4 md:gap-5 px-6 md:px-12 cursor-grab active:cursor-grabbing"
          >
            {frames.map((src, i) => (
              <motion.div
                key={src}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative shrink-0 w-32 sm:w-40 md:w-48 aspect-[768/1364] rounded-xl overflow-hidden border border-[#FAF9F6]/10 shadow-xl bg-[#161513]"
              >
                <img
                  src={src}
                  alt={`Interior frame ${i + 1}`}
                  draggable={false}
                  className="w-full h-full object-cover brightness-[0.68] contrast-[1.08] select-none"
                />
                <WatermarkGuard />
                <div className="absolute inset-0 ring-1 ring-inset ring-[#C5A059]/0 hover:ring-[#C5A059]/40 transition-all duration-300 pointer-events-none" />
                <span className="absolute top-2.5 left-2.5 text-[9px] font-mono tracking-widest text-[#C5A059]/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SprocketRow />
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-7xl mx-auto px-6 md:px-12 mt-10 md:mt-12 flex items-center justify-center gap-6"
      >
        <button
          onClick={() => nudge("left")}
          className="p-3 border border-[#FAF9F6]/15 hover:border-[#C5A059] rounded-full text-[#FAF9F6]/60 hover:text-[#C5A059] transition-colors cursor-pointer"
          data-cursor="tap"
          aria-label="Scroll reel left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <span className="flex items-center gap-2 text-[9px] sm:text-[10px] font-mono tracking-[0.25em] uppercase text-[#FAF9F6]/40">
          <MoveHorizontal className="w-3.5 h-3.5" />
          Drag The Reel
        </span>

        <button
          onClick={() => nudge("right")}
          className="p-3 border border-[#FAF9F6]/15 hover:border-[#C5A059] rounded-full text-[#FAF9F6]/60 hover:text-[#C5A059] transition-colors cursor-pointer"
          data-cursor="tap"
          aria-label="Scroll reel right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </motion.div>

    </section>
  );
}
