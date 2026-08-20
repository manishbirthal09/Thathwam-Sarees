import { useEffect, useState } from "react";
import api from "../api/axios";

const staticFilterOptions = {
  fabrics: ["Silk", "Cotton", "Chiffon", "Georgette", "Banarasi"],
  colors: ["Red", "Blue", "Green", "Gold", "Pink", "Black"],
};

export default function FilterSidebar({ filters, setFilters }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get("/categories").then(({ data }) => setCategories(data.categories));
  }, []);

  const toggleFilter = (type, value) => {
    setFilters((prev) => {
      const current = prev[type];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [type]: updated };
    });
  };

  const FilterGroup = ({ title, type, options }) => (
    <div className="mb-6">
      <h4 className="font-medium text-sm text-brand-text mb-3">{title}</h4>
      <div className="space-y-2">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={filters[type].includes(opt)}
              onChange={() => toggleFilter(type, opt)}
              className="accent-brand-primary"
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <aside className="w-full md:w-56 shrink-0">
      <FilterGroup title="Category" type="categories" options={categories.map((c) => c.name)} />
      <FilterGroup title="Fabric" type="fabrics" options={staticFilterOptions.fabrics} />
      <FilterGroup title="Color" type="colors" options={staticFilterOptions.colors} />

      <div className="mb-6">
        <h4 className="font-medium text-sm text-brand-text mb-3">Price Range</h4>
        <input
          type="range"
          min="0"
          max="10000"
          step="500"
          value={filters.maxPrice}
          onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
          className="w-full accent-brand-primary"
        />
        <p className="text-xs text-gray-500 mt-1">Up to ₹{filters.maxPrice.toLocaleString("en-IN")}</p>
      </div>
    </aside>
  );
}