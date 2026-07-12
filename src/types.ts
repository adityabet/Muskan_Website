export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  description: string;
  image: string;
  beforeImage?: string; // For the before/after interactive slider
  afterImage?: string;
  details: {
    client: string;
    size: string;
    duration: string;
    style: string;
    concept: string;
    scope: string[];
  };
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface ProcessStep {
  phase: string;
  title: string;
  description: string;
  timeline: string;
  details: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  image: string;
  rating: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
}
