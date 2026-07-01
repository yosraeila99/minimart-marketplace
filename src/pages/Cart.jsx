import { Link } from "react-router-dom";

function Cart({ cart, removeFromCart, increaseQuantity, decreaseQuantity }) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <div className="section-title">
        <h2>Your Cart</h2>
        <p>Review your selected products before checkout.</p>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h3>Your cart is empty</h3>
          <Link to="/">Back to shopping</Link>
        </div>
      ) : (
        <div className="cart-container">
          {cart.map((item) => (
            <div className="cart-row" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div>
                <h3>{item.name}</h3>
                <p>{item.category}</p>
              </div>

              <div className="quantity-controls">
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQuantity(item.id)}>+</button>
              </div>

              <strong>${item.price * item.quantity}</strong>

              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}

          <div className="cart-summary">
            <h3>Total: ${total}</h3>

            <Link to="/checkout" className="checkout-link">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;