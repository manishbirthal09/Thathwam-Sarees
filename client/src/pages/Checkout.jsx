import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useCustomerAuth } from "../context/CustomerAuthContext";
import api from "../api/axios";

export default function Checkout() {
  const { cart, totalAmount, cartId } = useCart();
  const { isAuthenticated, customer } = useCustomerAuth();
   const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    name: customer?.name || "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");
const [settings, setSettings] = useState({ deliveryCharge: 99, bogoEnabled: true });
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscountPercent, setCouponDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  
  useEffect(() => {
  if (!isAuthenticated) {
    navigate("/login", { state: { from: "/checkout" }, replace: true });}
     }, [isAuthenticated, navigate]);

if (!isAuthenticated) {
  return null;
}


  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <p className="text-gray-500">Your cart is empty.</p>
      </div>
    );
  }

  const handleChange = (e) => setAddress({ ...address, [e.target.name]: e.target.value });


  const handlePlaceOrder = async (e) => {
  e.preventDefault();
  setError("");
  setPlacing(true);

  try {
    const items = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      price: item.product.discountPrice || item.product.price,
      quantity: item.quantity,
    }));

    const { data: order } = await api.post("/orders", {
      items,
      totalAmount,
      customer: address,
      paymentMethod,
    });

    if (paymentMethod === "razorpay") {
      
      const { data } = await api.post("/payment/create-order", {
        amount: totalAmount,
        orderId: order._id,
      });

      
      const options = {
        key: data.key_id,
        amount: data.amount,
        currency: data.currency,
        order_id: data.order_id,
        name: "Thathwam Sarees",
        description: "Order Payment",
        handler: async function (response) {
          try {
            const verifyRes = await api.post("/payment/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: order._id,
            });

            if (verifyRes.data.success) {
              navigate(`/order-success/${order._id}`);
            } else {
              setError("Payment verification failed. Please contact support.");
            }
          } catch (err) {
            setError("Payment verification failed. Please contact support.");
          } finally {
            setPlacing(false);
          }
        },
        modal: {
          ondismiss: function () {
            
            setPlacing(false);
          },
        },
        prefill: {
          name: address.name,
          email: customer?.email || "",
          contact: address.phone,
        },
        theme: { color: "#3F010C" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      navigate(`/order-success/${order._id}`);
      setPlacing(false);
    }
  } catch (err) {
    setError(err.response?.data?.message || "Failed to place order");
    setPlacing(false);
  }
};


useEffect(() => {
    api.get("/settings").then(({ data }) => setSettings(data));
  }, []);

  const handleApplyCoupon = async () => {
    setCouponError("");
    try {
      const { data } = await api.post("/coupons/validate", { code: couponCode });
      setCouponDiscountPercent(data.discountPercent);
      setCouponApplied(true);
    } catch (err) {
      setCouponError(err.response?.data?.message || "Invalid coupon");
      setCouponDiscountPercent(0);
      setCouponApplied(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-serif mb-8 text-[#3F010C]">Checkout</h1>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h2 className="font-medium text-sm mb-3 text-[#3F010C]">Order Summary</h2>
        {cart.items.map((item) => (
          <div key={item._id} className="flex justify-between text-sm text-gray-600 py-1">
            <span>{item.product.name} × {item.quantity}</span>
            <span>₹{((item.product.discountPrice || item.product.price) * item.quantity).toLocaleString("en-IN")}</span>
          </div>
        ))}
        <div className="flex justify-between font-semibold text-[#3F010C] mt-3 pt-3 border-t">
          <span>Total</span>
          <span>₹{totalAmount.toLocaleString("en-IN")}</span>
        </div>
      </div>

      {error && <p className="text-red-600 text-sm mb-4 bg-red-50 p-2 rounded">{error}</p>}

      <form onSubmit={handlePlaceOrder} className="space-y-4">
        <div>
          <label className="text-sm text-gray-600">Full Name</label>
          <input
            name="name"
            value={address.name}
            onChange={handleChange}
            required
            className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600">Phone</label>
          <input
            name="phone"
            value={address.phone}
            onChange={handleChange}
            required
            className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600">Address</label>
          <textarea
            name="address"
            value={address.address}
            onChange={handleChange}
            required
            className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">City</label>
            <input
              name="city"
              value={address.city}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Pincode</label>
            <input
              name="pincode"
              value={address.pincode}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
            />
          </div>
        </div>
<div className="mt-4">
  <div className="flex gap-2">
    <input
      type="text"
      value={couponCode}
      onChange={(e) => setCouponCode(e.target.value)}
      placeholder="Have a coupon? Enter code"
      className="flex-1 border rounded-md px-3 py-2 text-sm"
      disabled={couponApplied}
    />
    <button
      type="button"
      onClick={handleApplyCoupon}
      disabled={couponApplied}
      className="bg-[#3F010C] text-white px-4 py-2 rounded-md text-sm disabled:opacity-50"
    >
      {couponApplied ? "Applied" : "Apply"}
    </button>
  </div>
  {couponError && <p className="text-xs text-red-600 mt-1">{couponError}</p>}
  {couponApplied && (
    <p className="text-xs text-green-700 mt-1">
      {couponDiscountPercent}% discount applied!
    </p>
  )}
</div>

<div className="mb-2">
  <h3 className="text-sm font-medium text-[#3F010C] mb-3">Payment Method</h3>
  <div className="space-y-2">
   
    <label className="flex items-center gap-3 border rounded-md px-4 py-3 cursor-pointer">
      <input
        type="radio"
        name="paymentMethod"
        value="razorpay"
        checked={paymentMethod === "razorpay"}
        onChange={(e) => setPaymentMethod(e.target.value)}
      />
      <span className="text-sm">Pay Online (UPI / Card / Wallet)</span>
    </label>
  </div>
</div>
       

        <button
          type="submit"
          disabled={placing}
          className="w-full bg-[#3F010C] text-white py-3  text-sm font-medium hover:opacity-90 disabled:opacity-50"
        >
         {placing
  ? "Processing..."
  : "Proceed to Pay"
  }
        </button>
      </form>
    </div>
  );
}