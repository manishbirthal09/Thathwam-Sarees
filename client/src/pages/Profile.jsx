import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomerAuth } from "../context/CustomerAuthContext";
import api from "../api/axios";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function Profile() {
  const { customer, isAuthenticated, logout } = useCustomerAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/profile" }, replace: true });
      return;
    }
    api.get("/orders/my-orders").then(({ data }) => {
      setOrders(data);
      setLoading(false);
    });
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif text-[#3F010C]">{customer?.name}</h1>
          <p className="text-sm text-gray-500">{customer?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50"
        >
          Logout
        </button>
      </div>

      <h2 className="text-lg font-medium text-[#3F010C] mb-4">My Orders</h2>

      {loading ? (
        <p className="text-sm text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-sm text-gray-500">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-xs text-gray-400 font-mono">
                    #{order._id.slice(-8).toUpperCase()}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded font-medium ${statusColors[order.status]}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="space-y-1 mb-3">
                {order.items.map((item, i) => (
                  <p key={i} className="text-sm text-gray-600">
                    {item.name} × {item.quantity}
                  </p>
                ))}
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500">
                  Payment: {order.paymentMethod?.toUpperCase()} ({order.paymentStatus})
                </span>
                <span className="text-sm font-semibold text-[#3F010C]">
                  ₹{order.totalAmount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}