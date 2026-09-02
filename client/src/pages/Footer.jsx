import { useState } from "react";



const CUSTOMER_SERVICE_LINKS = [
  { label: "Shipping Policy", href: "/shipping" },
  { label: "Returns & Exchanges", href: "/returns" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/footer" },
];



const CONTACT_LINKS = [
  { label: "hello@brandname.com", href: "mailto:hello@brandname.com" },
  { label: "+91 63669 99958", href: "tel:+916366999958" },
  { label: "Find a Store", href: "https://maps.app.goo.gl/caN3r8Hj7TEb3XcYA" },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/thathwamsarees/",
    path: "M8 2h8a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6H8a6 6 0 0 1-6-6V8a6 6 0 0 1 6-6zm0 2a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4H8zm4 3.2A4.8 4.8 0 1 1 7.2 12 4.8 4.8 0 0 1 12 7.2zm0 2A2.8 2.8 0 1 0 14.8 12 2.8 2.8 0 0 0 12 9.2zM17.4 6a1.1 1.1 0 1 1-1.1 1.1A1.1 1.1 0 0 1 17.4 6z",
  },
  
  {
    label: "Facebook",
    href: "https://facebook.com",
    path: "M13.5 21v-7.5H16l.4-3H13.5V8.4c0-.9.2-1.5 1.5-1.5H16.5V4.2A20 20 0 0 0 14.2 4c-2.3 0-3.8 1.4-3.8 3.9V10.5H8v3h2.4V21z",
  },
];

function FooterHeading({ children }) {
  return (
    <h3 className="mb-5 text-[11px] font-medium uppercase tracking-[0.16em] text-[#E2DED3]/50">
      {children}
    </h3>
  );
}

function FooterLink({ href, children }) {
  return (
    <a
      href={href}
      className="group relative inline-block text-sm text-[#E2DED3]/85 transition-colors duration-300 ease-in-out hover:text-[#E2DED3]"
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#B8AD85] transition-all duration-300 ease-in-out group-hover:w-full" />
    </a>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setSubmitted(true);
    setEmail("");
  };

  return (
    <footer  className="p-2 bg-[#E2DED3]">
      <div className="bg-[#3F010C] rounded-lg">
      <div className="mx-auto max-w-[1440px] px-6 pb-14 pt-20 sm:px-10 sm:pt-24 md:px-16 lg:px-20 lg:pt-28">
        <div className="grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
         
          <div className="lg:col-span-4">
            <a
              href="/"
              className="font-serif text-2xl font-normal tracking-[-0.01em] text-[#E2DED3]"
            >
              Thathwam Sarees
            </a>

            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-[#E2DED3]/65">
              Hand-loomed sarees from six weaving houses across India —
              crafted slowly, worn for a lifetime.
            </p>

            <form onSubmit={handleSubscribe} className="mt-8 max-w-xs">
              <label
                htmlFor="footer-newsletter-email"
                className="mb-3 block text-[11px] font-medium uppercase tracking-[0.16em] text-[#E2DED3]/50"
              >
                Join the Newsletter
              </label>
              <div className="flex items-end gap-4 border-b border-[#E2DED3]/30 pb-2 transition-colors duration-300 ease-in-out focus-within:border-[#B8AD85]">
                <input
                  id="footer-newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-transparent text-sm text-[#E2DED3] placeholder:text-[#E2DED3]/40 focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 text-[11px] font-medium uppercase tracking-[0.14em] text-[#B8AD85] transition-colors duration-300 ease-in-out hover:text-[#E2DED3]"
                >
                  Submit
                </button>
              </div>
              <p
                role="status"
                className={`mt-3 text-xs text-[#E2DED3]/60 transition-opacity duration-300 ${
                  submitted ? "opacity-100" : "opacity-0"
                }`}
              >
                Thank you — you&rsquo;re on the list.
              </p>
            </form>
          </div>

          
          <div className="lg:col-span-2 lg:col-start-6">
            <FooterHeading>Customer Service</FooterHeading>
            <ul className="space-y-3.5">
              {CUSTOMER_SERVICE_LINKS.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          

          <div className="lg:col-span-3">
            <FooterHeading>Contact</FooterHeading>
            <ul className="space-y-3.5">
              {CONTACT_LINKS.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

                <div className="mt-16 flex items-center gap-6 sm:mt-20">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E2DED3]/70 transition-colors duration-300 ease-in-out hover:text-[#B8AD85]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d={social.path} />
              </svg>
            </a>
          ))}
        </div>

       
        <div className="mt-14 flex flex-col items-center gap-4 border-t border-[#E2DED3]/15 pt-8 sm:flex-row sm:justify-between sm:gap-0">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#E2DED3]/45">
            &copy; {new Date().getFullYear()} Thathwam Sarees. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="/privacy"
              className="text-[11px] uppercase tracking-[0.14em] text-[#E2DED3]/45 transition-colors duration-300 ease-in-out hover:text-[#E2DED3]/80"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-[11px] uppercase tracking-[0.14em] text-[#E2DED3]/45 transition-colors duration-300 ease-in-out hover:text-[#E2DED3]/80"
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}