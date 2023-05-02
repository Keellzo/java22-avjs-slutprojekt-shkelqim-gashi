import { useState } from "react";

export function useCart(updateStock) {
  const [cartItems, setCartItems] = useState([]);

  // handleAddToCart checks product stock, updates it, and adds the product to the cart.
  async function handleAddToCart(product) {
    if (product.stock > 0) {
      const newStock = Math.max(product.stock - 1, 0);
      await updateStock(product.id, newStock);

      setCartItems((prevCartItems) => {
        const productInCart = prevCartItems.find(
          (item) => item.id === product.id
        );

        if (productInCart) {
          return prevCartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [
            ...prevCartItems,
            { ...product, stock: newStock, originalStock: product.stock, quantity: 1 },
          ];
        }
      });
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
  };
}
