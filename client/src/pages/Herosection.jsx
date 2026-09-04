import { useState, useEffect, useRef, useCallback } from "react";




const SLIDES = [
 
  {
    id: "slide-heritage",
    image:
      "/TB2.webp",
       positionClass: "object-center lg:object-[center_2%]",
    eyebrow: "Heritage Edit",
    headline: "Quiet Grandeur",
    copy:
      "Drawn from six weaving houses across India.",
  },
  {
    id: "slide-bridal",
    image:
      "/TB3.webp",
       positionClass: "object-center lg:object-[center_1%]",
    eyebrow: "Bridal Edit",
    headline: "Made to Remember",
    copy:
      "Zari borders, hand-finished pallus, timeless silhouettes.",
  },
  {
    id: "slide-bridal-2",
    image:
      "/TB4.webp",
      positionClass: "object-center lg:object-[center_30%]",
    eyebrow: "Bridal Edit",
    headline: "Made to Remember",
    copy:
      "Zari borders, hand-finished pallus, timeless silhouettes.",
  },
];



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

  
  useEffect(() => {
    if (isPaused) return undefined;
    const timer = setInterval(goNext, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [isPaused, goNext]);

  
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

    setTimeout(() => setIsPaused(false), 1500);
  };

  return (
    <section
      aria-label="Featured collections"
      className="relative aspect-[1/1] w-full  overflow-hidden bg-black  mt-8 lg:aspect-auto lg:h-[70vh] lg:mt-0 lg:py-0"
      
      
        onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      
      <div className="absolute inset-x-0 bottom-0 top-20 lg:top-0">
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
              className={`h-full w-full object-cover ${slide.positionClass}`}
        
              loading={index === 0 ? "eager" : "lazy"}
              fetchpriority={index === 0 ? "high" : "auto"}
            />
           
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          </div>
        ))}
      </div>




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