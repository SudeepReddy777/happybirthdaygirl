import type { ButtonHTMLAttributes, Ref } from "react";
import { PixelArrow } from "./PixelIcons";
import styles from "./RetroButton.module.css";

type RetroButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "type"
> & {
  /** Primary is the pink action; secondary is the quiet pale-pink "back / previous". */
  variant?: "primary" | "secondary";
  /** Pixel play-arrow before the label. */
  arrow?: boolean;
  /** Flip the arrow to point left (for "previous"). */
  arrowBack?: boolean;
  /** Slightly tighter padding for rows with two buttons. */
  compact?: boolean;
  ref?: Ref<HTMLButtonElement>;
};

/** Flat face, deeper bottom edge, presses down on tap. */
export function RetroButton({
  variant = "primary",
  arrow = true,
  arrowBack = false,
  compact = false,
  ref,
  children,
  ...rest
}: RetroButtonProps) {
  return (
    <button ref={ref} type="button" className={styles.button} data-variant={variant} data-compact={compact || undefined} {...rest}>
      {arrow ? (
        <PixelArrow className={`${styles.arrow} ${arrowBack ? styles.back : ""}`} />
      ) : null}
      <span>{children}</span>
    </button>
  );
}
