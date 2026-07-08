import { useState, useEffect, useRef, useCallback } from "react";

/**
 * HeroSection
 * -----------------------------------------------------------------------
 * Full-bleed editorial hero slider for a luxury saree brand.
 * Built to sit directly under a transparent navbar — text is anchored
 * low in the frame so the top of the photography stays clear.
 *
 * Design tokens used (add these to tailwind.config.js theme.extend.colors
 * so the rest of the app can reuse them):
 *   #3F010C: '#3F010C'
 *   ivory:    '#E2DED3'
 *   gold:     '#B8AD85'
 *
 * Replace the `image` values in SLIDES with real campaign photography
 * (portrait-leaning crops, 4:5 or 3:4, min width 1600px) before launch.
 * -----------------------------------------------------------------------
 */


const SLIDES = [
  {
    id: "slide-weave",
    image:
      "/TB1.webp",
    eyebrow: "Autumn Weave",
    headline: "Woven in Silence",
    copy:
      "Hand-loomed , dyed , finished without haste.",
  },
  {
    id: "slide-heritage",
    image:
      "/TB2.webp",
    eyebrow: "Heritage Edit",
    headline: "Quiet Grandeur",
    copy:
      "Drawn from six weaving houses across India.",
  },
  {
    id: "slide-bridal",
    image:
      "/TB3.webp",
    eyebrow: "Bridal Edit",
    headline: "Made to Remember",
    copy:
      "Zari borders, hand-finished pallus, timeless silhouettes.",
  },
  {
    id: "slide-bridal-2",
    image:
      "/TB4.webp",
    eyebrow: "Bridal Edit",
    headline: "Made to Remember",
    copy:
      "Zari borders, hand-finished pallus, timeless silhouettes.",
  },
];

// const SLIDES = [
//   {
//     id: "slide-weave",
//     image:
//       "/TB1.webp",
//     eyebrow: "The Autumn Weave",
//     headline: "Woven in Silence",
//     copy:
//       "Each drape carries the hands that made it — hand-loomed silk, dyed in small batches, finished without haste.",
//   },
//   {
//     id: "slide-heritage",
//     image:
//       "/TB2.webp",
//     eyebrow: "Heritage Edit",
//     headline: "A Quiet Kind of Grandeur",
//     copy:
//       "Sarees drawn from six weaving houses across India, chosen for craft that doesn't need to announce itself.",
//   },
//   {
//     id: "slide-bridal",
//     image:
//       "/TB3.webp",
//     eyebrow: "The Bridal Edit",
//     headline: "Made to Be Remembered",
//     copy:
//       "For the days that ask for more — zari borders, hand-finished pallus, and silhouettes that hold their shape.",
//   },
//    {
//     id: "slide-bridal",
//     image:
//       "/TB4.webp",
//     eyebrow: "The Bridal Edit",
//     headline: "Made to Be Remembered",
//     copy:
//       "For the days that ask for more — zari borders, hand-finished pallus, and silhouettes that hold their shape.",
//   },
// ];

const AUTOPLAY_MS = 7000;
const SWIPE_THRESHOLD_PX = 50;

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);
  const touchDeltaX = useRef(0);

  const goTo = useCallback((index) => {
    setActiveIndex((index + SLIDES.length) % SLIDES.length);
  }, []);

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // Slow, pausable autoplay
  useEffect(() => {
    if (isPaused) return undefined;
    const timer = setInterval(goNext, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [isPaused, goNext]);

  // Touch / swipe support
  const handleTouchStart = (e) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    if (Math.abs(touchDeltaX.current) > SWIPE_THRESHOLD_PX) {
      if (touchDeltaX.current < 0) {
        goNext();
      } else {
        goPrev();
      }
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
    // Resume autoplay after a brief pause so the swipe feels intentional
    setTimeout(() => setIsPaused(false), 1500);
  };

  return (
    <section
      aria-label="Featured collections"
      className="relative aspect-[5/4] w-full  overflow-hidden bg-black py-20 mt-8"
      
      // className="relative h-[65vh] min-h-[420px] w-full overflow-hidden bg-black md:h-[75vh] md:min-h-[560px]"
        onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      <div className="absolute inset-0">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            aria-hidden={index !== activeIndex}
            className={`absolute inset-0 transition-opacity duration-[900ms] ease-in-out ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.headline}
              className="h-full w-full object-cover  object-top"
              loading={index === 0 ? "eager" : "lazy"}
              fetchpriority={index === 0 ? "high" : "auto"}
            />
            {/* Soft gradient so text stays legible without flattening the photo */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          </div>
        ))}
      </div>



{/* Content — anchored bottom-left, clear of the transparent navbar */}
<div className="relative z-10 flex h-full w-full items-end  ">
  <div className="w-full px-4 translate-y-16  sm:px-10 sm:pb-20 md:px-16 md:pb-24 lg:px-20 lg:pb-28">
    <div className="max-w-xl">
      {/* <p className="mb-1.5 text-[9px] font-medium uppercase tracking-[0.16em] text-[#B8AD85] sm:mb-3 sm:text-xs">
        {SLIDES[activeIndex].eyebrow}
      </p> */}

      <h1 className="font-serif text-xl font-bold leading-[1.1] tracking-[-0.01em] text-[#3F010C] sm:text-5xl md:text-6xl lg:text-7xl">
        {SLIDES[activeIndex].headline}
      </h1>

      <p className="mt-2 max-w-[25ch] text-[11px] font-normal leading-snug text-[#3F010C] sm:mt-5 sm:text-base sm:leading-relaxed">
        {SLIDES[activeIndex].copy}
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-x-8 gap-y-4 sm:mt-8">
        <button
          type="button"
          className="border border-[#3F010C] px-1 py-1 text-[6px] font-medium uppercase tracking-[0.12em] text-[#3F010C] transition-colors duration-300 ease-in-out hover:border-white hover:bg-white hover:text-black sm:px-10 sm:py-4 sm:text-xs sm:tracking-[0.14em]"
        >
          Shop now
        </button>
      </div>
    </div>
  </div>
</div>
      {/* Content — anchored bottom-left, clear of the transparent navbar */}
      {/* <div className="relative z-10 flex h-full w-full items-end">
        <div className="w-full px-6 pb-16 sm:px-10 sm:pb-20 md:px-16 md:pb-24 lg:px-20 lg:pb-28">
          <div className="max-w-xl">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#B8AD85] sm:text-xs">
              {SLIDES[activeIndex].eyebrow}
            </p>

            <h1 className="font-serif text-4xl font-normal leading-[1.08] tracking-[-0.01em] text-[#E2DED3] sm:text-5xl md:text-6xl lg:text-7xl">
              {SLIDES[activeIndex].headline}
            </h1>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">
              {SLIDES[activeIndex].copy}
            </p>

             
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <button
                type="button"
                className="border border-white/80 px-2 py-1 text-xs font-medium uppercase tracking-[0.14em] text-white transition-colors duration-300 ease-in-out hover:border-white hover:bg-white hover:text-black sm:px-10 sm:py-4"
              >
                Explore Collection
              </button>
              

              {/* <button
                type="button"
                className="group relative text-xs font-medium uppercase tracking-[0.14em] text-white/90 transition-colors duration-300 ease-in-out hover:text-white"
              >
                Our Story
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#B8AD85] transition-all duration-300 ease-in-out group-hover:w-full" />
              </button> 
            </div>
          </div> 
        </div>
      </div> */}

      {/* Prev / Next arrows */}
      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 text-white opacity-40 transition-all duration-300 ease-in-out hover:opacity-100 hover:border-white sm:flex md:left-6"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M10 2L4 8l6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        type="button"
        onClick={goNext}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 text-white opacity-40 transition-all duration-300 ease-in-out hover:opacity-100 hover:border-white sm:flex md:right-6"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M6 2l6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Slide indicators — hairlines, not dots */}
      <div
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 sm:bottom-8"
        role="tablist"
        aria-label="Slide selection"
      >
        {SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Go to slide ${index + 1}: ${slide.headline}`}
            onClick={() => goTo(index)}
            className={`h-[2px] rounded-full transition-all duration-500 ease-in-out ${
              index === activeIndex
                ? "w-9 bg-[#E2DED3]"
                : "w-4 bg-white/35 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}