import * as actions from './actions';
import axios from '../../axios-config';

const orderStart = () => {
  return {
    type: actions.ORDER_LISTING_START,
  };
};

const orderSuccess = (ordersData) => {
  return {
    type: actions.ORDER_LISTING_SUCCESS,
    payload: ordersData
  };
};

const orderFailure = (error) => {
  return {
    type: actions.ORDER_LISTING_FAILURE,
    payload: { error }
  };
};

export const orderEmpty = () => {
  return {
    type: actions.ORDER_LISTING_EMPTY
  };
};

export const setOrderFilter = (filterObj) => {
  return {
    type: actions.ORDER_SET_FILTER,
    payload: filterObj
  };
};

export const fetchOrders = (requestedPage) => {
  return (dispatch, getState) => {
    dispatch(orderStart());
    let { token, _id } = getState().auth;
    let { page, limit, orderId, paymentStatus, orderStatus } = getState().myOrders;
    let params = [["userId", _id], ["page", requestedPage || page], ["limit", limit]];
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
      dispatch(orderSuccess(response.data));
    }).catch(error => {
      dispatch(orderFailure("No orders"));
    });
  };
};