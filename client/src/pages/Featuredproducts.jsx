import { useState, useEffect } from "react";
import ProductCardSkeleton from "../ui/ProductCardSkeleton";
import SectionIntro from "../ui/Sectionintro";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { Link, useNavigate } from "react-router-dom";

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

function ProductImage({ src, alt }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden bg-ivory">
      {!imageLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
        className={`h-full w-full object-cover object-center transition-transform duration-[700ms] ease-in-out group-hover:scale-105 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      />
    </div>
  );
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/products", { params: { limit: 100 } }).then(({ data }) => {
      const featured = data.products.filter((p) => p.isFeatured);
      setProducts(featured.length > 0 ? featured : data.products.slice(0, 8));
      setLoading(false);
    });
  }, []);

  const handleAddToCart = async (e, productId) => {
    e.preventDefault();
    await addToCart(productId, 1);
  };

  const handleBuyNow = async (e, productId) => {
    e.preventDefault();
    await addToCart(productId, 1);
    navigate("/checkout");
  };

  if (!loading && products.length === 0) return null;

  return (
    <section
      aria-labelledby="featured-products-heading"
      className="bg-[#E2DED3] px-6 py-16 sm:px-10 sm:py-24 md:px-16 lg:px-20 lg:py-32 overflow-hidden"
    >
      <div className="w-20 h-px bg-[#3F010C]/30 mx-auto mb-16" />
      <SectionIntro
        id="featured-products-heading"
        eyebrow="The Edit"
        heading="Signature Sarees"
        paragraph="Handpicked pieces crafted for timeless elegance and modern celebrations."
      />

      <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-x-5 gap-y-12 sm:gap-x-8 sm:gap-y-16 lg:grid-cols-4 lg:gap-x-8 min-w-0">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
        ) : (
          products.map((p) => {
            const displayPrice = p.discountPrice || p.price;
            const hasDiscount = p.discountPrice && p.discountPrice < p.price;
            const discountPct = hasDiscount
              ? Math.round(((p.price - p.discountPrice) / p.price) * 100)
              : 0;
            const imageUrl = p.images?.[0]?.url || p.images?.[0];

            return (
              <Card key={p._id} className="group cursor-pointer">
                <Link to={`/products/${p._id}`}>
                  <div className="relative">
                    <ProductImage src={imageUrl} alt={p.name} />
                    <WishlistButton productName={p.name} />
                  </div>
                </Link>

                <div className="mt-5 px-4 pb-4">
                  <Link to={`/products/${p._id}`}>
                    <h3 className="font-serif text-lg font-normal leading-snug tracking-[-0.01em] text-black sm:text-xl">
                      {p.name}
                    </h3>
                  </Link>

                  <p className="mt-1.5 text-sm leading-tight text-[#3F010C]">
                    {p.description}
                  </p>

                  <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                    {hasDiscount && (
                      <span className="text-xs text-black/40 line-through">
                        ₹{p.price.toLocaleString("en-IN")}
                      </span>
                    )}
                    <span className="text-sm font-medium text-black">
                      ₹{displayPrice.toLocaleString("en-IN")}
                    </span>
                    {hasDiscount && (
                      <span className="text-xs font-medium text-green-700">
                        {discountPct}% OFF
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-1 px-4 pb-4 flex items-center gap-x-2 min-w-0">
                  <button
                    onClick={(e) => handleAddToCart(e, p._id)}
                    className="flex-1 min-w-0 border border-[#3F010C] px-2 py-1 text-[9px] sm:text-[10px] font-medium uppercase tracking-wide text-[#3F010C] transition-colors duration-300 hover:bg-[#3F010C] hover:text-white"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={(e) => handleBuyNow(e, p._id)}
                    className="flex-1 min-w-0 border border-[#3F010C] bg-[#3F010C] px-2 py-1 text-[9px] sm:text-[10px] font-medium uppercase tracking-wide text-white transition-colors duration-300 hover:bg-black"
                  >
                    Buy Now
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 ease-in-out group-hover/cta:w-full" />
                  </button>
                </div>
              </Card>
            );
          })
        )}
      </div>

      <div className="mt-12 flex justify-center sm:mt-16 lg:mt-20">
        <Link to="/products">
          <button
            type="button"
            className="border border-[#3F010C] px-5 py-2 text-[10px] font-medium uppercase tracking-label text-[#3F010C] transition-colors duration-300 ease-in-out hover:border-#3F010C hover:bg-[#3F010C] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-#3F010C focus-visible:ring-offset-2"
          >
            View all colllections
          </button>
        </Link>
      </div>
    </section>
  );
}