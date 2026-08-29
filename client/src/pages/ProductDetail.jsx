import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { Truck, RotateCcw, Check } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(`/products/${id}`).then(({ data }) => {
      const p = data.product || data;
      setProduct(p);
      if (p.variants?.length > 0) setSelectedVariant(p.variants[0]);
      setActiveImage(0);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <div className="max-w-6xl mx-auto px-6 py-20 text-center text-gray-500">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <p className="text-gray-500 mb-4">Product not found.</p>
        <Link to="/products" className="text-[#3F010C] underline">Back to Shop</Link>
      </div>
    );
  }

  const images = product.images?.length > 0 ? product.images : [{ url: "/placeholder.jpg" }];
  const basePrice = product.price;
  const displayPrice =
    product.discountPrice ??
    (selectedVariant ? basePrice + (selectedVariant.priceModifier || 0) : basePrice);
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;

  const handleAddToCart = async () => {
    setAdding(true);
    await addToCart(product._id, quantity);
    setAdding(false);
  };

  const handleBuyNow = async () => {
    setAdding(true);
    await addToCart(product._id, quantity);
    setAdding(false);
    navigate("/checkout");
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        
        <div>
          <div className="aspect-4/5  overflow-hidden bg-gray-100 mb-3">
            <img
              src={images[activeImage]?.url || images[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-16 rounded overflow-hidden border-2 ${
                    activeImage === i ? "border-[#3F010C]" : "border-transparent"
                  }`}
                >
                  <img src={img.url || img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="text-2xl font-serif text-[#3F010C] mb-2">{product.name}</h1>
          {product.category?.name && (
            <p className="text-sm text-gray-500 mb-4">{product.category.name}</p>
          )}
{(() => {
  const discountPct = hasDiscount
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  return (
    <div className="flex items-center gap-3 mb-6 flex-wrap">
      {hasDiscount && (
        <span className="text-sm text-gray-400 line-through">
          ₹{product.price.toLocaleString("en-IN")}
        </span>
      )}
      <span className="text-xl font-semibold text-[#3F010C]">
        ₹{displayPrice.toLocaleString("en-IN")}
      </span>
      {hasDiscount && (
        <span className="text-sm font-medium text-green-700">
          {discountPct}% OFF
        </span>
      )}
    </div>
  );
})()}
          

          <p className="text-sm text-gray-600 mb-6 leading-relaxed">{product.description}</p>

          
          {product.variants?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-[#3F010C] mb-2">Color</h3>
              <div className="flex gap-2 flex-wrap">
                {product.variants.map((v) => (
                  <button
                    key={v._id}
                    onClick={() => setSelectedVariant(v)}
                    disabled={v.stock === 0}
                    className={`px-4 py-2 rounded-md border text-sm ${
                      selectedVariant?._id === v._id
                        ? "border-[#3F010C] bg-[#3F010C] text-white"
                        : "border-gray-300 text-gray-700"
                    } ${v.stock === 0 ? "opacity-40 cursor-not-allowed" : ""}`}
                  >
                    {v.value}
                  </button>
                ))}
              </div>
            </div>
          )}

          
          <div className="mb-8">
            <h3 className="text-sm font-medium text-[#3F010C] mb-2">Quantity</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 border border-gray-300 rounded"
              >
                −
              </button>
              <span className="w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 border border-gray-300 rounded"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              disabled={adding}
              className="flex-1 border border-[#3F010C] text-[#3F010C] py-3  text-sm font-medium hover:bg-[#3F010C] hover:text-white transition disabled:opacity-50"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              disabled={adding}
              className="flex-1 bg-[#3F010C] text-white py-3  text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
            >
              Buy Now
            </button>
          </div>
         
<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-6 my-6 border-t border-b border-gray-200">
  <div className="flex items-center gap-3">
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3F010C]/5">
      <Truck size={16} className="text-[#3F010C]" />
    </div>
    <span className="text-xs font-medium text-[#3F010C]">Fast & Reliable Shipping</span>
  </div>

  <div className="flex items-center gap-3">
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3F010C]/5">
      <RotateCcw size={16} className="text-[#3F010C]" />
    </div>
    <span className="text-xs font-medium text-[#3F010C]">Delivered With Care, 5-7 Days</span>
  </div>

  <div className="flex items-center gap-3">
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3F010C]/5">
      <Check size={16} className="text-[#3F010C]" />
    </div>
    <span className="text-xs font-medium text-[#3F010C]">Safe & Encrypted Payments</span>
  </div>
</div>
         
        </div>
      </div>
    </div>
  );
}