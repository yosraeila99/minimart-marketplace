import { Link, useParams } from "react-router-dom";
import { stores } from "../data/stores";
import ProductCard from "../components/ProductCard";

function StoreDetails({ products, addToCart }) {
  const { id } = useParams();

  const store = stores.find((item) => item.id === Number(id));

  if (!store) {
    return (
      <div className="store-details-page">
        <div className="empty-cart">
          <h3>Store not found</h3>
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    );
  }

  const storeProducts = products.filter((product) => {
    if (store.type === "Groceries") {
      return product.category === "Groceries" || product.category === "Desserts";
    }

    if (store.type === "Fast Food") {
      return product.category === "Fast Food" || product.category === "Pizza";
    }

    if (store.type === "Drinks & Coffee") {
      return product.category === "Drinks" || product.category === "Coffee";
    }

    return true;
  });

  return (
    <div className="store-details-page">
      <div className="store-hero">
        <img src={store.image} alt={store.name} />

        <div className="store-hero-content">
          <span>{store.type}</span>
          <h1>{store.name}</h1>

          <div className="store-info-row">
            <p>⭐ {store.rating}</p>
            <p>{store.deliveryTime}</p>
          </div>

          <Link to="/" className="success-btn">
            Back to Home
          </Link>
        </div>
      </div>

      <div className="section-title">
        <h2>Store Products</h2>
        <p>Browse available products from this store.</p>
      </div>

      {storeProducts.length === 0 ? (
        <div className="empty-cart">
          <h3>No products available in this store yet.</h3>
        </div>
      ) : (
        <div className="products-grid">
          {storeProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default StoreDetails;