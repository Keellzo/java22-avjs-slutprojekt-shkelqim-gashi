import "../css/ShoppingCart.css";

// ShoppingCart component displays the cart items, total cost, and action buttons
export default function ShoppingCart({
  cartItems,
  onEmptyCart,
  onCompletePurchase,
  onBackToProducts,
  onRestoreStock,
}) {
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Completes the purchase by updating product stocks and triggering onCompletePurchase
  function completePurchase() {
    onCompletePurchase();
  }

  // Renders the ShoppingCart component, displaying cart items, total cost, and action buttons
  return (
    <section className="cart-container">
      <div className="cart-header">
        <h2 className="cart-title">Shopping Cart</h2>
        <div className="cart-buttons">
          <button className="cart-button" onClick={completePurchase}>
            Complete Purchase
          </button>
          <button
            className="cart-button"
            onClick={async () => {
              await onRestoreStock(cartItems);
              onEmptyCart();
              onBackToProducts();
            }}
          >
            Empty Cart
          </button>
        </div>
      </div>
      <div className="cart-items-container">
        {cartItems.map((item) => (
          <article key={item.id} className="cart-item">
            <div className="cart-item-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="cart-item-details">
              <h3 className="cart-item-name">{item.name}</h3>
              <p className="cart-item-price">Price: {item.price} :-</p>
              <p className="cart-item-quantity">Quantity: {item.quantity}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="cart-summary">
        <h3 className="cart-total">Total: {total.toFixed()} :-</h3>
      </div>
    </section>
  );
}
