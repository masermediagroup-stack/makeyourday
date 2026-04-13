import type { Project } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";

import { PlaceholderBlock } from "@/components/ui/PlaceholderBlock";

import styles from "@/styles/ui-ux-card.module.css";

export function UiUxCard({ project }: { project: Project }) {
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
            width={800}
            height={500}
            className="h-full w-full object-cover"
          />
        ) : (
          <PlaceholderBlock label={project.title} ratio="16/10" />
        )}
      </div>
      <div className={styles.meta}>
        <h3 className="display-md text-[var(--text-primary)]">{project.title}</h3>
        <p className="body-sm text-[var(--text-secondary)]">{project.description}</p>
        {project.tool ? (
          <span className="label-sm text-[var(--portfolio-accent)]">{project.tool}</span>
        ) : null}
      </div>
    </Link>
  );
}
