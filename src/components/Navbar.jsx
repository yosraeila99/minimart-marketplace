import { Link } from "react-router-dom";

function Navbar({ cartCount, currentUser, logoutUser }) {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        MiniMart
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <a href="/#stores">Stores</a>
        <a href="/#products">Products</a>
        <Link to="/dashboard">Dashboard</Link>

        {currentUser && currentUser.role === "admin" && (
          <Link to="/admin">Admin</Link>
        )}

        <Link to="/cart">Cart ({cartCount})</Link>

        {currentUser ? (
          <div className="user-menu">
            <span>Hello, {currentUser.name}</span>
            <button onClick={logoutUser}>Logout</button>
          </div>
        ) : (
          <Link to="/login" className="login-btn">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;