import { Link, useNavigate } from "react-router-dom";
import { Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "../context/CartContext";


function CartSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 mt-2">
      <div className="h-7 w-40 bg-gray-200 rounded animate-pulse mb-8" />

      <div className="space-y-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex gap-4 border-b border-gray-200 pb-6">
            <div className="w-24 h-32 bg-gray-200 rounded animate-pulse" />
            <div className="flex-1 space-y-3">
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-1/4 bg-gray-200 rounded animate-pulse" />
              <div className="flex items-center gap-3 mt-3">
                <div className="w-7 h-7 bg-gray-200 rounded animate-pulse" />
                <div className="w-6 h-4 bg-gray-200 rounded animate-pulse" />
                <div className="w-7 h-7 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
            <div className="h-4 w-14 bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center">
        <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
        <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
      </div>

      <div className="mt-6 w-full h-12 bg-gray-200 rounded animate-pulse" />
    </div>
  );
}
export default function Cart() {
  const { cart, loading, updateQuantity, removeFromCart, totalAmount } = useCart();
  const navigate = useNavigate();

  if (loading) {
    return <CartSkeleton />;
  }

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-serif mb-4 text-[#3F010C]">Your cart is empty</h1>
        <Link
          to="/products"
          className="inline-block mt-4 px-6 py-3 bg-[#3F010C] text-white text-sm rounded"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 mt-2">
      <h1 className="text-2xl font-serif mb-8 text-[#3F010C]">Shopping Cart</h1>

      <div className="space-y-6">
        {cart.items.map((item) => {
          const product = item.product;
          if (!product) return null;
          const imageUrl = product.images?.[0]?.url || product.images?.[0];
          const price = product.discountPrice || product.price;

          return (
            <div key={item._id} className="flex gap-4 border-b border-gray-200 pb-6">
              <img
                src={imageUrl}
                alt={product.name}
                className="w-24 h-32 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-serif text-base text-[#3F010C]">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  ₹{price.toLocaleString("en-IN")}
                </p>

                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => updateQuantity(product._id, item.quantity - 1)}
                    className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-sm w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(product._id, item.quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded"
                  >
                    <Plus size={12} />
                  </button>

                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="ml-4 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="text-sm font-medium text-[#3F010C]">
                ₹{(price * item.quantity).toLocaleString("en-IN")}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-between items-center">
        <span className="text-lg font-medium text-[#3F010C]">Total</span>
        <span className="text-lg font-semibold text-[#3F010C]">
          ₹{totalAmount.toLocaleString("en-IN")}
        </span>
      </div>

      <button
        onClick={() => navigate("/checkout")}
        className="mt-6 w-full bg-[#3F010C] text-white py-3 rounded text-sm font-medium hover:opacity-90"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}