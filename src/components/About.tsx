import { useEffect, useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { statsData } from "../data";
import { Calendar, Award, Star, Compass } from "lucide-react";

// Helper component for animated number counters
function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const startValue = 0;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        const currentValue = Math.floor(progress * (value - startValue) + startValue);
        
        setCount(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function About() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  // Hook up scroll variables for the cinematic parallax & blur-to-sharp masking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const imgScale = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.95, 1.05, 1.08, 1.15]);
  const imgFilter = useTransform(
    scrollYProgress,
    [0, 0.2, 0.6, 1],
    ["blur(12px) grayscale(100%)", "blur(0px) grayscale(30%)", "blur(0px) grayscale(0%)", "blur(8px) grayscale(80%)"]
  );

  // Marquee scroll transforms for storytelling flow
  const xMarqueeLeft = useTransform(scrollYProgress, [0, 1], ["5%", "-35%"]);
  const xMarqueeRight = useTransform(scrollYProgress, [0, 1], ["-35%", "5%"]);

  const timelineEvents = [
    {
      year: "2018",
      title: "Establishing the Atelier",
      desc: "Founded Gunjan Singh Atelier in Mumbai, focusing on clean spatial geometries and authentic Indian stone craftsmanship."
    },
    {
      year: "2020",
      title: "Alibaug Coast Breakthrough",
      desc: "Completed our first major luxury estate, seamlessly blending interior transitions with architectural landscape structures."
    },
    {
      year: "2022",
      title: "Warm Minimalism Movement",
      desc: "Pioneered a dedicated Warm Minimalism practice, replacing clinical cold textures with Roman travertine, raw oak, and soft gold."
    },
    {
      year: "2025 - 2026",
      title: "Adornment and Accolades",
      desc: "Voted among India's elite spatial designers, developing custom collectible travertine furniture and bespoke luxury penthouses."
    }
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-24 md:py-32 bg-[#F5F2EB] text-[#1C1A17] transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div>
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs font-mono tracking-[0.3em] uppercase text-[#C5A059] font-medium block mb-3"
              >
                01 / The Architect
              </motion.span>
            </div>
            <div className="overflow-hidden py-1">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight font-semibold"
              >
                Gunjan Singh
              </motion.h2>
            </div>
          </div>
          <p className="text-sm md:text-base text-[#1C1A17]/60 font-mono tracking-widest uppercase max-w-xs md:text-right">
            Sculpting spaces that capture emotion, light, and structural poetry.
          </p>
        </div>

        {/* Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Portrait & Philosophy */}
          <div className="lg:col-span-5 space-y-10">
            {/* Elegant Portrait Frame with high-performance scroll parallax */}
            <div className="relative aspect-[3/4] overflow-hidden shadow-2xl border border-[#E5DEC9]">
              <motion.img
                style={{
                  y: imgY,
                  scale: imgScale,
                  filter: imgFilter,
                }}
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200"
                alt="Gunjan Singh Portrait"
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-[#C5A059]/10 mix-blend-color pointer-events-none" />
              <div className="absolute bottom-6 left-6 z-10 text-white drop-shadow-md">
                <p className="font-serif text-lg tracking-wide">Gunjan Singh</p>
                <p className="text-[10px] font-mono tracking-widest uppercase text-[#FAF9F6]/80 mt-1">
                  Creative Director
                </p>
              </div>
            </div>

            {/* Philosophy blockquote */}
            <div className="border-l-2 border-[#C5A059] pl-6 space-y-4">
              <p className="font-serif text-xl md:text-2xl italic text-[#1C1A17]/90 leading-relaxed">
                "Luxury is not about volume, excess, or noise; it is about the poetry of space, raw natural light, and authentic materiality."
              </p>
              <p className="text-xs font-mono tracking-widest text-[#C5A059] uppercase">
                — Spatial Creed
              </p>
            </div>
          </div>

          {/* Right Column: Narrative & Timeline */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Story description */}
            <div className="space-y-6 text-[#1C1A17]/80 font-sans font-light leading-relaxed text-sm sm:text-base">
              <p>
                Gunjan Singh designs with deep reverence for architectural symmetry and organic tactile textures. Having crafted spaces across Milan and Mumbai, her studio sculpts homes that are both ergonomically functional and visually majestic.
              </p>
              <p>
                Avoiding ready-made design models, each space blends raw travertine slabs, handwoven textiles, unlacquered brass, and smart home systems to create warm, cozy, yet distinctly premium homes.
              </p>
            </div>

            {/* Career Timeline */}
            <div className="space-y-8 pt-6 border-t border-[#E5DEC9]">
              <h3 className="font-serif text-2xl font-semibold tracking-tight">Atelier Chapters</h3>
              
              <div className="relative border-l border-[#E5DEC9] ml-2 pl-6 space-y-10">
                {timelineEvents.map((item, index) => (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    key={index}
                    className="relative group"
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#E5DEC9] group-hover:bg-[#C5A059] border border-[#F5F2EB] transition-colors duration-300" />
                    
                    <span className="text-xs font-mono tracking-widest text-[#C5A059] font-semibold block mb-1">
                      {item.year}
                    </span>
                    <h4 className="text-sm font-semibold tracking-wider uppercase mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#1C1A17]/60 font-light leading-relaxed max-w-xl">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Dual-Direction Cinematic Scroll Marquees */}
        <div className="my-24 py-12 border-y border-[#E5DEC9]/60 overflow-hidden relative bg-[#FAF9F6]/20 select-none">
          {/* Track 1: Gliding Left */}
          <motion.div
            style={{ x: xMarqueeLeft }}
            className="flex whitespace-nowrap text-[8vw] sm:text-[6vw] font-serif font-extralight uppercase tracking-[0.15em] text-[#C5A059]/15 leading-none mb-6"
          >
            Roman Travertine • Bespoke Curation • Unlacquered Brass • Solid Walnut •&nbsp;
            Roman Travertine • Bespoke Curation • Unlacquered Brass • Solid Walnut
          </motion.div>
          {/* Track 2: Gliding Right */}
          <motion.div
            style={{ x: xMarqueeRight }}
            className="flex whitespace-nowrap text-[8vw] sm:text-[6vw] font-serif font-extralight uppercase tracking-[0.15em] text-[#1C1A17]/10 leading-none italic"
          >
            Warm Minimalism • Structural Poetry • Ergonomic Beauty • Sensory Coherence •&nbsp;
            Warm Minimalism • Structural Poetry • Ergonomic Beauty • Sensory Coherence
          </motion.div>
        </div>

        {/* Statistics Grid at bottom */}
        <div className="mt-24 pt-16 border-t border-[#E5DEC9]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {statsData.map((stat, index) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                key={index}
                className="flex flex-col items-start"
              >
                <div className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#C5A059] flex items-baseline">
                  <AnimatedCounter value={stat.value} />
                  <span className="text-xl sm:text-2xl md:text-3xl font-light font-sans ml-1">{stat.suffix}</span>
                </div>
                <h4 className="text-xs font-semibold tracking-wider uppercase mt-4 text-[#1C1A17]/90">
                  {stat.label}
                </h4>
                <p className="text-xs text-[#1C1A17]/50 mt-2 font-light leading-relaxed max-w-[200px]">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
