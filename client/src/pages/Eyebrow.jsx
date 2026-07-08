/**
 * Eyebrow
 * -----------------------------------------------------------------------
 * Small tracked-out label used above headings across every section
 * (Hero, Featured Collections, Brand Story, Why Choose Us). Centralizing
 * this prevents the "same style, five slightly different className
 * strings" drift that makes a site feel templated.
 *
 * `tone`:
 *  - "gold"  (default) — for use on ivory/white backgrounds
 *  - "light" — for use on dark/photo backgrounds (hero, footer)
 * -----------------------------------------------------------------------
 */

const TONE_CLASSES = {
  gold: "text-gold",
  light: "text-ivory/70",
};

export default function Eyebrow({ children, tone = "gold", className = "" }) {
  return (
    <p
      className={`text-[11px] font-medium uppercase tracking-labelWide ${TONE_CLASSES[tone]} ${className}`}
    >
      {children}
    </p>
  );
}