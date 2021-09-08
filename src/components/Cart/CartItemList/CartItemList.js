import React from 'react';
import CartItem from './CartItem/CartItem';

function CartItemList({ cartItems, removeFromCart }) {
  return cartItems.map(cartItem =>
    <CartItem
      key={cartItem._id}
      cartItem={cartItem}
      removeFromCart={removeFromCart} />
  );
};

export default CartItemList;
