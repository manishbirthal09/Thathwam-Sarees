import { useEffect, useState } from "react";

const usps = [
  {
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto">
        <path d="M40 10 C40 10 28 20 28 35 C28 42 33 48 40 50 C47 48 52 42 52 35 C52 20 40 10 40 10Z" stroke="#3F010C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M34 36 C34 36 30 32 26 34 C22 36 22 42 26 44 C30 46 34 44 36 40" stroke="#3F010C" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M46 36 C46 36 50 32 54 34 C58 36 58 42 54 44 C50 46 46 44 44 40" stroke="#3F010C" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M36 40 C36 40 38 70 40 70 C42 70 44 40 44 40" stroke="#3F010C" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="40" cy="28" r="2" fill="#3F010C" opacity="0.4"/>
      </svg>
    ),
    heading: "100% Real Threads",
    desc: "Every saree is crafted from authentic, hand-selected fabrics — no shortcuts, no synthetics.",
  },
  {
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto">
        <path d="M20 45 C20 45 28 38 36 42 C40 44 40 44 40 44 C40 44 40 44 44 42 C52 38 60 45 60 45" stroke="#3F010C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 48 C24 48 30 43 36 46 C38 47 40 48 40 48 C40 48 42 47 44 46 C50 43 56 48 56 48" stroke="#3F010C" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
        <path d="M32 38 C30 32 32 24 40 22 C48 24 50 32 48 38" stroke="#3F010C" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M36 30 C36 30 38 34 40 33 C42 34 44 30 44 30" stroke="#3F010C" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
        <circle cx="40" cy="44" r="3" fill="#3F010C" opacity="0.15"/>
      </svg>
    ),
    heading: "Handwoven with Love",
    desc: "Each piece carries the warmth of skilled artisans who pour their heart into every thread.",
  },
  {
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto">
        <circle cx="40" cy="36" r="20" stroke="#3F010C" strokeWidth="1.5"/>
        <path d="M40 16 C40 16 32 24 32 36 C32 48 40 56 40 56 C40 56 48 48 48 36 C48 24 40 16 40 16Z" stroke="#3F010C" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M20 36 L60 36" stroke="#3F010C" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M22 26 L58 26" stroke="#3F010C" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
        <path d="M22 46 L58 46" stroke="#3F010C" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
        <path d="M30 58 C32 62 36 64 40 65 C44 64 46 62 50 58" stroke="#3F010C" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M34 63 L34 70 M40 65 L40 72 M46 63 L46 70" stroke="#3F010C" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
      </svg>
    ),
    heading: "Worldwide Shipping",
    desc: "From Kerala to the world — we deliver your saree safely to your doorstep, anywhere.",
  },
];

export default function USPSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % usps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-[#FFFEF6] py-20 overflow-hidden">
        <div className="w-20 h-px bg-[#3F010C]/30 mx-auto mb-16" />
      <div className="max-w-sm mx-auto px-6 text-center">
        {usps.map((usp, i) => (
          <div
            key={i}
            className={`transition-all duration-700 ${
              i === current
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 absolute pointer-events-none"
            }`}
            style={{ position: i === current ? "relative" : "absolute" }}
          >
            <div className="mb-6">{usp.icon}</div>
            <h3 className="font-serif text-2xl text-[#3F010C] mb-3">{usp.heading}</h3>
            <p className="text-sm text-[#3F010C]/55 leading-relaxed tracking-wide">{usp.desc}</p>
          </div>
        ))}

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {usps.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? "w-6 h-1.5 bg-[#3F010C]"
                  : "w-1.5 h-1.5 bg-[#3F010C]/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}