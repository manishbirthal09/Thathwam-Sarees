
import { useState, useEffect } from "react";
import api from "../api/axios";

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [code, setCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(10);

  const fetchCoupons = () => {
    api.get("/coupons").then(({ data }) => setCoupons(data));
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleCreate = async () => {
    await api.post("/coupons", { code, discountPercent });
    setCode("");
    fetchCoupons();
  };

  const toggleActive = async (coupon) => {
    await api.put(`/coupons/${coupon._id}`, { active: !coupon.active });
    fetchCoupons();
  };

  const handleDelete = async (id) => {
    await api.delete(`/coupons/${id}`);
    fetchCoupons();
  };

  return (
    <div className="max-w-2xl p-6">
      <h2 className="text-lg font-semibold mb-4">Coupons</h2>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Coupon code (e.g. SAVE10)"
          className="flex-1 border rounded-md px-3 py-2 text-sm"
        />
        <select
          value={discountPercent}
          onChange={(e) => setDiscountPercent(Number(e.target.value))}
          className="border rounded-md px-3 py-2 text-sm"
        >
          <option value={10}>10%</option>
          <option value={30}>30%</option>
          <option value={50}>50%</option>
        </select>
        <button
          onClick={handleCreate}
          className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm"
        >
          Add
        </button>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Code</th>
            <th>Discount</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((c) => (
            <tr key={c._id} className="border-b">
              <td className="py-2 font-medium">{c.code}</td>
              <td>{c.discountPercent}%</td>
              <td>
                <button
                  onClick={() => toggleActive(c)}
                  className={`text-xs px-2 py-1 rounded ${
                    c.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {c.active ? "Active" : "Inactive"}
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(c._id)}
                  className="text-xs text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}