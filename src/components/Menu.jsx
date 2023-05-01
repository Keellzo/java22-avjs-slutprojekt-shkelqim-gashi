import "../css/Menu.css";
import techLogo from "../images/techlogo.png";

// Menu component displays navigation buttons for showing products and shopping cart
export default function Menu({ onShowProducts, onShowCart, cartItems }) {
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav>
      <img src={techLogo} alt="TechShop Logo" className="logo" />
      <div className="nav-buttons">
        <button onClick={onShowProducts}>Products</button>
        <button onClick={onShowCart}>Shopping Cart ({totalQuantity})</button>
      </div>
    </nav>
  );
}
