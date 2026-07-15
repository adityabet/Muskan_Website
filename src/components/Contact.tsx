import { motion } from "motion/react";
import { Mail, Phone, MapPin, MessageCircle, ArrowRight, Instagram, Linkedin, Compass } from "lucide-react";

export default function Contact() {
  const socialLinks = [
    { name: "Instagram", url: "https://instagram.com", icon: Instagram },
    { name: "LinkedIn", url: "https://linkedin.com", icon: Linkedin },
    { name: "Pinterest", url: "https://pinterest.com", icon: Compass },
  ];

  return (
    <section
      id="contact"
      className="py-24 md:py-32 bg-[#F5F2EB] text-[#1C1A17] transition-colors duration-500 overflow-hidden"
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
                className="text-xs font-mono tracking-[0.3em] uppercase text-[#C5A059] font-medium block mb-3"
              >
                09 / The Connection
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
                Atelier Directory
              </motion.h2>
            </div>
          </div>
          <p className="text-sm md:text-base text-[#1C1A17]/60 font-light max-w-sm">
            Reach out directly or coordinate with our administrative team to arrange spatial visits or virtual materials reviews.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Cards */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Location Card: Mumbai */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7 }}
              className="p-8 bg-[#FAF9F6] border border-[#E5DEC9] relative group"
            >
              <span className="text-[10px] font-mono tracking-widest text-[#C5A059] font-bold uppercase">
                Primary Atelier
              </span>
              <h3 className="font-serif text-2xl font-medium tracking-tight mt-2 mb-4">
                Mumbai Studio
              </h3>
              
              <div className="space-y-4 text-xs sm:text-sm font-sans font-light text-[#1C1A17]/80">
                <p className="flex items-start">
                  <MapPin className="w-4 h-4 mr-3 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>24 Travertine Boulevard, Malabar Hill, Mumbai, MH 400006</span>
                </p>
                <p className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 text-[#C5A059]" />
                  <a href="tel:+919876543210" className="hover:text-[#C5A059] transition-colors font-mono">
                    +91 98765 43210
                  </a>
                </p>
                <p className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-[#C5A059]" />
                  <a href="mailto:mumbai@gunjansingh.com" className="hover:text-[#C5A059] transition-colors">
                    mumbai@gunjansingh.com
                  </a>
                </p>
              </div>
            </motion.div>

            {/* Location Card: Gurugram */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="p-8 bg-[#FAF9F6] border border-[#E5DEC9] relative group"
            >
              <span className="text-[10px] font-mono tracking-widest text-[#C5A059] font-bold uppercase">
                North Division
              </span>
              <h3 className="font-serif text-2xl font-medium tracking-tight mt-2 mb-4">
                Delhi NCR Studio
              </h3>
              
              <div className="space-y-4 text-xs sm:text-sm font-sans font-light text-[#1C1A17]/80">
                <p className="flex items-start">
                  <MapPin className="w-4 h-4 mr-3 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>The Monochrome Penthouse, Sector 65, Gurugram, HR 122018</span>
                </p>
                <p className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 text-[#C5A059]" />
                  <a href="tel:+91124567890" className="hover:text-[#C5A059] transition-colors font-mono">
                    +91 124 567 890
                  </a>
                </p>
                <p className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-[#C5A059]" />
                  <a href="mailto:ncr@gunjansingh.com" className="hover:text-[#C5A059] transition-colors">
                    ncr@gunjansingh.com
                  </a>
                </p>
              </div>
            </motion.div>

            {/* WhatsApp Messenger & Social Actions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="p-8 bg-[#FAF9F6] border border-[#E5DEC9] space-y-6"
            >
              <h4 className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase font-bold">
                Instant Channels
              </h4>

              <div className="flex flex-col sm:flex-row gap-4">
                {/* WhatsApp button */}
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center space-x-3 py-3.5 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs font-mono tracking-wider uppercase font-semibold transition-all duration-300 shadow-md"
                  data-cursor="tap"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp Chat</span>
                </a>

                {/* Direct email button */}
                <a
                  href="mailto:studio@gunjansingh.com"
                  className="flex-1 flex items-center justify-center space-x-3 py-3.5 border border-[#1C1A17] hover:bg-[#1C1A17] hover:text-white text-xs font-mono tracking-wider uppercase transition-all duration-300"
                  data-cursor="tap"
                >
                  <span>Email Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Social Channels List */}
              <div className="flex items-center justify-between pt-4 border-t border-[#E5DEC9]/60">
                <span className="text-[10px] font-mono tracking-wider text-[#1C1A17]/40 uppercase">
                  Social Portals
                </span>
                <div className="flex space-x-4">
                  {socialLinks.map((soc) => {
                    const SocIcon = soc.icon;
                    return (
                      <a
                        key={soc.name}
                        href={soc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 border border-[#E5DEC9] hover:border-[#C5A059] text-[#1C1A17]/60 hover:text-[#C5A059] transition-colors duration-300"
                        title={soc.name}
                        data-cursor="tap"
                      >
                        <SocIcon className="w-3.5 h-3.5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Interactive Styled IFrame Maps */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 h-[450px] lg:h-[600px] border border-[#E5DEC9] bg-neutral-100 overflow-hidden shadow-2xl relative"
          >
            <iframe
              title="Gunjan Singh Atelier Mumbai"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m4!2sMalabar+Hill+Mumbai!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf16715b497b%3A0xe5a363ee0482dc43!2sMalabar+Hill%2C+Mumbai%2C+Maharashtra!5e0!3m2!1sen!2sin!4v1710000000000"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(100%) opacity(80%)" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full transition-all duration-500"
            />
            {/* Visual aesthetic Map Border / Card Label */}
            <div className="absolute bottom-6 left-6 bg-[#FAF9F6]/95 backdrop-blur-md p-5 border border-[#E5DEC9] max-w-xs shadow-xl hidden sm:block">
              <h4 className="font-serif text-base font-semibold">Atelier Coordinates</h4>
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] mt-1">Malabar Hill, Mumbai</p>
              <p className="text-[11px] text-[#1C1A17]/60 font-light mt-2">
                Open for physical client materials audits by verified booking schedule.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
