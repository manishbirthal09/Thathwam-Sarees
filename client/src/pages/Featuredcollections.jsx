import { useRef, useCallback, useState, useEffect } from "react";

const COLLECTIONS = [
  { id: "crepe-silk", name: "Crepe Silk", image: "/tc1.webp" },
  { id: "organza", name: "Organza", image: "/tc2.webp" },
  { id: "chiffon", name: "Chiffon", image: "/tc3.webp" },
  { id: "banarasi", name: "Banarasi", image: "/tc4.webp" },
  { id: "cotton", name: "Cotton", image: "/tc5.webp" },
  { id: "kanchipuram", name: "Kanchipuram", image: "/tc6.webp" },
  // { id: "party-wear", name: "Party Wear", image: "https://placehold.co/900x1125/3F010C/E2DED3?font=playfair-display&text=Party+Wear" },
  // { id: "festive-wear", name: "Festive Wear", image: "https://placehold.co/900x1125/2A0008/E2DED3?font=playfair-display&text=Festive+Wear" },
];

function CollectionCard({ collection, isActive, cardRef }) {
  return (
    <a
      ref={cardRef}
      href={`/collections/${collection.id}`}
      data-id={collection.id}
      className={`group relative block w-[72%] flex-shrink-0 snap-center overflow-hidden rounded-[5px] shadow-xl transition-all duration-400 ease-in-out sm:w-[42%] lg:w-[26%] ${
        isActive
          ? "scale-100 opacity-100 shadow-2xl"
          : "scale-[0.85] opacity-70"
      }`}
      aria-label={`Shop the ${collection.name} collection`}
    >
      <div className="relative aspect-[4/5] w-full  overflow-hidden bg-black">
        <img
          src={collection.image}
          alt={`${collection.name} saree collection`}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-[700ms] ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-1 flex flex-col items-center px-4 text-center">
          <h3 className="font-serif text-lg font-bold uppercase tracking-[0.08em] text-[#E2DED3] sm:text-xl">
            {collection.name}
          </h3>
          <span className="mt-2 h-px w-10 bg-[#E2DED3]/80" />
        </div>
      </div>
    </a>
  );
}

export default function FeaturedCollections() {
  const scrollerRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeId, setActiveId] = useState(COLLECTIONS[0].id);

  // Track which card is most centered in the scroller
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the highest intersection ratio (most centered)
        let best = null;
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!best || entry.intersectionRatio > best.intersectionRatio)) {
            best = entry;
          }
        });
        if (best) setActiveId(best.target.dataset.id);
      },
      {
        root: scroller,
        threshold: [0.5, 0.6, 0.7, 0.8, 0.9, 1],
        rootMargin: "0px -20% 0px -20%", // only count the middle zone as "centered"
      }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollByCard = useCallback((direction) => {
    const el = scrollerRef.current;
    if (!el) return;
    const cardWidth = el.firstChild ? el.firstChild.offsetWidth + 16 : 300;
    el.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
  }, []);

  return (
    <section
      aria-labelledby="featured-collections-heading"
      className="relative bg-[#E2DED3] py-16 sm:py-24 lg:py-32"
    >
      <div className="mx-auto mb-10 max-w-2xl px-6 text-center sm:mb-14">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#3F010C]">
          The Collections
        </p>
        <h2 className="font-serif text-3xl font-normal leading-[1.1] tracking-[-0.01em] text-black sm:text-5xl">
          Shop by Fabric
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#3F010C] sm:mt-5 sm:text-base">
          Eight weaves, each chosen for what it says about the woman who 
wears it.
        </p>
      </div>

      <div className="relative overflow-x-hidden">
        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory items-center gap-4 overflow-x-auto px-6 py-6 [scrollbar-width:none] sm:px-10 lg:gap-6 lg:px-16 [&::-webkit-scrollbar]:hidden"
        >
          {COLLECTIONS.map((collection, index) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              isActive={activeId === collection.id}
              cardRef={(el) => (cardRefs.current[index] = el)}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label="Previous collection"
          className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#E2DED3]/90 text-black shadow-md transition-transform duration-200 hover:scale-105 sm:left-6"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 2L4 8l6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label="Next collection"
          className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#E2DED3]/90 text-black shadow-md transition-transform duration-200 hover:scale-105 sm:right-6"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6 2l6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}

// import { useRef, useCallback } from "react";

// const COLLECTIONS = [
//   {
//     id: "crepe-silk",
//     name: "Crepe Silk",
//     image: "https://placehold.co/900x1125/3F010C/E2DED3?font=playfair-display&text=Crepe+Silk",
//   },
//   {
//     id: "organza",
//     name: "Organza",
//     image: "https://placehold.co/900x1125/2A0008/E2DED3?font=playfair-display&text=Organza",
//   },
//   {
//     id: "chiffon",
//     name: "Chiffon",
//     image: "https://placehold.co/900x1125/1A1A1A/B8AD85?font=playfair-display&text=Chiffon",
//   },
//   {
//     id: "banarasi",
//     name: "Banarasi",
//     image: "https://placehold.co/900x1125/3F010C/E2DED3?font=playfair-display&text=Banarasi",
//   },
//   {
//     id: "cotton",
//     name: "Cotton",
//     image: "https://placehold.co/900x1125/2A0008/E2DED3?font=playfair-display&text=Cotton",
//   },
//   {
//     id: "kanchipuram",
//     name: "Kanchipuram",
//     image: "https://placehold.co/900x1125/1A1A1A/B8AD85?font=playfair-display&text=Kanchipuram",
//   },
//   {
//     id: "party-wear",
//     name: "Party Wear",
//     image: "https://placehold.co/900x1125/3F010C/E2DED3?font=playfair-display&text=Party+Wear",
//   },
//   {
//     id: "festive-wear",
//     name: "Festive Wear",
//     image: "https://placehold.co/900x1125/2A0008/E2DED3?font=playfair-display&text=Festive+Wear",
//   },
// ];

// function CollectionCard({ collection }) {
//   return (
//     <a
//       href={`/collections/${collection.id}`}
//       className="group relative block w-[72%] flex-shrink-0 snap-center overflow-hidden rounded-[28px] shadow-xl sm:w-[42%] lg:w-[26%]"
//       aria-label={`Shop the ${collection.name} collection`}
//     >
//       <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
//         <img
//           src={collection.image}
//           alt={`${collection.name} saree collection`}
//           loading="lazy"
//           className="h-full w-full object-cover object-center transition-transform duration-[700ms] ease-in-out group-hover:scale-105"
//         />

//         {/* Bottom gradient — keeps overlaid text legible */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

//         {/* Centered overlaid title, like reference */}
//         <div className="absolute inset-x-0 bottom-8 flex flex-col items-center px-4 text-center">
//           <h3 className="font-serif text-lg font-normal uppercase tracking-[0.08em] text-[#E2DED3] sm:text-xl">
//             {collection.name}
//           </h3>
//           <span className="mt-2 h-px w-10 bg-[#E2DED3]/80" />
//         </div>
//       </div>
//     </a>
//   );
// }

// export default function FeaturedCollections() {
//   const scrollerRef = useRef(null);

//   const scrollByCard = useCallback((direction) => {
//     const el = scrollerRef.current;
//     if (!el) return;
//     const cardWidth = el.firstChild ? el.firstChild.offsetWidth + 16 : 300; // + gap
//     el.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
//   }, []);

//   return (
//     <section
//       aria-labelledby="featured-collections-heading"
//       className="relative bg-[#E2DED3] py-16 sm:py-24 lg:py-32"
//     >
//       {/* Section header */}
//       <div className="mx-auto mb-10 max-w-2xl px-6 text-center sm:mb-14">
//         <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#B8AD85]">
//           The Collections
//         </p>
//         <h2 className="font-serif text-3xl font-normal leading-[1.1] tracking-[-0.01em] text-black sm:text-5xl">
//           Shop by Fabric
//         </h2>
//         <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-black/60 sm:mt-5 sm:text-base">
//           Eight weaves, each chosen for what it says about the woman who
//           wears it.
//         </p>
//       </div>

//       {/* Carousel */}
//       <div className="relative">
//         <div
//           ref={scrollerRef}
//           className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[14%] pb-4 [scrollbar-width:none] sm:px-[10%] lg:gap-6 lg:px-[8%] [&::-webkit-scrollbar]:hidden"
//         >
//           {COLLECTIONS.map((collection) => (
//             <CollectionCard key={collection.id} collection={collection} />
//           ))}
//         </div>

//         {/* Prev / Next circular arrows — overlaid on the peeking side cards */}
//         <button
//           type="button"
//           onClick={() => scrollByCard(-1)}
//           aria-label="Previous collection"
//           className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#E2DED3]/90 text-black shadow-md transition-transform duration-200 hover:scale-105 sm:left-6"
//         >
//           <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
//             <path d="M10 2L4 8l6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
//           </svg>
//         </button>

//         <button
//           type="button"
//           onClick={() => scrollByCard(1)}
//           aria-label="Next collection"
//           className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#E2DED3]/90 text-black shadow-md transition-transform duration-200 hover:scale-105 sm:right-6"
//         >
//           <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
//             <path d="M6 2l6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
//           </svg>
//         </button>
//       </div>
//     </section>
//   );
// }


// // /**
// //  * FeaturedCollections
// //  * -----------------------------------------------------------------------
// //  * Editorial "shop by fabric" grid for a luxury saree brand.
// //  *
// //  * Layout logic:
// //  *  - Mobile   : single column, full-width stacked cards
// //  *  - Tablet   : calm 2-column equal grid
// //  *  - Desktop  : asymmetric 12-col zigzag (large/small alternating sides)
// //  *
// //  * Uses the same brand tokens as HeroSection — add to tailwind.config.js:
// //  *   #3F010C: '#3F010C'   ivory: '#E2DED3'   gold: '#B8AD85'
// //  *   fontFamily.serif → Fraunces
// //  *
// //  * Swap the `image` values for real campaign photography (4:5 portrait,
// //  * ≥1200px wide) before launch.
// //  * -----------------------------------------------------------------------
// //  */

// // const COLLECTIONS = [
// //   {
// //     id: "crepe-silk",
// //     name: "Crepe Silk",
// //     description: "Fluid drape, understated sheen",
// //     image: "https://placehold.co/1200x1500/3F010C/E2DED3?font=playfair-display&text=Crepe+Silk",
// //     size: "large",
// //   },
// //   {
// //     id: "organza",
// //     name: "Organza",
// //     description: "Sheer, structured, light as air",
// //     image: "https://placehold.co/1000x1250/2A0008/E2DED3?font=playfair-display&text=Organza",
// //     size: "small",
// //   },
// //   {
// //     id: "chiffon",
// //     name: "Chiffon",
// //     description: "Soft movement, everyday elegance",
// //     image: "https://placehold.co/1000x1250/1A1A1A/B8AD85?font=playfair-display&text=Chiffon",
// //     size: "small",
// //   },
// //   {
// //     id: "banarasi",
// //     name: "Banarasi",
// //     description: "Zari-woven, centuries of craft",
// //     image: "https://placehold.co/1200x1500/3F010C/E2DED3?font=playfair-display&text=Banarasi",
// //     size: "large",
// //   },
// //   {
// //     id: "cotton",
// //     name: "Cotton",
// //     description: "Handloomed, breathable, honest",
// //     image: "https://placehold.co/1200x1500/2A0008/E2DED3?font=playfair-display&text=Cotton",
// //     size: "large",
// //   },
// //   {
// //     id: "kanchipuram",
// //     name: "Kanchipuram",
// //     description: "Temple borders, heirloom silk",
// //     image: "https://placehold.co/1000x1250/1A1A1A/B8AD85?font=playfair-display&text=Kanchipuram",
// //     size: "small",
// //   },
// //   {
// //     id: "party-wear",
// //     name: "Party Wear",
// //     description: "Statement drapes for the evening",
// //     image: "https://placehold.co/1000x1250/3F010C/E2DED3?font=playfair-display&text=Party+Wear",
// //     size: "small",
// //   },
// //   {
// //     id: "festive-wear",
// //     name: "Festive Wear",
// //     description: "Rich weaves for occasions that matter",
// //     image: "https://placehold.co/1200x1500/2A0008/E2DED3?font=playfair-display&text=Festive+Wear",
// //     size: "large",
// //   },
// // ];

// // function CollectionCard({ collection }) {
// //   const isLarge = collection.size === "large";

// //   return (
// //     <a
// //       href={`/collections/${collection.id}`}
// //       className={`group relative block overflow-hidden ${
// //         isLarge ? "lg:col-span-7" : "lg:col-span-5"
// //       }`}
// //       aria-label={`Shop the ${collection.name} collection`}
// //     >
// //       <div
// //         className={`relative w-full overflow-hidden ${
// //           isLarge ? "aspect-[4/5] lg:aspect-[6/7]" : "aspect-[4/5]"
// //         }`}
// //       >
// //         <img
// //           src={collection.image}
// //           alt={`${collection.name} saree collection`}
// //           loading="lazy"
// //           className="h-full w-full object-cover object-center transition-transform duration-[700ms] ease-in-out group-hover:scale-105"
// //         />

// //         {/* Bottom gradient — keeps overlaid text legible without flattening the image */}
// //         <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />

// //         {/* Overlaid content */}
// //         <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
// //           <h3
// //             className={`font-serif font-normal leading-tight tracking-[-0.01em] text-[#E2DED3] ${
// //               isLarge ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"
// //             }`}
// //           >
// //             {collection.name}
// //           </h3>

// //           <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/75">
// //             {collection.description}
// //           </p>

// //           <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white/90 transition-colors duration-300 ease-in-out group-hover:text-white">
// //             <span className="relative">
// //               Shop Collection
// //               <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#B8AD85] transition-all duration-300 ease-in-out group-hover:w-full" />
// //             </span>
// //             <svg
// //               width="14"
// //               height="14"
// //               viewBox="0 0 14 14"
// //               fill="none"
// //               aria-hidden="true"
// //               className="transition-transform duration-300 ease-in-out group-hover:translate-x-1"
// //             >
// //               <path
// //                 d="M2 7h10M8 3l4 4-4 4"
// //                 stroke="currentColor"
// //                 strokeWidth="1.3"
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //               />
// //             </svg>
// //           </span>
// //         </div>
// //       </div>
// //     </a>
// //   );
// // }

// // export default function FeaturedCollections() {
// //   return (
// //     <section
// //       aria-labelledby="featured-collections-heading"
// //       className="bg-[#E2DED3] px-6 py-16 sm:px-10 sm:py-24 md:px-16 lg:px-20 lg:py-32"
// //     >
// //       {/* Section header */}
// //       <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16 lg:mb-20">
// //         <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#B8AD85]">
// //           The Collections
// //         </p>
// //         <h2 className="font-serif text-4xl font-normal leading-[1.1] tracking-[-0.01em] text-black sm:text-5xl">
// //           Shop by Fabric
// //         </h2>
// //         <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-black/60 sm:text-base">
// //           Eight weaves, each chosen for what it says about the woman who
// //           wears it — from everyday cotton to heirloom Kanchipuram silk.
// //         </p>
// //       </div>

// //       {/* Grid: 1-col mobile / 2-col tablet / asymmetric 12-col desktop */}
// //       <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-12 lg:gap-10">
// //         {COLLECTIONS.map((collection) => (
// //           <CollectionCard key={collection.id} collection={collection} />
// //         ))}
// //       </div>
// //     </section>
// //   );
// // }