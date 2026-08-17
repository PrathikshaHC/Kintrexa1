import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import QuantitySelector from '../components/QuantitySelector';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const relatedProducts = useMemo(
    () => products.filter((item) => item.category === product?.category && item.id !== product?.id).slice(0, 4),
    [product],
  );

  if (!product) {
    return (
      <div className="container empty-state-wrap">
        <div className="empty-state">
          <h2>Product not found</h2>
          <Link to="/products" className="btn btn-primary">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);

  return (
    <div className="container product-page">
      <div className="product-gallery">
        <div className="gallery-thumbs">
          {product.images.map((image, index) => (
            <button
              key={image}
              type="button"
              className={`thumb-button ${selectedImage === index ? 'selected' : ''}`}
              onClick={() => setSelectedImage(index)}
            >
              <img src={image} alt={`${product.name} ${index + 1}`} />
            </button>
          ))}
        </div>
        <div className="gallery-main">
          <img src={product.images[selectedImage]} alt={product.name} />
        </div>
      </div>

      <div className="product-details-copy">
        <p className="product-category">{product.category}</p>
        <h1>{product.name}</h1>
        <div className="product-rating-line">
          <span>⭐ {product.rating}</span>
          <span>{product.reviews} reviews</span>
        </div>

        <div className="price-row detail-price-row">
          <span className="price">${product.price}</span>
          <span className="old-price">${product.originalPrice}</span>
          <span className="discount-pill">Save {product.discount}%</span>
        </div>

        <p className="stock-status">{product.stock > 0 ? `In stock • ${product.stock} available` : 'Out of stock'}</p>
        <p className="product-description">{product.description}</p>

        <div className="detail-actions">
          <QuantitySelector value={quantity} onChange={setQuantity} max={product.stock} />
          <button type="button" className="btn btn-primary" onClick={() => addToCart(product, quantity)}>
            Add to Cart
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => toggleWishlist(product.id)}>
            {wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </button>
        </div>

        <div className="purchase-actions">
          <button type="button" className="btn btn-primary" onClick={() => addToCart(product, quantity)}>
            Buy Now
          </button>
        </div>

        <div className="info-boxes">
          <div>
            <h4>Delivery</h4>
            <p>Free delivery on orders over $75. Express shipping in 2-4 days.</p>
          </div>
          <div>
            <h4>Return policy</h4>
            <p>30-day easy returns and exchanges on eligible items.</p>
          </div>
        </div>
      </div>

      <div className="specs-panel">
        <h3>Specifications</h3>
        <ul>
          {Object.entries(product.specifications).map(([key, value]) => (
            <li key={key}>
              <span>{key}</span>
              <strong>{value}</strong>
            </li>
          ))}
        </ul>
      </div>

      <div className="related-section">
        <div className="section-heading-row">
          <div>
            <span className="eyebrow">You may also like</span>
            <h2>Related products</h2>
          </div>
        </div>
        <div className="product-grid home-grid">
          {relatedProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
