import { useState, useEffect } from "react";
import { getProducts, updateProductStock } from "../services/Firebase";

// Custom hook that manages the state and logic for fetching, filtering, and sorting products, as well as updating and restoring stock
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [filterText, setFilterText] = useState("");

  // Fetches and updates the products state when the component mounts or filterText/sortOption change
  useEffect(() => {
    async function fetchProducts() {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    }

    fetchProducts();
  }, [filterText, sortOption]);

  // Sorts the given products array based on the selected sortOption
  function applySort(products) {
    const sortFunc = {
      name: (a, b) => a.name.localeCompare(b.name),
      priceLowToHigh: (a, b) => a.price - b.price,
      priceHighToLow: (a, b) => b.price - a.price,
    };

    return sortOption ? products.sort(sortFunc[sortOption]) : products;
  }

  // Filters the given products array based on the entered filterText
  function applyFilter(products) {
    if (filterText.trim() === "") {
      return products;
    }

    return products.filter((product) =>
      product.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  const filteredAndSortedProducts = applyFilter(applySort(products));

  // Updates the stock of the product with the given productId in Firebase and updates the products state
  async function updateStock(productId, newStock) {
    await updateProductStock(productId, newStock);
    setProducts(
      products.map((p) => (p.id === productId ? { ...p, stock: newStock } : p))
    );
  }

  return {
    products: filteredAndSortedProducts,
    sortOption,
    setSortOption,
    filterText,
    setFilterText,
    updateStock,
    restoreStock,
  };
}
