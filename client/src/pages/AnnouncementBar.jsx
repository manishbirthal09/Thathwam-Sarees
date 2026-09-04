import { useState, useEffect, useRef } from "react";



const MESSAGES = [
  "Free Shipping Across India",
  "Handcrafted Elegance Delivered Nationwide",
  "New Festive Collection Now Live",
  "Flat 10% Off On First Order",
];

const ROTATE_MS = 4500;

export const ANNOUNCEMENT_BAR_HEIGHT = 35; 

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
     
      <span className="sr-only" aria-live="polite">
        {MESSAGES[activeIndex]}
      </span>

      <div aria-hidden="true" className="relative h-4 w-full max-w-md text-center">
        {MESSAGES.map((message, index) => (
          <p
            key={message}
            className={`absolute inset-0 text-[15px] font-medium uppercase tracking-label text-ivory transition-opacity duration-500 ease-in-out ${
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



