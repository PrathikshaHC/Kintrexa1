import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  return (
    <article className="product-card" aria-label={product.name}>
      <div className="product-image-wrap">
        <img src={product.images[0]} alt={product.name} />
        {product.discount > 0 && <span className="discount-badge">-{product.discount}%</span>}
        <button
          type="button"
          className={`wishlist-btn ${wishlisted ? 'is-active' : ''}`}
          onClick={() => toggleWishlist(product.id)}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {wishlisted ? '♥' : '♡'}
        </button>
      </div>

      <div className="product-card-body">
        <p className="product-category">{product.category}</p>
        <h3>{product.name}</h3>
        <div className="product-meta">
          <span className="stars">★★★★★</span>
          <span>{product.rating} ({product.reviews})</span>
        </div>
        <div className="price-row">
          <span className="price">${product.price}</span>
          <span className="old-price">${product.originalPrice}</span>
        </div>

        <div className="card-actions">
          <button type="button" className="btn btn-primary" onClick={() => addToCart(product, 1)}>
            Add to Cart
          </button>
          <Link to={`/product/${product.id}`} className="btn btn-secondary">
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
