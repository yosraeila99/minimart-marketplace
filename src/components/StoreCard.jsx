function StoreCard({ store }) {
  return (
    <div className="store-card">
      <img src={store.image} alt={store.name} />

      <div className="store-info">
        <span>{store.type}</span>
        <h3>{store.name}</h3>

        <div className="store-details">
          <p>⭐ {store.rating}</p>
          <p>{store.deliveryTime}</p>
        </div>

        <button>View Store</button>
      </div>
    </div>
  );
}

export default StoreCard;