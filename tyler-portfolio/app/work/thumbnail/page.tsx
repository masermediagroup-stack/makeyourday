import type { Metadata } from "next";

import { site } from "@/data/site";
import { thumbnails } from "@/data/projects";

import { ScrollRevealGrid } from "@/components/effects/ScrollRevealGrid";
import { ThumbnailGallery } from "@/components/ui/ThumbnailGallery";

import sub from "@/styles/subpage.module.css";

export const metadata: Metadata = {
  title: "Thumbnail",
};

export default function ThumbnailPage() {
  return (
    <div>
      <header className={sub.header}>
        <h1 className="display-lg text-[var(--text-primary)]">Thumbnail</h1>
        <p className="body-lg mt-6 max-w-3xl text-[var(--text-secondary)]">
          {site.thumbnailsIntro}
        </p>
      </header>
      <ScrollRevealGrid>
        <ThumbnailGallery items={thumbnails} />
      </ScrollRevealGrid>
    </div>
  );
}
