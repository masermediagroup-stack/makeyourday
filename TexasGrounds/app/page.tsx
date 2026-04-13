import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";
import Services, { type Service } from "@/components/Services";
import StatStrip from "@/components/StatStrip";
import Testimonials from "@/components/Testimonials";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const services: Service[] = [
  {
    title: "Lawn Maintenance",
    description: "Weekly and seasonal care tailored to healthy, polished turf.",
    icon: "sprout",
  },
  {
    title: "Landscape Design",
    description: "Custom garden concepts that fit your architecture and climate.",
    icon: "trees",
  },
  {
    title: "Irrigation Systems",
    description: "Smart watering plans that preserve beauty while reducing waste.",
    icon: "droplets",
  },
  {
    title: "Seasonal Planting",
    description: "Color-forward beds curated for year-round curb appeal.",
    icon: "flower2",
  },
  {
    title: "Outdoor Lighting",
    description: "Low-voltage lighting to elevate safety and evening ambiance.",
    icon: "lightbulb",
  },
];

const stats = [
  { value: "500+", label: "Properties Served" },
  { value: "12 Years", label: "In DFW" },
  { value: "100%", label: "Satisfaction Guarantee" },
];

const projects = [
  {
    name: "Frisco Residence",
    location: "Frisco, TX",
    imageSrc:
      "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Southlake Estate",
    location: "Southlake, TX",
    imageSrc:
      "https://images.unsplash.com/photo-1622288432450-277d0fef5ed6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Allen Garden Court",
    location: "Allen, TX",
    imageSrc:
      "https://images.unsplash.com/photo-1622227922682-56c92e523e0b?auto=format&fit=crop&w=1200&q=80",
  },
];

const testimonials = [
  {
    quote:
      "TexasGrounds gave our front yard real character without sacrificing easy maintenance. The team was precise, respectful, and highly skilled.",
    name: "Marina Holloway",
    neighborhood: "Allen, TX",
  },
  {
    quote:
      "From design to installation, everything felt premium and organized. Our outdoor lighting now transforms the whole property at night.",
    name: "Darius Whitlock",
    neighborhood: "Southlake, TX",
  },
];

export default function Home() {
  return (
    <>
      <Navbar links={navLinks} />
      <main>
        <Hero imageSrc="https://images.unsplash.com/photo-1464532466578-a5f5a4ec56a5?auto=format&fit=crop&w=2200&q=80" />
        <Services services={services} />
        <StatStrip stats={stats} />
        <Portfolio projects={projects} />
        <Testimonials items={testimonials} />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
