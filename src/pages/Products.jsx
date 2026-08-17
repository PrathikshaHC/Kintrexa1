import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductFilters from '../components/ProductFilters';
import ProductGrid from '../components/ProductGrid';
import SearchBar from '../components/SearchBar';
import { categories, products } from '../data/products';
import { useSearch } from '../context/SearchContext';

const defaultFilters = {
  category: 'All',
  minPrice: 0,
  maxPrice: 9999,
  rating: 0,
  inStockOnly: false,
  discountOnly: false,
};

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Rating' },
  { value: 'newest', label: 'Newest' },
];

export default function Products() {
  const location = useLocation();
  const { searchTerm, setSearchTerm } = useSearch();
  const [filters, setFilters] = useState(defaultFilters);
  const [sortBy, setSortBy] = useState('featured');
  const [pageSize, setPageSize] = useState(8);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      setFilters((current) => ({ ...current, category: category.charAt(0).toUpperCase() + category.slice(1) }));
    }
  }, [location.search]);

  const categoryOptions = ['All', ...categories.map((category) => category.name)];

  const filteredProducts = useMemo(() => {
    const searchText = searchTerm.toLowerCase().trim();

    const matches = products.filter((product) => {
      const byCategory = filters.category === 'All' || product.category === filters.category;
      const byPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice;
      const byRating = product.rating >= filters.rating;
      const byStock = !filters.inStockOnly || product.stock > 0;
      const byDiscount = !filters.discountOnly || product.discount > 0;
      const bySearch =
        !searchText ||
        product.name.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText) ||
        product.description.toLowerCase().includes(searchText);

      return byCategory && byPrice && byRating && byStock && byDiscount && bySearch;
    });

    switch (sortBy) {
      case 'price-asc':
        return [...matches].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...matches].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...matches].sort((a, b) => b.rating - a.rating);
      case 'newest':
        return [...matches].sort((a, b) => b.id - a.id);
      default:
        return [...matches].sort((a, b) => Number(b.featured) - Number(a.featured));
    }
  }, [filters, searchTerm, sortBy]);

  const visibleProducts = filteredProducts.slice(0, pageSize);

  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
    setSearchTerm('');
  };

  const handleLoadMore = () => {
    setPageSize((current) => current + 4);
  };

  return (
    <div className="container shop-layout">
      <div className="shop-filters-mobile">
        <button type="button" className="btn btn-secondary">Filters</button>
      </div>

      <ProductFilters filters={filters} onChange={updateFilter} onClear={clearFilters} categoryOptions={categoryOptions} />

      <main className="shop-content">
        <div className="toolbar">
          <div className="toolbar-search">
            <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search by product, category, or description" />
          </div>

          <div className="toolbar-controls">
            <label>
              <span>Sort by</span>
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="results-header">
          <p>
            Showing <strong>{visibleProducts.length}</strong> of <strong>{filteredProducts.length}</strong> products
          </p>
        </div>

        <ProductGrid products={visibleProducts} />

        {visibleProducts.length < filteredProducts.length && (
          <div className="load-more-wrap">
            <button type="button" className="btn btn-primary" onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
