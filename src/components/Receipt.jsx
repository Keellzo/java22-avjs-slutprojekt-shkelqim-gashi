import "../css/Receipt.css";

// Receipt component responsible for displaying a purchase receipt with the cart items,
// total cost, and purchase date and time
export default function Receipt({ cartItems, onClose }) {
  const totalCost = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Get the current date and time
  const currentDate = new Date();
  const date = currentDate.toISOString().split("T")[0];
  const time = currentDate.toTimeString().split(" ")[0];

  return (
    <div className="receipt">
      <h2>TechShop</h2>
      <p>
        {date} {time}
      </p>
      <table>
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Item</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.quantity}</td>
              <td>{item.name}</td>
              <td>{item.price * item.quantity}:-</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Total: {totalCost}:-</h3>
      <p>Thank you!</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
