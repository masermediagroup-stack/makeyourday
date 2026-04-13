import { getInitials } from "@/lib/utils-display";

import styles from "@/styles/placeholder.module.css";

export function PlaceholderBlock({
  label,
  ratio = "4/3",
}: {
  label: string;
  ratio?: "4/3" | "16/9" | "16/10";
}) {
  const initials = getInitials(label, 4);
  const ratioClass =
    ratio === "16/9"
      ? styles.r169
      : ratio === "16/10"
        ? styles.r1610
        : styles.r43;

  return (
    <div className={`${styles.root} ${ratioClass}`} aria-hidden>
      <span className={styles.initials}>{initials}</span>
    </div>
  );
}
