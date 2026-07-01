import { Link } from "react-router-dom";

function StoreCard({ store }) {
  return (
    <div className="store-card">
      <img src={store.image} alt={store.name} />

      <div className="store-info">
        <span>{store.type}</span>
        <h3>{store.name}</h3>

        <div className="store-meta">
          <p>⭐ {store.rating}</p>
          <p>{store.deliveryTime}</p>
        </div>

        <Link to={`/store/${store.id}`}>
          <button>View Store</button>
        </Link>
      </div>
    </div>
  );
}

export default StoreCard;