import { useState } from "react";

// useCart.jsx
export function useCart(updateStock, restoreStock) {
  const [cartItems, setCartItems] = useState([]);

  // handleAddToCart checks product stock and adds the product to the cart.
  function handleAddToCart(product) {
    const productInCart = cartItems.find((item) => item.id === product.id);

    // Check if product already exists in cart
    if (productInCart) {
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
      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  }

  function handleEmptyCart() {
    restoreStock(cartItems);
    setCartItems([]);
  }

  // Updates the stock in the database once the purchase is completed
  async function handleCompletePurchase() {
    const updates = cartItems.map((item) => {
      const newStock = item.stock - item.quantity;
      return updateStock(item.id, newStock);
    });
  
    await Promise.all(updates);
    setCartItems([]);
  }
  

  function restoreStock(cartItems) {
    cartItems.forEach((item) => {
      updateStock(item.id, item.stock);
    });
  }

  // Include restoreStock in the return statement
  return {
    cartItems,
    handleAddToCart,
    handleCompletePurchase,
    handleEmptyCart,
    restoreStock,
  };
}
