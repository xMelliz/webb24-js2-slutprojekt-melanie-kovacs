import React, { useState } from 'react';
import Header from './Header';
import Products from './Products';
import Cart from './Cart';
import Checkout from './Checkout';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const App = () => {
  const [cart, setCart] = useState([]);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setErrorMessage("");  // Clear error message when adding to cart
  };

  const handlePurchase = async () => {
    if (cart.length === 0) {
      setErrorMessage("Your cart is empty. Please add items before proceeding to payment.");
      return;
    }
    try {
      for (const item of cart) {
        const productRef = doc(db, 'products', item.id);
        const newStock = item.stock - item.quantity;
        await updateDoc(productRef, { stock: newStock });
      }
      setCart([]);
      setTriggerFetch(!triggerFetch);
      setShowCart(false);
      setShowConfirmation(true);
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  const emptyCart = () => {
    setCart([]);           // Clear the cart
    setErrorMessage("");    // Clear any error messages
    setShowCart(false);     // Close the cart view to return to products
  };

  const showProducts = () => {
    setShowCart(false);
    setShowConfirmation(false);
  };

  return (
    <div>
      <Header 
        cartCount={cart.reduce((total, item) => total + item.quantity, 0)}
        onCartClick={() => setShowCart(true)}
        onProductsClick={showProducts}
      />

      {!showCart && !showConfirmation && <Products addToCart={addToCart} triggerFetch={triggerFetch} />}

      {showCart && (
        <>
          <Cart 
            cartItems={cart} 
            onClose={() => setShowCart(false)} 
            onPurchase={handlePurchase} 
            onEmptyCart={emptyCart} 
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </>
      )}

      {showConfirmation && <Checkout />}
    </div>
  );
};

export default App;


