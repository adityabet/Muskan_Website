import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { faqData } from "../data";
import { Plus, Minus } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="py-24 md:py-32 bg-[#FAF9F6] text-[#1C1A17] transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <div className="overflow-hidden inline-block mx-auto">
            <motion.span
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs font-mono tracking-[0.3em] uppercase text-[#C5A059] font-medium block mb-3"
            >
              08 / The Queries
            </motion.span>
          </div>
          <div className="overflow-hidden py-1">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl md:text-5xl tracking-tight font-semibold"
            >
              Atelier Protocols
            </motion.h2>
          </div>
          <p className="text-sm text-[#1C1A17]/60 mt-4 font-light leading-relaxed">
            Understanding our custom structural workflows, material sourcing pipelines, design commissions, and operational protocols.
          </p>
        </div>

        {/* Accordion Stack */}
        <div className="space-y-4 border-t border-[#E5DEC9] pt-6">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="border-b border-[#E5DEC9]/60 pb-6 pt-2"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center text-left py-4 group cursor-pointer"
                  data-cursor="tap"
                >
                  <div className="flex items-center space-x-4 pr-4">
                    <span className="font-mono text-xs text-[#C5A059] font-semibold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-serif text-lg md:text-xl font-medium tracking-tight group-hover:text-[#C5A059] transition-colors duration-300">
                      {item.question}
                    </h3>
                  </div>

                  {/* Icon toggler */}
                  <div className="p-2 border border-[#E5DEC9] group-hover:border-[#C5A059] text-[#C5A059] transition-colors duration-300 shrink-0">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {/* Animated expand height panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pl-8 pr-12 pb-2 text-xs sm:text-sm text-[#1C1A17]/70 font-light leading-relaxed font-sans">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
