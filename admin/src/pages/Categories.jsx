import { useEffect, useState } from "react";
import api from "../api/axios";
import AdminLayout from "../components/AdminLayout";
import CategoryForm from "./CategoryForm";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    setLoading(true);
    const { data } = await api.get("/categories");
    setCategories(data.categories);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this category?")) return;
    await api.delete(`/categories/${id}`);
    fetchCategories();
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="bg-[#3F010C] text-white px-4 py-2 rounded-md text-sm w-full sm:w-auto"
           >
          + Add Category
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
  <table className="min-w-[650px] w-full text-sm">
       
          <thead className="bg-gray-100 text-left text-gray-600">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Slug</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id} className="border-t">
                <td className="p-3">
                  {cat.image?.url && (
                    <img src={cat.image.url} alt={cat.name} className="w-12 h-12 rounded object-cover" />
                  )}
                </td>
                <td className="p-3">{cat.name}</td>
                <td className="p-3 text-gray-500">{cat.slug}</td>
                <td className="p-3">
  <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={() => {
                      setEditing(cat);
                      setShowForm(true);
                    }}
                    className="text-blue-600"
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(cat._id)} className="text-red-600">
                    Delete
                  </button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}

      {showForm && (
        <CategoryForm
          category={editing}
          onClose={() => setShowForm(false)}
          onSaved={() => {
            setShowForm(false);
            fetchCategories();
          }}
        />
      )}
    </AdminLayout>
  );
}