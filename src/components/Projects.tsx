import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { projectsData } from "../data";
import { Project } from "../types";
import BeforeAfter from "./BeforeAfter";
import { X, MapPin, Calendar, LayoutGrid, Ruler, Compass, Layers, CheckCircle } from "lucide-react";

interface ProjectCardProps {
  key?: any;
  project: Project;
  idx: number;
  getBentoClasses: (index: number) => string;
  onClick: () => any;
}

function ProjectCard({ project, idx, getBentoClasses, onClick }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position of this card in relation to the viewport
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Map scroll progress to a subtle parallax translation.
  // The image is slightly taller (h-[124%] and starts with a -12% offset) to allow up to 12% shift without exposing gaps.
  const yParallax = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6 }}
      className={`relative overflow-hidden group border border-[#E5DEC9]/40 cursor-pointer ${getBentoClasses(idx)}`}
      onClick={onClick}
      data-cursor="view"
    >
      {/* Outer Image frame with overflow-hidden to bound the parallax motion */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          style={{ y: yParallax }}
          className="absolute inset-0 w-full h-[124%] -top-[12%] object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Cover Overlay details */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17]/90 via-[#1C1A17]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end z-10">
        <div className="space-y-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#C5A870]">
            {project.category}
          </span>
          <h3 className="font-serif text-2xl md:text-3xl text-white font-medium">
            {project.title}
          </h3>
          <div className="flex items-center space-x-4 text-xs text-white/70 font-mono pt-2">
            <span className="flex items-center">
              <MapPin className="w-3 h-3 mr-1 text-[#C5A870]" />
              {project.location}
            </span>
            <span>•</span>
            <span>{project.year}</span>
          </div>
        </div>
      </div>

      {/* Mini card indicator for default view */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 flex items-center justify-between border border-white/20 shadow-lg group-hover:opacity-0 transition-opacity duration-300 md:hidden lg:flex z-10">
        <div>
          <h4 className="font-serif text-base font-semibold leading-tight text-[#1C1A17]">{project.title}</h4>
          <p className="text-[10px] font-mono uppercase tracking-widest text-[#B5945B] mt-1">{project.category}</p>
        </div>
        <span className="text-[10px] font-mono tracking-widest text-[#1C1A17]/40">
          {project.year}
        </span>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const backdropMouseDownTarget = useRef<EventTarget | null>(null);

  const categories = ["All", "Residential Interiors", "Luxury Villas", "Apartments", "Kitchen Design", "Commercial Interiors"];

  const filteredProjects = activeCategory === "All"
    ? projectsData
    : projectsData.filter(p => p.category === activeCategory);

  // Close the detail modal with Escape, and lock page scroll while it's open
  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    document.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedProject]);

  // Layout classes to make a custom asymmetrical bento/masonry layout
  const getBentoClasses = (index: number): string => {
    switch (index % 4) {
      case 0:
        return "col-span-1 md:col-span-2 aspect-[16/10]";
      case 1:
        return "col-span-1 md:col-span-1 aspect-[3/4]";
      case 2:
        return "col-span-1 md:col-span-1 aspect-square";
      case 3:
        return "col-span-1 md:col-span-2 aspect-[16/10]";
      default:
        return "col-span-1 aspect-square";
    }
  };

  return (
    <section
      id="projects"
      className="py-24 md:py-32 bg-[#F5F2EB] text-[#1C1A17] transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
          <div>
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs font-mono tracking-[0.3em] uppercase text-[#B5945B] font-medium block mb-3"
              >
                03 / The Portfolio
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
                Curated Spaces
              </motion.h2>
            </div>
          </div>
          <p className="text-sm md:text-base text-[#1C1A17]/60 font-light max-w-sm">
            Step inside our archive of luxury interior designs, architectural structures, and bespoke custom layouts.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-3 mb-12 border-b border-[#E5DEC9] pb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 text-xs font-mono tracking-wider uppercase transition-all duration-300 rounded-none cursor-pointer border ${
                activeCategory === category
                  ? "bg-[#1C1A17] text-white border-[#1C1A17]"
                  : "border-transparent text-[#1C1A17]/60 hover:text-[#1C1A17]"
              }`}
              data-cursor="tap"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Bento Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                idx={idx}
                getBentoClasses={getBentoClasses}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Interactive Before/After Showcase Module */}
        <div className="mt-24 pt-16 border-t border-[#E5DEC9]">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#B5945B] font-medium block mb-3">
              Interactive Transformation
            </span>
            <h3 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight">
              Before / After Spatial Magic
            </h3>
            <p className="text-sm text-[#1C1A17]/60 mt-4 max-w-xl mx-auto font-light leading-relaxed">
              Drag the golden slider to witness the dramatic architectural transformation of "The Ivory Sanctuary" living lounge from raw brick walls to warm minimalist luxury.
            </p>
          </div>

          <div className="max-w-4xl mx-auto shadow-2xl">
            <BeforeAfter
              beforeImage="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1600"
              afterImage="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1600"
              heightClass="aspect-[16/10] sm:aspect-[16/9] w-full"
            />
          </div>
        </div>

      </div>

      {/* Project Detail Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => { backdropMouseDownTarget.current = e.target; }}
            onClick={(e) => {
              // Only dismiss when the click both starts and ends on the bare backdrop —
              // guards against a drag/scroll gesture over the backdrop closing the modal.
              if (e.target === e.currentTarget && backdropMouseDownTarget.current === e.currentTarget) {
                setSelectedProject(null);
              }
            }}
            className="fixed inset-0 z-50 bg-[#FAF9F6]/90 backdrop-blur-xl p-4 md:p-10 flex items-center justify-center overflow-y-auto"
          >
            {/* Close Button — fixed to the viewport so it's always reachable, even mid-scroll */}
            <button
              onClick={() => setSelectedProject(null)}
              className="fixed top-4 right-4 md:top-6 md:right-6 p-3 rounded-full bg-[#1C1A17] hover:bg-[#B5945B] z-[60] cursor-pointer text-[#FAF9F6] transition-colors shadow-lg"
              data-cursor="tap"
              aria-label="Close project details"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FAF9F6] text-[#1C1A17] w-full max-w-6xl rounded-none shadow-2xl overflow-hidden relative border border-[#E5DEC9] my-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Left Side: Large image or before/after */}
                <div className="lg:col-span-7 relative h-[350px] lg:h-auto min-h-[450px] bg-neutral-100 border-b lg:border-b-0 lg:border-r border-[#E5DEC9]">
                  {selectedProject.beforeImage ? (
                    <div className="w-full h-full relative">
                      <BeforeAfter
                        beforeImage={selectedProject.beforeImage}
                        afterImage={selectedProject.afterImage || selectedProject.image}
                        heightClass="absolute inset-0 w-full h-full"
                      />
                    </div>
                  ) : (
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>

                {/* Right Side: Detailed Factsheet */}
                <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
                  <div>
                    {/* Category & Title */}
                    <span className="text-xs font-mono tracking-widest text-[#B5945B] uppercase font-semibold">
                      {selectedProject.category}
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight mt-2 mb-4">
                      {selectedProject.title}
                    </h3>
                    <p className="text-[#1C1A17]/70 text-xs sm:text-sm font-light leading-relaxed mb-8">
                      {selectedProject.description}
                    </p>
                    
                    {/* Metadata Factsheet Table */}
                    <div className="space-y-4 pt-6 border-t border-[#E5DEC9]">
                      <div className="flex justify-between text-xs py-1.5 border-b border-[#E5DEC9]/40">
                        <span className="text-[#1C1A17]/50 font-mono uppercase tracking-wider flex items-center">
                          <Compass className="w-3.5 h-3.5 mr-2 text-[#B5945B]" /> Style
                        </span>
                        <span className="font-medium text-right max-w-[200px]">{selectedProject.details.style}</span>
                      </div>
                      <div className="flex justify-between text-xs py-1.5 border-b border-[#E5DEC9]/40">
                        <span className="text-[#1C1A17]/50 font-mono uppercase tracking-wider flex items-center">
                          <Ruler className="w-3.5 h-3.5 mr-2 text-[#B5945B]" /> Dimensions
                        </span>
                        <span className="font-medium">{selectedProject.details.size}</span>
                      </div>
                      <div className="flex justify-between text-xs py-1.5 border-b border-[#E5DEC9]/40">
                        <span className="text-[#1C1A17]/50 font-mono uppercase tracking-wider flex items-center">
                          <Calendar className="w-3.5 h-3.5 mr-2 text-[#B5945B]" /> Duration
                        </span>
                        <span className="font-medium">{selectedProject.details.duration}</span>
                      </div>
                      <div className="flex justify-between text-xs py-1.5 border-b border-[#E5DEC9]/40">
                        <span className="text-[#1C1A17]/50 font-mono uppercase tracking-wider flex items-center">
                          <MapPin className="w-3.5 h-3.5 mr-2 text-[#B5945B]" /> Location
                        </span>
                        <span className="font-medium">{selectedProject.location}</span>
                      </div>
                    </div>

                    {/* Architectural Concept */}
                    <div className="mt-8">
                      <h4 className="text-[10px] font-mono tracking-widest text-[#B5945B] uppercase font-bold mb-2">
                        Spatial Concept
                      </h4>
                      <p className="text-xs sm:text-sm text-[#1C1A17]/80 font-light leading-relaxed">
                        {selectedProject.details.concept}
                      </p>
                    </div>

                    {/* Scope of Work Bullet tags */}
                    <div className="mt-8">
                      <h4 className="text-[10px] font-mono tracking-widest text-[#B5945B] uppercase font-bold mb-3">
                        Project Scope Curation
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.details.scope.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] font-mono uppercase tracking-wider px-3 py-1.5 bg-[#F5F2EB] border border-[#E5DEC9]/60 flex items-center"
                          >
                            <CheckCircle className="w-3 h-3 mr-1.5 text-[#B5945B]" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Booking Link / Modal Footer */}
                  <div className="mt-12 pt-6 border-t border-[#E5DEC9] flex justify-between items-center">
                    <span className="text-[10px] font-mono tracking-widest text-[#1C1A17]/40 uppercase">
                      Muskan Singh Studio ©2026
                    </span>
                    <button
                      onClick={() => {
                        setSelectedProject(null);
                        const el = document.getElementById("contact");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="px-4 py-2 bg-[#1C1A17] text-[#FAF9F6] hover:bg-[#B5945B] hover:text-white text-[10px] font-mono tracking-widest uppercase transition-all duration-300 rounded-none cursor-pointer"
                    >
                      Inquire About This Style
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
