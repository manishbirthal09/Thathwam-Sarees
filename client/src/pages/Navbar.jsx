



import { useState, useEffect, useRef, useCallback } from "react";
import { ANNOUNCEMENT_BAR_HEIGHT } from "./AnnouncementBar";
import AnnouncementBar from "./AnnouncementBar";
import { Link } from "react-router-dom";
import { User, ChevronDown } from "lucide-react";
import { useCustomerAuth } from "../context/CustomerAuthContext";
import { useCart } from "../context/CartContext";
import api from "../api/axios";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Collection", href: "/products" },
];

const SCROLL_THRESHOLD = ANNOUNCEMENT_BAR_HEIGHT;

function CartIcon(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6 8h12l-1 12.5a1.5 1.5 0 0 1-1.5 1.5h-7a1.5 1.5 0 0 1-1.5-1.5L6 8z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const searchInputRef = useRef(null);
  const { isAuthenticated, customer } = useCustomerAuth();
  const { itemCount } = useCart();

  useEffect(() => {
    api.get("/categories").then(({ data }) => setCategories(data.categories));
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow =
      isSearchOpen || isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSearchOpen, isMobileMenuOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      const id = setTimeout(() => searchInputRef.current?.focus(), 250);
      return () => clearTimeout(id);
    }
    return undefined;
  }, [isSearchOpen]);

  const closeOverlays = useCallback(() => {
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeOverlays();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeOverlays]);

  const linkToneClass = "text-ivory/85 hover:text-ivory";
  const iconToneClass = "text-ivory/85 hover:text-gold";

  return (
    <>
      <header
        className="fixed inset-x-0 z-40 border-b border-gold/25 bg-[#3F010C] text-white transition-[top] duration-300 ease-in-out"
        style={{ top:  isHome && !isScrolled ?  ANNOUNCEMENT_BAR_HEIGHT :0}}
      >
        <nav
          aria-label="Primary"
          className="mx-auto grid h-10 max-w-[1600px] grid-cols-3 items-center px-6 sm:px-10 md:h-20 lg:h-12 lg:px-16"
        >
          <ul className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`group relative text-[12px] font-medium uppercase tracking-label transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-#3F010C ${linkToneClass}`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 ease-in-out group-hover:w-full" />
                </a>
              </li>
            ))}

            
            <li
              className="relative"
              onMouseEnter={() => setIsCategoriesOpen(true)}
              onMouseLeave={() => setIsCategoriesOpen(false)}
            >
              <button
                type="button"
                className={`group relative flex items-center gap-1 text-[12px] font-medium uppercase tracking-label transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-#3F010C ${linkToneClass}`}
              >
                Categories
                <ChevronDown size={12} />
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 ease-in-out group-hover:w-full" />
              </button>

              {isCategoriesOpen && categories.length > 0 && (
                 <div className="absolute top-full left-0 pt-2 z-50">
      <div className="min-w-[180px] bg-[#3F010C] border border-gold/25 shadow-lg py-2">
                
                  {categories.map((cat) => (
                    <a
                      key={cat._id}
                      href={`/products?category=${encodeURIComponent(cat.name)}`}
                      className="block px-4 py-2 text-[12px] uppercase tracking-label text-ivory/85 hover:text-gold hover:bg-white/5 transition-colors duration-200"
                    >
                      {cat.name}
                    </a>
                  ))}
                </div>
                </div>
              )}
            </li>

            <li>
              <a
                href="/contact"
                className={`group relative text-[12px] font-medium uppercase tracking-label transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-#3F010C ${linkToneClass}`}
              >
                Contact
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 ease-in-out group-hover:w-full" />
              </a>
            </li>
          </ul>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
            className={`justify-self-start p-1 transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-#3F010C lg:hidden ${iconToneClass}`}
          >
            <MenuIcon />
          </button>

          <a
            href="/"
            className="col-start-2 justify-self-center font-serif text-xl font-normal tracking-[-0.01em] text-ivory transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-#3F010C sm:text-2xl"
          >
            <img src="/Thathwamlogofinal.png" alt="Thathwam Sarees" className="h-12 w-auto sm:h-12 rounded-sm" />
          </a>

          <div className="flex items-center justify-end gap-5">
            <a
              href="/cart"
              aria-label={`Cart, ${itemCount} items`}
              className={`relative p-1 transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-#3F010C ${iconToneClass}`}
            >
              <CartIcon />
              {itemCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-medium text-#3F010C">
                  {itemCount}
                </span>
              )}
            </a>
            <Link
              to={isAuthenticated ? "/profile" : "/login"}
              aria-label="Profile"
              className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-1.5"
            >
              <User size={18} strokeWidth={1.5} />
              {isAuthenticated && (
                <span className="text-xs">{customer?.name?.split(" ")[0]}</span>
              )}
            </Link>
          </div>
        </nav>
      </header>

  
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className={`fixed inset-0 z-50 flex flex-col bg-ivory transition-opacity duration-300 ease-in-out ${
          isSearchOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-end px-6 pt-6 sm:px-10 sm:pt-8">
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            aria-label="Close search"
            className="p-1 text-black/70 transition-colors duration-300 ease-in-out hover:text-#3F010C focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-#3F010C focus-visible:ring-offset-2"
          >
            <CloseIcon />
          </button>
        </div>
      </div>

      
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-0 z-50 flex flex-col bg-[#3F010C] text-white transition-opacity duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-6 pt-6">
          <span className="font-serif text-xl text-ivory">Thathwam Sarees</span>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
            className="p-1 text-ivory/80 transition-colors duration-300 ease-in-out hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-#3F010C"
          >
            <CloseIcon />
          </button>
        </div>

        <nav aria-label="Mobile primary" className="flex flex-1 flex-col justify-center px-8 overflow-y-auto">
          <ul className="space-y-7">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-4xl font-normal text-ivory transition-colors duration-300 ease-in-out hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-#3F010C sm:text-5xl"
                >
                  {link.label}
                </a>
              </li>
            ))}

            <li>
              <span className="font-serif text-4xl font-normal text-ivory sm:text-5xl">Categories</span>
              <ul className="mt-4 space-y-3 pl-2">
                {categories.map((cat) => (
                  <li key={cat._id}>
                    <a
                      href={`/collection?category=${encodeURIComponent(cat.name)}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-lg text-ivory/80 hover:text-gold transition-colors duration-200"
                    >
                      {cat.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>

            <li>
              <a
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-serif text-4xl font-normal text-ivory transition-colors duration-300 ease-in-out hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-#3F010C sm:text-5xl"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-8 border-t border-ivory/15 px-8 py-8">
          <a
            href="/cart"
            className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-label text-ivory/80 transition-colors duration-300 ease-in-out hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-#3F010C"
          >
            <CartIcon width="16" height="16" />
            Cart ({itemCount})
          </a>
        </div>
      </div>
    </>
  );
}