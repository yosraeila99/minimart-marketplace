import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon">✓</div>
        <h1>Order Placed Successfully!</h1>
        <p>
          Thank you for your order. Your request has been received and will be
          prepared for delivery soon.
        </p>

        <Link to="/" className="success-btn">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;