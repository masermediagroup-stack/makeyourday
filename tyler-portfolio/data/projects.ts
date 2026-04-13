export type ProjectCategory =
  | "web-design"
  | "ui-ux"
  | "logos"
  | "brand-identities"
  | "social-media"
  | "poster-exploration"
  | "thumbnail";

export type ProjectScope = "full" | "design-only" | "external-reference";

export interface Project {
  slug: string;
  title: string;
  client: string;
  year: number;
  category: ProjectCategory;
  description: string;
  thumbnail: string | null;
  images: string[];
  liveUrl?: string;
  scope: ProjectScope;
  tags: string[];
  featured: boolean;
  tool?: string;
  videoUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "caddo-offices",
    title: "Caddo Offices",
    client: "Caddo Offices",
    year: 2025,
    category: "web-design",
    description:
      "Web design and layout build for a local away-from-home office company. Designed to communicate professionalism and accessibility for remote workers seeking flexible workspace solutions.",
    thumbnail: null,
    images: [],
    liveUrl: undefined,
    scope: "full",
    tags: ["Web Design", "Layout", "Development"],
    featured: true,
  },
  {
    slug: "texas-grounds",
    title: "Texas Grounds",
    client: "Texas Grounds",
    year: 2025,
    category: "web-design",
    description:
      "Web design and full layout development for a landscaping company based in the DFW area of Texas. Built to showcase services, drive local leads, and establish trust with residential and commercial clients.",
    thumbnail: null,
    images: [],
    liveUrl: undefined,
    scope: "full",
    tags: ["Web Design", "Layout", "Development"],
    featured: true,
  },
  {
    slug: "miller-more-handiwork",
    title: "Miller More Handy Work",
    client: "Miller More Handy Work",
    year: 2025,
    category: "web-design",
    description:
      "Full website design and development built inside Framer. A complete end-to-end build delivering a polished digital presence for a hands-on handyman service.",
    thumbnail: null,
    images: [],
    liveUrl: undefined,
    scope: "full",
    tags: ["Web Design", "Framer", "Full Build"],
    featured: true,
  },
  {
    slug: "dashboard-kit-alpha",
    title: "Dashboard Kit",
    client: "Internal",
    year: 2025,
    category: "ui-ux",
    description:
      "Modular dashboard surfaces, tables, and filters designed for dense data without visual noise.",
    thumbnail: null,
    images: [],
    scope: "design-only",
    tags: ["Dashboard", "Design System"],
    featured: false,
    tool: "Figma",
  },
  {
    slug: "component-library-beta",
    title: "Component Library",
    client: "Internal",
    year: 2025,
    category: "ui-ux",
    description:
      "Inputs, dialogs, and cards with consistent spacing scales and interaction states.",
    thumbnail: null,
    images: [],
    scope: "design-only",
    tags: ["UI", "Components"],
    featured: false,
    tool: "Paper",
  },
  {
    slug: "brand-alpha",
    title: "Brand Alpha",
    client: "Client A",
    year: 2024,
    category: "brand-identities",
    description:
      "Identity system with motion-forward hero, color logic, and typographic hierarchy for launch.",
    thumbnail: null,
    images: [],
    scope: "full",
    tags: ["Identity", "Motion"],
    featured: false,
  },
  {
    slug: "brand-beta",
    title: "Brand Beta",
    client: "Client B",
    year: 2024,
    category: "brand-identities",
    description:
      "Full visual language including logo suite, patterns, and social templates.",
    thumbnail: null,
    images: [],
    videoUrl: undefined,
    scope: "full",
    tags: ["Identity", "Guidelines"],
    featured: false,
  },
  {
    slug: "social-launch-kit",
    title: "Launch Kit",
    client: "Creator Collective",
    year: 2025,
    category: "social-media",
    description:
      "Campaign-ready social frames, story sets, and cover art aligned to a single grid.",
    thumbnail: null,
    images: [],
    scope: "full",
    tags: ["Social", "Campaign"],
    featured: false,
  },
];

export interface LogoItem {
  id: string;
  client: string;
  year: string;
  src: string | null;
}

export const logos: LogoItem[] = [
  { id: "logo-1", client: "Northwind", year: "2024", src: null },
  { id: "logo-2", client: "Harbor Co.", year: "2023", src: null },
  { id: "logo-3", client: "Studio Elle", year: "2025", src: null },
];

export interface ThumbnailItem {
  id: string;
  title: string;
  client?: string;
  src: string | null;
}

export const thumbnails: ThumbnailItem[] = Array.from({ length: 28 }, (_, i) => ({
  id: `thumb-${i + 1}`,
  title: `Video title ${i + 1}`,
  client: i % 3 === 0 ? "Client A" : undefined,
  src: null,
}));
