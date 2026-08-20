import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ProductForm({ product, onClose, onSaved }) {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || "",
    stock: product?.stock || "",
    category: product?.category?._id || "",
    
  });
  const [images, setImages] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get("/categories").then(({ data }) => setCategories(data.categories));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    images.forEach((img) => formData.append("images", img));

    try {
      if (product) {
        await api.put(`/products/${product._id}`, formData);
      } else {
        await api.post("/products", formData);
      }
      onSaved();
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-start md:items-center justify-center z-50 overflow-y-auto p-4">
    <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg w-full max-w-2xl p-4 md:p-6 space-y-4 my-6"
        >
        <h2 className="text-lg font-semibold">
          {product ? "Edit Product" : "Add Product"}
        </h2>

        <div>
          <label className="text-sm text-gray-600">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
          />
        </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Price</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Stock</label>
            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-600">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* <div>
            <label className="text-sm text-gray-600">Color</label>
            <input
              name="color"
              value={form.color}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
            />
          </div> */}
          {/* <div>
            <label className="text-sm text-gray-600">Fabric</label>
            <input
              name="fabric"
              value={form.fabric}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
            />
          </div> 
        </div> */}

        <div>
          <label className="text-sm text-gray-600">Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setImages(Array.from(e.target.files))}
            className="w-full text-sm mt-1"
          />
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm border rounded-md w-full sm:w-auto">
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm disabled:opacity-50 w-full sm:w-auto"
           >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}