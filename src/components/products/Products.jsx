import "../../css/Products.css";

// Products component responsible for rendering a list of products,
// displaying their details, and handling the "Add to Cart" button functionality
export default function Products({ onAddToCart, products }) {
  return (
    <div className="grid-container">
      <section>
        {products.map((product) => (
          <article key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price: {product.price}:-</p>
            <p>Stock: {product.stock}</p>
            {product.stock > 0 ? (
              <button
                className="product-button"
                onClick={() => onAddToCart(product)}
              >
                Add to Cart
              </button>
            ) : (
              <p className="fat-paragraph">Out of stock</p>
            )}
          </article>
        ))}
      </section>
    </div>
  );
}
