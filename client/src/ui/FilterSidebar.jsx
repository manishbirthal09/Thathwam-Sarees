import { useEffect, useState, useRef } from "react";
import api from "../api/axios";
import { ChevronDown } from "lucide-react";



function MultiSelectDropdown({ label, options, selected, onToggle }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mb-6" ref={wrapperRef}>
      <h4 className="font-medium text-sm text-brand-text mb-3">{label}</h4>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-600 bg-white"
      >
        <span>
          {selected.length === 0
            ? `All ${label}`
            : `${selected.length} selected`}
        </span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className=" mt-1 z-20 max-h-56 overflow-y-auto border border-gray-200 bg-white rounded-md shadow-lg py-2">
          {options.map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 cursor-pointer hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => onToggle(opt)}
                className="accent-brand-primary"
              />
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
export default function FilterSidebar({ filters, setFilters, defaultFilters }) {
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

  // const FilterGroup = ({ title, type, options }) => (
  //   <div className="mb-6">
  //     <h4 className="font-medium text-sm text-brand-text mb-3">{title}</h4>
  //     <div className="space-y-2">
  //       {options.map((opt) => (
  //         <label key={opt} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
  //           <input
  //             type="checkbox"
  //             checked={filters[type].includes(opt)}
  //             onChange={() => toggleFilter(type, opt)}
  //             className="accent-brand-primary"
  //           />
  //           {opt}
  //         </label>
  //       ))}
  //     </div>
  //   </div>
  // );

  return (
    <aside className="w-full md:w-56 shrink-0">
      <MultiSelectDropdown
        label="Category"
        options={categories.map((c) => c.name)}
        selected={filters.categories}
        onToggle={(value) => toggleFilter("categories", value)}
      />
      {/* <FilterGroup title="Category" type="categories" options={categories.map((c) => c.name)} /> */}

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

      <button
        type="button"
        onClick={() => setFilters(defaultFilters)}
        className="w-full border border-[#3F010C] py-2 text-xs font-medium uppercase tracking-wide text-[#3F010C] transition-colors duration-300 hover:bg-[#3F010C] hover:text-white"
      >
        Clear Filters
      </button>
    </aside>
  );
}