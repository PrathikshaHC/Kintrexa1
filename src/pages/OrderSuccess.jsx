import { Link, useLocation } from 'react-router-dom';

export default function OrderSuccess() {
  const location = useLocation();
  const orderId = location.state?.orderId || 'KTX-000000';
  const total = location.state?.total || 0;
  const shippingAddress = location.state?.shippingAddress || 'N/A';

  return (
    <div className="container empty-state-wrap">
      <div className="success-card empty-state">
        <div className="success-icon">✓</div>
        <h2>Order Placed Successfully!</h2>
        <p>Your order ID is <strong>{orderId}</strong></p>
        <div className="success-summary">
          <div><span>Total amount</span><strong>${total.toFixed(2)}</strong></div>
          <div><span>Shipping address</span><strong>{shippingAddress}</strong></div>
          <div><span>Estimated delivery</span><strong>3-5 business days</strong></div>
        </div>
        <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
      </div>
    </div>
  );
}
