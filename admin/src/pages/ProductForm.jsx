import { useEffect, useState } from "react";
import api from "../api/axios";
import { COLOR_OPTIONS } from "../constants/colors";

export default function ProductForm({ product, onClose, onSaved }) {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || "",
    discountPrice: product?.discountPrice || "",
    stock: product?.stock || "",
    category: product?.category?._id || "",
  });
  const [selectedColors, setSelectedColors] = useState(product?.colors || []);
  const [images, setImages] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get("/categories").then(({ data }) => setCategories(data.categories));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const toggleColor = (colorName) => {
    setSelectedColors((prev) =>
      prev.includes(colorName)
        ? prev.filter((c) => c !== colorName)
        : [...prev, colorName]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    formData.append("colors", JSON.stringify(selectedColors));
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
            <label className="text-sm text-gray-600">Discount Price (optional)</label>
            <input
              name="discountPrice"
              type="number"
              value={form.discountPrice}
              onChange={handleChange}
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

        <div>
          <label className="text-sm text-gray-600 mb-2 block">Colors</label>
          <div className="border rounded-md p-3 max-h-48 overflow-y-auto grid grid-cols-2 gap-2">
            {COLOR_OPTIONS.map((c) => (
              <label
                key={c.name}
                className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedColors.includes(c.name)}
                  onChange={() => toggleColor(c.name)}
                  className="accent-brand-primary"
                />
                <span
                  className="w-4 h-4 rounded-sm border border-gray-300 shrink-0"
                  style={{ backgroundColor: c.hex || "#fff" }}
                />
                {c.name}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-600">Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setImages(Array.from(e.target.files))}
            className="w-full text-sm mt-1 file:border file:border-black/55  file:rounded-md file:px-1 file:py-0.5 file:bg-white file:text-sm file:mr-3 file:cursor-pointer"
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