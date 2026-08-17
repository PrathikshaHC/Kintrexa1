import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand-block">
          <h3>Velora</h3>
          <p>Curating everyday essentials and premium finds for modern living.</p>
        </div>

        <div>
          <h4>About</h4>
          <ul>
            <li><Link to="/products">Our story</Link></li>
            <li><Link to="/products">Journal</Link></li>
            <li><Link to="/products">Stores</Link></li>
          </ul>
        </div>

        <div>
          <h4>Customer Service</h4>
          <ul>
            <li><Link to="/products">Shipping & Returns</Link></li>
            <li><Link to="/products">Privacy Policy</Link></li>
            <li><Link to="/products">Terms</Link></li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <ul>
            <li>support@velora.com</li>
            <li>+1 (800) 555-0142</li>
            <li>123 Market Street</li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© 2026 Velora. All rights reserved.</p>
        <div className="social-links" aria-label="Social media links">
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
          <a href="https://x.com" target="_blank" rel="noreferrer">X</a>
        </div>
      </div>
    </footer>
  );
}
