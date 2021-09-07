import React from 'react'
import Product from './Product'

const ProductList = ({ products, addToCart }) => {
  return products.map(product =>
    <Product key={product._id} addToCart={addToCart} product={product} />
  );
};

export default ProductList;