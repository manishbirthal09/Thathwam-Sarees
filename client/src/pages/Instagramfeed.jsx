import { useRef } from "react";
import SectionIntro from "../ui/SectionIntro";
import Button from "../ui/Button";

/**
 * InstagramFeed ("As Seen On Instagram")
 * -----------------------------------------------------------------------
 * Horizontal editorial carousel using native CSS scroll-snap — the
 * browser handles swipe momentum/snapping (especially on iOS), which
 * feels smoother than a reimplemented drag handler. Desktop arrows call
 * scrollBy() for non-touch users.
 *
 * Visible-card counts are enforced via calc() widths per breakpoint:
 *   mobile: 2 visible · tablet: 3 visible · desktop: 4 visible
 * Update POSTS below with real lifestyle photography + Instagram
 * permalinks — that's the only thing that needs to change over time.
 *
 * Uses the same brand tokens as prior sections — tailwind.config.js
 * should define: burgundy, ivory, gold, font-serif.
 * -----------------------------------------------------------------------
 */

const POSTS = [
  {
    id: "post-1",
    image:
      "/i1.jpg",
    alt: "Woman in a burgundy silk saree at a festive gathering",
    permalink: "https://www.instagram.com/thathwamsarees/?hl=en",
  },
  {
    id: "post-2",
    image:
      "/i2.jpg",
    alt: "Bride adjusting the pallu of a hand-embroidered saree",
    permalink: "https://www.instagram.com/thathwamsarees/?hl=en",
  },
  {
    id: "post-3",
    image:
      "/i3.jpg",
    alt: "Candid moment at a wedding celebration in traditional silk",
    permalink: "https://www.instagram.com/thathwamsarees/?hl=en",
  },
  {
    id: "post-4",
    image:
      "/i4.jpg",
    alt: "Everyday elegance — cotton saree styled for a morning outing",
    permalink: "https://www.instagram.com/thathwamsarees/?hl=en",
  },
//   {
//     id: "post-5",
//     image:
//       "https://placehold.co/900x1125/2A0008/E2DED3?font=playfair-display&text=Lifestyle+05",
//     alt: "Close detail of hand-woven zari border in natural light",
//     permalink: "https://instagram.com",
//   },
//   {
//     id: "post-6",
//     image:
//       "https://placehold.co/900x1125/1A1A1A/B8AD85?font=playfair-display&text=Lifestyle+06",
//     alt: "Festive gathering with guests dressed in celebratory silk sarees",
//     permalink: "https://instagram.com",
//   },
];

function InstagramGlyph(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" />
    </svg>
  );
}

function ArrowIcon({ direction = "right", ...props }) {
  const d = direction === "left" ? "M10 2L4 8l6 6" : "M6 2l6 6-6 6";
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path d={d} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function InstagramFeed() {
  const trackRef = useRef(null);

  const scrollByCards = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({
      left: direction * track.clientWidth * 0.85,
      behavior: "smooth",
    });
  };

  return (
    <section
      aria-labelledby="instagram-feed-heading"
      className="bg-[#E2DED3] py-16 sm:py-24 lg:py-32"
    >
      <div className="px-6 sm:px-10 md:px-16 lg:px-20">
        <SectionIntro
          id="instagram-feed-heading"
          eyebrow="Follow the Journey"
          heading="As Seen On Instagram"
          paragraph="A glimpse into timeless elegance, celebrations, and everyday luxury."
        />
      </div>

      {/* Carousel */}
      <div className="relative">
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto scroll-smooth px-6 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] snap-x snap-mandatory sm:gap-8 sm:px-10 md:px-16 lg:gap-10 lg:px-20 [&::-webkit-scrollbar]:hidden"
        >
          {POSTS.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View this post on Instagram"
              className="group relative block flex-none snap-start overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy focus-visible:ring-offset-2 w-[calc(50%-12px)] sm:w-[calc(33.334%-22px)] lg:w-[calc(25%-30px)]"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-ivory">
                <img
                  src={post.image}
                  alt={post.alt}
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition-transform duration-[700ms] ease-in-out group-hover:scale-105"
                />

                {/* Fade overlay + mark, shown on hover/focus */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/0 opacity-0 transition-all duration-300 ease-in-out group-hover:bg-black/35 group-hover:opacity-100 group-focus-visible:bg-black/35 group-focus-visible:opacity-100">
                  <InstagramGlyph className="text-ivory" />
                  <span className="text-[10px] font-medium uppercase tracking-label text-ivory">
                    View Post
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Arrows — desktop / non-touch only */}
        <button
          type="button"
          onClick={() => scrollByCards(-1)}
          aria-label="Scroll to previous posts"
          className="absolute left-2 top-[calc(50%-16px)] hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/20 bg-white/90 text-black/70 opacity-90 transition-all duration-300 ease-in-out hover:border-black/40 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy focus-visible:ring-offset-2 lg:flex lg:left-6"
        >
          <ArrowIcon direction="left" />
        </button>

        <button
          type="button"
          onClick={() => scrollByCards(1)}
          aria-label="Scroll to next posts"
          className="absolute right-2 top-[calc(50%-16px)] hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/20 bg-white/90 text-black/70 opacity-90 transition-all duration-300 ease-in-out hover:border-black/40 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy focus-visible:ring-offset-2 lg:flex lg:right-6"
        >
          <ArrowIcon direction="right" />
        </button>
      </div>

      {/* CTA */}
      <div className="mt-14 flex justify-center sm:mt-16 ">
        <Button
          as="a"
          href="https://www.instagram.com/thathwamsarees/?hl=en"
          className="text-[#3F010C] border-[#3F010C] hover:bg-[#3F010C] hover:text-[#E2DED3]"
          target="_blank"
          rel="noopener noreferrer"
          variant="outline-dark"
        >
          Follow Us on Instagram
        </Button>
      </div>
    </section>
  );
}