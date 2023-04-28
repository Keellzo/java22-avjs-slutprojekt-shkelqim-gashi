import "../css/App.css";
import { createRoot } from "react-dom/client";
import Menu from "./Menu";
import Products from "./products/Products";
import ShoppingCart from "./ShoppingCart";
import ProductFilter from "./products/Filter";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../hooks/useCart";
import { useState } from "react";

// App component which serves as the main container for the application
function App() {
  const [view, setView] = useState("products");
  const { products, setSortOption, setFilterText, updateStock, restoreStock } =
    useProducts();
  const { cartItems, addToCart, emptyCart, completePurchase } = useCart();

  // Handles adding a product to the cart and updates the product stock
  async function handleAddToCart(product) {
    if (product.stock > 0) {
      const newStock = Math.max(product.stock - 1, 0);
      await updateStock(product.id, newStock);
      addToCart({ ...product, stock: newStock, originalStock: product.stock });
    }
  }

  return (
    <div>
      {
        // Renders the Menu component with buttons to show products or shopping cart
      }
      <Menu
        onShowProducts={() => setView("products")}
        onShowCart={() => setView("cart")}
        cartItems={cartItems}
      />
      {
        // Renders the Products view with filters and product listing
      }
      {view === "products" && (
        <>
          <div className="filters filter-container">
            <ProductFilter
              sortOptions={[
                { label: "", value: "" },
                { label: "Name", value: "name" },
                { label: "Price (Low to High)", value: "priceLowToHigh" },
                { label: "Price (High to Low)", value: "priceHighToLow" },
              ]}
              onSortChange={setSortOption}
              onFilterChange={setFilterText}
            />
          </div>
          <Products products={products} onAddToCart={handleAddToCart} />
        </>
      )}
      {
        // Renders the ShoppingCart view with cart items and related actions
      }
      {view === "cart" && (
        <ShoppingCart
          cartItems={cartItems}
          onEmptyCart={emptyCart}
          onCompletePurchase={completePurchase}
          onBackToProducts={() => setView("products")}
          onRestoreStock={restoreStock}
        />
      )}
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
