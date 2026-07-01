import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { products as defaultProducts } from "./data/products";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import OrderDetails from "./pages/OrderDetails";
import NotFound from "./pages/NotFound";
import StoreDetails from "./pages/StoreDetails";

const defaultUsers = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@minimart.com",
    password: "admin123",
    role: "admin",
  },
];

function App() {
  const [cart, setCart] = useState([]);

  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("minimart-products");
    return savedProducts ? JSON.parse(savedProducts) : defaultProducts;
  });

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("minimart-orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("minimart-users");
    return savedUsers ? JSON.parse(savedUsers) : defaultUsers;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("minimart-current-user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem("minimart-products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("minimart-orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("minimart-users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("minimart-current-user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("minimart-current-user");
    }
  }, [currentUser]);

  function registerUser(newUser) {
    const emailExists = users.some((user) => user.email === newUser.email);

    if (emailExists) {
      alert("This email is already registered.");
      return false;
    }

    const userToAdd = {
      id: Date.now(),
      ...newUser,
    };

    setUsers([...users, userToAdd]);
    setCurrentUser(userToAdd);
    return true;
  }

  function loginUser(email, password) {
    const user = users.find(
      (item) => item.email === email && item.password === password
    );

    if (!user) {
      alert("Invalid email or password.");
      return false;
    }

    setCurrentUser(user);
    return true;
  }

  function logoutUser() {
    setCurrentUser(null);
  }

  function addToCart(product) {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      const cartItem = {
        ...product,
        quantity: 1,
      };

      setCart([...cart, cartItem]);
    }
  }

  function increaseQuantity(productId) {
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function decreaseQuantity(productId) {
    setCart(
      cart
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(productId) {
    setCart(cart.filter((item) => item.id !== productId));
  }

  function clearCart() {
    setCart([]);
  }

  function addProduct(product) {
    setProducts([...products, product]);
  }

  function deleteProduct(productId) {
    setProducts(products.filter((product) => product.id !== productId));
  }

  function updateProduct(updatedProduct) {
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  }

  function createOrder(order) {
    setOrders([order, ...orders]);
  }

  function updateOrderStatus(orderId, newStatus) {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <BrowserRouter>
      <Navbar
        cartCount={cartCount}
        currentUser={currentUser}
        logoutUser={logoutUser}
      />

      <Routes>
        <Route
          path="/"
          element={<Home products={products} addToCart={addToCart} />}
        />

        <Route
          path="/product/:id"
          element={
            <ProductDetails products={products} addToCart={addToCart} />
          }
        />
        <Route
  path="/store/:id"
  element={<StoreDetails products={products} addToCart={addToCart} />}
/>

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              clearCart={clearCart}
              createOrder={createOrder}
            />
          }
        />

        <Route path="/order-success" element={<OrderSuccess />} />

        <Route
          path="/login"
          element={<Login loginUser={loginUser} currentUser={currentUser} />}
        />

        <Route
          path="/register"
          element={
            <Register registerUser={registerUser} currentUser={currentUser} />
          }
        />

        <Route path="/dashboard" element={<Dashboard orders={orders} />} />

        <Route path="/order/:id" element={<OrderDetails orders={orders} />} />

        <Route
          path="/admin"
          element={
            currentUser && currentUser.role === "admin" ? (
              <AdminDashboard
                products={products}
                orders={orders}
                addProduct={addProduct}
                deleteProduct={deleteProduct}
                updateProduct={updateProduct}
                updateOrderStatus={updateOrderStatus}
              />
            ) : (
              <div className="access-page">
                <div className="access-card">
                  <h2>Access Denied</h2>
                  <p>You must login as an admin to access this page.</p>
                  <Link to="/login" className="success-btn">
                    Go to Login
                  </Link>
                </div>
              </div>
            )
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;