import { useState } from "react";

export function useCart(updateStock) {
  const [cartItems, setCartItems] = useState([]);

  // handleAddToCart checks product stock, updates it, and adds the product to the cart.
  async function handleAddToCart(product) {
    const productInCart = cartItems.find((item) => item.id === product.id);

    // Check if product already exists in cart
    if (productInCart) {
      // Only add product to cart if quantity is less than stock
      if (productInCart.quantity < product.stock) {
        const newStock = Math.max(product.stock - 1, 0);
        await updateStock(product.id, newStock);

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
      const newStock = Math.max(product.stock - 1, 0);
      await updateStock(product.id, newStock);

      setCartItems([
        ...cartItems,
        {
          ...product,
          stock: newStock,
          originalStock: product.stock,
          quantity: 1,
        },
      ]);
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
