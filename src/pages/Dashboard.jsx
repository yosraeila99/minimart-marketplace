import { Link } from "react-router-dom";

function Dashboard({ orders }) {
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);

  const activeOrders = orders.filter(
    (order) => order.status !== "Delivered" && order.status !== "Cancelled"
  );

  return (
    <div className="dashboard-page">
      <div className="section-title">
        <h2>User Dashboard</h2>
        <p>Manage your orders, delivery details, and account activity.</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>{orders.length}</h3>
          <p>Total Orders</p>
        </div>

        <div className="stat-card">
          <h3>{activeOrders.length}</h3>
          <p>Active Orders</p>
        </div>

        <div className="stat-card">
          <h3>${totalSpent}</h3>
          <p>Total Spent</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-box">
          <h3>Recent Orders</h3>

          {orders.length === 0 ? (
            <p className="dashboard-text">No orders yet.</p>
          ) : (
            orders.map((order) => (
              <Link
                to={`/order/${order.id}`}
                className="order-row"
                key={order.id}
              >
                <div>
                  <strong>Order #{order.id}</strong>
                  <p>{order.date}</p>
                </div>

                <span className="order-status">{order.status}</span>
                <strong>${order.total}</strong>
              </Link>
            ))
          )}
        </div>

        <div className="dashboard-box">
          <h3>Latest Delivery Address</h3>

          {orders.length === 0 ? (
            <p className="dashboard-text">No delivery address yet.</p>
          ) : (
            <>
              <p className="dashboard-text">{orders[0].address}</p>

              <h3 className="mt">Account Info</h3>
              <p className="dashboard-text">Name: {orders[0].customer}</p>
              <p className="dashboard-text">Phone: {orders[0].phone}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;