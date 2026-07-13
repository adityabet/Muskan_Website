import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#FAF9F6] text-[#1C1A17] pt-24 pb-12 transition-colors duration-500 border-t border-[#E5DEC9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Section Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Logo Brand Descriptor */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex flex-col">
              <span className="font-serif text-2xl tracking-[0.18em] uppercase font-semibold">
                Muskan Singh
              </span>
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#C5A059] font-semibold mt-1">
                Interior Architecture Studio
              </span>
            </div>
            
            <p className="text-sm text-[#1C1A17]/60 font-light leading-relaxed max-w-sm">
              We compose physical heirloom spaces. Our practice blends raw travertine structures, custom unlacquered metals, and bespoke textiles to craft warm, minimal architectural sanctuaries.
            </p>
          </div>

          {/* Directory Links Column 1 */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[10px] font-mono tracking-[0.2em] text-[#C5A059] uppercase font-bold">
              Atelier Portals
            </h4>
            <ul className="space-y-2 text-xs font-mono tracking-wider uppercase text-[#1C1A17]/70">
              <li>
                <button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-[#C5A059] transition-colors cursor-pointer">
                  The Designer
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-[#C5A059] transition-colors cursor-pointer">
                  Selected Work
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById("process")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-[#C5A059] transition-colors cursor-pointer">
                  Design Process
                </button>
              </li>
            </ul>
          </div>

          {/* Directory Links Column 2 */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[10px] font-mono tracking-[0.2em] text-[#C5A059] uppercase font-bold">
              Resources & Inquiries
            </h4>
            <ul className="space-y-2 text-xs font-mono tracking-wider uppercase text-[#1C1A17]/70">
              <li>
                <button onClick={() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-[#C5A059] transition-colors cursor-pointer">
                  Atelier Protocols (FAQ)
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById("consultation")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-[#C5A059] transition-colors cursor-pointer">
                  Book Consultation
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-[#C5A059] transition-colors cursor-pointer">
                  Direct Inquiries
                </button>
              </li>
              <li>
                <a href="mailto:studio@muskansingh.com" className="hover:text-[#C5A059] transition-colors">
                  Join The Team
                </a>
              </li>
            </ul>
          </div>

          {/* Back to top button */}
          <div className="lg:col-span-1 flex justify-end">
            <button
              onClick={scrollUp}
              className="p-4 border border-[#E5DEC9] hover:border-[#C5A059] text-[#1C1A17]/60 hover:text-[#C5A059] rounded-full transition-colors duration-300 cursor-pointer"
              title="Scroll back to top"
              data-cursor="tap"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Massive Monumental Wordmark Footer */}
        <div className="mt-20 border-t border-[#E5DEC9] pt-16 select-none pointer-events-none">
          <h1 className="font-serif text-[4.5rem] sm:text-[8rem] md:text-[11rem] lg:text-[14rem] tracking-[0.06em] text-center uppercase leading-none font-bold text-[#E5DEC9]/30 transition-colors duration-500">
            Muskan
          </h1>
        </div>

        {/* Bottom row copyrights */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-[#1C1A17]/40 uppercase tracking-widest">
          <p>©2026 Muskan Singh Studio. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#privacy" className="hover:text-[#C5A059] transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-[#C5A059] transition-colors">Terms of Atelier</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
