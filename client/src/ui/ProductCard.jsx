import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageUrl = product.images?.[0]?.url || product.images?.[0] || "/placeholder.jpg";

  const handleAddToCart = async (e) => {
    e.preventDefault();
    await addToCart(product._id, 1);
  };

  const handleBuyNow = async (e) => {
    e.preventDefault();
    await addToCart(product._id, 1);
    navigate("/checkout");
  };

  return (
    <div className="group">
      <Link to={`/products/${product._id}`}>
        <div className="aspect-4/5.5 overflow-hidden bg-brand-border relative">
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-gray-200" />
          )}
          <img
            src={imageUrl}
            alt={product.name}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300`}
          />
        </div>
      </Link>
      <div className="pt-3">
        <h3 className="font-serif text-base text-brand-text">{product.name}</h3>

        {(() => {
          const hasDiscount = product.discountPrice && product.discountPrice < product.price;
          const displayPrice = product.discountPrice || product.price;
          const discountPct = hasDiscount
            ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
            : 0;

          return (
            <div className="mt-1 flex items-center gap-2 flex-wrap">
              {hasDiscount && (
                <span className="text-xs text-gray-400 line-through">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
              )}
              <span className="text-sm text-brand-text font-medium">
                ₹{displayPrice.toLocaleString("en-IN")}
              </span>
              {hasDiscount && (
                <span className="text-xs font-medium text-green-700">
                  {discountPct}% OFF
                </span>
              )}
            </div>
          );
        })()}

        <div className="flex gap-2 mt-3 min-w-0">
          <Button className="flex-1 min-w-0 whitespace-nowrap px-2 py-0.5 text-[10px] sm:text-xs border border-[#3F010C]" onClick={handleAddToCart}>
            Add to Cart
          </Button>
          <Button className="flex-1 min-w-0 whitespace-nowrap px-2 py-0.5 text-[10px] sm:text-xs bg-[#3F010C] text-white" onClick={handleBuyNow}>
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}