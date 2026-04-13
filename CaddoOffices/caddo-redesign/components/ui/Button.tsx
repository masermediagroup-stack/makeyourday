import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "brand" | "ghost-light" | "ghost-dark" | "link";

const base =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm md:text-base transition duration-200 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--red-accent)] text-white hover:brightness-110 shadow-[0_12px_30px_-14px_rgba(226,85,23,0.7)]",
  brand:
    "bg-[var(--blue-deep)] text-white hover:bg-[var(--blue-mid)] shadow-[0_12px_30px_-14px_rgba(0,67,90,0.7)]",
  "ghost-light": "border border-white/80 text-white hover:bg-white/10",
  "ghost-dark":
    "border border-[var(--blue-deep)] text-[var(--blue-deep)] hover:bg-[var(--blue-deep)]/5",
  link: "px-0 py-0 rounded-none text-[var(--blue-deep)] hover:underline",
};

export function Button({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]}`}>
      {children}
    </Link>
  );
}
