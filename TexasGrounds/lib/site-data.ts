export type NavLink = {
  label: string;
  href: string;
};

export type ServiceItem = {
  title: string;
  description: string;
  icon: "sprout" | "trees" | "droplets" | "flower2" | "lightbulb";
};

export type PortfolioItem = {
  name: string;
  location: string;
  imageSrc: string;
};

export const navLinks: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
];

export const services: ServiceItem[] = [
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

export const stats = [
  { value: "500+", label: "Properties Served" },
  { value: "12 Years", label: "In DFW" },
  { value: "100%", label: "Satisfaction Guarantee" },
];

export const projects: PortfolioItem[] = [
  {
    name: "Frisco Residence",
    location: "Frisco, TX",
    imageSrc: "/photos/naoki-suzuki-KrWucjRs2bY-unsplash.jpg",
  },
  {
    name: "Southlake Estate",
    location: "Southlake, TX",
    imageSrc: "/photos/martin-wemyss-0_ogdiw0vBE-unsplash.jpg",
  },
  {
    name: "Allen Garden Court",
    location: "Allen, TX",
    imageSrc: "/photos/kevin-13iy3FucuFo-unsplash.jpg",
  },
  {
    name: "Westlake Ranch Entry",
    location: "Westlake, TX",
    imageSrc: "/photos/sophi-raju-YJ1HVNsoEMo-unsplash.jpg",
  },
  {
    name: "Highland Park Courtyard",
    location: "Dallas, TX",
    imageSrc: "/photos/tracy-brower-7EiPQEd0gxk-unsplash.jpg",
  },
  {
    name: "River Crest Grounds",
    location: "Fort Worth, TX",
    imageSrc: "/photos/valeria-nikitina-6StRLC7N9Tw-unsplash.jpg",
  },
];

export const testimonials = [
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
