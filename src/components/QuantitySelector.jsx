export default function QuantitySelector({ value, onChange, min = 1, max = 99 }) {
  return (
    <div className="quantity-selector" aria-label="Quantity selector">
      <button type="button" onClick={() => onChange(Math.max(min, value - 1))} aria-label="Decrease quantity">
        −
      </button>
      <span>{value}</span>
      <button type="button" onClick={() => onChange(Math.min(max, value + 1))} aria-label="Increase quantity">
        +
      </button>
    </div>
  );
}
