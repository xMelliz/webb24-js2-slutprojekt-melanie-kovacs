import React from 'react';

const Cart = ({ cartItems, onClose, onPurchase, onEmptyCart }) => (
  <div className="cart-container">
    <h2 className="cart-header">Shopping Cart</h2>
    <button onClick={onClose} className="cart-close-button">Close Cart</button>
    {cartItems.length === 0 ? (
      <p className="cart-empty-message">Your cart is empty</p>
    ) : (
      <ul className="cart-list">
        {cartItems.map(item => (
          <li key={`${item.id}`} className="cart-item">
            {item.name} - {item.quantity} pcs - {item.price * item.quantity} kr
          </li>
        ))}
      </ul>
    )}
    <p className="cart-total">Total: {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)} kr</p>
    <div className="cart-buttons">
      <button onClick={onPurchase} className="cart-purchase-button">Pay</button>
      <button onClick={onEmptyCart} className="cart-empty-button">Empty Cart</button>
    </div>
  </div>
);

export default Cart;
