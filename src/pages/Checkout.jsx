import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Checkout({ cart, clearCart, createOrder }) {
  const navigate = useNavigate();

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "Cash on Delivery",
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function handleChange(e) {
    const { name, value } = e.target;

    setCustomerInfo({
      ...customerInfo,
      [name]: value,
    });
  }

  function handlePlaceOrder() {
    if (
      customerInfo.name === "" ||
      customerInfo.phone === "" ||
      customerInfo.address === ""
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const newOrder = {
      id: Date.now(),
      customer: customerInfo.name,
      phone: customerInfo.phone,
      address: customerInfo.address,
      paymentMethod: customerInfo.paymentMethod,
      items: cart,
      total: total,
      status: "Pending",
      date: new Date().toLocaleDateString(),
    };

    createOrder(newOrder);
    clearCart();
    navigate("/order-success");
  }

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="empty-cart">
          <h3>No items to checkout</h3>
          <Link to="/">Back to shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="section-title">
        <h2>Checkout</h2>
        <p>Complete your order details and delivery information.</p>
      </div>

      <div className="checkout-grid">
        <form className="checkout-form">
          <h3>Customer Information</h3>

          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={customerInfo.name}
            onChange={handleChange}
          />

          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter your phone number"
            value={customerInfo.phone}
            onChange={handleChange}
          />

          <label>Delivery Address</label>
          <textarea
            name="address"
            placeholder="Enter your delivery address"
            value={customerInfo.address}
            onChange={handleChange}
          ></textarea>

          <label>Payment Method</label>
          <select
            name="paymentMethod"
            value={customerInfo.paymentMethod}
            onChange={handleChange}
          >
            <option>Cash on Delivery</option>
            <option>Credit Card</option>
            <option>Online Payment</option>
          </select>

          <button type="button" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </form>

        <div className="order-summary">
          <h3>Order Summary</h3>

          {cart.map((item) => (
            <div className="summary-item" key={item.id}>
              <div>
                <span>{item.name}</span>
                <p className="summary-quantity">Qty: {item.quantity}</p>
              </div>

              <strong>${item.price * item.quantity}</strong>
            </div>
          ))}

          <div className="summary-total">
            <span>Total</span>
            <strong>${total}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;