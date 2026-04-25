"use client";

import type { Project } from "@/data/projects";
import { categoryLabel } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";

import { MagicCard } from "@/components/ui/magic-card";
import { CategoryTag } from "@/components/ui/CategoryTag";
import { PlaceholderBlock } from "@/components/ui/PlaceholderBlock";

import styles from "@/styles/project-card.module.css";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/project/${project.slug}`} className={styles.card}>
      <MagicCard
        className="rounded-[2px] border border-[var(--border-line)] bg-[var(--bg-primary)] p-0"
        gradientFrom="rgba(124, 58, 237, 0.35)"
        gradientTo="rgba(237, 233, 254, 0.9)"
        gradientSize={220}
        gradientColor="rgba(124, 58, 237, 0.28)"
        gradientOpacity={0.42}
      >
        <div className={styles.media}>
          <div className={styles.mediaInner}>
            {project.thumbnail ? (
              <Image
                src={project.thumbnail}
                alt=""
                width={800}
                height={600}
                className="h-full w-full object-cover"
                sizes="(max-width: 768px) 100vw, 640px"
              />
            ) : (
              <PlaceholderBlock label={project.title} ratio="4/3" />
            )}
          </div>
        </div>
        <div className="p-4">
          <div className={styles.meta}>
            <span className={`display-md ${styles.title}`}>{project.title}</span>
            <CategoryTag>{categoryLabel(project.category)}</CategoryTag>
          </div>
        </div>
      </MagicCard>
    </Link>
  );
}
