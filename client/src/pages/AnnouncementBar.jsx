import { useState, useEffect, useRef } from "react";

/**
 * AnnouncementBar
 * -----------------------------------------------------------------------
 * Slim #3F010C ribbon at the very top of the page — sits in normal
 * document flow (not fixed) so it scrolls away naturally, letting the
 * fixed Navbar below it rise to top:0. See Navbar.jsx for the paired
 * scroll-driven offset logic.
 *
 * This is one of only three sanctioned solid-#3F010C usages on the
 * homepage (alongside the primary CTA and the footer), so it's kept
 * deliberately thin and quiet rather than a bold banner.
 * -----------------------------------------------------------------------
 */

const MESSAGES = [
  "Free Shipping Across India",
  "Handcrafted Elegance Delivered Nationwide",
  "New Festive Collection Now Live",
  "Flat 10% Off On First Order",
];

const ROTATE_MS = 4500;

export const ANNOUNCEMENT_BAR_HEIGHT = 40; // px — referenced by Navbar for its scroll offset

export default function AnnouncementBar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion.current) return undefined;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % MESSAGES.length);
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="relative flex items-center justify-center overflow-hidden border-b border-gold/25  px-4"
      style={{ height: ANNOUNCEMENT_BAR_HEIGHT }}
      role="region"
      aria-label="Store announcements"
    >
      {/* Visually-hidden live text so screen readers get the current message
          without having every rotation read aloud mid-transition */}
      <span className="sr-only" aria-live="polite">
        {MESSAGES[activeIndex]}
      </span>

      <div aria-hidden="true" className="relative h-4 w-full max-w-md text-center">
        {MESSAGES.map((message, index) => (
          <p
            key={message}
            className={`absolute inset-0 text-[11px] font-medium uppercase tracking-label text-ivory transition-opacity duration-500 ease-in-out ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            {message}
          </p>
        ))}
      </div>
    </div>
  );
}



// import { useState, useEffect, useRef } from "react";

// /**
//  * AnnouncementBar
//  * -----------------------------------------------------------------------
//  * Slim #3F010C ribbon at the very top of the page — sits in normal
//  * document flow (not fixed) so it scrolls away naturally, letting the
//  * fixed Navbar below it rise to top:0. See Navbar.jsx for the paired
//  * scroll-driven offset logic.
//  *
//  * This is one of only three sanctioned solid-#3F010C usages on the
//  * homepage (alongside the primary CTA and the footer), so it's kept
//  * deliberately thin and quiet rather than a bold banner.
//  * -----------------------------------------------------------------------
//  */

// const MESSAGES = [
//   "Free Shipping Across India",
//   "Handcrafted Elegance Delivered Nationwide",
//   "New Festive Collection Now Live",
//   "Flat 10% Off On First Order",
// ];

// const ROTATE_MS = 4500;

// export const ANNOUNCEMENT_BAR_HEIGHT = 40; // px — referenced by Navbar for its scroll offset

// export default function AnnouncementBar() {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const prefersReducedMotion = useRef(false);

//   useEffect(() => {
//     prefersReducedMotion.current = window.matchMedia(
//       "(prefers-reduced-motion: reduce)"
//     ).matches;
//   }, []);

//   useEffect(() => {
//     if (prefersReducedMotion.current) return undefined;
//     const timer = setInterval(() => {
//       setActiveIndex((prev) => (prev + 1) % MESSAGES.length);
//     }, ROTATE_MS);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div
//       className="relative flex items-center justify-center overflow-hidden bg-[#3F010C] px-4"
//       style={{ height: ANNOUNCEMENT_BAR_HEIGHT }}
//       role="region"
//       aria-label="Store announcements"
//     >
//       {/* Visually-hidden live text so screen readers get the current message
//           without having every rotation read aloud mid-transition */}
//       <span className="sr-only" aria-live="polite">
//         {MESSAGES[activeIndex]}
//       </span>

//       <div aria-hidden="true" className="relative h-4 w-full max-w-md text-center">
//         {MESSAGES.map((message, index) => (
//           <p
//             key={message}
//             className={`absolute inset-0 text-[11px] font-medium uppercase tracking-label text-ivory transition-opacity duration-500 ease-in-out ${
//               index === activeIndex ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             {message}
//           </p>
//         ))}
//       </div>
//     </div>
//   );
// }