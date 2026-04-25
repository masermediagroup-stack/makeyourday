"use client";

import type { LogoItem } from "@/data/projects";
import Image from "next/image";
import { useCallback, useState } from "react";

import { PlaceholderBlock } from "@/components/ui/PlaceholderBlock";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

import styles from "@/styles/logo-grid.module.css";

export function LogoGrid({ items }: { items: LogoItem[] }) {
  const [active, setActive] = useState<LogoItem | null>(null);

  const onOpen = useCallback((item: LogoItem) => {
    setActive(item);
  }, []);

  const onClose = useCallback(() => setActive(null), []);

  return (
    <>
      <div className={styles.grid}>
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={styles.cell}
            onClick={() => onOpen(item)}
            data-reveal-card
          >
            <div className={styles.logoWrap}>
              {item.src ? (
                <Image
                  src={item.src}
                  alt={`${item.client} logo`}
                  width={320}
                  height={200}
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <PlaceholderBlock label={item.client} ratio="4/3" />
              )}
            </div>
            <span className={styles.caption}>{item.client}</span>
          </button>
        ))}
      </div>

      <Dialog open={active !== null} onOpenChange={(o) => !o && onClose()}>
        <DialogContent className="max-w-lg border-[var(--border-line)] bg-[var(--bg-primary)]">
          <DialogTitle className="sr-only">
            {active ? `${active.client} logo` : "Logo"}
          </DialogTitle>
          {active ? (
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="relative flex min-h-[200px] w-full items-center justify-center bg-[var(--bg-secondary)] p-8">
                {active.src ? (
                  <Image
                    src={active.src}
                    alt={`${active.client} logo`}
                    width={480}
                    height={320}
                    className="max-h-[320px] w-auto object-contain"
                  />
                ) : (
                  <PlaceholderBlock label={active.client} ratio="4/3" />
                )}
              </div>
              <p className="body-md text-[var(--text-primary)]">{active.client}</p>
              <p className="body-sm text-[var(--text-muted)]">Designed in {active.year}</p>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
