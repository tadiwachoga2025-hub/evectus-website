/**
 * Animated scroll indicator for hero sections.
 * Shows a mouse outline with a bouncing wheel dot + "Scroll" label.
 */
export function ScrollIndicator({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`flex flex-col items-center gap-2.5 text-[11px] uppercase tracking-widest text-white/70 ${className ?? ""}`}
    >
      <span className="flex h-9 w-[22px] items-start justify-center rounded-full border border-white/40 p-1.5">
        <span className="h-1.5 w-[3px] rounded-full bg-white/80 animate-scroll-wheel" />
      </span>
      Scroll
    </div>
  );
}

export default ScrollIndicator;
