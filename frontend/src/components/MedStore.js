import React, { useState } from 'react';
import { Search, ShoppingCart, Filter, X, Pill, Thermometer, Stethoscope, Syringe } from 'lucide-react';
import './MedStore.css';

const MedStore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const medicines = [
    { id: 1, name: 'Aspirin', price: 25, category: 'Pain Relief', icon: Pill },
    { id: 2, name: 'Amoxicillin', price: 100, category: 'Antibiotics', icon: Pill },
    { id: 3, name: 'Lisinopril', price: 85, category: 'Blood Pressure', icon: Thermometer },
    { id: 4, name: 'Metformin', price: 70, category: 'Diabetes', icon: Syringe },
    { id: 5, name: 'Ibuprofen', price: 60, category: 'Pain Relief', icon: Pill },
    { id: 6, name: 'Omeprazole', price: 190, category: 'Digestive Health', icon: Stethoscope },
  ];

  const addToCart = (medicine) => {
    setCart([...cart, medicine]);
  };

  const clearCart = () => {
    setCart([]);
  };

  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'All' || medicine.category === selectedCategory)
  );

  const categories = ['All', ...new Set(medicines.map(medicine => medicine.category))];

  return (
    <div className="med-store">
      <h1>Medical Store</h1>
      <div className="search-bar">
        <Search size={20} />
        <input
          type="text"
          placeholder="Search medicines..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="store-content">
        <aside className="filters">
          <h2><Filter size={20} /> Filters</h2>
          <h3>Categories</h3>
          <ul>
            {categories.map(category => (
              <li
                key={category}
                className={selectedCategory === category ? 'active' : ''}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </aside>
        <main className="products">
          {filteredMedicines.map(medicine => (
            <div key={medicine.id} className="product-card">
              <div className="product-icon">
                <medicine.icon size={48} />
              </div>
              <h3>{medicine.name}</h3>
              <p className="category">{medicine.category}</p>
              <p className="price">₹{medicine.price.toFixed(2)}</p>
              <button onClick={() => addToCart(medicine)}>Add to Cart</button>
            </div>
          ))}
        </main>
        <aside className="cart">
          <h2><ShoppingCart size={20} /> Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              <ul>
                {cart.map((item, index) => (
                  <li key={index}>{item.name} - ₹{item.price.toFixed(2)}</li>
                ))}
              </ul>
              <p>Total: ₹{cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</p>
              <button className="checkout-btn">Checkout</button>
              <button className="clear-cart-btn" onClick={clearCart}>
                <X size={16} /> Clear Cart
              </button>
            </>
          )}
        </aside>
      </div>
    </div>
  );
};

export default MedStore;