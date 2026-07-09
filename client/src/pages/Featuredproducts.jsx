import { useState } from "react";
import SectionIntro from "../ui/Sectionintro";

/**
 * FeaturedProducts ("Signature Sarees")
 * -----------------------------------------------------------------------
 * Editorial product showcase — four cards, image-clean-of-text (unlike
 * FeaturedCollections, which overlays text on the photo). Content lives
 * in a calm block below each image since product cards carry real
 * transactional data (price, two CTAs, wishlist) that would crowd a
 * photo overlay.
 *
 * Buttons here are deliberately smaller than the site's primary CTA
 * sizing (Hero/Brand Story) — the brief calls for compact, refined
 * actions rather than typical ecommerce-sized buttons.
 *
 * Uses the same brand tokens as prior sections — tailwind.config.js
 * should define: #3F010C / #3F010C-dark, ivory, gold, font-serif.
 *
 * Swap `image` values for real portrait product photography
 * (4:5 ratio, ≥1000px wide) before launch.
 * -----------------------------------------------------------------------
 */

const PRODUCTS = [
  {
    id: "banarasi-heritage",
    name: "Banarasi Silk Heritage Saree",
    description: "Handwoven elegance for grand celebrations.",
    price: "₹8,999",
    image:
      "/tc1.webp",
  },
  {
    id: "kanchipuram-sunset",
    name: "Kanchipuram Sunset Silk Saree",
    description: "Rich zari borders steeped in tradition.",
    price: "₹11,499",
    image:
      "/tc2.webp",
  },
  {
    id: "organza-blush",
    name: "Organza Blush Drape Saree",
    description: "Featherlight elegance for evening affairs.",
    price: "₹6,499",
    image:
      "/tc3.webp",
  },
  {
    id: "crepe-noir",
    name: "Crepe Noir Statement Saree",
    description: "Modern silhouette, timeless material.",
    price: "₹7,999",
    image:
      "/tc4.webp",
  },
];

function WishlistButton({ productName }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setIsWishlisted((prev) => !prev)}
      aria-pressed={isWishlisted}
      aria-label={
        isWishlisted
          ? `Remove ${productName} from wishlist`
          : `Add ${productName} to wishlist`
      }
      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-black/70 backdrop-blur-sm transition-colors duration-300 ease-in-out hover:text-#3F010C focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-#3F010C focus-visible:ring-offset-2"
    >
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill={isWishlisted ? "currentColor" : "none"}
        className={isWishlisted ? "text-[#3F010C]" : ""}
        aria-hidden="true"
      >
        <path
          d="M12 20.5s-7.5-4.6-10-9.3C.6 8 2.2 4.5 5.6 4c2-.3 3.7.6 6.4 3 2.7-2.4 4.4-3.3 6.4-3 3.4.5 5 4 3.6 7.2-2.5 4.7-10 9.3-10 9.3z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function ProductCard({ product }) {
  return (
    <div className="group min-w-0">
      {/* Image — kept clean of overlaid text; all content sits below */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ivory">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-[700ms] ease-in-out group-hover:scale-105"
        />
        <WishlistButton productName={product.name} />
      </div>

      {/* Content block */}
      <div className="mt-5">
        <h3 className="font-serif text-lg font-normal leading-snug tracking-[-0.01em] text-black sm:text-xl">
          {product.name}
        </h3>

        <p className="mt-1.5 text-sm leading-relaxed text-[#3F010C]">
          {product.description}
        </p>

        <p className="mt-3 text-sm font-medium text-black">{product.price}</p>

        {/* Compact CTAs — smaller than site-wide primary sizing on purpose */}
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 min-w-0">
          <button
            type="button"
            className="border border-[#3F010C] px-5 py-2 text-[10px] font-medium uppercase tracking-label text-[#3F010C] transition-colors duration-300 ease-in-out hover:border-#3F010C hover:bg-[#3F010C] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-#3F010C focus-visible:ring-offset-2"
          >
            Add to Cart
          </button>

          <button
            type="button"
            className="group/cta relative text-[10px] font-medium uppercase tracking-label text-[#3F010C] transition-colors duration-300 ease-in-out hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-#3F010C focus-visible:ring-offset-2"
          >
            View Details
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 ease-in-out group-hover/cta:w-full" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  return (
    <section
      aria-labelledby="featured-products-heading"
      className="bg-[#E2DED3] px-6 py-16 sm:px-10 sm:py-24 md:px-16 lg:px-20 lg:py-32 overflow-hidden"
    >
      <div className="w-20 h-px bg-[#16271C]/30 mx-auto mb-16" />
      <SectionIntro
        id="featured-products-heading"
        eyebrow="The Edit"
        heading="Signature Sarees"
        paragraph="Handpicked pieces crafted for timeless elegance and modern celebrations."
      />

      <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-x-5 gap-y-12 sm:gap-x-8 sm:gap-y-16 lg:grid-cols-4 lg:gap-x-8 min-w-0">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-12 flex justify-center sm:mt-16 lg:mt-20">
        <button
            type="button"
            className="border border-[#3F010C] px-5 py-2 text-[10px] font-medium uppercase tracking-label text-[#3F010C] transition-colors duration-300 ease-in-out hover:border-#3F010C hover:bg-[#3F010C] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-#3F010C focus-visible:ring-offset-2"
          >
            View all colllections
          </button>
      </div>
    </section>
  );
}