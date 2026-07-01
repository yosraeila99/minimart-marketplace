import { Link } from "react-router-dom";

function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />

      <div className="product-info">
        <span>{product.category}</span>
        <h3>{product.name}</h3>
        <p>${product.price}</p>

        <div className="product-actions">
          <Link to={`/product/${product.id}`}>
            <button>View Details</button>
          </Link>

          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;