import React from 'react';
import './CartItem.css';

const CartItem = React.memo(({ cartItem, removeFromCart }) => {
  return (
    <div className="CartItem">
      <img src={cartItem.product.image.imageUrl} alt="" className="CartItem__image" />
      <div className="CartItem__details">
        <p className="CartItem__name">{cartItem.product.name}</p>
        <p className="CartItem__description">{cartItem.product.description}</p>
        <p className="CartItem__quantity">Quantity: {cartItem.count}</p>
        <p className="CartItem__price">Price: ₹{cartItem.product.price}</p>
        <p className="CartItem__totalPrice">Total Price:  ₹{cartItem.product.price} * {cartItem.count} = ₹{cartItem.totalPrice}</p>
        <button
          onClick={() => removeFromCart(cartItem.product._id)}
          className="CartItem__removeBtn primary-btn">
          Remove
        </button>
      </div>
    </div>
  );
});

export default CartItem;
