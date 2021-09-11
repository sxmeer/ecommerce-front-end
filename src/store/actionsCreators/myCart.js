import * as actions from './actions';
import axios from '../../axios-config';

const cartAddStart = () => {
  return {
    type: actions.CART_ADD_START
  };
};

const cartAddSuccess = (productId, productCount) => {
  return {
    type: actions.CART_ADD_SUCCESS,
    payload: { productId, productCount }
  };
};

const cartAddFailure = (error) => {
  return {
    type: actions.CART_ADD_FAILURE,
    payload: { error }
  };
};

export const addToCart = (productId, productCount) => {
  return (dispatch, getState) => {
    dispatch(cartAddStart());
    let { _id: userId, token } = getState().auth;
    axios.put("/cart/add", null, {
      params: new URLSearchParams([
        ["userId", userId],
        ["productId", productId],
        ["productCount", productCount]]),
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then(response => {
      dispatch(cartAddSuccess(productId, productCount));
    }).catch(error => {
      dispatch(cartAddFailure(error.response.data.message));
    });
  };
};


const cartRemoveStart = () => {
  return {
    type: actions.CART_REMOVE_START
  };
};

const cartRemoveSuccess = (productId, cartData) => {
  return {
    type: actions.CART_REMOVE_SUCCESS,
    payload: { productId, cartData }
  };
};

const cartRemoveFailure = (error) => {
  return {
    type: actions.CART_REMOVE_FAILURE,
    payload: { error }
  };
};

export const removeFromCart = (productId) => {
  return (dispatch, getState) => {
    dispatch(cartRemoveStart());
    let { _id: userId, token } = getState().auth;
    axios.put("/cart/remove", null, {
      params: new URLSearchParams([
        ["userId", userId],
        ["productId", productId]]),
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then(response => {
      dispatch(cartRemoveSuccess(productId, response.data));
    }).catch(error => {
      dispatch(cartRemoveFailure(error.response.data.message));
    });
  };
};


const cartFetchStart = () => {
  return {
    type: actions.CART_START
  };
};

const cartFetchSuccess = (cartData) => {
  return {
    type: actions.CART_SUCCESS,
    payload: cartData
  };
};

const cartFetchFailure = (error) => {
  return {
    type: actions.CART_FAILURE,
    payload: { error }
  };
};

export const fetchCart = () => {
  return (dispatch, getState) => {
    dispatch(cartFetchStart());
    let { _id: userId, token } = getState().auth;
    axios.get("/cart", {
      params: new URLSearchParams([["userId", userId]]),
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then(response => {
      dispatch(cartFetchSuccess(response.data));
    }).catch(error => {
      dispatch(cartFetchFailure(error.response.data.message));
    });
  };
};

export const clearAddToCartMessage = () => {
  return {
    type: actions.CART_ADD_CLEAR_MESSAGE
  }
}

export const clearRemoveFromCartMessage = () => {
  return {
    type: actions.CART_REMOVE_CLEAR_MESSAGE
  }
}

export const cartDefault = () => {
  return {
    type: actions.CART_DEFAULT
  };
};

export const defaultCart = () => {
  return {
    type: actions.DEFAULT_CART
  };
};