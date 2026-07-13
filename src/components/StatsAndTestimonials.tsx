import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { testimonialsData } from "../data";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

export default function StatsAndTestimonials() {
  const [activeIdx, setActiveIdx] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  // Track scroll through the card to drive a subtle parallax on the decorative quote mark
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const quoteY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const quoteRotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  const current = testimonialsData[activeIdx];

  return (
    <section
      id="testimonials"
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
                className="text-xs font-mono tracking-[0.3em] uppercase text-[#B5945B] font-medium block mb-3"
              >
                05 / The Voices
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
                Client Chronicles
              </motion.h2>
            </div>
          </div>
          <p className="text-sm md:text-base text-[#1C1A17]/60 font-light max-w-sm">
            Read stories of how our detailed spatial planning, custom lighting, and bespoke furniture curation reshaped daily life.
          </p>
        </div>

        {/* Cinematic Review Showcase */}
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto relative bg-[#FAF9F6] border border-[#E5DEC9] p-8 md:p-16 shadow-2xl overflow-hidden"
        >

          {/* Subtle Decorative Background Quote Icon with scroll parallax */}
          <motion.div
            style={{ y: quoteY, rotate: quoteRotate }}
            className="absolute top-10 right-10 text-[#B5945B]/5 pointer-events-none"
          >
            <Quote className="w-48 h-48 stroke-[1]" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Avatar Column */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="relative w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-[#B5945B]/20 mb-6 shadow-xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={current.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    src={current.image}
                    alt={current.name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
              </div>

              {/* Client Info */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="font-serif text-lg md:text-xl font-semibold">{current.name}</h4>
                  <p className="text-[10px] font-mono tracking-widest text-[#B5945B] uppercase font-bold mt-1">
                    {current.role}
                  </p>
                  {current.company && (
                    <p className="text-[10px] font-mono tracking-wider text-[#1C1A17]/40 uppercase">
                      {current.company}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-8 flex flex-col justify-between h-full min-h-[220px]">
              
              {/* Stars & Content */}
              <div className="space-y-6">
                
                {/* Gold Stars */}
                <div className="flex space-x-1 justify-center lg:justify-start">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#B5945B] text-[#B5945B]" />
                  ))}
                </div>

                {/* Big Review Text */}
                <AnimatePresence mode="wait">
                  <motion.p
                    key={current.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="font-serif text-lg sm:text-xl md:text-2xl font-light italic leading-relaxed text-[#1C1A17]/90 text-center lg:text-left"
                  >
                    "{current.content}"
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Carousel controls */}
              <div className="flex items-center justify-center lg:justify-start space-x-4 pt-10 mt-6 border-t border-[#E5DEC9]">
                <button
                  onClick={handlePrev}
                  className="p-3.5 border border-[#E5DEC9] hover:border-[#B5945B] rounded-full hover:bg-[#F5F2EB] transition-colors cursor-pointer text-[#1C1A17]"
                  data-cursor="tap"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                {/* Visual Page Counter indicator */}
                <span className="font-mono text-xs text-[#1C1A17]/40 tracking-widest uppercase">
                  {String(activeIdx + 1).padStart(2, "0")} / {String(testimonialsData.length).padStart(2, "0")}
                </span>

                <button
                  onClick={handleNext}
                  className="p-3.5 border border-[#E5DEC9] hover:border-[#B5945B] rounded-full hover:bg-[#F5F2EB] transition-colors cursor-pointer text-[#1C1A17]"
                  data-cursor="tap"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
