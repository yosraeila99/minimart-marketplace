import { useState } from "react";
import { stores } from "../data/stores";
import ProductCard from "../components/ProductCard";
import StoreCard from "../components/StoreCard";

function Home({ products, addToCart }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <span className="badge">Fast Delivery Marketplace</span>
          <h1>Order food, groceries, and daily needs from local stores.</h1>
          <p>
            MiniMart is a modern marketplace platform with stores, products,
            cart, checkout, user dashboard, admin dashboard, and delivery flow.
          </p>

          <div className="hero-actions">
            <a href="#products">
              <button>Start Shopping</button>
            </a>
            <a href="#stores">
              <button className="outline-btn">View Stores</button>
            </a>
          </div>
        </div>

        <div className="hero-card">
          <h3>Today’s Orders</h3>
          <p>128 active orders</p>
          <p>24 stores online</p>
          <p>4.8 customer rating</p>
        </div>
      </section>

      <section className="section" id="products">
        <div className="section-title">
          <h2>Popular Products</h2>
          <p>Search and filter best-selling items from nearby stores.</p>
        </div>

        <div className="product-controls">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="category-list">
            {categories.map((category) => (
              <button
                key={category}
                className={
                  selectedCategory === category
                    ? "category-btn active"
                    : "category-btn"
                }
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="no-results">No products found.</p>
        )}
      </section>

      <section className="section stores-section" id="stores">
        <div className="section-title">
          <h2>Featured Stores</h2>
          <p>Explore trusted stores and restaurants near you.</p>
        </div>

        <div className="stores-grid">
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;