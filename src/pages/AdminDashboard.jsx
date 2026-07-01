import { useState } from "react";
import { Link } from "react-router-dom";

function AdminDashboard({
  products,
  orders,
  addProduct,
  deleteProduct,
  updateProduct,
  updateOrderStatus,
}) {
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
  });

  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const todayRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  function handleInputChange(e) {
    const { name, value } = e.target;

    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  }

  function handleAddProduct(e) {
    e.preventDefault();

    if (
      newProduct.name === "" ||
      newProduct.category === "" ||
      newProduct.price === "" ||
      newProduct.image === ""
    ) {
      alert("Please fill in all product fields.");
      return;
    }

    const productToAdd = {
      id: Date.now(),
      name: newProduct.name,
      category: newProduct.category,
      price: Number(newProduct.price),
      image: newProduct.image,
    };

    addProduct(productToAdd);

    setNewProduct({
      name: "",
      category: "",
      price: "",
      image: "",
    });
  }

  function startEditing(product) {
    setEditingProduct({ ...product });
  }

  function handleEditChange(e) {
    const { name, value } = e.target;

    setEditingProduct({
      ...editingProduct,
      [name]: value,
    });
  }

  function saveEdit(e) {
    e.preventDefault();

    if (
      editingProduct.name === "" ||
      editingProduct.category === "" ||
      editingProduct.price === "" ||
      editingProduct.image === ""
    ) {
      alert("Please fill in all edit fields.");
      return;
    }

    updateProduct({
      ...editingProduct,
      price: Number(editingProduct.price),
    });

    setEditingProduct(null);
  }

  function cancelEdit() {
    setEditingProduct(null);
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-page">
      <div className="section-title">
        <h2>Admin Dashboard</h2>
        <p>Manage products, orders, customers, and platform activity.</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>{products.length}</h3>
          <p>Total Products</p>
        </div>

        <div className="stat-card">
          <h3>{orders.length}</h3>
          <p>Total Orders</p>
        </div>

        <div className="stat-card">
          <h3>${todayRevenue}</h3>
          <p>Total Revenue</p>
        </div>
      </div>

      <div className="admin-add-box">
        <h3>Add New Product</h3>

        <form className="admin-form" onSubmit={handleAddProduct}>
          <input
            type="text"
            name="name"
            placeholder="Product name"
            value={newProduct.name}
            onChange={handleInputChange}
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newProduct.category}
            onChange={handleInputChange}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleInputChange}
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={handleInputChange}
          />

          <button type="submit">Add Product</button>
        </form>
      </div>

      {editingProduct && (
        <div className="admin-add-box edit-box">
          <h3>Edit Product</h3>

          <form className="admin-form" onSubmit={saveEdit}>
            <input
              type="text"
              name="name"
              placeholder="Product name"
              value={editingProduct.name}
              onChange={handleEditChange}
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={editingProduct.category}
              onChange={handleEditChange}
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={editingProduct.price}
              onChange={handleEditChange}
            />

            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={editingProduct.image}
              onChange={handleEditChange}
            />

            <button type="submit">Save</button>

            <button type="button" className="cancel-btn" onClick={cancelEdit}>
              Cancel
            </button>
          </form>
        </div>
      )}

      <div className="admin-grid">
        <div className="admin-box">
          <div className="admin-box-header">
            <h3>Manage Products</h3>

            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="admin-table">
            {filteredProducts.map((product) => (
              <div className="admin-row" key={product.id}>
                <img src={product.image} alt={product.name} />

                <div>
                  <strong>{product.name}</strong>
                  <p>{product.category}</p>
                </div>

                <strong>${product.price}</strong>

                <div className="admin-actions">
                  <button
                    className="edit-btn"
                    onClick={() => startEditing(product)}
                  >
                    Edit
                  </button>

                  <button onClick={() => deleteProduct(product.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {filteredProducts.length === 0 && (
              <p className="no-results">No products found.</p>
            )}
          </div>
        </div>

        <div className="admin-box">
          <h3>Recent Orders</h3>

          <div className="admin-table">
            {orders.length === 0 ? (
              <p className="dashboard-text">No orders yet.</p>
            ) : (
              orders.map((order) => (
                <div className="admin-order-row" key={order.id}>
                  <div>
                    <Link to={`/order/${order.id}`}>
                      <strong>Order #{order.id}</strong>
                    </Link>
                    <p>{order.customer}</p>
                  </div>

                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateOrderStatus(order.id, e.target.value)
                    }
                  >
                    <option>Pending</option>
                    <option>Preparing</option>
                    <option>On the way</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>

                  <strong>${order.total}</strong>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;