// Get the list of products from the Firebase realtime database
export async function getProducts() {
  const response = await fetch(
    "https://products-f7734-default-rtdb.europe-west1.firebasedatabase.app/products/.json"
  );
  const data = await response.json();
  const productsArray = Object.keys(data).map((key) => ({
    id: key,
    ...data[key],
  }));

  return productsArray;
}

// Update the stock of a specific product in the Firebase realtime database
export async function updateProductStock(productId, newStock) {
  await fetch(
    `https://products-f7734-default-rtdb.europe-west1.firebasedatabase.app/products/${productId}/.json`,
    {
      method: "PATCH",
      body: JSON.stringify({ stock: newStock }),
    }
  );
}
