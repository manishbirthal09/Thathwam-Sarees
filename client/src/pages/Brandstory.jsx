/**
 * BrandStory
 * -----------------------------------------------------------------------
 * Editorial split section — full-height lifestyle image paired with
 * a restrained brand narrative. Sits between Featured Collections and
 * Why Choose Us on the homepage.
 *
 * Uses the same brand tokens as prior sections — ensure tailwind.config.js
 * defines: #3F010C '#3F010C', ivory '#E2DED3', gold '#B8AD85',
 * and fontFamily.serif → Fraunces.
 *
 * Swap the `image` src for real lifestyle/atelier photography
 * (portrait or 4:5, ≥1400px wide) before launch.
 * -----------------------------------------------------------------------
 */

export default function BrandStory() {
  return (
    <section
      aria-labelledby="brand-story-heading"
      className="grid grid-cols-1 bg-white lg:grid-cols-2"
    >
      {/* Image panel */}
      <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[560px]">
        <img
          src="/about2.webp"
          alt="Artisan hand-finishing a woven silk saree in the atelier"
          loading="lazy"
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Text panel */}
      <div className="flex items-center px-6 py-16 sm:px-10 sm:py-20 md:px-16 lg:px-20 lg:py-0">
        <div className="max-w-md">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-[#3F010C]">
            Our Philosophy
          </p>

          <h2
            id="brand-story-heading"
            className="font-serif text-4xl font-normal leading-[1.12] tracking-[-0.01em] text-black sm:text-5xl"
          >
            Every Weave Carries a Hand That Made It
          </h2>

          <p className="mt-6 text-[15px] leading-relaxed text-[#3F010C] sm:text-base">
            We work with six weaving houses across India, each holding
            techniques passed down through generations. No saree leaves
            the loom until it has earned its place — the drape tested,
            the border checked thread by thread, the dye left to settle
            in its own time. This is not fashion made quickly. It is
            tradition, dressed for the present.
          </p>

          <button
            type="button"
            className="mt-10 border border-[#3F010C] px-9 py-3.5 text-xs font-medium uppercase tracking-[0.14em] text-[#3F010C] transition-colors duration-300 ease-in-out hover:border-black hover:bg-[#3F010C] hover:text-[#E2DED3]"
          >
            Discover Our Craft
          </button>
        </div>
      </div>
    </section>
  );
}