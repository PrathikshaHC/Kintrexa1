import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function WishlistItem({ item, onRemove }) {
  const { addToCart } = useCart();

  return (
    <div className="wishlist-item">
      <img src={item.images[0]} alt={item.name} />
      <div className="wishlist-item-info">
        <h3>{item.name}</h3>
        <p>{item.category}</p>
        <div className="price-row">
          <span className="price">${item.price}</span>
          <span className="old-price">${item.originalPrice}</span>
        </div>
        <div className="wishlist-item-meta">
          <span>⭐ {item.rating}</span>
          <span>{item.stock > 0 ? 'In stock' : 'Out of stock'}</span>
        </div>
      </div>
      <div className="wishlist-item-actions">
        <button type="button" className="btn btn-primary" onClick={() => addToCart(item, 1)}>
          Add to Cart
        </button>
        <Link to={`/product/${item.id}`} className="btn btn-secondary">
          View Details
        </Link>
        <button type="button" className="text-button" onClick={() => onRemove(item.id)}>
          Remove
        </button>
      </div>
    </div>
  );
}
