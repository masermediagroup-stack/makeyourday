"use client";

import Image from "next/image";
import { useId, useState } from "react";

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
};

export function BeforeAfterSlider({ beforeSrc, afterSrc }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(58);
  const sliderId = useId();

  return (
    <section className="relative border border-[var(--line)] bg-[var(--surface)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={beforeSrc}
          alt="Concrete structure during demolition phase."
          fill
          className="object-cover"
        />
        <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${position}%` }}>
          <Image
            src={afterSrc}
            alt="Concrete structure after reconstruction and finishing."
            fill
            className="object-cover"
          />
        </div>
        <div
          className="absolute inset-y-0 w-px bg-[var(--accent)]"
          style={{ left: `calc(${position}% - 0.5px)` }}
          aria-hidden
        />
        <div
          className="absolute top-1/2 h-12 w-12 -translate-y-1/2 border border-[var(--accent)] bg-[var(--bg)]"
          style={{ left: `calc(${position}% - 24px)` }}
          aria-hidden
        />
      </div>

      <div className="grid gap-3 border-t border-[var(--line)] px-4 py-4">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
          <span>Before</span>
          <span>After</span>
        </div>
        <label htmlFor={sliderId} className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
          Slide to compare
        </label>
        <input
          id={sliderId}
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          className="w-full accent-[var(--accent)]"
          aria-label="Compare before and after construction images"
        />
      </div>
    </section>
  );
}
