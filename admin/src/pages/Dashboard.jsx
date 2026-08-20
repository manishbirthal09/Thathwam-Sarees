import { useEffect, useState } from "react";
import api from "../api/axios";
import AdminLayout from "../components/AdminLayout";
import { Package, Tag, ShoppingBag, IndianRupee } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [productsRes, categoriesRes, ordersRes] = await Promise.all([
        api.get("/products", { params: { limit: 1000 } }),
        api.get("/categories"),
        api.get("/orders"),
      ]);

      const orders = ordersRes.data;
      const totalRevenue = orders
        .filter((o) => o.paymentStatus === "paid" || o.paymentMethod === "cod")
        .reduce((sum, o) => sum + o.totalAmount, 0);

      setStats({
        totalProducts: productsRes.data.total ?? productsRes.data.products.length,
        totalCategories: categoriesRes.data.count ?? categoriesRes.data.categories.length,
        totalOrders: orders.length,
        totalRevenue,
      });

      setRecentOrders(orders.slice(0, 5));
      setLoading(false);
    };

    fetchStats();
  }, []);

  const cards = [
    { label: "Total Products", value: stats.totalProducts, icon: Package, color: "bg-blue-50 text-blue-600" },
    { label: "Categories", value: stats.totalCategories, icon: Tag, color: "bg-purple-50 text-purple-600" },
    { label: "Total Orders", value: stats.totalOrders, icon: ShoppingBag, color: "bg-orange-50 text-orange-600" },
    {
      label: "Revenue",
      value: `₹${stats.totalRevenue.toLocaleString("en-IN")}`,
      icon: IndianRupee,
      color: "bg-green-50 text-green-600",
    },
  ];

  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      {loading ? (
        <p className="text-sm text-gray-500">Loading stats...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {cards.map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-white rounded-lg shadow-sm p-4 md:p-5">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${color}`}>
                  <Icon size={20} />
                </div>
                <p className="text-xl md:text-2xl font-semibold text-gray-900 break-words">{value}</p>
                <p className="text-sm text-gray-500 mt-1">{label}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 md:p-5">
            <h2 className="font-medium text-gray-900 mb-4">Recent Orders</h2>
            {recentOrders.length === 0 ? (
              <p className="text-sm text-gray-500">No orders yet.</p>
            ) : (
                <div className="overflow-x-auto">
  <table className="min-w-[650px] w-full text-sm">
              
                <thead className="text-left text-gray-500 border-b">
                  <tr>
                    <th className="pb-2">Order ID</th>
                    <th className="pb-2">Customer</th>
                    <th className="pb-2">Amount</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order._id} className="border-b last:border-0">
                      <td className="py-2 font-mono text-xs">{order._id.slice(-8).toUpperCase()}</td>
                      <td className="py-2">{order.customer?.name}</td>
                      <td className="py-2">₹{order.totalAmount.toLocaleString("en-IN")}</td>
                      <td className="py-2 capitalize">{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            )}
          </div>
        </>
      )}
    </AdminLayout>
  );
}