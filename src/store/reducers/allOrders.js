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
    case actions.ALL_ORDER_LISTING_START: return allOrderListingStart(state, action);
    case actions.ALL_ORDER_LISTING_SUCCESS: return allOrderListingSuccess(state, action);
    case actions.ALL_ORDER_LISTING_FAILURE: return allOrderListingFailure(state, action);
    case actions.ALL_ORDER_LISTING_EMPTY: return allOrderListingEmpty(state, action);
    case actions.ALL_ORDER_SET_FILTER: return setAllOrderFilter(state, action);
    case actions.ALL_ORDER_EDIT: return allOrderEdit(state, action);
    case actions.DEFAULT_ALL_ORDER: return defaultAllOrder(state, action);
    default:
      return state;
  }
};

const allOrderListingStart = (state, action) => {
  return updateObject(state, { isLoading: true, error: null });
};

const allOrderListingSuccess = (state, action) => {
  let { orders, count, page, limit, totalOrders } = action.payload;
  return updateObject(state, { orders, count, page, limit, totalOrders, isLoading: false, error: null });
};

const allOrderListingFailure = (state, action) => {
  return updateObject(state, {
    orders: [], count: 0, page: 1, limit: 5, totalOrders: 0, isLoading: false, error: action.payload.error
  });
};

const allOrderListingEmpty = (state, action) => {
  return updateObject(state, {
    count: 0,
    orders: [],
    totalOrders: 0,
  });
};

const setAllOrderFilter = (state, action) => {
  return updateObject(state, { ...action.payload });
}

const allOrderEdit = (state, action) => {
  let index = state.orders.findIndex(_ => _._id === action.payload._id);
  let orders = [...state.orders];
  orders[index] = action.payload;
  return updateObject(state, { orders });
};

const defaultAllOrder = (state, action) => {
  return initialState;
}

export default reducer;