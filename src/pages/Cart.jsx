import { Link, useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();

  if (!cartItems.length) {
    return (
      <div className="container empty-state-wrap">
        <div className="empty-state">
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything yet.</p>
          <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const discount = subtotal * 0.08;
  const shipping = subtotal > 75 ? 0 : 12;
  const tax = subtotal * 0.1;
  const total = subtotal - discount + shipping + tax;

  return (
    <div className="container page-shell">
      <div className="section-heading-row">
        <div>
          <span className="eyebrow">Your bag</span>
          <h2>Shopping cart</h2>
        </div>
        <button type="button" className="text-button" onClick={clearCart}>Clear cart</button>
      </div>

      <div className="cart-layout">
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <CartItem key={item.productId} item={item} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} />
          ))}
        </div>

        <CartSummary
          subtotal={subtotal}
          shipping={shipping}
          tax={tax}
          discount={discount}
          total={total}
          onCheckout={() => navigate('/checkout')}
        />
      </div>
    </div>
  );
}
