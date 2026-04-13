import Link from "next/link";

import styles from "@/styles/back-link.module.css";

export function BackLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link href={href} className={styles.link}>
      ← Back to {label}
    </Link>
  );
}
