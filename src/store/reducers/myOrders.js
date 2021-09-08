import * as actions from '../actionsCreators/actions';
import { updateObject } from '../../helper/Utils/utility';

const initialState = {
  orderId: "",
  paymentStatus: "",
  orderStatus: "",
  page: 1,
  limit: 5,
  count: 0,
  orders: [],
  totalOrders: 0,
  error: null,
  isLoading: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ORDER_LISTING_START: return orderListingStart(state, action);
    case actions.ORDER_LISTING_SUCCESS: return orderListingSuccess(state, action);
    case actions.ORDER_LISTING_FAILURE: return orderListingFailure(state, action);
    case actions.ORDER_LISTING_EMPTY: return orderListingEmpty(state, action);
    case actions.ORDER_SET_FILTER: return setOrderFilter(state, action);
    default:
      return state;
  }
};

const orderListingStart = (state, action) => {
  return updateObject(state, { isLoading: true, error: null });
};

const orderListingSuccess = (state, action) => {
  let { orders, count, page, limit, totalOrders } = action.payload;
  return updateObject(state, { orders, count, page, limit, totalOrders, isLoading: false, error: null });
};

const orderListingFailure = (state, action) => {
  return updateObject(state, {
    orders: [], count: 0, page: 1, limit: 5, totalOrders: 0, isLoading: false, error: action.payload.error
  });
};

const orderListingEmpty = (state, action) => {
  return updateObject(state, {
    count: 0,
    orders: [],
    totalOrders: 0,
  });
};

const setOrderFilter = (state, action) => {
  return updateObject(state, { ...action.payload });
}

export default reducer;