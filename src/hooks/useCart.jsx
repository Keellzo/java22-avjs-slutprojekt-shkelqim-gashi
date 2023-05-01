import { useState } from "react";

// Custom hook that manages the state and logic for handling cart items, adding products to the cart, emptying the cart, and completing the purchase.

export function useCart() {
  const [cartItems, setCartItems] = useState([]);

  // Adds the given product to the cartItems state
  function addToCart(product) {
    const existingProductIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex > -1) {
      const newCartItems = [...cartItems];
      newCartItems[existingProductIndex].quantity += 1;
      setCartItems(newCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  }

  // Empties the cartItems state
  function emptyCart() {
    setCartItems([]);
  }

  // Empties the cartItems state after completing the purchase
  function completePurchase() {
    setCartItems([]);
  }

  return {
    cartItems,
    addToCart,
    emptyCart,
    completePurchase,
  };
}
