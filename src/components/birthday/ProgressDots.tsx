import styles from "./ProgressDots.module.css";

type ProgressDotsProps = { total: number; current: number };

/** Short pink segments under the counter, as in the reference. Decorative: the counter text carries the meaning. */
export function ProgressDots({ total, current }: ProgressDotsProps) {
  return (
    <div className={styles.wrap} aria-hidden="true">
      {Array.from({ length: total }, (_, i) => (
        <i key={i} className={`${styles.seg} ${i <= current ? styles.on : ""}`} />
      ))}
    </div>
  );
}
