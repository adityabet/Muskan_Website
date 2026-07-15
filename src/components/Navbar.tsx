import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sun, Moon } from "lucide-react";
import Magnetic from "./Magnetic";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "Gunjan" },
    { id: "projects", label: "Projects" },
    { id: "testimonials", label: "Stories" },
    { id: "contact", label: "Inquire" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Simple active section detection
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          isScrolled
            ? "py-4 bg-[#FAF9F6]/90 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.02)] border-b border-[#E5DEC9]/50"
            : "py-8 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo Brand */}
          <Magnetic strength={0.2}>
            <button
              onClick={() => scrollToSection("hero")}
              className="group flex flex-col items-start cursor-pointer text-left"
              data-cursor="tap"
            >
              <span className={`font-serif text-lg md:text-xl tracking-[0.18em] uppercase font-semibold transition-colors duration-300 ${
                isScrolled ? "text-[#1C1A17]" : "text-white"
              }`}>
                Gunjan Singh
              </span>
              <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#C5A059] font-medium mt-0.5">
                Interior Architecture
              </span>
            </button>
          </Magnetic>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-8">
            <div className={`px-8 py-2.5 rounded-full flex items-center space-x-6 text-[11px] font-semibold border transition-all duration-300 ${
              isScrolled 
                ? "bg-transparent border-[#E5DEC9]/50" 
                : "bg-white/5 border-white/10 backdrop-blur-md"
            }`}>
              {navItems.map((item) => (
                <Magnetic strength={0.3} key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`relative text-[11px] font-mono tracking-widest uppercase cursor-pointer transition-colors duration-300 py-1 px-2 ${
                      activeSection === item.id
                        ? "text-[#C5A059]"
                        : isScrolled
                          ? "text-[#1C1A17]/60 hover:text-[#C5A059]"
                          : "text-white/70 hover:text-[#C5A059]"
                    }`}
                    data-cursor="tap"
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="activeNavLine"
                        className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C5A059]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                </Magnetic>
              ))}
            </div>

            {/* Separator */}
            <div className={`w-[1px] h-4 transition-colors duration-300 ${
              isScrolled ? "bg-[#E5DEC9]" : "bg-white/20"
            }`} />

            {/* CTA */}
            <div className="flex items-center space-x-4">
              <Magnetic strength={0.25}>
                <button
                  onClick={() => scrollToSection("contact")}
                  className={`px-5 py-2.5 text-xs font-mono tracking-widest uppercase transition-all duration-300 rounded-none cursor-pointer flex items-center shadow-md ${
                    isScrolled 
                      ? "bg-[#1C1A17] hover:bg-[#C5A059] text-[#FAF9F6]" 
                      : "bg-[#FAF9F6] hover:bg-[#C5A059] text-[#1C1A17] hover:text-white"
                  }`}
                  data-cursor="tap"
                >
                  Inquire
                </button>
              </Magnetic>
            </div>
          </div>

          {/* Mobile Buttons */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 transition-colors duration-300 ${
                isScrolled ? "text-[#1C1A17]" : "text-white"
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-30 bg-[#FAF9F6]/98 backdrop-blur-2xl flex flex-col justify-center px-8 md:px-16"
          >
            <div className="flex flex-col space-y-6">
              {navItems.map((item, index) => (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left font-serif text-3xl tracking-wide cursor-pointer py-1 ${
                    activeSection === item.id
                      ? "text-[#C5A059]"
                      : "text-[#1C1A17]/70"
                  }`}
                >
                  <span className="text-xs font-mono tracking-widest text-[#C5A059]/40 mr-4">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="pt-8 border-t border-[#E5DEC9] flex flex-col space-y-4"
              >
                <button
                  onClick={() => scrollToSection("contact")}
                  className="w-full text-center py-4 bg-[#1C1A17] text-[#FAF9F6] text-sm font-mono tracking-widest uppercase"
                >
                  Book A Consultation
                </button>
                <div className="flex justify-between text-[10px] font-mono tracking-widest text-[#1C1A17]/40 uppercase pt-4">
                  <span>Gunjan Singh studio ©2026</span>
                  <span>luxury interiors</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
