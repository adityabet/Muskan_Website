import { useState, useRef } from "react";
import { motion } from "motion/react";
import { processStepsData } from "../data";
import { ChevronLeft, ChevronRight, Calendar, CheckSquare } from "lucide-react";

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);

  const scrollSlider = (direction: "left" | "right") => {
    if (direction === "left") {
      setActiveStep((prev) => Math.max(0, prev - 1));
    } else {
      setActiveStep((prev) => Math.min(processStepsData.length - 1, prev + 1));
    }
  };

  return (
    <section
      id="process"
      className="py-24 md:py-32 bg-[#FAF9F6] text-[#1C1A17] transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
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
                04 / The Journey
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
                The Design Process
              </motion.h2>
            </div>
          </div>
          <p className="text-sm md:text-base text-[#1C1A17]/60 font-light max-w-sm">
            How we translate your sensory references, requirements, and spatial lifestyle into physical heirloom spaces.
          </p>
        </div>

        {/* Desktop Interactive Slider Timeline Layout */}
        <div className="hidden lg:block relative">
          
          {/* Timeline track background line */}
          <div className="absolute top-[3.5rem] left-0 w-full h-[1px] bg-[#E5DEC9] z-0" />
          
          {/* Interactive Step selection nodes */}
          <div className="flex justify-between relative z-10 mb-16">
            {processStepsData.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className="flex flex-col items-center group cursor-pointer"
                data-cursor="tap"
              >
                {/* Visual Circle Node */}
                <motion.div
                  animate={{
                    backgroundColor: activeStep === idx ? "#B5945B" : "rgba(245, 242, 235, 1)",
                    borderColor: activeStep === idx ? "#B5945B" : "rgba(181, 148, 91, 0.3)",
                    scale: activeStep === idx ? 1.25 : 1
                  }}
                  className="w-10 h-10 rounded-full border-2 bg-[#F5F2EB] flex items-center justify-center font-mono text-xs font-semibold z-10 text-[#1C1A17] group-hover:border-[#B5945B] transition-colors duration-300"
                >
                  <span className={activeStep === idx ? "text-white" : "text-[#B5945B]"}>
                    {step.phase}
                  </span>
                </motion.div>
                
                {/* Horizontal label */}
                <span className={`text-[10px] font-mono uppercase tracking-widest mt-3 transition-colors duration-300 ${
                  activeStep === idx ? "text-[#B5945B] font-bold" : "text-[#1C1A17]/40"
                }`}>
                  {step.title}
                </span>
              </button>
            ))}
          </div>

          {/* Large Detailed Display Card */}
          <div className="relative">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 0.99, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-12 gap-12 bg-[#F5F2EB]/40 border border-[#E5DEC9]/50 p-12 relative"
            >
              {/* Giant Watermark background number */}
              <div className="absolute right-8 bottom-0 font-serif text-[12rem] text-[#B5945B]/5 font-bold select-none leading-none pointer-events-none">
                {processStepsData[activeStep].phase}
              </div>

              {/* Title, description, and timeline */}
              <div className="col-span-7 space-y-6">
                <div className="flex items-center space-x-3 text-[#B5945B]">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs font-mono tracking-widest uppercase font-semibold">
                    Timeline: {processStepsData[activeStep].timeline}
                  </span>
                </div>
                
                <h3 className="font-serif text-3xl font-medium tracking-tight">
                  {processStepsData[activeStep].title}
                </h3>
                
                <p className="text-sm text-[#1C1A17]/80 font-light leading-relaxed max-w-xl">
                  {processStepsData[activeStep].description}
                </p>
              </div>

              {/* Scope specific bullets */}
              <div className="col-span-5 border-l border-[#E5DEC9] pl-8 flex flex-col justify-center">
                <h4 className="text-[10px] font-mono tracking-widest text-[#B5945B] uppercase font-bold mb-4 flex items-center">
                  <CheckSquare className="w-4 h-4 mr-2" />
                  Core Milestones
                </h4>
                
                <ul className="space-y-3">
                  {processStepsData[activeStep].details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start text-xs sm:text-sm text-[#1C1A17]/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B5945B] mt-1.5 mr-3 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Next / Prev Controls */}
            <div className="absolute right-0 -bottom-16 flex items-center space-x-3 z-10">
              <button
                onClick={() => scrollSlider("left")}
                disabled={activeStep === 0}
                className={`p-3 border border-[#E5DEC9] rounded-full transition-colors duration-300 cursor-pointer ${
                  activeStep === 0
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-[#1C1A17] hover:text-white"
                }`}
                data-cursor="tap"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollSlider("right")}
                disabled={activeStep === processStepsData.length - 1}
                className={`p-3 border border-[#E5DEC9] rounded-full transition-colors duration-300 cursor-pointer ${
                  activeStep === processStepsData.length - 1
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-[#1C1A17] hover:text-white"
                }`}
                data-cursor="tap"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Mobile / Tablet Responsive Timeline Stack */}
        <div className="block lg:hidden space-y-12 relative pl-6 border-l border-[#E5DEC9]">
          {processStepsData.map((step, idx) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              key={idx}
              className="relative"
            >
              {/* Timeline marker node */}
              <div className="absolute -left-[35px] top-1.5 w-4 h-4 rounded-full bg-[#B5945B] border-4 border-[#FAF9F6] shadow-md" />
              
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono tracking-widest text-[#B5945B] font-bold uppercase">
                    Phase {step.phase}
                  </span>
                  <span className="text-[#1C1A17]/30">•</span>
                  <span className="text-[10px] font-mono tracking-wider text-[#1C1A17]/50">
                    {step.timeline}
                  </span>
                </div>
                
                <h3 className="font-serif text-xl sm:text-2xl font-medium tracking-tight">
                  {step.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-[#1C1A17]/70 font-light leading-relaxed">
                  {step.description}
                </p>

                <ul className="space-y-2 pt-2">
                  {step.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start text-xs text-[#1C1A17]/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B5945B] mt-1.5 mr-2 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
