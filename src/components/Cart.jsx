import React from 'react';

const Cart = ({ cartItems, onPurchase, onEmptyCart }) => {
  // Check for items with insufficient stock
  const hasInsufficientStock = cartItems.some(item => item.quantity > item.stock);

  return (
    <div className="cart-container">
      <h2 className="cart-header">Shopping Cart</h2>
      
      {cartItems.length === 0 ? ( 
        <p className="cart-empty-message">Your cart is empty</p> 
      ) : ( 
        <ul className="cart-list">
          {cartItems.map(item => (
            <li key={item.id} className="cart-item">
              {item.name} - {item.quantity} pcs - {item.price * item.quantity} kr
              {item.quantity > item.stock && (
                <p className="out-of-stock-warning">Only {item.stock} left in stock</p>
              )}
            </li>
          ))}
        </ul>
      )}

      <p className="cart-total">
        Total: {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)} kr
      </p>

      {hasInsufficientStock && (
        <p className="error-message">
          Some items in your cart exceed available stock. Please adjust quantities.
        </p>
      )}

      <div className="cart-buttons">
        <button 
          onClick={onPurchase} 
          className="cart-purchase-button" 
          disabled={hasInsufficientStock}  // Disable Pay button if insufficient stock
        >
          Pay
        </button>
        <button onClick={onEmptyCart} className="cart-empty-button">Empty Cart</button>
      </div>
    </div>
  );
};

export default Cart;


