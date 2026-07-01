import { useParams, Link } from "react-router-dom";


function ProductDetails({ products, addToCart }) {
  const { id } = useParams();

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <div className="details-page">
        <h2>Product not found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="details-page">
      <div className="details-card">
        <img src={product.image} alt={product.name} />

        <div className="details-info">
          <span>{product.category}</span>
          <h1>{product.name}</h1>
          <p className="details-price">${product.price}</p>

          <p className="details-description">
            This product is available from trusted local stores with fast
            delivery and high-quality service.
          </p>

          <div className="details-actions">
            <button onClick={() => addToCart(product)}>Add to Cart</button>
            <Link to="/" className="back-link">
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;