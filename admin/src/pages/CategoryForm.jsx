import { useState } from "react";
import api from "../api/axios";

export default function CategoryForm({ category, onClose, onSaved }) {
  const [name, setName] = useState(category?.name || "");
  const [description, setDescription] = useState(category?.description || "");
  const [image, setImage] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      if (category) {
        await api.put(`/categories/${category._id}`, formData);
      } else {
        await api.post("/categories", formData);
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
        className="bg-white rounded-lg w-full max-w-lg p-4 md:p-6 space-y-4 my-6"
      >
        <h2 className="text-lg font-semibold">
          {category ? "Edit Category" : "Add Category"}
        </h2>

        <div>
          <label className="text-sm text-gray-600">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded-md px-3 py-2 mt-1 text-sm min-h-[100px] resize-y"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
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