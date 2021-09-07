import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import './Product.css';

const Product = React.memo(({ product, addToCart }) => {
  const ref = useRef(null);
  return <div className="Product">
    <img
      className="Product__img"
      src={product.image.imageUrl} alt="" />
    <Link
      to={`/product/${product._id}`}
      className="Product__title">
      {product.name}
    </Link>
    <p>
      <span className="Product__sm brn">₹ </span>
      <span className="Product__price brn">{product.price}</span>
    </p>
    <div className="Product__links">
      <span className="Product__sm">Quantity</span>
      <select ref={ref} className="Product__quantity" name="" id="">
        <option value="1" defaultChecked >1</option>
        <option value="2" >2</option>
        <option value="3" >3</option>
        <option value="4" >4</option>
        <option value="5" >5</option>
      </select>
      <button
        onClick={() => { addToCart(product._id, parseInt(ref.current.value)) }}
        className="Product__addToCart ascent-btn">
        <span><i className="fa fa-shopping-cart"></i></span>
        <span>&nbsp;Add to cart</span></button>
    </div>
  </div >;
});

export default Product;