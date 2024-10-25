import React from 'react';

const Header = ({ cartCount, onCartClick, onProductsClick, showConfirmation }) => (
  <header className="header">
    <h1 onClick={onProductsClick} className="header-title">Products</h1>
    <div 
      onClick={showConfirmation ? null : onCartClick}  // Disable click if purchase is complete
      className={`header-cart ${showConfirmation ? 'disabled' : ''}`} 
      style={{ cursor: showConfirmation ? 'default' : 'pointer' }}
    >
      Cart ({cartCount})
    </div>
  </header>
);

export default Header;



