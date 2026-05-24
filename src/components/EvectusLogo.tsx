interface EvectusLogoProps {
  /** Show icon only (no wordmark text) */
  iconOnly?: boolean;
  /** Height of the logo in pixels */
  height?: number;
  /** CSS class name */
  className?: string;
  /** Color variant */
  variant?: "color" | "white";
}

/**
 * Evectus brand logo — double-chevron icon + wordmark.
 * Renders as inline SVG for crisp display at any resolution.
 */
export function EvectusLogo({
  iconOnly = false,
  height = 32,
  className,
  variant = "color",
}: EvectusLogoProps) {
  const textColor = variant === "white" ? "#FFFFFF" : "#0B1A3E";
  const lightBlue = variant === "white" ? "#FFFFFF" : "#29ABE2";
  const midBlue = variant === "white" ? "rgba(255,255,255,0.85)" : "#1A8FD1";
  const darkBlue = variant === "white" ? "rgba(255,255,255,0.7)" : "#0D5FA3";

  const iconPaths = (
    <g>
      {/* Back chevron (darker) */}
      <path d="M15 52 L50 87 L85 52 L70 52 L50 72 L30 52 Z" fill={darkBlue} />
      {/* Mid chevron */}
      <path d="M15 38 L50 73 L85 38 L70 38 L50 58 L30 38 Z" fill={midBlue} />
      {/* Front chevron (lighter) */}
      <path d="M15 22 L50 57 L85 22 L70 22 L50 42 L30 22 Z" fill={lightBlue} />
    </g>
  );

  if (iconOnly) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        height={height}
        className={className}
        aria-label="Evectus"
        role="img"
      >
        {iconPaths}
      </svg>
    );
  }

  // Full logo: icon + wordmark
  const totalWidth = height * 5.5;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 550 100"
      height={height}
      width={totalWidth}
      className={className}
      aria-label="Evectus"
      role="img"
    >
      <g>
        {iconPaths}
      </g>

      {/* Wordmark */}
      <text
        x="90"
        y="68"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="700"
        fontSize="62"
        letterSpacing="-1"
        fill={textColor}
      >
        Evectus
      </text>
    </svg>
  );
}

export default EvectusLogo;
