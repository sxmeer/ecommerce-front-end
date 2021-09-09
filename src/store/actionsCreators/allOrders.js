import * as actions from './actions';
import axios from '../../axios-config';
import { USER_TYPES } from '../../config';

const allOrderStart = () => {
  return {
    type: actions.ALL_ORDER_LISTING_START,
  };
};

const allOrderSuccess = (ordersData) => {
  return {
    type: actions.ALL_ORDER_LISTING_SUCCESS,
    payload: ordersData
  };
};

const allOrderFailure = (error) => {
  return {
    type: actions.ALL_ORDER_LISTING_FAILURE,
    payload: { error }
  };
};

export const allOrderEmpty = () => {
  return {
    type: actions.ALL_ORDER_LISTING_EMPTY
  };
};

export const setAllOrderFilter = (filterObj) => {
  return {
    type: actions.ALL_ORDER_SET_FILTER,
    payload: filterObj
  };
};

export const fetchAllOrders = (requestedPage) => {
  return (dispatch, getState) => {
    dispatch(allOrderStart());
    let { token, _id } = getState().auth;
    let { page, limit, orderId, paymentStatus, orderStatus } = getState().allOrders;
    let params = [["userId", _id], ["page", requestedPage || page], ["limit", limit], ["userRole", USER_TYPES.TYPE_ADMIN]];
    if (orderId) {
      params.push(["orderId", orderId]);
    }
    if (paymentStatus) {
      params.push(["paymentStatus", paymentStatus]);
    }
    if (orderStatus) {
      params.push(["orderStatus", orderStatus]);
    }
    axios.get("/order/all", {
      params: new URLSearchParams(params),
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      dispatch(allOrderSuccess(response.data));
    }).catch(error => {
      dispatch(allOrderFailure("No orders"));
    });
  };
};