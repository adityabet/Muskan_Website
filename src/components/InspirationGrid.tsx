import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { instagramFeedData } from "../data";
import { Instagram, Eye } from "lucide-react";

interface GridItemProps {
  key?: any;
  item: { id: string; url: string; label: string };
  idx: number;
}

function GridItem({ item, idx }: GridItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  
  // Custom scroll tracking for individual parallax image
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"],
  });

  // Calculate parallax shift: image is taller (h-[124%]) to prevent exposing margins
  const yParallax = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: idx * 0.05 }}
      className={`relative overflow-hidden group border border-[#E5DEC9]/40 aspect-square ${
        idx % 3 === 1 ? "md:aspect-[3/4]" : "aspect-square"
      }`}
      data-cursor="view"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={item.url}
          alt={item.label}
          style={{ y: yParallax }}
          className="absolute inset-0 w-full h-[124%] -top-[12%] object-cover transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-95 group-hover:brightness-75 transition-brightness duration-500"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Gold overlay border on hover */}
      <div className="absolute inset-0 border border-[#B5945B]/0 group-hover:border-[#B5945B]/40 m-3 transition-all duration-500 pointer-events-none z-10" />

      {/* Caption slide up on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 pointer-events-none z-20">
        <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.2em] text-[#C5A870] uppercase mb-1">
            <Eye className="w-3 h-3" />
            <span>Texture Study</span>
          </div>
          <h4 className="font-serif text-lg text-white font-medium">
            {item.label}
          </h4>
        </div>
      </div>
    </motion.div>
  );
}

export default function InspirationGrid() {
  return (
    <section
      id="inspiration"
      className="py-24 md:py-32 bg-[#FAF9F6] text-[#1C1A17] transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Section */}
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
                06 / The Aesthetics
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
                Material Mood Board
              </motion.h2>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-start md:items-end gap-3 max-w-sm"
          >
            <p className="text-sm text-[#1C1A17]/60 font-light leading-relaxed md:text-right">
              A curated catalog of raw material textures, color pigments, and architectural models.
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs font-mono tracking-widest uppercase text-[#B5945B] hover:text-[#1C1A17] transition-colors duration-300"
              data-cursor="tap"
            >
              <Instagram className="w-3.5 h-3.5 mr-2" />
              Follow Atelier Journal
            </a>
          </motion.div>
        </div>

        {/* Pinterest-inspired Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {instagramFeedData.map((item, idx) => (
            <GridItem key={item.id} item={item} idx={idx} />
          ))}
        </div>

        {/* Bottom decorative stats line */}
        <div className="mt-16 text-center">
          <p className="text-[10px] font-mono tracking-[0.25em] text-[#1C1A17]/40 uppercase">
            Curating travertine • brass • organic drapes • solid walnut cuts • raw concrete
          </p>
        </div>

      </div>
    </section>
  );
}
