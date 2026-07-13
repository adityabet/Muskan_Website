import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Chapter {
  id: string;
  label: string;
  name: string;
}

export default function ChapterHUD() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [visible, setVisible] = useState(false);

  const chapters: Chapter[] = [
    { id: "hero", label: "00", name: "Preface" },
    { id: "about", label: "01", name: "The Architect" },
    { id: "cinematic-interlude", label: "02", name: "Symphony" },
    { id: "projects", label: "03", name: "Chosen Work" },
    { id: "process", label: "04", name: "The Journey" },
    { id: "testimonials", label: "05", name: "Stories" },
    { id: "consultation", label: "06", name: "Design Specifics" },
    { id: "contact", label: "07", name: "Inquiry" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Only show the HUD once we scroll past 200px
      setVisible(window.scrollY > 200);

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = 0; i < chapters.length; i++) {
        const el = document.getElementById(chapters[i].id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveChapter(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToChapter = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed right-6 lg:right-10 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-end space-y-6 select-none"
        >
          {/* Vertical Track indicator */}
          <div className="flex flex-col items-center space-y-3">
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#C5A059] uppercase rotate-90 origin-right translate-x-1 mb-8 whitespace-nowrap font-semibold">
              {chapters[activeChapter].name}
            </span>

            {chapters.map((chapter, idx) => {
              const isActive = activeChapter === idx;
              return (
                <button
                  key={chapter.id}
                  onClick={() => scrollToChapter(chapter.id)}
                  className="group relative flex items-center justify-center w-8 h-8 cursor-pointer focus:outline-none"
                  title={chapter.name}
                >
                  {/* Subtle index helper text */}
                  <span
                    className={`absolute right-8 text-[9px] font-mono tracking-widest transition-all duration-300 ${
                      isActive
                        ? "opacity-100 translate-x-0 text-[#C5A059] font-bold"
                        : "opacity-0 translate-x-2 text-[#1C1A17]/40 group-hover:opacity-60 group-hover:translate-x-1"
                    }`}
                  >
                    {chapter.label}
                  </span>

                  {/* Bullet visual */}
                  <motion.div
                    animate={{
                      scale: isActive ? 1.5 : 1,
                      backgroundColor: isActive ? "#C5A059" : "transparent",
                      borderColor: isActive ? "#C5A059" : "rgba(197, 160, 89, 0.3)",
                    }}
                    className={`w-2 h-2 rounded-full border transition-all duration-300 ${
                      isActive ? "bg-[#C5A059]" : "border-[#C5A059]/40 group-hover:border-[#C5A059]"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
