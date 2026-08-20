import { useState } from "react";

// Helper: loads Razorpay's checkout script dynamically (only once)
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-checkout-js")) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "razorpay-checkout-js";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function RazorpayCheckout({ orderId, amount, customerName, customerEmail, customerPhone, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    // 1. Load Razorpay's script if not already loaded
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert("Razorpay SDK failed to load. Check your internet connection.");
      setLoading(false);
      return;
    }

    // 2. Ask YOUR backend to create a Razorpay order
    const res = await fetch("/api/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, orderId }),
    });
    const data = await res.json();

    if (!data.success) {
      alert("Could not initiate payment. Please try again.");
      setLoading(false);
      return;
    }

    // 3. Open the Razorpay checkout modal with that order_id
    const options = {
      key: data.key_id,
      amount: data.amount,
      currency: data.currency,
      name: "Thathwam Saree",
      description: "Order Payment",
      order_id: data.order_id,
      prefill: {
        name: customerName,
        email: customerEmail,
        contact: customerPhone,
      },
      theme: { color: "#6b1e2a" }, // adjust to your brand color

      // 4. This runs automatically when payment succeeds inside the modal
      handler: async function (response) {
        // response contains: razorpay_payment_id, razorpay_order_id, razorpay_signature

        // 5. Send these to YOUR backend to verify authenticity
        const verifyRes = await fetch("/api/payment/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId,
          }),
        });
        const verifyData = await verifyRes.json();

        if (verifyData.success) {
          onSuccess(); // e.g. redirect to "Order Confirmed" page
        } else {
          alert("Payment verification failed. Contact support if amount was deducted.");
        }
      },

      modal: {
        ondismiss: function () {
          // user closed the popup without paying
          setLoading(false);
        },
      },
    };

    const razorpayModal = new window.Razorpay(options);
    razorpayModal.open();
    setLoading(false);
  };

  return (
    <button onClick={handlePayment} disabled={loading}>
      {loading ? "Processing..." : `Pay ₹${amount}`}
    </button>
  );
}