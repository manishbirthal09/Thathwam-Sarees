import Eyebrow from "../pages/Eyebrow";

/**
 * SectionIntro
 * -----------------------------------------------------------------------
 * Centered eyebrow + heading + supporting paragraph block, used to open
 * Featured Collections and Why Choose Us. Extracted so heading sizes,
 * spacing, and max-width stay identical across sections instead of being
 * re-tuned by eye each time.
 * -----------------------------------------------------------------------
 */
export default function SectionIntro({ eyebrow, heading, paragraph, id }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16 lg:mb-20">
      <Eyebrow className="mb-3 text-[#3F010C]">{eyebrow}</Eyebrow>
      <h2
        id={id}
        className="font-serif text-4xl font-normal leading-[1.1] tracking-[-0.01em] text-black sm:text-5xl"
      >
        {heading}
      </h2>
      {paragraph && (
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-[#3F010C] sm:text-base">
          {paragraph}
        </p>
      )}
    </div>
  );
}