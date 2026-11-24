/**
 * Fetches the display and body fonts while the boot scene is on screen, so they are
 * ready for the reveal. Invisible and removed from the accessibility tree.
 */
export function FontWarmup() {
  const base = {
    position: "absolute",
    opacity: 0,
    pointerEvents: "none",
    left: 0,
    top: 0,
  } as const;
  return (
    <div aria-hidden="true" style={base}>
      <span style={{ fontFamily: "var(--font-display)" }}>Aa</span>
      <span style={{ fontFamily: "var(--font-body)" }}>Aa</span>
      <b style={{ fontFamily: "var(--font-body)" }}>Aa</b>
    </div>
  );
}
