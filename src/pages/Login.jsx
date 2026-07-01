import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ loginUser, currentUser }) {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  function handleLogin(e) {
    e.preventDefault();

    if (loginData.email === "" || loginData.password === "") {
      alert("Please enter email and password.");
      return;
    }

    const success = loginUser(loginData.email, loginData.password);

    if (success) {
      navigate("/");
    }
  }

  if (currentUser) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <h2>You are already logged in</h2>
          <p>Welcome back, {currentUser.name}.</p>
          <Link to="/" className="success-btn">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login</h2>
        <p>Welcome back! Please login to continue.</p>

        <form className="auth-form" onSubmit={handleLogin}>
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={loginData.email}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={loginData.password}
            onChange={handleChange}
          />

          <button type="submit">Login</button>
        </form>

        <div className="demo-login">
          <strong>Demo Admin Account:</strong>
          <p>Email: admin@minimart.com</p>
          <p>Password: admin123</p>
        </div>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;