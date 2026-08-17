import { Link } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import { categories, featuredProducts } from '../data/products';

const watchImage =
  'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1200&q=80';

export default function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="container hero-content">
          <div className="hero-copy">
            <span className="eyebrow">Fresh arrivals</span>
            <h1>Discover products you’ll love.</h1>
            <p>Shop the latest essentials at great prices with premium quality and effortless style.</p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary">Shop Now</Link>
              <Link to="/products" className="btn btn-secondary">Explore Deals</Link>
            </div>
            <div className="hero-stats">
              <div><strong>120k+</strong><span>happy shoppers</span></div>
              <div><strong>4.9/5</strong><span>average rating</span></div>
              <div><strong>2-day</strong><span>shipping</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-3d-container">
              <div className="floating-card card-back"></div>
              <div className="floating-card card-middle"></div>
              <div className="hero-image-card main-card">
                <img src={watchImage} alt="NovaSmart Watch X" />
              </div>
            </div>

            <div className="mini-badge badge-top">New drop</div>
            <div className="mini-badge badge-bottom">
              <span>Up to 40% off</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrap">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <span className="eyebrow">Shop by category</span>
              <h2>Popular categories</h2>
            </div>
          </div>
          <div className="category-grid">
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap accent-bg">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <span className="eyebrow">Featured collection</span>
              <h2>Trending products</h2>
            </div>
            <Link to="/products" className="text-link">View all</Link>
          </div>
          <div className="product-grid home-grid">
            {featuredProducts.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="promo-banner-wrapper section-wrap">
        <div className="container promo-banner">
          <div>
            <span className="eyebrow">Members-only offer</span>
            <h2>Save big on premium essentials.</h2>
            <p>Upgrade your everyday setup with curated favorites and exclusive deals for a limited time.</p>
          </div>
          <Link to="/products" className="btn btn-primary">Claim Offer</Link>
        </div>
      </section>
    </>
  );
}
