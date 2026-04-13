import type { Project, ProjectCategory } from "@/data/projects";
import { projects } from "@/data/projects";

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((p) => p.category === category);
}

export function getNextProjectInCategory(
  slug: string,
  category: ProjectCategory,
): Project | undefined {
  const list = getProjectsByCategory(category);
  const idx = list.findIndex((p) => p.slug === slug);
  if (idx === -1 || idx === list.length - 1) return undefined;
  return list[idx + 1];
}

export function categoryLabel(category: ProjectCategory): string {
  const map: Record<ProjectCategory, string> = {
    "web-design": "Web Design",
    "ui-ux": "UI/UX",
    logos: "Logos",
    "brand-identities": "Brand Identities",
    "social-media": "Social Media",
    "poster-exploration": "Poster Exploration",
    thumbnail: "Thumbnail",
  };
  return map[category];
}

export function categoryPath(category: ProjectCategory): string {
  const map: Record<ProjectCategory, string> = {
    "web-design": "/work/web-design",
    "ui-ux": "/work/ui-ux",
    logos: "/work/brand-design/logos",
    "brand-identities": "/work/brand-design/brand-identities",
    "social-media": "/work/brand-design/social-media",
    "poster-exploration": "/work/poster-exploration",
    thumbnail: "/work/thumbnail",
  };
  return map[category];
}
