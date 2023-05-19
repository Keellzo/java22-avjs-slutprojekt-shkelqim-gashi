import { useState } from "react";

// useCart.jsx
export function useCart(updateStock) {
  const [cartItems, setCartItems] = useState([]);

  // handleAddToCart checks product stock and adds the product to the cart.
  function handleAddToCart(product) {
    const productInCart = cartItems.find((item) => item.id === product.id);
    let newProduct = { ...product, stock: product.stock - 1 };

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
        updateStock(product.id, newProduct.stock);
      }
    } else if (product.stock > 0) {
      setCartItems([
        ...cartItems,
        {
          ...newProduct,
          quantity: 1,
        },
      ]);
      updateStock(product.id, newProduct.stock);
    }
  }

  // Updates the stock in the database once the purchase is completed
  async function handleCompletePurchase() {
    for (const item of cartItems) {
      const newStock = item.stock - item.quantity;
      await updateStock(item.id, newStock);
    }
    setCartItems([]);
  }

  return {
    cartItems,
    handleAddToCart,
    handleCompletePurchase,
  };
}
