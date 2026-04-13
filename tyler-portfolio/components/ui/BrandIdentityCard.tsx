import type { Project } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";

import { PlaceholderBlock } from "@/components/ui/PlaceholderBlock";

import styles from "@/styles/brand-card.module.css";

export function BrandIdentityCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/project/${project.slug}`}
      className={styles.card}
      data-reveal-card
    >
      <div className={styles.media}>
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt=""
            width={900}
            height={600}
            className="h-full w-full object-cover"
          />
        ) : (
          <PlaceholderBlock label={project.title} ratio="16/10" />
        )}
      </div>
      <div className={styles.meta}>
        <h3 className="display-md text-[var(--text-primary)]">{project.title}</h3>
        <p className="body-sm text-[var(--text-muted)]">{project.client}</p>
      </div>
    </Link>
  );
}
