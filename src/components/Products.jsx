import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Products = ({ addToCart, triggerFetch }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [triggerFetch]);

  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product">
          <img src={product.ImageURL} alt={product.name} className="product-image" />
          <h2>{product.name}</h2>
          <p>Price: {product.price} kr</p>
          <p>Stock: {product.stock}</p>
          <button onClick={() => addToCart(product)} disabled={product.stock === 0}>
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;






