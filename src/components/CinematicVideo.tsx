import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

const framePath = (n: number) => `/cinematic-frames/frame_${String(n).padStart(2, "0")}.jpg`;

export default function CinematicVideo() {
  const cardRef = useRef<HTMLDivElement>(null);

  // Raw cursor offset (-0.5 to 0.5) across the card, sprung for a smooth 3D tilt
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 18, mass: 0.6 };
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-12, 12]), springConfig);

  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      id="cinematic-interlude"
      className="py-24 md:py-32 bg-[#0D0D0C] text-[#FAF9F6] overflow-hidden relative"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-[#FAF9F6]/10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
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
              className="font-serif text-3xl sm:text-4xl tracking-tight font-medium"
            >
              Living Cinematic Walkthrough
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-xs sm:text-sm text-[#FAF9F6]/50 font-light leading-relaxed mt-4"
          >
            Experience spatial warmth through a living gallery of hand-picked moments.
          </motion.p>
        </div>

        {/* Motion Card Stack */}
        <div
          className="relative flex items-center justify-center py-6"
          style={{ perspective: "1800px" }}
        >
          {/* Accent card — left, drifting behind the primary card */}
          <motion.div
            initial={{ opacity: 0, x: -40, rotate: -14 }}
            whileInView={{ opacity: 1, x: 0, rotate: -10 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block absolute left-1/2 -translate-x-[220px] w-[210px] aspect-[768/1364] rounded-[22px] overflow-hidden shadow-xl border border-white/10 z-0"
          >
            <motion.img
              src={framePath(5)}
              alt=""
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full object-cover brightness-[0.35] contrast-[1.05] scale-110"
            />
            <div className="absolute inset-0 bg-[#0D0D0C]/35" />
          </motion.div>

          {/* Accent card — right, drifting behind the primary card */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotate: 14 }}
            whileInView={{ opacity: 1, x: 0, rotate: 10 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block absolute left-1/2 translate-x-[10px] w-[210px] aspect-[768/1364] rounded-[22px] overflow-hidden shadow-xl border border-white/10 z-0"
          >
            <motion.img
              src={framePath(20)}
              alt=""
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="w-full h-full object-cover brightness-[0.35] contrast-[1.05] scale-110"
            />
            <div className="absolute inset-0 bg-[#0D0D0C]/35" />
          </motion.div>

          {/* Primary interactive motion card — tilts toward the cursor */}
          <motion.div
            ref={cardRef}
            onMouseMove={handlePointerMove}
            onMouseLeave={handlePointerLeave}
            initial={{ opacity: 0, y: 60, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative z-10 w-[240px] sm:w-[300px] md:w-[340px] aspect-[768/1364] rounded-[28px] overflow-hidden shadow-2xl border border-[#FAF9F6]/15"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={framePath(12)}
                alt="Cinematic interior walkthrough"
                className="w-full h-full object-cover brightness-[0.65] contrast-[1.08] scale-105"
              />
            </motion.div>

            {/* Ambient pulsing glow */}
            <motion.div
              animate={{ opacity: [0.35, 0.7, 0.35] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_220px_at_50%_35%,rgba(197,160,89,0.35),transparent_70%)]"
            />

            {/* Cinematic vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0C]/75 via-transparent to-[#0D0D0C]/20 pointer-events-none" />

            {/* Golden corner brackets */}
            <div className="absolute top-5 left-5 w-10 h-10 border-t-2 border-l-2 border-[#C5A059]/60 pointer-events-none" />
            <div className="absolute top-5 right-5 w-10 h-10 border-t-2 border-r-2 border-[#C5A059]/60 pointer-events-none" />
            <div className="absolute bottom-5 left-5 w-10 h-10 border-b-2 border-l-2 border-[#C5A059]/60 pointer-events-none" />
            <div className="absolute bottom-5 right-5 w-10 h-10 border-b-2 border-r-2 border-[#C5A059]/60 pointer-events-none" />

            <div className="absolute bottom-6 left-0 w-full text-center px-4 pointer-events-none">
              <p className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#FAF9F6]/70">
                Move to explore
              </p>
            </div>
          </motion.div>
        </div>

        {/* Ambient bottom caption */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 md:mt-20 text-center"
        >
          <p className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] sm:tracking-[0.25em] text-[#FAF9F6]/40 uppercase leading-relaxed">
            Continuous camera pan • 4K UHD Master • Atmos Audio Enabled
          </p>
        </motion.div>

      </div>
    </section>
  );
}
