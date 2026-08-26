// Internal decorative glyphs shared across DIBK components. Not part of the public
// barrel. All are aria-hidden; the surrounding control supplies the accessible name.

export function SearchIcon({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

/* Animated bar glyphs: on hover the Meny burger's outer bars
   travel through the middle bar and swap places; the Lukk X spins half a turn.
   The motion CSS lives with the consuming component (Header.css / MegaMenu.css).
   The burger is one SVG (not three separate spans) so all bars anti-alias
   identically - separate spans pixel-snap independently and get uneven weights. */
export function MenuIcon() {
  return (
    <svg
      className="dibk-burger"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      aria-hidden="true"
    >
      <line className="dibk-burger__bar--top" x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" />
      <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" />
      <line className="dibk-burger__bar--bottom" x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <span className="dibk-xglyph" aria-hidden="true">
      <span className="dibk-xglyph__bar dibk-xglyph__bar--a" />
      <span className="dibk-xglyph__bar dibk-xglyph__bar--b" />
    </span>
  );
}

/* Padlock marking login-gated items (square corners per the DIBK aesthetic). */
export function LockIcon({ size = 14, className }: { size?: number; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="5" y="11" width="14" height="9" stroke="currentColor" strokeWidth="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

/* The DIBK link chevron: a filled path in a 20x20 box with built-in
   whitespace around the glyph. */
export function ChevronRight({
  width = 20,
  height = 20,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M11.6856 9.99942L6.43408 4.75666L7.94603 3.24219L14.7145 9.99942L7.94603 16.7567L6.43408 15.2422L11.6856 9.99942Z"
        fill="currentColor"
      />
    </svg>
  );
}
