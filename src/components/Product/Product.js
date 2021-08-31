import React from 'react';
import './Product.css';

const Product = ({ product }) => {
  return <div className="Product">
    <img className="Product__img" src={product.image.imgUrl} alt="" />
    <p className="Product__title">{product.name}</p>
    <p className="Product__description">{product.description}</p>
    <p><span className="Product__sm">₹ </span><span className="Product__price">{product.price}</span></p>
    <div className="Product__links"><span className="Product__sm">Quantity</span>
      <select className="Product__quantity" name="" id="">
        <option value="1" defaultValue>1</option>
        <option value="2" defaultValue>2</option>
        <option value="3" defaultValue>3</option>
        <option value="4" defaultValue>4</option>
        <option value="5" defaultValue>5</option>
      </select>
      <button className="Product__addToCart ascent-btn"><span><i class="fa fa-shopping-cart"></i></span> <span>Add to cart</span></button>
      <button className="Product__more secondary-btn"><span>More</span></button>
    </div>
  </div >;
}

export default Product;