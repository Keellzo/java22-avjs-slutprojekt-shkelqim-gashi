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

export async function updateProductStock(productId, newStock) {
  await fetch(
    `https://products-f7734-default-rtdb.europe-west1.firebasedatabase.app/products/${productId}/.json`,
    {
      method: "PATCH",
      body: JSON.stringify({ stock: newStock }),
    }
  );
}
