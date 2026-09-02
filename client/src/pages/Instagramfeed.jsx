import SectionIntro from "../ui/Sectionintro";
import Button from "../ui/Button";

const POSTS = [
  {
    id: "post-1",
    image: "/i1.jpg",
    alt: "Woman in a burgundy silk saree at a festive gathering",
    permalink: "https://www.instagram.com/thathwamsarees/?hl=en",
  },
  {
    id: "post-2",
    image: "/i2.jpg",
    alt: "Bride adjusting the pallu of a hand-embroidered saree",
    permalink: "https://www.instagram.com/thathwamsarees/?hl=en",
  },
  {
    id: "post-3",
    image: "/i3.jpg",
    alt: "Candid moment at a wedding celebration in traditional silk",
    permalink: "https://www.instagram.com/thathwamsarees/?hl=en",
  },
  {
    id: "post-4",
    image: "/i4.jpg",
    alt: "Everyday elegance — cotton saree styled for a morning outing",
    permalink: "https://www.instagram.com/thathwamsarees/?hl=en",
  },
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

export default function InstagramFeed() {
  return (
    <section
      aria-labelledby="instagram-feed-heading"
      className="bg-[#E2DED3] py-12 sm:py-21 lg:py-29"
    >
      <div className="px-6 sm:px-10 md:px-16 lg:px-20">
        <SectionIntro
          id="instagram-feed-heading"
          eyebrow="Follow the Journey"
          heading="As Seen On Instagram"
          paragraph="A glimpse into timeless elegance, celebrations, and everyday luxury."
        />
      </div>

      <div className="grid grid-cols-2 gap-4 px-6 sm:grid-cols-3 sm:gap-8 sm:px-10 md:px-16 lg:grid-cols-4 lg:gap-10 lg:px-20">
        {POSTS.map((post) => (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View this post on Instagram"
            className="group relative block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy focus-visible:ring-offset-2"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-ivory">
              <img
                src={post.image}
                alt={post.alt}
                loading="lazy"
                className="h-full w-full object-cover object-center transition-transform duration-[700ms] ease-in-out group-hover:scale-105"
              />

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

      <div className="mt-14 flex justify-center sm:mt-16">
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