import type { Metadata } from "next";

import sub from "@/styles/subpage.module.css";

export const metadata: Metadata = {
  title: "Poster Exploration",
};

export default function PosterExplorationPage() {
  return (
    <div>
      <header className={sub.header}>
        <h1 className="display-lg text-[var(--text-primary)]">Poster Exploration</h1>
        <p className="body-lg mt-6 max-w-2xl text-[var(--text-secondary)]">
          Editorial and promotional posters — this section will fill in as projects are added to{" "}
          <code className="rounded bg-[var(--bg-tertiary)] px-1 py-0.5 text-sm">data/projects.ts</code>{" "}
          with the <span className="text-[var(--text-muted)]">poster-exploration</span> category.
        </p>
      </header>
    </div>
  );
}
