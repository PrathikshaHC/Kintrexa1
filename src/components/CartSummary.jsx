export default function CartSummary({ subtotal, shipping, tax, discount, total, onCheckout }) {
  return (
    <aside className="cart-summary">
      <h3>Order Summary</h3>
      <div className="summary-row"><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
      <div className="summary-row"><span>Discount</span><strong>-${discount.toFixed(2)}</strong></div>
      <div className="summary-row"><span>Shipping</span><strong>${shipping.toFixed(2)}</strong></div>
      <div className="summary-row"><span>Tax</span><strong>${tax.toFixed(2)}</strong></div>
      <div className="summary-total"><span>Total</span><strong>${total.toFixed(2)}</strong></div>
      <button type="button" className="btn btn-primary full-width" onClick={onCheckout}>
        Proceed to Checkout
      </button>
    </aside>
  );
}
