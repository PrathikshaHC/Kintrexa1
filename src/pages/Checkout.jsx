import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  country: '',
  paymentMethod: 'card',
  cardNumber: '',
  cardName: '',
  expiry: '',
  cvv: '',
};

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, clearCart, getCartTotal } = useCart();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const subtotal = getCartTotal();
  const shipping = subtotal > 75 ? 0 : 12;
  const tax = subtotal * 0.1;
  const discount = subtotal * 0.08;
  const total = subtotal - discount + shipping + tax;

  const orderSummary = useMemo(
    () =>
      cartItems.map((item) => ({
        ...item,
        lineTotal: item.product.price * item.quantity,
      })),
    [cartItems],
  );

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.fullName.trim()) nextErrors.fullName = 'Full name is required';
    if (!form.email.trim()) nextErrors.email = 'Email is required';
    if (!form.phone.trim()) nextErrors.phone = 'Phone is required';
    if (!form.address.trim()) nextErrors.address = 'Address is required';
    if (!form.city.trim()) nextErrors.city = 'City is required';
    if (!form.state.trim()) nextErrors.state = 'State is required';
    if (!form.zip.trim()) nextErrors.zip = 'ZIP/Pincode is required';
    if (!form.country.trim()) nextErrors.country = 'Country is required';

    if (form.paymentMethod === 'card') {
      if (!form.cardNumber.trim()) nextErrors.cardNumber = 'Card number is required';
      if (!form.cardName.trim()) nextErrors.cardName = 'Card holder name is required';
      if (!form.expiry.trim()) nextErrors.expiry = 'Expiry date is required';
      if (!form.cvv.trim()) nextErrors.cvv = 'CVV is required';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    const orderId = `KTX-${Date.now().toString().slice(-8)}`;
    localStorage.setItem('kinetrexa-last-order', JSON.stringify({ orderId, total, form }));
    clearCart();
    navigate('/order-success', { state: { orderId, total, shippingAddress: `${form.address}, ${form.city}, ${form.state}, ${form.country}` } });
  };

  if (!cartItems.length) {
    return (
      <div className="container empty-state-wrap">
        <div className="empty-state">
          <h2>Your cart is empty</h2>
          <p>Add products before continuing to checkout.</p>
          <button type="button" className="btn btn-primary" onClick={() => navigate('/products')}>Continue Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container checkout-layout page-shell">
      <form className="checkout-form" onSubmit={handleSubmit} noValidate>
        <div className="checkout-section">
          <h3>Customer Information</h3>
          <div className="field-row two-column">
            <label>
              <span>Full Name</span>
              <input value={form.fullName} onChange={(event) => updateField('fullName', event.target.value)} />
              {errors.fullName && <small>{errors.fullName}</small>}
            </label>
            <label>
              <span>Email</span>
              <input type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} />
              {errors.email && <small>{errors.email}</small>}
            </label>
          </div>
          <label>
            <span>Phone</span>
            <input value={form.phone} onChange={(event) => updateField('phone', event.target.value)} />
            {errors.phone && <small>{errors.phone}</small>}
          </label>
        </div>

        <div className="checkout-section">
          <h3>Shipping Address</h3>
          <label>
            <span>Address</span>
            <input value={form.address} onChange={(event) => updateField('address', event.target.value)} />
            {errors.address && <small>{errors.address}</small>}
          </label>
          <div className="field-row two-column">
            <label>
              <span>City</span>
              <input value={form.city} onChange={(event) => updateField('city', event.target.value)} />
              {errors.city && <small>{errors.city}</small>}
            </label>
            <label>
              <span>State</span>
              <input value={form.state} onChange={(event) => updateField('state', event.target.value)} />
              {errors.state && <small>{errors.state}</small>}
            </label>
          </div>
          <div className="field-row two-column">
            <label>
              <span>ZIP / Pincode</span>
              <input value={form.zip} onChange={(event) => updateField('zip', event.target.value)} />
              {errors.zip && <small>{errors.zip}</small>}
            </label>
            <label>
              <span>Country</span>
              <input value={form.country} onChange={(event) => updateField('country', event.target.value)} />
              {errors.country && <small>{errors.country}</small>}
            </label>
          </div>
        </div>

        <div className="checkout-section">
          <h3>Payment Method</h3>
          <div className="payment-method-options">
            {['card', 'upi', 'cod'].map((method) => (
              <label key={method} className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={form.paymentMethod === method}
                  onChange={() => updateField('paymentMethod', method)}
                />
                <span>{method === 'card' ? 'Credit/Debit Card' : method === 'upi' ? 'UPI' : 'Cash on Delivery'}</span>
              </label>
            ))}
          </div>

          {form.paymentMethod === 'card' && (
            <>
              <label>
                <span>Card Number</span>
                <input value={form.cardNumber} onChange={(event) => updateField('cardNumber', event.target.value)} />
                {errors.cardNumber && <small>{errors.cardNumber}</small>}
              </label>
              <div className="field-row two-column">
                <label>
                  <span>Card Holder Name</span>
                  <input value={form.cardName} onChange={(event) => updateField('cardName', event.target.value)} />
                  {errors.cardName && <small>{errors.cardName}</small>}
                </label>
                <label>
                  <span>Expiry Date</span>
                  <input value={form.expiry} onChange={(event) => updateField('expiry', event.target.value)} placeholder="MM/YY" />
                  {errors.expiry && <small>{errors.expiry}</small>}
                </label>
              </div>
              <label>
                <span>CVV</span>
                <input value={form.cvv} onChange={(event) => updateField('cvv', event.target.value)} />
                {errors.cvv && <small>{errors.cvv}</small>}
              </label>
            </>
          )}
        </div>
      </form>

      <aside className="checkout-summary">
        <h3>Order Summary</h3>
        <div className="summary-products">
          {orderSummary.map((item) => (
            <div key={item.productId} className="summary-product-row">
              <span>{item.product.name}</span>
              <span>Qty {item.quantity}</span>
              <strong>${item.lineTotal.toFixed(2)}</strong>
            </div>
          ))}
        </div>
        <div className="summary-row"><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
        <div className="summary-row"><span>Shipping</span><strong>${shipping.toFixed(2)}</strong></div>
        <div className="summary-row"><span>Tax</span><strong>${tax.toFixed(2)}</strong></div>
        <div className="summary-row"><span>Discount</span><strong>-${discount.toFixed(2)}</strong></div>
        <div className="summary-total"><span>Total</span><strong>${total.toFixed(2)}</strong></div>
        <button type="submit" className="btn btn-primary full-width" onClick={handleSubmit}>Place Order</button>
      </aside>
    </div>
  );
}
