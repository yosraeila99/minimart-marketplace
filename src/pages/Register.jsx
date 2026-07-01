import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register({ registerUser, currentUser }) {
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setRegisterData({
      ...registerData,
      [name]: value,
    });
  }

  function handleRegister(e) {
    e.preventDefault();

    if (
      registerData.name === "" ||
      registerData.email === "" ||
      registerData.password === ""
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const success = registerUser(registerData);

    if (success) {
      navigate("/");
    }
  }

  if (currentUser) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <h2>You are already registered</h2>
          <p>You are logged in as {currentUser.name}.</p>
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
        <h2>Create Account</h2>
        <p>Join MiniMart and start ordering from local stores.</p>

        <form className="auth-form" onSubmit={handleRegister}>
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={registerData.name}
            onChange={handleChange}
          />

          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={registerData.email}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={registerData.password}
            onChange={handleChange}
          />

          <label>Account Type</label>
          <select
            name="role"
            value={registerData.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit">Register</button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;