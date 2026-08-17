const ratingOptions = [4, 4.5, 4.7, 4.8];

export default function ProductFilters({ filters, onChange, onClear, categoryOptions }) {
  return (
    <aside className="filters-panel">
      <div className="filter-header">
        <h3>Filters</h3>
        <button type="button" className="text-button" onClick={onClear}>Clear all</button>
      </div>

      <div className="filter-group">
        <h4>Categories</h4>
        <div className="filter-list">
          {categoryOptions.map((category) => (
            <label key={category} className="filter-option">
              <input
                type="radio"
                name="category"
                checked={filters.category === category}
                onChange={() => onChange('category', category)}
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4>Price range</h4>
        <div className="range-inputs">
          <input
            type="number"
            value={filters.minPrice}
            min="0"
            onChange={(event) => onChange('minPrice', Number(event.target.value) || 0)}
            placeholder="Min"
          />
          <input
            type="number"
            value={filters.maxPrice}
            min="0"
            onChange={(event) => onChange('maxPrice', Number(event.target.value) || 9999)}
            placeholder="Max"
          />
        </div>
      </div>

      <div className="filter-group">
        <h4>Rating</h4>
        <div className="filter-list">
          {ratingOptions.map((rating) => (
            <label key={rating} className="filter-option">
              <input
                type="radio"
                name="rating"
                checked={Number(filters.rating) === Number(rating)}
                onChange={() => onChange('rating', rating)}
              />
              <span>{rating} & up</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4>Availability</h4>
        <label className="filter-option">
          <input type="checkbox" checked={filters.inStockOnly} onChange={(event) => onChange('inStockOnly', event.target.checked)} />
          <span>In stock only</span>
        </label>
      </div>

      <div className="filter-group">
        <h4>Discount</h4>
        <label className="filter-option">
          <input type="checkbox" checked={filters.discountOnly} onChange={(event) => onChange('discountOnly', event.target.checked)} />
          <span>On sale</span>
        </label>
      </div>
    </aside>
  );
}
