import { motion } from "motion/react";
import { servicesData } from "../data";
import { Home, Compass, Briefcase, ShieldCheck, Sofa, Sparkles, ArrowUpRight } from "lucide-react";

const iconMap: Record<string, any> = {
  Home: Home,
  Compass: Compass,
  Briefcase: Briefcase,
  ShieldCheck: ShieldCheck,
  Sofa: Sofa,
  Sparkles: Sparkles
};

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 md:py-32 bg-[#FAF9F6] text-[#1C1A17] transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Title */}
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
                02 / The Services
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
                Bespoke Design Craft
              </motion.h2>
            </div>
          </div>
          <p className="text-sm md:text-base text-[#1C1A17]/60 font-light max-w-sm">
            Providing high-end full-service interior architectural curation, managing projects seamlessly from initial sketch to final physical handover.
          </p>
        </div>

        {/* Services Bento-inspired Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Sparkles;
            
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                key={service.id}
                className="relative group p-8 bg-[#F5F2EB]/50 border border-[#E5DEC9]/40 backdrop-blur-md flex flex-col justify-between transition-all duration-300 h-full hover:bg-[#F5F2EB] hover:border-[#C5A059]/30 hover:shadow-2xl hover:shadow-[#C5A059]/5"
                data-cursor="tap"
              >
                {/* Accent Hover Line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-transparent group-hover:bg-[#C5A059] transition-colors duration-300" />
                
                {/* Header Row: Icon & Dynamic Arrow */}
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <div className="p-3.5 bg-[#FAF9F6] border border-[#E5DEC9]/60 text-[#C5A059] transition-colors duration-300">
                      <IconComponent className="w-5 h-5 stroke-[1.5]" />
                    </div>
                    <span className="text-xs font-mono text-[#1C1A17]/30 group-hover:text-[#C5A059] transition-colors duration-300 font-semibold uppercase flex items-center">
                      <span className="mr-1">Discover</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="font-serif text-xl md:text-2xl font-medium tracking-tight mb-4 text-[#1C1A17]">
                    {service.title}
                  </h3>

                  {/* Service Description */}
                  <p className="text-[#1C1A17]/70 text-xs sm:text-sm font-light leading-relaxed mb-8">
                    {service.description}
                  </p>
                </div>

                {/* Service Features Tag lists */}
                <div className="pt-6 border-t border-[#E5DEC9]/40">
                  <h4 className="text-[9px] font-mono tracking-widest text-[#C5A059] uppercase font-semibold mb-3">
                    Deliverables & Curation
                  </h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center text-[11px] text-[#1C1A17]/60 font-mono">
                        <span className="w-1 h-1 rounded-full bg-[#C5A059]/40 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Live Material Exploration Mini-callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-16 md:mt-24 p-8 md:p-12 border border-[#E5DEC9] relative flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden bg-[#F5F2EB]/30"
        >
          <div className="relative z-10 max-w-2xl">
            <h4 className="font-serif text-xl md:text-2xl font-medium tracking-tight mb-3">
              Need a completely bespoke, highly stylized material plan?
            </h4>
            <p className="text-xs sm:text-sm text-[#1C1A17]/60 font-light leading-relaxed">
              We consult directly on material pigments, Roman travertine block cuts, bespoke metal casting, and premium wood selection for spatial clients.
            </p>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById("contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="relative z-10 shrink-0 px-6 py-3.5 bg-[#1C1A17] text-[#FAF9F6] hover:bg-[#C5A059] hover:text-white text-xs font-mono tracking-widest uppercase transition-all duration-300 rounded-none cursor-pointer"
            data-cursor="tap"
          >
            Start Material Discussion
          </button>
          
          {/* Subtle geometric lines */}
          <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-[#C5A059]/10 rounded-bl-full pointer-events-none" />
        </motion.div>

      </div>
    </section>
  );
}
