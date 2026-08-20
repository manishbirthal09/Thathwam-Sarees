import React, { useEffect, useState } from "react";
import api from "../api/axios";
import AdminLayout from "../components/AdminLayout";

const STATUS_OPTIONS = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await api.get("/orders");
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      alert(err.response?.data?.message || "Status update failed");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold mb-6">Orders</h1>

      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-sm text-gray-500">No orders yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
  <table className="min-w-[900px] w-full text-sm">
        
            <thead className="bg-gray-100 text-left text-gray-600">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <React.Fragment key={order._id}>
                  <tr key={order._id} className="border-t">
                    <td className="p-3 font-mono text-xs">
                      {order._id.slice(-8).toUpperCase()}
                    </td>
                    <td className="p-3">{order.customer?.name}</td>
                    <td className="p-3">₹{order.totalAmount}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          order.paymentStatus === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="p-3">
                      <select
                        value={order.status}
                        disabled={updatingId === order._id}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className={`w-full min-w-[120px] text-xs px-2 py-1 rounded border font-medium ${statusColors[order.status]}`}
                        >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-3 text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() =>
                          setExpandedId(expandedId === order._id ? null : order._id)
                        }
                        className="text-blue-600 text-xs"
                      >
                        {expandedId === order._id ? "Hide" : "View"}
                      </button>
                    </td>
                  </tr>

                  {expandedId === order._id && (
                    <tr className="border-t bg-gray-50">
                      <td colSpan={7} className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-medium mb-2">Shipping Address</h3>
                            <p className="text-gray-600 break-words">
                              {order.customer?.name} — {order.customer?.phone}
                            </p>
                            <p className="text-gray-600 break-words">
                              {order.customer?.address}, {order.customer?.city} -{" "}
                              {order.customer?.pincode}
                            </p>
                          </div>
                          <div>
                            <h3 className="font-medium mb-2">Items</h3>
                            {order.items.map((item, i) => (
                              <p key={i} className="text-gray-600">
                                {item.name} × {item.quantity} — ₹{item.price}
                              </p>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}