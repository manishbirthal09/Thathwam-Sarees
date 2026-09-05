


import { useState, useMemo, useEffect } from "react";
import api from "../api/axios";
import { useDebounce } from "../hooks/useDebounce";
import FilterSidebar from "../ui/FilterSidebar";
import ProductCard from "../ui/ProductCard";
import { Search } from "lucide-react";
import ProductCardSkeleton from "../ui/ProductCardSkeleton";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);


  
  const [filters, setFilters] = useState({
    categories: [],
    colors: [],
    maxPrice: 0,
  });
const DEFAULT_FILTERS = {
  categories: [],
  colors: [],
  maxPrice: 0,
};
  useEffect(() => {
    api.get("/products", { params: { limit: 100 } }).then(({ data }) => {
      setProducts(data.products);
      setLoading(false);
    });
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesCategory = filters.categories.length === 0 || filters.categories.includes(p.category?.name);
      
      const matchesColor = filters.colors.length === 0 || filters.colors.some((c) => p.colors?.includes(c));
      const matchesPrice = filters.maxPrice === 0 || p.discountPrice <= filters.maxPrice;
      return matchesSearch && matchesCategory && matchesColor && matchesPrice;
    });
  }, [debouncedSearch, filters, products]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex justify-between ">
        <h1 className="text-3xl mb-6 text-brand-text">Our Collections</h1>

      </div>
      <p className="text-sm text-gray-500 mb-6">
      {loading
        ? "Loading..."
        : `${filteredProducts.length} ${filteredProducts.length === 1 ? "product" : "products"} found`}
    </p>
      <div className="flex flex-col md:flex-row gap-8">
        <FilterSidebar filters={filters} setFilters={setFilters} defaultFilters={DEFAULT_FILTERS} />

        <div className="flex-1">
          {loading ? (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
    {Array.from({ length: 6 }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
) : filteredProducts.length === 0 ? (
            <p className="text-gray-500 text-sm">No sarees match your filters.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}