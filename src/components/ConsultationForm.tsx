import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Check, Building, Palette, HelpCircle, FileText } from "lucide-react";

export default function ConsultationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    message: "",
  });

  const [projectType, setProjectType] = useState("Residential");
  const [budget, setBudget] = useState("25L - 50L");
  const [timeline, setTimeline] = useState("3 - 6 Months");
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const projectTypes = ["Residential", "Luxury Villa", "Commercial", "Turnkey Studio", "Bespoke Furniture"];
  const budgetTiers = ["10L - 25L", "25L - 50L", "50L - 1Cr", "1Cr +"];
  const timelineTiers = ["Immediate", "1 - 3 Months", "3 - 6 Months", "Flexible"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setFormStatus("submitting");

    // Simulate luxury API response time
    setTimeout(() => {
      setFormStatus("success");
    }, 1800);
  };

  return (
    <section
      id="consultation"
      className="py-24 md:py-32 bg-[#F5F2EB] text-[#1C1A17] transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#C5A059] font-medium block mb-3">
            07 / The Inquiry
          </span>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight font-semibold">
            Book A Spatial Consultation
          </h2>
          <p className="text-sm text-[#1C1A17]/60 mt-4 font-light leading-relaxed">
            Begin your spatial design journey. Submit your project requirements, estimated location, and budget details to coordinate a personal call with Muskan.
          </p>
        </div>

        {/* Luxury Glass Form Card */}
        <div className="bg-[#FAF9F6]/90 border border-[#E5DEC9] backdrop-blur-xl p-8 md:p-12 shadow-2xl relative">
          <AnimatePresence mode="wait">
            
            {formStatus === "idle" || formStatus === "submitting" ? (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="space-y-8 relative"
              >
                {formStatus === "submitting" && (
                  <div className="absolute inset-0 bg-[#FAF9F6]/60 backdrop-blur-sm z-30 flex flex-col items-center justify-center space-y-4">
                    <div className="w-12 h-12 rounded-full border-t-2 border-[#C5A059] animate-spin" />
                    <p className="font-mono text-xs tracking-widest uppercase text-[#C5A059]">
                      Transmitting Inquiry...
                    </p>
                  </div>
                )}

                {/* Grid Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {/* Name Input */}
                  <div className="relative group">
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-[#E5DEC9] focus:border-[#C5A059] py-3 text-sm focus:outline-none transition-colors duration-300 font-serif text-[#1C1A17] placeholder-[#1C1A17]/40"
                      placeholder="Your Full Name"
                      data-cursor="tap"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C5A059] group-focus-within:w-full transition-all duration-300" />
                  </div>

                  {/* Email Input */}
                  <div className="relative group">
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-[#E5DEC9] focus:border-[#C5A059] py-3 text-sm focus:outline-none transition-colors duration-300 font-serif text-[#1C1A17] placeholder-[#1C1A17]/40"
                      placeholder="Your Email Address"
                      data-cursor="tap"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C5A059] group-focus-within:w-full transition-all duration-300" />
                  </div>

                  {/* Phone Input */}
                  <div className="relative group">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-[#E5DEC9] focus:border-[#C5A059] py-3 text-sm focus:outline-none transition-colors duration-300 font-serif text-[#1C1A17] placeholder-[#1C1A17]/40"
                      placeholder="Your Phone Number"
                      data-cursor="tap"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C5A059] group-focus-within:w-full transition-all duration-300" />
                  </div>

                  {/* Location Input */}
                  <div className="relative group">
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-[#E5DEC9] focus:border-[#C5A059] py-3 text-sm focus:outline-none transition-colors duration-300 font-serif text-[#1C1A17] placeholder-[#1C1A17]/40"
                      placeholder="Project Site Location (e.g. Mumbai, Goa)"
                      data-cursor="tap"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C5A059] group-focus-within:w-full transition-all duration-300" />
                  </div>
                </div>

                {/* Project Type Selector */}
                <div className="space-y-4 pt-4">
                  <label className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase font-bold flex items-center">
                    <Building className="w-3.5 h-3.5 mr-2" />
                    Select Project Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {projectTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setProjectType(type)}
                        className={`px-4 py-2 text-xs font-mono tracking-wider uppercase border transition-all duration-300 rounded-none cursor-pointer ${
                          projectType === type
                            ? "bg-[#1C1A17] text-white border-[#1C1A17]"
                            : "border-[#E5DEC9] text-[#1C1A17]/60 hover:border-[#1C1A17]"
                        }`}
                        data-cursor="tap"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Range Selector */}
                <div className="space-y-4 pt-2">
                  <label className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase font-bold flex items-center">
                    <Palette className="w-3.5 h-3.5 mr-2" />
                    Estimate Investment Budget
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {budgetTiers.map((tier) => (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => setBudget(tier)}
                        className={`px-4 py-2 text-xs font-mono tracking-wider uppercase border transition-all duration-300 rounded-none cursor-pointer ${
                          budget === tier
                            ? "bg-[#1C1A17] text-white border-[#1C1A17]"
                            : "border-[#E5DEC9] text-[#1C1A17]/60 hover:border-[#1C1A17]"
                        }`}
                        data-cursor="tap"
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timeline Selector */}
                <div className="space-y-4 pt-2">
                  <label className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase font-bold flex items-center">
                    <HelpCircle className="w-3.5 h-3.5 mr-2" />
                    Estimated Delivery Timeline
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {timelineTiers.map((tier) => (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => setTimeline(tier)}
                        className={`px-4 py-2 text-xs font-mono tracking-wider uppercase border transition-all duration-300 rounded-none cursor-pointer ${
                          timeline === tier
                            ? "bg-[#1C1A17] text-white border-[#1C1A17]"
                            : "border-[#E5DEC9] text-[#1C1A17]/60 hover:border-[#1C1A17]"
                        }`}
                        data-cursor="tap"
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message TextArea */}
                <div className="space-y-3 pt-4">
                  <label className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase font-bold flex items-center">
                    <FileText className="w-3.5 h-3.5 mr-2" />
                    Provide Design Specifics
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-[#F5F2EB]/40 border border-[#E5DEC9] p-4 text-xs sm:text-sm focus:outline-none focus:border-[#C5A059] transition-colors duration-300 font-sans font-light rounded-none text-[#1C1A17] placeholder-[#1C1A17]/40"
                    placeholder="Tell us about the space. Is it a modern sea-facing apartment, a farmhouse, or an office flagship showroom? List any materials you love..."
                    data-cursor="tap"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#1C1A17] hover:bg-[#C5A059] text-white text-xs font-mono tracking-[0.25em] uppercase font-semibold transition-all duration-300 flex items-center justify-center space-x-3 cursor-pointer shadow-lg"
                    data-cursor="tap"
                  >
                    <span>Transmit Design Inquiry</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center space-y-6 flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#C5A059] flex items-center justify-center text-white shadow-xl">
                  <Check className="w-8 h-8" />
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-serif text-3xl font-medium tracking-tight">
                    Inquiry Securely Transmitted
                  </h3>
                  <p className="text-xs font-mono tracking-widest text-[#C5A059] uppercase">
                    Chapter 01 : Connected
                  </p>
                </div>

                <p className="text-sm text-[#1C1A17]/60 max-w-md font-light leading-relaxed mx-auto">
                  Thank you, <span className="font-semibold text-[#1C1A17]">{formData.name}</span>. Our studio administrators have registered your inquiry for the <span className="font-semibold">{projectType}</span> located in <span className="font-semibold">{formData.location || "your site"}</span>.
                  We will reach out to schedule an introductory video call within 24 business hours.
                </p>

                <div className="pt-8">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ name: "", email: "", phone: "", location: "", message: "" });
                      setFormStatus("idle");
                    }}
                    className="px-6 py-3 border border-[#E5DEC9] text-xs font-mono tracking-widest uppercase hover:bg-[#1C1A17] hover:text-white transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
