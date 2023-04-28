import "../css/Menu.css";

// Menu component displays navigation buttons for showing products and shopping cart
export default function Menu({ onShowProducts, onShowCart, cartItems }) {
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav>
      <button onClick={onShowProducts}>Products</button>
      <button onClick={onShowCart}>Shopping Cart ({totalQuantity})</button>
    </nav>
  );
}
