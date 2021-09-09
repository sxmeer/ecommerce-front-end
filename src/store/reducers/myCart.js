import * as actions from '../actionsCreators/actions';
import { updateObject } from '../../helper/Utils/utility';

const initialState = {
  totalPrice: 0,
  products: [],
  isLoading: false,
  error: null,
  isAddingToCart: false,
  addToCartMessage: null,
  isRemovingFromCart: false,
  removingFromCartMessage: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CART_ADD_START: return cartAddStart(state, action);
    case actions.CART_ADD_SUCCESS: return cartAddSuccess(state, action);
    case actions.CART_ADD_FAILURE: return cartAddFailure(state, action);
    case actions.CART_ADD_CLEAR_MESSAGE: return cartAddClearMessage(state, action);
    case actions.CART_START: return cartStart(state, action);
    case actions.CART_SUCCESS: return cartSuccess(state, action);
    case actions.CART_FAILURE: return cartFailure(state, action);
    case actions.CART_DEFAULT: return cartDefault(state, action);
    case actions.CART_REMOVE_START: return cartRemoveStart(state, action);
    case actions.CART_REMOVE_SUCCESS: return cartRemoveSuccess(state, action);
    case actions.CART_REMOVE_FAILURE: return cartRemoveFailure(state, action);
    case actions.CART_REMOVE_CLEAR_MESSAGE: return cartRemoveClearMessage(state, action);
    case actions.DEFAULT_CART: return defaultCart(state, action);
    default:
      return state;
  }
}

const cartAddStart = (state, actions) => {
  return updateObject(state, { isAddingToCart: true, addToCartMessage: null });
}

const cartAddSuccess = (state, action) => {
  return updateObject(state, { isAddingToCart: false, addToCartMessage: "Product has been added to cart!" });
}
const cartAddFailure = (state, action) => {
  return updateObject(state, { isAddingToCart: false, addToCartMessage: action.payload.error });
}
const cartAddClearMessage = (state, action) => {
  return updateObject(state, { addToCartMessage: null });
}

const cartStart = (state, action) => {
  return updateObject(state, { isLoading: true, error: null });
}

const cartSuccess = (state, action) => {
  let { products, totalPrice } = action.payload;
  return updateObject(state, { totalPrice, products, isLoading: false, error: null });
};

const cartFailure = (state, action) => {
  return updateObject(state, { isLoading: false, error: action.payload.error });
}

const cartDefault = (state, action) => {
  return initialState;
}

const cartRemoveStart = (state, action) => {
  return updateObject(state, {
    isRemovingFromCart: true,
    removingFromCartMessage: null,
  });
};

const cartRemoveSuccess = (state, action) => {
  let products = [...state.products];
  let { cartData, productId } = action.payload;
  products.splice(products.findIndex(_ => _.product._id === productId), 1);
  return updateObject(state, {
    products,
    totalPrice: cartData.totalPrice,
    isRemovingFromCart: false,
    removingFromCartMessage: "Product has been removed from cart",
  });
};

const cartRemoveFailure = (state, action) => {
  return updateObject(state, {
    isRemovingFromCart: false,
    removingFromCartMessage: "Error removing product from the cart",
  });
};

const cartRemoveClearMessage = (state, action) => {
  return updateObject(state, {
    removingFromCartMessage: null
  });
};

const defaultCart = (state, action) => {
  return initialState;
}

export default reducer;