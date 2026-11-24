/** Hand-authored pixel glyphs. Silkscreen has no heart or arrow, and system fallbacks would not match. */

export function PixelHeart({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 7 6"
      width="1em"
      height="0.86em"
      fill="currentColor"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M1 0h2v1H1zM4 0h2v1H4zM0 1h7v2H0zM1 3h5v1H1zM2 4h3v1H2zM3 5h1v1H3z" />
    </svg>
  );
}

export function PixelArrow({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 4 7"
      width="0.55em"
      height="0.96em"
      fill="currentColor"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 0h1v7H0zM1 1h1v5H1zM2 2h1v3H2zM3 3h1v1H3z" />
    </svg>
  );
}
