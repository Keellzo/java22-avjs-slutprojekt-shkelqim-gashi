import { useState } from "react";

// useCart.jsx
export function useCart(updateStock) {
  const [cartItems, setCartItems] = useState([]);

  // handleAddToCart checks product stock and adds the product to the cart.
  function handleAddToCart(product) {
    const productInCart = cartItems.find((item) => item.id === product.id);

    // Check if product already exists in cart
    if (productInCart) {
      // Only add product to cart if quantity is less than stock
      if (productInCart.quantity < product.stock) {
        setCartItems((prevCartItems) =>
          prevCartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      }
    } else if (product.stock > 0) {
      // Only add product to cart if stock is greater than 0
      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  }

  // Updates the stock in the database once the purchase is completed
  async function handleCompletePurchase() {
    for (const item of cartItems) {
      const newStock = Math.max(item.stock - item.quantity, 0);
      await updateStock(item.id, newStock);
    }
  }

  // Empties the cartItems state
  function emptyCart() {
    setCartItems([]);
  }

  return {
    cartItems,
    emptyCart,
    handleAddToCart,
    handleCompletePurchase,
  };
}
