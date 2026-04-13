import styles from "@/styles/tag.module.css";

export function CategoryTag({ children }: { children: React.ReactNode }) {
  return <span className={styles.tag}>{children}</span>;
}
