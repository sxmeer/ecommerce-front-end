import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { cartDefault, clearRemoveFromCartMessage, fetchCart, removeFromCart } from '../../store/actionsCreators';

import { initialAlertConfig } from '../Home/Home'
import AlertMessage from '../UI/AlertMessage/AlertMessage';
import Loader from '../UI/Loader/Loader';
import './Cart.css';
import CartItemList from './CartItemList/CartItemList';

const Cart = props => {
  const [alertConfig, setAlertConfig] = useState(initialAlertConfig);

  useEffect(() => {
    props.fetchCart();
    return () => {
      props.setCartToDefault();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (props.removingFromCartMessage) {
      setAlertConfig({
        show: true,
        message: props.removingFromCartMessage,
        onPositiveBtnClick: () => {
          setAlertConfig(initialAlertConfig);
          props.clearRemoveFromCartMessage();
        },
        positiveBtn: "OK"
      })
    }
    // eslint-disable-next-line
  }, [props.removingFromCartMessage])

  return <div className="Cart">
    <Loader show={props.isLoading || props.isRemovingFromCart} />
    {alertConfig.show && <AlertMessage {...alertConfig} />}
    <div className="Cart__container">
      <p className="cartTitle">My Cart</p>
      <div className="Cart_division">
        <div className="cartItemList">
          <CartItemList cartItems={props.cartItems} removeFromCart={props.removeFromCart} />
          {(!props.isLoading && props.cartItems.length === 0)
            && <p className="cartNoItems">There are no items in your cart 🛒</p>}
        </div>
        <div className="cart__checkout">
          <p className="cartTotalPrice">Total Price: ₹ {props.totalPrice}</p>
        </div>
      </div>
    </div>
  </div>;
};

const mapStateToProps = state => {
  return {
    cartItems: state.myCart.products,
    totalPrice: state.myCart.totalPrice,
    isLoading: state.myCart.isLoading,
    error: state.myCart.error,
    isRemovingFromCart: state.myCart.isRemovingFromCart,
    removingFromCartMessage: state.myCart.removingFromCartMessage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearRemoveFromCartMessage: () => dispatch(clearRemoveFromCartMessage()),
    removeFromCart: (productId) => dispatch(removeFromCart(productId)),
    fetchCart: () => dispatch(fetchCart()),
    setCartToDefault: () => dispatch(cartDefault())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);