import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { cartDefault, clearRemoveFromCartMessage, fetchCart, removeFromCart } from '../../store/actionsCreators';
import axios from '../../axios-config';

import { initialAlertConfig } from '../Home/Home'
import AlertMessage from '../UI/AlertMessage/AlertMessage';
import Loader from '../UI/Loader/Loader';
import CartItemList from './CartItemList/CartItemList';
import './Cart.css';
import { withRouter } from 'react-router';

const Cart = props => {
  const [isCheckoutMode, setCheckoutMode] = useState(false);
  const [alertConfig, setAlertConfig] = useState(initialAlertConfig);
  const [checkoutFormState, setCheckoutFormState] = useState({
    paymentMethod: "METHOD_COD",
    address: {
      value: '',
      isValid: false
    },
    proceedOrder: false
  });

  const radioHandler = (event) => {
    setCheckoutFormState((prevState) => ({ ...prevState, paymentMethod: event.target.value }));
  };

  const textAreaHandler = (event) => {
    let addressValue = event.target.value.trim();
    let isValid = false;
    if (addressValue.length >= 10 && addressValue.length <= 50) {
      isValid = true;
    }
    setCheckoutFormState((prevState) => ({ ...prevState, address: { value: event.target.value, isValid } }));
  }

  const checkboxHandler = (event) => {
    setCheckoutFormState((prevState) => ({ ...prevState, proceedOrder: event.target.checked }));
  }

  const onOrderClickHandler = () => {
    console.log(props);
    axios.put("order/create", { address: checkoutFormState.address.value }, {
      params: new URLSearchParams([["userId", props.userId]]),
      headers: {
        'Authorization': `Bearer ${props.token}`
      }
    }).then(response => {
      setAlertConfig({
        show: true,
        message: "Your order was placed successfully",
        onPositiveBtnClick: () => {
          props.history.replace({ pathname: '/' });
        },
        positiveBtn: "OK"
      });
    }).catch(error => {
      setAlertConfig({
        show: true,
        message: error.response.data.message,
        onPositiveBtnClick: () => {
          setAlertConfig(initialAlertConfig);
        },
        positiveBtn: "OK"
      });
    });
  }

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
  }, [props.removingFromCartMessage]);

  let checkoutComponent = <div className="checkout">
    <div className="paymentMethod">
      <p>Payment Method</p>
      <div className="checkout__input">
        <input
          type="radio"
          name="payment_method"
          id="COD"
          value={"METHOD_COD"}
          checked={checkoutFormState.paymentMethod === "METHOD_COD"}
          onChange={radioHandler} />
        <label htmlFor="COD">Cash on delivery</label>
      </div>
      <div className="checkout__input">
        <input
          type="radio"
          name="payment_method"
          id="OP"
          value={"METHOD_ONLINE_PAYMENT"}
          checked={checkoutFormState.paymentMethod === "METHOD_ONLINE_PAYMENT"}
          onChange={radioHandler} />
        <label htmlFor="OP">Online Payment</label>
      </div>
    </div>
    <div className="checkout__input">
      <textarea
        id="Address"
        onChange={textAreaHandler}
        value={checkoutFormState.address.value}
        placeholder="Please enter your address" />
    </div>
    <div className="checkout__input">
      <input
        type="checkbox"
        id="proceed"
        checked={checkoutFormState.proceedOrder}
        onChange={checkboxHandler} />
      <label htmlFor="proceed">Proceed with order</label>
    </div>
    <button
      onClick={onOrderClickHandler}
      className="secondary-btn orderBtn"
      disabled={!(checkoutFormState.proceedOrder && checkoutFormState.address.isValid)}>
      Order
    </button>
  </div >

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
        {!(!props.isLoading && props.cartItems.length === 0) &&
          <div className="cart__checkout">
            <p className="cartTotalPrice">Total Price: ₹ {props.totalPrice}</p>
            {isCheckoutMode && checkoutComponent}
            <button
              onClick={() => setCheckoutMode(prev => !prev)}
              className={`checkoutToggleBtn ${isCheckoutMode ? "danger-btn" : "primary-btn"}`}>
              {isCheckoutMode ? 'Cancel Checkout' : 'Checkout'}
            </button>
          </div>
        }
      </div>
    </div>
  </div >;
};

const mapStateToProps = state => {
  return {
    cartItems: state.myCart.products,
    totalPrice: state.myCart.totalPrice,
    isLoading: state.myCart.isLoading,
    error: state.myCart.error,
    isRemovingFromCart: state.myCart.isRemovingFromCart,
    removingFromCartMessage: state.myCart.removingFromCartMessage,
    token: state.auth.token,
    userId: state.auth._id
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));