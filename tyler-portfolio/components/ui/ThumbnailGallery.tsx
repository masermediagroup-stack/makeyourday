"use client";

import type { ThumbnailItem } from "@/data/projects";
import Image from "next/image";
import { useMemo, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { getInitials } from "@/lib/utils-display";

import styles from "@/styles/thumbnail-gallery.module.css";

const PAGE_SIZE = 24;

export function ThumbnailGallery({ items }: { items: ThumbnailItem[] }) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [active, setActive] = useState<ThumbnailItem | null>(null);

  const slice = useMemo(() => items.slice(0, visible), [items, visible]);

  return (
    <>
      <div className={styles.masonry}>
        {slice.map((item) => (
          <button
            key={item.id}
            type="button"
            className={styles.cell}
            onClick={() => setActive(item)}
            data-reveal-card
          >
            <div className={styles.ratio}>
              {item.src ? (
                <Image
                  src={item.src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 767px) 100vw, 33vw"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[var(--bg-tertiary)]">
                  <span className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--text-muted)]">
                    {getInitials(item.title, 4)}
                  </span>
                </div>
              )}
            </div>
            <span className={styles.overlay}>{item.title}</span>
          </button>
        ))}
      </div>

      {visible < items.length ? (
        <div className={styles.more}>
          <button
            type="button"
            className={styles.loadMore}
            onClick={() => setVisible((v) => Math.min(v + PAGE_SIZE, items.length))}
          >
            Load more
          </button>
        </div>
      ) : null}

      <Dialog open={active !== null} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-4xl border-[var(--border-line)] bg-[var(--bg-primary)]">
          <DialogTitle className="sr-only">{active?.title ?? "Thumbnail"}</DialogTitle>
          {active ? (
            <div className="relative aspect-video w-full bg-[var(--bg-tertiary)]">
              {active.src ? (
                <Image
                  src={active.src}
                  alt=""
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              ) : (
                <div className="flex h-full min-h-[200px] items-center justify-center bg-[var(--bg-tertiary)] p-8">
                  <span className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--text-muted)]">
                    {getInitials(active.title, 4)}
                  </span>
                </div>
              )}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
