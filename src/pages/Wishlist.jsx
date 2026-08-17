import { Link } from 'react-router-dom';
import WishlistItem from '../components/WishlistItem';
import { products } from '../data/products';
import { useWishlist } from '../context/WishlistContext';

export default function Wishlist() {
  const { items, removeFromWishlist } = useWishlist();
  const wishlistProducts = products.filter((product) => items.includes(product.id));

  if (!wishlistProducts.length) {
    return (
      <div className="container empty-state-wrap">
        <div className="empty-state">
          <h2>Your wishlist is empty</h2>
          <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container page-shell">
      <div className="section-heading-row">
        <div>
          <span className="eyebrow">Saved items</span>
          <h2>Your wishlist</h2>
        </div>
      </div>
      <div className="wishlist-list">
        {wishlistProducts.map((product) => (
          <WishlistItem key={product.id} item={product} onRemove={removeFromWishlist} />
        ))}
      </div>
    </div>
  );
}
