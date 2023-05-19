import "../css/App.css";
import { createRoot } from "react-dom/client";
import Menu from "./Menu";
import Products from "./products/Products";
import ShoppingCart from "./ShoppingCart";
import ProductFilter from "./products/Filter";
import Receipt from "./Receipt";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../hooks/useCart";
import { useState } from "react";

function App() {
  const [view, setView] = useState("products");
  const { products, setSortOption, setFilterText, updateStock } = useProducts();
  const {
    cartItems,
    handleAddToCart,
    handleCompletePurchase,
    handleEmptyCart,
    restoreStock,
  } = useCart(updateStock);

  const [showReceipt, setShowReceipt] = useState(false);
  const [purchasedItems, setPurchasedItems] = useState([]);

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
        <div className="main-container">
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
          <Products
            products={products}
            onAddToCart={handleAddToCart}
            cartItems={cartItems}
          />
        </div>
      )}

      {view === "cart" && (
        <ShoppingCart
          cartItems={cartItems}
          onEmptyCart={() => {
            handleEmptyCart();
            setView("products");
          }}
          onCompletePurchase={() => {
            setPurchasedItems(cartItems);
            handleCompletePurchase().then(() => {
              setShowReceipt(true);
              setView("products");
            });
          }}
          onBackToProducts={() => setView("products")}
          onRestoreStock={restoreStock}
        />
      )}

      {showReceipt && (
        <Receipt
          cartItems={purchasedItems}
          onClose={() => {
            setShowReceipt(false);
            setView("products");
          }}
        />
      )}
    </div>
  );
}
const root = createRoot(document.getElementById("root"));
root.render(<App />);
