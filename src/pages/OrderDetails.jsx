import { Link, useParams } from "react-router-dom";

function OrderDetails({ orders }) {
  const { id } = useParams();

  const order = orders.find((item) => item.id === Number(id));

  if (!order) {
    return (
      <div className="order-details-page">
        <div className="empty-cart">
          <h3>Order not found</h3>
          <Link to="/dashboard">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="order-details-page">
      <div className="section-title">
        <h2>Order Details</h2>
        <p>View customer information, ordered items, and delivery status.</p>
      </div>

      <div className="order-details-grid">
        <div className="order-details-card">
          <h3>Order Information</h3>

          <div className="details-line">
            <span>Order ID</span>
            <strong>#{order.id}</strong>
          </div>

          <div className="details-line">
            <span>Date</span>
            <strong>{order.date}</strong>
          </div>

          <div className="details-line">
            <span>Status</span>
            <strong className="order-status">{order.status}</strong>
          </div>

          <div className="details-line">
            <span>Payment Method</span>
            <strong>{order.paymentMethod}</strong>
          </div>

          <div className="details-line">
            <span>Total</span>
            <strong>${order.total}</strong>
          </div>
        </div>

        <div className="order-details-card">
          <h3>Customer Information</h3>

          <div className="details-line">
            <span>Name</span>
            <strong>{order.customer}</strong>
          </div>

          <div className="details-line">
            <span>Phone</span>
            <strong>{order.phone}</strong>
          </div>

          <div className="details-address">
            <span>Address</span>
            <p>{order.address}</p>
          </div>
        </div>
      </div>

      <div className="order-details-card items-card">
        <h3>Ordered Items</h3>

        {order.items.map((item) => (
          <div className="order-item-details" key={item.id}>
            <img src={item.image} alt={item.name} />

            <div>
              <strong>{item.name}</strong>
              <p>{item.category}</p>
            </div>

            <span>Qty: {item.quantity}</span>

            <strong>${item.price * item.quantity}</strong>
          </div>
        ))}

        <div className="order-total-line">
          <span>Total</span>
          <strong>${order.total}</strong>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;