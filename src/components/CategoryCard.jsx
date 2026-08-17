import { Link } from 'react-router-dom';

export default function CategoryCard({ category, onClick }) {
  return (
    <Link to={`/products?category=${encodeURIComponent(category.slug)}`} onClick={onClick} className="category-card">
      <img src={category.image} alt={category.name} />
      <div className="category-card-content">
        <span className="category-icon">{category.icon}</span>
        <h3>{category.name}</h3>
      </div>
    </Link>
  );
}
