interface EvectusLogoProps {
  /** Show icon only (no wordmark text) */
  iconOnly?: boolean;
  /** Height of the logo in pixels (optional, default 32 for wordmark, 32 for icon) */
  height?: number;
  /** CSS class name */
  className?: string;
  /** Color variant */
  variant?: "color" | "white";
}

/**
 * Draws an "E" as three horizontal bars (no vertical stroke), centred on `cx`.
 * Declared at module scope so it isn't re-created on every render.
 */
function BarE({ cx, fill }: { cx: number; fill: string }) {
  const bw = 28;
  const x = cx - bw / 2;
  return (
    <g>
      <rect x={x} y={18} width={bw} height={5} rx={1.5} fill={fill} />
      <rect x={x} y={30} width={bw} height={5} rx={1.5} fill={fill} />
      <rect x={x} y={42} width={bw} height={5} rx={1.5} fill={fill} />
    </g>
  );
}

/**
 * Evectus brand logo — hybrid geometric wordmark.
 *
 * The "E" letters are drawn as three horizontal bars (no vertical stroke).
 * All other letters (V, C, T, U, S) render in Michroma geometric sans-serif.
 * Both share the same visual weight and vertical alignment inside SVG space.
 */
export function EvectusLogo({
  iconOnly = false,
  height,
  className,
  variant = "color",
}: EvectusLogoProps) {
  const fill = variant === "white" ? "#FFFFFF" : "#1a1a1a";
  const fontFamily =
    "var(--font-michroma), Michroma, 'SF Pro Display', system-ui, sans-serif";

  if (iconOnly) {
    const iconHeight = height ?? 32;
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 80 80"
        height={height ? iconHeight : undefined}
        className={className}
        aria-label="Evectus"
        role="img"
      >
        <rect x={14} y={16} width={52} height={10} rx={2} fill={fill} />
        <rect x={14} y={35} width={52} height={10} rx={2} fill={fill} />
        <rect x={14} y={54} width={52} height={10} rx={2} fill={fill} />
      </svg>
    );
  }

  /*
   * Full wordmark
   *
   * ViewBox   330 × 64
   * Font      Michroma 42px, baseline y = 48
   * E-bars    width 28, height 5, rx 1.5
   *           y = 18 / 30 / 42  (matches ~30px cap-height perfectly)
   * Pitch     ~46 between letter centres
   */
  const calculatedHeight = height ?? 32;
  const calculatedWidth = calculatedHeight * (330 / 64);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 330 64"
      height={height ? calculatedHeight : undefined}
      width={height ? calculatedWidth : undefined}
      className={className}
      aria-label="Evectus"
      role="img"
    >
      {/* E */}
      <BarE cx={16} fill={fill} />

      {/* V */}
      <text x={62} y={48} fontFamily={fontFamily} fontWeight="400" fontSize="42" textAnchor="middle" fill={fill}>V</text>

      {/* E */}
      <BarE cx={108} fill={fill} />

      {/* C */}
      <text x={155} y={48} fontFamily={fontFamily} fontWeight="400" fontSize="42" textAnchor="middle" fill={fill}>C</text>

      {/* T */}
      <text x={201} y={48} fontFamily={fontFamily} fontWeight="400" fontSize="42" textAnchor="middle" fill={fill}>T</text>

      {/* U */}
      <text x={249} y={48} fontFamily={fontFamily} fontWeight="400" fontSize="42" textAnchor="middle" fill={fill}>U</text>

      {/* S */}
      <text x={296} y={48} fontFamily={fontFamily} fontWeight="400" fontSize="42" textAnchor="middle" fill={fill}>S</text>
    </svg>
  );
}

export default EvectusLogo;
