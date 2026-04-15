import type { Project } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";

import { CategoryTag } from "@/components/ui/CategoryTag";
import { PlaceholderBlock } from "@/components/ui/PlaceholderBlock";

import { categoryLabel } from "@/lib/projects";

import styles from "@/styles/project-row.module.css";

export function ProjectRow({ project }: { project: Project }) {
  const showLive = Boolean(project.liveUrl);
  const showCase =
    project.scope !== "external-reference" &&
    project.category === "web-design" &&
    !project.hideCaseStudyRow;

  return (
    <div className={styles.row} data-reveal-card>
      <div className={styles.thumb}>
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt=""
            width={400}
            height={300}
            className="h-full w-full object-cover"
          />
        ) : (
          <PlaceholderBlock label={project.title} ratio="4/3" />
        )}
      </div>
      <div className={styles.body}>
        <div className="flex flex-wrap items-baseline gap-3">
          <h3 className="display-md text-[var(--text-primary)]">{project.title}</h3>
          <CategoryTag>{categoryLabel(project.category)}</CategoryTag>
          {project.scope === "external-reference" ? (
            <span className={styles.tagExternal}>External Reference</span>
          ) : null}
        </div>
        <p className="body-md text-[var(--text-secondary)]">{project.description}</p>
        <div className={styles.actions}>
          {showLive ? (
            <a
              href={project.liveUrl}
              className={styles.external}
              target="_blank"
              rel="noreferrer"
            >
              Visit Site ↗
            </a>
          ) : null}
          {showCase ? (
            <Link href={`/project/${project.slug}`} className={styles.case}>
              View Case Study →
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
