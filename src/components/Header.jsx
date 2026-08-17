import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import { useWishlist } from '../context/WishlistContext';
import SearchBar from './SearchBar';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/products' },
  { label: 'Categories', to: '/products' },
];

export default function Header() {
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { searchTerm, setSearchTerm } = useSearch();

  const cartCount = getCartCount();
  const wishlistCount = wishlistItems.length;

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="Home">
          <span className="brand-mark">V</span>
          <span>Velora</span>
        </Link>

        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink key={item.label} to={item.to} className="nav-link">
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <div className="desktop-search">
            <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search products" />
          </div>

          <button type="button" className="header-icon-btn" onClick={() => navigate('/wishlist')} aria-label="Wishlist">
            ❤️
            {wishlistCount > 0 && <span className="count-badge">{wishlistCount}</span>}
          </button>

          <button type="button" className="header-icon-btn" onClick={() => navigate('/cart')} aria-label="Cart">
            🛒
            {cartCount > 0 && <span className="count-badge">{cartCount}</span>}
          </button>

          <button type="button" className="account-btn" onClick={() => navigate('/products')}>
            Account
          </button>
        </div>
      </div>
    </header>
  );
}
