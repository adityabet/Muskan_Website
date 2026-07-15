import { Project, ProcessStep, Testimonial, FAQItem, StatItem } from "./types";

export const projectsData: Project[] = [
  {
    id: "1",
    title: "The Ivory Sanctuary",
    category: "Residential Interiors",
    location: "Malabar Hill, Mumbai",
    year: "2025",
    description: "A masterclass in warm minimalism, blending soft bouclé, Roman travertine, and micro-cement walls.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1600",
    beforeImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1600",
    afterImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1600",
    details: {
      client: "Kapoor Family",
      size: "4,200 sq. ft.",
      duration: "6 Months",
      style: "Organic Modernism",
      concept: "Connecting earth tones with functional architectural symmetry.",
      scope: ["Bespoke Millwork", "Lighting Curation", "Spatial Replanning", "Custom Furniture"]
    }
  },
  {
    id: "2",
    title: "The Walnut & Brass Residence",
    category: "Luxury Villas",
    location: "Alibaug Coast",
    year: "2025",
    description: "A stunning coastal villa embracing structural walnut partitions, brushed brass, and fluid ocean views.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600",
    details: {
      client: "Dr. Vikram Mehra",
      size: "6,500 sq. ft.",
      duration: "9 Months",
      style: "Coastal Luxe",
      concept: "Injecting luxurious warmth while mirroring the fluid light of the coastline.",
      scope: ["Full Architecture Details", "Smart Automation", "Marble Cladding", "Landscape Integration"]
    }
  },
  {
    id: "3",
    title: "Monochrome Penthouse",
    category: "Apartments",
    location: "Gurugram",
    year: "2024",
    description: "High-contrast architectural design utilizing dark Nero Marquina marble and sandblasted charcoal oak.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1600",
    details: {
      client: "Ananya Birla",
      size: "3,800 sq. ft.",
      duration: "5 Months",
      style: "Editorial Noir",
      concept: "Framing city skylines through deep charcoal profiles and rich materials.",
      scope: ["Acoustic Engineering", "Bespoke Lounge", "Art Curation", "Light Sculpting"]
    }
  },
  {
    id: "4",
    title: "The Atelier Office",
    category: "Commercial Interiors",
    location: "Lodi Estate, New Delhi",
    year: "2024",
    description: "An open-concept creative studio featuring fluted timber panels and warm, organic linen drapery.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600",
    details: {
      client: "Vanguard Partners",
      size: "5,500 sq. ft.",
      duration: "7 Months",
      style: "Scandinavian Craft",
      concept: "Transforming work dynamics with biological textures and warm lighting.",
      scope: ["Acoustic Partition Walls", "Ergonomic Layout", "Terrazzo Flooring", "Biophilic Accents"]
    }
  },
  {
    id: "5",
    title: "The Verde Kitchen & Dining",
    category: "Kitchen Design",
    location: "Bengaluru",
    year: "2025",
    description: "An elegant culinary space merging custom sage green cabinetry and Calacatta Viola marble countertops.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1600",
    details: {
      client: "Siddharth Nair",
      size: "1,200 sq. ft.",
      duration: "3 Months",
      style: "Traditional Modernist",
      concept: "A highly functional social engine centering on tactile premium finishes.",
      scope: ["Custom Cabinetry", "Premium Appliances", "Calacatta Viola", "Ventilation Design"]
    }
  }
];

export const processStepsData: ProcessStep[] = [
  {
    phase: "01",
    title: "Discover",
    description: "Immersive spatial dialogue studying your routine, lighting preferences, and priorities to construct a creative vision.",
    timeline: "Week 1 - 2",
    details: ["Aesthetic & Sensory Assessment", "Budget Optimization Roadmap", "Site Architecture Review"]
  },
  {
    phase: "02",
    title: "Concept Design",
    description: "Developing visual syntax. We compose material boards, floor plans, and atmospheric sketches for review.",
    timeline: "Week 3 - 5",
    details: ["Tactile Sample Selection", "Spatial Flow Drafting", "Initial 3D Spatial Atmospheres"]
  },
  {
    phase: "03",
    title: "Material Selection",
    description: "Curated sourcing. We select marbles, raw travertine, bespoke wood cuts, and textiles directly from artisan networks.",
    timeline: "Week 6 - 8",
    details: ["Stone Slab Auditing", "Textile and Finish Spec", "Color Palette Chemistry"]
  },
  {
    phase: "04",
    title: "Detail Planning",
    description: "Precision drafting. Our designers compile layout documents, custom joinery blueprints, and smart specs.",
    timeline: "Week 9 - 11",
    details: ["Millwork Construction Drafting", "Smart Home Blueprinting", "Electrical Schematics"]
  },
  {
    phase: "05",
    title: "Execution & Handover",
    description: "Rigorous physical manifestation. Gunjan personally oversees alignments, skilled installations, and custom styling.",
    timeline: "Month 4 - 6",
    details: ["Rigorous Contractor Checklists", "Acoustic & Light Alignments", "Final Accessories Styling"]
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: "t1",
    name: "Kabir & Priya Mehta",
    role: "Founders",
    company: "Studio Indigo",
    content: "Gunjan made our house an emotional sanctuary. She blended Scandinavian comfort with luxurious materials like Roman Travertine.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=500",
    rating: 5
  },
  {
    id: "t2",
    name: "Aman Singhania",
    role: "Managing Director",
    company: "Apex Capital",
    content: "A rare talent marrying precise execution with deep creativity. The penthouse is an absolute masterpiece.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=500",
    rating: 5
  },
  {
    id: "t3",
    name: "Dr. Radhika Chawla",
    role: "Chief Surgeon",
    company: "CardioCare Delhi",
    content: "Unmatched attention to detail. From concealed HVAC air lines to tuned lighting, they deliver quiet luxury.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=500",
    rating: 5
  }
];

export const statsData: StatItem[] = [
  { value: 45, suffix: "+", label: "Completed Homes", description: "Bespoke residences across Mumbai, Gurgaon, and Goa." },
  { value: 12, suffix: "+", label: "Design Awards", description: "Honored for excellence in high-end design." },
  { value: 8, suffix: " Years", label: "Experience", description: "Refining luxury architecture and material sourcing." },
  { value: 98, suffix: "%", label: "Customization", description: "From raw marble blocks to custom fabrics." }
];

export const faqData: FAQItem[] = [
  {
    question: "What is your typical project timeline?",
    answer: "Turnkey residential projects generally span 4 to 6 months, including 2 months for procurement and 3 to 4 months for build."
  },
  {
    question: "How do you charge for services?",
    answer: "We offer flat-rate design retainers or percentage-based turnkey commissions based on the scale of work."
  },
  {
    question: "Do you take projects outside Mumbai?",
    answer: "Yes, our studio creates luxury environments nationwide, including Alibaug, Goa, Delhi, and Bangalore."
  },
  {
    question: "What style are you known for?",
    answer: "Warm, Tactile Minimalism with a classical structural spine, featuring travertine, wood, and unlacquered brass."
  },
  {
    question: "How is material procurement managed?",
    answer: "We source directly from quarries, global galleries, and European design houses to ensure premium authenticity."
  }
];

export const instagramFeedData = [
  { id: "i1", url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=600", label: "Travertine slab detail" },
  { id: "i2", url: "https://images.unsplash.com/photo-1616486038857-89e53a8c2acd?auto=format&fit=crop&q=80&w=600", label: "Hand-spun bouclé lounge" },
  { id: "i3", url: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=600", label: "Kitchen lighting study" },
  { id: "i4", url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=600", label: "Raw oak details" },
  { id: "i5", url: "https://images.unsplash.com/photo-1617806118233-18e1db207faf?auto=format&fit=crop&q=80&w=600", label: "Linen drape fall" },
  { id: "i6", url: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&q=80&w=600", label: "Bronze hardware casting" }
];
