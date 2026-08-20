// import { useParams, Link } from "react-router-dom";

// export default function OrderSuccess() {
//   const { orderId } = useParams();

//   return (
//     <div className="max-w-lg mx-auto px-6 py-24 text-center">
//       <h1 className="text-2xl font-serif mb-4 text-[#3F010C]">Order Placed!</h1>
//       <p className="text-gray-500 mb-2">Thank you for shopping with us.</p>
//       <p className="text-xs text-gray-400 mb-8">Order ID: {orderId}</p>
//       <Link to="/products" className="inline-block px-6 py-3 bg-[#3F010C] text-white text-sm rounded">
//         Continue Shopping
//       </Link>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

export default function OrderSuccess() {
  const { orderId } = useParams();
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    api
      .get(`/payment/status/${orderId}`)
      .then(({ data }) => {
        setStatus(data.paymentStatus === "paid" ? "success" : "failed");
      })
      .catch(() => setStatus("cod")); // agar payment API fail ho (COD order tha), treat as normal success
  }, [orderId]);

  if (status === "checking") {
    return (
      <div className="max-w-lg mx-auto px-6 py-24 text-center">
        <p className="text-gray-500">Verifying your order...</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="max-w-lg mx-auto px-6 py-24 text-center">
        <h1 className="text-2xl font-serif mb-4 text-red-600">Payment Failed</h1>
        <p className="text-gray-500 mb-8">Something went wrong with your payment. Please try again.</p>
        <Link to="/checkout" className="inline-block px-6 py-3 bg-[#3F010C] text-white text-sm rounded">
          Try Again
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-6 py-24 text-center">
      <h1 className="text-2xl font-serif mb-4 text-[#3F010C]">Order Placed!</h1>
      <p className="text-gray-500 mb-2">Thank you for shopping with us.</p>
      <p className="text-xs text-gray-400 mb-8">Order ID: {orderId}</p>
      <Link to="/products" className="inline-block px-6 py-3 bg-[#3F010C] text-white text-sm rounded">
        Continue Shopping
      </Link>
    </div>
  );
}