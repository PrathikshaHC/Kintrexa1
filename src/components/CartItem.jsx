import QuantitySelector from './QuantitySelector';

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const { product, quantity } = item;

  return (
    <div className="cart-item">
      <img src={product.images[0]} alt={product.name} />
      <div className="cart-item-info">
        <h3>{product.name}</h3>
        <p>{product.category}</p>
        <div className="cart-item-actions">
          <QuantitySelector value={quantity} onChange={(next) => onUpdateQuantity(product.id, next)} max={product.stock} />
          <button type="button" className="text-button" onClick={() => onRemove(product.id)}>
            Remove
          </button>
        </div>
      </div>
      <div className="cart-item-price">${(product.price * quantity).toFixed(2)}</div>
    </div>
  );
}
