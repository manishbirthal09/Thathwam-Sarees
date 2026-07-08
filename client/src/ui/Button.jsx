/**
 * Button
 * -----------------------------------------------------------------------
 * Single source of truth for every button/link style on the homepage.
 * Previously each section (Hero, Brand Story, Footer) hand-wrote its own
 * button classes with slightly different padding/timing — this collapses
 * them into one component so hover, focus, and sizing stay identical
 * everywhere they appear.
 *
 * Variants:
 *  - "primary"        filled #3F010C — reserved for the single highest-
 *                      priority action on a light-background section
 *  - "outline-light"   white/ivory outline — for use on top of photography
 *                      (hero). Never filled, so it never competes with
 *                      the image.
 *  - "outline-dark"    black outline — for use on white/ivory backgrounds
 *                      (brand story), fills #3F010C on hover
 *  - "ghost"           text-only link with a gold underline that draws in
 *                      on hover, optional trailing arrow
 *
 * All variants share the same focus-visible ring so keyboard users get a
 * consistent, visible focus indicator across the whole page.
 * -----------------------------------------------------------------------
 */

const BASE =
  "inline-flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-label transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const VARIANT_CLASSES = {
  primary:
    "bg-#3F010C px-9 py-3.5 text-ivory hover:bg-#3F010C-dark focus-visible:ring-#3F010C focus-visible:ring-offset-ivory",
  "outline-light":
    "border border-white/80 px-8 py-3.5 text-white hover:border-white hover:bg-white hover:text-black sm:px-10 sm:py-4 focus-visible:ring-white focus-visible:ring-offset-black",
  "outline-dark":
    "border border-black/80 px-9 py-3.5 text-black hover:border-#3F010C hover:bg-#3F010C hover:text-ivory focus-visible:ring-#3F010C focus-visible:ring-offset-white",
  ghost:
    "group relative px-0 py-0 text-white/90 hover:text-white focus-visible:ring-white focus-visible:ring-offset-black",
};

export default function Button({
  as = "button",
  variant = "primary",
  showArrow = false,
  className = "",
  children,
  ...props
}) {
  const Component = as;
  const isGhost = variant === "ghost";

  return (
    <Component
      className={`${BASE} ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    >
      {isGhost ? (
        <span className="relative">
          {children}
          <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 ease-in-out group-hover:w-full" />
        </span>
      ) : (
        children
      )}

      {showArrow && (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
          className="shrink-0 transition-transform duration-300 ease-in-out group-hover:translate-x-1"
        >
          <path
            d="M2 7h10M8 3l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </Component>
  );
}