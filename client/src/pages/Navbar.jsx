import { useState, useEffect, useRef, useCallback } from "react";
import { ANNOUNCEMENT_BAR_HEIGHT  } from "./AnnouncementBar";
import AnnouncementBar from "./AnnouncementBar";

/**
 * Navbar
 * -----------------------------------------------------------------------
 * Fixed, permanently #3F010C navbar that rises to top:0 as the
 * announcement bar scrolls out of view. Three-column desktop layout:
 * menu links | centered logo | utility icons.
 *
 * Background is intentionally constant (bg-[#3F010C]) rather than
 * transparent-over-hero — the announcement bar above it gets its own
 * thin gold divider (see AnnouncementBar.jsx) so the two #3F010C bars
 * read as distinct rather than fusing into one block.
 *
 * Uses the same brand tokens as prior sections — tailwind.config.js
 * should define: #3F010C / #3F010C-dark, ivory, gold, font-serif.
 * -----------------------------------------------------------------------
 */

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/collections" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Festive Edit", href: "/festive-edit" },
  { label: "About", href: "/about" },
];

const SCROLL_THRESHOLD = ANNOUNCEMENT_BAR_HEIGHT;
const CART_ITEM_COUNT = 2; // wire up to real cart state

function SearchIcon(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CartIcon(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6 8h12l-1 12.5a1.5 1.5 0 0 1-1.5 1.5h-7a1.5 1.5 0 0 1-1.5-1.5L6 8z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchInputRef = useRef(null);

  // Scroll-driven offset only — color no longer changes with scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll while an overlay is open
  useEffect(() => {
    document.body.style.overflow =
      isSearchOpen || isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSearchOpen, isMobileMenuOpen]);

  // Focus the search input the moment the overlay opens
  useEffect(() => {
    if (isSearchOpen) {
      const id = setTimeout(() => searchInputRef.current?.focus(), 250);
      return () => clearTimeout(id);
    }
    return undefined;
  }, [isSearchOpen]);

  const closeOverlays = useCallback(() => {
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
  }, []);

  // Escape closes whichever overlay is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeOverlays();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeOverlays]);

  // Constant tones — background is always #3F010C now, so text/icons
  // always sit on a dark surface regardless of scroll state
  const linkToneClass = "text-ivory/85 hover:text-ivory";
  const iconToneClass = "text-ivory/85 hover:text-gold";

  return (
    <>
      <header
        className="fixed inset-x-0 z-40 border-b border-gold/25 bg-[#3F010C] text-white transition-[top] duration-300 ease-in-out"
        style={{ top: isScrolled ? 0 : ANNOUNCEMENT_BAR_HEIGHT }}
      >
        <nav
          aria-label="Primary"
          className="mx-auto grid h-16 max-w-[1600px] grid-cols-3 items-center px-6 sm:px-10 md:h-20 lg:h-24 lg:px-16"
        >
          {/* Left — desktop menu links */}
          <ul className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`group relative text-[12px] font-medium uppercase tracking-label transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-#3F010C ${linkToneClass}`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 ease-in-out group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile — hamburger (left column on small screens) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
            className={`justify-self-start p-1 transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-#3F010C lg:hidden ${iconToneClass}`}
          >
            <MenuIcon />
          </button>

          {/* Center — logo */}
          <a
            href="/"
            className="col-start-2 justify-self-center font-serif text-xl font-normal tracking-[-0.01em] text-ivory transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-#3F010C sm:text-2xl"
          >
            <img src="/Thathwamlogo.png" alt="Thathwam Sarees" className="h-9 w-auto sm:h-10 rounded-sm" />
          </a>

          {/* Right — utility icons */}
          <div className="flex items-center justify-end gap-5">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search"
              className={`p-1 transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-#3F010C ${iconToneClass}`}
            >
              <SearchIcon />
            </button>

            <a
              href="/cart"
              aria-label={`Cart, ${CART_ITEM_COUNT} items`}
              className={`relative p-1 transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-#3F010C ${iconToneClass}`}
            >
              <CartIcon />
              {CART_ITEM_COUNT > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-medium text-#3F010C">
                  {CART_ITEM_COUNT}
                </span>
              )}
            </a>
          </div>
        </nav>
      </header>

      {/* ------------------------------------------------------------ */}
      {/* Fullscreen search overlay                                    */}
      {/* ------------------------------------------------------------ */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className={`fixed inset-0 z-50 flex flex-col bg-ivory transition-opacity duration-300 ease-in-out ${
          isSearchOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-end px-6 pt-6 sm:px-10 sm:pt-8">
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            aria-label="Close search"
            className="p-1 text-black/70 transition-colors duration-300 ease-in-out hover:text-#3F010C focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-#3F010C focus-visible:ring-offset-2"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex flex-1 items-center justify-center px-6">
          <div className="w-full max-w-2xl">
            <p className="mb-4 text-center text-[11px] font-medium uppercase tracking-labelWide text-gold">
              Search
            </p>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Sarees, collections, fabrics…"
              className="w-full border-b border-black/30 bg-transparent pb-4 text-center font-serif text-2xl text-black placeholder:text-black/35 focus:border-#3F010C focus:outline-none sm:text-4xl"
            />
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* Fullscreen mobile menu                                       */}
      {/* ------------------------------------------------------------ */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-0 z-50 flex flex-col bg-[#3F010C]  text-white transition-opacity duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-6 pt-6">
          <span className="font-serif text-xl text-ivory">Thathwam Sarees</span>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
            className="p-1 text-ivory/80 transition-colors duration-300 ease-in-out hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-#3F010C"
          >
            <CloseIcon />
          </button>
        </div>

        <nav aria-label="Mobile primary" className="flex flex-1 flex-col justify-center px-8">
          <ul className="space-y-7">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-4xl font-normal text-ivory transition-colors duration-300 ease-in-out hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-#3F010C sm:text-5xl"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-8 border-t border-ivory/15 px-8 py-8">
          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsSearchOpen(true);
            }}
            className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-label text-ivory/80 transition-colors duration-300 ease-in-out hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-#3F010C"
          >
            <SearchIcon width="16" height="16" />
            Search
          </button>

          <a
            href="/cart"
            className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-label text-ivory/80 transition-colors duration-300 ease-in-out hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-#3F010C"
          >
            <CartIcon width="16" height="16" />
            Cart ({CART_ITEM_COUNT})
          </a>
        </div>
      </div>
    </>
  );
}



// import { useState, useEffect, useRef, useCallback } from "react";
// import { ANNOUNCEMENT_BAR_HEIGHT } from "./AnnouncementBar";

// /**
//  * Navbar
//  * -----------------------------------------------------------------------
//  * Fixed, transparent-over-hero navbar that rises to top:0 and turns
//  * solid ivory as the announcement bar scrolls out of view. Three-column
//  * desktop layout: menu links | centered logo | utility icons.
//  *
//  * Uses the same brand tokens as prior sections — tailwind.config.js
//  * should define: #3F010C / #3F010C-dark, ivory, gold, font-serif.
//  * -----------------------------------------------------------------------
//  */

// const NAV_LINKS = [
//   { label: "Home", href: "/" },
//   { label: "Collections", href: "/collections" },
//   { label: "New Arrivals", href: "/new-arrivals" },
//   { label: "Festive Edit", href: "/festive-edit" },
//   { label: "About", href: "/about" },
// ];

// const SCROLL_THRESHOLD = ANNOUNCEMENT_BAR_HEIGHT;
// const CART_ITEM_COUNT = 2; // wire up to real cart state

// function SearchIcon(props) {
//   return (
//     <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
//       <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//     </svg>
//   );
// }

// function CartIcon(props) {
//   return (
//     <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path
//         d="M6 8h12l-1 12.5a1.5 1.5 0 0 1-1.5 1.5h-7a1.5 1.5 0 0 1-1.5-1.5L6 8z"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         strokeLinejoin="round"
//       />
//       <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//     </svg>
//   );
// }

// function CloseIcon(props) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//     </svg>
//   );
// }

// function MenuIcon(props) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//     </svg>
//   );
// }

// export default function Navbar() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const searchInputRef = useRef(null);

//   // Scroll-driven offset + background swap
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
//     };
//     handleScroll();
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Lock body scroll while an overlay is open
//   useEffect(() => {
//     document.body.style.overflow =
//       isSearchOpen || isMobileMenuOpen ? "hidden" : "";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isSearchOpen, isMobileMenuOpen]);

//   // Focus the search input the moment the overlay opens
//   useEffect(() => {
//     if (isSearchOpen) {
//       const id = setTimeout(() => searchInputRef.current?.focus(), 250);
//       return () => clearTimeout(id);
//     }
//     return undefined;
//   }, [isSearchOpen]);

//   const closeOverlays = useCallback(() => {
//     setIsSearchOpen(false);
//     setIsMobileMenuOpen(false);
//   }, []);

//   // Escape closes whichever overlay is open
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === "Escape") closeOverlays();
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [closeOverlays]);

//   const linkToneClass = isScrolled
//     ? "text-black/80 hover:text-black"
//     : "text-white/90 hover:text-white";
//   const iconToneClass = isScrolled
//     ? "text-black/80 hover:text-#3F010C"
//     : "text-white/90 hover:text-white";

//   return (
//     <>
//       <header
//         className={`fixed inset-x-0 z-40 transition-all duration-300 ease-in-out ${
//           isScrolled
//             ? "top-0 border-b border-gold/40 bg-ivory"
//             : "border-b border-transparent bg-transparent"
//         }`}
//         style={{ top: isScrolled ? 0 : ANNOUNCEMENT_BAR_HEIGHT }}
//       >
//         <nav
//           aria-label="Primary"
//           className="mx-auto grid h-16 max-w-[1600px] grid-cols-3 items-center px-6 sm:px-10 md:h-20 lg:h-24 lg:px-16 bg-[#3F010C]"
//         >
//           {/* Left — desktop menu links */}
//           <ul className="hidden items-center gap-9 lg:flex">
//             {NAV_LINKS.map((link) => (
//               <li key={link.label}>
//                 <a
//                   href={link.href}
//                   className={`group relative text-[12px] font-medium uppercase tracking-label transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${linkToneClass}`}
//                 >
//                   {link.label}
//                   <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 ease-in-out group-hover:w-full" />
//                 </a>
//               </li>
//             ))}
//           </ul>

//           {/* Mobile — hamburger (left column on small screens) */}
//           <button
//             type="button"
//             onClick={() => setIsMobileMenuOpen(true)}
//             aria-label="Open menu"
//             className={`justify-self-start p-1 transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 lg:hidden ${iconToneClass}`}
//           >
//             <MenuIcon />
//           </button>

//           {/* Center — logo */}
//           <a
//             href="/"
//             className={`col-start-2 justify-self-center font-serif text-xl font-normal tracking-[-0.01em] transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 sm:text-2xl lg:col-start-2 ${
//               isScrolled ? "text-black" : "text-white"
//             }`}
//           >
//         <img src="/public/Thathwamlogo.png" alt="Thathwam Sarees" className="h-9 w-auto sm:h-10 rounded-sm" />
//           </a>

//           {/* Right — utility icons */}
//           <div className="flex items-center justify-end gap-5">
//             <button
//               type="button"
//               onClick={() => setIsSearchOpen(true)}
//               aria-label="Open search"
//               className={`p-1 transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${iconToneClass}`}
//             >
//               <SearchIcon />
//             </button>

//             <a
//               href="/cart"
//               aria-label={`Cart, ${CART_ITEM_COUNT} items`}
//               className={`relative p-1 transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${iconToneClass}`}
//             >
//               <CartIcon />
//               {CART_ITEM_COUNT > 0 && (
//                 <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#3F010C] text-[9px] font-medium text-ivory">
//                   {CART_ITEM_COUNT}
//                 </span>
//               )}
//             </a>
//           </div>
//         </nav>
//       </header>

//       {/* ------------------------------------------------------------ */}
//       {/* Fullscreen search overlay                                    */}
//       {/* ------------------------------------------------------------ */}
//       <div
//         role="dialog"
//         aria-modal="true"
//         aria-label="Search"
//         className={`fixed inset-0 z-50 flex flex-col bg-ivory transition-opacity duration-300 ease-in-out ${
//           isSearchOpen
//             ? "pointer-events-auto opacity-100"
//             : "pointer-events-none opacity-0"
//         }`}
//       >
//         <div className="flex items-center justify-end px-6 pt-6 sm:px-10 sm:pt-8">
//           <button
//             type="button"
//             onClick={() => setIsSearchOpen(false)}
//             aria-label="Close search"
//             className="p-1 text-black/70 transition-colors duration-300 ease-in-out hover:text-#3F010C focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-#3F010C focus-visible:ring-offset-2"
//           >
//             <CloseIcon />
//           </button>
//         </div>

//         <div className="flex flex-1 items-center justify-center px-6">
//           <div className="w-full max-w-2xl">
//             <p className="mb-4 text-center text-[11px] font-medium uppercase tracking-labelWide text-gold">
//               Search
//             </p>
//             <input
//               ref={searchInputRef}
//               type="text"
//               placeholder="Sarees, collections, fabrics…"
//               className="w-full border-b border-black/30 bg-transparent pb-4 text-center font-serif text-2xl text-black placeholder:text-black/35 focus:border-#3F010C focus:outline-none sm:text-4xl"
//             />
//           </div>
//         </div>
//       </div>

//       {/* ------------------------------------------------------------ */}
//       {/* Fullscreen mobile menu                                       */}
//       {/* ------------------------------------------------------------ */}
//       <div
//         role="dialog"
//         aria-modal="true"
//         aria-label="Menu"
//         className={`fixed inset-0 z-50 flex flex-col bg-[#3F010C] transition-opacity duration-300 ease-in-out bg-[#3F010C] text-white lg:hidden ${
//           isMobileMenuOpen
//             ? "pointer-events-auto opacity-100"
//             : "pointer-events-none opacity-0"
//         }`}
//       >
//         <div className="flex items-center justify-between px-6 pt-6">
//           <span className="font-serif text-xl text-ivory">Thathwam Sarees</span>
//           <button
//             type="button"
//             onClick={() => setIsMobileMenuOpen(false)}
//             aria-label="Close menu"
//             className="p-1 text-ivory/80 transition-colors duration-300 ease-in-out hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-#3F010C"
//           >
//             <CloseIcon />
//           </button>
//         </div>

//         <nav aria-label="Mobile primary" className="flex flex-1 flex-col justify-center px-8">
//           <ul className="space-y-7">
//             {NAV_LINKS.map((link) => (
//               <li key={link.label}>
//                 <a
//                   href={link.href}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className="font-serif text-4xl font-normal text-ivory transition-colors duration-300 ease-in-out hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-#3F010C sm:text-5xl"
//                 >
//                   {link.label}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </nav>

//         <div className="flex items-center gap-8 border-t border-ivory/15 px-8 py-8">
//           <button
//             type="button"
//             onClick={() => {
//               setIsMobileMenuOpen(false);
//               setIsSearchOpen(true);
//             }}
//             className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-label text-ivory/80 transition-colors duration-300 ease-in-out hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-#3F010C"
//           >
//             <SearchIcon width="16" height="16" />
//             Search
//           </button>

//           <a
//             href="/cart"
//             className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-label text-ivory/80 transition-colors duration-300 ease-in-out hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-#3F010C"
//           >
//             <CartIcon width="16" height="16" />
//             Cart ({CART_ITEM_COUNT})
//           </a>
//         </div>
//       </div>
//     </>
//   );
// }



// // import { useState, useEffect, useRef, useCallback } from "react";
// // import { ANNOUNCEMENT_BAR_HEIGHT } from "./Announcementbar";

// // /**
// //  * Navbar
// //  * -----------------------------------------------------------------------
// //  * Fixed, transparent-over-hero navbar that rises to top:0 and turns
// //  * solid ivory as the announcement bar scrolls out of view. Three-column
// //  * desktop layout: menu links | centered logo | utility icons.
// //  *
// //  * Uses the same brand tokens as prior sections — tailwind.config.js
// //  * should define: #3F010C / #3F010C-dark, ivory, gold, font-serif.
// //  * -----------------------------------------------------------------------
// //  */

// // const NAV_LINKS = [
// //   { label: "Home", href: "/" },
// //   { label: "Collections", href: "/collections" },
// //   { label: "New Arrivals", href: "/new-arrivals" },
// //   { label: "Festive Edit", href: "/festive-edit" },
// //   { label: "About", href: "/about" },
// // ];

// // const SCROLL_THRESHOLD = ANNOUNCEMENT_BAR_HEIGHT;
// // const CART_ITEM_COUNT = 2; // wire up to real cart state

// // function SearchIcon(props) {
// //   return (
// //     <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
// //       <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
// //       <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
// //     </svg>
// //   );
// // }

// // function CartIcon(props) {
// //   return (
// //     <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
// //       <path
// //         d="M6 8h12l-1 12.5a1.5 1.5 0 0 1-1.5 1.5h-7a1.5 1.5 0 0 1-1.5-1.5L6 8z"
// //         stroke="currentColor"
// //         strokeWidth="1.5"
// //         strokeLinejoin="round"
// //       />
// //       <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
// //     </svg>
// //   );
// // }

// // function CloseIcon(props) {
// //   return (
// //     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
// //       <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
// //     </svg>
// //   );
// // }

// // function MenuIcon(props) {
// //   return (
// //     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
// //       <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
// //     </svg>
// //   );
// // }

// // export default function Navbar() {
// //   const [isScrolled, setIsScrolled] = useState(false);
// //   const [isSearchOpen, setIsSearchOpen] = useState(false);
// //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// //   const searchInputRef = useRef(null);

// //   // Scroll-driven offset + background swap
// //   useEffect(() => {
// //     const handleScroll = () => {
// //       setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
// //     };
// //     handleScroll();
// //     window.addEventListener("scroll", handleScroll, { passive: true });
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   // Lock body scroll while an overlay is open
// //   useEffect(() => {
// //     document.body.style.overflow =
// //       isSearchOpen || isMobileMenuOpen ? "hidden" : "";
// //     return () => {
// //       document.body.style.overflow = "";
// //     };
// //   }, [isSearchOpen, isMobileMenuOpen]);

// //   // Focus the search input the moment the overlay opens
// //   useEffect(() => {
// //     if (isSearchOpen) {
// //       const id = setTimeout(() => searchInputRef.current?.focus(), 250);
// //       return () => clearTimeout(id);
// //     }
// //     return undefined;
// //   }, [isSearchOpen]);

// //   const closeOverlays = useCallback(() => {
// //     setIsSearchOpen(false);
// //     setIsMobileMenuOpen(false);
// //   }, []);

// //   // Escape closes whichever overlay is open
// //   useEffect(() => {
// //     const handleKeyDown = (e) => {
// //       if (e.key === "Escape") closeOverlays();
// //     };
// //     window.addEventListener("keydown", handleKeyDown);
// //     return () => window.removeEventListener("keydown", handleKeyDown);
// //   }, [closeOverlays]);

// //   const linkToneClass = isScrolled
// //     ? "text-black/80 hover:text-black"
// //     : "text-white/90 hover:text-white";
// //   const iconToneClass = isScrolled
// //     ? "text-black/80 hover:text-#3F010C"
// //     : "text-white/90 hover:text-white";

// //   return (
// //     <>
// //       <header
// //         className={`fixed inset-x-0 z-40 transition-all duration-300 ease-in-out ${
// //           isScrolled
// //             ? "top-0 border-b border-gold/40 bg-ivory"
// //             : "border-b border-transparent bg-transparent"
// //         }`}
// //         style={{ top: isScrolled ? 0 : ANNOUNCEMENT_BAR_HEIGHT }}
// //       >
// //         <nav
// //           aria-label="Primary"
// //           className="mx-auto grid h-16 max-w-[1600px] grid-cols-2 items-center px-6 sm:px-10 md:h-20 lg:h-24 lg:grid-cols-3 lg:px-16 bg-[#3F010C]"
// //         >
// //           {/* Left — desktop menu links */}
// //           <ul className="hidden items-center gap-9 lg:flex">
// //             {NAV_LINKS.map((link) => (
// //               <li key={link.label}>
// //                 <a
// //                   href={link.href}
// //                   className={`group relative text-[12px] font-medium uppercase tracking-label transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${linkToneClass}`}
// //                 >
// //                   {link.label}
// //                   <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 ease-in-out group-hover:w-full" />
// //                 </a>
// //               </li>
// //             ))}
// //           </ul>

// //           {/* Mobile — hamburger (left column on small screens) */}
// //           <button
// //             type="button"
// //             onClick={() => setIsMobileMenuOpen(true)}
// //             aria-label="Open menu"
// //             className={`justify-self-start p-1 transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 lg:hidden ${iconToneClass}`}
// //           >
// //             <MenuIcon />
// //           </button>

// //           {/* Center — logo */}
// //           <a
// //             href="/"
// //             className={`col-start-2 justify-self-center font-serif text-xl font-normal tracking-[-0.01em] transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 sm:text-2xl lg:col-start-2 ${
// //               isScrolled ? "text-black" : "text-white"
// //             }`}
// //           >
// //             Thathwam Sarees
// //           </a>

// //           {/* Right — utility icons */}
// //           <div className="flex items-center justify-end gap-5">
// //             <button
// //               type="button"
// //               onClick={() => setIsSearchOpen(true)}
// //               aria-label="Open search"
// //               className={`p-1 transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${iconToneClass}`}
// //             >
// //               <SearchIcon />
// //             </button>

// //             <a
// //               href="/cart"
// //               aria-label={`Cart, ${CART_ITEM_COUNT} items`}
// //               className={`relative p-1 transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${iconToneClass}`}
// //             >
// //               <CartIcon />
// //               {CART_ITEM_COUNT > 0 && (
// //                 <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#3F010C] text-[9px] font-medium text-ivory">
// //                   {CART_ITEM_COUNT}
// //                 </span>
// //               )}
// //             </a>
// //           </div>
// //         </nav>
// //       </header>

// //       {/* ------------------------------------------------------------ */}
// //       {/* Fullscreen search overlay                                    */}
// //       {/* ------------------------------------------------------------ */}
// //       <div
// //         role="dialog"
// //         aria-modal="true"
// //         aria-label="Search"
// //         className={`fixed inset-0 z-50 flex flex-col bg-ivory transition-opacity duration-300 ease-in-out ${
// //           isSearchOpen
// //             ? "pointer-events-auto opacity-100"
// //             : "pointer-events-none opacity-0"
// //         }`}
// //       >
// //         <div className="flex items-center justify-end px-6 pt-6 sm:px-10 sm:pt-8">
// //           <button
// //             type="button"
// //             onClick={() => setIsSearchOpen(false)}
// //             aria-label="Close search"
// //             className="p-1 text-black/70 transition-colors duration-300 ease-in-out hover:text-#3F010C focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-#3F010C focus-visible:ring-offset-2"
// //           >
// //             <CloseIcon />
// //           </button>
// //         </div>

// //         <div className="flex flex-1 items-center justify-center px-6">
// //           <div className="w-full max-w-2xl">
// //             <p className="mb-4 text-center text-[11px] font-medium uppercase tracking-labelWide text-gold">
// //               Search
// //             </p>
// //             <input
// //               ref={searchInputRef}
// //               type="text"
// //               placeholder="Sarees, collections, fabrics…"
// //               className="w-full border-b border-black/30 bg-transparent pb-4 text-center font-serif text-2xl text-black placeholder:text-black/35 focus:border-#3F010C focus:outline-none sm:text-4xl"
// //             />
// //           </div>
// //         </div>
// //       </div>

// //       {/* ------------------------------------------------------------ */}
// //       {/* Fullscreen mobile menu                                       */}
// //       {/* ------------------------------------------------------------ */}
// //       <div
// //         role="dialog"
// //         aria-modal="true"
// //         aria-label="Menu"
// //         className={`fixed inset-0 z-50 flex flex-col bg-[#3F010C] transition-opacity duration-300 ease-in-out lg:hidden ${
// //           isMobileMenuOpen
// //             ? "pointer-events-auto opacity-100"
// //             : "pointer-events-none opacity-0"
// //         }`}
// //       >
// //         <div className="flex items-center justify-between px-6 pt-6">
// //           <span className="font-serif text-xl text-ivory">Thathwam Sarees</span>
// //           <button
// //             type="button"
// //             onClick={() => setIsMobileMenuOpen(false)}
// //             aria-label="Close menu"
// //             className="p-1 text-ivory/80 transition-colors duration-300 ease-in-out hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-#3F010C"
// //           >
// //             <CloseIcon />
// //           </button>
// //         </div>

// //         <nav aria-label="Mobile primary" className="flex flex-1 flex-col justify-center px-8">
// //           <ul className="space-y-7">
// //             {NAV_LINKS.map((link) => (
// //               <li key={link.label}>
// //                 <a
// //                   href={link.href}
// //                   onClick={() => setIsMobileMenuOpen(false)}
// //                   className="font-serif text-4xl font-normal text-ivory transition-colors duration-300 ease-in-out hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-#3F010C sm:text-5xl"
// //                 >
// //                   {link.label}
// //                 </a>
// //               </li>
// //             ))}
// //           </ul>
// //         </nav>

// //         <div className="flex items-center gap-8 border-t border-ivory/15 px-8 py-8">
// //           <button
// //             type="button"
// //             onClick={() => {
// //               setIsMobileMenuOpen(false);
// //               setIsSearchOpen(true);
// //             }}
// //             className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-label text-ivory/80 transition-colors duration-300 ease-in-out hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-#3F010C"
// //           >
// //             <SearchIcon width="16" height="16" />
// //             Search
// //           </button>

// //           <a
// //             href="/cart"
// //             className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-label text-ivory/80 transition-colors duration-300 ease-in-out hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-#3F010C"
// //           >
// //             <CartIcon width="16" height="16" />
// //             Cart ({CART_ITEM_COUNT})
// //           </a>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }